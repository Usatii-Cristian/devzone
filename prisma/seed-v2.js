"use strict";
require("dotenv").config({ path: ".env" });
const { PrismaClient } = require("@prisma/client");
const p = new PrismaClient();

const MODULE_LANG = {
  python: "python", javascript: "javascript", html: "html", css: "css",
  tailwind: "html", react: "jsx", "nextjs-frontend": "jsx",
  "nextjs-backend": "javascript", c: "c", cpp: "cpp",
  csharp: "csharp", java: "java", sql: "sql", php: "php",
  cybersecurity: "javascript",
};

function normalize(s) {
  return s.toLowerCase()
    .replace(/[șş]/g, "s").replace(/[țţ]/g, "t")
    .replace(/ă/g, "a").replace(/â/g, "a").replace(/î/g, "i");
}

const TOPICS = {};

// ══════════════════════════════════════════════════════════════
// C++ TOPICS
// ══════════════════════════════════════════════════════════════

TOPICS["cpp::intro"] = {
  fillblanks: [
    {
      difficulty: "easy", name: "Using namespace",
      question: "Completează pentru a folosi cout fără prefix:\n```cpp\n#include <iostream>\nusing namespace ___;\nint main() { cout << \"Hi\"; }\n```",
      answer: "std",
      explanation: "using namespace std; permite folosirea cout în loc de std::cout."
    },
    {
      difficulty: "easy", name: "Tip auto",
      question: "Completează cu cuvântul cheie pentru deducere automată de tip:\n```cpp\n___ x = 3.14; // compilatorul deduce double\n```",
      answer: "auto",
      explanation: "auto (C++11) permite compilatorului să deducă tipul din inițializator."
    },
    {
      difficulty: "medium", name: "Referință",
      question: "Completează operatorul pentru a declara o referință la int:\n```cpp\nint x = 5;\nint___ ref = x;\nref = 10; // x devine 10\n```",
      answer: "&",
      explanation: "& declară o referință — alias permanent la variabila originală."
    },
    {
      difficulty: "medium", name: "Pointer nullptr",
      question: "Completează valoarea modernă pentru pointer nul în C++11+:\n```cpp\nint* p = ___;\nif (p == nullptr) cout << \"null\";\n```",
      answer: "nullptr",
      explanation: "nullptr (C++11) înlocuiește NULL/0 pentru pointeri nuli — type-safe."
    },
    {
      difficulty: "hard", name: "Const pointer",
      question: "Ce nu poate fi modificat cu declarația `int* const p = &x;`?\n(a) valoarea pointată  (b) adresa stocată în p  (c) amândouă\nRăspuns: `___`",
      answer: "adresa stocata in p",
      explanation: "int* const p este const pointer: p nu poate fi redirecționat, dar *p poate fi schimbat."
    },
  ],
  codings: [
    {
      difficulty: "easy", name: "Hello C++",
      question: "Afișează exact:\n```\nHello, C++!\n```",
      starterCode: "#include <iostream>\nusing namespace std;\nint main() {\n    // TODO\n    return 0;\n}\n",
      expectedOutput: "Hello, C++!",
      language: "cpp"
    },
    {
      difficulty: "easy", name: "Sumă simplă",
      question: "Declară `a=7`, `b=13`, afișează suma lor:\n```\n20\n```",
      starterCode: "#include <iostream>\nusing namespace std;\nint main() {\n    int a = 7, b = 13;\n    // TODO: afișează a + b\n    return 0;\n}\n",
      expectedOutput: "20",
      language: "cpp"
    },
    {
      difficulty: "medium", name: "Funcție patrat",
      question: "Funcție `patrat(n)` returnează n². Apeleaz-o cu 9:\n```\n81\n```",
      starterCode: "#include <iostream>\nusing namespace std;\nint patrat(int n) {\n    // TODO\n}\nint main() {\n    cout << patrat(9) << endl;\n    return 0;\n}\n",
      expectedOutput: "81",
      language: "cpp"
    },
    {
      difficulty: "medium", name: "Referință modificare",
      question: "Triplează valoarea lui `x=5` printr-o funcție cu referință:\n```\n15\n```",
      starterCode: "#include <iostream>\nusing namespace std;\nvoid tripleza(int& n) {\n    // TODO\n}\nint main() {\n    int x = 5;\n    tripleza(x);\n    cout << x << endl;\n    return 0;\n}\n",
      expectedOutput: "15",
      language: "cpp"
    },
    {
      difficulty: "hard", name: "Fibonacci recursiv",
      question: "Calculează și afișează fib(10):\n```\n55\n```",
      starterCode: "#include <iostream>\nusing namespace std;\nint fib(int n) {\n    if (n <= 1) return n;\n    // TODO: completează recursiv\n}\nint main() {\n    cout << fib(10) << endl;\n    return 0;\n}\n",
      expectedOutput: "55",
      language: "cpp"
    },
  ]
};

TOPICS["cpp::oop"] = {
  fillblanks: [
    {
      difficulty: "easy", name: "Acces public",
      question: "Completează specificatorul de acces pentru membrii vizibili din exterior:\n```cpp\nclass Masina {\n___:\n    string marca;\n};\n```",
      answer: "public",
      explanation: "public permite accesul la membri din afara clasei."
    },
    {
      difficulty: "easy", name: "Instanțiere obiect",
      question: "Completează pentru a crea un obiect al clasei Masina:\n```cpp\nMasina ___ = Masina();\n```",
      answer: "m",
      explanation: "Un obiect se instanțiează prin declararea variabilei cu tipul clasei."
    },
    {
      difficulty: "medium", name: "Constructor inițializare",
      question: "Completează lista de inițializare a constructorului:\n```cpp\nclass Punct {\npublic:\n    int x, y;\n    Punct(int a, int b) : ___(a), y(b) {}\n};\n```",
      answer: "x",
      explanation: "Lista de inițializare (: member(val)) inițializează membrii înainte de corpul constructorului."
    },
    {
      difficulty: "medium", name: "This pointer",
      question: "Completează pentru a distinge membrul de parametru:\n```cpp\nvoid setNume(string nume) {\n    ___->nume = nume;\n}\n```",
      answer: "this",
      explanation: "this este un pointer la obiectul curent — folosit când paramtru și membru au același nume."
    },
    {
      difficulty: "hard", name: "Destructor",
      question: "Completează simbolul care marchează destructorul clasei:\n```cpp\nclass Buffer {\npublic:\n    ___Buffer() { delete[] data; }\nprivate:\n    int* data;\n};\n```",
      answer: "~",
      explanation: "Destructorul se definește cu ~ înainte de numele clasei; eliberează resursele la distrugerea obiectului."
    },
  ],
  codings: [
    {
      difficulty: "easy", name: "Clasă Dreptunghi",
      question: "Creează clasa Dreptunghi cu `arie()`, apeleaz-o cu l=4, h=5:\n```\n20\n```",
      starterCode: "#include <iostream>\nusing namespace std;\nclass Dreptunghi {\npublic:\n    int l, h;\n    Dreptunghi(int l, int h) : l(l), h(h) {}\n    // TODO: metoda arie()\n};\nint main() {\n    Dreptunghi d(4, 5);\n    cout << d.arie() << endl;\n    return 0;\n}\n",
      expectedOutput: "20",
      language: "cpp"
    },
    {
      difficulty: "easy", name: "Getter/Setter",
      question: "Clasă Persoana cu getter/setter pentru vârstă, afișează după set(25):\n```\n25\n```",
      starterCode: "#include <iostream>\nusing namespace std;\nclass Persoana {\nprivate:\n    int varsta;\npublic:\n    void setVarsta(int v) { varsta = v; }\n    int getVarsta() { return varsta; }\n};\nint main() {\n    Persoana p;\n    p.setVarsta(25);\n    cout << p.getVarsta() << endl;\n    return 0;\n}\n",
      expectedOutput: "25",
      language: "cpp"
    },
    {
      difficulty: "medium", name: "Operator overload",
      question: "Supraîncarcă `+` pentru Vec2D(x,y), afișează (1,2)+(3,4):\n```\n4 6\n```",
      starterCode: "#include <iostream>\nusing namespace std;\nstruct Vec2D {\n    int x, y;\n    Vec2D(int x, int y) : x(x), y(y) {}\n    Vec2D operator+(const Vec2D& o) const {\n        // TODO: returnează Vec2D cu sumele\n    }\n};\nint main() {\n    Vec2D v = Vec2D(1,2) + Vec2D(3,4);\n    cout << v.x << \" \" << v.y << endl;\n    return 0;\n}\n",
      expectedOutput: "4 6",
      language: "cpp"
    },
    {
      difficulty: "medium", name: "Static member",
      question: "Numără instanțele clasei Contor cu member static:\n```\n3\n```",
      starterCode: "#include <iostream>\nusing namespace std;\nclass Contor {\npublic:\n    static int count;\n    Contor() { count++; }\n};\nint Contor::count = 0;\nint main() {\n    Contor a, b, c;\n    cout << Contor::count << endl;\n    return 0;\n}\n",
      expectedOutput: "3",
      language: "cpp"
    },
    {
      difficulty: "hard", name: "Copy constructor",
      question: "Implementează copy constructor pentru Matrice 2x2 și afișează copia:\n```\n1 2\n3 4\n```",
      starterCode: "#include <iostream>\nusing namespace std;\nclass Matrice {\npublic:\n    int data[2][2];\n    Matrice(int a,int b,int c,int d){data[0][0]=a;data[0][1]=b;data[1][0]=c;data[1][1]=d;}\n    Matrice(const Matrice& src) {\n        // TODO: copiază data[i][j]\n    }\n    void print() {\n        for(int i=0;i<2;i++){\n            for(int j=0;j<2;j++) cout<<data[i][j]<<(j<1?\" \":\"\\n\");\n        }\n    }\n};\nint main() {\n    Matrice m(1,2,3,4);\n    Matrice copia(m);\n    copia.print();\n    return 0;\n}\n",
      expectedOutput: "1 2\n3 4",
      language: "cpp"
    },
  ]
};

TOPICS["cpp::mostenire"] = {
  fillblanks: [
    {
      difficulty: "easy", name: "Cuvânt cheie moștenire",
      question: "Completează pentru a moșteni clasa Animal:\n```cpp\nclass Caine ___ Animal {\n    // ...\n};\n```",
      answer: ":",
      explanation: "Moștenirea în C++ se specifică cu : urmat de specificatorul de acces și clasa de bază."
    },
    {
      difficulty: "easy", name: "Funcție virtuală",
      question: "Completează cuvântul cheie pentru a permite suprascriere:\n```cpp\nclass Animal {\npublic:\n    ___ void vorbeste() { cout << \"...\"; }\n};\n```",
      answer: "virtual",
      explanation: "virtual permite claselor derivate să suprascrie metoda — polimorfism dinamic."
    },
    {
      difficulty: "medium", name: "Override explicit",
      question: "Completează marcatorul explicit pentru suprascriere (C++11):\n```cpp\nclass Caine : public Animal {\npublic:\n    void vorbeste() ___ { cout << \"Ham!\"; }\n};\n```",
      answer: "override",
      explanation: "override confirmă că metoda suprascrie una virtuală din clasa de bază — eroare la compilare dacă nu."
    },
    {
      difficulty: "medium", name: "Clasă abstractă",
      question: "Completează pentru a declara o funcție virtuală pură:\n```cpp\nclass Forma {\npublic:\n    virtual double arie() ___ = 0;\n};\n```",
      answer: "pure",
      explanation: "= 0 declară o funcție virtuală pură — clasa devine abstractă și nu poate fi instanțiată."
    },
    {
      difficulty: "hard", name: "Virtual destructor",
      question: "De ce trebuie destructorul clasei de bază să fie virtual?\n(a) pentru a apela destructorul derived prin pointer de bază\n(b) pentru performanță\n(c) nu trebuie\nRăspuns: `___`",
      answer: "a",
      explanation: "Fără virtual destructor, delete pe un pointer de bază nu apelează destructorul clasei derivate — memory leak."
    },
  ],
  codings: [
    {
      difficulty: "easy", name: "Moștenire simplă",
      question: "Caine moștenește Animal.vorbeste(), suprascrie cu 'Ham!':\n```\nHam!\n```",
      starterCode: "#include <iostream>\nusing namespace std;\nclass Animal {\npublic:\n    virtual void vorbeste() { cout << \"...\" << endl; }\n};\nclass Caine : public Animal {\npublic:\n    // TODO: suprascrie vorbeste()\n};\nint main() {\n    Caine c;\n    c.vorbeste();\n    return 0;\n}\n",
      expectedOutput: "Ham!",
      language: "cpp"
    },
    {
      difficulty: "easy", name: "Polimorfism",
      question: "Afișează sunetul fiecărui animal prin pointer de bază:\n```\nMiau!\nHam!\n```",
      starterCode: "#include <iostream>\nusing namespace std;\nclass Animal {\npublic:\n    virtual void sunet() = 0;\n};\nclass Pisica : public Animal {\npublic:\n    void sunet() override { cout << \"Miau!\" << endl; }\n};\nclass Caine : public Animal {\npublic:\n    void sunet() override { cout << \"Ham!\" << endl; }\n};\nint main() {\n    Animal* animale[] = {new Pisica(), new Caine()};\n    for (auto a : animale) { a->sunet(); delete a; }\n    return 0;\n}\n",
      expectedOutput: "Miau!\nHam!",
      language: "cpp"
    },
    {
      difficulty: "medium", name: "Clasă abstractă Formă",
      question: "Implementează Cerc și Dreptunghi cu arie(), afișează:\n```\n78.54\n20\n```",
      starterCode: "#include <iostream>\n#include <cmath>\nusing namespace std;\nclass Forma {\npublic:\n    virtual double arie() const = 0;\n    virtual ~Forma() {}\n};\nclass Cerc : public Forma {\n    double r;\npublic:\n    Cerc(double r) : r(r) {}\n    double arie() const override {\n        // TODO: M_PI * r * r, rotunjit la 2 zecimale\n        return round(M_PI * r * r * 100) / 100;\n    }\n};\nclass Dreptunghi : public Forma {\n    double l, h;\npublic:\n    Dreptunghi(double l, double h) : l(l), h(h) {}\n    double arie() const override {\n        // TODO\n    }\n};\nint main() {\n    Forma* f1 = new Cerc(5);\n    Forma* f2 = new Dreptunghi(4, 5);\n    cout << f1->arie() << endl;\n    cout << f2->arie() << endl;\n    delete f1; delete f2;\n    return 0;\n}\n",
      expectedOutput: "78.54\n20",
      language: "cpp"
    },
    {
      difficulty: "medium", name: "Moștenire multiplă",
      question: "Clasa Student moștenește Persoana și Cursant, afișează:\n```\nAna, cursant activ\n```",
      starterCode: "#include <iostream>\nusing namespace std;\nclass Persoana {\npublic:\n    string nume;\n    Persoana(string n) : nume(n) {}\n};\nclass Cursant {\npublic:\n    bool activ = true;\n};\nclass Student : public Persoana, public Cursant {\npublic:\n    Student(string n) : Persoana(n) {}\n    void info() {\n        // TODO: afișează \"<nume>, cursant activ\" sau \"inactiv\"\n        cout << nume << \", cursant \" << (activ ? \"activ\" : \"inactiv\") << endl;\n    }\n};\nint main() {\n    Student s(\"Ana\");\n    s.info();\n    return 0;\n}\n",
      expectedOutput: "Ana, cursant activ",
      language: "cpp"
    },
    {
      difficulty: "hard", name: "RTTI și dynamic_cast",
      question: "Identifică tipul real al obiectului cu dynamic_cast și afișează:\n```\nEste Caine\nNu este Caine\n```",
      starterCode: "#include <iostream>\nusing namespace std;\nclass Animal { public: virtual ~Animal() {} };\nclass Caine : public Animal {};\nclass Pisica : public Animal {};\nvoid identifica(Animal* a) {\n    // TODO: dynamic_cast<Caine*>(a) != nullptr\n    if (dynamic_cast<Caine*>(a) != nullptr)\n        cout << \"Este Caine\" << endl;\n    else\n        cout << \"Nu este Caine\" << endl;\n}\nint main() {\n    identifica(new Caine());\n    identifica(new Pisica());\n    return 0;\n}\n",
      expectedOutput: "Este Caine\nNu este Caine",
      language: "cpp"
    },
  ]
};

TOPICS["cpp::templates"] = {
  fillblanks: [
    {
      difficulty: "easy", name: "Declarare template",
      question: "Completează declarația unui template de funcție:\n```cpp\n___ <typename T>\nT maxim(T a, T b) { return a > b ? a : b; }\n```",
      answer: "template",
      explanation: "template <typename T> declară un parametru de tip generic T."
    },
    {
      difficulty: "easy", name: "Apel template explicit",
      question: "Completează apelul explicit cu tipul int:\n```cpp\nauto r = maxim<___>(3, 7);\n```",
      answer: "int",
      explanation: "Tipul poate fi specificat explicit între <> la apelul funcției template."
    },
    {
      difficulty: "medium", name: "Template clasă",
      question: "Completează parametrul de tip la instanțierea clasei template Stiva:\n```cpp\nStiva<___> s;\ns.push(42);\n```",
      answer: "int",
      explanation: "La instanțierea unui template de clasă se specifică tipul concret între <>."
    },
    {
      difficulty: "medium", name: "Specializare parțială",
      question: "Completează prefixul specializării complete pentru bool:\n```cpp\ntemplate<>\nstruct TypeInfo<___> {\n    static string name() { return \"bool\"; }\n};\n```",
      answer: "bool",
      explanation: "Specializarea completă template<> furnizează implementare specifică unui tip concret."
    },
    {
      difficulty: "hard", name: "C++20 Concept",
      question: "Completează constraint-ul pentru a accepta doar tipuri aritmetice:\n```cpp\n#include <concepts>\ntemplate<___<std::is_arithmetic> T>\nT suma(T a, T b) { return a + b; }\n```",
      answer: "std::enable_if_t",
      explanation: "C++20 Concepts (requires/std::enable_if) restricționează tipurile acceptate de template."
    },
  ],
  codings: [
    {
      difficulty: "easy", name: "Template minim",
      question: "Funcție template `minim(a,b)` pentru int și double, afișează:\n```\n3\n2.71\n```",
      starterCode: "#include <iostream>\nusing namespace std;\ntemplate<typename T>\nT minim(T a, T b) {\n    // TODO\n}\nint main() {\n    cout << minim(3, 7) << endl;\n    cout << minim(3.14, 2.71) << endl;\n    return 0;\n}\n",
      expectedOutput: "3\n2.71",
      language: "cpp"
    },
    {
      difficulty: "easy", name: "Template swap",
      question: "Funcție template `schimba(a,b)` care schimbă valorile, afișează:\n```\n20 10\n```",
      starterCode: "#include <iostream>\nusing namespace std;\ntemplate<typename T>\nvoid schimba(T& a, T& b) {\n    // TODO\n}\nint main() {\n    int x = 10, y = 20;\n    schimba(x, y);\n    cout << x << \" \" << y << endl;\n    return 0;\n}\n",
      expectedOutput: "20 10",
      language: "cpp"
    },
    {
      difficulty: "medium", name: "Clasă template Pereche",
      question: "Template Pereche<T,U> cu first/second, afișează:\n```\nAna 30\n```",
      starterCode: "#include <iostream>\nusing namespace std;\ntemplate<typename T, typename U>\nstruct Pereche {\n    T first;\n    U second;\n    Pereche(T a, U b) : first(a), second(b) {}\n};\nint main() {\n    Pereche<string, int> p(\"Ana\", 30);\n    cout << p.first << \" \" << p.second << endl;\n    return 0;\n}\n",
      expectedOutput: "Ana 30",
      language: "cpp"
    },
    {
      difficulty: "medium", name: "Template Stivă",
      question: "Clasă template Stiva cu push/pop/top, afișează ultimele 2:\n```\n30\n20\n```",
      starterCode: "#include <iostream>\n#include <vector>\nusing namespace std;\ntemplate<typename T>\nclass Stiva {\n    vector<T> data;\npublic:\n    void push(T val) { data.push_back(val); }\n    void pop() { data.pop_back(); }\n    T top() { return data.back(); }\n    bool gol() { return data.empty(); }\n};\nint main() {\n    Stiva<int> s;\n    s.push(10); s.push(20); s.push(30);\n    cout << s.top() << endl;\n    s.pop();\n    cout << s.top() << endl;\n    return 0;\n}\n",
      expectedOutput: "30\n20",
      language: "cpp"
    },
    {
      difficulty: "hard", name: "Variadic template",
      question: "Funcție variadic `suma(args...)` care adună orice număr de argumente:\n```\n15\n```",
      starterCode: "#include <iostream>\nusing namespace std;\ntemplate<typename T>\nT suma(T t) { return t; }\ntemplate<typename T, typename... Args>\nT suma(T t, Args... args) {\n    // TODO: return t + suma(args...)\n}\nint main() {\n    cout << suma(1, 2, 3, 4, 5) << endl;\n    return 0;\n}\n",
      expectedOutput: "15",
      language: "cpp"
    },
  ]
};

TOPICS["cpp::stl"] = {
  fillblanks: [
    {
      difficulty: "easy", name: "Vector push_back",
      question: "Completează pentru a adăuga elementul 42 la vector:\n```cpp\nvector<int> v;\nv.___(42);\n```",
      answer: "push_back",
      explanation: "push_back() adaugă un element la finalul vectorului."
    },
    {
      difficulty: "easy", name: "Map insert",
      question: "Completează pentru a accesa/insera în map:\n```cpp\nmap<string,int> m;\nm[___] = 25;\n```",
      answer: "\"varsta\"",
      explanation: "operator[] pe map accesează sau creează o intrare cu cheia dată."
    },
    {
      difficulty: "medium", name: "Sort descrescător",
      question: "Completează comparatorul pentru sortare descrescătoare:\n```cpp\nsort(v.begin(), v.end(), ___);\n```",
      answer: "greater<int>()",
      explanation: "greater<T>() este un functor STL pentru sortare descrescătoare."
    },
    {
      difficulty: "medium", name: "Find în vector",
      question: "Completează algoritmul pentru căutarea valorii 5:\n```cpp\nauto it = ___(v.begin(), v.end(), 5);\n```",
      answer: "find",
      explanation: "std::find returnează un iterator la primul element găsit sau end() dacă nu există."
    },
    {
      difficulty: "hard", name: "Lambda cu algoritm",
      question: "Completează pentru a număra elementele pare din vector:\n```cpp\nint nr = count_if(v.begin(), v.end(),\n    ___(int x) { return x % 2 == 0; });\n```",
      answer: "[](int x)",
      explanation: "count_if cu lambda numără elementele care satisfac predicatul."
    },
  ],
  codings: [
    {
      difficulty: "easy", name: "Sort vector",
      question: "Sortează {5,3,1,4,2} și afișeaz-l:\n```\n1 2 3 4 5\n```",
      starterCode: "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\nint main() {\n    vector<int> v = {5,3,1,4,2};\n    // TODO: sortează și afișează\n    return 0;\n}\n",
      expectedOutput: "1 2 3 4 5",
      language: "cpp"
    },
    {
      difficulty: "easy", name: "Map frecvențe",
      question: "Numără frecvența cuvintelor {\"ana\",\"ion\",\"ana\"}, afișează sorted:\n```\nana: 2\nion: 1\n```",
      starterCode: "#include <iostream>\n#include <map>\n#include <vector>\nusing namespace std;\nint main() {\n    vector<string> cuvinte = {\"ana\", \"ion\", \"ana\"};\n    map<string, int> freq;\n    // TODO: parcurge și numără\n    for (auto& [k, v] : freq)\n        cout << k << \": \" << v << endl;\n    return 0;\n}\n",
      expectedOutput: "ana: 2\nion: 1",
      language: "cpp"
    },
    {
      difficulty: "medium", name: "Set unic",
      question: "Elimină duplicatele din {3,1,4,1,5,9,2,6,5} cu set, afișează sorted:\n```\n1 2 3 4 5 6 9\n```",
      starterCode: "#include <iostream>\n#include <set>\n#include <vector>\nusing namespace std;\nint main() {\n    vector<int> v = {3,1,4,1,5,9,2,6,5};\n    set<int> s(v.begin(), v.end());\n    for (int x : s) cout << x << \" \";\n    cout << endl;\n    return 0;\n}\n",
      expectedOutput: "1 2 3 4 5 6 9",
      language: "cpp"
    },
    {
      difficulty: "medium", name: "Transform + accumulate",
      question: "Ridică la pătrat {1,2,3,4,5} cu transform, calculează suma cu accumulate:\n```\n55\n```",
      starterCode: "#include <iostream>\n#include <vector>\n#include <algorithm>\n#include <numeric>\nusing namespace std;\nint main() {\n    vector<int> v = {1,2,3,4,5};\n    // TODO: transform la pătrate, then accumulate\n    return 0;\n}\n",
      expectedOutput: "55",
      language: "cpp"
    },
    {
      difficulty: "hard", name: "Priority queue top-k",
      question: "Găsește top-3 cele mai mari din {3,1,4,1,5,9,2,6,5,3} cu priority_queue:\n```\n9 6 5\n```",
      starterCode: "#include <iostream>\n#include <queue>\n#include <vector>\nusing namespace std;\nint main() {\n    vector<int> v = {3,1,4,1,5,9,2,6,5,3};\n    priority_queue<int> pq(v.begin(), v.end());\n    for (int i = 0; i < 3; i++) {\n        // TODO: afișează top și pop\n    }\n    cout << endl;\n    return 0;\n}\n",
      expectedOutput: "9 6 5",
      language: "cpp"
    },
  ]
};

TOPICS["cpp::smart_ptrs"] = {
  fillblanks: [
    {
      difficulty: "easy", name: "unique_ptr creare",
      question: "Completează pentru a crea un unique_ptr la int:\n```cpp\nauto p = std::make_unique<___>(42);\n```",
      answer: "int",
      explanation: "make_unique<T>() creează un unique_ptr cu ownership exclusiv — nu poate fi copiat."
    },
    {
      difficulty: "easy", name: "shared_ptr count",
      question: "Completează metoda care returnează numărul de referințe:\n```cpp\nauto p = make_shared<int>(5);\ncout << p.___() << endl; // 1\n```",
      answer: "use_count",
      explanation: "use_count() returnează câți shared_ptr partajează același obiect."
    },
    {
      difficulty: "medium", name: "Move unique_ptr",
      question: "Completează pentru a transfera ownership-ul unique_ptr:\n```cpp\nauto p1 = make_unique<int>(10);\nauto p2 = ___(p1); // p1 devine nullptr\n```",
      answer: "std::move",
      explanation: "unique_ptr nu poate fi copiat — se transferă cu std::move (move semantics)."
    },
    {
      difficulty: "medium", name: "weak_ptr",
      question: "Completează tipul pointerului care nu crește use_count:\n```cpp\nshared_ptr<int> sp = make_shared<int>(1);\n___<int> wp = sp; // nu crește referința\n```",
      answer: "weak_ptr",
      explanation: "weak_ptr observă un shared_ptr fără a-l poseda — previne referințe circulare."
    },
    {
      difficulty: "hard", name: "Custom deleter",
      question: "Completează lambda ca deleter pentru resurse FILE*:\n```cpp\nauto f = unique_ptr<FILE, ___>(\n    fopen(\"x.txt\",\"r\"), [](FILE* p){ fclose(p); });\n```",
      answer: "decltype([](FILE* p){ fclose(p); })",
      explanation: "unique_ptr acceptă un custom deleter ca al doilea parametru template."
    },
  ],
  codings: [
    {
      difficulty: "easy", name: "unique_ptr basic",
      question: "Creează unique_ptr la int cu valoarea 99, afișează valoarea:\n```\n99\n```",
      starterCode: "#include <iostream>\n#include <memory>\nusing namespace std;\nint main() {\n    auto p = make_unique<int>(99);\n    // TODO: afișează *p\n    return 0;\n}\n",
      expectedOutput: "99",
      language: "cpp"
    },
    {
      difficulty: "easy", name: "shared_ptr sharing",
      question: "Creează shared_ptr, copiaz-l, afișează use_count:\n```\n2\n```",
      starterCode: "#include <iostream>\n#include <memory>\nusing namespace std;\nint main() {\n    auto p1 = make_shared<int>(5);\n    auto p2 = p1; // copie — crește use_count\n    cout << p1.use_count() << endl;\n    return 0;\n}\n",
      expectedOutput: "2",
      language: "cpp"
    },
    {
      difficulty: "medium", name: "unique_ptr vector",
      question: "Stochează 3 obiecte Forma în vector<unique_ptr>, afișează ariile:\n```\n12\n9\n```",
      starterCode: "#include <iostream>\n#include <memory>\n#include <vector>\nusing namespace std;\nstruct Forma {\n    virtual int arie() = 0;\n    virtual ~Forma() {}\n};\nstruct Rect : Forma {\n    int l,h; Rect(int l,int h):l(l),h(h){}\n    int arie() override { return l*h; }\n};\nstruct Patrat : Forma {\n    int s; Patrat(int s):s(s){}\n    int arie() override { return s*s; }\n};\nint main() {\n    vector<unique_ptr<Forma>> forme;\n    forme.push_back(make_unique<Rect>(3,4));\n    forme.push_back(make_unique<Patrat>(3));\n    for (auto& f : forme) cout << f->arie() << endl;\n    return 0;\n}\n",
      expectedOutput: "12\n9",
      language: "cpp"
    },
    {
      difficulty: "medium", name: "Move semantics",
      question: "Demonstrează că unique_ptr nu poate fi copiat, doar moved:\n```\n42\n```",
      starterCode: "#include <iostream>\n#include <memory>\nusing namespace std;\nint main() {\n    auto p1 = make_unique<int>(42);\n    auto p2 = std::move(p1);\n    // p1 e acum nullptr\n    if (!p1) {\n        cout << *p2 << endl;\n    }\n    return 0;\n}\n",
      expectedOutput: "42",
      language: "cpp"
    },
    {
      difficulty: "hard", name: "Circular reference fix",
      question: "Rezolvă referința circulară Node↔Node cu weak_ptr, afișează:\n```\nOK\n```",
      starterCode: "#include <iostream>\n#include <memory>\nusing namespace std;\nstruct Node {\n    shared_ptr<Node> next;\n    weak_ptr<Node> prev; // weak pentru a evita ciclu\n    ~Node() { cout << \"OK\" << endl; }\n};\nint main() {\n    {\n        auto n1 = make_shared<Node>();\n        auto n2 = make_shared<Node>();\n        n1->next = n2;\n        n2->prev = n1; // weak_ptr — nu ține în viață\n    } // ambele sunt distruse\n    return 0;\n}\n",
      expectedOutput: "OK",
      language: "cpp"
    },
  ]
};

TOPICS["cpp::exceptions"] = {
  fillblanks: [
    {
      difficulty: "easy", name: "Throw excepție",
      question: "Completează pentru a arunca o excepție:\n```cpp\nif (b == 0)\n    ___ runtime_error(\"Impartire la zero\");\n```",
      answer: "throw",
      explanation: "throw aruncă o excepție — execuția sare la cel mai apropiat catch compatibil."
    },
    {
      difficulty: "easy", name: "Catch excepție",
      question: "Completează blocul care prinde excepția:\n```cpp\ntry { riscant(); }\n___ (const exception& e) { cerr << e.what(); }\n```",
      answer: "catch",
      explanation: "catch prinde excepțiile aruncate în blocul try; const exception& prinde orice std::exception."
    },
    {
      difficulty: "medium", name: "Finally echivalent",
      question: "C++ nu are finally — completează clauza care se execută mereu:\n```cpp\ntry { ... }\ncatch (...) { ... }\n// resurse eliberate în ___ (RAII)\n```",
      answer: "destructor",
      explanation: "C++ folosește RAII: destructorii se apelează garantat la ieșire din scope, indiferent de excepții."
    },
    {
      difficulty: "medium", name: "noexcept",
      question: "Completează pentru a garanta că funcția nu aruncă excepții:\n```cpp\nvoid functie() ___ { /* cod sigur */ }\n```",
      answer: "noexcept",
      explanation: "noexcept permite optimizări — compilatorul poate asuma că funcția nu aruncă excepții."
    },
    {
      difficulty: "hard", name: "Exception safety",
      question: "Ce garanție oferă o funcție care fie reușește complet, fie lasă starea nemodificată?\n(a) basic  (b) strong  (c) nothrow\nRăspuns: `___`",
      answer: "b",
      explanation: "Garanția strong (commit-or-rollback): la excepție, starea rămâne ca înainte apelului."
    },
  ],
  codings: [
    {
      difficulty: "easy", name: "Try-catch simplu",
      question: "Prinde excepția la împărțire la zero și afișează:\n```\nEroare: Impartire la zero\n```",
      starterCode: "#include <iostream>\n#include <stdexcept>\nusing namespace std;\nint divide(int a, int b) {\n    if (b == 0) throw runtime_error(\"Impartire la zero\");\n    return a / b;\n}\nint main() {\n    try {\n        divide(10, 0);\n    } catch (const runtime_error& e) {\n        cout << \"Eroare: \" << e.what() << endl;\n    }\n    return 0;\n}\n",
      expectedOutput: "Eroare: Impartire la zero",
      language: "cpp"
    },
    {
      difficulty: "easy", name: "Multiple catch",
      question: "Prinde std::out_of_range și afișează mesajul:\n```\nIndex invalid\n```",
      starterCode: "#include <iostream>\n#include <vector>\n#include <stdexcept>\nusing namespace std;\nint main() {\n    try {\n        vector<int> v = {1,2,3};\n        cout << v.at(10) << endl; // aruncă out_of_range\n    } catch (const out_of_range&) {\n        cout << \"Index invalid\" << endl;\n    } catch (const exception& e) {\n        cout << \"Altă eroare: \" << e.what() << endl;\n    }\n    return 0;\n}\n",
      expectedOutput: "Index invalid",
      language: "cpp"
    },
    {
      difficulty: "medium", name: "Excepție custom",
      question: "Definește clasa VarstaNegativa:exception și arunc-o dacă varsta<0:\n```\nVarsta invalida: -5\n```",
      starterCode: "#include <iostream>\n#include <stdexcept>\nusing namespace std;\nclass VarstaNegativa : public runtime_error {\npublic:\n    int v;\n    VarstaNegativa(int v) : runtime_error(\"Varsta invalida\"), v(v) {}\n};\nvoid setVarsta(int v) {\n    // TODO: throw VarstaNegativa dacă v < 0\n    if (v < 0) throw VarstaNegativa(v);\n}\nint main() {\n    try { setVarsta(-5); }\n    catch (const VarstaNegativa& e) {\n        cout << e.what() << \": \" << e.v << endl;\n    }\n    return 0;\n}\n",
      expectedOutput: "Varsta invalida: -5",
      language: "cpp"
    },
    {
      difficulty: "medium", name: "RAII cleanup",
      question: "Clasa Resource afișează 'eliberat' în destructor chiar și la excepție:\n```\neliberat\nEroare\n```",
      starterCode: "#include <iostream>\nusing namespace std;\nclass Resource {\npublic:\n    Resource() {}\n    ~Resource() { cout << \"eliberat\" << endl; }\n};\nint main() {\n    try {\n        Resource r;\n        throw runtime_error(\"Eroare\");\n    } catch (const exception& e) {\n        cout << e.what() << endl;\n    }\n    return 0;\n}\n",
      expectedOutput: "eliberat\nEroare",
      language: "cpp"
    },
    {
      difficulty: "hard", name: "Exception rethrowing",
      question: "Prinde, logghează și re-aruncă excepția; prinde în outer:\n```\nInner: bad\nOuter: bad\n```",
      starterCode: "#include <iostream>\nusing namespace std;\nvoid inner() { throw runtime_error(\"bad\"); }\nvoid middle() {\n    try { inner(); }\n    catch (const exception& e) {\n        cout << \"Inner: \" << e.what() << endl;\n        throw; // re-throw\n    }\n}\nint main() {\n    try { middle(); }\n    catch (const exception& e) {\n        cout << \"Outer: \" << e.what() << endl;\n    }\n    return 0;\n}\n",
      expectedOutput: "Inner: bad\nOuter: bad",
      language: "cpp"
    },
  ]
};

