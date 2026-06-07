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

// L28 — Dark Mode Avansat

await up('28. Dark Mode', 'class vs media', `**Moduri Dark Mode: class vs media** explică cele două strategii principale prin care Tailwind activează dark mode și când să le folosești pe fiecare.

**Strategia implicită: media (prefers-color-scheme)**

\`\`\`js
// tailwind.config.js
module.exports = {
  darkMode: 'media',   // activat automat când OS-ul e în dark mode
}
\`\`\`

\`\`\`html
<!-- Se aplică automat dacă OS-ul e dark -->
<div class="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
  Conținut
</div>
\`\`\`

• **Avantaj**: zero JavaScript — OS-ul decide
• **Dezavantaj**: utilizatorul nu poate alege manual din aplicație

**Strategia class — control manual**

\`\`\`js
// tailwind.config.js
module.exports = {
  darkMode: 'class',   // activat când <html class="dark"> sau un ancestor are clasa dark
}
\`\`\`

\`\`\`html
<!-- Dark mode activ când html are clasa 'dark' -->
<html class="dark">
  <body>
    <div class="bg-white dark:bg-slate-900">...</div>
  </body>
</html>
\`\`\`

**Toggle dark mode cu JavaScript**

\`\`\`js
// Simplu — toggle clasa pe <html>
function toggleDark() {
  document.documentElement.classList.toggle('dark');
  localStorage.setItem('theme',
    document.documentElement.classList.contains('dark') ? 'dark' : 'light'
  );
}

// Inițializare la load — evită FOUC (flash of unstyled content)
const saved = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
if (saved === 'dark' || (!saved && prefersDark)) {
  document.documentElement.classList.add('dark');
}
\`\`\`

**Selector custom (Tailwind v3.4+)**

\`\`\`js
// tailwind.config.js
module.exports = {
  darkMode: ['class', '[data-theme="dark"]'],
  // sau pe un element specific
  darkMode: ['class', '.my-app.dark'],
}
\`\`\`

**Combinarea strategiilor**

\`\`\`js
// Respect preferința OS, dar permite override manual
darkMode: ['class', 'html.dark'],

// CSS în globals.css
@media (prefers-color-scheme: dark) {
  html:not(.light) { @apply dark; }
}
\`\`\`

**Exemple comparative**

\`\`\`html
<!-- Culori -->
<div class="bg-white dark:bg-slate-900">fond</div>
<p class="text-slate-900 dark:text-slate-100">text principal</p>
<p class="text-slate-600 dark:text-slate-400">text secundar</p>

<!-- Borders -->
<div class="border border-slate-200 dark:border-slate-700">card</div>

<!-- Shadows -->
<div class="shadow-md dark:shadow-slate-900/50">cu umbră</div>

<!-- Images -->
<img class="opacity-100 dark:opacity-90 dark:brightness-90" src="...">
\`\`\`

**Debugging dark mode**

\`\`\`js
// În DevTools Console: forțează dark mode
document.documentElement.classList.add('dark');    // activare
document.documentElement.classList.remove('dark'); // dezactivare
document.documentElement.classList.toggle('dark'); // toggle
\`\`\`

• **media** = zero-code, urmează OS — ideal pentru site-uri simple fără preferință salvată
• **class** = control complet — standard pentru aplicații cu toggle manual și persistare localStorage
• **selector custom** = util când dark mode e controlat de data-attribute sau la nivel de componentă
• **anti-FOUC** = injectează script inline în \`<head>\` înainte de render pentru a evita flash-ul`);

