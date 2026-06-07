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

await up('9. CSS Grid', 'Grid container', `**Grid container în Tailwind** activează CSS Grid pe element și configurează numărul de coloane și rânduri — alternativa modernă la Flexbox pentru layout-uri bidimensionale.

**Activare grid și definire coloane**

\`\`\`html
<!-- grid + grid-cols-N — N coloane egale -->
<div class="grid grid-cols-3 gap-4">
  <div class="bg-blue-500 p-4">1</div>
  <div class="bg-blue-500 p-4">2</div>
  <div class="bg-blue-500 p-4">3</div>
  <div class="bg-blue-500 p-4">4 (new row)</div>
</div>

<!-- 12-column system (Bootstrap-style) -->
<div class="grid grid-cols-12 gap-4">
  <div class="col-span-8">Main 8/12</div>
  <div class="col-span-4">Sidebar 4/12</div>
</div>
\`\`\`

**Grid columns — toate opțiunile**

\`\`\`html
<div class="grid grid-cols-1">  1 coloană  </div>
<div class="grid grid-cols-2">  2 coloane </div>
<div class="grid grid-cols-3">  3 coloane </div>
<div class="grid grid-cols-4">  4 coloane </div>
<div class="grid grid-cols-5">  5 coloane </div>
<div class="grid grid-cols-6">  6 coloane </div>
<div class="grid grid-cols-12"> 12 coloane </div>

<!-- Custom cu valoare arbitrară -->
<div class="grid grid-cols-[200px_1fr_200px]">
  Sidebar 200px | Main fluid | Sidebar 200px
</div>

<!-- Repetare -->
<div class="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))]">
  Coloane auto-fit min 200px
</div>
\`\`\`

**Grid rows**

\`\`\`html
<div class="grid grid-rows-3 grid-cols-2 gap-2 h-64">
  <div>1</div><div>2</div>
  <div>3</div><div>4</div>
  <div>5</div><div>6</div>
</div>

<!-- Custom row heights -->
<div class="grid grid-rows-[auto_1fr_auto] h-screen">
  <header>Header (auto)</header>
  <main>Main (umple)</main>
  <footer>Footer (auto)</footer>
</div>
\`\`\`

**Gap între celule**

\`\`\`html
<!-- gap uniform -->
<div class="grid grid-cols-3 gap-4">Gap 16px</div>

<!-- gap diferit pe X și Y -->
<div class="grid grid-cols-3 gap-x-6 gap-y-2">
  Gap 24px orizontal, 8px vertical
</div>

<!-- Fără gap -->
<div class="grid grid-cols-3 gap-0">Pixel-perfect tile-uri</div>
\`\`\`

**Responsive grid**

\`\`\`html
<!-- 1 col pe mobile, 2 pe sm, 3 pe md, 4 pe lg -->
<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
  <div>Card 1</div>
  <div>Card 2</div>
  <div>Card 3</div>
  <div>Card 4</div>
</div>

<!-- Layout sidebar responsive -->
<div class="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-6">
  <aside class="bg-slate-100 p-4">Sidebar</aside>
  <main>Conținut principal</main>
</div>
\`\`\`

**Justify și align**

\`\`\`html
<!-- justify-items: alinierea pe axa orizontală -->
<div class="grid grid-cols-3 justify-items-start">  Stânga </div>
<div class="grid grid-cols-3 justify-items-center"> Centru </div>
<div class="grid grid-cols-3 justify-items-end">    Dreapta</div>
<div class="grid grid-cols-3 justify-items-stretch">Întinde (default)</div>

<!-- align-items: alinierea pe axa verticală -->
<div class="grid grid-cols-3 align-items-start">  Sus    </div>
<div class="grid grid-cols-3 items-center">       Centru </div>
<div class="grid grid-cols-3 items-end">          Jos    </div>

<!-- Place items — shorthand pentru ambele -->
<div class="grid place-items-center">Centrat complet</div>

<!-- Pentru întregul grid (dacă mai are spațiu) -->
<div class="grid grid-cols-3 justify-center content-center">
  Centrarea grid-ului în container
</div>
\`\`\`

• **grid-cols-{N}** = N coloane egale; **grid-cols-[VALUE]** = coloane custom
• **gap-{N}** > margin pe copii — gestionează corect spațiile cross-browser
• **place-items-center** = trucul cel mai scurt pentru centrare totală`);