TOPICS["cpp::lambda"] = {
  fillblanks: [
    {
      difficulty: "easy", name: "Lambda capture by value",
      question: "Completează captura pentru a folosi `x` prin valoare:\n```cpp\nint x = 10;\nauto f = [___]() { return x * 2; };\n```",
      answer: "=",
      explanation: "[=] capturează toate variabilele locale prin valoare (copie)."
    },
    {
      difficulty: "easy", name: "Lambda parametru",
      question: "Completează lista de parametri a lambda-ului:\n```cpp\nauto aduna = [](int a, int ___) { return a + b; };\n```",
      answer: "b",
      explanation: "Parametrii lambda se declară ca la funcțiile obișnuite, între paranteze."
    },
    {
      difficulty: "medium", name: "Capture by reference",
      question: "Completează captura pentru a modifica `total` din exterior:\n```cpp\nint total = 0;\nfor_each(v.begin(), v.end(), [___](int x){ total += x; });\n```",
      answer: "&",
      explanation: "[&] capturează prin referință — modificările se reflectă în variabila originală."
    },
    {
      difficulty: "medium", name: "Lambda mutable",
      question: "Completează pentru a modifica copia lui x în lambda:\n```cpp\nint x = 0;\nauto f = [x]() ___ { return ++x; };\n```",
      answer: "mutable",
      explanation: "mutable permite modificarea capturilor prin valoare (nu afectează originalul)."
    },
    {
      difficulty: "hard", name: "std::function",
      question: "Completează tipul pentru stocarea oricărui callable int→int:\n```cpp\nstd::function<int(___,___)> f = [](int a, int b){ return a+b; };\n```",
      answer: "int",
      explanation: "std::function<ret(args...)> poate stoca lambda, funcție, functor cu aceeași signatură."
    },
  ],
  codings: [
    {
      difficulty: "easy", name: "Lambda sort",
      question: "Sortează {\"banana\",\"mar\",\"kiwi\"} după lungime cu lambda:\n```\nmar kiwi banana\n```",
      starterCode: "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\nint main() {\n    vector<string> fructe = {\"banana\", \"mar\", \"kiwi\"};\n    sort(fructe.begin(), fructe.end(),\n        // TODO: lambda care compară după length\n        [](const string& a, const string& b){ return a.size() < b.size(); });\n    for (auto& f : fructe) cout << f << \" \";\n    cout << endl;\n    return 0;\n}\n",
      expectedOutput: "mar kiwi banana",
      language: "cpp"
    },
    {
      difficulty: "easy", name: "Lambda filter",
      question: "Elimină elementele negative cu remove_if și lambda:\n```\n1 3 5\n```",
      starterCode: "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\nint main() {\n    vector<int> v = {1, -2, 3, -4, 5};\n    v.erase(remove_if(v.begin(), v.end(),\n        [](int x){ return x < 0; }), v.end());\n    for (int x : v) cout << x << \" \";\n    cout << endl;\n    return 0;\n}\n",
      expectedOutput: "1 3 5",
      language: "cpp"
    },
    {
      difficulty: "medium", name: "Lambda capture acumulator",
      question: "Calculează suma elementelor cu for_each și capture [&]:\n```\n15\n```",
      starterCode: "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\nint main() {\n    vector<int> v = {1,2,3,4,5};\n    int suma = 0;\n    for_each(v.begin(), v.end(), [&](int x){ suma += x; });\n    cout << suma << endl;\n    return 0;\n}\n",
      expectedOutput: "15",
      language: "cpp"
    },
    {
      difficulty: "medium", name: "Higher-order function",
      question: "Funcție `aplica(f, v)` care aplică lambda pe fiecare element:\n```\n2 4 6 8 10\n```",
      starterCode: "#include <iostream>\n#include <vector>\n#include <functional>\nusing namespace std;\nvoid aplica(function<int(int)> f, vector<int>& v) {\n    for (auto& x : v) x = f(x);\n}\nint main() {\n    vector<int> v = {1,2,3,4,5};\n    aplica([](int x){ return x * 2; }, v);\n    for (int x : v) cout << x << \" \";\n    cout << endl;\n    return 0;\n}\n",
      expectedOutput: "2 4 6 8 10",
      language: "cpp"
    },
    {
      difficulty: "hard", name: "Lambda recursiv Y-combinator",
      question: "Lambda recursivă (fără capturare self) pentru factorial(5):\n```\n120\n```",
      starterCode: "#include <iostream>\n#include <functional>\nusing namespace std;\nint main() {\n    function<int(int)> fact;\n    fact = [&](int n) -> int {\n        return n <= 1 ? 1 : n * fact(n-1);\n    };\n    cout << fact(5) << endl;\n    return 0;\n}\n",
      expectedOutput: "120",
      language: "cpp"
    },
  ]
};

TOPICS["cpp::modern"] = {
  fillblanks: [
    {
      difficulty: "easy", name: "Structured bindings C++17",
      question: "Completează pentru a destructura o pereche:\n```cpp\nauto [cheie, valoare] = make_pair(\"x\", 42);\n// C++17: ___\n```",
      answer: "structured bindings",
      explanation: "Structured bindings (C++17) permit destructurarea tupluri/perechi/struct-uri direct în variabile."
    },
    {
      difficulty: "easy", name: "if constexpr",
      question: "Completează pentru ramificare la compile-time:\n```cpp\ntemplate<typename T>\nvoid f(T x) {\n    if ___(is_integral_v<T>)\n        cout << \"int: \" << x;\n}\n```",
      answer: "constexpr",
      explanation: "if constexpr (C++17) evaluează condiția la compile-time — branch-ul fals nu e compilat."
    },
    {
      difficulty: "medium", name: "std::optional",
      question: "Completează tipul de returnare pentru o funcție care poate eșua:\n```cpp\nstd::___<int> divide(int a, int b) {\n    if (b == 0) return std::nullopt;\n    return a / b;\n}\n```",
      answer: "optional",
      explanation: "std::optional<T> (C++17) reprezintă o valoare care poate lipsi — alternativă tip-sigură la null."
    },
    {
      difficulty: "medium", name: "std::variant",
      question: "Completează tipul pentru o valoare care poate fi int SAU string:\n```cpp\nstd::___<int, string> val = 42;\n```",
      answer: "variant",
      explanation: "std::variant<T...> (C++17) stochează exact una din mai multe tipuri alternative — union type-safe."
    },
    {
      difficulty: "hard", name: "Coroutine C++20",
      question: "Completează cuvântul cheie pentru a suspenda o coroutine:\n```cpp\nTask<int> generează() {\n    for (int i = 0; i < 3; i++)\n        ___ i; // suspendare și returnare valoare\n}\n```",
      answer: "co_yield",
      explanation: "co_yield (C++20) suspendă coroutine-ul și returnează o valoare intermediară apelantului."
    },
  ],
  codings: [
    {
      difficulty: "easy", name: "Range-based for cu auto",
      question: "Afișează elementele map-ului cu structured bindings:\n```\nana: 25\nion: 30\n```",
      starterCode: "#include <iostream>\n#include <map>\nusing namespace std;\nint main() {\n    map<string,int> m = {{\"ana\",25},{\"ion\",30}};\n    for (auto& [k, v] : m)\n        cout << k << \": \" << v << endl;\n    return 0;\n}\n",
      expectedOutput: "ana: 25\nion: 30",
      language: "cpp"
    },
    {
      difficulty: "easy", name: "std::optional",
      question: "Funcție `cautaVarsta` returnează optional, afișează dacă există:\n```\n25\nNu exista\n```",
      starterCode: "#include <iostream>\n#include <optional>\n#include <map>\nusing namespace std;\noptional<int> cautaVarsta(const map<string,int>& m, const string& k) {\n    auto it = m.find(k);\n    if (it == m.end()) return nullopt;\n    return it->second;\n}\nint main() {\n    map<string,int> m = {{\"ana\",25}};\n    auto v1 = cautaVarsta(m, \"ana\");\n    auto v2 = cautaVarsta(m, \"ion\");\n    if (v1) cout << *v1 << endl;\n    cout << (v2 ? to_string(*v2) : \"Nu exista\") << endl;\n    return 0;\n}\n",
      expectedOutput: "25\nNu exista",
      language: "cpp"
    },
    {
      difficulty: "medium", name: "std::variant visit",
      question: "Vizitează variant<int,string> și afișează tipul și valoarea:\n```\nint: 42\nstring: hello\n```",
      starterCode: "#include <iostream>\n#include <variant>\nusing namespace std;\nusing Val = variant<int, string>;\nvoid afiseaza(const Val& v) {\n    visit([](auto&& arg) {\n        using T = decay_t<decltype(arg)>;\n        if constexpr (is_same_v<T, int>)\n            cout << \"int: \" << arg << endl;\n        else\n            cout << \"string: \" << arg << endl;\n    }, v);\n}\nint main() {\n    afiseaza(42);\n    afiseaza(string(\"hello\"));\n    return 0;\n}\n",
      expectedOutput: "int: 42\nstring: hello",
      language: "cpp"
    },
    {
      difficulty: "medium", name: "String format C++20",
      question: "Formatează string-ul cu std::format (C++20):\n```\nAna are 25 de ani\n```",
      starterCode: "#include <iostream>\n#include <format>\nusing namespace std;\nint main() {\n    string nume = \"Ana\";\n    int varsta = 25;\n    cout << format(\"{} are {} de ani\", nume, varsta) << endl;\n    return 0;\n}\n",
      expectedOutput: "Ana are 25 de ani",
      language: "cpp"
    },
    {
      difficulty: "hard", name: "Ranges pipeline C++20",
      question: "Filtrează pare, ridică la pătrat, ia primele 3 din {1..10}:\n```\n4 16 36\n```",
      starterCode: "#include <iostream>\n#include <ranges>\n#include <vector>\nusing namespace std;\nint main() {\n    auto result = views::iota(1, 11)\n        | views::filter([](int x){ return x % 2 == 0; })\n        | views::transform([](int x){ return x * x; })\n        | views::take(3);\n    for (int x : result) cout << x << \" \";\n    cout << endl;\n    return 0;\n}\n",
      expectedOutput: "4 16 36",
      language: "cpp"
    },
  ]
};

TOPICS["cpp::concurrency"] = {
  fillblanks: [
    {
      difficulty: "easy", name: "std::thread",
      question: "Completează pentru a crea un thread care rulează funcția:\n```cpp\n#include <thread>\nvoid task() { /* ... */ }\nstd::___ t(task);\nt.join();\n```",
      answer: "thread",
      explanation: "std::thread creează și pornește un thread de execuție — join() așteaptă finalizarea."
    },
    {
      difficulty: "easy", name: "Mutex lock",
      question: "Completează pentru a achiziționa mutex-ul:\n```cpp\nstd::mutex m;\nm.___();\n// secțiune critică\nm.unlock();\n```",
      answer: "lock",
      explanation: "mutex.lock() blochează mutex-ul; unlock() îl eliberează. Preferă lock_guard pentru RAII."
    },
    {
      difficulty: "medium", name: "lock_guard",
      question: "Completează tipul RAII pentru gestiunea automată a mutex-ului:\n```cpp\nstd::mutex m;\n{\n    std::___<std::mutex> guard(m); // auto-unlock la ieșire\n    // secțiune critică\n}\n```",
      answer: "lock_guard",
      explanation: "lock_guard achizitionează mutex-ul la creare și îl eliberează automat la distrugere (RAII)."
    },
    {
      difficulty: "medium", name: "async future",
      question: "Completează pentru a obține rezultatul unui calcul asincron:\n```cpp\nauto fut = std::async(std::launch::async, calcul);\nint rez = fut.___(); // blochează până la rezultat\n```",
      answer: "get",
      explanation: "future::get() blochează thread-ul curent până când taskul asincron produce rezultatul."
    },
    {
      difficulty: "hard", name: "atomic",
      question: "Completează tipul pentru contor thread-safe fără mutex:\n```cpp\nstd::___<int> contor = 0;\n// poate fi incrementat din multiple threaduri\n```",
      answer: "atomic",
      explanation: "std::atomic<T> garantează operații atomice fără locks — eficient pentru variabile simple."
    },
  ],
  codings: [
    {
      difficulty: "easy", name: "Thread simplu",
      question: "Rulează funcția `task` în thread separat și afișează:\n```\nHello din thread!\n```",
      starterCode: "#include <iostream>\n#include <thread>\nusing namespace std;\nvoid task() {\n    cout << \"Hello din thread!\" << endl;\n}\nint main() {\n    thread t(task);\n    t.join();\n    return 0;\n}\n",
      expectedOutput: "Hello din thread!",
      language: "cpp"
    },
    {
      difficulty: "easy", name: "Thread cu lambda",
      question: "Creează 3 threaduri cu lambda care afișează ID-ul (0,1,2):\n```\n0\n1\n2\n```",
      starterCode: "#include <iostream>\n#include <thread>\n#include <vector>\nusing namespace std;\nint main() {\n    vector<thread> threads;\n    for (int i = 0; i < 3; i++)\n        threads.emplace_back([i](){ cout << i << endl; });\n    for (auto& t : threads) t.join();\n    return 0;\n}\n",
      expectedOutput: "0\n1\n2",
      language: "cpp"
    },
    {
      difficulty: "medium", name: "Mutex contor",
      question: "Incrementează contor din 4 threaduri cu mutex, afișează 4000:\n```\n4000\n```",
      starterCode: "#include <iostream>\n#include <thread>\n#include <mutex>\n#include <vector>\nusing namespace std;\nmutex m;\nint contor = 0;\nvoid incrementeaza() {\n    for (int i = 0; i < 1000; i++) {\n        lock_guard<mutex> g(m);\n        contor++;\n    }\n}\nint main() {\n    vector<thread> threads;\n    for (int i = 0; i < 4; i++) threads.emplace_back(incrementeaza);\n    for (auto& t : threads) t.join();\n    cout << contor << endl;\n    return 0;\n}\n",
      expectedOutput: "4000",
      language: "cpp"
    },
    {
      difficulty: "medium", name: "std::async",
      question: "Calculează suma 1..100 asincron cu std::async:\n```\n5050\n```",
      starterCode: "#include <iostream>\n#include <future>\nusing namespace std;\nint calculeaza() {\n    int s = 0;\n    for (int i = 1; i <= 100; i++) s += i;\n    return s;\n}\nint main() {\n    auto fut = async(launch::async, calculeaza);\n    cout << fut.get() << endl;\n    return 0;\n}\n",
      expectedOutput: "5050",
      language: "cpp"
    },
    {
      difficulty: "hard", name: "Producer-Consumer cu condition_variable",
      question: "Producer pune 3 valori, consumer le preia și afișează suma:\n```\n6\n```",
      starterCode: "#include <iostream>\n#include <thread>\n#include <mutex>\n#include <condition_variable>\n#include <queue>\nusing namespace std;\nqueue<int> q;\nmutex m;\ncondition_variable cv;\nbool done = false;\nvoid producer() {\n    for (int i = 1; i <= 3; i++) {\n        lock_guard<mutex> g(m);\n        q.push(i);\n        cv.notify_one();\n    }\n    { lock_guard<mutex> g(m); done = true; }\n    cv.notify_all();\n}\nint main() {\n    thread prod(producer);\n    int suma = 0;\n    while (true) {\n        unique_lock<mutex> lk(m);\n        cv.wait(lk, []{ return !q.empty() || done; });\n        while (!q.empty()) { suma += q.front(); q.pop(); }\n        if (done && q.empty()) break;\n    }\n    prod.join();\n    cout << suma << endl;\n    return 0;\n}\n",
      expectedOutput: "6",
      language: "cpp"
    },
  ]
};

// ══════════════════════════════════════════════════════════════
// JAVA TOPICS
// ══════════════════════════════════════════════════════════════

TOPICS["java::intro"] = {
  fillblanks: [
    {
      difficulty: "easy", name: "System.out.println",
      question: "Completează pentru afișare în Java:\n```java\n___.out.println(\"Hello!\");\n```",
      answer: "System",
      explanation: "System.out.println() este metoda standard pentru afișare în Java."
    },
    {
      difficulty: "easy", name: "Main method",
      question: "Completează semnătura metodei principale Java:\n```java\npublic static ___ main(String[] args) {}\n```",
      answer: "void",
      explanation: "main() returnează void — punctul de intrare al oricărei aplicații Java."
    },
    {
      difficulty: "medium", name: "String concatenare",
      question: "Completează operatorul de concatenare string:\n```java\nString s = \"Hello\" ___ \" World\";\n```",
      answer: "+",
      explanation: "+ concatenează stringuri în Java; pentru performanță repetată, folosește StringBuilder."
    },
    {
      difficulty: "medium", name: "Integer.parseInt",
      question: "Completează metoda pentru conversie String→int:\n```java\nint n = Integer.___(\"42\");\n```",
      answer: "parseInt",
      explanation: "Integer.parseInt() convertește un String la int; aruncă NumberFormatException la input invalid."
    },
    {
      difficulty: "hard", name: "String immutability",
      question: "Ce se întâmplă cu string-ul original la `s = s + \"!\"` în Java?\n(a) se modifică in-place  (b) se creează un nou obiect  (c) eroare\nRăspuns: `___`",
      answer: "b",
      explanation: "String este imutabil în Java — orice modificare creează un nou obiect; originalul rămâne nemodificat."
    },
  ],
  codings: [
    {
      difficulty: "easy", name: "Hello World Java",
      question: "Afișează exact:\n```\nHello, World!\n```",
      starterCode: "public class Main {\n    public static void main(String[] args) {\n        // TODO\n    }\n}\n",
      expectedOutput: "Hello, World!",
      language: "java"
    },
    {
      difficulty: "easy", name: "Sumă și produs",
      question: "Afișează suma și produsul lui a=6 și b=7:\n```\n13\n42\n```",
      starterCode: "public class Main {\n    public static void main(String[] args) {\n        int a = 6, b = 7;\n        // TODO: afișează suma pe linie 1, produsul pe linie 2\n    }\n}\n",
      expectedOutput: "13\n42",
      language: "java"
    },
    {
      difficulty: "medium", name: "FizzBuzz",
      question: "FizzBuzz pentru 1-15:\n```\n1 2 Fizz 4 Buzz Fizz 7 8 Fizz Buzz 11 Fizz 13 14 FizzBuzz\n```",
      starterCode: "public class Main {\n    public static void main(String[] args) {\n        StringBuilder sb = new StringBuilder();\n        for (int i = 1; i <= 15; i++) {\n            // TODO: FizzBuzz logic\n        }\n        System.out.println(sb.toString().trim());\n    }\n}\n",
      expectedOutput: "1 2 Fizz 4 Buzz Fizz 7 8 Fizz Buzz 11 Fizz 13 14 FizzBuzz",
      language: "java"
    },
    {
      difficulty: "medium", name: "Recursivitate factoriala",
      question: "Calculează 7! recursiv:\n```\n5040\n```",
      starterCode: "public class Main {\n    static int fact(int n) {\n        // TODO: recursiv\n    }\n    public static void main(String[] args) {\n        System.out.println(fact(7));\n    }\n}\n",
      expectedOutput: "5040",
      language: "java"
    },
    {
      difficulty: "hard", name: "StringBuilder performanta",
      question: "Construiește string-ul \"0,1,2,...,99\" eficient cu StringBuilder:\n```\n0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99\n```",
      starterCode: "public class Main {\n    public static void main(String[] args) {\n        StringBuilder sb = new StringBuilder();\n        for (int i = 0; i < 100; i++) {\n            // TODO: adaugă i și virgulă (nu la final)\n        }\n        System.out.println(sb.toString());\n    }\n}\n",
      expectedOutput: "0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99",
      language: "java"
    },
  ]
};

TOPICS["java::oop"] = {
  fillblanks: [
    {
      difficulty: "easy", name: "Constructor Java",
      question: "Completează constructorul clasei Masina:\n```java\nclass Masina {\n    String marca;\n    ___(String marca) {\n        this.marca = marca;\n    }\n}\n```",
      answer: "Masina",
      explanation: "Constructorul are același nume cu clasa și nu are tip de returnare."
    },
    {
      difficulty: "easy", name: "Accesori",
      question: "Completează prefixul metodei getter pentru `marca`:\n```java\npublic String ___Marca() { return marca; }\n```",
      answer: "get",
      explanation: "Convenția JavaBeans: getter = getMarca(), setter = setMarca()."
    },
    {
      difficulty: "medium", name: "toString override",
      question: "Completează adnotarea pentru suprascriere corectă:\n```java\n___\n@Override\npublic String toString() { return \"Masina(\" + marca + \")\"; }\n```",
      answer: "@Override",
      explanation: "@Override verifică la compilare că metoda suprascrie cu adevărat una din clasa părinte."
    },
    {
      difficulty: "medium", name: "Encapsulare",
      question: "Completează modificatorul de acces pentru a ascunde implementarea:\n```java\nclass BancaCont {\n    ___ double sold; // nu accesibil din exterior\n}\n```",
      answer: "private",
      explanation: "private restricționează accesul la clasa curentă — fundamentul encapsulării OOP."
    },
    {
      difficulty: "hard", name: "equals și hashCode",
      question: "De ce trebuie implementate AMBELE `equals()` și `hashCode()`?\n(a) convenție  (b) contractul Object: obiecte egale trebuie să aibă hashCode egal\n(c) pentru performanță\nRăspuns: `___`",
      answer: "b",
      explanation: "Contractul Java: dacă a.equals(b) atunci a.hashCode() == b.hashCode() — necesar pentru HashMap/HashSet."
    },
  ],
  codings: [
    {
      difficulty: "easy", name: "Clasă Persoana",
      question: "Clasă Persoana cu nume+vârstă, toString(), afișează:\n```\nAna, 25\n```",
      starterCode: "public class Main {\n    static class Persoana {\n        String nume;\n        int varsta;\n        Persoana(String n, int v) { this.nume=n; this.varsta=v; }\n        // TODO: toString() -> \"<nume>, <varsta>\"\n        public String toString() { return nume + \", \" + varsta; }\n    }\n    public static void main(String[] args) {\n        System.out.println(new Persoana(\"Ana\", 25));\n    }\n}\n",
      expectedOutput: "Ana, 25",
      language: "java"
    },
    {
      difficulty: "easy", name: "Cont bancar",
      question: "Cont cu sold, depune(100), retrage(30), afișează sold:\n```\n170\n```",
      starterCode: "public class Main {\n    static class Cont {\n        private double sold;\n        Cont(double sold) { this.sold = sold; }\n        void depune(double suma) { sold += suma; }\n        void retrage(double suma) { if (suma <= sold) sold -= suma; }\n        double getSold() { return sold; }\n    }\n    public static void main(String[] args) {\n        Cont c = new Cont(100);\n        c.depune(100);\n        c.retrage(30);\n        System.out.println((int)c.getSold());\n    }\n}\n",
      expectedOutput: "170",
      language: "java"
    },
    {
      difficulty: "medium", name: "equals și hashCode",
      question: "Implementează equals pentru Punct(x,y), compară 2 puncte egale:\n```\ntrue\nfalse\n```",
      starterCode: "import java.util.Objects;\npublic class Main {\n    static class Punct {\n        int x, y;\n        Punct(int x, int y) { this.x=x; this.y=y; }\n        @Override\n        public boolean equals(Object o) {\n            if (this == o) return true;\n            if (!(o instanceof Punct)) return false;\n            Punct p = (Punct) o;\n            return x == p.x && y == p.y;\n        }\n        @Override public int hashCode() { return Objects.hash(x, y); }\n    }\n    public static void main(String[] args) {\n        System.out.println(new Punct(1,2).equals(new Punct(1,2)));\n        System.out.println(new Punct(1,2).equals(new Punct(3,4)));\n    }\n}\n",
      expectedOutput: "true\nfalse",
      language: "java"
    },
    {
      difficulty: "medium", name: "Builder pattern",
      question: "Builder pentru Persoana(nume, varsta, email), afișează:\n```\nAna, 25, ana@mail.com\n```",
      starterCode: "public class Main {\n    static class Persoana {\n        String nume, email; int varsta;\n        static class Builder {\n            String nume, email; int varsta;\n            Builder nume(String n) { this.nume=n; return this; }\n            Builder varsta(int v) { this.varsta=v; return this; }\n            Builder email(String e) { this.email=e; return this; }\n            Persoana build() { Persoana p=new Persoana(); p.nume=nume; p.varsta=varsta; p.email=email; return p; }\n        }\n        public String toString() { return nume+\", \"+varsta+\", \"+email; }\n    }\n    public static void main(String[] args) {\n        Persoana p = new Persoana.Builder()\n            .nume(\"Ana\").varsta(25).email(\"ana@mail.com\").build();\n        System.out.println(p);\n    }\n}\n",
      expectedOutput: "Ana, 25, ana@mail.com",
      language: "java"
    },
    {
      difficulty: "hard", name: "Singleton thread-safe",
      question: "Implementează Singleton cu double-checked locking, afișează:\n```\ntrue\n```",
      starterCode: "public class Main {\n    static class Singleton {\n        private static volatile Singleton instance;\n        private Singleton() {}\n        static Singleton getInstance() {\n            if (instance == null) {\n                synchronized (Singleton.class) {\n                    if (instance == null)\n                        instance = new Singleton();\n                }\n            }\n            return instance;\n        }\n    }\n    public static void main(String[] args) {\n        System.out.println(Singleton.getInstance() == Singleton.getInstance());\n    }\n}\n",
      expectedOutput: "true",
      language: "java"
    },
  ]
};

TOPICS["java::mostenire"] = {
  fillblanks: [
    {
      difficulty: "easy", name: "Extends",
      question: "Completează pentru moștenire în Java:\n```java\nclass Caine ___ Animal {}\n```",
      answer: "extends",
      explanation: "extends realizează moștenirea în Java — o clasă poate extinde o singură clasă."
    },
    {
      difficulty: "easy", name: "Implements interface",
      question: "Completează pentru a implementa o interfață:\n```java\nclass Cerc ___ Forma {\n    public double arie() { return Math.PI * r * r; }\n}\n```",
      answer: "implements",
      explanation: "implements leagă o clasă de o interfață — toate metodele abstracte trebuie implementate."
    },
    {
      difficulty: "medium", name: "Super constructor",
      question: "Completează apelul constructorului părintelui:\n```java\nclass Caine extends Animal {\n    Caine(String n) { ___(n); }\n}\n```",
      answer: "super",
      explanation: "super() apelează constructorul clasei părinte — obligatoriu pe prima linie dacă nu e implicit."
    },
    {
      difficulty: "medium", name: "Abstract method",
      question: "Completează pentru a declara o metodă abstractă:\n```java\n___ class Forma {\n    public abstract double arie();\n}\n```",
      answer: "abstract",
      explanation: "O clasă cu metode abstract trebuie declarată abstract — nu poate fi instanțiată direct."
    },
    {
      difficulty: "hard", name: "Interface default method",
      question: "Completează cuvântul cheie pentru metoda cu implementare în interfață (Java 8+):\n```java\ninterface Printabil {\n    ___ void printInfo() { System.out.println(\"info\"); }\n}\n```",
      answer: "default",
      explanation: "default (Java 8+) permite metode cu implementare în interfețe — backward compatibility."
    },
  ],
  codings: [
    {
      difficulty: "easy", name: "Moștenire simplă",
      question: "Caine extends Animal, suprascrie sunet() cu 'Ham!':\n```\nHam!\n```",
      starterCode: "public class Main {\n    static abstract class Animal {\n        abstract String sunet();\n    }\n    static class Caine extends Animal {\n        // TODO: suprascrie sunet()\n        String sunet() { return \"Ham!\"; }\n    }\n    public static void main(String[] args) {\n        System.out.println(new Caine().sunet());\n    }\n}\n",
      expectedOutput: "Ham!",
      language: "java"
    },
    {
      difficulty: "easy", name: "Interfata Forma",
      question: "Interfata Forma cu arie(); Cerc(r=5) o implementează:\n```\n78.54\n```",
      starterCode: "public class Main {\n    interface Forma { double arie(); }\n    static class Cerc implements Forma {\n        double r;\n        Cerc(double r) { this.r = r; }\n        public double arie() { return Math.round(Math.PI * r * r * 100.0) / 100.0; }\n    }\n    public static void main(String[] args) {\n        System.out.println(new Cerc(5).arie());\n    }\n}\n",
      expectedOutput: "78.54",
      language: "java"
    },
    {
      difficulty: "medium", name: "Polimorfism runtime",
      question: "Afișează sunetul fiecărui animal prin referință Animal:\n```\nMiau\nHam\nCucu\n```",
      starterCode: "public class Main {\n    static abstract class Animal { abstract String sunet(); }\n    static class Pisica extends Animal { String sunet() { return \"Miau\"; } }\n    static class Caine extends Animal { String sunet() { return \"Ham\"; } }\n    static class Cucuvea extends Animal { String sunet() { return \"Cucu\"; } }\n    public static void main(String[] args) {\n        Animal[] animale = {new Pisica(), new Caine(), new Cucuvea()};\n        for (Animal a : animale) System.out.println(a.sunet());\n    }\n}\n",
      expectedOutput: "Miau\nHam\nCucu",
      language: "java"
    },
    {
      difficulty: "medium", name: "Interfete multiple",
      question: "Robot implementează Mobil și Vorbitor, afișează ambele acțiuni:\n```\nma misc\nvorbesc\n```",
      starterCode: "public class Main {\n    interface Mobil { String miscare(); }\n    interface Vorbitor { String vorbire(); }\n    static class Robot implements Mobil, Vorbitor {\n        public String miscare() { return \"ma misc\"; }\n        public String vorbire() { return \"vorbesc\"; }\n    }\n    public static void main(String[] args) {\n        Robot r = new Robot();\n        System.out.println(r.miscare());\n        System.out.println(r.vorbire());\n    }\n}\n",
      expectedOutput: "ma misc\nvorbesc",
      language: "java"
    },
    {
      difficulty: "hard", name: "Sealed classes Java 17",
      question: "Sealed class Forma cu permitted Cerc/Drept, pattern matching:\n```\nCerc r=5\nDreptunghi 4x3\n```",
      starterCode: "public class Main {\n    sealed interface Forma permits Cerc, Dreptunghi {}\n    record Cerc(double r) implements Forma {}\n    record Dreptunghi(double l, double h) implements Forma {}\n    static String descrie(Forma f) {\n        return switch (f) {\n            case Cerc c -> \"Cerc r=\" + (int)c.r();\n            case Dreptunghi d -> \"Dreptunghi \" + (int)d.l() + \"x\" + (int)d.h();\n        };\n    }\n    public static void main(String[] args) {\n        System.out.println(descrie(new Cerc(5)));\n        System.out.println(descrie(new Dreptunghi(4, 3)));\n    }\n}\n",
      expectedOutput: "Cerc r=5\nDreptunghi 4x3",
      language: "java"
    },
  ]
};

TOPICS["java::colectii"] = {
  fillblanks: [
    {
      difficulty: "easy", name: "ArrayList add",
      question: "Completează pentru a adăuga un element la ArrayList:\n```java\nList<String> list = new ArrayList<>();\nlist.___( \"Ana\");\n```",
      answer: "add",
      explanation: "add() adaugă un element la finalul ArrayList."
    },
    {
      difficulty: "easy", name: "HashMap put",
      question: "Completează pentru a insera în HashMap:\n```java\nMap<String,Integer> m = new HashMap<>();\nm.___(\"varsta\", 25);\n```",
      answer: "put",
      explanation: "put(key, value) inserează sau actualizează o intrare în HashMap."
    },
    {
      difficulty: "medium", name: "getOrDefault",
      question: "Completează pentru a returna 0 dacă cheia lipsește:\n```java\nint v = m.___(\"necunoscut\", 0);\n```",
      answer: "getOrDefault",
      explanation: "getOrDefault(key, default) returnează valoarea sau default-ul dacă cheia nu există."
    },
    {
      difficulty: "medium", name: "Collections.sort",
      question: "Completează metoda pentru sortarea listei:\n```java\nCollections.___(lista);\n```",
      answer: "sort",
      explanation: "Collections.sort() sortează o List in-place; necesită elemente Comparable."
    },
    {
      difficulty: "hard", name: "ConcurrentHashMap",
      question: "De ce preferăm ConcurrentHashMap față de synchronized HashMap în multi-threading?\n(a) mai simplu  (b) segment-level locking — performanță superioară\n(c) nu e nicio diferență\nRăspuns: `___`",
      answer: "b",
      explanation: "ConcurrentHashMap împarte harta în segmente, permițând write concurent în segmente diferite."
    },
  ],
  codings: [
    {
      difficulty: "easy", name: "ArrayList iterare",
      question: "Creează ArrayList {1,2,3,4,5}, afișează suma:\n```\n15\n```",
      starterCode: "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        List<Integer> list = new ArrayList<>(Arrays.asList(1,2,3,4,5));\n        int suma = 0;\n        for (int x : list) suma += x;\n        System.out.println(suma);\n    }\n}\n",
      expectedOutput: "15",
      language: "java"
    },
    {
      difficulty: "easy", name: "HashMap frecvente",
      question: "Numără frecvența char-urilor din \"aababc\", afișează sorted:\n```\na: 3\nb: 2\nc: 1\n```",
      starterCode: "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Map<Character, Integer> freq = new TreeMap<>();\n        for (char c : \"aababc\".toCharArray())\n            freq.merge(c, 1, Integer::sum);\n        freq.forEach((k, v) -> System.out.println(k + \": \" + v));\n    }\n}\n",
      expectedOutput: "a: 3\nb: 2\nc: 1",
      language: "java"
    },
    {
      difficulty: "medium", name: "Stack cu Deque",
      question: "Folosește ArrayDeque ca stivă, push 1-3, pop și afișează:\n```\n3\n2\n1\n```",
      starterCode: "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Deque<Integer> stiva = new ArrayDeque<>();\n        stiva.push(1); stiva.push(2); stiva.push(3);\n        while (!stiva.isEmpty())\n            System.out.println(stiva.pop());\n    }\n}\n",
      expectedOutput: "3\n2\n1",
      language: "java"
    },
    {
      difficulty: "medium", name: "Grupare cu Map",
      question: "Grupează {\"Ana\",\"Ion\",\"Al\",...} după prima literă:\n```\nA: [Al, Ana]\nI: [Ion]\n```",
      starterCode: "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        List<String> names = Arrays.asList(\"Ana\", \"Ion\", \"Al\");\n        Map<Character, List<String>> grup = new TreeMap<>();\n        for (String n : names)\n            grup.computeIfAbsent(n.charAt(0), k -> new ArrayList<>()).add(n);\n        grup.forEach((k, v) -> { Collections.sort(v); System.out.println(k + \": \" + v); });\n    }\n}\n",
      expectedOutput: "A: [Al, Ana]\nI: [Ion]",
      language: "java"
    },
    {
      difficulty: "hard", name: "PriorityQueue custom",
      question: "PriorityQueue cu comparator după lungime string, afișează top-2:\n```\nar\nabc\n```",
      starterCode: "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        PriorityQueue<String> pq = new PriorityQueue<>(Comparator.comparingInt(String::length));\n        pq.addAll(Arrays.asList(\"banana\", \"ar\", \"kiwi\", \"abc\"));\n        System.out.println(pq.poll());\n        System.out.println(pq.poll());\n    }\n}\n",
      expectedOutput: "ar\nabc",
      language: "java"
    },
  ]
};

TOPICS["java::streams"] = {
  fillblanks: [
    {
      difficulty: "easy", name: "Stream filter",
      question: "Completează metoda pentru filtrarea elementelor pare:\n```java\nlist.stream()\n    .___(n -> n % 2 == 0)\n    .forEach(System.out::println);\n```",
      answer: "filter",
      explanation: "filter() reține doar elementele care satisfac predicatul dat."
    },
    {
      difficulty: "easy", name: "Stream map",
      question: "Completează pentru a transforma fiecare element:\n```java\nlist.stream()\n    .___(n -> n * n) // ridică la pătrat\n    .collect(Collectors.toList());\n```",
      answer: "map",
      explanation: "map() transformă fiecare element al stream-ului prin funcția dată."
    },
    {
      difficulty: "medium", name: "Stream collect",
      question: "Completează pentru a colecta într-o listă:\n```java\nList<Integer> result = stream\n    .___(Collectors.toList());\n```",
      answer: "collect",
      explanation: "collect() este o operație terminală care adună elementele stream-ului într-o colecție."
    },
    {
      difficulty: "medium", name: "Reduce",
      question: "Completează pentru a calcula suma cu reduce:\n```java\nint suma = list.stream()\n    .___(0, Integer::sum);\n```",
      answer: "reduce",
      explanation: "reduce(identity, accumulator) combină elementele stream-ului într-o singură valoare."
    },
    {
      difficulty: "hard", name: "Collectors.groupingBy",
      question: "Completează pentru a grupa angajații după departament:\n```java\nMap<String, List<Angajat>> gr = angajati.stream()\n    .collect(Collectors.___(Angajat::getDept));\n```",
      answer: "groupingBy",
      explanation: "groupingBy() grupează elementele după o funcție de clasificare — returnează Map<K, List<T>>."
    },
  ],
  codings: [
    {
      difficulty: "easy", name: "Filter și count",
      question: "Numără elementele > 5 din {1,3,7,9,2,8}:\n```\n3\n```",
      starterCode: "import java.util.*;\nimport java.util.stream.*;\npublic class Main {\n    public static void main(String[] args) {\n        List<Integer> v = Arrays.asList(1,3,7,9,2,8);\n        long count = v.stream().filter(n -> n > 5).count();\n        System.out.println(count);\n    }\n}\n",
      expectedOutput: "3",
      language: "java"
    },
    {
      difficulty: "easy", name: "Map și join",
      question: "Transformă numele în uppercase și unele cu virgulă:\n```\nANA,ION,MARIA\n```",
      starterCode: "import java.util.*;\nimport java.util.stream.*;\npublic class Main {\n    public static void main(String[] args) {\n        List<String> names = Arrays.asList(\"ana\", \"ion\", \"maria\");\n        String result = names.stream()\n            .map(String::toUpperCase)\n            .collect(Collectors.joining(\",\"));\n        System.out.println(result);\n    }\n}\n",
      expectedOutput: "ANA,ION,MARIA",
      language: "java"
    },
    {
      difficulty: "medium", name: "FlatMap",
      question: "Aplatizează List<List<Integer>> la o listă, afișează suma:\n```\n21\n```",
      starterCode: "import java.util.*;\nimport java.util.stream.*;\npublic class Main {\n    public static void main(String[] args) {\n        List<List<Integer>> nested = Arrays.asList(\n            Arrays.asList(1,2,3), Arrays.asList(4,5,6));\n        int suma = nested.stream()\n            .flatMap(Collection::stream)\n            .mapToInt(Integer::intValue)\n            .sum();\n        System.out.println(suma);\n    }\n}\n",
      expectedOutput: "21",
      language: "java"
    },
    {
      difficulty: "medium", name: "Collectors groupingBy",
      question: "Grupează {\"Ana\",\"Al\",\"Ion\"} după prima literă, afișează sorted:\n```\nA=[Al, Ana]\nI=[Ion]\n```",
      starterCode: "import java.util.*;\nimport java.util.stream.*;\npublic class Main {\n    public static void main(String[] args) {\n        List<String> names = Arrays.asList(\"Ana\", \"Al\", \"Ion\");\n        Map<Character, List<String>> g = names.stream()\n            .collect(Collectors.groupingBy(s -> s.charAt(0), TreeMap::new, Collectors.toList()));\n        g.forEach((k, v) -> { Collections.sort(v); System.out.println(k + \"=\" + v); });\n    }\n}\n",
      expectedOutput: "A=[Al, Ana]\nI=[Ion]",
      language: "java"
    },
    {
      difficulty: "hard", name: "Parallel stream",
      question: "Calculează suma pătratelor 1..100 cu parallel stream:\n```\n338350\n```",
      starterCode: "import java.util.stream.*;\npublic class Main {\n    public static void main(String[] args) {\n        long suma = LongStream.rangeClosed(1, 100)\n            .parallel()\n            .map(n -> n * n)\n            .sum();\n        System.out.println(suma);\n    }\n}\n",
      expectedOutput: "338350",
      language: "java"
    },
  ]
};

