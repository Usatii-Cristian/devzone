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

await up('4. Customizare', 'tailwind.config', `**tailwind.config.js** este inima customizării Tailwind — fișierul în care extinzi sau înlocuiești tema implicită, adaugi plugin-uri și controlezi ce stiluri sunt generate.

**Structura de bază**

\`\`\`js
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#eff6ff',
          500: '#3b82f6',
          600: '#2563eb',
          900: '#1e3a8a',
        },
      },
      fontFamily: {
        display: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}
\`\`\`

**theme vs theme.extend — diferența cheie**

\`\`\`js
// theme.colors — ÎNLOCUIEȘTE complet paleta default (NU recomandat de obicei)
theme: {
  colors: {
    brand: '#3b82f6',
    // pierzi red, blue, green, gray... toate culorile Tailwind!
  }
}

// theme.extend.colors — ADAUGĂ la paleta existentă (recomandat)
theme: {
  extend: {
    colors: {
      brand: '#3b82f6', // adăugat, păstrezi tot restul
    }
  }
}
\`\`\`

**Content paths — esențial pentru bundle size**

\`\`\`js
// Tailwind scanează aceste fișiere și păstrează DOAR clasele găsite
content: [
  './app/**/*.{js,jsx,ts,tsx}',
  './components/**/*.{js,jsx,ts,tsx}',
  './lib/**/*.{js,ts}', // dacă ai utility files cu className strings
],

// PROBLEMĂ: clasele construite dinamic NU sunt detectate
// GREȘIT — Tailwind nu vede "bg-red-500"
const color = 'red';
const className = \`bg-\${color}-500\`;

// CORECT — claase complete în source
const className = isError ? 'bg-red-500' : 'bg-green-500';

// Sau adaugă la safelist
module.exports = {
  safelist: ['bg-red-500', 'bg-green-500', 'bg-blue-500'],
}
\`\`\`

**darkMode strategy**

\`\`\`js
module.exports = {
  darkMode: 'class', // activează dark: variants prin clasa .dark
  // 'media' = bazat pe prefers-color-scheme
  // 'class' = manual prin adăugarea .dark la <html>
}

// Cu 'class':
// <html class="dark">  → dark:bg-slate-900 se aplică
// Toggle manual cu JS: document.documentElement.classList.toggle('dark')
\`\`\`

**Pluginuri și extensii**

\`\`\`js
plugins: [
  require('@tailwindcss/forms'),       // stiluri default pentru input, select, textarea
  require('@tailwindcss/typography'),  // clase .prose pentru articole/markdown
  require('@tailwindcss/aspect-ratio'),
  require('@tailwindcss/container-queries'),

  // Plugin custom inline
  function({ addUtilities, theme }) {
    addUtilities({
      '.text-shadow': {
        textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
      },
      '.text-shadow-lg': {
        textShadow: '4px 4px 8px rgba(0,0,0,0.5)',
      },
    });
  },
],
\`\`\`

• **content** trebuie să acopere TOATE locațiile unde ai className-uri — altfel CSS-ul lipsește
• **theme.extend** păstrează default-urile Tailwind — folosește acest pattern aproape întotdeauna
• **darkMode: 'class'** pentru control manual; **'media'** pentru detecție automată OS`);

