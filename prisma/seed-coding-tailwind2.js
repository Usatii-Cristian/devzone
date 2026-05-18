const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const tasks = [
  {
    slug: 'tailwind-grid-avansat',
    name: 'CSS Grid cu Tailwind avansat',
    question: 'Creează un layout grid 3x2 folosind Tailwind cu: grid-cols-3, gap-4, și primul element spanning 2 coloane (col-span-2). Adaugă culori diferite pentru fiecare celulă.',
    language: 'html',
    starterCode: `<div class="grid grid-cols-3 gap-4 p-4">\n  <div class="col-span-2 bg-blue-200 p-4 rounded">1 (span 2)</div>\n  <div class="bg-green-200 p-4 rounded">2</div>\n  <!-- adaugă restul celulelor -->\n</div>`,
    expectedOutput: '',
  },
  {
    slug: 'tailwind-borders-radius',
    name: 'Borders și border-radius Tailwind',
    question: 'Creează 4 carduri cu border-radius diferit: rounded-none, rounded-md, rounded-xl, rounded-full. Fiecare cu border-2 și culori diferite.',
    language: 'html',
    starterCode: `<div class="flex gap-4 p-4">\n  <div class="border-2 border-blue-400 p-4 rounded-none">None</div>\n  <div class="border-2 border-green-400 p-4 rounded-md">MD</div>\n  <!-- xl și full -->\n</div>`,
    expectedOutput: '',
  },
  {
    slug: 'tailwind-spacing-sizing',
    name: 'Spacing și sizing Tailwind',
    question: 'Demonstrează sistemul de spacing Tailwind: creează elemente cu w-1/2, w-full, max-w-sm, h-24, p-6, mx-auto. Pune-le într-un container.',
    language: 'html',
    starterCode: `<div class="container mx-auto p-4">\n  <div class="max-w-sm mx-auto">\n    <div class="w-full h-24 bg-blue-200 mb-4"></div>\n    <div class="w-1/2 h-12 bg-green-200"></div>\n  </div>\n</div>`,
    expectedOutput: '',
  },
  {
    slug: 'tailwind-typography-plugin',
    name: 'Typography cu Tailwind',
    question: 'Stilizează o ierarhie tipografică completă: text-4xl font-bold pentru h1, text-2xl font-semibold pentru h2, text-base text-gray-600 pentru body, text-sm text-gray-400 pentru caption.',
    language: 'html',
    starterCode: `<article class="max-w-2xl mx-auto p-6">\n  <h1 class="">Titlu Principal</h1>\n  <h2 class="">Subtitlu</h2>\n  <p class="">Paragraf de body text cu informații detaliate...</p>\n  <span class="">Caption mic</span>\n</article>`,
    expectedOutput: '',
  },
  {
    slug: 'tailwind-forms-plugin',
    name: 'Formular stilizat cu Tailwind',
    question: 'Creează un formular de contact cu Tailwind: label (text-sm font-medium), input (border rounded px-3 py-2 w-full focus:ring), textarea și buton submit cu gradient.',
    language: 'html',
    starterCode: `<form class="max-w-md mx-auto p-6 space-y-4">\n  <div>\n    <label class="block text-sm font-medium text-gray-700">Nume</label>\n    <input type="text" class="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">\n  </div>\n  <!-- email, textarea, submit -->\n</form>`,
    expectedOutput: '',
  },
  {
    slug: 'tailwind-proiect-card',
    name: 'Card component Tailwind',
    question: 'Construiește un card de produs complet: imagine placeholder, badge "NOU", titlu, descriere, preț, rating cu stele (text) și buton "Adaugă în coș".',
    language: 'html',
    starterCode: `<div class="max-w-sm rounded-xl shadow-lg overflow-hidden">\n  <div class="bg-gray-200 h-48 relative">\n    <!-- badge NOU -->\n  </div>\n  <div class="p-4">\n    <!-- titlu, descriere, pret, rating, buton -->\n  </div>\n</div>`,
    expectedOutput: '',
  },
  {
    slug: 'tailwind-config-custom',
    name: 'Tailwind config custom colors',
    question: 'Demonstrează cum ai extinde Tailwind cu culori custom. Scrie configurația tailwind.config.js cu o culoare brand cu shade-uri 50-900, și folosește-o în HTML.',
    language: 'javascript',
    starterCode: `// tailwind.config.js\nmodule.exports = {\n  theme: {\n    extend: {\n      colors: {\n        brand: {\n          50: '#eff6ff',\n          // adaugă shade-uri până la 900\n          900: '#1e3a5f',\n        }\n      }\n    }\n  }\n}`,
    expectedOutput: '',
  },
  {
    slug: 'tailwind-accessibility',
    name: 'Accesibilitate cu Tailwind',
    question: 'Creează un buton accesibil cu: focus:ring vizibil, sr-only pentru text descriptiv, aria-label corect, și un skip-link cu focus:not-sr-only.',
    language: 'html',
    starterCode: `<!-- Skip link accesibil -->\n<a href="#main" class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded z-50">\n  Sari la conținut\n</a>\n\n<button class="relative focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 bg-blue-600 text-white px-4 py-2 rounded">\n  <span class="sr-only">Acțiune</span>\n  <!-- icon placeholder -->\n  &#128196;\n</button>`,
    expectedOutput: '',
  },
  {
    slug: 'tailwind-scroll-interactions',
    name: 'Scroll interactions Tailwind',
    question: 'Creează o pagină cu scroll-smooth, un nav sticky cu shadow la scroll (folosind group și js minimal), și secțiuni cu scroll-mt pentru offset.',
    language: 'html',
    starterCode: `<!DOCTYPE html>\n<html class="scroll-smooth">\n<head><script src="https://cdn.tailwindcss.com"></script></head>\n<body>\n  <nav class="sticky top-0 bg-white shadow-md z-50 p-4">\n    <a href="#section1" class="mr-4 text-blue-600 hover:underline">Secțiunea 1</a>\n    <a href="#section2" class="text-blue-600 hover:underline">Secțiunea 2</a>\n  </nav>\n  <section id="section1" class="scroll-mt-16 min-h-screen p-8 bg-blue-50">\n    <h2 class="text-2xl font-bold">Secțiunea 1</h2>\n  </section>\n  <section id="section2" class="scroll-mt-16 min-h-screen p-8 bg-green-50">\n    <h2 class="text-2xl font-bold">Secțiunea 2</h2>\n  </section>\n</body></html>`,
    expectedOutput: '',
  },
  {
    slug: 'tailwind-dashboard',
    name: 'Dashboard layout Tailwind',
    question: 'Construiește un dashboard minimal: sidebar fix pe stânga (w-64 bg-gray-900 text-white), main content (flex-1), header top cu avatar și notificări.',
    language: 'html',
    starterCode: `<div class="flex h-screen bg-gray-100">\n  <!-- sidebar -->\n  <aside class="w-64 bg-gray-900 text-white p-4">\n    <h2 class="text-xl font-bold mb-6">Dashboard</h2>\n    <!-- nav items -->\n  </aside>\n  <!-- main -->\n  <div class="flex-1 flex flex-col">\n    <!-- header -->\n    <header class="bg-white shadow px-6 py-4 flex justify-between items-center">\n      <!-- titlu și avatar -->\n    </header>\n    <!-- content -->\n    <main class="flex-1 p-6">\n      <!-- stat cards -->\n    </main>\n  </div>\n</div>`,
    expectedOutput: '',
  },
  {
    slug: 'tailwind-proiect-landing',
    name: 'Landing page Tailwind',
    question: 'Creează o secțiune hero completă cu Tailwind: gradient background, titlu mare, subtitlu, 2 butoane CTA (primary și secondary), complet responsive (flex la mare, stacked la mic).',
    language: 'html',
    starterCode: `<section class="bg-gradient-to-br from-blue-600 to-purple-700 text-white py-24 px-4">\n  <div class="max-w-4xl mx-auto text-center">\n    <!-- titlu h1 text-5xl font-bold -->\n    <!-- subtitlu text-xl mt-4 opacity-90 -->\n    <!-- butoane flex justify-center gap-4 mt-8 -->\n  </div>\n</section>`,
    expectedOutput: '',
  },
  {
    slug: 'tailwind-shadcn-components',
    name: 'Component system cu Tailwind',
    question: 'Creează un sistem de butoane cu variante folosind class strings: primary (bg-blue-600), secondary (bg-gray-200 text-gray-900), destructive (bg-red-600), outline (border border-gray-300).',
    language: 'html',
    starterCode: `<!-- Primary -->\n<button class="inline-flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors">\n  Primary\n</button>\n\n<!-- Secondary -->\n<button class="">Secondary</button>\n\n<!-- Destructive -->\n<button class="">Șterge</button>\n\n<!-- Outline -->\n<button class="">Outline</button>`,
    expectedOutput: '',
  },
  {
    slug: 'tailwind-animations-transitions',
    name: 'Animații Tailwind',
    question: 'Folosind clasele Tailwind animate-*: creează un spinner (animate-spin), un skeleton loading (animate-pulse), și un element care face bounce (animate-bounce).',
    language: 'html',
    starterCode: `<div class="flex gap-8 p-8 items-center">\n  <!-- Spinner -->\n  <div class="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full"></div>\n\n  <!-- Skeleton -->\n  <div class="animate-pulse flex flex-col gap-2">\n    <div class="h-4 bg-gray-300 rounded w-48"></div>\n    <div class="h-4 bg-gray-300 rounded w-32"></div>\n  </div>\n\n  <!-- Bounce -->\n  <div class="animate-bounce w-8 h-8 bg-green-500 rounded-full"></div>\n</div>`,
    expectedOutput: '',
  },
  {
    slug: 'tailwind-performance-optimization',
    name: 'Optimizare Tailwind pentru producție',
    question: 'Explică și demonstrează cum configurezi purging în Tailwind (content array în config). Scrie un config complet cu content paths pentru Next.js și safelist pentru clase dinamice.',
    language: 'javascript',
    starterCode: `// tailwind.config.js pentru Next.js\nmodule.exports = {\n  content: [\n    // adaugă paths pentru Next.js\n  ],\n  safelist: [\n    // adaugă clase generate dinamic (ex: bg-{color}-500)\n  ],\n  theme: {\n    extend: {}\n  },\n  plugins: [],\n}`,
    expectedOutput: '',
  },
  {
    slug: 'tailwind-nextjs-integration',
    name: 'Tailwind cu Next.js App Router',
    question: 'Scrie codul necesar pentru un layout Root în Next.js care importă Tailwind globals, aplică dark mode class-based, și wrappează în html/body cu font și antialiased.',
    language: 'javascript',
    starterCode: `// app/layout.js\nimport './globals.css'\nimport { Inter } from 'next/font/google'\n\nconst inter = Inter({ subsets: ['latin'] })\n\nexport default function RootLayout({ children }) {\n  return (\n    <html lang="ro" className="">\n      <body className={/* inter.className + antialiased */}>\n        {children}\n      </body>\n    </html>\n  )\n}`,
    expectedOutput: '',
  },
];

async function main() {
  console.log('Adăugare coding tasks Tailwind (remaining)...');
  let added = 0, skipped = 0;
  for (const t of tasks) {
    const lesson = await prisma.lesson.findFirst({ where: { slug: t.slug } });
    if (!lesson) { console.log(`  [skip] ${t.slug} — nu există`); skipped++; continue; }
    const existing = await prisma.task.findFirst({ where: { lessonId: lesson.id, type: 'coding' } });
    if (existing) { console.log(`  [skip] ${t.slug} — are deja coding`); skipped++; continue; }
    const maxTask = await prisma.task.findFirst({ where: { lessonId: lesson.id }, orderBy: { number: 'desc' } });
    const n = (maxTask?.number ?? 0) + 1;
    await prisma.task.create({
      data: {
        lessonId: lesson.id, number: n,
        name: t.name, question: t.question,
        options: [], answer: '',
        explanation: '',
        difficulty: 'medium',
        type: 'coding', language: t.language,
        starterCode: t.starterCode || '',
        expectedOutput: t.expectedOutput || '',
      },
    });
    console.log(`  [ok] ${t.slug}`);
    added++;
  }
  console.log(`\nGata: ${added} adăugate, ${skipped} sărite.`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
