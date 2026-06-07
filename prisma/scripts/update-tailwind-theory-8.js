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

// L33 — Animatii avansate cu Tailwind

await up('33. Animatii avansate', 'transition si animation', `**Transition și animation utilities** — controlul complet al animațiilor CSS prin clasele built-in Tailwind și extindere cu keyframes custom.

**Transition utilities — toate proprietățile**

\`\`\`html
<!-- Ce proprietăți pot tranziționa -->
<div class="transition-none">       nicio tranziție </div>
<div class="transition-all">        toate proprietățile (cel mai larg) </div>
<div class="transition-colors">     background, border, color, fill, stroke, outline </div>
<div class="transition-opacity">    opacity </div>
<div class="transition-shadow">     box-shadow </div>
<div class="transition-transform">  transform (cel mai performant - GPU) </div>

<!-- Durată -->
<div class="duration-0">      0ms — instant </div>
<div class="duration-75">     75ms — flash </div>
<div class="duration-150">    150ms — micro (butoane, focus) </div>
<div class="duration-300">    300ms — standard UI </div>
<div class="duration-500">    500ms — animații de pagină </div>
<div class="duration-700">    700ms — lent </div>
<div class="duration-1000">   1s — dramatic </div>

<!-- Easing (timing function) -->
<div class="ease-linear">    viteză constantă </div>
<div class="ease-in">        accelerare (bun pentru ieșiri) </div>
<div class="ease-out">       decelerare (bun pentru intrări) </div>
<div class="ease-in-out">    accelerare + decelerare (cel mai natural) </div>

<!-- Delay -->
<div class="delay-75 delay-100 delay-150 delay-200 delay-300 delay-500 delay-700 delay-1000">
\`\`\`

**Animații built-in**

\`\`\`html
<!-- animate-spin — loader/spinner -->
<svg class="animate-spin h-5 w-5 text-indigo-600">...</svg>

<!-- animate-ping — notification badge, pulse online -->
<span class="relative flex h-3 w-3">
  <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
  <span class="relative inline-flex h-3 w-3 rounded-full bg-indigo-600"></span>
</span>

<!-- animate-pulse — skeleton loading -->
<div class="animate-pulse bg-slate-200 rounded h-4 w-full"></div>

<!-- animate-bounce — call-to-action, scroll indicator -->
<svg class="animate-bounce w-6 h-6 text-indigo-600">↓</svg>
\`\`\`

**Keyframes custom în tailwind.config.js**

\`\`\`js
module.exports = {
  theme: {
    extend: {
      keyframes: {
        'fade-in': {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-down': {
          from: { opacity: '0', transform: 'translateY(-12px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in-left': {
          from: { transform: 'translateX(-100%)' },
          to:   { transform: 'translateX(0)' },
        },
        'accordion-down': {
          from: { height: '0' },
          to:   { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to:   { height: '0' },
        },
      },
      animation: {
        'fade-in':        'fade-in 0.3s ease-out',
        'fade-up':        'fade-up 0.4s ease-out',
        'fade-down':      'fade-down 0.4s ease-out',
        'slide-in-left':  'slide-in-left 0.3s ease-out',
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up':   'accordion-up 0.2s ease-out',
      },
    },
  },
}
\`\`\`

\`\`\`html
<!-- Utilizare -->
<div class="animate-fade-up">Intru de jos</div>
<div class="animate-fade-in delay-200">Apar cu delay</div>
<div class="motion-safe:animate-fade-up motion-reduce:animate-none">
  Respectă prefers-reduced-motion
</div>
\`\`\`

• **transition-transform** = cea mai performantă tranziție (compositor GPU — fără layout reflow)
• **ease-out** = cel mai natural pentru intrări UI, **ease-in** pentru ieșiri
• **animate-ping** = ideal pentru notification badges și indicatori "live/online"
• **motion-safe/motion-reduce** = wrap toate animațiile decorative — standard de accesibilitate`);