await up('5. Setup', 'Instalare în Next.js', `**Instalarea Tailwind în Next.js** este procesul de configurare care integrează Tailwind CSS în proiectele Next.js (App Router sau Pages Router) cu un setup optim pentru producție.

**Setup pentru proiect nou (Tailwind v4 + Next.js 15+)**

\`\`\`bash
# 1. Creează proiect Next.js cu Tailwind preinstalat
npx create-next-app@latest my-app --tailwind --app --typescript

# Sau adaugă manual în proiect existent:
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
\`\`\`

**Configurare în proiect existent (App Router)**

\`\`\`js
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}', // dacă păstrezi și Pages Router
  ],
  theme: { extend: {} },
  plugins: [],
}
\`\`\`

\`\`\`js
// postcss.config.js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
\`\`\`

\`\`\`css
/* app/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Stiluri globale opționale */
@layer base {
  body {
    @apply bg-white text-slate-900 dark:bg-slate-900 dark:text-white;
  }
}
\`\`\`

\`\`\`jsx
// app/layout.js — import globals.css o singură dată
import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="ro">
      <body>{children}</body>
    </html>
  );
}
\`\`\`

**Testare configurare**

\`\`\`jsx
// app/page.js
export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600">
      <h1 className="text-4xl font-bold text-white">Tailwind funcționează!</h1>
    </div>
  );
}

// npm run dev → http://localhost:3000
\`\`\`

**Configurări utile pentru Next.js**

\`\`\`js
// tailwind.config.js — pentru optimizare și DX
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#eff6ff',
          500: '#3b82f6',
          900: '#1e3a8a',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
}
\`\`\`

**Setup Tailwind v4 (CSS-first config)**

\`\`\`bash
# Tailwind v4 — sintaxă nouă, config în CSS
npm install -D tailwindcss@next @tailwindcss/postcss@next
\`\`\`

\`\`\`css
/* app/globals.css — config direct în CSS (Tailwind v4) */
@import "tailwindcss";

@theme {
  --color-brand-500: oklch(0.6 0.2 250);
  --font-family-display: "Inter", sans-serif;
  --spacing-128: 32rem;
}
\`\`\`

• **content paths** trebuie să includă **app**, **components** și orice alt director cu className-uri
• **globals.css** se importă o singură dată în **layout.js root** — nu în componente individuale
• Pentru fonturi: folosește **next/font** + variabile CSS în **tailwind.config.js**`);

await up('6. Colors', 'Paleta de culori', `**Paleta de culori Tailwind** oferă peste 220 de culori predefinite organizate semantic — 22 nuanțe principale × 11 scale de intensitate (50-950) — totul accesibil prin clase utility.

**Structura paletei**

\`\`\`html
<!-- Scala unei culori: de la deschis (50) la închis (950) -->
<div class="bg-blue-50">  Foarte deschis </div>
<div class="bg-blue-100"> Deschis        </div>
<div class="bg-blue-200"> Deschis-mediu  </div>
<div class="bg-blue-300"> </div>
<div class="bg-blue-400"> </div>
<div class="bg-blue-500"> Bază/Standard  </div>
<div class="bg-blue-600"> </div>
<div class="bg-blue-700"> </div>
<div class="bg-blue-800"> </div>
<div class="bg-blue-900"> Foarte închis  </div>
<div class="bg-blue-950"> Aproape negru  </div>
\`\`\`

**Culorile principale**

\`\`\`
NEUTRALE: slate, gray, zinc, neutral, stone
ROȘII:    red, orange, amber, yellow
VERZI:    lime, green, emerald, teal
ALBASTRE: cyan, sky, blue, indigo
VIOLET:   violet, purple, fuchsia, pink, rose
\`\`\`

**Aplicare culorilor pe proprietăți**

\`\`\`html
<!-- Background -->
<div class="bg-emerald-500">Background</div>

<!-- Text -->
<p class="text-slate-700 dark:text-slate-300">Text adaptat la dark mode</p>

<!-- Border -->
<div class="border-2 border-red-500">Border roșu</div>

<!-- Divide (between flex children) -->
<div class="flex divide-x divide-gray-200">
  <div>Item 1</div><div>Item 2</div><div>Item 3</div>
</div>

<!-- Ring (outline pentru focus) -->
<button class="focus:ring-4 focus:ring-blue-500/50">Click</button>

<!-- Outline -->
<input class="outline-2 outline-purple-500">

<!-- Shadow color (Tailwind 3+) -->
<div class="shadow-lg shadow-cyan-500/50">Shadow colorat</div>
\`\`\`

**Opacity și transparență**

\`\`\`html
<!-- Cu modifier de opacitate (Tailwind 3+) -->
<div class="bg-blue-500/50">50% opacity</div>
<div class="bg-red-500/25">25% opacity</div>
<div class="text-slate-900/80 dark:text-white/90">Text semi-transparent</div>

<!-- Valori arbitrare -->
<div class="bg-blue-500/[0.65]">65% opacity exact</div>
<div class="bg-[#5500ff]">Culoare HEX arbitrară</div>
<div class="bg-[rgb(15,23,42)]">RGB arbitrar</div>
<div class="bg-[oklch(0.7_0.15_250)]">OKLCH (Tailwind v4)</div>
\`\`\`

**Hover și state variants**

\`\`\`html
<button class="bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700
               focus:ring-2 focus:ring-indigo-400 text-white">
  Button cu states
</button>

<a href="#" class="text-blue-600 hover:text-blue-800 visited:text-purple-600">
  Link
</a>

<input class="border-slate-300 focus:border-blue-500 invalid:border-red-500">
\`\`\`

**Best practices**

\`\`\`html
<!-- Folosește 50/100/200 pentru background-uri subtile -->
<div class="bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded">
  Avertizare ușoară
</div>

<!-- 500/600 pentru elemente proeminente -->
<button class="bg-emerald-600 text-white px-6 py-3 rounded-lg">
  Salvează
</button>

<!-- 900/950 pentru text pe fundal deschis -->
<h1 class="text-slate-900 dark:text-white text-4xl font-bold">Titlu</h1>

<!-- Combinații dark mode -->
<div class="bg-white dark:bg-slate-800
            text-slate-900 dark:text-white
            border border-slate-200 dark:border-slate-700">
  Card adaptat la dark mode
</div>
\`\`\`

• **500** este nuanța "standard" — punct de plecare pentru un design system
• **50/100** pentru badge-uri și alerte cu impact vizual mic
• **800/900** pentru text/elemente accent pe fundal deschis
• **/[opacity]** modifier funcționează pe orice culoare: \`text-red-500/75\`, \`border-blue-600/30\``);

