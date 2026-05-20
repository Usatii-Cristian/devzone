"use strict";
require("dotenv").config({ path: ".env" });
const { PrismaClient } = require("@prisma/client");
const p = new PrismaClient();

const MODULE_LANG = {
  python: "python",
  javascript: "javascript",
  html: "html",
  css: "css",
  tailwind: "html",
  react: "jsx",
  "nextjs-frontend": "jsx",
  "nextjs-backend": "javascript",
  c: "c",
  cpp: "cpp",
  csharp: "csharp",
  java: "java",
  sql: "sql",
  php: "php",
  cybersecurity: "javascript",
};

// ─────────────────────────────────────────────
// PYTHON TOPICS
// ─────────────────────────────────────────────
const TOPICS = {};

TOPICS["python::print"] = {
  fillblanks: [
    {
      difficulty: "easy", name: "Funcția print",
      question: "Completează codul pentru a afișa 'Hello, World!' pe ecran:\n```python\n___(\"Hello, World!\")\n```",
      answer: "print",
      explanation: "print() este funcția built-in Python pentru afișarea textului în consolă."
    },
    {
      difficulty: "easy", name: "Afișare cu separator",
      question: "Completează pentru a afișa valorile separate prin ' - ':\n```python\nprint(1, 2, 3, ___=\" - \")\n```",
      answer: "sep",
      explanation: "Parametrul sep definește separatorul dintre elementele afișate."
    },
    {
      difficulty: "medium", name: "Fără newline",
      question: "Completează pentru ca print să nu adauge newline la final:\n```python\nprint(\"Prima linie\", ___=\"\")\n```",
      answer: "end",
      explanation: "Parametrul end controlează ce se adaugă la finalul ieșirii; implicit este '\\n'."
    },
    {
      difficulty: "medium", name: "F-string",
      question: "Completează f-string-ul pentru a afișa 'Salut, Ana!':\n```python\nnume = \"Ana\"\nprint(___\"Salut, {nume}!\")\n```",
      answer: "f",
      explanation: "F-strings (formatted string literals) permit interpolarea variabilelor cu prefixul f."
    },
    {
      difficulty: "hard", name: "Formatare avansată",
      question: "Completează pentru a afișa numărul cu 2 zecimale:\n```python\nx = 3.14159\nprint(f\"{x___}\")\n```",
      answer: ":.2f",
      explanation: "Specificatorul :.2f formatează un float cu exact 2 cifre după virgulă."
    },
  ],
  codings: [
    {
      difficulty: "easy", name: "Hello World",
      question: "Scrie un program care afișează exact:\n```\nHello, World!\n```",
      starterCode: "# Scrie codul tău aici\n",
      expectedOutput: "Hello, World!",
      language: "python"
    },
    {
      difficulty: "easy", name: "Afișare pe două linii",
      question: "Afișează pe linii separate:\n```\nPrimă linie\nA doua linie\n```",
      starterCode: "# Folosește două apeluri print\n",
      expectedOutput: "Primă linie\nA doua linie",
      language: "python"
    },
    {
      difficulty: "medium", name: "Print cu separator",
      question: "Afișează cifrele 1, 2, 3 separate prin virgulă și spațiu:\n```\n1, 2, 3\n```",
      starterCode: "# Folosește parametrul sep\n",
      expectedOutput: "1, 2, 3",
      language: "python"
    },
    {
      difficulty: "medium", name: "Afișare pe aceeași linie",
      question: "Afișează trei apeluri print pe aceeași linie, rezultând:\n```\nABC\n```",
      starterCode: "# Folosește parametrul end\nprint(\"A\", end=\"\")\n# TODO: adaugă restul\n",
      expectedOutput: "ABC",
      language: "python"
    },
    {
      difficulty: "hard", name: "Formatare tabel",
      question: "Afișează datele formatat (coloane aliniate):\n```\nNume       Vârstă\nAna        25\nIon        30\n```",
      starterCode: "persoane = [(\"Ana\", 25), (\"Ion\", 30)]\nprint(f\"{'Nume':<10} {'Vârstă'}\")\n# TODO: iterează persoane cu f-string formatat\n",
      expectedOutput: "Nume       Vârstă\nAna        25\nIon        30",
      language: "python"
    },
  ]
};

TOPICS["python::variabile"] = {
  fillblanks: [
    {
      difficulty: "easy", name: "Tipul întreg",
      question: "Care este tipul variabilei x?\n```python\nx = 42\nprint(___(x))\n```\nRăspuns: `___`",
      answer: "type",
      explanation: "type() returnează tipul unui obiect Python."
    },
    {
      difficulty: "easy", name: "Variabilă string",
      question: "Completează tipul de date pentru text:\n```python\nnume = \"Python\"\nprint(type(nume))  # <class '___'>\n```",
      answer: "str",
      explanation: "Textele în Python sunt de tipul str (string)."
    },
    {
      difficulty: "medium", name: "Conversie tip",
      question: "Completează pentru a converti string-ul la întreg:\n```python\ns = \"10\"\nn = ___(s)\nprint(n + 5)  # 15\n```",
      answer: "int",
      explanation: "int() convertește un string numeric la tipul întreg."
    },
    {
      difficulty: "medium", name: "Schimb de valori",
      question: "Completează pentru a schimba valorile fără variabilă temporară:\n```python\na, b = 1, 2\n___, ___ = b, a\n```",
      answer: "a, b",
      explanation: "Python suportă swap direct prin unpacking de tupluri."
    },
    {
      difficulty: "hard", name: "Tipuri multiple",
      question: "Ce va afișa codul următor?\n```python\nx = True\nprint(int(x) + int(False))\n```\nRăspuns: `___`",
      answer: "1",
      explanation: "True are valoarea întreagă 1, False are 0; 1 + 0 = 1."
    },
  ],
  codings: [
    {
      difficulty: "easy", name: "Variabile de bază",
      question: "Declară o variabilă `varsta` cu valoarea 20 și afișeaz-o:\n```\n20\n```",
      starterCode: "# Declară variabila\n# TODO\nprint(varsta)\n",
      expectedOutput: "20",
      language: "python"
    },
    {
      difficulty: "easy", name: "Suma a două numere",
      question: "Declară `a = 15`, `b = 7` și afișează suma lor:\n```\n22\n```",
      starterCode: "a = 15\nb = 7\n# TODO: afișează suma\n",
      expectedOutput: "22",
      language: "python"
    },
    {
      difficulty: "medium", name: "Schimb de valori",
      question: "Schimbă valorile lui `x` și `y` și afișează rezultatul:\n```\n10 5\n```",
      starterCode: "x = 5\ny = 10\n# TODO: schimbă valorile\nprint(x, y)\n",
      expectedOutput: "10 5",
      language: "python"
    },
    {
      difficulty: "medium", name: "Conversii de tip",
      question: "Convertește `\"42\"` la întreg, adaugă 8 și afișează:\n```\n50\n```",
      starterCode: "s = \"42\"\n# TODO: convertește și adaugă 8\n",
      expectedOutput: "50",
      language: "python"
    },
    {
      difficulty: "hard", name: "Tipuri și operații",
      question: "Afișează tipul variabilei după fiecare operație:\n```\n<class 'int'>\n<class 'float'>\n```",
      starterCode: "x = 5\nprint(type(x))\nx = x / 2\n# TODO: afișează tipul lui x acum\n",
      expectedOutput: "<class 'int'>\n<class 'float'>",
      language: "python"
    },
  ]
};

TOPICS["python::input"] = {
  fillblanks: [
    {
      difficulty: "easy", name: "Citire date",
      question: "Completează pentru a citi un text de la tastatură:\n```python\nnume = ___(\"Introdu numele: \")\n```",
      answer: "input",
      explanation: "input() citește o linie din stdin și o returnează ca string."
    },
    {
      difficulty: "easy", name: "Tip returnat",
      question: "input() returnează întotdeauna date de tip:\n```python\nval = input()\nprint(type(val))  # <class '___'>\n```",
      answer: "str",
      explanation: "input() returnează mereu un string, indiferent de ce introduce utilizatorul."
    },
    {
      difficulty: "medium", name: "Conversie input",
      question: "Completează pentru a citi un număr întreg:\n```python\nn = ___(input(\"Număr: \"))\n```",
      answer: "int",
      explanation: "Deoarece input() returnează string, trebuie convertit cu int() pentru operații numerice."
    },
    {
      difficulty: "medium", name: "Citire float",
      question: "Completează pentru a citi un număr real:\n```python\npret = ___(input(\"Preț: \"))\n```",
      answer: "float",
      explanation: "float() convertește string-ul la număr în virgulă mobilă."
    },
    {
      difficulty: "hard", name: "Citire multiplă",
      question: "Completează pentru a citi două numere pe aceeași linie:\n```python\na, b = ___(int, input().split())\n```",
      answer: "map",
      explanation: "map() aplică o funcție (int) pe fiecare element al unui iterator (split() returnează o listă)."
    },
  ],
  codings: [
    {
      difficulty: "easy", name: "Salut personalizat",
      question: "Programa citește numele și afișează salut. Input simulat: `Ana`\n```\nSalut, Ana!\n```",
      starterCode: "nume = input()\n# TODO: afișează salutul\n",
      expectedOutput: "Salut, Ana!",
      language: "python"
    },
    {
      difficulty: "medium", name: "Suma cu input",
      question: "Citește un număr și afișează-l dublat. Input: `7`\n```\n14\n```",
      starterCode: "n = int(input())\n# TODO: afișează dublul\n",
      expectedOutput: "14",
      language: "python"
    },
    {
      difficulty: "medium", name: "Calcul vârstă",
      question: "Citește anul nașterii și afișează vârsta în 2025. Input: `2000`\n```\n25\n```",
      starterCode: "an = int(input())\n# TODO: calculează și afișează vârsta\n",
      expectedOutput: "25",
      language: "python"
    },
    {
      difficulty: "medium", name: "Citire mai multe valori",
      question: "Citește două numere și afișează suma. Input: `3 7`\n```\n10\n```",
      starterCode: "a, b = map(int, input().split())\n# TODO: afișează suma\n",
      expectedOutput: "10",
      language: "python"
    },
    {
      difficulty: "hard", name: "Calculator simplu",
      question: "Citește un număr și afișează pătratul și cubul. Input: `4`\n```\n16\n64\n```",
      starterCode: "n = int(input())\n# TODO: afișează n**2 și n**3\n",
      expectedOutput: "16\n64",
      language: "python"
    },
  ]
};

TOPICS["python::operatori"] = {
  fillblanks: [
    {
      difficulty: "easy", name: "Împărțire întreagă",
      question: "Ce operator returnează câtul întreg al împărțirii?\n```python\nprint(17 ___ 5)  # 3\n```",
      answer: "//",
      explanation: "Operatorul // returnează câtul întreg (floor division)."
    },
    {
      difficulty: "easy", name: "Modulo",
      question: "Completează pentru restul împărțirii:\n```python\nprint(17 ___ 5)  # 2\n```",
      answer: "%",
      explanation: "Operatorul % (modulo) returnează restul împărțirii."
    },
    {
      difficulty: "medium", name: "Putere",
      question: "Completează operatorul de ridicare la putere:\n```python\nprint(2 ___ 10)  # 1024\n```",
      answer: "**",
      explanation: "Operatorul ** ridică la putere: 2**10 = 1024."
    },
    {
      difficulty: "medium", name: "Operatori de comparație",
      question: "Completează pentru a verifica dacă un număr este par:\n```python\ndef este_par(n):\n    return n ___ 2 == 0\n```",
      answer: "%",
      explanation: "Un număr este par dacă restul împărțirii la 2 este 0."
    },
    {
      difficulty: "hard", name: "Operatori logici",
      question: "Ce afișează?\n```python\nprint(5 > 3 and 2 < 4 or False)\n```\nRăspuns: `___`",
      answer: "True",
      explanation: "5>3 este True, 2<4 este True, True and True = True, True or False = True."
    },
  ],
  codings: [
    {
      difficulty: "easy", name: "Operații de bază",
      question: "Calculează și afișează 100 împărțit la 7 (câtul și restul):\n```\n14\n2\n```",
      starterCode: "n = 100\nd = 7\n# TODO: afișează câtul și restul\n",
      expectedOutput: "14\n2",
      language: "python"
    },
    {
      difficulty: "easy", name: "Verificare paritate",
      question: "Afișează `par` dacă 42 este par, `impar` altfel:\n```\npar\n```",
      starterCode: "n = 42\n# TODO: verifică paritatea\n",
      expectedOutput: "par",
      language: "python"
    },
    {
      difficulty: "medium", name: "Putere și radical",
      question: "Afișează 2 la puterea 8 și radical din 144:\n```\n256\n12.0\n```",
      starterCode: "print(2 ** 8)\n# TODO: afișează radicalul din 144 (144 ** 0.5)\n",
      expectedOutput: "256\n12.0",
      language: "python"
    },
    {
      difficulty: "medium", name: "Ordinea operațiilor",
      question: "Evaluează expresia și afișează rezultatul:\n```\n14\n```",
      starterCode: "# (2 + 5) * 3 - 7\nrezultat = (2 + 5) * 3 - 7\nprint(rezultat)\n",
      expectedOutput: "14",
      language: "python"
    },
    {
      difficulty: "hard", name: "Conversia minutelor",
      question: "Convertește 137 minute în ore și minute rămase:\n```\n2 ore si 17 minute\n```",
      starterCode: "total_min = 137\n# TODO: calculează orele și minutele\n",
      expectedOutput: "2 ore si 17 minute",
      language: "python"
    },
  ]
};

TOPICS["python::if"] = {
  fillblanks: [
    {
      difficulty: "easy", name: "Structura if",
      question: "Completează cuvântul cheie pentru ramura alternativă:\n```python\nif x > 0:\n    print(\"pozitiv\")\n___:\n    print(\"negativ sau zero\")\n```",
      answer: "else",
      explanation: "else definește blocul executat când condiția if este False."
    },
    {
      difficulty: "easy", name: "elif",
      question: "Completează pentru condiție suplimentară:\n```python\nif nota >= 9:\n    print(\"Excelent\")\n___ nota >= 7:\n    print(\"Bine\")\n```",
      answer: "elif",
      explanation: "elif (else if) adaugă condiții alternative verificate în ordine."
    },
    {
      difficulty: "medium", name: "Operatorul in",
      question: "Completează pentru a verifica dacă un element este în listă:\n```python\nfructe = [\"mar\", \"para\", \"cireasa\"]\nif \"mar\" ___ fructe:\n    print(\"Găsit!\")\n```",
      answer: "in",
      explanation: "Operatorul in verifică apartenența unui element la o colecție."
    },
    {
      difficulty: "medium", name: "Condiție ternară",
      question: "Completează expresia ternară:\n```python\nn = 10\nresult = \"par\" ___ \"impar\" if n % 2 != 0\n```",
      answer: "if n % 2 == 0 else",
      explanation: "Forma ternară: valoare_true if conditie else valoare_false."
    },
    {
      difficulty: "hard", name: "Condiții complexe",
      question: "Ce afișează?\n```python\nx = 15\nif x > 10 and x % 3 == 0:\n    print(\"OK\")\nelse:\n    print(\"NU\")\n```\nRăspuns: `___`",
      answer: "OK",
      explanation: "15 > 10 este True și 15 % 3 == 0 este True (15/3=5 fără rest), deci se afișează OK."
    },
  ],
  codings: [
    {
      difficulty: "easy", name: "Pozitiv sau negativ",
      question: "Verifică dacă -5 este pozitiv sau negativ:\n```\nnegativ\n```",
      starterCode: "n = -5\n# TODO: afișează 'pozitiv' sau 'negativ'\n",
      expectedOutput: "negativ",
      language: "python"
    },
    {
      difficulty: "easy", name: "Notă școlară",
      question: "Pentru nota 8.5, afișează calificativul:\n```\nBine\n```",
      starterCode: "nota = 8.5\nif nota >= 9:\n    print(\"Excelent\")\n# TODO: adaugă restul condițiilor\n",
      expectedOutput: "Bine",
      language: "python"
    },
    {
      difficulty: "medium", name: "An bisect",
      question: "Verifică dacă 2024 este an bisect:\n```\nbisect\n```",
      starterCode: "an = 2024\n# Un an este bisect dacă e divizibil cu 4, dar nu cu 100,\n# sau dacă e divizibil cu 400\n# TODO\n",
      expectedOutput: "bisect",
      language: "python"
    },
    {
      difficulty: "medium", name: "Maxim din trei",
      question: "Găsește maximul dintre 12, 7 și 19:\n```\n19\n```",
      starterCode: "a, b, c = 12, 7, 19\n# TODO: afișează maximul\n",
      expectedOutput: "19",
      language: "python"
    },
    {
      difficulty: "hard", name: "Categorie IMC",
      question: "IMC = 22.5. Afișează categoria:\n```\nGreutate normala\n```",
      starterCode: "imc = 22.5\n# < 18.5: Subponderal\n# 18.5-24.9: Greutate normala\n# 25-29.9: Supraponderal\n# >= 30: Obezitate\n# TODO\n",
      expectedOutput: "Greutate normala",
      language: "python"
    },
  ]
};

TOPICS["python::while"] = {
  fillblanks: [
    {
      difficulty: "easy", name: "Bucla while",
      question: "Completează pentru bucla while:\n```python\ni = 0\n___ i < 5:\n    print(i)\n    i += 1\n```",
      answer: "while",
      explanation: "while repetă blocul cât timp condiția este True."
    },
    {
      difficulty: "easy", name: "Incrementare",
      question: "Completează operatorul de incrementare:\n```python\ni = 0\nwhile i < 3:\n    i ___ 1\n```",
      answer: "+=",
      explanation: "+= adaugă valoarea la dreapta variabilei din stânga."
    },
    {
      difficulty: "medium", name: "Break",
      question: "Completează pentru a ieși din buclă:\n```python\nwhile True:\n    n = int(input())\n    if n == 0:\n        ___\n```",
      answer: "break",
      explanation: "break ieșe imediat din bucla curentă."
    },
    {
      difficulty: "medium", name: "Continue",
      question: "Completează pentru a sări iterația curentă:\n```python\ni = 0\nwhile i < 5:\n    i += 1\n    if i == 3:\n        ___\n    print(i)\n```",
      answer: "continue",
      explanation: "continue sare la următoarea iterație fără a executa restul blocului."
    },
    {
      difficulty: "hard", name: "While else",
      question: "Ce afișează?\n```python\ni = 0\nwhile i < 3:\n    i += 1\nelse:\n    print(\"done\")\n```\nRăspuns: `___`",
      answer: "done",
      explanation: "Clauza else a while se execută când condiția devine False (nu la break)."
    },
  ],
  codings: [
    {
      difficulty: "easy", name: "Numărătoare",
      question: "Afișează numerele 1 până la 5 cu while:\n```\n1\n2\n3\n4\n5\n```",
      starterCode: "i = 1\n# TODO: buclă while\n",
      expectedOutput: "1\n2\n3\n4\n5",
      language: "python"
    },
    {
      difficulty: "easy", name: "Sumă cu while",
      question: "Calculează suma 1+2+...+10 cu while:\n```\n55\n```",
      starterCode: "total = 0\ni = 1\n# TODO: adună cu while\nprint(total)\n",
      expectedOutput: "55",
      language: "python"
    },
    {
      difficulty: "medium", name: "Cifre inversate",
      question: "Afișează cifrele lui 123 în ordine inversă:\n```\n3\n2\n1\n```",
      starterCode: "n = 123\nwhile n > 0:\n    # TODO: extrage ultima cifră și micșorează n\n    pass\n",
      expectedOutput: "3\n2\n1",
      language: "python"
    },
    {
      difficulty: "medium", name: "Puterea lui 2",
      question: "Afișează puterile lui 2 mai mici decât 100:\n```\n1\n2\n4\n8\n16\n32\n64\n```",
      starterCode: "p = 1\nwhile p < 100:\n    print(p)\n    # TODO: înmulțește p cu 2\n",
      expectedOutput: "1\n2\n4\n8\n16\n32\n64",
      language: "python"
    },
    {
      difficulty: "hard", name: "Collatz",
      question: "Secvența Collatz pornind de la 6 (afișează fiecare termen până la 1):\n```\n6\n3\n10\n5\n16\n8\n4\n2\n1\n```",
      starterCode: "n = 6\nwhile n != 1:\n    print(n)\n    if n % 2 == 0:\n        n = n // 2\n    else:\n        # TODO: n = 3*n + 1\n        pass\nprint(1)\n",
      expectedOutput: "6\n3\n10\n5\n16\n8\n4\n2\n1",
      language: "python"
    },
  ]
};

