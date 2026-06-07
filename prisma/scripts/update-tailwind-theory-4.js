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

await up('19. Mini proiect', 'Card produs', `**Card produs** este componenta-cheie pentru orice magazin online — combinație de imagine, info produs, preț, acțiuni — cu hover effects, badge-uri și design responsive.

**Card simplu cu Tailwind**

\`\`\`html
<article class="bg-white rounded-2xl shadow-md overflow-hidden
                hover:shadow-xl transition-shadow duration-300
                max-w-sm">
  <!-- Imagine produs cu aspect ratio garantat -->
  <div class="relative aspect-square overflow-hidden bg-slate-100">
    <img src="/products/laptop.jpg"
         alt="Laptop"
         class="w-full h-full object-cover hover:scale-105 transition-transform duration-500">

    <!-- Badge SALE -->
    <span class="absolute top-3 left-3 bg-red-500 text-white text-xs font-black
                 px-2 py-1 rounded-full">-20%</span>
  </div>

  <!-- Info -->
  <div class="p-4">
    <div class="flex items-center gap-1 mb-1">
      <span class="text-amber-400">★★★★★</span>
      <span class="text-xs text-slate-500">(124)</span>
    </div>

    <h3 class="font-bold text-slate-900 mb-1 line-clamp-2">
      Laptop ASUS ZenBook 14" UX425
    </h3>
    <p class="text-sm text-slate-500 mb-3">Intel Core i7, 16GB RAM, 512GB SSD</p>

    <div class="flex items-end justify-between">
      <div>
        <span class="text-2xl font-black text-slate-900">4 799</span>
        <span class="text-sm text-slate-500"> RON</span>
        <span class="block text-sm text-slate-400 line-through">5 999 RON</span>
      </div>
      <button class="px-4 py-2 bg-indigo-600 text-white rounded-lg
                     font-bold text-sm hover:bg-indigo-700 active:scale-95
                     transition-all">
        Adaugă
      </button>
    </div>
  </div>
</article>
\`\`\`

**Card premium cu image-zoom și hover overlay**

\`\`\`html
<article class="group bg-white rounded-2xl shadow-sm hover:shadow-2xl
                transition-all duration-300 overflow-hidden cursor-pointer">
  <!-- Image cu overlay la hover -->
  <div class="relative aspect-[4/5] overflow-hidden bg-slate-100">
    <img src="..." class="w-full h-full object-cover
                          group-hover:scale-110 transition-transform duration-700">

    <!-- Overlay quick actions -->
    <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent
                opacity-0 group-hover:opacity-100 transition-opacity
                flex items-end justify-center p-4">
      <div class="flex gap-2 translate-y-4 group-hover:translate-y-0 transition-transform">
        <button class="p-2 bg-white rounded-full shadow-lg hover:bg-slate-50" aria-label="Wishlist">❤️</button>
        <button class="p-2 bg-white rounded-full shadow-lg hover:bg-slate-50" aria-label="Compare">⚖️</button>
        <button class="px-4 py-2 bg-white rounded-full font-bold text-sm">Vezi detalii</button>
      </div>
    </div>

    <!-- Badge nou -->
    <span class="absolute top-3 right-3 bg-emerald-500 text-white text-xs font-black
                 px-3 py-1 rounded-full">NEW</span>
  </div>

  <!-- Info -->
  <div class="p-5">
    <p class="text-xs uppercase tracking-widest text-slate-500 font-bold mb-1">
      Categorie
    </p>
    <h3 class="text-lg font-black text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">
      Numele Produsului
    </h3>
    <div class="flex items-center justify-between">
      <span class="text-2xl font-black text-slate-900">199 <span class="text-sm">RON</span></span>
      <span class="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full">
        În stoc
      </span>
    </div>
  </div>
</article>
\`\`\`

**Variantă compactă (horizontal layout)**

\`\`\`html
<article class="flex gap-4 bg-white rounded-xl shadow p-3 hover:shadow-md transition-shadow">
  <img src="..." class="w-24 h-24 rounded-lg object-cover shrink-0">

  <div class="flex-1 min-w-0">
    <h3 class="font-bold text-slate-900 truncate">Nume produs lung care va fi tăiat</h3>
    <p class="text-sm text-slate-500 mb-2 line-clamp-1">Descriere scurtă</p>
    <div class="flex items-center justify-between">
      <span class="font-black text-indigo-600">99 RON</span>
      <button class="text-sm font-bold text-indigo-600 hover:underline">
        Adaugă →
      </button>
    </div>
  </div>
</article>
\`\`\`

**Skeleton loading pentru card produs**

\`\`\`html
<article class="bg-white rounded-2xl shadow overflow-hidden animate-pulse">
  <div class="aspect-square bg-slate-200"></div>
  <div class="p-4 space-y-2">
    <div class="h-4 bg-slate-200 rounded w-3/4"></div>
    <div class="h-3 bg-slate-200 rounded w-1/2"></div>
    <div class="h-8 bg-slate-200 rounded w-24 mt-3"></div>
  </div>
</article>
\`\`\`

• **group + scale + opacity** = hover overlay premium fără JavaScript
• **aspect-{ratio}** păstrează raportul indiferent de dimensiunea imaginii
• **line-clamp-N + truncate** pentru text variabil — UI consistent indiferent de conținut`);

await up('19. Mini proiect', 'Navbar responsiv', `**Navbar responsiv** este componenta esențială a oricărui site — meniu desktop + mobile drawer cu hamburger, complet cu Tailwind și fără biblioteci externe.

**Structura completă**

\`\`\`jsx
'use client';
import { useState } from 'react';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md
                       border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <a href="/" className="flex items-center gap-2 shrink-0">
            <img src="/logo.png" className="w-8 h-8 rounded-lg"/>
            <span className="font-black text-xl text-slate-900">DevZone</span>
          </a>

          {/* Desktop nav — ascuns pe mobile */}
          <nav className="hidden md:flex items-center gap-1">
            <a href="/courses" className="px-3 py-2 text-sm font-medium text-slate-700
                                          hover:text-indigo-600 hover:bg-slate-50 rounded-lg">
              Cursuri
            </a>
            <a href="/pricing" className="px-3 py-2 text-sm font-medium text-slate-700
                                          hover:text-indigo-600 hover:bg-slate-50 rounded-lg">
              Prețuri
            </a>
            <a href="/blog" className="px-3 py-2 text-sm font-medium text-slate-700
                                       hover:text-indigo-600 hover:bg-slate-50 rounded-lg">
              Blog
            </a>
          </nav>

          {/* CTA — desktop */}
          <div className="hidden md:flex items-center gap-2">
            <a href="/login" className="px-4 py-2 text-sm font-bold text-slate-700
                                        hover:text-indigo-600">
              Login
            </a>
            <a href="/signup" className="px-4 py-2 text-sm font-bold text-white
                                         bg-gradient-to-r from-indigo-500 to-purple-600
                                         rounded-lg hover:opacity-90">
              Sign up
            </a>
          </div>

          {/* Hamburger — vizibil DOAR pe mobile */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 -mr-2 rounded-lg hover:bg-slate-100"
            aria-label="Meniu">
            {open ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile drawer */}
        {open && (
          <div className="md:hidden border-t border-slate-200 py-3 space-y-1">
            <a href="/courses" className="block px-3 py-2 rounded-lg
                                          hover:bg-slate-50 font-medium">
              Cursuri
            </a>
            <a href="/pricing" className="block px-3 py-2 rounded-lg
                                          hover:bg-slate-50 font-medium">
              Prețuri
            </a>
            <a href="/blog" className="block px-3 py-2 rounded-lg
                                       hover:bg-slate-50 font-medium">
              Blog
            </a>
            <div className="border-t border-slate-200 pt-3 mt-3 space-y-2">
              <a href="/login" className="block px-3 py-2 rounded-lg
                                          hover:bg-slate-50 font-bold">
                Login
              </a>
              <a href="/signup" className="block px-3 py-2 rounded-lg text-white
                                           bg-gradient-to-r from-indigo-500 to-purple-600
                                           text-center font-bold">
                Sign up
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
\`\`\`

**Sticky cu blur și transparency**

\`\`\`html
<!-- Sticky + backdrop-blur — efect "glassmorphism" -->
<header class="sticky top-0 z-50
               bg-white/80 dark:bg-slate-900/80
               backdrop-blur-md
               border-b border-slate-200/50 dark:border-slate-700/50">
  ...
</header>
\`\`\`

**Dropdown menu submenu**

\`\`\`html
<div class="relative group">
  <button class="px-3 py-2 text-sm font-medium hover:text-indigo-600">
    Cursuri ▾
  </button>

  <!-- Submenu — apare la group-hover -->
  <div class="absolute top-full left-0 mt-1 w-56 bg-white rounded-xl shadow-xl
              border border-slate-100
              opacity-0 invisible
              group-hover:opacity-100 group-hover:visible
              transition-all duration-200">
    <a class="block px-4 py-3 hover:bg-slate-50 first:rounded-t-xl">
      JavaScript
    </a>
    <a class="block px-4 py-3 hover:bg-slate-50">React</a>
    <a class="block px-4 py-3 hover:bg-slate-50 last:rounded-b-xl">
      Node.js
    </a>
  </div>
</div>
\`\`\`

**Mobile drawer fullscreen (alternativă)**

\`\`\`jsx
{open && (
  <>
    {/* Backdrop */}
    <div onClick={() => setOpen(false)}
         className="md:hidden fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"/>

    {/* Drawer din dreapta */}
    <div className="md:hidden fixed top-0 right-0 bottom-0 w-80 max-w-[80vw]
                    bg-white z-50 shadow-2xl
                    animate-slide-in-right p-6">
      <button onClick={() => setOpen(false)} className="ml-auto block p-2">✕</button>
      <nav className="space-y-3 mt-6">
        <a className="block py-2 text-lg font-bold">Cursuri</a>
        <a className="block py-2 text-lg font-bold">Prețuri</a>
      </nav>
    </div>
  </>
)}
\`\`\`

• **hidden md:flex** + **md:hidden** = pattern standard pentru responsive nav
• **sticky top-0 z-50 backdrop-blur-md** = navbar premium care rămâne vizibil la scroll
• **State open în useState + onClick toggle** = drawer mobile fără biblioteci`);