await up('6. Colors', 'Custom colors', `**Custom colors în Tailwind** îți permit să-ți construiești un design system propriu — extinzi paleta default cu culorile brandului tău pentru consistență vizuală.

**Adăugare culori în tailwind.config.js**

\`\`\`js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        // O singură nuanță
        accent: '#ff6b00',

        // Scala completă (recomandat pentru flexibilitate)
        brand: {
          50:  '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',  // baza
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
          950: '#082f49',
        },

        // Semantic colors
        success: '#10b981',
        danger: '#ef4444',
        warning: '#f59e0b',
        info: '#3b82f6',

        // Nested categories
        ui: {
          primary: '#6366f1',
          secondary: '#8b5cf6',
          background: '#fafafa',
          card: '#ffffff',
        },
      },
    },
  },
}
\`\`\`

**Utilizare după configurare**

\`\`\`html
<!-- Generate automat: bg-brand-{50,100,...,950}, text-brand-*, border-brand-*, etc. -->
<button class="bg-brand-500 hover:bg-brand-600 text-white px-4 py-2 rounded-lg">
  Buton brand
</button>

<div class="bg-brand-50 border border-brand-200 text-brand-800">
  Alert brand
</div>

<p class="text-success">Operație reușită!</p>
<p class="text-danger">Eroare critică</p>

<div class="bg-ui-card border border-ui-primary/20">
  Card cu border subtle
</div>
\`\`\`

**CSS Variables pentru theming dinamic**

\`\`\`css
/* app/globals.css */
:root {
  --color-primary: 99 102 241;       /* RGB values, FĂRĂ rgb() */
  --color-primary-fg: 255 255 255;
  --color-background: 255 255 255;
  --color-foreground: 15 23 42;
}

.dark {
  --color-primary: 129 140 248;
  --color-primary-fg: 30 27 75;
  --color-background: 15 23 42;
  --color-foreground: 248 250 252;
}
\`\`\`

\`\`\`js
// tailwind.config.js — referire la CSS variables
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: 'rgb(var(--color-primary) / <alpha-value>)',
        'primary-fg': 'rgb(var(--color-primary-fg) / <alpha-value>)',
        background: 'rgb(var(--color-background) / <alpha-value>)',
        foreground: 'rgb(var(--color-foreground) / <alpha-value>)',
      },
    },
  },
}
\`\`\`

\`\`\`html
<!-- Acum culorile se schimbă AUTOMAT la trecerea în dark mode -->
<button class="bg-primary text-primary-fg hover:bg-primary/90">
  Buton temă-aware
</button>

<div class="bg-background text-foreground">
  Background și text se schimbă automat
</div>
\`\`\`

**Tailwind v4 cu @theme**

\`\`\`css
/* app/globals.css — Tailwind v4 syntax */
@import "tailwindcss";

@theme {
  --color-brand-50:  oklch(0.97 0.02 240);
  --color-brand-500: oklch(0.6  0.18 240);
  --color-brand-900: oklch(0.3  0.12 240);

  --color-primary:    var(--color-brand-500);
  --color-background: white;
  --color-foreground: oklch(0.2 0 0);
}

@layer base {
  .dark {
    --color-background: oklch(0.15 0 0);
    --color-foreground: white;
  }
}
\`\`\`

**Best practices pentru design system**

\`\`\`js
// Categorii semantice + scala completă
colors: {
  // Primary — pentru CTA și accente brand
  primary: { 50: '#...', 500: '#...', 900: '#...' },

  // Surface — pentru background-uri și carduri
  surface: { 0: '#fff', 50: '#fafafa', 100: '#f4f4f5' },

  // Text — pentru ierarhie tipografică
  text: { primary: '#0f172a', secondary: '#64748b', muted: '#94a3b8' },

  // States — semantic
  success: { ... }, warning: { ... }, danger: { ... }, info: { ... },
}
\`\`\`

• **Scala completă** (50-950) e mai flexibilă decât o singură nuanță — permite hover, active, disabled
• **CSS variables** sunt cheia pentru theme switching dinamic — același className, valori diferite
• **Numește semantic** (primary, danger) nu cromatic (blue, red) — facilitează re-branding`);

