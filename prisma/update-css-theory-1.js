"use strict";
require("dotenv").config({ path: ".env" });
const { PrismaClient } = require("@prisma/client");
const p = new PrismaClient();

const UPDATES = [
  {
    lessonContains: "Introducere CSS",
    titleContains: "Ce e CSS",
    content: `**CSS** (Cascading Style Sheets) este limbajul de stilizare al web-ului — definește aspectul vizual al documentelor HTML: culori, fonturi, spațiere, layout, animații și responsiveness.

**Cum funcționează CSS:**
\`\`\`css
/* Selector → Declarație → Proprietate: Valoare */
h1 {
  color: #2563eb;       /* culoare text albastru */
  font-size: 2rem;      /* dimensiune font */
  margin-bottom: 1rem;  /* spațiu jos */
}
\`\`\`

**Cele trei modalități de a adăuga CSS:**
\`\`\`html
<!-- 1. Fișier extern — RECOMANDAT -->
<link rel="stylesheet" href="styles.css">

<!-- 2. Tag <style> în HTML — pentru pagini mici -->
<style>
  body { font-family: sans-serif; }
</style>

<!-- 3. Inline style — evitat, specificitate foarte mare -->
<p style="color: red; font-size: 16px;">Text roșu</p>
\`\`\`

**Cascada (C din CSS) — sursa unică de adevăr:**
CSS aplică stilurile în cascadă: când mai multe reguli se aplică aceluiași element, câștigă regula cu **specificitate** mai mare, sau ultima declarată dacă specificitățile sunt egale.

\`\`\`css
/* Specificitate: 0-0-1 (element) */
p { color: black; }

/* Specificitate: 0-1-0 (clasă) — câștigă față de element */
.intro { color: blue; }

/* Specificitate: 1-0-0 (id) — câștigă față de clasă */
#titlu { color: red; }

/* !important — câștigă față de orice (evitat) */
p { color: green !important; }
\`\`\`

**Moștenirea proprietăților:**
\`\`\`css
/* Proprietăți text se moștenesc */
body {
  font-family: 'Inter', sans-serif;
  color: #1a1a1a;
  line-height: 1.6;
  /* font-size, font-weight, color se moștenesc în copii */
}

/* Proprietăți box NU se moștenesc implicit */
div { border: 1px solid red; }
/* Copiii div-ului NU primesc border automat */

/* Forțare moștenire */
.child { border: inherit; }
\`\`\`

**Valori CSS fundamentale:**
| Tip | Exemple |
|-----|---------|
| Culori | \`#ff6b6b\`, \`rgb(255,0,0)\`, \`hsl(0,100%,50%)\`, \`red\` |
| Lungimi | \`px\`, \`rem\`, \`em\`, \`%\`, \`vw\`, \`vh\` |
| Fonturi | \`serif\`, \`sans-serif\`, \`monospace\`, \`'Inter'\` |
| Display | \`block\`, \`flex\`, \`grid\`, \`inline\`, \`none\` |`
  },
  {
    lessonContains: "Introducere CSS",
    titleContains: "Selectori principali",
    content: `**Selectorii CSS** identifică elementele HTML la care se aplică stilurile. Cunoașterea selectorilor e fundamentală pentru a scrie CSS eficient și precis.

**Categorii principale:**
\`\`\`css
/* Selector universal — toate elementele */
* { box-sizing: border-box; margin: 0; padding: 0; }

/* Selector element/tag */
p { color: #333; }
h1, h2, h3 { font-weight: bold; }  /* Grup de selectori */

/* Selector clasă — cel mai folosit */
.card { border-radius: 8px; padding: 1rem; }
.btn.btn-primary { background: blue; }  /* Ambele clase */

/* Selector ID — unic per pagină */
#header { position: fixed; top: 0; }

/* Selector descendant (spațiu) — orice adâncime */
.card p { margin-bottom: 0.5rem; }  /* Toate p din .card */

/* Selector child (>) — doar copii direcți */
.nav > li { display: inline-block; }  /* Doar li direct în .nav */

/* Selector adjacent (+) — imediat următor */
h2 + p { font-size: 1.1rem; }  /* p imediat după h2 */

/* Selector general sibling (~) — orice următor */
h2 ~ p { color: #666; }  /* Toate p după h2 */
\`\`\`

**Selectori de atribut:**
\`\`\`css
/* Are atributul href */
a[href] { text-decoration: underline; }

/* Atribut cu valoare exactă */
input[type="text"] { border: 1px solid #ccc; }
input[type="checkbox"] { cursor: pointer; }

/* Conține cuvântul "btn" în atribut class */
[class~="btn"] { padding: 0.5rem 1rem; }

/* Valoare care ÎNCEPE cu "https" */
a[href^="https"] { color: green; }

/* Valoare care SE TERMINĂ cu ".pdf" */
a[href$=".pdf"]::after { content: " (PDF)"; }

/* Valoare care CONȚINE "example" */
a[href*="example"] { font-style: italic; }

/* Case-insensitive (i) */
a[href="HTTPS://example.com" i] { /* ... */ }
\`\`\`

**Combinatori și exemple practice:**
\`\`\`css
/* Card cu header și body */
.card .card-header { background: #f5f5f5; border-bottom: 1px solid #e0e0e0; }
.card > .card-body { padding: 1.5rem; }

/* Formular — stiluri pe câmpuri */
form input,
form select,
form textarea {
  border: 1px solid #d1d5db;
  border-radius: 6px;
  padding: 0.5rem 0.75rem;
  width: 100%;
}

/* Link activ în navigare */
.nav a:hover,
.nav a:focus,
.nav a.active { color: #2563eb; }
\`\`\``
  },
  {
    lessonContains: "Introducere CSS",
    titleContains: "Pseudo-clase",
    content: `**Pseudo-clasele** selectează elemente în stări specifice (\`:hover\`, \`:focus\`) sau după poziția lor în structura HTML (\`:nth-child\`, \`:first-child\`). **Pseudo-elementele** creează elemente virtuale (\`::before\`, \`::after\`).

**Pseudo-clase de stare:**
\`\`\`css
/* Interacțiune utilizator */
a:hover { color: #2563eb; text-decoration: underline; }
button:hover { background: #1d4ed8; }
button:active { transform: scale(0.98); }  /* Moment apăsare */
input:focus { outline: 2px solid #3b82f6; border-color: transparent; }
input:focus-visible { /* Focus doar din tastatură, nu mouse */ }
:disabled { opacity: 0.5; cursor: not-allowed; }
:checked { accent-color: #3b82f6; }
input:valid { border-color: green; }
input:invalid { border-color: red; }
input:placeholder-shown { border-color: gray; }
\`\`\`

**Pseudo-clase structurale:**
\`\`\`css
/* Poziție în liste */
li:first-child { border-top: none; }
li:last-child { border-bottom: none; }
li:nth-child(odd) { background: #f9fafb; }   /* Impar: 1,3,5... */
li:nth-child(even) { background: white; }     /* Par: 2,4,6... */
li:nth-child(3n) { color: blue; }             /* La fiecare 3 */
li:nth-child(3n+1) { font-weight: bold; }     /* 1,4,7,10... */
li:only-child { border: 2px solid gold; }     /* Singurul copil */

/* Element fără copii */
p:empty { display: none; }

/* Nu aplica pe .special */
p:not(.special) { color: gray; }
p:not(:last-child) { margin-bottom: 1rem; }
\`\`\`

**Pseudo-elemente:**
\`\`\`css
/* Conținut generat */
.card::before {
  content: '';
  display: block;
  height: 4px;
  background: linear-gradient(90deg, #3b82f6, #8b5cf6);
  border-radius: 4px 4px 0 0;
}

.req::after { content: ' *'; color: red; }  /* Câmp obligatoriu */

/* Stilizare text */
p::first-line { font-variant: small-caps; }
p::first-letter { font-size: 3em; float: left; margin-right: 0.1em; }

/* Selecție text */
::selection { background: #3b82f6; color: white; }

/* Placeholder */
input::placeholder { color: #9ca3af; font-style: italic; }
\`\`\`

**Combinare eficientă:**
\`\`\`css
/* Card cu hover effect și badge */
.card:hover { box-shadow: 0 8px 24px rgba(0,0,0,0.12); transform: translateY(-2px); }
.card:hover::after { content: 'Nou'; background: #ef4444; color: white; }
li:last-child:hover { border-radius: 0 0 8px 8px; }
\`\`\``
  },
  {
    lessonContains: "Introducere CSS",
    titleContains: "Specificitate",
    content: `**Specificitatea** determină care regulă CSS câștigă când mai multe reguli se aplică aceluiași element. **Cascada** determină ordinea de aplicare când specificitățile sunt egale.

**Calculul specificității (A-B-C):**
\`\`\`
A = numărul de id-uri (#)
B = numărul de clase (.), atribute ([]), pseudo-clase (:)
C = numărul de elemente (div, p) și pseudo-elemente (::before)

* (universal) = 0-0-0
element (p, div) = 0-0-1
.clasa, [atribut], :hover = 0-1-0
#id = 1-0-0
inline style = câștigă față de orice selector
!important = câștigă față de orice (inclusiv inline)
\`\`\`

\`\`\`css
p                    /* 0-0-1 */
.card                /* 0-1-0 */
.card p              /* 0-1-1 */
.card .text          /* 0-2-0 */
#header              /* 1-0-0 */
#header .nav a       /* 1-1-1 */
.card:hover          /* 0-2-0 */
a:hover              /* 0-1-1 */
\`\`\`

**Exemple de conflict:**
\`\`\`css
/* Câștigă: 0-1-0 > 0-0-1 */
.red { color: red; }    /* 0-1-0 */
p { color: blue; }      /* 0-0-1 */
/* Paragraful cu clasă .red va fi roșu */

/* Câștigă: 1-0-0 > 0-1-0 */
#titlu { color: green; }  /* 1-0-0 */
.red { color: red; }      /* 0-1-0 */
/* #titlu.red va fi verde */
\`\`\`

**Cascada — reguli de rezolvare a conflictelor (în ordine):**
1. **Origine** (user agent → user → author → !important)
2. **Specificitate** — mai mare câștigă
3. **Ordine** — ultima declarație câștigă (la specificitate egală)

\`\`\`css
/* Ordine — ultima câștigă la specificitate egală */
p { color: blue; }   /* 0-0-1 */
p { color: red; }    /* 0-0-1 — câștigă (ultima) */

/* Reset la specificitate mică — :where() */
:where(h1, h2, h3) { margin: 0; }  /* 0-0-0 specificitate! */
/* Poate fi suprascris cu orice selector */
\`\`\`

**Best practices:**
\`\`\`css
/* ✅ Specificitate joasă — ușor de suprascris */
.btn { /* ... */ }
.btn-primary { /* ... */ }

/* ❌ Specificitate înaltă — greu de suprascris */
#app .container .card .btn { /* ... */ }

/* ✅ :is() nu crește specificitatea peste maximul din interior */
:is(h1, h2, h3) { color: blue; }  /* 0-0-1 — la fel ca h1 */

/* ✅ :where() = specificitate 0 */
:where(h1, h2, h3) { color: blue; }  /* 0-0-0 */
\`\`\``
  },
  {
    lessonContains: "Box Model",
    titleContains: "Anatomy",
    content: `**Box Model** este conceptul fundamental al CSS-ului — fiecare element HTML este o cutie cu patru zone: content, padding, border și margin.

**Componentele Box Model:**
\`\`\`
┌──────────────────────────────────────┐
│             MARGIN                   │ ← Spațiu exterior (transparent)
│  ┌──────────────────────────────┐   │
│  │           BORDER              │   │ ← Bordura vizibilă
│  │  ┌───────────────────────┐   │   │
│  │  │        PADDING        │   │   │ ← Spațiu interior (moștenire background)
│  │  │  ┌─────────────────┐  │   │   │
│  │  │  │    CONTENT      │  │   │   │ ← Conținut text/imagini
│  │  │  └─────────────────┘  │   │   │
│  │  └───────────────────────┘   │   │
│  └──────────────────────────────┘   │
└──────────────────────────────────────┘
\`\`\`

\`\`\`css
.cutie {
  /* Dimensiuni content */
  width: 300px;
  height: 150px;

  /* Padding — spațiu interior (preia culoarea background) */
  padding: 20px;                    /* toate laturile */
  padding: 10px 20px;               /* top/bottom left/right */
  padding: 10px 20px 15px 25px;    /* top right bottom left */
  padding-top: 10px;

  /* Border */
  border: 2px solid #3b82f6;
  border-radius: 8px;               /* colțuri rotunjite */

  /* Margin — spațiu exterior (transparent) */
  margin: 16px;
  margin: 0 auto;   /* Centrare orizontală */

  /* Background se extinde până la border (nu margin) */
  background-color: #f0f9ff;
}
\`\`\`

**Dimensiunea totală a unui element:**
\`\`\`
content-box (default):
Lățime totală = width + padding-left + padding-right + border-left + border-right
= 300 + 20 + 20 + 2 + 2 = 344px

border-box (modern):
Lățime totală = width (include padding și border)
= 300px (content = 300 - 40 - 4 = 256px)
\`\`\`

**Proprietăți individuale:**
\`\`\`css
.card {
  /* Shorthand */
  padding: 24px;
  margin: 16px 0;
  border: 1px solid #e5e7eb;

  /* Individuale */
  padding-top: 24px;
  padding-inline: 24px;   /* Horizontal padding (modern) */
  padding-block: 16px;    /* Vertical padding (modern) */
  border-left: 4px solid #3b82f6;  /* Accent lateral */
  margin-block: 1rem;     /* Vertical margin */

  /* Override selectiv */
  margin: 0;
  margin-top: 16px;   /* Suprascrie doar top */
}
\`\`\``
  },
  {
    lessonContains: "Box Model",
    titleContains: "box-sizing",
    content: `**box-sizing** controlează cum se calculează dimensiunile unui element. \`border-box\` este setarea modernă standard — include padding și border în dimensiunile declarate.

**Problema cu content-box (default):**
\`\`\`css
/* Content-box — DEFAULT — dimensiune totală > width declarată */
.input {
  width: 100%;         /* Vrei să ocupe tot containerul */
  padding: 12px 16px;  /* Adaugă 32px în lățime */
  border: 2px solid;   /* Adaugă 4px în lățime */
  /* Lățime reală: 100% + 36px → DEPĂȘEȘTE containerul! */
}
\`\`\`

\`\`\`css
/* Border-box — MODERN — padding și border INCLUSE în width */
.input {
  box-sizing: border-box;
  width: 100%;         /* Ocupă exact 100% din container */
  padding: 12px 16px;  /* Inclus în width */
  border: 2px solid;   /* Inclus în width */
  /* Lățime reală: exact 100% */
}
\`\`\`

**Reset universal (best practice — orice proiect modern):**
\`\`\`css
*, *::before, *::after {
  box-sizing: border-box;
}
\`\`\`

**Comparație vizuală:**
\`\`\`css
/* Ambele au width: 200px */

/* Content-box */
.content-box {
  box-sizing: content-box; /* default */
  width: 200px;
  padding: 20px;
  border: 5px solid;
  /* Lățime reală: 200 + 40 + 10 = 250px */
}

/* Border-box */
.border-box {
  box-sizing: border-box;
  width: 200px;
  padding: 20px;
  border: 5px solid;
  /* Lățime reală: 200px (content = 200 - 40 - 10 = 150px) */
}
\`\`\`

**Utilizare cu coloane:**
\`\`\`css
/* Fără box-sizing: border-box — coloanele depășesc 100% */
.col-left, .col-right {
  float: left;
  width: 50%;
  padding: 20px;   /* +40px → total > 100% → overflow */
}

/* Cu box-sizing: border-box — funcționează perfect */
*, *::before, *::after { box-sizing: border-box; }
.col-left, .col-right {
  float: left;
  width: 50%;
  padding: 20px;   /* Inclus în 50% */
}
\`\`\`

**min-width, max-width:**
\`\`\`css
.container {
  width: 90%;
  max-width: 1200px;  /* Nu depăși 1200px pe ecrane mari */
  min-width: 320px;   /* Nu scăde sub 320px pe ecrane mici */
  margin: 0 auto;     /* Centrare */
}
\`\`\``
  },
  {
    lessonContains: "Box Model",
    titleContains: "margin",
    content: `**Margin shortcuts** permit setarea eficientă a marginilor. **Colapsarea marginilor** (margin collapsing) este un comportament special care surprinde mulți developeri.

**Shorthand margin:**
\`\`\`css
/* 1 valoare — toate laturile */
margin: 16px;

/* 2 valori — top/bottom, left/right */
margin: 16px 32px;   /* 16px vertical, 32px horizontal */

/* 3 valori — top, left/right, bottom */
margin: 8px 16px 24px;

/* 4 valori — top right bottom left (TRBL = TRouBLe) */
margin: 8px 16px 24px 32px;

/* Valori speciale */
margin: 0 auto;   /* Centrare orizontală (element cu width definit) */
margin-inline: auto; /* Modern: centrare orizontală */
margin: auto;     /* Centrare (în flex/grid) */
\`\`\`

**Margin collapsing — comportament special:**
\`\`\`css
/* Marginile VERTICALE ale elementelor block adiacente se colapsează */
h2 { margin-bottom: 24px; }
p  { margin-top: 16px; }

/* Spațiu real între h2 și p = max(24px, 16px) = 24px, nu 40px! */

/* Colapsare parent-child (primul și ultimul copil) */
.container { margin-top: 32px; }
.container .first-child { margin-top: 16px; }
/* Dacă nu există border/padding pe .container → marginile se colapsează */
/* .container + .first-child = max(32px, 16px) = 32px față de elementul anterior */
\`\`\`

\`\`\`css
/* Prevenire margin collapsing: */

/* 1. Adaugă padding (oricât de mic) pe parent */
.container { padding-top: 1px; }

/* 2. Adaugă border pe parent */
.container { border-top: 1px solid transparent; }

/* 3. Folosește overflow: hidden pe parent */
.container { overflow: hidden; }

/* 4. Folosește display: flex sau grid — NU colapsează! */
.container { display: flex; flex-direction: column; }

/* 5. Folosește gap în loc de margin în flex/grid */
.flex-parent { display: flex; flex-direction: column; gap: 16px; }
/* Nu ai nevoie de margin pe copii! */
\`\`\`

**Proprietăți logice moderne (independent de scriere LTR/RTL):**
\`\`\`css
.element {
  margin-block: 16px;    /* margin-top + margin-bottom */
  margin-inline: 32px;   /* margin-left + margin-right */
  padding-block: 12px;
  padding-inline: 20px;
  border-block-end: 1px solid #e5e7eb;  /* bottom border */
  inset-inline-start: 0; /* left în LTR, right în RTL */
}
\`\`\``
  },
  {
    lessonContains: "Display și Position",
    titleContains: "display",
    content: `**Proprietatea display** controlează tipul de formatare al elementului — cum participă în fluxul documentului și cum se comportă față de elementele vecine.

**Valorile fundamentale:**
\`\`\`css
/* BLOCK — ocupă toată lățimea disponibilă, forțează linie nouă */
display: block;
/* Elemente block implicit: div, p, h1-h6, ul, li, form, header, section */
div { display: block; }  /* default */

/* INLINE — ocupă doar spațiul conținutului, fără linie nouă */
display: inline;
/* Elemente inline implicit: span, a, strong, em, img, input */
span { display: inline; }  /* default */
/* ❌ Nu acceptă width/height sau margin-top/bottom */

/* INLINE-BLOCK — inline dar acceptă width/height/margin */
display: inline-block;
/* Util pentru: butoane, badge-uri, tag-uri */
.badge {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 4px;
  background: #e0e7ff;
  /* Stă în linie cu textul, dar acceptă padding/margin */
}

/* NONE — ascunde elementul complet (nu ocupă spațiu) */
display: none;
/* vs visibility: hidden — ascunde dar PĂSTREAZĂ spațiul */

/* FLEX și GRID — layout modern */
display: flex;
display: grid;
display: inline-flex;
display: inline-grid;
\`\`\`

**Comparație block vs inline vs inline-block:**
\`\`\`css
/* Block */
.block-ex {
  display: block;
  width: 200px;       /* ✅ Acceptat */
  height: 100px;      /* ✅ Acceptat */
  margin-top: 20px;   /* ✅ Acceptat */
  /* Forțează linie nouă înainte și după */
}

/* Inline */
.inline-ex {
  display: inline;
  width: 200px;       /* ❌ Ignorat */
  height: 100px;      /* ❌ Ignorat */
  margin-top: 20px;   /* ❌ Ignorat (stânga/dreapta funcționează) */
}

/* Inline-block */
.inline-block-ex {
  display: inline-block;
  width: 200px;       /* ✅ Acceptat */
  height: 100px;      /* ✅ Acceptat */
  margin-top: 20px;   /* ✅ Acceptat */
  /* Stă în linie cu alte elemente */
}
\`\`\`

**contents — elimină cutia dar păstrează copiii:**
\`\`\`css
.wrapper { display: contents; }
/* .wrapper dispare vizual, copiii săi merg în flow-ul parent-ului */
/* Util în grid/flex când vrei să "sari" un nivel de wrapper */
\`\`\``
  },
  {
    lessonContains: "Display și Position",
    titleContains: "position",
    content: `**Proprietatea position** controlează cum un element e poziționat în pagină — în fluxul normal sau scos din el.

**Cele 5 valori:**
\`\`\`css
/* STATIC — default — în fluxul normal al documentului */
position: static;
/* top/left/right/bottom/z-index nu au efect */

/* RELATIVE — în flux, dar poate fi deplasat față de locul său natural */
position: relative;
top: 10px;   /* Jos cu 10px față de unde ar fi normal */
left: 20px;  /* Dreapta cu 20px */
/* SPAȚIUL ORIGINAL e PĂSTRAT în flux! */

/* ABSOLUTE — scos din flux, poziționat față de cel mai apropiat ancestor non-static */
position: absolute;
top: 0;
right: 0;
/* Spațiul NU mai e rezervat în flux */
/* Dacă niciun ancestor nu e non-static → față de <html> */

/* FIXED — față de viewport (browser window) */
position: fixed;
top: 0; left: 0;
width: 100%;
/* Header/footer fix, back-to-top button */
/* Nu se mișcă la scroll */

/* STICKY — relative până la prag, apoi fixed */
position: sticky;
top: 60px;  /* Rămâne la 60px de top când ajunge acolo */
/* Funcționează în cadrul parent-ului! */
\`\`\`

**Pattern-ul clasic absolute + relative:**
\`\`\`css
/* Parent = context de poziționare */
.card {
  position: relative;  /* Ancestor non-static */
}

/* Badge poziționat în colțul cardului */
.badge {
  position: absolute;
  top: -8px;
  right: -8px;
  background: #ef4444;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
}

/* Overlay full-cover pe card */
.overlay {
  position: absolute;
  inset: 0;  /* top: 0; right: 0; bottom: 0; left: 0 */
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}
\`\`\`

**Sticky header în tabel:**
\`\`\`css
thead th {
  position: sticky;
  top: 0;
  background: white;
  z-index: 1;
  border-bottom: 2px solid #e5e7eb;
}

/* Sidebar sticky */
.sidebar {
  position: sticky;
  top: 80px;  /* 20px sub header fix */
  align-self: flex-start;  /* Necessar în flex container */
}
\`\`\``
  },
  {
    lessonContains: "Display și Position",
    titleContains: "z-index",
    content: `**z-index** controlează ordinea de suprapunere a elementelor poziționate — element cu z-index mai mare apare deasupra. Funcționează doar pe elemente cu \`position\` non-static sau în flex/grid.

**Stacking context:**
\`\`\`css
/* z-index funcționează doar cu position: relative/absolute/fixed/sticky */
.deasupra {
  position: relative;
  z-index: 10;
}

.dedesubt {
  position: relative;
  z-index: 1;
}

/* ❌ z-index fără position: nu funcționează */
.nu-merge {
  z-index: 999;  /* Ignorat dacă position: static */
}
\`\`\`

**Stacking context — izolarea straturilor:**
\`\`\`css
/* Un nou stacking context se creează cu: */
/* - position + z-index non-auto */
/* - opacity < 1 */
/* - transform, filter, perspective */
/* - isolation: isolate */

.modal-container {
  position: fixed;
  z-index: 1000;
  /* Orice copil al .modal-container e izolat de restul paginii */
}

/* Forțare stacking context fără alte efecte: */
.isolate {
  isolation: isolate;
  /* Crează context nou fără side effects vizuale */
}
\`\`\`

**Sistem de z-index organizat:**
\`\`\`css
:root {
  --z-negative: -1;
  --z-normal: 0;
  --z-raised: 10;     /* Card hover, dropdown */
  --z-dropdown: 100;  /* Meniuri dropdown */
  --z-sticky: 200;    /* Header sticky */
  --z-overlay: 300;   /* Overlay background */
  --z-modal: 400;     /* Dialog/Modal */
  --z-toast: 500;     /* Notificări */
  --z-tooltip: 600;   /* Tooltips */
}

.dropdown { z-index: var(--z-dropdown); }
.header { z-index: var(--z-sticky); }
.modal-overlay { z-index: var(--z-overlay); }
.modal { z-index: var(--z-modal); }
.toast { z-index: var(--z-toast); }
\`\`\`

**Debugging z-index:**
\`\`\`css
/* Verificare: elementul are position non-static? */
/* Există un ancestor care creează un stacking context nou? */
/* (opacity, transform, filter pe parent pot "limita" z-index-ul copilului) */

.debug-stacking * {
  outline: 1px solid rgba(255,0,0,0.3);
}
\`\`\``
  },
  {
    lessonContains: "Flexbox",
    titleContains: "Flex container",
    content: `**Flexbox** (Flexible Box Layout) este sistemul de layout unidimensional al CSS — aranjează itemii fie pe un rând (row) fie pe o coloană (column), cu aliniere și distribuire spațiu facilă.

**Container și axe:**
\`\`\`css
.flex-container {
  display: flex;          /* Activează Flexbox */
  /* sau display: inline-flex — container inline */
}
\`\`\`

\`\`\`
flex-direction: row (default)     flex-direction: column
════════════════════════           ╔═══╗
  [1] [2] [3] [4]                  ║ 1 ║
════════════════════════           ╠═══╣
  Main axis: →                     ║ 2 ║
  Cross axis: ↓                    ╠═══╣
                                   ║ 3 ║
                                   Main axis: ↓
                                   Cross axis: →
\`\`\`

\`\`\`css
.flex-container {
  display: flex;

  /* DIRECȚIE */
  flex-direction: row;         /* default — stânga la dreapta */
  flex-direction: row-reverse; /* dreapta la stânga */
  flex-direction: column;      /* sus în jos */
  flex-direction: column-reverse;

  /* WRAP */
  flex-wrap: nowrap;    /* default — nu trece pe linia nouă */
  flex-wrap: wrap;      /* trece pe linia nouă dacă nu încap */
  flex-wrap: wrap-reverse;

  /* SHORTHAND */
  flex-flow: row wrap;  /* flex-direction + flex-wrap */

  /* GAP — spațiu între itemi (modern, preferabil față de margin) */
  gap: 16px;            /* rând și coloană */
  row-gap: 16px;
  column-gap: 8px;
}
\`\`\`

**Navigare orizontală cu Flexbox:**
\`\`\`css
.navbar {
  display: flex;
  align-items: center;  /* Aliniere verticală centrată */
  gap: 8px;
  padding: 0 1rem;
  height: 60px;
}

.navbar-brand { font-weight: bold; font-size: 1.25rem; }

/* Spinge elementele din dreapta */
.navbar-nav { margin-left: auto; display: flex; gap: 4px; }
/* sau: flex: 1 pe un spacer div */
\`\`\``
  },
  {
    lessonContains: "Flexbox",
    titleContains: "Aliniere",
    content: `**Alinierea în Flexbox** — \`justify-content\` pe axa principală, \`align-items\` pe axa secundară, și \`gap\` pentru spațierea între itemi.

**justify-content — axa principală (main axis):**
\`\`\`css
.container {
  display: flex;
  width: 600px;
}

/* Distribuire pe axa principală */
justify-content: flex-start;      /* default — la început */
justify-content: flex-end;        /* la sfârșit */
justify-content: center;          /* centrat */
justify-content: space-between;   /* spațiu ÎNTRE itemi */
justify-content: space-around;    /* spațiu JURUL itemilor */
justify-content: space-evenly;    /* spațiu EGAL inclusiv margini */
\`\`\`

\`\`\`
space-between: [1]    [2]    [3]
space-around:  [ 1 ]  [ 2 ]  [ 3 ]
space-evenly: [ ] [1] [ ] [2] [ ] [3] [ ]
\`\`\`

**align-items — axa secundară (cross axis):**
\`\`\`css
.container {
  display: flex;
  height: 200px;
}

align-items: stretch;       /* default — itemi la înălțimea containerului */
align-items: flex-start;    /* sus (pentru row) */
align-items: flex-end;      /* jos (pentru row) */
align-items: center;        /* centrat pe cross axis */
align-items: baseline;      /* aliniere la baseline text */
\`\`\`

**align-content — când există mai multe rânduri (wrap):**
\`\`\`css
.container { display: flex; flex-wrap: wrap; align-content: center; }
\`\`\`

**Centrare perfectă — clasic cu Flexbox:**
\`\`\`css
/* Orizontal + Vertical */
.centered {
  display: flex;
  justify-content: center;
  align-items: center;
  /* Pentru full screen: */
  min-height: 100vh;
}

/* Sau mai scurt în CSS modern */
.centered {
  display: flex;
  place-content: center;   /* justify-content + align-content */
  place-items: center;     /* justify-items + align-items */
}
\`\`\`

**gap vs margin:**
\`\`\`css
/* ✅ gap — nu afectează marginile externe */
.cards { display: flex; gap: 16px; }

/* ❌ margin — mai verbose, trebuie resetat pe first/last */
.cards .card { margin: 8px; }
.cards .card:first-child { margin-left: 0; }
.cards .card:last-child { margin-right: 0; }
\`\`\``
  },
  {
    lessonContains: "Flexbox",
    titleContains: "flex-grow",
    content: `**Flex items** — proprietățile \`flex-grow\`, \`flex-shrink\` și \`flex-basis\` controlează cum itemii se extind, se micșorează și ce dimensiune de bază au.

**flex-grow — extindere:**
\`\`\`css
.item-1 { flex-grow: 0; }  /* default — nu se extinde */
.item-2 { flex-grow: 1; }  /* Preia tot spațiul disponibil */
.item-3 { flex-grow: 2; }  /* Preia DUBLU față de item cu grow: 1 */
\`\`\`

\`\`\`
Container: 600px
Itemi: [100px][grow:1][grow:2]
Spațiu liber: 600 - 100 = 500px
item cu grow:1 primește: 500 * (1/3) ≈ 167px
item cu grow:2 primește: 500 * (2/3) ≈ 333px
\`\`\`

**flex-shrink — micșorare:**
\`\`\`css
.item { flex-shrink: 1; }   /* default — se micșorează dacă e nevoie */
.item { flex-shrink: 0; }   /* Nu se micșorează (minim = basis) */
.item { flex-shrink: 2; }   /* Se micșorează dublu față de shrink:1 */
\`\`\`

**flex-basis — dimensiunea de bază:**
\`\`\`css
.item { flex-basis: auto; }    /* default — folosește width/height */
.item { flex-basis: 200px; }   /* Dimensiune explicită */
.item { flex-basis: 0; }       /* Pornește de la 0 (utile cu grow) */
.item { flex-basis: 25%; }     /* Procentual */
\`\`\`

**flex shorthand:**
\`\`\`css
/* flex: grow shrink basis */
.item { flex: 1; }         /* flex: 1 1 0 — extinde egal */
.item { flex: auto; }      /* flex: 1 1 auto */
.item { flex: none; }      /* flex: 0 0 auto — rigid */
.item { flex: 0 0 200px; } /* Rigid la 200px */
\`\`\`

**Proprietăți individuale pe itemi:**
\`\`\`css
/* align-self — suprascrie align-items pe un singur item */
.item-special {
  align-self: flex-end;  /* Jos, chiar dacă restul e centrat */
}

/* order — reordonare vizuală (nu afectează DOM) */
.item-prima { order: -1; }  /* Apare primul */
.item-ultima { order: 1; }   /* Apare ultimul */

/* Sidebar + main content */
.layout { display: flex; min-height: 100vh; }
.sidebar { flex: 0 0 260px; }  /* Lățime fixă */
.main { flex: 1; }              /* Preia restul */
\`\`\``
  },
  {
    lessonContains: "Flexbox",
    titleContains: "Pattern-uri",
    content: `**Pattern-urile Flexbox** sunt combinații de proprietăți care rezolvă probleme frecvente de layout — navigare, carduri, formulare și layout-uri complexe.

**Navigare responsivă:**
\`\`\`css
.navbar {
  display: flex;
  align-items: center;
  padding: 0 1.5rem;
  height: 64px;
  background: white;
  border-bottom: 1px solid #e5e7eb;
  gap: 1rem;
}

.navbar-logo { font-weight: 700; font-size: 1.25rem; }

.navbar-links {
  display: flex;
  gap: 0.5rem;
  margin-left: auto;  /* Împinge link-urile la dreapta */
}

.navbar-links a {
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  color: #374151;
  text-decoration: none;
}

.navbar-links a:hover { background: #f3f4f6; }
\`\`\`

**Grid de carduri cu Flexbox:**
\`\`\`css
.card-grid {
  display: flex;
  flex-wrap: wrap;    /* Trece pe linia nouă */
  gap: 1.5rem;
}

.card {
  flex: 1 1 300px;    /* Crește/scade, dar nu sub 300px */
  /* Automat: 1 card pe ecran mic, 2+ pe ecran mare */
}
\`\`\`

**Split layout — stânga/dreapta:**
\`\`\`css
.split {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.split-content { flex: 1; }     /* Preia spațiu disponibil */
.split-image { flex: 0 0 400px; } /* Lățime fixă */

/* Responsive — vertical pe mobile */
@media (max-width: 768px) {
  .split { flex-direction: column; }
  .split-image { flex: none; width: 100%; }
}
\`\`\`

**Sticky footer cu Flexbox:**
\`\`\`css
body {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main { flex: 1; }  /* Ocupă tot spațiul disponibil */
/* Footer rămâne jos chiar dacă conținut e puțin */
\`\`\`

**Centrare cu aspect ratio:**
\`\`\`css
.modal-overlay {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
}
.modal {
  width: min(600px, 90vw);   /* Max 600px, min 90% viewport */
  max-height: 90vh;
  overflow-y: auto;
}
\`\`\``
  },
  {
    lessonContains: "CSS Grid",
    titleContains: "Grid container",
    content: `**CSS Grid** este sistemul de layout bidimensional al CSS — controlează simultan rânduri și coloane, perfect pentru layout-uri complexe de pagini.

**Container Grid:**
\`\`\`css
.grid {
  display: grid;  /* sau inline-grid */
}
\`\`\`

**grid-template-columns — definire coloane:**
\`\`\`css
/* Valori fixe */
.grid { grid-template-columns: 200px 400px 200px; }
/* 3 coloane: 200px | 400px | 200px */

/* Unitatea fr (fracțiune din spațiu disponibil) */
.grid { grid-template-columns: 1fr 2fr 1fr; }
/* 3 coloane: 25% | 50% | 25% din lățimea disponibilă */

/* repeat() — elimină repetițiile */
.grid { grid-template-columns: repeat(3, 1fr); }
/* Echivalent cu: 1fr 1fr 1fr */

/* auto-fill / auto-fit — responsiv fără media queries! */
.grid { grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); }
/* Câte coloane încap, fiecare minim 250px, maxim 1fr */
/* auto-fill: păstrează coloane goale */
/* auto-fit: colapsează coloanele goale → itemi se extind */

/* minmax() */
.grid { grid-template-columns: minmax(200px, 1fr) 3fr; }
/* Prima coloană: cel puțin 200px, cel mult 1fr */
\`\`\`

**grid-template-rows:**
\`\`\`css
.grid {
  grid-template-rows: 60px 1fr auto 60px; /* header, main, section, footer */
}
\`\`\`

**Gap:**
\`\`\`css
.grid {
  gap: 24px;          /* Rând și coloană */
  row-gap: 16px;      /* Doar rânduri */
  column-gap: 24px;   /* Doar coloane */
}
\`\`\`

**Layout complet pagină:**
\`\`\`css
.page-layout {
  display: grid;
  grid-template-columns: 260px 1fr;
  grid-template-rows: 64px 1fr 48px;
  min-height: 100vh;
  gap: 0;
}

.header { grid-column: 1 / -1; }  /* Span pe toată lățimea */
.sidebar { grid-row: 2; }          /* Rândul 2, coloana 1 (implicit) */
.main { grid-column: 2; grid-row: 2; }
.footer { grid-column: 1 / -1; }   /* Span pe toată lățimea */
\`\`\``
  },
  {
    lessonContains: "CSS Grid",
    titleContains: "Plasare items",
    content: `**Plasarea itemilor** în Grid — controlul explicit al poziției și span-ului fiecărui element în grila definită.

**grid-column și grid-row:**
\`\`\`css
/*
  Grid cu 4 coloane:
  |  1  |  2  |  3  |  4  |
    1     2     3     4     5
  ↑Lines (liniile delimitatoare)↑
*/

.item {
  /* Plasare pe coloane */
  grid-column: 2;            /* Coloana 2 (shorthand pentru 2/3) */
  grid-column: 1 / 3;        /* De la linia 1 la linia 3 (2 coloane) */
  grid-column: 1 / span 3;   /* Pornind de la 1, se extinde pe 3 coloane */
  grid-column: 1 / -1;       /* De la prima la ultima linie (full width) */

  /* Plasare pe rânduri */
  grid-row: 1 / 3;           /* De la linia 1 la linia 3 */
  grid-row: span 2;          /* Ocupă 2 rânduri */
}
\`\`\`

**Layout cu span-uri (ex: revista):**
\`\`\`css
.magazine-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(3, 200px);
  gap: 16px;
}

.featured {
  grid-column: 1 / 3;   /* Span 2 coloane */
  grid-row: 1 / 3;       /* Span 2 rânduri */
}

.article-1 { grid-column: 3; grid-row: 1; }
.article-2 { grid-column: 4; grid-row: 1; }
.article-3 { grid-column: 3 / 5; grid-row: 2; }  /* Span 2 coloane */
.footer-wide { grid-column: 1 / -1; }              /* Full width */
\`\`\`

**Grid auto placement — plasare automată:**
\`\`\`css
.auto-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  /* Itemi neplasați explicit → plasați automat în ordinea DOM */
  grid-auto-flow: row;     /* default */
  grid-auto-flow: column;
  grid-auto-flow: row dense; /* Umple "găuri" în grid */
}
\`\`\`

**justify-items și align-items în Grid:**
\`\`\`css
.grid {
  justify-items: start | center | end | stretch; /* Orizontal în celulă */
  align-items: start | center | end | stretch;   /* Vertical în celulă */
}

/* Pe item individual */
.item {
  justify-self: center;
  align-self: end;
  place-self: center; /* Shorthand pentru ambele */
}
\`\`\``
  },
  {
    lessonContains: "CSS Grid",
    titleContains: "Named areas",
    content: `**Named areas** permit definirea unui layout vizual în CSS — denumești zonele și le atribui elementelor, fără a calcula numere de linii.

**grid-template-areas:**
\`\`\`css
.layout {
  display: grid;
  grid-template-columns: 220px 1fr;
  grid-template-rows: 64px 1fr auto;
  grid-template-areas:
    "header  header"    /* Rândul 1: header pe ambele coloane */
    "sidebar main"      /* Rândul 2: sidebar | main */
    "footer  footer";   /* Rândul 3: footer pe ambele */
  min-height: 100vh;
}

header  { grid-area: header; }
.sidebar { grid-area: sidebar; }
main    { grid-area: main; }
footer  { grid-area: footer; }
\`\`\`

**Dashboard cu named areas:**
\`\`\`css
.dashboard {
  display: grid;
  grid-template-columns: 240px 1fr 300px;
  grid-template-rows: 60px 1fr;
  grid-template-areas:
    "nav   topbar   topbar"
    "nav   content  aside";
  height: 100vh;
  gap: 0;
}

nav     { grid-area: nav; background: #1e293b; color: white; }
.topbar { grid-area: topbar; border-bottom: 1px solid #e5e7eb; }
.content { grid-area: content; padding: 2rem; overflow-y: auto; }
aside   { grid-area: aside; border-left: 1px solid #e5e7eb; }
\`\`\`

**Celule goale cu punct (.):**
\`\`\`css
.gallery {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-areas:
    "big    big    small1"
    "big    big    small2"
    ".      small3 small4";
  /* . = celulă goală (nu e atribuită niciunei zone) */
}

.big    { grid-area: big; }
.small1 { grid-area: small1; }
\`\`\`

**Responsive cu areas:**
\`\`\`css
/* Mobile — stivuit vertical */
.layout {
  grid-template-columns: 1fr;
  grid-template-areas:
    "header"
    "main"
    "sidebar"
    "footer";
}

/* Desktop — layout obișnuit */
@media (min-width: 768px) {
  .layout {
    grid-template-columns: 220px 1fr;
    grid-template-areas:
      "header  header"
      "sidebar main"
      "footer  footer";
  }
}
\`\`\``
  }
];

async function main() {
  let updated = 0, notFound = 0;
  for (const item of UPDATES) {
    const lessons = await p.lesson.findMany({
      where: { module: { slug: "css" }, title: { contains: item.lessonContains } }
    });
    if (!lessons.length) { console.log("! Lec: " + item.lessonContains); notFound++; continue; }
    const theory = await p.theory.findFirst({
      where: { lessonId: { in: lessons.map(l => l.id) }, title: { contains: item.titleContains } }
    });
    if (!theory) { console.log("! Teo: " + item.titleContains + " in " + item.lessonContains); notFound++; continue; }
    await p.theory.update({ where: { id: theory.id }, data: { content: item.content } });
    console.log("✓ " + theory.title.substring(0, 45) + ": " + theory.content.length + " → " + item.content.length);
    updated++;
  }
  console.log("\nDone: " + updated + " updated, " + notFound + " not found");
  await p.$disconnect();
}
main().catch(e => { console.error(e); p.$disconnect(); process.exit(1); });