await up('20. Customizare', 'Customizare cu @theme', `**Customizare cu @theme (Tailwind v4)** introduce CSS-first config — definești tot design system-ul direct în CSS, fără tailwind.config.js, folosind directive moderne.

**Tailwind v4 — @theme syntax**

\`\`\`css
/* app/globals.css — Tailwind v4 */
@import "tailwindcss";

@theme {
  /* Culori personalizate — automat disponibile ca utilities */
  --color-brand-50:  oklch(0.97 0.02 240);
  --color-brand-500: oklch(0.6  0.18 240);
  --color-brand-900: oklch(0.3  0.12 240);

  /* Font families */
  --font-display: "Inter", system-ui, sans-serif;
  --font-mono: "JetBrains Mono", monospace;

  /* Spacing scale extension */
  --spacing-128: 32rem;
  --spacing-144: 36rem;

  /* Custom breakpoints */
  --breakpoint-xs: 480px;
  --breakpoint-3xl: 1920px;

  /* Border radius */
  --radius-4xl: 2rem;

  /* Animation timing */
  --duration-1500: 1.5s;
  --duration-2000: 2s;
}
\`\`\`

**Utilizare automată**

\`\`\`html
<!-- Tailwind generează automat utilities din @theme -->
<div class="bg-brand-500 text-white">Background brand</div>
<div class="border-brand-200 text-brand-900">Border și text</div>
<p class="font-display text-3xl font-bold">Heading</p>
<code class="font-mono">code</code>

<!-- Spacing custom -->
<div class="w-128 h-144">Custom dimensions</div>

<!-- Border radius custom -->
<div class="rounded-4xl">Rotunjire extra mare</div>

<!-- Breakpoints custom -->
<div class="xs:flex 3xl:grid 3xl:grid-cols-6">Responsive cu xs și 3xl</div>
\`\`\`

**Variabile CSS pentru theming dinamic**

\`\`\`css
/* Definire culori semantice cu CSS vars */
:root {
  --color-primary: 99 102 241;
  --color-primary-hover: 79 70 229;
  --color-background: 255 255 255;
  --color-foreground: 15 23 42;
  --color-muted: 100 116 139;
  --color-border: 226 232 240;
}

.dark {
  --color-primary: 129 140 248;
  --color-primary-hover: 165 180 252;
  --color-background: 15 23 42;
  --color-foreground: 248 250 252;
  --color-muted: 148 163 184;
  --color-border: 51 65 85;
}

@theme {
  --color-primary:        rgb(var(--color-primary) / <alpha-value>);
  --color-primary-hover:  rgb(var(--color-primary-hover) / <alpha-value>);
  --color-background:     rgb(var(--color-background) / <alpha-value>);
  --color-foreground:     rgb(var(--color-foreground) / <alpha-value>);
  --color-muted:          rgb(var(--color-muted) / <alpha-value>);
  --color-border:         rgb(var(--color-border) / <alpha-value>);
}
\`\`\`

\`\`\`html
<!-- Culorile se schimbă AUTOMAT între light și dark -->
<body class="bg-background text-foreground">
  <header class="border-b border-border">
    <nav class="text-muted hover:text-foreground">
      Nav care se adaptează la temă
    </nav>
  </header>

  <button class="bg-primary hover:bg-primary-hover text-white">
    CTA temă-aware
  </button>
</body>
\`\`\`

**Multiple teme cu CSS vars**

\`\`\`css
/* Tema "ocean" */
[data-theme="ocean"] {
  --color-primary: 14 165 233;     /* cyan */
  --color-accent: 6 182 212;        /* teal */
}

/* Tema "sunset" */
[data-theme="sunset"] {
  --color-primary: 249 115 22;      /* orange */
  --color-accent: 234 88 12;        /* deep orange */
}

/* Tema "forest" */
[data-theme="forest"] {
  --color-primary: 22 163 74;       /* green */
  --color-accent: 21 128 61;        /* deep green */
}
\`\`\`

\`\`\`html
<!-- Schimbă tema cu un atribut HTML -->
<html data-theme="ocean">
  <body class="bg-primary">
    Background se schimbă în funcție de data-theme
  </body>
</html>

<!-- Toggle JS -->
<script>
function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
}
</script>
\`\`\`

**Migration v3 → v4 (config în CSS)**

\`\`\`js
// VECHI: tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: { brand: '#3b82f6' },
      fontFamily: { display: ['Inter', 'sans-serif'] },
    },
  },
}
\`\`\`

\`\`\`css
/* NOU: app/globals.css */
@import "tailwindcss";

@theme {
  --color-brand: #3b82f6;
  --font-display: "Inter", sans-serif;
}
\`\`\`

• **@theme** = CSS-first config în Tailwind v4 — fără JavaScript pentru design tokens
• **CSS variables** sunt cheia pentru theming dinamic — un singur className, valori diferite
• **Compatibilitate**: Tailwind v3 folosește tailwind.config.js; v4 folosește @theme în CSS`);