TOPICS["python::for"] = {
  fillblanks: [
    {
      difficulty: "easy", name: "Bucla for",
      question: "Completează pentru a itera de la 0 la 4:\n```python\nfor i in ___(5):\n    print(i)\n```",
      answer: "range",
      explanation: "range(5) generează secvența 0, 1, 2, 3, 4."
    },
    {
      difficulty: "easy", name: "Range cu start",
      question: "Completează pentru numerele 1-5:\n```python\nfor i in range(___, 6):\n    print(i)\n```",
      answer: "1",
      explanation: "range(start, stop) generează de la start până la stop-1."
    },
    {
      difficulty: "medium", name: "Range cu pas",
      question: "Completează pentru numerele pare de la 0 la 10:\n```python\nfor i in range(0, 11, ___):\n    print(i)\n```",
      answer: "2",
      explanation: "Al treilea argument al range() este pasul (incrementul)."
    },
    {
      difficulty: "medium", name: "Enumerate",
      question: "Completează pentru a obține indexul și valoarea:\n```python\nfructe = [\"mar\", \"para\"]\nfor i, f in ___(fructe):\n    print(i, f)\n```",
      answer: "enumerate",
      explanation: "enumerate() returnează perechi (index, valoare) pentru fiecare element."
    },
    {
      difficulty: "hard", name: "Zip",
      question: "Completează pentru a itera două liste simultan:\n```python\nnume = [\"Ana\", \"Ion\"]\nvarste = [25, 30]\nfor n, v in ___(nume, varste):\n    print(n, v)\n```",
      answer: "zip",
      explanation: "zip() combină mai mulți iteratori, returnând tupluri cu câte un element din fiecare."
    },
  ],
  codings: [
    {
      difficulty: "easy", name: "Tabla înmulțirii",
      question: "Afișează tabla lui 3 (de la 3×1 la 3×5):\n```\n3\n6\n9\n12\n15\n```",
      starterCode: "# TODO: for cu range\n",
      expectedOutput: "3\n6\n9\n12\n15",
      language: "python"
    },
    {
      difficulty: "easy", name: "Suma listei",
      question: "Calculează suma [10, 20, 30, 40] cu for:\n```\n100\n```",
      starterCode: "numere = [10, 20, 30, 40]\ntotal = 0\n# TODO: iterează și adună\nprint(total)\n",
      expectedOutput: "100",
      language: "python"
    },
    {
      difficulty: "medium", name: "FizzBuzz",
      question: "FizzBuzz de la 1 la 15:\n```\n1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz\n```",
      starterCode: "for i in range(1, 16):\n    # TODO: logica FizzBuzz\n    pass\n",
      expectedOutput: "1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz",
      language: "python"
    },
    {
      difficulty: "medium", name: "Numere prime",
      question: "Afișează numerele prime de la 2 la 20:\n```\n2\n3\n5\n7\n11\n13\n17\n19\n```",
      starterCode: "for n in range(2, 21):\n    este_prim = True\n    for d in range(2, n):\n        if n % d == 0:\n            este_prim = False\n            break\n    # TODO: afișează dacă este prim\n",
      expectedOutput: "2\n3\n5\n7\n11\n13\n17\n19",
      language: "python"
    },
    {
      difficulty: "hard", name: "Triunghi numere",
      question: "Afișează triunghiul:\n```\n1\n1 2\n1 2 3\n1 2 3 4\n```",
      starterCode: "for i in range(1, 5):\n    # TODO: afișează numerele 1..i pe o linie\n    pass\n",
      expectedOutput: "1\n1 2\n1 2 3\n1 2 3 4",
      language: "python"
    },
  ]
};

TOPICS["python::liste"] = {
  fillblanks: [
    {
      difficulty: "easy", name: "Adăugare element",
      question: "Completează pentru a adăuga 5 la finalul listei:\n```python\nL = [1, 2, 3]\nL.___(5)\n```",
      answer: "append",
      explanation: "append() adaugă un element la finalul listei."
    },
    {
      difficulty: "easy", name: "Lungimea listei",
      question: "Completează funcția pentru lungimea listei:\n```python\nL = [10, 20, 30]\nprint(___(L))  # 3\n```",
      answer: "len",
      explanation: "len() returnează numărul de elemente din secvență."
    },
    {
      difficulty: "medium", name: "Eliminare element",
      question: "Completează pentru a elimina primul 3 din listă:\n```python\nL = [1, 3, 2, 3]\nL.___(3)\n```",
      answer: "remove",
      explanation: "remove() elimină prima apariție a valorii specificate."
    },
    {
      difficulty: "medium", name: "Sortare",
      question: "Completează pentru a sorta lista în ordine crescătoare:\n```python\nL = [3, 1, 4, 1, 5]\nL.___()\n```",
      answer: "sort",
      explanation: "sort() sortează lista in-place în ordine crescătoare implicit."
    },
    {
      difficulty: "hard", name: "Slicing avansat",
      question: "Ce returnează?\n```python\nL = [0, 1, 2, 3, 4]\nprint(L[1:4])\n```\nRăspuns: `___`",
      answer: "[1, 2, 3]",
      explanation: "Slicing L[start:stop] returnează elementele de la indexul start până la stop-1."
    },
  ],
  codings: [
    {
      difficulty: "easy", name: "Construiește lista",
      question: "Adaugă numerele 1-5 într-o listă și afișeaz-o:\n```\n[1, 2, 3, 4, 5]\n```",
      starterCode: "L = []\n# TODO: adaugă cu append\nprint(L)\n",
      expectedOutput: "[1, 2, 3, 4, 5]",
      language: "python"
    },
    {
      difficulty: "easy", name: "Maxim și minim",
      question: "Afișează maximul și minimul din [3, 1, 4, 1, 5, 9, 2]:\n```\n9\n1\n```",
      starterCode: "L = [3, 1, 4, 1, 5, 9, 2]\n# TODO: afișează max și min\n",
      expectedOutput: "9\n1",
      language: "python"
    },
    {
      difficulty: "medium", name: "Filtrare",
      question: "Afișează numerele pare din [1,2,3,4,5,6,7,8]:\n```\n[2, 4, 6, 8]\n```",
      starterCode: "L = [1, 2, 3, 4, 5, 6, 7, 8]\nresult = []\n# TODO: filtrează pare\nprint(result)\n",
      expectedOutput: "[2, 4, 6, 8]",
      language: "python"
    },
    {
      difficulty: "medium", name: "Inversare",
      question: "Afișează lista [1,2,3,4,5] inversată:\n```\n[5, 4, 3, 2, 1]\n```",
      starterCode: "L = [1, 2, 3, 4, 5]\n# TODO: inversează și afișează\n",
      expectedOutput: "[5, 4, 3, 2, 1]",
      language: "python"
    },
    {
      difficulty: "hard", name: "Deduplicare",
      question: "Elimină duplicatele din [1,2,2,3,3,3,4] menținând ordinea:\n```\n[1, 2, 3, 4]\n```",
      starterCode: "L = [1, 2, 2, 3, 3, 3, 4]\nresult = []\n# TODO: adaugă doar elementele noi\nprint(result)\n",
      expectedOutput: "[1, 2, 3, 4]",
      language: "python"
    },
  ]
};

TOPICS["python::strings"] = {
  fillblanks: [
    {
      difficulty: "easy", name: "Lungime string",
      question: "Completează pentru lungimea textului:\n```python\ns = \"Python\"\nprint(___(s))  # 6\n```",
      answer: "len",
      explanation: "len() returnează numărul de caractere din string."
    },
    {
      difficulty: "easy", name: "Majuscule",
      question: "Completează pentru a converti la majuscule:\n```python\nprint(\"hello\".___(  ))  # HELLO\n```",
      answer: "upper",
      explanation: "upper() returnează o copie a string-ului cu toate literele majuscule."
    },
    {
      difficulty: "medium", name: "Split",
      question: "Completează pentru a împărți fraza în cuvinte:\n```python\nfraza = \"Ana are mere\"\ncuvinte = fraza.___(' ')\n```",
      answer: "split",
      explanation: "split(separator) împarte string-ul după separator, returnând o listă."
    },
    {
      difficulty: "medium", name: "Replace",
      question: "Completează pentru a înlocui 'a' cu 'e':\n```python\nprint(\"banana\".___('a', 'e'))  # benene\n```",
      answer: "replace",
      explanation: "replace(vechi, nou) înlocuiește toate aparițiile primului argument cu al doilea."
    },
    {
      difficulty: "hard", name: "Strip",
      question: "Completează pentru a elimina spațiile de la capete:\n```python\ns = \"  hello  \"\nprint(s.___(  ))  # 'hello'\n```",
      answer: "strip",
      explanation: "strip() elimină whitespace (spații, tab, newline) de la ambele capete."
    },
  ],
  codings: [
    {
      difficulty: "easy", name: "Inversare string",
      question: "Inversează string-ul 'Python':\n```\nnohtyP\n```",
      starterCode: "s = \"Python\"\n# TODO: afișează inversat\n",
      expectedOutput: "nohtyP",
      language: "python"
    },
    {
      difficulty: "easy", name: "Numărare vocale",
      question: "Numără vocalele din 'programming':\n```\n3\n```",
      starterCode: "s = \"programming\"\ncount = 0\nfor ch in s:\n    if ch in \"aeiou\":\n        # TODO\n        pass\nprint(count)\n",
      expectedOutput: "3",
      language: "python"
    },
    {
      difficulty: "medium", name: "Palindrom",
      question: "Verifică dacă 'racecar' este palindrom:\n```\nTrue\n```",
      starterCode: "s = \"racecar\"\n# TODO: verifică și afișează True/False\n",
      expectedOutput: "True",
      language: "python"
    },
    {
      difficulty: "medium", name: "Cuvinte unice",
      question: "Numără cuvintele unice din 'ana are mere ana':\n```\n3\n```",
      starterCode: "s = \"ana are mere ana\"\n# TODO: împarte, transformă în set, numără\n",
      expectedOutput: "3",
      language: "python"
    },
    {
      difficulty: "hard", name: "Caesar cipher",
      question: "Codează 'abc' cu deplasare 3:\n```\ndef\n```",
      starterCode: "text = \"abc\"\ndeplasare = 3\nrezultat = \"\"\nfor ch in text:\n    # TODO: deplasează litera\n    pass\nprint(rezultat)\n",
      expectedOutput: "def",
      language: "python"
    },
  ]
};

TOPICS["python::dict"] = {
  fillblanks: [
    {
      difficulty: "easy", name: "Accesare cheie",
      question: "Completează pentru a accesa valoarea cheii 'nume':\n```python\nd = {\"nume\": \"Ana\", \"varsta\": 25}\nprint(d[___])\n```",
      answer: "\"nume\"",
      explanation: "Accesarea unui dicționar se face cu paranteze drepte și cheia."
    },
    {
      difficulty: "easy", name: "Adăugare cheie",
      question: "Completează pentru a adăuga o cheie nouă:\n```python\nd = {}\nd[___] = \"Python\"\n```",
      answer: "\"limbaj\"",
      explanation: "Adăugarea sau actualizarea unei chei se face prin atribuire directă."
    },
    {
      difficulty: "medium", name: "Get cu default",
      question: "Completează pentru a obține valoarea sau 'N/A':\n```python\nd = {\"a\": 1}\nprint(d.___('b', 'N/A'))\n```",
      answer: "get",
      explanation: "get(cheie, default) returnează valoarea dacă cheia există, altfel default."
    },
    {
      difficulty: "medium", name: "Iterare chei",
      question: "Completează pentru a itera cheile dicționarului:\n```python\nfor cheie in d.___():\n    print(cheie)\n```",
      answer: "keys",
      explanation: "keys() returnează un view cu toate cheile dicționarului."
    },
    {
      difficulty: "hard", name: "Items",
      question: "Completează pentru a itera perechi cheie-valoare:\n```python\nfor k, v in d.___():\n    print(f\"{k}: {v}\")\n```",
      answer: "items",
      explanation: "items() returnează un view cu tupluri (cheie, valoare) pentru fiecare intrare."
    },
  ],
  codings: [
    {
      difficulty: "easy", name: "Inventar",
      question: "Afișează stocul unui produs:\n```\n5\n```",
      starterCode: "inventar = {\"mere\": 5, \"pere\": 3}\nprint(inventar[\"mere\"])\n",
      expectedOutput: "5",
      language: "python"
    },
    {
      difficulty: "easy", name: "Numărare apariții",
      question: "Numără aparițiile fiecărei litere din 'aabbca':\n```\na: 3\nb: 2\nc: 1\n```",
      starterCode: "s = \"aabbca\"\ncontoare = {}\nfor ch in s:\n    # TODO: incrementează contorul\n    pass\nfor k in sorted(contoare):\n    print(f\"{k}: {contoare[k]}\")\n",
      expectedOutput: "a: 3\nb: 2\nc: 1",
      language: "python"
    },
    {
      difficulty: "medium", name: "Merge dictionare",
      question: "Combină două dicționare și afișează rezultatul sortat:\n```\na: 1\nb: 2\nc: 3\n```",
      starterCode: "d1 = {\"a\": 1, \"b\": 2}\nd2 = {\"c\": 3}\nrezultat = {**d1, **d2}\nfor k in sorted(rezultat):\n    print(f\"{k}: {rezultat[k]}\")\n",
      expectedOutput: "a: 1\nb: 2\nc: 3",
      language: "python"
    },
    {
      difficulty: "medium", name: "Inversare dict",
      question: "Inversează un dicționar (valori devin chei):\n```\n1: a\n2: b\n3: c\n```",
      starterCode: "d = {\"a\": 1, \"b\": 2, \"c\": 3}\ninversat = {v: k for k, v in d.items()}\nfor k in sorted(inversat):\n    print(f\"{k}: {inversat[k]}\")\n",
      expectedOutput: "1: a\n2: b\n3: c",
      language: "python"
    },
    {
      difficulty: "hard", name: "Grupare",
      question: "Grupează numerele [1,2,3,4,5,6] în pare și impare:\n```\nimpare: [1, 3, 5]\npare: [2, 4, 6]\n```",
      starterCode: "numere = [1, 2, 3, 4, 5, 6]\ngrupuri = {\"pare\": [], \"impare\": []}\n# TODO: grupează\nprint(f\"impare: {grupuri['impare']}\")\nprint(f\"pare: {grupuri['pare']}\")\n",
      expectedOutput: "impare: [1, 3, 5]\npare: [2, 4, 6]",
      language: "python"
    },
  ]
};

TOPICS["python::functii"] = {
  fillblanks: [
    {
      difficulty: "easy", name: "Definire funcție",
      question: "Completează cuvântul cheie pentru a defini o funcție:\n```python\n___ salut(nume):\n    print(f\"Bună, {nume}!\")\n```",
      answer: "def",
      explanation: "def este cuvântul cheie Python pentru definirea funcțiilor."
    },
    {
      difficulty: "easy", name: "Return",
      question: "Completează pentru a returna suma:\n```python\ndef suma(a, b):\n    ___ a + b\n```",
      answer: "return",
      explanation: "return specifică valoarea returnată de funcție."
    },
    {
      difficulty: "medium", name: "Parametru implicit",
      question: "Completează cu valoarea implicită:\n```python\ndef salut(nume, prefix___\"Dr.\"):\n    print(f\"{prefix} {nume}\")\n```",
      answer: "=",
      explanation: "Parametrii cu valori implicite se definesc cu = în semnătura funcției."
    },
    {
      difficulty: "medium", name: "Args variabili",
      question: "Completează pentru parametri variabili:\n```python\ndef suma(___numere):\n    return sum(numere)\n```",
      answer: "*",
      explanation: "*args colectează argumente poziționale suplimentare într-un tuplu."
    },
    {
      difficulty: "hard", name: "Kwargs",
      question: "Completează pentru parametri keyword variabili:\n```python\ndef afiseaza(___info):\n    for k, v in info.items():\n        print(f\"{k}={v}\")\n```",
      answer: "**",
      explanation: "**kwargs colectează argumente keyword suplimentare într-un dicționar."
    },
  ],
  codings: [
    {
      difficulty: "easy", name: "Funcție salut",
      question: "Creează funcția `salut(nume)` și apeleaz-o cu 'Maria':\n```\nBuna ziua, Maria!\n```",
      starterCode: "def salut(nume):\n    # TODO: afișează salutul\n    pass\n\nsalut(\"Maria\")\n",
      expectedOutput: "Buna ziua, Maria!",
      language: "python"
    },
    {
      difficulty: "easy", name: "Funcție matematică",
      question: "Funcție care returnează aria unui dreptunghi:\n```\n20\n```",
      starterCode: "def arie_dreptunghi(l, h):\n    # TODO: returnează l * h\n    pass\n\nprint(arie_dreptunghi(4, 5))\n",
      expectedOutput: "20",
      language: "python"
    },
    {
      difficulty: "medium", name: "Factorial",
      question: "Funcție recursivă pentru factorial(5):\n```\n120\n```",
      starterCode: "def factorial(n):\n    if n <= 1:\n        return 1\n    # TODO: returnează n * factorial(n-1)\n    pass\n\nprint(factorial(5))\n",
      expectedOutput: "120",
      language: "python"
    },
    {
      difficulty: "medium", name: "Filtrare cu funcție",
      question: "Funcție care filtrează numerele pare din listă:\n```\n[2, 4, 6]\n```",
      starterCode: "def filtrare_pare(lst):\n    # TODO: returnează lista numerelor pare\n    pass\n\nprint(filtrare_pare([1, 2, 3, 4, 5, 6]))\n",
      expectedOutput: "[2, 4, 6]",
      language: "python"
    },
    {
      difficulty: "hard", name: "Fibonacci",
      question: "Funcție care returnează al n-lea număr Fibonacci. fibonacci(7):\n```\n13\n```",
      starterCode: "def fibonacci(n):\n    if n <= 1:\n        return n\n    # TODO: returnează fibonacci(n-1) + fibonacci(n-2)\n    pass\n\nprint(fibonacci(7))\n",
      expectedOutput: "13",
      language: "python"
    },
  ]
};

