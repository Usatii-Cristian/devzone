"use strict";
require("dotenv").config({ path: ".env" });
const { PrismaClient } = require("@prisma/client");
const p = new PrismaClient();
const UPDATES = [
  {
    lesson: "10. String-uri și alocare dinamică (malloc)",
    title: "String-uri în C — array de char",
    content: `**String-urile în C** sunt array-uri de caractere terminate cu caracterul **null** (\`'\\0'\`, byte 0). Nu există un tip \`string\` nativ — totul se bazează pe \`char*\` și funcțiile din \`<string.h>\`.

**Declarare și inițializare:**
\`\`\`c
#include <stdio.h>
#include <string.h>

int main(void) {
    /* Array de char — modificabil */
    char s1[] = "salut";      /* {'s','a','l','u','t','\\0'} — 6 bytes */
    char s2[20] = "lume";     /* buffer de 20, "lume\\0" + spațiu */

    /* Pointer la string literal — READ-ONLY */
    const char *s3 = "hello"; /* în segment read-only — nu modifica! */

    /* Lungimea (fără \\0) */
    printf("Lungime: %zu\\n", strlen(s1));  /* 5 */

    /* Accesare caracter */
    printf("Primul: %c\\n",  s1[0]);   /* s */
    printf("Ultimul: %c\\n", s1[4]);   /* t */

    return 0;
}
\`\`\`

**Funcții esențiale din \`<string.h>\`:**
\`\`\`c
char dest[50], src[] = "lume";

/* Copiere */
strcpy(dest, src);              /* PERICULOS — no bounds check */
strncpy(dest, src, 49);         /* SIGUR — maxim 49 chars */
dest[49] = '\\0';                /* asigură terminarea */

/* Concatenare */
char s[50] = "salut ";
strcat(s, "lume");              /* PERICULOS */
strncat(s, "lume", 49 - strlen(s));  /* SIGUR */

/* Comparare */
int cmp = strcmp("abc", "abd");  /* < 0 dacă primul e mai mic */
int n_cmp = strncmp("abc", "abd", 2);  /* compară primele 2 chars */

/* Căutare */
char *pos = strchr(s, 'u');     /* primul 'u' în s */
char *sub = strstr(s, "lume");  /* subșir în s */
\`\`\`

**Input sigur cu \`fgets\`:**
\`\`\`c
char nume[100];
printf("Introdu numele: ");
fgets(nume, sizeof(nume), stdin);
/* fgets include \\n — eliminare */
size_t len = strlen(nume);
if (len > 0 && nume[len-1] == '\\n') {
    nume[len-1] = '\\0';
}
printf("Salut, %s!\\n", nume);
\`\`\`

**Iterar prin string:**
\`\`\`c
char s[] = "Salut, lume!";

/* Cu index */
for (int i = 0; s[i] != '\\0'; i++) {
    printf("%c", s[i]);
}

/* Cu pointer */
for (char *p = s; *p; p++) {
    printf("%c", *p);
}

/* Numără vocale */
int vocale = 0;
for (char *p = s; *p; p++) {
    if (strchr("aeiouAEIOU", *p)) vocale++;
}
\`\`\`

**sprintf — format string în buffer:**
\`\`\`c
char buf[100];
int n = 42; float f = 3.14f;
sprintf(buf, "Numar: %d, Float: %.2f", n, f);
/* buf = "Numar: 42, Float: 3.14" */
snprintf(buf, sizeof(buf), "...");  /* versiunea sigură */
\`\`\``
  },
  {
    lesson: "10. String-uri și alocare dinamică (malloc)",
    title: "malloc — alocare dinamică",
    content: `**\`malloc\`** (memory allocation) alocă memorie la **runtime** pe **heap**. Spre deosebire de variabilele locale (stocate pe stack), memoria heap persistă până la \`free()\` explicit.

**Stack vs Heap:**
\`\`\`
Stack — automatic, limitat (~1-8MB), rapid
  - variabile locale, parametri funcții
  - deallocat automat la ieșirea din funcție

Heap — manual, limitat de RAM, oarecum mai lent
  - malloc/calloc/realloc
  - trebuie eliberaț cu free()
  - persists dincolo de funcție
\`\`\`

**Sintaxă malloc:**
\`\`\`c
#include <stdlib.h>

/* malloc(bytes) — returnează void*, sau NULL dacă eșuează */
int *arr = (int*)malloc(10 * sizeof(int));

if (arr == NULL) {
    fprintf(stderr, "Alocare esuat!\\n");
    exit(EXIT_FAILURE);
}

/* Folosire array alocat dinamic */
for (int i = 0; i < 10; i++) {
    arr[i] = i * i;
}

/* OBLIGATORIU — eliberare memorie */
free(arr);
arr = NULL;  /* previne dangling pointer */
\`\`\`

**Array de dimensiune dată la runtime:**
\`\`\`c
int n;
printf("Cate elemente? ");
scanf("%d", &n);

int *arr = (int*)malloc(n * sizeof(int));
if (!arr) { perror("malloc"); exit(1); }

for (int i = 0; i < n; i++) {
    printf("arr[%d]: ", i);
    scanf("%d", &arr[i]);
}

/* Sortare, procesare, etc. */
free(arr);
\`\`\`

**String alocat dinamic:**
\`\`\`c
#include <string.h>

const char *sursa = "Salut, lume!";
size_t len = strlen(sursa) + 1;  /* +1 pentru \\0 */

char *copie = (char*)malloc(len);
if (!copie) { exit(1); }

strcpy(copie, sursa);   /* sau memcpy(copie, sursa, len) */
printf("%s\\n", copie); /* Salut, lume! */

free(copie);
copie = NULL;
\`\`\`

**Memory leaks — alocare fără free:**
\`\`\`c
void functie_gresita(void) {
    int *p = malloc(100 * sizeof(int));
    /* ... */
    return;   /* LEAK: p e alocat dar nu eliberat */
}
/* La fiecare apel al funcției, se pierde memorie */

/* FIX: */
void functie_corecta(void) {
    int *p = malloc(100 * sizeof(int));
    if (!p) return;
    /* ... */
    free(p);  /* eliberare înainte de return */
}
\`\`\``
  },
  {
    lesson: "10. String-uri și alocare dinamică (malloc)",
    title: "calloc, realloc",
    content: `**\`calloc\`** și **\`realloc\`** completează \`malloc\` pentru gestionarea dinamică a memoriei. \`calloc\` inițializează cu 0, \`realloc\` redimensionează un bloc existent.

**\`calloc\` — alocare cu inițializare la zero:**
\`\`\`c
#include <stdlib.h>

/* calloc(nr_elemente, dimensiune_element) */
int *arr = (int*)calloc(10, sizeof(int));
if (!arr) { exit(1); }

/* TOȚI bytes sunt 0 — diferit de malloc (garbage) */
for (int i = 0; i < 10; i++) {
    printf("%d ", arr[i]);   /* 0 0 0 0 0 0 0 0 0 0 */
}

free(arr);
\`\`\`

**\`malloc\` vs \`calloc\`:**
| Aspect | malloc | calloc |
|--------|--------|--------|
| Parametri | nr_bytes | nr_elemente, dim_elem |
| Inițializare | nu (garbage) | da (zero) |
| Viteză | ușor mai rapid | ușor mai lent (zero-fill) |
| Detectare overflow | manual | automat (nr*dim) |

**\`realloc\` — redimensionare bloc existent:**
\`\`\`c
int *arr = (int*)malloc(5 * sizeof(int));
if (!arr) exit(1);

arr[0] = 1; arr[1] = 2; arr[2] = 3;

/* Extinde la 10 elemente — datele vechi sunt PĂSTRATE */
int *tmp = (int*)realloc(arr, 10 * sizeof(int));
if (!tmp) {
    free(arr);  /* IMPORTANT: arr e încă valid dacă realloc eșuează */
    exit(1);
}
arr = tmp;   /* actualizează pointerul */

arr[3] = 4; arr[4] = 5;
/* Elementele 5-9 pot fi garbage — inițializează manual */

free(arr);
\`\`\`

**Pattern dinamic — array expandabil:**
\`\`\`c
int *arr = NULL;
int len = 0, cap = 0;

void push(int val) {
    if (len == cap) {
        cap = (cap == 0) ? 4 : cap * 2;  /* dublează capacitatea */
        int *tmp = realloc(arr, cap * sizeof(int));
        if (!tmp) { free(arr); exit(1); }
        arr = tmp;
    }
    arr[len++] = val;
}

int main(void) {
    for (int i = 0; i < 20; i++) push(i);
    printf("Lungime: %d, Capacitate: %d\\n", len, cap);
    free(arr);
    return 0;
}
\`\`\`

**Greșeală frecventă cu realloc:**
\`\`\`c
/* GREȘIT — pierdere referință la arr dacă realloc eșuează */
arr = realloc(arr, nou_size);  /* dacă returnează NULL, arr = NULL, leak! */

/* CORECT */
void *tmp = realloc(arr, nou_size);
if (!tmp) {
    free(arr);  /* eliberează blocul original */
    arr = NULL;
    return;
}
arr = tmp;
\`\`\``
  },
  {
    lesson: "11. Structuri și fișiere",
    title: "struct — date complexe",
    content: `**\`struct\`** (structură) grupează mai multe variabile de **tipuri diferite** sub un singur nume. Este echivalentul unui obiect simplu din OOP — fără metode, doar date.

**Declarare și utilizare:**
\`\`\`c
#include <stdio.h>
#include <string.h>

/* Definire tip struct */
struct Student {
    char nume[50];
    int varsta;
    float medie;
};

int main(void) {
    /* Declarare variabilă struct */
    struct Student s1;

    /* Inițializare câmpuri */
    strcpy(s1.nume, "Cristi");
    s1.varsta = 22;
    s1.medie = 9.5f;

    /* Afișare */
    printf("Nume: %s, Varsta: %d, Medie: %.1f\\n",
           s1.nume, s1.varsta, s1.medie);

    /* Inițializare la declarare */
    struct Student s2 = {"Ana", 21, 8.7f};
    printf("Student 2: %s\\n", s2.nume);

    return 0;
}
\`\`\`

**typedef — alias pentru tip:**
\`\`\`c
/* Fără typedef — trebuie scris "struct Student" */
struct Student s;

/* Cu typedef — scrii direct "Student" */
typedef struct {
    char nume[50];
    int varsta;
    float medie;
} Student;

Student s = {"Maria", 20, 9.0f};
\`\`\`

**Array de structuri:**
\`\`\`c
Student clasa[30];
int n = 0;

/* Adaugă studenți */
strcpy(clasa[n].nume, "Ion");
clasa[n].varsta = 19;
clasa[n].medie = 7.5f;
n++;

/* Parcurgere */
for (int i = 0; i < n; i++) {
    printf("[%d] %s — %.1f\\n", i+1, clasa[i].nume, clasa[i].medie);
}
\`\`\`

**Structuri imbricate:**
\`\`\`c
typedef struct {
    int zi, luna, an;
} Data;

typedef struct {
    char titlu[100];
    char autor[50];
    float pret;
    Data data_publicare;
} Carte;

Carte c = {"C Programming", "K&R", 45.0f, {1, 1, 1978}};
printf("%s (%d)\\n", c.titlu, c.data_publicare.an);
\`\`\`

**Pasare structuri la funcții:**
\`\`\`c
/* Prin valoare — copie (costisitor pentru struct mari) */
void afiseaza(Student s) {
    printf("%s: %.1f\\n", s.nume, s.medie);
}

/* Prin pointer — eficient, poate modifica */
void creste_medie(Student *s, float delta) {
    s->medie += delta;  /* operatorul -> pentru pointer la struct */
}

Student st = {"Cristi", 22, 8.0f};
creste_medie(&st, 0.5f);
printf("Noua medie: %.1f\\n", st.medie);  /* 8.5 */
\`\`\``
  },
  {
    lesson: "11. Structuri și fișiere",
    title: "Citire/scriere fișiere",
    content: `**Fișierele** permit persistarea datelor dincolo de durata rulării programului. C oferă funcții \`fopen\`, \`fprintf\`, \`fscanf\`, \`fgets\` pentru lucrul cu fișiere text.

**Moduri de deschidere (fopen):**
| Mod | Efect |
|-----|-------|
| \`"r"\` | Read — fișierul trebuie să existe |
| \`"w"\` | Write — crează sau suprascrie |
| \`"a"\` | Append — adaugă la final |
| \`"r+"\` | Read+Write — fișierul trebuie să existe |
| \`"w+"\` | Read+Write — crează sau suprascrie |

**Scriere în fișier:**
\`\`\`c
#include <stdio.h>

int main(void) {
    FILE *f = fopen("date.txt", "w");
    if (f == NULL) {
        perror("Eroare la deschidere");
        return 1;
    }

    fprintf(f, "Linie 1\\n");
    fprintf(f, "Valoare: %d\\n", 42);
    fprintf(f, "Pi = %.4f\\n", 3.14159f);

    fclose(f);  /* OBLIGATORIU — flushează și eliberează */
    printf("Fisier scris!\\n");
    return 0;
}
\`\`\`

**Citire din fișier — linie cu linie:**
\`\`\`c
FILE *f = fopen("date.txt", "r");
if (!f) { perror("fopen"); return 1; }

char linie[256];
while (fgets(linie, sizeof(linie), f) != NULL) {
    /* Elimină \\n de la final */
    linie[strcspn(linie, "\\n")] = '\\0';
    printf("Citit: '%s'\\n", linie);
}

fclose(f);
\`\`\`

**Citire valori cu fscanf:**
\`\`\`c
FILE *f = fopen("numere.txt", "r");
int suma = 0, x;
while (fscanf(f, "%d", &x) == 1) {
    suma += x;
}
printf("Suma: %d\\n", suma);
fclose(f);
\`\`\`

**Append — adaugă la fișier existent:**
\`\`\`c
FILE *log = fopen("log.txt", "a");
if (log) {
    fprintf(log, "[%s] Eveniment: %s\\n", __TIME__, "start");
    fclose(log);
}
\`\`\`

**Verificarea sfârșitului fișierului:**
\`\`\`c
/* feof() — returnează true după primul eșec la citire */
while (!feof(f)) {
    int n;
    if (fscanf(f, "%d", &n) == 1) {
        printf("%d\\n", n);
    }
}
/* Mai bine: verifică valoarea de retur a fscanf/fgets */
\`\`\``
  },
  {
    lesson: "11. Structuri și fișiere",
    title: "Struct cu fișier",
    content: `Combinând structuri și fișiere poți implementa o **bază de date simplă** — citire/scriere de înregistrări structurate în fișiere text sau binare.

**Scriere structuri în fișier text:**
\`\`\`c
#include <stdio.h>
#include <string.h>

typedef struct {
    int id;
    char nume[50];
    float salariu;
} Angajat;

void salveaza_angajat(FILE *f, const Angajat *a) {
    fprintf(f, "%d|%s|%.2f\\n", a->id, a->nume, a->salariu);
}

int main(void) {
    Angajat angajati[] = {
        {1, "Ion Popescu", 5000.0f},
        {2, "Maria Ionescu", 6500.0f},
        {3, "Andrei Popa", 4800.0f}
    };

    FILE *f = fopen("angajati.txt", "w");
    if (!f) { perror("fopen"); return 1; }

    for (int i = 0; i < 3; i++) {
        salveaza_angajat(f, &angajati[i]);
    }
    fclose(f);
    printf("Salvati %d angajati\\n", 3);
    return 0;
}
\`\`\`

**Citire structuri din fișier text:**
\`\`\`c
int citeste_angajat(FILE *f, Angajat *a) {
    return fscanf(f, "%d|%49[^|]|%f\\n",
                  &a->id, a->nume, &a->salariu) == 3;
}

int main(void) {
    FILE *f = fopen("angajati.txt", "r");
    if (!f) { perror("fopen"); return 1; }

    Angajat a;
    printf("%-5s %-20s %10s\\n", "ID", "Nume", "Salariu");
    printf("%-5s %-20s %10s\\n", "---", "-------------------", "-------");
    while (citeste_angajat(f, &a)) {
        printf("%-5d %-20s %10.2f\\n", a.id, a.nume, a.salariu);
    }
    fclose(f);
    return 0;
}
\`\`\`

**Fișiere binare — fwrite/fread:**
\`\`\`c
/* Scriere binara — mai rapid, mai compact */
FILE *fb = fopen("angajati.bin", "wb");
Angajat a = {1, "Ion", 5000.0f};
fwrite(&a, sizeof(Angajat), 1, fb);  /* scrie 1 structura */
fclose(fb);

/* Citire binara */
FILE *fb2 = fopen("angajati.bin", "rb");
Angajat citit;
fread(&citit, sizeof(Angajat), 1, fb2);  /* citeste 1 structura */
printf("Citit: %d %s %.2f\\n", citit.id, citit.nume, citit.salariu);
fclose(fb2);
\`\`\`

**Cautare în fișier — fseek:**
\`\`\`c
FILE *f = fopen("angajati.bin", "r+b");
/* Sari la al n-lea angajat (0-indexed) */
int index = 1;
fseek(f, index * sizeof(Angajat), SEEK_SET);
Angajat a;
fread(&a, sizeof(Angajat), 1, f);
printf("Angajat %d: %s\\n", index, a.nume);
fclose(f);
\`\`\``
  },
  {
    lesson: "12. Funcții — pointeri la funcții",
    title: "Pointeri la funcții — sintaxă",
    content: `**Pointerii la funcții** stochează adresa unei funcții și permit apelarea ei indirect. Sunt esențiali pentru callback-uri, strategii, tabele de dispatch și funcții de ordonare.

**Sintaxă — declarare și apel:**
\`\`\`c
#include <stdio.h>

/* O funcție normală */
int aduna(int a, int b) { return a + b; }
int scade(int a, int b) { return a - b; }

int main(void) {
    /* Declarare pointer la funcție: tip_retur (*nume)(param1, param2) */
    int (*operatie)(int, int);

    /* Atribuire — cu sau fără & (ambele sunt corecte) */
    operatie = aduna;       /* sau: operatie = &aduna; */
    printf("%d\\n", operatie(5, 3));  /* 8 */

    operatie = scade;
    printf("%d\\n", operatie(5, 3));  /* 2 */

    return 0;
}
\`\`\`

**Pointer la funcție ca parametru (callback):**
\`\`\`c
void aplica(int *arr, int n, int (*transforma)(int)) {
    for (int i = 0; i < n; i++) {
        arr[i] = transforma(arr[i]);
    }
}

int dublu(int x)  { return x * 2; }
int patrat(int x) { return x * x; }
int absolut(int x){ return x < 0 ? -x : x; }

int main(void) {
    int arr[] = {1, 2, 3, 4, 5};
    aplica(arr, 5, dublu);   /* {2, 4, 6, 8, 10} */
    aplica(arr, 5, patrat);  /* {4, 16, 36, 64, 100} */

    int arr2[] = {-3, -1, 2, -4, 5};
    aplica(arr2, 5, absolut); /* {3, 1, 2, 4, 5} */
    return 0;
}
\`\`\`

**typedef — simplifică sintaxa:**
\`\`\`c
/* typedef tip_retur (*NumeTip)(parametri); */
typedef int (*OperatieFunc)(int, int);

OperatieFunc op = aduna;
printf("%d\\n", op(10, 5));  /* 15 */

/* Array de funcții */
OperatieFunc operatii[4] = {aduna, scade};
printf("%d\\n", operatii[0](10, 5));  /* 15 */
printf("%d\\n", operatii[1](10, 5));  /* 5 */
\`\`\`

**Pointer la funcție void:**
\`\`\`c
typedef void (*Handler)(const char *);

void handler_info(const char *msg)  { printf("[INFO] %s\\n", msg); }
void handler_error(const char *msg) { fprintf(stderr, "[ERR] %s\\n", msg); }

Handler log_handler = handler_info;
log_handler("Server pornit");   /* [INFO] Server pornit */

log_handler = handler_error;
log_handler("Conexiune pierduta");  /* [ERR] Conexiune pierduta */
\`\`\``
  },
  {
    lesson: "12. Funcții — pointeri la funcții",
    title: "Array de pointeri la funcții — meniu",
    content: `Un **array de pointeri la funcții** este un pattern clasic în C pentru implementarea meniurilor, sistemelor de comandă și dispatch tables — alternativă elegantă la un lung \`switch\`.

**Pattern meniu cu array de funcții:**
\`\`\`c
#include <stdio.h>

void adauga(void)   { printf("Adaugare element\\n"); }
void sterge(void)   { printf("Stergere element\\n"); }
void afiseaza(void) { printf("Afisare lista\\n"); }
void cauta(void)    { printf("Cautare element\\n"); }
void quit(void)     { printf("La revedere!\\n"); }

typedef void (*Comanda)(void);

Comanda meniu[] = {
    quit,       /* 0 */
    adauga,     /* 1 */
    sterge,     /* 2 */
    afiseaza,   /* 3 */
    cauta       /* 4 */
};

const char *etichete[] = {
    "0. Iesire",
    "1. Adauga",
    "2. Sterge",
    "3. Afiseaza",
    "4. Cauta"
};

int N_OPTIUNI = sizeof(meniu) / sizeof(meniu[0]);

int main(void) {
    int optiune;
    do {
        printf("\\n=== MENIU ===\\n");
        for (int i = 0; i < N_OPTIUNI; i++)
            printf("%s\\n", etichete[i]);
        printf("Optiunea: ");
        scanf("%d", &optiune);

        if (optiune >= 0 && optiune < N_OPTIUNI) {
            meniu[optiune]();  /* apel indirect */
        } else {
            printf("Optiune invalida!\\n");
        }
    } while (optiune != 0);

    return 0;
}
\`\`\`

**Dispatch table cu argument — calculator:**
\`\`\`c
typedef double (*OperatieFunc)(double, double);

double op_add(double a, double b) { return a + b; }
double op_sub(double a, double b) { return a - b; }
double op_mul(double a, double b) { return a * b; }
double op_div(double a, double b) { return b != 0 ? a/b : 0; }

typedef struct { char simbol; OperatieFunc func; } Operator;

Operator operatori[] = {
    {'+', op_add},
    {'-', op_sub},
    {'*', op_mul},
    {'/', op_div}
};

int main(void) {
    double a = 10.0, b = 3.0;
    int n = sizeof(operatori) / sizeof(operatori[0]);

    for (int i = 0; i < n; i++) {
        printf("%.1f %c %.1f = %.4f\\n",
               a, operatori[i].simbol, b,
               operatori[i].func(a, b));
    }
    /* 10.0 + 3.0 = 13.0000
       10.0 - 3.0 = 7.0000
       10.0 * 3.0 = 30.0000
       10.0 / 3.0 = 3.3333 */
    return 0;
}
\`\`\``
  },
  {
    lesson: "12. Funcții — pointeri la funcții",
    title: "qsort — funcție de comparare ca parametru",
    content: `**\`qsort\`** din \`<stdlib.h>\` este funcția standard de sortare din C. Acceptă o **funcție de comparare** ca pointer — un exemplu perfect de callback în practică.

**Prototipul qsort:**
\`\`\`c
void qsort(void *base,    /* pointer la primul element */
           size_t nmemb,  /* numărul de elemente */
           size_t size,   /* dimensiunea unui element */
           int (*compar)(const void *, const void *));
\`\`\`

**Funcțiile de comparare — regula:**
• Returnează **< 0** dacă a trebuie înainte de b
• Returnează **0** dacă sunt egale
• Returnează **> 0** dacă a trebuie după b

**Sortare int-uri:**
\`\`\`c
#include <stdio.h>
#include <stdlib.h>

int cmp_int_asc(const void *a, const void *b) {
    return *(int*)a - *(int*)b;   /* ascendent */
}

int cmp_int_desc(const void *a, const void *b) {
    return *(int*)b - *(int*)a;   /* descendent */
}

int main(void) {
    int arr[] = {64, 25, 12, 22, 11};
    int n = 5;

    qsort(arr, n, sizeof(int), cmp_int_asc);
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\\n");  /* 11 12 22 25 64 */

    qsort(arr, n, sizeof(int), cmp_int_desc);
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\\n");  /* 64 25 22 12 11 */
    return 0;
}
\`\`\`

**Sortare struct-uri:**
\`\`\`c
typedef struct { char nume[50]; int nota; } Student;

int cmp_nota(const void *a, const void *b) {
    const Student *sa = (const Student*)a;
    const Student *sb = (const Student*)b;
    return sb->nota - sa->nota;  /* descendent după notă */
}

int cmp_nume(const void *a, const void *b) {
    const Student *sa = (const Student*)a;
    const Student *sb = (const Student*)b;
    return strcmp(sa->nume, sb->nume);  /* alfabetic */
}

Student clasa[] = {{"Ion", 8}, {"Ana", 9}, {"Barbu", 7}};
qsort(clasa, 3, sizeof(Student), cmp_nota);
/* Ana(9), Ion(8), Barbu(7) */
\`\`\`

**Sortare string-uri:**
\`\`\`c
int cmp_str(const void *a, const void *b) {
    return strcmp(*(const char**)a, *(const char**)b);
}

const char *cuvinte[] = {"zero", "unu", "doi", "trei"};
qsort(cuvinte, 4, sizeof(char*), cmp_str);
/* doi, trei, unu, zero */
\`\`\``
  },
  {
    lesson: "12. Funcții — pointeri la funcții",
    title: "typedef pentru pointer la funcție",
    content: `**\`typedef\`** pentru pointeri la funcții simplifică dramatic sintaxa complexă și face codul mai lizibil. Este un best practice standard în C.

**Problema — sintaxă grea fără typedef:**
\`\`\`c
/* Greu de citit — ce face această declarație? */
int (*)(const char *, int) parser;
void (*callback_arr[10])(int, int, const char *);
int (*(*matrix_of_funcs)[5])(double);  /* array de pointeri de funcții... */
\`\`\`

**Soluția — typedef:**
\`\`\`c
/* typedef tip_retur (*NumeTip)(parametri); */
typedef int  (*Parser)(const char *, int);
typedef void (*Callback)(int, int, const char *);
typedef int  (*Comparator)(const void *, const void *);

/* Acum declarațiile sunt clare */
Parser p;
Callback callbacks[10];
Comparator cmp = strcmp;  /* nu potrivire exactă, dar concept */
\`\`\`

**Exemplu complet — sistem de plugin-uri:**
\`\`\`c
#include <stdio.h>
#include <string.h>

/* Tipuri clare */
typedef int  (*CommandFunc)(const char *args);
typedef void (*InitFunc)(void);
typedef void (*CleanupFunc)(void);

/* Struct pentru un plugin */
typedef struct {
    const char *name;
    InitFunc    init;
    CommandFunc execute;
    CleanupFunc cleanup;
} Plugin;

/* Implementări */
void init_logger(void) { printf("[Logger] Init\\n"); }
int  exec_logger(const char *args) {
    printf("[LOG] %s\\n", args);
    return 0;
}
void cleanup_logger(void) { printf("[Logger] Cleanup\\n"); }

/* Înregistrare plugin */
Plugin plugins[] = {
    {"logger", init_logger, exec_logger, cleanup_logger},
};

int main(void) {
    int n = sizeof(plugins) / sizeof(plugins[0]);

    for (int i = 0; i < n; i++) {
        plugins[i].init();
        plugins[i].execute("Server a pornit");
        plugins[i].cleanup();
    }
    return 0;
}
\`\`\`

**Funcție care returnează pointer la funcție:**
\`\`\`c
typedef int (*OpFunc)(int, int);

int add(int a, int b) { return a + b; }
int mul(int a, int b) { return a * b; }

/* Funcție care returnează pointer la funcție */
OpFunc alege_operatie(char op) {
    if (op == '+') return add;
    if (op == '*') return mul;
    return NULL;
}

OpFunc op = alege_operatie('+');
if (op) printf("%d\\n", op(3, 4));  /* 7 */
\`\`\``
  },
  {
    lesson: "13. Structuri avansate — nested, typedef",
    title: "Structuri imbricate (nested structs)",
    content: `**Structurile imbricate** permit organizarea ierarhică a datelor — o structură conține alte structuri ca membri. Reflect relații din lumea reală: o persoană are o adresă, o mașină are un motor.

**Definire și accesare:**
\`\`\`c
#include <stdio.h>
#include <string.h>

typedef struct {
    int zi, luna, an;
} Data;

typedef struct {
    char strada[100];
    char oras[50];
    char cod_postal[10];
} Adresa;

typedef struct {
    char nume[50];
    int varsta;
    Data data_nasterii;  /* struct imbricat */
    Adresa adresa;       /* alt struct imbricat */
} Persoana;

int main(void) {
    Persoana p;
    strcpy(p.nume, "Ion Popescu");
    p.varsta = 30;

    /* Acces la câmpuri imbricate */
    p.data_nasterii.zi   = 15;
    p.data_nasterii.luna = 6;
    p.data_nasterii.an   = 1994;

    strcpy(p.adresa.strada, "Str. Florilor 10");
    strcpy(p.adresa.oras, "Cluj-Napoca");
    strcpy(p.adresa.cod_postal, "400000");

    /* Afișare */
    printf("Persoana: %s\\n", p.nume);
    printf("Nascut: %02d/%02d/%d\\n",
           p.data_nasterii.zi,
           p.data_nasterii.luna,
           p.data_nasterii.an);
    printf("Adresa: %s, %s %s\\n",
           p.adresa.strada,
           p.adresa.cod_postal,
           p.adresa.oras);
    return 0;
}
\`\`\`

**Inițializare cu designated initializers (C99):**
\`\`\`c
Persoana p = {
    .nume = "Maria",
    .varsta = 25,
    .data_nasterii = {.zi=10, .luna=3, .an=1999},
    .adresa = {
        .strada = "Bd. Unirii 5",
        .oras = "Bucuresti",
        .cod_postal = "010101"
    }
};
\`\`\`

**Struct cu câmpuri de tip struct propriu (forward declaration):**
\`\`\`c
typedef struct Nod {
    int val;
    struct Nod *urmator;  /* pointer la același tip — OK */
} Nod;

Nod n1 = {10, NULL};
Nod n2 = {20, NULL};
n1.urmator = &n2;

printf("%d → %d\\n", n1.val, n1.urmator->val);  /* 10 → 20 */
\`\`\``
  },
  {
    lesson: "13. Structuri avansate — nested, typedef",
    title: "Pointer la structuri — operatorul ->",
    content: `Când lucrezi cu **pointeri la structuri**, accesezi câmpurile cu operatorul **\`->\`** (săgeată) în loc de \`.\`. Este o prescurtare pentru \`(*ptr).camp\`.

**\`.\` vs \`->\`:**
\`\`\`c
typedef struct { char nume[50]; int varsta; } Student;

Student s = {"Ion", 20};
Student *p = &s;

/* Accesare prin valoare — operatorul . */
printf("%s\\n", s.nume);     /* Ion */

/* Accesare prin pointer — operatorul -> */
printf("%s\\n", p->nume);    /* Ion */

/* Echivalent — mai lung, mai rar folosit */
printf("%s\\n", (*p).nume);  /* Ion */

/* Modificare prin pointer */
p->varsta = 21;
printf("%d\\n", s.varsta);   /* 21 — originalul s-a schimbat */
\`\`\`

**Funcții cu pointer la struct — pattern standard:**
\`\`\`c
#include <string.h>
#include <stdio.h>

typedef struct {
    char titlu[100];
    char autor[50];
    int an;
    float pret;
} Carte;

void init_carte(Carte *c, const char *titlu, const char *autor,
                int an, float pret) {
    strncpy(c->titlu, titlu, 99);
    strncpy(c->autor, autor, 49);
    c->an   = an;
    c->pret = pret;
}

void afiseaza_carte(const Carte *c) {
    printf("\\"%s\\" de %s (%d) — %.2f RON\\n",
           c->titlu, c->autor, c->an, c->pret);
}

void aplica_reducere(Carte *c, float procent) {
    c->pret *= (1.0f - procent / 100.0f);
}

int main(void) {
    Carte c;
    init_carte(&c, "C Programming Language", "Kernighan & Ritchie", 1988, 80.0f);
    afiseaza_carte(&c);
    aplica_reducere(&c, 20.0f);
    printf("Dupa reducere: %.2f RON\\n", c.pret);
    return 0;
}
\`\`\`

**Array dinamic de structuri cu alocare:**
\`\`\`c
int n = 5;
Carte *carti = (Carte*)malloc(n * sizeof(Carte));
if (!carti) exit(1);

for (int i = 0; i < n; i++) {
    printf("Titlu[%d]: ", i);
    fgets(carti[i].titlu, 100, stdin);
    carti[i].titlu[strcspn(carti[i].titlu, "\\n")] = '\\0';
}

/* Pointer arithmetic sau index — ambele OK */
(carti + 2)->pret = 50.0f;  /* echivalent cu carti[2].pret */

free(carti);
\`\`\``
  },
  {
    lesson: "13. Structuri avansate — nested, typedef",
    title: "Structuri auto-referențiale (linked list preview)",
    content: `**Structurile auto-referențiale** conțin un pointer la **propriul lor tip** — fundament al structurilor dinamice: liste înlănțuite, arbori, grafuri.

**De ce nu poți include o structură în sine?**
\`\`\`c
/* IMPOSIBIL — structura infinit de mare */
typedef struct Nod {
    int val;
    struct Nod urmator;  /* EROARE: dimensiune infinită */
} Nod;

/* POSIBIL — pointer la același tip (dimensiune fixă: 8 bytes) */
typedef struct Nod {
    int val;
    struct Nod *urmator;   /* pointer — mereu 8 bytes pe 64-bit */
} Nod;
\`\`\`

**Creare și traversare — linked list simplu:**
\`\`\`c
#include <stdio.h>
#include <stdlib.h>

typedef struct Nod {
    int val;
    struct Nod *next;
} Nod;

Nod* creeaza_nod(int val) {
    Nod *n = (Nod*)malloc(sizeof(Nod));
    if (!n) exit(1);
    n->val  = val;
    n->next = NULL;
    return n;
}

void afiseaza_lista(const Nod *cap) {
    while (cap != NULL) {
        printf("%d", cap->val);
        if (cap->next) printf(" -> ");
        cap = cap->next;
    }
    printf(" -> NULL\\n");
}

void elibereaza_lista(Nod *cap) {
    while (cap != NULL) {
        Nod *urmator = cap->next;
        free(cap);
        cap = urmator;
    }
}

int main(void) {
    /* Creare manuală: 1 -> 2 -> 3 -> NULL */
    Nod *cap = creeaza_nod(1);
    cap->next = creeaza_nod(2);
    cap->next->next = creeaza_nod(3);

    afiseaza_lista(cap);  /* 1 -> 2 -> 3 -> NULL */

    elibereaza_lista(cap);
    return 0;
}
\`\`\`

**Inserare la începutul listei:**
\`\`\`c
Nod* push_front(Nod *cap, int val) {
    Nod *nou = creeaza_nod(val);
    nou->next = cap;  /* noul nod arată spre fostul cap */
    return nou;       /* noul cap al listei */
}

cap = push_front(cap, 0);  /* 0 -> 1 -> 2 -> 3 -> NULL */
cap = push_front(cap, -1); /* -1 -> 0 -> 1 -> 2 -> 3 -> NULL */
\`\`\`

**Structuri pentru arbori binari:**
\`\`\`c
typedef struct Arbore {
    int val;
    struct Arbore *stang;  /* copil stâng */
    struct Arbore *drept;  /* copil drept */
} Arbore;
\`\`\``
  },
  {
    lesson: "14. Fișiere — File I/O",
    title: "Deschidere și închidere fișiere",
    content: `**File I/O** în C se face prin tipul **\`FILE*\`** (un pointer opac la un descriptor de fișier). Funcțiile \`fopen\`, \`fclose\` gestionează deschiderea și închiderea, cu verificare obligatorie de erori.

**\`fopen\` — deschide un fișier:**
\`\`\`c
#include <stdio.h>
#include <errno.h>   /* pentru errno */

int main(void) {
    FILE *f = fopen("test.txt", "w");

    /* Verificare OBLIGATORIE */
    if (f == NULL) {
        perror("Eroare la deschidere");  /* afișează mesaj sistem */
        return 1;
    }

    fprintf(f, "Continut\\n");

    /* fclose — OBLIGATORIU */
    if (fclose(f) != 0) {
        perror("Eroare la inchidere");
        return 1;
    }

    return 0;
}
\`\`\`

**Moduri fopen — tabel complet:**
| Mod | Text | Binar | Creare | Trunchiere | Append |
|-----|------|-------|--------|------------|--------|
| \`"r"\` | ✓ | | nu | nu | nu |
| \`"w"\` | ✓ | | ✓ | ✓ | nu |
| \`"a"\` | ✓ | | ✓ | nu | ✓ |
| \`"r+"\` | ✓ | | nu | nu | nu |
| \`"w+"\` | ✓ | | ✓ | ✓ | nu |
| \`"a+"\` | ✓ | | ✓ | nu | ✓ |
| \`"rb"\` | | ✓ | nu | nu | nu |
| \`"wb"\` | | ✓ | ✓ | ✓ | nu |

**Diferența text vs binar:**
\`\`\`c
/* TEXT — \\n convertit automat (\r\n pe Windows) */
FILE *txt = fopen("file.txt", "r");

/* BINAR — bytes exacți, fără conversie */
FILE *bin = fopen("file.bin", "rb");
\`\`\`

**Pattern cu goto pentru cleanup (C idiom):**
\`\`\`c
int procesa_fisier(const char *path) {
    FILE *f = fopen(path, "r");
    if (!f) { perror("fopen"); return -1; }

    char *buf = malloc(1024);
    if (!buf) { fclose(f); return -1; }

    /* procesare... */
    int rez = 0;
    /* ... */

    free(buf);
    fclose(f);
    return rez;
}
\`\`\`

**tmpfile() — fișier temporar:**
\`\`\`c
FILE *tmp = tmpfile();  /* creat automat, șters la fclose */
if (!tmp) { perror("tmpfile"); exit(1); }
fprintf(tmp, "Date temporare\\n");
rewind(tmp);   /* întoarce la început */
char line[100];
fgets(line, 100, tmp);
printf("Citit: %s", line);
fclose(tmp);  /* fișierul e șters automat */
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
