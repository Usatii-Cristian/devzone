"use strict";
const { PrismaClient } = require("@prisma/client");
const p = new PrismaClient();

const updates = [
  {
    id: "6a0b51401419ceefc0244c5a",
    title: "weak_ptr — referință neproprietară",
    content: `**weak_ptr** este al treilea smart pointer din C++ modern, complementul esențial pentru \`shared_ptr\`. Spre deosebire de \`shared_ptr\` care deține resursa și incrementează reference count-ul, \`weak_ptr\` observă un obiect gestionat de \`shared_ptr\` *fără* să-l dețină — nu împiedică distrugerea lui.

**De ce există weak_ptr?**

Problema fundamentală pe care o rezolvă \`weak_ptr\` este **ciclul de referințe** (circular reference). Dacă două obiecte se dețin reciproc prin \`shared_ptr\`, niciuna nu va fi distrusă niciodată — reference count-ul nu va ajunge la 0.

\`\`\`cpp
#include <memory>
#include <iostream>

struct B; // forward declaration

struct A {
    std::shared_ptr<B> ptr_catre_b;
    ~A() { std::cout << "A distrus\\n"; }
};

struct B {
    std::shared_ptr<A> ptr_catre_a; // CICLU! A tine B, B tine A
    ~B() { std::cout << "B distrus\\n"; }
};

int main() {
    auto a = std::make_shared<A>();
    auto b = std::make_shared<B>();
    a->ptr_catre_b = b;
    b->ptr_catre_a = a; // ciclu: niciunul nu va fi distrus!
    // La sfarsit: destructorii NU se apeleaza => memory leak
}
\`\`\`

**Soluția cu weak_ptr**

Sparge ciclul: unul din pointeri devine \`weak_ptr\`. Convenția: copilul are referință slabă la părinte.

\`\`\`cpp
struct B {
    std::weak_ptr<A> ptr_catre_a; // weak_ptr rupe ciclul!
    ~B() { std::cout << "B distrus\\n"; }
};

int main() {
    auto a = std::make_shared<A>();
    auto b = std::make_shared<B>();
    a->ptr_catre_b = b;
    b->ptr_catre_a = a; // weak_ptr: nu incrementeaza reference count

    // La sfarsit: A (ref=1) distrus, B (ref=1) distrus. Corect!
}
\`\`\`

**Cum accesezi obiectul prin weak_ptr**

Nu poți accesa obiectul direct prin \`weak_ptr\` — trebuie să-l convertești *temporar* în \`shared_ptr\` cu \`lock()\`:

\`\`\`cpp
#include <memory>
#include <iostream>

int main() {
    std::shared_ptr<int> owner = std::make_shared<int>(42);
    std::weak_ptr<int> observator = owner; // observa, nu detine

    // Acces sigur: lock() returneaza shared_ptr temporar
    if (auto temp = observator.lock()) {
        std::cout << "Valoare: " << *temp << "\\n"; // 42
    } else {
        std::cout << "Obiectul a fost distrus!\\n";
    }

    owner.reset(); // distruge obiectul

    // Dupa distrugere, lock() returneaza nullptr
    if (auto temp = observator.lock()) {
        std::cout << "Inca exista\\n";
    } else {
        std::cout << "Confirmat: obiectul e distrus\\n"; // ← acesta se printeaza
    }

    // Poti verifica si cu expired()
    std::cout << "expired: " << observator.expired() << "\\n"; // 1 (true)
}
\`\`\`

**Exemplu real: cache cu weak_ptr**

Un cache care nu previne garbage collection-ul obiectelor:

\`\`\`cpp
#include <memory>
#include <map>
#include <string>
#include <iostream>

class ImageCache {
    std::map<std::string, std::weak_ptr<std::string>> cache;
public:
    std::shared_ptr<std::string> get(const std::string& key) {
        auto it = cache.find(key);
        if (it != cache.end()) {
            if (auto img = it->second.lock()) {
                std::cout << "Cache HIT: " << key << "\\n";
                return img; // obiectul inca exista
            }
        }
        // Cache miss sau obiect distrus: reincarca
        std::cout << "Cache MISS: " << key << " — incarcat din nou\\n";
        auto img = std::make_shared<std::string>("date_imagine_" + key);
        cache[key] = img; // stocheaza ca weak_ptr
        return img;
    }
};
\`\`\`

**Compararea smart pointers**

| Smart Pointer | Deținere | Reference Count | Uz principal |
|---|---|---|---|
| \`unique_ptr\` | exclusivă | nu | ownership unic |
| \`shared_ptr\` | partajată | da | ownership multiplu |
| \`weak_ptr\` | nulă | nu | observare, rupere cicluri |

**Greșeli comune**

• **Nu folosi \`weak_ptr::lock()\` pe un thread diferit fără sincronizare** — \`lock()\` e atomic față de distrugerea obiectului, dar accesul la date necesită tot mutex
• **Verifică întotdeauna rezultatul \`lock()\`** — poate returna \`nullptr\` dacă obiectul a fost distrus între apeluri consecutive
• **\`weak_ptr\` nu se poate dereferenția direct** — \`*weak_ptr\` este eroare de compilare; folosește \`lock()\` întotdeauna
• **Use-after-free prin raw pointer** — dacă extrăgi un raw pointer din \`lock()\`, obiectul poate fi distrus în timp ce îl folosești; păstrează \`shared_ptr\` local pe tot parcursul utilizării`,
  },
  {
    id: "6a0b51411419ceefc0244c61",
    title: "mutex și lock_guard",
    content: `Când mai multe thread-uri accesează date partajate simultan, apar **race conditions** — situații în care rezultatul depinde de ordinea de execuție, producând comportament nedeterministic și bug-uri greu de reproductibil. **mutex** (MUTual EXclusion) este mecanismul fundamental de sincronizare care garantează acces exclusiv la o secțiune critică.

**Ce este o race condition?**

\`\`\`cpp
#include <thread>
#include <iostream>

int contor = 0; // variabila partajata

void incrementeaza() {
    for (int i = 0; i < 100000; i++) {
        contor++; // NU e atomic! = citire + incrementare + scriere
    }
}

int main() {
    std::thread t1(incrementeaza);
    std::thread t2(incrementeaza);
    t1.join();
    t2.join();
    // Asteptat: 200000. Real: valoare nedeterministica (ex: 147382)!
    std::cout << contor << "\\n";
}
\`\`\`

**std::mutex — excludere mutuală**

\`\`\`cpp
#include <thread>
#include <mutex>
#include <iostream>

int contor = 0;
std::mutex mtx; // mutex global

void incrementeaza_sigur() {
    for (int i = 0; i < 100000; i++) {
        mtx.lock();   // intra in sectiunea critica
        contor++;     // acces exclusiv garantat
        mtx.unlock(); // elibereaza mutex-ul
    }
}

int main() {
    std::thread t1(incrementeaza_sigur);
    std::thread t2(incrementeaza_sigur);
    t1.join();
    t2.join();
    std::cout << contor << "\\n"; // mereu 200000 — corect!
}
\`\`\`

**std::lock_guard — RAII pentru mutex**

Apelul manual \`lock()/unlock()\` e periculos: dacă funcția aruncă o excepție înainte de \`unlock()\`, mutex-ul rămâne blocat pentru totdeauna (deadlock). Soluția RAII: **lock_guard** blochează mutex-ul la construire și îl eliberează automat la distrugere:

\`\`\`cpp
#include <thread>
#include <mutex>
#include <iostream>

int contor = 0;
std::mutex mtx;

void incrementeaza_raii() {
    for (int i = 0; i < 100000; i++) {
        std::lock_guard<std::mutex> guard(mtx); // lock la creare
        contor++;
        // unlock automat la iesirea din bloc, chiar si la exceptie
    }
}
\`\`\`

**std::unique_lock — varianta flexibila**

Când ai nevoie de control mai fin (lock/unlock manual, transfer de ownership, lucru cu condition variables):

\`\`\`cpp
#include <thread>
#include <mutex>
#include <condition_variable>
#include <queue>
#include <iostream>

std::mutex mtx;
std::condition_variable cv;
std::queue<int> coada;

void producator() {
    for (int i = 0; i < 10; i++) {
        {
            std::unique_lock<std::mutex> lock(mtx);
            coada.push(i);
            std::cout << "Produs: " << i << "\\n";
        } // unlock automat
        cv.notify_one(); // trezeste un consumator
    }
}

void consumator() {
    while (true) {
        std::unique_lock<std::mutex> lock(mtx);
        cv.wait(lock, [] { return !coada.empty(); }); // astept + unlock temporar
        int val = coada.front();
        coada.pop();
        std::cout << "Consumat: " << val << "\\n";
        if (val == 9) break;
    }
}
\`\`\`

**std::shared_mutex — cititori/scriitori**

Când ai mulți cititori și puțini scriitori, \`shared_mutex\` permite citire paralelă dar scriere exclusivă:

\`\`\`cpp
#include <shared_mutex>
#include <string>

class Config {
    std::string valoare;
    mutable std::shared_mutex mtx;
public:
    std::string get() const {
        std::shared_lock lock(mtx); // mai multi cititori simultan
        return valoare;
    }
    void set(const std::string& val) {
        std::unique_lock lock(mtx); // scriere exclusiva
        valoare = val;
    }
};
\`\`\`

**Deadlock și cum să-l eviți**

Deadlock apare când thread A deține mutex1 și așteaptă mutex2, iar thread B deține mutex2 și așteaptă mutex1:

\`\`\`cpp
// DEADLOCK: ordinea diferita de lock in doua thread-uri
// Thread 1: lock(mtx1) -> lock(mtx2)
// Thread 2: lock(mtx2) -> lock(mtx1) => DEADLOCK!

// Solutia: std::lock() lockheaza ambele atomic
std::mutex mtx1, mtx2;
std::lock(mtx1, mtx2); // garantat fara deadlock
std::lock_guard<std::mutex> g1(mtx1, std::adopt_lock);
std::lock_guard<std::mutex> g2(mtx2, std::adopt_lock);

// In C++17, mai simplu:
std::scoped_lock guard(mtx1, mtx2); // lockheaza mai multi mutex fara deadlock
\`\`\`

**Greșeli comune**

• **Lock la granularitate prea mare** — nu bloca tot un for loop cu un singur lock; intră și ieși din lock-uri mici pentru performanță maximă
• **Mutex recursiv** — un \`std::mutex\` standard nu poate fi lockat de două ori de același thread (undefined behavior); dacă ai nevoie, folosește \`std::recursive_mutex\`
• **Lock uitat în caz de return timpuriu** — motivul principal pentru care \`lock_guard\` e obligatoriu față de lock/unlock manual
• **Performanță** — mutex-urile sunt costisitoare; pentru contoare simple, consideră \`std::atomic<int>\` care nu necesită mutex`,
  },
  {
    id: "6a0b51461419ceefc0244c78",
    title: "Alegerea containerului potrivit",
    content: `Standardul C++ oferă o bibliotecă bogată de containere, fiecare optimizat pentru scenarii diferite. Alegerea greșită poate face codul de 10-100x mai lent. Cunoașterea complexității operațiilor și a modelului de memorie este esențială pentru a alege inteligent.

**Categoriile principale de containere STL**

Containerele STL se împart în trei categorii:
• **Secvențiale** — \`vector\`, \`deque\`, \`list\`, \`forward_list\`, \`array\`
• **Asociative ordonate** — \`map\`, \`set\`, \`multimap\`, \`multiset\` (arbore roșu-negru)
• **Asociative neordonate** — \`unordered_map\`, \`unordered_set\` (hash table)

**std::vector — containerul implicit**

Vector este containerul cel mai folosit și cel mai eficient pentru accesarea aleatorie și iterare. Stochează elementele contiguu în memorie (cache-friendly):

\`\`\`cpp
#include <vector>
#include <algorithm>
#include <iostream>

int main() {
    std::vector<int> v = {5, 3, 1, 4, 2};

    // Acces aleatoriu: O(1)
    std::cout << v[2] << "\\n"; // 1

    // Insert la sfarsit: O(1) amortizat
    v.push_back(6);

    // Insert la mijloc: O(n) — muta toate elementele dupa pozitie
    v.insert(v.begin() + 2, 99);

    // Sort: O(n log n)
    std::sort(v.begin(), v.end());

    // Rezerva memorie dinainte pentru a evita realocari
    v.reserve(100); // aloca pentru 100 elemente fara a le initializa
}
\`\`\`

**std::deque — insert eficient la ambele capete**

\`deque\` (double-ended queue) permite push/pop eficient la AMBELE capete (față și spate), spre deosebire de vector care e eficient doar la spate:

\`\`\`cpp
#include <deque>

std::deque<int> dq = {3, 4, 5};
dq.push_front(2); // O(1) — insert la inceput, eficient!
dq.push_back(6);  // O(1) — insert la sfarsit
dq.pop_front();   // O(1)

// Dezavantaj: nu e contiguu in memorie => mai lent la iterare decat vector
\`\`\`

**std::list — insert rapid oriunde, dar fără acces aleatoriu**

\`list\` este o listă dublu înlănțuită — insert/erase oriunde în O(1), dar *nu* accesează elementele prin index:

\`\`\`cpp
#include <list>

std::list<int> lst = {1, 2, 3, 4, 5};
auto it = std::find(lst.begin(), lst.end(), 3);
lst.insert(it, 99); // O(1) — insert inainte de pozitia iteratorului
lst.erase(it);      // O(1) — stergere prin iterator

// Cand sa folosesti list:
// - Insert/erase frecvente in mijlocul containerului
// - Iteratoarele nu trebuie sa ramana valide dupa alte operatii
// - Dezavantaj major: cache unfriendly (pointeri raspanditi in memorie)
\`\`\`

**std::map vs std::unordered_map**

\`\`\`cpp
#include <map>
#include <unordered_map>

// map: arbore rosu-negru — chei sortate, O(log n) pentru toate operatiile
std::map<std::string, int> sorted_map;
sorted_map["banana"] = 2;
sorted_map["mar"] = 5;
// Iterarea e IN ORDINE alfabetica — util cand ai nevoie de ordine

// unordered_map: hash table — O(1) mediu pentru toate operatiile
std::unordered_map<std::string, int> fast_map;
fast_map["banana"] = 2;
fast_map["mar"] = 5;
// Iterarea NU e in ordine — dar e mai rapid pentru lookup simplu

// Regula:
// - vrei ordine sau range queries? => map
// - vrei viteza maxima? => unordered_map
\`\`\`

**std::set vs std::unordered_set**

\`\`\`cpp
#include <set>
#include <unordered_set>

// Verificare duplicat eficienta
std::unordered_set<int> vazut;
std::vector<int> date = {1, 2, 3, 2, 1, 4};
std::vector<int> unice;

for (int x : date) {
    if (vazut.insert(x).second) { // insert returneaza {iterator, bool}
        unice.push_back(x);        // .second = true daca a fost inserat nou
    }
}
// unice = {1, 2, 3, 4}
\`\`\`

**Ghid rapid de alegere**

\`\`\`
Ai nevoie de:
├── Acces prin index [i]?
│   ├── DA, insert/erase rare → std::vector
│   └── DA, insert/erase frecvente la capete → std::deque
├── Insert/erase frecvente oriunde + iterare?
│   └── std::list (rar necesar; vector bate list la cache)
├── Lookup rapid cheie-valoare?
│   ├── Nu ai nevoie de ordine → std::unordered_map (O(1))
│   └── Ai nevoie de ordine/range → std::map (O(log n))
└── Unicitate? → std::unordered_set sau std::set
\`\`\`

**Greșeli comune**

• **\`list\` în loc de \`vector\`** — vector bate list în practică chiar și la insert frecvente, datorită cache locality; profilează înainte de a comuta
• **\`map\` pentru lookup simplu** — dacă nu ai nevoie de ordine, \`unordered_map\` e de 3-10x mai rapid
• **Lipsa \`reserve()\`** — dacă știi dimensiunea aproximativă a vectorului, \`reserve(n)\` elimină realocările și copierea
• **\`push_back\` cu obiect mare** — folosește \`emplace_back\` care construiește obiectul direct în container, fără copiere suplimentară`,
  },
  {
    id: "6a0b51471419ceefc0244c81",
    title: "Asio — networking async modern",
    content: `**Asio** (Asynchronous I/O) este biblioteca de rețelistică asincronă din C++, disponibilă fie ca parte din Boost (boost::asio), fie ca versiune standalone (\`asio\`). Asio implementează modelul **proactor pattern** — operațiile I/O sunt inițiate și completate asincron, permițând unui singur thread să gestioneze mii de conexiuni simultan.

**Concepte cheie**

• **io_context** — motorul central care procesează operații asincrone; rulează event loop-ul
• **socket** — abstracție pentru conexiuni TCP/UDP
• **handler** — callback apelat când o operație asincronă s-a completat
• **strand** — serializator de handlere (evită mutex-uri pentru accese concurente)

**Server TCP async simplu**

\`\`\`cpp
#include <asio.hpp>
#include <iostream>
#include <memory>

using asio::ip::tcp;

class Session : public std::enable_shared_from_this<Session> {
    tcp::socket socket_;
    char data_[1024];
public:
    Session(tcp::socket socket) : socket_(std::move(socket)) {}

    void start() { do_read(); }

private:
    void do_read() {
        auto self = shared_from_this(); // tine obiectul in viata
        socket_.async_read_some(
            asio::buffer(data_, sizeof(data_)),
            [this, self](std::error_code ec, std::size_t bytes) {
                if (!ec) {
                    do_write(bytes); // echo inapoi clientului
                }
            }
        );
    }

    void do_write(std::size_t length) {
        auto self = shared_from_this();
        asio::async_write(
            socket_,
            asio::buffer(data_, length),
            [this, self](std::error_code ec, std::size_t) {
                if (!ec) do_read(); // citeste urmatorul mesaj
            }
        );
    }
};

class Server {
    tcp::acceptor acceptor_;
public:
    Server(asio::io_context& io, short port)
        : acceptor_(io, tcp::endpoint(tcp::v4(), port))
    {
        do_accept();
    }
private:
    void do_accept() {
        acceptor_.async_accept(
            [this](std::error_code ec, tcp::socket socket) {
                if (!ec) {
                    std::make_shared<Session>(std::move(socket))->start();
                }
                do_accept(); // accepta urmatoarea conexiune
            }
        );
    }
};
\`\`\`

**Client TCP async cu timeout**

\`\`\`cpp
#include <asio.hpp>
#include <iostream>
#include <chrono>

int main() {
    asio::io_context io;
    asio::ip::tcp::socket socket(io);
    asio::ip::tcp::resolver resolver(io);

    // Rezolva hostname + port
    auto endpoints = resolver.resolve("example.com", "80");

    // Conectare asincrona cu timeout
    asio::steady_timer timer(io);
    timer.expires_after(std::chrono::seconds(5));
    timer.async_wait([&](std::error_code ec) {
        if (!ec) {
            socket.cancel(); // timeout: anuleaza conexiunea
            std::cout << "Timeout!\\n";
        }
    });

    asio::async_connect(socket, endpoints,
        [&](std::error_code ec, auto) {
            timer.cancel(); // conexiune reusita: anuleaza timeoutu
            if (!ec) std::cout << "Conectat!\\n";
            else std::cout << "Eroare: " << ec.message() << "\\n";
        }
    );

    io.run(); // porneste event loop-ul
}
\`\`\`

**Coroutines C++20 cu Asio**

Cu C++20, codul async devine la fel de simplu ca cel sincron:

\`\`\`cpp
#include <asio.hpp>
#include <asio/awaitable.hpp>
#include <asio/use_awaitable.hpp>

asio::awaitable<void> handle_client(asio::ip::tcp::socket socket) {
    char data[1024];
    for (;;) {
        // await: codul se suspenda, thread-ul e liber pentru alte conexiuni
        auto n = co_await socket.async_read_some(
            asio::buffer(data), asio::use_awaitable
        );
        co_await asio::async_write(
            socket, asio::buffer(data, n), asio::use_awaitable
        );
    }
}
\`\`\`

**Greșeli comune**

• **\`io_context::run()\` pe un singur thread** — pentru aplicații multi-core, rulează \`io_context::run()\` pe mai multe thread-uri sau folosește \`strand\` pentru a evita race conditions în handlere
• **Obiectele trebuie să trăiască până la completarea operației** — dacă un obiect e distrus înainte ca handler-ul să fie apelat, comportamentul e nedefinit; folosește \`shared_from_this()\`
• **Nu bloca în handlere** — un handler lent blochează întregul event loop; mută munca pe un thread worker separat cu \`asio::post()\``,
  },
  {
    id: "6a0b51491419ceefc0244c8a",
    title: "Profiling cu perf și gprof",
    content: `**Profiling-ul** este procesul de măsurare a performanței unui program pentru a identifica bottleneck-urile — funcțiile sau secțiunile de cod care consumă cel mai mult timp sau memorie. Regula de aur a optimizării: *nu optimiza fără să măsori*. Cel puțin 80% din timp e consumat de 20% din cod.

**De ce să profilezi înainte să optimizezi?**

Intuiția despre performanță este adesea greșită. Ce pare lent (un sort) poate fi neglijabil comparativ cu o funcție apelată de milioane de ori. Profilele îți arată unde e *cu adevărat* problema.

**Compilare pentru profiling**

\`\`\`bash
# gprof: compileaza cu -pg
g++ -pg -O2 -o program main.cpp

# perf: nu necesita flag special, dar simboluri debug sunt utile
g++ -O2 -g -o program main.cpp

# Valgrind/callgrind: nu necesita flag, dar -g ajuta la simboluri
g++ -O1 -g -o program main.cpp
\`\`\`

**gprof — profiling traditional**

\`gprof\` este inclus în GCC toolchain și oferă informații despre cât timp s-a petrecut în fiecare funcție:

\`\`\`bash
# 1. Compileaza cu -pg
g++ -pg -O2 -o myapp main.cpp

# 2. Ruleaza programul (genereaza gmon.out)
./myapp

# 3. Analizeaza cu gprof
gprof myapp gmon.out > raport.txt
cat raport.txt
\`\`\`

Output-ul gprof arată:
\`\`\`
Flat profile:

Each sample counts as 0.01 seconds.
  %   cumulative   self              self     total
 time   seconds   seconds    calls   s/call   s/call  name
 45.23      2.31     2.31   100000     0.00     0.00  calculeaza_ceva
 23.15      3.49     1.18  1000000     0.00     0.00  sorteaza_vector
 18.44      4.43     0.94        1     0.94     4.43  main
\`\`\`

**perf — profiling la nivel de kernel (Linux)**

\`perf\` este mai precis decât gprof și nu necesită recompilare:

\`\`\`bash
# Profiling de baza: afiseaza top functii dupa CPU time
perf stat ./myapp              # statistici generale (cache misses, etc.)
perf record ./myapp            # inregistreaza profile
perf report                    # interactiv: vizualizeaza unde se consuma CPU

# Exemple de output perf stat:
#  Performance counter stats for './myapp':
#     4,123,456,789  instructions     # 1.23  insn per cycle
#       245,678,901  cache-misses     # 12.4% of all cache refs — PROBLEMA!
#       1,983,456    branch-misses
\`\`\`

**Valgrind Callgrind — profiling cu apeluri**

\`\`\`bash
# Ruleaza cu callgrind (mai lent, dar foarte detaliat)
valgrind --tool=callgrind ./myapp
callgrind_annotate callgrind.out.PID > raport_callgrind.txt

# KCachegrind — vizualizare grafica a callgrind output
kcachegrind callgrind.out.PID
\`\`\`

**Micro-benchmarking cu Google Benchmark**

\`\`\`cpp
#include <benchmark/benchmark.h>
#include <vector>
#include <algorithm>

static void BM_SortVector(benchmark::State& state) {
    std::vector<int> v(state.range(0));
    // Umple cu date aleatoare
    for (auto& x : v) x = rand();

    for (auto _ : state) {  // bucla de benchmark
        auto copy = v;
        std::sort(copy.begin(), copy.end());
        benchmark::DoNotOptimize(copy); // previne eliminarea de catre compiler
    }
    state.SetBytesProcessed(
        state.iterations() * state.range(0) * sizeof(int)
    );
}

BENCHMARK(BM_SortVector)->Range(8, 8 << 20); // test cu 8 la 8M elemente
BENCHMARK_MAIN();

// Compilare si rulare:
// g++ -O2 -o bench bench.cpp -lbenchmark -lpthread
// ./bench --benchmark_out=results.json
\`\`\`

**Interpretarea rezultatelor și acțiunile de urmat**

\`\`\`
Top cauze de bottleneck si solutii:
├── Cache misses (>10% in perf stat)
│   ├── Reorganizeaza structurile de date (SoA vs AoS)
│   └── Acces secvential in loc de aleatoriu
├── O functie consuma >50% CPU
│   ├── Algoritmul e suboptimal? (O(n²) → O(n log n))
│   └── Apelata prea des? Memorizare/caching?
├── Alocare memorie frecventa
│   ├── Prealoca cu reserve()
│   └── Foloseste object pool
└── Sincronizare mutex excesiva
    └── Lock granularitate mai mica sau structuri lock-free
\`\`\`

**Greșeli comune**

• **Profilare fără flag-ul de optimizare** — profilează întotdeauna cu \`-O2\` sau \`-O3\`, nu cu \`-O0\`, pentru că profilul de Debug nu reflectă comportamentul în producție
• **Optimizarea prematură** — scrie cod corect mai întâi, profilează, abia apoi optimizează zonele identificate
• **Ignorarea cache miss-urilor** — cache miss-urile sunt adesea cauza principală de performanță slabă; perf stat le arată clar`,
  },
  {
    id: "6a0b514b1419ceefc0244c91",
    title: "std::filesystem (C++17)",
    content: `Înainte de C++17, operațiile cu fișiere și directoare în C++ necesitau cod dependent de platformă — \`<dirent.h>\` pe Linux, \`<windows.h>\` pe Windows. **std::filesystem** (header \`<filesystem>\`) oferă un API portabil, modern și expresiv pentru toate operațiile cu sistemul de fișiere.

**Incluziune și namespace**

\`\`\`cpp
#include <filesystem>
#include <iostream>

namespace fs = std::filesystem; // alias comun
\`\`\`

**Clasa fs::path — reprezentarea căilor**

\`fs::path\` gestionează căile în mod portabil (slash vs backslash, separatoare):

\`\`\`cpp
#include <filesystem>
namespace fs = std::filesystem;

int main() {
    fs::path p1 = "/home/user/documente/fisier.txt";
    fs::path p2 = "date/raport.csv";

    // Componente ale caii
    std::cout << p1.filename()   << "\\n"; // fisier.txt
    std::cout << p1.stem()       << "\\n"; // fisier (fara extensie)
    std::cout << p1.extension()  << "\\n"; // .txt
    std::cout << p1.parent_path()<< "\\n"; // /home/user/documente

    // Concatenare portabila (nu cu + sau / manual!)
    fs::path complet = fs::path("proiect") / "src" / "main.cpp";
    std::cout << complet << "\\n"; // proiect/src/main.cpp (sau \\ pe Windows)
}
\`\`\`

**Verificarea existenței și tipului**

\`\`\`cpp
#include <filesystem>
namespace fs = std::filesystem;

void analizeaza(const fs::path& p) {
    if (!fs::exists(p)) {
        std::cout << p << " nu exista\\n";
        return;
    }

    if (fs::is_regular_file(p)) {
        std::cout << "Fisier: " << fs::file_size(p) << " bytes\\n";
    } else if (fs::is_directory(p)) {
        std::cout << "Director\\n";
    } else if (fs::is_symlink(p)) {
        std::cout << "Link simbolic -> " << fs::read_symlink(p) << "\\n";
    }

    // Metadate
    auto timp_modif = fs::last_write_time(p);
    std::cout << "Ultima modificare: OK\\n";
}
\`\`\`

**Operații cu directoare**

\`\`\`cpp
#include <filesystem>
#include <iostream>
namespace fs = std::filesystem;

int main() {
    // Creare directoare (inclusiv parinti — echivalent mkdir -p)
    fs::create_directories("proiect/src/utils");

    // Listare director
    for (const auto& entry : fs::directory_iterator("proiect")) {
        std::cout << entry.path().filename();
        if (entry.is_directory()) std::cout << "/";
        std::cout << "\\n";
    }

    // Parcurgere recursiva (toate subdirectoarele)
    for (const auto& entry : fs::recursive_directory_iterator("proiect")) {
        // Afiseaza calea relativa si tipul
        std::cout << entry.path() << " — "
                  << (entry.is_directory() ? "DIR" : "FILE") << "\\n";
    }

    // Copiere, mutare, stergere
    fs::copy("sursa.txt", "destinatie.txt");
    fs::copy("dir_sursa", "dir_dest", fs::copy_options::recursive);
    fs::rename("vechi.txt", "nou.txt"); // mutare/redenumire
    fs::remove("fisier.txt");           // stergere fisier
    fs::remove_all("director_temp");    // stergere recursiva (ca rm -rf)
}
\`\`\`

**Calculul dimensiunii unui director**

\`\`\`cpp
#include <filesystem>
#include <iostream>
namespace fs = std::filesystem;

uintmax_t dimensiune_director(const fs::path& dir) {
    uintmax_t total = 0;
    for (const auto& entry : fs::recursive_directory_iterator(dir)) {
        if (entry.is_regular_file()) {
            total += entry.file_size();
        }
    }
    return total;
}

int main() {
    auto bytes = dimensiune_director("proiect");
    std::cout << "Dimensiune: " << bytes / 1024 / 1024 << " MB\\n";
}
\`\`\`

**Filtrarea fișierelor după extensie**

\`\`\`cpp
#include <filesystem>
#include <vector>
namespace fs = std::filesystem;

std::vector<fs::path> gaseste_fisiere(
    const fs::path& dir,
    const std::string& extensie)
{
    std::vector<fs::path> rezultat;
    for (const auto& entry : fs::recursive_directory_iterator(dir)) {
        if (entry.is_regular_file() && entry.path().extension() == extensie) {
            rezultat.push_back(entry.path());
        }
    }
    return rezultat;
}

// Gaseste toate fisierele .cpp in proiect
auto fisiere_cpp = gaseste_fisiere(".", ".cpp");
\`\`\`

**Greșeli comune**

• **Nu verifica existența înainte de operații** — \`fs::file_size()\` pe un fișier inexistent aruncă excepție; verifică întotdeauna cu \`fs::exists()\`
• **Concatenarea manuală cu string +** — folosește operatorul \`/\` din \`fs::path\` pentru portabilitate; pe Windows \`"dir" + "/" + "file"\` poate produce căi incorecte
• **\`remove_all()\` pe cale relativă** — asigură-te că lucrezi în directorul corect; o cale greșită poate șterge date importante`,
  },
  {
    id: "6a0b51531419ceefc0244cba",
    title: "Heap și Priority Queue",
    content: `Un **heap** (grămadă) este o structură de date arborescentă cu proprietatea că părintele este întotdeauna mai mare (max-heap) sau mai mic (min-heap) decât copiii săi. Aceasta garantează că elementul maxim sau minim este mereu accesibil în O(1), iar inserarea și extragerea lui se fac în O(log n).

**Proprietăți heap**

• **Max-heap**: valoarea părintelui ≥ valorile copiilor (rădăcina = maximul)
• **Min-heap**: valoarea părintelui ≤ valorile copiilor (rădăcina = minimul)
• **Heap-ul este complet**: toate nivelurile sunt pline, cu excepția ultimului
• **Implementare eficientă în array**: nodul la indexul i are copii la 2i+1 și 2i+2, părintele la (i-1)/2

**std::priority_queue — heap în STL**

\`\`\`cpp
#include <queue>
#include <iostream>

int main() {
    // Max-heap implicit (cel mai mare element e mereu pe varf)
    std::priority_queue<int> max_heap;
    max_heap.push(5);
    max_heap.push(1);
    max_heap.push(8);
    max_heap.push(3);

    while (!max_heap.empty()) {
        std::cout << max_heap.top() << " "; // 8 5 3 1
        max_heap.pop();
    }

    // Min-heap: inversam comparatorul
    std::priority_queue<int, std::vector<int>, std::greater<int>> min_heap;
    min_heap.push(5);
    min_heap.push(1);
    min_heap.push(8);
    // top() = 1 (minimul)
    std::cout << "\\nMinim: " << min_heap.top() << "\\n";
}
\`\`\`

**Priority queue cu structuri custom**

\`\`\`cpp
#include <queue>
#include <string>
#include <iostream>

struct Task {
    int prioritate;
    std::string nume;

    // Operatorul < defineste ordinea in heap
    bool operator<(const Task& other) const {
        return prioritate < other.prioritate; // max-heap dupa prioritate
    }
};

int main() {
    std::priority_queue<Task> coada_sarcini;
    coada_sarcini.push({3, "Scriere raport"});
    coada_sarcini.push({10, "Bug critic in productie"});
    coada_sarcini.push({1, "Curatenie cod"});
    coada_sarcini.push({7, "Code review"});

    while (!coada_sarcini.empty()) {
        auto t = coada_sarcini.top();
        coada_sarcini.pop();
        std::cout << "P" << t.prioritate << ": " << t.nume << "\\n";
    }
    // Output (in ordine descrescatoare a prioritatii):
    // P10: Bug critic in productie
    // P7: Code review
    // P3: Scriere raport
    // P1: Curatenie cod
}
\`\`\`

**Algoritmul Dijkstra cu priority queue**

Priority queue este esențial în algoritmul Dijkstra pentru găsirea drumului minim:

\`\`\`cpp
#include <queue>
#include <vector>
#include <climits>
#include <iostream>

using pii = std::pair<int, int>; // {distanta, nod}

std::vector<int> dijkstra(
    int start,
    const std::vector<std::vector<pii>>& graf,
    int n)
{
    std::vector<int> dist(n, INT_MAX);
    std::priority_queue<pii, std::vector<pii>, std::greater<pii>> pq; // min-heap

    dist[start] = 0;
    pq.push({0, start});

    while (!pq.empty()) {
        auto [d, u] = pq.top(); pq.pop();

        if (d > dist[u]) continue; // distanta mai veche, ignora

        for (auto [w, v] : graf[u]) {
            if (dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                pq.push({dist[v], v});
            }
        }
    }
    return dist;
}
\`\`\`

**make_heap, push_heap, pop_heap pe vector**

Dacă ai nevoie de acces direct la elementele interne (ceva ce priority_queue nu oferă):

\`\`\`cpp
#include <algorithm>
#include <vector>
#include <iostream>

int main() {
    std::vector<int> v = {3, 1, 4, 1, 5, 9, 2, 6};

    // Transforma vectorul in max-heap: O(n)
    std::make_heap(v.begin(), v.end());
    std::cout << "Max: " << v.front() << "\\n"; // 9

    // Adauga un element si pastreaza proprietatea heap
    v.push_back(7);
    std::push_heap(v.begin(), v.end()); // O(log n)

    // Extrage maximul (muta la sfarsit, repara heap-ul)
    std::pop_heap(v.begin(), v.end());  // O(log n)
    int max = v.back();
    v.pop_back();
    std::cout << "Extras: " << max << "\\n";
}
\`\`\`

**Greșeli comune**

• **Accesul la elementele din priority_queue** — nu poți itera sau accesa elemente interne; dacă ai nevoie de asta, folosește un vector + \`make_heap\`
• **Comparatorul greșit** — \`std::priority_queue\` cu \`greater<T>\` dă min-heap, dar cu operator \`<\` customizat logica se poate inversa; testează explicit
• **Modificarea elementelor din heap** — odată inserat, nu poți modifica prioritatea unui element; soluția: inserează o copie nouă cu noua prioritate și ignoră versiunile vechi`,
  },
  {
    id: "6a0b51611419ceefc0244d0f",
    title: "Thread Pool — implementare simpla",
    content: `Un **thread pool** (bazin de thread-uri) este un pattern de concurrency în care un număr fix de thread-uri stau în așteptare și preiau task-uri dintr-o coadă partajată. Avantajul principal: elimini costul de creare/distrugere al thread-urilor pentru fiecare task — crearea unui thread durează microsecunde, cost important dacă ai mii de task-uri mici.

**Problema fără thread pool**

\`\`\`cpp
// Rau: creare thread pentru fiecare request HTTP
void handle_request(Request req) {
    std::thread t([req]() { process(req); });
    t.detach(); // periculos: nu poti controla numarul de thread-uri!
}
// Cu 10000 req/sec: 10000 thread-uri, memorie epuizata, context switching enorm
\`\`\`

**Implementare thread pool cu mutex și condition variable**

\`\`\`cpp
#include <thread>
#include <mutex>
#include <condition_variable>
#include <queue>
#include <functional>
#include <vector>
#include <iostream>

class ThreadPool {
public:
    explicit ThreadPool(size_t num_threads) : stop_(false) {
        for (size_t i = 0; i < num_threads; i++) {
            workers_.emplace_back([this] {
                while (true) {
                    std::function<void()> task;
                    {
                        std::unique_lock<std::mutex> lock(mtx_);
                        cv_.wait(lock, [this] {
                            return stop_ || !tasks_.empty();
                        });
                        if (stop_ && tasks_.empty()) return; // oprire curata
                        task = std::move(tasks_.front());
                        tasks_.pop();
                    } // mutex eliberat inainte de executia taskului
                    task(); // executa task-ul
                }
            });
        }
    }

    // Submit task - returneaza std::future pentru rezultat
    template<typename F>
    void enqueue(F&& f) {
        {
            std::lock_guard<std::mutex> lock(mtx_);
            if (stop_) throw std::runtime_error("ThreadPool oprit");
            tasks_.push(std::function<void()>(std::forward<F>(f)));
        }
        cv_.notify_one(); // trezeste un thread disponibil
    }

    ~ThreadPool() {
        {
            std::lock_guard<std::mutex> lock(mtx_);
            stop_ = true;
        }
        cv_.notify_all(); // trezeste toate thread-urile sa se opreasca
        for (auto& w : workers_) w.join(); // asteapta terminarea lor
    }

private:
    std::vector<std::thread> workers_;
    std::queue<std::function<void()>> tasks_;
    std::mutex mtx_;
    std::condition_variable cv_;
    bool stop_;
};
\`\`\`

**Utilizare thread pool**

\`\`\`cpp
int main() {
    ThreadPool pool(4); // 4 thread-uri worker

    // Submit 20 task-uri
    for (int i = 0; i < 20; i++) {
        pool.enqueue([i] {
            std::cout << "Task " << i
                      << " executat de thread "
                      << std::this_thread::get_id() << "\\n";
            std::this_thread::sleep_for(std::chrono::milliseconds(100));
        });
    }
    // Destructorul asteapta toate task-urile sa se termine
    std::cout << "Toate task-urile trimise.\\n";
}
// Output: cele 20 task-uri executate de cele 4 thread-uri in paralel
\`\`\`

**Thread pool cu std::future pentru rezultate**

\`\`\`cpp
#include <future>

class ThreadPoolWithFuture {
    // ... acelasi constructor si destructor ca mai sus ...
public:
    template<typename F, typename... Args>
    auto submit(F&& f, Args&&... args)
        -> std::future<std::invoke_result_t<F, Args...>>
    {
        using RetType = std::invoke_result_t<F, Args...>;
        auto task = std::make_shared<std::packaged_task<RetType()>>(
            std::bind(std::forward<F>(f), std::forward<Args>(args)...)
        );
        std::future<RetType> result = task->get_future();
        {
            std::lock_guard<std::mutex> lock(mtx_);
            tasks_.push([task]() { (*task)(); });
        }
        cv_.notify_one();
        return result;
    }
};

// Utilizare:
ThreadPoolWithFuture pool(4);
auto viitor = pool.submit([](int x, int y) { return x + y; }, 10, 20);
std::cout << "Rezultat: " << viitor.get() << "\\n"; // 30 (asteapta rezultatul)
\`\`\`

**Greșeli comune**

• **Distrugerea pool-ului fără a finaliza task-urile** — destructorul trebuie să aștepte toate thread-urile cu \`join()\`, altfel programul se termină cu thread-uri active
• **Capturarea prin referință în lambdas** — dacă captezi o variabilă locală prin referință și aceasta e distrusă înainte ca task-ul să ruleze, obții undefined behavior; captează prin valoare sau folosește \`shared_ptr\`
• **Numărul greșit de thread-uri** — regula practică: pentru task-uri CPU-bound folosește \`std::thread::hardware_concurrency()\` thread-uri; pentru I/O-bound poți folosi mai multe (4-16x)`,
  },
  {
    id: "6a0b51641419ceefc0244d22",
    title: "Patterns folosite si bune practici",
    content: `Design pattern-urile sunt soluții reutilizabile pentru probleme comune de design software. În C++ modern, pattern-urile clasice GoF (Gang of Four) se implementează mai elegant și mai sigur cu smart pointers, lambdas și templates față de C++ clasic.

**RAII — cel mai important pattern în C++**

RAII (Resource Acquisition Is Initialization) este fundamentul C++ modern: resursele (memorie, fișiere, mutex-uri, conexiuni) sunt dobândite în constructor și eliberate în destructor. Asigură că resursele sunt întotdeauna eliberate, chiar și la excepție:

\`\`\`cpp
class FileGuard {
    FILE* f_;
public:
    explicit FileGuard(const char* name, const char* mode)
        : f_(fopen(name, mode)) {
        if (!f_) throw std::runtime_error("Nu pot deschide fisierul");
    }
    ~FileGuard() { fclose(f_); } // eliberat automat

    // Interzice copiere (resursa nu se partajeaza)
    FileGuard(const FileGuard&) = delete;
    FileGuard& operator=(const FileGuard&) = delete;

    FILE* get() const { return f_; }
};
// Utilizare: FileGuard f("date.txt", "r"); — nu uiti niciodata sa inchizi
\`\`\`

**Singleton — instanță unică globală**

\`\`\`cpp
class Config {
    Config() = default; // constructor privat

public:
    // Thread-safe in C++11 (local static initialization e atomica)
    static Config& instance() {
        static Config inst;
        return inst;
    }

    // Sterge copiere si mutare
    Config(const Config&) = delete;
    Config& operator=(const Config&) = delete;

    void set(const std::string& key, const std::string& val) {
        data_[key] = val;
    }
    std::string get(const std::string& key) const {
        auto it = data_.find(key);
        return it != data_.end() ? it->second : "";
    }
private:
    std::unordered_map<std::string, std::string> data_;
};

// Utilizare:
Config::instance().set("db_url", "mongodb://...");
auto url = Config::instance().get("db_url");
\`\`\`

**Observer — notificări despre schimbări de stare**

\`\`\`cpp
#include <functional>
#include <vector>

template<typename... Args>
class Event {
    std::vector<std::function<void(Args...)>> handlers_;
public:
    void subscribe(std::function<void(Args...)> handler) {
        handlers_.push_back(std::move(handler));
    }
    void emit(Args... args) {
        for (auto& h : handlers_) h(args...);
    }
};

// Utilizare:
Event<int, std::string> on_login;
on_login.subscribe([](int user_id, std::string email) {
    std::cout << "Logat: " << email << "\\n";
});
on_login.subscribe([](int user_id, std::string email) {
    // Scrie in audit log
});
on_login.emit(42, "user@example.com"); // ambii handleri se apeleaza
\`\`\`

**Factory Method — creare de obiecte**

\`\`\`cpp
#include <memory>
#include <string>

struct Shape {
    virtual void draw() const = 0;
    virtual ~Shape() = default;
};

struct Circle : Shape {
    void draw() const override { std::cout << "Cerc\\n"; }
};

struct Rectangle : Shape {
    void draw() const override { std::cout << "Dreptunghi\\n"; }
};

// Factory function — returneaza unique_ptr pentru ownership clar
std::unique_ptr<Shape> createShape(const std::string& type) {
    if (type == "circle")    return std::make_unique<Circle>();
    if (type == "rectangle") return std::make_unique<Rectangle>();
    throw std::invalid_argument("Tip necunoscut: " + type);
}

// Utilizare:
auto shape = createShape("circle");
shape->draw(); // polimorfism
\`\`\`

**Builder — construcție complexă de obiecte**

\`\`\`cpp
struct QueryBuilder {
    std::string table_;
    std::vector<std::string> columns_;
    std::string where_;
    int limit_ = 0;

    QueryBuilder& from(std::string t)          { table_ = t; return *this; }
    QueryBuilder& select(std::string col)       { columns_.push_back(col); return *this; }
    QueryBuilder& where(std::string cond)       { where_ = cond; return *this; }
    QueryBuilder& limit(int n)                  { limit_ = n; return *this; }

    std::string build() const {
        std::string q = "SELECT ";
        for (auto& c : columns_) q += c + ", ";
        q += " FROM " + table_;
        if (!where_.empty()) q += " WHERE " + where_;
        if (limit_) q += " LIMIT " + std::to_string(limit_);
        return q;
    }
};

// Utilizare fluenta:
auto query = QueryBuilder{}
    .from("utilizatori")
    .select("id").select("email")
    .where("activ = 1")
    .limit(10)
    .build();
\`\`\`

**Greșeli comune**

• **Singleton ca variabilă globală deghizată** — Singleton-ul trebuie folosit cu discernământ; face codul greu de testat; preferă injecție de dependențe când e posibil
• **Virtual destructor lipsă** — orice clasă cu metode virtuale trebuie să aibă destructorul virtual; altfel, ștergerea unui pointer la clasă de bază produce undefined behavior
• **Copiere neașteptată** — clasele care dețin resurse (RAII) trebuie să declare explicit politica de copiere/mutare (Rule of 5) sau s-o interzică cu \`= delete\``,
  },
  {
    id: "6a0b51731419ceefc0244d80",
    title: "Memoria si transferul de date intre JS si WASM",
    content: `Cea mai importantă diferență dintre JavaScript și WebAssembly este modelul de memorie: **WASM nu accesează direct heap-ul JavaScript** și invers. Comunicarea se face printr-o zonă de memorie partajată — un \`WebAssembly.Memory\` — care este un \`ArrayBuffer\` văzut ca un array de bytes de ambele părți.

**Modelul de memorie WASM**

WebAssembly folosește o memorie liniară — un spațiu contiguu de bytes, accesibil ca \`WebAssembly.Memory\`. JavaScript poate citi și scrie în această memorie direct, prin \`TypedArrays\`. Codul C++ compilat în WASM primește un "heap" gestionat în această memorie, cu \`malloc/free\` funcționând normal în interiorul ei.

\`\`\`c
// C/C++ compilat in WASM cu Emscripten

#include <emscripten.h>
#include <stdlib.h>
#include <string.h>

// Functie exportata: aloca memorie si returneaza pointer-ul
EMSCRIPTEN_KEEPALIVE
int* aloca_array(int size) {
    return (int*)malloc(size * sizeof(int));
}

EMSCRIPTEN_KEEPALIVE
void elibereaza(void* ptr) {
    free(ptr);
}

// Prelucreaza un array de numere: inmultire cu scalar
EMSCRIPTEN_KEEPALIVE
void inmulteste_array(int* arr, int size, int scalar) {
    for (int i = 0; i < size; i++) {
        arr[i] *= scalar;
    }
}
\`\`\`

**Pasarea datelor din JS în WASM**

\`\`\`javascript
// JavaScript: apel la modulul WASM compilat din C++
async function exempluTransferDate() {
    const { instance } = await WebAssembly.instantiateStreaming(
        fetch('modul.wasm')
    );
    const { memory, aloca_array, elibereaza, inmulteste_array } = instance.exports;

    const numarElemente = 5;
    const date = [10, 20, 30, 40, 50];

    // 1. Aloca memorie in WASM heap
    const ptr = aloca_array(numarElemente); // returneaza offset in LinearMemory

    // 2. Obtine view-ul TypedArray peste memoria WASM
    const wasmHeap = new Int32Array(memory.buffer, ptr, numarElemente);

    // 3. Copiaza datele din JS in WASM
    wasmHeap.set(date);
    console.log('Inainte:', Array.from(wasmHeap)); // [10, 20, 30, 40, 50]

    // 4. Apeleaza functia WASM (opereaza direct in memorie)
    inmulteste_array(ptr, numarElemente, 3);

    // 5. Citeste rezultatele (acelasi view, actualizat in loc)
    console.log('Dupa:', Array.from(wasmHeap)); // [30, 60, 90, 120, 150]

    // 6. Elibereaza memoria in WASM heap
    elibereaza(ptr);
}
\`\`\`

**Transferul de string-uri JS ↔ WASM**

String-urile sunt mai complexe — JS le reprezintă ca UTF-16, WASM ca bytes UTF-8:

\`\`\`javascript
// Scrie un string JS in memoria WASM
function scrieStringWasm(memory, ptr, text) {
    const encoder = new TextEncoder(); // UTF-8
    const bytes = encoder.encode(text + '\\0'); // adauga null terminator
    const view = new Uint8Array(memory.buffer, ptr, bytes.length);
    view.set(bytes);
}

// Citeste un string din memoria WASM (null-terminated)
function citesteStringWasm(memory, ptr) {
    const view = new Uint8Array(memory.buffer);
    let end = ptr;
    while (view[end] !== 0) end++; // cauta null terminator
    return new TextDecoder().decode(view.slice(ptr, end));
}

// Emscripten ofera functii helper built-in:
// const str = UTF8ToString(ptr);      // C string → JS string
// const ptr = allocateUTF8(jsString); // JS string → WASM (aloca cu malloc)
\`\`\`

**Memoria creste, nu se micsoreaza**

Un detaliu important: \`WebAssembly.Memory\` poate fi CRESCUT cu \`memory.grow(pagini)\` (1 pagine = 64KB), dar **nu poate fi micșorat**. Dacă \`memory.grow()\` returnează -1, ai epuizat limita sau memoria disponibilă:

\`\`\`javascript
const memory = new WebAssembly.Memory({ initial: 10, maximum: 100 }); // in pagini de 64KB
// initial = 640KB, maximum = 6.4MB

const paginiBefore = memory.buffer.byteLength / 65536;
const succces = memory.grow(5); // creste cu 5 pagini = 320KB
if (succces === -1) {
    console.error('Nu s-a putut creste memoria WASM');
}
// ATENTIE: dupa memory.grow(), memory.buffer se schimba (vechi buffer e invalidat!)
// Trebuie sa refaci toate TypedArray-urile care referenciau buffer-ul vechi
\`\`\`

**Greșeli comune**

• **Invalidarea buffer-ului după \`memory.grow()\`** — după orice \`grow()\`, obiectul \`memory.buffer\` se schimbă; toate view-urile TypedArray create anterior devin invalide — recreează-le
• **Nu elibera memoria alocată în WASM** — \`malloc\` din WASM nu e garbage collected; apelul \`free(ptr)\` din JS (prin funcția exportată) este obligatoriu pentru fiecare alocare
• **Confuzia dintre pointer WASM și referință JS** — un pointer WASM este un offset întreg în LinearMemory, nu un pointer JS; nu poți dereferenția direct în JS fără TypedArray`,
  },
];

async function main() {
  console.log(`Updating ${updates.length} C++ sections with manual 10/10 content...`);
  for (const u of updates) {
    await p.theory.update({
      where: { id: u.id },
      data: { content: u.content },
    });
    console.log(`✓ ${u.title} — ${u.content.length} chars`);
  }
  await p.$disconnect();
  console.log("Done.");
}
main().catch(console.error);
