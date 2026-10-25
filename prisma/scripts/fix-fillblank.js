"use strict";
// Reviews every fill-in-the-blank task with an LLM and rewrites broken ones so that:
// exactly one ___ blank, the answer fills it into correct code, nothing in the text hints the answer.
// Python / JS results are syntax-checked after filling the blank; a fix that fails is retried once, then skipped.
// Usage: node prisma/scripts/fix-fillblank.js [--module=python] [--limit=N] [--dry]
require("dotenv").config({ path: ".env" });
const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");
const { parse: babelParse } = require("@babel/parser");
const { PrismaClient } = require("@prisma/client");
const { FAMILIES, callLLM, chainFor, sleep } = require("./llm");

const prisma = new PrismaClient();
const WORKERS = FAMILIES.length * 2;
const DONE_FILE = path.join(__dirname, ".fix-fillblank-done.json"); // resume support, gitignored
const LOG_FILE = path.join(__dirname, ".fix-fillblank-changes.jsonl");
const BLANK = /_{3,}/g;

const SYSTEM = `Ești un profesor de programare care verifică exerciții de tip "completează spațiul gol" pentru o platformă de învățare în limba română. Răspunzi DOAR cu un obiect JSON valid, fără text în plus.`;

function prompt(t, autoCheck) {
  return `${autoCheck ? `ATENȚIE — verificarea automată a exercițiului ACTUAL a eșuat: ${autoCheck}
Codul cu ___ înlocuit de răspuns: ${JSON.stringify(t.question.replace(BLANK, t.answer))}
Exercițiul TREBUIE corectat (ok: false).

` : ""}Modul: ${t.lesson.module.title}
Lecția: ${t.lesson.title}

ÎNTREBARE (markdown):
${t.question}

RĂSPUNS ACCEPTAT: ${JSON.stringify(t.answer)}
EXPLICAȚIE: ${t.explanation || ""}

Verifică exercițiul după aceste reguli:
1. Întrebarea are EXACT UN spațiu gol, scris ca ___ (trei underscore).
2. Dacă înlocuiești ___ cu răspunsul, codul rezultat e corect, complet și face exact ce cere enunțul.
3. Răspunsul e scurt (un cuvânt cheie, operator, nume sau expresie scurtă) și e SINGURUL răspuns corect posibil. Dacă mai sunt variante corecte, reformulează enunțul ca să rămână una singură.
4. Enunțul spune clar ce trebuie completat, dar NU dezvăluie răspunsul (nici direct, nici în comentarii din cod).
5. Explicația (1-3 propoziții, română) e corectă și se potrivește cu răspunsul.
6. Codul rămâne într-un bloc \`\`\`limbaj ... \`\`\`.
7. Păstrează diacriticele românești (ă, â, î, ș, ț) și stilul enunțului original.

Dacă totul e corect, întoarce aceleași valori cu "ok": true. Altfel corectează și pune "ok": false.
Format strict:
{"ok": true|false, "problem": "ce era greșit, scurt", "question": "...", "answer": "...", "explanation": "..."}`;
}

function parseJson(text) {
  const m = text.match(/\{[\s\S]*\}/);
  if (!m) throw new Error("no JSON in response");
  return JSON.parse(m[0]);
}

// Returns an error string if the filled code does not parse, null if fine or not checkable.
function syntaxError(question, answer) {
  const m = question.match(/```(\w*)\n([\s\S]*?)```/);
  if (!m) return null;
  const lang = m[1].toLowerCase();
  const code = m[2].replace(BLANK, answer);
  if (lang === "python" || lang === "py") {
    const r = spawnSync("python", ["-c", "import sys,ast; ast.parse(sys.stdin.buffer.read().decode('utf-8'))"], { input: code, encoding: "utf8" });
    return r.status === 0 ? null : (r.stderr.trim().split("\n").pop() || "python syntax error");
  }
  if (["js", "javascript", "jsx", "ts", "tsx"].includes(lang)) {
    try {
      babelParse(code, { sourceType: "module", allowReturnOutsideFunction: true, allowAwaitOutsideFunction: true, plugins: ["jsx", ...(lang.startsWith("ts") ? ["typescript"] : [])] });
      return null;
    } catch (e) {
      return `JS syntax error: ${e.message}`;
    }
  }
  return null;
}

