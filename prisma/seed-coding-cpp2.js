const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const tasks = [
  {
    slug: 'cpp-exceptions',
    name: 'Excepții în C++',
    question: 'Scrie o funcție C++ `divide(double a, double b)` care aruncă `std::invalid_argument` dacă b==0, altfel returnează a/b. Prinde excepția în main.',
    language: 'cpp',
    starterCode: '#include <iostream>\n#include <stdexcept>\n\ndouble divide(double a, double b) {\n    if (b == 0) throw std::invalid_argument("Division by zero");\n    return a / b;\n}\n\nint main() {\n    try {\n        std::cout << divide(10, 2) << std::endl;\n        std::cout << divide(5, 0) << std::endl;\n    } catch (const std::invalid_argument &e) {\n        std::cerr << "Error: " << e.what() << std::endl;\n    }\n    return 0;\n}',
    expectedOutput: '5\nError: Division by zero',
  },
  {
    slug: 'cpp-references-modern',
    name: 'References și move semantics',
    question: 'Demonstrează diferența între lvalue și rvalue references în C++11. Scrie o funcție care acceptă ambele și afișează tipul.',
    language: 'cpp',
    starterCode: '#include <iostream>\n#include <string>\n\nvoid process(const std::string &lval) {\n    std::cout << "lvalue: " << lval << std::endl;\n}\n\nvoid process(std::string &&rval) {\n    std::cout << "rvalue: " << rval << std::endl;\n}\n\nint main() {\n    std::string s = "hello";\n    process(s);           // lvalue\n    process("world");     // rvalue\n    process(std::move(s)); // forced rvalue\n    return 0;\n}',
    expectedOutput: 'lvalue: hello\nrvalue: world\nrvalue: hello',
  },
  {
    slug: 'cpp-proiect-magazin',
    name: 'Mini magazin OOP C++',
    question: 'Implementează o clasă `Product` cu name, price, qty. Adaugă metode: apply_discount(%), total_value(), și operator<< pentru afișare.',
    language: 'cpp',
    starterCode: '#include <iostream>\n#include <string>\n\nclass Product {\npublic:\n    std::string name;\n    double price;\n    int qty;\n    Product(std::string n, double p, int q) : name(n), price(p), qty(q) {}\n    void apply_discount(double pct) { price *= (1 - pct/100); }\n    double total_value() { return price * qty; }\n    friend std::ostream& operator<<(std::ostream& os, const Product& p) {\n        return os << p.name << ": " << p.price << " x" << p.qty;\n    }\n};\n\nint main() {\n    Product p("Laptop", 1200.0, 3);\n    p.apply_discount(10);\n    std::cout << p << std::endl;\n    std::cout << "Total: " << p.total_value() << std::endl;\n    return 0;\n}',
    expectedOutput: 'Laptop: 1080 x3\nTotal: 3240',
  },
  {
    slug: 'cpp-smart-pointers-advanced',
    name: 'Smart pointers avansati',
    question: 'Demonstrează utilizarea shared_ptr, weak_ptr și unique_ptr. Arată cum weak_ptr previne circular reference.',
    language: 'cpp',
    starterCode: '#include <iostream>\n#include <memory>\n\nstruct Node {\n    int val;\n    std::shared_ptr<Node> next; // circular daca ar fi shared_ptr\n    // std::weak_ptr<Node> prev; // previne circular\n    Node(int v) : val(v) {}\n    ~Node() { std::cout << "Node " << val << " destroyed\\n"; }\n};\n\nint main() {\n    auto n1 = std::make_shared<Node>(1);\n    auto n2 = std::make_shared<Node>(2);\n    n1->next = n2;\n    // n2->prev = n1; // weak_ptr — nu creste ref count\n    std::cout << "n1 refs: " << n1.use_count() << std::endl;\n    std::cout << "n2 refs: " << n2.use_count() << std::endl;\n    return 0;\n}',
    expectedOutput: 'n1 refs: 1\nn2 refs: 2\nNode 2 destroyed\nNode 1 destroyed',
  },
  {
    slug: 'cpp-multithreading',
    name: 'Thread-uri C++11',
    question: 'Creează 3 thread-uri C++11 care calculează suma parțială a unui vector. Folosește std::thread și std::mutex pentru acces la rezultat.',
    language: 'cpp',
    starterCode: '#include <iostream>\n#include <thread>\n#include <mutex>\n#include <vector>\n\nstd::mutex mtx;\nlong long total = 0;\n\nvoid partial_sum(const std::vector<int>& v, int start, int end) {\n    long long s = 0;\n    for (int i = start; i < end; i++) s += v[i];\n    std::lock_guard<std::mutex> lock(mtx);\n    total += s;\n}\n\nint main() {\n    std::vector<int> v(100, 1); // 100 de 1-uri\n    std::thread t1(partial_sum, std::cref(v), 0, 33);\n    std::thread t2(partial_sum, std::cref(v), 33, 66);\n    std::thread t3(partial_sum, std::cref(v), 66, 100);\n    t1.join(); t2.join(); t3.join();\n    std::cout << "Sum: " << total << std::endl;\n    return 0;\n}',
    expectedOutput: 'Sum: 100',
  },
  {
    slug: 'cpp-ranges-views',
    name: 'C++20 Ranges',
    question: 'Folosind C++20 ranges: filtrează numerele pare dintr-un vector, transformă-le (x*2), și preia primele 3 rezultate.',
    language: 'cpp',
    starterCode: '#include <iostream>\n#include <vector>\n#include <ranges>\n\nint main() {\n    std::vector<int> v = {1,2,3,4,5,6,7,8,9,10};\n    auto result = v\n        | std::views::filter([](int x){ return x % 2 == 0; })\n        | std::views::transform([](int x){ return x * 2; })\n        | std::views::take(3);\n    for (int x : result) std::cout << x << " ";\n    std::cout << std::endl;\n    return 0;\n}',
    expectedOutput: '4 8 12',
  },
  {
    slug: 'cpp-design-patterns',
    name: 'Singleton în C++',
    question: 'Implementează pattern-ul Singleton thread-safe în C++11 folosind static local variable (Meyers Singleton).',
    language: 'cpp',
    starterCode: '#include <iostream>\n\nclass Config {\nprivate:\n    Config() { std::cout << "Config created\\n"; }\npublic:\n    static Config& getInstance() {\n        static Config instance; // thread-safe in C++11\n        return instance;\n    }\n    Config(const Config&) = delete;\n    Config& operator=(const Config&) = delete;\n    void print() { std::cout << "Config instance\\n"; }\n};\n\nint main() {\n    Config::getInstance().print();\n    Config::getInstance().print();\n    return 0;\n}',
    expectedOutput: 'Config created\nConfig instance\nConfig instance',
  },
  {
    slug: 'cpp-stl-advanced',
    name: 'STL algoritmi avansați',
    question: 'Folosind algoritmi STL: sortează un vector de perechi după al doilea element, găsește elementul maxim, și numără elementele > 5.',
    language: 'cpp',
    starterCode: '#include <iostream>\n#include <vector>\n#include <algorithm>\n\nint main() {\n    std::vector<std::pair<std::string,int>> v = {\n        {"alice", 8}, {"bob", 3}, {"carol", 10}, {"dave", 5}\n    };\n    std::sort(v.begin(), v.end(), [](auto& a, auto& b){ return a.second < b.second; });\n    for (auto& p : v) std::cout << p.first << ":" << p.second << " ";\n    std::cout << std::endl;\n    auto maxEl = std::max_element(v.begin(), v.end(), [](auto&a, auto&b){ return a.second < b.second; });\n    std::cout << "Max: " << maxEl->first << std::endl;\n    int cnt = std::count_if(v.begin(), v.end(), [](auto& p){ return p.second > 5; });\n    std::cout << "Above 5: " << cnt << std::endl;\n    return 0;\n}',
    expectedOutput: 'bob:3 dave:5 alice:8 carol:10 \nMax: carol\nAbove 5: 2',
  },
  {
    slug: 'cpp-networking',
    name: 'HTTP request în C++ (cURL)',
    question: 'Scrie codul C++ care face un HTTP GET request folosind libcurl. Afișează status code și primele 100 caractere din response body.',
    language: 'cpp',
    starterCode: '// Simulare: libcurl nu e disponibil in preview\n#include <iostream>\n#include <string>\n\nstruct HttpResponse {\n    int status_code;\n    std::string body;\n};\n\nHttpResponse http_get(const std::string& url) {\n    // In productie: foloseste libcurl\n    // CURL *curl = curl_easy_init();\n    // curl_easy_setopt(curl, CURLOPT_URL, url.c_str());\n    return {200, "Hello from server!"};\n}\n\nint main() {\n    auto resp = http_get("https://api.example.com");\n    std::cout << "Status: " << resp.status_code << std::endl;\n    std::cout << resp.body.substr(0, 100) << std::endl;\n    return 0;\n}',
    expectedOutput: 'Status: 200\nHello from server!',
  },
  {
    slug: 'cpp-performance',
    name: 'Optimizare C++ cu profiling',
    question: 'Compară performanța: acces la elemente vector row-major vs column-major pentru o matrice 1000x1000. Explică de ce row-major e mai rapid (cache locality).',
    language: 'cpp',
    starterCode: '#include <iostream>\n#include <chrono>\n#include <vector>\n\nint main() {\n    const int N = 500;\n    std::vector<std::vector<int>> m(N, std::vector<int>(N, 1));\n    \n    // Row-major (cache friendly)\n    long long sum1 = 0;\n    auto t1 = std::chrono::high_resolution_clock::now();\n    for (int i = 0; i < N; i++)\n        for (int j = 0; j < N; j++)\n            sum1 += m[i][j];\n    auto t2 = std::chrono::high_resolution_clock::now();\n    \n    std::cout << "Sum: " << sum1 << std::endl;\n    std::cout << "Row-major access: O(N^2)\\n";\n    return 0;\n}',
    expectedOutput: 'Sum: 250000\nRow-major access: O(N^2)',
  },
  {
    slug: 'cpp-file-advanced',
    name: 'I/O avansat C++',
    question: 'Scrie un program C++ care citește un CSV (virgulă-delimited), parsează fiecare linie și afișează valorile formatat.',
    language: 'cpp',
    starterCode: '#include <iostream>\n#include <sstream>\n#include <string>\n#include <vector>\n\nstd::vector<std::string> split(const std::string& s, char delim) {\n    std::vector<std::string> tokens;\n    std::stringstream ss(s);\n    std::string token;\n    while (getline(ss, token, delim)) tokens.push_back(token);\n    return tokens;\n}\n\nint main() {\n    std::string csv = "Alice,25,Cluj\\nBob,30,Iasi\\nCarol,28,Timisoara";\n    std::stringstream ss(csv);\n    std::string line;\n    while (getline(ss, line)) {\n        auto fields = split(line, \',\');\n        std::cout << "Nume: " << fields[0] << ", Varsta: " << fields[1] << ", Oras: " << fields[2] << std::endl;\n    }\n    return 0;\n}',
    expectedOutput: 'Nume: Alice, Varsta: 25, Oras: Cluj\nNume: Bob, Varsta: 30, Oras: Iasi\nNume: Carol, Varsta: 28, Oras: Timisoara',
  },
  {
    slug: 'cpp-embedded-systems',
    name: 'Bit manipulation în C++',
    question: 'Scrie funcții C++ pentru operații pe biți: set_bit, clear_bit, toggle_bit, check_bit pentru un registru de 8 biți. Testează pe valoarea 0b10110010.',
    language: 'cpp',
    starterCode: '#include <iostream>\n#include <bitset>\n\nuint8_t set_bit(uint8_t reg, int pos) { return reg | (1 << pos); }\nuint8_t clear_bit(uint8_t reg, int pos) { return reg & ~(1 << pos); }\nuint8_t toggle_bit(uint8_t reg, int pos) { return reg ^ (1 << pos); }\nbool check_bit(uint8_t reg, int pos) { return (reg >> pos) & 1; }\n\nint main() {\n    uint8_t reg = 0b10110010;\n    std::cout << "Initial: " << std::bitset<8>(reg) << std::endl;\n    reg = set_bit(reg, 0);\n    std::cout << "Set bit 0: " << std::bitset<8>(reg) << std::endl;\n    reg = clear_bit(reg, 1);\n    std::cout << "Clear bit 1: " << std::bitset<8>(reg) << std::endl;\n    std::cout << "Bit 7: " << check_bit(reg, 7) << std::endl;\n    return 0;\n}',
    expectedOutput: 'Initial: 10110010\nSet bit 0: 10110011\nClear bit 1: 10110001\nBit 7: 1',
  },
  {
    slug: 'cpp-testing',
    name: 'Unit testing cu assert în C++',
    question: 'Scrie unit tests pentru o funcție `reverse_string(string)`. Testează: string normal, string gol, palindrom, string cu spații.',
    language: 'cpp',
    starterCode: '#include <iostream>\n#include <string>\n#include <algorithm>\n#include <cassert>\n\nstd::string reverse_string(std::string s) {\n    std::reverse(s.begin(), s.end());\n    return s;\n}\n\nvoid run_tests() {\n    assert(reverse_string("hello") == "olleh");\n    assert(reverse_string("") == "");\n    assert(reverse_string("racecar") == "racecar"); // palindrom\n    assert(reverse_string("hello world") == "dlrow olleh");\n    std::cout << "Toate testele au trecut!\\n";\n}\n\nint main() {\n    run_tests();\n    return 0;\n}',
    expectedOutput: 'Toate testele au trecut!',
  },
  {
    slug: 'cpp-modern-features',
    name: 'C++17/20 features',
    question: 'Demonstrează: structured bindings (C++17), std::optional, if constexpr, și fold expressions.',
    language: 'cpp',
    starterCode: '#include <iostream>\n#include <optional>\n#include <map>\n\n// Structured bindings\nstd::optional<int> find_value(const std::map<std::string,int>& m, const std::string& key) {\n    auto it = m.find(key);\n    if (it == m.end()) return std::nullopt;\n    return it->second;\n}\n\n// Fold expression\ntemplate<typename... Args>\nauto sum(Args... args) { return (args + ...); }\n\nint main() {\n    std::map<std::string,int> scores = {{"alice",95},{"bob",87}};\n    auto [k, v] = *scores.begin(); // structured binding\n    std::cout << k << ": " << v << std::endl;\n    \n    if (auto val = find_value(scores, "alice")) std::cout << "Found: " << *val << std::endl;\n    if (auto val = find_value(scores, "carol"); !val) std::cout << "Not found\\n";\n    \n    std::cout << "Sum: " << sum(1,2,3,4,5) << std::endl;\n    return 0;\n}',
    expectedOutput: 'alice: 95\nFound: 95\nNot found\nSum: 15',
  },
  {
    slug: 'cpp-databases',
    name: 'SQLite cu C++',
    question: 'Scrie pseudocod/schița pentru a conecta la SQLite din C++, executa o interogare SELECT și itera prin rezultate.',
    language: 'cpp',
    starterCode: '// Simulare SQLite in C++ (sqlite3.h nu e disponibil in preview)\n#include <iostream>\n#include <vector>\n#include <string>\n\nstruct User { int id; std::string name; std::string email; };\n\n// In productie:\n// sqlite3 *db;\n// sqlite3_open("users.db", &db);\n// sqlite3_exec(db, "CREATE TABLE ...", ...);\n// sqlite3_prepare_v2(db, "SELECT * FROM users", ...)\n\nstd::vector<User> get_users() {\n    return {\n        {1, "Alice", "alice@ex.com"},\n        {2, "Bob", "bob@ex.com"},\n    };\n}\n\nint main() {\n    for (auto& u : get_users())\n        std::cout << u.id << " | " << u.name << " | " << u.email << std::endl;\n    return 0;\n}',
    expectedOutput: '1 | Alice | alice@ex.com\n2 | Bob | bob@ex.com',
  },
  {
    slug: 'cpp-algorithms-advanced',
    name: 'Algoritmi de sortare implementați',
    question: 'Implementează Quicksort recursiv în C++. Testează cu vectorul {64, 25, 12, 22, 11}.',
    language: 'cpp',
    starterCode: '#include <iostream>\n#include <vector>\n\nvoid quicksort(std::vector<int>& v, int low, int high) {\n    if (low >= high) return;\n    int pivot = v[high];\n    int i = low - 1;\n    for (int j = low; j < high; j++) {\n        if (v[j] <= pivot) { i++; std::swap(v[i], v[j]); }\n    }\n    std::swap(v[i+1], v[high]);\n    int pi = i + 1;\n    quicksort(v, low, pi - 1);\n    quicksort(v, pi + 1, high);\n}\n\nint main() {\n    std::vector<int> v = {64, 25, 12, 22, 11};\n    quicksort(v, 0, v.size() - 1);\n    for (int x : v) std::cout << x << " ";\n    std::cout << std::endl;\n    return 0;\n}',
    expectedOutput: '11 12 22 25 64',
  },
  {
    slug: 'cpp-mini-proiect',
    name: 'Task Manager CLI în C++',
    question: 'Scrie un manager de task-uri în C++: clasă Task cu id, title, done. Funcții: add, complete, print_all. Testează cu 3 task-uri.',
    language: 'cpp',
    starterCode: '#include <iostream>\n#include <vector>\n#include <string>\n\nstruct Task {\n    int id;\n    std::string title;\n    bool done = false;\n    Task(int i, std::string t) : id(i), title(t) {}\n};\n\nclass TaskManager {\n    std::vector<Task> tasks;\n    int next_id = 1;\npublic:\n    void add(const std::string& title) { tasks.emplace_back(next_id++, title); }\n    void complete(int id) {\n        for (auto& t : tasks) if (t.id == id) { t.done = true; return; }\n    }\n    void print_all() {\n        for (auto& t : tasks)\n            std::cout << "[" << (t.done ? "x" : " ") << "] " << t.id << ". " << t.title << std::endl;\n    }\n};\n\nint main() {\n    TaskManager tm;\n    tm.add("Invata C++");\n    tm.add("Rezolva exercitii");\n    tm.add("Construieste proiect");\n    tm.complete(1);\n    tm.print_all();\n    return 0;\n}',
    expectedOutput: '[x] 1. Invata C++\n[ ] 2. Rezolva exercitii\n[ ] 3. Construieste proiect',
  },
  {
    slug: 'cpp-coroutines-cpp20',
    name: 'Coroutines C++20',
    question: 'Scrie un generator simplu folosind C++20 coroutines care yield-uiește numere Fibonacci.',
    language: 'cpp',
    starterCode: '#include <iostream>\n// C++20 coroutines - simplificat\n// Simulare fara coroutine support complet\n#include <vector>\n\nstd::vector<int> fibonacci(int n) {\n    std::vector<int> result;\n    int a = 0, b = 1;\n    for (int i = 0; i < n; i++) {\n        result.push_back(a);\n        int tmp = a + b;\n        a = b;\n        b = tmp;\n    }\n    return result;\n}\n\nint main() {\n    for (int x : fibonacci(8)) std::cout << x << " ";\n    std::cout << std::endl;\n    return 0;\n}',
    expectedOutput: '0 1 1 2 3 5 8 13',
  },
  {
    slug: 'cpp-modules-cpp20',
    name: 'Module C++20',
    question: 'Demonstrează sintaxa pentru module C++20: un modul `math` care exportă funcțiile add și multiply, și cum se importă.',
    language: 'cpp',
    starterCode: '// math.ixx (module interface)\n// module math;\n// export int add(int a, int b) { return a + b; }\n// export int multiply(int a, int b) { return a * b; }\n\n// main.cpp\n// import math;\n#include <iostream>\n\n// Fallback fara module support\nint add(int a, int b) { return a + b; }\nint multiply(int a, int b) { return a * b; }\n\nint main() {\n    std::cout << add(3, 4) << std::endl;\n    std::cout << multiply(3, 4) << std::endl;\n    return 0;\n}',
    expectedOutput: '7\n12',
  },
  {
    slug: 'cpp-concepts-cpp20',
    name: 'Concepts C++20',
    question: 'Definește un concept C++20 `Numeric` care verifică dacă un tip suportă +, -, * și /. Folosește-l pentru o funcție template safe.',
    language: 'cpp',
    starterCode: '#include <iostream>\n#include <concepts>\n\n// Concept: tipul trebuie sa fie numeric\ntemplate<typename T>\nconcept Numeric = std::integral<T> || std::floating_point<T>;\n\ntemplate<Numeric T>\nT safe_divide(T a, T b) {\n    if (b == T{0}) throw std::invalid_argument("Division by zero");\n    return a / b;\n}\n\nint main() {\n    std::cout << safe_divide(10, 3) << std::endl;   // int\n    std::cout << safe_divide(10.0, 3.0) << std::endl; // double\n    try { safe_divide(5, 0); } catch (auto& e) { std::cout << e.what() << std::endl; }\n    return 0;\n}',
    expectedOutput: '3\n3.33333\nDivision by zero',
  },
  {
    slug: 'cpp-ranges-format',
    name: 'std::format C++20',
    question: 'Folosind std::format (C++20), formatează output-ul: un tabel cu date de utilizatori, numere cu precizie fixă, și padding.',
    language: 'cpp',
    starterCode: '#include <iostream>\n// #include <format> // C++20\n#include <iomanip>\n#include <string>\n\nstruct User { std::string name; int age; double score; };\n\nint main() {\n    std::vector<User> users = {{\"Alice\", 25, 95.5}, {\"Bob\", 30, 87.3}};\n    // Cu std::format (C++20):\n    // std::cout << std::format("{:<10} {:>5} {:>8.2f}\\n", "Nume", "Varsta", "Scor");\n    // Compatibil:\n    std::cout << std::left << std::setw(10) << "Nume"\n              << std::right << std::setw(5) << "Varsta"\n              << std::setw(8) << "Scor" << std::endl;\n    for (auto& u : users)\n        std::cout << std::left << std::setw(10) << u.name\n                  << std::right << std::setw(5) << u.age\n                  << std::fixed << std::setprecision(2) << std::setw(8) << u.score << std::endl;\n    return 0;\n}',
    expectedOutput: 'Nume       Varsta    Scor\nAlice          25   95.50\nBob            30   87.30',
  },
  {
    slug: 'cpp-wasm-emscripten',
    name: 'C++ compilat la WebAssembly',
    question: 'Scrie o funcție C++ `fibonacci(n)` care poate fi compilată cu Emscripten la WebAssembly și apelată din JavaScript.',
    language: 'cpp',
    starterCode: '#include <iostream>\n// #include <emscripten/emscripten.h>\n\n// EMSCRIPTEN_KEEPALIVE permite export catre JS\n// extern "C" EMSCRIPTEN_KEEPALIVE int fibonacci(int n) {\nint fibonacci(int n) {\n    if (n <= 1) return n;\n    return fibonacci(n-1) + fibonacci(n-2);\n}\n\n// Compilare: emcc fibonacci.cpp -o fibonacci.js \\\n//   -s EXPORTED_FUNCTIONS="[\'_fibonacci\']"\n\nint main() {\n    for (int i = 0; i <= 10; i++)\n        std::cout << fibonacci(i) << " ";\n    std::cout << std::endl;\n    return 0;\n}',
    expectedOutput: '0 1 1 2 3 5 8 13 21 34 55',
  },
];

async function main() {
  console.log('Adăugare coding tasks C++ (remaining)...');
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
