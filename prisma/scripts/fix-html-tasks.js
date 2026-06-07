const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const FIXES = [
  {
    lessonId: "69fb25b4a7657a7d121f0619",
    name: "4. Liste",
    tasks: [
      // fillblank 6-10
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează tag-ul pentru o listă neordonată:\n```html\n<___>\n  <li>Mere</li>\n  <li>Pere</li>\n</___>\n```",
        answer: "ul", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează tag-ul pentru o listă ordonată:\n```html\n<___>\n  <li>Pasul 1</li>\n  <li>Pasul 2</li>\n</___>\n```",
        answer: "ol", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează elementul de list:\n```html\n<ul>\n  <___>Portocale</___>\n  <___>Banane</___>\n</ul>\n```",
        answer: "li", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează lista imbricată corect:\n```html\n<ul>\n  <li>Fructe\n    <___>\n      <li>Mere</li>\n    </___>\n  </li>\n</ul>\n```",
        answer: "ul", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează atributul care schimbă tipul listei ordonate:\n```html\n<ol ___=\"A\">\n  <li>Primul</li>\n</ol>\n```",
        answer: "type", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      // coding 11-15
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Creează o funcție `numarElementeLista` care primește un array și returnează numărul de elemente. Apeleaz-o cu `['mere', 'pere', 'prune']` și afișează rezultatul.",
        starterCode: "function numarElementeLista(arr) {\n  // scrie codul aici\n}\n\nconsole.log(numarElementeLista(['mere', 'pere', 'prune']));",
        language: "javascript", expectedOutput: "3", answer: "", options: []
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Creează o funcție `primesteOl` care returnează șirul `'lista ordonata'` dacă parametrul `tip` este `'ol'`, altfel returnează `'lista neordonata'`. Testează cu `'ol'`.",
        starterCode: "function primesteOl(tip) {\n  // scrie codul aici\n}\n\nconsole.log(primesteOl('ol'));",
        language: "javascript", expectedOutput: "lista ordonata", answer: "", options: []
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `listaOrdonata` care primește un array și returnează elementele unite cu '. ' (punct și spațiu) — simulând o listă ordonată. Testează cu `['HTML', 'CSS', 'JS']`.",
        starterCode: "function listaOrdonata(arr) {\n  // scrie codul aici\n}\n\nconsole.log(listaOrdonata(['HTML', 'CSS', 'JS']));",
        language: "javascript", expectedOutput: "HTML. CSS. JS", answer: "", options: []
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `adaugaElement` care primește un array și un string, adaugă string-ul la array și returnează lungimea nouă. Testează cu `(['a','b'], 'c')`.",
        starterCode: "function adaugaElement(arr, elem) {\n  // scrie codul aici\n}\n\nconsole.log(adaugaElement(['a','b'], 'c'));",
        language: "javascript", expectedOutput: "3", answer: "", options: []
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `esteLista` care returnează `'ul'` dacă array-ul nu are ordine (primul element nu este '1'), altfel returnează `'ol'`. Testează cu `['mere', 'pere']`.",
        starterCode: "function esteLista(arr) {\n  // scrie codul aici\n}\n\nconsole.log(esteLista(['mere', 'pere']));",
        language: "javascript", expectedOutput: "ul", answer: "", options: []
      }
    ]
  },
  {
    lessonId: "69fb25b6a7657a7d121f0625",
    name: "5. Tabele",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează tag-ul principal al tabelului:\n```html\n<___>\n  <tr><th>Nume</th><th>Vârstă</th></tr>\n</___>\n```",
        answer: "table", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează tag-ul pentru un rând de tabel:\n```html\n<table>\n  <___>\n    <td>Ion</td>\n    <td>25</td>\n  </___>\n</table>\n```",
        answer: "tr", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează atributul care unește 2 coloane:\n```html\n<td ___ =\"2\">Celulă mare</td>\n```",
        answer: "colspan", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează atributul care unește 3 rânduri:\n```html\n<td ___=\"3\">Celulă înaltă</td>\n```",
        answer: "rowspan", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează tag-ul pentru antetul tabelului:\n```html\n<table>\n  <___>\n    <tr><th>Produs</th><th>Preț</th></tr>\n  </___>\n  <tbody>...</tbody>\n</table>\n```",
        answer: "thead", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `numarColoane` care primește un număr și returnează șirul `'Tabel cu X coloane'`. Testează cu `3`.",
        starterCode: "function numarColoane(n) {\n  // scrie codul aici\n}\n\nconsole.log(numarColoane(3));",
        language: "javascript", expectedOutput: "Tabel cu 3 coloane", answer: "", options: []
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `calculeazaCelule` care primește rânduri și coloane și returnează numărul total de celule. Testează cu `4, 3`.",
        starterCode: "function calculeazaCelule(randuri, coloane) {\n  // scrie codul aici\n}\n\nconsole.log(calculeazaCelule(4, 3));",
        language: "javascript", expectedOutput: "12", answer: "", options: []
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `tabelAntet` care primește un array de coloane și returnează `'ANTET: col1, col2, ...'`. Testează cu `['Nume', 'Vârstă', 'Oraș']`.",
        starterCode: "function tabelAntet(coloane) {\n  // scrie codul aici\n}\n\nconsole.log(tabelAntet(['Nume', 'Vârstă', 'Oraș']));",
        language: "javascript", expectedOutput: "ANTET: Nume, Vârstă, Oraș", answer: "", options: []
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `colSpanValid` care verifică dacă colspan este între 1 și 10. Returnează `true` sau `false`. Testează cu `5`.",
        starterCode: "function colSpanValid(n) {\n  // scrie codul aici\n}\n\nconsole.log(colSpanValid(5));",
        language: "javascript", expectedOutput: "true", answer: "", options: []
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `tipCelula` care primește `'th'` sau `'td'` și returnează `'celula antet'` sau `'celula date'`. Testează cu `'th'`.",
        starterCode: "function tipCelula(tag) {\n  // scrie codul aici\n}\n\nconsole.log(tipCelula('th'));",
        language: "javascript", expectedOutput: "celula antet", answer: "", options: []
      }
    ]
  },
  {
    lessonId: "69fb25baa7657a7d121f0649",
    name: "8. HTML5: features moderne",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează tag-ul pentru inserarea unui fișier audio:\n```html\n<___  controls>\n  <source src=\"muzica.mp3\" type=\"audio/mpeg\">\n</___>\n```",
        answer: "audio", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează tag-ul pentru inserarea unui video:\n```html\n<___ controls width=\"640\">\n  <source src=\"film.mp4\" type=\"video/mp4\">\n</___>\n```",
        answer: "video", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează tag-ul canvas cu dimensiunile:\n```html\n<___ id=\"desenMeu\" ___=\"400\" ___=\"200\"></___ >\n```",
        answer: "canvas", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează atributul care redă automat un video:\n```html\n<video ___ muted>\n  <source src=\"intro.mp4\">\n</video>\n```",
        answer: "autoplay", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează tag-ul SVG pentru un cerc:\n```html\n<svg>\n  <___ cx=\"50\" cy=\"50\" r=\"40\" fill=\"blue\"/>\n</svg>\n```",
        answer: "circle", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `formatDuratie` care primește secunde și returnează formatul `'Xm Ys'`. Testează cu `125`.",
        starterCode: "function formatDuratie(sec) {\n  // scrie codul aici\n}\n\nconsole.log(formatDuratie(125));",
        language: "javascript", expectedOutput: "2m 5s", answer: "", options: []
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `tipMedia` care primește o extensie și returnează `'audio'`, `'video'` sau `'necunoscut'`. Testează cu `'mp3'`.",
        starterCode: "function tipMedia(ext) {\n  const audio = ['mp3','ogg','wav'];\n  const video = ['mp4','webm','ogg'];\n  // scrie codul aici\n}\n\nconsole.log(tipMedia('mp3'));",
        language: "javascript", expectedOutput: "audio", answer: "", options: []
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `arieCanvas` care primește lățimea și înălțimea unui canvas și returnează aria. Testează cu `400, 300`.",
        starterCode: "function arieCanvas(w, h) {\n  // scrie codul aici\n}\n\nconsole.log(arieCanvas(400, 300));",
        language: "javascript", expectedOutput: "120000", answer: "", options: []
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `esteHTML5Tag` care verifică dacă un tag este din HTML5 (`'audio'`, `'video'`, `'canvas'`, `'svg'`). Returnează `true`/`false`. Testează cu `'canvas'`.",
        starterCode: "function esteHTML5Tag(tag) {\n  // scrie codul aici\n}\n\nconsole.log(esteHTML5Tag('canvas'));",
        language: "javascript", expectedOutput: "true", answer: "", options: []
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `descrieMedia` care primește `'audio'` sau `'video'` și returnează `'reda sunet'` sau `'reda video'`. Testează cu `'video'`.",
        starterCode: "function descrieMedia(tip) {\n  // scrie codul aici\n}\n\nconsole.log(descrieMedia('video'));",
        language: "javascript", expectedOutput: "reda video", answer: "", options: []
      }
    ]
  },
  {
    lessonId: "6a021b08f0ec7fc9c03a6648",
    name: "9. Forme avansate — validare HTML5",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează atributul care face câmpul obligatoriu:\n```html\n<input type=\"text\" name=\"nume\" ___>\n```",
        answer: "required", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează atributul care setează lungimea minimă:\n```html\n<input type=\"text\" ___=\"3\" maxlength=\"20\">\n```",
        answer: "minlength", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează atributul pentru validare cu expresie regulată:\n```html\n<input type=\"text\" ___=\"[A-Za-z]+\" title=\"Doar litere\">\n```",
        answer: "pattern", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează pseudo-clasa CSS pentru câmpuri invalide:\n```css\ninput:___ {\n  border-color: red;\n}\n```",
        answer: "invalid", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează pseudo-clasa CSS pentru câmpuri valide:\n```css\ninput:___ {\n  border-color: green;\n}\n```",
        answer: "valid", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `validareEmail` care verifică dacă un string conține `'@'` și un punct după `'@'`. Returnează `true`/`false`. Testează cu `'test@exemplu.com'`.",
        starterCode: "function validareEmail(email) {\n  // scrie codul aici\n}\n\nconsole.log(validareEmail('test@exemplu.com'));",
        language: "javascript", expectedOutput: "true", answer: "", options: []
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `validareLungime` care returnează `true` dacă string-ul are între `min` și `max` caractere. Testează cu `('hello', 3, 10)`.",
        starterCode: "function validareLungime(str, min, max) {\n  // scrie codul aici\n}\n\nconsole.log(validareLungime('hello', 3, 10));",
        language: "javascript", expectedOutput: "true", answer: "", options: []
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `validarePattern` care returnează `true` dacă un string conține doar litere (a-z, A-Z). Testează cu `'NumeValid'`.",
        starterCode: "function validarePattern(str) {\n  // scrie codul aici\n}\n\nconsole.log(validarePattern('NumeValid'));",
        language: "javascript", expectedOutput: "true", answer: "", options: []
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `mesajEroare` care primește un câmp și returnează `'Câmpul X este obligatoriu'`. Testează cu `'email'`.",
        starterCode: "function mesajEroare(camp) {\n  // scrie codul aici\n}\n\nconsole.log(mesajEroare('email'));",
        language: "javascript", expectedOutput: "Câmpul email este obligatoriu", answer: "", options: []
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `numarCampuriInvalide` care primește un array de valori și returnează câte sunt `null` sau `''`. Testează cu `['ion', '', null, 'test']`.",
        starterCode: "function numarCampuriInvalide(arr) {\n  // scrie codul aici\n}\n\nconsole.log(numarCampuriInvalide(['ion', '', null, 'test']));",
        language: "javascript", expectedOutput: "2", answer: "", options: []
      }
    ]
  },
  {
    lessonId: "6a021b0bf0ec7fc9c03a665a",
    name: "11. Iframe și conținut încorporat",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează tag-ul pentru incorporarea unui site extern:\n```html\n<___ src=\"https://exemplu.com\" width=\"800\" height=\"600\"></___ >\n```",
        answer: "iframe", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează atributul de securitate care blochează scripturile:\n```html\n<iframe src=\"pagina.html\" ___ =\"allow-scripts\">\n</iframe>\n```",
        answer: "sandbox", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează atributul pentru controlul politicii referrer:\n```html\n<iframe src=\"https://site.com\"\n  ___policy=\"no-referrer\">\n</iframe>\n```",
        answer: "referrer", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează atributul care permite sau interzice full-screen:\n```html\n<iframe src=\"video.html\"\n  ___=\"fullscreen\">\n</iframe>\n```",
        answer: "allow", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează atributul care setează numele unui iframe:\n```html\n<iframe src=\"pagina.html\" ___=\"frame1\"></iframe>\n<a href=\"link.html\" target=\"___\">Deschide</a>\n```",
        answer: "name", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `urlValid` care verifică dacă un URL începe cu `'https://'`. Returnează `true`/`false`. Testează cu `'https://google.com'`.",
        starterCode: "function urlValid(url) {\n  // scrie codul aici\n}\n\nconsole.log(urlValid('https://google.com'));",
        language: "javascript", expectedOutput: "true", answer: "", options: []
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `dimensiuneIframe` care primește lățimea și înălțimea și returnează `'WxH'`. Testează cu `800, 600`.",
        starterCode: "function dimensiuneIframe(w, h) {\n  // scrie codul aici\n}\n\nconsole.log(dimensiuneIframe(800, 600));",
        language: "javascript", expectedOutput: "800x600", answer: "", options: []
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `esteSecurIframe` care returnează `true` dacă URL-ul este `https` și are atributul `sandbox`. Testează cu `('https://site.com', true)`.",
        starterCode: "function esteSecurIframe(url, sandbox) {\n  // scrie codul aici\n}\n\nconsole.log(esteSecurIframe('https://site.com', true));",
        language: "javascript", expectedOutput: "true", answer: "", options: []
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `extragedomeniu` care extrage domeniul dintr-un URL (între `://` și al treilea `/` sau sfârșitul șirului). Testează cu `'https://google.com'`.",
        starterCode: "function extragedomeniu(url) {\n  // scrie codul aici\n}\n\nconsole.log(extragedomeniu('https://google.com'));",
        language: "javascript", expectedOutput: "google.com", answer: "", options: []
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `tipIncorporare` care primește un tag (`'iframe'`, `'embed'`, `'object'`) și returnează `'suportat'` dacă este `'iframe'`, altfel `'alternativ'`. Testează cu `'iframe'`.",
        starterCode: "function tipIncorporare(tag) {\n  // scrie codul aici\n}\n\nconsole.log(tipIncorporare('iframe'));",
        language: "javascript", expectedOutput: "suportat", answer: "", options: []
      }
    ]
  },
  {
    lessonId: "6a021b10f0ec7fc9c03a667e",
    name: "15. Canvas — introducere",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează metoda pentru a obține contextul 2D al canvas-ului:\n```js\nconst canvas = document.getElementById('c');\nconst ctx = canvas.___('2d');\n```",
        answer: "getContext", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează metoda pentru a desena un dreptunghi plin:\n```js\nctx.fillStyle = 'blue';\nctx.___(10, 10, 100, 50);\n```",
        answer: "fillRect", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează metoda pentru a desena text pe canvas:\n```js\nctx.font = '20px Arial';\nctx.___(\"Salut!\", 50, 50);\n```",
        answer: "fillText", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează metoda care începe un nou path pe canvas:\n```js\nctx.___();\nctx.moveTo(0, 0);\nctx.lineTo(100, 100);\nctx.stroke();\n```",
        answer: "beginPath", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează metoda pentru a desena un arc (cerc):\n```js\nctx.beginPath();\nctx.___(75, 75, 50, 0, Math.PI * 2);\nctx.fill();\n```",
        answer: "arc", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `arieCanvas` care primește `w` și `h` și returnează aria (w * h). Testează cu `300, 150`.",
        starterCode: "function arieCanvas(w, h) {\n  // scrie codul aici\n}\n\nconsole.log(arieCanvas(300, 150));",
        language: "javascript", expectedOutput: "45000", answer: "", options: []
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `scaleCanvas` care primește dimensiunile originale (w, h) și un factor de scalare și returnează noile dimensiuni ca `'WxH'`. Testează cu `200, 100, 2`.",
        starterCode: "function scaleCanvas(w, h, factor) {\n  // scrie codul aici\n}\n\nconsole.log(scaleCanvas(200, 100, 2));",
        language: "javascript", expectedOutput: "400x200", answer: "", options: []
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `culoareHex` care primește r, g, b (0-255) și returnează culoarea în format hex (`#RRGGBB`). Testează cu `255, 0, 0`.",
        starterCode: "function culoareHex(r, g, b) {\n  // scrie codul aici\n}\n\nconsole.log(culoareHex(255, 0, 0));",
        language: "javascript", expectedOutput: "#ff0000", answer: "", options: []
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `numarPixeli` care primește lățimea și înălțimea unui canvas și returnează numărul total de pixeli. Testează cu `100, 50`.",
        starterCode: "function numarPixeli(w, h) {\n  // scrie codul aici\n}\n\nconsole.log(numarPixeli(100, 50));",
        language: "javascript", expectedOutput: "5000", answer: "", options: []
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `distantaPuncte` care calculează distanța euclidiană între două puncte (x1,y1) și (x2,y2). Returnează rezultatul rotunjit. Testează cu `(0,0,3,4)`.",
        starterCode: "function distantaPuncte(x1, y1, x2, y2) {\n  // scrie codul aici\n}\n\nconsole.log(distantaPuncte(0, 0, 3, 4));",
        language: "javascript", expectedOutput: "5", answer: "", options: []
      }
    ]
  },
  {
    lessonId: "6a021b11f0ec7fc9c03a6687",
    name: "16. template și slot",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează tag-ul pentru definirea unui template HTML:\n```html\n<___ id=\"cardTemplate\">\n  <div class=\"card\"><slot name=\"titlu\"></slot></div>\n</___>\n```",
        answer: "template", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează proprietatea JS pentru a obține conținutul unui template:\n```js\nconst tmpl = document.getElementById('cardTemplate');\nconst clone = tmpl.___.cloneNode(true);\n```",
        answer: "content", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează tag-ul pentru un slot cu nume:\n```html\n<template>\n  <___ name=\"header\">Titlu implicit</___ >\n</template>\n```",
        answer: "slot", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează metoda pentru a atașa un shadow DOM:\n```js\nconst shadow = element.___('open');\n```",
        answer: "attachShadow", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează metoda pentru a înregistra un Custom Element:\n```js\ncustomElements.___('my-card', MyCard);\n```",
        answer: "define", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `creazaTemplate` care primește un titlu și returnează șirul `'<template id=\"tmpl\">TITLU</template>'`. Testează cu `'Card'`.",
        starterCode: "function creazaTemplate(titlu) {\n  // scrie codul aici\n}\n\nconsole.log(creazaTemplate('Card'));",
        language: "javascript", expectedOutput: "<template id=\"tmpl\">Card</template>", answer: "", options: []
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `numeElement` care adaugă prefixul `'my-'` la un string dacă nu există deja. Testează cu `'button'`.",
        starterCode: "function numeElement(name) {\n  // scrie codul aici\n}\n\nconsole.log(numeElement('button'));",
        language: "javascript", expectedOutput: "my-button", answer: "", options: []
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `esteCustomElement` care returnează `true` dacă un string conține cratimă (`-`). Testează cu `'my-card'`.",
        starterCode: "function esteCustomElement(name) {\n  // scrie codul aici\n}\n\nconsole.log(esteCustomElement('my-card'));",
        language: "javascript", expectedOutput: "true", answer: "", options: []
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `numarSlots` care primește un array de slot-uri și returnează câte au proprietatea `name` definită (nu `undefined`). Testează cu `[{name:'header'}, {name:undefined}, {name:'footer'}]`.",
        starterCode: "function numarSlots(slots) {\n  // scrie codul aici\n}\n\nconsole.log(numarSlots([{name:'header'}, {name:undefined}, {name:'footer'}]));",
        language: "javascript", expectedOutput: "2", answer: "", options: []
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `shadowMode` care primește `'open'` sau `'closed'` și returnează `'accesibil din JS'` sau `'inaccesibil din JS'`. Testează cu `'open'`.",
        starterCode: "function shadowMode(mode) {\n  // scrie codul aici\n}\n\nconsole.log(shadowMode('open'));",
        language: "javascript", expectedOutput: "accesibil din JS", answer: "", options: []
      }
    ]
  },
  {
    lessonId: "6a021b12f0ec7fc9c03a6690",
    name: "17. dialog, details, summary",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează tag-ul pentru un dialog modal nativ:\n```html\n<___ id=\"modal\">\n  <p>Conținut modal</p>\n  <button>Închide</button>\n</___>\n```",
        answer: "dialog", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează metoda JS pentru a deschide un dialog modal:\n```js\nconst modal = document.getElementById('modal');\nmodal.___();\n```",
        answer: "showModal", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează tag-ul pentru un bloc expandabil:\n```html\n<___>\n  <summary>Click pentru detalii</summary>\n  <p>Conținut ascuns</p>\n</___>\n```",
        answer: "details", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează tag-ul pentru titlul unui bloc expandabil:\n```html\n<details>\n  <___>Întrebare frecventă</___ >\n  <p>Răspunsul detaliat...</p>\n</details>\n```",
        answer: "summary", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează atributul care face `details` deschis implicit:\n```html\n<details ___>\n  <summary>Vizibil</summary>\n  <p>Conținut deja vizibil</p>\n</details>\n```",
        answer: "open", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `esteDialog` care returnează `true` dacă tag-ul este `'dialog'`. Testează cu `'dialog'`.",
        starterCode: "function esteDialog(tag) {\n  // scrie codul aici\n}\n\nconsole.log(esteDialog('dialog'));",
        language: "javascript", expectedOutput: "true", answer: "", options: []
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `titluDetails` care primește un șir și returnează `'<summary>TEXT</summary>'`. Testează cu `'Află mai mult'`.",
        starterCode: "function titluDetails(text) {\n  // scrie codul aici\n}\n\nconsole.log(titluDetails('Află mai mult'));",
        language: "javascript", expectedOutput: "<summary>Află mai mult</summary>", answer: "", options: []
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `numarFAQ` care primește un array de întrebări și returnează `'X întrebări FAQ'`. Testează cu un array de 4 elemente.",
        starterCode: "function numarFAQ(arr) {\n  // scrie codul aici\n}\n\nconsole.log(numarFAQ(['Q1','Q2','Q3','Q4']));",
        language: "javascript", expectedOutput: "4 întrebări FAQ", answer: "", options: []
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `tipDialog` care primește `'modal'` sau `'non-modal'` și returnează metoda JS corespunzătoare (`'showModal()'` sau `'show()'`). Testează cu `'modal'`.",
        starterCode: "function tipDialog(tip) {\n  // scrie codul aici\n}\n\nconsole.log(tipDialog('modal'));",
        language: "javascript", expectedOutput: "showModal()", answer: "", options: []
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `acordeonItems` care primește un număr `n` și returnează `'Acordeon cu N sectiuni'`. Testează cu `5`.",
        starterCode: "function acordeonItems(n) {\n  // scrie codul aici\n}\n\nconsole.log(acordeonItems(5));",
        language: "javascript", expectedOutput: "Acordeon cu 5 sectiuni", answer: "", options: []
      }
    ]
  },
  {
    lessonId: "6a021b14f0ec7fc9c03a6699",
    name: "18. Drag and Drop",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează atributul care face un element drag-able:\n```html\n<div ___=\"true\">Trage-mă!</div>\n```",
        answer: "draggable", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează evenimentul care se declanșează când începi să tragi:\n```js\nelement.addEventListener('___', (e) => {\n  e.dataTransfer.setData('text', e.target.id);\n});\n```",
        answer: "dragstart", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează evenimentul care trebuie prevenit pentru a permite drop:\n```js\nzona.addEventListener('___', (e) => {\n  e.preventDefault();\n});\n```",
        answer: "dragover", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează metoda pentru a citi datele în evenimentul drop:\n```js\nzona.addEventListener('drop', (e) => {\n  const id = e.dataTransfer.___('text');\n});\n```",
        answer: "getData", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează evenimentul care se declanșează când elementul este lăsat pe zonă:\n```js\nzona.addEventListener('___', handleDrop);\n```",
        answer: "drop", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `ordineDragDrop` care returnează array-ul cu evenimentele drag-and-drop în ordine corectă: `['dragstart', 'dragover', 'drop', 'dragend']`. Afișează primul element.",
        starterCode: "function ordineDragDrop() {\n  // scrie codul aici\n}\n\nconsole.log(ordineDragDrop()[0]);",
        language: "javascript", expectedOutput: "dragstart", answer: "", options: []
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `esteDroppable` care returnează `true` dacă un element are clasa `'drop-zone'` într-un array de clase. Testează cu `['container', 'drop-zone', 'active']`.",
        starterCode: "function esteDroppable(clase) {\n  // scrie codul aici\n}\n\nconsole.log(esteDroppable(['container', 'drop-zone', 'active']));",
        language: "javascript", expectedOutput: "true", answer: "", options: []
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `mutaElement` care primește un array și mută primul element la sfârșit. Returnează noul array ca string. Testează cu `['A','B','C']`.",
        starterCode: "function mutaElement(arr) {\n  // scrie codul aici\n}\n\nconsole.log(mutaElement(['A','B','C']));",
        language: "javascript", expectedOutput: "B,C,A", answer: "", options: []
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `pozitieNoua` care primește indexul vechi și cel nou și returnează `'mutat de la X la Y'`. Testează cu `2, 5`.",
        starterCode: "function pozitieNoua(vechi, nou) {\n  // scrie codul aici\n}\n\nconsole.log(pozitieNoua(2, 5));",
        language: "javascript", expectedOutput: "mutat de la 2 la 5", answer: "", options: []
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `numarEvenimente` care returnează câte evenimente sunt în lanțul drag-and-drop (dragstart, drag, dragenter, dragleave, dragover, drop, dragend = 7). Afișează rezultatul.",
        starterCode: "function numarEvenimente() {\n  // scrie codul aici — returnează numărul de evenimente DnD\n}\n\nconsole.log(numarEvenimente());",
        language: "javascript", expectedOutput: "7", answer: "", options: []
      }
    ]
  },
  {
    lessonId: "6a021b15f0ec7fc9c03a66a2",
    name: "19. progress, meter, output",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează tag-ul pentru o bară de progres:\n```html\n<___ value=\"70\" max=\"100\">70%</___ >\n```",
        answer: "progress", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează tag-ul pentru un indicator de nivel (ex: baterie):\n```html\n<___ value=\"0.6\" min=\"0\" max=\"1\">60%</___ >\n```",
        answer: "meter", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează tag-ul pentru afișarea rezultatului unui calcul:\n```html\n<form oninput=\"rez.value=a.valueAsNumber+b.valueAsNumber\">\n  <input type=\"number\" id=\"a\"> + <input type=\"number\" id=\"b\">\n  = <___ name=\"rez\"></___ >\n</form>\n```",
        answer: "output", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează atributul `meter` care definește zona \"bună\":\n```html\n<meter value=\"75\" min=\"0\" max=\"100\" ___=\"50\" high=\"90\">75</meter>\n```",
        answer: "low", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează atributul `meter` care definește valoarea optimă:\n```html\n<meter value=\"80\" min=\"0\" max=\"100\" low=\"20\" high=\"90\" ___=\"80\">80</meter>\n```",
        answer: "optimum", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `procentProgres` care primește `value` și `max` și returnează procentul ca număr întreg. Testează cu `35, 100`.",
        starterCode: "function procentProgres(value, max) {\n  // scrie codul aici\n}\n\nconsole.log(procentProgres(35, 100));",
        language: "javascript", expectedOutput: "35", answer: "", options: []
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `statusMeter` care returnează `'scazut'`, `'normal'` sau `'ridicat'` bazat pe valoare față de min/max. Testează cu `(30, 0, 100)`.",
        starterCode: "function statusMeter(val, min, max) {\n  const treime = (max - min) / 3;\n  // scrie codul aici\n}\n\nconsole.log(statusMeter(30, 0, 100));",
        language: "javascript", expectedOutput: "scazut", answer: "", options: []
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `suma` care primește două numere și returnează suma lor. Aceasta simulează calculul pentru tag-ul `<output>`. Testează cu `42, 58`.",
        starterCode: "function suma(a, b) {\n  // scrie codul aici\n}\n\nconsole.log(suma(42, 58));",
        language: "javascript", expectedOutput: "100", answer: "", options: []
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `barProgres` care primește un procent (0-100) și returnează un string vizual cu `█` și `░` (10 caractere total). Testează cu `50`.",
        starterCode: "function barProgres(procent) {\n  const plin = Math.round(procent / 10);\n  // scrie codul aici\n}\n\nconsole.log(barProgres(50));",
        language: "javascript", expectedOutput: "█████░░░░░", answer: "", options: []
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `esteInRange` care verifică dacă o valoare este între `min` și `max` (inclusiv). Returnează `true`/`false`. Testează cu `(75, 0, 100)`.",
        starterCode: "function esteInRange(val, min, max) {\n  // scrie codul aici\n}\n\nconsole.log(esteInRange(75, 0, 100));",
        language: "javascript", expectedOutput: "true", answer: "", options: []
      }
    ]
  },
  {
    lessonId: "6a021b16f0ec7fc9c03a66ab",
    name: "20. localStorage, sessionStorage, cookies",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează metoda pentru a salva date în localStorage:\n```js\nlocalStorage.___('utilizator', 'Ion');\n```",
        answer: "setItem", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează metoda pentru a citi din localStorage:\n```js\nconst user = localStorage.___('utilizator');\n```",
        answer: "getItem", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează metoda pentru a șterge o cheie din sessionStorage:\n```js\nsessionStorage.___('cheie');\n```",
        answer: "removeItem", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează metoda pentru a șterge tot din localStorage:\n```js\nlocalStorage.___();\n```",
        answer: "clear", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează atributul cookie care setează data de expirare:\n```js\ndocument.cookie = \"tema=dark; ___=Thu, 01 Jan 2027 00:00:00 UTC\";\n```",
        answer: "expires", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `diferentaStorage` care primește `'local'` sau `'session'` și returnează `'persistent'` sau `'temporar'`. Testează cu `'local'`.",
        starterCode: "function diferentaStorage(tip) {\n  // scrie codul aici\n}\n\nconsole.log(diferentaStorage('local'));",
        language: "javascript", expectedOutput: "persistent", answer: "", options: []
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `serializeStorage` care primește un obiect și returnează JSON string-ul lui. Testează cu `{tema: 'dark', limba: 'ro'}`.",
        starterCode: "function serializeStorage(obj) {\n  // scrie codul aici\n}\n\nconsole.log(serializeStorage({tema: 'dark', limba: 'ro'}));",
        language: "javascript", expectedOutput: "{\"tema\":\"dark\",\"limba\":\"ro\"}", answer: "", options: []
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `parseStorage` care primește un JSON string și returnează valoarea cheii `'tema'`. Testează cu `'{\"tema\":\"dark\"}'`.",
        starterCode: "function parseStorage(json) {\n  // scrie codul aici\n}\n\nconsole.log(parseStorage('{\"tema\":\"dark\"}'));",
        language: "javascript", expectedOutput: "dark", answer: "", options: []
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `capacitateStorage` care returnează capacitatea aproximativă a localStorage în MB (5). Afișează `'~5 MB'`.",
        starterCode: "function capacitateStorage() {\n  // scrie codul aici\n}\n\nconsole.log(capacitateStorage());",
        language: "javascript", expectedOutput: "~5 MB", answer: "", options: []
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `cookieSecure` care primește un nume și o valoare și returnează string-ul cookie cu flag-ul `Secure`. Testează cu `('user', 'ion')`.",
        starterCode: "function cookieSecure(name, val) {\n  // scrie codul aici\n}\n\nconsole.log(cookieSecure('user', 'ion'));",
        language: "javascript", expectedOutput: "user=ion; Secure", answer: "", options: []
      }
    ]
  },
  {
    lessonId: "6a021b18f0ec7fc9c03a66b4",
    name: "21. Structura unei pagini reale",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează tag-ul semantic pentru antetul paginii:\n```html\n<___>\n  <nav>...</nav>\n</___>\n```",
        answer: "header", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează tag-ul semantic pentru navigație:\n```html\n<___>\n  <a href=\"/\">Acasă</a>\n  <a href=\"/despre\">Despre</a>\n</___>\n```",
        answer: "nav", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează tag-ul semantic pentru conținutul principal:\n```html\n<___>\n  <h1>Titlu</h1>\n  <p>Conținut...</p>\n</___>\n```",
        answer: "main", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează tag-ul semantic pentru bara laterală:\n```html\n<___>\n  <h3>Categorii</h3>\n</___>\n```",
        answer: "aside", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează tag-ul semantic pentru subsolul paginii:\n```html\n<___>\n  <p>&copy; 2024 Site meu</p>\n</___>\n```",
        answer: "footer", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `tagSemantic` care primește un tip (`'antet'`, `'navigare'`, `'principal'`, `'subsol'`) și returnează tag-ul HTML corespunzător. Testează cu `'antet'`.",
        starterCode: "function tagSemantic(tip) {\n  const map = {antet: 'header', navigare: 'nav', principal: 'main', subsol: 'footer'};\n  // scrie codul aici\n}\n\nconsole.log(tagSemantic('antet'));",
        language: "javascript", expectedOutput: "header", answer: "", options: []
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `numarTaguriSemantice` care returnează numărul de tag-uri semantice principale HTML5 (header, nav, main, aside, footer, article, section = 7). Afișează rezultatul.",
        starterCode: "function numarTaguriSemantice() {\n  // scrie codul aici\n}\n\nconsole.log(numarTaguriSemantice());",
        language: "javascript", expectedOutput: "7", answer: "", options: []
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `esteTagSemantic` care returnează `true` dacă tag-ul este unul semantic (`header`, `nav`, `main`, `aside`, `footer`, `article`, `section`). Testează cu `'main'`.",
        starterCode: "function esteTagSemantic(tag) {\n  // scrie codul aici\n}\n\nconsole.log(esteTagSemantic('main'));",
        language: "javascript", expectedOutput: "true", answer: "", options: []
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `structuraPagina` care returnează array-ul cu ordinea tag-urilor într-o pagină: `['header', 'nav', 'main', 'footer']`. Afișează ultimul element.",
        starterCode: "function structuraPagina() {\n  // scrie codul aici\n}\n\nconst s = structuraPagina();\nconsole.log(s[s.length - 1]);",
        language: "javascript", expectedOutput: "footer", answer: "", options: []
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `diferentaDiv` care primește `'div'` sau `'section'` și returnează `'non-semantic'` sau `'semantic'`. Testează cu `'section'`.",
        starterCode: "function diferentaDiv(tag) {\n  // scrie codul aici\n}\n\nconsole.log(diferentaDiv('section'));",
        language: "javascript", expectedOutput: "semantic", answer: "", options: []
      }
    ]
  },
  {
    lessonId: "6a021b19f0ec7fc9c03a66bd",
    name: "22. Mini proiect — Pagină personală",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează tag-ul pentru imaginea de profil cu accesibilitate:\n```html\n<___ src=\"avatar.jpg\" ___=\"Fotografie de profil\" class=\"avatar\">\n```",
        answer: "img", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează tag-ul semantic pentru secțiunea de contact:\n```html\n<___ id=\"contact\">\n  <h2>Contactează-mă</h2>\n</___>\n```",
        answer: "section", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează tag-ul pentru un articol de blog:\n```html\n<___>\n  <h3>Titlu articol</h3>\n  <time>2024-01-15</time>\n</___>\n```",
        answer: "article", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează tag-ul pentru afișarea datei publicării:\n```html\n<___ datetime=\"2024-01-15\">15 Ianuarie 2024</___>\n```",
        answer: "time", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează meta tag-ul pentru descrierea paginii:\n```html\n<___ name=\"description\" content=\"Pagina personală a lui Ion\">\n```",
        answer: "meta", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `salutPersonalizat` care primește un nume și returnează `'Bun venit pe pagina lui NUME!'`. Testează cu `'Maria'`.",
        starterCode: "function salutPersonalizat(nume) {\n  // scrie codul aici\n}\n\nconsole.log(salutPersonalizat('Maria'));",
        language: "javascript", expectedOutput: "Bun venit pe pagina lui Maria!", answer: "", options: []
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `numarProiecte` care primește un array de proiecte și returnează `'X proiecte în portofoliu'`. Testează cu 3 proiecte.",
        starterCode: "function numarProiecte(arr) {\n  // scrie codul aici\n}\n\nconsole.log(numarProiecte(['P1','P2','P3']));",
        language: "javascript", expectedOutput: "3 proiecte în portofoliu", answer: "", options: []
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `sectiuniPagina` care returnează array-ul secțiunilor unei pagini personale: `['despre', 'proiecte', 'skills', 'contact']`. Afișează a doua secțiune.",
        starterCode: "function sectiuniPagina() {\n  // scrie codul aici\n}\n\nconsole.log(sectiuniPagina()[1]);",
        language: "javascript", expectedOutput: "proiecte", answer: "", options: []
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `linkSocial` care primește o rețea (`'github'`, `'linkedin'`) și un username și returnează URL-ul. Testează cu `('github', 'ionescu')`.",
        starterCode: "function linkSocial(retea, user) {\n  const urls = {github: 'https://github.com/', linkedin: 'https://linkedin.com/in/'};\n  // scrie codul aici\n}\n\nconsole.log(linkSocial('github', 'ionescu'));",
        language: "javascript", expectedOutput: "https://github.com/ionescu", answer: "", options: []
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `varstaFromAn` care primește anul nașterii și returnează vârsta (față de 2024). Testează cu `2000`.",
        starterCode: "function varstaFromAn(an) {\n  // scrie codul aici\n}\n\nconsole.log(varstaFromAn(2000));",
        language: "javascript", expectedOutput: "24", answer: "", options: []
      }
    ]
  },
  {
    lessonId: "6a021b1af0ec7fc9c03a66c6",
    name: "23. Best practices HTML",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează tag-ul DOCTYPE corect pentru HTML5:\n```html\n<!___ html>\n<html lang=\"ro\">\n```",
        answer: "DOCTYPE", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează atributul `lang` corect:\n```html\n<html ___=\"ro\">\n```",
        answer: "lang", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează meta tag-ul pentru charset UTF-8:\n```html\n<meta ___=\"UTF-8\">\n```",
        answer: "charset", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează atributul `alt` pentru imaginile decorative (accesibilitate):\n```html\n<img src=\"fundal.jpg\" ___=\"\">\n```",
        answer: "alt", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează tag-ul pentru a asocia un label cu un input:\n```html\n<___ for=\"email\">Email:</___ >\n<input id=\"email\" type=\"email\">\n```",
        answer: "label", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `esteHTMLValid` care verifică dacă un string conține atât `'<!DOCTYPE html>'` cât și `'<html'`. Returnează `true`/`false`. Testează cu `'<!DOCTYPE html><html lang=\"ro\">'`.",
        starterCode: "function esteHTMLValid(str) {\n  // scrie codul aici\n}\n\nconsole.log(esteHTMLValid('<!DOCTYPE html><html lang=\"ro\">'));",
        language: "javascript", expectedOutput: "true", answer: "", options: []
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `reguli` care returnează numărul de reguli de aur HTML (5). Afișează rezultatul.",
        starterCode: "function reguli() {\n  const r = ['DOCTYPE', 'lang', 'charset', 'alt', 'label'];\n  // scrie codul aici\n}\n\nconsole.log(reguli());",
        language: "javascript", expectedOutput: "5", answer: "", options: []
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `antiPattern` care primește un tag și returnează `true` dacă este un anti-pattern (`'font'`, `'center'`, `'marquee'`, `'blink'`). Testează cu `'font'`.",
        starterCode: "function antiPattern(tag) {\n  // scrie codul aici\n}\n\nconsole.log(antiPattern('font'));",
        language: "javascript", expectedOutput: "true", answer: "", options: []
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `indentare` care primește un nivel și returnează string-ul de indentare cu 2 spații per nivel. Testează cu `3`.",
        starterCode: "function indentare(nivel) {\n  // scrie codul aici\n}\n\nconsole.log(indentare(3));",
        language: "javascript", expectedOutput: "      ", answer: "", options: []
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `lungimeLinie` care primește un șir și returnează `'OK'` dacă are max 80 de caractere, altfel `'prea lung'`. Testează cu un string de 50 de caractere.",
        starterCode: "function lungimeLinie(str) {\n  // scrie codul aici\n}\n\nconsole.log(lungimeLinie('a'.repeat(50)));",
        language: "javascript", expectedOutput: "OK", answer: "", options: []
      }
    ]
  },
  {
    lessonId: "6a021b1cf0ec7fc9c03a66cf",
    name: "24. Validare W3C și debug HTML",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează URL-ul validatorului W3C:\n```\nhttps://___. w3.org/\n```",
        answer: "validator", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează tag-ul care lipsește în acest HTML invalid:\n```html\n<ul>\n  <li>Unu\n  <li>Doi\n</___>\n```",
        answer: "ul", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează comanda DevTools pentru a selecta un element din DOM:\n```\ndocument.___(\"#titlu\")\n```",
        answer: "querySelector", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează proprietatea pentru a citi HTML-ul intern al unui element:\n```js\nconst html = element.___;\n```",
        answer: "innerHTML", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează proprietatea pentru a citi textul unui element:\n```js\nconst text = element.___;\n```",
        answer: "textContent", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `numarErori` care primește un array de erori și returnează `'X erori de validare'`. Testează cu 3 erori.",
        starterCode: "function numarErori(erori) {\n  // scrie codul aici\n}\n\nconsole.log(numarErori(['err1','err2','err3']));",
        language: "javascript", expectedOutput: "3 erori de validare", answer: "", options: []
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `tagInchis` care verifică dacă un tag HTML este auto-închis (`'img'`, `'input'`, `'br'`, `'hr'`, `'meta'`, `'link'`). Returnează `true`/`false`. Testează cu `'img'`.",
        starterCode: "function tagInchis(tag) {\n  // scrie codul aici\n}\n\nconsole.log(tagInchis('img'));",
        language: "javascript", expectedOutput: "true", answer: "", options: []
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `curataTags` care elimină tag-urile HTML dintr-un string. Testează cu `'<h1>Titlu</h1>'`.",
        starterCode: "function curataTags(str) {\n  // scrie codul aici\n}\n\nconsole.log(curataTags('<h1>Titlu</h1>'));",
        language: "javascript", expectedOutput: "Titlu", answer: "", options: []
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `esteTagValid` care verifică dacă un tag este în lista de tag-uri valide HTML5 (`'div'`, `'span'`, `'p'`, `'a'`, `'img'`). Testează cu `'p'`.",
        starterCode: "function esteTagValid(tag) {\n  // scrie codul aici\n}\n\nconsole.log(esteTagValid('p'));",
        language: "javascript", expectedOutput: "true", answer: "", options: []
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `detectNesting` care primește un nivel de imbricare și returnează `'OK'` dacă e <= 5, altfel `'prea adanc'`. Testează cu `3`.",
        starterCode: "function detectNesting(nivel) {\n  // scrie codul aici\n}\n\nconsole.log(detectNesting(3));",
        language: "javascript", expectedOutput: "OK", answer: "", options: []
      }
    ]
  },
  {
    lessonId: "6a021b1df0ec7fc9c03a66d8",
    name: "25. Mini proiect — Pagină de blog",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează tag-ul pentru un articol de blog:\n```html\n<___>\n  <header>\n    <h2>Titlul articolului</h2>\n    <time datetime=\"2024-01-15\">15 Ian 2024</time>\n  </header>\n</___>\n```",
        answer: "article", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează tag-ul pentru lista de articole:\n```html\n<___ class=\"lista-articole\">\n  <article>...</article>\n  <article>...</article>\n</___>\n```",
        answer: "section", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează meta tag-ul Open Graph pentru titlu:\n```html\n<meta ___ =\"og:title\" content=\"Blog-ul meu\">\n```",
        answer: "property", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează tag-ul pentru categoria articolului:\n```html\n<p>Categorie: <___ class=\"tag\">HTML</___ ></p>\n```",
        answer: "span", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează tag-ul pentru navigarea între pagini (paginare):\n```html\n<___ aria-label=\"Paginare\">\n  <a href=\"?page=1\">1</a>\n  <a href=\"?page=2\">2</a>\n</___>\n```",
        answer: "nav", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `slugArticol` care transformă un titlu în slug (lowercase, spații înlocuite cu `-`). Testează cu `'Cum înveți HTML'`.",
        starterCode: "function slugArticol(titlu) {\n  // scrie codul aici\n}\n\nconsole.log(slugArticol('Cum înveți HTML'));",
        language: "javascript", expectedOutput: "cum-înveți-html", answer: "", options: []
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `rezumatArticol` care primește un text și returnează primele 50 de caractere urmate de `'...'`. Testează cu un text de 80 de caractere.",
        starterCode: "function rezumatArticol(text) {\n  // scrie codul aici\n}\n\nconsole.log(rezumatArticol('a'.repeat(80)));",
        language: "javascript", expectedOutput: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa...", answer: "", options: []
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `timpCitire` care primește numărul de cuvinte și returnează minutele de citire (200 cuvinte/minut, rotunjit în sus). Testează cu `450`.",
        starterCode: "function timpCitire(cuvinte) {\n  // scrie codul aici\n}\n\nconsole.log(timpCitire(450));",
        language: "javascript", expectedOutput: "3", answer: "", options: []
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `formatData` care primește `(zi, luna, an)` și returnează `'ZI Luna AN'`. Testează cu `(15, 'Ianuarie', 2024)`.",
        starterCode: "function formatData(zi, luna, an) {\n  // scrie codul aici\n}\n\nconsole.log(formatData(15, 'Ianuarie', 2024));",
        language: "javascript", expectedOutput: "15 Ianuarie 2024", answer: "", options: []
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `numarTaguri` care primește un string HTML și returnează de câte ori apare tag-ul `<p`. Testează cu `'<p>Unu</p><p>Doi</p>'`.",
        starterCode: "function numarTaguri(html) {\n  // scrie codul aici\n}\n\nconsole.log(numarTaguri('<p>Unu</p><p>Doi</p>'));",
        language: "javascript", expectedOutput: "2", answer: "", options: []
      }
    ]
  },
  {
    lessonId: "6a08ce7a999573855635c6b4",
    name: "26. Web Components — Custom Elements și Shadow DOM",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează clasa de bază pentru un Custom Element:\n```js\nclass MyCarda extends ___ {\n  constructor() { super(); }\n}\n```",
        answer: "HTMLElement", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează metoda ciclului de viață apelată când elementul este adăugat în DOM:\n```js\nclass MyEl extends HTMLElement {\n  ___() {\n    console.log('adăugat în DOM');\n  }\n}\n```",
        answer: "connectedCallback", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează metoda statică pentru a observa atribute:\n```js\nstatic get ___() {\n  return ['color', 'size'];\n}\n```",
        answer: "observedAttributes", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează modul Shadow DOM care permite acces extern:\n```js\nconst shadow = this.attachShadow({ mode: '___' });\n```",
        answer: "open", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează metoda ciclului de viață când un atribut se schimbă:\n```js\n___( name, oldVal, newVal) {\n  // reacționează la schimbare\n}\n```",
        answer: "attributeChangedCallback", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `esteCustomElement` care returnează `true` dacă un string de tag conține cratimă. Testează cu `'user-card'`.",
        starterCode: "function esteCustomElement(tag) {\n  // scrie codul aici\n}\n\nconsole.log(esteCustomElement('user-card'));",
        language: "javascript", expectedOutput: "true", answer: "", options: []
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `lifecycleCallbacks` care returnează array-ul cu callback-urile Custom Element în ordine. Afișează primul element.",
        starterCode: "function lifecycleCallbacks() {\n  // returnează ['connectedCallback','disconnectedCallback','attributeChangedCallback','adoptedCallback']\n}\n\nconsole.log(lifecycleCallbacks()[0]);",
        language: "javascript", expectedOutput: "connectedCallback", answer: "", options: []
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `shadowModeInfo` care primește `'open'` sau `'closed'` și returnează `'JS poate accesa shadow root'` sau `'JS nu poate accesa shadow root'`. Testează cu `'closed'`.",
        starterCode: "function shadowModeInfo(mode) {\n  // scrie codul aici\n}\n\nconsole.log(shadowModeInfo('closed'));",
        language: "javascript", expectedOutput: "JS nu poate accesa shadow root", answer: "", options: []
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `numarComponente` care primește un array de tag-uri și returnează câte sunt custom elements (conțin `-`). Testează cu `['div', 'my-btn', 'span', 'user-card']`.",
        starterCode: "function numarComponente(tags) {\n  // scrie codul aici\n}\n\nconsole.log(numarComponente(['div', 'my-btn', 'span', 'user-card']));",
        language: "javascript", expectedOutput: "2", answer: "", options: []
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `registryCheck` care primește un tag și returnează `'inregistrat'` dacă este în lista `['my-card', 'my-btn', 'app-header']`, altfel `'neinregistrat'`. Testează cu `'my-card'`.",
        starterCode: "function registryCheck(tag) {\n  const registry = ['my-card', 'my-btn', 'app-header'];\n  // scrie codul aici\n}\n\nconsole.log(registryCheck('my-card'));",
        language: "javascript", expectedOutput: "inregistrat", answer: "", options: []
      }
    ]
  },
  {
    lessonId: "6a08ce7d999573855635c6c8",
    name: "27. Progressive Web Apps (PWA)",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează tag-ul link pentru fișierul manifest:\n```html\n<link ___ =\"manifest\" href=\"/manifest.json\">\n```",
        answer: "rel", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează proprietatea manifestului care definește cum se deschide app-ul:\n```json\n{\n  \"___\": \"standalone\"\n}\n```",
        answer: "display", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează evenimentul Service Worker pentru caching:\n```js\nself.addEventListener('___', (e) => {\n  e.waitUntil(caches.open('v1'));\n});\n```",
        answer: "install", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează evenimentul Service Worker pentru interceptarea cererilor:\n```js\nself.addEventListener('___', (e) => {\n  e.respondWith(caches.match(e.request));\n});\n```",
        answer: "fetch", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează proprietatea manifestului pentru culoarea temei:\n```json\n{\n  \"___\": \"#3367D6\"\n}\n```",
        answer: "theme_color", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `estePWA` care verifică dacă un manifest are proprietățile `'name'`, `'start_url'` și `'display'`. Returnează `true`/`false`. Testează cu `{name:'App', start_url:'/', display:'standalone'}`.",
        starterCode: "function estePWA(manifest) {\n  // scrie codul aici\n}\n\nconsole.log(estePWA({name:'App', start_url:'/', display:'standalone'}));",
        language: "javascript", expectedOutput: "true", answer: "", options: []
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `displayMod` care primește un mod și returnează `'instalabil'` dacă este `'standalone'` sau `'fullscreen'`, altfel `'browser'`. Testează cu `'standalone'`.",
        starterCode: "function displayMod(mod) {\n  // scrie codul aici\n}\n\nconsole.log(displayMod('standalone'));",
        language: "javascript", expectedOutput: "instalabil", answer: "", options: []
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `strategieCache` care returnează array-ul cu strategii de cache: `['cache-first', 'network-first', 'stale-while-revalidate']`. Afișează a treia.",
        starterCode: "function strategieCache() {\n  // scrie codul aici\n}\n\nconsole.log(strategieCache()[2]);",
        language: "javascript", expectedOutput: "stale-while-revalidate", answer: "", options: []
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `iconSize` care primește o dimensiune și returnează `'WxH'` unde W=H=dimensiunea. Testează cu `192`.",
        starterCode: "function iconSize(d) {\n  // scrie codul aici\n}\n\nconsole.log(iconSize(192));",
        language: "javascript", expectedOutput: "192x192", answer: "", options: []
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `versiuneCache` care primește un număr de versiune și returnează `'cache-v' + versiune`. Testează cu `3`.",
        starterCode: "function versiuneCache(v) {\n  // scrie codul aici\n}\n\nconsole.log(versiuneCache(3));",
        language: "javascript", expectedOutput: "cache-v3", answer: "", options: []
      }
    ]
  },
  {
    lessonId: "6a08ce80999573855635c6dc",
    name: "28. Data Attributes, Microdata și Schema.org",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează atributul de date personalizat:\n```html\n<div ___-user-id=\"42\" ___-role=\"admin\">Ion</div>\n```",
        answer: "data", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează modul de acces JS la data attribute:\n```js\nconst id = element.___.userId;\n```",
        answer: "dataset", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează atributul Microdata pentru tipul de entitate:\n```html\n<div ___=\"https://schema.org/Person\">\n  <span itemprop=\"name\">Ion</span>\n</div>\n```",
        answer: "itemtype", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează atributul Microdata care marchează o proprietate:\n```html\n<div itemscope itemtype=\"https://schema.org/Person\">\n  <span ___=\"name\">Maria</span>\n</div>\n```",
        answer: "itemprop", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează atributul care marchează un element ca container Microdata:\n```html\n<div ___ itemtype=\"https://schema.org/Product\">\n  <span itemprop=\"name\">Laptop</span>\n</div>\n```",
        answer: "itemscope", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `dataAttr` care primește un key și o valoare și returnează string-ul atributului `data-`. Testează cu `('user-id', '42')`.",
        starterCode: "function dataAttr(key, val) {\n  // scrie codul aici\n}\n\nconsole.log(dataAttr('user-id', '42'));",
        language: "javascript", expectedOutput: "data-user-id=\"42\"", answer: "", options: []
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `camelCase` care convertește un string `kebab-case` în `camelCase`. Testează cu `'user-id'`.",
        starterCode: "function camelCase(str) {\n  // scrie codul aici\n}\n\nconsole.log(camelCase('user-id'));",
        language: "javascript", expectedOutput: "userId", answer: "", options: []
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `schemaType` care primește un tip (`'Person'`, `'Product'`, `'Article'`) și returnează URL-ul Schema.org complet. Testează cu `'Person'`.",
        starterCode: "function schemaType(tip) {\n  // scrie codul aici\n}\n\nconsole.log(schemaType('Person'));",
        language: "javascript", expectedOutput: "https://schema.org/Person", answer: "", options: []
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `numarDataAttr` care primește un array de atribute și returnează câte încep cu `'data-'`. Testează cu `['data-id', 'class', 'data-role', 'id']`.",
        starterCode: "function numarDataAttr(attrs) {\n  // scrie codul aici\n}\n\nconsole.log(numarDataAttr(['data-id', 'class', 'data-role', 'id']));",
        language: "javascript", expectedOutput: "2", answer: "", options: []
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `kebabCase` care convertește camelCase în kebab-case. Testează cu `'userId'`.",
        starterCode: "function kebabCase(str) {\n  // scrie codul aici\n}\n\nconsole.log(kebabCase('userId'));",
        language: "javascript", expectedOutput: "user-id", answer: "", options: []
      }
    ]
  },
  {
    lessonId: "6a08ce83999573855635c6f0",
    name: "29. Performance HTML — loading, defer, preload, lazy",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează atributul care amână execuția scriptului după parsarea HTML:\n```html\n<script src=\"app.js\" ___></script>\n```",
        answer: "defer", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează atributul care încarcă imaginile lazy (la nevoie):\n```html\n<img src=\"mare.jpg\" ___=\"lazy\" alt=\"Imagine\">\n```",
        answer: "loading", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează valoarea `rel` pentru preîncărcarea unui fișier CSS critic:\n```html\n<link rel=\"___\" href=\"stil.css\" as=\"style\">\n```",
        answer: "preload", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează atributul care încarcă scriptul asincron (nu blochează parsarea):\n```html\n<script src=\"analytics.js\" ___></script>\n```",
        answer: "async", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează valoarea `rel` pentru preconectarea la un domeniu extern:\n```html\n<link rel=\"___\" href=\"https://fonts.googleapis.com\">\n```",
        answer: "preconnect", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `diferentaAsyncDefer` care primește `'async'` sau `'defer'` și returnează o descriere scurtă: `'executa imediat dupa descarcare'` sau `'executa dupa parsare HTML'`. Testează cu `'defer'`.",
        starterCode: "function diferentaAsyncDefer(attr) {\n  // scrie codul aici\n}\n\nconsole.log(diferentaAsyncDefer('defer'));",
        language: "javascript", expectedOutput: "executa dupa parsare HTML", answer: "", options: []
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `scor` care primește un număr (0-100) și returnează `'rapid'` dacă >= 90, `'mediu'` dacă >= 50, altfel `'lent'`. Testează cu `95`.",
        starterCode: "function scor(val) {\n  // scrie codul aici\n}\n\nconsole.log(scor(95));",
        language: "javascript", expectedOutput: "rapid", answer: "", options: []
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `preloadTag` care primește un fișier și tipul (`'style'`, `'script'`, `'font'`) și returnează tag-ul `<link rel=\"preload\">`. Testează cu `('app.css', 'style')`.",
        starterCode: "function preloadTag(fisier, tip) {\n  // scrie codul aici\n}\n\nconsole.log(preloadTag('app.css', 'style'));",
        language: "javascript", expectedOutput: "<link rel=\"preload\" href=\"app.css\" as=\"style\">", answer: "", options: []
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `numarScripturi` care primește un array și returnează câte au `type === 'defer'`. Testează cu `[{type:'defer'},{type:'async'},{type:'defer'}]`.",
        starterCode: "function numarScripturi(arr) {\n  // scrie codul aici\n}\n\nconsole.log(numarScripturi([{type:'defer'},{type:'async'},{type:'defer'}]));",
        language: "javascript", expectedOutput: "2", answer: "", options: []
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `resourceHints` care returnează array-ul cu hint-urile de resurse: `['preload', 'prefetch', 'preconnect', 'dns-prefetch']`. Afișează al doilea element.",
        starterCode: "function resourceHints() {\n  // scrie codul aici\n}\n\nconsole.log(resourceHints()[1]);",
        language: "javascript", expectedOutput: "prefetch", answer: "", options: []
      }
    ]
  },
  {
    lessonId: "6a08ce86999573855635c704",
    name: "30. Mini Proiect HTML — Portfolio Complet",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează meta tag-ul viewport pentru mobile:\n```html\n<meta name=\"viewport\" content=\"___ =device-width, initial-scale=1.0\">\n```",
        answer: "width", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează tag-ul pentru figura cu legendă:\n```html\n<___>\n  <img src=\"proiect.jpg\" alt=\"Proiect\">\n  <figcaption>Proiectul meu</figcaption>\n</___>\n```",
        answer: "figure", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează atributul pentru deschiderea link-ului în tab nou:\n```html\n<a href=\"https://github.com\" ___=\"_blank\" rel=\"noopener\">GitHub</a>\n```",
        answer: "target", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează atributul `rel` pentru securitate la link extern:\n```html\n<a href=\"https://site.com\" target=\"_blank\" ___=\"noopener noreferrer\">Link</a>\n```",
        answer: "rel", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează tag-ul pentru secțiunea hero a portfolio-ului:\n```html\n<___ class=\"hero\">\n  <h1>Salut, sunt Ion!</h1>\n  <p>Web Developer</p>\n</___>\n```",
        answer: "section", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `sectiuniPortfolio` care returnează array-ul cu secțiunile unui portfolio. Afișează prima secțiune.",
        starterCode: "function sectiuniPortfolio() {\n  return ['hero', 'despre', 'proiecte', 'skills', 'contact'];\n}\n\nconsole.log(sectiuniPortfolio()[0]);",
        language: "javascript", expectedOutput: "hero", answer: "", options: []
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `numarProiectePortfolio` care primește un array de proiecte și returnează `'Portfolio: X proiecte'`. Testează cu 5 proiecte.",
        starterCode: "function numarProiectePortfolio(arr) {\n  // scrie codul aici\n}\n\nconsole.log(numarProiectePortfolio(['p1','p2','p3','p4','p5']));",
        language: "javascript", expectedOutput: "Portfolio: 5 proiecte", answer: "", options: []
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `skillLevel` care primește un procent și returnează `'junior'` dacă < 40, `'mid'` dacă < 70, altfel `'senior'`. Testează cu `75`.",
        starterCode: "function skillLevel(procent) {\n  // scrie codul aici\n}\n\nconsole.log(skillLevel(75));",
        language: "javascript", expectedOutput: "senior", answer: "", options: []
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `emailLink` care primește un email și returnează tag-ul `<a href=\"mailto:EMAIL\">EMAIL</a>`. Testează cu `'ion@exemplu.com'`.",
        starterCode: "function emailLink(email) {\n  // scrie codul aici\n}\n\nconsole.log(emailLink('ion@exemplu.com'));",
        language: "javascript", expectedOutput: "<a href=\"mailto:ion@exemplu.com\">ion@exemplu.com</a>", answer: "", options: []
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `tehnologii` care returnează array-ul `['HTML', 'CSS', 'JavaScript', 'React']` și afișează lungimea lui.",
        starterCode: "function tehnologii() {\n  // scrie codul aici\n}\n\nconsole.log(tehnologii().length);",
        language: "javascript", expectedOutput: "4", answer: "", options: []
      }
    ]
  },
  {
    lessonId: "6a09b1bd9384b94515fcf4e8",
    name: "31. HTML Email (Table Layout, Inline CSS)",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează atributul tabelului folosit în email pentru a elimina spațierea:\n```html\n<table ___=\"0\" cellpadding=\"0\" border=\"0\">\n```",
        answer: "cellspacing", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează unde se pune CSS-ul în emailuri HTML (pentru compatibilitate maximă):\n```html\n<td ___=\"color: #333; font-size: 16px;\">Text</td>\n```",
        answer: "style", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează DOCTYPE-ul recomandat pentru emailuri HTML:\n```html\n<!DOCTYPE ___>\n```",
        answer: "html", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează meta tag-ul pentru compatibilitate email Outlook:\n```html\n<meta http-equiv=\"X-UA-___\" content=\"IE=edge\">\n```",
        answer: "Compatible", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează tag-ul pentru imaginile din email cu lățime fixă:\n```html\n<img src=\"logo.png\" width=\"___\" height=\"60\" alt=\"Logo\">\n```",
        answer: "200", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `inlineStyle` care primește un obiect de stiluri și returnează string-ul CSS inline. Testează cu `{color: 'red', fontSize: '16px'}`.",
        starterCode: "function inlineStyle(obj) {\n  // scrie codul aici — convertește {color:'red', fontSize:'16px'} în 'color:red; font-size:16px;'\n}\n\nconsole.log(inlineStyle({color: 'red'}));",
        language: "javascript", expectedOutput: "color:red;", answer: "", options: []
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `latimeEmail` care returnează lățimea standard recomandată pentru email (600). Afișează `'600px'`.",
        starterCode: "function latimeEmail() {\n  // scrie codul aici\n}\n\nconsole.log(latimeEmail());",
        language: "javascript", expectedOutput: "600px", answer: "", options: []
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `clientiEmail` care returnează array-ul cu clienți de email populari. Afișează primul element.",
        starterCode: "function clientiEmail() {\n  return ['Outlook', 'Gmail', 'Apple Mail', 'Yahoo Mail'];\n}\n\nconsole.log(clientiEmail()[0]);",
        language: "javascript", expectedOutput: "Outlook", answer: "", options: []
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `culoareFallback` care primește o culoare hex și returnează `'background-color: HEX'`. Testează cu `'#ffffff'`.",
        starterCode: "function culoareFallback(hex) {\n  // scrie codul aici\n}\n\nconsole.log(culoareFallback('#ffffff'));",
        language: "javascript", expectedOutput: "background-color: #ffffff", answer: "", options: []
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `esteCompatibilEmail` care returnează `false` pentru proprietăți CSS nesuportate în email (`'flexbox'`, `'grid'`, `'animation'`). Testează cu `'grid'`.",
        starterCode: "function esteCompatibilEmail(prop) {\n  // scrie codul aici\n}\n\nconsole.log(esteCompatibilEmail('grid'));",
        language: "javascript", expectedOutput: "false", answer: "", options: []
      }
    ]
  },
  {
    lessonId: "6a09b1c09384b94515fcf4fc",
    name: "32. Internalizare HTML (lang, dir, charset, hreflang)",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează codul de limbă pentru română:\n```html\n<html lang=\"___\">\n```",
        answer: "ro", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează atributul pentru text de la dreapta la stânga (arabă):\n```html\n<html lang=\"ar\" ___=\"rtl\">\n```",
        answer: "dir", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează meta tag-ul pentru charset:\n```html\n<meta charset=\"___\">\n```",
        answer: "UTF-8", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează atributul link pentru versiunea alternativă în engleză:\n```html\n<link rel=\"alternate\" ___lang=\"en\" href=\"/en/\">\n```",
        answer: "href", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează tag-ul pentru text bidirecțional izolat:\n```html\n<p>Numele lui este <___ dir=\"rtl\">مرحبا</___ >.</p>\n```",
        answer: "bdi", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `codLimba` care primește o limbă în română și returnează codul BCP 47. Testează cu `'română'`.",
        starterCode: "function codLimba(limba) {\n  const coduri = {română: 'ro', engleză: 'en', franceză: 'fr', germană: 'de', arabă: 'ar'};\n  // scrie codul aici\n}\n\nconsole.log(codLimba('română'));",
        language: "javascript", expectedOutput: "ro", answer: "", options: []
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `dirText` care primește un cod de limbă și returnează `'rtl'` pentru `'ar'`, `'he'`, `'fa'`, altfel `'ltr'`. Testează cu `'ar'`.",
        starterCode: "function dirText(lang) {\n  // scrie codul aici\n}\n\nconsole.log(dirText('ar'));",
        language: "javascript", expectedOutput: "rtl", answer: "", options: []
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `hreflangTag` care primește o limbă și un URL și returnează tag-ul link hreflang. Testează cu `('en', '/en/')`.",
        starterCode: "function hreflangTag(lang, url) {\n  // scrie codul aici\n}\n\nconsole.log(hreflangTag('en', '/en/'));",
        language: "javascript", expectedOutput: "<link rel=\"alternate\" hreflang=\"en\" href=\"/en/\">", answer: "", options: []
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `numarLimbi` care primește un array de coduri de limbi și returnează numărul lor unic. Testează cu `['ro', 'en', 'fr', 'en', 'ro']`.",
        starterCode: "function numarLimbi(arr) {\n  // scrie codul aici\n}\n\nconsole.log(numarLimbi(['ro', 'en', 'fr', 'en', 'ro']));",
        language: "javascript", expectedOutput: "3", answer: "", options: []
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `charsetValid` care returnează `true` dacă charset-ul este `'UTF-8'` (case-insensitive). Testează cu `'utf-8'`.",
        starterCode: "function charsetValid(cs) {\n  // scrie codul aici\n}\n\nconsole.log(charsetValid('utf-8'));",
        language: "javascript", expectedOutput: "true", answer: "", options: []
      }
    ]
  },
  {
    lessonId: "6a09b1c29384b94515fcf510",
    name: "33. HTML si JavaScript APIs (Clipboard, Geolocation, Notification)",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează metoda Clipboard API pentru a copia text:\n```js\nawait navigator.clipboard.___('text de copiat');\n```",
        answer: "writeText", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează metoda Clipboard API pentru a citi text:\n```js\nconst text = await navigator.clipboard.___();\n```",
        answer: "readText", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează metoda Geolocation pentru a obține poziția curentă:\n```js\nnavigator.geolocation.___(onSuccess, onError);\n```",
        answer: "getCurrentPosition", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează proprietatea din obiectul `coords` pentru latitudine:\n```js\nfunction onSuccess(pos) {\n  console.log(pos.coords.___);\n}\n```",
        answer: "latitude", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează metoda pentru a solicita permisiunea pentru notificări:\n```js\nconst perm = await Notification.___();\n```",
        answer: "requestPermission", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `permisiuneNotificari` care primește `'granted'`, `'denied'` sau `'default'` și returnează `'activ'`, `'blocat'` sau `'nepermis'`. Testează cu `'granted'`.",
        starterCode: "function permisiuneNotificari(status) {\n  // scrie codul aici\n}\n\nconsole.log(permisiuneNotificari('granted'));",
        language: "javascript", expectedOutput: "activ", answer: "", options: []
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `formatCoordonate` care primește lat și lng și returnează `'LAT, LNG'` cu 4 zecimale. Testează cu `(44.4268, 26.1025)`.",
        starterCode: "function formatCoordonate(lat, lng) {\n  // scrie codul aici\n}\n\nconsole.log(formatCoordonate(44.4268, 26.1025));",
        language: "javascript", expectedOutput: "44.4268, 26.1025", answer: "", options: []
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `apiSuportata` care primește un nume de API și returnează `true` dacă este în lista `['clipboard', 'geolocation', 'notification', 'vibrate']`. Testează cu `'geolocation'`.",
        starterCode: "function apiSuportata(api) {\n  // scrie codul aici\n}\n\nconsole.log(apiSuportata('geolocation'));",
        language: "javascript", expectedOutput: "true", answer: "", options: []
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `titluNotificare` care primește un titlu și returnează string-ul limitat la 50 caractere. Testează cu un string de exact 30 caractere.",
        starterCode: "function titluNotificare(titlu) {\n  // scrie codul aici\n}\n\nconsole.log(titluNotificare('a'.repeat(30)));",
        language: "javascript", expectedOutput: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", answer: "", options: []
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `numarAPI` care returnează numărul de Web APIs enumerate (Clipboard, Geolocation, Notification, Vibration, Battery, Web Share = 6). Afișează rezultatul.",
        starterCode: "function numarAPI() {\n  // scrie codul aici\n}\n\nconsole.log(numarAPI());",
        language: "javascript", expectedOutput: "6", answer: "", options: []
      }
    ]
  },
  {
    lessonId: "6a09b1c59384b94515fcf524",
    name: "34. Custom Protocols si URL Schemes (mailto, tel, deep links)",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează schema URL pentru un link de email:\n```html\n<a href=\"___:contact@exemplu.com\">Trimite email</a>\n```",
        answer: "mailto", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează schema URL pentru un link de telefon:\n```html\n<a href=\"___:+40721234567\">Sună acum</a>\n```",
        answer: "tel", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează parametrul mailto pentru subiect:\n```html\n<a href=\"mailto:ion@ex.com?___=Salut\">Email cu subiect</a>\n```",
        answer: "subject", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează schema pentru un SMS:\n```html\n<a href=\"___:+40721234567\">Trimite SMS</a>\n```",
        answer: "sms", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează metoda pentru a înregistra un custom protocol handler:\n```js\nnavigator.registerProtocol___('web+myapp', '/handle?url=%s');\n```",
        answer: "Handler", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `mailtoLink` care primește un email și returnează `'mailto:EMAIL'`. Testează cu `'ion@ex.com'`.",
        starterCode: "function mailtoLink(email) {\n  // scrie codul aici\n}\n\nconsole.log(mailtoLink('ion@ex.com'));",
        language: "javascript", expectedOutput: "mailto:ion@ex.com", answer: "", options: []
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `telLink` care primește un număr de telefon și returnează `'tel:NUMAR'`. Testează cu `'+40721234567'`.",
        starterCode: "function telLink(numar) {\n  // scrie codul aici\n}\n\nconsole.log(telLink('+40721234567'));",
        language: "javascript", expectedOutput: "tel:+40721234567", answer: "", options: []
      },
        {
        number: 13, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `mailtoComplet` care primește email, subiect și corp și construiește URL-ul mailto complet. Testează cu `('ion@ex.com', 'Salut', 'Cum esti')`.",
        starterCode: "function mailtoComplet(email, subiect, corp) {\n  // scrie codul aici\n}\n\nconsole.log(mailtoComplet('ion@ex.com', 'Salut', 'Cum esti'));",
        language: "javascript", expectedOutput: "mailto:ion@ex.com?subject=Salut&body=Cum esti", answer: "", options: []
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `schemaURL` care primește un URL și returnează schema (ce e înainte de `:`). Testează cu `'mailto:ion@ex.com'`.",
        starterCode: "function schemaURL(url) {\n  // scrie codul aici\n}\n\nconsole.log(schemaURL('mailto:ion@ex.com'));",
        language: "javascript", expectedOutput: "mailto", answer: "", options: []
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `schemeCunoscute` care returnează array-ul cu scheme URL native: `['http', 'https', 'mailto', 'tel', 'sms', 'ftp']`. Afișează lungimea.",
        starterCode: "function schemeCunoscute() {\n  // scrie codul aici\n}\n\nconsole.log(schemeCunoscute().length);",
        language: "javascript", expectedOutput: "6", answer: "", options: []
      }
    ]
  },
  {
    lessonId: "6a09b1c89384b94515fcf538",
    name: "35. Mini Proiect HTML — Newsletter Template",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează tag-ul pentru secțiunea header a newsletter-ului:\n```html\n<___ style=\"background-color: #1a1a2e; padding: 20px;\">\n  <img src=\"logo.png\" alt=\"Logo\" width=\"150\">\n</___>\n```",
        answer: "header", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează tabelul pentru layout email cu lățime fixă:\n```html\n<table width=\"___\" cellspacing=\"0\" cellpadding=\"0\">\n  <tr><td>Conținut</td></tr>\n</table>\n```",
        answer: "600", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează tag-ul pentru butonul CTA din newsletter:\n```html\n<a href=\"https://site.com\" style=\"background:#007bff; color:white; padding:12px 24px; text-decoration:none; border-radius:4px; display:___\">Citește mai mult</a>\n```",
        answer: "inline-block", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează meta tag-ul pentru vizualizare mobilă în emailuri:\n```html\n<meta name=\"___\" content=\"width=device-width, initial-scale=1.0\">\n```",
        answer: "viewport", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează tag-ul pentru dezabonare (unsubscribe link):\n```html\n<___ href=\"mailto:unsub@exemplu.com?subject=Dezabonare\">Dezabonare</___ >\n```",
        answer: "a", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `sectiuniNewsletter` care returnează array-ul cu secțiunile unui newsletter: `['header', 'hero', 'continut', 'cta', 'footer']`. Afișează ultima secțiune.",
        starterCode: "function sectiuniNewsletter() {\n  // scrie codul aici\n}\n\nconst s = sectiuniNewsletter();\nconsole.log(s[s.length-1]);",
        language: "javascript", expectedOutput: "footer", answer: "", options: []
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `subjectNewsletter` care primește un număr de ediție și returnează `'Newsletter #X — Noutăți'`. Testează cu `5`.",
        starterCode: "function subjectNewsletter(nr) {\n  // scrie codul aici\n}\n\nconsole.log(subjectNewsletter(5));",
        language: "javascript", expectedOutput: "Newsletter #5 — Noutăți", answer: "", options: []
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `previewText` care primește un text și returnează primele 90 de caractere (preview în clientul de email). Testează cu un string de 100 de caractere.",
        starterCode: "function previewText(text) {\n  // scrie codul aici\n}\n\nconsole.log(previewText('a'.repeat(100)).length);",
        language: "javascript", expectedOutput: "90", answer: "", options: []
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `rataDeschiare` care primește deschideri și trimiteri și returnează procentul (rotunjit). Testează cu `(250, 1000)`.",
        starterCode: "function rataDeschiare(deschideri, trimiteri) {\n  // scrie codul aici\n}\n\nconsole.log(rataDeschiare(250, 1000));",
        language: "javascript", expectedOutput: "25", answer: "", options: []
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `formatListaAbonatilor` care primește un număr și returnează `'X abonați activi'`. Testează cu `1234`.",
        starterCode: "function formatListaAbonatilor(n) {\n  // scrie codul aici\n}\n\nconsole.log(formatListaAbonatilor(1234));",
        language: "javascript", expectedOutput: "1234 abonați activi", answer: "", options: []
      }
    ]
  }
];

async function main() {
  console.log("Fixing HTML lessons...");
  for (const fix of FIXES) {
    const del = await prisma.task.deleteMany({ where: { lessonId: fix.lessonId, number: { gte: 6 } } });
    await prisma.task.createMany({ data: fix.tasks.map(t => ({ ...t, lessonId: fix.lessonId })) });
    console.log(`✓ ${fix.name} — deleted ${del.count}, created ${fix.tasks.length}`);
  }
  console.log("Done.");
  await prisma.$disconnect();
}

main().catch(e => { console.error(e); process.exit(1); });
