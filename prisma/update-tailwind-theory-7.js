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

// L31 — Tailwind CSS v4

await up('31. Tailwind CSS v4', 'CSS-first', `**Arhitectura CSS-first în Tailwind v4** reprezintă o schimbare fundamentală față de v3 — configurarea se mută din \`tailwind.config.js\` direct în fișierul CSS, folosind directive native.

**Ce s-a schimbat față de v3**

\`\`\`
Tailwind v3:
  - config în tailwind.config.js (JavaScript)
  - @tailwind base/components/utilities în CSS
  - PostCSS plugin

Tailwind v4:
  - config direct în CSS cu @theme, @layer, @variant
  - @import "tailwindcss" înlocuiește cele 3 directive
  - Engine nou (oxide) — build 10x mai rapid
  - Nu mai necesită tailwind.config.js pentru cazuri simple
\`\`\`

**Instalare Tailwind v4**

\`\`\`bash
# Next.js cu Tailwind v4
npm install tailwindcss@next @tailwindcss/postcss@next

# postcss.config.js
module.exports = { plugins: { '@tailwindcss/postcss': {} } }
\`\`\`

**globals.css în v4 — structura nouă**

\`\`\`css
/* Înlocuiește cele 3 linii @tailwind din v3 */
@import "tailwindcss";

/* Configurare design tokens — înlocuiește theme.extend din config.js */
@theme {
  --font-sans: "Geist", system-ui, sans-serif;
  --font-mono: "Geist Mono", monospace;

  --color-brand-50:  oklch(97% 0.01 264);
  --color-brand-500: oklch(55% 0.22 264);
  --color-brand-900: oklch(25% 0.12 264);

  --spacing-18: 4.5rem;
  --spacing-22: 5.5rem;

  --radius-4xl: 2rem;
  --shadow-soft: 0 2px 15px -3px oklch(0% 0 0 / 7%);
}
\`\`\`

**Utilizare clase generate din @theme**

\`\`\`html
<!-- Clasele se generează automat din variabilele @theme -->
<!-- --color-brand-500 → bg-brand-500, text-brand-500, border-brand-500 -->
<!-- --spacing-18 → p-18, m-18, w-18, gap-18 -->
<!-- --radius-4xl → rounded-4xl -->

<div class="bg-brand-500 text-white p-18 rounded-4xl shadow-soft">
  Componentă cu token-uri custom
</div>

<h1 class="font-sans text-brand-900">Titlu cu font custom</h1>
<code class="font-mono">cod inline</code>
\`\`\`

**CSS Variables generate automat**

\`\`\`css
/* Tailwind v4 expune toate valorile ca CSS custom properties */
/* Poți folosi în CSS nativ sau JS */
:root {
  --color-brand-500: oklch(55% 0.22 264);
  --spacing-18: 4.5rem;
  /* ... toate valorile din @theme */
}

/* Utilizare directă în CSS */
.custom-element {
  background: var(--color-brand-500);
  padding: var(--spacing-18);
}
\`\`\`

**Prefix namespace pentru evitarea conflictelor**

\`\`\`css
@import "tailwindcss" prefix(tw);

/* Acum: tw-flex, tw-bg-blue-500, tw-p-4 */
/* Util când migrezi un proiect cu CSS existent */
\`\`\`

**Comparație v3 vs v4**

\`\`\`js
// v3 — tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: { brand: { 500: '#6366f1' } },
      spacing: { 18: '4.5rem' },
    }
  }
}

// v4 — globals.css
@theme {
  --color-brand-500: #6366f1;
  --spacing-18: 4.5rem;
}
/* Același rezultat, fără fișier JS separat */
\`\`\`

• **@import "tailwindcss"** = înlocuiește @tailwind base/components/utilities — o singură linie
• **@theme** = design tokens în CSS pur — mai aproape de web standards, TypeScript-unfriendly dar mai explicit
• **oklch()** = color space recomandat în v4 — mai predictibil vizual și suportă HDR screens
• **engine oxide** = motor Rust-based — build-uri de 5-10x mai rapide față de v3`);

