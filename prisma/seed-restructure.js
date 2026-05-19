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

const REQUEST_DELAY = 6000; // ms între cereri — evită 429 pe ambele API-uri

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

// Exemple de calitate înaltă specifice fiecărui limbaj
// Arătăm modelului EXACT cum arată un exercițiu bun în limbajul țintă
const LANG_EXAMPLES = {
  python: {
    fill: {
      question: "Ce va afișa codul următor?\n```python\npreturi = [15, 8, 23, 4, 19]\ntotal = sum(p for p in preturi if p > 10)\nprint(f\"Total: {total} lei\")\n```",
      answer: "Total: 57 lei",
      explanation: "List comprehension filtrează valorile > 10 (15, 23, 19). Suma lor = 57.",
    },
    coding: {
      question: "Un student are notele: 8, 6, 9, 7, 10. Calculează media, nota maximă și câte note sunt peste medie. Afișează fiecare pe câte o linie.",
      starterCode: "# Lista cu notele studentului\nnote = [8, 6, 9, 7, 10]\n\n# TODO: calculează media (rotunjit 2 zecimale)\n# TODO: găsește nota maximă\n# TODO: numără notele peste medie\n# TODO: afișează cele 3 rezultate\n",
      expectedOutput: "Media: 8.0\nMaxim: 10\nPeste medie: 3",
    },
  },
  javascript: {
    fill: {
      question: "Ce va afișa codul următor?\n```javascript\nconst produse = ['carte', 'pix', 'caiet'];\nconst rezultat = produse\n  .filter(p => p.length > 3)\n  .map(p => p.toUpperCase());\nconsole.log(rezultat.join(', '));\n```",
      answer: "CARTE, CAIET",
      explanation: "'pix' are 3 caractere (nu trece filtrul). 'carte' și 'caiet' sunt transformate cu toUpperCase.",
    },
    coding: {
      question: "Un magazin online are 3 produse cu prețuri: laptop 3200, mouse 85, tastatura 240. Calculează totalul, aplică discount 10% și afișează prețul final formatat cu 2 zecimale.",
      starterCode: "// Produsele cu preturile lor\nconst produse = [\n  { nume: 'laptop', pret: 3200 },\n  { nume: 'mouse', pret: 85 },\n  { nume: 'tastatura', pret: 240 }\n];\n\n// TODO: calculează totalul cu reduce()\n// TODO: aplică discount de 10%\n// TODO: afișează pretul final\n",
      expectedOutput: "Total dupa discount: 3178.50 lei",
    },
  },
  c: {
    fill: {
      question: "Ce va afișa codul următor?\n```c\n#include <stdio.h>\nint main() {\n    int v[] = {5, 3, 8, 1, 9};\n    int max = v[0];\n    for (int i = 1; i < 5; i++)\n        if (v[i] > max) max = v[i];\n    printf(\"Max: %d\\n\", max);\n    return 0;\n}\n```",
      answer: "Max: 9",
      explanation: "Parcurge array-ul și actualizează max când găsește un element mai mare. Maximul din {5,3,8,1,9} este 9.",
    },
    coding: {
      question: "Scrie un program C care calculează suma și produsul primelor 5 numere naturale (1-5) și le afișează pe linii separate.",
      starterCode: "#include <stdio.h>\nint main() {\n    // TODO: declară suma și produsul cu valorile inițiale corecte\n    // TODO: parcurge numerele 1-5 cu un for\n    // TODO: actualizează suma și produsul\n    // TODO: afișează rezultatele\n    return 0;\n}\n",
      expectedOutput: "Suma: 15\nProdusul: 120",
    },
  },
  cpp: {
    fill: {
      question: "Ce va afișa codul următor?\n```cpp\n#include <iostream>\n#include <vector>\nusing namespace std;\nint main() {\n    vector<int> v = {2, 4, 6, 8};\n    int s = 0;\n    for (int x : v) s += x;\n    cout << \"Suma: \" << s << endl;\n    return 0;\n}\n```",
      answer: "Suma: 20",
      explanation: "Range-based for loop adună toate elementele: 2+4+6+8 = 20.",
    },
    coding: {
      question: "Scrie un program C++ care primește un vector cu 4 temperaturi (22, 18, 25, 30) și afișează media și câte zile au fost mai calde decât media.",
      starterCode: "#include <iostream>\n#include <vector>\nusing namespace std;\nint main() {\n    vector<int> temp = {22, 18, 25, 30};\n    // TODO: calculează media temperaturii\n    // TODO: numără zilele peste medie\n    // TODO: afișează media și numărul de zile\n    return 0;\n}\n",
      expectedOutput: "Media: 23.75\nZile calde: 2",
    },
  },
  java: {
    fill: {
      question: "Ce va afișa codul următor?\n```java\npublic class Main {\n    public static void main(String[] args) {\n        int[] note = {7, 9, 6, 8, 10};\n        int suma = 0;\n        for (int n : note) suma += n;\n        System.out.println(\"Media: \" + suma/note.length);\n    }\n}\n```",
      answer: "Media: 8",
      explanation: "Suma = 40, împărțit la 5 elemente = 8. Împărțire int/int = trunchere (40/5=8 exact).",
    },
    coding: {
      question: "Scrie o clasă Java cu metoda main care calculează factorialul lui 6 printr-un for, și afișează rezultatul.",
      starterCode: "public class Main {\n    public static void main(String[] args) {\n        int n = 6;\n        // TODO: inițializează rezultatul factorial\n        // TODO: parcurge de la 1 la n cu for\n        // TODO: înmulțește acumulatorul\n        // TODO: afișează rezultatul\n    }\n}\n",
      expectedOutput: "Factorial(6) = 720",
    },
  },
  csharp: {
    fill: {
      question: "Ce va afișa codul următor?\n```csharp\nusing System;\nclass Program {\n    static void Main() {\n        string[] zile = {\"Luni\", \"Marți\", \"Miercuri\"};\n        foreach (string z in zile)\n            if (z.Length > 4) Console.WriteLine(z);\n    }\n}\n```",
      answer: "Marți\nMiercuri",
      explanation: "\"Luni\" are 4 caractere (nu trece), \"Marți\" are 5 și \"Miercuri\" are 8 — ambele sunt afișate.",
    },
    coding: {
      question: "Scrie un program C# care afișează suma și cel mai mare număr dintr-un array cu valorile {12, 7, 25, 3, 18}.",
      starterCode: "using System;\nclass Program {\n    static void Main() {\n        int[] numere = {12, 7, 25, 3, 18};\n        // TODO: calculează suma cu foreach\n        // TODO: găsește maximul\n        // TODO: afișează suma și maximul\n    }\n}\n",
      expectedOutput: "Suma: 65\nMaxim: 25",
    },
  },
  sql: {
    fill: {
      question: "Ce va returna interogarea?\n```sql\nSELECT departament, COUNT(*) as angajati, AVG(salariu) as salariu_mediu\nFROM angajati\nGROUP BY departament\nHAVING COUNT(*) > 2;\n```\nTabelul angajati: IT(5 ang, medie 6000), HR(2 ang, medie 4500), Vanzari(4 ang, medie 5000)",
      answer: "IT | 5 | 6000\nVanzari | 4 | 5000",
      explanation: "HAVING filtrează grupurile cu mai mult de 2 angajați. HR are exact 2, deci e exclus.",
    },
    coding: {
      question: "Scrie o interogare SQL care să afișeze numele și prețul produselor mai scumpe de 100 lei, ordonate descrescător după preț, limitat la primele 3 rezultate.",
      starterCode: "-- TODO: SELECT coloanele necesare\n-- TODO: din tabela 'produse'\n-- TODO: WHERE conditia de pret\n-- TODO: ORDER BY descrescator\n-- TODO: LIMIT 3\n",
      expectedOutput: "",
    },
  },
  php: {
    fill: {
      question: "Ce va afișa codul următor?\n```php\n<?php\n$produse = ['mere' => 2.5, 'lapte' => 4.0, 'paine' => 3.2];\n$total = array_sum($produse);\necho 'Total: ' . number_format($total, 2) . ' lei';\n?>\n```",
      answer: "Total: 9.70 lei",
      explanation: "array_sum() sumează valorile: 2.5+4.0+3.2 = 9.7. number_format cu 2 zecimale afișează 9.70.",
    },
    coding: {
      question: "Scrie cod PHP care parcurge un array asociativ cu 3 studenți și notele lor (Ana=>9, Ion=>7, Maria=>8) și afișează pe fiecare linie: 'Nume: nota' și la final media clasei.",
      starterCode: "<?php\n$studenti = ['Ana' => 9, 'Ion' => 7, 'Maria' => 8];\n\n// TODO: parcurge array-ul asociativ cu foreach\n// TODO: afișează fiecare student cu nota\n// TODO: calculează și afișează media\n?>\n",
      expectedOutput: "Ana: 9\nIon: 7\nMaria: 8\nMedia: 8.00",
    },
  },
  html: {
    fill: {
      question: "Ce atribut HTML lipsește pentru ca imaginea să fie accesibilă?\n```html\n<img src=\"logo.png\" ___=\"Logo companie\">\n```",
      answer: "alt",
      explanation: "Atributul alt oferă text alternativ pentru screen readere și când imaginea nu se încarcă.",
    },
    coding: {
      question: "Creează o pagină HTML cu un header care conține titlul 'Meniu Restaurant', o lista neordonată cu 3 feluri de mâncare și un footer cu textul 'Copyright 2024'.",
      starterCode: "<!DOCTYPE html>\n<html lang=\"ro\">\n<head>\n    <!-- TODO: meta charset și titlul paginii -->\n</head>\n<body>\n    <!-- TODO: header cu titlul -->\n    <!-- TODO: lista neordonata cu 3 feluri -->\n    <!-- TODO: footer cu copyright -->\n</body>\n</html>\n",
      expectedOutput: "",
    },
  },
  css: {
    fill: {
      question: "Ce proprietate CSS lipsește pentru a face textul aldine (bold)?\n```css\n.titlu {\n  font-size: 24px;\n  ___: bold;\n  color: #333;\n}\n```",
      answer: "font-weight",
      explanation: "font-weight controlează grosimea fontului. Valoarea 'bold' sau 700 face textul aldine.",
    },
    coding: {
      question: "Scrie CSS pentru un card cu: fundal alb, border-radius 8px, box-shadow subtil, padding 20px, lățime maximă 400px și centrat pe pagină cu margin auto.",
      starterCode: "/* Stilizare card */\n.card {\n  /* TODO: fundal alb */\n  /* TODO: colțuri rotunjite 8px */\n  /* TODO: umbră: 0 2px 8px rgba(0,0,0,0.1) */\n  /* TODO: padding 20px */\n  /* TODO: latime maxima 400px */\n  /* TODO: centrare orizontala */\n}\n",
      expectedOutput: "",
    },
  },
  cybersecurity: {
    fill: {
      question: "Ce va afișa codul următor? (demonstrează un hash simplu)\n```javascript\nconst crypto = require('crypto');\nconst hash = crypto.createHash('sha256')\n  .update('parola123')\n  .digest('hex')\n  .substring(0, 8);\nconsole.log('Hash:', hash);\n```",
      answer: "Hash: ef92b778",
      explanation: "SHA-256 al string-ului 'parola123' începe cu 'ef92b778'. Hash-ul e determinist — același input produce mereu același output.",
    },
    coding: {
      question: "Scrie o funcție JS care validează o parolă: minim 8 caractere, cel puțin o literă mare, cel puțin o cifră. Testează cu 'Parola1' și 'abc123'.",
      starterCode: "// Funcție de validare parolă\nfunction valideazaParola(parola) {\n  // TODO: verifică lungimea minimă (>= 8)\n  // TODO: verifică cel puțin o literă mare (regex)\n  // TODO: verifică cel puțin o cifră (regex)\n  // TODO: returnează true/false\n}\n\nconsole.log(valideazaParola('Parola1'));\nconsole.log(valideazaParola('abc123'));\n",
      expectedOutput: "false\nfalse",
    },
  },
};

