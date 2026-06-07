"use strict";
require("dotenv").config({ path: ".env" });
const { PrismaClient } = require("@prisma/client");
const p = new PrismaClient();

// All lookups use titleContains + lessonContains to handle mojibake em-dash titles
const UPDATES = [
  {
    lessonContains: "Hash Tables",
    titleContains: "Coliziuni",
    content: `**Coliziunea** apare când două chei diferite produc același index hash. Există două strategii principale de rezolvare: **Separate Chaining** (liste înlănțuite) și **Open Addressing** (probing).

**Separate Chaining — lanțuri de liste:**
\`\`\`c
/* Fiecare bucket conține o listă înlănțuită */
typedef struct Entry {
    char        *key;
    int          val;
    struct Entry *next;
} Entry;

Entry *buckets[64] = {NULL};

void set(const char *key, int val) {
    int idx = hash(key) % 64;
    /* Caută dacă cheia există deja */
    for (Entry *e = buckets[idx]; e; e = e->next) {
        if (!strcmp(e->key, key)) { e->val = val; return; }
    }
    /* Inserare la începutul listei */
    Entry *n = malloc(sizeof(Entry));
    n->key  = strdup(key);
    n->val  = val;
    n->next = buckets[idx];
    buckets[idx] = n;
}

int get(const char *key, int *out) {
    int idx = hash(key) % 64;
    for (Entry *e = buckets[idx]; e; e = e->next) {
        if (!strcmp(e->key, key)) { *out = e->val; return 1; }
    }
    return 0;
}
\`\`\`

**Open Addressing — Linear Probing:**
\`\`\`c
#define CAP 64
#define EMPTY  0
#define FILLED 1
#define DELETED 2

typedef struct { char key[50]; int val; int state; } Slot;
Slot table[CAP];

int probe(const char *key, int for_insert) {
    int idx = hash(key) % CAP;
    for (int i = 0; i < CAP; i++) {
        int j = (idx + i) % CAP;
        if (table[j].state == EMPTY) return for_insert ? j : -1;
        if (table[j].state == DELETED) { if (for_insert) return j; continue; }
        if (!strcmp(table[j].key, key)) return j;
    }
    return -1;  /* full */
}

void lp_set(const char *key, int val) {
    int i = probe(key, 1);
    if (i < 0) { fprintf(stderr, "Table full\\n"); return; }
    strncpy(table[i].key, key, 49);
    table[i].val   = val;
    table[i].state = FILLED;
}

int lp_get(const char *key, int *out) {
    int i = probe(key, 0);
    if (i < 0) return 0;
    *out = table[i].val;
    return 1;
}
\`\`\`

**Quadratic Probing — mai puține cluster-uri:**
\`\`\`c
/* probe: (idx + i²) % CAP */
int j = (idx + i*i) % CAP;
\`\`\`

**Comparație strategii coliziune:**
| Aspect | Separate Chaining | Linear Probing |
|--------|-----------------|----------------|
| Memorie extra | Per nod malloc | 0 |
| Cache | Unfriendly | **Friendly** |
| Load factor max | >1 posibil | ~0.7 |
| Implementare | Simplă | Complexă (delete) |
| Performance | Bun | **Excelent** la LF mic |`
  },
  {
    lessonContains: "Hash Tables",
    titleContains: "Aplicatii Practice",
    content: `Hash Table-urile sunt una dintre structurile de date cel mai frecvent folosite — de la tabele de simboluri în compilatoare la caching și indexare.

**1. Numărare frecvențe (word count):**
\`\`\`c
#include <stdio.h>
#include <string.h>
#include <stdlib.h>

#define CAP 256

typedef struct Entry { char key[64]; int count; struct Entry *next; } Entry;
Entry *freq[CAP];

size_t hash_str(const char *s) {
    size_t h = 5381;
    while (*s) h = h * 33 + (unsigned char)*s++;
    return h % CAP;
}

void incrementa(const char *word) {
    size_t idx = hash_str(word);
    for (Entry *e = freq[idx]; e; e = e->next) {
        if (!strcmp(e->key, word)) { e->count++; return; }
    }
    Entry *n = calloc(1, sizeof(Entry));
    strncpy(n->key, word, 63);
    n->count = 1;
    n->next = freq[idx];
    freq[idx] = n;
}

void print_freq(void) {
    for (int i = 0; i < CAP; i++)
        for (Entry *e = freq[i]; e; e = e->next)
            printf("%-20s: %d\\n", e->key, e->count);
}

int main(void) {
    char word[64];
    while (scanf("%63s", word) == 1) incrementa(word);
    print_freq();
    return 0;
}
\`\`\`

**2. Cache LRU simplificat cu hash table:**
\`\`\`c
/* Hash table + linked list pentru ordinea accesului */
/* O(1) get/put — folosit în sisteme de caching reale */

typedef struct CacheNode {
    int key, val;
    struct CacheNode *prev, *next;
} CacheNode;

typedef struct {
    CacheNode *map[64];  /* hash table */
    CacheNode *head, *tail;  /* LRU order */
    int capacity, size;
} LRUCache;
\`\`\`

**3. Tabela de simboluri — compilator:**
\`\`\`c
typedef enum { SYM_VAR, SYM_FUNC, SYM_CONST } SymType;

typedef struct Symbol {
    char       name[64];
    SymType    type;
    int        offset;   /* adresa în stack frame */
    int        is_const;
    struct Symbol *next;
} Symbol;

Symbol *sym_table[128];

void sym_define(const char *name, SymType type, int offset) {
    size_t idx = hash_str(name) % 128;
    Symbol *s = calloc(1, sizeof(Symbol));
    strncpy(s->name, name, 63);
    s->type   = type;
    s->offset = offset;
    s->next   = sym_table[idx];
    sym_table[idx] = s;
}

Symbol* sym_lookup(const char *name) {
    size_t idx = hash_str(name) % 128;
    for (Symbol *s = sym_table[idx]; s; s = s->next)
        if (!strcmp(s->name, name)) return s;
    return NULL;  /* undefined */
}
\`\`\`

**4. Deduplicare — seturi unice:**
\`\`\`c
int visited[CAP]; char visited_keys[CAP][64]; int vlen = 0;

int set_add(const char *key) {
    size_t idx = hash_str(key) % CAP;
    for (int i = 0; i < vlen; i++)
        if (!strcmp(visited_keys[i], key)) return 0;  /* exista deja */
    strncpy(visited_keys[vlen++], key, 63);
    return 1;  /* nou element */
}
\`\`\``
  },
  {
    lessonContains: "Arbori Binari",
    titleContains: "Parcurgeri",
    content: `**Parcurgerile** (traversals) definesc ordinea în care vizitezi nodurile unui arbore. Cele trei parcurgeri fundamentale se bazează pe DFS și diferă prin **când** procesezi nodul rădăcină.

**Cele 3 parcurgeri DFS:**
\`\`\`c
typedef struct Nod { int val; struct Nod *st, *dr; } Nod;

/* IN-ORDER: stânga → rădăcină → dreapta (produce ordine SORTATĂ pe BST) */
void inorder(const Nod *n) {
    if (!n) return;
    inorder(n->st);
    printf("%d ", n->val);
    inorder(n->dr);
}

/* PRE-ORDER: rădăcină → stânga → dreapta (copiere arbore, serializare) */
void preorder(const Nod *n) {
    if (!n) return;
    printf("%d ", n->val);
    preorder(n->st);
    preorder(n->dr);
}

/* POST-ORDER: stânga → dreapta → rădăcină (ștergere arbore, evaluare expresii) */
void postorder(const Nod *n) {
    if (!n) return;
    postorder(n->st);
    postorder(n->dr);
    printf("%d ", n->val);
}
\`\`\`

**BFS — Level-Order traversal (cu coadă):**
\`\`\`c
void level_order(Nod *root) {
    if (!root) return;
    Nod *q[100]; int front = 0, back = 0;
    q[back++] = root;

    while (front != back) {
        Nod *n = q[front++];
        printf("%d ", n->val);
        if (n->st) q[back++] = n->st;
        if (n->dr) q[back++] = n->dr;
    }
}
\`\`\`

**Exemplu pe BST:**
\`\`\`
          8
         / \\
        3   10
       / \\    \\
      1   6    14

In-order:    1 3 6 8 10 14   (SORTAT!)
Pre-order:   8 3 1 6 10 14   (pentru reconstrucție)
Post-order:  1 6 3 14 10 8   (pentru ștergere)
Level-order: 8 3 10 1 6 14   (nivel cu nivel)
\`\`\`

**Traversal iterativ cu stivă explicită (in-order):**
\`\`\`c
void inorder_iterativ(Nod *root) {
    Nod *stk[100]; int top = -1;
    Nod *curent = root;

    while (curent || top >= 0) {
        /* Merge la stânga cât mai mult */
        while (curent) { stk[++top] = curent; curent = curent->st; }
        /* Vizitează nodul */
        curent = stk[top--];
        printf("%d ", curent->val);
        /* Continuă spre dreapta */
        curent = curent->dr;
    }
}
\`\`\`

**Numărare noduri și calculul sumei:**
\`\`\`c
int count_nodes(const Nod *n) {
    if (!n) return 0;
    return 1 + count_nodes(n->st) + count_nodes(n->dr);
}

int sum_nodes(const Nod *n) {
    if (!n) return 0;
    return n->val + sum_nodes(n->st) + sum_nodes(n->dr);
}
\`\`\``
  },
  {
    lessonContains: "Arbori Binari",
    titleContains: "Inaltimea",
    content: `**Înălțimea** unui arbore e distanța maximă de la rădăcină la o frunză. Un arbore **echilibrat** asigură înălțime O(log n) și operații O(log n).

**Calculul înălțimii:**
\`\`\`c
typedef struct Nod { int val; struct Nod *st, *dr; } Nod;

int inaltime(const Nod *n) {
    if (!n) return -1;  /* -1 pentru arbore gol, 0 pentru frunze */
    int h_st = inaltime(n->st);
    int h_dr = inaltime(n->dr);
    return 1 + (h_st > h_dr ? h_st : h_dr);
}
/* Arbore cu 1 nod: înălțime 0 */
/* Arbore cu rădăcină + 2 copii: înălțime 1 */
\`\`\`

**Verificare arbore echilibrat (AVL condition):**
\`\`\`c
/* Echilibrat = pentru orice nod, |h(stâng) - h(drept)| <= 1 */
int este_echilibrat(const Nod *n) {
    if (!n) return 1;
    int h_st = inaltime(n->st);
    int h_dr = inaltime(n->dr);
    int diff = h_st - h_dr;
    if (diff < -1 || diff > 1) return 0;
    return este_echilibrat(n->st) && este_echilibrat(n->dr);
}
\`\`\`

**Lățimea maximă (nivel cu cei mai mulți noduri):**
\`\`\`c
int latimea_maxima(Nod *root) {
    if (!root) return 0;
    Nod *q[200]; int front = 0, back = 0;
    q[back++] = root;
    int max_lat = 0;

    while (front != back) {
        int nivel_size = back - front;
        if (nivel_size > max_lat) max_lat = nivel_size;
        for (int i = 0; i < nivel_size; i++) {
            Nod *n = q[front++];
            if (n->st) q[back++] = n->st;
            if (n->dr) q[back++] = n->dr;
        }
    }
    return max_lat;
}
\`\`\`

**Ștergere nod din BST:**
\`\`\`c
Nod* gaseste_min(Nod *n) {
    while (n->st) n = n->st;
    return n;
}

Nod* bst_delete(Nod *root, int val) {
    if (!root) return NULL;
    if (val < root->val) root->st = bst_delete(root->st, val);
    else if (val > root->val) root->dr = bst_delete(root->dr, val);
    else {
        /* Nod de șters găsit */
        if (!root->st) { Nod *dr = root->dr; free(root); return dr; }
        if (!root->dr) { Nod *st = root->st; free(root); return st; }
        /* Două subarbori — înlocuiește cu minimul din dreapta */
        Nod *min_dr = gaseste_min(root->dr);
        root->val = min_dr->val;
        root->dr  = bst_delete(root->dr, min_dr->val);
    }
    return root;
}
\`\`\`

**Arbori auto-echilibrați — pentru producție:**
• **AVL tree** — reechilibrează la fiecare inserare/ștergere (rotații)
• **Red-Black tree** — folosit în STL C++ (\`std::map\`), Linux kernel
• **B-tree** — folosit în baze de date (MySQL, PostgreSQL) pentru I/O eficient`
  },
  {
    lessonContains: "Algoritmi de Sortare",
    titleContains: "Heap Sort",
    content: `**Heap Sort** sortează în O(n log n) folosind un **heap binar**. Are avantajul că nu necesită spațiu auxiliar (O(1) extra) și nu are worst case O(n²) ca QuickSort.

**Ce este un Max-Heap:**
\`\`\`
Max-Heap: nodul parinte >= copiii săi
          10
         /  \\
        9    8
       / \\  / \\
      7  5 6   3

Reprezentat ca array: [10, 9, 8, 7, 5, 6, 3]
Parent(i)    = (i-1) / 2
Left child   = 2*i + 1
Right child  = 2*i + 2
\`\`\`

**Heapify — corectare heap:**
\`\`\`c
void heapify(int arr[], int n, int i) {
    int largest = i;
    int left    = 2*i + 1;
    int right   = 2*i + 2;

    if (left  < n && arr[left]  > arr[largest]) largest = left;
    if (right < n && arr[right] > arr[largest]) largest = right;

    if (largest != i) {
        int tmp = arr[i]; arr[i] = arr[largest]; arr[largest] = tmp;
        heapify(arr, n, largest);  /* recursiv — repară în jos */
    }
}
\`\`\`

**Heap Sort complet:**
\`\`\`c
void heap_sort(int arr[], int n) {
    /* Faza 1: Build max-heap (din ultimul nod non-frunza) */
    for (int i = n/2 - 1; i >= 0; i--)
        heapify(arr, n, i);

    /* Faza 2: Extrage max repetat */
    for (int i = n-1; i > 0; i--) {
        /* Mută maximul (arr[0]) la final */
        int tmp = arr[0]; arr[0] = arr[i]; arr[i] = tmp;
        /* Refă heap pe restul */
        heapify(arr, i, 0);
    }
}

int main(void) {
    int arr[] = {12, 11, 13, 5, 6, 7};
    int n = 6;
    heap_sort(arr, n);
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    /* 5 6 7 11 12 13 */
    return 0;
}
\`\`\`

**\`qsort()\` din stdlib.h — cel mai simplu:**
\`\`\`c
#include <stdlib.h>

int cmp_int(const void *a, const void *b) {
    return *(int*)a - *(int*)b;          /* ascendent */
}
int cmp_int_desc(const void *a, const void *b) {
    return *(int*)b - *(int*)a;          /* descendent */
}
int cmp_str(const void *a, const void *b) {
    return strcmp(*(const char**)a, *(const char**)b);
}

/* Utilizare */
int arr[] = {64, 25, 12, 22, 11, 90};
qsort(arr, 6, sizeof(int), cmp_int);
/* 11 12 22 25 64 90 */

const char *cuvinte[] = {"zero","unu","doi","trei"};
qsort(cuvinte, 4, sizeof(char*), cmp_str);
/* doi, trei, unu, zero */
\`\`\``
  },
  {
    lessonContains: "Algoritmi de Sortare",
    titleContains: "Algoritmi de Cautare",
    content: `**Algoritmii de căutare** găsesc elemente în colecții. Alegerea corectă depinde de structura datelor și dacă sunt sortate sau nu.

**Linear Search — O(n):**
\`\`\`c
int linear_search(const int arr[], int n, int target) {
    for (int i = 0; i < n; i++)
        if (arr[i] == target) return i;
    return -1;
}
/* Nu necesită array sortat */
/* Bun pentru array mici sau căutare o singură dată */
\`\`\`

**Binary Search — O(log n) pe array sortat:**
\`\`\`c
int binary_search(const int arr[], int n, int target) {
    int lo = 0, hi = n - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (arr[mid] == target) return mid;
        if (arr[mid] < target)  lo = mid + 1;
        else                    hi = mid - 1;
    }
    return -1;
}
\`\`\`

**Interpolation Search — O(log log n) pe date uniforme:**
\`\`\`c
/* Estimează poziția bazată pe valoare, nu la jumătate */
int interpolation_search(const int arr[], int n, int target) {
    int lo = 0, hi = n - 1;
    while (lo <= hi && target >= arr[lo] && target <= arr[hi]) {
        if (lo == hi) {
            if (arr[lo] == target) return lo;
            return -1;
        }
        /* Formula de interpolare */
        int pos = lo + ((double)(hi - lo) / (arr[hi] - arr[lo]))
                     * (target - arr[lo]);
        if (arr[pos] == target) return pos;
        if (arr[pos] < target)  lo = pos + 1;
        else                    hi = pos - 1;
    }
    return -1;
}
/* Pe date uniform distribuite: ~O(log log n) */
\`\`\`

**Exponential Search — O(log n) pentru array nelimitat:**
\`\`\`c
int exp_search(const int arr[], int n, int target) {
    if (arr[0] == target) return 0;
    int i = 1;
    while (i < n && arr[i] <= target) i *= 2;
    /* Binary search în [i/2, min(i, n-1)] */
    return binary_search(arr + i/2, (i < n ? i : n-1) - i/2 + 1, target);
}
\`\`\`

**Comparație algoritmi de căutare:**
| Algoritm | Preccondiție | Complexitate | Ideal pentru |
|---------|-------------|-------------|-------------|
| Linear | Nimic | O(n) | Nesortate, mici |
| Binary | Sortat | O(log n) | Array mari, sortate |
| Interpolation | Sortat, uniform | O(log log n) | Date uniform distribuite |
| Hash lookup | Hash table | O(1) | Căutare frecventă |`
  },
  {
    lessonContains: "Grafuri",
    titleContains: "Dijkstra",
    content: `**Dijkstra** este algoritmul clasic pentru drumul cel mai scurt dintr-o sursă în grafuri **ponderate** cu muchii **nenegative**. Complexitate O((V+E) log V) cu priority queue.

**Structura grafului ponderat:**
\`\`\`c
#include <stdio.h>
#include <string.h>
#include <limits.h>

#define V 6

/* Graf ponderat ca matrice de adiacență */
int graf[V][V] = {
    {0, 4, 0, 0, 0, 0},
    {4, 0, 8, 0, 0, 0},
    {0, 8, 0, 7, 0, 2},
    {0, 0, 7, 0, 9, 14},
    {0, 0, 0, 9, 0, 10},
    {0, 0, 2, 14,10, 0}
};
\`\`\`

**Dijkstra cu array simplu — O(V²):**
\`\`\`c
int min_dist(int dist[], int visited[]) {
    int min = INT_MAX, min_idx = -1;
    for (int v = 0; v < V; v++)
        if (!visited[v] && dist[v] < min)
            min = dist[v], min_idx = v;
    return min_idx;
}

void dijkstra(int src) {
    int dist[V], visited[V], parent[V];
    for (int i = 0; i < V; i++) {
        dist[i] = INT_MAX; visited[i] = 0; parent[i] = -1;
    }
    dist[src] = 0;

    for (int i = 0; i < V - 1; i++) {
        int u = min_dist(dist, visited);
        if (u == -1) break;
        visited[u] = 1;

        for (int v = 0; v < V; v++) {
            if (!visited[v] && graf[u][v] && dist[u] != INT_MAX
                && dist[u] + graf[u][v] < dist[v]) {
                dist[v] = dist[u] + graf[u][v];
                parent[v] = u;
            }
        }
    }

    /* Afișare rezultate */
    printf("Distante de la nodul %d:\\n", src);
    for (int i = 0; i < V; i++) {
        if (dist[i] == INT_MAX) printf("  %d: ∞\\n", i);
        else printf("  %d: %d\\n", i, dist[i]);
    }
}
\`\`\`

**Reconstrucție drum:**
\`\`\`c
void print_path(int parent[], int v) {
    if (parent[v] == -1) { printf("%d", v); return; }
    print_path(parent, parent[v]);
    printf(" → %d", v);
}

/* Ex: drumul de la 0 la 4: 0 → 1 → 2 → 5 → ... */
\`\`\`

**Algoritmi alternative:**
| Algoritm | Muchii negative | Complexitate |
|---------|----------------|-------------|
| Dijkstra | Nu | O(E log V) |
| Bellman-Ford | Da | O(VE) |
| Floyd-Warshall | Da | O(V³) — all-pairs |
| A* | Nu (heuristic) | O(E) tipic |`
  },
  {
    lessonContains: "Sistem de Gestiune",
    titleContains: "Implementarea Bazei",
    content: `**Implementarea bazei de date** — funcțiile CRUD (Create, Read, Update, Delete) pe colecția dinamică de înregistrări, cu gestionare de erori și validare.

**db.c — implementare completă:**
\`\`\`c
#include "db.h"
#include <stdlib.h>
#include <string.h>
#include <stdio.h>

#define DB_CAP_INITIAL 16

Database* db_new(const char *path) {
    Database *db = calloc(1, sizeof(Database));
    if (!db) return NULL;
    db->data = malloc(DB_CAP_INITIAL * sizeof(Student));
    db->cap  = DB_CAP_INITIAL;
    strncpy(db->path, path, 255);
    return db;
}

void db_free(Database *db) {
    if (!db) return;
    free(db->data);
    free(db);
}

static int db_grow(Database *db) {
    int new_cap = db->cap * 2;
    Student *tmp = realloc(db->data, new_cap * sizeof(Student));
    if (!tmp) return 0;
    db->data = tmp;
    db->cap  = new_cap;
    return 1;
}

int db_insert(Database *db, const Student *s) {
    /* Verifică dacă ID-ul există deja */
    if (db_find_by_id(db, s->id)) {
        fprintf(stderr, "ID %u exista deja\\n", s->id);
        return 0;
    }
    if (db->len == db->cap && !db_grow(db)) {
        fprintf(stderr, "Memorie insuficienta\\n");
        return 0;
    }
    db->data[db->len++] = *s;
    db->modificat = 1;
    return 1;
}

Student* db_find_by_id(Database *db, uint32_t id) {
    for (int i = 0; i < db->len; i++)
        if (db->data[i].id == id) return &db->data[i];
    return NULL;
}

int db_update(Database *db, uint32_t id, const Student *new_data) {
    Student *s = db_find_by_id(db, id);
    if (!s) return 0;
    uint32_t old_id = s->id;
    *s = *new_data;
    s->id = old_id;  /* păstrează ID-ul original */
    db->modificat = 1;
    return 1;
}

int db_delete(Database *db, uint32_t id) {
    for (int i = 0; i < db->len; i++) {
        if (db->data[i].id == id) {
            /* Mută ultimul element la locul celui șters */
            db->data[i] = db->data[--db->len];
            db->modificat = 1;
            return 1;
        }
    }
    return 0;
}

void db_sort(Database *db, int (*cmp)(const void*, const void*)) {
    qsort(db->data, db->len, sizeof(Student), cmp);
}

void db_print_all(const Database *db) {
    if (db->len == 0) { printf("Baza de date goala.\\n"); return; }
    printf("\\n%-6s %-20s %-8s %-6s\\n", "ID", "Nume", "Varsta", "Medie");
    printf("%-6s %-20s %-8s %-6s\\n", "------", "--------------------", "--------", "------");
    for (int i = 0; i < db->len; i++) {
        const Student *s = &db->data[i];
        printf("%-6u %-20s %-8d %-6.1f\\n",
               s->id, s->nume, s->varsta, s->medie);
    }
    printf("Total: %d studenti\\n", db->len);
}
\`\`\``
  },
  {
    lessonContains: "Sistem de Gestiune",
    titleContains: "Sortare, Cautare",
    content: `**Sortarea, căutarea și salvarea** completează sistemul de gestiune — permit accesul eficient la date și persistența lor între sesiuni.

**Funcțiile de sortare cu qsort:**
\`\`\`c
#include "db.h"
#include <stdio.h>
#include <string.h>
#include <stdlib.h>

int cmp_id(const void *a, const void *b) {
    return (int)((const Student*)a)->id - (int)((const Student*)b)->id;
}
int cmp_medie_desc(const void *a, const void *b) {
    float da = ((const Student*)a)->medie;
    float db_ = ((const Student*)b)->medie;
    if (da > db_) return -1;
    if (da < db_) return 1;
    return 0;
}
int cmp_nume(const void *a, const void *b) {
    return strcmp(((const Student*)a)->nume, ((const Student*)b)->nume);
}
int cmp_varsta(const void *a, const void *b) {
    return ((const Student*)a)->varsta - ((const Student*)b)->varsta;
}
\`\`\`

**Căutare cu criterii multiple:**
\`\`\`c
typedef struct {
    int  n;
    Student items[100];
} SearchResult;

SearchResult db_search(const Database *db, const char *query) {
    SearchResult res = {0};
    for (int i = 0; i < db->len && res.n < 100; i++) {
        const Student *s = &db->data[i];
        /* Caută în nume (case-insensitive) */
        char low_name[60], low_q[60];
        for (int j = 0; s->nume[j]; j++) low_name[j] = tolower(s->nume[j]);
        for (int j = 0; query[j]; j++) low_q[j] = tolower(query[j]);
        if (strstr(low_name, low_q)) res.items[res.n++] = *s;
    }
    return res;
}
\`\`\`

**Salvare și încărcare fișier binar:**
\`\`\`c
#define DB_MAGIC 0x44425631  /* "DBV1" */

int db_save(Database *db) {
    FILE *f = fopen(db->path, "wb");
    if (!f) { perror("fopen save"); return 0; }

    uint32_t magic = DB_MAGIC;
    fwrite(&magic,   sizeof(uint32_t), 1, f);
    fwrite(&db->len, sizeof(int),      1, f);
    fwrite(db->data, sizeof(Student),  db->len, f);
    fclose(f);
    db->modificat = 0;
    printf("[Salvat: %d inregistrari in %s]\\n", db->len, db->path);
    return 1;
}

int db_load(Database *db) {
    FILE *f = fopen(db->path, "rb");
    if (!f) return 0;  /* fisier nou — OK */

    uint32_t magic;
    fread(&magic, sizeof(uint32_t), 1, f);
    if (magic != DB_MAGIC) { fclose(f); fprintf(stderr, "Format invalid\\n"); return 0; }

    int n;
    fread(&n, sizeof(int), 1, f);
    while (db->cap < n && db_grow(db));
    fread(db->data, sizeof(Student), n, f);
    db->len = n;
    fclose(f);
    printf("[Incarcat: %d inregistrari din %s]\\n", n, db->path);
    return 1;
}
\`\`\``
  },
  {
    lessonContains: "Sockets",
    titleContains: "Server TCP",
    content: `**Serverul TCP** acceptă conexiuni, citește cereri și răspunde. Implementarea completă folosește \`accept()\`, \`recv()\`, \`send()\` și gestionarea mai multor clienți.

**Server TCP complet cu gestionare mai mulți clienți:**
\`\`\`c
#include <sys/socket.h>
#include <netinet/in.h>
#include <arpa/inet.h>
#include <unistd.h>
#include <stdio.h>
#include <string.h>
#include <stdlib.h>

#define PORT 9000
#define BUF  4096

void handle_client(int client_fd, struct sockaddr_in *addr) {
    char ip[INET_ADDRSTRLEN];
    inet_ntop(AF_INET, &addr->sin_addr, ip, sizeof(ip));
    printf("Client conectat: %s:%d\\n", ip, ntohs(addr->sin_port));

    char buf[BUF];
    ssize_t n;
    while ((n = recv(client_fd, buf, sizeof(buf)-1, 0)) > 0) {
        buf[n] = '\\0';
        printf("[%s] Primit: %s", ip, buf);

        /* Echo — trimite înapoi */
        send(client_fd, buf, n, 0);

        if (strncmp(buf, "quit", 4) == 0) break;
    }
    printf("Client deconectat: %s\\n", ip);
    close(client_fd);
}

int main(void) {
    int srv = socket(AF_INET, SOCK_STREAM, 0);
    if (srv < 0) { perror("socket"); return 1; }

    int opt = 1;
    setsockopt(srv, SOL_SOCKET, SO_REUSEADDR, &opt, sizeof(opt));

    struct sockaddr_in addr = {0};
    addr.sin_family      = AF_INET;
    addr.sin_addr.s_addr = INADDR_ANY;
    addr.sin_port        = htons(PORT);

    if (bind(srv, (struct sockaddr*)&addr, sizeof(addr)) < 0) {
        perror("bind"); close(srv); return 1;
    }
    if (listen(srv, 5) < 0) { perror("listen"); return 1; }

    printf("Echo server pe port %d\\n", PORT);
    printf("Test: nc localhost %d\\n", PORT);

    while (1) {
        struct sockaddr_in client_addr;
        socklen_t clen = sizeof(client_addr);
        int client = accept(srv, (struct sockaddr*)&client_addr, &clen);
        if (client < 0) { perror("accept"); continue; }
        handle_client(client, &client_addr);  /* secvențial */
    }
    close(srv);
    return 0;
}
\`\`\`

**Citire completă a unui mesaj (recv loop):**
\`\`\`c
/* recv poate returna mai puțin decât ceea ce s-a trimis */
ssize_t recv_all(int fd, char *buf, size_t len) {
    size_t total = 0;
    while (total < len) {
        ssize_t n = recv(fd, buf + total, len - total, 0);
        if (n <= 0) return n;  /* 0=disconnected, -1=error */
        total += n;
    }
    return total;
}
\`\`\`

**Compilare și testare:**
\`\`\`bash
gcc -o server server.c
./server &
# În alt terminal:
nc localhost 9000
echo "salut" | nc localhost 9000
\`\`\``
  },
  {
    lessonContains: "Sockets",
    titleContains: "Client TCP",
    content: `**Clientul TCP** inițiază conexiunea la server folosind \`connect()\`. Folosit pentru HTTP, FTP, SSH, baze de date — orice protocol TCP.

**Client TCP complet cu getaddrinfo:**
\`\`\`c
#include <sys/socket.h>
#include <netdb.h>
#include <arpa/inet.h>
#include <unistd.h>
#include <stdio.h>
#include <string.h>

/* getaddrinfo — rezolvare hostname + IPv4/IPv6 */
int conecteaza(const char *host, const char *port) {
    struct addrinfo hints = {0}, *res, *p;
    hints.ai_socktype = SOCK_STREAM;
    hints.ai_family   = AF_UNSPEC;  /* IPv4 sau IPv6 */

    int rc = getaddrinfo(host, port, &hints, &res);
    if (rc != 0) {
        fprintf(stderr, "getaddrinfo: %s\\n", gai_strerror(rc));
        return -1;
    }

    int sock = -1;
    for (p = res; p; p = p->ai_next) {
        sock = socket(p->ai_family, p->ai_socktype, p->ai_protocol);
        if (sock < 0) continue;
        if (connect(sock, p->ai_addr, p->ai_addrlen) == 0) break;
        close(sock); sock = -1;
    }
    freeaddrinfo(res);
    return sock;  /* -1 dacă nicio adresă nu a funcționat */
}

int main(void) {
    int sock = conecteaza("localhost", "9000");
    if (sock < 0) { fprintf(stderr, "Conectare esuata\\n"); return 1; }
    printf("Conectat!\\n");

    /* Trimite și primește */
    const char *msg = "Salut server!\\n";
    send(sock, msg, strlen(msg), 0);

    char buf[1024] = {0};
    ssize_t n = recv(sock, buf, sizeof(buf)-1, 0);
    if (n > 0) printf("Primit: %s", buf);

    close(sock);
    return 0;
}
\`\`\`

**Client HTTP simplu — GET request:**
\`\`\`c
int main(void) {
    int sock = conecteaza("example.com", "80");
    if (sock < 0) return 1;

    /* Trimite cerere HTTP/1.0 */
    const char *req =
        "GET / HTTP/1.0\\r\\n"
        "Host: example.com\\r\\n"
        "Connection: close\\r\\n"
        "\\r\\n";
    send(sock, req, strlen(req), 0);

    /* Citește răspunsul */
    char buf[4096];
    ssize_t n;
    while ((n = recv(sock, buf, sizeof(buf)-1, 0)) > 0) {
        buf[n] = '\\0';
        printf("%s", buf);
    }
    close(sock);
    return 0;
}
\`\`\`

**IPv4 vs IPv6 cu getaddrinfo:**
\`\`\`c
/* Afișare IP-ul la care ne conectăm */
char ip[INET6_ADDRSTRLEN];
if (p->ai_family == AF_INET) {
    struct sockaddr_in *in = (struct sockaddr_in*)p->ai_addr;
    inet_ntop(AF_INET, &in->sin_addr, ip, sizeof(ip));
} else {
    struct sockaddr_in6 *in6 = (struct sockaddr_in6*)p->ai_addr;
    inet_ntop(AF_INET6, &in6->sin6_addr, ip, sizeof(ip));
}
printf("Conectat la: %s\\n", ip);
\`\`\``
  },
  {
    lessonContains: "Sockets",
    titleContains: "UDP",
    content: `**UDP** (User Datagram Protocol) este connectionless — trimite pachete fără confirmare. Ideal pentru streaming, gaming și DNS unde viteza e mai importantă decât fiabilitatea.

**Server UDP:**
\`\`\`c
#include <sys/socket.h>
#include <netinet/in.h>
#include <arpa/inet.h>
#include <unistd.h>
#include <stdio.h>
#include <string.h>

int main(void) {
    int sock = socket(AF_INET, SOCK_DGRAM, 0);  /* SOCK_DGRAM = UDP */
    if (sock < 0) { perror("socket"); return 1; }

    struct sockaddr_in addr = {0};
    addr.sin_family      = AF_INET;
    addr.sin_addr.s_addr = INADDR_ANY;
    addr.sin_port        = htons(9001);

    if (bind(sock, (struct sockaddr*)&addr, sizeof(addr)) < 0) {
        perror("bind"); return 1;
    }
    printf("UDP server pe port 9001\\n");

    char buf[1024];
    struct sockaddr_in client_addr;
    socklen_t clen = sizeof(client_addr);

    while (1) {
        ssize_t n = recvfrom(sock, buf, sizeof(buf)-1, 0,
                             (struct sockaddr*)&client_addr, &clen);
        if (n < 0) break;
        buf[n] = '\\0';
        printf("De la %s: %s\\n", inet_ntoa(client_addr.sin_addr), buf);

        /* Echo înapoi */
        sendto(sock, buf, n, 0,
               (struct sockaddr*)&client_addr, clen);
    }
    close(sock);
    return 0;
}
\`\`\`

**Client UDP:**
\`\`\`c
int sock = socket(AF_INET, SOCK_DGRAM, 0);
struct sockaddr_in srv = {0};
srv.sin_family = AF_INET;
srv.sin_port   = htons(9001);
inet_pton(AF_INET, "127.0.0.1", &srv.sin_addr);

const char *msg = "Salut UDP!";
sendto(sock, msg, strlen(msg), 0, (struct sockaddr*)&srv, sizeof(srv));

char buf[1024]; socklen_t slen = sizeof(srv);
ssize_t n = recvfrom(sock, buf, sizeof(buf)-1, 0,
                     (struct sockaddr*)&srv, &slen);
if (n > 0) { buf[n] = '\\0'; printf("Primit: %s\\n", buf); }
close(sock);
\`\`\`

**select() — I/O multiplexing:**
\`\`\`c
/* Monitorizează mai mulți descriptori simultan */
fd_set read_fds;
FD_ZERO(&read_fds);
FD_SET(sock_tcp, &read_fds);
FD_SET(sock_udp, &read_fds);
int maxfd = (sock_tcp > sock_udp ? sock_tcp : sock_udp) + 1;

struct timeval timeout = {5, 0};  /* 5 secunde */
int ready = select(maxfd, &read_fds, NULL, NULL, &timeout);

if (ready > 0) {
    if (FD_ISSET(sock_tcp, &read_fds)) { /* activitate TCP */ }
    if (FD_ISSET(sock_udp, &read_fds)) { /* activitate UDP */ }
} else if (ready == 0) { printf("Timeout\\n"); }
\`\`\``
  },
  {
    lessonContains: "Signals",
    titleContains: "fork",
    content: `**\`fork()\`** creează un proces copil — o copie a procesului curent. **\`exec()\`** înlocuiește imaginea procesului curent cu un nou program. Combinarea lor e baza shell-urilor UNIX.

**fork() — creare proces:**
\`\`\`c
#include <sys/types.h>
#include <sys/wait.h>
#include <unistd.h>
#include <stdio.h>
#include <stdlib.h>

int main(void) {
    pid_t pid = fork();

    if (pid < 0) {
        perror("fork");
        return 1;
    } else if (pid == 0) {
        /* PROCES COPIL — pid returnat = 0 */
        printf("Copil: PID=%d, PPID=%d\\n", getpid(), getppid());
        exit(0);
    } else {
        /* PROCES PARINTE — pid = PID-ul copilului */
        printf("Parinte: PID=%d, Copil PID=%d\\n", getpid(), pid);

        /* Așteptă terminarea copilului */
        int status;
        waitpid(pid, &status, 0);

        if (WIFEXITED(status))
            printf("Copil terminat cu exit code: %d\\n", WEXITSTATUS(status));
    }
    return 0;
}
\`\`\`

**exec() — înlocuire proces:**
\`\`\`c
/* exec înlocuiește procesul curent — NU se mai revine */
execl("/bin/ls", "ls", "-la", "/tmp", NULL);
/* Dacă exec returnează, a fost o eroare */
perror("exec"); exit(1);
\`\`\`

**fork + exec = cum funcționează shell-ul:**
\`\`\`c
void ruleaza_comanda(const char *cmd, char *argv[]) {
    pid_t pid = fork();
    if (pid == 0) {
        /* Copil: exec comanda */
        execvp(cmd, argv);
        perror("execvp"); exit(127);
    }
    /* Parinte: asteapta copilul */
    int status;
    waitpid(pid, &status, 0);
}

char *argv[] = {"ls", "-l", NULL};
ruleaza_comanda("ls", argv);
\`\`\`

**Server concurent cu fork:**
\`\`\`c
while (1) {
    int client = accept(srv, NULL, NULL);
    pid_t pid = fork();
    if (pid == 0) {
        close(srv);          /* copilul nu are nevoie de server fd */
        handle_client(client);
        exit(0);
    }
    close(client);           /* parintele nu mai are nevoie de client fd */
    waitpid(-1, NULL, WNOHANG); /* cleanup zombie-uri */
}
\`\`\``
  },
  {
    lessonContains: "Signals",
    titleContains: "Pipes",
    content: `**Pipe-urile** permit comunicarea unidirecțională între procese. **Named pipes** (FIFO) permit comunicare între procese fără legătură de familie.

**Pipe anonim — comunicare parinte-copil:**
\`\`\`c
#include <unistd.h>
#include <stdio.h>
#include <string.h>
#include <sys/wait.h>

int main(void) {
    int pipefd[2];  /* pipefd[0]=read, pipefd[1]=write */
    if (pipe(pipefd) < 0) { perror("pipe"); return 1; }

    pid_t pid = fork();
    if (pid == 0) {
        /* COPIL — scrie în pipe */
        close(pipefd[0]);  /* nu citim în copil */
        const char *msg = "Salut de la copil!";
        write(pipefd[1], msg, strlen(msg));
        close(pipefd[1]);
        exit(0);
    } else {
        /* PARINTE — citeste din pipe */
        close(pipefd[1]);  /* nu scriem în parinte */
        char buf[128] = {0};
        ssize_t n = read(pipefd[0], buf, sizeof(buf)-1);
        close(pipefd[0]);
        printf("Parinte primit: %s\\n", buf);
        waitpid(pid, NULL, 0);
    }
    return 0;
}
\`\`\`

**Redirectare stdin/stdout cu dup2:**
\`\`\`c
/* Redirectare stdout copil → pipe */
pid_t pid = fork();
if (pid == 0) {
    close(pipefd[0]);
    dup2(pipefd[1], STDOUT_FILENO);  /* stdout → pipefd[1] */
    close(pipefd[1]);
    execl("/bin/ls", "ls", NULL);    /* output merge în pipe */
    exit(1);
}
/* Parintele citeste din pipe = output-ul lui ls */
\`\`\`

**Named pipe (FIFO):**
\`\`\`c
#include <sys/stat.h>
#include <fcntl.h>

/* Creare FIFO */
mkfifo("/tmp/myfifo", 0666);

/* Proces 1 — scrie */
int fd = open("/tmp/myfifo", O_WRONLY);
write(fd, "date", 4);
close(fd);

/* Proces 2 — citeste (blocat până vine scriptor) */
int fd2 = open("/tmp/myfifo", O_RDONLY);
char buf[128]; read(fd2, buf, 128);
close(fd2);
\`\`\`

**Pipeline: proc1 | proc2 — ca în shell:**
\`\`\`c
/* ls | wc -l */
int pipefd[2]; pipe(pipefd);
if (!fork()) {
    dup2(pipefd[1], 1); close(pipefd[0]); close(pipefd[1]);
    execlp("ls", "ls", NULL);
}
if (!fork()) {
    dup2(pipefd[0], 0); close(pipefd[0]); close(pipefd[1]);
    execlp("wc", "wc", "-l", NULL);
}
close(pipefd[0]); close(pipefd[1]);
wait(NULL); wait(NULL);
\`\`\``
  },
  {
    lessonContains: "Signals",
    titleContains: "Daemon",
    content: `**Daemon** este un proces care rulează în background, detașat de terminal, fără a fi asociat cu o sesiune. Serverele web, baze de date și cron rulează ca daemon-uri.

**Creare daemon — pașii standard:**
\`\`\`c
#include <unistd.h>
#include <sys/stat.h>
#include <fcntl.h>
#include <syslog.h>
#include <signal.h>
#include <stdio.h>
#include <stdlib.h>

void devino_daemon(void) {
    /* Pasul 1: Fork și parinte iese */
    pid_t pid = fork();
    if (pid < 0) exit(EXIT_FAILURE);
    if (pid > 0) exit(EXIT_SUCCESS);  /* parinte iese */

    /* Pasul 2: Copilul devine lider de sesiune */
    if (setsid() < 0) exit(EXIT_FAILURE);

    /* Pasul 3: Al doilea fork — nu mai poate redobândi terminal */
    pid = fork();
    if (pid < 0) exit(EXIT_FAILURE);
    if (pid > 0) exit(EXIT_SUCCESS);

    /* Pasul 4: Setare directoare și permisiuni */
    umask(0);
    chdir("/");

    /* Pasul 5: Închide descriptori standard */
    close(STDIN_FILENO);
    close(STDOUT_FILENO);
    close(STDERR_FILENO);

    /* Redirectare la /dev/null */
    int null_fd = open("/dev/null", O_RDWR);
    dup2(null_fd, STDIN_FILENO);
    dup2(null_fd, STDOUT_FILENO);
    dup2(null_fd, STDERR_FILENO);
    if (null_fd > 2) close(null_fd);
}
\`\`\`

**Logare cu syslog:**
\`\`\`c
openlog("mydaemon", LOG_PID | LOG_CONS, LOG_DAEMON);
syslog(LOG_INFO, "Daemon pornit, PID=%d", getpid());
syslog(LOG_ERR,  "Eroare: %s", "mesaj de eroare");
syslog(LOG_DEBUG,"Debug: valoare=%d", 42);
closelog();

/* Vizualizare log: */
/* journalctl -t mydaemon    (systemd) */
/* tail -f /var/log/syslog  (syslog)  */
\`\`\`

**Daemon complet — exemplu:**
\`\`\`c
volatile sig_atomic_t daemon_running = 1;

void sig_handler(int sig) { daemon_running = 0; }

int main(void) {
    devino_daemon();

    signal(SIGTERM, sig_handler);
    signal(SIGHUP,  sig_handler);

    openlog("demo_daemon", LOG_PID, LOG_DAEMON);
    syslog(LOG_INFO, "Pornit");

    while (daemon_running) {
        syslog(LOG_INFO, "Tic-tac...");
        sleep(10);
    }

    syslog(LOG_INFO, "Oprit");
    closelog();
    return 0;
}
\`\`\``
  },
  {
    lessonContains: "Interfata C cu Python",
    titleContains: "ctypes",
    content: `**ctypes** este biblioteca standard Python pentru apelarea funcțiilor din biblioteci C (.so/.dll) fără a scrie cod C. Disponibil în Python fără instalare.

**Încărcare bibliotecă și apel funcție:**
\`\`\`python
from ctypes import CDLL, c_int, c_double, c_char_p
import ctypes

# Încarcă libc
libc = CDLL(None)          # None = libc pe Linux
# libc = CDLL("libc.so.6")  # alternativă explicită

# Apel printf
libc.printf(b"Salut din C! %d\\n", c_int(42))

# sqrt din libm
libm = CDLL("libm.so.6")
libm.sqrt.restype  = c_double
libm.sqrt.argtypes = [c_double]
print(libm.sqrt(16.0))   # 4.0
\`\`\`

**Tipuri ctypes ↔ tipuri C:**
\`\`\`python
from ctypes import *

c_int()        # int
c_long()       # long
c_float()      # float
c_double()     # double
c_char_p()     # char* (bytes în Python)
c_void_p()     # void*
c_bool()       # _Bool
POINTER(c_int) # int*
\`\`\`

**Lucrul cu o bibliotecă custom:**
\`\`\`c
/* mylib.c — compilat ca: gcc -shared -fPIC -o mylib.so mylib.c */
int aduna(int a, int b) { return a + b; }
double calcul(double x, int n) {
    double r = 1.0;
    for (int i = 0; i < n; i++) r *= x;
    return r;
}
\`\`\`

\`\`\`python
lib = CDLL("./mylib.so")

lib.aduna.argtypes  = [c_int, c_int]
lib.aduna.restype   = c_int
print(lib.aduna(5, 3))   # 8

lib.calcul.argtypes = [c_double, c_int]
lib.calcul.restype  = c_double
print(lib.calcul(2.0, 10))   # 1024.0
\`\`\`

**Structuri ctypes:**
\`\`\`python
class Punct(Structure):
    _fields_ = [("x", c_double), ("y", c_double)]

# Utilizare
p = Punct(3.0, 4.0)
print(p.x, p.y)  # 3.0 4.0

# Array de structuri
pts = (Punct * 3)()
pts[0] = Punct(0, 0)
pts[1] = Punct(1, 0)
pts[2] = Punct(0, 1)
\`\`\`

**Pointer și modificare in-place:**
\`\`\`python
lib.swap.argtypes = [POINTER(c_int), POINTER(c_int)]
lib.swap.restype  = None

a = c_int(5)
b = c_int(10)
lib.swap(byref(a), byref(b))
print(a.value, b.value)  # 10 5
\`\`\``
  },
  {
    lessonContains: "Interfata C cu Python",
    titleContains: "Extension Modules",
    content: `**Extension Modules** sunt module Python scrise în C folosind **Python C API** (Python.h). Permit viteză maximă, acces la structuri Python native și distribuție ca pachete PyPI.

**Structura unui extension module:**
\`\`\`c
/* mymodule.c */
#define PY_SSIZE_T_CLEAN
#include <Python.h>

/* Funcție C wrappată pentru Python */
static PyObject* py_aduna(PyObject *self, PyObject *args) {
    int a, b;
    /* Parsare argumente Python */
    if (!PyArg_ParseTuple(args, "ii", &a, &b)) return NULL;
    /* Returnează obiect Python */
    return PyLong_FromLong(a + b);
}

static PyObject* py_factorial(PyObject *self, PyObject *args) {
    long n;
    if (!PyArg_ParseTuple(args, "l", &n)) return NULL;
    if (n < 0) {
        PyErr_SetString(PyExc_ValueError, "n trebuie sa fie >= 0");
        return NULL;
    }
    long rez = 1;
    for (long i = 2; i <= n; i++) rez *= i;
    return PyLong_FromLong(rez);
}

/* Tabel de metode */
static PyMethodDef MyMethods[] = {
    {"aduna",     py_aduna,     METH_VARARGS, "Aduna doua numere"},
    {"factorial", py_factorial, METH_VARARGS, "Calculeaza factorial"},
    {NULL, NULL, 0, NULL}  /* sentinel */
};

/* Definitie modul */
static struct PyModuleDef mymodule = {
    PyModuleDef_HEAD_INIT,
    "mymodule",    /* numele modulului */
    "Modul C demo",/* docstring */
    -1,
    MyMethods
};

/* Funcția de inițializare — numită la import */
PyMODINIT_FUNC PyInit_mymodule(void) {
    return PyModule_Create(&mymodule);
}
\`\`\`

**Compilare cu setup.py:**
\`\`\`python
# setup.py
from distutils.core import setup, Extension

module = Extension("mymodule", sources=["mymodule.c"])
setup(name="mymodule", ext_modules=[module])
\`\`\`

\`\`\`bash
python setup.py build_ext --inplace
\`\`\`

**Utilizare în Python:**
\`\`\`python
import mymodule
print(mymodule.aduna(5, 3))      # 8
print(mymodule.factorial(10))    # 3628800
\`\`\`

**Format specifiers PyArg_ParseTuple:**
| Specifier | Tip Python | Tip C |
|-----------|-----------|-------|
| \`i\` | int | int |
| \`l\` | int | long |
| \`f\` | float | float |
| \`d\` | float | double |
| \`s\` | str/bytes | const char* |
| \`O\` | orice | PyObject* |`
  },
  {
    lessonContains: "Interfata C cu Python",
    titleContains: "Structuri si callbacks",
    content: `**Structurile** și **callback-urile** în ctypes permit integrare avansată — pasare de structuri C la funcții, array-uri dinamice și funcții Python ca parametri callback în C.

**Structuri complexe cu pointeri:**
\`\`\`python
from ctypes import *

class ListaNod(Structure):
    pass  # forward declaration

ListaNod._fields_ = [
    ("val",  c_int),
    ("next", POINTER(ListaNod))  # pointer la același tip
]

# Construire linked list din Python
n3 = ListaNod(val=30, next=None)
n2 = ListaNod(val=20, next=pointer(n3))
n1 = ListaNod(val=10, next=pointer(n2))

# Parcurgere
curent = n1
while curent:
    print(curent.val, end=" -> " if curent.next else "\\n")
    curent = curent.next.contents if curent.next else None
# 10 -> 20 -> 30
\`\`\`

**Array-uri dinamice:**
\`\`\`python
# Array static
IntArray5 = c_int * 5
arr = IntArray5(10, 20, 30, 40, 50)
print(list(arr))  # [10, 20, 30, 40, 50]

# Array dinamic (pointer)
n = 10
dyn_arr = (c_int * n)(*range(n))  # [0, 1, 2, ..., 9]

# Pasare la funcție C
lib.proceseaza.argtypes = [POINTER(c_int), c_int]
lib.proceseaza(dyn_arr, c_int(n))
\`\`\`

**Callbacks — funcție Python apelată din C:**
\`\`\`c
/* mylib.c */
typedef int (*Comparator)(int a, int b);

void sorteaza(int arr[], int n, Comparator cmp) {
    /* bubble sort cu comparator custom */
    for (int i = 0; i < n-1; i++)
        for (int j = 0; j < n-1-i; j++)
            if (cmp(arr[j], arr[j+1]) > 0) {
                int t = arr[j]; arr[j] = arr[j+1]; arr[j+1] = t;
            }
}
\`\`\`

\`\`\`python
# Python callback
CMP_FUNC = CFUNCTYPE(c_int, c_int, c_int)

def cmp_desc(a, b):
    return b - a  # descendent

cmp_cb = CMP_FUNC(cmp_desc)  # wrappat ca funcție C

arr = (c_int * 5)(3, 1, 4, 1, 5)
lib.sorteaza.argtypes = [POINTER(c_int), c_int, CMP_FUNC]
lib.sorteaza(arr, 5, cmp_cb)
print(list(arr))  # [5, 4, 3, 1, 1]
\`\`\`

**Exemplu real — qsort cu comparator Python:**
\`\`\`python
libc = CDLL(None)
CMPFUNC = CFUNCTYPE(c_int, c_void_p, c_void_p)

def py_cmp(a, b):
    ia = cast(a, POINTER(c_int)).contents.value
    ib = cast(b, POINTER(c_int)).contents.value
    return ia - ib

arr = (c_int * 6)(64, 25, 12, 22, 11, 90)
libc.qsort(arr, 6, sizeof(c_int), CMPFUNC(py_cmp))
print(list(arr))  # [11, 12, 22, 25, 64, 90]
\`\`\``
  },
  {
    lessonContains: "Server HTTP",
    titleContains: "Concurenta",
    content: `**Concurența** permite serverului să trateze mai mulți clienți simultan. Cele mai comune abordări: **fork per conexiune**, **thread per conexiune** sau **select/poll/epoll**.

**Fork per conexiune — simplu dar costisitor:**
\`\`\`c
#include <sys/socket.h>
#include <sys/wait.h>
#include <unistd.h>
#include <signal.h>
#include <stdio.h>

/* Cleanup zombie-uri automat */
void sigchld_handler(int sig) {
    (void)sig;
    while (waitpid(-1, NULL, WNOHANG) > 0);
}

int main(void) {
    signal(SIGCHLD, sigchld_handler);

    int srv = creeaza_server(8080);  /* create + bind + listen */
    printf("Server HTTP fork pe port 8080\\n");

    while (1) {
        int client = accept(srv, NULL, NULL);
        if (client < 0) continue;

        pid_t pid = fork();
        if (pid == 0) {
            /* COPIL — procesează cererea */
            close(srv);          /* copilul nu ascultă */
            handle_http(client); /* procesare HTTP */
            close(client);
            exit(0);
        }
        /* PARINTE — continuă să accepte */
        close(client);  /* parintele nu mai trimite la client */
    }
    return 0;
}
\`\`\`

**Thread per conexiune — mai eficient:**
\`\`\`c
#include <pthread.h>

void* thread_handler(void *arg) {
    int fd = *(int*)arg;
    free(arg);
    handle_http(fd);
    close(fd);
    return NULL;
}

int main(void) {
    int srv = creeaza_server(8080);
    printf("Server HTTP threaded pe port 8080\\n");

    while (1) {
        int client = accept(srv, NULL, NULL);
        if (client < 0) continue;

        int *fd_copy = malloc(sizeof(int));
        *fd_copy = client;

        pthread_t t;
        pthread_create(&t, NULL, thread_handler, fd_copy);
        pthread_detach(t);  /* auto-cleanup la terminare */
    }
    return 0;
}
\`\`\`

**Thread pool — limitat și eficient:**
\`\`\`c
#define POOL_SIZE 8
#define QUEUE_MAX 100

typedef struct { int fds[QUEUE_MAX]; int front, back, size; } WorkQueue;
WorkQueue wq = {.front=0, .back=0, .size=0};
pthread_mutex_t wq_mtx = PTHREAD_MUTEX_INITIALIZER;
pthread_cond_t  wq_cond = PTHREAD_COND_INITIALIZER;

void* worker_thread(void *arg) {
    while (1) {
        pthread_mutex_lock(&wq_mtx);
        while (wq.size == 0) pthread_cond_wait(&wq_cond, &wq_mtx);
        int fd = wq.fds[wq.front++ % QUEUE_MAX]; wq.size--;
        pthread_mutex_unlock(&wq_mtx);
        handle_http(fd); close(fd);
    }
    return NULL;
}
/* Pornire: for (int i=0; i<POOL_SIZE; i++) pthread_create(&t, NULL, worker_thread, NULL); */
\`\`\``
  }
];

async function main() {
  let updated = 0, notFound = 0;
  for (const item of UPDATES) {
    const lessons = await p.lesson.findMany({
      where: { module: { slug: "c" }, title: { contains: item.lessonContains } }
    });
    if (!lessons.length) { console.log("! Lec contains: " + item.lessonContains); notFound++; continue; }
    const theory = await p.theory.findFirst({
      where: { lessonId: { in: lessons.map(l => l.id) }, title: { contains: item.titleContains } }
    });
    if (!theory) { console.log("! Teo contains: " + item.titleContains); notFound++; continue; }
    await p.theory.update({ where: { id: theory.id }, data: { content: item.content } });
    console.log("✓ " + theory.title.substring(0, 40) + ": " + theory.content.length + " → " + item.content.length);
    updated++;
  }
  console.log("\nDone: " + updated + " updated, " + notFound + " not found");
  await p.$disconnect();
}
main().catch(e => { console.error(e); p.$disconnect(); process.exit(1); });
