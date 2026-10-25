"use strict";
// Reviews tasks with an LLM and rewrites broken ones. Every rewrite must pass deterministic checks
// (retried up to 3 times, otherwise skipped). Tasks that already pass and that the model calls "ok" stay untouched.
//   fillblank: exactly one ___ blank, unique short answer, Python/JS code still parses after filling the blank
//   quiz:      4 distinct options, answer is one of them, the correct option does not stand out by length
// Usage: node prisma/scripts/fix-tasks.js --type=fillblank|quiz [--module=python] [--limit=N] [--dry]
require("dotenv").config({ path: ".env" });
const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");
const { parse: babelParse } = require("@babel/parser");
const { PrismaClient } = require("@prisma/client");
const { FAMILIES, callLLM, chainFor, sleep } = require("./llm");

const prisma = new PrismaClient();
const WORKERS = FAMILIES.length * 2;
const BLANK = /_{3,}/g;

const COMMON_RULES = `• Enunțul NU dezvăluie răspunsul (nici direct, nici în comentarii din cod).
• Explicația (1-3 propoziții, română) e corectă și se potrivește cu răspunsul.
• Codul rămâne într-un bloc \`\`\`limbaj ... \`\`\`.
• Păstrează diacriticele românești (ă, â, î, ș, ț) și stilul enunțului original.`;

const TYPES = {
  fillblank: {
    label: "completează spațiul gol",
    rules: `• Întrebarea are EXACT UN spațiu gol, scris ca ___ (trei underscore).
• Dacă înlocuiești ___ cu răspunsul, codul rezultat e corect, complet și face exact ce cere enunțul.
• Răspunsul e scurt (un cuvânt cheie, operator, nume sau expresie scurtă) și e SINGURUL răspuns corect posibil. Dacă mai sunt variante corecte, reformulează enunțul ca să rămână una singură.`,
    format: `{"ok": true|false, "problem": "ce era greșit, scurt", "question": "...", "answer": "...", "explanation": "..."}`,
    show: (t) => `RĂSPUNS ACCEPTAT: ${JSON.stringify(t.answer)}`,
    checkHint: (t) => `Codul cu ___ înlocuit de răspuns: ${JSON.stringify(t.question.replace(BLANK, t.answer))}`,
    validate(f) {
      if (typeof f?.question !== "string" || typeof f?.answer !== "string") return "missing fields";
      const blanks = (f.question.match(BLANK) || []).length;
      if (blanks !== 1) return `question has ${blanks} blanks, need exactly 1`;
      if (!f.answer.trim()) return "empty answer";
      if (f.answer.length > 80) return "answer too long";
      return syntaxError(f.question, f.answer.trim());
    },
    data: (f) => ({ question: f.question.replace(BLANK, "___"), answer: f.answer.trim() }),
  },
  quiz: {
    label: "quiz cu 4 variante",
    rules: `• Exact o variantă e corectă, iar "answer" e IDENTIC (caracter cu caracter) cu acea variantă.
• 4 variante distincte, toate plauzibile pentru cineva care nu știe materia (fără variante absurde gen "SEO", "Eroare" puse doar de umplutură), dar variantele greșite sunt CLAR greșite pentru cine știe materia (nu parțial corecte). Gramatică corectă.
• Variantele au lungime și nivel de detaliu ASEMĂNĂTOARE (diferență de cel mult ~30%) și aceeași formă gramaticală. Varianta corectă NU are voie să iasă în evidență prin lungime, detalii sau formulare; scurtează-o sau detaliază variantele greșite.
• Dacă întrebarea cere ce afișează un cod, răspunsul corect e exact output-ul real.`,
    format: `{"ok": true|false, "problem": "ce era greșit, scurt", "question": "...", "options": ["...", "...", "...", "..."], "answer": "...", "explanation": "..."}`,
    show: (t) => `VARIANTE: ${JSON.stringify(t.options)}\nRĂSPUNS CORECT: ${JSON.stringify(t.answer)}`,
    checkHint: () => "",
    validate(f) {
      if (typeof f?.question !== "string" || typeof f?.answer !== "string" || !Array.isArray(f?.options)) return "missing fields";
      if (f.options.length !== 4 || f.options.some(o => typeof o !== "string" || !o.trim())) return "need exactly 4 non-empty options";
      if (new Set(f.options).size !== 4) return "options must be distinct";
      if (!f.options.includes(f.answer)) return "answer must be identical to one of the options";
      const others = f.options.filter(o => o !== f.answer).map(o => o.length);
      if (f.answer.length > 15 && f.answer.length > 1.5 * Math.max(...others)) return "the correct option is much longer than all the others, which gives it away";
      return outputMismatch(f.question, f.answer);
    },
    data: (f) => ({ question: f.question, options: f.options, answer: f.answer }),
  },
};

