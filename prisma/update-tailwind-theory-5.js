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

// L25 — Performanță și Optimizare Tailwind

await up('25. Performan', 'JIT', `**Cum Tailwind generează CSS — JIT și Purge** explică de ce Tailwind produce bundle-uri atât de mici și cum să configurezi corect scanarea fișierelor.

**Just-In-Time (JIT) — cum funcționează**

Tailwind v3+ folosește modul JIT by default — generează CSS **on-demand** doar pentru clasele găsite în fișierele tale. În loc să compileze toate utilitarele posibile (~3.5 MB), generează doar ce folosești (~10-50 KB).

\`\`\`js
// tailwind.config.js — content paths definesc ce fișiere se scanează
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: { extend: {} },
  plugins: [],
}
\`\`\`

**Cum detectează clasele JIT**

JIT scanează fișierele cu un regex simplu — caută string-uri care arată ca clase Tailwind. Nu parsează AST sau evaluează JS.

\`\`\`js
// GREȘIT — clase construite dinamic nu sunt detectate de scanner
const color = 'red';
<div className={\`bg-\${color}-500\`}>   // bg-red-500 NU va fi în bundle!

// CORECT — clase complete, detectabile static
const cls = condition ? 'bg-red-500' : 'bg-green-500';
<div className={cls}>
\`\`\`

**Purge automat în producție**

\`\`\`bash
# Build size comparison
Development:  ~3.5 MB (toate utilitarele generate)
Production:   ~10-50 KB (doar clasele folosite în proiect)

# Purge-ul se activează automat când:
NODE_ENV=production npx next build
\`\`\`

**Safelist — forțarea unor clase în bundle**

\`\`\`js
module.exports = {
  safelist: [
    'bg-red-500', 'bg-green-500', 'bg-blue-500',
    { pattern: /bg-(red|green|blue)-(100|500|900)/ },
    { pattern: /text-(sm|base|lg|xl)/, variants: ['hover', 'focus'] },
  ],
}
\`\`\`

**Content paths — greșeli comune**

\`\`\`js
// GREȘIT — prea generic, build mai lent
content: ['./**/*']

// CORECT — specific pe extensii relevante
content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}']

// Excludere fișiere generate
content: [
  './app/**/*.tsx',
  '!./app/**/*.stories.tsx',  // exclude Storybook stories
  '!./node_modules/**',
]
\`\`\`

**Debugging bundle size**

\`\`\`bash
# Generează CSS și verifică dimensiunea
npx tailwindcss -o output.css --minify
# Verifică ce clase sunt incluse (caută în output.css)

# Mode watch pentru development
npx tailwindcss -i ./src/input.css -o ./public/output.css --watch
\`\`\`

• **JIT** = generare on-demand → bundle 50-100x mai mic față de v2 fără purge
• **content paths** = trebuie să includă TOATE fișierele cu clase Tailwind, altfel clasele lipsesc din producție
• **clase dinamice** (\`bg-\${color}\`) = invizibile pentru JIT — folosește întotdeauna clase complete
• **safelist** = escape hatch pentru clase generate runtime (din CMS, props, baze de date)`);

