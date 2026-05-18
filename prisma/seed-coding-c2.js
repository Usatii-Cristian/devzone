const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const tasks = [
  {
    slug: 'c-functii-pointer',
    name: 'Funcție cu pointeri',
    question: 'Scrie o funcție C `swap(int *a, int *b)` care interschimbă valorile a două variabile prin pointeri. Testează cu a=5 și b=10.',
    language: 'c',
    starterCode: '#include <stdio.h>\n\nvoid swap(int *a, int *b) {\n    // implementează\n}\n\nint main() {\n    int a = 5, b = 10;\n    swap(&a, &b);\n    printf("a=%d, b=%d\\n", a, b);\n    return 0;\n}',
    expectedOutput: 'a=10, b=5',
  },
  {
    slug: 'c-struct-avansat',
    name: 'Struct cu funcții',
    question: 'Definește un struct `Point` cu x și y float. Scrie o funcție `distance(Point a, Point b)` care returnează distanța euclidiană. Testează cu (0,0) și (3,4).',
    language: 'c',
    starterCode: '#include <stdio.h>\n#include <math.h>\n\ntypedef struct { float x, y; } Point;\n\nfloat distance(Point a, Point b) {\n    // implementează\n}\n\nint main() {\n    Point p1 = {0, 0}, p2 = {3, 4};\n    printf("%.1f\\n", distance(p1, p2));\n    return 0;\n}',
    expectedOutput: '5.0',
  },
  {
    slug: 'c-file-io',
    name: 'Citire și scriere fișier',
    question: 'Scrie un program C care creează un fișier "test.txt" cu textul "Hello, File!", apoi îl citește și afișează conținutul.',
    language: 'c',
    starterCode: '#include <stdio.h>\n\nint main() {\n    // scrie fișierul\n    FILE *f = fopen("test.txt", "w");\n    // fprintf(f, ...);\n    fclose(f);\n    \n    // citește fișierul\n    char buf[100];\n    f = fopen("test.txt", "r");\n    fgets(buf, sizeof(buf), f);\n    fclose(f);\n    printf("%s\\n", buf);\n    return 0;\n}',
    expectedOutput: 'Hello, File!',
  },
  {
    slug: 'c-linked-list',
    name: 'Listă înlănțuită simplă',
    question: 'Implementează o listă înlănțuită simplă în C: struct Node cu int data și pointer next, funcție push_front și funcție print_list.',
    language: 'c',
    starterCode: '#include <stdio.h>\n#include <stdlib.h>\n\ntypedef struct Node { int data; struct Node *next; } Node;\n\nvoid push_front(Node **head, int data) {\n    // alocă și inserează\n}\n\nvoid print_list(Node *head) {\n    while (head) { printf("%d ", head->data); head = head->next; }\n    printf("\\n");\n}\n\nint main() {\n    Node *list = NULL;\n    push_front(&list, 3);\n    push_front(&list, 2);\n    push_front(&list, 1);\n    print_list(list);\n    return 0;\n}',
    expectedOutput: '1 2 3',
  },
  {
    slug: 'c-stiva-coada',
    name: 'Stivă cu array',
    question: 'Implementează o stivă (stack) în C folosind array: operații push, pop și peek. Capacitate maximă 10. Testează cu push 1,2,3 și pop.',
    language: 'c',
    starterCode: '#include <stdio.h>\n#define MAX 10\n\nint stack[MAX], top = -1;\n\nvoid push(int x) { if (top < MAX-1) stack[++top] = x; }\nint pop() { return top >= 0 ? stack[top--] : -1; }\nint peek() { return top >= 0 ? stack[top] : -1; }\n\nint main() {\n    push(1); push(2); push(3);\n    printf("Top: %d\\n", peek());\n    printf("Pop: %d\\n", pop());\n    printf("Top: %d\\n", peek());\n    return 0;\n}',
    expectedOutput: 'Top: 3\nPop: 3\nTop: 2',
  },
  {
    slug: 'c-malloc-avansat',
    name: 'Alocare dinamică 2D',
    question: 'Alocă dinamic o matrice 3x3 în C, inițializează cu i*3+j+1, afișeaz-o, și eliberează memoria.',
    language: 'c',
    starterCode: '#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int rows = 3, cols = 3;\n    int **m = (int **)malloc(rows * sizeof(int *));\n    for (int i = 0; i < rows; i++) {\n        m[i] = (int *)malloc(cols * sizeof(int));\n        for (int j = 0; j < cols; j++)\n            m[i][j] = i * 3 + j + 1;\n    }\n    for (int i = 0; i < rows; i++) {\n        for (int j = 0; j < cols; j++)\n            printf("%d ", m[i][j]);\n        printf("\\n");\n    }\n    // eliberează\n    return 0;\n}',
    expectedOutput: '1 2 3 \n4 5 6 \n7 8 9',
  },
  {
    slug: 'c-preprocessor',
    name: 'Macro-uri C preprocessor',
    question: 'Definește macro-uri C: MAX(a,b) care returnează maximul, SQ(x) care returnează pătratul, și un macro SWAP(a,b,t) care interschimbă valorile.',
    language: 'c',
    starterCode: '#include <stdio.h>\n\n#define MAX(a,b) /* completează */\n#define SQ(x) /* completează */\n#define SWAP(a,b,t) /* completează */\n\nint main() {\n    int x = 3, y = 7, tmp;\n    printf("Max: %d\\n", MAX(x, y));\n    printf("SQ(5): %d\\n", SQ(5));\n    SWAP(x, y, tmp);\n    printf("x=%d y=%d\\n", x, y);\n    return 0;\n}',
    expectedOutput: 'Max: 7\nSQ(5): 25\nx=7 y=3',
  },
  {
    slug: 'c-compilare-linking',
    name: 'Header files și modularizare',
    question: 'Scrie un modul C cu header: math_utils.h (declarații) și math_utils.c (implementare factorial și power). Arată cum s-ar folosi din main.c.',
    language: 'c',
    starterCode: '// math_utils.h\n#ifndef MATH_UTILS_H\n#define MATH_UTILS_H\nlong factorial(int n);\nlong power(int base, int exp);\n#endif\n\n// math_utils.c\n#include "math_utils.h"\nlong factorial(int n) {\n    return n <= 1 ? 1 : n * factorial(n-1);\n}\nlong power(int base, int exp) {\n    // implementează\n}\n\n// main.c\n#include <stdio.h>\n#include "math_utils.h"\nint main() {\n    printf("%ld\\n", factorial(5));\n    printf("%ld\\n", power(2, 10));\n    return 0;\n}',
    expectedOutput: '120\n1024',
  },
  {
    slug: 'c-debugging',
    name: 'Găsire bug în cod C',
    question: 'Codul următor are un bug de buffer overflow și un memory leak. Identifică și corectează ambele probleme.',
    language: 'c',
    starterCode: '#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n\nchar* greet(const char *name) {\n    char *buf = (char *)malloc(10); // prea mic?\n    strcpy(buf, "Hello, ");\n    strcat(buf, name);\n    return buf; // caller trebuie să free-uiască\n}\n\nint main() {\n    char *msg = greet("World");\n    printf("%s\\n", msg);\n    // lipsește free(msg);\n    free(msg);\n    return 0;\n}',
    expectedOutput: 'Hello, World',
  },
  {
    slug: 'c-mini-proiect-calculator',
    name: 'Calculator CLI în C',
    question: 'Scrie un calculator C care citește două numere și un operator (+,-,*,/) din argumente și afișează rezultatul. Gestionează împărțirea la 0.',
    language: 'c',
    starterCode: '#include <stdio.h>\n\nint main() {\n    double a = 10, b = 3;\n    char op = \'+\';\n    double result;\n    switch (op) {\n        case \'+\': result = a + b; break;\n        case \'-\': result = a - b; break;\n        case \'*\': result = a * b; break;\n        case \'/\':\n            if (b == 0) { printf("Eroare: impartire la 0\\n"); return 1; }\n            result = a / b; break;\n        default: printf("Operator invalid\\n"); return 1;\n    }\n    printf("%.2f\\n", result);\n    return 0;\n}',
    expectedOutput: '13.00',
  },
  {
    slug: 'c-best-practices',
    name: 'Coding style și best practices C',
    question: 'Refactorizează codul următor: adaugă const unde e necesar, error handling pentru malloc, și comentarii Doxygen pentru funcție.',
    language: 'c',
    starterCode: '#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n\n/**\n * @brief Duplică un string în memorie heap\n * @param str Stringul sursă (nu poate fi NULL)\n * @return Pointer la noul string sau NULL la eroare\n */\nchar* str_dup(const char *str) {\n    if (!str) return NULL;\n    char *copy = (char *)malloc(strlen(str) + 1);\n    if (!copy) return NULL;\n    strcpy(copy, str);\n    return copy;\n}\n\nint main() {\n    char *s = str_dup("Hello");\n    if (s) { printf("%s\\n", s); free(s); }\n    return 0;\n}',
    expectedOutput: 'Hello',
  },
  {
    slug: 'c-sockets-retele',
    name: 'TCP Server simplu în C',
    question: 'Scrie pseudocodul/schița unui TCP server minimal în C: socket(), bind(), listen(), accept(), send/recv, close(). Explică fiecare pas cu comentarii.',
    language: 'c',
    starterCode: '#include <stdio.h>\n// #include <sys/socket.h>\n// #include <netinet/in.h>\n\nint main() {\n    // 1. Crează socket\n    // int sockfd = socket(AF_INET, SOCK_STREAM, 0);\n    \n    // 2. Configurează adresa\n    // struct sockaddr_in addr = {0};\n    // addr.sin_family = AF_INET;\n    // addr.sin_port = htons(8080);\n    // addr.sin_addr.s_addr = INADDR_ANY;\n    \n    // 3. bind(), listen(), accept()\n    // 4. Primește și trimite date\n    // 5. close()\n    \n    printf("Server TCP schita implementata\\n");\n    return 0;\n}',
    expectedOutput: 'Server TCP schita implementata',
  },
  {
    slug: 'c-threads-posix',
    name: 'Thread-uri POSIX',
    question: 'Scrie un program C cu 2 thread-uri POSIX: unul incrementează un counter de 1000 ori, altul îl decrementează. Folosește mutex pentru sincronizare.',
    language: 'c',
    starterCode: '#include <stdio.h>\n// #include <pthread.h>\n\n// int counter = 0;\n// pthread_mutex_t mutex = PTHREAD_MUTEX_INITIALIZER;\n\n// void* increment(void *arg) {\n//     for (int i = 0; i < 1000; i++) {\n//         pthread_mutex_lock(&mutex);\n//         counter++;\n//         pthread_mutex_unlock(&mutex);\n//     }\n//     return NULL;\n// }\n\nint main() {\n    // Fara POSIX threads disponibil in preview\n    // Simuleaza cu un singur thread\n    int counter = 0;\n    for (int i = 0; i < 1000; i++) counter++;\n    for (int i = 0; i < 1000; i++) counter--;\n    printf("Counter: %d\\n", counter);\n    return 0;\n}',
    expectedOutput: 'Counter: 0',
  },
  {
    slug: 'c-signals-process-management',
    name: 'Semnale POSIX în C',
    question: 'Scrie un program C care înregistrează un handler pentru SIGINT (Ctrl+C) care afișează "Semnal primit!" și iese clean. Simulează cu raise(SIGINT).',
    language: 'c',
    starterCode: '#include <stdio.h>\n#include <signal.h>\n#include <stdlib.h>\n\nvoid signal_handler(int sig) {\n    printf("Semnal primit: %d\\n", sig);\n    exit(0);\n}\n\nint main() {\n    signal(SIGINT, signal_handler);\n    printf("Program pornit\\n");\n    raise(SIGINT); // simulare semnal\n    return 0;\n}',
    expectedOutput: 'Program pornit\nSemnal primit: 2',
  },
  {
    slug: 'c-interfata-python',
    name: 'C Extension pentru Python (ctypes)',
    question: 'Scrie o funcție C `int sum_array(int *arr, int len)` care poate fi apelată din Python via ctypes. Include exemplu de utilizare în Python.',
    language: 'c',
    starterCode: '// mathlib.c — compilat ca shared library\n#include <stdio.h>\n\nint sum_array(int *arr, int len) {\n    int sum = 0;\n    for (int i = 0; i < len; i++) sum += arr[i];\n    return sum;\n}\n\n// Compilare: gcc -shared -o mathlib.so mathlib.c\n\n// Utilizare Python:\n// import ctypes\n// lib = ctypes.CDLL("./mathlib.so")\n// arr = (ctypes.c_int * 5)(1, 2, 3, 4, 5)\n// print(lib.sum_array(arr, 5))  # 15\n\nint main() {\n    int arr[] = {1,2,3,4,5};\n    printf("%d\\n", sum_array(arr, 5));\n    return 0;\n}',
    expectedOutput: '15',
  },
  {
    slug: 'c-mini-proiect-server-http',
    name: 'HTTP Server minimal în C',
    question: 'Scrie schița unui HTTP server C care răspunde cu "200 OK" și body "Hello, HTTP!" la orice request GET. Folosește funcții de socket standard.',
    language: 'c',
    starterCode: '#include <stdio.h>\n#include <string.h>\n\n// Simulare: afișează ce ar trimite serverul HTTP\nint main() {\n    const char *response =\n        "HTTP/1.1 200 OK\\r\\n"\n        "Content-Type: text/plain\\r\\n"\n        "Content-Length: 12\\r\\n"\n        "\\r\\n"\n        "Hello, HTTP!";\n    printf("%s\\n", response);\n    return 0;\n}',
    expectedOutput: 'HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\nContent-Length: 12\r\n\r\nHello, HTTP!',
  },
];

async function main() {
  console.log('Adăugare coding tasks C (remaining)...');
  let added = 0, skipped = 0;
  for (const t of tasks) {
    const lesson = await prisma.lesson.findFirst({ where: { slug: t.slug } });
    if (!lesson) { console.log(`  [skip] ${t.slug} — nu există`); skipped++; continue; }
    const existing = await prisma.task.findFirst({ where: { lessonId: lesson.id, type: 'coding' } });
    if (existing) { console.log(`  [skip] ${t.slug} — are deja coding`); skipped++; continue; }
    const maxTask = await prisma.task.findFirst({ where: { lessonId: lesson.id }, orderBy: { number: 'desc' } });
    const n = (maxTask?.number ?? 0) + 1;
    await prisma.task.create({
      data: {
        lessonId: lesson.id, number: n,
        name: t.name, question: t.question,
        options: [], answer: '',
        explanation: '',
        difficulty: 'medium',
        type: 'coding', language: t.language,
        starterCode: t.starterCode || '',
        expectedOutput: t.expectedOutput || '',
      },
    });
    console.log(`  [ok] ${t.slug}`);
    added++;
  }
  console.log(`\nGata: ${added} adăugate, ${skipped} sărite.`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