await up('33. Animatii avansate', 'Keyframes custom', `**Keyframes custom în Tailwind** — crearea de animații complexe prin definirea keyframes în config și utilizarea lor ca clase utilitare.

**Structura keyframes în config**

\`\`\`js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      keyframes: {
        // Sintaxă: { 'procent': { proprietate: 'valoare' } }
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%':       { transform: 'rotate(3deg)' },
        },
        'heart-beat': {
          '0%':   { transform: 'scale(1)' },
          '14%':  { transform: 'scale(1.3)' },
          '28%':  { transform: 'scale(1)' },
          '42%':  { transform: 'scale(1.3)' },
          '70%':  { transform: 'scale(1)' },
        },
        'gradient-shift': {
          '0%':   { backgroundPosition: '0% 50%' },
          '50%':  { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':       { transform: 'translateY(-10px)' },
        },
        'type-cursor': {
          '0%, 100%': { borderColor: 'transparent' },
          '50%':       { borderColor: 'currentColor' },
        },
      },
      animation: {
        'wiggle':          'wiggle 1s ease-in-out infinite',
        'heart-beat':      'heart-beat 1.3s ease-in-out infinite',
        'gradient-shift':  'gradient-shift 4s ease infinite',
        'float':           'float 3s ease-in-out infinite',
        'type-cursor':     'type-cursor 1s step-end infinite',
      },
    },
  },
}
\`\`\`

**Utilizare practică**

\`\`\`html
<!-- Wiggle pe hover (icon de notificare) -->
<button class="group p-2 rounded-lg hover:bg-slate-100">
  <svg class="w-5 h-5 group-hover:animate-wiggle">🔔</svg>
</button>

<!-- Heart beat pe like -->
<button class="animate-heart-beat text-red-500 text-2xl">❤️</button>

<!-- Background gradient animat -->
<div class="animate-gradient-shift bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
            bg-[size:200%] text-white font-bold px-6 py-3 rounded-xl">
  Gradient animat
</div>

<!-- Float — card suspendat -->
<div class="animate-float bg-white rounded-2xl shadow-xl p-6">
  Card care levitează
</div>

<!-- Cursor typing -->
<span class="border-r-2 border-slate-900 animate-type-cursor">Text scris</span>
\`\`\`

**Animație cu CSS Variables (durată/delay configurabile)**

\`\`\`html
<!-- Stagger animation cu valori arbitrare -->
<div class="animate-fade-up [animation-delay:0ms]">Item 1</div>
<div class="animate-fade-up [animation-delay:100ms]">Item 2</div>
<div class="animate-fade-up [animation-delay:200ms]">Item 3</div>
<div class="animate-fade-up [animation-delay:300ms]">Item 4</div>

<!-- Durata custom cu valoare arbitrară -->
<div class="animate-spin [animation-duration:3s]">Slow spinner</div>
<div class="animate-pulse [animation-duration:0.5s]">Fast pulse</div>
\`\`\`

**Animație la hover cu fill-mode**

\`\`\`html
<!-- forwards = rămâne în starea finală -->
<div class="animate-fade-up [animation-fill-mode:forwards] opacity-0
            hover:[animation-play-state:running]
            [animation-play-state:paused]">
  Animație pornită la hover
</div>
\`\`\`

**Loading dots**

\`\`\`html
<!-- Trei puncte de loading sincronizate -->
<div class="flex items-center gap-1">
  <div class="w-2 h-2 bg-indigo-600 rounded-full animate-bounce [animation-delay:0ms]"></div>
  <div class="w-2 h-2 bg-indigo-600 rounded-full animate-bounce [animation-delay:150ms]"></div>
  <div class="w-2 h-2 bg-indigo-600 rounded-full animate-bounce [animation-delay:300ms]"></div>
</div>
\`\`\`

• **keyframes în config** = animații reutilizabile ca orice clasă Tailwind (animate-wiggle, animate-float)
• **valori arbitrare** ([animation-delay:200ms]) = control fin fără a adăuga în config
• **animation-fill-mode:forwards** = elementul rămâne în starea finală — esențial pentru animații de intrare
• **stagger** = delay incremental pe elemente dintr-o listă — efect "unul câte unul" fără JS`);

await up('33. Animatii avansate', 'Group, peer', `**Group, Peer și animații interactive** — combinarea modifier-elor group și peer cu animații pentru interacțiuni complexe bazate pe starea elementelor.

**Group — animații declanșate de parent**

\`\`\`html
<!-- Card cu animații multiple la hover -->
<article class="group relative overflow-hidden bg-white rounded-2xl shadow-md
                hover:shadow-2xl transition-shadow duration-300 cursor-pointer">

  <!-- Imagine: zoom + overlay -->
  <div class="relative overflow-hidden aspect-video">
    <img src="..." class="w-full h-full object-cover
                          group-hover:scale-110 transition-transform duration-500 ease-out">
    <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent
                opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
  </div>

  <!-- Badge care apare la hover -->
  <span class="absolute top-3 right-3 px-2 py-1 bg-indigo-600 text-white text-xs rounded-full
               opacity-0 group-hover:opacity-100
               translate-y-[-8px] group-hover:translate-y-0
               transition-all duration-300">
    New
  </span>

  <!-- Content: titlu schimbă culoarea -->
  <div class="p-5">
    <h3 class="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">Titlu</h3>
    <p class="text-slate-500 text-sm mt-1">Descriere card</p>

    <!-- Buton slide-in din dreapta -->
    <div class="flex items-center gap-2 mt-4
                translate-x-4 opacity-0
                group-hover:translate-x-0 group-hover:opacity-100
                transition-all duration-300 delay-75">
      <span class="text-indigo-600 font-medium text-sm">Aflați mai mult</span>
      <svg class="w-4 h-4 text-indigo-600">→</svg>
    </div>
  </div>
</article>
\`\`\`

**Peer — animații declanșate de sibling**

\`\`\`html
<!-- Checkbox cu label animat -->
<label class="flex items-center gap-3 cursor-pointer group">
  <input type="checkbox" class="peer sr-only">

  <!-- Custom checkbox -->
  <div class="w-5 h-5 border-2 border-slate-300 rounded
              peer-checked:bg-indigo-600 peer-checked:border-indigo-600
              transition-colors duration-200
              flex items-center justify-center">
    <svg class="w-3 h-3 text-white opacity-0 peer-checked:opacity-100 scale-0 peer-checked:scale-100
                transition-all duration-200">✓</svg>
  </div>

  <span class="text-slate-700 peer-checked:text-indigo-600 peer-checked:line-through
               transition-colors duration-200">
    Task completat
  </span>
</label>
\`\`\`

**Input cu label flotant (peer)**

\`\`\`html
<div class="relative">
  <input type="text" id="name" placeholder=" "
         class="peer w-full border border-slate-300 rounded-lg px-3 pt-5 pb-2 text-sm
                focus:outline-none focus:border-indigo-500 transition-colors">
  <label for="name"
         class="absolute left-3 top-3.5 text-slate-400 text-sm
                peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-indigo-500
                peer-not-placeholder-shown:top-1.5 peer-not-placeholder-shown:text-xs
                transition-all duration-200">
    Nume complet
  </label>
</div>
\`\`\`

**Named groups pentru animații imbricate**

\`\`\`html
<div class="group/outer bg-slate-100 p-6 rounded-2xl hover:bg-indigo-50">
  <h2 class="font-bold group-hover/outer:text-indigo-700 transition-colors">Outer</h2>

  <div class="group/inner mt-4 bg-white p-4 rounded-xl hover:shadow-md">
    <p class="group-hover/inner:text-indigo-600 group-hover/outer:text-slate-700 transition-colors">
      Reacționează la AMBELE hover-uri independent
    </p>
  </div>
</div>
\`\`\`

• **group-hover:translate + opacity** = combo clasic pentru "reveal la hover" — natural și performant
• **delay pe child elements** = delay-75/150/200 pe elemente diferite → stagger effect fără JS
• **peer pentru checkbox custom** = cel mai comun use case peer — înlocuiește input[type=checkbox]:checked CSS
• **named groups** = soluția pentru animații imbricate — evită conflictele entre nivelele de group`);