await up('25. Performan', 'Configurare', `**Configurarea avansată în tailwind.config.js** îți oferă control complet asupra design system-ului — extindere theme, breakpoints custom, culori și integrare plugins.

**Structura completă tailwind.config.js**

\`\`\`js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    // IMPORTANT: 'theme' ÎNLOCUIEȘTE valorile default
    //            'theme.extend' ADAUGĂ la valorile existente
    extend: {
      colors: {
        brand: {
          50:  '#eff6ff',
          500: '#3b82f6',
          900: '#1e3a8a',
        },
        surface: 'hsl(var(--surface))',
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'Consolas', 'monospace'],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '128': '32rem',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0,0,0,.07), 0 10px 20px -2px rgba(0,0,0,.04)',
        'glow': '0 0 15px rgba(99,102,241,.5)',
      },
    },
  },
  plugins: [],
}
\`\`\`

**Breakpoints custom**

\`\`\`js
theme: {
  screens: {
    'xs': '480px',      // extra-small (nu există în default)
    'sm': '640px',
    'md': '768px',
    'lg': '1024px',
    'xl': '1280px',
    '2xl': '1536px',
    '3xl': '1920px',    // monitoare ultra-wide
  },
}
\`\`\`

**Plugins oficiale**

\`\`\`js
plugins: [
  require('@tailwindcss/typography'),    // prose — stilizare conținut Markdown/HTML
  require('@tailwindcss/forms'),         // reset frumos pentru inputs
  require('@tailwindcss/aspect-ratio'),  // utilitare pentru aspect-ratio
],
\`\`\`

**Teme multiple cu CSS variables**

\`\`\`js
// tailwind.config.js
theme: {
  extend: {
    colors: {
      background: 'hsl(var(--background))',
      foreground: 'hsl(var(--foreground))',
      primary:    'hsl(var(--primary))',
    }
  }
}
\`\`\`

\`\`\`css
/* globals.css */
:root {
  --background: 0 0% 100%;
  --foreground: 222 47% 11%;
  --primary: 221 83% 53%;
}

.dark {
  --background: 222 47% 4%;
  --foreground: 210 40% 98%;
  --primary: 217 91% 60%;
}
\`\`\`

**Prefix pentru evitarea conflictelor**

\`\`\`js
// tailwind.config.js
module.exports = {
  prefix: 'tw-',
  // acum: tw-flex, tw-bg-blue-500, tw-p-4
}
// Util când integrezi Tailwind într-un proiect cu alt CSS framework
\`\`\`

• **theme vs theme.extend** — folosește mereu extend pentru a nu pierde utilitarele default Tailwind
• **CSS variables în colors** = sistem de theming flexibil, dark mode fără duplicare config
• **breakpoints custom** — adaugă xs (480px) și 3xl (1920px) după nevoia proiectului
• **prefix** = soluție când Tailwind coexistă cu Bootstrap sau alt framework CSS`);

await up('25. Performan', 'CSS Modules', `**Tailwind cu CSS Modules și optimizare bundle** acoperă scenariile în care Tailwind se combină cu CSS tradițional și strategiile de a reduce dimensiunea CSS-ului final.

**Tailwind + CSS Modules — când și cum**

\`\`\`css
/* Button.module.css */
.btn {
  @apply px-4 py-2 rounded-lg font-semibold transition-all;
}

.btnPrimary {
  @apply bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500;
}

.btnSecondary {
  @apply bg-slate-100 text-slate-700 hover:bg-slate-200;
}

.btnLg {
  @apply px-6 py-3 text-lg;
}
\`\`\`

\`\`\`tsx
// Button.tsx
import styles from './Button.module.css';

export function Button({ variant = 'primary', size, children }) {
  return (
    <button className={[
      styles.btn,
      variant === 'primary' ? styles.btnPrimary : styles.btnSecondary,
      size === 'lg' ? styles.btnLg : ''
    ].join(' ')}>
      {children}
    </button>
  );
}
\`\`\`

**@apply — avantaje și riscuri**

\`\`\`css
/* AVANTAJE: elimini clase repetate din JSX */
.card {
  @apply bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition-shadow;
}

/* RISC: @apply nu funcționează cu unele variante complexe */
/* Evită: @apply group-hover:text-indigo-600 (uneori problematic) */
/* Preferă clase direct în HTML pentru variante interactive */
\`\`\`

**Layer CSS — organizare avansată**

\`\`\`css
/* globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Stiluri custom la nivelul corect */
@layer base {
  body { @apply bg-background text-foreground; }
  h1 { @apply text-4xl font-bold tracking-tight; }
  a { @apply text-primary underline-offset-4 hover:underline; }
}

@layer components {
  .card { @apply bg-white rounded-2xl shadow p-6; }
  .badge { @apply px-2 py-0.5 text-xs font-medium rounded-full; }
}

@layer utilities {
  .text-balance { text-wrap: balance; }
  .scrollbar-hide { scrollbar-width: none; }
}
\`\`\`

**Optimizare bundle — strategii**

\`\`\`js
// 1. Evită utilitare cu valori arbitrare în excess
// MODERAT: w-[347px] e OK pentru cazuri izolate
// EVITA: 50 de valori arbitrare diferite — fiecare generează o clasă nouă

// 2. Utilizează extend în loc de valori arbitrare repetate
theme: {
  extend: {
    spacing: { '18': '4.5rem' }  // în loc de w-[4.5rem] peste tot
  }
}

// 3. Grupează componente cu @apply în loc de clase lungi în JSX
// LUNG: className="flex items-center gap-3 p-4 bg-white rounded-xl shadow hover:shadow-md..."
// SCURT: className="card-item"  + .card-item { @apply ... } în CSS
\`\`\`

**CSS custom + Tailwind — anti-patterns**

\`\`\`css
/* EVITA: stiluri inline specifice care nu folosesc Tailwind */
.special { margin-top: 47px; }  /* folosește mt-[47px] sau adaugă spacing custom */

/* PREFERĂ: valori din scale Tailwind */
.special { @apply mt-12; }   /* 48px — cel mai apropiat din scale */
\`\`\`

• **@apply** = extrage clase repetate din componente în CSS — bun pentru design system
• **@layer** = organizează CSS custom la nivelul corect (base, components, utilities)
• **CSS Modules + @apply** = combinație excelentă pentru componente izolate cu stil complex
• **valori arbitrare** (w-[347px]) = folosește cu moderație — preferă extinderea themei pentru valori repetate`);