await up('31. Tailwind CSS v4', '@layer', `**@layer și cascade în Tailwind v4** sunt mecanismele prin care Tailwind integrează CSS custom în sistemul de cascade fără conflicte de specificitate.

**Cascade Layers — conceptul de bază**

\`\`\`css
/* CSS Cascade Layers = straturi cu prioritate explicită */
/* Layerele mai târzii în lista @layer câștigă, indiferent de specificitate */

@layer base, components, utilities;

@layer base {
  /* Specificitate: 0 — întotdeauna override-uibil de components și utilities */
  h1 { font-size: 2rem; }
}

@layer components {
  /* Specificitate: 0 — override-uibil de utilities */
  .btn { padding: 0.5rem 1rem; }
}

@layer utilities {
  /* Specificitate: 0 — câștigă față de base și components */
  .p-4 { padding: 1rem; }
}

/* CSS în afara oricărui @layer câștigă față de TOATE layerele */
.override { color: red; }
\`\`\`

**@layer în Tailwind v4**

\`\`\`css
@import "tailwindcss";

/* Adaugă stiluri în layerele Tailwind */
@layer base {
  *, *::before, *::after { box-sizing: border-box; }

  body {
    font-family: var(--font-sans);
    background-color: var(--color-slate-50);
    color: var(--color-slate-900);
  }

  h1 { font-size: var(--text-4xl); font-weight: var(--font-weight-bold); }
  h2 { font-size: var(--text-3xl); font-weight: var(--font-weight-semibold); }

  a {
    color: var(--color-indigo-600);
    text-decoration: underline;
    text-underline-offset: 4px;
  }
}

@layer components {
  .card {
    background: var(--color-white);
    border-radius: var(--radius-2xl);
    box-shadow: var(--shadow-md);
    padding: var(--spacing-6);
  }

  .btn {
    display: inline-flex;
    align-items: center;
    padding: var(--spacing-2) var(--spacing-4);
    border-radius: var(--radius-lg);
    font-weight: var(--font-weight-semibold);
    transition: all 150ms;
  }

  .btn-primary {
    background: var(--color-indigo-600);
    color: var(--color-white);
    &:hover { background: var(--color-indigo-700); }
  }
}

@layer utilities {
  .text-balance { text-wrap: balance; }
  .text-pretty  { text-wrap: pretty; }
  .scrollbar-hide {
    scrollbar-width: none;
    &::-webkit-scrollbar { display: none; }
  }
}
\`\`\`

**Specificitate în v4 — totul e 0**

\`\`\`css
/* Toate clasele Tailwind și cele din @layer au specificitate 0 */
/* Ordinea câștigă, nu specificitatea — comportament mai predictibil */

/* GREȘIT (v3 thinking): .my-class { color: red !important } pentru a câștiga */
/* CORECT (v4 thinking): pune în layerul potrivit sau în afara oricărui @layer */

/* CSS în afara @layer câștigă față de orice clasă Tailwind */
.always-wins {
  display: grid;   /* câștigă față de flex, block etc. din utilitare */
}
\`\`\`

**Importul de fișiere terțe**

\`\`\`css
@import "tailwindcss";
@import "./tokens.css";        /* CSS cu @theme tokens */
@import "./components.css";    /* @layer components */

/* Sau cu layer explicit */
@import url("./vendor.css") layer(vendor);
\`\`\`

• **@layer base/components/utilities** = aceleași 3 straturi ca în v3, dar acum CSS native layers
• **specificitate 0 în toate layerele** = comportament mai predictibil, fără nevoie de !important
• **CSS în afara @layer** = câștigă față de tot — escape hatch pentru override-uri critice
• **@layer în v4** = suport nativ CSS, nu PostCSS magic — funcționează în orice browser modern`);