await up('33. Animatii avansate', 'Intersect', `**Intersect, motion-safe și animații accesibile** — declanșarea animațiilor când elementele devin vizibile în viewport și respectarea preferințelor utilizatorilor.

**Intersection Observer + Tailwind**

\`\`\`js
// setup-animations.js — script client-side
document.addEventListener('DOMContentLoaded', () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          // Opțional: unobserve după prima apariție
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,    // 15% din element trebuie să fie vizibil
      rootMargin: '0px 0px -50px 0px',  // trigger 50px mai devreme
    }
  );

  document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));
});
\`\`\`

\`\`\`css
/* globals.css */
[data-animate] {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

[data-animate].is-visible {
  opacity: 1;
  transform: translateY(0);
}

/* Respectă prefers-reduced-motion */
@media (prefers-reduced-motion: reduce) {
  [data-animate] {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
\`\`\`

\`\`\`html
<!-- Utilizare pe elemente -->
<section data-animate class="py-16">...</section>
<div data-animate style="transition-delay: 200ms" class="card">Card 2</div>
<div data-animate style="transition-delay: 400ms" class="card">Card 3</div>
\`\`\`

**Tailwind v4 @variant intersect (built-in)**

\`\`\`css
/* globals.css cu Tailwind v4 */
@import "tailwindcss";
@plugin "@tailwindcss/intersect";
\`\`\`

\`\`\`html
<!-- Clasa se aplică când elementul e în viewport -->
<div class="opacity-0 intersect:opacity-100 intersect:translate-y-0
            translate-y-8 transition-all duration-500">
  Apare la scroll
</div>

<!-- Once: animează o singură dată -->
<div class="opacity-0 intersect-once:opacity-100 transition-opacity duration-700">
  Fade in o dată
</div>
\`\`\`

**motion-safe și motion-reduce — standard**

\`\`\`html
<!-- Animație completă cu fallback accesibil -->
<div class="
  opacity-0 translate-y-4
  motion-safe:transition-all motion-safe:duration-500
  motion-safe:is-visible:opacity-100 motion-safe:is-visible:translate-y-0
  motion-reduce:opacity-100 motion-reduce:translate-y-0
" data-animate>
  Conținut animat accesibil
</div>
\`\`\`

**Pattern complet Next.js — AnimateOnView component**

\`\`\`tsx
'use client';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

export function AnimateOnView({ children, className, delay = 0 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: \`\${delay}ms\` }}
      className={cn(
        'transition-all duration-700 ease-out',
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6',
        className
      )}>
      {children}
    </div>
  );
}

// Utilizare
<AnimateOnView delay={0}  ><Card /></AnimateOnView>
<AnimateOnView delay={150}><Card /></AnimateOnView>
<AnimateOnView delay={300}><Card /></AnimateOnView>
\`\`\`

• **Intersection Observer** = standard pentru animații la scroll — fără librării externe, performant
• **motion-safe** pe fiecare animație decorativă = respectă setările OS pentru utilizatori sensibili la mișcare
• **once = unobserve** după prima apariție = nu re-animă la scroll înapoi (mai natural)
• **delay** pe elemente dintr-o listă = stagger effect elegant fără JavaScript complex`);

// L34 — Performance si optimizare