await up('28. Dark Mode', 'Paleta Dark', `**Paleta Dark Mode Tailwind** ghidează cum să alegi combinațiile de culori potrivite pentru interfețe care arată bine atât în light cât și în dark mode.

**Principii de bază**

\`\`\`
Light mode:  fundal deschis → text închis
Dark mode:   fundal închis  → text deschis

NU inversa pur și simplu — culorile saturate funcționează diferit pe fond întunecat
\`\`\`

**Paleta Slate — cea mai populară pentru dark mode**

\`\`\`html
<!-- Fonduri -->
<body class="bg-white dark:bg-slate-950">         <!-- fundal pagină -->
<div  class="bg-slate-50 dark:bg-slate-900">      <!-- fundal card -->
<div  class="bg-slate-100 dark:bg-slate-800">     <!-- fundal element activ -->
<div  class="bg-slate-200 dark:bg-slate-700">     <!-- hover state -->

<!-- Texte -->
<h1 class="text-slate-900 dark:text-slate-50">    <!-- titluri -->
<p  class="text-slate-700 dark:text-slate-300">   <!-- text principal -->
<p  class="text-slate-500 dark:text-slate-400">   <!-- text secundar -->
<p  class="text-slate-400 dark:text-slate-500">   <!-- placeholders -->

<!-- Borders -->
<div class="border-slate-200 dark:border-slate-700"> <!-- borders normale -->
<div class="border-slate-300 dark:border-slate-600"> <!-- borders accentuate -->
\`\`\`

**Culorile accentuate — diferă în dark mode**

\`\`\`html
<!-- Indigo — accent principal -->
<button class="bg-indigo-600 dark:bg-indigo-500 text-white">
  Buton principal
</button>

<!-- Verdele e mai intens în dark — reduce saturația -->
<span class="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
  Status activ
</span>

<!-- Roșu pentru erori -->
<span class="bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">
  Eroare
</span>

<!-- Amber pentru avertismente -->
<span class="bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
  Avertisment
</span>
\`\`\`

**Design system cu CSS variables**

\`\`\`css
:root {
  --color-bg:         255 255 255;    /* white */
  --color-bg-subtle:  248 250 252;    /* slate-50 */
  --color-surface:    255 255 255;    /* white */
  --color-text:        15  23  42;    /* slate-900 */
  --color-text-muted: 100 116 139;    /* slate-500 */
  --color-border:     226 232 240;    /* slate-200 */
  --color-accent:      99 102 241;    /* indigo-500 */
}

.dark {
  --color-bg:           2   6  23;    /* slate-950 */
  --color-bg-subtle:   15  23  42;    /* slate-900 */
  --color-surface:     30  41  59;    /* slate-800 */
  --color-text:       248 250 252;    /* slate-50 */
  --color-text-muted: 148 163 184;    /* slate-400 */
  --color-border:      51  65  85;    /* slate-700 */
  --color-accent:     129 140 248;    /* indigo-400 */
}
\`\`\`

\`\`\`js
// tailwind.config.js
theme: {
  extend: {
    colors: {
      bg:         'rgb(var(--color-bg) / <alpha-value>)',
      surface:    'rgb(var(--color-surface) / <alpha-value>)',
      'text-primary': 'rgb(var(--color-text) / <alpha-value>)',
      accent:     'rgb(var(--color-accent) / <alpha-value>)',
    }
  }
}
\`\`\`

**Card complet light/dark**

\`\`\`html
<div class="bg-white dark:bg-slate-800
            border border-slate-200 dark:border-slate-700
            rounded-2xl p-6 shadow-sm dark:shadow-slate-900/50">
  <h3 class="text-slate-900 dark:text-slate-100 font-bold">Titlu</h3>
  <p  class="text-slate-600 dark:text-slate-400 mt-1 text-sm">Descriere</p>
  <span class="bg-indigo-100 dark:bg-indigo-900/40
               text-indigo-700 dark:text-indigo-300
               text-xs font-medium px-2 py-0.5 rounded-full mt-3 inline-block">
    Tag
  </span>
</div>
\`\`\`

• **slate** = cea mai neutrală paletă pentru dark mode — zinc și gray sunt alternative bune
• **culori accentuate** în dark mode = folosește o nuanță mai deschisă (500 → 400) pentru contrast pe fond închis
• **opacity modifier** (dark:bg-green-900/30) = fond subtil colorat fără a fi prea intens
• **CSS variables** = singura abordare scalabilă pentru un design system serios cu multiple teme`);