await up('31. Tailwind CSS v4', 'Container queries', `**Container queries și @variant în Tailwind v4** permit stilizarea bazată pe dimensiunea containerului părinte (nu a viewport-ului) și crearea de variante custom.

**Container Queries — stiluri bazate pe container, nu viewport**

\`\`\`html
<!-- În v4, container queries sunt incluse nativ -->
<!-- Marchezi containerul cu @container -->
<div class="@container">
  <div class="grid grid-cols-1 @sm:grid-cols-2 @lg:grid-cols-3 gap-4">
    <div class="bg-white rounded-xl p-4">Card 1</div>
    <div class="bg-white rounded-xl p-4">Card 2</div>
    <div class="bg-white rounded-xl p-4">Card 3</div>
  </div>
</div>
\`\`\`

**Breakpoints container queries (v4)**

\`\`\`
@xs   = min-width: 320px (container)
@sm   = min-width: 384px
@md   = min-width: 448px
@lg   = min-width: 512px
@xl   = min-width: 576px
@2xl  = min-width: 672px
@3xl  = min-width: 768px
@4xl  = min-width: 896px
@5xl  = min-width: 1024px
@6xl  = min-width: 1152px
@7xl  = min-width: 1280px
\`\`\`

**Exemplu: card care se adaptează la spațiu disponibil**

\`\`\`html
<!-- Același card — arată diferit în sidebar vs content area -->
<div class="@container">
  <article class="flex flex-col @md:flex-row gap-4 p-4 bg-white rounded-2xl">
    <img class="w-full @md:w-32 @md:h-32 aspect-video @md:aspect-square
                object-cover rounded-xl"
         src="...">
    <div>
      <h3 class="font-bold text-sm @md:text-base @lg:text-lg">Titlu</h3>
      <p class="text-slate-500 text-xs @md:text-sm @md:block hidden">
        Descriere (vizibilă doar în containere medii+)
      </p>
    </div>
  </article>
</div>
\`\`\`

**Named containers**

\`\`\`html
<!-- Container cu nume pentru nested containers -->
<div class="@container/sidebar">
  <div class="@container/main">
    <div class="@sm/sidebar:text-sm @lg/main:text-base">
      Se adaptează la sidebar sau main, explicit
    </div>
  </div>
</div>
\`\`\`

**@variant — variante custom în v4**

\`\`\`css
/* globals.css */
@import "tailwindcss";

/* Creează o variantă custom */
@variant hocus (&:hover, &:focus);
@variant supports-grid (@supports (display: grid));
@variant print (@media print);
@variant landscape (@media (orientation: landscape));
\`\`\`

\`\`\`html
<!-- Utilizare variante custom -->
<a href="#" class="hocus:text-indigo-600 hocus:underline">
  Link (hover sau focus)
</a>

<div class="supports-grid:grid supports-grid:grid-cols-3">
  Folosește grid dacă e suportat
</div>

<div class="print:hidden">Ascuns la print</div>
<div class="print:block hidden">Vizibil doar la print</div>
\`\`\`

**@variant cu pseudo-elemente**

\`\`\`css
@variant scrolled (&[data-scrolled="true"]);

/* Header care schimbă stilul după scroll */
\`\`\`

\`\`\`html
<header class="scrolled:shadow-md scrolled:backdrop-blur-md
               transition-all duration-300"
        id="header">
  ...
</header>
\`\`\`

\`\`\`js
window.addEventListener('scroll', () => {
  document.getElementById('header').dataset.scrolled = window.scrollY > 50;
});
\`\`\`

• **@container** = răspunde la spațiul disponibil în container, nu la viewport — ideal pentru componente reutilizabile
• **@container vs responsive (sm:, lg:)** = folosește @container când componenta apare în contexte diferite (sidebar vs full-width)
• **@variant** = creează variante custom (hocus, print, supports-grid) — reutilizabile peste tot în proiect
• **named containers** = rezolvă conflictele când ai containere nested`);

