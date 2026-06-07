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

await up('11. Borders', 'Border utility', `**Border utility classes** în Tailwind controlează toate aspectele chenarelor — grosime, culoare, stil, per latură — cu o gramatică consistentă și predictibilă.

**Border width — toate variantele**

\`\`\`html
<!-- Border uniform -->
<div class="border">     1px (default) </div>
<div class="border-0">   0 (fără) </div>
<div class="border-2">   2px </div>
<div class="border-4">   4px </div>
<div class="border-8">   8px </div>
<div class="border-[3px]"> Valoare arbitrară 3px </div>

<!-- Per laterală -->
<div class="border-t">      Border top </div>
<div class="border-r">      Border right </div>
<div class="border-b">      Border bottom </div>
<div class="border-l">      Border left </div>

<!-- Grosime per laterală -->
<div class="border-t-2">    Top 2px </div>
<div class="border-b-4">    Bottom 4px </div>

<!-- X și Y (shorthand) -->
<div class="border-x">      Left + Right </div>
<div class="border-y-2">    Top + Bottom 2px </div>
\`\`\`

**Border color**

\`\`\`html
<!-- Culoare uniformă -->
<div class="border-2 border-blue-500">Border albastru</div>
<div class="border border-slate-200 dark:border-slate-700">
  Dark mode aware
</div>

<!-- Culoare per laterală (Tailwind 3+) -->
<div class="border-2
            border-t-emerald-500
            border-r-amber-500
            border-b-rose-500
            border-l-indigo-500">
  Border multi-color
</div>

<!-- Cu opacity -->
<div class="border-2 border-blue-500/30">30% opacity</div>
<div class="border-2 border-purple-500/[0.65]">Custom 65%</div>

<!-- Border invisible (pentru spațiu fără chenar) -->
<div class="border-2 border-transparent hover:border-blue-500">
  Border apare doar la hover (fără jumping)
</div>
\`\`\`

**Border style**

\`\`\`html
<div class="border-2 border-solid border-blue-500">Solid (default)</div>
<div class="border-2 border-dashed border-purple-500">Dashed</div>
<div class="border-2 border-dotted border-orange-500">Dotted</div>
<div class="border-4 border-double border-teal-500">Double</div>
<div class="border-none">Nu border (override)</div>
<div class="border-hidden">Hidden (asemănător cu invisible)</div>
\`\`\`

**Divide — chenare între copii (alternativă la border per item)**

\`\`\`html
<!-- divide-x: linii verticale între elementele flex/grid -->
<div class="flex divide-x divide-slate-200">
  <div class="px-4 py-2">Item 1</div>
  <div class="px-4 py-2">Item 2</div>
  <div class="px-4 py-2">Item 3</div>
  <!-- Linii verticale între item-uri -->
</div>

<!-- divide-y: linii orizontale între rânduri -->
<ul class="divide-y divide-slate-100">
  <li class="py-4">Item 1</li>
  <li class="py-4">Item 2</li>
  <li class="py-4">Item 3</li>
</ul>

<!-- Cu grosime și stil -->
<ul class="divide-y-2 divide-dashed divide-slate-300">
  <li>Item</li><li>Item</li>
</ul>

<!-- Inversare ordinii (pentru flex-row-reverse) -->
<div class="flex divide-x divide-x-reverse">...</div>
\`\`\`

**Ring vs Border — alegerea corectă**

\`\`\`html
<!-- BORDER: ocupă spațiu în box model (deplasează layout) -->
<button class="border-2 border-blue-500 px-4 py-2">
  Border modifică dimensiunea
</button>

<!-- RING: outline-like, NU ocupă spațiu (NU modifică layout) -->
<button class="ring-2 ring-blue-500 px-4 py-2">
  Ring nu deplasează nimic
</button>

<!-- Pentru focus, RING e preferată -->
<button class="focus:ring-2 focus:ring-indigo-500 focus:outline-none px-4 py-2">
  Focus accesibil fără jumping
</button>
\`\`\`

**Pattern-uri utile**

\`\`\`html
<!-- Card cu accent border-left -->
<div class="border-l-4 border-l-indigo-500 bg-indigo-50 p-4 rounded-r">
  <p class="font-semibold">Notă importantă</p>
  <p class="text-sm text-slate-600">Conținut</p>
</div>

<!-- Separator gradient (border alternative) -->
<div class="h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent">
</div>

<!-- Container cu divide-y elegant -->
<div class="bg-white rounded-2xl shadow divide-y divide-slate-100">
  <div class="p-4 hover:bg-slate-50">Setting 1</div>
  <div class="p-4 hover:bg-slate-50">Setting 2</div>
  <div class="p-4 hover:bg-slate-50">Setting 3</div>
</div>
\`\`\`

• **border-{N}** pentru chenare; **ring-{N}** pentru focus/outline fără layout shift
• **divide-{x,y}** > border pe fiecare item — control centralizat
• **border-transparent + hover:border-color** pentru hover fără layout jumping`);