await up('28. Dark Mode', 'Dark Mode Toggle', `**Dark Mode Toggle Component** — implementarea completă a unui buton de schimbare temă, cu persistare în localStorage și suport SSR (Next.js).

**Toggle simplu — HTML/Vanilla JS**

\`\`\`html
<button id="theme-toggle"
        class="p-2 rounded-lg bg-slate-100 dark:bg-slate-800
               text-slate-600 dark:text-slate-400
               hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
        aria-label="Toggle dark mode">
  <!-- Iconița soare (light mode) -->
  <svg class="w-5 h-5 dark:hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>
  </svg>
  <!-- Iconița lună (dark mode) -->
  <svg class="w-5 h-5 hidden dark:block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
  </svg>
</button>
\`\`\`

\`\`\`js
// Script în <head> pentru evitarea FOUC (Flash of Unstyled Content)
(function() {
  const saved = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (saved === 'dark' || (!saved && prefersDark)) {
    document.documentElement.classList.add('dark');
  }
})();

// Toggle handler
document.getElementById('theme-toggle').addEventListener('click', () => {
  const isDark = document.documentElement.classList.toggle('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});
\`\`\`

**Toggle în Next.js cu next-themes**

\`\`\`bash
npm install next-themes
\`\`\`

\`\`\`tsx
// app/providers.tsx
'use client';
import { ThemeProvider } from 'next-themes';

export function Providers({ children }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  );
}

// app/layout.tsx
import { Providers } from './providers';
export default function RootLayout({ children }) {
  return (
    <html lang="ro" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
\`\`\`

\`\`\`tsx
// components/ThemeToggle.tsx
'use client';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Evită hydration mismatch
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="w-9 h-9" />;   // placeholder

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800
                 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? '☀️' : '🌙'}
    </button>
  );
}
\`\`\`

**Toggle cu 3 opțiuni (light/dark/system)**

\`\`\`tsx
const options = ['light', 'dark', 'system'] as const;

<div class="flex rounded-lg border border-slate-200 dark:border-slate-700 p-1">
  {options.map(opt => (
    <button
      key={opt}
      onClick={() => setTheme(opt)}
      className={\`px-3 py-1 text-sm rounded-md capitalize transition-colors
        \${theme === opt
          ? 'bg-white dark:bg-slate-700 shadow font-medium'
          : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
        }\`}
    >
      {opt}
    </button>
  ))}
</div>
\`\`\`

• **FOUC** (Flash of Unstyled Content) = problema principală la SSR — rezolvată cu script inline în \`<head>\` sau \`suppressHydrationWarning\` în Next.js
• **next-themes** = soluția standard pentru Next.js — gestionează SSR, localStorage, system preference automat
• **mounted state** = necesar în React/Next.js pentru a evita hydration mismatch (server vs client)
• **3 opțiuni** (light/dark/system) = UX recomandat — permite utilizatorului să urmeze OS-ul`);

await up('28. Dark Mode', 'CSS Variables', `**Dark Mode cu CSS Variables și Tailwind v4** combină puterea variabilelor CSS native cu utilitarele Tailwind pentru un sistem de theming flexibil și fără duplicare de cod.

**Strategia CSS Variables — de ce e superioară**

\`\`\`
Clasic dark:bg-slate-900 dark:text-slate-100 — duplicezi clasele pentru fiecare element
Cu CSS vars — definești o dată variabilele, le folosești peste tot fără prefix dark:
\`\`\`

**Sistem complet cu variabile**

\`\`\`css
/* globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* Backgrounds */
    --bg-page:     0 0% 100%;         /* white */
    --bg-card:     0 0% 98%;          /* slate-50 approx */
    --bg-muted:  210 40% 96%;         /* slate-100 approx */

    /* Text */
    --text-primary:    222 47% 11%;   /* slate-900 */
    --text-secondary:  215 16% 47%;   /* slate-500 */
    --text-disabled:   215 20% 65%;   /* slate-400 */

    /* Borders */
    --border:     214 32% 91%;        /* slate-200 */
    --border-focus: 221 83% 53%;      /* indigo-500 */

    /* Accent */
    --accent:         221 83% 53%;    /* indigo-600 */
    --accent-hover:   224 76% 48%;    /* indigo-700 */
    --accent-subtle:  226 100% 97%;   /* indigo-50 */
    --accent-text:    234 89% 74%;    /* indigo-400 — pentru dark mode */
  }

  .dark {
    --bg-page:      222 47%  4%;
    --bg-card:      222 47%  7%;
    --bg-muted:     217 33% 17%;

    --text-primary:  210 40% 98%;
    --text-secondary: 215 20% 65%;
    --text-disabled:  215 16% 47%;

    --border:       217 33% 17%;
    --border-focus:  221 83% 63%;

    --accent:        224 76% 60%;
    --accent-hover:  221 83% 70%;
    --accent-subtle: 224 76%  8%;
    --accent-text:   226 100% 74%;
  }
}
\`\`\`

\`\`\`js
// tailwind.config.js — conectează variabilele la clase Tailwind
module.exports = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        page:    'hsl(var(--bg-page) / <alpha-value>)',
        card:    'hsl(var(--bg-card) / <alpha-value>)',
        muted:   'hsl(var(--bg-muted) / <alpha-value>)',
        primary: 'hsl(var(--text-primary) / <alpha-value>)',
        secondary: 'hsl(var(--text-secondary) / <alpha-value>)',
        border:  'hsl(var(--border) / <alpha-value>)',
        accent:  'hsl(var(--accent) / <alpha-value>)',
      },
    },
  },
}
\`\`\`

**Utilizare — zero dark: prefixe**

\`\`\`html
<!-- Cu design tokens proprii — funcționează automat în light și dark -->
<div class="bg-card border border-border rounded-2xl p-6">
  <h3 class="text-primary font-bold">Titlu</h3>
  <p class="text-secondary text-sm mt-1">Descriere</p>
  <button class="bg-accent text-white hover:bg-accent/90 px-4 py-2 rounded-lg mt-4">
    Acțiune
  </button>
</div>
\`\`\`

**Tailwind v4 — @theme**

\`\`\`css
/* În Tailwind v4, config se face direct în CSS */
@import "tailwindcss";

@theme {
  --color-bg-page:  oklch(100% 0 0);
  --color-bg-card:  oklch(98% 0 0);
  --color-accent:   oklch(55% 0.22 264);
}

.dark {
  --color-bg-page:  oklch(10% 0.02 264);
  --color-bg-card:  oklch(14% 0.02 264);
  --color-accent:   oklch(65% 0.22 264);
}
\`\`\`

• **CSS variables** = definești o dată, temi automat — fără dark: pe fiecare element
• **hsl() cu \`<alpha-value>\`** = suport nativ pentru opacitate (bg-accent/50) fără configurare extra
• **oklch()** în v4 = color space perceptual uniform — culorile arată consistent pe orice ecran
• **design tokens proprii** (bg-card, text-primary) = sistem scalabil, ușor de rebranded`);

