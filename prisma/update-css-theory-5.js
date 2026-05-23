const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();

const items = [
  // L17: Transform
  {
    lessonContains: 'Transform',
    titleContains: 'Funcții transform',
    content: `**Funcțiile transform** mișcă, rotesc, scalează și deformează elemente **fără a afecta layout-ul** — celelalte elemente nu se mișcă. Sunt accelerate GPU și perfecte pentru animații.

**translate — mutare**

\`\`\`css
.element {
  transform: translateX(50px);      /* orizontal */
  transform: translateY(-20px);     /* vertical */
  transform: translate(50px, -20px); /* ambele simultan */
  transform: translateZ(100px);     /* adâncime 3D */
  transform: translate3d(50px, -20px, 100px); /* shorthand 3D */
}

/* Centrare clasică */
.centered {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

/* % = relativ la dimensiunile ELEMENTULUI, nu părintelui */
.slide-out { transform: translateX(100%); } /* iese din container */
\`\`\`

**rotate — rotire**

\`\`\`css
.element {
  transform: rotate(45deg);         /* rotire 2D */
  transform: rotateX(45deg);        /* rotire pe axa X (3D) */
  transform: rotateY(45deg);        /* rotire pe axa Y (3D) */
  transform: rotateZ(45deg);        /* identic cu rotate() */
  transform: rotate3d(1, 1, 0, 45deg); /* axa personalizată */
}

/* Rotire continuă */
.spinner {
  animation: spin 1s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }

/* Feedback icon */
.chevron {
  transform: rotate(0deg);
  transition: transform 0.3s ease;
}
.open .chevron { transform: rotate(180deg); }
\`\`\`

**scale — scalare**

\`\`\`css
.element {
  transform: scale(1.1);            /* scalare uniformă */
  transform: scaleX(2);             /* doar orizontal */
  transform: scaleY(0.5);           /* doar vertical */
  transform: scale(1.2, 0.8);       /* orizontal, vertical diferit */
  transform: scale3d(1.1, 1.1, 1);  /* 3D */
}

/* Scale pe hover — card */
.card {
  transition: transform 0.2s ease;
}
.card:hover { transform: scale(1.02); }

/* Scale negativ = flip */
.flipped-h { transform: scaleX(-1); } /* oglindire orizontală */
.flipped-v { transform: scaleY(-1); } /* oglindire verticală */
\`\`\`

**skew — deformare**

\`\`\`css
.element {
  transform: skewX(15deg);
  transform: skewY(10deg);
  transform: skew(15deg, 10deg);
}

/* Efect parallelogram */
.badge {
  transform: skewX(-10deg);
}
.badge-inner {
  transform: skewX(10deg); /* contra-skew pe conținut */
}
\`\`\`

**Combinarea funcțiilor transform**

\`\`\`css
/* Ordinea CONTEAZĂ — se aplică de la dreapta la stânga */
.a {
  transform: translateX(100px) rotate(45deg);
  /* mai întâi rotate, apoi translate */
}

.b {
  transform: rotate(45deg) translateX(100px);
  /* mai întâi translate, apoi rotate — rezultat DIFERIT */
}

/* Best practice: translate3d pentru toate mutările */
.card {
  transform: translate3d(0, 0, 0); /* activează compositing layer */
  transition: transform 0.3s ease;
}
.card:hover {
  transform: translate3d(0, -4px, 0) scale(1.01);
}
\`\`\``
  },
  {
    lessonContains: 'Transform',
    titleContains: 'transform-origin',
    content: `**transform-origin** definește **punctul de origine** în jurul căruia se aplică transformarea. Schimbarea originii produce efecte complet diferite cu aceeași funcție transform.

**Valorile transform-origin**

\`\`\`css
/* Sintaxa: x y z */
.element { transform-origin: center center; }  /* default = 50% 50% */
.element { transform-origin: top left; }       /* colț stânga-sus */
.element { transform-origin: bottom right; }   /* colț dreapta-jos */
.element { transform-origin: 0 0; }            /* identic cu top left */
.element { transform-origin: 100% 100%; }      /* identic cu bottom right */
.element { transform-origin: 20px 80%; }       /* mix px și % */
.element { transform-origin: 50% 50% 100px; }  /* x y z (3D) */
\`\`\`

**Efecte cu transform-origin diferit**

\`\`\`css
/* Ușă care se deschide — rotire din marginea stângă */
.door {
  transform-origin: left center;
  transform: rotateY(0deg);
  transition: transform 0.5s ease;
}
.door.open { transform: rotateY(-80deg); }

/* Meniu dropdown care apare din colț */
.dropdown {
  transform-origin: top right;
  transform: scale(0);
  opacity: 0;
  transition: transform 0.2s ease, opacity 0.2s ease;
}
.parent:hover .dropdown {
  transform: scale(1);
  opacity: 1;
}

/* Scalare din centru vs din colț */
.from-center {
  transform-origin: center;
  transform: scale(0);
}
.from-top-left {
  transform-origin: top left;
  transform: scale(0);
}
\`\`\`

**Transform 3D — perspectivă**

\`\`\`css
/* perspective se aplică pe PARINTE */
.scene {
  perspective: 800px;         /* distanța observatorului */
  perspective-origin: 50% 50%; /* poziția observatorului */
}

.cube {
  transform-style: preserve-3d; /* copiii există în spațiu 3D */
  transform: rotateY(45deg);
}

/* Față și spate */
.front, .back {
  backface-visibility: hidden; /* ascunde fețele invizibile */
  position: absolute;
  inset: 0;
}

.back {
  transform: rotateY(180deg);
}
\`\`\`

**Card flip 3D complet**

\`\`\`css
.flip-container {
  perspective: 1000px;
  width: 300px;
  height: 200px;
}

.flip-card {
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.flip-container:hover .flip-card,
.flip-container:focus-within .flip-card {
  transform: rotateY(180deg);
}

.flip-front, .flip-back {
  position: absolute;
  inset: 0;
  backface-visibility: hidden;
  border-radius: 12px;
}

.flip-back {
  transform: rotateY(180deg);
  background: var(--primary);
  color: white;
}
\`\`\`

**Reguli importante**

• \`perspective\` pe parinte, \`transform-style: preserve-3d\` pe elementul 3D
• \`backface-visibility: hidden\` previne "fantoma" inversată
• Ordinea funcțiilor transform influențează rezultatul final
• Combină cu \`will-change: transform\` pentru animații complexe 3D`
  },
  {
    lessonContains: 'Transform',
    titleContains: 'Card flip',
    content: `**Card flip 3D** este un pattern clasic care demonstrează combinarea \`perspective\`, \`rotateY\` și \`backface-visibility\`. Iată implementarea completă cu variante și accesibilitate.

**Implementare card flip de bază**

\`\`\`css
.card-container {
  perspective: 1000px;
}

.card {
  position: relative;
  width: 320px;
  height: 240px;
  transform-style: preserve-3d;
  transition: transform 0.7s ease;
  cursor: pointer;
}

.card:hover,
.card:focus-within {
  transform: rotateY(180deg);
}

.card-face {
  position: absolute;
  inset: 0;
  border-radius: 16px;
  backface-visibility: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px;
}

.card-front {
  background: white;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.card-back {
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  color: white;
  transform: rotateY(180deg);
}
\`\`\`

**Variante de flip**

\`\`\`css
/* Flip pe axa X (vertical) */
.flip-x:hover { transform: rotateX(180deg); }
.flip-x .card-back { transform: rotateX(180deg); }

/* Flip diagonal */
.flip-diagonal:hover {
  transform: rotateY(90deg) rotateX(90deg);
}

/* Unfold — apare de sub */
.unfold:hover { transform: rotateX(-180deg); }
.unfold .card-back { transform: rotateX(180deg); }
\`\`\`

**Flip cu buton (accesibil)**

\`\`\`html
<div class="flip-card" role="button" tabindex="0" aria-label="Flip card">
  <div class="flip-inner">
    <div class="flip-front" aria-hidden="false">
      <h3>Față</h3>
    </div>
    <div class="flip-back" aria-hidden="true">
      <p>Spate</p>
    </div>
  </div>
</div>
\`\`\`

\`\`\`css
.flip-card[aria-pressed="true"] .flip-inner {
  transform: rotateY(180deg);
}

/* Update aria-hidden dinamic cu JS */
\`\`\`

\`\`\`javascript
const card = document.querySelector('.flip-card');
card.addEventListener('click', () => {
  const pressed = card.getAttribute('aria-pressed') === 'true';
  card.setAttribute('aria-pressed', !pressed);
  card.querySelector('.flip-front').setAttribute('aria-hidden', !pressed);
  card.querySelector('.flip-back').setAttribute('aria-hidden', pressed);
});

card.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    card.click();
  }
});
\`\`\`

**Reducere mișcare**

\`\`\`css
@media (prefers-reduced-motion: reduce) {
  .card {
    transition: none;
  }

  .card:hover .card-front { opacity: 0; }
  .card:hover .card-back  { opacity: 1; }

  .card-back {
    opacity: 0;
    transition: opacity 0.1s;
    transform: none; /* nu mai rotim */
  }
}
\`\`\`

**Debugging 3D**

\`\`\`css
/* Vizualizare temporară */
.debug-3d * {
  outline: 1px solid red;
}

/* Verifică că preserve-3d este pe elementul potrivit */
/* Dacă flip-ul nu funcționează, verifică: */
/* 1. perspective pe container */
/* 2. transform-style: preserve-3d pe .card */
/* 3. backface-visibility: hidden pe ambele fețe */
/* 4. .card-back are transform: rotateY(180deg) */
\`\`\``
  },

  // L18: Animații @keyframes
  {
    lessonContains: 'keyframes',
    titleContains: 'animation',
    content: `**@keyframes și animation** permit crearea de animații CSS complexe cu control precis asupra fiecărui pas. Spre deosebire de tranziții, animațiile rulează **automat** fără trigger extern.

**Sintaxa @keyframes**

\`\`\`css
/* Cu procente */
@keyframes slideIn {
  0%   { transform: translateX(-100%); opacity: 0; }
  60%  { transform: translateX(10px); }
  100% { transform: translateX(0); opacity: 1; }
}

/* Cu from/to (echivalent 0% / 100%) */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* Același keyframe la mai mulți pași */
@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50%       { transform: scale(1.05); }
}
\`\`\`

**Proprietatea animation**

\`\`\`css
.element {
  /* name | duration | timing | delay | iteration | direction | fill-mode | play-state */
  animation: slideIn 0.5s ease 0.2s 1 normal forwards running;
}

/* Shorthand comun */
.badge { animation: pulse 2s ease infinite; }
.alert { animation: fadeIn 0.3s ease forwards; }
\`\`\`

**Proprietăți individuale**

\`\`\`css
.element {
  animation-name: slideIn;
  animation-duration: 0.5s;
  animation-timing-function: ease-out;
  animation-delay: 0.2s;
  animation-iteration-count: infinite; /* sau număr: 3 */
  animation-direction: alternate;  /* normal | reverse | alternate | alternate-reverse */
  animation-fill-mode: forwards;   /* none | forwards | backwards | both */
  animation-play-state: running;   /* running | paused */
}
\`\`\`

**animation-fill-mode**

\`\`\`css
/* forwards — elementul rămâne la starea finală */
@keyframes enterLeft {
  from { transform: translateX(-100%); opacity: 0; }
  to   { transform: translateX(0);     opacity: 1; }
}
.card { animation: enterLeft 0.5s ease forwards; }

/* backwards — starea 0% se aplică în delay */
.card {
  animation: enterLeft 0.5s ease 1s backwards;
  /* în cele 1s de delay, elementul e invizibil */
}

/* both — combina forwards + backwards */
.card { animation: enterLeft 0.5s ease 1s both; }
\`\`\`

**Animații multiple simultane**

\`\`\`css
.loading-dot {
  animation:
    bounceY 0.6s ease infinite alternate,
    colorShift 1.2s linear infinite;
}

@keyframes bounceY {
  from { transform: translateY(0); }
  to   { transform: translateY(-20px); }
}

@keyframes colorShift {
  0%   { background: #3b82f6; }
  50%  { background: #8b5cf6; }
  100% { background: #3b82f6; }
}
\`\`\`

**Staggered animations (intrare decalată)**

\`\`\`css
.list-item {
  animation: fadeInUp 0.4s ease both;
}

/* Delay diferit per element */
.list-item:nth-child(1) { animation-delay: 0.0s; }
.list-item:nth-child(2) { animation-delay: 0.1s; }
.list-item:nth-child(3) { animation-delay: 0.2s; }
.list-item:nth-child(4) { animation-delay: 0.3s; }

/* Cu variabile CSS — mai dinamic */
.list-item { animation-delay: calc(var(--i) * 0.1s); }
\`\`\`

\`\`\`javascript
// Setează --i pe fiecare element cu JS
document.querySelectorAll('.list-item').forEach((el, i) => {
  el.style.setProperty('--i', i);
});
\`\`\``
  },
  {
    lessonContains: 'keyframes',
    titleContains: 'Exemple practice',
    content: `**Exemple practice de animații** CSS — de la simple loading indicators la efecte complexe de intrare pe pagină, toate optimizate pentru performanță.

**Loading animations**

\`\`\`css
/* Spinner clasic */
@keyframes spin {
  to { transform: rotate(360deg); }
}
.spinner {
  width: 40px; height: 40px;
  border: 4px solid #e2e8f0;
  border-top-color: #3b82f6;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

/* Skeleton shimmer */
@keyframes shimmer {
  from { background-position: -200% 0; }
  to   { background-position:  200% 0; }
}
.skeleton {
  background: linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 4px;
}

/* Dots loader */
@keyframes dotBounce {
  0%, 80%, 100% { transform: scale(0); }
  40%           { transform: scale(1); }
}
.dot { animation: dotBounce 1.4s ease infinite; }
.dot:nth-child(2) { animation-delay: 0.16s; }
.dot:nth-child(3) { animation-delay: 0.32s; }
\`\`\`

**Animații de intrare**

\`\`\`css
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInLeft {
  from { opacity: 0; transform: translateX(-32px); }
  to   { opacity: 1; transform: translateX(0); }
}

@keyframes scaleIn {
  from { opacity: 0; transform: scale(0.9); }
  to   { opacity: 1; transform: scale(1); }
}

@keyframes slideDown {
  from { transform: translateY(-100%); }
  to   { transform: translateY(0); }
}

/* Utilizare */
.hero-title { animation: fadeInUp 0.6s ease both; }
.hero-text  { animation: fadeInUp 0.6s ease 0.15s both; }
.hero-cta   { animation: fadeInUp 0.6s ease 0.3s both; }
\`\`\`

**Animații de attention seeker**

\`\`\`css
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  20%, 60%  { transform: translateX(-8px); }
  40%, 80%  { transform: translateX(8px); }
}
.error-input { animation: shake 0.5s ease; }

@keyframes heartbeat {
  0%, 100% { transform: scale(1); }
  14%      { transform: scale(1.3); }
  28%      { transform: scale(1); }
  42%      { transform: scale(1.3); }
  70%      { transform: scale(1); }
}
.like-btn.active { animation: heartbeat 1s ease; }

@keyframes tada {
  0%, 100% { transform: scale(1) rotate(0deg); }
  10%, 20% { transform: scale(0.9) rotate(-3deg); }
  30%, 50%, 70%, 90% { transform: scale(1.1) rotate(3deg); }
  40%, 60%, 80%      { transform: scale(1.1) rotate(-3deg); }
}
\`\`\`

**Animație la scroll cu Intersection Observer**

\`\`\`javascript
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.animate-on-scroll').forEach(el => {
  observer.observe(el);
});
\`\`\`

\`\`\`css
.animate-on-scroll {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.animate-on-scroll.visible {
  opacity: 1;
  transform: translateY(0);
}

@media (prefers-reduced-motion: reduce) {
  .animate-on-scroll { transition: none; opacity: 1; transform: none; }
}
\`\`\``
  },
  {
    lessonContains: 'keyframes',
    titleContains: 'Pause',
    content: `**Play state, multiple animații și timing avansat** oferă control complet asupra comportamentului animațiilor — de la pauze interactive la secvențe complexe.

**animation-play-state**

\`\`\`css
/* Animație pornită/oprită prin clasă */
.spinner {
  animation: spin 1s linear infinite;
  animation-play-state: running;
}

.spinner.paused {
  animation-play-state: paused;
}

/* Hover = pauză */
.animated-card {
  animation: float 3s ease-in-out infinite;
}
.animated-card:hover {
  animation-play-state: paused;
}
\`\`\`

**animation-direction**

\`\`\`css
@keyframes slide {
  from { transform: translateX(0); }
  to   { transform: translateX(100px); }
}

.normal    { animation: slide 1s linear normal; }       /* 0 → 100 */
.reverse   { animation: slide 1s linear reverse; }      /* 100 → 0 */
.alternate { animation: slide 1s linear alternate infinite; } /* 0→100→0→100 */
.alt-rev   { animation: slide 1s linear alternate-reverse infinite; } /* 100→0→100→0 */
\`\`\`

**Multiple animații pe același element**

\`\`\`css
@keyframes moveX { to { transform: translateX(200px); } }
@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(-30px); }
}

/* PROBLEMĂ: transform se suprascrie */
.ball {
  animation: moveX 2s linear, bounce 0.5s ease infinite;
  /* Ultima animație câștigă → doar bounce vizibil */
}

/* SOLUȚIE: wrapper separate */
.ball-outer { animation: moveX 2s linear forwards; }
.ball-inner { animation: bounce 0.5s ease infinite; }
\`\`\`

**Animații în secvență cu delay**

\`\`\`css
@keyframes step1 { to { opacity: 1; } }
@keyframes step2 { to { transform: scale(1.1); } }
@keyframes step3 { to { background: royalblue; } }

.sequenced {
  opacity: 0;
  animation:
    step1 0.3s ease 0.0s forwards,   /* start la 0s */
    step2 0.3s ease 0.3s forwards,   /* start la 0.3s */
    step3 0.3s ease 0.6s forwards;   /* start la 0.6s */
}
\`\`\`

**Countdown timer vizual**

\`\`\`css
@keyframes countdown {
  from { stroke-dashoffset: 0; }
  to   { stroke-dashoffset: 283; } /* 2π * r = 2π * 45 ≈ 283 */
}

.timer-ring {
  animation: countdown 10s linear forwards;
  transform-origin: center;
  transform: rotate(-90deg); /* pornește de la top */
}
\`\`\`

**Accesibilitate și prefers-reduced-motion**

\`\`\`css
/* Metodă #1: dezactivare completă */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* Metodă #2: versiune alternativă */
@keyframes fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}

.hero {
  animation: slideInUp 0.6s ease forwards;
}

@media (prefers-reduced-motion: reduce) {
  .hero {
    animation: fadeIn 0.2s ease forwards; /* fără mișcare, doar opacity */
  }
}
\`\`\`

**CSS @starting-style (2024) — animații la apariție**

\`\`\`css
/* Animează un element la prima sa afișare */
dialog {
  transition: opacity 0.3s ease, transform 0.3s ease;
  opacity: 1;
  transform: translateY(0);
}

@starting-style {
  dialog {
    opacity: 0;
    transform: translateY(-10px);
  }
}
\`\`\``
  },

  // L19: Filters și backdrop-filter
  {
    lessonContains: 'Filters',
    titleContains: 'Filter functions',
    content: `**CSS filter** aplică efecte vizuale pe element și copiii săi — blur, brightness, contrast, saturare, umbră și altele. Sunt procesate de GPU și nu afectează layout-ul.

**Funcțiile filter**

\`\`\`css
.image {
  filter: blur(4px);              /* estompare */
  filter: brightness(1.2);        /* luminozitate: 1=normal, >1 mai luminos */
  filter: contrast(1.5);          /* contrast: 1=normal, >1 mai contrastuos */
  filter: grayscale(1);           /* alb-negru: 0-1 */
  filter: sepia(0.8);             /* efect sepia: 0-1 */
  filter: saturate(2);            /* saturație: 0=gri, 1=normal, >1 mai saturat */
  filter: hue-rotate(90deg);      /* rotație nuanță: 0-360deg */
  filter: invert(1);              /* inversare culori: 0-1 */
  filter: opacity(0.5);           /* transparență: 0-1 (preferă property opacity) */
  filter: drop-shadow(2px 4px 8px rgba(0,0,0,0.4)); /* umbră după formă */
}
\`\`\`

**Combinare de filtre**

\`\`\`css
/* Filtrele se aplică în ordine, de la stânga la dreapta */
.vintage {
  filter: sepia(0.6) saturate(0.8) brightness(1.1) contrast(1.1);
}

.cold {
  filter: brightness(1.1) saturate(0.8) hue-rotate(180deg);
}

.dramatic {
  filter: contrast(1.4) brightness(0.9) saturate(1.3);
}

/* Hover pentru reveal color */
.card-bw {
  filter: grayscale(1) brightness(0.9);
  transition: filter 0.4s ease;
}
.card-bw:hover {
  filter: grayscale(0) brightness(1);
}
\`\`\`

**Aplicații practice**

\`\`\`css
/* Loading state — blur pe conținut */
.content.loading {
  filter: blur(3px);
  pointer-events: none;
  user-select: none;
  transition: filter 0.3s ease;
}

/* Imagine disabled */
.card.disabled img {
  filter: grayscale(1) opacity(0.6);
}

/* Focus pe element curent */
.gallery img.focused {
  filter: none;
}
.gallery img:not(.focused) {
  filter: brightness(0.7) blur(1px);
  transition: filter 0.3s ease;
}

/* Overlay colorat cu hue-rotate */
.color-overlay {
  animation: colorWave 3s linear infinite;
}
@keyframes colorWave {
  from { filter: hue-rotate(0deg); }
  to   { filter: hue-rotate(360deg); }
}
\`\`\`

**drop-shadow vs box-shadow**

\`\`\`css
/* box-shadow — urmează bounding box */
.box { box-shadow: 4px 4px 12px rgba(0,0,0,0.3); }

/* drop-shadow — urmează conturul vizibil (alpha channel) */
.png-icon {
  filter: drop-shadow(4px 4px 8px rgba(0,0,0,0.4));
  /* Umbra urmează forma SVG/PNG-ului, nu dreptunghiul */
}

/* Multiple drop-shadows */
.svg-icon {
  filter:
    drop-shadow(0 1px 2px rgba(0,0,0,0.3))
    drop-shadow(0 4px 8px rgba(0,0,0,0.15));
}
\`\`\`

**Performanță**

• Filtrele sunt procesate pe **GPU** — performant pentru animații
• \`blur()\` mare pe elemente mari poate fi costisitor
• Evita aplicarea pe **containere mari** cu mulți copii — aplică pe elementele individuale
• \`will-change: filter\` pentru animații complexe de filtre`
  },
  {
    lessonContains: 'Filters',
    titleContains: 'drop-shadow',
    content: `**drop-shadow vs box-shadow** — deși arată similar, au diferențe fundamentale în cum calculează și desenează umbra. Înțelegerea diferenței te ajută să alegi instrumentul potrivit.

**Sintaxa comparativă**

\`\`\`css
/* box-shadow */
.element {
  box-shadow: offset-x offset-y blur spread color;
  box-shadow: 4px 8px 16px 2px rgba(0,0,0,0.2);
  /* inset, multiple valori suportate */
}

/* filter: drop-shadow */
.element {
  filter: drop-shadow(offset-x offset-y blur color);
  filter: drop-shadow(4px 8px 16px rgba(0,0,0,0.2));
  /* NO spread, NO inset */
}
\`\`\`

**Diferența esențială — ce urmăresc**

\`\`\`html
<!-- PNG cu transparență: logo în formă de stea -->
<img class="star" src="star.png" alt="Star">
\`\`\`

\`\`\`css
/* box-shadow — dreptunghi */
.star { box-shadow: 4px 4px 12px black; }
/* Umbra are formă DREPTUNGHIULARĂ — nu urmărește steaua */

/* drop-shadow — conturul real */
.star { filter: drop-shadow(4px 4px 12px black); }
/* Umbra urmărește FORMA stelei, inclusiv transparența */
\`\`\`

**Cazuri unde drop-shadow este superior**

\`\`\`css
/* SVG icons */
.icon svg {
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));
}

/* Text cu umbră precisă */
h1 {
  filter: drop-shadow(2px 2px 0 rgba(0,0,0,0.2));
}

/* Elemente cu clip-path */
.clipped-shape {
  clip-path: polygon(50% 0%, 100% 100%, 0% 100%);
  filter: drop-shadow(0 8px 12px rgba(0,0,0,0.3));
  /* Umbra urmărește triunghiul, nu dreptunghiul original */
}

/* Componente cu gap-uri vizibile */
.speech-bubble {
  /* Săgeata speech bubble e tot un element */
  filter: drop-shadow(0 4px 8px rgba(0,0,0,0.15));
}
\`\`\`

**Când box-shadow este superior**

\`\`\`css
/* Când ai nevoie de spread */
.focus-ring { box-shadow: 0 0 0 3px rgba(59,130,246,0.5); }

/* Când ai nevoie de umbră interioară */
.inset { box-shadow: inset 0 2px 4px rgba(0,0,0,0.1); }

/* Multiple umbre stivuite */
.elevated {
  box-shadow:
    0 1px 3px rgba(0,0,0,0.1),
    0 4px 12px rgba(0,0,0,0.08),
    0 16px 32px rgba(0,0,0,0.05);
}

/* Performanță animată — box-shadow pe pseudo-element */
.card::after {
  content: "";
  position: absolute;
  inset: 10px;
  background: inherit;
  filter: blur(15px);
  z-index: -1;
  opacity: 0;
  transition: opacity 0.3s;
}
.card:hover::after { opacity: 0.7; }
\`\`\`

**Rezumat**

| Caracteristică | box-shadow | drop-shadow |
|---|---|---|
| Urmărește forma | Nu (dreptunghi) | Da (contur real) |
| spread | Da | Nu |
| inset | Da | Nu |
| Multiple | Da | Da (stacked) |
| SVG/PNG | Dreptunghi | Formă reală |
| Performanță | Bun | Bun (GPU) |`
  },
  {
    lessonContains: 'Filters',
    titleContains: 'backdrop-filter',
    content: `**backdrop-filter** aplică filtre CSS pe tot ceea ce se află **în spatele** elementului — creând efectele de sticlă (glassmorphism) și blur de fundal populare în UI modern.

**Sintaxa de bază**

\`\`\`css
.glass-card {
  backdrop-filter: blur(10px);
  /* SAU multiple filtre */
  backdrop-filter: blur(10px) brightness(1.1) saturate(1.5);
}
\`\`\`

• Funcționează cu **toate funcțiile filter**: blur, brightness, contrast, saturate, etc.
• Necesită că elementul să fie **semi-transparent** (altfel nu se vede efectul)
• Prefix \`-webkit-\` pentru Safari: \`-webkit-backdrop-filter\`

**Glassmorphism — card de sticlă**

\`\`\`css
.glass {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(12px) saturate(1.5);
  -webkit-backdrop-filter: blur(12px) saturate(1.5);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  padding: 24px;
}

/* Pe fundal colorat */
.glass-dark {
  background: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: white;
}
\`\`\`

**Navbar cu blur**

\`\`\`css
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  padding: 16px 24px;
  transition: background 0.3s ease;
}

/* Navbar transparentă în top, opacă la scroll */
.navbar.scrolled {
  background: rgba(255, 255, 255, 0.95);
}
\`\`\`

**Modal cu backdrop blur**

\`\`\`css
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 16px;
  padding: 32px;
  max-width: 500px;
  width: 90%;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}
\`\`\`

**Tooltip glassmorphism**

\`\`\`css
.tooltip {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  padding: 8px 12px;
  color: white;
  font-size: 0.85rem;
}
\`\`\`

**Suport și performanță**

\`\`\`css
/* Verificare suport cu @supports */
@supports (backdrop-filter: blur(1px)) {
  .glass {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(12px);
  }
}

/* Fallback fără suport */
.glass {
  background: rgba(255, 255, 255, 0.9); /* opac ca fallback */
}
\`\`\`

• **Suport**: Chrome 76+, Firefox 103+, Safari 9+ (cu prefix)
• **Performanță**: costisitor pe elemente mari — limitează la componente cheie
• **Limitări**: nu funcționează dacă părintele are \`overflow: hidden\` în anumite browsere`
  },

  // L20: Clip-path și mask
  {
    lessonContains: 'Clip-path',
    titleContains: 'clip-path',
    content: `**clip-path** decupează elementul la o formă definită — tot ce este în afara formei devine invizibil, fără a afecta layout-ul. Spre deosebire de \`border-radius\`, permite **orice formă geometrică**.

**Funcțiile clip-path**

\`\`\`css
/* circle(radius at cx cy) */
.avatar { clip-path: circle(50%); }
.avatar { clip-path: circle(80px at center); }

/* ellipse(rx ry at cx cy) */
.pill { clip-path: ellipse(60% 40% at 50% 50%); }

/* inset(top right bottom left round radius) */
.rounded { clip-path: inset(0 round 12px); }
.partial { clip-path: inset(10% 5% 10% 5% round 8px); }

/* polygon(x1 y1, x2 y2, ...) */
.triangle { clip-path: polygon(50% 0%, 0% 100%, 100% 100%); }
.diamond  { clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%); }
.hexagon  { clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%); }
.arrow    { clip-path: polygon(0% 20%, 60% 20%, 60% 0%, 100% 50%, 60% 100%, 60% 80%, 0% 80%); }
\`\`\`

**Forme practice**

\`\`\`css
/* Card cu colț tăiat */
.notched {
  clip-path: polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 0 100%);
}

/* Hero cu diagonală jos */
.hero-diagonal {
  clip-path: polygon(0 0, 100% 0, 100% 85%, 0 100%);
}

/* Wave la baza secțiunii */
.hero-wave {
  clip-path: ellipse(55% 60% at 50% 40%);
}

/* Parallelogram */
.parallelogram {
  clip-path: polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%);
}

/* Stea cu 6 colțuri */
.star-6 {
  clip-path: polygon(
    50% 0%, 61% 35%, 98% 35%, 68% 57%,
    79% 91%, 50% 70%, 21% 91%, 32% 57%,
    2% 35%, 39% 35%
  );
}
\`\`\`

**clip-path cu path() — forme SVG**

\`\`\`css
/* path() acceptă sintaxa SVG path */
.wave-bottom {
  clip-path: path('M 0 0 L 1000 0 L 1000 700 Q 500 800 0 700 Z');
}
\`\`\`

**clip-path pe imagini pentru galerie**

\`\`\`css
.gallery-item { clip-path: polygon(0 0, 100% 0, 100% 85%, 0 100%); }
.gallery-item:nth-child(even) { clip-path: polygon(0 0, 100% 0, 100% 100%, 0 85%); }

/* Hover reveal */
.reveal-img {
  clip-path: inset(0 50% 0 50%);
  transition: clip-path 0.6s ease;
}
.reveal-img.visible {
  clip-path: inset(0 0% 0 0%);
}
\`\`\`

**Unelte utile**

• **clippy.dhimanforyou.com** — generator vizual clip-path
• **bennettfeely.com/clippy** — alternativă populară
• DevTools → styles → click pe valoarea clip-path → editor vizual inline

**Diferența față de overflow: hidden**

• \`overflow: hidden\` tăie după **bounding box** dreptunghiular
• \`clip-path\` tăie după **forma specificată** — poate fi orice poligon
• Ambele nu afectează layout-ul (spațiul rezervat rămâne)`
  },
  {
    lessonContains: 'Clip-path',
    titleContains: 'Animație clip-path',
    content: `**Animarea clip-path** produce efecte de reveal, tranziții între forme și intrări creative — cu condiția că forma de start și cea de final au **același număr de puncte**.

**Regula animabilității**

\`\`\`css
/* ANIMABIL — aceeași funcție, aceleași argumente */
.el {
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%); /* dreptunghi */
  transition: clip-path 0.5s ease;
}
.el:hover {
  clip-path: polygon(10% 0%, 90% 0%, 100% 100%, 0% 100%); /* trapez */
}

/* NON-ANIMABIL — funcții diferite */
.el {
  clip-path: circle(50%);
  /* NU poate tranzita la polygon() */
}
\`\`\`

**Reveal effect — intrare pe pagină**

\`\`\`css
@keyframes revealLeft {
  from { clip-path: inset(0 100% 0 0); }
  to   { clip-path: inset(0 0% 0 0); }
}

@keyframes revealRight {
  from { clip-path: inset(0 0 0 100%); }
  to   { clip-path: inset(0 0 0 0%); }
}

@keyframes revealDown {
  from { clip-path: inset(0 0 100% 0); }
  to   { clip-path: inset(0 0 0% 0); }
}

.title { animation: revealLeft 0.7s ease both; }
.image { animation: revealDown 0.7s ease 0.3s both; }
\`\`\`

**Hover cu formă schimbătoare**

\`\`\`css
.btn {
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
  transition: clip-path 0.3s ease;
  background: royalblue;
  color: white;
  padding: 12px 24px;
}

.btn:hover {
  clip-path: polygon(5% 0%, 95% 0%, 100% 50%, 95% 100%, 5% 100%, 0% 50%);
}
\`\`\`

**Staggered reveal pentru liste**

\`\`\`css
.list-item {
  clip-path: inset(0 100% 0 0);
  animation: revealLeft 0.5s ease forwards;
}

.list-item:nth-child(1) { animation-delay: 0.0s; }
.list-item:nth-child(2) { animation-delay: 0.1s; }
.list-item:nth-child(3) { animation-delay: 0.2s; }
.list-item:nth-child(4) { animation-delay: 0.3s; }
\`\`\`

**Morph între forme**

\`\`\`css
@keyframes morphShape {
  0%   { clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%); }
  33%  { clip-path: polygon(50% 0%, 100% 0%, 100% 100%, 0% 100%); }
  66%  { clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%); }
  100% { clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%); }
}

.morph {
  animation: morphShape 4s ease infinite;
}
\`\`\`

**Overlay de hover cu clip-path**

\`\`\`css
.image-card {
  position: relative;
  overflow: hidden;
}

.image-card .overlay {
  position: absolute;
  inset: 0;
  background: rgba(59,130,246,0.85);
  clip-path: circle(0% at 50% 50%);
  transition: clip-path 0.5s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.image-card:hover .overlay {
  clip-path: circle(75% at 50% 50%);
}
\`\`\``
  },
  {
    lessonContains: 'Clip-path',
    titleContains: 'mask-image',
    content: `**mask-image** maschează vizibilitatea unui element folosind o imagine — zonele albe arată elementul, cele negre îl ascund. Mai flexibil decât \`clip-path\` pentru forme complexe.

**Sintaxa de bază**

\`\`\`css
.element {
  mask-image: url('mask.svg');
  mask-size: cover;
  mask-repeat: no-repeat;
  mask-position: center;
}

/* Shorthand */
.element {
  mask: url('mask.png') center / cover no-repeat;
}

/* Prefix pentru Webkit */
.element {
  -webkit-mask-image: url('mask.svg');
  mask-image: url('mask.svg');
}
\`\`\`

**Mask cu gradient — fade edge**

\`\`\`css
/* Text care se estompează spre dreapta */
.fade-right {
  mask-image: linear-gradient(to right, black 70%, transparent 100%);
  -webkit-mask-image: linear-gradient(to right, black 70%, transparent 100%);
}

/* Fade vertical pentru scroll indicator */
.scroll-container {
  mask-image: linear-gradient(
    to bottom,
    transparent 0%,
    black 10%,
    black 90%,
    transparent 100%
  );
}

/* Reveal circular din centru */
.spotlight {
  mask-image: radial-gradient(circle at center, black 40%, transparent 70%);
}

/* Vignette pe imagine */
.photo-vignette {
  mask-image: radial-gradient(ellipse 80% 80% at center, black, transparent);
}
\`\`\`

**mask cu imagine SVG**

\`\`\`css
/* Text în formă de stea */
.star-text {
  mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpolygon points='50,5 61,35 95,35 68,57 79,91 50,70 21,91 32,57 5,35 39,35' fill='white'/%3E%3C/svg%3E");
  mask-size: contain;
  mask-repeat: no-repeat;
  mask-position: center;
}
\`\`\`

**mask-composite — combinarea măștilor**

\`\`\`css
/* Donut — cerc cu gaură */
.donut {
  mask-image:
    radial-gradient(circle, black 60%, transparent 60%),  /* gaura */
    radial-gradient(circle, black 80%, transparent 80%);  /* conturul */
  mask-composite: subtract; /* scade prima din a doua */
  /* also: add | intersect | exclude */
}
\`\`\`

**mask-border (border de imagine)**

\`\`\`css
.fancy-border {
  mask-border-source: url('border-mask.svg');
  mask-border-slice: 30;
  mask-border-width: 30px;
  mask-border-repeat: stretch;
}
\`\`\`

**clip-path vs mask-image**

| Caracteristică | clip-path | mask-image |
|---|---|---|
| Forme | Geometrice + path SVG | Orice imagine/gradient |
| Transparente parțiale | Nu | Da (grayscale = alpha) |
| Performanță | Excelentă | Bună |
| Animare | Da (polygon→polygon) | Da (gradient params) |
| Suport | Excelent | Bun (cu prefix Safari) |

• **clip-path** — pentru forme geometrice clare
• **mask-image** — pentru fade-uri, forme complexe sau transparente graduale`
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