await up('31. Tailwind CSS v4', 'Migration', `**Migrarea de la v3 la v4** — ghid practic pentru actualizarea unui proiect existent la Tailwind CSS v4.

**Tool automat de migrare**

\`\`\`bash
# Rulează codemods automate (recomandată ca prim pas)
npx @tailwindcss/upgrade@next

# Ce face:
# - Actualizează pachetele
# - Transformă tailwind.config.js → @theme în CSS
# - Înlocuiește @tailwind cu @import "tailwindcss"
# - Actualizează clase redenumite
\`\`\`

**Schimbări de pachete**

\`\`\`bash
# v3
npm install tailwindcss postcss autoprefixer

# v4
npm install tailwindcss@next @tailwindcss/postcss@next
# autoprefixer nu mai e necesar separat
\`\`\`

\`\`\`js
// postcss.config.js — v3
module.exports = { plugins: { tailwindcss: {}, autoprefixer: {} } }

// postcss.config.js — v4
module.exports = { plugins: { '@tailwindcss/postcss': {} } }
\`\`\`

**Schimbări în CSS**

\`\`\`css
/* v3 */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* v4 */
@import "tailwindcss";
\`\`\`

**Clase redenumite în v4**

\`\`\`
v3                    → v4
shadow-sm             → shadow-xs
shadow                → shadow-sm
ring                  → ring-1 (ring fără număr nu mai există)
blur-sm               → blur-xs
blur                  → blur-sm
rounded               → rounded-sm
rounded-sm            → rounded-xs
overflow-ellipsis     → text-ellipsis
decoration-clone      → box-decoration-clone
decoration-slice      → box-decoration-slice
flex-shrink-*         → shrink-*
flex-grow-*           → grow-*
\`\`\`

**Configurare migrată în CSS**

\`\`\`css
/* v3 tailwind.config.js → v4 globals.css */
@import "tailwindcss";

@theme {
  /* v3: theme.extend.colors.brand */
  --color-brand-500: oklch(55% 0.22 264);
  --color-brand-900: oklch(25% 0.12 264);

  /* v3: theme.extend.fontFamily.sans */
  --font-sans: "Inter", system-ui, sans-serif;

  /* v3: theme.extend.spacing['18'] */
  --spacing-18: 4.5rem;

  /* v3: theme.extend.screens['3xl'] */
  --breakpoint-3xl: 1920px;
}

/* v3: darkMode: 'class' */
/* v4: dark mode cu class e default, configurabil cu @variant */
@variant dark (&:where(.dark, .dark *));
\`\`\`

**Breakpoints — schimbare de sintaxă**

\`\`\`html
<!-- v3 -->
<div class="sm:flex md:grid lg:block">

<!-- v4 — același comportament, sintaxa identică pentru built-in breakpoints -->
<div class="sm:flex md:grid lg:block">

<!-- v4 — max-width breakpoints (noi în v4) -->
<div class="max-sm:hidden max-md:block">
  Ascuns sub sm, vizibil între sm și md
</div>
\`\`\`

**Strategie de migrare recomandată**

\`\`\`
1. Rulează @tailwindcss/upgrade — rezolvă 80% automat
2. Verifică build-ul (erori din clase redenumite)
3. Migrează tailwind.config.js manual în @theme
4. Testează dark mode (selector poate diferi)
5. Verifică plugins — multe nu sunt compatibile cu v4 încă
\`\`\`

• **upgrade tool** = primul pas — automatizează cele mai comune transformări
• **clase redenumite** = shadow, blur, rounded au valori schimbate — verifică vizual după migrare
• **plugins terțe** = mulți nu au suport v4 încă (forms, typography sunt în lucru) — verifică compatibilitatea
• **v4 e în beta** (la data scrierii) — pentru proiecte production stabile, rămâi pe v3`);

// L32 — shadcn/ui si Radix UI