await up('20. Customizare', 'CSS variables', `**CSS variables + dark mode** este combinația modernă pentru theming dinamic — un singur set de utility classes care se schimbă automat în funcție de temă.

**Pattern de bază**

\`\`\`css
/* app/globals.css */
@layer base {
  :root {
    /* Light mode (default) */
    --color-bg: 255 255 255;
    --color-bg-secondary: 248 250 252;
    --color-fg: 15 23 42;
    --color-fg-muted: 100 116 139;
    --color-border: 226 232 240;
    --color-primary: 79 70 229;
    --color-primary-fg: 255 255 255;
  }

  .dark {
    /* Dark mode — override pentru .dark class pe html */
    --color-bg: 15 23 42;
    --color-bg-secondary: 30 41 59;
    --color-fg: 248 250 252;
    --color-fg-muted: 148 163 184;
    --color-border: 51 65 85;
    --color-primary: 129 140 248;
    --color-primary-fg: 30 27 75;
  }
}
\`\`\`

**Configurare în tailwind.config.js (v3)**

\`\`\`js
// tailwind.config.js
module.exports = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Format rgb(var(...) / <alpha-value>) permite și opacity
        bg:           'rgb(var(--color-bg) / <alpha-value>)',
        'bg-secondary': 'rgb(var(--color-bg-secondary) / <alpha-value>)',
        fg:           'rgb(var(--color-fg) / <alpha-value>)',
        'fg-muted':   'rgb(var(--color-fg-muted) / <alpha-value>)',
        border:       'rgb(var(--color-border) / <alpha-value>)',
        primary:      'rgb(var(--color-primary) / <alpha-value>)',
        'primary-fg': 'rgb(var(--color-primary-fg) / <alpha-value>)',
      },
    },
  },
}
\`\`\`

**Utilizare**

\`\`\`html
<!-- Acum acelaș className funcționează în AMBELE teme -->
<body class="bg-bg text-fg">
  <article class="bg-bg-secondary border border-border rounded-2xl p-6">
    <h2 class="text-fg font-black text-2xl mb-2">Titlu</h2>
    <p class="text-fg-muted">Body text adaptat automat</p>

    <button class="bg-primary text-primary-fg
                   hover:bg-primary/90
                   px-6 py-3 rounded-xl font-bold mt-4">
      Acțiune
    </button>
  </article>
</body>
\`\`\`

**Avantaje față de \`dark:\` prefix**

\`\`\`html
<!-- VECHI: cu dark: prefix — verbose, repeat -->
<div class="bg-white dark:bg-slate-900
            text-slate-900 dark:text-white
            border border-slate-200 dark:border-slate-700">
  ...
</div>

<!-- NOU: cu CSS vars — clean, mai puține clase -->
<div class="bg-bg text-fg border border-border">
  ...
</div>
\`\`\`

**Suport pentru opacitate**

\`\`\`html
<!-- Funcționează cu /alpha modifier -->
<div class="bg-primary/20">20% opacity primary</div>
<div class="text-fg/50">50% opacity text</div>
<div class="border-border/30">30% opacity border</div>
\`\`\`

**Combinație cu next-themes (Next.js)**

\`\`\`bash
npm install next-themes
\`\`\`

\`\`\`jsx
// app/layout.js
import { ThemeProvider } from 'next-themes';

export default function RootLayout({ children }) {
  return (
    <html lang="ro" suppressHydrationWarning>
      <body className="bg-bg text-fg min-h-screen transition-colors">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
\`\`\`

**Toggle button**

\`\`\`jsx
'use client';
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="p-2 rounded-lg bg-bg-secondary hover:bg-border
                 text-fg-muted hover:text-fg">
      {theme === 'dark' ? <Sun className="w-5 h-5"/> : <Moon className="w-5 h-5"/>}
    </button>
  );
}
\`\`\`

**Sistemul complet (recomandat)**

\`\`\`css
@layer base {
  :root {
    /* Semantice — semnificație, nu culoare */
    --color-bg: 255 255 255;
    --color-bg-elevated: 248 250 252;
    --color-text: 15 23 42;
    --color-text-muted: 100 116 139;
    --color-border: 226 232 240;
    --color-border-strong: 203 213 225;
    --color-primary: 79 70 229;
    --color-success: 22 163 74;
    --color-warning: 245 158 11;
    --color-danger: 220 38 38;
  }
  .dark {
    --color-bg: 15 23 42;
    --color-bg-elevated: 30 41 59;
    --color-text: 248 250 252;
    --color-text-muted: 148 163 184;
    --color-border: 51 65 85;
    --color-border-strong: 71 85 105;
    --color-primary: 129 140 248;
    --color-success: 34 197 94;
    --color-warning: 251 191 36;
    --color-danger: 239 68 68;
  }
}
\`\`\`

• **CSS variables + Tailwind colors** = cea mai elegantă soluție pentru theming
• **rgb(var(--...) / <alpha-value>)** permite și opacity (\`bg-primary/50\`) — magie
• **Nume semantice** (bg, text, primary) > nume cromatice (white, slate) — facil de schimbat`);

await up('21. Accesibilitate', 'Focus states', `**Focus states și navigare cu tastatura** sunt fundamentul accesibilității web — utilizatorii care navighează cu Tab trebuie să vadă mereu unde sunt în pagină.

**Focus visible vs focus**

\`\`\`html
<!-- focus = orice focus (inclusiv click) -->
<button class="focus:ring-2 focus:ring-indigo-500">
  Ring apare la click ȘI la Tab — uneori intruziv
</button>

<!-- focus-visible = doar focus prin tastatură -->
<button class="focus-visible:ring-2 focus-visible:ring-indigo-500
               focus:outline-none">
  Ring apare DOAR la Tab — UX premium
</button>
\`\`\`

**Pattern recomandat pentru toate elementele interactive**

\`\`\`html
<!-- Butoane -->
<button class="px-4 py-2 bg-indigo-600 text-white rounded-lg
               focus-visible:outline-none
               focus-visible:ring-2
               focus-visible:ring-indigo-500
               focus-visible:ring-offset-2
               focus-visible:ring-offset-white
               dark:focus-visible:ring-offset-slate-900
               transition">
  Buton accesibil
</button>

<!-- Link -->
<a href="#" class="text-indigo-600 hover:text-indigo-700
                   focus-visible:outline-none
                   focus-visible:underline
                   focus-visible:underline-offset-4">
  Link
</a>

<!-- Input -->
<input class="px-4 py-2 border-2 border-slate-200 rounded-lg
              focus:border-indigo-500
              focus:ring-2 focus:ring-indigo-500/20
              focus:outline-none">
\`\`\`

**Skip to content link**

\`\`\`html
<!-- Primul element din body — invisible până la focus -->
<a href="#main"
   class="sr-only focus:not-sr-only
          focus:fixed focus:top-4 focus:left-4
          focus:z-50
          focus:px-4 focus:py-2
          focus:bg-indigo-600 focus:text-white
          focus:rounded-lg focus:font-bold">
  Sari la conținut principal
</a>

<main id="main">
  ...
</main>
\`\`\`

**Tab order corect**

\`\`\`html
<!-- tabindex="0" = poate primi focus (în ordine DOM) -->
<div tabindex="0" class="..." role="button" onclick="...">
  Element custom focusabil
</div>

<!-- tabindex="-1" = exclus din Tab order, dar poate primi focus prin .focus() -->
<div tabindex="-1" id="modal" class="...">
  Modal focusabil programatic
</div>

<!-- EVITAT: tabindex="1" sau mai mare — strică ordinea naturală -->
<!-- ❌ <div tabindex="3">...</div> -->
\`\`\`

**Focus trap în modal**

\`\`\`jsx
// React — focus rămâne în modal când e deschis
import { useEffect, useRef } from 'react';

function Modal({ open, onClose, children }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    const focusable = ref.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    function handleKey(e) {
      if (e.key === 'Escape') onClose();
      if (e.key !== 'Tab') return;
      if (e.shiftKey && document.activeElement === first) {
        last.focus();
        e.preventDefault();
      } else if (!e.shiftKey && document.activeElement === last) {
        first.focus();
        e.preventDefault();
      }
    }
    document.addEventListener('keydown', handleKey);
    first?.focus();
    return () => document.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div role="dialog" aria-modal="true" ref={ref}
         className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white rounded-2xl p-6 max-w-md">
        {children}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
\`\`\`

**aria-labels esențiale**

\`\`\`html
<!-- Buton cu doar icon — necesar aria-label pentru screen readers -->
<button aria-label="Închide modal" class="p-2 rounded-full hover:bg-slate-100">
  ✕
</button>

<!-- Input fără label vizibil -->
<input type="search" aria-label="Caută cursuri" placeholder="🔍 Caută..."
       class="...">

<!-- Toggle expanded state -->
<button aria-expanded="false" aria-controls="menu" class="...">
  Meniu ▾
</button>
\`\`\`

**sr-only — text doar pentru screen readers**

\`\`\`html
<button class="...">
  <svg>...</svg>
  <span class="sr-only">Adaugă în coș</span>
</button>

<!-- Cu Tailwind: -->
<!-- sr-only = vizibil doar pentru screen readers -->
<!-- not-sr-only = revine la visible (combinat cu focus:not-sr-only) -->
\`\`\`

• **focus-visible** > **focus** — afișează ring DOAR la navigare cu tastatura
• **outline-none** + **ring-{N}** = focus indicator clar pe orice fundal
• Skip links + focus traps + aria-labels = baza accesibilității WCAG 2.1`);

