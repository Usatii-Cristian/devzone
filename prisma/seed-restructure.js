/**
 * seed-restructure.js
 * Restructurează TOATE lecțiile la 5 quiz + 5 fillblank + 5 coding = 15 tasks total.
 * - Șterge task-urile în exces (păstrează primele 5 din fiecare tip, sortate după number)
 * - Generează fillblank lipsă (cod dat → studentul scrie output-ul)
 * - Generează coding lipsă (studentul scrie cod de la zero)
 * Run: node prisma/seed-restructure.js
 */
require("dotenv").config({ path: ".env" });
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const API_KEY = process.env.GOOGLE_AI_KEY;

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

// Limbaj afișat în prompt pentru generare
const LANG_HINT = {
  python:      "Python 3",
  javascript:  "JavaScript (Node.js) — console.log(), fără DOM",
  html:        "HTML5",
  css:         "CSS3",
  tailwind:    "HTML cu Tailwind CSS",
  react:       "React / JSX",
  "nextjs-frontend": "Next.js / React",
  "nextjs-backend":  "Next.js API / Server Action",
  c:           "C standard — gcc, include <stdio.h>",
  cpp:         "C++ standard — include <iostream>",
  csharp:      "C# — Console.WriteLine",
  java:        "Java — System.out.println",
  cybersecurity: "JavaScript (Node.js) — demo concept de securitate",
  sql:         "SQL (SQLite / MySQL)",
  php:         "PHP 8 — echo, fără input interactiv",
};

// Limbaje cu output determinist (pot face fillblank "predict output")
const HAS_RUNNABLE_OUTPUT = new Set([
  "python","javascript","c","cpp","csharp","java","sql","php","cybersecurity"
]);

async function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function callGemini(prompt) {
  if (!API_KEY) throw new Error("GOOGLE_AI_KEY missing în .env");
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: {
          maxOutputTokens: 3000,
          temperature: 0.7,
          thinkingConfig: { thinkingBudget: 0 },
        },
      }),
    }
  );
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Gemini ${res.status}: ${err.slice(0, 200)}`);
  }
  const data = await res.json();
  const parts = data.candidates?.[0]?.content?.parts ?? [];
  const textPart = parts.find(p => !p.thought) || parts[0];
  let text = (textPart?.text ?? "").trim();
  text = text
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();
  if (text.startsWith("{")) {
    try {
      const obj = JSON.parse(text);
      const key = Object.keys(obj).find(k => Array.isArray(obj[k]));
      if (key) text = JSON.stringify(obj[key]);
    } catch {}
  }
  const tasks = JSON.parse(text);
  if (!Array.isArray(tasks)) throw new Error("Răspuns nu e array JSON");
  return tasks;
}

// Generează exerciții fillblank: cod dat → studentul scrie output-ul exact
async function generateFillBlank(lessonTitle, moduleTitle, slug, count) {
  const lang = LANG_HINT[slug] || "JavaScript";
  const langId = MODULE_LANG[slug] || "javascript";
  const isRunnable = HAS_RUNNABLE_OUTPUT.has(slug);

  let prompt;

  if (isRunnable) {
    prompt = `Ești un creator expert de exerciții pentru o platformă de e-learning în ROMÂNĂ.

Creează exact ${count} exerciții de tip "prezice output-ul" pentru:
- Modul: ${moduleTitle}
- Lecție: ${lessonTitle}
- Limbaj: ${lang}

REGULI OBLIGATORII:
1. Fiecare exercițiu conține un SNIPPET DE COD complet și scurt (4-12 linii)
2. Codul demonstrează DIRECT conceptul din lecție
3. Codul produce OUTPUT DETERMINISTIC — fără random(), fără input(), fără Date/Time
4. Output-ul trebuie să fie scurt: 1-5 linii de text exact
5. Studentul trebuie să scrie EXACT output-ul (inclusiv spații, newlines)
6. Pune codul în câmpul "question" ca bloc markdown cu limbajul corect
7. Dificultate: ${count >= 3 ? "primul easy, al doilea medium, restul mix" : "mix easy/medium/hard"}

