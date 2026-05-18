const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const TASKS = {
  "tailwind-introducere": [
    { name: "Card Tailwind de bază", diff: "easy",
      q: "Scrie HTML cu clase Tailwind pentru un card simplu: container cu `bg-white rounded-xl shadow-md p-6`, titlu `text-xl font-bold text-gray-800`, și un paragraf `text-gray-600 mt-2`. Nu uita DOCTYPE.",
      code: "<!-- Card cu Tailwind CSS -->\n<div class=\"bg-white rounded-xl shadow-md p-6 max-w-sm\">\n  <h2 class=\"text-xl font-bold text-gray-800\">Titlu Card</h2>\n  <p class=\"text-gray-600 mt-2\">Descrierea cardului vine aici.</p>\n</div>" },
    { name: "Buton stilizat Tailwind", diff: "easy",
      q: "Scrie HTML pentru un buton cu clase Tailwind: `bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition-colors cursor-pointer`. Adaugă și un buton outline cu border.",
      code: "<button class=\"bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition-colors cursor-pointer\">\n  Buton Primary\n</button>\n\n<button class=\"border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 font-bold py-2 px-4 rounded-lg transition-colors cursor-pointer ml-2\">\n  Buton Outline\n</button>" },
  ],
  "tailwind-responsive-states": [
    { name: "Layout responsive Tailwind", diff: "medium",
      q: "Scrie un grid responsive cu Tailwind: pe mobile 1 coloană (`grid-cols-1`), pe md 2 coloane, pe lg 3 coloane. Gap de 4. 3 carduri cu `bg-blue-100 p-4 rounded-lg` și text centrat.",
      code: "<div class=\"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4\">\n  <div class=\"bg-blue-100 p-4 rounded-lg text-center\">Card 1</div>\n  <div class=\"bg-blue-100 p-4 rounded-lg text-center\">Card 2</div>\n  <div class=\"bg-blue-100 p-4 rounded-lg text-center\">Card 3</div>\n</div>" },
    { name: "Hover și focus states", diff: "easy",
      q: "Scrie un input cu Tailwind care: are border gray, la focus devine `ring-2 ring-indigo-500 border-indigo-500`, placeholder gri. Adaugă un label deasupra.",
      code: "<div class=\"max-w-sm p-4\">\n  <label class=\"block text-sm font-medium text-gray-700 mb-1\">Email</label>\n  <input type=\"email\" placeholder=\"numele@exemplu.ro\"\n    class=\"w-full px-3 py-2 border border-gray-300 rounded-lg\n           focus:outline-none focus:ring-2 focus:ring-indigo-500\n           focus:border-indigo-500 placeholder-gray-400\"/>\n</div>" },
  ],
  "tailwind-components": [
    { name: "Badge și tag-uri", diff: "easy",
      q: "Creează 4 badge-uri cu Tailwind pentru statusuri: 'Activ' (verde), 'Inactiv' (roșu), 'Pending' (galben), 'Draft' (gri). Fiecare cu `text-xs font-semibold px-2.5 py-0.5 rounded-full`.",
      code: "<div class=\"flex gap-2 p-4\">\n  <span class=\"text-xs font-semibold px-2.5 py-0.5 rounded-full bg-green-100 text-green-800\">Activ</span>\n  <span class=\"text-xs font-semibold px-2.5 py-0.5 rounded-full bg-red-100 text-red-800\">Inactiv</span>\n  <span class=\"text-xs font-semibold px-2.5 py-0.5 rounded-full bg-yellow-100 text-yellow-800\">Pending</span>\n  <span class=\"text-xs font-semibold px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-800\">Draft</span>\n</div>" },
    { name: "Alert component", diff: "medium",
      q: "Creează 3 alerte cu Tailwind: success (verde cu `bg-green-50 border-green-400`), warning (galben), error (roșu). Fiecare cu un icon text (✓/⚠/✗), titlu bold și mesaj.",
      code: "<div class=\"space-y-3 p-4 max-w-md\">\n  <div class=\"flex items-start gap-3 bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg\">\n    <span class=\"text-green-600 font-bold\">✓</span>\n    <div><p class=\"font-semibold text-green-800\">Succes</p><p class=\"text-green-700 text-sm\">Operatia a reusit.</p></div>\n  </div>\n  <div class=\"flex items-start gap-3 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg\">\n    <span class=\"text-yellow-600 font-bold\">⚠</span>\n    <div><p class=\"font-semibold text-yellow-800\">Avertisment</p><p class=\"text-yellow-700 text-sm\">Verificati datele.</p></div>\n  </div>\n  <div class=\"flex items-start gap-3 bg-red-50 border-l-4 border-red-400 p-4 rounded-r-lg\">\n    <span class=\"text-red-600 font-bold\">✗</span>\n    <div><p class=\"font-semibold text-red-800\">Eroare</p><p class=\"text-red-700 text-sm\">A aparut o problema.</p></div>\n  </div>\n</div>" },
  ],
  "tailwind-customization": [
    { name: "Config Tailwind extins", diff: "medium",
      q: "Scrie configurația `tailwind.config.js` care extinde tema cu: culori custom (`brand: { primary: '#6366f1', secondary: '#8b5cf6' }`), font `'Inter'` ca font sans, și breakpoint custom `xs: '480px'`.",
      code: "// tailwind.config.js\nmodule.exports = {\n  content: ['./src/**/*.{html,js}'],\n  theme: {\n    extend: {\n      colors: {\n        brand: {\n          primary: '#6366f1',\n          secondary: '#8b5cf6',\n        }\n      },\n      fontFamily: {\n        sans: ['Inter', 'system-ui', 'sans-serif'],\n      },\n      screens: {\n        xs: '480px',\n      }\n    }\n  },\n  plugins: []\n}" },
  ],
  "tailwind-setup-instalare": [
    { name: "PostCSS config", diff: "easy",
      q: "Scrie fișierele de configurare pentru Tailwind v4 în Next.js: `postcss.config.mjs` și `globals.css` cu directivele Tailwind. Adaugă și importul în layout.",
      code: "// postcss.config.mjs\nconst config = {\n  plugins: {\n    '@tailwindcss/postcss': {}\n  }\n};\nexport default config;\n\n/* globals.css */\n@import 'tailwindcss';\n\n/* Stiluri globale */\nbody {\n  font-family: system-ui, sans-serif;\n}" },
  ],
  "tailwind-colors-bg": [
    { name: "Paletă de culori", diff: "easy",
      q: "Creează un grid 5x2 cu clase Tailwind care afișează diferite nuanțe ale culorii blue (100-500) și indigo (100-500). Fiecare celulă cu padding și text centrat cu codul culorii.",
      code: "<div class=\"grid grid-cols-5 gap-2 p-4 max-w-lg\">\n  <div class=\"bg-blue-100 p-3 text-center text-xs rounded\">100</div>\n  <div class=\"bg-blue-200 p-3 text-center text-xs rounded\">200</div>\n  <div class=\"bg-blue-300 p-3 text-center text-xs rounded\">300</div>\n  <div class=\"bg-blue-400 p-3 text-center text-xs text-white rounded\">400</div>\n  <div class=\"bg-blue-500 p-3 text-center text-xs text-white rounded\">500</div>\n  <div class=\"bg-indigo-100 p-3 text-center text-xs rounded\">100</div>\n  <div class=\"bg-indigo-200 p-3 text-center text-xs rounded\">200</div>\n  <div class=\"bg-indigo-300 p-3 text-center text-xs rounded\">300</div>\n  <div class=\"bg-indigo-400 p-3 text-center text-xs text-white rounded\">400</div>\n  <div class=\"bg-indigo-500 p-3 text-center text-xs text-white rounded\">500</div>\n</div>" },
  ],
  "tailwind-typography": [
    { name: "Hierarhie tipografică", diff: "easy",
      q: "Creează o pagină cu hierarhie tipografică completă cu Tailwind: h1 (text-4xl font-black), h2 (text-2xl font-bold), h3 (text-xl font-semibold), paragraf (text-base), small text (text-sm text-gray-500).",
      code: "<div class=\"max-w-2xl mx-auto p-8 space-y-4\">\n  <h1 class=\"text-4xl font-black text-gray-900\">Titlu Principal H1</h1>\n  <h2 class=\"text-2xl font-bold text-gray-800\">Subtitlu H2</h2>\n  <h3 class=\"text-xl font-semibold text-gray-700\">Secțiune H3</h3>\n  <p class=\"text-base text-gray-600 leading-relaxed\">Paragraf normal cu text de baza. Lorem ipsum dolor sit amet.</p>\n  <p class=\"text-sm text-gray-500\">Text mic, note, metadate.</p>\n</div>" },
  ],
  "tailwind-borders-shadows": [
    { name: "Card cu shadow și border", diff: "easy",
      q: "Creează 3 carduri cu shadow-uri diferite (shadow-sm, shadow-md, shadow-xl) și border-uri diferite (border, border-2 border-blue-300, border-0). Fiecare cu p-6 și rounded-xl.",
      code: "<div class=\"flex gap-4 p-8 bg-gray-50\">\n  <div class=\"bg-white p-6 rounded-xl shadow-sm border flex-1\">\n    <p class=\"font-semibold\">Shadow SM + Border</p>\n  </div>\n  <div class=\"bg-white p-6 rounded-xl shadow-md border-2 border-blue-300 flex-1\">\n    <p class=\"font-semibold\">Shadow MD + Blue Border</p>\n  </div>\n  <div class=\"bg-white p-6 rounded-xl shadow-xl flex-1\">\n    <p class=\"font-semibold\">Shadow XL, no border</p>\n  </div>\n</div>" },
  ],
  "tailwind-grid": [
    { name: "Dashboard grid layout", diff: "medium",
      q: "Creează un layout de dashboard cu Tailwind Grid: header care ocupă toata lățimea (col-span-full), sidebar (col-span-1), main content (col-span-3), footer (col-span-full). Grid cu 4 coloane.",
      code: "<div class=\"grid grid-cols-4 gap-4 p-4 min-h-screen\">\n  <header class=\"col-span-full bg-indigo-600 text-white p-4 rounded-lg\">Header</header>\n  <aside class=\"col-span-1 bg-gray-100 p-4 rounded-lg\">Sidebar</aside>\n  <main class=\"col-span-3 bg-white p-4 rounded-lg shadow\">Main Content</main>\n  <footer class=\"col-span-full bg-gray-800 text-white p-4 rounded-lg\">Footer</footer>\n</div>" },
  ],
  "tailwind-animations": [
    { name: "Animații cu Tailwind", diff: "medium",
      q: "Creează 4 elemente cu animații Tailwind built-in: `animate-spin` (loading spinner), `animate-ping` (notification dot), `animate-pulse` (skeleton loader), `animate-bounce` (arrow down).",
      code: "<div class=\"flex items-center gap-8 p-8\">\n  <!-- Spinner -->\n  <div class=\"animate-spin w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full\"></div>\n  \n  <!-- Ping -->\n  <div class=\"relative\">\n    <div class=\"animate-ping absolute w-3 h-3 bg-red-400 rounded-full\"></div>\n    <div class=\"w-3 h-3 bg-red-500 rounded-full\"></div>\n  </div>\n  \n  <!-- Pulse skeleton -->\n  <div class=\"animate-pulse bg-gray-200 rounded w-32 h-4\"></div>\n  \n  <!-- Bounce -->\n  <div class=\"animate-bounce text-2xl\">↓</div>\n</div>" },
  ],
  "tailwind-dark-mode": [
    { name: "Card cu dark mode", diff: "medium",
      q: "Creează un card cu suport dark mode complet: `bg-white dark:bg-gray-800`, titlu `text-gray-900 dark:text-white`, text `text-gray-600 dark:text-gray-300`, border `border-gray-200 dark:border-gray-700`.",
      code: "<div class=\"bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 max-w-sm shadow-sm\">\n  <h2 class=\"text-gray-900 dark:text-white font-bold text-lg mb-2\">Card cu Dark Mode</h2>\n  <p class=\"text-gray-600 dark:text-gray-300 text-sm\">Acest card se adaptează automat la tema dark sau light.</p>\n  <button class=\"mt-4 bg-indigo-600 dark:bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90\">\n    Acțiune\n  </button>\n</div>" },
  ],
  "tailwind-flexbox-avansat": [
    { name: "Navigation bar cu Flexbox", diff: "medium",
      q: "Creează un navbar cu Tailwind Flexbox: logo la stânga, linkuri în centru, butoane la dreapta. Pe mobile ascunde linkurile (hidden md:flex). Sticky cu shadow.",
      code: "<nav class=\"sticky top-0 bg-white shadow-sm px-6 py-3 flex items-center justify-between\">\n  <span class=\"font-black text-indigo-600 text-lg\">DevZone</span>\n  \n  <div class=\"hidden md:flex items-center gap-6\">\n    <a href=\"#\" class=\"text-gray-600 hover:text-indigo-600 font-medium text-sm\">Acasa</a>\n    <a href=\"#\" class=\"text-gray-600 hover:text-indigo-600 font-medium text-sm\">Cursuri</a>\n    <a href=\"#\" class=\"text-gray-600 hover:text-indigo-600 font-medium text-sm\">Despre</a>\n  </div>\n  \n  <div class=\"flex items-center gap-2\">\n    <button class=\"text-sm text-gray-600 px-3 py-1.5 rounded-lg hover:bg-gray-100\">Login</button>\n    <button class=\"text-sm bg-indigo-600 text-white px-3 py-1.5 rounded-lg hover:bg-indigo-700\">Inregistrare</button>\n  </div>\n</nav>" },
  ],
  "tailwind-states-variants": [
    { name: "Form cu all states", diff: "medium",
      q: "Creează un formular cu Tailwind care demonstrează toate stările: normal, hover, focus, disabled, invalid. Include un input text și un buton.",
      code: "<form class=\"max-w-sm p-6 space-y-4\">\n  <!-- Input normal cu focus/hover -->\n  <input type=\"text\" placeholder=\"Input normal\"\n    class=\"w-full px-3 py-2 border border-gray-300 rounded-lg\n           hover:border-gray-400\n           focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500\n           disabled:bg-gray-100 disabled:cursor-not-allowed\"/>\n  \n  <!-- Input disabled -->\n  <input type=\"text\" value=\"Input dezactivat\" disabled\n    class=\"w-full px-3 py-2 border border-gray-300 rounded-lg\n           disabled:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-400\"/>\n  \n  <!-- Buton cu toate stările -->\n  <button type=\"submit\"\n    class=\"w-full py-2 px-4 bg-indigo-600 text-white rounded-lg font-medium\n           hover:bg-indigo-700 active:bg-indigo-800\n           focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2\n           disabled:opacity-50 disabled:cursor-not-allowed\n           transition-colors\">\n    Trimite\n  </button>\n</form>" },
  ],
  "tailwind-glassmorphism": [
    { name: "Glassmorphism card", diff: "medium",
      q: "Creează un card glassmorphism cu Tailwind: fundal gradient colorat, card cu `bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl shadow-xl`. Text alb.",
      code: "<div class=\"min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-8\">\n  <div class=\"bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl shadow-xl p-8 max-w-sm w-full\">\n    <h2 class=\"text-white font-bold text-2xl mb-2\">Glassmorphism</h2>\n    <p class=\"text-white/80 text-sm mb-4\">Un design modern cu efect de sticla.</p>\n    <button class=\"w-full bg-white/30 hover:bg-white/40 text-white font-semibold py-2 px-4 rounded-xl border border-white/50 transition-colors\">\n      Click me\n    </button>\n  </div>\n</div>" },
  ],
  "tailwind-v4-features": [
    { name: "Tailwind v4 CSS variables", diff: "hard",
      q: "Scrie CSS cu Tailwind v4 folosind `@theme` pentru variabile custom. Definește `--color-brand: #6366f1` și `--spacing-section: 4rem`. Folosește-le în câteva clase utilitare.",
      code: "/* Tailwind v4 cu @theme */\n@import 'tailwindcss';\n\n@theme {\n  --color-brand: #6366f1;\n  --color-brand-dark: #4f46e5;\n  --spacing-section: 4rem;\n  --radius-card: 1rem;\n}\n\n/* Acum poți folosi: bg-brand, text-brand, p-section etc */\n.hero {\n  padding: var(--spacing-section);\n  border-radius: var(--radius-card);\n  background-color: var(--color-brand);\n  color: white;\n}" },
  ],
  "tailwind-performance": [
    { name: "Optimizare bundle Tailwind", diff: "medium",
      q: "Scrie configurația Tailwind completă pentru producție cu: purge/content bine setat, safelist pentru clase dinamice, și disable pentru features nefolosite (container, preflight opțional).",
      code: "// tailwind.config.js optimizat pentru productie\nmodule.exports = {\n  content: [\n    './src/**/*.{js,jsx,ts,tsx,html}',\n    './public/index.html'\n  ],\n  safelist: [\n    // Clase generate dinamic (ex: color-ul din DB)\n    { pattern: /bg-(red|green|blue)-(400|500|600)/ },\n    'text-white',\n  ],\n  theme: {\n    extend: {}\n  },\n  corePlugins: {\n    // dezactiveaza container dacă nu-l folosesti\n    container: false,\n  },\n  plugins: []\n}" },
  ],
};