await up('21. Accesibilitate', 'Contrast', `**Contrast de culori și legibilitate** sunt critice pentru accesibilitate — text neslizibil este o barieră reală pentru utilizatorii cu deficiențe de vedere și un deal-breaker SEO.

**Cerințele WCAG**

\`\`\`
Text normal (sub 18pt sau 14pt bold):
  AA:  4.5:1 (minim)
  AAA: 7:1 (optim)

Text mare (peste 18pt sau 14pt bold):
  AA:  3:1 (minim)
  AAA: 4.5:1 (optim)

UI components (butoane, icons, borders):
  3:1 față de fundal adiacent
\`\`\`

**Combinații Tailwind cu contrast bun**

\`\`\`html
<!-- ✅ EXCELENT: contrast 7:1+ -->
<p class="text-slate-900 bg-white">slate-900 pe white: 16.7:1 ★</p>
<p class="text-white bg-slate-900">white pe slate-900: 16.7:1 ★</p>
<p class="text-slate-800 bg-white">slate-800 pe white: 13.6:1 ★</p>

<!-- ✅ BUN: contrast 4.5:1+ (AA) -->
<p class="text-slate-700 bg-white">slate-700 pe white: 10.7:1</p>
<p class="text-slate-600 bg-white">slate-600 pe white: 7.5:1</p>

<!-- ⚠ MINIM: 3:1 pentru text mare DOAR -->
<p class="text-slate-500 bg-white">slate-500 pe white: 4.5:1 — borderline</p>

<!-- ❌ EVITAT: contrast prea mic -->
<p class="text-slate-400 bg-white">slate-400 pe white: 3.1:1 — NU AA</p>
<p class="text-slate-300 bg-white">slate-300 pe white: 1.9:1 — ILIZIBIL</p>
<p class="text-yellow-400 bg-white">yellow-400 pe white: 1.5:1 — INACCEPTABIL</p>
\`\`\`

**Reguli practice pentru text**

\`\`\`html
<!-- Body text — slate-700 sau slate-800 (light mode) -->
<p class="text-slate-700 dark:text-slate-300">Body text</p>

<!-- Headings — slate-900 (light) / white (dark) -->
<h1 class="text-slate-900 dark:text-white">Heading</h1>

<!-- Muted/Secondary — slate-500 sau slate-600 -->
<p class="text-slate-500 dark:text-slate-400">Meta info</p>

<!-- Disabled — slate-400 (dar SOLO, nu pe alb pur) -->
<button class="bg-slate-100 text-slate-400 cursor-not-allowed">
  Disabled (contrast suficient pe slate-100)
</button>
\`\`\`

**Pentru butoane CTA**

\`\`\`html
<!-- ✅ Bună combinație -->
<button class="bg-indigo-600 text-white">indigo-600 + white: 5.2:1 ★</button>
<button class="bg-emerald-600 text-white">emerald-600 + white: 4.5:1 ✓</button>
<button class="bg-red-600 text-white">red-600 + white: 4.7:1 ✓</button>

<!-- ⚠ Problematic — yellow/amber + white -->
<button class="bg-yellow-400 text-white">FAIL — folosește text-slate-900</button>
<button class="bg-yellow-400 text-slate-900">yellow-400 + slate-900: 13:1 ★</button>
\`\`\`

**Testarea contrast**

\`\`\`
Tools recomandate:
• Chrome DevTools — Accessibility panel
• WAVE — wave.webaim.org (browser extension)
• Colour Contrast Analyser (CCA) — TPGi
• Stark — Figma plugin

VSCode extensions:
• Tailwind CSS IntelliSense (afișează culorile)
• axe DevTools (audit accessibility)
\`\`\`

**Patterns pentru dark mode**

\`\`\`html
<!-- ⚠ NU folosi pure white pe black — prea brutal -->
<div class="bg-black text-white">    Prea high contrast pentru ochi </div>

<!-- ✅ Folosește slate-900 cu slate-200 -->
<div class="bg-slate-900 text-slate-200"> Confortabil de citit </div>

<!-- ✅ Sau cu CSS variables pentru consistență -->
<div class="bg-bg text-fg">Adaptiv automat</div>
\`\`\`

**Iconuri și UI elements**

\`\`\`html
<!-- Icons SVG — currentColor moștenește din parent -->
<svg class="text-slate-600 dark:text-slate-400">  Contrast bun </svg>

<!-- ❌ Icon prea pal -->
<svg class="text-slate-300">  Aproape invizibil </svg>

<!-- Borders pe carduri -->
<div class="border border-slate-200 dark:border-slate-700">  Subtle dar vizibil </div>
\`\`\`

**Link-uri**

\`\`\`html
<!-- ✅ Link clar diferențiat de text body -->
<a href="#" class="text-indigo-600 hover:text-indigo-700 underline
                   dark:text-indigo-400 dark:hover:text-indigo-300">
  Link accesibil
</a>

<!-- ❌ Underline numai (fără diferență de culoare) -->
<a href="#" class="text-slate-700 underline">
  Greu de distins ca link
</a>
\`\`\`

**Forms — error states**

\`\`\`html
<!-- ✅ Eroare cu icon + text + culoare -->
<div role="alert" class="flex items-start gap-2 text-red-700 dark:text-red-300">
  <svg aria-hidden="true">⚠</svg>
  <span>Email invalid</span>
</div>

<!-- ❌ Culoare singură — invisible pentru daltonism -->
<input class="border-red-500"> <!-- nu suficient — adaugă text/icon -->
\`\`\`

• **slate-700+** pentru body text pe fundal alb; **slate-300+** pentru body text pe fundal închis
• **Nu te baza DOAR pe culoare** pentru a transmite informație (eroare, success) — adaugă icon/text
• **Tools de testare** sunt obligatorii înainte de production — manual check nu e suficient`);

await up('22. Glassmorphism', 'Backdrop blur', `**Backdrop blur și transparență** sunt esența "glassmorphism" — efect modern UI inspirat din macOS/iOS unde elemente translucide blurează ceea ce este dedesubt.

**Backdrop filter de bază**

\`\`\`html
<!-- Card cu glass effect -->
<div class="relative">
  <!-- Background colorat sub element -->
  <img src="background.jpg" class="absolute inset-0 w-full h-full object-cover">

  <!-- Glass overlay -->
  <div class="relative bg-white/30 backdrop-blur-xl
              rounded-2xl p-8 border border-white/20 shadow-2xl">
    <h2 class="text-2xl font-black text-white">Glass card</h2>
    <p class="text-white/80">Fundalul este blurat prin acest element</p>
  </div>
</div>
\`\`\`

**Scala de blur**

\`\`\`html
<div class="backdrop-blur-none">  Niciun blur </div>
<div class="backdrop-blur-sm">    Blur subtle (4px) </div>
<div class="backdrop-blur">       Default (8px) </div>
<div class="backdrop-blur-md">    Mediu (12px) </div>
<div class="backdrop-blur-lg">    Mare (16px) </div>
<div class="backdrop-blur-xl">    Extra (24px) </div>
<div class="backdrop-blur-2xl">   2x (40px) </div>
<div class="backdrop-blur-3xl">   3x (64px) </div>
<div class="backdrop-blur-[20px]"> Custom 20px </div>
\`\`\`

**Navbar sticky cu glass**

\`\`\`html
<header class="sticky top-0 z-50
               bg-white/80 dark:bg-slate-900/80
               backdrop-blur-md
               border-b border-slate-200/50 dark:border-slate-700/50">
  <nav class="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
    <a href="/" class="font-black text-xl">Brand</a>
    <div class="flex gap-4">
      <a class="text-slate-700 dark:text-slate-300">Cursuri</a>
      <a class="text-slate-700 dark:text-slate-300">Prețuri</a>
    </div>
  </nav>
</header>
\`\`\`

**Modal cu glass background**

\`\`\`html
<!-- Backdrop blurat în loc de black/50 opacity -->
<div class="fixed inset-0 z-50
            bg-white/30 dark:bg-slate-900/30
            backdrop-blur-md
            flex items-center justify-center p-4">

  <div class="bg-white dark:bg-slate-800 rounded-2xl p-8 max-w-md
              shadow-2xl border border-white/20 dark:border-slate-700/50">
    <h2 class="text-2xl font-black mb-4">Modal cu glass backdrop</h2>
    <p class="text-slate-600 dark:text-slate-300 mb-6">
      Fundalul paginii este blurat în spatele modal-ului
    </p>
    <button class="bg-indigo-600 text-white px-6 py-2 rounded-lg">OK</button>
  </div>
</div>
\`\`\`

**Hero section cu glassmorphism**

\`\`\`html
<section class="relative min-h-screen flex items-center
                bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500
                overflow-hidden">
  <!-- Decorative blobs in background -->
  <div class="absolute top-20 left-20 w-96 h-96 bg-yellow-400 rounded-full
              filter blur-3xl opacity-30 animate-pulse"></div>
  <div class="absolute bottom-20 right-20 w-96 h-96 bg-cyan-400 rounded-full
              filter blur-3xl opacity-30 animate-pulse"></div>

  <div class="relative z-10 max-w-3xl mx-auto p-8 text-center">
    <!-- Glass card cu content -->
    <div class="bg-white/10 backdrop-blur-2xl rounded-3xl p-10
                border border-white/20 shadow-2xl">
      <h1 class="text-5xl font-black text-white mb-4">
        Hero glassmorphism
      </h1>
      <p class="text-white/80 text-lg mb-8">
        Card translucid cu blur peste fundal colorat
      </p>
      <button class="px-8 py-3 bg-white/20 backdrop-blur-sm
                     border border-white/30 rounded-xl
                     text-white font-bold
                     hover:bg-white/30 transition-colors">
        Începe acum
      </button>
    </div>
  </div>
</section>
\`\`\`

**Backdrop saturate, contrast, brightness**

\`\`\`html
<!-- Saturate — crește/scade saturația în backdrop -->
<div class="backdrop-saturate-150 backdrop-blur-md bg-white/30">
  Mai vibrant
</div>

<!-- Combinați filtre -->
<div class="backdrop-blur-md
            backdrop-saturate-150
            backdrop-brightness-110
            backdrop-contrast-125
            bg-white/20 rounded-2xl p-6">
  Glass cu enhancement complet
</div>
\`\`\`

**Compatibilitate browser**

\`\`\`html
<!-- backdrop-filter este suportat în:
     - Safari (toate versiunile moderne)
     - Chrome 76+
     - Edge 79+
     - Firefox 103+ (înainte trebuia flag)

     Pentru fallback, oferă bg cu opacity mai mare: -->
<div class="bg-white/80 backdrop-blur-md
            supports-[backdrop-filter]:bg-white/30">
  Browserele moderne: glass; vechi: solid white/80%
</div>
\`\`\`

**Pattern: notification toast cu glass**

\`\`\`html
<div class="fixed top-4 right-4 z-50">
  <div class="bg-white/80 dark:bg-slate-800/80
              backdrop-blur-xl
              border border-white/40 dark:border-slate-700/40
              rounded-2xl shadow-2xl
              px-4 py-3 flex items-center gap-3">
    <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
    <span class="font-bold">Salvat cu succes</span>
  </div>
</div>
\`\`\`

• **backdrop-blur + bg-white/N** = formula clasică pentru glass effect
• Funcționează corect DOAR dacă există conținut colorat dedesubt
• **supports-[backdrop-filter]** pentru fallback elegant în browsers vechi`);