// L29 — Animatii Avansate

await up('29. Animatii Avansate', 'Transition Avansata', `**Transition Avansată și Group Hover** combină proprietățile CSS de tranziție cu modifier-ul group pentru efecte interactive sofisticate fără JavaScript.

**Transition utilities — control precis**

\`\`\`html
<!-- Durate disponibile -->
<div class="transition-all duration-75">   </div>  <!-- 75ms -->
<div class="transition-all duration-150">  </div>  <!-- 150ms (default buton) -->
<div class="transition-all duration-300">  </div>  <!-- 300ms (standard UI) -->
<div class="transition-all duration-500">  </div>  <!-- 500ms (animații mai lente) -->
<div class="transition-all duration-700">  </div>  <!-- 700ms -->
<div class="transition-all duration-1000"> </div>  <!-- 1s -->

<!-- Easing functions -->
<div class="ease-linear">   </div>  <!-- viteză constantă -->
<div class="ease-in">       </div>  <!-- accelerează -->
<div class="ease-out">      </div>  <!-- decelerează (natural pentru ieșiri) -->
<div class="ease-in-out">   </div>  <!-- accelerează și decelerează -->

<!-- Transition selectivă (mai performantă decât transition-all) -->
<div class="transition-colors duration-300">   <!-- doar culori -->
<div class="transition-transform duration-300"> <!-- doar transform -->
<div class="transition-opacity duration-200">   <!-- doar opacity -->
<div class="transition-shadow duration-300">    <!-- doar shadow -->
\`\`\`

**Card cu efecte avansate group-hover**

\`\`\`html
<article class="group relative overflow-hidden rounded-2xl bg-white shadow-md
                hover:shadow-xl transition-shadow duration-300 cursor-pointer">

  <!-- Imagine cu zoom -->
  <div class="overflow-hidden aspect-video">
    <img src="..." class="w-full h-full object-cover
                          group-hover:scale-110
                          transition-transform duration-500 ease-out">
  </div>

  <!-- Overlay apare la hover -->
  <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent
              opacity-0 group-hover:opacity-100
              transition-opacity duration-300
              flex items-end p-6">
    <button class="px-4 py-2 bg-white text-slate-900 rounded-lg font-semibold
                   translate-y-4 group-hover:translate-y-0
                   transition-transform duration-300">
      Vezi detalii →
    </button>
  </div>

  <!-- Conținut text -->
  <div class="p-6">
    <h3 class="font-bold text-slate-900 group-hover:text-indigo-600
               transition-colors duration-200">
      Titlu articol
    </h3>
    <p class="text-slate-500 text-sm mt-1">Subtitlu sau dată</p>
  </div>
</article>
\`\`\`

**Buton cu efect ripple / glow**

\`\`\`html
<button class="group relative overflow-hidden
               px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold
               hover:bg-indigo-700 active:scale-95
               transition-all duration-150 shadow-md hover:shadow-indigo-500/40 hover:shadow-lg">
  <span class="relative z-10">Acțiune</span>
  <!-- Efect shimmer -->
  <div class="absolute inset-0 -translate-x-full
              group-hover:translate-x-full
              transition-transform duration-700
              bg-gradient-to-r from-transparent via-white/10 to-transparent">
  </div>
</button>
\`\`\`

**Navigation link cu underline animat**

\`\`\`html
<a href="#" class="group relative text-slate-600 hover:text-slate-900 transition-colors">
  Link
  <span class="absolute -bottom-0.5 left-0 h-0.5 bg-indigo-600
               w-0 group-hover:w-full
               transition-all duration-300 ease-out">
  </span>
</a>
\`\`\`

**Delay pentru animații succesive**

\`\`\`html
<!-- Itemele intră pe rând -->
<ul>
  <li class="opacity-0 animate-fade-in delay-0">   Item 1</li>
  <li class="opacity-0 animate-fade-in delay-100"> Item 2</li>
  <li class="opacity-0 animate-fade-in delay-200"> Item 3</li>
  <li class="opacity-0 animate-fade-in delay-300"> Item 4</li>
</ul>

<!-- delay utilities: delay-0, delay-75, delay-100, delay-150, delay-200, delay-300, delay-500, delay-700, delay-1000 -->
\`\`\`

• **transition-transform** în loc de transition-all = mai performant (GPU-accelerated, nu triggerează reflow)
• **group-hover:translate-y-0** de la **translate-y-4** = efect de "slide up" la hover — foarte natural
• **delay-**** = stagger animations (animații decalate pe rând) fără JavaScript
• **active:scale-95** = feedback haptic vizual la click — îmbunătățește feel-ul interacțiunii`);

