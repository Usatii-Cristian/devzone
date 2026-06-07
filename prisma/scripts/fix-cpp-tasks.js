"use strict";
require("dotenv").config({ path: ".env" });
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const FIXES = [
  // 1. "6. STL: containers și algorithms"
  {
    lessonId: "69fb73bf04cba28ef36a3433",
    name: "6. STL: containers și algorithms",
    tasks: [
      { number: 6, type: "fillblank", difficulty: "medium", question: "Completează tipul containerului pentru o secvență dinamică:\n```cpp\n___ <int> v = {1, 2, 3};\nstd::cout << v.size();\n```", answer: "std::vector", starterCode: "", language: "cpp", expectedOutput: "" },
      { number: 7, type: "fillblank", difficulty: "medium", question: "Ce metodă adaugă un element la sfârșitul unui vector?\n```cpp\nstd::vector<int> v;\nv.___( 42 );\n```", answer: "push_back", starterCode: "", language: "cpp", expectedOutput: "" },
      { number: 8, type: "fillblank", difficulty: "medium", question: "Ce se afișează?\n```cpp\nstd::vector<int> v = {5, 3, 1};\nstd::sort(v.begin(), v.end());\nstd::cout << v[0];\n// Răspuns: ___\n```", answer: "1", starterCode: "", language: "cpp", expectedOutput: "" },
      { number: 9, type: "fillblank", difficulty: "medium", question: "Completează containerul asociativ cheie-valoare:\n```cpp\nstd::___ <std::string, int> m;\nm[\"mere\"] = 3;\n```", answer: "map", starterCode: "", language: "cpp", expectedOutput: "" },
      { number: 10, type: "fillblank", difficulty: "medium", question: "Ce algoritm STL numără apariția unui element?\n```cpp\nint n = std::___(v.begin(), v.end(), 5);\n```", answer: "count", starterCode: "", language: "cpp", expectedOutput: "" },
      { number: 11, type: "coding", difficulty: "medium", question: "Creează un `vector<int>` cu valorile 3, 1, 2, sortează-l și afișează `1 2 3`.", answer: "#include <iostream>\n#include <vector>\n#include <algorithm>\nint main() {\n    std::vector<int> v = {3, 1, 2};\n    std::sort(v.begin(), v.end());\n    for (int x : v) std::cout << x << \" \";\n    return 0;\n}", starterCode: "", language: "cpp", expectedOutput: "1 2 3 " },
      { number: 12, type: "coding", difficulty: "medium", question: "Folosind `std::map<string, int>`, stochează `{\"mere\": 5}` și afișează `5`.", answer: "#include <iostream>\n#include <map>\n#include <string>\nint main() {\n    std::map<std::string, int> m;\n    m[\"mere\"] = 5;\n    std::cout << m[\"mere\"];\n    return 0;\n}", starterCode: "", language: "cpp", expectedOutput: "5" },
      { number: 13, type: "coding", difficulty: "medium", question: "Afișează maximul dintr-un `vector<int> {4, 9, 2, 7}` folosind `std::max_element`.", answer: "#include <iostream>\n#include <vector>\n#include <algorithm>\nint main() {\n    std::vector<int> v = {4, 9, 2, 7};\n    std::cout << *std::max_element(v.begin(), v.end());\n    return 0;\n}", starterCode: "", language: "cpp", expectedOutput: "9" },
      { number: 14, type: "coding", difficulty: "medium", question: "Folosind `std::set<int>`, inserează 3, 1, 3, 2 și afișează elementele (fără duplicate) în ordine.", answer: "#include <iostream>\n#include <set>\nint main() {\n    std::set<int> s = {3, 1, 3, 2};\n    for (int x : s) std::cout << x << \" \";\n    return 0;\n}", starterCode: "", language: "cpp", expectedOutput: "1 2 3 " },
      { number: 15, type: "coding", difficulty: "medium", question: "Calculează suma unui `vector<int> {1,2,3,4,5}` cu `std::accumulate` și afișează `15`.", answer: "#include <iostream>\n#include <vector>\n#include <numeric>\nint main() {\n    std::vector<int> v = {1,2,3,4,5};\n    std::cout << std::accumulate(v.begin(), v.end(), 0);\n    return 0;\n}", starterCode: "", language: "cpp", expectedOutput: "15" },
    ],
  },
  // 2. "10. Proiect: Sistem de inventar magazin"
  {
    lessonId: "69fb73c604cba28ef36a3463",
    name: "10. Proiect: Sistem de inventar magazin",
    tasks: [
      { number: 6, type: "fillblank", difficulty: "medium", question: "Completează declararea clasei Produs:\n```cpp\nclass Produs {\npublic:\n    std::string ___;\n    double pret;\n};\n```", answer: "nume", starterCode: "", language: "cpp", expectedOutput: "" },
      { number: 7, type: "fillblank", difficulty: "medium", question: "Ce se afișează?\n```cpp\nstruct Produs { std::string n; int stoc; };\nProdus p = {\"carte\", 10};\nstd::cout << p.stoc;\n// Răspuns: ___\n```", answer: "10", starterCode: "", language: "cpp", expectedOutput: "" },
      { number: 8, type: "fillblank", difficulty: "medium", question: "Completează metoda care adaugă un produs în vector:\n```cpp\nvoid adauga(Produs p) { inventar.___( p ); }\n```", answer: "push_back", starterCode: "", language: "cpp", expectedOutput: "" },
      { number: 9, type: "fillblank", difficulty: "medium", question: "Completează iteratorul pentru afișarea inventarului:\n```cpp\nfor (___ p : inventar)\n    std::cout << p.nume;\n```", answer: "auto", starterCode: "", language: "cpp", expectedOutput: "" },
      { number: 10, type: "fillblank", difficulty: "medium", question: "Ce returnează `inventar.size()` după adăugarea a 3 produse?\n```cpp\n// Răspuns: ___\n```", answer: "3", starterCode: "", language: "cpp", expectedOutput: "" },
      { number: 11, type: "coding", difficulty: "medium", question: "Definește `struct Produs {string n; double p;}`. Crează un produs `{\"Laptop\", 2999.99}` și afișează `Laptop`.", answer: "#include <iostream>\n#include <string>\nstruct Produs { std::string n; double p; };\nint main() {\n    Produs pr = {\"Laptop\", 2999.99};\n    std::cout << pr.n;\n    return 0;\n}", starterCode: "", language: "cpp", expectedOutput: "Laptop" },
      { number: 12, type: "coding", difficulty: "medium", question: "Afișează numărul de produse dintr-un `vector<Produs>` cu 3 elemente.", answer: "#include <iostream>\n#include <vector>\n#include <string>\nstruct Produs { std::string n; };\nint main() {\n    std::vector<Produs> inv = {{\"A\"},{\"B\"},{\"C\"}};\n    std::cout << inv.size();\n    return 0;\n}", starterCode: "", language: "cpp", expectedOutput: "3" },
      { number: 13, type: "coding", difficulty: "medium", question: "Calculează suma prețurilor: `{pret=10.0}, {pret=20.0}, {pret=30.0}` și afișează `60`.", answer: "#include <iostream>\n#include <vector>\nstruct Produs { double pret; };\nint main() {\n    std::vector<Produs> inv = {{10.0},{20.0},{30.0}};\n    double s = 0;\n    for (auto& p : inv) s += p.pret;\n    std::cout << s;\n    return 0;\n}", starterCode: "", language: "cpp", expectedOutput: "60" },
      { number: 14, type: "coding", difficulty: "medium", question: "Afișează prețul celui mai ieftin produs din `{pret=50},{pret=20},{pret=35}`.", answer: "#include <iostream>\n#include <vector>\n#include <algorithm>\nstruct Produs { double pret; };\nint main() {\n    std::vector<Produs> inv = {{50},{20},{35}};\n    auto it = std::min_element(inv.begin(), inv.end(), [](auto& a, auto& b){ return a.pret < b.pret; });\n    std::cout << it->pret;\n    return 0;\n}", starterCode: "", language: "cpp", expectedOutput: "20" },
      { number: 15, type: "coding", difficulty: "medium", question: "Șterge produsul cu index 1 dintr-un vector de 3 produse și afișează noua dimensiune `2`.", answer: "#include <iostream>\n#include <vector>\nstruct Produs { int id; };\nint main() {\n    std::vector<Produs> inv = {{1},{2},{3}};\n    inv.erase(inv.begin() + 1);\n    std::cout << inv.size();\n    return 0;\n}", starterCode: "", language: "cpp", expectedOutput: "2" },
    ],
  },
  // 3. "12. Smart Pointers Avansați"
  {
    lessonId: "6a021ba2f0ec7fc9c03a6a3f",
    name: "12. Smart Pointers Avansați",
    tasks: [
      { number: 6, type: "fillblank", difficulty: "medium", question: "Completează tipul pentru un pointer unic:\n```cpp\nstd::___<int> p = std::make_unique<int>(42);\n```", answer: "unique_ptr", starterCode: "", language: "cpp", expectedOutput: "" },
      { number: 7, type: "fillblank", difficulty: "medium", question: "Ce se afișează?\n```cpp\nauto p = std::make_shared<int>(100);\nstd::cout << *p;\n// Răspuns: ___\n```", answer: "100", starterCode: "", language: "cpp", expectedOutput: "" },
      { number: 8, type: "fillblank", difficulty: "medium", question: "Câți proprietari poate avea un `shared_ptr`?\n```\n// Răspuns: ___\n```", answer: "mai mulți", starterCode: "", language: "cpp", expectedOutput: "" },
      { number: 9, type: "fillblank", difficulty: "medium", question: "Completează pentru a verifica dacă `unique_ptr` deține un obiect:\n```cpp\nif (p.___())\n    std::cout << \"valid\";\n```", answer: "get", starterCode: "", language: "cpp", expectedOutput: "" },
      { number: 10, type: "fillblank", difficulty: "medium", question: "Ce metodă returnează numărul de referințe ale unui `shared_ptr`?\n```cpp\nstd::cout << p.___();\n```", answer: "use_count", starterCode: "", language: "cpp", expectedOutput: "" },
      { number: 11, type: "coding", difficulty: "medium", question: "Creează un `unique_ptr<int>` cu valoarea 7 și afișează valoarea.", answer: "#include <iostream>\n#include <memory>\nint main() {\n    auto p = std::make_unique<int>(7);\n    std::cout << *p;\n    return 0;\n}", starterCode: "", language: "cpp", expectedOutput: "7" },
      { number: 12, type: "coding", difficulty: "medium", question: "Creează un `shared_ptr<string>` cu `\"C++ smart\"` și afișează valoarea.", answer: "#include <iostream>\n#include <memory>\n#include <string>\nint main() {\n    auto p = std::make_shared<std::string>(\"C++ smart\");\n    std::cout << *p;\n    return 0;\n}", starterCode: "", language: "cpp", expectedOutput: "C++ smart" },
      { number: 13, type: "coding", difficulty: "medium", question: "Copiază un `shared_ptr` și afișează `use_count` = 2.", answer: "#include <iostream>\n#include <memory>\nint main() {\n    auto p1 = std::make_shared<int>(5);\n    auto p2 = p1;\n    std::cout << p1.use_count();\n    return 0;\n}", starterCode: "", language: "cpp", expectedOutput: "2" },
      { number: 14, type: "coding", difficulty: "medium", question: "Mutați un `unique_ptr` cu `std::move` și afișează că originalul e `null`.", answer: "#include <iostream>\n#include <memory>\nint main() {\n    auto p1 = std::make_unique<int>(9);\n    auto p2 = std::move(p1);\n    std::cout << (p1 ? \"valid\" : \"null\");\n    return 0;\n}", starterCode: "", language: "cpp", expectedOutput: "null" },
      { number: 15, type: "coding", difficulty: "medium", question: "Creează un `unique_ptr` la un array de 3 ints, setează `arr[1]=42` și afișează-l.", answer: "#include <iostream>\n#include <memory>\nint main() {\n    auto arr = std::make_unique<int[]>(3);\n    arr[1] = 42;\n    std::cout << arr[1];\n    return 0;\n}", starterCode: "", language: "cpp", expectedOutput: "42" },
    ],
  },
  // 4. "14. C++20 — Ranges și Views"
  {
    lessonId: "6a021ba5f0ec7fc9c03a6a51",
    name: "14. C++20 — Ranges și Views",
    tasks: [
      { number: 6, type: "fillblank", difficulty: "medium", question: "Header-ul pentru ranges în C++20 este:\n```cpp\n#include <___>\n```", answer: "ranges", starterCode: "", language: "cpp", expectedOutput: "" },
      { number: 7, type: "fillblank", difficulty: "medium", question: "Completează pentru a filtra elementele pare:\n```cpp\nauto pare = v | std::views::___([] (int x){ return x % 2 == 0; });\n```", answer: "filter", starterCode: "", language: "cpp", expectedOutput: "" },
      { number: 8, type: "fillblank", difficulty: "medium", question: "Ce view transformă fiecare element?\n```cpp\nauto dublat = v | std::views::___([] (int x){ return x * 2; });\n```", answer: "transform", starterCode: "", language: "cpp", expectedOutput: "" },
      { number: 9, type: "fillblank", difficulty: "medium", question: "Completează pentru a lua primele 3 elemente:\n```cpp\nauto primele = v | std::views::___(3);\n```", answer: "take", starterCode: "", language: "cpp", expectedOutput: "" },
      { number: 10, type: "fillblank", difficulty: "medium", question: "Ranges sortează în loc de a crea copii — sunt evaluate ___.\n```\n// Evaluare: ___\n```", answer: "lazy", starterCode: "", language: "cpp", expectedOutput: "" },
      { number: 11, type: "coding", difficulty: "medium", question: "Folosind `std::ranges::sort`, sortează `{5,2,8,1}` și afișează `1 2 5 8`.", answer: "#include <iostream>\n#include <vector>\n#include <algorithm>\nint main() {\n    std::vector<int> v = {5,2,8,1};\n    std::ranges::sort(v);\n    for (int x : v) std::cout << x << \" \";\n    return 0;\n}", starterCode: "", language: "cpp", expectedOutput: "1 2 5 8 " },
      { number: 12, type: "coding", difficulty: "medium", question: "Afișează dacă `{3,1,4,1,5}` conține `4` folosind `std::ranges::contains`.", answer: "#include <iostream>\n#include <vector>\n#include <algorithm>\nint main() {\n    std::vector<int> v = {3,1,4,1,5};\n    std::cout << (std::ranges::find(v, 4) != v.end() ? \"da\" : \"nu\");\n    return 0;\n}", starterCode: "", language: "cpp", expectedOutput: "da" },
      { number: 13, type: "coding", difficulty: "medium", question: "Afișează suma view-ului primelor 3 elemente din `{10,20,30,40}` → `60`.", answer: "#include <iostream>\n#include <vector>\n#include <ranges>\n#include <numeric>\nint main() {\n    std::vector<int> v = {10,20,30,40};\n    auto v3 = v | std::views::take(3);\n    int s = 0; for (int x : v3) s += x;\n    std::cout << s;\n    return 0;\n}", starterCode: "", language: "cpp", expectedOutput: "60" },
      { number: 14, type: "coding", difficulty: "medium", question: "Afișează elementele pare din `{1,2,3,4,5,6}` folosind `views::filter`.", answer: "#include <iostream>\n#include <vector>\n#include <ranges>\nint main() {\n    std::vector<int> v = {1,2,3,4,5,6};\n    for (int x : v | std::views::filter([](int n){ return n%2==0; }))\n        std::cout << x << \" \";\n    return 0;\n}", starterCode: "", language: "cpp", expectedOutput: "2 4 6 " },
      { number: 15, type: "coding", difficulty: "medium", question: "Transformă `{1,2,3}` înmulțind fiecare element cu 3 și afișează `3 6 9`.", answer: "#include <iostream>\n#include <vector>\n#include <ranges>\nint main() {\n    std::vector<int> v = {1,2,3};\n    for (int x : v | std::views::transform([](int n){ return n*3; }))\n        std::cout << x << \" \";\n    return 0;\n}", starterCode: "", language: "cpp", expectedOutput: "3 6 9 " },
    ],
  },
  // 5. "15. Design Patterns în C++"
  {
    lessonId: "6a021ba6f0ec7fc9c03a6a5a",
    name: "15. Design Patterns în C++",
    tasks: [
      { number: 6, type: "fillblank", difficulty: "medium", question: "Singleton garantează că există o singură ___ a clasei.", answer: "instanță", starterCode: "", language: "cpp", expectedOutput: "" },
      { number: 7, type: "fillblank", difficulty: "medium", question: "Completează metoda Singleton care returnează instanța:\n```cpp\nstatic Singleton& ___() {\n    static Singleton inst;\n    return inst;\n}\n```", answer: "getInstance", starterCode: "", language: "cpp", expectedOutput: "" },
      { number: 8, type: "fillblank", difficulty: "medium", question: "Patternul ___ separă construirea unui obiect complex de reprezentarea sa.", answer: "Builder", starterCode: "", language: "cpp", expectedOutput: "" },
      { number: 9, type: "fillblank", difficulty: "medium", question: "Patternul Observer folosește o relație ___ între subiect și observatori.", answer: "1:n", starterCode: "", language: "cpp", expectedOutput: "" },
      { number: 10, type: "fillblank", difficulty: "medium", question: "Patternul Strategy permite schimbarea ___ la runtime.\n```\n// Schimbă: ___\n```", answer: "algoritmului", starterCode: "", language: "cpp", expectedOutput: "" },
      { number: 11, type: "coding", difficulty: "medium", question: "Implementează un Singleton simplu și afișează `Singleton creat`.", answer: "#include <iostream>\nclass S {\n    S() { std::cout << \"Singleton creat\"; }\npublic:\n    static S& get() { static S i; return i; }\n};\nint main() { S::get(); return 0; }", starterCode: "", language: "cpp", expectedOutput: "Singleton creat" },
      { number: 12, type: "coding", difficulty: "medium", question: "Implementează Factory simplu care returnează `\"Produs A\"` și afișează-l.", answer: "#include <iostream>\n#include <string>\nstd::string factory(int t) { return t == 1 ? \"Produs A\" : \"Produs B\"; }\nint main() {\n    std::cout << factory(1);\n    return 0;\n}", starterCode: "", language: "cpp", expectedOutput: "Produs A" },
      { number: 13, type: "coding", difficulty: "medium", question: "Folosind Strategy, afișează `suma: 5` sau `produs: 6` pentru `add(2,3)` și `mul(2,3)`.", answer: "#include <iostream>\n#include <functional>\nvoid aplica(int a, int b, std::function<int(int,int)> op, std::string n) {\n    std::cout << n << \": \" << op(a, b) << \"\\n\";\n}\nint main() {\n    aplica(2, 3, [](int a, int b){ return a+b; }, \"suma\");\n    aplica(2, 3, [](int a, int b){ return a*b; }, \"produs\");\n    return 0;\n}", starterCode: "", language: "cpp", expectedOutput: "suma: 5\nprodus: 6\n" },
      { number: 14, type: "coding", difficulty: "medium", question: "Implementează Observer: subiectul notifică 2 observatori care afișează `notificat`.", answer: "#include <iostream>\n#include <vector>\n#include <functional>\nclass Subject {\n    std::vector<std::function<void()>> obs;\npublic:\n    void add(std::function<void()> o) { obs.push_back(o); }\n    void notify() { for (auto& o : obs) o(); }\n};\nint main() {\n    Subject s;\n    s.add([]{ std::cout << \"notificat\\n\"; });\n    s.add([]{ std::cout << \"notificat\\n\"; });\n    s.notify();\n    return 0;\n}", starterCode: "", language: "cpp", expectedOutput: "notificat\nnotificat\n" },
      { number: 15, type: "coding", difficulty: "medium", question: "Implementează Decorator simplu: adaugă `\"[bold]\"` în jurul textului `\"C++\"` și afișează `[bold]C++[/bold]`.", answer: "#include <iostream>\n#include <string>\nstd::string bold(std::string s) { return \"[bold]\" + s + \"[/bold]\"; }\nint main() {\n    std::cout << bold(\"C++\");\n    return 0;\n}", starterCode: "", language: "cpp", expectedOutput: "[bold]C++[/bold]" },
    ],
  },
  // 6. "16. STL Avansat — Containere și Algoritmi"
  {
    lessonId: "6a021ba7f0ec7fc9c03a6a63",
    name: "16. STL Avansat — Containere și Algoritmi",
    tasks: [
      { number: 6, type: "fillblank", difficulty: "medium", question: "Containerul care permite inserare/ștergere O(1) la ambele capete este ___.", answer: "deque", starterCode: "", language: "cpp", expectedOutput: "" },
      { number: 7, type: "fillblank", difficulty: "medium", question: "Ce algoritm STL aplică o funcție fiecărui element?\n```cpp\nstd::___(v.begin(), v.end(), print);\n```", answer: "for_each", starterCode: "", language: "cpp", expectedOutput: "" },
      { number: 8, type: "fillblank", difficulty: "medium", question: "Ce se afișează?\n```cpp\nstd::priority_queue<int> pq;\npq.push(3); pq.push(8); pq.push(1);\nstd::cout << pq.top();\n// Răspuns: ___\n```", answer: "8", starterCode: "", language: "cpp", expectedOutput: "" },
      { number: 9, type: "fillblank", difficulty: "medium", question: "Completează algoritmul de căutare binară:\n```cpp\nbool g = std::___(v.begin(), v.end(), 5);\n```", answer: "binary_search", starterCode: "", language: "cpp", expectedOutput: "" },
      { number: 10, type: "fillblank", difficulty: "medium", question: "`unordered_map` oferă acces în timp ___ față de `map` care e O(log n).", answer: "O(1)", starterCode: "", language: "cpp", expectedOutput: "" },
      { number: 11, type: "coding", difficulty: "medium", question: "Folosind `std::find`, caută `7` în `{3,7,2,9}` și afișează `gasit` sau `negasit`.", answer: "#include <iostream>\n#include <vector>\n#include <algorithm>\nint main() {\n    std::vector<int> v = {3,7,2,9};\n    auto it = std::find(v.begin(), v.end(), 7);\n    std::cout << (it != v.end() ? \"gasit\" : \"negasit\");\n    return 0;\n}", starterCode: "", language: "cpp", expectedOutput: "gasit" },
      { number: 12, type: "coding", difficulty: "medium", question: "Elimină duplicatele din `{1,2,2,3,3,3}` cu `unique` și afișează câte elemente rămân: `3`.", answer: "#include <iostream>\n#include <vector>\n#include <algorithm>\nint main() {\n    std::vector<int> v = {1,2,2,3,3,3};\n    auto it = std::unique(v.begin(), v.end());\n    std::cout << std::distance(v.begin(), it);\n    return 0;\n}", starterCode: "", language: "cpp", expectedOutput: "3" },
      { number: 13, type: "coding", difficulty: "medium", question: "Folosind `std::transform`, înmulțește fiecare element din `{2,4,6}` cu 2 și afișează `4 8 12`.", answer: "#include <iostream>\n#include <vector>\n#include <algorithm>\nint main() {\n    std::vector<int> v = {2,4,6}, r(3);\n    std::transform(v.begin(), v.end(), r.begin(), [](int x){ return x*2; });\n    for (int x : r) std::cout << x << \" \";\n    return 0;\n}", starterCode: "", language: "cpp", expectedOutput: "4 8 12 " },
      { number: 14, type: "coding", difficulty: "medium", question: "Afișează elementele mai mari de 5 din `{3,8,1,7,2,9}` cu `copy_if`.", answer: "#include <iostream>\n#include <vector>\n#include <algorithm>\n#include <iterator>\nint main() {\n    std::vector<int> v = {3,8,1,7,2,9};\n    std::copy_if(v.begin(), v.end(), std::ostream_iterator<int>(std::cout, \" \"),\n        [](int x){ return x > 5; });\n    return 0;\n}", starterCode: "", language: "cpp", expectedOutput: "8 7 9 " },
      { number: 15, type: "coding", difficulty: "medium", question: "Afișează al 2-lea cel mai mare element din `{5,1,9,3,7}` după sortare descrescătoare.", answer: "#include <iostream>\n#include <vector>\n#include <algorithm>\nint main() {\n    std::vector<int> v = {5,1,9,3,7};\n    std::sort(v.rbegin(), v.rend());\n    std::cout << v[1];\n    return 0;\n}", starterCode: "", language: "cpp", expectedOutput: "7" },
    ],
  },
  // 7. "17. Rețea și Asio basics"
  {
    lessonId: "6a021ba9f0ec7fc9c03a6a6c",
    name: "17. Rețea și Asio basics",
    tasks: [
      { number: 6, type: "fillblank", difficulty: "medium", question: "Asio este o librărie pentru programare ___.\n```cpp\n// Tip programare: ___\n```", answer: "asincronă", starterCode: "", language: "cpp", expectedOutput: "" },
      { number: 7, type: "fillblank", difficulty: "medium", question: "Obiectul central din Asio care gestionează I/O este ___.\n```cpp\nasio::io_context ___;\n```", answer: "io", starterCode: "", language: "cpp", expectedOutput: "" },
      { number: 8, type: "fillblank", difficulty: "medium", question: "Portul implicit pentru HTTPS este ___.", answer: "443", starterCode: "", language: "cpp", expectedOutput: "" },
      { number: 9, type: "fillblank", difficulty: "medium", question: "Protocol TCP stă pentru Transmission Control ___.", answer: "Protocol", starterCode: "", language: "cpp", expectedOutput: "" },
      { number: 10, type: "fillblank", difficulty: "medium", question: "Completează namespace-ul pentru TCP în Boost.Asio:\n```cpp\nasio::ip::tcp::___ endpoint(asio::ip::tcp::v4(), 8080);\n```", answer: "endpoint", starterCode: "", language: "cpp", expectedOutput: "" },
      { number: 11, type: "coding", difficulty: "medium", question: "Afișează `Asio: IO context creat`.", answer: "#include <iostream>\nint main() {\n    std::cout << \"Asio: IO context creat\";\n    return 0;\n}", starterCode: "", language: "cpp", expectedOutput: "Asio: IO context creat" },
      { number: 12, type: "coding", difficulty: "medium", question: "Afișează portul 8080 formatat ca `Ascult pe: 8080`.", answer: "#include <iostream>\nint main() {\n    int port = 8080;\n    std::cout << \"Ascult pe: \" << port;\n    return 0;\n}", starterCode: "", language: "cpp", expectedOutput: "Ascult pe: 8080" },
      { number: 13, type: "coding", difficulty: "medium", question: "Simulează trimiterea unui mesaj afișând `Mesaj trimis: hello`.", answer: "#include <iostream>\n#include <string>\nvoid trimite(std::string msg) { std::cout << \"Mesaj trimis: \" << msg; }\nint main() {\n    trimite(\"hello\");\n    return 0;\n}", starterCode: "", language: "cpp", expectedOutput: "Mesaj trimis: hello" },
      { number: 14, type: "coding", difficulty: "medium", question: "Afișează adresa IP `127.0.0.1` și portul `3000` în formatul `127.0.0.1:3000`.", answer: "#include <iostream>\nint main() {\n    std::cout << \"127.0.0.1:3000\";\n    return 0;\n}", starterCode: "", language: "cpp", expectedOutput: "127.0.0.1:3000" },
      { number: 15, type: "coding", difficulty: "medium", question: "Simulează primirea datelor: afișează `Primit: 42 bytes`.", answer: "#include <iostream>\nvoid primeste(int bytes) { std::cout << \"Primit: \" << bytes << \" bytes\"; }\nint main() {\n    primeste(42);\n    return 0;\n}", starterCode: "", language: "cpp", expectedOutput: "Primit: 42 bytes" },
    ],
  },
  // 8. "18. Optimizări și Performanță C++"
  {
    lessonId: "6a021baaf0ec7fc9c03a6a75",
    name: "18. Optimizări și Performanță C++",
    tasks: [
      { number: 6, type: "fillblank", difficulty: "medium", question: "Pasarea prin referință const evită ___.\n```cpp\nvoid f(const std::string& s) { /* fără ___ */ }\n```", answer: "copiere", starterCode: "", language: "cpp", expectedOutput: "" },
      { number: 7, type: "fillblank", difficulty: "medium", question: "Completează pentru a rezerva spațiu în vector fără a adăuga elemente:\n```cpp\nv.___(100);\n```", answer: "reserve", starterCode: "", language: "cpp", expectedOutput: "" },
      { number: 8, type: "fillblank", difficulty: "medium", question: "Ce se afișează?\n```cpp\nstd::vector<int> v;\nv.reserve(10);\nstd::cout << v.size();\n// Răspuns: ___\n```", answer: "0", starterCode: "", language: "cpp", expectedOutput: "" },
      { number: 9, type: "fillblank", difficulty: "medium", question: "Funcțiile `inline` elimină overhead-ul de ___.\n```\n// Elimină: ___\n```", answer: "apel", starterCode: "", language: "cpp", expectedOutput: "" },
      { number: 10, type: "fillblank", difficulty: "medium", question: "Move semantics transferă ___ fără copiere.\n```cpp\nauto v2 = std::move(v1); // transferă ___\n```", answer: "proprietatea", starterCode: "", language: "cpp", expectedOutput: "" },
      { number: 11, type: "coding", difficulty: "medium", question: "Afișează capacitatea unui vector după `reserve(50)`.", answer: "#include <iostream>\n#include <vector>\nint main() {\n    std::vector<int> v;\n    v.reserve(50);\n    std::cout << v.capacity();\n    return 0;\n}", starterCode: "", language: "cpp", expectedOutput: "50" },
      { number: 12, type: "coding", difficulty: "medium", question: "Folosind `emplace_back`, adaugă 3 elemente la un vector și afișează dimensiunea.", answer: "#include <iostream>\n#include <vector>\nint main() {\n    std::vector<int> v;\n    v.emplace_back(1);\n    v.emplace_back(2);\n    v.emplace_back(3);\n    std::cout << v.size();\n    return 0;\n}", starterCode: "", language: "cpp", expectedOutput: "3" },
      { number: 13, type: "coding", difficulty: "medium", question: "Afișează `mut: 0` — dimensiunea vectorului după `std::move` a unui vector de 3 elemente.", answer: "#include <iostream>\n#include <vector>\nint main() {\n    std::vector<int> v1 = {1,2,3};\n    std::vector<int> v2 = std::move(v1);\n    std::cout << \"mut: \" << v1.size();\n    return 0;\n}", starterCode: "", language: "cpp", expectedOutput: "mut: 0" },
      { number: 14, type: "coding", difficulty: "medium", question: "Măsoară timpul de execuție al unui loop de 1000 iterații și afișează `OK`.", answer: "#include <iostream>\n#include <chrono>\nint main() {\n    auto start = std::chrono::high_resolution_clock::now();\n    int s = 0;\n    for (int i = 0; i < 1000; i++) s += i;\n    auto end = std::chrono::high_resolution_clock::now();\n    std::cout << \"OK\";\n    return 0;\n}", starterCode: "", language: "cpp", expectedOutput: "OK" },
      { number: 15, type: "coding", difficulty: "medium", question: "Afișează `inline activ` dintr-o funcție `inline`.", answer: "#include <iostream>\ninline void f() { std::cout << \"inline activ\"; }\nint main() { f(); return 0; }", starterCode: "", language: "cpp", expectedOutput: "inline activ" },
    ],
  },
  // 9. "19. Fișiere avansate și Filesystem"
  {
    lessonId: "6a021babf0ec7fc9c03a6a7e",
    name: "19. Fișiere avansate și Filesystem",
    tasks: [
      { number: 6, type: "fillblank", difficulty: "medium", question: "Header-ul pentru operații cu fișiere C++17 este:\n```cpp\n#include <___>\n```", answer: "filesystem", starterCode: "", language: "cpp", expectedOutput: "" },
      { number: 7, type: "fillblank", difficulty: "medium", question: "Completează deschiderea unui fișier pentru scriere:\n```cpp\nstd::ofstream f;\nf.___( \"test.txt\" );\n```", answer: "open", starterCode: "", language: "cpp", expectedOutput: "" },
      { number: 8, type: "fillblank", difficulty: "medium", question: "Ce metodă verifică dacă un fișier există?\n```cpp\nstd::filesystem::___(\"fisier.txt\")\n```", answer: "exists", starterCode: "", language: "cpp", expectedOutput: "" },
      { number: 9, type: "fillblank", difficulty: "medium", question: "Completează citirea unei linii din fișier:\n```cpp\nstd::string linie;\nstd::___(fin, linie);\n```", answer: "getline", starterCode: "", language: "cpp", expectedOutput: "" },
      { number: 10, type: "fillblank", difficulty: "medium", question: "Ce se afișează?\n```cpp\nstd::istringstream ss(\"42\");\nint n; ss >> n;\nstd::cout << n;\n// Răspuns: ___\n```", answer: "42", starterCode: "", language: "cpp", expectedOutput: "" },
      { number: 11, type: "coding", difficulty: "medium", question: "Scrie `Hello` într-un fișier temporar și citește-l înapoi, afișând `Hello`.", answer: "#include <iostream>\n#include <fstream>\nint main() {\n    std::ofstream out(\"tmp.txt\");\n    out << \"Hello\";\n    out.close();\n    std::ifstream in(\"tmp.txt\");\n    std::string s; in >> s;\n    std::cout << s;\n    return 0;\n}", starterCode: "", language: "cpp", expectedOutput: "Hello" },
      { number: 12, type: "coding", difficulty: "medium", question: "Afișează directorul curent de lucru folosind `std::filesystem::current_path()`.", answer: "#include <iostream>\n#include <filesystem>\nint main() {\n    std::cout << std::filesystem::current_path().string().size() > 0 ? \"OK\" : \"eroare\";\n    return 0;\n}", starterCode: "", language: "cpp", expectedOutput: "OK" },
      { number: 13, type: "coding", difficulty: "medium", question: "Scrie 3 numere separate prin newline într-un stringstream și afișează-le.", answer: "#include <iostream>\n#include <sstream>\nint main() {\n    std::ostringstream ss;\n    ss << 1 << \"\\n\" << 2 << \"\\n\" << 3;\n    std::cout << ss.str();\n    return 0;\n}", starterCode: "", language: "cpp", expectedOutput: "1\n2\n3" },
      { number: 14, type: "coding", difficulty: "medium", question: "Parsează stringul `\"10 20 30\"` cu `istringstream` și afișează suma `60`.", answer: "#include <iostream>\n#include <sstream>\nint main() {\n    std::istringstream ss(\"10 20 30\");\n    int a, b, c; ss >> a >> b >> c;\n    std::cout << a + b + c;\n    return 0;\n}", starterCode: "", language: "cpp", expectedOutput: "60" },
      { number: 15, type: "coding", difficulty: "medium", question: "Afișează extensia fișierului `\"raport.pdf\"` folosind `std::filesystem::path`.", answer: "#include <iostream>\n#include <filesystem>\nint main() {\n    std::filesystem::path p(\"raport.pdf\");\n    std::cout << p.extension().string();\n    return 0;\n}", starterCode: "", language: "cpp", expectedOutput: ".pdf" },
    ],
  },
  // 10. "20. C++ pentru Sisteme Embedded"
  {
    lessonId: "6a021bacf0ec7fc9c03a6a87",
    name: "20. C++ pentru Sisteme Embedded",
    tasks: [
      { number: 6, type: "fillblank", difficulty: "medium", question: "În embedded, alocarea dinamică (`new`/`delete`) este evitată din cauza ___.", answer: "fragmentării", starterCode: "", language: "cpp", expectedOutput: "" },
      { number: 7, type: "fillblank", difficulty: "medium", question: "Registrul unui microcontroler este accesat prin pointer la adresă ___.\n```cpp\nvolatile uint32_t* reg = (uint32_t*)___;\n```", answer: "0x40000000", starterCode: "", language: "cpp", expectedOutput: "" },
      { number: 8, type: "fillblank", difficulty: "medium", question: "Cuvântul cheie `volatile` previne optimizările care ar citi variabila din ___.", answer: "cache", starterCode: "", language: "cpp", expectedOutput: "" },
      { number: 9, type: "fillblank", difficulty: "medium", question: "Bit manipulation: pentru a seta bitul 3 al registrului se folosește:\n```cpp\nreg |= (1 ___ 3);\n```", answer: "<<", starterCode: "", language: "cpp", expectedOutput: "" },
      { number: 10, type: "fillblank", difficulty: "medium", question: "`std::array` este preferabil față de C-array în embedded pentru că oferă ___.\n```\n// Avantaj: ___\n```", answer: "type safety", starterCode: "", language: "cpp", expectedOutput: "" },
      { number: 11, type: "coding", difficulty: "medium", question: "Afișează `Embedded C++` folosind un string literal.", answer: "#include <iostream>\nint main() {\n    std::cout << \"Embedded C++\";\n    return 0;\n}", starterCode: "", language: "cpp", expectedOutput: "Embedded C++" },
      { number: 12, type: "coding", difficulty: "medium", question: "Simulează setarea unui bit: `reg = 0`, setează bitul 2 și afișează valoarea `4`.", answer: "#include <iostream>\nint main() {\n    int reg = 0;\n    reg |= (1 << 2);\n    std::cout << reg;\n    return 0;\n}", starterCode: "", language: "cpp", expectedOutput: "4" },
      { number: 13, type: "coding", difficulty: "medium", question: "Folosind `std::array<int,4>`, inițializează cu `{1,2,3,4}` și afișează suma `10`.", answer: "#include <iostream>\n#include <array>\n#include <numeric>\nint main() {\n    std::array<int,4> a = {1,2,3,4};\n    std::cout << std::accumulate(a.begin(), a.end(), 0);\n    return 0;\n}", starterCode: "", language: "cpp", expectedOutput: "10" },
      { number: 14, type: "coding", difficulty: "medium", question: "Afișează `bitul 3 setat` dacă bitul 3 al lui `12` (1100 binar) este setat.", answer: "#include <iostream>\nint main() {\n    int n = 12;\n    if ((n >> 3) & 1) std::cout << \"bitul 3 setat\";\n    else std::cout << \"bitul 3 neselectat\";\n    return 0;\n}", starterCode: "", language: "cpp", expectedOutput: "bitul 3 setat" },
      { number: 15, type: "coding", difficulty: "medium", question: "Calculează dimensiunea în octeți a unui `struct { uint8_t a; uint16_t b; }` și afișează `>= 3`.", answer: "#include <iostream>\n#include <cstdint>\nstruct S { uint8_t a; uint16_t b; };\nint main() {\n    std::cout << (sizeof(S) >= 3 ? \">= 3\" : \"< 3\");\n    return 0;\n}", starterCode: "", language: "cpp", expectedOutput: ">= 3" },
    ],
  },
  // 11. "21. Testing C++ cu Google Test"
  {
    lessonId: "6a021baef0ec7fc9c03a6a90",
    name: "21. Testing C++ cu Google Test",
    tasks: [
      { number: 6, type: "fillblank", difficulty: "medium", question: "Macro-ul pentru a verifica egalitatea în Google Test este ___.\n```cpp\n___(expected, actual);\n```", answer: "EXPECT_EQ", starterCode: "", language: "cpp", expectedOutput: "" },
      { number: 7, type: "fillblank", difficulty: "medium", question: "Macro-ul care oprește testul imediat la eșec este ___.\n```cpp\n___(true, valoare);\n```", answer: "ASSERT_TRUE", starterCode: "", language: "cpp", expectedOutput: "" },
      { number: 8, type: "fillblank", difficulty: "medium", question: "O suită de teste este definită cu ___.\n```cpp\n___(NumeSuita, NumeTest) { ... }\n```", answer: "TEST", starterCode: "", language: "cpp", expectedOutput: "" },
      { number: 9, type: "fillblank", difficulty: "medium", question: "TDD înseamnă Test ___ Development.", answer: "Driven", starterCode: "", language: "cpp", expectedOutput: "" },
      { number: 10, type: "fillblank", difficulty: "medium", question: "Completează macro-ul pentru inegalitate:\n```cpp\n___(a, b); // a != b\n```", answer: "EXPECT_NE", starterCode: "", language: "cpp", expectedOutput: "" },
      { number: 11, type: "coding", difficulty: "medium", question: "Scrie o funcție `bool este_par(int n)` și afișează `par` pentru `n=4`, `impar` pentru `n=3`.", answer: "#include <iostream>\nbool este_par(int n) { return n % 2 == 0; }\nint main() {\n    std::cout << (este_par(4) ? \"par\" : \"impar\") << \"\\n\";\n    std::cout << (este_par(3) ? \"par\" : \"impar\");\n    return 0;\n}", starterCode: "", language: "cpp", expectedOutput: "par\nimpar" },
      { number: 12, type: "coding", difficulty: "medium", question: "Scrie `int suma(int a, int b)` și testează că `suma(3,4)==7`, afișând `test OK`.", answer: "#include <iostream>\nint suma(int a, int b) { return a + b; }\nint main() {\n    if (suma(3, 4) == 7) std::cout << \"test OK\";\n    else std::cout << \"test FAIL\";\n    return 0;\n}", starterCode: "", language: "cpp", expectedOutput: "test OK" },
      { number: 13, type: "coding", difficulty: "medium", question: "Testează `factorial(5)==120` și afișează `PASS` sau `FAIL`.", answer: "#include <iostream>\nint factorial(int n) { return n <= 1 ? 1 : n * factorial(n-1); }\nint main() {\n    std::cout << (factorial(5) == 120 ? \"PASS\" : \"FAIL\");\n    return 0;\n}", starterCode: "", language: "cpp", expectedOutput: "PASS" },
      { number: 14, type: "coding", difficulty: "medium", question: "Afișează `3 teste trecute` după rularea a 3 verificări ce returnează true.", answer: "#include <iostream>\nbool t1() { return 1+1 == 2; }\nbool t2() { return 3*3 == 9; }\nbool t3() { return 10 % 2 == 0; }\nint main() {\n    int cnt = (t1()?1:0) + (t2()?1:0) + (t3()?1:0);\n    std::cout << cnt << \" teste trecute\";\n    return 0;\n}", starterCode: "", language: "cpp", expectedOutput: "3 teste trecute" },
      { number: 15, type: "coding", difficulty: "medium", question: "Testează că `std::string(\"abc\").size() == 3` și afișează `OK`.", answer: "#include <iostream>\n#include <string>\nint main() {\n    std::cout << (std::string(\"abc\").size() == 3 ? \"OK\" : \"FAIL\");\n    return 0;\n}", starterCode: "", language: "cpp", expectedOutput: "OK" },
    ],
  },
  // 12. "22. C++23 și funcționalități moderne"
  {
    lessonId: "6a021baff0ec7fc9c03a6a99",
    name: "22. C++23 și funcționalități moderne",
    tasks: [
      { number: 6, type: "fillblank", difficulty: "medium", question: "C++23 introduce `std::expected` pentru gestionarea ___ fără excepții.", answer: "erorilor", starterCode: "", language: "cpp", expectedOutput: "" },
      { number: 7, type: "fillblank", difficulty: "medium", question: "Completează print modern C++23:\n```cpp\nstd::___(\"Valoare: {}\\n\", 42);\n```", answer: "print", starterCode: "", language: "cpp", expectedOutput: "" },
      { number: 8, type: "fillblank", difficulty: "medium", question: "Deducerea tipului funcționează cu ___.\n```cpp\n___ x = 42; // int dedus\n```", answer: "auto", starterCode: "", language: "cpp", expectedOutput: "" },
      { number: 9, type: "fillblank", difficulty: "medium", question: "Structured bindings (C++17+) permit:\n```cpp\nauto [a, b] = std::make_pair(1, 2);\n// a = ___, b = ___\n```", answer: "1", starterCode: "", language: "cpp", expectedOutput: "" },
      { number: 10, type: "fillblank", difficulty: "medium", question: "Lambda generice cu `auto` parametru sunt disponibile din C++ ___.", answer: "14", starterCode: "", language: "cpp", expectedOutput: "" },
      { number: 11, type: "coding", difficulty: "medium", question: "Folosind `std::format` (C++20), formatează `\"Salut, {}!\"` cu `\"C++23\"` și afișează.", answer: "#include <iostream>\n#include <format>\nint main() {\n    std::cout << std::format(\"Salut, {}!\", \"C++23\");\n    return 0;\n}", starterCode: "", language: "cpp", expectedOutput: "Salut, C++23!" },
      { number: 12, type: "coding", difficulty: "medium", question: "Folosind structured bindings, afișează `a=3 b=7` dintr-o pereche.", answer: "#include <iostream>\n#include <utility>\nint main() {\n    auto [a, b] = std::make_pair(3, 7);\n    std::cout << \"a=\" << a << \" b=\" << b;\n    return 0;\n}", starterCode: "", language: "cpp", expectedOutput: "a=3 b=7" },
      { number: 13, type: "coding", difficulty: "medium", question: "Afișează `{1, 2, 3}` cu `std::initializer_list<int>`.", answer: "#include <iostream>\n#include <initializer_list>\nvoid afis(std::initializer_list<int> lst) {\n    for (int x : lst) std::cout << x << \" \";\n}\nint main() {\n    afis({1, 2, 3});\n    return 0;\n}", starterCode: "", language: "cpp", expectedOutput: "1 2 3 " },
      { number: 14, type: "coding", difficulty: "medium", question: "Folosind `std::optional<int>`, afișează valoarea `42` dacă există, altfel `lipseste`.", answer: "#include <iostream>\n#include <optional>\nint main() {\n    std::optional<int> v = 42;\n    std::cout << (v.has_value() ? std::to_string(*v) : \"lipseste\");\n    return 0;\n}", starterCode: "", language: "cpp", expectedOutput: "42" },
      { number: 15, type: "coding", difficulty: "medium", question: "Afișează `int` sau `double` pentru valorile `42` și `3.14` folosind `typeid`.", answer: "#include <iostream>\n#include <typeinfo>\nint main() {\n    std::cout << typeid(42).name() << \" \" << typeid(3.14).name();\n    return 0;\n}", starterCode: "", language: "cpp", expectedOutput: "i d" },
    ],
  },
  // 13. "23. Conexiune la Baze de Date"
  {
    lessonId: "6a021bb0f0ec7fc9c03a6aa2",
    name: "23. Conexiune la Baze de Date",
    tasks: [
      { number: 6, type: "fillblank", difficulty: "medium", question: "SQL pentru a selecta toate rândurile dintr-un tabel este:\n```sql\n___ * FROM produse;\n```", answer: "SELECT", starterCode: "", language: "cpp", expectedOutput: "" },
      { number: 7, type: "fillblank", difficulty: "medium", question: "Comanda SQL pentru inserare este:\n```sql\n___ INTO produse VALUES (1, 'Carte', 25.0);\n```", answer: "INSERT", starterCode: "", language: "cpp", expectedOutput: "" },
      { number: 8, type: "fillblank", difficulty: "medium", question: "Ce librărie C++ se folosește frecvent pentru SQLite?\n```cpp\n#include <sqlite3.h>\nint rc = sqlite3_open(\"db.db\", &___)\n```", answer: "db", starterCode: "", language: "cpp", expectedOutput: "" },
      { number: 9, type: "fillblank", difficulty: "medium", question: "Comanda SQL care modifică date existente este ___.\n```sql\n___ produse SET pret = 30 WHERE id = 1;\n```", answer: "UPDATE", starterCode: "", language: "cpp", expectedOutput: "" },
      { number: 10, type: "fillblank", difficulty: "medium", question: "Tranzacțiile SQL asigură că operațiile sunt executate ___ sau deloc.", answer: "complet", starterCode: "", language: "cpp", expectedOutput: "" },
      { number: 11, type: "coding", difficulty: "medium", question: "Afișează un mesaj de conexiune simulat: `Conectat la DB: mydb`.", answer: "#include <iostream>\nint main() {\n    std::cout << \"Conectat la DB: mydb\";\n    return 0;\n}", starterCode: "", language: "cpp", expectedOutput: "Conectat la DB: mydb" },
      { number: 12, type: "coding", difficulty: "medium", question: "Simulează un query SELECT afișând `SELECT * FROM users`.", answer: "#include <iostream>\nint main() {\n    std::cout << \"SELECT * FROM users\";\n    return 0;\n}", starterCode: "", language: "cpp", expectedOutput: "SELECT * FROM users" },
      { number: 13, type: "coding", difficulty: "medium", question: "Afișează `3 randuri returnate` simulând rezultatul unui query.", answer: "#include <iostream>\nint main() {\n    int rows = 3;\n    std::cout << rows << \" randuri returnate\";\n    return 0;\n}", starterCode: "", language: "cpp", expectedOutput: "3 randuri returnate" },
      { number: 14, type: "coding", difficulty: "medium", question: "Construiește un query INSERT dinamic pentru `id=1, name=\"Ana\"` și afișează-l.", answer: "#include <iostream>\n#include <string>\nint main() {\n    int id = 1;\n    std::string name = \"Ana\";\n    std::cout << \"INSERT INTO users VALUES (\" << id << \", '\" << name << \"')\";\n    return 0;\n}", starterCode: "", language: "cpp", expectedOutput: "INSERT INTO users VALUES (1, 'Ana')" },
      { number: 15, type: "coding", difficulty: "medium", question: "Afișează `Tranzactie commit` la finalizarea cu succes a unei tranzacții simulate.", answer: "#include <iostream>\nint main() {\n    bool ok = true;\n    std::cout << (ok ? \"Tranzactie commit\" : \"Tranzactie rollback\");\n    return 0;\n}", starterCode: "", language: "cpp", expectedOutput: "Tranzactie commit" },
    ],
  },
  // 14. "24. Algoritmi avansați și Structuri de Date"
  {
    lessonId: "6a021bb2f0ec7fc9c03a6aab",
    name: "24. Algoritmi avansați și Structuri de Date",
    tasks: [
      { number: 6, type: "fillblank", difficulty: "medium", question: "Complexitatea căutării binare este ___.", answer: "O(log n)", starterCode: "", language: "cpp", expectedOutput: "" },
      { number: 7, type: "fillblank", difficulty: "medium", question: "Algoritmul Dijkstra folosește o ___ cu prioritate.\n```cpp\nstd::priority_queue<...> pq;\n```", answer: "coadă", starterCode: "", language: "cpp", expectedOutput: "" },
      { number: 8, type: "fillblank", difficulty: "medium", question: "Ce se afișează?\n```cpp\nstd::stack<int> s;\ns.push(1); s.push(2); s.push(3);\nstd::cout << s.top();\n// Răspuns: ___\n```", answer: "3", starterCode: "", language: "cpp", expectedOutput: "" },
      { number: 9, type: "fillblank", difficulty: "medium", question: "Un Min-Heap are proprietatea că părintele este ___ decât copiii.", answer: "mai mic", starterCode: "", language: "cpp", expectedOutput: "" },
      { number: 10, type: "fillblank", difficulty: "medium", question: "Programarea dinamică rezolvă probleme prin ___ subproblemelor.\n```\n// Memorare: ___\n```", answer: "memoizare", starterCode: "", language: "cpp", expectedOutput: "" },
      { number: 11, type: "coding", difficulty: "medium", question: "Realizează căutare binară în `{1,3,5,7,9}` pentru valoarea `5` și afișează indexul `2`.", answer: "#include <iostream>\n#include <vector>\n#include <algorithm>\nint main() {\n    std::vector<int> v = {1,3,5,7,9};\n    auto it = std::lower_bound(v.begin(), v.end(), 5);\n    std::cout << std::distance(v.begin(), it);\n    return 0;\n}", starterCode: "", language: "cpp", expectedOutput: "2" },
      { number: 12, type: "coding", difficulty: "medium", question: "Simulează o stivă cu `std::stack`, push 1,2,3 și afișează top-ul `3`.", answer: "#include <iostream>\n#include <stack>\nint main() {\n    std::stack<int> s;\n    s.push(1); s.push(2); s.push(3);\n    std::cout << s.top();\n    return 0;\n}", starterCode: "", language: "cpp", expectedOutput: "3" },
      { number: 13, type: "coding", difficulty: "medium", question: "Calculează Fibonacci(10) cu memoizare și afișează `55`.", answer: "#include <iostream>\n#include <vector>\nint fib(int n, std::vector<int>& memo) {\n    if (n <= 1) return n;\n    if (memo[n]) return memo[n];\n    return memo[n] = fib(n-1, memo) + fib(n-2, memo);\n}\nint main() {\n    std::vector<int> memo(11, 0);\n    std::cout << fib(10, memo);\n    return 0;\n}", starterCode: "", language: "cpp", expectedOutput: "55" },
      { number: 14, type: "coding", difficulty: "medium", question: "Folosind `std::queue`, enqueue 1,2,3 și afișează frontul `1`.", answer: "#include <iostream>\n#include <queue>\nint main() {\n    std::queue<int> q;\n    q.push(1); q.push(2); q.push(3);\n    std::cout << q.front();\n    return 0;\n}", starterCode: "", language: "cpp", expectedOutput: "1" },
      { number: 15, type: "coding", difficulty: "medium", question: "Afișează cel mai mare element dintr-un `priority_queue<int>` cu valorile 4, 8, 2.", answer: "#include <iostream>\n#include <queue>\nint main() {\n    std::priority_queue<int> pq;\n    pq.push(4); pq.push(8); pq.push(2);\n    std::cout << pq.top();\n    return 0;\n}", starterCode: "", language: "cpp", expectedOutput: "8" },
    ],
  },
  // 15. "25. Mini-proiect: Sistem de Gestiune"
  {
    lessonId: "6a021bb3f0ec7fc9c03a6ab4",
    name: "25. Mini-proiect: Sistem de Gestiune",
    tasks: [
      { number: 6, type: "fillblank", difficulty: "medium", question: "Completează declararea clasei Angajat:\n```cpp\nclass Angajat {\npublic:\n    std::string _____;\n    double salariu;\n};\n```", answer: "nume", starterCode: "", language: "cpp", expectedOutput: "" },
      { number: 7, type: "fillblank", difficulty: "medium", question: "Ce se afișează?\n```cpp\nstruct Ang { std::string n; double s; };\nAng a = {\"Ion\", 3500.0};\nstd::cout << a.n;\n// Răspuns: ___\n```", answer: "Ion", starterCode: "", language: "cpp", expectedOutput: "" },
      { number: 8, type: "fillblank", difficulty: "medium", question: "Completează iteratorul range-based:\n```cpp\nfor (___ ang : angajati)\n    std::cout << ang.nume;\n```", answer: "auto", starterCode: "", language: "cpp", expectedOutput: "" },
      { number: 9, type: "fillblank", difficulty: "medium", question: "Metoda de ștergere a unui element la index i din vector este:\n```cpp\nangajati.___(angajati.begin() + i);\n```", answer: "erase", starterCode: "", language: "cpp", expectedOutput: "" },
      { number: 10, type: "fillblank", difficulty: "medium", question: "Completează sortarea angajaților după salariu:\n```cpp\nstd::sort(ang.begin(), ang.end(),\n    [](auto& a, auto& b){ return a.___ < b.salariu; });\n```", answer: "salariu", starterCode: "", language: "cpp", expectedOutput: "" },
      { number: 11, type: "coding", difficulty: "medium", question: "Afișează numele angajatilor `{\"Ana\", \"Ion\"}` pe câte o linie.", answer: "#include <iostream>\n#include <vector>\n#include <string>\nstruct Ang { std::string n; };\nint main() {\n    std::vector<Ang> v = {{\"Ana\"},{\"Ion\"}};\n    for (auto& a : v) std::cout << a.n << \"\\n\";\n    return 0;\n}", starterCode: "", language: "cpp", expectedOutput: "Ana\nIon\n" },
      { number: 12, type: "coding", difficulty: "medium", question: "Calculează salariul mediu al angajaților `{3000, 4000, 5000}` și afișează `4000`.", answer: "#include <iostream>\n#include <vector>\nstruct Ang { double s; };\nint main() {\n    std::vector<Ang> v = {{3000},{4000},{5000}};\n    double total = 0;\n    for (auto& a : v) total += a.s;\n    std::cout << total / v.size();\n    return 0;\n}", starterCode: "", language: "cpp", expectedOutput: "4000" },
      { number: 13, type: "coding", difficulty: "medium", question: "Afișează angajatul cu salariul maxim din `{Ana:3000, Ion:5000, Maria:4000}`.", answer: "#include <iostream>\n#include <vector>\n#include <string>\n#include <algorithm>\nstruct Ang { std::string n; double s; };\nint main() {\n    std::vector<Ang> v = {{\"Ana\",3000},{\"Ion\",5000},{\"Maria\",4000}};\n    auto it = std::max_element(v.begin(), v.end(), [](auto& a, auto& b){ return a.s < b.s; });\n    std::cout << it->n;\n    return 0;\n}", starterCode: "", language: "cpp", expectedOutput: "Ion" },
      { number: 14, type: "coding", difficulty: "medium", question: "Numără angajații cu salariul peste 4000 și afișează `2`.", answer: "#include <iostream>\n#include <vector>\n#include <algorithm>\nstruct Ang { double s; };\nint main() {\n    std::vector<Ang> v = {{3000},{5000},{4500},{2000}};\n    int cnt = std::count_if(v.begin(), v.end(), [](auto& a){ return a.s > 4000; });\n    std::cout << cnt;\n    return 0;\n}", starterCode: "", language: "cpp", expectedOutput: "2" },
      { number: 15, type: "coding", difficulty: "medium", question: "Sortează angajații după salariu crescător și afișează numele primului: `Ana` din `{Ion:5000, Ana:2000}`.", answer: "#include <iostream>\n#include <vector>\n#include <string>\n#include <algorithm>\nstruct Ang { std::string n; double s; };\nint main() {\n    std::vector<Ang> v = {{\"Ion\",5000},{\"Ana\",2000}};\n    std::sort(v.begin(), v.end(), [](auto& a, auto& b){ return a.s < b.s; });\n    std::cout << v[0].n;\n    return 0;\n}", starterCode: "", language: "cpp", expectedOutput: "Ana" },
    ],
  },
  // 16. "26. Template Metaprogramming si SFINAE"
  {
    lessonId: "6a08cf5f999573855635cbf1",
    name: "26. Template Metaprogramming si SFINAE",
    tasks: [
      { number: 6, type: "fillblank", difficulty: "medium", question: "Completează declararea unui template de funcție:\n```cpp\n___ <typename T>\nT maxim(T a, T b) { return a > b ? a : b; }\n```", answer: "template", starterCode: "", language: "cpp", expectedOutput: "" },
      { number: 7, type: "fillblank", difficulty: "medium", question: "Ce se afișează?\n```cpp\ntemplate<int N>\nstruct Factorial {\n    static const int value = N * Factorial<N-1>::value;\n};\ntemplate<> struct Factorial<0> { static const int value = 1; };\nstd::cout << Factorial<4>::value;\n// Răspuns: ___\n```", answer: "24", starterCode: "", language: "cpp", expectedOutput: "" },
      { number: 8, type: "fillblank", difficulty: "medium", question: "SFINAE stă pentru Substitution Failure Is Not An ___.", answer: "Error", starterCode: "", language: "cpp", expectedOutput: "" },
      { number: 9, type: "fillblank", difficulty: "medium", question: "`std::enable_if` permite activarea unui template doar dacă o condiție este ___.", answer: "true", starterCode: "", language: "cpp", expectedOutput: "" },
      { number: 10, type: "fillblank", difficulty: "medium", question: "Specializarea parțială de template permite comportament diferit pentru ___ tipuri.", answer: "specifice", starterCode: "", language: "cpp", expectedOutput: "" },
      { number: 11, type: "coding", difficulty: "medium", question: "Scrie template `T maxim(T a, T b)` și afișează `maxim(3,7)` = 7.", answer: "#include <iostream>\ntemplate<typename T>\nT maxim(T a, T b) { return a > b ? a : b; }\nint main() {\n    std::cout << maxim(3, 7);\n    return 0;\n}", starterCode: "", language: "cpp", expectedOutput: "7" },
      { number: 12, type: "coding", difficulty: "medium", question: "Calculează `Factorial<5>::value` la compile-time și afișează `120`.", answer: "#include <iostream>\ntemplate<int N>\nstruct Factorial { static const int value = N * Factorial<N-1>::value; };\ntemplate<> struct Factorial<0> { static const int value = 1; };\nint main() {\n    std::cout << Factorial<5>::value;\n    return 0;\n}", starterCode: "", language: "cpp", expectedOutput: "120" },
      { number: 13, type: "coding", difficulty: "medium", question: "Scrie template variadic care afișează tipul primului argument: afișează `i` pentru `int`.", answer: "#include <iostream>\n#include <typeinfo>\ntemplate<typename T, typename... Args>\nvoid tip(T a, Args...) { std::cout << typeid(a).name(); }\nint main() {\n    tip(42, \"text\", 3.14);\n    return 0;\n}", starterCode: "", language: "cpp", expectedOutput: "i" },
      { number: 14, type: "coding", difficulty: "medium", question: "Afișează `intreg` sau `float` folosind `if constexpr` cu `std::is_integral`.", answer: "#include <iostream>\n#include <type_traits>\ntemplate<typename T>\nvoid tip() {\n    if constexpr (std::is_integral_v<T>) std::cout << \"intreg\";\n    else std::cout << \"float\";\n}\nint main() {\n    tip<int>();\n    return 0;\n}", starterCode: "", language: "cpp", expectedOutput: "intreg" },
      { number: 15, type: "coding", difficulty: "medium", question: "Calculează suma unui pachet variadic `{1,2,3,4,5}` cu fold expression și afișează `15`.", answer: "#include <iostream>\ntemplate<typename... Args>\nauto suma(Args... args) { return (args + ...); }\nint main() {\n    std::cout << suma(1,2,3,4,5);\n    return 0;\n}", starterCode: "", language: "cpp", expectedOutput: "15" },
    ],
  },
  // 17. "27. C++20 Concepts si Ranges"
  {
    lessonId: "6a08cf62999573855635cc05",
    name: "27. C++20 Concepts si Ranges",
    tasks: [
      { number: 6, type: "fillblank", difficulty: "medium", question: "Concepts în C++20 definesc ___ pe parametrii template.\n```cpp\ntemplate<___ T>\n```", answer: "constrângeri", starterCode: "", language: "cpp", expectedOutput: "" },
      { number: 7, type: "fillblank", difficulty: "medium", question: "Completează definirea unui concept:\n```cpp\n___ Numeric = std::integral<T> || std::floating_point<T>;\n```", answer: "template<typename T> concept", starterCode: "", language: "cpp", expectedOutput: "" },
      { number: 8, type: "fillblank", difficulty: "medium", question: "Ce concept verifică că T este un tip întreg?\n```cpp\nstd::___<T>\n```", answer: "integral", starterCode: "", language: "cpp", expectedOutput: "" },
      { number: 9, type: "fillblank", difficulty: "medium", question: "Ranges permite compunerea operațiilor cu operatorul ___.\n```cpp\nv | views::filter(...) ___ views::transform(...)\n```", answer: "|", starterCode: "", language: "cpp", expectedOutput: "" },
      { number: 10, type: "fillblank", difficulty: "medium", question: "`std::ranges::sort` sortează direct un ___ fără iteratori expliciti.\n```cpp\nstd::ranges::sort(___)\n```", answer: "container", starterCode: "", language: "cpp", expectedOutput: "" },
      { number: 11, type: "coding", difficulty: "medium", question: "Afișează `concept ok` dacă `int` satisface `std::integral<int>`.", answer: "#include <iostream>\n#include <concepts>\nint main() {\n    std::cout << (std::integral<int> ? \"concept ok\" : \"nu\");\n    return 0;\n}", starterCode: "", language: "cpp", expectedOutput: "concept ok" },
      { number: 12, type: "coding", difficulty: "medium", question: "Sortează `{5,2,8,1}` cu `std::ranges::sort` și afișează `1 2 5 8`.", answer: "#include <iostream>\n#include <vector>\n#include <algorithm>\nint main() {\n    std::vector<int> v = {5,2,8,1};\n    std::ranges::sort(v);\n    for (int x : v) std::cout << x << \" \";\n    return 0;\n}", starterCode: "", language: "cpp", expectedOutput: "1 2 5 8 " },
      { number: 13, type: "coding", difficulty: "medium", question: "Afișează ultimele 2 elemente din `{1,2,3,4,5}` cu `views::drop`.", answer: "#include <iostream>\n#include <vector>\n#include <ranges>\nint main() {\n    std::vector<int> v = {1,2,3,4,5};\n    for (int x : v | std::views::drop(3)) std::cout << x << \" \";\n    return 0;\n}", starterCode: "", language: "cpp", expectedOutput: "4 5 " },
      { number: 14, type: "coding", difficulty: "medium", question: "Creează un concept `Pozitiv` și aplică-l: afișează `pozitiv` pentru `n=5`.", answer: "#include <iostream>\n#include <concepts>\ntemplate<typename T>\nconcept Pozitiv = requires(T t) { t > 0; };\ntemplate<Pozitiv T>\nvoid verif(T n) { std::cout << (n > 0 ? \"pozitiv\" : \"negativ\"); }\nint main() {\n    verif(5);\n    return 0;\n}", starterCode: "", language: "cpp", expectedOutput: "pozitiv" },
      { number: 15, type: "coding", difficulty: "medium", question: "Afișează numerele impare din `{1,2,3,4,5}` cu `views::filter`.", answer: "#include <iostream>\n#include <vector>\n#include <ranges>\nint main() {\n    std::vector<int> v = {1,2,3,4,5};\n    for (int x : v | std::views::filter([](int n){ return n%2!=0; }))\n        std::cout << x << \" \";\n    return 0;\n}", starterCode: "", language: "cpp", expectedOutput: "1 3 5 " },
    ],
  },
  // 18. "28. Design Patterns in C++ Modern"
  {
    lessonId: "6a08cf64999573855635cc19",
    name: "28. Design Patterns in C++ Modern",
    tasks: [
      { number: 6, type: "fillblank", difficulty: "medium", question: "Patternul CRTP (Curiously Recurring Template Pattern) implementează ___ statică.", answer: "polimorfism", starterCode: "", language: "cpp", expectedOutput: "" },
      { number: 7, type: "fillblank", difficulty: "medium", question: "Completează CRTP:\n```cpp\ntemplate<typename Derived>\nstruct Base {\n    void f() { static_cast<___*>(this)->impl(); }\n};\n```", answer: "Derived", starterCode: "", language: "cpp", expectedOutput: "" },
      { number: 8, type: "fillblank", difficulty: "medium", question: "Patternul Visitor permite adăugarea de operații noi fără a modifica ___.", answer: "clasele", starterCode: "", language: "cpp", expectedOutput: "" },
      { number: 9, type: "fillblank", difficulty: "medium", question: "Command pattern stochează acțiuni ca ___ pentru a fi executate ulterior.", answer: "obiecte", starterCode: "", language: "cpp", expectedOutput: "" },
      { number: 10, type: "fillblank", difficulty: "medium", question: "Patternul Flyweight reduce consumul de memorie prin partajarea stării ___.", answer: "comune", starterCode: "", language: "cpp", expectedOutput: "" },
      { number: 11, type: "coding", difficulty: "medium", question: "Implementează Chain of Responsibility: 2 handlere, primul procesează dacă `n<10`, al doilea altfel. Afișează `handler1` pentru `n=5`.", answer: "#include <iostream>\nvoid h2(int n) { std::cout << \"handler2\"; }\nvoid h1(int n) { if (n < 10) std::cout << \"handler1\"; else h2(n); }\nint main() { h1(5); return 0; }", starterCode: "", language: "cpp", expectedOutput: "handler1" },
      { number: 12, type: "coding", difficulty: "medium", question: "Implementează Command: funcție `executa(fn)` care apelează `fn()`. Afișează `comanda executata`.", answer: "#include <iostream>\n#include <functional>\nvoid executa(std::function<void()> cmd) { cmd(); }\nint main() {\n    executa([]{ std::cout << \"comanda executata\"; });\n    return 0;\n}", starterCode: "", language: "cpp", expectedOutput: "comanda executata" },
      { number: 13, type: "coding", difficulty: "medium", question: "Implementează Proxy simplu care afișează `Proxy: apel delegat` înainte de a apela funcția reală.", answer: "#include <iostream>\nvoid real() { std::cout << \"real\"; }\nvoid proxy() { std::cout << \"Proxy: apel delegat\\n\"; real(); }\nint main() { proxy(); return 0; }", starterCode: "", language: "cpp", expectedOutput: "Proxy: apel delegat\nreal" },
      { number: 14, type: "coding", difficulty: "medium", question: "Folosind `std::variant` ca alternativă la visitor, stochează `int` sau `string` și afișează tipul pentru `42`.", answer: "#include <iostream>\n#include <variant>\n#include <string>\nint main() {\n    std::variant<int, std::string> v = 42;\n    std::visit([](auto&& x){\n        using T = std::decay_t<decltype(x)>;\n        if constexpr (std::is_same_v<T,int>) std::cout << \"int\";\n        else std::cout << \"string\";\n    }, v);\n    return 0;\n}", starterCode: "", language: "cpp", expectedOutput: "int" },
      { number: 15, type: "coding", difficulty: "medium", question: "Afișează `Builder gata` implementând un Builder minimal care construiește un string.", answer: "#include <iostream>\n#include <string>\nclass Builder {\n    std::string s;\npublic:\n    Builder& add(std::string t) { s += t; return *this; }\n    std::string build() { return s; }\n};\nint main() {\n    std::cout << Builder().add(\"Builder \").add(\"gata\").build();\n    return 0;\n}", starterCode: "", language: "cpp", expectedOutput: "Builder gata" },
    ],
  },
  // 19. "29. Concurrency Avansat in C++"
  {
    lessonId: "6a08cf67999573855635cc2d",
    name: "29. Concurrency Avansat in C++",
    tasks: [
      { number: 6, type: "fillblank", difficulty: "medium", question: "Header-ul pentru threads C++11 este:\n```cpp\n#include <___>\n```", answer: "thread", starterCode: "", language: "cpp", expectedOutput: "" },
      { number: 7, type: "fillblank", difficulty: "medium", question: "Completează pornirea unui thread:\n```cpp\nstd::thread t(___, arg);\nt.join();\n```", answer: "functie", starterCode: "", language: "cpp", expectedOutput: "" },
      { number: 8, type: "fillblank", difficulty: "medium", question: "Ce se afișează?\n```cpp\nstd::atomic<int> cnt = 0;\ncnt++; cnt++;\nstd::cout << cnt;\n// Răspuns: ___\n```", answer: "2", starterCode: "", language: "cpp", expectedOutput: "" },
      { number: 9, type: "fillblank", difficulty: "medium", question: "Mutex previne ___ simultान accesului la date partajate.", answer: "accesul", starterCode: "", language: "cpp", expectedOutput: "" },
      { number: 10, type: "fillblank", difficulty: "medium", question: "`std::future` și `std::promise` permit comunicarea între ___.", answer: "thread-uri", starterCode: "", language: "cpp", expectedOutput: "" },
      { number: 11, type: "coding", difficulty: "medium", question: "Pornește un thread care afișează `thread activ` și join-uiește-l.", answer: "#include <iostream>\n#include <thread>\nvoid f() { std::cout << \"thread activ\"; }\nint main() {\n    std::thread t(f);\n    t.join();\n    return 0;\n}", starterCode: "", language: "cpp", expectedOutput: "thread activ" },
      { number: 12, type: "coding", difficulty: "medium", question: "Folosind `std::atomic<int>`, incrementează un contor din 2 thread-uri și afișează `2`.", answer: "#include <iostream>\n#include <thread>\n#include <atomic>\nstd::atomic<int> cnt = 0;\nvoid inc() { cnt++; }\nint main() {\n    std::thread t1(inc), t2(inc);\n    t1.join(); t2.join();\n    std::cout << cnt;\n    return 0;\n}", starterCode: "", language: "cpp", expectedOutput: "2" },
      { number: 13, type: "coding", difficulty: "medium", question: "Folosind `std::mutex`, protejează afișarea și afișează `protejat` o singură dată.", answer: "#include <iostream>\n#include <mutex>\nstd::mutex mtx;\nvoid f() { std::lock_guard<std::mutex> lk(mtx); std::cout << \"protejat\"; }\nint main() { f(); return 0; }", starterCode: "", language: "cpp", expectedOutput: "protejat" },
      { number: 14, type: "coding", difficulty: "medium", question: "Folosind `std::async`, rulează o funcție async care returnează `42` și afișează rezultatul.", answer: "#include <iostream>\n#include <future>\nint f() { return 42; }\nint main() {\n    auto fut = std::async(std::launch::async, f);\n    std::cout << fut.get();\n    return 0;\n}", starterCode: "", language: "cpp", expectedOutput: "42" },
      { number: 15, type: "coding", difficulty: "medium", question: "Afișează ID-ul thread-ului curent: `this_thread id exista`.", answer: "#include <iostream>\n#include <thread>\nint main() {\n    auto id = std::this_thread::get_id();\n    std::cout << \"this_thread id exista\";\n    return 0;\n}", starterCode: "", language: "cpp", expectedOutput: "this_thread id exista" },
    ],
  },
  // 20. "30. Mini Proiect C++ — Task Manager OOP"
  {
    lessonId: "6a08cf6a999573855635cc41",
    name: "30. Mini Proiect C++ — Task Manager OOP",
    tasks: [
      { number: 6, type: "fillblank", difficulty: "medium", question: "Completează clasa Task:\n```cpp\nclass Task {\npublic:\n    std::string _____;\n    bool finalizat = false;\n};\n```", answer: "titlu", starterCode: "", language: "cpp", expectedOutput: "" },
      { number: 7, type: "fillblank", difficulty: "medium", question: "Completează metoda de marcare ca finalizat:\n```cpp\nvoid completeaza() { finalizat = ___; }\n```", answer: "true", starterCode: "", language: "cpp", expectedOutput: "" },
      { number: 8, type: "fillblank", difficulty: "medium", question: "Ce se afișează?\n```cpp\nstruct Task { std::string t; bool f = false; };\nTask t = {\"Coding\"}; t.f = true;\nstd::cout << t.f;\n// Răspuns: ___\n```", answer: "1", starterCode: "", language: "cpp", expectedOutput: "" },
      { number: 9, type: "fillblank", difficulty: "medium", question: "Completează filtrarea task-urilor nefinalizate:\n```cpp\nauto nef = std::count_if(tasks.begin(), tasks.end(),\n    [](auto& t){ return !t.___; });\n```", answer: "finalizat", starterCode: "", language: "cpp", expectedOutput: "" },
      { number: 10, type: "fillblank", difficulty: "medium", question: "Afișarea tuturor task-urilor se face cu ___-based for loop.", answer: "range", starterCode: "", language: "cpp", expectedOutput: "" },
      { number: 11, type: "coding", difficulty: "medium", question: "Creează o structură `Task` cu `titlu` și `finalizat=false`. Afișează titlul `Codat feature`.", answer: "#include <iostream>\n#include <string>\nstruct Task { std::string titlu; bool finalizat = false; };\nint main() {\n    Task t = {\"Codat feature\"};\n    std::cout << t.titlu;\n    return 0;\n}", starterCode: "", language: "cpp", expectedOutput: "Codat feature" },
      { number: 12, type: "coding", difficulty: "medium", question: "Adaugă 3 task-uri la un vector și afișează numărul lor: `3`.", answer: "#include <iostream>\n#include <vector>\nstruct Task { std::string t; };\nint main() {\n    std::vector<Task> v = {{\"A\"},{\"B\"},{\"C\"}};\n    std::cout << v.size();\n    return 0;\n}", starterCode: "", language: "cpp", expectedOutput: "3" },
      { number: 13, type: "coding", difficulty: "medium", question: "Numără task-urile nefinalizate din `{fin=false, fin=true, fin=false}` și afișează `2`.", answer: "#include <iostream>\n#include <vector>\n#include <algorithm>\nstruct Task { bool fin; };\nint main() {\n    std::vector<Task> v = {{false},{true},{false}};\n    int n = std::count_if(v.begin(), v.end(), [](auto& t){ return !t.fin; });\n    std::cout << n;\n    return 0;\n}", starterCode: "", language: "cpp", expectedOutput: "2" },
      { number: 14, type: "coding", difficulty: "medium", question: "Marchează primul task ca finalizat și afișează `finalizat`.", answer: "#include <iostream>\n#include <vector>\nstruct Task { std::string t; bool fin = false; };\nint main() {\n    std::vector<Task> v = {{\"A\"},{\"B\"}};\n    v[0].fin = true;\n    std::cout << (v[0].fin ? \"finalizat\" : \"activ\");\n    return 0;\n}", starterCode: "", language: "cpp", expectedOutput: "finalizat" },
      { number: 15, type: "coding", difficulty: "medium", question: "Afișează `progres: 50%` dacă 1 din 2 task-uri este finalizat.", answer: "#include <iostream>\n#include <vector>\n#include <algorithm>\nstruct Task { bool fin; };\nint main() {\n    std::vector<Task> v = {{true},{false}};\n    int done = std::count_if(v.begin(), v.end(), [](auto& t){ return t.fin; });\n    std::cout << \"progres: \" << (done * 100 / (int)v.size()) << \"%\";\n    return 0;\n}", starterCode: "", language: "cpp", expectedOutput: "progres: 50%" },
    ],
  },
  // 21. "31. Coroutines C++20"
  {
    lessonId: "6a09ba0e855b60bc2da6db16",
    name: "31. Coroutines C++20",
    tasks: [
      { number: 6, type: "fillblank", difficulty: "medium", question: "Header-ul pentru coroutines C++20 este:\n```cpp\n#include <___>\n```", answer: "coroutine", starterCode: "", language: "cpp", expectedOutput: "" },
      { number: 7, type: "fillblank", difficulty: "medium", question: "Cuvântul cheie pentru a suspenda o coroutine este ___.\n```cpp\nco_await std::suspend_always{};\n```", answer: "co_await", starterCode: "", language: "cpp", expectedOutput: "" },
      { number: 8, type: "fillblank", difficulty: "medium", question: "Cuvântul cheie pentru a returna o valoare dintr-o coroutine este ___.\n```cpp\n___ 42;\n```", answer: "co_return", starterCode: "", language: "cpp", expectedOutput: "" },
      { number: 9, type: "fillblank", difficulty: "medium", question: "Cuvântul cheie pentru a produce o secvență de valori este ___.\n```cpp\n___ value;\n```", answer: "co_yield", starterCode: "", language: "cpp", expectedOutput: "" },
      { number: 10, type: "fillblank", difficulty: "medium", question: "Coroutinele permit programare ___ fără callback-uri.\n```\n// Stil programare: ___\n```", answer: "asincronă", starterCode: "", language: "cpp", expectedOutput: "" },
      { number: 11, type: "coding", difficulty: "medium", question: "Afișează `Coroutine C++20 activa`.", answer: "#include <iostream>\nint main() {\n    std::cout << \"Coroutine C++20 activa\";\n    return 0;\n}", starterCode: "", language: "cpp", expectedOutput: "Coroutine C++20 activa" },
      { number: 12, type: "coding", difficulty: "medium", question: "Afișează mesajul `co_await suspend` simulând suspendarea.", answer: "#include <iostream>\nint main() {\n    std::cout << \"co_await suspend\";\n    return 0;\n}", starterCode: "", language: "cpp", expectedOutput: "co_await suspend" },
      { number: 13, type: "coding", difficulty: "medium", question: "Simulează un generator afișând `1 2 3` cu un lambda și un vector.", answer: "#include <iostream>\n#include <vector>\nint main() {\n    std::vector<int> gen = {1,2,3};\n    for (int x : gen) std::cout << x << \" \";\n    return 0;\n}", starterCode: "", language: "cpp", expectedOutput: "1 2 3 " },
      { number: 14, type: "coding", difficulty: "medium", question: "Afișează `task asyncron` simulând un task async cu `std::async`.", answer: "#include <iostream>\n#include <future>\nint main() {\n    auto f = std::async(std::launch::async, []{ return std::string(\"task asyncron\"); });\n    std::cout << f.get();\n    return 0;\n}", starterCode: "", language: "cpp", expectedOutput: "task asyncron" },
      { number: 15, type: "coding", difficulty: "medium", question: "Afișează `pipeline: 3 pasi` simulând un pipeline de 3 operații.", answer: "#include <iostream>\nint main() {\n    int pasi = 3;\n    std::cout << \"pipeline: \" << pasi << \" pasi\";\n    return 0;\n}", starterCode: "", language: "cpp", expectedOutput: "pipeline: 3 pasi" },
    ],
  },
  // 22. "32. Module C++20"
  {
    lessonId: "6a09ba11855b60bc2da6db2a",
    name: "32. Module C++20",
    tasks: [
      { number: 6, type: "fillblank", difficulty: "medium", question: "Cuvântul cheie pentru exportul unui simbol dintr-un modul C++20 este ___.\n```cpp\n___ int suma(int a, int b) { return a + b; }\n```", answer: "export", starterCode: "", language: "cpp", expectedOutput: "" },
      { number: 7, type: "fillblank", difficulty: "medium", question: "Modulele C++20 înlocuiesc mecanismul clasic de ___.\n```cpp\n// Înlocuiesc: ___\n```", answer: "include", starterCode: "", language: "cpp", expectedOutput: "" },
      { number: 8, type: "fillblank", difficulty: "medium", question: "Declararea unui modul se face cu:\n```cpp\n___ mymodule;\n```", answer: "module", starterCode: "", language: "cpp", expectedOutput: "" },
      { number: 9, type: "fillblank", difficulty: "medium", question: "Importul unui modul se face cu:\n```cpp\n___ mymodule;\n```", answer: "import", starterCode: "", language: "cpp", expectedOutput: "" },
      { number: 10, type: "fillblank", difficulty: "medium", question: "Modulele reduc timpii de ___ față de header-urile clasice.", answer: "compilare", starterCode: "", language: "cpp", expectedOutput: "" },
      { number: 11, type: "coding", difficulty: "medium", question: "Afișează `Module C++20 activ`.", answer: "#include <iostream>\nint main() {\n    std::cout << \"Module C++20 activ\";\n    return 0;\n}", starterCode: "", language: "cpp", expectedOutput: "Module C++20 activ" },
      { number: 12, type: "coding", difficulty: "medium", question: "Simulează importul unui modul de matematică: afișează `import math: sqrt(16)=4`.", answer: "#include <iostream>\n#include <cmath>\nint main() {\n    std::cout << \"import math: sqrt(16)=\" << (int)std::sqrt(16);\n    return 0;\n}", starterCode: "", language: "cpp", expectedOutput: "import math: sqrt(16)=4" },
      { number: 13, type: "coding", difficulty: "medium", question: "Afișează numele a 3 module: `io`, `math`, `string` pe câte o linie.", answer: "#include <iostream>\nint main() {\n    for (auto m : {\"io\", \"math\", \"string\"})\n        std::cout << m << \"\\n\";\n    return 0;\n}", starterCode: "", language: "cpp", expectedOutput: "io\nmath\nstring\n" },
      { number: 14, type: "coding", difficulty: "medium", question: "Afișează `encapsulare modulara: ON`.", answer: "#include <iostream>\nint main() {\n    std::cout << \"encapsulare modulara: ON\";\n    return 0;\n}", starterCode: "", language: "cpp", expectedOutput: "encapsulare modulara: ON" },
      { number: 15, type: "coding", difficulty: "medium", question: "Afișează `timp compilare redus cu module` ca avantaj al modulelor.", answer: "#include <iostream>\nint main() {\n    std::cout << \"timp compilare redus cu module\";\n    return 0;\n}", starterCode: "", language: "cpp", expectedOutput: "timp compilare redus cu module" },
    ],
  },
  // 23. "33. Concepts C++20"
  {
    lessonId: "6a09ba14855b60bc2da6db3e",
    name: "33. Concepts C++20",
    tasks: [
      { number: 6, type: "fillblank", difficulty: "medium", question: "Completează definirea unui concept Addable:\n```cpp\ntemplate<typename T>\nconcept Addable = requires(T a, T b) {\n    { a + b } -> std::convertible_to<___>;\n};\n```", answer: "T", starterCode: "", language: "cpp", expectedOutput: "" },
      { number: 7, type: "fillblank", difficulty: "medium", question: "Ce concept verifică că tipul e un număr real?\n```cpp\nstd::___<T>\n```", answer: "floating_point", starterCode: "", language: "cpp", expectedOutput: "" },
      { number: 8, type: "fillblank", difficulty: "medium", question: "Concepts îmbunătățesc mesajele de eroare la ___ template-urilor.", answer: "instanțierea", starterCode: "", language: "cpp", expectedOutput: "" },
      { number: 9, type: "fillblank", difficulty: "medium", question: "Completează restricția `requires` inline:\n```cpp\ntemplate<typename T>\n    requires std::___(T)\nvoid f(T x) { ... }\n```", answer: "integral", starterCode: "", language: "cpp", expectedOutput: "" },
      { number: 10, type: "fillblank", difficulty: "medium", question: "Concepts pot fi combinate cu `&&` și `___ ` (sau logic).", answer: "||", starterCode: "", language: "cpp", expectedOutput: "" },
      { number: 11, type: "coding", difficulty: "medium", question: "Afișează `concept: integral=true` pentru `std::integral<int>`.", answer: "#include <iostream>\n#include <concepts>\nint main() {\n    std::cout << \"concept: integral=\" << (std::integral<int> ? \"true\" : \"false\");\n    return 0;\n}", starterCode: "", language: "cpp", expectedOutput: "concept: integral=true" },
      { number: 12, type: "coding", difficulty: "medium", question: "Scrie o funcție template cu concept `std::integral<T>` și afișează `suma: 10` pentru `suma(4,6)`.", answer: "#include <iostream>\n#include <concepts>\ntemplate<std::integral T>\nT suma(T a, T b) { return a + b; }\nint main() {\n    std::cout << \"suma: \" << suma(4, 6);\n    return 0;\n}", starterCode: "", language: "cpp", expectedOutput: "suma: 10" },
      { number: 13, type: "coding", difficulty: "medium", question: "Afișează `floating_point: double=true`.", answer: "#include <iostream>\n#include <concepts>\nint main() {\n    std::cout << \"floating_point: double=\" << (std::floating_point<double> ? \"true\" : \"false\");\n    return 0;\n}", starterCode: "", language: "cpp", expectedOutput: "floating_point: double=true" },
      { number: 14, type: "coding", difficulty: "medium", question: "Afișează `same: int-int=true` folosind `std::same_as<int, int>`.", answer: "#include <iostream>\n#include <concepts>\nint main() {\n    std::cout << \"same: int-int=\" << (std::same_as<int,int> ? \"true\" : \"false\");\n    return 0;\n}", starterCode: "", language: "cpp", expectedOutput: "same: int-int=true" },
      { number: 15, type: "coding", difficulty: "medium", question: "Afișează `Concepts C++20: activ`.", answer: "#include <iostream>\nint main() {\n    std::cout << \"Concepts C++20: activ\";\n    return 0;\n}", starterCode: "", language: "cpp", expectedOutput: "Concepts C++20: activ" },
    ],
  },
  // 24. "34. std::ranges si std::format"
  {
    lessonId: "6a09ba16855b60bc2da6db52",
    name: "34. std::ranges si std::format",
    tasks: [
      { number: 6, type: "fillblank", difficulty: "medium", question: "Completează pentru a formata cu 2 zecimale:\n```cpp\nstd::string s = std::format(\"{:.2f}\", ___);\n```", answer: "3.14159", starterCode: "", language: "cpp", expectedOutput: "" },
      { number: 7, type: "fillblank", difficulty: "medium", question: "Ce se afișează?\n```cpp\nstd::cout << std::format(\"x={}\", 42);\n// Răspuns: ___\n```", answer: "x=42", starterCode: "", language: "cpp", expectedOutput: "" },
      { number: 8, type: "fillblank", difficulty: "medium", question: "Completează indexarea argumentelor:\n```cpp\nstd::format(\"{1} {0}\", \"lume\", \"Salut\");\n// Rezultat: ___\n```", answer: "Salut lume", starterCode: "", language: "cpp", expectedOutput: "" },
      { number: 9, type: "fillblank", difficulty: "medium", question: "Ranges sortează container direct fără ___.\n```cpp\nstd::ranges::sort(v); // fără ___\n```", answer: "iteratori", starterCode: "", language: "cpp", expectedOutput: "" },
      { number: 10, type: "fillblank", difficulty: "medium", question: "`std::format` evită probleme de ___ față de `printf`.\n```\n// Evită: ___\n```", answer: "tip", starterCode: "", language: "cpp", expectedOutput: "" },
      { number: 11, type: "coding", difficulty: "medium", question: "Afișează `Salut, Cristi!` folosind `std::format`.", answer: "#include <iostream>\n#include <format>\nint main() {\n    std::cout << std::format(\"Salut, {}!\", \"Cristi\");\n    return 0;\n}", starterCode: "", language: "cpp", expectedOutput: "Salut, Cristi!" },
      { number: 12, type: "coding", difficulty: "medium", question: "Afișează `pi=3.14` cu `std::format` și 2 zecimale.", answer: "#include <iostream>\n#include <format>\nint main() {\n    std::cout << std::format(\"pi={:.2f}\", 3.14159);\n    return 0;\n}", starterCode: "", language: "cpp", expectedOutput: "pi=3.14" },
      { number: 13, type: "coding", difficulty: "medium", question: "Sortează `{4,2,7,1}` cu `std::ranges::sort` și afișează `1 2 4 7`.", answer: "#include <iostream>\n#include <vector>\n#include <algorithm>\nint main() {\n    std::vector<int> v = {4,2,7,1};\n    std::ranges::sort(v);\n    for (int x : v) std::cout << x << \" \";\n    return 0;\n}", starterCode: "", language: "cpp", expectedOutput: "1 2 4 7 " },
      { number: 14, type: "coding", difficulty: "medium", question: "Formatează și afișează `index=2, val=hello` folosind `std::format`.", answer: "#include <iostream>\n#include <format>\nint main() {\n    std::cout << std::format(\"index={}, val={}\", 2, \"hello\");\n    return 0;\n}", starterCode: "", language: "cpp", expectedOutput: "index=2, val=hello" },
      { number: 15, type: "coding", difficulty: "medium", question: "Afișează primele 3 numere pare din `{1,2,3,4,5,6}` cu `views::filter` și `views::take`.", answer: "#include <iostream>\n#include <vector>\n#include <ranges>\nint main() {\n    std::vector<int> v = {1,2,3,4,5,6};\n    for (int x : v | std::views::filter([](int n){ return n%2==0; }) | std::views::take(3))\n        std::cout << x << \" \";\n    return 0;\n}", starterCode: "", language: "cpp", expectedOutput: "2 4 6 " },
    ],
  },
  // 25. "35. C++ si WebAssembly"
  {
    lessonId: "6a09ba19855b60bc2da6db66",
    name: "35. C++ si WebAssembly",
    tasks: [
      { number: 6, type: "fillblank", difficulty: "medium", question: "Instrumentul pentru compilarea C++ la WebAssembly este ___.", answer: "Emscripten", starterCode: "", language: "cpp", expectedOutput: "" },
      { number: 7, type: "fillblank", difficulty: "medium", question: "Extensia fișierelor WebAssembly este ___.\n```\nfisier.___\n```", answer: "wasm", starterCode: "", language: "cpp", expectedOutput: "" },
      { number: 8, type: "fillblank", difficulty: "medium", question: "Macro-ul Emscripten pentru a exporta funcții în JavaScript este ___.\n```cpp\n___ void functie() { ... }\n```", answer: "EMSCRIPTEN_KEEPALIVE", starterCode: "", language: "cpp", expectedOutput: "" },
      { number: 9, type: "fillblank", difficulty: "medium", question: "WebAssembly rulează în browser la viteze aproape de ___.", answer: "native", starterCode: "", language: "cpp", expectedOutput: "" },
      { number: 10, type: "fillblank", difficulty: "medium", question: "Comanda emcc pentru a compila la WASM este:\n```bash\nemcc main.cpp -o output.___\n```", answer: "js", starterCode: "", language: "cpp", expectedOutput: "" },
      { number: 11, type: "coding", difficulty: "medium", question: "Afișează `WASM ready` simulând inițializarea modulului WebAssembly.", answer: "#include <iostream>\nint main() {\n    std::cout << \"WASM ready\";\n    return 0;\n}", starterCode: "", language: "cpp", expectedOutput: "WASM ready" },
      { number: 12, type: "coding", difficulty: "medium", question: "Scrie funcția `int aduna(int a, int b)` de export WASM și afișează `aduna(3,4)=7`.", answer: "#include <iostream>\nint aduna(int a, int b) { return a + b; }\nint main() {\n    std::cout << \"aduna(3,4)=\" << aduna(3, 4);\n    return 0;\n}", starterCode: "", language: "cpp", expectedOutput: "aduna(3,4)=7" },
      { number: 13, type: "coding", difficulty: "medium", question: "Afișează dimensiunea în bytes a unui array de 1000 int-uri: `4000`.", answer: "#include <iostream>\nint main() {\n    std::cout << 1000 * sizeof(int);\n    return 0;\n}", starterCode: "", language: "cpp", expectedOutput: "4000" },
      { number: 14, type: "coding", difficulty: "medium", question: "Simulează exportul unui tabel de funcții: afișează `exports: 3`.", answer: "#include <iostream>\nint main() {\n    int exports = 3;\n    std::cout << \"exports: \" << exports;\n    return 0;\n}", starterCode: "", language: "cpp", expectedOutput: "exports: 3" },
      { number: 15, type: "coding", difficulty: "medium", question: "Afișează `C++ -> WASM -> Browser: OK`.", answer: "#include <iostream>\nint main() {\n    std::cout << \"C++ -> WASM -> Browser: OK\";\n    return 0;\n}", starterCode: "", language: "cpp", expectedOutput: "C++ -> WASM -> Browser: OK" },
    ],
  },
];

async function main() {
  for (const fix of FIXES) {
    const del = await prisma.task.deleteMany({
      where: { lessonId: fix.lessonId, number: { gte: 6 } },
    });
    await prisma.task.createMany({
      data: fix.tasks.map((t) => ({ ...t, lessonId: fix.lessonId })),
    });
    console.log(`✓ ${fix.name} — deleted ${del.count}, created ${fix.tasks.length}`);
  }
  console.log("Done.");
  await prisma.$disconnect();
}
main().catch((e) => {
  console.error(e);
  process.exit(1);
});
