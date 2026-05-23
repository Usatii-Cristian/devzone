const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();

const items = [
  // L13: Variabile CSS (custom properties)
  {
    lessonContains: 'Variabile CSS',
    titleContains: 'Declarare',
    content: `**CSS Custom Properties** (variabile CSS) sunt valori reutilizabile definite direct în CSS, accesibile prin funcția \`var()\`. Spre deosebire de variabilele preprocessoarelor (Sass/Less), ele sunt **vii** — se pot schimba dinamic cu JavaScript sau prin media queries.

**Declararea variabilelor**

\`\`\`css
/* :root — disponibile global pe toată pagina */
:root {
  --primary: #3b82f6;
  --secondary: #8b5cf6;
  --text-base: #1e293b;
  --bg-base: #ffffff;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 32px;
  --radius: 8px;
  --shadow: 0 2px 8px rgba(0,0,0,0.1);
  --font-sans: 'Inter', system-ui, sans-serif;
}
\`\`\`

• Convenție: prefixul **\`--\`** este obligatoriu
• **\`:root\`** este echivalent cu \`html\` dar cu specificitate ușor mai mare
• Orice element poate declara variabile locale

**Utilizarea cu var()**

\`\`\`css
.btn {
  background: var(--primary);
  color: white;
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  font-family: var(--font-sans);
}

.btn:hover {
  background: color-mix(in srgb, var(--primary), black 15%);
}
\`\`\`

**Valoare fallback**

\`\`\`css
/* var(--variabila, fallback) */
.card {
  color: var(--card-color, var(--text-base));
  background: var(--card-bg, white);
  padding: var(--card-padding, 24px);
}

/* Fallback poate fi o altă variabilă sau o valoare hardcodată */
.section {
  max-width: var(--max-width, var(--container-lg, 1200px));
}
\`\`\`

**Scope local**

\`\`\`css
/* Variabilă globală */
:root { --color: blue; }

/* Override local pe un component */
.card-danger {
  --color: red; /* afectează doar .card-danger și descendenții săi */
}

.card .title { color: var(--color); }
/* .card .title → blue */
/* .card-danger .title → red */
\`\`\`

**Variabile cu JavaScript**

\`\`\`javascript
const root = document.documentElement;

// Citire
const primary = getComputedStyle(root).getPropertyValue('--primary').trim();

// Setare
root.style.setProperty('--primary', '#ef4444');

// Setare pe element specific
document.querySelector('.card').style.setProperty('--color', 'green');
\`\`\`

**Diferența față de Sass variables**

\`\`\`scss
/* Sass — compilate static */
$primary: #3b82f6;
.btn { background: $primary; } /* → background: #3b82f6 în CSS final */
\`\`\`

\`\`\`css
/* CSS custom properties — rămân în CSS, pot fi modificate */
:root { --primary: #3b82f6; }
.btn { background: var(--primary); } /* var() rămâne în CSS */
\`\`\`

• **CSS custom props**: dinamice, modificabile JS, moștenire CSS
• **Sass vars**: statice, dispar după compilare, niciun overhead runtime

**Validare și fallback complex**

\`\`\`css
/* Variabila nedefinită → fallback este folosit */
.element {
  color: var(--undefined-var, #333);
}

/* Fără fallback → valoarea inițială a proprietății */
.element {
  color: var(--undefined-var); /* → color: initial (inherit/transparent) */
}
\`\`\``
  },
  {
    lessonContains: 'Variabile CSS',
    titleContains: 'Scopuri',
    content: `**Scopul** (scope) variabilelor CSS urmează **arborele DOM** — o variabilă declarată pe un element este accesibilă pe acel element și toți descendenții săi. Aceasta permite **theming** și **customizare** precise.

**Moștenirea variabilelor**

\`\`\`css
:root {
  --spacing: 16px;
  --color: #333;
}

.card {
  --spacing: 24px; /* override local */
  padding: var(--spacing); /* 24px */
}

.card .title {
  padding: var(--spacing); /* 24px — moștenit de la .card */
  color: var(--color);     /* #333 — moștenit de la :root */
}

.card .footer {
  --color: #666; /* override în .card .footer */
  color: var(--color); /* #666 */
}
\`\`\`

**Theming per-component**

\`\`\`css
/* Componentă cu variabile de interfață */
.alert {
  --alert-bg: #f0f9ff;
  --alert-border: #3b82f6;
  --alert-text: #1e40af;
  --alert-icon: "ℹ️";

  background: var(--alert-bg);
  border-left: 4px solid var(--alert-border);
  color: var(--alert-text);
  padding: 12px 16px;
}

/* Variante prin suprascriere */
.alert--success {
  --alert-bg: #f0fdf4;
  --alert-border: #22c55e;
  --alert-text: #166534;
}

.alert--error {
  --alert-bg: #fef2f2;
  --alert-border: #ef4444;
  --alert-text: #991b1b;
}
\`\`\`

**Variabile în media queries**

\`\`\`css
:root {
  --font-size-base: 16px;
  --container-padding: 16px;
  --columns: 1;
}

@media (min-width: 768px) {
  :root {
    --font-size-base: 18px;
    --container-padding: 32px;
    --columns: 2;
  }
}

@media (min-width: 1200px) {
  :root {
    --columns: 3;
    --container-padding: 64px;
  }
}

.grid {
  grid-template-columns: repeat(var(--columns), 1fr);
  padding: var(--container-padding);
  font-size: var(--font-size-base);
}
\`\`\`

**Variabile pentru animații și calcule**

\`\`\`css
.card {
  --elevation: 1;
  box-shadow: 0 calc(var(--elevation) * 2px) calc(var(--elevation) * 8px)
              rgba(0,0,0, calc(var(--elevation) * 0.1));
  transform: translateY(calc(var(--elevation) * -1px));
  transition: all 0.2s ease;
}

.card:hover {
  --elevation: 3;
}
\`\`\`

**Variabile invalidate și inițiale**

\`\`\`css
/* Dacă valoarea variabilei este invalidă pentru proprietate */
:root { --color: 42px; } /* invalid pentru color */

.text {
  color: red;                 /* valoarea inițială: red */
  color: var(--color);        /* înlocuit cu: initial (black sau transparent) */
  /* NU revine la red! */
}
\`\`\`

• Variabilele invalide substituie cu **initial value**, nu cu declarația anterioară
• Aceasta este o diferență importantă față de comportamentul așteptat

**Sisteme de design cu variabile**

\`\`\`css
:root {
  /* Primitive tokens */
  --blue-500: #3b82f6;
  --blue-600: #2563eb;
  --gray-100: #f3f4f6;
  --gray-900: #111827;

  /* Semantic tokens */
  --color-primary: var(--blue-500);
  --color-primary-hover: var(--blue-600);
  --color-background: var(--gray-100);
  --color-text: var(--gray-900);
}
\`\`\``
  },
  {
    lessonContains: 'Variabile CSS',
    titleContains: 'dark',
    content: `**Dark mode** cu CSS custom properties este cel mai elegant mod de a implementa teme în CSS pur — un singur switch schimbă **toate culorile** simultan, fără clase suplimentare pe fiecare element.

**Implementare cu prefers-color-scheme**

\`\`\`css
:root {
  /* Tema light — implicită */
  --bg: #ffffff;
  --bg-card: #f8fafc;
  --text: #1e293b;
  --text-muted: #64748b;
  --border: #e2e8f0;
  --primary: #3b82f6;
  --primary-hover: #2563eb;
  --shadow: 0 2px 8px rgba(0,0,0,0.1);
}

@media (prefers-color-scheme: dark) {
  :root {
    --bg: #0f172a;
    --bg-card: #1e293b;
    --text: #f1f5f9;
    --text-muted: #94a3b8;
    --border: #334155;
    --primary: #60a5fa;
    --primary-hover: #93c5fd;
    --shadow: 0 2px 8px rgba(0,0,0,0.4);
  }
}

/* Componente folosesc variabile, nu culori hardcodate */
body {
  background: var(--bg);
  color: var(--text);
}

.card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  box-shadow: var(--shadow);
}
\`\`\`

**Implementare cu clasă manuală (toggle JS)**

\`\`\`css
/* Light mode (default) */
:root,
[data-theme="light"] {
  --bg: #ffffff;
  --text: #1e293b;
  --primary: #3b82f6;
}

/* Dark mode via clasă */
[data-theme="dark"] {
  --bg: #0f172a;
  --text: #f1f5f9;
  --primary: #60a5fa;
}
\`\`\`

\`\`\`javascript
// Toggle dark mode
const html = document.documentElement;
const toggle = () => {
  const current = html.getAttribute('data-theme');
  html.setAttribute('data-theme', current === 'dark' ? 'light' : 'dark');
  localStorage.setItem('theme', html.getAttribute('data-theme'));
};

// Persistă preferința
const saved = localStorage.getItem('theme');
const preferred = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
html.setAttribute('data-theme', saved || preferred);
\`\`\`

**Sistem complet de tokeni**

\`\`\`css
:root {
  /* Culori de suprafață */
  --surface-1: #ffffff;
  --surface-2: #f8fafc;
  --surface-3: #f1f5f9;

  /* Text */
  --text-1: #0f172a;    /* heading */
  --text-2: #475569;    /* body */
  --text-3: #94a3b8;    /* muted */

  /* Accent */
  --accent: #3b82f6;
  --accent-text: white;

  /* Borduri */
  --border-1: #e2e8f0;

  /* Status */
  --success: #22c55e;
  --warning: #f59e0b;
  --error: #ef4444;
}

[data-theme="dark"] {
  --surface-1: #0f172a;
  --surface-2: #1e293b;
  --surface-3: #334155;
  --text-1: #f8fafc;
  --text-2: #cbd5e1;
  --text-3: #64748b;
  --accent: #60a5fa;
  --border-1: #334155;
}
\`\`\`

**Tranziție fluidă între teme**

\`\`\`css
/* Aplică pe body sau :root */
*, *::before, *::after {
  transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
}

/* Excepție: elementele cu tranziții proprii */
.btn { transition: background-color 0.15s ease, transform 0.1s ease; }
\`\`\`

• Evită tranziția pe **toate** proprietățile cu \`transition: all\` — prea costisitor
• Preferă lista explicită de proprietăți care se schimbă la theme toggle`
  },

  // L14: Border și box-shadow
  {
    lessonContains: 'Border',
    titleContains: 'Border',
    content: `**Border** în CSS controlează conturul vizibil al elementelor. Cu proprietățile moderne, poți crea borduri complexe, gradiente și forme decorative.

**Proprietățile de bază**

\`\`\`css
.element {
  /* Shorthand */
  border: 2px solid #3b82f6;

  /* Individual */
  border-width: 2px;
  border-style: solid;   /* solid, dashed, dotted, double, groove, ridge */
  border-color: #3b82f6;

  /* Pe laturi separate */
  border-top: 3px solid #ef4444;
  border-right: 1px dashed #94a3b8;
  border-bottom: 3px solid #ef4444;
  border-left: 4px solid #22c55e;
}
\`\`\`

**Border-radius**

\`\`\`css
.card {
  border-radius: 8px; /* toate colțurile */
  border-radius: 8px 16px; /* top-left/bottom-right, top-right/bottom-left */
  border-radius: 4px 8px 12px 16px; /* TL TR BR BL */
}

/* Forme speciale */
.circle { border-radius: 50%; }
.pill   { border-radius: 9999px; }

/* Colțuri asimetrice (eliptic) */
.leaf {
  border-radius: 70% 30% 30% 70% / 60% 40% 60% 40%;
}

/* CSS modern: sintaxa logică */
.card {
  border-start-start-radius: 8px; /* top-left în LTR */
  border-start-end-radius: 8px;
}
\`\`\`

**Border cu gradient (outline trick)**

\`\`\`css
/* Metodă cu background-clip */
.gradient-border {
  border: 3px solid transparent;
  background: linear-gradient(white, white) padding-box,
              linear-gradient(135deg, #3b82f6, #8b5cf6) border-box;
}

/* Metodă cu ::before (mai compatibilă) */
.gradient-border-2 {
  position: relative;
  border-radius: 12px;
}

.gradient-border-2::before {
  content: "";
  position: absolute;
  inset: -2px;
  border-radius: inherit;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  z-index: -1;
}
\`\`\`

**Outline vs Border**

\`\`\`css
/* Outline — în afara border, nu afectează layout */
button:focus-visible {
  outline: 2px solid #3b82f6;
  outline-offset: 3px; /* spațiu între element și outline */
}

/* Border — în interiorul box model, afectează layout */
.card { border: 1px solid #e2e8f0; }
\`\`\`

**Border logic properties**

\`\`\`css
/* Internalizare pentru RTL/LTR */
.text-input {
  border-inline-start: 3px solid var(--primary); /* left în LTR, right în RTL */
  border-block-end: 1px solid var(--border);    /* bottom */
}
\`\`\`

**Hack-uri cu border — forme CSS**

\`\`\`css
/* Triunghi clasic */
.arrow-down {
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-top: 15px solid #3b82f6;
}

/* Preferă clip-path pentru forme — mai modern */
.arrow {
  clip-path: polygon(50% 100%, 0 0, 100% 0);
  background: #3b82f6;
  width: 20px;
  height: 15px;
}
\`\`\``
  },
  {
    lessonContains: 'Border',
    titleContains: 'Box-shadow',
    content: `**Box-shadow** adaugă umbre și efecte de profunzime elementelor. Cu sintaxa completă și mai multe umbre stivuite, poți crea efecte vizuale sofisticate.

**Sintaxa completă**

\`\`\`css
/* offset-x | offset-y | blur | spread | color */
.card {
  box-shadow: 2px 4px 8px 0px rgba(0,0,0,0.15);
}

/* Multipli parametri */
.element {
  box-shadow:
    0 1px 3px rgba(0,0,0,0.12),   /* umbra apropiată */
    0 4px 12px rgba(0,0,0,0.08);  /* umbra îndepărtată */
}

/* Umbră interioară cu inset */
.input-focus {
  box-shadow: inset 0 2px 4px rgba(0,0,0,0.1);
}
\`\`\`

**Parametrii explicați**

• **offset-x**: pozitiv = dreapta, negativ = stânga
• **offset-y**: pozitiv = jos, negativ = sus
• **blur**: 0 = umbră clară, valori mari = blur mult
• **spread**: extinde/contractă umbra (poate fi negativ)
• **color**: rgba pentru control opacity
• **inset**: umbra este în interiorul elementului

**Sistem de umbre (design system)**

\`\`\`css
:root {
  --shadow-sm:  0 1px 2px rgba(0,0,0,0.05);
  --shadow-md:  0 4px 6px rgba(0,0,0,0.07), 0 2px 4px rgba(0,0,0,0.05);
  --shadow-lg:  0 10px 15px rgba(0,0,0,0.1), 0 4px 6px rgba(0,0,0,0.05);
  --shadow-xl:  0 20px 25px rgba(0,0,0,0.1), 0 10px 10px rgba(0,0,0,0.04);
  --shadow-2xl: 0 25px 50px rgba(0,0,0,0.25);
}

.card        { box-shadow: var(--shadow-md); }
.card:hover  { box-shadow: var(--shadow-xl); }
.modal       { box-shadow: var(--shadow-2xl); }
\`\`\`

**Efecte avansate cu multiple umbre**

\`\`\`css
/* Neumorphism (soft UI) */
.neumorphic {
  background: #e0e5ec;
  box-shadow:
     6px 6px 12px #b8bec7,
    -6px -6px 12px #ffffff;
  border-radius: 12px;
}

.neumorphic:active {
  box-shadow:
     inset 4px 4px 8px #b8bec7,
    inset -4px -4px 8px #ffffff;
}

/* Glow effect */
.glow-btn {
  background: #3b82f6;
  box-shadow:
    0 0 20px rgba(59,130,246,0.5),
    0 0 40px rgba(59,130,246,0.2);
}

/* Umbra colorată */
.card-colored {
  background: #ef4444;
  box-shadow: 0 8px 24px rgba(239,68,68,0.4);
}
\`\`\`

**Animare performantă**

\`\`\`css
/* SLOW — box-shadow animat direct declanșează repaint */
.card {
  transition: box-shadow 0.3s ease;
}
.card:hover { box-shadow: 0 20px 40px rgba(0,0,0,0.2); }

/* FASTER — animează opacity pe un pseudo-element */
.card {
  position: relative;
}
.card::after {
  content: "";
  position: absolute;
  inset: 0;
  box-shadow: 0 20px 40px rgba(0,0,0,0.2);
  opacity: 0;
  transition: opacity 0.3s ease; /* opacity e accelerată GPU */
  border-radius: inherit;
}
.card:hover::after { opacity: 1; }
\`\`\`

**drop-shadow() vs box-shadow**

\`\`\`css
/* box-shadow — urmează bounding box dreptunghiular */
.icon { box-shadow: 4px 4px 8px rgba(0,0,0,0.3); }

/* filter: drop-shadow — urmează forma reală (transparenta) */
.icon-png { filter: drop-shadow(4px 4px 8px rgba(0,0,0,0.3)); }
/* Util pentru PNG-uri cu transparență sau SVG */
\`\`\``
  },
  {
    lessonContains: 'Border',
    titleContains: 'Outline',
    content: `**Outline** și **border** arată similar, dar au comportamente fundamental diferite. Înțelegerea acestei diferențe este esențială pentru accesibilitate și layout corect.

**Diferențele principale**

\`\`\`css
.element {
  /* BORDER — face parte din box model, afectează dimensiunile */
  border: 2px solid blue;   /* adaugă 4px lățime totală */

  /* OUTLINE — în AFARA box model, nu afectează layout */
  outline: 2px solid blue;  /* nu schimbă dimensiunile */
}
\`\`\`

| Proprietate | Border | Outline |
|---|---|---|
| Afectează layout | Da | Nu |
| Poate fi per-latură | Da | Nu (întreg elementul) |
| Suportă border-radius | Da | Parțial (modern) |
| outline-offset | Nu | Da |
| Performance | Normal | Marginally better |

**Outline pentru accesibilitate**

\`\`\`css
/* NICIODATĂ nu elimina outline fără alternativă */
/* BAD — elimini indicatorul de focus pentru utilizatori tastatură */
* { outline: none; } /* ACCESIBILITATE RUPTĂ */
button:focus { outline: none; } /* BAD */

/* GOOD — înlocuiește cu un outline personalizat */
:focus-visible {
  outline: 2px solid #3b82f6;
  outline-offset: 3px;
  border-radius: 4px;
}

/* :focus-visible se activează doar la navigare cu tastatura */
/* :focus se activează și la click — evită outline la click */
\`\`\`

**Outline offset și forme**

\`\`\`css
/* outline-offset — distanța față de element */
.btn:focus-visible {
  outline: 2px solid royalblue;
  outline-offset: 4px; /* spațiu între btn și outline */
}

/* Outline negativ — în interiorul elementului */
.avatar:focus-visible {
  outline: 3px solid white;
  outline-offset: -3px;
}

/* Outline urmărește border-radius (browsere moderne) */
.card:focus-visible {
  border-radius: 8px;
  outline: 2px solid royalblue;
  outline-offset: 4px; /* outline va fi tot rotunjit */
}
\`\`\`

**Utilizări creative cu outline**

\`\`\`css
/* Double border effect */
.double-border {
  border: 3px solid royalblue;
  outline: 3px solid royalblue;
  outline-offset: 4px;
}

/* Highlight de selecție */
.selectable:focus-within {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

/* Focus ring pentru card-uri clicabile */
.card[tabindex]:focus-visible {
  outline: 3px solid var(--primary);
  outline-offset: 2px;
  border-radius: var(--radius);
}
\`\`\`

**box-shadow ca alternativă la outline**

\`\`\`css
/* box-shadow nu ocupă spațiu și urmează border-radius */
.btn:focus-visible {
  outline: none; /* scos explicit dacă folosim box-shadow */
  box-shadow: 0 0 0 3px white, 0 0 0 5px royalblue;
  /* 1. inel alb pentru contrast pe fonduri colorate */
  /* 2. inel albastru vizibil */
}
\`\`\`

• Tehnica cu \`box-shadow\` dublu asigură contrast vizibil indiferent de culoarea fondului
• Acceptabilă ca alternativă la outline, dar outline este preferată semantic

**Rezumat**

• **Border**: parte din layout, stilizabil per-latură, decorativ
• **Outline**: în afara layout-ului, accesibilitate, focus indicator
• **Niciodată** nu elimina outline fără înlocuitor vizibil — e esențial pentru accesibilitate`
  },

  // L15: Background avansat și gradients
  {
    lessonContains: 'Background avansat',
    titleContains: 'Proprietăți background',
    content: `**Proprietățile background** în CSS sunt mult mai bogate decât simplele culori — controlează imagini, poziționare, dimensiuni, repetare și origini, cu suport pentru multiple straturi.

**Proprietățile principale**

\`\`\`css
.hero {
  background-color: #0f172a;           /* culoare de fundal */
  background-image: url('hero.jpg');   /* imagine */
  background-size: cover;              /* cover, contain, px, % */
  background-position: center top;     /* poziție */
  background-repeat: no-repeat;        /* no-repeat, repeat, repeat-x/y */
  background-attachment: fixed;        /* scroll (implicit) | fixed | local */
  background-origin: padding-box;      /* border-box | padding-box | content-box */
  background-clip: padding-box;        /* border-box | padding-box | content-box | text */
}
\`\`\`

**Shorthand background**

\`\`\`css
/* color | image | position / size | repeat | attachment | origin | clip */
.element {
  background: #0f172a url('bg.svg') center / cover no-repeat fixed;
}
\`\`\`

**background-size**

\`\`\`css
/* cover — acoperă tot containerul, poate tăia imaginea */
.hero { background-size: cover; }

/* contain — întreaga imagine vizibilă, poate lăsa spații */
.logo-bg { background-size: contain; }

/* Dimensiuni explicite */
.pattern { background-size: 200px 200px; }
.pattern { background-size: 50% auto; }
\`\`\`

**background-attachment: fixed — efect parallax**

\`\`\`css
.parallax-section {
  min-height: 400px;
  background-image: url('mountains.jpg');
  background-attachment: fixed; /* imaginea rămâne fixă la scroll */
  background-size: cover;
  background-position: center;
}
\`\`\`

**Multiple background layers**

\`\`\`css
.layered {
  /* Straturile sunt listate de sus în jos */
  background:
    url('overlay.png') center / cover no-repeat,    /* sus */
    linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.3)), /* mijloc */
    url('hero.jpg') center / cover no-repeat;         /* jos */
}
\`\`\`

**background-clip: text**

\`\`\`css
/* Text cu gradient colorat */
.gradient-text {
  background: linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899);
  background-clip: text;
  -webkit-background-clip: text; /* Safari */
  color: transparent;
  font-size: 3rem;
  font-weight: bold;
}
\`\`\`

**background-origin**

\`\`\`css
.card {
  border: 20px solid transparent;
  padding: 20px;

  /* Imaginea pornește de la padding (implicit) */
  background-origin: padding-box;

  /* Imaginea pornește de la border */
  background-origin: border-box;

  /* Imaginea pornește de la content */
  background-origin: content-box;
}
\`\`\`

**Pattern-uri CSS cu background**

\`\`\`css
/* Grid pattern */
.grid-bg {
  background-image:
    linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px);
  background-size: 20px 20px;
}

/* Dots pattern */
.dots-bg {
  background-image: radial-gradient(circle, #94a3b8 1px, transparent 1px);
  background-size: 20px 20px;
}
\`\`\``
  },
  {
    lessonContains: 'Background avansat',
    titleContains: 'Linear',
    content: `**Gradientele CSS** creează tranziții fluide de culori direct în CSS, fără imagini externe. Suportă multiple culori, unghiuri, forme și efecte complexe.

**linear-gradient**

\`\`\`css
/* Unghi | culori */
.bg { background: linear-gradient(45deg, #3b82f6, #8b5cf6); }

/* Direcții keyword */
.bg { background: linear-gradient(to right, #3b82f6, #8b5cf6); }
.bg { background: linear-gradient(to bottom right, #3b82f6, #8b5cf6); }

/* Multiple culori */
.rainbow {
  background: linear-gradient(
    to right,
    #ef4444,
    #f97316,
    #eab308,
    #22c55e,
    #3b82f6,
    #8b5cf6
  );
}

/* Color stops explicite */
.precise {
  background: linear-gradient(
    to right,
    #3b82f6 0%,
    #3b82f6 30%,   /* albastru solid primele 30% */
    #8b5cf6 70%,
    #8b5cf6 100%   /* mov solid ultimele 30% */
  );
}

/* Hard stop — fără tranziție */
.stripes {
  background: linear-gradient(
    90deg,
    #3b82f6 50%,
    #8b5cf6 50% /* trecere bruscă la 50% */
  );
}
\`\`\`

**radial-gradient**

\`\`\`css
/* Gradient circular din centru */
.glow {
  background: radial-gradient(circle, #60a5fa, #1e3a8a);
}

/* Formă eliptică */
.elliptic {
  background: radial-gradient(ellipse, #fbbf24, #b45309);
}

/* Dimensiune și poziție */
.custom {
  background: radial-gradient(
    circle at 30% 70%, /* centru la 30% orizontal, 70% vertical */
    #3b82f6 0%,
    #1e40af 40%,
    transparent 70%
  );
}

/* Gradient radial pe element solid */
.card {
  background:
    radial-gradient(circle at top right, rgba(59,130,246,0.2) 0%, transparent 50%),
    #0f172a;
}
\`\`\`

**conic-gradient**

\`\`\`css
/* Gradient conic — rotational */
.pie {
  background: conic-gradient(
    #ef4444 0deg 90deg,
    #3b82f6 90deg 210deg,
    #22c55e 210deg 360deg
  );
  border-radius: 50%;
  width: 200px;
  height: 200px;
}

/* Checker board */
.checkerboard {
  background: conic-gradient(#e2e8f0 90deg, #94a3b8 90deg 180deg, #e2e8f0 180deg 270deg, #94a3b8 270deg);
  background-size: 40px 40px;
}
\`\`\`

**Gradiente repetitive**

\`\`\`css
/* Dungi repetate */
.stripes {
  background: repeating-linear-gradient(
    45deg,
    #f3f4f6,
    #f3f4f6 10px,
    #e5e7eb 10px,
    #e5e7eb 20px
  );
}

/* Cercuri repetate */
.dots {
  background: repeating-radial-gradient(
    circle at 0 0,
    #3b82f6 0px,
    #3b82f6 5px,
    transparent 5px,
    transparent 30px
  );
}
\`\`\`

**Gradiente în sisteme de design**

\`\`\`css
:root {
  --gradient-primary: linear-gradient(135deg, #3b82f6, #8b5cf6);
  --gradient-warm: linear-gradient(135deg, #f97316, #ef4444);
  --gradient-hero: linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0.7));
}

.hero-overlay { background: var(--gradient-hero); }
.badge        { background: var(--gradient-primary); }
\`\`\``
  },
  {
    lessonContains: 'Background avansat',
    titleContains: 'Trick',
    content: `**Trick-urile cu background CSS** rezolvă probleme vizuale comune fără imagini externe sau JavaScript. Sunt combinații creative ale proprietăților de fundal.

**Overlay pe imagini**

\`\`\`css
/* Overlay cu pseudo-element */
.hero {
  position: relative;
}

.hero::before {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(0,0,0,0) 0%,
    rgba(0,0,0,0.7) 100%
  );
  z-index: 1;
}

.hero-content { position: relative; z-index: 2; }

/* Overlay direct cu multiple backgrounds */
.hero-direct {
  background:
    linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)),
    url('hero.jpg') center / cover;
}
\`\`\`

**Text pe fundal citibil**

\`\`\`css
.card-image {
  background:
    linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 50%),
    url('photo.jpg') center / cover;
  padding: 24px;
  display: flex;
  align-items: flex-end;
}

.card-image .title { color: white; }
\`\`\`

**Background pattern-uri fără imagini**

\`\`\`css
/* Grid */
.grid-paper {
  background-color: white;
  background-image:
    linear-gradient(#e2e8f0 1px, transparent 1px),
    linear-gradient(90deg, #e2e8f0 1px, transparent 1px);
  background-size: 24px 24px;
}

/* Dungi diagonale */
.diagonal {
  background: repeating-linear-gradient(
    -45deg,
    transparent,
    transparent 10px,
    rgba(59,130,246,0.1) 10px,
    rgba(59,130,246,0.1) 20px
  );
}

/* Hex pattern */
.hexagon-pattern {
  background-color: #f8fafc;
  background-image:
    radial-gradient(circle farthest-side at 0% 50%, #e2e8f0 23.5%, rgba(240,166,17,0) 0)21px 30px,
    radial-gradient(circle farthest-side at 0% 50%, #ccc 24%, rgba(240,166,17,0) 0)19px 30px;
  background-size: 42px 60px;
}
\`\`\`

**Aspect ratio cu background**

\`\`\`css
/* Înainte de aspect-ratio property */
.video-wrapper {
  position: relative;
  padding-bottom: 56.25%; /* 16:9 = 9/16 * 100 */
  background: #000;
}

.video-wrapper iframe {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

/* Modern */
.video-wrapper-modern {
  aspect-ratio: 16 / 9;
}
\`\`\`

**Background-blend-mode**

\`\`\`css
/* Amestecă layere de background */
.duotone {
  background:
    linear-gradient(to right, rgba(59,130,246,0.8), rgba(139,92,246,0.8)),
    url('photo.jpg') center / cover;
  background-blend-mode: multiply; /* multiply, screen, overlay, etc. */
}

.vintage {
  background:
    rgba(255, 200, 100, 0.3),
    url('photo.jpg') center / cover;
  background-blend-mode: sepia; /* efect vintage */
}
\`\`\`

**Skeleton loading cu animație**

\`\`\`css
.skeleton {
  background: linear-gradient(
    90deg,
    #e2e8f0 25%,
    #f1f5f9 50%,
    #e2e8f0 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  from { background-position: 200% 0; }
  to   { background-position: -200% 0; }
}
\`\`\``
  },

  // L16: Transitions
  {
    lessonContains: 'Transitions',
    titleContains: 'tranziție',
    content: `**Tranzițiile CSS** animă schimbările de proprietăți CSS, creând experiențe vizuale fluide fără JavaScript. Sunt ideale pentru hover, focus și stări de UI.

**Sintaxa de bază**

\`\`\`css
.btn {
  background: #3b82f6;
  /* property | duration | timing-function | delay */
  transition: background 0.3s ease 0s;
}

.btn:hover {
  background: #2563eb;
}
\`\`\`

**Proprietățile transition**

\`\`\`css
.card {
  transition-property: transform, box-shadow, opacity;
  transition-duration: 0.3s, 0.3s, 0.2s;
  transition-timing-function: ease, ease, ease-out;
  transition-delay: 0s, 0s, 0.1s;
}

/* Shorthand pentru multiple proprietăți */
.card {
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease,
    opacity 0.2s ease-out 0.1s;
}
\`\`\`

**transition: all — convenabil dar periculos**

\`\`\`css
/* Convenabil dar poate anima proprietăți nedorite */
.element { transition: all 0.3s ease; }

/* Preferă liste explicite */
.element {
  transition: color 0.2s ease, background 0.2s ease;
}
\`\`\`

**Animații comune UI**

\`\`\`css
/* Button hover lift */
.btn {
  transform: translateY(0);
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0,0,0,0.15);
}
.btn:active {
  transform: translateY(0);
  box-shadow: 0 1px 4px rgba(0,0,0,0.1);
}

/* Card flip reveal */
.card {
  opacity: 0.7;
  transform: scale(0.98);
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.card:hover {
  opacity: 1;
  transform: scale(1);
}

/* Link underline slide */
.nav-link {
  background: linear-gradient(currentColor, currentColor) no-repeat bottom left;
  background-size: 0 2px;
  transition: background-size 0.3s ease;
}
.nav-link:hover { background-size: 100% 2px; }
\`\`\`

**Tranziție la display (workaround)**

\`\`\`css
/* display nu se poate transita direct */
/* BAD — dispare brusc */
.tooltip { display: none; }
.parent:hover .tooltip { display: block; }

/* GOOD — folosește opacity + visibility */
.tooltip {
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.2s ease, visibility 0.2s ease;
}
.parent:hover .tooltip {
  opacity: 1;
  visibility: visible;
}
\`\`\`

• **visibility: hidden** = ascunde dar menține spațiul; se poate transita
• **display: none** = elimină din layout; NU se poate transita
• **opacity: 0** = invizibil dar interactiv — adaugă \`pointer-events: none\` dacă e nevoie`
  },
  {
    lessonContains: 'Transitions',
    titleContains: 'Timing',
    content: `**Timing functions** controlează **ritmul** animației — cât de repede sau lent progresează tranziția în timp. Alegerea corectă face diferența între o animație mecanică și una naturală.

**Funcțiile predefinite**

\`\`\`css
.a { transition: all 0.3s linear; }     /* viteză constantă — mecanic */
.b { transition: all 0.3s ease; }       /* lent la start/final — default */
.c { transition: all 0.3s ease-in; }    /* accelerează spre final */
.d { transition: all 0.3s ease-out; }   /* decelerează spre final */
.e { transition: all 0.3s ease-in-out; }/* lent la ambele capete */
\`\`\`

**cubic-bezier() — control precis**

\`\`\`css
/* cubic-bezier(x1, y1, x2, y2) — două puncte de control */

/* Overshoot — sare ușor peste destinație */
.bounce {
  transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

/* Spring — pornire bruscă, final lin */
.spring {
  transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

/* Anticipare — mișcare ușoară înapoi înainte de forward */
.anticipate {
  transition: transform 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55);
}

/* Valori > 1 sau < 0 pe Y creează overshoot */
\`\`\`

**steps() — animații frame cu frame**

\`\`\`css
/* steps(n, direction) — tranziție în pași discreți */

/* Sprite sheet animation */
.sprite {
  background: url('sprite.png') no-repeat;
  width: 64px;
  height: 64px;
  transition: background-position 1s steps(8, end);
}

/* Cursor text blink */
.cursor::after {
  content: "|";
  animation: blink 1s steps(1, end) infinite;
}

@keyframes blink {
  50% { opacity: 0; }
}

/* Typing effect */
.typewriter {
  overflow: hidden;
  white-space: nowrap;
  animation: typing 3s steps(30, end);
}
@keyframes typing {
  from { width: 0; }
  to { width: 100%; }
}
\`\`\`

**linear() — interpolare complexă (CSS 2023)**

\`\`\`css
/* linear() permite definirea unor puncte multiple de easing */
.spring {
  transition: transform 0.8s linear(
    0, 0.009, 0.035 2.1%, 0.141, 0.281 6.7%, 0.723 12.9%, 0.938 16.7%, 1.04,
    1.066, 1.072, 1.063, 1.041 30.4%, 1.013, 1 40%, 0.995, 1
  );
}
/* Definit la linear-easing.fun sau easing.dev */
\`\`\`

**Principii de design în animații**

• **ease-out** = pentru intrare pe ecran (natural, ca și cum ar ateriza)
• **ease-in** = pentru ieșire de pe ecran (accelerează și dispare)
• **ease-in-out** = pentru tranziții între stări
• **linear** = pentru rotații continue (loading spinner)

**Durate recomandate**

\`\`\`css
:root {
  --duration-fast:   0.1s;  /* micro-interactions: hover, click */
  --duration-normal: 0.2s;  /* tranziții UI: show/hide */
  --duration-slow:   0.4s;  /* animații complexe: modal open */
  --duration-slower: 0.6s;  /* tranziții de pagină */
}
\`\`\``
  },
  {
    lessonContains: 'Transitions',
    titleContains: 'Best practices',
    content: `**Performanța animațiilor CSS** depinde de ce proprietăți animezi. Unele proprietăți cauzează reflow și repaint costisitor, altele sunt accelerate GPU și aproape gratuite.

**Proprietăți și costul lor**

\`\`\`
IEFTINE (GPU-accelerate):
  transform: translate, rotate, scale
  opacity
  filter (partial)

COSTISITOARE (cauzează layout/repaint):
  width, height, margin, padding  → REFLOW (layout recalculat)
  color, background, box-shadow   → REPAINT (pixeli redesenați)
  top, left, right, bottom        → REFLOW (depinde de position)
\`\`\`

**Animă DOAR transform și opacity**

\`\`\`css
/* BAD — animare width cauzează reflow */
.panel {
  width: 0;
  transition: width 0.3s ease;
}
.panel.open { width: 300px; }

/* GOOD — animare transform nu cauzează reflow */
.panel {
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s ease;
}
.panel.open { transform: scaleX(1); }
\`\`\`

**will-change — optimizare proactivă**

\`\`\`css
/* Sugerează browserului să creeze un layer GPU */
.card {
  will-change: transform;
}

/* Aplică DOAR pe elemente care chiar vor fi animate */
/* Nu adăuga will-change la tot — consumă memorie */

/* Adaugă/elimină dinamic cu JS */
card.addEventListener('mouseenter', () => {
  card.style.willChange = 'transform';
});
card.addEventListener('mouseleave', () => {
  card.style.willChange = 'auto';
});
\`\`\`

**prefers-reduced-motion — accesibilitate**

\`\`\`css
/* Default — animații normale */
.animated {
  transition: transform 0.4s ease;
  animation: spin 2s linear infinite;
}

/* Utilizatorii cu sensibilitate la mișcare */
@media (prefers-reduced-motion: reduce) {
  .animated {
    transition: none;
    animation: none;
  }

  /* Sau versiune minimală */
  .animated {
    transition: opacity 0.1s ease;
    animation-duration: 0.01ms;
    animation-iteration-count: 1;
  }
}
\`\`\`

**Tranziții fluidă la height auto**

\`\`\`css
/* height: auto nu se poate transita */
/* TRICK cu max-height */
.accordion-body {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
}

.accordion-body.open {
  max-height: 1000px; /* valoare mare = suficientă */
}

/* Dezavantaj: timing distorsionat dacă conținut mic */
/* Modern: calc-size() — suport limitat 2024 */
\`\`\`

**Debugging animații**

\`\`\`
Chrome DevTools:
  → Animations panel (Ctrl+Shift+P → "Animations")
  → Slowdown 1x, 10x, 100x
  → Replay individual animation

Performance panel:
  → Record → scroll/interact
  → Caută "Layout" și "Paint" în timeline — minimizează-le
  → "Composite" = bine (GPU), "Paint" = costisitor
\`\`\`

**Reguli de aur**

• Animează doar \`transform\` și \`opacity\` pentru 60fps
• Folosește \`will-change\` cu parcimonie
• Respectă \`prefers-reduced-motion\`
• Durate sub 300ms pentru interacțiuni, sub 500ms pentru tranziții de UI`
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