await up('11. Borders', 'Border radius', `**Border radius în Tailwind** controlează rotunjirea colțurilor — de la pătrate ascuțite la cercuri perfecte și totul între.

**Scala de rotunjire**

\`\`\`html
<div class="rounded-none"> 0    </div>
<div class="rounded-sm">   2px  </div>
<div class="rounded">      4px  </div>
<div class="rounded-md">   6px  </div>
<div class="rounded-lg">   8px  </div>
<div class="rounded-xl">   12px </div>
<div class="rounded-2xl">  16px </div>
<div class="rounded-3xl">  24px </div>
<div class="rounded-full"> 9999px </div>

<!-- Valori arbitrare -->
<div class="rounded-[20px]"> Exact 20px </div>
<div class="rounded-[50%]">  50% (oval pe rectangular) </div>
\`\`\`

**Per corner**

\`\`\`html
<!-- Top și Bottom -->
<div class="rounded-t-lg">    Sus rotunjit </div>
<div class="rounded-b-2xl">   Jos rotunjit mai mult </div>

<!-- Left și Right -->
<div class="rounded-l-full"> Stânga (pill-half) </div>
<div class="rounded-r-3xl">  Dreapta rotunjit </div>

<!-- Corner individual -->
<div class="rounded-tl-2xl">  Top-Left </div>
<div class="rounded-tr-2xl">  Top-Right </div>
<div class="rounded-bl-2xl">  Bottom-Left </div>
<div class="rounded-br-2xl">  Bottom-Right </div>

<!-- Diagonal opus -->
<div class="rounded-tl-3xl rounded-br-3xl">
  Top-stânga și bottom-dreapta
</div>
\`\`\`

**Avatar și element circular**

\`\`\`html
<!-- Avatar perfect circular -->
<img src="..." class="w-12 h-12 rounded-full object-cover" alt="">

<!-- Inițiale avatar -->
<div class="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600
            flex items-center justify-center text-white font-bold">
  AB
</div>

<!-- Avatar group cu overlap -->
<div class="flex -space-x-2">
  <img class="w-8 h-8 rounded-full ring-2 ring-white">
  <img class="w-8 h-8 rounded-full ring-2 ring-white">
  <img class="w-8 h-8 rounded-full ring-2 ring-white">
</div>
\`\`\`

**Pill / Tag / Badge**

\`\`\`html
<!-- Pill button -->
<button class="bg-indigo-600 text-white px-6 py-2 rounded-full font-semibold
               hover:bg-indigo-700">
  Pill button
</button>

<!-- Tag/Chip -->
<span class="inline-flex items-center gap-1 px-3 py-1 rounded-full
             bg-blue-100 text-blue-800 text-xs font-semibold">
  React
</span>

<!-- Badge cu icon -->
<span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full
             bg-emerald-100 text-emerald-800 text-xs font-bold">
  ✓ Activ
</span>
\`\`\`

**Card cu colțuri rotunjite**

\`\`\`html
<!-- Card modern -->
<article class="bg-white rounded-2xl shadow-md overflow-hidden">
  <img class="w-full h-48 object-cover">
  <div class="p-6">
    <h3 class="text-xl font-bold">Titlu</h3>
    <p class="text-slate-600">Descriere</p>
  </div>
</article>

<!-- overflow-hidden esențial pentru a tăia conținutul după rotunjire -->

<!-- Card cu image rounded doar sus -->
<article class="bg-white rounded-2xl shadow">
  <img class="w-full h-48 object-cover rounded-t-2xl">
  <div class="p-6">Conținut</div>
</article>
\`\`\`

**Input și buton — rounded subtle**

\`\`\`html
<!-- Input cu rounded-md (standard) -->
<input class="w-full px-4 py-2 border border-slate-300 rounded-md
              focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20">

<!-- Input grupat cu buton -->
<div class="flex">
  <input class="flex-1 px-4 py-2 border border-r-0 border-slate-300 rounded-l-lg
                focus:outline-none focus:border-indigo-500">
  <button class="px-6 py-2 bg-indigo-600 text-white rounded-r-lg
                 hover:bg-indigo-700">
    Search
  </button>
</div>
\`\`\`

**Forme moderne (creative shapes)**

\`\`\`html
<!-- Squircle / Super-ellipse like -->
<div class="w-16 h-16 rounded-[28%] bg-indigo-500"></div>

<!-- Asymmetric rotunjire -->
<div class="rounded-tr-[80px] rounded-bl-[80px] bg-purple-500 p-8">
  Card cu colțuri diagonal
</div>

<!-- Speech bubble -->
<div class="relative rounded-2xl bg-blue-500 text-white p-4 max-w-xs">
  <p>Salut!</p>
  <div class="absolute -bottom-2 left-6 w-4 h-4 bg-blue-500 rotate-45"></div>
</div>
\`\`\`

• **rounded-2xl** sau **rounded-3xl** = aspect modern, prietenos (folosit de Apple, Linear, Notion)
• **rounded-full** + pătrat = cerc; **rounded-full** + rectangular = pill
• **overflow-hidden** pe parent necesar pentru ca rotunjirea să taie copii (ex: img într-un card)`);