FORMAT JSON STRICT (array, fără text în afară):
[
  {
    "name": "Titlu scurt 3-5 cuvinte",
    "question": "Ce va afișa codul următor?\\n\`\`\`${langId}\\ncodul_aici\\n\`\`\`",
    "answer": "output exact linie cu linie",
    "explanation": "Explicație scurtă de ce produce acel output",
    "difficulty": "easy"
  }
]

RETURNEAZĂ STRICT JSON ARRAY, nimic altceva.`;
  } else {
    // HTML/CSS/React/Next.js — fill in the blank în cod/concepte
    prompt = `Ești un creator expert de exerciții pentru o platformă de e-learning în ROMÂNĂ.

Creează exact ${count} exerciții de tip "completează răspunsul" pentru:
- Modul: ${moduleTitle}
- Lecție: ${lessonTitle}
- Limbaj/Framework: ${lang}

REGULI OBLIGATORII:
1. Fiecare exercițiu arată un SNIPPET DE COD cu un element/proprietate/valoare lipsă
2. Studentul trebuie să scrie EXACT valoarea/proprietatea/tagul corect
3. Codul e legat DIRECT de topicul lecției
4. Răspunsul e scurt: 1-5 cuvinte sau o valoare CSS/HTML/JSX
5. Pune codul în câmpul "question" ca bloc markdown
6. Dificultate: ${count >= 3 ? "primul easy, al doilea medium, restul mix" : "mix easy/medium/hard"}

Exemple de format întrebare:
"Completează: ce proprietate CSS face textul aldine?\\n\`\`\`css\\np { ___: bold; }\\n\`\`\`"
"Ce tag HTML creează un link?\\n\`\`\`html\\n<___>Click</___>\\n\`\`\`"

FORMAT JSON STRICT (array, fără text în afară):
[
  {
    "name": "Titlu scurt 3-5 cuvinte",
    "question": "Completează sau răspunde:\\n\`\`\`${langId}\\ncodul_cu_blank\\n\`\`\`",
    "answer": "răspunsul corect exact",
    "explanation": "Explicație scurtă",
    "difficulty": "easy"
  }
]

RETURNEAZĂ STRICT JSON ARRAY, nimic altceva.`;
  }

  return callGemini(prompt);
}

// Generează exerciții coding: studentul scrie cod de la zero
async function generateCoding(lessonTitle, moduleTitle, slug, count) {
  const lang = LANG_HINT[slug] || "JavaScript";

  const prompt = `Ești un creator expert de exerciții de programare pentru o platformă de e-learning în ROMÂNĂ.

Generează exact ${count} exerciții de CODARE pentru:
- Modul: ${moduleTitle}
- Lecție: ${lessonTitle}
- Limbaj: ${lang}

CERINȚE OBLIGATORII:
1. Studentul scrie COD REAL de la zero (nu explică, nu alege din liste)
2. Exercițiul e DIRECT legat de topicul lecției — aplică exact conceptul predat
3. Dificultate: ${count >= 5 ? "2 easy, 2 medium, 1 hard" : count >= 3 ? "1 easy, 1 medium, 1 hard" : "mix"}
4. starterCode: cod de pornire cu comentarii // TODO (max 15 linii, clar și util)
5. expectedOutput: output-ul EXACT pe care îl produce programul — sau "" pentru HTML/CSS/React/Next.js
6. Cerința să fie concretă și contextualizată (ex: "cafenea", "magazin", "clasă de studenți")
7. Nu repeta concepte banale (nu face Hello World)

FORMAT JSON STRICT (array, fără text în afară):
[
  {
    "name": "Titlu scurt 3-5 cuvinte",
    "question": "Cerință clară și detaliată. Context real. Max 250 caractere.",
    "starterCode": "// TODO comentarii clare\\n",
    "expectedOutput": "output exact sau empty string",
    "difficulty": "easy"
  }
]