TOPICS["java::exceptii"] = {
  fillblanks: [
    {
      difficulty: "easy", name: "Try-catch",
      question: "Completează blocul care prinde excepția:\n```java\ntry {\n    int r = 10 / 0;\n} ___ (ArithmeticException e) {\n    System.out.println(e.getMessage());\n}\n```",
      answer: "catch",
      explanation: "catch prinde excepțiile aruncate în blocul try."
    },
    {
      difficulty: "easy", name: "Finally",
      question: "Completează cuvântul cheie pentru blocul care rulează mereu:\n```java\ntry { ... }\ncatch (Exception e) { ... }\n___ { conexiune.close(); }\n```",
      answer: "finally",
      explanation: "finally rulează mereu — fie că s-a aruncat excepție sau nu."
    },
    {
      difficulty: "medium", name: "Throws declaratie",
      question: "Completează declarația că metoda poate arunca IOException:\n```java\nvoid citeste() ___ IOException {\n    // ...\n}\n```",
      answer: "throws",
      explanation: "throws declară că o metodă poate arunca excepții checked — apelantul trebuie să le gestioneze."
    },
    {
      difficulty: "medium", name: "Custom exception",
      question: "Completează pentru a crea o excepție custom checked:\n```java\nclass VarstaNegativa ___ Exception {\n    VarstaNegativa(String msg) { super(msg); }\n}\n```",
      answer: "extends",
      explanation: "O excepție custom extends Exception (checked) sau RuntimeException (unchecked)."
    },
    {
      difficulty: "hard", name: "Try-with-resources",
      question: "Completează pentru auto-închidere resursă (Java 7+):\n```java\ntry (___ BufferedReader br = new BufferedReader(...)) {\n    // br se închide automat\n}\n```",
      answer: "final",
      explanation: "try-with-resources închide automat resursele AutoCloseable la ieșire — nu mai e nevoie de finally."
    },
  ],
  codings: [
    {
      difficulty: "easy", name: "Catch ArithmeticException",
      question: "Prinde împărțirea la zero și afișează:\n```\n/ by zero\n```",
      starterCode: "public class Main {\n    public static void main(String[] args) {\n        try {\n            int r = 10 / 0;\n        } catch (ArithmeticException e) {\n            System.out.println(e.getMessage());\n        }\n    }\n}\n",
      expectedOutput: "/ by zero",
      language: "java"
    },
    {
      difficulty: "easy", name: "Multiple exceptions",
      question: "Prinde NumberFormatException la parseInt invalid:\n```\nFormat invalid\n```",
      starterCode: "public class Main {\n    public static void main(String[] args) {\n        try {\n            int n = Integer.parseInt(\"abc\");\n        } catch (NumberFormatException e) {\n            System.out.println(\"Format invalid\");\n        }\n    }\n}\n",
      expectedOutput: "Format invalid",
      language: "java"
    },
    {
      difficulty: "medium", name: "Custom exception",
      question: "Aruncă VarstaNegativa dacă varsta<0, prinde și afișează:\n```\nVarsta nu poate fi negativa: -5\n```",
      starterCode: "public class Main {\n    static class VarstaNegativa extends RuntimeException {\n        VarstaNegativa(int v) { super(\"Varsta nu poate fi negativa: \" + v); }\n    }\n    static void setVarsta(int v) {\n        if (v < 0) throw new VarstaNegativa(v);\n    }\n    public static void main(String[] args) {\n        try { setVarsta(-5); }\n        catch (VarstaNegativa e) { System.out.println(e.getMessage()); }\n    }\n}\n",
      expectedOutput: "Varsta nu poate fi negativa: -5",
      language: "java"
    },
    {
      difficulty: "medium", name: "Finally garantat",
      question: "Demonstrează că finally rulează chiar și cu return în try:\n```\nFinally rulat\n10\n```",
      starterCode: "public class Main {\n    static int test() {\n        try { return 10; }\n        finally { System.out.println(\"Finally rulat\"); }\n    }\n    public static void main(String[] args) {\n        System.out.println(test());\n    }\n}\n",
      expectedOutput: "Finally rulat\n10",
      language: "java"
    },
    {
      difficulty: "hard", name: "Exception chaining",
      question: "Înlănțuiește excepțiile (cause), afișează cauza originală:\n```\nCauza: Eroare DB\n```",
      starterCode: "public class Main {\n    static class ServiceException extends RuntimeException {\n        ServiceException(String msg, Throwable cause) { super(msg, cause); }\n    }\n    static void db() { throw new RuntimeException(\"Eroare DB\"); }\n    static void service() {\n        try { db(); }\n        catch (RuntimeException e) { throw new ServiceException(\"Service down\", e); }\n    }\n    public static void main(String[] args) {\n        try { service(); }\n        catch (ServiceException e) {\n            System.out.println(\"Cauza: \" + e.getCause().getMessage());\n        }\n    }\n}\n",
      expectedOutput: "Cauza: Eroare DB",
      language: "java"
    },
  ]
};

TOPICS["java::spring"] = {
  fillblanks: [
    {
      difficulty: "easy", name: "RestController",
      question: "Completează adnotarea pentru controller REST Spring:\n```java\n@___\npublic class UserController {}\n```",
      answer: "RestController",
      explanation: "@RestController combină @Controller și @ResponseBody — fiecare metodă returnează JSON direct."
    },
    {
      difficulty: "easy", name: "GetMapping",
      question: "Completează adnotarea pentru endpoint GET /users:\n```java\n@___(\" /users\")\npublic List<User> getAll() { return service.findAll(); }\n```",
      answer: "GetMapping",
      explanation: "@GetMapping mapează requesturi HTTP GET pe metoda annotată."
    },
    {
      difficulty: "medium", name: "Autowired",
      question: "Completează pentru injectarea dependenței prin constructor:\n```java\n@RestController\npublic class Ctrl {\n    private final Service svc;\n    ___ // Spring injectează automat\n    public Ctrl(Service svc) { this.svc = svc; }\n}\n```",
      answer: "@Autowired",
      explanation: "@Autowired (opțional pe constructor unic în Spring) injectează bean-ul compatibil din context."
    },
    {
      difficulty: "medium", name: "JPA Repository",
      question: "Completează interfața pentru repository JPA:\n```java\ninterface UserRepo ___ JpaRepository<User, Long> {}\n```",
      answer: "extends",
      explanation: "JpaRepository<T, ID> furnizează CRUD complet + paginare fără implementare manuală."
    },
    {
      difficulty: "hard", name: "Transactional",
      question: "Completează adnotarea pentru a executa metodele în aceeași tranzacție DB:\n```java\n@___\npublic void transfer(long from, long to, double sum) {\n    // debit + credit în aceeași tranzacție atomică\n}\n```",
      answer: "Transactional",
      explanation: "@Transactional garantează că toate operațiile DB din metodă sunt atomice — rollback la excepție."
    },
  ],
  codings: [
    {
      difficulty: "easy", name: "Bean Spring simplu",
      question: "Creează un @Service Greeter cu metoda greet(name), afișează:\n```\nHello, Ana!\n```",
      starterCode: "// Simulare Spring context\npublic class Main {\n    static class Greeter {\n        String greet(String name) {\n            return \"Hello, \" + name + \"!\";\n        }\n    }\n    public static void main(String[] args) {\n        Greeter g = new Greeter();\n        System.out.println(g.greet(\"Ana\"));\n    }\n}\n",
      expectedOutput: "Hello, Ana!",
      language: "java"
    },
    {
      difficulty: "easy", name: "ResponseEntity",
      question: "Construiește ResponseEntity cu status 200 și body JSON-like:\n```\n200\n{name=Ana}\n```",
      starterCode: "// Simulare Spring ResponseEntity\npublic class Main {\n    static class ResponseEntity<T> {\n        int status; T body;\n        ResponseEntity(T b, int s) { body=b; status=s; }\n        static <T> ResponseEntity<T> ok(T b) { return new ResponseEntity<>(b,200); }\n        int getStatusCodeValue() { return status; }\n        T getBody() { return body; }\n    }\n    public static void main(String[] args) {\n        var resp = ResponseEntity.ok(java.util.Map.of(\"name\",\"Ana\"));\n        System.out.println(resp.getStatusCodeValue());\n        System.out.println(resp.getBody());\n    }\n}\n",
      expectedOutput: "200\n{name=Ana}",
      language: "java"
    },
    {
      difficulty: "medium", name: "DTO mapping",
      question: "Mapează User entity la UserDTO (fără password), afișează:\n```\nAna - ana@mail.com\n```",
      starterCode: "public class Main {\n    record User(String name, String email, String password) {}\n    record UserDTO(String name, String email) {}\n    static UserDTO toDTO(User u) {\n        return new UserDTO(u.name(), u.email());\n    }\n    public static void main(String[] args) {\n        User u = new User(\"Ana\", \"ana@mail.com\", \"secret\");\n        UserDTO dto = toDTO(u);\n        System.out.println(dto.name() + \" - \" + dto.email());\n    }\n}\n",
      expectedOutput: "Ana - ana@mail.com",
      language: "java"
    },
    {
      difficulty: "medium", name: "Service layer pattern",
      question: "Repository → Service → Controller flow, afișează:\n```\nUser: Ana (id=1)\n```",
      starterCode: "public class Main {\n    record User(long id, String name) {}\n    interface UserRepository { User findById(long id); }\n    static class UserService {\n        private final UserRepository repo;\n        UserService(UserRepository r) { repo = r; }\n        User getUser(long id) { return repo.findById(id); }\n    }\n    public static void main(String[] args) {\n        UserRepository repo = id -> new User(id, \"Ana\");\n        UserService svc = new UserService(repo);\n        User u = svc.getUser(1);\n        System.out.println(\"User: \" + u.name() + \" (id=\" + u.id() + \")\");\n    }\n}\n",
      expectedOutput: "User: Ana (id=1)",
      language: "java"
    },
    {
      difficulty: "hard", name: "Specification pattern",
      question: "Specification<Product> combinat cu and(), filtrează prețul și categoria:\n```\nLaptop\n```",
      starterCode: "import java.util.*;\nimport java.util.stream.*;\npublic class Main {\n    record Product(String name, double price, String category) {}\n    interface Spec { boolean test(Product p); }\n    static Spec priceBelow(double max) { return p -> p.price() < max; }\n    static Spec category(String cat) { return p -> p.category().equals(cat); }\n    static Spec and(Spec a, Spec b) { return p -> a.test(p) && b.test(p); }\n    public static void main(String[] args) {\n        List<Product> products = List.of(\n            new Product(\"Laptop\", 999, \"tech\"),\n            new Product(\"TV\", 1500, \"tech\"),\n            new Product(\"Carte\", 30, \"edu\"));\n        Spec spec = and(priceBelow(1000), category(\"tech\"));\n        products.stream().filter(spec::test)\n            .forEach(p -> System.out.println(p.name()));\n    }\n}\n",
      expectedOutput: "Laptop",
      language: "java"
    },
  ]
};

TOPICS["java::modern"] = {
  fillblanks: [
    {
      difficulty: "easy", name: "Record Java 16",
      question: "Completează cuvântul cheie pentru a declara un record imutabil:\n```java\n___ Punct(int x, int y) {}\n// auto: getteri, equals, hashCode, toString\n```",
      answer: "record",
      explanation: "record (Java 16) declară o clasă de date imutabilă cu componente, getteri, equals/hashCode/toString automate."
    },
    {
      difficulty: "easy", name: "Text block",
      question: "Completează delimitatorul pentru text block (Java 15+):\n```java\nString json = _____\n    {\"name\": \"Ana\"}\n    _____;\n```",
      answer: "\"\"\"",
      explanation: "Text blocks (Java 15) permit stringuri multilinie fără escaping — delimitate de \"\"\"."
    },
    {
      difficulty: "medium", name: "Switch expression",
      question: "Completează operatorul de returnare în switch expression (Java 14+):\n```java\nString ziua = switch(nr) {\n    case 1 ___ \"Luni\";\n    case 2 -> \"Marti\";\n    default -> \"Alta\";\n};\n```",
      answer: "->",
      explanation: "Switch expression cu -> (arrow) returnează o valoare direct — nu necesită break."
    },
    {
      difficulty: "medium", name: "Pattern matching instanceof",
      question: "Completează pentru pattern matching instanceof (Java 16+):\n```java\nif (obj ___ String s) {\n    System.out.println(s.length());\n}\n```",
      answer: "instanceof",
      explanation: "Pattern matching instanceof declară automat o variabilă tipizată — elimină castul explicit."
    },
    {
      difficulty: "hard", name: "Virtual Threads Java 21",
      question: "Completează factory method pentru virtual thread (Java 21):\n```java\nThread vt = Thread.ofVirtual().___( () -> System.out.println(\"vt\"));\nvt.start(); vt.join();\n```",
      answer: "unstarted",
      explanation: "Thread.ofVirtual().unstarted(task) creează un virtual thread fără să-l pornească — scalabil la milioane."
    },
  ],
  codings: [
    {
      difficulty: "easy", name: "Record imutabil",
      question: "Definește record Produs(name, pret), afișează:\n```\nLaptop: 999.0\n```",
      starterCode: "public class Main {\n    record Produs(String name, double pret) {}\n    public static void main(String[] args) {\n        Produs p = new Produs(\"Laptop\", 999);\n        System.out.println(p.name() + \": \" + p.pret());\n    }\n}\n",
      expectedOutput: "Laptop: 999.0",
      language: "java"
    },
    {
      difficulty: "easy", name: "Switch expression",
      question: "Returnează categoria vârstei cu switch expression:\n```\nAdult\n```",
      starterCode: "public class Main {\n    static String categorie(int v) {\n        return switch (v / 10) {\n            case 0, 1 -> \"Copil\";\n            case 2, 3, 4, 5 -> \"Adult\";\n            default -> \"Senior\";\n        };\n    }\n    public static void main(String[] args) {\n        System.out.println(categorie(25));\n    }\n}\n",
      expectedOutput: "Adult",
      language: "java"
    },
    {
      difficulty: "medium", name: "Sealed + pattern matching",
      question: "Calculează aria cu sealed interface și pattern matching:\n```\n50.27\n```",
      starterCode: "public class Main {\n    sealed interface Forma permits Cerc, Dreptunghi {}\n    record Cerc(double r) implements Forma {}\n    record Dreptunghi(double l, double h) implements Forma {}\n    static double arie(Forma f) {\n        return switch (f) {\n            case Cerc c -> Math.round(Math.PI * c.r() * c.r() * 100.0) / 100.0;\n            case Dreptunghi d -> d.l() * d.h();\n        };\n    }\n    public static void main(String[] args) {\n        System.out.println(arie(new Cerc(4)));\n    }\n}\n",
      expectedOutput: "50.27",
      language: "java"
    },
    {
      difficulty: "medium", name: "Optional chain",
      question: "Folosește Optional.map().orElse() pentru a evita NPE:\n```\nANA\nNECUNOSCUT\n```",
      starterCode: "import java.util.Optional;\npublic class Main {\n    static Optional<String> getNume(boolean exista) {\n        return exista ? Optional.of(\"ana\") : Optional.empty();\n    }\n    public static void main(String[] args) {\n        System.out.println(getNume(true).map(String::toUpperCase).orElse(\"NECUNOSCUT\"));\n        System.out.println(getNume(false).map(String::toUpperCase).orElse(\"NECUNOSCUT\"));\n    }\n}\n",
      expectedOutput: "ANA\nNECUNOSCUT",
      language: "java"
    },
    {
      difficulty: "hard", name: "CompletableFuture chain",
      question: "Lanț async: fetch→transform→afișează cu CompletableFuture:\n```\nHELLO WORLD\n```",
      starterCode: "import java.util.concurrent.CompletableFuture;\npublic class Main {\n    public static void main(String[] args) throws Exception {\n        String result = CompletableFuture\n            .supplyAsync(() -> \"hello world\")\n            .thenApply(String::toUpperCase)\n            .get();\n        System.out.println(result);\n    }\n}\n",
      expectedOutput: "HELLO WORLD",
      language: "java"
    },
  ]
};

// ══════════════════════════════════════════════════════════════
// C# TOPICS
// ══════════════════════════════════════════════════════════════

TOPICS["csharp::oop"] = {
  fillblanks: [
    {
      difficulty: "easy", name: "Property auto",
      question: "Completează pentru o proprietate auto-implementată:\n```csharp\npublic string Nume { get; ___ ; }\n```",
      answer: "set",
      explanation: "Proprietățile auto { get; set; } generează câmpul de backing automat."
    },
    {
      difficulty: "easy", name: "Constructor C#",
      question: "Completează constructorul clasei Masina:\n```csharp\npublic ___(string marca) {\n    Marca = marca;\n}\n```",
      answer: "Masina",
      explanation: "Constructorul are același nume cu clasa și inițializează proprietățile/câmpurile."
    },
    {
      difficulty: "medium", name: "Readonly property",
      question: "Completează pentru o proprietate read-only (doar getter):\n```csharp\npublic double Arie => largime * ___ ; // expression body\n```",
      answer: "inaltime",
      explanation: "=> (expression body) definește o proprietate read-only calculată."
    },
    {
      difficulty: "medium", name: "Object initializer",
      question: "Completează sintaxa inițializatorului de obiect C#:\n```csharp\nvar p = new Persoana ___ Nume = \"Ana\", Varsta = 25 ___;\n```",
      answer: "{",
      explanation: "Object initializers { Prop = val } permit inițializarea proprietăților fără constructori custom."
    },
    {
      difficulty: "hard", name: "Covariance generics",
      question: "Completează pentru a declara interfața IReadOnly<T> covariantă:\n```csharp\ninterface IReadOnly<___ T> {\n    T Get();\n}\n```",
      answer: "out",
      explanation: "out T declară covarianță — IReadOnly<Derived> poate fi folosit ca IReadOnly<Base>."
    },
  ],
  codings: [
    {
      difficulty: "easy", name: "Record C# 9",
      question: "Definește record Punct(X,Y) și afișează:\n```\nPunct { X = 3, Y = 4 }\n```",
      starterCode: "using System;\nrecord Punct(int X, int Y);\nclass Program {\n    static void Main() {\n        var p = new Punct(3, 4);\n        Console.WriteLine(p);\n    }\n}\n",
      expectedOutput: "Punct { X = 3, Y = 4 }",
      language: "csharp"
    },
    {
      difficulty: "easy", name: "Clasă cu proprietăți",
      question: "Clasă Persoana cu Nume, Varsta; afișează cu interpolation:\n```\nAna are 25 de ani\n```",
      starterCode: "using System;\nclass Persoana {\n    public string Nume { get; set; }\n    public int Varsta { get; set; }\n    public override string ToString() => $\"{Nume} are {Varsta} de ani\";\n}\nclass Program {\n    static void Main() {\n        var p = new Persoana { Nume = \"Ana\", Varsta = 25 };\n        Console.WriteLine(p);\n    }\n}\n",
      expectedOutput: "Ana are 25 de ani",
      language: "csharp"
    },
    {
      difficulty: "medium", name: "Operator overload C#",
      question: "Supraîncarcă + pentru Vector2D, afișează:\n```\n(4, 6)\n```",
      starterCode: "using System;\nstruct Vector2D {\n    public double X, Y;\n    public Vector2D(double x, double y) { X=x; Y=y; }\n    public static Vector2D operator +(Vector2D a, Vector2D b)\n        => new Vector2D(a.X+b.X, a.Y+b.Y);\n    public override string ToString() => $\"({X}, {Y})\";\n}\nclass Program {\n    static void Main() {\n        Console.WriteLine(new Vector2D(1,2) + new Vector2D(3,4));\n    }\n}\n",
      expectedOutput: "(4, 6)",
      language: "csharp"
    },
    {
      difficulty: "medium", name: "Pattern matching switch",
      question: "Calculează impozitul cu switch expression și pattern matching:\n```\n600\n```",
      starterCode: "using System;\nclass Program {\n    static double Impozit(object income) => income switch {\n        int n when n < 1000 => n * 0.1,\n        int n when n < 5000 => n * 0.2,\n        int n => n * 0.3,\n        _ => 0\n    };\n    static void Main() {\n        Console.WriteLine(Impozit(3000));\n    }\n}\n",
      expectedOutput: "600",
      language: "csharp"
    },
    {
      difficulty: "hard", name: "Generic constraint",
      question: "Funcție generică `Max<T>` cu constraint IComparable, returnează max(3,7):\n```\n7\n```",
      starterCode: "using System;\nclass Program {\n    static T Max<T>(T a, T b) where T : IComparable<T>\n        => a.CompareTo(b) >= 0 ? a : b;\n    static void Main() {\n        Console.WriteLine(Max(3, 7));\n    }\n}\n",
      expectedOutput: "7",
      language: "csharp"
    },
  ]
};

TOPICS["csharp::mostenire"] = {
  fillblanks: [
    {
      difficulty: "easy", name: "Moștenire C#",
      question: "Completează pentru a moșteni clasa Animal:\n```csharp\nclass Caine ___ Animal {\n    // ...\n}\n```",
      answer: ":",
      explanation: "Moștenirea în C# se realizează cu : BaseClass."
    },
    {
      difficulty: "easy", name: "Virtual override",
      question: "Completează marcatorul de suprascriere C#:\n```csharp\nclass Caine : Animal {\n    ___ void Vorbeste() { Console.WriteLine(\"Ham!\"); }\n}\n```",
      answer: "override",
      explanation: "override suprascrie o metodă virtual/abstract din clasa de bază."
    },
    {
      difficulty: "medium", name: "Abstract class",
      question: "Completează pentru a declara clasa și metoda abstractă:\n```csharp\n___ class Forma {\n    public abstract double Arie();\n}\n```",
      answer: "abstract",
      explanation: "abstract class nu poate fi instanțiată — forțează clasele derivate să implementeze metodele abstracte."
    },
    {
      difficulty: "medium", name: "Interface C#",
      question: "Completează pentru a implementa interfața IPrintabil:\n```csharp\nclass Document ___ IPrintabil {\n    public void Print() { Console.WriteLine(\"Imprimat\"); }\n}\n```",
      answer: ":",
      explanation: "Interfețele se implementează cu : IInterface — același simbol ca moștenirea."
    },
    {
      difficulty: "hard", name: "Explicit interface",
      question: "De ce se folosește implementarea explicită de interfață?\n(a) performanță  (b) rezolvarea conflictelor când 2 interfețe au aceeași metodă\n(c) securitate\nRăspuns: `___`",
      answer: "b",
      explanation: "Implementarea explicită (void IFoo.Method()) rezolvă conflictele de namen între interfețe."
    },
  ],
  codings: [
    {
      difficulty: "easy", name: "Polimorfism C#",
      question: "Pisica și Caine suprascriu Vorbeste(), afișează:\n```\nMiau!\nHam!\n```",
      starterCode: "using System;\nabstract class Animal { public abstract void Vorbeste(); }\nclass Pisica : Animal { public override void Vorbeste() => Console.WriteLine(\"Miau!\"); }\nclass Caine : Animal { public override void Vorbeste() => Console.WriteLine(\"Ham!\"); }\nclass Program {\n    static void Main() {\n        Animal[] a = { new Pisica(), new Caine() };\n        foreach (var x in a) x.Vorbeste();\n    }\n}\n",
      expectedOutput: "Miau!\nHam!",
      language: "csharp"
    },
    {
      difficulty: "easy", name: "Interfata IComparable",
      question: "Produs implementează IComparable după pret, sortează și afișează:\n```\nCarte: 30\nTelefon: 500\nLaptop: 999\n```",
      starterCode: "using System;\nusing System.Collections.Generic;\nclass Produs : IComparable<Produs> {\n    public string Nume; public double Pret;\n    public Produs(string n, double p) { Nume=n; Pret=p; }\n    public int CompareTo(Produs o) => Pret.CompareTo(o.Pret);\n    public override string ToString() => $\"{Nume}: {Pret}\";\n}\nclass Program {\n    static void Main() {\n        var lista = new List<Produs> {\n            new(\"Laptop\",999), new(\"Carte\",30), new(\"Telefon\",500) };\n        lista.Sort();\n        lista.ForEach(Console.WriteLine);\n    }\n}\n",
      expectedOutput: "Carte: 30\nTelefon: 500\nLaptop: 999",
      language: "csharp"
    },
    {
      difficulty: "medium", name: "Abstract factory",
      question: "Factory abstract pentru UI cross-platform, afișează:\n```\nWindows Button\nMac Button\n```",
      starterCode: "using System;\nabstract class UIFactory { public abstract string CreateButton(); }\nclass WindowsFactory : UIFactory { public override string CreateButton() => \"Windows Button\"; }\nclass MacFactory : UIFactory { public override string CreateButton() => \"Mac Button\"; }\nclass Program {\n    static void Render(UIFactory f) => Console.WriteLine(f.CreateButton());\n    static void Main() {\n        Render(new WindowsFactory());\n        Render(new MacFactory());\n    }\n}\n",
      expectedOutput: "Windows Button\nMac Button",
      language: "csharp"
    },
    {
      difficulty: "medium", name: "Default interface method",
      question: "IAnimal cu default Respira(), Caine suprascrie, afișează:\n```\nrespir\nrespir canin\n```",
      starterCode: "using System;\ninterface IAnimal {\n    string Sunet();\n    string Respira() => \"respir\"; // default\n}\nclass Animal : IAnimal {\n    public string Sunet() => \"...\";\n}\nclass Caine : IAnimal {\n    public string Sunet() => \"Ham\";\n    public string Respira() => \"respir canin\"; // override\n}\nclass Program {\n    static void Main() {\n        IAnimal a = new Animal();\n        IAnimal c = new Caine();\n        Console.WriteLine(a.Respira());\n        Console.WriteLine(c.Respira());\n    }\n}\n",
      expectedOutput: "respir\nrespir canin",
      language: "csharp"
    },
    {
      difficulty: "hard", name: "Covariance IEnumerable",
      question: "IEnumerable<Derived> asignat la IEnumerable<Base> (covariant):\n```\nbase\nbase\n```",
      starterCode: "using System;\nusing System.Collections.Generic;\nclass Base { public virtual string Info() => \"base\"; }\nclass Derived : Base { public override string Info() => \"derived\"; }\nclass Program {\n    static void PrintAll(IEnumerable<Base> items) {\n        foreach (var i in items) Console.WriteLine(\"base\");\n    }\n    static void Main() {\n        List<Derived> derivedList = new() { new Derived(), new Derived() };\n        PrintAll(derivedList); // covariance OK\n    }\n}\n",
      expectedOutput: "base\nbase",
      language: "csharp"
    },
  ]
};

TOPICS["csharp::colectii"] = {
  fillblanks: [
    {
      difficulty: "easy", name: "List<T> Add",
      question: "Completează pentru a adăuga elementul la Listă:\n```csharp\nvar lista = new List<int>();\nlista.___(42);\n```",
      answer: "Add",
      explanation: "Add() adaugă un element la finalul List<T>."
    },
    {
      difficulty: "easy", name: "Dictionary TryGetValue",
      question: "Completează metoda sigură de citire din Dictionary:\n```csharp\nif (dict.___(\"cheie\", out int val))\n    Console.WriteLine(val);\n```",
      answer: "TryGetValue",
      explanation: "TryGetValue returnează bool și populează out param — fără excepție la cheie lipsă."
    },
    {
      difficulty: "medium", name: "HashSet Contains",
      question: "Completează pentru verificarea existenței în HashSet:\n```csharp\nvar set = new HashSet<string> {\"ana\", \"ion\"};\nbool exista = set.___( \"ana\"); // true\n```",
      answer: "Contains",
      explanation: "HashSet.Contains() are complexitate O(1) — mult mai eficient decât List.Contains()."
    },
    {
      difficulty: "medium", name: "Queue Dequeue",
      question: "Completează pentru a extrage primul element din coadă:\n```csharp\nvar q = new Queue<int>();\nq.Enqueue(1); q.Enqueue(2);\nint primul = q.___(); // 1\n```",
      answer: "Dequeue",
      explanation: "Dequeue() extrage și returnează elementul din fața cozii (FIFO)."
    },
    {
      difficulty: "hard", name: "ImmutableList",
      question: "Completează namespace-ul pentru colecțiile imutabile:\n```csharp\nusing System.Collections.___;\nvar list = ImmutableList.Create(1,2,3);\n```",
      answer: "Immutable",
      explanation: "System.Collections.Immutable oferă structuri de date imutabile — thread-safe fără locking."
    },
  ],
  codings: [
    {
      difficulty: "easy", name: "LINQ pe List",
      question: "Filtrează numerele pare și afișează sorted:\n```\n2 4 6 8\n```",
      starterCode: "using System;\nusing System.Linq;\nusing System.Collections.Generic;\nclass Program {\n    static void Main() {\n        var numere = new List<int> {5,2,8,1,4,6,3};\n        var pare = numere.Where(n => n % 2 == 0).OrderBy(n => n);\n        Console.WriteLine(string.Join(\" \", pare));\n    }\n}\n",
      expectedOutput: "2 4 6 8",
      language: "csharp"
    },
    {
      difficulty: "easy", name: "Dictionary frecvente",
      question: "Numără frecvența char-urilor din \"abracadabra\":\n```\na: 5\nb: 2\nc: 1\nd: 1\nr: 2\n```",
      starterCode: "using System;\nusing System.Collections.Generic;\nclass Program {\n    static void Main() {\n        var freq = new SortedDictionary<char, int>();\n        foreach (char c in \"abracadabra\")\n            freq[c] = freq.GetValueOrDefault(c) + 1;\n        foreach (var kv in freq)\n            Console.WriteLine($\"{kv.Key}: {kv.Value}\");\n    }\n}\n",
      expectedOutput: "a: 5\nb: 2\nc: 1\nd: 1\nr: 2",
      language: "csharp"
    },
    {
      difficulty: "medium", name: "Stack inversare",
      question: "Inversează un string cu Stack<char>:\n```\nolleH\n```",
      starterCode: "using System;\nusing System.Collections.Generic;\nclass Program {\n    static string Inversa(string s) {\n        var st = new Stack<char>(s);\n        return new string(st.ToArray());\n    }\n    static void Main() {\n        Console.WriteLine(Inversa(\"Hello\"));\n    }\n}\n",
      expectedOutput: "olleH",
      language: "csharp"
    },
    {
      difficulty: "medium", name: "Grouping LINQ",
      question: "Grupează produsele după categorie, afișează count:\n```\ntech: 2\nedu: 1\n```",
      starterCode: "using System;\nusing System.Linq;\nusing System.Collections.Generic;\nclass Program {\n    record Produs(string Nume, string Cat);\n    static void Main() {\n        var produse = new[] {\n            new Produs(\"Laptop\",\"tech\"),\n            new Produs(\"Telefon\",\"tech\"),\n            new Produs(\"Carte\",\"edu\") };\n        var grupe = produse.GroupBy(p => p.Cat).OrderBy(g => g.Key);\n        foreach (var g in grupe)\n            Console.WriteLine($\"{g.Key}: {g.Count()}\");\n    }\n}\n",
      expectedOutput: "tech: 2\nedu: 1",
      language: "csharp"
    },
    {
      difficulty: "hard", name: "PriorityQueue C# 6",
      question: "PriorityQueue<string,int> cu 3 task-uri, procesează în ordine prioritate:\n```\nUrgent\nNormal\nLow\n```",
      starterCode: "using System;\nusing System.Collections.Generic;\nclass Program {\n    static void Main() {\n        var pq = new PriorityQueue<string, int>();\n        pq.Enqueue(\"Normal\", 2);\n        pq.Enqueue(\"Urgent\", 1);\n        pq.Enqueue(\"Low\", 3);\n        while (pq.Count > 0)\n            Console.WriteLine(pq.Dequeue());\n    }\n}\n",
      expectedOutput: "Urgent\nNormal\nLow",
      language: "csharp"
    },
  ]
};

TOPICS["csharp::linq"] = {
  fillblanks: [
    {
      difficulty: "easy", name: "LINQ Where",
      question: "Completează metoda LINQ pentru filtrare:\n```csharp\nvar adulti = persoane.___(p => p.Varsta >= 18);\n```",
      answer: "Where",
      explanation: "Where() filtrează elementele — echivalentul SQL WHERE."
    },
    {
      difficulty: "easy", name: "LINQ Select",
      question: "Completează pentru a extrage doar numele:\n```csharp\nvar nume = persoane.___(p => p.Nume);\n```",
      answer: "Select",
      explanation: "Select() transformă/proiectează elementele — echivalentul SQL SELECT."
    },
    {
      difficulty: "medium", name: "LINQ OrderByDescending",
      question: "Completează pentru sortare descrescătoare după vârstă:\n```csharp\nvar sorted = persoane.___(p => p.Varsta);\n```",
      answer: "OrderByDescending",
      explanation: "OrderByDescending() sortează descrescător; OrderBy() sortează crescător."
    },
    {
      difficulty: "medium", name: "LINQ Any",
      question: "Completează pentru a verifica dacă există vreun adult:\n```csharp\nbool areAdulti = persoane.___(p => p.Varsta >= 18);\n```",
      answer: "Any",
      explanation: "Any() returnează true dacă cel puțin un element satisface predicatul."
    },
    {
      difficulty: "hard", name: "LINQ SelectMany",
      question: "Completează pentru a aplatiza o colecție de colecții:\n```csharp\nvar toateTagurile = postari.___(p => p.Taguri);\n```",
      answer: "SelectMany",
      explanation: "SelectMany() aplatizează colecții imbricate — echivalentul flatMap din alte limbaje."
    },
  ],
  codings: [
    {
      difficulty: "easy", name: "LINQ chain simplu",
      question: "Filtrează > 5, sortează, afișează:\n```\n6 7 9\n```",
      starterCode: "using System;\nusing System.Linq;\nclass Program {\n    static void Main() {\n        int[] v = {3,7,1,9,6,2};\n        var r = v.Where(n => n > 5).OrderBy(n => n);\n        Console.WriteLine(string.Join(\" \", r));\n    }\n}\n",
      expectedOutput: "6 7 9",
      language: "csharp"
    },
    {
      difficulty: "easy", name: "LINQ Aggregate",
      question: "Calculează produsul elementelor {1,2,3,4,5} cu Aggregate:\n```\n120\n```",
      starterCode: "using System;\nusing System.Linq;\nclass Program {\n    static void Main() {\n        int[] v = {1,2,3,4,5};\n        int produs = v.Aggregate((acc, x) => acc * x);\n        Console.WriteLine(produs);\n    }\n}\n",
      expectedOutput: "120",
      language: "csharp"
    },
    {
      difficulty: "medium", name: "LINQ Join",
      question: "Join produse cu categorii, afișează perechi:\n```\nLaptop - Electronice\nCarte - Educatie\n```",
      starterCode: "using System;\nusing System.Linq;\nclass Program {\n    record Produs(int CatId, string Nume);\n    record Categorie(int Id, string Denumire);\n    static void Main() {\n        var produse = new[] { new Produs(1,\"Laptop\"), new Produs(2,\"Carte\") };\n        var categ = new[] { new Categorie(1,\"Electronice\"), new Categorie(2,\"Educatie\") };\n        var q = produse.Join(categ, p => p.CatId, c => c.Id,\n            (p, c) => $\"{p.Nume} - {c.Denumire}\");\n        foreach (var s in q) Console.WriteLine(s);\n    }\n}\n",
      expectedOutput: "Laptop - Electronice\nCarte - Educatie",
      language: "csharp"
    },
    {
      difficulty: "medium", name: "LINQ GroupBy + SelectMany",
      question: "Aplatizează taguri din mai multe posturi, distinct sorted:\n```\ncsharp dotnet java\n```",
      starterCode: "using System;\nusing System.Linq;\nclass Program {\n    record Post(string[] Tags);\n    static void Main() {\n        var posturi = new[] {\n            new Post(new[]{\"dotnet\",\"csharp\"}),\n            new Post(new[]{\"java\",\"dotnet\"}) };\n        var taguri = posturi.SelectMany(p => p.Tags).Distinct().OrderBy(t => t);\n        Console.WriteLine(string.Join(\" \", taguri));\n    }\n}\n",
      expectedOutput: "csharp dotnet java",
      language: "csharp"
    },
    {
      difficulty: "hard", name: "LINQ expresie complexă",
      question: "Top-2 angajați cu salariul mediu per departament > 3000:\n```\nIT: 4000\nFinante: 3500\n```",
      starterCode: "using System;\nusing System.Linq;\nclass Program {\n    record Angajat(string Dept, double Salariu);\n    static void Main() {\n        var ang = new[] {\n            new Angajat(\"IT\",5000), new Angajat(\"IT\",3000),\n            new Angajat(\"Finante\",3500), new Angajat(\"HR\",2000) };\n        var result = ang.GroupBy(a => a.Dept)\n            .Select(g => new { Dept=g.Key, Avg=g.Average(a=>a.Salariu) })\n            .Where(x => x.Avg > 3000)\n            .OrderByDescending(x => x.Avg)\n            .Take(2);\n        foreach (var r in result)\n            Console.WriteLine($\"{r.Dept}: {r.Avg}\");\n    }\n}\n",
      expectedOutput: "IT: 4000\nFinante: 3500",
      language: "csharp"
    },
  ]
};