await up('12. Spacing', 'Min/max', `**Min/max width/height și logical properties** în Tailwind oferă constrângeri inteligente pentru dimensionare — esențiale pentru layout-uri robuste care funcționează pe orice viewport și direcție.

**Min și max width**

\`\`\`html
<!-- Min width -->
<div class="min-w-0">    0 (util pentru flex children) </div>
<div class="min-w-full"> 100%  </div>
<div class="min-w-min">  Min content </div>
<div class="min-w-max">  Max content </div>
<div class="min-w-fit">  Fit content </div>
<div class="min-w-[200px]"> Custom 200px </div>

<!-- Max width -->
<div class="max-w-0">     0     </div>
<div class="max-w-none">  Niciun max </div>
<div class="max-w-full">  100%  </div>
<div class="max-w-md">    28rem </div>
<div class="max-w-4xl">   56rem </div>

<!-- Pattern util: button minim, dar crește dacă text mai mult -->
<button class="min-w-[120px] px-6 py-2 bg-indigo-600 text-white rounded">
  OK
</button>
\`\`\`

**Min și max height**

\`\`\`html
<div class="min-h-0">       0 </div>
<div class="min-h-full">    100% </div>
<div class="min-h-screen">  100vh (viewport height) </div>
<div class="min-h-[400px]"> Custom </div>

<!-- min-h-screen pentru layout-uri full page -->
<div class="min-h-screen flex flex-col">
  <header>Header</header>
  <main class="flex-1">Content (umple restul)</main>
  <footer>Footer</footer>
</div>

<!-- max-h cu overflow pentru limit -->
<div class="max-h-96 overflow-y-auto">
  Conținut lung — scrollabil după 384px
</div>
\`\`\`

**Width și height keywords**

\`\`\`html
<!-- Width fixe -->
<div class="w-0">     0 </div>
<div class="w-px">    1px </div>
<div class="w-1">     4px </div>
<div class="w-full">  100% </div>
<div class="w-screen"> 100vw </div>
<div class="w-svw">    100svw (small viewport — exclude UI mobile) </div>
<div class="w-lvw">    100lvw (large viewport — include UI mobile) </div>
<div class="w-dvw">    100dvw (dynamic viewport) </div>

<!-- Fracționar -->
<div class="w-1/2">  50%      </div>
<div class="w-1/3">  33.333%  </div>
<div class="w-2/3">  66.666%  </div>
<div class="w-1/4">  25%      </div>
<div class="w-3/4">  75%      </div>

<!-- Intrinsic -->
<div class="w-auto"> Auto      </div>
<div class="w-min">  Min content </div>
<div class="w-max">  Max content </div>
<div class="w-fit">  Fit content </div>
\`\`\`

**Logical properties (Tailwind 3.3+)**

\`\`\`html
<!-- ms-{N} = margin-inline-start (left în LTR, right în RTL) -->
<div class="ms-4">Margin start (suporta RTL automat)</div>
<div class="me-4">Margin end</div>
<div class="ps-4">Padding start</div>
<div class="pe-4">Padding end</div>

<!-- Util pentru aplicații internaționalizate -->
<div dir="rtl">
  <nav class="ps-4 pe-2">
    <!-- ps = padding-right în RTL, padding-left în LTR -->
  </nav>
</div>

<!-- Border logical -->
<div class="border-s-2 border-e-2">
  Start și end borders (LTR/RTL aware)
</div>

<!-- Inline și block sizing -->
<div class="inline-size-64 block-size-32">
  inline-size = width, block-size = height (logical)
</div>
\`\`\`

**Viewport units moderne**

\`\`\`html
<!-- svh/svw — small viewport (când UI mobile e vizibilă) -->
<div class="h-svh">100% small viewport height</div>

<!-- lvh/lvw — large viewport (când UI mobile e ascunsă) -->
<div class="h-lvh">100% large viewport height</div>

<!-- dvh/dvw — dynamic (recalculat în timp real) -->
<div class="h-dvh">100% dynamic viewport height — IDEAL pentru hero mobile</div>

<!-- Diferența practică pe iOS Safari -->
<!-- 100vh = 100lvh = poate cauza scrollbar când UI bottom dispare -->
<!-- 100dvh = se adaptează automat (fără salt) -->

<section class="min-h-dvh flex items-center bg-indigo-600">
  Hero section fără probleme pe mobile Safari
</section>
\`\`\`

**Aspect ratio**

\`\`\`html
<!-- aspect-{ratio} — păstrează proporțiile -->
<div class="aspect-square"> 1:1  </div>
<div class="aspect-video">  16:9 </div>
<div class="aspect-[4/3]">  4:3  </div>
<div class="aspect-[21/9]"> 21:9 cinematic </div>

<!-- Imagine cu aspect garantat -->
<img class="w-full aspect-video object-cover rounded-xl">

<!-- Video container responsive -->
<div class="aspect-video w-full">
  <iframe class="w-full h-full rounded-2xl" src="..."></iframe>
</div>
\`\`\`

• **min-w-0** pe flex children este TRUCUL pentru text-overflow corect (truncate to work)
• **min-h-screen / min-h-dvh** pentru layout-uri full page; dvh pentru mobile Safari
• **Logical properties** (ms/me, ps/pe) sunt RTL-aware — pregătire pentru i18n`);

  console.log('Done fix.');
  await p.$disconnect();
}

run().catch(e => { console.error(e); p.$disconnect(); process.exit(1); });
