const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();

const items = [
  // L25: Mini proiect — Pagina stilizată
  {
    lessonContains: 'Pagina stilizat',
    titleContains: 'Stilizăm',
    content: `**Mini proiectul** constă în construirea unei pagini personale complete — portofoliu sau prezentare — aplicând tot ce ai învățat: variabile CSS, Flexbox, Grid, tipografie și culori.

**Structura HTML a paginii**

\`\`\`html
<!DOCTYPE html>
<html lang="ro">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Pagina mea personală</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <header class="site-header">
    <nav class="nav">
      <a href="#" class="nav__logo">NumeMeu</a>
      <ul class="nav__links">
        <li><a href="#about">Despre</a></li>
        <li><a href="#projects">Proiecte</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  </header>

  <main>
    <section class="hero" id="about">
      <div class="hero__content">
        <h1 class="hero__title">Salut, sunt <span class="accent">NumeMeu</span></h1>
        <p class="hero__subtitle">Dezvoltator Frontend pasionat de CSS și UI</p>
        <div class="hero__cta">
          <a href="#projects" class="btn btn--primary">Proiectele mele</a>
          <a href="#contact" class="btn btn--outline">Contact</a>
        </div>
      </div>
      <div class="hero__image">
        <img src="avatar.jpg" alt="Fotografia mea" class="avatar">
      </div>
    </section>

    <section class="projects" id="projects">
      <h2 class="section-title">Proiecte</h2>
      <div class="projects__grid">
        <article class="project-card">
          <div class="project-card__image">
            <img src="project1.jpg" alt="Proiect 1">
          </div>
          <div class="project-card__body">
            <h3>Nume Proiect</h3>
            <p>Descriere scurtă a proiectului.</p>
            <a href="#" class="btn btn--sm">Vezi</a>
          </div>
        </article>
      </div>
    </section>
  </main>

  <footer class="site-footer">
    <p>&copy; 2024 NumeMeu</p>
  </footer>
</body>
</html>
\`\`\`

**Organizarea fișierelor CSS**

\`\`\`
style.css       — fișierul principal cu import-uri
_variables.css  — custom properties
_reset.css      — normalizare browsere
_typography.css — fonturi și titluri
_layout.css     — grid și flex containers
_components.css — butoane, carduri, nav
_utilities.css  — clase helper
\`\`\`

**Tokens de design de la început**

\`\`\`css
/* _variables.css */
:root {
  --primary:   #3b82f6;
  --accent:    #8b5cf6;
  --text:      #1e293b;
  --text-muted:#64748b;
  --bg:        #ffffff;
  --bg-card:   #f8fafc;
  --border:    #e2e8f0;
  --radius:    12px;
  --shadow:    0 4px 12px rgba(0,0,0,0.08);
  --font-sans: 'Inter', system-ui, sans-serif;
  --max-w:     1200px;
}
\`\`\``
  },
  {
    lessonContains: 'Pagina stilizat',
    titleContains: 'Variabile + layout',
    content: `**Variabilele și layout-ul** sunt inima proiectului — variabilele asigură consistența vizuală, iar Grid și Flexbox construiesc structura adaptabilă.

**Reset și base styles**

\`\`\`css
/* _reset.css */
*, *::before, *::after { box-sizing: border-box; }
* { margin: 0; padding: 0; }

html {
  scroll-behavior: smooth;
  scroll-padding-top: 80px;
}

body {
  font-family: var(--font-sans);
  color: var(--text);
  background: var(--bg);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}

img { max-width: 100%; display: block; }
a   { color: inherit; text-decoration: none; }
\`\`\`

**Navigation cu Flexbox**

\`\`\`css
.site-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(255,255,255,0.9);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border);
}

.nav {
  max-width: var(--max-w);
  margin: 0 auto;
  padding: 16px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.nav__logo {
  font-size: 1.25rem;
  font-weight: 700;
  background: linear-gradient(135deg, var(--primary), var(--accent));
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
}

.nav__links {
  display: flex;
  list-style: none;
  gap: 32px;
}

.nav__links a {
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--text-muted);
  transition: color 0.2s;
}

.nav__links a:hover { color: var(--primary); }
\`\`\`

**Hero section cu CSS Grid**

\`\`\`css
.hero {
  max-width: var(--max-w);
  margin: 0 auto;
  padding: 80px 24px;
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  gap: 48px;
  min-height: calc(100vh - 72px);
}

.hero__title {
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 16px;
}

.accent {
  background: linear-gradient(135deg, var(--primary), var(--accent));
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
}

.hero__subtitle {
  font-size: clamp(1rem, 2vw, 1.25rem);
  color: var(--text-muted);
  margin-bottom: 32px;
}

.hero__cta {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.avatar {
  width: clamp(200px, 25vw, 320px);
  height: clamp(200px, 25vw, 320px);
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid var(--border);
  box-shadow: var(--shadow);
}
\`\`\`

**Grid pentru proiecte**

\`\`\`css
.projects {
  padding: 80px 24px;
  max-width: var(--max-w);
  margin: 0 auto;
}

.projects__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
  margin-top: 40px;
}
\`\`\``
  },
  {
    lessonContains: 'Pagina stilizat',
    titleContains: 'Detalii',
    content: `**Componentele și responsivul** finalizează proiectul — butoane, card-uri, footer și breakpoint-urile mobile care fac pagina să arate bine pe orice ecran.

**Butoane (componente refolosibile)**

\`\`\`css
.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  border-radius: var(--radius);
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  border: 2px solid transparent;
  transition: all 0.2s ease;
  text-decoration: none;
}

.btn--primary {
  background: var(--primary);
  color: white;
}
.btn--primary:hover {
  background: #2563eb;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(59,130,246,0.3);
}

.btn--outline {
  background: transparent;
  border-color: var(--border);
  color: var(--text);
}
.btn--outline:hover {
  border-color: var(--primary);
  color: var(--primary);
}

.btn--sm { padding: 8px 16px; font-size: 0.85rem; }
\`\`\`

**Project card**

\`\`\`css
.project-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  overflow: hidden;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.project-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(0,0,0,0.1);
}

.project-card__image {
  aspect-ratio: 16 / 9;
  overflow: hidden;
}

.project-card__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.project-card:hover .project-card__image img {
  transform: scale(1.05);
}

.project-card__body {
  padding: 20px;
}

.project-card__body h3 {
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 8px;
}

.project-card__body p {
  color: var(--text-muted);
  font-size: 0.9rem;
  margin-bottom: 16px;
  line-height: 1.5;
}
\`\`\`

**Footer**

\`\`\`css
.site-footer {
  border-top: 1px solid var(--border);
  padding: 32px 24px;
  text-align: center;
  color: var(--text-muted);
  font-size: 0.9rem;
}
\`\`\`

**Responsive — mobile first**

\`\`\`css
/* Mobile: single column */
.hero {
  grid-template-columns: 1fr;
  text-align: center;
  padding: 48px 24px;
  min-height: auto;
}

.hero__image { order: -1; }

.avatar {
  width: 160px;
  height: 160px;
  margin: 0 auto;
}

.hero__cta { justify-content: center; }

.nav__links { display: none; } /* mobile menu omis pentru simplitate */

/* Tablet și mai mare */
@media (min-width: 768px) {
  .hero {
    grid-template-columns: 1fr auto;
    text-align: left;
    padding: 80px 24px;
    min-height: calc(100vh - 72px);
  }

  .hero__image { order: 0; }
  .hero__cta   { justify-content: flex-start; }
  .nav__links  { display: flex; }
}

/* Large desktop */
@media (min-width: 1200px) {
  .projects__grid { grid-template-columns: repeat(3, 1fr); }
}
\`\`\``
  },

  // L26: CSS Subgrid
  {
    lessonContains: 'Subgrid',
    titleContains: 'Ce este Sub',
    content: `**CSS Subgrid** permite elementelor imbricate să participe la **grid-ul părintelui** — coloanele și rândurile copilului se aliniază cu grid-ul exterior, nu creează un grid nou independent.

**Problema pe care Subgrid o rezolvă**

\`\`\`css
/* FĂRĂ Subgrid — carduri cu înălțimi diferite */
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.card {
  display: grid; /* grid intern independent */
  grid-template-rows: auto 1fr auto;
  /* Problema: rândurile .card NU sunt aliniate între carduri */
}
\`\`\`

\`\`\`
Card 1:     Card 2:          Card 3:
[Imagine]   [Imagine]        [Imagine]
[Titlu]     [Titlu lung      [Titlu]
             pe două rânduri]
[Buton]     [Buton]          [Buton]

→ Butoanele nu sunt la același nivel vizual
\`\`\`

**Soluția cu Subgrid**

\`\`\`css
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto 1fr auto; /* rânduri definite pe grid */
  gap: 24px;
}

.card {
  display: grid;
  grid-row: span 3; /* ocupă 3 rânduri din grid-ul parinte */
  grid-template-rows: subgrid; /* moștenește rândurile din parinte */
}

/* Acum toate .card__image, .card__body, .card__footer */
/* se aliniază automat pe aceleași rânduri */
\`\`\`

**Sintaxa subgrid**

\`\`\`css
.subgrid-child {
  /* Subgrid pe rânduri */
  grid-row: span 3;
  grid-template-rows: subgrid;

  /* Subgrid pe coloane */
  grid-column: span 4;
  grid-template-columns: subgrid;

  /* Subgrid pe ambele axe */
  grid-row: span 3;
  grid-column: span 4;
  grid-template-rows: subgrid;
  grid-template-columns: subgrid;
}
\`\`\`

**Gap în Subgrid**

\`\`\`css
.parent-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px; /* gap-ul se moștenește automat în subgrid */
}

.child {
  grid-column: span 2;
  display: grid;
  grid-template-columns: subgrid;
  /* child moștenește gap-ul de 24px din parinte */
  /* gap: 12px; — poate suprascrie dacă vrei altceva */
}
\`\`\`

**Suport browser**

• Chrome 117+ ✓
• Firefox 71+ ✓
• Safari 16+ ✓
• Edge 117+ ✓

**Verificare cu @supports**

\`\`\`css
@supports (grid-template-rows: subgrid) {
  .card {
    grid-row: span 3;
    grid-template-rows: subgrid;
  }
}

/* Fallback fără subgrid */
.card {
  display: flex;
  flex-direction: column;
}
.card__body { flex: 1; } /* fallback pentru aliniere */
\`\`\``
  },
  {
    lessonContains: 'Subgrid',
    titleContains: 'Subgrid pe Col',
    content: `**Subgrid pe coloane** aliniază conținutul din elemente imbricate la coloanele grid-ului parinte — util pentru form-uri, tabele de date și layout-uri multi-coloană complexe.

**Form cu label-uri aliniate**

\`\`\`css
/* PROBLEMĂ: form fields cu label și input nu se aliniază */
.form { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
.field { display: flex; gap: 8px; } /* independent de grid parinte */

/* SOLUȚIE cu subgrid pe coloane */
.form {
  display: grid;
  grid-template-columns: auto 1fr auto 1fr; /* label | input | label | input */
  gap: 16px 8px;
}

.field {
  display: contents; /* copiii participă direct în grid-ul parinte */
}

/* SAU cu subgrid */
.field {
  grid-column: span 2; /* ocupă 2 coloane */
  display: grid;
  grid-template-columns: subgrid; /* auto | 1fr */
}

.field label { /* auto — se aliniază automat */
  display: flex;
  align-items: center;
  font-weight: 500;
  white-space: nowrap;
}

.field input { /* 1fr — lățimea disponibilă */
  width: 100%;
  padding: 8px 12px;
  border: 1px solid var(--border);
  border-radius: 6px;
}
\`\`\`

**Card layout cu subgrid pe coloane**

\`\`\`css
/* Grid cu coloane definite: imagine | conținut */
.card-list {
  display: grid;
  grid-template-columns: 200px 1fr;
  grid-auto-rows: auto;
  gap: 24px 0;
}

.card {
  grid-column: span 2; /* ocupă ambele coloane */
  display: grid;
  grid-template-columns: subgrid; /* 200px | 1fr */
  border-bottom: 1px solid var(--border);
  padding-bottom: 24px;
}

.card__image {
  /* se plasează automat în coloana 200px */
  aspect-ratio: 1;
  object-fit: cover;
  border-radius: 8px;
}

.card__content {
  /* se plasează în coloana 1fr */
  padding: 0 0 0 24px;
}
\`\`\`

**Nested subgrid**

\`\`\`css
/* Grid-ul bunic */
.page {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 24px;
}

/* Section child cu subgrid */
.section {
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: subgrid; /* moștenește 12 coloane */
}

/* Card nested în section */
.card {
  grid-column: span 4; /* ocupă 4 din cele 12 coloane */
  display: grid;
  grid-template-columns: subgrid; /* moștenește coloanele 4 */
}
\`\`\`

**Alinierea cu named lines în subgrid**

\`\`\`css
.parent {
  display: grid;
  grid-template-columns:
    [content-start] 1fr
    [aside-start] 300px [aside-end content-end];
}

.child {
  grid-column: content-start / content-end;
  display: grid;
  grid-template-columns: subgrid;
}

.child-inner {
  grid-column: aside-start / aside-end; /* referință la named lines din parinte */
}
\`\`\``
  },
  {
    lessonContains: 'Subgrid',
    titleContains: 'Comparatie',
    content: `**Subgrid vs alte soluții** — înainte de subgrid, dezvoltatorii foloseau workaround-uri care au dezavantaje clare față de abordarea nativă.

**Alternativa 1: display: contents**

\`\`\`css
/* display: contents — copiii participă direct în grid-ul bunicului */
.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}

.group {
  display: contents; /* "dispare" și copiii devin copii ai .grid */
}

.group > * {
  /* se plasează în coloanele grid-ului */
}
\`\`\`

**Dezavantaje display: contents:**
- Elementul nu mai primește background, border, padding
- Probleme de accesibilitate (elementul dispare pentru screen readers)
- Nu poți specifica gap individual

**Alternativa 2: Repetare manuală coloane**

\`\`\`css
/* Definești aceleași coloane în parinte și copil */
.parent {
  display: grid;
  grid-template-columns: 200px 1fr 200px;
  gap: 24px;
}

.child {
  grid-column: span 3;
  display: grid;
  grid-template-columns: 200px 1fr 200px; /* repetat manual */
  gap: 24px; /* același gap */
}
\`\`\`

**Dezavantaj**: Dacă schimbi coloanele în parinte, trebuie să le schimbi în TOATE copiii. Frajil și greu de menținut.

**Alternativa 3: JavaScript (ResizeObserver)**

\`\`\`javascript
const observer = new ResizeObserver(entries => {
  entries.forEach(entry => {
    alignChildrenToGrid(entry.target);
  });
});
observer.observe(document.querySelector('.grid'));
\`\`\`

**Dezavantaj**: JS pentru layout = antipattern, lent, complicat.

**Subgrid — soluția nativă**

\`\`\`css
/* O singură definire, propagare automată */
.parent {
  display: grid;
  grid-template-columns: 200px 1fr 200px;
  gap: 24px;
}

.child {
  grid-column: span 3;
  display: grid;
  grid-template-columns: subgrid; /* AUTOMAT din parinte */
  /* gap-ul se moștenește automat */
}

/* Dacă schimb parentul, copilul se actualizează automat */
\`\`\`

**Comparație directă — carduri uniforme**

\`\`\`css
/* Fără subgrid — flexbox trick */
.card { display: flex; flex-direction: column; }
.card__body { flex: 1; }        /* împinge footer jos, dar NU aliniaza între carduri */

/* Cu subgrid — aliniere reală */
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto 1fr auto; /* imagine | body | footer */
  gap: 24px;
}

.card {
  grid-row: span 3;
  display: grid;
  grid-template-rows: subgrid;  /* toate 3 rânduri aliniate */
}
/* Acum .card__footer e la ACELAȘI nivel în toate cardurile */
\`\`\`

**Când să folosești subgrid**

• Card-uri cu structuri multi-rând care trebuie aliniate
• Form-uri cu label-uri și câmpuri
• Layout-uri cu coloane imbricate (dashboard, sidebars)
• Orice situație unde ai nevoie de aliniere între elemente din containere diferite`
  },
  {
    lessonContains: 'Subgrid',
    titleContains: 'Nested',
    content: `**Subgrid și nested grids** — combinarea grid-urilor imbricate cu subgrid permite layout-uri complexe care rămân aliniate pe mai multe niveluri de ierarhie.

**Grid pe trei niveluri**

\`\`\`css
/* Nivel 1: Page grid */
.page {
  display: grid;
  grid-template-columns:
    [full-start] minmax(24px, 1fr)
    [content-start] min(1200px, 100%)
    [content-end] minmax(24px, 1fr)
    [full-end];
  grid-template-rows: auto 1fr auto;
}

/* Nivel 2: Content area cu subgrid */
.content {
  grid-column: content;
  display: grid;
  grid-template-columns: subgrid; /* moștenește coloanele paginii */
}

/* Nivel 3: Cards cu subgrid intern */
.cards-grid {
  grid-column: content-start / content-end;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto 1fr auto;
  gap: 24px;
}

.card {
  grid-row: span 3;
  display: grid;
  grid-template-rows: subgrid;
}
\`\`\`

**Exemplu practic: landing page**

\`\`\`css
.article-grid {
  display: grid;
  grid-template-columns:
    [aside-start] 280px [aside-end main-start] 1fr [main-end];
  grid-template-rows: auto auto 1fr auto;
  gap: 0 32px;
  min-height: 100vh;
}

/* Sidebar cu subgrid */
.sidebar {
  grid-column: aside;
  grid-row: 1 / -1;
  display: grid;
  grid-template-rows: subgrid; /* aliniat cu main content */
  background: var(--bg-card);
  border-right: 1px solid var(--border);
  padding: 24px;
}

/* Main content cu subgrid */
.main {
  grid-column: main;
  display: grid;
  grid-template-rows: subgrid;
  grid-row: 1 / -1;
  padding: 24px;
}
\`\`\`

**Subgrid în componente reutilizabile**

\`\`\`css
/* Componenta Card cu API de subgrid */
.card {
  /* Poate funcționa independent */
  display: grid;
  grid-template-rows: auto 1fr auto;

  /* SAU ca subgrid când e în grid parinte */
}

/* Context: carduri în grid */
.cards-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-template-rows: auto 1fr auto;
}

.cards-container .card {
  grid-row: span 3;
  grid-template-rows: subgrid;
}
\`\`\`

**Debugging subgrid**

\`\`\`css
/* Activează overlay grid în DevTools */
/* Chrome: Elements → Layout → Grid overlays */

/* Sau vizualizare temporară */
.grid-debug * {
  outline: 1px solid rgba(255, 0, 0, 0.3);
}

.grid-debug .grid {
  background: repeating-linear-gradient(
    90deg,
    rgba(59,130,246,0.05) 0px,
    rgba(59,130,246,0.05) calc(100% / 3),
    transparent calc(100% / 3)
  );
}
\`\`\`

**Limitări ale Subgrid**

• Nu poate "sări" un nivel — subgrid moștenește de la **parintele direct**
• Dacă vrei grid de la bunic, trebuie un subgrid la fiecare nivel intermediar
• Nu functionează cu \`display: contents\` pe parinte`
  },

  // L27: Selectori Moderni
  {
    lessonContains: 'Selectori Moderni',
    titleContains: 'Parinte',
    content: `**:has() — selectorul parinte** este cel mai revoluționar selector CSS din ultimii ani. Permite stilizarea unui element în funcție de **ce conține** — ceva ce era imposibil fără JavaScript.

**Cum funcționează :has()**

\`\`\`css
/* Selectează .card DACĂ conține un <img> */
.card:has(img) {
  display: grid;
  grid-template-columns: 200px 1fr;
}

/* Selectează .form-group DACĂ conține un input:invalid */
.form-group:has(input:invalid) {
  border-color: red;
}

/* Selectează section DACĂ conține un h2 */
section:has(h2) {
  padding-top: 48px;
}
\`\`\`

**:has() ca selector relațional**

\`\`\`css
/* Selectează PĂRINTELE bazat pe starea copilului */

/* Input invalid → stilizează label-ul */
.field:has(input:invalid) label {
  color: #ef4444;
  font-weight: 600;
}

/* Card cu badge → adaugă border */
.card:has(.badge) {
  border-top: 3px solid var(--primary);
}

/* Nav item cu link activ → evidențiază */
.nav-item:has(a[aria-current]) {
  background: rgba(59,130,246,0.1);
  border-radius: 8px;
}
\`\`\`

**:has() cu frați (sibling relationships)**

\`\`\`css
/* Schimbă stilul unui element dacă FRATELE lui conține ceva */
/* Elementul A dacă urmează după un B cu o anumită proprietate */
h2:has(+ p.lead) {
  margin-bottom: 0; /* titlul e urmat de un lead paragraph */
}

/* Paragraf după titlu cu implicație vizuală */
h2 + p:has(> strong:first-child) {
  font-size: 1.1em;
  color: var(--text-muted);
}
\`\`\`

**Aplicații interactive cu :has()**

\`\`\`css
/* Checkbox custom — fără JS */
.toggle-container:has(input:checked) .toggle-content {
  display: block;
}

.toggle-container:has(input:checked) .toggle-icon {
  transform: rotate(180deg);
}

/* Dark mode toggle fără JS */
body:has(#dark-toggle:checked) {
  --bg: #0f172a;
  --text: #f1f5f9;
  --bg-card: #1e293b;
}

/* Număr de elemente în grid */
.gallery:has(> :nth-child(4)) {
  grid-template-columns: repeat(2, 1fr); /* >= 4 elemente: 2 coloane */
}
.gallery:has(> :nth-child(7)) {
  grid-template-columns: repeat(3, 1fr); /* >= 7 elemente: 3 coloane */
}
\`\`\`

**:has() cu :not() și alte pseudo-clase**

\`\`\`css
/* Dacă NU conține imagine */
.card:not(:has(img)) {
  background: var(--bg-card);
}

/* Dacă conține un link hover */
.card:has(a:hover) {
  box-shadow: 0 8px 24px rgba(0,0,0,0.15);
}

/* Secțiune cu exact 3 copii */
section:has(> *:nth-child(3)):not(:has(> *:nth-child(4))) {
  grid-template-columns: repeat(3, 1fr);
}
\`\`\`

**Suport și verificare**

\`\`\`css
@supports selector(:has(*)) {
  .card:has(img) { display: grid; }
}
\`\`\`

• Chrome 105+, Firefox 121+, Safari 15.4+
• Utilizare prudentă cu fallback-uri pentru browsere vechi`
  },
  {
    lessonContains: 'Selectori Moderni',
    titleContains: 'Grupare',
    content: `**:is() și :where()** sunt pseudo-clasele de grupare care elimină repetițiile din CSS. Diferența esențială: specificitatea.

**:is() — grupare cu specificitate**

\`\`\`css
/* Fără :is() — 8 reguli separate */
h1, h2, h3, h4, h5, h6 { line-height: 1.2; }
.hero h1, .hero h2, .hero h3 { color: white; }
article h1, article h2, article h3 { margin-top: 2em; }

/* Cu :is() — concis și puternic */
:is(h1, h2, h3, h4, h5, h6) { line-height: 1.2; }
.hero :is(h1, h2, h3) { color: white; }
article :is(h1, h2, h3) { margin-top: 2em; }
\`\`\`

**Specificitatea :is() — preia cel mai specific argument**

\`\`\`css
:is(h1, .title, #main-heading) { color: blue; }
/* Specificitate = (1,0,0) — ID-ul dictează */

:is(h1, .title) { color: blue; }
/* Specificitate = (0,1,0) — clasa dictează */

:is(h1, h2, h3) { color: blue; }
/* Specificitate = (0,0,1) — tag dictează */
\`\`\`

**:where() — grupare cu specificitate zero**

\`\`\`css
/* :where() are specificitate (0,0,0) mereu */
:where(h1, h2, h3) { line-height: 1.2; }

/* Orice regulă cu orice specificitate > 0 poate suprascrie */
.article h1 { line-height: 1.5; } /* câștigă — (0,1,1) > (0,0,0) */

/* Perfect pentru design system — baza ușor de suprascris */
:where(button, [role="button"]) {
  cursor: pointer;
  font-family: inherit;
}
\`\`\`

**Când să folosești :is() vs :where()**

\`\`\`css
/* :is() — când vrei ca specificitatea să conteze */
nav :is(.link, .nav-item) { color: var(--primary); }
/* Câștigă față de regulile cu specificitate mai mică */

/* :where() — pentru layer de bază, reset-uri */
:where(*, *::before, *::after) {
  box-sizing: border-box;
}

:where(p, li, dt, dd, h1, h2, h3, h4, h5, h6) {
  overflow-wrap: break-word;
}
\`\`\`

**Forgiving selector list (liste de selectori iertat)**

\`\`\`css
/* CSS clasic — dacă UN selector e invalid, TOATA regula e ignorata */
h1, .heading, :unknown-selector { color: blue; }
/* ↑ :unknown-selector invalidează toată regula! */

/* :is() și :where() sunt "forgiving" */
:is(h1, .heading, :unknown-selector) { color: blue; }
/* ↑ :unknown-selector e ignorat, h1 și .heading functionează */
\`\`\`

**Combinații practice**

\`\`\`css
/* Reset complet nedestructiv */
:where(ul, ol) { list-style: none; padding: 0; margin: 0; }
:where(img, svg, video) { display: block; max-width: 100%; }
:where(a) { color: inherit; }

/* Stiluri interactive consistente */
:is(a, button, [role="button"], [tabindex]):is(:hover, :focus-visible) {
  outline: 2px solid var(--primary);
  outline-offset: 2px;
}

/* Titluri în secțiuni articole */
:is(article, section, aside) :is(h1, h2, h3) {
  color: var(--text);
  margin-bottom: 0.5em;
}
\`\`\``
  },
  {
    lessonContains: 'Selectori Moderni',
    titleContains: 'Avansat',
    content: `**:not() avansat** în CSS modern acceptă liste de selectori complexe și se combină puternic cu alte pseudo-clase pentru excluderi precise.

**Evoluția :not()**

\`\`\`css
/* CSS3 — accepta doar selector simplu */
a:not(.active) { opacity: 0.7; }

/* CSS Selectors Level 4 — accepta selector list */
a:not(.active, .disabled, [aria-current]) { opacity: 0.7; }

/* Cu specificitate a celui mai specific argument */
:not(.special, #unique) { /* specificitate = ID */ }
\`\`\`

**Aplicații comune**

\`\`\`css
/* Toate elementele EXCEPTÂND primul */
.list-item:not(:first-child) {
  border-top: 1px solid var(--border);
}

/* Toate exceptând ultimul — spațiere între elemente */
.list-item:not(:last-child) {
  margin-bottom: 16px;
}

/* Links care nu sunt butoane */
a:not([class]) {
  color: var(--primary);
  text-decoration: underline;
}

/* Input-uri care nu sunt submit/button/hidden */
input:not([type="submit"], [type="button"], [type="hidden"], [type="radio"], [type="checkbox"]) {
  border: 1px solid var(--border);
  padding: 8px 12px;
  border-radius: 6px;
}
\`\`\`

**:not() cu stări**

\`\`\`css
/* Input care nu are focus și nu e valid */
input:not(:focus):not(:valid) {
  border-color: #ef4444;
}

/* Buton care nu e disabled și nu e loading */
.btn:not(:disabled):not(.loading):hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

/* Card care nu e featured și nu e highlighted */
.card:not(.featured):not(.highlighted) {
  opacity: 0.85;
}
\`\`\`

**:not() cu combinatori**

\`\`\`css
/* Paragrafe care nu sunt direct copiii lui .prose */
p:not(.prose > p) {
  font-size: 0.9rem;
}

/* Links care nu sunt în navigație */
a:not(nav a, .btn) {
  text-decoration: underline;
  text-underline-offset: 3px;
}

/* Imagini care nu sunt decorative */
img:not([alt=""]):not([role="presentation"]) {
  border-radius: 8px;
}
\`\`\`

**:not() cu :has()**

\`\`\`css
/* Card fără imagine — fundal diferit */
.card:not(:has(img)) {
  background: linear-gradient(135deg, var(--bg-card), var(--bg));
  padding-top: 32px;
}

/* Secțiune fără titlu — padding mai mic */
section:not(:has(h1, h2, h3)) {
  padding: 16px;
}

/* Form fără erori — buton activ */
.form:not(:has(:invalid)) .submit-btn {
  background: var(--primary);
  pointer-events: auto;
}
\`\`\`

**Specificitatea în :not()**

\`\`\`css
/* :not() preia specificitatea celui mai specific argument */

:not(p)     { } /* (0,0,0) + specificitate p = (0,0,1) */
:not(.cls)  { } /* (0,0,0) + specificitate .cls = (0,1,0) */
:not(#id)   { } /* (0,0,0) + specificitate #id = (1,0,0) */

/* :not() cu lista — preia cel mai specific */
:not(.cls, #id) { } /* specificitate (1,0,0) — ID câștigă */
\`\`\``
  },
  {
    lessonContains: 'Selectori Moderni',
    titleContains: 'Combinatii',
    content: `**Combinații puternice** ale selectorilor moderni **:has(), :is(), :where(), :not()** permit logică CSS avansată fără JavaScript — validare vizuală, layout condițional și teme dinamice.

**Validare formular CSS pur**

\`\`\`css
/* Camp valid dupa interactiune */
.field:has(input:user-valid) label::after {
  content: " ✓";
  color: #22c55e;
}

/* Câmp invalid după interacțiune */
.field:has(input:user-invalid) {
  --field-accent: #ef4444;
}
.field:has(input:user-invalid) label    { color: var(--field-accent); }
.field:has(input:user-invalid) input    { border-color: var(--field-accent); }
.field:has(input:user-invalid) .hint   { display: block; color: var(--field-accent); }

/* Submit activ doar dacă toate câmpurile sunt valide */
.form:not(:has(:invalid)) .submit {
  background: var(--primary);
  pointer-events: auto;
  opacity: 1;
}
.form:has(:invalid) .submit {
  opacity: 0.5;
  pointer-events: none;
}
\`\`\`

**Layout condițional**

\`\`\`css
/* Grid adaptat la numărul de copii */
.grid { display: grid; }

.grid:has(> :only-child) {
  grid-template-columns: 1fr;
}
.grid:has(> :nth-child(2)):not(:has(> :nth-child(3))) {
  grid-template-columns: 1fr 1fr;
}
.grid:has(> :nth-child(3)) {
  grid-template-columns: repeat(3, 1fr);
}
.grid:has(> :nth-child(5)) {
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
}
\`\`\`

**Navigație cu stare activă**

\`\`\`css
/* Evidențiere link curent */
.nav-item:has(> [aria-current="page"]) {
  background: rgba(59,130,246,0.1);
  border-radius: 8px;
}

.nav-item:has(> [aria-current="page"]) > a {
  color: var(--primary);
  font-weight: 600;
}

/* Submeniu vizibil la hover */
.nav-item:has(.submenu):hover .submenu,
.nav-item:has(.submenu):focus-within .submenu {
  display: block;
  animation: fadeIn 0.2s ease;
}

/* Indicator că există submeniu */
.nav-item:has(.submenu) > a::after {
  content: " ▾";
  font-size: 0.75em;
  opacity: 0.6;
}
\`\`\`

**Stilizare contextual-dependentă**

\`\`\`css
/* Reseturi stilizate cu :where() pentru bază */
:where(article, section) :where(h1, h2, h3) {
  margin-top: 1.5em;
  margin-bottom: 0.5em;
}

/* :is() pentru aplicarea consistentă pe multiple elemente */
:is(.card, .panel, .modal):is(:hover, :focus-within) {
  box-shadow: 0 8px 24px rgba(0,0,0,0.15);
  border-color: var(--primary);
}

/* :not() pentru excluderi precise */
:is(a, button):not(:disabled, [aria-disabled="true"]):hover {
  opacity: 0.85;
}

/* Combinatie complexa - dark theme detectat prin preferinta sistem */
@media (prefers-color-scheme: dark) {
  :is(h1, h2, h3):not(.light-heading) {
    color: var(--text-dark);
  }
}
\`\`\`

**Rezumat — când să folosești fiecare**

• **:has()** — când stilizarea depinde de conținut sau descendenți
• **:is()** — pentru grupare cu specificitate, înlocuiește repetiția
• **:where()** — pentru baze de stiluri ușor de suprascris
• **:not()** — pentru excluderi precise și multiple`
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
