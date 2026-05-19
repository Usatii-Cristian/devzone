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

  const diffHint = (n) => n >= 5 ? "2 easy, 2 medium, 1 hard" : n >= 3 ? "1 easy, 1 medium, 1 hard" : "mix easy/medium";

  // Exemple de calitate înaltă pentru fiecare tip
  const fillExample = isRunnable ? `
EXEMPLU FILLBLANK BUN (urmează acest nivel de calitate):
{
  "name": "Scoping funcție",
  "question": "Ce va afișa codul următor?\\n\`\`\`${langId}\\nx = 5\\ndef dublu(n):\\n    return n * 2\\nrezultat = dublu(x) + 3\\nprint(rezultat)\\n\`\`\`",
  "answer": "13",
  "explanation": "dublu(5) = 10, apoi 10 + 3 = 13. Funcția nu modifică x global.",
  "difficulty": "easy"
}
EXEMPLU FILLBLANK MEDIUM (urmează acest nivel):
{
  "name": "Iterare cu acumulare",
  "question": "Ce va afișa codul următor?\\n\`\`\`${langId}\\nnumere = [3, 7, 2, 8]\\ntotal = 0\\nfor n in numere:\\n    if n > 4:\\n        total += n\\nprint(total)\\n\`\`\`",
  "answer": "15",
  "explanation": "Doar 7 și 8 sunt > 4. 7 + 8 = 15.",
  "difficulty": "medium"
}` : `
EXEMPLU FILLBLANK BUN (urmează acest nivel de calitate):
{
  "name": "Flexbox centrare",
  "question": "Ce proprietate CSS lipsește pentru a centra elementele pe axa principală?\\n\`\`\`css\\n.container {\\n  display: flex;\\n  ___: center;\\n}\\n\`\`\`",
  "answer": "justify-content",
  "explanation": "justify-content controlează alinierea pe axa principală a flexbox-ului.",
  "difficulty": "easy"
}`;

  const codingExample = `
EXEMPLU CODING BUN (urmează acest nivel de calitate):
{
  "name": "Statistici vânzări",
  "question": "O librărie a vândut în 3 zile: 12, 8, 15 cărți. Calculează totalul, media zilnică și ziua cu cele mai multe vânzări.",
  "starterCode": "${comment} Lista cu vânzările pe 3 zile\\nvanzari = [12, 8, 15]\\n\\n${comment} TODO: calculează totalul\\n${comment} TODO: calculează media (rotunjit 2 zecimale)\\n${comment} TODO: găsește indexul zilei cu max vânzări (ziua 1, 2 sau 3)\\n${comment} TODO: afișează toate cele 3 rezultate\\n",
  "expectedOutput": "Total: 35\\nMedie: 11.67\\nCea mai buna zi: 3",
  "difficulty": "medium"
}`;

  const prompt = `Ești un creator expert de exerciții de programare pentru o platformă de e-learning în ROMÂNĂ.
Generezi conținut pentru studenți care învață să programeze — exercițiile trebuie să fie clare, concrete și să testeze ÎNȚELEGEREA reală, nu memorarea.

CONTEXT:
Modul: ${moduleTitle}
Lecție: ${lessonTitle}
Limbaj: ${lang}
Caracter comentariu: "${comment}" (FOLOSEȘTE EXACT ASTA în starterCode, nu alt caracter!)

${fillNeeded > 0 ? `━━━ SECȚIUNEA A: ${fillNeeded} exerciții FILLBLANK ━━━
${isRunnable ? `Tipul: studentul PREZICE OUTPUT-UL unui cod dat.
REGULI STRICTE:
• Codul demonstrează EXACT conceptul din lecție — nu cod generic
• OUTPUT DETERMINIST: ZERO random(), Date, input(), seed aleatoriu
• Output scurt (1-5 linii), dar NON-TRIVIAL — răspunsul nu trebuie să fie evident la prima vedere
• question: "Ce va afișa codul următor?\\n\`\`\`${langId}\\n...cod 5-12 linii...\\n\`\`\`"
• answer: output-ul EXACT, fără spații/newline extra la final` : `Tipul: studentul COMPLETEAZĂ valoarea/proprietatea lipsă dintr-un snippet de cod.
REGULI STRICTE:
• Arată cod real cu un ___ sau comentariu care indică ce lipsește
• Răspunsul e concis (1-8 cuvinte), dar necesită cunoașterea conceptului
• question include codul în bloc markdown \`\`\`${langId}\`\`\``}

${fillExample}

Generează ${fillNeeded} obiecte cu: name, question, answer, explanation, difficulty` : ""}

${codingNeeded > 0 ? `━━━ SECȚIUNEA B: ${codingNeeded} exerciții CODING ━━━
Tipul: studentul SCRIE COD de la zero, pornind de la un schelet cu TODO-uri.
REGULI STRICTE:
• Cerința e CONTEXTUALIZATĂ cu date reale (nu "scrie o funcție", ci "librăria X a vândut Y cărți")
• starterCode are ${comment} TODO comentarii UTILE care ghidează studentul pas cu pas
• FOLOSEȘTE EXACT "${comment}" ca prefix pentru comentarii — NU alt caracter!
• expectedOutput: OUTPUT EXACT și DETERMINISTIC cu valori fixe din cerință — sau "" dacă e HTML/CSS/React
• INTERZIS: exerciții triviale (Hello World, print simplu), output aleatoriu, import()-uri complexe

${codingExample}

Generează ${codingNeeded} obiecte cu: name, question, starterCode, expectedOutput, difficulty` : ""}

CERINȚE CALITATE:
• Dificultăți: ${diffHint(Math.max(fillNeeded, codingNeeded))}
• Exercițiile să fie DISTINCTE — nu variații ale aceluiași lucru
• Fiecare exercițiu testează un ASPECT DIFERIT al conceptului din lecție
• Toate textele în ROMÂNĂ (cod în limbajul specificat)

RĂSPUNS: JSON obiect STRICT, fără text în afara JSON:
{${fillNeeded > 0 ? `
  "fillblank": [ /* ${fillNeeded} obiecte */ ]${codingNeeded > 0 ? "," : ""}` : ""}${codingNeeded > 0 ? `
  "coding": [ /* ${codingNeeded} obiecte */ ]` : ""}
}`;

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