await up('22. Glassmorphism', 'Gradiente', `**Gradiente și mesh gradients** transformă fundaluri plate în vizualuri impresionante — de la gradient liniar simplu la mesh gradients complexe inspirate din design Apple/Stripe.

**Linear gradient — direcții**

\`\`\`html
<!-- Direction: bg-gradient-to-{direction} -->
<div class="bg-gradient-to-r from-blue-500 to-purple-500">Right</div>
<div class="bg-gradient-to-l from-blue-500 to-purple-500">Left</div>
<div class="bg-gradient-to-t from-blue-500 to-purple-500">Top</div>
<div class="bg-gradient-to-b from-blue-500 to-purple-500">Bottom</div>
<div class="bg-gradient-to-tr from-blue-500 to-purple-500">Top-Right</div>
<div class="bg-gradient-to-br from-blue-500 to-purple-500">Bottom-Right</div>
<div class="bg-gradient-to-tl from-blue-500 to-purple-500">Top-Left</div>
<div class="bg-gradient-to-bl from-blue-500 to-purple-500">Bottom-Left</div>
\`\`\`

**Gradient cu 2-3 stops**

\`\`\`html
<!-- 2 culori: from + to -->
<div class="bg-gradient-to-r from-indigo-500 to-purple-600">
  Indigo → Purple
</div>

<!-- 3 culori: from + via + to -->
<div class="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
  Blue → Purple → Pink (rainbow effect)
</div>

<!-- Cu opacity -->
<div class="bg-gradient-to-b from-black/50 to-transparent">
  Overlay pe imagine — întuneric la top, transparent la jos
</div>
\`\`\`

**Hero section cu gradient mesh-like**

\`\`\`html
<section class="relative min-h-screen overflow-hidden
                bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900">
  <!-- Decorative gradient orbs (mesh gradient effect) -->
  <div class="absolute top-0 left-1/4 w-96 h-96
              bg-gradient-to-br from-blue-400 to-cyan-400
              rounded-full filter blur-3xl opacity-30"></div>
  <div class="absolute bottom-0 right-1/4 w-96 h-96
              bg-gradient-to-br from-pink-400 to-purple-400
              rounded-full filter blur-3xl opacity-30"></div>
  <div class="absolute top-1/2 right-0 w-96 h-96
              bg-gradient-to-br from-yellow-400 to-orange-400
              rounded-full filter blur-3xl opacity-20"></div>

  <div class="relative z-10 max-w-4xl mx-auto p-8 pt-24 text-center">
    <h1 class="text-6xl font-black text-white mb-6">
      Background cu mesh gradient
    </h1>
    <p class="text-xl text-white/80">
      Trei orb-uri colorate blurate creează efect "fluid"
    </p>
  </div>
</section>
\`\`\`

**Text cu gradient**

\`\`\`html
<!-- bg-clip-text + text-transparent = text gradient -->
<h1 class="text-6xl font-black
           bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
           bg-clip-text text-transparent">
  Text gradient frumos
</h1>

<!-- Variante populare -->
<h2 class="bg-gradient-to-r from-blue-400 to-emerald-400
           bg-clip-text text-transparent text-4xl font-bold">
  Tech vibe
</h2>

<h2 class="bg-gradient-to-r from-rose-500 to-orange-500
           bg-clip-text text-transparent text-4xl font-bold">
  Warm vibe
</h2>
\`\`\`

**Buton cu gradient**

\`\`\`html
<button class="px-8 py-3 rounded-xl
               bg-gradient-to-r from-indigo-500 to-purple-600
               hover:from-indigo-600 hover:to-purple-700
               text-white font-bold shadow-lg
               shadow-indigo-500/30
               hover:shadow-xl hover:shadow-indigo-500/50
               hover:-translate-y-0.5
               transition-all duration-200">
  CTA gradient premium
</button>

<!-- Gradient cu animație -->
<button class="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
               bg-[length:200%_200%]
               hover:bg-[position:100%_50%]
               transition-all duration-500
               px-8 py-3 rounded-xl text-white font-bold">
  Animated gradient
</button>
\`\`\`

**Card cu border gradient**

\`\`\`html
<!-- Truc: container exterior cu gradient + interior solid -->
<div class="p-[2px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
            rounded-2xl">
  <div class="bg-white dark:bg-slate-900 rounded-2xl p-6">
    <h3 class="text-xl font-black">Card cu border gradient</h3>
    <p>Border-ul are gradient, conținutul rămâne solid</p>
  </div>
</div>
\`\`\`

**Conic gradient (valori arbitrare)**

\`\`\`html
<div class="bg-[conic-gradient(from_0deg,_#3b82f6,_#a855f7,_#ec4899,_#f97316,_#3b82f6)]">
  Conic gradient — rotește prin culori
</div>

<!-- Cerc cu conic gradient -->
<div class="w-32 h-32 rounded-full
            bg-[conic-gradient(from_0deg_at_50%_50%,_#3b82f6,_#a855f7,_#ec4899,_#3b82f6)]">
</div>
\`\`\`

**Stops cu poziții custom**

\`\`\`html
<!-- Stops cu procentaje custom -->
<div class="bg-[linear-gradient(135deg,_#3b82f6_0%,_#3b82f6_50%,_#a855f7_50%,_#a855f7_100%)]">
  Split 50/50 (hard stop, fără tranziție)
</div>

<!-- Gradient cu transparent middle (vignette horizontal) -->
<div class="bg-[linear-gradient(to_right,_black_0%,_transparent_20%,_transparent_80%,_black_100%)]">
  Vignette horizontal pe ambele capete
</div>
\`\`\`

**Common combinations**

\`\`\`html
<!-- Sunset -->
<div class="bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600"></div>

<!-- Ocean -->
<div class="bg-gradient-to-br from-blue-400 to-emerald-400"></div>

<!-- Aurora -->
<div class="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></div>

<!-- Fire -->
<div class="bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500"></div>

<!-- Forest -->
<div class="bg-gradient-to-br from-green-700 via-emerald-600 to-teal-500"></div>
\`\`\`

• **bg-gradient-to-{dir}** + **from / via / to** = gradient linear standard
• **Multiple orbs blurate** = mesh gradient ieftin care arată premium
• **bg-clip-text + text-transparent** = text cu gradient frumos pentru headings`);

