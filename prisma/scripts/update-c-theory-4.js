"use strict";
require("dotenv").config({ path: ".env" });
const { PrismaClient } = require("@prisma/client");
const p = new PrismaClient();
const UPDATES = [
  {
    lesson: "14. Fișiere — File I/O",
    title: "Citire din fișier",
    content: `**Citirea din fișiere** în C se face cu \`fgets\` (linii text), \`fscanf\` (valori formatate) sau \`fread\` (date binare). Fiecare are cazul său de utilizare optim.

**\`fgets\` — citire linie cu linie:**
\`\`\`c
#include <stdio.h>
#include <string.h>

int main(void) {
    FILE *f = fopen("date.txt", "r");
    if (!f) { perror("fopen"); return 1; }

    char linie[1024];
    int nr_linie = 0;
    while (fgets(linie, sizeof(linie), f) != NULL) {
        nr_linie++;
        /* Elimină \\n de la final dacă există */
        linie[strcspn(linie, "\\n")] = '\\0';
        printf("[%3d] %s\\n", nr_linie, linie);
    }
    printf("Total: %d linii\\n", nr_linie);

    fclose(f);
    return 0;
}
\`\`\`

**\`fscanf\` — citire după format:**
\`\`\`c
/* Fișier "angajati.txt":
   1 Ion 5000
   2 Maria 6500
   3 Andrei 4800 */

typedef struct { int id; char nume[50]; float salariu; } Angajat;

FILE *f = fopen("angajati.txt", "r");
Angajat a;
float total = 0;

while (fscanf(f, "%d %49s %f", &a.id, a.nume, &a.salariu) == 3) {
    printf("[%d] %-15s %.2f RON\\n", a.id, a.nume, a.salariu);
    total += a.salariu;
}
printf("Total salarii: %.2f\\n", total);
fclose(f);
\`\`\`

**Citire caracter cu caracter — \`fgetc\`:**
\`\`\`c
FILE *f = fopen("text.txt", "r");
int c, litere = 0, cifre = 0, spatii = 0;

while ((c = fgetc(f)) != EOF) {
    if (isalpha(c)) litere++;
    else if (isdigit(c)) cifre++;
    else if (isspace(c)) spatii++;
}
printf("Litere: %d, Cifre: %d, Spatii: %d\\n", litere, cifre, spatii);
fclose(f);
\`\`\`

**Citire fișier întreg în buffer:**
\`\`\`c
FILE *f = fopen("fisier.txt", "r");

/* Determină dimensiunea */
fseek(f, 0, SEEK_END);
long size = ftell(f);
rewind(f);  /* sau fseek(f, 0, SEEK_SET) */

/* Alocă buffer */
char *continut = malloc(size + 1);
if (!continut) { fclose(f); return 1; }

fread(continut, 1, size, f);
continut[size] = '\\0';  /* terminator null */

printf("Continut:\\n%s\\n", continut);
free(continut);
fclose(f);
\`\`\``
  },
  {
    lesson: "14. Fișiere — File I/O",
    title: "Fișiere binare — fread/fwrite",
    content: `**Fișierele binare** stochează date ca bytes bruti, fără conversie text. Sunt mai rapide și mai compacte pentru date structurate, dar nu sunt human-readable.

**\`fwrite\` — scriere binară:**
\`\`\`c
#include <stdio.h>
#include <stdlib.h>

typedef struct {
    int id;
    char nume[50];
    float salariu;
    int activ;
} Angajat;

int main(void) {
    Angajat angajati[] = {
        {1, "Ion Popescu",   5000.0f, 1},
        {2, "Maria Ionescu", 6500.0f, 1},
        {3, "Andrei Popa",   4800.0f, 0}
    };
    int n = 3;

    FILE *f = fopen("angajati.bin", "wb");
    if (!f) { perror("fopen"); return 1; }

    /* Scrie dimensiunea + datele */
    fwrite(&n, sizeof(int), 1, f);           /* numărul de înregistrări */
    fwrite(angajati, sizeof(Angajat), n, f); /* toate înregistrările */

    fclose(f);
    printf("Salvati %d angajati\\n", n);
    return 0;
}
\`\`\`

**\`fread\` — citire binară:**
\`\`\`c
FILE *f = fopen("angajati.bin", "rb");
if (!f) { perror("fopen"); return 1; }

int n;
fread(&n, sizeof(int), 1, f);  /* citește numărul de înregistrări */

Angajat *arr = malloc(n * sizeof(Angajat));
if (!arr) { fclose(f); exit(1); }

size_t cititi = fread(arr, sizeof(Angajat), n, f);
printf("Cititi %zu din %d\\n", cititi, n);

for (int i = 0; i < (int)cititi; i++) {
    printf("[%d] %-20s %.2f RON %s\\n",
           arr[i].id, arr[i].nume, arr[i].salariu,
           arr[i].activ ? "ACTIV" : "INACTIV");
}

free(arr);
fclose(f);
\`\`\`

**Actualizare o singură înregistrare:**
\`\`\`c
FILE *f = fopen("angajati.bin", "r+b");

/* Sari peste header (dimensiunea) */
fseek(f, sizeof(int), SEEK_SET);

/* Sari la înregistrarea cu index 1 (0-indexed) */
fseek(f, 1 * sizeof(Angajat), SEEK_CUR);

/* Citește și modifică */
Angajat a;
fread(&a, sizeof(Angajat), 1, f);
a.salariu *= 1.1f;  /* mărire 10% */

/* Întoarce-te și suprascrie */
fseek(f, -(long)sizeof(Angajat), SEEK_CUR);
fwrite(&a, sizeof(Angajat), 1, f);
fclose(f);
\`\`\`

**Text vs Binar — comparație:**
• Text: lizibil, portabil, conversii automate (\\n), mai mare
• Binar: compact, rapid, exact, non-portabil (endianness, padding)`
  },
  {
    lesson: "14. Fișiere — File I/O",
    title: "fseek, ftell — poziționare",
    content: `**\`fseek\`** și **\`ftell\`** permit **accesul aleator** la fișiere — sari la orice poziție fără să citești tot ce e înainte. Esențiale pentru fișiere binare cu înregistrări fixe.

**\`fseek(file, offset, origin)\`:**
\`\`\`c
#include <stdio.h>

FILE *f = fopen("test.bin", "rb");

/* SEEK_SET — față de ÎNCEPUTUL fișierului */
fseek(f, 0, SEEK_SET);     /* la început */
fseek(f, 100, SEEK_SET);   /* la byte 100 */

/* SEEK_CUR — față de POZIȚIA CURENTĂ */
fseek(f, 50, SEEK_CUR);    /* +50 bytes înainte */
fseek(f, -20, SEEK_CUR);   /* -20 bytes înapoi */

/* SEEK_END — față de SFÂRȘITUL fișierului */
fseek(f, 0, SEEK_END);     /* la sfârșit */
fseek(f, -10, SEEK_END);   /* ultimii 10 bytes */
\`\`\`

**\`ftell\` — obține poziția curentă:**
\`\`\`c
/* Determina dimensiunea unui fișier */
FILE *f = fopen("fisier.dat", "rb");

fseek(f, 0, SEEK_END);
long dimensiune = ftell(f);  /* poziția la final = dimensiunea */
printf("Dimensiune: %ld bytes\\n", dimensiune);

rewind(f);   /* echivalent cu fseek(f, 0, SEEK_SET) */
\`\`\`

**Acces aleator la înregistrări — pattern standard:**
\`\`\`c
typedef struct { int id; char date[100]; } Inregistrare;

/* Citește înregistrarea cu indexul dat */
int citeste_inreg(FILE *f, int index, Inregistrare *out) {
    long offset = sizeof(int) + (long)index * sizeof(Inregistrare);
    if (fseek(f, offset, SEEK_SET) != 0) return -1;
    return fread(out, sizeof(Inregistrare), 1, f) == 1 ? 0 : -1;
}

/* Actualizează înregistrarea cu indexul dat */
int actualizeaza_inreg(FILE *f, int index, const Inregistrare *src) {
    long offset = sizeof(int) + (long)index * sizeof(Inregistrare);
    if (fseek(f, offset, SEEK_SET) != 0) return -1;
    return fwrite(src, sizeof(Inregistrare), 1, f) == 1 ? 0 : -1;
}
\`\`\`

**\`fgetpos\`/\`fsetpos\` — alternativa portabilă:**
\`\`\`c
fpos_t poz;
fgetpos(f, &poz);   /* salvează poziția */
/* ... citiri/scrieri ... */
fsetpos(f, &poz);   /* restaurează poziția */
\`\`\`

**Erori frecvente cu fseek:**
• \`fseek\` pe fișiere text + SEEK_CUR cu offset != 0 — comportament implementation-defined
• Verifică mereu valoarea returnată de fseek (0 = succes, -1 = eroare)
• \`ftell\` returnează \`-1L\` la eroare — verifică cu \`errno\``
  },
  {
    lesson: "15. Liste înlănțuite (Linked Lists)",
    title: "Structura unui nod",
    content: `**Lista înlănțuită (Linked List)** este o structură de date în care fiecare element (**nod**) conține datele și un **pointer la nodul următor**. Spre deosebire de array-uri, inserarea și ștergerea sunt O(1) la capete.

**Structura unui nod:**
\`\`\`c
#include <stdio.h>
#include <stdlib.h>

/* Nod simplu — lista înlănțuită simplu */
typedef struct Nod {
    int val;            /* datele */
    struct Nod *next;   /* pointer la nodul următor */
} Nod;

/* Nod dublu — lista dublu înlănțuită */
typedef struct NodD {
    int val;
    struct NodD *prev;  /* pointer la nodul anterior */
    struct NodD *next;  /* pointer la nodul următor */
} NodD;
\`\`\`

**Creare nod nou:**
\`\`\`c
Nod* creeaza_nod(int val) {
    Nod *n = (Nod*)malloc(sizeof(Nod));
    if (n == NULL) {
        fprintf(stderr, "Alocare esuat!\\n");
        exit(EXIT_FAILURE);
    }
    n->val  = val;
    n->next = NULL;   /* IMPORTANT — setează NULL explicit */
    return n;
}
\`\`\`

**Creare și legare manuală:**
\`\`\`c
int main(void) {
    /* Creare: 1 -> 2 -> 3 -> NULL */
    Nod *cap = creeaza_nod(1);
    cap->next = creeaza_nod(2);
    cap->next->next = creeaza_nod(3);

    /* Traversare */
    Nod *curent = cap;
    while (curent != NULL) {
        printf("%d ", curent->val);
        curent = curent->next;
    }
    printf("\\n");  /* 1 2 3 */

    /* Eliberare memorie */
    curent = cap;
    while (curent != NULL) {
        Nod *urmator = curent->next;  /* salvează next ÎNAINTE de free */
        free(curent);
        curent = urmator;
    }
    return 0;
}
\`\`\`

**Vizualizare memorie — linked list:**
\`\`\`
cap → [1 | *]──→ [2 | *]──→ [3 | NULL]
      addr:100    addr:200    addr:300

Nod 1: val=1, next=0x200
Nod 2: val=2, next=0x300
Nod 3: val=3, next=NULL
\`\`\`

**Operații de bază — complexitate:**
| Operație | Array | Linked List |
|---------|-------|-------------|
| Acces la index i | O(1) | O(n) |
| Inserare la capăt | O(1)* | O(n) sau O(1) cu tail |
| Inserare la început | O(n) | O(1) |
| Ștergere la început | O(n) | O(1) |
| Căutare | O(n) | O(n) |`
  },
  {
    lesson: "15. Liste înlănțuite (Linked Lists)",
    title: "Inserare la început și la final",
    content: `**Inserarea** în lista înlănțuită este operația cheie — O(1) la început, O(n) sau O(1) la final dacă menții un pointer \`tail\`.

**Inserare la ÎNCEPUTUL listei — O(1):**
\`\`\`c
typedef struct Nod { int val; struct Nod *next; } Nod;

Nod* creeaza_nod(int val) {
    Nod *n = malloc(sizeof(Nod));
    if (!n) exit(1);
    n->val = val; n->next = NULL;
    return n;
}

/* Returnează noul cap */
Nod* push_front(Nod *cap, int val) {
    Nod *nou = creeaza_nod(val);
    nou->next = cap;  /* noul nod → fostul cap */
    return nou;       /* noul cap = nou */
}

int main(void) {
    Nod *cap = NULL;
    cap = push_front(cap, 30);  /* 30 */
    cap = push_front(cap, 20);  /* 20 -> 30 */
    cap = push_front(cap, 10);  /* 10 -> 20 -> 30 */
    /* traversare... */
    return 0;
}
\`\`\`

**Inserare la FINALUL listei — O(n):**
\`\`\`c
void push_back(Nod **cap, int val) {
    Nod *nou = creeaza_nod(val);
    if (*cap == NULL) {
        *cap = nou;  /* lista era goală */
        return;
    }
    /* Ajunge la ultimul nod */
    Nod *curent = *cap;
    while (curent->next != NULL) {
        curent = curent->next;
    }
    curent->next = nou;  /* ultimul nod → nou */
}

/* Utilizare */
Nod *lista = NULL;
push_back(&lista, 1);  /* [1] */
push_back(&lista, 2);  /* [1, 2] */
push_back(&lista, 3);  /* [1, 2, 3] */
\`\`\`

**Inserare DUPĂ un nod dat — O(1) dacă ai pointer:**
\`\`\`c
void insereaza_dupa(Nod *prev, int val) {
    if (prev == NULL) return;
    Nod *nou = creeaza_nod(val);
    nou->next  = prev->next;  /* nou → ce era după prev */
    prev->next = nou;         /* prev → nou */
}

/* Inserează 15 după nodul cu val=10 */
Nod *gasit = cap;
while (gasit && gasit->val != 10) gasit = gasit->next;
if (gasit) insereaza_dupa(gasit, 15);
\`\`\`

**Inserare LA POZIȚIE (index):**
\`\`\`c
Nod* insereaza_la(Nod *cap, int index, int val) {
    if (index == 0) return push_front(cap, val);
    Nod *curent = cap;
    for (int i = 0; i < index - 1 && curent; i++)
        curent = curent->next;
    if (!curent) return cap;  /* index out of bounds */
    insereaza_dupa(curent, val);
    return cap;
}
\`\`\``
  },
  {
    lesson: "15. Liste înlănțuite (Linked Lists)",
    title: "Ștergere nod",
    content: `**Ștergerea** unui nod din lista înlănțuită necesită actualizarea pointerului nodului anterior. Cazul special — ștergerea capului — trebuie tratat separat.

**Ștergere de la ÎNCEPUT — O(1):**
\`\`\`c
Nod* pop_front(Nod *cap) {
    if (cap == NULL) return NULL;  /* lista goală */
    Nod *nou_cap = cap->next;
    free(cap);       /* eliberează nodul eliminat */
    return nou_cap;  /* noul cap */
}

cap = pop_front(cap);  /* șterge primul element */
\`\`\`

**Ștergere după VALOARE — O(n):**
\`\`\`c
Nod* sterge_valoare(Nod *cap, int val) {
    /* Caz special: capul listei */
    if (cap == NULL) return NULL;
    if (cap->val == val) {
        Nod *nou_cap = cap->next;
        free(cap);
        return nou_cap;
    }

    /* Caută nodul anterior */
    Nod *curent = cap;
    while (curent->next != NULL && curent->next->val != val) {
        curent = curent->next;
    }

    if (curent->next == NULL) return cap;  /* val nu există */

    Nod *de_sters = curent->next;
    curent->next = de_sters->next;  /* "sari" peste nodul de șters */
    free(de_sters);
    return cap;
}
\`\`\`

**Ștergere după POZIȚIE (index) — O(n):**
\`\`\`c
Nod* sterge_la(Nod *cap, int index) {
    if (!cap || index < 0) return cap;
    if (index == 0) return pop_front(cap);

    Nod *prev = cap;
    for (int i = 0; i < index - 1 && prev->next; i++)
        prev = prev->next;

    if (!prev->next) return cap;  /* index out of bounds */

    Nod *de_sters = prev->next;
    prev->next = de_sters->next;
    free(de_sters);
    return cap;
}
\`\`\`

**Ștergerea ÎNTREGII liste:**
\`\`\`c
void sterge_lista(Nod *cap) {
    Nod *curent = cap;
    while (curent != NULL) {
        Nod *urmator = curent->next;
        free(curent);
        curent = urmator;
    }
    /* cap e invalid acum — apelantul setează cap = NULL */
}

sterge_lista(cap);
cap = NULL;  /* IMPORTANT */
\`\`\`

**Greșeală clasică — use after free:**
\`\`\`c
/* GREȘIT */
free(nod);
nod->next = NULL;  /* USE AFTER FREE — UB */

/* CORECT */
Nod *temp = nod->next;
free(nod);
nod = temp;  /* sau = NULL */
\`\`\``
  },
  {
    lesson: "15. Liste înlănțuite (Linked Lists)",
    title: "Avantaje și dezavantaje vs array",
    content: `Alegerea între **linked list** și **array** depinde de operațiile dominante ale problemei. Nu există o soluție universal mai bună — fiecare excelează în scenarii diferite.

**Comparație complexitate:**
| Operație | Array | Linked List (simplu) |
|---------|-------|---------------------|
| Acces index i | **O(1)** | O(n) |
| Căutare liniară | O(n) | O(n) |
| Inserare la capăt | **O(1)*** | O(n) sau O(1) cu tail |
| Inserare la început | O(n) | **O(1)** |
| Ștergere la început | O(n) | **O(1)** |
| Inserare în mijloc | O(n) | O(n) find + **O(1)** insert |

\`*\` Amortized O(1) pentru array dinamic (realloc)

**Avantaje Linked List:**
• **Inserare/ștergere O(1)** la capete — ideal pentru stive, cozi, deque
• **Dimensiune dinamică** — crește/scade exact cu 1 nod la fiecare operație
• **Nu necesită memorie contiguă** — fragmentarea heap nu e problemă
• **Inserare eficientă** dacă ai deja pointer la locație

**Dezavantaje Linked List:**
• **Overhead de memorie** — fiecare nod are extra pointer (8 bytes pe 64-bit)
• **Cache unfriendly** — nodurile pot fi răspândite în memorie → cache misses
• **Nu are acces aleator** — trebuie traversat de la cap
• **Overhead de alocare** — fiecare nod = apel malloc

**Linked List real — comparație cod:**
\`\`\`c
/* Array — inserare la început: O(n) */
memmove(arr+1, arr, n * sizeof(int));
arr[0] = val;
n++;

/* Linked List — inserare la început: O(1) */
Nod *nou = creeaza_nod(val);
nou->next = cap;
cap = nou;
\`\`\`

**Când să folosești Linked List:**
• Stivă (\`push\`/\`pop\` la capăt)
• Coadă (\`enqueue\` la coadă, \`dequeue\` la cap)
• Când inserezi/ștergi frecvent la capete
• Implementarea altor structuri (hash table separate chaining)

**Când să preferezi Array:**
• Acces aleator frecvent (\`arr[i]\`)
• Iterare secvențială (cache friendly)
• Dimensiune relativ stabilă
• Operații de sortare (qsort mai eficient pe array)`
  },
  {
    lesson: "16. Stivă și Coadă (Stack și Queue)",
    title: "Stivă cu array — LIFO",
    content: `**Stiva (Stack)** urmează principiul **LIFO** (Last In, First Out) — ultimul element adăugat este primul eliminat. Implementarea cu array este simplă și eficientă.

**Stack cu array static:**
\`\`\`c
#include <stdio.h>
#include <stdlib.h>

#define MAX_STACK 100

typedef struct {
    int date[MAX_STACK];
    int top;   /* indexul elementului din vârf, -1 = gol */
} Stack;

void stack_init(Stack *s) { s->top = -1; }

int stack_empty(const Stack *s) { return s->top < 0; }

int stack_full(const Stack *s)  { return s->top >= MAX_STACK - 1; }

void stack_push(Stack *s, int val) {
    if (stack_full(s)) {
        fprintf(stderr, "Stack overflow!\\n");
        return;
    }
    s->date[++s->top] = val;
}

int stack_pop(Stack *s) {
    if (stack_empty(s)) {
        fprintf(stderr, "Stack underflow!\\n");
        exit(1);
    }
    return s->date[s->top--];
}

int stack_peek(const Stack *s) {
    if (stack_empty(s)) exit(1);
    return s->date[s->top];
}
\`\`\`

**Utilizare:**
\`\`\`c
int main(void) {
    Stack s;
    stack_init(&s);

    stack_push(&s, 10);
    stack_push(&s, 20);
    stack_push(&s, 30);

    printf("Top: %d\\n", stack_peek(&s));  /* 30 */

    while (!stack_empty(&s)) {
        printf("%d ", stack_pop(&s));
    }
    printf("\\n");  /* 30 20 10 — LIFO */
    return 0;
}
\`\`\`

**Aplicație — verificare paranteze echilibrate:**
\`\`\`c
int paranteze_ok(const char *expr) {
    Stack s;
    stack_init(&s);

    for (const char *c = expr; *c; c++) {
        if (*c == '(' || *c == '[' || *c == '{') {
            stack_push(&s, *c);
        } else if (*c == ')' || *c == ']' || *c == '}') {
            if (stack_empty(&s)) return 0;
            int deschis = stack_pop(&s);
            if ((*c == ')' && deschis != '(') ||
                (*c == ']' && deschis != '[') ||
                (*c == '}' && deschis != '{')) return 0;
        }
    }
    return stack_empty(&s);  /* OK dacă stiva e goală */
}

printf("%d\\n", paranteze_ok("({[]})"));  /* 1 — OK */
printf("%d\\n", paranteze_ok("([)]"));    /* 0 — NOK */
\`\`\``
  },
  {
    lesson: "16. Stivă și Coadă (Stack și Queue)",
    title: "Coadă cu array circular — FIFO",
    content: `**Coada (Queue)** urmează principiul **FIFO** (First In, First Out). Implementarea cu **array circular** evită deplasarea elementelor, obținând O(1) pentru ambele operații.

**Queue cu array circular:**
\`\`\`c
#define MAX_QUEUE 100

typedef struct {
    int date[MAX_QUEUE];
    int front;  /* indexul elementului din față */
    int back;   /* indexul primei poziții libere */
    int size;   /* numărul curent de elemente */
} Queue;

void queue_init(Queue *q) { q->front = q->back = q->size = 0; }

int queue_empty(const Queue *q) { return q->size == 0; }

int queue_full(const Queue *q) { return q->size == MAX_QUEUE; }

void enqueue(Queue *q, int val) {
    if (queue_full(q)) {
        fprintf(stderr, "Queue plina!\\n");
        return;
    }
    q->date[q->back] = val;
    q->back = (q->back + 1) % MAX_QUEUE;  /* circular */
    q->size++;
}

int dequeue(Queue *q) {
    if (queue_empty(q)) {
        fprintf(stderr, "Queue goala!\\n");
        exit(1);
    }
    int val = q->date[q->front];
    q->front = (q->front + 1) % MAX_QUEUE;  /* circular */
    q->size--;
    return val;
}

int queue_peek(const Queue *q) {
    if (queue_empty(q)) exit(1);
    return q->date[q->front];
}
\`\`\`

**Utilizare:**
\`\`\`c
int main(void) {
    Queue q;
    queue_init(&q);

    enqueue(&q, 10);
    enqueue(&q, 20);
    enqueue(&q, 30);

    printf("Front: %d\\n", queue_peek(&q));  /* 10 */

    while (!queue_empty(&q)) {
        printf("%d ", dequeue(&q));
    }
    printf("\\n");  /* 10 20 30 — FIFO */
    return 0;
}
\`\`\`

**De ce circular?**
\`\`\`
Fără circular — front se mișcă la dreapta mereu:
[_, _, _, 10, 20, 30] front=3, back=6  → spațiu pierdut la stânga

Cu circular — refolosești spațiul:
[30, _, _, 10, 20] front=3, back=1 → eficient, O(1) pentru ambele
\`\`\``
  },
  {
    lesson: "16. Stivă și Coadă (Stack și Queue)",
    title: "Aplicații practice",
    content: `Stack și Queue sunt structuri de date fundamentale cu aplicații în algoritmi, sisteme de operare, compilatoare și aplicații reale.

**Stack — aplicații:**

**1. Evaluare expresii postfix (Reverse Polish Notation):**
\`\`\`c
/* "3 4 + 5 *" = (3+4)*5 = 35 */
double evalueaza_rpn(const char *expr) {
    double stk[50]; int top = -1;

    char buf[256];
    strcpy(buf, expr);
    char *tok = strtok(buf, " ");

    while (tok) {
        double a, b;
        if (tok[0] == '+' || tok[0] == '-' ||
            tok[0] == '*' || tok[0] == '/') {
            b = stk[top--]; a = stk[top--];
            if (tok[0] == '+') stk[++top] = a + b;
            if (tok[0] == '-') stk[++top] = a - b;
            if (tok[0] == '*') stk[++top] = a * b;
            if (tok[0] == '/') stk[++top] = a / b;
        } else {
            stk[++top] = atof(tok);
        }
        tok = strtok(NULL, " ");
    }
    return stk[top];
}
printf("%.0f\\n", evalueaza_rpn("3 4 + 5 *"));  /* 35 */
\`\`\`

**2. Undo/Redo — istoricul acțiunilor:**
\`\`\`c
/* Stivă de stări — push la acțiune, pop la undo */
char istoricActions[100][256];
int istoricTop = -1;

void executa(const char *actiune) {
    strcpy(istoricActions[++istoricTop], actiune);
    printf("Executat: %s\\n", actiune);
}

void undo(void) {
    if (istoricTop < 0) { printf("Nimic de anulat\\n"); return; }
    printf("Anulat: %s\\n", istoricActions[istoricTop--]);
}
\`\`\`

**Queue — aplicații:**

**3. BFS (Breadth-First Search):**
\`\`\`c
/* Queue pentru parcurgerea nodurilor nivel cu nivel */
void bfs(int start, int n, int adj[][n]) {
    int vizitat[n]; memset(vizitat, 0, sizeof(vizitat));
    int coada[n]; int front = 0, back = 0;

    coada[back++] = start;
    vizitat[start] = 1;

    while (front != back) {
        int curent = coada[front++];
        printf("%d ", curent);
        for (int v = 0; v < n; v++) {
            if (adj[curent][v] && !vizitat[v]) {
                vizitat[v] = 1;
                coada[back++] = v;
            }
        }
    }
}
\`\`\`

**4. Task scheduling — coadă de priorități simplă:**
\`\`\`c
/* Procesare cereri în ordinea sosirii */
typedef struct { int id; const char *tip; } Task;
Task coada_task[100]; int front = 0, back = 0;
void adauga_task(Task t) { coada_task[back++] = t; }
Task proceseaza() { return coada_task[front++]; }
\`\`\``
  },
  {
    lesson: "16. Stivă și Coadă (Stack și Queue)",
    title: "Stivă și coadă cu linked list",
    content: `Implementarea Stack și Queue cu **linked list** elimină limita de dimensiune fixă — structura crește/scade dinamic, fără realloc.

**Stack cu linked list:**
\`\`\`c
#include <stdio.h>
#include <stdlib.h>

typedef struct Nod {
    int val;
    struct Nod *next;
} Nod;

typedef struct {
    Nod *top;
    int size;
} Stack;

void stack_init(Stack *s) { s->top = NULL; s->size = 0; }

void stack_push(Stack *s, int val) {
    Nod *n = malloc(sizeof(Nod));
    if (!n) exit(1);
    n->val  = val;
    n->next = s->top;  /* noul nod → fostul top */
    s->top  = n;       /* noul top */
    s->size++;
}

int stack_pop(Stack *s) {
    if (!s->top) { fprintf(stderr, "Stack gol!\\n"); exit(1); }
    Nod *temp = s->top;
    int val = temp->val;
    s->top = temp->next;
    free(temp);
    s->size--;
    return val;
}

void stack_destroy(Stack *s) {
    while (s->top) stack_pop(s);
}
\`\`\`

**Queue cu linked list — O(1) la ambele capete:**
\`\`\`c
typedef struct {
    Nod *front;   /* pentru dequeue */
    Nod *back;    /* pentru enqueue */
    int size;
} Queue;

void queue_init(Queue *q) { q->front = q->back = NULL; q->size = 0; }

void enqueue(Queue *q, int val) {
    Nod *n = malloc(sizeof(Nod));
    if (!n) exit(1);
    n->val = val; n->next = NULL;
    if (q->back) q->back->next = n;
    else q->front = n;   /* lista era goală */
    q->back = n;
    q->size++;
}

int dequeue(Queue *q) {
    if (!q->front) { fprintf(stderr, "Queue goala!\\n"); exit(1); }
    Nod *temp = q->front;
    int val = temp->val;
    q->front = temp->next;
    if (!q->front) q->back = NULL;  /* a rămas goală */
    free(temp);
    q->size--;
    return val;
}
\`\`\`

**Comparație array vs linked list:**
| Aspect | Array circular | Linked List |
|--------|---------------|-------------|
| Dimensiune | Fixă (MAX) | Nelimitată |
| Cache | Friendly | Unfriendly |
| Overhead | 0 extra | 8 bytes/nod (pointer) |
| Complexitate | O(1) | O(1) |
| Realocare | Necesară la overflow | Niciodată |`
  },
  {
    lesson: "17. Sortare și Căutare",
    title: "Bubble Sort și Selection Sort",
    content: `**Bubble Sort** și **Selection Sort** sunt algoritmii elementari de sortare — O(n²) pe caz mediu/worst. Sunt utili pentru înțelegerea conceptelor, nu pentru producție cu date mari.

**Bubble Sort — "bule" urcă:**
\`\`\`c
#include <stdio.h>

void bubble_sort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        int schimb = 0;
        for (int j = 0; j < n - 1 - i; j++) {
            if (arr[j] > arr[j+1]) {
                int tmp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = tmp;
                schimb = 1;
            }
        }
        if (!schimb) break;  /* optimizare: deja sortat */
    }
}

int main(void) {
    int arr[] = {64, 34, 25, 12, 22, 11, 90};
    int n = sizeof(arr) / sizeof(arr[0]);

    bubble_sort(arr, n);
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\\n");  /* 11 12 22 25 34 64 90 */
    return 0;
}
\`\`\`

**Cum funcționează Bubble Sort — vizualizare:**
\`\`\`
Pas 1: [64, 34, 25, 12, 22, 11, 90]
       comparăm perechi adiacente, cel mare "bule" la dreapta
       → [34, 25, 12, 22, 11, 64, 90]  (90 și 64 la loc)

Pas 2: [25, 12, 22, 11, 34, 64, 90]  (34 la loc)
...
\`\`\`

**Selection Sort — selectează minimul:**
\`\`\`c
void selection_sort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        /* Găsește indexul minimului în [i, n-1] */
        int idx_min = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[idx_min]) idx_min = j;
        }
        /* Swap — pune minimul la poziția i */
        if (idx_min != i) {
            int tmp = arr[i];
            arr[i] = arr[idx_min];
            arr[idx_min] = tmp;
        }
    }
}
\`\`\`

**Comparație:**
| Algoritm | Best | Avg | Worst | Swap-uri | Stabil |
|---------|------|-----|-------|---------|--------|
| Bubble Sort | O(n)* | O(n²) | O(n²) | O(n²) | Da |
| Selection Sort | O(n²) | O(n²) | O(n²) | O(n) | Nu |

\`*\` Cu optimizarea early exit

**Când să le folosești:**
• Array mic (< 20-30 elemente) — overhead zero, lizibile
• Aproape sortat — Bubble Sort excelează
• Nr. minim de swap-uri — Selection Sort (O(n) swap-uri)`
  },
  {
    lesson: "17. Sortare și Căutare",
    title: "Insertion Sort și QuickSort",
    content: `**Insertion Sort** e eficient pentru date aproape sortate. **QuickSort** e algoritmul de facto pentru sortare generală — O(n log n) mediu, cel mai rapid în practică.

**Insertion Sort:**
\`\`\`c
void insertion_sort(int arr[], int n) {
    for (int i = 1; i < n; i++) {
        int cheie = arr[i];
        int j = i - 1;
        /* Mută elementele mai mari cu o poziție la dreapta */
        while (j >= 0 && arr[j] > cheie) {
            arr[j+1] = arr[j];
            j--;
        }
        arr[j+1] = cheie;  /* inserează în locul potrivit */
    }
}
/* Best case: O(n) pe date sortate — ideal pentru array mic/aproape sortat */
\`\`\`

**QuickSort — divide and conquer:**
\`\`\`c
void swap(int *a, int *b) { int t = *a; *a = *b; *b = t; }

int partition(int arr[], int lo, int hi) {
    int pivot = arr[hi];  /* pivot = ultimul element */
    int i = lo - 1;

    for (int j = lo; j < hi; j++) {
        if (arr[j] <= pivot) {
            i++;
            swap(&arr[i], &arr[j]);
        }
    }
    swap(&arr[i+1], &arr[hi]);
    return i + 1;  /* indexul final al pivotului */
}

void quicksort(int arr[], int lo, int hi) {
    if (lo < hi) {
        int piv = partition(arr, lo, hi);
        quicksort(arr, lo, piv - 1);   /* sortează stânga */
        quicksort(arr, piv + 1, hi);   /* sortează dreapta */
    }
}

int main(void) {
    int arr[] = {10, 7, 8, 9, 1, 5};
    int n = 6;
    quicksort(arr, 0, n - 1);
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\\n");  /* 1 5 7 8 9 10 */
    return 0;
}
\`\`\`

**Complexitate QuickSort:**
| Caz | Complexitate | Când apare |
|-----|-------------|-----------|
| Best | O(n log n) | Pivot perfect centrat |
| Average | O(n log n) | Date aleatoare |
| Worst | O(n²) | Date sortate + pivot = ultimul |

**Optimizare — mediana de 3 pentru pivot:**
\`\`\`c
int median3(int *arr, int lo, int hi) {
    int mid = lo + (hi - lo) / 2;
    /* Sortează lo, mid, hi */
    if (arr[lo] > arr[mid]) swap(&arr[lo], &arr[mid]);
    if (arr[lo] > arr[hi])  swap(&arr[lo], &arr[hi]);
    if (arr[mid] > arr[hi]) swap(&arr[mid], &arr[hi]);
    /* Pune pivotul la hi-1 */
    swap(&arr[mid], &arr[hi-1]);
    return arr[hi-1];
}
/* Reduce probabilitatea worst-case */
\`\`\``
  },
  {
    lesson: "17. Sortare și Căutare",
    title: "Binary Search — căutare binară",
    content: `**Binary Search** caută eficient un element într-un array **sortat** prin înjumătățire repetată a spațiului de căutare. Complexitate **O(log n)** — pentru 1 milion de elemente, maxim ~20 comparații.

**Implementare iterativă:**
\`\`\`c
#include <stdio.h>

/* Returnează indexul elementului, sau -1 dacă nu există */
int binary_search(const int arr[], int n, int target) {
    int lo = 0, hi = n - 1;

    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;  /* evită overflow față de (lo+hi)/2 */

        if (arr[mid] == target) return mid;       /* găsit */
        else if (arr[mid] < target) lo = mid + 1; /* caută dreapta */
        else hi = mid - 1;                        /* caută stânga */
    }
    return -1;  /* negăsit */
}

int main(void) {
    int arr[] = {2, 5, 8, 12, 16, 23, 38, 56, 72, 91};
    int n = 10;

    printf("%d\\n", binary_search(arr, n, 23));  /* 5 */
    printf("%d\\n", binary_search(arr, n, 10));  /* -1 */
    printf("%d\\n", binary_search(arr, n, 91));  /* 9 */
    return 0;
}
\`\`\`

**Implementare recursivă:**
\`\`\`c
int bs_rec(const int arr[], int lo, int hi, int target) {
    if (lo > hi) return -1;

    int mid = lo + (hi - lo) / 2;
    if (arr[mid] == target) return mid;
    if (arr[mid] < target) return bs_rec(arr, mid + 1, hi, target);
    return bs_rec(arr, lo, mid - 1, target);
}
\`\`\`

**Variante — prima/ultima apariție:**
\`\`\`c
/* Prima apariție (lower bound) */
int lower_bound(const int arr[], int n, int target) {
    int lo = 0, hi = n;
    while (lo < hi) {
        int mid = lo + (hi - lo) / 2;
        if (arr[mid] < target) lo = mid + 1;
        else hi = mid;
    }
    return lo;  /* primul index >= target */
}

/* Număr de apariții ale unui element */
int count_elem(const int arr[], int n, int target) {
    int lo = lower_bound(arr, n, target);
    if (lo == n || arr[lo] != target) return 0;
    int hi = lower_bound(arr, n, target + 1);
    return hi - lo;
}
\`\`\`

**Comparație — Linear vs Binary Search:**
| | Linear Search | Binary Search |
|--|-------------|--------------|
| Preccondiție | Nimic | Array sortat |
| n=10 | max 10 | max 4 |
| n=1.000 | max 1000 | max 10 |
| n=1.000.000 | max 1M | max 20 |
| Complexitate | O(n) | **O(log n)** |`
  },
  {
    lesson: "17. Sortare și Căutare",
    title: "Complexitate — rezumat",
    content: `**Complexitatea algoritmică** măsoară cât de mult cresc resursele (timp, memorie) odată cu creșterea inputului. Este esențial să știi Big O pentru a alege algoritmul potrivit.

**Notația Big O — cele mai importante clase:**
| Notație | Nume | Exemplu | n=1000 |
|---------|------|---------|--------|
| O(1) | Constant | Acces array, hash lookup | 1 op |
| O(log n) | Logaritmic | Binary search | 10 op |
| O(n) | Liniar | Linear search, sum array | 1000 op |
| O(n log n) | Liniaritmnic | QuickSort, MergeSort | ~10.000 op |
| O(n²) | Pătratic | Bubble, Selection, Insertion Sort | 1.000.000 op |
| O(2ⁿ) | Exponential | Toate submulțimile | enorm |

**Rezumat algoritmi de sortare:**
\`\`\`
Bubble Sort:    O(n²) worst, O(n) best (sortat), stabil, in-place
Selection Sort: O(n²) all cases, minim swap-uri, nestabil, in-place
Insertion Sort: O(n²) worst, O(n) best (aproape sortat), stabil, in-place
Quick Sort:     O(n log n) avg, O(n²) worst, nestabil, in-place
Merge Sort:     O(n log n) all cases, stabil, O(n) extra space
Heap Sort:      O(n log n) all cases, nestabil, in-place
\`\`\`

**Alegerea algoritmului:**
\`\`\`c
/* n mic (< 20) — orice, Insertion Sort simplu */
/* n mare, date aleatoare — QuickSort (qsort din stdlib) */
/* n mare, date aproape sortate — Insertion Sort sau Timsort */
/* Nevoie de stabilitate — Merge Sort */
/* Memorie limitată — Heap Sort */

/* C standard library — qsort() */
#include <stdlib.h>
int cmp(const void *a, const void *b) {
    return *(int*)a - *(int*)b;
}
qsort(arr, n, sizeof(int), cmp);
\`\`\`

**Complexitate spațiu:**
| Algoritm | Spațiu extra |
|---------|-------------|
| Bubble/Selection/Insertion | O(1) |
| QuickSort | O(log n) stack recursiv |
| MergeSort | O(n) — array auxiliar |

**Exemplu concret — importanța alegerii:**
\`\`\`
n = 100.000 elemente:
- Bubble Sort: ~10^10 operații = zeci de minute
- QuickSort:   ~1.700.000 operații = fracțiune de secundă
\`\`\``
  },
  {
    lesson: "18. Recursivitate",
    title: "Principiul recursivității",
    content: `**Recursivitatea** este tehnica prin care o funcție se apelează pe **ea însăși** cu un input mai mic. Orice funcție recursivă are un **caz de baza** (stop) și un **caz recursiv** (apel cu problemă mai mică).

**Structura oricărei funcții recursive:**
\`\`\`c
tip_retur functie_recursiva(parametri) {
    /* Caz de baza — OBLIGATORIU pentru a opri recursivitatea */
    if (conditie_stop) {
        return valoare_directa;
    }
    /* Caz recursiv — reduce problema */
    return ceva + functie_recursiva(parametri_mai_mici);
}
\`\`\`

**Exemplu — factorial:**
\`\`\`c
#include <stdio.h>

int factorial(int n) {
    if (n <= 1) return 1;           /* caz de baza: 0! = 1! = 1 */
    return n * factorial(n - 1);    /* caz recursiv */
}

/* Vizualizare stivă de apeluri pentru factorial(4): */
/*  factorial(4) = 4 * factorial(3)
     factorial(3) = 3 * factorial(2)
      factorial(2) = 2 * factorial(1)
       factorial(1) = 1  ← caz de baza
      = 2 * 1 = 2
     = 3 * 2 = 6
    = 4 * 6 = 24   */

int main(void) {
    printf("5! = %d\\n", factorial(5));   /* 120 */
    printf("10! = %d\\n", factorial(10)); /* 3628800 */
    return 0;
}
\`\`\`

**Fibonacci recursiv:**
\`\`\`c
int fib(int n) {
    if (n <= 1) return n;           /* fib(0)=0, fib(1)=1 */
    return fib(n-1) + fib(n-2);    /* caz recursiv */
}
/* Atenție: fib(40) = ~10^8 apeluri — exponential! */
\`\`\`

**Suma elementelor din array:**
\`\`\`c
int suma_arr(const int arr[], int n) {
    if (n == 0) return 0;                     /* caz de baza */
    return arr[0] + suma_arr(arr+1, n-1);     /* caz recursiv */
}

int arr[] = {1, 2, 3, 4, 5};
printf("%d\\n", suma_arr(arr, 5));  /* 15 */
\`\`\`

**Stiva de apeluri — fiecare apel are propria copie a variabilelor locale:**
\`\`\`
Fiecare apel recursiv = un nou frame pe call stack:
[main] → [factorial(4)] → [factorial(3)] → [factorial(2)] → [factorial(1)]
                                                               ← return 1
                                              ← return 2*1=2
                           ← return 3*2=6
         ← return 4*6=24
\`\`\`

**Stack overflow — recursivitate prea adâncă:**
\`\`\`c
void infinit(void) { infinit(); }  /* crash: stack overflow */
/* Tipic pe sisteme Linux: 8MB stack = ~100.000 apeluri imbricate */
\`\`\``
  },
  {
    lesson: "18. Recursivitate",
    title: "Recursivitate vs Iterație",
    content: `Orice algoritm recursiv poate fi transformat în unul iterativ și invers. Alegerea depinde de lizibilitate, performanță și adâncimea recurenței.

**Factorial — recursiv vs iterativ:**
\`\`\`c
/* Recursiv — elegant, O(n) timp, O(n) spațiu stack */
int fact_rec(int n) {
    return n <= 1 ? 1 : n * fact_rec(n-1);
}

/* Iterativ — O(n) timp, O(1) spațiu */
int fact_iter(int n) {
    int rez = 1;
    for (int i = 2; i <= n; i++) rez *= i;
    return rez;
}
\`\`\`

**Fibonacci — optimizări:**
\`\`\`c
/* RECURSIV NAIV — O(2^n) — inacceptabil pentru n>40 */
int fib_rec(int n) {
    if (n <= 1) return n;
    return fib_rec(n-1) + fib_rec(n-2);
}

/* ITERATIV — O(n) timp, O(1) spațiu — mult mai bun */
int fib_iter(int n) {
    if (n <= 1) return n;
    int a = 0, b = 1;
    for (int i = 2; i <= n; i++) {
        int c = a + b; a = b; b = c;
    }
    return b;
}

/* MEMOIZARE — O(n) timp, O(n) spațiu (cache) */
int memo[1000] = {-1};  /* inițializat cu -1 = necalculat */
int fib_memo(int n) {
    if (n <= 1) return n;
    if (memo[n] != -1) return memo[n];  /* din cache */
    return memo[n] = fib_memo(n-1) + fib_memo(n-2);
}
\`\`\`

**Când recursivitate, când iterație:**
| Criteriu | Recursivitate | Iterație |
|---------|--------------|---------|
| Lizibilitate | ✓ Structuri imbricate | ✓ Procesare lineară |
| Performanță | ✗ Overhead call stack | ✓ Mai rapid |
| Memorie | ✗ O(adâncime) stack | ✓ O(1) posibil |
| Structuri arborescente | ✓ Natural | ✗ Necesită stack manual |
| Tail recursion | ✓ Optimizat (gcc) | — |

**Tail recursion — optimizat de gcc:**
\`\`\`c
/* Tail recursion — apelul recursiv e ULTIMA operație */
int fact_tail(int n, int acum) {
    if (n <= 1) return acum;
    return fact_tail(n-1, n * acum);  /* tail call */
}

/* gcc cu -O2 transformă în loop (TCO) */
fact_tail(10, 1);  /* 3628800 */
\`\`\``
  },
  {
    lesson: "18. Recursivitate",
    title: "Turnurile din Hanoi",
    content: `**Turnurile din Hanoi** este problema clasică de recursivitate: mută n discuri de pe tija A pe tija C, folosind B ca auxiliar, fără a pune un disc mai mare peste unul mai mic.

**Reguli:**
• Muți câte un disc pe rând
• Un disc mai mare NU poate fi pus peste unul mai mic
• Folosești 3 tije: sursă, destinație, auxiliar

**Soluție recursivă — elegantă și corectă:**
\`\`\`c
#include <stdio.h>

void hanoi(int n, char sursa, char dest, char aux) {
    if (n == 0) return;  /* caz de baza — nimic de mutat */

    /* 1. Mută n-1 discuri din sursa pe aux (prin dest) */
    hanoi(n-1, sursa, aux, dest);

    /* 2. Mută discul cel mai mare din sursa pe dest */
    printf("Muta disc %d: %c → %c\\n", n, sursa, dest);

    /* 3. Mută n-1 discuri din aux pe dest (prin sursa) */
    hanoi(n-1, aux, dest, sursa);
}

int main(void) {
    int n = 3;  /* 3 discuri */
    hanoi(n, 'A', 'C', 'B');
    return 0;
}
\`\`\`

**Output pentru n=3 (7 mutări):**
\`\`\`
Muta disc 1: A → C
Muta disc 2: A → B
Muta disc 1: C → B
Muta disc 3: A → C
Muta disc 1: B → A
Muta disc 2: B → C
Muta disc 1: A → C
\`\`\`

**Numărul de mutări — formula exactă:**
\`\`\`
n discuri → 2^n - 1 mutări (minim)
n=1 → 1 mutare
n=2 → 3 mutări
n=3 → 7 mutări
n=10 → 1023 mutări
n=64 → 18.446.744.073.709.551.615 mutări (trilobite)
\`\`\`

**De ce funcționează recursivitatea?**
\`\`\`c
/* hanoi(3, A, C, B):
   1. hanoi(2, A, B, C) — mută 2 discuri A→B
      - hanoi(1, A, C, B): disc1: A→C
      - disc2: A→B
      - hanoi(1, C, B, A): disc1: C→B
   2. disc3: A→C
   3. hanoi(2, B, C, A) — mută 2 discuri B→C
      - hanoi(1, B, A, C): disc1: B→A
      - disc2: B→C
      - hanoi(1, A, C, B): disc1: A→C
*/
\`\`\`

**Lecție din Hanoi:** Problema care pare imposibil de rezolvat iterativ se rezolvă recursiv în 5 linii de cod.`
  },
  {
    lesson: "18. Recursivitate",
    title: "Recursivitate pe tablouri și stringuri",
    content: `Recursivitatea pe **array-uri și șiruri de caractere** este un antrenament esențial — înveți să gândești recursive pe structuri liniare înainte de arbori și grafuri.

**Suma elementelor unui array:**
\`\`\`c
int suma(const int arr[], int n) {
    if (n == 0) return 0;          /* caz de baza: array gol */
    return arr[0] + suma(arr+1, n-1);  /* primul + suma restului */
}
printf("%d\\n", suma((int[]){1,2,3,4,5}, 5));  /* 15 */
\`\`\`

**Maximul dintr-un array:**
\`\`\`c
int maxim(const int arr[], int n) {
    if (n == 1) return arr[0];
    int max_rest = maxim(arr+1, n-1);
    return arr[0] > max_rest ? arr[0] : max_rest;
}
\`\`\`

**Palindrom — string citit la fel de la ambele capete:**
\`\`\`c
#include <string.h>

int palindrom(const char *s, int lo, int hi) {
    if (lo >= hi) return 1;          /* caz de baza: s-au întâlnit */
    if (s[lo] != s[hi]) return 0;    /* nepotrivire */
    return palindrom(s, lo+1, hi-1); /* verifică interiorul */
}

int este_palindrom(const char *s) {
    return palindrom(s, 0, strlen(s) - 1);
}

printf("%d\\n", este_palindrom("racecar"));  /* 1 */
printf("%d\\n", este_palindrom("hello"));    /* 0 */
printf("%d\\n", este_palindrom("madam"));    /* 1 */
\`\`\`

**Inversare array:**
\`\`\`c
void inverseaza(int arr[], int lo, int hi) {
    if (lo >= hi) return;           /* caz de baza */
    int tmp = arr[lo];
    arr[lo] = arr[hi];
    arr[hi] = tmp;
    inverseaza(arr, lo+1, hi-1);    /* inversează interiorul */
}

int v[] = {1,2,3,4,5};
inverseaza(v, 0, 4);
/* v = {5,4,3,2,1} */
\`\`\`

**Power (putere) — divide and conquer:**
\`\`\`c
/* O(n) simplu vs O(log n) D&C */
double putere(double baza, int exp) {
    if (exp == 0) return 1.0;
    if (exp % 2 == 0) {
        double half = putere(baza, exp/2);
        return half * half;    /* O(log n) — doar la jumătate */
    }
    return baza * putere(baza, exp-1);
}

printf("%.0f\\n", putere(2, 10));  /* 1024 */
printf("%.0f\\n", putere(3, 8));   /* 6561 */
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
