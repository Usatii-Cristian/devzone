"use strict";
require("dotenv").config({ path: ".env" });
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const FIXES = [
  // 1. "2. Variabile și tipuri"
  {
    lessonId: "69fb73a504cba28ef36a337f",
    name: "2. Variabile și tipuri",
    tasks: [
      { number: 6, type: "fillblank", difficulty: "medium", question: "Completează tipul de date pentru a declara un număr întreg:\n```c\n___ varsta = 25;\nprintf(\"%d\", varsta);\n```", answer: "int", starterCode: "", language: "c", expectedOutput: "" },
      { number: 7, type: "fillblank", difficulty: "medium", question: "Completează tipul potrivit pentru un număr cu virgulă:\n```c\n___ pret = 19.99;\nprintf(\"%.2f\", pret);\n```", answer: "float", starterCode: "", language: "c", expectedOutput: "" },
      { number: 8, type: "fillblank", difficulty: "medium", question: "Ce se afișează?\n```c\nchar litera = 'A';\nprintf(\"%c\", litera);\n```\nRăspuns: `___`", answer: "A", starterCode: "", language: "c", expectedOutput: "" },
      { number: 9, type: "fillblank", difficulty: "medium", question: "Completează specificatorul de format pentru `double`:\n```c\ndouble pi = 3.14;\nprintf(\"___\", pi);\n```", answer: "%lf", starterCode: "", language: "c", expectedOutput: "" },
      { number: 10, type: "fillblank", difficulty: "medium", question: "Ce valoare are `x` după instrucțiune?\n```c\nint x = 10;\nx += 5;\n// x = ___\n```", answer: "15", starterCode: "", language: "c", expectedOutput: "" },
      { number: 11, type: "coding", difficulty: "medium", question: "Declară variabilele `int a = 3`, `int b = 7` și afișează suma lor.", answer: "#include <stdio.h>\nint main() {\n    int a = 3, b = 7;\n    printf(\"%d\", a + b);\n    return 0;\n}", starterCode: "", language: "c", expectedOutput: "10" },
      { number: 12, type: "coding", difficulty: "medium", question: "Declară `float x = 5.5` și `float y = 2.2` și afișează produsul cu două zecimale.", answer: "#include <stdio.h>\nint main() {\n    float x = 5.5, y = 2.2;\n    printf(\"%.2f\", x * y);\n    return 0;\n}", starterCode: "", language: "c", expectedOutput: "12.10" },
      { number: 13, type: "coding", difficulty: "medium", question: "Afișează caracterul cu codul ASCII 66 folosind `%c`.", answer: "#include <stdio.h>\nint main() {\n    printf(\"%c\", 66);\n    return 0;\n}", starterCode: "", language: "c", expectedOutput: "B" },
      { number: 14, type: "coding", difficulty: "medium", question: "Declară `int n = 100` și afișează restul împărțirii lui la 7.", answer: "#include <stdio.h>\nint main() {\n    int n = 100;\n    printf(\"%d\", n % 7);\n    return 0;\n}", starterCode: "", language: "c", expectedOutput: "2" },
      { number: 15, type: "coding", difficulty: "medium", question: "Afișează dimensiunea tipului `double` în octeți folosind `sizeof`.", answer: "#include <stdio.h>\nint main() {\n    printf(\"%zu\", sizeof(double));\n    return 0;\n}", starterCode: "", language: "c", expectedOutput: "8" },
    ],
  },
  // 2. "3. Input/Output cu scanf"
  {
    lessonId: "69fb73a604cba28ef36a338b",
    name: "3. Input/Output cu scanf",
    tasks: [
      { number: 6, type: "fillblank", difficulty: "medium", question: "Completează funcția de citire a unui întreg:\n```c\nint n;\n___(\"Introdu un număr: \");\nscanf(\"%d\", &n);\n```", answer: "printf", starterCode: "", language: "c", expectedOutput: "" },
      { number: 7, type: "fillblank", difficulty: "medium", question: "Ce operator este necesar pentru `scanf`?\n```c\nint x;\nscanf(\"%d\", ___x);\n```", answer: "&", starterCode: "", language: "c", expectedOutput: "" },
      { number: 8, type: "fillblank", difficulty: "medium", question: "Completează specificatorul pentru citirea unui `float`:\n```c\nfloat f;\nscanf(\"___\", &f);\n```", answer: "%f", starterCode: "", language: "c", expectedOutput: "" },
      { number: 9, type: "fillblank", difficulty: "medium", question: "Ce se afișează?\n```c\nint a = 5, b = 3;\nprintf(\"%d + %d = %d\", a, b, a + b);\n```\nRăspuns: `___`", answer: "5 + 3 = 8", starterCode: "", language: "c", expectedOutput: "" },
      { number: 10, type: "fillblank", difficulty: "medium", question: "Completează pentru a citi un caracter:\n```c\nchar c;\nscanf(\" ___ \", &c);\n```", answer: "%c", starterCode: "", language: "c", expectedOutput: "" },
      { number: 11, type: "coding", difficulty: "medium", question: "Afișează `Salut, C!` pe ecran.", answer: "#include <stdio.h>\nint main() {\n    printf(\"Salut, C!\");\n    return 0;\n}", starterCode: "", language: "c", expectedOutput: "Salut, C!" },
      { number: 12, type: "coding", difficulty: "medium", question: "Afișează numerele 1, 2 și 3 separate prin spații pe o singură linie.", answer: "#include <stdio.h>\nint main() {\n    printf(\"%d %d %d\", 1, 2, 3);\n    return 0;\n}", starterCode: "", language: "c", expectedOutput: "1 2 3" },
      { number: 13, type: "coding", difficulty: "medium", question: "Afișează `42` folosind `%d`.", answer: "#include <stdio.h>\nint main() {\n    int x = 42;\n    printf(\"%d\", x);\n    return 0;\n}", starterCode: "", language: "c", expectedOutput: "42" },
      { number: 14, type: "coding", difficulty: "medium", question: "Afișează `3.14` cu două zecimale.", answer: "#include <stdio.h>\nint main() {\n    printf(\"%.2f\", 3.14);\n    return 0;\n}", starterCode: "", language: "c", expectedOutput: "3.14" },
      { number: 15, type: "coding", difficulty: "medium", question: "Afișează literele `A`, `B`, `C` fiecare pe câte o linie.", answer: "#include <stdio.h>\nint main() {\n    printf(\"A\\nB\\nC\");\n    return 0;\n}", starterCode: "", language: "c", expectedOutput: "A\nB\nC" },
    ],
  },
  // 3. "4. Operatori"
  {
    lessonId: "69fb73a804cba28ef36a3397",
    name: "4. Operatori",
    tasks: [
      { number: 6, type: "fillblank", difficulty: "medium", question: "Ce valoare returnează expresia `10 % 3`?\n```c\nprintf(\"%d\", 10 % 3);\n// Răspuns: ___\n```", answer: "1", starterCode: "", language: "c", expectedOutput: "" },
      { number: 7, type: "fillblank", difficulty: "medium", question: "Completează operatorul de incrementare:\n```c\nint x = 5;\n___x;\nprintf(\"%d\", x); // 6\n```", answer: "++", starterCode: "", language: "c", expectedOutput: "" },
      { number: 8, type: "fillblank", difficulty: "medium", question: "Ce se afișează?\n```c\nint a = 4, b = 2;\nprintf(\"%d\", a / b);\n// Răspuns: ___\n```", answer: "2", starterCode: "", language: "c", expectedOutput: "" },
      { number: 9, type: "fillblank", difficulty: "medium", question: "Completează operatorul de atribuire compusă:\n```c\nint n = 10;\nn ___ 3;\nprintf(\"%d\", n); // 13\n```", answer: "+=", starterCode: "", language: "c", expectedOutput: "" },
      { number: 10, type: "fillblank", difficulty: "medium", question: "Ce valoare are `y`?\n```c\nint x = 3;\nint y = x * x + 1;\n// y = ___\n```", answer: "10", starterCode: "", language: "c", expectedOutput: "" },
      { number: 11, type: "coding", difficulty: "medium", question: "Calculează și afișează câtul întreg al împărțirii lui 17 la 4.", answer: "#include <stdio.h>\nint main() {\n    printf(\"%d\", 17 / 4);\n    return 0;\n}", starterCode: "", language: "c", expectedOutput: "4" },
      { number: 12, type: "coding", difficulty: "medium", question: "Afișează restul împărțirii lui 23 la 5.", answer: "#include <stdio.h>\nint main() {\n    printf(\"%d\", 23 % 5);\n    return 0;\n}", starterCode: "", language: "c", expectedOutput: "3" },
      { number: 13, type: "coding", difficulty: "medium", question: "Declară `int a = 8`, decrementează-l și afișează valoarea nouă.", answer: "#include <stdio.h>\nint main() {\n    int a = 8;\n    a--;\n    printf(\"%d\", a);\n    return 0;\n}", starterCode: "", language: "c", expectedOutput: "7" },
      { number: 14, type: "coding", difficulty: "medium", question: "Afișează rezultatul expresiei `2 * (3 + 4) - 1`.", answer: "#include <stdio.h>\nint main() {\n    printf(\"%d\", 2 * (3 + 4) - 1);\n    return 0;\n}", starterCode: "", language: "c", expectedOutput: "13" },
      { number: 15, type: "coding", difficulty: "medium", question: "Afișează `1` dacă `7 > 5`, altfel `0` (folosind expresia direct în printf).", answer: "#include <stdio.h>\nint main() {\n    printf(\"%d\", 7 > 5);\n    return 0;\n}", starterCode: "", language: "c", expectedOutput: "1" },
    ],
  },
  // 4. "5. Condiții — if/else/switch"
  {
    lessonId: "69fb73aa04cba28ef36a33a3",
    name: "5. Condiții — if/else/switch",
    tasks: [
      { number: 6, type: "fillblank", difficulty: "medium", question: "Completează cuvântul cheie lipsă:\n```c\nint x = 10;\nif (x > 5) {\n    printf(\"mare\");\n} ___ {\n    printf(\"mic\");\n}\n```", answer: "else", starterCode: "", language: "c", expectedOutput: "" },
      { number: 7, type: "fillblank", difficulty: "medium", question: "Ce se afișează?\n```c\nint n = 3;\nswitch (n) {\n    case 1: printf(\"unu\"); break;\n    case 3: printf(\"trei\"); break;\n    default: printf(\"altul\");\n}\n// Răspuns: ___\n```", answer: "trei", starterCode: "", language: "c", expectedOutput: "" },
      { number: 8, type: "fillblank", difficulty: "medium", question: "Completează pentru a evita fall-through în switch:\n```c\nswitch (x) {\n    case 1: printf(\"unu\"); ___;\n    case 2: printf(\"doi\"); break;\n}\n```", answer: "break", starterCode: "", language: "c", expectedOutput: "" },
      { number: 9, type: "fillblank", difficulty: "medium", question: "Ce se afișează?\n```c\nint a = 5, b = 5;\nif (a == b)\n    printf(\"egal\");\nelse\n    printf(\"diferit\");\n// Răspuns: ___\n```", answer: "egal", starterCode: "", language: "c", expectedOutput: "" },
      { number: 10, type: "fillblank", difficulty: "medium", question: "Completează condiția compusă:\n```c\nint x = 15;\nif (x > 10 ___ x < 20)\n    printf(\"interval\");\n```", answer: "&&", starterCode: "", language: "c", expectedOutput: "" },
      { number: 11, type: "coding", difficulty: "medium", question: "Afișează `pozitiv` dacă `n = 7`, altfel `negativ`.", answer: "#include <stdio.h>\nint main() {\n    int n = 7;\n    if (n > 0) printf(\"pozitiv\");\n    else printf(\"negativ\");\n    return 0;\n}", starterCode: "", language: "c", expectedOutput: "pozitiv" },
      { number: 12, type: "coding", difficulty: "medium", question: "Afișează `par` dacă `n = 8` este par, altfel `impar`.", answer: "#include <stdio.h>\nint main() {\n    int n = 8;\n    if (n % 2 == 0) printf(\"par\");\n    else printf(\"impar\");\n    return 0;\n}", starterCode: "", language: "c", expectedOutput: "par" },
      { number: 13, type: "coding", difficulty: "medium", question: "Folosind switch, afișează `luni` pentru `zi = 1`, `marti` pentru `zi = 2`, altfel `alta zi`.", answer: "#include <stdio.h>\nint main() {\n    int zi = 2;\n    switch (zi) {\n        case 1: printf(\"luni\"); break;\n        case 2: printf(\"marti\"); break;\n        default: printf(\"alta zi\");\n    }\n    return 0;\n}", starterCode: "", language: "c", expectedOutput: "marti" },
      { number: 14, type: "coding", difficulty: "medium", question: "Afișează maximul dintre `a = 9` și `b = 4`.", answer: "#include <stdio.h>\nint main() {\n    int a = 9, b = 4;\n    if (a > b) printf(\"%d\", a);\n    else printf(\"%d\", b);\n    return 0;\n}", starterCode: "", language: "c", expectedOutput: "9" },
      { number: 15, type: "coding", difficulty: "medium", question: "Afișează `divizibil` dacă `n = 15` este divizibil cu 3, altfel `nu`.", answer: "#include <stdio.h>\nint main() {\n    int n = 15;\n    if (n % 3 == 0) printf(\"divizibil\");\n    else printf(\"nu\");\n    return 0;\n}", starterCode: "", language: "c", expectedOutput: "divizibil" },
    ],
  },
  // 5. "6. Bucle: for, while, do-while"
  {
    lessonId: "69fb73ab04cba28ef36a33af",
    name: "6. Bucle: for, while, do-while",
    tasks: [
      { number: 6, type: "fillblank", difficulty: "medium", question: "Completează condiția buclei pentru a afișa 1..5:\n```c\nfor (int i = 1; ___ <= 5; i++)\n    printf(\"%d \", i);\n```", answer: "i", starterCode: "", language: "c", expectedOutput: "" },
      { number: 7, type: "fillblank", difficulty: "medium", question: "Ce cuvânt cheie oprește imediat bucla?\n```c\nfor (int i = 0; i < 10; i++) {\n    if (i == 3) ___;\n    printf(\"%d \", i);\n}\n```", answer: "break", starterCode: "", language: "c", expectedOutput: "" },
      { number: 8, type: "fillblank", difficulty: "medium", question: "Ce se afișează?\n```c\nint s = 0;\nfor (int i = 1; i <= 3; i++) s += i;\nprintf(\"%d\", s);\n// Răspuns: ___\n```", answer: "6", starterCode: "", language: "c", expectedOutput: "" },
      { number: 9, type: "fillblank", difficulty: "medium", question: "Completează structura do-while:\n```c\nint i = 0;\n___ {\n    printf(\"%d \", i++);\n} while (i < 3);\n```", answer: "do", starterCode: "", language: "c", expectedOutput: "" },
      { number: 10, type: "fillblank", difficulty: "medium", question: "Ce cuvânt cheie sare la iterația următoare?\n```c\nfor (int i = 0; i < 5; i++) {\n    if (i == 2) ___;\n    printf(\"%d \", i);\n}\n```", answer: "continue", starterCode: "", language: "c", expectedOutput: "" },
      { number: 11, type: "coding", difficulty: "medium", question: "Afișează numerele de la 1 la 5 separate prin spații.", answer: "#include <stdio.h>\nint main() {\n    for (int i = 1; i <= 5; i++)\n        printf(\"%d \", i);\n    return 0;\n}", starterCode: "", language: "c", expectedOutput: "1 2 3 4 5 " },
      { number: 12, type: "coding", difficulty: "medium", question: "Calculează și afișează suma numerelor de la 1 la 10.", answer: "#include <stdio.h>\nint main() {\n    int s = 0;\n    for (int i = 1; i <= 10; i++) s += i;\n    printf(\"%d\", s);\n    return 0;\n}", starterCode: "", language: "c", expectedOutput: "55" },
      { number: 13, type: "coding", difficulty: "medium", question: "Afișează numerele pare de la 2 la 10 separate prin spații.", answer: "#include <stdio.h>\nint main() {\n    for (int i = 2; i <= 10; i += 2)\n        printf(\"%d \", i);\n    return 0;\n}", starterCode: "", language: "c", expectedOutput: "2 4 6 8 10 " },
      { number: 14, type: "coding", difficulty: "medium", question: "Folosind while, afișează `5 4 3 2 1` (descrescător).", answer: "#include <stdio.h>\nint main() {\n    int i = 5;\n    while (i >= 1) {\n        printf(\"%d \", i);\n        i--;\n    }\n    return 0;\n}", starterCode: "", language: "c", expectedOutput: "5 4 3 2 1 " },
      { number: 15, type: "coding", difficulty: "medium", question: "Afișează primul număr mai mare decât 20 care este divizibil cu 7.", answer: "#include <stdio.h>\nint main() {\n    int i = 21;\n    while (i % 7 != 0) i++;\n    printf(\"%d\", i);\n    return 0;\n}", starterCode: "", language: "c", expectedOutput: "21" },
    ],
  },
  // 6. "7. Funcții"
  {
    lessonId: "69fb73ad04cba28ef36a33bb",
    name: "7. Funcții",
    tasks: [
      { number: 6, type: "fillblank", difficulty: "medium", question: "Completează tipul returnat de funcție:\n```c\n___ aduna(int a, int b) {\n    return a + b;\n}\n```", answer: "int", starterCode: "", language: "c", expectedOutput: "" },
      { number: 7, type: "fillblank", difficulty: "medium", question: "Completează cuvântul cheie pentru a returna valoarea:\n```c\nint patrat(int x) {\n    ___ x * x;\n}\n```", answer: "return", starterCode: "", language: "c", expectedOutput: "" },
      { number: 8, type: "fillblank", difficulty: "medium", question: "Ce se afișează?\n```c\nint dublu(int x) { return x * 2; }\nint main() {\n    printf(\"%d\", dublu(6));\n}\n// Răspuns: ___\n```", answer: "12", starterCode: "", language: "c", expectedOutput: "" },
      { number: 9, type: "fillblank", difficulty: "medium", question: "Completează tipul funcției care nu returnează nimic:\n```c\n___ salut() {\n    printf(\"Salut!\");\n}\n```", answer: "void", starterCode: "", language: "c", expectedOutput: "" },
      { number: 10, type: "fillblank", difficulty: "medium", question: "Ce se afișează?\n```c\nint max(int a, int b) { return a > b ? a : b; }\nint main() {\n    printf(\"%d\", max(3, 7));\n}\n// Răspuns: ___\n```", answer: "7", starterCode: "", language: "c", expectedOutput: "" },
      { number: 11, type: "coding", difficulty: "medium", question: "Scrie o funcție `int suma(int a, int b)` și afișează `suma(4, 6)`.", answer: "#include <stdio.h>\nint suma(int a, int b) { return a + b; }\nint main() {\n    printf(\"%d\", suma(4, 6));\n    return 0;\n}", starterCode: "", language: "c", expectedOutput: "10" },
      { number: 12, type: "coding", difficulty: "medium", question: "Scrie o funcție `int patrat(int x)` care returnează `x*x` și afișează `patrat(5)`.", answer: "#include <stdio.h>\nint patrat(int x) { return x * x; }\nint main() {\n    printf(\"%d\", patrat(5));\n    return 0;\n}", starterCode: "", language: "c", expectedOutput: "25" },
      { number: 13, type: "coding", difficulty: "medium", question: "Scrie o funcție `int minim(int a, int b)` și afișează minimul dintre 8 și 3.", answer: "#include <stdio.h>\nint minim(int a, int b) { return a < b ? a : b; }\nint main() {\n    printf(\"%d\", minim(8, 3));\n    return 0;\n}", starterCode: "", language: "c", expectedOutput: "3" },
      { number: 14, type: "coding", difficulty: "medium", question: "Scrie o funcție recursivă `int factorial(int n)` și afișează `factorial(5)`.", answer: "#include <stdio.h>\nint factorial(int n) { return n <= 1 ? 1 : n * factorial(n - 1); }\nint main() {\n    printf(\"%d\", factorial(5));\n    return 0;\n}", starterCode: "", language: "c", expectedOutput: "120" },
      { number: 15, type: "coding", difficulty: "medium", question: "Scrie o funcție `void afiseaza(int n)` care afișează `n` steluțe și apel-o cu 4.", answer: "#include <stdio.h>\nvoid afiseaza(int n) {\n    for (int i = 0; i < n; i++) printf(\"*\");\n}\nint main() {\n    afiseaza(4);\n    return 0;\n}", starterCode: "", language: "c", expectedOutput: "****" },
    ],
  },
  // 7. "10. String-uri și alocare dinamică (malloc)"
  {
    lessonId: "69fb73b204cba28ef36a33df",
    name: "10. String-uri și alocare dinamică (malloc)",
    tasks: [
      { number: 6, type: "fillblank", difficulty: "medium", question: "Completează funcția pentru lungimea unui șir:\n```c\nchar s[] = \"salut\";\nprintf(\"%zu\", ___(s));\n```", answer: "strlen", starterCode: "", language: "c", expectedOutput: "" },
      { number: 7, type: "fillblank", difficulty: "medium", question: "Completează header-ul necesar pentru `malloc`:\n```c\n#include <___>\nint *p = malloc(sizeof(int));\n```", answer: "stdlib.h", starterCode: "", language: "c", expectedOutput: "" },
      { number: 8, type: "fillblank", difficulty: "medium", question: "Ce se afișează?\n```c\nchar s[] = \"buna\";\nprintf(\"%c\", s[0]);\n// Răspuns: ___\n```", answer: "b", starterCode: "", language: "c", expectedOutput: "" },
      { number: 9, type: "fillblank", difficulty: "medium", question: "Completează funcția pentru copierea unui șir:\n```c\nchar dest[10];\n___(dest, \"hello\");\n```", answer: "strcpy", starterCode: "", language: "c", expectedOutput: "" },
      { number: 10, type: "fillblank", difficulty: "medium", question: "Ce funcție eliberează memoria alocată dinamic?\n```c\nint *p = malloc(sizeof(int));\n// ... utilizare ...\n___(p);\n```", answer: "free", starterCode: "", language: "c", expectedOutput: "" },
      { number: 11, type: "coding", difficulty: "medium", question: "Afișează lungimea șirului `\"programare\"`.", answer: "#include <stdio.h>\n#include <string.h>\nint main() {\n    printf(\"%zu\", strlen(\"programare\"));\n    return 0;\n}", starterCode: "", language: "c", expectedOutput: "10" },
      { number: 12, type: "coding", difficulty: "medium", question: "Copiază `\"C lang\"` într-un buffer și afișează-l.", answer: "#include <stdio.h>\n#include <string.h>\nint main() {\n    char buf[20];\n    strcpy(buf, \"C lang\");\n    printf(\"%s\", buf);\n    return 0;\n}", starterCode: "", language: "c", expectedOutput: "C lang" },
      { number: 13, type: "coding", difficulty: "medium", question: "Concatenează `\"Hello, \"` cu `\"World!\"` și afișează rezultatul.", answer: "#include <stdio.h>\n#include <string.h>\nint main() {\n    char s[20] = \"Hello, \";\n    strcat(s, \"World!\");\n    printf(\"%s\", s);\n    return 0;\n}", starterCode: "", language: "c", expectedOutput: "Hello, World!" },
      { number: 14, type: "coding", difficulty: "medium", question: "Alocă dinamic un `int`, setează-l la 99 și afișează valoarea, apoi eliberează memoria.", answer: "#include <stdio.h>\n#include <stdlib.h>\nint main() {\n    int *p = malloc(sizeof(int));\n    *p = 99;\n    printf(\"%d\", *p);\n    free(p);\n    return 0;\n}", starterCode: "", language: "c", expectedOutput: "99" },
      { number: 15, type: "coding", difficulty: "medium", question: "Compară șirurile `\"abc\"` și `\"abc\"` cu `strcmp` și afișează `egal` sau `diferit`.", answer: "#include <stdio.h>\n#include <string.h>\nint main() {\n    if (strcmp(\"abc\", \"abc\") == 0) printf(\"egal\");\n    else printf(\"diferit\");\n    return 0;\n}", starterCode: "", language: "c", expectedOutput: "egal" },
    ],
  },
  // 8. "12. Funcții — pointeri la funcții"
  {
    lessonId: "6a021b7df0ec7fc9c03a694a",
    name: "12. Funcții — pointeri la funcții",
    tasks: [
      { number: 6, type: "fillblank", difficulty: "medium", question: "Completează declararea unui pointer la funcție:\n```c\nint aduna(int a, int b) { return a + b; }\n___ fp = aduna;\n```", answer: "int (*fp)(int, int)", starterCode: "", language: "c", expectedOutput: "" },
      { number: 7, type: "fillblank", difficulty: "medium", question: "Ce se afișează?\n```c\nint dublu(int x) { return x * 2; }\nint (*fp)(int) = dublu;\nprintf(\"%d\", fp(5));\n// Răspuns: ___\n```", answer: "10", starterCode: "", language: "c", expectedOutput: "" },
      { number: 8, type: "fillblank", difficulty: "medium", question: "Completează apelul prin pointer la funcție:\n```c\nint (*op)(int, int) = aduna;\nprintf(\"%d\", ___(3, 4));\n```", answer: "op", starterCode: "", language: "c", expectedOutput: "" },
      { number: 9, type: "fillblank", difficulty: "medium", question: "Funcția `qsort` din `<stdlib.h>` primește ca ultim argument un ___ la funcție de comparare.", answer: "pointer", starterCode: "", language: "c", expectedOutput: "" },
      { number: 10, type: "fillblank", difficulty: "medium", question: "Ce se afișează?\n```c\nvoid salut() { printf(\"Hi!\"); }\nvoid (*fp)() = salut;\nfp();\n// Răspuns: ___\n```", answer: "Hi!", starterCode: "", language: "c", expectedOutput: "" },
      { number: 11, type: "coding", difficulty: "medium", question: "Declară o funcție `int patrat(int x)` și un pointer la ea, apelează prin pointer cu `x=6` și afișează rezultatul.", answer: "#include <stdio.h>\nint patrat(int x) { return x * x; }\nint main() {\n    int (*fp)(int) = patrat;\n    printf(\"%d\", fp(6));\n    return 0;\n}", starterCode: "", language: "c", expectedOutput: "36" },
      { number: 12, type: "coding", difficulty: "medium", question: "Scrie o funcție `void aplica(int x, void (*f)(int))` care apelează `f(x)`. Definește `void afis(int n)` care afișează `n` și apelează `aplica(7, afis)`.", answer: "#include <stdio.h>\nvoid afis(int n) { printf(\"%d\", n); }\nvoid aplica(int x, void (*f)(int)) { f(x); }\nint main() {\n    aplica(7, afis);\n    return 0;\n}", starterCode: "", language: "c", expectedOutput: "7" },
      { number: 13, type: "coding", difficulty: "medium", question: "Creează un tablou de pointeri la funcții `{aduna, scade}` unde `aduna(a,b)=a+b` și `scade(a,b)=a-b`. Afișează `ops[0](10,4)` și `ops[1](10,4)` pe linii separate.", answer: "#include <stdio.h>\nint aduna(int a, int b) { return a + b; }\nint scade(int a, int b) { return a - b; }\nint main() {\n    int (*ops[2])(int, int) = {aduna, scade};\n    printf(\"%d\\n%d\", ops[0](10, 4), ops[1](10, 4));\n    return 0;\n}", starterCode: "", language: "c", expectedOutput: "14\n6" },
      { number: 14, type: "coding", difficulty: "medium", question: "Afișează `2 4 6 8 10` sortând un array cu `qsort` în ordine crescătoare.", answer: "#include <stdio.h>\n#include <stdlib.h>\nint cmp(const void *a, const void *b) { return *(int*)a - *(int*)b; }\nint main() {\n    int arr[] = {10, 4, 8, 2, 6};\n    qsort(arr, 5, sizeof(int), cmp);\n    for (int i = 0; i < 5; i++) printf(\"%d \", arr[i]);\n    return 0;\n}", starterCode: "", language: "c", expectedOutput: "2 4 6 8 10 " },
      { number: 15, type: "coding", difficulty: "medium", question: "Scrie funcția `int aplica_op(int a, int b, int (*op)(int,int))`. Afișează rezultatul pentru `aplica_op(3, 5, aduna)` unde `aduna` returnează suma.", answer: "#include <stdio.h>\nint aduna(int a, int b) { return a + b; }\nint aplica_op(int a, int b, int (*op)(int, int)) { return op(a, b); }\nint main() {\n    printf(\"%d\", aplica_op(3, 5, aduna));\n    return 0;\n}", starterCode: "", language: "c", expectedOutput: "8" },
    ],
  },
  // 9. "13. Structuri avansate — nested, typedef"
  {
    lessonId: "6a021b7ef0ec7fc9c03a6953",
    name: "13. Structuri avansate — nested, typedef",
    tasks: [
      { number: 6, type: "fillblank", difficulty: "medium", question: "Completează cuvântul cheie pentru a crea un alias de tip:\n```c\n___ struct Punct { int x, y; } Punct;\n```", answer: "typedef", starterCode: "", language: "c", expectedOutput: "" },
      { number: 7, type: "fillblank", difficulty: "medium", question: "Ce se afișează?\n```c\ntypedef struct { int x, y; } Punct;\nPunct p = {3, 7};\nprintf(\"%d\", p.y);\n// Răspuns: ___\n```", answer: "7", starterCode: "", language: "c", expectedOutput: "" },
      { number: 8, type: "fillblank", difficulty: "medium", question: "Completează accesul la câmpul structurii nested:\n```c\ntypedef struct { int valoare; } Nod;\ntypedef struct { Nod nod; } Container;\nContainer c = {{42}};\nprintf(\"%d\", c.___valoare);\n```", answer: "nod.", starterCode: "", language: "c", expectedOutput: "" },
      { number: 9, type: "fillblank", difficulty: "medium", question: "Câte octeți are structura? (fără padding)\n```c\ntypedef struct { int a; char b; } S;\n// sizeof(S) minim: ___ octeți\n```", answer: "5", starterCode: "", language: "c", expectedOutput: "" },
      { number: 10, type: "fillblank", difficulty: "medium", question: "Completează operatorul de acces prin pointer:\n```c\ntypedef struct { int val; } Nod;\nNod n = {10};\nNod *p = &n;\nprintf(\"%d\", p___val);\n```", answer: "->", starterCode: "", language: "c", expectedOutput: "" },
      { number: 11, type: "coding", difficulty: "medium", question: "Definește `typedef struct { int x, y; } Punct`. Crează `Punct p = {4, 9}` și afișează `4 9`.", answer: "#include <stdio.h>\ntypedef struct { int x, y; } Punct;\nint main() {\n    Punct p = {4, 9};\n    printf(\"%d %d\", p.x, p.y);\n    return 0;\n}", starterCode: "", language: "c", expectedOutput: "4 9" },
      { number: 12, type: "coding", difficulty: "medium", question: "Definește o structură `Persoana` cu câmpurile `char nume[20]` și `int varsta`. Inițializează cu `{\"Ana\", 25}` și afișează `Ana 25`.", answer: "#include <stdio.h>\ntypedef struct { char nume[20]; int varsta; } Persoana;\nint main() {\n    Persoana p = {\"Ana\", 25};\n    printf(\"%s %d\", p.nume, p.varsta);\n    return 0;\n}", starterCode: "", language: "c", expectedOutput: "Ana 25" },
      { number: 13, type: "coding", difficulty: "medium", question: "Creează o structură nested: `Adresa` cu `char oras[20]` și `Persoana` cu `char nume[20]` și `Adresa adr`. Afișează `Mihai Iași`.", answer: "#include <stdio.h>\ntypedef struct { char oras[20]; } Adresa;\ntypedef struct { char nume[20]; Adresa adr; } Persoana;\nint main() {\n    Persoana p = {\"Mihai\", {\"Iași\"}};\n    printf(\"%s %s\", p.nume, p.adr.oras);\n    return 0;\n}", starterCode: "", language: "c", expectedOutput: "Mihai Iași" },
      { number: 14, type: "coding", difficulty: "medium", question: "Accesează câmpul `val = 55` al unei structuri prin pointer și afișează-l.", answer: "#include <stdio.h>\ntypedef struct { int val; } Nod;\nint main() {\n    Nod n = {55};\n    Nod *p = &n;\n    printf(\"%d\", p->val);\n    return 0;\n}", starterCode: "", language: "c", expectedOutput: "55" },
      { number: 15, type: "coding", difficulty: "medium", question: "Definește `typedef struct { int nota; char materie[20]; } Examen`. Crează 2 examene și afișează nota mai mare.", answer: "#include <stdio.h>\ntypedef struct { int nota; char materie[20]; } Examen;\nint main() {\n    Examen e1 = {9, \"Math\"}, e2 = {7, \"Info\"};\n    printf(\"%d\", e1.nota > e2.nota ? e1.nota : e2.nota);\n    return 0;\n}", starterCode: "", language: "c", expectedOutput: "9" },
    ],
  },
  // 10. "15. Liste înlănțuite (Linked Lists)"
  {
    lessonId: "6a021b81f0ec7fc9c03a6965",
    name: "15. Liste înlănțuite (Linked Lists)",
    tasks: [
      { number: 6, type: "fillblank", difficulty: "medium", question: "Completează tipul câmpului `next` dintr-un nod de listă:\n```c\ntypedef struct Nod {\n    int val;\n    struct Nod *___;\n} Nod;\n```", answer: "next", starterCode: "", language: "c", expectedOutput: "" },
      { number: 7, type: "fillblank", difficulty: "medium", question: "Valoarea lui `cap->next` pentru o listă cu un singur element este `___`.", answer: "NULL", starterCode: "", language: "c", expectedOutput: "" },
      { number: 8, type: "fillblank", difficulty: "medium", question: "Ce funcție se folosește pentru alocarea unui nod nou?\n```c\nNod *nou = (Nod*)___(sizeof(Nod));\n```", answer: "malloc", starterCode: "", language: "c", expectedOutput: "" },
      { number: 9, type: "fillblank", difficulty: "medium", question: "Completează condiția de parcurgere a listei:\n```c\nNod *curent = cap;\nwhile (curent ___ NULL) {\n    printf(\"%d \", curent->val);\n    curent = curent->next;\n}\n```", answer: "!=", starterCode: "", language: "c", expectedOutput: "" },
      { number: 10, type: "fillblank", difficulty: "medium", question: "Ce operator se folosește pentru a accesa câmpurile unui nod prin pointer?\n```c\ncurent___val\ncurent___next\n```", answer: "->", starterCode: "", language: "c", expectedOutput: "" },
      { number: 11, type: "coding", difficulty: "medium", question: "Creează o listă cu nodurile 1->2->3 și afișează valorile separate prin spații.", answer: "#include <stdio.h>\n#include <stdlib.h>\ntypedef struct Nod { int val; struct Nod *next; } Nod;\nint main() {\n    Nod *a = malloc(sizeof(Nod)), *b = malloc(sizeof(Nod)), *c = malloc(sizeof(Nod));\n    a->val = 1; b->val = 2; c->val = 3;\n    a->next = b; b->next = c; c->next = NULL;\n    Nod *cur = a;\n    while (cur) { printf(\"%d \", cur->val); cur = cur->next; }\n    return 0;\n}", starterCode: "", language: "c", expectedOutput: "1 2 3 " },
      { number: 12, type: "coding", difficulty: "medium", question: "Calculează numărul de noduri dintr-o listă cu elementele 5, 10, 15 și afișează `3`.", answer: "#include <stdio.h>\n#include <stdlib.h>\ntypedef struct Nod { int val; struct Nod *next; } Nod;\nint main() {\n    Nod n1 = {5, NULL}, n2 = {10, NULL}, n3 = {15, NULL};\n    n1.next = &n2; n2.next = &n3;\n    int cnt = 0;\n    Nod *c = &n1;\n    while (c) { cnt++; c = c->next; }\n    printf(\"%d\", cnt);\n    return 0;\n}", starterCode: "", language: "c", expectedOutput: "3" },
      { number: 13, type: "coding", difficulty: "medium", question: "Afișează suma valorilor dintr-o listă cu elementele 4, 6, 10.", answer: "#include <stdio.h>\ntypedef struct Nod { int val; struct Nod *next; } Nod;\nint main() {\n    Nod n3 = {10, NULL}, n2 = {6, &n3}, n1 = {4, &n2};\n    int s = 0;\n    Nod *c = &n1;\n    while (c) { s += c->val; c = c->next; }\n    printf(\"%d\", s);\n    return 0;\n}", starterCode: "", language: "c", expectedOutput: "20" },
      { number: 14, type: "coding", difficulty: "medium", question: "Adaugă un nod cu valoarea 0 la începutul listei 1->2->3 și afișează `0 1 2 3`.", answer: "#include <stdio.h>\n#include <stdlib.h>\ntypedef struct Nod { int val; struct Nod *next; } Nod;\nint main() {\n    Nod n3 = {3, NULL}, n2 = {2, &n3}, n1 = {1, &n2};\n    Nod *cap = malloc(sizeof(Nod));\n    cap->val = 0; cap->next = &n1;\n    Nod *c = cap;\n    while (c) { printf(\"%d \", c->val); c = c->next; }\n    return 0;\n}", starterCode: "", language: "c", expectedOutput: "0 1 2 3 " },
      { number: 15, type: "coding", difficulty: "medium", question: "Afișează maximul dintr-o listă cu elementele 3, 9, 1, 7.", answer: "#include <stdio.h>\ntypedef struct Nod { int val; struct Nod *next; } Nod;\nint main() {\n    Nod n4 = {7, NULL}, n3 = {1, &n4}, n2 = {9, &n3}, n1 = {3, &n2};\n    int mx = n1.val;\n    Nod *c = n1.next;\n    while (c) { if (c->val > mx) mx = c->val; c = c->next; }\n    printf(\"%d\", mx);\n    return 0;\n}", starterCode: "", language: "c", expectedOutput: "9" },
    ],
  },
  // 11. "18. Recursivitate"
  {
    lessonId: "6a021b85f0ec7fc9c03a6980",
    name: "18. Recursivitate",
    tasks: [
      { number: 6, type: "fillblank", difficulty: "medium", question: "Completează cazul de bază al recursivității:\n```c\nint factorial(int n) {\n    if (n ___ 1) return 1;\n    return n * factorial(n - 1);\n}\n```", answer: "<=", starterCode: "", language: "c", expectedOutput: "" },
      { number: 7, type: "fillblank", difficulty: "medium", question: "Ce valoare returnează `fibonacci(5)` (0,1,1,2,3,5,...)?\n```c\nint fib(int n) {\n    if (n <= 1) return n;\n    return fib(n-1) + fib(n-2);\n}\n// fib(5) = ___\n```", answer: "5", starterCode: "", language: "c", expectedOutput: "" },
      { number: 8, type: "fillblank", difficulty: "medium", question: "Ce se afișează?\n```c\nvoid numara(int n) {\n    if (n == 0) return;\n    printf(\"%d \", n);\n    numara(n - 1);\n}\n// numara(3) afișează: ___\n```", answer: "3 2 1 ", starterCode: "", language: "c", expectedOutput: "" },
      { number: 9, type: "fillblank", difficulty: "medium", question: "Câte apeluri recursive face `factorial(4)` (fără cel inițial)?\n```c\n// factorial(4) -> factorial(3) -> factorial(2) -> factorial(1)\n// Număr de apeluri recursive: ___\n```", answer: "3", starterCode: "", language: "c", expectedOutput: "" },
      { number: 10, type: "fillblank", difficulty: "medium", question: "Completează recursiv suma cifrelor unui număr:\n```c\nint sumaC(int n) {\n    if (n == 0) return 0;\n    return ___ + sumaC(n / 10);\n}\n```", answer: "n % 10", starterCode: "", language: "c", expectedOutput: "" },
      { number: 11, type: "coding", difficulty: "medium", question: "Calculează recursiv `factorial(6)` și afișează rezultatul.", answer: "#include <stdio.h>\nint factorial(int n) { return n <= 1 ? 1 : n * factorial(n - 1); }\nint main() {\n    printf(\"%d\", factorial(6));\n    return 0;\n}", starterCode: "", language: "c", expectedOutput: "720" },
      { number: 12, type: "coding", difficulty: "medium", question: "Afișează `fib(7)` unde `fib(n) = fib(n-1) + fib(n-2)`, `fib(0)=0`, `fib(1)=1`.", answer: "#include <stdio.h>\nint fib(int n) { return n <= 1 ? n : fib(n-1) + fib(n-2); }\nint main() {\n    printf(\"%d\", fib(7));\n    return 0;\n}", starterCode: "", language: "c", expectedOutput: "13" },
      { number: 13, type: "coding", difficulty: "medium", question: "Scrie recursiv suma `1+2+...+n` pentru `n=10` și afișează rezultatul.", answer: "#include <stdio.h>\nint suma(int n) { return n <= 0 ? 0 : n + suma(n - 1); }\nint main() {\n    printf(\"%d\", suma(10));\n    return 0;\n}", starterCode: "", language: "c", expectedOutput: "55" },
      { number: 14, type: "coding", difficulty: "medium", question: "Calculează recursiv `2^8` (puterea 2 la 8) și afișează rezultatul.", answer: "#include <stdio.h>\nint putere(int b, int e) { return e == 0 ? 1 : b * putere(b, e - 1); }\nint main() {\n    printf(\"%d\", putere(2, 8));\n    return 0;\n}", starterCode: "", language: "c", expectedOutput: "256" },
      { number: 15, type: "coding", difficulty: "medium", question: "Inversează recursiv un număr (`n=1234`) și afișează `4321`.", answer: "#include <stdio.h>\nvoid inverseaza(int n) {\n    if (n == 0) return;\n    printf(\"%d\", n % 10);\n    inverseaza(n / 10);\n}\nint main() {\n    inverseaza(1234);\n    return 0;\n}", starterCode: "", language: "c", expectedOutput: "4321" },
    ],
  },
  // 12. "21. Operații pe biți (Bitwise)"
  {
    lessonId: "6a021b89f0ec7fc9c03a699b",
    name: "21. Operații pe biți (Bitwise)",
    tasks: [
      { number: 6, type: "fillblank", difficulty: "medium", question: "Ce valoare returnează `5 & 3`?\n```c\nprintf(\"%d\", 5 & 3);\n// 5 = 101, 3 = 011 → ___\n```", answer: "1", starterCode: "", language: "c", expectedOutput: "" },
      { number: 7, type: "fillblank", difficulty: "medium", question: "Ce operator realizează OR pe biți?\n```c\nprintf(\"%d\", 5 ___ 3); // 5=101, 3=011 → 111 = 7\n```", answer: "|", starterCode: "", language: "c", expectedOutput: "" },
      { number: 8, type: "fillblank", difficulty: "medium", question: "Ce valoare returnează `6 ^ 3`?\n```c\nprintf(\"%d\", 6 ^ 3);\n// 6=110, 3=011 → ___\n```", answer: "5", starterCode: "", language: "c", expectedOutput: "" },
      { number: 9, type: "fillblank", difficulty: "medium", question: "Completează pentru a deplasa la stânga cu 2 biți:\n```c\nint x = 3;\nprintf(\"%d\", x ___ 2); // 3 << 2 = 12\n```", answer: "<<", starterCode: "", language: "c", expectedOutput: "" },
      { number: 10, type: "fillblank", difficulty: "medium", question: "Ce valoare are `~0` pe un `int` de 32 biți?\n```c\nprintf(\"%d\", ~0);\n// Răspuns: ___\n```", answer: "-1", starterCode: "", language: "c", expectedOutput: "" },
      { number: 11, type: "coding", difficulty: "medium", question: "Afișează rezultatul `12 & 10` (AND pe biți).", answer: "#include <stdio.h>\nint main() {\n    printf(\"%d\", 12 & 10);\n    return 0;\n}", starterCode: "", language: "c", expectedOutput: "8" },
      { number: 12, type: "coding", difficulty: "medium", question: "Afișează rezultatul `7 | 8` (OR pe biți).", answer: "#include <stdio.h>\nint main() {\n    printf(\"%d\", 7 | 8);\n    return 0;\n}", starterCode: "", language: "c", expectedOutput: "15" },
      { number: 13, type: "coding", difficulty: "medium", question: "Afișează `1` dacă bitul 3 al lui `n=12` este setat, altfel `0`.", answer: "#include <stdio.h>\nint main() {\n    int n = 12;\n    printf(\"%d\", (n >> 3) & 1);\n    return 0;\n}", starterCode: "", language: "c", expectedOutput: "1" },
      { number: 14, type: "coding", difficulty: "medium", question: "Setează bitul 1 al lui `n=4` folosind OR și afișează rezultatul.", answer: "#include <stdio.h>\nint main() {\n    int n = 4;\n    printf(\"%d\", n | (1 << 1));\n    return 0;\n}", starterCode: "", language: "c", expectedOutput: "6" },
      { number: 15, type: "coding", difficulty: "medium", question: "Afișează `16` calculând `1 << 4` (deplasare la stânga).", answer: "#include <stdio.h>\nint main() {\n    printf(\"%d\", 1 << 4);\n    return 0;\n}", starterCode: "", language: "c", expectedOutput: "16" },
    ],
  },
  // 13. "22. Compilare, Linking și Makefile"
  {
    lessonId: "6a021b8af0ec7fc9c03a69a4",
    name: "22. Compilare, Linking și Makefile",
    tasks: [
      { number: 6, type: "fillblank", difficulty: "medium", question: "Ce flag gcc generează fișierul obiect fără linking?\n```bash\ngcc ___ main.c -o main.o\n```", answer: "-c", starterCode: "", language: "c", expectedOutput: "" },
      { number: 7, type: "fillblank", difficulty: "medium", question: "Ce extensie au fișierele obiect pe Linux?\n```bash\ngcc -c main.c -o main.___\n```", answer: "o", starterCode: "", language: "c", expectedOutput: "" },
      { number: 8, type: "fillblank", difficulty: "medium", question: "Ce variabilă Makefile conține compilatorul?\n```makefile\n___ = gcc\n$(CC) main.c -o prog\n```", answer: "CC", starterCode: "", language: "c", expectedOutput: "" },
      { number: 9, type: "fillblank", difficulty: "medium", question: "Completează ținta `clean` din Makefile:\n```makefile\nclean:\n    ___ -f *.o prog\n```", answer: "rm", starterCode: "", language: "c", expectedOutput: "" },
      { number: 10, type: "fillblank", difficulty: "medium", question: "Ce directivă de preprocesor include un fișier header?\n```c\n___ <stdio.h>\n```", answer: "#include", starterCode: "", language: "c", expectedOutput: "" },
      { number: 11, type: "coding", difficulty: "medium", question: "Afișează versiunea C folosind macro `__STDC_VERSION__`.", answer: "#include <stdio.h>\nint main() {\n    printf(\"%ld\", __STDC_VERSION__);\n    return 0;\n}", starterCode: "", language: "c", expectedOutput: "201710" },
      { number: 12, type: "coding", difficulty: "medium", question: "Afișează `Compilat OK` utilizând o macrodefiniție `#define MSG \"Compilat OK\"`.", answer: "#include <stdio.h>\n#define MSG \"Compilat OK\"\nint main() {\n    printf(\"%s\", MSG);\n    return 0;\n}", starterCode: "", language: "c", expectedOutput: "Compilat OK" },
      { number: 13, type: "coding", difficulty: "medium", question: "Folosind `#ifdef`, afișează `DEBUG activ` dacă `DEBUG` este definit.", answer: "#include <stdio.h>\n#define DEBUG\nint main() {\n#ifdef DEBUG\n    printf(\"DEBUG activ\");\n#endif\n    return 0;\n}", starterCode: "", language: "c", expectedOutput: "DEBUG activ" },
      { number: 14, type: "coding", difficulty: "medium", question: "Definește o constantă `PI = 3` cu `#define` și afișează `3 * PI`.", answer: "#include <stdio.h>\n#define PI 3\nint main() {\n    printf(\"%d\", 3 * PI);\n    return 0;\n}", starterCode: "", language: "c", expectedOutput: "9" },
      { number: 15, type: "coding", difficulty: "medium", question: "Afișează `__FILE__` (numele fișierului sursă) folosind `%s`.", answer: "#include <stdio.h>\nint main() {\n    printf(\"%s\", __FILE__);\n    return 0;\n}", starterCode: "", language: "c", expectedOutput: "" },
    ],
  },
  // 14. "23. Debugging — GDB și tehnici"
  {
    lessonId: "6a021b8bf0ec7fc9c03a69ad",
    name: "23. Debugging — GDB și tehnici",
    tasks: [
      { number: 6, type: "fillblank", difficulty: "medium", question: "Ce flag gcc adaugă informații de debugging?\n```bash\ngcc ___ program.c -o program\n```", answer: "-g", starterCode: "", language: "c", expectedOutput: "" },
      { number: 7, type: "fillblank", difficulty: "medium", question: "Comanda GDB pentru a rula programul este:\n```\n(gdb) ___\n```", answer: "run", starterCode: "", language: "c", expectedOutput: "" },
      { number: 8, type: "fillblank", difficulty: "medium", question: "Ce comandă GDB setează un breakpoint la linia 10?\n```\n(gdb) ___ 10\n```", answer: "break", starterCode: "", language: "c", expectedOutput: "" },
      { number: 9, type: "fillblank", difficulty: "medium", question: "Ce comandă GDB afișează valoarea variabilei `x`?\n```\n(gdb) ___ x\n```", answer: "print", starterCode: "", language: "c", expectedOutput: "" },
      { number: 10, type: "fillblank", difficulty: "medium", question: "Completează macro-ul de assertion:\n```c\n#include <assert.h>\nint x = 5;\n___(x == 5); // nu abortează\n```", answer: "assert", starterCode: "", language: "c", expectedOutput: "" },
      { number: 11, type: "coding", difficulty: "medium", question: "Afișează un mesaj de eroare pe `stderr` folosind `fprintf(stderr, ...)`.", answer: "#include <stdio.h>\nint main() {\n    fprintf(stderr, \"Eroare detectata\");\n    return 0;\n}", starterCode: "", language: "c", expectedOutput: "" },
      { number: 12, type: "coding", difficulty: "medium", question: "Utilizează `assert` pentru a verifica că `5 > 0` și afișează `OK` după.", answer: "#include <stdio.h>\n#include <assert.h>\nint main() {\n    assert(5 > 0);\n    printf(\"OK\");\n    return 0;\n}", starterCode: "", language: "c", expectedOutput: "OK" },
      { number: 13, type: "coding", difficulty: "medium", question: "Afișează valoarea lui `errno` după apel eșuat `fopen(\"inexistent.txt\", \"r\")`.", answer: "#include <stdio.h>\n#include <errno.h>\nint main() {\n    FILE *f = fopen(\"inexistent.txt\", \"r\");\n    if (!f) printf(\"%d\", errno);\n    return 0;\n}", starterCode: "", language: "c", expectedOutput: "2" },
      { number: 14, type: "coding", difficulty: "medium", question: "Afișează `linia: 4` folosind macrodefiniția `__LINE__` de la linia 4 a funcției main.", answer: "#include <stdio.h>\nint main() {\n    int linie = __LINE__;\n    printf(\"linia: %d\", linie);\n    return 0;\n}", starterCode: "", language: "c", expectedOutput: "linia: 3" },
      { number: 15, type: "coding", difficulty: "medium", question: "Scrie un program care testează dacă un pointer este NULL și afișează `null` sau `valid`.", answer: "#include <stdio.h>\nint main() {\n    int *p = NULL;\n    if (p == NULL) printf(\"null\");\n    else printf(\"valid\");\n    return 0;\n}", starterCode: "", language: "c", expectedOutput: "null" },
    ],
  },
  // 15. "24. Mini-proiect: Calculator în C"
  {
    lessonId: "6a021b8df0ec7fc9c03a69b6",
    name: "24. Mini-proiect: Calculator în C",
    tasks: [
      { number: 6, type: "fillblank", difficulty: "medium", question: "Completează operatorul pentru a selecta operația:\n```c\nchar op = '+';\nswitch (op) {\n    case '+': printf(\"%d\", 3 + 4); ___;\n}\n```", answer: "break", starterCode: "", language: "c", expectedOutput: "" },
      { number: 7, type: "fillblank", difficulty: "medium", question: "Ce se afișează?\n```c\nint a = 10, b = 3;\nprintf(\"%.2f\", (float)a / b);\n// Răspuns: ___\n```", answer: "3.33", starterCode: "", language: "c", expectedOutput: "" },
      { number: 8, type: "fillblank", difficulty: "medium", question: "Completează cast-ul pentru împărțire cu zecimale:\n```c\nint a = 7, b = 2;\nfloat rez = (___)a / b;\n```", answer: "float", starterCode: "", language: "c", expectedOutput: "" },
      { number: 9, type: "fillblank", difficulty: "medium", question: "Ce funcție din `<math.h>` calculează radical?\n```c\nprintf(\"%.1f\", ___(16.0));\n```", answer: "sqrt", starterCode: "", language: "c", expectedOutput: "" },
      { number: 10, type: "fillblank", difficulty: "medium", question: "Ce se afișează?\n```c\nint a = 5;\nprintf(\"%d\", a * a);\n// Răspuns: ___\n```", answer: "25", starterCode: "", language: "c", expectedOutput: "" },
      { number: 11, type: "coding", difficulty: "medium", question: "Implementează adunarea: `a=12`, `b=8`, afișează `20`.", answer: "#include <stdio.h>\nint main() {\n    int a = 12, b = 8;\n    printf(\"%d\", a + b);\n    return 0;\n}", starterCode: "", language: "c", expectedOutput: "20" },
      { number: 12, type: "coding", difficulty: "medium", question: "Calculează `15.0 / 4` cu două zecimale și afișează `3.75`.", answer: "#include <stdio.h>\nint main() {\n    printf(\"%.2f\", 15.0 / 4);\n    return 0;\n}", starterCode: "", language: "c", expectedOutput: "3.75" },
      { number: 13, type: "coding", difficulty: "medium", question: "Afișează rezultatul `pow(3, 4)` ca număr întreg (81).", answer: "#include <stdio.h>\n#include <math.h>\nint main() {\n    printf(\"%d\", (int)pow(3, 4));\n    return 0;\n}", starterCode: "", language: "c", expectedOutput: "81" },
      { number: 14, type: "coding", difficulty: "medium", question: "Afișează `par` sau `impar` pentru `n=7`.", answer: "#include <stdio.h>\nint main() {\n    int n = 7;\n    printf(\"%s\", n % 2 == 0 ? \"par\" : \"impar\");\n    return 0;\n}", starterCode: "", language: "c", expectedOutput: "impar" },
      { number: 15, type: "coding", difficulty: "medium", question: "Calculează suma pătrateor `1^2 + 2^2 + ... + 5^2` și afișează `55`.", answer: "#include <stdio.h>\nint main() {\n    int s = 0;\n    for (int i = 1; i <= 5; i++) s += i * i;\n    printf(\"%d\", s);\n    return 0;\n}", starterCode: "", language: "c", expectedOutput: "55" },
    ],
  },
  // 16. "25. Bune Practici C — Recap Final"
  {
    lessonId: "6a021b8ef0ec7fc9c03a69bf",
    name: "25. Bune Practici C — Recap Final",
    tasks: [
      { number: 6, type: "fillblank", difficulty: "medium", question: "Ce convenție de denumire se folosește pentru constante în C?\n```c\n#define ___ 100\n```", answer: "MAX_SIZE", starterCode: "", language: "c", expectedOutput: "" },
      { number: 7, type: "fillblank", difficulty: "medium", question: "Ce se întâmplă dacă nu verifici valoarea returnată de `malloc`?\n```c\nint *p = malloc(n * sizeof(int));\nif (p == ___) { /* eroare */ }\n```", answer: "NULL", starterCode: "", language: "c", expectedOutput: "" },
      { number: 8, type: "fillblank", difficulty: "medium", question: "Completează verificarea pointer-ului nul:\n```c\nvoid f(int *p) {\n    if (p == ___) return;\n    *p = 10;\n}\n```", answer: "NULL", starterCode: "", language: "c", expectedOutput: "" },
      { number: 9, type: "fillblank", difficulty: "medium", question: "Ce funcție este recomandată în locul `gets()` pentru securitate?\n```c\nchar buf[100];\n___(buf, 100, stdin);\n```", answer: "fgets", starterCode: "", language: "c", expectedOutput: "" },
      { number: 10, type: "fillblank", difficulty: "medium", question: "La ieșire din `main`, ce valoare returnează un program reușit?\n```c\nreturn ___;\n```", answer: "0", starterCode: "", language: "c", expectedOutput: "" },
      { number: 11, type: "coding", difficulty: "medium", question: "Scrie o funcție curată `int aduna(int a, int b)` cu un singur return și afișează `aduna(3,4)`.", answer: "#include <stdio.h>\nint aduna(int a, int b) {\n    return a + b;\n}\nint main() {\n    printf(\"%d\", aduna(3, 4));\n    return 0;\n}", starterCode: "", language: "c", expectedOutput: "7" },
      { number: 12, type: "coding", difficulty: "medium", question: "Verifică un pointer la alocare și afișează `alocat` sau `eroare`.", answer: "#include <stdio.h>\n#include <stdlib.h>\nint main() {\n    int *p = malloc(sizeof(int));\n    if (p != NULL) printf(\"alocat\");\n    else printf(\"eroare\");\n    free(p);\n    return 0;\n}", starterCode: "", language: "c", expectedOutput: "alocat" },
      { number: 13, type: "coding", difficulty: "medium", question: "Afișează `Salut, lume!` folosind o constantă definită cu `#define`.", answer: "#include <stdio.h>\n#define MESAJ \"Salut, lume!\"\nint main() {\n    printf(\"%s\", MESAJ);\n    return 0;\n}", starterCode: "", language: "c", expectedOutput: "Salut, lume!" },
      { number: 14, type: "coding", difficulty: "medium", question: "Afișează dimensiunea unui `int` și a unui `char` în octeți pe aceeași linie.", answer: "#include <stdio.h>\nint main() {\n    printf(\"%zu %zu\", sizeof(int), sizeof(char));\n    return 0;\n}", starterCode: "", language: "c", expectedOutput: "4 1" },
      { number: 15, type: "coding", difficulty: "medium", question: "Scrie un program care afișează `C este rapid` folosind un șir de caractere declarat ca `const char*`.", answer: "#include <stdio.h>\nint main() {\n    const char *msg = \"C este rapid\";\n    printf(\"%s\", msg);\n    return 0;\n}", starterCode: "", language: "c", expectedOutput: "C este rapid" },
    ],
  },
  // 17. "26. Hash Tables în C"
  {
    lessonId: "6a08cf22999573855635ca85",
    name: "26. Hash Tables în C",
    tasks: [
      { number: 6, type: "fillblank", difficulty: "medium", question: "O funcție hash bună distribuie cheile ___.\n```c\n// Proprietate esențială: distribuție ___\n```", answer: "uniform", starterCode: "", language: "c", expectedOutput: "" },
      { number: 7, type: "fillblank", difficulty: "medium", question: "Completează formula hash simplă:\n```c\nint hash(int key, int size) {\n    return key ___ size;\n}\n```", answer: "%", starterCode: "", language: "c", expectedOutput: "" },
      { number: 8, type: "fillblank", difficulty: "medium", question: "Ce se afișează?\n```c\nint tab[5] = {0};\ntab[7 % 5] = 42;\nprintf(\"%d\", tab[2]);\n// Răspuns: ___\n```", answer: "42", starterCode: "", language: "c", expectedOutput: "" },
      { number: 9, type: "fillblank", difficulty: "medium", question: "Coliziunea apare când două chei diferite produc același ___.", answer: "index", starterCode: "", language: "c", expectedOutput: "" },
      { number: 10, type: "fillblank", difficulty: "medium", question: "Linear probing rezolvă coliziunile prin căutare ___.\n```c\n// Se mută la index următor: ___\n```", answer: "liniară", starterCode: "", language: "c", expectedOutput: "" },
      { number: 11, type: "coding", difficulty: "medium", question: "Implementează o funcție hash `int hash(int key)` care returnează `key % 7`. Afișează `hash(25)`.", answer: "#include <stdio.h>\nint hash(int key) { return key % 7; }\nint main() {\n    printf(\"%d\", hash(25));\n    return 0;\n}", starterCode: "", language: "c", expectedOutput: "4" },
      { number: 12, type: "coding", difficulty: "medium", question: "Insertează cheile 3, 11, 17 într-un tabel de dimensiune 7 și afișează indexele lor.", answer: "#include <stdio.h>\nint main() {\n    int keys[] = {3, 11, 17};\n    for (int i = 0; i < 3; i++)\n        printf(\"%d \", keys[i] % 7);\n    return 0;\n}", starterCode: "", language: "c", expectedOutput: "3 4 3 " },
      { number: 13, type: "coding", difficulty: "medium", question: "Calculează hash-ul string-ului `\"abc\"` (suma codurilor ASCII mod 10) și afișează rezultatul.", answer: "#include <stdio.h>\nint main() {\n    char *s = \"abc\";\n    int h = 0;\n    for (int i = 0; s[i]; i++) h += s[i];\n    printf(\"%d\", h % 10);\n    return 0;\n}", starterCode: "", language: "c", expectedOutput: "4" },
      { number: 14, type: "coding", difficulty: "medium", question: "Simulează un tabel hash de 5 sloturi, inserează cheia 13 și afișează `slotul: 3`.", answer: "#include <stdio.h>\nint main() {\n    int key = 13, size = 5;\n    printf(\"slotul: %d\", key % size);\n    return 0;\n}", starterCode: "", language: "c", expectedOutput: "slotul: 3" },
      { number: 15, type: "coding", difficulty: "medium", question: "Afișează `coliziune` dacă `hash(5) == hash(12)` cu `hash(k) = k % 7`.", answer: "#include <stdio.h>\nint hash(int k) { return k % 7; }\nint main() {\n    if (hash(5) == hash(12)) printf(\"coliziune\");\n    else printf(\"ok\");\n    return 0;\n}", starterCode: "", language: "c", expectedOutput: "coliziune" },
    ],
  },
  // 18. "27. Arbori Binari în C"
  {
    lessonId: "6a08cf25999573855635ca99",
    name: "27. Arbori Binari în C",
    tasks: [
      { number: 6, type: "fillblank", difficulty: "medium", question: "Completează structura unui nod de arbore binar:\n```c\ntypedef struct Nod {\n    int val;\n    struct Nod *stanga, *___;\n} Nod;\n```", answer: "dreapta", starterCode: "", language: "c", expectedOutput: "" },
      { number: 7, type: "fillblank", difficulty: "medium", question: "Nodul rădăcină este nodul fără ___.", answer: "părinte", starterCode: "", language: "c", expectedOutput: "" },
      { number: 8, type: "fillblank", difficulty: "medium", question: "Ce traversare vizitează: stânga, rădăcină, dreapta?\n```\n___ (in-order)\n```", answer: "LNR", starterCode: "", language: "c", expectedOutput: "" },
      { number: 9, type: "fillblank", difficulty: "medium", question: "Într-un BST, nodul din stânga are valoarea ___ decât rădăcina.", answer: "mai mică", starterCode: "", language: "c", expectedOutput: "" },
      { number: 10, type: "fillblank", difficulty: "medium", question: "Frunzele sunt noduri cu ambii copii ___.", answer: "NULL", starterCode: "", language: "c", expectedOutput: "" },
      { number: 11, type: "coding", difficulty: "medium", question: "Creează un BST cu rădăcina 5 și copiii 3 (stânga) și 7 (dreapta). Afișează valorile in-order: `3 5 7`.", answer: "#include <stdio.h>\n#include <stdlib.h>\ntypedef struct Nod { int val; struct Nod *st, *dr; } Nod;\nvoid inorder(Nod *r) { if (!r) return; inorder(r->st); printf(\"%d \", r->val); inorder(r->dr); }\nint main() {\n    Nod *r = malloc(sizeof(Nod)); r->val = 5;\n    Nod *l = malloc(sizeof(Nod)); l->val = 3; l->st = l->dr = NULL;\n    Nod *rr = malloc(sizeof(Nod)); rr->val = 7; rr->st = rr->dr = NULL;\n    r->st = l; r->dr = rr;\n    inorder(r);\n    return 0;\n}", starterCode: "", language: "c", expectedOutput: "3 5 7 " },
      { number: 12, type: "coding", difficulty: "medium", question: "Calculează înălțimea unui arbore cu rădăcina 1, copilul stâng 2, copilul drept al lui 2 este 3. Afișează `3`.", answer: "#include <stdio.h>\n#include <stdlib.h>\ntypedef struct Nod { int val; struct Nod *st, *dr; } Nod;\nint h(Nod *r) { return !r ? 0 : 1 + (h(r->st) > h(r->dr) ? h(r->st) : h(r->dr)); }\nint main() {\n    Nod n3 = {3, NULL, NULL}, n2 = {2, NULL, &n3}, n1 = {1, &n2, NULL};\n    printf(\"%d\", h(&n1));\n    return 0;\n}", starterCode: "", language: "c", expectedOutput: "3" },
      { number: 13, type: "coding", difficulty: "medium", question: "Numără nodurile unui arbore cu valorile 10, 5, 15 și afișează `3`.", answer: "#include <stdio.h>\ntypedef struct Nod { int val; struct Nod *st, *dr; } Nod;\nint numara(Nod *r) { return !r ? 0 : 1 + numara(r->st) + numara(r->dr); }\nint main() {\n    Nod n2 = {5, NULL, NULL}, n3 = {15, NULL, NULL}, n1 = {10, &n2, &n3};\n    printf(\"%d\", numara(&n1));\n    return 0;\n}", starterCode: "", language: "c", expectedOutput: "3" },
      { number: 14, type: "coding", difficulty: "medium", question: "Caută valoarea 7 într-un BST {5, 3, 7} și afișează `gasit` sau `negasit`.", answer: "#include <stdio.h>\ntypedef struct Nod { int val; struct Nod *st, *dr; } Nod;\nint cauta(Nod *r, int v) { if (!r) return 0; if (r->val == v) return 1; return v < r->val ? cauta(r->st, v) : cauta(r->dr, v); }\nint main() {\n    Nod l = {3, NULL, NULL}, rr = {7, NULL, NULL}, root = {5, &l, &rr};\n    printf(\"%s\", cauta(&root, 7) ? \"gasit\" : \"negasit\");\n    return 0;\n}", starterCode: "", language: "c", expectedOutput: "gasit" },
      { number: 15, type: "coding", difficulty: "medium", question: "Afișează suma valorilor dintr-un arbore cu nodurile 4, 6, 2 (rădăcina 4, stânga 2, dreapta 6).", answer: "#include <stdio.h>\ntypedef struct Nod { int val; struct Nod *st, *dr; } Nod;\nint suma(Nod *r) { return !r ? 0 : r->val + suma(r->st) + suma(r->dr); }\nint main() {\n    Nod l = {2, NULL, NULL}, rr = {6, NULL, NULL}, root = {4, &l, &rr};\n    printf(\"%d\", suma(&root));\n    return 0;\n}", starterCode: "", language: "c", expectedOutput: "12" },
    ],
  },
  // 19. "28. Algoritmi de Sortare Avansati în C"
  {
    lessonId: "6a08cf28999573855635caad",
    name: "28. Algoritmi de Sortare Avansati în C",
    tasks: [
      { number: 6, type: "fillblank", difficulty: "medium", question: "Complexitatea medie a Quick Sort este ___.", answer: "O(n log n)", starterCode: "", language: "c", expectedOutput: "" },
      { number: 7, type: "fillblank", difficulty: "medium", question: "Merge Sort divide tabloul în ___ jumătăți, le sortează și le ___.", answer: "două", starterCode: "", language: "c", expectedOutput: "" },
      { number: 8, type: "fillblank", difficulty: "medium", question: "Complexitatea Bubble Sort în cazul cel mai rău este ___.", answer: "O(n^2)", starterCode: "", language: "c", expectedOutput: "" },
      { number: 9, type: "fillblank", difficulty: "medium", question: "Completează swap-ul standard:\n```c\nint t = a;\na = ___;\nb = t;\n```", answer: "b", starterCode: "", language: "c", expectedOutput: "" },
      { number: 10, type: "fillblank", difficulty: "medium", question: "Heap Sort folosește structura de date numită ___.", answer: "heap", starterCode: "", language: "c", expectedOutput: "" },
      { number: 11, type: "coding", difficulty: "medium", question: "Sortează cu Bubble Sort tabloul `{5, 3, 8, 1}` și afișează `1 3 5 8`.", answer: "#include <stdio.h>\nint main() {\n    int a[] = {5, 3, 8, 1};\n    int n = 4;\n    for (int i = 0; i < n-1; i++)\n        for (int j = 0; j < n-i-1; j++)\n            if (a[j] > a[j+1]) { int t = a[j]; a[j] = a[j+1]; a[j+1] = t; }\n    for (int i = 0; i < n; i++) printf(\"%d \", a[i]);\n    return 0;\n}", starterCode: "", language: "c", expectedOutput: "1 3 5 8 " },
      { number: 12, type: "coding", difficulty: "medium", question: "Sortează cu Selection Sort tabloul `{9, 2, 6, 4}` și afișează `2 4 6 9`.", answer: "#include <stdio.h>\nint main() {\n    int a[] = {9, 2, 6, 4}, n = 4;\n    for (int i = 0; i < n-1; i++) {\n        int m = i;\n        for (int j = i+1; j < n; j++) if (a[j] < a[m]) m = j;\n        int t = a[i]; a[i] = a[m]; a[m] = t;\n    }\n    for (int i = 0; i < n; i++) printf(\"%d \", a[i]);\n    return 0;\n}", starterCode: "", language: "c", expectedOutput: "2 4 6 9 " },
      { number: 13, type: "coding", difficulty: "medium", question: "Afișează cele mai mici 3 numere din `{7, 2, 9, 1, 5}` în ordine crescătoare după sortare.", answer: "#include <stdio.h>\nint main() {\n    int a[] = {7, 2, 9, 1, 5}, n = 5;\n    for (int i = 0; i < n-1; i++)\n        for (int j = 0; j < n-i-1; j++)\n            if (a[j] > a[j+1]) { int t = a[j]; a[j] = a[j+1]; a[j+1] = t; }\n    for (int i = 0; i < 3; i++) printf(\"%d \", a[i]);\n    return 0;\n}", starterCode: "", language: "c", expectedOutput: "1 2 5 " },
      { number: 14, type: "coding", difficulty: "medium", question: "Folosind `qsort`, sortează `{4, 1, 7, 3}` descrescător și afișează `7 4 3 1`.", answer: "#include <stdio.h>\n#include <stdlib.h>\nint cmp(const void *a, const void *b) { return *(int*)b - *(int*)a; }\nint main() {\n    int a[] = {4, 1, 7, 3};\n    qsort(a, 4, sizeof(int), cmp);\n    for (int i = 0; i < 4; i++) printf(\"%d \", a[i]);\n    return 0;\n}", starterCode: "", language: "c", expectedOutput: "7 4 3 1 " },
      { number: 15, type: "coding", difficulty: "medium", question: "Sortează cu Insertion Sort `{6, 3, 8, 2}` și afișează `2 3 6 8`.", answer: "#include <stdio.h>\nint main() {\n    int a[] = {6, 3, 8, 2}, n = 4;\n    for (int i = 1; i < n; i++) {\n        int key = a[i], j = i - 1;\n        while (j >= 0 && a[j] > key) { a[j+1] = a[j]; j--; }\n        a[j+1] = key;\n    }\n    for (int i = 0; i < n; i++) printf(\"%d \", a[i]);\n    return 0;\n}", starterCode: "", language: "c", expectedOutput: "2 3 6 8 " },
    ],
  },
  // 20. "29. Grafuri în C — BFS, DFS, Shortest Path"
  {
    lessonId: "6a08cf2b999573855635cac1",
    name: "29. Grafuri în C — BFS, DFS, Shortest Path",
    tasks: [
      { number: 6, type: "fillblank", difficulty: "medium", question: "BFS folosește o structură de tip ___ pentru a procesa nodurile.", answer: "coadă", starterCode: "", language: "c", expectedOutput: "" },
      { number: 7, type: "fillblank", difficulty: "medium", question: "DFS folosește o structură de tip ___ (implicit sau explicit).", answer: "stivă", starterCode: "", language: "c", expectedOutput: "" },
      { number: 8, type: "fillblank", difficulty: "medium", question: "Un graf cu N noduri și M muchii are matricea de adiacență de dimensiune ___.", answer: "N x N", starterCode: "", language: "c", expectedOutput: "" },
      { number: 9, type: "fillblank", difficulty: "medium", question: "Algoritmul Dijkstra găsește drumul cel mai ___ de la sursă la toate nodurile.", answer: "scurt", starterCode: "", language: "c", expectedOutput: "" },
      { number: 10, type: "fillblank", difficulty: "medium", question: "Completează inițializarea unui nod ca nevizitat:\n```c\nint vizitat[10];\nmemset(vizitat, ___, sizeof(vizitat));\n```", answer: "0", starterCode: "", language: "c", expectedOutput: "" },
      { number: 11, type: "coding", difficulty: "medium", question: "Creează matricea de adiacență pentru un graf cu 3 noduri: muchii 0-1, 1-2. Afișează rândul 0: `0 1 0`.", answer: "#include <stdio.h>\nint main() {\n    int g[3][3] = {0};\n    g[0][1] = g[1][0] = 1;\n    g[1][2] = g[2][1] = 1;\n    for (int j = 0; j < 3; j++) printf(\"%d \", g[0][j]);\n    return 0;\n}", starterCode: "", language: "c", expectedOutput: "0 1 0 " },
      { number: 12, type: "coding", difficulty: "medium", question: "Realizează DFS recursiv pe graful 0-1, 0-2 și afișează nodurile vizitate pornind din 0: `0 1 2`.", answer: "#include <stdio.h>\nint g[3][3], viz[3];\nvoid dfs(int u, int n) {\n    viz[u] = 1; printf(\"%d \", u);\n    for (int v = 0; v < n; v++) if (g[u][v] && !viz[v]) dfs(v, n);\n}\nint main() {\n    g[0][1] = g[1][0] = 1;\n    g[0][2] = g[2][0] = 1;\n    dfs(0, 3);\n    return 0;\n}", starterCode: "", language: "c", expectedOutput: "0 1 2 " },
      { number: 13, type: "coding", difficulty: "medium", question: "Numără câte muchii are un graf cu matricea: 0-1, 0-2, 1-2. Afișează `3`.", answer: "#include <stdio.h>\nint main() {\n    int g[3][3] = {0};\n    g[0][1]=g[1][0]=g[0][2]=g[2][0]=g[1][2]=g[2][1]=1;\n    int muchii = 0;\n    for (int i = 0; i < 3; i++)\n        for (int j = i+1; j < 3; j++)\n            if (g[i][j]) muchii++;\n    printf(\"%d\", muchii);\n    return 0;\n}", starterCode: "", language: "c", expectedOutput: "3" },
      { number: 14, type: "coding", difficulty: "medium", question: "Verifică dacă nodul 2 este vecin cu nodul 0 în graful 0-1, 1-2. Afișează `da` sau `nu`.", answer: "#include <stdio.h>\nint main() {\n    int g[3][3] = {0};\n    g[0][1]=g[1][0]=g[1][2]=g[2][1]=1;\n    printf(\"%s\", g[0][2] ? \"da\" : \"nu\");\n    return 0;\n}", starterCode: "", language: "c", expectedOutput: "nu" },
      { number: 15, type: "coding", difficulty: "medium", question: "Afișează gradul (numărul de vecini) al nodului 1 în graful 0-1, 1-2, 1-3.", answer: "#include <stdio.h>\nint main() {\n    int g[4][4] = {0};\n    g[0][1]=g[1][0]=g[1][2]=g[2][1]=g[1][3]=g[3][1]=1;\n    int grad = 0;\n    for (int j = 0; j < 4; j++) grad += g[1][j];\n    printf(\"%d\", grad);\n    return 0;\n}", starterCode: "", language: "c", expectedOutput: "3" },
    ],
  },
  // 21. "30. Mini Proiect C — Sistem de Gestiune"
  {
    lessonId: "6a08cf2e999573855635cad5",
    name: "30. Mini Proiect C — Sistem de Gestiune",
    tasks: [
      { number: 6, type: "fillblank", difficulty: "medium", question: "Completează structura unui produs:\n```c\ntypedef struct {\n    char _____[50];\n    float pret;\n    int stoc;\n} Produs;\n```", answer: "nume", starterCode: "", language: "c", expectedOutput: "" },
      { number: 7, type: "fillblank", difficulty: "medium", question: "Ce funcție inserează un produs nou într-un array?\n```c\nvoid adauga(Produs arr[], int *n, Produs p) {\n    arr[(*n)___] = p;\n}\n```", answer: "++", starterCode: "", language: "c", expectedOutput: "" },
      { number: 8, type: "fillblank", difficulty: "medium", question: "Ce se afișează?\n```c\ntypedef struct { int id; float pret; } Produs;\nProdus p = {1, 29.99};\nprintf(\"%.2f\", p.pret);\n// Răspuns: ___\n```", answer: "29.99", starterCode: "", language: "c", expectedOutput: "" },
      { number: 9, type: "fillblank", difficulty: "medium", question: "Completează condiția de căutare a produsului cu id-ul dat:\n```c\nfor (int i = 0; i < n; i++)\n    if (arr[i].___ == id) return i;\n```", answer: "id", starterCode: "", language: "c", expectedOutput: "" },
      { number: 10, type: "fillblank", difficulty: "medium", question: "Funcția ce eliberează memoria alocată dinamic pentru array-ul de produse este ___.", answer: "free", starterCode: "", language: "c", expectedOutput: "" },
      { number: 11, type: "coding", difficulty: "medium", question: "Declară o structură `Produs` cu `int id` și `float pret`. Crează un produs cu `id=1, pret=49.99` și afișează prețul.", answer: "#include <stdio.h>\ntypedef struct { int id; float pret; } Produs;\nint main() {\n    Produs p = {1, 49.99f};\n    printf(\"%.2f\", p.pret);\n    return 0;\n}", starterCode: "", language: "c", expectedOutput: "49.99" },
      { number: 12, type: "coding", difficulty: "medium", question: "Afișează numărul total de produse din array-ul cu 3 elemente.", answer: "#include <stdio.h>\ntypedef struct { int id; } Produs;\nint main() {\n    Produs arr[3] = {{1}, {2}, {3}};\n    printf(\"%zu\", sizeof(arr)/sizeof(arr[0]));\n    return 0;\n}", starterCode: "", language: "c", expectedOutput: "3" },
      { number: 13, type: "coding", difficulty: "medium", question: "Calculează valoarea totală a stocului: `{pret=10, stoc=3}` și `{pret=5, stoc=4}`. Afișează `50`.", answer: "#include <stdio.h>\ntypedef struct { float pret; int stoc; } Produs;\nint main() {\n    Produs arr[] = {{10, 3}, {5, 4}};\n    float total = 0;\n    for (int i = 0; i < 2; i++) total += arr[i].pret * arr[i].stoc;\n    printf(\"%.0f\", total);\n    return 0;\n}", starterCode: "", language: "c", expectedOutput: "50" },
      { number: 14, type: "coding", difficulty: "medium", question: "Afișează produsul cu prețul cel mai mic din array-ul `{id=1,pret=30}, {id=2,pret=15}, {id=3,pret=25}`.", answer: "#include <stdio.h>\ntypedef struct { int id; float pret; } Produs;\nint main() {\n    Produs arr[] = {{1,30},{2,15},{3,25}};\n    int idx = 0;\n    for (int i = 1; i < 3; i++) if (arr[i].pret < arr[idx].pret) idx = i;\n    printf(\"%d\", arr[idx].id);\n    return 0;\n}", starterCode: "", language: "c", expectedOutput: "2" },
      { number: 15, type: "coding", difficulty: "medium", question: "Afișează câte produse au stocul mai mare de 0 din `{stoc=5}, {stoc=0}, {stoc=3}`.", answer: "#include <stdio.h>\ntypedef struct { int stoc; } Produs;\nint main() {\n    Produs arr[] = {{5},{0},{3}};\n    int cnt = 0;\n    for (int i = 0; i < 3; i++) if (arr[i].stoc > 0) cnt++;\n    printf(\"%d\", cnt);\n    return 0;\n}", starterCode: "", language: "c", expectedOutput: "2" },
    ],
  },
  // 22. "32. Threads POSIX in C"
  {
    lessonId: "6a09b9cc855b60bc2da6d960",
    name: "32. Threads POSIX in C",
    tasks: [
      { number: 6, type: "fillblank", difficulty: "medium", question: "Header-ul necesar pentru POSIX threads este:\n```c\n#include <___>\n```", answer: "pthread.h", starterCode: "", language: "c", expectedOutput: "" },
      { number: 7, type: "fillblank", difficulty: "medium", question: "Completează funcția de creare a unui thread:\n```c\npthread_t t;\n___(& t, NULL, functie, NULL);\n```", answer: "pthread_create", starterCode: "", language: "c", expectedOutput: "" },
      { number: 8, type: "fillblank", difficulty: "medium", question: "Funcția care așteaptă terminarea unui thread este ___.\n```c\n___(t, NULL);\n```", answer: "pthread_join", starterCode: "", language: "c", expectedOutput: "" },
      { number: 9, type: "fillblank", difficulty: "medium", question: "Tipul variabilei mutex POSIX este ___.\n```c\n___ mtx = PTHREAD_MUTEX_INITIALIZER;\n```", answer: "pthread_mutex_t", starterCode: "", language: "c", expectedOutput: "" },
      { number: 10, type: "fillblank", difficulty: "medium", question: "Funcția care blochează un mutex este ___.\n```c\n___(& mtx);\n```", answer: "pthread_mutex_lock", starterCode: "", language: "c", expectedOutput: "" },
      { number: 11, type: "coding", difficulty: "medium", question: "Afișează `Thread pornit` dintr-o funcție de thread și rulează-o din main.", answer: "#include <stdio.h>\n#include <pthread.h>\nvoid *f(void *arg) { printf(\"Thread pornit\"); return NULL; }\nint main() {\n    pthread_t t;\n    pthread_create(&t, NULL, f, NULL);\n    pthread_join(t, NULL);\n    return 0;\n}", starterCode: "", language: "c", expectedOutput: "Thread pornit" },
      { number: 12, type: "coding", difficulty: "medium", question: "Creează 2 thread-uri care fiecare afișează `hello` și așteaptă terminarea lor.", answer: "#include <stdio.h>\n#include <pthread.h>\nvoid *f(void *arg) { printf(\"hello\\n\"); return NULL; }\nint main() {\n    pthread_t t[2];\n    for (int i = 0; i < 2; i++) pthread_create(&t[i], NULL, f, NULL);\n    for (int i = 0; i < 2; i++) pthread_join(t[i], NULL);\n    return 0;\n}", starterCode: "", language: "c", expectedOutput: "hello\nhello\n" },
      { number: 13, type: "coding", difficulty: "medium", question: "Transmite un int `42` unui thread prin argument și afișează-l în thread.", answer: "#include <stdio.h>\n#include <pthread.h>\nvoid *f(void *arg) { printf(\"%d\", *(int*)arg); return NULL; }\nint main() {\n    int val = 42;\n    pthread_t t;\n    pthread_create(&t, NULL, f, &val);\n    pthread_join(t, NULL);\n    return 0;\n}", starterCode: "", language: "c", expectedOutput: "42" },
      { number: 14, type: "coding", difficulty: "medium", question: "Folosește un mutex pentru a proteja incrementarea unui contor și afișează valoarea finală `2`.", answer: "#include <stdio.h>\n#include <pthread.h>\nint contor = 0;\npthread_mutex_t mtx = PTHREAD_MUTEX_INITIALIZER;\nvoid *inc(void *a) { pthread_mutex_lock(&mtx); contor++; pthread_mutex_unlock(&mtx); return NULL; }\nint main() {\n    pthread_t t[2];\n    for (int i = 0; i < 2; i++) pthread_create(&t[i], NULL, inc, NULL);\n    for (int i = 0; i < 2; i++) pthread_join(t[i], NULL);\n    printf(\"%d\", contor);\n    return 0;\n}", starterCode: "", language: "c", expectedOutput: "2" },
      { number: 15, type: "coding", difficulty: "medium", question: "Afișează ID-ul thread-ului curent folosind `pthread_self()`.", answer: "#include <stdio.h>\n#include <pthread.h>\nvoid *f(void *a) { printf(\"%lu\", (unsigned long)pthread_self()); return NULL; }\nint main() {\n    pthread_t t;\n    pthread_create(&t, NULL, f, NULL);\n    pthread_join(t, NULL);\n    return 0;\n}", starterCode: "", language: "c", expectedOutput: "" },
    ],
  },
  // 23. "33. Signals si Process Management in C"
  {
    lessonId: "6a09b9ce855b60bc2da6d973",
    name: "33. Signals si Process Management in C",
    tasks: [
      { number: 6, type: "fillblank", difficulty: "medium", question: "Header-ul pentru gestionarea semnalelor este:\n```c\n#include <___>\n```", answer: "signal.h", starterCode: "", language: "c", expectedOutput: "" },
      { number: 7, type: "fillblank", difficulty: "medium", question: "Funcția pentru înregistrarea unui handler de semnal este ___.\n```c\n___(SIGINT, handler);\n```", answer: "signal", starterCode: "", language: "c", expectedOutput: "" },
      { number: 8, type: "fillblank", difficulty: "medium", question: "Funcția care creează un proces nou este ___.\n```c\npid_t pid = ___();\n```", answer: "fork", starterCode: "", language: "c", expectedOutput: "" },
      { number: 9, type: "fillblank", difficulty: "medium", question: "Procesul copil are pid = ___ după `fork()`.", answer: "0", starterCode: "", language: "c", expectedOutput: "" },
      { number: 10, type: "fillblank", difficulty: "medium", question: "Semnalul trimis la apăsarea `Ctrl+C` este ___.", answer: "SIGINT", starterCode: "", language: "c", expectedOutput: "" },
      { number: 11, type: "coding", difficulty: "medium", question: "Afișează PID-ul procesului curent.", answer: "#include <stdio.h>\n#include <unistd.h>\nint main() {\n    printf(\"%d\", getpid());\n    return 0;\n}", starterCode: "", language: "c", expectedOutput: "" },
      { number: 12, type: "coding", difficulty: "medium", question: "Înregistrează un handler pentru SIGTERM care afișează `Terminat` și trimite semnalul procesului.", answer: "#include <stdio.h>\n#include <signal.h>\n#include <unistd.h>\nvoid h(int s) { printf(\"Terminat\"); }\nint main() {\n    signal(SIGTERM, h);\n    raise(SIGTERM);\n    return 0;\n}", starterCode: "", language: "c", expectedOutput: "Terminat" },
      { number: 13, type: "coding", difficulty: "medium", question: "Folosind `fork()`, afișează `copil` din procesul copil și `parinte` din procesul părinte.", answer: "#include <stdio.h>\n#include <unistd.h>\n#include <sys/wait.h>\nint main() {\n    pid_t pid = fork();\n    if (pid == 0) { printf(\"copil\"); }\n    else { wait(NULL); printf(\"parinte\"); }\n    return 0;\n}", starterCode: "", language: "c", expectedOutput: "copilparinte" },
      { number: 14, type: "coding", difficulty: "medium", question: "Afișează PPID-ul (părintele) procesului curent.", answer: "#include <stdio.h>\n#include <unistd.h>\nint main() {\n    printf(\"%d\", getppid());\n    return 0;\n}", starterCode: "", language: "c", expectedOutput: "" },
      { number: 15, type: "coding", difficulty: "medium", question: "Ignoră semnalul SIGUSR1 și afișează `OK`.", answer: "#include <stdio.h>\n#include <signal.h>\nint main() {\n    signal(SIGUSR1, SIG_IGN);\n    printf(\"OK\");\n    return 0;\n}", starterCode: "", language: "c", expectedOutput: "OK" },
    ],
  },
  // 24. "34. Interfata C cu Python"
  {
    lessonId: "6a09b9d1855b60bc2da6d987",
    name: "34. Interfata C cu Python",
    tasks: [
      { number: 6, type: "fillblank", difficulty: "medium", question: "Pentru a crea o librărie partajată din C, se folosește flag-ul:\n```bash\ngcc -shared ___ modul.c -o modul.so\n```", answer: "-fPIC", starterCode: "", language: "c", expectedOutput: "" },
      { number: 7, type: "fillblank", difficulty: "medium", question: "Modulul Python care apelează funcții C native se numește ___.", answer: "ctypes", starterCode: "", language: "c", expectedOutput: "" },
      { number: 8, type: "fillblank", difficulty: "medium", question: "Completează exportul funcției pentru interfața C/Python:\n```c\n___ int aduna(int a, int b) { return a + b; }\n```", answer: "extern", starterCode: "", language: "c", expectedOutput: "" },
      { number: 9, type: "fillblank", difficulty: "medium", question: "Fișierul header `Python.h` este inclus pentru a scrie extensii ___.\n```c\n#include <Python.h>\n```", answer: "CPython", starterCode: "", language: "c", expectedOutput: "" },
      { number: 10, type: "fillblank", difficulty: "medium", question: "Tipul de date Python corespunzător unui `int` C în ctypes este ___.", answer: "c_int", starterCode: "", language: "c", expectedOutput: "" },
      { number: 11, type: "coding", difficulty: "medium", question: "Scrie o funcție C `int aduna(int a, int b)` și afișează `aduna(10, 5)`.", answer: "#include <stdio.h>\nint aduna(int a, int b) { return a + b; }\nint main() {\n    printf(\"%d\", aduna(10, 5));\n    return 0;\n}", starterCode: "", language: "c", expectedOutput: "15" },
      { number: 12, type: "coding", difficulty: "medium", question: "Afișează `interfata C-Python` ca string.", answer: "#include <stdio.h>\nint main() {\n    printf(\"interfata C-Python\");\n    return 0;\n}", starterCode: "", language: "c", expectedOutput: "interfata C-Python" },
      { number: 13, type: "coding", difficulty: "medium", question: "Scrie o funcție `double putere(double b, int e)` care calculează `b^e` și afișează `putere(2.0, 10)` ca `%.0f`.", answer: "#include <stdio.h>\ndouble putere(double b, int e) { double r = 1; for (int i = 0; i < e; i++) r *= b; return r; }\nint main() {\n    printf(\"%.0f\", putere(2.0, 10));\n    return 0;\n}", starterCode: "", language: "c", expectedOutput: "1024" },
      { number: 14, type: "coding", difficulty: "medium", question: "Afișează tipul de date `int` din C are ___ octeți.", answer: "#include <stdio.h>\nint main() {\n    printf(\"%zu\", sizeof(int));\n    return 0;\n}", starterCode: "", language: "c", expectedOutput: "4" },
      { number: 15, type: "coding", difficulty: "medium", question: "Afișează `callback apelat` dintr-o funcție apelată prin pointer (simulare callback C).", answer: "#include <stdio.h>\nvoid callback() { printf(\"callback apelat\"); }\nvoid executa(void (*cb)()) { cb(); }\nint main() {\n    executa(callback);\n    return 0;\n}", starterCode: "", language: "c", expectedOutput: "callback apelat" },
    ],
  },
  // 25. "35. Mini Proiect C — Server HTTP Simplu"
  {
    lessonId: "6a09b9d4855b60bc2da6d99b",
    name: "35. Mini Proiect C — Server HTTP Simplu",
    tasks: [
      { number: 6, type: "fillblank", difficulty: "medium", question: "Header-ul pentru socket-uri în C este:\n```c\n#include <___>\n```", answer: "sys/socket.h", starterCode: "", language: "c", expectedOutput: "" },
      { number: 7, type: "fillblank", difficulty: "medium", question: "Funcția care creează un socket este ___.\n```c\nint fd = ___(AF_INET, SOCK_STREAM, 0);\n```", answer: "socket", starterCode: "", language: "c", expectedOutput: "" },
      { number: 8, type: "fillblank", difficulty: "medium", question: "Portul standard pentru HTTP este ___.", answer: "80", starterCode: "", language: "c", expectedOutput: "" },
      { number: 9, type: "fillblank", difficulty: "medium", question: "Funcția care face socket-ul să asculte conexiuni este ___.\n```c\n___(fd, BACKLOG);\n```", answer: "listen", starterCode: "", language: "c", expectedOutput: "" },
      { number: 10, type: "fillblank", difficulty: "medium", question: "Primul rând al unui răspuns HTTP 200 este:\n```\nHTTP/1.1 ___ OK\n```", answer: "200", starterCode: "", language: "c", expectedOutput: "" },
      { number: 11, type: "coding", difficulty: "medium", question: "Afișează `Server HTTP pornit pe portul 8080`.", answer: "#include <stdio.h>\nint main() {\n    printf(\"Server HTTP pornit pe portul 8080\");\n    return 0;\n}", starterCode: "", language: "c", expectedOutput: "Server HTTP pornit pe portul 8080" },
      { number: 12, type: "coding", difficulty: "medium", question: "Construiește un string de răspuns HTTP simplu și afișează primele 15 caractere.", answer: "#include <stdio.h>\nint main() {\n    char *r = \"HTTP/1.1 200 OK\";\n    printf(\"%.15s\", r);\n    return 0;\n}", starterCode: "", language: "c", expectedOutput: "HTTP/1.1 200 OK" },
      { number: 13, type: "coding", difficulty: "medium", question: "Parsează metoda HTTP din `\"GET /index.html HTTP/1.1\"` și afișează `GET`.", answer: "#include <stdio.h>\n#include <string.h>\nint main() {\n    char req[] = \"GET /index.html HTTP/1.1\";\n    char metoda[10];\n    sscanf(req, \"%s\", metoda);\n    printf(\"%s\", metoda);\n    return 0;\n}", starterCode: "", language: "c", expectedOutput: "GET" },
      { number: 14, type: "coding", difficulty: "medium", question: "Afișează calea din request-ul HTTP `\"GET /hello HTTP/1.1\"` → `/hello`.", answer: "#include <stdio.h>\nint main() {\n    char req[] = \"GET /hello HTTP/1.1\";\n    char metoda[10], cale[50];\n    sscanf(req, \"%s %s\", metoda, cale);\n    printf(\"%s\", cale);\n    return 0;\n}", starterCode: "", language: "c", expectedOutput: "/hello" },
      { number: 15, type: "coding", difficulty: "medium", question: "Afișează `Content-Length: 13` pentru body-ul `Hello, World!`.", answer: "#include <stdio.h>\n#include <string.h>\nint main() {\n    char body[] = \"Hello, World!\";\n    printf(\"Content-Length: %zu\", strlen(body));\n    return 0;\n}", starterCode: "", language: "c", expectedOutput: "Content-Length: 13" },
    ],
  },
];

async function main() {
  for (const fix of FIXES) {
    const del = await prisma.task.deleteMany({
      where: { lessonId: fix.lessonId, number: { gte: 6 } },
    });
    await prisma.task.createMany({
      data: fix.tasks.map((t) => ({ ...t, lessonId: fix.lessonId })),
    });
    console.log(`✓ ${fix.name} — deleted ${del.count}, created ${fix.tasks.length}`);
  }
  console.log("Done.");
  await prisma.$disconnect();
}
main().catch((e) => {
  console.error(e);
  process.exit(1);
});