TOPICS["python::oop"] = {
  fillblanks: [
    {
      difficulty: "easy", name: "Definire clasă",
      question: "Completează cuvântul cheie pentru clasă:\n```python\n___ Animal:\n    pass\n```",
      answer: "class",
      explanation: "class este cuvântul cheie Python pentru definirea claselor."
    },
    {
      difficulty: "easy", name: "Constructor",
      question: "Completează metoda constructor:\n```python\nclass Masina:\n    def ___(self, marca):\n        self.marca = marca\n```",
      answer: "__init__",
      explanation: "__init__ este constructorul clasei, apelat automat la crearea unui obiect."
    },
    {
      difficulty: "medium", name: "Self",
      question: "Completează primul parametru al metodei:\n```python\nclass Cerc:\n    def __init__(___, raza):\n        self.raza = raza\n```",
      answer: "self",
      explanation: "self referă instanța curentă a clasei și este primul parametru al metodelor."
    },
    {
      difficulty: "medium", name: "Creare obiect",
      question: "Completează pentru a crea o instanță a clasei Masina:\n```python\nm = ___(\"BMW\")\n```",
      answer: "Masina",
      explanation: "Obiectele se creează apelând clasa ca pe o funcție."
    },
    {
      difficulty: "hard", name: "Str dunder",
      question: "Completează metoda pentru reprezentarea ca string:\n```python\nclass Punct:\n    def ___(self):\n        return f\"({self.x}, {self.y})\"\n```",
      answer: "__str__",
      explanation: "__str__ definește cum se afișează obiectul cu print() sau str()."
    },
  ],
  codings: [
    {
      difficulty: "easy", name: "Clasă simplă",
      question: "Creează un obiect Masina cu marca 'Dacia' și afișează marca:\n```\nDacia\n```",
      starterCode: "class Masina:\n    def __init__(self, marca):\n        self.marca = marca\n\nm = Masina(\"Dacia\")\n# TODO: afișează m.marca\n",
      expectedOutput: "Dacia",
      language: "python"
    },
    {
      difficulty: "easy", name: "Metodă de calcul",
      question: "Adaugă metoda `arie()` clasei Dreptunghi:\n```\n15\n```",
      starterCode: "class Dreptunghi:\n    def __init__(self, l, h):\n        self.l = l\n        self.h = h\n    \n    def arie(self):\n        # TODO: returnează l * h\n        pass\n\nd = Dreptunghi(3, 5)\nprint(d.arie())\n",
      expectedOutput: "15",
      language: "python"
    },
    {
      difficulty: "medium", name: "Cont bancar",
      question: "Cont cu depozit/retragere. Balanță inițială 100, depune 50, retrage 30:\n```\n120\n```",
      starterCode: "class Cont:\n    def __init__(self, sold):\n        self.sold = sold\n    \n    def depune(self, suma):\n        self.sold += suma\n    \n    def retrage(self, suma):\n        # TODO: scade suma\n        pass\n\nc = Cont(100)\nc.depune(50)\nc.retrage(30)\nprint(c.sold)\n",
      expectedOutput: "120",
      language: "python"
    },
    {
      difficulty: "medium", name: "Repr obiect",
      question: "Afișează obiectul Punct cu __str__:\n```\nPunct(3, 4)\n```",
      starterCode: "class Punct:\n    def __init__(self, x, y):\n        self.x = x\n        self.y = y\n    \n    def __str__(self):\n        # TODO: returnează string-ul formatat\n        pass\n\np = Punct(3, 4)\nprint(p)\n",
      expectedOutput: "Punct(3, 4)",
      language: "python"
    },
    {
      difficulty: "hard", name: "Stack cu OOP",
      question: "Implementează Stack: push(5), push(3), pop() afișează:\n```\n3\n[5]\n```",
      starterCode: "class Stack:\n    def __init__(self):\n        self.elemente = []\n    \n    def push(self, val):\n        self.elemente.append(val)\n    \n    def pop(self):\n        # TODO: returnează și elimină ultimul element\n        pass\n\ns = Stack()\ns.push(5)\ns.push(3)\nprint(s.pop())\nprint(s.elemente)\n",
      expectedOutput: "3\n[5]",
      language: "python"
    },
  ]
};

TOPICS["python::mostenire"] = {
  fillblanks: [
    {
      difficulty: "easy", name: "Moștenire",
      question: "Completează pentru ca Câine să moștenească Animal:\n```python\nclass Animal:\n    pass\n\nclass Caine(___):\n    pass\n```",
      answer: "Animal",
      explanation: "Moștenirea se specifică punând clasa părinte în paranteze la definire."
    },
    {
      difficulty: "easy", name: "Super",
      question: "Completează pentru a apela constructorul părintelui:\n```python\nclass Caine(Animal):\n    def __init__(self, rasa):\n        ___().__init__()\n        self.rasa = rasa\n```",
      answer: "super",
      explanation: "super() returnează un proxy către clasa părinte, permițând apelarea metodelor acesteia."
    },
    {
      difficulty: "medium", name: "Suprascriere metodă",
      question: "Completează pentru a suprascrie metoda `sunet()`:\n```python\nclass Pisica(Animal):\n    def ___(self):\n        return \"Miau\"\n```",
      answer: "sunet",
      explanation: "Suprascrierea (override) se face prin redefinirea metodei cu același nume în subclasă."
    },
    {
      difficulty: "medium", name: "Isinstance",
      question: "Completează pentru a verifica tipul obiectului:\n```python\nc = Caine()\nprint(___(c, Animal))  # True\n```",
      answer: "isinstance",
      explanation: "isinstance(obj, cls) verifică dacă obj este o instanță a clasei cls sau a unei subclase."
    },
    {
      difficulty: "hard", name: "MRO",
      question: "Ce se afișează?\n```python\nclass A:\n    def metoda(self):\n        return \"A\"\nclass B(A):\n    def metoda(self):\n        return \"B\"\nb = B()\nprint(b.metoda())\n```\nRăspuns: `___`",
      answer: "B",
      explanation: "Python folosește MRO (Method Resolution Order); subclasa B suprascrie metoda din A."
    },
  ],
  codings: [
    {
      difficulty: "easy", name: "Moștenire de bază",
      question: "Pisica moștenește Animal și afișează sunetul:\n```\nMiau\n```",
      starterCode: "class Animal:\n    def sunet(self):\n        return \"...\"\n\nclass Pisica(Animal):\n    def sunet(self):\n        # TODO: returnează 'Miau'\n        pass\n\np = Pisica()\nprint(p.sunet())\n",
      expectedOutput: "Miau",
      language: "python"
    },
    {
      difficulty: "medium", name: "Polimorfism",
      question: "Afișează sunetele a diferite animale:\n```\nHam\nMiau\nMuu\n```",
      starterCode: "class Animal:\n    def sunet(self): return \"\"\n\nclass Caine(Animal):\n    def sunet(self): return \"Ham\"\n\nclass Pisica(Animal):\n    def sunet(self): return \"Miau\"\n\nclass Vaca(Animal):\n    def sunet(self): return \"Muu\"\n\nanimale = [Caine(), Pisica(), Vaca()]\n# TODO: iterează și afișează sunetul\n",
      expectedOutput: "Ham\nMiau\nMuu",
      language: "python"
    },
    {
      difficulty: "medium", name: "Super în constructor",
      question: "Angajat moștenește Persoana; afișează info complet:\n```\nIon, 30, Python\n```",
      starterCode: "class Persoana:\n    def __init__(self, nume, varsta):\n        self.nume = nume\n        self.varsta = varsta\n\nclass Angajat(Persoana):\n    def __init__(self, nume, varsta, skills):\n        super().__init__(nume, varsta)\n        self.skills = skills\n\na = Angajat(\"Ion\", 30, \"Python\")\nprint(f\"{a.nume}, {a.varsta}, {a.skills}\")\n",
      expectedOutput: "Ion, 30, Python",
      language: "python"
    },
    {
      difficulty: "hard", name: "Metodă abstractă",
      question: "Implementează forma abstractă cu arie:\n```\n78.5\n```",
      starterCode: "from abc import ABC, abstractmethod\nimport math\n\nclass Forma(ABC):\n    @abstractmethod\n    def arie(self):\n        pass\n\nclass Cerc(Forma):\n    def __init__(self, raza):\n        self.raza = raza\n    \n    def arie(self):\n        # TODO: returnează math.pi * raza^2, rotunjit la 1 zecimală\n        pass\n\nc = Cerc(5)\nprint(round(c.arie(), 1))\n",
      expectedOutput: "78.5",
      language: "python"
    },
    {
      difficulty: "hard", name: "Clasă Figuri",
      question: "Dreptunghi și Pătrat (subclasă), aria lui Pătrat(4):\n```\n16\n```",
      starterCode: "class Dreptunghi:\n    def __init__(self, l, h):\n        self.l = l\n        self.h = h\n    def arie(self):\n        return self.l * self.h\n\nclass Patrat(Dreptunghi):\n    def __init__(self, latura):\n        # TODO: apelează super cu latura, latura\n        pass\n\np = Patrat(4)\nprint(p.arie())\n",
      expectedOutput: "16",
      language: "python"
    },
  ]
};

TOPICS["python::comprehensions"] = {
  fillblanks: [
    {
      difficulty: "easy", name: "List comprehension",
      question: "Completează list comprehension pentru pătratele 1-5:\n```python\npatrate = [x**2 ___ x in range(1, 6)]\n```",
      answer: "for",
      explanation: "Sintaxa list comprehension: [expresie for variabila in iterabil]."
    },
    {
      difficulty: "medium", name: "Comprehension cu filtru",
      question: "Completează pentru a filtra numerele pare:\n```python\nL = [1,2,3,4,5,6]\nimpare = [x for x in L ___ x % 2 != 0]\n```",
      answer: "if",
      explanation: "Condiția if în comprehension filtrează elementele."
    },
    {
      difficulty: "medium", name: "Dict comprehension",
      question: "Completează dict comprehension:\n```python\npatrate = {x: x**2 ___ x in range(1, 4)}\n```",
      answer: "for",
      explanation: "Dict comprehension: {cheie: valoare for variabila in iterabil}."
    },
    {
      difficulty: "hard", name: "Set comprehension",
      question: "Completează pentru a crea un set de litere unice:\n```python\ntext = \"hello\"\nLitere = {___ for ch in text}\n```",
      answer: "ch",
      explanation: "Set comprehension: {expresie for variabila in iterabil}; elimină duplicatele automat."
    },
    {
      difficulty: "hard", name: "Generator expression",
      question: "Completează pentru un generator (în loc de listă):\n```python\ntotal = sum(___ for x in range(10))\n```",
      answer: "x",
      explanation: "Generator expressions sunt ca list comprehensions dar cu paranteze; sunt lazy (nu creează lista în memorie)."
    },
  ],
  codings: [
    {
      difficulty: "easy", name: "Pătrate",
      question: "Creează lista pătratelor 1-6 cu comprehension:\n```\n[1, 4, 9, 16, 25, 36]\n```",
      starterCode: "# TODO: list comprehension\npatrate = []\nprint(patrate)\n",
      expectedOutput: "[1, 4, 9, 16, 25, 36]",
      language: "python"
    },
    {
      difficulty: "medium", name: "Filtrare",
      question: "Filtrează stringurile mai lungi de 3 caractere:\n```\n['mere', 'prune']\n```",
      starterCode: "fructe = [\"mar\", \"mere\", \"par\", \"prune\"]\n# TODO: comprehension cu filtru\nresult = []\nprint(result)\n",
      expectedOutput: "['mere', 'prune']",
      language: "python"
    },
    {
      difficulty: "medium", name: "Dict comprehension",
      question: "Creează dict {litera: index} pentru 'abc':\n```\n{'a': 0, 'b': 1, 'c': 2}\n```",
      starterCode: "s = \"abc\"\n# TODO: dict comprehension cu enumerate\nd = {}\nprint(d)\n",
      expectedOutput: "{'a': 0, 'b': 1, 'c': 2}",
      language: "python"
    },
    {
      difficulty: "hard", name: "Aplatizare",
      question: "Aplatizează [[1,2],[3,4],[5,6]] cu comprehension:\n```\n[1, 2, 3, 4, 5, 6]\n```",
      starterCode: "matrice = [[1,2],[3,4],[5,6]]\n# TODO: comprehension nested\naplat = []\nprint(aplat)\n",
      expectedOutput: "[1, 2, 3, 4, 5, 6]",
      language: "python"
    },
    {
      difficulty: "hard", name: "Transformare",
      question: "Construiește dict {n: n^3} pentru n de la 1 la 5:\n```\n{1: 1, 2: 8, 3: 27, 4: 64, 5: 125}\n```",
      starterCode: "# TODO: dict comprehension\ncuburi = {}\nprint(cuburi)\n",
      expectedOutput: "{1: 1, 2: 8, 3: 27, 4: 64, 5: 125}",
      language: "python"
    },
  ]
};

TOPICS["python::lambda"] = {
  fillblanks: [
    {
      difficulty: "easy", name: "Lambda de bază",
      question: "Completează funcția lambda:\n```python\ndublu = ___ x: x * 2\nprint(dublu(5))  # 10\n```",
      answer: "lambda",
      explanation: "lambda definește funcții anonime: lambda parametri: expresie."
    },
    {
      difficulty: "medium", name: "Sorted cu lambda",
      question: "Completează pentru a sorta după al doilea element:\n```python\nL = [(1,3),(2,1),(3,2)]\nsortat = sorted(L, key=___ x: x[1])\n```",
      answer: "lambda",
      explanation: "Parametrul key al sorted() acceptă o funcție aplicată fiecărui element pentru comparare."
    },
    {
      difficulty: "medium", name: "Map cu lambda",
      question: "Completează pentru a aplica lambda la fiecare element:\n```python\nL = [1, 2, 3]\npatrate = list(___(lambda x: x**2, L))\n```",
      answer: "map",
      explanation: "map(functie, iterabil) aplică funcția la fiecare element și returnează un iterator."
    },
    {
      difficulty: "hard", name: "Filter cu lambda",
      question: "Completează pentru filtrare:\n```python\nL = [1,2,3,4,5]\nimpare = list(___(lambda x: x%2!=0, L))\n```",
      answer: "filter",
      explanation: "filter(functie, iterabil) păstrează elementele pentru care funcția returnează True."
    },
    {
      difficulty: "hard", name: "Reduce",
      question: "Completează pentru a reduce lista la produs:\n```python\nfrom functools import reduce\nL = [1,2,3,4]\nprodus = reduce(___ a,b: a*b, L)\n```",
      answer: "lambda",
      explanation: "reduce() aplică o funcție cumulativ la elementele iterabilului, returnând o singură valoare."
    },
  ],
  codings: [
    {
      difficulty: "easy", name: "Lambda simplu",
      question: "Creează lambda care pătratează un număr, aplic pe 7:\n```\n49\n```",
      starterCode: "patrat = lambda x: x ** 2\nprint(patrat(7))\n",
      expectedOutput: "49",
      language: "python"
    },
    {
      difficulty: "medium", name: "Sortare personalizată",
      question: "Sortează cuvintele după lungime:\n```\n['mar', 'para', 'prune']\n```",
      starterCode: "cuvinte = [\"prune\", \"mar\", \"para\"]\nsortat = sorted(cuvinte, key=lambda x: len(x))\nprint(sortat)\n",
      expectedOutput: "['mar', 'para', 'prune']",
      language: "python"
    },
    {
      difficulty: "medium", name: "Map",
      question: "Aplică map+lambda pentru a converti gradele C la F (C*9/5+32):\n```\n[32.0, 212.0, 98.6]\n```",
      starterCode: "celsius = [0, 100, 37]\nfahrenheit = list(map(lambda c: c * 9/5 + 32, celsius))\nprint(fahrenheit)\n",
      expectedOutput: "[32.0, 212.0, 98.6]",
      language: "python"
    },
    {
      difficulty: "hard", name: "Filter și map",
      question: "Filtrează numerele pare din 1-10 și dublează-le:\n```\n[4, 8, 12, 16, 20]\n```",
      starterCode: "L = list(range(1, 11))\nrezultat = list(map(lambda x: x*2, filter(lambda x: x%2==0, L)))\nprint(rezultat)\n",
      expectedOutput: "[4, 8, 12, 16, 20]",
      language: "python"
    },
    {
      difficulty: "hard", name: "Reduce produs",
      question: "Calculează produsul elementelor [1,2,3,4,5] cu reduce:\n```\n120\n```",
      starterCode: "from functools import reduce\nL = [1, 2, 3, 4, 5]\nprodus = reduce(lambda a, b: a * b, L)\nprint(produs)\n",
      expectedOutput: "120",
      language: "python"
    },
  ]
};

TOPICS["python::erori"] = {
  fillblanks: [
    {
      difficulty: "easy", name: "Try/except",
      question: "Completează pentru a prinde eroarea:\n```python\n___:\n    x = 1 / 0\nexcept ZeroDivisionError:\n    print(\"Eroare!\")\n```",
      answer: "try",
      explanation: "try/except prinde excepțiile. Codul riscant se pune în blocul try."
    },
    {
      difficulty: "easy", name: "Finally",
      question: "Completează pentru blocul ce se execută mereu:\n```python\ntry:\n    f = open(\"x.txt\")\n___ :\n    print(\"gata\")\n```",
      answer: "finally",
      explanation: "finally se execută indiferent dacă a apărut sau nu o excepție."
    },
    {
      difficulty: "medium", name: "Raise",
      question: "Completează pentru a arunca o excepție:\n```python\ndef divide(a, b):\n    if b == 0:\n        ___ ValueError(\"Împărțire la zero!\")\n    return a / b\n```",
      answer: "raise",
      explanation: "raise aruncă o excepție; poate fi folosit cu orice tip de excepție."
    },
    {
      difficulty: "medium", name: "Except cu variabilă",
      question: "Completează pentru a captura mesajul erorii:\n```python\ntry:\n    int(\"abc\")\nexcept ValueError ___ e:\n    print(e)\n```",
      answer: "as",
      explanation: "except TipEroare as e capturează instanța excepției în variabila e."
    },
    {
      difficulty: "hard", name: "Excepție personalizată",
      question: "Completează pentru a defini excepție proprie:\n```python\nclass VarstaInvalida(___): \n    pass\n```",
      answer: "Exception",
      explanation: "Excepțiile personalizate moștenesc din Exception sau alte clase de excepții built-in."
    },
  ],
  codings: [
    {
      difficulty: "easy", name: "Try/except simplu",
      question: "Prinde eroarea de împărțire la zero și afișează:\n```\nNu se poate imparti la zero\n```",
      starterCode: "try:\n    rezultat = 10 / 0\nexcept ZeroDivisionError:\n    # TODO: afișează mesajul\n    pass\n",
      expectedOutput: "Nu se poate imparti la zero",
      language: "python"
    },
    {
      difficulty: "medium", name: "Validare input",
      question: "Prinde ValueError la conversia unui string non-numeric:\n```\nInput invalid: numar intreg cerut\n```",
      starterCode: "try:\n    n = int(\"abc\")\nexcept ValueError:\n    # TODO: afișează mesajul\n    pass\n",
      expectedOutput: "Input invalid: numar intreg cerut",
      language: "python"
    },
    {
      difficulty: "medium", name: "Multiple excepții",
      question: "Prinde IndexError și afișează:\n```\nIndice in afara limitelor\n```",
      starterCode: "L = [1, 2, 3]\ntry:\n    print(L[10])\nexcept IndexError:\n    # TODO\n    pass\n",
      expectedOutput: "Indice in afara limitelor",
      language: "python"
    },
    {
      difficulty: "hard", name: "Excepție proprie",
      question: "Aruncă VarstaInvalida dacă vârsta < 0; afișează mesajul:\n```\nVarsta nu poate fi negativa\n```",
      starterCode: "class VarstaInvalida(Exception):\n    pass\n\ndef seteaza_varsta(v):\n    if v < 0:\n        raise VarstaInvalida(\"Varsta nu poate fi negativa\")\n    return v\n\ntry:\n    seteaza_varsta(-5)\nexcept VarstaInvalida as e:\n    print(e)\n",
      expectedOutput: "Varsta nu poate fi negativa",
      language: "python"
    },
    {
      difficulty: "hard", name: "Context manager",
      question: "Deschide un fișier inexistent cu try/except/finally:\n```\nFisierul nu exista\nInchis\n```",
      starterCode: "try:\n    f = open(\"inexistent.txt\")\nexcept FileNotFoundError:\n    print(\"Fisierul nu exista\")\nfinally:\n    # TODO: afișează 'Inchis'\n    pass\n",
      expectedOutput: "Fisierul nu exista\nInchis",
      language: "python"
    },
  ]
};

