"use strict";
require("dotenv").config({ path: ".env" });
const { PrismaClient } = require("@prisma/client");
const p = new PrismaClient();

const UPDATES = [
  {
    lessonContains: "Animații și Tranziții",
    titleContains: "transition",
    content: `**Transition** animează lin schimbările de proprietăți CSS — de la o valoare la alta în urma unui eveniment (hover, focus, class change).

**Sintaxă:**
\`\`\`css
/* Shorthand: transition: proprietate durată timing-function delay */
.buton {
  background: #3b82f6;
  transform: scale(1);
  transition: background 0.3s ease, transform 0.2s ease;
}
.buton:hover {
  background: #1d4ed8;
  transform: scale(1.05);
}
\`\`\`

**Proprietăți transition:**
\`\`\`css
.element {
  /* Proprietatea animată */
  transition-property: color;          /* o proprietate */
  transition-property: color, background, transform; /* multiple */
  transition-property: all;            /* toate — mai lent, evitat */

  /* Durata (s sau ms) */
  transition-duration: 0.3s;
  transition-duration: 300ms;

  /* Timing function — curba de accelerație */
  transition-timing-function: ease;        /* default — ease in+out */
  transition-timing-function: linear;      /* viteză constantă */
  transition-timing-function: ease-in;     /* pornire lentă */
  transition-timing-function: ease-out;    /* încheiere lentă */
  transition-timing-function: ease-in-out; /* lent la capete */
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); /* custom */
  transition-timing-function: steps(4);   /* pași discrete */

  /* Delay — întârziere înainte de start */
  transition-delay: 0s;
  transition-delay: 0.1s;
}
\`\`\`

**Proprietăți animabile eficient (fără reflow):**
\`\`\`css
/* ✅ Performante — folosesc GPU */
transition: transform 0.3s ease;    /* translate, scale, rotate */
transition: opacity 0.3s ease;
transition: filter 0.3s ease;

/* ❌ Cauzează layout reflow — mai lente */
transition: width 0.3s ease;
transition: height 0.3s ease;
transition: top 0.3s ease;
transition: margin 0.3s ease;
\`\`\`

**Exemple practice:**
\`\`\`css
/* Card hover lift */
.card {
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}
.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(0,0,0,0.15);
}

/* Link underline slide */
.link {
  position: relative;
  text-decoration: none;
}
.link::after {
  content: '';
  position: absolute;
  bottom: -2px; left: 0;
  width: 0; height: 2px;
  background: currentColor;
  transition: width 0.3s ease;
}
.link:hover::after { width: 100%; }

/* Input focus ring */
.input {
  border: 2px solid #d1d5db;
  transition: border-color 0.2s, box-shadow 0.2s;
}
.input:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59,130,246,0.15);
}
\`\`\``
  },
  {
    lessonContains: "Animații și Tranziții",
    titleContains: "transform",
    content: `**Transform** modifică vizual un element (mutare, rotire, scalare, deformare) **fără a afecta layout-ul** documentului — nu cauzează reflow, perfect pentru animații performante.

**Funcțiile transform:**
\`\`\`css
/* TRANSLATE — mutare */
transform: translate(20px, 10px);      /* X și Y */
transform: translateX(100px);          /* Doar X */
transform: translateY(-50%);           /* Sus cu 50% din propria înălțime */
transform: translate(-50%, -50%);      /* Centrare absolut */

/* SCALE — scalare */
transform: scale(1.5);         /* 150% pe ambele axe */
transform: scale(1.5, 0.8);   /* X diferit de Y */
transform: scaleX(0);          /* Ascuns pe X */

/* ROTATE — rotire */
transform: rotate(45deg);       /* 45 grade */
transform: rotate(-0.25turn);   /* -90 grade */
transform: rotateX(45deg);      /* 3D pe axa X */
transform: rotateY(180deg);     /* 3D pe axa Y */

/* SKEW — deformare */
transform: skew(15deg, 5deg);   /* X și Y */
transform: skewX(15deg);

/* MULTIPLE — se aplică de la dreapta la stânga */
transform: translateX(100px) rotate(45deg) scale(1.2);
\`\`\`

**transform-origin — punctul de origine al transformării:**
\`\`\`css
transform-origin: center;        /* default — centrul elementului */
transform-origin: top left;      /* Colțul stânga-sus */
transform-origin: 50% 50%;
transform-origin: 0 0;           /* Colțul stânga-sus */
transform-origin: bottom right;
transform-origin: 25px 75%;
\`\`\`

\`\`\`css
/* Rotire în jurul colțului */
.card { transform-origin: top left; }
.card:hover { transform: rotate(-5deg); }

/* Scalare dintr-un colț */
.menu { transform-origin: top right; }
.menu.open { transform: scale(1); }
.menu.closed { transform: scale(0); }
\`\`\`

**Centrare absolut cu transform:**
\`\`\`css
/* Clasic — centrare orizontal și vertical */
.modal {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /* translate(-50%) mută cu 50% din propria dimensiune */
  /* Nu ai nevoie să știi dimensiunile */
}
\`\`\`

**will-change — hint pentru GPU:**
\`\`\`css
.animated-element {
  will-change: transform, opacity;
  /* Browserul pregătește GPU layer dinainte */
  /* Folosit CU MODERAȚIE — costă memorie */
}
\`\`\``
  },
  {
    lessonContains: "Animații și Tranziții",
    titleContains: "@keyframes",
    content: `**@keyframes** definesc animații complexe cu multiple etape — de la valori la valori intermediare la valori finale, cu control total asupra curbei de animație.

**Sintaxă @keyframes:**
\`\`\`css
/* Keyframes cu from/to */
@keyframes fade-in {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* Keyframes cu procente — mai flexibil */
@keyframes bounce {
  0%   { transform: translateY(0); }
  25%  { transform: translateY(-30px); }
  50%  { transform: translateY(-10px); }
  75%  { transform: translateY(-20px); }
  100% { transform: translateY(0); }
}

/* Multiple proprietăți */
@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50%       { transform: scale(1.05); opacity: 0.8; }
}
\`\`\`

**Proprietăți animation:**
\`\`\`css
.element {
  /* animation: name duration timing-function delay iteration-count direction fill-mode */
  animation: fade-in 0.5s ease-out;

  /* Sau separat */
  animation-name: fade-in;
  animation-duration: 0.5s;
  animation-timing-function: ease-out;
  animation-delay: 0.2s;
  animation-iteration-count: 1;       /* 1 (default), infinite */
  animation-direction: normal;        /* normal, reverse, alternate, alternate-reverse */
  animation-fill-mode: forwards;      /* none, forwards, backwards, both */
  animation-play-state: running;      /* running, paused */
}
\`\`\`

**animation-fill-mode — starea după animație:**
\`\`\`css
@keyframes slide-in {
  from { transform: translateX(-100%); }
  to   { transform: translateX(0); }
}

/* forwards = rămâne la starea finală */
.slide-in { animation: slide-in 0.4s ease-out forwards; }
/* Fără forwards → elementul revine la starea inițială */
\`\`\`

**Animații staggered (decalate):**
\`\`\`css
.card { animation: fade-up 0.4s ease-out both; }
.card:nth-child(1) { animation-delay: 0ms; }
.card:nth-child(2) { animation-delay: 100ms; }
.card:nth-child(3) { animation-delay: 200ms; }
.card:nth-child(4) { animation-delay: 300ms; }

/* Sau cu custom property */
.card { animation-delay: calc(var(--index, 0) * 100ms); }
\`\`\`

**Loading spinner:**
\`\`\`css
@keyframes spin {
  to { transform: rotate(360deg); }
}

.spinner {
  width: 40px; height: 40px;
  border: 4px solid #e5e7eb;
  border-top-color: #3b82f6;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}
\`\`\``
  },
  {
    lessonContains: "Responsive Design",
    titleContains: "Media queries",
    content: `**Media queries** aplică stiluri CSS condiționat — în funcție de dimensiunea ecranului, orientare, preferințe sistem și alte caracteristici ale dispozitivului.

**Sintaxă de bază:**
\`\`\`css
/* Mobile-first — stiluri de bază pentru mobile, override pentru ecrane mari */
.container { width: 100%; padding: 0 16px; }

@media (min-width: 640px)  { .container { max-width: 640px; } }
@media (min-width: 768px)  { .container { max-width: 768px; } }
@media (min-width: 1024px) { .container { max-width: 1024px; margin: 0 auto; } }
@media (min-width: 1280px) { .container { max-width: 1280px; } }
\`\`\`

**Breakpoints comune (Tailwind-inspired):**
\`\`\`css
/* sm: 640px, md: 768px, lg: 1024px, xl: 1280px, 2xl: 1536px */

/* Mobile first — scriem stiluri pentru mobile, adăugăm pentru desktop */
.grid { grid-template-columns: 1fr; }               /* Mobile */
@media (min-width: 640px)  { .grid { grid-template-columns: repeat(2, 1fr); } }
@media (min-width: 1024px) { .grid { grid-template-columns: repeat(3, 1fr); } }

/* Desktop first — scriem pentru desktop, simplificăm pentru mobile */
.grid { grid-template-columns: repeat(3, 1fr); }
@media (max-width: 1023px) { .grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 639px)  { .grid { grid-template-columns: 1fr; } }
\`\`\`

**Media features:**
\`\`\`css
/* Orientare */
@media (orientation: landscape) { .hero { height: 50vh; } }
@media (orientation: portrait)  { .hero { height: 80vh; } }

/* Hover support — touchscreen vs mouse */
@media (hover: hover) {
  .card:hover { transform: translateY(-4px); }
}

/* Preferințe sistem */
@media (prefers-color-scheme: dark) {
  :root { --bg: #1a1a1a; --text: #f5f5f5; }
}
@media (prefers-reduced-motion: reduce) {
  * { animation: none !important; transition: none !important; }
}

/* Rezoluție Retina */
@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
  .logo { background-image: url('logo@2x.png'); }
}

/* Print */
@media print {
  .navbar, .sidebar, .ads { display: none; }
  body { font-size: 12pt; color: black; }
}
\`\`\`

**Media query range syntax (modern):**
\`\`\`css
/* Nou în 2022 — mai lizibil */
@media (width >= 768px) { /* ... */ }
@media (768px <= width < 1024px) { /* ... */ }
\`\`\``
  },
  {
    lessonContains: "Responsive Design",
    titleContains: "Unități responsive",
    content: `**Unitățile responsive** fac elementele să se adapteze dinamic la contextul lor — viewport, parent sau font-size de referință.

**Unități relative la font:**
\`\`\`css
/* rem — relativ la font-size ROOT (html) */
html { font-size: 16px; }  /* default browser */
.title { font-size: 2rem; }     /* 32px */
.small { font-size: 0.875rem; } /* 14px */
/* ✅ rem pentru fonturi — consistent, accesibil */

/* em — relativ la font-size PARENT */
.parent { font-size: 20px; }
.child { font-size: 1.5em; }   /* 30px (1.5 × 20px) */
.child-2 { padding: 1em; }    /* 30px padding (bazat pe font-size copil) */
/* ✅ em pentru padding/margin când vrei să se scaleze cu fontul */
\`\`\`

**Unități relative la viewport:**
\`\`\`css
/* vw — viewport width */
.hero-title { font-size: 5vw; }  /* 5% din lățimea ferestrei */

/* vh — viewport height */
.hero { height: 100vh; }         /* Înălțimea ferestrei */
.hero { min-height: 100dvh; }    /* dvh = dynamic viewport height (mobile) */

/* vmin / vmax */
.square { width: 50vmin; height: 50vmin; } /* 50% din dimensiunea mai mică */

/* svh, dvh, lvh — pentru mobile (iOS Safari safe area) */
.modal { height: 100svh; }  /* small viewport height — mai sigur pe iOS */
\`\`\`

**clamp() — fluid typography:**
\`\`\`css
/* clamp(min, preferred, max) */
h1 { font-size: clamp(1.5rem, 4vw, 3rem); }
/* Niciodată sub 1.5rem, niciodată peste 3rem, ideally 4vw */

.container {
  padding: clamp(1rem, 5vw, 3rem);  /* Fluid padding */
  width: clamp(280px, 90%, 1200px); /* Fluid width */
}
\`\`\`

**min() și max():**
\`\`\`css
/* min() — cel mai mic */
.image { width: min(600px, 100%); }
/* Mai mic: 600px sau 100% din parent → responsiv automat */

/* max() — cel mai mare */
.text { font-size: max(16px, 1.5vw); }
/* Cel puțin 16px, crește cu viewport */

/* Combinații */
.sidebar { width: min(300px, 30vw); }
.content { flex: 1; min-width: max(200px, 40%); }
\`\`\`

**ch și lh:**
\`\`\`css
/* ch — lățimea caracterului "0" */
.text-readable { max-width: 65ch; }  /* ~65 caractere pe linie = optimal */

/* lh — înălțimea unui rând */
.card { min-height: 10lh; }  /* Minim 10 rânduri de text */
\`\`\``
  },
  {
    lessonContains: "Responsive Design",
    titleContains: "Imagini",
    content: `**Imagini și layout responsive** — imagini fluide, srcset pentru retina, și pattern-uri de layout care se adaptează la orice ecran.

**Imagini fluide:**
\`\`\`css
/* Imaginea nu depășește containerul */
img {
  max-width: 100%;  /* Niciodată mai lată decât parent-ul */
  height: auto;     /* Păstrează aspect ratio */
  display: block;   /* Elimină spațiu alb sub imagine (inline gap) */
}

/* object-fit — cum se comportă imaginea în container */
.card-image {
  width: 100%;
  height: 200px;
  object-fit: cover;   /* Umple, decupează dacă e nevoie */
  object-fit: contain; /* Încape, lasă spațiu negru */
  object-fit: fill;    /* Distorsionare */
  object-position: center top; /* Punct focal */
}
\`\`\`

**aspect-ratio — dimensiuni proporționale:**
\`\`\`css
/* Container cu raport fix */
.video-wrapper {
  aspect-ratio: 16 / 9;
  width: 100%;
}

.thumbnail {
  aspect-ratio: 4 / 3;
  object-fit: cover;
}

.avatar {
  width: 60px;
  aspect-ratio: 1;  /* Pătrat */
  border-radius: 50%;
}
\`\`\`

**srcset pentru Retina și responsive:**
\`\`\`html
<!-- Imagini diferite pentru rezoluții diferite -->
<img
  src="photo-800.jpg"
  srcset="photo-400.jpg 400w,
          photo-800.jpg 800w,
          photo-1600.jpg 1600w"
  sizes="(max-width: 640px) 100vw,
         (max-width: 1024px) 50vw,
         800px"
  alt="Fotografie"
/>

<!-- <picture> pentru format modern cu fallback -->
<picture>
  <source type="image/webp" srcset="photo.webp">
  <source type="image/avif" srcset="photo.avif">
  <img src="photo.jpg" alt="Fotografie">
</picture>
\`\`\`

**Layout responsive fără media queries:**
\`\`\`css
/* Grid auto-responsive */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  /* 4 coloane pe desktop → 2 pe tablet → 1 pe mobile, automat */
}

/* Flexbox wrap */
.flex-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}
.flex-grid > * {
  flex: 1 1 250px;  /* Crește/scade, dar nu sub 250px */
}
\`\`\``
  },
  {
    lessonContains: "CSS Modern",
    titleContains: "Custom Properties",
    content: `**CSS Custom Properties** (variabile CSS) stochează valori reutilizabile care pot fi schimbate dinamic și moștenite prin arborele DOM.

**Declarare și utilizare:**
\`\`\`css
/* Declarare în :root — disponibile global */
:root {
  /* Culori */
  --color-primary: #3b82f6;
  --color-secondary: #8b5cf6;
  --color-success: #22c55e;
  --color-error: #ef4444;
  --color-bg: #ffffff;
  --color-text: #1a1a1a;

  /* Spațieri */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 48px;

  /* Tipografie */
  --font-sans: 'Inter', system-ui, sans-serif;
  --font-mono: 'Fira Code', monospace;
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.25rem;

  /* Raze */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 16px;
  --radius-full: 9999px;
}

/* Utilizare cu var() */
.buton {
  background: var(--color-primary);
  color: white;
  border-radius: var(--radius-md);
  padding: var(--spacing-sm) var(--spacing-md);
  font-family: var(--font-sans);
}

/* var() cu fallback */
.text { color: var(--color-brand, #3b82f6); }
/* Dacă --color-brand nu există, folosește #3b82f6 */
\`\`\`

**Scope local — variabile per componentă:**
\`\`\`css
/* Suprascrierea locală */
.card-warning {
  --color-accent: #f59e0b;  /* Suprascrie doar în .card-warning */
}

.card-error {
  --color-accent: #ef4444;
}

.card-header {
  background: var(--color-accent, #3b82f6);
  /* Preia culoarea din cel mai apropiat ancestor cu variabila definită */
}
\`\`\`

**Schimbare dinamică cu JavaScript:**
\`\`\`javascript
// Schimbă tema global
document.documentElement.style.setProperty('--color-bg', '#1a1a1a');
document.documentElement.style.setProperty('--color-text', '#f5f5f5');

// Citire valoare
const primary = getComputedStyle(document.documentElement)
  .getPropertyValue('--color-primary').trim();
\`\`\``
  },
  {
    lessonContains: "CSS Modern",
    titleContains: "calc()",
    content: `**calc()** permite calcule matematice în CSS — combinând unități diferite (px + %, rem + vw), imposibil de obținut altfel.

**Sintaxă și operatori:**
\`\`\`css
/* Spații obligatorii în jurul + și - */
width: calc(100% - 240px);     /* ✅ */
width: calc(100%-240px);       /* ❌ Incorect */
width: calc(100% * 2);         /* ✅ */
width: calc(100% / 3);         /* ✅ */

/* Operatori disponibili: + - * / */
\`\`\`

**Cazuri de utilizare frecvente:**
\`\`\`css
/* Layout cu sidebar fix */
.main-content {
  width: calc(100% - 260px);  /* 100% minus sidebar */
  margin-left: 260px;
}

/* Centrare cu offset */
.dialog {
  position: fixed;
  left: calc(50% - 300px);  /* Stânga = centru - jumătate lățime */
  top: calc(50% - 200px);
  width: 600px; height: 400px;
}

/* Spațiere precisă */
.grid-item {
  /* 3 coloane cu gap 16px */
  width: calc((100% - 2 * 16px) / 3);
  /* = (100% - 32px) / 3 */
}

/* Font fluid (înainte de clamp()) */
.fluid-text {
  font-size: calc(16px + 0.5vw);
  /* 16px pe mobile + creste cu viewport */
}

/* Înălțime full fără header */
.page-content {
  min-height: calc(100vh - 64px);  /* 64px = înălțimea header-ului */
}
\`\`\`

**Calcule cu variabile CSS:**
\`\`\`css
:root { --header-height: 64px; --sidebar-width: 260px; }

.main {
  height: calc(100vh - var(--header-height));
  width: calc(100% - var(--sidebar-width));
}
\`\`\`

**Funcții similare:**
\`\`\`css
/* min() — cel mai mic */
.container { width: min(1200px, 100%); }
/* 1200px pe ecrane mari, 100% pe mobile */

/* max() — cel mai mare */
.padding { padding: max(16px, 3vw); }
/* Cel puțin 16px, mai mult pe ecrane mari */

/* clamp(min, ideal, max) */
.title { font-size: clamp(1.5rem, 3vw + 1rem, 3rem); }
/* Fluid typography fără media queries */

/* round() — rotunjire (nou în CSS) */
.grid { gap: round(2.3px, 1px); }  /* 2px */
\`\`\``
  },
  {
    lessonContains: "CSS Modern",
    titleContains: "Gradients",
    content: `**Gradienți CSS** creează tranziții de culoare — liniari, radiali sau conici — fără imagini externe. **Backgrounds** avansate combină multiple imagini și gradienți.

**Linear gradient:**
\`\`\`css
/* Direcție și culori */
background: linear-gradient(to right, #3b82f6, #8b5cf6);
background: linear-gradient(135deg, #667eea, #764ba2);
background: linear-gradient(to bottom, #f9fafb, #e5e7eb);

/* Cu procente — control precis */
background: linear-gradient(90deg,
  #3b82f6 0%,
  #3b82f6 50%,
  #8b5cf6 50%,  /* Hard stop — fără degradare */
  #8b5cf6 100%
);

/* Multiple culori */
background: linear-gradient(
  135deg,
  #f9a8d4 0%,   /* roz */
  #c4b5fd 33%,  /* lila */
  #93c5fd 66%,  /* albastru deschis */
  #6ee7b7 100%  /* verde */
);
\`\`\`

**Radial gradient:**
\`\`\`css
/* De la centru spre margini */
background: radial-gradient(circle, #3b82f6, #1e3a5f);

/* Elipsă sau cerc */
background: radial-gradient(ellipse at top, #f9a8d4, transparent);
background: radial-gradient(circle at 30% 70%, #3b82f6 0%, transparent 60%);
\`\`\`

**Conic gradient (nou):**
\`\`\`css
/* Grafic tip donut/pie */
background: conic-gradient(
  #ef4444 0deg 90deg,   /* Roșu 25% */
  #3b82f6 90deg 180deg, /* Albastru 25% */
  #22c55e 180deg 270deg, /* Verde 25% */
  #f59e0b 270deg 360deg  /* Galben 25% */
);
border-radius: 50%;
\`\`\`

**Background multiplu:**
\`\`\`css
/* Multiple background-uri (ultimul = cel mai jos) */
.hero {
  background:
    linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)),  /* Overlay */
    url('hero.jpg') center/cover no-repeat;              /* Imagine */
}

/* Pattern cu repeat */
.pattern {
  background-image:
    radial-gradient(circle, #3b82f6 1px, transparent 1px);
  background-size: 24px 24px;
}
\`\`\`

**Gradient text:**
\`\`\`css
.gradient-text {
  background: linear-gradient(90deg, #3b82f6, #8b5cf6);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
\`\`\``
  },
  {
    lessonContains: "CSS Modern",
    titleContains: "Filter",
    content: `**Filter** și **blend modes** aplică efecte grafice elementelor — blur, brightness, contrast, saturație, sepia și mod de amestecare cu fundalul.

**filter — efecte pe element:**
\`\`\`css
/* Funcțiile filter disponibile */
.imagine {
  filter: blur(4px);              /* Estompare */
  filter: brightness(1.2);        /* 120% luminozitate */
  filter: contrast(1.5);          /* 150% contrast */
  filter: saturate(0);            /* Alb-negru */
  filter: saturate(2);            /* Saturație dublă */
  filter: hue-rotate(90deg);      /* Rotire nuanță */
  filter: invert(1);              /* Inversare culori */
  filter: sepia(0.8);             /* Efect sepia 80% */
  filter: grayscale(1);           /* Complet alb-negru */
  filter: opacity(0.5);           /* Transparență 50% */
  filter: drop-shadow(4px 4px 8px rgba(0,0,0,0.5));
  /* drop-shadow urmărește conturul elementului (px, png cu transparență) */
  /* vs box-shadow care e mereu dreptunghi */
}

/* Multiple filtre */
.vintage {
  filter: sepia(0.5) contrast(1.1) brightness(0.95) hue-rotate(15deg);
}
\`\`\`

**backdrop-filter — filtrare fundal (glassmorphism):**
\`\`\`css
.glass-card {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(20px) saturate(1.8);
  -webkit-backdrop-filter: blur(20px) saturate(1.8);
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 16px;
  /* Elementele din spatele cardului sunt blur-ate */
}

/* Header transparent cu blur */
.sticky-header {
  position: sticky;
  top: 0;
  background: rgba(255,255,255,0.8);
  backdrop-filter: blur(12px);
}
\`\`\`

**mix-blend-mode și background-blend-mode:**
\`\`\`css
/* mix-blend-mode — cum se amestecă cu elementele de dedesubt */
.overlay-text {
  mix-blend-mode: multiply;    /* Multiply */
  mix-blend-mode: screen;      /* Brighten */
  mix-blend-mode: overlay;     /* Contrast */
  mix-blend-mode: difference;  /* Efect dramatic */
}

/* background-blend-mode — blend între background-uri multiple */
.hero {
  background: url('texture.png'), linear-gradient(#3b82f6, #1e3a5f);
  background-blend-mode: multiply;
}
\`\`\``
  },
  {
    lessonContains: "Pseudo-clase",
    titleContains: "Pseudo-clase de stare",
    content: `**Pseudo-clasele de stare** selectează elemente în funcție de interacțiunea utilizatorului sau starea lor funcțională — hover, focus, active, checked, disabled.

**Interacțiune:**
\`\`\`css
/* :hover — cursor deasupra elementului */
.buton:hover { background: #1d4ed8; }
.card:hover { box-shadow: 0 8px 24px rgba(0,0,0,0.1); }
.link:hover { color: #3b82f6; }

/* :focus — element focusat (tastatură sau click) */
input:focus { outline: 2px solid #3b82f6; }
:focus { outline: 2px solid currentColor; }

/* :focus-visible — NUMAI focus din tastatură (nu mouse) */
button:focus-visible { outline: 2px solid #3b82f6; outline-offset: 2px; }
button:focus:not(:focus-visible) { outline: none; }

/* :focus-within — parent are un descendent focusat */
.form-group:focus-within label { color: #3b82f6; }
.search:focus-within { box-shadow: 0 0 0 3px rgba(59,130,246,0.15); }

/* :active — în momentul click-ului */
button:active { transform: scale(0.97); }

/* :visited — link vizitat */
a:visited { color: #7c3aed; }
\`\`\`

**Stări formulare:**
\`\`\`css
/* Stări native */
input:enabled { opacity: 1; }
input:disabled { opacity: 0.5; cursor: not-allowed; }
input:read-only { background: #f9fafb; }
input:read-write { background: white; }

input:checked + label { font-weight: bold; }
input[type="checkbox"]:checked { accent-color: #3b82f6; }

/* Validare HTML5 */
input:valid { border-color: #22c55e; }
input:invalid { border-color: #ef4444; }
input:required::after { content: ' *'; color: red; }

/* Placeholder */
input:placeholder-shown { border-style: dashed; }
input:not(:placeholder-shown) { border-style: solid; }

/* :user-valid și :user-invalid — după interacțiune utilizator */
input:user-valid { border-color: #22c55e; }
input:user-invalid { border-color: #ef4444; }
\`\`\`

**:target — ancora URL activă:**
\`\`\`css
/* URL: pagina.html#sectiune1 */
#sectiune1:target { background: #fef3c7; scroll-margin-top: 80px; }

/* Modal cu anchor */
.modal { display: none; }
.modal:target { display: flex; }
\`\`\``
  },
  {
    lessonContains: "Pseudo-clase",
    titleContains: "structurale",
    content: `**Pseudo-clasele structurale** selectează elemente în funcție de poziția lor în arborele HTML — utilitate pentru stilizarea listelor, tabelelor și componentelor cu pattern-uri repetitive.

**:nth-child și variante:**
\`\`\`css
/* Formule An+B: n = 0,1,2,3... */
li:nth-child(1)    { /* Primul element */ }
li:nth-child(3)    { /* Al treilea */ }
li:nth-child(-n+3) { /* Primele 3 */ }
li:nth-child(n+4)  { /* De la al 4-lea în sus */ }

/* Parity */
tr:nth-child(odd)  { background: #f9fafb; }  /* 1,3,5... */
tr:nth-child(even) { background: white; }     /* 2,4,6... */

/* La fiecare N elemente */
li:nth-child(3n)   { color: blue; }     /* 3,6,9,12... */
li:nth-child(3n+1) { color: red; }      /* 1,4,7,10... */

/* :nth-last-child — de la sfârșit */
li:nth-last-child(1) { /* Ultimul */ }
li:nth-last-child(-n+2) { /* Ultimele 2 */ }
\`\`\`

**:nth-of-type — filtrare după tip:**
\`\`\`css
/* Selectează al n-lea element de acel TIP, nu al n-lea copil */
p:nth-of-type(2) { /* Al doilea <p>, indiferent de alte elemente */ }
img:nth-of-type(odd) { float: left; }
img:nth-of-type(even) { float: right; }
\`\`\`

**:first-child, :last-child, :only-child:**
\`\`\`css
li:first-child { border-top: none; }
li:last-child  { border-bottom: none; }
li:only-child  { display: flex; justify-content: center; }

/* Elimină margin pe primul/ultimul */
.stack > * + * { margin-top: 16px; }  /* Margin ÎNTRE itemi */
/* Sau cu :not() */
.list-item:not(:last-child) { margin-bottom: 8px; }
\`\`\`

**:empty și :root:**
\`\`\`css
:empty { display: none; }   /* Ascunde elementele fără conținut */
:root { font-size: 16px; }  /* Selectează <html> */

/* Diferit de html {} — :root are specificitate mai mare (0-1-0 vs 0-0-1) */
\`\`\`

**Numărare CSS cu counter:**
\`\`\`css
.list { counter-reset: item; }
.list li { counter-increment: item; }
.list li::before {
  content: counter(item) ". ";
  font-weight: bold;
  color: #3b82f6;
}
\`\`\``
  },
  {
    lessonContains: "Pseudo-clase",
    titleContains: ":is, :where, :has avansat",
    content: `**:is()**, **:where()** și **:has()** sunt pseudo-clasele moderne care simplifică selectorii, reduc specificitatea și permit selectarea bazată pe descendenți.

**:is() — grupare cu specificitate:**
\`\`\`css
/* Grupare — specifictatea e a selectorului cu cea mai mare specificitate din grup */

/* ❌ Verbose — trebuie repetat */
header h1, header h2, header h3,
main h1, main h2, main h3,
footer h1, footer h2, footer h3 { color: #1e3a5f; }

/* ✅ Cu :is() — mai scurt */
:is(header, main, footer) :is(h1, h2, h3) { color: #1e3a5f; }
/* Specifictate: max(header=0-0-1, h1=0-0-1) = 0-0-1 */

/* :is() cu selector de clasă (specifictate = 0-1-0) */
:is(.error, .warning, .info) > p { padding: 12px; }
\`\`\`

**:where() — specificitate zero:**
\`\`\`css
/* :where() = identic cu :is() DAR specificitate = 0 */
:where(header, main, footer) h1 { font-size: 2rem; }
/* Poate fi suprascris de orice selector! */

/* Ideal pentru reset/normalize */
:where(h1, h2, h3, h4, h5, h6) { margin: 0; line-height: 1.2; }
/* Poate fi suprascris simplu cu: h2 { margin-bottom: 1rem; } */

/* Design system base styles */
:where(button, input, select, textarea) {
  font-family: inherit;
  font-size: 100%;
}
\`\`\`

**:has() — selectorel "parent":**
\`\`\`css
/* Selectează parent-ul pe baza descendentului */

/* Card cu imagine — padding redus */
.card:has(img) { padding: 0; }
.card:has(img) .card-body { padding: 1rem; }

/* Form group cu eroare */
.form-group:has(input:invalid) label { color: #ef4444; }
.form-group:has(input:focus) { box-shadow: 0 0 0 2px #3b82f6; }

/* Nav cu link activ */
.nav:has(.active) { border-bottom-color: #3b82f6; }

/* Layout adaptat */
.grid:has(.card-wide) { grid-template-columns: 2fr 1fr; }
.page:has(.modal-open) { overflow: hidden; }

/* Contoare dinamice */
.cart-badge:has(+ .cart-empty) { display: none; }

/* Combinare puternică */
:is(section, article):has(h2):not(:has(p)) { background: #fef3c7; }
\`\`\``
  }
];

async function main() {
  let updated = 0, notFound = 0;
  for (const item of UPDATES) {
    const lessons = await p.lesson.findMany({
      where: { module: { slug: "css" }, title: { contains: item.lessonContains } }
    });
    if (!lessons.length) { console.log("! Lec: " + item.lessonContains); notFound++; continue; }
    const theory = await p.theory.findFirst({
      where: { lessonId: { in: lessons.map(l => l.id) }, title: { contains: item.titleContains } }
    });
    if (!theory) { console.log("! Teo: " + item.titleContains + " in " + item.lessonContains); notFound++; continue; }
    await p.theory.update({ where: { id: theory.id }, data: { content: item.content } });
    console.log("✓ " + theory.title.substring(0, 45) + ": " + theory.content.length + " → " + item.content.length);
    updated++;
  }
  console.log("\nDone: " + updated + " updated, " + notFound + " not found");
  await p.$disconnect();
}
main().catch(e => { console.error(e); p.$disconnect(); process.exit(1); });