RETURNEAZĂ STRICT JSON ARRAY, nimic altceva.`;

  return callGemini(prompt);
}

async function withRetry(fn, label, maxRetries = 3) {
  for (let i = 1; i <= maxRetries; i++) {
    try {
      return await fn();
    } catch (e) {
      if (i === maxRetries) throw e;
      process.stdout.write(` retry${i}...`);
      await sleep(2000 * i);
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
      const quiz   = lesson.tasks.filter(t => t.type === "quiz").sort((a,b) => a.number - b.number);
      const fill   = lesson.tasks.filter(t => t.type === "fillblank").sort((a,b) => a.number - b.number);
      const coding = lesson.tasks.filter(t => t.type === "coding").sort((a,b) => a.number - b.number);

      const quizKeep   = quiz.slice(0, 5);
      const fillKeep   = fill.slice(0, 5);
      const codingKeep = coding.slice(0, 5);

      const toDelete = [
        ...quiz.slice(5),
        ...fill.slice(5),
        ...coding.slice(5),
      ];

      const fillNeeded   = 5 - fillKeep.length;
      const codingNeeded = 5 - codingKeep.length;

      const label = `L${lesson.order}. ${lesson.title.slice(0, 40)}`;

      if (toDelete.length === 0 && fillNeeded === 0 && codingNeeded === 0) {
        process.stdout.write(`  . ${label} — OK\n`);
        stats.skipped++;
        continue;
      }

      process.stdout.write(`  ${label} [q:${quiz.length}→${quizKeep.length} f:+${fillNeeded} c:+${codingNeeded}]`);

      // 1. Șterge task-urile în exces
      if (toDelete.length > 0) {
        await prisma.task.deleteMany({ where: { id: { in: toDelete.map(t => t.id) } } });
        stats.deleted += toDelete.length;
        process.stdout.write(` del${toDelete.length}`);
      }

      const maxNum = lesson.tasks.reduce((m, t) => Math.max(m, t.number), 0);
      let nextNum = maxNum + 1;

      // 2. Generează fillblank lipsă
      if (fillNeeded > 0) {
        try {
          const tasks = await withRetry(
            () => generateFillBlank(lesson.title, mod.title, mod.slug, fillNeeded),
            label
          );
          for (const t of tasks.slice(0, fillNeeded)) {
            await prisma.task.create({
              data: {
                lessonId:    lesson.id,
                number:      nextNum++,
                type:        "fillblank",
                difficulty:  ["easy","medium","hard"].includes(t.difficulty) ? t.difficulty : "medium",
                name:        (t.name || "Completează răspunsul").slice(0, 100),
                question:    (t.question || "Ce va afișa codul?").slice(0, 2000),
                answer:      (t.answer || "").slice(0, 500),
                explanation: t.explanation ? t.explanation.slice(0, 500) : null,
                options:     [],
                language:    lang,
                starterCode: null,
                expectedOutput: null,
              },
            });
            stats.fillAdded++;
          }
          process.stdout.write(` fill+${tasks.slice(0, fillNeeded).length}`);
        } catch (e) {
          process.stdout.write(` FILL_ERR:${e.message.slice(0, 50)}`);
          stats.errors++;
        }
        await sleep(700);
      }

      // 3. Generează coding lipsă
      if (codingNeeded > 0) {
        try {
          const tasks = await withRetry(
            () => generateCoding(lesson.title, mod.title, mod.slug, codingNeeded),
            label
          );
          for (const t of tasks.slice(0, codingNeeded)) {
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
          process.stdout.write(` code+${tasks.slice(0, codingNeeded).length}`);
        } catch (e) {
          process.stdout.write(` CODE_ERR:${e.message.slice(0, 50)}`);
          stats.errors++;
        }
        await sleep(700);
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