async function main() {
  console.log('Adăugare coding tasks Tailwind...');
  let added = 0, skipped = 0;

  for (const [slug, tasks] of Object.entries(TASKS)) {
    const lesson = await prisma.lesson.findFirst({ where: { slug } });
    if (!lesson) { console.log(`  [skip] ${slug} — negăsit`); skipped++; continue; }

    const existing = await prisma.task.count({ where: { lessonId: lesson.id, type: 'coding' } });
    if (existing >= 2) { console.log(`  [skip] ${slug} — are deja ${existing}`); skipped++; continue; }

    const maxTask = await prisma.task.findFirst({ where: { lessonId: lesson.id }, orderBy: { number: 'desc' } });
    let n = (maxTask?.number ?? 0) + 1;

    for (const t of tasks) {
      await prisma.task.create({
        data: {
          lessonId: lesson.id, number: n++,
          name: t.name, question: t.q,
          options: [], answer: '',
          explanation: '',
          difficulty: t.diff || 'medium',
          type: 'coding', language: 'css',
          starterCode: t.code || '',
          expectedOutput: '',
        },
      });
      added++;
    }
    console.log(`  [ok] ${slug} — ${tasks.length} tasks`);
  }

  console.log(`\nGata: ${added} adăugate, ${skipped} sărite.`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