function codeBlock(question) {
  const m = question.match(/```(\w*)\n([\s\S]*?)```/);
  return m && { lang: m[1].toLowerCase(), code: m[2] };
}

// fillblank: error string if the filled code does not parse, null if fine or not checkable.
function syntaxError(question, answer) {
  const b = codeBlock(question);
  if (!b) return null;
  const code = b.code.replace(BLANK, answer);
  if (b.lang === "python" || b.lang === "py") {
    const r = spawnSync("python", ["-c", "import sys,ast; ast.parse(sys.stdin.buffer.read().decode('utf-8'))"], { input: code, encoding: "utf8" });
    return r.status === 0 ? null : (r.stderr.trim().split("\n").pop() || "python syntax error");
  }
  if (["js", "javascript", "jsx", "ts", "tsx"].includes(b.lang)) {
    try {
      babelParse(code, { sourceType: "module", allowReturnOutsideFunction: true, allowAwaitOutsideFunction: true, plugins: ["jsx", ...(b.lang.startsWith("ts") ? ["typescript"] : [])] });
      return null;
    } catch (e) {
      return `JS syntax error: ${e.message}`;
    }
  }
  return null;
}

// quiz: for "what does this print" Python/JS questions, run the code and compare with the answer.
function outputMismatch(question, answer) {
  const b = codeBlock(question);
  if (!b || !/afi[șş]eaz|output/i.test(question)) return null;
  const opts = { input: b.code, encoding: "utf8", timeout: 5000, env: { ...process.env, PYTHONIOENCODING: "utf-8" } };
  const r = b.lang === "python" ? spawnSync("python", ["-I", "-c", "import sys;exec(sys.stdin.buffer.read().decode('utf-8'))"], opts)
    : ["js", "javascript"].includes(b.lang) ? spawnSync("node", ["-"], opts) : null;
  if (!r || r.status !== 0) return null;
  const norm = (s) => String(s).trim().replace(/^["'`]|["'`]$/g, "").replace(/\s+/g, " ");
  return norm(r.stdout) === norm(answer) ? null : `running the code prints ${JSON.stringify(norm(r.stdout))}, not the marked answer`;
}

// Some models strip Romanian diacritics when rewriting; reject that.
function lostDiacritics(before, after) {
  const count = (s) => (s.match(/[ăâîșțşţĂÂÎȘȚ]/g) || []).length;
  return count(before) > 0 && count(after) < count(before) / 2 ? "diacritics were removed, keep ă, â, î, ș, ț" : null;
}

function prompt(T, t, autoCheck) {
  return `${autoCheck ? `ATENȚIE — verificarea automată a exercițiului ACTUAL a eșuat: ${autoCheck}
${T.checkHint(t)}
Exercițiul TREBUIE corectat (ok: false).

` : ""}Tip: ${T.label}
Modul: ${t.lesson.module.title}
Lecția: ${t.lesson.title}

ÎNTREBARE (markdown):
${t.question}

${T.show(t)}
EXPLICAȚIE: ${t.explanation || ""}

Verifică exercițiul după aceste reguli:
${T.rules}
${COMMON_RULES}

Dacă totul e corect, întoarce aceleași valori cu "ok": true. Altfel corectează și pune "ok": false.
Format strict:
${T.format}`;
}

function parseJson(text) {
  const m = text.match(/\{[\s\S]*\}/);
  if (!m) throw new Error("no JSON in response");
  return JSON.parse(m[0]);
}

async function main() {
  const args = process.argv.slice(2);
  const type = args.find(a => a.startsWith("--type="))?.split("=")[1];
  const T = TYPES[type];
  if (!T) throw new Error(`--type must be one of: ${Object.keys(TYPES).join(", ")}`);
  const dryRun = args.includes("--dry");
  const moduleFilter = args.find(a => a.startsWith("--module="))?.split("=")[1];
  const limit = parseInt(args.find(a => a.startsWith("--limit="))?.split("=")[1] || "0") || Infinity;
  const DONE_FILE = path.join(__dirname, `.fix-${type}-done.json`); // resume support, gitignored
  const LOG_FILE = path.join(__dirname, `.fix-${type}-changes.jsonl`);
  const SYSTEM = `Ești un profesor de programare care verifică exerciții de tip "${T.label}" pentru o platformă de învățare în limba română. Răspunzi DOAR cu un obiect JSON valid, fără text în plus.`;

  const done = new Set(fs.existsSync(DONE_FILE) ? JSON.parse(fs.readFileSync(DONE_FILE, "utf8")) : []);
  const tasks = (await prisma.task.findMany({
    where: { type, ...(moduleFilter ? { lesson: { module: { slug: moduleFilter } } } : {}) },
    include: { lesson: { include: { module: true } } },
    orderBy: [{ lesson: { module: { order: "asc" } } }, { lesson: { order: "asc" } }, { number: "asc" }],
  })).filter(t => !done.has(t.id)).slice(0, limit);

  console.log(`Reviewing ${tasks.length} ${type} tasks with ${WORKERS} workers${dryRun ? " (DRY RUN)" : ""}`);
  let next = 0, okCount = 0, fixed = 0, skipped = 0;

  async function worker(w) {
    const chain = chainFor(w % FAMILIES.length);
    while (next < tasks.length) {
      const i = next++;
      const t = tasks[i];
      const tag = `[${i + 1}/${tasks.length}] ${t.lesson.module.slug} L${t.lesson.order} #${t.number}`;
      try {
        const originalError = T.validate(t);
        let userPrompt = prompt(T, t, originalError), fix, err, provider;
        for (let attempt = 0; attempt < 3; attempt++) {
          const res = await callLLM(chain, SYSTEM, userPrompt);
          provider = res.provider;
          try { fix = parseJson(res.text); err = T.validate(fix) || lostDiacritics(t.question, fix.question); } catch (e) { err = e.message; }
          if (!err) break;
          userPrompt = `${prompt(T, t, originalError)}\n\nÎncercarea ta anterioară a fost respinsă: ${err}. Corectează și răspunde din nou doar cu JSON.`;
        }
        if (err) {
          console.log(`  ⚠ ${tag}: skipped (${err.slice(0, 100)}) [${provider}]`);
          skipped++;
        } else {
          const data = { ...T.data(fix), explanation: fix.explanation || t.explanation };
          const before = T.data(t);
          // Model says "ok" and the original passes the checks: keep the original, ignore cosmetic rewrites.
          const changed = !(fix.ok === true && !originalError) && JSON.stringify(T.data(data)) !== JSON.stringify(before);
          if (changed) {
            if (!dryRun) await prisma.task.update({ where: { id: t.id }, data });
            fs.appendFileSync(LOG_FILE, JSON.stringify({ id: t.id, tag, problem: fix.problem, before, after: T.data(data) }) + "\n");
            console.log(`  ✎ ${tag}: ${String(fix.problem || originalError || "").slice(0, 90)} [${provider}]`);
            fixed++;
          } else {
            okCount++;
          }
          if (!dryRun) { done.add(t.id); fs.writeFileSync(DONE_FILE, JSON.stringify([...done])); }
        }
      } catch (e) {
        console.error(`  ✗ ${tag}: ${e.message.slice(0, 120)}`);
        skipped++;
      }
      await sleep(1000);
    }
  }

  await Promise.all(Array.from({ length: WORKERS }, (_, w) => worker(w)));
  console.log(`\nDone: ${okCount} already correct, ${fixed} fixed, ${skipped} skipped`);
  await prisma.$disconnect();
}

main().catch(e => { console.error(e); process.exit(1); });