// ─────────────────────────────────────────────
// JAVASCRIPT TOPICS
// ─────────────────────────────────────────────

TOPICS["javascript::variabile"] = {
  fillblanks: [
    {
      difficulty: "easy", name: "Let vs const",
      question: "Completează pentru variabilă care NU poate fi reatribuită:\n```js\n___ PI = 3.14;\n```",
      answer: "const",
      explanation: "const declară variabile imutabile (nu pot fi reatribuite)."
    },
    {
      difficulty: "easy", name: "Tipul undefined",
      question: "Ce returnează typeof pentru variabilă nedeclarată?\n```js\nconsole.log(typeof x); // ___\n```",
      answer: "undefined",
      explanation: "Accesarea unei variabile nedeclarate cu typeof returnează 'undefined' (nu aruncă eroare)."
    },
    {
      difficulty: "medium", name: "Template literal",
      question: "Completează template literal:\n```js\nconst name = \"Ana\";\nconsole.log(___`Salut, ${name}!`);\n```",
      answer: "",
      explanation: "Template literals folosesc backticks (`) și ${} pentru interpolarea variabilelor."
    },
    {
      difficulty: "medium", name: "Destructuring",
      question: "Completează destructuring-ul:\n```js\nconst { ___, y } = { x: 1, y: 2 };\nconsole.log(x); // 1\n```",
      answer: "x",
      explanation: "Object destructuring extrage proprietățile unui obiect în variabile locale."
    },
    {
      difficulty: "hard", name: "Spread operator",
      question: "Completează pentru a clona și extinde array-ul:\n```js\nconst a = [1, 2];\nconst b = [...___, 3, 4];\n```",
      answer: "a",
      explanation: "Operatorul spread (...) extinde elementele unui iterabil."
    },
  ],
  codings: [
    {
      difficulty: "easy", name: "Declarare variabile",
      question: "Declară `varsta = 25` cu let și afișeaz-o:\n```\n25\n```",
      starterCode: "// TODO: declară și afișează\n",
      expectedOutput: "25",
      language: "javascript"
    },
    {
      difficulty: "easy", name: "Tip de date",
      question: "Afișează tipul valorii `true`:\n```\nboolean\n```",
      starterCode: "const val = true;\nconsole.log(typeof val);\n",
      expectedOutput: "boolean",
      language: "javascript"
    },
    {
      difficulty: "medium", name: "Destructuring array",
      question: "Destructurează `[10, 20, 30]` și afișează primul și al treilea:\n```\n10\n30\n```",
      starterCode: "const arr = [10, 20, 30];\nconst [primul, , alTreilea] = arr;\nconsole.log(primul);\nconsole.log(alTreilea);\n",
      expectedOutput: "10\n30",
      language: "javascript"
    },
    {
      difficulty: "medium", name: "Template literals",
      question: "Afișează mesajul cu template literal:\n```\nAna are 25 de ani\n```",
      starterCode: "const nume = \"Ana\";\nconst varsta = 25;\n// TODO: console.log cu template literal\n",
      expectedOutput: "Ana are 25 de ani",
      language: "javascript"
    },
    {
      difficulty: "hard", name: "Spread și rest",
      question: "Combină [1,2] și [3,4] cu spread:\n```\n[ 1, 2, 3, 4 ]\n```",
      starterCode: "const a = [1, 2];\nconst b = [3, 4];\nconst combinat = [...a, ...b];\nconsole.log(combinat);\n",
      expectedOutput: "[ 1, 2, 3, 4 ]",
      language: "javascript"
    },
  ]
};

TOPICS["javascript::functii"] = {
  fillblanks: [
    {
      difficulty: "easy", name: "Arrow function",
      question: "Completează arrow function:\n```js\nconst dublu = x ___ x * 2;\nconsole.log(dublu(5)); // 10\n```",
      answer: "=>",
      explanation: "Arrow functions folosesc => între parametri și corp."
    },
    {
      difficulty: "easy", name: "Default param",
      question: "Completează parametrul implicit:\n```js\nfunction salut(nume = ___) {\n  return `Salut, ${nume}!`;\n}\n```",
      answer: "\"Lume\"",
      explanation: "Parametrii cu valori implicite se specifică cu = în semnătura funcției."
    },
    {
      difficulty: "medium", name: "Funcție HOF",
      question: "Completează pentru o funcție ce returnează altă funcție:\n```js\nfunction multiplica(x) {\n  ___ (y) => x * y;\n}\n```",
      answer: "return",
      explanation: "Higher-order functions returnează sau primesc funcții; return este necesar în corp cu {}."
    },
    {
      difficulty: "medium", name: "Callback",
      question: "Completează pentru a pasa funcția ca argument:\n```js\n[1,2,3].forEach(___ n => console.log(n));\n```",
      answer: "",
      explanation: "Callback-urile sunt funcții pasate ca argumente; arrow functions fără parametri se scriu x=>..."
    },
    {
      difficulty: "hard", name: "Closure",
      question: "Ce afișează?\n```js\nfunction contor() {\n  let n = 0;\n  return () => ++n;\n}\nconst c = contor();\nconsole.log(c()); console.log(c());\n```\nRăspuns: `___`",
      answer: "1\n2",
      explanation: "Closure-ul reține referința la n din scope-ul exterior; fiecare apel incrementează aceeași variabilă."
    },
  ],
  codings: [
    {
      difficulty: "easy", name: "Arrow function",
      question: "Declară arrow function `patrat(n)` și apeleaz-o cu 6:\n```\n36\n```",
      starterCode: "const patrat = n => n * n;\nconsole.log(patrat(6));\n",
      expectedOutput: "36",
      language: "javascript"
    },
    {
      difficulty: "easy", name: "Funcție cu default",
      question: "Funcție salut cu default 'Lume', apel fără argument:\n```\nSalut, Lume!\n```",
      starterCode: "function salut(nume = \"Lume\") {\n  return `Salut, ${nume}!`;\n}\nconsole.log(salut());\n",
      expectedOutput: "Salut, Lume!",
      language: "javascript"
    },
    {
      difficulty: "medium", name: "Higher-order function",
      question: "Creează funcție `aplicaDe(n, f, x)` ce aplică f de n ori pe x. aplicaDe(3, x=>x*2, 1):\n```\n8\n```",
      starterCode: "function aplicaDe(n, f, x) {\n  for (let i = 0; i < n; i++) x = f(x);\n  return x;\n}\nconsole.log(aplicaDe(3, x => x * 2, 1));\n",
      expectedOutput: "8",
      language: "javascript"
    },
    {
      difficulty: "medium", name: "Closure contor",
      question: "Creează contor cu closure și apeleaz-l de 3 ori:\n```\n1\n2\n3\n```",
      starterCode: "function contor() {\n  let n = 0;\n  return () => ++n;\n}\nconst c = contor();\nconsole.log(c());\nconsole.log(c());\nconsole.log(c());\n",
      expectedOutput: "1\n2\n3",
      language: "javascript"
    },
    {
      difficulty: "hard", name: "Memoizare",
      question: "Implementează memoize simplu pentru funcția patrat:\n```\n25\n25\n```",
      starterCode: "function memoize(fn) {\n  const cache = {};\n  return function(x) {\n    if (cache[x] !== undefined) return cache[x];\n    cache[x] = fn(x);\n    return cache[x];\n  };\n}\nconst patrat = memoize(x => x * x);\nconsole.log(patrat(5));\nconsole.log(patrat(5));\n",
      expectedOutput: "25\n25",
      language: "javascript"
    },
  ]
};

TOPICS["javascript::array"] = {
  fillblanks: [
    {
      difficulty: "easy", name: "Map",
      question: "Completează pentru a dubla fiecare element:\n```js\nconst result = [1,2,3].___(x => x * 2);\n```",
      answer: "map",
      explanation: "map() aplică o funcție la fiecare element și returnează un array nou."
    },
    {
      difficulty: "easy", name: "Filter",
      question: "Completează pentru a păstra elementele > 2:\n```js\nconst result = [1,2,3,4].___(x => x > 2);\n```",
      answer: "filter",
      explanation: "filter() returnează un array nou cu elementele pentru care callback-ul returnează true."
    },
    {
      difficulty: "medium", name: "Reduce",
      question: "Completează pentru suma elementelor:\n```js\nconst sum = [1,2,3,4].___(( acc, x) => acc + x, 0);\n```",
      answer: "reduce",
      explanation: "reduce() reduce array-ul la o singură valoare aplicând cumulativ funcția."
    },
    {
      difficulty: "medium", name: "Find",
      question: "Completează pentru a găsi primul element > 3:\n```js\nconst el = [1,2,3,4,5].___(x => x > 3);\n```",
      answer: "find",
      explanation: "find() returnează primul element pentru care callback-ul returnează true, sau undefined."
    },
    {
      difficulty: "hard", name: "FlatMap",
      question: "Completează pentru a aplana și transforma:\n```js\nconst result = [[1,2],[3,4]].___(x => x.map(n => n*2));\n```",
      answer: "flatMap",
      explanation: "flatMap() aplică map() și aplanează rezultatul un nivel."
    },
  ],
  codings: [
    {
      difficulty: "easy", name: "Map dublo",
      question: "Dublează elementele [1,2,3,4,5]:\n```\n[ 2, 4, 6, 8, 10 ]\n```",
      starterCode: "const arr = [1, 2, 3, 4, 5];\nconst dublu = arr.map(x => x * 2);\nconsole.log(dublu);\n",
      expectedOutput: "[ 2, 4, 6, 8, 10 ]",
      language: "javascript"
    },
    {
      difficulty: "easy", name: "Filter pozitive",
      question: "Filtrează numerele pozitive din [-1, 2, -3, 4, -5]:\n```\n[ 2, 4 ]\n```",
      starterCode: "const arr = [-1, 2, -3, 4, -5];\nconst pozitive = arr.filter(x => x > 0);\nconsole.log(pozitive);\n",
      expectedOutput: "[ 2, 4 ]",
      language: "javascript"
    },
    {
      difficulty: "medium", name: "Reduce sumă",
      question: "Calculează suma [10, 20, 30, 40] cu reduce:\n```\n100\n```",
      starterCode: "const arr = [10, 20, 30, 40];\nconst suma = arr.reduce((acc, x) => acc + x, 0);\nconsole.log(suma);\n",
      expectedOutput: "100",
      language: "javascript"
    },
    {
      difficulty: "medium", name: "Chaining",
      question: "Filtrează pare din 1-10 și pătratează-le:\n```\n[ 4, 16, 36, 64, 100 ]\n```",
      starterCode: "const arr = [1,2,3,4,5,6,7,8,9,10];\nconst result = arr.filter(x => x % 2 === 0).map(x => x * x);\nconsole.log(result);\n",
      expectedOutput: "[ 4, 16, 36, 64, 100 ]",
      language: "javascript"
    },
    {
      difficulty: "hard", name: "Group by",
      question: "Grupează [1,2,3,4,5,6] în pare și impare cu reduce:\n```\n{ impare: [ 1, 3, 5 ], pare: [ 2, 4, 6 ] }\n```",
      starterCode: "const arr = [1,2,3,4,5,6];\nconst grupuri = arr.reduce((acc, x) => {\n  const key = x % 2 === 0 ? 'pare' : 'impare';\n  acc[key].push(x);\n  return acc;\n}, { impare: [], pare: [] });\nconsole.log(grupuri);\n",
      expectedOutput: "{ impare: [ 1, 3, 5 ], pare: [ 2, 4, 6 ] }",
      language: "javascript"
    },
  ]
};

TOPICS["javascript::obiecte"] = {
  fillblanks: [
    {
      difficulty: "easy", name: "Proprietăți",
      question: "Accesează proprietatea name cu dot notation:\n```js\nconst p = { name: \"Ana\", age: 25 };\nconsole.log(p.___);\n```",
      answer: "name",
      explanation: "Dot notation (obj.prop) accesează proprietățile obiectului."
    },
    {
      difficulty: "easy", name: "Shorthand properties",
      question: "Completează cu shorthand property:\n```js\nconst x = 5, y = 10;\nconst punct = {___, y};\n```",
      answer: "x",
      explanation: "Shorthand properties: dacă variabila și cheia au același nume, scriem doar numele odată."
    },
    {
      difficulty: "medium", name: "Object.keys",
      question: "Completează pentru a obține cheile obiectului:\n```js\nconst d = {a:1, b:2};\nconsole.log(Object.___( d));\n```",
      answer: "keys",
      explanation: "Object.keys() returnează un array cu cheile enumerabile ale obiectului."
    },
    {
      difficulty: "medium", name: "Spread obiect",
      question: "Completează pentru a clona și extinde un obiect:\n```js\nconst baza = {a: 1};\nconst ext = {...___, b: 2};\n```",
      answer: "baza",
      explanation: "Spread (...) copiază proprietățile unui obiect într-altul."
    },
    {
      difficulty: "hard", name: "Optional chaining",
      question: "Completează pentru a accesa în siguranță:\n```js\nconst u = { adresa: null };\nconsole.log(u.adresa___oras); // undefined\n```",
      answer: "?.",
      explanation: "Optional chaining (?.) returnează undefined dacă proprietatea intermediară este null/undefined."
    },
  ],
  codings: [
    {
      difficulty: "easy", name: "Creare obiect",
      question: "Creează obiect persoana cu name:'Ion' și age:30, afișează:\n```\nIon\n30\n```",
      starterCode: "const persoana = { name: \"Ion\", age: 30 };\nconsole.log(persoana.name);\nconsole.log(persoana.age);\n",
      expectedOutput: "Ion\n30",
      language: "javascript"
    },
    {
      difficulty: "easy", name: "Metode în obiect",
      question: "Adaugă metoda `salut()` care returnează salutarea:\n```\nSalut, Maria!\n```",
      starterCode: "const p = {\n  name: \"Maria\",\n  salut() {\n    return `Salut, ${this.name}!`;\n  }\n};\nconsole.log(p.salut());\n",
      expectedOutput: "Salut, Maria!",
      language: "javascript"
    },
    {
      difficulty: "medium", name: "Object.entries",
      question: "Afișează toate perechile cheie-valoare:\n```\na: 1\nb: 2\nc: 3\n```",
      starterCode: "const d = {a: 1, b: 2, c: 3};\nObject.entries(d).forEach(([k, v]) => console.log(`${k}: ${v}`));\n",
      expectedOutput: "a: 1\nb: 2\nc: 3",
      language: "javascript"
    },
    {
      difficulty: "medium", name: "Clonare cu spread",
      question: "Clonează obiectul și adaugă o proprietate nouă, afișează total:\n```\n25\n```",
      starterCode: "const original = { baza: 10, extra: 15 };\nconst clonat = { ...original };\nconsole.log(clonat.baza + clonat.extra);\n",
      expectedOutput: "25",
      language: "javascript"
    },
    {
      difficulty: "hard", name: "Deep merge",
      question: "Merge două obiecte nested și afișează valoarea:\n```\n3\n```",
      starterCode: "const a = { x: { val: 1 }, y: 2 };\nconst b = { x: { val: 3 } };\nconst merged = { ...a, ...b };\nconsole.log(merged.x.val);\n",
      expectedOutput: "3",
      language: "javascript"
    },
  ]
};

TOPICS["javascript::async"] = {
  fillblanks: [
    {
      difficulty: "easy", name: "Promise",
      question: "Completează pentru a crea un Promise:\n```js\nconst p = new ___(( resolve, reject) => {\n  resolve(42);\n});\n```",
      answer: "Promise",
      explanation: "Promise reprezintă o valoare care poate fi disponibilă acum, în viitor sau niciodată."
    },
    {
      difficulty: "medium", name: "Async/await",
      question: "Completează cuvântul cheie pentru funcție asincronă:\n```js\n___ function fetchDate() {\n  return await getData();\n}\n```",
      answer: "async",
      explanation: "async marchează o funcție ca asincronă și permite folosirea await în interiorul ei."
    },
    {
      difficulty: "medium", name: "Await",
      question: "Completează pentru a aștepta rezolvarea Promise-ului:\n```js\nasync function main() {\n  const data = ___ fetch('/api');\n}\n```",
      answer: "await",
      explanation: "await pauzează execuția funcției async până când Promise-ul se rezolvă."
    },
    {
      difficulty: "hard", name: "Promise.all",
      question: "Completează pentru a rula Promise-uri în paralel:\n```js\nconst [a, b] = await Promise.___([ p1, p2]);\n```",
      answer: "all",
      explanation: "Promise.all() rulează Promise-urile în paralel și așteaptă să se rezolve toate."
    },
    {
      difficulty: "hard", name: "Try/catch async",
      question: "Completează pentru a prinde erorile async:\n```js\nasync function main() {\n  try {\n    const data = await riskyOp();\n  } ___ (e) {\n    console.error(e);\n  }\n}\n```",
      answer: "catch",
      explanation: "În funcții async, erorile se prind cu try/catch la fel ca codul sincron."
    },
  ],
  codings: [
    {
      difficulty: "easy", name: "Promise rezolvat",
      question: "Creează un Promise care rezolvă 42 și afișează valoarea:\n```\n42\n```",
      starterCode: "const p = new Promise(resolve => resolve(42));\np.then(val => console.log(val));\n",
      expectedOutput: "42",
      language: "javascript"
    },
    {
      difficulty: "medium", name: "Async/await",
      question: "Funcție async care returnează 'date din server'; afișeaz-o:\n```\ndate din server\n```",
      starterCode: "async function getData() {\n  return \"date din server\";\n}\n\n(async () => {\n  const data = await getData();\n  console.log(data);\n})();\n",
      expectedOutput: "date din server",
      language: "javascript"
    },
    {
      difficulty: "medium", name: "Promise chain",
      question: "Înlănțuiește două then: dublează 5, apoi adaugă 3:\n```\n13\n```",
      starterCode: "Promise.resolve(5)\n  .then(x => x * 2)\n  .then(x => x + 3)\n  .then(x => console.log(x));\n",
      expectedOutput: "13",
      language: "javascript"
    },
    {
      difficulty: "hard", name: "Try/catch async",
      question: "Prinde eroarea dintr-un Promise respins:\n```\nEroare: ceva a mers rau\n```",
      starterCode: "async function riskyOp() {\n  throw new Error(\"ceva a mers rau\");\n}\n\n(async () => {\n  try {\n    await riskyOp();\n  } catch(e) {\n    console.log(`Eroare: ${e.message}`);\n  }\n})();\n",
      expectedOutput: "Eroare: ceva a mers rau",
      language: "javascript"
    },
    {
      difficulty: "hard", name: "Promise.all paralel",
      question: "Rulează două Promise-uri în paralel și afișează suma:\n```\n30\n```",
      starterCode: "const p1 = Promise.resolve(10);\nconst p2 = Promise.resolve(20);\n\n(async () => {\n  const [a, b] = await Promise.all([p1, p2]);\n  console.log(a + b);\n})();\n",
      expectedOutput: "30",
      language: "javascript"
    },
  ]
};

// ─────────────────────────────────────────────
// HTML TOPICS
// ─────────────────────────────────────────────