// L27 — Tailwind Plugins și Extindere Custom

await up('27. Tailwind Plugin', 'Arhitectura Plugin', `**Arhitectura Plugin-urilor Tailwind** îți permite să adaugi utilitare, componente și stiluri de bază noi — exact ca și cum ar fi parte din framework.

**Structura unui plugin**

\`\`\`js
// tailwind.config.js
const plugin = require('tailwindcss/plugin');

module.exports = {
  plugins: [
    plugin(function({ addUtilities, addComponents, addBase, theme, matchUtilities, e }) {
      // addUtilities  — adaugă clase utilitare noi
      // addComponents — adaugă clase de componente (lower specificity priority)
      // addBase       — adaugă stiluri globale (reset, :root vars)
      // theme()       — accesează valorile din theme config
      // matchUtilities — utilitare dinamice (cu valori din scale)
      // e()           — escape class names
    }),
  ],
}
\`\`\`

**Exemplu plugin complet — text-shadow**

\`\`\`js
const plugin = require('tailwindcss/plugin');

module.exports = {
  plugins: [
    plugin(function({ addUtilities, theme }) {
      const shadows = theme('textShadow', {});
      const utilities = Object.entries(shadows).reduce((acc, [key, value]) => {
        acc[key === 'DEFAULT' ? '.text-shadow' : \`.text-shadow-\${key}\`] = {
          'text-shadow': value,
        };
        return acc;
      }, {});
      addUtilities(utilities);
    }),
  ],
  theme: {
    extend: {
      textShadow: {
        sm: '0 1px 2px rgba(0,0,0,0.25)',
        DEFAULT: '0 2px 4px rgba(0,0,0,0.25)',
        lg: '0 4px 8px rgba(0,0,0,0.35)',
      },
    },
  },
}
\`\`\`

\`\`\`html
<!-- Utilizare -->
<h1 class="text-shadow-lg text-4xl font-bold">Titlu cu umbră</h1>
<p class="text-shadow text-lg">Text cu umbră default</p>
\`\`\`

**Plugin ca fișier separat**

\`\`\`js
// plugins/text-balance.js
const plugin = require('tailwindcss/plugin');

module.exports = plugin(function({ addUtilities }) {
  addUtilities({
    '.text-balance': { 'text-wrap': 'balance' },
    '.text-pretty':  { 'text-wrap': 'pretty' },
    '.scrollbar-hide': { 'scrollbar-width': 'none', '&::-webkit-scrollbar': { display: 'none' } },
  });
});

// tailwind.config.js
plugins: [require('./plugins/text-balance')],
\`\`\`

**Specificity și prioritate**

\`\`\`
Ordine CSS (de la cel mai mic la cel mai mare priority):
1. addBase      — stiluri :root, body, html (specificity 0)
2. addComponents — .card, .btn (specificity 1)
3. addUtilities  — .flex, .p-4 (specificity 1, dar aplicate DUPĂ components)
4. Clase inline  — style="" (cea mai mare prioritate)
\`\`\`

• **plugin()** = API oficial Tailwind pentru extindere — tot ce adaugi se integrează cu JIT, responsive, dark mode
• **addUtilities** = pentru clase single-purpose (text-shadow, scrollbar-hide)
• **addComponents** = pentru clase compuse (btn, card, badge)
• **fișiere plugin separate** = organizare curată pentru design system-uri mari`);

