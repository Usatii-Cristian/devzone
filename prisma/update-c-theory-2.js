"use strict";
require("dotenv").config({ path: ".env" });
const { PrismaClient } = require("@prisma/client");
const p = new PrismaClient();
const UPDATES = [
  {
    lesson: "6. Bucle: for, while, do-while",
    title: "for",
    content: `**Bucla \`for\`** este cea mai folosită buclă în C. Este ideală când știi dinainte numărul de iterații sau când iterezi prin array-uri și indexuri.

**Sintaxă clasică:**
\`\`\`c
for (inițializare; condiție; actualizare) {
    /* corp */
}
\`\`\`

**Exemplu de bază:**
\`\`\`c
#include <stdio.h>

int main(void) {
    /* Numărare de la 1 la 10 */
    for (int i = 1; i <= 10; i++) {
        printf("%d ", i);
    }
    printf("\\n");  /* 1 2 3 4 5 6 7 8 9 10 */

    /* Numărare inversă */
    for (int i = 10; i > 0; i--) {
        printf("%d ", i);
    }
    printf("\\n");  /* 10 9 8 7 6 5 4 3 2 1 */

    /* Pas de 2 */
    for (int i = 0; i <= 20; i += 2) {
        printf("%d ", i);  /* 0 2 4 6 8 10 12 14 16 18 20 */
    }
    return 0;
}
\`\`\`

**For cu array-uri:**
\`\`\`c
int arr[] = {10, 20, 30, 40, 50};
int n = sizeof(arr) / sizeof(arr[0]);  /* numărul de elemente */

/* Citire */
int suma = 0;
for (int i = 0; i < n; i++) {
    suma += arr[i];
}
printf("Suma: %d\\n", suma);  /* 150 */

/* Afișare */
for (int i = 0; i < n; i++) {
    printf("arr[%d] = %d\\n", i, arr[i]);
}
\`\`\`

**Bucle for imbricate — matrice:**
\`\`\`c
int matrice[3][3] = {{1,2,3},{4,5,6},{7,8,9}};

for (int i = 0; i < 3; i++) {
    for (int j = 0; j < 3; j++) {
        printf("%3d", matrice[i][j]);
    }
    printf("\\n");
}
/* Output:
   1  2  3
   4  5  6
   7  8  9 */
\`\`\`

**For infinit — idiom comun:**
\`\`\`c
for (;;) {
    /* execută la infinit */
    char cmd;
    scanf(" %c", &cmd);
    if (cmd == 'q') break;  /* ieși cu break */
}
\`\`\`

**Declararea variabilei de control în C89 vs C99:**
\`\`\`c
/* C89 — declari ÎNAINTE de for */
int i;
for (i = 0; i < 10; i++) { ... }

/* C99+ — declari ÎN for (scope limitat la buclă) */
for (int i = 0; i < 10; i++) { ... }
/* i nu mai există după buclă */
\`\`\``
  },
  {
    lesson: "6. Bucle: for, while, do-while",
    title: "while și do-while",
    content: `**\`while\`** și **\`do-while\`** sunt alternative la \`for\` când numărul de iterații nu se cunoaște dinainte — de ex. citire de input până la o condiție.

**\`while\` — condiție verificată ÎNAINTE:**
\`\`\`c
#include <stdio.h>

int main(void) {
    int n = 1;
    while (n <= 100) {
        printf("%d ", n);
        n *= 2;  /* 1 2 4 8 16 32 64 */
    }

    /* Citire până la valoare valida */
    int nota;
    do {
        /* do-while executat cel puțin o dată */
    } while (0);  /* placeholder */

    /* while pentru citire validata */
    printf("Nota (1-10): ");
    scanf("%d", &nota);
    while (nota < 1 || nota > 10) {
        printf("Invalida! Reintrodu (1-10): ");
        scanf("%d", &nota);
    }
    printf("Nota valida: %d\\n", nota);
    return 0;
}
\`\`\`

**\`do-while\` — condiție verificată DUPĂ:**
\`\`\`c
/* Se execută CEL PUȚIN O DATĂ */
int meniu;
do {
    printf("\\n=== Meniu ===\\n");
    printf("1. Adauga\\n");
    printf("2. Sterge\\n");
    printf("3. Afiseaza\\n");
    printf("0. Iesire\\n");
    printf("Optiunea: ");
    scanf("%d", &meniu);

    switch (meniu) {
        case 1: printf("Adaugat!\\n"); break;
        case 2: printf("Sters!\\n"); break;
        case 3: printf("Lista afisata\\n"); break;
        case 0: printf("La revedere!\\n"); break;
        default: printf("Optiune invalida\\n");
    }
} while (meniu != 0);
\`\`\`

**Comparație for vs while:**
\`\`\`c
/* for — când știi numărul de pași */
for (int i = 0; i < 10; i++) { ... }

/* while — când nu știi câți pași */
while (fgets(linie, 256, stdin) != NULL) { ... }  /* citire fișier */

/* do-while — când trebuie cel puțin o execuție */
do { citeste_input(); } while (!input_valid());
\`\`\`

**While cu EOF — citire până la capăt fișier:**
\`\`\`c
int c;
while ((c = getchar()) != EOF) {
    putchar(c);
}

/* Citire numere din fișier */
int x;
while (fscanf(fisier, "%d", &x) == 1) {
    suma += x;
}
\`\`\``
  },
  {
    lesson: "6. Bucle: for, while, do-while",
    title: "break și continue",
    content: `**\`break\`** și **\`continue\`** modifică fluxul buclelor. \`break\` iese complet din buclă, \`continue\` sare la iterația următoare.

**\`break\` — iese din buclă:**
\`\`\`c
/* Căutare în array — ieși când găsești */
int arr[] = {5, 3, 8, 1, 9, 2};
int target = 8, gasit = -1;

for (int i = 0; i < 6; i++) {
    if (arr[i] == target) {
        gasit = i;
        break;  /* nu mai parcurge restul */
    }
}
printf(gasit >= 0 ? "Gasit la %d\\n" : "Negasit\\n", gasit);

/* break în while infinit */
int suma = 0;
while (1) {
    int n;
    scanf("%d", &n);
    if (n == 0) break;  /* 0 = sentinel value = stop */
    suma += n;
}
printf("Suma: %d\\n", suma);
\`\`\`

**\`continue\` — sare la iterația următoare:**
\`\`\`c
/* Afișează doar numerele impare */
for (int i = 1; i <= 20; i++) {
    if (i % 2 == 0) continue;  /* sare peste pare */
    printf("%d ", i);
}
/* 1 3 5 7 9 11 13 15 17 19 */

/* Sare peste input invalid */
for (int i = 0; i < 5; i++) {
    int n;
    scanf("%d", &n);
    if (n < 0) {
        printf("Negativ ignorat\\n");
        i--;  /* nu incrementa indexul */
        continue;
    }
    printf("Procesat: %d\\n", n);
}
\`\`\`

**break în bucle imbricate — iese doar din bucla CURENTĂ:**
\`\`\`c
for (int i = 0; i < 5; i++) {
    for (int j = 0; j < 5; j++) {
        if (j == 3) break;   /* iese din for j, NU din for i */
        printf("%d,%d ", i, j);
    }
}
/* Output: 0,0 0,1 0,2 1,0 1,1 1,2 ... */

/* Pentru ieșire din bucle imbricate — flag sau goto */
int gasit = 0;
for (int i = 0; i < rows && !gasit; i++) {
    for (int j = 0; j < cols && !gasit; j++) {
        if (mat[i][j] == target) {
            gasit = 1;  /* flag oprire */
        }
    }
}
\`\`\`

**\`goto\` — ultima soluție pentru ieșire din bucle imbricate:**
\`\`\`c
for (int i = 0; i < 10; i++) {
    for (int j = 0; j < 10; j++) {
        if (i + j == 15) goto done;
    }
}
done:
printf("Iesit din ambele bucle\\n");
/* goto e acceptabil doar pentru cleanup și ieșire din nested loops */
\`\`\``
  },
  {
    lesson: "7. Funcții",
    title: "Definire și apelare",
    content: `**Funcțiile** în C permit împărțirea programului în blocuri reutilizabile, cu intrări (parametri) și ieșire (valoare returnată). C este un limbaj **procedural** — funcțiile sunt unitatea de bază.

**Sintaxă completă:**
\`\`\`c
/* tip_retur  nume_functie(parametri) {
       corp
       return valoare;
   } */

int aduna(int a, int b) {
    return a + b;
}

void afiseaza(const char *mesaj) {
    printf("%s\\n", mesaj);
    /* void — nu returnează valoare */
}

int main(void) {
    int rez = aduna(5, 3);   /* apel funcție */
    printf("5 + 3 = %d\\n", rez);  /* 8 */
    afiseaza("Salut!");
    return 0;
}
\`\`\`

**Parametri și argumente:**
\`\`\`c
/* PARAMETRI — în definiția funcției */
float calculeaza_medie(int nota1, int nota2, int nota3) {
    return (nota1 + nota2 + nota3) / 3.0f;
}

/* ARGUMENTE — la apelarea funcției */
float media = calculeaza_medie(8, 9, 7);  /* 8.0 */
\`\`\`

**Funcție cu mai multe return-uri:**
\`\`\`c
int maxim(int a, int b) {
    if (a > b) return a;
    return b;
}

const char *clasificare(int nota) {
    if (nota >= 9) return "Excelent";
    if (nota >= 7) return "Bine";
    if (nota >= 5) return "Suficient";
    return "Insuficient";
}
\`\`\`

**Funcții cu parametri multipli:**
\`\`\`c
#include <math.h>

double distanta(double x1, double y1, double x2, double y2) {
    double dx = x2 - x1;
    double dy = y2 - y1;
    return sqrt(dx*dx + dy*dy);
}

int main(void) {
    printf("%.2f\\n", distanta(0,0, 3,4));  /* 5.00 */
    return 0;
}
\`\`\`

**Funcții recursive (preview):**
\`\`\`c
int factorial(int n) {
    if (n <= 1) return 1;           /* caz de baza */
    return n * factorial(n - 1);    /* apel recursiv */
}
printf("%d\\n", factorial(5));  /* 120 */
\`\`\`

**Variabile locale vs globale:**
\`\`\`c
int global = 100;  /* vizibil în tot fișierul */

void func(void) {
    int local = 5;   /* există doar în func */
    global += local; /* accesează global */
}

int main(void) {
    func();
    printf("%d\\n", global);  /* 105 */
    /* printf("%d\\n", local); — EROARE: local nu există aici */
    return 0;
}
\`\`\``
  },
  {
    lesson: "7. Funcții",
    title: "Function prototypes",
    content: `**Prototipul** (declarația) unei funcții spune compilatorului ce tip returnează și ce parametri primește, ÎNAINTE de definiția completă. Este esențial când funcțiile se apelează înainte de a fi definite.

**Problema fără prototip:**
\`\`\`c
int main(void) {
    int r = aduna(5, 3);   /* EROARE: 'aduna' nu e declarată */
    printf("%d\\n", r);
    return 0;
}

int aduna(int a, int b) { return a + b; }  /* definit DUPĂ main */
\`\`\`

**Soluția — prototip înainte de main:**
\`\`\`c
#include <stdio.h>

/* PROTOTIPURI — înainte de main */
int aduna(int a, int b);
float medie(int arr[], int n);
void afiseaza_arr(const int *arr, int n);

int main(void) {
    int arr[] = {10, 20, 30, 40, 50};
    int n = 5;

    printf("Suma: %d\\n", aduna(arr[0], arr[1]));   /* OK */
    printf("Medie: %.1f\\n", medie(arr, n));          /* OK */
    afiseaza_arr(arr, n);
    return 0;
}

/* DEFINIȚII — după main */
int aduna(int a, int b) { return a + b; }

float medie(int arr[], int n) {
    int suma = 0;
    for (int i = 0; i < n; i++) suma += arr[i];
    return (float)suma / n;
}

void afiseaza_arr(const int *arr, int n) {
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\\n");
}
\`\`\`

**Header files — prototipuri în fișiere separate:**
\`\`\`c
/* calc.h — declarații publice */
#ifndef CALC_H   /* include guard — previne includere dublă */
#define CALC_H

int aduna(int a, int b);
int scade(int a, int b);
float medie(int *arr, int n);

#endif /* CALC_H */
\`\`\`
\`\`\`c
/* calc.c — implementările */
#include "calc.h"

int aduna(int a, int b) { return a + b; }
int scade(int a, int b) { return a - b; }
float medie(int *arr, int n) {
    int s = 0;
    for (int i = 0; i < n; i++) s += arr[i];
    return (float)s / n;
}
\`\`\`
\`\`\`c
/* main.c */
#include <stdio.h>
#include "calc.h"

int main(void) {
    printf("%d\\n", aduna(10, 5));  /* 15 */
    return 0;
}
\`\`\`
\`\`\`bash
gcc main.c calc.c -o program  /* compilare împreună */
\`\`\``
  },
  {
    lesson: "7. Funcții",
    title: "Pass by value vs pointer",
    content: `În C, argumentele sunt pasate **prin valoare** (copie) implicit. Dacă vrei ca funcția să modifice variabila originală, trebuie să pasezi **un pointer** la ea.

**Pass by value — funcția primește o COPIE:**
\`\`\`c
void dublu(int n) {
    n = n * 2;   /* modifică COPIA, nu originalul */
}

int main(void) {
    int x = 5;
    dublu(x);
    printf("%d\\n", x);  /* 5 — NEMODIFICAT */
    return 0;
}
\`\`\`

**Pass by pointer — funcția primește ADRESA:**
\`\`\`c
void dublu_ptr(int *n) {
    *n = *n * 2;   /* modifică valoarea de la adresă */
}

int main(void) {
    int x = 5;
    dublu_ptr(&x);  /* trimite adresa lui x */
    printf("%d\\n", x);  /* 10 — MODIFICAT */
    return 0;
}
\`\`\`

**Exemplu clasic — swap:**
\`\`\`c
/* GREȘIT — prin valoare */
void swap_gresit(int a, int b) {
    int tmp = a; a = b; b = tmp;  /* swap pe copii, inutilă */
}

/* CORECT — prin pointer */
void swap(int *a, int *b) {
    int tmp = *a;
    *a = *b;
    *b = tmp;
}

int main(void) {
    int x = 10, y = 20;
    swap(&x, &y);
    printf("x=%d, y=%d\\n", x, y);  /* x=20, y=10 */
    return 0;
}
\`\`\`

**Funcție care returnează mai multe valori via pointeri:**
\`\`\`c
/* Calculează atât minimul cât și maximul */
void min_max(int *arr, int n, int *min, int *max) {
    *min = *max = arr[0];
    for (int i = 1; i < n; i++) {
        if (arr[i] < *min) *min = arr[i];
        if (arr[i] > *max) *max = arr[i];
    }
}

int main(void) {
    int arr[] = {5, 2, 8, 1, 9, 3};
    int mn, mx;
    min_max(arr, 6, &mn, &mx);
    printf("Min: %d, Max: %d\\n", mn, mx);  /* Min: 1, Max: 9 */
    return 0;
}
\`\`\`

**Array-urile sunt MEREU pasate prin pointer:**
\`\`\`c
void modifica(int arr[], int n) {  /* arr e pointer, nu copie */
    arr[0] = 999;  /* modifică array-ul original */
}

void readonly(const int *arr, int n) {  /* const — nu poate modifica */
    printf("%d\\n", arr[0]);
    /* arr[0] = 1;  — EROARE de compilare */
}
\`\`\``
  },
  {
    lesson: "8. Array-uri",
    title: "Declarare și inițializare",
    content: `**Array-urile** în C sunt colecții de elemente de **același tip**, stocate **contiguu** în memorie. Sunt structura de date fundamentală — stack, queue, string-uri, matrice — toate pornesc de la array.

**Declarare și inițializare:**
\`\`\`c
/* Declarare cu dimensiune fixă */
int numere[5];           /* 5 int-uri, neinițializate (garbage!) */
float scoruri[10];
char litere[26];

/* Inițializare cu valori */
int arr[5] = {10, 20, 30, 40, 50};

/* Inițializare parțială — restul devine 0 */
int arr2[5] = {1, 2};    /* {1, 2, 0, 0, 0} */

/* Inițializare cu toate 0-uri */
int zerouri[100] = {0};  /* toți 0 */

/* Dimensiune inferată */
int auto_size[] = {3, 1, 4, 1, 5, 9};  /* dimensiune = 6 */
int n = sizeof(auto_size) / sizeof(auto_size[0]);  /* = 6 */
\`\`\`

**Accesare și modificare:**
\`\`\`c
int arr[5] = {10, 20, 30, 40, 50};

/* Indexare de la 0 */
printf("%d\\n", arr[0]);   /* 10 */
printf("%d\\n", arr[4]);   /* 50 */

/* Modificare */
arr[2] = 99;
printf("%d\\n", arr[2]);   /* 99 */

/* Iterare completă */
for (int i = 0; i < 5; i++) {
    printf("arr[%d] = %d\\n", i, arr[i]);
}
\`\`\`

**Dimensiunea unui array:**
\`\`\`c
int arr[] = {1, 2, 3, 4, 5};
int len = sizeof(arr) / sizeof(arr[0]);  /* 5 */

/* ATENȚIE — funcționează doar în scope-ul unde e definit */
void func(int arr[], int n) {
    /* sizeof(arr) = sizeof(int*) = 8 — NU lungimea array-ului */
    /* Trebuie să pasezi n ca parametru */
}
\`\`\`

**Buffer overflow — bug clasic în C:**
\`\`\`c
int arr[5] = {0};
arr[5] = 99;   /* index out of bounds! */
             /* C nu aruncă excepție — scrie în memorie invalidă */
             /* Poate corupe alte variabile sau crash */

/* ÎNTOTDEAUNA verifică bounds */
int i = 5;
if (i >= 0 && i < 5) {
    arr[i] = 99;
}
\`\`\`

**Inițializare la declararare vs în buclă:**
\`\`\`c
/* Inițializare dinamică cu valori calculate */
int patrate[10];
for (int i = 0; i < 10; i++) {
    patrate[i] = i * i;  /* 0, 1, 4, 9, 16, 25... */
}

/* memset — inițializare rapidă cu byte-uri */
#include <string.h>
int buf[100];
memset(buf, 0, sizeof(buf));   /* toți biții la 0 */
memset(buf, -1, sizeof(buf));  /* toți biții la 1 (0xFF) */
\`\`\``
  },
  {
    lesson: "8. Array-uri",
    title: "Array 2D — matrice",
    content: `**Array-urile bidimensionale (2D)** reprezintă matrice — grile, tablouri, hărți, imagini. În C, sunt stocate **row-major** (rând cu rând) în memorie.

**Declarare și inițializare:**
\`\`\`c
/* Matrice 3×4 (3 rânduri, 4 coloane) */
int mat[3][4] = {
    {1,  2,  3,  4},
    {5,  6,  7,  8},
    {9, 10, 11, 12}
};

/* Inițializare fără grupare */
int mat2[2][3] = {1, 2, 3, 4, 5, 6};  /* umple row by row */

/* Declarare neinitialiată */
float imagine[100][100];  /* matrice 100×100 de floats */

/* Accesare element */
printf("%d\\n", mat[1][2]);   /* 7 — rând 1, coloană 2 */
mat[0][0] = 99;
\`\`\`

**Parcurgere 2D — bucle imbricate:**
\`\`\`c
int rows = 3, cols = 4;

/* Afișare formatată */
for (int i = 0; i < rows; i++) {
    for (int j = 0; j < cols; j++) {
        printf("%4d", mat[i][j]);
    }
    printf("\\n");
}
/*   1   2   3   4
     5   6   7   8
     9  10  11  12 */

/* Suma tuturor elementelor */
int suma = 0;
for (int i = 0; i < rows; i++)
    for (int j = 0; j < cols; j++)
        suma += mat[i][j];
printf("Suma: %d\\n", suma);  /* 78 */
\`\`\`

**Operații pe matrice — transpusa:**
\`\`\`c
int a[3][3] = {{1,2,3},{4,5,6},{7,8,9}};
int t[3][3];

for (int i = 0; i < 3; i++)
    for (int j = 0; j < 3; j++)
        t[j][i] = a[i][j];

/* t = {{1,4,7},{2,5,8},{3,6,9}} */
\`\`\`

**Layout în memorie — row-major:**
\`\`\`c
int m[2][3] = {{1,2,3},{4,5,6}};
/* Memorie: 1 2 3 4 5 6 — rând cu rând */
/* m[0][0], m[0][1], m[0][2], m[1][0], m[1][1], m[1][2] */

/* Pointer la matrice */
int *ptr = &m[0][0];   /* sau (int*)m */
for (int i = 0; i < 6; i++) {
    printf("%d ", ptr[i]);  /* 1 2 3 4 5 6 */
}
\`\`\`

**Pasare matrice la funcție — lățimea coloanelor NECESARĂ:**
\`\`\`c
void afiseaza(int mat[][4], int rows) {  /* cols fix în tip */
    for (int i = 0; i < rows; i++) {
        for (int j = 0; j < 4; j++)
            printf("%3d", mat[i][j]);
        printf("\\n");
    }
}
/* Soluție generică cu pointer și cols separat */
void afiseaza_gen(int *mat, int rows, int cols) {
    for (int i = 0; i < rows; i++) {
        for (int j = 0; j < cols; j++)
            printf("%3d", mat[i*cols + j]);
        printf("\\n");
    }
}
\`\`\``
  },
  {
    lesson: "8. Array-uri",
    title: "Array ca parametru funcție",
    content: `Când pasezi un array unei funcții în C, se trimite de fapt un **pointer la primul element** — nu o copie a array-ului. Asta înseamnă că funcția poate modifica array-ul original.

**Decay la pointer — array → pointer:**
\`\`\`c
int arr[5] = {1, 2, 3, 4, 5};

/* Aceste 3 forme sunt echivalente */
void func1(int arr[], int n) { ... }      /* notație array */
void func2(int *arr, int n) { ... }       /* notație pointer */
void func3(int arr[5], int n) { ... }     /* dimensiunea ignorată */

/* Array "decay" la pointer la primul element */
int *ptr = arr;   /* ptr = &arr[0] */
\`\`\`

**Funcție care modifică array:**
\`\`\`c
void inmulteste(int *arr, int n, int factor) {
    for (int i = 0; i < n; i++) {
        arr[i] *= factor;   /* modifică originalul */
    }
}

int main(void) {
    int v[] = {1, 2, 3, 4, 5};
    inmulteste(v, 5, 10);
    /* v este acum {10, 20, 30, 40, 50} */
    return 0;
}
\`\`\`

**\`const\` pentru array-uri read-only:**
\`\`\`c
/* Funcție care nu trebuie să modifice array-ul */
int suma(const int *arr, int n) {
    int s = 0;
    for (int i = 0; i < n; i++) s += arr[i];
    /* arr[0] = 99;  — EROARE: const */
    return s;
}

int gaseste(const int *arr, int n, int val) {
    for (int i = 0; i < n; i++)
        if (arr[i] == val) return i;
    return -1;   /* -1 = negăsit */
}
\`\`\`

**Pattern util — funcții cu return și modificare:**
\`\`\`c
/* Returnează numărul de elemente schimbate */
int elimina_negative(int *arr, int n) {
    int schimbate = 0;
    for (int i = 0; i < n; i++) {
        if (arr[i] < 0) {
            arr[i] = 0;
            schimbate++;
        }
    }
    return schimbate;
}

int main(void) {
    int v[] = {3, -1, 5, -2, 7};
    int n = elimina_negative(v, 5);
    printf("%d eliminate\\n", n);  /* 2 */
    /* v = {3, 0, 5, 0, 7} */
    return 0;
}
\`\`\`

**Sizeof nu funcționează pentru array pasat la funcție:**
\`\`\`c
void gresit(int arr[]) {
    int len = sizeof(arr) / sizeof(arr[0]);
    /* sizeof(arr) = sizeof(int*) = 8 pe 64-bit */
    /* len = 8/4 = 2 — INCORECT */
}

/* CORECT — pasează lungimea explicit */
void corect(int arr[], int n) { /* n = lungimea */ }
\`\`\``
  },
  {
    lesson: "9. Pointers — fundamentul C",
    title: "Ce e un pointer?",
    content: `**Un pointer** este o variabilă care stochează o **adresă de memorie**. Dacă variabilele obișnuite stochează valori (5, 3.14, 'A'), pointerii stochează locația din memorie unde se află acele valori.

**Conceptul fundamental:**
\`\`\`
Memorie RAM:
Adresă   Valoare
0x1000:  5        ← int x = 5
0x1004:  0x1000   ← int *p = &x (pointer la x)
\`\`\`

**Sintaxă — declarare și utilizare:**
\`\`\`c
#include <stdio.h>

int main(void) {
    int x = 5;       /* variabilă obișnuită */
    int *p = &x;     /* p = pointer la x (& = "adresa lui") */

    printf("Valoarea lui x:    %d\\n",  x);   /* 5 */
    printf("Adresa lui x:      %p\\n", &x);   /* 0x7ffd... */
    printf("Valoarea lui p:    %p\\n",  p);   /* 0x7ffd... (aceeași!) */
    printf("Valoarea la *p:    %d\\n", *p);   /* 5 (dereferentiere) */

    /* Modificare prin pointer */
    *p = 10;
    printf("Acum x = %d\\n", x);  /* 10 */

    return 0;
}
\`\`\`

**Operatorii pointer:**
| Operator | Nume | Efect |
|----------|------|-------|
| \`&x\` | address-of | adresa variabilei x |
| \`*p\` | dereferenciere | valoarea de la adresa p |

**Pointeri la diferite tipuri:**
\`\`\`c
int    *pi = &un_int;      /* pointer la int */
float  *pf = &un_float;    /* pointer la float */
char   *pc = &un_char;     /* pointer la char */
double *pd = &un_double;   /* pointer la double */

/* Aritmetică pointer — avansează cu sizeof(tip) */
int arr[] = {10, 20, 30};
int *p = arr;              /* p → arr[0] */
printf("%d\\n", *p);       /* 10 */
p++;                       /* p → arr[1] (avansează 4 bytes) */
printf("%d\\n", *p);       /* 20 */
\`\`\`

**Dimensiunea pointerilor:**
\`\`\`c
printf("%zu\\n", sizeof(int*));     /* 8 pe 64-bit, 4 pe 32-bit */
printf("%zu\\n", sizeof(char*));    /* 8 — ACELAȘI indiferent de tip */
printf("%zu\\n", sizeof(double*));  /* 8 */
\`\`\`

**Pointer vs valoare — vizual:**
\`\`\`
int x = 5;
int *p = &x;

   p          x
[0x1000] → [5]  la adresa 0x1000

*p = 99  →  [99]  modifică valoarea la adresa stocată în p
\`\`\``
  },
  {
    lesson: "9. Pointers — fundamentul C",
    title: "Pointers și array-uri",
    content: `În C există o **relație strânsă** între pointeri și array-uri. Numele unui array **decays** la un pointer la primul element — de aceea le putem folosi interschimbabil în multe contexte.

**Array name = pointer la primul element:**
\`\`\`c
int arr[] = {10, 20, 30, 40, 50};

int *p = arr;         /* p → arr[0] */
/* Echivalent: int *p = &arr[0]; */

printf("%d\\n", arr[0]);  /* 10 */
printf("%d\\n", *p);      /* 10 — același lucru */
printf("%d\\n", p[0]);    /* 10 — subscript pe pointer */
\`\`\`

**Aritmetică pointer — traversare array:**
\`\`\`c
int arr[] = {10, 20, 30, 40, 50};
int *p = arr;

for (int i = 0; i < 5; i++) {
    printf("p[%d] = %d, *(p+%d) = %d\\n", i, p[i], i, *(p+i));
}
/* p[i] și *(p+i) sunt identice */

/* Traversare cu pointer */
for (int *ptr = arr; ptr < arr + 5; ptr++) {
    printf("%d ", *ptr);
}
/* 10 20 30 40 50 */
\`\`\`

**Diferența array vs pointer:**
\`\`\`c
int arr[5] = {1,2,3,4,5};
int *p = arr;

/* arr — adresă fixă, nu poate fi schimbată */
/* arr = p;  — EROARE: arr nu e lvalue */

/* p — pointer variabil */
p++;      /* OK: p acum arată spre arr[1] */
p = arr;  /* OK: reset la început */

/* sizeof diferit */
printf("%zu\\n", sizeof(arr));  /* 20 = 5 * sizeof(int) */
printf("%zu\\n", sizeof(p));    /* 8 = sizeof(pointer) */
\`\`\`

**Pointer arithmetic — calcule cu adrese:**
\`\`\`c
int arr[] = {10, 20, 30, 40, 50};
int *start = arr;
int *end   = arr + 5;   /* past-the-end pointer */

/* Diferența dintre pointeri */
ptrdiff_t len = end - start;  /* 5 */

/* Pointer comparison */
for (int *p = start; p != end; p++) {
    printf("%d ", *p);
}
\`\`\`

**String-uri = char arrays:**
\`\`\`c
char s[] = "salut";    /* array: {'s','a','l','u','t','\\0'} */
char *p  = "salut";    /* pointer la string literal — read-only */

/* Traversare cu pointer */
for (char *c = s; *c != '\\0'; c++) {
    printf("%c", *c);
}
\`\`\``
  },
  {
    lesson: "9. Pointers — fundamentul C",
    title: "NULL pointer și siguranță",
    content: `**NULL** este un pointer cu valoarea 0 — nu arată spre nicio locație validă de memorie. Este folosit pentru a indica "pointer neutilizat" sau "valoare lipsă". Dereferențierea unui NULL pointer cauzează **Segmentation Fault**.

**NULL pointer — declarare și verificare:**
\`\`\`c
#include <stdio.h>
#include <stdlib.h>  /* pentru NULL */

int main(void) {
    int *p = NULL;   /* pointer neinițializat — setează explicit NULL */

    /* ÎNTOTDEAUNA verifică NULL înainte de dereferenciere */
    if (p != NULL) {
        printf("%d\\n", *p);  /* safe */
    } else {
        printf("Pointer nul — nu pot dereferentia\\n");
    }

    /* Prescurtat */
    if (p) {
        printf("%d\\n", *p);
    }
    return 0;
}
\`\`\`

**Malloc și NULL — verificare obligatorie:**
\`\`\`c
#include <stdlib.h>

int *arr = malloc(100 * sizeof(int));
if (arr == NULL) {
    fprintf(stderr, "Alocare esuata!\\n");
    exit(1);
}
/* Acum e sigur să folosești arr */
arr[0] = 42;
free(arr);
arr = NULL;   /* Set NULL după free — previne dangling pointer */
\`\`\`

**Dangling pointer — pointer la memorie eliberată:**
\`\`\`c
int *p = malloc(sizeof(int));
*p = 5;
free(p);
/* p acum e dangling — arată spre memorie eliberată */
printf("%d\\n", *p);  /* UNDEFINED BEHAVIOR — poate crash sau valoare coruptă */

/* FIX — setează NULL după free */
free(p);
p = NULL;
if (p) printf("%d\\n", *p);  /* safe — nu se execută */
\`\`\`

**Wild pointer — pointer neinițializat:**
\`\`\`c
int *p;         /* neinițializat — VALOARE ALEATORIE */
*p = 5;         /* CRASH sau corupere memorie */

/* FIX */
int *p = NULL;  /* sau */
int x = 5;
int *p = &x;
\`\`\`

**Reguli de siguranță pentru pointeri:**
• **Inițializează** întotdeauna — \`int *p = NULL\` sau \`= &variabila\`
• **Verifică NULL** înainte de orice dereferențiere
• **Set NULL după free** — \`free(p); p = NULL;\`
• **Nu folosi after-free** — pointer devine dangling după free
• **Nu depăși bounds** — pointer arithmetic trebuie să rămână în array
• **Folosește \`-fsanitize=address\`** la compilare pentru detectare runtime`
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
