const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();

const items = [
  // L34: Cascade Layers si @scope avansat
  {
    lessonContains: 'Cascade Layers',
    titleContains: 'controlul cascadei',
    content: `**@layer** oferă control explicit asupra ordinii de prioritate în cascada CSS — eliminând conflictele de specificitate între reset-uri, librării, componente și utilitare.

**Problema fără @layer**

\`\`\`css
/* Fișierul se încarcă în ordine, dar specificitatea creează haos */
/* reset.css */
* { margin: 0; }

/* bootstrap.css — specificitate ridicată */
.btn.btn-primary { background-color: #0d6efd !important; }

/* Customizarea ta */
.btn-primary { background: royalblue; } /* pierde față de Bootstrap cu !important */
\`\`\`

**Soluția cu @layer**

\`\`\`css
/* Definire ierarhie clară */
@layer reset, vendor, base, components, utilities;

/* ORICE regulă în utilities > ORICE regulă în components */
/* INDIFERENT de specificitate */

@layer vendor {
  .btn-primary { background: #0d6efd !important; } /* capturat în layer */
}

@layer components {
  .btn-primary { background: royalblue; } /* câștigă față de vendor */
}
\`\`\`

**Ordinea de prioritate**

\`\`\`
Mai mică → Mai mare prioritate:
reset < vendor < base < components < utilities < unlayered

unlayered (fără @layer) = MEREU câștigă față de orice layer
\`\`\`

**Crearea layerelor — 3 moduri**

\`\`\`css
/* 1. Declarare cu bloc */
@layer reset {
  *, *::before, *::after { box-sizing: border-box; }
  * { margin: 0; padding: 0; }
}

/* 2. Declarare de ordine fără conținut */
@layer reset, base, components, utilities;
/* Conținut adăugat mai târziu */
@layer components { .btn { padding: 8px 16px; } }

/* 3. Import direct */
@import url('bootstrap.css') layer(vendor);
@import url('reset.css') layer(reset);
\`\`\`

**Stiluri unlayered — prioritate maximă**

\`\`\`css
@layer components { .btn { color: blue; } }
@layer utilities  { .btn { color: red; } }

/* Stil unlayered câștigă față de ambele */
.btn { color: green; } /* VERDE — câștigă */
\`\`\`

**Interacțiunea !important cu @layer**

\`\`\`css
@layer reset, components;

@layer reset {
  p { color: black !important; }        /* !important în reset */
}

@layer components {
  p { color: blue !important; }          /* !important în components */
}

/* Pentru !important, ORDINEA SE INVERSEAZĂ */
/* !important în reset > !important în components */
/* P devine: BLACK (din reset, nu components) */
\`\`\``
  },
  {
    lessonContains: 'Cascade Layers',
    titleContains: 'importuri si nesting',
    content: `**@layer cu importuri și nesting** permite organizarea CSS-ului modular pe mai multe fișiere și ierarhii, cu ordine de prioritate controlată.

**@import cu @layer**

\`\`\`css
/* Importă direct într-un layer */
@import url('https://cdn.example.com/normalize.css') layer(vendor);
@import url('./reset.css') layer(reset);
@import url('./tokens.css') layer(tokens);
@import url('./components/button.css') layer(components);

/* Layer declarat implicit prin import */
/* Ordinea importurilor = ordinea layerelor dacă nu e declarată explicit */
\`\`\`

**Declarare explicită a ordinii**

\`\`\`css
/* BINE — declară ordinea înainte de imports */
@layer reset, tokens, base, vendor, components, utilities;

/* Acum importurile pot fi în orice ordine */
@import url('./vendor/bootstrap.css') layer(vendor);
@import url('./reset.css') layer(reset);
@import url('./tokens.css') layer(tokens);
/* Ordinea reală: reset → tokens → base → vendor → components → utilities */
\`\`\`

**Nested layers**

\`\`\`css
@layer components {
  /* Sub-layere în components */
  @layer base, variants, states;

  @layer base {
    .btn { display: inline-flex; padding: 8px 16px; }
    .card { border-radius: 12px; padding: 24px; }
  }

  @layer variants {
    .btn--primary { background: royalblue; color: white; }
    .btn--danger  { background: #ef4444; color: white; }
    .card--featured { border: 2px solid gold; }
  }

  @layer states {
    .btn:hover   { filter: brightness(1.1); }
    .btn:active  { transform: scale(0.98); }
    .btn:disabled { opacity: 0.5; }
  }
}

/* Prioritate internă: components.base < components.variants < components.states */
/* Referință din exterior: @layer components.variants */
\`\`\`

**Import cu media queries**

\`\`\`css
/* Import condițional */
@import url('dark-theme.css') layer(theme) (prefers-color-scheme: dark);
@import url('print.css') layer(print) print;

/* Import cu supports */
@import url('container-queries.css') layer(modern)
  supports(container-type: inline-size);
\`\`\`

**Pattern complet pentru proiect real**

\`\`\`css
/* styles/main.css */

/* 1. Declară ordinea */
@layer
  reset,
  tokens,
  base,
  vendor,
  layout,
  components.base,
  components.variants,
  components.states,
  utilities;

/* 2. Importuri în layer-uri */
@import './reset.css' layer(reset);
@import './tokens/index.css' layer(tokens);
@import './base/index.css' layer(base);

/* Vendor în propriul layer */
@import 'https://cdn.example.com/bootstrap.min.css' layer(vendor);

/* Componente în sub-layer-uri */
@layer components.base {
  @import './components/button.base.css';
  @import './components/card.base.css';
  @import './components/input.base.css';
}

@layer components.variants {
  @import './components/button.variants.css';
}

@layer utilities {
  @import './utilities.css';
}
\`\`\`

**Debugging cu DevTools**

• Chrome DevTools → Styles panel → afișează layer-ul pentru fiecare regulă
• Regulile suprascrise arată "LAYERED" sau "crossed out"
• Poți inspecta care layer câștigă pentru fiecare proprietate`
  },
  {
    lessonContains: 'Cascade Layers',
    titleContains: 'scoped',
    content: `**@scope** limitează stilurile la un **subarbore DOM** specific — prevenind scurgerile nedorite și oferind encapsulare CSS nativă fără clase BEM lungi.

**Conceptul @scope**

Fără @scope, orice regulă CSS are acces la întregul document. Cu @scope, limitezi stilurile la un fragment din DOM.

**Sintaxa completă**

\`\`\`css
/* Stiluri aplicate DOAR în interiorul .card */
@scope (.card) {
  /* :scope = .card însuși */
  :scope { padding: 24px; border-radius: 12px; }
  :scope:hover { box-shadow: 0 8px 24px rgba(0,0,0,0.1); }

  /* Copiii lui .card */
  img { border-radius: 8px; aspect-ratio: 16/9; object-fit: cover; }
  h3  { font-size: 1.1rem; font-weight: 700; margin-bottom: 8px; }
  p   { color: #64748b; line-height: 1.5; }
  a   { color: var(--primary); font-weight: 500; }
}
\`\`\`

**Limita inferioară (donut scope)**

\`\`\`css
/* Stiluri ÎNTRE .article și .article__footer */
@scope (.article) to (.article__footer) {
  h2 { font-size: 1.5rem; margin-top: 2em; }
  p  { line-height: 1.8; margin-bottom: 1em; }
  a  { color: royalblue; text-decoration: underline; }
}

/* .article__footer are stiluri separate */
@scope (.article__footer) {
  a   { color: var(--text-muted); font-size: 0.85rem; }
  p   { margin: 0; }
}
\`\`\`

**@scope vs selectori descendant**

\`\`\`css
/* Clasic — risc de coliziune */
.card a { color: royalblue; }
/* Afectează ORICE <a> în orice .card, inclusiv .card imbricate */

/* Cu @scope — mai precis */
@scope (.card) to (.card) { /* se opreste la .card imbricat */
  a { color: royalblue; }
}
/* Nu afectează .card imbricate în .card */
\`\`\`

**@scope inline**

\`\`\`html
<!-- Stiluri scoped direct în HTML -->
<article class="post">
  <style>
    @scope {
      h2 { color: var(--post-accent, royalblue); }
      p  { font-family: Georgia, serif; line-height: 1.9; }
      blockquote { border-left: 4px solid currentColor; padding-left: 1em; }
    }
  </style>
  <h2>Titlul articolului</h2>
  <p>Text conținut...</p>
</article>
\`\`\`

**@scope cu custom properties**

\`\`\`css
@scope (.theme-warm) {
  :scope { --accent: #f97316; --accent-light: #fed7aa; }
  .btn   { background: var(--accent); }
  h2     { color: var(--accent); }
}

@scope (.theme-cool) {
  :scope { --accent: #3b82f6; --accent-light: #bfdbfe; }
  .btn   { background: var(--accent); }
  h2     { color: var(--accent); }
}
\`\`\`

**Suport și adoptare**

• Chrome 118+, Safari 17.4+, Firefox experimental
• Combinat cu \`@layer\` și container queries = CSS modern complet
• Alternativă CSS nativă la CSS Modules și Shadow DOM`
  },
  {
    lessonContains: 'Cascade Layers',
    titleContains: 'in design systems',
    content: `**@layer și @scope în design systems** — combinarea lor creează un sistem CSS scalabil, predictibil și ușor de menținut pe proiecte mari de echipă.

**Arhitectura completă**

\`\`\`css
/* design-system/index.css */

/* Ierarhia completă de layere */
@layer
  ds.reset,       /* normalizare browsere */
  ds.tokens,      /* design tokens */
  ds.base,        /* stiluri element */
  ds.primitives,  /* componente simple */
  ds.composites,  /* componente complexe */
  ds.overrides;   /* override-uri specifice */

/* Importuri */
@import './reset.css'               layer(ds.reset);
@import './tokens/index.css'        layer(ds.tokens);
@import './base/index.css'          layer(ds.base);
@import './primitives/index.css'    layer(ds.primitives);
@import './composites/index.css'    layer(ds.composites);
\`\`\`

**Componente cu @scope în layer**

\`\`\`css
@layer ds.primitives {

  /* Button cu @scope */
  @scope (.ds-btn) {
    :scope {
      display: inline-flex;
      align-items: center;
      gap: var(--space-2);
      padding: var(--space-2) var(--space-4);
      border-radius: var(--radius-md);
      font-weight: 600;
      cursor: pointer;
      border: 2px solid transparent;
      transition: all 0.15s;
    }

    :scope:focus-visible {
      outline: 2px solid var(--color-primary);
      outline-offset: 2px;
    }

    :scope[data-variant="primary"] {
      background: var(--color-primary);
      color: white;
    }

    :scope[data-variant="secondary"] {
      background: var(--color-bg-subtle);
      border-color: var(--color-border);
    }
  }

  /* Card cu @scope */
  @scope (.ds-card) {
    :scope {
      background: var(--color-bg-default);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-xl);
      overflow: hidden;
    }

    .ds-card-header { padding: var(--space-6); border-bottom: 1px solid var(--color-border); }
    .ds-card-body   { padding: var(--space-6); }
    .ds-card-footer { padding: var(--space-6); border-top: 1px solid var(--color-border); }
  }
}
\`\`\`

**Override-uri ale echipei fără conflict**

\`\`\`css
/* Team override layer — câștigă față de ds.primitives */
@layer ds.overrides {

  /* Override local — fără să spargi design system-ul */
  @scope (.marketing-page .ds-btn) {
    :scope[data-variant="primary"] {
      background: linear-gradient(135deg, #3b82f6, #8b5cf6);
      box-shadow: 0 4px 16px rgba(59,130,246,0.4);
    }
  }
}
\`\`\`

**Tokens cu @property pentru animabilitate**

\`\`\`css
@layer ds.tokens {
  @property --ds-primary { syntax: '<color>'; inherits: true; initial-value: #3b82f6; }
  @property --ds-radius   { syntax: '<length>'; inherits: true; initial-value: 8px; }
  @property --ds-shadow   { syntax: '*'; inherits: false; initial-value: none; }

  :root {
    --ds-primary: #3b82f6;
    --ds-radius: 8px;
  }
}
\`\`\`

**Documentarea sistemului**

\`\`\`css
/* Fiecare componentă documentată inline */
@layer ds.primitives {
  /**
   * Button Component
   * Usage: <button class="ds-btn" data-variant="primary|secondary|ghost|danger">
   * Slots: --btn-bg, --btn-color (override prin CSS custom properties)
   */
  @scope (.ds-btn) { /* ... */ }
}
\`\`\``
  },

  // L35: CSS Color Level 5
  {
    lessonContains: 'Color Level',
    titleContains: 'culori perceptiv',
    content: `**oklch() și oklab()** sunt spații de culori **perceptual uniform** — spre deosebire de hsl() sau rgb(), modificările de lightness și chroma produc schimbări vizuale egale, predictibile.

**Problema cu HSL**

\`\`\`css
/* HSL — nu e perceptual uniform */
hsl(0,   100%, 50%)  /* roșu — perceput ca mai întunecat */
hsl(60,  100%, 50%)  /* galben — perceput ca mai deschis */
hsl(240, 100%, 50%)  /* albastru — perceput ca mediu */
/* Aceeași "lightness: 50%" arată DIFERIT vizual */
\`\`\`

**oklch() — sintaxa**

\`\`\`css
/* oklch(L C H) */
/* L = lightness 0-1 (0=negru, 1=alb) */
/* C = chroma 0-0.4+ (saturație) */
/* H = hue 0-360 (nuanța) */

.element {
  color: oklch(0.6 0.2 240);   /* albastru moderat */
  color: oklch(0.7 0.15 150);  /* verde deschis */
  color: oklch(0.5 0.3 30);    /* portocaliu */
  color: oklch(none 0.2 240);  /* none = nu se specifică */
}

/* Cu alpha */
.element { color: oklch(0.6 0.2 240 / 0.5); }
\`\`\`

**Paleta consistentă cu oklch**

\`\`\`css
/* Paleta blue — lightness variabilă, hue constant */
:root {
  --blue-100: oklch(0.95 0.05 240);
  --blue-200: oklch(0.88 0.08 240);
  --blue-300: oklch(0.78 0.12 240);
  --blue-400: oklch(0.68 0.16 240);
  --blue-500: oklch(0.58 0.20 240);
  --blue-600: oklch(0.48 0.20 240);
  --blue-700: oklch(0.38 0.18 240);
  --blue-800: oklch(0.28 0.14 240);
  --blue-900: oklch(0.18 0.08 240);
}

/* Avantaj: pasul de lightness e perceptual uniform */
/* Contrastul între trepte consecutive e consistent */
\`\`\`

**oklab() — sintaxa**

\`\`\`css
/* oklab(L a b) */
/* L = lightness 0-1 */
/* a = axa verde(-) → rosu(+): -0.5 to 0.5 */
/* b = axa albastru(-) → galben(+): -0.5 to 0.5 */

.element {
  color: oklab(0.6 -0.1 0.1);   /* verzui */
  color: oklab(0.7 0.1 -0.1);   /* rosiatic-albastrui */
}
\`\`\`

**oklch vs oklab**

• **oklch** — mai intuitiv (hue = nuanța în grade, ca HSL)
• **oklab** — mai potrivit pentru interpolări matematice
• **Ambele** — perceptual uniform, bun pentru palete și gradiente

**Interpolarea gradientelor cu oklch**

\`\`\`css
/* gradient cu interpolare oklch — tranziție vizual uniformă */
.bg {
  background: linear-gradient(to right,
    oklch(0.5 0.2 0) 0%,
    oklch(0.5 0.2 120) 50%,
    oklch(0.5 0.2 240) 100%
  );
  /* Aceeași luminozitate și saturație pe tot gradientul */
}
\`\`\``
  },
  {
    lessonContains: 'Color Level',
    titleContains: 'wide-gamut',
    content: `**Display P3 și wide-gamut colors** permit utilizarea culorilor **mai vii** disponibile pe ecranele moderne, care depășesc spațiul sRGB standard.

**Ce este Display P3**

\`\`\`
sRGB = 100% din triunghiul de culori standard (monitoare vechi)
Display P3 = ~150% din sRGB (iPhone, Mac, ecrane moderne)
Rec. 2020 = ~200% din sRGB (monitoare professional HDR)

Culorile P3 "ies" din triunghiul sRGB — sunt mai saturate și vii.
\`\`\`

**Sintaxa color() pentru P3**

\`\`\`css
/* color(colorspace r g b) */
/* Valorile în P3 sunt 0-1 */

.element {
  color: color(display-p3 1 0 0);         /* roșu P3 — mai viu decât #ff0000 */
  background: color(display-p3 0 0.8 0.4); /* verde P3 vibrant */
}

/* Cu alpha */
.element { background: color(display-p3 0.2 0.6 1 / 0.8); }
\`\`\`

**Detectare suport și fallback**

\`\`\`css
/* Fallback automat pentru browsere/ecrane fără P3 */
.button {
  background: #3b82f6; /* sRGB fallback */
}

@media (color-gamut: p3) {
  .button {
    /* Culori mai vii pe ecrane P3 */
    background: color(display-p3 0.2 0.5 1);
  }
}
\`\`\`

**Cu @supports**

\`\`\`css
.vivid {
  background: #22c55e; /* sRGB */
}

@supports (color: color(display-p3 0 0 0)) {
  .vivid {
    background: color(display-p3 0 0.8 0.35); /* P3 mai vivid */
  }
}
\`\`\`

**oklch cu culori P3**

\`\`\`css
/* oklch poate reprezenta culori P3 — chroma > ~0.37 este outside sRGB */
.vivid-blue {
  color: oklch(0.6 0.32 240); /* outside sRGB — P3 needed */
}

/* Fallback automat în browsere vechi */
\`\`\`

**Gradiente wide-gamut**

\`\`\`css
/* Gradient P3 — mai vivid și mai uniform */
.hero {
  background: linear-gradient(
    to right,
    color(display-p3 0.15 0.45 1),
    color(display-p3 0.55 0.2 1)
  );
}

/* Sau cu oklch (mai ușor de controlat) */
.hero {
  background: linear-gradient(
    in oklch to right,
    oklch(0.55 0.28 245),
    oklch(0.55 0.28 310)
  );
}
\`\`\`

**Alte spații de culori**

\`\`\`css
/* Rec. 2020 — HDR, gamut foarte larg */
color(rec2020 0.5 0.3 0.8)

/* sRGB linear — fără gamma correction */
color(srgb-linear 0.2 0.4 0.8)

/* A98 RGB — Adobe standard */
color(a98-rgb 0.3 0.6 0.9)

/* ProPhoto RGB — cel mai larg */
color(prophoto-rgb 0.4 0.5 0.7)
\`\`\``
  },
  {
    lessonContains: 'Color Level',
    titleContains: 'relative colors',
    content: `**color-mix() și relative colors** permit manipularea culorilor direct în CSS — amestecarea, ajustarea luminozității, saturației și transparenței fără a hardcoda valori separate.

**color-mix() — amestecarea culorilor**

\`\`\`css
/* color-mix(in colorspace, color1 percentage, color2 percentage) */

.element {
  /* 50% blue + 50% red = violet */
  color: color-mix(in srgb, blue 50%, red 50%);

  /* Scurtătură — implicit 50/50 */
  color: color-mix(in srgb, blue, red);

  /* 30% black + 70% primary — întunecare */
  background: color-mix(in srgb, black 30%, var(--primary));

  /* 20% white + 80% primary — deschidere */
  background: color-mix(in srgb, white 20%, var(--primary));
}
\`\`\`

**color-mix în design systems — tinte și umbre**

\`\`\`css
:root {
  --primary: #3b82f6;

  /* Tinte (mai deschis) */
  --primary-50:  color-mix(in oklch, var(--primary), white 95%);
  --primary-100: color-mix(in oklch, var(--primary), white 90%);
  --primary-200: color-mix(in oklch, var(--primary), white 75%);
  --primary-300: color-mix(in oklch, var(--primary), white 55%);
  --primary-400: color-mix(in oklch, var(--primary), white 30%);

  /* Umbre (mai închis) */
  --primary-600: color-mix(in oklch, var(--primary), black 15%);
  --primary-700: color-mix(in oklch, var(--primary), black 30%);
  --primary-800: color-mix(in oklch, var(--primary), black 50%);
  --primary-900: color-mix(in oklch, var(--primary), black 70%);
}

/* Hover automat pentru orice culoare primară */
.btn--primary:hover {
  background: color-mix(in oklch, var(--primary), black 12%);
}
\`\`\`

**Relative color syntax**

\`\`\`css
/* Modificare bazată pe culoarea existentă */
.element {
  --base: oklch(0.6 0.2 240);

  /* Modifică doar lightness */
  --lighter: oklch(from var(--base) calc(l + 0.2) c h);
  --darker:  oklch(from var(--base) calc(l - 0.2) c h);

  /* Modifică chroma */
  --muted:   oklch(from var(--base) l calc(c * 0.5) h);
  --vivid:   oklch(from var(--base) l calc(c * 1.5) h);

  /* Rotire nuanță */
  --complementary: oklch(from var(--base) l c calc(h + 180));
  --triadic:       oklch(from var(--base) l c calc(h + 120));

  /* Semitransparent */
  --ghost: oklch(from var(--base) l c h / 0.3);
}
\`\`\`

**Paleta automată din culoare primară**

\`\`\`css
:root {
  --brand: oklch(0.58 0.22 240);

  /* Toate derivate automat */
  --brand-light: oklch(from var(--brand) calc(l + 0.25) c h);
  --brand-dark:  oklch(from var(--brand) calc(l - 0.2) c h);
  --brand-muted: oklch(from var(--brand) calc(l + 0.1) calc(c * 0.4) h);
  --brand-bg:    oklch(from var(--brand) 0.97 calc(c * 0.1) h);
  --brand-alpha: oklch(from var(--brand) l c h / 0.15);
}

/* Schimbă --brand și toată paleta se actualizează automat */
\`\`\``
  },
  {
    lessonContains: 'Color Level',
    titleContains: 'color-scheme',
    content: `**Gradient interpolation și color-scheme** — controlul avansat al culorilor în gradiente și gestionarea automată a temelor light/dark prin preferințele browserului.

**Gradient color interpolation**

\`\`\`css
/* Implicit: gradientele interpoleaza in sRGB */
.default {
  background: linear-gradient(to right, red, blue);
  /* Trece prin mov-gri la mijloc — nu e vivid */
}

/* Interpolare în oklch — mai vivid */
.vivid {
  background: linear-gradient(in oklch to right, red, blue);
  /* Trece prin culorile spectrului — orange, yellow, green, cyan */
}

/* Interpolare în oklab */
.perceptual {
  background: linear-gradient(in oklab to right, red, blue);
}

/* Interpolare în hsl */
.hsl-gradient {
  background: linear-gradient(in hsl to right, hsl(0 100% 50%), hsl(240 100% 50%));
}
\`\`\`

**Sintaxa color interpolation**

\`\`\`css
/* linear-gradient(in <colorspace>, ...) */
/* Spații disponibile: */
linear-gradient(in srgb to right, ...)        /* default */
linear-gradient(in srgb-linear to right, ...) /* sRGB linear */
linear-gradient(in oklch to right, ...)       /* perceptual, hue rotation */
linear-gradient(in oklab to right, ...)       /* perceptual */
linear-gradient(in hsl to right, ...)         /* hsl */
linear-gradient(in hwb to right, ...)         /* hwb */
linear-gradient(in lch to right, ...)         /* lab + chroma + hue */
linear-gradient(in display-p3 to right, ...)  /* P3 wide-gamut */
\`\`\`

**Scurtă cale vs lungă cale în hue (oklch)**

\`\`\`css
/* Shorter hue — implicit: calea mai scurtă prin spectrum */
linear-gradient(in oklch to right, oklch(0.5 0.2 20), oklch(0.5 0.2 340))
/* Trece prin alb/gri — 20→340 pe calea scurtă */

/* Longer hue — calea mai lungă */
linear-gradient(in oklch longer hue to right, oklch(0.5 0.2 20), oklch(0.5 0.2 340))
/* Trece prin toate culorile — 20→120→240→340 */

/* Increasing/decreasing */
linear-gradient(in oklch increasing hue to right, ...)
linear-gradient(in oklch decreasing hue to right, ...)
\`\`\`

**color-scheme — preferinta tema**

\`\`\`css
/* Declară ce teme suportă pagina */
:root {
  color-scheme: light dark; /* suportă ambele, preferă light */
  color-scheme: dark;       /* doar dark */
  color-scheme: light;      /* doar light */
}

/* Pe elemente individuale */
.dark-widget {
  color-scheme: dark;
  /* formele native (input, select) vor fi dark */
}

.light-section {
  color-scheme: light;
}
\`\`\`

**Culori sistem cu color-scheme**

\`\`\`css
/* Culorile sistem se adaptează la color-scheme */
.native-ui {
  color-scheme: light dark;
  background-color: Canvas;          /* culoarea de fundal sistem */
  color: CanvasText;                 /* culoarea textului sistem */
  border-color: ButtonBorder;        /* bordura butonului sistem */
}

/* Accent color sistem */
:root {
  accent-color: royalblue; /* colorează checkbox, radio, range */
}

/* Sau auto — preia culoarea accent setată de utilizator în OS */
:root { accent-color: auto; }
\`\`\`

**Rezumatul culorilor CSS moderne**

• **oklch / oklab** — palete uniforme, interpolări predictibile
• **color(display-p3)** — culori wide-gamut pe ecrane moderne
• **color-mix()** — amestecuri și tinte/umbre programatice
• **Relative colors** — derivate automate din o culoare de bază
• **Gradient interpolation** — gradiente mai vii cu interpolarea oklch
• **color-scheme** — integrare cu preferința sistem light/dark`
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