await up('27. Tailwind Plugin', 'addComponents', `**addComponents și addBase** sunt două funcții din API-ul plugin Tailwind care permit adăugarea de stiluri globale și componente reutilizabile direct în sistemul de utilitare.

**addBase — stiluri globale și reset**

\`\`\`js
const plugin = require('tailwindcss/plugin');

module.exports = {
  plugins: [
    plugin(function({ addBase, theme }) {
      addBase({
        // Stiluri pentru elementele HTML de bază
        'html': {
          'scroll-behavior': 'smooth',
          '-webkit-font-smoothing': 'antialiased',
        },
        'body': {
          'font-family': theme('fontFamily.sans'),
          'background-color': theme('colors.slate.50'),
          'color': theme('colors.slate.900'),
        },
        'h1': { fontSize: theme('fontSize.4xl'), fontWeight: theme('fontWeight.bold') },
        'h2': { fontSize: theme('fontSize.3xl'), fontWeight: theme('fontWeight.semibold') },
        'h3': { fontSize: theme('fontSize.2xl'), fontWeight: theme('fontWeight.semibold') },
        'a': { color: theme('colors.indigo.600'), textDecoration: 'underline' },
        'code': {
          'background-color': theme('colors.slate.100'),
          'padding': '0.1em 0.3em',
          'border-radius': '0.25rem',
          'font-size': '0.875em',
        },
      });
    }),
  ],
}
\`\`\`

**addComponents — componente reutilizabile**

\`\`\`js
plugin(function({ addComponents, theme }) {
  addComponents({
    // Buton de bază
    '.btn': {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: \`\${theme('spacing.2')} \${theme('spacing.4')}\`,
      borderRadius: theme('borderRadius.lg'),
      fontWeight: theme('fontWeight.semibold'),
      fontSize: theme('fontSize.sm'),
      transition: 'all 150ms',
      cursor: 'pointer',
    },
    '.btn-primary': {
      backgroundColor: theme('colors.indigo.600'),
      color: theme('colors.white'),
      '&:hover': { backgroundColor: theme('colors.indigo.700') },
      '&:focus': { outline: 'none', boxShadow: \`0 0 0 2px \${theme('colors.indigo.500')}\` },
    },
    '.btn-secondary': {
      backgroundColor: theme('colors.slate.100'),
      color: theme('colors.slate.700'),
      '&:hover': { backgroundColor: theme('colors.slate.200') },
    },
    // Card de bază
    '.card': {
      backgroundColor: theme('colors.white'),
      borderRadius: theme('borderRadius.2xl'),
      boxShadow: theme('boxShadow.md'),
      padding: theme('spacing.6'),
    },
    // Badge
    '.badge': {
      display: 'inline-flex',
      alignItems: 'center',
      padding: '0.125rem 0.5rem',
      borderRadius: '9999px',
      fontSize: theme('fontSize.xs'),
      fontWeight: theme('fontWeight.medium'),
    },
  });
}),
\`\`\`

**Utilizare în HTML**

\`\`\`html
<!-- Componente + Tailwind utilities împreună -->
<button class="btn btn-primary px-6 py-3 text-base">
  Acțiune principală
</button>

<div class="card hover:shadow-xl transition-shadow">
  <h3 class="text-lg font-bold">Titlu</h3>
  <p class="text-slate-600 mt-2">Conținut card</p>
</div>

<span class="badge bg-green-100 text-green-800">Activ</span>
<span class="badge bg-amber-100 text-amber-800">Pending</span>
\`\`\`

• **addBase** = stiluri globale (html, body, headings) — se aplică o singură dată, nu se poate override cu utilities
• **addComponents** = clase compuse (.btn, .card) — au specificitate mai mică decât utilities (pot fi override-uite cu Tailwind)
• **theme()** în plugin = referință la valorile din design token-uri — nu hard-codezi hex-uri
• **nest cu &** = suport pentru pseudo-clase (\`&:hover\`, \`&:focus\`) direct în obiectul de stiluri`);

