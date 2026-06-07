"use strict";
require("dotenv").config({ path: ".env" });
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const FIXES = [
  // ─── 6. Input și conversii ───────────────────────────────────────────────
  {
    lessonId: "69fb7750023e09d08efe04ca",
    name: "6. Input și conversii",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează: Convertește un String în int în C#.\n```csharp\nstring s = \"42\";\nint n = int.___( s );\nConsole.WriteLine(n);\n```",
        options: [], answer: "Parse",
        starterCode: "", language: "csharp", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează: Citește o linie din consolă.\n```csharp\nstring linie = Console.___();\nConsole.WriteLine(linie);\n```",
        options: [], answer: "ReadLine",
        starterCode: "", language: "csharp", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează: Convertește la int cu metoda Convert.\n```csharp\nstring s = \"100\";\nint n = Convert.___( s );\nConsole.WriteLine(n);\n```",
        options: [], answer: "ToInt32",
        starterCode: "", language: "csharp", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează: Convertește un int la string.\n```csharp\nint n = 55;\nstring s = n.___();\nConsole.WriteLine(s);\n```",
        options: [], answer: "ToString",
        starterCode: "", language: "csharp", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează: Parsează un double din string.\n```csharp\nstring s = \"3.14\";\ndouble d = double.___( s );\nConsole.WriteLine(d);\n```",
        options: [], answer: "Parse",
        starterCode: "", language: "csharp", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Convertește String-urile \"15\" și \"25\" în int, adună-le și afișează suma.",
        starterCode: "using System;\nclass Program {\n  static void Main() {\n    string a = \"15\";\n    string b = \"25\";\n    int suma = int.Parse(a) + int.Parse(b);\n    Console.WriteLine(suma);\n  }\n}",
        language: "csharp", expectedOutput: "40",
        options: [], answer: "40"
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Convertește int-ul 2024 la string și afișează cu prefix \"An: \".",
        starterCode: "using System;\nclass Program {\n  static void Main() {\n    int an = 2024;\n    string s = \"An: \" + an.ToString();\n    Console.WriteLine(s);\n  }\n}",
        language: "csharp", expectedOutput: "An: 2024",
        options: [], answer: "An: 2024"
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Convertește String-ul \"9.81\" în double și afișează dublul valorii.",
        starterCode: "using System;\nclass Program {\n  static void Main() {\n    string s = \"9.81\";\n    double d = double.Parse(s);\n    Console.WriteLine(d * 2);\n  }\n}",
        language: "csharp", expectedOutput: "19.62",
        options: [], answer: "19.62"
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Afișează valoarea maximă dintre 47 și 83 folosind Math.Max.",
        starterCode: "using System;\nclass Program {\n  static void Main() {\n    int a = 47;\n    int b = 83;\n    Console.WriteLine(Math.Max(a, b));\n  }\n}",
        language: "csharp", expectedOutput: "83",
        options: [], answer: "83"
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Convertește int-ul 100 la long, float și double și afișează fiecare pe câte o linie.",
        starterCode: "using System;\nclass Program {\n  static void Main() {\n    int n = 100;\n    long l = (long)n;\n    float f = (float)n;\n    double d = (double)n;\n    Console.WriteLine(l);\n    Console.WriteLine(f);\n    Console.WriteLine(d);\n  }\n}",
        language: "csharp", expectedOutput: "100\n100\n100",
        options: [], answer: "100\n100\n100"
      }
    ]
  },
  // ─── 7. Condiții și bucle (foreach, switch expression) ───────────────────
  {
    lessonId: "69fb7752023e09d08efe04d6",
    name: "7. Condiții și bucle (foreach, switch expression)",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează: Switch expression cu arrow în C# 8+.\n```csharp\nint zi = 6;\nstring tip = zi ___ {\n  6 or 7 => \"Weekend\",\n  _ => \"Zi de lucru\"\n};\n```",
        options: [], answer: "switch",
        starterCode: "", language: "csharp", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează: foreach iterează o colecție.\n```csharp\nint[] arr = {1, 2, 3};\n___ (int x in arr) Console.WriteLine(x);\n```",
        options: [], answer: "foreach",
        starterCode: "", language: "csharp", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează: Bucla do-while execută minim o dată.\n```csharp\nint i = 0;\n___ {\n  Console.WriteLine(i++);\n} while (i < 3);\n```",
        options: [], answer: "do",
        starterCode: "", language: "csharp", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează: Ieși din buclă cu keyword-ul corect.\n```csharp\nfor (int i = 0; i < 10; i++) {\n  if (i == 5) ___;\n  Console.WriteLine(i);\n}\n```",
        options: [], answer: "break",
        starterCode: "", language: "csharp", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează: Sari la iterația următoare.\n```csharp\nfor (int i = 0; i < 5; i++) {\n  if (i % 2 == 0) ___;\n  Console.WriteLine(i);\n}\n```",
        options: [], answer: "continue",
        starterCode: "", language: "csharp", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Folosind foreach, afișează suma elementelor din array-ul {5, 10, 15, 20}.",
        starterCode: "using System;\nclass Program {\n  static void Main() {\n    int[] arr = {5, 10, 15, 20};\n    int suma = 0;\n    foreach (int x in arr) suma += x;\n    Console.WriteLine(suma);\n  }\n}",
        language: "csharp", expectedOutput: "50",
        options: [], answer: "50"
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Folosind switch expression, afișează dacă ziua 7 este \"Weekend\" sau \"Zi de lucru\".",
        starterCode: "using System;\nclass Program {\n  static void Main() {\n    int zi = 7;\n    string tip = zi switch {\n      6 or 7 => \"Weekend\",\n      _ => \"Zi de lucru\"\n    };\n    Console.WriteLine(tip);\n  }\n}",
        language: "csharp", expectedOutput: "Weekend",
        options: [], answer: "Weekend"
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Afișează numerele de la 1 la 5 folosind bucla while.",
        starterCode: "using System;\nclass Program {\n  static void Main() {\n    int i = 1;\n    while (i <= 5) {\n      Console.WriteLine(i);\n      i++;\n    }\n  }\n}",
        language: "csharp", expectedOutput: "1\n2\n3\n4\n5",
        options: [], answer: "1\n2\n3\n4\n5"
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Afișează toate numerele impare din 1-9 folosind for și continue.",
        starterCode: "using System;\nclass Program {\n  static void Main() {\n    for (int i = 1; i <= 9; i++) {\n      if (i % 2 == 0) continue;\n      Console.WriteLine(i);\n    }\n  }\n}",
        language: "csharp", expectedOutput: "1\n3\n5\n7\n9",
        options: [], answer: "1\n3\n5\n7\n9"
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Calculează și afișează factorialul lui 5 folosind un for loop.",
        starterCode: "using System;\nclass Program {\n  static void Main() {\n    int result = 1;\n    for (int i = 1; i <= 5; i++) result *= i;\n    Console.WriteLine(result);\n  }\n}",
        language: "csharp", expectedOutput: "120",
        options: [], answer: "120"
      }
    ]
  },
  // ─── 8. Metode (static, params, ref, out) ───────────────────────────────
  {
    lessonId: "69fb7754023e09d08efe04e2",
    name: "8. Metode (static, params, ref, out)",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează: Metodă statică care nu necesită instanță.\n```csharp\npublic ___ int Aduna(int a, int b) { return a + b; }\n```",
        options: [], answer: "static",
        starterCode: "", language: "csharp", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează: Parametru care permite modificarea variabilei originale.\n```csharp\npublic void Incrementeaza(___ int x) { x++; }\n```",
        options: [], answer: "ref",
        starterCode: "", language: "csharp", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează: Parametru de ieșire — metodă care returnează 2 valori.\n```csharp\npublic void ImpDivid(int a, int b, ___ int cat, out int rest) {\n  cat = a / b; rest = a % b;\n}\n```",
        options: [], answer: "out",
        starterCode: "", language: "csharp", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează: Parametru care acceptă număr variabil de argumente.\n```csharp\npublic int Suma(___ int[] numere) {\n  int s = 0; foreach (var n in numere) s += n;\n  return s;\n}\n```",
        options: [], answer: "params",
        starterCode: "", language: "csharp", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează: Metodă care returnează void nu returnează nimic.\n```csharp\npublic ___ Afiseaza(string mesaj) {\n  Console.WriteLine(mesaj);\n}\n```",
        options: [], answer: "void",
        starterCode: "", language: "csharp", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Definește o metodă statică Patrat care returnează pătratulul unui număr. Afișează Patrat(7).",
        starterCode: "using System;\nclass Program {\n  static int Patrat(int n) => n * n;\n  static void Main() {\n    Console.WriteLine(Patrat(7));\n  }\n}",
        language: "csharp", expectedOutput: "49",
        options: [], answer: "49"
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Folosește params pentru a suma un număr variabil de argumente: Suma(1,2,3,4,5).",
        starterCode: "using System;\nclass Program {\n  static int Suma(params int[] n) { int s=0; foreach(var x in n) s+=x; return s; }\n  static void Main() {\n    Console.WriteLine(Suma(1,2,3,4,5));\n  }\n}",
        language: "csharp", expectedOutput: "15",
        options: [], answer: "15"
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Folosește `out` pentru a returna câtul și restul împărțirii 17/5. Afișează câtul și restul pe linii separate.",
        starterCode: "using System;\nclass Program {\n  static void ImpDiv(int a, int b, out int cat, out int rest) {\n    cat = a / b; rest = a % b;\n  }\n  static void Main() {\n    ImpDiv(17, 5, out int cat, out int rest);\n    Console.WriteLine(cat);\n    Console.WriteLine(rest);\n  }\n}",
        language: "csharp", expectedOutput: "3\n2",
        options: [], answer: "3\n2"
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Folosește `ref` pentru a dubla o variabilă în afara metodei. Afișează valoarea după dublare (inițial 10 -> 20).",
        starterCode: "using System;\nclass Program {\n  static void Dubleaza(ref int x) { x *= 2; }\n  static void Main() {\n    int val = 10;\n    Dubleaza(ref val);\n    Console.WriteLine(val);\n  }\n}",
        language: "csharp", expectedOutput: "20",
        options: [], answer: "20"
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Creează o metodă cu parametru opțional (valoare default) și apeleaz-o fără argument. Afișează rezultatul pentru Salut(\"Lume\").",
        starterCode: "using System;\nclass Program {\n  static string Salut(string nume = \"Lume\") => \"Salut, \" + nume;\n  static void Main() {\n    Console.WriteLine(Salut());\n  }\n}",
        language: "csharp", expectedOutput: "Salut, Lume",
        options: [], answer: "Salut, Lume"
      }
    ]
  },
  // ─── 10. Generice (Generics) ─────────────────────────────────────────────
  {
    lessonId: "69fb7757023e09d08efe04fa",
    name: "10. Generice (Generics)",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează: Declară o clasă generică cu tipul T.\n```csharp\npublic class Cutie<___> {\n  public T Valoare { get; set; }\n}\n```",
        options: [], answer: "T",
        starterCode: "", language: "csharp", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează: Restricționează T la tipuri clasă.\n```csharp\npublic class Repo<T> where T : ___  { ... }\n```",
        options: [], answer: "class",
        starterCode: "", language: "csharp", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează: Declară un Dictionary generic.\n```csharp\nDictionary<___, int> scor = new Dictionary<string, int>();\n```",
        options: [], answer: "string",
        starterCode: "", language: "csharp", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează: Metodă generică cu tip inferit.\n```csharp\npublic static ___ Afiseaza<T>(T val) {\n  Console.WriteLine(val);\n}\n```",
        options: [], answer: "void",
        starterCode: "", language: "csharp", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează: List<T> tipul colecției generice.\n```csharp\nList<___> lista = new List<string>();\nlista.Add(\"Hello\");\n```",
        options: [], answer: "string",
        starterCode: "", language: "csharp", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Creează un List<string> cu 3 limbaje și afișează-le pe linii separate.",
        starterCode: "using System;\nusing System.Collections.Generic;\nclass Program {\n  static void Main() {\n    var lista = new List<string> { \"C#\", \"Java\", \"Python\" };\n    foreach (var s in lista) Console.WriteLine(s);\n  }\n}",
        language: "csharp", expectedOutput: "C#\nJava\nPython",
        options: [], answer: "C#\nJava\nPython"
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Creează un List<int> cu valorile 10, 20, 30 și afișează suma lor.",
        starterCode: "using System;\nusing System.Collections.Generic;\nclass Program {\n  static void Main() {\n    var lista = new List<int> { 10, 20, 30 };\n    int suma = 0;\n    foreach (var x in lista) suma += x;\n    Console.WriteLine(suma);\n  }\n}",
        language: "csharp", expectedOutput: "60",
        options: [], answer: "60"
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Creează un Dictionary<string, int> cu 3 capitalele și populatia lor. Afișează populația pentru \"Bucuresti\".",
        starterCode: "using System;\nusing System.Collections.Generic;\nclass Program {\n  static void Main() {\n    var dict = new Dictionary<string, int> {\n      { \"Bucuresti\", 2000000 },\n      { \"Cluj\", 300000 },\n      { \"Iasi\", 350000 }\n    };\n    Console.WriteLine(dict[\"Bucuresti\"]);\n  }\n}",
        language: "csharp", expectedOutput: "2000000",
        options: [], answer: "2000000"
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Verifică dacă un List<int> conține valoarea 42 și afișează True sau False.",
        starterCode: "using System;\nusing System.Collections.Generic;\nclass Program {\n  static void Main() {\n    var lista = new List<int> { 10, 42, 7 };\n    Console.WriteLine(lista.Contains(42));\n  }\n}",
        language: "csharp", expectedOutput: "True",
        options: [], answer: "True"
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Afișează dimensiunea unui List<string> după adăugarea a 4 elemente.",
        starterCode: "using System;\nusing System.Collections.Generic;\nclass Program {\n  static void Main() {\n    var lista = new List<string> { \"a\", \"b\", \"c\", \"d\" };\n    Console.WriteLine(lista.Count);\n  }\n}",
        language: "csharp", expectedOutput: "4",
        options: [], answer: "4"
      }
    ]
  },
  // ─── 12. Recursivitate ───────────────────────────────────────────────────
  {
    lessonId: "69fb775b023e09d08efe0512",
    name: "12. Recursivitate",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează: Cazul de bază al factorialului recursiv.\n```csharp\nstatic int Factorial(int n) {\n  if (n == ___) return 1;\n  return n * Factorial(n - 1);\n}\n```",
        options: [], answer: "0",
        starterCode: "", language: "csharp", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează: Apelul recursiv în Fibonacci.\n```csharp\nstatic int Fib(int n) {\n  if (n <= 1) return n;\n  return ___(n-1) + Fib(n-2);\n}\n```",
        options: [], answer: "Fib",
        starterCode: "", language: "csharp", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează: Suma recursivă a primelor n numere.\n```csharp\nstatic int Suma(int n) {\n  if (n == 0) return 0;\n  return n + ___( n - 1 );\n}\n```",
        options: [], answer: "Suma",
        starterCode: "", language: "csharp", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează: Fiecare apel recursiv trebuie să ajungă la cazul ___.\n```csharp\n// fara caz de baza -> ___StackOverflowException\n```",
        options: [], answer: "de baza",
        starterCode: "", language: "csharp", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează: Puterea unui număr prin recursivitate.\n```csharp\nstatic int Putere(int b, int e) {\n  if (e == ___) return 1;\n  return b * Putere(b, e - 1);\n}\n```",
        options: [], answer: "0",
        starterCode: "", language: "csharp", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Calculează și afișează factorialul lui 6 folosind o metodă recursivă.",
        starterCode: "using System;\nclass Program {\n  static int Factorial(int n) => n == 0 ? 1 : n * Factorial(n - 1);\n  static void Main() {\n    Console.WriteLine(Factorial(6));\n  }\n}",
        language: "csharp", expectedOutput: "720",
        options: [], answer: "720"
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Afișează al 7-lea număr Fibonacci (0-indexat) folosind recursivitate. Fib(0)=0, Fib(1)=1.",
        starterCode: "using System;\nclass Program {\n  static int Fib(int n) => n <= 1 ? n : Fib(n-1) + Fib(n-2);\n  static void Main() {\n    Console.WriteLine(Fib(7));\n  }\n}",
        language: "csharp", expectedOutput: "13",
        options: [], answer: "13"
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Calculează suma primelor 10 numere naturale recursiv și afișează rezultatul.",
        starterCode: "using System;\nclass Program {\n  static int Suma(int n) => n == 0 ? 0 : n + Suma(n - 1);\n  static void Main() {\n    Console.WriteLine(Suma(10));\n  }\n}",
        language: "csharp", expectedOutput: "55",
        options: [], answer: "55"
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Calculează 2 la puterea 8 recursiv și afișează rezultatul.",
        starterCode: "using System;\nclass Program {\n  static int Putere(int b, int e) => e == 0 ? 1 : b * Putere(b, e - 1);\n  static void Main() {\n    Console.WriteLine(Putere(2, 8));\n  }\n}",
        language: "csharp", expectedOutput: "256",
        options: [], answer: "256"
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Numără câte cifre are numărul 98765 recursiv și afișează rezultatul.",
        starterCode: "using System;\nclass Program {\n  static int Cifre(int n) => n < 10 ? 1 : 1 + Cifre(n / 10);\n  static void Main() {\n    Console.WriteLine(Cifre(98765));\n  }\n}",
        language: "csharp", expectedOutput: "5",
        options: [], answer: "5"
      }
    ]
  },
  // ─── 14. JSON — Serializare și Deserializare ─────────────────────────────
  {
    lessonId: "69fb775e023e09d08efe052a",
    name: "14. JSON — Serializare și Deserializare",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează: Serializează un obiect la JSON.\n```csharp\nstring json = JsonSerializer.___( obiect );\n```",
        options: [], answer: "Serialize",
        starterCode: "", language: "csharp", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează: Deserializează JSON la un obiect.\n```csharp\nvar user = JsonSerializer.___<User>( json );\n```",
        options: [], answer: "Deserialize",
        starterCode: "", language: "csharp", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează: Adnotarea care specifică numele proprietății în JSON.\n```csharp\n[___(\"first_name\")]\npublic string Prenume { get; set; }\n```",
        options: [], answer: "JsonPropertyName",
        starterCode: "", language: "csharp", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează: Opțiunea care ignoră proprietățile cu valoare null.\n```csharp\nvar opt = new JsonSerializerOptions {\n  ___ = JsonIgnoreCondition.WhenWritingNull\n};\n```",
        options: [], answer: "DefaultIgnoreCondition",
        starterCode: "", language: "csharp", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează: Opțiunea pentru output formatat (indented).\n```csharp\nvar opt = new JsonSerializerOptions { ___ = true };\n```",
        options: [], answer: "WriteIndented",
        starterCode: "", language: "csharp", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Serializează un obiect anonim cu proprietățile Nume=\"Ana\" și Varsta=25 la JSON și afișează rezultatul.",
        starterCode: "using System;\nusing System.Text.Json;\nclass Program {\n  static void Main() {\n    var obj = new { Nume = \"Ana\", Varsta = 25 };\n    string json = JsonSerializer.Serialize(obj);\n    Console.WriteLine(json);\n  }\n}",
        language: "csharp", expectedOutput: "{\"Nume\":\"Ana\",\"Varsta\":25}",
        options: [], answer: "{\"Nume\":\"Ana\",\"Varsta\":25}"
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Deserializează JSON-ul \"{\\\"Titlu\\\":\\\"Clean Code\\\",\\\"Pagini\\\":431}\" și afișează titlul.",
        starterCode: "using System;\nusing System.Text.Json;\nclass Program {\n  record Carte(string Titlu, int Pagini);\n  static void Main() {\n    string json = \"{\\\"Titlu\\\":\\\"Clean Code\\\",\\\"Pagini\\\":431}\";\n    var carte = JsonSerializer.Deserialize<Carte>(json);\n    Console.WriteLine(carte.Titlu);\n  }\n}",
        language: "csharp", expectedOutput: "Clean Code",
        options: [], answer: "Clean Code"
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Serializează o listă de String-uri {\"mere\",\"pere\"} la JSON și afișează rezultatul.",
        starterCode: "using System;\nusing System.Collections.Generic;\nusing System.Text.Json;\nclass Program {\n  static void Main() {\n    var lista = new List<string> { \"mere\", \"pere\" };\n    Console.WriteLine(JsonSerializer.Serialize(lista));\n  }\n}",
        language: "csharp", expectedOutput: "[\"mere\",\"pere\"]",
        options: [], answer: "[\"mere\",\"pere\"]"
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Afișează namespace-ul pentru JsonSerializer din .NET: \"System.Text.Json\".",
        starterCode: "using System;\nclass Program {\n  static void Main() {\n    Console.WriteLine(\"System.Text.Json\");\n  }\n}",
        language: "csharp", expectedOutput: "System.Text.Json",
        options: [], answer: "System.Text.Json"
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Afișează cele 2 metode principale JsonSerializer: \"Serialize\" și \"Deserialize\".",
        starterCode: "using System;\nclass Program {\n  static void Main() {\n    Console.WriteLine(\"Serialize\");\n    Console.WriteLine(\"Deserialize\");\n  }\n}",
        language: "csharp", expectedOutput: "Serialize\nDeserialize",
        options: [], answer: "Serialize\nDeserialize"
      }
    ]
  },
  // ─── 16. LINQ Fundamentals ───────────────────────────────────────────────
  {
    lessonId: "6a021bcff0ec7fc9c03a6b62",
    name: "16. LINQ Fundamentals",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează: Filtrează elementele cu LINQ.\n```csharp\nvar pare = numere.___(n => n % 2 == 0);\n```",
        options: [], answer: "Where",
        starterCode: "", language: "csharp", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează: Transformă fiecare element.\n```csharp\nvar patrate = numere.___(n => n * n);\n```",
        options: [], answer: "Select",
        starterCode: "", language: "csharp", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează: Sortează elementele în ordine crescătoare.\n```csharp\nvar sortat = lista.___(x => x.Nume);\n```",
        options: [], answer: "OrderBy",
        starterCode: "", language: "csharp", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează: Returnează primul element care satisface condiția.\n```csharp\nvar primul = lista.___(x => x.Varsta > 18);\n```",
        options: [], answer: "First",
        starterCode: "", language: "csharp", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează: Numără elementele care satisfac condiția.\n```csharp\nint nr = lista.___(x => x.Activ);\n```",
        options: [], answer: "Count",
        starterCode: "", language: "csharp", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Filtrează numerele pare din lista {1,2,3,4,5,6} și afișează-le pe linii separate.",
        starterCode: "using System;\nusing System.Collections.Generic;\nusing System.Linq;\nclass Program {\n  static void Main() {\n    var lista = new List<int> {1,2,3,4,5,6};\n    foreach (var x in lista.Where(n => n % 2 == 0))\n      Console.WriteLine(x);\n  }\n}",
        language: "csharp", expectedOutput: "2\n4\n6",
        options: [], answer: "2\n4\n6"
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Calculează suma numerelor {10, 20, 30, 40} folosind LINQ Sum() și afișează rezultatul.",
        starterCode: "using System;\nusing System.Collections.Generic;\nusing System.Linq;\nclass Program {\n  static void Main() {\n    var lista = new List<int> {10, 20, 30, 40};\n    Console.WriteLine(lista.Sum());\n  }\n}",
        language: "csharp", expectedOutput: "100",
        options: [], answer: "100"
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Transformă lista {\"ana\",\"ion\",\"maria\"} în majuscule cu LINQ Select și afișează-le.",
        starterCode: "using System;\nusing System.Collections.Generic;\nusing System.Linq;\nclass Program {\n  static void Main() {\n    var lista = new List<string> {\"ana\",\"ion\",\"maria\"};\n    foreach (var s in lista.Select(x => x.ToUpper()))\n      Console.WriteLine(s);\n  }\n}",
        language: "csharp", expectedOutput: "ANA\nION\nMARIA",
        options: [], answer: "ANA\nION\nMARIA"
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Găsește valoarea maximă din lista {3, 17, 8, 25, 11} cu LINQ Max() și afișează-o.",
        starterCode: "using System;\nusing System.Collections.Generic;\nusing System.Linq;\nclass Program {\n  static void Main() {\n    var lista = new List<int> {3,17,8,25,11};\n    Console.WriteLine(lista.Max());\n  }\n}",
        language: "csharp", expectedOutput: "25",
        options: [], answer: "25"
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Numără câte String-uri din {\"java\",\"python\",\"js\",\"go\"} au lungimea mai mare de 2.",
        starterCode: "using System;\nusing System.Collections.Generic;\nusing System.Linq;\nclass Program {\n  static void Main() {\n    var lista = new List<string> {\"java\",\"python\",\"js\",\"go\"};\n    Console.WriteLine(lista.Count(s => s.Length > 2));\n  }\n}",
        language: "csharp", expectedOutput: "2",
        options: [], answer: "2"
      }
    ]
  },
  // ─── 17. Async/Await and Tasks ──────────────────────────────────────────
  {
    lessonId: "6a021bd0f0ec7fc9c03a6b6c",
    name: "17. Async/Await and Tasks",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează: Declară o metodă asincronă.\n```csharp\npublic ___ Task<string> GetDataAsync() {\n  await Task.Delay(100);\n  return \"date\";\n}\n```",
        options: [], answer: "async",
        starterCode: "", language: "csharp", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează: Keyword pentru așteptarea unui Task.\n```csharp\nstring result = ___ GetDataAsync();\n```",
        options: [], answer: "await",
        starterCode: "", language: "csharp", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează: Rulează cod pe un thread din thread pool.\n```csharp\nint result = await Task.___(() => Calculeaza());\n```",
        options: [], answer: "Run",
        starterCode: "", language: "csharp", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează: Returnează un Task deja completat cu valoare.\n```csharp\nreturn Task.___(42);\n```",
        options: [], answer: "FromResult",
        starterCode: "", language: "csharp", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează: Metoda async fără return value returnează ___.\n```csharp\npublic async ___ ProcessAsync() {\n  await Task.Delay(100);\n}\n```",
        options: [], answer: "Task",
        starterCode: "", language: "csharp", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Rulează o metodă async care returnează 42 și afișează rezultatul.",
        starterCode: "using System;\nusing System.Threading.Tasks;\nclass Program {\n  static async Task<int> GetValoare() {\n    await Task.Delay(1);\n    return 42;\n  }\n  static async Task Main() {\n    int val = await GetValoare();\n    Console.WriteLine(val);\n  }\n}",
        language: "csharp", expectedOutput: "42",
        options: [], answer: "42"
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Utilizează Task.Run pentru a executa un calcul și afișează rezultatul 100 (10*10).",
        starterCode: "using System;\nusing System.Threading.Tasks;\nclass Program {\n  static async Task Main() {\n    int result = await Task.Run(() => 10 * 10);\n    Console.WriteLine(result);\n  }\n}",
        language: "csharp", expectedOutput: "100",
        options: [], answer: "100"
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Rulează 2 task-uri în paralel cu Task.WhenAll și afișează suma rezultatelor (5+10=15).",
        starterCode: "using System;\nusing System.Threading.Tasks;\nclass Program {\n  static async Task Main() {\n    var t1 = Task.FromResult(5);\n    var t2 = Task.FromResult(10);\n    var results = await Task.WhenAll(t1, t2);\n    Console.WriteLine(results[0] + results[1]);\n  }\n}",
        language: "csharp", expectedOutput: "15",
        options: [], answer: "15"
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Afișează thread-ul curent înainte și după un await: \"Inainte\" și \"Dupa\".",
        starterCode: "using System;\nusing System.Threading.Tasks;\nclass Program {\n  static async Task Main() {\n    Console.WriteLine(\"Inainte\");\n    await Task.Delay(1);\n    Console.WriteLine(\"Dupa\");\n  }\n}",
        language: "csharp", expectedOutput: "Inainte\nDupa",
        options: [], answer: "Inainte\nDupa"
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Afișează diferența async/sync: \"Sincron: blocare thread\" și \"Async: eliberare thread\".",
        starterCode: "using System;\nclass Program {\n  static void Main() {\n    Console.WriteLine(\"Sincron: blocare thread\");\n    Console.WriteLine(\"Async: eliberare thread\");\n  }\n}",
        language: "csharp", expectedOutput: "Sincron: blocare thread\nAsync: eliberare thread",
        options: [], answer: "Sincron: blocare thread\nAsync: eliberare thread"
      }
    ]
  },
  // ─── 19. Dependency Injection ────────────────────────────────────────────
  {
    lessonId: "6a021bd2f0ec7fc9c03a6b7c",
    name: "19. Dependency Injection",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează: Înregistrează un serviciu cu durata de viață Scoped.\n```csharp\nservices.___<IUserService, UserService>();\n```",
        options: [], answer: "AddScoped",
        starterCode: "", language: "csharp", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează: Constructor injection — primește serviciul prin constructor.\n```csharp\npublic UserController(___ userService) {\n  _userService = userService;\n}\n```",
        options: [], answer: "IUserService",
        starterCode: "", language: "csharp", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează: Înregistrează o singură instanță partajată.\n```csharp\nservices.___<ICache, MemoryCache>();\n```",
        options: [], answer: "AddSingleton",
        starterCode: "", language: "csharp", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează: Înregistrează un serviciu cu instanță nouă la fiecare cerere.\n```csharp\nservices.___<ILogger, ConsoleLogger>();\n```",
        options: [], answer: "AddTransient",
        starterCode: "", language: "csharp", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează: Interfața pentru colecția de servicii.\n```csharp\npublic void ConfigureServices(___ services) { ... }\n```",
        options: [], answer: "IServiceCollection",
        starterCode: "", language: "csharp", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Afișează cele 3 lifetime-uri DI .NET: \"Singleton\", \"Scoped\", \"Transient\".",
        starterCode: "using System;\nclass Program {\n  static void Main() {\n    Console.WriteLine(\"Singleton\");\n    Console.WriteLine(\"Scoped\");\n    Console.WriteLine(\"Transient\");\n  }\n}",
        language: "csharp", expectedOutput: "Singleton\nScoped\nTransient",
        options: [], answer: "Singleton\nScoped\nTransient"
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Simulează DI prin constructor: creează o clasă cu dependință injectată și apelează metoda. Afișează \"Serviciu apelat\".",
        starterCode: "using System;\ninterface IServicii { void Executa(); }\nclass ServiciuReal : IServicii { public void Executa() => Console.WriteLine(\"Serviciu apelat\"); }\nclass Controller {\n  readonly IServicii _s;\n  public Controller(IServicii s) { _s = s; }\n  public void Index() => _s.Executa();\n}\nclass Program {\n  static void Main() {\n    var c = new Controller(new ServiciuReal());\n    c.Index();\n  }\n}",
        language: "csharp", expectedOutput: "Serviciu apelat",
        options: [], answer: "Serviciu apelat"
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Explică DI afișând: \"DI = Inversion of Control\" și \"Dependintele sunt injectate extern\".",
        starterCode: "using System;\nclass Program {\n  static void Main() {\n    Console.WriteLine(\"DI = Inversion of Control\");\n    Console.WriteLine(\"Dependintele sunt injectate extern\");\n  }\n}",
        language: "csharp", expectedOutput: "DI = Inversion of Control\nDependintele sunt injectate extern",
        options: [], answer: "DI = Inversion of Control\nDependintele sunt injectate extern"
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Afișează avantajele DI: \"testabilitate\", \"loosely coupled\", \"reutilizare\".",
        starterCode: "using System;\nclass Program {\n  static void Main() {\n    Console.WriteLine(\"testabilitate\");\n    Console.WriteLine(\"loosely coupled\");\n    Console.WriteLine(\"reutilizare\");\n  }\n}",
        language: "csharp", expectedOutput: "testabilitate\nloosely coupled\nreutilizare",
        options: [], answer: "testabilitate\nloosely coupled\nreutilizare"
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Afișează metodele de înregistrare: \"AddSingleton\", \"AddScoped\", \"AddTransient\".",
        starterCode: "using System;\nclass Program {\n  static void Main() {\n    Console.WriteLine(\"AddSingleton\");\n    Console.WriteLine(\"AddScoped\");\n    Console.WriteLine(\"AddTransient\");\n  }\n}",
        language: "csharp", expectedOutput: "AddSingleton\nAddScoped\nAddTransient",
        options: [], answer: "AddSingleton\nAddScoped\nAddTransient"
      }
    ]
  },
  // ─── 21. Design Patterns in C# ──────────────────────────────────────────
  {
    lessonId: "6a021bd5f0ec7fc9c03a6b8c",
    name: "21. Design Patterns in C#",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează: Constructor privat pentru Singleton.\n```csharp\npublic class Singleton {\n  private static Singleton _instance;\n  ___ Singleton() {}\n  public static Singleton GetInstance() => _instance ??= new Singleton();\n}\n```",
        options: [], answer: "private",
        starterCode: "", language: "csharp", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează: Factory method returnează un obiect fără a expune implementarea.\n```csharp\npublic static IAnimal ___( string tip ) {\n  return tip == \"caine\" ? new Caine() : new Pisica();\n}\n```",
        options: [], answer: "Creeaza",
        starterCode: "", language: "csharp", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează: Observer pattern — metoda de abonare.\n```csharp\npublic void ___(IObserver obs) {\n  observers.Add(obs);\n}\n```",
        options: [], answer: "Subscribe",
        starterCode: "", language: "csharp", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează: Delegat C# pentru event-uri.\n```csharp\npublic ___ EventHandler<string> OnModificare;\n```",
        options: [], answer: "event",
        starterCode: "", language: "csharp", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează: Null-coalescing assignment pentru singleton.\n```csharp\n_instance ___= new Singleton();\n```",
        options: [], answer: "??",
        starterCode: "", language: "csharp", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Implementează Singleton: creează instanța o singură dată, afișând \"Creat\" la instanțiere și \"Aceeasi instanta\" la refolosire.",
        starterCode: "using System;\nclass Singleton {\n  static Singleton _i;\n  int _nr = 0;\n  private Singleton() { Console.WriteLine(\"Creat\"); }\n  public static Singleton Get() => _i ??= new Singleton();\n}\nclass Program {\n  static void Main() {\n    Singleton.Get();\n    Singleton.Get();\n    Console.WriteLine(\"Aceeasi instanta\");\n  }\n}",
        language: "csharp", expectedOutput: "Creat\nAceeasi instanta",
        options: [], answer: "Creat\nAceeasi instanta"
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Implementează Factory: metoda primește \"Caine\" sau \"Pisica\" și afișează sunetul.",
        starterCode: "using System;\nclass Program {\n  static string Sunet(string animal) => animal switch {\n    \"Caine\" => \"Ham\",\n    \"Pisica\" => \"Miau\",\n    _ => \"???\"\n  };\n  static void Main() {\n    Console.WriteLine(Sunet(\"Caine\"));\n    Console.WriteLine(Sunet(\"Pisica\"));\n  }\n}",
        language: "csharp", expectedOutput: "Ham\nMiau",
        options: [], answer: "Ham\nMiau"
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Afișează cele 3 categorii de design patterns: \"Creational\", \"Structural\", \"Behavioral\".",
        starterCode: "using System;\nclass Program {\n  static void Main() {\n    Console.WriteLine(\"Creational\");\n    Console.WriteLine(\"Structural\");\n    Console.WriteLine(\"Behavioral\");\n  }\n}",
        language: "csharp", expectedOutput: "Creational\nStructural\nBehavioral",
        options: [], answer: "Creational\nStructural\nBehavioral"
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Demonstrează Builder: construiește un String din 3 parți cu StringBuilder și afișează \"C# Design Patterns\".",
        starterCode: "using System;\nusing System.Text;\nclass Program {\n  static void Main() {\n    var sb = new StringBuilder();\n    sb.Append(\"C#\");\n    sb.Append(\" Design\");\n    sb.Append(\" Patterns\");\n    Console.WriteLine(sb.ToString());\n  }\n}",
        language: "csharp", expectedOutput: "C# Design Patterns",
        options: [], answer: "C# Design Patterns"
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Afișează principiile SOLID: \"S\", \"O\", \"L\", \"I\", \"D\" pe linii separate.",
        starterCode: "using System;\nclass Program {\n  static void Main() {\n    foreach (char c in \"SOLID\") Console.WriteLine(c);\n  }\n}",
        language: "csharp", expectedOutput: "S\nO\nL\nI\nD",
        options: [], answer: "S\nO\nL\nI\nD"
      }
    ]
  },
  // ─── 23. Generics and Collections ───────────────────────────────────────
  {
    lessonId: "6a021bd7f0ec7fc9c03a6b9c",
    name: "23. Generics and Collections",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează: Stack<T> — adaugă un element.\n```csharp\nStack<int> stack = new Stack<int>();\nstack.___( 42 );\n```",
        options: [], answer: "Push",
        starterCode: "", language: "csharp", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează: Queue<T> — scoate primul element.\n```csharp\nQueue<string> q = new Queue<string>();\nq.Enqueue(\"primul\");\nstring s = q.___();\n```",
        options: [], answer: "Dequeue",
        starterCode: "", language: "csharp", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează: HashSet<T> nu permite duplicate.\n```csharp\nHashSet<int> set = new HashSet<int>();\nset.Add(1); set.Add(1);\nConsole.WriteLine(set.___); // 1\n```",
        options: [], answer: "Count",
        starterCode: "", language: "csharp", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează: IEnumerable permite iterarea colecției.\n```csharp\npublic ___ <int> GetNumere() {\n  yield return 1;\n  yield return 2;\n}\n```",
        options: [], answer: "IEnumerable",
        starterCode: "", language: "csharp", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează: LinkedList<T> — adaugă la final.\n```csharp\nLinkedList<int> ll = new LinkedList<int>();\nll.___( 10 );\n```",
        options: [], answer: "AddLast",
        starterCode: "", language: "csharp", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Creează un Stack<int>, pune 3 valori și afișează Pop (ultima adăugată).",
        starterCode: "using System;\nusing System.Collections.Generic;\nclass Program {\n  static void Main() {\n    var stack = new Stack<int>();\n    stack.Push(10);\n    stack.Push(20);\n    stack.Push(30);\n    Console.WriteLine(stack.Pop());\n  }\n}",
        language: "csharp", expectedOutput: "30",
        options: [], answer: "30"
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Creează un Queue<string>, enqueue 2 valori și afișează Dequeue (prima adăugată).",
        starterCode: "using System;\nusing System.Collections.Generic;\nclass Program {\n  static void Main() {\n    var q = new Queue<string>();\n    q.Enqueue(\"primul\");\n    q.Enqueue(\"al doilea\");\n    Console.WriteLine(q.Dequeue());\n  }\n}",
        language: "csharp", expectedOutput: "primul",
        options: [], answer: "primul"
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Adaugă duplicatele 1,1,2,2,3 într-un HashSet<int> și afișează dimensiunea (3 unice).",
        starterCode: "using System;\nusing System.Collections.Generic;\nclass Program {\n  static void Main() {\n    var set = new HashSet<int> {1,1,2,2,3};\n    Console.WriteLine(set.Count);\n  }\n}",
        language: "csharp", expectedOutput: "3",
        options: [], answer: "3"
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Afișează colecțiile generice .NET: \"List<T>\", \"Dictionary<K,V>\", \"Stack<T>\", \"Queue<T>\".",
        starterCode: "using System;\nclass Program {\n  static void Main() {\n    Console.WriteLine(\"List<T>\");\n    Console.WriteLine(\"Dictionary<K,V>\");\n    Console.WriteLine(\"Stack<T>\");\n    Console.WriteLine(\"Queue<T>\");\n  }\n}",
        language: "csharp", expectedOutput: "List<T>\nDictionary<K,V>\nStack<T>\nQueue<T>",
        options: [], answer: "List<T>\nDictionary<K,V>\nStack<T>\nQueue<T>"
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Creează un List<int> cu 5 elemente, sortează-l și afișează primul element (cel mai mic).",
        starterCode: "using System;\nusing System.Collections.Generic;\nclass Program {\n  static void Main() {\n    var lista = new List<int> {5,2,8,1,9};\n    lista.Sort();\n    Console.WriteLine(lista[0]);\n  }\n}",
        language: "csharp", expectedOutput: "1",
        options: [], answer: "1"
      }
    ]
  },
  // ─── 24. Records, Tuples and Pattern Matching ────────────────────────────
  {
    lessonId: "6a021bd8f0ec7fc9c03a6ba4",
    name: "24. Records, Tuples and Pattern Matching",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează: Declară un record imutabil.\n```csharp\n___ Punct(int X, int Y);\n```",
        options: [], answer: "record",
        starterCode: "", language: "csharp", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează: Creează un tuple cu 2 elemente numite.\n```csharp\n(int x, int y) punct = (___, 4);\n```",
        options: [], answer: "3",
        starterCode: "", language: "csharp", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează: Pattern matching cu switch expression.\n```csharp\nstring desc = obj ___  {\n  int i when i > 0 => \"pozitiv\",\n  int i => \"negativ sau zero\",\n  _ => \"altul\"\n};\n```",
        options: [], answer: "switch",
        starterCode: "", language: "csharp", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează: Copiază un record cu o valoare modificată.\n```csharp\nvar p2 = p1 ___ { X = 10 };\n```",
        options: [], answer: "with",
        starterCode: "", language: "csharp", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează: Deconstruiește un tuple.\n```csharp\nvar (x, y) = ___Punct();\n```",
        options: [], answer: "Get",
        starterCode: "", language: "csharp", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Creează un record Persoana(string Nume, int Varsta) și afișează-l cu ToString implicit.",
        starterCode: "using System;\nrecord Persoana(string Nume, int Varsta);\nclass Program {\n  static void Main() {\n    var p = new Persoana(\"Ion\", 30);\n    Console.WriteLine(p);\n  }\n}",
        language: "csharp", expectedOutput: "Persoana { Nume = Ion, Varsta = 30 }",
        options: [], answer: "Persoana { Nume = Ion, Varsta = 30 }"
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Creează un tuple (3, 4), deconstruieste-l și afișează suma.",
        starterCode: "using System;\nclass Program {\n  static void Main() {\n    (int x, int y) = (3, 4);\n    Console.WriteLine(x + y);\n  }\n}",
        language: "csharp", expectedOutput: "7",
        options: [], answer: "7"
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Copiează un record Punct(5, 10) modificând X la 20 cu `with`. Afișează noul punct.",
        starterCode: "using System;\nrecord Punct(int X, int Y);\nclass Program {\n  static void Main() {\n    var p1 = new Punct(5, 10);\n    var p2 = p1 with { X = 20 };\n    Console.WriteLine(p2);\n  }\n}",
        language: "csharp", expectedOutput: "Punct { X = 20, Y = 10 }",
        options: [], answer: "Punct { X = 20, Y = 10 }"
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Folosește pattern matching: afișează tipul unui object care e string: \"sir de caractere\".",
        starterCode: "using System;\nclass Program {\n  static void Main() {\n    object obj = \"hello\";\n    string tip = obj switch {\n      string s => \"sir de caractere\",\n      int i => \"intreg\",\n      _ => \"altul\"\n    };\n    Console.WriteLine(tip);\n  }\n}",
        language: "csharp", expectedOutput: "sir de caractere",
        options: [], answer: "sir de caractere"
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Verifică că 2 records cu aceleași valori sunt egale (records au egalitate structurală) și afișează True.",
        starterCode: "using System;\nrecord Punct(int X, int Y);\nclass Program {\n  static void Main() {\n    var p1 = new Punct(3, 4);\n    var p2 = new Punct(3, 4);\n    Console.WriteLine(p1 == p2);\n  }\n}",
        language: "csharp", expectedOutput: "True",
        options: [], answer: "True"
      }
    ]
  },
  // ─── 25. C# Project: Task Management API ────────────────────────────────
  {
    lessonId: "6a021bd9f0ec7fc9c03a6bac",
    name: "25. C# Project: Task Management API",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează: Adnotarea pentru un controller ASP.NET Core.\n```csharp\n___\n[Route(\"api/[controller]\")]\npublic class TasksController : ControllerBase { ... }\n```",
        options: [], answer: "[ApiController]",
        starterCode: "", language: "csharp", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează: Returnează 200 OK cu date.\n```csharp\nreturn ___(tasks);\n```",
        options: [], answer: "Ok",
        starterCode: "", language: "csharp", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează: Adnotare endpoint GET.\n```csharp\n[___]\npublic IActionResult GetAll() => Ok(service.GetAll());\n```",
        options: [], answer: "HttpGet",
        starterCode: "", language: "csharp", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează: Returnează 404 Not Found.\n```csharp\nif (task == null) return ___();\n```",
        options: [], answer: "NotFound",
        starterCode: "", language: "csharp", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează: Returnează 201 Created.\n```csharp\nreturn ___(nameof(GetById), new { id = task.Id }, task);\n```",
        options: [], answer: "CreatedAtAction",
        starterCode: "", language: "csharp", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Afișează arhitectura layered C# API: \"Controller\", \"Service\", \"Repository\" pe linii separate.",
        starterCode: "using System;\nclass Program {\n  static void Main() {\n    Console.WriteLine(\"Controller\");\n    Console.WriteLine(\"Service\");\n    Console.WriteLine(\"Repository\");\n  }\n}",
        language: "csharp", expectedOutput: "Controller\nService\nRepository",
        options: [], answer: "Controller\nService\nRepository"
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Construiește și afișează URL-ul REST pentru o sarcină: \"/api/tasks/5\".",
        starterCode: "using System;\nclass Program {\n  static void Main() {\n    int id = 5;\n    Console.WriteLine(\"/api/tasks/\" + id);\n  }\n}",
        language: "csharp", expectedOutput: "/api/tasks/5",
        options: [], answer: "/api/tasks/5"
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Afișează statusurile HTTP CRUD: \"GET=200\", \"POST=201\", \"PUT=200\", \"DELETE=204\".",
        starterCode: "using System;\nclass Program {\n  static void Main() {\n    Console.WriteLine(\"GET=200\");\n    Console.WriteLine(\"POST=201\");\n    Console.WriteLine(\"PUT=200\");\n    Console.WriteLine(\"DELETE=204\");\n  }\n}",
        language: "csharp", expectedOutput: "GET=200\nPOST=201\nPUT=200\nDELETE=204",
        options: [], answer: "GET=200\nPOST=201\nPUT=200\nDELETE=204"
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Afișează adnotările ASP.NET Core: \"[ApiController]\", \"[Route]\", \"[HttpGet]\", \"[HttpPost]\".",
        starterCode: "using System;\nclass Program {\n  static void Main() {\n    Console.WriteLine(\"[ApiController]\");\n    Console.WriteLine(\"[Route]\");\n    Console.WriteLine(\"[HttpGet]\");\n    Console.WriteLine(\"[HttpPost]\");\n  }\n}",
        language: "csharp", expectedOutput: "[ApiController]\n[Route]\n[HttpGet]\n[HttpPost]",
        options: [], answer: "[ApiController]\n[Route]\n[HttpGet]\n[HttpPost]"
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Afișează modelul unei sarcini cu proprietățile: \"Id: int\", \"Titlu: string\", \"Completata: bool\".",
        starterCode: "using System;\nclass Program {\n  static void Main() {\n    Console.WriteLine(\"Id: int\");\n    Console.WriteLine(\"Titlu: string\");\n    Console.WriteLine(\"Completata: bool\");\n  }\n}",
        language: "csharp", expectedOutput: "Id: int\nTitlu: string\nCompletata: bool",
        options: [], answer: "Id: int\nTitlu: string\nCompletata: bool"
      }
    ]
  },
  // ─── 26. LINQ Avansat ────────────────────────────────────────────────────
  {
    lessonId: "6a08cf98999573855635cd43",
    name: "26. LINQ Avansat",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează: Grupează elementele după o proprietate.\n```csharp\nvar grupuri = lista.___(x => x.Departament);\n```",
        options: [], answer: "GroupBy",
        starterCode: "", language: "csharp", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează: Aplatizează o colecție de colecții.\n```csharp\nvar toate = listaDeListe.___(x => x);\n```",
        options: [], answer: "SelectMany",
        starterCode: "", language: "csharp", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează: Join-uiește 2 colecții după o cheie.\n```csharp\nvar rezultat = users.___(orders,\n  u => u.Id, o => o.UserId,\n  (u, o) => new { u.Nume, o.Total });\n```",
        options: [], answer: "Join",
        starterCode: "", language: "csharp", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează: LINQ folosește execuție amânată (deferred execution).\n```csharp\nvar query = lista.Where(x => x > 5); // execuție ___\nforeach (var x in query) { ... }  // execuție acum\n```",
        options: [], answer: "amanata",
        starterCode: "", language: "csharp", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează: Returnează toate elementele distincte.\n```csharp\nvar unice = lista.___();\n```",
        options: [], answer: "Distinct",
        starterCode: "", language: "csharp", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Folosind SelectMany, aplatizează {{1,2},{3,4},{5}} și afișează suma.",
        starterCode: "using System;\nusing System.Collections.Generic;\nusing System.Linq;\nclass Program {\n  static void Main() {\n    var lista = new List<List<int>> {\n      new List<int>{1,2}, new List<int>{3,4}, new List<int>{5}\n    };\n    Console.WriteLine(lista.SelectMany(x => x).Sum());\n  }\n}",
        language: "csharp", expectedOutput: "15",
        options: [], answer: "15"
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Sortează lista {5,2,8,1,9} descrescător și afișează primul element.",
        starterCode: "using System;\nusing System.Collections.Generic;\nusing System.Linq;\nclass Program {\n  static void Main() {\n    var lista = new List<int> {5,2,8,1,9};\n    Console.WriteLine(lista.OrderByDescending(x => x).First());\n  }\n}",
        language: "csharp", expectedOutput: "9",
        options: [], answer: "9"
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Filtrează duplicatele din {1,1,2,2,3,3} cu Distinct și afișează elementele.",
        starterCode: "using System;\nusing System.Collections.Generic;\nusing System.Linq;\nclass Program {\n  static void Main() {\n    var lista = new List<int> {1,1,2,2,3,3};\n    foreach (var x in lista.Distinct()) Console.WriteLine(x);\n  }\n}",
        language: "csharp", expectedOutput: "1\n2\n3",
        options: [], answer: "1\n2\n3"
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Ia primele 3 elemente din {10,20,30,40,50} cu Take și afișează-le.",
        starterCode: "using System;\nusing System.Collections.Generic;\nusing System.Linq;\nclass Program {\n  static void Main() {\n    var lista = new List<int> {10,20,30,40,50};\n    foreach (var x in lista.Take(3)) Console.WriteLine(x);\n  }\n}",
        language: "csharp", expectedOutput: "10\n20\n30",
        options: [], answer: "10\n20\n30"
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Concatenează LINQ {\"a\",\"b\",\"c\"} cu string.Join și afișează \"a,b,c\".",
        starterCode: "using System;\nusing System.Collections.Generic;\nusing System.Linq;\nclass Program {\n  static void Main() {\n    var lista = new List<string> {\"a\",\"b\",\"c\"};\n    Console.WriteLine(string.Join(\",\", lista));\n  }\n}",
        language: "csharp", expectedOutput: "a,b,c",
        options: [], answer: "a,b,c"
      }
    ]
  },
  // ─── 27. Entity Framework Core ──────────────────────────────────────────
  {
    lessonId: "6a08cf9b999573855635cd57",
    name: "27. Entity Framework Core",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează: Clasa de context EF Core extinde DbContext.\n```csharp\npublic class AppDbContext : ___ { ... }\n```",
        options: [], answer: "DbContext",
        starterCode: "", language: "csharp", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează: Proprietatea DbSet expune entitatea în context.\n```csharp\npublic ___ <Produs> Produse { get; set; }\n```",
        options: [], answer: "DbSet",
        starterCode: "", language: "csharp", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează: Include entitățile relaționate (eager loading).\n```csharp\nvar users = ctx.Users.___( u => u.Orders ).ToList();\n```",
        options: [], answer: "Include",
        starterCode: "", language: "csharp", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează: Salvează modificările în baza de date.\n```csharp\nctx.Produse.Add(produs);\nawait ctx.___();\n```",
        options: [], answer: "SaveChangesAsync",
        starterCode: "", language: "csharp", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează: Comanda CLI pentru crearea unei migrații.\n```\ndotnet ef migrations ___\n```",
        options: [], answer: "add",
        starterCode: "", language: "csharp", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Afișează operațiile EF Core de bază: \"Add\", \"Update\", \"Remove\", \"SaveChanges\".",
        starterCode: "using System;\nclass Program {\n  static void Main() {\n    Console.WriteLine(\"Add\");\n    Console.WriteLine(\"Update\");\n    Console.WriteLine(\"Remove\");\n    Console.WriteLine(\"SaveChanges\");\n  }\n}",
        language: "csharp", expectedOutput: "Add\nUpdate\nRemove\nSaveChanges",
        options: [], answer: "Add\nUpdate\nRemove\nSaveChanges"
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Afișează comenzile EF CLI: \"migrations add\", \"database update\", \"migrations remove\".",
        starterCode: "using System;\nclass Program {\n  static void Main() {\n    Console.WriteLine(\"migrations add\");\n    Console.WriteLine(\"database update\");\n    Console.WriteLine(\"migrations remove\");\n  }\n}",
        language: "csharp", expectedOutput: "migrations add\ndatabase update\nmigrations remove",
        options: [], answer: "migrations add\ndatabase update\nmigrations remove"
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Afișează tipurile de relații EF Core: \"One-to-One\", \"One-to-Many\", \"Many-to-Many\".",
        starterCode: "using System;\nclass Program {\n  static void Main() {\n    Console.WriteLine(\"One-to-One\");\n    Console.WriteLine(\"One-to-Many\");\n    Console.WriteLine(\"Many-to-Many\");\n  }\n}",
        language: "csharp", expectedOutput: "One-to-One\nOne-to-Many\nMany-to-Many",
        options: [], answer: "One-to-One\nOne-to-Many\nMany-to-Many"
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Afișează providerii EF Core: \"SqlServer\", \"Sqlite\", \"PostgreSQL\", \"InMemory\".",
        starterCode: "using System;\nclass Program {\n  static void Main() {\n    Console.WriteLine(\"SqlServer\");\n    Console.WriteLine(\"Sqlite\");\n    Console.WriteLine(\"PostgreSQL\");\n    Console.WriteLine(\"InMemory\");\n  }\n}",
        language: "csharp", expectedOutput: "SqlServer\nSqlite\nPostgreSQL\nInMemory",
        options: [], answer: "SqlServer\nSqlite\nPostgreSQL\nInMemory"
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Afișează stările entităților EF: \"Added\", \"Modified\", \"Deleted\", \"Unchanged\".",
        starterCode: "using System;\nclass Program {\n  static void Main() {\n    Console.WriteLine(\"Added\");\n    Console.WriteLine(\"Modified\");\n    Console.WriteLine(\"Deleted\");\n    Console.WriteLine(\"Unchanged\");\n  }\n}",
        language: "csharp", expectedOutput: "Added\nModified\nDeleted\nUnchanged",
        options: [], answer: "Added\nModified\nDeleted\nUnchanged"
      }
    ]
  },
  // ─── 28. ASP.NET Core Web API ────────────────────────────────────────────
  {
    lessonId: "6a08cf9e999573855635cd6b",
    name: "28. ASP.NET Core Web API",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează: Adnotarea pentru un controller API.\n```csharp\n___\npublic class ProdusController : ControllerBase { }\n```",
        options: [], answer: "[ApiController]",
        starterCode: "", language: "csharp", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează: Tipul de return pentru acțiunile unui controller.\n```csharp\npublic ___ GetAll() => Ok(service.GetAll());\n```",
        options: [], answer: "IActionResult",
        starterCode: "", language: "csharp", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează: Adnotarea pentru endpoint HTTP GET.\n```csharp\n[___(\"{id}\")]\npublic IActionResult GetById(int id) { ... }\n```",
        options: [], answer: "HttpGet",
        starterCode: "", language: "csharp", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează: Returnează 204 No Content.\n```csharp\nreturn ___();\n```",
        options: [], answer: "NoContent",
        starterCode: "", language: "csharp", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează: Atribut de rută la nivel de controller.\n```csharp\n[___(\"api/[controller]\")]\npublic class UserController : ControllerBase { }\n```",
        options: [], answer: "Route",
        starterCode: "", language: "csharp", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Afișează adnotările HTTP ASP.NET: \"[HttpGet]\", \"[HttpPost]\", \"[HttpPut]\", \"[HttpDelete]\".",
        starterCode: "using System;\nclass Program {\n  static void Main() {\n    Console.WriteLine(\"[HttpGet]\");\n    Console.WriteLine(\"[HttpPost]\");\n    Console.WriteLine(\"[HttpPut]\");\n    Console.WriteLine(\"[HttpDelete]\");\n  }\n}",
        language: "csharp", expectedOutput: "[HttpGet]\n[HttpPost]\n[HttpPut]\n[HttpDelete]",
        options: [], answer: "[HttpGet]\n[HttpPost]\n[HttpPut]\n[HttpDelete]"
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Construiește URL-ul REST și afișează: \"/api/produse/10\".",
        starterCode: "using System;\nclass Program {\n  static void Main() {\n    int id = 10;\n    Console.WriteLine(\"/api/produse/\" + id);\n  }\n}",
        language: "csharp", expectedOutput: "/api/produse/10",
        options: [], answer: "/api/produse/10"
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Afișează middleware-urile ASP.NET Core: \"Authentication\", \"Authorization\", \"Routing\", \"CORS\".",
        starterCode: "using System;\nclass Program {\n  static void Main() {\n    Console.WriteLine(\"Authentication\");\n    Console.WriteLine(\"Authorization\");\n    Console.WriteLine(\"Routing\");\n    Console.WriteLine(\"CORS\");\n  }\n}",
        language: "csharp", expectedOutput: "Authentication\nAuthorization\nRouting\nCORS",
        options: [], answer: "Authentication\nAuthorization\nRouting\nCORS"
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Afișează modelul de răspuns API standard: \"status\", \"data\", \"message\".",
        starterCode: "using System;\nclass Program {\n  static void Main() {\n    Console.WriteLine(\"status\");\n    Console.WriteLine(\"data\");\n    Console.WriteLine(\"message\");\n  }\n}",
        language: "csharp", expectedOutput: "status\ndata\nmessage",
        options: [], answer: "status\ndata\nmessage"
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Afișează tool-urile pentru testarea API: \"Swagger\", \"Postman\", \"curl\".",
        starterCode: "using System;\nclass Program {\n  static void Main() {\n    Console.WriteLine(\"Swagger\");\n    Console.WriteLine(\"Postman\");\n    Console.WriteLine(\"curl\");\n  }\n}",
        language: "csharp", expectedOutput: "Swagger\nPostman\ncurl",
        options: [], answer: "Swagger\nPostman\ncurl"
      }
    ]
  },
  // ─── 29. Dependency Injection in C# ─────────────────────────────────────
  {
    lessonId: "6a08cfa1999573855635cd7f",
    name: "29. Dependency Injection in C#",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează: Scoped creează o instanță per ___.\n```csharp\nservices.AddScoped<IOrderService, OrderService>(); // o instanta per ___\n```",
        options: [], answer: "request",
        starterCode: "", language: "csharp", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează: Singleton creează o singură instanță per ___.\n```csharp\nservices.AddSingleton<ICache, MemoryCache>(); // o instanta per ___\n```",
        options: [], answer: "aplicatie",
        starterCode: "", language: "csharp", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează: Transient creează o instanță nouă de fiecare ___.\n```csharp\nservices.AddTransient<IMailer, SmtpMailer>(); // instanta noua de fiecare ___\n```",
        options: [], answer: "data",
        starterCode: "", language: "csharp", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează: Obține un serviciu din IServiceProvider.\n```csharp\nvar svc = provider.___<IUserService>();\n```",
        options: [], answer: "GetService",
        starterCode: "", language: "csharp", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează: Construieste service provider din colecție.\n```csharp\nvar provider = services.___();\n```",
        options: [], answer: "BuildServiceProvider",
        starterCode: "", language: "csharp", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Afișează lifetime-urile DI cu duratele lor: \"Singleton: intreaga aplicatie\", \"Scoped: per request\", \"Transient: de fiecare data\".",
        starterCode: "using System;\nclass Program {\n  static void Main() {\n    Console.WriteLine(\"Singleton: intreaga aplicatie\");\n    Console.WriteLine(\"Scoped: per request\");\n    Console.WriteLine(\"Transient: de fiecare data\");\n  }\n}",
        language: "csharp", expectedOutput: "Singleton: intreaga aplicatie\nScoped: per request\nTransient: de fiecare data",
        options: [], answer: "Singleton: intreaga aplicatie\nScoped: per request\nTransient: de fiecare data"
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Demonstrează DI: creează un serviciu simplu și injectează-l. Afișează \"Injectat si apelat\".",
        starterCode: "using System;\ninterface IGreeter { string Greet(); }\nclass Greeter : IGreeter { public string Greet() => \"Injectat si apelat\"; }\nclass Controller { readonly IGreeter _g; public Controller(IGreeter g) { _g = g; } public void Run() => Console.WriteLine(_g.Greet()); }\nclass Program {\n  static void Main() {\n    new Controller(new Greeter()).Run();\n  }\n}",
        language: "csharp", expectedOutput: "Injectat si apelat",
        options: [], answer: "Injectat si apelat"
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Afișează tipurile de injectare: \"Constructor injection\", \"Property injection\", \"Method injection\".",
        starterCode: "using System;\nclass Program {\n  static void Main() {\n    Console.WriteLine(\"Constructor injection\");\n    Console.WriteLine(\"Property injection\");\n    Console.WriteLine(\"Method injection\");\n  }\n}",
        language: "csharp", expectedOutput: "Constructor injection\nProperty injection\nMethod injection",
        options: [], answer: "Constructor injection\nProperty injection\nMethod injection"
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Afișează container-ele DI .NET populare: \"Microsoft.Extensions.DI\", \"Autofac\", \"Castle Windsor\".",
        starterCode: "using System;\nclass Program {\n  static void Main() {\n    Console.WriteLine(\"Microsoft.Extensions.DI\");\n    Console.WriteLine(\"Autofac\");\n    Console.WriteLine(\"Castle Windsor\");\n  }\n}",
        language: "csharp", expectedOutput: "Microsoft.Extensions.DI\nAutofac\nCastle Windsor",
        options: [], answer: "Microsoft.Extensions.DI\nAutofac\nCastle Windsor"
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Afișează principiile IoC: \"Depend on abstractions\", \"Not on implementations\".",
        starterCode: "using System;\nclass Program {\n  static void Main() {\n    Console.WriteLine(\"Depend on abstractions\");\n    Console.WriteLine(\"Not on implementations\");\n  }\n}",
        language: "csharp", expectedOutput: "Depend on abstractions\nNot on implementations",
        options: [], answer: "Depend on abstractions\nNot on implementations"
      }
    ]
  },
  // ─── 30. Mini Proiect C# — REST API Complet ─────────────────────────────
  {
    lessonId: "6a08cfa4999573855635cd93",
    name: "30. Mini Proiect C# — REST API Complet",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează: Înregistrează toate serviciile necesare.\n```csharp\nbuilder.Services.AddControllers();\nbuilder.Services.AddDbContext<AppDbContext>(opt => ...);\nbuilder.Services.___<IProductService, ProductService>();\n```",
        options: [], answer: "AddScoped",
        starterCode: "", language: "csharp", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează: Activează Swagger în development.\n```csharp\nif (app.Environment.___) {\n  app.UseSwagger();\n  app.UseSwaggerUI();\n}\n```",
        options: [], answer: "IsDevelopment",
        starterCode: "", language: "csharp", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează: Mapează controller-ele.\n```csharp\napp.___();\n```",
        options: [], answer: "MapControllers",
        starterCode: "", language: "csharp", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează: DTO pentru transferul datelor (Data Transfer Object).\n```csharp\npublic record ProductDto(int Id, string Nume, decimal ___) {}\n```",
        options: [], answer: "Pret",
        starterCode: "", language: "csharp", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează: Validare model automată cu Data Annotations.\n```csharp\npublic class CreateProductDto {\n  [___]\n  public string Nume { get; set; }\n}\n```",
        options: [], answer: "Required",
        starterCode: "", language: "csharp", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Afișează etapele proiectului REST API: \"1. Model\", \"2. DbContext\", \"3. Repository\", \"4. Service\", \"5. Controller\".",
        starterCode: "using System;\nclass Program {\n  static void Main() {\n    Console.WriteLine(\"1. Model\");\n    Console.WriteLine(\"2. DbContext\");\n    Console.WriteLine(\"3. Repository\");\n    Console.WriteLine(\"4. Service\");\n    Console.WriteLine(\"5. Controller\");\n  }\n}",
        language: "csharp", expectedOutput: "1. Model\n2. DbContext\n3. Repository\n4. Service\n5. Controller",
        options: [], answer: "1. Model\n2. DbContext\n3. Repository\n4. Service\n5. Controller"
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Afișează endpoint-urile REST pentru produse: \"GET /api/products\", \"POST /api/products\", \"GET /api/products/{id}\".",
        starterCode: "using System;\nclass Program {\n  static void Main() {\n    Console.WriteLine(\"GET /api/products\");\n    Console.WriteLine(\"POST /api/products\");\n    Console.WriteLine(\"GET /api/products/{id}\");\n  }\n}",
        language: "csharp", expectedOutput: "GET /api/products\nPOST /api/products\nGET /api/products/{id}",
        options: [], answer: "GET /api/products\nPOST /api/products\nGET /api/products/{id}"
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Afișează toolurile utilizate: \"ASP.NET Core\", \"EF Core\", \"Swagger\", \"Postman\".",
        starterCode: "using System;\nclass Program {\n  static void Main() {\n    Console.WriteLine(\"ASP.NET Core\");\n    Console.WriteLine(\"EF Core\");\n    Console.WriteLine(\"Swagger\");\n    Console.WriteLine(\"Postman\");\n  }\n}",
        language: "csharp", expectedOutput: "ASP.NET Core\nEF Core\nSwagger\nPostman",
        options: [], answer: "ASP.NET Core\nEF Core\nSwagger\nPostman"
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Construiește și afișează un JSON de produs: \"{\\\"Id\\\":1,\\\"Nume\\\":\\\"Laptop\\\",\\\"Pret\\\":999}\".",
        starterCode: "using System;\nclass Program {\n  static void Main() {\n    Console.WriteLine(\"{\\\"Id\\\":1,\\\"Nume\\\":\\\"Laptop\\\",\\\"Pret\\\":999}\");\n  }\n}",
        language: "csharp", expectedOutput: "{\"Id\":1,\"Nume\":\"Laptop\",\"Pret\":999}",
        options: [], answer: "{\"Id\":1,\"Nume\":\"Laptop\",\"Pret\":999}"
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Afișează caracteristicile unui REST API complet: \"Autentificare\", \"Validare\", \"Erori structurate\", \"Documentatie\".",
        starterCode: "using System;\nclass Program {\n  static void Main() {\n    Console.WriteLine(\"Autentificare\");\n    Console.WriteLine(\"Validare\");\n    Console.WriteLine(\"Erori structurate\");\n    Console.WriteLine(\"Documentatie\");\n  }\n}",
        language: "csharp", expectedOutput: "Autentificare\nValidare\nErori structurate\nDocumentatie",
        options: [], answer: "Autentificare\nValidare\nErori structurate\nDocumentatie"
      }
    ]
  },
  // ─── 31. SignalR — Real-time cu C# ──────────────────────────────────────
  {
    lessonId: "6a09ba4f855b60bc2da6dcc7",
    name: "31. SignalR — Real-time cu C#",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează: Clasa de bază pentru un SignalR Hub.\n```csharp\npublic class ChatHub : ___ { ... }\n```",
        options: [], answer: "Hub",
        starterCode: "", language: "csharp", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează: Trimite mesaj tuturor clienților conectați.\n```csharp\nawait Clients.___.SendAsync(\"PrimesteMesaj\", mesaj);\n```",
        options: [], answer: "All",
        starterCode: "", language: "csharp", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează: Conexiunea client SignalR.\n```csharp\nvar conn = new HubConnectionBuilder()\n  .WithUrl(\"/chatHub\")\n  .___();\n```",
        options: [], answer: "Build",
        starterCode: "", language: "csharp", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează: Pornește conexiunea client.\n```csharp\nawait conn.___();\n```",
        options: [], answer: "StartAsync",
        starterCode: "", language: "csharp", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează: Înregistrează handler-ul pentru mesaje primite.\n```csharp\nconn.On<string>(\"PrimesteMesaj\", msg => Console.___( msg ));\n```",
        options: [], answer: "WriteLine",
        starterCode: "", language: "csharp", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Afișează protocoalele SignalR: \"WebSocket\", \"Server-Sent Events\", \"Long Polling\".",
        starterCode: "using System;\nclass Program {\n  static void Main() {\n    Console.WriteLine(\"WebSocket\");\n    Console.WriteLine(\"Server-Sent Events\");\n    Console.WriteLine(\"Long Polling\");\n  }\n}",
        language: "csharp", expectedOutput: "WebSocket\nServer-Sent Events\nLong Polling",
        options: [], answer: "WebSocket\nServer-Sent Events\nLong Polling"
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Afișează cazurile de utilizare SignalR: \"Chat\", \"Notificari\", \"Dashboard live\", \"Colaborare\".",
        starterCode: "using System;\nclass Program {\n  static void Main() {\n    Console.WriteLine(\"Chat\");\n    Console.WriteLine(\"Notificari\");\n    Console.WriteLine(\"Dashboard live\");\n    Console.WriteLine(\"Colaborare\");\n  }\n}",
        language: "csharp", expectedOutput: "Chat\nNotificari\nDashboard live\nColaborare",
        options: [], answer: "Chat\nNotificari\nDashboard live\nColaborare"
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Afișează metodele Hub pentru grupuri: \"AddToGroupAsync\", \"RemoveFromGroupAsync\", \"Clients.Group\".",
        starterCode: "using System;\nclass Program {\n  static void Main() {\n    Console.WriteLine(\"AddToGroupAsync\");\n    Console.WriteLine(\"RemoveFromGroupAsync\");\n    Console.WriteLine(\"Clients.Group\");\n  }\n}",
        language: "csharp", expectedOutput: "AddToGroupAsync\nRemoveFromGroupAsync\nClients.Group",
        options: [], answer: "AddToGroupAsync\nRemoveFromGroupAsync\nClients.Group"
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Afișează diferența WebSocket vs HTTP: \"WebSocket: bidirectional\", \"HTTP: unidirectional\".",
        starterCode: "using System;\nclass Program {\n  static void Main() {\n    Console.WriteLine(\"WebSocket: bidirectional\");\n    Console.WriteLine(\"HTTP: unidirectional\");\n  }\n}",
        language: "csharp", expectedOutput: "WebSocket: bidirectional\nHTTP: unidirectional",
        options: [], answer: "WebSocket: bidirectional\nHTTP: unidirectional"
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Afișează pachetul NuGet pentru SignalR: \"Microsoft.AspNetCore.SignalR\".",
        starterCode: "using System;\nclass Program {\n  static void Main() {\n    Console.WriteLine(\"Microsoft.AspNetCore.SignalR\");\n  }\n}",
        language: "csharp", expectedOutput: "Microsoft.AspNetCore.SignalR",
        options: [], answer: "Microsoft.AspNetCore.SignalR"
      }
    ]
  },
  // ─── 32. gRPC cu .NET ────────────────────────────────────────────────────
  {
    lessonId: "6a09ba51855b60bc2da6dcdb",
    name: "32. gRPC cu .NET",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează: Extensia fișierului de definiție gRPC.\n```\n// fisier: greeter.___\nsyntax = \"proto3\";\n```",
        options: [], answer: "proto",
        starterCode: "", language: "csharp", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează: Clasa .NET pentru a crea un canal gRPC.\n```csharp\nvar channel = GrpcChannel.ForAddress(\"https://localhost:5001\");\nvar client = new ___.GreeterClient(channel);\n```",
        options: [], answer: "Greeter",
        starterCode: "", language: "csharp", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează: Serviciul gRPC extinde clasa generată.\n```csharp\npublic class GreeterService : Greeter.___ { ... }\n```",
        options: [], answer: "GreeterBase",
        starterCode: "", language: "csharp", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează: gRPC folosește Protocol Buffers (___) pentru serializare.\n```\nmessage HelloRequest {\n  string name = ___;\n}\n```",
        options: [], answer: "1",
        starterCode: "", language: "csharp", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează: Înregistrează serviciul gRPC în ASP.NET Core.\n```csharp\napp.MapGrpcService<___>();\n```",
        options: [], answer: "GreeterService",
        starterCode: "", language: "csharp", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Afișează avantajele gRPC față de REST: \"mai rapid\", \"tipizat\", \"streaming\", \"HTTP/2\".",
        starterCode: "using System;\nclass Program {\n  static void Main() {\n    Console.WriteLine(\"mai rapid\");\n    Console.WriteLine(\"tipizat\");\n    Console.WriteLine(\"streaming\");\n    Console.WriteLine(\"HTTP/2\");\n  }\n}",
        language: "csharp", expectedOutput: "mai rapid\ntipizat\nstreaming\nHTTP/2",
        options: [], answer: "mai rapid\ntipizat\nstreaming\nHTTP/2"
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Afișează tipurile de streaming gRPC: \"Unary\", \"Server streaming\", \"Client streaming\", \"Bidirectional\".",
        starterCode: "using System;\nclass Program {\n  static void Main() {\n    Console.WriteLine(\"Unary\");\n    Console.WriteLine(\"Server streaming\");\n    Console.WriteLine(\"Client streaming\");\n    Console.WriteLine(\"Bidirectional\");\n  }\n}",
        language: "csharp", expectedOutput: "Unary\nServer streaming\nClient streaming\nBidirectional",
        options: [], answer: "Unary\nServer streaming\nClient streaming\nBidirectional"
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Afișează tipurile de date proto3: \"string\", \"int32\", \"bool\", \"bytes\".",
        starterCode: "using System;\nclass Program {\n  static void Main() {\n    Console.WriteLine(\"string\");\n    Console.WriteLine(\"int32\");\n    Console.WriteLine(\"bool\");\n    Console.WriteLine(\"bytes\");\n  }\n}",
        language: "csharp", expectedOutput: "string\nint32\nbool\nbytes",
        options: [], answer: "string\nint32\nbool\nbytes"
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Afișează pachetele NuGet gRPC: \"Grpc.AspNetCore\", \"Grpc.Net.Client\", \"Google.Protobuf\".",
        starterCode: "using System;\nclass Program {\n  static void Main() {\n    Console.WriteLine(\"Grpc.AspNetCore\");\n    Console.WriteLine(\"Grpc.Net.Client\");\n    Console.WriteLine(\"Google.Protobuf\");\n  }\n}",
        language: "csharp", expectedOutput: "Grpc.AspNetCore\nGrpc.Net.Client\nGoogle.Protobuf",
        options: [], answer: "Grpc.AspNetCore\nGrpc.Net.Client\nGoogle.Protobuf"
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Afișează diferența gRPC vs REST: \"gRPC: Protocol Buffers\" și \"REST: JSON\".",
        starterCode: "using System;\nclass Program {\n  static void Main() {\n    Console.WriteLine(\"gRPC: Protocol Buffers\");\n    Console.WriteLine(\"REST: JSON\");\n  }\n}",
        language: "csharp", expectedOutput: "gRPC: Protocol Buffers\nREST: JSON",
        options: [], answer: "gRPC: Protocol Buffers\nREST: JSON"
      }
    ]
  },
  // ─── 33. Blazor WebAssembly ──────────────────────────────────────────────
  {
    lessonId: "6a09ba54855b60bc2da6dcef",
    name: "33. Blazor WebAssembly",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează: Directiva Blazor pentru definirea rutei componente.\n```csharp\n___ \"/counter\"\n```",
        options: [], answer: "@page",
        starterCode: "", language: "csharp", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează: Directiva pentru binding bidirecțional.\n```csharp\n<input ___=\"@valoare\" />\n```",
        options: [], answer: "@bind",
        starterCode: "", language: "csharp", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează: Injectează un serviciu în componentă.\n```csharp\n@___ IWeatherService WeatherSvc\n```",
        options: [], answer: "inject",
        starterCode: "", language: "csharp", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează: Callback pentru comunicare copil->părinte.\n```csharp\n[Parameter]\npublic ___ <string> OnClick { get; set; }\n```",
        options: [], answer: "EventCallback",
        starterCode: "", language: "csharp", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează: Ciclu de viață Blazor apelat la inițializare.\n```csharp\nprotected override async Task ___() {\n  data = await Http.GetFromJsonAsync<Data[]>(\"api/data\");\n}\n```",
        options: [], answer: "OnInitializedAsync",
        starterCode: "", language: "csharp", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Afișează diferența Blazor Server vs WASM: \"Server: C# pe server\" și \"WASM: C# in browser\".",
        starterCode: "using System;\nclass Program {\n  static void Main() {\n    Console.WriteLine(\"Server: C# pe server\");\n    Console.WriteLine(\"WASM: C# in browser\");\n  }\n}",
        language: "csharp", expectedOutput: "Server: C# pe server\nWASM: C# in browser",
        options: [], answer: "Server: C# pe server\nWASM: C# in browser"
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Afișează directivele Blazor principale: \"@page\", \"@inject\", \"@bind\", \"@onclick\".",
        starterCode: "using System;\nclass Program {\n  static void Main() {\n    Console.WriteLine(\"@page\");\n    Console.WriteLine(\"@inject\");\n    Console.WriteLine(\"@bind\");\n    Console.WriteLine(\"@onclick\");\n  }\n}",
        language: "csharp", expectedOutput: "@page\n@inject\n@bind\n@onclick",
        options: [], answer: "@page\n@inject\n@bind\n@onclick"
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Afișează ciclul de viață Blazor: \"OnInitialized\", \"OnParametersSet\", \"OnAfterRender\".",
        starterCode: "using System;\nclass Program {\n  static void Main() {\n    Console.WriteLine(\"OnInitialized\");\n    Console.WriteLine(\"OnParametersSet\");\n    Console.WriteLine(\"OnAfterRender\");\n  }\n}",
        language: "csharp", expectedOutput: "OnInitialized\nOnParametersSet\nOnAfterRender",
        options: [], answer: "OnInitialized\nOnParametersSet\nOnAfterRender"
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Afișează avantajele Blazor WASM: \"C# full-stack\", \"no JavaScript\", \"SPA\".",
        starterCode: "using System;\nclass Program {\n  static void Main() {\n    Console.WriteLine(\"C# full-stack\");\n    Console.WriteLine(\"no JavaScript\");\n    Console.WriteLine(\"SPA\");\n  }\n}",
        language: "csharp", expectedOutput: "C# full-stack\nno JavaScript\nSPA",
        options: [], answer: "C# full-stack\nno JavaScript\nSPA"
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Afișează template-urile Blazor: \"blazorwasm\", \"blazorserver\", \"blazor\".",
        starterCode: "using System;\nclass Program {\n  static void Main() {\n    Console.WriteLine(\"blazorwasm\");\n    Console.WriteLine(\"blazorserver\");\n    Console.WriteLine(\"blazor\");\n  }\n}",
        language: "csharp", expectedOutput: "blazorwasm\nblazorserver\nblazor",
        options: [], answer: "blazorwasm\nblazorserver\nblazor"
      }
    ]
  },
  // ─── 34. Entity Framework Core Advanced ─────────────────────────────────
  {
    lessonId: "6a09ba56855b60bc2da6dd03",
    name: "34. Entity Framework Core Advanced",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează: Îmbunătățește performanța dezactivând urmărirea entității.\n```csharp\nvar produse = ctx.Produse.___().ToList();\n```",
        options: [], answer: "AsNoTracking",
        starterCode: "", language: "csharp", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează: Actualizează mai multe entități cu o singură comandă EF Core 7.\n```csharp\nawait ctx.Produse.Where(p => p.Stoc == 0).___( p => new Produs { Activ = false } );\n```",
        options: [], answer: "ExecuteUpdateAsync",
        starterCode: "", language: "csharp", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează: Execută SQL raw cu EF Core.\n```csharp\nvar result = await ctx.Produse.FromSql___(\"SELECT * FROM Produse\").ToListAsync();\n```",
        options: [], answer: "Raw",
        starterCode: "", language: "csharp", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează: Interceptor EF Core pentru logare query-uri.\n```csharp\noptionsBuilder.Add___(new MyCommandInterceptor());\n```",
        options: [], answer: "Interceptors",
        starterCode: "", language: "csharp", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează: Șterge mai multe entități cu o singură comandă.\n```csharp\nawait ctx.Produse.Where(p => !p.Activ).___();\n```",
        options: [], answer: "ExecuteDeleteAsync",
        starterCode: "", language: "csharp", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Afișează optimizările EF Core: \"AsNoTracking\", \"ExecuteUpdate\", \"ExecuteDelete\", \"FromSqlRaw\".",
        starterCode: "using System;\nclass Program {\n  static void Main() {\n    Console.WriteLine(\"AsNoTracking\");\n    Console.WriteLine(\"ExecuteUpdate\");\n    Console.WriteLine(\"ExecuteDelete\");\n    Console.WriteLine(\"FromSqlRaw\");\n  }\n}",
        language: "csharp", expectedOutput: "AsNoTracking\nExecuteUpdate\nExecuteDelete\nFromSqlRaw",
        options: [], answer: "AsNoTracking\nExecuteUpdate\nExecuteDelete\nFromSqlRaw"
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Afișează strategiile de loading EF: \"Eager (Include)\", \"Lazy (virtual)\", \"Explicit (Load)\".",
        starterCode: "using System;\nclass Program {\n  static void Main() {\n    Console.WriteLine(\"Eager (Include)\");\n    Console.WriteLine(\"Lazy (virtual)\");\n    Console.WriteLine(\"Explicit (Load)\");\n  }\n}",
        language: "csharp", expectedOutput: "Eager (Include)\nLazy (virtual)\nExplicit (Load)",
        options: [], answer: "Eager (Include)\nLazy (virtual)\nExplicit (Load)"
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Afișează probleme comune EF Core: \"N+1 queries\", \"cartesian explosion\", \"lazy loading trap\".",
        starterCode: "using System;\nclass Program {\n  static void Main() {\n    Console.WriteLine(\"N+1 queries\");\n    Console.WriteLine(\"cartesian explosion\");\n    Console.WriteLine(\"lazy loading trap\");\n  }\n}",
        language: "csharp", expectedOutput: "N+1 queries\ncartesian explosion\nlazy loading trap",
        options: [], answer: "N+1 queries\ncartesian explosion\nlazy loading trap"
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Afișează versiunile EF Core și .NET corespondente: \"EF Core 7 = .NET 7\", \"EF Core 8 = .NET 8\".",
        starterCode: "using System;\nclass Program {\n  static void Main() {\n    Console.WriteLine(\"EF Core 7 = .NET 7\");\n    Console.WriteLine(\"EF Core 8 = .NET 8\");\n  }\n}",
        language: "csharp", expectedOutput: "EF Core 7 = .NET 7\nEF Core 8 = .NET 8",
        options: [], answer: "EF Core 7 = .NET 7\nEF Core 8 = .NET 8"
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Afișează avantajul AsNoTracking: \"mai rapid\" și \"mai putina memorie\".",
        starterCode: "using System;\nclass Program {\n  static void Main() {\n    Console.WriteLine(\"mai rapid\");\n    Console.WriteLine(\"mai putina memorie\");\n  }\n}",
        language: "csharp", expectedOutput: "mai rapid\nmai putina memorie",
        options: [], answer: "mai rapid\nmai putina memorie"
      }
    ]
  },
  // ─── 35. ASP.NET Core Identity si JWT ───────────────────────────────────
  {
    lessonId: "6a09ba59855b60bc2da6dd17",
    name: "35. ASP.NET Core Identity si JWT",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează: Serviciul pentru gestionarea utilizatorilor Identity.\n```csharp\npublic class AuthController : ControllerBase {\n  private readonly ___ <ApplicationUser> _userManager;\n}\n```",
        options: [], answer: "UserManager",
        starterCode: "", language: "csharp", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează: Serviciul pentru gestionarea rolurilor.\n```csharp\nprivate readonly ___ <IdentityRole> _roleManager;\n```",
        options: [], answer: "RoleManager",
        starterCode: "", language: "csharp", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează: Schema de autentificare JWT bearer.\n```csharp\nservices.AddAuthentication(JwtBearerDefaults.___)\n  .AddJwtBearer(...);\n```",
        options: [], answer: "AuthenticationScheme",
        starterCode: "", language: "csharp", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează: Adnotarea pentru a proteja un endpoint.\n```csharp\n[___]\n[HttpGet(\"profile\")]\npublic IActionResult GetProfile() { ... }\n```",
        options: [], answer: "Authorize",
        starterCode: "", language: "csharp", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează: Creează un token JWT.\n```csharp\nvar token = new ___(new JwtSecurityToken(...));\n```",
        options: [], answer: "JwtSecurityTokenHandler",
        starterCode: "", language: "csharp", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Afișează fluxul Identity + JWT: \"1. Register\", \"2. Login\", \"3. Token JWT\", \"4. Request + Bearer\".",
        starterCode: "using System;\nclass Program {\n  static void Main() {\n    Console.WriteLine(\"1. Register\");\n    Console.WriteLine(\"2. Login\");\n    Console.WriteLine(\"3. Token JWT\");\n    Console.WriteLine(\"4. Request + Bearer\");\n  }\n}",
        language: "csharp", expectedOutput: "1. Register\n2. Login\n3. Token JWT\n4. Request + Bearer",
        options: [], answer: "1. Register\n2. Login\n3. Token JWT\n4. Request + Bearer"
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Afișează claims standard JWT: \"sub\", \"email\", \"role\", \"exp\".",
        starterCode: "using System;\nclass Program {\n  static void Main() {\n    Console.WriteLine(\"sub\");\n    Console.WriteLine(\"email\");\n    Console.WriteLine(\"role\");\n    Console.WriteLine(\"exp\");\n  }\n}",
        language: "csharp", expectedOutput: "sub\nemail\nrole\nexp",
        options: [], answer: "sub\nemail\nrole\nexp"
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Afișează rolurile tipice: \"Admin\", \"User\", \"Moderator\".",
        starterCode: "using System;\nclass Program {\n  static void Main() {\n    Console.WriteLine(\"Admin\");\n    Console.WriteLine(\"User\");\n    Console.WriteLine(\"Moderator\");\n  }\n}",
        language: "csharp", expectedOutput: "Admin\nUser\nModerator",
        options: [], answer: "Admin\nUser\nModerator"
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Afișează NuGet packages Identity: \"Microsoft.AspNetCore.Identity.EntityFrameworkCore\", \"System.IdentityModel.Tokens.Jwt\".",
        starterCode: "using System;\nclass Program {\n  static void Main() {\n    Console.WriteLine(\"Microsoft.AspNetCore.Identity.EntityFrameworkCore\");\n    Console.WriteLine(\"System.IdentityModel.Tokens.Jwt\");\n  }\n}",
        language: "csharp", expectedOutput: "Microsoft.AspNetCore.Identity.EntityFrameworkCore\nSystem.IdentityModel.Tokens.Jwt",
        options: [], answer: "Microsoft.AspNetCore.Identity.EntityFrameworkCore\nSystem.IdentityModel.Tokens.Jwt"
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Afișează atributele de autorizare: \"[Authorize]\", \"[AllowAnonymous]\", \"[Authorize(Roles=\\\"Admin\\\")]\".",
        starterCode: "using System;\nclass Program {\n  static void Main() {\n    Console.WriteLine(\"[Authorize]\");\n    Console.WriteLine(\"[AllowAnonymous]\");\n    Console.WriteLine(\"[Authorize(Roles=\\\"Admin\\\")]\");\n  }\n}",
        language: "csharp", expectedOutput: "[Authorize]\n[AllowAnonymous]\n[Authorize(Roles=\"Admin\")]",
        options: [], answer: "[Authorize]\n[AllowAnonymous]\n[Authorize(Roles=\"Admin\")]"
      }
    ]
  }
];

async function main() {
  for (const fix of FIXES) {
    const del = await prisma.task.deleteMany({ where: { lessonId: fix.lessonId, number: { gte: 6 } } });
    await prisma.task.createMany({ data: fix.tasks.map(t => ({ ...t, lessonId: fix.lessonId })) });
    console.log(`✓ ${fix.name} — deleted ${del.count}, created ${fix.tasks.length}`);
  }
  console.log("Done.");
  await prisma.$disconnect();
}
main().catch(e => { console.error(e); process.exit(1); });
