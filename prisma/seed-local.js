/**
 * seed-local.js — Tasks generate direct de Claude, zero API extern.
 * Acoperă toate lecțiile rămase cu exerciții scrise manual de calitate.
 * Run: node prisma/seed-local.js
 */
require("dotenv").config({ path: ".env" });
const { PrismaClient } = require("@prisma/client");
const p = new PrismaClient();

// ─── BIBLIOTECA DE TASKS PE TOPICURI ───────────────────────────────────────
// Fiecare topic: { fillblanks: [...5], codings: [...5] }
// fillblank: { name, question (cu cod markdown), answer, explanation, difficulty }
// coding:    { name, question, starterCode, expectedOutput, difficulty }

const TOPICS = {

  // ── JAVASCRIPT ─────────────────────────────────────────────────────────────

  "js-for": {
    fillblanks: [
      { name: "Sumă cu for", difficulty: "easy",
        question: "Ce va afișa codul următor?\n```javascript\nlet s = 0;\nfor (let i = 1; i <= 4; i++) s += i;\nconsole.log(s);\n```",
        answer: "10", explanation: "1+2+3+4 = 10." },
      { name: "For cu condiție", difficulty: "easy",
        question: "Ce va afișa codul următor?\n```javascript\nfor (let i = 0; i < 5; i++) {\n  if (i % 2 === 0) console.log(i);\n}\n```",
        answer: "0\n2\n4", explanation: "Afișează numerele pare din 0-4." },
      { name: "For descrescător", difficulty: "medium",
        question: "Ce va afișa codul următor?\n```javascript\nlet r = '';\nfor (let i = 3; i >= 1; i--) r += i;\nconsole.log(r);\n```",
        answer: "321", explanation: "Concatenare: '3'+'2'+'1' = '321'." },
      { name: "For cu break", difficulty: "medium",
        question: "Ce va afișa codul următor?\n```javascript\nfor (let i = 0; i < 10; i++) {\n  if (i === 4) break;\n  console.log(i);\n}\n```",
        answer: "0\n1\n2\n3", explanation: "break oprește bucla când i=4, înainte de console.log(4)." },
      { name: "For nested", difficulty: "hard",
        question: "Ce va afișa codul următor?\n```javascript\nfor (let i = 1; i <= 2; i++)\n  for (let j = 1; j <= 2; j++)\n    console.log(i * j);\n```",
        answer: "1\n2\n2\n4", explanation: "i=1,j=1→1; i=1,j=2→2; i=2,j=1→2; i=2,j=2→4." },
    ],
    codings: [
      { name: "Suma pătrată", difficulty: "easy",
        question: "Calculează și afișează suma pătratelor numerelor de la 1 la 5 (1²+2²+3²+4²+5² = 55).",
        starterCode: "// TODO: declară suma cu valoarea 0\n// TODO: for de la 1 la 5\n// TODO: adaugă i*i la sumă\n// TODO: afișează suma\n",
        expectedOutput: "55" },
      { name: "Tabel înmulțire", difficulty: "easy",
        question: "Afișează tabla înmulțirii pentru 3 (3x1=3, 3x2=6, ... 3x5=15).",
        starterCode: "// TODO: for de la 1 la 5\n// TODO: console.log(`3 x ${i} = ${3*i}`)\n",
        expectedOutput: "3 x 1 = 3\n3 x 2 = 6\n3 x 3 = 9\n3 x 4 = 12\n3 x 5 = 15" },
      { name: "Numere pare", difficulty: "medium",
        question: "Afișează toate numerele pare dintre 1 și 20, separate prin virgulă pe o singură linie.",
        starterCode: "const pare = [];\n// TODO: for de la 1 la 20\n// TODO: if par, adaugă în array\nconsole.log(pare.join(', '));\n",
        expectedOutput: "2, 4, 6, 8, 10, 12, 14, 16, 18, 20" },
      { name: "Inversare string", difficulty: "medium",
        question: "Inversează string-ul 'JavaScript' caracter cu caracter folosind un for și afișează rezultatul.",
        starterCode: "const str = 'JavaScript';\nlet inv = '';\n// TODO: for de la ultimul la primul caracter\n// TODO: concatenează fiecare caracter la inv\nconsole.log(inv);\n",
        expectedOutput: "tpircSavaJ" },
      { name: "Verificare prim", difficulty: "hard",
        question: "Verifică dacă numărul 17 este prim. Afișează 'Da' sau 'Nu'.",
        starterCode: "const n = 17;\nlet estesPrim = true;\n// TODO: for de la 2 la Math.sqrt(n)\n// TODO: dacă n % i === 0, nu e prim\nconsole.log(estePrim ? 'Da' : 'Nu');\n",
        expectedOutput: "Da" },
    ],
  },

  "js-functions": {
    fillblanks: [
      { name: "Return valoare", difficulty: "easy",
        question: "Ce va afișa codul următor?\n```javascript\nfunction dublu(x) { return x * 2; }\nconsole.log(dublu(7));\n```",
        answer: "14", explanation: "dublu(7) = 7*2 = 14." },
      { name: "Default param", difficulty: "easy",
        question: "Ce va afișa codul următor?\n```javascript\nfunction salut(nume = 'lume') {\n  return `Salut, ${nume}!`;\n}\nconsole.log(salut());\nconsole.log(salut('Ana'));\n```",
        answer: "Salut, lume!\nSalut, Ana!", explanation: "Primul apel fără argument → valoare default 'lume'." },
      { name: "Arrow function", difficulty: "medium",
        question: "Ce va afișa codul următor?\n```javascript\nconst patrat = x => x ** 2;\nconst numere = [2, 3, 4];\nconsole.log(numere.map(patrat).join('-'));\n```",
        answer: "4-9-16", explanation: "map aplică patrat pe fiecare element: 4, 9, 16." },
      { name: "Closure", difficulty: "medium",
        question: "Ce va afișa codul următor?\n```javascript\nfunction contor() {\n  let n = 0;\n  return () => ++n;\n}\nconst c = contor();\nconsole.log(c());\nconsole.log(c());\nconsole.log(c());\n```",
        answer: "1\n2\n3", explanation: "Closure reține variabila n între apeluri." },
      { name: "Rest params", difficulty: "hard",
        question: "Ce va afișa codul următor?\n```javascript\nfunction suma(...args) {\n  return args.reduce((a, b) => a + b, 0);\n}\nconsole.log(suma(1, 2, 3, 4));\n```",
        answer: "10", explanation: "rest params colectează toți argumentii. 1+2+3+4=10." },
    ],
    codings: [
      { name: "Calculator IMC", difficulty: "easy",
        question: "Scrie o funcție calculeazaIMC(greutate, inaltime) care returnează IMC-ul (greutate/inaltime²). Testează cu 70kg, 1.75m.",
        starterCode: "// TODO: declară funcția cu parametrii greutate și inaltime\n// TODO: returnează greutate / (inaltime * inaltime)\nconsole.log(calculeazaIMC(70, 1.75).toFixed(2));\n",
        expectedOutput: "22.86" },
      { name: "Verificare palindrom", difficulty: "medium",
        question: "Scrie o funcție estePalindrom(str) care returnează true dacă string-ul e palindrom. Testează cu 'radar' și 'hello'.",
        starterCode: "// TODO: funcție care inversează string-ul\n// TODO: compară originalul cu inversul\nfunction estePalindrom(str) {\n  // TODO\n}\nconsole.log(estePalindrom('radar'));\nconsole.log(estePalindrom('hello'));\n",
        expectedOutput: "true\nfalse" },
      { name: "Funcție de medie", difficulty: "easy",
        question: "Scrie o funcție medie(arr) care returnează media unui array de numere. Testează cu [8, 6, 9, 7, 10].",
        starterCode: "function medie(arr) {\n  // TODO: calculează suma cu reduce\n  // TODO: împarte la lungimea array-ului\n}\nconsole.log(medie([8, 6, 9, 7, 10]));\n",
        expectedOutput: "8" },
      { name: "Funcție FizzBuzz", difficulty: "medium",
        question: "Scrie o funcție fizzBuzz(n) care returnează 'Fizz' dacă n e divizibil cu 3, 'Buzz' cu 5, 'FizzBuzz' cu ambii, altfel n. Testează cu 9, 10, 15, 7.",
        starterCode: "function fizzBuzz(n) {\n  // TODO: verifică divizibilitate\n}\n[9, 10, 15, 7].forEach(n => console.log(fizzBuzz(n)));\n",
        expectedOutput: "Fizz\nBuzz\nFizzBuzz\n7" },
      { name: "Factorial recursiv", difficulty: "hard",
        question: "Scrie o funcție recursivă factorial(n). Testează cu 5 și 0.",
        starterCode: "function factorial(n) {\n  // TODO: caz de bază n <= 1\n  // TODO: caz recursiv n * factorial(n-1)\n}\nconsole.log(factorial(5));\nconsole.log(factorial(0));\n",
        expectedOutput: "120\n1" },
    ],
  },

  "js-objects": {
    fillblanks: [
      { name: "Accesare proprietăți", difficulty: "easy",
        question: "Ce va afișa codul următor?\n```javascript\nconst masina = { marca: 'Dacia', an: 2022, km: 15000 };\nconsole.log(`${masina.marca} (${masina.an})`);\n```",
        answer: "Dacia (2022)", explanation: "Accesare cu dot notation." },
      { name: "Metodă obiect", difficulty: "easy",
        question: "Ce va afișa codul următor?\n```javascript\nconst cerc = {\n  raza: 5,\n  arie() { return Math.PI * this.raza ** 2; }\n};\nconsole.log(cerc.arie().toFixed(2));\n```",
        answer: "78.54", explanation: "π × 5² = 78.539... rotunjit 78.54." },
      { name: "Destructurare obiect", difficulty: "medium",
        question: "Ce va afișa codul următor?\n```javascript\nconst { nume, varsta, oras = 'Iași' } = { nume: 'Ion', varsta: 25 };\nconsole.log(`${nume}, ${varsta}, ${oras}`);\n```",
        answer: "Ion, 25, Iași", explanation: "oras nu există în obiect → valoare default 'Iași'." },
      { name: "Spread obiect", difficulty: "medium",
        question: "Ce va afișa codul următor?\n```javascript\nconst a = { x: 1, y: 2 };\nconst b = { ...a, y: 10, z: 3 };\nconsole.log(b.x, b.y, b.z);\n```",
        answer: "1 10 3", explanation: "Spread copiază x=1, y=2, dar y=10 îl suprascrie." },
      { name: "Object.keys", difficulty: "hard",
        question: "Ce va afișa codul următor?\n```javascript\nconst p = { a: 1, b: 2, c: 3 };\nconst s = Object.values(p).filter(v => v > 1).reduce((a,b) => a+b, 0);\nconsole.log(s);\n```",
        answer: "5", explanation: "Valorile > 1 sunt 2 și 3. Suma = 5." },
    ],
    codings: [
      { name: "Fișă elev", difficulty: "easy",
        question: "Creează un obiect 'elev' cu proprietățile: nume, nota1, nota2, nota3 și o metodă medie() care returnează media notelor. Afișează numele și media.",
        starterCode: "const elev = {\n  nume: 'Maria',\n  nota1: 8, nota2: 9, nota3: 7,\n  // TODO: metodă medie() care returnează (nota1+nota2+nota3)/3\n};\nconsole.log(`${elev.nume}: ${elev.medie()}`);\n",
        expectedOutput: "Maria: 8" },
      { name: "Inventar magazin", difficulty: "medium",
        question: "Ai un obiect stoc cu 3 produse și cantități. Filtrează produsele cu stoc 0 și afișează produsele disponibile.",
        starterCode: "const stoc = { mere: 50, lapte: 0, paine: 30, branza: 0, oua: 10 };\n// TODO: Object.entries() + filter(stoc>0) + map(name)\nconst disponibile = [];\nconsole.log(disponibile.join(', '));\n",
        expectedOutput: "mere, paine, oua" },
      { name: "Merge obiecte", difficulty: "medium",
        question: "Combină 2 obiecte de configurare: defaults și userConfig. userConfig suprascrie defaults. Afișează tema și dimensiunea finală.",
        starterCode: "const defaults = { tema: 'light', size: 14, lang: 'ro' };\nconst userConfig = { tema: 'dark', size: 16 };\n// TODO: merge cu spread operator\nconst config = {};\nconsole.log(config.tema);\nconsole.log(config.size);\n",
        expectedOutput: "dark\n16" },
      { name: "Grupare după categorie", difficulty: "hard",
        question: "Grupează array-ul de produse după categorie și afișează câte produse are fiecare categorie.",
        starterCode: "const produse = [\n  { nume: 'mere', cat: 'fructe' },\n  { nume: 'pere', cat: 'fructe' },\n  { nume: 'lapte', cat: 'lactate' },\n  { nume: 'iaurt', cat: 'lactate' },\n  { nume: 'paine', cat: 'panificatie' }\n];\n// TODO: reduce() pentru grupare\nconst grupe = {};\nObject.entries(grupe).forEach(([k,v]) => console.log(`${k}: ${v}`));\n",
        expectedOutput: "fructe: 2\nlactate: 2\npanificatie: 1" },
      { name: "Obiect bancă", difficulty: "hard",
        question: "Creează un obiect 'cont' cu sold inițial 1000, metode depune(suma) și retrage(suma) care actualizează soldul, și afișazeSold(). Execută operațiile și afișează soldul final.",
        starterCode: "const cont = {\n  sold: 1000,\n  // TODO: metodă depune(suma) - adaugă la sold\n  // TODO: metodă retrage(suma) - scade din sold\n  // TODO: metodă afisazeSold() - afișează 'Sold: X lei'\n};\ncont.depune(500);\ncont.retrage(200);\ncont.afisazeSold();\n",
        expectedOutput: "Sold: 1300 lei" },
    ],
  },

  "js-while": {
    fillblanks: [
      { name: "While simplu", difficulty: "easy",
        question: "Ce va afișa codul următor?\n```javascript\nlet i = 10;\nwhile (i > 7) {\n  console.log(i);\n  i--;\n}\n```",
        answer: "10\n9\n8", explanation: "Pornește de la 10 și scade cât timp > 7." },
      { name: "Do-while", difficulty: "easy",
        question: "Ce va afișa codul următor?\n```javascript\nlet n = 5;\nlet r = 1;\ndo {\n  r *= n;\n  n--;\n} while (n > 3);\nconsole.log(r);\n```",
        answer: "20", explanation: "n=5: r=5; n=4: r=20; n=3: condiție false, stop." },
      { name: "While cu break", difficulty: "medium",
        question: "Ce va afișa codul următor?\n```javascript\nlet x = 0;\nwhile (true) {\n  x += 3;\n  if (x > 10) break;\n}\nconsole.log(x);\n```",
        answer: "12", explanation: "3→6→9→12 (>10 → break). Valoarea la break e 12." },
      { name: "While acumulare", difficulty: "medium",
        question: "Ce va afișa codul următor?\n```javascript\nlet total = 0, i = 1;\nwhile (total < 15) {\n  total += i;\n  i++;\n}\nconsole.log(i - 1);\n```",
        answer: "5", explanation: "1+2+3+4+5=15 ≥ 15. La stop, i=6, deci i-1=5." },
      { name: "Colatz steps", difficulty: "hard",
        question: "Ce va afișa codul următor?\n```javascript\nlet n = 6, pasi = 0;\nwhile (n !== 1) {\n  n = n % 2 === 0 ? n / 2 : 3 * n + 1;\n  pasi++;\n}\nconsole.log(pasi);\n```",
        answer: "8", explanation: "6→3→10→5→16→8→4→2→1 = 8 pași." },
    ],
    codings: [
      { name: "Cifre sumă", difficulty: "easy",
        question: "Calculează suma cifrelor numărului 4823 folosind while (4+8+2+3=17).",
        starterCode: "let n = 4823;\nlet suma = 0;\n// TODO: while n > 0\n// TODO: suma += n % 10 (ultima cifra)\n// TODO: n = Math.floor(n / 10)\nconsole.log(suma);\n",
        expectedOutput: "17" },
      { name: "Putere 2", difficulty: "easy",
        question: "Afișează toate puterile lui 2 mai mici decât 100 (1, 2, 4, 8, 16, 32, 64).",
        starterCode: "let p = 1;\n// TODO: while p < 100\n// TODO: afișează p și înmulțește cu 2\n",
        expectedOutput: "1\n2\n4\n8\n16\n32\n64" },
      { name: "Număr invers", difficulty: "medium",
        question: "Inversează cifrele numărului 12345 → 54321 folosind while.",
        starterCode: "let n = 12345;\nlet inv = 0;\n// TODO: while n > 0\n// TODO: inv = inv * 10 + n % 10\n// TODO: n = Math.floor(n/10)\nconsole.log(inv);\n",
        expectedOutput: "54321" },
      { name: "Ghicește numărul", difficulty: "medium",
        question: "Simulează un joc: pornind de la ghes=1, crește cu +10 până ajungi la ținta 71. Afișează câte încercări au fost necesare.",
        starterCode: "const tinta = 71;\nlet ghes = 1;\nlet incercari = 0;\n// TODO: while ghes < tinta\n// TODO: ghes += 10, incercari++\nconsole.log(`Incercari: ${incercari}`);\n",
        expectedOutput: "Incercari: 7" },
      { name: "CMMDC", difficulty: "hard",
        question: "Calculează CMMDC al numerelor 48 și 18 folosind algoritmul lui Euclid (while).",
        starterCode: "let a = 48, b = 18;\n// TODO: while b !== 0: [a, b] = [b, a % b]\nconsole.log(`CMMDC: ${a}`);\n",
        expectedOutput: "CMMDC: 6" },
    ],
  },

  "js-switch": {
    fillblanks: [
      { name: "Switch simplu", difficulty: "easy",
        question: "Ce va afișa codul următor?\n```javascript\nconst zi = 3;\nswitch(zi) {\n  case 1: console.log('Luni'); break;\n  case 3: console.log('Miercuri'); break;\n  case 5: console.log('Vineri'); break;\n  default: console.log('Alta');\n}\n```",
        answer: "Miercuri", explanation: "case 3 se potrivește → 'Miercuri'." },
      { name: "Switch fallthrough", difficulty: "medium",
        question: "Ce va afișa codul următor?\n```javascript\nconst x = 2;\nswitch(x) {\n  case 1:\n  case 2:\n  case 3: console.log('mic'); break;\n  case 4:\n  case 5: console.log('mare'); break;\n}\n```",
        answer: "mic", explanation: "case 2 nu are break → fallthrough la case 3 care are break." },
      { name: "Switch string", difficulty: "easy",
        question: "Ce va afișa codul următor?\n```javascript\nconst sezon = 'vara';\nlet temp;\nswitch(sezon) {\n  case 'vara': temp = 35; break;\n  case 'iarna': temp = -5; break;\n  default: temp = 15;\n}\nconsole.log(temp);\n```",
        answer: "35", explanation: "case 'vara' setează temp=35." },
      { name: "Switch default", difficulty: "medium",
        question: "Ce va afișa codul următor?\n```javascript\nconst c = 'Z';\nswitch(c) {\n  case 'A': console.log(1); break;\n  case 'B': console.log(2); break;\n  default: console.log(0);\n}\n```",
        answer: "0", explanation: "Niciun case nu se potrivește → default." },
      { name: "Switch return", difficulty: "hard",
        question: "Ce va afișa codul următor?\n```javascript\nfunction nota(p) {\n  switch(true) {\n    case p >= 90: return 'A';\n    case p >= 70: return 'B';\n    case p >= 50: return 'C';\n    default: return 'F';\n  }\n}\nconsole.log(nota(85));\nconsole.log(nota(45));\n```",
        answer: "B\nF", explanation: "85≥70 → 'B'; 45<50 → 'F'." },
    ],
    codings: [
      { name: "Calculator operații", difficulty: "easy",
        question: "Folosind switch, implementează un calculator care aplică operatorul '+', '-', '*' sau '/' între 12 și 4. Testează toate 4 operații.",
        starterCode: "function calc(a, op, b) {\n  switch(op) {\n    // TODO: case '+': return a + b;\n    // TODO: case '-': case '*': case '/'\n    default: return 'operator invalid';\n  }\n}\nconsole.log(calc(12, '+', 4));\nconsole.log(calc(12, '-', 4));\nconsole.log(calc(12, '*', 4));\nconsole.log(calc(12, '/', 4));\n",
        expectedOutput: "16\n8\n48\n3" },
      { name: "Sezon din lună", difficulty: "easy",
        question: "Scrie o funcție sezon(luna) care returnează anotimpul pentru lunile 1-12 (dec/ian/feb=iarna, mar/apr/mai=primavara, iun/iul/aug=vara, sep/oct/nov=toamna). Testează cu 3, 7, 11.",
        starterCode: "function sezon(luna) {\n  switch(luna) {\n    // TODO: case 12: case 1: case 2: return 'iarna';\n    // TODO: adaugă celelalte anotimpuri\n  }\n}\nconsole.log(sezon(3));\nconsole.log(sezon(7));\nconsole.log(sezon(11));\n",
        expectedOutput: "primavara\nvara\ntoamna" },
      { name: "Tip zi", difficulty: "medium",
        question: "Scrie o funcție tipZi(nr) care returnează 'weekend' pentru 6,7 și 'weekday' pentru 1-5. Testează cu 3 și 6.",
        starterCode: "function tipZi(nr) {\n  switch(nr) {\n    // TODO\n  }\n}\nconsole.log(tipZi(3));\nconsole.log(tipZi(6));\n",
        expectedOutput: "weekday\nweekend" },
      { name: "Mesaj HTTP", difficulty: "medium",
        question: "Scrie o funcție mesajHTTP(cod) care returnează mesajul pentru codurile 200, 404, 500, altfel 'necunoscut'. Testează cu 404 și 302.",
        starterCode: "function mesajHTTP(cod) {\n  switch(cod) {\n    case 200: return 'OK';\n    // TODO: 404 → 'Not Found'\n    // TODO: 500 → 'Server Error'\n    default: return 'necunoscut';\n  }\n}\nconsole.log(mesajHTTP(404));\nconsole.log(mesajHTTP(302));\n",
        expectedOutput: "Not Found\nnecunoscut" },
      { name: "Reducere fidelitate", difficulty: "hard",
        question: "Scrie o funcție reducere(nivel) cu switch: 'gold'→20%, 'silver'→10%, 'bronze'→5%, altfel 0%. Calculează prețul final pentru 100 lei la fiecare nivel.",
        starterCode: "function reducere(nivel) {\n  switch(nivel) {\n    // TODO: returnează procentul pentru fiecare nivel\n  }\n}\n['gold','silver','bronze','none'].forEach(n =>\n  console.log(`${n}: ${100 * (1 - reducere(n)/100)} lei`)\n);\n",
        expectedOutput: "gold: 80 lei\nsilver: 90 lei\nbronze: 95 lei\nnone: 100 lei" },
    ],
  },

  "js-closures": {
    fillblanks: [
      { name: "Closure counter", difficulty: "medium",
        question: "Ce va afișa codul următor?\n```javascript\nfunction makeCounter(start) {\n  let count = start;\n  return { inc: () => ++count, get: () => count };\n}\nconst c = makeCounter(5);\nc.inc(); c.inc();\nconsole.log(c.get());\n```",
        answer: "7", explanation: "Start=5, două incrementări → 7." },
      { name: "Closure scope", difficulty: "medium",
        question: "Ce va afișa codul următor?\n```javascript\nconst fns = [];\nfor (let i = 0; i < 3; i++) {\n  fns.push(() => i);\n}\nconsole.log(fns[0](), fns[1](), fns[2]());\n```",
        answer: "0 1 2", explanation: "Cu 'let', fiecare iterație are propriul scope pentru i." },
      { name: "Partial application", difficulty: "hard",
        question: "Ce va afișa codul următor?\n```javascript\nconst inmulteste = a => b => a * b;\nconst triple = inmulteste(3);\nconsole.log(triple(4));\nconsole.log(triple(7));\n```",
        answer: "12\n21", explanation: "triple e o funcție parțial aplicată cu a=3." },
      { name: "Memoize", difficulty: "hard",
        question: "Ce va afișa codul următor?\n```javascript\nfunction memoize(fn) {\n  const cache = {};\n  return x => cache[x] ?? (cache[x] = fn(x));\n}\nconst sq = memoize(x => x * x);\nconsole.log(sq(4), sq(4), sq(5));\n```",
        answer: "16 16 25", explanation: "sq(4) calculează prima dată, a doua oară din cache." },
      { name: "IIFE", difficulty: "medium",
        question: "Ce va afișa codul următor?\n```javascript\nconst rezultat = (function(x, y) {\n  return x * x + y * y;\n})(3, 4);\nconsole.log(rezultat);\n```",
        answer: "25", explanation: "IIFE se execută imediat: 9+16=25." },
    ],
    codings: [
      { name: "Contor multiplu", difficulty: "medium",
        question: "Creează o funcție makeContor(pas) care returnează o funcție ce crește un număr cu `pas` la fiecare apel. Testează cu pas=2 și pas=5.",
        starterCode: "function makeContor(pas) {\n  let val = 0;\n  // TODO: returnează o funcție care adaugă pas la val și returnează val\n}\nconst cu2 = makeContor(2);\nconst cu5 = makeContor(5);\nconsole.log(cu2(), cu2(), cu2());\nconsole.log(cu5(), cu5());\n",
        expectedOutput: "2 4 6\n5 10" },
      { name: "Cache funcție", difficulty: "hard",
        question: "Implementează o funcție memoize(fn) care cache-uiește rezultatele. Testează cu o funcție de calcul lent (x => x*x*x).",
        starterCode: "function memoize(fn) {\n  const cache = new Map();\n  // TODO: returnează o funcție care verifică cache-ul\n  // TODO: dacă nu e în cache, calculează și salvează\n}\nconst cub = memoize(x => x ** 3);\nconsole.log(cub(3));\nconsole.log(cub(4));\nconsole.log(cub(3));\n",
        expectedOutput: "27\n64\n27" },
      { name: "Generator ID", difficulty: "medium",
        question: "Creează o funcție makeIdGenerator(prefix) care returnează o funcție ce generează ID-uri unice incrementale.",
        starterCode: "function makeIdGenerator(prefix) {\n  let nr = 0;\n  // TODO: returnează () => `${prefix}-${++nr}`\n}\nconst genUser = makeIdGenerator('USR');\nconsole.log(genUser());\nconsole.log(genUser());\nconsole.log(genUser());\n",
        expectedOutput: "USR-1\nUSR-2\nUSR-3" },
      { name: "Rate limiter", difficulty: "hard",
        question: "Creează o funcție once(fn) care permite apelarea lui fn o singură dată, returnând undefined după primul apel.",
        starterCode: "function once(fn) {\n  let apelat = false;\n  let rezultat;\n  // TODO: returnează o funcție care verifică dacă a mai fost apelată\n}\nconst init = once(() => 'initialized');\nconsole.log(init());\nconsole.log(init());\nconsole.log(init());\n",
        expectedOutput: "initialized\nundefined\nundefined" },
      { name: "Curry 3 args", difficulty: "hard",
        question: "Implementează o funcție curry(fn) care transformă o funcție de 3 argumente în curry form. Testează cu o funcție de adunare.",
        starterCode: "function curry(fn) {\n  // TODO: returnează a => b => c => fn(a, b, c)\n}\nconst aduna3 = curry((a, b, c) => a + b + c);\nconsole.log(aduna3(1)(2)(3));\nconsole.log(aduna3(10)(20)(30));\n",
        expectedOutput: "6\n60" },
    ],
  },

  "js-async": {
    fillblanks: [
      { name: "Promise resolve", difficulty: "medium",
        question: "Ce va afișa codul următor?\n```javascript\nconst p = Promise.resolve(42);\np.then(v => console.log(v * 2));\n```",
        answer: "84", explanation: "Promise.resolve(42) rezolvă imediat cu 42, then primește 42 → 84." },
      { name: "Async return", difficulty: "medium",
        question: "Ce va afișa codul următor?\n```javascript\nasync function getVal() {\n  return 'success';\n}\ngetVal().then(v => console.log(v));\n```",
        answer: "success", explanation: "async returnează întotdeauna o Promise. then primește valoarea returnată." },
      { name: "Promise chain", difficulty: "hard",
        question: "Ce va afișa codul următor?\n```javascript\nPromise.resolve(5)\n  .then(x => x * 2)\n  .then(x => x + 3)\n  .then(x => console.log(x));\n```",
        answer: "13", explanation: "5→10→13. Fiecare then primește rezultatul precedentului." },
      { name: "Await valoare", difficulty: "medium",
        question: "Ce va afișa codul următor?\n```javascript\nasync function run() {\n  const x = await Promise.resolve(10);\n  const y = await Promise.resolve(20);\n  console.log(x + y);\n}\nrun();\n```",
        answer: "30", explanation: "await așteaptă rezolvarea fiecărei Promise: 10+20=30." },
      { name: "Promise.all", difficulty: "hard",
        question: "Ce va afișa codul următor?\n```javascript\nasync function main() {\n  const [a, b, c] = await Promise.all([\n    Promise.resolve(1),\n    Promise.resolve(2),\n    Promise.resolve(3)\n  ]);\n  console.log(a + b + c);\n}\nmain();\n```",
        answer: "6", explanation: "Promise.all rezolvă toate 3 în paralel și destructurează rezultatele." },
    ],
    codings: [
      { name: "Fetch simulat", difficulty: "medium",
        question: "Creează o funcție async fetchDate() care simulează un fetch cu un Promise ce rezolvă după 0ms cu obiectul {zi: 15, luna: 5}. Afișează ziua și luna.",
        starterCode: "async function fetchDate() {\n  // TODO: await un Promise.resolve({zi:15, luna:5})\n  // TODO: afișează 'Zi: X, Luna: Y'\n}\nfetchDate();\n",
        expectedOutput: "Zi: 15, Luna: 5" },
      { name: "Try-catch async", difficulty: "medium",
        question: "Creează o funcție async care face await pe un Promise ce se respinge cu 'Eroare rețea' și prinde eroarea cu try-catch.",
        starterCode: "async function cerere() {\n  try {\n    // TODO: await Promise.reject('Eroare retea')\n  } catch(err) {\n    // TODO: console.log('Prins:', err)\n  }\n}\ncerere();\n",
        expectedOutput: "Prins: Eroare retea" },
      { name: "Secvențial vs paralel", difficulty: "hard",
        question: "Calculează suma a 3 valori obținute din Promise.resolve(10), (20), (30) în paralel cu Promise.all. Afișează suma.",
        starterCode: "async function main() {\n  // TODO: Promise.all([resolve(10), resolve(20), resolve(30)])\n  // TODO: destructurează și afișează suma\n}\nmain();\n",
        expectedOutput: "60" },
      { name: "Retry logic", difficulty: "hard",
        question: "Implementează o funcție async retry(fn, n) care încearcă fn de n ori. Testează cu o funcție care eșuează primele 2 ori.",
        starterCode: "async function retry(fn, ori) {\n  for (let i = 0; i < ori; i++) {\n    try {\n      // TODO: return await fn();\n    } catch(e) {\n      if (i === ori - 1) throw e;\n    }\n  }\n}\nlet incercari = 0;\nretry(() => {\n  incercari++;\n  if (incercari < 3) throw new Error('fail');\n  return 'ok';\n}, 5).then(r => console.log(r, incercari));\n",
        expectedOutput: "ok 3" },
      { name: "Promise race", difficulty: "hard",
        question: "Folosind Promise.race, determină care din 3 promisiuni se rezolvă prima. Testează cu valori imediate în ordinea 'C', 'A', 'B'.",
        starterCode: "const p1 = Promise.resolve('A');\nconst p2 = Promise.resolve('B');\nconst p3 = Promise.resolve('C');\n// TODO: Promise.race([p3, p1, p2]).then(console.log)\n",
        expectedOutput: "C" },
    ],
  },

  "js-classes": {
    fillblanks: [
      { name: "Constructor", difficulty: "easy",
        question: "Ce va afișa codul următor?\n```javascript\nclass Animal {\n  constructor(nume, sunet) {\n    this.nume = nume;\n    this.sunet = sunet;\n  }\n  vorbeste() { return `${this.nume}: ${this.sunet}!`; }\n}\nconst c = new Animal('Pisica', 'Miau');\nconsole.log(c.vorbeste());\n```",
        answer: "Pisica: Miau!", explanation: "Metoda folosește this.nume și this.sunet setate în constructor." },
      { name: "Extends", difficulty: "medium",
        question: "Ce va afișa codul următor?\n```javascript\nclass Forma { arie() { return 0; } }\nclass Patrat extends Forma {\n  constructor(l) { super(); this.l = l; }\n  arie() { return this.l ** 2; }\n}\nconsole.log(new Patrat(5).arie());\n```",
        answer: "25", explanation: "Patrat suprascrie arie(). 5²=25." },
      { name: "Static method", difficulty: "medium",
        question: "Ce va afișa codul următor?\n```javascript\nclass Matematica {\n  static max(a, b) { return a > b ? a : b; }\n}\nconsole.log(Matematica.max(8, 13));\n```",
        answer: "13", explanation: "Metodele statice se apelează pe clasă, nu pe instanță." },
      { name: "Getter/Setter", difficulty: "hard",
        question: "Ce va afișa codul următor?\n```javascript\nclass Temperatura {\n  constructor(c) { this._c = c; }\n  get fahrenheit() { return this._c * 9/5 + 32; }\n}\nconsole.log(new Temperatura(100).fahrenheit);\n```",
        answer: "212", explanation: "100°C × 9/5 + 32 = 180 + 32 = 212°F." },
      { name: "instanceof", difficulty: "easy",
        question: "Ce va afișa codul următor?\n```javascript\nclass A {}\nclass B extends A {}\nconst b = new B();\nconsole.log(b instanceof B);\nconsole.log(b instanceof A);\n```",
        answer: "true\ntrue", explanation: "instanceof verifică lanțul de prototipuri. B extinde A." },
    ],
    codings: [
      { name: "Clasă Produs", difficulty: "easy",
        question: "Creează o clasă Produs cu constructor(nume, pret, cantitate) și metodă totalStoc() care returnează pret*cantitate. Testează cu 3 produse.",
        starterCode: "class Produs {\n  constructor(nume, pret, cantitate) {\n    // TODO: this.nume = etc.\n  }\n  totalStoc() {\n    // TODO: return pret * cantitate\n  }\n}\nconst p1 = new Produs('Mere', 3, 10);\nconst p2 = new Produs('Lapte', 5, 6);\nconsole.log(p1.totalStoc());\nconsole.log(p2.totalStoc());\n",
        expectedOutput: "30\n30" },
      { name: "Cont bancar OOP", difficulty: "medium",
        question: "Creează o clasă ContBancar cu sold inițial, metode depune/retrage care validează suma pozitivă și afișazeSold.",
        starterCode: "class ContBancar {\n  constructor(soldInitial) {\n    this.sold = soldInitial;\n  }\n  depune(suma) {\n    // TODO: if suma > 0: this.sold += suma\n  }\n  retrage(suma) {\n    // TODO: if suma > 0 && suma <= this.sold: this.sold -= suma\n  }\n  afisazeSold() {\n    console.log(`Sold: ${this.sold} lei`);\n  }\n}\nconst c = new ContBancar(500);\nc.depune(300);\nc.retrage(100);\nc.afisazeSold();\n",
        expectedOutput: "Sold: 700 lei" },
      { name: "Moștenire vehicule", difficulty: "medium",
        question: "Creează clasele Vehicul (viteza, marca) și Masina extends Vehicul (nr_portiere). Suprascrie toString().",
        starterCode: "class Vehicul {\n  constructor(marca, viteza) {\n    this.marca = marca; this.viteza = viteza;\n  }\n  toString() { return `${this.marca} (${this.viteza}km/h)`; }\n}\nclass Masina extends Vehicul {\n  constructor(marca, viteza, portiere) {\n    // TODO: super(marca, viteza)\n    // TODO: this.portiere = portiere\n  }\n  toString() {\n    // TODO: return super.toString() + `, ${this.portiere} portiere`\n  }\n}\nconsole.log(new Masina('Dacia', 180, 5).toString());\n",
        expectedOutput: "Dacia (180km/h), 5 portiere" },
      { name: "Clasă stivă", difficulty: "hard",
        question: "Implementează o clasă Stiva cu metode push, pop, peek (ultimul element) și isEmpty. Testează cu câteva operații.",
        starterCode: "class Stiva {\n  constructor() { this.items = []; }\n  push(item) { /* TODO */ }\n  pop() { /* TODO: returnează și elimină ultimul */ }\n  peek() { /* TODO: returnează ultimul fără a elimina */ }\n  isEmpty() { /* TODO */ }\n}\nconst s = new Stiva();\ns.push(1); s.push(2); s.push(3);\nconsole.log(s.peek());\nconsole.log(s.pop());\nconsole.log(s.isEmpty());\n",
        expectedOutput: "3\n3\nfalse" },
      { name: "Observer pattern", difficulty: "hard",
        question: "Implementează un EventEmitter simplu cu metode on(event, fn) și emit(event, ...args).",
        starterCode: "class EventEmitter {\n  constructor() { this.events = {}; }\n  on(event, fn) {\n    // TODO: adaugă fn în this.events[event]\n  }\n  emit(event, ...args) {\n    // TODO: apelează toți listenerii pentru event\n  }\n}\nconst e = new EventEmitter();\ne.on('salut', (nume) => console.log(`Salut, ${nume}!`));\ne.on('salut', (nume) => console.log(`Buna ziua, ${nume}!`));\ne.emit('salut', 'Maria');\n",
        expectedOutput: "Salut, Maria!\nBuna ziua, Maria!" },
    ],
  },

  // ── HTML ───────────────────────────────────────────────────────────────────

  "html-basic": {
    fillblanks: [
      { name: "Tag titlu", difficulty: "easy",
        question: "Ce tag HTML creează titlul principal al paginii (cel mai mare)?\n```html\n<___>Bine ați venit</___>\n```",
        answer: "h1", explanation: "<h1> este cel mai important titlu HTML (heading level 1)." },
      { name: "Tag paragraf", difficulty: "easy",
        question: "Ce atribut lipsește din imaginea HTML pentru accesibilitate?\n```html\n<img src=\"foto.jpg\" ___=\"Fotografia mea\">\n```",
        answer: "alt", explanation: "alt oferă text alternativ pentru screen readere și când imaginea nu se încarcă." },
      { name: "Link target", difficulty: "medium",
        question: "Ce valoare a atributului target deschide link-ul în tab nou?\n```html\n<a href=\"https://ex.com\" target=\"___\">Link</a>\n```",
        answer: "_blank", explanation: "target='_blank' deschide link-ul într-un tab/fereastră nouă." },
      { name: "Input type", difficulty: "medium",
        question: "Ce tip de input creează un câmp pentru email?\n```html\n<input type=\"___\" name=\"email\">\n```",
        answer: "email", explanation: "type='email' validează automat formatul adresei de email." },
      { name: "Semantic section", difficulty: "hard",
        question: "Ce tag semantic HTML5 înlocuiește <div class='header'>?\n```html\n<___>\n  <h1>Titlul site-ului</h1>\n</___>\n```",
        answer: "header", explanation: "<header> este tagul semantic pentru zona de sus a paginii." },
    ],
    codings: [
      { name: "Card produs HTML", difficulty: "easy",
        question: "Creează un card HTML pentru un produs cu: h2 (nume), paragraf (descriere), span (preț), link (Cumpără).",
        starterCode: "<!-- TODO: div.card -->\n<!-- TODO: h2 cu 'Laptop ProMax' -->\n<!-- TODO: p cu 'Performanță maximă pentru profesioniști' -->\n<!-- TODO: span cu '4999 lei' -->\n<!-- TODO: a href='#' cu text 'Cumpără acum' -->\n",
        expectedOutput: "" },
      { name: "Meniu navigare", difficulty: "easy",
        question: "Creează un meniu de navigare semantic cu 4 link-uri: Acasă, Despre, Portofoliu, Contact.",
        starterCode: "<!-- TODO: tag <nav> -->\n  <!-- TODO: <ul> cu 4 <li> -->\n    <!-- TODO: fiecare cu <a href='#sectiune'>Text</a> -->\n<!-- TODO: inchide nav -->\n",
        expectedOutput: "" },
      { name: "Formular contact", difficulty: "medium",
        question: "Creează un formular HTML cu câmpuri pentru: Nume (text), Email (email), Mesaj (textarea) și un buton Trimite.",
        starterCode: "<!-- TODO: <form> -->\n  <!-- TODO: label + input type text pentru Nume -->\n  <!-- TODO: label + input type email -->\n  <!-- TODO: label + textarea pentru Mesaj -->\n  <!-- TODO: button type submit -->\n<!-- TODO: </form> -->\n",
        expectedOutput: "" },
      { name: "Tabel clasament", difficulty: "medium",
        question: "Creează un tabel HTML cu antet (Loc, Jucător, Puncte) și 3 rânduri de date pentru un clasament.",
        starterCode: "<!-- TODO: <table> cu border='1' -->\n  <!-- TODO: <thead> cu <tr> si 3 <th> -->\n  <!-- TODO: <tbody> cu 3 <tr>, fiecare cu 3 <td> -->\n",
        expectedOutput: "" },
      { name: "Pagina completă", difficulty: "hard",
        question: "Creează o pagină HTML semantică completă cu: <header> (nav cu 3 link-uri), <main> (<article> cu titlu + text), <footer> (copyright).",
        starterCode: "<!DOCTYPE html>\n<html lang=\"ro\">\n<head>\n  <!-- TODO: meta charset, title -->\n</head>\n<body>\n  <!-- TODO: header cu nav -->\n  <!-- TODO: main cu article -->\n  <!-- TODO: footer cu copyright -->\n</body>\n</html>\n",
        expectedOutput: "" },
    ],
  },

  // ── CSS ────────────────────────────────────────────────────────────────────

  "css-basic": {
    fillblanks: [
      { name: "Box model padding", difficulty: "easy",
        question: "Ce proprietate adaugă spațiu INTERIOR unui element?\n```css\n.box { ___: 20px; background: blue; }\n```",
        answer: "padding", explanation: "padding adaugă spațiu între conținut și border (interior)." },
      { name: "Flexbox axă", difficulty: "medium",
        question: "Ce proprietate CSS aliniază elementele flex pe axa secundară (verticală când flex-direction=row)?\n```css\n.container { display: flex; ___: center; }\n```",
        answer: "align-items", explanation: "align-items controlează alinierea pe axa cross (perpendiculară pe flex-direction)." },
      { name: "Grid coloane", difficulty: "medium",
        question: "Ce proprietate CSS creează un grid cu 3 coloane egale?\n```css\n.grid { display: grid; ___: repeat(3, 1fr); }\n```",
        answer: "grid-template-columns", explanation: "grid-template-columns definește numărul și dimensiunea coloanelor." },
      { name: "Pseudo-class hover", difficulty: "easy",
        question: "Ce pseudo-clasă CSS aplică stiluri când mouse-ul e deasupra elementului?\n```css\n.btn:___ { background: blue; }\n```",
        answer: "hover", explanation: ":hover se activează când utilizatorul trece cu mouse-ul peste element." },
      { name: "Media query", difficulty: "hard",
        question: "Ce valoare media query aplicăm stiluri DOAR pe ecrane mai mari de 768px?\n```css\n@media (___: 768px) { .nav { display: flex; } }\n```",
        answer: "min-width", explanation: "min-width aplică stiluri când lățimea ecranului depășește valoarea specificată." },
    ],
    codings: [
      { name: "Card cu shadow", difficulty: "easy",
        question: "Stilizează un card cu: fundal alb, colțuri rotunjite 12px, umbră subtilă, padding 24px, max-width 400px, centrat.",
        starterCode: ".card {\n  /* TODO: background white */\n  /* TODO: border-radius 12px */\n  /* TODO: box-shadow: 0 4px 12px rgba(0,0,0,0.1) */\n  /* TODO: padding 24px */\n  /* TODO: max-width 400px */\n  /* TODO: margin auto */\n}\n",
        expectedOutput: "" },
      { name: "Navbar flexbox", difficulty: "medium",
        question: "Creează un navbar cu flexbox: logo la stânga, link-uri la dreapta, aliniate vertical pe centru, fundal #1a1a2e, text alb.",
        starterCode: ".navbar {\n  display: flex;\n  /* TODO: justify-content space-between */\n  /* TODO: align-items center */\n  /* TODO: background #1a1a2e */\n  /* TODO: padding 0 24px */\n  /* TODO: height 60px */\n}\n.navbar .logo { color: white; font-weight: bold; }\n.navbar .links { /* TODO: display flex, gap 20px */ }\n.navbar a { color: white; text-decoration: none; }\n",
        expectedOutput: "" },
      { name: "Grid galerie", difficulty: "medium",
        question: "Creează un grid responsive pentru galerie foto: 3 coloane pe desktop, 2 pe tabletă (< 768px), 1 pe mobil (< 480px).",
        starterCode: ".galerie {\n  display: grid;\n  /* TODO: 3 coloane egale cu 1fr */\n  /* TODO: gap 16px */\n}\n@media (max-width: 768px) {\n  .galerie { /* TODO: 2 coloane */ }\n}\n@media (max-width: 480px) {\n  .galerie { /* TODO: 1 coloană */ }\n}\n",
        expectedOutput: "" },
      { name: "Buton animat", difficulty: "medium",
        question: "Stilizează un buton cu tranziție smooth la hover: culoare de fond se schimbă din #3498db la #2980b9, scala crește la 1.05.",
        starterCode: ".btn {\n  background: #3498db;\n  color: white;\n  padding: 12px 24px;\n  border: none;\n  border-radius: 8px;\n  cursor: pointer;\n  /* TODO: transition all 0.3s ease */\n}\n.btn:hover {\n  /* TODO: background #2980b9 */\n  /* TODO: transform scale(1.05) */\n}\n",
        expectedOutput: "" },
      { name: "Layout complet", difficulty: "hard",
        question: "Creează un layout cu CSS Grid: header (full-width), sidebar (250px), main (flex-grow), footer (full-width). Minimum 100vh.",
        starterCode: "body {\n  display: grid;\n  /* TODO: grid-template-areas cu header/sidebar+main/footer */\n  /* TODO: grid-template-columns 250px 1fr */\n  /* TODO: grid-template-rows auto 1fr auto */\n  /* TODO: min-height 100vh */\n}\nheader { grid-area: header; background: #2c3e50; color: white; padding: 16px; }\n.sidebar { grid-area: sidebar; background: #ecf0f1; padding: 16px; }\nmain { grid-area: main; padding: 16px; }\nfooter { grid-area: footer; background: #2c3e50; color: white; padding: 16px; text-align: center; }\n",
        expectedOutput: "" },
    ],
  },

  // ── SQL ────────────────────────────────────────────────────────────────────

  "sql-basic": {
    fillblanks: [
      { name: "SELECT WHERE", difficulty: "easy",
        question: "Ce clauză SQL filtrează rândurile din rezultat?\n```sql\nSELECT * FROM produse\n___ pret > 100;\n```",
        answer: "WHERE", explanation: "WHERE filtrează rândurile care satisfac condiția dată." },
      { name: "ORDER BY DESC", difficulty: "easy",
        question: "Ce cuvânt cheie sortează rezultatele descrescător?\n```sql\nSELECT * FROM angajati ORDER BY salariu ___;\n```",
        answer: "DESC", explanation: "DESC (descending) sortează de la cel mai mare la cel mai mic." },
      { name: "COUNT GROUP BY", difficulty: "medium",
        question: "Ce funcție numără rândurile dintr-un grup?\n```sql\nSELECT departament, ___(*)  AS nr\nFROM angajati GROUP BY departament;\n```",
        answer: "COUNT", explanation: "COUNT(*) numără toate rândurile, inclusiv cele cu NULL." },
      { name: "JOIN ON", difficulty: "medium",
        question: "Ce clauză specifică condiția de join?\n```sql\nSELECT o.id, c.nume\nFROM comenzi o\nJOIN clienti c ___ o.client_id = c.id;\n```",
        answer: "ON", explanation: "ON specifică condiția de legătură între tabele la JOIN." },
      { name: "HAVING vs WHERE", difficulty: "hard",
        question: "Ce clauză filtrează DUPĂ agregare (GROUP BY)?\n```sql\nSELECT dept, AVG(salariu) AS avg_sal\nFROM angajati GROUP BY dept\n___ AVG(salariu) > 5000;\n```",
        answer: "HAVING", explanation: "HAVING filtrează grupurile după GROUP BY, spre deosebire de WHERE care filtrează rândurile." },
    ],
    codings: [
      { name: "Top 3 produse", difficulty: "easy",
        question: "Scrie o interogare SQL care selectează primele 3 produse cu prețul cel mai mare din tabela 'produse' (coloane: id, nume, pret).",
        starterCode: "-- TODO: SELECT id, nume, pret\n-- TODO: FROM produse\n-- TODO: ORDER BY pret descrescator\n-- TODO: LIMIT 3\n",
        expectedOutput: "" },
      { name: "Statistici departament", difficulty: "medium",
        question: "Calculează pentru fiecare departament: numărul de angajați, salariul mediu și maxim. Afișează doar departamentele cu media > 4000.",
        starterCode: "-- TODO: SELECT departament, COUNT(*), AVG(salariu), MAX(salariu)\n-- TODO: FROM angajati\n-- TODO: GROUP BY departament\n-- TODO: HAVING AVG(salariu) > 4000\n",
        expectedOutput: "" },
      { name: "Comenzi clienți", difficulty: "medium",
        question: "Afișează numele clienților și totalul comenzilor lor, sortate descrescător după total. Include doar clienți cu cel puțin 2 comenzi.",
        starterCode: "-- TODO: SELECT c.nume, SUM(o.valoare) as total, COUNT(*) as nr_comenzi\n-- TODO: FROM comenzi o JOIN clienti c ON o.client_id = c.id\n-- TODO: GROUP BY c.id, c.nume\n-- TODO: HAVING COUNT(*) >= 2\n-- TODO: ORDER BY total DESC\n",
        expectedOutput: "" },
      { name: "Update stoc", difficulty: "hard",
        question: "Scrie o interogare UPDATE care reduce cantitatea cu 1 pentru toate produsele din comanda #101, dar NUMAI dacă stocul > 0.",
        starterCode: "-- TODO: UPDATE produse p\n-- TODO: SET cantitate = cantitate - 1\n-- TODO: WHERE cantitate > 0\n-- TODO: AND id IN (SELECT produs_id FROM detalii_comanda WHERE comanda_id = 101)\n",
        expectedOutput: "" },
      { name: "Subquery corelat", difficulty: "hard",
        question: "Selectează angajații al căror salariu este mai mare decât media salariului din departamentul lor.",
        starterCode: "-- TODO: SELECT a.nume, a.salariu, a.departament\n-- TODO: FROM angajati a\n-- TODO: WHERE a.salariu > (\n--   TODO: subquery: SELECT AVG(salariu) FROM angajati WHERE departament = a.departament\n-- )\n",
        expectedOutput: "" },
    ],
  },

  // ── C ──────────────────────────────────────────────────────────────────────

  "c-basic": {
    fillblanks: [
      { name: "Printf format", difficulty: "easy",
        question: "Ce va afișa codul următor?\n```c\n#include <stdio.h>\nint main() {\n    int a = 5, b = 3;\n    printf(\"%d + %d = %d\\n\", a, b, a+b);\n    return 0;\n}\n```",
        answer: "5 + 3 = 8", explanation: "%d afișează întregi. a+b=8." },
      { name: "For C", difficulty: "easy",
        question: "Ce va afișa codul următor?\n```c\n#include <stdio.h>\nint main() {\n    int s = 0;\n    for(int i = 1; i <= 4; i++) s += i;\n    printf(\"%d\\n\", s);\n    return 0;\n}\n```",
        answer: "10", explanation: "1+2+3+4=10." },
      { name: "Pointer baza", difficulty: "medium",
        question: "Ce va afișa codul următor?\n```c\n#include <stdio.h>\nint main() {\n    int x = 42;\n    int *p = &x;\n    *p = *p * 2;\n    printf(\"%d\\n\", x);\n    return 0;\n}\n```",
        answer: "84", explanation: "*p dereferențiază pointerul și modifică x: 42*2=84." },
      { name: "Array C", difficulty: "medium",
        question: "Ce va afișa codul următor?\n```c\n#include <stdio.h>\nint main() {\n    int v[] = {10, 20, 30, 40};\n    int s = 0;\n    for(int i = 0; i < 4; i++) s += v[i];\n    printf(\"%d\\n\", s);\n    return 0;\n}\n```",
        answer: "100", explanation: "10+20+30+40=100." },
      { name: "Recursie C", difficulty: "hard",
        question: "Ce va afișa codul următor?\n```c\n#include <stdio.h>\nint fib(int n) {\n    if (n <= 1) return n;\n    return fib(n-1) + fib(n-2);\n}\nint main() {\n    printf(\"%d\\n\", fib(7));\n    return 0;\n}\n```",
        answer: "13", explanation: "fib(7) = fib(6)+fib(5) = 8+5 = 13." },
    ],
    codings: [
      { name: "Maxim în array", difficulty: "easy",
        question: "Scrie un program C care găsește maximul din vectorul {5, 3, 9, 1, 7} și îl afișează.",
        starterCode: "#include <stdio.h>\nint main() {\n    int v[] = {5, 3, 9, 1, 7};\n    int n = 5;\n    // TODO: inițializează max cu v[0]\n    // TODO: for de la 1 la n-1\n    // TODO: if v[i] > max: max = v[i]\n    printf(\"Max: %d\\n\", max);\n    return 0;\n}\n",
        expectedOutput: "Max: 9" },
      { name: "Inversare array", difficulty: "medium",
        question: "Inversează vectorul {1, 2, 3, 4, 5} fără array auxiliar și afișează-l.",
        starterCode: "#include <stdio.h>\nint main() {\n    int v[] = {1, 2, 3, 4, 5};\n    int n = 5;\n    // TODO: for i de la 0 la n/2-1\n    // TODO: swap v[i] cu v[n-1-i]\n    for(int i=0;i<n;i++) printf(\"%d \", v[i]);\n    printf(\"\\n\");\n    return 0;\n}\n",
        expectedOutput: "5 4 3 2 1" },
      { name: "Număr perfect", difficulty: "medium",
        question: "Verifică dacă 28 este număr perfect (suma divizorilor proprii = numărul). Afișează 'Perfect' sau 'Nu'.",
        starterCode: "#include <stdio.h>\nint main() {\n    int n = 28, suma = 0;\n    // TODO: for i de la 1 la n/2\n    // TODO: if n % i == 0: suma += i\n    printf(\"%s\\n\", suma == n ? \"Perfect\" : \"Nu\");\n    return 0;\n}\n",
        expectedOutput: "Perfect" },
      { name: "Sortare bule", difficulty: "hard",
        question: "Sortează vectorul {64, 25, 12, 22, 11} cu bubble sort și afișează-l sortat.",
        starterCode: "#include <stdio.h>\nint main() {\n    int v[] = {64, 25, 12, 22, 11};\n    int n = 5;\n    // TODO: bubble sort cu 2 for-uri imbricate\n    // TODO: swap dacă v[j] > v[j+1]\n    for(int i=0;i<n;i++) printf(\"%d \", v[i]);\n    printf(\"\\n\");\n    return 0;\n}\n",
        expectedOutput: "11 12 22 25 64" },
      { name: "Matrice transpusă", difficulty: "hard",
        question: "Calculează transpusa matricei {{1,2,3},{4,5,6}} și afișeaz-o pe linii.",
        starterCode: "#include <stdio.h>\nint main() {\n    int m[2][3] = {{1,2,3},{4,5,6}};\n    int t[3][2];\n    // TODO: t[j][i] = m[i][j]\n    // TODO: afișează t pe linii cu printf\n    return 0;\n}\n",
        expectedOutput: "1 4\n2 5\n3 6" },
    ],
  },

  // ── JAVA ──────────────────────────────────────────────────────────────────

  "java-basic": {
    fillblanks: [
      { name: "Println Java", difficulty: "easy",
        question: "Ce va afișa codul următor?\n```java\npublic class Main {\n    public static void main(String[] args) {\n        int[] note = {8, 9, 7, 10, 6};\n        int max = note[0];\n        for(int n : note) if(n > max) max = n;\n        System.out.println(\"Max: \" + max);\n    }\n}\n```",
        answer: "Max: 10", explanation: "Iterare enhanced for. Maximul din {8,9,7,10,6} este 10." },
      { name: "String methods", difficulty: "easy",
        question: "Ce va afișa codul următor?\n```java\nString s = \"  Hello World  \";\nSystem.out.println(s.trim().toLowerCase().replace(\"world\", \"Java\"));\n```",
        answer: "hello java", explanation: "trim() elimină spațiile, toLowerCase() → 'hello world', replace → 'hello java'." },
      { name: "ArrayList", difficulty: "medium",
        question: "Ce va afișa codul următor?\n```java\nimport java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        List<Integer> l = new ArrayList<>(Arrays.asList(3,1,4,1,5));\n        Collections.sort(l);\n        System.out.println(l.get(0) + \" \" + l.get(l.size()-1));\n    }\n}\n```",
        answer: "1 5", explanation: "Sortat: [1,1,3,4,5]. Primul=1, ultimul=5." },
      { name: "HashMap", difficulty: "medium",
        question: "Ce va afișa codul următor?\n```java\nimport java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Map<String,Integer> m = new HashMap<>();\n        m.put(\"a\", 1); m.put(\"b\", 2); m.put(\"a\", 10);\n        System.out.println(m.get(\"a\") + m.get(\"b\"));\n    }\n}\n```",
        answer: "12", explanation: "put('a', 10) suprascrie put('a', 1). 10+2=12." },
      { name: "Interface", difficulty: "hard",
        question: "Ce va afișa codul următor?\n```java\ninterface Salutabil { String salut(); }\nclass Roman implements Salutabil {\n    public String salut() { return \"Buna ziua!\"; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Salutabil s = new Roman();\n        System.out.println(s.salut());\n    }\n}\n```",
        answer: "Buna ziua!", explanation: "Polimorfism prin interfață. Roman implementează salut()." },
    ],
    codings: [
      { name: "Suma array Java", difficulty: "easy",
        question: "Scrie un program Java care calculează suma și media unui array {15, 8, 23, 4, 19}.",
        starterCode: "public class Main {\n    public static void main(String[] args) {\n        int[] numere = {15, 8, 23, 4, 19};\n        // TODO: calculează suma cu enhanced for\n        // TODO: calculează media ca double\n        // TODO: afișează suma și media cu 2 zecimale\n    }\n}\n",
        expectedOutput: "Suma: 69\nMedia: 13.80" },
      { name: "Palindrom Java", difficulty: "medium",
        question: "Verifică dacă string-ul 'racecar' este palindrom în Java. Afișează 'Da' sau 'Nu'.",
        starterCode: "public class Main {\n    public static boolean estePalindrom(String s) {\n        // TODO: compară s cu s inversat (StringBuilder.reverse)\n        return false;\n    }\n    public static void main(String[] args) {\n        System.out.println(estePalindrom(\"racecar\") ? \"Da\" : \"Nu\");\n        System.out.println(estePalindrom(\"hello\") ? \"Da\" : \"Nu\");\n    }\n}\n",
        expectedOutput: "Da\nNu" },
      { name: "Colecții Java", difficulty: "medium",
        question: "Scrie un program Java care contorizează aparițiile fiecărui caracter din 'banana' folosind HashMap.",
        starterCode: "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        String s = \"banana\";\n        Map<Character,Integer> freq = new TreeMap<>();\n        // TODO: for char c : s.toCharArray()\n        // TODO: freq.put(c, freq.getOrDefault(c,0)+1)\n        freq.forEach((k,v) -> System.out.println(k + \": \" + v));\n    }\n}\n",
        expectedOutput: "a: 3\nb: 1\nn: 2" },
      { name: "Clasă geometrie", difficulty: "hard",
        question: "Creează o clasă abstractă Forma cu metodă abstractă arie(), și subclasele Cerc și Dreptunghi.",
        starterCode: "abstract class Forma {\n    // TODO: abstract double arie();\n    void afiseaza() { System.out.printf(\"Aria: %.2f%n\", arie()); }\n}\nclass Cerc extends Forma {\n    double r;\n    Cerc(double r) { this.r = r; }\n    // TODO: @Override arie() = Math.PI * r * r\n}\nclass Dreptunghi extends Forma {\n    double l, h;\n    Dreptunghi(double l, double h) { this.l=l; this.h=h; }\n    // TODO: @Override arie() = l * h\n}\npublic class Main {\n    public static void main(String[] args) {\n        new Cerc(5).afiseaza();\n        new Dreptunghi(4, 6).afiseaza();\n    }\n}\n",
        expectedOutput: "Aria: 78.54\nAria: 24.00" },
      { name: "Sortare obiecte", difficulty: "hard",
        question: "Creează o clasă Student (nume, medie) și sortează o listă de studenți după medie descrescător.",
        starterCode: "import java.util.*;\nclass Student {\n    String nume; double medie;\n    Student(String n, double m) { nume=n; medie=m; }\n    public String toString() { return nume + \": \" + medie; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        List<Student> lst = Arrays.asList(\n            new Student(\"Ana\", 9.5),\n            new Student(\"Ion\", 8.2),\n            new Student(\"Maria\", 9.8)\n        );\n        // TODO: Collections.sort sau lst.sort cu Comparator\n        lst.forEach(System.out::println);\n    }\n}\n",
        expectedOutput: "Maria: 9.8\nAna: 9.5\nIon: 8.2" },
    ],
  },

  // ── PHP ───────────────────────────────────────────────────────────────────

  "php-basic": {
    fillblanks: [
      { name: "Echo PHP", difficulty: "easy",
        question: "Ce va afișa codul următor?\n```php\n<?php\n$name = 'World';\necho \"Hello, $name!\";\n?>\n```",
        answer: "Hello, World!", explanation: "Variabilele PHP sunt interpolate în string-uri cu ghilimele duble." },
      { name: "Array PHP", difficulty: "easy",
        question: "Ce va afișa codul următor?\n```php\n<?php\n$arr = [3, 1, 4, 1, 5];\nsort($arr);\necho $arr[0] . ' ' . end($arr);\n?>\n```",
        answer: "1 5", explanation: "sort() sortează crescător. $arr[0]=1, end()=5." },
      { name: "foreach PHP", difficulty: "medium",
        question: "Ce va afișa codul următor?\n```php\n<?php\n$preturi = ['mere'=>2.5, 'lapte'=>4.0];\n$total = 0;\nforeach($preturi as $p) $total += $p;\necho number_format($total, 2);\n?>\n```",
        answer: "6.50", explanation: "2.5+4.0=6.5, formatat cu 2 zecimale." },
      { name: "Funcție PHP", difficulty: "medium",
        question: "Ce va afișa codul următor?\n```php\n<?php\nfunction putere($b, $e) {\n    return $e === 0 ? 1 : $b * putere($b, $e-1);\n}\necho putere(2, 8);\n?>\n```",
        answer: "256", explanation: "2^8 = 256. Funcție recursivă." },
      { name: "String PHP", difficulty: "hard",
        question: "Ce va afișa codul următor?\n```php\n<?php\n$s = 'Programare web';\necho strtoupper(substr($s, 0, 11));\n?>\n```",
        answer: "PROGRAMARE", explanation: "substr ia primele 11 caractere: 'Programare', strtoupper → 'PROGRAMARE'." },
    ],
    codings: [
      { name: "Validare email", difficulty: "easy",
        question: "Scrie cod PHP care verifică dacă 'user@example.com' este un email valid cu filter_var și afișează 'Valid' sau 'Invalid'.",
        starterCode: "<?php\n$email = 'user@example.com';\n// TODO: if filter_var($email, FILTER_VALIDATE_EMAIL)\n// TODO: echo 'Valid' else echo 'Invalid'\n?>\n",
        expectedOutput: "Valid" },
      { name: "Sortare studenți", difficulty: "medium",
        question: "Sortează array-ul asociativ de studenți după medie descrescător și afișează fiecare cu media lor.",
        starterCode: "<?php\n$studenti = [\n    ['nume' => 'Ana', 'medie' => 9.5],\n    ['nume' => 'Ion', 'medie' => 8.2],\n    ['nume' => 'Maria', 'medie' => 9.8]\n];\n// TODO: usort cu comparator descrescător după medie\nforeach($studenti as $s) {\n    echo $s['nume'] . ': ' . $s['medie'] . PHP_EOL;\n}\n?>\n",
        expectedOutput: "Maria: 9.8\nAna: 9.5\nIon: 8.2" },
      { name: "Frecvență cuvinte", difficulty: "medium",
        question: "Numără frecvența cuvintelor din string-ul 'mere pere mere mere pere capsuni' și afișează sortat alfabetic.",
        starterCode: "<?php\n$text = 'mere pere mere mere pere capsuni';\n// TODO: explode pentru a obține cuvintele\n// TODO: array_count_values pentru frecvență\n// TODO: ksort pentru sortare alfabetică\n// TODO: foreach afișează 'cuvant: nr'\n?>\n",
        expectedOutput: "capsuni: 1\nmere: 3\npere: 2" },
      { name: "Clasă PHP", difficulty: "hard",
        question: "Creează o clasă Cerc cu proprietatea $raza, metodele arie() și perimetru(). Testează cu raza=7.",
        starterCode: "<?php\nclass Cerc {\n    private $raza;\n    // TODO: constructor($raza)\n    // TODO: arie() returnează M_PI * raza^2\n    // TODO: perimetru() returnează 2 * M_PI * raza\n}\n$c = new Cerc(7);\necho 'Arie: ' . round($c->arie(), 2) . PHP_EOL;\necho 'Perimetru: ' . round($c->perimetru(), 2) . PHP_EOL;\n?>\n",
        expectedOutput: "Arie: 153.94\nPerimetru: 43.98" },
      { name: "API response", difficulty: "hard",
        question: "Scrie o funcție PHP care primește un array de produse și returnează JSON cu produsele sub 100 lei, sortate după preț.",
        starterCode: "<?php\nfunction filtreazaProduse($produse, $maxPret) {\n    // TODO: array_filter pentru produse cu pret < maxPret\n    // TODO: usort pentru sortare după pret\n    // TODO: return json_encode cu JSON_PRETTY_PRINT\n}\n$produse = [\n    ['name'=>'pix','pret'=>5],\n    ['name'=>'laptop','pret'=>3000],\n    ['name'=>'carte','pret'=>45],\n];\necho filtreazaProduse($produse, 100);\n?>\n",
        expectedOutput: "[\n    {\n        \"name\": \"pix\",\n        \"pret\": 5\n    },\n    {\n        \"name\": \"carte\",\n        \"pret\": 45\n    }\n]" },
    ],
  },

};