// Fallback la python dacă nu există exemplu specific
function getLangExamples(slug) {
  if (LANG_EXAMPLES[slug]) return LANG_EXAMPLES[slug];
  // react/nextjs → javascript style
  if (["react","nextjs-frontend","nextjs-backend","tailwind"].includes(slug))
    return LANG_EXAMPLES[slug === "tailwind" ? "html" : "javascript"];
  if (slug === "cpp") return LANG_EXAMPLES.cpp;
  return LANG_EXAMPLES.python;
}

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

  // Exemple specifice limbajului curent
  const ex = getLangExamples(slug);

  const fillExampleJson = JSON.stringify({
    name: "Exemplu titlu",
    question: ex.fill.question,
    answer: ex.fill.answer,
    explanation: ex.fill.explanation,
    difficulty: "easy",
  }, null, 2);

  const codingExampleJson = JSON.stringify({
    name: "Exemplu titlu",
    question: ex.coding.question,
    starterCode: ex.coding.starterCode,
    expectedOutput: ex.coding.expectedOutput,
    difficulty: "medium",
  }, null, 2);

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

EXEMPLU (în ${lang}, urmează EXACT acest nivel):
${fillExampleJson}

Generează ${fillNeeded} obiecte cu aceeași structură și calitate, specifice lecției "${lessonTitle}".` : ""}

${codingNeeded > 0 ? `━━━ SECȚIUNEA B: ${codingNeeded} exerciții CODING ━━━
Tipul: studentul SCRIE COD de la zero, pornind de la un schelet cu TODO-uri.
REGULI STRICTE:
• Cerința e CONTEXTUALIZATĂ cu date reale (nu "scrie o funcție", ci "magazinul X are Y produse")
• starterCode are ${comment} TODO comentarii UTILE care ghidează studentul pas cu pas
• FOLOSEȘTE EXACT "${comment}" ca prefix pentru comentarii — NU alt caracter!
• expectedOutput: OUTPUT EXACT și DETERMINISTIC cu valori fixe din cerință — sau "" dacă e HTML/CSS/React
• INTERZIS: exerciții triviale, output aleatoriu, import()-uri nestandard

EXEMPLU (în ${lang}, urmează EXACT acest nivel):
${codingExampleJson}

Generează ${codingNeeded} obiecte cu aceeași structură și calitate, specifice lecției "${lessonTitle}".` : ""}

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
