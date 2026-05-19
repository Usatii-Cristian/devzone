/**
 * seed-ai-coding.js
 * Adds 5 coding tasks to every lesson that has fewer than 3 coding tasks.
 * Uses Gemini 2.5 Flash (no thinking) to generate contextual tasks.
 * Run: node prisma/seed-ai-coding.js
 */
require("dotenv").config({ path: ".env" });
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const API_KEY = process.env.GOOGLE_AI_KEY;

// Language to use for code execution per module slug
const MODULE_LANG = {
  python:           "python",
  javascript:       "javascript",
  html:             "html",
  css:              "css",
  tailwind:         "html",
  react:            "javascript",
  "nextjs-frontend":"javascript",
  "nextjs-backend": "javascript",
  c:                "c",
  cpp:              "cpp",
  csharp:           "csharp",
  java:             "java",
  cybersecurity:    "javascript",
  sql:              "sql",
  php:              "php",
};

// Language hints for the prompt
const LANG_HINT = {
  python:      "Python 3 — rulează cu print(), fără input()",
  javascript:  "JavaScript pur (Node.js) — folosește console.log(), fără DOM",
  html:        "HTML5 pur — fișier HTML complet sau fragment, fără JS",
  css:         "CSS pur — selector + proprietăți, fără HTML",
  tailwind:    "HTML cu clase Tailwind CSS — fișier HTML complet sau fragment",
  react:       "React cu JSX — componentă funcțională, evaluată de AI (nu se rulează)",
  "nextjs-frontend": "Next.js / React — componentă sau configurație, evaluată de AI",
  "nextjs-backend":  "Next.js API Route sau Server Action — cod JS/TS, evaluat de AI",
  c:           "C standard — include <stdio.h>, compilat cu gcc, fără input interactiv",
  cpp:         "C++ standard — include <iostream>, using namespace std, fără input interactiv",
  csharp:      "C# — clasa Program cu static void Main, Console.WriteLine, fără input interactiv",
  java:        "Java — clasa Main cu public static void main, System.out.println, fără input interactiv",
  cybersecurity: "JavaScript (Node.js) — demonstrează conceptul de securitate prin cod",
  sql:         "SQL standard (SQLite/MySQL) — SELECT/INSERT/UPDATE/CREATE etc.",
  php:         "PHP 8 — <?php ... ?>, folosește echo, fără input interactiv",
};

