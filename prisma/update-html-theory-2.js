"use strict";
require("dotenv").config({ path: ".env" });
const { PrismaClient } = require("@prisma/client");
const p = new PrismaClient();

const UPDATES = [
  // L13: Accesibilitate (a11y) și ARIA
  { lesson: "13. Accesibilitate (a11y) și ARIA", title: "Principii de accesibilitate", content: `**Accesibilitatea web** (a11y) înseamnă că site-ul tău poate fi folosit de toți utilizatorii, inclusiv cei cu dizabilități. În România și UE, accesibilitatea este cerință legală pentru site-urile publice (WCAG 2.1 AA).

**Cei 4 piloni WCAG (Web Content Accessibility Guidelines):**
\`\`\`
PERCEPTIBIL  → Conținutul poate fi perceput de toți utilizatorii
  • Text alternativ pentru imagini
  • Subtitrări pentru video
  • Contrast suficient (minim 4.5:1 pentru text normal)

OPERABIL     → Interfața poate fi folosită de toți
  • Navigare completă cu tastatura
  • Timp suficient pentru acțiuni
  • Fără conținut care cauzează convulsii (blink < 3/sec)

INTELIGIBIL  → Conținutul și UI-ul sunt ușor de înțeles
  • Limbaj simplu, identificarea limbii (lang="ro")
  • Etichete clare pentru formulare
  • Prevenirea erorilor

ROBUST       → Conținut interpretabil corect de tehnologii asistive
  • HTML valid, semantic corect
  • Compatibil cu screen readere actuale
\`\`\`

**Utilizatori afectați:**
• **Nevăzători/slab văzători** — screen readere (NVDA, VoiceOver, JAWS), mărire text.
• **Surzi/cu auz redus** — subtitrări, transcript audio.
• **Motorii** — navigare cu tastatura, switch access, eye tracking.
• **Cognitivi** — limbaj simplu, structură clară, timp extins.
• **Temporar** — mână ruptă, soare în ochi, context zgomotos.

**Checklist de bază:**
\`\`\`html
<!-- 1. Limbă setată -->
<html lang="ro">

<!-- 2. Alt la imagini -->
<img src="photo.jpg" alt="Descriere clară">

<!-- 3. Etichete la formulare -->
<label for="email">Email:</label>
<input type="email" id="email">

<!-- 4. Heading-uri ierarhice -->
<h1>Titlu</h1> <h2>Secțiune</h2> <h3>Subsecțiune</h3>

<!-- 5. Focus vizibil -->
<style>:focus { outline: 2px solid #3498db; }</style>

<!-- 6. Contrast text (verifică cu WebAIM Contrast Checker) -->
<p style="color: #333; background: #fff;">Text cu contrast 12.6:1 ✓</p>
\`\`\`

**Tools de testare:**
• **WAVE** (wave.webaim.org) — extensie browser pentru audit vizual.
• **axe DevTools** — extensie Chrome/Firefox pentru audit automat.
• **Lighthouse** (Chrome DevTools) — scor accesibilitate 0-100.
• **NVDA** (Windows, gratuit) — screen reader pentru testare manuală.
• **VoiceOver** (Mac/iOS, built-in) — Cmd+F5 pe Mac.

• Accesibilitatea ajută toți utilizatorii: subtitrările sunt folositoare și fără dizabilități.
• 15% din populația mondială are o formă de dizabilitate — nu e un caz marginal.
• Accesibilitatea bună = SEO mai bun (structură semantică, alt text, headings corecte).` },

  { lesson: "13. Accesibilitate (a11y) și ARIA", title: "ARIA — atribute", content: `**ARIA** (Accessible Rich Internet Applications) adaugă semantică HTML elementelor când elementele native nu sunt suficiente. Regula de aur: **folosește ARIA doar când HTML semantic nu e disponibil**.

**Regula #1: Nu folosi ARIA dacă există element semantic nativ:**
\`\`\`html
<!-- RĂU: div cu ARIA în loc de buton nativ -->
<div role="button" tabindex="0" onclick="submit()">Trimite</div>

<!-- BUN: element nativ cu comportament built-in -->
<button onclick="submit()">Trimite</button>
\`\`\`

**Atributele ARIA principale:**

**\`role\`** — definește rolul elementului:
\`\`\`html
<div role="main">Conținut principal</div>          <!-- mai bine <main> -->
<div role="navigation">Meniu</div>                 <!-- mai bine <nav> -->
<div role="dialog" aria-modal="true">Modal</div>  <!-- nu există element nativ -->
<div role="tablist">                              <!-- UI tabs custom -->
  <button role="tab" aria-selected="true">Tab 1</button>
  <button role="tab" aria-selected="false">Tab 2</button>
</div>
<div role="tabpanel">Conținut tab 1</div>
\`\`\`

**\`aria-label\`** — etichetă pentru screen reader:
\`\`\`html
<!-- Buton cu icon fără text vizibil -->
<button aria-label="Șterge produsul Laptop Pro">
  <svg aria-hidden="true">...</svg>
</button>

<!-- Input fără label vizibil (evita, dar uneori necesar) -->
<input type="search" aria-label="Caută în site">

<!-- Diferențierea elementelor identice -->
<nav aria-label="Navigare principală">...</nav>
<nav aria-label="Navigare breadcrumb">...</nav>
\`\`\`

**\`aria-labelledby\`** și **\`aria-describedby\`:**
\`\`\`html
<h2 id="form-title">Formular contact</h2>
<form aria-labelledby="form-title">
  <label for="email">Email:</label>
  <input type="email" id="email"
    aria-describedby="email-hint email-error">
  <p id="email-hint">Format: user@exemplu.ro</p>
  <p id="email-error" role="alert"></p>
</form>
\`\`\`

**\`aria-expanded\`**, **\`aria-hidden\`**, **\`aria-live\`:**
\`\`\`html
<!-- Meniu dropdown custom -->
<button aria-expanded="false" aria-controls="menu">Meniu</button>
<ul id="menu" hidden>...</ul>

<!-- Decoratii invizibile pentru screen reader -->
<span aria-hidden="true">★★★★☆</span>
<span class="sr-only">4 din 5 stele</span>

<!-- Anunțuri dinamice (ex: notificări) -->
<div role="status" aria-live="polite">
  Mesajul a fost trimis cu succes.
</div>
<div role="alert" aria-live="assertive">
  Eroare: câmpul email este obligatoriu.
</div>
\`\`\`

**\`aria-live\` values:**
• \`polite\` — anunț la pauza curentă (notificări normale).
• \`assertive\` — anunț imediat, întrerupe (erori critice).

• \`aria-hidden="true"\` pe icoane decorative — evită "SVG unnamed" în screen reader.
• \`class="sr-only"\` cu \`position: absolute; clip: rect(0,0,0,0)\` — text vizibil doar pentru screen readere.
• **5 reguli ARIA**: nu folosi role dacă există HTML nativ; nu re-assugn roluri native; etc.` },

  { lesson: "13. Accesibilitate (a11y) și ARIA", title: "Skip links și landmark roles", content: `**Skip links** și **landmark roles** permit utilizatorilor cu screen readere sau tastatură să navigheze eficient fără a trece prin fiecare element repetitiv.

**Skip links — sări la conținut:**
\`\`\`html
<!-- PRIMUL element în <body> -->
<a href="#main-content" class="skip-link">Sari la conținutul principal</a>
<a href="#main-nav" class="skip-link">Sari la navigare</a>

<header>
  <nav id="main-nav">...</nav>
</header>

<main id="main-content">
  <h1>Conținut principal</h1>
</main>
\`\`\`

\`\`\`css
.skip-link {
  position: absolute;
  top: -100%;
  left: 0;
  padding: 8px 16px;
  background: #2c3e50;
  color: white;
  text-decoration: none;
  z-index: 9999;
}
.skip-link:focus {
  top: 0;  /* vizibil când e focusat cu Tab */
}
\`\`\`

**Landmark roles** — regiunile navigabile ale paginii:
\`\`\`html
<!-- Landmark-uri HTML5 (cu roll implicit) -->
<header>    <!-- role="banner" (la nivel de pagină) -->
<nav>       <!-- role="navigation" -->
<main>      <!-- role="main" -->
<aside>     <!-- role="complementary" -->
<footer>    <!-- role="contentinfo" (la nivel de pagină) -->
<form>      <!-- role="form" (dacă are aria-label) -->
<section>   <!-- role="region" (dacă are aria-labelledby) -->

<!-- ARIA explicit (pentru browsere vechi sau div-uri) -->
<div role="banner">Header</div>
<div role="navigation" aria-label="Principală">Nav</div>
<div role="main">Main content</div>
\`\`\`

**Multiple landmarks de același tip — diferențierea:**
\`\`\`html
<nav aria-label="Navigare principală">
  <ul>...</ul>
</nav>

<nav aria-label="Navigare categorii">
  <ul>...</ul>
</nav>

<nav aria-label="Breadcrumb">
  <ol>...</ol>
</nav>
\`\`\`

**Navigare cu tastatura — obligatorii:**
\`\`\`html
<!-- Toate elementele interactive trebuie să fie focusabile -->
<a href="...">Link ✓ focusabil nativ</a>
<button>Buton ✓ focusabil nativ</button>
<input>Input ✓ focusabil nativ</input>

<!-- Element custom care trebuie focusabil -->
<div tabindex="0" role="button">Element custom</div>

<!-- Ordinea de focus (tabindex pozitiv = rău, evita!) -->
<input tabindex="-1">  <!-- scos din ordinea tab, dar focusabil cu JS -->
<input tabindex="0">   <!-- în ordinea naturală (recomandat) -->
\`\`\`

**Testare cu tastatura:**
\`\`\`
Tab        → navighezi forward prin elemente interactive
Shift+Tab  → navighezi backward
Enter      → activezi link sau buton focusat
Space      → activezi checkbox, buton, selectezi radio
Arrow keys → navighezi în select, radio groups, sliders
Escape     → închizi modals, dropdown-uri
\`\`\`

• Orice site navigabil complet cu tastatura e accesibil și pentru utilizatorii motor impaired.
• Focus order trebuie să urmeze ordinea vizuală logică — nu "sari" pe pagină.
• \`outline: none\` fără alternativă = inaccesibil. Mereu stilizează \`:focus\`.
• VoiceOver (Mac) + Safari, NVDA + Firefox — cele mai comune combinații de testat.` },

  // L14: SVG inline
  { lesson: "14. SVG inline", title: "SVG basics", content: `**SVG** (Scalable Vector Graphics) definește grafice vectoriale în XML. Inline în HTML, SVG-ul e parte din DOM — stilizabil cu CSS și manipulabil cu JavaScript.

**Sintaxa SVG de bază:**
\`\`\`html
<svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">

  <!-- Dreptunghi -->
  <rect x="10" y="10" width="80" height="60"
    fill="#3498db" stroke="#2980b9" stroke-width="2" rx="5"/>

  <!-- Cerc -->
  <circle cx="150" cy="50" r="35"
    fill="#e74c3c" opacity="0.85"/>

  <!-- Elipsă -->
  <ellipse cx="100" cy="150" rx="80" ry="40"
    fill="none" stroke="#2ecc71" stroke-width="3"/>

  <!-- Linie -->
  <line x1="0" y1="0" x2="200" y2="200"
    stroke="#95a5a6" stroke-width="1" stroke-dasharray="5,5"/>

  <!-- Poligon (forma închisă) -->
  <polygon points="100,10 190,180 10,180"
    fill="#f39c12"/>

  <!-- Polilinie (formă deschisă) -->
  <polyline points="10,10 50,90 90,30 130,70 170,20"
    fill="none" stroke="#8e44ad" stroke-width="2"/>

  <!-- Text -->
  <text x="50" y="195" font-family="Arial" font-size="16" fill="#2c3e50"
    text-anchor="middle">SVG Text</text>

</svg>
\`\`\`

**\`viewBox\`** — sistemul de coordonate SVG:
\`\`\`html
<!-- viewBox="minX minY width height" -->
<svg viewBox="0 0 100 100" width="500" height="500">
  <!-- Coordonatele SVG merg 0-100, dar afișat la 500x500 -->
  <circle cx="50" cy="50" r="40" fill="blue"/>
</svg>
\`\`\`

**Structură și grupare:**
\`\`\`html
<svg viewBox="0 0 200 100">
  <!-- Grup de elemente cu transformări comune -->
  <g transform="translate(10, 10)" opacity="0.8">
    <rect width="50" height="30" fill="#3498db"/>
    <text y="20" fill="white">Label</text>
  </g>

  <!-- Definiții reutilizabile -->
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#3498db"/>
      <stop offset="100%" style="stop-color:#2ecc71"/>
    </linearGradient>
  </defs>
  <rect width="200" height="100" fill="url(#grad)"/>
</svg>
\`\`\`

**Atribute de stilizare principale:**
\`\`\`
fill           → culoarea de umplere
stroke         → culoarea conturului
stroke-width   → grosimea conturului
opacity        → transparență (0-1)
fill-opacity   → transparență umplere
stroke-opacity → transparență contur
stroke-dasharray → contur punctat: "10,5"
rx, ry         → border-radius pentru <rect>
\`\`\`

• SVG e vectorial — perfect la orice rezoluție și zoom fără pixelizare.
• Inline SVG face parte din DOM: \`document.querySelector('circle').style.fill = 'red'\`.
• \`viewBox\` cu \`width="100%"\` → SVG responsiv perfect.
• **Inkscape** (gratuit) și **Figma** exportă fișiere SVG optimizate.` },

  { lesson: "14. SVG inline", title: "SVG cu CSS și animații", content: `SVG inline poate fi stilizat complet cu **CSS** și animat cu **CSS animations** sau **SMIL animations** (native SVG).

**Stilizare SVG cu CSS:**
\`\`\`html
<svg class="icon" viewBox="0 0 24 24">
  <circle class="icon-circle" cx="12" cy="12" r="10"/>
  <path class="icon-path" d="M8 12 L12 16 L16 8"/>
</svg>

<style>
.icon { width: 48px; height: 48px; }
.icon-circle {
  fill: none;
  stroke: #3498db;
  stroke-width: 2;
  transition: stroke 0.3s;
}
.icon-path {
  stroke: #3498db;
  stroke-width: 2;
  stroke-linecap: round;
  fill: none;
}
.icon:hover .icon-circle { stroke: #e74c3c; }
.icon:hover .icon-path { stroke: #e74c3c; }
</style>
\`\`\`

**Animații CSS pe SVG:**
\`\`\`html
<svg viewBox="0 0 100 100" width="200" height="200">
  <!-- Rotație continuă -->
  <circle class="spin" cx="50" cy="50" r="40"
    fill="none" stroke="#3498db" stroke-width="5"
    stroke-dasharray="200" stroke-dashoffset="50"/>
</svg>

<style>
@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
@keyframes dash { to { stroke-dashoffset: 0; } }

.spin {
  transform-origin: center;
  animation: spin 2s linear infinite;
}
</style>
\`\`\`

**Animație stroke-dashoffset (loading spinner):**
\`\`\`html
<svg viewBox="0 0 36 36" class="spinner">
  <circle cx="18" cy="18" r="15.9" fill="none" stroke="#eee" stroke-width="3"/>
  <circle cx="18" cy="18" r="15.9" fill="none"
    stroke="#3498db" stroke-width="3"
    stroke-dasharray="100 100"
    stroke-dashoffset="75"
    stroke-linecap="round"
    class="arc"/>
</svg>

<style>
.spinner { animation: spin 2s linear infinite; }
.arc { animation: dash 1.5s ease-in-out infinite; }
@keyframes spin { 100% { transform: rotate(360deg); } }
@keyframes dash {
  0%   { stroke-dasharray:  1 200; stroke-dashoffset:  0; }
  50%  { stroke-dasharray: 89 200; stroke-dashoffset: -35; }
  100% { stroke-dasharray: 89 200; stroke-dashoffset: -124; }
}
</style>
\`\`\`

**SMIL Animations (native SVG):**
\`\`\`html
<svg viewBox="0 0 200 100">
  <rect x="0" y="25" width="50" height="50" fill="#3498db">
    <animate attributeName="x" from="0" to="150" dur="2s" repeatCount="indefinite"/>
    <animate attributeName="fill" from="#3498db" to="#e74c3c" dur="2s" repeatCount="indefinite"/>
  </rect>
</svg>
\`\`\`

**\`currentColor\`** — icoane care moștenesc culoarea din CSS:**
\`\`\`html
<button style="color: #3498db;">
  <svg fill="currentColor" viewBox="0 0 24 24" width="20" height="20">
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
  </svg>
  Exportă
</button>
\`\`\`

• CSS animations pe SVG funcționează în toate browserele moderne.
• \`transform-origin: center\` pe elementele SVG rotite — important pentru centrare corectă.
• Librărie **GSAP** — animații SVG complexe cu control avansat.
• **Anime.js** și **Framer Motion** — alternative populare pentru SVG animations.` },

  { lesson: "14. SVG inline", title: "Path și icon-uri", content: `**\`<path>\`** este elementul SVG cel mai puternic — poate desena orice formă prin comenzi de traseu. Icoanele SVG sunt de obicei seturi de \`<path>\`.

**Sintaxa \`<path d="..."\`:**
\`\`\`
M x,y    → Move to (mută cursorul fără a desena)
L x,y    → Line to (linie la punct)
H x      → Horizontal line
V y      → Vertical line
C x1,y1 x2,y2 x,y → Cubic Bezier curve
Q x1,y1 x,y        → Quadratic Bezier curve
A rx,ry angle laf,sf x,y → Arc
Z        → Close path (linie la punctul de start)

Literele mici (m, l, h, v...) = coordonate relative
Literele mari (M, L, H, V...) = coordonate absolute
\`\`\`

**Exemple de path:**
\`\`\`html
<svg viewBox="0 0 100 100" width="200" height="200">
  <!-- Triunghi -->
  <path d="M 50,10 L 90,90 L 10,90 Z" fill="#3498db"/>

  <!-- Cursor mouse -->
  <path d="M 10,10 L 10,70 L 30,50 L 40,80 L 50,75 L 40,45 L 60,45 Z"
    fill="#2c3e50"/>

  <!-- Semicerc -->
  <path d="M 10,50 A 40,40 0 0,1 90,50" fill="none" stroke="#e74c3c" stroke-width="3"/>

  <!-- Inimă -->
  <path d="M 50,30 C 50,20 35,15 30,25 C 25,35 35,45 50,60
           C 65,45 75,35 70,25 C 65,15 50,20 50,30 Z"
    fill="#e74c3c"/>
</svg>
\`\`\`

**SVG Icons — utilizare practică:**
\`\`\`html
<!-- Icon inline direct -->
<button>
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" stroke-width="2" aria-hidden="true">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
  <span>Confirmă</span>
</button>

<!-- SVG Sprite (recomandat pentru multiple icoane) -->
<!-- În HTML (o singură dată) -->
<svg style="display:none">
  <defs>
    <symbol id="icon-home" viewBox="0 0 24 24">
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
      <polyline points="9 22 9 12 15 12 15 22"/>
    </symbol>
    <symbol id="icon-user" viewBox="0 0 24 24">
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </symbol>
  </defs>
</svg>

<!-- Utilizare oriunde în pagină -->
<svg class="icon" aria-hidden="true"><use href="#icon-home"/></svg>
<svg class="icon" aria-hidden="true"><use href="#icon-user"/></svg>
\`\`\`

**Librării de icoane SVG populare:**
\`\`\`html
<!-- Heroicons (Tailwind) -->
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
  stroke-width="1.5" stroke="currentColor" width="24" height="24">
  <path stroke-linecap="round" stroke-linejoin="round"
    d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"/>
</svg>
\`\`\`

**Optimizare SVG:**
• **SVGO** (svgo.dev) — elimină metadate inutile, reduce dimensiunea 20-80%.
• Atributele \`xmlns\` pot fi omise pentru SVG inline în HTML5.
• \`aria-hidden="true"\` pe icoane decorative — screen reader-ul le ignoră.
• \`title\` și \`desc\` în SVG pentru icoane cu sens semantic:
\`\`\`html
<svg role="img" aria-labelledby="icon-title">
  <title id="icon-title">Pagina principală</title>
  <use href="#icon-home"/>
</svg>
\`\`\`
• Preferă biblioteci ca **Lucide**, **Heroicons**, sau **Tabler Icons** — optimizate, consistente.` },

  // L15: Canvas — introducere
  { lesson: "15. Canvas — introducere", title: "Tag <canvas>", content: `**\`<canvas>\`** este o suprafață de desenat controlată 100% prin JavaScript. Diferit de SVG, este **rasterizat** (pixeli) și mai performant pentru grafice complexe dinamice.

**Structura de bază:**
\`\`\`html
<canvas id="myCanvas" width="600" height="400">
  Browser-ul tău nu suportă canvas. <!-- fallback text -->
</canvas>
\`\`\`

\`\`\`javascript
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d'); // context 2D

// Dreptunghiuri
ctx.fillStyle = '#3498db';
ctx.fillRect(10, 10, 150, 80);           // x, y, width, height — umplut
ctx.strokeStyle = '#2c3e50';
ctx.lineWidth = 3;
ctx.strokeRect(180, 10, 150, 80);        // contur
ctx.clearRect(15, 15, 50, 30);           // șterge zona

// Cercuri și arce
ctx.beginPath();
ctx.arc(75, 150, 50, 0, Math.PI * 2);   // x, y, radius, startAngle, endAngle
ctx.fillStyle = '#e74c3c';
ctx.fill();
ctx.stroke();

// Semicerc
ctx.beginPath();
ctx.arc(200, 150, 50, 0, Math.PI);
ctx.closePath();
ctx.fillStyle = '#2ecc71';
ctx.fill();

// Linie
ctx.beginPath();
ctx.moveTo(300, 100);
ctx.lineTo(400, 200);
ctx.lineTo(500, 100);
ctx.strokeStyle = '#9b59b6';
ctx.lineWidth = 5;
ctx.lineCap = 'round';     // capete rotunjite
ctx.lineJoin = 'round';    // colțuri rotunjite
ctx.stroke();

// Curbe Bezier
ctx.beginPath();
ctx.moveTo(10, 250);
ctx.bezierCurveTo(50, 200, 150, 300, 200, 250);
ctx.stroke();
\`\`\`

**Stiluri și culori:**
\`\`\`javascript
// Culori simple
ctx.fillStyle = '#3498db';
ctx.fillStyle = 'rgba(52, 152, 219, 0.7)';

// Gradient liniar
const grad = ctx.createLinearGradient(0, 0, 200, 0);
grad.addColorStop(0, '#3498db');
grad.addColorStop(0.5, '#9b59b6');
grad.addColorStop(1, '#e74c3c');
ctx.fillStyle = grad;
ctx.fillRect(10, 280, 200, 50);

// Pattern
const img = new Image();
img.onload = () => {
  const pattern = ctx.createPattern(img, 'repeat');
  ctx.fillStyle = pattern;
  ctx.fillRect(0, 0, 600, 400);
};

// Umbră
ctx.shadowColor = 'rgba(0,0,0,0.5)';
ctx.shadowBlur = 10;
ctx.shadowOffsetX = 5;
ctx.shadowOffsetY = 5;
\`\`\`

**Salvare și restaurare stare:**
\`\`\`javascript
ctx.save();               // salvează starea curentă
ctx.fillStyle = 'red';
ctx.translate(100, 100);  // mută originea
ctx.rotate(Math.PI / 4);  // rotire 45°
ctx.fillRect(-25, -25, 50, 50);
ctx.restore();            // revine la starea salvată
\`\`\`

• \`width\` și \`height\` pe element (nu CSS) controlează rezoluția canvas-ului.
• CSS size ≠ canvas resolution — canvas \`width="300"\` + \`style="width:600px"\` = imagine pixelată.
• HiDPI/Retina: \`canvas.width = size * devicePixelRatio\` pentru imagini clare pe ecrane retina.
• \`getContext('webgl')\` sau \`getContext('webgl2')\` pentru grafice 3D cu WebGL.` },

  { lesson: "15. Canvas — introducere", title: "Text și imagini pe canvas", content: `**Canvas** permite randarea de text stilizat și imagini, inclusiv manipulare pixel cu pixel.

**Text pe canvas:**
\`\`\`javascript
const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');

// Proprietăți text
ctx.font = 'bold 32px Arial, sans-serif';
ctx.textAlign = 'center';    // left | right | center | start | end
ctx.textBaseline = 'middle'; // top | hanging | middle | alphabetic | bottom
ctx.fillStyle = '#2c3e50';

// Desenare text
ctx.fillText('Bun venit!', 300, 100);      // x, y
ctx.strokeText('Contur text', 300, 150);   // text cu contur
ctx.fillText('Text lung...', 300, 200, 400); // max width = trunchiaza

// Măsurare text
const metrics = ctx.measureText('Hello World');
console.log(metrics.width); // lățimea în pixeli

// Text cu wrapping manual
function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  const words = text.split(' ');
  let line = '';
  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    if (ctx.measureText(testLine).width > maxWidth && n > 0) {
      ctx.fillText(line, x, y);
      line = words[n] + ' ';
      y += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, x, y);
}

wrapText(ctx, 'Acesta este un text lung care va fi împachetat automat.', 50, 250, 500, 30);
\`\`\`

**Imagini pe canvas:**
\`\`\`javascript
const img = new Image();
img.src = 'foto.jpg';

img.onload = () => {
  // drawImage(img, dx, dy)
  ctx.drawImage(img, 0, 0);

  // drawImage(img, dx, dy, dWidth, dHeight) — scalare
  ctx.drawImage(img, 0, 0, 300, 200);

  // drawImage(img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight) — crop + scale
  ctx.drawImage(img,
    100, 50, 200, 150,  // sursa: x, y, w, h (crop)
    10, 10, 400, 300    // destinatie: x, y, w, h (scale)
  );
};

// Pixeli — acces direct
const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
const pixels = imageData.data; // Uint8ClampedArray [R,G,B,A, R,G,B,A, ...]

// Efect grayscale
for (let i = 0; i < pixels.length; i += 4) {
  const avg = (pixels[i] + pixels[i+1] + pixels[i+2]) / 3;
  pixels[i] = avg;     // R
  pixels[i+1] = avg;   // G
  pixels[i+2] = avg;   // B
  // pixels[i+3] = A (neatins)
}
ctx.putImageData(imageData, 0, 0);

// Export canvas ca imagine
const dataURL = canvas.toDataURL('image/png');
const link = document.createElement('a');
link.download = 'screenshot.png';
link.href = dataURL;
link.click();
\`\`\`

**Transformări:**
\`\`\`javascript
ctx.translate(100, 100);     // mută originea
ctx.rotate(Math.PI / 6);     // rotire 30° (în radiani)
ctx.scale(2, 2);             // mărire 2x
ctx.setTransform(a, b, c, d, e, f); // matrice de transformare completă
ctx.resetTransform();        // resetare la identitate
\`\`\`

• Imaginile din alte domenii necesită CORS — altfel \`getImageData\` aruncă eroare security.
• \`canvas.toDataURL()\` returnează Base64 PNG/JPEG — util pentru preview sau salvare.
• Pixel manipulation e operație CPU-intensivă — evită în bucle animate (prefă shader WebGL).` },

  { lesson: "15. Canvas — introducere", title: "Animație simplă", content: `**Animațiile canvas** se bazează pe principiul **desenează → șterge → redesenează** la fiecare frame, folosind \`requestAnimationFrame\` pentru sincronizare cu refresh rate-ul ecranului.

**\`requestAnimationFrame\` (rAF):**
\`\`\`javascript
let animId;

function animate(timestamp) {
  // Șterge canvas-ul
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Desenează starea curentă
  draw(timestamp);

  // Solicită next frame (60fps sau mai mult pe ecrane HiDPI)
  animId = requestAnimationFrame(animate);
}

// Start
animId = requestAnimationFrame(animate);

// Stop
cancelAnimationFrame(animId);
\`\`\`

**Exemplu: bilă care sare:**
\`\`\`javascript
const canvas = document.getElementById('ball-canvas');
const ctx = canvas.getContext('2d');

const ball = {
  x: canvas.width / 2,
  y: 50,
  radius: 25,
  vx: 3,   // viteza pe X
  vy: 0,   // viteza pe Y
  gravity: 0.3,
  bounce: 0.8
};

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Aplică fizică
  ball.vy += ball.gravity;
  ball.x += ball.vx;
  ball.y += ball.vy;

  // Bouncing off walls
  if (ball.x + ball.radius >= canvas.width || ball.x - ball.radius <= 0) {
    ball.vx *= -1;
  }
  if (ball.y + ball.radius >= canvas.height) {
    ball.y = canvas.height - ball.radius;
    ball.vy *= -ball.bounce;
  }

  // Desenează bila
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = '#e74c3c';
  ctx.fill();

  // Umbra bila
  ctx.shadowColor = 'rgba(0,0,0,0.3)';
  ctx.shadowBlur = 10;
  ctx.shadowOffsetY = 5;
  ctx.beginPath();
  ctx.arc(ball.x, canvas.height - 5, ball.radius * 0.7, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(0,0,0,0.2)';
  ctx.fill();
  ctx.shadowBlur = 0;

  requestAnimationFrame(draw);
}
requestAnimationFrame(draw);
\`\`\`

**Delta time — animație la aceeași viteză pe orice refresh rate:**
\`\`\`javascript
let lastTime = 0;

function animate(timestamp) {
  const deltaTime = (timestamp - lastTime) / 1000; // secunde
  lastTime = timestamp;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Mișcare bazată pe timp (nu pe frame)
  ball.x += ball.speed * deltaTime; // 200px/secundă

  draw();
  requestAnimationFrame(animate);
}
\`\`\`

**Canvas interactiv cu mouse:**
\`\`\`javascript
let isDrawing = false;

canvas.addEventListener('mousedown', (e) => {
  isDrawing = true;
  ctx.beginPath();
  ctx.moveTo(e.offsetX, e.offsetY);
});

canvas.addEventListener('mousemove', (e) => {
  if (!isDrawing) return;
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.strokeStyle = '#3498db';
  ctx.lineWidth = 3;
  ctx.stroke();
});

canvas.addEventListener('mouseup', () => { isDrawing = false; });
canvas.addEventListener('mouseleave', () => { isDrawing = false; });
\`\`\`

• \`requestAnimationFrame\` se sincronizează cu refresh rate-ul ecranului (60, 120, 144fps).
• \`setTimeout(draw, 16)\` e o alternativă mai veche — mai puțin precisă.
• Animații complexe: **Three.js** (3D WebGL), **PixiJS** (2D performant), **p5.js** (creative coding).
• rAF se pausează automat când tab-ul e în background — economisește bateria și CPU.` },

  // L16: <template> și <slot>
  { lesson: "16. <template> și <slot>", title: "Tag <template>", content: `**\`<template>\`** definește conținut HTML inert — nu e randat, nu execută scripturi, nu descarcă resurse — până e clonat și inserat cu JavaScript.

**Sintaxa de bază:**
\`\`\`html
<!-- Definit o singură dată, nicăieri nu se vede -->
<template id="card-tpl">
  <div class="card">
    <img class="card-img" src="" alt="">
    <div class="card-body">
      <h3 class="card-title"></h3>
      <p class="card-desc"></p>
      <a class="card-link" href="#">Citește mai mult</a>
    </div>
  </div>
</template>

<!-- Container unde inserăm cardurile -->
<div id="cards-grid"></div>
\`\`\`

\`\`\`javascript
const template = document.getElementById('card-tpl');
const grid = document.getElementById('cards-grid');

const articles = [
  { title: "Ghid HTML5", desc: "Tag-uri, formulare, semantic.", img: "html.jpg", url: "/html" },
  { title: "Ghid CSS3", desc: "Flexbox, Grid, animații.", img: "css.jpg", url: "/css" },
  { title: "Ghid JS", desc: "ES6+, DOM, async/await.", img: "js.jpg", url: "/js" },
];

articles.forEach(article => {
  const clone = template.content.cloneNode(true); // true = deep clone

  clone.querySelector('.card-img').src = article.img;
  clone.querySelector('.card-img').alt = article.title;
  clone.querySelector('.card-title').textContent = article.title;
  clone.querySelector('.card-desc').textContent = article.desc;
  clone.querySelector('.card-link').href = article.url;

  grid.appendChild(clone);
});
\`\`\`

**Template cu event listeners:**
\`\`\`html
<template id="todo-item">
  <li class="todo">
    <input type="checkbox" class="todo-check">
    <span class="todo-text"></span>
    <button class="todo-delete" type="button">✕</button>
  </li>
</template>
\`\`\`

\`\`\`javascript
function createTodoItem(text) {
  const template = document.getElementById('todo-item');
  const clone = template.content.cloneNode(true);

  const span = clone.querySelector('.todo-text');
  span.textContent = text;

  const checkbox = clone.querySelector('.todo-check');
  checkbox.addEventListener('change', () => {
    span.style.textDecoration = checkbox.checked ? 'line-through' : 'none';
  });

  const deleteBtn = clone.querySelector('.todo-delete');
  deleteBtn.addEventListener('click', (e) => {
    e.target.closest('.todo').remove();
  });

  return clone;
}

document.getElementById('todo-list').appendChild(createTodoItem('Înveți HTML5'));
\`\`\`

**Proprietatea \`content\`:**
\`\`\`javascript
const tpl = document.getElementById('card-tpl');
console.log(tpl.content);            // DocumentFragment
console.log(tpl.content.childNodes); // NodeList — copiii template-ului
\`\`\`

• \`<template>\` poate fi oriunde în documentul HTML — \`<body>\`, \`<head>\`, chiar în \`<table>\`.
• Conținutul template-ului nu e parte din DOM până nu e clonat.
• Browser-ul validează HTML-ul din template — erorile de sintaxă sunt semnalate.
• \`cloneNode(true)\` — deep clone, copie tot; \`false\` — shallow clone, doar elementul container.` },

  { lesson: "16. <template> și <slot>", title: "<slot> și Web Components", content: `**\`<slot>\`** este mecanismul de "guri" în Shadow DOM — permite conținut dinafara unui Web Component să apară în interior.

**Web Component simplu cu slot:**
\`\`\`javascript
// Definire custom element cu Shadow DOM
class AlertBox extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });

    shadow.innerHTML = \`
      <style>
        :host { display: block; }
        .alert {
          padding: 12px 16px;
          border-radius: 6px;
          background: #fde8e8;
          border-left: 4px solid #e74c3c;
          font-family: sans-serif;
        }
        :host([type="success"]) .alert {
          background: #e8f8f5;
          border-color: #2ecc71;
        }
        :host([type="info"]) .alert {
          background: #eaf3fb;
          border-color: #3498db;
        }
        .title { font-weight: bold; margin-bottom: 4px; }
      </style>
      <div class="alert">
        <div class="title"><slot name="title">Atenție</slot></div>
        <slot></slot>
      </div>
    \`;
  }
}

customElements.define('alert-box', AlertBox);
\`\`\`

\`\`\`html
<!-- Utilizare -->
<alert-box>
  <span slot="title">Eroare de validare</span>
  Câmpul email este obligatoriu.
</alert-box>

<alert-box type="success">
  <span slot="title">Succes!</span>
  Înregistrarea a fost completată.
</alert-box>

<alert-box type="info">
  Sesiunea expiră în 5 minute.
</alert-box>
\`\`\`

**Named slots vs default slot:**
\`\`\`html
<template id="card-tpl">
  <style>
    .card { border: 1px solid #ddd; border-radius: 8px; overflow: hidden; }
    .card-header { background: #f4f4f4; padding: 12px; }
    .card-body { padding: 16px; }
    .card-footer { padding: 12px; border-top: 1px solid #ddd; }
  </style>
  <div class="card">
    <div class="card-header">
      <slot name="header">Titlu implicit</slot>
    </div>
    <div class="card-body">
      <slot></slot>  <!-- default slot -->
    </div>
    <div class="card-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>
\`\`\`

**Slotchange event:**
\`\`\`javascript
const slot = shadowRoot.querySelector('slot');
slot.addEventListener('slotchange', (e) => {
  const nodes = slot.assignedNodes();
  console.log('Conținut nou în slot:', nodes);
});
\`\`\`

• **Shadow DOM** încapsulează CSS-ul — stilurile din afară nu "scurg" în interior (și viceversa).
• **\`:host\`** pseudo-class — stilizează elementul custom însuși.
• **\`:host([atribut])\`** — stilizare condiționată pe atribute.
• Conținut în \`<slot name="x">\` se numește "slotted content" — accesibil cu \`::slotted(selector)\`.` },

  { lesson: "16. <template> și <slot>", title: "Custom Element minim", content: `**Custom Elements** API permite crearea de elemente HTML proprii, cu comportament și stilizare încapsulate — pilonul Web Components.

**Structura unui Custom Element:**
\`\`\`javascript
class MyCounter extends HTMLElement {
  // Atribute care declanșează attributeChangedCallback
  static get observedAttributes() {
    return ['count', 'label'];
  }

  constructor() {
    super(); // MEREU prima linie în constructor
    this.attachShadow({ mode: 'open' });
  }

  // Lifecycle callbacks
  connectedCallback() {
    // Elementul a fost adăugat în DOM
    this._count = parseInt(this.getAttribute('count')) || 0;
    this._label = this.getAttribute('label') || 'Counter';
    this.render();
  }

  disconnectedCallback() {
    // Elementul a fost scos din DOM
    console.log('Counter removed');
  }

  attributeChangedCallback(name, oldVal, newVal) {
    // Un atribut observat s-a schimbat
    if (name === 'count') this._count = parseInt(newVal);
    if (name === 'label') this._label = newVal;
    if (this.shadowRoot.innerHTML) this.render();
  }

  render() {
    this.shadowRoot.innerHTML = \`
      <style>
        :host { display: inline-flex; flex-direction: column; align-items: center; gap: 8px; }
        .count { font-size: 2rem; font-weight: bold; }
        .controls { display: flex; gap: 8px; }
        button {
          padding: 8px 16px; cursor: pointer;
          background: #3498db; color: white;
          border: none; border-radius: 4px;
        }
        button:hover { background: #2980b9; }
      </style>
      <span class="label">\${this._label}</span>
      <span class="count">\${this._count}</span>
      <div class="controls">
        <button id="dec">−</button>
        <button id="inc">+</button>
        <button id="reset">Reset</button>
      </div>
    \`;

    this.shadowRoot.getElementById('inc').onclick = () => {
      this._count++;
      this.shadowRoot.querySelector('.count').textContent = this._count;
      this.dispatchEvent(new CustomEvent('change', { detail: this._count }));
    };
    this.shadowRoot.getElementById('dec').onclick = () => {
      this._count--;
      this.shadowRoot.querySelector('.count').textContent = this._count;
    };
    this.shadowRoot.getElementById('reset').onclick = () => {
      this._count = 0;
      this.shadowRoot.querySelector('.count').textContent = 0;
    };
  }
}

customElements.define('my-counter', MyCounter);
\`\`\`

\`\`\`html
<!-- Utilizare ca orice element HTML -->
<my-counter count="5" label="Scor"></my-counter>
<my-counter></my-counter>

<script>
  const counter = document.querySelector('my-counter');
  counter.addEventListener('change', (e) => console.log('Nou count:', e.detail));
</script>
\`\`\`

**Customized built-in elements:**
\`\`\`javascript
class FancyButton extends HTMLButtonElement {
  connectedCallback() {
    this.style.background = '#3498db';
    this.style.color = 'white';
    this.style.padding = '10px 20px';
    this.style.borderRadius = '4px';
    this.style.border = 'none';
    this.style.cursor = 'pointer';
  }
}
customElements.define('fancy-button', FancyButton, { extends: 'button' });
\`\`\`
\`\`\`html
<button is="fancy-button">Click me!</button>
\`\`\`

• \`customElements.whenDefined('my-counter')\` returnează Promise — util pentru upgrade.
• Custom Elements pot fi folosite înainte de \`define()\` — se fac upgrade automat.
• Fără Shadow DOM (Autonomous Custom Elements fără \`attachShadow\`) — CSS global se aplică.
• **Lit** (de la Google) este o librărie lightweight pentru Web Components cu reactivitate.` },

  // L17: <dialog>, <details>, <summary>
  { lesson: "17. <dialog>, <details>, <summary>", title: "Tag <dialog>", content: `**\`<dialog>\`** este elementul HTML5 nativ pentru modals, alerturi și dialoguri — fără biblioteci externe, cu focus trap și accesibilitate built-in.

**Utilizare de bază:**
\`\`\`html
<button onclick="document.getElementById('my-dialog').showModal()">
  Deschide Dialog
</button>

<dialog id="my-dialog">
  <h2>Titlu Dialog</h2>
  <p>Conținutul dialogului.</p>
  <form method="dialog">  <!-- "method=dialog" închide automat dialogul -->
    <button value="cancel">Anulează</button>
    <button value="confirm">Confirmă</button>
  </form>
</dialog>
\`\`\`

**API JavaScript:**
\`\`\`javascript
const dialog = document.getElementById('my-dialog');

dialog.show();        // deschide NON-MODAL (fără backdrop, fără focus trap)
dialog.showModal();   // deschide MODAL (cu backdrop, cu focus trap)
dialog.close();       // închide dialogul
dialog.close('ok');   // închide cu returnValue

// returnValue = valoarea butonului care a închis dialogul
dialog.addEventListener('close', () => {
  console.log('Închis cu:', dialog.returnValue); // "cancel" sau "confirm"
});

// Close la click pe backdrop
dialog.addEventListener('click', (e) => {
  const rect = dialog.getBoundingClientRect();
  const isOutside =
    e.clientX < rect.left || e.clientX > rect.right ||
    e.clientY < rect.top  || e.clientY > rect.bottom;
  if (isOutside) dialog.close('backdrop');
});

// Escape key închide automat (showModal)
dialog.addEventListener('cancel', (e) => {
  e.preventDefault(); // previne Escape să închidă
  // confirmă cu userul înainte de a închide
});
\`\`\`

**Dialog de confirmare refolosibil:**
\`\`\`javascript
function confirm(message, title = 'Confirmare') {
  return new Promise((resolve) => {
    const dialog = document.createElement('dialog');
    dialog.innerHTML = \`
      <h2>\${title}</h2>
      <p>\${message}</p>
      <div>
        <button class="btn-cancel">Anulează</button>
        <button class="btn-ok">OK</button>
      </div>
    \`;
    document.body.appendChild(dialog);
    dialog.showModal();
    dialog.querySelector('.btn-ok').onclick = () => { dialog.close(); resolve(true); dialog.remove(); };
    dialog.querySelector('.btn-cancel').onclick = () => { dialog.close(); resolve(false); dialog.remove(); };
  });
}

// Utilizare
const confirmed = await confirm('Ești sigur că vrei să ștergi?');
if (confirmed) deleteItem();
\`\`\`

**Stilizare backdrop:**
\`\`\`css
dialog {
  border: none;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 20px 60px rgba(0,0,0,0.3);
  max-width: 500px;
  width: 90vw;
}
dialog::backdrop {
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
}
dialog[open] { animation: slideIn 0.2s ease; }
@keyframes slideIn { from { transform: translateY(-20px); opacity: 0; } }
\`\`\`

• **Focus trap** automat cu \`showModal()\` — Tab rămâne în interiorul dialogului.
• **Escape** închide automat dialogul modal — comportament nativ, accesibil.
• \`<form method="dialog">\` în interiorul dialogului — butonul de submit înscrie \`value\` în \`returnValue\`.
• ARIA: \`<dialog>\` are implicit \`role="dialog"\`; adaugă \`aria-labelledby\` pentru accesibilitate.` },

  { lesson: "17. <dialog>, <details>, <summary>", title: "<details> și <summary>", content: `**\`<details>\`** și **\`<summary>\`** creează elemente expandabile/colapsabile nativ în browser — fără JavaScript pentru funcționalitate de bază.

**Structura de bază:**
\`\`\`html
<!-- Colapsat implicit -->
<details>
  <summary>Ce este HTML5?</summary>
  <p>HTML5 este versiunea modernă a standardului HTML, lansat în 2014.
  Aduce elemente semantice, multimedia nativă, formulare avansate
  și API-uri JavaScript noi.</p>
</details>

<!-- Deschis implicit cu atribut "open" -->
<details open>
  <summary>Instalare (deschis la start)</summary>
  <ol>
    <li>Descarcă editorul de cod</li>
    <li>Instalează extensia Live Server</li>
    <li>Creează fișierul index.html</li>
  </ol>
</details>
\`\`\`

**FAQ (Frequently Asked Questions):**
\`\`\`html
<section>
  <h2>Întrebări frecvente</h2>

  <details>
    <summary>Cât durează cursul?</summary>
    <p>Cursul cuprinde 35 de lecții, cu o durată totală de aproximativ 40 de ore
    de conținut. Ritmul este al tău — poți finaliza în 2-8 săptămâni.</p>
  </details>

  <details>
    <summary>Primesc certificat?</summary>
    <p>Da! După completarea tuturor lecțiilor și trecerea testului final,
    primești un certificat digital descărcabil în format PDF.</p>
  </details>

  <details>
    <summary>Cursul are subtitrări?</summary>
    <p>Toate videoclipurile au subtitrări în română și engleză, adăugate manual.</p>
  </details>
</section>
\`\`\`

**Accordion — un singur deschis la un timp (cu JS):**
\`\`\`html
<div class="accordion">
  <details name="faq">
    <summary>Întrebarea 1</summary>
    <p>Răspuns 1...</p>
  </details>
  <details name="faq">
    <summary>Întrebarea 2</summary>
    <p>Răspuns 2...</p>
  </details>
</div>
\`\`\`
\`\`\`
Atribut "name" pe details: dacă mai multe details au același name,
deschiderea unuia le închide automat pe celelalte (suport în Chrome 120+).
\`\`\`

**Citire și control cu JavaScript:**
\`\`\`javascript
const details = document.querySelector('details');

// Stare
console.log(details.open); // true/false

// Deschide/închide programatic
details.open = true;
details.open = false;

// Event la toggle
details.addEventListener('toggle', (e) => {
  console.log(details.open ? 'Deschis' : 'Închis');
});
\`\`\`

**Nested details — sub-categorii:**
\`\`\`html
<details>
  <summary>Frontend</summary>
  <details>
    <summary>HTML</summary>
    <ul><li>Structură</li><li>Semantic</li></ul>
  </details>
  <details>
    <summary>CSS</summary>
    <ul><li>Flexbox</li><li>Grid</li></ul>
  </details>
</details>
\`\`\`

• \`<summary>\` **trebuie** să fie primul copil al \`<details>\`; dacă lipsește, browser-ul pune "Details".
• Funcționalitatea expand/collapse nu necesită JavaScript — e built-in.
• Accesibil nativ: screen readere anunță "collapsed/expanded" și citesc summary-ul.
• Stilizarea săgeții native: \`summary::marker\` (modern) sau \`summary::-webkit-details-marker\`.` },

  { lesson: "17. <dialog>, <details>, <summary>", title: "Stilizare dialog și details", content: `**Stilizarea** elementelor native \`<dialog>\` și \`<details>\` permite înlocuirea completă a aspectului implicit cu design custom.

**Stilizare completă \`<details>\`:**
\`\`\`css
/* Resetare și stilizare de bază */
details {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  margin-bottom: 8px;
  overflow: hidden;
}

/* Summary — bara clicabilă */
summary {
  padding: 14px 16px;
  cursor: pointer;
  font-weight: 600;
  list-style: none;       /* ascunde săgeata nativă */
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f8f9fa;
  user-select: none;
}

/* Ascunde marker webkit */
summary::-webkit-details-marker { display: none; }

/* Icon custom cu pseudo-element */
summary::after {
  content: "+";
  font-size: 1.4rem;
  font-weight: 300;
  transition: transform 0.2s;
}
details[open] summary::after {
  transform: rotate(45deg);
}
details[open] summary {
  border-bottom: 1px solid #e0e0e0;
}

/* Conținut expandat */
details > *:not(summary) {
  padding: 16px;
  animation: slideDown 0.2s ease;
}
@keyframes slideDown {
  from { opacity: 0; transform: translateY(-8px); }
  to { opacity: 1; transform: translateY(0); }
}
\`\`\`

**Stilizare \`<dialog>\` completă:**
\`\`\`css
/* Resetare */
dialog {
  border: none;
  border-radius: 12px;
  padding: 0;
  max-width: min(500px, 90vw);
  width: 100%;
  box-shadow: 0 25px 50px rgba(0,0,0,0.25);
}

/* Backdrop personalizat */
dialog::backdrop {
  background: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(4px);
}

/* Interior dialog */
.dialog-header {
  padding: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.dialog-body { padding: 1.5rem; }
.dialog-footer {
  padding: 1rem 1.5rem;
  border-top: 1px solid #e5e7eb;
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
}

/* Animație deschidere */
dialog[open] {
  animation: dialogIn 0.25s ease;
}
@keyframes dialogIn {
  from { opacity: 0; transform: scale(0.95) translateY(-10px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}

/* Animație închidere (necesită JS pentru clasa) */
dialog.closing {
  animation: dialogOut 0.2s ease forwards;
}
@keyframes dialogOut {
  to { opacity: 0; transform: scale(0.95); }
}
\`\`\`

\`\`\`javascript
// Animație la închidere
function closeWithAnimation(dialog) {
  dialog.classList.add('closing');
  dialog.addEventListener('animationend', () => {
    dialog.classList.remove('closing');
    dialog.close();
  }, { once: true });
}
\`\`\`

• \`details[open] summary\` — selectează summary-ul unui detaliu deschis.
• \`dialog::backdrop\` — disponibil doar pentru \`showModal()\`, nu pentru \`show()\`.
• Animația de închidere necesită JavaScript — CSS nu poate detecta direct \`[open]\` removal.
• Pe Safari mai vechi: \`<dialog>\` necesita polyfill — în 2024 suportul e universal.` },

  // L18: Drag and Drop
  { lesson: "18. Drag and Drop", title: "Atribute drag and drop", content: `**Drag and Drop API** permite utilizatorilor să tragă elemente și să le arunce în zone-țintă. Este o interacțiune nativă HTML5, fără biblioteci externe.

**Activarea drag-ului:**
\`\`\`html
<!-- draggable="true" face elementul drag-abil -->
<div draggable="true" id="item-1" class="draggable">
  Trage-mă!
</div>

<div draggable="true" id="item-2" class="draggable">
  Și pe mine!
</div>

<!-- Drop zone — locul unde se pot arunca elementele -->
<div id="drop-zone" class="drop-zone">
  Aruncă aici
</div>
\`\`\`

\`\`\`css
.draggable {
  padding: 12px 20px;
  background: #3498db;
  color: white;
  border-radius: 6px;
  cursor: grab;
  display: inline-block;
  margin: 8px;
  user-select: none;
}
.draggable:active { cursor: grabbing; }

.drop-zone {
  min-height: 150px;
  border: 2px dashed #bdc3c7;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  transition: all 0.2s;
}
.drop-zone.drag-over {
  border-color: #3498db;
  background: #ebf5fb;
}
\`\`\`

**Evenimentele Drag and Drop:**
\`\`\`
Pe elementul drag-abil (sursă):
  dragstart  → utilizatorul începe să tragă
  drag       → în timp ce trage (se repetă)
  dragend    → a terminat (cu sau fără drop)

Pe elementul drop zone (destinație):
  dragenter  → elementul tras intră în zonă
  dragover   → elementul tras e deasupra zonei (se repetă)
  dragleave  → elementul tras a ieșit din zonă
  drop       → elementul a fost aruncat
\`\`\`

**\`dataTransfer\`** — date transferate în drag:
\`\`\`javascript
// La dragstart: salvăm datele
document.querySelectorAll('.draggable').forEach(item => {
  item.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('text/plain', e.target.id);
    e.dataTransfer.effectAllowed = 'move'; // copy | move | link | all
    e.target.classList.add('dragging');
  });
  item.addEventListener('dragend', (e) => {
    e.target.classList.remove('dragging');
  });
});

// Pe drop zone: preluăm datele
const dropZone = document.getElementById('drop-zone');

dropZone.addEventListener('dragover', (e) => {
  e.preventDefault(); // OBLIGATORIU pentru a activa drop-ul
  e.dataTransfer.dropEffect = 'move';
  dropZone.classList.add('drag-over');
});

dropZone.addEventListener('dragleave', () => {
  dropZone.classList.remove('drag-over');
});

dropZone.addEventListener('drop', (e) => {
  e.preventDefault();
  const id = e.dataTransfer.getData('text/plain');
  const item = document.getElementById(id);
  dropZone.appendChild(item);
  dropZone.classList.remove('drag-over');
});
\`\`\`

• \`e.preventDefault()\` pe \`dragover\` este **obligatoriu** — fără el, drop-ul nu funcționează.
• \`cursor: grab\` / \`cursor: grabbing\` — feedback vizual standard pentru drag-abil.
• \`user-select: none\` — previne selectarea text-ului în timp ce tragi.
• \`e.dataTransfer.types\` — array cu tipurile de date disponibile: \`["text/plain"]\`, \`["Files"]\`.` },

  { lesson: "18. Drag and Drop", title: "Eventuri în ordine", content: `Înțelegerea **ordinii evenimentelor** drag-and-drop este esențială pentru implementarea corectă și pentru evitarea comportamentelor neașteptate.

**Ordinea completă a evenimentelor:**
\`\`\`
SCENARIUL: Utilizatorul trage item dintr-o zonă în alta

1. mousedown (pe item)
2. dragstart (pe item — drag a început)
3. drag      (pe item — continuu în timp ce trage)
   3a. dragenter (pe drop-zone — cursorul a intrat)
   3b. dragover  (pe drop-zone — continuu deasupra)
4. dragleave (pe drop-zone — dacă iese din zonă)
   SAU
4. drop     (pe drop-zone — a aruncat)
5. dragend  (pe item — drag s-a terminat, indiferent de succes)
\`\`\`

**Implementare completă cu highlight corect:**
\`\`\`javascript
let draggedElement = null;
let dragCounter = 0; // pentru dragenter/dragleave pe child elements

// Sursă
document.querySelectorAll('[draggable="true"]').forEach(el => {
  el.addEventListener('dragstart', (e) => {
    draggedElement = el;
    e.dataTransfer.setData('text/plain', el.id);

    // Mic delay pentru a evita "ghost image" tăiat
    setTimeout(() => el.classList.add('opacity-50'), 0);
  });

  el.addEventListener('dragend', () => {
    el.classList.remove('opacity-50');
    draggedElement = null;
  });
});

// Drop zones
document.querySelectorAll('.drop-zone').forEach(zone => {
  zone.addEventListener('dragenter', (e) => {
    e.preventDefault();
    dragCounter++;
    zone.classList.add('drag-over'); // activat la enter
  });

  zone.addEventListener('dragleave', () => {
    dragCounter--;
    if (dragCounter === 0) {
      zone.classList.remove('drag-over'); // dezactivat la ieșire completă
    }
  });

  zone.addEventListener('dragover', (e) => {
    e.preventDefault(); // permite drop-ul
  });

  zone.addEventListener('drop', (e) => {
    e.preventDefault();
    dragCounter = 0;
    zone.classList.remove('drag-over');

    const id = e.dataTransfer.getData('text/plain');
    const el = document.getElementById(id);
    zone.appendChild(el);

    // Custom event
    zone.dispatchEvent(new CustomEvent('item-dropped', {
      detail: { item: el, source: el.parentElement }
    }));
  });
});
\`\`\`

**Problematica dragenter/dragleave:**
\`\`\`
Problema: când cursorul trece peste un child element al drop-zone:
  - dragenter se declanșează pe child
  - dragleave se declanșează pe drop-zone
  → highlight-ul dispare greșit!

Soluție 1: dragCounter (exemplul de mai sus)
Soluție 2: pointer-events: none pe children în timp ce drag-ezi
Soluție 3: verificare cu relatedTarget
\`\`\`

\`\`\`javascript
zone.addEventListener('dragleave', (e) => {
  // relatedTarget = elementul în care a intrat cursorul
  if (!zone.contains(e.relatedTarget)) {
    zone.classList.remove('drag-over');
  }
});
\`\`\`

**Imagini ghost custom:**
\`\`\`javascript
el.addEventListener('dragstart', (e) => {
  const ghost = document.createElement('div');
  ghost.textContent = 'Mișcând...';
  ghost.style.cssText = 'position:absolute;top:-1000px;background:#3498db;color:white;padding:8px;border-radius:4px;';
  document.body.appendChild(ghost);
  e.dataTransfer.setDragImage(ghost, 0, 0);
  setTimeout(() => document.body.removeChild(ghost), 0);
});
\`\`\`

• \`dragover\` + \`drop\` pe drop-zone sunt **ambele necesare** pentru ca drop-ul să funcționeze.
• Ghost image implicit = snapshot-ul elementului — \`setDragImage\` o personalizează.
• Touch screens nu suportă native drag-and-drop — necesită librărie (Interact.js, SortableJS).` },

  { lesson: "18. Drag and Drop", title: "Drag fișiere din OS", content: `**Drag din sistemul de operare** — utilizatorii pot trage fișiere direct din Explorer/Finder în pagina web. Accesul se face prin \`e.dataTransfer.files\`.

**Implementare drop-zone pentru fișiere:**
\`\`\`html
<div id="file-drop" class="file-drop-zone">
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" stroke-width="1.5">
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
    <polyline points="17 8 12 3 7 8"/>
    <line x1="12" y1="3" x2="12" y2="15"/>
  </svg>
  <p>Trage fișiere aici sau <button type="button" id="browse-btn">navighează</button></p>
  <p class="hint">PNG, JPG, PDF — max 10MB</p>
</div>

<input type="file" id="file-input" multiple accept="image/*,.pdf" style="display:none">

<div id="file-list"></div>
\`\`\`

\`\`\`javascript
const dropZone = document.getElementById('file-drop');
const fileInput = document.getElementById('file-input');

// Click pentru browse
document.getElementById('browse-btn').onclick = () => fileInput.click();
fileInput.onchange = (e) => processFiles(e.target.files);

// Drag events
['dragenter', 'dragover', 'dragleave', 'drop'].forEach(event => {
  dropZone.addEventListener(event, (e) => {
    e.preventDefault();
    e.stopPropagation();
  });
});

dropZone.addEventListener('dragenter', () => dropZone.classList.add('active'));
dropZone.addEventListener('dragleave', (e) => {
  if (!dropZone.contains(e.relatedTarget)) dropZone.classList.remove('active');
});

dropZone.addEventListener('drop', (e) => {
  dropZone.classList.remove('active');
  const files = e.dataTransfer.files;

  // Verifică tipuri
  const dt = e.dataTransfer;
  if (dt.items) {
    // Accesul la items permite verificarea înainte de drop
    [...dt.items].forEach(item => {
      if (item.kind === 'file') processFiles([item.getAsFile()]);
    });
  } else {
    processFiles(dt.files);
  }
});

function processFiles(files) {
  const list = document.getElementById('file-list');
  [...files].forEach(file => {
    // Validare
    if (file.size > 10 * 1024 * 1024) {
      alert(file.name + ' depășește 10MB!'); return;
    }

    // Afișare preview
    const item = document.createElement('div');
    item.className = 'file-item';

    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        item.innerHTML = \`
          <img src="\${e.target.result}" alt="\${file.name}" width="80" height="80" style="object-fit:cover">
          <div>
            <strong>\${file.name}</strong>
            <br>\${(file.size/1024).toFixed(1)} KB — \${file.type}
          </div>
        \`;
      };
      reader.readAsDataURL(file);
    } else {
      item.innerHTML = \`<strong>\${file.name}</strong> (\${(file.size/1024).toFixed(1)} KB)\`;
    }

    list.appendChild(item);
  });
}
\`\`\`

**Informații disponibile pe fișier:**
\`\`\`javascript
const file = files[0];
file.name         // "foto.jpg"
file.type         // "image/jpeg"
file.size         // bytes (5242880 = 5MB)
file.lastModified // timestamp
file.lastModifiedDate // Date object
\`\`\`

• \`e.stopPropagation()\` pe toate evenimentele drag — previne ca browser-ul să navigheze la fișier.
• \`e.dataTransfer.types\` include \`"Files"\` când sunt fișiere din OS.
• FileReader, Blob API, și FormData sunt API-urile pentru procesarea și upload-ul fișierelor.
• Librărie populară: **Dropzone.js** — full-featured, dar \`<input type="file">\` + drag API nativ e suficient.` },

  // L19: <progress>, <meter>, <output>
  { lesson: "19. <progress>, <meter>, <output>", title: "<progress> bar", content: `**\`<progress>\`** reprezintă progresul unei operațiuni. Este semantic și accesibil nativ — screen readere îl citesc corect ca "progress bar".

**Sintaxa de bază:**
\`\`\`html
<!-- Progress determinat (cu value și max) -->
<progress id="download" value="65" max="100">65%</progress>

<!-- Progress indeterminat (fără value — "loading...") -->
<progress>Se încarcă...</progress>

<!-- Cu procent afișat -->
<label for="upload">Upload:
  <progress id="upload" value="40" max="100">40%</progress>
  40%
</label>
\`\`\`

**Actualizare dinamică cu JavaScript:**
\`\`\`javascript
const bar = document.getElementById('download');
const label = document.getElementById('progress-label');

// Simulare download
let progress = 0;
const interval = setInterval(() => {
  progress += Math.random() * 10;
  if (progress >= 100) {
    progress = 100;
    clearInterval(interval);
    label.textContent = '✓ Descărcare completă!';
  }
  bar.value = progress;
  label.textContent = Math.floor(progress) + '%';
}, 300);

// Upload real cu XMLHttpRequest
const xhr = new XMLHttpRequest();
xhr.upload.addEventListener('progress', (e) => {
  if (e.lengthComputable) {
    bar.value = (e.loaded / e.total) * 100;
    label.textContent = Math.round(e.loaded / e.total * 100) + '%';
  }
});
\`\`\`

**Stilizare \`<progress>\`:**
\`\`\`css
/* Reset cross-browser */
progress { -webkit-appearance: none; appearance: none; width: 100%; height: 20px; border-radius: 10px; overflow: hidden; }

/* Firefox */
progress { background: #ecf0f1; border: none; }
progress::-moz-progress-bar { background: #3498db; border-radius: 10px; }

/* Chrome/Safari */
progress::-webkit-progress-bar { background: #ecf0f1; border-radius: 10px; }
progress::-webkit-progress-value { background: linear-gradient(90deg, #3498db, #2ecc71); border-radius: 10px; }

/* Animație bară */
progress::-webkit-progress-value { transition: width 0.3s ease; }

/* Indeterminat — animație customizată */
progress:not([value]) { background: linear-gradient(90deg, #ecf0f1 25%, #3498db 50%, #ecf0f1 75%); background-size: 200%; animation: loading 1.5s infinite; }
@keyframes loading { 0% { background-position: 200%; } 100% { background-position: -200%; } }
\`\`\`

**Progress bar custom cu div (mai stilizabil):**
\`\`\`html
<div role="progressbar" aria-valuenow="65" aria-valuemin="0" aria-valuemax="100"
  aria-label="Descărcare: 65%">
  <div style="width: 65%; background: #3498db; height: 100%;"></div>
</div>
\`\`\`

• Conținutul dintre tag-uri (\`65%\`) este fallback pentru browsere fără suport.
• \`<progress>\` fără \`value\` = indeterminat — util pentru operațiuni cu durată necunoscută.
• Screen readere citesc \`value\` și \`max\` automat — fără ARIA suplimentar.
• \`aria-valuenow\` pe div-urile custom simulează accesibilitatea nativă \`<progress>\`.` },

  { lesson: "19. <progress>, <meter>, <output>", title: "<meter> — valoare în range", content: `**\`<meter>\`** reprezintă o măsurătoare scalară cu range cunoscut — spațiu disk, scor, niveluri. Spre deosebire de \`<progress>\`, indică o stare (bun/rău) prin \`low\`, \`high\`, \`optimum\`.

**Sintaxa și atributele:**
\`\`\`html
<!-- Utilizare spațiu disk (70% folosit — pericol!) -->
<label>Spațiu disk:
  <meter value="70" min="0" max="100" low="25" high="75" optimum="10">70%</meter>
</label>

<!-- Scor test (85/100 — bun) -->
<label>Scor test:
  <meter value="85" min="0" max="100" low="40" high="70" optimum="100">85/100</meter>
</label>

<!-- Rating produs (3.5/5) -->
<meter value="3.5" min="0" max="5">3.5 din 5 stele</meter>

<!-- Nivel baterie (20% — critic) -->
<meter value="20" min="0" max="100" low="30" high="80" optimum="100"
  title="Baterie: 20%">20%</meter>
\`\`\`

**Cum funcționează culorile automate:**
\`\`\`
Optimum în zona "high" (valoarea optimă e sus):
  value >= high                        → verde (optim)
  value >= low && value < high         → galben (avertizment)
  value < low                          → roșu (pericol)

Optimum în zona "low" (valoarea optimă e jos — ex: latență):
  value <= low                         → verde (optim)
  value > low && value <= high         → galben
  value > high                         → roșu

Optimum în mijloc:
  value în zona optimum               → verde
  departe de optimum                  → galben/roșu
\`\`\`

**Exemple practice:**
\`\`\`html
<!-- RAM usage — optimal e mic -->
<label>RAM: <meter value="75" min="0" max="100" low="60" high="85" optimum="20">75%</meter> 75%</label>

<!-- Performanță Lighthouse — optimal e mare -->
<label>SEO: <meter value="92" min="0" max="100" low="50" high="80" optimum="100">92</meter> 92/100</label>

<!-- Aciditate soluție — optimal e neutru (7) -->
<label>pH: <meter value="4" min="0" max="14" low="6" high="8" optimum="7">pH 4</meter> pH 4</label>
\`\`\`

**Stilizare \`<meter>\`:**
\`\`\`css
meter { width: 200px; height: 20px; }

/* Chrome/Safari */
meter::-webkit-meter-bar { background: #ecf0f1; border-radius: 10px; border: none; }
meter::-webkit-meter-optimum-value { background: #2ecc71; border-radius: 10px; }
meter::-webkit-meter-suboptimum-value { background: #f39c12; border-radius: 10px; }
meter::-webkit-meter-even-less-good-value { background: #e74c3c; border-radius: 10px; }

/* Firefox folosește culorile sistemului — mai greu de stilizat */
\`\`\`

**Cu JavaScript:**
\`\`\`javascript
const meter = document.querySelector('meter');

// Citire
console.log(meter.value);   // 70
console.log(meter.min);     // 0
console.log(meter.max);     // 100
console.log(meter.low);     // 25
console.log(meter.high);    // 75
console.log(meter.optimum); // 10

// Actualizare live
meter.value = 85;
\`\`\`

• \`<meter>\` NU e pentru progres (task completion) — folosește \`<progress>\` pentru asta.
• Screen readere citesc valoarea și contextul min/max automat.
• Culorile automate funcționează în Chrome/Firefox — în Safari poate varia.
• Fallback-ul text din tag este citit de browsere fără suport.` },

  { lesson: "19. <progress>, <meter>, <output>", title: "<output> — rezultat calcul", content: `**\`<output>\`** marchează semantic rezultatul unui calcul sau acțiuni ale utilizatorului — perfect pentru calculatoare, convertoare, formulare cu calcul live.

**Sintaxa de bază:**
\`\`\`html
<!-- Calcul simplu live -->
<form oninput="result.value = parseInt(a.value) + parseInt(b.value)">
  <input type="number" id="a" name="a" value="10"> +
  <input type="number" id="b" name="b" value="5"> =
  <output id="result" name="result" for="a b">15</output>
</form>
\`\`\`

**Atributele \`<output>\`:**
• **\`for\`** — ID-urile elementelor care contribuie la calcul (similar cu \`label[for]\`).
• **\`name\`** — numele câmpului (trimis cu formularul dacă e în \`<form>\`).
• **\`form\`** — asociere cu un formular extern.

**Calculator IMC (Body Mass Index):**
\`\`\`html
<form id="bmi-form">
  <label>
    Înălțime (cm):
    <input type="number" id="height" min="100" max="250" value="175">
  </label>
  <label>
    Greutate (kg):
    <input type="number" id="weight" min="30" max="200" value="70">
  </label>

  <output id="bmi-result" for="height weight">
    IMC: —
  </output>
  <output id="bmi-category">
    —
  </output>
</form>

<script>
function calcBMI() {
  const h = parseFloat(document.getElementById('height').value) / 100;
  const w = parseFloat(document.getElementById('weight').value);
  if (!h || !w) return;

  const bmi = (w / (h * h)).toFixed(1);
  document.getElementById('bmi-result').value = 'IMC: ' + bmi;

  let cat, color;
  if (bmi < 18.5) { cat = 'Subponderal'; color = '#3498db'; }
  else if (bmi < 25) { cat = 'Normal ✓'; color = '#2ecc71'; }
  else if (bmi < 30) { cat = 'Supraponderal'; color = '#f39c12'; }
  else { cat = 'Obezitate'; color = '#e74c3c'; }

  const catEl = document.getElementById('bmi-category');
  catEl.value = cat;
  catEl.style.color = color;
}

document.getElementById('height').addEventListener('input', calcBMI);
document.getElementById('weight').addEventListener('input', calcBMI);
calcBMI(); // calcul inițial
</script>
\`\`\`

**Convertor valute:**
\`\`\`html
<form id="converter">
  <input type="number" id="ron" placeholder="RON" min="0" step="0.01">
  <span>RON =</span>
  <output id="eur" for="ron">0.00</output> EUR

  <output id="usd" for="ron">0.00</output> USD
</form>

<script>
const rates = { eur: 0.201, usd: 0.219 };
document.getElementById('ron').addEventListener('input', (e) => {
  const ron = parseFloat(e.target.value) || 0;
  document.getElementById('eur').value = (ron * rates.eur).toFixed(2);
  document.getElementById('usd').value = (ron * rates.usd).toFixed(2);
});
</script>
\`\`\`

• **\`output.value\`** (JS) sau **\`oninput\`** (HTML) — actualizare dinamică.
• \`<output>\` este inline, ca \`<span>\` — stilizabil cu CSS.
• Semantic important: screen readere îl anunță ca "rezultat" când se schimbă cu \`aria-live\`.
• **\`oninput\`** pe \`<form>\` se declanșează la orice schimbare a unui câmp — elegant pentru calcule simple.` },

  // L20: localStorage, sessionStorage, cookies
  { lesson: "20. localStorage, sessionStorage, cookies", title: "localStorage și sessionStorage", content: `**Web Storage API** (\`localStorage\` și \`sessionStorage\`) stochează date în browser, persitente sau temporare, fără a fi trimise automat la server ca cookies.

**localStorage** — persistent (rămâne după închiderea browser-ului):
\`\`\`javascript
// Scriere
localStorage.setItem('username', 'Cristi');
localStorage.setItem('theme', 'dark');
localStorage.setItem('settings', JSON.stringify({ lang: 'ro', fontSize: 16 }));

// Citire
const user = localStorage.getItem('username');      // 'Cristi'
const theme = localStorage.getItem('theme');         // 'dark'
const settings = JSON.parse(localStorage.getItem('settings')); // { lang: 'ro', ... }
const missing = localStorage.getItem('nonexistent'); // null

// Actualizare
localStorage.setItem('username', 'Cristian'); // suprascrie

// Ștergere
localStorage.removeItem('theme');             // șterge o cheie
localStorage.clear();                         // șterge TOTUL

// Iterare
console.log(localStorage.length);            // nr. de chei
for (let i = 0; i < localStorage.length; i++) {
  const key = localStorage.key(i);
  console.log(key, localStorage.getItem(key));
}
Object.keys(localStorage).forEach(key => console.log(key));
\`\`\`

**sessionStorage** — temporar (dispare la închiderea tab-ului):
\`\`\`javascript
// Aceeași API ca localStorage
sessionStorage.setItem('cart-step', '2');
sessionStorage.setItem('draft-form', JSON.stringify({ email: 'test@ro', msg: 'draft...' }));

const step = sessionStorage.getItem('cart-step'); // '2'

// DIFERENȚA CHEIE:
// localStorage: persists after tab close, cross-tab same origin
// sessionStorage: tab-specific, cleared on close
\`\`\`

**Exemplu: preferințe utilizator cu localStorage:**
\`\`\`javascript
// Aplicarea temei la startup
const theme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', theme);

// Toggle dark/light mode
document.getElementById('theme-btn').addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});

// Auto-save form draft
const form = document.getElementById('contact-form');
form.addEventListener('input', () => {
  const data = { name: form.name.value, email: form.email.value, msg: form.message.value };
  localStorage.setItem('contact-draft', JSON.stringify(data));
});

// Restore draft
const draft = JSON.parse(localStorage.getItem('contact-draft'));
if (draft) {
  form.name.value = draft.name || '';
  form.email.value = draft.email || '';
  form.message.value = draft.msg || '';
}

// Clear draft la submit
form.addEventListener('submit', () => localStorage.removeItem('contact-draft'));
\`\`\`

**Storage event (sincronizare între tab-uri):**
\`\`\`javascript
// Se declanșează în ALTE tab-uri (nu în cel curent)
window.addEventListener('storage', (e) => {
  console.log('Cheie modificată:', e.key);
  console.log('Valoare veche:', e.oldValue);
  console.log('Valoare nouă:', e.newValue);
  console.log('URL:', e.url);

  if (e.key === 'theme') applyTheme(e.newValue);
});
\`\`\`

• **Limita**: ~5-10MB per origine (variabil pe browser).
• **Nu stoca date sensibile** — parole, tokens — Web Storage nu e criptat.
• Valorile sunt **întotdeauna string-uri** — serializează obiecte cu \`JSON.stringify\`.
• Web Storage e **sincron** — operațiile mari blochează UI thread-ul.` },

  { lesson: "20. localStorage, sessionStorage, cookies", title: "Cookies", content: `**Cookies** sunt perechi cheie-valoare stocate în browser și trimise automat la server cu fiecare request HTTP. Sunt standardul pentru autentificare și tracking.

**Citire și scriere cookies cu JavaScript:**
\`\`\`javascript
// Setare cookie simplu
document.cookie = 'username=Cristi';

// Cu expiare (max-age în secunde sau expires cu dată)
document.cookie = 'session=abc123; max-age=3600';           // 1 oră
document.cookie = 'remember=true; max-age=' + (30*24*3600); // 30 zile
document.cookie = 'token=xyz; expires=Thu, 01 Jan 2026 00:00:00 GMT';

// Cu atribute de securitate
document.cookie = 'auth=token123; path=/; secure; samesite=strict';

// Citire — returnează TOATE cookie-urile ca string
console.log(document.cookie); // "username=Cristi; session=abc123; remember=true"

// Parser util
function getCookie(name) {
  const value = '; ' + document.cookie;
  const parts = value.split('; ' + name + '=');
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
}

const user = getCookie('username'); // 'Cristi'

// Ștergere (setezi max-age=0 sau date în trecut)
document.cookie = 'username=; max-age=0';
document.cookie = 'session=; expires=Thu, 01 Jan 1970 00:00:00 GMT';
\`\`\`

**Atributele unui cookie:**
\`\`\`
path=/ → disponibil pe întreg site-ul (implicit /)
domain=.devzone.ro → accesibil pe subdomenii
max-age=3600 → expiră după N secunde
expires=date → expiră la dată specifică
secure → transmis DOAR pe HTTPS
httponly → NU accesibil din JavaScript (protecție XSS) — doar server-side
samesite=Strict|Lax|None → protecție CSRF
\`\`\`

**Cookie Manager helper:**
\`\`\`javascript
const cookies = {
  set(name, value, options = {}) {
    let cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);
    if (options.maxAge) cookie += '; max-age=' + options.maxAge;
    if (options.path) cookie += '; path=' + options.path;
    if (options.domain) cookie += '; domain=' + options.domain;
    if (options.secure) cookie += '; secure';
    if (options.sameSite) cookie += '; samesite=' + options.sameSite;
    document.cookie = cookie;
  },
  get(name) {
    const match = document.cookie.match(new RegExp('(^|;\\s*)' + encodeURIComponent(name) + '=([^;]*)'));
    return match ? decodeURIComponent(match[2]) : null;
  },
  delete(name, path = '/') {
    document.cookie = encodeURIComponent(name) + '=; max-age=0; path=' + path;
  }
};

cookies.set('lang', 'ro', { maxAge: 365*24*3600, path: '/', sameSite: 'Lax' });
cookies.get('lang');    // 'ro'
cookies.delete('lang');
\`\`\`

• **\`HttpOnly\`** — cel mai important atribut de securitate: cookie-ul nu poate fi citit de JavaScript (protecție împotriva XSS).
• **\`SameSite=Strict\`** — nu se trimite în request-uri cross-site (protecție CSRF).
• **\`Secure\`** — transmis doar pe HTTPS — obligatoriu în producție.
• Cookies fără \`expires\` sau \`max-age\` = session cookie (dispare la închiderea browser-ului).
• **GDPR**: cookie-urile non-esențiale necesită consimțământ explicit al utilizatorului.` },

  { lesson: "20. localStorage, sessionStorage, cookies", title: "Storage vs Cookies", content: `Alegerea dintre **localStorage**, **sessionStorage** și **cookies** depinde de cazul de utilizare: persistență, accesibilitate server-side, și securitate.

**Tabel comparativ:**
\`\`\`
                    localStorage  sessionStorage  Cookies
─────────────────────────────────────────────────────────
Capacitate          5-10 MB       5-10 MB        ~4KB
Expiare             Niciodată     La închidere   Configurabil
Trimis la server    Nu            Nu             Da (automat)
Accesibil JS        Da            Da             Da (dacă nu HttpOnly)
Accesibil server    Nu            Nu             Da
Securitate          Medie         Medie          Înaltă (HttpOnly+Secure)
Cross-tab           Da            Nu             Da
Tip date            String        String         String
\`\`\`

**Când să folosești ce:**
\`\`\`
localStorage:
  ✓ Preferințe UI (temă, limbă, font-size)
  ✓ Cache date JSON pentru offline
  ✓ Draft forms (auto-save)
  ✓ Shopping cart temporar
  ✗ Date sensibile (parole, tokens)
  ✗ Date ce trebuie sincronizate cu serverul

sessionStorage:
  ✓ Date wizard/multi-step forms (pasul curent)
  ✓ State specific unui singur tab
  ✓ Scroll position temporar
  ✗ Orice ce trebuie persistent

Cookies:
  ✓ Session tokens / JWT (cu HttpOnly!)
  ✓ Remember Me (login persistent)
  ✓ Analytics / tracking
  ✓ Preferințe accesibile server-side
  ✗ Date mari (limita 4KB)
\`\`\`

**Antipattern — NU stoca tokens în localStorage:**
\`\`\`javascript
// GREȘIT — vulnerabil la XSS
localStorage.setItem('jwt_token', 'eyJhbGciOiJIUzI1NiJ9...');

// CORECT — token în HttpOnly cookie (nu accesibil din JS)
// Setare pe server (Node.js Express):
res.cookie('auth_token', jwtToken, {
  httpOnly: true,    // nu accesibil din JS
  secure: true,      // HTTPS only
  sameSite: 'strict', // protecție CSRF
  maxAge: 7 * 24 * 60 * 60 * 1000  // 7 zile
});
\`\`\`

**IndexedDB — pentru date mari structurate:**
\`\`\`javascript
// localStorage e sincron și limitat — pentru date mari, folosești IndexedDB
const dbReq = indexedDB.open('myAppDB', 1);

dbReq.onupgradeneeded = (e) => {
  const db = e.target.result;
  db.createObjectStore('articles', { keyPath: 'id' });
};

dbReq.onsuccess = (e) => {
  const db = e.target.result;
  const tx = db.transaction('articles', 'readwrite');
  tx.objectStore('articles').add({ id: 1, title: 'HTML5', content: '...' });
};
\`\`\`

**Verificare suport și erori:**
\`\`\`javascript
function storageAvailable(type) {
  try {
    const s = window[type];
    const test = '__test__';
    s.setItem(test, test);
    s.removeItem(test);
    return true;
  } catch(e) {
    return false; // Private mode Safari, storage full, etc.
  }
}

if (storageAvailable('localStorage')) {
  localStorage.setItem('key', 'value');
} else {
  console.warn('localStorage nu e disponibil');
}
\`\`\`

• localStorage se poate umple — prinde eroarea \`QuotaExceededError\`.
• Cookie-urile cu \`SameSite=None\` necesită \`Secure\` — regula Chrome 80+.
• **GDPR Cookie Consent**: cookie-urile de analiză și marketing necesită consimțământ; cele funcționale (auth) — nu.` },
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