await up('34. Performance', 'JIT, purging', `**JIT, Purging și dimensiunea bundle-ului** — cum Tailwind elimină CSS nefolosit și ce poți face pentru un bundle cât mai mic în producție.

**Cum funcționează JIT în producție**

\`\`\`bash
# Fără optimizare (Tailwind v2 fără purge):
# ~3.5 MB de CSS — toate utilitarele posibile

# Cu JIT/purge (Tailwind v3+, producție):
# ~8-20 KB — doar clasele folosite efectiv în cod
# Factor de reducere: 100-400x
\`\`\`

**Content paths — detectarea claselor**

\`\`\`js
// tailwind.config.js — TREBUIE să includă toate fișierele cu clase Tailwind
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts}',          // dacă generezi clase din lib/
    './content/**/*.{md,mdx}',     // dacă ai clase în Markdown
    './node_modules/some-ui/**/*.js', // componente externe
  ],
}
\`\`\`

**Clase dinamice — greșeala clasică**

\`\`\`tsx
// GREȘIT — JIT nu poate detecta aceste clase
const colors = ['red', 'green', 'blue'];
return <div className={\`bg-\${color}-500\`}>;   // LIPSESC din bundle!

// CORECT — clase complete, detectabile static
const colorMap = {
  red:   'bg-red-500',
  green: 'bg-green-500',
  blue:  'bg-blue-500',
} as const;
return <div className={colorMap[color]}>

// SAU cu safelist în config (ultimă opțiune)
module.exports = {
  safelist: [
    { pattern: /bg-(red|green|blue)-500/ },
  ],
}
\`\`\`

**Safelisting dinamic (CMS, baze de date)**

\`\`\`js
// Când clasele vin din API/DB și nu pot fi staticizate
module.exports = {
  safelist: [
    // Clase specifice
    'bg-indigo-500', 'bg-emerald-500', 'bg-red-500',
    // Pattern regex
    { pattern: /^(bg|text|border)-(slate|indigo|emerald|red)-(100|500|900)$/ },
    // Pattern cu variante
    { pattern: /bg-indigo-(100|500)/, variants: ['hover', 'dark'] },
  ],
}
\`\`\`

**Verificarea dimensiunii bundle-ului**

\`\`\`bash
# Build și analiză CSS
npm run build
# Verifică .next/static/css/*.css pentru dimensiunea CSS

# Sau generează direct:
npx tailwindcss -i ./src/app/globals.css -o ./dist/output.css --minify
ls -lh ./dist/output.css   # dimensiunea în KB

# Analyzer pentru tot bundle-ul (Next.js)
npm install @next/bundle-analyzer
\`\`\`

**Optimizări pentru bundle mai mic**

\`\`\`js
// 1. Evită content paths prea largi
// BAD:
content: ['./**/*']
// GOOD:
content: ['./app/**/*.tsx', './components/**/*.tsx']

// 2. Exclude fișiere irelevante
content: [
  './app/**/*.tsx',
  '!./app/**/*.test.tsx',      // teste
  '!./app/**/*.stories.tsx',   // Storybook
]

// 3. Evită clase arbitrare excesive — cresc bundle-ul
// BAD: 50 de w-[Xpx] diferite
// GOOD: adaugă în theme.extend.spacing valorile frecvente
theme: { extend: { spacing: { '13': '3.25rem', '18': '4.5rem' } } }
\`\`\`

**Production build vs Development**

\`\`\`
Development:
  - Toate utilitarele incluse (fără purge)
  - Hot reload rapid
  - CSS ~3.5 MB (în memorie, nu pe disc)

Production (NODE_ENV=production):
  - Purge automat: ~8-20 KB CSS final
  - Minificare activă
  - No source maps pentru CSS
\`\`\`

• **JIT + purge** = operează automat în production — nu necesită config extra în Next.js
• **clase dinamice** (template literals cu variabile) = singura sursă reală de pierdere clase în producție
• **content paths precise** = build mai rapid și sigur că nu lipsesc clase
• **safelist cu pattern** = soluția corectă pentru clase generate din date externe (CMS, DB)`);

await up('34. Performance', 'Separarea stilurilor', `**Separarea stilurilor și clase reutilizabile** — strategii pentru organizarea CSS-ului Tailwind în proiecte mari fără a sacrifica flexibilitatea.

**Problema: class hell în JSX**

\`\`\`tsx
// Greu de citit și menținut
<button className="inline-flex items-center justify-center whitespace-nowrap rounded-md
  text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none
  focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none
  disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
  Buton
</button>
\`\`\`

**Soluția 1: @apply în CSS Module**

\`\`\`css
/* components/Button.module.css */
.btn {
  @apply inline-flex items-center justify-center
         rounded-md text-sm font-medium
         transition-colors focus-visible:ring-2
         disabled:pointer-events-none disabled:opacity-50;
}

.btnPrimary  { @apply bg-indigo-600 text-white hover:bg-indigo-700; }
.btnSecondary { @apply bg-slate-100 text-slate-700 hover:bg-slate-200; }
.btnSm  { @apply h-8 px-3 text-xs; }
.btnMd  { @apply h-10 px-4; }
.btnLg  { @apply h-12 px-6 text-base; }
\`\`\`

\`\`\`tsx
import styles from './Button.module.css';
import { cn } from '@/lib/utils';

export function Button({ variant = 'primary', size = 'md', className, ...props }) {
  return (
    <button className={cn(
      styles.btn,
      styles[variant === 'primary' ? 'btnPrimary' : 'btnSecondary'],
      styles[\`btn\${size.charAt(0).toUpperCase() + size.slice(1)}\`],
      className
    )} {...props} />
  );
}
\`\`\`

**Soluția 2: cva (class-variance-authority)**

\`\`\`ts
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const card = cva(
  'bg-white rounded-2xl border border-slate-100 shadow-sm',
  {
    variants: {
      padding: {
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
      },
      interactive: {
        true: 'cursor-pointer hover:shadow-md hover:border-slate-200 transition-all',
      },
    },
    defaultVariants: { padding: 'md' },
  }
);

<div className={cn(card({ padding: 'lg', interactive: true }), 'custom-extra')}>
  Card mare, interactiv
</div>
\`\`\`

**Soluția 3: @layer components în globals.css**

\`\`\`css
@layer components {
  /* Clase comune la nivel de aplicație */
  .page-container  { @apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8; }
  .section-header  { @apply text-3xl font-bold text-slate-900 dark:text-white; }
  .card            { @apply bg-white dark:bg-slate-800 rounded-2xl shadow-sm p-6; }
  .btn-primary     { @apply bg-indigo-600 text-white rounded-lg px-4 py-2 hover:bg-indigo-700 transition-colors; }
  .input-base      { @apply w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors; }
  .badge-green     { @apply bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full text-xs font-medium; }
  .badge-red       { @apply bg-red-100 text-red-700 px-2 py-0.5 rounded-full text-xs font-medium; }
}
\`\`\`

**Când să folosești fiecare abordare**

\`\`\`
Direct în JSX (clase Tailwind) = componente mici, one-off, prototipuri
@apply în CSS Module  = componente mari, frecvent reutilizate, stiluri complexe
cva = componente cu variante multiple (Button, Badge, Input)
@layer components     = clase globale (layout, tipografie, utilitare comune)
\`\`\`

• **@apply** = extrage clase repetate — bun pentru componente mari, dar nu abuzați (sacrifică flexibility)
• **cva** = standard pentru design systems — type-safe, documentat, ușor de extins
• **@layer components** = pentru clase globale ale aplicației — le poți override cu utilitare Tailwind
• **directe în JSX** = preferabil pentru componente simple — mai ușor de înțeles la o citire`);

