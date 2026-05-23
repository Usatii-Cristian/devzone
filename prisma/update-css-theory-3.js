const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();

const items = [
  // L9 fix
  {
    lessonContains: 'nth-child',
    titleContains: 'moderne',
    content: `**Pseudo-clasele :is(), :where() și :has()** sunt cele mai puternice adăugiri recente în CSS, permițând selecții complexe cu cod mai curat.

**:is() — grupare de selectori cu specificitate**

\`:is()\` primește o listă de selectori și aplică stilurile oricărui element potrivit. **Specificitatea** este cea mai mare specificitate din lista de argumente.

\`\`\`css
/* Fără :is() — repetitiv */
header h1, header h2, footer h1, footer h2 { color: #333; }

/* Cu :is() — concis */
:is(header, footer) :is(h1, h2, h3) {
  color: #333;
}
\`\`\`

• **:is()** ignoră selectori invalizi (forgiving selector list)
• Specificitate = specificitatea celui mai specific argument
• Funcționează cu clase, tag-uri, ID-uri și alte pseudo-clase

**:where() — grupare fără specificitate**

\`:where()\` funcționează identic cu \`:is()\`, dar specificitatea sa este mereu **0**. Ideal pentru stiluri de bază care pot fi ușor suprascrise.

\`\`\`css
/* Resetare cu specificitate zero */
:where(header, main, footer) p {
  margin: 0;
  padding: 0;
}

/* Orice clasă suprascrie ușor */
.custom p { margin: 16px; }
\`\`\`

**:has() — selectorul părinte**

\`:has()\` permite stilizarea unui element **în funcție de copiii săi** — imposibil anterior în CSS pur.

\`\`\`css
/* Card cu imagine primește grid layout */
.card:has(img) {
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 16px;
}

/* Label roșu când input este invalid */
.field:has(input:invalid:not(:placeholder-shown)) label {
  color: crimson;
  font-weight: bold;
}

/* Articol fără paragraf — avertizare vizuală */
article:not(:has(p)) {
  border: 2px dashed orange;
  padding: 8px;
}
\`\`\`

• \`:has()\` verifică **prezența unui copil/descendent** care se potrivește
• Poate fi combinat cu \`:not()\`: \`.card:not(:has(img))\`
• **Suport browser**: Chrome 105+, Firefox 121+, Safari 15.4+

**Combinații avansate**

\`\`\`css
/* Navigație cu link hover — efect pe container */
nav:has(a:hover) {
  background: rgba(0,0,0,0.05);
}

/* Form group cu eroare vizibilă */
.form-group:has(.error) {
  background: #fff5f5;
  border-left: 3px solid red;
}

/* Secțiune cu cel puțin 3 copii */
section:has(> *:nth-child(3)) {
  columns: 2;
}
\`\`\`

**:is() vs :where() vs :has() — rezumat**

• **:is()** — grupare cu specificitate, elimină repetiția
• **:where()** — grupare fără specificitate, pentru stiluri de bază
• **:has()** — selecție condiționată după conținut, înlocuiește JS simplu

Aceste pseudo-clase moderne **reduc drastic repetițiile** din CSS și permit logică condiționată direct în stiluri, fără nicio linie de JavaScript.`
  },

  // L10: Pseudo-elemente (::before, ::after)
  {
    lessonContains: 'Pseudo-elemente',
    titleContains: 'before',
    content: `**::before și ::after** sunt pseudo-elemente care inserează conținut **înainte sau după** conținutul real al elementului. Sunt create prin CSS și nu există în DOM-ul HTML.

**Sintaxa de bază**

\`\`\`css
.element::before {
  content: ""; /* OBLIGATORIU chiar dacă e gol */
  display: block;
  width: 20px;
  height: 20px;
  background: royalblue;
}

.element::after {
  content: " ✓";
  color: green;
}
\`\`\`

• **content** este **obligatoriu** — fără el pseudo-elementul nu apare
• Valori pentru content: text, \`""\` (gol), \`url()\`, \`attr()\`, contor
• Sunt **inline** by default — schimbă cu \`display: block\` sau \`inline-block\`

**Proprietatea content avansată**

\`\`\`css
/* Text simplu */
.required::after { content: " *"; color: red; }

/* Valoare din atribut HTML */
a::after { content: " (" attr(href) ")"; font-size: 0.8em; }

/* Emoji sau caractere speciale */
.success::before { content: "✓ "; color: #22c55e; }

/* Gol — pentru trucuri vizuale */
.card::before { content: ""; }
\`\`\`

**Cazuri de utilizare frecvente**

\`\`\`css
/* Clearfix clasic */
.container::after {
  content: "";
  display: table;
  clear: both;
}

/* Overlay pe imagine */
.hero::before {
  content: "";
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.4);
}

/* Linie decorativă sub titlu */
h2::after {
  content: "";
  display: block;
  width: 60px;
  height: 3px;
  background: royalblue;
  margin-top: 8px;
}

/* Ghilimele automate */
blockquote::before { content: open-quote; font-size: 3em; }
blockquote::after  { content: close-quote; }
\`\`\`

**Poziționare cu pseudo-elemente**

\`\`\`css
.badge {
  position: relative; /* context pentru ::before */
}

.badge::before {
  content: attr(data-count);
  position: absolute;
  top: -8px;
  right: -8px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: red;
  color: white;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}
\`\`\`

**Reguli importante**

• Elementele **void** (img, input, br) **nu pot** avea pseudo-elemente
• Un element are maxim **un ::before** și **un ::after**
• Folosește \`::\` (dublu) pentru pseudo-elemente, \`:\` (simplu) pentru pseudo-clase
• Pseudo-elementele nu sunt accesibile — nu pune conținut semantic în ele`
  },
  {
    lessonContains: 'Pseudo-elemente',
    titleContains: 'Alte pseudo-elemente',
    content: `Pe lângă \`::before\` și \`::after\`, CSS oferă mai multe pseudo-elemente specializate pentru controlul precis al conținutului și stilizării.

**::first-line și ::first-letter**

\`\`\`css
p::first-line {
  font-weight: bold;
  color: #1a1a2e;
  letter-spacing: 0.05em;
}

p::first-letter {
  font-size: 3em;
  float: left;
  margin-right: 8px;
  line-height: 1;
  color: royalblue;
  font-family: Georgia, serif;
}
\`\`\`

• **::first-line** stilizează prima linie vizuală (se recalculează la resize)
• **::first-letter** — dropcap clasic; suportă doar proprietăți de font și box
• Funcționează doar pe **elemente block-level**

**::selection**

\`\`\`css
::selection {
  background: #bfdbfe;
  color: #1e3a5f;
}

.code-block::selection {
  background: #fbbf24;
  color: #1c1917;
}
\`\`\`

• Stilizează textul **selectat de utilizator**
• Proprietăți permise: \`background\`, \`color\`, \`text-shadow\` (limitat)

**::placeholder**

\`\`\`css
input::placeholder {
  color: #9ca3af;
  font-style: italic;
  opacity: 1; /* Firefox reduce opacitatea implicit */
}

input:focus::placeholder {
  opacity: 0.5; /* Estompare la focus */
  transition: opacity 0.3s;
}
\`\`\`

**::marker**

\`\`\`css
/* Stilizează marcatorul listei (bullet/număr) */
li::marker {
  color: royalblue;
  font-size: 1.2em;
  font-weight: bold;
  content: "▶ "; /* custom marker */
}

ol li::marker {
  color: #f59e0b;
  font-variant-numeric: tabular-nums;
}
\`\`\`

**::backdrop**

\`\`\`css
/* Fundalul elementelor fullscreen și dialog */
dialog::backdrop {
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
}

video::backdrop {
  background: black;
}
\`\`\`

• Apare **sub** elementul dialog/fullscreen, **deasupra** restului paginii

**::file-selector-button**

\`\`\`css
input[type="file"]::file-selector-button {
  background: royalblue;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  margin-right: 12px;
}

input[type="file"]::file-selector-button:hover {
  background: #2563eb;
}
\`\`\`

**Rezumat pseudo-elemente**

• **::before / ::after** — conținut generat, trucuri vizuale
• **::first-line / ::first-letter** — tipografie editorială
• **::selection** — experiența de selectare text
• **::placeholder** — stilizare hint în inputs
• **::marker** — bullets și numere personalizate
• **::backdrop** — overlay pentru dialog/fullscreen
• **::file-selector-button** — butonul de upload personalizat`
  },
  {
    lessonContains: 'Pseudo-elemente',
    titleContains: 'Tehnici cu',
    content: `**::before și ::after** sunt extrem de versatile — cu \`position: absolute\` și creativitate, poți crea efecte vizuale complexe **fără HTML suplimentar**.

**Tooltip pur CSS**

\`\`\`css
[data-tooltip] {
  position: relative;
  cursor: help;
}

[data-tooltip]::after {
  content: attr(data-tooltip);
  position: absolute;
  bottom: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%);
  background: #1e293b;
  color: white;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 0.85rem;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s;
}

[data-tooltip]:hover::after {
  opacity: 1;
}
\`\`\`

**Ribbon/badge pe card**

\`\`\`css
.card {
  position: relative;
  overflow: hidden;
}

.card.featured::before {
  content: "NOU";
  position: absolute;
  top: 16px;
  right: -24px;
  background: #ef4444;
  color: white;
  font-size: 0.75rem;
  font-weight: bold;
  padding: 4px 32px;
  transform: rotate(45deg);
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
}
\`\`\`

**Linie decorativă cu ::before/::after**

\`\`\`css
/* Titlu cu linii laterale */
.section-title {
  display: flex;
  align-items: center;
  gap: 16px;
}

.section-title::before,
.section-title::after {
  content: "";
  flex: 1;
  height: 1px;
  background: linear-gradient(to right, transparent, #94a3b8);
}

.section-title::after {
  background: linear-gradient(to left, transparent, #94a3b8);
}
\`\`\`

**Loading spinner**

\`\`\`css
.spinner {
  width: 40px;
  height: 40px;
  position: relative;
}

.spinner::before {
  content: "";
  position: absolute;
  inset: 0;
  border: 4px solid #e2e8f0;
  border-top-color: royalblue;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin { to { transform: rotate(360deg); } }
\`\`\`

**Counter cu CSS**

\`\`\`css
ol {
  counter-reset: item;
  list-style: none;
}

li {
  counter-increment: item;
  padding-left: 2.5em;
  position: relative;
}

li::before {
  content: counter(item, decimal-leading-zero);
  position: absolute;
  left: 0;
  font-weight: bold;
  color: royalblue;
  font-size: 0.9em;
}
\`\`\`

**Reguli de performanță**

• Pseudo-elementele cu \`position: absolute\` nu cauzează **reflow** la conținutul din jur
• Animațiile pe \`opacity\` și \`transform\` sunt accelerate GPU
• Evită animații pe \`width\`, \`height\`, \`margin\` — cauzează reflow
• Folosește \`pointer-events: none\` pe pseudo-elemente decorative pentru a nu bloca click-urile`
  },

  // L11: Specificitate și cascadă
  {
    lessonContains: 'Specificitate',
    titleContains: 'specificitatea',
    content: `**Specificitatea** este algoritmul prin care browserul decide **care regulă CSS se aplică** atunci când mai multe reguli vizează același element și aceeași proprietate.

**Sistemul de puncte (a, b, c)**

Specificitatea se calculează ca un vector de trei componente:

\`\`\`
(a, b, c)
 |  |  |
 |  |  +-- c: selectori de tip și pseudo-elemente (div, p, ::before)
 |  +----- b: clase, atribute, pseudo-clase (.cls, [attr], :hover)
 +-------- a: ID-uri (#id)
\`\`\`

| Selector | a | b | c | Valoare |
|---|---|---|---|---|
| \`*\` | 0 | 0 | 0 | 0 |
| \`div\` | 0 | 0 | 1 | 1 |
| \`.class\` | 0 | 1 | 0 | 10 |
| \`#id\` | 1 | 0 | 0 | 100 |
| \`style=""\` | — | — | — | 1000 |
| \`!important\` | — | — | — | ∞ |

**Exemple calculate**

\`\`\`css
div { }                    /* (0,0,1) = 1   */
.menu li { }               /* (0,1,1) = 11  */
.nav .item:hover { }       /* (0,2,1) = 21  */
#header .logo a { }        /* (1,1,1) = 111 */
#nav #sub .item { }        /* (2,1,0) = 210 */
\`\`\`

**:is(), :not(), :has() și specificitate**

\`\`\`css
/* :is() preia specificitatea celui mai specific argument */
:is(#id, .class, div) p { } /* specificitate ID = (1,0,1) */

/* :where() are specificitate 0 mereu */
:where(#id, .class) p { }  /* specificitate = (0,0,1) */

/* :not() preia specificitatea argumentului */
:not(.special) { }          /* (0,1,0) */
\`\`\`

**Cum se compară specificitățile**

• Se compară **de la stânga la dreapta**: mai întâi \`a\`, apoi \`b\`, apoi \`c\`
• \`(1,0,0)\` > \`(0,99,99)\` — **un singur ID bate oricâte clase**
• Nu există „adunare" care să depășească nivelul următor

\`\`\`css
/* Exemplu conflict */
#nav .link { color: blue; }   /* (1,1,0) — câștigă */
.nav .nav-link.active { }     /* (0,3,0) — pierde */
\`\`\`

**inline styles și !important**

\`\`\`html
<p style="color: red">Text</p>
\`\`\`

\`\`\`css
p { color: blue !important; } /* câștigă față de inline */
p { color: blue; }            /* pierde față de inline */
\`\`\`

• **inline style** are specificitate 1000 — depășit doar de \`!important\`
• **!important** trebuie evitat — rupe cascada și creează probleme de mentenanță

**Unealta de debug**

• DevTools → hover pe proprietate → apare specificitatea calculată
• Regulile șterse (tăiate cu linie) au fost suprascrise de altele cu specificitate mai mare`
  },
  {
    lessonContains: 'Specificitate',
    titleContains: 'Cascada',
    content: `**Cascada CSS** definește ordinea în care regulile se aplică atunci când **specificitatea este egală**. Înțelegerea cascadei te ajută să prezici cu precizie ce stil va fi afișat.

**Ordinea de prioritate în cascadă**

Atunci când două reguli au **aceeași specificitate**, browserul aplică cea care apare **mai târziu în sursă**:

\`\`\`css
p { color: blue; }
p { color: red; } /* câștigă — apare mai târziu */
\`\`\`

**Sursele de stiluri — ordinea de prioritate**

1. **!important din user agent** (browser)
2. **!important din utilizator** (setări browser)
3. **!important din autor** (CSS-ul tău)
4. **Animații CSS** — overridează totul temporar
5. **Stiluri autor normale** (CSS-ul tău)
6. **Stiluri utilizator normale**
7. **Stiluri user agent** (stiluri implicite browser)

**Originea stilurilor**

\`\`\`css
/* 1. User agent (browser default) */
h1 { font-size: 2em; font-weight: bold; }

/* 2. Stiluri autor — suprascriu browserul */
h1 { font-size: 1.8rem; }

/* 3. Inline — suprascrie foile de stil */
/* <h1 style="font-size: 1rem"> */
\`\`\`

**@layer și ordinea cascadei**

\`@layer\` permite controlul explicit al ordinii:

\`\`\`css
@layer reset, base, components, utilities;

@layer reset {
  * { margin: 0; padding: 0; }
}

@layer base {
  body { font-family: sans-serif; }
}

@layer components {
  .btn { padding: 8px 16px; background: blue; }
}

@layer utilities {
  .mt-4 { margin-top: 16px; } /* cel mai prioritar */
}
\`\`\`

• Layer-urile declarate **mai târziu** au prioritate mai mare
• Stiluri **în afara oricărui layer** au prioritate față de toate layer-urile

**Ordinea surselor în practică**

\`\`\`html
<link rel="stylesheet" href="reset.css">    <!-- 1 -->
<link rel="stylesheet" href="bootstrap.css"> <!-- 2 -->
<link rel="stylesheet" href="custom.css">    <!-- 3 - cel mai prioritar -->
<style> /* inline style element - 4 */ </style>
\`\`\`

**Tranzițiile și animațiile în cascadă**

\`\`\`css
.box {
  width: 100px;
  transition: width 0.3s;
}

/* Animațiile override temporary orice regulă normală */
.box:hover { width: 200px; }
\`\`\`

**Reguli practice**

• Ordinea \`<link>\` în HTML **contează** — pune reset-ul primul
• Evită să te bazezi pe ordinea fișierelor pentru logica de business
• Folosește **specificitate mai mare** în loc de ordine pentru stiluri intenționate
• \`@layer\` rezolvă conflictele sistematic în proiecte mari`
  },
  {
    lessonContains: 'Specificitate',
    titleContains: 'Best practices',
    content: `**Specificitatea ridicată** este una dintre cauzele principale ale CSS greu de menținut. Urmând aceste practici, vei scrie CSS mai predictibil și mai ușor de depanat.

**Problemele specificității ridicate**

\`\`\`css
/* Anti-pattern: specificitate inutilă */
div.container ul.nav li.item a.link { color: blue; }

/* Rezultat: pentru a suprascrie, trebuie aceeași sau mai mare */
div.container ul.nav li.item a.link.active { color: red; }
/* Și devine din ce în ce mai greu... */
\`\`\`

**Best practice #1 — Selectori de clasă simpli**

\`\`\`css
/* În loc de: */
div.container > ul > li > a { color: blue; }

/* Preferă: */
.nav-link { color: blue; }
.nav-link--active { color: red; }
\`\`\`

• Clasele au specificitate uniformă (0,1,0)
• Ușor de suprascris cu o altă clasă

**Best practice #2 — Evită !important**

\`\`\`css
/* !important indică o problemă de arhitectură */
.btn { color: white !important; } /* BAD */

/* Soluție: crește specificitatea sau reorganizează */
.card .btn { color: white; }
\`\`\`

Excepție legitimă: clase utilitare (\`.hidden { display: none !important }\`)

**Best practice #3 — BEM pentru structură clară**

\`\`\`css
/* BEM: Block__Element--Modifier */
.card { }
.card__title { }
.card__body { }
.card--featured { }
.card--featured .card__title { } /* specificitate (0,2,0) */
\`\`\`

**Debugging specificitate în DevTools**

\`\`\`
Chrome DevTools → Elements → Computed → hover proprietate:
  color: blue (0,1,0) .nav-link  ← câștigătorul
  ~~color: red (0,0,1) a~~       ← suprascris
\`\`\`

• Regulile **tăiate** au fost suprascrise
• Hoveriești pe valoare pentru a vedea specificitatea
• **Forced element state** (:hover, :focus) simulează stări

**Best practice #4 — @layer pentru terțe librării**

\`\`\`css
@layer vendor, custom;

@layer vendor {
  /* Bootstrap, Tailwind, orice librărie */
  .btn { padding: 8px 16px; }
}

@layer custom {
  /* Stilurile tale — mereu câștigă */
  .btn { background: royalblue; }
}
\`\`\`

**Best practice #5 — Evită ID-urile în CSS**

\`\`\`css
/* ID-urile creează specificitate ridicată și greu de suprascris */
#submit-button { background: green; } /* BAD */

/* Preferă clase */
.submit-btn { background: green; } /* GOOD */
\`\`\`

**Rezumat reguli de aur**

• Scrie selectori cât mai simpli posibil
• Folosește **clase** în locul tag-urilor sau ID-urilor
• Evită \`!important\` — dacă simți nevoia, e un semn de arhitectură slabă
• Folosește **@layer** pentru a gestiona prioritățile în proiecte mari
• Debuggează cu DevTools → Computed panel`
  },

  // L12: Selectori avansați
  {
    lessonContains: 'Selectori avan',
    titleContains: 'Combinatori',
    content: `**Combinatorii CSS** definesc **relația** dintre selectori. Ele îți permit să vizezi elemente în funcție de poziția lor în DOM, fără a adăuga clase suplimentare în HTML.

**Descendant combinator (spațiu)**

\`\`\`css
/* Toate elementele <a> din .nav, indiferent de adâncime */
.nav a {
  color: white;
  text-decoration: none;
}
\`\`\`

• Cel mai frecvent combinator
• Vizează **orice descendent**, nu doar copiii direcți

**Child combinator (>)**

\`\`\`css
/* Doar <li> care sunt copii DIRECTI ai lui <ul> */
ul > li {
  list-style: none;
  padding: 8px;
}

/* Nu afectează <li> din <ul> imbricate */
ul > li > ul > li {
  padding-left: 16px;
  font-size: 0.9em;
}
\`\`\`

• Mai precis decât descendant combinator
• Util când ai structuri imbricate (meniuri, liste)

**Adjacent sibling combinator (+)**

\`\`\`css
/* Primul <p> IMEDIAT după <h2> */
h2 + p {
  font-size: 1.1em;
  color: #475569;
  margin-top: 0;
}

/* Label imediat după input invalid */
input:invalid + .error-message {
  display: block;
  color: red;
}
\`\`\`

• Vizează **un singur element** — fratul imediat următor
• Frații trebuie să fie la **același nivel** în DOM

**General sibling combinator (~)**

\`\`\`css
/* Toate <p> după un <h2> la același nivel */
h2 ~ p {
  border-left: 3px solid #e2e8f0;
  padding-left: 12px;
}

/* Hack CSS pentru acordeon/tab fără JS */
input:checked ~ .panel {
  display: block;
}
\`\`\`

• Vizează **toți frații următori**, nu doar primul
• Util pentru state-machine CSS (checkbox hack)

**Combinarea combinatorilor**

\`\`\`css
/* Navigație complexă */
.nav > ul > li > a { font-weight: 600; }
.nav > ul > li > ul { display: none; }
.nav > ul > li:hover > ul { display: block; }

/* Formular accesibil */
.form-group > label + input:focus {
  outline: 2px solid royalblue;
  outline-offset: 2px;
}
\`\`\`

**Performanța selectorilor**

Browserul evaluează selectori de la **dreapta la stânga**:
\`\`\`css
/* .nav a — browser caută TOATE <a>, apoi filtrează după .nav */
/* Mai lent cu mulți <a> pe pagină */

/* .nav-link — browser caută direct clasa */
/* Mai rapid */
\`\`\`

• Evită selectori prea adânci (max 3-4 nivele)
• Preferă clase specifice în loc de combinatori lungi
• Combinatorii sunt utili pentru **stilizarea contextului**, nu pentru regulile principale

**Rezumat**

• \`A B\` — orice B descendent din A
• \`A > B\` — B copil direct al lui A
• \`A + B\` — B frate imediat după A
• \`A ~ B\` — toți frații B care urmează după A`
  },
  {
    lessonContains: 'Selectori avan',
    titleContains: 'atribut',
    content: `**Selectori de atribut** îți permit să vizezi elemente CSS în funcție de **atributele HTML** și valorile lor. Sunt extrem de puternici pentru stilizarea formularelor, link-urilor și elementelor cu date personalizate.

**Sintaxa de bază**

\`\`\`css
/* [attr] — elementul HAS atributul */
[disabled] { opacity: 0.5; cursor: not-allowed; }

/* [attr="val"] — atribut cu valoare EXACTĂ */
[type="submit"] { background: royalblue; color: white; }

/* [attr~="val"] — atribut conține cuvântul "val" */
[class~="btn"] { padding: 8px 16px; }
\`\`\`

**Selectori de potrivire parțială**

\`\`\`css
/* [attr^="val"] — ÎNCEPE cu "val" */
a[href^="https"] { /* link-uri sigure */
  padding-left: 20px;
  background: url('lock.svg') no-repeat left center;
}

a[href^="mailto:"] {
  color: #059669;
}

/* [attr$="val"] — TERMINĂ cu "val" */
a[href$=".pdf"]::after {
  content: " (PDF)";
  font-size: 0.8em;
  color: #ef4444;
}

a[href$=".zip"]::after {
  content: " ↓";
}

/* [attr*="val"] — CONȚINE "val" undeva */
[class*="icon-"] {
  display: inline-flex;
  align-items: center;
}
\`\`\`

**[attr|="val"] — limbă/prefix cu cratimă**

\`\`\`css
/* Potrivire exactă SAU prefix urmat de cratimă */
/* :lang(en) sau lang="en-US" amândouă se potrivesc */
[lang|="en"] {
  font-family: 'Georgia', serif;
}

[lang|="ro"] {
  font-family: 'Roboto', sans-serif;
}
\`\`\`

**Case sensitivity**

\`\`\`css
/* Implicit: case-sensitive pentru atribute */
[type="TEXT"] { } /* Nu prinde type="text" */

/* i — case-insensitive */
[type="text" i] { border: 1px solid #ccc; } /* prinde TEXT, Text, text */

/* s — forțat case-sensitive */
[data-id="ABC" s] { } /* Explicit: ABC ≠ abc */
\`\`\`

**Aplicații practice**

\`\`\`css
/* Stilizare completă formulare */
input[type="text"],
input[type="email"],
input[type="password"] {
  border: 1px solid #d1d5db;
  border-radius: 6px;
  padding: 8px 12px;
}

input[readonly] {
  background: #f9fafb;
  cursor: default;
}

input[required] + label::after {
  content: " *";
  color: red;
}

/* Link-uri externe */
a[target="_blank"]::after {
  content: " ↗";
  font-size: 0.8em;
}

/* Atribute data- */
[data-status="active"] { border-left: 3px solid green; }
[data-status="pending"] { border-left: 3px solid orange; }
[data-status="error"] { border-left: 3px solid red; }
\`\`\`

**Avantaje față de clase**

• Nu necesită modificarea HTML-ului
• Stilizare semantică bazată pe comportament real
• Util când HTML-ul este generat (CMS, framework-uri)
• Selector mai specific decât tag, mai puțin decât clasă`
  },
  {
    lessonContains: 'Selectori avan',
    titleContains: 'avansat',
    content: `**:is(), :where() și :has()** în selectori avansați permit combinații puternice pentru coduri CSS mai clare și mai expresive decât selecția clasică.

**:is() în selectori avansați — reducerea repetițiilor**

\`\`\`css
/* Fără :is() — 12 selectori */
h1 a, h2 a, h3 a, h4 a,
.title a, .heading a,
article a, section a,
main a, aside a, footer a, header a {
  color: inherit;
  text-decoration: none;
}

/* Cu :is() — 2 selectori */
:is(h1, h2, h3, h4, .title, .heading) a,
:is(article, section, main, aside, footer, header) a {
  color: inherit;
  text-decoration: none;
}
\`\`\`

**:where() pentru reset-uri nedestructive**

\`\`\`css
/* Resetăm toate elementele interactive */
:where(a, button, [role="button"]) {
  cursor: pointer;
  user-select: none;
}

/* Specificitatate zero — orice regulă ulterioară câștigă */
:where(ul, ol) {
  margin: 0;
  padding: 0;
  list-style: none;
}

/* Clasa specifică suprascrie fără luptă */
.nav-list { list-style: disc; padding-left: 20px; }
\`\`\`

**:has() — selecție conditionată avansată**

\`\`\`css
/* Container cu conținut specific */
.grid:has(> .featured-item) {
  grid-template-columns: 2fr 1fr 1fr;
}

/* Form cu câmpuri obligatorii completate */
form:has(input[required]:invalid) .submit-btn {
  opacity: 0.5;
  pointer-events: none;
}

/* Navigație cu submeniu activ */
.nav-item:has(.submenu:hover) > .nav-link {
  color: royalblue;
  font-weight: bold;
}

/* Secțiune goală — ascunde */
section:not(:has(*)) {
  display: none;
}
\`\`\`

**Combinații complexe**

\`\`\`css
/* Card cu imagine orizontală dacă e în sidebar */
aside .card:has(img) {
  flex-direction: row;
  max-width: 100%;
}

/* Stilizare tabel cu footer */
table:has(tfoot) thead th {
  border-bottom: 2px solid currentColor;
}

/* Input cu eroare după interacțiune */
.field:has(input:user-invalid) {
  --field-color: #ef4444;
}

.field:has(input:user-invalid) label {
  color: var(--field-color);
}

.field:has(input:user-invalid) input {
  border-color: var(--field-color);
  outline-color: var(--field-color);
}
\`\`\`

**:is() cu pseudo-clase**

\`\`\`css
/* Stări interactive pe mai multe elemente */
:is(a, button, .clickable):is(:hover, :focus) {
  outline: 2px solid royalblue;
  outline-offset: 2px;
}

/* Titluri în primul nivel activ */
:is(h1, h2, h3):is(.active, [aria-current]) {
  color: royalblue;
  border-left: 4px solid currentColor;
  padding-left: 12px;
}
\`\`\`

**Suport și fallback**

\`\`\`css
/* :has() - fallback pentru browsere mai vechi */
@supports selector(:has(*)) {
  .card:has(img) { grid-template-columns: 200px 1fr; }
}

/* Fără @supports: stilul implicit rămâne intact */
.card { display: block; }
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