await up('32. shadcn', 'Ce este shadcn', `**Ce este shadcn/ui și filosofia sa** — shadcn/ui nu este o librărie tradițională de componente, ci o colecție de componente copy-paste construite pe Radix UI și Tailwind CSS.

**Filosofia "not a library"**

\`\`\`
Librărie tradițională (MUI, Ant Design):
  - npm install → node_modules
  - API fix, customizare limitată
  - Versioning strict, breaking changes
  - Greu de schimbat intern

shadcn/ui:
  - CLI copiază codul sursă în proiect (src/components/ui/)
  - Codul e AL TĂU — modifici direct
  - Fără dependință de npm pentru componente
  - Built pe Radix (accesibilitate) + Tailwind (stil)
\`\`\`

**Instalare și setup**

\`\`\`bash
# Inițializare proiect nou
npx shadcn@latest init

# Răspunzi la întrebări:
# - Style: Default / New York
# - Base color: Slate / Gray / Zinc / Stone / Neutral
# - CSS variables: Yes (recomandat)

# Adaugă componente individuale
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add dialog
npx shadcn@latest add form
npx shadcn@latest add input
\`\`\`

**Structura generată**

\`\`\`
src/
  components/
    ui/
      button.tsx     ← codul tău acum
      card.tsx
      dialog.tsx
      input.tsx
  lib/
    utils.ts         ← cn() helper (clsx + tailwind-merge)
\`\`\`

**Helper cn() — esențial**

\`\`\`ts
// lib/utils.ts
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// clsx — combină clase condiționat
// twMerge — rezolvă conflicte Tailwind (p-2 + p-4 → p-4, nu ambele)
\`\`\`

\`\`\`tsx
// Utilizare cn()
<div className={cn(
  'base-classes',
  condition && 'conditional-class',
  variant === 'primary' && 'text-white bg-indigo-600',
  variant === 'secondary' && 'text-slate-700 bg-slate-100',
  className   // permite override din exterior
)}>
\`\`\`

**Componentă Button din shadcn**

\`\`\`tsx
// components/ui/button.tsx (generat, modificabil)
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:  'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline:  'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        ghost:    'hover:bg-accent hover:text-accent-foreground',
        link:     'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm:      'h-9 rounded-md px-3',
        lg:      'h-11 rounded-md px-8',
        icon:    'h-10 w-10',
      },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  }
);
\`\`\`

\`\`\`tsx
// Utilizare
<Button>Default</Button>
<Button variant="destructive">Șterge</Button>
<Button variant="outline" size="sm">Mic</Button>
<Button variant="ghost" size="icon"><IconSun /></Button>
\`\`\`

• **"not a library"** = codul e în proiectul tău, nu în node_modules — libertate totală de customizare
• **Radix primitives** = accesibilitate ARIA, keyboard navigation, focus management — gratis
• **cn()** = utilitar esențial — clsx pentru condiții + twMerge pentru conflicte Tailwind
• **cva** (class-variance-authority) = gestionează variantele de componente elegant`);