await up('34. Performance', 'Critical CSS', `**Critical CSS și loading strategy** — tehnici pentru a livra CSS-ul Tailwind cât mai rapid utilizatorilor, cu focus pe First Paint și Core Web Vitals.

**Cum Next.js gestionează CSS Tailwind**

\`\`\`
Next.js App Router:
  1. CSS global (globals.css) → inclus în <head> al paginii
  2. CSS Module → hashed și split per componentă
  3. Tailwind JIT → toate clasele dintr-un singur fișier CSS

Avantaj: Next.js face automatic code splitting și critical CSS extraction
Dezavantaj: fișierul CSS Tailwind poate fi considerat "render-blocking"
\`\`\`

**Optimizarea dimensiunii CSS**

\`\`\`js
// next.config.js — optimizări CSS
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizeCss: true,  // critters — inline critical CSS automat
  },
};

// Rezultat: CSS above-the-fold inlined în <head>,
//           restul lazy-loaded după load
\`\`\`

**Font loading cu Tailwind**

\`\`\`tsx
// app/layout.tsx — Next.js font optimization
import { Inter, JetBrains_Mono } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',  // nu blochează render
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export default function RootLayout({ children }) {
  return (
    <html lang="ro" className={\`\${inter.variable} \${mono.variable}\`}>
      <body className="font-sans bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
\`\`\`

\`\`\`js
// tailwind.config.js — folosește variabilele CSS pentru fonturi
theme: {
  extend: {
    fontFamily: {
      sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      mono: ['var(--font-mono)', 'Consolas', 'monospace'],
    },
  },
}
\`\`\`

**Layer ordering pentru First Paint rapid**

\`\`\`css
/* globals.css — ordinea importurilor contează */
@tailwind base;         /* reset CSS — mic, necesar */
@tailwind components;   /* componente custom */
@tailwind utilities;    /* utilitarele — marea majoritate */

/* Stiluri critice above-the-fold */
@layer base {
  body { @apply bg-background text-foreground; }
  /* Layout-ul principal — vizibil imediat */
}

/* Stiluri necritice — pot fi lazy */
@layer components {
  .complex-chart { ... }
  .pdf-viewer { ... }
}
\`\`\`

**Purge aggressive pentru production**

\`\`\`js
module.exports = {
  content: [
    './app/**/*.{tsx,ts}',
    './components/**/*.{tsx,ts}',
    // NU include: node_modules (fără whitelist), *.test.tsx, *.stories.tsx
  ],
  // Activare safelist minimală — nu adăuga mai mult decât e necesar
  safelist: process.env.NODE_ENV === 'production' ? [] : [
    // Clase utile în development (storybook, etc.)
    { pattern: /.*/ },
  ],
}
\`\`\`

**Core Web Vitals și CSS**

\`\`\`
LCP (Largest Contentful Paint) — îmbunătățiri CSS:
  ✓ preload font-urilor critice
  ✓ optimizeCss: true (critical CSS inline)
  ✓ aspect-ratio pe imagini (evită layout shift)

CLS (Cumulative Layout Shift) — îmbunătățiri:
  ✓ min-h-[...] pe containere dinamice
  ✓ aspect-video/aspect-square pe imagini
  ✓ skeleton loading cu dimensiuni fixe

FID/INP — Tailwind nu afectează direct, dar:
  ✓ animații pe compositor (transform/opacity)
  ✓ will-change-transform pe elemente frecvent animate
\`\`\`

• **optimizeCss: true** în Next.js = critical CSS inline automat — îmbunătățire FCP semnificativă
• **next/font cu display:swap** = fonturi fără render blocking — text vizibil imediat cu fallback
• **aspect-ratio pe imagini** = previne CLS (Cumulative Layout Shift) — scor PageSpeed mai bun
• **content paths precise** = build mai rapid + bundle mai mic + mai puțin risc de clase lipsă`);