await up('27. Tailwind Plugin', 'matchUtilities', `**matchUtilities — Utilitare Dinamice** este funcția din API-ul Tailwind care permite crearea de utilitare care acceptă valori din scale (theme) sau valori arbitrare, exact ca \`p-4\`, \`w-64\`, \`text-lg\`.

**Diferența dintre addUtilities și matchUtilities**

\`\`\`
addUtilities    → clase statice  (.text-balance, .scrollbar-hide)
matchUtilities  → clase dinamice (.text-shadow-sm, .text-shadow-lg, .text-shadow-[0_2px_4px_rgba(0,0,0,0.5)])
                  acceptă scale din theme + valori arbitrare [...]
\`\`\`

**Exemplu: text-shadow cu matchUtilities**

\`\`\`js
const plugin = require('tailwindcss/plugin');

module.exports = {
  plugins: [
    plugin(function({ matchUtilities, theme }) {
      matchUtilities(
        {
          'text-shadow': (value) => ({
            textShadow: value,
          }),
        },
        {
          values: theme('textShadow'),   // valorile vin din theme config
          supportsNegativeValues: false,
        }
      );
    }),
  ],
  theme: {
    extend: {
      textShadow: {
        sm:  '0 1px 2px rgba(0,0,0,0.2)',
        DEFAULT: '0 2px 4px rgba(0,0,0,0.25)',
        md:  '0 4px 6px rgba(0,0,0,0.3)',
        lg:  '0 8px 16px rgba(0,0,0,0.4)',
        none: 'none',
      },
    },
  },
}
\`\`\`

\`\`\`html
<!-- Utilizare cu scale din theme -->
<h1 class="text-shadow-sm">Text cu umbră mică</h1>
<h1 class="text-shadow">Text cu umbră default</h1>
<h1 class="text-shadow-lg">Text cu umbră mare</h1>

<!-- Utilizare cu valoare arbitrară -->
<h1 class="text-shadow-[0_4px_8px_rgba(99,102,241,0.5)]">Umbră indigo</h1>

<!-- Responsive și dark mode -->
<h1 class="text-shadow md:text-shadow-lg dark:text-shadow-none">Adaptiv</h1>
\`\`\`

**Exemplu: tab-size pentru cod**

\`\`\`js
plugin(function({ matchUtilities, theme }) {
  matchUtilities(
    { 'tab': (value) => ({ tabSize: value }) },
    { values: { 2: '2', 4: '4', 8: '8' } }
  );
}),

// Utilizare: class="tab-2" sau class="tab-[4]"
\`\`\`

**Exemplu: gradient custom cu valori din theme**

\`\`\`js
plugin(function({ matchUtilities, theme }) {
  matchUtilities(
    {
      'bg-gradient-to-r-from': (value) => ({
        backgroundImage: \`linear-gradient(to right, \${value}, transparent)\`,
      }),
    },
    { values: theme('colors.indigo') }
  );
}),
\`\`\`

**matchUtilities cu modifiers**

\`\`\`js
matchUtilities(
  {
    'border-glow': (value, { modifier }) => ({
      boxShadow: \`0 0 \${modifier || '10px'} \${value}\`,
    }),
  },
  { values: theme('colors.indigo'), modifiers: { sm: '5px', lg: '20px' } }
);

// Utilizare: class="border-glow-500/sm" sau "border-glow-500/lg"
\`\`\`

• **matchUtilities** = utilitare ce suportă valorile din scale + valori arbitrare \`[...]\` + responsive + dark mode
• **values: theme('...')** = conectezi utilitarul la design token-urile existente
• **modifiers** = al doilea parametru după \`/\` (ex: \`text-opacity/50\` → modifier este "50")
• Generează automat suport pentru toate variantele (hover:, md:, dark:, focus:)`);