await up('9. CSS Grid', 'Span și placement', `**Span și placement în CSS Grid** permit unei celule să ocupe mai multe coloane sau rânduri — controlul fin asupra layout-ului bidimensional.

**Column span**

\`\`\`html
<div class="grid grid-cols-12 gap-4">
  <div class="col-span-12">Antet — 12/12 coloane</div>
  <div class="col-span-8">Conținut — 8/12</div>
  <div class="col-span-4">Sidebar — 4/12</div>
  <div class="col-span-4">Card 1 — 4/12</div>
  <div class="col-span-4">Card 2 — 4/12</div>
  <div class="col-span-4">Card 3 — 4/12</div>
</div>

<!-- Span full -->
<div class="col-span-full">Întinde pe TOATE coloanele</div>

<!-- Span responsive -->
<div class="col-span-12 md:col-span-6 lg:col-span-4">
  Mobile: full, Tablet: 1/2, Desktop: 1/3
</div>
\`\`\`

**Row span**

\`\`\`html
<div class="grid grid-cols-3 grid-rows-3 gap-2 h-96">
  <div class="row-span-3 bg-purple-200">Sidebar vertical (3 rânduri)</div>
  <div>Cell 1</div>
  <div>Cell 2</div>
  <div>Cell 3</div>
  <div>Cell 4</div>
  <div>Cell 5</div>
  <div class="row-span-2 col-span-2 bg-blue-200">
    Hero — 2 rânduri × 2 coloane
  </div>
</div>
\`\`\`

**Start și End — poziționare explicită**

\`\`\`html
<!-- col-start-N / col-end-N — control absolut -->
<div class="grid grid-cols-6 gap-2">
  <div class="col-start-2 col-end-5">
    Începe la col 2, termină la col 5 (ocupă 3)
  </div>
  <div class="col-start-1 col-end-7">Întreg lățimea (1 → 7)</div>
</div>

<!-- Shorthand col-start și col-end -->
<div class="grid grid-cols-12 gap-4">
  <div class="col-start-1 col-end-9">Stânga lățime 8</div>
  <div class="col-start-9 col-end-13">Dreapta lățime 4</div>
</div>

<!-- Cu negative indices -->
<div class="col-start-1 col-end-[-1]">
  De la primul la ultimul (ca col-span-full)
</div>
\`\`\`

**Layout-uri clasice cu grid**

\`\`\`html
<!-- Layout "Holy Grail" -->
<div class="grid h-screen
            grid-cols-[200px_1fr_200px]
            grid-rows-[60px_1fr_40px]">
  <header class="col-span-3 bg-slate-800 text-white">Header</header>
  <aside class="bg-slate-100">Nav stânga</aside>
  <main class="bg-white p-6">Conținut</main>
  <aside class="bg-slate-100">Aside dreapta</aside>
  <footer class="col-span-3 bg-slate-800 text-white">Footer</footer>
</div>
\`\`\`

\`\`\`html
<!-- Dashboard cu hero + cards -->
<div class="grid grid-cols-1 md:grid-cols-4 gap-6">
  <div class="md:col-span-4 bg-indigo-600 text-white rounded-2xl p-8">
    <h2 class="text-3xl font-bold">Hero — full width</h2>
  </div>

  <div class="bg-white rounded-xl p-4 shadow"> Stat 1 </div>
  <div class="bg-white rounded-xl p-4 shadow"> Stat 2 </div>
  <div class="bg-white rounded-xl p-4 shadow"> Stat 3 </div>
  <div class="bg-white rounded-xl p-4 shadow"> Stat 4 </div>

  <div class="md:col-span-3 bg-white rounded-xl p-6 shadow">
    Chart — 3/4 lățime
  </div>
  <div class="bg-white rounded-xl p-6 shadow">
    Listă — 1/4 lățime
  </div>
</div>
\`\`\`

**Magazine/Pinterest-style cu auto-fit**

\`\`\`html
<!-- Cards care își ajustează numărul în funcție de lățime -->
<div class="grid gap-4 grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">
  <div class="bg-white rounded-xl shadow p-4">Card 1</div>
  <div class="bg-white rounded-xl shadow p-4">Card 2</div>
  <div class="bg-white rounded-xl shadow p-4">Card 3</div>
  <!-- Pe ecran lat: 4-5 coloane; pe mobile: 1 -->
</div>
\`\`\`

• **col-span-N** este cel mai simplu; **col-start/col-end** pentru control absolut
• **col-span-full** = trucul pentru rânduri întregi în grid cu N coloane
• **auto-fit + minmax** = grid responsive fără media queries`);

