const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();

const items = [
  // L28: Design System cu CSS
  {
    lessonContains: 'Design System cu CSS',
    titleContains: 'Ce este un Design',
    content: `**Un Design System** este un set de decizii de design documentate și implementate ca **componente reutilizabile și tokens de design** — limbajul vizual comun al unui produs sau organizații.

**Structura unui Design System**

\`\`\`
Design System
├── Foundations (Fundații)
│   ├── Design Tokens — culori, spațieri, tipografie, umbre
│   ├── Grid System — structura paginilor
│   └── Motion — animații și tranziții
│
├── Components
│   ├── Primitive — Button, Input, Badge, Tag
│   ├── Composite — Card, Modal, Dropdown
│   └── Layout — Navbar, Sidebar, Footer
│
└── Patterns
    ├── Forms — validare, layout
    ├── Navigation — meniuri, breadcrumbs
    └── Data Display — tabele, liste
\`\`\`

**Design Tokens — atomic values**

\`\`\`css
/* Primitive tokens — valorile brute */
:root {
  /* Color palette */
  --blue-50:  #eff6ff;
  --blue-100: #dbeafe;
  --blue-200: #bfdbfe;
  --blue-500: #3b82f6;
  --blue-600: #2563eb;
  --blue-700: #1d4ed8;
  --blue-900: #1e3a8a;

  --gray-50:  #f9fafb;
  --gray-100: #f3f4f6;
  --gray-200: #e5e7eb;
  --gray-500: #6b7280;
  --gray-700: #374151;
  --gray-900: #111827;

  /* Spacing scale */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-6: 24px;
  --space-8: 32px;
  --space-12: 48px;
  --space-16: 64px;

  /* Typography */
  --text-xs:   0.75rem;   /* 12px */
  --text-sm:   0.875rem;  /* 14px */
  --text-base: 1rem;      /* 16px */
  --text-lg:   1.125rem;  /* 18px */
  --text-xl:   1.25rem;   /* 20px */
  --text-2xl:  1.5rem;    /* 24px */
  --text-4xl:  2.25rem;   /* 36px */

  /* Radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-full: 9999px;
}
\`\`\`

**Semantic tokens — mapare la contexte**

\`\`\`css
:root {
  /* Semantic color tokens */
  --color-primary:         var(--blue-500);
  --color-primary-hover:   var(--blue-600);
  --color-primary-active:  var(--blue-700);
  --color-primary-subtle:  var(--blue-50);
  --color-primary-border:  var(--blue-200);

  --color-text-primary:    var(--gray-900);
  --color-text-secondary:  var(--gray-500);
  --color-text-disabled:   var(--gray-300);

  --color-bg-default:      white;
  --color-bg-subtle:       var(--gray-50);
  --color-bg-hover:        var(--gray-100);

  --color-border-default:  var(--gray-200);
  --color-border-strong:   var(--gray-400);

  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
  --shadow-md: 0 4px 6px rgba(0,0,0,0.07), 0 2px 4px rgba(0,0,0,0.05);
  --shadow-lg: 0 10px 15px rgba(0,0,0,0.1), 0 4px 6px rgba(0,0,0,0.05);
}
\`\`\`

**Beneficiile unui design system bine implementat**

• **Consistență** — toate componentele arată și se comportă uniform
• **Viteză de dezvoltare** — componentele sunt gata de refolosit
• **Mentenanță** — schimbarea unui token afectează tot sistemul
• **Colaborare** — designerii și developerii vorbesc același limbaj`
  },
  {
    lessonContains: 'Design System cu CSS',
    titleContains: 'Componente de Baza',
    content: `**Componentele de bază** (Button, Input, Card) sunt blocurile fundamentale ale oricărui design system. Implementarea lor corectă asigură că tot restul sistemului este consistent.

**Button — complet și accesibil**

\`\`\`css
.btn {
  /* Reset */
  appearance: none;
  border: none;
  background: none;
  font: inherit;

  /* Base styles */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-md);
  font-size: var(--text-sm);
  font-weight: 600;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  transition: all 0.15s ease;
  text-decoration: none;
  border: 2px solid transparent;

  /* Focus */
  outline: none;
}

.btn:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

.btn:disabled {
  opacity: 0.5;
  pointer-events: none;
  cursor: not-allowed;
}

/* Variante */
.btn--primary {
  background: var(--color-primary);
  color: white;
}
.btn--primary:hover   { background: var(--color-primary-hover); }
.btn--primary:active  { background: var(--color-primary-active); }

.btn--secondary {
  background: var(--color-bg-subtle);
  color: var(--color-text-primary);
  border-color: var(--color-border-default);
}
.btn--secondary:hover { background: var(--color-bg-hover); }

.btn--ghost {
  color: var(--color-primary);
  background: transparent;
}
.btn--ghost:hover {
  background: var(--color-primary-subtle);
}

.btn--danger {
  background: #ef4444;
  color: white;
}
.btn--danger:hover { background: #dc2626; }

/* Dimensiuni */
.btn--sm { padding: var(--space-1) var(--space-3); font-size: var(--text-xs); }
.btn--lg { padding: var(--space-3) var(--space-6); font-size: var(--text-base); }

/* Loading state */
.btn--loading { position: relative; color: transparent; }
.btn--loading::after {
  content: "";
  position: absolute;
  width: 16px; height: 16px;
  border: 2px solid rgba(255,255,255,0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }
\`\`\`

**Input — form field complet**

\`\`\`css
.field { display: grid; gap: var(--space-1); }

.field__label {
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--color-text-primary);
}

.field__input {
  padding: var(--space-2) var(--space-3);
  border: 1.5px solid var(--color-border-default);
  border-radius: var(--radius-md);
  font-size: var(--text-sm);
  font-family: inherit;
  color: var(--color-text-primary);
  background: white;
  transition: border-color 0.15s, box-shadow 0.15s;
  outline: none;
  width: 100%;
}

.field__input:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(59,130,246,0.15);
}

.field__input:disabled {
  background: var(--color-bg-subtle);
  color: var(--color-text-disabled);
  cursor: not-allowed;
}

.field--error .field__input { border-color: #ef4444; }
.field--error .field__input:focus { box-shadow: 0 0 0 3px rgba(239,68,68,0.15); }

.field__hint { font-size: var(--text-xs); color: var(--color-text-secondary); }
.field__error { font-size: var(--text-xs); color: #ef4444; }
\`\`\`

**Card**

\`\`\`css
.card {
  background: var(--color-bg-default);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-sm);
  overflow: hidden;
}

.card__header  { padding: var(--space-6); border-bottom: 1px solid var(--color-border-default); }
.card__body    { padding: var(--space-6); }
.card__footer  { padding: var(--space-6); border-top: 1px solid var(--color-border-default); }

.card--interactive {
  cursor: pointer;
  transition: box-shadow 0.2s, transform 0.2s;
}
.card--interactive:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-2px);
}
\`\`\``
  },
  {
    lessonContains: 'Design System cu CSS',
    titleContains: 'Dark Mode cu Design',
    content: `**Dark Mode** cu design tokens este elegant — un singur set de suprascrieri schimbă toate culorile simultan, fără a duplica stiluri de componente.

**Arhitectura tokens pentru dark mode**

\`\`\`css
/* Light theme (default) */
:root {
  --color-bg-default:   #ffffff;
  --color-bg-subtle:    #f9fafb;
  --color-bg-hover:     #f3f4f6;
  --color-bg-active:    #e5e7eb;

  --color-text-primary:   #111827;
  --color-text-secondary: #6b7280;
  --color-text-disabled:  #d1d5db;
  --color-text-inverse:   #ffffff;

  --color-border-default: #e5e7eb;
  --color-border-strong:  #9ca3af;

  --color-primary:        #3b82f6;
  --color-primary-hover:  #2563eb;
  --color-primary-subtle: #eff6ff;

  --color-success: #22c55e;
  --color-warning: #f59e0b;
  --color-danger:  #ef4444;

  --shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
  --shadow-md: 0 4px 6px rgba(0,0,0,0.07);
  --shadow-lg: 0 10px 15px rgba(0,0,0,0.1);
}

/* Dark theme — suprascriere tokens */
[data-theme="dark"],
@media (prefers-color-scheme: dark) {
  :root {
    --color-bg-default:   #111827;
    --color-bg-subtle:    #1f2937;
    --color-bg-hover:     #374151;
    --color-bg-active:    #4b5563;

    --color-text-primary:   #f9fafb;
    --color-text-secondary: #9ca3af;
    --color-text-disabled:  #4b5563;

    --color-border-default: #374151;
    --color-border-strong:  #6b7280;

    --color-primary:        #60a5fa;
    --color-primary-hover:  #93c5fd;
    --color-primary-subtle: #1e3a8a;

    --shadow-sm: 0 1px 2px rgba(0,0,0,0.3);
    --shadow-md: 0 4px 6px rgba(0,0,0,0.4);
    --shadow-lg: 0 10px 15px rgba(0,0,0,0.5);
  }
}
\`\`\`

**Toggle dark mode**

\`\`\`javascript
class ThemeManager {
  static STORAGE_KEY = 'theme';

  static init() {
    const saved = localStorage.getItem(this.STORAGE_KEY);
    const preferred = window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark' : 'light';

    this.apply(saved || preferred);

    // Listen pentru schimbări sistem
    window.matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', e => {
        if (!localStorage.getItem(this.STORAGE_KEY)) {
          this.apply(e.matches ? 'dark' : 'light');
        }
      });
  }

  static apply(theme) {
    document.documentElement.setAttribute('data-theme', theme);
  }

  static toggle() {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    this.apply(next);
    localStorage.setItem(this.STORAGE_KEY, next);
  }
}

ThemeManager.init();
\`\`\`

**Tranziție fluidă**

\`\`\`css
/* Aplică doar proprietățile de culoare cu tranziție */
:root {
  --theme-transition: background-color 0.3s ease, color 0.3s ease,
                      border-color 0.3s ease, box-shadow 0.3s ease;
}

body, *, *::before, *::after {
  transition: var(--theme-transition);
}

/* Dezactivează în animații */
.btn { transition: background-color 0.15s ease, transform 0.15s ease; }
\`\`\`

**Imagini și media în dark mode**

\`\`\`css
@media (prefers-color-scheme: dark) {
  img:not([src*=".svg"]) {
    filter: brightness(0.9) contrast(1.05);
  }

  /* Logo cu variantă dark */
  .logo-light { display: none; }
  .logo-dark  { display: block; }
}
\`\`\``
  },
  {
    lessonContains: 'Design System cu CSS',
    titleContains: '@layer pentru',
    content: `**CSS @layer în design systems** rezolvă conflictele de specificitate dintre librării, componente și utilitare — asigurând că ierarhia de stiluri este întotdeauna predictibilă.

**Arhitectura cu @layer**

\`\`\`css
/* Declarare ordinea layerelor — de la cea mai mică la cea mai mare prioritate */
@layer
  reset,         /* normalizare browsere */
  tokens,        /* CSS custom properties */
  base,          /* stiluri element */
  vendor,        /* librării terțe */
  layout,        /* grid, containers */
  components,    /* UI components */
  utilities;     /* clase helper cu prioritate maximă */
\`\`\`

**Reset în layer**

\`\`\`css
@layer reset {
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html { -webkit-text-size-adjust: 100%; tab-size: 4; }
  body { line-height: 1.5; -webkit-font-smoothing: antialiased; }
  img, picture, video, canvas, svg { display: block; max-width: 100%; }
  input, button, textarea, select { font: inherit; }
  p, h1, h2, h3, h4, h5, h6 { overflow-wrap: break-word; }
}
\`\`\`

**Tokens în layer**

\`\`\`css
@layer tokens {
  :root {
    --color-primary:   #3b82f6;
    --color-text:      #111827;
    --color-bg:        #ffffff;
    --space-4:         16px;
    --radius-md:       8px;
    /* ... */
  }

  [data-theme="dark"] {
    --color-primary: #60a5fa;
    --color-text:    #f9fafb;
    --color-bg:      #111827;
  }
}
\`\`\`

**Librărie externă în layer vendor**

\`\`\`css
/* Importă Bootstrap/normalize în layer vendor */
@import url('normalize.css') layer(vendor);
@import url('bootstrap.css') layer(vendor);

/* SAU inline */
@layer vendor {
  /* conținut Bootstrap/normalize */
}

/* Stilurile tale câștigă mereu față de vendor */
@layer components {
  .btn { background: var(--color-primary); } /* suprascrie Bootstrap */
}
\`\`\`

**Components în layer**

\`\`\`css
@layer components {
  /* Base styles */
  .btn {
    display: inline-flex;
    align-items: center;
    padding: var(--space-2) var(--space-4);
    border-radius: var(--radius-md);
    font-weight: 600;
    cursor: pointer;
    transition: all 0.15s;
  }

  .btn--primary { background: var(--color-primary); color: white; }

  /* Carduri */
  .card {
    background: var(--color-bg);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-xl);
    padding: var(--space-6);
  }
}
\`\`\`

**Utilities cu prioritate maximă**

\`\`\`css
@layer utilities {
  /* Aceste clase câștigă MEREU față de component styles */
  .hidden        { display: none !important; } /* !important în ultim layer */
  .sr-only       { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0,0,0,0); }
  .flex          { display: flex; }
  .grid          { display: grid; }
  .text-center   { text-align: center; }
  .rounded-full  { border-radius: 9999px; }
  .truncate      { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
}
\`\`\`

**Nested layers în components**

\`\`\`css
@layer components {
  @layer base     { .btn { /* styles de baza */ } }
  @layer variants { .btn--primary { /* variante */ } }
  @layer states   { .btn:hover   { /* stari */ } }
}
/* Prioritate: components.base < components.variants < components.states */
\`\`\``
  },

  // L29: Container Queries Avansate
  {
    lessonContains: 'Container Queries Avansate',
    titleContains: 'Responsive la',
    content: `**Container Queries** permit componente cu adevărat responsive — se adaptează la **containerul lor**, nu la viewport. Aceasta este diferența fundamentală față de media queries.

**Conceptul de container**

\`\`\`css
/* Orice element poate fi container */
.sidebar-wrapper {
  container-type: inline-size;
  container-name: sidebar;
}

.main-content-wrapper {
  container-type: inline-size;
  container-name: main;
}

/* Acum componentele din interior se adaptează independent */
\`\`\`

**Container query vs media query — diferența vizuală**

\`\`\`
Media Query (viewport):                Container Query (container):
┌─────────────────────────────────┐    ┌─────────────────────────────────┐
│ Viewport: 1200px                 │    │ Viewport: 1200px                 │
│ ┌────────┐ ┌──────────────────┐ │    │ ┌────────┐ ┌──────────────────┐ │
│ │Sidebar │ │  Main Content    │ │    │ │Sidebar │ │  Main Content    │ │
│ │[CARD   │ │ [CARD LAYOUT    ]│ │    │ │[CARD  ]│ │ [CARD LAYOUT   ]│ │
│ │LAYOUT ]│ │ [CARD LAYOUT    ]│ │    │ │[CARD  ]│ │ [CARD LAYOUT   ]│ │
│ └────────┘ └──────────────────┘ │    │ 280px   │ │ 920px           │ │
│ MQ: viewport=1200 → wide card  │    │ CQ: container=280 → narrow    │ │
│ AMBELE cards sunt "wide"        │    │ CQ: container=920 → wide       │ │
└─────────────────────────────────┘    └─────────────────────────────────┘
\`\`\`

**Implementare completă**

\`\`\`css
/* Definire containere */
.card-wrapper {
  container: card / inline-size;
}

/* Componentă adaptată la container */
.card {
  display: grid;
  grid-template-rows: auto 1fr auto;
  gap: 12px;
  padding: 16px;
}

/* Card mic (default — sub 320px) */
.card__image {
  aspect-ratio: 16/9;
  width: 100%;
  object-fit: cover;
  border-radius: 8px;
}

/* Card mediu (320px-480px) */
@container card (min-width: 320px) {
  .card {
    display: grid;
    grid-template-columns: 120px 1fr;
    grid-template-rows: auto auto auto;
    gap: 0 16px;
  }

  .card__image {
    grid-row: 1 / -1;
    width: 120px;
    height: 100%;
    aspect-ratio: auto;
  }
}

/* Card mare (480px+) */
@container card (min-width: 480px) {
  .card {
    grid-template-columns: 180px 1fr;
    gap: 0 24px;
    padding: 20px;
  }

  .card__title { font-size: 1.2rem; }
  .card__image { width: 180px; border-radius: 12px; }
}
\`\`\`

**Container queries cu :has() și :is()**

\`\`\`css
/* Container query + :has() pentru layout dinamic */
@container card (min-width: 400px) {
  .card:has(img) {
    grid-template-columns: 160px 1fr;
  }
  .card:not(:has(img)) {
    grid-template-columns: 1fr;
  }
}
\`\`\``
  },
  {
    lessonContains: 'Container Queries Avansate',
    titleContains: 'Query Units',
    content: `**Container Query Units** permit dimensionarea elementelor **relativ la containerul lor**, similar cu unitățile de viewport (vw, vh) dar pentru orice container.

**Unitățile disponibile**

\`\`\`css
/* cqw — 1% din lățimea containerului (container width) */
/* cqh — 1% din înălțimea containerului (container height) */
/* cqi — 1% din dimensiunea inline a containerului (lățime în LTR) */
/* cqb — 1% din dimensiunea block a containerului (înălțime în LTR) */
/* cqmin — min(cqi, cqb) */
/* cqmax — max(cqi, cqb) */

.container {
  container-type: inline-size;
  container-name: sidebar;
}

.title {
  font-size: 4cqi; /* 4% din lățimea containerului */
}
\`\`\`

**Tipografie fluid cu cqi**

\`\`\`css
.card-wrapper {
  container: card / inline-size;
}

.card-title {
  /* Fluid între 1rem și 2rem bazat pe container */
  font-size: clamp(1rem, 4cqi, 2rem);
}

.card-text {
  font-size: clamp(0.875rem, 2.5cqi, 1.1rem);
  line-height: 1.6;
}

/* Hero în container mare */
@container card (min-width: 600px) {
  .card-title { font-size: clamp(1.5rem, 5cqi, 3rem); }
}
\`\`\`

**Dimensionare imagini cu cqw**

\`\`\`css
.grid-wrapper {
  container: grid / inline-size;
}

.grid-item img {
  width: 30cqw;   /* 30% din lățimea grid containerului */
  height: 30cqw;  /* pătrat bazat pe container */
  object-fit: cover;
}

@container grid (min-width: 600px) {
  .grid-item img {
    width: 20cqw;
    height: 20cqw;
  }
}
\`\`\`

**Gap și spacing cu container units**

\`\`\`css
.card-wrapper { container: card / inline-size; }

.card {
  padding: 4cqi;
  gap: 2cqi;
}

/* Limitare cu clamp */
.card {
  padding: clamp(12px, 4cqi, 32px);
  gap: clamp(8px, 2cqi, 16px);
}
\`\`\`

**cqh pentru înălțime adaptivă**

\`\`\`css
/* Necesită container-type: size (nu inline-size) */
.panel-wrapper {
  container: panel / size;
  height: 400px;
}

.panel-item {
  height: 50cqh; /* 50% din înălțimea containerului */
}

.panel-icon {
  width: 15cqmin;  /* 15% din dimensiunea minimă */
  height: 15cqmin;
}
\`\`\`

**Combinare cu custom properties**

\`\`\`css
.container-responsive {
  container: ui / inline-size;
}

.component {
  --base-size: 4cqi;
  --gap: calc(var(--base-size) / 2);

  padding: var(--base-size);
  gap: var(--gap);
  font-size: clamp(0.875rem, var(--base-size), 1.5rem);
}
\`\`\`

**Suport browser**

• Chrome 105+, Firefox 110+, Safari 16+
• Container query units au suport ușor mai restrâns decât @container — verifică caniuse.com`
  },
  {
    lessonContains: 'Container Queries Avansate',
    titleContains: 'Style Container',
    content: `**Style Container Queries** permit aplicarea de stiluri condiționate pe **valoarea unei custom properties** a containerului — o formă de comunicare CSS parinte→copil.

**Sintaxa Style Query**

\`\`\`css
/* Container pentru style query */
.wrapper {
  container-type: style; /* NU inline-size sau size */
}

/* Sau combinat */
.wrapper {
  container-type: inline-size style; /* ȘI size ȘI style */
}

/* Query pe valoarea unei proprietăți */
@container style(--variant: primary) {
  .btn { background: royalblue; color: white; }
}

@container style(--variant: danger) {
  .btn { background: #ef4444; color: white; }
}
\`\`\`

**Themeing dinamic cu style queries**

\`\`\`html
<div class="card-wrapper" style="--card-theme: featured">
  <div class="card">
    <h3 class="card__title">Card Featured</h3>
  </div>
</div>
\`\`\`

\`\`\`css
.card-wrapper {
  container-type: style;
}

/* Default */
.card {
  background: white;
  border: 1px solid #e2e8f0;
}

/* Tema featured */
@container style(--card-theme: featured) {
  .card {
    background: linear-gradient(135deg, #3b82f6, #8b5cf6);
    color: white;
    border: none;
  }
  .card__title { color: white; }
}

/* Tema success */
@container style(--card-theme: success) {
  .card { background: #f0fdf4; border-color: #22c55e; }
}
\`\`\`

**Propagare de context la componente**

\`\`\`css
/* Grid parinte setează contextul */
.grid--compact { --density: compact; }
.grid--comfortable { --density: comfortable; }

/* Aplicat pe containerul wrapping */
.grid {
  container-type: style;
}

/* Componente se adaptează la densitate */
@container style(--density: compact) {
  .card { padding: 8px; }
  .card__title { font-size: 0.9rem; }
}

@container style(--density: comfortable) {
  .card { padding: 24px; }
  .card__title { font-size: 1.25rem; }
}
\`\`\`

**Style queries pentru dark/light mode**

\`\`\`css
/* Container setează tema */
.theme-section {
  container-type: style;
  --theme: light;
}

.theme-section.dark {
  --theme: dark;
}

@container style(--theme: dark) {
  .card {
    background: #1e293b;
    color: #f1f5f9;
    border-color: #334155;
  }
}

@container style(--theme: light) {
  .card {
    background: white;
    color: #1e293b;
    border-color: #e2e8f0;
  }
}
\`\`\`

**Suport și limitări**

• Style queries au suport parțial — Chrome 111+, Safari 18+, Firefox experimental
• Funcționează DOAR cu CSS custom properties, nu cu valori ale proprietăților native
• Combinarea cu \`inline-size\` permite atât size cât și style queries pe același element`
  },
  {
    lessonContains: 'Container Queries Avansate',
    titleContains: 'Domeniu',
    content: `**@scope** limitează aplicarea stilurilor CSS la un **domeniu DOM specific**, prevenind scurgerile de stiluri — un pas important spre encapsularea CSS nativă.

**Sintaxa @scope**

\`\`\`css
/* Stiluri aplicate DOAR în interiorul .card */
@scope (.card) {
  img {
    border-radius: 8px;
    aspect-ratio: 16/9;
    object-fit: cover;
  }

  h3 {
    font-size: 1.1rem;
    font-weight: 700;
    margin-bottom: 8px;
  }

  p {
    color: #64748b;
    font-size: 0.9rem;
  }
}
\`\`\`

**@scope cu limita inferioară (lower bound)**

\`\`\`css
/* Stiluri aplicate ÎNTRE .card și .card__footer */
/* Elementele în .card__footer NU sunt afectate */
@scope (.card) to (.card__footer) {
  p { color: var(--text-muted); }
  h3 { color: var(--text); }
}

/* footer are stiluri proprii separate */
@scope (.card__footer) {
  p { color: var(--text-secondary); font-size: 0.8rem; }
}
\`\`\`

**Prevenire scurgeri stiluri**

\`\`\`css
/* Fără @scope — stilul poate afecta ORICE element de tipul respectiv */
.modal a { color: white; }
/* Orice link din modal ← stilizat */

/* Cu @scope — mai precis */
@scope (.modal) to (.modal__footer) {
  a { color: var(--modal-link-color, white); }
}
/* Linkurile din .modal__footer NU sunt afectate */
\`\`\`

**:scope selector în @scope**

\`\`\`css
@scope (.card) {
  /* :scope se referă la elementul container (.card) */
  :scope { background: white; border-radius: 12px; }
  :scope:hover { box-shadow: 0 8px 24px rgba(0,0,0,0.1); }
  :scope > .card__image { border-radius: 12px 12px 0 0; }
}
\`\`\`

**Comparație cu alternative**

\`\`\`css
/* 1. Selectori adânci — fragilI */
.card .card-image img { border-radius: 8px; }

/* 2. CSS Modules (build tool) */
.image { border-radius: 8px; } /* .card_image_abc123 */

/* 3. Shadow DOM — overhead HTML */
/* Necesită JavaScript și custom elements */

/* 4. @scope — nativ CSS, pur */
@scope (.card) {
  img { border-radius: 8px; }
}
\`\`\`

**Inline @scope**

\`\`\`html
<!-- @scope inline în <style> pe element -->
<div class="card">
  <style>
    @scope {
      img { border-radius: 8px; }
      p { color: #64748b; }
    }
  </style>
  <img src="photo.jpg" alt="">
  <p>Descriere card</p>
</div>
\`\`\`

**Suport browser**

• Chrome 118+, Safari 17.4+, Firefox experimental (2024)
• Stil inline scope — suport mai larg (Chrome 107+)
• Folosit împreună cu \`@layer\` pentru un sistem CSS scalabil`
  },

  // L30: Mini Proiect CSS — Landing Page
  {
    lessonContains: 'Landing Page',
    titleContains: 'Arhitectura',
    content: `**Arhitectura CSS** pentru proiecte reale necesită o structură clară, scalabilă și ușor de menținut. Alegerile arhitecturale timpurii determină cât de ușor vei putea extinde proiectul.

**Structura fișierelor**

\`\`\`
src/
├── styles/
│   ├── main.css           ← entry point cu @import
│   ├── tokens/
│   │   ├── colors.css
│   │   ├── typography.css
│   │   ├── spacing.css
│   │   └── shadows.css
│   ├── base/
│   │   ├── reset.css
│   │   ├── typography.css
│   │   └── forms.css
│   ├── layout/
│   │   ├── grid.css
│   │   ├── containers.css
│   │   └── sections.css
│   ├── components/
│   │   ├── navbar.css
│   │   ├── button.css
│   │   ├── card.css
│   │   ├── hero.css
│   │   └── footer.css
│   └── utilities/
│       ├── spacing.css
│       ├── typography.css
│       └── display.css
\`\`\`

**Entry point cu @layer**

\`\`\`css
/* main.css */
@layer tokens, base, layout, components, utilities;

@layer tokens {
  @import 'tokens/colors.css';
  @import 'tokens/typography.css';
  @import 'tokens/spacing.css';
}

@layer base {
  @import 'base/reset.css';
  @import 'base/typography.css';
}

@layer layout {
  @import 'layout/grid.css';
  @import 'layout/containers.css';
  @import 'layout/sections.css';
}

@layer components {
  @import 'components/navbar.css';
  @import 'components/button.css';
  @import 'components/card.css';
  @import 'components/hero.css';
  @import 'components/footer.css';
}

@layer utilities {
  @import 'utilities/spacing.css';
  @import 'utilities/display.css';
}
\`\`\`

**Principii arhitecturale**

\`\`\`css
/* 1. Tokens pentru toate valorile hardcodate */
/* BAD */
.card { border-radius: 12px; color: #374151; padding: 24px; }
/* GOOD */
.card { border-radius: var(--radius-lg); color: var(--text-secondary); padding: var(--space-6); }

/* 2. Componente cu API de variabile */
.btn {
  --btn-bg: var(--color-primary);
  --btn-color: white;
  --btn-radius: var(--radius-md);

  background: var(--btn-bg);
  color: var(--btn-color);
  border-radius: var(--btn-radius);
}

/* Override din exterior fără a atinge componenta */
.hero .btn { --btn-bg: white; --btn-color: var(--color-primary); }
\`\`\`

**Convenții de nomenclatură**

\`\`\`css
/* BEM pentru componente */
.block { }
.block__element { }
.block--modifier { }

/* Tokens: primitive → semantic */
--blue-500: #3b82f6;         /* primitiv */
--color-primary: var(--blue-500); /* semantic */
--btn-bg: var(--color-primary);   /* component-specific */

/* Utilitare cu prefix */
.u-hidden { display: none; }
.u-sr-only { /* screen reader only */ }
\`\`\``
  },
  {
    lessonContains: 'Landing Page',
    titleContains: 'Fluid Typography',
    content: `**Layout modern cu Grid și fluid typography** — tehnici avansate care fac pagina elegantă pe orice dimensiune de ecran, fără breakpoint-uri multiple.

**Container fluid cu max-width**

\`\`\`css
/* Sistemul de containers */
:root {
  --container-sm:  640px;
  --container-md:  768px;
  --container-lg:  1024px;
  --container-xl:  1280px;
  --container-2xl: 1536px;
  --container-padding: clamp(16px, 4vw, 64px);
}

.container {
  width: 100%;
  max-width: var(--container-xl);
  margin-inline: auto;
  padding-inline: var(--container-padding);
}

.container--narrow { max-width: var(--container-md); }
.container--wide   { max-width: var(--container-2xl); }
\`\`\`

**Fluid Typography cu clamp()**

\`\`\`css
/* clamp(min, preferred, max) */
/* preferred = expresie fluid cu vw */

:root {
  --text-sm:   clamp(0.8rem,  0.75rem + 0.2vw, 0.875rem);
  --text-base: clamp(0.9rem,  0.85rem + 0.3vw, 1rem);
  --text-lg:   clamp(1rem,    0.95rem + 0.5vw, 1.25rem);
  --text-xl:   clamp(1.1rem,  1rem    + 0.8vw, 1.5rem);
  --text-2xl:  clamp(1.25rem, 1rem    + 1.5vw, 2rem);
  --text-3xl:  clamp(1.5rem,  1rem    + 3vw,   2.5rem);
  --text-4xl:  clamp(2rem,    1rem    + 5vw,   4rem);
  --text-5xl:  clamp(2.5rem,  1rem    + 8vw,   5rem);
}
\`\`\`

**Grid automat fără media queries**

\`\`\`css
/* auto-fill: umple rânduri cu cât mai multe coloane */
.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(280px, 100%), 1fr));
  gap: clamp(12px, 2vw, 24px);
}

/* auto-fit: centrează ultimul rând */
.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(240px, 100%), 1fr));
  gap: 24px;
}
\`\`\`

**Fluid spacing**

\`\`\`css
:root {
  /* Spațieri fluide cu clamp */
  --space-fluid-sm:  clamp(8px,  2vw, 16px);
  --space-fluid-md:  clamp(16px, 4vw, 32px);
  --space-fluid-lg:  clamp(32px, 6vw, 64px);
  --space-fluid-xl:  clamp(48px, 8vw, 96px);
  --space-fluid-2xl: clamp(64px, 12vw, 160px);
}

.section {
  padding-block: var(--space-fluid-xl);
}

.hero {
  padding-block: var(--space-fluid-2xl);
  padding-inline: var(--container-padding);
}
\`\`\`

**Grid layout pentru secțiunea features**

\`\`\`css
.features-section {
  display: grid;
  grid-template-columns:
    [full-start] var(--container-padding)
    [content-start] 1fr
    [content-end] var(--container-padding)
    [full-end];
}

.features-section > * {
  grid-column: content;
}

/* Element care iese din container */
.features-section .full-bleed {
  grid-column: full;
  background: var(--color-bg-subtle);
  padding: var(--space-fluid-lg) var(--container-padding);
}
\`\`\``
  },
  {
    lessonContains: 'Landing Page',
    titleContains: 'Navbar, Cards',
    content: `**Componentele principale** ale landing page-ului — navbar sticky, cards pentru features și CTA (call-to-action) — implementate cu toate tehnicile moderne CSS.

**Navbar completă**

\`\`\`css
.navbar {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
}

.navbar__inner {
  max-width: var(--container-xl);
  margin-inline: auto;
  padding: 14px var(--container-padding);
  display: flex;
  align-items: center;
  gap: 32px;
}

.navbar__logo {
  font-size: var(--text-xl);
  font-weight: 800;
  background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  text-decoration: none;
  flex-shrink: 0;
}

.navbar__nav {
  display: flex;
  list-style: none;
  gap: 4px;
  margin: 0;
  flex: 1;
}

.navbar__nav a {
  padding: 6px 12px;
  border-radius: 8px;
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--color-text-secondary);
  text-decoration: none;
  transition: color 0.15s, background 0.15s;
}

.navbar__nav a:hover,
.navbar__nav a[aria-current="page"] {
  color: var(--color-text-primary);
  background: var(--color-bg-hover);
}

.navbar__actions {
  display: flex;
  gap: 8px;
  margin-left: auto;
}
\`\`\`

**Feature Cards grid**

\`\`\`css
.features { padding-block: var(--space-fluid-xl); }

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(300px, 100%), 1fr));
  gap: 20px;
  margin-top: var(--space-fluid-lg);
}

.feature-card {
  padding: 28px;
  background: var(--color-bg-default);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-sm);
  transition: box-shadow 0.2s, transform 0.2s;
}

.feature-card:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-3px);
}

.feature-card__icon {
  width: 48px;
  height: 48px;
  border-radius: var(--radius-lg);
  background: var(--color-primary-subtle);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  margin-bottom: 16px;
}

.feature-card__title { font-size: var(--text-lg); font-weight: 700; margin-bottom: 8px; }
.feature-card__text  { color: var(--color-text-secondary); line-height: 1.6; }
\`\`\`

**CTA Section**

\`\`\`css
.cta-section {
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%);
  padding-block: var(--space-fluid-2xl);
  text-align: center;
  color: white;
}

.cta-section .btn--white {
  --btn-bg: white;
  --btn-color: var(--color-primary);
  --btn-shadow: 0 4px 16px rgba(0,0,0,0.15);
  box-shadow: var(--btn-shadow);
}

.cta-section .btn--white:hover {
  --btn-shadow: 0 8px 24px rgba(0,0,0,0.2);
  transform: translateY(-2px);
}
\`\`\``
  },
  {
    lessonContains: 'Landing Page',
    titleContains: 'Final Checklist',
    content: `**Animații, performanță și final checklist** — ultimii pași pentru un landing page CSS profesional, optimizat și accesibil.

**Animații de intrare pe pagină**

\`\`\`css
/* Animații pe scroll cu Intersection Observer */
[data-animate] {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

[data-animate].visible {
  opacity: 1;
  transform: translateY(0);
}

/* Animații diferite per tip */
[data-animate="fade"]  { transform: none; }
[data-animate="left"]  { transform: translateX(-40px); }
[data-animate="right"] { transform: translateX(40px); }
[data-animate="scale"] { transform: scale(0.9); }

@media (prefers-reduced-motion: reduce) {
  [data-animate] { transition: none; opacity: 1; transform: none; }
}
\`\`\`

\`\`\`javascript
const observer = new IntersectionObserver(entries => {
  entries.forEach(el => {
    if (el.isIntersecting) {
      el.target.classList.add('visible');
      observer.unobserve(el.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));
\`\`\`

**Staggered animations pentru liste**

\`\`\`css
.features-grid .feature-card {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.features-grid.visible .feature-card {
  opacity: 1;
  transform: translateY(0);
}

.features-grid.visible .feature-card:nth-child(1) { transition-delay: 0.0s; }
.features-grid.visible .feature-card:nth-child(2) { transition-delay: 0.1s; }
.features-grid.visible .feature-card:nth-child(3) { transition-delay: 0.2s; }
\`\`\`

**Optimizări performanță CSS**

\`\`\`css
/* will-change pentru animații frecvente */
.animated-hero { will-change: transform; }

/* Conținere layout pentru componente complexe */
.card { contain: layout style; }
.sidebar { contain: strict; }

/* Reduce reflow — animă doar transform și opacity */
.loading-skeleton {
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  /* Nu animăm width/height — doar background-position */
}

/* Font loading optimization */
@font-face {
  font-family: 'Inter';
  src: url('inter.woff2') format('woff2');
  font-display: swap; /* arată fallback font imediat */
}
\`\`\`

**Final checklist**

\`\`\`
RESPONSIVE:
  ✓ Mobile (320px+)
  ✓ Tablet (768px+)
  ✓ Desktop (1280px+)
  ✓ Imagini cu object-fit: cover
  ✓ Typography fluid cu clamp()

ACCESIBILITATE:
  ✓ Focus visible pe toate elementele interactive
  ✓ Contrast culori >= 4.5:1
  ✓ alt text pe toate imaginile
  ✓ ARIA roles pe componente complexe
  ✓ prefers-reduced-motion respectat

PERFORMANȚĂ:
  ✓ Animații pe transform și opacity
  ✓ font-display: swap
  ✓ will-change pe animații frecvente
  ✓ CSS minim, fără dead code

DARK MODE:
  ✓ prefers-color-scheme implementat
  ✓ Toggle manual funcțional
  ✓ Imagini corectate pentru dark
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
