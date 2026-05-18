const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const tasks = [
  {
    lessonSlug: "css-introducere",
    items: [
      {
        question: "Scrie CSS pentru un element `<h1>` cu: culoare text `#2c3e50`, font-size `2rem`, font-weight `bold`, text-align `center`, și margin-bottom de `20px`.",
        starterCode: "/* Stilizează elementul h1 */\nh1 {\n  \n}",
        explanation: "h1 { color: #2c3e50; font-size: 2rem; font-weight: bold; text-align: center; margin-bottom: 20px; }",
        type: "coding", language: "css",
      },
      {
        question: "Creează o regulă CSS pentru clasa `.card` cu: background alb, border-radius de 8px, padding de 16px, și box-shadow cu valoarea `0 2px 8px rgba(0,0,0,0.15)`.",
        starterCode: "/* Stilizează clasa .card */\n.card {\n  \n}",
        explanation: ".card { background: white; border-radius: 8px; padding: 16px; box-shadow: 0 2px 8px rgba(0,0,0,0.15); }",
        type: "coding", language: "css",
      },
      {
        question: "Scrie CSS pentru un link `<a>` cu: culoare `#3498db` în stare normală, culoare `#2980b9` la hover, fără text-decoration în stare normală, cu text-decoration underline la hover. Folosește pseudo-clasa `:hover`.",
        starterCode: "/* Stilizează link-ul */\na {\n  \n}\n\na:hover {\n  \n}",
        explanation: "a { color: #3498db; text-decoration: none; } a:hover { color: #2980b9; text-decoration: underline; }",
        type: "coding", language: "css",
      },
    ],
  },
  {
    lessonSlug: "css-box-model",
    items: [
      {
        question: "Stilizează un element `.box` cu: width `200px`, height `150px`, padding `20px` pe toate laturile, border de `2px solid #333`, și margin `auto` (pentru centrare). Folosește `box-sizing: border-box`.",
        starterCode: "/* Stilizează .box cu box model complet */\n.box {\n  \n}",
        explanation: ".box { width: 200px; height: 150px; padding: 20px; border: 2px solid #333; margin: auto; box-sizing: border-box; }",
        type: "coding", language: "css",
      },
      {
        question: "Creează un element `.button` cu: padding `12px 24px` (top/bottom 12px, stânga/dreapta 24px), border-radius `25px` (pentru efect pill), background `#e74c3c`, culoare text albă, cursor `pointer`, și fără border.",
        starterCode: "/* Stilizează .button ca un pill button */\n.button {\n  \n}",
        explanation: ".button { padding: 12px 24px; border-radius: 25px; background: #e74c3c; color: white; cursor: pointer; border: none; }",
        type: "coding", language: "css",
      },
    ],
  },
  {
    lessonSlug: "css-display-position",
    items: [
      {
        question: "Creează un `.navbar` cu `position: fixed`, top și left `0`, width `100%`, height `60px`, background `#1a1a2e`, z-index `1000`. Adaugă și un `.main-content` cu `margin-top: 60px` pentru a compensa navbar-ul fix.",
        starterCode: "/* Navbar fix în partea de sus */\n.navbar {\n  \n}\n\n/* Conținut principal sub navbar */\n.main-content {\n  \n}",
        explanation: ".navbar { position: fixed; top: 0; left: 0; width: 100%; height: 60px; background: #1a1a2e; z-index: 1000; } .main-content { margin-top: 60px; }",
        type: "coding", language: "css",
      },
      {
        question: "Stilizează un `.tooltip` care apare deasupra unui element. Folosește `position: absolute`, bottom `100%`, left `50%`, transform `translateX(-50%)`, background negru, culoare albă, padding `4px 8px`, border-radius `4px`.",
        starterCode: "/* Container pentru tooltip */\n.tooltip-container {\n  position: relative;\n  display: inline-block;\n}\n\n/* Tooltip-ul în sine */\n.tooltip {\n  \n}",
        explanation: ".tooltip-container { position: relative; display: inline-block; } .tooltip { position: absolute; bottom: 100%; left: 50%; transform: translateX(-50%); background: black; color: white; padding: 4px 8px; border-radius: 4px; }",
        type: "coding", language: "css",
      },
    ],
  },
  {
    lessonSlug: "css-flexbox",
    items: [
      {
        question: "Creează un `.flex-container` cu display flex, justify-content `space-between`, align-items `center`, gap `16px`, și flex-wrap `wrap`. Adaugă și `.flex-item` cu flex `1 1 200px` (flex-grow, flex-shrink, flex-basis).",
        starterCode: "/* Container Flexbox */\n.flex-container {\n  \n}\n\n/* Item flex */\n.flex-item {\n  \n}",
        explanation: ".flex-container { display: flex; justify-content: space-between; align-items: center; gap: 16px; flex-wrap: wrap; } .flex-item { flex: 1 1 200px; }",
        type: "coding", language: "css",
      },
      {
        question: "Creează un layout cu `.sidebar` (width 250px, flex-shrink 0) și `.content` (flex 1, overflow auto) folosind un `.page-layout` ca flex container cu height 100vh. Sidebar-ul nu trebuie să se micșoreze.",
        starterCode: "/* Layout pagina cu sidebar */\n.page-layout {\n  \n}\n\n.sidebar {\n  \n}\n\n.content {\n  \n}",
        explanation: ".page-layout { display: flex; height: 100vh; } .sidebar { width: 250px; flex-shrink: 0; } .content { flex: 1; overflow: auto; }",
        type: "coding", language: "css",
      },
      {
        question: "Centrează perfect un element `.centered-box` atât orizontal cât și vertical în interiorul unui `.wrapper` cu height `100vh`. Folosește flexbox pe `.wrapper`.",
        starterCode: "/* Wrapper full height */\n.wrapper {\n  height: 100vh;\n  /* adaugă flexbox pentru centrare */\n}\n\n.centered-box {\n  width: 200px;\n  height: 200px;\n  background: coral;\n}",
        explanation: ".wrapper { height: 100vh; display: flex; justify-content: center; align-items: center; } .centered-box { width: 200px; height: 200px; background: coral; }",
        type: "coding", language: "css",
      },
    ],
  },
  {
    lessonSlug: "css-grid",
    items: [
      {
        question: "Creează un `.grid-layout` cu 3 coloane egale, gap de 20px, și 2 rânduri automate. Folosește `grid-template-columns` cu `repeat(3, 1fr)` și `grid-auto-rows` de `minmax(100px, auto)`.",
        starterCode: "/* Grid layout cu 3 coloane */\n.grid-layout {\n  \n}",
        explanation: ".grid-layout { display: grid; grid-template-columns: repeat(3, 1fr); grid-auto-rows: minmax(100px, auto); gap: 20px; }",
        type: "coding", language: "css",
      },
      {
        question: "Creează un layout de tip magazine cu CSS Grid: un `.magazine-grid` cu coloane `sidebar(200px) + main(1fr) + aside(150px)` și 2 rânduri (`header(60px) + content(1fr)`). Elementul `.header` trebuie să ocupe toate cele 3 coloane (grid-column: 1 / -1).",
        starterCode: "/* Magazine layout cu Grid */\n.magazine-grid {\n  display: grid;\n  /* definește coloanele și rândurile */\n}\n\n.header {\n  /* span toate coloanele */\n}",
        explanation: ".magazine-grid { display: grid; grid-template-columns: 200px 1fr 150px; grid-template-rows: 60px 1fr; } .header { grid-column: 1 / -1; }",
        type: "coding", language: "css",
      },
    ],
  },
  {
    lessonSlug: "css-animations",
    items: [
      {
        question: "Creează o animație CSS numită `fadeIn` care face un element să apară treptat: de la opacity 0 la opacity 1, și de la translateY(20px) la translateY(0). Aplicați animația pe clasa `.fade-in-element` cu durata 0.5s și ease-out.",
        starterCode: "/* Definește animația fadeIn */\n@keyframes fadeIn {\n  \n}\n\n/* Aplică animația */\n.fade-in-element {\n  \n}",
        explanation: "@keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } } .fade-in-element { animation: fadeIn 0.5s ease-out; }",
        type: "coding", language: "css",
      },
      {
        question: "Creează un buton `.pulse-button` cu o animație de puls: la fiecare ciclu, scale merge de la 1 la 1.05 și înapoi la 1. Animația să fie infinită, cu durata 1.5s și ease-in-out. Adaugă și transition pentru hover.",
        starterCode: "/* Animație puls */\n@keyframes pulse {\n  \n}\n\n.pulse-button {\n  padding: 12px 24px;\n  background: #3498db;\n  color: white;\n  border: none;\n  border-radius: 8px;\n  cursor: pointer;\n  /* aplică animația */\n}",
        explanation: "@keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } } .pulse-button { padding: 12px 24px; background: #3498db; color: white; border: none; border-radius: 8px; cursor: pointer; animation: pulse 1.5s ease-in-out infinite; }",
        type: "coding", language: "css",
      },
    ],
  },
  {
    lessonSlug: "css-responsive",
    items: [
      {
        question: "Creează un layout responsiv pentru `.container`: pe mobile (max 768px) — o coloană cu padding 16px; pe tabletă (768px-1024px) — 2 coloane cu gap 24px; pe desktop (min 1024px) — 3 coloane cu gap 32px și max-width 1200px centrat.",
        starterCode: "/* Mobile first */\n.container {\n  /* stiluri de bază pentru mobile */\n}\n\n/* Tabletă */\n@media (min-width: 768px) {\n  .container {\n    \n  }\n}\n\n/* Desktop */\n@media (min-width: 1024px) {\n  .container {\n    \n  }\n}",
        explanation: ".container { display: grid; grid-template-columns: 1fr; padding: 16px; } @media (min-width: 768px) { .container { grid-template-columns: repeat(2, 1fr); gap: 24px; } } @media (min-width: 1024px) { .container { grid-template-columns: repeat(3, 1fr); gap: 32px; max-width: 1200px; margin: 0 auto; } }",
        type: "coding", language: "css",
      },
    ],
  },
  {
    lessonSlug: "css-variabile",
    items: [
      {
        question: "Definește variabile CSS (custom properties) pentru un sistem de design: în `:root` adaugă `--primary: #3498db`, `--secondary: #2ecc71`, `--text: #2c3e50`, `--bg: #f8f9fa`, `--spacing-sm: 8px`, `--spacing-md: 16px`, `--spacing-lg: 32px`, `--radius: 8px`. Creează o clasă `.theme-card` care folosește aceste variabile.",
        starterCode: "/* Definește variabilele în :root */\n:root {\n  \n}\n\n/* Folosește variabilele */\n.theme-card {\n  \n}",
        explanation: ":root { --primary: #3498db; --secondary: #2ecc71; --text: #2c3e50; --bg: #f8f9fa; --spacing-sm: 8px; --spacing-md: 16px; --spacing-lg: 32px; --radius: 8px; } .theme-card { background: var(--bg); color: var(--text); padding: var(--spacing-md); border-radius: var(--radius); border: 2px solid var(--primary); }",
        type: "coding", language: "css",
      },
    ],
  },
];