// ─── MATCHER: mapează lecțiile la topic-uri ─────────────────────────────────
function matchTopic(lessonTitle, moduleSlug) {
  const t = lessonTitle.toLowerCase();
  const slug = moduleSlug.toLowerCase();

  if (slug === "javascript" || slug === "react" || slug.startsWith("nextjs")) {
    if (t.includes("for") && (t.includes("bucl") || t.includes("loop"))) return "js-for";
    if ((t.includes("funcți") || t.includes("function")) && !t.includes("avansat") && !t.includes("arrow")) return "js-functions";
    if (t.includes("obiect") || t.includes("object")) return "js-objects";
    if (t.includes("while")) return "js-while";
    if (t.includes("switch") || t.includes("case")) return "js-switch";
    if (t.includes("clos") || t.includes("currying") || t.includes("scope") || t.includes("hoisting")) return "js-closures";
    if (t.includes("async") || t.includes("await") || t.includes("promise") || t.includes("fetch")) return "js-async";
    if (t.includes("clas") || t.includes("oop") || t.includes("moștenire") || t.includes("inheritance")) return "js-classes";
    // default JS
    return "js-functions";
  }
  if (slug === "html" || slug === "tailwind") return "html-basic";
  if (slug === "css") return "css-basic";
  if (slug === "sql") return "sql-basic";
  if (slug === "c" || slug === "cpp") return "c-basic";
  if (slug === "java") return "java-basic";
  if (slug === "php") return "php-basic";
  if (slug === "csharp") return "java-basic"; // similar structure
  if (slug === "cybersecurity") return "js-functions";
  // python deja procesat
  return "js-functions";
}