TOPICS["csharp::async"] = {
  fillblanks: [
    {
      difficulty: "easy", name: "async keyword",
      question: "Completează pentru a declara o metodă asincronă:\n```csharp\npublic ___ Task<int> GetValueAsync() {\n    return await Task.FromResult(42);\n}\n```",
      answer: "async",
      explanation: "async marcează o metodă ca asincronă — permite folosirea await înăuntru."
    },
    {
      difficulty: "easy", name: "await Task.Delay",
      question: "Completează pentru a aștepta 1 secundă asincron:\n```csharp\nawait Task.___(1000);\n```",
      answer: "Delay",
      explanation: "Task.Delay() creează un task care se completează după intervalul dat — non-blocking."
    },
    {
      difficulty: "medium", name: "Task.WhenAll",
      question: "Completează pentru a rula taskuri în paralel și a aștepta toate:\n```csharp\nawait Task.___(task1, task2, task3);\n```",
      answer: "WhenAll",
      explanation: "Task.WhenAll() pornește toate taskurile simultan și se completează când toate sunt gata."
    },
    {
      difficulty: "medium", name: "CancellationToken",
      question: "Completează parametrul pentru anularea operației async:\n```csharp\nasync Task ProcessAsync(___ ct) {\n    ct.ThrowIfCancellationRequested();\n}\n```",
      answer: "CancellationToken",
      explanation: "CancellationToken permite anularea cooperativă a operațiilor asincrone."
    },
    {
      difficulty: "hard", name: "ValueTask",
      question: "Când preferi ValueTask față de Task?\n(a) mereu  (b) când rezultatul e disponibil sincron frecvent — evită aloc heap\n(c) nu contează\nRăspuns: `___`",
      answer: "b",
      explanation: "ValueTask<T> este un struct — evită alocarea heap când metoda se completează sincron."
    },
  ],
  codings: [
    {
      difficulty: "easy", name: "Async simplu",
      question: "Metodă async care returnează 42, afișează:\n```\n42\n```",
      starterCode: "using System;\nusing System.Threading.Tasks;\nclass Program {\n    static async Task<int> GetAsync() => await Task.FromResult(42);\n    static async Task Main() {\n        Console.WriteLine(await GetAsync());\n    }\n}\n",
      expectedOutput: "42",
      language: "csharp"
    },
    {
      difficulty: "easy", name: "Async chain",
      question: "Lanț de await: fetch număr, dublează-l, afișează:\n```\n84\n```",
      starterCode: "using System;\nusing System.Threading.Tasks;\nclass Program {\n    static async Task<int> Fetch() => await Task.FromResult(42);\n    static async Task<int> Double(int n) => await Task.FromResult(n * 2);\n    static async Task Main() {\n        int n = await Fetch();\n        int result = await Double(n);\n        Console.WriteLine(result);\n    }\n}\n",
      expectedOutput: "84",
      language: "csharp"
    },
    {
      difficulty: "medium", name: "Task.WhenAll paralel",
      question: "Rulează 3 taskuri în paralel, afișează suma rezultatelor:\n```\n6\n```",
      starterCode: "using System;\nusing System.Threading.Tasks;\nclass Program {\n    static async Task Main() {\n        var t1 = Task.FromResult(1);\n        var t2 = Task.FromResult(2);\n        var t3 = Task.FromResult(3);\n        int[] rezultate = await Task.WhenAll(t1, t2, t3);\n        int suma = 0;\n        foreach (int r in rezultate) suma += r;\n        Console.WriteLine(suma);\n    }\n}\n",
      expectedOutput: "6",
      language: "csharp"
    },
    {
      difficulty: "medium", name: "Cancellation",
      question: "Anulează taskul după timeout, afișează mesajul de anulare:\n```\nOperatiune anulata\n```",
      starterCode: "using System;\nusing System.Threading;\nusing System.Threading.Tasks;\nclass Program {\n    static async Task LungaOperatiune(CancellationToken ct) {\n        for (int i = 0; i < 10; i++) {\n            ct.ThrowIfCancellationRequested();\n            await Task.Delay(100, ct);\n        }\n    }\n    static async Task Main() {\n        var cts = new CancellationTokenSource(50);\n        try { await LungaOperatiune(cts.Token); }\n        catch (OperationCanceledException) { Console.WriteLine(\"Operatiune anulata\"); }\n    }\n}\n",
      expectedOutput: "Operatiune anulata",
      language: "csharp"
    },
    {
      difficulty: "hard", name: "Semaphore concurenta",
      question: "Limitează la max 2 taskuri concurente cu SemaphoreSlim:\n```\n10\n```",
      starterCode: "using System;\nusing System.Threading;\nusing System.Threading.Tasks;\nusing System.Linq;\nclass Program {\n    static async Task Main() {\n        var sem = new SemaphoreSlim(2, 2);\n        int suma = 0;\n        var tasks = Enumerable.Range(1, 5).Select(async i => {\n            await sem.WaitAsync();\n            try { suma += i; }\n            finally { sem.Release(); }\n        });\n        await Task.WhenAll(tasks);\n        Console.WriteLine(suma);\n    }\n}\n",
      expectedOutput: "10",
      language: "csharp"
    },
  ]
};

TOPICS["csharp::modern"] = {
  fillblanks: [
    {
      difficulty: "easy", name: "Null coalescing",
      question: "Completează operatorul pentru valoarea implicită null:\n```csharp\nstring name = user?.Name ___ \"Anonim\";\n```",
      answer: "??",
      explanation: "?? returnează operandul din dreapta dacă cel din stânga este null."
    },
    {
      difficulty: "easy", name: "Record with",
      question: "Completează pentru a crea o copie modificată a record-ului:\n```csharp\nvar p2 = p1 ___ { Varsta = 26 };\n```",
      answer: "with",
      explanation: "with expression (C# 9) creează o copie a record-ului cu proprietățile specificate modificate."
    },
    {
      difficulty: "medium", name: "init accessor",
      question: "Completează accessorul care permite setarea doar la inițializare:\n```csharp\npublic string Nume { get; ___ ; }\n// setabil în object initializer, readonly după\n```",
      answer: "init",
      explanation: "init (C# 9) permite setarea proprietății doar în constructori sau object initializers."
    },
    {
      difficulty: "medium", name: "Required member",
      question: "Completează modificatorul care forțează inițializarea proprietății:\n```csharp\npublic ___ string Nume { get; init; }\n```",
      answer: "required",
      explanation: "required (C# 11) forțează inițializarea proprietății în object initializer sau constructor."
    },
    {
      difficulty: "hard", name: "Generic math",
      question: "Completează interfața pentru constaintul numeric generic (C# 11):\n```csharp\nstatic T Add<T>(T a, T b) where T : ___<T>\n    => a + b;\n```",
      answer: "INumber",
      explanation: "INumber<T> (C# 11 / .NET 7) permite operații matematice pe tipuri numerice generice."
    },
  ],
  codings: [
    {
      difficulty: "easy", name: "Nullable reference",
      question: "Folosește ?. și ?? pentru acces sigur la null:\n```\nAnon\n```",
      starterCode: "using System;\nclass User { public string? Name { get; set; } }\nclass Program {\n    static void Main() {\n        User? u = null;\n        string name = u?.Name ?? \"Anon\";\n        Console.WriteLine(name);\n    }\n}\n",
      expectedOutput: "Anon",
      language: "csharp"
    },
    {
      difficulty: "easy", name: "Record with expression",
      question: "Creează p2 din p1 cu vârsta incrementată:\n```\nAna 26\n```",
      starterCode: "using System;\nrecord Persoana(string Nume, int Varsta);\nclass Program {\n    static void Main() {\n        var p1 = new Persoana(\"Ana\", 25);\n        var p2 = p1 with { Varsta = p1.Varsta + 1 };\n        Console.WriteLine($\"{p2.Nume} {p2.Varsta}\");\n    }\n}\n",
      expectedOutput: "Ana 26",
      language: "csharp"
    },
    {
      difficulty: "medium", name: "Pattern matching complex",
      question: "Clasifică forma geometrică cu pattern matching:\n```\nCerc mic\nPatrat mare\n```",
      starterCode: "using System;\nabstract record Forma;\nrecord Cerc(double R) : Forma;\nrecord Patrat(double L) : Forma;\nclass Program {\n    static string Clasifica(Forma f) => f switch {\n        Cerc { R: < 5 } => \"Cerc mic\",\n        Cerc { R: >= 5 } => \"Cerc mare\",\n        Patrat { L: >= 10 } => \"Patrat mare\",\n        Patrat _ => \"Patrat mic\",\n        _ => \"Necunoscut\"\n    };\n    static void Main() {\n        Console.WriteLine(Clasifica(new Cerc(3)));\n        Console.WriteLine(Clasifica(new Patrat(15)));\n    }\n}\n",
      expectedOutput: "Cerc mic\nPatrat mare",
      language: "csharp"
    },
    {
      difficulty: "medium", name: "File-scoped namespace C# 10",
      question: "Calculează media cu LINQ și afișează formatat:\n```\nMedia: 3.00\n```",
      starterCode: "using System;\nusing System.Linq;\nclass Program {\n    static void Main() {\n        double[] v = {1, 2, 3, 4, 5};\n        double media = v.Average();\n        Console.WriteLine($\"Media: {media:F2}\");\n    }\n}\n",
      expectedOutput: "Media: 3.00",
      language: "csharp"
    },
    {
      difficulty: "hard", name: "Source generators concept",
      question: "Demonstrează discriminated union cu abstract record și switch:\n```\nOK: 200\nError: 404 Not Found\n```",
      starterCode: "using System;\nabstract record Result;\nrecord Ok(int Code, string Data) : Result;\nrecord Error(int Code, string Message) : Result;\nclass Program {\n    static string Descrie(Result r) => r switch {\n        Ok o => $\"OK: {o.Code}\",\n        Error e => $\"Error: {e.Code} {e.Message}\",\n        _ => \"?\"\n    };\n    static void Main() {\n        Console.WriteLine(Descrie(new Ok(200, \"data\")));\n        Console.WriteLine(Descrie(new Error(404, \"Not Found\")));\n    }\n}\n",
      expectedOutput: "OK: 200\nError: 404 Not Found",
      language: "csharp"
    },
  ]
};

// ══════════════════════════════════════════════════════════════
// PHP TOPICS
// ══════════════════════════════════════════════════════════════

TOPICS["php::intro"] = {
  fillblanks: [
    {
      difficulty: "easy", name: "Echo",
      question: "Completează pentru a afișa text în PHP:\n```php\n<?php\n___ \"Hello, World!\";\n```",
      answer: "echo",
      explanation: "echo afișează text — poate primi mai mulți parametri separați prin virgulă."
    },
    {
      difficulty: "easy", name: "Variabilă",
      question: "Completează prefixul unei variabile PHP:\n```php\n___nume = \"Ana\";\necho $nume;\n```",
      answer: "$",
      explanation: "Toate variabilele PHP încep cu $ — fără declarare de tip explicită."
    },
    {
      difficulty: "medium", name: "String interpolat",
      question: "Completează tipul de ghilimele pentru interpolarea variabilei:\n```php\n$varsta = 25;\necho ___\"Am {$varsta} ani\"___;\n```",
      answer: "\"",
      explanation: "Ghilimelele duble permit interpolarea variabilelor cu {} opțional; simple nu interpolează."
    },
    {
      difficulty: "medium", name: "Concatenare string",
      question: "Completează operatorul de concatenare PHP:\n```php\n$s = \"Hello\" ___ \" World\";\n```",
      answer: ".",
      explanation: ". (punct) este operatorul de concatenare string în PHP — diferit de + din alte limbaje."
    },
    {
      difficulty: "hard", name: "Null coalescing PHP 7",
      question: "Completează operatorul pentru valoarea implicită la null/undefined:\n```php\n$name = $_GET['name'] ___ 'Anonim';\n```",
      answer: "??",
      explanation: "?? (null coalescing, PHP 7) returnează dreapta dacă stânga e null/undefined — mai scurt decât isset()."
    },
  ],
  codings: [
    {
      difficulty: "easy", name: "Hello World PHP",
      question: "Afișează exact:\n```\nHello, World!\n```",
      starterCode: "<?php\n// TODO\n",
      expectedOutput: "Hello, World!",
      language: "php"
    },
    {
      difficulty: "easy", name: "Calcul simplu",
      question: "Calculează și afișează 15 * 4:\n```\n60\n```",
      starterCode: "<?php\n$a = 15;\n$b = 4;\n// TODO: afișează produsul\n",
      expectedOutput: "60",
      language: "php"
    },
    {
      difficulty: "medium", name: "FizzBuzz PHP",
      question: "FizzBuzz pentru 1-10, pe o linie separată prin spații:\n```\n1 2 Fizz 4 Buzz Fizz 7 8 Fizz Buzz\n```",
      starterCode: "<?php\n$results = [];\nfor ($i = 1; $i <= 10; $i++) {\n    // TODO: adaugă la $results\n}\necho implode(' ', $results);\n",
      expectedOutput: "1 2 Fizz 4 Buzz Fizz 7 8 Fizz Buzz",
      language: "php"
    },
    {
      difficulty: "medium", name: "Tip variabilă",
      question: "Afișează tipul fiecărei variabile cu gettype():\n```\ninteger\nstring\ndouble\nboolean\n```",
      starterCode: "<?php\n$a = 42;\n$b = \"text\";\n$c = 3.14;\n$d = true;\necho gettype($a) . \"\\n\";\n// TODO: afișează restul\n",
      expectedOutput: "integer\nstring\ndouble\nboolean",
      language: "php"
    },
    {
      difficulty: "hard", name: "Closure PHP",
      question: "Definește closure `multiplica` care returnează o funcție cu $factor capturat:\n```\n10\n15\n```",
      starterCode: "<?php\nfunction multiplica(int $factor): Closure {\n    return function(int $n) use ($factor): int {\n        return $n * $factor;\n    };\n}\n$duble = multiplica(2);\n$triple = multiplica(3);\necho $duble(5) . \"\\n\";\necho $triple(5) . \"\\n\";\n",
      expectedOutput: "10\n15",
      language: "php"
    },
  ]
};

TOPICS["php::arrays"] = {
  fillblanks: [
    {
      difficulty: "easy", name: "Array index",
      question: "Completează pentru a accesa al doilea element:\n```php\n$arr = [10, 20, 30];\necho $arr[___];\n```",
      answer: "1",
      explanation: "Indexarea array-urilor PHP începe de la 0 — $arr[1] returnează al doilea element."
    },
    {
      difficulty: "easy", name: "Array push",
      question: "Completează funcția pentru a adăuga la finalul array-ului:\n```php\n___($$arr, 42);\n```",
      answer: "array_push",
      explanation: "array_push() adaugă elemente la finalul array-ului; alternativ $arr[] = 42."
    },
    {
      difficulty: "medium", name: "Array map",
      question: "Completează funcția care transformă fiecare element:\n```php\n$patrate = ___(fn($x) => $x ** 2, $numere);\n```",
      answer: "array_map",
      explanation: "array_map() aplică callback-ul pe fiecare element și returnează array-ul rezultat."
    },
    {
      difficulty: "medium", name: "Array filter",
      question: "Completează pentru a păstra doar elementele pare:\n```php\n$pare = ___($$numere, fn($n) => $n % 2 === 0);\n```",
      answer: "array_filter",
      explanation: "array_filter() păstrează elementele pentru care callback-ul returnează true."
    },
    {
      difficulty: "hard", name: "usort",
      question: "Completează funcția pentru sortare custom:\n```php\n___($$produse, fn($a, $b) => $a['pret'] <=> $b['pret']);\n```",
      answer: "usort",
      explanation: "usort() sortează array-ul cu un comparator custom — <=> (spaceship) returnează -1, 0, sau 1."
    },
  ],
  codings: [
    {
      difficulty: "easy", name: "Array operații",
      question: "Calculează suma elementelor {1,2,3,4,5}:\n```\n15\n```",
      starterCode: "<?php\n$arr = [1, 2, 3, 4, 5];\necho array_sum($arr) . \"\\n\";\n",
      expectedOutput: "15",
      language: "php"
    },
    {
      difficulty: "easy", name: "Array asociativ",
      question: "Creează array cu chei 'name', 'age', afișează formatat:\n```\nAna are 25 de ani\n```",
      starterCode: "<?php\n$persoana = ['name' => 'Ana', 'age' => 25];\necho $persoana['name'] . ' are ' . $persoana['age'] . \" de ani\\n\";\n",
      expectedOutput: "Ana are 25 de ani",
      language: "php"
    },
    {
      difficulty: "medium", name: "Array map + filter",
      question: "Ridică la pătrat {1..6}, filtrează > 10, afișează sorted:\n```\n16 25 36\n```",
      starterCode: "<?php\n$numere = range(1, 6);\n$patrate = array_map(fn($x) => $x ** 2, $numere);\n$mari = array_filter($patrate, fn($x) => $x > 10);\nsort($mari);\necho implode(' ', $mari) . \"\\n\";\n",
      expectedOutput: "16 25 36",
      language: "php"
    },
    {
      difficulty: "medium", name: "Array grupare",
      question: "Grupează produsele după categorie cu array_reduce:\n```\ntech: Laptop,Telefon\nedu: Carte\n```",
      starterCode: "<?php\n$produse = [\n    ['name'=>'Laptop','cat'=>'tech'],\n    ['name'=>'Carte','cat'=>'edu'],\n    ['name'=>'Telefon','cat'=>'tech'],\n];\n$grupe = array_reduce($produse, function($acc, $p) {\n    $acc[$p['cat']][] = $p['name'];\n    return $acc;\n}, []);\nksort($grupe);\nforeach ($grupe as $cat => $items) {\n    echo $cat . ': ' . implode(',', $items) . \"\\n\";\n}\n",
      expectedOutput: "tech: Laptop,Telefon\nedu: Carte",
      language: "php"
    },
    {
      difficulty: "hard", name: "usort cu spaceship",
      question: "Sortează produsele după preț desc, afișează primele 2:\n```\nLaptop: 999\nTelefon: 500\n```",
      starterCode: "<?php\n$produse = [\n    ['name'=>'Carte','pret'=>30],\n    ['name'=>'Laptop','pret'=>999],\n    ['name'=>'Telefon','pret'=>500],\n];\nusort($produse, fn($a, $b) => $b['pret'] <=> $a['pret']);\nforeach (array_slice($produse, 0, 2) as $p) {\n    echo $p['name'] . ': ' . $p['pret'] . \"\\n\";\n}\n",
      expectedOutput: "Laptop: 999\nTelefon: 500",
      language: "php"
    },
  ]
};

TOPICS["php::oop"] = {
  fillblanks: [
    {
      difficulty: "easy", name: "New object",
      question: "Completează pentru a instanția clasa:\n```php\n$masina = ___ Masina('Toyota');\n```",
      answer: "new",
      explanation: "new instanțiază o clasă și apelează constructorul cu parametrii dați."
    },
    {
      difficulty: "easy", name: "This->",
      question: "Completează pentru a accesa proprietatea din constructor:\n```php\npublic function __construct(string $marca) {\n    ___->marca = $marca;\n}\n```",
      answer: "$this",
      explanation: "$this referințiază obiectul curent în metodele PHP."
    },
    {
      difficulty: "medium", name: "Implements",
      question: "Completează pentru a implementa interfața în PHP:\n```php\nclass Cerc ___ IForma {\n    public function arie(): float { return M_PI * $this->r ** 2; }\n}\n```",
      answer: "implements",
      explanation: "implements leagă o clasă de o interfață — toate metodele trebuie implementate."
    },
    {
      difficulty: "medium", name: "Extends",
      question: "Completează pentru moștenire în PHP:\n```php\nclass Caine ___ Animal {\n    public function sunet(): string { return 'Ham!'; }\n}\n```",
      answer: "extends",
      explanation: "extends realizează moștenirea — o clasă poate extinde o singură clasă."
    },
    {
      difficulty: "hard", name: "Trait PHP",
      question: "Completează pentru a folosi un Trait în clasă:\n```php\nclass Masina {\n    ___ Logger;\n    // metoda log() este disponibilă\n}\n```",
      answer: "use",
      explanation: "use include metodele Trait-ului în clasă — soluția PHP la moștenire multiplă."
    },
  ],
  codings: [
    {
      difficulty: "easy", name: "Clasă PHP simplă",
      question: "Clasă Persoana cu Nume, Varsta; afișează:\n```\nAna are 25 ani\n```",
      starterCode: "<?php\nclass Persoana {\n    public string $nume;\n    public int $varsta;\n    public function __construct(string $n, int $v) {\n        $this->nume = $n;\n        $this->varsta = $v;\n    }\n    public function info(): string {\n        return \"{$this->nume} are {$this->varsta} ani\";\n    }\n}\n$p = new Persoana('Ana', 25);\necho $p->info() . \"\\n\";\n",
      expectedOutput: "Ana are 25 ani",
      language: "php"
    },
    {
      difficulty: "easy", name: "Getter/Setter",
      question: "Cont cu getter/setter pentru sold; afișează după operații:\n```\n170\n```",
      starterCode: "<?php\nclass Cont {\n    private float $sold;\n    public function __construct(float $sold) { $this->sold = $sold; }\n    public function depune(float $s): void { $this->sold += $s; }\n    public function retrage(float $s): void { if ($s <= $this->sold) $this->sold -= $s; }\n    public function getSold(): float { return $this->sold; }\n}\n$c = new Cont(100);\n$c->depune(100);\n$c->retrage(30);\necho $c->getSold() . \"\\n\";\n",
      expectedOutput: "170",
      language: "php"
    },
    {
      difficulty: "medium", name: "Moștenire PHP",
      question: "Clasă Animal abstract, Caine suprascrie sunet():\n```\nHam!\nMiau!\n```",
      starterCode: "<?php\nabstract class Animal {\n    abstract public function sunet(): string;\n    public function prezinta(): void {\n        echo $this->sunet() . \"\\n\";\n    }\n}\nclass Caine extends Animal {\n    public function sunet(): string { return 'Ham!'; }\n}\nclass Pisica extends Animal {\n    public function sunet(): string { return 'Miau!'; }\n}\n$animale = [new Caine(), new Pisica()];\nforeach ($animale as $a) $a->prezinta();\n",
      expectedOutput: "Ham!\nMiau!",
      language: "php"
    },
    {
      difficulty: "medium", name: "Trait Logger",
      question: "Trait Logger cu log(), folosit în clasă; afișează:\n```\n[LOG] Actiune executata\n```",
      starterCode: "<?php\ntrait Logger {\n    public function log(string $msg): void {\n        echo \"[LOG] $msg\\n\";\n    }\n}\nclass Serviciu {\n    use Logger;\n    public function executa(): void {\n        $this->log('Actiune executata');\n    }\n}\n$s = new Serviciu();\n$s->executa();\n",
      expectedOutput: "[LOG] Actiune executata",
      language: "php"
    },
    {
      difficulty: "hard", name: "Interface + abstract class",
      question: "IPlatibil + AbstractArticol + Carte concretă; afișează:\n```\nPret cu TVA: 37.2\n```",
      starterCode: "<?php\ninterface IPlatibil {\n    public function pretCuTva(): float;\n}\nabstract class AbstractArticol implements IPlatibil {\n    public function __construct(protected float $pret) {}\n}\nclass Carte extends AbstractArticol {\n    const TVA = 0.24;\n    public function pretCuTva(): float {\n        return round($this->pret * (1 + self::TVA), 2);\n    }\n}\n$c = new Carte(30);\necho 'Pret cu TVA: ' . $c->pretCuTva() . \"\\n\";\n",
      expectedOutput: "Pret cu TVA: 37.2",
      language: "php"
    },
  ]
};

TOPICS["php::forms"] = {
  fillblanks: [
    {
      difficulty: "easy", name: "POST data",
      question: "Completează superglobala pentru datele trimise prin POST:\n```php\n$email = ___(\"email\"];\n```",
      answer: "$_POST[",
      explanation: "$_POST conține datele trimise prin formulare cu method='POST'."
    },
    {
      difficulty: "easy", name: "Sanitizare",
      question: "Completează funcția PHP pentru sanitizarea input-ului HTML:\n```php\n$safe = ___($$_POST['comentariu']);\n```",
      answer: "htmlspecialchars",
      explanation: "htmlspecialchars() convertește caracterele speciale HTML în entități — previne XSS."
    },
    {
      difficulty: "medium", name: "Session start",
      question: "Completează funcția pentru inițializarea sesiunii:\n```php\n___();\n$_SESSION['user'] = 'Ana';\n```",
      answer: "session_start",
      explanation: "session_start() trebuie apelat înainte de orice output — inițializează sau continuă sesiunea."
    },
    {
      difficulty: "medium", name: "Filter validate",
      question: "Completează pentru validarea email-ului:\n```php\n$valid = filter_var($email, FILTER_VALIDATE_***);\n```",
      answer: "EMAIL",
      explanation: "FILTER_VALIDATE_EMAIL validează formatul email — returnează email-ul sau false."
    },
    {
      difficulty: "hard", name: "CSRF token",
      question: "Completează funcția pentru generarea unui token CSRF unic:\n```php\n$token = bin2hex(random_bytes(___));\n$_SESSION['csrf'] = $token;\n```",
      answer: "32",
      explanation: "random_bytes(32) generează 32 octeți criptografic securizat — 64 caractere hex."
    },
  ],
  codings: [
    {
      difficulty: "easy", name: "Validare input",
      question: "Validează dacă email-ul este valid:\n```\nValid\nInvalid\n```",
      starterCode: "<?php\nfunction validEmail(string $e): string {\n    return filter_var($e, FILTER_VALIDATE_EMAIL) ? 'Valid' : 'Invalid';\n}\necho validEmail('ana@mail.com') . \"\\n\";\necho validEmail('nu_email') . \"\\n\";\n",
      expectedOutput: "Valid\nInvalid",
      language: "php"
    },
    {
      difficulty: "easy", name: "Sanitizare XSS",
      question: "Sanitizează input-ul cu script tag și afișează sigur:\n```\n&lt;script&gt;alert(1)&lt;/script&gt;\n```",
      starterCode: "<?php\n$input = '<script>alert(1)</script>';\necho htmlspecialchars($input, ENT_QUOTES, 'UTF-8') . \"\\n\";\n",
      expectedOutput: "&lt;script&gt;alert(1)&lt;/script&gt;",
      language: "php"
    },
    {
      difficulty: "medium", name: "Validare formular",
      question: "Validează câmpuri nume (min 2 chars) și email, afișează erorile:\n```\nNume: OK\nEmail: OK\n```",
      starterCode: "<?php\nfunction validateForm(array $data): array {\n    $errors = [];\n    if (strlen($data['name'] ?? '') < 2) $errors['name'] = 'Prea scurt';\n    if (!filter_var($data['email'] ?? '', FILTER_VALIDATE_EMAIL)) $errors['email'] = 'Invalid';\n    return $errors;\n}\n$data = ['name' => 'Ana', 'email' => 'ana@mail.com'];\n$errors = validateForm($data);\necho 'Nume: ' . (isset($errors['name']) ? $errors['name'] : 'OK') . \"\\n\";\necho 'Email: ' . (isset($errors['email']) ? $errors['email'] : 'OK') . \"\\n\";\n",
      expectedOutput: "Nume: OK\nEmail: OK",
      language: "php"
    },
    {
      difficulty: "medium", name: "Password hash",
      question: "Hash parola cu bcrypt și verifică cu password_verify:\n```\ntrue\nfalse\n```",
      starterCode: "<?php\n$parola = 'secret123';\n$hash = password_hash($parola, PASSWORD_BCRYPT);\nvar_export(password_verify('secret123', $hash)); echo \"\\n\";\nvar_export(password_verify('wrong', $hash)); echo \"\\n\";\n",
      expectedOutput: "true\nfalse",
      language: "php"
    },
    {
      difficulty: "hard", name: "JWT manual",
      question: "Creează un JWT simplu (header.payload.sig) și verifică semnătura:\n```\nValid JWT\n```",
      starterCode: "<?php\nfunction b64url(string $s): string {\n    return rtrim(strtr(base64_encode($s), '+/', '-_'), '=');\n}\nfunction makeJWT(array $payload, string $key): string {\n    $h = b64url(json_encode(['alg'=>'HS256','typ'=>'JWT']));\n    $p = b64url(json_encode($payload));\n    $sig = b64url(hash_hmac('sha256', \"$h.$p\", $key, true));\n    return \"$h.$p.$sig\";\n}\nfunction verifyJWT(string $token, string $key): bool {\n    [$h, $p, $sig] = explode('.', $token);\n    $expected = b64url(hash_hmac('sha256', \"$h.$p\", $key, true));\n    return hash_equals($expected, $sig);\n}\n$jwt = makeJWT(['user'=>'Ana','exp'=>time()+3600], 'secret');\necho verifyJWT($jwt, 'secret') ? 'Valid JWT' : 'Invalid JWT';\necho \"\\n\";\n",
      expectedOutput: "Valid JWT",
      language: "php"
    },
  ]
};

TOPICS["php::pdo"] = {
  fillblanks: [
    {
      difficulty: "easy", name: "PDO conexiune",
      question: "Completează clasa pentru conexiunea la baza de date:\n```php\n$pdo = new ___(\"mysql:host=localhost;dbname=test\", $user, $pass);\n```",
      answer: "PDO",
      explanation: "PDO (PHP Data Objects) oferă o interfață uniformă pentru multiple baze de date."
    },
    {
      difficulty: "easy", name: "Prepare statement",
      question: "Completează metoda pentru prepared statement:\n```php\n$stmt = $pdo->___(\"SELECT * FROM users WHERE id = :id\");\n```",
      answer: "prepare",
      explanation: "prepare() creează un prepared statement — previne SQL injection prin parametrizare."
    },
    {
      difficulty: "medium", name: "Fetch associative",
      question: "Completează constanta pentru fetch asociativ:\n```php\n$row = $stmt->fetch(PDO::FETCH_***);\necho $row['name'];\n```",
      answer: "ASSOC",
      explanation: "PDO::FETCH_ASSOC returnează rândul ca array asociativ cu numele coloanelor ca chei."
    },
    {
      difficulty: "medium", name: "Execute cu parametri",
      question: "Completează apelul execute cu parametrii numiți:\n```php\n$stmt->___([ ':id' => 5, ':status' => 'active']);\n```",
      answer: "execute",
      explanation: "execute() rulează prepared statement cu parametrii dați — înlocuiește placeholder-urile."
    },
    {
      difficulty: "hard", name: "Transaction",
      question: "Completează metoda pentru a porni o tranzacție PDO:\n```php\n$pdo->___();\ntry {\n    // operații atomice\n    $pdo->commit();\n} catch (Exception $e) {\n    $pdo->rollback();\n}\n```",
      answer: "beginTransaction",
      explanation: "beginTransaction() pornește o tranzacție — commit() o confirmă, rollBack() o anulează."
    },
  ],
  codings: [
    {
      difficulty: "easy", name: "PDO query simplă",
      question: "Simulează query PDO și afișează rezultatele:\n```\nAna - ana@mail.com\nIon - ion@mail.com\n```",
      starterCode: "<?php\n// Simulare PDO cu array\n$users = [\n    ['name'=>'Ana','email'=>'ana@mail.com'],\n    ['name'=>'Ion','email'=>'ion@mail.com'],\n];\nforeach ($users as $u) {\n    echo $u['name'] . ' - ' . $u['email'] . \"\\n\";\n}\n",
      expectedOutput: "Ana - ana@mail.com\nIon - ion@mail.com",
      language: "php"
    },
    {
      difficulty: "easy", name: "Prepared statement simulat",
      question: "Folosește sprintf ca prepared statement manual, afișează query safe:\n```\nSELECT * FROM users WHERE id = 5 AND active = 1\n```",
      starterCode: "<?php\nfunction safeQuery(string $tpl, array $params): string {\n    $safe = array_map(fn($v) => is_int($v) ? $v : \"'\" . addslashes($v) . \"'\", $params);\n    return vsprintf(str_replace(array_keys($params), '%s', $tpl), $safe);\n}\n$q = safeQuery(\n    'SELECT * FROM users WHERE id = :id AND active = :active',\n    [':id' => 5, ':active' => 1]\n);\necho $q . \"\\n\";\n",
      expectedOutput: "SELECT * FROM users WHERE id = 5 AND active = 1",
      language: "php"
    },
    {
      difficulty: "medium", name: "Repository pattern",
      question: "UserRepository cu findAll() și findById(); afișează:\n```\nAna\nIon\nAna\n```",
      starterCode: "<?php\nclass UserRepository {\n    private array $data = [\n        1 => ['name'=>'Ana'],\n        2 => ['name'=>'Ion'],\n    ];\n    public function findAll(): array { return array_values($this->data); }\n    public function findById(int $id): ?array { return $this->data[$id] ?? null; }\n}\n$repo = new UserRepository();\nforeach ($repo->findAll() as $u) echo $u['name'] . \"\\n\";\necho $repo->findById(1)['name'] . \"\\n\";\n",
      expectedOutput: "Ana\nIon\nAna",
      language: "php"
    },
    {
      difficulty: "medium", name: "Active Record pattern",
      question: "Model ActiveRecord cu save() și find(); afișează:\n```\n1: Ana\n```",
      starterCode: "<?php\nclass User {\n    private static array $db = [];\n    private static int $nextId = 1;\n    public ?int $id = null;\n    public string $name;\n    public function __construct(string $n) { $this->name = $n; }\n    public function save(): void {\n        if (!$this->id) $this->id = self::$nextId++;\n        self::$db[$this->id] = $this;\n    }\n    public static function find(int $id): ?self {\n        return self::$db[$id] ?? null;\n    }\n}\n$u = new User('Ana');\n$u->save();\n$found = User::find(1);\necho $found->id . ': ' . $found->name . \"\\n\";\n",
      expectedOutput: "1: Ana",
      language: "php"
    },
    {
      difficulty: "hard", name: "Query Builder",
      question: "Creează un QueryBuilder simplu cu where/limit/build(), afișează SQL:\n```\nSELECT * FROM users WHERE active = 1 AND role = 'admin' LIMIT 10\n```",
      starterCode: "<?php\nclass QueryBuilder {\n    private string $table;\n    private array $wheres = [];\n    private ?int $limit = null;\n    public function __construct(string $t) { $this->table = $t; }\n    public function where(string $col, mixed $val): self {\n        $v = is_int($val) ? $val : \"'$val'\";\n        $this->wheres[] = \"$col = $v\";\n        return $this;\n    }\n    public function limit(int $n): self { $this->limit = $n; return $this; }\n    public function build(): string {\n        $sql = \"SELECT * FROM {$this->table}\";\n        if ($this->wheres) $sql .= ' WHERE ' . implode(' AND ', $this->wheres);\n        if ($this->limit) $sql .= \" LIMIT {$this->limit}\";\n        return $sql;\n    }\n}\n$q = (new QueryBuilder('users'))->where('active',1)->where('role','admin')->limit(10)->build();\necho $q . \"\\n\";\n",
      expectedOutput: "SELECT * FROM users WHERE active = 1 AND role = 'admin' LIMIT 10",
      language: "php"
    },
  ]
};

// ══════════════════════════════════════════════════════════════
// TAILWIND TOPICS
// ══════════════════════════════════════════════════════════════