await up('34. Performance', 'Debugging', `**Debugging și Tooling pentru Tailwind** — unelte și tehnici pentru a diagnostica probleme, inspecta clase generate și optimiza fluxul de lucru.

**Tailwind CSS IntelliSense — extension VS Code**

\`\`\`
Funcții oferite:
  ✓ Autocompletare pentru toate clasele Tailwind
  ✓ Preview culori, shadow, font-size inline în editor
  ✓ Hover pentru a vedea CSS generat de clasă
  ✓ Lint pentru clase invalide sau conflictuale
  ✓ Navigare la definiția din config

Instalare: Extensions → "Tailwind CSS IntelliSense" (Tailwind Labs)
\`\`\`

**Prettier plugin pentru sortarea claselor**

\`\`\`bash
npm install -D prettier-plugin-tailwindcss

# .prettierrc
{
  "plugins": ["prettier-plugin-tailwindcss"],
  "tailwindConfig": "./tailwind.config.js"
}

# Sortarea automată: layout → spacing → typography → colors → effects
# bg-white p-4 flex → flex p-4 bg-white  (ordinea recomandată)
\`\`\`

**Debugging: clasa nu se aplică**

\`\`\`
Checklist:
1. Clasa e în content paths? → tailwind.config.js content[]
2. Clasa e dinamica (bg-color)? → JIT nu o detectează
3. Conflict cu altă clasă? → twMerge rezolvă asta
4. Specificity override? → stiluri externe câștigă
5. Dark mode activ? → html trebuie să aibă class="dark"
\`\`\`

\`\`\`bash
# Generează CSS și caută clasa în output
npx tailwindcss -i ./app/globals.css -o /tmp/tw-debug.css
grep "flex-col" /tmp/tw-debug.css    # există în bundle?
\`\`\`

**twMerge — debugging conflicte**

\`\`\`ts
import { twMerge } from 'tailwind-merge';

// Problema: ambele clase existente, dar se bat
'p-2 p-4'         // → care câștigă? (ultimul în CSS, nu în className)
'text-red-500 text-blue-500'  // → care culoare?

// twMerge rezolvă corect: ultimul câștigă
twMerge('p-2 p-4')                    // → 'p-4'
twMerge('text-red-500 text-blue-500') // → 'text-blue-500'
twMerge('px-4 p-2')                   // → 'p-2' (p-2 overrides px-4)

// Debug ce face twMerge:
console.log(twMerge('flex items-center p-4', 'p-6 block'));
// → 'flex items-center p-6 block'
\`\`\`

**Tailwind Play — debugging online**

\`\`\`
play.tailwindcss.com — editor browser-based cu:
  ✓ config personalizat
  ✓ live preview
  ✓ partajare link
  ✓ CDN versiuni multiple

Util pentru: reproducere bugs, testare componente izolate
\`\`\`

**DevTools — inspecție clase**

\`\`\`
Chrome DevTools → Elements → Styles:
  - Fiecare clasă Tailwind apare separat
  - Poți vedea exact care CSS property e aplicată
  - Strikethrough = overridden de altă clasă
  - Click pe clasa CSS → sursa în globals.css

Trucuri:
  - Adaugă temporar clase în "element.style" pentru test
  - Force state: :hover, :focus, :active (buton . în DevTools)
\`\`\`

**Verificarea config**

\`\`\`js
// Script quick pentru a verifica ce generează config-ul
const resolveConfig = require('tailwindcss/resolveConfig');
const tailwindConfig = require('./tailwind.config.js');
const fullConfig = resolveConfig(tailwindConfig);

console.log(fullConfig.theme.colors.indigo);  // → toate nuanțele indigo
console.log(fullConfig.theme.screens);        // → breakpoints
console.log(fullConfig.theme.spacing);        // → scale spacing
\`\`\`

• **IntelliSense** = esențial — autocompletare + preview CSS inline economisesc mult timp
• **prettier-plugin-tailwindcss** = sortarea automată a claselor — cod consistent, mai ușor de citit
• **twMerge** = soluția pentru conflicte de clase — \`cn()\` din shadcn o include by default
• **play.tailwindcss.com** = sandbox rapid pentru testare și reproducere issues`);

// L35 — Tailwind in Next.js Proiect complet

await up('35. Tailwind in Next.js', 'Setup Tailwind in Next.js', `**Setup Tailwind în Next.js App Router** — configurarea completă de la zero a Tailwind CSS într-un proiect Next.js cu App Router.

**Creare proiect nou cu Tailwind inclus**

\`\`\`bash
# create-next-app include Tailwind în opțiuni
npx create-next-app@latest my-app

# Opțiuni recomandate:
# ✓ TypeScript
# ✓ ESLint
# ✓ Tailwind CSS
# ✓ App Router
# ✓ src/ directory (opțional)
# ✓ import alias: @/*
\`\`\`

**Fișierele generate automat**

\`\`\`
tailwind.config.ts     — configurare
postcss.config.mjs     — PostCSS setup
app/globals.css        — @tailwind directivele
\`\`\`

**globals.css — punct de start recomandat**

\`\`\`css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  *, *::before, *::after { box-sizing: border-box; }

  :root {
    --color-background: 0 0% 100%;
    --color-foreground: 222 47% 11%;
    --color-primary: 221 83% 53%;
    --color-primary-hover: 224 76% 48%;
  }

  .dark {
    --color-background: 222 47% 4%;
    --color-foreground: 210 40% 98%;
    --color-primary: 217 91% 60%;
  }

  body {
    @apply bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-50;
    font-feature-settings: "rlig" 1, "calt" 1;
    -webkit-font-smoothing: antialiased;
  }
}
\`\`\`

**tailwind.config.ts — setup complet**

\`\`\`ts
import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'Consolas', 'monospace'],
      },
      colors: {
        background: 'hsl(var(--color-background) / <alpha-value>)',
        foreground: 'hsl(var(--color-foreground) / <alpha-value>)',
        primary:    'hsl(var(--color-primary) / <alpha-value>)',
      },
      animation: {
        'fade-in':  'fade-in 0.3s ease-out',
        'fade-up':  'fade-up 0.4s ease-out',
      },
      keyframes: {
        'fade-in': { from: { opacity: '0' }, to: { opacity: '1' } },
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
\`\`\`

**app/layout.tsx — root layout cu fonturi**

\`\`\`tsx
import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import './globals.css';

export const metadata: Metadata = {
  title: 'App',
  description: 'Descriere aplicație',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ro" className={\`\${GeistSans.variable} \${GeistMono.variable}\`}>
      <body className="min-h-screen bg-white dark:bg-slate-950 antialiased">
        {children}
      </body>
    </html>
  );
}
\`\`\`

**Verificare că funcționează**

\`\`\`tsx
// app/page.tsx — test rapid
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
        Tailwind funcționează!
      </h1>
      <p className="mt-4 text-slate-600 dark:text-slate-400">
        Proiect configurat corect.
      </p>
      <button className="mt-6 px-6 py-3 bg-indigo-600 hover:bg-indigo-700
                         text-white rounded-xl font-semibold transition-colors">
        Buton test
      </button>
    </main>
  );
}
\`\`\`

• **create-next-app** = cel mai simplu start — include Tailwind + PostCSS configurat automat
• **darkMode: 'class'** = standard pentru dark mode cu toggle manual (nu automat din OS)
• **CSS variables în colors** = design system flexibil, schimbi tema din 2-3 variabile
• **GeistSans/GeistMono** = fonturile folosite de Vercel/Next.js — incluse în pachetul geist`);

