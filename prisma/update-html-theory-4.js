"use strict";
require("dotenv").config({ path: ".env" });
const { PrismaClient } = require("@prisma/client");
const p = new PrismaClient();

const UPDATES = [
  // L28: Data Attributes, Microdata și Schema.org
  { lesson: "28. Data Attributes, Microdata și Schema.org", title: "Data Attributes — Stocare Date în HTML", content: `**Data attributes** (\`data-*\`) sunt atribute HTML5 personalizate pentru stocarea datelor pe elemente. Accesibile din JavaScript prin \`dataset\` și din CSS prin selectori de atribut.

**Sintaxa și convenția de naming:**
\`\`\`html
<!-- kebab-case în HTML → camelCase în JS dataset -->
<div
  data-user-id="42"
  data-user-role="admin"
  data-last-login="2024-01-15T14:30"
  data-score="95.5"
  data-is-premium="true"
  data-tags='["html","css","js"]'
>
  Utilizator Cristi
</div>
\`\`\`

**Accesul din JavaScript:**
\`\`\`javascript
const el = document.querySelector('div');

// Citire — toate metodele
el.dataset.userId       // "42"  (kebab → camelCase automat)
el.dataset.userRole     // "admin"
el.dataset.lastLogin    // "2024-01-15T14:30"
el.getAttribute('data-user-id')  // "42" (alternativă)

// Valorile sunt ÎNTOTDEAUNA string-uri — convertește când e necesar
const userId = parseInt(el.dataset.userId);          // 42 (number)
const score  = parseFloat(el.dataset.score);         // 95.5 (number)
const isPrem = el.dataset.isPremium === 'true';       // true (boolean)
const tags   = JSON.parse(el.dataset.tags);           // ["html","css","js"] (array)

// Scriere
el.dataset.score = '100';               // adaugă sau modifică
el.dataset.newField = 'valoare nouă';   // adaugă câmp nou

// Ștergere
delete el.dataset.score;               // elimină data-score
el.removeAttribute('data-score');       // alternativă

// Iterare toate data attributes
for (const [key, value] of Object.entries(el.dataset)) {
  console.log(\`data-\${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: \${value}\`);
}
\`\`\`

**Cazuri de utilizare practice:**
\`\`\`html
<!-- Coș de cumpărături -->
<div class="product"
  data-product-id="sku-1234"
  data-product-name="Laptop Pro 15"
  data-price="3499.99"
  data-stock="5"
  data-category="electronice">

  <h3>Laptop Pro 15</h3>
  <p>3.499,99 lei</p>
  <button class="add-to-cart">Adaugă în coș</button>
</div>

<!-- Componenta tab -->
<ul role="tablist">
  <li role="tab" data-tab="general" aria-selected="true">General</li>
  <li role="tab" data-tab="avanzat" aria-selected="false">Avansat</li>
</ul>
<div data-tab-content="general">Conținut general...</div>
<div data-tab-content="avansat" hidden>Conținut avansat...</div>

<!-- Tooltip -->
<button data-tooltip="Trimite formularul de contact">
  Trimite
</button>
\`\`\`

\`\`\`javascript
// Gestionare coș de cumpărături
document.querySelectorAll('.add-to-cart').forEach(btn => {
  btn.addEventListener('click', () => {
    const product = btn.closest('.product');
    addToCart({
      id:   product.dataset.productId,
      name: product.dataset.productName,
      price: parseFloat(product.dataset.price),
      qty: 1
    });
  });
});

// Sistem tab cu data attributes
document.querySelectorAll('[role="tab"]').forEach(tab => {
  tab.addEventListener('click', () => {
    const tabId = tab.dataset.tab;
    document.querySelectorAll('[role="tab"]').forEach(t => t.setAttribute('aria-selected', 'false'));
    document.querySelectorAll('[data-tab-content]').forEach(c => c.hidden = true);
    tab.setAttribute('aria-selected', 'true');
    document.querySelector(\`[data-tab-content="\${tabId}"]\`).hidden = false;
  });
});
\`\`\`

• Data attributes sunt vizibile în HTML sursă — **nu stoca date sensibile**.
• Valorile sunt string-uri — serializează obiecte cu \`JSON.stringify\`, parsează cu \`JSON.parse\`.
• Convenție: \`data-\` urmat de minimum un caracter; fără litere mari; fără caracterele speciale XML.
• Performanță: \`dataset\` e ușor mai lent decât \`getAttribute\` — irelevant în practică.` },

  { lesson: "28. Data Attributes, Microdata și Schema.org", title: "Paternuri Practice cu Data Attributes", content: `**Paternuri avansate** cu data attributes pentru filtrare, sortare, tooltips, animații și gestionarea stării UI fără framework.

**Filtrare și sortare cu data attributes:**
\`\`\`html
<div class="filters">
  <button data-filter="all" class="active">Toate</button>
  <button data-filter="frontend">Frontend</button>
  <button data-filter="backend">Backend</button>
</div>

<div class="grid">
  <article data-category="frontend" data-level="beginner" data-year="2024">HTML5</article>
  <article data-category="frontend" data-level="intermediate" data-year="2024">CSS Grid</article>
  <article data-category="backend" data-level="intermediate" data-year="2023">Node.js</article>
  <article data-category="backend" data-level="advanced" data-year="2024">PostgreSQL</article>
</div>
\`\`\`

\`\`\`javascript
const items = document.querySelectorAll('.grid article');
const filterBtns = document.querySelectorAll('[data-filter]');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const filter = btn.dataset.filter;

    // Update active state
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // Filtrare
    items.forEach(item => {
      const show = filter === 'all' || item.dataset.category === filter;
      item.hidden = !show;
      item.style.animation = show ? 'fadeIn 0.3s ease' : '';
    });
  });
});
\`\`\`

**Tooltip system cu CSS și data:**
\`\`\`html
<button data-tooltip="Salvează progresul tău" data-tooltip-pos="top">
  Salvează
</button>
<a href="/profil" data-tooltip="Mergi la profilul tău" data-tooltip-pos="bottom">
  Profil
</a>
\`\`\`

\`\`\`css
[data-tooltip] { position: relative; }
[data-tooltip]::after {
  content: attr(data-tooltip);  /* conținut din atribut! */
  position: absolute;
  bottom: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%);
  background: #2c3e50;
  color: white;
  padding: 6px 10px;
  border-radius: 4px;
  font-size: 0.85rem;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s;
  z-index: 10;
}
[data-tooltip]:hover::after { opacity: 1; }
[data-tooltip][data-tooltip-pos="bottom"]::after {
  bottom: auto; top: calc(100% + 8px);
}
\`\`\`

**State management UI fără framework:**
\`\`\`html
<div id="wizard" data-step="1" data-total-steps="4">
  <div data-step-panel="1">...</div>
  <div data-step-panel="2" hidden>...</div>
  <div data-step-panel="3" hidden>...</div>
  <div data-step-panel="4" hidden>...</div>

  <button id="prev" disabled>Înapoi</button>
  <button id="next">Înainte</button>
</div>
\`\`\`

\`\`\`javascript
const wizard = document.getElementById('wizard');

function setStep(step) {
  const total = parseInt(wizard.dataset.totalSteps);
  step = Math.max(1, Math.min(step, total));

  // Ascunde toate panourile
  wizard.querySelectorAll('[data-step-panel]').forEach(p => p.hidden = true);
  // Arată panoul curent
  wizard.querySelector(\`[data-step-panel="\${step}"]\`).hidden = false;
  // Actualizează data attribute
  wizard.dataset.step = step;

  document.getElementById('prev').disabled = step === 1;
  document.getElementById('next').disabled = step === total;
  document.getElementById('next').textContent = step === total ? 'Finalizează' : 'Înainte';
}

document.getElementById('next').onclick = () => setStep(parseInt(wizard.dataset.step) + 1);
document.getElementById('prev').onclick = () => setStep(parseInt(wizard.dataset.step) - 1);
\`\`\`

**CSS pe baza stării din data attributes:**
\`\`\`css
/* Stilizare bazată pe valoarea atributului */
[data-status="active"]   { color: #2ecc71; }
[data-status="pending"]  { color: #f39c12; }
[data-status="inactive"] { color: #e74c3c; }

[data-level="beginner"]     { border-left: 3px solid #2ecc71; }
[data-level="intermediate"] { border-left: 3px solid #f39c12; }
[data-level="advanced"]     { border-left: 3px solid #e74c3c; }

/* CSS counter cu data */
[data-count]::before { content: attr(data-count); /* afișează valoarea */ }
\`\`\`

• \`content: attr(data-tooltip)\` în CSS — afișează valoarea unui atribut direct fără JavaScript.
• Data attributes sunt ideale pentru "glue" între HTML și JS — evită ID-uri criptice sau class-uri funcționale.
• Paternul wizard/multi-step cu data-step e simplu și eficient fără Redux sau Zustand.
• Preferă \`hidden\` attribute în loc de \`display: none\` în JS — mai semantic și accesibil.` },

  { lesson: "28. Data Attributes, Microdata și Schema.org", title: "Schema.org și Structured Data", content: `**Schema.org** este un vocabular de metadate structurate recunoscut de Google, Bing, Yahoo și Yandex. Adăugat ca **JSON-LD**, îmbogățește rezultatele de căutare cu **rich snippets** — stele, prețuri, FAQ-uri, recenzii.

**JSON-LD — formatul recomandat:**
\`\`\`html
<!-- Articol de blog -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Ghid Complet HTML5",
  "image": "https://devzone.ro/og/html.jpg",
  "datePublished": "2024-01-15",
  "dateModified": "2024-01-20",
  "author": {
    "@type": "Person",
    "name": "Cristi Usatii",
    "url": "https://devzone.ro/autori/cristi"
  },
  "publisher": {
    "@type": "Organization",
    "name": "DevZone",
    "logo": { "@type": "ImageObject", "url": "https://devzone.ro/logo.png" }
  },
  "description": "Ghid HTML5 cu 35 lecții interactive.",
  "mainEntityOfPage": { "@type": "WebPage", "@id": "https://devzone.ro/cursuri/html" }
}
</script>
\`\`\`

**FAQ Schema — accordion în Google:**
\`\`\`html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Ce este HTML5?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "HTML5 este versiunea modernă a limbajului de marcare HTML, cu elemente semantice, multimedia nativă și API-uri avansate. A fost standardizat în 2014."
      }
    },
    {
      "@type": "Question",
      "name": "Cât durează să înveți HTML5?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Cu studiu dedicat 2-3 ore pe zi, poți însuși HTML5 de bază în 2-4 săptămâni. Cursul nostru acoperă tot în 35 de lecții interactive."
      }
    }
  ]
}
</script>
\`\`\`

**Course Schema — pentru platforme educaționale:**
\`\`\`html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "HTML5 Complet — 35 Lecții",
  "description": "Ghid complet HTML5 cu exemple practice, exerciții și proiecte.",
  "provider": {
    "@type": "Organization",
    "name": "DevZone",
    "sameAs": "https://devzone.ro"
  },
  "hasCourseInstance": {
    "@type": "CourseInstance",
    "courseMode": "online",
    "inLanguage": "ro"
  },
  "teaches": ["HTML5", "Semantic HTML", "Accesibilitate", "SEO"],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "342",
    "bestRating": "5"
  }
}
</script>
\`\`\`

**BreadcrumbList — breadcrumb în URL Google:**
\`\`\`html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Acasă", "item": "https://devzone.ro" },
    { "@type": "ListItem", "position": 2, "name": "Cursuri", "item": "https://devzone.ro/cursuri" },
    { "@type": "ListItem", "position": 3, "name": "HTML5", "item": "https://devzone.ro/cursuri/html" }
  ]
}
</script>
\`\`\`

**Tipuri Schema.org comune:**
\`\`\`
Article / BlogPosting    → articole (autor, dată, imagine)
FAQPage                  → FAQ (accordion în Google)
HowTo                    → tutoriale pas cu pas
Product                  → produse (stele, preț, stoc)
Recipe                   → rețete (ingrediente, timp, calorii)
LocalBusiness            → afaceri locale (adresă, ore)
BreadcrumbList           → breadcrumb vizibil în URL Google
Course                   → cursuri educaționale
Event                    → evenimente (data, locul)
Person                   → persoane (portfolio, biografie)
\`\`\`

• **Rich Test Tool**: search.google.com/test/rich-results — validare JSON-LD.
• JSON-LD poate fi în \`<head>\` sau \`<body>\` — Google acceptă ambele locații.
• Nu inventa sau falsifica date — Google penalizează pentru structured data misleading.
• **Microdata** și **RDFa** sunt alternative la JSON-LD — dar JSON-LD e formatul recomandat.` },

  { lesson: "28. Data Attributes, Microdata și Schema.org", title: "CSS Attribute Selectors cu Data Attributes", content: `**Selectori CSS de atribut** permit stilizarea elementelor bazată pe prezența sau valoarea atributelor — inclusiv data attributes. O tehnică puternică pentru stilizare condiționată fără clase extra.

**Tipuri de selectori de atribut:**
\`\`\`css
/* [attr] — elementul ARE atributul (indiferent de valoare) */
[data-tooltip] { cursor: help; }
[disabled]     { opacity: 0.5; cursor: not-allowed; }
[hidden]       { display: none; }

/* [attr="val"] — atribut cu valoare EXACTĂ */
[data-theme="dark"]    { background: #1a1a2e; color: white; }
[data-status="active"] { border-color: #2ecc71; }
[type="submit"]        { background: #3498db; }

/* [attr~="val"] — atribut conține VAL ca cuvânt separat (lista de cuvinte) */
[class~="card"]        { /* orice element cu clasa "card" */ }
[data-tags~="html"]    { /* data-tags="html css js" include "html" */ }

/* [attr|="val"] — atribut EGAL cu val sau începe cu val- */
[lang|="ro"]           { /* lang="ro" sau lang="ro-MD" */ }

/* [attr^="val"] — atribut ÎNCEPE cu val */
[href^="https://"]     { color: green; }
[href^="mailto:"]      { color: blue; }
[data-icon^="icon-"]   { width: 24px; height: 24px; }

/* [attr$="val"] — atribut SE TERMINĂ cu val */
[href$=".pdf"]         { content: " (PDF)"; }
[src$=".svg"]          { fill: currentColor; }
[data-action$="-delete"] { color: #e74c3c; }

/* [attr*="val"] — atribut CONȚINE val (oriunde) */
[href*="devzone.ro"]   { font-weight: bold; }
[class*="btn-"]        { padding: 8px 16px; border-radius: 4px; }
\`\`\`

**Stilizare prin data attributes în loc de clase:**
\`\`\`html
<!-- Tipuri de buton controlate prin data -->
<button data-variant="primary">Salvează</button>
<button data-variant="secondary">Anulează</button>
<button data-variant="danger">Șterge</button>

<button data-size="sm">Mic</button>
<button data-size="md">Mediu</button>
<button data-size="lg">Mare</button>
\`\`\`

\`\`\`css
button { padding: 8px 16px; border: none; border-radius: 4px; cursor: pointer; font-size: 1rem; }

[data-variant="primary"]   { background: #3498db; color: white; }
[data-variant="secondary"] { background: #ecf0f1; color: #2c3e50; }
[data-variant="danger"]    { background: #e74c3c; color: white; }

[data-size="sm"] { padding: 4px 10px; font-size: 0.85rem; }
[data-size="lg"] { padding: 12px 24px; font-size: 1.2rem; }
\`\`\`

**Indicatori vizuali automați:**
\`\`\`css
/* Iconița de fișier bazat pe extensie */
a[href$=".pdf"]::after  { content: " 📄"; }
a[href$=".zip"]::after  { content: " 📦"; }
a[href$=".doc"]::after  { content: " 📝"; }
a[href^="mailto:"]::after { content: " ✉️"; }
a[target="_blank"]::after { content: " ↗"; font-size: 0.7em; }

/* Status badge din data attribute */
[data-status]::before { content: attr(data-status); /* afișează valoarea */ padding: 2px 8px; border-radius: 12px; font-size: 0.75rem; }
[data-status="online"]::before  { background: #d4edda; color: #155724; }
[data-status="offline"]::before { background: #f8d7da; color: #721c24; }
[data-status="away"]::before    { background: #fff3cd; color: #856404; }

/* Tematizare prin data attribute pe body/root */
[data-theme="dark"]  { --bg: #1a1a2e; --text: #e0e0e0; --accent: #3498db; }
[data-theme="light"] { --bg: #ffffff; --text: #2c3e50; --accent: #2980b9; }
\`\`\`

**Selector combinat — specificitate:**
\`\`\`css
/* Specificitate: [attr] = (0,1,0) — la fel cu o clasă */
input[type="email"]          { border-color: #3498db; }
button[data-variant="primary"]:hover { filter: brightness(1.1); }
.card[data-featured="true"]  { border: 2px solid gold; }

/* Cascadă cu !important — evita, dar [attr] e mai specific decât element */
div[data-disabled]   { pointer-events: none; }  /* mai specific decât div */
\`\`\`

• \`content: attr(data-xxx)\` — afișează valoarea atributului în CSS (funcționează în \`::before\`/\`::after\`).
• Selectori de atribut sunt la fel de specifici ca clasele CSS — \`(0,1,0)\`.
• \`[attr*="val"]\` e cel mai puțin specific — poate da false positives pe texte lungi.
• Folosite cu CSS variables (\`--var\`), data attributes pot implementa theming complet fără JavaScript.` },

  // L29: Performance HTML
  { lesson: "29. Performance HTML — loading, defer, preload, lazy", title: "Scriptul JS și blocarea parse-ului", content: `Scripturile JavaScript **blochează parsarea HTML** implicit — browser-ul se oprește din procesarea documentului, descarcă scriptul și îl execută. Aceasta poate face paginile să apară goale secunde întregi.

**Comportamentul implicit (render-blocking):**
\`\`\`html
<!-- Browser-ul se oprește COMPLET la fiecare script fără atribute -->
<head>
  <script src="vendor.js"></script>   <!-- Pauza #1: 200ms -->
  <script src="analytics.js"></script> <!-- Pauza #2: 100ms -->
  <script src="app.js"></script>      <!-- Pauza #3: 300ms -->
</head>
<!-- HTML de sub aceste script-uri NU este procesat în timp ce se descarcă -->
\`\`\`

**Soluția \`defer\` — recomandat pentru scripturi proprii:**
\`\`\`html
<head>
  <!-- Descarcă în paralel cu parsarea HTML -->
  <!-- Execută DUPĂ ce tot HTML-ul e parsat, în ordinea declarată -->
  <script src="vendor.js" defer></script>
  <script src="app.js" defer></script>
</head>
<!-- HTML-ul se parsează normal în timp ce script-urile se descarcă -->
\`\`\`

**Soluția \`async\` — pentru script-uri independente:**
\`\`\`html
<head>
  <!-- Descarcă în paralel, execută IMEDIAT ce e gata (poate bloca!) -->
  <!-- Ordinea de execuție nu e garantată -->
  <script src="analytics.js" async></script>
  <script src="chatbot.js" async></script>
</head>
\`\`\`

**Diagrama comportamentelor:**
\`\`\`
Fără atribut (render-blocking):
  Parse HTML ──── STOP ──── Download ──── Execute ──── Continuă HTML

defer:
  Parse HTML ───────────────────────────────────────────────────── Finish
                  Download ─────────────────────── (Execute după finish)

async:
  Parse HTML ──────────────────────── (poate bloca) ──────────────
                  Download ──────────── Execute (imediat ce e gata)
\`\`\`

**\`type="module"\`** — implicit defer + strict mode:
\`\`\`html
<!-- ES Modules sunt implicit defer și rulează în strict mode -->
<script type="module" src="app.mjs"></script>
<script type="module">
  import { init } from './app.mjs';
  init();
</script>
\`\`\`

**Prioritizare cu Fetch Priority:**
\`\`\`html
<!-- Resursă critică — descarcă cât mai repede -->
<script src="critical.js" fetchpriority="high" defer></script>

<!-- Resursă noncritică — descarcă după altele -->
<script src="analytics.js" fetchpriority="low" async></script>
\`\`\`

**DOMContentLoaded vs load:**
\`\`\`javascript
// DOMContentLoaded: HTML parsat, fără imagini/CSS
document.addEventListener('DOMContentLoaded', () => {
  // Rulează după defer scripts
  initApp();
});

// load: tot s-a încărcat (imagini, CSS, fonturi)
window.addEventListener('load', () => {
  // Raritate — abia acum e "complet"
  hideLoadingSpinner();
});

// Fără event, scriptul rulează când e întâlnit în parsing
\`\`\`

• **Regula de aur**: \`defer\` pentru toate script-urile aplicației tale.
• \`async\` doar pentru script-uri complet independente (analytics, chatbot, A/B testing).
• Script-urile **inline** (fără src) nu pot fi defer sau async — pune-le la finalul body sau în \`DOMContentLoaded\`.
• \`type="module"\` este preferat față de \`defer\` — implică defer și adaugă scope izolat.` },

  { lesson: "29. Performance HTML — loading, defer, preload, lazy", title: "Resource Hints — preload, prefetch, preconnect", content: `**Resource hints** sunt directii pentru browser despre ce resurse va folosi în curând, permițând descărcarea anticipată și reducerea timpilor de așteptare.

**\`preconnect\`** — stabilește conexiunea în avans:
\`\`\`html
<!-- Stabilește TCP + TLS handshake anticipat (50-300ms economisiți) -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preconnect" href="https://api.devzone.ro">
<link rel="preconnect" href="https://cdn.devzone.ro">

<!-- dns-prefetch: mai puțin agresiv — doar DNS lookup -->
<link rel="dns-prefetch" href="https://www.google-analytics.com">
\`\`\`

**\`preload\`** — descarcă resurse critice imediat:
\`\`\`html
<!-- Imaginea hero (LCP) — preîncarcă cu prioritate înaltă -->
<link rel="preload" href="/images/hero.webp" as="image" type="image/webp">

<!-- Fontul principal — previne FOUT (Flash of Unstyled Text) -->
<link rel="preload" href="/fonts/Inter-Regular.woff2"
  as="font" type="font/woff2" crossorigin>

<!-- Script critic (după HTML, înainte de alte JS) -->
<link rel="preload" href="/js/critical.js" as="script">

<!-- CSS non-blocking cu preload trick -->
<link rel="preload" href="/css/non-critical.css" as="style"
  onload="this.onload=null;this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="/css/non-critical.css"></noscript>
\`\`\`

**Atribut \`as\` pentru preload:**
\`\`\`
as="script"   → JavaScript
as="style"    → CSS
as="image"    → imagini
as="font"     → fonturi (necesită crossorigin)
as="fetch"    → fetch/XHR API calls
as="document" → documente HTML (iframe)
as="audio"    → audio
as="video"    → video
as="track"    → WebVTT subtitles
as="worker"   → Web Workers
\`\`\`

**\`prefetch\`** — descarcă pentru navigare viitoare:
\`\`\`html
<!-- Pagina ce probabil o va vizita utilizatorul -->
<link rel="prefetch" href="/cursuri/css">
<link rel="prefetch" href="/cursuri/html/lectia-2">

<!-- Resurse probabile pe pagina următoare -->
<link rel="prefetch" href="/js/css-module.js" as="script">
<link rel="prefetch" href="/images/css-hero.webp" as="image">
\`\`\`

**\`modulepreload\`** — pentru ES Modules:
\`\`\`html
<!-- Preîncarcă modulul și dependențele sale -->
<link rel="modulepreload" href="/js/app.mjs">
<link rel="modulepreload" href="/js/utils.mjs">
<link rel="modulepreload" href="/js/router.mjs">
\`\`\`

**Prioritizare cu \`fetchpriority\`:**
\`\`\`html
<!-- Imagine LCP — prioritate maximă -->
<img src="hero.webp" fetchpriority="high" alt="Hero">

<!-- Imagini below-the-fold — prioritate redusă -->
<img src="card1.webp" fetchpriority="low" loading="lazy" alt="...">

<!-- Preload cu prioritate -->
<link rel="preload" href="hero.webp" as="image" fetchpriority="high">
\`\`\`

**Strategii combinate:**
\`\`\`html
<head>
  <!-- 1. Charset și viewport (primele!) -->
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- 2. Preconnect pentru resurse externe -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

  <!-- 3. Preload resurse critice (LCP image, font) -->
  <link rel="preload" href="/fonts/Inter.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="/images/hero.avif" as="image" fetchpriority="high">

  <!-- 4. CSS -->
  <link rel="stylesheet" href="/css/critical.css">

  <!-- 5. Scripts cu defer -->
  <script src="/js/app.js" defer></script>

  <!-- 6. Prefetch pagini probabile -->
  <link rel="prefetch" href="/cursuri">
</head>
\`\`\`

• **\`preload\` ≠ \`prefetch\`**: preload = resursa e necesară pe pagina curentă; prefetch = posibil pe pagina următoare.
• Supraîncărcarea cu preload-uri scade performanța — preloaded dar nefolosite sunt erori în Lighthouse.
• \`crossorigin\` pe preload de fonturi este obligatoriu — altfel fontul e descărcat de două ori.
• Chrome DevTools → Network → Priority coloanei arată impactul resource hints.` },

  { lesson: "29. Performance HTML — loading, defer, preload, lazy", title: "Lazy Loading — imagini și iframes", content: `**Lazy loading** amână încărcarea resurselor până când utilizatorul le va vedea — reduce banda consumată la încărcare și accelerează LCP (Largest Contentful Paint).

**\`loading="lazy"\` — nativ HTML5:**
\`\`\`html
<!-- Imagini below-the-fold -->
<img src="articol-1.jpg" alt="..." loading="lazy" width="800" height="600">
<img src="articol-2.jpg" alt="..." loading="lazy" width="800" height="600">

<!-- NICIODATĂ lazy pe imaginea LCP (primul conținut vizibil)! -->
<img src="hero.jpg" alt="Hero Banner" loading="eager" width="1200" height="600">

<!-- Iframe — YouTube, Maps -->
<iframe
  src="https://www.youtube.com/embed/VIDEO_ID"
  loading="lazy"
  title="Tutorial HTML"
  width="560" height="315"
></iframe>
\`\`\`

**Cum funcționează nativ:**
\`\`\`
Browser calculează threshold-ul (de obicei 1200px sub viewport)
Când imaginea intră în threshold → descarcă
Când imaginea intră în viewport → afișează

Fără width/height specificate: browser nu poate calcula layout-ul
→ CLS (Cumulative Layout Shift) — pagina "sare" la încărcarea imaginii
\`\`\`

**Dimensiuni obligatorii pentru lazy loading:**
\`\`\`html
<!-- CORECT: dimensiuni rezervă spațiu (aspect-ratio) -->
<img src="photo.jpg" alt="..." width="800" height="450" loading="lazy">

<!-- Sau: aspect-ratio cu CSS -->
<img src="photo.jpg" alt="..." style="aspect-ratio: 16/9; width: 100%;" loading="lazy">

<!-- GREȘIT: fără dimensiuni → CLS -->
<img src="photo.jpg" alt="..." loading="lazy">  <!-- ← evită! -->
\`\`\`

**IntersectionObserver — lazy loading custom:**
\`\`\`html
<!-- data-src în loc de src — imaginea nu se descarcă -->
<img
  data-src="photo.jpg"
  data-srcset="photo-400.webp 400w, photo-800.webp 800w"
  alt="Foto produs"
  width="800" height="600"
  class="lazy"
  src="/placeholder.svg"  <!-- imagine placeholder minimă -->
>
\`\`\`

\`\`\`javascript
const lazyImages = document.querySelectorAll('img.lazy');

const imageObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      if (img.dataset.srcset) img.srcset = img.dataset.srcset;
      img.classList.remove('lazy');
      img.classList.add('loaded');
      imageObserver.unobserve(img);
    }
  });
}, {
  rootMargin: '200px 0px',  // start loading 200px înainte de viewport
  threshold: 0.1
});

lazyImages.forEach(img => imageObserver.observe(img));
\`\`\`

**Lazy loading video:**
\`\`\`html
<!-- Video cu poster, fără src — încarcă manual la click -->
<div class="video-facade" data-video-id="abc123" onclick="loadVideo(this)">
  <img src="https://img.youtube.com/vi/abc123/maxresdefault.jpg"
    alt="Thumbnail tutorial HTML"
    width="560" height="315">
  <button class="play-btn" aria-label="Redă videoclipul tutorial HTML">
    ▶
  </button>
</div>
\`\`\`
\`\`\`javascript
function loadVideo(facade) {
  const id = facade.dataset.videoId;
  facade.outerHTML = \`<iframe
    src="https://www.youtube.com/embed/\${id}?autoplay=1"
    width="560" height="315"
    title="Tutorial HTML"
    allow="autoplay; encrypted-media"
    allowfullscreen
  ></iframe>\`;
}
\`\`\`

**CSS pentru tranziție imagine la încărcare:**
\`\`\`css
img.lazy { opacity: 0; transition: opacity 0.3s; }
img.loaded { opacity: 1; }

/* Placeholder blur-up (LQIP — Low Quality Image Placeholder) */
.lazy-container {
  background-image: url('placeholder-blur.jpg');
  background-size: cover;
}
.lazy-container img { width: 100%; height: 100%; object-fit: cover; }
\`\`\`

• \`loading="lazy"\` este suportat nativ în toate browserele moderne — nu e nevoie de polyfill.
• **NICIODATĂ** lazy pe imaginile above-the-fold (header, hero) — acelea trebuie să se încarce cât mai repede.
• YouTube facade pattern economisește ~500KB per video neafișat — critică pentru pagini cu multiple videos.
• IntersectionObserver e mai eficient decât evenimentul \`scroll\` — nu blochează thread-ul principal.` },

  { lesson: "29. Performance HTML — loading, defer, preload, lazy", title: "Core Web Vitals și Optimizare HTML", content: `**Core Web Vitals** sunt metrici Google pentru calitatea experienței utilizatorilor. Afectează direct ranking-ul în căutare și experiența reală pe site.

**Cele 3 Core Web Vitals:**
\`\`\`
LCP — Largest Contentful Paint (încărcarea)
  Măsoară: cât durează să apară cel mai mare element vizibil
  Obiectiv: sub 2.5 secunde
  Elementele LCP: imagine hero, banner, heading principal cu font mare

CLS — Cumulative Layout Shift (stabilitate vizuală)
  Măsoară: cât "sare" conținutul în timp ce se încarcă
  Obiectiv: sub 0.1
  Cauze: imagini fără dimensiuni, conținut injectat, webfonturi

INP — Interaction to Next Paint (interactivitate)
  Măsoară: cât durează răspunsul la click/tap/tastă
  Obiectiv: sub 200ms
  Cauze: JavaScript lung, main thread blocat
\`\`\`

**Optimizare LCP:**
\`\`\`html
<!-- 1. Preload imaginea LCP -->
<link rel="preload" href="/images/hero.avif" as="image" type="image/avif" fetchpriority="high">
<link rel="preload" href="/images/hero.webp" as="image" type="image/webp" fetchpriority="high">

<!-- 2. Imagine hero cu format modern și loading="eager" (nu lazy!) -->
<picture>
  <source srcset="/images/hero.avif" type="image/avif">
  <source srcset="/images/hero.webp" type="image/webp">
  <img src="/images/hero.jpg" alt="DevZone Hero"
    width="1200" height="600"
    loading="eager"
    fetchpriority="high"
    decoding="async">
</picture>

<!-- 3. Evita fonts care blochează LCP -->
<style>
  @font-face {
    font-family: 'Inter';
    font-display: swap;  /* arată text imediat, swap la font real */
    src: url('/fonts/Inter.woff2') format('woff2');
  }
</style>
\`\`\`

**Eliminarea CLS:**
\`\`\`html
<!-- MEREU dimensiuni pe img, video, iframe -->
<img src="photo.jpg" alt="..." width="800" height="450">
<video width="560" height="315">...</video>
<iframe width="560" height="315" title="..."></iframe>

<!-- Aspect ratio în CSS (responsive) -->
<img src="photo.jpg" alt="..." style="width:100%; aspect-ratio: 16/9; object-fit:cover;">

<!-- Rezervă spațiu pentru conținut dinamic (ads, banners) -->
<div style="min-height: 250px;">
  <!-- Ad se va încărca aici -->
</div>

<!-- Evita inserting content above existing content -->
<div id="cookie-banner" style="position: fixed; bottom: 0;">
  <!-- Îl afișezi jos, nu deasupra conținutului -->
</div>
\`\`\`

**Optimizare INP:**
\`\`\`html
<!-- Scripts care nu blochează main thread -->
<script src="heavy-script.js" defer></script>

<!-- Web Worker pentru calcule intensive -->
<script>
  const worker = new Worker('/js/heavy-computation.js');
  worker.onmessage = (e) => updateUI(e.data);
  worker.postMessage({ data: 'large dataset' });
</script>
\`\`\`

**Checklist HTML pentru Core Web Vitals:**
\`\`\`
LCP:
  ✓ Preload imaginea hero cu fetchpriority="high"
  ✓ loading="eager" pe imaginile above-the-fold
  ✓ Format modern (AVIF/WebP)
  ✓ font-display: swap pe @font-face
  ✓ Preconnect pentru CDN-uri externe

CLS:
  ✓ width + height pe toate <img>, <video>, <iframe>
  ✓ aspect-ratio CSS pe elemente fluide
  ✓ Spațiu rezervat pentru conținut dinamic
  ✓ Nu inserați conținut deasupra celui existent
  ✓ transform: translate în loc de schimbări de position

INP:
  ✓ defer/async pe toate script-urile
  ✓ Event handlers ușori (< 50ms)
  ✓ Lazy loading componente grele
\`\`\`

**Măsurare:**
\`\`\`
PageSpeed Insights → google.com/pagespeed/insights
Chrome DevTools → Lighthouse → Performance
Chrome DevTools → Performance → Core Web Vitals badge
Google Search Console → Core Web Vitals report (date reale)
\`\`\`

• CLS cel mai ușor de rezolvat: adaugă \`width\` și \`height\` pe toate imaginile.
• LCP imagine fără preload poate fi 40-60% din total load time — preload-ul îl reduce dramatic.
• \`font-display: swap\` — text vizibil imediat cu font fallback, swap la font real când e gata.
• Google foloseste Core Web Vitals ca factor de ranking din mai 2021 — nu e optional.` },

  // L30: Mini Proiect HTML — Portfolio Complet
  { lesson: "30. Mini Proiect HTML — Portfolio Complet", title: "Open Graph și Social Media Cards", content: `**Open Graph** și **Twitter Cards** controlează cum apare link-ul portfolio-ului tău când îl distribui pe LinkedIn, Twitter/X, WhatsApp sau Discord — cruciale pentru impresie profesională.

**Open Graph complet pentru portfolio:**
\`\`\`html
<head>
  <!-- Open Graph essentials -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://cristi.dev">
  <meta property="og:title" content="Cristi Usatii — Web Developer & Designer">
  <meta property="og:description" content="Portfolio profesional Cristi Usatii. Frontend developer cu 3 ani experiență în React, Next.js și design system-uri.">
  <meta property="og:image" content="https://cristi.dev/og-image.jpg">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="Cristi Usatii — Web Developer">
  <meta property="og:site_name" content="Cristi Usatii Portfolio">
  <meta property="og:locale" content="ro_RO">

  <!-- Twitter/X Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:site" content="@cristi_dev">
  <meta name="twitter:creator" content="@cristi_dev">
  <meta name="twitter:title" content="Cristi Usatii — Web Developer & Designer">
  <meta name="twitter:description" content="Frontend developer cu expertiță în React, Next.js și TypeScript.">
  <meta name="twitter:image" content="https://cristi.dev/og-image.jpg">
  <meta name="twitter:image:alt" content="Preview portfolio Cristi Usatii">

  <!-- LinkedIn specific (folosește OG standard, dar verifică) -->
  <!-- profile:first_name și profile:last_name pentru LinkedIn -->
  <meta property="profile:first_name" content="Cristi">
  <meta property="profile:last_name" content="Usatii">
</head>
\`\`\`

**Imaginea OG — specificații pentru portfolio:**
\`\`\`
Dimensiune: 1200 × 630 px (ratio 1.91:1)
Format: JPEG sau PNG (JPEG e mai mic)
Size: sub 300KB (compresie agresivă ok)

Conținut recomandat pentru OG imagine portfolio:
  • Fotografia ta (profesională)
  • Numele tău mare, lizibil
  • Titlul/rolul (Frontend Developer)
  • Background simplu sau brand color
  • Logo sau site URL discret
\`\`\`

**Generare OG image cu HTML/CSS (Next.js og image sau Vercel OG):**
\`\`\`html
<!-- Template HTML pentru generare OG image automată -->
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body {
      margin: 0; width: 1200px; height: 630px;
      background: linear-gradient(135deg, #2c3e50 0%, #3498db 100%);
      font-family: Inter, sans-serif;
      display: flex; align-items: center;
    }
    .content { padding: 60px; color: white; flex: 1; }
    .name { font-size: 72px; font-weight: 700; line-height: 1.1; margin-bottom: 20px; }
    .role { font-size: 36px; opacity: 0.9; margin-bottom: 40px; }
    .tags { display: flex; gap: 12px; flex-wrap: wrap; }
    .tag { padding: 8px 20px; background: rgba(255,255,255,0.2); border-radius: 20px; font-size: 24px; }
    img { width: 280px; height: 280px; border-radius: 50%; margin: 0 60px; object-fit: cover; border: 8px solid rgba(255,255,255,0.3); }
  </style>
</head>
<body>
  <div class="content">
    <div class="name">Cristi Usatii</div>
    <div class="role">Web Developer & Designer</div>
    <div class="tags">
      <span class="tag">React</span>
      <span class="tag">Next.js</span>
      <span class="tag">TypeScript</span>
    </div>
  </div>
  <img src="avatar.jpg" alt="Cristi">
</body>
</html>
\`\`\`

**Verificare cu debuggere:**
\`\`\`
Facebook:  developers.facebook.com/tools/debug
Twitter:   cards-dev.twitter.com/validator
LinkedIn:  linkedin.com/post-inspector
Discord:   partajează link-ul în DM cu tine însuți
WhatsApp:  trimite link, apasă mai mult pentru preview
\`\`\`

**Canonical și alternate pentru portfolio multilingv:**
\`\`\`html
<link rel="canonical" href="https://cristi.dev">
<link rel="alternate" hreflang="ro" href="https://cristi.dev/ro">
<link rel="alternate" hreflang="en" href="https://cristi.dev/en">
<link rel="alternate" hreflang="x-default" href="https://cristi.dev">
\`\`\`

• Platformele cachează OG data — după update, forțează re-scraping cu debugger-ul.
• \`og:image\` cu URL relativ NU funcționează — mereu URL absolut cu https.
• Testează pe mobile (WhatsApp) și desktop (Discord) — preview-ul diferă.
• LinkedIn ignoră \`twitter:*\` tags — asigură-te că \`og:*\` sunt complete.` },

  { lesson: "30. Mini Proiect HTML — Portfolio Complet", title: "Formularul de Contact Accesibil", content: `Un **formular de contact accesibil** pentru portfolio combina validare HTML5, ARIA, feedback vizual și UX bun — esențial pentru potențialii angajatori/clienți.

**Formular de contact complet:**
\`\`\`html
<section id="contact" aria-labelledby="contact-heading">
  <h2 id="contact-heading">Contactează-mă</h2>
  <p>Disponibil pentru proiecte freelance și full-time. Răspund în 24h.</p>

  <form id="contact-form" action="/api/contact" method="POST" novalidate
    aria-label="Formular de contact">

    <div class="form-row">
      <div class="form-group">
        <label for="contact-name">
          Nume <abbr title="câmp obligatoriu" aria-hidden="true">*</abbr>
        </label>
        <input type="text" id="contact-name" name="name"
          required minlength="2" maxlength="100"
          autocomplete="name"
          placeholder="Ex: Ion Popescu"
          aria-required="true"
          aria-describedby="name-error">
        <span id="name-error" class="field-error" role="alert" aria-live="polite"></span>
      </div>

      <div class="form-group">
        <label for="contact-email">
          Email <abbr title="câmp obligatoriu" aria-hidden="true">*</abbr>
        </label>
        <input type="email" id="contact-email" name="email"
          required
          autocomplete="email"
          placeholder="email@exemplu.ro"
          aria-required="true"
          aria-describedby="email-hint email-error">
        <p id="email-hint" class="field-hint">Voi folosi emailul doar pentru răspuns.</p>
        <span id="email-error" class="field-error" role="alert" aria-live="polite"></span>
      </div>
    </div>

    <div class="form-group">
      <label for="contact-budget">
        Buget estimat
      </label>
      <select id="contact-budget" name="budget" autocomplete="off">
        <option value="">-- Selectează bugetul --</option>
        <option value="sub-1000">Sub 1.000 lei</option>
        <option value="1000-5000">1.000 — 5.000 lei</option>
        <option value="5000-15000">5.000 — 15.000 lei</option>
        <option value="peste-15000">Peste 15.000 lei</option>
        <option value="angajare">Angajare full-time</option>
      </select>
    </div>

    <div class="form-group">
      <label for="contact-subject">
        Subiect <abbr title="câmp obligatoriu" aria-hidden="true">*</abbr>
      </label>
      <input type="text" id="contact-subject" name="subject"
        required minlength="5" maxlength="200"
        placeholder="Scurtă descriere a proiectului"
        aria-required="true"
        aria-describedby="subject-error">
      <span id="subject-error" class="field-error" role="alert" aria-live="polite"></span>
    </div>

    <div class="form-group">
      <label for="contact-message">
        Mesaj <abbr title="câmp obligatoriu" aria-hidden="true">*</abbr>
      </label>
      <textarea id="contact-message" name="message"
        required minlength="20" maxlength="2000"
        rows="6"
        placeholder="Descrie proiectul, timeline-ul și orice detalii relevante..."
        aria-required="true"
        aria-describedby="message-hint message-error"></textarea>
      <p id="message-hint" class="field-hint">
        <span id="char-count">0</span>/2000 caractere
      </p>
      <span id="message-error" class="field-error" role="alert" aria-live="polite"></span>
    </div>

    <div class="form-group">
      <label>
        <input type="checkbox" name="newsletter" value="1">
        Abonează-mă la newsletter-ul tău lunar
      </label>
    </div>

    <div class="form-actions">
      <button type="submit" id="submit-btn">
        <span class="btn-text">Trimite mesajul</span>
        <span class="btn-loading" hidden aria-hidden="true">Se trimite...</span>
      </button>
    </div>

    <div id="form-success" role="alert" aria-live="polite" hidden>
      ✓ Mesajul a fost trimis cu succes! Te voi contacta în 24 de ore.
    </div>
  </form>
</section>
\`\`\`

\`\`\`javascript
const form = document.getElementById('contact-form');
const textarea = document.getElementById('contact-message');
const charCount = document.getElementById('char-count');

// Character counter
textarea.addEventListener('input', () => {
  charCount.textContent = textarea.value.length;
  charCount.parentElement.style.color = textarea.value.length > 1800 ? '#e74c3c' : '';
});

// Validare la submit
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (!validateForm()) return;

  const btn = document.getElementById('submit-btn');
  btn.querySelector('.btn-text').hidden = true;
  btn.querySelector('.btn-loading').hidden = false;
  btn.disabled = true;

  try {
    const res = await fetch('/api/contact', {
      method: 'POST',
      body: new FormData(form)
    });
    if (res.ok) {
      form.hidden = true;
      document.getElementById('form-success').hidden = false;
    }
  } catch (err) {
    alert('Eroare la trimitere. Încearcă din nou sau contactează-mă pe email.');
  } finally {
    btn.querySelector('.btn-text').hidden = false;
    btn.querySelector('.btn-loading').hidden = true;
    btn.disabled = false;
  }
});
\`\`\`

• **\`role="alert"\` + \`aria-live="polite"\`** pe span-urile de eroare — screen reader citește eroarea automat.
• **\`novalidate\`** + validare JS custom → control total asupra UX-ului de erori.
• **\`aria-describedby\`** leagă câmpul de hint-uri și erori — accesibil pentru screen readere.
• Loading state pe buton previne submit-uri multiple (double-click).` },

  { lesson: "30. Mini Proiect HTML — Portfolio Complet", title: "Schema.org PersonalPortfolio și Final Checklist", content: `**Schema.org** pentru portfolio personal + checklist final cu toate optimizările necesare înainte de lansare.

**Schema.org Person + WebSite:**
\`\`\`html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://cristi.dev/#person",
  "name": "Cristi Usatii",
  "alternateName": "Cristian Usatii",
  "jobTitle": "Frontend Web Developer",
  "description": "Frontend developer specializat în React, Next.js și design system-uri. Disponibil pentru proiecte freelance.",
  "url": "https://cristi.dev",
  "image": "https://cristi.dev/images/cristi-avatar.jpg",
  "email": "cristiusa98@gmail.com",
  "telephone": "+40 721 000 000",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "București",
    "addressCountry": "RO"
  },
  "sameAs": [
    "https://github.com/Usatii-Cristian",
    "https://linkedin.com/in/cristi-usatii",
    "https://twitter.com/cristi_dev"
  ],
  "knowsAbout": ["HTML5", "CSS3", "JavaScript", "React", "Next.js", "TypeScript", "Tailwind CSS"],
  "alumniOf": {
    "@type": "Organization",
    "name": "Universitatea Politehnica București"
  }
}
</script>

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://cristi.dev/#website",
  "name": "Cristi Usatii Portfolio",
  "url": "https://cristi.dev",
  "description": "Portfolio profesional Cristi Usatii — Frontend Developer",
  "author": { "@id": "https://cristi.dev/#person" },
  "inLanguage": "ro",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://cristi.dev/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}
</script>
\`\`\`

**Schema.org pentru proiecte (CreativeWork):**
\`\`\`html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Proiectele mele",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "item": {
        "@type": "SoftwareApplication",
        "name": "DevZone Platform",
        "description": "Platformă interactivă de cursuri web în română.",
        "url": "https://devzone.ro",
        "author": { "@id": "https://cristi.dev/#person" },
        "applicationCategory": "WebApplication",
        "operatingSystem": "Web Browser"
      }
    }
  ]
}
</script>
\`\`\`

**Final Checklist — Portfolio HTML:**
\`\`\`
HTML & SEMANTICĂ:
  ✓ DOCTYPE html și html lang="ro"
  ✓ Un singur h1 pe pagină
  ✓ Ierarhie heading-uri logică (h1 → h2 → h3)
  ✓ Elemente semantice: header, nav, main, section, article, footer
  ✓ Skip link ca primul element în body
  ✓ HTML valid (validator.w3.org) — zero erori

ACCESIBILITATE:
  ✓ Toate imaginile cu alt descriptiv
  ✓ Toate câmpurile cu label asociat
  ✓ Focus vizibil pe toate elementele interactive
  ✓ Contrast suficient (4.5:1 minim)
  ✓ Navigare completă cu Tab
  ✓ WAVE/axe — zero erori critice

SEO:
  ✓ Title unic, max 60 caractere
  ✓ Meta description, 50-160 caractere
  ✓ Canonical URL
  ✓ Open Graph complete (title, description, image)
  ✓ Twitter Card
  ✓ Schema.org Person (JSON-LD)

PERFORMANCE:
  ✓ Imagini cu width + height (anti-CLS)
  ✓ Loading="lazy" pe imagini below-the-fold
  ✓ Preload imaginea hero
  ✓ Scripts cu defer
  ✓ Format WebP/AVIF pentru imagini
  ✓ Lighthouse Performance ≥ 90

PWA READY (opțional):
  ✓ Favicon SVG
  ✓ Apple-touch-icon
  ✓ Meta theme-color
  ✓ Web App Manifest (site.webmanifest)
\`\`\`

**Testare cross-browser:**
\`\`\`
Chrome (Chromium) → principal
Firefox           → testare secundară
Safari (macOS/iOS) → critic pentru iOS
Edge              → automată (Chromium)

DevTools → Device Toolbar → iPhone 14, Pixel 7, Samsung Galaxy S23
\`\`\`

• \`sameAs\` în Schema.org Person leagă identitatea ta digitală — ajuta Google Knowledge Panel.
• Schema.org nu adaugă text vizibil — e doar pentru motoarele de căutare și crawlere.
• Rulează Rich Results Test înainte de lansare pentru a verifica că JSON-LD e valid.
• Un portfolio cu toate optimizările de mai sus va performa excelent la interviurile tehnice.` },

  // L34: Custom Protocols
  { lesson: "34. Custom Protocols si URL Schemes (mailto, tel, deep links)", title: "sms: si FaceTime — scheme pentru comunicatie", content: `**Schemele de comunicare** (\`sms:\`, \`facetime:\`, \`facetime-audio:\`) deschid aplicații native de mesagerie direct din browser — utile pentru site-uri mobile și de business.

**Schema \`sms:\`:**
\`\`\`html
<!-- SMS simplu -->
<a href="sms:+40721000000">Trimite SMS</a>

<!-- SMS cu text predefinit (body) -->
<a href="sms:+40721000000?body=Salut%2C%20vreau%20mai%20multe%20detalii">
  Contactează prin SMS
</a>

<!-- SMS multipli destinatari (iOS) -->
<a href="sms:+40721000000,+40722000000?body=Mesaj%20grup">
  SMS grup
</a>

<!-- SMS fără număr (utilizatorul alege) -->
<a href="sms:?body=Vreau%20sa%20ma%20abonez%20la%20newsletter">
  Abonează-mă prin SMS
</a>
\`\`\`

**Schema \`facetime:\` (iOS/macOS):**
\`\`\`html
<!-- FaceTime video call -->
<a href="facetime:+40721000000">Sună pe FaceTime</a>
<a href="facetime:cristi@devzone.ro">FaceTime cu email</a>

<!-- FaceTime audio (ca un apel telefonic) -->
<a href="facetime-audio:+40721000000">Apel audio FaceTime</a>
<a href="facetime-audio:cristi@devzone.ro">Audio FaceTime email</a>
\`\`\`

**Schema \`whatsapp:\`:**
\`\`\`html
<!-- WhatsApp cu text (prin API open.whatsapp.com) -->
<a href="https://wa.me/40721000000?text=Salut%2C%20vreau%20mai%20multe%20informatii"
   target="_blank" rel="noopener noreferrer">
  Scrie pe WhatsApp
</a>

<!-- Fără număr — utilizatorul alege contactul -->
<a href="https://wa.me/?text=Am%20gasit%20acest%20link%20interesant%3A%20https%3A%2F%2Fdevzone.ro"
   target="_blank" rel="noopener noreferrer">
  Distribuie pe WhatsApp
</a>
\`\`\`

**Schema \`telegram:\`:**
\`\`\`html
<!-- Telegram chat cu username -->
<a href="https://t.me/devzone_ro">Canal Telegram</a>
<a href="https://t.me/cristi_dev">Chat Telegram</a>

<!-- Distribuire link -->
<a href="https://t.me/share/url?url=https://devzone.ro&text=Cursuri%20web%20în%20română"
   target="_blank" rel="noopener noreferrer">
  Distribuie pe Telegram
</a>
\`\`\`

**Detectare suport și fallback:**
\`\`\`javascript
// Detectare iOS pentru FaceTime
function isIOS() {
  return /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
}

function showCommunicationOptions() {
  const container = document.getElementById('contact-options');

  if (isIOS()) {
    container.innerHTML += \`
      <a href="facetime:+40721000000" class="btn">FaceTime</a>
      <a href="facetime-audio:+40721000000" class="btn">Audio FaceTime</a>
    \`;
  }

  // WhatsApp - universal
  container.innerHTML += \`
    <a href="https://wa.me/40721000000" target="_blank" rel="noopener" class="btn">WhatsApp</a>
    <a href="sms:+40721000000" class="btn">SMS</a>
  \`;
}
\`\`\`

**Click-to-communicate pentru afaceri:**
\`\`\`html
<section class="contact-cta">
  <h2>Contactează-ne rapid</h2>
  <div class="contact-methods">
    <a href="tel:+40212345678" class="contact-btn phone">
      <svg aria-hidden="true">...</svg> Sună
    </a>
    <a href="sms:+40212345678?body=Doresc%20informatii%20despre%20servicii" class="contact-btn sms">
      <svg aria-hidden="true">...</svg> SMS
    </a>
    <a href="mailto:office@devzone.ro" class="contact-btn email">
      <svg aria-hidden="true">...</svg> Email
    </a>
    <a href="https://wa.me/40212345678" target="_blank" rel="noopener" class="contact-btn whatsapp">
      <svg aria-hidden="true">...</svg> WhatsApp
    </a>
  </div>
</section>
\`\`\`

• \`sms:\` este suportat pe Android și iOS — funcționează în Chrome Mobile și Safari.
• \`facetime:\` funcționează DOAR pe dispozitive Apple (iPhone, iPad, Mac cu FaceTime).
• Numărul de telefon în schema \`sms:\` și \`tel:\` — format internațional (+40...) recomandat.
• Conținutul \`?body=\` trebuie URL encoded (\`%20\` pentru spații, \`%2C\` pentru virgulă).
• Testează pe dispozitive reale — emulatoarele nu deschid aplicații native.` },

  // L35: Newsletter Template
  { lesson: "35. Mini Proiect HTML — Newsletter Template Profesional", title: "Planificarea si structura template-ului de newsletter", content: `Un **template de newsletter profesional** este construit complet diferit față de HTML web modern — trebuie să funcționeze în Outlook 2007-2021, Gmail, Apple Mail, Yahoo și pe mobile.

**Regulile de aur pentru HTML Email:**
\`\`\`
1. LAYOUT: Table-based (nu Flexbox, nu Grid — Outlook nu le suportă)
2. CSS: Inline (nu extern, nu în <style> — Gmail ignoră <style>)
3. IMAGINI: Absolute URL-uri + alt text pentru toate
4. FONTURI: Web safe fonts (Arial, Georgia, Verdana) sau web fonts cu fallback
5. LĂȚIME: Max 600-700px (email clients adaugă padding)
6. TEST: Testează în Litmus sau Email on Acid înainte de trimitere
\`\`\`

**Structura de bază a unui newsletter:**
\`\`\`html
<!DOCTYPE html>
<html lang="ro" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="x-apple-disable-message-reformatting">
  <title>Newsletter DevZone — Ianuarie 2024</title>
  <!--[if mso]>
  <noscript><xml><o:OfficeDocumentSettings>
    <o:PixelsPerInch>96</o:PixelsPerInch>
  </o:OfficeDocumentSettings></xml></noscript>
  <![endif]-->
  <style>
    /* Client-specific resets */
    body { margin: 0; padding: 0; background-color: #f4f4f4; }
    table, td { border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0; }
    img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
    /* Dark mode */
    @media (prefers-color-scheme: dark) {
      .email-bg { background-color: #1a1a2e !important; }
      .email-content { background-color: #2c3e50 !important; }
      .text-dark { color: #e0e0e0 !important; }
    }
    /* Mobile */
    @media only screen and (max-width: 600px) {
      .email-container { width: 100% !important; }
      .col-full { display: block !important; width: 100% !important; }
      .hide-mobile { display: none !important; }
    }
  </style>
</head>
<body>

<!-- Preheader (afișat în inbox înainte de a deschide emailul) -->
<div style="display: none; max-height: 0; overflow: hidden; mso-hide: all;">
  Ce e nou pe DevZone în ianuarie: 5 cursuri noi, 200 exerciții actualizate și noul modul React Avansat. &#847; &zwnj; &nbsp; &#847; &zwnj;
</div>

<!-- Email wrapper -->
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" class="email-bg"
  style="background-color: #f4f4f4; min-height: 100vh;">
  <tr>
    <td align="center" valign="top" style="padding: 20px 0;">

      <!-- Email container — max 600px -->
      <table role="presentation" class="email-container email-content"
        style="max-width: 600px; width: 100%; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">

        <!-- HEADER -->
        <tr>
          <td style="background: #2c3e50; padding: 24px 32px; text-align: center;">
            <img src="https://devzone.ro/email/logo-white.png"
              alt="DevZone" width="160" height="40"
              style="display: block; margin: 0 auto;">
          </td>
        </tr>

        <!-- HERO SECTION -->
        <tr>
          <td style="padding: 0;">
            <img src="https://devzone.ro/email/newsletter-jan-2024.jpg"
              alt="Newsletter DevZone — Ianuarie 2024"
              width="600" height="300"
              style="display: block; width: 100%; max-width: 600px; height: auto;">
          </td>
        </tr>

        <!-- INTRO TEXT -->
        <tr>
          <td style="padding: 32px 40px 24px;">
            <h1 style="margin: 0 0 16px; font-family: Georgia, serif; font-size: 28px; line-height: 1.3; color: #2c3e50;">
              Ce e nou pe DevZone în Ianuarie 2024
            </h1>
            <p style="margin: 0; font-family: Arial, sans-serif; font-size: 16px; line-height: 1.6; color: #555555;">
              Salut, Cristi! 👋 Luna aceasta aduce cursuri noi, exerciții actualizate și o surpriză pentru abonații Pro.
            </p>
          </td>
        </tr>

        <!-- SEPARATOR -->
        <tr>
          <td style="padding: 0 40px;">
            <hr style="border: none; border-top: 1px solid #eee; margin: 0;">
          </td>
        </tr>

        <!-- FEATURE ROW — 2 coloane -->
        <tr>
          <td style="padding: 24px 40px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td class="col-full" style="width: 50%; vertical-align: top; padding-right: 16px;">
                  <img src="https://devzone.ro/email/react-icon.png"
                    alt="React" width="48" height="48">
                  <h2 style="font-family: Arial, sans-serif; font-size: 18px; color: #2c3e50; margin: 12px 0 8px;">
                    React Avansat
                  </h2>
                  <p style="font-family: Arial, sans-serif; font-size: 14px; color: #666; line-height: 1.5; margin: 0 0 16px;">
                    Hooks avansate, Context, Suspense și Server Components.
                  </p>
                  <a href="https://devzone.ro/cursuri/react-avansat?utm_source=newsletter&utm_medium=email&utm_campaign=jan2024"
                    style="display: inline-block; padding: 10px 20px; background: #3498db; color: white; text-decoration: none; border-radius: 4px; font-family: Arial, sans-serif; font-size: 14px; font-weight: bold;">
                    Vezi cursul
                  </a>
                </td>
                <td class="col-full" style="width: 50%; vertical-align: top;">
                  <!-- similar pentru al doilea feature -->
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- CTA BUTTON -->
        <tr>
          <td style="padding: 24px 40px; text-align: center;">
            <!--[if mso]>
            <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" href="https://devzone.ro?utm_source=newsletter" style="height:50px;v-text-anchor:middle;width:200px;" arcsize="8%" fill="true" fillcolor="#3498db" stroke="false">
              <w:anchorlock/>
              <center style="color: white; font-family: Arial; font-size: 16px; font-weight: bold;">
                Explorează DevZone
              </center>
            </v:roundrect>
            <![endif]-->
            <!--[if !mso]><!-->
            <a href="https://devzone.ro?utm_source=newsletter&utm_medium=email&utm_campaign=jan2024"
              style="display: inline-block; padding: 16px 32px; background: #3498db; color: white; text-decoration: none; border-radius: 6px; font-family: Arial, sans-serif; font-size: 16px; font-weight: bold;">
              Explorează DevZone
            </a>
            <!--<![endif]-->
          </td>
        </tr>

        <!-- FOOTER -->
        <tr>
          <td style="background: #f8f9fa; padding: 24px 40px; text-align: center; border-top: 1px solid #eee;">
            <p style="margin: 0 0 8px; font-family: Arial, sans-serif; font-size: 12px; color: #999; line-height: 1.5;">
              Primești acest email deoarece ești abonat la DevZone Newsletter.<br>
              <a href="https://devzone.ro/unsubscribe?token={{TOKEN}}"
                style="color: #3498db; text-decoration: underline;">Dezabonează-te</a> |
              <a href="https://devzone.ro/newsletter/jan-2024"
                style="color: #3498db; text-decoration: underline;">Versiunea web</a>
            </p>
            <p style="margin: 0; font-family: Arial, sans-serif; font-size: 12px; color: #bbb;">
              DevZone SRL · Str. Exemplu 10 · București, 010001 · România
            </p>
          </td>
        </tr>

      </table>

    </td>
  </tr>
</table>

</body>
</html>
\`\`\`

**Preheader text** — afișat în inbox sub subiect:
\`\`\`
Preheader-ul adaugă context în inbox fără a ocupa spațiu în email.
Max 90 caractere vizibile. &zwnj; și &nbsp; umplu spațiu invizibil
pentru a preveni afișarea de conținut nedorit după preheader.
\`\`\`

**VML pentru butoane rotunjite în Outlook:**
\`\`\`
Outlook 2007-2021 nu suportă border-radius pe <a>.
Soluție: VML (Vector Markup Language) wrapping pentru Outlook,
cu fallback pentru restul clienților cu conditional comments.
\`\`\`

• Testează MEREU în Litmus (litmus.com) sau Email on Acid înainte de trimitere.
• \`utm_source=newsletter\` pe toate link-urile — tracking în Google Analytics.
• Un token de dezabonare unic per subscriber este **obligatoriu legal** (GDPR, CAN-SPAM).
• Platfomele ESPs (Mailchimp, Brevo, SendGrid) au template editor-e vizuale — HTML manual e pentru control maxim.` },
];

async function main() {
  let updated = 0, notFound = 0;
  for (const item of UPDATES) {
    const lessons = await p.lesson.findMany({ where: { title: item.lesson, module: { slug: "html" } } });
    if (!lessons.length) { console.log("! Lec: " + item.lesson); notFound++; continue; }
    const theory = await p.theory.findFirst({ where: { title: item.title, lessonId: { in: lessons.map(l => l.id) } } });
    if (!theory) { console.log("! Teo: " + item.title); notFound++; continue; }
    await p.theory.update({ where: { id: theory.id }, data: { content: item.content } });
    console.log("✓ " + item.title + ": " + theory.content.length + " → " + item.content.length);
    updated++;
  }
  console.log("\nDone: " + updated + " updated, " + notFound + " not found");
  await p.$disconnect();
}
main().catch(e => { console.error(e); p.$disconnect(); process.exit(1); });