TOPICS["tailwind::utilities"] = {
  fillblanks: [
    {
      difficulty: "easy", name: "Padding all",
      question: "Completează clasa pentru padding de 4 unități pe toate laturile:\n```html\n<div class=\"___\">...</div>\n```",
      answer: "p-4",
      explanation: "p-{n} aplică padding egal pe toate laturile; 1 unitate = 4px la scale-ul default."
    },
    {
      difficulty: "easy", name: "Width full",
      question: "Completează clasa pentru lățime 100%:\n```html\n<div class=\"___\">full width</div>\n```",
      answer: "w-full",
      explanation: "w-full setează width: 100% — elementul ocupă toată lățimea containerului."
    },
    {
      difficulty: "medium", name: "Border radius",
      question: "Completează clasa pentru colțuri rotunjite mari:\n```html\n<img class=\"___\" src=\"avatar.jpg\">\n```",
      answer: "rounded-full",
      explanation: "rounded-full aplică border-radius: 9999px — perfect pentru avatare circulare."
    },
    {
      difficulty: "medium", name: "Shadow",
      question: "Completează clasa pentru umbră medie:\n```html\n<div class=\"bg-white p-4 ___\">card</div>\n```",
      answer: "shadow-md",
      explanation: "shadow-{size} aplică box-shadow predefinit; md = umbră medie."
    },
    {
      difficulty: "hard", name: "Arbitrary value",
      question: "Completează clasa Tailwind cu valoare arbitrară de 350px:\n```html\n<div class=\"w-[___]\">...</div>\n```",
      answer: "350px",
      explanation: "Bracket notation [value] permite orice valoare CSS arbitrară în Tailwind v3+."
    },
  ],
  codings: [
    {
      difficulty: "easy", name: "Card simplu",
      question: "Creează un card cu border, padding și umbră Tailwind.",
      starterCode: "<!-- Card: border, p-4, shadow-md, rounded-lg, bg-white -->\n<div class=\"border p-4 shadow-md rounded-lg bg-white\">\n  <h2 class=\"text-lg font-bold\">Titlu Card</h2>\n  <p class=\"text-gray-600\">Conținut card</p>\n</div>\n",
      expectedOutput: "",
      language: "html"
    },
    {
      difficulty: "easy", name: "Buton primar",
      question: "Buton albastru cu hover mai închis și text alb.",
      starterCode: "<button class=\"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded\">\n  Click me\n</button>\n",
      expectedOutput: "",
      language: "html"
    },
    {
      difficulty: "medium", name: "Badge status",
      question: "Badge verde pentru 'Activ' și roșu pentru 'Inactiv' cu condiții.",
      starterCode: "<!-- Badge activ -->\n<span class=\"bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full\">\n  Activ\n</span>\n<!-- Badge inactiv -->\n<span class=\"bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full\">\n  Inactiv\n</span>\n",
      expectedOutput: "",
      language: "html"
    },
    {
      difficulty: "medium", name: "Navbar simplă",
      question: "Navbar cu logo stânga și linkuri dreapta cu flexbox.",
      starterCode: "<nav class=\"flex justify-between items-center px-6 py-4 bg-white shadow\">\n  <a href=\"/\" class=\"text-xl font-bold text-blue-600\">Logo</a>\n  <div class=\"flex gap-4\">\n    <a href=\"/\" class=\"text-gray-700 hover:text-blue-600\">Acasă</a>\n    <a href=\"/about\" class=\"text-gray-700 hover:text-blue-600\">Despre</a>\n    <a href=\"/contact\" class=\"text-gray-700 hover:text-blue-600\">Contact</a>\n  </div>\n</nav>\n",
      expectedOutput: "",
      language: "html"
    },
    {
      difficulty: "hard", name: "Table stilizată",
      question: "Tabel cu header gri, rânduri alternate, hover highlight și responsive scroll.",
      starterCode: "<div class=\"overflow-x-auto\">\n  <table class=\"min-w-full divide-y divide-gray-200\">\n    <thead class=\"bg-gray-50\">\n      <tr>\n        <th class=\"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase\">Nume</th>\n        <th class=\"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase\">Email</th>\n      </tr>\n    </thead>\n    <tbody class=\"bg-white divide-y divide-gray-200\">\n      <tr class=\"hover:bg-gray-50\">\n        <td class=\"px-6 py-4 text-sm\">Ana</td>\n        <td class=\"px-6 py-4 text-sm\">ana@mail.com</td>\n      </tr>\n    </tbody>\n  </table>\n</div>\n",
      expectedOutput: "",
      language: "html"
    },
  ]
};

TOPICS["tailwind::layout"] = {
  fillblanks: [
    {
      difficulty: "easy", name: "Flexbox",
      question: "Completează clasa pentru display flex:\n```html\n<div class=\"___\">...</div>\n```",
      answer: "flex",
      explanation: "flex activează Flexbox pe container — copiii devin flex items."
    },
    {
      difficulty: "easy", name: "Grid cols",
      question: "Completează pentru grid cu 3 coloane egale:\n```html\n<div class=\"grid ___\">...</div>\n```",
      answer: "grid-cols-3",
      explanation: "grid-cols-{n} împarte gridul în n coloane egale."
    },
    {
      difficulty: "medium", name: "Justify center",
      question: "Completează pentru a centra orizontal elementele flex:\n```html\n<div class=\"flex ___\">...</div>\n```",
      answer: "justify-center",
      explanation: "justify-content: center centrează elementele pe axa principală (orizontal implicit)."
    },
    {
      difficulty: "medium", name: "Gap",
      question: "Completează clasa pentru spațiu de 4 unități între elementele grid/flex:\n```html\n<div class=\"grid grid-cols-3 ___\">...</div>\n```",
      answer: "gap-4",
      explanation: "gap-{n} setează spațiul între rânduri și coloane în grid/flex."
    },
    {
      difficulty: "hard", name: "Col span",
      question: "Completează pentru ca un element să ocupe 2 coloane din 3:\n```html\n<div class=\"grid grid-cols-3\">\n  <div class=\"___\">wide</div>\n  <div>narrow</div>\n</div>\n```",
      answer: "col-span-2",
      explanation: "col-span-{n} face elementul să ocupe n coloane — echivalentul grid-column: span n."
    },
  ],
  codings: [
    {
      difficulty: "easy", name: "Flex center",
      question: "Centrează un card în mijlocul ecranului cu flex.",
      starterCode: "<div class=\"flex items-center justify-center min-h-screen bg-gray-100\">\n  <div class=\"bg-white p-8 rounded-lg shadow-md\">\n    <h1 class=\"text-2xl font-bold\">Centrat!</h1>\n  </div>\n</div>\n",
      expectedOutput: "",
      language: "html"
    },
    {
      difficulty: "easy", name: "Grid 3 coloane",
      question: "Grid 3 coloane cu 6 carduri egale.",
      starterCode: "<div class=\"grid grid-cols-3 gap-4 p-4\">\n  <div class=\"bg-blue-100 p-4 rounded\">1</div>\n  <div class=\"bg-blue-100 p-4 rounded\">2</div>\n  <div class=\"bg-blue-100 p-4 rounded\">3</div>\n  <div class=\"bg-blue-100 p-4 rounded\">4</div>\n  <div class=\"bg-blue-100 p-4 rounded\">5</div>\n  <div class=\"bg-blue-100 p-4 rounded\">6</div>\n</div>\n",
      expectedOutput: "",
      language: "html"
    },
    {
      difficulty: "medium", name: "Sidebar layout",
      question: "Layout cu sidebar fix 250px și conținut principal flex-1.",
      starterCode: "<div class=\"flex h-screen\">\n  <aside class=\"w-64 bg-gray-800 text-white p-4\">\n    <h2 class=\"font-bold mb-4\">Sidebar</h2>\n    <nav class=\"flex flex-col gap-2\">\n      <a href=\"#\" class=\"hover:text-blue-300\">Link 1</a>\n      <a href=\"#\" class=\"hover:text-blue-300\">Link 2</a>\n    </nav>\n  </aside>\n  <main class=\"flex-1 p-6 overflow-auto\">\n    <h1 class=\"text-2xl font-bold\">Conținut principal</h1>\n  </main>\n</div>\n",
      expectedOutput: "",
      language: "html"
    },
    {
      difficulty: "medium", name: "Masonry-like grid",
      question: "Grid cu coloane de lățimi diferite: 1/3 + 2/3.",
      starterCode: "<div class=\"grid grid-cols-3 gap-4 p-4\">\n  <div class=\"bg-gray-200 p-4 rounded\">1/3</div>\n  <div class=\"col-span-2 bg-blue-200 p-4 rounded\">2/3 wide</div>\n  <div class=\"col-span-2 bg-green-200 p-4 rounded\">2/3 wide</div>\n  <div class=\"bg-gray-200 p-4 rounded\">1/3</div>\n</div>\n",
      expectedOutput: "",
      language: "html"
    },
    {
      difficulty: "hard", name: "Dashboard layout complet",
      question: "Dashboard cu header, sidebar collapsible (hidden sm:flex), main, footer.",
      starterCode: "<div class=\"flex flex-col min-h-screen\">\n  <header class=\"bg-blue-600 text-white p-4 flex justify-between\">\n    <span class=\"font-bold\">Dashboard</span>\n    <span>User</span>\n  </header>\n  <div class=\"flex flex-1\">\n    <aside class=\"hidden sm:flex flex-col w-64 bg-gray-900 text-white p-4\">\n      <nav class=\"flex flex-col gap-2\">\n        <a href=\"#\" class=\"hover:bg-gray-700 p-2 rounded\">Overview</a>\n        <a href=\"#\" class=\"hover:bg-gray-700 p-2 rounded\">Reports</a>\n        <a href=\"#\" class=\"hover:bg-gray-700 p-2 rounded\">Settings</a>\n      </nav>\n    </aside>\n    <main class=\"flex-1 p-6 bg-gray-100\">\n      <div class=\"grid grid-cols-3 gap-4\">\n        <div class=\"bg-white rounded-lg shadow p-4\">Card 1</div>\n        <div class=\"bg-white rounded-lg shadow p-4\">Card 2</div>\n        <div class=\"bg-white rounded-lg shadow p-4\">Card 3</div>\n      </div>\n    </main>\n  </div>\n  <footer class=\"bg-gray-200 text-center p-4 text-sm\">Footer</footer>\n</div>\n",
      expectedOutput: "",
      language: "html"
    },
  ]
};

TOPICS["tailwind::responsive"] = {
  fillblanks: [
    {
      difficulty: "easy", name: "Breakpoint md",
      question: "Completează prefixul pentru stiluri la ecrane ≥768px:\n```html\n<div class=\"text-sm ___:text-lg\">text</div>\n```",
      answer: "md",
      explanation: "md: aplică clasa pe ecrane ≥768px — Tailwind e mobile-first."
    },
    {
      difficulty: "easy", name: "Hidden pe mobil",
      question: "Completează pentru a ascunde elementul pe ecrane mici și afișa la lg:\n```html\n<div class=\"___ lg:block\">...</div>\n```",
      answer: "hidden",
      explanation: "hidden ascunde elementul (display:none); lg:block îl afișează de la 1024px."
    },
    {
      difficulty: "medium", name: "Grid responsive",
      question: "Completează pentru grid 1 coloană pe mobil, 3 pe desktop:\n```html\n<div class=\"grid grid-cols-1 ___:grid-cols-3\">...</div>\n```",
      answer: "md",
      explanation: "md:grid-cols-3 aplică 3 coloane pe ecrane ≥768px — 1 coloană pe mobile."
    },
    {
      difficulty: "medium", name: "Flexbox direction",
      question: "Completează pentru flex-column pe mobil și row pe desktop:\n```html\n<div class=\"flex flex-col md:___-row\">...</div>\n```",
      answer: "flex",
      explanation: "md:flex-row schimbă direcția flex la row pe ecrane medii."
    },
    {
      difficulty: "hard", name: "Container query",
      question: "Completează prefixul pentru container query Tailwind v3.2+:\n```html\n<div class=\"@container\">\n  <div class=\"@___:text-2xl\">large</div>\n</div>\n```",
      answer: "lg",
      explanation: "@container + @lg: permite stilizare bazată pe dimensiunea containerului, nu a viewport-ului."
    },
  ],
  codings: [
    {
      difficulty: "easy", name: "Responsive text",
      question: "Text care crește progresiv de la xs la xl la lățimi diferite.",
      starterCode: "<h1 class=\"text-sm sm:text-base md:text-xl lg:text-3xl xl:text-5xl font-bold\">\n  Responsive Typography\n</h1>\n",
      expectedOutput: "",
      language: "html"
    },
    {
      difficulty: "easy", name: "Navbar responsive",
      question: "Navbar cu hamburger pe mobile (hidden md:flex linkuri).",
      starterCode: "<nav class=\"bg-white shadow px-4 py-3\">\n  <div class=\"flex justify-between items-center\">\n    <span class=\"font-bold text-blue-600\">Logo</span>\n    <button class=\"md:hidden p-2\">☰</button>\n    <div class=\"hidden md:flex gap-6\">\n      <a href=\"#\" class=\"hover:text-blue-600\">Home</a>\n      <a href=\"#\" class=\"hover:text-blue-600\">About</a>\n      <a href=\"#\" class=\"hover:text-blue-600\">Contact</a>\n    </div>\n  </div>\n</nav>\n",
      expectedOutput: "",
      language: "html"
    },
    {
      difficulty: "medium", name: "Card grid responsive",
      question: "Grid 1→2→3 coloane la sm/md/lg cu gap și padding responsive.",
      starterCode: "<div class=\"container mx-auto px-4 py-8\">\n  <div class=\"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6\">\n    <div class=\"bg-white rounded-lg shadow-md p-4 md:p-6\">Card 1</div>\n    <div class=\"bg-white rounded-lg shadow-md p-4 md:p-6\">Card 2</div>\n    <div class=\"bg-white rounded-lg shadow-md p-4 md:p-6\">Card 3</div>\n    <div class=\"bg-white rounded-lg shadow-md p-4 md:p-6\">Card 4</div>\n    <div class=\"bg-white rounded-lg shadow-md p-4 md:p-6\">Card 5</div>\n    <div class=\"bg-white rounded-lg shadow-md p-4 md:p-6\">Card 6</div>\n  </div>\n</div>\n",
      expectedOutput: "",
      language: "html"
    },
    {
      difficulty: "medium", name: "Hero responsive",
      question: "Hero section cu text stivuit pe mobile, inline pe desktop.",
      starterCode: "<section class=\"bg-gradient-to-r from-blue-600 to-blue-800 text-white\">\n  <div class=\"container mx-auto px-4 py-12 md:py-24\">\n    <div class=\"flex flex-col md:flex-row items-center gap-8\">\n      <div class=\"flex-1 text-center md:text-left\">\n        <h1 class=\"text-3xl md:text-5xl font-bold mb-4\">Titlu Hero</h1>\n        <p class=\"text-lg md:text-xl mb-6 text-blue-100\">Descriere scurtă</p>\n        <button class=\"bg-white text-blue-700 px-8 py-3 rounded-full font-semibold hover:bg-blue-50\">\n          Get Started\n        </button>\n      </div>\n      <div class=\"flex-1\">\n        <div class=\"bg-white/20 rounded-2xl p-8 text-center\">Ilustrație</div>\n      </div>\n    </div>\n  </div>\n</section>\n",
      expectedOutput: "",
      language: "html"
    },
    {
      difficulty: "hard", name: "Breakpoint custom",
      question: "Layout cu 4 breakpoints: 1→2→3→4 coloane și fontul scalat.",
      starterCode: "<div class=\"container mx-auto p-4\">\n  <h2 class=\"text-base sm:text-lg md:text-xl lg:text-2xl font-bold mb-4\">Produse</h2>\n  <div class=\"grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-5\">\n    <div class=\"aspect-square bg-gray-100 rounded-lg flex items-center justify-center text-sm\">P1</div>\n    <div class=\"aspect-square bg-gray-100 rounded-lg flex items-center justify-center text-sm\">P2</div>\n    <div class=\"aspect-square bg-gray-100 rounded-lg flex items-center justify-center text-sm\">P3</div>\n    <div class=\"aspect-square bg-gray-100 rounded-lg flex items-center justify-center text-sm\">P4</div>\n  </div>\n</div>\n",
      expectedOutput: "",
      language: "html"
    },
  ]
};

TOPICS["tailwind::states"] = {
  fillblanks: [
    {
      difficulty: "easy", name: "Hover",
      question: "Completează prefixul pentru stilul la hover:\n```html\n<button class=\"bg-blue-500 ___:bg-blue-700\">Click</button>\n```",
      answer: "hover",
      explanation: "hover: aplică clasa când mouse-ul e deasupra elementului."
    },
    {
      difficulty: "easy", name: "Focus ring",
      question: "Completează pentru a afișa outline la focus:\n```html\n<input class=\"border ___:ring-2 ___:ring-blue-500\">\n```",
      answer: "focus",
      explanation: "focus: aplică clasa când elementul e focusat — important pentru accesibilitate."
    },
    {
      difficulty: "medium", name: "Group hover",
      question: "Completează prefixul pentru stilul pe copil când părintele e hoverat:\n```html\n<div class=\"group\">\n  <span class=\"___:text-blue-500\">text</span>\n</div>\n```",
      answer: "group-hover",
      explanation: "group-hover: stilizează un descendent când ancestrul cu clasa group e hoverat."
    },
    {
      difficulty: "medium", name: "Disabled state",
      question: "Completează prefixul pentru stilizarea butonului dezactivat:\n```html\n<button class=\"bg-blue-500 ___:opacity-50 ___:cursor-not-allowed\">\n  Submit\n</button>\n```",
      answer: "disabled",
      explanation: "disabled: aplică stiluri când atributul disabled e prezent — nu necesită JS."
    },
    {
      difficulty: "hard", name: "Peer modifier",
      question: "Completează pentru a stiliza label-ul când input-ul e checked:\n```html\n<input type=\"checkbox\" id=\"cb\" class=\"peer\">\n<label for=\"cb\" class=\"___:text-green-600\">Accept</label>\n```",
      answer: "peer-checked",
      explanation: "peer-checked: stilizează elementul sibling când input-ul peer e checked — fără JS."
    },
  ],
  codings: [
    {
      difficulty: "easy", name: "Buton cu hover",
      question: "Buton cu tranziție smooth la hover și scale effect.",
      starterCode: "<button class=\"bg-indigo-600 hover:bg-indigo-800 text-white px-6 py-2 rounded-lg\n  transition-all duration-300 hover:scale-105 active:scale-95 font-medium\">\n  Apasă-mă\n</button>\n",
      expectedOutput: "",
      language: "html"
    },
    {
      difficulty: "easy", name: "Input cu focus",
      question: "Input cu ring albastru la focus și border mai vizibil.",
      starterCode: "<input\n  type=\"text\"\n  placeholder=\"Scrie ceva...\"\n  class=\"w-full border border-gray-300 rounded-lg px-4 py-2\n    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500\n    transition-shadow duration-200\"\n>\n",
      expectedOutput: "",
      language: "html"
    },
    {
      difficulty: "medium", name: "Card cu group hover",
      question: "Card cu imagine și overlay la hover folosind group.",
      starterCode: "<div class=\"group relative overflow-hidden rounded-xl cursor-pointer\">\n  <div class=\"h-48 bg-gradient-to-br from-blue-400 to-purple-600\"></div>\n  <div class=\"absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300\n    flex items-center justify-center\">\n    <button class=\"bg-white text-gray-900 px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100\n      transform translate-y-4 group-hover:translate-y-0 transition-all duration-300\">\n      Vezi detalii\n    </button>\n  </div>\n</div>\n",
      expectedOutput: "",
      language: "html"
    },
    {
      difficulty: "medium", name: "Toggle cu peer",
      question: "Toggle switch CSS-only cu peer pentru a actualiza label-ul.",
      starterCode: "<label class=\"flex items-center gap-3 cursor-pointer\">\n  <input type=\"checkbox\" class=\"peer sr-only\">\n  <div class=\"relative w-11 h-6 bg-gray-200 rounded-full peer\n    peer-checked:bg-blue-600 transition-colors\">\n    <div class=\"absolute left-1 top-1 w-4 h-4 bg-white rounded-full\n      peer-checked:translate-x-5 transition-transform\"></div>\n  </div>\n  <span class=\"text-gray-700 peer-checked:text-blue-600\">Notificări activate</span>\n</label>\n",
      expectedOutput: "",
      language: "html"
    },
    {
      difficulty: "hard", name: "Dropdown cu hover",
      question: "Dropdown menu CSS-only cu hover și animație de deschidere.",
      starterCode: "<div class=\"relative inline-block\">\n  <button class=\"bg-white border border-gray-300 px-4 py-2 rounded-lg\n    hover:border-gray-400 flex items-center gap-2\">\n    Meniu\n    <svg class=\"w-4 h-4\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\">\n      <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M19 9l-7 7-7-7\"/>\n    </svg>\n  </button>\n  <div class=\"absolute left-0 top-full mt-1 w-48 bg-white border border-gray-200\n    rounded-lg shadow-lg hidden hover:block\n    group-hover:block py-1 z-50\">\n    <a href=\"#\" class=\"block px-4 py-2 text-sm hover:bg-gray-50\">Opțiunea 1</a>\n    <a href=\"#\" class=\"block px-4 py-2 text-sm hover:bg-gray-50\">Opțiunea 2</a>\n    <hr class=\"my-1\">\n    <a href=\"#\" class=\"block px-4 py-2 text-sm text-red-600 hover:bg-red-50\">Șterge</a>\n  </div>\n</div>\n",
      expectedOutput: "",
      language: "html"
    },
  ]
};

TOPICS["tailwind::dark"] = {
  fillblanks: [
    {
      difficulty: "easy", name: "Dark mode class",
      question: "Completează prefixul pentru stilul în dark mode:\n```html\n<div class=\"bg-white ___:bg-gray-900\">...</div>\n```",
      answer: "dark",
      explanation: "dark: aplică clasa când dark mode e activ (class strategy: clasa dark pe html)."
    },
    {
      difficulty: "easy", name: "Dark text",
      question: "Completează pentru text alb în dark mode:\n```html\n<p class=\"text-gray-900 ___:text-white\">text</p>\n```",
      answer: "dark",
      explanation: "dark:text-white schimbă culoarea textului în dark mode."
    },
    {
      difficulty: "medium", name: "Dark config strategy",
      question: "Completează strategia în tailwind.config.js pentru dark mode controlat manual:\n```js\nmodule.exports = {\n  _____: 'class',\n}\n```",
      answer: "darkMode",
      explanation: "darkMode: 'class' permite toggling manual al dark mode prin adăugarea clasei 'dark' pe html."
    },
    {
      difficulty: "medium", name: "Dark border",
      question: "Completează pentru border mai deschis în dark mode:\n```html\n<div class=\"border border-gray-200 ___:border-gray-700\">...</div>\n```",
      answer: "dark",
      explanation: "dark:border-{color} ajustează culorile border pentru dark mode."
    },
    {
      difficulty: "hard", name: "System preference",
      question: "Ce valoare a proprietății darkMode permite urmărirea preferinței OS?\n(a) 'class'  (b) 'media'  (c) 'auto'\nRăspuns: `___`",
      answer: "b",
      explanation: "'media' folosește CSS @media (prefers-color-scheme: dark) — urmărește automat setarea OS."
    },
  ],
  codings: [
    {
      difficulty: "easy", name: "Card dark mode",
      question: "Card care se adaptează la dark mode cu culori corecte.",
      starterCode: "<!-- Presupune că <html class=\"dark\"> este setat -->\n<div class=\"bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700\n  rounded-lg shadow-md p-6\">\n  <h2 class=\"text-gray-900 dark:text-white text-xl font-bold mb-2\">Titlu Card</h2>\n  <p class=\"text-gray-600 dark:text-gray-400\">Descriere card în dark mode</p>\n</div>\n",
      expectedOutput: "",
      language: "html"
    },
    {
      difficulty: "easy", name: "Navbar dark",
      question: "Navbar adaptabilă: albă pe light, închisă pe dark.",
      starterCode: "<nav class=\"bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-6 py-4\">\n  <div class=\"flex justify-between items-center\">\n    <span class=\"font-bold text-blue-600 dark:text-blue-400\">Logo</span>\n    <div class=\"flex gap-4\">\n      <a href=\"#\" class=\"text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400\">\n        Acasă\n      </a>\n      <a href=\"#\" class=\"text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400\">\n        Despre\n      </a>\n    </div>\n  </div>\n</nav>\n",
      expectedOutput: "",
      language: "html"
    },
    {
      difficulty: "medium", name: "Dark toggle button",
      question: "Buton toggle pentru dark mode cu JS și localStorage.",
      starterCode: "<button\n  id=\"darkToggle\"\n  class=\"p-2 rounded-lg bg-gray-100 dark:bg-gray-700\n    text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600\"\n>\n  <span class=\"dark:hidden\">🌙</span>\n  <span class=\"hidden dark:inline\">☀️</span>\n</button>\n\n<script>\n  const toggle = document.getElementById('darkToggle');\n  toggle.addEventListener('click', () => {\n    document.documentElement.classList.toggle('dark');\n    localStorage.setItem('theme',\n      document.documentElement.classList.contains('dark') ? 'dark' : 'light'\n    );\n  });\n  // Restore on load\n  if (localStorage.theme === 'dark') document.documentElement.classList.add('dark');\n</script>\n",
      expectedOutput: "",
      language: "html"
    },
    {
      difficulty: "medium", name: "Form dark mode",
      question: "Formular complet cu input-uri și buton adaptate la dark mode.",
      starterCode: "<form class=\"max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg space-y-4\">\n  <h2 class=\"text-xl font-bold text-gray-900 dark:text-white\">Login</h2>\n  <div>\n    <label class=\"block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1\">Email</label>\n    <input type=\"email\" class=\"w-full px-3 py-2 border border-gray-300 dark:border-gray-600\n      rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white\n      focus:ring-2 focus:ring-blue-500 focus:outline-none\" placeholder=\"ana@mail.com\">\n  </div>\n  <div>\n    <label class=\"block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1\">Parolă</label>\n    <input type=\"password\" class=\"w-full px-3 py-2 border border-gray-300 dark:border-gray-600\n      rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white\n      focus:ring-2 focus:ring-blue-500 focus:outline-none\">\n  </div>\n  <button class=\"w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg\n    font-medium transition-colors\">\n    Autentifică-te\n  </button>\n</form>\n",
      expectedOutput: "",
      language: "html"
    },
    {
      difficulty: "hard", name: "Full dark theme sistem",
      question: "Sistem de teme complet cu variabile CSS și Tailwind dark mode.",
      starterCode: "<style>\n  :root { --bg: #ffffff; --text: #111827; --accent: #3b82f6; }\n  .dark { --bg: #111827; --text: #f9fafb; --accent: #60a5fa; }\n</style>\n\n<div class=\"min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300\">\n  <div class=\"container mx-auto p-8\">\n    <div class=\"grid grid-cols-1 md:grid-cols-2 gap-6\">\n      <div class=\"bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow\">\n        <h3 class=\"font-bold text-gray-900 dark:text-white mb-2\">Statistici</h3>\n        <p class=\"text-3xl font-bold text-blue-600 dark:text-blue-400\">1,234</p>\n        <p class=\"text-gray-500 dark:text-gray-400 text-sm mt-1\">utilizatori activi</p>\n      </div>\n      <div class=\"bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow\">\n        <h3 class=\"font-bold text-gray-900 dark:text-white mb-2\">Venituri</h3>\n        <p class=\"text-3xl font-bold text-green-600 dark:text-green-400\">$5,678</p>\n        <p class=\"text-gray-500 dark:text-gray-400 text-sm mt-1\">această lună</p>\n      </div>\n    </div>\n  </div>\n</div>\n",
      expectedOutput: "",
      language: "html"
    },
  ]
};

// ══════════════════════════════════════════════════════════════
// CYBERSECURITY TOPICS
// ══════════════════════════════════════════════════════════════

TOPICS["cybersecurity::intro"] = {
  fillblanks: [
    {
      difficulty: "easy", name: "Triada CIA",
      question: "Completează al treilea pilon al triadei CIA:\n`Confidentiality, Integrity, ___`",
      answer: "Availability",
      explanation: "CIA Triad: Confidentiality (acces restricționat), Integrity (date nemodificate), Availability (acces continuu)."
    },
    {
      difficulty: "easy", name: "Threat vs Vulnerability",
      question: "O slăbiciune exploatabilă într-un sistem se numește:\n(a) threat  (b) vulnerability  (c) attack\nRăspuns: `___`",
      answer: "b",
      explanation: "Vulnerability = slăbiciune/defect; Threat = actor/eveniment care poate exploata; Risk = probabilitate × impact."
    },
    {
      difficulty: "medium", name: "Defense in depth",
      question: "Strategia cu multiple straturi de securitate se numește:\n`Defense in ___`",
      answer: "Depth",
      explanation: "Defense in Depth: dacă un strat cade, altele îl protejează — nu există single point of failure."
    },
    {
      difficulty: "medium", name: "Principiul least privilege",
      question: "Completează principiul: acordă utilizatorilor exact permisiunile necesare, nu mai mult:\n`Principle of Least ___`",
      answer: "Privilege",
      explanation: "Least Privilege limitează daunele în caz de compromitere — contul nu poate face mai mult decât trebuie."
    },
    {
      difficulty: "hard", name: "Zero Trust",
      question: "Modelul care nu acordă încredere implicită nici rețelei interne se numește:\n`___ Trust`",
      answer: "Zero",
      explanation: "Zero Trust: verifică întotdeauna ('never trust, always verify') — contrariul perimeter security."
    },
  ],
  codings: [
    {
      difficulty: "easy", name: "Input sanitizare",
      question: "Funcție de sanitizare care elimină taguri HTML din input:",
      starterCode: "function sanitize(input) {\n  // TODO: elimină taguri HTML\n  return input.replace(/<[^>]*>/g, '');\n}\n\nconsole.log(sanitize('<script>alert(1)</script>'));\nconsole.log(sanitize('<b>Bold</b> text'));\n",
      expectedOutput: "alert(1)\nBold text",
      language: "javascript"
    },
    {
      difficulty: "easy", name: "Password strength",
      question: "Verifică dacă parola are min 8 chars, literă mare, cifră, caracter special:",
      starterCode: "function checkPassword(pass) {\n  const rules = [\n    [/.{8,}/, 'min 8 chars'],\n    [/[A-Z]/, 'litera mare'],\n    [/[0-9]/, 'cifra'],\n    [/[^A-Za-z0-9]/, 'caracter special'],\n  ];\n  const failed = rules.filter(([re]) => !re.test(pass)).map(([,m]) => m);\n  return failed.length === 0 ? 'Strong' : 'Weak: ' + failed.join(', ');\n}\nconsole.log(checkPassword('Parola1!'));\nconsole.log(checkPassword('parola'));\n",
      expectedOutput: "Strong\nWeak: litera mare, cifra, caracter special",
      language: "javascript"
    },
    {
      difficulty: "medium", name: "Rate limiting",
      question: "Implementează rate limiter: max 3 request-uri pe secundă per IP:",
      starterCode: "const requests = new Map();\n\nfunction rateLimit(ip) {\n  const now = Date.now();\n  const window = 1000; // 1s\n  const max = 3;\n  \n  if (!requests.has(ip)) requests.set(ip, []);\n  \n  // Curăță requests vechi\n  const recent = requests.get(ip).filter(t => now - t < window);\n  requests.set(ip, recent);\n  \n  if (recent.length >= max) return { allowed: false, remaining: 0 };\n  \n  requests.get(ip).push(now);\n  return { allowed: true, remaining: max - recent.length - 1 };\n}\n\nconsole.log(rateLimit('127.0.0.1').allowed); // true\nconsole.log(rateLimit('127.0.0.1').allowed); // true\nconsole.log(rateLimit('127.0.0.1').allowed); // true\nconsole.log(rateLimit('127.0.0.1').allowed); // false\n",
      expectedOutput: "true\ntrue\ntrue\nfalse",
      language: "javascript"
    },
    {
      difficulty: "medium", name: "HMAC semnătură",
      question: "Creează și verifică o semnătură HMAC-like (hash simplu) pentru integritate mesaj:",
      starterCode: "const crypto = require('crypto');\n\nfunction sign(data, key) {\n  return crypto.createHmac('sha256', key).update(data).digest('hex');\n}\n\nfunction verify(data, key, sig) {\n  return sign(data, key) === sig;\n}\n\nconst key = 'secret';\nconst data = 'mesaj important';\nconst sig = sign(data, key);\n\nconsole.log(verify(data, key, sig));       // true\nconsole.log(verify('altul', key, sig));    // false\n",
      expectedOutput: "true\nfalse",
      language: "javascript"
    },
    {
      difficulty: "hard", name: "Content Security Policy",
      question: "Generează header CSP care permite resurse doar de pe același domeniu:",
      starterCode: "function generateCSP(config) {\n  const directives = {\n    'default-src': config.defaultSrc || [\"'self'\"],\n    'script-src': config.scriptSrc || [\"'self'\"],\n    'style-src': config.styleSrc || [\"'self'\"],\n    'img-src': config.imgSrc || [\"'self'\", 'data:'],\n    'connect-src': config.connectSrc || [\"'self'\"],\n    'frame-ancestors': [\"'none'\"],\n    'base-uri': [\"'self'\"],\n  };\n  return Object.entries(directives)\n    .map(([k, v]) => `${k} ${v.join(' ')}`)\n    .join('; ');\n}\n\nconst csp = generateCSP({ scriptSrc: [\"'self'\", \"'nonce-abc123'\"] });\nconsole.log(csp.includes(\"default-src 'self'\")); // true\nconsole.log(csp.includes(\"frame-ancestors 'none'\")); // true\n",
      expectedOutput: "true\ntrue",
      language: "javascript"
    },
  ]
};

TOPICS["cybersecurity::xss"] = {
  fillblanks: [
    {
      difficulty: "easy", name: "Tipuri XSS",
      question: "XSS-ul care e stocat în baza de date și servit tuturor vizitatorilor se numește:\n(a) Reflected  (b) Stored  (c) DOM-based\nRăspuns: `___`",
      answer: "b",
      explanation: "Stored XSS e cel mai periculos — payload-ul e persistent și afectează toți utilizatorii."
    },
    {
      difficulty: "easy", name: "htmlspecialchars",
      question: "Completează funcția PHP pentru escapare HTML:\n```php\n$safe = ___($$input, ENT_QUOTES, 'UTF-8');\n```",
      answer: "htmlspecialchars",
      explanation: "htmlspecialchars() convertește < > \" ' & în entități HTML — previne execuția scripturilor."
    },
    {
      difficulty: "medium", name: "CSP header",
      question: "Completează header-ul HTTP care restricționează sursele de script:\n```\nContent-Security-Policy: ___-src 'self'\n```",
      answer: "script",
      explanation: "script-src în CSP definește sursele permise pentru JavaScript — 'self' permite doar same-origin."
    },
    {
      difficulty: "medium", name: "HttpOnly cookie",
      question: "Completează flag-ul cookie care previne accesul JavaScript:\n```\nSet-Cookie: session=abc; HttpOnly; ___\n```",
      answer: "Secure",
      explanation: "HttpOnly previne accesul document.cookie; Secure transmite cookie-ul doar prin HTTPS."
    },
    {
      difficulty: "hard", name: "DOM XSS",
      question: "Care atribuire JavaScript e vulnerabilă la DOM XSS?\n(a) element.textContent = input\n(b) element.innerHTML = input\n(c) element.setAttribute('class', input)\nRăspuns: `___`",
      answer: "b",
      explanation: "innerHTML interpretează HTML incluzând script-uri — folosește textContent pentru text pur."
    },
  ],
  codings: [
    {
      difficulty: "easy", name: "Escape HTML",
      question: "Funcție care escapează caracterele HTML periculoase:",
      starterCode: "function escapeHtml(str) {\n  const map = { '&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',\"'\":'&#39;' };\n  return str.replace(/[&<>\"']/g, m => map[m]);\n}\n\nconsole.log(escapeHtml('<script>alert(1)</script>'));\nconsole.log(escapeHtml('O\"Claire\\'s'));\n",
      expectedOutput: "&lt;script&gt;alert(1)&lt;/script&gt;\nO&quot;Claire&#39;s",
      language: "javascript"
    },
    {
      difficulty: "easy", name: "Safe DOM update",
      question: "Actualizează DOM-ul în mod sigur (fără innerHTML):",
      starterCode: "// Simulare DOM\nconst elements = {};\nconst document = {\n  getElementById: (id) => ({\n    textContent: '',\n    get innerHTML() { return this._html || ''; },\n    set innerHTML(v) { this._html = v; },\n    get textContent() { return this._text || ''; },\n    set textContent(v) { this._text = v; },\n  })\n};\n\nfunction safeSetContent(id, userInput) {\n  const el = document.getElementById(id);\n  // TODO: folosește textContent în loc de innerHTML\n  el.textContent = userInput;\n  return el.textContent;\n}\n\nconsole.log(safeSetContent('output', '<b>text</b>'));\n",
      expectedOutput: "<b>text</b>",
      language: "javascript"
    },
    {
      difficulty: "medium", name: "XSS payload detector",
      question: "Detectează payload-uri XSS comune în input:",
      starterCode: "function detectXSS(input) {\n  const patterns = [\n    /<script[\\s\\S]*?>/i,\n    /javascript:/i,\n    /on\\w+\\s*=/i,\n    /<iframe/i,\n    /expression\\s*\\(/i,\n  ];\n  return patterns.some(p => p.test(input)) ? 'XSS detected' : 'Clean';\n}\n\nconsole.log(detectXSS('<script>alert(1)</script>'));\nconsole.log(detectXSS('<img onerror=alert(1)>'));\nconsole.log(detectXSS('Hello World'));\n",
      expectedOutput: "XSS detected\nXSS detected\nClean",
      language: "javascript"
    },
    {
      difficulty: "medium", name: "CSP nonce generator",
      question: "Generează nonce pentru CSP și construiește header-ul:",
      starterCode: "const crypto = require('crypto');\n\nfunction generateNonce() {\n  return crypto.randomBytes(16).toString('base64');\n}\n\nfunction buildCSPHeader(nonce) {\n  return `script-src 'nonce-${nonce}' 'strict-dynamic'; object-src 'none'; base-uri 'self'`;\n}\n\nconst nonce = 'abc123==';\nconst header = buildCSPHeader(nonce);\nconsole.log(header.includes(`nonce-${nonce}`));\nconsole.log(header.includes(\"object-src 'none'\"));\n",
      expectedOutput: "true\ntrue",
      language: "javascript"
    },
    {
      difficulty: "hard", name: "Trusted Types",
      question: "Simulează Trusted Types policy pentru HTML safe:",
      starterCode: "class TrustedHTML {\n  #value;\n  constructor(value) { this.#value = value; }\n  toString() { return this.#value; }\n}\n\nconst trustedTypesPolicy = {\n  createHTML: (input) => {\n    // Sanitizare: permite doar tag-uri sigure\n    const safe = input.replace(/<(?!br\\s?\\/?>|b>|\\/b>|i>|\\/i>|strong>|\\/strong>)[^>]*>/gi, '');\n    return new TrustedHTML(safe);\n  }\n};\n\nconst safeHTML = trustedTypesPolicy.createHTML('<b>Bold</b> <script>alert(1)</script>');\nconsole.log(safeHTML.toString());\n",
      expectedOutput: "<b>Bold</b> alert(1)",
      language: "javascript"
    },
  ]
};