await up('29. Animatii Avansate', 'Skeleton', `**Skeleton Loading și Shimmer Effect** sunt pattern-uri de loading state care îmbunătățesc UX-ul afișând un placeholder animat în locul conținutului care se încarcă.

**Skeleton de bază**

\`\`\`html
<!-- Skeleton simplu cu pulse -->
<div class="animate-pulse space-y-4 p-4">
  <!-- Linie titlu -->
  <div class="h-6 bg-slate-200 rounded-lg w-3/4"></div>
  <!-- Linii text -->
  <div class="space-y-2">
    <div class="h-4 bg-slate-200 rounded w-full"></div>
    <div class="h-4 bg-slate-200 rounded w-5/6"></div>
    <div class="h-4 bg-slate-200 rounded w-4/6"></div>
  </div>
  <!-- Imagine placeholder -->
  <div class="h-48 bg-slate-200 rounded-xl"></div>
</div>
\`\`\`

**Skeleton Card — structură realistă**

\`\`\`html
<div class="animate-pulse bg-white rounded-2xl shadow p-6 space-y-4">
  <!-- Header cu avatar -->
  <div class="flex items-center gap-3">
    <div class="w-10 h-10 bg-slate-200 rounded-full shrink-0"></div>
    <div class="flex-1 space-y-2">
      <div class="h-4 bg-slate-200 rounded w-1/2"></div>
      <div class="h-3 bg-slate-200 rounded w-1/3"></div>
    </div>
  </div>

  <!-- Content -->
  <div class="h-40 bg-slate-200 rounded-xl"></div>

  <!-- Footer -->
  <div class="flex gap-2">
    <div class="h-8 bg-slate-200 rounded-lg w-20"></div>
    <div class="h-8 bg-slate-200 rounded-lg w-16"></div>
  </div>
</div>
\`\`\`

**Shimmer Effect — mai premium decât pulse**

\`\`\`css
/* globals.css */
@layer utilities {
  .shimmer {
    background: linear-gradient(
      90deg,
      theme('colors.slate.200') 25%,
      theme('colors.slate.100') 50%,
      theme('colors.slate.200') 75%
    );
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
  }

  .dark .shimmer {
    background: linear-gradient(
      90deg,
      theme('colors.slate.700') 25%,
      theme('colors.slate.600') 50%,
      theme('colors.slate.700') 75%
    );
    background-size: 200% 100%;
  }

  @keyframes shimmer {
    0%   { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }
}
\`\`\`

\`\`\`html
<!-- Utilizare shimmer -->
<div class="shimmer h-6 rounded-lg w-3/4"></div>
<div class="shimmer h-4 rounded w-full mt-3"></div>
<div class="shimmer h-48 rounded-xl mt-4"></div>
\`\`\`

**Skeleton List**

\`\`\`html
<!-- Lista de iteme skeleton -->
<ul class="space-y-3">
  {[1,2,3,4,5].map(i => (
    <li class="animate-pulse flex items-center gap-4 p-3">
      <div class="w-8 h-8 bg-slate-200 rounded-full"></div>
      <div class="flex-1 space-y-1.5">
        <div class="h-4 bg-slate-200 rounded w-1/3"></div>
        <div class="h-3 bg-slate-200 rounded w-1/2"></div>
      </div>
      <div class="h-6 bg-slate-200 rounded w-16"></div>
    </li>
  ))}
</ul>
\`\`\`

**Skeleton Table**

\`\`\`html
<div class="animate-pulse">
  <div class="h-10 bg-slate-100 rounded-t-xl flex gap-4 px-4 items-center">
    <div class="h-4 bg-slate-300 rounded w-1/4"></div>
    <div class="h-4 bg-slate-300 rounded w-1/4"></div>
    <div class="h-4 bg-slate-300 rounded w-1/6 ml-auto"></div>
  </div>
  {[1,2,3,4].map(i => (
    <div class="h-12 border-b border-slate-100 flex gap-4 px-4 items-center">
      <div class="h-4 bg-slate-200 rounded w-1/4"></div>
      <div class="h-4 bg-slate-200 rounded w-1/4"></div>
      <div class="h-6 bg-slate-200 rounded-full w-16 ml-auto"></div>
    </div>
  ))}
</div>
\`\`\`

• **animate-pulse** = built-in Tailwind, simplu și performant — suficient pentru majority of cases
• **shimmer** = efect mai sofisticat cu gradientul în mișcare — implementat cu @keyframes custom
• **dark mode skeleton** = ajustează culoarea de bază la slate-700/600 în loc de slate-200/100
• **structura skeleton = structura reală** — placeholderele trebuie să mimeze exact layout-ul final`);

