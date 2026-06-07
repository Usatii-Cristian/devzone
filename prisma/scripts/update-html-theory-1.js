"use strict";
require("dotenv").config({ path: ".env" });
const { PrismaClient } = require("@prisma/client");
const p = new PrismaClient();

const UPDATES = [
  // L1
  { lesson: "1. Introducere HTML + structură", title: "Atribute pe tag-uri", content: `**Atributele** oferă informații suplimentare despre elemente. Se scriu în tag-ul de deschidere ca perechi \`nume="valoare"\`.

\`\`\`html
<a href="https://example.com" target="_blank" rel="noopener">Link extern</a>
<img src="foto.jpg" alt="Peisaj montan" width="800" height="600">
<input type="email" placeholder="email@exemplu.ro" required>
<div id="header" class="container primary" data-theme="dark">...</div>
\`\`\`

**Atribute globale** — funcționează pe orice element:
• **\`id\`** — identificator unic pe pagină; folosit de CSS (\`#id\`) și JS (\`getElementById\`).
• **\`class\`** — poate fi multiplu (spații între ele); target pentru CSS și JS.
• **\`style\`** — CSS inline (evită când poți; greu de menținut).
• **\`title\`** — tooltip la hover, citit de screen readere.
• **\`lang\`** — limba conținutului (\`lang="ro"\`).
• **\`tabindex\`** — controlează ordinea navigării cu Tab.
• **\`hidden\`** — ascunde elementul (\`display: none\`).
• **\`contenteditable="true"\`** — permite editarea directă în browser.

**Atribute booleene** — prezența lor înseamnă \`true\`:
\`\`\`html
<input disabled>          <!-- câmpul e dezactivat -->
<input required>          <!-- câmpul e obligatoriu -->
<input checked>           <!-- checkbox bifat implicit -->
<video autoplay muted>    <!-- pornește automat, fără sunet -->
<details open>            <!-- detalii vizibile implicit -->
\`\`\`

**Data attributes** — atribute personalizate pentru JS:
\`\`\`html
<button data-product-id="42" data-action="add-to-cart">Adaugă</button>
<script>
  const btn = document.querySelector('button');
  console.log(btn.dataset.productId); // "42"
  console.log(btn.dataset.action);    // "add-to-cart"
  btn.dataset.qty = "3";  // adaugă atribut nou
</script>
\`\`\`

**Atribute specifice elementelor:**
\`\`\`html
<a href="..."    target="_blank" rel="noopener" download>
<img src="..."   alt="..." loading="lazy" srcset="...">
<input type="..." name="..." placeholder="..." value="...">
<form action="..." method="POST" enctype="multipart/form-data">
<meta name="..." content="...">
<link rel="..." href="...">
\`\`\`

• Atributele \`data-*\` sunt perfect valide HTML5 și nu afectează SEO sau stilizarea.
• Convenția modernă: valori de atribut întotdeauna între ghilimele duble.
• Atributele ARIA (\`aria-label\`, \`aria-hidden\`, \`role\`) îmbunătățesc accesibilitatea.
• Ordinea atributelor nu contează semantic — dar consistența ajută la lizibilitate.` },

  // L2
  { lesson: "2. Tag-uri pentru text", title: "Heading-uri h1-h6", content: `**Heading-urile** (\`<h1>\`-\`<h6>\`) definesc ierarhia și structura conținutului. Sunt esențiale pentru SEO, accesibilitate și navigare.

\`\`\`html
<h1>Titlu principal — cel mai important, unul singur per pagină</h1>
<h2>Titlu secțiune</h2>
<h3>Titlu subsecțiune</h3>
<h4>Nivel 4</h4>
<h5>Nivel 5</h5>
<h6>Nivel 6 — rar folosit, cel mai puțin important</h6>
\`\`\`

**Exemplu structură corectă:**
\`\`\`html
<main>
  <h1>Ghid HTML5 Complet</h1>

  <section>
    <h2>1. Structura de bază</h2>
    <h3>1.1 Tag-ul DOCTYPE</h3>
    <h3>1.2 Elementul html</h3>
  </section>

  <section>
    <h2>2. Tag-uri pentru text</h2>
    <h3>2.1 Headings</h3>
    <p>Conținut despre headings...</p>
    <h3>2.2 Paragrafe</h3>
    <p>Conținut despre paragrafe...</p>
  </section>
</main>
\`\`\`

**Reguli esențiale:**
• **\`<h1>\`** — titlul principal al paginii; un singur h1 per pagină (SEO + screen readers).
• Ierarhia trebuie să fie logică: nu sări de la h2 la h4 (h2 → h3 → h4, nu h2 → h4).
• Screen readere permit utilizatorilor să navigheze rapid prin heading-uri.
• Google acordă mai multă importanță textului din heading-uri pentru înțelegerea subiectului.

**Dimensiune vs semnificație:**
\`\`\`html
<!-- GREȘIT: ales h3 pentru că "arată mai mic" -->
<h3>Titlul principal al paginii</h3>

<!-- CORECT: h1 semantic, dimensiune controlată cu CSS -->
<h1 style="font-size: 1.5rem;">Titlul principal al paginii</h1>
\`\`\`

**CSS pentru heading-uri:**
\`\`\`css
h1 { font-size: 2.5rem; font-weight: 700; color: #1a1a2e; }
h2 { font-size: 2rem; font-weight: 600; color: #2c3e50; }
h3 { font-size: 1.5rem; font-weight: 600; }
h1, h2, h3 { line-height: 1.2; margin-bottom: 0.5em; }
\`\`\`

• Testare: deschide pagina și navighează cu VoiceOver/NVDA — auzi o structură logică?
• Tool gratuit: WAVE (wave.webaim.org) vizualizează ierarhia heading-urilor.
• \`aria-level\` poate schimba nivelul semantic fără a schimba elementul HTML.` },

  { lesson: "2. Tag-uri pentru text", title: "Paragrafe și formatare", content: `**\`<p>\`** marchează paragrafe de text. Tag-urile de formatare adaugă sens semantic sau prezentare vizuală.

\`\`\`html
<p>Primul paragraf. Browser-ul adaugă automat margin deasupra și dedesubt.</p>
<p>Al doilea paragraf. Spațiile    multiple și
   newline-urile din sursă    sunt colapsate la un spațiu.</p>
\`\`\`

**Tag-uri semantice de formatare:**
\`\`\`html
<p>
  <strong>Text important</strong> — bold semantic (screen reader îl evidențiază).<br>
  <em>Text accentuat</em> — italic semantic (intonație diferită la citire).<br>
  Prețul vechi: <del>299 lei</del> → Prețul nou: <ins>199 lei</ins>.<br>
  Text <mark>evidențiat</mark> ca și cu marker-ul.<br>
  Apa este <small>H<sub>2</sub>O</small> și E = mc<sup>2</sup>.<br>
  Apasă <kbd>Ctrl</kbd> + <kbd>C</kbd> pentru copiere.<br>
  Output: <samp>Error: file not found</samp>.<br>
  Variabila <var>x</var> = <var>y</var> + 1.<br>
  Cod inline: <code>console.log("hello")</code>.<br>
  <abbr title="HyperText Markup Language">HTML</abbr> este standardul web.
</p>
\`\`\`

**Semantic vs prezentare:**
\`\`\`html
<!-- Semantic (recomandat) -->
<strong>Important</strong>  <!-- înseamnă "important" -->
<em>Accentuat</em>           <!-- înseamnă "accentuat/emfatic" -->

<!-- Prezentare (evitat) -->
<b>Bold vizual</b>           <!-- fără sens semantic -->
<i>Italic vizual</i>         <!-- fără sens semantic -->
<u>Subliniat</u>             <!-- poate confunda cu link-uri! -->
<s>Tăiat vizual</s>          <!-- <del> e mai semantic -->
\`\`\`

**Tag-ul \`<br>\`** — line break forțat:
\`\`\`html
<!-- OK: adrese și versuri — spații reale în conținut -->
<address>
  Str. Victoriei nr. 10<br>
  București, 010001<br>
  România
</address>

<!-- GREȘIT: spacing între paragrafe (folosește CSS margin!) -->
<p>Paragraf 1</p>
<br><br>  <!-- NU! -->
<p>Paragraf 2</p>
\`\`\`

**\`<hr>\`** — separator tematic:
\`\`\`html
<section>
  <p>Primul subiect...</p>
  <hr>  <!-- schimbare de subiect — semantic, nu pur decorativ -->
  <p>Alt subiect...</p>
</section>
\`\`\`

• Fiecare \`<p>\` este un bloc separat — browser-ul adaugă margin automat (resetabil cu CSS).
• \`<br>\` este un element void — nu \`<br></br>\` sau \`<br/>\` (deși acceptat).
• \`<strong>\` și \`<em>\` pot fi imbricate: \`<strong><em>foarte important și accentuat</em></strong>\`.` },

  { lesson: "2. Tag-uri pentru text", title: "Citate și pre-formatat", content: `Tag-urile de citat și pre-formatare au rol semantic specific — marchează text provenit din alte surse sau cu spațiere fixă.

**\`<blockquote>\`** — citat lung, pe bloc separat:
\`\`\`html
<blockquote cite="https://sursa.ro/articol">
  <p>Orice problemă în informatică poate fi rezolvată cu un nivel suplimentar
  de indirectare. Dar de obicei, asta creează o altă problemă.</p>
  <footer>
    — <cite>David Wheeler</cite>, informatician britanic
  </footer>
</blockquote>
\`\`\`

**\`<q>\`** — citat scurt, inline:
\`\`\`html
<p>Einstein a spus: <q cite="https://sursa.ro">Imaginația este mai importantă decât cunoașterea.</q></p>
\`\`\`
Browser-ul adaugă automat ghilimele (\`"..."\`) în jurul \`<q>\`.

**\`<cite>\`** — titlul operei sau autorul citat:
\`\`\`html
<p>Am citit <cite>JavaScript: The Good Parts</cite> de Douglas Crockford.</p>
<p>Conform <cite>MDN Web Docs</cite>, elementul semantic este recomandat.</p>
\`\`\`

**\`<pre>\`** — text preformatat (spații și newline-uri păstrate):
\`\`\`html
<pre>
  Funcție:    f(x) = x² + 2x + 1
  Derivată:   f'(x) = 2x + 2
  Integrală:  ∫f(x)dx = x³/3 + x² + x + C
</pre>

<pre><code>
function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}
</code></pre>
\`\`\`

**\`<code>\`** — cod inline sau în bloc:
\`\`\`html
<!-- Inline: o linie de cod în text -->
<p>Funcția <code>Array.prototype.map()</code> returnează un array nou.</p>

<!-- Bloc: cod pe mai multe linii (mereu în pre) -->
<pre><code class="language-javascript">
const arr = [1, 2, 3];
const doubled = arr.map(x => x * 2);
console.log(doubled); // [2, 4, 6]
</code></pre>
\`\`\`

**\`<kbd>\`**, **\`<samp>\`**, **\`<var>\`:**
\`\`\`html
<p>Apasă <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>I</kbd> pentru DevTools.</p>
<p>Terminalul afișează: <samp>$ npm install</samp></p>
<p>Formula: aria = <var>b</var> × <var>h</var> / 2</p>
\`\`\`

• \`<pre>\` afișează text monospațiat cu toate spațiile și newline-urile păstrate.
• \`<pre><code>\` este combinația standard pentru blocuri de cod.
• Biblioteci ca **Prism.js** sau **Highlight.js** adaugă syntax highlighting la \`<code>\`.
• \`<blockquote cite="URL"\` — URL-ul e pentru mașini, nu e afișat; folosit de motoare de căutare.` },

  // L3
  { lesson: "3. Linkuri și imagini", title: "Tag <a> — anchors / linkuri", content: `**\`<a>\`** (anchor) creează hyperlinkuri — esența web-ului. Atributul \`href\` specifică destinația.

\`\`\`html
<!-- Link extern -->
<a href="https://google.com" target="_blank" rel="noopener noreferrer">Google</a>

<!-- Link intern (altă pagină din site) -->
<a href="/despre">Despre noi</a>
<a href="../contact.html">Contact</a>

<!-- Ancoră pe aceeași pagină (scroll) -->
<a href="#sectiunea-2">Sari la secțiunea 2</a>
<h2 id="sectiunea-2">Secțiunea 2</h2>

<!-- Linkuri speciale -->
<a href="mailto:email@exemplu.ro?subject=Salut">Trimite email</a>
<a href="tel:+40721000000">Sună acum</a>
<a href="document.pdf" download="ghid-html.pdf">Descarcă PDF</a>
\`\`\`

**Atributul \`target\`:**
• \`target="_blank"\` — deschide în tab nou; **mereu** adaugă \`rel="noopener noreferrer"\` (securitate).
• \`target="_self"\` — implicit; deschide în același tab.

**Atributul \`rel\`:**
\`\`\`html
<a href="https://site-extern.ro" rel="noopener noreferrer">Securizat</a>
<a href="/sponsor" rel="sponsored">Link sponsor (SEO)</a>
<a href="/user-content" rel="ugc">Conținut utilizator (SEO)</a>
<a href="/pagina" rel="nofollow">Nu urmări (SEO)</a>
\`\`\`

**Link cu imagine:**
\`\`\`html
<a href="/home" aria-label="Acasă">
  <img src="logo.png" alt="DevZone Logo">
</a>
\`\`\`

**Stări CSS pentru linkuri:**
\`\`\`css
a:link    { color: #3498db; }   /* nevizitat */
a:visited { color: #8e44ad; }   /* vizitat */
a:hover   { color: #2980b9; text-decoration: underline; }
a:active  { color: #e74c3c; }   /* click activ */
a:focus   { outline: 2px solid #3498db; }  /* navigare cu Tab */
\`\`\`

• Textul unui link trebuie să descrie destinația: "Citește ghidul HTML" nu "Click here" sau "Aflați mai mult".
• Linkurile sunt navigabile cu Tab — important pentru accesibilitate.
• \`href="#"\` face scroll la top; \`href="javascript:void(0)"\` pentru acțiuni JS (evită — folosește \`<button>\`).
• Fără \`href\`, \`<a>\` devine placeholder (nu e focusabil, nu are cursor pointer).` },

  { lesson: "3. Linkuri și imagini", title: "Tag <img> — imagini", content: `**\`<img>\`** afișează imagini. Este un element void (fără tag de închidere). Atributele \`src\` și \`alt\` sunt obligatorii.

\`\`\`html
<!-- Imagine de bază -->
<img src="foto.jpg" alt="Peisaj montan cu zăpadă">

<!-- Cu dimensiuni explicite (previne layout shift) -->
<img src="profil.jpg" alt="Avatar utilizator Cristi" width="200" height="200">

<!-- Lazy loading — se încarcă când ajunge în viewport -->
<img src="articol-banner.jpg" alt="Banner articol" loading="lazy">

<!-- Imagine decorativă (screen reader o ignoră) -->
<img src="divider.png" alt="">
\`\`\`

**Atribut \`srcset\` — imagini responsive:**
\`\`\`html
<img
  src="foto-800.jpg"
  srcset="foto-400.jpg 400w, foto-800.jpg 800w, foto-1600.jpg 1600w"
  sizes="(max-width: 600px) 400px, (max-width: 1200px) 800px, 1600px"
  alt="Fotografie peisaj"
>
\`\`\`

**\`<picture>\`** — formate moderne cu fallback:
\`\`\`html
<picture>
  <source srcset="foto.avif" type="image/avif">
  <source srcset="foto.webp" type="image/webp">
  <img src="foto.jpg" alt="Fotografie — fallback JPEG">
</picture>
\`\`\`

**Reguli pentru \`alt\`:**
• **Imagini informative**: descrie ce conține ("Grafic vânzări Q1 2024 — creștere 15%").
• **Imagini decorative**: \`alt=""\` (gol, nu absent) — screen reader o sare.
• **Imagini-link**: descrie destinația ("Logo — Mergi la pagina principală").
• **Nu** scrie "imagine cu" sau "fotografie de" — redundant.

**Formate recomandate:**
\`\`\`
WebP  → 25-34% mai mic decât JPEG, suport larg (Chrome, Firefox, Safari)
AVIF  → Chiar mai mic, calitate excelentă, suport în creștere
SVG   → Ideal pentru icoane și ilustrații — scalabil fără pierdere
PNG   → Transparență, grafice cu text, capturi de ecran
JPEG  → Fotografii, fallback universal
\`\`\`

• Specifică \`width\` și \`height\` întotdeauna — previne Cumulative Layout Shift (CLS).
• \`loading="lazy"\` — standard HTML5 nativ, nu necesită JavaScript.
• \`decoding="async"\` — decodifică imaginea asincron, nu blochează thread-ul principal.` },

  { lesson: "3. Linkuri și imagini", title: "Linkuri în butoane și nav", content: `Diferența dintre **\`<a>\`** și **\`<button>\`** este semantică și funcțională. Navigarea (\`<nav>\`) grupează linkuri de navigare major.

**\`<a>\` vs \`<button>\` — când să folosești care:**
\`\`\`html
<!-- <a> — pentru navigare (schimba URL-ul) -->
<a href="/profil">Mergi la profil</a>
<a href="/cursuri">Vezi toate cursurile</a>
<a href="https://github.com" target="_blank" rel="noopener">GitHub</a>

<!-- <button> — pentru acțiuni (nu navigare) -->
<button onclick="deleteItem(42)">Șterge</button>
<button type="submit">Trimite formularul</button>
<button onclick="toggleDarkMode()">Dark Mode</button>

<!-- GREȘIT: div/span cu onclick în loc de a sau button -->
<!-- <div onclick="navigate()">Link fals</div> — nu e accesibil! -->
\`\`\`

**Navigare (\`<nav>\`) cu liste:**
\`\`\`html
<!-- Navigare principală -->
<header>
  <nav aria-label="Navigare principală">
    <ul>
      <li><a href="/" aria-current="page">Acasă</a></li>
      <li><a href="/cursuri">Cursuri</a></li>
      <li><a href="/despre">Despre</a></li>
      <li><a href="/contact">Contact</a></li>
    </ul>
  </nav>
</header>

<!-- Navigare breadcrumb -->
<nav aria-label="Breadcrumb">
  <ol>
    <li><a href="/">Acasă</a></li>
    <li><a href="/cursuri">Cursuri</a></li>
    <li aria-current="page">HTML</li>
  </ol>
</nav>
\`\`\`

**Stilizare meniu de navigare:**
\`\`\`css
nav ul { list-style: none; display: flex; gap: 1rem; padding: 0; margin: 0; }
nav a { text-decoration: none; color: inherit; padding: 0.5rem 1rem; }
nav a:hover { background: #f0f0f0; border-radius: 4px; }
nav a[aria-current="page"] { font-weight: bold; color: #3498db; }
\`\`\`

**Linkuri skip-navigation (accesibilitate):**
\`\`\`html
<!-- Primul element în body — permite săritura la conținut principal -->
<a href="#main-content" class="skip-link">Sari la conținut</a>

<header>...</header>
<main id="main-content">
  <h1>Conținut principal</h1>
</main>
\`\`\`
\`\`\`css
.skip-link { position: absolute; top: -40px; left: 0; }
.skip-link:focus { top: 0; }  /* vizibil doar la navigare cu Tab */
\`\`\`

• **\`aria-current="page"\`** — marchează linkul paginii active; screen readere îl anunță.
• **\`aria-label\`** pe \`<nav>\`** — diferențiază multiple nav-uri de pe aceeași pagină.
• Niciodată nu pune un \`<button>\` în interiorul unui \`<a>\` sau invers — invalid HTML.
• Link-uri cu text identic pe aceeași pagină trebuie diferențiate cu \`aria-label\`.` },

  // L4
  { lesson: "4. Liste", title: "Liste neordonate (ul) și ordonate (ol)", content: `**Listele** organizează informațiile în elemente discrete. HTML oferă trei tipuri: neordonate (\`ul\`), ordonate (\`ol\`) și de definiții (\`dl\`).

**Lista neordonată \`<ul>\`** — pentru elemente fără ordine importantă:
\`\`\`html
<ul>
  <li>HTML — structura paginii</li>
  <li>CSS — stilizarea</li>
  <li>JavaScript — interactivitatea</li>
</ul>
\`\`\`

**Lista ordonată \`<ol>\`** — pentru pași, clasamente, secvențe:
\`\`\`html
<ol>
  <li>Instalează Node.js de pe nodejs.org</li>
  <li>Creează proiectul: <code>npm init -y</code></li>
  <li>Instalează dependențele: <code>npm install express</code></li>
  <li>Rulează serverul: <code>node index.js</code></li>
</ol>
\`\`\`

**Atribute pentru \`<ol>\`:**
\`\`\`html
<!-- start: numărul de start (continuare dintr-o altă listă) -->
<ol start="5">
  <li>Al cincilea pas</li>
  <li>Al șaselea pas</li>
</ol>

<!-- type: tipul marcatorului -->
<ol type="A">   <!-- A, B, C... -->
  <li>Opțiunea A</li>
  <li>Opțiunea B</li>
</ol>
<ol type="I">   <!-- I, II, III... -->
<ol type="i">   <!-- i, ii, iii... -->

<!-- reversed: numărătoare inversă (top 10) -->
<ol reversed start="10">
  <li>Locul 10</li>
  <li>Locul 9</li>
</ol>
\`\`\`

**Stilizare marcatori cu CSS:**
\`\`\`css
/* Tipuri predefinite */
ul { list-style-type: disc; }    /* ● implicit */
ul { list-style-type: circle; }  /* ○ */
ul { list-style-type: square; }  /* ■ */
ul { list-style-type: none; }    /* fără marcator */

/* Imagine ca marcator */
ul { list-style-image: url('check.svg'); }

/* Marcator custom cu ::marker (modern) */
li::marker { color: #3498db; font-size: 1.2em; }

/* Marcator custom cu ::before (mai control) */
ul { list-style: none; padding: 0; }
li::before { content: "✓ "; color: green; font-weight: bold; }
\`\`\`

**Reguli:**
• \`<ul>\` și \`<ol>\` pot conține **doar** \`<li>\` ca copii direcți.
• \`<li>\` poate conține orice alt element HTML, inclusiv alte liste.
• Pentru navigare (meniu), se folosesc \`<ul>\` cu \`<li>\` — standard semantic acceptat.
• Elimini marcatorii cu: \`list-style: none; padding: 0; margin: 0;\`.` },

  { lesson: "4. Liste", title: "Liste imbricate (nested)", content: `**Listele imbricate** (nested) conțin sub-liste în interiorul elementelor \`<li>\`. Sunt utile pentru ierarhii, meniuri cu sub-meniuri, cuprinsuri.

\`\`\`html
<ul>
  <li>Frontend
    <ul>
      <li>HTML</li>
      <li>CSS
        <ul>
          <li>Flexbox</li>
          <li>Grid</li>
          <li>Animații</li>
        </ul>
      </li>
      <li>JavaScript</li>
    </ul>
  </li>
  <li>Backend
    <ul>
      <li>Node.js</li>
      <li>Python</li>
      <li>Baze de date</li>
    </ul>
  </li>
</ul>
\`\`\`

**Meniu de navigare cu sub-meniu:**
\`\`\`html
<nav>
  <ul>
    <li><a href="/">Acasă</a></li>
    <li>
      <a href="/cursuri">Cursuri</a>
      <ul>
        <li><a href="/cursuri/html">HTML</a></li>
        <li><a href="/cursuri/css">CSS</a></li>
        <li><a href="/cursuri/js">JavaScript</a></li>
      </ul>
    </li>
    <li><a href="/contact">Contact</a></li>
  </ul>
</nav>
\`\`\`

**Cuprins articol cu numere:**
\`\`\`html
<ol>
  <li>Introducere</li>
  <li>Instalare
    <ol>
      <li>Windows</li>
      <li>macOS</li>
      <li>Linux</li>
    </ol>
  </li>
  <li>Configurare
    <ol>
      <li>Fișierul de configurare</li>
      <li>Variabile de mediu</li>
    </ol>
  </li>
</ol>
\`\`\`

**CSS pentru styling diferit pe niveluri:**
\`\`\`css
/* Implicit: fiecare nivel are stil diferit */
ul ul { list-style-type: circle; }   /* al doilea nivel */
ul ul ul { list-style-type: square; } /* al treilea nivel */

/* Indentare controlată */
ul, ol { padding-left: 1.5rem; }
ul ul, ol ol { padding-left: 1rem; }  /* indentare mai mică la niveluri adânci */

/* Meniu dropdown cu CSS pur */
nav li { position: relative; }
nav li ul { display: none; position: absolute; top: 100%; left: 0; }
nav li:hover ul { display: block; }
\`\`\`

• Sub-lista **trebuie** să fie în interiorul unui \`<li>\`, nu direct în \`<ul>\`/\`<ol>\`.
• Maxim 2-3 niveluri de imbricare — mai mult devine greu de citit.
• Screen readere anunță "listă cu N elemente" la fiecare nivel de imbricare.
• Meniuri dropdown complexe necesită ARIA (\`aria-expanded\`, \`aria-haspopup\`) pentru accesibilitate.` },

  { lesson: "4. Liste", title: "Liste de definiții (dl)", content: `**Lista de definiții** (\`<dl>\`) grupează termeni cu descrierile lor. Perfectă pentru glosare, dicționare, perechi cheie-valoare, metadata.

**Structura de bază:**
\`\`\`html
<dl>
  <dt>HTML</dt>
  <dd>HyperText Markup Language — limbajul de structurare al paginilor web.</dd>

  <dt>CSS</dt>
  <dd>Cascading Style Sheets — limbajul de stilizare al paginilor web.</dd>

  <dt>JavaScript</dt>
  <dd>Limbaj de programare pentru interactivitate și logică în browser și server.</dd>
</dl>
\`\`\`

**Un termen, multiple definiții:**
\`\`\`html
<dl>
  <dt>API</dt>
  <dd>Application Programming Interface — interfață pentru comunicarea între aplicații.</dd>
  <dd>În context web: set de endpoint-uri HTTP pentru schimb de date în format JSON/XML.</dd>
</dl>
\`\`\`

**Mai mulți termeni, o definiție (sinonime):**
\`\`\`html
<dl>
  <dt>WWW</dt>
  <dt>World Wide Web</dt>
  <dd>Sistem global de documente hypertext interconectate prin internet, creat de Tim Berners-Lee în 1989.</dd>
</dl>
\`\`\`

**Metadata articol (perechi cheie-valoare):**
\`\`\`html
<article>
  <h2>Articol: Introducere în HTML</h2>
  <dl>
    <dt>Autor</dt>
    <dd>Cristi Usatii</dd>

    <dt>Data publicării</dt>
    <dd><time datetime="2024-01-15">15 ianuarie 2024</time></dd>

    <dt>Categorie</dt>
    <dd>Frontend Development</dd>

    <dt>Timp de citit</dt>
    <dd>5 minute</dd>
  </dl>
  <p>Conținut articol...</p>
</article>
\`\`\`

**Stilizare cu CSS Grid:**
\`\`\`css
/* Layout clasic: termen la stânga, definiție la dreapta */
dl {
  display: grid;
  grid-template-columns: max-content 1fr;
  gap: 0.25rem 1.5rem;
}
dt {
  font-weight: bold;
  color: #555;
}
dd {
  margin: 0;  /* resetează indent-ul implicit al browser-ului */
}
\`\`\`

• \`<dt>\` = definition term (termenul); \`<dd>\` = definition description (descrierea).
• \`<dl>\` acceptă direct doar \`<dt>\`, \`<dd>\`, și \`<div>\` (pentru grupare în grid).
• Semantic corect pentru: glosare, specificații tehnice, FAQ, fișe tehnice de produse.
• Screen readere citesc "termen de definiție: HTML" și "definiție: HyperText Markup Language".` },

  // L5
  { lesson: "5. Tabele", title: "Structura unui tabel", content: `**Tabelele HTML** sunt pentru date tabelare — nu pentru layout (erau folosite greșit în trecut). Structura: \`<table>\`, \`<tr>\` (rând), \`<th>\` (header), \`<td>\` (date).

\`\`\`html
<table>
  <caption>Limbaje de programare populare în 2024</caption>
  <thead>
    <tr>
      <th scope="col">Limbaj</th>
      <th scope="col">Tip</th>
      <th scope="col">An lansare</th>
      <th scope="col">Popularitate</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">JavaScript</th>
      <td>Interpretat</td>
      <td>1995</td>
      <td>⭐⭐⭐⭐⭐</td>
    </tr>
    <tr>
      <th scope="row">Python</th>
      <td>Interpretat</td>
      <td>1991</td>
      <td>⭐⭐⭐⭐⭐</td>
    </tr>
    <tr>
      <th scope="row">C</th>
      <td>Compilat</td>
      <td>1972</td>
      <td>⭐⭐⭐⭐</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <td colspan="4">Sursa: Stack Overflow Developer Survey 2024</td>
    </tr>
  </tfoot>
</table>
\`\`\`

**Elementele tabelului:**
• **\`<caption>\`** — titlul tabelului, primul în \`<table>\`; citit de screen readere înainte.
• **\`<thead>\`** — rândul(rile) de antet; rămâne vizibil la print pe fiecare pagină.
• **\`<tbody>\`** — datele principale; poate fi multiplu pentru grupuri.
• **\`<tfoot>\`** — rândul(rile) de sumar/note; apare la final la print.
• **\`<th>\`** — celulă header: bold și centrat implicit; are atribut \`scope\`.
• **\`<td>\`** — celulă de date.

**\`scope\`** — crucial pentru accesibilitate:
\`\`\`html
<th scope="col">Coloană</th>  <!-- antet de coloană -->
<th scope="row">Rând</th>     <!-- antet de rând -->
\`\`\`

**Stilizare de bază:**
\`\`\`css
table { border-collapse: collapse; width: 100%; }
th, td { border: 1px solid #ddd; padding: 10px 14px; text-align: left; }
th { background: #f4f4f4; font-weight: 600; }
tr:nth-child(even) { background: #f9f9f9; }
tr:hover { background: #f0f7ff; }
caption { font-weight: bold; margin-bottom: 0.5rem; color: #555; }
\`\`\`

• \`border-collapse: collapse\` — elimină spațiul dublu dintre borduri (implicit separat).
• Atribut HTML \`border\` pe table — depășit; folosește CSS.
• Tabelele nu sunt responsive implicit — pe mobile necesită CSS suplimentar (\`overflow-x: auto\`).` },

  { lesson: "5. Tabele", title: "Tabele și accesibilitate", content: `Tabelele HTML pot fi complexe pentru utilizatorii cu screen readere. Câteva practici transformă un tabel greu de înțeles în unul complet accesibil.

**\`<caption>\`** — titlul tabelului (obligatoriu semantic):**
\`\`\`html
<table>
  <caption>Prețuri abonamente DevZone — actualizat ianuarie 2024</caption>
  ...
</table>
\`\`\`

**\`scope\`** pe \`<th>\`** — definește ce celule descrie:**
\`\`\`html
<thead>
  <tr>
    <th scope="col">Plan</th>
    <th scope="col">Preț / lună</th>
    <th scope="col">Cursuri</th>
  </tr>
</thead>
<tbody>
  <tr>
    <th scope="row">Basic</th>    <!-- antet rând -->
    <td>0 lei</td>
    <td>10 cursuri</td>
  </tr>
  <tr>
    <th scope="row">Pro</th>
    <td>49 lei</td>
    <td>Toate cursurile</td>
  </tr>
</tbody>
\`\`\`

**\`headers\`** — pentru tabele complexe cu colspan/rowspan:**
\`\`\`html
<thead>
  <tr>
    <th id="col-produs" scope="col">Produs</th>
    <th id="col-ian" scope="col">Ian</th>
    <th id="col-feb" scope="col">Feb</th>
  </tr>
</thead>
<tbody>
  <tr>
    <th id="row-laptop" scope="row">Laptop</th>
    <td headers="col-ian row-laptop">45</td>
    <td headers="col-feb row-laptop">52</td>
  </tr>
</tbody>
\`\`\`

**\`<colgroup>\` și \`<col>\`** — stilizare și grupare coloane:**
\`\`\`html
<table>
  <colgroup>
    <col span="1" style="background-color: #f5f5f5;">  <!-- prima coloană -->
    <col span="2">                                      <!-- coloanele 2-3 -->
    <col style="background-color: #e8f4fd;">           <!-- ultima coloană -->
  </colgroup>
  ...
</table>
\`\`\`

**Tabel responsiv:**
\`\`\`html
<div style="overflow-x: auto;">
  <table>...</table>
</div>
\`\`\`

\`\`\`css
/* Alternativă: card layout pe mobile */
@media (max-width: 600px) {
  table, thead, tbody, tr, th, td { display: block; }
  thead { display: none; }  /* ascunde header */
  td::before {
    content: attr(data-label) ": ";  /* afișează label din data attribute */
    font-weight: bold;
  }
}
\`\`\`

• Screen readere citesc fiecare celulă cu contextul antetului: "Produs: Laptop, Ian: 45".
• \`<summary>\` pe \`<table>\` era deprecat; \`<caption>\` e soluția corectă.
• Testează cu NVDA (Windows) sau VoiceOver (Mac) pentru a verifica accesibilitatea.
• Nu folosi tabele pentru layout — Flexbox și Grid sunt soluțiile moderne.` },

  // L6
  { lesson: "6. Forme și input-uri", title: "Tag <form> și <input>", content: `**\`<form>\`** este containerul pentru colectarea datelor. **\`<input>\`** este cel mai versatil element de formular — tipul se schimbă cu atributul \`type\`.

\`\`\`html
<form action="/api/register" method="POST" novalidate>
  <label for="name">Nume complet:</label>
  <input type="text" id="name" name="name"
    placeholder="Ex: Ion Popescu"
    required minlength="2" maxlength="100"
    autocomplete="name">

  <label for="email">Email:</label>
  <input type="email" id="email" name="email"
    placeholder="email@exemplu.ro"
    required autocomplete="email">

  <label for="pass">Parolă:</label>
  <input type="password" id="pass" name="password"
    required minlength="8"
    autocomplete="new-password">

  <button type="submit">Înregistrează-te</button>
  <button type="reset">Resetează</button>
</form>
\`\`\`

**Atributele \`<form>\`:**
• **\`action\`** — URL-ul unde se trimite formularul; implicit: pagina curentă.
• **\`method\`** — \`GET\` (date în URL) sau \`POST\` (în body, pentru date sensibile).
• **\`enctype="multipart/form-data"\`** — necesar pentru upload fișiere.
• **\`novalidate\`** — dezactivează validarea browser (pentru validare custom JS).
• **\`autocomplete="off"\`** — dezactivează autofill browser-ul.

**GET vs POST:**
\`\`\`
GET  → /cauta?q=html&sort=asc  (date în URL, bookmarkabil, cacheable)
POST → body: { email: "...", parola: "..." } (mai sigur, nu cacheable)
\`\`\`

**\`<label>\`** — obligatoriu pentru accesibilitate:
\`\`\`html
<!-- Asociere explicită (recomandat) -->
<label for="email">Adresă email:</label>
<input type="email" id="email" name="email">

<!-- Asociere implicită -->
<label>
  Adresă email:
  <input type="email" name="email">
</label>
\`\`\`

**\`<fieldset>\` și \`<legend>\`** — grupare câmpuri:
\`\`\`html
<fieldset>
  <legend>Preferințe notificări</legend>
  <label><input type="checkbox" name="notif" value="email"> Email</label>
  <label><input type="checkbox" name="notif" value="sms"> SMS</label>
</fieldset>
\`\`\`

• \`for\` din \`<label>\` trebuie să corespundă cu \`id\` din \`<input>\` — altfel nu funcționează.
• Fără \`name\` pe input, câmpul nu e inclus în datele trimise.
• Click pe label focusează câmpul asociat — îmbunătățește UX semnificativ.
• \`<input>\` nu are tag de închidere — element void.` },

  { lesson: "6. Forme și input-uri", title: "Textarea, select, button", content: `**\`<textarea>\`** permite text multi-linie, **\`<select>\`** creează dropdown-uri, **\`<button>\`** este elementul de acțiune semantic corect.

**\`<textarea>\`** — text pe mai multe rânduri:
\`\`\`html
<label for="bio">Biografie:</label>
<textarea
  id="bio" name="bio"
  rows="5" cols="40"
  maxlength="500"
  placeholder="Câteva cuvinte despre tine..."
  spellcheck="true"
>Valoare implicită între tag-uri</textarea>
\`\`\`

**\`<select>\`** — dropdown simplu și grupat:
\`\`\`html
<!-- Dropdown de bază -->
<select id="tara" name="tara" required>
  <option value="">-- Alege țara --</option>
  <option value="ro" selected>România</option>
  <option value="md">Moldova</option>
</select>

<!-- Grupare cu optgroup -->
<select name="limbaj">
  <optgroup label="Frontend">
    <option value="html">HTML</option>
    <option value="css">CSS</option>
    <option value="js">JavaScript</option>
  </optgroup>
  <optgroup label="Backend">
    <option value="node">Node.js</option>
    <option value="python">Python</option>
  </optgroup>
</select>

<!-- Selecție multiplă -->
<select name="skills" multiple size="4">
  <option value="html">HTML</option>
  <option value="css">CSS</option>
  <option value="js">JavaScript</option>
  <option value="react">React</option>
</select>
\`\`\`

**\`<button>\`** — tipuri și utilizare:
\`\`\`html
<!-- submit (implicit în form) — trimite formularul -->
<button type="submit">Trimite</button>

<!-- reset — resetează câmpurile la valori inițiale -->
<button type="reset">Resetează</button>

<!-- button — acțiune JS, nu afectează formularul -->
<button type="button" onclick="preview()">Previzualizare</button>

<!-- Cu icon -->
<button type="button" aria-label="Șterge elementul 42">
  <svg>...</svg>
</button>
\`\`\`

**\`<datalist>\`** — autocomplete cu sugestii:
\`\`\`html
<input list="orase" name="oras" placeholder="Scrie un oraș">
<datalist id="orase">
  <option value="București">
  <option value="Cluj-Napoca">
  <option value="Timișoara">
  <option value="Iași">
</datalist>
\`\`\`

• \`<textarea>\` nu are atribut \`value\` — valoarea inițială se pune **între tag-uri**.
• \`<button type="button">\` în interiorul unui \`<form>\` nu face submit — important!
• \`<select multiple>\` — Ctrl/Cmd + click pentru selecție multiplă.
• \`<datalist>\` combină libertatea unui \`<input>\` cu sugestiile unui \`<select>\`.` },

  // L7
  { lesson: "7. Semantic HTML", title: "Ce e semantic HTML?", content: `**HTML semantic** înseamnă folosirea tag-urilor care descriu **sensul** conținutului, nu doar aspectul vizual. Opusul e "div soup" — zeci de \`<div>\` fără sens.

**De ce contează semantica:**
• **SEO** — Google înțelege mai bine conținutul (headings, articole, navigare).
• **Accesibilitate** — screen readere navighează prin landmarks semantice (\`<nav>\`, \`<main>\`).
• **Mentenabilitate** — codul e mai ușor de citit și înțeles de colegi.
• **Stilizare** — selectori CSS mai clari: \`article p\` vs \`.content-wrapper .text-block\`.

**Div soup vs HTML semantic:**
\`\`\`html
<!-- GREȘIT — div soup (nu înțelegi structura) -->
<div class="header">
  <div class="nav">
    <div class="nav-item"><a href="/">Acasă</a></div>
  </div>
</div>
<div class="main">
  <div class="article">
    <div class="title"><h2>Titlu</h2></div>
    <div class="content"><p>Conținut.</p></div>
  </div>
</div>

<!-- CORECT — semantic (structura clară din tag-uri) -->
<header>
  <nav>
    <ul><li><a href="/">Acasă</a></li></ul>
  </nav>
</header>
<main>
  <article>
    <h2>Titlu</h2>
    <p>Conținut.</p>
  </article>
</main>
\`\`\`

**Elementele semantice HTML5:**
\`\`\`
Layout page:   <header> <nav> <main> <aside> <footer>
Conținut:      <article> <section> <figure> <figcaption>
Text:          <time> <address> <mark> <cite> <abbr> <blockquote>
Formulare:     <fieldset> <legend> <label> <output>
Media:         <audio> <video> <picture> <source> <track>
Interactiv:    <details> <summary> <dialog>
\`\`\`

**\`<time>\`** — date cu valoare mașinabilă:
\`\`\`html
<time datetime="2024-01-15">15 ianuarie 2024</time>
<time datetime="14:30">ora 14:30</time>
<time datetime="2024-01-15T14:30+02:00">15 ian 2024 la 14:30</time>
\`\`\`

**\`<figure>\` și \`<figcaption>\`:**
\`\`\`html
<figure>
  <img src="grafic.png" alt="Grafic vânzări 2024">
  <figcaption>Fig. 1: Evoluția vânzărilor în 2024 față de 2023.</figcaption>
</figure>
\`\`\`

**\`<address>\`** — informații de contact:
\`\`\`html
<address>
  Autor: <a href="mailto:cristi@devzone.ro">Cristi Usatii</a><br>
  DevZone SRL, București, România
</address>
\`\`\`

• Un document HTML5 semantic este automat mai accesibil — fără efort suplimentar.
• Regula simplă: dacă există un element semantic potrivit, folosește-l în loc de \`<div>\`.
• Semantica nu schimbă aspectul vizual — stilizarea rămâne la fel prin CSS.` },

  { lesson: "7. Semantic HTML", title: "Tag-uri semantice principale", content: `**Elementele structurale** definesc regiunile principale ale paginii. Browser-ele și screen readere le recunosc ca **landmarks** de navigare.

**Structura completă a unei pagini:**
\`\`\`html
<body>
  <header>
    <a href="/" class="logo">DevZone</a>
    <nav aria-label="Navigare principală">
      <ul>
        <li><a href="/">Acasă</a></li>
        <li><a href="/cursuri">Cursuri</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
    </nav>
  </header>

  <main>
    <h1>Bun venit pe DevZone</h1>
    <section>
      <h2>Cursuri recomandate</h2>
      <article>...</article>
    </section>
  </main>

  <aside aria-label="Articole recente">
    <h2>Articole recente</h2>
    <ul>...</ul>
  </aside>

  <footer>
    <nav aria-label="Navigare footer">
      <a href="/termeni">Termeni</a>
      <a href="/confidentialitate">Confidențialitate</a>
    </nav>
    <p><small>&copy; 2024 DevZone</small></p>
  </footer>
</body>
\`\`\`

**Regulile fiecărui element:**

**\`<header>\`:**
• Poate fi în \`<body>\` (header global) sau în \`<article>\`/\`<section>\` (header local).
• Nu confunda cu \`<head>\` — head e metadate invizibile, header e conținut vizibil.

**\`<nav>\`:**
• Doar pentru navigare majoră (meniu principal, breadcrumb, paginare) — nu pentru orice grup de linkuri.
• Multiple \`<nav>\` OK — diferențiază cu \`aria-label="Navigare principală"\` / \`"Navigare footer"\`.

**\`<main>\`:**
• **Un singur \`<main>\` per pagină** — conținutul principal și unic.
• Nu include header, footer, sau aside.
• Screen readere permit saltul direct la \`<main>\` — omit meniuri repetitive.

**\`<aside>\`:**
• Conținut tangențial: sidebar, widget-uri, note, reclame, bio autor.
• Poate fi în \`<article>\` (notă laterală) sau la nivel de pagină (sidebar).

**\`<footer>\`:**
• Similar cu header — global sau local per article/section.
• Copyright, linkuri suplimentare, contacte.

**\`<article>\` vs \`<section>\`:**
\`\`\`
article → conținut independent (redistribuibil): blog post, comentariu, card produs
section → grup tematic (cu heading): capitole, taburi, zonele unei pagini
div     → fără semnificație semantică: layout, grupare pentru CSS
\`\`\`

• \`<section>\` fără heading → probabil \`<div>\` e mai potrivit.
• Acestea pot fi stilizate exact ca \`<div>\` — diferența e semantică, nu vizuală.` },

  { lesson: "7. Semantic HTML", title: "Exemplu complet", content: `Să vedem un exemplu complet de pagină cu HTML semantic corect — un articol de blog cu toate elementele la locul potrivit.

\`\`\`html
<!DOCTYPE html>
<html lang="ro">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Introducere HTML Semantic — DevZone</title>
</head>
<body>

  <header>
    <a href="/" aria-label="DevZone — pagina principală">
      <img src="/logo.svg" alt="DevZone">
    </a>
    <nav aria-label="Navigare principală">
      <ul>
        <li><a href="/">Acasă</a></li>
        <li><a href="/cursuri" aria-current="page">Cursuri</a></li>
        <li><a href="/blog">Blog</a></li>
      </ul>
    </nav>
  </header>

  <main>
    <article>
      <header>
        <h1>Introducere în HTML Semantic</h1>
        <p>
          Publicat de <address rel="author"><a href="/autori/cristi">Cristi Usatii</a></address>
          pe <time datetime="2024-01-15">15 ianuarie 2024</time> •
          <span>5 min citire</span>
        </p>
      </header>

      <figure>
        <img src="/images/semantic-html.jpg"
          alt="Diagramă comparând div soup cu HTML semantic"
          width="800" height="400">
        <figcaption>HTML semantic vs. div soup — diferența în structură.</figcaption>
      </figure>

      <section aria-labelledby="intro-heading">
        <h2 id="intro-heading">Ce înseamnă HTML semantic?</h2>
        <p>HTML semantic înseamnă folosirea tag-urilor care descriu sensul conținutului...</p>
        <blockquote cite="https://www.w3.org/TR/html52/">
          <p>HTML este limbajul de publicare al web-ului.</p>
          <footer>— <cite>W3C HTML Specification</cite></footer>
        </blockquote>
      </section>

      <section aria-labelledby="avantaje-heading">
        <h2 id="avantaje-heading">Avantajele semanticii</h2>
        <ul>
          <li><strong>SEO</strong> — Google înțelege mai bine conținutul.</li>
          <li><strong>Accesibilitate</strong> — screen readere navighează prin landmarks.</li>
          <li><strong>Mentenabilitate</strong> — codul e mai ușor de înțeles.</li>
        </ul>
      </section>

      <footer>
        <p>Tag-uri: <a href="/tag/html" rel="tag">HTML</a>, <a href="/tag/web" rel="tag">Web</a></p>
      </footer>
    </article>

    <section aria-label="Comentarii">
      <h2>Comentarii (2)</h2>
      <article>
        <header>
          <h3>Ion Popescu</h3>
          <time datetime="2024-01-16">16 ian 2024</time>
        </header>
        <p>Excelent articol, foarte clar explicat!</p>
      </article>
    </section>
  </main>

  <aside aria-label="Articole similare">
    <h2>Citește și</h2>
    <ul>
      <li><a href="/cursuri/css">Introducere CSS</a></li>
      <li><a href="/cursuri/js">Introducere JavaScript</a></li>
    </ul>
  </aside>

  <footer>
    <p><small>&copy; <time datetime="2024">2024</time> DevZone. Toate drepturile rezervate.</small></p>
  </footer>

</body>
</html>
\`\`\`

• \`header\` și \`footer\` în \`<article>\` sunt valide — sunt locale articolului, nu paginii.
• \`aria-labelledby\` pe \`<section>\` asociază heading-ul cu secțiunea pentru screen readere.
• \`rel="author"\` pe \`<address>\` și \`rel="tag"\` pe linkuri contribuie la SEO.
• Validare HTML: **validator.w3.org** — verifică dacă documentul e valid HTML5.` },

  // L8
  { lesson: "8. HTML5: features moderne", title: "Audio și video", content: `HTML5 aduce **\`<audio>\`** și **\`<video>\`** native — fără Flash sau plugin-uri. Browser-ul oferă un player implicit sau poți construi unul custom cu JavaScript.

**\`<video>\`** — video nativ:
\`\`\`html
<video
  width="800" height="450"
  controls
  poster="thumbnail.jpg"
  preload="metadata"
>
  <source src="tutorial.webm" type="video/webm">
  <source src="tutorial.mp4"  type="video/mp4">
  <track src="subtitle-ro.vtt" kind="subtitles" srclang="ro" label="Română" default>
  <p>Browser-ul tău nu suportă video HTML5. <a href="tutorial.mp4">Descarcă</a>.</p>
</video>
\`\`\`

**\`<audio>\`** — audio nativ:
\`\`\`html
<audio controls preload="metadata">
  <source src="podcast.ogg"  type="audio/ogg">
  <source src="podcast.mp3"  type="audio/mpeg">
  <p><a href="podcast.mp3">Descarcă podcastul</a></p>
</audio>
\`\`\`

**Atribute comune:**
• \`controls\` — player nativ (play, pause, volum, progres).
• \`autoplay muted\` — autoplay necesită \`muted\` pe desktop.
• \`loop\` — reia de la început la final.
• \`preload="none|metadata|auto"\` — controlează preîncărcarea.
• \`poster\` (video) — imaginea afișată înainte de play.

**Control JS:**
\`\`\`javascript
const video = document.querySelector('video');
video.play();
video.pause();
video.currentTime = 60;    // sari la secunda 60
video.volume = 0.5;         // volum 50%
video.playbackRate = 1.5;   // viteză 1.5x
video.muted = true;

video.addEventListener('timeupdate', () => {
  const pct = (video.currentTime / video.duration * 100).toFixed(0);
  console.log(pct + '%');
});
video.addEventListener('ended', () => console.log('Terminat!'));
\`\`\`

**\`<source>\` și formate:**
\`\`\`
Video: WebM (VP9/AV1) → MP4 (H.264) fallback
Audio: OGG (Vorbis)   → MP3 fallback
\`\`\`

**\`<track>\`** — subtitile și capitole (WebVTT format):
\`\`\`
WEBVTT

00:00:01.000 --> 00:00:04.000
Bun venit la cursul de HTML5!

00:00:05.000 --> 00:00:09.000
Astăzi vom discuta despre elemente multimedia.
\`\`\`

• Autoplay fără interacțiune e blocat de browsere moderne (politică UX).
• \`poster\` important — evită primul frame negru la încărcare.
• Subtitilele cu \`<track>\` sunt obligatorii pentru accesibilitate (WCAG 2.1 AA).` },

  { lesson: "8. HTML5: features moderne", title: "<canvas> și <svg>", content: `**\`<canvas>\`** permite desenare 2D/3D programatică cu JavaScript. **\`<svg>\`** definește grafice vectoriale direct în HTML.

**\`<canvas>\`** — suprafață de desenat cu JavaScript:**
\`\`\`html
<canvas id="myCanvas" width="400" height="300">
  Browser-ul tău nu suportă canvas.
</canvas>
\`\`\`

\`\`\`javascript
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// Dreptunghi
ctx.fillStyle = '#3498db';
ctx.fillRect(10, 10, 150, 80);

// Cerc
ctx.beginPath();
ctx.arc(200, 150, 50, 0, Math.PI * 2);
ctx.fillStyle = '#e74c3c';
ctx.fill();

// Linie
ctx.strokeStyle = '#2c3e50';
ctx.lineWidth = 3;
ctx.beginPath();
ctx.moveTo(0, 0);
ctx.lineTo(400, 300);
ctx.stroke();

// Text
ctx.font = '24px Arial';
ctx.fillStyle = '#2c3e50';
ctx.fillText('Canvas!', 160, 250);

// Imagine
const img = new Image();
img.onload = () => ctx.drawImage(img, 10, 10, 100, 100);
img.src = 'foto.jpg';
\`\`\`

**\`<svg>\`** — grafice vectoriale scalabile inline:
\`\`\`html
<svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <!-- Dreptunghi -->
  <rect x="10" y="10" width="100" height="60" fill="#3498db" rx="5"/>

  <!-- Cerc -->
  <circle cx="150" cy="100" r="40" fill="#e74c3c" opacity="0.8"/>

  <!-- Linie -->
  <line x1="0" y1="0" x2="200" y2="200" stroke="#2c3e50" stroke-width="2"/>

  <!-- Text -->
  <text x="50" y="170" font-size="18" fill="#2c3e50">SVG!</text>

  <!-- Path (formă complexă) -->
  <path d="M 100 10 L 190 180 L 10 180 Z" fill="#2ecc71"/>
</svg>
\`\`\`

**Canvas vs SVG:**
\`\`\`
Canvas:
  + Performanță bună pentru multe obiecte dinamice (jocuri, animații)
  + Manipulare pixel cu pixel
  - Rasterizat — pixelat la zoom
  - Nu accesibil nativ

SVG:
  + Vectorial — perfect la orice zoom
  + Accesibil (DOM, aria-label)
  + Stilizabil cu CSS
  - Lent cu mii de elemente
\`\`\`

**SVG ca fișier extern (recomandat pentru icoane):**
\`\`\`html
<img src="icon.svg" alt="Iconiță">  <!-- nu stilizabil cu CSS -->
<svg><use href="sprite.svg#icon-home"></use></svg>  <!-- stilizabil -->
\`\`\`

• \`<canvas>\` necesită JavaScript — fără JS, nimic nu e afișat.
• SVG inline e stilizabil cu CSS (\`fill: currentColor\` pentru icoane monocromatice).
• Biblioteci populare: **D3.js** (grafice date), **Chart.js** (canvas charts), **Three.js** (3D WebGL).` },

  { lesson: "8. HTML5: features moderne", title: "Form features moderne", content: `HTML5 a adăugat noi atribute și elemente pentru formulare — validare nativă, input-uri specializate și elemente interactive fără JavaScript.

**Noi tipuri de input:**
\`\`\`html
<input type="date">                <!-- 2024-01-15 — date picker nativ -->
<input type="time">                <!-- 14:30 — time picker nativ -->
<input type="datetime-local">      <!-- 2024-01-15T14:30 -->
<input type="month">               <!-- 2024-01 -->
<input type="week">                <!-- 2024-W03 -->
<input type="color" value="#3498db">    <!-- color picker nativ -->
<input type="range" min="0" max="100" step="5" value="50">  <!-- slider -->
<input type="search" placeholder="Caută...">  <!-- cu X pentru ștergere -->
<input type="tel" placeholder="+40 721 000 000">  <!-- tastatura tel pe mobile -->
\`\`\`

**Noi atribute de validare:**
\`\`\`html
<input type="text" required>                      <!-- câmp obligatoriu -->
<input type="text" minlength="3" maxlength="50">  <!-- lungime string -->
<input type="number" min="18" max="120">          <!-- interval numeric -->
<input type="number" step="0.01">                 <!-- permite zecimale -->
<input type="text" pattern="[0-9]{6}" title="6 cifre">  <!-- regex -->
<input type="email" multiple>                     <!-- multiple email-uri -->
\`\`\`

**\`<datalist>\`** — autocomplete cu sugestii native:
\`\`\`html
<input list="tech-stack" name="tech" placeholder="Tehnologie">
<datalist id="tech-stack">
  <option value="React">
  <option value="Vue.js">
  <option value="Angular">
  <option value="Next.js">
  <option value="Svelte">
</datalist>
\`\`\`

**\`<details>\` și \`<summary>\`** — accordion nativ fără JavaScript:
\`\`\`html
<details>
  <summary>Ce este HTML5? (click pentru detalii)</summary>
  <p>HTML5 este versiunea modernă a limbajului de marcare HTML,
  care adaugă semantică îmbunătățită, multimedia nativă,
  elemente interactive și API-uri JavaScript avansate.</p>
</details>

<details open>
  <summary>Deschis la start</summary>
  <p>Atributul <code>open</code> îl face vizibil inițial.</p>
</details>
\`\`\`

**\`<dialog>\`** — modal nativ:
\`\`\`html
<dialog id="confirm-dialog">
  <h2>Confirmare</h2>
  <p>Ești sigur că vrei să ștergi?</p>
  <button onclick="document.getElementById('confirm-dialog').close()">Anulează</button>
  <button onclick="doDelete()">Șterge</button>
</dialog>
<button onclick="document.getElementById('confirm-dialog').showModal()">Șterge element</button>
\`\`\`

**\`<output>\`** — rezultat calcul dintr-un formular:
\`\`\`html
<form oninput="total.value = parseInt(qty.value) * parseInt(price.value)">
  Cantitate: <input type="number" id="qty" value="1">
  Preț: <input type="number" id="price" value="100">
  Total: <output name="total" for="qty price">100</output> lei
</form>
\`\`\`

• Pe mobile, \`type="date"\`, \`type="color"\` etc. deschid UI native platformei (iOS/Android).
• \`<details>\` nu necesită JavaScript — comportamentul expand/collapse e built-in.
• \`<dialog>.showModal()\` include automat focus trap și Esc pentru închidere.` },

  // L9
  { lesson: "9. Forme avansate — validare HTML5", title: "Atribute de validare", content: `HTML5 oferă **validare nativă** direct în browser — fără JavaScript. Browser-ul verifică și afișează erori automat la submit.

**Atribute de validare esențiale:**
\`\`\`html
<form>
  <!-- required — câmp obligatoriu -->
  <input type="text" name="name" required placeholder="Obligatoriu">

  <!-- minlength / maxlength — lungime string -->
  <input type="text" name="username" minlength="3" maxlength="20" required>

  <!-- min / max — valori numerice și date -->
  <input type="number" name="age" min="18" max="120">
  <input type="date" name="dob" min="1900-01-01" max="2010-01-01">

  <!-- step — intervalul acceptat -->
  <input type="number" name="price" min="0" max="1000" step="0.01">
  <input type="range" min="0" max="100" step="5">

  <!-- pattern — validare cu regex -->
  <input type="text" name="postcode"
    pattern="[0-9]{6}"
    title="Cod poștal din 6 cifre"
    required>

  <input type="text" name="phone"
    pattern="[+][0-9]{11}"
    title="Ex: +40721000000">

  <!-- type-specific validare automată -->
  <input type="email" name="email" required>    <!-- format email -->
  <input type="url" name="website">            <!-- format URL -->

  <button type="submit">Trimite</button>
</form>
\`\`\`

**Mesaje de eroare custom cu JavaScript:**
\`\`\`javascript
const username = document.getElementById('username');

username.addEventListener('input', () => {
  if (username.value.includes(' ')) {
    username.setCustomValidity('Username-ul nu poate conține spații!');
  } else if (username.value.length < 3) {
    username.setCustomValidity('Minimum 3 caractere.');
  } else {
    username.setCustomValidity('');  // ✓ resetează eroarea
  }
});
\`\`\`

**Constraint Validation API:**
\`\`\`javascript
const email = document.getElementById('email');

// Proprietăți validity
email.validity.valueMissing    // true dacă required și gol
email.validity.typeMismatch    // true dacă format greșit (email, url)
email.validity.patternMismatch // true dacă nu respectă pattern
email.validity.tooShort        // true dacă sub minlength
email.validity.tooLong         // true dacă peste maxlength
email.validity.rangeUnderflow  // true dacă sub min
email.validity.rangeOverflow   // true dacă peste max
email.validity.valid           // true dacă totul e OK

// Validare programatică la submit
form.addEventListener('submit', (e) => {
  if (!form.checkValidity()) {
    e.preventDefault();
    form.reportValidity();  // afișează tooltip-urile de eroare
  }
});
\`\`\`

• \`required\` pe \`<select>\` validează dacă prima opțiune are \`value=""\` (placeholder).
• Validarea nativă e prima linie de apărare — **validarea server-side rămâne obligatorie**.
• \`title\` pe \`input[pattern]\` apare în mesajul de eroare al browser-ului.
• \`novalidate\` pe form dezactivează complet validarea nativă — pentru UI custom total.` },

  { lesson: "9. Forme avansate — validare HTML5", title: "Pseudo-clase de validare CSS", content: `CSS oferă **pseudo-clase speciale** pentru stilizarea câmpurilor de formular în funcție de starea lor de validare.

**Pseudo-clasele principale:**
\`\`\`css
/* Stare validă (toate criteriile îndeplinite) */
input:valid { border-color: #2ecc71; }

/* Stare invalidă (criteriu neîndeplinit) */
input:invalid { border-color: #e74c3c; }

/* Câmp obligatoriu */
input:required { background-color: #fffde7; }

/* Câmp opțional (fără required) */
input:optional { border-style: dashed; }

/* Câmpuri numerice în interval */
input:in-range { border-color: #2ecc71; }
input:out-of-range { border-color: #e74c3c; }

/* Câmpuri dezactivate */
input:disabled { opacity: 0.5; cursor: not-allowed; }
input:enabled { cursor: text; }

/* Câmp read-only */
input:read-only { background: #f5f5f5; }
input:read-write { background: white; }

/* Checkbox/radio bifat */
input:checked + label { font-weight: bold; }
\`\`\`

**Problema: erori la încărcarea paginii:**
\`\`\`css
/* RĂU: câmpurile goale par invalide imediat la deschidere */
input:invalid { border-color: red; }

/* BUN: arată erori doar după ce userul a interacționat */
input:not(:focus):not(:placeholder-shown):invalid {
  border-color: #e74c3c;
  background-color: #fde8e8;
}

/* SAU: folosind :user-invalid (suport modern) */
input:user-invalid {
  border-color: #e74c3c;
}
\`\`\`

**Exemplu complet — formular cu feedback vizual:**
\`\`\`css
.form-group { position: relative; margin-bottom: 1.5rem; }

input {
  width: 100%; padding: 10px 40px 10px 12px;
  border: 2px solid #ddd; border-radius: 6px;
  transition: border-color 0.2s;
}
input:focus { outline: none; border-color: #3498db; }

/* Icon de validare cu ::after pe wrapper */
input:valid + .validation-icon::after { content: "✓"; color: #2ecc71; }
input:invalid + .validation-icon::after { content: "✗"; color: #e74c3c; }

/* Mesaj de eroare afișat cu CSS */
input:invalid + .error-msg { display: block; color: #e74c3c; font-size: 0.85rem; }
input:valid + .error-msg { display: none; }
\`\`\`

\`\`\`html
<div class="form-group">
  <label for="email">Email:</label>
  <input type="email" id="email" name="email" required>
  <span class="validation-icon"></span>
  <span class="error-msg">Introdu o adresă de email validă.</span>
</div>
\`\`\`

• **\`:user-invalid\`** — nou în CSS, similar cu \`:invalid\` dar se activează doar după blur.
• **\`:placeholder-shown\`** — selector puternic: câmpul are placeholder-ul vizibil (deci e gol).
• Combinând \`:not(:focus):not(:placeholder-shown):invalid\` obții feedback corect fără biblioteci JS.
• Validarea CSS e feedback vizual — nu înlocuiește validarea JavaScript sau server-side.` },

  { lesson: "9. Forme avansate — validare HTML5", title: "novalidate și custom validation", content: `**\`novalidate\`** dezactivează validarea nativă browser-ului. **Custom validation** cu JavaScript permite logică de validare complexă cu UX complet personalizat.

**Când să folosești \`novalidate\`:**
• Vrei să controlezi complet UI-ul de erori (design system custom).
• Validezi asincron (ex: verifici dacă email-ul există deja în baza de date).
• Folosești o bibliotecă de validare (React Hook Form, Yup, Zod).

\`\`\`html
<form id="register-form" novalidate>
  <div class="field">
    <label for="email">Email:</label>
    <input type="email" id="email" name="email" required>
    <span class="error" id="email-error" role="alert"></span>
  </div>

  <div class="field">
    <label for="pass">Parolă:</label>
    <input type="password" id="pass" name="password" required minlength="8">
    <span class="error" id="pass-error" role="alert"></span>
  </div>

  <button type="submit">Înregistrare</button>
</form>
\`\`\`

**Validare custom completă:**
\`\`\`javascript
const form = document.getElementById('register-form');

// Validatori individuali
const validators = {
  email: (val) => {
    if (!val) return 'Email-ul este obligatoriu.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) return 'Format email invalid.';
    return null; // valid
  },
  password: (val) => {
    if (!val) return 'Parola este obligatorie.';
    if (val.length < 8) return 'Minimum 8 caractere.';
    if (!/[A-Z]/.test(val)) return 'Cel puțin o literă mare.';
    if (!/[0-9]/.test(val)) return 'Cel puțin o cifră.';
    return null;
  }
};

function showError(fieldId, message) {
  const field = document.getElementById(fieldId);
  const error = document.getElementById(fieldId + '-error');
  field.setAttribute('aria-invalid', message ? 'true' : 'false');
  error.textContent = message || '';
}

function validateField(fieldId) {
  const value = document.getElementById(fieldId).value;
  const error = validators[fieldId]?.(value);
  showError(fieldId, error);
  return !error;
}

// Validare live la blur
['email', 'pass'].forEach(id => {
  document.getElementById(id).addEventListener('blur', () => validateField(id));
});

// Validare la submit
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const emailOk = validateField('email');
  const passOk  = validateField('pass');

  if (!emailOk || !passOk) {
    document.querySelector('[aria-invalid="true"]').focus();
    return;
  }

  // Validare asincronă (ex: email unic)
  const emailVal = document.getElementById('email').value;
  const res = await fetch('/api/check-email?email=' + encodeURIComponent(emailVal));
  const { exists } = await res.json();
  if (exists) { showError('email', 'Adresa este deja înregistrată.'); return; }

  form.submit();
});
\`\`\`

• \`role="alert"\` pe containerul de eroare — screen reader-ul citește eroarea imediat.
• \`aria-invalid="true"\` pe input invalid — standard ARIA pentru formulare.
• Focusează primul câmp invalid la submit — ghidează utilizatorul.
• Validare la \`blur\` (pierdere focus) e mai UX-friendly decât la \`input\` (fiecare tastă).
• **Nu uita validarea server-side** — clientul poate trimite orice, indiferent de JS.` },

  // L10
  { lesson: "10. Multimedia — audio și video", title: "Tag <audio>", content: `**\`<audio>\`** redă fișiere audio în browser fără plugin-uri. Browser-ul oferă player nativ sau poți construi un player custom cu JavaScript.

**Sintaxa de bază:**
\`\`\`html
<!-- Un singur fișier -->
<audio src="podcast.mp3" controls>
  Browser-ul tău nu suportă audio HTML5.
</audio>

<!-- Multiple surse (cel mai compatibil) -->
<audio controls preload="metadata">
  <source src="podcast.ogg" type="audio/ogg; codecs=vorbis">
  <source src="podcast.mp3" type="audio/mpeg">
  <source src="podcast.wav" type="audio/wav">
  <p>Browser-ul nu suportă audio.
    <a href="podcast.mp3">Descarcă fișierul</a>.
  </p>
</audio>
\`\`\`

**Atributele \`<audio>\`:**
• **\`controls\`** — player nativ (play/pause, progres, volum, mute).
• **\`autoplay\`** — pornire automată (blocat în multe browsere fără interacțiune).
• **\`loop\`** — reia de la început.
• **\`muted\`** — fără sunet; permite autoplay pe desktop.
• **\`preload\`**: \`"none"\` (nu preîncărca), \`"metadata"\` (durată, tags), \`"auto"\` (tot).

**Player audio custom:**
\`\`\`html
<div class="player">
  <audio id="audio" src="track.mp3" preload="metadata"></audio>

  <button id="btn" onclick="togglePlay()">▶</button>
  <span id="current">0:00</span>
  <input type="range" id="seek" value="0" step="1">
  <span id="duration">0:00</span>
  <input type="range" id="vol" min="0" max="1" step="0.1" value="1"
    oninput="audio.volume = this.value">
</div>
\`\`\`

\`\`\`javascript
const audio = document.getElementById('audio');
const btn   = document.getElementById('btn');
const seek  = document.getElementById('seek');

function fmt(s) {
  return Math.floor(s/60) + ':' + String(Math.floor(s%60)).padStart(2,'0');
}

function togglePlay() {
  audio.paused ? audio.play() : audio.pause();
  btn.textContent = audio.paused ? '▶' : '⏸';
}

audio.addEventListener('loadedmetadata', () => {
  seek.max = Math.floor(audio.duration);
  document.getElementById('duration').textContent = fmt(audio.duration);
});

audio.addEventListener('timeupdate', () => {
  seek.value = Math.floor(audio.currentTime);
  document.getElementById('current').textContent = fmt(audio.currentTime);
});

seek.addEventListener('input', () => { audio.currentTime = seek.value; });
\`\`\`

**Formate audio:**
\`\`\`
MP3  → suport universal, lossy, ideal pentru muzică/podcast
OGG  → open source (Vorbis/Opus), Firefox/Chrome
AAC  → calitate mai bună decât MP3, iOS/Safari
Opus → cel mai eficient (WebM), suport modern larg
WAV  → lossless, fișiere mari — doar pentru sunete scurte UI
\`\`\`

• Autoplay fără interacțiunea utilizatorului e blocat — e politică deliberată a browser-elor.
• \`preload="none"\` pentru pagini cu multe audio-uri — economisește bandwidth.
• Web Audio API (\`AudioContext\`) oferă efecte audio avansate (equalizer, reverb, spațializare).` },

  { lesson: "10. Multimedia — audio și video", title: "Tag <video>", content: `**\`<video>\`** permite includerea clipurilor video direct în pagină, cu player nativ sau custom, fără Flash.

**Sintaxa completă:**
\`\`\`html
<video
  width="800" height="450"
  controls
  poster="thumbnail.jpg"
  preload="metadata"
  playsinline
>
  <source src="tutorial.webm" type="video/webm; codecs=vp9">
  <source src="tutorial.mp4"  type="video/mp4">
  <track
    src="subtitles-ro.vtt"
    kind="subtitles"
    srclang="ro"
    label="Română"
    default
  >
  <p>Browser-ul tău nu suportă video HTML5.
    <a href="tutorial.mp4">Descarcă videoclipul</a>.
  </p>
</video>
\`\`\`

**Atributele \`<video>\`:**
• **\`controls\`** — player nativ (play, pause, volum, fullscreen, calitate).
• **\`autoplay muted\`** — autoplay necesită \`muted\` pe desktop; pe mobile și \`playsinline\`.
• **\`loop\`** — reia la final.
• **\`poster\`** — thumbnail afișat înainte de pornire.
• **\`preload\`** — \`"none"\`/\`"metadata"\`/\`"auto"\`.
• **\`playsinline\`** — iOS: redă în pagină, nu fullscreen automat.
• **\`crossorigin\`** — pentru video de pe alt domeniu cu CORS.

**Control complet cu JavaScript:**
\`\`\`javascript
const video = document.querySelector('video');

// Playback
video.play();
video.pause();
video.currentTime = 120;    // sari la 2 minute
video.volume = 0.7;          // volum 70%
video.muted = true;
video.playbackRate = 1.5;    // viteză 1.5x (0.25 - 16)

// State
video.paused        // true/false
video.ended         // true la final
video.duration      // durata în secunde
video.currentTime   // poziția curentă
video.readyState    // 0-4 (nivelul de încărcare)
video.buffered      // TimeRanges buffered

// Fullscreen
video.requestFullscreen();
document.exitFullscreen();

// Events
video.addEventListener('play', () => console.log('Playing'));
video.addEventListener('pause', () => console.log('Paused'));
video.addEventListener('ended', () => console.log('Ended'));
video.addEventListener('error', (e) => console.error('Error', e));
video.addEventListener('timeupdate', () => {
  const pct = (video.currentTime / video.duration * 100).toFixed(1);
  progressBar.style.width = pct + '%';
});
\`\`\`

**Formate video recomandate:**
\`\`\`
WebM (VP9)  → open source, ~30% mai mic decât MP4
MP4 (H.264) → suport universal, fallback sigur
WebM (AV1)  → cel mai eficient, browsere moderne
\`\`\`

**Lazy loading video:**
\`\`\`html
<video data-src="video.mp4" poster="thumb.jpg" controls loading="lazy">
</video>
\`\`\`

• \`poster\` important — evită frame-ul negru la încărcare.
• \`<track kind="subtitles">\` e obligatoriu pentru accesibilitate (WCAG 2.1 AA).
• Video mare pe pagina principală → consideră Cloudflare Stream, Mux, sau Bunny.net.` },

  { lesson: "10. Multimedia — audio și video", title: "API JavaScript pentru media", content: `**HTMLMediaElement API** oferă control complet asupra elementelor \`<audio>\` și \`<video>\` din JavaScript — evenimente, stare, playback, buffer.

**Proprietăți importante:**
\`\`\`javascript
const media = document.querySelector('video'); // sau audio

// Playback state
media.paused          // bool: este în pauză?
media.playing         // bool: se redă activ?
media.ended           // bool: s-a terminat?
media.seeking         // bool: caută o poziție?
media.readyState      // 0=HAVE_NOTHING, 1=HAVE_METADATA, 4=HAVE_ENOUGH_DATA

// Time & duration
media.currentTime     // float: secunda curentă (citire/scriere)
media.duration        // float: durata totală în secunde
media.buffered        // TimeRanges: ce e buffered

// Playback control
media.volume          // 0.0 - 1.0
media.muted           // bool (independent de volum)
media.playbackRate    // 0.25 - 16 (1 = normal)
media.defaultMuted    // valoarea muted din atribut HTML
media.loop            // bool

// Sursă
media.src             // URL sursă curentă
media.currentSrc      // sursă efectiv folosită (după <source> fallback)
\`\`\`

**Evenimente principale:**
\`\`\`javascript
media.addEventListener('loadstart',      () => console.log('Start încărcare'));
media.addEventListener('loadedmetadata', () => console.log('Metadata gata', media.duration));
media.addEventListener('loadeddata',     () => console.log('Date frame curent gata'));
media.addEventListener('canplay',        () => console.log('Poate reda'));
media.addEventListener('canplaythrough', () => console.log('Poate reda până la final'));

media.addEventListener('play',      () => updateUI('playing'));
media.addEventListener('pause',     () => updateUI('paused'));
media.addEventListener('ended',     () => playNext());
media.addEventListener('timeupdate', updateProgress);
media.addEventListener('volumechange', updateVolume);
media.addEventListener('ratechange',  () => console.log('Viteză:', media.playbackRate));
media.addEventListener('error',      handleError);
\`\`\`

**Media Source Extensions (streaming adaptiv):**
\`\`\`javascript
const video = document.querySelector('video');
const mediaSource = new MediaSource();
video.src = URL.createObjectURL(mediaSource);

mediaSource.addEventListener('sourceopen', () => {
  const sourceBuffer = mediaSource.addSourceBuffer('video/webm; codecs="vp9"');
  fetch('video-chunk-1.webm')
    .then(r => r.arrayBuffer())
    .then(buffer => sourceBuffer.appendBuffer(buffer));
});
\`\`\`

**Playlist simplu:**
\`\`\`javascript
const playlist = ['track1.mp3', 'track2.mp3', 'track3.mp3'];
let currentIndex = 0;
const audio = document.querySelector('audio');

function playTrack(index) {
  audio.src = playlist[index];
  audio.play();
  document.getElementById('track-name').textContent = \`Track \${index + 1}\`;
}

audio.addEventListener('ended', () => {
  currentIndex = (currentIndex + 1) % playlist.length;
  playTrack(currentIndex);
});

document.getElementById('next').onclick = () => {
  currentIndex = (currentIndex + 1) % playlist.length;
  playTrack(currentIndex);
};
\`\`\`

• \`media.play()\` returnează o \`Promise\` — \`await media.play().catch(e => console.log(e))\`.
• \`loadedmetadata\` — primul eveniment sigur unde \`duration\` e disponibil.
• \`timeupdate\` se declanșează la ~4 ori/secundă — nu mai des.
• Intersection Observer + media API = auto-pause când video iese din viewport.` },

  // L11
  { lesson: "11. Iframe și conținut încorporat", title: "Tag <iframe>", content: `**\`<iframe>\`** (inline frame) include o altă pagină web în interiorul paginii curente. Folosit pentru embed-uri YouTube, Google Maps, widget-uri externe.

\`\`\`html
<!-- Embed YouTube -->
<iframe
  width="560"
  height="315"
  src="https://www.youtube.com/embed/VIDEO_ID"
  title="Tutorial HTML5 — DevZone"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowfullscreen
  loading="lazy"
></iframe>

<!-- Google Maps -->
<iframe
  src="https://www.google.com/maps/embed?pb=..."
  width="600" height="450"
  style="border:0"
  allowfullscreen
  loading="lazy"
  referrerpolicy="no-referrer-when-downgrade"
  title="Harta sediu DevZone"
></iframe>

<!-- Pagină proprie -->
<iframe
  src="/preview.html"
  width="100%" height="500"
  title="Previzualizare document"
></iframe>
\`\`\`

**Atributele \`<iframe>\`:**
• **\`src\`** — URL-ul conținutului.
• **\`title\`** — **obligatoriu** pentru accesibilitate.
• **\`loading="lazy"\`** — se încarcă doar când intră în viewport.
• **\`frameborder="0"\`** — elimină bordura (depășit; folosește \`border: none\` CSS).
• **\`allowfullscreen\`** — permite fullscreen.
• **\`referrerpolicy\`** — controlează headerul Referer trimis.
• **\`sandbox\`** — restricționează permisiunile (mai jos).
• **\`allow\`** — permite feature-uri specifice (\`camera\`, \`microphone\`, \`payment\`).

**Responsive iframe (aspect ratio fix):**
\`\`\`html
<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;">
  <iframe
    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
    src="..."
    title="Video"
  ></iframe>
</div>
\`\`\`

\`\`\`css
/* Modern CSS — aspect-ratio */
iframe.video { width: 100%; aspect-ratio: 16 / 9; }
\`\`\`

**Comunicare JS cu iframe (postMessage):**
\`\`\`javascript
const iframe = document.querySelector('iframe');
// Parent → iframe
iframe.contentWindow.postMessage({ cmd: 'play' }, 'https://example.com');

// Recepție în pagina din iframe
window.addEventListener('message', (event) => {
  if (event.origin !== 'https://trusted.com') return; // verificare!
  console.log(event.data);
});
\`\`\`

• \`title\` pe iframe — screen reader citește "Cadru: Tutorial HTML5 — DevZone".
• Same-origin policy — JS nu poate accesa DOM-ul unui iframe de pe alt domeniu.
• \`X-Frame-Options: SAMEORIGIN\` pe server — blochează includerea site-ului tău în iframe terț.` },

  { lesson: "11. Iframe și conținut încorporat", title: "Securitate iframe", content: `Atributul **\`sandbox\`** restricționează ce poate face conținutul dintr-un \`<iframe>\` — esențial pentru securitate când incluzi conținut terț sau user-generated.

**Fără sandbox vs cu sandbox:**
\`\`\`html
<!-- Iframe normal — conținutul are toate permisiunile -->
<iframe src="user-content.html"></iframe>

<!-- Sandbox complet — nimic permis -->
<iframe src="user-content.html" sandbox></iframe>

<!-- Permisiuni selective -->
<iframe src="widget.html" sandbox="allow-scripts allow-same-origin"></iframe>
\`\`\`

**Valorile \`sandbox\`:**
\`\`\`
allow-scripts           → Permite JavaScript
allow-same-origin       → Tratează ca aceeași origine
allow-forms             → Permite submit formulare
allow-popups            → Permite window.open(), target="_blank"
allow-top-navigation    → Permite navigarea ferestrei parent
allow-modals            → Permite alert(), confirm(), prompt()
allow-downloads         → Permite descărcarea fișierelor
allow-pointer-lock      → Permite Pointer Lock API
\`\`\`

**Exemple practice:**
\`\`\`html
<!-- Editor de cod live — JS izolat, fără acces la parent -->
<iframe
  sandbox="allow-scripts"
  src="code-preview.html"
  title="Previzualizare cod utilizator"
></iframe>

<!-- Formular embed terț — necesită forms + scripts -->
<iframe
  sandbox="allow-forms allow-scripts allow-same-origin"
  src="https://forms.partner.com/survey"
  title="Formular survey"
></iframe>

<!-- Reclamă terță — fără JS, fără forms -->
<iframe
  sandbox
  src="https://ads-network.com/banner/42"
  title="Publicitate"
></iframe>
\`\`\`

**Pericol: \`allow-scripts\` + \`allow-same-origin\` împreună:**
\`\`\`
Această combinație permite iframe-ului să:
1. Ruleze JavaScript
2. Acceseze localStorage/cookies ale domeniului
3. Ocolească sandbox-ul

→ EVITĂ această combinație pentru conținut neîncredibil!
→ Folosește allow-scripts FĂRĂ allow-same-origin pentru izolare maximă.
\`\`\`

**Clickjacking protection:**
\`\`\`
HTTP Header pe serverul tău (protejează SITE-UL TĂU):
X-Frame-Options: SAMEORIGIN
  → Permite iframe doar de pe același domeniu

X-Frame-Options: DENY
  → Nu permite iframe de nicăieri

Content-Security-Policy: frame-ancestors 'self' https://trusted.com
  → Versiunea modernă (CSP) — mai flexibilă
\`\`\`

• **Clickjacking** — atac unde site-ul malițios include pagina ta în iframe invizibil și păcălește utilizatorii să dea click.
• \`sandbox\` fără valori = restricții maxime — "zero trust".
• Testează sandbox în DevTools → Console — erori de permisiune arată ce e blocat.
• YouTube, Stripe, Calendly — toate folosesc iframe-uri secure cu sandbox și CSP.` },

  { lesson: "11. Iframe și conținut încorporat", title: "<embed> și <object>", content: `**\`<embed>\`** și **\`<object>\`** sunt alternative la \`<iframe>\` pentru conținut embedded. Astăzi, \`<iframe>\` este preferat, dar \`<embed>\` și \`<object>\` rămân în uz pentru PDF-uri și SVG.

**\`<embed>\`** — embed simplu (element void):
\`\`\`html
<!-- PDF inline -->
<embed
  src="document.pdf"
  type="application/pdf"
  width="100%"
  height="600px"
>

<!-- SVG (alternativă la <img> sau inline) -->
<embed src="diagram.svg" type="image/svg+xml" width="400" height="300">

<!-- Video (depășit — folosește <video>) -->
<embed src="video.mp4" type="video/mp4" width="640" height="360">
\`\`\`

**\`<object>\`** — embed cu fallback:
\`\`\`html
<!-- PDF cu fallback complet -->
<object
  data="raport.pdf"
  type="application/pdf"
  width="100%"
  height="600"
>
  <!-- Fallback dacă PDF-ul nu poate fi afișat -->
  <p>
    PDF-ul nu poate fi afișat direct.
    <a href="raport.pdf" download>Descarcă raportul PDF</a>
  </p>
</object>

<!-- SVG cu fallback PNG -->
<object data="diagram.svg" type="image/svg+xml" width="400" height="300">
  <img src="diagram.png" alt="Diagramă arhitectură">
</object>
\`\`\`

**\`<param>\`** — parametri pentru \`<object>\`:**
\`\`\`html
<object data="app.swf" type="application/x-shockwave-flash">
  <param name="autoplay" value="true">
  <param name="loop" value="false">
  <p>Flash nu mai este suportat.</p>
</object>
\`\`\`

**Comparație practică:**
\`\`\`
<iframe>    → Prima alegere pentru pagini externe, YouTube, Maps
<embed>     → PDF-uri inline, SVG simplu
<object>    → PDF-uri cu fallback, SVG cu fallback
<video>     → Întotdeauna pentru video (nu <embed> sau <object>!)
<audio>     → Întotdeauna pentru audio
<img>       → Întotdeauna pentru imagini statice
\`\`\`

**PDF modern — alternativa JavaScript:**
\`\`\`html
<!-- PDF.js (Mozilla) — renderizare JavaScript completă -->
<canvas id="pdf-canvas"></canvas>
<script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js"></script>
<script>
  pdfjsLib.getDocument('document.pdf').promise.then(pdf => {
    pdf.getPage(1).then(page => {
      const canvas = document.getElementById('pdf-canvas');
      const ctx = canvas.getContext('2d');
      const viewport = page.getViewport({ scale: 1.5 });
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      page.render({ canvasContext: ctx, viewport });
    });
  });
</script>
\`\`\`

• \`<embed>\` nu are tag de închidere — element void.
• \`<object>\` suportă fallback prin conținut interior — mai robust.
• Afișarea PDF-urilor cu \`<object>\`/\`<embed>\` depinde de plugin-urile browser-ului — nu garantat pe mobile.
• Recomandare modernă: link de descărcare + PDF.js pentru preview garantat cross-browser.` },

  // L12
  { lesson: "12. Meta tags și SEO", title: "Open Graph (Facebook, LinkedIn)", content: `**Open Graph** (OG) controlează cum arată pagina ta când e distribuită pe Facebook, LinkedIn, WhatsApp, Discord și alte platforme sociale.

**Tag-uri Open Graph esențiale:**
\`\`\`html
<head>
  <!-- Required de specificația Open Graph -->
  <meta property="og:title" content="Ghid Complet HTML5 — DevZone">
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://devzone.ro/cursuri/html">
  <meta property="og:image" content="https://devzone.ro/og-images/html-course.jpg">

  <!-- Recomandat -->
  <meta property="og:description" content="Ghid complet HTML5 cu 35 de lecții interactive, exemple practice și exerciții. De la tag-uri de bază la HTML semantic și accesibilitate.">
  <meta property="og:site_name" content="DevZone">
  <meta property="og:locale" content="ro_RO">
  <meta property="og:locale:alternate" content="en_US">

  <!-- Specificații imagine -->
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="Banner curs HTML — DevZone">
  <meta property="og:image:type" content="image/jpeg">
</head>
\`\`\`

**Tipuri \`og:type\`:**
\`\`\`
website  → pagini generale
article  → blog posts, știri
product  → produse e-commerce
video.other → pagini cu video
music.song  → muzică
book     → cărți
profile  → profiluri utilizator
\`\`\`

**Open Graph pentru articole:**
\`\`\`html
<meta property="og:type" content="article">
<meta property="article:published_time" content="2024-01-15T09:00:00+02:00">
<meta property="article:modified_time" content="2024-01-20T14:30:00+02:00">
<meta property="article:author" content="https://devzone.ro/autori/cristi">
<meta property="article:section" content="Frontend Development">
<meta property="article:tag" content="HTML">
<meta property="article:tag" content="Web Development">
\`\`\`

**Imaginea OG — specificații:**
\`\`\`
Dimensiune recomandată: 1200 × 630 px (ratio 1.91:1)
Dimensiune minimă:      600 × 315 px
Format:                 JPEG sau PNG (JPEG preferat pentru size)
Size maxim:             8MB (practic, sub 300KB)
Text:                   evită text important la margini
\`\`\`

**Twitter Cards (complementar OG):**
\`\`\`html
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:site" content="@DevZoneRO">
<meta name="twitter:title" content="Ghid Complet HTML5">
<meta name="twitter:description" content="35 lecții interactive.">
<meta name="twitter:image" content="https://devzone.ro/og/html.jpg">
\`\`\`
Twitter verifică \`twitter:*\` mai întâi, apoi folosește OG ca fallback.

**Testare:**
• **Facebook Sharing Debugger**: developers.facebook.com/tools/debug
• **LinkedIn Post Inspector**: linkedin.com/post-inspector
• **Twitter/X Card Validator**: cards-dev.twitter.com/validator

• OG tags sunt citite la momentul share-ului — nu necesită JavaScript.
• Platformele cachează OG data — după schimbări, forțează re-fetch cu debugger-ul.
• Fără OG tags, platformele generează preview automat — de obicei prost.` },

  { lesson: "12. Meta tags și SEO", title: "Schema.org (structured data)", content: `**Schema.org** este un vocabular de metadate structurate recunoscut de Google, Bing și alte motoare de căutare. Adăugat ca **JSON-LD**, îmbogățește rezultatele de căutare cu **rich snippets**.

**JSON-LD** — formatul recomandat de Google:
\`\`\`html
<!-- Articol de blog -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Ghid Complet HTML5",
  "description": "Ghid HTML5 cu 35 lecții interactive.",
  "image": "https://devzone.ro/og/html-course.jpg",
  "author": {
    "@type": "Person",
    "name": "Cristi Usatii",
    "url": "https://devzone.ro/autori/cristi"
  },
  "publisher": {
    "@type": "Organization",
    "name": "DevZone",
    "logo": {
      "@type": "ImageObject",
      "url": "https://devzone.ro/logo.png"
    }
  },
  "datePublished": "2024-01-15",
  "dateModified": "2024-01-20"
}
</script>
\`\`\`

**FAQ Schema** — apare ca accordion în Google:**
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
        "text": "HTML5 este versiunea modernă a limbajului de marcare HTML, cu elemente semantice, multimedia nativă și API-uri avansate."
      }
    },
    {
      "@type": "Question",
      "name": "Cât durează să înveți HTML5?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Cu studiu dedicat 2-3 ore pe zi, poți învăța HTML5 de bază în 2-4 săptămâni."
      }
    }
  ]
}
</script>
\`\`\`

**BreadcrumbList Schema:**
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

**Course Schema** — pentru platforme educaționale:
\`\`\`html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "HTML5 Complet",
  "description": "Ghid complet HTML5 cu 35 de lecții.",
  "provider": { "@type": "Organization", "name": "DevZone", "sameAs": "https://devzone.ro" },
  "hasCourseInstance": { "@type": "CourseInstance", "courseMode": "online" }
}
</script>
\`\`\`

**Tipuri Schema.org comune:**
\`\`\`
Article, BlogPosting → articole
FAQPage             → pagini FAQ (accordion în Google)
HowTo               → tutoriale pas cu pas
Product             → produse (stele, preț în rezultate)
Recipe              → rețete
LocalBusiness       → afaceri locale (Maps, info box)
BreadcrumbList      → breadcrumb în URL Google
Course              → cursuri
\`\`\`

• **Rich Test Tool**: search.google.com/test/rich-results — validare JSON-LD.
• JSON-LD în \`<head>\` sau \`<body>\` — Google acceptă ambele.
• Nu inventa date false în Schema.org — penalizare Google Panda.
• Microdata și RDFa sunt alternative la JSON-LD — dar JSON-LD e recomandat de Google.` },
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