await up('22. Glassmorphism', 'Shadows avansate', `**Shadows avansate și glow effects** depășesc shadow-urile standard — adâncime mai dramatică, glow colorat și efecte stratificate pentru UI memorabil.

**Scala shadow standard**

\`\`\`html
<div class="shadow-sm">  Foarte mică     </div>
<div class="shadow">     Default          </div>
<div class="shadow-md">  Medie            </div>
<div class="shadow-lg">  Mare             </div>
<div class="shadow-xl">  Extra mare       </div>
<div class="shadow-2xl"> 2x extra mare    </div>
<div class="shadow-inner">Interior        </div>
<div class="shadow-none">Niciun shadow    </div>
\`\`\`

**Shadow colorat (Tailwind 3+)**

\`\`\`html
<!-- shadow-{size} + shadow-{color}/{opacity} -->
<button class="bg-indigo-600 text-white shadow-lg shadow-indigo-500/50
               px-6 py-3 rounded-xl">
  Buton cu glow indigo
</button>

<button class="bg-emerald-600 text-white shadow-xl shadow-emerald-500/40">
  Glow verde
</button>

<button class="bg-rose-600 text-white shadow-2xl shadow-rose-500/60">
  Glow roșu intens
</button>

<!-- Glow la hover -->
<button class="bg-purple-600 text-white px-6 py-3 rounded-xl
               hover:shadow-2xl hover:shadow-purple-500/50
               transition-shadow duration-300">
  Glow la hover
</button>
\`\`\`

**Multi-layer shadow custom**

\`\`\`html
<!-- Cu valori arbitrare poți stratifica shadow-uri -->
<div class="shadow-[0_10px_50px_-10px_rgba(0,0,0,0.3),_0_0_40px_-20px_rgba(99,102,241,0.5)]
            bg-white rounded-2xl p-8">
  Shadow stratificat: black + colored glow
</div>

<!-- Material Design elevation -->
<div class="shadow-[0_2px_4px_rgba(0,0,0,0.1),_0_8px_16px_rgba(0,0,0,0.1)]
            bg-white rounded-xl p-6">
  Elevation realistă
</div>

<!-- Floating effect intens -->
<div class="shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)]
            hover:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]
            transition-shadow duration-500
            bg-white rounded-3xl p-8">
  Floating card cu hover boost
</div>
\`\`\`

**Glow neon (pentru dark themes)**

\`\`\`html
<!-- Text neon -->
<h1 class="text-6xl font-black text-indigo-400
           drop-shadow-[0_0_20px_rgba(99,102,241,0.7)]">
  Neon glow text
</h1>

<!-- Buton neon -->
<button class="bg-cyan-500 text-white px-8 py-3 rounded-full
               shadow-[0_0_30px_rgba(6,182,212,0.6)]
               hover:shadow-[0_0_50px_rgba(6,182,212,0.9)]
               transition-shadow">
  Neon button
</button>

<!-- Border glow -->
<input class="bg-slate-900 text-white px-4 py-2 rounded-lg
              border-2 border-indigo-500
              shadow-[0_0_0_3px_rgba(99,102,241,0.2)]
              focus:shadow-[0_0_0_5px_rgba(99,102,241,0.3)]
              focus:outline-none transition-shadow">
\`\`\`

**Shadow stratificat (3D / lifted)**

\`\`\`html
<!-- Hard shadow (offset, fără blur) — neumorphism alternative -->
<div class="bg-yellow-300 border-2 border-slate-900 rounded-xl p-6
            shadow-[8px_8px_0_0_rgb(15,23,42)]
            hover:shadow-[12px_12px_0_0_rgb(15,23,42)]
            hover:-translate-x-1 hover:-translate-y-1
            transition-all duration-200">
  Brutalist style card
</div>

<!-- Lifted card cu shadow soft -->
<div class="bg-white rounded-2xl p-6
            shadow-[0_20px_60px_-15px_rgba(0,0,0,0.2)]
            hover:shadow-[0_30px_80px_-20px_rgba(0,0,0,0.3)]
            hover:-translate-y-1
            transition-all duration-300">
  Lifted card
</div>
\`\`\`

**Inner shadow (inset)**

\`\`\`html
<!-- Default inner -->
<div class="shadow-inner bg-slate-100 rounded-xl p-6">
  Inset shadow subtle
</div>

<!-- Custom inset -->
<div class="bg-slate-200
            shadow-[inset_0_4px_8px_rgba(0,0,0,0.1)]
            rounded-xl p-6">
  Field "pressed" appearance
</div>

<!-- Pentru input "depressed" -->
<input class="bg-slate-50 px-4 py-2 rounded-lg
              shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)]
              focus:shadow-[inset_0_2px_8px_rgba(99,102,241,0.2)]
              focus:outline-none">
\`\`\`

**Drop-shadow (pe element, nu container)**

\`\`\`html
<!-- shadow = box-shadow (rectangular); drop-shadow = filter (respectă forma) -->

<!-- Pe text -->
<h1 class="text-6xl drop-shadow-lg">Text cu drop-shadow</h1>

<!-- Pe imagine cu transparent background -->
<img src="logo.svg" class="drop-shadow-2xl">
<!-- box-shadow ar fi un dreptunghi; drop-shadow urmează conturul logo-ului -->

<!-- Pe SVG -->
<svg class="drop-shadow-md filter">...</svg>
\`\`\`

**Glassmorphism cu shadow + blur**

\`\`\`html
<div class="bg-white/30 backdrop-blur-xl
            border border-white/40
            shadow-[0_8px_32px_rgba(0,0,0,0.12)]
            rounded-2xl p-8">
  Glass card cu shadow subtle
</div>
\`\`\`

**Pattern: card hover lift premium**

\`\`\`html
<article class="bg-white rounded-2xl p-6
                shadow-md shadow-slate-200
                hover:shadow-2xl hover:shadow-indigo-500/20
                hover:-translate-y-1
                transition-all duration-300
                cursor-pointer">
  <h3>Card lift cu colored shadow boost la hover</h3>
</article>
\`\`\`

• **shadow-{color}/{opacity}** = trucul cel mai modern pentru "glow effects"
• **drop-shadow** pentru SVG, imagini transparente, text — respectă forma reală
• **Hard shadow** (offset fără blur) = stil brutalist/neumorphism trend modern`);