await up('7. Typography', 'Alignment, decoration', `**Text alignment, decoration și transform** în Tailwind controlează aspectul textului — aliniere, sublinieri, transformări de case, line-height și letter-spacing.

**Alignment — alinierea textului**

\`\`\`html
<p class="text-left">Aliniat stânga (default LTR)</p>
<p class="text-center">Aliniat centru</p>
<p class="text-right">Aliniat dreapta</p>
<p class="text-justify">Justified — întinde textul pe toată lățimea</p>
<p class="text-start">Start — left în LTR, right în RTL</p>
<p class="text-end">End — right în LTR, left în RTL</p>

<!-- Responsive alignment -->
<h1 class="text-center md:text-left">
  Centrat pe mobile, stânga pe desktop
</h1>
\`\`\`

**Decoration — sublinieri, line-through**

\`\`\`html
<!-- Tipul decorației -->
<p class="underline">Subliniat</p>
<p class="overline">Linie deasupra</p>
<p class="line-through">Tăiat</p>
<p class="no-underline">Fără decorație (override default link)</p>

<!-- Culoare decorație (Tailwind 3+) -->
<a class="underline decoration-blue-500">Link cu subliniere albastră</a>
<p class="line-through decoration-red-500 decoration-2">Tăiat roșu, gros</p>

<!-- Stil decorație -->
<p class="underline decoration-solid">Solid (default)</p>
<p class="underline decoration-double">Dublă</p>
<p class="underline decoration-dotted">Punctată</p>
<p class="underline decoration-dashed">Întreruptă</p>
<p class="underline decoration-wavy">Ondulată (squiggly)</p>

<!-- Grosime și offset -->
<p class="underline decoration-1">Subțire</p>
<p class="underline decoration-4">Groasă</p>
<p class="underline underline-offset-4">Offset 4px față de text</p>
<p class="underline underline-offset-8">Offset mai mare</p>
\`\`\`

**Text transform**

\`\`\`html
<p class="uppercase">TEXT MAJUSCULE</p>
<p class="lowercase">text minuscule</p>
<p class="capitalize">Capitalizat Primul Caracter</p>
<p class="normal-case">Normal — anulează transform-urile moștenite</p>

<!-- Combinări utile -->
<h6 class="text-xs uppercase tracking-widest text-slate-500 font-bold">
  ETICHETĂ SECȚIUNE
</h6>
\`\`\`

**Font weight și style**

\`\`\`html
<p class="font-thin">Thin (100)</p>
<p class="font-extralight">Extra Light (200)</p>
<p class="font-light">Light (300)</p>
<p class="font-normal">Normal (400)</p>
<p class="font-medium">Medium (500)</p>
<p class="font-semibold">Semi Bold (600)</p>
<p class="font-bold">Bold (700)</p>
<p class="font-extrabold">Extra Bold (800)</p>
<p class="font-black">Black (900)</p>

<p class="italic">Italic</p>
<p class="not-italic">Nu italic (reset)</p>
\`\`\`

**Line-height și letter-spacing**

\`\`\`html
<!-- Line-height (leading) -->
<p class="leading-none">Line-height: 1 (foarte strâns)</p>
<p class="leading-tight">Tight (1.25)</p>
<p class="leading-normal">Normal (1.5)</p>
<p class="leading-relaxed">Relaxed (1.625)</p>
<p class="leading-loose">Loose (2)</p>
<p class="leading-[28px]">Valoare arbitrară</p>

<!-- Letter-spacing (tracking) -->
<p class="tracking-tighter">Letter-spacing -0.05em</p>
<p class="tracking-tight">-0.025em</p>
<p class="tracking-normal">0 (default)</p>
<p class="tracking-wide">0.025em</p>
<p class="tracking-wider">0.05em</p>
<p class="tracking-widest">0.1em — uppercase chic</p>

<!-- Combinați pentru micro-typography rafinată -->
<h6 class="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">
  Eticheta
</h6>
<h2 class="text-3xl font-black tracking-tight leading-tight text-slate-900">
  Titlu Compact
</h2>
\`\`\`

**Truncation și overflow**

\`\`\`html
<!-- Truncate la o linie cu ... -->
<p class="truncate w-64">
  Text foarte lung care va fi tăiat cu ellipsis la sfârșit cu Tailwind
</p>

<!-- Line clamp — limitează la N linii -->
<p class="line-clamp-2">
  Text lung de care va fi truncat după 2 linii cu trei puncte ...
  Restul textului nu va fi vizibil chiar dacă există în DOM.
</p>
<p class="line-clamp-3">Truncat după 3 linii...</p>

<!-- Whitespace control -->
<p class="whitespace-nowrap">Nu se rupe pe spații</p>
<p class="whitespace-pre">Păstrează spațiile și newline-urile</p>
<p class="break-words">Rupe cuvinte foarte lungi</p>
<p class="break-all">Rupe oriunde dacă necesar</p>
\`\`\`

• **uppercase + tracking-widest** = micro-tipografie elegantă pentru badge-uri și etichete
• **decoration-wavy decoration-red-500** = spell-check style pentru text greșit
• **line-clamp-N** pentru previzualizări de articole/descriere produs — fără JavaScript`);