await up('27. Tailwind Plugin', 'forms', `**Plugin @tailwindcss/forms și Best Practices** resetează stilurile de bază ale elementelor de formular pentru a fi mai ușor de stilizat cu Tailwind.

**Instalare și configurare**

\`\`\`bash
npm install @tailwindcss/forms
\`\`\`

\`\`\`js
// tailwind.config.js
module.exports = {
  plugins: [
    require('@tailwindcss/forms'),
    // sau cu strategie specifică:
    require('@tailwindcss/forms')({ strategy: 'class' }),
  ],
}
\`\`\`

**Strategii disponibile**

\`\`\`
strategy: 'base'  (default) — aplică reset pe toate inputurile din pagină
strategy: 'class' — aplică reset DOAR elementelor cu clasa 'form-input', 'form-select' etc.
\`\`\`

**Clase disponibile cu strategy: 'class'**

\`\`\`html
<input class="form-input  w-full rounded-lg border-slate-300 focus:border-indigo-500" type="text">
<input class="form-input  w-full" type="email">
<input class="form-input  w-full" type="password">
<select class="form-select w-full rounded-lg">...</select>
<textarea class="form-textarea w-full rounded-lg"></textarea>
<input class="form-checkbox" type="checkbox">
<input class="form-radio"    type="radio">
<input class="form-range    w-full" type="range">
\`\`\`

**Formular complet stilizat**

\`\`\`html
<form class="space-y-4 max-w-md">
  <div>
    <label class="block text-sm font-medium text-slate-700 mb-1">Email</label>
    <input type="email"
           class="form-input w-full rounded-lg border-slate-300
                  focus:border-indigo-500 focus:ring-indigo-500 text-sm">
  </div>

  <div>
    <label class="block text-sm font-medium text-slate-700 mb-1">Rol</label>
    <select class="form-select w-full rounded-lg border-slate-300
                   focus:border-indigo-500 text-sm">
      <option>Admin</option>
      <option>User</option>
    </select>
  </div>

  <div class="flex items-center gap-2">
    <input type="checkbox" id="agree" class="form-checkbox text-indigo-600 rounded">
    <label for="agree" class="text-sm text-slate-700">Accept termenii</label>
  </div>

  <button type="submit"
          class="w-full py-2 px-4 bg-indigo-600 text-white rounded-lg
                 font-semibold hover:bg-indigo-700 transition-colors">
    Trimite
  </button>
</form>
\`\`\`

**Best practices formulare Tailwind**

\`\`\`html
<!-- Input cu stare de eroare -->
<input class="form-input w-full rounded-lg
              border-slate-300 focus:border-indigo-500
              aria-invalid:border-red-500 aria-invalid:ring-red-500"
       aria-invalid="true">
<p class="mt-1 text-sm text-red-600">Câmp obligatoriu</p>

<!-- Input cu icon -->
<div class="relative">
  <span class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">@</span>
  <input class="form-input pl-8 w-full rounded-lg" type="text" placeholder="username">
</div>

<!-- Checkbox group -->
<fieldset class="space-y-2">
  <label class="flex items-center gap-2 cursor-pointer">
    <input type="checkbox" class="form-checkbox text-indigo-600 rounded">
    <span class="text-sm text-slate-700">Opțiunea 1</span>
  </label>
</fieldset>
\`\`\`

• **strategy: 'class'** = recomandat pentru proiecte mari — controlezi exact care elemente primesc reset
• **strategy: 'base'** = mai simplu — tot ce e input/select/textarea primește reset automat
• **focus:border-* + focus:ring-*** = standard pentru feedback vizual la focus (accesibilitate)
• **aria-invalid** = stare de eroare accesibilă — mai bun decât o clasă custom .input-error`);

  console.log('Done script 5.');
  await p.$disconnect();
}

run().catch(e => { console.error(e); p.$disconnect(); process.exit(1); });