await up('23. Scroll, Overflow', 'Overflow', `**Overflow și scroll custom** controlează comportamentul conținutului care depășește container-ul — esențial pentru aplicații cu liste lungi, modal-uri cu scroll și layout-uri scrollable.

**Overflow values**

\`\`\`html
<!-- visible (default) — conținutul iese din container -->
<div class="overflow-visible h-32 w-64 bg-blue-100">
  Conținut LUNG care depășește dimensiunile containerului
</div>

<!-- hidden — taie tot ce depășește -->
<div class="overflow-hidden h-32 w-64 bg-blue-100">
  Conținut LUNG care va fi tăiat când iese din container
</div>

<!-- scroll — scrollbar mereu vizibil -->
<div class="overflow-scroll h-32 w-64 bg-blue-100">
  Scrollbars apar pe ambele axe (chiar dacă conținutul încape)
</div>

<!-- auto — scrollbar doar când e necesar -->
<div class="overflow-auto h-32 w-64 bg-blue-100">
  Scrollbar apare doar dacă conținutul depășește
</div>

<!-- Per axă -->
<div class="overflow-x-auto overflow-y-hidden">  Doar orizontal </div>
<div class="overflow-y-auto overflow-x-hidden">  Doar vertical </div>
\`\`\`

**Modal cu scroll interior**

\`\`\`html
<div class="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
  <div class="bg-white rounded-2xl w-full max-w-2xl
              max-h-[90vh] overflow-y-auto
              p-6 shadow-2xl">

    <h2 class="text-2xl font-black mb-4 sticky top-0 bg-white pb-2">
      Modal cu scroll
    </h2>

    <!-- Conținut lung scrollabil -->
    <div class="space-y-4">
      <p>Paragraf 1...</p>
      <p>Paragraf 2...</p>
      <!-- ... mai multe -->
    </div>
  </div>
</div>
\`\`\`

**Sidebar cu scroll independent**

\`\`\`html
<div class="flex h-screen overflow-hidden">
  <!-- Sidebar scrollabil independent -->
  <aside class="w-64 bg-slate-100 overflow-y-auto p-4">
    <nav class="space-y-1">
      <a href="#">Item 1</a>
      <a href="#">Item 2</a>
      <!-- ... 100 de item-uri -->
    </nav>
  </aside>

  <!-- Main scrollabil independent -->
  <main class="flex-1 overflow-y-auto p-8">
    Conținut principal lung...
  </main>
</div>
\`\`\`

**Horizontal scroll — table sau cards**

\`\`\`html
<!-- Tabel cu scroll orizontal pe mobile -->
<div class="overflow-x-auto">
  <table class="min-w-full">
    <thead>
      <tr>
        <th class="px-4 py-2">Col 1</th>
        <th class="px-4 py-2">Col 2</th>
        <th class="px-4 py-2">Col 3</th>
        <th class="px-4 py-2">Col 4</th>
        <th class="px-4 py-2">Col 5</th>
      </tr>
    </thead>
    <!-- ... -->
  </table>
</div>

<!-- Cards horizontal scrolling -->
<div class="overflow-x-auto -mx-4 px-4">
  <div class="flex gap-4 w-max">
    <div class="w-72 shrink-0 bg-white rounded-xl p-4 shadow">Card 1</div>
    <div class="w-72 shrink-0 bg-white rounded-xl p-4 shadow">Card 2</div>
    <div class="w-72 shrink-0 bg-white rounded-xl p-4 shadow">Card 3</div>
    <!-- ... -->
  </div>
</div>
\`\`\`

**Customizare scrollbar (CSS arbitrary values)**

\`\`\`html
<!-- Scrollbar thin și colorat -->
<div class="overflow-y-auto h-96
            [&::-webkit-scrollbar]:w-2
            [&::-webkit-scrollbar-track]:bg-slate-100
            [&::-webkit-scrollbar-thumb]:bg-slate-400
            [&::-webkit-scrollbar-thumb]:rounded-full
            [&::-webkit-scrollbar-thumb:hover]:bg-slate-500">
  Scrollabil cu scrollbar custom
</div>

<!-- Cu plugin oficial @tailwindcss/scrollbar (alternativ) -->
<div class="overflow-y-auto scrollbar-thin scrollbar-thumb-slate-400">
  Cu plugin
</div>
\`\`\`

**Ascunde scrollbar (păstrând scroll)**

\`\`\`html
<!-- scrollbar-hide (custom utility sau plugin) -->
<div class="overflow-x-auto
            [&::-webkit-scrollbar]:hidden
            [scrollbar-width:none]">
  Scrollabil fără scrollbar vizibil
</div>

<!-- Util pentru carouseluri "swipe" pe mobile -->
\`\`\`

**Overscroll behavior (iOS bounce, etc.)**

\`\`\`html
<!-- Previne scroll chain spre body -->
<div class="overflow-y-auto overscroll-contain h-96">
  Când ajungi la capăt, NU scrollează body în spate
</div>

<!-- Disable bounce -->
<div class="overflow-y-auto overscroll-none">
  Fără bounce effect (iOS)
</div>
\`\`\`

**Pattern: chat messages**

\`\`\`html
<div class="flex flex-col h-screen">
  <header class="shrink-0 p-4 bg-white border-b">Chat header</header>

  <!-- Messages — scrollabile -->
  <div class="flex-1 overflow-y-auto p-4 space-y-2">
    <div class="bg-blue-100 rounded-xl p-3">Mesaj 1</div>
    <div class="bg-slate-100 rounded-xl p-3">Mesaj 2</div>
    <!-- ... mai multe mesaje -->
  </div>

  <!-- Input bar — fixat jos -->
  <form class="shrink-0 p-4 bg-white border-t flex gap-2">
    <input class="flex-1 px-4 py-2 border rounded-lg" placeholder="Mesaj...">
    <button class="px-4 py-2 bg-indigo-600 text-white rounded-lg">Trimite</button>
  </form>
</div>
\`\`\`

• **overflow-y-auto + max-h** = pattern standard pentru containere scrollabile
• **flex-1 overflow-y-auto** într-un flex column = umple spațiul și scrollează
• **overscroll-contain** previne "scroll chaining" la mobile — esențial pentru modal-uri`);

await up('23. Scroll, Overflow', 'Scroll smooth', `**Scroll smooth și scroll margin** îmbunătățesc UX-ul navigării prin pagină — anchor links smooth, scroll padding pentru sticky header, scroll-snap pentru carousels.

**Smooth scroll**

\`\`\`html
<!-- Pe element specific -->
<div class="scroll-smooth h-screen overflow-y-auto">
  <a href="#section1">Section 1</a>
  <a href="#section2">Section 2</a>

  <section id="section1" class="h-screen bg-blue-100">Section 1</section>
  <section id="section2" class="h-screen bg-green-100">Section 2</section>
</div>

<!-- Global, pe HTML — cea mai comună utilizare -->
<html class="scroll-smooth">
  <body>...</body>
</html>

<!-- Sau în CSS direct -->
<!-- html { scroll-behavior: smooth; } -->
\`\`\`

**Scroll padding / margin (sticky header offset)**

\`\`\`html
<!-- Problema: anchor link sub sticky header -->
<header class="sticky top-0 h-16 bg-white">Sticky 64px</header>

<a href="#section1">Salt la Section 1</a>
<section id="section1">Conținut...</section>
<!-- Click pe anchor: section1 ajunge sub header și e ascuns -->

<!-- Soluția 1: scroll-padding-top pe HTML -->
<html class="scroll-pt-16">  <!-- 64px = înălțimea header-ului -->

<!-- Soluția 2: scroll-margin-top pe target -->
<section id="section1" class="scroll-mt-16">...</section>
<!-- Acum target-ul are 64px "respiro" de la top când e scrollat la -->
\`\`\`

**Scroll snap — carouseluri robust**

\`\`\`html
<!-- Container snap orizontal -->
<div class="snap-x snap-mandatory overflow-x-auto flex gap-4">
  <div class="snap-center shrink-0 w-80 h-48 bg-blue-500 rounded-2xl">
    Slide 1
  </div>
  <div class="snap-center shrink-0 w-80 h-48 bg-green-500 rounded-2xl">
    Slide 2
  </div>
  <div class="snap-center shrink-0 w-80 h-48 bg-amber-500 rounded-2xl">
    Slide 3
  </div>
  <!-- Swipe-ul "se prinde" pe fiecare slide -->
</div>

<!-- Snap vertical -->
<div class="snap-y snap-mandatory h-screen overflow-y-auto">
  <section class="snap-start h-screen bg-blue-100">Pagina 1</section>
  <section class="snap-start h-screen bg-green-100">Pagina 2</section>
  <section class="snap-start h-screen bg-amber-100">Pagina 3</section>
  <!-- Scroll "click" pe fiecare secțiune ca pe iOS -->
</div>
\`\`\`

**Snap behavior**

\`\`\`html
<!-- snap-mandatory: snap obligatoriu (mereu pe slide) -->
<div class="snap-x snap-mandatory">
  Scroll-ul TREBUIE să se oprească pe un slide
</div>

<!-- snap-proximity: snap doar dacă aproape -->
<div class="snap-x snap-proximity">
  Snap doar dacă utilizatorul scrollează aproape de slide
</div>

<!-- Snap alignment pe child -->
<div class="snap-start">  Aliniat la START </div>
<div class="snap-center"> Centrat </div>
<div class="snap-end">    Aliniat la END </div>

<!-- snap-none = override (nu participă la snap) -->
<div class="snap-x">
  <div class="snap-center">Snap</div>
  <div class="snap-none">NU snap</div>
  <div class="snap-center">Snap</div>
</div>
\`\`\`

**Pattern: slider de imagini cu indicator**

\`\`\`html
<div class="relative">
  <div class="snap-x snap-mandatory overflow-x-auto flex
              [&::-webkit-scrollbar]:hidden">
    <img src="..." class="snap-center shrink-0 w-full">
    <img src="..." class="snap-center shrink-0 w-full">
    <img src="..." class="snap-center shrink-0 w-full">
  </div>

  <!-- Indicators (statici, opțional click-able cu JS) -->
  <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
    <span class="w-2 h-2 rounded-full bg-white"></span>
    <span class="w-2 h-2 rounded-full bg-white/50"></span>
    <span class="w-2 h-2 rounded-full bg-white/50"></span>
  </div>
</div>
\`\`\`

**Pattern: TOC (Table of Contents) cu smooth scroll**

\`\`\`html
<html class="scroll-smooth scroll-pt-20">
<body>
  <header class="sticky top-0 h-16 bg-white shadow z-10">Sticky header</header>

  <aside class="fixed left-4 top-20 w-48">
    <nav class="space-y-1">
      <a href="#intro"     class="block px-3 py-1 hover:bg-slate-100 rounded">Intro</a>
      <a href="#features"  class="block px-3 py-1 hover:bg-slate-100 rounded">Features</a>
      <a href="#pricing"   class="block px-3 py-1 hover:bg-slate-100 rounded">Pricing</a>
      <a href="#contact"   class="block px-3 py-1 hover:bg-slate-100 rounded">Contact</a>
    </nav>
  </aside>

  <main class="ml-56 max-w-3xl mx-auto p-8 space-y-12">
    <section id="intro" class="scroll-mt-20">
      <h2>Intro</h2>
      <p>...</p>
    </section>
    <section id="features" class="scroll-mt-20">
      <h2>Features</h2>
      <p>...</p>
    </section>
    <!-- etc. -->
  </main>
</body>
</html>
\`\`\`

**Pattern: full-page scroll (Apple-style)**

\`\`\`html
<main class="snap-y snap-mandatory h-screen overflow-y-scroll">
  <section class="snap-start h-screen flex items-center justify-center
                  bg-gradient-to-br from-blue-500 to-purple-600 text-white">
    <h1 class="text-7xl font-black">Page 1</h1>
  </section>

  <section class="snap-start h-screen flex items-center justify-center
                  bg-gradient-to-br from-purple-500 to-pink-500 text-white">
    <h1 class="text-7xl font-black">Page 2</h1>
  </section>

  <section class="snap-start h-screen flex items-center justify-center
                  bg-gradient-to-br from-emerald-500 to-teal-500 text-white">
    <h1 class="text-7xl font-black">Page 3</h1>
  </section>
</main>
\`\`\`

• **html.scroll-smooth** = smooth scroll global cu o singură clasă
• **scroll-pt-16 / scroll-mt-16** = compensare pentru sticky header (esențial pentru anchors)
• **snap-x + snap-mandatory** + **snap-center** pe children = carousel nativ fără biblioteci`);

