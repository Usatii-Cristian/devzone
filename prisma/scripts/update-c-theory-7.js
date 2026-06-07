"use strict";
require("dotenv").config({ path: ".env" });
const { PrismaClient } = require("@prisma/client");
const p = new PrismaClient();

// Titles have mojibake em dash — using `contains` on stable part
const UPDATES = [
  {
    lessonTitle: "Threads POSIX in C",
    titleContains: "Mutex",
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
pthread_mutex_t mtx = PTHREAD_MUTEX_INITIALIZER;

void* incrementeaza(void *arg) {
    for (int i = 0; i < 1000000; i++) {
        pthread_mutex_lock(&mtx);    /* blochează */
        counter++;                    /* secțiune critică */
        pthread_mutex_unlock(&mtx);  /* eliberează */
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
    pthread_mutex_destroy(&mtx);
    return 0;
}
\`\`\`

**Mutex dinamic:**
\`\`\`c
pthread_mutex_t mtx;
pthread_mutex_init(&mtx, NULL);
/* ... */
pthread_mutex_destroy(&mtx);
\`\`\`

**Deadlock — problema clasică:**
\`\`\`c
/* DEADLOCK: thread1 deține A, vrea B
             thread2 deține B, vrea A → blocat pentru totdeauna */

/* Fix: impune ACEEAȘI ordine de achiziție în toate thread-urile */
/* ÎNTOTDEAUNA: lock A înainte de B */
pthread_mutex_lock(&mtx_A);
pthread_mutex_lock(&mtx_B);
/* muncă */
pthread_mutex_unlock(&mtx_B);
pthread_mutex_unlock(&mtx_A);
\`\`\`

**Trylock — non-blocking:**
\`\`\`c
if (pthread_mutex_trylock(&mtx) == 0) {
    /* Succes — mutex-ul e al nostru */
    counter++;
    pthread_mutex_unlock(&mtx);
} else {
    /* Mutex-ul e ocupat — fă altceva sau încearcă mai târziu */
    printf("Mutex ocupat, skip\\n");
}
\`\`\`

**Read-Write Lock — mai eficient pentru read-heavy:**
\`\`\`c
pthread_rwlock_t rwlock = PTHREAD_RWLOCK_INITIALIZER;

/* Cititori — multiple thread-uri simultane */
pthread_rwlock_rdlock(&rwlock);
int val = data;  /* citire */
pthread_rwlock_unlock(&rwlock);

/* Scriitor — exclusiv */
pthread_rwlock_wrlock(&rwlock);
data = new_val;  /* scriere */
pthread_rwlock_unlock(&rwlock);
\`\`\`

**Condition Variables — sincronizare avansată:**
\`\`\`c
pthread_mutex_t mtx2 = PTHREAD_MUTEX_INITIALIZER;
pthread_cond_t  cond  = PTHREAD_COND_INITIALIZER;
int gata = 0;

/* Thread consumator — așteaptă */
pthread_mutex_lock(&mtx2);
while (!gata) pthread_cond_wait(&cond, &mtx2);
/* procesare */
pthread_mutex_unlock(&mtx2);

/* Thread producator — notifică */
pthread_mutex_lock(&mtx2);
gata = 1;
pthread_cond_signal(&cond);
pthread_mutex_unlock(&mtx2);
\`\`\``
  },
  {
    lessonTitle: "Signals si Process Management in C",
    titleContains: "Semnale",
    content: `**Semnalele** sunt notificări asincrone trimise unui proces — interrupt din tastatură (Ctrl+C = SIGINT), kill, alarm, violarea memoriei (SIGSEGV).

**Semnale frecvente:**
| Semnal | Nr. | Cauza / Efect default |
|--------|-----|----------------------|
| SIGINT | 2 | Ctrl+C — termination |
| SIGTERM | 15 | Terminare "politicoasă" |
| SIGKILL | 9 | Terminare forțată (ne-catchable) |
| SIGSEGV | 11 | Segfault — acces memorie invalid |
| SIGALRM | 14 | Timer expirat (alarm()) |
| SIGPIPE | 13 | Scriere în pipe fără cititor |
| SIGCHLD | 17 | Proces copil terminat |
| SIGUSR1/2 | 10/12 | Semnale user-defined |

**Înregistrare handler cu sigaction:**
\`\`\`c
#include <signal.h>
#include <stdio.h>
#include <unistd.h>

volatile sig_atomic_t running = 1;

void handler_sigint(int signum) {
    (void)signum;
    /* Handler trebuie să fie async-signal-safe — FĂRĂ printf! */
    running = 0;
}

int main(void) {
    struct sigaction sa = {0};
    sa.sa_handler = handler_sigint;
    sigemptyset(&sa.sa_mask);
    sa.sa_flags = SA_RESTART;  /* reporneste syscall-uri întrerupte */

    sigaction(SIGINT, &sa, NULL);
    sigaction(SIGTERM, &sa, NULL);

    printf("Rulând... Ctrl+C pentru stop\\n");
    while (running) {
        sleep(1);
        printf(".");
        fflush(stdout);
    }
    printf("\\nOprit curat.\\n");
    return 0;
}
\`\`\`

**Trimitere semnal:**
\`\`\`c
#include <signal.h>
#include <sys/types.h>

kill(pid, SIGTERM);   /* trimite SIGTERM la procesul pid */
kill(pid, SIGKILL);   /* terminare forțată */
raise(SIGUSR1);       /* trimite la propriul proces */
alarm(5);             /* SIGALRM în 5 secunde */
\`\`\`

**Ignorare semnal:**
\`\`\`c
signal(SIGPIPE, SIG_IGN);  /* ignoră SIGPIPE (util pentru servere TCP) */
\`\`\`

**Blocarea semnalelor — sigmask:**
\`\`\`c
sigset_t set;
sigemptyset(&set);
sigaddset(&set, SIGINT);
sigprocmask(SIG_BLOCK, &set, NULL);   /* blochează SIGINT */
/* cod critic */
sigprocmask(SIG_UNBLOCK, &set, NULL); /* deblochează */
\`\`\`

**Reguli pentru signal handlers:**
• Folosește NUMAI funcții **async-signal-safe**: \`write()\`, \`_exit()\`
• NU folosi: \`printf\`, \`malloc\`, \`free\`, \`pthread_mutex_lock\`
• Variabilele accesate = \`volatile sig_atomic_t\`
• Setează doar un flag în handler — logica în main loop`
  },
  {
    lessonTitle: "Interfata C cu Python",
    titleContains: "cffi",
    content: `**cffi** (C Foreign Function Interface) este alternativa modernă la ctypes — mai curată, mai rapidă, mai type-safe. Permite apelarea bibliotecilor C din Python fără extension modules scrise în C.

**Instalare:**
\`\`\`bash
pip install cffi
\`\`\`

**Modul ABI in-line — simplu, fără compilare:**
\`\`\`python
from cffi import FFI

ffi = FFI()

# Declară prototipurile C
ffi.cdef("""
    double sqrt(double x);
    int    abs(int x);
    void*  malloc(size_t size);
    void   free(void *ptr);
""")

# Încarcă libc
lib = ffi.dlopen(None)

print(lib.sqrt(16.0))   # 4.0
print(lib.abs(-42))     # 42
\`\`\`

**Modul API out-of-line — compilat, recomandat:**
\`\`\`python
# build_punct.py — script de build
from cffi import FFI
ffi = FFI()

ffi.cdef("""
    typedef struct { double x; double y; } Punct;
    Punct  punct_new(double x, double y);
    double punct_distanta(Punct a, Punct b);
    Punct  punct_aduna(Punct a, Punct b);
""")

ffi.set_source("_punct_cffi",
    """
    #include <math.h>
    typedef struct { double x; double y; } Punct;
    Punct  punct_new(double x, double y) { return (Punct){x, y}; }
    double punct_distanta(Punct a, Punct b) {
        double dx = a.x-b.x, dy = a.y-b.y;
        return sqrt(dx*dx + dy*dy);
    }
    Punct punct_aduna(Punct a, Punct b) { return (Punct){a.x+b.x, a.y+b.y}; }
    """,
    libraries=["m"]
)

if __name__ == "__main__":
    ffi.compile(verbose=True)
\`\`\`

\`\`\`python
# main.py — utilizare după compilare cu python build_punct.py
from _punct_cffi import ffi, lib

a = lib.punct_new(0.0, 0.0)
b = lib.punct_new(3.0, 4.0)
print(f"Distanta: {lib.punct_distanta(a, b)}")  # 5.0

c = lib.punct_aduna(a, b)
print(f"Suma: ({c.x}, {c.y})")  # (3.0, 4.0)
\`\`\`

**Lucrul cu pointeri și string-uri:**
\`\`\`python
# Alocare buffer C din Python
buf = ffi.new("char[]", 100)
lib.snprintf(buf, 100, b"Valoare: %d", 42)
print(ffi.string(buf).decode())  # "Valoare: 42"

# Array C
arr = ffi.new("int[5]", [10, 20, 30, 40, 50])
for i in range(5):
    print(arr[i])
\`\`\`

**cffi vs ctypes:**
| Aspect | ctypes | cffi |
|--------|--------|------|
| Declarații | Python descriptors | Header C sintaxă reală |
| Viteză API mode | Mediu | **Rapid (JIT)** |
| Type safety | Slab | Bun |
| Structuri | Complexe | Simple |
| Debugging | Dificil | Mai ușor |`
  },
  {
    lessonTitle: "Mini Proiect C â€“ Server HTTP Simplu",
    titleContains: "Protocolul HTTP",
    content: `**HTTP/1.0** este un protocol text pe TCP. Implementarea unui server HTTP de bază demonstrează integrarea socket-urilor, parsing-ului de string-uri și I/O de fișiere.

**Formatul unei cereri HTTP:**
\`\`\`
GET /index.html HTTP/1.0\\r\\n
Host: localhost:8080\\r\\n
User-Agent: curl/7.68.0\\r\\n
\\r\\n
\`\`\`

**Formatul unui răspuns HTTP:**
\`\`\`
HTTP/1.0 200 OK\\r\\n
Content-Type: text/html\\r\\n
Content-Length: 42\\r\\n
\\r\\n
<html><body>Hello!</body></html>
\`\`\`

**Parsare cerere HTTP:**
\`\`\`c
#include <stdio.h>
#include <string.h>

typedef struct {
    char method[16];   /* GET, POST, HEAD */
    char path[256];    /* /index.html */
    char version[16];  /* HTTP/1.0 */
} HttpRequest;

int parse_request(const char *raw, HttpRequest *req) {
    return sscanf(raw, "%15s %255s %15s",
                  req->method, req->path, req->version) == 3;
}

/* Map extensie → MIME type */
const char* mime_type(const char *path) {
    const char *ext = strrchr(path, '.');
    if (!ext) return "application/octet-stream";
    if (strcmp(ext, ".html") == 0 || strcmp(ext, ".htm") == 0) return "text/html";
    if (strcmp(ext, ".css") == 0)  return "text/css";
    if (strcmp(ext, ".js") == 0)   return "application/javascript";
    if (strcmp(ext, ".json") == 0) return "application/json";
    if (strcmp(ext, ".png") == 0)  return "image/png";
    if (strcmp(ext, ".jpg") == 0)  return "image/jpeg";
    return "application/octet-stream";
}
\`\`\`

**Trimitere răspuns și servire fișier:**
\`\`\`c
#include <sys/socket.h>
#include <stdlib.h>

void trimite_status(int fd, int code, const char *msg) {
    char header[512];
    snprintf(header, sizeof(header),
             "HTTP/1.0 %d %s\\r\\nConnection: close\\r\\n", code, msg);
    send(fd, header, strlen(header), 0);
}

void trimite_fisier(int fd, const char *path) {
    FILE *f = fopen(path, "rb");
    if (!f) {
        const char *not_found =
            "HTTP/1.0 404 Not Found\\r\\n"
            "Content-Type: text/plain\\r\\n\\r\\n"
            "404 Not Found";
        send(fd, not_found, strlen(not_found), 0);
        return;
    }
    fseek(f, 0, SEEK_END); long size = ftell(f); rewind(f);
    char header[512];
    snprintf(header, sizeof(header),
             "HTTP/1.0 200 OK\\r\\n"
             "Content-Type: %s\\r\\n"
             "Content-Length: %ld\\r\\n\\r\\n",
             mime_type(path), size);
    send(fd, header, strlen(header), 0);

    char buf[4096]; size_t n;
    while ((n = fread(buf, 1, sizeof(buf), f)) > 0)
        send(fd, buf, n, 0);
    fclose(f);
}

void handle_client(int fd) {
    char req_buf[4096] = {0};
    recv(fd, req_buf, sizeof(req_buf)-1, 0);

    HttpRequest req;
    if (!parse_request(req_buf, &req)) {
        trimite_status(fd, 400, "Bad Request");
        return;
    }
    char path[300];
    if (strcmp(req.path, "/") == 0) strcpy(path, "./index.html");
    else snprintf(path, sizeof(path), ".%s", req.path);
    trimite_fisier(fd, path);
}
\`\`\``
  }
];

async function main() {
  let updated = 0, notFound = 0;
  for (const item of UPDATES) {
    const lessons = await p.lesson.findMany({
      where: { title: item.lessonTitle, module: { slug: "c" } }
    });
    if (!lessons.length) {
      // Try contains fallback
      const allLessons = await p.lesson.findMany({
        where: { module: { slug: "c" }, title: { contains: item.lessonTitle.replace(/â€“/g, "").trim() } }
      });
      if (!allLessons.length) { console.log("! Lec: " + item.lessonTitle); notFound++; continue; }
      lessons.push(...allLessons);
    }
    const theory = await p.theory.findFirst({
      where: {
        lessonId: { in: lessons.map(l => l.id) },
        title: { contains: item.titleContains }
      }
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