async function main() {
  console.log('Adăugare coding tasks CSS...');
  let added = 0, skipped = 0;

  for (const { lessonSlug, items } of tasks) {
    const lesson = await prisma.lesson.findFirst({ where: { slug: lessonSlug } });
    if (!lesson) { console.log(`  [skip] ${lessonSlug} — lecție negăsită`); skipped++; continue; }

    const existing = await prisma.task.count({ where: { lessonId: lesson.id, type: 'coding' } });
    if (existing >= items.length) { console.log(`  [skip] ${lessonSlug} — are deja ${existing} coding tasks`); skipped++; continue; }

    const maxTask = await prisma.task.findFirst({ where: { lessonId: lesson.id }, orderBy: { number: 'desc' } });
    let n = (maxTask?.number ?? 0) + 1;

    for (const item of items) {
      await prisma.task.create({
        data: {
          lessonId: lesson.id,
          number: n++,
          name: item.name || '',
          question: item.question,
          type: item.type,
          language: item.language,
          starterCode: item.starterCode || '',
          explanation: item.explanation || '',
          options: [],
          answer: '',
          difficulty: item.difficulty || 'medium',
          expectedOutput: '',
        },
      });
    }
    console.log(`  [ok] ${lessonSlug} — ${items.length} tasks adăugate`);
    added += items.length;
  }

  console.log(`\nGata: ${added} adăugate, ${skipped} sărite.`);
  await prisma.$disconnect();
}

main().catch(console.error);