await up('29. Animatii Avansate', 'Accesibile', `**Animații Accesibile și Performante** asigură că efectele vizuale nu afectează utilizatorii cu sensibilitate la mișcare și că nu degradează performanța paginii.

**prefers-reduced-motion — respectă preferințele utilizatorilor**

\`\`\`html
<!-- motion-safe: aplică animația DOAR dacă utilizatorul NU a dezactivat mișcarea -->
<div class="motion-safe:animate-bounce">
  Sărituri vizibile
</div>

<!-- motion-reduce: aplică stiluri CÂND utilizatorul HA dezactivat mișcarea -->
<div class="motion-reduce:transition-none motion-reduce:transform-none
            transition-transform duration-300 hover:scale-105">
  Card cu hover (fără scale dacă prefers-reduced-motion)
</div>

<!-- Pattern recomandat: animatie default, reducere cu motion-reduce -->
<button class="transition-all duration-300 hover:scale-105 hover:shadow-lg
               motion-reduce:transition-none motion-reduce:hover:scale-100">
  Buton accesibil
</button>
\`\`\`

**Animații GPU-accelerated (performante)**

\`\`\`css
/* Proprietăți care folosesc GPU (compositor layer) — nu triggerează layout reflow */
transform:   translate, scale, rotate, skew     ✓ performant
opacity:                                         ✓ performant

/* Proprietăți care triggerează layout — evită în animații */
width, height, margin, padding, top, left        ✗ lent (reflow)
background-color                                  ~ acceptabil (repaint, nu reflow)
\`\`\`

\`\`\`html
<!-- CORECT — animație cu transform (GPU) -->
<div class="transition-transform hover:translate-y-[-4px]">Card</div>

<!-- GREȘIT — animație cu top/margin (layout reflow) -->
<div class="transition-all hover:mt-[-4px]">Card — evită!</div>

<!-- CORECT — fade in cu opacity -->
<div class="transition-opacity duration-300 opacity-0 hover:opacity-100">Element</div>
\`\`\`

**will-change — hint pentru browser**

\`\`\`html
<!-- Anunță browserul că elementul va fi animat — permite optimizare anticipată -->
<div class="will-change-transform transition-transform duration-300 hover:scale-105">
  Card animat
</div>

<!-- Disponibile: will-change-auto, will-change-scroll, will-change-contents, will-change-transform -->

<!-- IMPORTANT: nu abuza — will-change consumă memorie GPU -->
<!-- Adaugă-l doar pe elemente care chiar se animează frecvent -->
\`\`\`

**Animații de intrare cu @keyframes custom**

\`\`\`js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      keyframes: {
        'fade-up': {
          '0%':   { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-in-right': {
          '0%':   { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
      animation: {
        'fade-up':        'fade-up 0.4s ease-out',
        'fade-in':        'fade-in 0.3s ease-out',
        'slide-in-right': 'slide-in-right 0.3s ease-out',
      },
    },
  },
}
\`\`\`

\`\`\`html
<!-- Utilizare -->
<div class="motion-safe:animate-fade-up">Intru din jos</div>
<div class="motion-safe:animate-fade-in">Apar treptat</div>

<!-- Cu delay pentru stagger -->
<div class="motion-safe:animate-fade-up [animation-delay:100ms]">Item 2</div>
<div class="motion-safe:animate-fade-up [animation-delay:200ms]">Item 3</div>
\`\`\`

**Intersection Observer + Tailwind (animație la scroll)**

\`\`\`js
// Adaugă clasa la intrarea în viewport
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-fade-up');
      entry.target.classList.remove('opacity-0');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));
\`\`\`

\`\`\`html
<section data-animate class="opacity-0">Secțiune</section>
\`\`\`

• **motion-safe/motion-reduce** = standard pentru accesibilitate — always wrap animații decorative
• **transform + opacity** = proprietățile corecte pentru animații performante (GPU compositor)
• **will-change-transform** = hint util înainte de animații, dar cu moderație (cost memorie)
• **@keyframes custom** în config = animații reutilizabile ca orice utilitar Tailwind`);