await up('9. CSS Grid', 'Responsive grid', `**Responsive grid în Tailwind** este combinarea grid layout cu breakpoint prefixes pentru a crea interfețe care se adaptează automat la orice dimensiune de ecran.

**Pattern de bază responsive**

\`\`\`html
<!-- 1 col mobile → 2 sm → 3 md → 4 lg → 6 xl -->
<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
  <div class="bg-blue-500 p-4">Card 1</div>
  <div class="bg-blue-500 p-4">Card 2</div>
  <div class="bg-blue-500 p-4">Card 3</div>
  <div class="bg-blue-500 p-4">Card 4</div>
</div>
\`\`\`

**Breakpoints standard Tailwind**

\`\`\`
sm: 640px și peste  (mobile mare / tablet portrait)
md: 768px și peste  (tablet)
lg: 1024px și peste (desktop)
xl: 1280px și peste (desktop mare)
2xl: 1536px și peste (4K/wide)
\`\`\`

**Span responsive pentru elemente individuale**

\`\`\`html
<div class="grid grid-cols-12 gap-4">
  <!-- Articol principal: 12 col mobile, 8 col desktop -->
  <article class="col-span-12 lg:col-span-8 bg-white rounded-xl p-6">
    Conținut
  </article>

  <!-- Sidebar: 12 col mobile (sub article), 4 col desktop -->
  <aside class="col-span-12 lg:col-span-4 bg-slate-100 rounded-xl p-4">
    Sidebar
  </aside>
</div>
\`\`\`

**Grid layout schimbat la breakpoint**

\`\`\`html
<!-- De la coloană la grid -->
<div class="flex flex-col md:grid md:grid-cols-3 gap-4">
  <!-- Pe mobile: stack vertical; pe desktop: 3 coloane -->
</div>

<!-- Schimbare structură completă -->
<div class="grid gap-4
            grid-cols-1
            md:grid-cols-[200px_1fr]
            lg:grid-cols-[240px_1fr_300px]">
  <aside>Sidebar</aside>
  <main>Main</main>
  <aside class="hidden lg:block">Aside dreapta (doar desktop)</aside>
</div>
\`\`\`

**Auto-fit pentru grid fără media queries**

\`\`\`html
<!-- Numărul de coloane se calculează automat din lățimea container -->
<div class="grid gap-4 grid-cols-[repeat(auto-fit,minmax(280px,1fr))]">
  <div class="bg-white p-4 rounded">Card</div>
  <div class="bg-white p-4 rounded">Card</div>
  <div class="bg-white p-4 rounded">Card</div>
  <div class="bg-white p-4 rounded">Card</div>
  <!-- @ 320px: 1 col, @ 800px: 2 col, @ 1200px: 4 col -->
</div>

<!-- Diferența auto-fit vs auto-fill -->
<!-- auto-fit: extinde coloanele pentru a umple spațiul -->
<!-- auto-fill: lasă coloanele goale dacă nu sunt elemente suficiente -->
\`\`\`

**Ordering responsive**

\`\`\`html
<!-- order-{N} pentru a schimba ordinea vizuală -->
<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
  <div class="order-2 md:order-1">
    Pe mobile: jos | Pe desktop: stânga
  </div>
  <div class="order-1 md:order-2">
    Pe mobile: sus | Pe desktop: dreapta
  </div>
</div>
\`\`\`

**Layout-uri reale**

\`\`\`html
<!-- E-commerce: produs grid -->
<div class="grid gap-4 sm:gap-6 lg:gap-8
            grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
  <article class="bg-white rounded-xl overflow-hidden shadow">
    <img class="w-full aspect-square object-cover">
    <div class="p-4">
      <h3 class="font-bold">Produs</h3>
      <p class="text-emerald-600 font-bold">99 RON</p>
    </div>
  </article>
  <!-- ... mai multe produse -->
</div>
\`\`\`

\`\`\`html
<!-- Dashboard cu stats + chart + sidebar -->
<div class="grid gap-6
            grid-cols-1
            md:grid-cols-2
            lg:grid-cols-4">
  <!-- 4 stat cards: 1 col mobile, 2 tablet, 4 desktop -->
  <div class="bg-white p-4 rounded-xl">Total users</div>
  <div class="bg-white p-4 rounded-xl">Revenue</div>
  <div class="bg-white p-4 rounded-xl">Orders</div>
  <div class="bg-white p-4 rounded-xl">Conversion</div>

  <!-- Chart: full width pe tot ecranul cu col-span -->
  <div class="bg-white p-6 rounded-xl col-span-1 md:col-span-2 lg:col-span-3">
    Chart mare
  </div>

  <!-- Activity feed: col-span-1 totdeauna -->
  <div class="bg-white p-4 rounded-xl">Recent activity</div>
</div>
\`\`\`

• **Mobile-first** = stiluri default pentru cel mai mic, override la breakpoint superior
• **auto-fit + minmax** pentru grid-uri care nu necesită ajustări manuale la fiecare ecran
• **col-span-{N} cu prefix** (md:col-span-X) pentru a controla cât ocupă fiecare element`);