await up('35. Tailwind in Next.js', 'Dark mode cu next-themes', `**Dark mode cu next-themes** — implementarea completă a sistemului de teme în Next.js App Router cu persistare localStorage și suport SSR.

**Instalare**

\`\`\`bash
npm install next-themes
\`\`\`

**Configurare tailwind.config**

\`\`\`ts
// tailwind.config.ts
const config: Config = {
  darkMode: 'class',   // IMPORTANT: 'class' nu 'media'
  // ...
};
\`\`\`

**Providers — app/providers.tsx**

\`\`\`tsx
'use client';
import { ThemeProvider } from 'next-themes';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"         // adaugă class="dark" pe <html>
      defaultTheme="system"     // urmează OS by default
      enableSystem              // permite opțiunea "system"
      disableTransitionOnChange // evită flash la schimbarea temei
    >
      {children}
    </ThemeProvider>
  );
}
\`\`\`

**app/layout.tsx — integrare**

\`\`\`tsx
import { Providers } from './providers';

export default function RootLayout({ children }) {
  return (
    <html lang="ro" suppressHydrationWarning>
      {/* suppressHydrationWarning = necesar pentru next-themes (SSR mismatch) */}
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
\`\`\`

**ThemeToggle component**

\`\`\`tsx
'use client';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Evită hydration mismatch — renderează placeholder până la mount
  if (!mounted) {
    return <div className="w-9 h-9 rounded-lg" />;
  }

  return (
    <button
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      className="flex h-9 w-9 items-center justify-center rounded-lg
                 border border-slate-200 dark:border-slate-700
                 bg-white dark:bg-slate-800
                 hover:bg-slate-100 dark:hover:bg-slate-700
                 text-slate-600 dark:text-slate-400
                 transition-colors"
      aria-label="Schimbă tema"
    >
      {resolvedTheme === 'dark' ? (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>
        </svg>
      ) : (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
        </svg>
      )}
    </button>
  );
}
\`\`\`

**Sistem complet light/dark cu CSS variables**

\`\`\`css
/* globals.css */
:root {
  --background: 0 0% 100%;
  --foreground: 222 47% 11%;
  --card: 0 0% 100%;
  --border: 214 32% 91%;
  --primary: 221 83% 53%;
  --muted: 210 40% 96%;
}

.dark {
  --background: 222 47% 4%;
  --foreground: 210 40% 98%;
  --card: 222 47% 7%;
  --border: 217 33% 17%;
  --primary: 217 91% 65%;
  --muted: 217 33% 17%;
}
\`\`\`

• **suppressHydrationWarning** pe \`<html>\` = obligatoriu cu next-themes — previne eroarea de hydration
• **mounted state** = renderezi toggle-ul abia după mount pe client — evită mismatch SSR/client
• **resolvedTheme** vs **theme** = resolvedTheme dă "light"/"dark" chiar când theme e "system"
• **disableTransitionOnChange** = previne flash-ul de tranziție la schimbarea temei`);

await up('35. Tailwind in Next.js', 'Layout patterns', `**Layout patterns comune cu Tailwind în Next.js** — implementarea celor mai frecvente structuri de layout pentru aplicații web moderne.

**App Shell — layout de bază**

\`\`\`tsx
// app/layout.tsx sau app/(app)/layout.tsx
export default function AppLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Navbar fix */}
      <header className="fixed top-0 left-0 right-0 z-50 h-16
                         bg-white/80 dark:bg-slate-900/80 backdrop-blur-md
                         border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
          <a href="/" className="font-bold text-lg text-slate-900 dark:text-white">Logo</a>
          <nav className="flex items-center gap-6">
            <a href="/features" className="text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors">Features</a>
            <a href="/pricing" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">Pricing</a>
            <a href="/login" className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors">Login</a>
          </nav>
        </div>
      </header>

      {/* Conținut cu offset pentru navbar */}
      <main className="pt-16">{children}</main>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-slate-500">
          © 2024 AppName. Toate drepturile rezervate.
        </div>
      </footer>
    </div>
  );
}
\`\`\`

**Dashboard Layout (sidebar + content)**

\`\`\`tsx
// app/(dashboard)/layout.tsx
export default function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-slate-950">
      {/* Sidebar fix */}
      <aside className="hidden md:flex md:w-64 md:flex-col
                        bg-white dark:bg-slate-900
                        border-r border-slate-200 dark:border-slate-800">
        <div className="p-6 border-b border-slate-200 dark:border-slate-800">
          <span className="font-bold text-slate-900 dark:text-white">Dashboard</span>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {/* Nav items */}
        </nav>
      </aside>

      {/* Main content — scrollable */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white dark:bg-slate-900
                           border-b border-slate-200 dark:border-slate-800
                           flex items-center px-6">
          <h1 className="font-semibold text-slate-900 dark:text-white">Pagina curentă</h1>
        </header>
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
\`\`\`

**Hero Section**

\`\`\`tsx
<section className="relative overflow-hidden py-24 md:py-32">
  {/* Background gradient */}
  <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50
                  dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950" />

  <div className="relative max-w-4xl mx-auto px-4 text-center">
    <span className="inline-block px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30
                     text-indigo-700 dark:text-indigo-300
                     text-sm font-medium rounded-full mb-6">
      ✨ Noutate
    </span>
    <h1 className="text-4xl md:text-6xl font-bold tracking-tight
                   text-slate-900 dark:text-white text-balance">
      Titlu principal al aplicației
    </h1>
    <p className="mt-6 text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
      Descriere care explică valoarea produsului în 1-2 propoziții.
    </p>
    <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
      <a href="/signup" className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700
                                   text-white font-semibold rounded-xl transition-colors">
        Începe gratuit →
      </a>
      <a href="/demo" className="px-6 py-3 border border-slate-300 dark:border-slate-700
                                  text-slate-700 dark:text-slate-300
                                  hover:bg-slate-50 dark:hover:bg-slate-800
                                  font-semibold rounded-xl transition-colors">
        Vizualizează demo
      </a>
    </div>
  </div>
</section>
\`\`\`

• **fixed navbar + pt-16** pe main = pattern standard — navbar fix fără a ascunde conținut
• **flex h-screen overflow-hidden** + **flex-1 overflow-y-auto** = sidebar fix + content scrollabil
• **Route Groups** (app/(dashboard)/) = layout-uri separate fără a afecta URL-ul
• **text-balance** pe headings = browser optimizează împărțirea textului pe rânduri (CSS modern)`);