// L30 — Mini Proiect SaaS Dashboard

await up('30. Mini Proiect', 'Stats Cards', `**Stats Cards și Data Display** — implementarea componentelor de afișare date pentru un dashboard SaaS, cu pattern-uri reale de design.

**Stats Card de bază**

\`\`\`html
<div class="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm
            border border-slate-100 dark:border-slate-700">
  <div class="flex items-center justify-between">
    <div>
      <p class="text-sm font-medium text-slate-500 dark:text-slate-400">Venituri lunare</p>
      <p class="text-3xl font-bold text-slate-900 dark:text-slate-100 mt-1">$12,450</p>
    </div>
    <div class="w-12 h-12 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl
                flex items-center justify-center">
      <svg class="w-6 h-6 text-indigo-600 dark:text-indigo-400">...</svg>
    </div>
  </div>
  <!-- Trend indicator -->
  <div class="flex items-center gap-1 mt-4">
    <span class="text-emerald-500 text-sm font-semibold">↑ +12.5%</span>
    <span class="text-slate-400 text-sm">față de luna trecută</span>
  </div>
</div>
\`\`\`

**Grid de 4 stats cards**

\`\`\`html
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

  <!-- Card 1: verde (pozitiv) -->
  <div class="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
    <p class="text-sm text-slate-500">Utilizatori activi</p>
    <p class="text-2xl font-bold text-slate-900 dark:text-white mt-1">2,847</p>
    <p class="text-emerald-500 text-sm mt-3 font-medium">↑ +8.2% această săptămână</p>
  </div>

  <!-- Card 2: roșu (negativ) -->
  <div class="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
    <p class="text-sm text-slate-500">Rata de abandon</p>
    <p class="text-2xl font-bold text-slate-900 dark:text-white mt-1">3.2%</p>
    <p class="text-red-500 text-sm mt-3 font-medium">↑ +0.4% față de ieri</p>
  </div>

  <!-- Card 3: amber (neutru) -->
  <div class="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
    <p class="text-sm text-slate-500">Comenzi în așteptare</p>
    <p class="text-2xl font-bold text-slate-900 dark:text-white mt-1">47</p>
    <p class="text-amber-500 text-sm mt-3 font-medium">⚠ 12 expirate</p>
  </div>

  <!-- Card 4: albastru (info) -->
  <div class="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
    <p class="text-sm text-slate-500">Scor satisfacție</p>
    <p class="text-2xl font-bold text-slate-900 dark:text-white mt-1">4.8/5</p>
    <p class="text-indigo-500 text-sm mt-3 font-medium">★ 1,247 recenzii</p>
  </div>
</div>
\`\`\`

**Progress bar card**

\`\`\`html
<div class="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm">
  <div class="flex justify-between items-center mb-2">
    <p class="text-sm font-medium text-slate-700 dark:text-slate-300">Storage folosit</p>
    <p class="text-sm font-bold text-slate-900 dark:text-white">7.2 GB / 10 GB</p>
  </div>
  <div class="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
    <div class="h-full bg-indigo-500 rounded-full transition-all duration-500"
         style="width: 72%">
    </div>
  </div>
  <p class="text-xs text-slate-400 mt-2">72% utilizat — 2.8 GB disponibili</p>
</div>
\`\`\`

**Sparkline chart simulat cu Tailwind**

\`\`\`html
<!-- Bars chart minimalist -->
<div class="flex items-end gap-1 h-12">
  <div class="flex-1 bg-indigo-200 dark:bg-indigo-900 rounded-sm" style="height:40%"></div>
  <div class="flex-1 bg-indigo-300 dark:bg-indigo-800 rounded-sm" style="height:60%"></div>
  <div class="flex-1 bg-indigo-400 dark:bg-indigo-700 rounded-sm" style="height:45%"></div>
  <div class="flex-1 bg-indigo-500 dark:bg-indigo-600 rounded-sm" style="height:80%"></div>
  <div class="flex-1 bg-indigo-600 dark:bg-indigo-500 rounded-sm" style="height:100%"></div>
  <div class="flex-1 bg-indigo-500 dark:bg-indigo-600 rounded-sm" style="height:70%"></div>
  <div class="flex-1 bg-indigo-600 rounded-sm" style="height:90%"></div>
</div>
\`\`\`

• **grid-cols-1 sm:grid-cols-2 lg:grid-cols-4** = pattern standard pentru stats cards responsive
• **culori semantice** = emerald pentru pozitiv, red pentru negativ, amber pentru avertisment, indigo pentru neutru
• **border subtil** pe card = mai bun decât shadow în dark mode (umbrele se pierd pe fond întunecat)
• **trend indicators** = ↑/↓ cu culoare + procent — context rapid fără a citi explicații lungi`);