await up('10. Grid avansat', 'Grid placement', `**Grid placement avansat** oferă control fin asupra poziției exacte a elementelor în grid — folosind start/end și numere de linii, poți crea layout-uri complexe imposibile cu Flexbox.

**Grid lines vs grid tracks**

\`\`\`
Coloane: |  col 1  |  col 2  |  col 3  |  col 4  |
Linii:   1         2         3         4         5

Pentru a ocupa coloanele 2 și 3:
  col-start-2 col-end-4  (de la linia 2 la linia 4)
\`\`\`

**col-start și col-end**

\`\`\`html
<div class="grid grid-cols-6 gap-2">
  <div class="col-start-2 col-end-5 bg-blue-500 p-4">
    Linia 2 → Linia 5 (ocupă 3 coloane: 2, 3, 4)
  </div>
  <div class="col-start-1 col-end-7 bg-purple-500 p-4">
    Întreg lățimea (1 → 7)
  </div>
  <div class="col-start-3 col-end-6 bg-green-500 p-4">
    Coloane 3, 4, 5
  </div>
</div>
\`\`\`

**Negative line indices**

\`\`\`html
<!-- -1 = ultima linie, -2 = a doua de la sfârșit, etc. -->
<div class="grid grid-cols-12 gap-4">
  <div class="col-start-1 col-end-[-1]">
    Full width (de la prima la ultima linie)
  </div>
  <div class="col-start-1 col-end-[-7]">
    Stânga jumătate (6 coloane)
  </div>
  <div class="col-start-7 col-end-[-1]">
    Dreapta jumătate (6 coloane)
  </div>
</div>
\`\`\`

**Layout cu zone numite (CSS Grid templates)**

\`\`\`html
<!-- Tailwind nu are built-in template-areas, dar poți cu arbitrary values -->
<div class="grid gap-4 h-screen
            grid-cols-[200px_1fr_300px]
            grid-rows-[60px_1fr_40px]
            grid-template-areas:[
              'header_header_header'
              'sidebar_main_aside'
              'footer_footer_footer'
            ]">
  <header class="[grid-area:header] bg-indigo-600 text-white">
    Header
  </header>
  <aside class="[grid-area:sidebar] bg-slate-100">Sidebar</aside>
  <main class="[grid-area:main] bg-white">Main</main>
  <aside class="[grid-area:aside] bg-slate-100">Aside</aside>
  <footer class="[grid-area:footer] bg-slate-800 text-white">Footer</footer>
</div>
\`\`\`

**Magazine layout cu plasament explicit**

\`\`\`html
<!-- Cards de dimensiuni diferite în grid -->
<div class="grid grid-cols-4 grid-rows-3 gap-4 h-[600px]">
  <!-- Hero featured 2x2 -->
  <div class="col-span-2 row-span-2 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl p-6 text-white">
    <h2 class="text-3xl font-bold">Featured</h2>
  </div>

  <!-- 2 cards laterale 1x1 -->
  <div class="bg-blue-500 rounded-xl p-4">Small 1</div>
  <div class="bg-emerald-500 rounded-xl p-4">Small 2</div>

  <!-- Card lat 2x1 -->
  <div class="col-span-2 bg-amber-500 rounded-xl p-4">Wide</div>

  <!-- Card lat jos 4x1 -->
  <div class="col-span-4 bg-slate-700 text-white rounded-xl p-4">Footer card</div>
</div>
\`\`\`

**Z-order și overlap în grid**

\`\`\`html
<!-- Grid cells se pot suprapune cu plasament explicit -->
<div class="grid grid-cols-3 grid-rows-3 gap-4">
  <div class="col-start-1 row-start-1 col-end-3 row-end-3 bg-blue-500 p-4 z-10">
    Suprapus dedesubt
  </div>
  <div class="col-start-2 row-start-2 col-end-4 row-end-4 bg-red-500 p-4 z-20 shadow-2xl">
    Suprapus deasupra (cu z-20)
  </div>
</div>
\`\`\`

• **col-start-N col-end-M** ocupă coloanele N până la M-1 (M e exclusiv — e linia, nu coloana)
• **col-end-[-1]** = până la sfârșit, fără a calcula numărul total de coloane
• **Suprapunerea grid cells** cu z-index = trucuri creative pentru hero sections și overlap-uri`);