await up('35. Tailwind in Next.js', 'Componente de productie', `**Componente de producție: Card, Table, Form** — implementarea completă a componentelor UI esențiale pentru orice aplicație Next.js + Tailwind.

**Card de produs — ecommerce**

\`\`\`tsx
interface ProductCardProps {
  image: string;
  title: string;
  price: number;
  badge?: string;
  rating: number;
  reviews: number;
}

export function ProductCard({ image, title, price, badge, rating, reviews }: ProductCardProps) {
  return (
    <article className="group bg-white dark:bg-slate-800 rounded-2xl overflow-hidden
                        border border-slate-100 dark:border-slate-700
                        hover:shadow-lg transition-shadow duration-300">
      {/* Imagine */}
      <div className="relative overflow-hidden aspect-square bg-slate-100">
        <img src={image} alt={title}
             className="w-full h-full object-cover
                        group-hover:scale-105 transition-transform duration-500" />
        {badge && (
          <span className="absolute top-3 left-3 px-2 py-1 bg-indigo-600 text-white
                           text-xs font-semibold rounded-full">
            {badge}
          </span>
        )}
        <button className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full
                           shadow flex items-center justify-center
                           opacity-0 group-hover:opacity-100 transition-opacity">
          ♡
        </button>
      </div>
      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-slate-900 dark:text-white text-sm line-clamp-2">
          {title}
        </h3>
        <div className="flex items-center gap-1 mt-1">
          <span className="text-amber-400 text-xs">{'★'.repeat(Math.round(rating))}</span>
          <span className="text-slate-400 text-xs">({reviews})</span>
        </div>
        <div className="flex items-center justify-between mt-3">
          <span className="text-lg font-bold text-slate-900 dark:text-white">{price} lei</span>
          <button className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700
                             text-white text-xs font-semibold rounded-lg transition-colors">
            Adaugă
          </button>
        </div>
      </div>
    </article>
  );
}
\`\`\`

**Tabel de date**

\`\`\`tsx
export function DataTable({ columns, data }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700">
      <table className="w-full text-sm">
        <thead className="bg-slate-50 dark:bg-slate-800">
          <tr>
            {columns.map(col => (
              <th key={col.key}
                  className="px-4 py-3 text-left font-semibold text-slate-600 dark:text-slate-400
                             first:pl-6 last:pr-6">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
          {data.map((row, i) => (
            <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
              {columns.map(col => (
                <td key={col.key}
                    className="px-4 py-3 text-slate-700 dark:text-slate-300 first:pl-6 last:pr-6">
                  {row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
\`\`\`

**Formular de contact**

\`\`\`tsx
export function ContactForm() {
  return (
    <form className="space-y-5 max-w-lg">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
            Prenume
          </label>
          <input type="text"
                 className="w-full border border-slate-300 dark:border-slate-600
                            bg-white dark:bg-slate-800
                            text-slate-900 dark:text-slate-100
                            rounded-lg px-3 py-2.5 text-sm
                            focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500
                            placeholder:text-slate-400 transition-colors" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
            Nume
          </label>
          <input type="text"
                 className="w-full border border-slate-300 dark:border-slate-600
                            bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100
                            rounded-lg px-3 py-2.5 text-sm
                            focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500
                            placeholder:text-slate-400 transition-colors" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
          Mesaj
        </label>
        <textarea rows={4}
                  className="w-full border border-slate-300 dark:border-slate-600
                             bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100
                             rounded-lg px-3 py-2.5 text-sm resize-none
                             focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500
                             placeholder:text-slate-400 transition-colors"
                  placeholder="Scrie mesajul tău...">
        </textarea>
      </div>

      <button type="submit"
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700
                         text-white font-semibold rounded-xl
                         focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
                         transition-colors">
        Trimite mesajul
      </button>
    </form>
  );
}
\`\`\`

• **divide-y** pe tbody = separator între rânduri fără border pe fiecare celulă
• **first:pl-6 last:pr-6** = padding mai mare la prima și ultima coloană fără a afecta layout-ul
• **line-clamp-2** = truncare text pe 2 rânduri — util pentru titluri de produse de lungimi variabile
• **group + group-hover:opacity-0/100** = butoane care apar la hover pe card — pattern UX modern`);

  console.log('Done script 8.');
  await p.$disconnect();
}

run().catch(e => { console.error(e); p.$disconnect(); process.exit(1); });