TOPICS["html::structura"] = {
  fillblanks: [
    {
      difficulty: "easy", name: "DOCTYPE",
      question: "Completează declarația DOCTYPE pentru HTML5:\n```html\n<!___ html>\n```",
      answer: "DOCTYPE",
      explanation: "DOCTYPE informează browser-ul despre versiunea HTML folosită."
    },
    {
      difficulty: "easy", name: "Titlul paginii",
      question: "Completează tag-ul pentru titlul din tab-ul browser-ului:\n```html\n<___>Pagina mea</___>\n```",
      answer: "title",
      explanation: "<title> definește titlul documentului afișat în tab-ul browser-ului."
    },
    {
      difficulty: "medium", name: "Charset",
      question: "Completează pentru codificarea UTF-8:\n```html\n<meta ___ =\"utf-8\">\n```",
      answer: "charset",
      explanation: "Atributul charset specifică codificarea caracterelor documentului."
    },
    {
      difficulty: "medium", name: "Viewport",
      question: "Completează atributul meta viewport:\n```html\n<meta name=\"___\" content=\"width=device-width, initial-scale=1\">\n```",
      answer: "viewport",
      explanation: "Meta viewport controlează dimensiunea și scalarea paginii pe dispozitive mobile."
    },
    {
      difficulty: "hard", name: "Semantic HTML",
      question: "Completează cu tag-ul semantic pentru conținut principal:\n```html\n<___>\n  <p>Conținut principal</p>\n</___>\n```",
      answer: "main",
      explanation: "<main> marchează conținutul principal unic al paginii, important pentru accesibilitate."
    },
  ],
  codings: [
    {
      difficulty: "easy", name: "Structura de bază",
      question: "Creează o pagină HTML minimă cu titlul 'Test'.",
      starterCode: "<!-- TODO: structura minimă HTML5 -->\n",
      expectedOutput: "",
      language: "html"
    },
    {
      difficulty: "easy", name: "Headings",
      question: "Adaugă un h1 cu textul 'Titlu Principal' și un h2 cu 'Subtitlu'.",
      starterCode: "<!DOCTYPE html>\n<html>\n<body>\n<!-- TODO -->\n</body>\n</html>\n",
      expectedOutput: "",
      language: "html"
    },
    {
      difficulty: "medium", name: "Link extern",
      question: "Adaugă un link <a> care deschide https://example.com în tab nou.",
      starterCode: "<!-- TODO: link cu target='_blank' -->\n",
      expectedOutput: "",
      language: "html"
    },
    {
      difficulty: "medium", name: "Imagine cu alt",
      question: "Adaugă o imagine cu src='photo.jpg' și alt='Fotografie'.",
      starterCode: "<!-- TODO: tag img cu atribute corecte -->\n",
      expectedOutput: "",
      language: "html"
    },
    {
      difficulty: "hard", name: "Layout semantic",
      question: "Creează o pagină cu header, nav, main și footer.",
      starterCode: "<!DOCTYPE html>\n<html>\n<body>\n<!-- TODO: layout semantic complet -->\n</body>\n</html>\n",
      expectedOutput: "",
      language: "html"
    },
  ]
};

TOPICS["html::formulare"] = {
  fillblanks: [
    {
      difficulty: "easy", name: "Input text",
      question: "Completează type-ul pentru câmp de text:\n```html\n<input type=\"___\" name=\"username\">\n```",
      answer: "text",
      explanation: "type='text' creează un câmp de introducere text de o linie."
    },
    {
      difficulty: "easy", name: "Submit button",
      question: "Completează pentru buton de trimitere formular:\n```html\n<input type=\"___\" value=\"Trimite\">\n```",
      answer: "submit",
      explanation: "type='submit' creează un buton care trimite formularul."
    },
    {
      difficulty: "medium", name: "Label for",
      question: "Completează atributul for al label-ului:\n```html\n<label ___=\"email\">Email:</label>\n<input id=\"email\" type=\"email\">\n```",
      answer: "for",
      explanation: "Atributul for leagă label-ul de input-ul cu id-ul corespunzător pentru accesibilitate."
    },
    {
      difficulty: "medium", name: "Required",
      question: "Completează atributul pentru câmp obligatoriu:\n```html\n<input type=\"text\" ___>\n```",
      answer: "required",
      explanation: "Atributul required previne trimiterea formularului dacă câmpul este gol."
    },
    {
      difficulty: "hard", name: "Textarea",
      question: "Completează pentru câmp text multiline cu 5 rânduri:\n```html\n<textarea rows=\"___\"></textarea>\n```",
      answer: "5",
      explanation: "Atributul rows al textarea specifică numărul de rânduri vizibile."
    },
  ],
  codings: [
    {
      difficulty: "easy", name: "Formular simplu",
      question: "Creează un formular cu câmp de text pentru nume și buton submit.",
      starterCode: "<!-- TODO: formular cu input text și submit -->\n",
      expectedOutput: "",
      language: "html"
    },
    {
      difficulty: "medium", name: "Formular login",
      question: "Creează formular cu câmpuri username și password (type='password').",
      starterCode: "<!-- TODO: formular cu username și password -->\n",
      expectedOutput: "",
      language: "html"
    },
    {
      difficulty: "medium", name: "Select dropdown",
      question: "Creează un dropdown cu opțiunile: Roșu, Verde, Albastru.",
      starterCode: "<!-- TODO: select cu 3 options -->\n",
      expectedOutput: "",
      language: "html"
    },
    {
      difficulty: "hard", name: "Formular complet",
      question: "Formular de înregistrare: nume, email, parolă, confirmă parola, checkbox termeni.",
      starterCode: "<!-- TODO: formular complet cu toate câmpurile -->\n",
      expectedOutput: "",
      language: "html"
    },
    {
      difficulty: "hard", name: "Validare HTML5",
      question: "Adaugă validare HTML5: email valid, parolă min 8 caractere, câmpuri required.",
      starterCode: "<!-- TODO: input cu validare HTML5 nativă -->\n",
      expectedOutput: "",
      language: "html"
    },
  ]
};

// ─────────────────────────────────────────────
// CSS TOPICS
// ─────────────────────────────────────────────

TOPICS["css::selectori"] = {
  fillblanks: [
    {
      difficulty: "easy", name: "Selector clasă",
      question: "Completează selectorul pentru clasa 'titlu':\n```css\n___ { color: red; }\n```",
      answer: ".titlu",
      explanation: "Selectorul de clasă folosește punct (.) urmat de numele clasei."
    },
    {
      difficulty: "easy", name: "Selector ID",
      question: "Completează selectorul pentru elementul cu id 'header':\n```css\n___ { background: blue; }\n```",
      answer: "#header",
      explanation: "Selectorul de ID folosește # urmat de id-ul elementului."
    },
    {
      difficulty: "medium", name: "Selector descendent",
      question: "Completează pentru a selecta p din interiorul div:\n```css\ndiv ___ p { margin: 0; }\n```",
      answer: ">",
      explanation: "Selectorul > selectează copiii direcți; fără >, spațiul selectează toți descendenții."
    },
    {
      difficulty: "medium", name: "Pseudo-clasă",
      question: "Completează pentru stilizarea link-urilor la hover:\n```css\na:___ { color: red; }\n```",
      answer: "hover",
      explanation: ":hover se aplică când utilizatorul plasează cursorul deasupra elementului."
    },
    {
      difficulty: "hard", name: "Selector atribut",
      question: "Completează pentru input-uri de tip text:\n```css\ninput[___=\"text\"] { border: 1px solid gray; }\n```",
      answer: "type",
      explanation: "Selectorul de atribut [attr='val'] selectează elementele cu atributul specificat."
    },
  ],
  codings: [
    {
      difficulty: "easy", name: "Culoare text",
      question: "Stilizează toate paragrafele cu culoarea roșie.",
      starterCode: "/* TODO: selector p cu color: red */\n",
      expectedOutput: "",
      language: "css"
    },
    {
      difficulty: "easy", name: "Clasă specifică",
      question: "Stilizează elementele cu clasa 'highlight' cu fundal galben.",
      starterCode: "/* TODO: selector .highlight */\n",
      expectedOutput: "",
      language: "css"
    },
    {
      difficulty: "medium", name: "Pseudo-clase",
      question: "Stilizează primul li din ul cu culoare albastră.",
      starterCode: "/* TODO: ul li:first-child */\n",
      expectedOutput: "",
      language: "css"
    },
    {
      difficulty: "medium", name: "Specificitate",
      question: "Scrie CSS care suprascrie o regulă inline pentru h1.",
      starterCode: "/* TODO: selector cu specificitate ridicată */\n",
      expectedOutput: "",
      language: "css"
    },
    {
      difficulty: "hard", name: "Selector complex",
      question: "Stilizează doar input-urile de tip email din formularele cu clasa 'form-contact'.",
      starterCode: "/* TODO: selector combinat form.form-contact input[type='email'] */\n",
      expectedOutput: "",
      language: "css"
    },
  ]
};

TOPICS["css::flexbox"] = {
  fillblanks: [
    {
      difficulty: "easy", name: "Display flex",
      question: "Completează pentru a activa flexbox:\n```css\n.container { display: ___; }\n```",
      answer: "flex",
      explanation: "display: flex activează flexbox pe elementul container."
    },
    {
      difficulty: "easy", name: "Centrare orizontală",
      question: "Completează pentru a centra elementele orizontal:\n```css\n.container { display: flex; justify-content: ___; }\n```",
      answer: "center",
      explanation: "justify-content: center centrează elementele pe axa principală (orizontal)."
    },
    {
      difficulty: "medium", name: "Centrare verticală",
      question: "Completează pentru a centra elementele vertical:\n```css\n.container { display: flex; align-items: ___; }\n```",
      answer: "center",
      explanation: "align-items: center centrează elementele pe axa transversală (verticală)."
    },
    {
      difficulty: "medium", name: "Flex direction",
      question: "Completează pentru a aranja elementele în coloană:\n```css\n.container { display: flex; flex-direction: ___; }\n```",
      answer: "column",
      explanation: "flex-direction: column aranjează elementele vertical în loc de orizontal."
    },
    {
      difficulty: "hard", name: "Flex grow",
      question: "Completează pentru ca un element să ocupe tot spațiul disponibil:\n```css\n.element { flex-grow: ___; }\n```",
      answer: "1",
      explanation: "flex-grow: 1 permite elementului să crească și să ocupe spațiul rămas."
    },
  ],
  codings: [
    {
      difficulty: "easy", name: "Flex container",
      question: "Creează un container flex cu 3 iteme aliniate orizontal.",
      starterCode: "/* TODO: .container cu display flex */\n",
      expectedOutput: "",
      language: "css"
    },
    {
      difficulty: "easy", name: "Centrare completă",
      question: "Centrează un element atât orizontal cât și vertical în container.",
      starterCode: "/* TODO: justify-content și align-items center */\n",
      expectedOutput: "",
      language: "css"
    },
    {
      difficulty: "medium", name: "Space between",
      question: "Distribuie 3 iteme cu spațiu egal între ele.",
      starterCode: "/* TODO: justify-content: space-between */\n",
      expectedOutput: "",
      language: "css"
    },
    {
      difficulty: "medium", name: "Flex wrap",
      question: "Permite itemelor să se înfășoare pe mai multe rânduri.",
      starterCode: "/* TODO: flex-wrap: wrap */\n",
      expectedOutput: "",
      language: "css"
    },
    {
      difficulty: "hard", name: "Sidebar layout",
      question: "Layout cu sidebar fix (200px) și conținut care ocupă restul.",
      starterCode: "/* TODO: sidebar + main cu flex-grow */\n",
      expectedOutput: "",
      language: "css"
    },
  ]
};

TOPICS["css::grid"] = {
  fillblanks: [
    {
      difficulty: "easy", name: "Display grid",
      question: "Completează pentru a activa CSS Grid:\n```css\n.container { display: ___; }\n```",
      answer: "grid",
      explanation: "display: grid activează CSS Grid Layout pe elementul container."
    },
    {
      difficulty: "easy", name: "Template coloane",
      question: "Completează pentru 3 coloane egale:\n```css\n.container { grid-template-columns: repeat(3, ___); }\n```",
      answer: "1fr",
      explanation: "1fr înseamnă 1 fracțiune din spațiul disponibil; repeat(3, 1fr) face 3 coloane egale."
    },
    {
      difficulty: "medium", name: "Gap",
      question: "Completează pentru spațiu de 16px între celule:\n```css\n.container { display: grid; ___: 16px; }\n```",
      answer: "gap",
      explanation: "gap (sau grid-gap) definește spațiul dintre rânduri și coloane."
    },
    {
      difficulty: "medium", name: "Grid span",
      question: "Completează pentru ca un element să ocupe 2 coloane:\n```css\n.item { grid-column: span ___; }\n```",
      answer: "2",
      explanation: "span N face elementul să ocupe N coloane consecutive."
    },
    {
      difficulty: "hard", name: "Grid areas",
      question: "Completează proprietatea pentru a defini zone numite:\n```css\n.container { grid-template-___: \"header\" \"main\" \"footer\"; }\n```",
      answer: "areas",
      explanation: "grid-template-areas permite definirea layout-ului cu nume de zone."
    },
  ],
  codings: [
    {
      difficulty: "easy", name: "Grid simplu",
      question: "Creează un grid cu 3 coloane egale.",
      starterCode: "/* TODO: grid-template-columns cu repeat */\n",
      expectedOutput: "",
      language: "css"
    },
    {
      difficulty: "medium", name: "Grid cu gap",
      question: "Grid 2×3 cu gap de 20px.",
      starterCode: "/* TODO: grid-template-columns, rows și gap */\n",
      expectedOutput: "",
      language: "css"
    },
    {
      difficulty: "medium", name: "Span element",
      question: "Fă header-ul să ocupe toate cele 3 coloane.",
      starterCode: "/* TODO: grid-column: 1 / -1 sau span 3 */\n",
      expectedOutput: "",
      language: "css"
    },
    {
      difficulty: "hard", name: "Layout cu areas",
      question: "Creează layout cu header, sidebar, main, footer folosind grid-template-areas.",
      starterCode: "/* TODO: grid-template-areas complet */\n",
      expectedOutput: "",
      language: "css"
    },
    {
      difficulty: "hard", name: "Auto-fill responsive",
      question: "Grid responsive care pune cât mai multe coloane de minim 200px.",
      starterCode: "/* TODO: grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)) */\n",
      expectedOutput: "",
      language: "css"
    },
  ]
};

// ─────────────────────────────────────────────
// TAILWIND TOPICS
// ─────────────────────────────────────────────

TOPICS["tailwind::intro"] = {
  fillblanks: [
    {
      difficulty: "easy", name: "Padding",
      question: "Completează clasa Tailwind pentru padding de 4 unități pe toate laturile:\n```html\n<div class=\"___\">...</div>\n```",
      answer: "p-4",
      explanation: "p-4 aplică padding de 1rem (16px la dimensiunea standard) pe toate laturile."
    },
    {
      difficulty: "easy", name: "Culoare text",
      question: "Completează clasa pentru text albastru:\n```html\n<p class=\"text-___-500\">Text</p>\n```",
      answer: "blue",
      explanation: "text-{culoare}-{intensitate} setează culoarea textului."
    },
    {
      difficulty: "medium", name: "Flexbox",
      question: "Completează clasa pentru display flex:\n```html\n<div class=\"___\">...</div>\n```",
      answer: "flex",
      explanation: "Clasa flex este echivalentul CSS display: flex în Tailwind."
    },
    {
      difficulty: "medium", name: "Responsive",
      question: "Completează pentru ca padding-ul de 8 să se aplice doar pe ecrane medii:\n```html\n<div class=\"p-4 ___:p-8\">...\n```",
      answer: "md",
      explanation: "Prefixul md: aplică clasa pe ecrane ≥768px (breakpoint medium)."
    },
    {
      difficulty: "hard", name: "Hover state",
      question: "Completează clasa pentru schimbarea culorii la hover:\n```html\n<button class=\"bg-blue-500 ___:bg-blue-700\">Buton</button>\n```",
      answer: "hover",
      explanation: "Prefixul hover: aplică clasa când utilizatorul trece cu mouse-ul deasupra."
    },
  ],
  codings: [
    {
      difficulty: "easy", name: "Card simplu",
      question: "Creează un card cu border, padding și umbră cu clase Tailwind.",
      starterCode: "<!-- TODO: div cu border, p-4, shadow -->\n",
      expectedOutput: "",
      language: "html"
    },
    {
      difficulty: "easy", name: "Buton stilizat",
      question: "Creează un buton cu fundal albastru, text alb și padding.",
      starterCode: "<!-- TODO: button cu bg-blue-500 text-white px-4 py-2 -->\n",
      expectedOutput: "",
      language: "html"
    },
    {
      difficulty: "medium", name: "Flex center",
      question: "Centrează un element în container cu Tailwind flex.",
      starterCode: "<!-- TODO: div cu flex items-center justify-center -->\n",
      expectedOutput: "",
      language: "html"
    },
    {
      difficulty: "medium", name: "Grid responsive",
      question: "Grid 1 coloană pe mobil, 3 coloane pe desktop cu Tailwind.",
      starterCode: "<!-- TODO: grid grid-cols-1 md:grid-cols-3 -->\n",
      expectedOutput: "",
      language: "html"
    },
    {
      difficulty: "hard", name: "Navbar",
      question: "Creează o navbar responsive cu logo și linkuri de navigare.",
      starterCode: "<!-- TODO: nav cu flex justify-between items și responsive -->\n",
      expectedOutput: "",
      language: "html"
    },
  ]
};

// ─────────────────────────────────────────────
// REACT TOPICS
// ─────────────────────────────────────────────

TOPICS["react::componente"] = {
  fillblanks: [
    {
      difficulty: "easy", name: "Componentă funcțională",
      question: "Completează pentru a returna JSX dintr-o componentă:\n```jsx\nfunction Salut() {\n  ___ <h1>Bună!</h1>;\n}\n```",
      answer: "return",
      explanation: "Componentele funcționale returnează JSX."
    },
    {
      difficulty: "easy", name: "Props",
      question: "Completează pentru a accesa prop-ul `name`:\n```jsx\nfunction Salut({ ___ }) {\n  return <h1>Bună, {name}!</h1>;\n}\n```",
      answer: "name",
      explanation: "Props sunt parametrii componentei, destructurați din obiectul primit."
    },
    {
      difficulty: "medium", name: "Children",
      question: "Completează pentru a afișa conținutul din interiorul componentei:\n```jsx\nfunction Card({ ___ }) {\n  return <div className=\"card\">{children}</div>;\n}\n```",
      answer: "children",
      explanation: "children este un prop special care conține tot ce este pus între tag-urile componentei."
    },
    {
      difficulty: "medium", name: "Fragment",
      question: "Completează cu tag-ul React pentru a wrapa elemente fără div:\n```jsx\nreturn (\n  <___>\n    <h1>Titlu</h1>\n    <p>Text</p>\n  </___>\n);\n```",
      answer: ">",
      explanation: "React Fragment (<> </>) permite returnarea mai multor elemente fără un wrapper DOM."
    },
    {
      difficulty: "hard", name: "Key în list",
      question: "Completează atributul obligatoriu la randarea listelor:\n```jsx\nitems.map(item => <li ___={item.id}>{item.name}</li>)\n```",
      answer: "key",
      explanation: "key ajută React să identifice care elemente s-au schimbat la re-randare."
    },
  ],
  codings: [
    {
      difficulty: "easy", name: "Componentă simplă",
      question: "Creează componenta `Salut` care primește `name` și afișează un mesaj.",
      starterCode: "function Salut({ name }) {\n  // TODO: returnează <h1>Salut, {name}!</h1>\n}\n\nexport default Salut;\n",
      expectedOutput: "",
      language: "jsx"
    },
    {
      difficulty: "easy", name: "Componentă cu copii",
      question: "Creează Card care wrappează children în div cu clasa 'card'.",
      starterCode: "function Card({ children }) {\n  return <div className=\"card\">{children}</div>;\n}\n\nexport default Card;\n",
      expectedOutput: "",
      language: "jsx"
    },
    {
      difficulty: "medium", name: "Lista cu componente",
      question: "Randează o listă de produse cu map și key corect.",
      starterCode: "const produse = [\n  { id: 1, name: \"Laptop\" },\n  { id: 2, name: \"Telefon\" },\n];\n\nfunction ListaProduse() {\n  return (\n    <ul>\n      {produse.map(p => (\n        // TODO: li cu key={p.id} și {p.name}\n      ))}\n    </ul>\n  );\n}\n",
      expectedOutput: "",
      language: "jsx"
    },
    {
      difficulty: "medium", name: "Props și condiționare",
      question: "Afișează un badge 'Admin' dacă prop-ul isAdmin este true.",
      starterCode: "function UserBadge({ name, isAdmin }) {\n  return (\n    <div>\n      <span>{name}</span>\n      {/* TODO: afișează 'Admin' dacă isAdmin */}\n    </div>\n  );\n}\n",
      expectedOutput: "",
      language: "jsx"
    },
    {
      difficulty: "hard", name: "Compound component",
      question: "Creează Card cu sub-componente Card.Header și Card.Body.",
      starterCode: "function Card({ children }) {\n  return <div className=\"card\">{children}</div>;\n}\n\nCard.Header = function({ children }) {\n  // TODO: returnează div.card-header\n};\n\nCard.Body = function({ children }) {\n  // TODO: returnează div.card-body\n};\n\nexport default Card;\n",
      expectedOutput: "",
      language: "jsx"
    },
  ]
};