await up('10. Grid avansat', 'Auto placement', `**Auto placement și dense packing** în CSS Grid controlează cum se aranjează automat elementele care nu au plasament explicit — esențial pentru grid-uri dinamice cu conținut variabil.

**Grid auto-flow — controlul fluxului**

\`\`\`html
<!-- Default: row (umple pe rânduri) -->
<div class="grid grid-cols-3 grid-flow-row gap-2">
  <div>1</div> <div>2</div> <div>3</div>
  <div>4</div> <div>5</div> <div>6</div>
</div>

<!-- column: umple pe coloane -->
<div class="grid grid-rows-3 grid-flow-col gap-2">
  <div>1</div> <!-- col 1 row 1 -->
  <div>2</div> <!-- col 1 row 2 -->
  <div>3</div> <!-- col 1 row 3 -->
  <div>4</div> <!-- col 2 row 1 -->
  <div>5</div> <!-- col 2 row 2 -->
  <div>6</div> <!-- col 2 row 3 -->
</div>

<!-- dense: umple golurile lăsate de elemente cu span -->
<div class="grid grid-cols-3 grid-flow-row-dense gap-2">
  <div class="col-span-2">Wide 1</div>  <!-- ocupă 1,2 -->
  <div>Small 1</div>                     <!-- ocupă 3 -->
  <div>Small 2</div>                     <!-- ocupă 1 -->
  <div class="col-span-2">Wide 2</div>   <!-- ocupă 2,3 -->
</div>
\`\`\`

**Dense — beneficiul real**

\`\`\`html
<!-- FĂRĂ dense — gaps rămân -->
<div class="grid grid-cols-3 gap-2">
  <div>1</div>
  <div class="col-span-2 bg-blue-500">Wide</div>   <!-- ocupă 2,3 -->
  <div>2</div>
  <div>3</div>
  <div class="col-span-2 bg-blue-500">Wide</div>   <!-- nu intră în rândul 2! -->
  <!-- Rezultat: gap în coloana 1, rândul 2 -->
</div>

<!-- CU grid-flow-row-dense — golurile se umplu -->
<div class="grid grid-cols-3 grid-flow-row-dense gap-2">
  <div>1</div>
  <div class="col-span-2 bg-blue-500">Wide</div>
  <div>2</div> <!-- backfill în col 1 row 2 -->
  <div>3</div> <!-- col 2 row 2 -->
  <div>4</div> <!-- col 3 row 2 -->
  <div class="col-span-2 bg-blue-500">Wide</div>
  <!-- Layout fără goluri -->
</div>
\`\`\`

**Auto-rows și auto-cols**

\`\`\`html
<!-- Toate rândurile implicite să aibă o anumită înălțime -->
<div class="grid grid-cols-3 auto-rows-[100px] gap-2">
  <div>Toate rândurile = 100px</div>
  <div>...</div>
</div>

<!-- Alternative -->
<div class="grid auto-rows-min">Înălțime minimă</div>
<div class="grid auto-rows-max">Înălțime maximă</div>
<div class="grid auto-rows-fr">Fracționar (împărțit egal)</div>
<div class="grid auto-rows-auto">Default (conținut)</div>

<!-- Pentru columns implicite -->
<div class="grid auto-cols-[200px] grid-flow-col">
  Toate coloanele auto = 200px
</div>
\`\`\`

**Masonry-like layout (Pinterest)**

\`\`\`html
<!-- Layout în coloane cu înălțimi diferite — CSS columns (NU grid) -->
<div class="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4">
  <div class="break-inside-avoid mb-4 bg-white rounded-xl shadow p-4">
    <img class="rounded">
    <p>Card scurt</p>
  </div>
  <div class="break-inside-avoid mb-4 bg-white rounded-xl shadow p-4">
    <img class="rounded">
    <p>Card cu text mai mult lorem ipsum dolor sit amet consectetur</p>
  </div>
  <!-- Înălțimile diferite, fără goluri ca în masonry -->
</div>
\`\`\`

**Pattern: dashboard cu mixed sizes**

\`\`\`html
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 grid-flow-row-dense gap-4">
  <!-- Hero card spanning 2x2 -->
  <div class="lg:col-span-2 lg:row-span-2 bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-2xl p-6">
    Hero
  </div>

  <!-- Normal cards -->
  <div class="bg-white rounded-xl p-4 shadow">Stat 1</div>
  <div class="bg-white rounded-xl p-4 shadow">Stat 2</div>

  <!-- Wide card -->
  <div class="sm:col-span-2 bg-white rounded-xl p-4 shadow">Wide stat</div>

  <!-- Small cards -->
  <div class="bg-white rounded-xl p-4 shadow">Mini 1</div>
  <div class="bg-white rounded-xl p-4 shadow">Mini 2</div>
</div>
\`\`\`

• **grid-flow-row-dense** = "umple toate găurile" — esențial pentru bento layouts
• **auto-rows-[100px]** pentru rânduri implicite uniform; **fr** pentru distribuire fracționară
• **columns-N + break-inside-avoid** pentru masonry layout (înălțimi diferite, fără gaps)`);