async function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function generateTasks(lessonTitle, moduleTitle, slug, count) {
  if (!API_KEY) throw new Error("GOOGLE_AI_KEY missing");
  const lang = LANG_HINT[slug] || "JavaScript";

  const prompt = `Ești un creator expert de exerciții de programare pentru o platformă de e-learning în limba ROMÂNĂ.

Generează exact ${count} exerciții de CODARE pentru:
- Modul: ${moduleTitle}
- Lecție: ${lessonTitle}
- Limbaj: ${lang}

CERINȚE OBLIGATORII pentru fiecare exercițiu:
1. Studentul trebuie să SCRIE COD real, nu să explice sau să aleagă dintr-o listă
2. Exercițiul trebuie să fie DIRECT legat de topicul lecției
3. Dificultate: ${count >= 5 ? "2 easy, 2 medium, 1 hard" : count >= 3 ? "1 easy, 1 medium, 1 hard" : "mix"}
4. starterCode: cod de pornire cu comentarii TODO (max 15 linii)
5. expectedOutput: output-ul EXACT pe care îl va produce programul când rulează (sau "" dacă nu produce output determinist, cum e HTML/CSS/React/Next.js)
6. Pentru ${lang.includes("HTML") || lang.includes("CSS") || lang.includes("React") || lang.includes("Next") ? "HTML/CSS/React/Next.js: structura codului e evaluată de AI, expectedOutput poate fi \"\"" : "limbaje compilate/interpretate: includeți output exact și determinist"}

FORMAT RĂSPUNS — STRICT JSON array, fără text în afara JSON-ului:
[
  {
    "name": "Titlu scurt 3-5 cuvinte",
    "question": "Cerință clară și detaliată. Descrie ce trebuie să construiască studentul, cu context real (cafenea, magazin online, blog etc.). Max 200 caractere.",
    "starterCode": "// Codul de start cu TODO-uri\\n",
    "expectedOutput": "output exact sau empty string",
    "difficulty": "easy"
  }
]

Returnează STRICT array-ul JSON, nimic altceva.`;

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: { maxOutputTokens: 2048, temperature: 0.7, thinkingConfig: { thinkingBudget: 0 } },
      }),
    }
  );

  if (!res.ok) throw new Error(`Gemini ${res.status}: ${await res.text()}`);
  const data = await res.json();

  const parts = data.candidates?.[0]?.content?.parts ?? [];
  const textPart = parts.find(p => !p.thought) || parts[0];
  let text = (textPart?.text ?? "").trim();
  text = text.replace(/^```json\s*/i, "").replace(/^```\s*/i, "").replace(/\s*```$/i, "").trim();

  if (text.startsWith("{")) {
    try {
      const obj = JSON.parse(text);
      const key = Object.keys(obj).find(k => Array.isArray(obj[k]));
      if (key) text = JSON.stringify(obj[key]);
    } catch {}
  }

  const tasks = JSON.parse(text);
  if (!Array.isArray(tasks)) throw new Error("Not an array");
  return tasks;
}

async function main() {
  const modules = await prisma.module.findMany({
    orderBy: { order: "asc" },
    include: {
      lessons: {
        orderBy: { order: "asc" },
        include: { tasks: { select: { id: true, type: true, number: true } } },
      },
    },
  });

  let totalAdded = 0, skipped = 0, errors = 0;

  for (const mod of modules) {
    const lang = MODULE_LANG[mod.slug] || "javascript";
    console.log(`\n=== ${mod.title} [${mod.slug}] ===`);

    for (const lesson of mod.lessons) {
      const codingTasks = lesson.tasks.filter(t => t.type === "coding");
      const needed = Math.max(0, 5 - codingTasks.length);

      if (needed === 0) {
        process.stdout.write(`  . L${lesson.order} already ok\n`);
        skipped++;
        continue;
      }

      const maxNum = lesson.tasks.reduce((m, t) => Math.max(m, t.number), 0);
      process.stdout.write(`  L${lesson.order}. ${lesson.title.slice(0, 42)} — need ${needed}... `);

      let retries = 0;
      while (retries < 3) {
        try {
          const tasks = await generateTasks(lesson.title, mod.title, mod.slug, needed);
          let num = maxNum + 1;

          for (const t of tasks.slice(0, needed)) {
            await prisma.task.create({
              data: {
                lessonId: lesson.id,
                number: num++,
                type: "coding",
                difficulty: ["easy", "medium", "hard"].includes(t.difficulty) ? t.difficulty : "medium",
                name: (t.name || "Exercițiu coding").slice(0, 100),
                question: (t.question || "Scrie codul cerut.").slice(0, 1000),
                answer: "",
                options: [],
                language: lang,
                starterCode: (t.starterCode || "// Scrie codul tău\n").slice(0, 2000),
                expectedOutput: (t.expectedOutput || "").slice(0, 500),
              },
            });
            totalAdded++;
          }
          console.log(`✓ +${tasks.slice(0, needed).length}`);
          break;
        } catch (e) {
          retries++;
          if (retries === 3) {
            console.log(`✗ FAIL: ${e.message.slice(0, 80)}`);
            errors++;
          } else {
            process.stdout.write(`retry${retries}... `);
            await sleep(2000 * retries);
          }
        }
      }

      // Respectăm rate limit Gemini: ~800ms între cereri
      await sleep(800);
    }
  }

  console.log(`\n${"=".repeat(50)}`);
  console.log(`Added: ${totalAdded} coding tasks`);
  console.log(`Skipped (already ok): ${skipped}`);
  console.log(`Errors: ${errors}`);
  console.log(`${"=".repeat(50)}`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