TOPICS["react::useState"] = {
  fillblanks: [
    {
      difficulty: "easy", name: "Import useState",
      question: "Completează importul pentru useState:\n```jsx\nimport { ___ } from 'react';\n```",
      answer: "useState",
      explanation: "useState se importă din 'react' pentru a gestiona starea unui component."
    },
    {
      difficulty: "easy", name: "Declarare state",
      question: "Completează destructurarea useState:\n```jsx\nconst [count, ___] = useState(0);\n```",
      answer: "setCount",
      explanation: "useState returnează o pereche: valoarea curentă și funcția de actualizare."
    },
    {
      difficulty: "medium", name: "Actualizare state",
      question: "Completează pentru a incrementa count:\n```jsx\n<button onClick={() => setCount(count ___ 1)}>+</button>\n```",
      answer: "+",
      explanation: "State-ul se actualizează apelând funcția setter cu noua valoare."
    },
    {
      difficulty: "medium", name: "Funcție updater",
      question: "Completează cu forma funcțională pentru actualizare sigură:\n```jsx\nsetCount(prev => prev ___ 1);\n```",
      answer: "+",
      explanation: "Forma funcțională (prev => ...) asigură că lucrezi cu valoarea cea mai recentă a state-ului."
    },
    {
      difficulty: "hard", name: "Object state",
      question: "Completează pentru a actualiza o proprietate din object state:\n```jsx\nsetUser(prev => ({...prev, ___ : 'Ion'}));\n```",
      answer: "name",
      explanation: "La actualizarea unui object state, trebuie să copiezi celelalte proprietăți cu spread."
    },
  ],
  codings: [
    {
      difficulty: "easy", name: "Contor simplu",
      question: "Creează un contor cu butoane + și - folosind useState.",
      starterCode: "import { useState } from 'react';\n\nfunction Contor() {\n  const [count, setCount] = useState(0);\n  return (\n    <div>\n      <button onClick={() => setCount(count - 1)}>-</button>\n      <span>{count}</span>\n      {/* TODO: buton pentru incrementare */}\n    </div>\n  );\n}\n",
      expectedOutput: "",
      language: "jsx"
    },
    {
      difficulty: "medium", name: "Toggle",
      question: "Implementează un toggle care schimbă textul între 'Pornit' și 'Oprit'.",
      starterCode: "import { useState } from 'react';\n\nfunction Toggle() {\n  const [activ, setActiv] = useState(false);\n  return (\n    <button onClick={() => setActiv(!activ)}>\n      {/* TODO: afișează 'Pornit' sau 'Oprit' */}\n    </button>\n  );\n}\n",
      expectedOutput: "",
      language: "jsx"
    },
    {
      difficulty: "medium", name: "Input controlat",
      question: "Creează un input controlat care afișează textul introdus în timp real.",
      starterCode: "import { useState } from 'react';\n\nfunction InputControlat() {\n  const [text, setText] = useState('');\n  return (\n    <div>\n      <input value={text} onChange={e => setText(e.target.value)} />\n      {/* TODO: afișează text curent */}\n    </div>\n  );\n}\n",
      expectedOutput: "",
      language: "jsx"
    },
    {
      difficulty: "hard", name: "Todo list",
      question: "Creează o mini todo list cu input și buton de adăugare.",
      starterCode: "import { useState } from 'react';\n\nfunction TodoList() {\n  const [todos, setTodos] = useState([]);\n  const [input, setInput] = useState('');\n  \n  const adauga = () => {\n    // TODO: adaugă input la todos și resetează input\n  };\n  \n  return (\n    <div>\n      <input value={input} onChange={e => setInput(e.target.value)} />\n      <button onClick={adauga}>Adaugă</button>\n      <ul>{todos.map((t, i) => <li key={i}>{t}</li>)}</ul>\n    </div>\n  );\n}\n",
      expectedOutput: "",
      language: "jsx"
    },
    {
      difficulty: "hard", name: "Form cu validare",
      question: "Formular cu email și validare: afișează eroare dacă nu conține '@'.",
      starterCode: "import { useState } from 'react';\n\nfunction Form() {\n  const [email, setEmail] = useState('');\n  const [eroare, setEroare] = useState('');\n  \n  const valideaza = () => {\n    // TODO: verifică @ și setează eroarea\n  };\n  \n  return (\n    <form onSubmit={e => { e.preventDefault(); valideaza(); }}>\n      <input value={email} onChange={e => setEmail(e.target.value)} />\n      {eroare && <p>{eroare}</p>}\n      <button type=\"submit\">Verifică</button>\n    </form>\n  );\n}\n",
      expectedOutput: "",
      language: "jsx"
    },
  ]
};

// ─────────────────────────────────────────────
// NEXT.JS TOPICS
// ─────────────────────────────────────────────

TOPICS["nextjs-frontend::routing"] = {
  fillblanks: [
    {
      difficulty: "easy", name: "Componenta Link",
      question: "Completează importul pentru navigare client-side:\n```jsx\nimport ___ from 'next/link';\n```",
      answer: "Link",
      explanation: "Componenta Link din Next.js oferă navigare client-side fără reload complet."
    },
    {
      difficulty: "easy", name: "Fișier de pagină",
      question: "În App Router, fișierul care definește o pagină se numește:\n```\n___\n```",
      answer: "page.tsx",
      explanation: "În Next.js App Router, fișierele page.tsx/page.jsx definesc UI-ul unei rute."
    },
    {
      difficulty: "medium", name: "Rută dinamică",
      question: "Fișierul pentru ruta /blog/[id] se creează la:\n```\napp/blog/___/page.tsx\n```",
      answer: "[id]",
      explanation: "Rutele dinamice folosesc paranteze drepte în numele folderului: [param]."
    },
    {
      difficulty: "medium", name: "useRouter",
      question: "Completează importul pentru navigare programatică:\n```jsx\nimport { ___ } from 'next/navigation';\n```",
      answer: "useRouter",
      explanation: "useRouter din next/navigation permite navigarea programatică în App Router."
    },
    {
      difficulty: "hard", name: "Params dinamici",
      question: "Completează pentru a accesa parametrul din URL în Server Component:\n```tsx\nexport default function Page({ params }: { params: { ___: string } }) {\n```",
      answer: "id",
      explanation: "Params sunt accesibili ca prop în componentele de pagină din App Router."
    },
  ],
  codings: [
    {
      difficulty: "easy", name: "Link simplu",
      question: "Creează un link Next.js către pagina /about.",
      starterCode: "import Link from 'next/link';\n\nexport default function Nav() {\n  return (\n    <nav>\n      {/* TODO: Link cu href='/about' și text 'Despre noi' */}\n    </nav>\n  );\n}\n",
      expectedOutput: "",
      language: "jsx"
    },
    {
      difficulty: "easy", name: "Pagină simplă",
      question: "Creează pagina principală (app/page.tsx) cu un h1.",
      starterCode: "export default function Home() {\n  // TODO: returnează h1 cu textul 'Acasă'\n}\n",
      expectedOutput: "",
      language: "jsx"
    },
    {
      difficulty: "medium", name: "Layout",
      question: "Creează un layout.tsx care wrappează children cu un header și footer.",
      starterCode: "export default function RootLayout({ children }: { children: React.ReactNode }) {\n  return (\n    <html>\n      <body>\n        {/* TODO: header, {children}, footer */}\n      </body>\n    </html>\n  );\n}\n",
      expectedOutput: "",
      language: "jsx"
    },
    {
      difficulty: "hard", name: "Pagină dinamică",
      question: "Creează pagina app/produse/[id]/page.tsx care afișează id-ul.",
      starterCode: "export default function Produs({ params }: { params: { id: string } }) {\n  // TODO: afișează params.id\n}\n",
      expectedOutput: "",
      language: "jsx"
    },
    {
      difficulty: "hard", name: "generateStaticParams",
      question: "Generează static params pentru id-urile 1, 2, 3.",
      starterCode: "export function generateStaticParams() {\n  // TODO: returnează array cu {id: '1'}, {id: '2'}, {id: '3'}\n}\n",
      expectedOutput: "",
      language: "jsx"
    },
  ]
};

TOPICS["nextjs-backend::api"] = {
  fillblanks: [
    {
      difficulty: "easy", name: "Route Handler",
      question: "Fișierul pentru API route în App Router se numește:\n```\napp/api/users/___\n```",
      answer: "route.ts",
      explanation: "Fișierele route.ts/route.js definesc API handlers în Next.js App Router."
    },
    {
      difficulty: "easy", name: "GET handler",
      question: "Completează pentru un handler GET:\n```ts\nexport async function ___(request: Request) {\n  return Response.json({ ok: true });\n}\n```",
      answer: "GET",
      explanation: "Metodele HTTP se exportă cu același nume din fișierele route.ts."
    },
    {
      difficulty: "medium", name: "NextResponse",
      question: "Completează importul pentru răspunsuri Next.js:\n```ts\nimport { ___ } from 'next/server';\n```",
      answer: "NextResponse",
      explanation: "NextResponse extinde Response cu funcționalități specifice Next.js."
    },
    {
      difficulty: "medium", name: "Request body",
      question: "Completează pentru a citi body-ul cererii POST:\n```ts\nexport async function POST(req: Request) {\n  const data = await req.___();\n}\n```",
      answer: "json",
      explanation: "req.json() parsează body-ul cererii ca JSON."
    },
    {
      difficulty: "hard", name: "Status code",
      question: "Completează pentru a returna eroare 404:\n```ts\nreturn NextResponse.json({ error: 'Not found' }, { status: ___ });\n```",
      answer: "404",
      explanation: "Al doilea argument al NextResponse.json() permite setarea opțiunilor răspunsului."
    },
  ],
  codings: [
    {
      difficulty: "easy", name: "GET simplu",
      question: "Creează un handler GET care returnează { message: 'Hello' }.",
      starterCode: "export async function GET() {\n  // TODO: returnează Response.json cu mesaj\n}\n",
      expectedOutput: "",
      language: "javascript"
    },
    {
      difficulty: "medium", name: "POST cu body",
      question: "Handler POST care citește { name } din body și returnează salut.",
      starterCode: "export async function POST(request: Request) {\n  const { name } = await request.json();\n  // TODO: returnează { message: `Salut, ${name}!` }\n}\n",
      expectedOutput: "",
      language: "javascript"
    },
    {
      difficulty: "medium", name: "Error handling",
      question: "Handler GET cu try/catch care returnează 500 la eroare.",
      starterCode: "import { NextResponse } from 'next/server';\n\nexport async function GET() {\n  try {\n    // operație care poate eșua\n    const data = await getData();\n    return NextResponse.json(data);\n  } catch (e) {\n    // TODO: returnează 500 cu mesaj de eroare\n  }\n}\n",
      expectedOutput: "",
      language: "javascript"
    },
    {
      difficulty: "hard", name: "CRUD route",
      question: "Route cu GET (listare) și POST (creare) pentru /api/posts.",
      starterCode: "const posts: any[] = [];\n\nexport async function GET() {\n  return Response.json(posts);\n}\n\nexport async function POST(req: Request) {\n  const body = await req.json();\n  // TODO: adaugă în posts și returnează 201\n}\n",
      expectedOutput: "",
      language: "javascript"
    },
    {
      difficulty: "hard", name: "Middleware validare",
      question: "Verifică token Authorization în header; returnează 401 dacă lipsește.",
      starterCode: "export async function GET(req: Request) {\n  const token = req.headers.get('Authorization');\n  // TODO: verifică token, returnează 401 dacă null\n  return Response.json({ data: 'protected' });\n}\n",
      expectedOutput: "",
      language: "javascript"
    },
  ]
};

// ─────────────────────────────────────────────
// C TOPICS
// ─────────────────────────────────────────────

TOPICS["c::intro"] = {
  fillblanks: [
    {
      difficulty: "easy", name: "Printf",
      question: "Completează funcția pentru afișare în C:\n```c\n#include <stdio.h>\nint main() {\n  ___(\"Hello, World!\\n\");\n}\n```",
      answer: "printf",
      explanation: "printf() este funcția standard C pentru afișarea formatată."
    },
    {
      difficulty: "easy", name: "Tip int",
      question: "Completează tipul de date pentru număr întreg:\n```c\n___ varsta = 25;\n```",
      answer: "int",
      explanation: "int este tipul pentru numere întregi în C."
    },
    {
      difficulty: "medium", name: "Scanf",
      question: "Completează pentru citire de la tastatură:\n```c\nint n;\n___(\"% d\", &n);\n```",
      answer: "scanf",
      explanation: "scanf() citește date formatate din stdin; & este necesar pentru a pasa adresa variabilei."
    },
    {
      difficulty: "medium", name: "Format specifier",
      question: "Completează specifier-ul pentru float în printf:\n```c\nfloat x = 3.14;\nprintf(\"%___ \\n\", x);\n```",
      answer: "f",
      explanation: "%f este format specifier-ul pentru float în printf/scanf."
    },
    {
      difficulty: "hard", name: "Return main",
      question: "Completează return-ul corect pentru main:\n```c\nint main() {\n  printf(\"OK\\n\");\n  return ___;\n}\n```",
      answer: "0",
      explanation: "return 0 din main indică execuție cu succes; alte valori indică erori."
    },
  ],
  codings: [
    {
      difficulty: "easy", name: "Hello World",
      question: "Scrie programul C care afișează 'Hello, World!':\n```\nHello, World!\n```",
      starterCode: "#include <stdio.h>\nint main() {\n    // TODO\n    return 0;\n}\n",
      expectedOutput: "Hello, World!",
      language: "c"
    },
    {
      difficulty: "easy", name: "Suma două numere",
      question: "Declară a=10, b=20 și afișează suma:\n```\n30\n```",
      starterCode: "#include <stdio.h>\nint main() {\n    int a = 10, b = 20;\n    // TODO: afișează suma\n    return 0;\n}\n",
      expectedOutput: "30",
      language: "c"
    },
    {
      difficulty: "medium", name: "For loop",
      question: "Afișează numerele 1 la 5:\n```\n1\n2\n3\n4\n5\n```",
      starterCode: "#include <stdio.h>\nint main() {\n    for (int i = 1; i <= 5; i++) {\n        // TODO: printf cu i\n    }\n    return 0;\n}\n",
      expectedOutput: "1\n2\n3\n4\n5",
      language: "c"
    },
    {
      difficulty: "medium", name: "Funcție factorial",
      question: "Calculează factorial(5) cu o funcție:\n```\n120\n```",
      starterCode: "#include <stdio.h>\n\nint factorial(int n) {\n    if (n <= 1) return 1;\n    // TODO: returnează n * factorial(n-1)\n}\n\nint main() {\n    printf(\"%d\\n\", factorial(5));\n    return 0;\n}\n",
      expectedOutput: "120",
      language: "c"
    },
    {
      difficulty: "hard", name: "Array și sumă",
      question: "Calculează suma array-ului {2,4,6,8,10}:\n```\n30\n```",
      starterCode: "#include <stdio.h>\nint main() {\n    int arr[] = {2, 4, 6, 8, 10};\n    int n = 5, suma = 0;\n    for (int i = 0; i < n; i++) {\n        suma += arr[i];\n    }\n    printf(\"%d\\n\", suma);\n    return 0;\n}\n",
      expectedOutput: "30",
      language: "c"
    },
  ]
};

TOPICS["c::pointeri"] = {
  fillblanks: [
    {
      difficulty: "easy", name: "Declarare pointer",
      question: "Completează declararea unui pointer la int:\n```c\nint x = 5;\nint ___ p = &x;\n```",
      answer: "*",
      explanation: "* în declarare indică că variabila este un pointer."
    },
    {
      difficulty: "easy", name: "Adresă",
      question: "Completează pentru a obține adresa variabilei:\n```c\nint x = 10;\nprintf(\"%p\\n\", ___x);\n```",
      answer: "&",
      explanation: "Operatorul & (address-of) returnează adresa de memorie a variabilei."
    },
    {
      difficulty: "medium", name: "Dereferențiere",
      question: "Completează pentru a accesa valoarea pointed:\n```c\nint x = 42;\nint *p = &x;\nprintf(\"%d\\n\", ___p);\n```",
      answer: "*",
      explanation: "Operatorul * (dereference) accesează valoarea de la adresa pointerului."
    },
    {
      difficulty: "medium", name: "Pointer și funcție",
      question: "Completează pentru a modifica valoarea prin pointer:\n```c\nvoid dublu(int ___n) { *n *= 2; }\n```",
      answer: "*",
      explanation: "Funcțiile modifică variabile externe prin pointeri (call by reference simulat)."
    },
    {
      difficulty: "hard", name: "Array și pointer",
      question: "Ce afișează?\n```c\nint a[] = {10, 20, 30};\nprintf(\"%d\\n\", *(a + 1));\n```\nRăspuns: `___`",
      answer: "20",
      explanation: "a+1 avansează pointerul cu un element; *(a+1) este echivalent cu a[1]."
    },
  ],
  codings: [
    {
      difficulty: "easy", name: "Pointer simplu",
      question: "Declară pointer la x=7 și afișează valoarea prin pointer:\n```\n7\n```",
      starterCode: "#include <stdio.h>\nint main() {\n    int x = 7;\n    int *p = &x;\n    printf(\"%d\\n\", *p);\n    return 0;\n}\n",
      expectedOutput: "7",
      language: "c"
    },
    {
      difficulty: "medium", name: "Swap cu pointeri",
      question: "Swap a=3 și b=7 printr-o funcție cu pointeri:\n```\n7 3\n```",
      starterCode: "#include <stdio.h>\nvoid swap(int *a, int *b) {\n    int temp = *a;\n    *a = *b;\n    // TODO: *b = temp\n}\nint main() {\n    int a = 3, b = 7;\n    swap(&a, &b);\n    printf(\"%d %d\\n\", a, b);\n    return 0;\n}\n",
      expectedOutput: "7 3",
      language: "c"
    },
    {
      difficulty: "medium", name: "Parcurgere array",
      question: "Parcurge array-ul cu pointer și afișează elementele:\n```\n1 2 3 4 5\n```",
      starterCode: "#include <stdio.h>\nint main() {\n    int arr[] = {1,2,3,4,5};\n    int *p = arr;\n    for (int i = 0; i < 5; i++) {\n        printf(\"%d \", *(p + i));\n    }\n    printf(\"\\n\");\n    return 0;\n}\n",
      expectedOutput: "1 2 3 4 5",
      language: "c"
    },
    {
      difficulty: "hard", name: "Alocare dinamică",
      question: "Alocă dinamic un array de 3 inturi, completează cu 1,2,3 și afișează suma:\n```\n6\n```",
      starterCode: "#include <stdio.h>\n#include <stdlib.h>\nint main() {\n    int *arr = malloc(3 * sizeof(int));\n    arr[0] = 1; arr[1] = 2; arr[2] = 3;\n    int suma = arr[0] + arr[1] + arr[2];\n    printf(\"%d\\n\", suma);\n    free(arr);\n    return 0;\n}\n",
      expectedOutput: "6",
      language: "c"
    },
    {
      difficulty: "hard", name: "String cu pointer",
      question: "Calculează lungimea string-ului 'hello' fără strlen:\n```\n5\n```",
      starterCode: "#include <stdio.h>\nint main() {\n    char *s = \"hello\";\n    int len = 0;\n    while (*s++ != '\\0') len++;\n    printf(\"%d\\n\", len);\n    return 0;\n}\n",
      expectedOutput: "5",
      language: "c"
    },
  ]
};