await up('11. Borders si Border', 'Border utility', `**Border utility classes** în Tailwind controlează toate aspectele chenarelor — grosime, culoare, stil, per latură — cu o gramatică consistentă și predictibilă.

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

await up('11. Borders si Border', 'Border radius', `**Border radius în Tailwind** controlează rotunjirea colțurilor — de la pătrate ascuțite la cercuri perfecte și totul între.

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

await up('12. Spacing', 'Valori responsive', `**Valori responsive și arbitrare pentru spacing** îți permit control fin asupra dimensiunilor — combinând scala Tailwind cu valori custom și prefixele de breakpoint.

**Scala default de spacing**

\`\`\`
0    → 0px
0.5  → 0.125rem (2px)
1    → 0.25rem  (4px)
2    → 0.5rem   (8px)
3    → 0.75rem  (12px)
4    → 1rem     (16px)
5    → 1.25rem  (20px)
6    → 1.5rem   (24px)
8    → 2rem     (32px)
10   → 2.5rem   (40px)
12   → 3rem     (48px)
16   → 4rem     (64px)
20   → 5rem     (80px)
24   → 6rem     (96px)
32   → 8rem     (128px)
\`\`\`

**Margin și padding**

\`\`\`html
<!-- Padding uniform -->
<div class="p-4">Padding 16px peste tot</div>
<div class="p-8">32px</div>

<!-- Per axă -->
<div class="px-6 py-3">Padding X 24px, Y 12px</div>
<div class="px-4 sm:px-6 lg:px-8">Responsive horizontal</div>

<!-- Per laterală -->
<div class="pt-4 pr-6 pb-8 pl-2">Diferit per laterală</div>

<!-- Margin negativ pentru overlap -->
<div class="-mt-4">Margin top -16px (negativ)</div>
<div class="-mx-2">Margin orizontal negativ</div>

<!-- Margin auto pentru centrare -->
<div class="mx-auto max-w-4xl">Centrat orizontal</div>
\`\`\`

**Valori arbitrare**

\`\`\`html
<!-- Dacă scala nu îți oferă valoarea exactă, folosește [valoare] -->
<div class="p-[18px]">18px exact</div>
<div class="mt-[3.5rem]">3.5rem custom</div>
<div class="px-[2vw]">2vw responsive la viewport</div>

<!-- Valori cu unit-uri diferite -->
<div class="w-[calc(100%-200px)]">calc()</div>
<div class="h-[min(100vh,800px)]">min()</div>
<div class="gap-[clamp(1rem,2vw,3rem)]">clamp()</div>

<!-- CSS variables -->
<div class="p-[var(--my-spacing)]">Din variabilă CSS</div>
\`\`\`

**Responsive spacing**

\`\`\`html
<!-- Padding diferit per breakpoint -->
<section class="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
  Hero section cu padding ce crește pe ecrane mari
</section>

<!-- Vertical spacing care se reduce pe mobile -->
<div class="space-y-4 md:space-y-8 lg:space-y-12">
  <div>Section 1</div>
  <div>Section 2</div>
  <div>Section 3</div>
</div>

<!-- Margin responsive cu negativ -->
<div class="-mx-4 sm:mx-0">
  Full width pe mobile (ignoră padding parent), normal pe desktop
</div>
\`\`\`

**Space-x și space-y (spațiu între elemente)**

\`\`\`html
<!-- space-x adaugă margin-left la copii (mai puțin primul) -->
<div class="flex space-x-4">
  <button>Btn 1</button>
  <button>Btn 2</button>
  <button>Btn 3</button>
  <!-- 16px între butoane -->
</div>

<!-- space-y pentru elementele verticale -->
<div class="space-y-6">
  <p>Paragraf 1</p>
  <p>Paragraf 2</p>
  <p>Paragraf 3</p>
</div>

<!-- gap (modern, preferat pentru flex/grid) -->
<div class="flex gap-4">       <!-- Echivalent space-x-4 dar mai clean -->
  <div>1</div><div>2</div>
</div>
<div class="grid grid-cols-3 gap-x-6 gap-y-4">
  <!-- gap funcționează doar în flex/grid -->
</div>
\`\`\`

**Container și max-width**

\`\`\`html
<!-- Container constrained -->
<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  <!-- Pattern Tailwind standard pentru containere centrate -->
</div>

<!-- Max-width values -->
<div class="max-w-xs">    20rem  (320px)  </div>
<div class="max-w-sm">    24rem  (384px)  </div>
<div class="max-w-md">    28rem  (448px)  </div>
<div class="max-w-lg">    32rem  (512px)  </div>
<div class="max-w-xl">    36rem  (576px)  </div>
<div class="max-w-2xl">   42rem  (672px)  </div>
<div class="max-w-3xl">   48rem  (768px)  </div>
<div class="max-w-4xl">   56rem  (896px)  </div>
<div class="max-w-5xl">   64rem  (1024px) </div>
<div class="max-w-7xl">   80rem  (1280px) </div>
<div class="max-w-prose"> 65ch  (text optim) </div>
<div class="max-w-screen-lg"> lg breakpoint </div>
<div class="max-w-none">  Fără limită </div>
<div class="max-w-full">  100%   </div>
\`\`\`

• **space-x/space-y** pentru spațiere flex/grid de bază; **gap** pentru control mai bun (cross-axis)
• **Arbitrary values [N]** pentru când scala nu este suficientă — păstrează totuși consistența
• **max-w-prose** = 65 caractere lățime optimă pentru lizibilitate text`);

await up('12. Spacing', 'Min/max si logical', `**Min/max width/height și logical properties** în Tailwind oferă constrângeri inteligente pentru dimensionare — esențiale pentru layout-uri robuste care funcționează pe orice viewport și direcție.

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
<div class="w-1/5">  20%      </div>
<div class="w-1/6">  16.666%  </div>
<div class="w-1/12"> 8.333%   </div>

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

  console.log('Done Tailwind script 2.');
  await p.$disconnect();
}

run().catch(e => { console.error(e); p.$disconnect(); process.exit(1); });
