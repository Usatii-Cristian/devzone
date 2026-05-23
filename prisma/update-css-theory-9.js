const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();

const items = [
  // L31: CSS Houdini API
  {
    lessonContains: 'Houdini',
    titleContains: 'Paint API',
    content: `**CSS Houdini** este un set de API-uri browser care expun motorul CSS — permițând crearea de **proprietăți CSS custom native** și **efecte vizuale imposibile** cu CSS clasic.

**Ce este Houdini și de ce contează**

Houdini rezolvă "The Houdini Problem": nu poți extinde CSS nativ, ești limitat la ce browserul implementează. Cu Houdini, poți scrie C++/JS care rulează la nivel de motor CSS — nu ca polyfill lent.

**Componentele Houdini**

• **CSS Paint API** — funcție paint() custom pentru background/border-image
• **CSS Properties and Values API** — proprietăți custom cu tip și animabilitate
• **CSS Animation Worklet** — animații sincronizate cu scroll, performante
• **CSS Layout API** — layout personalizat (ca Flexbox/Grid dar custom)
• **Typed OM** — API JavaScript tipizat pentru stiluri

**CSS Paint API (Paintlet)**

\`\`\`javascript
// checkerboard.js — Paint Worklet
registerPaint('checkerboard', class {
  static get inputProperties() {
    return ['--cb-color', '--cb-size'];
  }

  paint(ctx, size, properties) {
    const color = properties.get('--cb-color').toString().trim() || '#e2e8f0';
    const cbSize = parseInt(properties.get('--cb-size')) || 20;

    for (let y = 0; y < size.height / cbSize; y++) {
      for (let x = 0; x < size.width / cbSize; x++) {
        ctx.fillStyle = (x + y) % 2 === 0 ? color : 'transparent';
        ctx.fillRect(x * cbSize, y * cbSize, cbSize, cbSize);
      }
    }
  }
});
\`\`\`

\`\`\`javascript
// Înregistrare în HTML/JS
if ('paintWorklet' in CSS) {
  CSS.paintWorklet.addModule('checkerboard.js');
}
\`\`\`

\`\`\`css
/* Utilizare în CSS */
.pattern {
  --cb-color: #3b82f6;
  --cb-size: 30;
  background: paint(checkerboard);
  width: 300px;
  height: 200px;
}
\`\`\`

**Ripple effect cu Paint API**

\`\`\`javascript
registerPaint('ripple', class {
  static get inputProperties() {
    return ['--ripple-x', '--ripple-y', '--ripple-color', '--ripple-spread'];
  }

  paint(ctx, size, props) {
    const x = parseFloat(props.get('--ripple-x')) * size.width;
    const y = parseFloat(props.get('--ripple-y')) * size.height;
    const spread = parseFloat(props.get('--ripple-spread'));
    const color = props.get('--ripple-color').toString();

    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, spread, 0, 2 * Math.PI);
    ctx.fill();
  }
});
\`\`\`

\`\`\`css
.btn {
  --ripple-x: 0.5;
  --ripple-y: 0.5;
  --ripple-spread: 0;
  --ripple-color: rgba(255,255,255,0.3);
  background: paint(ripple), royalblue;
  transition: --ripple-spread 0.5s;
}
.btn:active { --ripple-spread: 150; }
\`\`\`

**Suport browser**

• Chrome 65+ ✓, Edge 79+ ✓
• Firefox — în curs de implementare
• Safari — parțial
• Verifică: caniuse.com/css-paint-api

**Polyfill și alternative**

\`\`\`javascript
// css-houdini-polyfill pentru browsere fără suport
if (!('paintWorklet' in CSS)) {
  import('https://unpkg.com/css-paint-polyfill');
}
\`\`\``
  },
  {
    lessonContains: 'Houdini',
    titleContains: 'Properties and Values',
    content: `**CSS Properties and Values API** (@property) permite declararea de CSS custom properties cu **tip de date**, **valoare inițială** și **moștenire** — transformând variabilele în proprietăți native animabile.

**Sintaxa @property**

\`\`\`css
/* CSS syntax — fără JavaScript */
@property --color-primary {
  syntax: '<color>';
  inherits: true;
  initial-value: #3b82f6;
}

@property --border-width {
  syntax: '<length>';
  inherits: false;
  initial-value: 1px;
}

@property --opacity {
  syntax: '<number>';
  inherits: false;
  initial-value: 1;
}

@property --rotation {
  syntax: '<angle>';
  inherits: false;
  initial-value: 0deg;
}
\`\`\`

**JavaScript API echivalent**

\`\`\`javascript
CSS.registerProperty({
  name: '--color-primary',
  syntax: '<color>',
  inherits: true,
  initialValue: '#3b82f6'
});
\`\`\`

**Cel mai mare avantaj: animabilitate**

\`\`\`css
/* Custom properties obișnuite NU se pot anima */
:root { --hue: 0; }
.el { color: hsl(var(--hue), 70%, 50%); transition: --hue 1s; }
.el:hover { --hue: 240; } /* NU funcționează — trecere bruscă */

/* Cu @property — animabilă! */
@property --hue {
  syntax: '<number>';
  inherits: false;
  initial-value: 0;
}

.el {
  color: hsl(var(--hue), 70%, 50%);
  transition: --hue 1s ease;
}
.el:hover { --hue: 240; } /* Funcționează! Tranziție fluidă. */
\`\`\`

**Gradient animat cu @property**

\`\`\`css
@property --gradient-start {
  syntax: '<color>';
  inherits: false;
  initial-value: #3b82f6;
}

@property --gradient-end {
  syntax: '<color>';
  inherits: false;
  initial-value: #8b5cf6;
}

.animated-gradient {
  background: linear-gradient(135deg, var(--gradient-start), var(--gradient-end));
  transition: --gradient-start 0.5s ease, --gradient-end 0.5s ease;
}

.animated-gradient:hover {
  --gradient-start: #ef4444;
  --gradient-end: #f97316;
}
\`\`\`

**Conic gradient progress indicator**

\`\`\`css
@property --progress {
  syntax: '<number>';
  inherits: false;
  initial-value: 0;
}

.progress-ring {
  background: conic-gradient(
    royalblue calc(var(--progress) * 1%),
    #e2e8f0 0
  );
  border-radius: 50%;
  animation: fill 2s ease forwards;
}

@keyframes fill {
  to { --progress: 75; }
}
\`\`\`

**Validare de tip**

\`\`\`css
@property --size {
  syntax: '<length>';
  inherits: false;
  initial-value: 10px;
}

.el { --size: "hello"; } /* INVALID — ignorat, se folosește 10px */
.el { --size: 20px; }    /* Valid */
.el { --size: 2em; }     /* Valid */
\`\`\``
  },
  {
    lessonContains: 'Houdini',
    titleContains: 'Worklet',
    content: `**Animation Worklet și Layout API** — cele mai puternice (și complexe) API-uri Houdini pentru animații sincronizate cu timeline și layout-uri personalizate.

**Animation Worklet — animații sincronizate**

Animation Worklet rulează în **threaduri separate** față de main thread, permițând animații legate de scroll/timeline fără jank.

\`\`\`javascript
// scroll-animation.js — Animation Worklet
registerAnimator('scroll-fade', class {
  animate(currentTime, effect) {
    // currentTime = scroll position (0-1 pentru scroll-linked)
    effect.localTime = currentTime * 1000; // convertit la ms
  }
});
\`\`\`

\`\`\`javascript
// Utilizare în pagină
await CSS.animationWorklet.addModule('scroll-animation.js');

const element = document.querySelector('.parallax');
const keyframes = new KeyframeEffect(element, [
  { transform: 'translateY(0)' },
  { transform: 'translateY(-100px)' }
], { duration: 1000, fill: 'both' });

const animation = new WorkletAnimation('scroll-fade', keyframes,
  document.timeline, { scrollSource: document.documentElement }
);
animation.play();
\`\`\`

**CSS Layout API**

Layout API permite definirea unui algoritm de layout custom — ca Flexbox sau Grid, dar cu logica ta.

\`\`\`javascript
// masonry-layout.js — Layout Worklet
registerLayout('masonry', class {
  async intrinsicSizes(children, edges, styleMap) {
    // Calculează dimensiunile intrinseci
  }

  async layout(children, edges, constraints, styleMap) {
    const columnWidth = constraints.fixedInlineSize / 3;
    const columnHeights = [0, 0, 0];

    const childFragments = [];

    for (const child of children) {
      const childConstraints = { fixedInlineSize: columnWidth };
      const childFragment = await child.layoutNextFragment(childConstraints);

      // Găsește coloana cea mai scurtă
      const minCol = columnHeights.indexOf(Math.min(...columnHeights));

      childFragments.push({
        fragment: childFragment,
        inlineOffset: minCol * columnWidth,
        blockOffset: columnHeights[minCol]
      });

      columnHeights[minCol] += childFragment.blockSize;
    }

    return {
      autoBlockSize: Math.max(...columnHeights),
      childFragments
    };
  }
});
\`\`\`

\`\`\`javascript
await CSS.layoutWorklet.addModule('masonry-layout.js');
\`\`\`

\`\`\`css
.masonry {
  display: layout(masonry);
  gap: 16px;
}
\`\`\`

**Starea adoptiei Houdini (2025)**

\`\`\`
API                    Chrome  Firefox  Safari
CSS Paint API           ✓ 65+   ✗        ✗
@property               ✓ 85+   ✓ 128+  ✓ 16.4+
Animation Worklet       ✓*      ✗        ✗
CSS Layout API          ✓* (flag) ✗      ✗
Typed OM               ✓ 66+   ✗        ✗

* = experimental, necesită flag
\`\`\`

**Recomandări practice**

• **@property** — folosește deja, suport mainstream
• **CSS Paint API** — folosește cu polyfill sau feature detect
• **Animation Worklet / Layout API** — experimental, evită în producție
• **Typed OM** — util pentru JS performant, dar API mai verbos`
  },
  {
    lessonContains: 'Houdini',
    titleContains: 'Typed OM',
    content: `**CSS Typed Object Model (Typed OM)** înlocuiește manipularea string-urilor CSS cu **obiecte JavaScript tipizate** — mai rapid, mai sigur și cu validare automată.

**Problema cu DOM CSS clasic**

\`\`\`javascript
// Clasic — totul e string
const el = document.querySelector('.box');
el.style.width = '200px';      // string
const w = el.style.width;      // string "200px"
el.style.width = w + 10;       // "200px10" — BUG!

// Valoare computată — tot string
getComputedStyle(el).width;    // "200px" — parseFloat necesar
\`\`\`

**Typed OM — obiecte cu tip**

\`\`\`javascript
// attributeStyleMap pentru inline styles
const el = document.querySelector('.box');

// Set — tipizat
el.attributeStyleMap.set('width', CSS.px(200));
el.attributeStyleMap.set('height', CSS.px(100));
el.attributeStyleMap.set('opacity', CSS.number(0.5));
el.attributeStyleMap.set('background', new CSSKeywordValue('royalblue'));

// Get — returnează obiect, nu string
const width = el.attributeStyleMap.get('width');
console.log(width.value); // 200 (number)
console.log(width.unit);  // "px"

// Arithmetic — nativ
el.attributeStyleMap.set('width', CSS.px(width.value + 50));
// 250px — corect!
\`\`\`

**computedStyleMap — valori computate**

\`\`\`javascript
// Citire stiluri computate tipizate
const styleMap = el.computedStyleMap();

const fontSize = styleMap.get('font-size');
console.log(fontSize.value); // 16 (number)
console.log(fontSize.unit);  // "px"

const opacity = styleMap.get('opacity');
console.log(opacity.value);  // 1 (number)
\`\`\`

**Tipurile CSS disponibile**

\`\`\`javascript
CSS.px(10)          // CSSUnitValue { value: 10, unit: 'px' }
CSS.em(1.5)         // CSSUnitValue { value: 1.5, unit: 'em' }
CSS.rem(2)          // CSSUnitValue { value: 2, unit: 'rem' }
CSS.percent(50)     // CSSUnitValue { value: 50, unit: 'percent' }
CSS.vw(100)         // CSSUnitValue
CSS.vh(100)         // CSSUnitValue
CSS.number(0.5)     // CSSUnitValue
CSS.deg(45)         // CSSUnitValue { value: 45, unit: 'deg' }
CSS.turn(0.5)       // CSSUnitValue
CSS.s(1)            // CSSUnitValue (secunde)
CSS.ms(300)         // CSSUnitValue (milisecunde)
\`\`\`

**Calcule matematice**

\`\`\`javascript
const val = CSS.px(100);
const doubled = val.mul(2);     // CSS.px(200)
const added = val.add(CSS.px(50)); // CSS.px(150)

// calc() cu Typed OM
new CSSMathSum(CSS.px(100), CSS.vw(10));
new CSSMathProduct(CSS.px(16), CSS.number(1.5));
\`\`\`

**Performanță față de getPropertyValue**

\`\`\`javascript
// Clasic — slow (forțează string parsing de fiecare dată)
const w = parseFloat(getComputedStyle(el).getPropertyValue('width'));

// Typed OM — fast (valori native, fără parsing)
const w = el.computedStyleMap().get('width').value;
\`\`\`

**Suport browser**

• Chrome 66+, Edge 79+ — Typed OM full
• Firefox, Safari — suport parțial sau experimental
• Folosit frecvent în Paint Worklets (inputProperties)`
  },

  // L32: View Transitions API
  {
    lessonContains: 'View Transitions',
    titleContains: 'animatii intre',
    content: `**View Transitions API** permite animații fluide între **două stări ale UI** sau între pagini, cu o singură linie de CSS și câteva linii de JavaScript.

**Conceptul View Transitions**

\`\`\`javascript
// Fără View Transitions — schimbare bruscă
function updateContent() {
  document.querySelector('.content').innerHTML = newContent;
}

// Cu View Transitions — animat automat
function updateContent() {
  document.startViewTransition(() => {
    document.querySelector('.content').innerHTML = newContent;
  });
}
\`\`\`

**Ce se întâmplă în spatele scenei**

1. Browserul face un **screenshot** al stării curente
2. Actualizarea DOM se aplică **instant**
3. Browserul face un **screenshot** al noii stări
4. Animație cross-fade între cele două screenshot-uri

**CSS implicit**

\`\`\`css
/* Animația default: cross-fade pe întreaga pagină */
::view-transition-old(root) {
  animation: fade-out 0.25s ease;
}

::view-transition-new(root) {
  animation: fade-in 0.25s ease;
}

/* Personalizare */
@keyframes slide-from-right {
  from { transform: translateX(100%); }
}

@keyframes slide-to-left {
  to { transform: translateX(-100%); }
}

::view-transition-old(root) {
  animation: slide-to-left 0.4s ease;
}

::view-transition-new(root) {
  animation: slide-from-right 0.4s ease;
}
\`\`\`

**View Transition cu direcție**

\`\`\`javascript
function navigateTo(direction, updateFn) {
  // Setează direcția pe document pentru CSS
  document.documentElement.dataset.direction = direction;

  document.startViewTransition(updateFn);
}

// Navigare forward/backward
document.querySelectorAll('[data-page]').forEach(btn => {
  btn.addEventListener('click', () => {
    navigateTo('forward', () => showPage(btn.dataset.page));
  });
});
\`\`\`

\`\`\`css
[data-direction="forward"] ::view-transition-new(root) {
  animation: slide-from-right 0.4s ease;
}
[data-direction="forward"] ::view-transition-old(root) {
  animation: slide-to-left 0.4s ease;
}
[data-direction="backward"] ::view-transition-new(root) {
  animation: slide-from-left 0.4s ease;
}
[data-direction="backward"] ::view-transition-old(root) {
  animation: slide-to-right 0.4s ease;
}
\`\`\`

**Fallback pentru browsere fără suport**

\`\`\`javascript
function updateWithTransition(updateFn) {
  if (!document.startViewTransition) {
    updateFn();
    return;
  }
  document.startViewTransition(updateFn);
}
\`\`\`

**Suport browser**

• Chrome 111+, Edge 111+, Safari 18+ (cross-document)
• Firefox — în implementare (2024)`
  },
  {
    lessonContains: 'View Transitions',
    titleContains: 'tranzitii elemente',
    content: `**view-transition-name** permite animații **individuale per element** — un element specific se mișcă fluid din poziția veche în cea nouă, independent de restul paginii.

**view-transition-name pe elemente specifice**

\`\`\`css
/* Marchează elementul pentru tranziție individuală */
.hero-image {
  view-transition-name: hero-img; /* nume unic pe pagină */
}

.card-title {
  view-transition-name: article-title;
}
\`\`\`

\`\`\`javascript
document.startViewTransition(() => {
  // DOM update
  // Elementele cu view-transition-name se animează separat
  navigateToDetailPage();
});
\`\`\`

**Efect "shared element" — card → pagina detaliată**

\`\`\`css
/* Lista de articole */
.article-card img {
  view-transition-name: var(--article-img-name); /* dinamic cu CSS */
  /* sau setat cu JS: el.style.viewTransitionName = 'img-' + id */
}

/* Pagina de detaliu */
.article-detail .hero-img {
  view-transition-name: var(--article-img-name); /* același nume */
}
\`\`\`

\`\`\`javascript
// Setare dinamică a numelui
function openArticle(article) {
  const img = article.querySelector('img');
  img.style.viewTransitionName = 'article-hero';

  document.startViewTransition(() => {
    renderDetailPage(article.dataset.id);
    // img pe pagina de detaliu are același view-transition-name
  }).ready.then(() => {
    img.style.viewTransitionName = ''; // resetare
  });
}
\`\`\`

**Pseudo-elementele view-transition**

\`\`\`css
/* ::view-transition — containerul overlay */
::view-transition {
  /* stiluri pentru containerul de tranziție */
}

/* Grup per element nammed */
::view-transition-group(hero-img) {
  animation-duration: 0.5s;
  animation-timing-function: cubic-bezier(0.2, 0, 0.2, 1);
}

/* Screenshot-ul vechi */
::view-transition-old(hero-img) {
  animation: fade-and-scale-out 0.4s ease;
}

/* Screenshot-ul nou */
::view-transition-new(hero-img) {
  animation: fade-and-scale-in 0.4s ease;
}

@keyframes fade-and-scale-in {
  from { opacity: 0; transform: scale(0.8); }
}
\`\`\`

**Animație morph (shared element)**

\`\`\`css
/* Setare animație morph custom pe element cu nume */
::view-transition-old(card-hero) {
  animation: none; /* browser-ul calculează automat morphul */
}

::view-transition-new(card-hero) {
  animation: none;
}

/* ::view-transition-group calculează interpolarea automat */
/* Elementul se mișcă de la poziția veche la cea nouă */
\`\`\``
  },
  {
    lessonContains: 'View Transitions',
    titleContains: 'in SPA',
    content: `**View Transitions în SPA** cu React, Vue sau Vanilla JS — integrarea API-ului în aplicații cu client-side routing pentru tranziții fluide între rute.

**React — integrare cu router**

\`\`\`javascript
// React Router v6 cu View Transitions
import { useNavigate } from 'react-router-dom';
import { flushSync } from 'react-dom';

function useViewTransitionNavigate() {
  const navigate = useNavigate();

  return (to, options) => {
    if (!document.startViewTransition) {
      navigate(to, options);
      return;
    }

    document.startViewTransition(() => {
      flushSync(() => navigate(to, options));
    });
  };
}

// Utilizare
function ArticleCard({ article }) {
  const navigate = useViewTransitionNavigate();

  return (
    <div
      className="card"
      onClick={() => navigate('/article/' + article.id)}
      style={{ viewTransitionName: 'card-' + article.id }}
    >
      <img
        src={article.image}
        style={{ viewTransitionName: 'img-' + article.id }}
      />
      <h3>{article.title}</h3>
    </div>
  );
}
\`\`\`

**Vue 3 — composable**

\`\`\`javascript
// composables/useViewTransition.js
import { useRouter } from 'vue-router';

export function useViewTransition() {
  const router = useRouter();

  const navigate = (to) => {
    if (!document.startViewTransition) {
      router.push(to);
      return;
    }

    document.startViewTransition(() => router.push(to));
  };

  return { navigate };
}
\`\`\`

\`\`\`vue
<!-- Component -->
<template>
  <div
    class="card"
    :style="{ viewTransitionName: 'card-' + article.id }"
    @click="navigate('/article/' + article.id)"
  >
    <img :style="{ viewTransitionName: 'img-' + article.id }" />
  </div>
</template>
\`\`\`

**Vanilla JS — tab navigation**

\`\`\`javascript
const tabs = document.querySelectorAll('[data-tab]');
const panels = document.querySelectorAll('[data-panel]');
let activeTab = 0;

function switchTab(index) {
  if (!document.startViewTransition) {
    setActiveTab(index);
    return;
  }

  document.startViewTransition(() => setActiveTab(index));
}

function setActiveTab(index) {
  tabs[activeTab].setAttribute('aria-selected', 'false');
  panels[activeTab].hidden = true;
  activeTab = index;
  tabs[activeTab].setAttribute('aria-selected', 'true');
  panels[activeTab].hidden = false;
}
\`\`\`

\`\`\`css
/* Animație per panel */
[data-panel] {
  view-transition-name: var(--panel-name);
}

::view-transition-new([data-panel]) {
  animation: slide-in-right 0.3s ease;
}
::view-transition-old([data-panel]) {
  animation: slide-out-left 0.3s ease;
}
\`\`\`

**Debugging View Transitions**

\`\`\`javascript
// Extinde durata pentru debugging
::view-transition-old(root) {
  animation-duration: 5s; /* lent pentru a vedea animația */
}

// Promise-uri disponibile
const transition = document.startViewTransition(updateFn);
transition.ready.then(() => console.log('Animație pornită'));
transition.finished.then(() => console.log('Animație terminată'));
\`\`\``
  },
  {
    lessonContains: 'View Transitions',
    titleContains: 'Prefers-reduced',
    content: `**prefers-reduced-motion și fallback** pentru View Transitions API — respectarea preferințelor de accesibilitate și asigurarea că aplicația funcționează în toate browserele.

**prefers-reduced-motion cu View Transitions**

\`\`\`css
/* Animație implicită — completă */
::view-transition-old(root) {
  animation: slide-out 0.4s ease;
}
::view-transition-new(root) {
  animation: slide-in 0.4s ease;
}

/* Utilizatori cu sensibilitate la mișcare — fade simplu */
@media (prefers-reduced-motion: reduce) {
  ::view-transition-old(root) {
    animation: fade-out 0.15s ease;
  }
  ::view-transition-new(root) {
    animation: fade-in 0.15s ease;
  }

  /* Sau dezactivare completă */
  ::view-transition-group(*) {
    animation-duration: 0.01ms;
  }
}
\`\`\`

**JavaScript — verificare preferință**

\`\`\`javascript
function startTransition(updateFn) {
  // Verifică și suport, și preferință de mișcare
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!document.startViewTransition || prefersReduced) {
    updateFn();
    return;
  }

  return document.startViewTransition(updateFn);
}

// Sau utilizând Promise
async function updateWithTransition(updateFn) {
  if (!document.startViewTransition) {
    await updateFn();
    return;
  }

  const transition = document.startViewTransition(async () => {
    await updateFn();
  });

  try {
    await transition.finished;
  } catch (e) {
    // Tranziție anulată — ignoră
  }
}
\`\`\`

**Gestionarea erorilor**

\`\`\`javascript
const transition = document.startViewTransition(() => {
  updateDOM();
});

transition.ready.then(() => {
  // Animație pornită
}).catch(err => {
  // Tranziție eșuată (DOM update a aruncat eroare)
  console.error('Tranziție eșuată:', err);
});

transition.finished.then(() => {
  // Animație completată sau skip-uită
  cleanup();
});
\`\`\`

**Tranziții de pagini (MPA — Multi Page Apps)**

\`\`\`html
<!-- meta tag în <head> — activează cross-document transitions -->
<meta name="view-transition" content="same-origin">
\`\`\`

\`\`\`css
/* Stilizare în CSS a paginii sursă și destinație */
@view-transition {
  navigation: auto; /* activează automat pentru same-origin */
}

/* Animații identice cu cele single-page */
::view-transition-old(root) { animation: slide-out 0.4s ease; }
::view-transition-new(root) { animation: slide-in  0.4s ease; }
\`\`\`

**Cazuri de utilizare recomandate**

• **Navigare între pagini** — slide in/out natural
• **Galerie → detaliu** — shared element animation (imagine care crește)
• **Tab-uri și acordeon** — fade sau slide condus de direcție
• **Modal open/close** — scale din buton la modal

**Cazuri de evitat**

• Animații pe hover sau micro-interacțiuni (prea lent pentru 400ms)
• Conținut care se actualizează frecvent (scroll, live data)
• Elemente mari care cauzează jank la screenshot capture`
  },

  // L33: Scroll-Driven Animations
  {
    lessonContains: 'Scroll-Driven',
    titleContains: 'si scroll',
    content: `**animation-timeline și scroll()** leagă animațiile CSS de poziția scroll-ului — fără JavaScript. Elementele se animează sincronizat cu scroll-ul utilizatorului.

**Conceptul scroll-driven animations**

Înainte: JavaScript + IntersectionObserver + requestAnimationFrame
Acum: CSS pur cu \`animation-timeline\`

**Sintaxa de bază**

\`\`\`css
.progress-bar {
  animation: grow 1s linear;
  animation-timeline: scroll(); /* linked to document scroll */
  animation-fill-mode: both;
}

@keyframes grow {
  from { transform: scaleX(0); }
  to   { transform: scaleX(1); }
}
\`\`\`

**scroll() — reading progress indicator**

\`\`\`css
/* Bara de progres fixă la top */
#reading-progress {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: royalblue;
  transform-origin: left;
  transform: scaleX(0);

  animation: progress 1s linear;
  animation-timeline: scroll(root block);
  /* root = documentul; block = axa verticală */
}

@keyframes progress {
  from { transform: scaleX(0); }
  to   { transform: scaleX(1); }
}
\`\`\`

**Parametrii scroll()**

\`\`\`css
/* scroll(scroller axis) */
scroll()                    /* document scroll, block (vertical) */
scroll(root)                /* document explicit */
scroll(nearest)             /* cel mai apropiat container cu scroll */
scroll(self)                /* elementul însuși */
scroll(root block)          /* document, axa vertică */
scroll(nearest inline)      /* container, axa orizontală */
\`\`\`

**Parallax cu scroll timeline**

\`\`\`css
.parallax-bg {
  animation: parallax-move 1s linear;
  animation-timeline: scroll();
}

@keyframes parallax-move {
  from { transform: translateY(0); }
  to   { transform: translateY(-20%); } /* mișcă mai lent decât pagina */
}
\`\`\`

**Navbar care se modifică la scroll**

\`\`\`css
.navbar {
  animation: navbar-shrink 1s linear;
  animation-timeline: scroll();
  animation-range: 0px 200px; /* între 0 și 200px scroll */
  animation-fill-mode: both;
}

@keyframes navbar-shrink {
  from {
    padding: 20px 24px;
    background: transparent;
    box-shadow: none;
  }
  to {
    padding: 12px 24px;
    background: rgba(255,255,255,0.95);
    box-shadow: 0 2px 20px rgba(0,0,0,0.1);
    backdrop-filter: blur(12px);
  }
}
\`\`\`

**Suport browser**

• Chrome 115+, Edge 115+
• Firefox 110+ (cu flag)
• Safari — în implementare
• Necesită verificare cu \`@supports\``
  },
  {
    lessonContains: 'Scroll-Driven',
    titleContains: 'animation-range',
    content: `**animation-timeline: view()** leagă animația de **intrarea/ieșirea elementului din viewport** — animații la scroll mai precise decât IntersectionObserver.

**view() — timeline bazat pe vizibilitate**

\`\`\`css
/* Elementul se animează pe măsură ce intră/iese din viewport */
.card {
  animation: fade-in 1s linear;
  animation-timeline: view();
  animation-range: entry 0% entry 100%;
  /* entry: intrarea în viewport */
}

@keyframes fade-in {
  from { opacity: 0; transform: translateY(30px); }
  to   { opacity: 1; transform: translateY(0); }
}
\`\`\`

**animation-range — controlul range-ului**

\`\`\`css
/* Animația are loc pe diverse faze */
animation-range: entry 0% entry 100%;    /* la intrare completă */
animation-range: exit 0% exit 100%;      /* la ieșire completă */
animation-range: contain 0% contain 100%; /* când e complet în viewport */
animation-range: cover 0% cover 100%;    /* acoperire completă viewport */

/* Shorthand cu offset-urile */
animation-range: entry 20% entry 60%; /* de la 20% până la 60% din entry */
\`\`\`

**Fade-in la scroll pe elemente multiple**

\`\`\`css
.section-item {
  opacity: 0;
  animation: reveal 1s linear both;
  animation-timeline: view();
  animation-range: entry 10% entry 70%;
}

@keyframes reveal {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}
\`\`\`

**Scale pe intrare**

\`\`\`css
.feature-card {
  animation: scale-in 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) both;
  animation-timeline: view();
  animation-range: entry 0% entry 60%;
}

@keyframes scale-in {
  from { transform: scale(0.85); opacity: 0; }
  to   { transform: scale(1); opacity: 1; }
}
\`\`\`

**Blur fade pe ieșire**

\`\`\`css
.scrolling-section {
  animation: blur-out 1s linear both;
  animation-timeline: view();
  animation-range: exit 0% exit 100%;
}

@keyframes blur-out {
  from { filter: blur(0); opacity: 1; }
  to   { filter: blur(8px); opacity: 0; }
}
\`\`\`

**Combinare scroll + view timeline**

\`\`\`css
/* Progress indicator + reveal elements */
.page-progress {
  animation: progress 1s linear;
  animation-timeline: scroll(root);
}

.content-block {
  animation: slide-in 1s ease both;
  animation-timeline: view();
  animation-range: entry 0% entry 80%;
}
\`\`\`

**Fallback pentru browsere fără suport**

\`\`\`css
/* Verificare suport */
@supports (animation-timeline: view()) {
  .card {
    animation: fade-in 1s linear both;
    animation-timeline: view();
  }
}

/* Fallback — IntersectionObserver sau opacity=1 static */
.card { opacity: 1; } /* vizibil implicit */
\`\`\``
  },
  {
    lessonContains: 'Scroll-Driven',
    titleContains: 'Named scroll',
    content: `**Named scroll timelines** permit reutilizarea unui timeline scroll pe mai multe elemente și controlul precis al sursei de scroll.

**Definirea unui named scroll timeline**

\`\`\`css
/* Declară timeline-ul pe containerul sursă */
.scroll-container {
  scroll-timeline: --my-timeline block;
  /* sau separat: */
  scroll-timeline-name: --my-timeline;
  scroll-timeline-axis: block; /* block | inline | x | y */
  overflow-y: scroll;
}

/* Utilizare pe orice descendent */
.animated-element {
  animation: fade-in 1s linear;
  animation-timeline: --my-timeline;
}
\`\`\`

**Named view timeline**

\`\`\`css
/* Element sursă pentru view timeline */
.featured-image {
  view-timeline: --featured-img block;
}

/* Animează alt element bazat pe vizibilitatea .featured-image */
.related-caption {
  animation: caption-reveal 1s linear both;
  animation-timeline: --featured-img;
  animation-range: entry 50% exit 0%;
}
\`\`\`

**Sidebar care urmărește scroll-ul articolului**

\`\`\`css
.article-wrapper {
  scroll-timeline: --article-scroll block;
  overflow-y: auto;
  height: 600px;
}

/* Indicatorul de progres urmărește scroll-ul articolului, nu paginii */
.article-progress {
  position: sticky;
  top: 0;
  height: 4px;
  background: royalblue;
  transform-origin: left;
  transform: scaleX(0);

  animation: progress 1s linear both;
  animation-timeline: --article-scroll;
}
\`\`\`

**Horizontal scroll cu named timeline**

\`\`\`css
.h-scroll-container {
  scroll-timeline: --h-scroll inline; /* inline = orizontal */
  overflow-x: scroll;
  display: flex;
  gap: 16px;
}

.h-scroll-item {
  animation: slide-scale 1s linear both;
  animation-timeline: --h-scroll;
  animation-range: entry 0% entry 60%;
  flex-shrink: 0;
  width: 300px;
}
\`\`\`

**Timeline Scope — partajare pe arbore DOM**

\`\`\`css
/* Permite accesul la timeline de la elemente care nu sunt descendenți */
.section {
  timeline-scope: --section-scroll;
}

.inner-scroller {
  scroll-timeline: --section-scroll block;
  overflow-y: auto;
}

/* Sibling al lui .inner-scroller */
.sidebar-indicator {
  animation: track 1s linear;
  animation-timeline: --section-scroll;
}
\`\`\`

**Exemplu complex — gallery cu indicator**

\`\`\`css
.gallery-wrapper {
  scroll-timeline: --gallery block;
  overflow-y: auto;
  height: 100vh;
}

/* Thumbnail-uri active în sidebar */
.thumbnail {
  view-timeline: --thumb-view block;
  transition: opacity 0.2s;
}

.thumbnail-indicator {
  animation: highlight 1s linear both;
  animation-timeline: --thumb-view;
  animation-range: contain 0% contain 100%;
}

@keyframes highlight {
  from, to { opacity: 0.5; }
  50%      { opacity: 1; transform: scale(1.05); }
}
\`\`\``
  },
  {
    lessonContains: 'Scroll-Driven',
    titleContains: 'Staggered',
    content: `**Staggered animations și exemple practice** — animații decalate conduse de scroll, care creează efecte vizuale bogate fără JavaScript.

**Staggered reveal cu view timeline**

\`\`\`css
/* Setare delay per element cu CSS custom properties */
.grid-item {
  animation: reveal 0.6s ease both;
  animation-timeline: view();
  animation-range: entry 0% entry 60%;
  animation-delay: calc(var(--i) * 0.1s); /* delay bazat pe index */
}

.grid-item:nth-child(1)  { --i: 0; }
.grid-item:nth-child(2)  { --i: 1; }
.grid-item:nth-child(3)  { --i: 2; }
.grid-item:nth-child(4)  { --i: 3; }
.grid-item:nth-child(5)  { --i: 4; }
.grid-item:nth-child(6)  { --i: 5; }

@keyframes reveal {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}
\`\`\`

\`\`\`javascript
// Setare --i dinamic cu JS
document.querySelectorAll('.grid-item').forEach((el, i) => {
  el.style.setProperty('--i', i);
});
\`\`\`

**Titluri care se scriu la scroll**

\`\`\`css
.typewriter-title {
  animation: type-reveal 2s steps(30, end) both;
  animation-timeline: view();
  animation-range: entry 0% entry 100%;
  overflow: hidden;
  white-space: nowrap;
  border-right: 2px solid currentColor;
}

@keyframes type-reveal {
  from { width: 0; }
  to   { width: 100%; }
}
\`\`\`

**Parallax multi-layer**

\`\`\`css
.parallax-section {
  position: relative;
  min-height: 100vh;
  overflow: hidden;
}

.parallax-bg {
  animation: parallax-slow 1s linear;
  animation-timeline: scroll(root);
  position: absolute;
  inset: -20%;
}

.parallax-mid {
  animation: parallax-mid 1s linear;
  animation-timeline: scroll(root);
  position: absolute;
}

.parallax-fg {
  animation: parallax-fast 1s linear;
  animation-timeline: scroll(root);
  position: relative;
}

@keyframes parallax-slow { to { transform: translateY(15%); } }
@keyframes parallax-mid  { to { transform: translateY(30%); } }
@keyframes parallax-fast { to { transform: translateY(50%); } }
\`\`\`

**3D card rotation la scroll**

\`\`\`css
.card-3d {
  animation: rotate-3d 1s linear both;
  animation-timeline: view();
  animation-range: entry 0% cover 50%;
  transform-style: preserve-3d;
  perspective: 800px;
}

@keyframes rotate-3d {
  from { transform: perspective(800px) rotateY(-30deg); opacity: 0; }
  to   { transform: perspective(800px) rotateY(0deg); opacity: 1; }
}
\`\`\`

**Best practices**

\`\`\`css
/* Întotdeauna adaugă @supports */
@supports (animation-timeline: view()) {
  .animated { animation: ...; animation-timeline: view(); }
}

/* Respectă prefers-reduced-motion */
@media (prefers-reduced-motion: reduce) {
  * { animation-duration: 0.01ms !important; }
}

/* Folosește transform și opacity — nu left/top */
/* Evită animarea pe proprietăți layout */

/* Debug: extinde durata */
.debug { animation-duration: 10s; }
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