// Some models strip Romanian diacritics when rewriting; reject that.
function lostDiacritics(before, after) {
  const count = (s) => (s.match(/[ăâîșțşţĂÂÎȘȚ]/g) || []).length;
  return count(before) > 0 && count(after) < count(before) / 2 ? "diacritics were removed, keep ă, â, î, ș, ț" : null;
}

function validate(fix) {
  if (!fix || typeof fix.question !== "string" || typeof fix.answer !== "string") return "missing fields";
  const blanks = (fix.question.match(BLANK) || []).length;
  if (blanks !== 1) return `question has ${blanks} blanks, need exactly 1`;
  if (!fix.answer.trim()) return "empty answer";
  if (fix.answer.length > 80) return "answer too long";
  return syntaxError(fix.question, fix.answer.trim());
}

async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes("--dry");
  const moduleFilter = args.find(a => a.startsWith("--module="))?.split("=")[1];
  const limit = parseInt(args.find(a => a.startsWith("--limit="))?.split("=")[1] || "0") || Infinity;

  const done = new Set(fs.existsSync(DONE_FILE) ? JSON.parse(fs.readFileSync(DONE_FILE, "utf8")) : []);
  const tasks = (await prisma.task.findMany({
    where: { type: "fillblank", ...(moduleFilter ? { lesson: { module: { slug: moduleFilter } } } : {}) },
    include: { lesson: { include: { module: true } } },
    orderBy: [{ lesson: { module: { order: "asc" } } }, { lesson: { order: "asc" } }, { number: "asc" }],
  })).filter(t => !done.has(t.id)).slice(0, limit);

  console.log(`Reviewing ${tasks.length} fill-blank tasks with ${WORKERS} workers${dryRun ? " (DRY RUN)" : ""}`);
  let next = 0, okCount = 0, fixed = 0, skipped = 0;

  async function worker(w) {
    const chain = chainFor(w % FAMILIES.length);
    while (next < tasks.length) {
      const i = next++;
      const t = tasks[i];
      const tag = `[${i + 1}/${tasks.length}] ${t.lesson.module.slug} L${t.lesson.order} #${t.number}`;
      try {
        const originalError = validate({ question: t.question, answer: t.answer });
        let userPrompt = prompt(t, originalError), fix, err, provider;
        for (let attempt = 0; attempt < 3; attempt++) {
          const res = await callLLM(chain, SYSTEM, userPrompt);
          provider = res.provider;
          try { fix = parseJson(res.text); err = validate(fix) || lostDiacritics(t.question, fix.question); } catch (e) { err = e.message; }
          if (!err) break;
          userPrompt = `${prompt(t, originalError)}\n\nÎncercarea ta anterioară a fost respinsă: ${err}. Corectează și răspunde din nou doar cu JSON.`;
        }
        if (err) {
          console.log(`  ⚠ ${tag}: skipped (${err.slice(0, 100)}) [${provider}]`);
          skipped++;
        } else {
          const data = { question: fix.question.replace(BLANK, "___"), answer: fix.answer.trim(), explanation: fix.explanation || t.explanation };
          // Model says "ok" and the original passes the checks: keep the original, ignore cosmetic rewrites.
          const changed = !(fix.ok === true && !originalError) && (data.question !== t.question || data.answer !== t.answer);
          if (changed) {
            if (!dryRun) await prisma.task.update({ where: { id: t.id }, data });
            fs.appendFileSync(LOG_FILE, JSON.stringify({ id: t.id, tag, problem: fix.problem, before: { q: t.question, a: t.answer }, after: { q: data.question, a: data.answer } }) + "\n");
            console.log(`  ✎ ${tag}: ${String(fix.problem || "").slice(0, 90)} [${provider}]`);
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
