"use strict";
require("dotenv").config({ path: ".env" });
const { PrismaClient } = require("@prisma/client");
const p = new PrismaClient();
const UPDATES = [
  {
    lesson: "1. Introducere în C + primul program",
    title: "Ce este C?",
    content: `**C** este un limbaj de programare de nivel mediu, creat de **Dennis Ritchie** în 1972 la Bell Labs pentru a rescrie kernel-ul UNIX. Este unul dintre cele mai influente limbaje din istorie — practic orice limbaj modern (C++, Java, C#, Python, JavaScript) a împrumutat sintaxă sau concepte din C.

**De ce să înveți C în 2025?**
• **Înțelegi cum funcționează calculatorul** — memorie, pointeri, adrese, stack vs heap
• **Viteză maximă** — compilat direct la cod mașină, fără overhead de runtime
• **Omniprezent în sisteme** — kernel Linux, Windows NT, firmware, drivere, embedded systems
• **Fundament solid** — după C, orice alt limbaj pare simplu

**Unde se folosește C astăzi?**
• **Sisteme de operare** — Linux kernel, FreeBSD, Windows kernel sunt scrise în C
• **Sisteme embedded** — microcontrolere Arduino, ESP32, STM32
• **Baze de date** — PostgreSQL, SQLite, MySQL sunt în C
• **Compilatoare și interpretoare** — CPython (Python) este scris în C
• **Jocuri și motoare grafice** — Doom, Quake, motoare 3D

**Standardele C:**
| Standard | An  | Noutăți principale |
|----------|-----|-------------------|
| K&R C    | 1978 | Prima carte — "The C Programming Language" |
| ANSI C / C89 | 1989 | Standardizat oficial |
| C99      | 1999 | \`//\` comments, \`bool\`, \`long long\`, VLA |
| C11      | 2011 | Threading, atomics, \`_Generic\` |
| C17      | 2017 | Bug fixes la C11 |
| C23      | 2023 | Ultimul standard curent |

**C vs C++ vs Java — comparație rapidă:**
\`\`\`
C:    procedural, manual memory, rapid, simplu, periculos
C++:  OOP pe lângă C, template-uri, STL, mai complex
Java: OOP pur, garbage collected, portabil, mai lent
\`\`\`

C este considerat "pointerul la programare" — odată ce înțelegi pointerii și memoria în C, totul altceva devine clar.`
  },
  {
    lesson: "1. Introducere în C + primul program",
    title: "Compilare și execuție",
    content: `Un program C **nu rulează direct** din sursa text — trebuie parcurse mai multe etape de transformare până ajunge la cod executabil.

**Etapele compilării:**

\`\`\`
fișier.c  →  Preprocesor  →  Compiler  →  Assembler  →  Linker  →  executabil
\`\`\`

**1. Preprocesor** (cpp)
• Procesează directivele \`#include\`, \`#define\`, \`#ifdef\`
• Înlocuiește macro-urile cu valorile lor
• Elimină comentariile

**2. Compilare** (cc1)
• Analizează sintaxa și semantica
• Generează cod assembly (\`.s\`)

**3. Asamblare** (as)
• Transformă assembly-ul în cod obiect binar (\`.o\`)

**4. Linking** (ld)
• Combină \`.o\` files + biblioteci (libc)
• Produce executabilul final

**GCC — cel mai folosit compilator:**
\`\`\`bash
# compilare simplă
gcc program.c -o program

# cu warnings activate (recomandat)
gcc -Wall -Wextra -o program program.c

# cu standardul C11
gcc -std=c11 -Wall -o program program.c

# cu optimizări
gcc -O2 -o program program.c

# debug info (pentru GDB)
gcc -g -o program program.c
\`\`\`

**Flag-uri utile GCC:**
• \`-Wall\` — activează toate warning-urile importante
• \`-Wextra\` — warning-uri suplimentare
• \`-O2\` / \`-O3\` — optimizări de viteză
• \`-g\` — simboluri de debug
• \`-std=c11\` — specifică standardul C
• \`-fsanitize=address\` — detectează buffer overflows la runtime

**Pe Windows vs Linux:**
\`\`\`bash
# Linux/macOS
gcc hello.c -o hello
./hello

# Windows (MinGW sau WSL)
gcc hello.c -o hello.exe
hello.exe
\`\`\`

**Erori frecvente la compilare:**
• \`implicit declaration of function\` — ai uitat \`#include\`
• \`undefined reference\` — linking error, funcție nedefinită
• \`expected ';' before\` — ai uitat punct și virgulă
• \`warning: unused variable\` — variabilă declarată dar nefolosită`
  },
  {
    lesson: "1. Introducere în C + primul program",
    title: "Structura programului",
    content: `Orice program C are o structură standard pe care trebuie s-o respecți. Iată un program complet analizat:

\`\`\`c
#include <stdio.h>   /* (1) Header - importă funcții I/O */
#include <stdlib.h>  /* funcții utilitare: malloc, exit, etc. */

/* (2) Funcție auxiliară definită înainte de main */
void saluta(const char *nume) {
    printf("Salut, %s!\\n", nume);
}

/* (3) Funcția main — punctul de intrare al programului */
int main(void) {
    /* (4) Declarații locale */
    int varsta = 20;
    char *nume = "Cristi";

    /* (5) Logică */
    saluta(nume);
    printf("Ai %d ani.\\n", varsta);

    /* (6) Return value — 0 = succes, != 0 = eroare */
    return 0;
}
\`\`\`

**Elementele esențiale:**

**1. \`#include\` — directive preprocesor**
• \`<stdio.h>\` — funcții I/O: \`printf\`, \`scanf\`, \`fopen\`, \`fclose\`
• \`<stdlib.h>\` — \`malloc\`, \`free\`, \`exit\`, \`atoi\`, \`rand\`
• \`<string.h>\` — \`strcpy\`, \`strlen\`, \`strcmp\`, \`strcat\`
• \`<math.h>\` — \`sqrt\`, \`pow\`, \`sin\`, \`cos\`

**2. Funcția \`main\`**
• Este **obligatorie** — programul pornește din \`main()\`
• Variante valide: \`int main(void)\`, \`int main(int argc, char *argv[])\`
• \`void main()\` — incorect din punct de vedere al standardului

**3. \`return 0;\`**
• Valoarea returnată de \`main\` este **exit code-ul** procesului
• \`0\` = program terminat cu succes
• \`1\` (sau altă valoare) = eroare

**Ordinea declarațiilor în C89/C90 vs C99+:**
\`\`\`c
// C89: TOATE variabilele declarate la ÎNCEPUTUL blocului
void func() {
    int i, j;  /* declarat înainte de orice cod */
    i = 5;
    j = 10;
}

// C99+: poți declara oriunde (ca în C++)
void func() {
    int i = 5;
    printf("%d", i);
    int j = 10;  /* OK în C99 */
}
\`\`\`

**Comentarii:**
\`\`\`c
/* Comentariu bloc — C89 */
// Comentariu linie — C99+ (și acceptat de toți compilatorii moderni)
\`\`\`

**Convenție de denumire în C:**
• Funcții și variabile: \`snake_case\` (calculeaza_suma, numar_elemente)
• Constante macro: \`UPPER_CASE\` (MAX_SIZE, PI)
• Tipuri (typedef): \`PascalCase\` sau \`snake_case_t\``
  },
  {
    lesson: "2. Variabile și tipuri",
    title: "Tipuri de bază",
    content: `C este un limbaj **tipizat static** — fiecare variabilă are un tip fix, declarat explicit la compilare. Spre deosebire de Python sau JavaScript, în C nu există tipuri dinamice.

**Tipurile numerice fundamentale:**

| Tip | Dimensiune | Range (signed) | Format printf |
|-----|-----------|----------------|---------------|
| \`char\` | 1 byte | -128 ... 127 | \`%c\` (caracter), \`%d\` (număr) |
| \`short\` | 2 bytes | -32768 ... 32767 | \`%hd\` |
| \`int\` | 4 bytes | -2.1B ... 2.1B | \`%d\` |
| \`long\` | 4/8 bytes | depinde de platformă | \`%ld\` |
| \`long long\` | 8 bytes | -9.2Q ... 9.2Q | \`%lld\` |
| \`float\` | 4 bytes | ~±3.4×10³⁸ | \`%f\` |
| \`double\` | 8 bytes | ~±1.7×10³⁰⁸ | \`%lf\` / \`%f\` |

**Verificarea dimensiunii cu \`sizeof()\`:**
\`\`\`c
#include <stdio.h>

int main(void) {
    printf("char:      %zu bytes\\n", sizeof(char));      /* 1 */
    printf("int:       %zu bytes\\n", sizeof(int));       /* 4 */
    printf("long:      %zu bytes\\n", sizeof(long));      /* 4 sau 8 */
    printf("long long: %zu bytes\\n", sizeof(long long)); /* 8 */
    printf("float:     %zu bytes\\n", sizeof(float));     /* 4 */
    printf("double:    %zu bytes\\n", sizeof(double));    /* 8 */
    printf("pointer:   %zu bytes\\n", sizeof(void*));     /* 4 sau 8 */
    return 0;
}
\`\`\`

**Inițializare — bune practici:**
\`\`\`c
int a = 5;          /* OK */
int b;              /* PERICOL — valoare nedefinită (garbage) */
int c = 0;          /* Safe — inițializat explicit */
float pi = 3.14f;   /* f suffix = float literal (nu double) */
double e = 2.71828; /* default pentru literale zecimale */
char litera = 'A';  /* caracter — apostroafe simple */
\`\`\`

**Tipuri speciale din \`<stdint.h>\` (C99) — recomandate:**
\`\`\`c
#include <stdint.h>
int8_t   a;  /* exact 8 biți, signed */
uint16_t b;  /* exact 16 biți, unsigned */
int32_t  c;  /* exact 32 biți, signed */
uint64_t d;  /* exact 64 biți, unsigned */
\`\`\`
Avantaj: dimensiune garantată pe orice platformă.

**Conversii implicite (implicit casting):**
\`\`\`c
int a = 5, b = 2;
float rez = a / b;     /* GREȘIT: 2.000000 (integer division) */
float rez2 = (float)a / b;  /* CORECT: 2.500000 (explicit cast) */
\`\`\``
  },
  {
    lesson: "2. Variabile și tipuri",
    title: "printf cu format specifiers",
    content: `**\`printf\`** este funcția principală de afișare în C, definită în \`<stdio.h>\`. Acceptă un **format string** cu specificatori de format și o listă variabilă de argumente.

**Specificatori de bază:**
\`\`\`c
#include <stdio.h>

int main(void) {
    int n = 42;
    float f = 3.14f;
    double d = 2.71828;
    char c = 'A';
    char *s = "salut";

    printf("%d\\n",   n);  /* 42 */
    printf("%f\\n",   f);  /* 3.140000 */
    printf("%lf\\n",  d);  /* 2.718280 */
    printf("%c\\n",   c);  /* A */
    printf("%s\\n",   s);  /* salut */
    printf("%p\\n", &n);   /* adresă pointer, ex: 0x7ffd1234 */
    return 0;
}
\`\`\`

**Tabel complet specificatori:**
| Specificator | Tip | Exemplu |
|-------------|-----|---------|
| \`%d\` / \`%i\` | int | \`42\` |
| \`%u\` | unsigned int | \`4294967295\` |
| \`%ld\` | long | \`1234567890\` |
| \`%lld\` | long long | \`9876543210\` |
| \`%f\` | float/double | \`3.140000\` |
| \`%e\` | notație științifică | \`3.140000e+00\` |
| \`%g\` | f sau e, mai scurt | \`3.14\` |
| \`%c\` | char | \`A\` |
| \`%s\` | string (char*) | \`salut\` |
| \`%x\` / \`%X\` | hex lowercase/uppercase | \`2a\` / \`2A\` |
| \`%o\` | octal | \`52\` |
| \`%%\` | caracter literal % | \`%\` |

**Lățime și precizie:**
\`\`\`c
printf("%10d\\n",    42);   /* "        42" — aliniat dreapta, 10 chars */
printf("%-10d\\n",   42);   /* "42        " — aliniat stânga */
printf("%010d\\n",   42);   /* "0000000042" — zero-padded */
printf("%.2f\\n",  3.14159); /* "3.14"      — 2 zecimale */
printf("%8.2f\\n", 3.14159); /* "    3.14"  — lățime 8, 2 zecimale */
printf("%.*f\\n", 3, 3.14159); /* "3.142"  — precizie dinamică */
\`\`\`

**Secvențe escape:**
| Secvență | Efect |
|----------|-------|
| \`\\n\` | newline |
| \`\\t\` | tab orizontal |
| \`\\r\` | carriage return |
| \`\\\\\` | backslash literal |
| \`\\"\` | ghilimea dubla |
| \`\\'\` | apostrof |
| \`\\0\` | null byte |

**Greșeli frecvente:**
\`\`\`c
/* GREȘIT — mismatch tip/specificator */
float f = 3.14f;
printf("%d\\n", f);    /* UB — folosești %d pentru float */

/* CORECT */
printf("%f\\n", f);    /* sau %.2f pentru 2 zecimale */

/* GREȘIT — adresă în loc de valoare */
int x = 5;
printf("%d\\n", &x);   /* tipărește adresa, nu valoarea */

/* CORECT */
printf("%d\\n", x);
\`\`\``
  },
  {
    lesson: "2. Variabile și tipuri",
    title: "Constante și unsigned",
    content: `În C, constantele pot fi definite în două moduri: cu **\`const\`** (C89) sau cu **\`#define\`** (macro preprocesor). Tipurile **\`unsigned\`** extind range-ul pozitiv al variabilelor.

**\`const\` — constante cu tip:**
\`\`\`c
const int MAX_SIZE = 100;
const float PI = 3.14159f;
const char SEPARATOR = '|';

/* GREȘIT — nu poți modifica o constantă */
MAX_SIZE = 200;  /* eroare de compilare */
\`\`\`

**\`#define\` — macro-uri preprocesor:**
\`\`\`c
#define MAX_SIZE 100
#define PI       3.14159
#define SALUT    "Bună ziua!"

/* Nu are tip — înlocuire textuală pură */
/* ATENȚIE: fără spațiu între nume și valoare */
\`\`\`

**\`const\` vs \`#define\` — diferențe:**
| Aspect | \`const\` | \`#define\` |
|--------|----------|-----------|
| Tip de date | Da — verificat de compilator | Nu — text substitution |
| Debugging | Apare în debugger | Nu apare în debugger |
| Scope | Respectă scope-ul | Global în fișier |
| Recomandat pentru | Variabile de citit | Valori numerice simple |

**Tipuri unsigned — range extins pe pozitiv:**
\`\`\`c
/* signed int: -2,147,483,648 ... 2,147,483,647 */
int semnat = -5;

/* unsigned int: 0 ... 4,294,967,295 */
unsigned int nesemnat = 4000000000u;   /* sufixul 'u' */

unsigned char uc = 255;   /* 0-255 în loc de -128...127 */
unsigned short us = 65535;
unsigned long ul = 4294967295ul;
unsigned long long ull = 18446744073709551615ull;
\`\`\`

**Pericol — overflow unsigned:**
\`\`\`c
unsigned int x = 0;
x--;  /* NU devine -1, ci 4294967295 (wrap-around) */
printf("%u\\n", x);  /* 4294967295 */

unsigned int y = 4294967295u;
y++;  /* NU devine 4294967296, ci 0 (overflow) */
printf("%u\\n", y);  /* 0 */
\`\`\`

**Literale numerice — sufixuri:**
\`\`\`c
42         /* int */
42u        /* unsigned int */
42l        /* long */
42ul       /* unsigned long */
42ll       /* long long */
42ull      /* unsigned long long */
3.14f      /* float */
3.14       /* double */
3.14l      /* long double */
0x2A       /* hex — 42 */
052        /* octal — 42 */
0b101010   /* binary — 42 (gcc extension, C23 standard) */
\`\`\`

**Enum — constante înrudite:**
\`\`\`c
enum Zi { LUN=1, MAR, MIE, JOI, VIN, SAM, DUM };
enum Zi azi = MIE;
printf("Ziua %d\\n", azi);  /* 3 */
\`\`\``
  },
  {
    lesson: "3. Input/Output cu scanf",
    title: "scanf — citire de la utilizator",
    content: `**\`scanf\`** citește input de la utilizator (stdin) conform unui format string. Este complementul lui \`printf\` — folosește aceiași specificatori de format, dar necesită **adresele** variabilelor (\`&\`).

**Sintaxă de bază:**
\`\`\`c
#include <stdio.h>

int main(void) {
    int varsta;
    float inaltime;
    char initial;

    printf("Introdu varsta: ");
    scanf("%d", &varsta);          /* & obligatoriu pentru int */

    printf("Introdu inaltimea: ");
    scanf("%f", &inaltime);        /* %f pentru float */

    printf("Introdu initiala numelui: ");
    scanf(" %c", &initial);        /* spatiu inainte de %c consuma whitespace */

    printf("Ai %d ani, %f m, initiala '%c'\\n", varsta, inaltime, initial);
    return 0;
}
\`\`\`

**De ce \`&\` (address-of)?**
• \`scanf\` trebuie să **scrie** în variabilă — are nevoie de adresă
• \`printf\` citește valoarea — nu are nevoie de adresă
• Excepție: șiruri de caractere (char array) — nu au \`&\` (array = pointer implicit)

**Specificatori scanf:**
| Specificator | Citește |
|-------------|---------|
| \`%d\` | int |
| \`%f\` | float |
| \`%lf\` | double (**\`%lf\` obligatoriu**, nu \`%f\`!) |
| \`%c\` | un caracter |
| \`%s\` | cuvânt (până la whitespace) |
| \`%ld\` | long |
| \`%lld\` | long long |

**Valoarea returnată — numărul câmpurilor citite cu succes:**
\`\`\`c
int citite = scanf("%d %d", &a, &b);
if (citite != 2) {
    printf("Eroare la citire!\\n");
}
\`\`\`

**Probleme cu \`%c\` după \`%d\`:**
\`\`\`c
int n; char c;
scanf("%d", &n);
scanf("%c", &c);  /* citește newline rămas în buffer! */

/* Fix: spațiu înainte de %c */
scanf(" %c", &c);  /* spațiul consumă whitespace (include newline) */
\`\`\`

**\`%s\` — periculos (no bounds check):**
\`\`\`c
char nume[50];
scanf("%s", nume);       /* PERICULOS: buffer overflow dacă > 49 chars */
scanf("%49s", nume);     /* SIGUR: maxim 49 caractere + \\0 */
\`\`\``
  },
  {
    lesson: "3. Input/Output cu scanf",
    title: "Citire multiple valori",
    content: `Citirea mai multor valori în C se poate face în mai multe moduri — **\`scanf\` multiplu**, **\`fgets\`** pentru linii întregi, sau **\`getchar\`** pentru caracter cu caracter.

**scanf cu mai mulți specificatori:**
\`\`\`c
int a, b, c;
/* Utilizatorul poate scrie: "10 20 30" sau "10\\n20\\n30" */
scanf("%d %d %d", &a, &b, &c);
printf("Suma: %d\\n", a + b + c);
\`\`\`

**Citire în buclă:**
\`\`\`c
#include <stdio.h>

int main(void) {
    int n;
    printf("Cate numere? ");
    scanf("%d", &n);

    int i, suma = 0, x;
    for (i = 0; i < n; i++) {
        printf("Nr %d: ", i + 1);
        scanf("%d", &x);
        suma += x;
    }
    printf("Suma: %d, Media: %.2f\\n", suma, (float)suma / n);
    return 0;
}
\`\`\`

**\`fgets\` — citire linie întreagă (sigur):**
\`\`\`c
char linie[256];
printf("Scrie ceva: ");
fgets(linie, sizeof(linie), stdin);
/* fgets include \\n la final — eliminare: */
linie[strcspn(linie, "\\n")] = '\\0';
printf("Ai scris: '%s'\\n", linie);
\`\`\`

**\`getchar\` și \`putchar\` — caracter cu caracter:**
\`\`\`c
int c;
printf("Scrie text (Ctrl+D pentru stop):\\n");
while ((c = getchar()) != EOF) {
    putchar(c);   /* afișează caracterul */
}
\`\`\`

**Probleme cu buffer-ul stdin:**
\`\`\`c
int n;
char linie[100];

scanf("%d", &n);
/* stdin conține acum: "\\n" ramas dupa numarul introdus */

/* GREȘIT — fgets citeste linia goala */
fgets(linie, 100, stdin);

/* FIX — consumă newline-ul rămas */
int ch;
while ((ch = getchar()) != '\\n' && ch != EOF);
/* acum fgets va citi corect */
fgets(linie, 100, stdin);
\`\`\`

**Conversie string → număr:**
\`\`\`c
#include <stdlib.h>

char *str = "42";
int n   = atoi(str);        /* string to int */
double d = atof("3.14");    /* string to double */
long l  = atol("123456");   /* string to long */

/* Mai sigur — sscanf */
int x;
sscanf("123abc", "%d", &x);  /* x = 123 */
\`\`\``
  },
  {
    lesson: "3. Input/Output cu scanf",
    title: "Calcule simple cu input",
    content: `Calculele în C sunt afectate de **tipul operanzilor** — dacă ambii sunt \`int\`, rezultatul este \`int\` (cu trunchiere). Trebuie să înțelegi **implicit conversion** și **explicit casting** pentru rezultate corecte.

**Împărțire întreagă vs flotantă:**
\`\`\`c
int a = 7, b = 2;

int rez_int    = a / b;       /* 3  — trunchiat (nu 3.5) */
float rez_f1   = a / b;       /* 3.0 — se calculează int/int APOI se convertește */
float rez_f2   = (float)a / b;  /* 3.5 — CORECT: a devine float înainte de /  */
double rez_d   = (double)a / b; /* 3.5 — și mai precis */
float rez_f3   = 7.0f / 2;    /* 3.5 — literal float */
\`\`\`

**Exemplu — calculator simplu:**
\`\`\`c
#include <stdio.h>

int main(void) {
    double a, b;
    char op;

    printf("Expresie (ex: 5.2 + 3.1): ");
    scanf("%lf %c %lf", &a, &op, &b);

    switch (op) {
        case '+': printf("= %.4lf\\n", a + b); break;
        case '-': printf("= %.4lf\\n", a - b); break;
        case '*': printf("= %.4lf\\n", a * b); break;
        case '/':
            if (b == 0.0) printf("Eroare: impartire la zero!\\n");
            else printf("= %.4lf\\n", a / b);
            break;
        default:
            printf("Operator necunoscut: %c\\n", op);
    }
    return 0;
}
\`\`\`

**Modulul (\`%\`) — restul împărțirii:**
\`\`\`c
int n = 17;
printf("%d este %s\\n", n, (n % 2 == 0) ? "par" : "impar");
/* 17 este impar */

/* Verificare divizibilitate */
for (int i = 1; i <= 10; i++) {
    if (i % 3 == 0) printf("%d e divisibil cu 3\\n", i);
}
\`\`\`

**Conversii implicite în expresii mixte:**
\`\`\`c
int    i = 5;
float  f = 2.5f;
double d = 1.1;

/* int + float → float (i convertit la float) */
float r1 = i + f;   /* 7.5 */

/* float + double → double (f convertit la double) */
double r2 = f + d;  /* 3.6 */

/* int op int → int ÎNTOTDEAUNA */
int r3 = 5 / 2;     /* 2, NU 2.5 */
\`\`\`

**\`math.h\` — funcții matematice:**
\`\`\`c
#include <math.h>
double rad = sqrt(16.0);    /* 4.0 — radical */
double put = pow(2.0, 10.0); /* 1024.0 — putere */
double abs_v = fabs(-3.14); /* 3.14 — valoare absoluta */
double trunkat = floor(3.7); /* 3.0 */
double rotunjit = round(3.5); /* 4.0 */
/* Compilare: gcc -lm prog.c — leagă biblioteca math */
\`\`\``
  },
  {
    lesson: "4. Operatori",
    title: "Aritmetici și de comparare",
    content: `Operatorii din C formează baza oricărei expresii. Înțelegerea priorităților și comportamentelor specifice previne bug-uri subtile.

**Operatori aritmetici:**
\`\`\`c
int a = 17, b = 5;

printf("%d\\n", a + b);   /* 22 — adunare */
printf("%d\\n", a - b);   /* 12 — scădere */
printf("%d\\n", a * b);   /* 85 — înmulțire */
printf("%d\\n", a / b);   /* 3  — împărțire ÎNTREAGĂ */
printf("%d\\n", a % b);   /* 2  — modulo (restul) */

/* Împărțire cu semnul operandului în C99+ */
printf("%d\\n", -17 / 5);  /* -3 (trunchiat spre zero) */
printf("%d\\n", -17 % 5);  /* -2 */
\`\`\`

**Operatori de comparare — returnează 0 sau 1:**
\`\`\`c
int x = 5, y = 10;

printf("%d\\n", x == y);  /* 0 — false */
printf("%d\\n", x != y);  /* 1 — true */
printf("%d\\n", x < y);   /* 1 — true */
printf("%d\\n", x > y);   /* 0 — false */
printf("%d\\n", x <= y);  /* 1 — true */
printf("%d\\n", x >= y);  /* 0 — false */
\`\`\`

**Eroare clasică — \`=\` în loc de \`==\`:**
\`\`\`c
int n = 5;

/* GREȘIT — assignment în condiție (compilatorul POATE da warning) */
if (n = 10) {   /* n devine 10, condiția e true mereu */
    printf("Alocat!\\n");
}

/* CORECT */
if (n == 10) {
    printf("n este 10\\n");
}

/* Yoda conditions — stil defensiv */
if (10 == n) {   /* dacă scrii =, compilatorul eroare */
    ...
}
\`\`\`

**Prioritatea operatorilor (de la high la low):**
\`\`\`
()          parenteze — cea mai mare prioritate
* / %       multiplicativi
+ -         aditivi
< <= > >=   comparare relațională
== !=       egalitate
&&          AND logic
||          OR logic
?:          ternar
= += -=...  atribuire — cea mai mică prioritate
\`\`\`

**Operatori de atribuire compusă:**
\`\`\`c
int n = 10;
n += 5;   /* n = n + 5 → 15 */
n -= 3;   /* n = n - 3 → 12 */
n *= 2;   /* n = n * 2 → 24 */
n /= 4;   /* n = n / 4 → 6  */
n %= 4;   /* n = n % 4 → 2  */
\`\`\``
  },
  {
    lesson: "4. Operatori",
    title: "Logici și de incrementare",
    content: `Operatorii logici combină condiții, iar cei de incrementare modifică valori cu 1. Ambii au comportamente subtile ce trebuie înțelese bine.

**Operatori logici:**
\`\`\`c
int a = 5, b = 0, c = 3;

/* AND logic — ambele trebuie true */
if (a > 0 && c > 0) printf("Ambii pozitivi\\n");  /* true */

/* OR logic — cel puțin una trebuie true */
if (b > 0 || c > 0) printf("Cel putin unul pozitiv\\n");  /* true */

/* NOT logic — negare */
if (!b) printf("b este zero (falsy)\\n");  /* true */
\`\`\`

**Short-circuit evaluation — C nu evaluează dacă nu trebuie:**
\`\`\`c
int x = 0;

/* AND: dacă primul e false, al doilea NU se evaluează */
if (x != 0 && 10 / x > 1) {  /* SIGUR: 10/x nu se execută */
    printf("Conditie adevarata\\n");
}

/* OR: dacă primul e true, al doilea NU se evaluează */
if (x == 0 || printf("Executat?\\n")) {  /* printf NU rulează */
    printf("OK\\n");
}
\`\`\`

**Operatori de incrementare/decrementare:**
\`\`\`c
int n = 5;

/* PREFIX — incrementează ÎNAINTE de a folosi valoarea */
int a = ++n;  /* n devine 6, a = 6 */

/* POSTFIX — incrementează DUPĂ ce folosești valoarea */
int b = n++;  /* b = 6 (valoarea curentă), APOI n devine 7 */

printf("n=%d, a=%d, b=%d\\n", n, a, b);  /* n=7, a=6, b=6 */
\`\`\`

**Diferența prefix vs postfix în practică:**
\`\`\`c
int i = 0;
printf("%d\\n", i++);  /* afișează 0, APOI i devine 1 */
printf("%d\\n", i++);  /* afișează 1, APOI i devine 2 */
printf("%d\\n", ++i);  /* i devine 3, afișează 3 */

/* În bucle for — diferența nu contează (val nu e folosită) */
for (int k = 0; k < 5; k++) { ... }   /* k++ și ++k sunt echivalente */
for (int k = 0; k < 5; ++k) { ... }   /* stilul C++ (dar OK în C) */
\`\`\`

**Undefined Behavior — nu face asta:**
\`\`\`c
int x = 5;
int y = x++ + x++;  /* UNDEFINED BEHAVIOR — ordinea evaluarii nedefinita */

/* CORECT: separă incrementările */
int y = x + (x + 1);
x += 2;
\`\`\`

**Operatorul \`sizeof\` — operator, nu funcție:**
\`\`\`c
int arr[10];
printf("%zu\\n", sizeof(int));    /* 4 */
printf("%zu\\n", sizeof(arr));    /* 40 (10 * 4) */
printf("%zu\\n", sizeof arr);     /* fara paranteze — valid */
/* sizeof evaluează la compile-time, NU la runtime */
\`\`\``
  },
  {
    lesson: "4. Operatori",
    title: "Operatori bit (low-level)",
    content: `Operatorii bitwise lucrează direct cu **reprezentarea binară** a valorilor. Sunt esențiali în programarea de nivel scăzut: drivere, protocoale de rețea, compresie, criptografie.

**Cei 6 operatori bitwise:**
\`\`\`c
unsigned char a = 0b01101100;  /* 108 */
unsigned char b = 0b10110101;  /* 181 */

printf("AND:  %08b = %d\\n", a & b,  a & b);   /* 0b00100100 = 36 */
printf("OR:   %08b = %d\\n", a | b,  a | b);   /* 0b11111101 = 253 */
printf("XOR:  %08b = %d\\n", a ^ b,  a ^ b);   /* 0b11011001 = 217 */
printf("NOT:  %08b = %d\\n", ~a,     (unsigned char)~a); /* 0b10010011 = 147 */
printf("SHL:  %08b = %d\\n", a << 2, a << 2);  /* 0b10110000 = 176 */
printf("SHR:  %08b = %d\\n", a >> 2, a >> 2);  /* 0b00011011 = 27 */
\`\`\`

**Operații frecvente cu bitmask-uri (flags):**
\`\`\`c
#define FLAG_READ    (1 << 0)  /* bit 0: 0001 */
#define FLAG_WRITE   (1 << 1)  /* bit 1: 0010 */
#define FLAG_EXEC    (1 << 2)  /* bit 2: 0100 */
#define FLAG_HIDDEN  (1 << 3)  /* bit 3: 1000 */

unsigned int perms = FLAG_READ | FLAG_WRITE;  /* 0011 = 3 */

/* Verificare flag */
if (perms & FLAG_READ)  printf("Are read\\n");
if (perms & FLAG_WRITE) printf("Are write\\n");
if (!(perms & FLAG_EXEC)) printf("NU are exec\\n");

/* Setare flag */
perms |= FLAG_EXEC;     /* setează bitul EXEC */

/* Ștergere flag */
perms &= ~FLAG_WRITE;   /* șterge bitul WRITE */

/* Toggle flag */
perms ^= FLAG_HIDDEN;   /* inversează bitul HIDDEN */
\`\`\`

**Shift — înmulțire/împărțire rapidă cu puteri de 2:**
\`\`\`c
int n = 1;
printf("%d\\n", n << 0);  /* 1   = 1 * 2^0 */
printf("%d\\n", n << 1);  /* 2   = 1 * 2^1 */
printf("%d\\n", n << 3);  /* 8   = 1 * 2^3 */
printf("%d\\n", n << 10); /* 1024 */

int x = 100;
printf("%d\\n", x >> 1);  /* 50  = 100 / 2 */
printf("%d\\n", x >> 2);  /* 25  = 100 / 4 */
\`\`\`

**XOR — swap fără variabilă temporară:**
\`\`\`c
int a = 5, b = 7;
a ^= b;  /* a = a XOR b */
b ^= a;  /* b = b XOR a (care e original a) */
a ^= b;  /* a = a XOR b (care e original b) */
printf("a=%d, b=%d\\n", a, b);  /* a=7, b=5 */
\`\`\`

**Atenție — comportament nedefinit:**
\`\`\`c
int x = -1;
x >> 1;   /* UNDEFINED pe signed — folosește unsigned pentru bitwise ops */
unsigned int y = (unsigned int)-1;
y >> 1;   /* DEFINIT: shift logic */
\`\`\``
  },
  {
    lesson: "5. Condiții — if/else/switch",
    title: "if / else if / else",
    content: `Instrucțiunea **\`if\`** este fundamentul controlului fluxului în C. În C, orice valoare nenulă este **truthy**, zero este **falsy** — nu există un tip \`bool\` nativ în C89.

**Sintaxă completă:**
\`\`\`c
if (condiție1) {
    /* executat dacă condiție1 e true */
} else if (condiție2) {
    /* executat dacă condiție1 e false și condiție2 e true */
} else {
    /* executat dacă toate condițiile sunt false */
}
\`\`\`

**Exemplu practic — clasificare notă:**
\`\`\`c
#include <stdio.h>

int main(void) {
    int nota;
    printf("Introdu nota (1-10): ");
    scanf("%d", &nota);

    if (nota < 1 || nota > 10) {
        printf("Nota invalida!\\n");
    } else if (nota >= 9) {
        printf("Excelent!\\n");
    } else if (nota >= 7) {
        printf("Bine\\n");
    } else if (nota >= 5) {
        printf("Suficient\\n");
    } else {
        printf("Insuficient\\n");
    }
    return 0;
}
\`\`\`

**Condiții compuse:**
\`\`\`c
int varsta = 22, are_permis = 1;

/* AND — ambele condiții trebuie true */
if (varsta >= 18 && are_permis) {
    printf("Poate conduce\\n");
}

/* OR — cel puțin una true */
if (varsta < 18 || !are_permis) {
    printf("Nu poate conduce\\n");
}

/* NOT — negare */
if (!are_permis) {
    printf("Nu are permis\\n");
}
\`\`\`

**Corpul if fără acolade — periculos:**
\`\`\`c
/* OK, dar periculos */
if (x > 0)
    printf("pozitiv\\n");

/* BUG CLASIC — al doilea printf MEREU rulează */
if (x > 0)
    printf("pozitiv\\n");
    printf("si mare\\n");  /* NU face parte din if! */

/* SIGUR — întotdeauna cu acolade */
if (x > 0) {
    printf("pozitiv\\n");
    printf("si mare\\n");
}
\`\`\`

**Dangling else — problemă de ambiguitate:**
\`\`\`c
/* La ce if se leagă else? */
if (a > 0)
    if (b > 0)
        printf("ambii pozitivi\\n");
    else             /* Se leagă de if(b>0), nu de if(a>0)! */
        printf("a pozitiv, b nu\\n");

/* Forță prin acolade */
if (a > 0) {
    if (b > 0)
        printf("ambii pozitivi\\n");
} else {
    printf("a nu e pozitiv\\n");
}
\`\`\``
  },
  {
    lesson: "5. Condiții — if/else/switch",
    title: "switch / case",
    content: `**\`switch\`** evaluează o expresie întreagă și sare direct la case-ul corespunzător. Este mai eficient și mai lizibil decât un lanț lung de \`if/else\` când testezi valori discrete.

**Sintaxă cu break:**
\`\`\`c
#include <stdio.h>

int main(void) {
    int zi = 3;

    switch (zi) {
        case 1:
            printf("Luni\\n");
            break;
        case 2:
            printf("Marti\\n");
            break;
        case 3:
            printf("Miercuri\\n");
            break;
        case 4:
            printf("Joi\\n");
            break;
        case 5:
            printf("Vineri\\n");
            break;
        case 6:
        case 7:
            printf("Weekend\\n");  /* fall-through intenționat */
            break;
        default:
            printf("Zi invalida\\n");
    }
    return 0;
}
\`\`\`

**Fall-through — comportament implicit (periculos dacă e accidental):**
\`\`\`c
switch (x) {
    case 1:
        printf("unu\\n");
        /* FARA break — cade în case 2! */
    case 2:
        printf("doi\\n");
        break;
    case 3:
        printf("trei\\n");
        break;
}
/* Dacă x=1, afișează: "unu" ȘI "doi" */
\`\`\`

**Fall-through intenționat cu \`/* fallthrough */\` comment:**
\`\`\`c
switch (nivel) {
    case 3:
        printf("Nivel 3 bonus\\n");
        /* fallthrough */  /* Comentariu explicit — nu e bug */
    case 2:
        printf("Nivel 2 bonus\\n");
        /* fallthrough */
    case 1:
        printf("Nivel 1 bonus\\n");
        break;
    default:
        printf("Fara bonus\\n");
}
\`\`\`

**Switch cu enum — pattern elegant:**
\`\`\`c
typedef enum { CERC, PATRAT, TRIUNGHI } Forma;

Forma f = PATRAT;
switch (f) {
    case CERC:     printf("Cerc\\n");     break;
    case PATRAT:   printf("Patrat\\n");   break;
    case TRIUNGHI: printf("Triunghi\\n"); break;
}
\`\`\`

**Restricții switch în C:**
• Expresia trebuie să fie de **tip integral** (int, char, enum) — nu float, nu string
• Case-urile trebuie să fie **constante** la compile-time — nu variabile
• Nu poți declara variabile în case fără acolade

\`\`\`c
/* GREȘIT — variabile după case fără bloc */
case 1:
    int x = 5;  /* eroare sau behavior ciudat */
    break;

/* CORECT */
case 1: {
    int x = 5;  /* OK — în bloc propriu */
    break;
}
\`\`\``
  },
  {
    lesson: "5. Condiții — if/else/switch",
    title: "Operator ternar și logică boolean",
    content: `**Operatorul ternar** \`?\` este o expresie condițională condensată. **Bool** în C are o istorie interesantă — C89 nu avea \`bool\` nativ, C99 l-a adăugat via \`<stdbool.h>\`.

**Operatorul ternar — sintaxă:**
\`\`\`c
/* condiție ? valoare_true : valoare_false */

int a = 5, b = 10;
int maxim = (a > b) ? a : b;      /* 10 */
printf("Maximul: %d\\n", maxim);

/* Echivalent if/else */
int maxim2;
if (a > b) maxim2 = a;
else maxim2 = b;
\`\`\`

**Utilizări frecvente:**
\`\`\`c
/* În printf direct */
printf("%s\\n", (n % 2 == 0) ? "par" : "impar");

/* Semn absolut */
int abs_val = (x >= 0) ? x : -x;

/* Clamping (limitare la interval) */
int clamped = (n < 0) ? 0 : (n > 100) ? 100 : n;

/* Alegere între două expresii */
float taxa = (varsta >= 18) ? 100.0f : 50.0f;
\`\`\`

**Bool în C — evoluție:**
\`\`\`c
/* C89 — fără bool, se folosesc int */
int este_pozitiv = (x > 0);  /* 1 sau 0 */
#define true  1
#define false 0
#define bool  int

/* C99 — <stdbool.h> adaugă tipul _Bool și macros */
#include <stdbool.h>

bool activ = true;
bool terminat = false;

if (activ) printf("Activ\\n");
if (!terminat) printf("Nu terminat\\n");

/* _Bool (tip nativ C99) — orice valoare nenulă → 1 */
_Bool x = 42;   /* x devine 1 */
_Bool y = 0;    /* y devine 0 */
\`\`\`

**Truthy/Falsy în C:**
\`\`\`c
/* Falsy — zero pentru orice tip */
0         /* int zero */
0.0       /* float/double zero */
NULL      /* pointer nul */
'\\0'     /* char nul */

/* Truthy — orice altceva */
-1, 42, 100   /* int nenul */
3.14          /* float nenul */
"string"      /* pointer nenul */
\`\`\`

**Antipattern — comparație cu true/false:**
\`\`\`c
bool activ = true;

/* EVITA compararea explicită cu true */
if (activ == true) { ... }   /* redundant */

/* PREFER */
if (activ) { ... }           /* idiomatic C */
if (!activ) { ... }          /* negare */
\`\`\``
  }
];

async function main() {
  let updated = 0, notFound = 0;
  for (const item of UPDATES) {
    const lessons = await p.lesson.findMany({ where: { title: item.lesson, module: { slug: "c" } } });
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