// ─── MAIN ─────────────────────────────────────────────────────────────────
async function main() {
  const MODULE_LANG = {
    python:"python", javascript:"javascript", html:"html", css:"css",
    tailwind:"html", react:"javascript", "nextjs-frontend":"javascript",
    "nextjs-backend":"javascript", c:"c", cpp:"cpp", csharp:"csharp",
    java:"java", cybersecurity:"javascript", sql:"sql", php:"php",
  };

  const modules = await p.module.findMany({
    orderBy: { order: "asc" },
    include: {
      lessons: {
        orderBy: { order: "asc" },
        include: { tasks: { select: { id:true, type:true, number:true }, orderBy: { number:"asc" } } },
      },
    },
  });

  let added = 0, skipped = 0;

  for (const mod of modules) {
    if (mod.slug === "python") { console.log(`Skip ${mod.title} (already done)`); continue; }
    const lang = MODULE_LANG[mod.slug] || "javascript";
    console.log(`\n=== ${mod.title} [${mod.slug}] ===`);

    for (const lesson of mod.lessons) {
      const quiz   = lesson.tasks.filter(t => t.type === "quiz");
      const fill   = lesson.tasks.filter(t => t.type === "fillblank");
      const coding = lesson.tasks.filter(t => t.type === "coding");

      const fillNeeded   = Math.max(0, 5 - fill.length);
      const codingNeeded = Math.max(0, 5 - coding.length);
      const quizExcess   = Math.max(0, quiz.length - 5);

      if (fillNeeded === 0 && codingNeeded === 0 && quizExcess === 0) {
        skipped++; continue;
      }

      const topicKey = matchTopic(lesson.title, mod.slug);
      const topic = TOPICS[topicKey];
      if (!topic) { console.log(`  SKIP (no topic) L${lesson.order}: ${lesson.title}`); continue; }

      process.stdout.write(`  L${lesson.order}. ${lesson.title.slice(0,38)}`);

      // Șterge quiz în exces
      if (quizExcess > 0) {
        const toDelete = quiz.slice(5).map(t => t.id);
        await p.task.deleteMany({ where: { id: { in: toDelete } } });
        process.stdout.write(` -${quizExcess}q`);
      }

      const maxNum = lesson.tasks.reduce((m,t) => Math.max(m, t.number), 0);
      let num = maxNum + 1;

      // Adaugă fillblank
      const fillTasks = topic.fillblanks.slice(0, fillNeeded);
      for (const t of fillTasks) {
        await p.task.create({ data: {
          lessonId: lesson.id, number: num++, type: "fillblank",
          difficulty: t.difficulty, name: t.name,
          question: t.question, answer: t.answer.trim(),
          explanation: t.explanation || null,
          options: [], language: lang,
        }});
        added++;
      }

      // Adaugă coding
      const codingTasks = topic.codings.slice(0, codingNeeded);
      for (const t of codingTasks) {
        await p.task.create({ data: {
          lessonId: lesson.id, number: num++, type: "coding",
          difficulty: t.difficulty, name: t.name,
          question: t.question, answer: "",
          starterCode: t.starterCode, expectedOutput: (t.expectedOutput||"").trim(),
          options: [], language: lang,
        }});
        added++;
      }

      process.stdout.write(` +${fillTasks.length}f +${codingTasks.length}c ✓\n`);
    }
  }

  console.log(`\nAdded: ${added} tasks | Skipped: ${skipped}`);
}

main().catch(console.error).finally(() => p.$disconnect());
