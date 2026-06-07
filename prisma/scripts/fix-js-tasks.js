"use strict";
require("dotenv").config({ path: ".env" });
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const FIXES = [
  // ─── 2. Variabile: let, const, var ───────────────────────────────────────
  {
    lessonId: "69f9ee1447fb80249e2ae73a",
    name: "2. Variabile: let, const, var",
    tasks: [
      // FILLBLANK 6-10
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează: Declară o variabilă `score` cu valoarea 42 folosind `let`.\n```js\n___ score = 42;\nconsole.log(score);\n```",
        options: [], answer: "let",
        explanation: "`let` declară o variabilă care poate fi reasignată ulterior.",
        starterCode: "", language: "", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează: Declară o constantă `PI` cu valoarea 3.14.\n```js\n___ PI = 3.14;\nconsole.log(PI);\n```",
        options: [], answer: "const",
        explanation: "`const` declară o valoare constantă care nu poate fi reasignată.",
        starterCode: "", language: "", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează: Care keyword are funcție-scoping (nu block-scoping)?\n```js\n___ x = 10;\nif (true) {\n  ___ x = 20;\n  console.log(x); // 20\n}\nconsole.log(x); // 20\n```",
        options: [], answer: "var",
        explanation: "`var` are funcție-scoping, nu block-scoping, deci valoarea 20 e vizibilă și în afara blocului if.",
        starterCode: "", language: "", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează: Folosește destructuring pentru a extrage `a` și `b` dintr-un array.\n```js\nconst arr = [1, 2, 3];\nconst [___, ___] = arr;\nconsole.log(a, b);\n```",
        options: [], answer: "a, b",
        explanation: "Array destructuring extrage elementele în variabile în ordinea indexurilor.",
        starterCode: "", language: "", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează: Folosește `const` cu un obiect și modifică o proprietate.\n```js\nconst user = { name: 'Ana', age: 25 };\nuser.___ = 26;\nconsole.log(user.age);\n```",
        options: [], answer: "age",
        explanation: "`const` împiedică reasignarea variabilei, dar proprietățile obiectului pot fi modificate.",
        starterCode: "", language: "", expectedOutput: ""
      },
      // CODING 11-15
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Declară variabilele `nume` (const, 'Maria'), `varsta` (let, 28) și `oras` (let, 'Cluj'). Afișează-le pe linii separate.",
        starterCode: "const nume = 'Maria';\nlet varsta = 28;\nlet oras = 'Cluj';\nconsole.log(nume);\nconsole.log(varsta);\nconsole.log(oras);",
        language: "javascript", expectedOutput: "Maria\n28\nCluj",
        options: [], answer: "Maria\n28\nCluj", explanation: ""
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Demonstrează hoisting cu `var`: declară o variabilă `x` cu `var` după ce o folosești în console.log. Afișează valoarea înainte de declarare (va fi undefined).",
        starterCode: "console.log(x);\nvar x = 5;\nconsole.log(x);",
        language: "javascript", expectedOutput: "undefined\n5",
        options: [], answer: "undefined\n5", explanation: ""
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Creează un counter folosind `let`. Inițializează `count` la 0, incrementează de 3 ori cu `count++`, afișează valoarea finală.",
        starterCode: "let count = 0;\ncount++;\ncount++;\ncount++;\nconsole.log(count);",
        language: "javascript", expectedOutput: "3",
        options: [], answer: "3", explanation: ""
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Declară `const MAX = 100` și `let current = 45`. Calculează și afișează procentul (current / MAX * 100), formatat cu `%`.",
        starterCode: "const MAX = 100;\nlet current = 45;\nconst percent = (current / MAX) * 100;\nconsole.log(percent + '%');",
        language: "javascript", expectedOutput: "45%",
        options: [], answer: "45%", explanation: ""
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Schimbă valorile a două variabile `let a = 10, b = 20` folosind destructuring swap. Afișează valorile după swap.",
        starterCode: "let a = 10;\nlet b = 20;\n[a, b] = [b, a];\nconsole.log(a);\nconsole.log(b);",
        language: "javascript", expectedOutput: "20\n10",
        options: [], answer: "20\n10", explanation: ""
      }
    ]
  },

  // ─── 4. Șiruri de caractere (Strings) ─────────────────────────────────────
  {
    lessonId: "69f9ee1947fb80249e2ae758",
    name: "4. Șiruri de caractere (Strings)",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează: Folosește template literal pentru a crea un mesaj de salut.\n```js\nconst name = 'Ion';\nconst greeting = `Bună ziua, ___!`;\nconsole.log(greeting);\n```",
        options: [], answer: "${name}",
        explanation: "Template literals folosesc `${variabilă}` pentru interpolarea valorilor.",
        starterCode: "", language: "", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează: Obține lungimea unui string.\n```js\nconst text = 'JavaScript';\nconsole.log(text.___);\n```",
        options: [], answer: "length",
        explanation: "Proprietatea `.length` returnează numărul de caractere al unui string.",
        starterCode: "", language: "", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează: Convertește un string la majuscule.\n```js\nconst word = 'salut';\nconsole.log(word.___());\n```",
        options: [], answer: "toUpperCase",
        explanation: "`.toUpperCase()` returnează stringul cu toate literele convertite la majuscule.",
        starterCode: "", language: "", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează: Împarte un string într-un array după virgulă.\n```js\nconst csv = 'mere,pere,prune';\nconst fructe = csv.___(',')\nconsole.log(fructe[1]);\n```",
        options: [], answer: "split",
        explanation: "`.split(separator)` împarte stringul în array de substrings la fiecare separator.",
        starterCode: "", language: "", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează: Verifică dacă un string conține un substring.\n```js\nconst phrase = 'Bun venit în România';\nconsole.log(phrase.___('România'));\n```",
        options: [], answer: "includes",
        explanation: "`.includes(substring)` returnează `true` dacă stringul conține substringul dat.",
        starterCode: "", language: "", expectedOutput: ""
      },
      // CODING 11-15
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Creează un string `fullName` din `firstName = 'Ana'` și `lastName = 'Popescu'` folosind template literal. Afișează numele complet și lungimea sa.",
        starterCode: "const firstName = 'Ana';\nconst lastName = 'Popescu';\nconst fullName = `${firstName} ${lastName}`;\nconsole.log(fullName);\nconsole.log(fullName.length);",
        language: "javascript", expectedOutput: "Ana Popescu\n11",
        options: [], answer: "Ana Popescu\n11", explanation: ""
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Din stringul `'   Hello, World!   '` elimină spațiile de la capete cu `.trim()` și afișează rezultatul. Afișează și varianta uppercase.",
        starterCode: "const raw = '   Hello, World!   ';\nconst trimmed = raw.trim();\nconsole.log(trimmed);\nconsole.log(trimmed.toUpperCase());",
        language: "javascript", expectedOutput: "Hello, World!\nHELLO, WORLD!",
        options: [], answer: "Hello, World!\nHELLO, WORLD!", explanation: ""
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Din `'JavaScript este super'` extrage primele 10 caractere cu `.slice(0, 10)` și afișează-le. Afișează și indexul primei apariții a 'este'.",
        starterCode: "const text = 'JavaScript este super';\nconsole.log(text.slice(0, 10));\nconsole.log(text.indexOf('este'));",
        language: "javascript", expectedOutput: "JavaScript\n11",
        options: [], answer: "JavaScript\n11", explanation: ""
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Înlocuiește toate aparițiile 'pisică' cu 'câine' în stringul `'Pisica mea e o pisică frumoasă'` (case-insensitive cu regex). Afișează rezultatul.",
        starterCode: "const text = 'Pisica mea e o pisică frumoasă';\nconst result = text.replace(/pisic[ăa]/gi, 'câine');\nconsole.log(result);",
        language: "javascript", expectedOutput: "câine mea e o câine frumoasă",
        options: [], answer: "câine mea e o câine frumoasă", explanation: ""
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Împarte `'mere,pere,prune,cireșe'` după virgulă, sortează alfabetic și reunește cu ` | `. Afișează rezultatul.",
        starterCode: "const fruits = 'mere,pere,prune,cireșe';\nconst sorted = fruits.split(',').sort().join(' | ');\nconsole.log(sorted);",
        language: "javascript", expectedOutput: "cireșe | mere | pere | prune",
        options: [], answer: "cireșe | mere | pere | prune", explanation: ""
      }
    ]
  },

  // ─── 5. Operatori ─────────────────────────────────────────────────────────
  {
    lessonId: "69f9ee1b47fb80249e2ae767",
    name: "5. Operatori",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează: Operatorul de egalitate strictă verifică și tipul valorii.\n```js\nconsole.log(5 ___ '5'); // false\nconsole.log(5 ___ 5);   // true\n```",
        options: [], answer: "===",
        explanation: "`===` verifică atât valoarea cât și tipul, spre deosebire de `==` care face type coercion.",
        starterCode: "", language: "", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează: Operatorul modulo returnează restul împărțirii.\n```js\nconsole.log(17 ___ 5); // 2\n```",
        options: [], answer: "%",
        explanation: "Operatorul `%` (modulo) returnează restul împărțirii întregi: 17 % 5 = 2.",
        starterCode: "", language: "", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează: Operatorul logic AND returnează true doar dacă ambii operanzi sunt truthy.\n```js\nconsole.log(true ___ false); // false\nconsole.log(true ___ true);  // true\n```",
        options: [], answer: "&&",
        explanation: "`&&` (AND logic) returnează `true` doar când ambele valori sunt truthy.",
        starterCode: "", language: "", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează: Operatorul nullish coalescing returnează valoarea din dreapta dacă stânga e null/undefined.\n```js\nconst val = null ___ 'default';\nconsole.log(val); // 'default'\n```",
        options: [], answer: "??",
        explanation: "`??` (nullish coalescing) returnează dreapta doar când stânga e `null` sau `undefined`.",
        starterCode: "", language: "", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează: Operatorul de exponențiere calculează puterea.\n```js\nconsole.log(2 ___ 10); // 1024\n```",
        options: [], answer: "**",
        explanation: "`**` este operatorul de exponențiere: 2 ** 10 = 1024.",
        starterCode: "", language: "", expectedOutput: ""
      },
      // CODING 11-15
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Calculează și afișează: suma, diferența, produsul, câtul și restul împărțirii numerelor 17 și 5.",
        starterCode: "const a = 17, b = 5;\nconsole.log(a + b);\nconsole.log(a - b);\nconsole.log(a * b);\nconsole.log(a / b);\nconsole.log(a % b);",
        language: "javascript", expectedOutput: "22\n12\n85\n3.4\n2",
        options: [], answer: "22\n12\n85\n3.4\n2", explanation: ""
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Demonstrează diferența dintre `==` și `===`: compară `0` cu `false` și cu `0` folosind ambii operatori. Afișează cele 4 rezultate.",
        starterCode: "console.log(0 == false);\nconsole.log(0 === false);\nconsole.log(0 == 0);\nconsole.log(0 === 0);",
        language: "javascript", expectedOutput: "true\nfalse\ntrue\ntrue",
        options: [], answer: "true\nfalse\ntrue\ntrue", explanation: ""
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Folosește operatorul ternar pentru a determina dacă numărul 15 este par sau impar. Afișează rezultatul.",
        starterCode: "const n = 15;\nconst result = n % 2 === 0 ? 'par' : 'impar';\nconsole.log(result);",
        language: "javascript", expectedOutput: "impar",
        options: [], answer: "impar", explanation: ""
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Demonstrează operatorul nullish coalescing `??` și optional chaining `?.`. Testează cu un obiect `user` care nu are proprietatea `address`.",
        starterCode: "const user = { name: 'Cristi', age: 25 };\nconst city = user?.address?.city ?? 'Necunoscut';\nconsole.log(city);\nconsole.log(user?.name ?? 'Anonim');",
        language: "javascript", expectedOutput: "Necunoscut\nCristi",
        options: [], answer: "Necunoscut\nCristi", explanation: ""
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Calculează 2 la puterea a 8-a folosind `**`. Afișează și rădăcina pătrată a lui 144 cu `Math.sqrt`. Afișează ambele rezultate.",
        starterCode: "console.log(2 ** 8);\nconsole.log(Math.sqrt(144));",
        language: "javascript", expectedOutput: "256\n12",
        options: [], answer: "256\n12", explanation: ""
      }
    ]
  },

  // ─── 6. Condiții: if / else ────────────────────────────────────────────────
  {
    lessonId: "69f9ee1d47fb80249e2ae776",
    name: "6. Condiții: if / else",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează: Structura if/else if/else pentru a clasifica o notă.\n```js\nconst nota = 7;\nif (nota >= 9) {\n  console.log('Excelent');\n} ___ if (nota >= 7) {\n  console.log('Bine');\n} ___ {\n  console.log('Insuficient');\n}\n```",
        options: [], answer: "else",
        explanation: "`else if` permite testarea unei condiții alternative, iar `else` gestionează cazul implicit.",
        starterCode: "", language: "", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează: Un string gol este falsy în JavaScript.\n```js\nconst text = '';\nif (___) {\n  console.log('Are text');\n} else {\n  console.log('Text gol');\n}\n```",
        options: [], answer: "text",
        explanation: "Un string gol `''` este falsy, deci `if (text)` va fi false și se va executa `else`.",
        starterCode: "", language: "", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează: Operatorul logic OR în condiție.\n```js\nconst rol = 'admin';\nif (rol === 'admin' ___ rol === 'editor') {\n  console.log('Acces permis');\n}\n```",
        options: [], answer: "||",
        explanation: "`||` (OR logic) returnează true dacă cel puțin unul dintre operanzi este truthy.",
        starterCode: "", language: "", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează: Operatorul NOT neagă o valoare booleană.\n```js\nconst isLogged = false;\nif (___ isLogged) {\n  console.log('Neautentificat');\n}\n```",
        options: [], answer: "!",
        explanation: "Operatorul `!` (NOT) neagă valoarea boolean: `!false` dă `true`.",
        starterCode: "", language: "", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează: Valoarea `0` este falsy.\n```js\nconst count = 0;\nif (count) {\n  console.log('Are elemente');\n} ___ {\n  console.log('Gol');\n}\n```",
        options: [], answer: "else",
        explanation: "`0`, `''`, `null`, `undefined`, `NaN` și `false` sunt valorile falsy în JavaScript.",
        starterCode: "", language: "", expectedOutput: ""
      },
      // CODING 11-15
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `clasificaVarsta(varsta)` care returnează: 'Copil' (<18), 'Adult' (18-64), 'Senior' (>=65). Testează cu 10, 30, 70.",
        starterCode: "function clasificaVarsta(varsta) {\n  if (varsta < 18) return 'Copil';\n  else if (varsta < 65) return 'Adult';\n  else return 'Senior';\n}\nconsole.log(clasificaVarsta(10));\nconsole.log(clasificaVarsta(30));\nconsole.log(clasificaVarsta(70));",
        language: "javascript", expectedOutput: "Copil\nAdult\nSenior",
        options: [], answer: "Copil\nAdult\nSenior", explanation: ""
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Verifică dacă un număr este divizibil cu 3 ȘI cu 5 (FizzBuzz). Testează cu 15, 9, 10, 7.",
        starterCode: "function fizzBuzz(n) {\n  if (n % 3 === 0 && n % 5 === 0) return 'FizzBuzz';\n  if (n % 3 === 0) return 'Fizz';\n  if (n % 5 === 0) return 'Buzz';\n  return String(n);\n}\n[15, 9, 10, 7].forEach(n => console.log(fizzBuzz(n)));",
        language: "javascript", expectedOutput: "FizzBuzz\nFizz\nBuzz\n7",
        options: [], answer: "FizzBuzz\nFizz\nBuzz\n7", explanation: ""
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Verifică dacă variabilele `name`, `age` și `email` sunt toate truthy (nu goale/null). Afișează 'Date complete' sau 'Date lipsă'.",
        starterCode: "const name = 'Cristi';\nconst age = 25;\nconst email = '';\nif (name && age && email) {\n  console.log('Date complete');\n} else {\n  console.log('Date lipsă');\n}",
        language: "javascript", expectedOutput: "Date lipsă",
        options: [], answer: "Date lipsă", explanation: ""
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `getDiscount(price, isMember)` care returnează prețul redus: membrii primesc 20% reducere, ceilalți 5%. Testează cu (100, true) și (100, false).",
        starterCode: "function getDiscount(price, isMember) {\n  const discount = isMember ? 0.20 : 0.05;\n  return price * (1 - discount);\n}\nconsole.log(getDiscount(100, true));\nconsole.log(getDiscount(100, false));",
        language: "javascript", expectedOutput: "80\n95",
        options: [], answer: "80\n95", explanation: ""
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Verifică dacă un an este bisect: divizibil cu 4 și (nu cu 100, sau cu 400). Testează cu 2000, 1900, 2024, 2023.",
        starterCode: "function esteBisect(an) {\n  return (an % 4 === 0 && an % 100 !== 0) || an % 400 === 0;\n}\n[2000, 1900, 2024, 2023].forEach(an => console.log(an + ': ' + esteBisect(an)));",
        language: "javascript", expectedOutput: "2000: true\n1900: false\n2024: true\n2023: false",
        options: [], answer: "2000: true\n1900: false\n2024: true\n2023: false", explanation: ""
      }
    ]
  },

  // ─── 8. Funcții ───────────────────────────────────────────────────────────
  {
    lessonId: "69f9ee2147fb80249e2ae794",
    name: "8. Funcții",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează: Declară o funcție cu parametru default.\n```js\nfunction saluta(name = 'Lume') {\n  return `Bună, ${name}!`;\n}\nconsole.log(saluta());\nconsole.log(saluta('Ana'));\n```\nCe afișează primul `console.log`?",
        options: [], answer: "Bună, Lume!",
        explanation: "Parametrul default `name = 'Lume'` e folosit când funcția e apelată fără argumente.",
        starterCode: "", language: "", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează: Transformă funcția în arrow function.\n```js\nconst double = ___ x ___ x * 2;\nconsole.log(double(5)); // 10\n```",
        options: [], answer: "x =>",
        explanation: "Arrow function concisă: `x => x * 2` echivalentă cu `function(x) { return x * 2; }`.",
        starterCode: "", language: "", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează: Funcție care returnează suma parametrilor rest.\n```js\nfunction suma(...___) {\n  return numere.reduce((a, b) => a + b, 0);\n}\nconsole.log(suma(1, 2, 3, 4)); // 10\n```",
        options: [], answer: "numere",
        explanation: "Operatorul rest `...numere` colectează toți parametrii rămași într-un array.",
        starterCode: "", language: "", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează: O funcție care returnează altă funcție (higher-order).\n```js\nfunction multiplica(factor) {\n  ___ (x) => x * factor;\n}\nconst triple = multiplica(3);\nconsole.log(triple(7)); // 21\n```",
        options: [], answer: "return",
        explanation: "Funcțiile higher-order pot returna alte funcții; `return` este necesar în funcțiile cu corp `{}`.",
        starterCode: "", language: "", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează: Funcție care primește o funcție callback și o apelează.\n```js\nfunction executa(cb) {\n  console.log('Înainte');\n  ___();\n  console.log('După');\n}\nexecuta(() => console.log('Callback!'));\n```",
        options: [], answer: "cb",
        explanation: "Callback-ul `cb` este un parametru care stochează o referință de funcție și poate fi apelat cu `cb()`.",
        starterCode: "", language: "", expectedOutput: ""
      },
      // CODING 11-15
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `calcul(a, b, operatie)` care primește două numere și un operator (+,-,*,/). Testează cu (10, 3, '+'), (10, 3, '*'), (10, 3, '-').",
        starterCode: "function calcul(a, b, op) {\n  if (op === '+') return a + b;\n  if (op === '-') return a - b;\n  if (op === '*') return a * b;\n  if (op === '/') return a / b;\n}\nconsole.log(calcul(10, 3, '+'));\nconsole.log(calcul(10, 3, '*'));\nconsole.log(calcul(10, 3, '-'));",
        language: "javascript", expectedOutput: "13\n30\n7",
        options: [], answer: "13\n30\n7", explanation: ""
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Scrie o arrow function `filtrare` care filtrează numerele pare dintr-un array. Testează cu [1,2,3,4,5,6,7,8].",
        starterCode: "const filtrare = arr => arr.filter(n => n % 2 === 0);\nconst result = filtrare([1,2,3,4,5,6,7,8]);\nconsole.log(result.join(', '));",
        language: "javascript", expectedOutput: "2, 4, 6, 8",
        options: [], answer: "2, 4, 6, 8", explanation: ""
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Scrie o funcție recursivă `factorial(n)` care calculează n!. Afișează factorial(5) și factorial(6).",
        starterCode: "function factorial(n) {\n  if (n <= 1) return 1;\n  return n * factorial(n - 1);\n}\nconsole.log(factorial(5));\nconsole.log(factorial(6));",
        language: "javascript", expectedOutput: "120\n720",
        options: [], answer: "120\n720", explanation: ""
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `creazaSalutator(limbă)` care returnează o funcție de salut. Testează cu 'ro' (afișează 'Bună!') și 'en' (afișează 'Hello!').",
        starterCode: "function creazaSalutator(limba) {\n  return function() {\n    if (limba === 'ro') console.log('Bună!');\n    else if (limba === 'en') console.log('Hello!');\n  };\n}\nconst salutRo = creazaSalutator('ro');\nconst salutEn = creazaSalutator('en');\nsalutRo();\nsalutEn();",
        language: "javascript", expectedOutput: "Bună!\nHello!",
        options: [], answer: "Bună!\nHello!", explanation: ""
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Folosește `...rest` pentru o funcție `sumaMultiple` care acceptă oricâte numere și returnează suma lor. Testează cu (1,2,3), (10,20,30,40).",
        starterCode: "function sumaMultiple(...numere) {\n  return numere.reduce((acc, n) => acc + n, 0);\n}\nconsole.log(sumaMultiple(1, 2, 3));\nconsole.log(sumaMultiple(10, 20, 30, 40));",
        language: "javascript", expectedOutput: "6\n100",
        options: [], answer: "6\n100", explanation: ""
      }
    ]
  },

  // ─── 9. Array-uri ─────────────────────────────────────────────────────────
  {
    lessonId: "69f9ee2347fb80249e2ae7a3",
    name: "9. Array-uri",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează: Adaugă un element la sfârșitul array-ului.\n```js\nconst arr = [1, 2, 3];\narr.___( 4);\nconsole.log(arr); // [1, 2, 3, 4]\n```",
        options: [], answer: "push",
        explanation: "`.push(element)` adaugă un element la sfârșitul array-ului și returnează noua lungime.",
        starterCode: "", language: "", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează: Transformă fiecare element al array-ului.\n```js\nconst numere = [1, 2, 3, 4];\nconst duble = numere.___(x => x * 2);\nconsole.log(duble); // [2, 4, 6, 8]\n```",
        options: [], answer: "map",
        explanation: "`.map(callback)` creează un nou array cu rezultatele callback-ului aplicat fiecărui element.",
        starterCode: "", language: "", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează: Filtrează elementele care satisfac o condiție.\n```js\nconst numere = [1, 2, 3, 4, 5, 6];\nconst pare = numere.___(n => n % 2 === 0);\nconsole.log(pare); // [2, 4, 6]\n```",
        options: [], answer: "filter",
        explanation: "`.filter(callback)` returnează un nou array cu elementele pentru care callback returnează true.",
        starterCode: "", language: "", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează: Reduce array-ul la o singură valoare (suma).\n```js\nconst numere = [1, 2, 3, 4, 5];\nconst suma = numere.___(( acc, n) => acc + n, 0);\nconsole.log(suma); // 15\n```",
        options: [], answer: "reduce",
        explanation: "`.reduce(callback, initialValue)` acumulează un rezultat parcurgând fiecare element.",
        starterCode: "", language: "", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează: Verifică dacă cel puțin un element satisface condiția.\n```js\nconst numere = [1, 3, 5, 8, 9];\nconst arePar = numere.___(n => n % 2 === 0);\nconsole.log(arePar); // true\n```",
        options: [], answer: "some",
        explanation: "`.some(callback)` returnează true dacă cel puțin un element satisface condiția.",
        starterCode: "", language: "", expectedOutput: ""
      },
      // CODING 11-15
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Dintr-un array de numere [3,1,4,1,5,9,2,6], găsește maximul și minimul folosind Math.max/min cu spread. Afișează ambele.",
        starterCode: "const arr = [3, 1, 4, 1, 5, 9, 2, 6];\nconsole.log(Math.max(...arr));\nconsole.log(Math.min(...arr));",
        language: "javascript", expectedOutput: "9\n1",
        options: [], answer: "9\n1", explanation: ""
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Transformă array-ul de obiecte `[{name:'Ana',score:85},{name:'Radu',score:92},{name:'Ion',score:78}]` într-un array de stringuri `'Nume: X, Scor: Y'` cu `.map()`. Afișează fiecare.",
        starterCode: "const studenti = [\n  {name:'Ana', score:85},\n  {name:'Radu', score:92},\n  {name:'Ion', score:78}\n];\nstudenti.map(s => `Nume: ${s.name}, Scor: ${s.score}`).forEach(s => console.log(s));",
        language: "javascript", expectedOutput: "Nume: Ana, Scor: 85\nNume: Radu, Scor: 92\nNume: Ion, Scor: 78",
        options: [], answer: "Nume: Ana, Scor: 85\nNume: Radu, Scor: 92\nNume: Ion, Scor: 78", explanation: ""
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Aplatizează un array de array-uri `[[1,2],[3,4],[5,6]]` cu `.flat()` și calculează suma elementelor cu `.reduce()`. Afișează suma.",
        starterCode: "const matrix = [[1,2],[3,4],[5,6]];\nconst suma = matrix.flat().reduce((a,b) => a + b, 0);\nconsole.log(suma);",
        language: "javascript", expectedOutput: "21",
        options: [], answer: "21", explanation: ""
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Sortează descrescător array-ul [5, 2, 8, 1, 9, 3] și afișează primele 3 elemente (top 3).",
        starterCode: "const numere = [5, 2, 8, 1, 9, 3];\nconst top3 = numere.sort((a, b) => b - a).slice(0, 3);\nconsole.log(top3.join(', '));",
        language: "javascript", expectedOutput: "9, 8, 5",
        options: [], answer: "9, 8, 5", explanation: ""
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Elimină duplicatele dintr-un array `[1,2,2,3,3,3,4,5,5]` folosind `Set`. Afișează array-ul unic sortat.",
        starterCode: "const arr = [1, 2, 2, 3, 3, 3, 4, 5, 5];\nconst unic = [...new Set(arr)].sort((a,b) => a - b);\nconsole.log(unic.join(', '));",
        language: "javascript", expectedOutput: "1, 2, 3, 4, 5",
        options: [], answer: "1, 2, 3, 4, 5", explanation: ""
      }
    ]
  },

  // ─── 11. Bucla while ──────────────────────────────────────────────────────
  {
    lessonId: "69f9f061e976b0f5af522956",
    name: "11. Bucla while",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează: Buclă while care numără de la 1 la 5.\n```js\nlet i = 1;\n___ (i <= 5) {\n  console.log(i);\n  i++;\n}\n```",
        options: [], answer: "while",
        explanation: "`while (condiție)` execută blocul de cod cât timp condiția este truthy.",
        starterCode: "", language: "", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează: Buclă do...while care se execută cel puțin o dată.\n```js\nlet n = 10;\n___ {\n  console.log(n);\n  n++;\n} while (n < 5);\n```",
        options: [], answer: "do",
        explanation: "`do...while` execută blocul cel puțin o dată, indiferent de condiție.",
        starterCode: "", language: "", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează: Ieși din buclă cu `break` când găsești valoarea 5.\n```js\nlet i = 0;\nwhile (i < 10) {\n  if (i === 5) ___;\n  i++;\n}\nconsole.log(i);\n```",
        options: [], answer: "break",
        explanation: "`break` întrerupe imediat executarea buclei.",
        starterCode: "", language: "", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează: Sari peste iterația curentă cu `continue`.\n```js\nlet i = 0;\nlet suma = 0;\nwhile (i < 10) {\n  i++;\n  if (i % 2 !== 0) ___;\n  suma += i;\n}\nconsole.log(suma);\n```",
        options: [], answer: "continue",
        explanation: "`continue` sare la următoarea iterație a buclei, ignorând codul rămas.",
        starterCode: "", language: "", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează: Buclă while infinită oprită cu break.\n```js\nlet count = 0;\nwhile (___) {\n  count++;\n  if (count >= 3) break;\n}\nconsole.log(count);\n```",
        options: [], answer: "true",
        explanation: "`while (true)` creează o buclă infinită care trebuie oprită explicit cu `break`.",
        starterCode: "", language: "", expectedOutput: ""
      },
      // CODING 11-15
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Calculează suma pătratelor numerelor impare de la 1 la 10 folosind o buclă while. Afișează suma.",
        starterCode: "let i = 1;\nlet suma = 0;\nwhile (i <= 10) {\n  if (i % 2 !== 0) suma += i * i;\n  i++;\n}\nconsole.log(suma);",
        language: "javascript", expectedOutput: "165",
        options: [], answer: "165", explanation: ""
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Folosind do...while, afișează numere de la 1 care se dublează (1, 2, 4, 8, 16) până depășesc 20.",
        starterCode: "let n = 1;\ndo {\n  console.log(n);\n  n *= 2;\n} while (n <= 20);",
        language: "javascript", expectedOutput: "1\n2\n4\n8\n16",
        options: [], answer: "1\n2\n4\n8\n16", explanation: ""
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Inversează un string `'JavaScript'` caracter cu caracter folosind o buclă while. Afișează stringul inversat.",
        starterCode: "const str = 'JavaScript';\nlet reversed = '';\nlet i = str.length - 1;\nwhile (i >= 0) {\n  reversed += str[i];\n  i--;\n}\nconsole.log(reversed);",
        language: "javascript", expectedOutput: "tpircSavaJ",
        options: [], answer: "tpircSavaJ", explanation: ""
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Găsește cel mai mare număr din array-ul [23, 7, 45, 12, 38, 9] folosind o buclă while. Afișează maximul.",
        starterCode: "const arr = [23, 7, 45, 12, 38, 9];\nlet max = arr[0];\nlet i = 1;\nwhile (i < arr.length) {\n  if (arr[i] > max) max = arr[i];\n  i++;\n}\nconsole.log(max);",
        language: "javascript", expectedOutput: "45",
        options: [], answer: "45", explanation: ""
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Implementează un algoritm de împărțire repetată: câte ori intră 3 în 81? Folosește o buclă while cu scădere repetată. Afișează rezultatul.",
        starterCode: "let valoare = 81;\nlet divizor = 3;\nlet count = 0;\nwhile (valoare >= divizor) {\n  valoare -= divizor;\n  count++;\n}\nconsole.log(count);",
        language: "javascript", expectedOutput: "27",
        options: [], answer: "27", explanation: ""
      }
    ]
  },

  // ─── 12. Switch / case ────────────────────────────────────────────────────
  {
    lessonId: "69f9f063e976b0f5af522963",
    name: "12. Switch / case",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează: Sintaxa switch folosind `case` și `break`.\n```js\nconst zi = 'Luni';\n___ (zi) {\n  case 'Luni': console.log('Prima zi'); break;\n  case 'Vineri': console.log('Ultima zi'); break;\n  default: console.log('Altă zi');\n}\n```",
        options: [], answer: "switch",
        explanation: "`switch(expresie)` compară expresia cu fiecare `case` și execută blocul corespunzător.",
        starterCode: "", language: "", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează: `default` se execută când niciun case nu se potrivește.\n```js\nconst culoare = 'verde';\nswitch (culoare) {\n  case 'rosu': console.log('Stop'); break;\n  case 'galben': console.log('Atenție'); break;\n  ___: console.log('Mergi');\n}\n```",
        options: [], answer: "default",
        explanation: "`default:` este ramura executată când niciun `case` nu corespunde expresiei.",
        starterCode: "", language: "", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează: `break` previne fall-through între case-uri.\n```js\nconst nota = 9;\nswitch (true) {\n  case nota >= 9: console.log('Excelent'); ___;\n  case nota >= 7: console.log('Bine'); ___;\n  default: console.log('Insuficient');\n}\n```",
        options: [], answer: "break",
        explanation: "Fără `break`, execuția continuă în case-ul următor (fall-through). `break` oprește execuția.",
        starterCode: "", language: "", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează: Grupare de case-uri pentru același comportament.\n```js\nconst luna = 4;\nswitch (luna) {\n  case 3:\n  case ___:\n  case 5: console.log('Primăvară'); break;\n  default: console.log('Altă perioadă');\n}\n```",
        options: [], answer: "4",
        explanation: "Mai multe case-uri consecutive fără `break` funcționează ca OR — împart același handler.",
        starterCode: "", language: "", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează: Switch poate folosi orice tip de valoare, inclusiv string.\n```js\nconst tip = 'cerc';\nswitch (___) {\n  case 'cerc': console.log('Rotund'); break;\n  case 'patrat': console.log('Cu colțuri'); break;\n}\n```",
        options: [], answer: "tip",
        explanation: "`switch(expresie)` evaluează expresia și compară rezultatul cu fiecare `case` folosind `===`.",
        starterCode: "", language: "", expectedOutput: ""
      },
      // CODING 11-15
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `sezon(luna)` cu switch care returnează anotimpul (1-3: Iarnă, 4-6: Primăvară, 7-9: Vară, 10-12: Toamnă). Testează cu 1, 5, 8, 11.",
        starterCode: "function sezon(luna) {\n  switch(true) {\n    case luna <= 3: return 'Iarnă';\n    case luna <= 6: return 'Primăvară';\n    case luna <= 9: return 'Vară';\n    default: return 'Toamnă';\n  }\n}\n[1, 5, 8, 11].forEach(l => console.log(sezon(l)));",
        language: "javascript", expectedOutput: "Iarnă\nPrimăvară\nVară\nToamnă",
        options: [], answer: "Iarnă\nPrimăvară\nVară\nToamnă", explanation: ""
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `tipDat(valoare)` cu switch(typeof valoare) care afișează tipul în română: 'number'→'Număr', 'string'→'Text', 'boolean'→'Boolean', default→'Alt tip'. Testează cu 42, 'salut', true.",
        starterCode: "function tipDat(val) {\n  switch(typeof val) {\n    case 'number': return 'Număr';\n    case 'string': return 'Text';\n    case 'boolean': return 'Boolean';\n    default: return 'Alt tip';\n  }\n}\n[42, 'salut', true].forEach(v => console.log(tipDat(v)));",
        language: "javascript", expectedOutput: "Număr\nText\nBoolean",
        options: [], answer: "Număr\nText\nBoolean", explanation: ""
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Implementează un calculator cu switch: funcția `calc(a, op, b)` pentru +,-,*,/ cu validare împărțire la 0. Testează cu (15,'+',5), (15,'/','0'), (4,'*',7).",
        starterCode: "function calc(a, op, b) {\n  switch(op) {\n    case '+': return a + b;\n    case '-': return a - b;\n    case '*': return a * b;\n    case '/':\n      if (b === 0) return 'Eroare';\n      return a / b;\n    default: return 'Operator invalid';\n  }\n}\nconsole.log(calc(15, '+', 5));\nconsole.log(calc(15, '/', 0));\nconsole.log(calc(4, '*', 7));",
        language: "javascript", expectedOutput: "20\nEroare\n28",
        options: [], answer: "20\nEroare\n28", explanation: ""
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `prioritate(task)` cu switch care returnează prioritatea: 'bug'→'Critic', 'feature'→'Normal', 'docs'/'test'→'Scăzut', default→'Necunoscut'. Testează cu 'bug','feature','docs','altceva'.",
        starterCode: "function prioritate(task) {\n  switch(task) {\n    case 'bug': return 'Critic';\n    case 'feature': return 'Normal';\n    case 'docs':\n    case 'test': return 'Scăzut';\n    default: return 'Necunoscut';\n  }\n}\n['bug','feature','docs','altceva'].forEach(t => console.log(prioritate(t)));",
        language: "javascript", expectedOutput: "Critic\nNormal\nScăzut\nNecunoscut",
        options: [], answer: "Critic\nNormal\nScăzut\nNecunoscut", explanation: ""
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Creează un convertor HTTP status code → mesaj cu switch: 200→'OK', 404→'Not Found', 500→'Server Error', default→'Unknown'. Testează cu 200, 404, 500, 301.",
        starterCode: "function httpStatus(code) {\n  switch(code) {\n    case 200: return 'OK';\n    case 404: return 'Not Found';\n    case 500: return 'Server Error';\n    default: return 'Unknown';\n  }\n}\n[200, 404, 500, 301].forEach(c => console.log(c + ': ' + httpStatus(c)));",
        language: "javascript", expectedOutput: "200: OK\n404: Not Found\n500: Server Error\n301: Unknown",
        options: [], answer: "200: OK\n404: Not Found\n500: Server Error\n301: Unknown", explanation: ""
      }
    ]
  },

  // ─── 13. Funcții avansate ─────────────────────────────────────────────────
  {
    lessonId: "69f9f065e976b0f5af522970",
    name: "13. Funcții avansate",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează: Un closure reține accesul la variabilele funcției exterioare.\n```js\nfunction contor() {\n  let n = 0;\n  return function() {\n    return ___++;\n  };\n}\nconst inc = contor();\nconsole.log(inc()); // 0\nconsole.log(inc()); // 1\n```",
        options: [], answer: "n",
        explanation: "Closure-ul reține referința la variabila `n` din funcția exterioară, nu copia ei.",
        starterCode: "", language: "", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează: `.map()` este o Higher-Order Function care primește o funcție.\n```js\nconst dublu = x => x * 2;\nconst rezultat = [1,2,3].___( dublu);\nconsole.log(rezultat); // [2, 4, 6]\n```",
        options: [], answer: "map",
        explanation: "`.map()` este o Higher-Order Function (HOF) deoarece primește o funcție ca argument.",
        starterCode: "", language: "", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează: Memoization — cache rezultate pentru același input.\n```js\nfunction memoize(fn) {\n  const cache = {};\n  return function(x) {\n    if (cache[x] !== undefined) return cache[x];\n    return ___ = fn(x);\n  };\n}\n```",
        options: [], answer: "cache[x]",
        explanation: "Memoization stochează rezultatele în cache pentru a evita recalcularea aceluiași input.",
        starterCode: "", language: "", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează: Currying transformă `f(a,b)` în `f(a)(b)`.\n```js\nconst aduna = a => ___ => a + b;\nconsole.log(aduna(3)(4)); // 7\n```",
        options: [], answer: "b =>",
        explanation: "Currying: `a => b => a + b` — prima funcție primește `a`, returnează o funcție care primește `b`.",
        starterCode: "", language: "", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează: Funcție pură returnează același rezultat pentru același input.\n```js\n// Pură:\nconst suma = (a, b) => a + ___;\n// Impură (depinde de stare externă):\nlet tax = 0.19;\nconst pretCuTax = (p) => p * (1 + tax);\n```",
        options: [], answer: "b",
        explanation: "O funcție pură nu are side effects și returnează mereu același rezultat pentru aceleași argumente.",
        starterCode: "", language: "", expectedOutput: ""
      },
      // CODING 11-15
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Creează o funcție `makeMultiplier(factor)` ce returnează o funcție care multiplică numărul primit. Testează cu factor=3 (testează cu 4, 7) și factor=10 (testează cu 5).",
        starterCode: "function makeMultiplier(factor) {\n  return (n) => n * factor;\n}\nconst triple = makeMultiplier(3);\nconst tenX = makeMultiplier(10);\nconsole.log(triple(4));\nconsole.log(triple(7));\nconsole.log(tenX(5));",
        language: "javascript", expectedOutput: "12\n21\n50",
        options: [], answer: "12\n21\n50", explanation: ""
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Implementează `memoize(fn)` care cacheează rezultatele. Testează cu o funcție de calcul pătrat. Apelează de 3 ori cu 5,5,6 și afișează rezultatele.",
        starterCode: "function memoize(fn) {\n  const cache = {};\n  return function(x) {\n    if (cache[x] !== undefined) return cache[x];\n    return cache[x] = fn(x);\n  };\n}\nconst patrat = memoize(n => n * n);\nconsole.log(patrat(5));\nconsole.log(patrat(5));\nconsole.log(patrat(6));",
        language: "javascript", expectedOutput: "25\n25\n36",
        options: [], answer: "25\n25\n36", explanation: ""
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Implementează `pipe(...fns)` care aplică funcțiile de la stânga la dreapta. Testează: pipe(addOne, double, square)(3) unde addOne=x+1, double=x*2, square=x*x.",
        starterCode: "const pipe = (...fns) => x => fns.reduce((acc, fn) => fn(acc), x);\nconst addOne = x => x + 1;\nconst double = x => x * 2;\nconst square = x => x * x;\nconsole.log(pipe(addOne, double, square)(3));\nconsole.log(pipe(double, addOne)(5));",
        language: "javascript", expectedOutput: "64\n11",
        options: [], answer: "64\n11", explanation: ""
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Scrie o funcție curriată `discount(procent)(pret)` care aplică reducerea. Testează: discount(10)(200), discount(25)(400).",
        starterCode: "const discount = procent => pret => pret * (1 - procent / 100);\nconsole.log(discount(10)(200));\nconsole.log(discount(25)(400));",
        language: "javascript", expectedOutput: "180\n300",
        options: [], answer: "180\n300", explanation: ""
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `once(fn)` care permite apelarea funcției o singură dată — apelurile ulterioare returnează primul rezultat. Testează cu o funcție sum(a,b) apelată de 3 ori.",
        starterCode: "function once(fn) {\n  let called = false;\n  let result;\n  return function(...args) {\n    if (!called) { called = true; result = fn(...args); }\n    return result;\n  };\n}\nconst sumOnce = once((a, b) => a + b);\nconsole.log(sumOnce(3, 4));\nconsole.log(sumOnce(10, 20));\nconsole.log(sumOnce(1, 1));",
        language: "javascript", expectedOutput: "7\n7\n7",
        options: [], answer: "7\n7\n7", explanation: ""
      }
    ]
  },

  // ─── 17. DOM: Events ──────────────────────────────────────────────────────
  {
    lessonId: "69f9f06ce976b0f5af5229a4",
    name: "17. DOM: Events",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează: Adaugă un event listener pentru click pe un element.\n```js\nconst btn = document.querySelector('#myBtn');\nbtn.___(  'click', function(e) {\n  console.log('Apăsat!');\n});\n```",
        options: [], answer: "addEventListener",
        explanation: "`addEventListener(tip, callback)` atașează un handler la un eveniment fără a suprascrie handlere existente.",
        starterCode: "", language: "", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează: Oprește propagarea evenimentului la elementele părinte.\n```js\nbutton.addEventListener('click', (e) => {\n  e.___();\n  console.log('Oprit la buton');\n});\n```",
        options: [], answer: "stopPropagation",
        explanation: "`e.stopPropagation()` previne bubbling-ul evenimentului spre elementele părinte.",
        starterCode: "", language: "", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează: Previne comportamentul implicit al unui link.\n```js\nlink.addEventListener('click', (e) => {\n  e.___();\n  console.log('Link blocat');\n});\n```",
        options: [], answer: "preventDefault",
        explanation: "`e.preventDefault()` previne acțiunea implicită (ex: navigarea unui link, submit-ul unui form).",
        starterCode: "", language: "", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează: Accesează elementul care a declanșat evenimentul.\n```js\ndocument.addEventListener('click', (e) => {\n  console.log('Apăsat:', e.___?.tagName);\n});\n```",
        options: [], answer: "target",
        explanation: "`e.target` referință elementul specific pe care s-a dat click, nu neapărat elementul cu listenerul.",
        starterCode: "", language: "", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează: Elimină un event listener anterior adăugat.\n```js\nfunction handler() { console.log('Click'); }\nbtn.addEventListener('click', handler);\nbtn.___(  'click', handler);\n```",
        options: [], answer: "removeEventListener",
        explanation: "`removeEventListener` necesită exact aceeași referință de funcție ca la adăugare.",
        starterCode: "", language: "", expectedOutput: ""
      },
      // CODING 11-15
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Simulează event delegation: funcția `delegate(target, handlers)` apelează handler-ul corespunzător dacă `target.type` se potrivește. Testează cu 2 tipuri de elemente.",
        starterCode: "function delegate(target, handlers) {\n  const handler = handlers[target.type];\n  if (handler) handler(target);\n}\ndelegate(\n  { type: 'button', text: 'Salvează' },\n  {\n    button: el => console.log('Buton:', el.text),\n    input: el => console.log('Input:', el.value)\n  }\n);\ndelegate(\n  { type: 'input', value: 'test@test.com' },\n  {\n    button: el => console.log('Buton:', el.text),\n    input: el => console.log('Input:', el.value)\n  }\n);",
        language: "javascript", expectedOutput: "Buton: Salvează\nInput: test@test.com",
        options: [], answer: "Buton: Salvează\nInput: test@test.com", explanation: ""
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Implementează un EventEmitter simplu cu `on`, `emit`. Testează emițând evenimentul 'login' cu date utilizator.",
        starterCode: "class EventEmitter {\n  constructor() { this.listeners = {}; }\n  on(ev, fn) {\n    if (!this.listeners[ev]) this.listeners[ev] = [];\n    this.listeners[ev].push(fn);\n  }\n  emit(ev, data) {\n    (this.listeners[ev] || []).forEach(fn => fn(data));\n  }\n}\nconst emitter = new EventEmitter();\nemitter.on('login', user => console.log('Logat:', user.name));\nemitter.on('login', user => console.log('Email:', user.email));\nemitter.emit('login', { name: 'Ana', email: 'ana@test.ro' });",
        language: "javascript", expectedOutput: "Logat: Ana\nEmail: ana@test.ro",
        options: [], answer: "Logat: Ana\nEmail: ana@test.ro", explanation: ""
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Simulează un sistem de tastare: funcția `handleKeyEvent(key, modifiers)` afișează combo-ul de taste (ex: 'Ctrl+S', 'Shift+A').",
        starterCode: "function handleKeyEvent(key, modifiers = []) {\n  const combo = [...modifiers, key].join('+');\n  console.log('Tastă apăsată:', combo);\n}\nhandleKeyEvent('S', ['Ctrl']);\nhandleKeyEvent('A', ['Shift']);\nhandleKeyEvent('F5', []);",
        language: "javascript", expectedOutput: "Tastă apăsată: Ctrl+S\nTastă apăsată: Shift+A\nTastă apăsată: F5",
        options: [], answer: "Tastă apăsată: Ctrl+S\nTastă apăsată: Shift+A\nTastă apăsată: F5", explanation: ""
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Simulează un input cu validare în timp real: funcția `validateInput(value)` afișează 'valid' sau 'invalid' în funcție de criteriile (min 3 caractere, nu conține spații).",
        starterCode: "function validateInput(value) {\n  if (value.length >= 3 && !value.includes(' ')) {\n    console.log(value + ': valid');\n  } else {\n    console.log(value + ': invalid');\n  }\n}\n['ab', 'cristi', 'ana maria', 'test'].forEach(validateInput);",
        language: "javascript", expectedOutput: "ab: invalid\ncristi: valid\nana maria: invalid\ntest: valid",
        options: [], answer: "ab: invalid\ncristi: valid\nana maria: invalid\ntest: valid", explanation: ""
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Implementează un sistem de drag simulation: funcția `processDragEvents(events)` procesează secvența 'dragstart','drag','dragend' și afișează starea curentă.",
        starterCode: "function processDragEvents(events) {\n  let isDragging = false;\n  events.forEach(event => {\n    if (event === 'dragstart') { isDragging = true; console.log('Drag început'); }\n    else if (event === 'drag' && isDragging) { console.log('Se trage...'); }\n    else if (event === 'dragend') { isDragging = false; console.log('Drag terminat'); }\n  });\n}\nprocessDragEvents(['dragstart', 'drag', 'drag', 'dragend']);",
        language: "javascript", expectedOutput: "Drag început\nSe trage...\nSe trage...\nDrag terminat",
        options: [], answer: "Drag început\nSe trage...\nSe trage...\nDrag terminat", explanation: ""
      }
    ]
  },

  // ─── 19. async / await ────────────────────────────────────────────────────
  {
    lessonId: "69f9f070e976b0f5af5229be",
    name: "19. async / await",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează: Declară o funcție async și folosește await.\n```js\n___ function getData() {\n  const result = ___ Promise.resolve('date');\n  console.log(result);\n}\ngetData();\n```",
        options: [], answer: "async",
        explanation: "`async` declară o funcție asincronă, iar `await` suspendă execuția până la rezolvarea Promise-ului.",
        starterCode: "", language: "", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează: Tratează erorile async cu try/catch.\n```js\nasync function main() {\n  ___  {\n    const data = await Promise.reject('Eroare!');\n  } ___ (e) {\n    console.log('Prins:', e);\n  }\n}\nmain();\n```",
        options: [], answer: "try",
        explanation: "`try/catch` captează erorile din funcțiile async, inclusiv Promise-urile respinse.",
        starterCode: "", language: "", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează: Execută Promise-uri în paralel cu async/await.\n```js\nasync function main() {\n  const [a, b] = await Promise.___([  \n    Promise.resolve(1),\n    Promise.resolve(2)\n  ]);\n  console.log(a + b);\n}\nmain();\n```",
        options: [], answer: "all",
        explanation: "`Promise.all([...])` cu `await` execută toate Promise-urile în paralel și returnează rezultatele.",
        starterCode: "", language: "", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează: O funcție async returnează implicit un Promise.\n```js\nasync function salut() {\n  return 'Bună!';\n}\n// echivalent cu:\nfunction salut2() {\n  return Promise.___(  'Bună!');\n}\n```",
        options: [], answer: "resolve",
        explanation: "O funcție `async` care returnează o valoare este echivalentă cu `return Promise.resolve(valoare)`.",
        starterCode: "", language: "", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează: `finally` se execută indiferent de rezultat.\n```js\nasync function main() {\n  try {\n    await Promise.resolve('OK');\n  } catch(e) {\n    console.log('Eroare');\n  } ___ {\n    console.log('Terminat');\n  }\n}\nmain();\n```",
        options: [], answer: "finally",
        explanation: "`finally` rulează întotdeauna, fie că Promise-ul s-a rezolvat sau respins.",
        starterCode: "", language: "", expectedOutput: ""
      },
      // CODING 11-15
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Scrie o funcție async `delay(ms)` care rezolvă după un delay simulat. Creează o funcție `main` care execută 3 pași secvențial afișând 'Pas 1', 'Pas 2', 'Pas 3'.",
        starterCode: "async function delay(ms) {\n  return new Promise(resolve => setTimeout(resolve, ms));\n}\nasync function main() {\n  console.log('Pas 1');\n  await delay(0);\n  console.log('Pas 2');\n  await delay(0);\n  console.log('Pas 3');\n}\nmain();",
        language: "javascript", expectedOutput: "Pas 1\nPas 2\nPas 3",
        options: [], answer: "Pas 1\nPas 2\nPas 3", explanation: ""
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Scrie o funcție async `fetchUser(id)` care rezolvă cu un user dacă id > 0, altfel respinge. Folosește try/catch. Testează cu id=1 și id=-1.",
        starterCode: "async function fetchUser(id) {\n  if (id > 0) return { id, name: 'User_' + id };\n  throw new Error('ID invalid');\n}\nasync function main() {\n  try {\n    const u = await fetchUser(1);\n    console.log(u.name);\n  } catch(e) { console.log('Eroare:', e.message); }\n  try {\n    const u = await fetchUser(-1);\n    console.log(u.name);\n  } catch(e) { console.log('Eroare:', e.message); }\n}\nmain();",
        language: "javascript", expectedOutput: "User_1\nEroare: ID invalid",
        options: [], answer: "User_1\nEroare: ID invalid", explanation: ""
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Execută 3 Promise-uri în paralel cu Promise.all și afișează suma rezultatelor. Testează cu valori 10, 20, 30.",
        starterCode: "async function main() {\n  const [a, b, c] = await Promise.all([\n    Promise.resolve(10),\n    Promise.resolve(20),\n    Promise.resolve(30)\n  ]);\n  console.log('Suma:', a + b + c);\n}\nmain();",
        language: "javascript", expectedOutput: "Suma: 60",
        options: [], answer: "Suma: 60", explanation: ""
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Scrie o funcție async cu `finally` care afișează 'Start', execută un await, afișează rezultatul și afișează 'Terminat' în finally.",
        starterCode: "async function process(data) {\n  console.log('Start');\n  try {\n    const result = await Promise.resolve(data.toUpperCase());\n    console.log('Rezultat:', result);\n  } catch(e) {\n    console.log('Eroare:', e.message);\n  } finally {\n    console.log('Terminat');\n  }\n}\nprocess('javascript');",
        language: "javascript", expectedOutput: "Start\nRezultat: JAVASCRIPT\nTerminat",
        options: [], answer: "Start\nRezultat: JAVASCRIPT\nTerminat", explanation: ""
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Implementează retry logic: funcția `withRetry(fn, tries)` încearcă să execute fn de `tries` ori. Simulează un fn care eșuează de 2 ori apoi reușește.",
        starterCode: "async function withRetry(fn, tries) {\n  for (let i = 1; i <= tries; i++) {\n    try {\n      return await fn();\n    } catch(e) {\n      console.log(`Încercare ${i} eșuată`);\n      if (i === tries) throw e;\n    }\n  }\n}\nlet attempt = 0;\nasync function unreliable() {\n  attempt++;\n  if (attempt < 3) throw new Error('Fail');\n  return 'Succes';\n}\nasync function main() {\n  const result = await withRetry(unreliable, 3);\n  console.log(result);\n}\nmain();",
        language: "javascript", expectedOutput: "Încercare 1 eșuată\nÎncercare 2 eșuată\nSucces",
        options: [], answer: "Încercare 1 eșuată\nÎncercare 2 eșuată\nSucces", explanation: ""
      }
    ]
  },

  // ─── 20. try / catch + Erori ──────────────────────────────────────────────
  {
    lessonId: "69f9f072e976b0f5af5229cb",
    name: "20. try / catch + Erori",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează: Aruncă o eroare cu un mesaj custom.\n```js\nfunction valideaza(n) {\n  if (n < 0) ___ new Error('Număr negativ!');\n  return n * 2;\n}\n```",
        options: [], answer: "throw",
        explanation: "`throw` aruncă o excepție care poate fi prinsă cu `try/catch`.",
        starterCode: "", language: "", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează: Prinde erori de un anumit tip.\n```js\ntry {\n  JSON.parse('{invalid}');\n} catch(e) {\n  if (e ___ SyntaxError) {\n    console.log('JSON invalid');\n  }\n}\n```",
        options: [], answer: "instanceof",
        explanation: "`instanceof` verifică tipul erorii; util pentru a gestiona diferit diferite tipuri de erori.",
        starterCode: "", language: "", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează: Creează o clasă de eroare custom.\n```js\nclass ValidationError ___ Error {\n  constructor(message, field) {\n    super(message);\n    this.field = field;\n    this.name = 'ValidationError';\n  }\n}\n```",
        options: [], answer: "extends",
        explanation: "`extends Error` moștenește comportamentul clasei Error, incluzând stack trace.",
        starterCode: "", language: "", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează: `finally` se execută indiferent dacă apare eroare sau nu.\n```js\ntry {\n  console.log('Încerc');\n  throw new Error('Oops');\n} catch(e) {\n  console.log('Eroare:', e.message);\n} ___ {\n  console.log('Terminat');\n}\n```",
        options: [], answer: "finally",
        explanation: "`finally` rulează mereu — util pentru curățarea resurselor.",
        starterCode: "", language: "", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează: Accesează mesajul erorii.\n```js\ntry {\n  undefined.property;\n} catch(e) {\n  console.log(e.___);\n}\n```",
        options: [], answer: "message",
        explanation: "Proprietatea `.message` a unui Error conține descrierea textuală a erorii.",
        starterCode: "", language: "", expectedOutput: ""
      },
      // CODING 11-15
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `divizeaza(a, b)` care aruncă un RangeError dacă b=0 și returnează câtul altfel. Testează cu (10,2) și (10,0).",
        starterCode: "function divizeaza(a, b) {\n  if (b === 0) throw new RangeError('Împărțire la zero!');\n  return a / b;\n}\ntry { console.log(divizeaza(10, 2)); } catch(e) { console.log(e.message); }\ntry { console.log(divizeaza(10, 0)); } catch(e) { console.log(e.message); }",
        language: "javascript", expectedOutput: "5\nÎmpărțire la zero!",
        options: [], answer: "5\nÎmpărțire la zero!", explanation: ""
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Creează clasa `AppError extends Error` cu proprietăți `code` și `message`. Aruncă și prinde-o în try/catch afișând codul și mesajul.",
        starterCode: "class AppError extends Error {\n  constructor(code, message) {\n    super(message);\n    this.code = code;\n    this.name = 'AppError';\n  }\n}\ntry {\n  throw new AppError(404, 'Resursa negăsită');\n} catch(e) {\n  console.log(e.name + ' [' + e.code + ']: ' + e.message);\n}",
        language: "javascript", expectedOutput: "AppError [404]: Resursa negăsită",
        options: [], answer: "AppError [404]: Resursa negăsită", explanation: ""
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `parseJSON(str)` cu try/catch care returnează obiectul sau null la eroare. Testează cu JSON valid și invalid.",
        starterCode: "function parseJSON(str) {\n  try {\n    return JSON.parse(str);\n  } catch(e) {\n    console.log('Parse error:', e.constructor.name);\n    return null;\n  }\n}\nconst result1 = parseJSON('{\"id\":1,\"name\":\"Ana\"}');\nconsole.log(result1 ? result1.name : 'null');\nconst result2 = parseJSON('{invalid}');\nconsole.log(result2);",
        language: "javascript", expectedOutput: "Ana\nParse error: SyntaxError\nnull",
        options: [], answer: "Ana\nParse error: SyntaxError\nnull", explanation: ""
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Demonstrează try/catch/finally: accesează o proprietate a unui obiect undefined și afișează eroarea în catch. finally afișează 'Gata.'.",
        starterCode: "function testError() {\n  try {\n    const obj = null;\n    console.log(obj.name);\n  } catch(e) {\n    console.log('Eroare prinsă:', e.constructor.name);\n  } finally {\n    console.log('Gata.');\n  }\n}\ntestError();",
        language: "javascript", expectedOutput: "Eroare prinsă: TypeError\nGata.",
        options: [], answer: "Eroare prinsă: TypeError\nGata.", explanation: ""
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `validateAge(age)` care aruncă TypeError dacă age nu e number, RangeError dacă e <0 sau >150. Testează cu 'text', -5, 200, 25.",
        starterCode: "function validateAge(age) {\n  if (typeof age !== 'number') throw new TypeError('Vârsta trebuie să fie număr');\n  if (age < 0 || age > 150) throw new RangeError('Vârstă invalidă: ' + age);\n  return 'Vârstă validă: ' + age;\n}\n['text', -5, 200, 25].forEach(v => {\n  try { console.log(validateAge(v)); }\n  catch(e) { console.log(e.constructor.name + ': ' + e.message); }\n});",
        language: "javascript", expectedOutput: "TypeError: Vârsta trebuie să fie număr\nRangeError: Vârstă invalidă: -5\nRangeError: Vârstă invalidă: 200\nVârstă validă: 25",
        options: [], answer: "TypeError: Vârsta trebuie să fie număr\nRangeError: Vârstă invalidă: -5\nRangeError: Vârstă invalidă: 200\nVârstă validă: 25", explanation: ""
      }
    ]
  },

  // ─── 24. Timers — setTimeout și setInterval ───────────────────────────────
  {
    lessonId: "6a021a98f0ec7fc9c03a636c",
    name: "24. Timers — setTimeout și setInterval",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează: `setTimeout` execută o funcție după un delay.\n```js\n___(function() {\n  console.log('Executat!');\n}, 1000);\n```",
        options: [], answer: "setTimeout",
        explanation: "`setTimeout(fn, delay)` planifică executarea funcției după `delay` milisecunde.",
        starterCode: "", language: "", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează: `clearTimeout` anulează un timer planificat.\n```js\nconst timerId = setTimeout(() => console.log('Niciodată'), 5000);\n___(timerId);\n```",
        options: [], answer: "clearTimeout",
        explanation: "`clearTimeout(id)` anulează executarea planificată de `setTimeout`.",
        starterCode: "", language: "", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează: `setInterval` execută o funcție la intervale regulate.\n```js\nlet count = 0;\nconst id = ___(function() {\n  count++;\n  if (count >= 3) clearInterval(id);\n}, 100);\n```",
        options: [], answer: "setInterval",
        explanation: "`setInterval(fn, ms)` execută funcția la fiecare `ms` milisecunde până la `clearInterval`.",
        starterCode: "", language: "", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează: `setTimeout` cu delay 0 rulează după codul sincron curent.\n```js\nconsole.log('1');\nsetTimeout(() => console.log('2'), ___);\nconsole.log('3');\n// Afișează: 1, 3, 2\n```",
        options: [], answer: "0",
        explanation: "Delay 0 nu înseamnă imediat — callback-ul este pus în event queue și rulează după codul sincron.",
        starterCode: "", language: "", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează: Funcție debounce folosind setTimeout.\n```js\nfunction debounce(fn, delay) {\n  let timer;\n  return function(...args) {\n    ___(timer);\n    timer = setTimeout(() => fn(...args), delay);\n  };\n}\n```",
        options: [], answer: "clearTimeout",
        explanation: "Debounce anulează timerul anterior cu `clearTimeout` și pornește unul nou la fiecare apel.",
        starterCode: "", language: "", expectedOutput: ""
      },
      // CODING 11-15
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Demonstrează că setTimeout(0) rulează după codul sincron. Afișează '1', planifică '2' cu delay 0, afișează '3'. Rezultatul va fi 1, 3, 2.",
        starterCode: "console.log('1');\nsetTimeout(() => console.log('2'), 0);\nconsole.log('3');",
        language: "javascript", expectedOutput: "1\n3\n2",
        options: [], answer: "1\n3\n2", explanation: ""
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Implementează un countdown de la 3 la 0 afișând fiecare număr. Folosește setTimeout cu delays 0, 100, 200, 300ms.",
        starterCode: "for (let i = 3; i >= 0; i--) {\n  setTimeout(() => console.log(i), (3 - i) * 100);\n}",
        language: "javascript", expectedOutput: "3\n2\n1\n0",
        options: [], answer: "3\n2\n1\n0", explanation: ""
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Implementează debounce: funcția `debounce(fn, delay)`. Testează apelând-o de 3 ori rapid (toate cu delay 0 - sincron) — ar trebui să execute doar ultima.",
        starterCode: "function debounce(fn, delay) {\n  let timer;\n  return function(...args) {\n    clearTimeout(timer);\n    timer = setTimeout(() => fn(...args), delay);\n  };\n}\nconst log = debounce((msg) => console.log('Executat:', msg), 0);\nlog('primul');\nlog('al doilea');\nlog('al treilea');",
        language: "javascript", expectedOutput: "Executat: al treilea",
        options: [], answer: "Executat: al treilea", explanation: ""
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Simulează un `setInterval` limitat la 4 execuții folosind o variabilă contor. Afișează 'Tick 1' ... 'Tick 4' și 'Stop!'.",
        starterCode: "let count = 0;\nconst id = setInterval(() => {\n  count++;\n  console.log('Tick', count);\n  if (count >= 4) {\n    clearInterval(id);\n    console.log('Stop!');\n  }\n}, 0);",
        language: "javascript", expectedOutput: "Tick 1\nTick 2\nTick 3\nTick 4\nStop!",
        options: [], answer: "Tick 1\nTick 2\nTick 3\nTick 4\nStop!", explanation: ""
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Implementează throttle: `throttle(fn, limit)` — execută fn cel mult o dată la `limit` ms. Testează apelând funcția de 4 ori, verificând că se execută corect (delay 0, primele 2 invocări).",
        starterCode: "function throttle(fn, limit) {\n  let lastCall = 0;\n  return function(...args) {\n    const now = Date.now();\n    if (now - lastCall >= limit) {\n      lastCall = now;\n      fn(...args);\n    }\n  };\n}\nconst throttled = throttle((n) => console.log('Exec:', n), 50);\nthrottled(1);\nthrottled(2);\nsetTimeout(() => throttled(3), 100);\nsetTimeout(() => throttled(4), 110);",
        language: "javascript", expectedOutput: "Exec: 1\nExec: 3",
        options: [], answer: "Exec: 1\nExec: 3", explanation: ""
      }
    ]
  },

  // ─── 25. Closures și Currying aprofundat ──────────────────────────────────
  {
    lessonId: "6a021a9af0ec7fc9c03a6379",
    name: "25. Closures și Currying aprofundat",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează: Un closure reține variabilele funcției exterioare.\n```js\nfunction outer() {\n  const secret = 42;\n  return function inner() {\n    return ___;\n  };\n}\nconst getSecret = outer();\nconsole.log(getSecret()); // 42\n```",
        options: [], answer: "secret",
        explanation: "Funcția internă `inner` are acces la `secret` prin closure, chiar dacă `outer` s-a terminat.",
        starterCode: "", language: "", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează: Closure pentru date private cu factory pattern.\n```js\nfunction createWallet(balance) {\n  return {\n    deposit: amount => balance += amount,\n    withdraw: amount => balance -= amount,\n    getBalance: () => ___\n  };\n}\n```",
        options: [], answer: "balance",
        explanation: "Factory pattern cu closure encapsulează `balance` — nu e accesibil direct din exterior.",
        starterCode: "", language: "", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează: Currying cu arity automată.\n```js\nfunction curry(fn) {\n  return function curried(...args) {\n    if (args.length >= fn.___) return fn(...args);\n    return (...more) => curried(...args, ...more);\n  };\n}\n```",
        options: [], answer: "length",
        explanation: "`fn.length` returnează numărul de parametri declarați ai funcției.",
        starterCode: "", language: "", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează: Closure pentru a genera ID-uri unice.\n```js\nconst generateId = (function() {\n  let ___ = 0;\n  return () => ++count;\n})();\nconsole.log(generateId()); // 1\nconsole.log(generateId()); // 2\n```",
        options: [], answer: "count",
        explanation: "IIFE cu closure stochează `count` privat; fiecare apel incrementează și returnează valoarea.",
        starterCode: "", language: "", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează: Partial application cu closure.\n```js\nfunction partial(fn, ...presetArgs) {\n  return function(...laterArgs) {\n    return fn(...___, ...laterArgs);\n  };\n}\nconst add5 = partial((a, b) => a + b, 5);\nconsole.log(add5(3)); // 8\n```",
        options: [], answer: "presetArgs",
        explanation: "Partial application fixează câțiva argumenți ai funcției, returnând una cu mai puțini parametri.",
        starterCode: "", language: "", expectedOutput: ""
      },
      // CODING 11-15
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Creează un factory `createCounter(start, step)` cu closure, cu metodele `next()`, `reset()`, `value()`. Testează cu start=0, step=5.",
        starterCode: "function createCounter(start = 0, step = 1) {\n  let current = start;\n  return {\n    next: () => { current += step; return current; },\n    reset: () => { current = start; return current; },\n    value: () => current\n  };\n}\nconst c = createCounter(0, 5);\nconsole.log(c.next());\nconsole.log(c.next());\nconsole.log(c.next());\nconsole.log(c.reset());",
        language: "javascript", expectedOutput: "5\n10\n15\n0",
        options: [], answer: "5\n10\n15\n0", explanation: ""
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Implementează o funcție curriată `add(a)(b)(c)` care returnează suma a+b+c. Testează cu add(1)(2)(3) și add(10)(20)(30).",
        starterCode: "const add = a => b => c => a + b + c;\nconsole.log(add(1)(2)(3));\nconsole.log(add(10)(20)(30));",
        language: "javascript", expectedOutput: "6\n60",
        options: [], answer: "6\n60", explanation: ""
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Creează un generator de ID-uri unice cu closure (IIFE). Apelează-l de 4 ori și afișează ID-urile generate.",
        starterCode: "const generateId = (function() {\n  let count = 0;\n  return () => 'id_' + (++count);\n})();\nconsole.log(generateId());\nconsole.log(generateId());\nconsole.log(generateId());\nconsole.log(generateId());",
        language: "javascript", expectedOutput: "id_1\nid_2\nid_3\nid_4",
        options: [], answer: "id_1\nid_2\nid_3\nid_4", explanation: ""
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Implementează partial application: `partial(fn, ...args)` care fixează primii argumenți. Testează cu o funcție de formatare `format(prefix, value, suffix)`.",
        starterCode: "function partial(fn, ...presetArgs) {\n  return (...laterArgs) => fn(...presetArgs, ...laterArgs);\n}\nconst format = (prefix, value, suffix) => `${prefix}${value}${suffix}`;\nconst euroFormat = partial(format, '€', );\nconsole.log(euroFormat(99.99, ' EUR'));\nconst bracketed = partial(format, '[');\nconsole.log(bracketed('text', ']'));",
        language: "javascript", expectedOutput: "€99.99 EUR\n[text]",
        options: [], answer: "€99.99 EUR\n[text]", explanation: ""
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Creează un `createLogger(prefix)` cu closure care returnează o funcție de logging ce prepend prefix-ul. Testează cu 'INFO' și 'ERROR'.",
        starterCode: "function createLogger(prefix) {\n  return (message) => console.log(`[${prefix}] ${message}`);\n}\nconst info = createLogger('INFO');\nconst error = createLogger('ERROR');\ninfo('Aplicație pornită');\nerror('Conexiune eșuată');\ninfo('Date încărcate');",
        language: "javascript", expectedOutput: "[INFO] Aplicație pornită\n[ERROR] Conexiune eșuată\n[INFO] Date încărcate",
        options: [], answer: "[INFO] Aplicație pornită\n[ERROR] Conexiune eșuată\n[INFO] Date încărcate", explanation: ""
      }
    ]
  },

  // ─── 26. Prototipuri și Prototype Chain ───────────────────────────────────
  {
    lessonId: "6a021a9cf0ec7fc9c03a6384",
    name: "26. Prototipuri și Prototype Chain",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează: Adaugă o metodă pe prototipul unui constructor.\n```js\nfunction Animal(name) {\n  this.name = name;\n}\nAnimal.___.speak = function() {\n  return this.name + ' vorbește';\n};\n```",
        options: [], answer: "prototype",
        explanation: "`Constructor.prototype` este obiectul partajat de toate instanțele create cu `new Constructor()`.",
        starterCode: "", language: "", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează: Verifică dacă un obiect are o proprietate proprie (nu moștenită).\n```js\nconst obj = { name: 'Ana' };\nconsole.log(obj.___(  'name'));      // true\nconsole.log(obj.___('toString')); // false\n```",
        options: [], answer: "hasOwnProperty",
        explanation: "`hasOwnProperty(prop)` returnează true doar pentru proprietăți definite direct pe obiect.",
        starterCode: "", language: "", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează: `Object.create()` creează un obiect cu prototipul specificat.\n```js\nconst animal = { speak() { return 'Sunet'; } };\nconst dog = Object.___(animal);\nconsole.log(dog.speak()); // 'Sunet'\n```",
        options: [], answer: "create",
        explanation: "`Object.create(proto)` creează un nou obiect cu `proto` ca prototip.",
        starterCode: "", language: "", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează: Obține prototipul unui obiect.\n```js\nconst arr = [1, 2, 3];\nconst proto = Object.___( arr);\nconsole.log(proto === Array.prototype); // true\n```",
        options: [], answer: "getPrototypeOf",
        explanation: "`Object.getPrototypeOf(obj)` returnează prototipul obiectului (înlocuitor modern pentru `__proto__`).",
        starterCode: "", language: "", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează: `instanceof` verifică dacă un obiect e instanță a unui constructor.\n```js\nclass Dog extends Animal {}\nconst rex = new Dog('Rex');\nconsole.log(rex ___ Dog);    // true\nconsole.log(rex ___ Animal); // true\n```",
        options: [], answer: "instanceof",
        explanation: "`instanceof` parcurge prototype chain — `rex` e și instanță `Dog` și `Animal`.",
        starterCode: "", language: "", expectedOutput: ""
      },
      // CODING 11-15
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Creează un constructor `Vehicle(make, speed)` și adaugă metoda `describe()` pe prototype. Instanțiază 2 vehicule și apelează describe().",
        starterCode: "function Vehicle(make, speed) {\n  this.make = make;\n  this.speed = speed;\n}\nVehicle.prototype.describe = function() {\n  return `${this.make} merge cu ${this.speed} km/h`;\n};\nconst car = new Vehicle('Toyota', 120);\nconst bike = new Vehicle('Honda', 80);\nconsole.log(car.describe());\nconsole.log(bike.describe());",
        language: "javascript", expectedOutput: "Toyota merge cu 120 km/h\nHonda merge cu 80 km/h",
        options: [], answer: "Toyota merge cu 120 km/h\nHonda merge cu 80 km/h", explanation: ""
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Demonstrează moștenire prototipală cu `Object.create()`. Creează `base` cu metoda `greet()`, apoi `child` bazat pe `base` cu propria proprietate `name`.",
        starterCode: "const base = {\n  greet() { return 'Salut de la ' + this.name; }\n};\nconst child = Object.create(base);\nchild.name = 'Copil';\nconsole.log(child.greet());\nconsole.log(Object.getPrototypeOf(child) === base);",
        language: "javascript", expectedOutput: "Salut de la Copil\ntrue",
        options: [], answer: "Salut de la Copil\ntrue", explanation: ""
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Demonstrează prototype chain: creează `Animal` cu metoda `breathe()`, `Dog extends Animal` cu `bark()`. Verifică cu `instanceof`.",
        starterCode: "class Animal {\n  breathe() { return this.name + ' respiră'; }\n}\nclass Dog extends Animal {\n  constructor(name) { super(); this.name = name; }\n  bark() { return this.name + ' latră: Ham!'; }\n}\nconst rex = new Dog('Rex');\nconsole.log(rex.breathe());\nconsole.log(rex.bark());\nconsole.log(rex instanceof Dog);\nconsole.log(rex instanceof Animal);",
        language: "javascript", expectedOutput: "Rex respiră\nRex latră: Ham!\ntrue\ntrue",
        options: [], answer: "Rex respiră\nRex latră: Ham!\ntrue\ntrue", explanation: ""
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Extinde clasa `Array` cu o metodă `sum()` pe prototip care calculează suma elementelor. Testează cu [1,2,3,4,5].",
        starterCode: "Array.prototype.sum = function() {\n  return this.reduce((acc, n) => acc + n, 0);\n};\nconst numere = [1, 2, 3, 4, 5];\nconsole.log(numere.sum());\nconsole.log([10, 20, 30].sum());",
        language: "javascript", expectedOutput: "15\n60",
        options: [], answer: "15\n60", explanation: ""
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Verifică proprietățile proprii vs moștenite cu `hasOwnProperty`. Creează un obiect cu câteva proprietăți și iterează cu `for...in` afișând doar cele proprii.",
        starterCode: "function Person(name, age) {\n  this.name = name;\n  this.age = age;\n}\nPerson.prototype.species = 'Homo sapiens';\nconst p = new Person('Cristi', 25);\nfor (const key in p) {\n  if (p.hasOwnProperty(key)) {\n    console.log('Propriu:', key, '=', p[key]);\n  }\n}",
        language: "javascript", expectedOutput: "Propriu: name = Cristi\nPropriu: age = 25",
        options: [], answer: "Propriu: name = Cristi\nPropriu: age = 25", explanation: ""
      }
    ]
  },

  // ─── 27. Symbol, WeakMap, WeakSet și Map/Set ──────────────────────────────
  {
    lessonId: "6a021a9df0ec7fc9c03a638f",
    name: "27. Symbol, WeakMap, WeakSet și Map/Set",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează: Creează un Symbol unic cu descriere.\n```js\nconst id = ___(  'userID');\nconsole.log(typeof id); // 'symbol'\n```",
        options: [], answer: "Symbol",
        explanation: "`Symbol(descriere)` creează o valoare unică; nu necesită `new`. Fiecare apel produce un Symbol diferit.",
        starterCode: "", language: "", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează: Map stochează perechi cheie-valoare cu orice tip de cheie.\n```js\nconst map = new ___();\nmap.set('cheie', 'valoare');\nconsole.log(map.get('cheie')); // 'valoare'\n```",
        options: [], answer: "Map",
        explanation: "`Map` poate folosi orice tip de cheie (inclusiv obiecte), spre deosebire de obiectele ordinare.",
        starterCode: "", language: "", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează: Set stochează valori unice.\n```js\nconst set = new Set([1, 2, 2, 3, 3, 3]);\nconsole.log(set.___); // 3\n```",
        options: [], answer: "size",
        explanation: "`.size` returnează numărul de elemente unice dintr-un Set.",
        starterCode: "", language: "", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează: Iterare Map cu for...of.\n```js\nconst map = new Map([['a', 1], ['b', 2]]);\nfor (const [key, value] of ___) {\n  console.log(key + '=' + value);\n}\n```",
        options: [], answer: "map",
        explanation: "Map este iterable direct; distructurarea `[key, value]` extrage cheia și valoarea din fiecare intrare.",
        starterCode: "", language: "", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează: Symbol ca proprietate privată.\n```js\nconst _id = Symbol('id');\nconst user = {\n  [___]: 42,\n  name: 'Ana'\n};\nconsole.log(user[_id]); // 42\n```",
        options: [], answer: "_id",
        explanation: "Simbolurile ca proprietăți (cu sintaxa `[symbol]`) nu apar în `for...in` sau `Object.keys()`.",
        starterCode: "", language: "", expectedOutput: ""
      },
      // CODING 11-15
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Creează un Map cu frecvența literelor din stringul 'banana'. Afișează fiecare literă și frecvența sa.",
        starterCode: "const str = 'banana';\nconst freq = new Map();\nfor (const ch of str) {\n  freq.set(ch, (freq.get(ch) || 0) + 1);\n}\nfor (const [ch, count] of freq) {\n  console.log(ch + ': ' + count);\n}",
        language: "javascript", expectedOutput: "b: 1\na: 3\nn: 2",
        options: [], answer: "b: 1\na: 3\nn: 2", explanation: ""
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Folosește Set pentru a găsi elementele comune (intersecție) dintre două array-uri [1,2,3,4,5] și [3,4,5,6,7].",
        starterCode: "const a = new Set([1, 2, 3, 4, 5]);\nconst b = new Set([3, 4, 5, 6, 7]);\nconst intersect = [...a].filter(x => b.has(x));\nconsole.log(intersect.join(', '));",
        language: "javascript", expectedOutput: "3, 4, 5",
        options: [], answer: "3, 4, 5", explanation: ""
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Folosește Symbol pentru a adăuga o proprietate privată `_id` unui obiect user. Demonstrează că nu apare în Object.keys() dar e accesibilă direct.",
        starterCode: "const _id = Symbol('id');\nconst user = {\n  [_id]: 1001,\n  name: 'Cristi',\n  role: 'admin'\n};\nconsole.log(Object.keys(user).join(', '));\nconsole.log(user[_id]);",
        language: "javascript", expectedOutput: "name, role\n1001",
        options: [], answer: "name, role\n1001", explanation: ""
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Creează un Map care funcționează ca un cache simplu: `set(key, value)` și `get(key)`. Testează stocând 3 valori și citind 2.",
        starterCode: "const cache = new Map();\ncache.set('user:1', { name: 'Ana', age: 25 });\ncache.set('user:2', { name: 'Ion', age: 30 });\ncache.set('config', { theme: 'dark' });\nconst u1 = cache.get('user:1');\nconst cfg = cache.get('config');\nconsole.log(u1.name + ', ' + u1.age);\nconsole.log(cfg.theme);\nconsole.log(cache.size);",
        language: "javascript", expectedOutput: "Ana, 25\ndark\n3",
        options: [], answer: "Ana, 25\ndark\n3", explanation: ""
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Calculează diferența simetrică (elemente în A sau B dar nu în ambele) a două Set-uri [1,2,3,4] și [3,4,5,6].",
        starterCode: "const setA = new Set([1, 2, 3, 4]);\nconst setB = new Set([3, 4, 5, 6]);\nconst diff = [\n  ...[...setA].filter(x => !setB.has(x)),\n  ...[...setB].filter(x => !setA.has(x))\n].sort((a,b) => a - b);\nconsole.log(diff.join(', '));",
        language: "javascript", expectedOutput: "1, 2, 5, 6",
        options: [], answer: "1, 2, 5, 6", explanation: ""
      }
    ]
  },

  // ─── 28. Proxy și Reflect ─────────────────────────────────────────────────
  {
    lessonId: "6a021a9ff0ec7fc9c03a639a",
    name: "28. Proxy și Reflect",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează: Creează un Proxy cu handler `get`.\n```js\nconst handler = {\n  ___(target, key) {\n    return key in target ? target[key] : 'Lipsă';\n  }\n};\nconst proxy = new Proxy({}, handler);\n```",
        options: [], answer: "get",
        explanation: "Trap-ul `get(target, key)` interceptează accesul la proprietăți: `proxy.property`.",
        starterCode: "", language: "", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează: Trap `set` validează valorile înainte de setare.\n```js\nconst handler = {\n  ___(target, key, value) {\n    if (typeof value !== 'number') throw new TypeError('Doar numere!');\n    target[key] = value;\n    return true;\n  }\n};\n```",
        options: [], answer: "set",
        explanation: "Trap-ul `set(target, key, value)` interceptează asignarea: `proxy.property = value`.",
        starterCode: "", language: "", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează: `Reflect.get()` delegă operațiunea la obiectul original.\n```js\nconst handler = {\n  get(target, key) {\n    console.log('Accesat:', key);\n    return ___.get(target, key);\n  }\n};\n```",
        options: [], answer: "Reflect",
        explanation: "`Reflect` oferă metode statice pentru operații JS; `Reflect.get()` delegă accesul la target.",
        starterCode: "", language: "", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează: Trap `has` interceptează operatorul `in`.\n```js\nconst handler = {\n  ___(target, key) {\n    console.log('Se verifică:', key);\n    return key in target;\n  }\n};\nconst p = new Proxy({x: 1}, handler);\nconsole.log('x' in p);\n```",
        options: [], answer: "has",
        explanation: "Trap-ul `has(target, key)` interceptează operatorul `in`: `key in proxy`.",
        starterCode: "", language: "", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează: Proxy pentru logging automat.\n```js\nfunction createLogged(obj) {\n  return new ___(obj, {\n    get(t, k) { console.log('GET', k); return t[k]; },\n    set(t, k, v) { console.log('SET', k, v); t[k]=v; return true; }\n  });\n}\n```",
        options: [], answer: "Proxy",
        explanation: "`new Proxy(target, handler)` înfășoară obiectul interceptând operațiunile specificate.",
        starterCode: "", language: "", expectedOutput: ""
      },
      // CODING 11-15
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Creează un Proxy care returnează 'Lipsă' pentru proprietăți inexistente în loc de `undefined`. Testează cu o proprietate existentă și una inexistentă.",
        starterCode: "const target = { name: 'Cristi', age: 25 };\nconst proxy = new Proxy(target, {\n  get(t, key) {\n    return key in t ? t[key] : 'Lipsă';\n  }\n});\nconsole.log(proxy.name);\nconsole.log(proxy.email);",
        language: "javascript", expectedOutput: "Cristi\nLipsă",
        options: [], answer: "Cristi\nLipsă", explanation: ""
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Creează un Proxy de validare pentru un obiect `user` care nu acceptă decât proprietăți cu valori string. Testează setând un string și un număr.",
        starterCode: "const user = {};\nconst proxy = new Proxy(user, {\n  set(target, key, value) {\n    if (typeof value !== 'string') {\n      console.log('Eroare: doar string-uri!');\n      return false;\n    }\n    target[key] = value;\n    return true;\n  }\n});\nproxy.name = 'Ana';\nconsole.log(proxy.name);\nproxy.age = 25;",
        language: "javascript", expectedOutput: "Ana\nEroare: doar string-uri!",
        options: [], answer: "Ana\nEroare: doar string-uri!", explanation: ""
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Creează un Proxy care loghează toate accesele GET și SET. Testează cu setarea și citirea unui câmp.",
        starterCode: "const obj = {};\nconst logged = new Proxy(obj, {\n  get(t, k) {\n    console.log('GET:', k);\n    return Reflect.get(t, k);\n  },\n  set(t, k, v) {\n    console.log('SET:', k, '=', v);\n    return Reflect.set(t, k, v);\n  }\n});\nlogged.x = 42;\nconsole.log(logged.x);",
        language: "javascript", expectedOutput: "SET: x = 42\nGET: x\n42",
        options: [], answer: "SET: x = 42\nGET: x\n42", explanation: ""
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Implementează un Proxy care numără câte ori sunt accesate proprietățile unui obiect. Afișează statisticile la final.",
        starterCode: "function createTracked(obj) {\n  const counts = {};\n  const proxy = new Proxy(obj, {\n    get(t, k) {\n      counts[k] = (counts[k] || 0) + 1;\n      return t[k];\n    }\n  });\n  return { proxy, counts };\n}\nconst { proxy, counts } = createTracked({ a: 1, b: 2 });\nproxy.a; proxy.a; proxy.b; proxy.a;\nconsole.log('a:', counts.a);\nconsole.log('b:', counts.b);",
        language: "javascript", expectedOutput: "a: 3\nb: 1",
        options: [], answer: "a: 3\nb: 1", explanation: ""
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Folosește Reflect.ownKeys() și Reflect.has() pentru a inspecta un obiect. Listează cheile și verifică existența unor proprietăți.",
        starterCode: "const config = { host: 'localhost', port: 3000, debug: true };\nconst keys = Reflect.ownKeys(config);\nconsole.log(keys.join(', '));\nconsole.log(Reflect.has(config, 'port'));\nconsole.log(Reflect.has(config, 'timeout'));",
        language: "javascript", expectedOutput: "host, port, debug\ntrue\nfalse",
        options: [], answer: "host, port, debug\ntrue\nfalse", explanation: ""
      }
    ]
  },

  // ─── 32. TypeScript — Introducere și Basics ───────────────────────────────
  {
    lessonId: "6a021aa5f0ec7fc9c03a63c5",
    name: "32. TypeScript — Introducere și Basics",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează: Declară o variabilă TypeScript cu tip explicit.\n```ts\nconst name: ___ = 'Cristi';\nconst age: ___ = 25;\n```",
        options: [], answer: "string",
        explanation: "În TypeScript, tipul se specifică după `:` — `string` pentru text, `number` pentru numere.",
        starterCode: "", language: "", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează: Definește o interfață TypeScript.\n```ts\n___ User {\n  id: number;\n  name: string;\n  email?: string;\n}\n```",
        options: [], answer: "interface",
        explanation: "`interface` definește forma unui obiect; `?` marchează proprietăți opționale.",
        starterCode: "", language: "", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează: Funcție TypeScript cu tipuri de parametri și return.\n```ts\nfunction add(a: number, b: number): ___ {\n  return a + b;\n}\n```",
        options: [], answer: "number",
        explanation: "Tipul de retur se specifică după paranteze; TypeScript va raporta eroare dacă returnezi alt tip.",
        starterCode: "", language: "", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează: Union type permite mai multe tipuri posibile.\n```ts\nfunction display(value: string ___ number): void {\n  console.log(value);\n}\n```",
        options: [], answer: "|",
        explanation: "`|` definește un union type — parametrul poate fi `string` sau `number`.",
        starterCode: "", language: "", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează: Tipul `any` dezactivează verificarea de tip.\n```ts\nlet data: ___ = 'text';\ndata = 42;       // OK\ndata = true;     // OK\ndata = [];       // OK\n```",
        options: [], answer: "any",
        explanation: "`any` este tipul de escape — dezactivează verificările TypeScript, dar e de evitat.",
        starterCode: "", language: "", expectedOutput: ""
      },
      // CODING 11-15 (JavaScript equivalent, since we run Node.js)
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Simulează type checking în JavaScript pur: funcția `typedAdd(a, b)` verifică că ambii parametri sunt numere (typeof), aruncă TypeError dacă nu, altfel returnează suma. Testează cu (3, 4) și ('3', 4).",
        starterCode: "function typedAdd(a, b) {\n  if (typeof a !== 'number' || typeof b !== 'number') {\n    throw new TypeError('Ambii parametri trebuie să fie numere');\n  }\n  return a + b;\n}\ntry { console.log(typedAdd(3, 4)); } catch(e) { console.log(e.message); }\ntry { console.log(typedAdd('3', 4)); } catch(e) { console.log(e.message); }",
        language: "javascript", expectedOutput: "7\nAmbii parametri trebuie să fie numere",
        options: [], answer: "7\nAmbii parametri trebuie să fie numere", explanation: ""
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Simulează o interfață TypeScript în JavaScript cu validare: funcția `createUser({id, name, email})` validează că `id` e number și `name` e string. Testează cu date valide și invalide.",
        starterCode: "function createUser({ id, name, email }) {\n  if (typeof id !== 'number') throw new TypeError('id trebuie să fie number');\n  if (typeof name !== 'string') throw new TypeError('name trebuie să fie string');\n  return { id, name, email: email || null };\n}\ntry {\n  const u = createUser({ id: 1, name: 'Ana' });\n  console.log(u.id + ': ' + u.name);\n} catch(e) { console.log(e.message); }\ntry {\n  createUser({ id: 'unu', name: 'Ion' });\n} catch(e) { console.log(e.message); }",
        language: "javascript", expectedOutput: "1: Ana\nid trebuie să fie number",
        options: [], answer: "1: Ana\nid trebuie să fie number", explanation: ""
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Simulează generics TypeScript în JavaScript: funcția `identity(value)` returnează valoarea cu tipul său. Simulează `Array<T>` cu o funcție `typedArray(type, ...items)` care validează tipul elementelor.",
        starterCode: "function typedArray(type, ...items) {\n  for (const item of items) {\n    if (typeof item !== type) throw new TypeError(`Elementul ${item} nu este ${type}`);\n  }\n  return items;\n}\ntry {\n  const nums = typedArray('number', 1, 2, 3);\n  console.log(nums.join(', '));\n} catch(e) { console.log(e.message); }\ntry {\n  typedArray('number', 1, 'doi', 3);\n} catch(e) { console.log(e.message); }",
        language: "javascript", expectedOutput: "1, 2, 3\nElementul doi nu este number",
        options: [], answer: "1, 2, 3\nElementul doi nu este number", explanation: ""
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Simulează enum TypeScript cu Object.freeze. Creează `Direction = {UP, DOWN, LEFT, RIGHT}`. Afișează valorile și verifică că nu poate fi modificat.",
        starterCode: "const Direction = Object.freeze({\n  UP: 'UP',\n  DOWN: 'DOWN',\n  LEFT: 'LEFT',\n  RIGHT: 'RIGHT'\n});\nconsole.log(Direction.UP);\nconsole.log(Direction.LEFT);\nDirection.DIAGONAL = 'DIAG'; // ignorat în strict mode\nconsole.log(Object.keys(Direction).join(', '));",
        language: "javascript", expectedOutput: "UP\nLEFT\nUP, DOWN, LEFT, RIGHT",
        options: [], answer: "UP\nLEFT\nUP, DOWN, LEFT, RIGHT", explanation: ""
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Simulează union types: funcția `display(value)` acceptă string sau number și le formatează diferit. Afișează '42 (number)', 'salut (string)' etc.",
        starterCode: "function display(value) {\n  const type = typeof value;\n  if (type !== 'string' && type !== 'number') throw new TypeError('Tip neacceptat');\n  console.log(`${value} (${type})`);\n}\ndisplay(42);\ndisplay('salut');\ndisplay(3.14);\ntry { display(true); } catch(e) { console.log(e.message); }",
        language: "javascript", expectedOutput: "42 (number)\nsalut (string)\n3.14 (number)\nTip neacceptat",
        options: [], answer: "42 (number)\nsalut (string)\n3.14 (number)\nTip neacceptat", explanation: ""
      }
    ]
  },

  // ─── 33. Testing cu Jest — Basics ─────────────────────────────────────────
  {
    lessonId: "6a021aa7f0ec7fc9c03a63d0",
    name: "33. Testing cu Jest — Basics",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează: Structura unui test Jest cu `describe` și `it`.\n```js\n___(  'Calculator', () => {\n  ___(  'adunare', () => {\n    expect(1 + 1).toBe(2);\n  });\n});\n```",
        options: [], answer: "describe",
        explanation: "`describe` grupează teste înrudite; `it` (sau `test`) definește un caz de test individual.",
        starterCode: "", language: "", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează: `toBe` verifică egalitate strictă, `toEqual` verifică egalitate structurală.\n```js\nexpect([1,2,3]).___([1,2,3]); // true\nexpect([1,2,3]).toBe([1,2,3]); // false (referințe diferite)\n```",
        options: [], answer: "toEqual",
        explanation: "`toEqual` compară structura obiectelor recursiv; `toBe` verifică identitatea referinței.",
        starterCode: "", language: "", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează: Verifică că o funcție aruncă o eroare.\n```js\ntest('validare', () => {\n  expect(() => {\n    JSON.parse('{invalid}');\n  }).___(SyntaxError);\n});\n```",
        options: [], answer: "toThrow",
        explanation: "`.toThrow(ErrorClass)` verifică că funcția aruncă o eroare de tipul specificat.",
        starterCode: "", language: "", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează: Mock function cu `jest.fn()`.\n```js\nconst mockFn = jest.___();\nmockFn('test');\nexpect(mockFn).toHaveBeenCalledWith('test');\n```",
        options: [], answer: "fn",
        explanation: "`jest.fn()` creează o funcție mock care înregistrează apelurile pentru verificare ulterioară.",
        starterCode: "", language: "", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează: `beforeEach` rulează cod înainte de fiecare test.\n```js\nlet counter;\n___(  () => {\n  counter = 0;\n});\ntest('incrementare', () => {\n  counter++;\n  expect(counter).toBe(1);\n});\n```",
        options: [], answer: "beforeEach",
        explanation: "`beforeEach(fn)` resetează starea înainte de fiecare test, asigurând izolarea.",
        starterCode: "", language: "", expectedOutput: ""
      },
      // CODING 11-15 (simulate testing logic in pure JS)
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Implementează un mini-framework de test: `test(name, fn)` care prinde erorile și afișează 'PASS: name' sau 'FAIL: name - eroare'. Testează cu 2 teste (unul care trece, unul care pică).",
        starterCode: "function expect(actual) {\n  return {\n    toBe(expected) {\n      if (actual !== expected) throw new Error(`Expected ${expected}, got ${actual}`);\n    }\n  };\n}\nfunction test(name, fn) {\n  try { fn(); console.log('PASS: ' + name); }\n  catch(e) { console.log('FAIL: ' + name + ' - ' + e.message); }\n}\ntest('suma 1+1 = 2', () => expect(1 + 1).toBe(2));\ntest('suma 2+2 = 5', () => expect(2 + 2).toBe(5));",
        language: "javascript", expectedOutput: "PASS: suma 1+1 = 2\nFAIL: suma 2+2 = 5 - Expected 5, got 4",
        options: [], answer: "PASS: suma 1+1 = 2\nFAIL: suma 2+2 = 5 - Expected 5, got 4", explanation: ""
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `multiply(a, b)` și o suită de 3 teste pentru ea: 2*3=6, 0*99=0, -2*-3=6. Afișează rezultatele testelor.",
        starterCode: "function expect(a) { return { toBe(e) { if(a!==e) throw new Error(`Got ${a}`); } }; }\nfunction test(n, fn) {\n  try { fn(); console.log('PASS: ' + n); }\n  catch(e) { console.log('FAIL: ' + n); }\n}\nfunction multiply(a, b) { return a * b; }\ntest('2*3=6', () => expect(multiply(2, 3)).toBe(6));\ntest('0*99=0', () => expect(multiply(0, 99)).toBe(0));\ntest('-2*-3=6', () => expect(multiply(-2, -3)).toBe(6));",
        language: "javascript", expectedOutput: "PASS: 2*3=6\nPASS: 0*99=0\nPASS: -2*-3=6",
        options: [], answer: "PASS: 2*3=6\nPASS: 0*99=0\nPASS: -2*-3=6", explanation: ""
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Simulează `toEqual` pentru obiecte: `deepEqual(a, b)`. Testează cu obiecte identice și diferite.",
        starterCode: "function deepEqual(a, b) {\n  return JSON.stringify(a) === JSON.stringify(b);\n}\nconsole.log(deepEqual({x:1, y:2}, {x:1, y:2}));\nconsole.log(deepEqual({x:1}, {x:2}));\nconsole.log(deepEqual([1,2,3], [1,2,3]));\nconsole.log(deepEqual([1,2], [1,2,3]));",
        language: "javascript", expectedOutput: "true\nfalse\ntrue\nfalse",
        options: [], answer: "true\nfalse\ntrue\nfalse", explanation: ""
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Simulează un spy/mock: `createSpy()` returnează o funcție care înregistrează apelurile. Testează apelând de 3 ori și verificând count-ul.",
        starterCode: "function createSpy() {\n  const calls = [];\n  const spy = (...args) => { calls.push(args); };\n  spy.getCalls = () => calls;\n  spy.callCount = () => calls.length;\n  return spy;\n}\nconst spy = createSpy();\nspy('a');\nspy('b');\nspy('c');\nconsole.log(spy.callCount());\nconsole.log(spy.getCalls()[0][0]);",
        language: "javascript", expectedOutput: "3\na",
        options: [], answer: "3\na", explanation: ""
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Implementează `describe` și `beforeEach` simplificate. Grupează 2 teste cu beforeEach care resetează un counter la 0.",
        starterCode: "function makeTestEnv() {\n  const hooks = { beforeEach: [] };\n  function beforeEach(fn) { hooks.beforeEach.push(fn); }\n  function test(name, fn) {\n    hooks.beforeEach.forEach(h => h());\n    try { fn(); console.log('PASS: ' + name); }\n    catch(e) { console.log('FAIL: ' + name); }\n  }\n  return { beforeEach, test };\n}\nconst { beforeEach, test } = makeTestEnv();\nlet count = 10;\nbeforeEach(() => { count = 0; });\ntest('count inițial e 0', () => { if(count !== 0) throw new Error(); });\ntest('count după increment e 1', () => { count++; if(count !== 1) throw new Error(); });",
        language: "javascript", expectedOutput: "PASS: count inițial e 0\nPASS: count după increment e 1",
        options: [], answer: "PASS: count inițial e 0\nPASS: count după increment e 1", explanation: ""
      }
    ]
  },

  // ─── 34. Performance și Patterns JS ──────────────────────────────────────
  {
    lessonId: "6a021aa8f0ec7fc9c03a63db",
    name: "34. Performance și Patterns JS",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează: Debounce amână execuția până la oprirea apelurilor.\n```js\nfunction debounce(fn, delay) {\n  let timer;\n  return (...args) => {\n    clearTimeout(timer);\n    timer = ___(  () => fn(...args), delay);\n  };\n}\n```",
        options: [], answer: "setTimeout",
        explanation: "Debounce folosește `setTimeout` pentru a amâna execuția și `clearTimeout` pentru a anula timerul anterior.",
        starterCode: "", language: "", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează: Throttle limitează frecvența de execuție.\n```js\nfunction throttle(fn, limit) {\n  let lastCall = 0;\n  return function(...args) {\n    const now = Date.___();\n    if (now - lastCall >= limit) {\n      lastCall = now;\n      fn(...args);\n    }\n  };\n}\n```",
        options: [], answer: "now",
        explanation: "`Date.now()` returnează timestamp-ul curent în ms; throttle permite execuția cel mult o dată la `limit` ms.",
        starterCode: "", language: "", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează: Observer pattern — abonații primesc notificări.\n```js\nclass EventBus {\n  constructor() { this.subs = {}; }\n  subscribe(event, fn) {\n    if (!this.subs[event]) this.subs[event] = [];\n    this.subs[event].___(fn);\n  }\n  publish(event, data) {\n    (this.subs[event] || []).forEach(fn => fn(data));\n  }\n}\n```",
        options: [], answer: "push",
        explanation: "Observer pattern: `subscribe` adaugă abonați cu `push`; `publish` notifică toți abonații.",
        starterCode: "", language: "", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează: Module pattern cu IIFE pentru encapsulare.\n```js\nconst myModule = (___() => {\n  const _private = 'secret';\n  return {\n    getPrivate: () => _private\n  };\n})();\n```",
        options: [], answer: "function",
        explanation: "IIFE (Immediately Invoked Function Expression) creează un scope privat; Module pattern expune doar API-ul public.",
        starterCode: "", language: "", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează: Lazy initialization — inițializează doar la primul acces.\n```js\nfunction lazyLoad() {\n  let data = ___;\n  return {\n    get() {\n      if (data === null) data = expensiveComputation();\n      return data;\n    }\n  };\n}\n```",
        options: [], answer: "null",
        explanation: "Lazy initialization amână calculul costisitor până la primul acces, îmbunătățind performanța la startup.",
        starterCode: "", language: "", expectedOutput: ""
      },
      // CODING 11-15
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Implementează Observer pattern: `EventBus` cu `subscribe`, `publish`, `unsubscribe`. Testează cu un eveniment 'update' și 2 abonați.",
        starterCode: "class EventBus {\n  constructor() { this.subs = {}; }\n  subscribe(ev, fn) {\n    if (!this.subs[ev]) this.subs[ev] = [];\n    this.subs[ev].push(fn);\n  }\n  unsubscribe(ev, fn) {\n    this.subs[ev] = (this.subs[ev] || []).filter(f => f !== fn);\n  }\n  publish(ev, data) {\n    (this.subs[ev] || []).forEach(fn => fn(data));\n  }\n}\nconst bus = new EventBus();\nconst sub1 = d => console.log('Sub1:', d);\nconst sub2 = d => console.log('Sub2:', d);\nbus.subscribe('update', sub1);\nbus.subscribe('update', sub2);\nbus.publish('update', 'v2.0');\nbus.unsubscribe('update', sub1);\nbus.publish('update', 'v2.1');",
        language: "javascript", expectedOutput: "Sub1: v2.0\nSub2: v2.0\nSub2: v2.1",
        options: [], answer: "Sub1: v2.0\nSub2: v2.0\nSub2: v2.1", explanation: ""
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Implementează Module pattern cu IIFE pentru un modul de autentificare care ține lista de utilizatori privată. Expune doar `login(user)` și `isLoggedIn(user)`.",
        starterCode: "const AuthModule = (function() {\n  const loggedUsers = new Set();\n  return {\n    login(user) {\n      loggedUsers.add(user);\n      console.log(user + ' autentificat');\n    },\n    isLoggedIn(user) {\n      return loggedUsers.has(user);\n    }\n  };\n})();\nAuthModule.login('Ana');\nAuthModule.login('Ion');\nconsole.log(AuthModule.isLoggedIn('Ana'));\nconsole.log(AuthModule.isLoggedIn('Cristi'));",
        language: "javascript", expectedOutput: "Ana autentificat\nIon autentificat\ntrue\nfalse",
        options: [], answer: "Ana autentificat\nIon autentificat\ntrue\nfalse", explanation: ""
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Implementează memoization pentru Fibonacci. Compară apelurile cu și fără memoization afișând valorile pentru fib(10) și fib(20).",
        starterCode: "function memoize(fn) {\n  const cache = new Map();\n  return function(n) {\n    if (cache.has(n)) return cache.get(n);\n    const result = fn(n);\n    cache.set(n, result);\n    return result;\n  };\n}\nconst fib = memoize(function(n) {\n  if (n <= 1) return n;\n  return fib(n - 1) + fib(n - 2);\n});\nconsole.log(fib(10));\nconsole.log(fib(20));",
        language: "javascript", expectedOutput: "55\n6765",
        options: [], answer: "55\n6765", explanation: ""
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Implementează Singleton pattern: clasa `Config` care poate fi instanțiată o singură dată. Testează că a doua instanță e aceeași cu prima.",
        starterCode: "class Config {\n  constructor(settings) {\n    if (Config._instance) return Config._instance;\n    this.settings = settings;\n    Config._instance = this;\n  }\n  get(key) { return this.settings[key]; }\n}\nconst c1 = new Config({ theme: 'dark', lang: 'ro' });\nconst c2 = new Config({ theme: 'light' });\nconsole.log(c1 === c2);\nconsole.log(c2.get('theme'));",
        language: "javascript", expectedOutput: "true\ndark",
        options: [], answer: "true\ndark", explanation: ""
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Implementează Strategy pattern: funcția `sort(arr, strategy)` cu 3 strategii: 'asc', 'desc', 'length' (sortare după lungime șiruri). Testează cu fiecare strategie.",
        starterCode: "const strategies = {\n  asc: (a, b) => a - b,\n  desc: (a, b) => b - a,\n  length: (a, b) => a.length - b.length\n};\nfunction sort(arr, strategy) {\n  return [...arr].sort(strategies[strategy]);\n}\nconsole.log(sort([3,1,4,1,5], 'asc').join(','));\nconsole.log(sort([3,1,4,1,5], 'desc').join(','));\nconsole.log(sort(['ana','cristi','ion'], 'length').join(','));",
        language: "javascript", expectedOutput: "1,1,3,4,5\n5,4,3,1,1\nana,ion,cristi",
        options: [], answer: "1,1,3,4,5\n5,4,3,1,1\nana,ion,cristi", explanation: ""
      }
    ]
  },

  // ─── 35. Mini-proiect: Todo App complet în JavaScript ─────────────────────
  {
    lessonId: "6a021aaaf0ec7fc9c03a63e5",
    name: "35. Mini-proiect: Todo App complet în JavaScript",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează: Store-ul de state folosind closure.\n```js\nfunction createStore(initialState) {\n  let state = ___ state;\n  return {\n    getState: () => state,\n    setState: (newState) => { state = { ...state, ...newState }; }\n  };\n}\n```",
        options: [], answer: "initialState",
        explanation: "Store-ul inițializează `state` cu `initialState` și îl expune prin closure.",
        starterCode: "", language: "", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează: Adaugă un todo cu un id unic.\n```js\nfunction addTodo(todos, text) {\n  const newTodo = {\n    id: Date.___(),\n    text,\n    completed: false\n  };\n  return [...todos, newTodo];\n}\n```",
        options: [], answer: "now",
        explanation: "`Date.now()` generează un timestamp unic folosit ca ID temporar.",
        starterCode: "", language: "", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează: Toggle completare task.\n```js\nfunction toggleTodo(todos, id) {\n  return todos.___(todo =>\n    todo.id === id\n      ? { ...todo, completed: !todo.completed }\n      : todo\n  );\n}\n```",
        options: [], answer: "map",
        explanation: "`.map()` returnează un array nou; pentru todo-ul cu id-ul dat, inversăm `completed`.",
        starterCode: "", language: "", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează: Filtrarea todo-urilor active.\n```js\nfunction getActive(todos) {\n  return todos.___(  todo => !todo.completed);\n}\n```",
        options: [], answer: "filter",
        explanation: "`.filter()` cu `!todo.completed` returnează doar task-urile necompletate.",
        starterCode: "", language: "", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează: Renderer care afișează lista de todos.\n```js\nfunction render(todos) {\n  todos.___(todo => {\n    const status = todo.completed ? '✓' : '○';\n    console.log(`${status} ${todo.text}`);\n  });\n}\n```",
        options: [], answer: "forEach",
        explanation: "`.forEach()` parcurge array-ul fără a returna un nou array — potrivit pentru side effects ca logging.",
        starterCode: "", language: "", expectedOutput: ""
      },
      // CODING 11-15
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Implementează funcțiile `addTodo`, `toggleTodo`, `deleteTodo` pentru un mini Todo app. Afișează lista după fiecare operație.",
        starterCode: "let todos = [];\nlet nextId = 1;\nfunction addTodo(text) {\n  todos = [...todos, { id: nextId++, text, completed: false }];\n}\nfunction toggleTodo(id) {\n  todos = todos.map(t => t.id === id ? {...t, completed: !t.completed} : t);\n}\nfunction deleteTodo(id) {\n  todos = todos.filter(t => t.id !== id);\n}\naddTodo('Învăță JavaScript');\naddTodo('Fă exerciții');\naddTodo('Commit codul');\ntoggleTodo(1);\ndeleteTodo(2);\ntodos.forEach(t => console.log((t.completed?'[x]':'[ ]') + ' ' + t.text));",
        language: "javascript", expectedOutput: "[x] Învăță JavaScript\n[ ] Commit codul",
        options: [], answer: "[x] Învăță JavaScript\n[ ] Commit codul", explanation: ""
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Implementează filtre pentru Todo app: `getAll`, `getCompleted`, `getActive`. Afișează count-ul fiecărui filtru.",
        starterCode: "const todos = [\n  { id:1, text:'Task 1', completed: true },\n  { id:2, text:'Task 2', completed: false },\n  { id:3, text:'Task 3', completed: true },\n  { id:4, text:'Task 4', completed: false },\n  { id:5, text:'Task 5', completed: false }\n];\nconst getAll = (t) => t;\nconst getCompleted = (t) => t.filter(x => x.completed);\nconst getActive = (t) => t.filter(x => !x.completed);\nconsole.log('Total:', getAll(todos).length);\nconsole.log('Completate:', getCompleted(todos).length);\nconsole.log('Active:', getActive(todos).length);",
        language: "javascript", expectedOutput: "Total: 5\nCompletate: 2\nActive: 3",
        options: [], answer: "Total: 5\nCompletate: 2\nActive: 3", explanation: ""
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Implementează un search în Todo app: funcția `searchTodos(todos, query)` returnează todos ale căror text conține query (case-insensitive). Afișează rezultatele.",
        starterCode: "const todos = [\n  { id:1, text:'Învăță JavaScript' },\n  { id:2, text:'Citește documentație React' },\n  { id:3, text:'Scrie teste JavaScript' },\n  { id:4, text:'Commit pe GitHub' }\n];\nfunction searchTodos(todos, query) {\n  return todos.filter(t => t.text.toLowerCase().includes(query.toLowerCase()));\n}\nsearchTodos(todos, 'javascript').forEach(t => console.log(t.text));",
        language: "javascript", expectedOutput: "Învăță JavaScript\nScrie teste JavaScript",
        options: [], answer: "Învăță JavaScript\nScrie teste JavaScript", explanation: ""
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Implementează undo/redo pentru Todo app folosind un history array. Adaugă 3 todos, undo una, afișează starea.",
        starterCode: "const history = [[]];\nlet historyIndex = 0;\nfunction getState() { return history[historyIndex]; }\nfunction dispatch(action) {\n  const current = getState();\n  let next;\n  if (action.type === 'ADD') next = [...current, { id: action.id, text: action.text }];\n  else if (action.type === 'DELETE') next = current.filter(t => t.id !== action.id);\n  else return;\n  history.splice(historyIndex + 1);\n  history.push(next);\n  historyIndex++;\n}\nfunction undo() { if (historyIndex > 0) historyIndex--; }\ndispatch({type:'ADD', id:1, text:'Task A'});\ndispatch({type:'ADD', id:2, text:'Task B'});\ndispatch({type:'ADD', id:3, text:'Task C'});\nundo();\ngetState().forEach(t => console.log(t.text));",
        language: "javascript", expectedOutput: "Task A\nTask B",
        options: [], answer: "Task A\nTask B", explanation: ""
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Calculează statisticile unui Todo app: total, completate, active, procent completare. Afișează un raport.",
        starterCode: "const todos = [\n  {text:'A', completed:true},\n  {text:'B', completed:false},\n  {text:'C', completed:true},\n  {text:'D', completed:true},\n  {text:'E', completed:false}\n];\nconst total = todos.length;\nconst done = todos.filter(t => t.completed).length;\nconst active = total - done;\nconst pct = Math.round((done / total) * 100);\nconsole.log('Total: ' + total);\nconsole.log('Completate: ' + done);\nconsole.log('Active: ' + active);\nconsole.log('Progres: ' + pct + '%');",
        language: "javascript", expectedOutput: "Total: 5\nCompletate: 3\nActive: 2\nProgres: 60%",
        options: [], answer: "Total: 5\nCompletate: 3\nActive: 2\nProgres: 60%", explanation: ""
      }
    ]
  },

  // ─── 36. Web APIs moderne ─────────────────────────────────────────────────
  {
    lessonId: "6a09b0e89384b94515fcef1b",
    name: "36. Web APIs moderne",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează: IntersectionObserver detectează când un element intră în viewport.\n```js\nconst observer = new ___(entries => {\n  entries.forEach(e => {\n    if (e.isIntersecting) console.log('Vizibil');\n  });\n});\nobserver.observe(element);\n```",
        options: [], answer: "IntersectionObserver",
        explanation: "`IntersectionObserver` observă când elementele intră/ies din viewport — util pentru lazy loading.",
        starterCode: "", language: "", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează: ResizeObserver reacționează la schimbări de dimensiune.\n```js\nconst ro = new ___(entries => {\n  entries.forEach(e => {\n    const { width, height } = e.contentRect;\n    console.log(width, height);\n  });\n});\nro.observe(element);\n```",
        options: [], answer: "ResizeObserver",
        explanation: "`ResizeObserver` notifică la schimbările de dimensiune ale elementelor, fără polling.",
        starterCode: "", language: "", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează: MutationObserver detectează schimbări în DOM.\n```js\nconst mo = new ___(mutations => {\n  mutations.forEach(m => console.log(m.type));\n});\nmo.observe(element, { childList: true, subtree: true });\n```",
        options: [], answer: "MutationObserver",
        explanation: "`MutationObserver` observă modificări la atributele, copiii sau textul unui element DOM.",
        starterCode: "", language: "", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează: Clipboard API scrie text în clipboard.\n```js\nasync function copyText(text) {\n  await navigator.___.writeText(text);\n  console.log('Copiat!');\n}\n```",
        options: [], answer: "clipboard",
        explanation: "`navigator.clipboard.writeText()` copiază text în clipboard (necesită permisiune HTTPS).",
        starterCode: "", language: "", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează: Web Animations API animează un element programatic.\n```js\nelement.___([\n  { opacity: 0 },\n  { opacity: 1 }\n], { duration: 300, fill: 'forwards' });\n```",
        options: [], answer: "animate",
        explanation: "`.animate(keyframes, options)` — Web Animations API permite animații JS fără CSS @keyframes.",
        starterCode: "", language: "", expectedOutput: ""
      },
      // CODING 11-15
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Simulează IntersectionObserver logic: funcția `checkVisible(elements, viewport)` returnează elementele vizibile. Un element e vizibil dacă `top < viewport.height`.",
        starterCode: "function checkVisible(elements, viewport) {\n  return elements.filter(el => el.top < viewport.height && el.bottom > 0);\n}\nconst viewport = { height: 600 };\nconst elements = [\n  { id: 'hero', top: 0, bottom: 400 },\n  { id: 'section1', top: 500, bottom: 900 },\n  { id: 'section2', top: 1000, bottom: 1400 }\n];\nconst visible = checkVisible(elements, viewport);\nvisible.forEach(el => console.log(el.id + ': vizibil'));",
        language: "javascript", expectedOutput: "hero: vizibil\nsection1: vizibil",
        options: [], answer: "hero: vizibil\nsection1: vizibil", explanation: ""
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Simulează lazy loading: funcția `lazyLoad(images, loadedCount)` returnează câte imagini trebuie încărcate (max 3 odată). Testează cu 0, 3, 6 imagini deja încărcate.",
        starterCode: "function lazyLoad(images, loadedCount) {\n  const toLoad = images.slice(loadedCount, loadedCount + 3);\n  return toLoad;\n}\nconst images = ['img1','img2','img3','img4','img5','img6','img7'];\nconsole.log(lazyLoad(images, 0).join(','));\nconsole.log(lazyLoad(images, 3).join(','));\nconsole.log(lazyLoad(images, 6).join(','));",
        language: "javascript", expectedOutput: "img1,img2,img3\nimg4,img5,img6\nimg7",
        options: [], answer: "img1,img2,img3\nimg4,img5,img6\nimg7", explanation: ""
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Simulează Page Visibility API: funcția `trackVisibility(state)` afișează mesaje diferite când tab-ul e 'visible' sau 'hidden'.",
        starterCode: "function trackVisibility(state) {\n  if (state === 'visible') console.log('Tab activ - redă video');\n  else if (state === 'hidden') console.log('Tab ascuns - pauză video');\n}\n['visible', 'hidden', 'visible'].forEach(trackVisibility);",
        language: "javascript", expectedOutput: "Tab activ - redă video\nTab ascuns - pauză video\nTab activ - redă video",
        options: [], answer: "Tab activ - redă video\nTab ascuns - pauză video\nTab activ - redă video", explanation: ""
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Simulează Geolocation API: funcția `processLocation(coords)` calculează distanța față de București (44.4, 26.1) în grade. Testează cu coordonatele Clujului (46.8, 23.6).",
        starterCode: "function processLocation(coords) {\n  const buc = { lat: 44.4, lng: 26.1 };\n  const distLat = Math.abs(coords.lat - buc.lat);\n  const distLng = Math.abs(coords.lng - buc.lng);\n  const dist = Math.sqrt(distLat**2 + distLng**2).toFixed(2);\n  console.log('Locație: ' + coords.lat + ', ' + coords.lng);\n  console.log('Distanță față de București: ~' + dist + '°');\n}\nprocessLocation({ lat: 46.8, lng: 23.6 });",
        language: "javascript", expectedOutput: "Locație: 46.8, 23.6\nDistanță față de București: ~3.35°",
        options: [], answer: "Locație: 46.8, 23.6\nDistanță față de București: ~3.35°", explanation: ""
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Simulează Web Share API: funcția `shareContent(data)` validează și loghează conținutul de distribuit (title, text, url).",
        starterCode: "function shareContent(data) {\n  if (!data.title || !data.url) {\n    console.log('Eroare: title și url sunt obligatorii');\n    return;\n  }\n  console.log('Distribuind: ' + data.title);\n  console.log('URL: ' + data.url);\n  if (data.text) console.log('Text: ' + data.text);\n}\nshareContent({ title: 'Articol JS', url: 'https://devzone.ro', text: 'Interesant!' });\nshareContent({ text: 'Fără URL' });",
        language: "javascript", expectedOutput: "Distribuind: Articol JS\nURL: https://devzone.ro\nText: Interesant!\nEroare: title și url sunt obligatorii",
        options: [], answer: "Distribuind: Articol JS\nURL: https://devzone.ro\nText: Interesant!\nEroare: title și url sunt obligatorii", explanation: ""
      }
    ]
  },

  // ─── 37. IndexedDB si Cache API ───────────────────────────────────────────
  {
    lessonId: "6a09b0ea9384b94515fcef2f",
    name: "37. IndexedDB si Cache API",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează: Deschide o bază de date IndexedDB.\n```js\nconst request = indexedDB.___(  'MyDB', 1);\nrequest.onsuccess = e => {\n  const db = e.target.result;\n};\n```",
        options: [], answer: "open",
        explanation: "`indexedDB.open(name, version)` deschide sau creează o bază de date cu versiunea specificată.",
        starterCode: "", language: "", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează: Creează un object store în `onupgradeneeded`.\n```js\nrequest.onupgradeneeded = e => {\n  const db = e.target.result;\n  db.___(  'users', { keyPath: 'id', autoIncrement: true });\n};\n```",
        options: [], answer: "createObjectStore",
        explanation: "`createObjectStore(name, options)` creează un tabel IndexedDB cu cheia primară specificată.",
        starterCode: "", language: "", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează: Adaugă un record în object store.\n```js\nconst tx = db.transaction('users', '___');\nconst store = tx.objectStore('users');\nstore.add({ name: 'Ana', email: 'ana@test.ro' });\n```",
        options: [], answer: "readwrite",
        explanation: "Tranzacțiile de scriere necesită modul `'readwrite'`; citirile pot folosi `'readonly'`.",
        starterCode: "", language: "", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează: Cache API — deschide un cache cu un nume.\n```js\nasync function cacheResource(url) {\n  const cache = await caches.___(  'v1');\n  await cache.add(url);\n}\n```",
        options: [], answer: "open",
        explanation: "`caches.open(name)` deschide sau creează un cache cu numele specificat.",
        starterCode: "", language: "", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează: Service Worker interceptează request-uri pentru caching.\n```js\nself.addEventListener('fetch', event => {\n  event.respondWith(\n    caches.___(event.request)\n      .then(response => response || fetch(event.request))\n  );\n});\n```",
        options: [], answer: "match",
        explanation: "`caches.match(request)` caută cererea în toate cache-urile disponibile.",
        starterCode: "", language: "", expectedOutput: ""
      },
      // CODING 11-15
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Simulează IndexedDB cu un Map în-memorie: implementează `createDB()` cu metodele `add(record)`, `get(id)`, `getAll()`, `delete(id)`. Testează cu câteva operații.",
        starterCode: "function createDB() {\n  const store = new Map();\n  let nextId = 1;\n  return {\n    add(record) {\n      const id = nextId++;\n      store.set(id, { ...record, id });\n      return id;\n    },\n    get(id) { return store.get(id) || null; },\n    getAll() { return [...store.values()]; },\n    delete(id) { return store.delete(id); }\n  };\n}\nconst db = createDB();\nconst id1 = db.add({ name: 'Ana', age: 25 });\nconst id2 = db.add({ name: 'Ion', age: 30 });\nconsole.log(db.get(id1).name);\ndb.delete(id2);\nconsole.log(db.getAll().length);",
        language: "javascript", expectedOutput: "Ana\n1",
        options: [], answer: "Ana\n1", explanation: ""
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Simulează Cache API cu un Map: `cacheStore` cu metodele `set(key, value)`, `get(key)`, `has(key)`, `delete(key)`. Implementează un cache LRU simplu.",
        starterCode: "function createCache(maxSize = 3) {\n  const store = new Map();\n  return {\n    set(key, value) {\n      if (store.size >= maxSize) {\n        const firstKey = store.keys().next().value;\n        store.delete(firstKey);\n      }\n      store.set(key, value);\n    },\n    get(key) { return store.get(key) || null; },\n    has(key) { return store.has(key); },\n    size() { return store.size; }\n  };\n}\nconst cache = createCache(3);\ncache.set('a', 1); cache.set('b', 2); cache.set('c', 3);\ncache.set('d', 4);\nconsole.log(cache.has('a'));\nconsole.log(cache.has('d'));\nconsole.log(cache.size());",
        language: "javascript", expectedOutput: "false\ntrue\n3",
        options: [], answer: "false\ntrue\n3", explanation: ""
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Simulează offline-first strategy: funcția `fetchWithCache(url, cache)` returnează din cache dacă există, altfel returnează 'Fetched: url' și salvează în cache.",
        starterCode: "async function fetchWithCache(url, cache) {\n  if (cache.has(url)) {\n    console.log('Cache hit:', url);\n    return cache.get(url);\n  }\n  const data = 'Response: ' + url;\n  cache.set(url, data);\n  console.log('Fetched:', url);\n  return data;\n}\nconst cache = new Map();\nasync function main() {\n  await fetchWithCache('/api/users', cache);\n  await fetchWithCache('/api/users', cache);\n  await fetchWithCache('/api/posts', cache);\n}\nmain();",
        language: "javascript", expectedOutput: "Fetched: /api/users\nCache hit: /api/users\nFetched: /api/posts",
        options: [], answer: "Fetched: /api/users\nCache hit: /api/users\nFetched: /api/posts", explanation: ""
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Simulează indexare în IndexedDB: implementează `createIndex(records, field)` care grupează înregistrările după câmpul dat. Testează cu câmp 'category'.",
        starterCode: "function createIndex(records, field) {\n  const index = new Map();\n  records.forEach(rec => {\n    const key = rec[field];\n    if (!index.has(key)) index.set(key, []);\n    index.get(key).push(rec);\n  });\n  return index;\n}\nconst records = [\n  { id:1, name:'JS Basics', category:'js' },\n  { id:2, name:'React Intro', category:'react' },\n  { id:3, name:'JS Advanced', category:'js' }\n];\nconst idx = createIndex(records, 'category');\nconsole.log('js:', idx.get('js').length);\nconsole.log('react:', idx.get('react').length);",
        language: "javascript", expectedOutput: "js: 2\nreact: 1",
        options: [], answer: "js: 2\nreact: 1", explanation: ""
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Simulează persistența offline cu localStorage (folosind un obiect în memorie). Implementează `storage` cu `setItem`, `getItem`, `removeItem`. Testează salvarea și recuperarea datelor.",
        starterCode: "const storage = (() => {\n  const store = {};\n  return {\n    setItem(key, value) { store[key] = JSON.stringify(value); },\n    getItem(key) { return store[key] ? JSON.parse(store[key]) : null; },\n    removeItem(key) { delete store[key]; },\n    keys() { return Object.keys(store); }\n  };\n})();\nstorage.setItem('user', { name: 'Ana', role: 'admin' });\nstorage.setItem('theme', 'dark');\nconst user = storage.getItem('user');\nconsole.log(user.name + ': ' + user.role);\nconsole.log(storage.getItem('theme'));\nstorage.removeItem('theme');\nconsole.log(storage.keys().join(', '));",
        language: "javascript", expectedOutput: "Ana: admin\ndark\nuser",
        options: [], answer: "Ana: admin\ndark\nuser", explanation: ""
      }
    ]
  },

  // ─── 38. Web Workers ──────────────────────────────────────────────────────
  {
    lessonId: "6a09b0ed9384b94515fcef43",
    name: "38. Web Workers",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează: Creează un Web Worker.\n```js\nconst worker = new ___(  'worker.js');\nworker.postMessage({ type: 'compute', data: [1,2,3] });\n```",
        options: [], answer: "Worker",
        explanation: "`new Worker(url)` creează un worker thread separat care rulează scriptul specificat.",
        starterCode: "", language: "", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează: Worker primește și trimite mesaje.\n```js\n// În worker.js\nself.___(  'message', event => {\n  const result = event.data * 2;\n  self.postMessage(result);\n});\n```",
        options: [], answer: "addEventListener",
        explanation: "Worker-ul ascultă mesaje cu `addEventListener('message', ...)` sau `onmessage`.",
        starterCode: "", language: "", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează: Trimite mesaj din main thread la worker.\n```js\nconst worker = new Worker('worker.js');\nworker.___(  { type: 'start', value: 42 });\n```",
        options: [], answer: "postMessage",
        explanation: "`worker.postMessage(data)` trimite date către worker; datele sunt copiate (nu partajate).",
        starterCode: "", language: "", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează: Termină un worker când nu mai e nevoie.\n```js\nworker.___(  );\nconsole.log('Worker oprit');\n```",
        options: [], answer: "terminate",
        explanation: "`worker.terminate()` oprește imediat worker-ul, eliberând resursele asociate.",
        starterCode: "", language: "", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează: SharedArrayBuffer permite memorie partajată între threads.\n```js\nconst sab = new ___(  1024);\nconst view = new Int32Array(sab);\nAtomics.store(view, 0, 42);\n```",
        options: [], answer: "SharedArrayBuffer",
        explanation: "`SharedArrayBuffer` alocă memorie accesibilă din multiple thread-uri; `Atomics` asigură operații atomice.",
        starterCode: "", language: "", expectedOutput: ""
      },
      // CODING 11-15
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Simulează comunicarea Main-Worker: funcția `simulateWorker(task)` procesează un task și returnează rezultatul. Testează cu task-uri de calcul.",
        starterCode: "function simulateWorker(task) {\n  // Simulează procesare off-thread\n  if (task.type === 'sum') {\n    return task.data.reduce((a, b) => a + b, 0);\n  } else if (task.type === 'sort') {\n    return [...task.data].sort((a, b) => a - b);\n  }\n  return null;\n}\nconsole.log(simulateWorker({ type: 'sum', data: [1,2,3,4,5] }));\nconsole.log(simulateWorker({ type: 'sort', data: [5,3,1,4,2] }).join(','));",
        language: "javascript", expectedOutput: "15\n1,2,3,4,5",
        options: [], answer: "15\n1,2,3,4,5", explanation: ""
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Simulează un worker pool: `WorkerPool` cu `maxWorkers` care procesează sarcini dintr-o coadă. Afișează ordinea procesării.",
        starterCode: "function createWorkerPool(maxWorkers, processor) {\n  const queue = [];\n  let active = 0;\n  function process() {\n    while (active < maxWorkers && queue.length > 0) {\n      const task = queue.shift();\n      active++;\n      const result = processor(task);\n      console.log('Procesat:', task, '->', result);\n      active--;\n    }\n  }\n  return {\n    add(task) { queue.push(task); process(); }\n  };\n}\nconst pool = createWorkerPool(2, n => n * n);\n[2, 3, 4, 5].forEach(n => pool.add(n));",
        language: "javascript", expectedOutput: "Procesat: 2 -> 4\nProcesat: 3 -> 9\nProcesat: 4 -> 16\nProcesat: 5 -> 25",
        options: [], answer: "Procesat: 2 -> 4\nProcesat: 3 -> 9\nProcesat: 4 -> 16\nProcesat: 5 -> 25", explanation: ""
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Simulează heavy computation off-thread: funcția `isPrime(n)` verifică primalitate (cost O(√n)). Procesează array-ul [2,7,10,13,17,20] și afișează care sunt prime.",
        starterCode: "function isPrime(n) {\n  if (n < 2) return false;\n  for (let i = 2; i <= Math.sqrt(n); i++) {\n    if (n % i === 0) return false;\n  }\n  return true;\n}\n[2, 7, 10, 13, 17, 20].forEach(n => {\n  console.log(n + ': ' + (isPrime(n) ? 'prim' : 'compus'));\n});",
        language: "javascript", expectedOutput: "2: prim\n7: prim\n10: compus\n13: prim\n17: prim\n20: compus",
        options: [], answer: "2: prim\n7: prim\n10: compus\n13: prim\n17: prim\n20: compus", explanation: ""
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Simulează message passing cu structuredClone: funcția `transferData(obj)` clonează profund obiectul (simulând transferul prin postMessage). Verifică că modificarea copiei nu afectează originalul.",
        starterCode: "function transferData(obj) {\n  return JSON.parse(JSON.stringify(obj));\n}\nconst original = { user: { name: 'Ana', scores: [90, 85] } };\nconst copy = transferData(original);\ncopy.user.name = 'Ion';\ncopy.user.scores.push(95);\nconsole.log(original.user.name);\nconsole.log(original.user.scores.length);\nconsole.log(copy.user.name);",
        language: "javascript", expectedOutput: "Ana\n2\nIon",
        options: [], answer: "Ana\n2\nIon", explanation: ""
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Simulează Atomics.add cu operații atomice simple: implementează un contor thread-safe cu operații `increment`, `decrement`, `load`. Testează cu 5 increment-uri și 2 decrement-uri.",
        starterCode: "function createAtomicCounter(initial = 0) {\n  let value = initial;\n  return {\n    increment() { return ++value; },\n    decrement() { return --value; },\n    load() { return value; }\n  };\n}\nconst counter = createAtomicCounter(0);\nfor (let i = 0; i < 5; i++) counter.increment();\nfor (let i = 0; i < 2; i++) counter.decrement();\nconsole.log(counter.load());",
        language: "javascript", expectedOutput: "3",
        options: [], answer: "3", explanation: ""
      }
    ]
  },

  // ─── 39. WebSockets si SSE ────────────────────────────────────────────────
  {
    lessonId: "6a09b0ef9384b94515fcef57",
    name: "39. WebSockets si SSE",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează: Creează o conexiune WebSocket.\n```js\nconst ws = new ___(  'ws://localhost:3000');\nws.onopen = () => console.log('Conectat');\n```",
        options: [], answer: "WebSocket",
        explanation: "`new WebSocket(url)` inițiază o conexiune WebSocket bidirecțională.",
        starterCode: "", language: "", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează: Trimite un mesaj JSON prin WebSocket.\n```js\nws.send(JSON.___(  { type: 'chat', message: 'Salut!' }));\n```",
        options: [], answer: "stringify",
        explanation: "`JSON.stringify()` serializează obiectul la string înainte de trimitere prin WebSocket.",
        starterCode: "", language: "", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează: Primește mesaje WebSocket.\n```js\nws.___ = (event) => {\n  const data = JSON.parse(event.data);\n  console.log('Mesaj:', data);\n};\n```",
        options: [], answer: "onmessage",
        explanation: "`ws.onmessage` este event handler-ul pentru mesajele primite; `event.data` conține payload-ul.",
        starterCode: "", language: "", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează: Server-Sent Events primesc stream de la server.\n```js\nconst es = new ___(  '/api/events');\nes.onmessage = (e) => console.log(e.data);\n```",
        options: [], answer: "EventSource",
        explanation: "`EventSource` creează o conexiune HTTP unidirecțională (server→client) pentru streaming de date.",
        starterCode: "", language: "", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează: Starea conexiunii WebSocket.\n```js\nconst ws = new WebSocket('ws://...');\nconsole.log(ws.___ === WebSocket.CONNECTING); // true inițial\n```",
        options: [], answer: "readyState",
        explanation: "`ws.readyState` poate fi CONNECTING(0), OPEN(1), CLOSING(2), CLOSED(3).",
        starterCode: "", language: "", expectedOutput: ""
      },
      // CODING 11-15
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Simulează un server de chat WebSocket: clasa `ChatRoom` cu `join(user)`, `send(user, msg)`, `leave(user)`. Afișează mesajele tuturor membrilor.",
        starterCode: "class ChatRoom {\n  constructor(name) { this.name = name; this.members = new Set(); }\n  join(user) {\n    this.members.add(user);\n    console.log(user + ' a intrat în ' + this.name);\n  }\n  send(user, msg) {\n    if (!this.members.has(user)) return;\n    console.log('[' + this.name + '] ' + user + ': ' + msg);\n  }\n  leave(user) {\n    this.members.delete(user);\n    console.log(user + ' a ieșit');\n  }\n}\nconst room = new ChatRoom('general');\nroom.join('Ana');\nroom.join('Ion');\nroom.send('Ana', 'Salut!');\nroom.send('Ion', 'Hei!');\nroom.leave('Ion');",
        language: "javascript", expectedOutput: "Ana a intrat în general\nIon a intrat în general\n[general] Ana: Salut!\n[general] Ion: Hei!\nIon a ieșit",
        options: [], answer: "Ana a intrat în general\nIon a intrat în general\n[general] Ana: Salut!\n[general] Ion: Hei!\nIon a ieșit", explanation: ""
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Simulează SSE stream: funcția `createStream(data)` emite evenimentele dintr-un array cu un format specific. Afișează evenimentele formatate.",
        starterCode: "function createStream(events) {\n  events.forEach(event => {\n    if (event.type) console.log('event: ' + event.type);\n    console.log('data: ' + JSON.stringify(event.data));\n    console.log('');\n  });\n}\ncreateStream([\n  { type: 'update', data: { count: 1 } },\n  { type: 'update', data: { count: 2 } }\n]);",
        language: "javascript", expectedOutput: "event: update\ndata: {\"count\":1}\n\nevent: update\ndata: {\"count\":2}\n",
        options: [], answer: "event: update\ndata: {\"count\":1}\n\nevent: update\ndata: {\"count\":2}\n", explanation: ""
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Implementează un sistem de heartbeat WebSocket: funcția `startHeartbeat(interval)` trimite ping-uri și detectează timeout. Simulează 3 ping-uri.",
        starterCode: "function simulateHeartbeat(pings) {\n  let count = 0;\n  pings.forEach(response => {\n    count++;\n    if (response === 'pong') {\n      console.log('Ping ' + count + ': conexiune OK');\n    } else {\n      console.log('Ping ' + count + ': timeout - reconectare...');\n    }\n  });\n}\nsimulateHeartbeat(['pong', 'pong', 'timeout']);",
        language: "javascript", expectedOutput: "Ping 1: conexiune OK\nPing 2: conexiune OK\nPing 3: timeout - reconectare...",
        options: [], answer: "Ping 1: conexiune OK\nPing 2: conexiune OK\nPing 3: timeout - reconectare...", explanation: ""
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Simulează protocol de mesaje WebSocket: funcția `processMessage(raw)` parsează mesajul JSON, validează tipul și procesează diferit 'chat', 'ping', 'error'.",
        starterCode: "function processMessage(raw) {\n  try {\n    const msg = JSON.parse(raw);\n    switch(msg.type) {\n      case 'chat': console.log('Chat:', msg.from + ': ' + msg.text); break;\n      case 'ping': console.log('Pong trimis'); break;\n      case 'error': console.log('Eroare server:', msg.message); break;\n      default: console.log('Tip necunoscut:', msg.type);\n    }\n  } catch(e) { console.log('Mesaj invalid'); }\n}\nprocessMessage('{\"type\":\"chat\",\"from\":\"Ana\",\"text\":\"Salut!\"}');\nprocessMessage('{\"type\":\"ping\"}');\nprocessMessage('{\"type\":\"error\",\"message\":\"Not found\"}');",
        language: "javascript", expectedOutput: "Chat: Ana: Salut!\nPong trimis\nEroare server: Not found",
        options: [], answer: "Chat: Ana: Salut!\nPong trimis\nEroare server: Not found", explanation: ""
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Implementează reconnect logic pentru WebSocket: funcția `withReconnect(connect, maxRetries)` încearcă să reconecteze la erori. Simulează 2 eșecuri și o reconectare reușită.",
        starterCode: "function withReconnect(connect, maxRetries) {\n  let retries = 0;\n  function attempt() {\n    const result = connect(retries + 1);\n    if (result === 'error' && retries < maxRetries) {\n      retries++;\n      console.log('Reconectare ' + retries + '/' + maxRetries + '...');\n      return attempt();\n    }\n    return result;\n  }\n  return attempt();\n}\nlet callCount = 0;\nfunction mockConnect(attempt) {\n  callCount++;\n  if (callCount <= 2) return 'error';\n  console.log('Conectat la încercarea ' + attempt);\n  return 'connected';\n}\nwithReconnect(mockConnect, 3);",
        language: "javascript", expectedOutput: "Reconectare 1/3...\nReconectare 2/3...\nConectat la încercarea 3",
        options: [], answer: "Reconectare 1/3...\nReconectare 2/3...\nConectat la încercarea 3", explanation: ""
      }
    ]
  },

  // ─── 40. Canvas API ───────────────────────────────────────────────────────
  {
    lessonId: "6a09b0f29384b94515fcef6b",
    name: "40. Canvas API",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează: Obține contextul 2D al unui canvas.\n```js\nconst canvas = document.getElementById('myCanvas');\nconst ctx = canvas.getContext('___');\n```",
        options: [], answer: "2d",
        explanation: "`getContext('2d')` returnează un context CanvasRenderingContext2D pentru desenare 2D.",
        starterCode: "", language: "", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează: Desenează un dreptunghi plin.\n```js\nctx.fillStyle = 'blue';\nctx.___(  10, 10, 100, 50);\n```",
        options: [], answer: "fillRect",
        explanation: "`fillRect(x, y, width, height)` desenează un dreptunghi plin cu culoarea `fillStyle`.",
        starterCode: "", language: "", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează: Desenează un cerc cu arc().\n```js\nctx.beginPath();\nctx.___(  150, 150, 50, 0, Math.PI * 2);\nctx.fill();\n```",
        options: [], answer: "arc",
        explanation: "`arc(x, y, radius, startAngle, endAngle)` desenează un arc; 0 → 2π = cerc complet.",
        starterCode: "", language: "", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează: requestAnimationFrame pentru animații fluide.\n```js\nfunction animate() {\n  ctx.clearRect(0, 0, canvas.width, canvas.height);\n  draw();\n  ___(animate);\n}\nanimate();\n```",
        options: [], answer: "requestAnimationFrame",
        explanation: "`requestAnimationFrame(callback)` sincronizează animațiile cu refresh rate-ul monitorului (~60fps).",
        starterCode: "", language: "", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează: Salvează și restaurează starea contextului.\n```js\nctx.___();\nctx.fillStyle = 'red';\nctx.fillRect(0, 0, 50, 50);\nctx.___();\n// fillStyle revine la valoarea anterioară\n```",
        options: [], answer: "save",
        explanation: "`ctx.save()` salvează starea curentă (culori, transformări); `ctx.restore()` o restaurează.",
        starterCode: "", language: "", expectedOutput: ""
      },
      // CODING 11-15
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Simulează rendering Canvas: funcția `renderScene(shapes)` procesează un array de forme și loghează ce ar desena. Forme: 'rect' și 'circle'.",
        starterCode: "function renderScene(shapes) {\n  shapes.forEach(shape => {\n    if (shape.type === 'rect') {\n      console.log(`Rect: (${shape.x},${shape.y}) ${shape.w}x${shape.h} ${shape.color}`);\n    } else if (shape.type === 'circle') {\n      console.log(`Circle: (${shape.x},${shape.y}) r=${shape.r} ${shape.color}`);\n    }\n  });\n}\nrenderScene([\n  { type:'rect', x:10, y:10, w:100, h:50, color:'red' },\n  { type:'circle', x:150, y:100, r:40, color:'blue' },\n  { type:'rect', x:200, y:50, w:60, h:60, color:'green' }\n]);",
        language: "javascript", expectedOutput: "Rect: (10,10) 100x50 red\nCircle: (150,100) r=40 blue\nRect: (200,50) 60x60 green",
        options: [], answer: "Rect: (10,10) 100x50 red\nCircle: (150,100) r=40 blue\nRect: (200,50) 60x60 green", explanation: ""
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Implementează un sistem de particule simplu: `createParticle(x, y, vx, vy)` și `updateParticles(particles)` care mișcă particulele. Afișează pozițiile după 3 frame-uri.",
        starterCode: "function createParticle(x, y, vx, vy) {\n  return { x, y, vx, vy };\n}\nfunction updateParticles(particles) {\n  return particles.map(p => ({ ...p, x: p.x + p.vx, y: p.y + p.vy }));\n}\nlet particles = [\n  createParticle(0, 0, 2, 1),\n  createParticle(10, 5, -1, 2)\n];\nfor (let f = 0; f < 3; f++) particles = updateParticles(particles);\nconsole.log(particles[0].x + ',' + particles[0].y);\nconsole.log(particles[1].x + ',' + particles[1].y);",
        language: "javascript", expectedOutput: "6,3\n7,11",
        options: [], answer: "6,3\n7,11", explanation: ""
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Implementează o funcție `interpolate(from, to, steps)` pentru animații smooth. Generează array-ul de valori intermediare și afișează-le.",
        starterCode: "function interpolate(from, to, steps) {\n  const result = [];\n  for (let i = 0; i <= steps; i++) {\n    const t = i / steps;\n    result.push(Math.round(from + (to - from) * t));\n  }\n  return result;\n}\nconsole.log(interpolate(0, 100, 4).join(', '));\nconsole.log(interpolate(255, 0, 3).join(', '));",
        language: "javascript", expectedOutput: "0, 25, 50, 75, 100\n255, 170, 85, 0",
        options: [], answer: "0, 25, 50, 75, 100\n255, 170, 85, 0", explanation: ""
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Implementează detecție de coliziune între dreptunghiuri: `collides(rectA, rectB)`. Testează cu câteva perechi.",
        starterCode: "function collides(a, b) {\n  return a.x < b.x + b.w &&\n         a.x + a.w > b.x &&\n         a.y < b.y + b.h &&\n         a.y + a.h > b.y;\n}\nconsole.log(collides({x:0,y:0,w:50,h:50}, {x:25,y:25,w:50,h:50}));\nconsole.log(collides({x:0,y:0,w:50,h:50}, {x:100,y:100,w:50,h:50}));\nconsole.log(collides({x:0,y:0,w:100,h:100}, {x:50,y:50,w:20,h:20}));",
        language: "javascript", expectedOutput: "true\nfalse\ntrue",
        options: [], answer: "true\nfalse\ntrue", explanation: ""
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Implementează un sprite animator: `SpriteAnimator` care ciclează prin frame-uri. Simulează 8 frame-uri de animație la 2 frame-uri pe pas.",
        starterCode: "class SpriteAnimator {\n  constructor(totalFrames, fps) {\n    this.frame = 0;\n    this.total = totalFrames;\n    this.fps = fps;\n  }\n  tick() {\n    this.frame = (this.frame + 1) % this.total;\n    return this.frame;\n  }\n  currentFrame() { return this.frame; }\n}\nconst anim = new SpriteAnimator(4, 12);\nfor (let i = 0; i < 6; i++) {\n  console.log('Frame:', anim.tick());\n}",
        language: "javascript", expectedOutput: "Frame: 1\nFrame: 2\nFrame: 3\nFrame: 0\nFrame: 1\nFrame: 2",
        options: [], answer: "Frame: 1\nFrame: 2\nFrame: 3\nFrame: 0\nFrame: 1\nFrame: 2", explanation: ""
      }
    ]
  },

  // ─── 41. JavaScript Performance ──────────────────────────────────────────
  {
    lessonId: "6a09b0f59384b94515fcef7f",
    name: "41. JavaScript Performance",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează: Memory leak prin event listeners neeliminate.\n```js\nfunction addListener() {\n  const btn = document.getElementById('btn');\n  btn.addEventListener('click', handleClick);\n  // CORECT: elimină la cleanup\n  return () => btn.___('click', handleClick);\n}\n```",
        options: [], answer: "removeEventListener",
        explanation: "Memory leak clasic: event listeners adăugați fără a fi eliminați rețin referința la obiect în memorie.",
        starterCode: "", language: "", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează: Evită re-renderizare inutilă cu comparare shallowă.\n```js\nfunction shouldUpdate(prevProps, nextProps) {\n  return Object.___(prevProps).some(\n    key => prevProps[key] !== nextProps[key]\n  );\n}\n```",
        options: [], answer: "keys",
        explanation: "`Object.keys()` returnează cheile proprii; compararea shallow previne re-renderizări inutile.",
        starterCode: "", language: "", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează: Batch DOM updates cu `DocumentFragment`.\n```js\nconst fragment = document.createDocumentFragment();\nitems.forEach(item => {\n  const li = document.createElement('li');\n  li.textContent = item;\n  fragment.___(li);\n});\nlist.appendChild(fragment);\n```",
        options: [], answer: "appendChild",
        explanation: "`DocumentFragment` acumulează modificări DOM fără a declanșa reflow la fiecare insert.",
        starterCode: "", language: "", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează: Măsurarea performanței cu Performance API.\n```js\nperformance.mark('start');\ndoHeavyWork();\nperformance.mark('end');\nperformance.___(  'work', 'start', 'end');\nconst [measure] = performance.getEntriesByName('work');\nconsole.log(measure.duration);\n```",
        options: [], answer: "measure",
        explanation: "`performance.measure(name, start, end)` calculează durata între două mark-uri.",
        starterCode: "", language: "", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează: Virtual list — renderizează doar elementele vizibile.\n```js\nfunction getVisibleItems(items, scrollTop, itemHeight, viewportHeight) {\n  const start = Math.___(scrollTop / itemHeight);\n  const end = start + Math.ceil(viewportHeight / itemHeight);\n  return items.___(start, end);\n}\n```",
        options: [], answer: "floor",
        explanation: "`Math.floor()` calculează indexul primului element vizibil; slice returnează doar elementele din viewport.",
        starterCode: "", language: "", expectedOutput: ""
      },
      // CODING 11-15
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Implementează virtual scrolling: `getVisibleItems(items, scrollTop, itemH, viewportH)`. Testează cu 1000 items, scroll la 500px, item height 40px, viewport 300px.",
        starterCode: "function getVisibleItems(items, scrollTop, itemH, viewportH) {\n  const start = Math.floor(scrollTop / itemH);\n  const count = Math.ceil(viewportH / itemH) + 1;\n  return items.slice(start, start + count);\n}\nconst items = Array.from({length: 1000}, (_, i) => 'Item ' + (i + 1));\nconst visible = getVisibleItems(items, 500, 40, 300);\nconsole.log(visible[0]);\nconsole.log(visible[visible.length - 1]);\nconsole.log(visible.length);",
        language: "javascript", expectedOutput: "Item 13\nItem 21\n9",
        options: [], answer: "Item 13\nItem 21\n9", explanation: ""
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Implementează memoization cu WeakMap pentru obiecte: `memoizeWeak(fn)`. Testează că același obiect returnează valoarea din cache.",
        starterCode: "function memoizeWeak(fn) {\n  const cache = new WeakMap();\n  return function(obj) {\n    if (cache.has(obj)) {\n      console.log('Cache hit');\n      return cache.get(obj);\n    }\n    const result = fn(obj);\n    cache.set(obj, result);\n    return result;\n  };\n}\nconst process = memoizeWeak(obj => obj.values.reduce((a, b) => a + b, 0));\nconst data = { values: [1, 2, 3, 4, 5] };\nconsole.log(process(data));\nconsole.log(process(data));",
        language: "javascript", expectedOutput: "15\nCache hit\n15",
        options: [], answer: "15\nCache hit\n15", explanation: ""
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Identifică un memory leak: funcția `createLeaky()` adaugă la un array global fără cleanup. Implementează versiunea corectată `createClean()` cu cleanup. Demonstrează diferența.",
        starterCode: "const globalRefs = [];\nfunction createLeaky(id) {\n  const obj = { id, data: new Array(100).fill(id) };\n  globalRefs.push(obj); // LEAK: nu se elimină niciodată\n  return obj;\n}\nfunction createClean(id) {\n  const obj = { id, data: new Array(100).fill(id) };\n  return {\n    get: () => obj,\n    cleanup: () => { obj.data = null; }\n  };\n}\nfor (let i = 0; i < 3; i++) createLeaky(i);\nconsole.log('Leaky refs:', globalRefs.length);\nconst clean = createClean(99);\nconsole.log('Clean id:', clean.get().id);\nclean.cleanup();\nconsole.log('After cleanup:', clean.get().data);",
        language: "javascript", expectedOutput: "Leaky refs: 3\nClean id: 99\nAfter cleanup: null",
        options: [], answer: "Leaky refs: 3\nClean id: 99\nAfter cleanup: null", explanation: ""
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Implementează un profiler simplu: `profile(name, fn)` măsoară timpul de execuție și afișează raportul. Testează cu o funcție lentă (loop mare).",
        starterCode: "function profile(name, fn) {\n  const start = Date.now();\n  const result = fn();\n  const duration = Date.now() - start;\n  console.log(`[${name}] Durată: ${duration >= 0 ? 'OK' : 'ERR'}ms`);\n  return result;\n}\nconst sum = profile('sumLoop', () => {\n  let s = 0;\n  for (let i = 0; i < 1000000; i++) s += i;\n  return s;\n});\nconsole.log('Rezultat:', sum);",
        language: "javascript", expectedOutput: "[sumLoop] Durată: OKms\nRezultat: 499999500000",
        options: [], answer: "[sumLoop] Durată: OKms\nRezultat: 499999500000", explanation: ""
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Implementează batch processing: `batchProcess(items, batchSize, processor)` procesează itemele în loturi și afișează progresul.",
        starterCode: "function batchProcess(items, batchSize, processor) {\n  const results = [];\n  for (let i = 0; i < items.length; i += batchSize) {\n    const batch = items.slice(i, i + batchSize);\n    const batchResult = batch.map(processor);\n    results.push(...batchResult);\n    console.log(`Lot ${Math.floor(i/batchSize)+1}: ${batch.length} iteme procesate`);\n  }\n  return results;\n}\nconst items = [1,2,3,4,5,6,7,8,9,10];\nbatchProcess(items, 3, x => x * x);",
        language: "javascript", expectedOutput: "Lot 1: 3 iteme procesate\nLot 2: 3 iteme procesate\nLot 3: 3 iteme procesate\nLot 4: 1 iteme procesate",
        options: [], answer: "Lot 1: 3 iteme procesate\nLot 2: 3 iteme procesate\nLot 3: 3 iteme procesate\nLot 4: 1 iteme procesate", explanation: ""
      }
    ]
  },

  // ─── 42. Design Patterns avansate JS ─────────────────────────────────────
  {
    lessonId: "6a09b0f79384b94515fcef93",
    name: "42. Design Patterns avansate JS",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează: Command pattern encapsulează acțiuni.\n```js\nclass Command {\n  constructor(execute, undo) {\n    this.___ = execute;\n    this.undo = undo;\n  }\n  execute() { this._execute(); }\n}\n```",
        options: [], answer: "_execute",
        explanation: "Command pattern stochează acțiunea și inversa sa, permițând undo/redo.",
        starterCode: "", language: "", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează: Mediator reduce dependențele directe între componente.\n```js\nclass Mediator {\n  constructor() { this.components = {}; }\n  register(name, comp) { this.components[___] = comp; }\n  notify(sender, event, data) {\n    Object.values(this.components).forEach(c => {\n      if (c !== sender) c.receive(event, data);\n    });\n  }\n}\n```",
        options: [], answer: "name",
        explanation: "Mediator coordonează comunicarea; componentele nu știu una de alta, ci doar de mediator.",
        starterCode: "", language: "", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează: Decorator adaugă comportament fără modificarea clasei originale.\n```js\nfunction withLogging(fn) {\n  return function(...args) {\n    console.log('Apel:', fn.___  );\n    return fn(...args);\n  };\n}\n```",
        options: [], answer: "name",
        explanation: "Decorator pattern înfășoară o funcție sau clasă adăugând comportament pre/post execuție.",
        starterCode: "", language: "", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează: Builder pattern pentru construirea de obiecte complexe pas cu pas.\n```js\nclass QueryBuilder {\n  constructor() { this.query = {}; }\n  from(table) { this.query.table = table; return ___; }\n  where(cond) { this.query.where = cond; return this; }\n  build() { return this.query; }\n}\n```",
        options: [], answer: "this",
        explanation: "Builder cu method chaining returnează `this` din fiecare metodă pentru a permite apeluri înlănțuite.",
        starterCode: "", language: "", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează: Flyweight refolosește obiecte pentru a economisi memorie.\n```js\nclass FontFactory {\n  constructor() { this._cache = {}; }\n  getFont(name, size) {\n    const key = name + '_' + size;\n    if (!this._cache[key]) {\n      this._cache[key] = { name, size };\n    }\n    return this.___[key];\n  }\n}\n```",
        options: [], answer: "_cache",
        explanation: "Flyweight partajează instanțe identice prin cache, reducând alocările de memorie.",
        starterCode: "", language: "", expectedOutput: ""
      },
      // CODING 11-15
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Implementează Command pattern cu undo/redo pentru un editor de text simplu. Testează cu add și delete.",
        starterCode: "class TextEditor {\n  constructor() { this.text = ''; this.history = []; }\n  execute(cmd) { cmd.execute(this); this.history.push(cmd); }\n  undo() {\n    const cmd = this.history.pop();\n    if (cmd) cmd.undo(this);\n  }\n}\nconst addCmd = (text) => ({\n  execute: (ed) => { ed.text += text; },\n  undo: (ed) => { ed.text = ed.text.slice(0, -text.length); }\n});\nconst editor = new TextEditor();\neditor.execute(addCmd('Hello'));\neditor.execute(addCmd(' World'));\nconsole.log(editor.text);\neditor.undo();\nconsole.log(editor.text);",
        language: "javascript", expectedOutput: "Hello World\nHello",
        options: [], answer: "Hello World\nHello", explanation: ""
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Implementează Mediator pentru un chat: `ChatMediator` gestionează comunicarea între utilizatori. Testează cu 2 useri care trimit mesaje.",
        starterCode: "class ChatMediator {\n  constructor() { this.users = {}; }\n  addUser(user) { this.users[user.name] = user; user.mediator = this; }\n  send(from, to, msg) {\n    if (this.users[to]) {\n      console.log(`[${to}] primit de la ${from}: ${msg}`);\n    }\n  }\n}\nconst med = new ChatMediator();\nconst ana = { name: 'Ana' };\nconst ion = { name: 'Ion' };\nmed.addUser(ana);\nmed.addUser(ion);\nmed.send('Ana', 'Ion', 'Salut!');\nmed.send('Ion', 'Ana', 'Hei!');",
        language: "javascript", expectedOutput: "[Ion] primit de la Ana: Salut!\n[Ana] primit de la Ion: Hei!",
        options: [], answer: "[Ion] primit de la Ana: Salut!\n[Ana] primit de la Ion: Hei!", explanation: ""
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Implementează Builder pattern pentru un `QueryBuilder` SQL cu from, where, select, build. Testează construind 2 query-uri diferite.",
        starterCode: "class QueryBuilder {\n  constructor() { this.q = { select: '*', where: null }; }\n  from(t) { this.q.table = t; return this; }\n  select(...cols) { this.q.select = cols.join(', '); return this; }\n  where(cond) { this.q.where = cond; return this; }\n  build() {\n    let q = `SELECT ${this.q.select} FROM ${this.q.table}`;\n    if (this.q.where) q += ` WHERE ${this.q.where}`;\n    return q;\n  }\n}\nconsole.log(new QueryBuilder().from('users').select('name','age').where('age > 18').build());\nconsole.log(new QueryBuilder().from('products').build());",
        language: "javascript", expectedOutput: "SELECT name, age FROM users WHERE age > 18\nSELECT * FROM products",
        options: [], answer: "SELECT name, age FROM users WHERE age > 18\nSELECT * FROM products", explanation: ""
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Implementează Decorator pattern: `withTimestamp(fn)` și `withRetry(fn, n)` ca decoratori. Compune-i și testează.",
        starterCode: "function withTimestamp(fn) {\n  return function(...args) {\n    const result = fn(...args);\n    console.log(`[${new Date().getFullYear()}] ${result}`);\n    return result;\n  };\n}\nfunction greet(name) { return 'Bună, ' + name + '!'; }\nconst greetWithTs = withTimestamp(greet);\ngreetWithTs('Ana');\ngreetWithTs('Ion');",
        language: "javascript", expectedOutput: "[2026] Bună, Ana!\n[2026] Bună, Ion!",
        options: [], answer: "[2026] Bună, Ana!\n[2026] Bună, Ion!", explanation: ""
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Implementează Chain of Responsibility: `createChain(...handlers)` procesează o cerere prin mai mulți handleri. Primul care poate procesa o preia.",
        starterCode: "function createChain(...handlers) {\n  return function(request) {\n    for (const handler of handlers) {\n      if (handler.canHandle(request)) {\n        console.log(handler.name + ' procesează: ' + request.type);\n        handler.handle(request);\n        return;\n      }\n    }\n    console.log('Niciun handler nu poate procesa: ' + request.type);\n  };\n}\nconst chain = createChain(\n  { name: 'AuthHandler', canHandle: r => r.type === 'auth', handle: r => console.log('Auth OK pentru', r.user) },\n  { name: 'DataHandler', canHandle: r => r.type === 'data', handle: r => console.log('Date:', r.payload) }\n);\nchain({ type: 'auth', user: 'Ana' });\nchain({ type: 'data', payload: 42 });\nchain({ type: 'unknown' });",
        language: "javascript", expectedOutput: "AuthHandler procesează: auth\nAuth OK pentru Ana\nDataHandler procesează: data\nDate: 42\nNiciun handler nu poate procesa: unknown",
        options: [], answer: "AuthHandler procesează: auth\nAuth OK pentru Ana\nDataHandler procesează: data\nDate: 42\nNiciun handler nu poate procesa: unknown", explanation: ""
      }
    ]
  },

  // ─── 43. Functional Programming in JS ────────────────────────────────────
  {
    lessonId: "6a09b0fa9384b94515fcefa7",
    name: "43. Functional Programming in JS",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează: O funcție pură nu modifică starea externă.\n```js\n// Pură - returnează nou array:\nconst addItem = (arr, item) => [...arr, ___];\n// Impură - modifică original:\nconst addItemMutate = (arr, item) => { arr.push(item); return arr; };\n```",
        options: [], answer: "item",
        explanation: "Funcțiile pure returnează un nou array cu spread `[...arr, item]` fără a modifica originalul.",
        starterCode: "", language: "", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează: `compose` aplică funcțiile de la dreapta la stânga.\n```js\nconst compose = (...fns) => x => fns.___(  (v, f) => f(v), x);\n```",
        options: [], answer: "reduceRight",
        explanation: "`reduceRight` parcurge funcțiile de la dreapta la stânga, aplicând fiecare la rezultatul anterior.",
        starterCode: "", language: "", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează: Functor — obiect care implementează `.map()`.\n```js\nclass Maybe {\n  constructor(value) { this.value = value; }\n  ___(fn) {\n    if (this.value == null) return new Maybe(null);\n    return new Maybe(fn(this.value));\n  }\n  getOrElse(def) { return this.value ?? def; }\n}\n```",
        options: [], answer: "map",
        explanation: "Maybe este un functor — implementează `.map()` care aplică funcția doar dacă valoarea nu e null/undefined.",
        starterCode: "", language: "", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează: Transducer — transformare componabilă eficientă.\n```js\nconst map = fn => reducer => (acc, val) =>\n  reducer(acc, ___(val));\n```",
        options: [], answer: "fn",
        explanation: "Transducers combină map/filter fără a crea array-uri intermediare — mai eficient pe colecții mari.",
        starterCode: "", language: "", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează: Point-free style — fără menționarea explicită a argumentelor.\n```js\n// Cu argumente:\nconst double = arr => arr.map(x => x * 2);\n// Point-free:\nconst double2 = arr => arr.___(x => x * 2);\n// sau:\nconst timesTwo = n => n * 2;\nconst double3 = arr => arr.map(___);\n```",
        options: [], answer: "timesTwo",
        explanation: "Point-free style referențiază funcția direct fără argumentele intermediare.",
        starterCode: "", language: "", expectedOutput: ""
      },
      // CODING 11-15
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Demonstrează imutabilitate: funcția `updateUser(user, updates)` returnează un obiect nou, iar originalul rămâne neschimbat. Testează.",
        starterCode: "function updateUser(user, updates) {\n  return { ...user, ...updates };\n}\nconst original = { id: 1, name: 'Ana', role: 'user' };\nconst updated = updateUser(original, { role: 'admin', email: 'ana@test.ro' });\nconsole.log(original.role);\nconsole.log(updated.role);\nconsole.log(updated.email);\nconsole.log(original === updated);",
        language: "javascript", expectedOutput: "user\nadmin\nana@test.ro\nfalse",
        options: [], answer: "user\nadmin\nana@test.ro\nfalse", explanation: ""
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Implementează `compose` și `pipe`. Testează cu un pipeline: `trim → toLowerCase → split pe spații → join cu -`.",
        starterCode: "const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);\nconst trim = s => s.trim();\nconst lower = s => s.toLowerCase();\nconst toSlug = pipe(trim, lower, s => s.split(' '), arr => arr.join('-'));\nconsole.log(toSlug('  Hello World  '));\nconsole.log(toSlug('  JavaScript Este Super  '));",
        language: "javascript", expectedOutput: "hello-world\njavascript-este-super",
        options: [], answer: "hello-world\njavascript-este-super", explanation: ""
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Implementează Maybe monad pentru a preveni null pointer exceptions. Testează cu valori existente și lipsă.",
        starterCode: "class Maybe {\n  constructor(v) { this.value = v; }\n  static of(v) { return new Maybe(v); }\n  map(fn) {\n    if (this.value == null) return Maybe.of(null);\n    return Maybe.of(fn(this.value));\n  }\n  getOrElse(def) { return this.value != null ? this.value : def; }\n}\nconst users = { 1: { name: 'Ana', address: { city: 'Cluj' } }, 2: { name: 'Ion' } };\nconst getCity = id => Maybe.of(users[id]).map(u => u.address).map(a => a.city).getOrElse('Necunoscut');\nconsole.log(getCity(1));\nconsole.log(getCity(2));\nconsole.log(getCity(99));",
        language: "javascript", expectedOutput: "Cluj\nNecunoscut\nNecunoscut",
        options: [], answer: "Cluj\nNecunoscut\nNecunoscut", explanation: ""
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Implementează funcții point-free pentru procesarea unui array de produse: filtrare după preț > 50, mapping la nume, sortare alfabetică.",
        starterCode: "const products = [\n  { name: 'Laptop', price: 2000 },\n  { name: 'Mouse', price: 30 },\n  { name: 'Monitor', price: 800 },\n  { name: 'Keyboard', price: 120 }\n];\nconst isExpensive = p => p.price > 50;\nconst getName = p => p.name;\nconst sortAlpha = (a, b) => a.localeCompare(b);\nconst result = products\n  .filter(isExpensive)\n  .map(getName)\n  .sort(sortAlpha);\nconsole.log(result.join(', '));",
        language: "javascript", expectedOutput: "Keyboard, Laptop, Monitor",
        options: [], answer: "Keyboard, Laptop, Monitor", explanation: ""
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Implementează `groupBy(arr, fn)` în stil funcțional. Grupează produsele după categoria lor.",
        starterCode: "const groupBy = (arr, fn) => arr.reduce((groups, item) => {\n  const key = fn(item);\n  return { ...groups, [key]: [...(groups[key] || []), item] };\n}, {});\nconst items = [\n  { name: 'Mere', cat: 'fructe' },\n  { name: 'Pere', cat: 'fructe' },\n  { name: 'Morcovi', cat: 'legume' },\n  { name: 'Portocale', cat: 'fructe' },\n  { name: 'Cartofi', cat: 'legume' }\n];\nconst groups = groupBy(items, i => i.cat);\nconsole.log('fructe:', groups.fructe.length);\nconsole.log('legume:', groups.legume.length);",
        language: "javascript", expectedOutput: "fructe: 3\nlegume: 2",
        options: [], answer: "fructe: 3\nlegume: 2", explanation: ""
      }
    ]
  },

  // ─── 44. TypeScript Avansat ───────────────────────────────────────────────
  {
    lessonId: "6a09b0fc9384b94515fcefbb",
    name: "44. TypeScript Avansat",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează: Generic cu constrângere.\n```ts\nfunction getProperty<T, K ___ keyof T>(obj: T, key: K): T[K] {\n  return obj[key];\n}\n```",
        options: [], answer: "extends",
        explanation: "`K extends keyof T` constrânge K la cheile lui T — TypeScript verifică că cheia există.",
        starterCode: "", language: "", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează: Conditional type — tip diferit în funcție de condiție.\n```ts\ntype IsArray<T> = T ___ any[] ? true : false;\ntype A = IsArray<number[]>; // true\ntype B = IsArray<string>;   // false\n```",
        options: [], answer: "extends",
        explanation: "Conditional types folosesc `T extends Condition ? TypeTrue : TypeFalse` — evaluare la nivel de tip.",
        starterCode: "", language: "", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează: Mapped type — transformă toate proprietățile unui tip.\n```ts\ntype Readonly<T> = {\n  readonly [K ___ keyof T]: T[K];\n};\n```",
        options: [], answer: "in",
        explanation: "`[K in keyof T]` iterează peste cheile lui T, permițând transformarea fiecărei proprietăți.",
        starterCode: "", language: "", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează: Utility type `Partial` face toate proprietățile opționale.\n```ts\ntype Partial<T> = {\n  [K in keyof T]___: T[K];\n};\n```",
        options: [], answer: "?",
        explanation: "`?` în mapped type face proprietatea opțională — `Partial<T>` e util pentru update-uri parțiale.",
        starterCode: "", language: "", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează: Template literal types.\n```ts\ntype EventName = 'click' | 'focus' | 'blur';\ntype Handler = `on${___<EventName>}`;\n// 'onClick' | 'onFocus' | 'onBlur'\n```",
        options: [], answer: "Capitalize",
        explanation: "`Capitalize<T>` capitalizează primul caracter al string literal types — util pentru generarea de tipuri.",
        starterCode: "", language: "", expectedOutput: ""
      },
      // CODING 11-15
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Simulează generics TypeScript cu funcții JavaScript: `createTypedList(type)` returnează o listă care acceptă doar elemente de tipul specificat.",
        starterCode: "function createTypedList(type) {\n  const items = [];\n  return {\n    add(item) {\n      if (typeof item !== type) throw new TypeError(`Așteptat ${type}, primit ${typeof item}`);\n      items.push(item);\n    },\n    getAll() { return [...items]; },\n    size() { return items.length; }\n  };\n}\nconst numList = createTypedList('number');\nnumList.add(1); numList.add(2); numList.add(3);\nconsole.log(numList.getAll().join(', '));\ntry { numList.add('text'); } catch(e) { console.log(e.message); }",
        language: "javascript", expectedOutput: "1, 2, 3\nAșteptat number, primit string",
        options: [], answer: "1, 2, 3\nAșteptat number, primit string", explanation: ""
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Simulează Mapped Types: `makePartial(schema, obj)` validează un obiect conform unui schema, permițând proprietăți opționale. Testează.",
        starterCode: "function makePartial(defaults, overrides) {\n  return { ...defaults, ...overrides };\n}\nconst userDefaults = { name: '', email: '', age: 0, active: true };\nconst newUser = makePartial(userDefaults, { name: 'Cristi', email: 'c@c.com' });\nconsole.log(newUser.name);\nconsole.log(newUser.age);\nconsole.log(newUser.active);",
        language: "javascript", expectedOutput: "Cristi\n0\ntrue",
        options: [], answer: "Cristi\n0\ntrue", explanation: ""
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Simulează utility type `Pick<T, K>`: funcția `pick(obj, keys)` returnează un obiect nou cu doar cheile specificate. Testează.",
        starterCode: "function pick(obj, keys) {\n  return keys.reduce((result, key) => {\n    if (key in obj) result[key] = obj[key];\n    return result;\n  }, {});\n}\nconst user = { id: 1, name: 'Ana', email: 'ana@test.ro', password: 'secret', age: 25 };\nconst publicUser = pick(user, ['id', 'name', 'email']);\nconsole.log(Object.keys(publicUser).join(', '));\nconsole.log('password' in publicUser);",
        language: "javascript", expectedOutput: "id, name, email\nfalse",
        options: [], answer: "id, name, email\nfalse", explanation: ""
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Simulează discriminated unions: funcția `processShape(shape)` cu câmpul `type` ca discriminator, calculând aria corect pentru 'circle' și 'rectangle'.",
        starterCode: "function processShape(shape) {\n  switch(shape.type) {\n    case 'circle':\n      const area1 = Math.PI * shape.radius ** 2;\n      console.log('Cerc, aria: ' + area1.toFixed(2));\n      break;\n    case 'rectangle':\n      const area2 = shape.width * shape.height;\n      console.log('Dreptunghi, aria: ' + area2);\n      break;\n    default:\n      console.log('Formă necunoscută');\n  }\n}\nprocessShape({ type: 'circle', radius: 5 });\nprocessShape({ type: 'rectangle', width: 4, height: 6 });",
        language: "javascript", expectedOutput: "Cerc, aria: 78.54\nDreptunghi, aria: 24",
        options: [], answer: "Cerc, aria: 78.54\nDreptunghi, aria: 24", explanation: ""
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Simulează `ReturnType<fn>` și `Parameters<fn>`: funcții care extrag tipul de return și parametrii dintr-o funcție. Afișează informațiile.",
        starterCode: "function getReturnType(fn, ...args) {\n  const result = fn(...args);\n  return typeof result;\n}\nfunction getParamTypes(fn, args) {\n  return args.map(a => typeof a);\n}\nfunction add(a, b) { return a + b; }\nfunction greet(name, formal) { return formal ? 'Bună ziua, ' + name : 'Salut, ' + name; }\nconsole.log('add returns:', getReturnType(add, 1, 2));\nconsole.log('add params:', getParamTypes(add, [1, 2]).join(', '));\nconsole.log('greet returns:', getReturnType(greet, 'Ana', true));\nconsole.log('greet params:', getParamTypes(greet, ['Ana', true]).join(', '));",
        language: "javascript", expectedOutput: "add returns: number\nadd params: number, number\ngreet returns: string\ngreet params: string, boolean",
        options: [], answer: "add returns: number\nadd params: number, number\ngreet returns: string\ngreet params: string, boolean", explanation: ""
      }
    ]
  },

  // ─── 45. Mini Proiect JS Final — Real-time Dashboard ─────────────────────
  {
    lessonId: "6a09b0ff9384b94515fcefcf",
    name: "45. Mini Proiect JS Final — Real-time Dashboard cu WebSockets + Canvas",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează: DataStore pentru state management reactiv.\n```js\nclass DataStore {\n  constructor() {\n    this.data = [];\n    this.listeners = [];\n  }\n  push(item) {\n    this.data.___(item);\n    this.listeners.forEach(fn => fn(this.data));\n  }\n  subscribe(fn) { this.listeners.___(fn); }\n}\n```",
        options: [], answer: "push",
        explanation: "DataStore notifică toți abonații la fiecare schimbare de date — pattern Observer aplicat la state.",
        starterCode: "", language: "", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează: Rendering layer reactive.\n```js\nclass Renderer {\n  constructor(store) {\n    store.___(data => this.render(data));\n  }\n  render(data) {\n    console.log('Randare cu', data.length, 'puncte');\n  }\n}\n```",
        options: [], answer: "subscribe",
        explanation: "Renderer se abonează la store și re-renderizează automat la orice schimbare de date.",
        starterCode: "", language: "", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează: Normalizare date pentru grafic.\n```js\nfunction normalizeData(values, maxVal) {\n  return values.map(v => (v / ___) * 100);\n}\n```",
        options: [], answer: "maxVal",
        explanation: "Normalizarea mapează valorile la intervalul [0-100] împărțind la valoarea maximă.",
        starterCode: "", language: "", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează: Rolling window pentru ultimele N valori.\n```js\nfunction rollingWindow(data, ___ = 20) {\n  return data.length > size ? data.slice(-size) : data;\n}\n```",
        options: [], answer: "size",
        explanation: "Rolling window păstrează doar ultimele `size` valori — util pentru grafice în timp real.",
        starterCode: "", language: "", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează: Calculează media mobilă (moving average).\n```js\nfunction movingAvg(data, window) {\n  if (data.length < window) return null;\n  const slice = data.slice(___, data.length);\n  return slice.reduce((a, b) => a + b, 0) / window;\n}\n```",
        options: [], answer: "-window",
        explanation: "`slice(-window)` ia ultimele `window` elemente; media lor e media mobilă — indicator de tendință.",
        starterCode: "", language: "", expectedOutput: ""
      },
      // CODING 11-15
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Implementează DataStore cu subscribe/push și Renderer care loghează datele. Testează push-ul a 3 valori.",
        starterCode: "class DataStore {\n  constructor() { this.data = []; this.listeners = []; }\n  push(item) { this.data.push(item); this.listeners.forEach(fn => fn([...this.data])); }\n  subscribe(fn) { this.listeners.push(fn); }\n}\nclass Logger {\n  constructor(store) {\n    store.subscribe(data => console.log('Date:', data.join(', ')));\n  }\n}\nconst store = new DataStore();\nnew Logger(store);\nstore.push(10);\nstore.push(25);\nstore.push(15);",
        language: "javascript", expectedOutput: "Date: 10\nDate: 10, 25\nDate: 10, 25, 15",
        options: [], answer: "Date: 10\nDate: 10, 25\nDate: 10, 25, 15", explanation: ""
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Implementează normalizare și statistici pentru un set de date de sensor: min, max, medie, și valorile normalizate la [0-100].",
        starterCode: "function analyzeData(values) {\n  const min = Math.min(...values);\n  const max = Math.max(...values);\n  const avg = (values.reduce((a,b) => a+b,0) / values.length).toFixed(1);\n  const normalized = values.map(v => Math.round(((v-min)/(max-min))*100));\n  return { min, max, avg: parseFloat(avg), normalized };\n}\nconst sensor = [23, 45, 12, 67, 34, 56, 89, 21];\nconst stats = analyzeData(sensor);\nconsole.log('Min:', stats.min);\nconsole.log('Max:', stats.max);\nconsole.log('Avg:', stats.avg);\nconsole.log('Normalized[0]:', stats.normalized[0]);",
        language: "javascript", expectedOutput: "Min: 12\nMax: 89\nAvg: 43.4\nNormalized[0]: 14",
        options: [], answer: "Min: 12\nMax: 89\nAvg: 43.4\nNormalized[0]: 14", explanation: ""
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Implementează rolling window și moving average pentru un stream de date. Procesează 10 valori și afișează media mobilă pe 3 elemente.",
        starterCode: "function movingAvg(data, w) {\n  if (data.length < w) return null;\n  return data.slice(-w).reduce((a, b) => a + b, 0) / w;\n}\nconst stream = [10, 20, 15, 30, 25, 40, 35, 50, 45, 60];\nconst window = 3;\nfor (let i = 0; i < stream.length; i++) {\n  const slice = stream.slice(0, i + 1);\n  const avg = movingAvg(slice, window);\n  if (avg !== null) console.log(`MA[${i+1}]: ${avg.toFixed(1)}`);\n}",
        language: "javascript", expectedOutput: "MA[3]: 15.0\nMA[4]: 21.7\nMA[5]: 23.3\nMA[6]: 31.7\nMA[7]: 33.3\nMA[8]: 41.7\nMA[9]: 43.3\nMA[10]: 51.7",
        options: [], answer: "MA[3]: 15.0\nMA[4]: 21.7\nMA[5]: 23.3\nMA[6]: 31.7\nMA[7]: 33.3\nMA[8]: 41.7\nMA[9]: 43.3\nMA[10]: 51.7", explanation: ""
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Implementează alerting system pentru dashboard: funcția `createAlertSystem(thresholds)` emite alerte când valorile depășesc pragurile. Testează cu date de exemplu.",
        starterCode: "function createAlertSystem(thresholds) {\n  return function checkAlerts(metric, value) {\n    const threshold = thresholds[metric];\n    if (!threshold) return;\n    if (value >= threshold.critical) {\n      console.log(`CRITIC: ${metric} = ${value} (prag: ${threshold.critical})`);\n    } else if (value >= threshold.warning) {\n      console.log(`AVERTIZARE: ${metric} = ${value} (prag: ${threshold.warning})`);\n    }\n  };\n}\nconst alerts = createAlertSystem({\n  cpu: { warning: 70, critical: 90 },\n  memory: { warning: 80, critical: 95 }\n});\nalerts('cpu', 75);\nalerts('cpu', 92);\nalerts('memory', 60);\nalerts('memory', 97);",
        language: "javascript", expectedOutput: "AVERTIZARE: cpu = 75 (prag: 70)\nCRITIC: cpu = 92 (prag: 90)\nCRITIC: memory = 97 (prag: 95)",
        options: [], answer: "AVERTIZARE: cpu = 75 (prag: 70)\nCRITIC: cpu = 92 (prag: 90)\nCRITIC: memory = 97 (prag: 95)", explanation: ""
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Implementează întregul pipeline al dashboard-ului: receive → validate → normalize → store → alert. Simulează 5 mesaje de date.",
        starterCode: "function createDashboard(config) {\n  const store = [];\n  const alerts = [];\n  return {\n    receive(raw) {\n      try {\n        const data = typeof raw === 'string' ? JSON.parse(raw) : raw;\n        if (typeof data.value !== 'number') throw new Error('Valoare invalidă');\n        const normalized = Math.round((data.value / config.max) * 100);\n        store.push({ ...data, normalized });\n        if (data.value > config.alertThreshold) {\n          alerts.push(data.metric + ':' + data.value);\n          console.log('Alert: ' + data.metric + ' = ' + data.value);\n        } else {\n          console.log('OK: ' + data.metric + ' = ' + normalized + '%');\n        }\n      } catch(e) { console.log('Eroare:', e.message); }\n    },\n    stats() {\n      console.log('Total:', store.length, '| Alerte:', alerts.length);\n    }\n  };\n}\nconst dash = createDashboard({ max: 100, alertThreshold: 80 });\ndash.receive({ metric: 'cpu', value: 45 });\ndash.receive({ metric: 'cpu', value: 92 });\ndash.receive({ metric: 'memory', value: 70 });\ndash.receive({ metric: 'memory', value: 85 });\ndash.receive({ metric: 'disk', value: 30 });\ndash.stats();",
        language: "javascript", expectedOutput: "OK: cpu = 45%\nAlert: cpu = 92\nOK: memory = 70%\nAlert: memory = 85\nOK: disk = 30%\nTotal: 5 | Alerte: 2",
        options: [], answer: "OK: cpu = 45%\nAlert: cpu = 92\nOK: memory = 70%\nAlert: memory = 85\nOK: disk = 30%\nTotal: 5 | Alerte: 2", explanation: ""
      }
    ]
  }
];

async function main() {
  console.log("Fixing JavaScript lessons...");
  for (const fix of FIXES) {
    const del = await prisma.task.deleteMany({
      where: { lessonId: fix.lessonId, number: { gte: 6 } }
    });
    await prisma.task.createMany({
      data: fix.tasks.map(t => ({ ...t, lessonId: fix.lessonId }))
    });
    console.log(`✓ ${fix.name} — deleted ${del.count}, created ${fix.tasks.length}`);
  }
  console.log("Done.");
  await prisma.$disconnect();
}

main().catch(e => { console.error(e); process.exit(1); });
