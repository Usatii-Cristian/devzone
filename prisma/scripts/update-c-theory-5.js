"use strict";
require("dotenv").config({ path: ".env" });
const { PrismaClient } = require("@prisma/client");
const p = new PrismaClient();
const UPDATES = [
  {
    lesson: "19. Alocare dinamică avansată",
    title: "malloc, calloc, realloc",
    content: `Gestionarea memoriei dinamice este una din responsabilitățile principale ale programatorului C. \`malloc\`, \`calloc\` și \`realloc\` din \`<stdlib.h>\` sunt instrumentele principale.

**Recapitulare rapidă — diferențe cheie:**
\`\`\`c
#include <stdlib.h>

/* malloc — alocă bytes, conținut NEDEFINIT (garbage) */
int *a = malloc(10 * sizeof(int));

/* calloc — alocă și inițializează cu ZERO */
int *b = calloc(10, sizeof(int));  /* toți 0 */

/* realloc — redimensionează un bloc existent */
a = realloc(a, 20 * sizeof(int));  /* extinde la 20 elemente */
\`\`\`

**Pattern corect pentru alocare sigură:**
\`\`\`c
/* Funcție de alocare cu verificare */
void* xmalloc(size_t size) {
    void *ptr = malloc(size);
    if (ptr == NULL && size > 0) {
        fprintf(stderr, "malloc(%zu) esuat: %s\\n", size, strerror(errno));
        exit(EXIT_FAILURE);
    }
    return ptr;
}

void* xcalloc(size_t n, size_t size) {
    void *ptr = calloc(n, size);
    if (ptr == NULL && n > 0 && size > 0) {
        fprintf(stderr, "calloc(%zu, %zu) esuat\\n", n, size);
        exit(EXIT_FAILURE);
    }
    return ptr;
}

/* Utilizare */
int *arr = xmalloc(n * sizeof(int));
/* Nu mai trebuie verificat NULL — xmalloc termină programul la eșec */
\`\`\`

**realloc pattern corect — evită pierderea referinței:**
\`\`\`c
/* GREȘIT — dacă realloc eșuează, arr devine NULL și pierzi referința */
arr = realloc(arr, new_size);

/* CORECT */
int *tmp = realloc(arr, new_size * sizeof(int));
if (tmp == NULL) {
    /* arr e încă valid! */
    fprintf(stderr, "realloc esuat\\n");
    free(arr);   /* sau continuă cu arr nemodificat */
    exit(1);
}
arr = tmp;  /* actualizează doar dacă succes */
\`\`\`

**Calcul precis al dimensiunii:**
\`\`\`c
/* GREȘIT — dacă int e 8 bytes pe o platformă */
int *arr = malloc(10 * 4);

/* CORECT — portabil */
int *arr = malloc(10 * sizeof(int));
int *arr2 = malloc(10 * sizeof(*arr2));  /* și mai sigur */

/* Alocare struct */
typedef struct { int x, y; float z; } Punct;
Punct *p = malloc(sizeof(Punct));       /* un singur struct */
Punct *pts = malloc(100 * sizeof(*pts)); /* 100 struct-uri */
\`\`\``
  },
  {
    lesson: "19. Alocare dinamică avansată",
    title: "Array 2D alocat dinamic",
    content: `**Array-urile 2D alocate dinamic** permit crearea de matrice cu dimensiuni stabilite la runtime, esențiale pentru algoritmi cu input variabil.

**Metoda 1 — Array de pointeri la rânduri:**
\`\`\`c
#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int rows = 4, cols = 5;

    /* Alocă un array de rows pointeri */
    int **mat = (int**)malloc(rows * sizeof(int*));
    if (!mat) exit(1);

    /* Fiecare pointer arată spre un rând alocat */
    for (int i = 0; i < rows; i++) {
        mat[i] = (int*)malloc(cols * sizeof(int));
        if (!mat[i]) exit(1);
    }

    /* Utilizare — exact ca mat[i][j] static */
    for (int i = 0; i < rows; i++)
        for (int j = 0; j < cols; j++)
            mat[i][j] = i * cols + j;

    /* Afișare */
    for (int i = 0; i < rows; i++) {
        for (int j = 0; j < cols; j++)
            printf("%4d", mat[i][j]);
        printf("\\n");
    }

    /* Eliberare — în ordine inversă */
    for (int i = 0; i < rows; i++) free(mat[i]);
    free(mat);
    return 0;
}
\`\`\`

**Metoda 2 — Bloc continuu (mai eficient, cache-friendly):**
\`\`\`c
int rows = 4, cols = 5;

/* Alocă toată memoria continuu */
int *buf = malloc(rows * cols * sizeof(int));
if (!buf) exit(1);

/* Alocă pointeri spre rânduri */
int **mat = malloc(rows * sizeof(int*));
if (!mat) { free(buf); exit(1); }

for (int i = 0; i < rows; i++)
    mat[i] = buf + i * cols;  /* fiecare rând = offset în buf */

/* Utilizare identică */
mat[2][3] = 42;

/* Eliberare — doar 2 apeluri free */
free(mat);
free(buf);
\`\`\`

**Metoda 3 — Index manual (simplă, un singur malloc):**
\`\`\`c
int *mat = malloc(rows * cols * sizeof(int));

/* Acces: mat[i][j] → mat[i*cols + j] */
#define MAT(i, j) mat[(i)*cols + (j)]

for (int i = 0; i < rows; i++)
    for (int j = 0; j < cols; j++)
        MAT(i, j) = i + j;

printf("%d\\n", MAT(2, 3));  /* 5 */
free(mat);
\`\`\`

**Funcție generică pentru matrice:**
\`\`\`c
int** creeaza_matrice(int rows, int cols) {
    int **mat = malloc(rows * sizeof(int*));
    if (!mat) return NULL;
    for (int i = 0; i < rows; i++) {
        mat[i] = calloc(cols, sizeof(int));  /* inițializat cu 0 */
        if (!mat[i]) {
            for (int k = 0; k < i; k++) free(mat[k]);
            free(mat); return NULL;
        }
    }
    return mat;
}
void elibereaza_matrice(int **mat, int rows) {
    for (int i = 0; i < rows; i++) free(mat[i]);
    free(mat);
}
\`\`\``
  },
  {
    lesson: "19. Alocare dinamică avansată",
    title: "Common bugs: memory leak și dangling pointer",
    content: `**Memory leaks** și **dangling pointers** sunt cele mai frecvente bug-uri cu memoria dinamică în C — pot fi silențioase, intermitente și greu de diagnosticat.

**Memory Leak — memorie alocată dar niciodată eliberată:**
\`\`\`c
/* Bug 1 — free uitat */
void func_rea(void) {
    int *arr = malloc(100 * sizeof(int));
    /* procesare */
    return;  /* LEAK: arr niciodată eliberat */
}

/* Bug 2 — suprascris pointerul */
int *p = malloc(10 * sizeof(int));
p = malloc(20 * sizeof(int));  /* LEAK: primul bloc pierdut */

/* Bug 3 — early return fără free */
int *buf = malloc(1000);
if (eroare) return -1;  /* LEAK dacă eroare înainte de free(buf) */
/* Fix: free(buf); return -1; */

/* Bug 4 — excepție de flux neașteptată */
while (conditie) {
    int *tmp = malloc(sizeof(int));
    if (!valida(*tmp)) { continue; }  /* LEAK — continue fără free(tmp) */
    free(tmp);
}
\`\`\`

**Dangling Pointer — pointer la memorie invalidă:**
\`\`\`c
/* Bug 1 — use after free */
int *p = malloc(sizeof(int));
*p = 42;
free(p);
printf("%d\\n", *p);  /* UNDEFINED BEHAVIOR — p e dangling */

/* Bug 2 — pointer la variabilă locală din funcție */
int* returneaza_local(void) {
    int x = 5;
    return &x;   /* GREȘIT — x e pe stack, distrus la return */
}
int *p = returneaza_local();
printf("%d\\n", *p);  /* UNDEFINED BEHAVIOR */

/* Fix: returnează malloc sau static */
int* corect(void) {
    int *x = malloc(sizeof(int));
    *x = 5;
    return x;   /* caller e responsabil cu free */
}
\`\`\`

**Double free:**
\`\`\`c
int *p = malloc(sizeof(int));
free(p);
free(p);  /* DOUBLE FREE — undefined behavior, posibil crash */

/* Fix — set NULL după free */
free(p);
p = NULL;
free(p);  /* free(NULL) e sigur — nu face nimic */
\`\`\`

**Regula de aur — ownership:**
\`\`\`c
/* CINE alocă, ACELA eliberează */
/* Dacă o funcție returnează pointer alocat cu malloc,
   documentează că apelantul trebuie să facă free */
char* citeste_linie(FILE *f) {
    /* returnează buffer malloc — caller face free */
}
\`\`\``
  },
  {
    lesson: "19. Alocare dinamică avansată",
    title: "Instrumente: Valgrind și sanitizers",
    content: `**Valgrind** și **AddressSanitizer** sunt instrumentele standard pentru detectarea automată a erorilor de memorie în C.

**Valgrind — detectare runtime:**
\`\`\`bash
# Compilare cu debug info
gcc -g -o program program.c

# Rulare prin Valgrind
valgrind --leak-check=full \\
         --show-leak-kinds=all \\
         --track-origins=yes \\
         ./program

# Output example:
# ==12345== HEAP SUMMARY:
# ==12345==   in use at exit: 40 bytes in 1 blocks
# ==12345==   total heap usage: 3 allocs, 2 frees, 60 bytes
# ==12345==
# ==12345== 40 bytes in 1 blocks are definitely lost in loss record 1
# ==12345==   at 0x4C2FB0F: malloc (in .../valgrind/.../vgpreload_memcheck)
# ==12345==   by 0x10887B: func_rea (program.c:8)
\`\`\`

**AddressSanitizer (ASan) — integrat în GCC/Clang:**
\`\`\`bash
# Compilare cu ASan
gcc -fsanitize=address -fsanitize=undefined -g -o program program.c

# Rulare normală — ASan detectează automat
./program

# ASan detectează:
# - heap buffer overflow
# - stack buffer overflow
# - use after free
# - use after return
# - double free
# - memory leaks (cu -fsanitize=leak)
\`\`\`

**Exemplu — ASan output pentru use-after-free:**
\`\`\`
==12345==ERROR: AddressSanitizer: heap-use-after-free on address 0x...
READ of size 4 at 0x... thread T0
    #0 0x... in main program.c:15
    #1 0x... in __libc_start_main

0x... is located 0 bytes inside of 4-byte region [0x...,0x...)
freed by thread T0 here:
    #0 0x... in __interceptor_free
    #1 0x... in main program.c:13
\`\`\`

**UndefinedBehaviorSanitizer (UBSan):**
\`\`\`bash
gcc -fsanitize=undefined -g -o program program.c
# Detectează: integer overflow, null pointer dereference,
#             signed overflow, misaligned access
\`\`\`

**Workflow recomandat:**
\`\`\`bash
# 1. Compilare cu toți sanitizatorii activi
gcc -Wall -Wextra -fsanitize=address,undefined -g -o prog prog.c

# 2. Rulare teste — sanitizatorii raportează problemele

# 3. După corectare — verifică cu Valgrind pentru leaks reziduale
valgrind --leak-check=full ./prog
\`\`\``
  },
  {
    lesson: "20. Preprocesor C — macros și directivele",
    title: "#define — constante și macros",
    content: `**Preprocesorul C** rulează ÎNAINTE de compilare și efectuează substituții textuale. Nu cunoaște tipuri sau scope — înlocuiește text cu text.

**\`#define\` pentru constante:**
\`\`\`c
#define PI        3.14159265358979
#define MAX_SIZE  1024
#define GRAVITY   9.81
#define APP_NAME  "MyApp v1.0"

/* Utilizare */
float aria = PI * r * r;
int buf[MAX_SIZE];
printf("Aplicatie: %s\\n", APP_NAME);
\`\`\`

**\`#define\` pentru macros (funcție-like):**
\`\`\`c
/* Macros simple */
#define MAX(a, b)    ((a) > (b) ? (a) : (b))
#define MIN(a, b)    ((a) < (b) ? (a) : (b))
#define ABS(x)       ((x) >= 0 ? (x) : -(x))
#define SWAP(t,a,b)  do { t tmp=(a); (a)=(b); (b)=tmp; } while(0)

/* De ce paranteze? */
#define PATRAT(x)  x * x         /* GRESIT: PATRAT(2+3) = 2+3*2+3 = 11 */
#define PATRAT(x)  ((x) * (x))   /* CORECT: PATRAT(2+3) = (2+3)*(2+3) = 25 */

int a = MAX(3, 5);          /* 5 */
int b = MIN(3, 5);          /* 3 */
int c = ABS(-7);            /* 7 */
int x = 3, y = 4;
SWAP(int, x, y);            /* x=4, y=3 */
\`\`\`

**Macros pe mai multe linii cu \`do { } while(0)\`:**
\`\`\`c
/* Fara do-while — probleme la if fara acolade */
#define PRINT_ERR(msg) fprintf(stderr, "ERR: %s\\n", msg)
if (eroare) PRINT_ERR("fail");  /* OK */

/* Cu mai multe instrucțiuni: */
#define CHECK_NULL(p) do {           \\
    if ((p) == NULL) {               \\
        fprintf(stderr, "NULL!\\n");  \\
        exit(1);                     \\
    }                                \\
} while(0)

CHECK_NULL(ptr);  /* funcționează corect în orice context */
\`\`\`

**Macros predefinite:**
\`\`\`c
printf("Fișier: %s\\n",   __FILE__);  /* "program.c" */
printf("Linie: %d\\n",    __LINE__);  /* numărul liniei */
printf("Data: %s\\n",     __DATE__);  /* "Jan 01 2025" */
printf("Ora: %s\\n",      __TIME__);  /* "12:34:56" */
printf("Funcție: %s\\n",  __func__);  /* "main" (C99) */

/* Macro de debug util: */
#define DBG(fmt, ...) fprintf(stderr, "[%s:%d] " fmt "\\n", \\
                              __func__, __LINE__, ##__VA_ARGS__)
DBG("Valoare x = %d", x);
\`\`\``
  },
  {
    lesson: "20. Preprocesor C — macros și directivele",
    title: "#include, #ifdef — compilare condițională",
    content: `**Compilarea condițională** permite includerea sau excluderea unor blocuri de cod la compilare — pentru platforme diferite, configurații, build-uri debug vs release.

**\`#include\` — includerea header-elor:**
\`\`\`c
/* Header system — cautat în directoare standard */
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

/* Header local — cautat relativ la fișierul curent */
#include "mylib.h"
#include "../utils/helpers.h"
\`\`\`

**Include guards — previne includerea dublă:**
\`\`\`c
/* mylib.h */
#ifndef MYLIB_H    /* dacă MYLIB_H nu e definit */
#define MYLIB_H    /* definește-l acum */

/* tot conținutul header-ului */
int calculeaza(int a, int b);
typedef struct { int x, y; } Punct;

#endif /* MYLIB_H */

/* Alternativă modernă (GCC/Clang) */
#pragma once
\`\`\`

**Compilare condițională cu \`#ifdef\`/\`#ifndef\`:**
\`\`\`c
/* Debug vs Release */
#ifdef DEBUG
    #define LOG(msg) printf("[DEBUG] %s\\n", msg)
#else
    #define LOG(msg) /* nimic în release */
#endif

/* Compilare: gcc -DDEBUG program.c = activează debug */

/* Cross-platform */
#ifdef _WIN32
    #define SEPARATOR "\\\\"
    #include <windows.h>
#else
    #define SEPARATOR "/"
    #include <unistd.h>
#endif

/* Verificare versiune standard */
#if __STDC_VERSION__ >= 199901L
    #include <stdbool.h>   /* C99+ */
#else
    typedef int bool;
    #define true  1
    #define false 0
#endif
\`\`\`

**\`#if\`, \`#elif\`, \`#else\`:**
\`\`\`c
#define PLATFORM 2

#if   PLATFORM == 1
    #define OS_NAME "Linux"
#elif PLATFORM == 2
    #define OS_NAME "Windows"
#elif PLATFORM == 3
    #define OS_NAME "macOS"
#else
    #define OS_NAME "Unknown"
#endif

printf("OS: %s\\n", OS_NAME);  /* "Windows" */
\`\`\`

**\`#error\` și \`#warning\`:**
\`\`\`c
#ifndef MAX_SIZE
    #error "MAX_SIZE nu este definit! Adaugati -DMAX_SIZE=1024"
#endif

#if MAX_SIZE > 65536
    #warning "MAX_SIZE foarte mare — posibil overflow de stack"
#endif
\`\`\``
  },
  {
    lesson: "20. Preprocesor C — macros și directivele",
    title: "#pragma și predefined macros",
    content: `**\`#pragma\`** este o directivă non-standard (implementation-defined) pentru instrucțiuni speciale ale compilatorului — warning suppression, optimizare, alignment.

**\`#pragma\` comune GCC/Clang:**
\`\`\`c
/* Include guard alternativă — suportat de toți compilatorii moderni */
#pragma once

/* Suprimarea warning-urilor specifice */
#pragma GCC diagnostic push
#pragma GCC diagnostic ignored "-Wunused-variable"
int x;   /* fără warning */
#pragma GCC diagnostic pop

/* Specifică alinierea struct-urilor */
#pragma pack(1)   /* fără padding */
struct Compacta {
    char a;    /* 1 byte */
    int  b;    /* 4 bytes — fără padding înainte */
};             /* sizeof = 5, nu 8 */
#pragma pack()  /* restabilește default */
\`\`\`

**Macros predefinite standard (C99+):**
\`\`\`c
#include <stdio.h>

int main(void) {
    /* Informații despre fișierul curent */
    printf("Fișier: %s\\n",    __FILE__);    /* "program.c" */
    printf("Linie:  %d\\n",    __LINE__);    /* 10 */
    printf("Data:   %s\\n",    __DATE__);    /* "May 22 2025" */
    printf("Ora:    %s\\n",    __TIME__);    /* "14:30:00" */
    printf("Funcție:%s\\n",    __func__);    /* "main" */

    /* Versiunea standardului C */
    printf("Std C:  %ldL\\n", __STDC_VERSION__);
    /* 199901L = C99, 201112L = C11, 201710L = C17 */

    return 0;
}
\`\`\`

**Macros utile pentru debugging:**
\`\`\`c
/* Assertion — termina programul dacă condiția e falsă */
#include <assert.h>
void divideaza(int a, int b) {
    assert(b != 0);  /* crash cu mesaj la debug */
    return a / b;
}

/* Macro assert custom */
#ifndef NDEBUG
    #define ASSERT(cond, msg) do { \\
        if (!(cond)) { \\
            fprintf(stderr, "ASSERT failed: %s\\nFișier: %s, Linie: %d\\n", \\
                    msg, __FILE__, __LINE__); \\
            abort(); \\
        } \\
    } while(0)
#else
    #define ASSERT(cond, msg) ((void)0)  /* NOP în release */
#endif

/* Compilare release: gcc -DNDEBUG — dezactivează assert-urile */
\`\`\`

**\`_Pragma\` — operator pragma în macro:**
\`\`\`c
/* Permite pragma în macros */
#define DO_PRAGMA(x)  _Pragma(#x)
#define IGNORE_WARN(w) DO_PRAGMA(GCC diagnostic ignored #w)

IGNORE_WARN(-Wunused-variable)
int y;  /* fără warning */
\`\`\``
  },
  {
    lesson: "20. Preprocesor C — macros și directivele",
    title: "Macros vs inline functions",
    content: `**Macros** și **funcții inline** ating același scop — cod injectat la locul apelului, fără overhead de apel de funcție. Dar au diferențe importante de siguranță și debugging.

**Comparație directă:**
\`\`\`c
/* MACRO — substituție textuală pură */
#define MAX_MACRO(a, b)  ((a) > (b) ? (a) : (b))

/* INLINE FUNCTION — funcție reală, tip-safe */
static inline int max_inline(int a, int b) {
    return a > b ? a : b;
}
\`\`\`

**Problemele macros:**
\`\`\`c
/* 1. DOUBLE EVALUATION — efecte secundare duplicate */
#define MAX(a, b)  ((a) > (b) ? (a) : (b))
int x = 5, y = 3;
int m = MAX(x++, y++);   /* x++ evaluat de DOUĂ ori! */
/* x devine 7 (nu 6), y devine 4, m = 6 */

/* Cu inline — OK */
int m2 = max_inline(x++, y++);  /* x++ evaluat o singură dată */

/* 2. PROBLEME DE TIP */
MAX(3.14, 2);    /* macro: OK pentru orice tip */
max_inline(3.14, 2);  /* inline: eroare sau warning de tip */

/* 3. DEBUG — macros nu apar în backtraces */
\`\`\`

**Avantajele inline functions:**
\`\`\`c
/* Type safety */
static inline double max_double(double a, double b) {
    return a > b ? a : b;
}

/* Sau generică cu _Generic (C11) */
#define MAX_SAFE(a, b) _Generic((a), \\
    int:    max_int,    \\
    float:  max_float,  \\
    double: max_double  \\
)(a, b)

/* Evaluat o singură dată */
/* Vizibil în debugger */
/* Funcționează cu toate optimizările */
\`\`\`

**Când să folosești macro vs inline:**
| Situație | Recomandare |
|---------|-------------|
| Constantă numerică | \`#define\` sau \`const\` |
| Funcție mică, tip fix | \`static inline\` |
| Funcție cu side effects | ÎNTOTDEAUNA inline |
| Cod dependent de tip | \`_Generic\` + inline |
| Compilare condițională | Macro obligatoriu |
| Logging/debugging cu \`__FILE__\` | Macro (inline nu poate) |

**Best practice modern:**
\`\`\`c
/* Constante — prefer const sau enum, nu #define */
static const int MAX_BUFF = 1024;
enum { STACK_SIZE = 256 };

/* Funcții mici — prefer inline */
static inline int clamp(int x, int lo, int hi) {
    return x < lo ? lo : (x > hi ? hi : x);
}

/* Macros — doar dacă inline nu e posibil */
#define STRINGIFY(x)  #x     /* stringify nu se poate face cu inline */
#define CONCAT(a, b)  a##b   /* concatenare token */
\`\`\``
  },
  {
    lesson: "21. Operații pe biți (Bitwise)",
    title: "Operatori bitwise",
    content: `**Operatorii bitwise** acționează direct pe **reprezentarea binară** a valorilor numerice, bit cu bit. Sunt fundamentali în programare de nivel scăzut, protocoale de rețea, criptografie și optimizări.

**Cei 6 operatori bitwise:**
\`\`\`c
#include <stdio.h>

int main(void) {
    unsigned int a = 0b1100;  /* 12 */
    unsigned int b = 0b1010;  /* 10 */

    printf("a     = %04u (%u)\\n", /* binar */ a, a);
    printf("b     = %04u (%u)\\n", b, b);
    printf("a & b = %04u (%u)\\n", /* AND */  a & b,  a & b);  /* 1000 = 8 */
    printf("a | b = %04u (%u)\\n", /* OR  */  a | b,  a | b);  /* 1110 = 14 */
    printf("a ^ b = %04u (%u)\\n", /* XOR */  a ^ b,  a ^ b);  /* 0110 = 6 */
    printf("~a    = %u\\n",        /* NOT */  (unsigned char)~a);/* 11110011... */
    printf("a<<1  = %u\\n",        /* SHL */  a << 1);          /* 11000 = 24 */
    printf("a>>1  = %u\\n",        /* SHR */  a >> 1);          /* 0110 = 6 */
    return 0;
}
\`\`\`

**AND (\`&\`) — "ambii biți 1":**
\`\`\`
  1100  (12)
& 1010  (10)
------
  1000  (8)  — doar bitul 3 e 1 în ambii
\`\`\`

**OR (\`|\`) — "cel puțin un bit 1":**
\`\`\`
  1100  (12)
| 1010  (10)
------
  1110  (14)
\`\`\`

**XOR (\`^\`) — "exact un bit 1":**
\`\`\`
  1100  (12)
^ 1010  (10)
------
  0110  (6)  — diferit
\`\`\`

**NOT (\`~\`) — inversare toți biții:**
\`\`\`c
unsigned char x = 0b00001111;  /* 15 */
unsigned char y = ~x;          /* 11110000 = 240 */
\`\`\`

**Shift stânga (\`<<\`) — înmulțire cu 2^n:**
\`\`\`c
int n = 1;
printf("%d\\n", n << 0);  /* 1  */
printf("%d\\n", n << 1);  /* 2  */
printf("%d\\n", n << 2);  /* 4  */
printf("%d\\n", n << 8);  /* 256 */
/* Shift la stânga = înmulțire cu 2^k (dacă nu overflow) */
\`\`\`

**Shift dreapta (\`>>\`) — împărțire cu 2^n:**
\`\`\`c
unsigned int x = 256;
printf("%u\\n", x >> 1);  /* 128 = 256/2 */
printf("%u\\n", x >> 3);  /* 32  = 256/8 */
/* Pe signed: comportament implementation-defined pentru valori negative */
/* Folosește MEREU unsigned pentru operații bitwise */
\`\`\``
  },
  {
    lesson: "21. Operații pe biți (Bitwise)",
    title: "Flags și bitmasks",
    content: `**Bitmask-urile** permit stocarea mai multor valori boolean într-un singur întreg. Un **flag** = un singur bit, mai multe flaguri = mai mulți biți într-un singur \`int\`.

**Pattern clasic — permisiuni fișiere (ca Unix):**
\`\`\`c
#include <stdio.h>

/* Definire flaguri — fiecare e un bit diferit */
#define PERM_READ    (1 << 0)  /* 0001 = 1 */
#define PERM_WRITE   (1 << 1)  /* 0010 = 2 */
#define PERM_EXEC    (1 << 2)  /* 0100 = 4 */
#define PERM_HIDDEN  (1 << 3)  /* 1000 = 8 */

/* SETARE flag */
unsigned int perms = 0;
perms |= PERM_READ;   /* setează bitul READ */
perms |= PERM_WRITE;  /* setează bitul WRITE */
/* perms = 0011 = 3 */

/* VERIFICARE flag */
if (perms & PERM_READ)   printf("Are READ\\n");
if (perms & PERM_WRITE)  printf("Are WRITE\\n");
if (!(perms & PERM_EXEC)) printf("NU are EXEC\\n");

/* ȘTERGERE flag */
perms &= ~PERM_WRITE;  /* ~PERM_WRITE = 1111...1101 */
/* perms = 0001 = 1 (WRITE șters) */

/* TOGGLE flag */
perms ^= PERM_HIDDEN;   /* inversează bitul HIDDEN */
\`\`\`

**Funcții utile pentru bitmask:**
\`\`\`c
/* Verifică dacă BIT flag este setat */
#define BIT_SET(val, flag)    ((val) & (flag))

/* Setează BIT flag */
#define BIT_ON(val, flag)     ((val) |= (flag))

/* Șterge BIT flag */
#define BIT_OFF(val, flag)    ((val) &= ~(flag))

/* Toggle BIT flag */
#define BIT_TOGGLE(val, flag) ((val) ^= (flag))

unsigned int st = 0;
BIT_ON(st, PERM_READ | PERM_EXEC);  /* setează ambele odată */
printf("Perms: %u\\n", st);  /* 5 = 0101 */
\`\`\`

**Aplicație — stări UI (button state):**
\`\`\`c
#define BTN_HOVER    (1 << 0)
#define BTN_PRESSED  (1 << 1)
#define BTN_DISABLED (1 << 2)
#define BTN_FOCUSED  (1 << 3)

unsigned int btn_state = 0;

void hover_on(unsigned int *s)   { *s |= BTN_HOVER; }
void hover_off(unsigned int *s)  { *s &= ~BTN_HOVER; }
void press(unsigned int *s)      { *s |= BTN_PRESSED; }

int este_interactiv(unsigned int s) {
    return !(s & BTN_DISABLED) &&  /* nu e disabled */
           !(s & BTN_PRESSED);     /* nu e deja apasat */
}
\`\`\``
  },
  {
    lesson: "21. Operații pe biți (Bitwise)",
    title: "Manipulări utile",
    content: `Operatorii bitwise permit **trucuri de viteză** și **operații elegante** imposibil de exprimat altfel — verificare par/impar fără modulo, izolare biți, etc.

**Verificare par/impar — cel mai rapid:**
\`\`\`c
int n = 17;
if (n & 1) printf("impar\\n");   /* bitul 0 = 1 → impar */
else        printf("par\\n");     /* bitul 0 = 0 → par */
/* Mult mai rapid decât n % 2 */
\`\`\`

**Izolare cel mai puțin semnificativ bit setat:**
\`\`\`c
int x = 12;  /* 1100 */
int lsb = x & (-x);  /* 0100 = 4 — ultimul bit 1 */
/* -x = ~x + 1 în complement față de 2 */
\`\`\`

**Ștergere cel mai puțin semnificativ bit:**
\`\`\`c
int x = 12;  /* 1100 */
x &= (x - 1);  /* 1000 = 8 — a șters ultimul bit 1 */
\`\`\`

**Rotund la puterea 2 — aliniere:**
\`\`\`c
/* Verifică dacă x e putere de 2 */
int este_putere_2(unsigned int x) {
    return x > 0 && (x & (x - 1)) == 0;
}

/* Rotunjire la multiplu de 2^k */
int aliniaza(int x, int k) {
    int mask = (1 << k) - 1;  /* primii k biți = 1 */
    return (x + mask) & ~mask;
}
printf("%d\\n", aliniaza(13, 3));  /* 16 — rotund la multiplu de 8 */
\`\`\`

**Swap fără variabilă temporară (XOR swap):**
\`\`\`c
int a = 5, b = 7;
a ^= b;  /* a = a XOR b = 2 */
b ^= a;  /* b = b XOR a = b XOR (a XOR b) = original_a = 5 */
a ^= b;  /* a = a XOR b = (a XOR b) XOR a = original_b = 7 */
printf("a=%d, b=%d\\n", a, b);  /* a=7, b=5 */
/* ATENȚIE: nu funcționează dacă a și b sunt ACEEAȘI variabilă */
\`\`\`

**Inversare biți (bit reversal):**
\`\`\`c
unsigned int inverseaza_biti(unsigned int x) {
    unsigned int rez = 0;
    for (int i = 0; i < 32; i++) {
        rez = (rez << 1) | (x & 1);
        x >>= 1;
    }
    return rez;
}
printf("%u\\n", inverseaza_biti(0x80000000));  /* 1 */
\`\`\`

**Numărarea biților de 1 — Hamming weight:**
\`\`\`c
int popcount(unsigned int x) {
    int count = 0;
    while (x) {
        count += x & 1;
        x >>= 1;
    }
    return count;
}
/* GCC built-in — mai rapid: __builtin_popcount(x) */
printf("%d\\n", popcount(0b1011));  /* 3 */
\`\`\``
  },
  {
    lesson: "21. Operații pe biți (Bitwise)",
    title: "Tipuri pentru biți: bit fields",
    content: `**Bit fields** permit definirea de câmpuri cu dimensiuni exacte în biți în interiorul unui struct. Sunt folosite extensiv în protocoale de rețea, registre hardware și formate binare compacte.

**Definire și utilizare:**
\`\`\`c
#include <stdio.h>

struct Permisiuni {
    unsigned int citire  : 1;   /* 1 bit */
    unsigned int scriere : 1;   /* 1 bit */
    unsigned int executie: 1;   /* 1 bit */
    unsigned int rezervat: 5;   /* 5 biți neutilizați */
};   /* sizeof = 4 (un int) */

int main(void) {
    struct Permisiuni p = {0};
    p.citire  = 1;
    p.scriere = 1;
    p.executie = 0;

    printf("Citire: %u\\n",   p.citire);   /* 1 */
    printf("Scriere: %u\\n",  p.scriere);  /* 1 */
    printf("Exec: %u\\n",     p.executie); /* 0 */
    printf("Size: %zu\\n",    sizeof(p));  /* 4 */
    return 0;
}
\`\`\`

**Exemplu real — antet IP header:**
\`\`\`c
/* Simplificat — primul byte din IP header */
struct IPHeader {
    unsigned int versiune     : 4;  /* IP versiunea (4 sau 6) */
    unsigned int ihl          : 4;  /* Internet Header Length */
    unsigned int dscp         : 6;  /* Differentiated Services */
    unsigned int ecn          : 2;  /* Explicit Congestion Notification */
    unsigned int total_length : 16; /* lungimea totală */
};
\`\`\`

**Registru hardware — microcontroler:**
\`\`\`c
/* Registrul de control al unui UART */
struct UART_CR {
    unsigned int enable      : 1;   /* bit 0 — activare UART */
    unsigned int tx_enable   : 1;   /* bit 1 — activare TX */
    unsigned int rx_enable   : 1;   /* bit 2 — activare RX */
    unsigned int word_length : 2;   /* biți 3-4 — lungimea cuvântului */
    unsigned int stop_bits   : 1;   /* bit 5 — biți stop */
    unsigned int parity      : 2;   /* biți 6-7 — paritate */
};
\`\`\`

**Atenție — portabilitate:**
\`\`\`c
/* Probleme cu bit fields */
/* 1. Ordinea biților (MSB sau LSB) — implementation defined */
/* 2. Dimensiunea containerului — tipic int sau unsigned int */
/* 3. Padding între câmpuri — implementation defined */
/* 4. NU folosi bit fields pentru protocoale cu cerințe exacte de layout */

/* Pentru protocoale binare — folosește shift manual: */
unsigned char byte = 0;
byte = (versiune & 0xF) << 4 | (ihl & 0xF);  /* explicit, portabil */
\`\`\``
  },
  {
    lesson: "22. Compilare, Linking și Makefile",
    title: "Etapele compilării C",
    content: `Înțelegerea procesului de compilare te ajută să diagnostichezi erori de build, să optimizezi și să organizezi proiecte mari.

**Cele 4 etape:**
\`\`\`
fișier.c → [Preprocesor] → fișier.i → [Compilator] → fișier.s
         → [Assembler] → fișier.o → [Linker] → executabil
\`\`\`

**Etapa 1 — Preprocesor (cpp):**
\`\`\`bash
# Generează fișierul preprocesatat (.i)
gcc -E program.c -o program.i

# Conținut: toate #include expandate, #define înlocuite, comentarii eliminate
# Fișier .i poate fi mare — stdio.h adaugă ~700 linii
\`\`\`

**Etapa 2 — Compilare propriu-zisă (cc1):**
\`\`\`bash
# Generează assembly (.s) din C
gcc -S program.c -o program.s

# program.s conține instrucțiuni assembly (x86-64):
# main:
#   pushq   %rbp
#   movq    %rsp, %rbp
#   ...
\`\`\`

**Etapa 3 — Asamblare (as):**
\`\`\`bash
# Generează cod obiect binar (.o) din assembly
gcc -c program.c -o program.o

# .o este cod mașină cu simboluri nerezolvate (printf, malloc, etc.)
\`\`\`

**Etapa 4 — Linking (ld):**
\`\`\`bash
# Combină .o files + biblioteci → executabil
gcc program.o -o program

# Sau direct din .c (face toate etapele):
gcc program.c -o program

# Multiple fișiere .c:
gcc main.c utils.c calc.c -o program
\`\`\`

**Flag-uri esențiale GCC:**
\`\`\`bash
gcc -Wall -Wextra -Werror          # warnings ca erori
    -std=c11                        # standard C11
    -O2                             # optimizări nivel 2
    -g                              # simboluri debug (pentru GDB)
    -fsanitize=address,undefined    # sanitizatori
    -o output                       # fișierul de ieșire
    -lm                             # linkează math library (sqrt, etc.)
    -lpthread                       # linkează pthread
    program.c
\`\`\`

**Erori tipice pe etape:**
\`\`\`
Preprocesor:  #include <nonexistent.h> — fișier negăsit
Compilare:    syntax error, type mismatch, implicit declaration
Assembler:    rar — doar la cod assembly manual
Linker:       undefined reference to 'func' — funcție nedefinită sau library lipsă
\`\`\``
  },
  {
    lesson: "22. Compilare, Linking și Makefile",
    title: "Header files și separarea codului",
    content: `**Separarea codului** în multiple fișiere .c și .h este esențială pentru proiecte mari — compilare incrementală, reutilizare, colaborare în echipă.

**Structura unui proiect C cu mai multe fișiere:**
\`\`\`
proiect/
├── main.c       — punctul de intrare
├── calculator.h — declarații publice
├── calculator.c — implementare
├── utils.h
└── utils.c
\`\`\`

**calculator.h — interfața publică:**
\`\`\`c
#ifndef CALCULATOR_H
#define CALCULATOR_H

/* Tipuri exportate */
typedef struct {
    double memorie;
    int nr_operatii;
} Calculator;

/* Funcții exportate */
Calculator calc_new(void);
double calc_aduna(Calculator *c, double a, double b);
double calc_scade(Calculator *c, double a, double b);
double calc_inmulteste(Calculator *c, double a, double b);
double calc_imparte(Calculator *c, double a, double b);
void   calc_afiseaza(const Calculator *c);

#endif
\`\`\`

**calculator.c — implementarea:**
\`\`\`c
#include "calculator.h"
#include <stdio.h>

Calculator calc_new(void) {
    Calculator c = {0.0, 0};
    return c;
}

double calc_aduna(Calculator *c, double a, double b) {
    c->nr_operatii++;
    return c->memorie = a + b;
}

/* ... alte implementări ... */

void calc_afiseaza(const Calculator *c) {
    printf("Memorie: %.4f, Operatii: %d\\n",
           c->memorie, c->nr_operatii);
}
\`\`\`

**main.c — utilizarea:**
\`\`\`c
#include <stdio.h>
#include "calculator.h"

int main(void) {
    Calculator c = calc_new();
    printf("%.2f\\n", calc_aduna(&c, 10, 5));    /* 15.00 */
    printf("%.2f\\n", calc_inmulteste(&c, 3, 7)); /* 21.00 */
    calc_afiseaza(&c);
    return 0;
}
\`\`\`

**Compilare:**
\`\`\`bash
# Compilare separată (incrementală)
gcc -c calculator.c -o calculator.o
gcc -c main.c -o main.o
gcc main.o calculator.o -o program

# sau direct
gcc main.c calculator.c -o program
\`\`\`

**Reguli header files:**
• \`#ifndef\` / \`#define\` / \`#endif\` — include guard obligatoriu
• Header declară (prototipuri, typedef, struct, macro)
• .c definește (cod, variabile globale)
• NU include \`.c\` files — include doar \`.h\``
  },
  {
    lesson: "22. Compilare, Linking și Makefile",
    title: "Makefile — automatizare build",
    content: `**Makefile** automatizează procesul de compilare — recompilează doar fișierele modificate, nu tot proiectul. Rulat cu comanda \`make\`.

**Sintaxă Makefile:**
\`\`\`makefile
# Structura: țintă: dependențe
#   comandă (precedat de TAB, nu spații!)

target: dependente
\tcomanda
\`\`\`

**Makefile simplu:**
\`\`\`makefile
# Variabile
CC     = gcc
CFLAGS = -Wall -Wextra -std=c11 -O2

# Ținta default — prima din fișier
all: program

# Regula pentru executabil
program: main.o calculator.o utils.o
\t$(CC) main.o calculator.o utils.o -o program

# Reguli pentru fișierele obiect
main.o: main.c calculator.h utils.h
\t$(CC) $(CFLAGS) -c main.c -o main.o

calculator.o: calculator.c calculator.h
\t$(CC) $(CFLAGS) -c calculator.c -o calculator.o

utils.o: utils.c utils.h
\t$(CC) $(CFLAGS) -c utils.c -o utils.o

# Curățare fișiere generate
clean:
\trm -f *.o program

.PHONY: all clean
\`\`\`

**Makefile avansat cu pattern rules:**
\`\`\`makefile
CC     = gcc
CFLAGS = -Wall -Wextra -std=c11 -g
TARGET = program
SRCS   = main.c calculator.c utils.c
OBJS   = $(SRCS:.c=.o)   # înlocuiește .c cu .o

all: $(TARGET)

$(TARGET): $(OBJS)
\t$(CC) $(OBJS) -o $@   # $@ = target name

%.o: %.c          # Pattern rule: orice .c → .o
\t$(CC) $(CFLAGS) -c $< -o $@   # $< = prima dependenta

clean:
\trm -f $(OBJS) $(TARGET)

.PHONY: all clean

# Debugging build
debug: CFLAGS += -DDEBUG -fsanitize=address
debug: $(TARGET)
\`\`\`

**Comenzi uzuale:**
\`\`\`bash
make          # construiește ținta default (all)
make clean    # șterge fișierele generate
make debug    # build cu debug flags
make -j4      # compilare paralelă (4 nuclee)
make -n       # dry-run — afișează comenzile fără a le executa
\`\`\``
  },
  {
    lesson: "22. Compilare, Linking și Makefile",
    title: "Biblioteci statice și dinamice",
    content: `**Bibliotecile** sunt colecții de cod precompilat reutilizabil. Diferența dintre **statice** (.a) și **dinamice** (.so/.dll) afectează dimensiunea executabilului și modul de distribuție.

**Bibliotecă statică (.a pe Linux, .lib pe Windows):**
\`\`\`bash
# 1. Compilează fișierele obiect
gcc -c calc.c -o calc.o
gcc -c utils.c -o utils.o

# 2. Crează arhiva statică
ar rcs libmylib.a calc.o utils.o
#  r = insert, c = create, s = add index

# 3. Linkare cu biblioteca statică
gcc main.c -L. -lmylib -o program
#  -L. = caută în directorul curent
#  -lmylib = linkează libmylib.a

# La linkare, codul din .a e COPIAT în executabil
\`\`\`

**Bibliotecă dinamică (shared) (.so pe Linux, .dll pe Windows):**
\`\`\`bash
# 1. Compilează cu -fPIC (Position Independent Code)
gcc -fPIC -c calc.c -o calc.o
gcc -fPIC -c utils.c -o utils.o

# 2. Crează shared library
gcc -shared -o libmylib.so calc.o utils.o

# 3. Linkare
gcc main.c -L. -lmylib -o program

# La rulare, .so trebuie să fie accesibil:
export LD_LIBRARY_PATH=.
./program
\`\`\`

**Statică vs Dinamică:**
| Aspect | Statică (.a) | Dinamică (.so) |
|--------|-------------|---------------|
| Codul în executabil | Da — copiat | Nu — referință |
| Dimensiune executabil | Mai mare | Mai mic |
| Dependențe runtime | Niciuna | Necesită .so la runtime |
| Update fără recompilare | Nu | Da (înlocuiești .so) |
| Performance | Ușor mai rapid | Ușor mai lent (PLT) |

**Biblioteci standard frecvente:**
\`\`\`bash
-lm       # math: sqrt, pow, sin (libm.so)
-lpthread # POSIX threads (libpthread.so)
-lz       # zlib compresie
-lssl     # OpenSSL
-lcurl    # libcurl HTTP
\`\`\`

**\`pkg-config\` — obține flags automat:**
\`\`\`bash
gcc main.c \`pkg-config --cflags --libs openssl\` -o program
\`\`\``
  },
  {
    lesson: "23. Debugging — GDB și tehnici",
    title: "GDB — GNU Debugger basics",
    content: `**GDB** (GNU Debugger) este instrumentul standard de debugging pentru C/C++ pe Linux. Permite rularea step-by-step, inspecția variabilelor și call stack-ului.

**Pregătire — compilare cu simboluri debug:**
\`\`\`bash
gcc -g -O0 program.c -o program
#  -g  = include simboluri debug (funcții, variabile, linii)
#  -O0 = dezactivează optimizări (cod mai predictibil la debug)
\`\`\`

**Comenzi GDB esențiale:**
\`\`\`bash
# Pornire GDB
gdb ./program
gdb ./program --args arg1 arg2   # cu argumente

# În GDB:
run                   # r  — pornește programul
run arg1 arg2         #     — cu argumente
quit                  # q  — ieșire din GDB
help                  #     — help general

# Breakpoints
break main            # b   — breakpoint la funcția main
break program.c:42    # b   — breakpoint la linia 42
info breakpoints      # ib  — listează breakpoints
delete 1              # d 1 — șterge breakpoint-ul 1
clear main            #     — șterge toate la funcția main

# Execuție
next                  # n  — execută linia curentă (nu intră în funcții)
step                  # s  — execută și INTRĂ în funcții
continue              # c  — continuă până la următorul breakpoint
finish                # fin — termină funcția curentă
until 50              #     — continuă până la linia 50
\`\`\`

**Inspecție variabile:**
\`\`\`bash
print x              # p x    — afișează variabila x
print *ptr           # p *ptr — valoarea de la pointerul ptr
print arr[3]         # p arr[3]
display x            #        — afișează x la fiecare step
info locals          #        — toate variabilele locale
info args            #        — parametrii funcției curente
\`\`\`

**Call stack și navigare:**
\`\`\`bash
backtrace             # bt  — afișează call stack complet
frame 2              #      — sari la frame 2 din stack
up / down            #      — navigare în stack
list                 # l   — afișează codul sursă curent
list func_name       #      — cod la funcția data
\`\`\`

**Watchpoints — detectare modificare variabilă:**
\`\`\`bash
watch x              # oprire când x se modifică
watch *ptr           # oprire când valoarea la *ptr se modifică
rwatch arr[0]        # oprire când arr[0] e citit
\`\`\``
  },
  {
    lesson: "23. Debugging — GDB și tehnici",
    title: "Debuggarea memoriei cu Valgrind",
    content: `**Valgrind** detectează automat memory leaks, use-after-free, invalid reads/writes și alte erori de memorie. Rulează programul într-o mașină virtuală și interceptează toate accesele la memorie.

**Instalare și utilizare de bază:**
\`\`\`bash
# Instalare (Ubuntu/Debian)
sudo apt-get install valgrind

# Compilare cu debug info
gcc -g -O0 program.c -o program

# Rulare cu Valgrind
valgrind ./program

# Cu opțiuni complete
valgrind \\
  --leak-check=full \\
  --show-leak-kinds=all \\
  --track-origins=yes \\
  --verbose \\
  ./program
\`\`\`

**Exemplu de output — memory leak:**
\`\`\`
==1234== Memcheck, a memory error detector
==1234== HEAP SUMMARY:
==1234==   in use at exit: 40 bytes in 1 blocks
==1234==   total heap usage: 5 allocs, 4 frees, 1,040 bytes allocated
==1234==
==1234== 40 bytes in 1 blocks are definitely lost in loss record 1 of 1
==1234==    at 0x4C2FB0F: malloc (vg_replace_malloc.c:381)
==1234==    by 0x108788: aloca_array (program.c:15)
==1234==    by 0x1087F2: main (program.c:30)
==1234==
==1234== LEAK SUMMARY:
==1234==    definitely lost: 40 bytes in 1 blocks
\`\`\`

**Tipuri de leak raportate:**
| Tip | Semnificație |
|-----|-------------|
| definitely lost | Memorie alocată fără free — bug cert |
| indirectly lost | Pointeri la memorie pierdută |
| possibly lost | Pointer interior — posibil bug |
| still reachable | Alocat, neeliberat, dar accesibil (ok) |

**Exemplu output — invalid read:**
\`\`\`
==1234== Invalid read of size 4
==1234==    at 0x10878B: main (program.c:25)
==1234==  Address 0x5204040 is 0 bytes after a block of size 40 alloc'd
==1234==    at 0x4C2FB0F: malloc
==1234==    by 0x108779: main (program.c:20)
\`\`\`

**Cachegrind — analiză cache:**
\`\`\`bash
valgrind --tool=cachegrind ./program
cg_annotate cachegrind.out.1234  /* vizualizare */
\`\`\`

**Limitări Valgrind:**
• Programul rulează de 10-50x mai lent
• Nu detectează toate bug-urile (static arrays, stack overflows limitat)
• Alternativă mai rapidă: AddressSanitizer (\`-fsanitize=address\`)`
  },
  {
    lesson: "23. Debugging — GDB și tehnici",
    title: "Tehnici de debugging manual",
    content: `Debuggarea manuală prin **printf strategice**, **binary search** și **defensive programming** e adesea la fel de eficientă ca GDB — și funcționează fără instrumente externe.

**Printf debugging — simplu și eficient:**
\`\`\`c
#include <stdio.h>

/* Macro pentru debug condiționat */
#ifdef DEBUG
    #define DPRINT(fmt, ...) \\
        fprintf(stderr, "[%s:%d] " fmt "\\n", __func__, __LINE__, ##__VA_ARGS__)
#else
    #define DPRINT(fmt, ...) /* NOP in release */
#endif

void sorteaza(int arr[], int n) {
    DPRINT("Intra cu n=%d", n);
    DPRINT("arr[0]=%d, arr[n-1]=%d", arr[0], arr[n-1]);

    for (int i = 0; i < n-1; i++) {
        for (int j = 0; j < n-1-i; j++) {
            if (arr[j] > arr[j+1]) {
                DPRINT("Swap arr[%d]=%d cu arr[%d]=%d", j,arr[j], j+1,arr[j+1]);
                int t = arr[j]; arr[j] = arr[j+1]; arr[j+1] = t;
            }
        }
    }
}
/* Compilare debug: gcc -DDEBUG program.c -o program */
/* Compilare release: gcc program.c -o program */
\`\`\`

**Binary search debugging — narrowing down:**
\`\`\`c
/* Dacă ai 1000 linii suspecte:
   1. Pune printf la mijloc (500) — afișează "ÎNAINTE" și "DUPĂ"
   2. Dacă bug-ul e înainte de 500 — caută în 0-500
   3. Dacă e după 500 — caută în 500-1000
   4. Repetă → O(log n) iterații pentru a găsi linia */
\`\`\`

**Assert-uri strategice:**
\`\`\`c
#include <assert.h>

int factorial(int n) {
    assert(n >= 0);          /* precondition */
    assert(n <= 12);         /* overflow prevention */
    if (n == 0) return 1;
    int rez = n * factorial(n-1);
    assert(rez > 0);         /* postcondition */
    return rez;
}
\`\`\`

**Defensive programming — invariants:**
\`\`\`c
typedef struct { int *data; int len; int cap; } Vec;

void vec_push(Vec *v, int val) {
    /* Invariant check — dezactivat în release cu NDEBUG */
    assert(v != NULL);
    assert(v->len >= 0);
    assert(v->len <= v->cap);
    assert(v->cap == 0 || v->data != NULL);

    if (v->len == v->cap) {
        /* realloc */
    }
    v->data[v->len++] = val;

    assert(v->len <= v->cap);  /* postcondition */
}
\`\`\`

**Rubber duck debugging:**
Explică codul tău rând cu rând unui "interlocutor" (un coleg, o jucărie, nimeni). Obligarea de a verbaliza logica descoperă de obicei bug-ul.`
  },
  {
    lesson: "23. Debugging — GDB și tehnici",
    title: "Bug-uri comune și cum le găsești",
    content: `Cunoașterea bug-urilor frecvente în C și simptomele lor te ajută să diagnostichezi rapid — fiecare tip de bug are un "fingerprint" distinct.

**1. Off-by-one error — indexare greșită:**
\`\`\`c
int arr[5] = {1,2,3,4,5};

/* GREȘIT */
for (int i = 0; i <= 5; i++) printf("%d ", arr[i]);  /* arr[5] = UB */
for (int i = 1; i <= 5; i++) printf("%d ", arr[i]);  /* arr[5] = UB */

/* CORECT */
for (int i = 0; i < 5; i++) printf("%d ", arr[i]);
\`\`\`

**2. Uninitialized variable — valori garbage:**
\`\`\`c
int suma;   /* neinițializat — valoare aleatorie */
for (int i = 0; i < 5; i++) suma += i;  /* comportament nedefinit */

int suma = 0;  /* CORECT */
\`\`\`

**3. Integer overflow:**
\`\`\`c
int a = 2000000000;
int b = a + a;   /* overflow — UB pe signed */
printf("%d\\n", b);  /* valoare negativă sau crash */

/* Fix */
long long b = (long long)a + a;
\`\`\`

**4. Strcmp vs = cu string-uri:**
\`\`\`c
char s[] = "hello";
if (s == "hello") ...  /* compară ADRESE, nu conținut! Aproape mereu fals */
if (strcmp(s, "hello") == 0) ...  /* CORECT */
\`\`\`

**5. Scanf buffer overflow:**
\`\`\`c
char buf[10];
scanf("%s", buf);   /* PERICULOS — orice input mai mare de 9 chars */
scanf("%9s", buf);  /* SIGUR */
\`\`\`

**6. Missing break în switch:**
\`\`\`c
switch(n) {
    case 1: printf("unu"); /* UITAT break — fall-through în case 2! */
    case 2: printf("doi"); break;
}
\`\`\`

**7. Pointer la variabilă locală returnată:**
\`\`\`c
int* gresit(void) {
    int x = 5;
    return &x;  /* x dispare la return — dangling pointer */
}
\`\`\`

**Simptome și cauze:**
| Simptom | Cauza probabilă |
|---------|----------------|
| Crash la anumite inputuri | Buffer overflow, null deref |
| Valori ciudate în variabile | Uninitialized, overflow |
| Funcționează local, crash în producție | Stack size, undefined behavior |
| Memory creste continuu | Memory leak |
| Crash la free() | Double free sau heap corruption |`
  },
  {
    lesson: "24. Mini-proiect: Calculator în C",
    title: "Arhitectura proiectului",
    content: `Proiectul calculator demonstrează separarea codului în module, gestionarea stării și un REPL (Read-Eval-Print Loop) — patternuri reale din aplicații C.

**Structura proiectului:**
\`\`\`
calculator/
├── main.c          — REPL și main loop
├── calc.h          — tipuri și declarații publice
├── calc.c          — operații matematice
├── history.h       — interfața pentru istoric
├── history.c       — gestiunea istoricului
└── Makefile        — build automation
\`\`\`

**calc.h — tipuri și interfață:**
\`\`\`c
#ifndef CALC_H
#define CALC_H

typedef struct {
    double a;
    char   op;
    double b;
    double rez;
} Calcul;

/* Funcții de calcul */
int  calc_evalueaza(const char *expr, double *rez);
void calc_print_rez(double rez);

/* Validare */
int  calc_op_valida(char op);

#endif
\`\`\`

**history.h — interfața istoricului:**
\`\`\`c
#ifndef HISTORY_H
#define HISTORY_H

#include "calc.h"

typedef struct {
    Calcul *items;
    int     len;
    int     cap;
} History;

History* hist_new(void);
void     hist_add(History *h, const Calcul *c);
void     hist_print(const History *h);
void     hist_print_last(const History *h, int n);
void     hist_free(History *h);

#endif
\`\`\`

**Makefile:**
\`\`\`makefile
CC     = gcc
CFLAGS = -Wall -Wextra -std=c11 -O2

calculator: main.o calc.o history.o
\t$(CC) $^ -lm -o $@

%.o: %.c
\t$(CC) $(CFLAGS) -c $< -o $@

clean:
\trm -f *.o calculator

.PHONY: clean
\`\`\`

**Arhitectura REPL — principiu:**
\`\`\`
loop:
  1. Citește o linie de input
  2. Parseaza comanda sau expresia
  3. Evaluează
  4. Afișează rezultatul
  5. Adaugă în istoric
  6. Repetă
\`\`\`

Separarea în module permite testarea independentă și modificarea fiecărui modul fără a atinge restul codului.`
  },
  {
    lesson: "25. Bune Practici C — Recap Final",
    title: "Reguli de siguranță a memoriei",
    content: `Gestionarea sigură a memoriei este responsabilitatea nr. 1 a programatorului C. Aceste reguli previn categorii întregi de bug-uri.

**Regula 1 — Inițializează întotdeauna:**
\`\`\`c
/* GREȘIT */
int n; int *p; char buf[100];

/* CORECT */
int n = 0;
int *p = NULL;
char buf[100]; memset(buf, 0, sizeof(buf));
/* sau: char buf[100] = {0}; */
\`\`\`

**Regula 2 — Verifică NULL după malloc:**
\`\`\`c
int *arr = malloc(n * sizeof(int));
if (!arr) {
    perror("malloc");
    exit(EXIT_FAILURE);
}
\`\`\`

**Regula 3 — Set NULL după free:**
\`\`\`c
free(ptr);
ptr = NULL;  /* previne double-free și dangling pointer */
\`\`\`

**Regula 4 — Bounds checking la orice accesare:**
\`\`\`c
/* GREȘIT */
arr[i] = val;   /* i poate fi out of bounds */

/* CORECT */
if (i >= 0 && i < n) arr[i] = val;
else fprintf(stderr, "Index out of bounds: %d\\n", i);
\`\`\`

**Regula 5 — Lungime sigură la string:**
\`\`\`c
/* GREȘIT — buffer overflow posibil */
gets(buf); strcpy(dest, src);

/* CORECT — cu bounds */
fgets(buf, sizeof(buf), stdin);
strncpy(dest, src, sizeof(dest) - 1);
dest[sizeof(dest) - 1] = '\\0';
snprintf(dest, sizeof(dest), "%s", src);
\`\`\`

**Regula 6 — Nu returneza pointer la local:**
\`\`\`c
/* GREȘIT */
int* gresit(void) { int x = 5; return &x; }

/* CORECT — malloc sau static */
int* corect(void) {
    int *x = malloc(sizeof(int));
    *x = 5; return x;  /* caller face free */
}
\`\`\`

**Regula 7 — Cel care alocă, acela eliberează:**
\`\`\`c
/* Documentează ownership explicit */
/* Returnează buffer alocat — CALLER trebuie să facă free */
char* citeste_tot_fisierul(const char *path);
\`\`\`

**Checklist înainte de release:**
\`\`\`bash
gcc -Wall -Wextra -fsanitize=address,undefined -g -o prog prog.c && ./prog
valgrind --leak-check=full ./prog
\`\`\``
  },
  {
    lesson: "25. Bune Practici C — Recap Final",
    title: "Stilul codului și convenții",
    content: `Un cod bine scris e la fel de important ca unul corect — lizibilitatea reduce bug-urile și facilitează colaborarea. Alege un stil și rămâi consistent.

**Convenții de denumire:**
\`\`\`c
/* Funcții și variabile — snake_case */
int calculeaza_suma(int a, int b);
float medie_ponderata;
void afiseaza_rezultat(void);

/* Constante macro — UPPER_CASE */
#define MAX_SIZE  1024
#define PI        3.14159
#define APP_NAME  "MyApp"

/* Tipuri (typedef struct) — PascalCase sau snake_case_t */
typedef struct { int x, y; } Punct;
typedef struct Node * NodePtr;
typedef unsigned char uint8_t;
\`\`\`

**Indentare și acolade:**
\`\`\`c
/* K&R style (Linux kernel, common) */
if (conditie) {
    instructiune1;
} else {
    instructiune2;
}

/* Allman style (mai ușor de citit) */
if (conditie)
{
    instructiune1;
}
\`\`\`

**Dimensiunea funcțiilor:**
\`\`\`c
/* REGULA: o funcție = un singur lucru bine definit */
/* MAX ~50-100 linii — dacă e mai mare, sparge-o */

/* Bine: funcție clară, scurtă */
int este_palindrom(const char *s) {
    int lo = 0, hi = strlen(s) - 1;
    while (lo < hi) {
        if (s[lo++] != s[hi--]) return 0;
    }
    return 1;
}
\`\`\`

**Comentarii — când și cum:**
\`\`\`c
/* EVITA comentarii redundante */
i++;  /* incrementează i */  /* INUTIL */

/* SCRIE comentarii pentru WHY, nu WHAT */
/* Bitmask: biții 0-3 = permisii read/write/exec/hidden */
unsigned int perms = 0b00000111;

/* Documentare funcție publică */
/* Returnează indexul valorii în arr, sau -1 dacă nu există.
   Complexity: O(n). arr trebuie să fie sortat crescător. */
int cauta_binar(const int *arr, int n, int val);
\`\`\`

**Magic numbers — elimină-le:**
\`\`\`c
/* GREȘIT */
if (tip == 3) { ... }
for (int i = 0; i < 86400; i++) { ... }

/* CORECT */
enum TipFisier { TIP_TEXT=1, TIP_BINAR=2, TIP_DIRECTOR=3 };
#define SECUNDE_ZI  86400

if (tip == TIP_DIRECTOR) { ... }
for (int i = 0; i < SECUNDE_ZI; i++) { ... }
\`\`\``
  },
  {
    lesson: "25. Bune Practici C — Recap Final",
    title: "Portabilitate și standard",
    content: `Codul C portabil rulează identic pe platforme diferite (Linux, Windows, macOS, ARM, x86). Standardele C definesc ce e garantat portabil.

**Dimensiuni portabile — evită presupuneri:**
\`\`\`c
/* PROBLEMATIC — dimensiunile pot diferi pe platforme */
long x;           /* 4 bytes pe Windows 64-bit, 8 bytes pe Linux 64-bit */
int ptr_val = (int)ptr;   /* GREȘIT pe 64-bit: pointer e 8 bytes */

/* CORECT — tipuri cu dimensiune fixă din <stdint.h> */
#include <stdint.h>
int8_t   a;   /* exact 8 biți signed */
uint16_t b;   /* exact 16 biți unsigned */
int32_t  c;   /* exact 32 biți signed */
uint64_t d;   /* exact 64 biți unsigned */
intptr_t p;   /* integer suficient de mare pentru un pointer */
size_t   n;   /* tip pentru dimensiuni (sizeof, strlen) */
\`\`\`

**Endianness — ordinea bytes:**
\`\`\`c
/* x86 = Little Endian, unele ARM = Big Endian */
uint32_t x = 0x01020304;
unsigned char *bytes = (unsigned char*)&x;
printf("%02X %02X %02X %02X\\n", bytes[0], bytes[1], bytes[2], bytes[3]);
/* Little endian: 04 03 02 01
   Big endian:    01 02 03 04 */

/* Detectare endianness */
int little_endian(void) {
    uint16_t x = 1;
    return *(uint8_t*)&x == 1;
}
\`\`\`

**Platform-specific code — izolare:**
\`\`\`c
/* platform.h — abstractizare platformă */
#ifdef _WIN32
    #include <windows.h>
    #define SLEEP(ms) Sleep(ms)
    #define PATH_SEP "\\\\"
#else
    #include <unistd.h>
    #define SLEEP(ms) usleep((ms)*1000)
    #define PATH_SEP "/"
#endif

/* Utilizare uniformă */
SLEEP(100);
printf("Path: %s%s%s\\n", dir, PATH_SEP, file);
\`\`\`

**Undefined Behavior — evită:**
\`\`\`c
/* UB — comportament nedefinit, evita */
int x = INT_MAX; x++;     /* signed overflow */
int a = 0; int b = 1/a;   /* division by zero */
char *p = NULL; *p = 5;   /* null dereference */
int arr[5]; arr[5] = 1;   /* out of bounds */
char *r = func(); free(r); *r = 'a';  /* use after free */

/* UB nu înseamnă crash garantat — poate funcționa "by accident" */
/* cu alt compilator/platformă/optimizare → crash sau rezultate diferite */
\`\`\``
  },
  {
    lesson: "25. Bune Practici C — Recap Final",
    title: "Resurse pentru continuare",
    content: `Ai acoperit fundamentele C — acum e momentul să aprofundezi cu resurse de calitate și să aplici în proiecte reale.

**Cărți esențiale:**
• **"The C Programming Language"** — Kernighan & Ritchie (K&R) — cartea biblică a C, clară și concisă
• **"C Programming: A Modern Approach"** — K.N. King — cea mai completă carte pentru învățat C
• **"Expert C Programming"** — Peter van der Linden — subtilități avansate ale C
• **"Effective C"** — Robert C. Seacord — C modern și sigur (C17)

**Resurse online:**
\`\`\`
cppreference.com/w/c    — documentație completă a limbajului și bibliotecii
man7.org/linux/man-pages — man pages Linux (funcții sistem, POSIX)
godbolt.org             — Compiler Explorer — vezi assembly generat
valgrind.org            — documentație Valgrind
\`\`\`

**Proiecte pentru practică:**
\`\`\`c
/* Nivel 1 — implementează din zero */
/* - Linked list, stack, queue, hash table */
/* - Binary search tree */
/* - Sortare: merge sort, quick sort */
/* - String library proprie (my_strlen, my_strcpy, etc.) */

/* Nivel 2 — aplicații concrete */
/* - grep simplificat (citire fișiere + pattern matching) */
/* - cat, wc, head, tail (UNIX utilities) */
/* - Calculator cu parser de expresii */
/* - Joc de cărți sau Snake în terminal */

/* Nivel 3 — sisteme */
/* - HTTP server simplu (sockets BSD) */
/* - Shell UNIX basic (fork, exec, pipe) */
/* - Memory allocator (malloc/free propriu) */
/* - Interpreter Lisp sau JSON parser */
\`\`\`

**Lectură recomandată — standarde:**
\`\`\`bash
# Standardul C (draft gratuit)
# N1570 — C11 draft: http://www.open-std.org/jtc1/sc22/wg14/www/docs/n1570.pdf

# MISRA C — standard pentru sisteme safety-critical (automotive, aerospace)
# SEI CERT C — ghid de coding securizat
\`\`\`

**Comunități:**
• **r/C_Programming** — Reddit — întrebări, proiecte, discuții
• **Stack Overflow** — răspunsuri la întrebări specifice
• **comp.lang.c** — newsgroup tradițional
• **Discord: The Programmer's Hangout** — comunitate activă`
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