await up('23. Scroll, Overflow', 'Cursor', `**Cursor, pointer-events și user-select** controlează interactivitatea elementelor — cursor-ul afișat, dacă elementul răspunde la click, dacă textul poate fi selectat.

**Cursor types**

\`\`\`html
<button class="cursor-pointer">    Standard pentru click </button>
<div class="cursor-default">       Săgeată normală (default) </div>
<div class="cursor-not-allowed">   Disabled (cerc tăiat) </div>
<div class="cursor-wait">          Loading (ceas) </div>
<div class="cursor-text">          I-beam (peste text) </div>
<div class="cursor-move">          Move (4 săgeți) </div>
<div class="cursor-grab">          Grab (mâna deschisă) </div>
<div class="cursor-grabbing">      Grabbing (mâna închisă) </div>
<div class="cursor-help">          Help (semn de întrebare) </div>
<div class="cursor-zoom-in">       Zoom in </div>
<div class="cursor-zoom-out">      Zoom out </div>
<div class="cursor-crosshair">     Crosshair </div>
<div class="cursor-progress">      Progress (ceas + săgeată) </div>

<!-- Custom cu URL -->
<div class="cursor-[url('/custom-cursor.png'),_pointer]">Custom image cursor</div>
\`\`\`

**Pointer-events**

\`\`\`html
<!-- pointer-events-none — elementul nu primește click-uri -->
<div class="relative">
  <button>Buton interactiv</button>

  <!-- Overlay decorativ care NU blochează click pe buton -->
  <div class="absolute inset-0 pointer-events-none bg-blue-500/10
              rounded-lg"></div>
</div>

<!-- pointer-events-auto — restaurează (peste un none părinte) -->
<div class="pointer-events-none">
  <button>NU click</button>
  <button class="pointer-events-auto">DA click (override)</button>
</div>

<!-- Util pentru tooltips care nu trebuie să intercepteze hover -->
<div class="group relative">
  <button>Hover me</button>
  <div class="absolute bottom-full opacity-0 group-hover:opacity-100
              pointer-events-none
              bg-slate-900 text-white px-2 py-1 rounded text-xs">
    Tooltip (nu blochează hover-ul pe alte elemente)
  </div>
</div>
\`\`\`

**User-select**

\`\`\`html
<!-- select-none — text NU poate fi selectat (drag, accident click) -->
<button class="select-none">
  Buton al cărui text NU se selectează la dublu-click
</button>

<nav class="select-none">
  <a>Item 1</a>
  <a>Item 2</a>
  <!-- Click rapid nu selectează textul -->
</nav>

<!-- select-all — click selectează TOT textul -->
<code class="select-all bg-slate-100 px-2 py-1 rounded">
  Click pe acest cod îl selectează complet
</code>

<!-- select-text — comportament normal (default pe text) -->
<p class="select-text">Text normal</p>

<!-- select-auto — auto (default) -->
<div class="select-auto">Default</div>
\`\`\`

**Disabled state complet**

\`\`\`html
<!-- Buton disabled cu toate aspectele -->
<button
  disabled
  class="px-4 py-2 bg-indigo-600 text-white rounded-lg
         disabled:bg-slate-300
         disabled:text-slate-500
         disabled:cursor-not-allowed
         disabled:pointer-events-none
         hover:bg-indigo-700">
  Disabled
</button>

<!-- Input disabled -->
<input
  disabled
  value="Nu poate fi modificat"
  class="px-4 py-2 border rounded
         disabled:bg-slate-100
         disabled:text-slate-400
         disabled:cursor-not-allowed">

<!-- Card "disabled" -->
<div class="opacity-50 pointer-events-none select-none">
  Card complet inactiv
</div>
\`\`\`

**Loading state**

\`\`\`html
<button
  disabled
  class="cursor-wait bg-indigo-600 text-white px-4 py-2 rounded
         opacity-75">
  <span class="inline-flex items-center gap-2">
    <svg class="animate-spin h-4 w-4">...</svg>
    Se procesează...
  </span>
</button>
\`\`\`

**Drag handle**

\`\`\`html
<!-- Element drag-able cu cursor potrivit -->
<div class="cursor-grab active:cursor-grabbing select-none
            bg-white rounded-xl p-4 shadow"
     draggable="true">
  Drag me
</div>

<!-- Drag handle separat -->
<div class="bg-white rounded-xl p-4 shadow flex items-center">
  <span class="cursor-grab active:cursor-grabbing text-slate-400 mr-3">⋮⋮</span>
  <div>Conținut card</div>
</div>
\`\`\`

**Read-only state vs disabled**

\`\`\`html
<!-- read-only — afișează valoarea, NU permite modificare, dar select da -->
<input
  readonly
  value="Cod referință: ABC123"
  class="bg-slate-50 px-4 py-2 rounded-lg border
         read-only:text-slate-700
         read-only:cursor-text">

<!-- disabled — nu doar read-only, dar și nu submit cu form -->
<input
  disabled
  value="Disabled"
  class="disabled:bg-slate-100 disabled:cursor-not-allowed">
\`\`\`

**Loading skeleton fără pointer events**

\`\`\`html
<!-- Skeleton care nu poate fi click-uit accidental -->
<div class="bg-slate-200 rounded h-12 w-full
            animate-pulse
            pointer-events-none
            select-none">
</div>
\`\`\`

**Pattern: card click area completă**

\`\`\`html
<!-- Buton acoperă întreg cardul fără să fie click-able vizual -->
<article class="relative bg-white rounded-2xl shadow p-6 hover:shadow-xl
                transition-shadow cursor-pointer">
  <h3 class="font-bold">Article title</h3>
  <p>Description...</p>

  <!-- Link invisible care acoperă tot cardul -->
  <a href="/article/123"
     class="absolute inset-0 z-10"
     aria-label="Read article">
  </a>

  <!-- Butoane interioare deasupra link-ului -->
  <button class="relative z-20 mt-4 px-3 py-1 bg-slate-100 rounded">
    Salvează (click independent)
  </button>
</article>
\`\`\`

• **cursor-not-allowed + disabled:** pentru butoane inactive accesibile
• **pointer-events-none** pentru overlay-uri decorative care nu trebuie să blocheze interacțiune
• **select-none** pe butoane și navigație — evită selecție accidentală la dublu-click`);

  console.log('Done Tailwind script 4.');
  await p.$disconnect();
}

run().catch(e => { console.error(e); p.$disconnect(); process.exit(1); });
