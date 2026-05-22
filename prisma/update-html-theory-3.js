"use strict";
require("dotenv").config({ path: ".env" });
const { PrismaClient } = require("@prisma/client");
const p = new PrismaClient();

const UPDATES = [
  // L21: Structura unei pagini reale
  { lesson: "21. Structura unei pagini reale", title: "Skeleton modern", content: `Un **skeleton modern** pentru o pagină web combină toate elementele HTML5 esențiale: meta tags, SEO, fonturi, CSS, performanță și accesibilitate.

**Template complet pentru orice proiect:**
\`\`\`html
<!DOCTYPE html>
<html lang="ro" data-theme="light">
<head>
  <!-- Charset și viewport — PRIMELE în head -->
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- SEO de bază -->
  <title>Titlu Pagină — Nume Site</title>
  <meta name="description" content="Descriere pagină, max 160 caractere, cu cuvinte cheie.">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="https://devzone.ro/pagina-curenta">

  <!-- Open Graph -->
  <meta property="og:title" content="Titlu Pagină">
  <meta property="og:description" content="Descriere pentru social sharing.">
  <meta property="og:image" content="https://devzone.ro/og-image.jpg">
  <meta property="og:url" content="https://devzone.ro/pagina-curenta">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="DevZone">
  <meta property="og:locale" content="ro_RO">

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Titlu Pagină">
  <meta name="twitter:description" content="Descriere Twitter.">
  <meta name="twitter:image" content="https://devzone.ro/og-image.jpg">

  <!-- Favicon -->
  <link rel="icon" type="image/svg+xml" href="/favicon.svg">
  <link rel="icon" type="image/png" href="/favicon-32x32.png" sizes="32x32">
  <link rel="apple-touch-icon" href="/apple-touch-icon.png">
  <link rel="manifest" href="/site.webmanifest">
  <meta name="theme-color" content="#3498db">

  <!-- Fonturi Google (preconnect pentru performanță) -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap">

  <!-- CSS propriu -->
  <link rel="stylesheet" href="/css/style.css">

  <!-- JavaScript — defer (nu blochează parsarea HTML) -->
  <script src="/js/app.js" defer></script>
</head>
<body>

  <!-- Skip link — PRIMUL element -->
  <a href="#main-content" class="skip-link">Sari la conținut</a>

  <header>
    <a href="/" aria-label="DevZone — Acasă">
      <img src="/logo.svg" alt="DevZone" width="120" height="40">
    </a>
    <nav aria-label="Navigare principală">
      <ul>
        <li><a href="/" aria-current="page">Acasă</a></li>
        <li><a href="/cursuri">Cursuri</a></li>
        <li><a href="/blog">Blog</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
    </nav>
    <button id="theme-toggle" aria-label="Comută tema dark/light">🌙</button>
  </header>

  <main id="main-content">
    <h1>Titlu Principal</h1>
    <!-- Conținut pagină -->
  </main>

  <aside aria-label="Widget-uri suplimentare">
    <!-- Sidebar opțional -->
  </aside>

  <footer>
    <nav aria-label="Navigare footer">
      <a href="/termeni">Termeni</a>
      <a href="/confidentialitate">Confidențialitate</a>
      <a href="/contact">Contact</a>
    </nav>
    <p><small>&copy; <time datetime="2024">2024</time> DevZone. Toate drepturile rezervate.</small></p>
  </footer>

</body>
</html>
\`\`\`

**Checklist skeleton:**
• \`charset\` și \`viewport\` primele în head.
• \`canonical\` — unic per pagină, URL absolut.
• \`defer\` pe script-uri — nu blochează parsarea.
• \`skip-link\` primul element în body.
• \`aria-current="page"\` pe linkul activ din nav.
• \`lang="ro"\` pe html.
• \`id="main-content"\` pe \`<main>\`.` },

  { lesson: "21. Structura unei pagini reale", title: "Section vs article vs div", content: `Alegerea corectă între **\`<section>\`**, **\`<article>\`** și **\`<div>\`** este una din cele mai frecvente dileme HTML semantic.

**Regula de decizie simplă:**
\`\`\`
1. Conținut independent (redistribuibil)?
   → <article>
   Exemple: post blog, tweet, card produs, comentariu, widget meteo

2. Grup tematic cu heading propriu?
   → <section>
   Exemple: capitol, tab pane, zona "Despre noi" dintr-o pagină

3. Nici una → grupare pur structurală/stilistică
   → <div>
   Exemple: container flex/grid, wrapper pentru CSS, grupare pentru JS
\`\`\`

**\`<article>\`** — conținut cu sens standalone:
\`\`\`html
<!-- Blog post -->
<article>
  <header>
    <h2><a href="/post/html-semantic">HTML Semantic Complet</a></h2>
    <p>By <address rel="author">Cristi Usatii</address> —
       <time datetime="2024-01-15">15 ian 2024</time></p>
  </header>
  <p>HTML semantic înseamnă...</p>
  <footer><a href="/post/html-semantic">Citește tot</a></footer>
</article>

<!-- Card produs -->
<article class="product-card">
  <img src="laptop.jpg" alt="Laptop Pro 15">
  <h3>Laptop Pro 15</h3>
  <p>Procesor i7, 16GB RAM, 512 SSD</p>
  <p>3.499 lei</p>
  <button>Adaugă în coș</button>
</article>
\`\`\`

**\`<section>\`** — regiune tematică cu heading:
\`\`\`html
<!-- Secțiuni pagina principală -->
<main>
  <section id="hero">
    <h2>Învață Web Development</h2>
    <p>Cursuri interactive în română.</p>
  </section>

  <section id="features">
    <h2>Ce obții</h2>
    <ul>...</ul>
  </section>

  <section id="testimonials">
    <h2>Ce spun cursanții</h2>
    <!-- lista de article-uri (comentarii) -->
    <article>...</article>
  </section>
</main>
\`\`\`

**\`<div>\`** — grupare fără semantică:
\`\`\`html
<!-- Container flex/grid (fără sens semantic) -->
<div class="grid grid-cols-3 gap-4">
  <article>...</article>
  <article>...</article>
  <article>...</article>
</div>

<!-- Wrapper pentru stilizare -->
<div class="max-w-4xl mx-auto px-4">
  <section>...</section>
</div>
\`\`\`

**Erori frecvente:**
\`\`\`html
<!-- GREȘIT: section fără heading -->
<section class="hero">  <!-- div e mai potrivit -->
  <p>Text de intro</p>
</section>

<!-- GREȘIT: div în loc de article pentru conținut independent -->
<div class="blog-post">  <!-- article e mai potrivit -->
  <h2>Titlu post</h2>
  <p>Conținut post...</p>
</div>

<!-- CORECT -->
<div class="hero">  <!-- container vizual -->
  <section aria-labelledby="hero-title">
    <h2 id="hero-title">Titlu Hero</h2>
    <p>Text.</p>
  </section>
</div>
\`\`\`

• \`<section>\` fără heading → folosește \`<div>\` sau adaugă un heading.
• \`<article>\` în \`<section>\` — valid (lista de posts într-o secțiune).
• \`<section>\` în \`<article>\` — valid (comentariile unui articol).
• \`<div>\` în orice, oricând — dacă nu există element semantic potrivit.` },

  { lesson: "21. Structura unei pagini reale", title: "Defer vs async pe <script>", content: `**\`defer\`** și **\`async\`** controlează cum și când se încarcă scripturile JavaScript fără a bloca parsarea HTML.

**Comportamentul implicit (fără atribute):**
\`\`\`html
<!-- BLOCHEAZĂ parsarea HTML! Browser-ul se oprește, descarcă, execută, continuă -->
<script src="app.js"></script>
\`\`\`

**\`defer\`** — descarcă în paralel, execută DUPĂ parsare:
\`\`\`html
<!-- Descarcă în paralel cu HTML; execută după ce tot DOM-ul e gata -->
<script src="app.js" defer></script>

<!-- Multiple scripts defer: executate în ORDINE -->
<script src="library.js" defer></script>
<script src="app.js" defer></script>  <!-- app.js se execută după library.js -->
\`\`\`

**\`async\`** — descarcă în paralel, execută când e gata (fără ordine):
\`\`\`html
<!-- Descarcă în paralel; execută imediat când e gata (poate bloca parsarea!) -->
<script src="analytics.js" async></script>

<!-- Fără ordine garantată — al doilea poate fi executat înaintea primului -->
<script src="a.js" async></script>
<script src="b.js" async></script>
\`\`\`

**Comparație vizuală:**
\`\`\`
Normal (fără atribut):
HTML |=======| STOP |====download====| EXEC | continuă HTML
                     ^blocked^

Defer:
HTML |===========================================| continuă
     |===download======|            | EXEC (în ordine, după HTML)

Async:
HTML |=======|     |==========| continuă HTML
             |=download=| EXEC (când e gata, poate bloca)
\`\`\`

**Recomandări practice:**
\`\`\`html
<!-- BEST PRACTICE: defer pentru scripturi principale -->
<head>
  <script src="vendor.js" defer></script>
  <script src="app.js" defer></script>
</head>

<!-- async pentru scripturi independente (analytics, ads) -->
<head>
  <script src="https://www.googletagmanager.com/gtag/js" async></script>
</head>

<!-- Module ES — implicit defer -->
<script type="module" src="app.mjs"></script>

<!-- Script inline — nu poate fi defer/async -->
<script>
  // Execuție sincronă — pune-l la finalul body
  document.getElementById('btn').onclick = () => {};
</script>
\`\`\`

**\`type="module"\`** — ES Modules nativ:
\`\`\`html
<!-- Module sunt implicit defer și strict mode -->
<script type="module" src="main.mjs"></script>
<script type="module">
  import { formatDate } from './utils.mjs';
  console.log(formatDate(new Date()));
</script>
\`\`\`

**\`preload\` și \`prefetch\` pentru resurse critice:**
\`\`\`html
<!-- Preload: resursă necesară CURÂND (pagina curentă) -->
<link rel="preload" href="app.js" as="script">
<link rel="preload" href="hero.jpg" as="image">
<link rel="preload" href="font.woff2" as="font" type="font/woff2" crossorigin>

<!-- Prefetch: resursă necesară PROBABIL (pagina următoare) -->
<link rel="prefetch" href="/despre.html">
\`\`\`

• **Regula de aur**: \`defer\` pentru toate scripturile aplicației tale.
• **\`async\`** pentru scripturi complet independente (analytics, chatbot, ads).
• **Scriptele inline** nu pot fi defer/async — mut-le la finalul \`<body>\` sau în \`DOMContentLoaded\`.
• \`type="module"\` implică \`defer\` și \`strict mode\` automat.` },

  // L22: Mini proiect — Pagină personală
  { lesson: "22. Mini proiect — Pagină personală", title: "Specificații proiect", content: `**Mini-proiectul** "Pagină personală" consolidează toate conceptele HTML din modulul anterior într-un document real, bine structurat și accesibil.

**Obiectivele proiectului:**
\`\`\`
✓ Structură semantică completă (header, nav, main, sections, footer)
✓ Meta tags SEO (title, description, canonical, OG)
✓ Accesibilitate (lang, alt, aria-label, skip-link, headings corecte)
✓ Formular de contact (validare HTML5)
✓ Responsive (viewport meta, imagini cu width/height)
✓ Performance (defer, lazy loading)
\`\`\`

**Structura paginii personale:**
\`\`\`
📄 index.html
│
├── <head>
│   ├── Meta charset, viewport
│   ├── Title, description
│   ├── Open Graph tags
│   └── Favicon + CSS link
│
├── <body>
│   ├── Skip link
│   ├── <header>
│   │   ├── Logo/Nume
│   │   └── <nav> cu ancora (#about, #projects, #contact)
│   │
│   ├── <main>
│   │   ├── <section id="hero"> — Introducere
│   │   ├── <section id="about"> — Despre mine
│   │   ├── <section id="skills"> — Abilități
│   │   ├── <section id="projects"> — Proiecte
│   │   │   ├── <article> — Proiect 1
│   │   │   ├── <article> — Proiect 2
│   │   │   └── <article> — Proiect 3
│   │   └── <section id="contact"> — Contact form
│   │
│   └── <footer>
│       ├── Social links
│       └── Copyright
\`\`\`

**Conținut pentru fiecare secțiune:**
\`\`\`
Hero:
  • Fotografie (cu alt descriptiv)
  • Titlu: "Bun venit! Sunt [Nume]"
  • Subtitlu: ocupația ta
  • CTA button: "Contactează-mă"

About:
  • Text scurt (3-5 propoziții despre tine)
  • Educație, experiență

Skills:
  • Liste (ul) cu limbaje/tehnologii cunoscute
  • Opțional: <meter> pentru nivel competență

Projects:
  • Minim 2-3 proiecte (chiar și fictive)
  • Fiecare: titlu, descriere, link (GitHub/Live)
  • Imagine sau screenshot

Contact:
  • <form> cu: name, email, subject, message, submit
  • Validare HTML5 (required, minlength, type)
\`\`\`

**Reguli de respectat:**
• Un singur \`<h1>\` pe pagină (numele tău sau titlul site-ului).
• Heading-urile în ordine logică: h1 → h2 → h3.
• Toate imaginile cu \`alt\` descriptiv.
• Form-ul cu \`<label>\` pentru fiecare câmp.
• Link-urile externe cu \`target="_blank" rel="noopener noreferrer"\`.
• Navighează pagina complet cu Tab — verifici accesibilitatea.

**Livrabile:**
• Un singur fișier \`index.html\` valid (validator.w3.org).
• Minim 80 linii de HTML.
• Cel puțin o imagine, un formular, o listă, un tabel sau dl.` },

  { lesson: "22. Mini proiect — Pagină personală", title: "Pași și extensii", content: `**Ghid pas cu pas** pentru implementarea paginii personale, de la schița inițială la pagina finalizată și validată.

**Pasul 1: Schița și conținutul:**
\`\`\`
Înainte de a scrie HTML, pregătește conținutul:
□ Fotografie personală (sau avatar)
□ Biografie scurtă (3-5 propoziții)
□ Listă de abilități/tehnologii
□ 2-3 proiecte cu descrieri
□ Informații contact (email, LinkedIn, GitHub)
\`\`\`

**Pasul 2: Structura HTML (ordinea de implementare):**
\`\`\`html
<!-- Pas 2a: Skeleton de bază -->
<!DOCTYPE html>
<html lang="ro">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Cristi Usatii — Web Developer</title>
  <meta name="description" content="Portfolio personal Cristi Usatii, web developer din București.">
</head>
<body>
  <header>...</header>
  <main>
    <section id="hero">...</section>
    <section id="about">...</section>
    <section id="projects">...</section>
    <section id="contact">...</section>
  </main>
  <footer>...</footer>
</body>
</html>
\`\`\`

\`\`\`html
<!-- Pas 2b: Navigare cu ancora links -->
<nav aria-label="Navigare principală">
  <ul>
    <li><a href="#hero">Acasă</a></li>
    <li><a href="#about">Despre</a></li>
    <li><a href="#projects">Proiecte</a></li>
    <li><a href="#contact">Contact</a></li>
  </ul>
</nav>
\`\`\`

\`\`\`html
<!-- Pas 2c: Secțiunea de proiecte -->
<section id="projects">
  <h2>Proiectele mele</h2>
  <article>
    <h3>DevZone Platform</h3>
    <img src="devzone-screenshot.jpg" alt="Screenshot DevZone — platformă de cursuri" loading="lazy">
    <p>Platformă interactivă de cursuri web, construită cu Next.js și MongoDB.</p>
    <dl>
      <dt>Tehnologii</dt>
      <dd>Next.js, React, Tailwind CSS, MongoDB</dd>
      <dt>Status</dt>
      <dd>În producție</dd>
    </dl>
    <a href="https://github.com/user/devzone" target="_blank" rel="noopener noreferrer">
      Cod sursă
    </a>
    <a href="https://devzone.ro" target="_blank" rel="noopener noreferrer">
      Demo live
    </a>
  </article>
</section>
\`\`\`

**Pasul 3: Formular de contact:**
\`\`\`html
<form action="/api/contact" method="POST" id="contact-form">
  <fieldset>
    <legend>Trimite-mi un mesaj</legend>
    <label for="name">Nume: <input type="text" id="name" name="name" required minlength="2"></label>
    <label for="email">Email: <input type="email" id="email" name="email" required></label>
    <label for="subject">Subiect: <input type="text" id="subject" name="subject" required></label>
    <label for="message">Mesaj: <textarea id="message" name="message" rows="5" required minlength="20"></textarea></label>
    <button type="submit">Trimite mesajul</button>
  </fieldset>
</form>
\`\`\`

**Pasul 4: Validare și extensii:**
\`\`\`
□ Validare: validator.w3.org — zero erori, zero warning-uri
□ Accesibilitate: WAVE extension — verifică erori
□ Performance: Lighthouse — scor minim 90
□ Extensii opționale:
  + Schema.org Person markup (JSON-LD)
  + Open Graph tags complet
  + Favicon.ico și apple-touch-icon
  + Sectiune educație cu <time>
  + Testimoniale cu <blockquote> și <cite>
  + Skill bars cu <meter>
\`\`\`

• Validarea W3C este **obligatorie** — un HTML valid se afișează consistent în toate browserele.
• Testează pe mobile (Chrome DevTools → Toggle device toolbar).
• Adaugă \`print.css\` pentru varianta de print — o pagină de portfolio imprimată arată profesional.` },

  // L23: Best practices HTML
  { lesson: "23. Best practices HTML", title: "Reguli de aur", content: `**Best practices HTML** sunt convenții și reguli care asigură cod curat, performant, accesibil și ușor de menținut.

**1. Structură semantică corectă:**
\`\`\`html
<!-- Un singur h1 per pagină -->
<h1>Titlul principal — unic și descriptiv</h1>

<!-- Ierarhie heading-uri logică -->
<h2>Secțiune</h2>
  <h3>Subsecțiune</h3>
    <h4>Sub-subsecțiune</h4>

<!-- Elemente semantice în loc de div-uri -->
<header> <nav> <main> <article> <section> <aside> <footer>
\`\`\`

**2. Accesibilitate de bază:**
\`\`\`html
<!-- lang pe html -->
<html lang="ro">

<!-- Alt descriptiv pe imagini -->
<img src="foto.jpg" alt="Peisaj montan cu zăpadă">

<!-- Label pentru fiecare câmp de form -->
<label for="email">Email:</label>
<input type="email" id="email" name="email">

<!-- Focus vizibil -->
<style>:focus-visible { outline: 2px solid #3498db; outline-offset: 2px; }</style>
\`\`\`

**3. Performance:**
\`\`\`html
<!-- defer pe scripturi -->
<script src="app.js" defer></script>

<!-- Dimensiuni explicite pe imagini (previne layout shift) -->
<img src="banner.jpg" alt="Banner" width="1200" height="400">

<!-- Lazy loading pe imagini below the fold -->
<img src="foto.jpg" alt="..." loading="lazy">

<!-- Preload pentru resurse critice -->
<link rel="preload" href="hero.jpg" as="image">
\`\`\`

**4. Cod curat:**
\`\`\`html
<!-- Valori atribut cu ghilimele duble -->
<img src="foto.jpg" alt="Descriere">  <!-- NU: src=foto.jpg -->

<!-- Litere mici pentru tag-uri și atribute -->
<div class="container">  <!-- NU: <DIV CLASS="container"> -->

<!-- Indentare consistentă (2 sau 4 spații) -->
<ul>
  <li>Element 1</li>
  <li>Element 2</li>
</ul>

<!-- Taguri self-closing evitate în HTML5 -->
<br>   <!-- NU: <br/> sau <br /> -->
<img>  <!-- NU: <img/> -->
\`\`\`

**5. SEO:**
\`\`\`html
<title>Pagina - Site | Keyword principal</title>
<meta name="description" content="50-160 caractere cu keyword.">
<link rel="canonical" href="https://site.ro/pagina">
<meta property="og:image" content="https://site.ro/og.jpg">
\`\`\`

**6. Validare:**
\`\`\`
validator.w3.org → zero erori pentru orice pagină publicată
WAVE/axe → zero erori critice de accesibilitate
Lighthouse → minim 90 pentru Performance, Accessibility, Best Practices, SEO
\`\`\`

**Checklist pre-launch:**
• \`<html lang="...">\` — setat corect.
• \`<title>\` — unic, max 60 caractere.
• \`<meta description>\` — unic, 50-160 caractere.
• Toate imaginile cu \`alt\`.
• Formulare cu \`<label>\` pentru fiecare câmp.
• Navigare completă cu Tab (fără capcane de focus).
• \`<link rel="canonical">\` pe fiecare pagină.` },

  { lesson: "23. Best practices HTML", title: "Anti-patterns de evitat", content: `**Anti-pattern-urile HTML** sunt practici comune dar greșite care duc la cod greu de menținut, inaccesibil sau cu probleme de SEO.

**1. Div soup — elemente semantice ignorate:**
\`\`\`html
<!-- GREȘIT -->
<div class="header">
  <div class="logo"><div class="img"><img src="logo.png"></div></div>
  <div class="nav">
    <div class="nav-item"><a href="/">Acasă</a></div>
  </div>
</div>

<!-- CORECT -->
<header>
  <a href="/"><img src="logo.png" alt="DevZone"></a>
  <nav><ul><li><a href="/">Acasă</a></li></ul></nav>
</header>
\`\`\`

**2. Heading-uri alese pentru stil, nu sens:**
\`\`\`html
<!-- GREȘIT: h4 ales că "arată mai mic" -->
<h4>Titlul principal al paginii</h4>

<!-- CORECT: h1 semantic, dimensiune cu CSS -->
<h1 class="text-lg">Titlul principal al paginii</h1>
\`\`\`

**3. Butoane false cu div/span:**
\`\`\`html
<!-- GREȘIT: nu e focusabil, nu activează cu Enter/Space, nu e anunțat de screen readere -->
<div class="btn" onclick="submit()">Trimite</div>
<span onclick="openMenu()">Menu</span>

<!-- CORECT: comportament nativ, accesibil, stilizabil -->
<button onclick="submit()">Trimite</button>
<button onclick="openMenu()" aria-expanded="false">Menu</button>
\`\`\`

**4. Imagini fără alt sau cu alt greșit:**
\`\`\`html
<!-- GREȘIT -->
<img src="banner.jpg">             <!-- fără alt -->
<img src="icon.png" alt="icon">   <!-- alt generic, inutilul -->
<img src="foto.jpg" alt="fotografie cu"> <!-- redundant, screen reader știe că e imagine -->

<!-- CORECT -->
<img src="banner.jpg" alt="Conferința DevZone 2024 — 500 de participanți">
<img src="icon-search.svg" alt="">  <!-- decorativă: alt gol -->
<img src="foto.jpg" alt="Cristi prezentând la conferință">
\`\`\`

**5. Tabele pentru layout:**
\`\`\`html
<!-- GREȘIT: tabel pentru layout (practică din era 2000) -->
<table>
  <tr><td>Sidebar</td><td>Conținut principal</td></tr>
</table>

<!-- CORECT: CSS Flexbox sau Grid -->
<div style="display: flex; gap: 1rem;">
  <aside>Sidebar</aside>
  <main>Conținut principal</main>
</div>
\`\`\`

**6. CSS inline excesiv:**
\`\`\`html
<!-- GREȘIT: stiluri inline greu de menținut și suprascriat -->
<p style="color: red; font-size: 18px; margin-top: 20px; font-weight: bold;">Text</p>

<!-- CORECT: clasa CSS cu regulă în stylesheet -->
<p class="alert-text">Text</p>
/* În CSS: .alert-text { color: red; font-size: 1.125rem; ... } */
\`\`\`

**7. Link-uri externe fără rel="noopener":**
\`\`\`html
<!-- GREȘIT: vulnerabil la reverse tabnapping -->
<a href="https://site-extern.ro" target="_blank">Link</a>

<!-- CORECT -->
<a href="https://site-extern.ro" target="_blank" rel="noopener noreferrer">Link</a>
\`\`\`

**8. Formulare fără label:**
\`\`\`html
<!-- GREȘIT: placeholder nu înlocuiește label -->
<input type="email" placeholder="Adresă email">

<!-- CORECT -->
<label for="email">Adresă email:</label>
<input type="email" id="email" placeholder="user@exemplu.ro">
\`\`\`

• Reverse tabnapping: pagina deschisă cu \`target="_blank"\` poate redirecționa tab-ul original.
• Placeholder-urile dispar la scriere — utilizatorii uită ce câmp completează.
• \`outline: none\` fără alternativă = inaccesibil pentru navigare cu tastatura.` },

  { lesson: "23. Best practices HTML", title: "Performance HTML", content: `**Performance HTML** înseamnă optimizări la nivel de markup care reduc timpul de încărcare și îmbunătățesc Core Web Vitals.

**1. Ordinea corectă în \`<head>\`:**
\`\`\`html
<head>
  <!-- 1. Charset (cât mai devreme) -->
  <meta charset="UTF-8">
  <!-- 2. Viewport (înainte de orice render) -->
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <!-- 3. Titlu și meta -->
  <title>...</title>
  <meta name="description" content="...">
  <!-- 4. Preconnect pentru domenii terțe -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <!-- 5. CSS critic sau preload -->
  <link rel="stylesheet" href="critical.css">
  <link rel="preload" href="hero.jpg" as="image">
  <!-- 6. Non-critical CSS deferred -->
  <link rel="stylesheet" href="non-critical.css" media="print" onload="this.media='all'">
  <!-- 7. Scripts cu defer -->
  <script src="app.js" defer></script>
</head>
\`\`\`

**2. Imagini optimizate:**
\`\`\`html
<!-- Dimensiuni explicite (previne CLS — Cumulative Layout Shift) -->
<img src="hero.jpg" alt="Hero" width="1200" height="600">

<!-- Format modern cu fallback -->
<picture>
  <source srcset="hero.avif" type="image/avif">
  <source srcset="hero.webp" type="image/webp">
  <img src="hero.jpg" alt="Hero" width="1200" height="600" loading="eager">
</picture>

<!-- Lazy loading pentru imagini below-the-fold -->
<img src="articol.jpg" alt="..." loading="lazy" decoding="async">

<!-- Responsive images -->
<img
  srcset="foto-400.webp 400w, foto-800.webp 800w, foto-1600.webp 1600w"
  sizes="(max-width: 600px) 400px, (max-width: 1200px) 800px, 1600px"
  src="foto-800.webp" alt="...">
\`\`\`

**3. Resource hints:**
\`\`\`html
<!-- preconnect: stabilește conexiune TCP+TLS anticipat -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://api.devzone.ro">

<!-- preload: descarcă resurse critice imediat -->
<link rel="preload" href="font.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="critical.js" as="script">

<!-- prefetch: descarcă resurse probabile (navigare viitoare) -->
<link rel="prefetch" href="/cursuri/css">

<!-- dns-prefetch: rezolvare DNS anticipată -->
<link rel="dns-prefetch" href="https://cdn.example.com">
\`\`\`

**4. Critical CSS inline:**
\`\`\`html
<!-- CSS pentru above-the-fold inline — elimină render blocking -->
<style>
  /* Doar stiluri pentru conținut vizibil inițial */
  body { margin: 0; font-family: Inter, sans-serif; }
  header { background: #2c3e50; padding: 1rem; }
  .hero { min-height: 100vh; display: flex; align-items: center; }
</style>
<!-- Rest of CSS non-blocking -->
<link rel="stylesheet" href="styles.css" media="print" onload="this.media='all'">
\`\`\`

**5. Core Web Vitals și HTML:**
\`\`\`
LCP (Largest Contentful Paint — timp de încărcare):
  → preload imaginea hero
  → evita lazy loading pe imaginile above-the-fold
  → dimensiuni explicite pe img

CLS (Cumulative Layout Shift — stabilitate vizuală):
  → width + height pe toate img, video, iframe
  → rezervă spațiu pentru ads: min-height pe container
  → evita inserția de conținut deasupra celui existent

FID/INP (Interactivitate):
  → defer/async pe scripts
  → evita scripts lungi în head
\`\`\`

• **First Contentful Paint (FCP)** — inline CSS critic elimina render-blocking.
• **Largest Contentful Paint (LCP)** — preload imaginea hero, sau fontul heading-ului principal.
• Testare Lighthouse: \`Ctrl+Shift+J\` → Lighthouse → Analyze page load.
• Imaginile sunt cel mai frecvent bottleneck — optimizează-le cu Squoosh (squoosh.app).` },

  // L24: Validare W3C și debug HTML
  { lesson: "24. Validare W3C și debug HTML", title: "Validatorul W3C", content: `**W3C Markup Validator** (validator.w3.org) verifică dacă HTML-ul respectă standardele. Un HTML valid se afișează consistent în toate browserele și e mai ușor de indexat.

**Cum validezi:**
\`\`\`
1. validator.w3.org → introduci URL sau paste de cod
2. Rezultate:
   - Errors (roșu) → probleme reale ce afectează randarea/semantica
   - Warnings (galben) → sugestii, nu blocante
   - Info (albastru) → informații despre parsing
\`\`\`

**Erori frecvente și cum le repari:**

**Eroare: Element X nu e permis ca copil al Y:**
\`\`\`html
<!-- GREȘIT -->
<ul>
  <div class="item"><li>Element</li></div>  <!-- div direct în ul e invalid! -->
</ul>

<!-- CORECT -->
<ul>
  <li><div class="item">Element</div></li>
</ul>
\`\`\`

**Eroare: Element X nu poate fi imbricate în Y:**
\`\`\`html
<!-- GREȘIT: <a> în <a> -->
<a href="/pagina">
  Text <a href="/alt">link imbricate</a> mai mult text
</a>

<!-- CORECT: restructurare -->
<a href="/pagina">Text</a> <a href="/alt">link separat</a>
\`\`\`

**Eroare: Atribut X nerecunoscut:**
\`\`\`html
<!-- GREȘIT: atribut inexistent -->
<img src="foto.jpg" alt="Foto" align="center">  <!-- align depășit -->
<table border="1">  <!-- border depășit, folosește CSS -->

<!-- CORECT -->
<img src="foto.jpg" alt="Foto" style="display: block; margin: auto;">
<table style="border: 1px solid #ddd;">
\`\`\`

**Eroare: Duplicate id:**
\`\`\`html
<!-- GREȘIT: id trebuie să fie unic pe pagină -->
<div id="card">Card 1</div>
<div id="card">Card 2</div>  <!-- Duplicate! -->

<!-- CORECT: class pentru elemente multiple -->
<div class="card" id="card-1">Card 1</div>
<div class="card" id="card-2">Card 2</div>
\`\`\`

**Eroare: Element necunoscut (typo):**
\`\`\`html
<!-- GREȘIT -->
<beutton type="submit">Trimite</beutton>  <!-- typo: beutton în loc de button -->

<!-- CORECT -->
<button type="submit">Trimite</button>
\`\`\`

**Validare automată în editor (VS Code):**
\`\`\`
Extensii recomandate:
  - HTMLHint → highlighting erori în timp real
  - W3C Web Validator → validare la save
  - axe Accessibility Linter → erori accesibilitate
\`\`\`

**Validare în CI/CD:**
\`\`\`bash
# html-validate (npm package)
npm install -g html-validate
html-validate index.html
html-validate "dist/**/*.html"
\`\`\`

• HTML invalid poate duce la comportament diferit în browsere (Edge, Chrome, Firefox, Safari).
• **Nu** toate warning-urile W3C sunt probleme reale — citește descrierea fiecăruia.
• Obiectiv: zero erori W3C pentru orice pagină publicată.
• validator.w3.org acceptă și upload de fișier sau paste direct de cod.` },

  { lesson: "24. Validare W3C și debug HTML", title: "DevTools — debug DOM", content: `**Browser DevTools** (F12) este cel mai puternic tool pentru inspectarea, editarea și debug-ul HTML-ului în timp real.

**Panoul Elements (Inspector):**
\`\`\`
Deschidere:
  F12 sau Ctrl+Shift+I → tabul Elements
  Click dreapta pe element → Inspect

Navigare:
  ▶ triunghi → expandează/colapsează nod
  Click pe element → selectare
  Ctrl+F → caută în DOM

Taste utile:
  H → ascunde/arată elementul (adaugă visibility: hidden)
  Delete → șterge elementul din DOM
  F2 sau dublu-click → editează text direct
  Ctrl+Z → undo modificări
  Drag → mută elemente în DOM
\`\`\`

**Editare HTML live:**
\`\`\`
Double-click pe tag → editează tag-ul
Double-click pe atribut → editează atributul
Double-click pe valoare → editează valoarea
Right-click pe nod → Edit as HTML (editare liberă)

Exemplu — schimbă conținut text live:
  1. Selectează <h1>
  2. Double-click pe text → schimbă titlul
  3. Enter → confirmi

Exemplu — adaugă clasă live:
  1. Selectează element
  2. Click pe clasa → editezi
  3. Adaugă .active sau .hidden
\`\`\`

**Inspect computed styles:**
\`\`\`
Panel Elements → Styles (dreapta)
  → Vazi ce CSS se aplică și de unde
  → Toggle proprietăți (checkbox)

Computed tab:
  → Valorile finale calculate
  → Clic pe proprietate → mergi la sursa CSS

Box model (vizual):
  → Margin, border, padding, content vizuale
  → Click pentru editare directă
\`\`\`

**JavaScript Console:**
\`\`\`javascript
// Accesezi elementul selectat în Elements
$0                         // elementul selectat curent
$0.textContent = 'Nou'    // modifică conținut
$0.style.color = 'red'    // aplică stil

// Selectare din console
document.querySelector('h1')
document.querySelectorAll('.card').length

// Simulare events
document.querySelector('button').click()
document.querySelector('input').focus()
\`\`\`

**Device Toolbar (responsive testing):**
\`\`\`
Ctrl+Shift+M sau icoana device din toolbar

Funcții:
  - Selectează dispozitiv (iPhone 14, Pixel 7, etc.)
  - Dimensiune custom
  - Rotire
  - Throttling rețea (3G, offline)
  - DPR (device pixel ratio)
\`\`\`

**Accesibilitate în DevTools:**
\`\`\`
Elements → tab Accessibility (lângă Styles/Computed)
  → Accessibility tree: cum vede screen reader-ul pagina
  → ARIA properties: ce atribute ARIA sunt active
  → Role, name, state pentru fiecare element

Lighthouse → Accessibility score → Issues detaliate
\`\`\`

• **\$0** în console = ultimul element selectat în Elements — scurtătură utilă pentru testare.
• **Edit as HTML** pe nod → poți adăuga blocuri mari de HTML rapid.
• **Forțare stări** CSS: Elements → Styles → :hov → toggle :hover, :focus, :active, :visited.
• **Screenshots**: Ctrl+Shift+P → "Capture screenshot" sau "Capture full size screenshot".` },

  { lesson: "24. Validare W3C și debug HTML", title: "Tools utile", content: `Ecosistemul de tools pentru HTML acoperă validare, accesibilitate, performanță și productivitate în editor.

**Validare și audit:**
\`\`\`
validator.w3.org    → Validare HTML standard W3C
jigsaw.w3.org       → Validare CSS W3C
wave.webaim.org     → Audit accesibilitate vizual
axe DevTools        → Extensie Chrome/Firefox, audit WCAG
Lighthouse          → Built-in Chrome DevTools (Perf+A11y+SEO+PWA)
html-validate (npm) → Validare în linia de comandă / CI
\`\`\`

**Performanță:**
\`\`\`
PageSpeed Insights  → Google PSI: Core Web Vitals + sugestii
WebPageTest         → Waterfall grafic complet, multiple locații
GTmetrix            → Rapoarte detaliate + video
web.dev/measure     → Audit Google cu recomandări
Squoosh (squoosh.app) → Optimizare imagini browser-based
svgomg (jakearchibald.github.io/svgomg) → Optimizare SVG
\`\`\`

**SEO și Social:**
\`\`\`
Google Search Console → date reale indexare, Core Web Vitals
developers.facebook.com/tools/debug → Facebook OG debugger
cards-dev.twitter.com/validator     → Twitter Card validator
linkedin.com/post-inspector         → LinkedIn preview
search.google.com/test/rich-results → Schema.org validator
\`\`\`

**Extensii browser esențiale:**
\`\`\`
axe DevTools (Chrome/Firefox)    → audit WCAG automat
WAVE Evaluation Tool             → vizualizare accesibilitate
ColorZilla                       → eye-dropper și color picker
Wappalyzer                       → detectează tehnologiile site-ului
headingsMap                      → vizualizare ierarhie headings
Screen Reader (NVDA/VoiceOver)   → testare reală screen reader
\`\`\`

**VS Code extensii pentru HTML:**
\`\`\`
Auto Rename Tag          → redenumești tagul de deschidere, se redenumește și cel de închidere
HTMLHint                 → validare inline în editor
IntelliSense for CSS class → autocomplete pentru class="..."
Prettier                 → formatare HTML automată
Live Server              → server local cu auto-reload
Emmet (built-in)         → snippets rapide: ul>li*5 → expandează la 5 <li>
\`\`\`

**Emmet shortcuts esențiale:**
\`\`\`
!              → skeleton HTML5 complet
ul>li*5        → ul cu 5 li
div.container  → div class="container"
#header        → div id="header"
a[href="#"]    → a cu href="#"
img[src="" alt=""]  → img cu src și alt
form:post      → form cu method="post"
input:email    → input type="email"
p{Text implicit} → p cu text
h$*3           → h1, h2, h3
\`\`\`

**Accessibility testing workflow:**
\`\`\`
1. Validare W3C → zero erori HTML
2. axe DevTools → zero Critical violations
3. Keyboard navigation → Tab complet fără capcane
4. NVDA + Firefox → test real screen reader (Windows)
5. VoiceOver + Safari → test real (Mac/iOS)
6. Lighthouse → Accessibility score minim 90
\`\`\`

• **WAVE** extensia colorează vizual erorile de accesibilitate direct pe pagină.
• **headingsMap** arată ierarhia heading-urilor ca un outline — util pentru verificarea structurii.
• **Squoosh** poate converti imagini la WebP/AVIF în browser fără a instala nimic.
• **Emmet** vine built-in în VS Code — tastezi prescurtarea și apesi Tab pentru expandare.` },

  // L25: Mini proiect — Pagină de blog
  { lesson: "25. Mini proiect — Pagină de blog", title: "Structura unui blog post", content: `Un **blog post** are o structură semantică bogată: metadata articol, conținut structurat cu headings, figuri, citate și footer cu tags/autor.

**Structura completă a unui articol:**
\`\`\`html
<article class="blog-post">

  <!-- Header articol cu metadata -->
  <header>
    <div class="post-meta">
      <span class="category"><a href="/categorie/html">HTML</a></span>
      <time datetime="2024-01-15" class="post-date">15 ianuarie 2024</time>
      <span class="read-time">
        <svg aria-hidden="true">...</svg>
        5 min citire
      </span>
    </div>

    <h1>Ghid Complet HTML5 Semantic — De la Zero la Expert</h1>

    <p class="post-excerpt">
      Descoperă cum să structurezi corect paginile web folosind elementele
      semantice HTML5. Ghid practic cu exemple reale și best practices.
    </p>

    <address class="author-info">
      <img src="/avatare/cristi.jpg" alt="Cristi Usatii" width="48" height="48">
      <div>
        <a href="/autori/cristi" rel="author">Cristi Usatii</a>
        <span>Web Developer · DevZone</span>
      </div>
    </address>
  </header>

  <!-- Imagine principală -->
  <figure class="post-hero">
    <img src="semantic-html-banner.jpg"
      alt="Diagramă comparând HTML semantic cu div soup"
      width="1200" height="630"
      loading="eager">
    <figcaption>
      Fig. 1: Structura semantică vs. div soup — diferența în codul sursă.
    </figcaption>
  </figure>

  <!-- Cuprins -->
  <nav aria-label="Cuprins articol" class="table-of-contents">
    <h2>Cuprins</h2>
    <ol>
      <li><a href="#ce-este">Ce este HTML semantic?</a></li>
      <li><a href="#elemente">Elementele principale</a></li>
      <li><a href="#exemple">Exemple practice</a></li>
    </ol>
  </nav>

  <!-- Corp articol -->
  <div class="post-content">
    <section id="ce-este" aria-labelledby="heading-ce-este">
      <h2 id="heading-ce-este">Ce este HTML semantic?</h2>
      <p>HTML semantic înseamnă folosirea tag-urilor care descriu
      <strong>sensul conținutului</strong>, nu doar aspectul vizual.</p>

      <blockquote>
        <p>Semantica HTML este fundația accesibilității și SEO-ului.</p>
        <footer>— <cite>Web Accessibility Initiative (WAI)</cite></footer>
      </blockquote>
    </section>

    <section id="elemente" aria-labelledby="heading-elemente">
      <h2 id="heading-elemente">Elementele principale</h2>
      <dl>
        <dt><code>&lt;header&gt;</code></dt>
        <dd>Antetul paginii sau al unui articol</dd>
        <dt><code>&lt;main&gt;</code></dt>
        <dd>Conținutul principal al paginii</dd>
        <dt><code>&lt;article&gt;</code></dt>
        <dd>Conținut independent și redistribuibil</dd>
      </dl>
    </section>
  </div>

  <!-- Footer articol -->
  <footer class="post-footer">
    <div class="post-tags">
      <strong>Tag-uri:</strong>
      <a href="/tag/html" rel="tag">HTML</a>
      <a href="/tag/semantic" rel="tag">Semantic</a>
      <a href="/tag/accesibilitate" rel="tag">Accesibilitate</a>
    </div>

    <div class="post-share">
      <a href="https://twitter.com/share?url=..." rel="noopener noreferrer" target="_blank">Twitter</a>
      <a href="https://linkedin.com/shareArticle?url=..." rel="noopener noreferrer" target="_blank">LinkedIn</a>
    </div>
  </footer>

</article>
\`\`\`

**Schema.org pentru blog post (JSON-LD):**
\`\`\`html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "Ghid Complet HTML5 Semantic",
  "image": "https://devzone.ro/og/html-semantic.jpg",
  "datePublished": "2024-01-15",
  "author": { "@type": "Person", "name": "Cristi Usatii" },
  "publisher": { "@type": "Organization", "name": "DevZone" }
}
</script>
\`\`\`

• \`<address rel="author">\` indică că adresa aparține autorului articolului (nu contact general).
• \`<time datetime="2024-01-15">\` este mașinabil — motoarele de căutare recunosc data.
• \`rel="tag"\` pe linkurile de tag-uri — semnalizează relația cu pagina de tag.
• Cuprinsul cu \`<nav>\` și \`<ol>\` e indexat de Google și apare în snippet-uri.` },

  { lesson: "25. Mini proiect — Pagină de blog", title: "Lista de articole (homepage)", content: `**Homepage-ul unui blog** listează articolele cu preview — imagine, titlu, excerpt, metadata și link "citește mai mult".

**Structura listei de articole:**
\`\`\`html
<main>
  <!-- Header pagina blog -->
  <header class="blog-header">
    <h1>Blog DevZone</h1>
    <p>Articole despre web development în română — HTML, CSS, JavaScript, React.</p>
  </header>

  <!-- Filtrare categorii -->
  <nav aria-label="Filtrare categorii">
    <ul class="category-filter">
      <li><a href="/blog" aria-current="page">Toate</a></li>
      <li><a href="/blog/html">HTML</a></li>
      <li><a href="/blog/css">CSS</a></li>
      <li><a href="/blog/javascript">JavaScript</a></li>
    </ul>
  </nav>

  <!-- Lista de articole -->
  <section aria-label="Lista articole">
    <h2 class="sr-only">Articole recente</h2>

    <!-- Card articol -->
    <article class="article-card">
      <a href="/blog/html-semantic" class="card-link" tabindex="-1" aria-hidden="true">
        <img src="/thumbnails/html-semantic.jpg"
          alt=""
          width="640" height="360"
          loading="lazy">
      </a>
      <div class="card-content">
        <div class="card-meta">
          <a href="/categorie/html" class="category-tag">HTML</a>
          <time datetime="2024-01-15">15 ian 2024</time>
          <span class="read-time">5 min</span>
        </div>
        <h2 class="card-title">
          <a href="/blog/html-semantic">Ghid Complet HTML5 Semantic</a>
        </h2>
        <p class="card-excerpt">
          Descoperă cum să structurezi corect paginile web folosind elementele
          semantice HTML5. Ghid practic cu exemple reale...
        </p>
        <footer class="card-footer">
          <address class="author-mini">
            <img src="/avatare/cristi.jpg" alt="" width="24" height="24">
            <a href="/autori/cristi" rel="author">Cristi Usatii</a>
          </address>
          <a href="/blog/html-semantic" class="read-more">
            Citește articolul
            <span class="sr-only"> despre HTML5 Semantic</span>
          </a>
        </footer>
      </div>
    </article>

    <!-- Repetă pentru fiecare articol -->
    <article class="article-card featured">...</article>
    <article class="article-card">...</article>
  </section>

  <!-- Paginare -->
  <nav aria-label="Paginare blog">
    <a href="/blog?page=1" aria-label="Pagina precedentă">&larr; Înapoi</a>
    <ol class="pagination">
      <li><a href="/blog?page=1" aria-current="page">1</a></li>
      <li><a href="/blog?page=2">2</a></li>
      <li><a href="/blog?page=3">3</a></li>
    </ol>
    <a href="/blog?page=3" aria-label="Pagina următoare">Înainte &rarr;</a>
  </nav>
</main>
\`\`\`

**Truc UX: card link complet fără nested links problematice:**
\`\`\`html
<!-- Toată suprafața cardului e clicabilă, dar accesibil -->
<article class="card" style="position: relative;">
  <img src="thumb.jpg" alt="">
  <h2><a href="/articol" class="card-link">Titlu articol</a></h2>
  <p>Excerpt...</p>
  <!-- ::after pe link acoperă tot cardul -->
</article>
\`\`\`
\`\`\`css
.card-link::after {
  content: '';
  position: absolute;
  inset: 0;  /* top: 0; right: 0; bottom: 0; left: 0 */
}
\`\`\`

• \`aria-current="page"\` pe linkul paginii active din paginare și filtre.
• Imaginile din lista de articole cu \`loading="lazy"\` — accelerează LCP.
• \`class="sr-only"\` pe textele invizibile adăugă context accesibil fără a afecta design-ul.
• Paginare cu \`<ol>\` — numerele sunt semantice și indicate pentru accesibilitate.` },

  { lesson: "25. Mini proiect — Pagină de blog", title: "Comentarii și interacțiuni", content: `Secțiunea de **comentarii** combină multiple tehnici HTML: listare semantică, formulare accesibile și interactivitate nativă.

**Structura secțiunii de comentarii:**
\`\`\`html
<section id="comments" aria-labelledby="comments-heading">
  <h2 id="comments-heading">Comentarii (12)</h2>

  <!-- Lista de comentarii -->
  <ol class="comments-list" reversed>

    <!-- Comentariu principal -->
    <li id="comment-15">
      <article class="comment">
        <header class="comment-header">
          <img src="/avatare/ion.jpg" alt="" width="48" height="48">
          <div>
            <address rel="author">
              <a href="https://ion-dev.ro" rel="noopener noreferrer" target="_blank">
                Ion Popescu
              </a>
            </address>
            <time datetime="2024-01-16T14:30" title="16 ianuarie 2024, 14:30">
              Acum 2 ore
            </time>
          </div>
          <a href="#comment-15" class="comment-link" aria-label="Link direct la comentariul lui Ion Popescu">
            #15
          </a>
        </header>

        <div class="comment-body">
          <p>Excelent articol! Am înțeles în sfărșit diferența dintre
          <code>&lt;article&gt;</code> și <code>&lt;section&gt;</code>.
          Aș fi curios să elaborezi mai mult pe tema accesibilității.</p>
        </div>

        <footer class="comment-actions">
          <button type="button" aria-label="Îți place comentariul lui Ion (3 like-uri)">
            ♥ 3
          </button>
          <button type="button" onclick="replyTo('comment-15', 'Ion')">
            Răspunde
          </button>
          <a href="#comment-form">Raportează</a>
        </footer>

        <!-- Răspunsuri la comentariu -->
        <ol class="comment-replies">
          <li id="comment-16">
            <article class="comment reply">
              <header>
                <address rel="author">Cristi Usatii</address>
                <time datetime="2024-01-16T15:00">Acum 1 oră</time>
                <span class="badge">Autor</span>
              </header>
              <p>Bună idee! Voi scrie un articol dedicat ARIA săptămâna viitoare.</p>
            </article>
          </li>
        </ol>
      </article>
    </li>

  </ol>

  <!-- Formular adăugare comentariu -->
  <section id="comment-form" aria-labelledby="form-heading">
    <h3 id="form-heading">Lasă un comentariu</h3>

    <p>Câmpurile marcate cu <abbr title="obligatoriu">*</abbr> sunt obligatorii.</p>

    <form action="/api/comments" method="POST">
      <input type="hidden" name="article-id" value="html-semantic-2024">
      <input type="hidden" name="reply-to" id="reply-to-field" value="">

      <div id="reply-indicator" hidden>
        Răspunzi lui <span id="reply-to-name"></span>
        <button type="button" onclick="cancelReply()">✕ Anulează</button>
      </div>

      <label for="comment-name">
        Nume <abbr title="obligatoriu">*</abbr>
      </label>
      <input type="text" id="comment-name" name="name"
        required minlength="2" maxlength="100"
        autocomplete="name">

      <label for="comment-email">
        Email <abbr title="obligatoriu">*</abbr>
        <small>(nu va fi publicat)</small>
      </label>
      <input type="email" id="comment-email" name="email"
        required autocomplete="email">

      <label for="comment-website">Site web (opțional)</label>
      <input type="url" id="comment-website" name="website"
        placeholder="https://...">

      <label for="comment-text">
        Comentariu <abbr title="obligatoriu">*</abbr>
      </label>
      <textarea id="comment-text" name="comment"
        required minlength="10" maxlength="2000"
        rows="6"
        placeholder="Scrie comentariul tău..."
        aria-describedby="comment-rules"></textarea>
      <p id="comment-rules" class="field-hint">
        Reguli: fii respectuos, nu spam, fără linkuri promoționale.
      </p>

      <label>
        <input type="checkbox" name="subscribe" value="1">
        Notifică-mă la răspunsuri noi (via email)
      </label>

      <button type="submit">Postează comentariul</button>
    </form>
  </section>
</section>
\`\`\`

\`\`\`javascript
function replyTo(commentId, authorName) {
  document.getElementById('reply-to-field').value = commentId;
  document.getElementById('reply-to-name').textContent = authorName;
  document.getElementById('reply-indicator').hidden = false;
  document.getElementById('comment-text').focus();
}
function cancelReply() {
  document.getElementById('reply-to-field').value = '';
  document.getElementById('reply-indicator').hidden = true;
}
\`\`\`

• Comentariile imbricate folosesc \`<ol>\` pentru ordine (cronologică sau by score).
• \`reversed\` pe \`<ol>\` — comentariile noi apar cu numere mari (15, 14, 13...).
• \`<address rel="author">\` în fiecare comentariu — autor comentariu, nu al articolului.
• \`hidden\` pe reply-indicator — mai semantic decât \`display: none\` inline.` },

  // L26: Web Components
  { lesson: "26. Web Components — Custom Elements și Shadow DOM", title: "Lifecycle Callbacks și Atribute Observate", content: `**Lifecycle callbacks** sunt metode speciale apelate de browser în momente cheie ale ciclului de viață al unui Custom Element.

**Cele 4 lifecycle callbacks:**
\`\`\`javascript
class MyElement extends HTMLElement {
  static get observedAttributes() {
    // Declară ce atribute declanșează attributeChangedCallback
    return ['color', 'size', 'disabled'];
  }

  constructor() {
    super();
    // NU accesa DOM-ul sau atributele ÎNCĂ — prea devreme
    // Creează Shadow DOM, inițializează variabile
    this.attachShadow({ mode: 'open' });
    this._initialized = false;
  }

  connectedCallback() {
    // Elementul a fost adăugat în DOM
    // ACUM poți accesa atributele și DOM-ul
    if (!this._initialized) {
      this.render();
      this._initialized = true;
    }
    console.log('Conectat la DOM:', this.isConnected); // true
  }

  disconnectedCallback() {
    // Elementul a fost scos din DOM
    // Curăță event listeners, timere, subscripții
    this._cleanup();
    console.log('Deconectat');
  }

  adoptedCallback() {
    // Elementul a fost mutat într-un alt document (rar)
    console.log('Adoptat în:', document.URL);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    // Un atribut din observedAttributes s-a schimbat
    if (oldValue === newValue) return; // fără schimbare reală

    switch(name) {
      case 'color':
        this._color = newValue;
        this._updateColor();
        break;
      case 'size':
        this._size = newValue || 'medium';
        this._updateSize();
        break;
      case 'disabled':
        this._updateDisabled(newValue !== null);
        break;
    }
    console.log(\`Atribut "\${name}": "\${oldValue}" → "\${newValue}"\`);
  }
}
\`\`\`

**Exemplu complet — Toggle Switch:**
\`\`\`javascript
class ToggleSwitch extends HTMLElement {
  static get observedAttributes() { return ['checked', 'label', 'disabled']; }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = \`
      <style>
        :host { display: inline-flex; align-items: center; gap: 8px; cursor: pointer; }
        :host([disabled]) { opacity: 0.5; cursor: not-allowed; pointer-events: none; }
        .track {
          width: 44px; height: 24px; background: #ccc;
          border-radius: 12px; position: relative; transition: background 0.2s;
        }
        .thumb {
          width: 20px; height: 20px; background: white;
          border-radius: 50%; position: absolute; top: 2px; left: 2px;
          transition: transform 0.2s; box-shadow: 0 1px 3px rgba(0,0,0,0.3);
        }
        :host([checked]) .track { background: #3498db; }
        :host([checked]) .thumb { transform: translateX(20px); }
      </style>
      <div class="track" role="switch" tabindex="0"
        aria-checked="\${this.hasAttribute('checked')}"
        aria-label="\${this.getAttribute('label') || 'Toggle'}">
        <div class="thumb"></div>
      </div>
      <span><slot>\${this.getAttribute('label') || ''}</slot></span>
    \`;

    const track = this.shadowRoot.querySelector('.track');
    track.addEventListener('click', () => this._toggle());
    track.addEventListener('keydown', (e) => {
      if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); this._toggle(); }
    });
  }

  _toggle() {
    if (this.hasAttribute('disabled')) return;
    this.toggleAttribute('checked');
    this.shadowRoot.querySelector('.track').setAttribute('aria-checked', this.hasAttribute('checked'));
    this.dispatchEvent(new CustomEvent('change', {
      detail: { checked: this.hasAttribute('checked') },
      bubbles: true
    }));
  }

  attributeChangedCallback(name, old, val) {
    if (!this.shadowRoot.innerHTML) return;
    if (name === 'checked') {
      this.shadowRoot.querySelector('.track')?.setAttribute('aria-checked', val !== null);
    }
  }
}

customElements.define('toggle-switch', ToggleSwitch);
\`\`\`

\`\`\`html
<toggle-switch label="Dark mode" checked></toggle-switch>
<toggle-switch label="Notificări"></toggle-switch>
\`\`\`

• **Ordinea apelării**: \`constructor\` → \`attributeChangedCallback\` → \`connectedCallback\`.
• \`observedAttributes\` returnează un array static — nu poate fi schimbat dinamic.
• \`attributeChangedCallback\` e apelat chiar dacă elementul nu e în DOM (atribut setat în HTML).
• Curăță **mereu** event listeners în \`disconnectedCallback\` — previi memory leaks.` },

  { lesson: "26. Web Components — Custom Elements și Shadow DOM", title: "HTML Templates și ES Modules", content: `**HTML Templates** combinate cu **ES Modules** permit crearea de Web Components modulare, reutilizabile și ușor de distribuit.

**ES Modules pentru Web Components:**
\`\`\`javascript
// components/my-card.mjs
export class MyCard extends HTMLElement {
  static get observedAttributes() { return ['title', 'image', 'href']; }

  static template = null;

  static getTemplate() {
    if (!MyCard.template) {
      MyCard.template = document.createElement('template');
      MyCard.template.innerHTML = \`
        <style>
          :host { display: block; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
          .card-img { width: 100%; aspect-ratio: 16/9; object-fit: cover; }
          .card-body { padding: 1rem; }
          .card-title { margin: 0 0 0.5rem; font-size: 1.1rem; }
          .card-link { display: inline-block; margin-top: 0.75rem; color: #3498db; text-decoration: none; }
          .card-link:hover { text-decoration: underline; }
        </style>
        <img class="card-img" src="" alt="">
        <div class="card-body">
          <h3 class="card-title"><slot name="title">Titlu</slot></h3>
          <slot></slot>
          <a class="card-link" href="#">Citește mai mult →</a>
        </div>
      \`;
    }
    return MyCard.template;
  }

  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.appendChild(MyCard.getTemplate().content.cloneNode(true));
    this._update();
  }

  attributeChangedCallback() { this._update(); }

  _update() {
    if (!this.shadowRoot) return;
    const img = this.shadowRoot.querySelector('.card-img');
    const link = this.shadowRoot.querySelector('.card-link');
    if (img) {
      img.src = this.getAttribute('image') || '';
      img.alt = this.getAttribute('title') || '';
    }
    if (link) link.href = this.getAttribute('href') || '#';
  }
}

customElements.define('my-card', MyCard);
export default MyCard;
\`\`\`

\`\`\`html
<!-- index.html — import module -->
<script type="module">
  import './components/my-card.mjs';
  import './components/my-button.mjs';
  import './components/my-modal.mjs';
</script>

<!-- SAU: import map pentru rezoluție nume -->
<script type="importmap">
{
  "imports": {
    "my-card": "./components/my-card.mjs",
    "my-button": "./components/my-button.mjs"
  }
}
</script>
<script type="module">
  import 'my-card';
</script>

<!-- Utilizare -->
<my-card
  title="Ghid HTML5"
  image="/thumbnails/html.jpg"
  href="/cursuri/html">
  <span slot="title">Ghid HTML5 Complet</span>
  <p>35 lecții interactive despre HTML5, semantic, formulare și accesibilitate.</p>
</my-card>
\`\`\`

**Organizarea unui proiect cu Web Components:**
\`\`\`
components/
  my-card/
    my-card.mjs      → logica componentei
    my-card.css      → stiluri (opțional separat)
    my-card.html     → template (opțional separat)
  my-button/
    my-button.mjs
  my-modal/
    my-modal.mjs
index.js             → import și register toate componentele
\`\`\`

**Lazy loading componente:**
\`\`\`javascript
// Încarcă componenta doar când e nevoie
async function loadComponent(name) {
  if (!customElements.get(name)) {
    await import(\`./components/\${name}.mjs\`);
  }
}

// Folosind IntersectionObserver
const observer = new IntersectionObserver(async (entries) => {
  for (const entry of entries) {
    if (entry.isIntersecting) {
      const name = entry.target.localName; // "my-card"
      await loadComponent(name);
      observer.unobserve(entry.target);
    }
  }
});

document.querySelectorAll('[data-lazy-component]')
  .forEach(el => observer.observe(el));
\`\`\`

• **ES Modules** sunt implicit \`defer\` și rulează în \`strict mode\`.
• **Import maps** permit aliasuri pentru module — util pentru biblioteci.
• **Template caching** cu variabilă statică — clona template-ului e mai rapidă decât innerHTML la fiecare instanță.
• Web Components sunt distribuibile ca npm packages — funcționează în orice framework sau vanilla HTML.` },

  // L27: PWA
  { lesson: "27. Progressive Web Apps (PWA) — Manifest și Service Workers", title: "Ce este o PWA?", content: `**Progressive Web App (PWA)** este o aplicație web care oferă experiență similară cu aplicațiile native — instalabilă, funcționează offline, cu notificări push și acces la hardware.

**Cele 3 piloni ai PWA:**
\`\`\`
1. HTTPS (securitate)
   → Obligatoriu pentru Service Workers și API-uri moderne
   → Localhost e tratat ca HTTPS pentru dezvoltare

2. Web App Manifest (site.webmanifest)
   → Metadata pentru instalare: icon, culori, orientare
   → "Add to Home Screen" pe Android și iOS

3. Service Worker (serviceworker.js)
   → Script care rulează în background, separat de pagină
   → Cache offline, push notifications, background sync
\`\`\`

**Verificarea cerințelor PWA:**
\`\`\`
Chrome DevTools → Application → Manifest → verifică parsing
Chrome DevTools → Application → Service Workers → status
Lighthouse → PWA audit → scor și probleme
\`\`\`

**Ce pot face PWA-urile (API-uri moderne):**
\`\`\`
Funcționalitate     API                    Suport
─────────────────────────────────────────────────
Instalare           Web App Manifest        ✅ Universal
Cache offline       Cache API + SW          ✅ Universal
Push notifications  Push API + SW           ✅ Chrome/Firefox/Safari 16+
Background sync     Background Sync API     ✅ Chrome, Edge
Notificări locale   Notification API        ✅ Desktop, parțial mobile
Geolocation         Geolocation API         ✅ Universal
Camera/Microfon     getUserMedia            ✅ Universal
Clipboard           Clipboard API           ✅ Modern
Share               Web Share API           ✅ Mobile-first
Filesystem          File System Access API  ✅ Chrome/Edge
Badging             Badging API             ✅ Chrome/Edge
\`\`\`

**Structura minimă pentru o PWA:**
\`\`\`
project/
  index.html         → pagina principală
  site.webmanifest   → metadata instalare
  service-worker.js  → logica offline/cache
  icons/
    icon-192.png     → icon Android homescreen
    icon-512.png     → icon splash screen
    icon.svg         → icon SVG (opțional, scalabil)
\`\`\`

**Înregistrarea Service Worker:**
\`\`\`html
<!-- În index.html, înainte de </body> -->
<script>
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', async () => {
      try {
        const reg = await navigator.serviceWorker.register('/service-worker.js');
        console.log('SW înregistrat:', reg.scope);
      } catch(err) {
        console.error('SW eșuat:', err);
      }
    });
  }
</script>
\`\`\`

**Criteriile Google pentru instalabilitate:**
\`\`\`
✓ Servit pe HTTPS (sau localhost)
✓ Web App Manifest cu name, icons (192px+512px), start_url, display
✓ Service Worker înregistrat cu fetch handler
✓ Pagina e responsivă (viewport meta)
\`\`\`

• PWA-urile pe iOS (Safari) au suport mai limitat față de Android (Chrome) — verifică compatibilitatea.
• Workbox (Google) este librăria recomandată pentru Service Workers — simplifică caching strategies.
• **App shell architecture**: încarcă shell-ul (header, nav, footer) din cache, conținut dinamic din rețea.
• PWA-ul DevZone poate fi instalat pe telefon și rulat offline — exact ca o aplicație nativă.` },

  { lesson: "27. Progressive Web Apps (PWA) — Manifest și Service Workers", title: "Web App Manifest", content: `**Web App Manifest** (\`site.webmanifest\`) este un fișier JSON care definește cum arată și cum se comportă aplicația când e instalată pe dispozitiv.

**Manifest complet:**
\`\`\`json
{
  "name": "DevZone — Platformă Cursuri Web",
  "short_name": "DevZone",
  "description": "Cursuri interactive de web development în română.",
  "start_url": "/",
  "scope": "/",
  "display": "standalone",
  "orientation": "any",
  "background_color": "#ffffff",
  "theme_color": "#3498db",
  "lang": "ro",
  "dir": "ltr",
  "categories": ["education", "productivity"],
  "screenshots": [
    {
      "src": "/screenshots/desktop.jpg",
      "sizes": "1280x720",
      "type": "image/jpeg",
      "form_factor": "wide",
      "label": "Homepage DevZone pe desktop"
    },
    {
      "src": "/screenshots/mobile.jpg",
      "sizes": "390x844",
      "type": "image/jpeg",
      "label": "Homepage DevZone pe mobil"
    }
  ],
  "icons": [
    { "src": "/icons/icon-72.png",  "sizes": "72x72",   "type": "image/png" },
    { "src": "/icons/icon-96.png",  "sizes": "96x96",   "type": "image/png" },
    { "src": "/icons/icon-128.png", "sizes": "128x128", "type": "image/png" },
    { "src": "/icons/icon-144.png", "sizes": "144x144", "type": "image/png" },
    { "src": "/icons/icon-152.png", "sizes": "152x152", "type": "image/png" },
    { "src": "/icons/icon-192.png", "sizes": "192x192", "type": "image/png", "purpose": "any" },
    { "src": "/icons/icon-384.png", "sizes": "384x384", "type": "image/png" },
    { "src": "/icons/icon-512.png", "sizes": "512x512", "type": "image/png", "purpose": "any maskable" }
  ],
  "shortcuts": [
    {
      "name": "Cursuri HTML",
      "short_name": "HTML",
      "description": "Deschide modulul HTML",
      "url": "/cursuri/html",
      "icons": [{ "src": "/icons/html-shortcut.png", "sizes": "96x96" }]
    },
    {
      "name": "Profilul meu",
      "url": "/profil",
      "icons": [{ "src": "/icons/profile-shortcut.png", "sizes": "96x96" }]
    }
  ],
  "related_applications": [
    {
      "platform": "play",
      "url": "https://play.google.com/store/apps/details?id=ro.devzone"
    }
  ],
  "prefer_related_applications": false
}
\`\`\`

**Link manifest în HTML:**
\`\`\`html
<link rel="manifest" href="/site.webmanifest">
<meta name="theme-color" content="#3498db">
<meta name="mobile-web-app-capable" content="yes">
<!-- iOS specific -->
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="default">
<meta name="apple-mobile-web-app-title" content="DevZone">
<link rel="apple-touch-icon" href="/icons/icon-192.png">
\`\`\`

**Valorile câmpului \`display\`:**
\`\`\`
browser    → deschide în browser normal (fără instalare vizibilă)
minimal-ui → UI browser minim (back, forward, URL)
standalone → fără bara browser, cu barra de status OS ← recomandat
fullscreen → ecran complet, fără nicio UI browser/OS
\`\`\`

**Icoane \`maskable\`:**
\`\`\`
"purpose": "maskable" → iconița e proiectată pentru a fi tăiată în formă
  rotundă/pătrat de diferite platforme Android
"purpose": "any"      → nu e tăiată — pentru iOS și desktop

Generatorul de maskable icons: maskable.app
Safe zone: cercul din interiorul iconiței (80% din suprafață)
\`\`\`

• \`screenshots\` cu \`form_factor: "wide"\` — afișate în Chrome la instalare (rich install UI).
• \`shortcuts\` — apare la long-press pe iconița de pe homescreen (Android) sau right-click (Windows).
• \`theme_color\` din manifest se sincronizează cu \`<meta name="theme-color">\` din HTML.
• Generare automată de icoane: **pwa-asset-generator** (npm) — generează toate dimensiunile dintr-o singură imagine SVG.` },

  { lesson: "27. Progressive Web Apps (PWA) — Manifest și Service Workers", title: "Service Workers — Fundament", content: `**Service Worker** este un script JavaScript care rulează în background, separat de pagina web, interceptând request-uri și permițând funcționalitate offline.

**Ciclul de viață al Service Worker:**
\`\`\`
Install → Activate → Idle/Fetch/Message
\`\`\`

**Service Worker complet — strategie Cache First:**
\`\`\`javascript
// service-worker.js
const CACHE_NAME = 'devzone-v1';
const OFFLINE_URL = '/offline.html';

const PRECACHE_URLS = [
  '/',
  '/offline.html',
  '/css/style.css',
  '/js/app.js',
  '/icons/icon-192.png'
];

// INSTALL: precachează resursele esențiale
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Precaching resurse...');
      return cache.addAll(PRECACHE_URLS);
    })
  );
  self.skipWaiting(); // activare imediată
});

// ACTIVATE: șterge cache-urile vechi
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      );
    })
  );
  self.clients.claim(); // preia controlul paginilor existente
});

// FETCH: interceptează request-urile
self.addEventListener('fetch', (event) => {
  // Ignoră non-GET și cross-origin
  if (event.request.method !== 'GET') return;
  if (!event.request.url.startsWith(self.location.origin)) return;

  event.respondWith(handleFetch(event.request));
});

async function handleFetch(request) {
  const cache = await caches.open(CACHE_NAME);

  // Strategie: Cache First, Network Fallback
  const cachedResponse = await cache.match(request);
  if (cachedResponse) return cachedResponse;

  try {
    const networkResponse = await fetch(request);
    // Cachează paginile HTML și resursele statice
    if (networkResponse.ok && request.destination !== 'video') {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    // Offline — returnează pagina offline
    if (request.destination === 'document') {
      return cache.match(OFFLINE_URL);
    }
    throw error;
  }
}
\`\`\`

**Strategii de caching:**
\`\`\`
Cache First:    cache → network (rapid, poate fi stale)
Network First:  network → cache (proaspăt, lent offline)
Stale While Revalidate: cache instant + update în background ← recomandat pentru SPA
Cache Only:     doar din cache (offline-first)
Network Only:   doar din rețea (no cache)
\`\`\`

**Comunicare pagină ↔ Service Worker:**
\`\`\`javascript
// Pagina → SW
navigator.serviceWorker.controller?.postMessage({ action: 'skipWaiting' });

// SW → Pagina
self.clients.matchAll().then(clients => {
  clients.forEach(client => client.postMessage({ type: 'UPDATE_AVAILABLE' }));
});

// Pagina ascultă mesaje de la SW
navigator.serviceWorker.addEventListener('message', (event) => {
  if (event.data.type === 'UPDATE_AVAILABLE') showUpdateBanner();
});
\`\`\`

• **Workbox** (Google) = librărie care simplifică toate aceste strategii cu 3-4 linii de cod.
• Service Worker-urile rulează pe HTTPS și localhost — nu pe HTTP.
• \`skipWaiting()\` forțează activarea imediată; fără el, SW-ul nou așteptă până se închid toate tab-urile.
• Cache Storage e persistent și nu expiră automat — curăță manual în \`activate\`.` },

  { lesson: "27. Progressive Web Apps (PWA) — Manifest și Service Workers", title: "Iconițe PWA și apple-touch-icon", content: `**Iconițele PWA** sunt esențiale pentru experiența de instalare — apar pe homescreen, splash screen, task switcher. Fiecare platformă are cerințe specifice.

**Dimensiuni necesare:**
\`\`\`
Android (Chrome):
  192×192  → homescreen icon
  512×512  → splash screen, instalare dialog
  Opțional: 72, 96, 128, 144, 152, 384

iOS (Safari):
  180×180  → apple-touch-icon (standard iPhone)
  167×167  → iPad Retina
  152×152  → iPad
  120×120  → iPhone Retina (mai vechi)
  76×76    → iPad non-Retina

Windows (Edge PWA):
  70×70    → tile mic
  150×150  → tile normal
  310×310  → tile mare

Desktop Chrome/Edge:
  128×128  → App dock/taskbar
\`\`\`

**Meta tags pentru iOS:**
\`\`\`html
<!-- Apple Touch Icon (homescreen pe iOS) -->
<link rel="apple-touch-icon" href="/icons/icon-180.png">
<link rel="apple-touch-icon" sizes="152x152" href="/icons/icon-152.png">
<link rel="apple-touch-icon" sizes="167x167" href="/icons/icon-167.png">
<link rel="apple-touch-icon" sizes="180x180" href="/icons/icon-180.png">

<!-- iOS PWA behavior -->
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="apple-mobile-web-app-title" content="DevZone">

<!-- Splash screens iOS (opțional, pentru startup instant) -->
<link rel="apple-touch-startup-image"
  href="/splash/splash-2048x2732.png"
  media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2)">
\`\`\`

**Maskable icons (Android adaptive icons):**
\`\`\`json
{
  "icons": [
    {
      "src": "/icons/icon-192-maskable.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "maskable"
    },
    {
      "src": "/icons/icon-192-any.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any"
    }
  ]
}
\`\`\`

**Maskable icon safe zone:**
\`\`\`
Zona sigură = cerc inscris în pătrat (80% din suprafață)
Icon 512×512: safe zone = cerc cu raza 205px (centrat)

Designul trebuie să fie complet în safe zone pentru a nu fi tăiat.
Fundalul se poate extinde până la margine.

Tool: maskable.app → previzualizare cum arată iconița pe diferite platforme
\`\`\`

**Generare automată cu pwa-asset-generator:**
\`\`\`bash
npx pwa-asset-generator logo.svg ./icons --manifest manifest.json
# Generează automat toate dimensiunile + actualizează manifest
\`\`\`

**Verificare iconițe în DevTools:**
\`\`\`
Chrome DevTools → Application → Manifest
  → Vizualizare toate iconițele
  → Avertizmente dacă lipsesc dimensiunile necesare
  → "Installability" → verifică dacă toate cerințele sunt îndeplinite
\`\`\`

**Favicon SVG modern (o singură imagine pentru toate):**
\`\`\`html
<!-- Favicon SVG cu suport dark mode -->
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/favicon.ico" sizes="32x32">  <!-- fallback IE -->
<link rel="apple-touch-icon" href="/icon-180.png">
\`\`\`
\`\`\`xml
<!-- favicon.svg cu suport dark mode -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <style>
    @media (prefers-color-scheme: dark) {
      .bg { fill: #1a1a2e; }
      .text { fill: white; }
    }
    .bg { fill: white; }
    .text { fill: #2c3e50; }
  </style>
  <rect class="bg" width="100" height="100" rx="20"/>
  <text class="text" x="50" y="70" text-anchor="middle" font-size="60" font-weight="bold">D</text>
</svg>
\`\`\`

• iOS nu suportă manifest icons — necesită \`apple-touch-icon\` separat.
• **pwa-asset-generator** este cel mai rapid tool — generează totul dintr-un singur SVG sursă.
• Maskable icons arată mai bine pe Android — Android tăie icon-urile în forme (cerc, squircle).
• Favicon SVG cu dark mode suport — browser-ul alege automat culoarea potrivită.` },
];

async function main() {
  let updated = 0, notFound = 0;
  for (const item of UPDATES) {
    const lessons = await p.lesson.findMany({ where: { title: item.lesson, module: { slug: "html" } } });
    if (!lessons.length) { console.log("! Lec: " + item.lesson); notFound++; continue; }
    const theory = await p.theory.findFirst({ where: { title: item.title, lessonId: { in: lessons.map(l => l.id) } } });
    if (!theory) { console.log("! Teo: " + item.title); notFound++; continue; }
    await p.theory.update({ where: { id: theory.id }, data: { content: item.content } });
    console.log("✓ " + item.title + ": " + theory.content.length + " → " + item.content.length);
    updated++;
  }
  console.log("\nDone: " + updated + " updated, " + notFound + " not found");
  await p.$disconnect();
}
main().catch(e => { console.error(e); p.$disconnect(); process.exit(1); });
