"use strict";
require("dotenv").config({ path: ".env" });
const { PrismaClient } = require("@prisma/client");
const p = new PrismaClient();
const UPDATES = [
  {
    lesson: "13. Structuri avansate — nested, typedef",
    title: "Array de structuri",
    content: `**Array-urile de structuri** sunt una din cele mai utilizate combinații în C — o colecție de înregistrări omogene, baza oricărei baze de date simple sau liste de entități.

**Declarare și utilizare:**
\`\`\`c
#include <stdio.h>
#include <string.h>

typedef struct {
    int    id;
    char   nume[50];
    int    varsta;
    float  medie;
    int    activ;
} Student;

int main(void) {
    /* Array static */
    Student clasa[5] = {
        {1, "Ion Popescu",   20, 8.5f, 1},
        {2, "Maria Ionescu", 19, 9.2f, 1},
        {3, "Andrei Popa",   21, 7.8f, 0},
        {4, "Elena Dumitr.", 20, 8.0f, 1},
        {5, "Cristi Stoian", 22, 6.5f, 0}
    };
    int n = 5;

    /* Afișare tabel */
    printf("%-5s %-20s %-5s %-6s %s\\n", "ID", "Nume", "Vârstă", "Medie", "Activ");
    printf("%-5s %-20s %-5s %-6s %s\\n", "---", "-------------------", "-----", "------", "------");
    for (int i = 0; i < n; i++) {
        printf("%-5d %-20s %-5d %-6.1f %s\\n",
               clasa[i].id, clasa[i].nume, clasa[i].varsta,
               clasa[i].medie, clasa[i].activ ? "Da" : "Nu");
    }
    return 0;
}
\`\`\`

**Căutare și filtrare:**
\`\`\`c
/* Caută student după ID */
Student* gaseste_dupa_id(Student *arr, int n, int id) {
    for (int i = 0; i < n; i++) {
        if (arr[i].id == id) return &arr[i];
    }
    return NULL;  /* negăsit */
}

/* Filtrare — studenți activi cu medie >= 8 */
void afiseaza_top(const Student *arr, int n) {
    printf("Top studenți (activi, medie >= 8):\\n");
    for (int i = 0; i < n; i++) {
        if (arr[i].activ && arr[i].medie >= 8.0f)
            printf("  %s: %.1f\\n", arr[i].nume, arr[i].medie);
    }
}
\`\`\`

**Sortare cu qsort:**
\`\`\`c
#include <stdlib.h>

int cmp_medie_desc(const void *a, const void *b) {
    const Student *sa = (const Student*)a;
    const Student *sb = (const Student*)b;
    if (sa->medie > sb->medie) return -1;
    if (sa->medie < sb->medie) return 1;
    return 0;
}

qsort(clasa, n, sizeof(Student), cmp_medie_desc);
/* Acum clasa e sortată descendent după medie */
\`\`\`

**Array dinamic de structuri:**
\`\`\`c
int cap = 10;
Student *stud = malloc(cap * sizeof(Student));
int len = 0;

/* Adaugă student */
void adauga(Student *arr, int *len, int *cap, Student s) {
    if (*len == *cap) {
        *cap *= 2;
        arr = realloc(arr, (*cap) * sizeof(Student));
    }
    arr[(*len)++] = s;
}
\`\`\``
  },
  {
    lesson: "24. Mini-proiect: Calculator în C",
    title: "Implementare calculator.c",
    content: `Implementarea funcțiilor de calcul — parsing expresii, evaluare și afișare. Folosim \`sscanf\` pentru parsing și un switch pe operator.

**calc.c — implementarea completă:**
\`\`\`c
#include "calc.h"
#include <stdio.h>
#include <math.h>
#include <string.h>
#include <ctype.h>

int calc_op_valida(char op) {
    return op == '+' || op == '-' || op == '*' ||
           op == '/' || op == '%' || op == '^';
}

/* Parsare expresie de forma "a op b" */
int calc_evalueaza(const char *expr, Calcul *out) {
    double a, b;
    char op;

    /* Încearcă format: "3.14 + 2.0" */
    if (sscanf(expr, "%lf %c %lf", &a, &op, &b) != 3) {
        fprintf(stderr, "Format invalid. Ex: 5.5 + 3.2\\n");
        return 0;
    }

    if (!calc_op_valida(op)) {
        fprintf(stderr, "Operator necunoscut: %c\\n", op);
        return 0;
    }

    out->a  = a;
    out->op = op;
    out->b  = b;

    switch (op) {
        case '+': out->rez = a + b; break;
        case '-': out->rez = a - b; break;
        case '*': out->rez = a * b; break;
        case '/':
            if (b == 0.0) {
                fprintf(stderr, "Eroare: impartire la zero!\\n");
                return 0;
            }
            out->rez = a / b;
            break;
        case '%':
            if ((long long)b == 0) {
                fprintf(stderr, "Eroare: modulo zero!\\n");
                return 0;
            }
            out->rez = (double)((long long)a % (long long)b);
            break;
        case '^':
            out->rez = pow(a, b);
            break;
    }
    return 1;  /* success */
}

void calc_print_rez(const Calcul *c) {
    /* Dacă rezultatul e întreg, afișează fără zecimale */
    if (c->rez == (long long)c->rez && c->rez > -1e15 && c->rez < 1e15) {
        printf("= %.0f\\n", c->rez);
    } else {
        printf("= %.10g\\n", c->rez);
    }
}
\`\`\`

**Testare manuală:**
\`\`\`c
Calcul c;
const char *teste[] = {
    "10 + 5", "10 - 3", "4 * 7", "22 / 7", "17 % 5", "2 ^ 10"
};
for (int i = 0; i < 6; i++) {
    printf("%s ", teste[i]);
    if (calc_evalueaza(teste[i], &c)) calc_print_rez(&c);
}
/* 10 + 5 = 15
   10 - 3 = 7
   4 * 7 = 28
   22 / 7 = 3.142857143
   17 % 5 = 2
   2 ^ 10 = 1024 */
\`\`\``
  },
  {
    lesson: "24. Mini-proiect: Calculator în C",
    title: "Istoric cu array dinamic",
    content: `**Istoricul calculelor** se implementează cu un array dinamic (similar unui vector) — crește automat când se umple, cu dublarea capacității pentru O(1) amortizat.

**history.c — implementare completă:**
\`\`\`c
#include "history.h"
#include <stdio.h>
#include <stdlib.h>

#define HIST_CAP_INITIAL 8

History* hist_new(void) {
    History *h = malloc(sizeof(History));
    if (!h) exit(1);
    h->items = malloc(HIST_CAP_INITIAL * sizeof(Calcul));
    if (!h->items) { free(h); exit(1); }
    h->len = 0;
    h->cap = HIST_CAP_INITIAL;
    return h;
}

void hist_add(History *h, const Calcul *c) {
    if (h->len == h->cap) {
        h->cap *= 2;
        Calcul *tmp = realloc(h->items, h->cap * sizeof(Calcul));
        if (!tmp) { fprintf(stderr, "realloc esuat\\n"); return; }
        h->items = tmp;
    }
    h->items[h->len++] = *c;
}

void hist_print(const History *h) {
    if (h->len == 0) {
        printf("Istoricul este gol.\\n");
        return;
    }
    printf("\\n=== Istoric (%d calcule) ===\\n", h->len);
    for (int i = 0; i < h->len; i++) {
        const Calcul *c = &h->items[i];
        printf("[%3d] %.10g %c %.10g = %.10g\\n",
               i + 1, c->a, c->op, c->b, c->rez);
    }
}

void hist_print_last(const History *h, int n) {
    int start = h->len - n;
    if (start < 0) start = 0;
    printf("Ultimele %d calcule:\\n", h->len - start);
    for (int i = start; i < h->len; i++) {
        const Calcul *c = &h->items[i];
        printf("  %.10g %c %.10g = %.10g\\n",
               c->a, c->op, c->b, c->rez);
    }
}

void hist_free(History *h) {
    if (!h) return;
    free(h->items);
    free(h);
}
\`\`\`

**Statistici din istoric:**
\`\`\`c
void hist_stats(const History *h) {
    if (h->len == 0) return;
    double suma_rez = 0.0;
    double max_rez  = h->items[0].rez;
    double min_rez  = h->items[0].rez;

    for (int i = 0; i < h->len; i++) {
        double r = h->items[i].rez;
        suma_rez += r;
        if (r > max_rez) max_rez = r;
        if (r < min_rez) min_rez = r;
    }
    printf("Statistici: avg=%.4g, max=%.4g, min=%.4g\\n",
           suma_rez / h->len, max_rez, min_rez);
}
\`\`\``
  },
  {
    lesson: "24. Mini-proiect: Calculator în C",
    title: "Main loop — REPL",
    content: `**REPL** (Read-Eval-Print Loop) este bucla principală a calculatorului — citește comenzi, evaluează, afișează, repetă. Gestionează și comenzile speciale (history, clear, help).

**main.c — REPL complet:**
\`\`\`c
#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include "calc.h"
#include "history.h"

#define PROMPT "calc> "

void afiseaza_help(void) {
    printf("\\nComanda           Efect\\n");
    printf("------            -----\\n");
    printf("<expr>            Evaluează expresia (ex: 5.5 + 3.2)\\n");
    printf("history [n]       Afișează istoricul (opțional ultimele n)\\n");
    printf("clear             Șterge istoricul\\n");
    printf("help              Afișează acest mesaj\\n");
    printf("exit, quit        Ieșire\\n\\n");
}

int main(void) {
    History *hist = hist_new();
    char linie[256];

    printf("Calculator C — tastează 'help' pentru ajutor\\n");

    while (1) {
        printf(PROMPT);
        fflush(stdout);

        if (fgets(linie, sizeof(linie), stdin) == NULL) break;

        /* Elimină newline */
        linie[strcspn(linie, "\\n")] = '\\0';

        /* Sari peste linii goale */
        if (linie[0] == '\\0') continue;

        /* Procesare comenzi speciale */
        if (strcmp(linie, "exit") == 0 || strcmp(linie, "quit") == 0) {
            printf("La revedere!\\n");
            break;
        } else if (strcmp(linie, "help") == 0) {
            afiseaza_help();
        } else if (strcmp(linie, "clear") == 0) {
            hist_free(hist);
            hist = hist_new();
            printf("Istoricul a fost șters.\\n");
        } else if (strncmp(linie, "history", 7) == 0) {
            int n = 0;
            sscanf(linie + 7, "%d", &n);  /* opțional: "history 5" */
            if (n > 0) hist_print_last(hist, n);
            else hist_print(hist);
        } else {
            /* Evaluare expresie */
            Calcul c;
            if (calc_evalueaza(linie, &c)) {
                calc_print_rez(&c);
                hist_add(hist, &c);
            }
        }
    }

    hist_free(hist);
    return 0;
}
\`\`\`

**Sesiune exemplu:**
\`\`\`
Calculator C — tastează 'help' pentru ajutor
calc> 5 + 3
= 8
calc> 10 / 3
= 3.333333333
calc> 2 ^ 16
= 65536
calc> history 3
Ultimele 3 calcule:
  5 + 3 = 8
  10 / 3 = 3.333333333
  2 ^ 16 = 65536
calc> exit
La revedere!
\`\`\``
  },
  {
    lesson: "26. Hash Tables în C",
    title: "Ce este o Hash Table?",
    content: `**Hash Table** (tabela de dispersie) este o structură de date care oferă căutare, inserare și ștergere în timp **O(1) mediu** — mult mai rapid decât array sortate sau linked lists.

**Principiul fundamental:**
\`\`\`
Cheie (ex: "alice") → Hash Function → Index (ex: 42) → Array slot

hash("alice") = 42
hash("bob")   = 17
hash("carol") = 99
\`\`\`

**Hash function simplă pentru string-uri:**
\`\`\`c
#include <stddef.h>

/* djb2 — hash function populară */
size_t hash_string(const char *key, size_t cap) {
    size_t hash = 5381;
    int c;
    while ((c = (unsigned char)*key++)) {
        hash = hash * 33 + c;
    }
    return hash % cap;
}

/* FNV-1a — altă variantă bună */
size_t fnv1a(const char *key, size_t cap) {
    size_t hash = 14695981039346656037ULL;
    while (*key) {
        hash ^= (unsigned char)*key++;
        hash *= 1099511628211ULL;
    }
    return hash % cap;
}
\`\`\`

**Structura completă — hash table cu chaining:**
\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define HT_CAPACITY 64

typedef struct Entry {
    char        *key;
    int          val;
    struct Entry *next;   /* chaining pentru coliziuni */
} Entry;

typedef struct {
    Entry **buckets;
    size_t  cap;
    size_t  len;
} HashTable;

HashTable* ht_new(size_t cap) {
    HashTable *ht = malloc(sizeof(HashTable));
    ht->buckets = calloc(cap, sizeof(Entry*));  /* inițializat cu NULL */
    ht->cap = cap;
    ht->len = 0;
    return ht;
}
\`\`\`

**Inserare:**
\`\`\`c
void ht_set(HashTable *ht, const char *key, int val) {
    size_t idx = hash_string(key, ht->cap);
    Entry *e = ht->buckets[idx];

    /* Caută dacă cheia există deja */
    while (e) {
        if (strcmp(e->key, key) == 0) {
            e->val = val;  /* update */
            return;
        }
        e = e->next;
    }

    /* Inserare nouă — la începutul listei */
    Entry *nou = malloc(sizeof(Entry));
    nou->key  = strdup(key);
    nou->val  = val;
    nou->next = ht->buckets[idx];
    ht->buckets[idx] = nou;
    ht->len++;
}
\`\`\`

**Căutare:**
\`\`\`c
int ht_get(const HashTable *ht, const char *key, int *out) {
    size_t idx = hash_string(key, ht->cap);
    for (Entry *e = ht->buckets[idx]; e; e = e->next) {
        if (strcmp(e->key, key) == 0) {
            *out = e->val;
            return 1;  /* găsit */
        }
    }
    return 0;  /* negăsit */
}
\`\`\``
  },
  {
    lesson: "26. Hash Tables în C",
    title: "Load Factor și Rehashing",
    content: `**Load Factor** = nr. elemente / nr. bucket-uri. Când load factor-ul crește prea mult, hash table-ul devine lent — se face **rehash** (redimensionare).

**Load factor și performanța:**
\`\`\`
Load Factor = len / cap

0.0 - 0.5: excelent — puține coliziuni
0.5 - 0.75: bun — echilibru memorie/viteză
0.75+: prea dens — multa coliziuni → rehash
\`\`\`

**Rehashing — redimensionare:**
\`\`\`c
void ht_rehash(HashTable *ht) {
    size_t new_cap = ht->cap * 2;
    Entry **new_buckets = calloc(new_cap, sizeof(Entry*));
    if (!new_buckets) return;

    /* Redistribuie toate intrările în noua tabelă */
    for (size_t i = 0; i < ht->cap; i++) {
        Entry *e = ht->buckets[i];
        while (e) {
            Entry *next = e->next;
            /* Recalculează indexul în noua capacitate */
            size_t new_idx = hash_string(e->key, new_cap);
            e->next = new_buckets[new_idx];
            new_buckets[new_idx] = e;
            e = next;
        }
    }

    free(ht->buckets);
    ht->buckets = new_buckets;
    ht->cap = new_cap;
}

/* Inserare cu auto-rehash */
void ht_set_auto(HashTable *ht, const char *key, int val) {
    /* Rehash la load factor > 0.75 */
    if ((float)ht->len / ht->cap > 0.75f) {
        ht_rehash(ht);
    }
    ht_set(ht, key, val);
}
\`\`\`

**Ștergere intrare:**
\`\`\`c
int ht_delete(HashTable *ht, const char *key) {
    size_t idx = hash_string(key, ht->cap);
    Entry **prev = &ht->buckets[idx];
    Entry *e = *prev;

    while (e) {
        if (strcmp(e->key, key) == 0) {
            *prev = e->next;
            free(e->key);
            free(e);
            ht->len--;
            return 1;  /* șters */
        }
        prev = &e->next;
        e = *prev;
    }
    return 0;  /* negăsit */
}
\`\`\`

**Eliberare hash table:**
\`\`\`c
void ht_free(HashTable *ht) {
    for (size_t i = 0; i < ht->cap; i++) {
        Entry *e = ht->buckets[i];
        while (e) {
            Entry *next = e->next;
            free(e->key);
            free(e);
            e = next;
        }
    }
    free(ht->buckets);
    free(ht);
}
\`\`\`

**Statistici — distribuția bucket-urilor:**
\`\`\`c
void ht_stats(const HashTable *ht) {
    int gol = 0, max_lan = 0;
    for (size_t i = 0; i < ht->cap; i++) {
        int lan = 0;
        for (Entry *e = ht->buckets[i]; e; e = e->next) lan++;
        if (lan == 0) gol++;
        if (lan > max_lan) max_lan = lan;
    }
    printf("Cap=%zu, Len=%zu, LF=%.2f, Gol=%d, MaxLan=%d\\n",
           ht->cap, ht->len, (float)ht->len/ht->cap, gol, max_lan);
}
\`\`\``
  },
  {
    lesson: "27. Arbori Binari în C",
    title: "Structura Arborelui Binar",
    content: `**Arborele binar** este o structură de date ierarhică în care fiecare nod are cel mult doi copii: **stâng** și **drept**. Fundamental pentru structuri de date avansate și algoritmi eficienți.

**Structura nodului:**
\`\`\`c
#include <stdio.h>
#include <stdlib.h>

typedef struct Nod {
    int val;
    struct Nod *stang;
    struct Nod *drept;
} Nod;

Nod* creeaza_nod(int val) {
    Nod *n = malloc(sizeof(Nod));
    if (!n) exit(1);
    n->val   = val;
    n->stang = NULL;
    n->drept = NULL;
    return n;
}
\`\`\`

**Binary Search Tree (BST) — arbore binar de căutare:**
\`\`\`c
/*
    BST invariant: val_stang < val_parinte <= val_drept

         8
        / \\
       3   10
      / \\    \\
     1   6    14
        / \\  /
       4   7 13
*/

Nod* bst_insert(Nod *root, int val) {
    if (root == NULL) return creeaza_nod(val);

    if (val < root->val) {
        root->stang = bst_insert(root->stang, val);
    } else if (val > root->val) {
        root->drept = bst_insert(root->drept, val);
    }
    /* dacă val == root->val — nu inserăm duplicate */
    return root;
}

/* Construire BST */
Nod *root = NULL;
int vals[] = {8, 3, 10, 1, 6, 14, 4, 7, 13};
for (int i = 0; i < 9; i++) {
    root = bst_insert(root, vals[i]);
}
\`\`\`

**Căutare în BST — O(log n) echilibrat:**
\`\`\`c
Nod* bst_search(Nod *root, int val) {
    if (root == NULL || root->val == val) return root;
    if (val < root->val) return bst_search(root->stang, val);
    return bst_search(root->drept, val);
}

Nod *gasit = bst_search(root, 6);
printf("%s\\n", gasit ? "Gasit" : "Negasit");
\`\`\`

**Eliberare arbore (post-order):**
\`\`\`c
void arbore_free(Nod *root) {
    if (root == NULL) return;
    arbore_free(root->stang);  /* eliberează subarborele stâng */
    arbore_free(root->drept);  /* eliberează subarborele drept */
    free(root);                /* eliberează nodul curent */
}
\`\`\`

**Proprietăți BST:**
| Operație | Echilibrat | Dezechilibrat (worst) |
|---------|-----------|----------------------|
| Căutare | O(log n) | O(n) |
| Inserare | O(log n) | O(n) |
| Ștergere | O(log n) | O(n) |`
  },
  {
    lesson: "28. Algoritmi de Sortare Avansati în C",
    title: "Quicksort — Divide and Conquer",
    content: `**Quicksort** este algoritmul de sortare cel mai rapid în practică pe date aleatoare — O(n log n) mediu, O(n²) worst case. Principiul: alege un pivot, partiționează, sortează recursiv.

**Implementare completă cu optimizări:**
\`\`\`c
#include <stdio.h>
#include <string.h>

static inline void swap_int(int *a, int *b) {
    int t = *a; *a = *b; *b = t;
}

/* Selectare pivot prin mediana-de-3 */
static int median3(int *arr, int lo, int hi) {
    int mid = lo + (hi - lo) / 2;
    if (arr[lo] > arr[mid]) swap_int(&arr[lo], &arr[mid]);
    if (arr[lo] > arr[hi])  swap_int(&arr[lo], &arr[hi]);
    if (arr[mid] > arr[hi]) swap_int(&arr[mid], &arr[hi]);
    /* arr[lo] <= arr[mid] <= arr[hi] */
    swap_int(&arr[mid], &arr[hi-1]);
    return arr[hi-1];
}

/* Partiționare Lomuto */
static int partition(int *arr, int lo, int hi) {
    int pivot = arr[hi], i = lo - 1;
    for (int j = lo; j < hi; j++) {
        if (arr[j] <= pivot) swap_int(&arr[++i], &arr[j]);
    }
    swap_int(&arr[i+1], &arr[hi]);
    return i + 1;
}

/* Insertion sort pentru sub-array-uri mici */
static void insertion_sort_range(int *arr, int lo, int hi) {
    for (int i = lo+1; i <= hi; i++) {
        int key = arr[i], j = i-1;
        while (j >= lo && arr[j] > key) arr[j+1] = arr[j--];
        arr[j+1] = key;
    }
}

void quicksort(int *arr, int lo, int hi) {
    if (hi - lo < 10) {
        /* Insertion sort e mai rapid pe segmente mici */
        insertion_sort_range(arr, lo, hi);
        return;
    }
    int piv = partition(arr, lo, hi);
    quicksort(arr, lo, piv - 1);
    quicksort(arr, piv + 1, hi);
}

int main(void) {
    int arr[] = {64, 25, 12, 22, 11, 90, 43, 7, 55, 38};
    int n = 10;
    quicksort(arr, 0, n-1);
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    /* 7 11 12 22 25 38 43 55 64 90 */
    return 0;
}
\`\`\`

**Vizualizare partiționare:**
\`\`\`
[64, 25, 12, 22, 11] pivot=11
  i         j
→ 11 < toate → pivot la stânga
[11, 25, 12, 22, 64]  pivot la index 0
Recursiv: [] și [25, 12, 22, 64]
\`\`\`

**Complexitate:**
| Caz | Complexitate | Spațiu stack |
|-----|-------------|-------------|
| Best | O(n log n) | O(log n) |
| Average | O(n log n) | O(log n) |
| Worst (sortat + pivot=ultim) | O(n²) | O(n) |`
  },
  {
    lesson: "28. Algoritmi de Sortare Avansati în C",
    title: "Merge Sort — Stabil și Predictibil",
    content: `**Merge Sort** sortează prin interclasare — împarte la jumătate recursiv, apoi interclasează perechi sortate. Garantat O(n log n) pe toate cazurile, **stabil**, dar necesită spațiu auxiliar O(n).

**Implementare cu buffer auxiliar:**
\`\`\`c
#include <string.h>
#include <stdlib.h>

/* Interclasare — combină două sub-array-uri sortate */
static void merge(int *arr, int lo, int mid, int hi, int *tmp) {
    /* Copiază în buffer temporar */
    memcpy(tmp + lo, arr + lo, (hi - lo + 1) * sizeof(int));

    int i = lo, j = mid + 1, k = lo;
    while (i <= mid && j <= hi) {
        if (tmp[i] <= tmp[j]) arr[k++] = tmp[i++];
        else                   arr[k++] = tmp[j++];
    }
    while (i <= mid) arr[k++] = tmp[i++];
    while (j <= hi)  arr[k++] = tmp[j++];
}

void mergesort(int *arr, int lo, int hi, int *tmp) {
    if (lo >= hi) return;                    /* caz de baza */
    int mid = lo + (hi - lo) / 2;
    mergesort(arr, lo, mid, tmp);            /* sortează stânga */
    mergesort(arr, mid+1, hi, tmp);          /* sortează dreapta */
    merge(arr, lo, mid, hi, tmp);            /* interclasează */
}

void merge_sort(int *arr, int n) {
    int *tmp = malloc(n * sizeof(int));
    if (!tmp) return;
    mergesort(arr, 0, n-1, tmp);
    free(tmp);
}
\`\`\`

**Bottom-up Merge Sort — iterativ, fără recursivitate:**
\`\`\`c
void merge_sort_iterativ(int *arr, int n) {
    int *tmp = malloc(n * sizeof(int));
    if (!tmp) return;

    /* Pornim cu sub-array-uri de dimensiune 1, dublăm */
    for (int size = 1; size < n; size *= 2) {
        for (int lo = 0; lo < n - size; lo += size * 2) {
            int mid = lo + size - 1;
            int hi  = (lo + size*2 - 1 < n-1) ? lo + size*2 - 1 : n-1;
            merge(arr, lo, mid, hi, tmp);
        }
    }
    free(tmp);
}
\`\`\`

**Interclasarea a două array-uri sortate:**
\`\`\`c
/* Utilă independent de Merge Sort */
void interclaseaza(const int *a, int na, const int *b, int nb, int *out) {
    int i = 0, j = 0, k = 0;
    while (i < na && j < nb) {
        if (a[i] <= b[j]) out[k++] = a[i++];
        else               out[k++] = b[j++];
    }
    while (i < na) out[k++] = a[i++];
    while (j < nb) out[k++] = b[j++];
}
\`\`\`

**Comparație Quicksort vs Mergesort:**
| Aspect | Quicksort | Mergesort |
|--------|---------|----------|
| Worst | O(n²) | O(n log n) |
| Stabilitate | Nu | Da |
| Spațiu | O(log n) | O(n) |
| Viteză practică | Mai rapid | Predictibil |`
  },
  {
    lesson: "29. Grafuri în C — BFS, DFS, Shortest Path",
    title: "Reprezentarea Grafurilor în C",
    content: `**Grafurile** sunt structuri de date care modelează relații — rețele sociale, hărți, dependențe. Cele două reprezentări principale sunt **matricea de adiacență** și **lista de adiacență**.

**Matrice de adiacență — O(V²) spațiu:**
\`\`\`c
#include <stdio.h>
#include <string.h>

#define MAX_V 10

typedef struct {
    int adj[MAX_V][MAX_V];  /* adj[i][j] = 1 dacă există muchie i→j */
    int n;                  /* numărul de noduri */
    int orientat;           /* 1 = orientat, 0 = neorientat */
} GrafMatrice;

void graf_init(GrafMatrice *g, int n, int orientat) {
    memset(g->adj, 0, sizeof(g->adj));
    g->n = n;
    g->orientat = orientat;
}

void graf_adauga_muchie(GrafMatrice *g, int u, int v) {
    g->adj[u][v] = 1;
    if (!g->orientat) g->adj[v][u] = 1;  /* neorientat = bidirectional */
}

void graf_afiseaza(const GrafMatrice *g) {
    printf("  ");
    for (int i = 0; i < g->n; i++) printf("%2d", i);
    printf("\\n");
    for (int i = 0; i < g->n; i++) {
        printf("%d:", i);
        for (int j = 0; j < g->n; j++) printf("%2d", g->adj[i][j]);
        printf("\\n");
    }
}
\`\`\`

**Lista de adiacență — O(V + E) spațiu:**
\`\`\`c
#define MAX_NODURI 100
#define MAX_VECINI  20

typedef struct {
    int vecini[MAX_NODURI][MAX_VECINI];
    int grad[MAX_NODURI];   /* gradul nodului i */
    int n;
} GrafLista;

void gl_init(GrafLista *g, int n) {
    memset(g->grad, 0, sizeof(g->grad));
    g->n = n;
}

void gl_adauga(GrafLista *g, int u, int v) {
    g->vecini[u][g->grad[u]++] = v;
    g->vecini[v][g->grad[v]++] = u;  /* neorientat */
}

/* Exemplu de utilizare */
GrafLista g;
gl_init(&g, 6);
gl_adauga(&g, 0, 1);
gl_adauga(&g, 0, 2);
gl_adauga(&g, 1, 3);
gl_adauga(&g, 2, 4);
gl_adauga(&g, 3, 5);
\`\`\`

**Matrice vs Listă de adiacență:**
| Aspect | Matrice | Listă |
|--------|---------|-------|
| Spațiu | O(V²) | O(V + E) |
| Verificare muchie i→j | O(1) | O(grad(i)) |
| Listare vecini i | O(V) | O(grad(i)) |
| Graf dens | Preferat | — |
| Graf rar | — | Preferat |`
  },
  {
    lesson: "29. Grafuri în C — BFS, DFS, Shortest Path",
    title: "DFS și BFS",
    content: `**DFS** (Depth-First Search) și **BFS** (Breadth-First Search) sunt parcurgerile fundamentale ale grafurilor — baza majorității algoritmilor pe grafuri.

**DFS — recursiv (cu stivă implicită):**
\`\`\`c
#include <stdio.h>
#include <string.h>

#define N 7

int adj[N][N] = {
    {0,1,1,0,0,0,0},  /* 0: vecini 1,2 */
    {1,0,0,1,0,0,0},  /* 1: vecini 0,3 */
    {1,0,0,0,1,0,0},  /* 2: vecini 0,4 */
    {0,1,0,0,0,1,0},  /* 3: vecini 1,5 */
    {0,0,1,0,0,0,1},  /* 4: vecini 2,6 */
    {0,0,0,1,0,0,0},  /* 5: vecini 3 */
    {0,0,0,0,1,0,0}   /* 6: vecini 4 */
};

int vizitat[N];

void dfs(int v) {
    vizitat[v] = 1;
    printf("%d ", v);
    for (int u = 0; u < N; u++) {
        if (adj[v][u] && !vizitat[u]) {
            dfs(u);
        }
    }
}

/* DFS de la 0: 0 1 3 5 2 4 6 */
\`\`\`

**BFS — iterativ (cu coadă):**
\`\`\`c
#include <string.h>

int dist[N];  /* distanța de la start */

void bfs(int start) {
    int coada[N], front = 0, back = 0;
    int vizitat[N];
    memset(vizitat, 0, sizeof(vizitat));
    memset(dist, -1, sizeof(dist));

    coada[back++] = start;
    vizitat[start] = 1;
    dist[start] = 0;

    while (front != back) {
        int v = coada[front++];
        printf("%d(d=%d) ", v, dist[v]);

        for (int u = 0; u < N; u++) {
            if (adj[v][u] && !vizitat[u]) {
                vizitat[u] = 1;
                dist[u] = dist[v] + 1;
                coada[back++] = u;
            }
        }
    }
}
/* BFS de la 0: 0(d=0) 1(d=1) 2(d=1) 3(d=2) 4(d=2) 5(d=3) 6(d=3) */
\`\`\`

**Comparație DFS vs BFS:**
| Aspect | DFS | BFS |
|--------|-----|-----|
| Structură | Stivă (recursiv/explicit) | Coadă |
| Spațiu | O(h) — h=adâncime | O(w) — w=lărgime |
| Drum cel mai scurt | Nu | Da (pt. grafuri neponderate) |
| Detectare ciclu | Ușor | Posibil |
| Componente conexe | Da | Da |
| Toposort | Da | Nu (direct) |`
  },
  {
    lesson: "29. Grafuri în C — BFS, DFS, Shortest Path",
    title: "Detecție Cicluri și Componente Conexe",
    content: `Detectarea **ciclurilor** și identificarea **componentelor conexe** sunt algoritmi fundamentali pe grafuri, bazate pe DFS/BFS cu marcare de stare.

**Detecție ciclu — graf neorientat (DFS):**
\`\`\`c
#define N 6
int adj[N][N];
int vizitat[N];

/* Returnează 1 dacă găsește ciclu */
int dfs_ciclu(int v, int parinte) {
    vizitat[v] = 1;
    for (int u = 0; u < N; u++) {
        if (!adj[v][u]) continue;
        if (!vizitat[u]) {
            if (dfs_ciclu(u, v)) return 1;
        } else if (u != parinte) {
            return 1;  /* muchie înapoi = ciclu */
        }
    }
    return 0;
}

int are_ciclu(void) {
    memset(vizitat, 0, sizeof(vizitat));
    for (int i = 0; i < N; i++)
        if (!vizitat[i] && dfs_ciclu(i, -1)) return 1;
    return 0;
}
\`\`\`

**Componente conexe — DFS cu colorare:**
\`\`\`c
int componenta[N];   /* componenta[i] = id-ul componentei nod i */
int nr_componente = 0;

void dfs_componenta(int v, int comp_id) {
    componenta[v] = comp_id;
    for (int u = 0; u < N; u++) {
        if (adj[v][u] && componenta[u] == -1) {
            dfs_componenta(u, comp_id);
        }
    }
}

void gaseste_componente(void) {
    memset(componenta, -1, sizeof(componenta));
    for (int i = 0; i < N; i++) {
        if (componenta[i] == -1) {
            dfs_componenta(i, nr_componente++);
        }
    }
    printf("Nr componente: %d\\n", nr_componente);
    for (int i = 0; i < N; i++)
        printf("Nod %d → Comp %d\\n", i, componenta[i]);
}
\`\`\`

**Detecție ciclu — graf orientat (DFS cu culori):**
\`\`\`c
/* 0=nevizitat, 1=in_curs (gri), 2=terminat (negru) */
int culoare[N];

int dfs_ciclu_orientat(int v) {
    culoare[v] = 1;  /* gri — în curs de procesare */
    for (int u = 0; u < N; u++) {
        if (!adj[v][u]) continue;
        if (culoare[u] == 1) return 1;  /* muchie la nod gri = ciclu */
        if (culoare[u] == 0 && dfs_ciclu_orientat(u)) return 1;
    }
    culoare[v] = 2;  /* negru — terminat */
    return 0;
}

int are_ciclu_orientat(void) {
    memset(culoare, 0, sizeof(culoare));
    for (int i = 0; i < N; i++)
        if (!culoare[i] && dfs_ciclu_orientat(i)) return 1;
    return 0;
}
\`\`\``
  },
  {
    lesson: "30. Mini Proiect C — Sistem de Gestiune cu Structuri Avansate",
    title: "Arhitectura Proiectului în C",
    content: `Proiectul de gestiune demonstrează integrarea: structuri avansate, alocare dinamică, fișiere binare și un REPL — un mini-sistem complet de management al datelor.

**Specificații sistem:**
• Gestiunea a N înregistrări (studenți, produse, angajați — la alegere)
• Operații CRUD: Create, Read, Update, Delete
• Persistența datelor în fișier binar
• Căutare și sortare
• Interfață REPL (linie de comandă)

**Structura proiectului:**
\`\`\`
gestiune/
├── main.c       — REPL și main loop
├── entitate.h   — typedef și prototipuri
├── entitate.c   — logică pe entități
├── db.h         — interfața bazei de date
├── db.c         — persistență fișier binar
├── ui.h         — interfața utilizatorului
├── ui.c         — afișare și input
└── Makefile
\`\`\`

**entitate.h — tipuri centrale:**
\`\`\`c
#ifndef ENTITATE_H
#define ENTITATE_H

#include <stdint.h>

typedef struct {
    uint32_t id;
    char     nume[60];
    char     email[80];
    int      varsta;
    float    medie;
    int      activ;
} Student;

/* CRUD */
Student* student_new(uint32_t id, const char *n, const char *e,
                     int varsta, float medie);
void     student_free(Student *s);
void     student_print(const Student *s);

/* Comparatoare pentru qsort */
int cmp_student_id(const void *a, const void *b);
int cmp_student_medie(const void *a, const void *b);
int cmp_student_nume(const void *a, const void *b);

#endif
\`\`\`

**db.h — interfața persistenței:**
\`\`\`c
#ifndef DB_H
#define DB_H

#include "entitate.h"

typedef struct {
    Student *data;
    int      len;
    int      cap;
    char     path[256];
    int      modificat;  /* flag — există modificări nesalvate */
} Database;

Database* db_new(const char *path);
void      db_free(Database *db);

int  db_load(Database *db);    /* citește din fișier */
int  db_save(Database *db);    /* scrie în fișier */

int  db_insert(Database *db, const Student *s);
int  db_delete(Database *db, uint32_t id);
Student* db_find_by_id(Database *db, uint32_t id);
void db_sort(Database *db, int (*cmp)(const void*, const void*));
void db_print_all(const Database *db);

#endif
\`\`\`

**REPL — interfața text:**
\`\`\`
gestiune> help
Comenzi: add, list, find <id>, delete <id>, sort <field>, save, load, quit

gestiune> add
ID: 101
Nume: Ion Popescu
Email: ion@example.com
Varsta: 20
Medie: 8.5
[Adaugat: Ion Popescu #101]

gestiune> list
[101] Ion Popescu (ion@example.com) - medie: 8.5

gestiune> sort medie
[Sortat dupa medie descendent]

gestiune> save
[Salvat: 1 inregistrari in db.bin]
\`\`\``
  },
  {
    lesson: "Sockets si Retele in C",
    title: "Introducere in Sockets BSD",
    content: `**Socket-urile BSD** sunt interfața standard POSIX pentru comunicare în rețea. Un socket e ca un fișier special — poți citi și scrie din/în el, dar transferul are loc prin rețea.

**Concepte fundamentale:**
• **Socket** — punct final de comunicare (ca un telefon în conversație)
• **Server** — ascultă pe un port, acceptă conexiuni
• **Client** — inițiază conexiunea la server
• **TCP** — connection-oriented, reliable, ordered delivery
• **UDP** — connectionless, fast, no guarantee

**Header-ele necesare:**
\`\`\`c
#include <sys/types.h>
#include <sys/socket.h>    /* socket(), bind(), listen(), accept() */
#include <netinet/in.h>    /* struct sockaddr_in */
#include <arpa/inet.h>     /* inet_addr(), htons() */
#include <unistd.h>        /* close(), read(), write() */
#include <string.h>
#include <stdio.h>
\`\`\`

**Server TCP minimal:**
\`\`\`c
int main(void) {
    /* 1. Creare socket */
    int srv = socket(AF_INET, SOCK_STREAM, 0);
    if (srv < 0) { perror("socket"); return 1; }

    /* Reuse address — evită "Address already in use" la restart rapid */
    int opt = 1;
    setsockopt(srv, SOL_SOCKET, SO_REUSEADDR, &opt, sizeof(opt));

    /* 2. Bind — leagă socket-ul de adresă + port */
    struct sockaddr_in addr = {0};
    addr.sin_family      = AF_INET;
    addr.sin_addr.s_addr = INADDR_ANY;   /* orice interfață */
    addr.sin_port        = htons(8080);  /* port 8080, network byte order */

    if (bind(srv, (struct sockaddr*)&addr, sizeof(addr)) < 0) {
        perror("bind"); close(srv); return 1;
    }

    /* 3. Listen — maxim 5 conexiuni în așteptare */
    if (listen(srv, 5) < 0) { perror("listen"); return 1; }
    printf("Server pe port 8080...\\n");

    /* 4. Accept — blochează până vine o conexiune */
    struct sockaddr_in client_addr;
    socklen_t clen = sizeof(client_addr);
    int client = accept(srv, (struct sockaddr*)&client_addr, &clen);
    printf("Client conectat: %s\\n", inet_ntoa(client_addr.sin_addr));

    /* 5. Comunicare */
    char buf[1024];
    ssize_t n = read(client, buf, sizeof(buf)-1);
    buf[n] = '\\0';
    printf("Primit: %s\\n", buf);
    write(client, "OK\\n", 3);

    close(client);
    close(srv);
    return 0;
}
\`\`\`

**Client TCP minimal:**
\`\`\`c
int sock = socket(AF_INET, SOCK_STREAM, 0);
struct sockaddr_in srv = {0};
srv.sin_family = AF_INET;
srv.sin_port = htons(8080);
inet_pton(AF_INET, "127.0.0.1", &srv.sin_addr);
connect(sock, (struct sockaddr*)&srv, sizeof(srv));
write(sock, "Hello!", 6);
\`\`\``
  },
  {
    lesson: "Threads POSIX in C",
    title: "pthread_create si ciclul de viata al unui thread",
    content: `**POSIX Threads (pthreads)** permit execuția paralelă a mai multor fire de execuție în același proces. Fiecare thread are propriul stack dar partajează memoria procesului.

**Creare și așteptare thread:**
\`\`\`c
#include <pthread.h>
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>

/* Funcția executată de thread — semnătură fixă */
void* functie_thread(void *arg) {
    int id = *(int*)arg;
    printf("Thread %d: pornit\\n", id);
    sleep(1);  /* simulează muncă */
    printf("Thread %d: terminat\\n", id);
    return (void*)(long)id;  /* valoarea returnată */
}

int main(void) {
    pthread_t threads[4];
    int ids[4];

    /* Creare 4 thread-uri */
    for (int i = 0; i < 4; i++) {
        ids[i] = i;
        if (pthread_create(&threads[i], NULL, functie_thread, &ids[i]) != 0) {
            perror("pthread_create"); return 1;
        }
    }

    /* Așteptare finalizare — join */
    for (int i = 0; i < 4; i++) {
        void *ret;
        pthread_join(threads[i], &ret);
        printf("Thread %d a returnat: %ld\\n", i, (long)ret);
    }
    printf("Toate thread-urile au terminat\\n");
    return 0;
}
/* Compilare: gcc -lpthread prog.c -o prog */
\`\`\`

**Ciclul de viață al unui thread:**
\`\`\`
pthread_create()
    → thread pornit (stare: running)
    → execută funcția dată
    → return din funcție sau pthread_exit()
    → stare: zombie (până la pthread_join sau DETACHED)

pthread_join()  — main thread așteaptă finalizarea
pthread_detach() — thread-ul se termină independent, fără join
\`\`\`

**Atribute thread — stack size, etc.:**
\`\`\`c
pthread_attr_t attr;
pthread_attr_init(&attr);
pthread_attr_setstacksize(&attr, 2 * 1024 * 1024);  /* 2MB stack */
pthread_attr_setdetachstate(&attr, PTHREAD_CREATE_DETACHED);

pthread_t t;
pthread_create(&t, &attr, func, NULL);
pthread_attr_destroy(&attr);
\`\`\`

**pthread_exit — terminare voluntară:**
\`\`\`c
void* worker(void *arg) {
    for (int i = 0; i < 100; i++) {
        if (conditie_de_stop) pthread_exit(NULL);
        /* muncă */
    }
    return NULL;
}
\`\`\``
  },
  {
    lesson: "Threads POSIX in C",
    title: "Mutex — excludere mutuala",
    content: `**Mutex** (Mutual Exclusion) previne accesul simultan al mai multor thread-uri la o resursă partajată — un **lock** pe o secțiune critică de cod.

**Problema race condition fără mutex:**
\`\`\`c
/* GREȘIT — race condition */
int counter = 0;  /* variabilă partajată */

void* incrementeaza(void *arg) {
    for (int i = 0; i < 1000000; i++) {
        counter++;  /* nu e atomic! — read-modify-write în 3 pași */
    }
    return NULL;
}
/* 2 thread-uri → counter poate fi < 2.000.000 */
\`\`\`

**Fix — mutex:**
\`\`\`c
#include <pthread.h>
#include <stdio.h>

int counter = 0;
pthread_mutex_t mtx = PTHREAD_MUTEX_INITIALIZER;  /* inițializare statică */

void* incrementeaza(void *arg) {
    for (int i = 0; i < 1000000; i++) {
        pthread_mutex_lock(&mtx);    /* blochează mutex */
        counter++;                    /* secțiune critică */
        pthread_mutex_unlock(&mtx);  /* eliberează mutex */
    }
    return NULL;
}

int main(void) {
    pthread_t t1, t2;
    pthread_create(&t1, NULL, incrementeaza, NULL);
    pthread_create(&t2, NULL, incrementeaza, NULL);
    pthread_join(t1, NULL);
    pthread_join(t2, NULL);
    printf("Counter: %d\\n", counter);  /* 2000000 garantat */

    pthread_mutex_destroy(&mtx);  /* curățare */
    return 0;
}
\`\`\`

**Mutex dinamic — inițializare programatică:**
\`\`\`c
pthread_mutex_t mtx;
pthread_mutex_init(&mtx, NULL);  /* NULL = atribute default */
/* ... */
pthread_mutex_destroy(&mtx);
\`\`\`

**Deadlock — problema clasică:**
\`\`\`c
/* DEADLOCK: thread1 deține A, vrea B
             thread2 deține B, vrea A */
/* Fix: impune o ordine consistentă de achiziție */

/* Thread1 */
pthread_mutex_lock(&mtx_A);
pthread_mutex_lock(&mtx_B);   /* ORDINE: A întotdeauna înainte de B */

/* Thread2 */
pthread_mutex_lock(&mtx_A);   /* aceeași ordine A, B */
pthread_mutex_lock(&mtx_B);
\`\`\`

**Trylock — non-blocking:**
\`\`\`c
if (pthread_mutex_trylock(&mtx) == 0) {
    /* Succes — mutex-ul e al nostru */
    /* ... */
    pthread_mutex_unlock(&mtx);
} else {
    /* Mutex-ul e ocupat — fă altceva */
}
\`\`\``
  },
  {
    lesson: "Signals si Process Management in C",
    title: "Semnale — trimitere si receptie",
    content: `**Semnalele** sunt notificări asincrone trimise unui proces — interrupt din tastatură (Ctrl+C = SIGINT), kill, alarm, violarea memoriei (SIGSEGV), etc.

**Semnale frecvente:**
| Semnal | Număr | Cauza implicită |
|--------|-------|----------------|
| SIGINT | 2 | Ctrl+C — interrupt |
| SIGTERM | 15 | Terminare "politicoasă" |
| SIGKILL | 9 | Terminare forțată (nu poate fi prins) |
| SIGSEGV | 11 | Segfault — acces memorie invalid |
| SIGALRM | 14 | Timer expirat (alarm()) |
| SIGPIPE | 13 | Scriere în pipe fără cititor |
| SIGCHLD | 17 | Proces copil s-a terminat |

**Înregistrare handler — sigaction:**
\`\`\`c
#include <signal.h>
#include <stdio.h>
#include <unistd.h>
#include <stdatomic.h>

volatile sig_atomic_t running = 1;  /* variabilă safe în handler */

void handler_sigint(int signum) {
    (void)signum;
    printf("\\nPrimit SIGINT — oprire curata...\\n");
    running = 0;  /* flag — handler nu face mai mult */
}

int main(void) {
    /* Înregistrare cu sigaction (mai portabil decât signal()) */
    struct sigaction sa = {0};
    sa.sa_handler = handler_sigint;
    sigemptyset(&sa.sa_mask);         /* nu blochează alte semnale în handler */
    sa.sa_flags = SA_RESTART;         /* reporneste syscall-uri întrerupte */

    if (sigaction(SIGINT, &sa, NULL) < 0) { perror("sigaction"); return 1; }

    printf("Rulând... Ctrl+C pentru stop\\n");
    while (running) {
        /* muncă */
        sleep(1);
        printf(".");
        fflush(stdout);
    }
    printf("\\nOprit curat.\\n");
    return 0;
}
\`\`\`

**Trimitere semnal — kill():**
\`\`\`c
#include <signal.h>
#include <sys/types.h>

/* Trimite SIGTERM la procesul cu PID dat */
kill(pid, SIGTERM);

/* Trimite semnal la propriul proces */
raise(SIGALRM);    /* echivalent cu kill(getpid(), SIGALRM) */

/* alarm() — generează SIGALRM după n secunde */
alarm(5);  /* SIGALRM în 5 secunde */
\`\`\`

**Reguli pentru signal handlers:**
• Folosește doar funcții **async-signal-safe** (write, _exit, dar nu printf!)
• Variabilele accesate din handler = \`volatile sig_atomic_t\`
• Setează doar un flag în handler — logica în main loop`
  },
  {
    lesson: "Interfata C cu Python",
    title: "cffi — alternativa moderna la ctypes",
    content: `**cffi** (C Foreign Function Interface) este alternativa modernă la ctypes — mai curată, mai rapidă și mai type-safe. Permite apelarea bibliotecilor C din Python fără a scrie extension modules.

**Instalare:**
\`\`\`bash
pip install cffi
\`\`\`

**Modul ABI (in-line) — fără compilare:**
\`\`\`python
from cffi import FFI

ffi = FFI()

# Declară interfața C (prototipuri)
ffi.cdef("""
    int aduna(int a, int b);
    double sqrt(double x);
    char* strrev(char *s);
""")

# Încarcă biblioteca
lib = ffi.dlopen(None)  # None = libC

# Apeluri
rez = lib.aduna(5, 3)
print(f"5 + 3 = {rez}")  # 8

import math
print(lib.sqrt(16.0))    # 4.0
\`\`\`

**Modul API (out-of-line) — compilat, mai rapid:**
\`\`\`python
# build_mylib.py — script de compilare
from cffi import FFI

ffi = FFI()

ffi.cdef("""
    typedef struct { int x; int y; } Punct;
    Punct aduna_puncte(Punct a, Punct b);
    double distanta(Punct a, Punct b);
""")

ffi.set_source("_mylib",  # numele modulului generat
    """
    #include "mylib.h"
    """,
    sources=["mylib.c"],
)

if __name__ == "__main__":
    ffi.compile(verbose=True)
\`\`\`

\`\`\`python
# utilizare după compilare
from _mylib import ffi, lib

a = ffi.new("Punct *", {"x": 1, "y": 2})
b = ffi.new("Punct *", {"x": 4, "y": 6})

c = lib.aduna_puncte(a[0], b[0])
print(f"Suma: ({c.x}, {c.y})")  # (5, 8)

d = lib.distanta(a[0], b[0])
print(f"Distanta: {d:.2f}")      # 5.00
\`\`\`

**cffi vs ctypes:**
| Aspect | ctypes | cffi |
|--------|--------|------|
| Declarații | Python descriptors | Header C real |
| Viteză | Mediu | Rapid (API mode) |
| Type safety | Slab | Bun |
| Structuri | Complexe | Simple |
| Pointeri | Manual | Natural |
| Recomandare | Biblioteci existente simple | Proiecte noi |`
  },
  {
    lesson: "Mini Proiect C — Server HTTP Simplu",
    title: "Protocolul HTTP/1.0 — structura cererii si raspunsului",
    content: `**HTTP/1.0** este un protocol text pe TCP. Implementarea unui server HTTP de bază demonstrează integrarea socket-urilor, parsing-ului de string-uri și I/O de fișiere.

**Formatul unei cereri HTTP:**
\`\`\`
GET /index.html HTTP/1.0\\r\\n
Host: localhost:8080\\r\\n
User-Agent: curl/7.68.0\\r\\n
Accept: */*\\r\\n
\\r\\n
\`\`\`

**Formatul unui răspuns HTTP:**
\`\`\`
HTTP/1.0 200 OK\\r\\n
Content-Type: text/html\\r\\n
Content-Length: 42\\r\\n
\\r\\n
<html><body>Hello, World!</body></html>
\`\`\`

**Parsare cerere HTTP:**
\`\`\`c
#include <string.h>
#include <stdio.h>

typedef struct {
    char method[16];   /* GET, POST, HEAD */
    char path[256];    /* /index.html */
    char version[16];  /* HTTP/1.0 */
} HttpRequest;

int parse_request(const char *raw, HttpRequest *req) {
    /* Prima linie: "METHOD PATH VERSION" */
    return sscanf(raw, "%15s %255s %15s", req->method, req->path, req->version) == 3;
}
\`\`\`

**Server HTTP minimal — servește fișiere statice:**
\`\`\`c
#include <sys/socket.h>
#include <netinet/in.h>
#include <unistd.h>
#include <fcntl.h>
#include <sys/stat.h>

void trimite_raspuns(int client, int status, const char *mime, const char *body) {
    char header[512];
    snprintf(header, sizeof(header),
             "HTTP/1.0 %d OK\\r\\n"
             "Content-Type: %s\\r\\n"
             "Content-Length: %zu\\r\\n"
             "Connection: close\\r\\n"
             "\\r\\n",
             status, mime, strlen(body));
    write(client, header, strlen(header));
    write(client, body, strlen(body));
}

void proceseaza_client(int client) {
    char buf[4096] = {0};
    read(client, buf, sizeof(buf)-1);

    HttpRequest req;
    if (!parse_request(buf, &req)) {
        trimite_raspuns(client, 400, "text/plain", "Bad Request");
        return;
    }

    /* Servire fișier */
    char path[300];
    snprintf(path, sizeof(path), ".%s", req.path);
    if (strcmp(req.path, "/") == 0) snprintf(path, sizeof(path), "./index.html");

    FILE *f = fopen(path, "r");
    if (!f) {
        trimite_raspuns(client, 404, "text/plain", "Not Found");
        return;
    }

    /* Citire conținut */
    fseek(f, 0, SEEK_END); long size = ftell(f); rewind(f);
    char *content = malloc(size+1);
    fread(content, 1, size, f); content[size] = '\\0';
    fclose(f);

    trimite_raspuns(client, 200, "text/html", content);
    free(content);
}
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
