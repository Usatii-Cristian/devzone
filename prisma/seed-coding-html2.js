const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const tasks = [
  {
    slug: 'html-tag-text',
    name: 'Titluri și paragrafe HTML',
    question: 'Creează o pagină HTML cu un titlu h1 "Bine ai venit!", un h2 "Despre mine" și un paragraf cu cel puțin 10 cuvinte.',
    language: 'html',
    starterCode: `<!DOCTYPE html>\n<html>\n<head><title>Pagina mea</title></head>\n<body>\n  <!-- adaugă h1, h2 și un paragraf -->\n</body>\n</html>`,
    expectedOutput: '',
  },
  {
    slug: 'html-link-img',
    name: 'Link-uri și imagini',
    question: 'Creează un link HTML către "https://google.com" care se deschide în tab nou, și o imagine cu src="photo.jpg" și alt="Fotografie".',
    language: 'html',
    starterCode: `<!DOCTYPE html>\n<html><body>\n  <!-- link cu target="_blank" -->\n  <!-- imagine cu alt -->\n</body></html>`,
    expectedOutput: '',
  },
  {
    slug: 'html-tabele',
    name: 'Tabel HTML cu date',
    question: 'Creează un tabel HTML cu header (Nume, Vârstă, Oraș) și 2 rânduri de date despre persoane fictive.',
    language: 'html',
    starterCode: `<!DOCTYPE html>\n<html><body>\n<table>\n  <thead>\n    <tr>\n      <!-- capete coloană -->\n    </tr>\n  </thead>\n  <tbody>\n    <!-- 2 rânduri -->\n  </tbody>\n</table>\n</body></html>`,
    expectedOutput: '',
  },
  {
    slug: 'html-semantic',
    name: 'Structură semantică HTML5',
    question: 'Creează o pagină cu elementele semantice: `<header>`, `<nav>`, `<main>`, `<article>` și `<footer>`. Fiecare să conțină text relevant.',
    language: 'html',
    starterCode: `<!DOCTYPE html>\n<html><body>\n  <!-- folosește header, nav, main, article, footer -->\n</body></html>`,
    expectedOutput: '',
  },
  {
    slug: 'html5-features',
    name: 'Input HTML5 modern',
    question: 'Creează un formular cu inputuri de tip: `email`, `date`, `range` (min=0 max=100) și un buton submit.',
    language: 'html',
    starterCode: `<!DOCTYPE html>\n<html><body>\n<form>\n  <!-- email input -->\n  <!-- date input -->\n  <!-- range input -->\n  <!-- submit button -->\n</form>\n</body></html>`,
    expectedOutput: '',
  },
  {
    slug: 'html-iframe-embed',
    name: 'Embed conținut extern',
    question: 'Creează un iframe cu width=600 height=400 și src="https://example.com". Adaugă și un atribut title pentru accesibilitate.',
    language: 'html',
    starterCode: `<!DOCTYPE html>\n<html><body>\n  <!-- iframe cu dimensiuni și title -->\n</body></html>`,
    expectedOutput: '',
  },
  {
    slug: 'html-structura-pagina',
    name: 'Pagină completă HTML',
    question: 'Creează o pagină HTML completă cu: DOCTYPE, html lang="ro", head cu charset UTF-8 și title, body cu un h1 și un p.',
    language: 'html',
    starterCode: `<!-- pagină HTML completă cu toate elementele necesare -->`,
    expectedOutput: '',
  },
  {
    slug: 'html-proiect-pagina-personala',
    name: 'Pagină personală',
    question: 'Creează o mini pagină personală cu: header cu numele tău, o secțiune "Despre mine" cu un paragraf, o listă ul cu 3 hobby-uri, și un footer.',
    language: 'html',
    starterCode: `<!DOCTYPE html>\n<html lang="ro">\n<head>\n  <meta charset="UTF-8">\n  <title>Pagina Mea</title>\n</head>\n<body>\n  <!-- construiește pagina personală -->\n</body>\n</html>`,
    expectedOutput: '',
  },
  {
    slug: 'html-best-practices',
    name: 'HTML accesibil',
    question: 'Scrie un formular de login cu: label asociat fiecărui input (for/id), input pentru email și password cu placeholder, și buton submit cu text clar.',
    language: 'html',
    starterCode: `<form>\n  <!-- label + input email -->\n  <!-- label + input password -->\n  <!-- submit -->\n</form>`,
    expectedOutput: '',
  },
  {
    slug: 'html-validare-w3c',
    name: 'HTML valid semantic',
    question: 'Scrie un card HTML valid cu: div.card > (img cu alt + h3 + p + a.btn). Asigură-te că toate atributele obligatorii sunt prezente.',
    language: 'html',
    starterCode: `<div class="card">\n  <!-- imagine cu src și alt -->\n  <!-- titlu h3 -->\n  <!-- descriere p -->\n  <!-- link cu href -->\n</div>`,
    expectedOutput: '',
  },
  {
    slug: 'html-proiect-blog',
    name: 'Layout de blog HTML',
    question: 'Creează structura HTML a unui blog cu: header cu titlul blogului, main cu 2 article-uri (fiecare cu h2, p, time cu datetime), și footer.',
    language: 'html',
    starterCode: `<!DOCTYPE html>\n<html lang="ro">\n<head><meta charset="UTF-8"><title>Blog</title></head>\n<body>\n  <!-- header, main cu 2 articles, footer -->\n</body>\n</html>`,
    expectedOutput: '',
  },
  {
    slug: 'html-email',
    name: 'Template email HTML',
    question: 'Creează un template simplu de email HTML cu un tabel outer pentru layout (width=600), un header cu fundal colorat și un corp cu text.',
    language: 'html',
    starterCode: `<!DOCTYPE html>\n<html>\n<head><meta charset="UTF-8"></head>\n<body>\n  <table width="600" cellpadding="0" cellspacing="0">\n    <!-- header row -->\n    <!-- body row -->\n  </table>\n</body>\n</html>`,
    expectedOutput: '',
  },
  {
    slug: 'html-internalizare',
    name: 'HTML internațional',
    question: 'Creează o pagină HTML cu lang="ro", charset UTF-8, meta viewport, og:title și og:description. Adaugă un h1 cu text în română.',
    language: 'html',
    starterCode: `<!DOCTYPE html>\n<html lang="ro">\n<head>\n  <!-- charset, viewport, og tags -->\n  <title>Pagina Mea</title>\n</head>\n<body>\n  <!-- h1 în română -->\n</body>\n</html>`,
    expectedOutput: '',
  },
  {
    slug: 'html-javascript-apis',
    name: 'HTML cu date attributes',
    question: 'Creează 3 carduri div cu data-id, data-category și data-price. Adaugă un script inline care citește și afișează în consolă data-price de la primul card.',
    language: 'html',
    starterCode: `<div class="card" data-id="1" data-category="tech" data-price="99">\n  <h3>Produs 1</h3>\n</div>\n<!-- mai adaugă 2 carduri -->\n<script>\n  // citește data-price de la primul card\n</script>`,
    expectedOutput: '',
  },
  {
    slug: 'html-custom-protocols',
    name: 'Link-uri speciale HTML',
    question: 'Creează o pagină cu: un link mailto cu subiect pre-completat, un link tel, și un link de download pentru un fișier PDF fictiv.',
    language: 'html',
    starterCode: `<a href="...">Trimite email</a>\n<a href="...">Sună-ne</a>\n<a href="...">Descarcă PDF</a>`,
    expectedOutput: '',
  },
  {
    slug: 'html-mini-proiect-newsletter',
    name: 'Formular newsletter',
    question: 'Creează un formular de abonare newsletter cu: input email (required), un checkbox "Accept termenii", și un buton submit. Folosește fieldset și legend.',
    language: 'html',
    starterCode: `<form>\n  <fieldset>\n    <legend>Abonare Newsletter</legend>\n    <!-- email input required -->\n    <!-- checkbox termeni -->\n    <!-- submit -->\n  </fieldset>\n</form>`,
    expectedOutput: '',
  },
];

async function main() {
  console.log('Adăugare coding tasks HTML...');
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