// ─────────────────────────────────────────────
// C++ TOPICS
// ─────────────────────────────────────────────

TOPICS["cpp::intro"] = {
  fillblanks: [
    {
      difficulty: "easy", name: "Cout",
      question: "Completează pentru afișare în C++:\n```cpp\n#include <iostream>\nusing namespace std;\nint main() {\n  ___ << \"Hello\" << endl;\n}\n```",
      answer: "cout",
      explanation: "cout este stream-ul de ieșire standard în C++."
    },
    {
      difficulty: "easy", name: "Cin",
      question: "Completează pentru citire:\n```cpp\nint n;\n___ >> n;\n```",
      answer: "cin",
      explanation: "cin este stream-ul de intrare standard în C++."
    },
    {
      difficulty: "medium", name: "String C++",
      question: "Completează tipul pentru string C++:\n```cpp\n#include <string>\n___ s = \"hello\";\n```",
      answer: "string",
      explanation: "std::string este tipul C++ pentru șiruri de caractere."
    },
    {
      difficulty: "medium", name: "Vector",
      question: "Completează pentru a adăuga element la vector:\n```cpp\nvector<int> v = {1,2,3};\nv.___(4);\n```",
      answer: "push_back",
      explanation: "push_back() adaugă un element la finalul vectorului."
    },
    {
      difficulty: "hard", name: "Auto",
      question: "Completează cu cuvântul cheie pentru deducere automată de tip:\n```cpp\n___ x = 3.14;\n```",
      answer: "auto",
      explanation: "auto permite compilatorului să deducă tipul variabilei din inițializator."
    },
  ],
  codings: [
    {
      difficulty: "easy", name: "Hello World C++",
      question: "Afișează 'Hello, World!' în C++:\n```\nHello, World!\n```",
      starterCode: "#include <iostream>\nusing namespace std;\nint main() {\n    // TODO\n    return 0;\n}\n",
      expectedOutput: "Hello, World!",
      language: "cpp"
    },
    {
      difficulty: "medium", name: "Vector și for",
      question: "Afișează suma elementelor vectorului {1,2,3,4,5}:\n```\n15\n```",
      starterCode: "#include <iostream>\n#include <vector>\nusing namespace std;\nint main() {\n    vector<int> v = {1,2,3,4,5};\n    int suma = 0;\n    for (auto x : v) suma += x;\n    cout << suma << endl;\n    return 0;\n}\n",
      expectedOutput: "15",
      language: "cpp"
    },
    {
      difficulty: "medium", name: "Clasă C++",
      question: "Creează clasa Dreptunghi cu arie(), apeleaz-o cu l=4 h=5:\n```\n20\n```",
      starterCode: "#include <iostream>\nusing namespace std;\nclass Dreptunghi {\npublic:\n    int l, h;\n    Dreptunghi(int l, int h) : l(l), h(h) {}\n    int arie() { return l * h; }\n};\nint main() {\n    Dreptunghi d(4, 5);\n    cout << d.arie() << endl;\n    return 0;\n}\n",
      expectedOutput: "20",
      language: "cpp"
    },
    {
      difficulty: "hard", name: "Template funcție",
      question: "Funcție template maxim(a,b) pentru int și float:\n```\n7\n3.14\n```",
      starterCode: "#include <iostream>\nusing namespace std;\ntemplate<typename T>\nT maxim(T a, T b) { return a > b ? a : b; }\nint main() {\n    cout << maxim(3, 7) << endl;\n    cout << maxim(2.71f, 3.14f) << endl;\n    return 0;\n}\n",
      expectedOutput: "7\n3.14",
      language: "cpp"
    },
    {
      difficulty: "hard", name: "STL sort",
      question: "Sortează vectorul {5,3,1,4,2} și afișeaz-l:\n```\n1 2 3 4 5\n```",
      starterCode: "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\nint main() {\n    vector<int> v = {5,3,1,4,2};\n    sort(v.begin(), v.end());\n    for (auto x : v) cout << x << \" \";\n    cout << endl;\n    return 0;\n}\n",
      expectedOutput: "1 2 3 4 5",
      language: "cpp"
    },
  ]
};

// ─────────────────────────────────────────────
// C# TOPICS
// ─────────────────────────────────────────────

TOPICS["csharp::intro"] = {
  fillblanks: [
    {
      difficulty: "easy", name: "Console.WriteLine",
      question: "Completează pentru afișare în C#:\n```csharp\n___.WriteLine(\"Hello!\");\n```",
      answer: "Console",
      explanation: "Console.WriteLine() afișează text urmat de newline în C#."
    },
    {
      difficulty: "easy", name: "Tip string C#",
      question: "Completează tipul pentru text în C#:\n```csharp\n___ mesaj = \"Salut\";\n```",
      answer: "string",
      explanation: "string este alias-ul C# pentru System.String."
    },
    {
      difficulty: "medium", name: "String interpolation",
      question: "Completează prefixul pentru string interpolation:\n```csharp\nstring name = \"Ana\";\nConsole.WriteLine(___\"Salut, {name}!\");\n```",
      answer: "$",
      explanation: "$ prefix-ul activează string interpolation în C#."
    },
    {
      difficulty: "medium", name: "List generic",
      question: "Completează tipul generic al listei:\n```csharp\nvar numere = new List<___>();\n```",
      answer: "int",
      explanation: "List<T> este colecția generică pentru liste în C#."
    },
    {
      difficulty: "hard", name: "LINQ",
      question: "Completează metoda LINQ pentru filtrare:\n```csharp\nvar pare = numere.___(n => n % 2 == 0);\n```",
      answer: "Where",
      explanation: "Where() este metoda LINQ echivalentă cu filter; returnează IEnumerable filtrat."
    },
  ],
  codings: [
    {
      difficulty: "easy", name: "Hello C#",
      question: "Afișează 'Hello, World!' în C#:\n```\nHello, World!\n```",
      starterCode: "using System;\nclass Program {\n    static void Main() {\n        // TODO\n    }\n}\n",
      expectedOutput: "Hello, World!",
      language: "csharp"
    },
    {
      difficulty: "medium", name: "LINQ filtrare",
      question: "Filtrează numerele pare din {1..8} cu LINQ:\n```\n2 4 6 8\n```",
      starterCode: "using System;\nusing System.Linq;\nclass Program {\n    static void Main() {\n        var numere = new[] {1,2,3,4,5,6,7,8};\n        var pare = numere.Where(n => n % 2 == 0);\n        Console.WriteLine(string.Join(\" \", pare));\n    }\n}\n",
      expectedOutput: "2 4 6 8",
      language: "csharp"
    },
    {
      difficulty: "medium", name: "Clasă C#",
      question: "Creează clasa Persoana și afișează info:\n```\nIon are 30 de ani\n```",
      starterCode: "using System;\nclass Persoana {\n    public string Nume { get; set; }\n    public int Varsta { get; set; }\n    public override string ToString() => $\"{Nume} are {Varsta} de ani\";\n}\nclass Program {\n    static void Main() {\n        var p = new Persoana { Nume = \"Ion\", Varsta = 30 };\n        Console.WriteLine(p);\n    }\n}\n",
      expectedOutput: "Ion are 30 de ani",
      language: "csharp"
    },
    {
      difficulty: "hard", name: "Async/await C#",
      question: "Funcție async care returnează 42 și o afișează:\n```\n42\n```",
      starterCode: "using System;\nusing System.Threading.Tasks;\nclass Program {\n    static async Task<int> GetValueAsync() => await Task.FromResult(42);\n    static async Task Main() {\n        int val = await GetValueAsync();\n        Console.WriteLine(val);\n    }\n}\n",
      expectedOutput: "42",
      language: "csharp"
    },
    {
      difficulty: "hard", name: "LINQ complex",
      question: "Grupează {1..6} în pare și impare și afișează count-urile:\n```\nImpare: 3\nPare: 3\n```",
      starterCode: "using System;\nusing System.Linq;\nclass Program {\n    static void Main() {\n        var numere = new[] {1,2,3,4,5,6};\n        var grupuri = numere.GroupBy(n => n % 2 == 0 ? \"Pare\" : \"Impare\");\n        foreach (var g in grupuri.OrderBy(g => g.Key))\n            Console.WriteLine($\"{g.Key}: {g.Count()}\");\n    }\n}\n",
      expectedOutput: "Impare: 3\nPare: 3",
      language: "csharp"
    },
  ]
};

// ─────────────────────────────────────────────
// JAVA TOPICS
// ─────────────────────────────────────────────

TOPICS["java::intro"] = {
  fillblanks: [
    {
      difficulty: "easy", name: "System.out.println",
      question: "Completează pentru afișare în Java:\n```java\n___.out.println(\"Hello!\");\n```",
      answer: "System",
      explanation: "System.out.println() este metoda standard pentru afișare în Java."
    },
    {
      difficulty: "easy", name: "Tip String Java",
      question: "Completează tipul pentru text în Java:\n```java\n___ s = \"Java\";\n```",
      answer: "String",
      explanation: "String (cu S majusculă) este clasa pentru șiruri de caractere în Java."
    },
    {
      difficulty: "medium", name: "Array declaration",
      question: "Completează declararea array-ului de int:\n```java\nint___ numere = {1, 2, 3};\n```",
      answer: "[]",
      explanation: "Array-urile în Java se declară cu [] după tip sau după numele variabilei."
    },
    {
      difficulty: "medium", name: "For-each Java",
      question: "Completează for-each:\n```java\nfor (int n ___ numere) {\n  System.out.println(n);\n}\n```",
      answer: ":",
      explanation: "Sintaxa for-each în Java este: for (tip var : colectie) { ... }"
    },
    {
      difficulty: "hard", name: "ArrayList",
      question: "Completează pentru adăugare element în ArrayList:\n```java\nArrayList<String> list = new ArrayList<>();\nlist.___(\"Java\");\n```",
      answer: "add",
      explanation: "add() adaugă un element la finalul ArrayList-ului."
    },
  ],
  codings: [
    {
      difficulty: "easy", name: "Hello Java",
      question: "Afișează 'Hello, World!' în Java:\n```\nHello, World!\n```",
      starterCode: "public class Main {\n    public static void main(String[] args) {\n        // TODO\n    }\n}\n",
      expectedOutput: "Hello, World!",
      language: "java"
    },
    {
      difficulty: "medium", name: "Factorial Java",
      question: "Calculează factorial(6) recursiv:\n```\n720\n```",
      starterCode: "public class Main {\n    static int factorial(int n) {\n        if (n <= 1) return 1;\n        return n * factorial(n - 1);\n    }\n    public static void main(String[] args) {\n        System.out.println(factorial(6));\n    }\n}\n",
      expectedOutput: "720",
      language: "java"
    },
    {
      difficulty: "medium", name: "Clasă și obiecte",
      question: "Creează Animal cu sunet, Cat îl suprascrie cu 'Meow':\n```\nMeow\n```",
      starterCode: "class Animal {\n    String sunet() { return \"...\"; }\n}\nclass Cat extends Animal {\n    String sunet() { return \"Meow\"; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Animal a = new Cat();\n        System.out.println(a.sunet());\n    }\n}\n",
      expectedOutput: "Meow",
      language: "java"
    },
    {
      difficulty: "hard", name: "Stream API",
      question: "Filtrează numerele > 3 din {1..6} și afișează suma:\n```\n15\n```",
      starterCode: "import java.util.Arrays;\npublic class Main {\n    public static void main(String[] args) {\n        int suma = Arrays.asList(1,2,3,4,5,6)\n            .stream()\n            .filter(n -> n > 3)\n            .mapToInt(Integer::intValue)\n            .sum();\n        System.out.println(suma);\n    }\n}\n",
      expectedOutput: "15",
      language: "java"
    },
    {
      difficulty: "hard", name: "Interface Java",
      question: "Interface Forma cu arie(), implementat de Cerc cu r=5:\n```\n78.54\n```",
      starterCode: "interface Forma {\n    double arie();\n}\nclass Cerc implements Forma {\n    double r;\n    Cerc(double r) { this.r = r; }\n    public double arie() { return Math.PI * r * r; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Forma f = new Cerc(5);\n        System.out.printf(\"%.2f%n\", f.arie());\n    }\n}\n",
      expectedOutput: "78.54",
      language: "java"
    },
  ]
};

// ─────────────────────────────────────────────
// SQL TOPICS
// ─────────────────────────────────────────────

TOPICS["sql::select"] = {
  fillblanks: [
    {
      difficulty: "easy", name: "SELECT toate",
      question: "Completează pentru a selecta toate coloanele:\n```sql\n___ * FROM users;\n```",
      answer: "SELECT",
      explanation: "SELECT * FROM tabel returnează toate rândurile și coloanele din tabel."
    },
    {
      difficulty: "easy", name: "WHERE",
      question: "Completează pentru a filtra:\n```sql\nSELECT * FROM users\n___ age > 18;\n```",
      answer: "WHERE",
      explanation: "WHERE filtrează rândurile care satisfac condiția specificată."
    },
    {
      difficulty: "medium", name: "ORDER BY",
      question: "Completează pentru sortare descrescătoare:\n```sql\nSELECT name FROM users\nORDER BY name ___;\n```",
      answer: "DESC",
      explanation: "DESC sortează în ordine descrescătoare; implicit ASC este crescător."
    },
    {
      difficulty: "medium", name: "LIMIT",
      question: "Completează pentru a returna primele 10 înregistrări:\n```sql\nSELECT * FROM products\n___ 10;\n```",
      answer: "LIMIT",
      explanation: "LIMIT restricționează numărul de rânduri returnate."
    },
    {
      difficulty: "hard", name: "GROUP BY",
      question: "Completează pentru a număra utilizatorii per țară:\n```sql\nSELECT country, COUNT(*) as total\nFROM users\n___ BY country;\n```",
      answer: "GROUP",
      explanation: "GROUP BY agregă rândurile cu aceeași valoare în coloanele specificate."
    },
  ],
  codings: [
    {
      difficulty: "easy", name: "SELECT simplu",
      question: "Scrie query-ul pentru toți utilizatorii cu vârsta > 21.",
      starterCode: "-- TODO: SELECT cu WHERE\n",
      expectedOutput: "",
      language: "sql"
    },
    {
      difficulty: "medium", name: "Agregare",
      question: "Calculează vârsta medie a utilizatorilor.",
      starterCode: "-- TODO: SELECT cu AVG()\n",
      expectedOutput: "",
      language: "sql"
    },
    {
      difficulty: "medium", name: "ORDER și LIMIT",
      question: "Returnează top 5 produse după preț descrescător.",
      starterCode: "-- TODO: SELECT cu ORDER BY DESC LIMIT\n",
      expectedOutput: "",
      language: "sql"
    },
    {
      difficulty: "hard", name: "GROUP BY cu HAVING",
      question: "Numără comenzile per client, afișează doar clienții cu > 2 comenzi.",
      starterCode: "-- TODO: SELECT cu GROUP BY și HAVING\n",
      expectedOutput: "",
      language: "sql"
    },
    {
      difficulty: "hard", name: "Subquery",
      question: "Găsește produsele cu prețul peste media tuturor produselor.",
      starterCode: "-- TODO: SELECT cu subquery în WHERE\n",
      expectedOutput: "",
      language: "sql"
    },
  ]
};

TOPICS["sql::joins"] = {
  fillblanks: [
    {
      difficulty: "easy", name: "INNER JOIN",
      question: "Completează pentru a junta tabelele:\n```sql\nSELECT * FROM orders\n___ JOIN customers ON orders.customer_id = customers.id;\n```",
      answer: "INNER",
      explanation: "INNER JOIN returnează rândurile cu potriviri în ambele tabele."
    },
    {
      difficulty: "medium", name: "LEFT JOIN",
      question: "Completează pentru a include toți utilizatorii (chiar fără comenzi):\n```sql\nSELECT * FROM users\n___ JOIN orders ON users.id = orders.user_id;\n```",
      answer: "LEFT",
      explanation: "LEFT JOIN returnează toate rândurile din tabelul stâng, chiar dacă nu au corespondent."
    },
    {
      difficulty: "medium", name: "Aliasuri",
      question: "Completează aliasul pentru tabel:\n```sql\nSELECT u.name FROM users ___ u\nJOIN orders o ON u.id = o.user_id;\n```",
      answer: "AS",
      explanation: "AS definește un alias (sau poate fi omis, punând doar aliasul după tabel)."
    },
    {
      difficulty: "hard", name: "Multi-join",
      question: "Completează al doilea join:\n```sql\nSELECT * FROM orders o\nJOIN customers c ON o.customer_id = c.id\n___ JOIN products p ON o.product_id = p.id;\n```",
      answer: "JOIN",
      explanation: "Pot fi concatenate mai multe JOIN-uri pentru a combina mai mult de două tabele."
    },
    {
      difficulty: "hard", name: "Self join",
      question: "Completează pentru un self-join (angajat și managerul său):\n```sql\nSELECT e.name, m.name as manager\nFROM employees e\n___ JOIN employees m ON e.manager_id = m.id;\n```",
      answer: "LEFT",
      explanation: "Self-join juntează un tabel cu el însuși; LEFT JOIN include și angajații fără manager."
    },
  ],
  codings: [
    {
      difficulty: "easy", name: "JOIN simplu",
      question: "Scrie query care aduce comenzile cu numele clienților.",
      starterCode: "-- TODO: SELECT cu INNER JOIN orders și customers\n",
      expectedOutput: "",
      language: "sql"
    },
    {
      difficulty: "medium", name: "LEFT JOIN",
      question: "Aduce toți utilizatorii și numărul lor de comenzi (inclusiv 0).",
      starterCode: "-- TODO: LEFT JOIN cu COUNT și GROUP BY\n",
      expectedOutput: "",
      language: "sql"
    },
    {
      difficulty: "medium", name: "Multi-table",
      question: "Aduce orders cu customer name și product name.",
      starterCode: "-- TODO: JOIN cu 3 tabele\n",
      expectedOutput: "",
      language: "sql"
    },
    {
      difficulty: "hard", name: "JOIN cu agregare",
      question: "Total vânzări per categorie de produse.",
      starterCode: "-- TODO: JOIN products, categories, SUM cu GROUP BY\n",
      expectedOutput: "",
      language: "sql"
    },
    {
      difficulty: "hard", name: "Raport complex",
      question: "Top 3 clienți după valoarea totală a comenzilor.",
      starterCode: "-- TODO: JOIN, SUM, GROUP BY, ORDER BY, LIMIT 3\n",
      expectedOutput: "",
      language: "sql"
    },
  ]
};

