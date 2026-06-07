"use strict";
require("dotenv").config({ path: ".env" });
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// ─────────────────────────────────────────────────────────────────────────────
// FIXES: tasks #6-15 (fillblank #6-10, coding #11-15) for 16 Python lessons
// Each lesson: 5 fillblank + 5 coding, all in Romanian, topic-accurate
// ─────────────────────────────────────────────────────────────────────────────

const FIXES = [
  // ── 1. "6. Probleme cu condiții" ──────────────────────────────────────────
  {
    lessonId: "69f9771cb9361c10de0ab964",
    name: "6. Probleme cu condiții",
    tasks: [
      // fillblank #6-10
      {
        number: 6,
        type: "fillblank",
        difficulty: "easy",
        question:
          "Completează condiția pentru a afișa 'major' dacă vârsta e >= 18:\n```python\nvarsta = 20\nif varsta ___ 18:\n    print('major')\n```",
        answer: ">= 18",
        explanation: ">= verifică dacă valoarea este mai mare sau egală cu 18.",
      },
      {
        number: 7,
        type: "fillblank",
        difficulty: "easy",
        question:
          "Completează cu keyword-ul corect pentru ramura alternativă:\n```python\nnota = 5\nif nota >= 5:\n    print('promovat')\n___:\n    print('corigent')\n```",
        answer: "else",
        explanation: "else acoperă cazul când condiția if este falsă.",
      },
      {
        number: 8,
        type: "fillblank",
        difficulty: "medium",
        question:
          "Ce afișează codul următor?\n```python\nx = 15\nif x > 20:\n    print('mare')\nelif x > 10:\n    print('mediu')\nelse:\n    print('mic')\n```\nRăspuns: `___`",
        answer: "mediu",
        explanation: "15 > 20 e fals, dar 15 > 10 e adevărat → se afișează 'mediu'.",
      },
      {
        number: 9,
        type: "fillblank",
        difficulty: "medium",
        question:
          "Completează operatorul logic pentru a verifica ambele condiții simultan:\n```python\ntemp = 25\nif temp > 20 ___ temp < 30:\n    print('confortabil')\n```",
        answer: "and",
        explanation: "and returnează True doar când ambele condiții sunt adevărate.",
      },
      {
        number: 10,
        type: "fillblank",
        difficulty: "hard",
        question:
          "Ce afișează programul?\n```python\na = 7\nb = 3\nif a % b == 0:\n    print('divizibil')\nelse:\n    print('rest:', a % b)\n```\nRăspuns: `___`",
        answer: "rest: 1",
        explanation: "7 % 3 = 1, deci condiția e falsă → se afișează 'rest: 1'.",
      },
      // coding #11-15
      {
        number: 11,
        type: "coding",
        difficulty: "easy",
        language: "python",
        question:
          "Declară nota=75. Afișează 'A' dacă >= 90, 'B' dacă >= 80, 'C' dacă >= 70, altfel 'F'.\n```\nC\n```",
        starterCode: "",
        answer: "",
        expectedOutput: "C",
        explanation: "75 >= 70 dar < 80 → C.",
      },
      {
        number: 12,
        type: "coding",
        difficulty: "easy",
        language: "python",
        question:
          "Declară x=42. Afișează 'par' dacă e par, 'impar' altfel.\n```\npar\n```",
        starterCode: "",
        answer: "",
        expectedOutput: "par",
        explanation: "42 % 2 == 0 → par.",
      },
      {
        number: 13,
        type: "coding",
        difficulty: "medium",
        language: "python",
        question:
          "Declară a=5, b=8, c=3. Afișează maximul dintre cele trei folosind if/elif/else.\n```\n8\n```",
        starterCode: "",
        answer: "",
        expectedOutput: "8",
        explanation: "b=8 este cel mai mare dintre 5, 8 și 3.",
      },
      {
        number: 14,
        type: "coding",
        difficulty: "medium",
        language: "python",
        question:
          "Declară an=2000. Afișează 'bisect' dacă e an bisect (div cu 400, SAU div cu 4 și nu cu 100), altfel 'nu e bisect'.\n```\nbisect\n```",
        starterCode: "",
        answer: "",
        expectedOutput: "bisect",
        explanation: "2000 % 400 == 0 → bisect.",
      },
      {
        number: 15,
        type: "coding",
        difficulty: "hard",
        language: "python",
        question:
          "Declară n=17. Dacă n e multiplu de 3 afișează 'Fizz', dacă e multiplu de 5 afișează 'Buzz', dacă e multiplu de ambele afișează 'FizzBuzz', altfel afișează numărul.\n```\n17\n```",
        starterCode: "",
        answer: "",
        expectedOutput: "17",
        explanation: "17 nu e multiplu nici de 3, nici de 5 → se afișează 17.",
      },
    ],
  },

  // ── 2. "7b. While loop — Exersare avansată" ───────────────────────────────
  {
    lessonId: "69f97721b9361c10de0ab980",
    name: "7b. While loop — Exersare avansată",
    tasks: [
      {
        number: 6,
        type: "fillblank",
        difficulty: "easy",
        question:
          "Completează pentru a obține suma cifrelor lui 123:\n```python\nn = 123\nsuma = 0\nwhile n > 0:\n    suma += n ___ 10\n    n //= 10\nprint(suma)\n```",
        answer: "% 10",
        explanation: "% 10 extrage ultima cifră a lui n la fiecare iterație.",
      },
      {
        number: 7,
        type: "fillblank",
        difficulty: "easy",
        question:
          "Completează pentru a elimina ultima cifră din n la fiecare pas:\n```python\nn = 456\nwhile n > 0:\n    print(n % 10)\n    n ___\n```",
        answer: "//= 10",
        explanation: "//= 10 împarte n la 10 și păstrează câtul întreg, eliminând ultima cifră.",
      },
      {
        number: 8,
        type: "fillblank",
        difficulty: "medium",
        question:
          "Ce afișează primul print din program?\n```python\nn = 256\ncontor = 0\nwhile n > 1:\n    n //= 2\n    contor += 1\nprint(contor)\n```\nRăspuns: `___`",
        answer: "8",
        explanation: "256 = 2^8, deci se împarte de 8 ori până ajunge la 1.",
      },
      {
        number: 9,
        type: "fillblank",
        difficulty: "medium",
        question:
          "Completează condiția de oprire a acumulatorului:\n```python\nprodus = 1\ni = 1\nwhile i ___ 5:\n    produs *= i\n    i += 1\nprint(produs)\n```",
        answer: "<= 5",
        explanation: "<= 5 asigură că i parcurge valorile 1, 2, 3, 4, 5 (5! = 120).",
      },
      {
        number: 10,
        type: "fillblank",
        difficulty: "hard",
        question:
          "Ce afișează programul?\n```python\nn = 321\ncifre = []\nwhile n > 0:\n    cifre.append(n % 10)\n    n //= 10\nprint(sum(cifre))\n```\nRăspuns: `___`",
        answer: "6",
        explanation: "Cifrele lui 321 sunt 1, 2, 3. Suma lor este 6.",
      },
      // coding #11-15
      {
        number: 11,
        type: "coding",
        difficulty: "easy",
        language: "python",
        question:
          "Calculează suma cifrelor numărului 4827 folosind while cu % 10 și // 10. Afișează suma.\n```\n21\n```",
        starterCode: "",
        answer: "",
        expectedOutput: "21",
        explanation: "4+8+2+7 = 21.",
      },
      {
        number: 12,
        type: "coding",
        difficulty: "easy",
        language: "python",
        question:
          "Afișează toate cifrele numărului 305 de la ultima la prima (câte una pe linie) folosind while.\n```\n5\n0\n3\n```",
        starterCode: "",
        answer: "",
        expectedOutput: "5\n0\n3",
        explanation: "305 % 10 = 5, 30 % 10 = 0, 3 % 10 = 3.",
      },
      {
        number: 13,
        type: "coding",
        difficulty: "medium",
        language: "python",
        question:
          "Calculează produsul cifrelor numărului 234 (2×3×4). Afișează rezultatul.\n```\n24\n```",
        starterCode: "",
        answer: "",
        expectedOutput: "24",
        explanation: "2 × 3 × 4 = 24.",
      },
      {
        number: 14,
        type: "coding",
        difficulty: "medium",
        language: "python",
        question:
          "Numără de câte cifre are numărul 98765. Afișează rezultatul.\n```\n5\n```",
        starterCode: "",
        answer: "",
        expectedOutput: "5",
        explanation: "98765 are 5 cifre. Se obține împărțind repetat la 10.",
      },
      {
        number: 15,
        type: "coding",
        difficulty: "hard",
        language: "python",
        question:
          "Verifică dacă numărul 1331 este palindrom (același citit de la stânga și dreapta). Afișează 'palindrom' sau 'nu e palindrom'.\n```\npalindrom\n```",
        starterCode: "",
        answer: "",
        expectedOutput: "palindrom",
        explanation: "1331 inversat este tot 1331 → palindrom.",
      },
    ],
  },

  // ── 3. "7c. While True + break/continue" ─────────────────────────────────
  {
    lessonId: "69f97723b9361c10de0ab98d",
    name: "7c. While True + break/continue",
    tasks: [
      {
        number: 6,
        type: "fillblank",
        difficulty: "easy",
        question:
          "Completează cu instrucțiunea care oprește bucla:\n```python\ni = 0\nwhile True:\n    if i == 3:\n        ___\n    i += 1\nprint(i)\n```",
        answer: "break",
        explanation: "break iese imediat din buclă când condiția devine adevărată.",
      },
      {
        number: 7,
        type: "fillblank",
        difficulty: "easy",
        question:
          "Completează cu instrucțiunea care sare peste iterația curentă:\n```python\nfor i in range(5):\n    if i == 2:\n        ___\n    print(i)\n```",
        answer: "continue",
        explanation: "continue sare la următoarea iterație fără a executa restul corpului buclei.",
      },
      {
        number: 8,
        type: "fillblank",
        difficulty: "medium",
        question:
          "Ce afișează programul?\n```python\ni = 0\nwhile True:\n    i += 1\n    if i % 2 == 0:\n        continue\n    if i > 7:\n        break\n    print(i)\n```\nPrimul număr afișat: `___`",
        answer: "1",
        explanation: "continue sare numerele pare; primul impare neomis este 1.",
      },
      {
        number: 9,
        type: "fillblank",
        difficulty: "medium",
        question:
          "Completează condiția de break pentru a opri când suma depășește 10:\n```python\nsuma = 0\ni = 1\nwhile True:\n    suma += i\n    if ___:\n        break\n    i += 1\nprint(i)\n```",
        answer: "suma > 10",
        explanation: "Bucla se oprește când suma acumulată depășește 10.",
      },
      {
        number: 10,
        type: "fillblank",
        difficulty: "hard",
        question:
          "Ce afișează programul?\n```python\ncontor = 0\nfor i in range(10):\n    if i % 3 == 0:\n        continue\n    contor += 1\nprint(contor)\n```\nRăspuns: `___`",
        answer: "6",
        explanation: "range(10) = 0..9; multiplii de 3 sunt 0, 3, 6, 9 (4 valori) → se sare 4 iterații → 10 - 4 = 6.",
      },
      // coding #11-15
      {
        number: 11,
        type: "coding",
        difficulty: "easy",
        language: "python",
        question:
          "Afișează numerele de la 1 la 10, dar sărind peste 5 (folosind continue).\n```\n1\n2\n3\n4\n6\n7\n8\n9\n10\n```",
        starterCode: "",
        answer: "",
        expectedOutput: "1\n2\n3\n4\n6\n7\n8\n9\n10",
        explanation: "continue sare iterația când i == 5.",
      },
      {
        number: 12,
        type: "coding",
        difficulty: "easy",
        language: "python",
        question:
          "Folosind while True și break, afișează numerele de la 1 la 5, apoi oprește.\n```\n1\n2\n3\n4\n5\n```",
        starterCode: "",
        answer: "",
        expectedOutput: "1\n2\n3\n4\n5",
        explanation: "while True cu break la i > 5.",
      },
      {
        number: 13,
        type: "coding",
        difficulty: "medium",
        language: "python",
        question:
          "Afișează numerele impare de la 1 la 15 folosind for + continue.\n```\n1\n3\n5\n7\n9\n11\n13\n15\n```",
        starterCode: "",
        answer: "",
        expectedOutput: "1\n3\n5\n7\n9\n11\n13\n15",
        explanation: "continue sare numerele pare (i % 2 == 0).",
      },
      {
        number: 14,
        type: "coding",
        difficulty: "medium",
        language: "python",
        question:
          "Calculează suma numerelor de la 1 la 100, dar sări peste multiplii de 7 (continue). Afișează suma.\n```\n4315\n```",
        starterCode: "",
        answer: "",
        expectedOutput: "4315",
        explanation: "Suma 1..100 = 5050; multiplii de 7 (7+14+...+98) = 735 → 5050-735 = 4315.",
      },
      {
        number: 15,
        type: "coding",
        difficulty: "hard",
        language: "python",
        question:
          "Găsește primul număr din intervalul [2, 100] care este divizibil cu 7 și cu 11. Afișează-l.\n```\n77\n```",
        starterCode: "",
        answer: "",
        expectedOutput: "77",
        explanation: "77 = 7 × 11. Este primul număr din [2,100] divizibil cu ambele.",
      },
    ],
  },

  // ── 4. "9. Liste (introducere)" ───────────────────────────────────────────
  {
    lessonId: "69f97727b9361c10de0ab9a8",
    name: "9. Liste (introducere)",
    tasks: [
      {
        number: 6,
        type: "fillblank",
        difficulty: "easy",
        question:
          "Completează pentru a adăuga elementul 5 la finalul listei:\n```python\nlista = [1, 2, 3]\nlista.___(5)\nprint(lista)\n```",
        answer: "append",
        explanation: "append() adaugă un element la finalul listei.",
      },
      {
        number: 7,
        type: "fillblank",
        difficulty: "easy",
        question:
          "Completează pentru a accesa al doilea element (indexare de la 0):\n```python\nfructe = ['mar', 'para', 'pruna']\nprint(fructe[___])\n```",
        answer: "1",
        explanation: "Indexarea începe de la 0: fructe[1] = 'para'.",
      },
      {
        number: 8,
        type: "fillblank",
        difficulty: "medium",
        question:
          "Ce afișează programul?\n```python\nnumere = [10, 20, 30, 40]\nnumere.remove(20)\nprint(len(numere))\n```\nRăspuns: `___`",
        answer: "3",
        explanation: "remove(20) elimină valoarea 20; lista rămâne cu 3 elemente.",
      },
      {
        number: 9,
        type: "fillblank",
        difficulty: "medium",
        question:
          "Completează pentru a sorta lista în ordine crescătoare:\n```python\nnumere = [5, 2, 8, 1]\nnumere.___\nprint(numere)\n```",
        answer: "sort()",
        explanation: "sort() sortează lista pe loc în ordine crescătoare.",
      },
      {
        number: 10,
        type: "fillblank",
        difficulty: "hard",
        question:
          "Ce afișează programul?\n```python\na = [1, 2, 3]\nb = a\nb.append(4)\nprint(len(a))\n```\nRăspuns: `___`",
        answer: "4",
        explanation: "b = a nu copiază lista, ci creează o referință. append(4) modifică și a → len(a) = 4.",
      },
      // coding #11-15
      {
        number: 11,
        type: "coding",
        difficulty: "easy",
        language: "python",
        question:
          "Creează lista [3, 1, 4, 1, 5, 9, 2]. Afișează lungimea, minimul și maximul pe linii separate.\n```\n7\n1\n9\n```",
        starterCode: "",
        answer: "",
        expectedOutput: "7\n1\n9",
        explanation: "len=7, min=1, max=9.",
      },
      {
        number: 12,
        type: "coding",
        difficulty: "easy",
        language: "python",
        question:
          "Pornind de la lista [10, 20, 30], adaugă 40 cu append, elimină 20 cu remove, apoi afișează lista.\n```\n[10, 30, 40]\n```",
        starterCode: "",
        answer: "",
        expectedOutput: "[10, 30, 40]",
        explanation: "append(40) adaugă la final, remove(20) elimină prima apariție a lui 20.",
      },
      {
        number: 13,
        type: "coding",
        difficulty: "medium",
        language: "python",
        question:
          "Calculează suma elementelor din lista [2, 4, 6, 8, 10] iterând cu for. Afișează suma.\n```\n30\n```",
        starterCode: "",
        answer: "",
        expectedOutput: "30",
        explanation: "2+4+6+8+10 = 30.",
      },
      {
        number: 14,
        type: "coding",
        difficulty: "medium",
        language: "python",
        question:
          "Inversează lista [1, 2, 3, 4, 5] fără a folosi reverse() — folosind slicing [::-1]. Afișează lista inversată.\n```\n[5, 4, 3, 2, 1]\n```",
        starterCode: "",
        answer: "",
        expectedOutput: "[5, 4, 3, 2, 1]",
        explanation: "lista[::-1] returnează o copie inversată.",
      },
      {
        number: 15,
        type: "coding",
        difficulty: "hard",
        language: "python",
        question:
          "Dintr-o listă [3, 7, 2, 9, 1, 5, 8], extrage doar elementele mai mari de 4 într-o listă nouă și afișeaz-o.\n```\n[7, 9, 5, 8]\n```",
        starterCode: "",
        answer: "",
        expectedOutput: "[7, 9, 5, 8]",
        explanation: "Se filtrează elementele > 4 păstrând ordinea originală.",
      },
    ],
  },

  // ── 5. "12. Dicționare" ───────────────────────────────────────────────────
  {
    lessonId: "69f9772fb9361c10de0ab9d7",
    name: "12. Dicționare",
    tasks: [
      {
        number: 6,
        type: "fillblank",
        difficulty: "easy",
        question:
          "Completează pentru a accesa valoarea cheii 'nume':\n```python\npersoana = {'nume': 'Ana', 'varsta': 25}\nprint(persoana[___])\n```",
        answer: "'nume'",
        explanation: "Se accesează valoarea unui dict cu paranteze drepte și cheia ca string.",
      },
      {
        number: 7,
        type: "fillblank",
        difficulty: "easy",
        question:
          "Completează pentru a adăuga cheia 'email' în dicționar:\n```python\nuser = {'nume': 'Ion'}\nuser[___] = 'ion@ex.com'\n```",
        answer: "'email'",
        explanation: "Se adaugă o cheie nouă prin asignare directă: dict['cheie_noua'] = valoare.",
      },
      {
        number: 8,
        type: "fillblank",
        difficulty: "medium",
        question:
          "Ce afișează programul?\n```python\nd = {'a': 1, 'b': 2, 'c': 3}\nprint(len(d))\n```\nRăspuns: `___`",
        answer: "3",
        explanation: "len() pe un dict returnează numărul de perechi cheie-valoare.",
      },
      {
        number: 9,
        type: "fillblank",
        difficulty: "medium",
        question:
          "Completează metoda care returnează o valoare implicită dacă cheia lipsește:\n```python\nd = {'x': 10}\nval = d.___(y, 0)\nprint(val)\n```",
        answer: "get",
        explanation: "dict.get(cheie, implicit) returnează valoarea cheii sau implicit dacă cheia nu există.",
      },
      {
        number: 10,
        type: "fillblank",
        difficulty: "hard",
        question:
          "Ce afișează programul?\n```python\nd = {'a': 10, 'b': 20, 'c': 30}\nprint(sum(d.values()))\n```\nRăspuns: `___`",
        answer: "60",
        explanation: "d.values() = [10, 20, 30]; sum() = 60.",
      },
      // coding #11-15
      {
        number: 11,
        type: "coding",
        difficulty: "easy",
        language: "python",
        question:
          "Creează un dicționar cu cheile 'prenume', 'varsta', 'oras' și valorile 'Maria', 28, 'Cluj'. Afișează valoarea cheii 'oras'.\n```\nCluj\n```",
        starterCode: "",
        answer: "",
        expectedOutput: "Cluj",
        explanation: "d['oras'] returnează 'Cluj'.",
      },
      {
        number: 12,
        type: "coding",
        difficulty: "easy",
        language: "python",
        question:
          "Numără de câte ori apare fiecare literă din 'banana' folosind un dicționar. Afișează rezultatul ca dict.\n```\n{'b': 1, 'a': 3, 'n': 2}\n```",
        starterCode: "",
        answer: "",
        expectedOutput: "{'b': 1, 'a': 3, 'n': 2}",
        explanation: "Iterezi pe 'banana' și incrementezi contorul pentru fiecare literă.",
      },
      {
        number: 13,
        type: "coding",
        difficulty: "medium",
        language: "python",
        question:
          "Dintr-un dicționar note={'Ana': 9, 'Ion': 7, 'Maria': 10}, afișează numele elevului cu nota maximă.\n```\nMaria\n```",
        starterCode: "",
        answer: "",
        expectedOutput: "Maria",
        explanation: "max(note, key=note.get) returnează cheia cu valoarea maximă.",
      },
      {
        number: 14,
        type: "coding",
        difficulty: "medium",
        language: "python",
        question:
          "Inversează un dicționar: {'a': 1, 'b': 2, 'c': 3} → {1: 'a', 2: 'b', 3: 'c'}. Afișează dicționarul inversat.\n```\n{1: 'a', 2: 'b', 3: 'c'}\n```",
        starterCode: "",
        answer: "",
        expectedOutput: "{1: 'a', 2: 'b', 3: 'c'}",
        explanation: "{v: k for k, v in d.items()} inversează cheile cu valorile.",
      },
      {
        number: 15,
        type: "coding",
        difficulty: "hard",
        language: "python",
        question:
          "Contorizează frecvența cuvintelor din lista ['mere', 'pere', 'mere', 'prune', 'pere', 'mere']. Afișează dicționarul.\n```\n{'mere': 3, 'pere': 2, 'prune': 1}\n```",
        starterCode: "",
        answer: "",
        expectedOutput: "{'mere': 3, 'pere': 2, 'prune': 1}",
        explanation: "Folosești un dict și incrementezi contorul pentru fiecare cuvânt.",
      },
    ],
  },

  // ── 6. "13. Tupluri (Python)" ─────────────────────────────────────────────
  {
    lessonId: "69f97732b9361c10de0ab9e4",
    name: "13. Tupluri (Python)",
    tasks: [
      {
        number: 6,
        type: "fillblank",
        difficulty: "easy",
        question:
          "Completează pentru a crea un tuplu cu valorile 1, 2, 3:\n```python\nt = ___(1, 2, 3)\nprint(t)\n```",
        answer: "(1, 2, 3)",
        explanation: "Tuplurile se creează cu paranteze rotunde sau fără paranteze: t = 1, 2, 3.",
      },
      {
        number: 7,
        type: "fillblank",
        difficulty: "easy",
        question:
          "Completează pentru a despacheta tuplul în variabile:\n```python\ncoord = (10, 20)\n___ = coord\nprint(x, y)\n```",
        answer: "x, y",
        explanation: "Destructurarea (unpacking) asignează fiecare element la o variabilă separată.",
      },
      {
        number: 8,
        type: "fillblank",
        difficulty: "medium",
        question:
          "Ce afișează programul?\n```python\nt = (5, 3, 8, 1, 9)\nprint(t[2])\n```\nRăspuns: `___`",
        answer: "8",
        explanation: "Indexarea începe de la 0: t[2] = al treilea element = 8.",
      },
      {
        number: 9,
        type: "fillblank",
        difficulty: "medium",
        question:
          "Completează pentru a converti tuplul în listă modificabilă:\n```python\nt = (1, 2, 3)\nl = ___(t)\nl.append(4)\nprint(l)\n```",
        answer: "list",
        explanation: "list() convertește orice iterabil (inclusiv tuple) într-o listă.",
      },
      {
        number: 10,
        type: "fillblank",
        difficulty: "hard",
        question:
          "Ce afișează programul?\n```python\nt = (1, 2, 3, 2, 1)\nprint(t.count(2))\n```\nRăspuns: `___`",
        answer: "2",
        explanation: "count(2) numără de câte ori apare 2 în tuplu → 2 apariții.",
      },
      // coding #11-15
      {
        number: 11,
        type: "coding",
        difficulty: "easy",
        language: "python",
        question:
          "Creează tuplul (10, 20, 30, 40, 50). Afișează lungimea, minimul și maximul pe linii separate.\n```\n5\n10\n50\n```",
        starterCode: "",
        answer: "",
        expectedOutput: "5\n10\n50",
        explanation: "len, min, max funcționează pe tupluri la fel ca pe liste.",
      },
      {
        number: 12,
        type: "coding",
        difficulty: "easy",
        language: "python",
        question:
          "Despachează tuplul ('Python', 3, 'programare') în variabilele limbaj, versiune, domeniu. Afișează fiecare pe o linie.\n```\nPython\n3\nprogramare\n```",
        starterCode: "",
        answer: "",
        expectedOutput: "Python\n3\nprogramare",
        explanation: "limbaj, versiune, domeniu = tuplu — unpacking.",
      },
      {
        number: 13,
        type: "coding",
        difficulty: "medium",
        language: "python",
        question:
          "Pornind de la tuplul (3, 1, 4, 1, 5, 9, 2), convertește la listă, sortează, reconvertește la tuplu și afișează.\n```\n(1, 1, 2, 3, 4, 5, 9)\n```",
        starterCode: "",
        answer: "",
        expectedOutput: "(1, 1, 2, 3, 4, 5, 9)",
        explanation: "tuple(sorted(t)) sau list → sort → tuple.",
      },
      {
        number: 14,
        type: "coding",
        difficulty: "medium",
        language: "python",
        question:
          "Calculează suma elementelor din tuplul (2, 4, 6, 8, 10) iterând cu for. Afișează suma.\n```\n30\n```",
        starterCode: "",
        answer: "",
        expectedOutput: "30",
        explanation: "sum((2,4,6,8,10)) = 30.",
      },
      {
        number: 15,
        type: "coding",
        difficulty: "hard",
        language: "python",
        question:
          "Dintr-un tuplu de tupluri ((1,'a'), (2,'b'), (3,'c')), creează un dict unde cheia e numărul și valoarea e litera. Afișează dict-ul.\n```\n{1: 'a', 2: 'b', 3: 'c'}\n```",
        starterCode: "",
        answer: "",
        expectedOutput: "{1: 'a', 2: 'b', 3: 'c'}",
        explanation: "dict(((1,'a'),(2,'b'),(3,'c'))) sau dict comprehension.",
      },
    ],
  },

  // ── 7. "14. Funcții (basic)" ──────────────────────────────────────────────
  {
    lessonId: "69f97734b9361c10de0ab9f1",
    name: "14. Funcții (basic)",
    tasks: [
      {
        number: 6,
        type: "fillblank",
        difficulty: "easy",
        question:
          "Completează keyword-ul pentru a defini o funcție:\n```python\n___ salut(nume):\n    print('Bună, ' + nume)\n```",
        answer: "def",
        explanation: "def este keyword-ul Python pentru definirea funcțiilor.",
      },
      {
        number: 7,
        type: "fillblank",
        difficulty: "easy",
        question:
          "Completează pentru ca funcția să returneze suma:\n```python\ndef aduna(a, b):\n    ___ a + b\n```",
        answer: "return",
        explanation: "return trimite valoarea calculată înapoi la apelant.",
      },
      {
        number: 8,
        type: "fillblank",
        difficulty: "medium",
        question:
          "Ce afișează programul?\n```python\ndef patrat(n):\n    return n * n\n\nprint(patrat(7))\n```\nRăspuns: `___`",
        answer: "49",
        explanation: "7 * 7 = 49.",
      },
      {
        number: 9,
        type: "fillblank",
        difficulty: "medium",
        question:
          "Completează apelul funcției cu argumentele corecte:\n```python\ndef salut(prenume, familie):\n    return f'Bună, {prenume} {familie}!'\n\nprint(salut(___, ___))\n```",
        answer: "'Ana', 'Pop'",
        explanation: "Argumentele se trec în ordinea parametrilor funcției.",
      },
      {
        number: 10,
        type: "fillblank",
        difficulty: "hard",
        question:
          "Ce afișează programul?\n```python\ndef modifica(lista):\n    lista.append(99)\n\nl = [1, 2, 3]\nmodifica(l)\nprint(len(l))\n```\nRăspuns: `___`",
        answer: "4",
        explanation: "Listele sunt mutabile și se transmit prin referință — append(99) modifică lista originală.",
      },
      // coding #11-15
      {
        number: 11,
        type: "coding",
        difficulty: "easy",
        language: "python",
        question:
          "Definește o funcție cub(n) care returnează cubul unui număr. Apeleaz-o cu 4 și afișează rezultatul.\n```\n64\n```",
        starterCode: "",
        answer: "",
        expectedOutput: "64",
        explanation: "4³ = 64.",
      },
      {
        number: 12,
        type: "coding",
        difficulty: "easy",
        language: "python",
        question:
          "Definește o funcție salut(nume) care returnează 'Salut, {nume}!'. Apeleaz-o cu 'Mihai' și afișează.\n```\nSalut, Mihai!\n```",
        starterCode: "",
        answer: "",
        expectedOutput: "Salut, Mihai!",
        explanation: "f-string sau concatenare string.",
      },
      {
        number: 13,
        type: "coding",
        difficulty: "medium",
        language: "python",
        question:
          "Definește o funcție este_par(n) care returnează True dacă n e par, False altfel. Testează cu 6 și 9, afișând rezultatele pe linii separate.\n```\nTrue\nFalse\n```",
        starterCode: "",
        answer: "",
        expectedOutput: "True\nFalse",
        explanation: "n % 2 == 0 → True pentru numere pare.",
      },
      {
        number: 14,
        type: "coding",
        difficulty: "medium",
        language: "python",
        question:
          "Definește o funcție maxim(a, b, c) care returnează maximul dintre trei numere. Apeleaz-o cu 15, 7, 22 și afișează.\n```\n22\n```",
        starterCode: "",
        answer: "",
        expectedOutput: "22",
        explanation: "Compari cu if/elif/else sau folosești max().",
      },
      {
        number: 15,
        type: "coding",
        difficulty: "hard",
        language: "python",
        question:
          "Definește o funcție factorial(n) care calculează n! recursiv. Apeleaz-o cu 5 și afișează.\n```\n120\n```",
        starterCode: "",
        answer: "",
        expectedOutput: "120",
        explanation: "5! = 5×4×3×2×1 = 120. Caz de bază: factorial(0) = 1.",
      },
    ],
  },

  // ── 8. "15. Funcții (avansat)" ────────────────────────────────────────────
  {
    lessonId: "69f8bb10d1807de47ef0ddb0",
    name: "15. Funcții (avansat)",
    tasks: [
      {
        number: 6,
        type: "fillblank",
        difficulty: "easy",
        question:
          "Completează pentru a defini o valoare implicită pentru parametru:\n```python\ndef salut(nume, mesaj=___):  \n    print(f'{mesaj}, {nume}!')\nsalut('Ana')\n```",
        answer: "'Bună ziua'",
        explanation: "Parametrii cu valori implicite permit apelul funcției fără a specifica acel argument.",
      },
      {
        number: 7,
        type: "fillblank",
        difficulty: "easy",
        question:
          "Completează cu sintaxa pentru a accepta oricâte argumente poziționale:\n```python\ndef suma_totala(___args):\n    return sum(args)\n\nprint(suma_totala(1, 2, 3, 4))\n```",
        answer: "*",
        explanation: "*args colectează toate argumentele poziționale suplimentare ca tuplu.",
      },
      {
        number: 8,
        type: "fillblank",
        difficulty: "medium",
        question:
          "Ce afișează programul?\n```python\ndef divide(a, b=2):\n    return a / b\n\nprint(divide(10))\n```\nRăspuns: `___`",
        answer: "5.0",
        explanation: "divide(10) folosește b=2 (implicit) → 10/2 = 5.0.",
      },
      {
        number: 9,
        type: "fillblank",
        difficulty: "medium",
        question:
          "Completează pentru ca funcția să returneze două valori:\n```python\ndef min_max(lista):\n    ___ min(lista), max(lista)\n\nmic, mare = min_max([3, 1, 7, 2])\nprint(mic, mare)\n```",
        answer: "return",
        explanation: "return val1, val2 returnează un tuplu; unpacking-ul îl desface în variabile.",
      },
      {
        number: 10,
        type: "fillblank",
        difficulty: "hard",
        question:
          "Ce afișează programul?\n```python\ndef aplica(func, valoare):\n    return func(valoare)\n\nprint(aplica(str.upper, 'salut'))\n```\nRăspuns: `___`",
        answer: "SALUT",
        explanation: "Funcțiile sunt obiecte în Python; str.upper poate fi transmisă ca argument.",
      },
      // coding #11-15
      {
        number: 11,
        type: "coding",
        difficulty: "easy",
        language: "python",
        question:
          "Definește o funcție putere(baza, exp=2) cu exp implicit 2. Afișează putere(3) și putere(3, 3) pe linii separate.\n```\n9\n27\n```",
        starterCode: "",
        answer: "",
        expectedOutput: "9\n27",
        explanation: "3**2 = 9, 3**3 = 27.",
      },
      {
        number: 12,
        type: "coding",
        difficulty: "easy",
        language: "python",
        question:
          "Definește o funcție suma_args(*numere) care returnează suma tuturor argumentelor. Afișează suma_args(1,2,3,4,5).\n```\n15\n```",
        starterCode: "",
        answer: "",
        expectedOutput: "15",
        explanation: "sum(numere) pe tuplul *args.",
      },
      {
        number: 13,
        type: "coding",
        difficulty: "medium",
        language: "python",
        question:
          "Definește o funcție statistici(lista) care returnează (min, max, suma). Apeleaz-o cu [4,7,2,9,1] și afișează cele trei valori separate prin spații.\n```\n1 9 23\n```",
        starterCode: "",
        answer: "",
        expectedOutput: "1 9 23",
        explanation: "min=1, max=9, sum=23. Returnezi (min(l), max(l), sum(l)).",
      },
      {
        number: 14,
        type: "coding",
        difficulty: "medium",
        language: "python",
        question:
          "Definește o funcție lambda care dublează un număr și aplica-o cu map pe lista [1,2,3,4,5]. Afișează lista rezultat.\n```\n[2, 4, 6, 8, 10]\n```",
        starterCode: "",
        answer: "",
        expectedOutput: "[2, 4, 6, 8, 10]",
        explanation: "list(map(lambda x: x*2, [1,2,3,4,5])).",
      },
      {
        number: 15,
        type: "coding",
        difficulty: "hard",
        language: "python",
        question:
          "Definește o funcție decorator care adaugă 'START' înainte și 'STOP' după afișarea oricărei funcții. Aplica-l pe o funcție salut() care afișează 'Hello'. Afișează rezultatul.\n```\nSTART\nHello\nSTOP\n```",
        starterCode: "",
        answer: "",
        expectedOutput: "START\nHello\nSTOP",
        explanation: "Decorator-ul înfășoară funcția originală cu cod înainte și după.",
      },
    ],
  },

  // ── 9. "17. OOP (Introducere)" ────────────────────────────────────────────
  {
    lessonId: "69f8bb14d1807de47ef0ddcb",
    name: "17. OOP (Introducere)",
    tasks: [
      {
        number: 6,
        type: "fillblank",
        difficulty: "easy",
        question:
          "Completează keyword-ul pentru a defini o clasă:\n```python\n___ Animal:\n    def __init__(self, nume):\n        self.nume = nume\n```",
        answer: "class",
        explanation: "class este keyword-ul Python pentru definirea claselor.",
      },
      {
        number: 7,
        type: "fillblank",
        difficulty: "easy",
        question:
          "Completează primul parametru al oricărei metode de instanță:\n```python\nclass Cerc:\n    def __init__(___, raza):\n        self.raza = raza\n```",
        answer: "self",
        explanation: "self este referința la instanța curentă a clasei și trebuie să fie primul parametru al metodelor.",
      },
      {
        number: 8,
        type: "fillblank",
        difficulty: "medium",
        question:
          "Ce afișează programul?\n```python\nclass Patrat:\n    def __init__(self, latura):\n        self.latura = latura\n    def arie(self):\n        return self.latura ** 2\n\np = Patrat(5)\nprint(p.arie())\n```\nRăspuns: `___`",
        answer: "25",
        explanation: "5² = 25.",
      },
      {
        number: 9,
        type: "fillblank",
        difficulty: "medium",
        question:
          "Completează pentru a crea o instanță a clasei Masina cu marca='Dacia':\n```python\nclass Masina:\n    def __init__(self, marca):\n        self.marca = marca\n\nm = ___(___)\nprint(m.marca)\n```",
        answer: "Masina('Dacia')",
        explanation: "Se instanțiază o clasă apelând-o ca funcție cu argumentele __init__ (fără self).",
      },
      {
        number: 10,
        type: "fillblank",
        difficulty: "hard",
        question:
          "Ce afișează programul?\n```python\nclass Contor:\n    total = 0\n    def __init__(self):\n        Contor.total += 1\n\nContor()\nContor()\nContor()\nprint(Contor.total)\n```\nRăspuns: `___`",
        answer: "3",
        explanation: "total este atribut de clasă; fiecare __init__ îl incrementează → 3 instanțe → total=3.",
      },
      // coding #11-15
      {
        number: 11,
        type: "coding",
        difficulty: "easy",
        language: "python",
        question:
          "Definește clasa Dreptunghi cu __init__(self, latime, inaltime) și metoda arie() care returnează latime*inaltime. Instanțiaz-o cu 6, 4 și afișează aria.\n```\n24\n```",
        starterCode: "",
        answer: "",
        expectedOutput: "24",
        explanation: "6 × 4 = 24.",
      },
      {
        number: 12,
        type: "coding",
        difficulty: "easy",
        language: "python",
        question:
          "Definește clasa Persoana cu __init__(self, nume, varsta) și metoda prezentare() care afișează 'Mă numesc {nume} și am {varsta} ani.'. Creează o instanță și apelează metoda.\n```\nMă numesc Elena și am 30 ani.\n```",
        starterCode: "",
        answer: "",
        expectedOutput: "Mă numesc Elena și am 30 ani.",
        explanation: "Metoda accesează atributele prin self.",
      },
      {
        number: 13,
        type: "coding",
        difficulty: "medium",
        language: "python",
        question:
          "Definește clasa BankAccount cu sold inițial 0, metode depune(suma) și retrage(suma). Depune 500, retrage 200, afișează soldul.\n```\n300\n```",
        starterCode: "",
        answer: "",
        expectedOutput: "300",
        explanation: "500 - 200 = 300.",
      },
      {
        number: 14,
        type: "coding",
        difficulty: "medium",
        language: "python",
        question:
          "Definește clasa Cerc cu __init__(self, raza) și metodele arie() și perimetru(). Folosește pi=3.14159. Pentru raza=5, afișează aria și perimetrul pe linii separate cu 2 zecimale.\n```\n78.54\n31.42\n```",
        starterCode: "",
        answer: "",
        expectedOutput: "78.54\n31.42",
        explanation: "Arie = π×r² ≈ 78.54; Perimetru = 2×π×r ≈ 31.42.",
      },
      {
        number: 15,
        type: "coding",
        difficulty: "hard",
        language: "python",
        question:
          "Definește clasa Stiva cu lista internă și metodele push(val), pop() și este_goala(). Push 1, 2, 3, pop de 2 ori, afișează elementul din vârf cu pop().\n```\n1\n```",
        starterCode: "",
        answer: "",
        expectedOutput: "1",
        explanation: "Push: [1,2,3]; pop → 3, pop → 2; pop final → 1.",
      },
    ],
  },

  // ── 10. "18. OOP — Moștenire și Polimorfism" ──────────────────────────────
  {
    lessonId: "6a09ee6252ce1030800c36eb",
    name: "18. OOP — Moștenire și Polimorfism",
    tasks: [
      {
        number: 6,
        type: "fillblank",
        difficulty: "easy",
        question:
          "Completează pentru a moșteni clasa Animal:\n```python\nclass Animal:\n    def sunet(self): return 'sunet'\n\nclass Caine(___):\n    def sunet(self): return 'Ham!'\n```",
        answer: "Animal",
        explanation: "Moștenirea se specifică punând clasa părinte în paranteze la definirea clasei copil.",
      },
      {
        number: 7,
        type: "fillblank",
        difficulty: "easy",
        question:
          "Completează pentru a apela constructorul clasei părinte:\n```python\nclass Vehicul:\n    def __init__(self, viteza):\n        self.viteza = viteza\n\nclass Masina(Vehicul):\n    def __init__(self, viteza, marca):\n        ___(Vehicul, self).__init__(viteza)\n        self.marca = marca\n```",
        answer: "super",
        explanation: "super() returnează un obiect proxy către clasa părinte, permițând apelul metodelor sale.",
      },
      {
        number: 8,
        type: "fillblank",
        difficulty: "medium",
        question:
          "Ce afișează programul?\n```python\nclass A:\n    def metoda(self): return 'A'\n\nclass B(A):\n    def metoda(self): return 'B'\n\nobj = B()\nprint(obj.metoda())\n```\nRăspuns: `___`",
        answer: "B",
        explanation: "Polimorfism: metoda suprascrisă din B are prioritate față de cea din A.",
      },
      {
        number: 9,
        type: "fillblank",
        difficulty: "medium",
        question:
          "Completează funcția care verifică dacă obiectul este instanță a clasei:\n```python\nclass Pisica: pass\n\np = Pisica()\nprint(___(p, Pisica))\n```",
        answer: "isinstance",
        explanation: "isinstance(obj, Clasa) returnează True dacă obj este instanță a Clasa sau a oricărei subclase.",
      },
      {
        number: 10,
        type: "fillblank",
        difficulty: "hard",
        question:
          "Ce afișează programul?\n```python\nclass Forma:\n    def arie(self): return 0\n\nclass Patrat(Forma):\n    def __init__(self, l): self.l = l\n    def arie(self): return self.l ** 2\n\nforme = [Patrat(3), Patrat(5)]\nprint(sum(f.arie() for f in forme))\n```\nRăspuns: `___`",
        answer: "34",
        explanation: "3²=9, 5²=25; 9+25=34.",
      },
      // coding #11-15
      {
        number: 11,
        type: "coding",
        difficulty: "easy",
        language: "python",
        question:
          "Definește Animal cu metoda sunet() → 'sunet generic'. Definește Caine(Animal) care suprascrie sunet() → 'Ham!'. Afișează sunetul unui Caine.\n```\nHam!\n```",
        starterCode: "",
        answer: "",
        expectedOutput: "Ham!",
        explanation: "Polimorfism: metoda suprascrisă din Caine are prioritate.",
      },
      {
        number: 12,
        type: "coding",
        difficulty: "easy",
        language: "python",
        question:
          "Definește Vehicul cu __init__(viteza) și metoda info(). Definește Bicicleta(Vehicul) care apelează super().__init__ și adaugă atributul 'tip'. Creează o instanță Bicicleta(25, 'munte') și afișează viteza și tipul pe linii separate.\n```\n25\nmunte\n```",
        starterCode: "",
        answer: "",
        expectedOutput: "25\nmunte",
        explanation: "super().__init__(viteza) inițializează atributul moștenit.",
      },
      {
        number: 13,
        type: "coding",
        difficulty: "medium",
        language: "python",
        question:
          "Definește Forma cu arie()→0. Definește Dreptunghi(Forma) și Triunghi(Forma) cu ariile corespunzătoare. Creează [Dreptunghi(4,5), Triunghi(6,8)] și afișează suma ariilor.\n```\n44\n```",
        starterCode: "",
        answer: "",
        expectedOutput: "44",
        explanation: "4×5=20 (dreptunghi), 6×8/2=24 (triunghi); 20+24=44.",
      },
      {
        number: 14,
        type: "coding",
        difficulty: "medium",
        language: "python",
        question:
          "Verifică cu isinstance dacă obiectele [42, 'salut', 3.14, True, [1,2]] sunt de tip int. Afișează câte sunt int.\n```\n2\n```",
        starterCode: "",
        answer: "",
        expectedOutput: "2",
        explanation: "42 și True sunt int (bool este subclasă a int) → 2.",
      },
      {
        number: 15,
        type: "coding",
        difficulty: "hard",
        language: "python",
        question:
          "Definește clasa Angajat cu salariu_baza și metoda salariu_total(). Subclasele Manager(bonus=500) și Developer(bonus=300) suprascriu salariu_total(). Creează Manager(3000) și Developer(2500) și afișează salariile totale pe linii separate.\n```\n3500\n2800\n```",
        starterCode: "",
        answer: "",
        expectedOutput: "3500\n2800",
        explanation: "Manager: 3000+500=3500; Developer: 2500+300=2800.",
      },
    ],
  },

  // ── 11. "20. Set-uri și tuple-uri" ────────────────────────────────────────
  {
    lessonId: "6a021a55f0ec7fc9c03a61b1",
    name: "20. Set-uri și tuple-uri",
    tasks: [
      {
        number: 6,
        type: "fillblank",
        difficulty: "easy",
        question:
          "Completează pentru a adăuga elementul 5 la set:\n```python\ns = {1, 2, 3}\ns.___(5)\nprint(s)\n```",
        answer: "add",
        explanation: "add() adaugă un element la set; dacă există deja, setul rămâne neschimbat.",
      },
      {
        number: 7,
        type: "fillblank",
        difficulty: "easy",
        question:
          "Completează pentru a elimina un element fără excepție dacă nu există:\n```python\ns = {1, 2, 3}\ns.___(10)\nprint(len(s))\n```",
        answer: "discard",
        explanation: "discard() elimină elementul dacă există; spre deosebire de remove(), nu aruncă KeyError.",
      },
      {
        number: 8,
        type: "fillblank",
        difficulty: "medium",
        question:
          "Ce afișează programul?\n```python\na = {1, 2, 3, 4}\nb = {3, 4, 5, 6}\nprint(len(a & b))\n```\nRăspuns: `___`",
        answer: "2",
        explanation: "a & b = intersecție = {3, 4} → len = 2.",
      },
      {
        number: 9,
        type: "fillblank",
        difficulty: "medium",
        question:
          "Completează operatorul pentru reuniunea a două seturi:\n```python\na = {1, 2}\nb = {2, 3}\nrezultat = a ___ b\nprint(len(rezultat))\n```",
        answer: "|",
        explanation: "| este operatorul de reuniune (union) pentru seturi; rezultatul are elementele unice din ambele.",
      },
      {
        number: 10,
        type: "fillblank",
        difficulty: "hard",
        question:
          "Ce afișează programul?\n```python\na = {1, 2, 3, 4, 5}\nb = {4, 5, 6, 7}\nprint(len(a - b))\n```\nRăspuns: `___`",
        answer: "3",
        explanation: "a - b = diferența = {1, 2, 3} → len = 3.",
      },
      // coding #11-15
      {
        number: 11,
        type: "coding",
        difficulty: "easy",
        language: "python",
        question:
          "Elimină duplicatele din lista [1,2,2,3,3,3,4] convertind la set, reconvertind la listă sortată și afișând-o.\n```\n[1, 2, 3, 4]\n```",
        starterCode: "",
        answer: "",
        expectedOutput: "[1, 2, 3, 4]",
        explanation: "sorted(set([1,2,2,3,3,3,4])) → [1,2,3,4].",
      },
      {
        number: 12,
        type: "coding",
        difficulty: "easy",
        language: "python",
        question:
          "Calculează reuniunea și intersecția seturilor {2,4,6,8} și {4,6,10}. Afișează reuniunea, apoi intersecția pe linii separate.\n```\n{2, 4, 6, 8, 10}\n{4, 6}\n```",
        starterCode: "",
        answer: "",
        expectedOutput: "{2, 4, 6, 8, 10}\n{4, 6}",
        explanation: "| pentru reuniune, & pentru intersecție.",
      },
      {
        number: 13,
        type: "coding",
        difficulty: "medium",
        language: "python",
        question:
          "Găsește elementele din setul A={1,2,3,4,5} care nu sunt în B={3,4,5,6,7} (diferența). Afișează mulțimea sortată ca listă.\n```\n[1, 2]\n```",
        starterCode: "",
        answer: "",
        expectedOutput: "[1, 2]",
        explanation: "A - B = {1, 2}; sorted → [1, 2].",
      },
      {
        number: 14,
        type: "coding",
        difficulty: "medium",
        language: "python",
        question:
          "Verifică dacă {2, 4} este subset al {1, 2, 3, 4, 5}. Afișează True sau False.\n```\nTrue\n```",
        starterCode: "",
        answer: "",
        expectedOutput: "True",
        explanation: "{2,4}.issubset({1,2,3,4,5}) sau {2,4} <= {1,2,3,4,5}.",
      },
      {
        number: 15,
        type: "coding",
        difficulty: "hard",
        language: "python",
        question:
          "Dintr-o listă de propoziții ['ana are mere', 'ion are pere', 'ana bea apa'], extrage toate cuvintele unice ca set și afișează câte sunt.\n```\n7\n```",
        starterCode: "",
        answer: "",
        expectedOutput: "7",
        explanation: "Cuvintele unice: ana, are, mere, ion, pere, bea, apa → 7.",
      },
    ],
  },

  // ── 12. "21. List/Dict/Set comprehensions" ────────────────────────────────
  {
    lessonId: "6a021a56f0ec7fc9c03a61b8",
    name: "21. List/Dict/Set comprehensions",
    tasks: [
      {
        number: 6,
        type: "fillblank",
        difficulty: "easy",
        question:
          "Completează comprehension-ul pentru a obține pătratele numerelor 1-5:\n```python\npatrate = [x___ for x in range(1, 6)]\nprint(patrate)\n```",
        answer: "**2",
        explanation: "x**2 sau x*x calculează pătratul fiecărui element.",
      },
      {
        number: 7,
        type: "fillblank",
        difficulty: "easy",
        question:
          "Completează condiția pentru a păstra doar numerele pare:\n```python\npare = [x for x in range(1, 11) if ___]\nprint(pare)\n```",
        answer: "x % 2 == 0",
        explanation: "Condiția if în comprehension filtrează elementele.",
      },
      {
        number: 8,
        type: "fillblank",
        difficulty: "medium",
        question:
          "Ce afișează programul?\n```python\nrezultat = [x * 2 for x in [1, 2, 3, 4, 5] if x > 2]\nprint(len(rezultat))\n```\nRăspuns: `___`",
        answer: "3",
        explanation: "Elementele > 2 sunt 3, 4, 5 → multiplicate cu 2 → [6, 8, 10] → len=3.",
      },
      {
        number: 9,
        type: "fillblank",
        difficulty: "medium",
        question:
          "Completează pentru a crea un dict comprehension cu pătratele:\n```python\nd = {x: ___ for x in range(1, 4)}\nprint(d)\n```",
        answer: "x**2",
        explanation: "Dict comprehension: {cheie: valoare for element in iterabil}.",
      },
      {
        number: 10,
        type: "fillblank",
        difficulty: "hard",
        question:
          "Ce afișează programul?\n```python\ns = {x % 3 for x in range(10)}\nprint(len(s))\n```\nRăspuns: `___`",
        answer: "3",
        explanation: "x % 3 pentru x in range(10) produce {0, 1, 2} — set comprehension elimină duplicatele.",
      },
      // coding #11-15
      {
        number: 11,
        type: "coding",
        difficulty: "easy",
        language: "python",
        question:
          "Folosind list comprehension, creează lista cuburilor numerelor 1-6. Afișează lista.\n```\n[1, 8, 27, 64, 125, 216]\n```",
        starterCode: "",
        answer: "",
        expectedOutput: "[1, 8, 27, 64, 125, 216]",
        explanation: "[x**3 for x in range(1, 7)].",
      },
      {
        number: 12,
        type: "coding",
        difficulty: "easy",
        language: "python",
        question:
          "Folosind list comprehension, extrage toate vocalele din 'programare'. Afișează lista.\n```\n['o', 'a', 'a', 'e']\n```",
        starterCode: "",
        answer: "",
        expectedOutput: "['o', 'a', 'a', 'e']",
        explanation: "[c for c in 'programare' if c in 'aeiou'].",
      },
      {
        number: 13,
        type: "coding",
        difficulty: "medium",
        language: "python",
        question:
          "Creează un dict comprehension care mapează fiecare cuvânt din ['ana', 'ion', 'maria'] la lungimea sa. Afișează dict-ul.\n```\n{'ana': 3, 'ion': 3, 'maria': 5}\n```",
        starterCode: "",
        answer: "",
        expectedOutput: "{'ana': 3, 'ion': 3, 'maria': 5}",
        explanation: "{w: len(w) for w in lista}.",
      },
      {
        number: 14,
        type: "coding",
        difficulty: "medium",
        language: "python",
        question:
          "Folosind set comprehension, obține mulțimea resturilor la împărțirea cu 4 a numerelor 0-15. Afișează mulțimea sortată ca listă.\n```\n[0, 1, 2, 3]\n```",
        starterCode: "",
        answer: "",
        expectedOutput: "[0, 1, 2, 3]",
        explanation: "{x%4 for x in range(16)} = {0,1,2,3}.",
      },
      {
        number: 15,
        type: "coding",
        difficulty: "hard",
        language: "python",
        question:
          "Aplatizează o matrice [[1,2,3],[4,5,6],[7,8,9]] într-o singură listă folosind list comprehension imbricat. Afișează lista.\n```\n[1, 2, 3, 4, 5, 6, 7, 8, 9]\n```",
        starterCode: "",
        answer: "",
        expectedOutput: "[1, 2, 3, 4, 5, 6, 7, 8, 9]",
        explanation: "[val for rand in matrice for val in rand].",
      },
    ],
  },

  // ── 13. "24. OOP avansat — moștenire, MRO, magic methods" ────────────────
  {
    lessonId: "6a021a59f0ec7fc9c03a61cd",
    name: "24. OOP avansat — moștenire, MRO, magic methods",
    tasks: [
      {
        number: 6,
        type: "fillblank",
        difficulty: "easy",
        question:
          "Completează metoda dunder pentru reprezentarea string a unui obiect:\n```python\nclass Punct:\n    def __init__(self, x, y):\n        self.x, self.y = x, y\n    def ___(self):\n        return f'Punct({self.x}, {self.y})'\n```",
        answer: "__str__",
        explanation: "__str__ este apelat de str() și print(); returnează reprezentarea user-friendly.",
      },
      {
        number: 7,
        type: "fillblank",
        difficulty: "easy",
        question:
          "Completează decoratorul pentru a defini un getter de proprietate:\n```python\nclass Cerc:\n    def __init__(self, raza):\n        self._raza = raza\n    \n    @___\n    def raza(self):\n        return self._raza\n```",
        answer: "property",
        explanation: "@property transformă o metodă într-un getter accesibil ca atribut.",
      },
      {
        number: 8,
        type: "fillblank",
        difficulty: "medium",
        question:
          "Ce afișează programul?\n```python\nclass Vector:\n    def __init__(self, x, y):\n        self.x, self.y = x, y\n    def __add__(self, other):\n        return Vector(self.x+other.x, self.y+other.y)\n\nv = Vector(1,2) + Vector(3,4)\nprint(v.x, v.y)\n```\nRăspuns: `___`",
        answer: "4 6",
        explanation: "__add__ definește operatorul +. (1+3, 2+4) = (4, 6).",
      },
      {
        number: 9,
        type: "fillblank",
        difficulty: "medium",
        question:
          "Completează funcția care returnează ordinea de rezoluție a metodelor:\n```python\nclass A: pass\nclass B(A): pass\nclass C(B): pass\n\nprint(C.___()\n```",
        answer: "__mro__",
        explanation: "__mro__ (sau mro()) returnează ordinea în care Python caută metodele: C → B → A → object.",
      },
      {
        number: 10,
        type: "fillblank",
        difficulty: "hard",
        question:
          "Ce afișează programul?\n```python\nclass Numar:\n    def __init__(self, val): self.val = val\n    def __len__(self): return self.val\n\nn = Numar(42)\nprint(len(n))\n```\nRăspuns: `___`",
        answer: "42",
        explanation: "__len__ este apelat de funcția built-in len().",
      },
      // coding #11-15
      {
        number: 11,
        type: "coding",
        difficulty: "easy",
        language: "python",
        question:
          "Definește clasa Carte cu __init__(titlu, pagini) și __str__ care returnează '{titlu} ({pagini} pag.)'. Creează o instanță și afișează-o cu print.\n```\nPython pentru toți (320 pag.)\n```",
        starterCode: "",
        answer: "",
        expectedOutput: "Python pentru toți (320 pag.)",
        explanation: "print() apelează __str__ implicit.",
      },
      {
        number: 12,
        type: "coding",
        difficulty: "easy",
        language: "python",
        question:
          "Definește clasa Temperatura cu @property celsius și setter care validează că temperatura e >= -273. Setează 100 și afișează valoarea proprietății.\n```\n100\n```",
        starterCode: "",
        answer: "",
        expectedOutput: "100",
        explanation: "@property + @celsius.setter pentru acces controlat.",
      },
      {
        number: 13,
        type: "coding",
        difficulty: "medium",
        language: "python",
        question:
          "Definește clasa Vector2D cu __add__ și __str__. Adună Vector2D(2,3) + Vector2D(5,7) și afișează rezultatul.\n```\nVector2D(7, 10)\n```",
        starterCode: "",
        answer: "",
        expectedOutput: "Vector2D(7, 10)",
        explanation: "(2+5, 3+7) = (7, 10).",
      },
      {
        number: 14,
        type: "coding",
        difficulty: "medium",
        language: "python",
        question:
          "Afișează MRO-ul clasei C unde: class A: pass; class B(A): pass; class C(B): pass. Afișează lista numelor claselor din MRO.\n```\n['C', 'B', 'A', 'object']\n```",
        starterCode: "",
        answer: "",
        expectedOutput: "['C', 'B', 'A', 'object']",
        explanation: "[cls.__name__ for cls in C.__mro__].",
      },
      {
        number: 15,
        type: "coding",
        difficulty: "hard",
        language: "python",
        question:
          "Definește clasa Multime cu __contains__ (operatorul in), __len__ și __repr__. Testează cu elem in multime și len(multime) pentru o multime cu 3 elemente.\n```\nTrue\n3\n```",
        starterCode: "",
        answer: "",
        expectedOutput: "True\n3",
        explanation: "__contains__ suportă operatorul in; __len__ suportă len().",
      },
    ],
  },

  // ── 14. "25. Excepții și error handling" ──────────────────────────────────
  {
    lessonId: "6a021a5af0ec7fc9c03a61d4",
    name: "25. Excepții și error handling",
    tasks: [
      {
        number: 6,
        type: "fillblank",
        difficulty: "easy",
        question:
          "Completează keyword-ul pentru a prinde excepția:\n```python\ntry:\n    x = int('abc')\n___ ValueError:\n    print('eroare de conversie')\n```",
        answer: "except",
        explanation: "except specifică tipul de excepție de prins; fără tip, prinde orice excepție.",
      },
      {
        number: 7,
        type: "fillblank",
        difficulty: "easy",
        question:
          "Completează blocul care se execută indiferent de excepție:\n```python\ntry:\n    f = open('fisier.txt')\nexcept FileNotFoundError:\n    print('nu există')\n___:\n    print('gata')\n```",
        answer: "finally",
        explanation: "finally se execută mereu, fie că excepția a apărut sau nu — ideal pentru eliberarea resurselor.",
      },
      {
        number: 8,
        type: "fillblank",
        difficulty: "medium",
        question:
          "Ce afișează programul?\n```python\ntry:\n    rezultat = 10 / 0\nexcept ZeroDivisionError:\n    print('impartire la zero')\nelse:\n    print('ok')\n```\nRăspuns: `___`",
        answer: "impartire la zero",
        explanation: "10/0 aruncă ZeroDivisionError; else se execută doar dacă nu e excepție.",
      },
      {
        number: 9,
        type: "fillblank",
        difficulty: "medium",
        question:
          "Completează pentru a arunca o excepție cu mesaj personalizat:\n```python\ndef verifica_varsta(v):\n    if v < 0:\n        ___ ValueError('Vârsta nu poate fi negativă')\n```",
        answer: "raise",
        explanation: "raise aruncă explicit o excepție; poate fi folosit cu orice clasă de excepție.",
      },
      {
        number: 10,
        type: "fillblank",
        difficulty: "hard",
        question:
          "Ce afișează programul?\n```python\nclass EroareCustom(Exception):\n    pass\n\ntry:\n    raise EroareCustom('test')\nexcept EroareCustom as e:\n    print(str(e))\n```\nRăspuns: `___`",
        answer: "test",
        explanation: "str(e) pe o excepție returnează mesajul cu care a fost aruncată.",
      },
      // coding #11-15
      {
        number: 11,
        type: "coding",
        difficulty: "easy",
        language: "python",
        question:
          "Prinde excepția la împărțirea 5/0 și afișează 'Nu se poate împărți la zero'.\n```\nNu se poate împărți la zero\n```",
        starterCode: "",
        answer: "",
        expectedOutput: "Nu se poate împărți la zero",
        explanation: "try/except ZeroDivisionError.",
      },
      {
        number: 12,
        type: "coding",
        difficulty: "easy",
        language: "python",
        question:
          "Încearcă să convertești 'salut' la int; prinde ValueError și afișează 'conversie eșuată', apoi în finally afișează 'bloc finally executat'.\n```\nconversie eșuată\nbloc finally executat\n```",
        starterCode: "",
        answer: "",
        expectedOutput: "conversie eșuată\nbloc finally executat",
        explanation: "try/except ValueError/finally.",
      },
      {
        number: 13,
        type: "coding",
        difficulty: "medium",
        language: "python",
        question:
          "Definește EroareVarsta(Exception). Scrie o funcție verifica(v) care aruncă EroareVarsta dacă v < 0. Prinde excepția pentru v=-5 și afișează mesajul.\n```\nVârstă invalidă: -5\n```",
        starterCode: "",
        answer: "",
        expectedOutput: "Vârstă invalidă: -5",
        explanation: "raise EroareVarsta(f'Vârstă invalidă: {v}') prins cu except EroareVarsta as e.",
      },
      {
        number: 14,
        type: "coding",
        difficulty: "medium",
        language: "python",
        question:
          "Prinde mai multe tipuri de excepții: încearcă int('abc') și 1/0 separat; afișează 'ValueError' sau 'ZeroDivisionError' pentru fiecare.\n```\nValueError\nZeroDivisionError\n```",
        starterCode: "",
        answer: "",
        expectedOutput: "ValueError\nZeroDivisionError",
        explanation: "Două blocuri try/except separate sau except (ValueError, ZeroDivisionError).",
      },
      {
        number: 15,
        type: "coding",
        difficulty: "hard",
        language: "python",
        question:
          "Scrie o funcție sigur_divide(a, b) care returnează a/b sau afișează 'eroare' și returnează None la ZeroDivisionError. Testează cu (10,2) și (5,0), afișând rezultatele.\n```\n5.0\neroare\nNone\n```",
        starterCode: "",
        answer: "",
        expectedOutput: "5.0\neroare\nNone",
        explanation: "try/except; 10/2=5.0, 5/0 → afișează 'eroare' și returnează None.",
      },
    ],
  },

  // ── 15. "28. Virtual environments și pip" ────────────────────────────────
  {
    lessonId: "6a021a5df0ec7fc9c03a61e9",
    name: "28. Virtual environments și pip",
    tasks: [
      {
        number: 6,
        type: "fillblank",
        difficulty: "easy",
        question:
          "Completează comanda pentru a crea un virtual environment denumit 'venv':\n```\npython -m ___ venv\n```",
        answer: "venv",
        explanation: "python -m venv <nume_folder> creează un virtual environment în folderul specificat.",
      },
      {
        number: 7,
        type: "fillblank",
        difficulty: "easy",
        question:
          "Completează comanda pip pentru a instala pachetul 'requests':\n```\npip ___ requests\n```",
        answer: "install",
        explanation: "pip install <pachet> descarcă și instalează pachetul din PyPI.",
      },
      {
        number: 8,
        type: "fillblank",
        difficulty: "medium",
        question:
          "Completează comanda pentru a salva toate pachetele instalate într-un fișier:\n```\npip freeze > ___\n```",
        answer: "requirements.txt",
        explanation: "requirements.txt este fișierul convențional cu lista dependențelor proiectului.",
      },
      {
        number: 9,
        type: "fillblank",
        difficulty: "medium",
        question:
          "Completează comanda pentru a instala toate pachetele din requirements.txt:\n```\npip install ___ requirements.txt\n```",
        answer: "-r",
        explanation: "pip install -r requirements.txt instalează toate pachetele listate în fișier.",
      },
      {
        number: 10,
        type: "fillblank",
        difficulty: "hard",
        question:
          "Completează comanda pentru a afla versiunea unui pachet instalat:\n```\npip ___ requests\n```",
        answer: "show",
        explanation: "pip show <pachet> afișează detalii despre pachet: versiune, autor, locație, dependențe.",
      },
      // coding #11-15
      {
        number: 11,
        type: "coding",
        difficulty: "easy",
        language: "python",
        question:
          "Importă modulul 'sys' și afișează versiunea Python curentă (sys.version_info major și minor, format 'major.minor').\n```\n3.12\n```",
        starterCode: "",
        answer: "",
        expectedOutput: "3.12",
        explanation: "f'{sys.version_info.major}.{sys.version_info.minor}'.",
      },
      {
        number: 12,
        type: "coding",
        difficulty: "easy",
        language: "python",
        question:
          "Importă modulul 'os' și afișează calea curentă de lucru folosind os.getcwd(). Afișează doar ultimul folder din cale.\n```\nproiect\n```",
        starterCode: "import os\nprint(os.path.basename(os.getcwd()))\n",
        answer: "",
        expectedOutput: "proiect",
        explanation: "os.path.basename() returnează ultimul component al căii.",
      },
      {
        number: 13,
        type: "coding",
        difficulty: "medium",
        language: "python",
        question:
          "Parsează un fișier requirements.txt simulat (string cu mai multe linii) și afișează câte pachete sunt listate.\n```python\nreq = 'requests==2.31.0\\nflask==3.0.0\\nnumpy==1.26.0\\npandas==2.1.0'\n```\n```\n4\n```",
        starterCode: "req = 'requests==2.31.0\\nflask==3.0.0\\nnumpy==1.26.0\\npandas==2.1.0'\nprint(len(req.strip().split('\\n')))\n",
        answer: "",
        expectedOutput: "4",
        explanation: "Numărul de linii = numărul de pachete.",
      },
      {
        number: 14,
        type: "coding",
        difficulty: "medium",
        language: "python",
        question:
          "Dintr-un string requirements 'requests==2.31\\nflask==3.0\\nnumpy==1.26', extrage doar numele pachetelor (fără versiune) și afișează-le ca listă.\n```\n['requests', 'flask', 'numpy']\n```",
        starterCode: "",
        answer: "",
        expectedOutput: "['requests', 'flask', 'numpy']",
        explanation: "Splitezi fiecare linie după '==' și iei primul element.",
      },
      {
        number: 15,
        type: "coding",
        difficulty: "hard",
        language: "python",
        question:
          "Simulează un dependency checker: dintr-un dict {'requests': '2.31', 'flask': '3.0', 'numpy': '1.26'} și o listă required=['requests','pandas'], afișează pachetele lipsă.\n```\nLipsesc: ['pandas']\n```",
        starterCode: "",
        answer: "",
        expectedOutput: "Lipsesc: ['pandas']",
        explanation: "Setul diferență între required și cheile din dict instalat.",
      },
    ],
  },

  // ── 16. "29. Generatoare și iteratoare" ───────────────────────────────────
  {
    lessonId: "6a021a5ef0ec7fc9c03a61f0",
    name: "29. Generatoare și iteratoare",
    tasks: [
      {
        number: 6,
        type: "fillblank",
        difficulty: "easy",
        question:
          "Completează keyword-ul care transformă o funcție în generator:\n```python\ndef numara_pana_la(n):\n    for i in range(1, n+1):\n        ___ i\n```",
        answer: "yield",
        explanation: "yield suspendă execuția funcției și returnează valoarea; la apelul următor reia de unde a rămas.",
      },
      {
        number: 7,
        type: "fillblank",
        difficulty: "easy",
        question:
          "Completează funcția built-in pentru a obține următoarea valoare dintr-un iterator:\n```python\ngen = (x**2 for x in range(3))\nprint(___(gen))\n```",
        answer: "next",
        explanation: "next() avansează iteratorul și returnează următoarea valoare; aruncă StopIteration când e golit.",
      },
      {
        number: 8,
        type: "fillblank",
        difficulty: "medium",
        question:
          "Ce afișează programul?\n```python\ngen = (x * 2 for x in range(1, 4))\nprint(list(gen))\n```\nRăspuns: `___`",
        answer: "[2, 4, 6]",
        explanation: "Generator expression: 1*2=2, 2*2=4, 3*2=6 → [2,4,6].",
      },
      {
        number: 9,
        type: "fillblank",
        difficulty: "medium",
        question:
          "Completează pentru a crea o generator expression care filtrează numerele pare:\n```python\npare = (___ for x in range(1, 11) if x % 2 == 0)\nprint(list(pare))\n```",
        answer: "x",
        explanation: "Generator expression: (expresie for var in iterabil if condiție).",
      },
      {
        number: 10,
        type: "fillblank",
        difficulty: "hard",
        question:
          "Ce afișează programul?\n```python\ndef fibonacci():\n    a, b = 0, 1\n    while True:\n        yield a\n        a, b = b, a + b\n\ngen = fibonacci()\nfor _ in range(5):\n    print(next(gen), end=' ')\n```\nRăspuns (primele 5 numere): `___`",
        answer: "0 1 1 2 3",
        explanation: "Fibonacci: 0, 1, 1, 2, 3, 5, ... — primele 5 valori sunt 0 1 1 2 3.",
      },
      // coding #11-15
      {
        number: 11,
        type: "coding",
        difficulty: "easy",
        language: "python",
        question:
          "Definește un generator patrate(n) care produce pătratele de la 1 la n. Iterează cu for pentru n=5 și afișează fiecare valoare pe o linie.\n```\n1\n4\n9\n16\n25\n```",
        starterCode: "",
        answer: "",
        expectedOutput: "1\n4\n9\n16\n25",
        explanation: "yield i**2 pentru i in range(1, n+1).",
      },
      {
        number: 12,
        type: "coding",
        difficulty: "easy",
        language: "python",
        question:
          "Creează o generator expression pentru suma pătratelor numerelor 1-10 și afișează rezultatul.\n```\n385\n```",
        starterCode: "",
        answer: "",
        expectedOutput: "385",
        explanation: "sum(x**2 for x in range(1, 11)) = 1+4+9+...+100 = 385.",
      },
      {
        number: 13,
        type: "coding",
        difficulty: "medium",
        language: "python",
        question:
          "Definește un generator numere_prime(limita) care generează numerele prime până la limita. Afișează primele prime până la 20.\n```\n2\n3\n5\n7\n11\n13\n17\n19\n```",
        starterCode: "",
        answer: "",
        expectedOutput: "2\n3\n5\n7\n11\n13\n17\n19",
        explanation: "Verifici fiecare număr dacă e prim (niciun divizor de la 2 la sqrt(n)).",
      },
      {
        number: 14,
        type: "coding",
        difficulty: "medium",
        language: "python",
        question:
          "Folosind next() de 4 ori pe un generator Fibonacci infinit, afișează primele 4 numere Fibonacci pe linii separate.\n```\n0\n1\n1\n2\n```",
        starterCode: "",
        answer: "",
        expectedOutput: "0\n1\n1\n2",
        explanation: "Generator infinit cu yield; next() consumă câte o valoare.",
      },
      {
        number: 15,
        type: "coding",
        difficulty: "hard",
        language: "python",
        question:
          "Definește clasa Interval ca iterator care produce numerele de la start la stop cu step (implementând __iter__ și __next__). Testează Interval(1, 10, 3) și afișează valorile.\n```\n1\n4\n7\n```",
        starterCode: "",
        answer: "",
        expectedOutput: "1\n4\n7",
        explanation: "__iter__ returnează self; __next__ avansează și aruncă StopIteration când depășește stop.",
      },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────

async function main() {
  console.log(`Fixing tasks for ${FIXES.length} Python lessons...\n`);

  for (const fix of FIXES) {
    // Delete tasks #6-15 for this lesson
    const deleted = await prisma.task.deleteMany({
      where: {
        lessonId: fix.lessonId,
        number: { gte: 6 },
      },
    });

    // Insert new tasks with lessonId attached
    const created = await prisma.task.createMany({
      data: fix.tasks.map((t) => ({ ...t, lessonId: fix.lessonId })),
    });

    console.log(
      `✓ ${fix.name} — deleted ${deleted.count}, created ${created.count}`
    );
  }

  console.log("\nAll lessons fixed successfully.");
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  prisma.$disconnect();
  process.exit(1);
});