await up('32. shadcn', 'Radix UI', `**Radix UI — Primitives Accesibile** sunt componentele headless (fără stil) pe care se construiesc componentele shadcn/ui, oferind accesibilitate și comportament complex gata implementat.

**Ce sunt primitive headless**

\`\`\`
Primitive headless = componentă cu:
  ✓ Comportament complet (open/close, focus trap, keyboard nav)
  ✓ Accesibilitate ARIA implementată corect
  ✓ Animații de intrare/ieșire hookuri
  ✗ Zero stiluri CSS — tu aplici Tailwind

Exemple: Dialog, Dropdown, Tooltip, Accordion, Select, Tabs, Popover
\`\`\`

**Instalare**

\`\`\`bash
# Pachete individuale (tree-shakeable)
npm install @radix-ui/react-dialog
npm install @radix-ui/react-dropdown-menu
npm install @radix-ui/react-tooltip
npm install @radix-ui/react-accordion
npm install @radix-ui/react-tabs
\`\`\`

**Dialog — implementare completă**

\`\`\`tsx
import * as Dialog from '@radix-ui/react-dialog';

export function ConfirmDialog({ onConfirm }) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="px-4 py-2 bg-red-600 text-white rounded-lg">
          Șterge
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 animate-fade-in" />
        <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                                    w-full max-w-md bg-white rounded-2xl p-6 shadow-xl
                                    animate-fade-up">
          <Dialog.Title className="text-lg font-bold text-slate-900">
            Confirmare ștergere
          </Dialog.Title>
          <Dialog.Description className="text-slate-500 mt-2 text-sm">
            Această acțiune este ireversibilă. Ești sigur?
          </Dialog.Description>

          <div className="flex gap-3 mt-6 justify-end">
            <Dialog.Close asChild>
              <button className="px-4 py-2 border rounded-lg text-sm">Anulează</button>
            </Dialog.Close>
            <button onClick={onConfirm}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm">
              Șterge
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
\`\`\`

**Dropdown Menu**

\`\`\`tsx
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

<DropdownMenu.Root>
  <DropdownMenu.Trigger asChild>
    <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-100">
      Opțiuni ▾
    </button>
  </DropdownMenu.Trigger>

  <DropdownMenu.Portal>
    <DropdownMenu.Content
      className="min-w-48 bg-white rounded-xl shadow-xl border border-slate-100
                 p-1 animate-fade-up origin-top-left"
      sideOffset={4}>
      <DropdownMenu.Item className="flex items-center gap-2 px-3 py-2 text-sm
                                     rounded-lg cursor-pointer hover:bg-slate-50
                                     focus:bg-slate-50 outline-none">
        ✏️ Editează
      </DropdownMenu.Item>
      <DropdownMenu.Separator className="h-px bg-slate-100 my-1" />
      <DropdownMenu.Item className="flex items-center gap-2 px-3 py-2 text-sm
                                     rounded-lg cursor-pointer text-red-600
                                     hover:bg-red-50 focus:bg-red-50 outline-none">
        🗑️ Șterge
      </DropdownMenu.Item>
    </DropdownMenu.Content>
  </DropdownMenu.Portal>
</DropdownMenu.Root>
\`\`\`

**Tooltip**

\`\`\`tsx
import * as Tooltip from '@radix-ui/react-tooltip';

<Tooltip.Provider>
  <Tooltip.Root>
    <Tooltip.Trigger asChild>
      <button className="p-2 rounded-lg hover:bg-slate-100">
        <IconInfo className="w-4 h-4" />
      </button>
    </Tooltip.Trigger>
    <Tooltip.Portal>
      <Tooltip.Content
        className="bg-slate-900 text-white text-xs px-2 py-1 rounded-md
                   animate-fade-in shadow-lg"
        sideOffset={4}>
        Informații suplimentare
        <Tooltip.Arrow className="fill-slate-900" />
      </Tooltip.Content>
    </Tooltip.Portal>
  </Tooltip.Root>
</Tooltip.Provider>
\`\`\`

• **asChild** = Radix preia comportamentul elementului copil (trigger fără div extra)
• **Portal** = randează în \`document.body\` → evită overflow:hidden și z-index issues
• **keyboard navigation** = inclus automat — Tab, Enter, Escape, Arrow keys
• **ARIA** = role, aria-expanded, aria-labelledby — totul gestionat de Radix fără config`);

await up('32. shadcn', 'React Hook Form', `**Formulare cu React Hook Form și Zod** — implementarea formularelor cu validare type-safe, performantă și integrată cu componentele shadcn/ui.

**Instalare**

\`\`\`bash
npm install react-hook-form zod @hookform/resolvers
\`\`\`

**Schema Zod — validare**

\`\`\`ts
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string()
    .min(1, 'Email obligatoriu')
    .email('Email invalid'),
  password: z.string()
    .min(8, 'Minim 8 caractere')
    .max(100),
});

const registerSchema = z.object({
  name: z.string().min(2, 'Minim 2 caractere').max(50),
  email: z.string().email('Email invalid'),
  password: z.string().min(8, 'Minim 8 caractere'),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: 'Parolele nu coincid',
  path: ['confirmPassword'],
});

type LoginForm = z.infer<typeof loginSchema>;
\`\`\`

**Formular cu shadcn Form components**

\`\`\`tsx
'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function LoginForm() {
  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  async function onSubmit(values: LoginForm) {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(values),
      headers: { 'Content-Type': 'application/json' },
    });
    if (!res.ok) {
      const err = await res.json();
      form.setError('root', { message: err.error });
      return;
    }
    window.location.href = '/dashboard';
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="tu@example.com" type="email" {...field} />
              </FormControl>
              <FormMessage />  {/* Afișează eroarea Zod */}
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Parolă</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {form.formState.errors.root && (
          <p className="text-sm text-red-600">{form.formState.errors.root.message}</p>
        )}

        <Button type="submit" className="w-full"
                disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? 'Se încarcă...' : 'Intră în cont'}
        </Button>
      </form>
    </Form>
  );
}
\`\`\`

**Validare la nivel de câmp și formular**

\`\`\`ts
// Validare complexă cu Zod
const profileSchema = z.object({
  username: z.string()
    .min(3)
    .max(20)
    .regex(/^[a-z0-9_-]+$/, 'Doar litere mici, cifre, _ și -'),
  website: z.string().url('URL invalid').optional().or(z.literal('')),
  bio: z.string().max(160, 'Max 160 caractere').optional(),
  role: z.enum(['admin', 'user', 'viewer']),
  notifications: z.boolean().default(true),
});
\`\`\`

• **zodResolver** = leagă schema Zod de RHF — validare automată la submit și onChange
• **FormMessage** = afișează eroarea câmpului curent automat — nu mai scrii logică de afișare
• **form.setError('root', ...)** = erori de la server (401, 500) afișate în formular
• **form.formState.isSubmitting** = loading state automat cât timp onSubmit rulează`);