TOPICS["cybersecurity::sqli"] = {
  fillblanks: [
    {
      difficulty: "easy", name: "SQL Injection vector",
      question: "Completează payload-ul classic pentru a evita autentificarea:\n```sql\nSELECT * FROM users WHERE user='___' AND pass='anything'\n```",
      answer: "' OR '1'='1",
      explanation: "' OR '1'='1' face condiția mereu true — ignoră verificarea parolei."
    },
    {
      difficulty: "easy", name: "Parametrizare",
      question: "Completează metoda pentru a preveni SQL Injection:\n```python\ncursor.execute(\"SELECT * FROM users WHERE id = ___\", (user_id,))\n```",
      answer: "?",
      explanation: "? (placeholder) în prepared statements separă codul SQL de date — input-ul nu e interpretat."
    },
    {
      difficulty: "medium", name: "UNION attack",
      question: "Un atac care combină rezultatele a 2 query-uri SQLi se numește:\n`___ based SQLi`",
      answer: "UNION",
      explanation: "UNION injection extrage date din alte tabele: ' UNION SELECT username,password FROM admin--"
    },
    {
      difficulty: "medium", name: "Blind SQLi",
      question: "SQLi care nu returnează date direct, ci inferează prin răspunsuri true/false se numește:\n`___ SQL Injection`",
      answer: "Blind",
      explanation: "Blind SQLi exploatează schimbări de comportament (timp, conținut) pentru a extrage date bit cu bit."
    },
    {
      difficulty: "hard", name: "Second order SQLi",
      question: "SQLi care stochează payload-ul și îl execută ulterior se numește:\n`___ order SQL Injection`",
      answer: "Second",
      explanation: "Second-order: input-ul e sanitizat la scriere dar re-folosit neescaped ulterior — de ex. la change password."
    },
  ],
  codings: [
    {
      difficulty: "easy", name: "Parametrizare query",
      question: "Construiește query-ul safe cu parametri numiți (nu concatenare):",
      starterCode: "// Simulare prepared statement\nfunction safeQuery(userId) {\n  // GREȘIT: `SELECT * FROM users WHERE id = ${userId}`\n  // CORECT: parametrizat\n  const template = 'SELECT * FROM users WHERE id = ?';\n  // Simulare executare\n  return { query: template, params: [userId], safe: !template.includes(userId.toString()) };\n}\n\nconst result = safeQuery(\"1 OR 1=1\");\nconsole.log(result.safe); // true - input-ul nu e în query\nconsole.log(result.query);\n",
      expectedOutput: "true\nSELECT * FROM users WHERE id = ?",
      language: "javascript"
    },
    {
      difficulty: "easy", name: "Input whitelist",
      question: "Validează că ID-ul e doar număr pozitiv (whitelist):",
      starterCode: "function validateId(input) {\n  const num = parseInt(input, 10);\n  if (isNaN(num) || num <= 0 || num.toString() !== String(input).trim()) {\n    return { valid: false, error: 'ID invalid' };\n  }\n  return { valid: true, id: num };\n}\n\nconsole.log(validateId('42').valid);        // true\nconsole.log(validateId('1 OR 1=1').valid);  // false\nconsole.log(validateId('-1').valid);         // false\n",
      expectedOutput: "true\nfalse\nfalse",
      language: "javascript"
    },
    {
      difficulty: "medium", name: "SQLi detector",
      question: "Detectează pattern-uri comune de SQL injection în input:",
      starterCode: "function detectSQLi(input) {\n  const patterns = [\n    /('\\s*(or|and)\\s*'?\\d)/i,\n    /(union\\s+(all\\s+)?select)/i,\n    /;\\s*(drop|delete|truncate|insert|update)/i,\n    /-{2}|#|\\*\\//,\n    /sleep\\s*\\(|waitfor\\s+delay/i,\n  ];\n  return patterns.some(p => p.test(input)) ? 'SQLi detected' : 'Clean';\n}\n\nconsole.log(detectSQLi(\"' OR '1'='1\"));\nconsole.log(detectSQLi('1; DROP TABLE users--'));\nconsole.log(detectSQLi('SELECT * FROM users'));\nconsole.log(detectSQLi('normal search query'));\n",
      expectedOutput: "SQLi detected\nSQLi detected\nClean\nClean",
      language: "javascript"
    },
    {
      difficulty: "medium", name: "ORM safe queries",
      question: "Simulează ORM cu query building sigur (fără string concatenation):",
      starterCode: "class SafeQuery {\n  #conditions = [];\n  #params = [];\n  #table;\n  \n  constructor(table) { this.#table = table; }\n  \n  where(col, val) {\n    this.#conditions.push(`${col} = ?`);\n    this.#params.push(val);\n    return this;\n  }\n  \n  build() {\n    const where = this.#conditions.length \n      ? ' WHERE ' + this.#conditions.join(' AND ') \n      : '';\n    return { sql: `SELECT * FROM ${this.#table}${where}`, params: this.#params };\n  }\n}\n\nconst q = new SafeQuery('users')\n  .where('id', 5)\n  .where('active', 1)\n  .build();\n\nconsole.log(q.sql);\nconsole.log(q.params.join(','));\n",
      expectedOutput: "SELECT * FROM users WHERE id = ? AND active = ?\n5,1",
      language: "javascript"
    },
    {
      difficulty: "hard", name: "Error-based SQLi mitigation",
      question: "Implementează error handling care nu expune detalii DB în producție:",
      starterCode: "class DBError extends Error {\n  constructor(original, userMsg) {\n    super(userMsg);\n    this.original = original; // pentru logging intern\n  }\n}\n\nfunction safeDBOperation(fn, env = 'production') {\n  try {\n    return { success: true, data: fn() };\n  } catch (err) {\n    const internalMsg = err.message;\n    const publicMsg = env === 'development' \n      ? internalMsg \n      : 'A apărut o eroare. Contactați support.';\n    // Log intern (nu expus clientului)\n    console.error('[DB]', internalMsg);\n    return { success: false, error: publicMsg };\n  }\n}\n\nconst result = safeDBOperation(() => { throw new Error('Table users not found'); }, 'production');\nconsole.log(result.success);\nconsole.log(result.error.includes('Table'));\n",
      expectedOutput: "[DB] Table users not found\nfalse\nfalse",
      language: "javascript"
    },
  ]
};

TOPICS["cybersecurity::auth"] = {
  fillblanks: [
    {
      difficulty: "easy", name: "JWT structura",
      question: "JWT e format din 3 părți separate prin punct:\n`Header.___.Signature`",
      answer: "Payload",
      explanation: "JWT = Base64(Header) + '.' + Base64(Payload) + '.' + HMAC_Signature — Payload conține claims."
    },
    {
      difficulty: "easy", name: "bcrypt factor",
      question: "Completează parametrul care controlează costul computațional al bcrypt:\n```js\nbcrypt.hash(password, ___) // salt rounds\n```",
      answer: "12",
      explanation: "Salt rounds (10-14 recomandat) determină cât durează hash-ul — mai mare = mai sigur dar mai lent."
    },
    {
      difficulty: "medium", name: "JWT expiry",
      question: "Completează claim-ul JWT pentru timpul de expirare:\n```json\n{ \"sub\": \"123\", \"___\": 1735689600 }\n```",
      answer: "exp",
      explanation: "exp (expiry time) este un Unix timestamp după care JWT-ul nu mai e valid — limitează fereastra de atac."
    },
    {
      difficulty: "medium", name: "Refresh token",
      question: "Token-ul cu viață lungă folosit pentru a obține noi access tokens se numește:\n`___ token`",
      answer: "refresh",
      explanation: "Refresh tokens durează zile/săptămâni și sunt stocate sigur (httpOnly) — access tokens durează minute."
    },
    {
      difficulty: "hard", name: "PKCE",
      question: "Extensia OAuth 2.0 care previne interceptarea authorization code de aplicații publice:\n`Proof Key for Code ___`",
      answer: "Exchange",
      explanation: "PKCE (Proof Key for Code Exchange) adaugă code_verifier/code_challenge — previne CSRF și injection attacks."
    },
  ],
  codings: [
    {
      difficulty: "easy", name: "JWT decode manual",
      question: "Decodează payload-ul JWT (fără verificare):",
      starterCode: "function decodeJWTPayload(token) {\n  const parts = token.split('.');\n  if (parts.length !== 3) throw new Error('Invalid JWT');\n  // Base64url -> Base64 -> JSON\n  const b64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');\n  const json = Buffer.from(b64, 'base64').toString('utf8');\n  return JSON.parse(json);\n}\n\n// JWT cu payload: {\"sub\":\"123\",\"name\":\"Ana\"}\nconst jwt = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjMiLCJuYW1lIjoiQW5hIn0.sig';\nconst payload = decodeJWTPayload(jwt);\nconsole.log(payload.sub);\nconsole.log(payload.name);\n",
      expectedOutput: "123\nAna",
      language: "javascript"
    },
    {
      difficulty: "easy", name: "Password hashing simulat",
      question: "Simulează bcrypt hash + verify (fără librărie):",
      starterCode: "const crypto = require('crypto');\n\nfunction hashPassword(password, salt = crypto.randomBytes(16).toString('hex')) {\n  const hash = crypto.scryptSync(password, salt, 64).toString('hex');\n  return `${salt}:${hash}`;\n}\n\nfunction verifyPassword(password, stored) {\n  const [salt] = stored.split(':');\n  const attempt = hashPassword(password, salt);\n  return attempt === stored;\n}\n\nconst hashed = hashPassword('secret123');\nconsole.log(verifyPassword('secret123', hashed)); // true\nconsole.log(verifyPassword('wrong', hashed));      // false\n",
      expectedOutput: "true\nfalse",
      language: "javascript"
    },
    {
      difficulty: "medium", name: "JWT creare și verificare",
      question: "Creează și verifică JWT simplu cu HMAC-SHA256:",
      starterCode: "const crypto = require('crypto');\n\nfunction b64url(buf) {\n  return buf.toString('base64').replace(/\\+/g,'-').replace(/\\//g,'_').replace(/=/g,'');\n}\n\nfunction createJWT(payload, secret) {\n  const header = b64url(Buffer.from(JSON.stringify({alg:'HS256',typ:'JWT'})));\n  const body = b64url(Buffer.from(JSON.stringify(payload)));\n  const sig = b64url(crypto.createHmac('sha256',secret).update(`${header}.${body}`).digest());\n  return `${header}.${body}.${sig}`;\n}\n\nfunction verifyJWT(token, secret) {\n  const [h,p,s] = token.split('.');\n  const expected = b64url(crypto.createHmac('sha256',secret).update(`${h}.${p}`).digest());\n  return s === expected;\n}\n\nconst token = createJWT({sub:'1',name:'Ana'}, 'secret');\nconsole.log(verifyJWT(token, 'secret'));   // true\nconsole.log(verifyJWT(token, 'wrong'));    // false\n",
      expectedOutput: "true\nfalse",
      language: "javascript"
    },
    {
      difficulty: "medium", name: "Session management",
      question: "Session store cu create/get/delete și expiry:",
      starterCode: "class SessionStore {\n  #sessions = new Map();\n  \n  create(userId, ttlMs = 3600000) {\n    const id = Math.random().toString(36).slice(2);\n    this.#sessions.set(id, { userId, exp: Date.now() + ttlMs });\n    return id;\n  }\n  \n  get(sessionId) {\n    const s = this.#sessions.get(sessionId);\n    if (!s) return null;\n    if (Date.now() > s.exp) { this.#sessions.delete(sessionId); return null; }\n    return s;\n  }\n  \n  delete(sessionId) { this.#sessions.delete(sessionId); }\n}\n\nconst store = new SessionStore();\nconst sid = store.create('user123', 5000); // 5s TTL\nconsole.log(store.get(sid) !== null);   // true\nstore.delete(sid);\nconsole.log(store.get(sid) === null);   // true\n",
      expectedOutput: "true\ntrue",
      language: "javascript"
    },
    {
      difficulty: "hard", name: "OAuth PKCE flow",
      question: "Simulează generarea code_verifier și code_challenge pentru PKCE:",
      starterCode: "const crypto = require('crypto');\n\nfunction generatePKCE() {\n  const verifier = crypto.randomBytes(32).toString('base64url');\n  const challenge = crypto.createHash('sha256')\n    .update(verifier)\n    .digest('base64url');\n  return { verifier, challenge };\n}\n\nfunction verifyPKCE(verifier, challenge) {\n  const computed = crypto.createHash('sha256').update(verifier).digest('base64url');\n  return computed === challenge;\n}\n\nconst { verifier, challenge } = generatePKCE();\nconsole.log(verifier.length > 40);           // true - min 43 chars base64url\nconsole.log(verifyPKCE(verifier, challenge)); // true\nconsole.log(verifyPKCE('wrong', challenge));  // false\n",
      expectedOutput: "true\ntrue\nfalse",
      language: "javascript"
    },
  ]
};

TOPICS["cybersecurity::crypto"] = {
  fillblanks: [
    {
      difficulty: "easy", name: "Hash vs Encryption",
      question: "O funcție one-way care nu poate fi inversată se numește:\n(a) encryption  (b) hash  (c) encoding\nRăspuns: `___`",
      answer: "b",
      explanation: "Hash e one-way (nu are key de decriptare); Encryption e reversibilă cu key; Encoding e conversie (nu securitate)."
    },
    {
      difficulty: "easy", name: "SHA-256 output",
      question: "SHA-256 produce un hash de ___ biți (sau 64 caractere hex):\n`___ biți`",
      answer: "256",
      explanation: "SHA-256 = 256 biți = 32 bytes = 64 hex chars — parte din familia SHA-2."
    },
    {
      difficulty: "medium", name: "Salt",
      question: "Valoarea aleatorie adăugată la parolă înainte de hash pentru a preveni rainbow tables:\n`___`",
      answer: "salt",
      explanation: "Salt unic per user face ca același password să producă hash-uri diferite — previne atacuri precomputate."
    },
    {
      difficulty: "medium", name: "Criptografie asimetrică",
      question: "Completează: în RSA, mesajul se criptează cu cheia ___ și se decriptează cu cheia ___:\n`___ / privata`",
      answer: "publica",
      explanation: "RSA: Criptezi cu cheia publică (oricine poate trimite mesaje sigure); Decriptezi cu cheia privată (doar tu)."
    },
    {
      difficulty: "hard", name: "Perfect Forward Secrecy",
      question: "Proprietatea prin care compromiterea cheii de lungă durată nu afectează sesiunile trecute:\n`Perfect ___ Secrecy`",
      answer: "Forward",
      explanation: "PFS: fiecare sesiune are chei efemere (Diffie-Hellman); cheia privată compromisă nu decriptează traficul vechi."
    },
  ],
  codings: [
    {
      difficulty: "easy", name: "SHA-256 hash",
      question: "Calculează SHA-256 al unui string și verifică că e 64 chars hex:",
      starterCode: "const crypto = require('crypto');\n\nfunction sha256(data) {\n  return crypto.createHash('sha256').update(data).digest('hex');\n}\n\nconst hash = sha256('hello world');\nconsole.log(hash.length === 64);\nconsole.log(hash === sha256('hello world')); // deterministic\nconsole.log(hash === sha256('Hello world')); // case sensitive\n",
      expectedOutput: "true\ntrue\nfalse",
      language: "javascript"
    },
    {
      difficulty: "easy", name: "Base64 encode/decode",
      question: "Encode și decode Base64 (nu e criptare, e encoding):",
      starterCode: "function encode64(str) {\n  return Buffer.from(str).toString('base64');\n}\n\nfunction decode64(b64) {\n  return Buffer.from(b64, 'base64').toString();\n}\n\nconst encoded = encode64('Hello, World!');\nconsole.log(encoded);\nconsole.log(decode64(encoded));\n",
      expectedOutput: "SGVsbG8sIFdvcmxkIQ==\nHello, World!",
      language: "javascript"
    },
    {
      difficulty: "medium", name: "AES-256 encrypt/decrypt",
      question: "Criptează și decriptează un mesaj cu AES-256-CBC:",
      starterCode: "const crypto = require('crypto');\n\nfunction encrypt(text, key) {\n  const iv = crypto.randomBytes(16);\n  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key,'hex'), iv);\n  let encrypted = cipher.update(text, 'utf8', 'hex');\n  encrypted += cipher.final('hex');\n  return iv.toString('hex') + ':' + encrypted;\n}\n\nfunction decrypt(data, key) {\n  const [ivHex, enc] = data.split(':');\n  const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key,'hex'), Buffer.from(ivHex,'hex'));\n  let dec = decipher.update(enc, 'hex', 'utf8');\n  dec += decipher.final('utf8');\n  return dec;\n}\n\nconst key = crypto.randomBytes(32).toString('hex');\nconst msg = 'Secret message';\nconst enc = encrypt(msg, key);\nconsole.log(decrypt(enc, key));\n",
      expectedOutput: "Secret message",
      language: "javascript"
    },
    {
      difficulty: "medium", name: "Digital signature",
      question: "Semnează un mesaj cu RSA și verifică semnătura:",
      starterCode: "const crypto = require('crypto');\n\nconst { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', { modulusLength: 2048 });\n\nfunction sign(data, privKey) {\n  return crypto.sign('sha256', Buffer.from(data), privKey).toString('hex');\n}\n\nfunction verify(data, sig, pubKey) {\n  return crypto.verify('sha256', Buffer.from(data), pubKey, Buffer.from(sig, 'hex'));\n}\n\nconst msg = 'Document important';\nconst sig = sign(msg, privateKey);\nconsole.log(verify(msg, sig, publicKey));          // true\nconsole.log(verify('tampered', sig, publicKey));   // false\n",
      expectedOutput: "true\nfalse",
      language: "javascript"
    },
    {
      difficulty: "hard", name: "Key derivation PBKDF2",
      question: "Derivă o cheie AES din parolă cu PBKDF2 (100k iterații):",
      starterCode: "const crypto = require('crypto');\n\nfunction deriveKey(password, salt, iterations = 100000) {\n  return crypto.pbkdf2Sync(password, salt, iterations, 32, 'sha256').toString('hex');\n}\n\nconst salt = crypto.randomBytes(16).toString('hex');\nconst key1 = deriveKey('my-password', salt);\nconst key2 = deriveKey('my-password', salt);\nconst key3 = deriveKey('other-pass', salt);\n\nconsole.log(key1 === key2); // deterministic cu același salt\nconsole.log(key1 === key3); // parolă diferită = cheie diferită\nconsole.log(key1.length);   // 64 hex chars = 32 bytes\n",
      expectedOutput: "true\nfalse\n64",
      language: "javascript"
    },
  ]
};

TOPICS["cybersecurity::owasp"] = {
  fillblanks: [
    {
      difficulty: "easy", name: "OWASP A01",
      question: "OWASP Top 10 #1 (2021) — controlul accesului defectuos:\n`A01: Broken Access ___`",
      answer: "Control",
      explanation: "Broken Access Control: utilizatorii pot accesa resurse/funcționalități pentru care nu au permisii."
    },
    {
      difficulty: "easy", name: "OWASP A03",
      question: "Vulnerabilitatea care include SQL injection, XSS, command injection:\n`A03: ___`",
      answer: "Injection",
      explanation: "Injection: inputul utilizatorului e interpretat ca cod (SQL/HTML/OS command) — prevenit prin parametrizare."
    },
    {
      difficulty: "medium", name: "IDOR",
      question: "Vulnerabilitatea care permite accesul la resurse prin modificarea ID-ului din URL:\n`Insecure Direct Object ___`",
      answer: "Reference",
      explanation: "IDOR: /api/orders/123 → /api/orders/124 accesează comanda altui user — necesită authorization check."
    },
    {
      difficulty: "medium", name: "Security Misconfiguration",
      question: "OWASP A05 — lăsarea setărilor default nesigure sau expunerea stack traces:\n`Security ___`",
      answer: "Misconfiguration",
      explanation: "Security Misconfiguration: default credentials, debug info în producție, servicii inutile active."
    },
    {
      difficulty: "hard", name: "SSRF",
      question: "Atacul prin care serverul face request-uri la URL-uri controlate de atacator:\n`Server-Side Request ___`",
      answer: "Forgery",
      explanation: "SSRF poate accesa servicii interne (metadata AWS, Redis) prin serverul compromis — validează URL-urile."
    },
  ],
  codings: [
    {
      difficulty: "easy", name: "Authorization check",
      question: "Verifică că userul are acces la resursă (nu IDOR):",
      starterCode: "function getOrder(requestUserId, orderId, db) {\n  const order = db.orders.find(o => o.id === orderId);\n  if (!order) return { error: 'Not Found', status: 404 };\n  // TODO: verifică că order.userId === requestUserId\n  if (order.userId !== requestUserId) return { error: 'Forbidden', status: 403 };\n  return { data: order, status: 200 };\n}\n\nconst db = { orders: [{ id: 1, userId: 'user1', total: 99 }] };\nconsole.log(getOrder('user1', 1, db).status); // 200\nconsole.log(getOrder('user2', 1, db).status); // 403\nconsole.log(getOrder('user1', 99, db).status); // 404\n",
      expectedOutput: "200\n403\n404",
      language: "javascript"
    },
    {
      difficulty: "easy", name: "Sensitive data exposure",
      question: "Filtrează câmpurile sensitive înainte de a trimite răspunsul API:",
      starterCode: "function sanitizeUser(user, fields = ['password', 'ssn', 'creditCard']) {\n  const safe = { ...user };\n  fields.forEach(f => delete safe[f]);\n  return safe;\n}\n\nconst user = { id: 1, name: 'Ana', email: 'ana@mail.com', password: 'hash', ssn: '123-45-6789' };\nconst safe = sanitizeUser(user);\nconsole.log('password' in safe); // false\nconsole.log('name' in safe);     // true\nconsole.log(Object.keys(safe).sort().join(','));\n",
      expectedOutput: "false\ntrue\nemail,id,name",
      language: "javascript"
    },
    {
      difficulty: "medium", name: "SSRF prevention",
      question: "Validează URL-ul pentru a preveni SSRF (blochează IP-uri private):",
      starterCode: "function isSafeURL(url) {\n  try {\n    const parsed = new URL(url);\n    if (!['http:', 'https:'].includes(parsed.protocol)) return false;\n    const hostname = parsed.hostname;\n    // Blochează loopback, private ranges, metadata\n    const blocked = [\n      /^localhost$/i, /^127\\./, /^10\\./, /^192\\.168\\./,\n      /^172\\.(1[6-9]|2[0-9]|3[01])\\./, /^169\\.254\\./\n    ];\n    return !blocked.some(r => r.test(hostname));\n  } catch { return false; }\n}\n\nconsole.log(isSafeURL('https://google.com'));        // true\nconsole.log(isSafeURL('http://localhost/api'));       // false\nconsole.log(isSafeURL('http://192.168.1.1/'));       // false\nconsole.log(isSafeURL('ftp://files.example.com'));   // false\n",
      expectedOutput: "true\nfalse\nfalse\nfalse",
      language: "javascript"
    },
    {
      difficulty: "medium", name: "Security headers",
      question: "Generează setul de security headers recomandat:",
      starterCode: "function getSecurityHeaders() {\n  return {\n    'X-Frame-Options': 'DENY',\n    'X-Content-Type-Options': 'nosniff',\n    'X-XSS-Protection': '1; mode=block',\n    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',\n    'Content-Security-Policy': \"default-src 'self'\",\n    'Referrer-Policy': 'strict-origin-when-cross-origin',\n    'Permissions-Policy': 'geolocation=(), microphone=()',\n  };\n}\n\nconst headers = getSecurityHeaders();\nconsole.log(headers['X-Frame-Options']);\nconsole.log(headers['X-Content-Type-Options']);\nconsole.log(Object.keys(headers).length);\n",
      expectedOutput: "DENY\nnosniff\n7",
      language: "javascript"
    },
    {
      difficulty: "hard", name: "Audit log",
      question: "Implementează audit log pentru operații sensibile (OWASP A09 - Security Logging):",
      starterCode: "class AuditLog {\n  #log = [];\n  \n  record(event) {\n    this.#log.push({\n      ...event,\n      timestamp: new Date().toISOString(),\n      id: this.#log.length + 1,\n    });\n  }\n  \n  getEvents(userId) {\n    return this.#log.filter(e => e.userId === userId);\n  }\n  \n  getFailedLogins() {\n    return this.#log.filter(e => e.action === 'LOGIN_FAILED');\n  }\n}\n\nconst audit = new AuditLog();\naudit.record({ userId: 'user1', action: 'LOGIN_SUCCESS', ip: '1.2.3.4' });\naudit.record({ userId: 'user2', action: 'LOGIN_FAILED', ip: '5.6.7.8' });\naudit.record({ userId: 'user1', action: 'DATA_ACCESS', resource: '/api/orders' });\n\nconsole.log(audit.getEvents('user1').length);  // 2\nconsole.log(audit.getFailedLogins().length);   // 1\n",
      expectedOutput: "2\n1",
      language: "javascript"
    },
  ]
};

TOPICS["cybersecurity::network"] = {
  fillblanks: [
    {
      difficulty: "easy", name: "HTTPS",
      question: "Protocolul care criptează traficul HTTP cu TLS/SSL:\n`___`",
      answer: "HTTPS",
      explanation: "HTTPS = HTTP + TLS — previne eavesdropping și MITM attacks; obligatoriu pentru transmiterea datelor sensibile."
    },
    {
      difficulty: "easy", name: "Firewall",
      question: "Sistemul care filtrează traficul de rețea pe baza regulilor definite:\n`___`",
      answer: "Firewall",
      explanation: "Firewall controlează traficul intrare/ieșire pe baza porturilor, IP-urilor și protocoalelor."
    },
    {
      difficulty: "medium", name: "VPN tunnel",
      question: "Completează: VPN creează un ___ criptat prin rețeaua publică:\n`tunnel ___`",
      answer: "criptat",
      explanation: "VPN tunnel criptează traficul și maschează IP-ul real — folosit pentru acces sigur la rețele private."
    },
    {
      difficulty: "medium", name: "Port scanning",
      question: "Tehnica de a identifica porturile deschise pe un host (tool: nmap):\n`Port ___`",
      answer: "Scanning",
      explanation: "Port scanning identifică serviciile rulând pe un host — legitim în pentesting, malicious pentru recon."
    },
    {
      difficulty: "hard", name: "Certificate pinning",
      question: "Tehnica prin care aplicația acceptă doar un certificat specific, prevenind MITM:\n`Certificate ___`",
      answer: "Pinning",
      explanation: "Certificate pinning leagă aplicația de un cert/public key specific — previne certificate spoofing în MITM."
    },
  ],
  codings: [
    {
      difficulty: "easy", name: "IP validation",
      question: "Validează format IPv4 și IPv6:",
      starterCode: "function isValidIP(ip) {\n  const ipv4 = /^(\\d{1,3}\\.){3}\\d{1,3}$/;\n  const ipv6 = /^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;\n  if (ipv4.test(ip)) {\n    return ip.split('.').every(n => parseInt(n) <= 255);\n  }\n  return ipv6.test(ip);\n}\n\nconsole.log(isValidIP('192.168.1.1'));        // true\nconsole.log(isValidIP('256.0.0.1'));          // false\nconsole.log(isValidIP('::1'));               // false (shorthand)\nconsole.log(isValidIP('not-an-ip'));         // false\n",
      expectedOutput: "true\nfalse\nfalse\nfalse",
      language: "javascript"
    },
    {
      difficulty: "easy", name: "URL validator",
      question: "Validează că URL-ul folosește HTTPS și are domeniu valid:",
      starterCode: "function isSecureURL(url) {\n  try {\n    const u = new URL(url);\n    return u.protocol === 'https:' && u.hostname.includes('.');\n  } catch { return false; }\n}\n\nconsole.log(isSecureURL('https://example.com/api'));  // true\nconsole.log(isSecureURL('http://example.com'));        // false\nconsole.log(isSecureURL('https://localhost'));         // false\nconsole.log(isSecureURL('not-a-url'));                // false\n",
      expectedOutput: "true\nfalse\nfalse\nfalse",
      language: "javascript"
    },
    {
      difficulty: "medium", name: "Request validator middleware",
      question: "Middleware care validează request-urile și blochează payload-uri periculoase:",
      starterCode: "function securityMiddleware(req) {\n  const issues = [];\n  \n  // Verifică Content-Type pentru POST/PUT\n  if (['POST','PUT'].includes(req.method) && !req.headers['content-type']?.includes('application/json')) {\n    issues.push('Missing Content-Type');\n  }\n  \n  // Verifică dimensiunea body\n  if (req.body && JSON.stringify(req.body).length > 1024 * 1024) { // 1MB\n    issues.push('Payload too large');\n  }\n  \n  // Verifică header user-agent (blochează curl/bots cunoscuți)\n  if (!req.headers['user-agent'] || req.headers['user-agent'].length < 5) {\n    issues.push('Suspicious User-Agent');\n  }\n  \n  return { ok: issues.length === 0, issues };\n}\n\nconst req1 = { method:'POST', headers:{'content-type':'application/json','user-agent':'Mozilla/5.0'}, body:{} };\nconst req2 = { method:'POST', headers:{'user-agent':'curl/7.64'}, body:{} };\nconsole.log(securityMiddleware(req1).ok);                    // true\nconsole.log(securityMiddleware(req2).issues[0]);             // Missing Content-Type\n",
      expectedOutput: "true\nMissing Content-Type",
      language: "javascript"
    },
    {
      difficulty: "medium", name: "TLS certificate info",
      question: "Parsează informații dintr-un certificat TLS simulat:",
      starterCode: "function parseCertInfo(cert) {\n  return {\n    subject: cert.subject,\n    issuer: cert.issuer,\n    validFrom: new Date(cert.valid_from),\n    validTo: new Date(cert.valid_to),\n    isExpired: new Date(cert.valid_to) < new Date(),\n    daysLeft: Math.floor((new Date(cert.valid_to) - new Date()) / 86400000),\n  };\n}\n\nconst cert = {\n  subject: 'CN=example.com',\n  issuer: 'CN=Let\\'s Encrypt',\n  valid_from: '2024-01-01',\n  valid_to: '2099-12-31',\n};\n\nconst info = parseCertInfo(cert);\nconsole.log(info.subject);\nconsole.log(info.isExpired);\n",
      expectedOutput: "CN=example.com\nfalse",
      language: "javascript"
    },
    {
      difficulty: "hard", name: "Network anomaly detection",
      question: "Detectează anomalii: burst traffic, geo-impossible, brute force:",
      starterCode: "class NetworkMonitor {\n  #events = new Map(); // ip -> [{ts, action}]\n  \n  log(ip, action) {\n    if (!this.#events.has(ip)) this.#events.set(ip, []);\n    this.#events.get(ip).push({ ts: Date.now(), action });\n  }\n  \n  detectBrute(ip, window = 60000, threshold = 5) {\n    const events = this.#events.get(ip) || [];\n    const recent = events.filter(e => \n      Date.now() - e.ts < window && e.action === 'LOGIN_FAIL'\n    );\n    return recent.length >= threshold;\n  }\n  \n  detectBurst(ip, window = 1000, threshold = 50) {\n    const events = this.#events.get(ip) || [];\n    const recent = events.filter(e => Date.now() - e.ts < window);\n    return recent.length >= threshold;\n  }\n}\n\nconst mon = new NetworkMonitor();\nfor (let i = 0; i < 5; i++) mon.log('192.168.1.100', 'LOGIN_FAIL');\nconsole.log(mon.detectBrute('192.168.1.100'));  // true\nconsole.log(mon.detectBrute('192.168.1.200'));  // false\n",
      expectedOutput: "true\nfalse",
      language: "javascript"
    },
  ]
};

// ══════════════════════════════════════════════════════════════
// NEXT.JS FRONTEND TOPICS
// ══════════════════════════════════════════════════════════════

TOPICS["nextjs-fe::routing"] = {
  fillblanks: [
    {
      difficulty: "easy", name: "Link component",
      question: "Completează componenta Next.js pentru navigare client-side:\n```jsx\nimport ___ from 'next/link';\n<___  href=\"/about\">Despre</___>\n```",
      answer: "Link",
      explanation: "Link din next/link face navigare client-side (SPA) fără reload complet de pagină."
    },
    {
      difficulty: "easy", name: "Dynamic route",
      question: "Completează fișierul pentru ruta dinamică /products/[id]:\n`app/products/___/page.tsx`",
      answer: "[id]",
      explanation: "Folder-ul [id] în App Router definește un segment dinamic — valoarea e accesibilă via params.id."
    },
    {
      difficulty: "medium", name: "useRouter push",
      question: "Completează metoda pentru navigare programatică:\n```jsx\nconst router = useRouter();\nrouter.___('/dashboard');\n```",
      answer: "push",
      explanation: "router.push() navighează la o nouă rută — push adaugă în history, replace înlocuiește."
    },
    {
      difficulty: "medium", name: "useParams",
      question: "Completează hook-ul pentru accesarea parametrilor dinamici:\n```jsx\nconst { id } = ___();\n```",
      answer: "useParams",
      explanation: "useParams() (App Router) returnează parametrii dinamici ai rutei curente în client components."
    },
    {
      difficulty: "hard", name: "Catch-all route",
      question: "Completează sintaxa pentru o rută catch-all opțională:\n`app/docs/___/page.tsx`",
      answer: "[[...slug]]",
      explanation: "[[...slug]] este catch-all opțional — prinde /docs, /docs/a, /docs/a/b etc. (dublu bracket = opțional)."
    },
  ],
  codings: [
    {
      difficulty: "easy", name: "Pagina simplă",
      question: "Creează pagina Home cu titlu și paragraf în App Router.",
      starterCode: "// app/page.tsx\nexport default function Home() {\n  return (\n    <main>\n      <h1>Bun venit!</h1>\n      <p>Aceasta este pagina principală.</p>\n    </main>\n  );\n}\n",
      expectedOutput: "",
      language: "jsx"
    },
    {
      difficulty: "easy", name: "Navigare Link",
      question: "Navbar cu linkuri folosind componenta Link Next.js.",
      starterCode: "import Link from 'next/link';\n\nexport default function Navbar() {\n  return (\n    <nav className=\"flex gap-4 p-4 bg-white shadow\">\n      <Link href=\"/\" className=\"font-bold text-blue-600\">Acasă</Link>\n      <Link href=\"/about\" className=\"text-gray-700 hover:text-blue-600\">Despre</Link>\n      <Link href=\"/contact\" className=\"text-gray-700 hover:text-blue-600\">Contact</Link>\n    </nav>\n  );\n}\n",
      expectedOutput: "",
      language: "jsx"
    },
    {
      difficulty: "medium", name: "Rută dinamică",
      question: "Pagina produsului care afișează ID-ul din ruta dinamică [id].",
      starterCode: "// app/products/[id]/page.tsx\ninterface Props {\n  params: { id: string };\n}\n\nexport default function ProductPage({ params }: Props) {\n  return (\n    <div className=\"p-6\">\n      <h1 className=\"text-2xl font-bold\">Produs #{params.id}</h1>\n      <p className=\"text-gray-600 mt-2\">Detalii pentru produsul {params.id}</p>\n    </div>\n  );\n}\n",
      expectedOutput: "",
      language: "jsx"
    },
    {
      difficulty: "medium", name: "generateStaticParams",
      question: "Pre-generează paginile pentru produsele cunoscute la build time.",
      starterCode: "// app/products/[id]/page.tsx\nexport async function generateStaticParams() {\n  // Simulează fetch de la API\n  const products = [{ id: '1' }, { id: '2' }, { id: '3' }];\n  return products.map(p => ({ id: p.id }));\n}\n\nexport default function ProductPage({ params }: { params: { id: string } }) {\n  return <h1>Produs {params.id}</h1>;\n}\n",
      expectedOutput: "",
      language: "jsx"
    },
    {
      difficulty: "hard", name: "Parallel routes",
      question: "Layout cu parallel routes @modal și @content pentru split view.",
      starterCode: "// app/layout.tsx cu parallel routes\ninterface Props {\n  children: React.ReactNode;\n  modal: React.ReactNode;\n  sidebar: React.ReactNode;\n}\n\nexport default function Layout({ children, modal, sidebar }: Props) {\n  return (\n    <div className=\"flex\">\n      <aside className=\"w-64 border-r\">{sidebar}</aside>\n      <main className=\"flex-1 p-6\">\n        {children}\n        {/* Modal se randează în slot-ul @modal */}\n        {modal}\n      </main>\n    </div>\n  );\n}\n",
      expectedOutput: "",
      language: "jsx"
    },
  ]
};