await up('30. Mini Proiect', 'Sidebar', `**Responsive Sidebar cu Mobile Drawer** — implementarea unui sidebar de navigație care funcționează ca drawer pe mobile și sidebar fix pe desktop.

**Structura Layout**

\`\`\`html
<!-- Layout principal -->
<div class="min-h-screen bg-slate-50 dark:bg-slate-950">

  <!-- Sidebar desktop (fix, lateral) -->
  <aside id="sidebar"
         class="fixed inset-y-0 left-0 z-50 w-64
                bg-white dark:bg-slate-900
                border-r border-slate-200 dark:border-slate-700
                transform -translate-x-full lg:translate-x-0
                transition-transform duration-300 ease-in-out">

    <!-- Logo -->
    <div class="flex items-center gap-3 px-6 py-5 border-b border-slate-200 dark:border-slate-700">
      <div class="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
        <span class="text-white font-bold text-sm">A</span>
      </div>
      <span class="font-bold text-slate-900 dark:text-white">AppName</span>
    </div>

    <!-- Navigation -->
    <nav class="px-3 py-4 space-y-1">
      <!-- Item activ -->
      <a href="#" class="flex items-center gap-3 px-3 py-2 rounded-lg
                         bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400
                         font-medium text-sm">
        <svg class="w-5 h-5">...</svg>
        Dashboard
      </a>

      <!-- Item normal -->
      <a href="#" class="flex items-center gap-3 px-3 py-2 rounded-lg
                         text-slate-600 dark:text-slate-400
                         hover:bg-slate-100 dark:hover:bg-slate-800
                         hover:text-slate-900 dark:hover:text-white
                         font-medium text-sm transition-colors">
        <svg class="w-5 h-5">...</svg>
        Utilizatori
      </a>

      <!-- Separator cu label -->
      <div class="pt-4 pb-2 px-3">
        <p class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Setări</p>
      </div>

      <a href="#" class="flex items-center gap-3 px-3 py-2 rounded-lg
                         text-slate-600 dark:text-slate-400
                         hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-sm">
        <svg class="w-5 h-5">...</svg>
        Profil
      </a>
    </nav>

    <!-- User footer -->
    <div class="absolute bottom-0 left-0 right-0 p-4
                border-t border-slate-200 dark:border-slate-700">
      <div class="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer">
        <img src="..." class="w-8 h-8 rounded-full object-cover">
        <div class="flex-1 min-w-0">
          <p class="text-sm font-medium text-slate-900 dark:text-white truncate">Cristi Dev</p>
          <p class="text-xs text-slate-500 truncate">cristi@example.com</p>
        </div>
      </div>
    </div>
  </aside>

  <!-- Overlay mobile (apare când sidebar e deschis) -->
  <div id="overlay"
       class="fixed inset-0 bg-black/50 z-40 hidden lg:hidden"
       onclick="closeSidebar()">
  </div>

  <!-- Conținut principal -->
  <main class="lg:ml-64 p-6">

    <!-- Mobile header cu hamburger -->
    <header class="lg:hidden flex items-center gap-4 mb-6 p-4 bg-white dark:bg-slate-900 rounded-xl shadow-sm">
      <button onclick="openSidebar()"
              class="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
        <svg class="w-5 h-5 text-slate-600 dark:text-slate-400">
          <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" stroke-width="2"
                stroke-linecap="round"/>
        </svg>
      </button>
      <h1 class="font-bold text-slate-900 dark:text-white">Dashboard</h1>
    </header>

    <!-- Conținut pagină -->
    <div class="space-y-6">
      <!-- Adaugă conținut dashboard aici -->
    </div>
  </main>
</div>
\`\`\`

\`\`\`js
function openSidebar() {
  document.getElementById('sidebar').classList.remove('-translate-x-full');
  document.getElementById('overlay').classList.remove('hidden');
}
function closeSidebar() {
  document.getElementById('sidebar').classList.add('-translate-x-full');
  document.getElementById('overlay').classList.add('hidden');
}
\`\`\`

• **fixed + lg:translate-x-0** = sidebar fix pe desktop, drawer animat pe mobile cu un singur element
• **z-50 sidebar + z-40 overlay** = stacking context corect — overlay sub sidebar, ambele peste conținut
• **lg:ml-64** pe main = conținutul se offsetează pe desktop cât lățimea sidebar-ului
• **-translate-x-full** = ascunde sidebar off-screen (stânga) — mai bun decât display:none (animabil)`);

  console.log('Done script 6.');
  await p.$disconnect();
}

run().catch(e => { console.error(e); p.$disconnect(); process.exit(1); });
