/**
 * seed-restructure.js
 * Restructurează TOATE lecțiile la 5 quiz + 5 fillblank + 5 coding = 15 tasks total.
 *
 * Configurare AI (în .env) — folosește ambele dacă sunt disponibile:
 *   GROQ_API_KEY=gsk_xxx    ← primar, rapid (14400 req/zi)  — console.groq.com
 *   GOOGLE_AI_KEY=xxx        ← fallback automat (250 req/zi) — aistudio.google.com
 *
 * Strategia combo: Groq → dacă 429/eroare → Gemini → dacă 429 → așteaptă → Groq
 * Run: node prisma/seed-restructure.js
 */
require("dotenv").config({ path: ".env" });
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const GROQ_KEY   = process.env.GROQ_API_KEY;
const GEMINI_KEY = process.env.GOOGLE_AI_KEY;

if (!GROQ_KEY && !GEMINI_KEY) {
  console.error("ERROR: Adaugă GROQ_API_KEY și/sau GOOGLE_AI_KEY în .env");
  process.exit(1);
}

console.log(`AI disponibil: ${[GROQ_KEY && "Groq(primar)", GEMINI_KEY && "Gemini(fallback)"].filter(Boolean).join(" + ")}`);

// Stare internă pentru comutare automată
const providerState = {
  groqCooldown:   0,  // timestamp până când Groq e în cooldown
  geminiCooldown: 0,
};

const REQUEST_DELAY = 2200; // ms între cereri (llama-3.3-70b: 30 RPM → 1 req/2s)

const MODULE_LANG = {
  python:            "python",
  javascript:        "javascript",
  html:              "html",
  css:               "css",
  tailwind:          "html",
  react:             "javascript",
  "nextjs-frontend": "javascript",
  "nextjs-backend":  "javascript",
  c:                 "c",
  cpp:               "cpp",
  csharp:            "csharp",
  java:              "java",
  cybersecurity:     "javascript",
  sql:               "sql",
  php:               "php",
};

// Caracterul de comentariu pentru fiecare limbaj (pentru starterCode)
const COMMENT_CHAR = {
  python:            "#",
  javascript:        "//",
  html:              "<!--",
  css:               "/*",
  tailwind:          "<!--",
  react:             "//",
  "nextjs-frontend": "//",
  "nextjs-backend":  "//",
  c:                 "//",
  cpp:               "//",
  csharp:            "//",
  java:              "//",
  cybersecurity:     "//",
  sql:               "--",
  php:               "//",
};

const LANG_HINT = {
  python:      "Python 3 — print(), fără input()",
  javascript:  "JavaScript (Node.js) — console.log(), fără DOM",
  html:        "HTML5",
  css:         "CSS3",
  tailwind:    "HTML cu Tailwind CSS",
  react:       "React / JSX — componentă funcțională",
  "nextjs-frontend": "Next.js / React — componentă sau pagină",
  "nextjs-backend":  "Next.js API Route / Server Action",
  c:           "C standard — gcc, include <stdio.h>, fără input interactiv",
  cpp:         "C++ — include <iostream>, using namespace std",
  csharp:      "C# — Console.WriteLine, fără input interactiv",
  java:        "Java — System.out.println, fără input interactiv",
  cybersecurity: "JavaScript (Node.js) — demo concept de securitate",
  sql:         "SQL (SQLite / MySQL) — SELECT/INSERT/UPDATE etc.",
  php:         "PHP 8 — echo, fără input interactiv",
};

// Limbaje cu output determinist (pot face "predict the output")
const HAS_RUNNABLE_OUTPUT = new Set([
  "python","javascript","c","cpp","csharp","java","sql","php","cybersecurity",
]);