TOPICS["nextjs-fe::components"] = {
  fillblanks: [
    {
      difficulty: "easy", name: "use client",
      question: "Completează directiva pentru a marca o componentă ca Client Component:\n```jsx\n'use ___';\nimport { useState } from 'react';\n```",
      answer: "client",
      explanation: "'use client' marchează componenta și sub-arborele ei ca Client Components — permit useState/useEffect/event handlers."
    },
    {
      difficulty: "easy", name: "Server Component default",
      question: "În Next.js 13+ App Router, componentele sunt implicit:\n(a) Client Components  (b) Server Components  (c) Shared Components\nRăspuns: `___`",
      answer: "b",
      explanation: "Componentele App Router sunt Server Components implicit — rulează pe server, nu trimit JS la client."
    },
    {
      difficulty: "medium", name: "Props interface TypeScript",
      question: "Completează definirea props TypeScript pentru componenta Card:\n```tsx\n___  CardProps {\n  title: string;\n  children: React.ReactNode;\n}\n```",
      answer: "interface",
      explanation: "interface (sau type) definește tipul props în TypeScript — IDE autocomplete și type checking."
    },
    {
      difficulty: "medium", name: "Server Component data fetch",
      question: "Completează pentru fetch direct în Server Component:\n```tsx\nexport default async function Page() {\n  const data = await ___(url);\n  const json = await data.json();\n}\n```",
      answer: "fetch",
      explanation: "Server Components pot fi async și folosi fetch direct — nu necesită useEffect sau librării externe."
    },
    {
      difficulty: "hard", name: "Suspense boundary",
      question: "Completează componenta React pentru a gestiona async rendering:\n```jsx\n<___ fallback={<Loading />}>\n  <AsyncComponent />\n</___>\n```",
      answer: "Suspense",
      explanation: "Suspense boundary afișează fallback cât timp componenta async se încarcă — enableSreamingSSR în Next.js."
    },
  ],
  codings: [
    {
      difficulty: "easy", name: "Server Component simplu",
      question: "Server Component care face fetch și afișează date.",
      starterCode: "// app/users/page.tsx — Server Component\ninterface User {\n  id: number;\n  name: string;\n}\n\nasync function getUsers(): Promise<User[]> {\n  // Simulare — în real ar fi fetch('/api/users')\n  return [{ id: 1, name: 'Ana' }, { id: 2, name: 'Ion' }];\n}\n\nexport default async function UsersPage() {\n  const users = await getUsers();\n  return (\n    <ul>\n      {users.map(u => (\n        <li key={u.id}>{u.name}</li>\n      ))}\n    </ul>\n  );\n}\n",
      expectedOutput: "",
      language: "jsx"
    },
    {
      difficulty: "easy", name: "Client Component cu useState",
      question: "Counter cu useState — Client Component.",
      starterCode: "'use client';\nimport { useState } from 'react';\n\nexport default function Counter() {\n  const [count, setCount] = useState(0);\n  return (\n    <div className=\"flex items-center gap-4 p-4\">\n      <button\n        onClick={() => setCount(c => c - 1)}\n        className=\"px-3 py-1 bg-red-100 rounded\"\n      >-</button>\n      <span className=\"text-xl font-bold\">{count}</span>\n      <button\n        onClick={() => setCount(c => c + 1)}\n        className=\"px-3 py-1 bg-green-100 rounded\"\n      >+</button>\n    </div>\n  );\n}\n",
      expectedOutput: "",
      language: "jsx"
    },
    {
      difficulty: "medium", name: "Composition Server + Client",
      question: "Server Component care pasează date la Client Component.",
      starterCode: "// Server Component\nasync function getData() {\n  return { title: 'Dashboard', stats: { users: 100, revenue: 5000 } };\n}\n\n// Client Component\n'use client';\nfunction StatsCard({ stats }: { stats: { users: number; revenue: number } }) {\n  return (\n    <div className=\"grid grid-cols-2 gap-4\">\n      <div className=\"bg-blue-50 p-4 rounded\">\n        <p className=\"text-2xl font-bold\">{stats.users}</p>\n        <p className=\"text-gray-600\">Utilizatori</p>\n      </div>\n      <div className=\"bg-green-50 p-4 rounded\">\n        <p className=\"text-2xl font-bold\">${stats.revenue}</p>\n        <p className=\"text-gray-600\">Venituri</p>\n      </div>\n    </div>\n  );\n}\n\nexport default async function Page() {\n  const data = await getData();\n  return (\n    <div>\n      <h1>{data.title}</h1>\n      <StatsCard stats={data.stats} />\n    </div>\n  );\n}\n",
      expectedOutput: "",
      language: "jsx"
    },
    {
      difficulty: "medium", name: "Error boundary",
      question: "Error Boundary pentru componente care pot eșua.",
      starterCode: "'use client';\nimport { Component, ErrorInfo, ReactNode } from 'react';\n\ninterface Props { children: ReactNode; fallback: ReactNode; }\ninterface State { hasError: boolean; }\n\nexport class ErrorBoundary extends Component<Props, State> {\n  state = { hasError: false };\n  \n  static getDerivedStateFromError() { return { hasError: true }; }\n  \n  componentDidCatch(error: Error, info: ErrorInfo) {\n    console.error('Error:', error.message, info.componentStack);\n  }\n  \n  render() {\n    return this.state.hasError ? this.props.fallback : this.props.children;\n  }\n}\n",
      expectedOutput: "",
      language: "jsx"
    },
    {
      difficulty: "hard", name: "Optimistic update",
      question: "Optimistic UI: actualizează lista înainte de confirmare server.",
      starterCode: "'use client';\nimport { useState, useOptimistic } from 'react';\n\ninterface Todo { id: number; text: string; done: boolean; }\n\nexport default function TodoList({ initialTodos }: { initialTodos: Todo[] }) {\n  const [todos, setTodos] = useState(initialTodos);\n  const [optimisticTodos, addOptimistic] = useOptimistic(todos,\n    (state, newTodo: Todo) => [...state, newTodo]\n  );\n  \n  async function addTodo(text: string) {\n    const tempTodo = { id: Date.now(), text, done: false };\n    addOptimistic(tempTodo); // afișează imediat\n    // await saveTodo(text); // simulare server\n    setTodos(prev => [...prev, tempTodo]); // confirmă\n  }\n  \n  return (\n    <ul>\n      {optimisticTodos.map(t => <li key={t.id}>{t.text}</li>)}\n    </ul>\n  );\n}\n",
      expectedOutput: "",
      language: "jsx"
    },
  ]
};

TOPICS["nextjs-fe::layouts"] = {
  fillblanks: [
    {
      difficulty: "easy", name: "Layout file",
      question: "Completează numele fișierului obligatoriu pentru layout global în App Router:\n`app/___.tsx`",
      answer: "layout",
      explanation: "app/layout.tsx este root layout-ul — wrappează toate paginile, include <html> și <body>."
    },
    {
      difficulty: "easy", name: "Children prop",
      question: "Completează prop-ul care primește paginile în layout:\n```tsx\nexport default function Layout({ ___ }: { children: React.ReactNode }) {\n  return <div>{children}</div>;\n}\n```",
      answer: "children",
      explanation: "children în layout primește pagina curentă (și sub-layout-urile) — pattern fundamental React."
    },
    {
      difficulty: "medium", name: "Metadata export",
      question: "Completează exportul pentru metadata SEO în Next.js 13+:\n```tsx\nexport const ___ = { title: 'Home', description: '...' };\n```",
      answer: "metadata",
      explanation: "export const metadata generează automat <title>, <meta description> și alte tag-uri SEO."
    },
    {
      difficulty: "medium", name: "Template vs Layout",
      question: "Ce se re-randează la fiecare navigare: layout sau template?\n(a) layout  (b) template  (c) amândouă\nRăspuns: `___`",
      answer: "b",
      explanation: "template.tsx se re-montează la fiecare navigare (resetează state); layout.tsx persistă între navigări."
    },
    {
      difficulty: "hard", name: "generateMetadata",
      question: "Completează funcția async pentru metadata dinamică:\n```tsx\nexport async function ___(props) {\n  const product = await getProduct(props.params.id);\n  return { title: product.name };\n}\n```",
      answer: "generateMetadata",
      explanation: "generateMetadata() generează metadata dinamic (pentru pagini cu date din API) — alternativa la export const."
    },
  ],
  codings: [
    {
      difficulty: "easy", name: "Root Layout",
      question: "Root layout cu metadata, font și Provider global.",
      starterCode: "// app/layout.tsx\nimport type { Metadata } from 'next';\n\nexport const metadata: Metadata = {\n  title: 'DevZone',\n  description: 'Platformă de învățare programare',\n};\n\nexport default function RootLayout({\n  children,\n}: {\n  children: React.ReactNode;\n}) {\n  return (\n    <html lang=\"ro\">\n      <body>\n        <header className=\"bg-blue-600 text-white p-4\">\n          <h1 className=\"text-xl font-bold\">DevZone</h1>\n        </header>\n        <main className=\"container mx-auto p-4\">\n          {children}\n        </main>\n      </body>\n    </html>\n  );\n}\n",
      expectedOutput: "",
      language: "jsx"
    },
    {
      difficulty: "easy", name: "Nested Layout",
      question: "Layout pentru secțiunea /dashboard cu sidebar.",
      starterCode: "// app/dashboard/layout.tsx\nexport default function DashboardLayout({\n  children,\n}: {\n  children: React.ReactNode;\n}) {\n  return (\n    <div className=\"flex\">\n      <nav className=\"w-64 bg-gray-900 text-white min-h-screen p-4\">\n        <h2 className=\"font-bold mb-4\">Dashboard</h2>\n        <ul className=\"space-y-2\">\n          <li><a href=\"/dashboard\" className=\"hover:text-blue-300\">Overview</a></li>\n          <li><a href=\"/dashboard/analytics\" className=\"hover:text-blue-300\">Analytics</a></li>\n          <li><a href=\"/dashboard/settings\" className=\"hover:text-blue-300\">Settings</a></li>\n        </ul>\n      </nav>\n      <main className=\"flex-1 p-6\">{children}</main>\n    </div>\n  );\n}\n",
      expectedOutput: "",
      language: "jsx"
    },
    {
      difficulty: "medium", name: "Metadata dinamică",
      question: "generateMetadata pentru pagina produsului cu titlu dinamic.",
      starterCode: "// app/products/[id]/page.tsx\nimport type { Metadata } from 'next';\n\ninterface Props {\n  params: { id: string };\n}\n\nasync function getProduct(id: string) {\n  // Simulare\n  return { name: `Produs ${id}`, description: `Descriere produs ${id}` };\n}\n\nexport async function generateMetadata({ params }: Props): Promise<Metadata> {\n  const product = await getProduct(params.id);\n  return {\n    title: product.name,\n    description: product.description,\n    openGraph: {\n      title: product.name,\n      images: [`/products/${params.id}/og.jpg`],\n    },\n  };\n}\n\nexport default async function ProductPage({ params }: Props) {\n  const product = await getProduct(params.id);\n  return <h1>{product.name}</h1>;\n}\n",
      expectedOutput: "",
      language: "jsx"
    },
    {
      difficulty: "medium", name: "Loading UI",
      question: "Loading skeleton pentru pagina care se încarcă async.",
      starterCode: "// app/dashboard/loading.tsx — automat afișat de Suspense\nexport default function Loading() {\n  return (\n    <div className=\"animate-pulse space-y-4 p-6\">\n      <div className=\"h-8 bg-gray-200 rounded w-1/3\"></div>\n      <div className=\"grid grid-cols-3 gap-4\">\n        {[1,2,3].map(i => (\n          <div key={i} className=\"h-32 bg-gray-200 rounded-lg\"></div>\n        ))}\n      </div>\n      <div className=\"space-y-2\">\n        <div className=\"h-4 bg-gray-200 rounded w-full\"></div>\n        <div className=\"h-4 bg-gray-200 rounded w-5/6\"></div>\n        <div className=\"h-4 bg-gray-200 rounded w-4/6\"></div>\n      </div>\n    </div>\n  );\n}\n",
      expectedOutput: "",
      language: "jsx"
    },
    {
      difficulty: "hard", name: "Intercepting routes modal",
      question: "Intercepting route pentru modal de produs fără pierderea context-ului.",
      starterCode: "// app/@modal/(.)products/[id]/page.tsx\n// Intercepts /products/[id] și afișează ca modal\nimport { useRouter } from 'next/navigation';\n\nexport default function ProductModal({ params }: { params: { id: string } }) {\n  // Nota: useRouter e în Client Component\n  return (\n    <div className=\"fixed inset-0 bg-black/50 flex items-center justify-center z-50\">\n      <div className=\"bg-white rounded-xl p-6 max-w-lg w-full mx-4\">\n        <div className=\"flex justify-between items-center mb-4\">\n          <h2 className=\"text-xl font-bold\">Produs #{params.id}</h2>\n          <a href=\"/\" className=\"text-gray-500 hover:text-gray-700\">✕</a>\n        </div>\n        <p className=\"text-gray-600\">Conținut modal produs {params.id}</p>\n        <div className=\"mt-6 flex gap-3\">\n          <button className=\"flex-1 bg-blue-600 text-white py-2 rounded-lg\">Cumpără</button>\n          <button className=\"flex-1 border border-gray-300 py-2 rounded-lg\">Salvează</button>\n        </div>\n      </div>\n    </div>\n  );\n}\n",
      expectedOutput: "",
      language: "jsx"
    },
  ]
};

TOPICS["nextjs-fe::data"] = {
  fillblanks: [
    {
      difficulty: "easy", name: "Fetch cu cache",
      question: "Completează opțiunea pentru cache pe durata build-ului (SSG):\n```tsx\nconst data = await fetch(url, { cache: '___' });\n```",
      answer: "force-cache",
      explanation: "force-cache stochează răspunsul în cache permanent — echivalentul SSG (Static Site Generation)."
    },
    {
      difficulty: "easy", name: "No store",
      question: "Completează pentru a dezactiva cache-ul și a obține date fresh:\n```tsx\nconst data = await fetch(url, { cache: '___' });\n```",
      answer: "no-store",
      explanation: "no-store dezactivează cache-ul complet — echivalentul SSR (Server-Side Rendering)."
    },
    {
      difficulty: "medium", name: "Revalidate",
      question: "Completează pentru revalidare la fiecare 60 de secunde (ISR):\n```tsx\nconst data = await fetch(url, { next: { revalidate: ___ } });\n```",
      answer: "60",
      explanation: "revalidate: 60 = ISR (Incremental Static Regeneration) — cache refresh la fiecare 60s."
    },
    {
      difficulty: "medium", name: "Suspense pentru streaming",
      question: "Completează componenta pentru streaming SSR cu Suspense:\n```tsx\n<Suspense fallback={<Loading />}>\n  <___ />\n</Suspense>\n```",
      answer: "AsyncComponent",
      explanation: "Suspense + Server Components async = streaming HTML — conținutul e trimis progresiv."
    },
    {
      difficulty: "hard", name: "unstable_cache",
      question: "Completează funcția Next.js pentru caching de data-fetching arbitrar:\n```tsx\nconst getData = ___(async () => fetch('/api/data'), ['key'], { revalidate: 3600 });\n```",
      answer: "unstable_cache",
      explanation: "unstable_cache (next/cache) permite caching al oricărei funcții async, nu doar fetch — similar React cache()."
    },
  ],
  codings: [
    {
      difficulty: "easy", name: "Static fetch",
      question: "Server Component cu fetch cached (SSG-like).",
      starterCode: "// app/posts/page.tsx\ninterface Post {\n  id: number;\n  title: string;\n}\n\nasync function getPosts(): Promise<Post[]> {\n  // force-cache = generare statică\n  const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=3', {\n    cache: 'force-cache',\n  });\n  return res.json();\n}\n\nexport default async function PostsPage() {\n  const posts = await getPosts();\n  return (\n    <ul className=\"space-y-2\">\n      {posts.map(p => (\n        <li key={p.id} className=\"p-3 border rounded\">{p.title}</li>\n      ))}\n    </ul>\n  );\n}\n",
      expectedOutput: "",
      language: "jsx"
    },
    {
      difficulty: "easy", name: "ISR cu revalidate",
      question: "Pagina cu date revalidate la fiecare 30 secunde (ISR).",
      starterCode: "// app/news/page.tsx\nasync function getNews() {\n  const res = await fetch('https://api.example.com/news', {\n    next: { revalidate: 30 }, // ISR: 30s\n  });\n  if (!res.ok) throw new Error('Failed to fetch');\n  return res.json();\n}\n\nexport default async function NewsPage() {\n  const news = await getNews();\n  return (\n    <div>\n      <h1>Știri recente</h1>\n      {/* news.map(...) */}\n    </div>\n  );\n}\n",
      expectedOutput: "",
      language: "jsx"
    },
    {
      difficulty: "medium", name: "Parallel data fetching",
      question: "Fetch paralel a 2 resurse cu Promise.all în Server Component.",
      starterCode: "// app/dashboard/page.tsx\nasync function getUser(id: string) {\n  await new Promise(r => setTimeout(r, 0)); // simulare\n  return { name: 'Ana', id };\n}\n\nasync function getOrders(userId: string) {\n  await new Promise(r => setTimeout(r, 0)); // simulare\n  return [{ id: 1, total: 99 }, { id: 2, total: 149 }];\n}\n\nexport default async function Dashboard() {\n  // Fetch în paralel — nu secvențial\n  const [user, orders] = await Promise.all([\n    getUser('1'),\n    getOrders('1'),\n  ]);\n  \n  return (\n    <div>\n      <h1>Salut, {user.name}!</h1>\n      <p>Comenzi: {orders.length}</p>\n    </div>\n  );\n}\n",
      expectedOutput: "",
      language: "jsx"
    },
    {
      difficulty: "medium", name: "Suspense streaming",
      question: "Streaming cu Suspense: header imediat, conținut async.",
      starterCode: "import { Suspense } from 'react';\n\nasync function SlowComponent() {\n  await new Promise(r => setTimeout(r, 2000)); // simulare lentă\n  return <div className=\"p-4 bg-green-50\">Date încărcate!</div>;\n}\n\nexport default function Page() {\n  return (\n    <div>\n      {/* Header se afișează imediat */}\n      <h1 className=\"text-2xl font-bold p-4\">Dashboard</h1>\n      \n      {/* Conținut async cu Suspense */}\n      <Suspense fallback={\n        <div className=\"p-4 animate-pulse bg-gray-100 rounded\">Se încarcă...</div>\n      }>\n        <SlowComponent />\n      </Suspense>\n    </div>\n  );\n}\n",
      expectedOutput: "",
      language: "jsx"
    },
    {
      difficulty: "hard", name: "SWR client-side caching",
      question: "Hook SWR pentru date client-side cu revalidare automată.",
      starterCode: "'use client';\nimport useSWR from 'swr';\n\nconst fetcher = (url: string) => fetch(url).then(r => r.json());\n\ninterface User {\n  id: number;\n  name: string;\n  email: string;\n}\n\nexport default function UserProfile({ userId }: { userId: number }) {\n  const { data, error, isLoading, mutate } = useSWR<User>(\n    `/api/users/${userId}`,\n    fetcher,\n    {\n      revalidateOnFocus: true,\n      revalidateOnReconnect: true,\n      refreshInterval: 30000, // 30s\n    }\n  );\n  \n  if (isLoading) return <div className=\"animate-pulse h-10 bg-gray-200 rounded\" />;\n  if (error) return <div className=\"text-red-500\">Eroare la încărcare</div>;\n  \n  return (\n    <div className=\"p-4 border rounded\">\n      <h2 className=\"font-bold\">{data?.name}</h2>\n      <p className=\"text-gray-600\">{data?.email}</p>\n      <button onClick={() => mutate()} className=\"mt-2 text-blue-600 text-sm\">\n        Actualizează\n      </button>\n    </div>\n  );\n}\n",
      expectedOutput: "",
      language: "jsx"
    },
  ]
};

// ══════════════════════════════════════════════════════════════
// NEXT.JS BACKEND TOPICS
// ══════════════════════════════════════════════════════════════

TOPICS["nextjs-be::api"] = {
  fillblanks: [
    {
      difficulty: "easy", name: "GET handler",
      question: "Completează exportul pentru un endpoint GET în App Router:\n```tsx\nexport async function ___(request: Request) {\n  return Response.json({ ok: true });\n}\n```",
      answer: "GET",
      explanation: "Funcțiile exportate GET/POST/PUT/DELETE/PATCH în route.ts devin automat endpoint-uri API."
    },
    {
      difficulty: "easy", name: "NextResponse",
      question: "Completează clasa Next.js pentru a construi răspunsuri API:\n```tsx\nimport { ___ } from 'next/server';\nreturn ___.json({ data });\n```",
      answer: "NextResponse",
      explanation: "NextResponse.json() creează un Response cu Content-Type: application/json și serializes automat."
    },
    {
      difficulty: "medium", name: "Status code",
      question: "Completează pentru a returna status 404:\n```tsx\nreturn NextResponse.json({ error: 'Not Found' }, { ___: 404 });\n```",
      answer: "status",
      explanation: "Al doilea argument al NextResponse.json() acceptă ResponseInit cu status, headers etc."
    },
    {
      difficulty: "medium", name: "Request body",
      question: "Completează pentru a citi body-ul request-ului JSON:\n```tsx\nconst body = await request.___();\n```",
      answer: "json",
      explanation: "request.json() parsează body-ul ca JSON — asincron, poate arunca SyntaxError."
    },
    {
      difficulty: "hard", name: "Route segment config",
      question: "Completează exportul pentru a forța rularea pe Edge runtime:\n```tsx\nexport const ___ = 'edge';\n```",
      answer: "runtime",
      explanation: "export const runtime = 'edge' rulează route handler-ul pe Vercel Edge Network — latență mai mică."
    },
  ],
  codings: [
    {
      difficulty: "easy", name: "GET simplu",
      question: "Endpoint GET /api/health care returnează status și timestamp.",
      starterCode: "// app/api/health/route.ts\nimport { NextResponse } from 'next/server';\n\nexport async function GET() {\n  return NextResponse.json({\n    status: 'ok',\n    timestamp: new Date().toISOString(),\n    version: '1.0.0',\n  });\n}\n",
      expectedOutput: "",
      language: "javascript"
    },
    {
      difficulty: "easy", name: "POST cu validare",
      question: "Endpoint POST /api/users care validează body-ul și returnează erori.",
      starterCode: "// app/api/users/route.ts\nimport { NextRequest, NextResponse } from 'next/server';\n\nexport async function POST(request: NextRequest) {\n  const body = await request.json();\n  \n  if (!body.name || body.name.length < 2) {\n    return NextResponse.json({ error: 'Nume invalid' }, { status: 400 });\n  }\n  if (!body.email?.includes('@')) {\n    return NextResponse.json({ error: 'Email invalid' }, { status: 400 });\n  }\n  \n  // Simulare creare user\n  const user = { id: Date.now(), ...body };\n  return NextResponse.json(user, { status: 201 });\n}\n",
      expectedOutput: "",
      language: "javascript"
    },
    {
      difficulty: "medium", name: "CRUD API",
      question: "API CRUD complet pentru /api/todos cu GET/POST/DELETE.",
      starterCode: "// app/api/todos/route.ts\nimport { NextRequest, NextResponse } from 'next/server';\n\nlet todos = [\n  { id: 1, text: 'Învață Next.js', done: false },\n  { id: 2, text: 'Construiește un proiect', done: false },\n];\n\nexport async function GET() {\n  return NextResponse.json(todos);\n}\n\nexport async function POST(request: NextRequest) {\n  const { text } = await request.json();\n  const todo = { id: Date.now(), text, done: false };\n  todos.push(todo);\n  return NextResponse.json(todo, { status: 201 });\n}\n\n// app/api/todos/[id]/route.ts\nexport async function DELETE(\n  request: NextRequest,\n  { params }: { params: { id: string } }\n) {\n  todos = todos.filter(t => t.id !== parseInt(params.id));\n  return new Response(null, { status: 204 });\n}\n",
      expectedOutput: "",
      language: "javascript"
    },
    {
      difficulty: "medium", name: "API cu headers",
      question: "Endpoint cu CORS headers și rate limit header.",
      starterCode: "// app/api/data/route.ts\nimport { NextRequest, NextResponse } from 'next/server';\n\nexport async function GET(request: NextRequest) {\n  const data = { message: 'Hello from API' };\n  \n  return NextResponse.json(data, {\n    headers: {\n      'Access-Control-Allow-Origin': '*',\n      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',\n      'X-RateLimit-Limit': '100',\n      'X-RateLimit-Remaining': '99',\n      'Cache-Control': 'public, max-age=60',\n    },\n  });\n}\n\nexport async function OPTIONS() {\n  return new Response(null, {\n    status: 200,\n    headers: {\n      'Access-Control-Allow-Origin': '*',\n      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',\n      'Access-Control-Allow-Headers': 'Content-Type, Authorization',\n    },\n  });\n}\n",
      expectedOutput: "",
      language: "javascript"
    },
    {
      difficulty: "hard", name: "Streaming response",
      question: "API cu streaming response (ReadableStream) pentru AI-like output.",
      starterCode: "// app/api/stream/route.ts\nimport { NextRequest } from 'next/server';\n\nexport async function POST(request: NextRequest) {\n  const { prompt } = await request.json();\n  \n  const encoder = new TextEncoder();\n  const words = `Răspuns pentru: ${prompt}`.split(' ');\n  \n  const stream = new ReadableStream({\n    async start(controller) {\n      for (const word of words) {\n        controller.enqueue(encoder.encode(word + ' '));\n        await new Promise(r => setTimeout(r, 50)); // simulate delay\n      }\n      controller.close();\n    },\n  });\n  \n  return new Response(stream, {\n    headers: {\n      'Content-Type': 'text/plain; charset=utf-8',\n      'Transfer-Encoding': 'chunked',\n    },\n  });\n}\n",
      expectedOutput: "",
      language: "javascript"
    },
  ]
};

TOPICS["nextjs-be::actions"] = {
  fillblanks: [
    {
      difficulty: "easy", name: "use server",
      question: "Completează directiva pentru a declara Server Actions:\n```tsx\n'use ___';\nexport async function submitForm(data: FormData) { }\n```",
      answer: "server",
      explanation: "'use server' marchează funcțiile ca Server Actions — rulează pe server, apelabile din client."
    },
    {
      difficulty: "easy", name: "FormData get",
      question: "Completează metoda pentru a extrage câmpul 'email' din FormData:\n```tsx\nconst email = formData.___('email');\n```",
      answer: "get",
      explanation: "formData.get(name) returnează valoarea câmpului — string sau File sau null."
    },
    {
      difficulty: "medium", name: "revalidatePath",
      question: "Completează funcția pentru a invalida cache-ul paginii după mutație:\n```tsx\nimport { ___ } from 'next/cache';\n___(  '/posts');\n```",
      answer: "revalidatePath",
      explanation: "revalidatePath() forțează re-fetch-ul paginii specificate la următoarea cerere."
    },
    {
      difficulty: "medium", name: "redirect",
      question: "Completează pentru a redirecționa după Server Action:\n```tsx\nimport { ___ } from 'next/navigation';\n___('/dashboard');\n```",
      answer: "redirect",
      explanation: "redirect() din next/navigation redirecționează utilizatorul — aruncă o eroare internă (NEXT_REDIRECT)."
    },
    {
      difficulty: "hard", name: "useFormState",
      question: "Completează hook-ul pentru a gestiona starea unui form cu Server Actions:\n```tsx\nconst [state, formAction] = ___(serverAction, initialState);\n```",
      answer: "useFormState",
      explanation: "useFormState() (react-dom) conectează un form la un Server Action și expune starea returnată."
    },
  ],
  codings: [
    {
      difficulty: "easy", name: "Server Action simplă",
      question: "Server Action care primește FormData și logghează datele.",
      starterCode: "// app/actions.ts\n'use server';\n\nexport async function createPost(formData: FormData) {\n  const title = formData.get('title') as string;\n  const content = formData.get('content') as string;\n  \n  if (!title || !content) {\n    return { error: 'Câmpuri obligatorii lipsesc' };\n  }\n  \n  // Simulare salvare în DB\n  const post = { id: Date.now(), title, content, createdAt: new Date() };\n  console.log('Post creat:', post);\n  \n  return { success: true, post };\n}\n",
      expectedOutput: "",
      language: "javascript"
    },
    {
      difficulty: "easy", name: "Form cu Server Action",
      question: "Formular care trimite date la un Server Action.",
      starterCode: "// app/posts/new/page.tsx\nimport { createPost } from '../actions';\n\nexport default function NewPostPage() {\n  return (\n    <form action={createPost} className=\"space-y-4 max-w-md mx-auto p-6\">\n      <div>\n        <label className=\"block text-sm font-medium mb-1\">Titlu</label>\n        <input\n          name=\"title\"\n          required\n          className=\"w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500\"\n        />\n      </div>\n      <div>\n        <label className=\"block text-sm font-medium mb-1\">Conținut</label>\n        <textarea\n          name=\"content\"\n          rows={4}\n          required\n          className=\"w-full border rounded-lg px-3 py-2\"\n        />\n      </div>\n      <button\n        type=\"submit\"\n        className=\"w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700\"\n      >\n        Publică\n      </button>\n    </form>\n  );\n}\n",
      expectedOutput: "",
      language: "jsx"
    },
    {
      difficulty: "medium", name: "Server Action cu revalidare",
      question: "Server Action care salvează și revalidează pagina.",
      starterCode: "// app/actions.ts\n'use server';\nimport { revalidatePath } from 'next/cache';\nimport { redirect } from 'next/navigation';\n\nexport async function deletePost(postId: string) {\n  // Simulare ștergere din DB\n  await new Promise(r => setTimeout(r, 0));\n  \n  // Invalidează cache-ul paginii cu lista de posturi\n  revalidatePath('/posts');\n  \n  // Redirecționează la lista\n  redirect('/posts');\n}\n\nexport async function toggleLike(postId: string, currentLikes: number) {\n  // Simulare update în DB\n  const newLikes = currentLikes + 1;\n  \n  revalidatePath(`/posts/${postId}`);\n  return { likes: newLikes };\n}\n",
      expectedOutput: "",
      language: "javascript"
    },
    {
      difficulty: "medium", name: "useFormStatus pending",
      question: "Buton de submit care afișează loading cu useFormStatus.",
      starterCode: "'use client';\nimport { useFormStatus } from 'react-dom';\n\nfunction SubmitButton() {\n  const { pending } = useFormStatus();\n  \n  return (\n    <button\n      type=\"submit\"\n      disabled={pending}\n      className={`w-full py-2 rounded-lg text-white font-medium transition-colors\n        ${pending\n          ? 'bg-blue-400 cursor-not-allowed'\n          : 'bg-blue-600 hover:bg-blue-700'\n        }`}\n    >\n      {pending ? 'Se trimite...' : 'Trimite'}\n    </button>\n  );\n}\n\nexport default SubmitButton;\n",
      expectedOutput: "",
      language: "jsx"
    },
    {
      difficulty: "hard", name: "Progressive enhancement",
      question: "Form care funcționează fără JS (Server Action) dar și cu JS (client enhancement).",
      starterCode: "'use client';\nimport { useFormState } from 'react-dom';\nimport { createUser } from './actions';\n\ninterface State {\n  errors?: { name?: string; email?: string };\n  success?: boolean;\n}\n\nconst initialState: State = {};\n\nexport default function UserForm() {\n  const [state, formAction] = useFormState(createUser, initialState);\n  \n  if (state.success) {\n    return <div className=\"p-4 bg-green-50 text-green-700 rounded\">User creat!</div>;\n  }\n  \n  return (\n    <form action={formAction} className=\"space-y-4\">\n      <div>\n        <input name=\"name\" placeholder=\"Nume\" className=\"border rounded px-3 py-2 w-full\" />\n        {state.errors?.name && (\n          <p className=\"text-red-500 text-sm mt-1\">{state.errors.name}</p>\n        )}\n      </div>\n      <div>\n        <input name=\"email\" type=\"email\" placeholder=\"Email\" className=\"border rounded px-3 py-2 w-full\" />\n        {state.errors?.email && (\n          <p className=\"text-red-500 text-sm mt-1\">{state.errors.email}</p>\n        )}\n      </div>\n      <button type=\"submit\" className=\"bg-blue-600 text-white px-4 py-2 rounded\">\n        Creează\n      </button>\n    </form>\n  );\n}\n",
      expectedOutput: "",
      language: "jsx"
    },
  ]
};

TOPICS["nextjs-be::auth"] = {
  fillblanks: [
    {
      difficulty: "easy", name: "NextAuth session",
      question: "Completează hook-ul pentru a accesa sesiunea utilizatorului:\n```tsx\nimport { ___ } from 'next-auth/react';\nconst { data: session } = ___();\n```",
      answer: "useSession",
      explanation: "useSession() (next-auth/react) returnează sesiunea curentă în Client Components."
    },
    {
      difficulty: "easy", name: "getServerSession",
      question: "Completează funcția pentru sesiunea din Server Components:\n```tsx\nconst session = await ___( authOptions);\n```",
      answer: "getServerSession",
      explanation: "getServerSession() (next-auth/next) returnează sesiunea pe server — fără hook-uri."
    },
    {
      difficulty: "medium", name: "Protected route",
      question: "Completează pentru a redirecționa utilizatorii neautentificați:\n```tsx\nif (!session) redirect('___');\n```",
      answer: "/login",
      explanation: "Verificarea sesiunii + redirect în Server Component sau middleware protejează rutele."
    },
    {
      difficulty: "medium", name: "Credentials provider",
      question: "Completează numele provider-ului pentru autentificare cu email/parolă:\n```tsx\nproviders: [___({\n  async authorize(credentials) { }\n})]\n```",
      answer: "CredentialsProvider",
      explanation: "CredentialsProvider permite autentificare custom cu email/parolă — verifici tu în authorize()."
    },
    {
      difficulty: "hard", name: "JWT callback",
      question: "Completează callback-ul pentru adăugarea de date custom în JWT:\n```tsx\ncallbacks: {\n  async ___(token, user) {\n    if (user) token.role = user.role;\n    return token;\n  }\n}\n```",
      answer: "jwt",
      explanation: "jwt callback e apelat la creare/refresh JWT — poți adăuga claims custom (role, etc.)."
    },
  ],
  codings: [
    {
      difficulty: "easy", name: "Auth config NextAuth",
      question: "Configurare NextAuth cu Google + GitHub provider.",
      starterCode: "// app/api/auth/[...nextauth]/route.ts\nimport NextAuth from 'next-auth';\nimport GoogleProvider from 'next-auth/providers/google';\nimport GitHubProvider from 'next-auth/providers/github';\n\nconst handler = NextAuth({\n  providers: [\n    GoogleProvider({\n      clientId: process.env.GOOGLE_CLIENT_ID!,\n      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,\n    }),\n    GitHubProvider({\n      clientId: process.env.GITHUB_ID!,\n      clientSecret: process.env.GITHUB_SECRET!,\n    }),\n  ],\n  pages: {\n    signIn: '/login',\n    error: '/auth/error',\n  },\n  callbacks: {\n    async session({ session, token }) {\n      if (session.user) session.user.id = token.sub!;\n      return session;\n    },\n  },\n});\n\nexport { handler as GET, handler as POST };\n",
      expectedOutput: "",
      language: "javascript"
    },
    {
      difficulty: "easy", name: "Protected page",
      question: "Pagină protejată care verifică sesiunea și redirecționează.",
      starterCode: "// app/dashboard/page.tsx\nimport { getServerSession } from 'next-auth';\nimport { redirect } from 'next/navigation';\nimport { authOptions } from '../api/auth/[...nextauth]/route';\n\nexport default async function DashboardPage() {\n  const session = await getServerSession(authOptions);\n  \n  if (!session) {\n    redirect('/login');\n  }\n  \n  return (\n    <div className=\"p-6\">\n      <h1 className=\"text-2xl font-bold\">Dashboard</h1>\n      <p className=\"text-gray-600 mt-2\">\n        Bun venit, {session.user?.name}!\n      </p>\n      <p className=\"text-sm text-gray-500\">Email: {session.user?.email}</p>\n    </div>\n  );\n}\n",
      expectedOutput: "",
      language: "jsx"
    },
    {
      difficulty: "medium", name: "Middleware auth",
      question: "Middleware care protejează rute /dashboard/* și /api/admin/*.",
      starterCode: "// middleware.ts\nimport { withAuth } from 'next-auth/middleware';\nimport { NextResponse } from 'next/server';\n\nexport default withAuth(\n  function middleware(req) {\n    const token = req.nextauth.token;\n    \n    // Protejează rutele admin\n    if (req.nextUrl.pathname.startsWith('/api/admin') && token?.role !== 'admin') {\n      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });\n    }\n    \n    return NextResponse.next();\n  },\n  {\n    callbacks: {\n      authorized: ({ token }) => !!token,\n    },\n  }\n);\n\nexport const config = {\n  matcher: ['/dashboard/:path*', '/api/admin/:path*'],\n};\n",
      expectedOutput: "",
      language: "javascript"
    },
    {
      difficulty: "medium", name: "Role-based access",
      question: "RBAC: verifică rolul utilizatorului pentru acces la funcționalitate.",
      starterCode: "// lib/auth.ts\nimport { getServerSession } from 'next-auth';\nimport { authOptions } from '../app/api/auth/[...nextauth]/route';\n\nexport async function requireRole(role: 'admin' | 'user') {\n  const session = await getServerSession(authOptions);\n  \n  if (!session) {\n    throw new Error('Unauthorized');\n  }\n  \n  if (session.user.role !== role && session.user.role !== 'admin') {\n    throw new Error('Forbidden');\n  }\n  \n  return session;\n}\n\n// Utilizare în Server Action\n'use server';\nexport async function deleteUser(userId: string) {\n  await requireRole('admin'); // Aruncă dacă nu e admin\n  // await db.user.delete({ where: { id: userId } });\n}\n",
      expectedOutput: "",
      language: "javascript"
    },
    {
      difficulty: "hard", name: "OAuth custom callback",
      question: "Callback JWT + session pentru a adăuga role și ID din DB.",
      starterCode: "// app/api/auth/[...nextauth]/route.ts\nimport NextAuth, { type NextAuthOptions } from 'next-auth';\nimport GoogleProvider from 'next-auth/providers/google';\n\nexport const authOptions: NextAuthOptions = {\n  providers: [\n    GoogleProvider({\n      clientId: process.env.GOOGLE_CLIENT_ID!,\n      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,\n    }),\n  ],\n  callbacks: {\n    async jwt({ token, user, account }) {\n      if (user) {\n        // Prima autentificare: adaugă date din DB\n        // const dbUser = await db.user.findUnique({ where: { email: user.email! } });\n        token.role = 'user'; // dbUser?.role || 'user'\n        token.dbId = user.id;\n      }\n      return token;\n    },\n    async session({ session, token }) {\n      if (session.user) {\n        (session.user as any).role = token.role;\n        (session.user as any).id = token.dbId;\n      }\n      return session;\n    },\n  },\n};\n\nconst handler = NextAuth(authOptions);\nexport { handler as GET, handler as POST };\n",
      expectedOutput: "",
      language: "javascript"
    },
  ]
};