await up('8. Borders', 'Borders', `**Borders, shadows și effects** în Tailwind îți permit să adaugi profunzime vizuală — chenarele, umbrele și filtrele transformă elementele plate în UI cu adâncime.

**Border width**

\`\`\`html
<div class="border">Border default 1px</div>
<div class="border-0">Fără border</div>
<div class="border-2">2px</div>
<div class="border-4">4px</div>
<div class="border-8">8px</div>

<!-- Per laterală -->
<div class="border-t">Border top</div>
<div class="border-r-4">Border right 4px</div>
<div class="border-b-2 border-t-2">Border top și bottom</div>
<div class="border-l-4 border-l-blue-500">Doar stânga, colorat</div>

<!-- X și Y (orizontale și verticale) -->
<div class="border-x-2">Stânga și dreapta</div>
<div class="border-y border-y-slate-200">Sus și jos</div>
\`\`\`

**Border color și style**

\`\`\`html
<!-- Culori (vezi paleta) -->
<div class="border-2 border-blue-500">Border albastru</div>
<div class="border-2 border-red-500/50">50% opacity</div>
<div class="border border-slate-200 dark:border-slate-700">Dark mode aware</div>

<!-- Border per laterală cu culori diferite -->
<div class="border-t-4 border-t-emerald-500
            border-b-4 border-b-rose-500
            border-x border-x-slate-300">
  Borders multi-color
</div>

<!-- Style -->
<div class="border-2 border-solid border-blue-500">Solid (default)</div>
<div class="border-2 border-dashed border-purple-500">Dashed</div>
<div class="border-2 border-dotted border-orange-500">Dotted</div>
<div class="border-2 border-double border-teal-500">Double (cel puțin 3px)</div>
<div class="border-none">Fără border (override)</div>
\`\`\`

**Border radius**

\`\`\`html
<div class="rounded">4px (default)</div>
<div class="rounded-none">0</div>
<div class="rounded-sm">2px</div>
<div class="rounded-md">6px</div>
<div class="rounded-lg">8px</div>
<div class="rounded-xl">12px</div>
<div class="rounded-2xl">16px</div>
<div class="rounded-3xl">24px</div>
<div class="rounded-full">9999px (circular dacă e pătrat)</div>

<!-- Per corner -->
<div class="rounded-t-lg">Sus rotunjit</div>
<div class="rounded-tl-xl">Doar colțul stânga-sus</div>
<div class="rounded-br-2xl rounded-tl-2xl">Diagonal opus</div>

<!-- Avatar circular -->
<img src="..." class="w-12 h-12 rounded-full object-cover">

<!-- Card cu colțuri rotunjite doar sus -->
<div class="rounded-t-2xl bg-white shadow-lg">
  <img class="rounded-t-2xl" src="...">
  <div class="p-4">Conținut</div>
</div>
\`\`\`

**Shadows**

\`\`\`html
<!-- Box shadow scale -->
<div class="shadow-sm">Shadow mică</div>
<div class="shadow">Default</div>
<div class="shadow-md">Medie</div>
<div class="shadow-lg">Mare</div>
<div class="shadow-xl">Extra large</div>
<div class="shadow-2xl">2x extra large</div>
<div class="shadow-inner">Inner shadow (inset)</div>
<div class="shadow-none">Fără shadow</div>

<!-- Shadow colorat (Tailwind 3+) -->
<div class="shadow-lg shadow-blue-500/50">Shadow albastru</div>
<div class="shadow-xl shadow-purple-500/30">Shadow violet subtil</div>

<!-- Combinații shadow + hover -->
<div class="shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer">
  Card cu shadow ce crește la hover
</div>
\`\`\`

**Ring (alternative la box-shadow pentru focus)**

\`\`\`html
<!-- Ring = outline-like effect, util pentru focus states -->
<button class="ring-2 ring-blue-500">Ring 2px</button>
<button class="focus:ring-4 focus:ring-blue-500/50 focus:outline-none">
  Click-mă (focus ring)
</button>

<!-- Ring offset -->
<button class="ring-2 ring-blue-500 ring-offset-2 ring-offset-white">
  Cu spațiu între ring și element
</button>
\`\`\`

**Outline (Tailwind 3+)**

\`\`\`html
<button class="outline-2 outline-purple-500 outline-offset-2">
  Outline custom
</button>

<input class="focus:outline-2 focus:outline-blue-500 focus:outline-offset-1">
\`\`\`

**Combinații pentru UI rafinat**

\`\`\`html
<!-- Card modern cu shadow și border subtle -->
<div class="bg-white rounded-2xl shadow-sm border border-slate-200/50
            hover:shadow-md hover:border-slate-300 transition-all duration-200 p-6">
  <h3 class="text-lg font-bold">Card cu hover effect</h3>
  <p class="text-slate-600">Shadow și border cresc la hover</p>
</div>

<!-- Buton cu shadow gradient -->
<button class="bg-gradient-to-r from-indigo-500 to-purple-600 text-white
               px-6 py-3 rounded-xl font-bold shadow-lg shadow-indigo-500/50
               hover:shadow-xl hover:shadow-indigo-500/60 hover:-translate-y-0.5
               transition-all">
  Buton CTA premium
</button>
\`\`\`

• **shadow-{size}** pentru elevation; **shadow-{color}/{opacity}** pentru shadows colorate
• **ring-{size}** este preferată pentru focus states — accesibilă, nu deplasează layout-ul
• **rounded-2xl** sau **rounded-3xl** pentru aspect modern și prietenos`);

  console.log('Done Tailwind script 1.');
  await p.$disconnect();
}

run().catch(e => { console.error(e); p.$disconnect(); process.exit(1); });
