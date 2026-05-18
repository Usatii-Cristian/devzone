const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const tasks = [
  {
    slug: 'css-modern-features',
    name: 'CSS Custom Properties',
    question: 'Definește variabile CSS pentru o paletă: --primary (#3b82f6), --secondary (#8b5cf6), --text (#1f2937). Aplică-le pe un card cu background primary și text alb.',
    language: 'css',
    starterCode: `:root {\n  /* definește variabilele */\n}\n\n.card {\n  background: var(--primary);\n  color: white;\n  padding: 1rem;\n  border-radius: 0.5rem;\n}`,
    expectedOutput: '',
  },
  {
    slug: 'css-pseudo-clase',
    name: 'Pseudo-clase interactive',
    question: 'Stilizează un buton cu: culoare normală albastru, :hover verde, :active roșu, :focus cu outline portocaliu. Adaugă tranziție de 0.2s.',
    language: 'css',
    starterCode: `.btn {\n  background: blue;\n  color: white;\n  padding: 0.5rem 1rem;\n  border: none;\n  cursor: pointer;\n  /* adaugă tranziție */\n}\n\n/* hover, active, focus */`,
    expectedOutput: '',
  },
  {
    slug: 'css-pseudo-elemente',
    name: 'Pseudo-elemente ::before/::after',
    question: 'Creează un element .quote care adaugă ghilimele tipografice ("  ") cu ::before și ::after, colorate în gri.',
    language: 'css',
    starterCode: `.quote {\n  font-style: italic;\n  position: relative;\n  padding: 0 1rem;\n}\n\n.quote::before {\n  content: /* ghilimea deschisă */;\n  /* stilizare */\n}\n\n.quote::after {\n  content: /* ghilimea închisă */;\n  /* stilizare */\n}`,
    expectedOutput: '',
  },
  {
    slug: 'css-specificitate',
    name: 'Specificitate CSS',
    question: 'Scrie selectori CSS demonstrând specificitate: un stil de element (p), o clasă (.text), un id (#title). Aplică culori diferite și comentează specificitatea fiecăruia.',
    language: 'css',
    starterCode: `/* specificitate: 0,0,1 */\np {\n  color: black;\n}\n\n/* specificitate: 0,1,0 */\n.text {\n  color: /* culoare */;\n}\n\n/* specificitate: 1,0,0 */\n#title {\n  color: /* culoare */;\n}`,
    expectedOutput: '',
  },
  {
    slug: 'css-selectori-avansati',
    name: 'Selectori avansați CSS',
    question: 'Folosind selectori avansați: stilizează primul li din ul, fiecare al doilea tr din tabel, și orice input care nu este de tip submit.',
    language: 'css',
    starterCode: `/* primul li */\n\n/* fiecare al doilea tr */\n\n/* input care nu e submit */`,
    expectedOutput: '',
  },
  {
    slug: 'css-background-gradient',
    name: 'Gradient și background',
    question: 'Creează un hero section cu gradient linear de la #667eea la #764ba2, text alb centrat, padding 4rem. Adaugă și un background radial pentru un element decorativ.',
    language: 'css',
    starterCode: `.hero {\n  /* gradient linear */\n  color: white;\n  text-align: center;\n  padding: 4rem;\n}\n\n.deco {\n  width: 100px;\n  height: 100px;\n  border-radius: 50%;\n  /* gradient radial */\n}`,
    expectedOutput: '',
  },
  {
    slug: 'css-transitions',
    name: 'Tranziții CSS smooth',
    question: 'Creează un card care la hover: crește cu scale(1.05), umbrele devin mai pronunțate, iar fundalul se schimbă. Toate cu tranziție de 0.3s ease.',
    language: 'css',
    starterCode: `.card {\n  background: white;\n  box-shadow: 0 2px 4px rgba(0,0,0,0.1);\n  padding: 1.5rem;\n  border-radius: 0.75rem;\n  transition: /* toate proprietățile */;\n}\n\n.card:hover {\n  /* scale, shadow, background */\n}`,
    expectedOutput: '',
  },
  {
    slug: 'css-transform',
    name: 'Transform 2D și 3D',
    question: 'Aplică transformări pe 3 elemente: unul rotit 45deg, unul scalat 1.5x pe X, și unul translat cu 50px pe ambele axe.',
    language: 'css',
    starterCode: `.rotate {\n  transform: /* rotire */;\n}\n\n.scale-x {\n  transform: /* scaleX */;\n}\n\n.translate {\n  transform: /* translateX și translateY */;\n}`,
    expectedOutput: '',
  },
  {
    slug: 'css-animations-keyframes',
    name: 'Animații cu @keyframes',
    question: 'Creează o animație "pulse" care face un element să pulseze (scale 1 → 1.2 → 1) la infinit cu durata 1.5s ease-in-out.',
    language: 'css',
    starterCode: `@keyframes pulse {\n  /* 0%, 50%, 100% */\n}\n\n.pulsing {\n  width: 50px;\n  height: 50px;\n  background: #ef4444;\n  border-radius: 50%;\n  animation: /* pulse settings */;\n}`,
    expectedOutput: '',
  },
  {
    slug: 'css-filter-backdrop',
    name: 'Filtre CSS',
    question: 'Aplică filtre CSS: o imagine cu blur(4px) și brightness(0.8) la hover, și un element glassmorphism cu backdrop-filter: blur(10px) și background semi-transparent.',
    language: 'css',
    starterCode: `.img-hover {\n  transition: filter 0.3s;\n}\n\n.img-hover:hover {\n  filter: /* blur și brightness */;\n}\n\n.glass {\n  background: rgba(255,255,255,0.1);\n  backdrop-filter: /* blur */;\n  border: 1px solid rgba(255,255,255,0.2);\n}`,
    expectedOutput: '',
  },
  {
    slug: 'css-clip-mask',
    name: 'Clip-path forme',
    question: 'Creează 3 elemente cu clip-path diferit: un triunghi, un hexagon (polygon), și un cerc. Colorează fiecare diferit.',
    language: 'css',
    starterCode: `.triangle {\n  width: 100px;\n  height: 100px;\n  background: #3b82f6;\n  clip-path: /* triunghi */;\n}\n\n.hexagon {\n  background: #8b5cf6;\n  clip-path: /* hexagon polygon */;\n}\n\n.circle {\n  background: #10b981;\n  clip-path: circle(50%);\n}`,
    expectedOutput: '',
  },
  {
    slug: 'css-aspect-ratio',
    name: 'Aspect ratio și sizing modern',
    question: 'Creează un container video cu aspect-ratio 16/9, un avatar pătrat cu aspect-ratio 1/1, și un card cu min-height folosind clamp().',
    language: 'css',
    starterCode: `.video-wrap {\n  aspect-ratio: /* 16/9 */;\n  background: #000;\n  width: 100%;\n}\n\n.avatar {\n  aspect-ratio: /* 1/1 */;\n  width: 80px;\n  border-radius: 50%;\n}\n\n.card {\n  min-height: clamp(/* 200px, 30vh, 400px */);\n}`,
    expectedOutput: '',
  },
  {
    slug: 'css-container-queries',
    name: 'Container Queries',
    question: 'Scrie un container query: dacă .card-container e mai lat de 400px, card-ul din interior să afișeze layoutul orizontal (flex row). Sub 400px: vertical (flex column).',
    language: 'css',
    starterCode: `.card-container {\n  container-type: inline-size;\n}\n\n.card {\n  display: flex;\n  flex-direction: column;\n}\n\n@container (min-width: 400px) {\n  .card {\n    /* layout orizontal */\n  }\n}`,
    expectedOutput: '',
  },
  {
    slug: 'css-layers-cascade',
    name: 'Cascade Layers',
    question: 'Definește 3 cascade layers: base, components, utilities. Fiecare să override culoarea de text diferit, demonstrând că utilities câștigă.',
    language: 'css',
    starterCode: `@layer base, components, utilities;\n\n@layer base {\n  p { color: black; }\n}\n\n@layer components {\n  p { color: /* culoare */; }\n}\n\n@layer utilities {\n  p { color: /* culoare câștigătoare */; }\n}`,
    expectedOutput: '',
  },
  {
    slug: 'css-scroll-snap',
    name: 'Scroll Snap',
    question: 'Creează un carousel orizontal cu scroll-snap. Containerul: overflow-x scroll, scroll-snap-type x mandatory. Fiecare item: scroll-snap-align start, width 100%.',
    language: 'css',
    starterCode: `.carousel {\n  display: flex;\n  overflow-x: scroll;\n  scroll-snap-type: /* x mandatory */;\n  width: 300px;\n}\n\n.slide {\n  min-width: 100%;\n  scroll-snap-align: /* start */;\n  height: 200px;\n}`,
    expectedOutput: '',
  },
  {
    slug: 'css-proiect-pagina',
    name: 'Landing page CSS complet',
    question: 'Stilizează o secțiune hero completă: gradient background, titlu mare centrat, subtitlu, buton CTA cu hover effect, și text care dispare la ecrane mici (@media max-width: 640px).',
    language: 'css',
    starterCode: `.hero {\n  /* gradient, padding, text-align */\n}\n\n.hero h1 {\n  /* font-size mare */\n}\n\n.hero .cta {\n  /* buton stilizat */\n}\n\n@media (max-width: 640px) {\n  .hero .subtitle {\n    display: none;\n  }\n}`,
    expectedOutput: '',
  },
  {
    slug: 'css-houdini-api',
    name: 'CSS Paint Worklet simplu',
    question: 'Fără Houdini (nu e disponibil în preview), creează un pattern de fundal cu CSS gradient repeating-linear-gradient care simulează dungi diagonale.',
    language: 'css',
    starterCode: `.striped {\n  background: repeating-linear-gradient(\n    /* 45deg */\n    /* dungi alternante */\n  );\n  width: 200px;\n  height: 200px;\n}`,
    expectedOutput: '',
  },
  {
    slug: 'css-view-transitions',
    name: 'View Transitions API',
    question: 'Scrie CSS pentru animații de tranziție: definește @keyframes pentru fade-out și fade-in, și aplică-le pe ::view-transition-old și ::view-transition-new.',
    language: 'css',
    starterCode: `@keyframes fade-out {\n  to { opacity: 0; }\n}\n\n@keyframes fade-in {\n  from { opacity: 0; }\n}\n\n::view-transition-old(root) {\n  animation: /* fade-out */;\n}\n\n::view-transition-new(root) {\n  animation: /* fade-in */;\n}`,
    expectedOutput: '',
  },
  {
    slug: 'css-scroll-driven-animations',
    name: 'Scroll-driven animations',
    question: 'Scrie CSS pentru o bară de progres care se animează pe măsură ce utilizatorul scrollează: animation-timeline: scroll(), animation-range: 0% 100%.',
    language: 'css',
    starterCode: `.progress-bar {\n  position: fixed;\n  top: 0;\n  left: 0;\n  height: 4px;\n  background: #3b82f6;\n  transform-origin: left;\n  animation: /* grow */ linear;\n  animation-timeline: scroll();\n  animation-range: 0% 100%;\n}\n\n@keyframes grow {\n  from { transform: scaleX(0); }\n  to { transform: scaleX(1); }\n}`,
    expectedOutput: '',
  },
  {
    slug: 'css-cascade-layers-advanced',
    name: 'Cascade layers cu third-party',
    question: 'Creează o structură de layers pentru a controla specificitatea stilurilor third-party: layers reset, vendor, base, components, overrides.',
    language: 'css',
    starterCode: `/* Definește ordinea layers */\n@layer /* lista layers */;\n\n@layer reset {\n  *, *::before, *::after { box-sizing: border-box; }\n}\n\n@layer vendor {\n  /* stiluri third-party simulate */\n  .btn { background: blue; }\n}\n\n@layer overrides {\n  /* override vendor */\n  .btn { background: green; }\n}`,
    expectedOutput: '',
  },
  {
    slug: 'css-color-oklch-p3',
    name: 'Culori moderne OKLCH',
    question: 'Definește o paletă de culori folosind oklch(). Creează variante light/dark ale aceleiași culori schimbând doar luminozitatea (L), menținând chroma (C) și hue-ul (H).',
    language: 'css',
    starterCode: `:root {\n  --brand-light: oklch(/* L mare C H */);\n  --brand-mid: oklch(/* L mediu C H */);\n  --brand-dark: oklch(/* L mic C H */);\n}\n\n.light { background: var(--brand-light); }\n.mid { background: var(--brand-mid); }\n.dark { background: var(--brand-dark); color: white; }`,
    expectedOutput: '',
  },
];

async function main() {
  console.log('Adăugare coding tasks CSS...');
  let added = 0, skipped = 0;
  for (const t of tasks) {
    const lesson = await prisma.lesson.findFirst({ where: { slug: t.slug } });
    if (!lesson) { console.log(`  [skip] ${t.slug} — nu există`); skipped++; continue; }
    const existing = await prisma.task.findFirst({ where: { lessonId: lesson.id, type: 'coding' } });
    if (existing) { console.log(`  [skip] ${t.slug} — are deja coding`); skipped++; continue; }
    const maxTask = await prisma.task.findFirst({ where: { lessonId: lesson.id }, orderBy: { number: 'desc' } });
    const n = (maxTask?.number ?? 0) + 1;
    await prisma.task.create({
      data: {
        lessonId: lesson.id, number: n,
        name: t.name, question: t.question,
        options: [], answer: '',
        explanation: '',
        difficulty: 'medium',
        type: 'coding', language: t.language,
        starterCode: t.starterCode || '',
        expectedOutput: t.expectedOutput || '',
      },
    });
    console.log(`  [ok] ${t.slug}`);
    added++;
  }
  console.log(`\nGata: ${added} adăugate, ${skipped} sărite.`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