await up('32. shadcn', 'Customizare', `**Customizarea și temele în shadcn/ui** — cum să modifici stilurile implicite și să creezi teme proprii pentru componentele shadcn/ui.

**CSS Variables — sistemul de theming shadcn**

\`\`\`css
/* globals.css — generat de shadcn init */
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 222.2 84% 4.9%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --primary: 210 40% 98%;
    --primary-foreground: 222.2 47.4% 11.2%;
    /* ... */
  }
}
\`\`\`

**Modificarea temei (exemplu: indigo)**

\`\`\`css
:root {
  --primary: 239 84% 67%;           /* indigo-500 */
  --primary-foreground: 0 0% 100%;  /* white */
  --ring: 239 84% 67%;
  --radius: 0.75rem;                /* rounded-xl în loc de rounded-lg */
}

.dark {
  --primary: 238 74% 74%;           /* indigo-400 pentru dark mode */
  --primary-foreground: 240 10% 4%; /* text închis pe fundal deschis */
}
\`\`\`

**Customizarea unui component**

\`\`\`tsx
// Extinde Button cu variante proprii
// components/ui/button.tsx — modifică direct fișierul

const buttonVariants = cva('...', {
  variants: {
    variant: {
      // Variantele existente...
      default: 'bg-primary text-primary-foreground hover:bg-primary/90',
      // Adaugă variante proprii:
      gradient: 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:opacity-90',
      soft: 'bg-primary/10 text-primary hover:bg-primary/20',
    },
    size: {
      // Adaugă size-uri proprii:
      xs: 'h-7 px-2 text-xs rounded',
    }
  }
});

// Utilizare
<Button variant="gradient">Premium</Button>
<Button variant="soft" size="xs">Tag</Button>
\`\`\`

**Teme cu shadcn themes generator**

\`\`\`bash
# Vizitează: https://ui.shadcn.com/themes
# Configurează: culori, radius, dark mode
# Copiază CSS generat în globals.css
\`\`\`

**Component complet customizat**

\`\`\`tsx
// Badge personalizat cu variante semantice
import { cn } from '@/lib/utils';

const variants = {
  default:  'bg-slate-100 text-slate-700',
  success:  'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
  warning:  'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  error:    'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  info:     'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
};

export function Badge({ variant = 'default', className, children }) {
  return (
    <span className={cn(
      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
      variants[variant],
      className
    )}>
      {children}
    </span>
  );
}

// Utilizare
<Badge>Default</Badge>
<Badge variant="success">Activ</Badge>
<Badge variant="error">Eroare</Badge>
\`\`\`

• **CSS variables** = schimbi tot design system-ul din 2-3 variabile — nu modifici fiecare component
• **modifici direct fișierele** = avantajul principal shadcn față de librăriile tradiționale
• **shadcn themes** = generator online pentru teme gata de copiat în globals.css
• **cn() + cva** = combo standard pentru variante type-safe în orice component`);

  console.log('Done script 7.');
  await p.$disconnect();
}

run().catch(e => { console.error(e); p.$disconnect(); process.exit(1); });