async function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function callGroqRaw(prompt) {
  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: { "Authorization": `Bearer ${GROQ_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 2200,
      temperature: 0.7,
    }),
  });
  if (res.status === 429) { providerState.groqCooldown = Date.now() + 60_000; throw new Error("Groq 429"); }
  if (!res.ok) throw new Error(`Groq ${res.status}`);
  const data = await res.json();
  return data.choices?.[0]?.message?.content ?? "";
}

async function callGeminiRaw(prompt) {
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: { maxOutputTokens: 3500, temperature: 0.7, thinkingConfig: { thinkingBudget: 0 } },
      }),
    }
  );
  if (res.status === 429) { providerState.geminiCooldown = Date.now() + 70_000; throw new Error("Gemini 429"); }
  if (!res.ok) throw new Error(`Gemini ${res.status}`);
  const data = await res.json();
  const parts = data.candidates?.[0]?.content?.parts ?? [];
  const textPart = parts.find(p => !p.thought) || parts[0];
  return (textPart?.text ?? "").trim();
}

// Apelează AI cu fallback automat: Groq → Gemini → wait → retry
async function callAIRaw(prompt) {
  const now = Date.now();
  const groqOk   = GROQ_KEY   && now >= providerState.groqCooldown;
  const geminiOk = GEMINI_KEY && now >= providerState.geminiCooldown;

  // Încearcă Groq prima dată
  if (groqOk) {
    try {
      return await callGroqRaw(prompt);
    } catch (e) {
      const msg = e.message.includes("429") ? "429↑" : e.message.slice(0, 20);
      process.stdout.write(` [Groq ${msg}→Gemini]`);
    }
  }

  // Fallback pe Gemini
  if (geminiOk) {
    try {
      return await callGeminiRaw(prompt);
    } catch (e) {
      const msg = e.message.includes("429") ? "429↑" : e.message.slice(0, 20);
      process.stdout.write(` [Gemini ${msg}]`);
    }
  }

  // Ambele în cooldown — calculăm cel mai scurt timp de așteptare
  const wait = Math.max(0, Math.min(
    GROQ_KEY   ? providerState.groqCooldown   - Date.now() : Infinity,
    GEMINI_KEY ? providerState.geminiCooldown - Date.now() : Infinity,
  ));
  process.stdout.write(` [wait ${Math.ceil(wait/1000)}s]`);
  await sleep(wait + 500);

  // Retry după cooldown (fără fallback recursiv — dacă eșuează, propagăm eroarea)
  if (GROQ_KEY && Date.now() >= providerState.groqCooldown)   return callGroqRaw(prompt);
  if (GEMINI_KEY && Date.now() >= providerState.geminiCooldown) return callGeminiRaw(prompt);
  throw new Error("Ambele API-uri în cooldown");
}

// Generează un singur prompt care produce AMBELE tipuri (fillblank + coding)
// Returnează { fillblank: [...], coding: [...] }
async function generateBoth(lessonTitle, moduleTitle, slug, fillNeeded, codingNeeded) {
  const lang    = LANG_HINT[slug]    || "JavaScript";
  const langId  = MODULE_LANG[slug]  || "javascript";
  const comment = COMMENT_CHAR[slug] || "//";
  const isRunnable = HAS_RUNNABLE_OUTPUT.has(slug);

  const fillSection = fillNeeded > 0 ? `
=== SECȚIUNEA A: ${fillNeeded} exerciții FILLBLANK ===
${isRunnable ? `
Tipul "prezice output-ul":
- Scrie un snippet de cod SCURT (4-10 linii) care demonstrează EXACT conceptul lecției
- OBLIGATORIU: codul produce OUTPUT COMPLET DETERMINIST
  ✗ INTERZIS: random(), randint(), choice(), Math.random(), Date, time(), seed nedefinit
  ✓ PERMIS: variabile fixe, bucle, condiții, funcții cu valori hardcodate
- Output-ul să fie SCURT: 1-4 linii de text simplu (nu obiecte mari)
- question: "Ce va afișa codul următor?\\n\`\`\`${langId}\\n<cod_complet_here>\\n\`\`\`"
- answer: EXACT output-ul, fără spații extra, fără newline la final
` : `
Tipul "completează valoarea":
- Arată un snippet de cod cu o valoare/proprietate/tag lipsă (marcată cu ___ sau comentariu)
- Studentul scrie EXACT valoarea corectă (1-5 cuvinte)
- question include codul în markdown \`\`\`${langId}...\`\`\`
- answer: valoarea exactă fără spații extra
`}
Returnează sub cheia "fillblank": array de ${fillNeeded} obiecte cu: name, question, answer, explanation, difficulty` : "";

  const codingSection = codingNeeded > 0 ? `
=== SECȚIUNEA B: ${codingNeeded} exerciții CODING ===
Tipul "scrie cod de la zero":
- Cerință practică, concretă, contextualizată (cafenea, magazin, studenți, etc.)
- OBLIGATORIU: legat direct de conceptul lecției
- starterCode: ghid cu comentarii ${comment} TODO (max 10 linii, sintaxă ${langId} corectă!)
  ✗ NU folosi // TODO în Python — folosește # TODO
  ✗ NU folosi # TODO în JavaScript/C/Java — folosește // TODO
- expectedOutput: output EXACT și DETERMINISTIC — sau "" pentru HTML/CSS/React/Next.js
  ✗ INTERZIS output din random/time — pune valori fixe în cerință
- Nu face Hello World, nu face exerciții triviale
Returnează sub cheia "coding": array de ${codingNeeded} obiecte cu: name, question, starterCode, expectedOutput, difficulty` : "";

  const diffHint = (n) => n >= 5 ? "2 easy, 2 medium, 1 hard" : n >= 3 ? "1 easy, 1 medium, 1 hard" : "mix easy/medium";

  const prompt = `Ești un expert în crearea de exerciții educaționale pentru o platformă de e-learning în ROMÂNĂ.

Modul: ${moduleTitle}
Lecție: ${lessonTitle}
Limbaj: ${lang} (caracter comentariu: ${comment})
${fillSection}
${codingSection}

REGULI GENERALE:
- Toate textele (name, question, cerințe) în ROMÂNĂ
- Exercițiile să fie legate DIRECT de subiectul lecției
- Dificultăți: ${diffHint(Math.max(fillNeeded, codingNeeded))}
- Nu repeta exerciții similare între ele

FORMAT RĂSPUNS — STRICT JSON obiect (fără text în afara JSON):
{
  ${fillNeeded > 0 ? `"fillblank": [
    {
      "name": "Titlu 3-5 cuvinte",
      "question": "Ce va afișa codul următor?\\n\`\`\`${langId}\\ncodul_here\\n\`\`\`",
      "answer": "output_exact_fara_newline_la_final",
      "explanation": "de ce produce acel output",
      "difficulty": "easy"
    }
  ]${codingNeeded > 0 ? "," : ""}` : ""}
  ${codingNeeded > 0 ? `"coding": [
    {
      "name": "Titlu 3-5 cuvinte",
      "question": "Cerință clară cu context real. Max 200 caractere.",
      "starterCode": "${comment} TODO pasul 1\\n${comment} TODO pasul 2\\n",
      "expectedOutput": "output_deterministic_exact sau empty string",
      "difficulty": "easy"
    }
  ]` : ""}
}

RETURNEAZĂ STRICT JSON, nimic altceva.`;

  const raw = await callAIRaw(prompt);

  // Parse JSON object
  let text = raw.trim()
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();

  const obj = JSON.parse(text);
  return {
    fillblank: Array.isArray(obj.fillblank) ? obj.fillblank : [],
    coding:    Array.isArray(obj.coding)    ? obj.coding    : [],
  };
}

async function withRetry(fn, maxRetries = 3) {
  for (let i = 1; i <= maxRetries; i++) {
    try {
      return await fn();
    } catch (e) {
      if (i === maxRetries) throw e;
      process.stdout.write(` retry${i}...`);
      await sleep(3000 * i);
    }
  }
}

async function main() {
  const modules = await prisma.module.findMany({
    orderBy: { order: "asc" },
    include: {
      lessons: {
        orderBy: { order: "asc" },
        include: {
          tasks: {
            select: { id: true, type: true, number: true },
            orderBy: { number: "asc" },
          },
        },
      },
    },
  });

  let stats = { deleted: 0, fillAdded: 0, codingAdded: 0, errors: 0, skipped: 0 };

  for (const mod of modules) {
    const lang = MODULE_LANG[mod.slug] || "javascript";
    console.log(`\n=== ${mod.title} [${mod.slug}] ===`);

    for (const lesson of mod.lessons) {
      const quiz   = lesson.tasks.filter(t => t.type === "quiz")     .sort((a,b) => a.number - b.number);
      const fill   = lesson.tasks.filter(t => t.type === "fillblank").sort((a,b) => a.number - b.number);
      const coding = lesson.tasks.filter(t => t.type === "coding")   .sort((a,b) => a.number - b.number);

      const toDelete    = [...quiz.slice(5), ...fill.slice(5), ...coding.slice(5)];
      const fillNeeded  = 5 - Math.min(5, fill.length);
      const codingNeeded= 5 - Math.min(5, coding.length);

      const label = `L${lesson.order}. ${lesson.title.slice(0, 38)}`;

      if (toDelete.length === 0 && fillNeeded === 0 && codingNeeded === 0) {
        process.stdout.write(`  . ${label} — OK\n`);
        stats.skipped++;
        continue;
      }

      process.stdout.write(`  ${label} [q:${quiz.length}→${Math.min(5,quiz.length)} f:+${fillNeeded} c:+${codingNeeded}]`);

      // 1. Șterge excesul
      if (toDelete.length > 0) {
        await prisma.task.deleteMany({ where: { id: { in: toDelete.map(t => t.id) } } });
        stats.deleted += toDelete.length;
        process.stdout.write(` -${toDelete.length}`);
      }

      // 2. Generează ce lipsește (un singur apel AI per lecție)
      if (fillNeeded > 0 || codingNeeded > 0) {
        try {
          const generated = await withRetry(() =>
            generateBoth(lesson.title, mod.title, mod.slug, fillNeeded, codingNeeded)
          );

          const maxNum = lesson.tasks.reduce((m, t) => Math.max(m, t.number), 0);
          let nextNum = maxNum + 1;

          // Insert fillblank
          for (const t of (generated.fillblank || []).slice(0, fillNeeded)) {
            await prisma.task.create({
              data: {
                lessonId:    lesson.id,
                number:      nextNum++,
                type:        "fillblank",
                difficulty:  ["easy","medium","hard"].includes(t.difficulty) ? t.difficulty : "medium",
                name:        (t.name || "Completează răspunsul").slice(0, 100),
                question:    (t.question || "Ce va afișa codul?").slice(0, 2000),
                answer:      (t.answer || "").trim().slice(0, 500),
                explanation: t.explanation ? t.explanation.trim().slice(0, 500) : null,
                options:     [],
                language:    lang,
              },
            });
            stats.fillAdded++;
          }

          // Insert coding
          for (const t of (generated.coding || []).slice(0, codingNeeded)) {
            await prisma.task.create({
              data: {
                lessonId:      lesson.id,
                number:        nextNum++,
                type:          "coding",
                difficulty:    ["easy","medium","hard"].includes(t.difficulty) ? t.difficulty : "medium",
                name:          (t.name || "Exercițiu coding").slice(0, 100),
                question:      (t.question || "Scrie codul cerut.").slice(0, 1000),
                answer:        "",
                options:       [],
                language:      lang,
                starterCode:   (t.starterCode || "// Scrie codul tău\n").slice(0, 2000),
                expectedOutput:(t.expectedOutput || "").slice(0, 500),
              },
            });
            stats.codingAdded++;
          }

          process.stdout.write(` fill+${Math.min(fillNeeded, generated.fillblank?.length || 0)} code+${Math.min(codingNeeded, generated.coding?.length || 0)}`);
        } catch (e) {
          process.stdout.write(` ERR:${e.message.slice(0, 60)}`);
          stats.errors++;
        }

        await sleep(REQUEST_DELAY);
      }

      process.stdout.write(" ✓\n");
    }
  }

  console.log(`\n${"=".repeat(55)}`);
  console.log(`Deleted (excess):   ${stats.deleted}`);
  console.log(`Fillblank added:    ${stats.fillAdded}`);
  console.log(`Coding added:       ${stats.codingAdded}`);
  console.log(`Skipped (ok):       ${stats.skipped}`);
  console.log(`Errors:             ${stats.errors}`);
  console.log(`${"=".repeat(55)}`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