TOPICS["nextjs-be::prisma"] = {
  fillblanks: [
    {
      difficulty: "easy", name: "PrismaClient singleton",
      question: "Completează pentru a folosi un singleton PrismaClient în Next.js:\n```tsx\nimport { ___ } from '@prisma/client';\nconst prisma = new ___();\n```",
      answer: "PrismaClient",
      explanation: "PrismaClient ar trebui instanțiat o singură dată (singleton) — în dev, Next.js hot-reload creează multiple instanțe."
    },
    {
      difficulty: "easy", name: "findMany",
      question: "Completează metoda Prisma pentru a obține toți utilizatorii:\n```tsx\nconst users = await prisma.user.___();\n```",
      answer: "findMany",
      explanation: "findMany() returnează toți utilizatorii — acceptă where, orderBy, take, skip, include etc."
    },
    {
      difficulty: "medium", name: "Include relation",
      question: "Completează pentru a include posturile utilizatorului:\n```tsx\nconst user = await prisma.user.findUnique({\n  where: { id },\n  ___: { posts: true },\n});\n```",
      answer: "include",
      explanation: "include face eager loading al relațiilor — alternativa select pentru câmpuri specifice."
    },
    {
      difficulty: "medium", name: "Prisma upsert",
      question: "Completează metoda pentru insert sau update:\n```tsx\nconst user = await prisma.user.___({\n  where: { email },\n  update: { name },\n  create: { email, name },\n});\n```",
      answer: "upsert",
      explanation: "upsert() creează înregistrarea dacă nu există, altfel o actualizează — atomic."
    },
    {
      difficulty: "hard", name: "Transaction",
      question: "Completează metoda Prisma pentru a executa operații atomice:\n```tsx\nconst [user, post] = await prisma.___( [\n  prisma.user.create(...),\n  prisma.post.create(...),\n]);\n```",
      answer: "$transaction",
      explanation: "$transaction() execută multiple operații atomic — dacă una eșuează, toate sunt rollback-ate."
    },
  ],
  codings: [
    {
      difficulty: "easy", name: "CRUD cu Prisma",
      question: "Server Actions CRUD pentru posts cu Prisma.",
      starterCode: "// app/actions/posts.ts\n'use server';\nimport { prisma } from '@/lib/prisma';\nimport { revalidatePath } from 'next/cache';\n\nexport async function getPosts() {\n  return prisma.post.findMany({\n    orderBy: { createdAt: 'desc' },\n    include: { author: { select: { name: true } } },\n  });\n}\n\nexport async function createPost(data: { title: string; content: string; authorId: string }) {\n  const post = await prisma.post.create({\n    data: {\n      title: data.title,\n      content: data.content,\n      author: { connect: { id: data.authorId } },\n    },\n  });\n  revalidatePath('/posts');\n  return post;\n}\n\nexport async function deletePost(id: string) {\n  await prisma.post.delete({ where: { id } });\n  revalidatePath('/posts');\n}\n",
      expectedOutput: "",
      language: "javascript"
    },
    {
      difficulty: "easy", name: "Prisma schema design",
      question: "Schema Prisma pentru blog cu User, Post și Comment.",
      starterCode: "// prisma/schema.prisma\ngenerator client {\n  provider = \"prisma-client-js\"\n}\n\ndatasource db {\n  provider = \"mongodb\"\n  url      = env(\"DATABASE_URL\")\n}\n\nmodel User {\n  id        String   @id @default(auto()) @map(\"_id\") @db.ObjectId\n  email     String   @unique\n  name      String?\n  posts     Post[]\n  createdAt DateTime @default(now())\n}\n\nmodel Post {\n  id        String    @id @default(auto()) @map(\"_id\") @db.ObjectId\n  title     String\n  content   String\n  published Boolean   @default(false)\n  author    User      @relation(fields: [authorId], references: [id])\n  authorId  String    @db.ObjectId\n  comments  Comment[]\n  createdAt DateTime  @default(now())\n}\n\nmodel Comment {\n  id        String   @id @default(auto()) @map(\"_id\") @db.ObjectId\n  text      String\n  post      Post     @relation(fields: [postId], references: [id])\n  postId    String   @db.ObjectId\n  createdAt DateTime @default(now())\n}\n",
      expectedOutput: "",
      language: "javascript"
    },
    {
      difficulty: "medium", name: "Pagination cu Prisma",
      question: "Paginare cu cursor-based (mai eficient decât offset).",
      starterCode: "// lib/db.ts\nimport { prisma } from './prisma';\n\ninterface PageOptions {\n  cursor?: string;\n  take?: number;\n}\n\nexport async function getPostsPage({ cursor, take = 10 }: PageOptions) {\n  const posts = await prisma.post.findMany({\n    take: take + 1, // luăm un extra pentru a știi dacă există next page\n    ...(cursor ? { cursor: { id: cursor }, skip: 1 } : {}),\n    orderBy: { createdAt: 'desc' },\n    where: { published: true },\n    select: { id: true, title: true, createdAt: true },\n  });\n  \n  const hasNext = posts.length > take;\n  return {\n    posts: posts.slice(0, take),\n    nextCursor: hasNext ? posts[take - 1].id : null,\n  };\n}\n",
      expectedOutput: "",
      language: "javascript"
    },
    {
      difficulty: "medium", name: "Prisma cu type safety",
      question: "Tipuri generate Prisma cu inferență TypeScript strictă.",
      starterCode: "// lib/db.ts\nimport { prisma } from './prisma';\nimport type { Prisma } from '@prisma/client';\n\n// Tip inferit automat din include\ntype PostWithAuthor = Prisma.PostGetPayload<{\n  include: { author: { select: { name: true; email: true } } };\n}>;\n\nasync function getPostWithAuthor(id: string): Promise<PostWithAuthor | null> {\n  return prisma.post.findUnique({\n    where: { id },\n    include: {\n      author: { select: { name: true, email: true } },\n    },\n  });\n}\n\n// Tipul PostWithAuthor include automat author: { name, email }\nconst post = await getPostWithAuthor('...');\nif (post) {\n  console.log(post.author.name); // type-safe!\n}\n",
      expectedOutput: "",
      language: "javascript"
    },
    {
      difficulty: "hard", name: "Soft delete cu middleware",
      question: "Soft delete cu Prisma middleware — setează deletedAt în loc de a șterge.",
      starterCode: "// lib/prisma.ts\nimport { PrismaClient } from '@prisma/client';\n\nconst prismaClientSingleton = () => {\n  const prisma = new PrismaClient();\n  \n  // Middleware pentru soft delete\n  prisma.$use(async (params, next) => {\n    if (params.action === 'delete') {\n      // Convertește delete în update\n      params.action = 'update';\n      params.args.data = { deletedAt: new Date() };\n    }\n    if (params.action === 'deleteMany') {\n      params.action = 'updateMany';\n      params.args.data = { deletedAt: new Date() };\n    }\n    if (['findFirst', 'findMany', 'findUnique'].includes(params.action)) {\n      // Exclude soft-deleted în mod automat\n      params.args.where = { ...params.args.where, deletedAt: null };\n    }\n    return next(params);\n  });\n  \n  return prisma;\n};\n\nexport const prisma = prismaClientSingleton();\n",
      expectedOutput: "",
      language: "javascript"
    },
  ]
};

TOPICS["nextjs-be::middleware"] = {
  fillblanks: [
    {
      difficulty: "easy", name: "Middleware file",
      question: "Completează locația fișierului middleware în Next.js App Router:\n`___/middleware.ts` (la root-ul proiectului)",
      answer: "src",
      explanation: "middleware.ts se pune la root sau în src/ — se rulează pe fiecare request înainte de rendering."
    },
    {
      difficulty: "easy", name: "Matcher config",
      question: "Completează exportul pentru a specifica rutele afectate de middleware:\n```tsx\nexport const ___ = {\n  matcher: ['/api/:path*', '/dashboard/:path*'],\n};\n```",
      answer: "config",
      explanation: "config.matcher limitează middleware-ul la rutele specificate — optimizare de performanță."
    },
    {
      difficulty: "medium", name: "NextResponse rewrite",
      question: "Completează metoda pentru rewrite intern (fără redirect vizibil):\n```tsx\nreturn NextResponse.___(new URL('/api/v2' + pathname, request.url));\n```",
      answer: "rewrite",
      explanation: "rewrite() schimbă destinația request-ului intern — URL-ul din browser rămâne neschimbat."
    },
    {
      difficulty: "medium", name: "Request headers",
      question: "Completează pentru a adăuga un header custom la request:\n```tsx\nconst requestHeaders = new Headers(request.headers);\nrequestHeaders.set('x-user-id', userId);\nreturn NextResponse.next({ request: { headers: ___ } });\n```",
      answer: "requestHeaders",
      explanation: "Middleware poate injecta headers în request — utile pentru a pasa info la Server Components."
    },
    {
      difficulty: "hard", name: "Geolocation routing",
      question: "Completează header-ul Vercel pentru a obține țara utilizatorului în middleware:\n```tsx\nconst country = request.headers.get('___-country');\n```",
      answer: "x-vercel",
      explanation: "x-vercel-ip-country e injectat automat de Vercel Edge Network — permite routing geografic."
    },
  ],
  codings: [
    {
      difficulty: "easy", name: "Middleware logging",
      question: "Middleware care loghează metoda și URL-ul fiecărui request.",
      starterCode: "// middleware.ts\nimport { NextRequest, NextResponse } from 'next/server';\n\nexport function middleware(request: NextRequest) {\n  const start = Date.now();\n  const { method, nextUrl } = request;\n  \n  console.log(`[${method}] ${nextUrl.pathname}`);\n  \n  const response = NextResponse.next();\n  response.headers.set('x-response-time', `${Date.now() - start}ms`);\n  \n  return response;\n}\n\nexport const config = {\n  matcher: '/api/:path*',\n};\n",
      expectedOutput: "",
      language: "javascript"
    },
    {
      difficulty: "easy", name: "Auth middleware",
      question: "Middleware care verifică JWT și protejează rutele.",
      starterCode: "// middleware.ts\nimport { NextRequest, NextResponse } from 'next/server';\nimport { jwtVerify } from 'jose'; // sau verify din jsonwebtoken\n\nasync function getTokenPayload(token: string) {\n  try {\n    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);\n    const { payload } = await jwtVerify(token, secret);\n    return payload;\n  } catch { return null; }\n}\n\nexport async function middleware(request: NextRequest) {\n  const token = request.cookies.get('auth-token')?.value\n    || request.headers.get('authorization')?.replace('Bearer ', '');\n  \n  if (!token) {\n    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });\n  }\n  \n  const payload = await getTokenPayload(token);\n  if (!payload) {\n    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });\n  }\n  \n  const requestHeaders = new Headers(request.headers);\n  requestHeaders.set('x-user-id', payload.sub as string);\n  \n  return NextResponse.next({ request: { headers: requestHeaders } });\n}\n\nexport const config = { matcher: '/api/:path*' };\n",
      expectedOutput: "",
      language: "javascript"
    },
    {
      difficulty: "medium", name: "I18n middleware",
      question: "Middleware pentru detecție limbă și redirect cu locale.",
      starterCode: "// middleware.ts\nimport { NextRequest, NextResponse } from 'next/server';\nimport Negotiator from 'negotiator';\n\nconst LOCALES = ['ro', 'en', 'fr'];\nconst DEFAULT_LOCALE = 'ro';\n\nfunction getLocale(request: NextRequest): string {\n  const negotiator = new Negotiator({\n    headers: { 'accept-language': request.headers.get('accept-language') || '' },\n  });\n  const language = negotiator.language(LOCALES);\n  return language || DEFAULT_LOCALE;\n}\n\nexport function middleware(request: NextRequest) {\n  const { pathname } = request.nextUrl;\n  \n  // Skip dacă are deja locale\n  const hasLocale = LOCALES.some(l => pathname.startsWith(`/${l}/`) || pathname === `/${l}`);\n  if (hasLocale) return NextResponse.next();\n  \n  const locale = getLocale(request);\n  return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url));\n}\n\nexport const config = { matcher: ['/((?!_next|api|favicon.ico).*)'] };\n",
      expectedOutput: "",
      language: "javascript"
    },
    {
      difficulty: "medium", name: "Rate limiting middleware",
      question: "Rate limiting în middleware cu Redis/Map în-memorie.",
      starterCode: "// middleware.ts\nimport { NextRequest, NextResponse } from 'next/server';\n\nconst rateMap = new Map<string, { count: number; reset: number }>();\n\nconst LIMIT = 100;\nconst WINDOW = 60 * 1000; // 1 minut\n\nexport function middleware(request: NextRequest) {\n  const ip = request.ip || request.headers.get('x-forwarded-for') || '127.0.0.1';\n  const now = Date.now();\n  \n  const record = rateMap.get(ip);\n  \n  if (!record || now > record.reset) {\n    rateMap.set(ip, { count: 1, reset: now + WINDOW });\n    return NextResponse.next();\n  }\n  \n  if (record.count >= LIMIT) {\n    return NextResponse.json(\n      { error: 'Too Many Requests' },\n      {\n        status: 429,\n        headers: {\n          'Retry-After': Math.ceil((record.reset - now) / 1000).toString(),\n          'X-RateLimit-Limit': LIMIT.toString(),\n          'X-RateLimit-Remaining': '0',\n        },\n      }\n    );\n  }\n  \n  record.count++;\n  return NextResponse.next();\n}\n\nexport const config = { matcher: '/api/:path*' };\n",
      expectedOutput: "",
      language: "javascript"
    },
    {
      difficulty: "hard", name: "A/B testing middleware",
      question: "Middleware A/B testing care distribuie traficul 50/50.",
      starterCode: "// middleware.ts\nimport { NextRequest, NextResponse } from 'next/server';\n\nconst EXPERIMENT = 'homepage-v2';\nconst VARIANTS = ['control', 'variant'];\n\nfunction getVariant(): string {\n  return VARIANTS[Math.floor(Math.random() * VARIANTS.length)];\n}\n\nexport function middleware(request: NextRequest) {\n  const { pathname } = request.nextUrl;\n  \n  if (pathname !== '/') return NextResponse.next();\n  \n  // Citește sau asignă variant\n  const cookieVariant = request.cookies.get(EXPERIMENT)?.value;\n  const variant = cookieVariant || getVariant();\n  \n  // Rewrite la pagina de variant\n  const url = request.nextUrl.clone();\n  url.pathname = variant === 'variant' ? '/landing-v2' : '/';\n  \n  const response = variant === 'variant'\n    ? NextResponse.rewrite(url)\n    : NextResponse.next();\n  \n  // Setează cookie pentru consistență\n  if (!cookieVariant) {\n    response.cookies.set(EXPERIMENT, variant, {\n      maxAge: 60 * 60 * 24 * 30, // 30 zile\n      path: '/',\n    });\n  }\n  \n  // Header pentru analytics\n  response.headers.set('x-experiment-variant', variant);\n  \n  return response;\n}\n\nexport const config = { matcher: '/' };\n",
      expectedOutput: "",
      language: "javascript"
    },
  ]
};

TOPICS["nextjs-be::validation"] = {
  fillblanks: [
    {
      difficulty: "easy", name: "Zod schema",
      question: "Completează importul din librăria de validare:\n```tsx\nimport { ___ } from 'zod';\nconst schema = z.object({ email: z.string().email() });\n```",
      answer: "z",
      explanation: "z este namespace-ul Zod pentru definirea schema-elor de validare tip-safe."
    },
    {
      difficulty: "easy", name: "Zod parse",
      question: "Completează metoda pentru a parsa și valida datele:\n```tsx\nconst result = schema.___(data); // aruncă dacă invalid\n```",
      answer: "parse",
      explanation: "parse() validează și transformă datele; aruncă ZodError la validare eșuată; safeParse() nu aruncă."
    },
    {
      difficulty: "medium", name: "Zod refine",
      question: "Completează metoda pentru validare custom:\n```tsx\nz.string().___(val => val.startsWith('RO'), 'Trebuie să înceapă cu RO')\n```",
      answer: "refine",
      explanation: "refine() adaugă validare custom cu mesaj de eroare personalizat."
    },
    {
      difficulty: "medium", name: "safeParse",
      question: "Completează metoda care nu aruncă excepție la validare eșuată:\n```tsx\nconst { success, data, error } = schema.___(input);\n```",
      answer: "safeParse",
      explanation: "safeParse() returnează { success, data } sau { success: false, error: ZodError } — fără try/catch."
    },
    {
      difficulty: "hard", name: "Zod discriminated union",
      question: "Completează funcția Zod pentru union bazat pe câmp discriminator:\n```tsx\nz.___(\"type\", [\n  z.object({ type: z.literal(\"user\") }),\n  z.object({ type: z.literal(\"admin\") }),\n])\n```",
      answer: "discriminatedUnion",
      explanation: "discriminatedUnion e mai eficient decât union simplu — parsează doar schema cu typul potrivit."
    },
  ],
  codings: [
    {
      difficulty: "easy", name: "Validare schema Zod",
      question: "Validează datele unui formular cu Zod.",
      starterCode: "import { z } from 'zod';\n\nconst UserSchema = z.object({\n  name: z.string().min(2, 'Numele trebuie să aibă minim 2 caractere'),\n  email: z.string().email('Email invalid'),\n  age: z.number().min(18, 'Trebuie să ai minim 18 ani').max(120),\n});\n\ntype User = z.infer<typeof UserSchema>;\n\nfunction validateUser(data: unknown) {\n  const result = UserSchema.safeParse(data);\n  if (!result.success) {\n    return { errors: result.error.flatten().fieldErrors };\n  }\n  return { user: result.data };\n}\n\nconst valid = validateUser({ name: 'Ana', email: 'ana@mail.com', age: 25 });\nconst invalid = validateUser({ name: 'A', email: 'nu-email', age: 15 });\n\nconsole.log('valid:', 'user' in valid);\nconsole.log('invalid:', 'errors' in invalid);\n",
      expectedOutput: "valid: true\ninvalid: true",
      language: "javascript"
    },
    {
      difficulty: "easy", name: "API endpoint cu Zod",
      question: "Route handler cu validare Zod și răspunsuri structurate.",
      starterCode: "// app/api/register/route.ts\nimport { NextRequest, NextResponse } from 'next/server';\nimport { z } from 'zod';\n\nconst RegisterSchema = z.object({\n  email: z.string().email(),\n  password: z.string().min(8).regex(/[A-Z]/, 'Trebuie o literă mare'),\n  name: z.string().min(2),\n});\n\nexport async function POST(request: NextRequest) {\n  const body = await request.json();\n  \n  const result = RegisterSchema.safeParse(body);\n  if (!result.success) {\n    return NextResponse.json(\n      { error: 'Validare eșuată', details: result.error.flatten() },\n      { status: 400 }\n    );\n  }\n  \n  const { email, name } = result.data;\n  // const user = await createUser(result.data);\n  \n  return NextResponse.json({ message: `Utilizator ${name} (${email}) creat!` }, { status: 201 });\n}\n",
      expectedOutput: "",
      language: "javascript"
    },
    {
      difficulty: "medium", name: "Schema transformare",
      question: "Schema Zod cu transformări (trim, lowercase, coerce).",
      starterCode: "import { z } from 'zod';\n\nconst ProductSchema = z.object({\n  name: z.string().trim().min(3),\n  price: z.coerce.number().positive(),\n  category: z.string().toLowerCase(),\n  tags: z.array(z.string()).default([]),\n  publishedAt: z.coerce.date().optional(),\n});\n\nconst raw = {\n  name: '  Laptop  ',\n  price: '999',     // string -> coerce la number\n  category: 'TECH', // -> lowercase\n  publishedAt: '2024-01-15',  // string -> Date\n};\n\nconst product = ProductSchema.parse(raw);\nconsole.log(product.name);        // 'Laptop' (trimmed)\nconsole.log(typeof product.price); // 'number'\nconsole.log(product.category);    // 'tech'\nconsole.log(product.tags);        // []\n",
      expectedOutput: "Laptop\nnumber\ntech\n[]",
      language: "javascript"
    },
    {
      difficulty: "medium", name: "Zod cu Server Actions",
      question: "Server Action care validează cu Zod și returnează erori structurate.",
      starterCode: "'use server';\nimport { z } from 'zod';\nimport { revalidatePath } from 'next/cache';\n\nconst PostSchema = z.object({\n  title: z.string().min(5, 'Titlul trebuie să aibă minim 5 caractere'),\n  content: z.string().min(20, 'Conținutul trebuie să aibă minim 20 caractere'),\n});\n\nexport async function createPost(prevState: unknown, formData: FormData) {\n  const rawData = {\n    title: formData.get('title'),\n    content: formData.get('content'),\n  };\n  \n  const result = PostSchema.safeParse(rawData);\n  \n  if (!result.success) {\n    return {\n      errors: result.error.flatten().fieldErrors,\n      message: 'Validare eșuată',\n    };\n  }\n  \n  // await db.post.create({ data: result.data });\n  revalidatePath('/posts');\n  \n  return { success: true, message: 'Post creat!' };\n}\n",
      expectedOutput: "",
      language: "javascript"
    },
    {
      difficulty: "hard", name: "OpenAPI schema generation",
      question: "Generează schema OpenAPI/JSON Schema din schema Zod.",
      starterCode: "import { z } from 'zod';\nimport { zodToJsonSchema } from 'zod-to-json-schema';\n\nconst UserSchema = z.object({\n  id: z.string().uuid(),\n  name: z.string().min(2).max(50),\n  email: z.string().email(),\n  role: z.enum(['user', 'admin', 'moderator']),\n  age: z.number().int().min(18).max(120).optional(),\n  createdAt: z.date().default(new Date()),\n});\n\nconst jsonSchema = zodToJsonSchema(UserSchema, 'User');\n\nconsole.log(jsonSchema.definitions?.User?.type);\nconsole.log(jsonSchema.definitions?.User?.required?.includes('email'));\nconsole.log(jsonSchema.definitions?.User?.properties?.role?.enum?.length);\n",
      expectedOutput: "object\ntrue\n3",
      language: "javascript"
    },
  ]
};

// ══════════════════════════════════════════════════════════════
// matchTopic — improved with normalize() and per-lesson routing
// ══════════════════════════════════════════════════════════════

function matchTopic(title, moduleSlug) {
  const t = normalize(title);
  const s = moduleSlug;

  // ── C++ ────────────────────────────────────────────────────
  if (s === "cpp") {
    if (t.includes("lambda") || t.includes("functor") || t.includes("higher"))
      return TOPICS["cpp::lambda"];
    if (t.includes("thread") || t.includes("concurenta") || t.includes("concurrency") ||
        t.includes("coroutine") || t.includes("async"))
      return TOPICS["cpp::concurrency"];
    if (t.includes("template") || t.includes("generic") || t.includes("sfinae") || t.includes("concept"))
      return TOPICS["cpp::templates"];
    if (t.includes("stl") || t.includes("container") || t.includes("algorithm") ||
        t.includes("vector") || t.includes("string") || t.includes("structuri de date"))
      return TOPICS["cpp::stl"];
    if (t.includes("smart pointer") || t.includes("smartpointer"))
      return TOPICS["cpp::smart_ptrs"];
    if (t.includes("exceptie") || t.includes("exception"))
      return TOPICS["cpp::exceptions"];
    if (t.includes("mostenire") || t.includes("polimorfism"))
      return TOPICS["cpp::mostenire"];
    if (t.includes("clase") || t.includes("obiecte") || t.includes("oop") || t.includes("constructor"))
      return TOPICS["cpp::oop"];
    if (t.includes("modern") || t.includes("move") || t.includes("range") ||
        t.includes("c++20") || t.includes("c++23"))
      return TOPICS["cpp::modern"];
    return TOPICS["cpp::intro"];
  }

  // ── Java ───────────────────────────────────────────────────
  if (s === "java") {
    if (t.includes("stream") || t.includes("functional"))
      return TOPICS["java::streams"];
    if (t.includes("thread") || t.includes("concurenta") || t.includes("concurrency") ||
        t.includes("virtual thread") || t.includes("completable"))
      return TOPICS["java::modern"];
    if (t.includes("spring") || t.includes("boot") || t.includes("jpa") ||
        t.includes("hibernate") || t.includes("kafka") || t.includes("microservice"))
      return TOPICS["java::spring"];
    if (t.includes("colectii") || t.includes("collection") || t.includes("arraylist") ||
        t.includes("hashmap") || t.includes("deque"))
      return TOPICS["java::colectii"];
    if (t.includes("exceptie") || t.includes("exception"))
      return TOPICS["java::exceptii"];
    if (t.includes("mostenire") || t.includes("polimorfism") || t.includes("interfata") ||
        t.includes("abstract") || t.includes("sealed"))
      return TOPICS["java::mostenire"];
    if (t.includes("clase") || t.includes("obiecte") || t.includes("oop") ||
        t.includes("constructor") || t.includes("singleton") || t.includes("builder"))
      return TOPICS["java::oop"];
    if (t.includes("modern") || t.includes("record") || t.includes("pattern matching") ||
        t.includes("optional"))
      return TOPICS["java::modern"];
    return TOPICS["java::intro"];
  }

  // ── C# ────────────────────────────────────────────────────
  if (s === "csharp") {
    if (t.includes("linq") || t.includes("lambda"))
      return TOPICS["csharp::linq"];
    if (t.includes("async") || t.includes("await") || t.includes("task") ||
        t.includes("grpc") || t.includes("signalr"))
      return TOPICS["csharp::async"];
    if (t.includes("modern") || t.includes("record") || t.includes("pattern matching") ||
        t.includes("blazor") || t.includes("nullable"))
      return TOPICS["csharp::modern"];
    if (t.includes("mostenire") || t.includes("interfata") || t.includes("abstract") ||
        t.includes("polimorfism"))
      return TOPICS["csharp::mostenire"];
    if (t.includes("clase") || t.includes("obiecte") || t.includes("oop") ||
        t.includes("proprietate") || t.includes("constructor"))
      return TOPICS["csharp::oop"];
    if (t.includes("colectii") || t.includes("collection") || t.includes("list") ||
        t.includes("dictionary") || t.includes("generic"))
      return TOPICS["csharp::colectii"];
    return TOPICS["csharp::intro"];
  }

  // ── PHP ───────────────────────────────────────────────────
  if (s === "php") {
    if (t.includes("oop") || t.includes("clase") || t.includes("obiecte") ||
        t.includes("mostenire") || t.includes("interfata") || t.includes("trait") ||
        t.includes("laravel") || t.includes("eloquent") || t.includes("mvc") ||
        t.includes("design pattern") || t.includes("composer"))
      return TOPICS["php::oop"];
    if (t.includes("pdo") || t.includes("mysql") || t.includes("baza de date") ||
        t.includes("sql") || t.includes("conexiune"))
      return TOPICS["php::pdo"];
    if (t.includes("formul") || t.includes("sesiune") || t.includes("cookie") ||
        t.includes("autentificare") || t.includes("auth") || t.includes("jwt") ||
        t.includes("validare") || t.includes("sanitizare") || t.includes("post") ||
        t.includes("get") || t.includes("input"))
      return TOPICS["php::forms"];
    if (t.includes("array") || t.includes("tablou"))
      return TOPICS["php::arrays"];
    if (t.includes("string") || t.includes("text") || t.includes("regex") ||
        t.includes("expresii regulate"))
      return TOPICS["php::arrays"]; // fallback to arrays if no string topic
    return TOPICS["php::intro"];
  }

  // ── Tailwind ──────────────────────────────────────────────
  if (s === "tailwind") {
    if (t.includes("dark mode") || t.includes("darkmode") || t.includes("customizare") ||
        t.includes("design system") || t.includes("theme") || t.includes("plugin") ||
        t.includes("shadcn") || t.includes("v4"))
      return TOPICS["tailwind::dark"];
    if (t.includes("hover") || t.includes("focus") || t.includes("group") ||
        t.includes("peer") || t.includes("animatii") || t.includes("animat") ||
        t.includes("transition") || t.includes("stare"))
      return TOPICS["tailwind::states"];
    if (t.includes("grid") || t.includes("flex") || t.includes("layout") ||
        t.includes("sidebar"))
      return TOPICS["tailwind::layout"];
    if (t.includes("responsive") || t.includes("breakpoint") || t.includes("mobil") ||
        t.includes("next.js") || t.includes("sassdash"))
      return TOPICS["tailwind::responsive"];
    return TOPICS["tailwind::utilities"];
  }

  // ── Cybersecurity ─────────────────────────────────────────
  if (s === "cybersecurity") {
    if (t.includes("xss") || t.includes("cross-site scripting") || t.includes("scripting"))
      return TOPICS["cybersecurity::xss"];
    if (t.includes("sql injection") || t.includes("sqli") || t.includes("injection"))
      return TOPICS["cybersecurity::sqli"];
    if (t.includes("autentificare") || t.includes("auth") || t.includes("parola") ||
        t.includes("bcrypt") || t.includes("jwt") || t.includes("token") ||
        t.includes("session") || t.includes("oauth"))
      return TOPICS["cybersecurity::auth"];
    if (t.includes("cripto") || t.includes("crypto") || t.includes("encriptare") ||
        t.includes("hash") || t.includes("aes") || t.includes("rsa") ||
        t.includes("blockchain") || t.includes("semnatura"))
      return TOPICS["cybersecurity::crypto"];
    if (t.includes("owasp") || t.includes("top 10") || t.includes("idor") ||
        t.includes("ssrf") || t.includes("xxe") || t.includes("vulnerabilitat"))
      return TOPICS["cybersecurity::owasp"];
    if (t.includes("retea") || t.includes("network") || t.includes("firewall") ||
        t.includes("vpn") || t.includes("https") || t.includes("pentest") ||
        t.includes("recon") || t.includes("tool") || t.includes("red team") ||
        t.includes("forensic") || t.includes("malware") || t.includes("cloud") ||
        t.includes("ctf"))
      return TOPICS["cybersecurity::network"];
    return TOPICS["cybersecurity::intro"];
  }

  // ── Next.js Frontend ──────────────────────────────────────
  if (s === "nextjs-frontend") {
    if (t.includes("performanta") || t.includes("image") || t.includes("font") ||
        t.includes("optimiz") || t.includes("seo") || t.includes("metadata") ||
        t.includes("lazy") || t.includes("bundle"))
      return TOPICS["nextjs-fe::performance"] || TOPICS["nextjs-fe::data"];
    if (t.includes("form") || t.includes("server action") || t.includes("validare"))
      return TOPICS["nextjs-fe::forms"] || TOPICS["nextjs-fe::data"];
    if (t.includes("fetch") || t.includes("data fetch") || t.includes("suspense") ||
        t.includes("streaming") || t.includes("cache") || t.includes("swr") ||
        t.includes("zustand") || t.includes("state management"))
      return TOPICS["nextjs-fe::data"];
    if (t.includes("layout") || t.includes("template") || t.includes("nested") ||
        t.includes("slot") || t.includes("intercepting") || t.includes("parallel route"))
      return TOPICS["nextjs-fe::layouts"];
    if (t.includes("server component") || t.includes("client component") ||
        t.includes("componenta") || t.includes("state") || t.includes("hook") ||
        t.includes("react server"))
      return TOPICS["nextjs-fe::components"];
    if (t.includes("i18n") || t.includes("internationalizare") || t.includes("testing") ||
        t.includes("storybook") || t.includes("framer") || t.includes("animatii") ||
        t.includes("advanced"))
      return TOPICS["nextjs-fe::data"]; // fallback
    return TOPICS["nextjs-fe::routing"];
  }

  // ── Next.js Backend ───────────────────────────────────────
  if (s === "nextjs-backend") {
    if (t.includes("stripe") || t.includes("payment") || t.includes("queue") ||
        t.includes("job") || t.includes("cron") || t.includes("rate limit") ||
        t.includes("monitoring") || t.includes("log") || t.includes("websocket") ||
        t.includes("email") || t.includes("file upload") || t.includes("background") ||
        t.includes("advanced"))
      return TOPICS["nextjs-be::middleware"]; // best fallback
    if (t.includes("autentificare") || t.includes("auth") || t.includes("nextauth") ||
        t.includes("jwt") || t.includes("session") || t.includes("oauth"))
      return TOPICS["nextjs-be::auth"];
    if (t.includes("prisma") || t.includes("baza de date") || t.includes("database") ||
        t.includes("mongodb"))
      return TOPICS["nextjs-be::prisma"];
    if (t.includes("middleware") || t.includes("edge") || t.includes("cookie") ||
        t.includes("header") || t.includes("deploy") || t.includes("environment"))
      return TOPICS["nextjs-be::middleware"];
    if (t.includes("validare") || t.includes("zod") || t.includes("eroare") ||
        t.includes("validation"))
      return TOPICS["nextjs-be::validation"];
    if (t.includes("server action") || t.includes("action") || t.includes("form"))
      return TOPICS["nextjs-be::actions"];
    if (t.includes("cache") || t.includes("revalidat") || t.includes("streaming") ||
        t.includes("edge runtime"))
      return TOPICS["nextjs-be::api"];
    return TOPICS["nextjs-be::api"];
  }

  return null; // modulele Python/HTML/CSS/C sunt gestionate de seed-quality.js
}

// ══════════════════════════════════════════════════════════════
// MAIN — procesează doar modulele problematice
// ══════════════════════════════════════════════════════════════

const TARGET_MODULES = new Set([
  "cpp", "java", "csharp", "php",
  "tailwind", "cybersecurity",
  "nextjs-frontend", "nextjs-backend",
]);

const DIFF_ORDER = { easy: 0, medium: 1, hard: 2 };

async function main() {
  const modules = await p.module.findMany({
    where: { slug: { in: [...TARGET_MODULES] } },
    include: {
      lessons: { include: { tasks: true }, orderBy: { order: "asc" } },
    },
    orderBy: { order: "asc" },
  });

  const lang = (slug) => MODULE_LANG[slug] || "javascript";

  let replaced = 0;
  let skipped = 0;

  for (const mod of modules) {
    console.log(`\nModul: ${mod.slug} (${mod.lessons.length} lecții)`);

    for (const lesson of mod.lessons) {
      const topic = matchTopic(lesson.title, mod.slug);

      if (!topic) {
        skipped++;
        continue;
      }

      // Șterge fillblanks + codings existente
      await p.task.deleteMany({
        where: { lessonId: lesson.id, type: { in: ["fillblank", "coding"] } },
      });

      // Reordonează quiz-urile 1-5 (easy→medium→hard) + shuffle opțiuni
      const quizTasks = await p.task.findMany({
        where: { lessonId: lesson.id, type: "quiz" },
        orderBy: { number: "asc" },
      });

      if (quizTasks.length > 5) {
        const excess = quizTasks.slice(5);
        await p.task.deleteMany({ where: { id: { in: excess.map((t) => t.id) } } });
      }

      const remaining = quizTasks
        .slice(0, 5)
        .sort((a, b) => (DIFF_ORDER[a.difficulty] ?? 1) - (DIFF_ORDER[b.difficulty] ?? 1));

      for (let i = 0; i < remaining.length; i++) {
        const t = remaining[i];
        const opts = t.options?.length ? [...t.options] : [];
        for (let j = opts.length - 1; j > 0; j--) {
          const k = Math.floor(Math.random() * (j + 1));
          [opts[j], opts[k]] = [opts[k], opts[j]];
        }
        await p.task.update({
          where: { id: t.id },
          data: { number: i + 1, options: opts },
        });
      }

      // Inserează fillblanks (numerele 6-10)
      let num = 6;
      for (const f of topic.fillblanks) {
        await p.task.create({
          data: {
            lessonId: lesson.id,
            number: num++,
            type: "fillblank",
            difficulty: f.difficulty,
            name: f.name,
            question: f.question,
            answer: f.answer.toString().trim(),
            explanation: f.explanation || null,
            options: [],
            language: lang(mod.slug),
          },
        });
      }

      // Inserează codings (numerele 11-15)
      for (const c of topic.codings) {
        await p.task.create({
          data: {
            lessonId: lesson.id,
            number: num++,
            type: "coding",
            difficulty: c.difficulty,
            name: c.name,
            question: c.question,
            answer: "",
            starterCode: c.starterCode,
            expectedOutput: (c.expectedOutput || "").trim(),
            options: [],
            language: c.language || lang(mod.slug),
          },
        });
      }

      replaced += topic.fillblanks.length + topic.codings.length;
    }
  }

  console.log(`\n${"=".repeat(50)}`);
  console.log(`Înlocuite: ${replaced} task-uri`);
  console.log(`Sărite:    ${skipped} lecții`);
  console.log("=".repeat(50));
}

main()
  .catch(console.error)
  .finally(() => p.$disconnect());