// ─────────────────────────────────────────────
// PHP TOPICS
// ─────────────────────────────────────────────

TOPICS["php::intro"] = {
  fillblanks: [
    {
      difficulty: "easy", name: "Echo",
      question: "Completează pentru afișare în PHP:\n```php\n<?php\n___(\"Hello, World!\");\n```",
      answer: "echo",
      explanation: "echo afișează text în PHP; nu este o funcție, nu necesită paranteze."
    },
    {
      difficulty: "easy", name: "Variabilă PHP",
      question: "Completează prefixul variabilelor PHP:\n```php\n___varsta = 25;\necho $varsta;\n```",
      answer: "$",
      explanation: "În PHP, toate variabilele încep cu $ (dollar sign)."
    },
    {
      difficulty: "medium", name: "Array PHP",
      question: "Completează pentru a crea un array:\n```php\n$fructe = ___(\"mar\", \"para\", \"cireasa\");\n```",
      answer: "array",
      explanation: "array() sau [] creează un array în PHP."
    },
    {
      difficulty: "medium", name: "Foreach PHP",
      question: "Completează sintaxa foreach:\n```php\n___ ($arr as $val) {\n  echo $val;\n}\n```",
      answer: "foreach",
      explanation: "foreach iterează fiecare element al unui array."
    },
    {
      difficulty: "hard", name: "Funcție PHP",
      question: "Completează cuvântul cheie pentru funcție:\n```php\n___ suma($a, $b) {\n  return $a + $b;\n}\n```",
      answer: "function",
      explanation: "function definește o funcție în PHP."
    },
  ],
  codings: [
    {
      difficulty: "easy", name: "Hello PHP",
      question: "Afișează 'Hello, World!' în PHP:\n```\nHello, World!\n```",
      starterCode: "<?php\n// TODO\n",
      expectedOutput: "Hello, World!",
      language: "php"
    },
    {
      difficulty: "easy", name: "Variabile și calcul",
      question: "Calculează și afișează 15 * 7:\n```\n105\n```",
      starterCode: "<?php\n$a = 15;\n$b = 7;\n// TODO: afișează produsul\n",
      expectedOutput: "105",
      language: "php"
    },
    {
      difficulty: "medium", name: "Array și foreach",
      question: "Afișează fiecare element din array pe linie separată:\n```\nmar\npara\ncireasa\n```",
      starterCode: "<?php\n$fructe = [\"mar\", \"para\", \"cireasa\"];\nforeach ($fructe as $f) {\n    // TODO: echo cu newline\n}\n",
      expectedOutput: "mar\npara\ncireasa",
      language: "php"
    },
    {
      difficulty: "hard", name: "Funcție recursivă PHP",
      question: "Factorial(5) recursiv în PHP:\n```\n120\n```",
      starterCode: "<?php\nfunction factorial($n) {\n    if ($n <= 1) return 1;\n    return $n * factorial($n - 1);\n}\necho factorial(5) . \"\\n\";\n",
      expectedOutput: "120",
      language: "php"
    },
    {
      difficulty: "hard", name: "Array functions",
      question: "Filtrează numerele pare din array și afișează suma:\n```\n30\n```",
      starterCode: "<?php\n$numere = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];\n$pare = array_filter($numere, fn($n) => $n % 2 === 0);\necho array_sum($pare) . \"\\n\";\n",
      expectedOutput: "30",
      language: "php"
    },
  ]
};

// ─────────────────────────────────────────────
// CYBERSECURITY TOPICS
// ─────────────────────────────────────────────

TOPICS["cybersecurity::xss"] = {
  fillblanks: [
    {
      difficulty: "easy", name: "XSS tip",
      question: "XSS înseamnă Cross-Site ___ing:\n```\nCross-Site ___ing\n```",
      answer: "Script",
      explanation: "XSS (Cross-Site Scripting) este o vulnerabilitate ce permite injectarea de cod JS malițios."
    },
    {
      difficulty: "easy", name: "Sanitizare",
      question: "Completează funcția care escapează HTML entities:\n```js\nfunction sanitize(str) {\n  return str.replace(/</g, '&___');\n}\n```",
      answer: "lt;",
      explanation: "&lt; este HTML entity pentru < ; previne interpretarea tag-urilor HTML."
    },
    {
      difficulty: "medium", name: "Content Security Policy",
      question: "Completează header-ul pentru CSP:\n```\n___ -Security-Policy: default-src 'self'\n```",
      answer: "Content",
      explanation: "Content-Security-Policy header definește sursele permise de conținut."
    },
    {
      difficulty: "medium", name: "HttpOnly cookie",
      question: "Completează atributul care previne accesul JS la cookie:\n```\nSet-Cookie: session=abc; ___Only\n```",
      answer: "Http",
      explanation: "HttpOnly previne accesul la cookie prin document.cookie, protejând împotriva XSS."
    },
    {
      difficulty: "hard", name: "DOMPurify",
      question: "Completează pentru a sanitiza HTML cu DOMPurify:\n```js\nconst safe = DOMPurify.___(userInput);\n```",
      answer: "sanitize",
      explanation: "DOMPurify.sanitize() elimină conținut periculos din HTML înainte de inserție în DOM."
    },
  ],
  codings: [
    {
      difficulty: "easy", name: "Sanitizare HTML",
      question: "Scrie funcția care înlocuiește < și > cu entities:\n```\n&lt;script&gt;\n```",
      starterCode: "function sanitize(str) {\n  return str.replace(/</g, '&lt;').replace(/>/g, '&gt;');\n}\nconsole.log(sanitize('<script>'));\n",
      expectedOutput: "&lt;script&gt;",
      language: "javascript"
    },
    {
      difficulty: "medium", name: "Validare input",
      question: "Funcție care verifică dacă un email este valid (conține @):\n```\ntrue\nfalse\n```",
      starterCode: "function esteEmailValid(email) {\n  return email.includes('@') && email.includes('.');\n}\nconsole.log(esteEmailValid('test@example.com'));\nconsole.log(esteEmailValid('invalid-email'));\n",
      expectedOutput: "true\nfalse",
      language: "javascript"
    },
    {
      difficulty: "medium", name: "Escape caractere",
      question: "Escape toate caracterele speciale HTML:\n```\n&lt;b&gt;bold&lt;/b&gt; &amp; &lt;i&gt;italic&lt;/i&gt;\n```",
      starterCode: "function escapeHtml(str) {\n  return str\n    .replace(/&/g, '&amp;')\n    .replace(/</g, '&lt;')\n    .replace(/>/g, '&gt;');\n}\nconsole.log(escapeHtml('<b>bold</b> & <i>italic</i>'));\n",
      expectedOutput: "&lt;b&gt;bold&lt;/b&gt; &amp; &lt;i&gt;italic&lt;/i&gt;",
      language: "javascript"
    },
    {
      difficulty: "hard", name: "CSP header",
      question: "Creează un header CSP care permite doar same-origin scripts:\n```\nContent-Security-Policy: default-src 'self'; script-src 'self'\n```",
      starterCode: "// Construiește header-ul CSP\nconst csp = {\n  'default-src': \"'self'\",\n  'script-src': \"'self'\"\n};\nconst headerValue = Object.entries(csp)\n  .map(([k, v]) => `${k} ${v}`)\n  .join('; ');\nconsole.log(`Content-Security-Policy: ${headerValue}`);\n",
      expectedOutput: "Content-Security-Policy: default-src 'self'; script-src 'self'",
      language: "javascript"
    },
    {
      difficulty: "hard", name: "Rate limiting simulat",
      question: "Simulează rate limiting: max 3 requesturi per IP, al 4-lea blochează:\n```\nOK\nOK\nOK\nBlocat\n```",
      starterCode: "const requestCounts = {};\nfunction handleRequest(ip) {\n  requestCounts[ip] = (requestCounts[ip] || 0) + 1;\n  if (requestCounts[ip] > 3) return 'Blocat';\n  return 'OK';\n}\nconsole.log(handleRequest('1.2.3.4'));\nconsole.log(handleRequest('1.2.3.4'));\nconsole.log(handleRequest('1.2.3.4'));\nconsole.log(handleRequest('1.2.3.4'));\n",
      expectedOutput: "OK\nOK\nOK\nBlocat",
      language: "javascript"
    },
  ]
};

// ─────────────────────────────────────────────
// FALLBACK GENERIC TOPICS
// ─────────────────────────────────────────────

TOPICS["generic::programming"] = {
  fillblanks: [
    {
      difficulty: "easy", name: "Variabilă",
      question: "O variabilă stochează o ___ în memorie.",
      answer: "valoare",
      explanation: "Variabilele sunt containere numite pentru stocarea valorilor în memorie."
    },
    {
      difficulty: "easy", name: "Funcție",
      question: "O funcție este un bloc de cod ___ care poate fi apelat de mai multe ori.",
      answer: "reutilizabil",
      explanation: "Funcțiile evită duplicarea codului prin encapsularea logicii reutilizabile."
    },
    {
      difficulty: "medium", name: "Buclă",
      question: "O buclă execută un bloc de cod în mod ___ cât timp condiția este adevărată.",
      answer: "repetat",
      explanation: "Buclele (for, while) repetă execuția unui bloc până când condiția devine falsă."
    },
    {
      difficulty: "medium", name: "Array",
      question: "Un array stochează mai multe valori de același tip în locații de memorie ___.",
      answer: "consecutive",
      explanation: "Array-urile stochează elemente contiguous în memorie, accesibile prin index."
    },
    {
      difficulty: "hard", name: "Recursivitate",
      question: "O funcție recursivă se apelează pe ea ___ și trebuie să aibă un caz de bază.",
      answer: "însăși",
      explanation: "Recursivitatea este tehnica în care o funcție se apelează cu un subproblem mai mic."
    },
  ],
  codings: [
    {
      difficulty: "easy", name: "Calcul simplu",
      question: "Calculează și afișează 2 la puterea 10.",
      starterCode: "// TODO: calculează și afișează 2^10\n",
      expectedOutput: "1024",
      language: "javascript"
    },
    {
      difficulty: "easy", name: "String inversare",
      question: "Inversează string-ul 'hello'.",
      starterCode: "const s = 'hello';\n// TODO: afișează inversat\n",
      expectedOutput: "olleh",
      language: "javascript"
    },
    {
      difficulty: "medium", name: "Fibonacci",
      question: "Afișează primele 8 numere Fibonacci.",
      starterCode: "let a = 0, b = 1;\nfor (let i = 0; i < 8; i++) {\n  console.log(a);\n  [a, b] = [b, a + b];\n}\n",
      expectedOutput: "0\n1\n1\n2\n3\n5\n8\n13",
      language: "javascript"
    },
    {
      difficulty: "medium", name: "Palindrom",
      question: "Verifică dacă 'racecar' este palindrom.",
      starterCode: "const s = 'racecar';\nconst isPalindrome = s === s.split('').reverse().join('');\nconsole.log(isPalindrome);\n",
      expectedOutput: "true",
      language: "javascript"
    },
    {
      difficulty: "hard", name: "Sumă cifre",
      question: "Calculează suma cifrelor lui 12345.",
      starterCode: "const n = 12345;\nconst suma = String(n).split('').reduce((s, d) => s + parseInt(d), 0);\nconsole.log(suma);\n",
      expectedOutput: "15",
      language: "javascript"
    },
  ]
};

// ─────────────────────────────────────────────
// MATCHING FUNCTION
// ─────────────────────────────────────────────

function matchTopic(title, moduleSlug) {
  const t = title.toLowerCase();
  const s = moduleSlug.toLowerCase();

  if (s === "python") {
    if (t.includes("print") || t.includes("introducere") || t.includes("afis")) return TOPICS["python::print"];
    if (t.includes("variabil") || t.includes("tipuri de date") || t.includes("tipuri")) return TOPICS["python::variabile"];
    if (t.includes("input") || t.includes("citire")) return TOPICS["python::input"];
    if (t.includes("operator")) return TOPICS["python::operatori"];
    if (t.includes("if") || t.includes("conditi") || t.includes("decizie")) return TOPICS["python::if"];
    if (t.includes("while")) return TOPICS["python::while"];
    if (t.includes("for") || t.includes("range")) return TOPICS["python::for"];
    if (t.includes("list") || t.includes("array")) return TOPICS["python::liste"];
    if (t.includes("string") || t.includes("sir") || t.includes("text")) return TOPICS["python::strings"];
    if (t.includes("dictionar") || t.includes("dict") || t.includes("hash")) return TOPICS["python::dict"];
    if (t.includes("tuplu") || t.includes("set") || t.includes("tuple")) return TOPICS["python::tuple-set"] || TOPICS["python::dict"];
    if (t.includes("functii avansate") || t.includes("*args") || t.includes("**kwargs")) return TOPICS["python::functii-avansate"] || TOPICS["python::functii"];
    if (t.includes("functii") || t.includes("functie") || t.includes("def ")) return TOPICS["python::functii"];
    if (t.includes("erori") || t.includes("exceptii") || t.includes("try")) return TOPICS["python::erori"];
    if (t.includes("mostenire") || t.includes("mosteniri") || t.includes("inherit")) return TOPICS["python::mostenire"];
    if (t.includes("oop") || t.includes("clase") || t.includes("obiecte") || t.includes("clasa")) return TOPICS["python::oop"];
    if (t.includes("comprehension") || t.includes("list comp")) return TOPICS["python::comprehensions"];
    if (t.includes("lambda") || t.includes("map") || t.includes("filter") || t.includes("reduce")) return TOPICS["python::lambda"];
    return TOPICS["python::print"];
  }

  if (s === "javascript") {
    if (t.includes("variabil") || t.includes("let") || t.includes("const") || t.includes("var ")) return TOPICS["javascript::variabile"];
    if (t.includes("async") || t.includes("await") || t.includes("promise") || t.includes("callback")) return TOPICS["javascript::async"];
    if (t.includes("closure") || t.includes("scope") || t.includes("inchidere")) return TOPICS["javascript::functii"];
    if (t.includes("array") || t.includes("tablou") || t.includes("map") || t.includes("filter")) return TOPICS["javascript::array"];
    if (t.includes("obiec") || t.includes("object") || t.includes("json")) return TOPICS["javascript::obiecte"];
    if (t.includes("functii") || t.includes("functie") || t.includes("arrow") || t.includes("hof")) return TOPICS["javascript::functii"];
    if (t.includes("for") || t.includes("while") || t.includes("bucl")) return TOPICS["javascript::array"];
    if (t.includes("string") || t.includes("sir")) return TOPICS["javascript::variabile"];
    return TOPICS["javascript::variabile"];
  }

  if (s === "html") {
    if (t.includes("formul") || t.includes("input") || t.includes("form")) return TOPICS["html::formulare"];
    return TOPICS["html::structura"];
  }

  if (s === "css") {
    if (t.includes("grid")) return TOPICS["css::grid"];
    if (t.includes("flex") || t.includes("flexbox")) return TOPICS["css::flexbox"];
    return TOPICS["css::selectori"];
  }

  if (s === "tailwind") return TOPICS["tailwind::intro"];

  if (s === "react") {
    if (t.includes("state") || t.includes("usestate") || t.includes("hook") || t.includes("useState")) return TOPICS["react::useState"];
    return TOPICS["react::componente"];
  }

  if (s === "nextjs-frontend") return TOPICS["nextjs-frontend::routing"];
  if (s === "nextjs-backend") return TOPICS["nextjs-backend::api"];

  if (s === "c") {
    if (t.includes("pointer") || t.includes("adrse") || t.includes("memorie")) return TOPICS["c::pointeri"];
    return TOPICS["c::intro"];
  }

  if (s === "cpp") return TOPICS["cpp::intro"];
  if (s === "csharp") return TOPICS["csharp::intro"];
  if (s === "java") return TOPICS["java::intro"];
  if (s === "php") return TOPICS["php::intro"];

  if (s === "sql") {
    if (t.includes("join") || t.includes("relati")) return TOPICS["sql::joins"];
    return TOPICS["sql::select"];
  }

  if (s === "cybersecurity") return TOPICS["cybersecurity::xss"];

  return TOPICS["generic::programming"];
}

// ─────────────────────────────────────────────
// MAIN
// ─────────────────────────────────────────────

async function main() {
  const modules = await p.module.findMany({
    include: {
      lessons: { include: { tasks: true }, orderBy: { order: "asc" } },
    },
    orderBy: { order: "asc" },
  });

  let replaced = 0;
  let skipped = 0;

  for (const mod of modules) {
    const lang = MODULE_LANG[mod.slug] || "javascript";
    console.log(`\nModul: ${mod.slug} (${mod.lessons.length} lecții)`);

    for (const lesson of mod.lessons) {
      const topic = matchTopic(lesson.title, mod.slug);

      if (!topic) {
        skipped++;
        continue;
      }

      // Șterge fill + coding existente
      await p.task.deleteMany({
        where: { lessonId: lesson.id, type: { in: ["fillblank", "coding"] } },
      });

      // Asigură max 5 quiz-uri, sortate easy→medium→hard, renumerotate 1-5
      // Și shuffle opțiunile astfel încât răspunsul corect nu e mereu la același index
      const DIFF_ORDER = { easy: 0, medium: 1, hard: 2 };

      const quizTasks = await p.task.findMany({
        where: { lessonId: lesson.id, type: "quiz" },
        orderBy: { number: "asc" },
      });

      if (quizTasks.length > 5) {
        const excess = quizTasks.slice(5);
        await p.task.deleteMany({ where: { id: { in: excess.map((t) => t.id) } } });
      }

      // Sortează easy → medium → hard
      const remaining = quizTasks
        .slice(0, 5)
        .sort((a, b) => (DIFF_ORDER[a.difficulty] ?? 1) - (DIFF_ORDER[b.difficulty] ?? 1));

      for (let i = 0; i < remaining.length; i++) {
        const t = remaining[i];
        // Shuffle options so correct answer is at a random position
        const opts = t.options?.length ? [...t.options] : [];
        for (let j = opts.length - 1; j > 0; j--) {
          const k = Math.floor(Math.random() * (j + 1));
          [opts[j], opts[k]] = [opts[k], opts[j]];
        }
        await p.task.update({
          where: { id: t.id },
          data: { number: i + 1, options: opts },
        });
      }

      // Inserează fillblanks la numerele 6-10
      let num = 6;
      for (const f of topic.fillblanks) {
        await p.task.create({
          data: {
            lessonId: lesson.id,
            number: num++,
            type: "fillblank",
            difficulty: f.difficulty,
            name: f.name,
            question: f.question,
            answer: f.answer.trim(),
            explanation: f.explanation || null,
            options: [],
            language: lang,
          },
        });
      }

      // Inserează codings la numerele 11-15
      for (const c of topic.codings) {
        await p.task.create({
          data: {
            lessonId: lesson.id,
            number: num++,
            type: "coding",
            difficulty: c.difficulty,
            name: c.name,
            question: c.question,
            answer: "",
            starterCode: c.starterCode,
            expectedOutput: (c.expectedOutput || "").trim(),
            options: [],
            language: c.language || lang,
          },
        });
      }

      replaced += topic.fillblanks.length + topic.codings.length;
    }
  }

  console.log(`\n${"=".repeat(50)}`);
  console.log(`Replaced: ${replaced} tasks`);
  console.log(`Skipped:  ${skipped} lessons`);
  console.log("=".repeat(50));
}

main()
  .catch(console.error)
  .finally(() => p.$disconnect());
