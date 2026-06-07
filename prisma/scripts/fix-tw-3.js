const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();

async function up(lessonContains, titleContains, content) {
  const lessons = await p.lesson.findMany({ where: { module: { slug: 'tailwind' }, title: { contains: lessonContains } } });
  const theory = await p.theory.findFirst({ where: { lessonId: { in: lessons.map(l => l.id) }, title: { contains: titleContains } } });
  if (!theory) { console.log(`NOT FOUND: ${lessonContains} / ${titleContains}`); return; }
  await p.theory.update({ where: { id: theory.id }, data: { content } });
  console.log(`✓ ${theory.title}: ${theory.content.length} → ${content.length}`);
}

async function run() {

await up('17. Flexbox', 'Flex wrap', `**Flex wrap și gap** rezolvă două probleme clasice în flexbox — cum se comportă elementele când nu încap pe un rând și cum controlezi spațiul între ele.

**flex-wrap**

\`\`\`html
<!-- nowrap (default) — totul pe un rând (poate cauza overflow) -->
<div class="flex flex-nowrap">
  <div class="w-48 bg-blue-500">Item 1</div>
  <div class="w-48 bg-green-500">Item 2</div>
  <div class="w-48 bg-amber-500">Item 3</div>
</div>

<!-- wrap — elementele se "rup" pe rânduri noi -->
<div class="flex flex-wrap">
  <div class="w-48 bg-blue-500">1</div>
  <div class="w-48 bg-green-500">2</div>
  <div class="w-48 bg-amber-500">3</div>
</div>

<!-- wrap-reverse — rândurile încep de jos -->
<div class="flex flex-wrap-reverse">
  <div class="w-48">1 (jos)</div>
  <div class="w-48">2</div>
  <div class="w-48">3 (sus)</div>
</div>
\`\`\`

**gap — spațiu între elemente**

\`\`\`html
<!-- gap uniform pe ambele axe -->
<div class="flex flex-wrap gap-4">
  <div class="w-32 bg-blue-500">1</div>
  <div class="w-32 bg-green-500">2</div>
  <div class="w-32 bg-amber-500">3</div>
  <div class="w-32 bg-rose-500">4</div>
</div>

<!-- gap diferit pe axe -->
<div class="flex flex-wrap gap-x-8 gap-y-4">
  <!-- 32px orizontal, 16px vertical -->
</div>

<!-- gap responsiv -->
<div class="flex flex-wrap gap-2 sm:gap-4 lg:gap-8">
  <!-- crește pe ecrane mai mari -->
</div>
\`\`\`

**Tag cloud cu flex-wrap**

\`\`\`html
<div class="flex flex-wrap gap-2">
  <span class="px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm">JavaScript</span>
  <span class="px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm">React</span>
  <span class="px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-sm">TypeScript</span>
  <!-- ... mai multe taguri, se "rup" pe rânduri noi automat -->
</div>
\`\`\`

**Cards responsive cu flex-wrap**

\`\`\`html
<!-- Grid responsive bazat pe flex-wrap (alternativă la CSS Grid) -->
<div class="flex flex-wrap gap-4">
  <div class="flex-1 basis-64 bg-white rounded-2xl p-4 shadow">
    Card 1 — min 256px, crește dacă spațiu
  </div>
  <div class="flex-1 basis-64 bg-white rounded-2xl p-4 shadow">Card 2</div>
  <div class="flex-1 basis-64 bg-white rounded-2xl p-4 shadow">Card 3</div>
</div>
\`\`\`

**Alignment cu flex-wrap**

\`\`\`html
<!-- align-content controlează spațierea ÎNTRE rânduri (doar la flex-wrap) -->
<div class="flex flex-wrap content-start h-64">  Start </div>
<div class="flex flex-wrap content-center h-64"> Centru </div>
<div class="flex flex-wrap content-end h-64">    End </div>
<div class="flex flex-wrap content-between h-64"> Distribuit cu spațiu </div>
<div class="flex flex-wrap content-around h-64">  Cu spațiu egal în jur </div>
<div class="flex flex-wrap content-evenly h-64">  Spațiu egal peste tot </div>
\`\`\`

**Pattern: gallery responsive**

\`\`\`html
<div class="flex flex-wrap gap-3">
  <img src="..." class="w-32 h-32 object-cover rounded-lg">
  <img src="..." class="w-32 h-32 object-cover rounded-lg">
  <img src="..." class="w-32 h-32 object-cover rounded-lg">
  <img src="..." class="w-32 h-32 object-cover rounded-lg">
  <img src="..." class="w-32 h-32 object-cover rounded-lg">
</div>
\`\`\`

**Pattern: avatar group cu overlap**

\`\`\`html
<!-- -space-x-3 = margin-left negativă = overlap -->
<div class="flex -space-x-3">
  <img class="w-10 h-10 rounded-full ring-2 ring-white" src="...">
  <img class="w-10 h-10 rounded-full ring-2 ring-white" src="...">
  <img class="w-10 h-10 rounded-full ring-2 ring-white" src="...">
  <div class="w-10 h-10 rounded-full bg-slate-200 ring-2 ring-white
              flex items-center justify-center text-xs font-bold">+12</div>
</div>
\`\`\`

**Anti-pattern de evitat**

\`\`\`html
<!-- GREȘIT — margin pe items (cauzează spațiu nedrept la wrap) -->
<div class="flex flex-wrap">
  <div class="m-2">Item 1</div>
  <div class="m-2">Item 2</div>
</div>

<!-- CORECT — gap pe container (uniform în orice direcție) -->
<div class="flex flex-wrap gap-4">
  <div>Item 1</div>
  <div>Item 2</div>
</div>
\`\`\`

• **flex-wrap + gap** = combinația cea mai des folosită — layout responsive fără media queries
• **basis-N + flex-1** = trick pentru "min-width per item" în flex (similar minmax în grid)
• **gap > margin** — gestionează corect spațiul și nu apar margini "duble" la wrap`);

await up('18.', 'Group', `**Group și group-hover** este unul dintre cele mai puternice features Tailwind — permite copiilor să răspundă la state-uri (hover, focus) ale părintelui — fără JavaScript.

**Pattern de bază**

\`\`\`html
<!-- Adaugi 'group' pe părinte, 'group-hover:' pe copii -->
<a href="#" class="group block p-6 bg-white rounded-2xl shadow
                   hover:shadow-xl transition-shadow">
  <h3 class="text-lg font-bold text-slate-900
             group-hover:text-indigo-600 transition-colors">
    Titlu (schimbă culoarea când hover pe card)
  </h3>
  <p class="text-slate-600 group-hover:text-slate-700">
    Descriere
  </p>
  <svg class="w-5 h-5 text-slate-400
              group-hover:text-indigo-600
              group-hover:translate-x-1
              transition-all">→</svg>
</a>
\`\`\`

**Group focus și group active**

\`\`\`html
<button class="group flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded">
  <span>Click me</span>
  <svg class="w-4 h-4
              group-active:rotate-12
              group-focus:scale-110
              group-hover:translate-x-1
              transition-transform">→</svg>
</button>
\`\`\`

**Card cu image zoom la hover**

\`\`\`html
<article class="group cursor-pointer">
  <div class="relative overflow-hidden rounded-2xl">
    <img src="..." class="w-full aspect-video object-cover
                          group-hover:scale-110
                          transition-transform duration-500">
    <div class="absolute inset-0 bg-black/50 opacity-0
                group-hover:opacity-100
                transition-opacity flex items-center justify-center">
      <button class="px-4 py-2 bg-white text-slate-900 rounded-lg font-bold">
        Vezi detalii
      </button>
    </div>
  </div>
  <h3 class="mt-3 font-bold group-hover:text-indigo-600 transition-colors">Titlu</h3>
</article>
\`\`\`

**Named groups (pentru group-uri imbricate)**

\`\`\`html
<!-- Tailwind 3+: poți denumi grupurile pentru a evita conflicte -->
<div class="group/card bg-white rounded-2xl p-6 shadow hover:shadow-xl">
  <h3 class="font-bold group-hover/card:text-indigo-600">Card title</h3>

  <button class="group/btn flex items-center gap-2 mt-4 px-4 py-2 bg-indigo-600 text-white rounded">
    <span>Action</span>
    <svg class="group-hover/btn:translate-x-1
                group-hover/card:scale-110
                transition-all">→</svg>
  </button>
</div>
\`\`\`

**Reveal pe hover**

\`\`\`html
<div class="group relative bg-slate-100 rounded-xl p-6">
  <p>Conținut normal</p>
  <button class="absolute top-2 right-2 opacity-0
                 group-hover:opacity-100
                 transition-opacity
                 p-2 bg-white rounded-full shadow">
    🗑️
  </button>
</div>
\`\`\`

**Group pe tot listă cu icon individual**

\`\`\`html
<ul class="space-y-2">
  <li class="group flex items-center gap-3 p-3 rounded-lg
             hover:bg-slate-100 cursor-pointer">
    <span class="w-2 h-2 rounded-full bg-slate-400
                 group-hover:bg-emerald-500
                 group-hover:scale-150
                 transition-all"></span>
    <span class="font-medium group-hover:text-slate-900">Item 1</span>
    <svg class="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">→</svg>
  </li>
</ul>
\`\`\`

**Dropdown menu**

\`\`\`html
<div class="group relative inline-block">
  <button class="px-4 py-2 bg-slate-100 rounded-lg hover:bg-slate-200">
    Menu ▾
  </button>
  <div class="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-xl
              opacity-0 invisible
              group-hover:opacity-100 group-hover:visible
              transition-all duration-200 z-10">
    <a class="block px-4 py-2 hover:bg-slate-50">Item 1</a>
    <a class="block px-4 py-2 hover:bg-slate-50">Item 2</a>
    <a class="block px-4 py-2 hover:bg-slate-50">Item 3</a>
  </div>
</div>
\`\`\`

**Combinația cu peer**

\`\`\`html
<!-- group = părinte → copii; peer = sibling stânga → sibling dreapta -->
<div class="group hover:bg-slate-100">
  <input class="peer">
  <p class="group-hover:text-indigo-500 peer-focus:font-bold">
    Reactionează la AMBELE state-uri
  </p>
</div>
\`\`\`

• **group / group-hover** = trucul cel mai des folosit pentru cards interactive
• **Named groups** (group/name) când ai imbricări — evită conflicte între nivelele de group
• **Combinabil cu transform, opacity, color** pentru efecte premium fără JavaScript`);

  console.log('Done fix.');
  await p.$disconnect();
}

run().catch(e => { console.error(e); p.$disconnect(); process.exit(1); });
