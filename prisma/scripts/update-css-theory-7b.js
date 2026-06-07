const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();

async function run() {
  const lessons = await p.lesson.findMany({
    where: { module: { slug: 'css' }, title: { contains: 'Pagina stilizat' } }
  });
  const theory = await p.theory.findFirst({
    where: { lessonId: { in: lessons.map(l => l.id) }, title: { contains: 'Variabile' } }
  });
  if (!theory) { console.log('Not found'); await p.$disconnect(); return; }
  const content = `**Variabilele CSS și layout-ul** sunt coloana vertebrală a paginii personale — variabilele asigură consistența vizuală, iar Grid + Flexbox construiesc structura.

**Sistemul de design tokens**

\`\`\`css
:root {
  /* Culori */
  --primary:      #3b82f6;
  --primary-dark: #2563eb;
  --accent:       #8b5cf6;
  --text:         #1e293b;
  --text-muted:   #64748b;
  --bg:           #ffffff;
  --bg-card:      #f8fafc;
  --border:       #e2e8f0;

  /* Spațiere */
  --space-xs:  4px;
  --space-sm:  8px;
  --space-md:  16px;
  --space-lg:  32px;
  --space-xl:  64px;
  --space-2xl: 96px;

  /* Borduri */
  --radius-sm: 6px;
  --radius:    12px;
  --radius-lg: 20px;

  /* Umbre */
  --shadow-sm: 0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04);
  --shadow:    0 4px 12px rgba(0,0,0,0.08);
  --shadow-lg: 0 12px 32px rgba(0,0,0,0.12);

  /* Tipografie */
  --font-sans:  'Inter', system-ui, -apple-system, sans-serif;
  --font-mono:  'JetBrains Mono', 'Fira Code', monospace;

  /* Layout */
  --max-w:      1200px;
  --nav-h:      72px;
}
\`\`\`

**Layout principal cu CSS Grid**

\`\`\`css
.page-wrapper {
  display: grid;
  grid-template-rows: var(--nav-h) 1fr auto;
  min-height: 100vh;
}

.site-header {
  height: var(--nav-h);
  /* sticky definit separat */
}

.site-main { /* 1fr — umple spațiul disponibil */ }
.site-footer { /* auto — înălțimea conținutului */ }
\`\`\`

**Hero Section cu variabile**

\`\`\`css
.hero {
  max-width: var(--max-w);
  margin: 0 auto;
  padding: var(--space-2xl) var(--space-lg);
  display: grid;
  grid-template-columns: 1fr clamp(200px, 25vw, 350px);
  align-items: center;
  gap: var(--space-2xl);
}

.hero__title {
  font-size: clamp(2.5rem, 5vw, 4.5rem);
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.02em;
  margin-bottom: var(--space-md);
  color: var(--text);
}

.hero__title .gradient-text {
  background: linear-gradient(135deg, var(--primary), var(--accent));
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
}

.hero__lead {
  font-size: clamp(1rem, 2vw, 1.2rem);
  color: var(--text-muted);
  max-width: 52ch;
  line-height: 1.7;
  margin-bottom: var(--space-lg);
}
\`\`\`

**Skills grid**

\`\`\`css
.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: var(--space-sm);
  margin-top: var(--space-lg);
}

.skill-tag {
  background: rgba(59,130,246,0.08);
  color: var(--primary);
  border: 1px solid rgba(59,130,246,0.2);
  border-radius: var(--radius-sm);
  padding: var(--space-xs) var(--space-sm);
  font-size: 0.85rem;
  font-weight: 500;
  text-align: center;
  transition: all 0.2s ease;
}

.skill-tag:hover {
  background: rgba(59,130,246,0.15);
  border-color: var(--primary);
  transform: translateY(-1px);
}
\`\`\``;
  await p.theory.update({ where: { id: theory.id }, data: { content } });
  console.log(`✓ ${theory.title}: ${theory.content.length} → ${content.length}`);
  await p.$disconnect();
}

run().catch(e => { console.error(e); p.$disconnect(); process.exit(1); });
