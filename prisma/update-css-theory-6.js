const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();

const items = [
  // L21: Object-fit, aspect-ratio
  {
    lessonContains: 'Object-fit',
    titleContains: 'object-fit',
    content: `**object-fit** controlează cum se redimensionează conținutul unui element **replaced** (img, video) în containerul său — similar cu \`background-size\` pentru imagini de fundal.

**Valorile object-fit**

\`\`\`css
img {
  width: 300px;
  height: 200px;

  object-fit: fill;     /* default — deformează imaginea să umple exact */
  object-fit: contain;  /* scalează păstrând ratio, poate lăsa spații */
  object-fit: cover;    /* acoperă tot, poate tăia imaginea */
  object-fit: none;     /* dimensiune originală, nu se scalează */
  object-fit: scale-down; /* cel mai mic dintre none și contain */
}
\`\`\`

**Comparație vizuală**

\`\`\`css
/* Imagine 1600x900 în container 300x200 */

/* fill — deformat, nu recomandată pentru fotografii */
.fill { object-fit: fill; }

/* contain — imaginea completă, bara neagra/albă pe margini */
.contain { object-fit: contain; background: #f1f5f9; }

/* cover — cea mai folosită pentru card-uri și galerii */
.cover { object-fit: cover; }

/* scale-down — ca none dacă imaginea e mai mică, ca contain dacă e mai mare */
.scale-down { object-fit: scale-down; }
\`\`\`

**object-position — controlul centrului**

\`\`\`css
img {
  object-fit: cover;

  object-position: center;       /* default */
  object-position: top;          /* focalizare pe sus */
  object-position: bottom right; /* colț dreapta-jos */
  object-position: 20% 30%;      /* coordonate precise */
  object-position: 0 80px;       /* px absolut */
}

/* Portrete — focus pe fata persoanei */
.portrait {
  object-fit: cover;
  object-position: center 20%; /* Sus, unde e chipul */
}
\`\`\`

**Card-uri uniforme cu object-fit**

\`\`\`css
/* Galerie de produse — imagini de dimensiuni diferite, aspect uniform */
.product-card img {
  width: 100%;
  height: 240px;
  object-fit: cover;
  object-position: center;
  display: block;
  border-radius: 8px 8px 0 0;
}

/* Avatar rotund */
.avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  object-position: center top;
}
\`\`\`

**Video cu object-fit**

\`\`\`css
/* Video background fullscreen */
.video-bg {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
}

/* Video în modal — fără deformare */
.modal-video {
  width: 100%;
  height: 300px;
  object-fit: contain;
  background: black;
}
\`\`\`

**object-fit cu lazy loading**

\`\`\`css
/* Placeholder până se încarcă imaginea */
.lazy-img {
  object-fit: cover;
  background-color: #f1f5f9;  /* culoare placeholder */
  background-image: url('placeholder.jpg');
  background-size: cover;
}

/* Cu blur hash sau shimmer ca placeholder */
.lazy-img[data-loaded="false"] {
  filter: blur(10px);
  transition: filter 0.3s ease;
}
.lazy-img[data-loaded="true"] {
  filter: none;
}
\`\`\`

• **object-fit** funcționează pe \`img\`, \`video\`, \`iframe\`, \`input[type=image]\`
• Spre deosebire de \`background-size\`, elementul **rămâne în DOM** (accesibil, SEO)
• Combina mereu cu **dimensiuni explicite** (width + height) pe container`
  },
  {
    lessonContains: 'Object-fit',
    titleContains: 'aspect-ratio',
    content: `**aspect-ratio** menține raportul lățime:înălțime al unui element indiferent de dimensiunile containerului. Înlocuiește hack-ul clasic cu \`padding-bottom\` procentual.

**Sintaxa**

\`\`\`css
.element {
  aspect-ratio: 16 / 9;  /* widescreen */
  aspect-ratio: 4 / 3;   /* standard */
  aspect-ratio: 1 / 1;   /* pătrat */
  aspect-ratio: 1;        /* echivalent 1/1 */
  aspect-ratio: 2.35 / 1; /* cinemascope */
}
\`\`\`

**Comparație cu hack-ul vechi**

\`\`\`css
/* VECHI — padding hack pentru 16:9 */
.video-wrapper {
  position: relative;
  padding-bottom: 56.25%; /* 9/16 = 56.25% */
  height: 0;
}
.video-wrapper iframe {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

/* MODERN — mult mai simplu */
.video-wrapper {
  aspect-ratio: 16 / 9;
}
.video-wrapper iframe {
  width: 100%;
  height: 100%;
}
\`\`\`

**aspect-ratio cu object-fit pentru imagini**

\`\`\`css
/* Card uniform fără înălțime fixă */
.card-image {
  aspect-ratio: 16 / 9;
  width: 100%;
  overflow: hidden;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Galerie pătrate */
.gallery-item {
  aspect-ratio: 1;
}
.gallery-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
\`\`\`

**aspect-ratio în grid**

\`\`\`css
/* Grid responsiv cu celule proporționale */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
}

.grid-item {
  aspect-ratio: 4 / 3;
  background: var(--bg-card);
  border-radius: 8px;
  overflow: hidden;
}
\`\`\`

**aspect-ratio cu conținut care depășește**

\`\`\`css
/* Dacă conținutul e mai mare, aspectul e ignorat */
.box {
  aspect-ratio: 1;
  width: 200px;
  min-height: 0; /* previne depășirea în flex */
}

/* Forță aspect chiar dacă conținut mare */
.strict {
  aspect-ratio: 1;
  width: 200px;
  overflow: hidden; /* sau auto */
}
\`\`\`

**Skeleton loader cu aspect-ratio**

\`\`\`css
.skeleton-image {
  aspect-ratio: 16 / 9;
  width: 100%;
  background: linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 8px;
}
\`\`\`

**Suport și fallback**

\`\`\`css
/* aspect-ratio — suport excelent (Chrome 88+, Firefox 89+, Safari 15+) */

/* Fallback pentru browsere foarte vechi */
@supports not (aspect-ratio: 1) {
  .ratio-16-9::before {
    content: "";
    display: block;
    padding-top: 56.25%;
  }
}
\`\`\``
  },
  {
    lessonContains: 'Object-fit',
    titleContains: 'Cazuri practice',
    content: `**Cazuri practice** pentru \`object-fit\` și \`aspect-ratio\` — pattern-urile de zi cu zi care rezolvă probleme comune de layout responsive cu imagini.

**Galerie responsive uniformă**

\`\`\`css
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 16px;
}

.gallery-item {
  aspect-ratio: 4 / 3;
  overflow: hidden;
  border-radius: 12px;
  background: #f1f5f9;
}

.gallery-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.gallery-item:hover img {
  transform: scale(1.05);
}
\`\`\`

**Card cu imagine featured**

\`\`\`css
.post-card {
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid var(--border);
}

.post-card__image {
  aspect-ratio: 16 / 9;
  overflow: hidden;
}

.post-card__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transition: transform 0.3s ease;
}

.post-card:hover .post-card__image img {
  transform: scale(1.03);
}

.post-card__body { padding: 20px; }
\`\`\`

**Avatar cu fallback**

\`\`\`css
.avatar-container {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  overflow: hidden;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  font-weight: bold;
  color: white;
}

.avatar-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
\`\`\`

**Hero image full-width**

\`\`\`css
.hero {
  aspect-ratio: 16 / 7;
  min-height: 400px;
  max-height: 700px;
  overflow: hidden;
  position: relative;
}

.hero img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 30%; /* focus pe sus */
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%);
}

.hero-content {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 32px;
  color: white;
}
\`\`\`

**Thumbnail cu badge**

\`\`\`css
.video-thumbnail {
  position: relative;
  aspect-ratio: 16 / 9;
  background: #0f172a;
  border-radius: 8px;
  overflow: hidden;
}

.video-thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.video-duration {
  position: absolute;
  bottom: 8px;
  right: 8px;
  background: rgba(0,0,0,0.8);
  color: white;
  font-size: 0.75rem;
  padding: 2px 6px;
  border-radius: 4px;
  font-variant-numeric: tabular-nums;
}
\`\`\`

**Logo în header — proporție fixă**

\`\`\`css
.logo {
  height: 40px;
  width: auto; /* lărgimea calculată automat */
}

/* SAU cu aspect-ratio */
.logo-container {
  height: 40px;
  aspect-ratio: 4 / 1; /* raport logo */
}

.logo-container img {
  width: 100%;
  height: 100%;
  object-fit: contain; /* păstrează tot logo-ul vizibil */
}
\`\`\`

• **Regula de aur**: \`object-fit: cover\` + \`aspect-ratio\` pe container = imagini uniforme
• Adaugă \`overflow: hidden\` pe container pentru a tăia imaginile care depășesc
• Folosește \`object-position\` pentru a controla ce parte din imagine e vizibilă`
  },

  // L22: Container queries
  {
    lessonContains: 'Container queries',
    titleContains: 'Limitele',
    content: `**Media queries** răspund la dimensiunea **viewport-ului** (fereastra browserului). Această abordare devine problematică când același component apare în contexte diferite — sidebar, modal, pagină principală.

**Problema cu media queries clasice**

\`\`\`css
/* Media query — bazat pe viewport, nu pe container */
@media (min-width: 768px) {
  .card { display: grid; grid-template-columns: 200px 1fr; }
}
\`\`\`

**Scenariul problemei**

\`\`\`
Viewport: 1200px (desktop)

[Sidebar: 300px]  |  [Main content: 900px]
  .card = narrow  |    .card = wide
\`\`\`

- Media query vede viewport 1200px → aplică stilul **wide** la **ambele** .card
- Dar **card-ul** din sidebar are doar 300px → arată distorsionat
- Media query nu știe în ce container se află componenta

**Workaround-uri vechi — toate imperfecte**

\`\`\`css
/* 1. Clase modificatoare — coupling HTML-CSS */
.card.card--narrow { /* stiluri narrow */ }
.card.card--wide   { /* stiluri wide */ }

/* 2. Clase container */
.sidebar .card { /* stiluri narrow */ }
.main-content .card { /* stiluri wide */ }
/* Problemă: componenta nu mai e independentă */

/* 3. ResizeObserver cu JavaScript */
/* Funcționează, dar JS pentru layout = antipattern */
\`\`\`

**De ce nu poți folosi media queries pentru componente**

\`\`\`
Componenta Card trebuie să funcționeze în:
  • Grid cu 3 coloane → card mic
  • Pagina de articol → card mediu
  • Modal fullscreen → card mare
  • Sidebar → card îngust

Media query nu știe NICIUNUL din aceste contexte.
Vede doar viewport-ul.
\`\`\`

**Soluția: Container Queries**

\`\`\`css
/* Marchează un element ca "container" */
.card-wrapper {
  container-type: inline-size;
  container-name: card-container;
}

/* Componenta răspunde la containerul SĂU */
@container (min-width: 400px) {
  .card {
    display: grid;
    grid-template-columns: 150px 1fr;
  }
}
\`\`\`

**Acum componenta este cu adevărat independentă**

\`\`\`
Sidebar (300px container): card = layout vertical (< 400px)
Main content (900px container): card = layout grid (≥ 400px)
Modal (600px container): card = layout grid (≥ 400px)
\`\`\`

• **Container queries** = componente care se adaptează la **containerul lor**
• Permit **true component-driven design**
• Suport excelent: Chrome 105+, Firefox 110+, Safari 16+`
  },
  {
    lessonContains: 'Container queries',
    titleContains: 'Sintaxa',
    content: `**Sintaxa container queries** necesită doi pași: definirea unui **container** și scrierea **regulilor** condiționate pe dimensiunea lui.

**Pasul 1: Definirea containerului**

\`\`\`css
/* container-type */
.wrapper {
  container-type: inline-size; /* răspunde la lățime (cel mai comun) */
  container-type: size;        /* răspunde la lățime ȘI înălțime */
  container-type: normal;      /* container pentru style queries, nu size */
}

/* container-name — opțional, pentru query-uri specifice */
.card-wrapper {
  container-type: inline-size;
  container-name: card;
}

/* Shorthand */
.wrapper {
  container: card / inline-size;
  /* container: <name> / <type> */
}
\`\`\`

**Pasul 2: Scrierea regulilor**

\`\`\`css
/* @container <name> (<condition>) */
@container card (min-width: 400px) {
  .card {
    display: grid;
    grid-template-columns: 160px 1fr;
  }
}

/* Fără nume — se aplică la cel mai apropiat container */
@container (min-width: 600px) {
  .card-title { font-size: 1.5rem; }
}

/* Range syntax (CSS 2023) */
@container (width >= 400px) {
  .card { grid-template-columns: 160px 1fr; }
}

@container (200px <= width <= 600px) {
  .card { padding: 12px; }
}
\`\`\`

**Exemplu complet — card responsive**

\`\`\`css
/* Container */
.card-container {
  container: card / inline-size;
}

/* Stiluri base — mobile-first */
.card {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
}

.card-image {
  aspect-ratio: 16 / 9;
  width: 100%;
  object-fit: cover;
  border-radius: 8px;
}

/* Layout mediu */
@container card (min-width: 380px) {
  .card {
    flex-direction: row;
    align-items: flex-start;
  }

  .card-image {
    width: 140px;
    height: 100px;
    flex-shrink: 0;
    aspect-ratio: auto;
  }
}

/* Layout mare */
@container card (min-width: 600px) {
  .card {
    padding: 24px;
    gap: 20px;
  }

  .card-image { width: 200px; height: 150px; }
  .card-title { font-size: 1.5rem; }
}
\`\`\`

**Container query units (cqw, cqh, cqi, cqb)**

\`\`\`css
.card {
  container-type: inline-size;
}

/* cqw = 1% din lățimea containerului */
.card-title {
  font-size: clamp(1rem, 4cqw, 2rem);
}

/* cqi = 1% din inline size (lățime în LTR) */
.card-image { width: 30cqi; }

/* cqh = 1% din înălțimea containerului (necesită size) */
.card { height: 50cqh; }
\`\`\``
  },
  {
    lessonContains: 'Container queries',
    titleContains: 'Exemple practice',
    content: `**Container queries în practică** — pattern-uri reale care demonstrează puterea componentelor truly responsive, independente de context.

**Navigation card — 3 breakpoints**

\`\`\`css
.nav-card-wrapper {
  container: nav-card / inline-size;
}

/* Mic: icon + text stacked */
.nav-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px;
  gap: 8px;
  text-align: center;
}

/* Mediu: icon + text inline */
@container nav-card (min-width: 200px) {
  .nav-card {
    flex-direction: row;
    text-align: left;
    gap: 12px;
  }
}

/* Mare: card cu descriere */
@container nav-card (min-width: 350px) {
  .nav-card {
    padding: 20px;
    gap: 16px;
  }
  .nav-card-description { display: block; }
}
\`\`\`

**Product card — layout adaptat**

\`\`\`css
.product-wrapper { container: product / inline-size; }

.product-card {
  display: grid;
  grid-template-areas: "image" "info" "actions";
  gap: 12px;
  padding: 16px;
}

@container product (min-width: 400px) {
  .product-card {
    grid-template-columns: 150px 1fr;
    grid-template-areas:
      "image info"
      "image actions";
  }
}

@container product (min-width: 650px) {
  .product-card {
    grid-template-columns: 200px 1fr auto;
    grid-template-areas: "image info actions";
    align-items: center;
  }
}

.product-image  { grid-area: image; }
.product-info   { grid-area: info; }
.product-actions { grid-area: actions; }
\`\`\`

**Dashboard widget — fluid**

\`\`\`css
.widget { container: widget / inline-size; }

.stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}

@container widget (min-width: 300px) {
  .stats-grid { grid-template-columns: repeat(4, 1fr); }
}

@container widget (min-width: 500px) {
  .stats-grid {
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
  }
  .stat-value { font-size: 2rem; }
  .stat-label { font-size: 0.85rem; }
}
\`\`\`

**Style queries — condiții pe valori CSS**

\`\`\`css
/* Style query — pe valoarea unei custom property */
.card-wrapper {
  container-type: style;
}

.card-wrapper[data-variant="featured"] {
  --featured: true;
}

@container style(--featured: true) {
  .card {
    border: 2px solid gold;
    background: linear-gradient(135deg, #fef3c7, white);
  }
  .card-badge { display: block; }
}
\`\`\`

**Combinare media + container queries**

\`\`\`css
/* Media query pentru layout global */
@media (min-width: 1024px) {
  .layout {
    display: grid;
    grid-template-columns: 280px 1fr;
  }
}

/* Container query pentru componente */
.card-wrapper { container: card / inline-size; }

@container card (min-width: 400px) {
  .card { display: grid; grid-template-columns: 140px 1fr; }
}
/* Card se adaptează INDIFERENT dacă e în sidebar sau main */
\`\`\``
  },

  // L23: CSS layers (@layer)
  {
    lessonContains: 'CSS layers',
    titleContains: 'Problema',
    content: `**Problema cascadei** în proiecte reale apare când CSS-ul din surse multiple (framework, componente, utilitare) intră în conflict și specificitatea devine greu de gestionat.

**Scenariul clasic al conflictelor**

\`\`\`css
/* Bootstrap (librărie) */
.btn { background: #0d6efd; padding: 6px 12px; }

/* Customizarea ta */
.btn { background: royalblue; } /* Câștigă dacă vine după */

/* Dar dacă Bootstrap vine DUPĂ în HTML? */
\`\`\`

\`\`\`html
<link rel="stylesheet" href="my-styles.css">    <!-- primul -->
<link rel="stylesheet" href="bootstrap.css">    <!-- al doilea = câștigă -->
\`\`\`

**Problema specificității ridicate din terțe librării**

\`\`\`css
/* Bootstrap sau Tailwind pot folosi specificitate înaltă */
.navbar .nav-item.active .nav-link {
  color: white;          /* (0,3,1) */
}

/* Customizarea ta cu specificitate mai mică pierde */
.nav-link { color: royalblue; } /* (0,1,0) — pierde */

/* Ești forțat la: */
.navbar .nav-item .nav-link { color: royalblue; }
/* sau !important — amândouă sunt anti-pattern */
\`\`\`

**Ordinea surselor — fragilă**

\`\`\`css
/* Depinzi de ordinea exactă a fișierelor */
/* Dacă cineva schimbă ordinea import-urilor, totul se strică */
@import 'reset.css';
@import 'base.css';
@import 'components.css';
@import 'utilities.css'; /* orice schimbare de ordine = bug */
\`\`\`

**Problema cu !important**

\`\`\`css
/* Librăria folosește !important */
.hidden { display: none !important; }

/* Tu vrei să arați un element hidden */
.modal .hidden { display: flex !important; } /* nevoie de !important counter */
/* Duce la rase arms de !important */
\`\`\`

**Lipsa de encapsulare**

\`\`\`css
/* CSS-ul global afectează totul */
/* Nu există concept de "module scope" */
/* Orice clasă .card poate fi afectată de orice regulă .card */

/* BEM și metodologii încearcă să rezolve asta prin convenții */
/* Dar nu e enforced de limbaj */
\`\`\`

**@layer — soluția sistemică**

\`\`\`css
/* Definire ordine înainte de a scrie stiluri */
@layer reset, base, vendor, components, utilities;

/* Acum ordinea e explicită și garantată */
/* Utilities câștigă mereu față de components, indiferent de ordine fișiere */
\`\`\`

**Beneficii @layer**

• **Ordinea explicit controlată** — nu depinde de ordinea fișierelor
• **Specificitate izolată** — regulile dintr-un layer nu "scapă" afară
• **Terțe librării** pot fi puse în layer cu prioritate scăzută
• **Utilitarele** pot câștiga mereu fără \`!important\``
  },
  {
    lessonContains: 'CSS layers',
    titleContains: 'Sintaxa @layer',
    content: `**@layer** permite organizarea CSS-ului în straturi cu ordine de prioritate explicită. Layer-urile declarate **mai târziu** au prioritate mai mare.

**Definire și ordine**

\`\`\`css
/* Declară ordinea ÎNAINTE de a scrie stiluri */
/* Layer-urile de mai jos câștigă față de cele de mai sus */
@layer reset, base, vendor, components, utilities;

/* Echivalent cu prioritate: */
/* reset < base < vendor < components < utilities */
\`\`\`

**Adăugarea stilurilor în layer-uri**

\`\`\`css
@layer reset {
  *, *::before, *::after { box-sizing: border-box; }
  * { margin: 0; padding: 0; }
  html { font-size: 16px; }
}

@layer base {
  body {
    font-family: var(--font-sans);
    color: var(--text);
    background: var(--bg);
    line-height: 1.6;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 700;
    line-height: 1.2;
  }

  a {
    color: var(--primary);
    text-decoration: none;
  }
}

@layer components {
  .btn {
    display: inline-flex;
    align-items: center;
    padding: 8px 16px;
    border-radius: 6px;
    font-weight: 500;
    cursor: pointer;
  }

  .card {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 24px;
  }
}

@layer utilities {
  .hidden  { display: none; }
  .sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0,0,0,0); }
  .mt-4    { margin-top: 16px; }
  .text-center { text-align: center; }
}
\`\`\`

**Layer-uri și specificitate**

\`\`\`css
@layer base, components;

@layer components {
  /* Specificitate (0,2,0) */
  .nav .link { color: blue; }
}

@layer base {
  /* Specificitate (1,0,0) — ID! */
  #nav a { color: red; }
}

/* Câștigă .nav .link din components, chiar dacă specificitate mai mică */
/* Layer components > layer base în ordinea declarată */
\`\`\`

**Stiluri în afara oricărui layer**

\`\`\`css
@layer reset, components;

/* Stiluri UNLAYERED — au MEREU prioritate față de layer-uri */
.urgent { color: red !important; } /* max prioritate */
.override { color: green; }        /* câștigă față de orice layer */
\`\`\`

**Layer-uri inline vs fișiere separate**

\`\`\`css
/* Fișier principal: styles.css */
@layer vendor, app;

@layer vendor {
  @import url('bootstrap.css');
  @import url('normalize.css');
}

/* SAU cu @import layer */
@import url('bootstrap.css') layer(vendor);
@import url('normalize.css') layer(vendor);

@layer app {
  @import url('components.css');
  @import url('utilities.css');
}
\`\`\``
  },
  {
    lessonContains: 'CSS layers',
    titleContains: 'Importuri',
    content: `**@layer cu importuri și nested layers** — organizarea unui sistem CSS complex în mai multe fișiere cu ierarhie de layer-uri.

**@import cu layer**

\`\`\`css
/* Importă o foaie de stiluri direct într-un layer */
@import url('reset.css') layer(reset);
@import url('bootstrap.css') layer(vendor);
@import url('components/button.css') layer(components);

/* Fără layer — în afara cascadei de layer-uri */
@import url('critical.css'); /* unlayered = prioritate maximă */
\`\`\`

**Nested layers (layer-uri imbricate)**

\`\`\`css
@layer components {
  /* Layer imbricate în components */
  @layer base {
    .btn { padding: 8px 16px; border-radius: 6px; }
  }

  @layer variants {
    .btn-primary { background: royalblue; color: white; }
    .btn-secondary { background: transparent; border: 1px solid royalblue; }
  }

  @layer states {
    .btn:hover { filter: brightness(1.1); }
    .btn:disabled { opacity: 0.5; pointer-events: none; }
  }
}
/* Ordinea internă: components.base < components.variants < components.states */
\`\`\`

**Pattern complet pentru proiecte mari**

\`\`\`css
/* main.css */
/* Declară toate layer-urile la nivel global */
@layer
  reset,
  tokens,
  base,
  vendor,
  layout,
  components.base,
  components.variants,
  components.states,
  pages,
  utilities;

@import 'reset.css' layer(reset);
@import 'tokens.css' layer(tokens);
@import 'base.css' layer(base);
@import 'bootstrap.css' layer(vendor);

@layer layout {
  @import 'layouts/grid.css';
  @import 'layouts/sidebar.css';
}

@layer components.base {
  @import 'components/button.base.css';
  @import 'components/card.base.css';
}

@layer components.variants {
  @import 'components/button.variants.css';
}

@layer utilities {
  @import 'utilities.css';
}
\`\`\`

**Layer cu media queries**

\`\`\`css
/* Media queries pot fi în layer-uri */
@layer components {
  .card { padding: 16px; }

  @media (min-width: 768px) {
    .card { padding: 24px; }
  }
}

/* SAU layer-uri în media queries (rar recomandat) */
@media (min-width: 768px) {
  @layer desktop {
    .card { padding: 24px; }
  }
}
\`\`\`

**Interacțiunea cu !important**

\`\`\`css
@layer reset, components, utilities;

@layer components {
  .btn { color: blue; }
  .btn { color: red !important; } /* mai prioritar în components */
}

@layer utilities {
  .btn { color: green; }           /* câștigă față de components */
  .btn { color: purple !important; } /* !important în utils = câștigă față de totul */
}

/* Ordinea pentru !important este INVERSATĂ față de normal */
/* !important în reset > !important în utilities */
\`\`\``
  },

  // L24: Scroll snap și sticky
  {
    lessonContains: 'Scroll snap',
    titleContains: 'Scroll snap',
    content: `**Scroll snap** ancorează scroll-ul la poziții fixe, creând carousele, galerii și secțiuni full-page cu experiență nativă — fără JavaScript.

**Container scroll snap**

\`\`\`css
/* Pe containerul cu scroll */
.carousel {
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  /* x | y | both | block | inline */
  /* mandatory | proximity */
  gap: 16px;
  scrollbar-width: none; /* ascunde scrollbar */
}

.carousel::-webkit-scrollbar { display: none; }
\`\`\`

**Elementele snap**

\`\`\`css
/* Pe copiii din container */
.slide {
  scroll-snap-align: start;   /* | center | end */
  flex-shrink: 0;
  width: 100%;
}
\`\`\`

**Carousel orizontal**

\`\`\`css
.carousel-wrapper {
  position: relative;
  overflow: hidden;
}

.carousel {
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  scrollbar-width: none;
  gap: 0;
}
.carousel::-webkit-scrollbar { display: none; }

.slide {
  scroll-snap-align: center;
  flex-shrink: 0;
  width: 100%;
  height: 400px;
  object-fit: cover;
}
\`\`\`

**Galerie cu peek (afișare parțială)**

\`\`\`css
.gallery {
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  padding: 0 16px;
  gap: 12px;
}

.gallery-item {
  scroll-snap-align: start;
  flex-shrink: 0;
  width: calc(100% - 48px); /* peek: vede 48px din card-ul următor */
  aspect-ratio: 4 / 3;
  object-fit: cover;
  border-radius: 12px;
}
\`\`\`

**Full-page sections (vertical)**

\`\`\`css
html {
  scroll-snap-type: y mandatory;
  overflow-y: scroll;
}

.section {
  scroll-snap-align: start;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
\`\`\`

**scroll-snap-stop — forțare oprire**

\`\`\`css
/* Implicit: scroll poate sări peste elemente */
/* snap-stop: always — oprire garantată la fiecare */
.slide {
  scroll-snap-align: start;
  scroll-snap-stop: always; /* nu sări peste acest slide */
}
\`\`\`

**mandatory vs proximity**

\`\`\`css
/* mandatory — scroll-ul SE VA opri mereu la un snap point */
.container { scroll-snap-type: x mandatory; }

/* proximity — snap-ul se aplică dacă ești suficient de aproape */
.container { scroll-snap-type: x proximity; }
/* proximity = mai natural pentru conținut mixt */
\`\`\``
  },
  {
    lessonContains: 'Scroll snap',
    titleContains: 'sticky',
    content: `**position: sticky** combină comportamentul \`relative\` (rămâne în flow) și \`fixed\` (se lipește la un threshold) — fără JavaScript, fără calcule de scroll.

**Sintaxa de bază**

\`\`\`css
.header {
  position: sticky;
  top: 0;      /* threshold de lipire: 0 = la marginea viewport */
  z-index: 10; /* deasupra conținutului de sub el */
}

/* Alte direcții */
.sidebar { position: sticky; top: 24px; } /* cu offset */
.footer  { position: sticky; bottom: 0; }
\`\`\`

**Cum funcționează**

\`\`\`
1. Înainte de threshold: comportament RELATIVE
   - Ocupă loc în flux normal
   - Scroll normal cu pagina

2. La threshold (top: 0 atins):
   - Devine FIXED relativ la viewport
   - Rămâne vizibil

3. Când containerul părintelui dispare din viewport:
   - Se duce cu părintele (nu rămâne "lipit" de tot)
\`\`\`

**Navbar sticky**

\`\`\`css
.navbar {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(255,255,255,0.9);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(0,0,0,0.1);
  /* Animație la scroll cu JS */
  transition: box-shadow 0.3s ease;
}

/* Cu JavaScript pentru shadow la scroll */
window.addEventListener('scroll', () => {
  const nav = document.querySelector('.navbar');
  nav.style.boxShadow = window.scrollY > 20
    ? '0 2px 20px rgba(0,0,0,0.1)'
    : 'none';
});
\`\`\`

**Sidebar sticky cu scroll propriu**

\`\`\`css
.layout {
  display: grid;
  grid-template-columns: 1fr 280px;
  align-items: start;
  gap: 24px;
}

.sidebar {
  position: sticky;
  top: 24px; /* 24px de la top viewport */
  max-height: calc(100vh - 48px);
  overflow-y: auto;
}

.main-content { /* scrollează normal */ }
\`\`\`

**Table of contents sticky**

\`\`\`css
.toc {
  position: sticky;
  top: 80px; /* sub navbar */
  max-height: calc(100vh - 80px - 32px);
  overflow-y: auto;
  padding: 16px;
  border-left: 2px solid var(--border);
}

.toc-link { display: block; padding: 4px 0; color: var(--text-muted); }
.toc-link.active { color: var(--primary); border-left: 2px solid currentColor; }
\`\`\`

**Cerințe pentru sticky să funcționeze**

\`\`\`css
/* 1. Elementul sticky TREBUIE să fie în container cu scroll */
/* 2. Părintele NU trebuie să aibă overflow: hidden sau overflow: auto */
/* 3. Trebuie specificată cel puțin una din: top, bottom, left, right */
/* 4. Containerul trebuie să aibă înălțime mai mare decât elementul sticky */

/* Debugging: dacă sticky nu funcționează: */
/* - Verifică că un parinte nu are overflow:hidden */
/* - Verifică că ai top/bottom specificat */
/* - Adaugă border temporar pe parinte să vezi înălțimea */
\`\`\``
  },
  {
    lessonContains: 'Scroll snap',
    titleContains: 'Scroll behavior',
    content: `**scroll-behavior** și **snap stop** controlează experiența de navigare prin pagini cu secțiuni, anchors și carousele — creând tranziții fluide fără JavaScript.

**scroll-behavior**

\`\`\`css
/* Aplică pe elementul care scrollează (html sau container) */
html {
  scroll-behavior: smooth; /* animație fluidă la navigare */
  /* vs: scroll-behavior: auto (default, instant) */
}

/* Sau pe un container specific */
.tabs-content {
  scroll-behavior: smooth;
  overflow-x: auto;
}
\`\`\`

**Anchor navigation fluid**

\`\`\`css
html { scroll-behavior: smooth; }
\`\`\`

\`\`\`html
<nav>
  <a href="#about">About</a>
  <a href="#work">Work</a>
  <a href="#contact">Contact</a>
</nav>

<section id="about">...</section>
<section id="work">...</section>
<section id="contact">...</section>
\`\`\`

**scroll-padding — offset pentru sticky header**

\`\`\`css
/* Fără scroll-padding: secțiunea se ascunde sub navbar */
/* Cu scroll-padding: offset compensează înălțimea navbar */

html {
  scroll-behavior: smooth;
  scroll-padding-top: 80px; /* înălțimea navbar */
}

/* SAU per-element */
#section {
  scroll-margin-top: 80px; /* același efect, pe element */
}
\`\`\`

**Snap scroll + keyboard navigation**

\`\`\`css
/* Snap containers sunt navigabile cu keyboard automat */
.carousel {
  scroll-snap-type: x mandatory;
  overflow-x: auto;
}

.slide {
  scroll-snap-align: start;
  /* Tab focusează slide-ul → carousel scrollează automat */
}

/* Accesibilitate: atribute ARIA */
/* role="region" aria-label="Carousel" pe container */
/* role="group" aria-roledescription="slide" pe fiecare slide */
\`\`\`

**Carousel cu butoane JS**

\`\`\`javascript
const carousel = document.querySelector('.carousel');
const slides = document.querySelectorAll('.slide');
let current = 0;

function scrollTo(index) {
  current = Math.max(0, Math.min(index, slides.length - 1));
  slides[current].scrollIntoView({
    behavior: 'smooth',
    block: 'nearest',
    inline: 'start'
  });
}

document.querySelector('.next').addEventListener('click', () => scrollTo(current + 1));
document.querySelector('.prev').addEventListener('click', () => scrollTo(current - 1));
\`\`\`

**overscroll-behavior**

\`\`\`css
/* Previne scroll chain — scroll din modal nu scrollează pagina */
.modal-body {
  overflow-y: auto;
  overscroll-behavior: contain; /* auto | contain | none */
}

/* Previne pull-to-refresh pe mobile */
body {
  overscroll-behavior-y: none;
}
\`\`\`

**prefers-reduced-motion pentru scroll**

\`\`\`css
@media (prefers-reduced-motion: no-preference) {
  html { scroll-behavior: smooth; }
}

/* Sau cu negate */
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  .animated { transition: none; animation: none; }
}
\`\`\``
  },
];

async function run() {
  let updated = 0, notFound = 0;
  for (const item of items) {
    const lessons = await p.lesson.findMany({
      where: { module: { slug: 'css' }, title: { contains: item.lessonContains } }
    });
    if (!lessons.length) { console.log(`! Lesson not found: ${item.lessonContains}`); notFound++; continue; }
    const theory = await p.theory.findFirst({
      where: { lessonId: { in: lessons.map(l => l.id) }, title: { contains: item.titleContains } }
    });
    if (!theory) { console.log(`! Teo: ${item.titleContains} in ${item.lessonContains}`); notFound++; continue; }
    await p.theory.update({ where: { id: theory.id }, data: { content: item.content } });
    console.log(`✓ ${theory.title}: ${theory.content.length} → ${item.content.length}`);
    updated++;
  }
  console.log(`\nDone: ${updated} updated, ${notFound} not found`);
  await p.$disconnect();
}

run().catch(e => { console.error(e); p.$disconnect(); process.exit(1); });
