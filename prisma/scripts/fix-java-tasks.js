"use strict";
require("dotenv").config({ path: ".env" });
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const FIXES = [
  // ─── 6. Input și conversii ───────────────────────────────────────────────
  {
    lessonId: "69fb776b023e09d08efe0579",
    name: "6. Input și conversii",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează: Convertește un String în int folosind metoda corectă.\n```java\nString s = \"42\";\nint n = Integer.___( s );\nSystem.out.println(n);\n```",
        options: [], answer: "parseInt",
        starterCode: "", language: "java", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează: Citește o linie de text de la tastatură cu Scanner.\n```java\nScanner sc = new Scanner(System.in);\nString linie = sc.___();\nSystem.out.println(linie);\n```",
        options: [], answer: "nextLine",
        starterCode: "", language: "java", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează: Convertește un String în double.\n```java\nString s = \"3.14\";\ndouble d = Double.___( s );\nSystem.out.println(d);\n```",
        options: [], answer: "parseDouble",
        starterCode: "", language: "java", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează: Convertește un int în String folosind metoda statică.\n```java\nint n = 99;\nString s = String.___( n );\nSystem.out.println(s);\n```",
        options: [], answer: "valueOf",
        starterCode: "", language: "java", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează: Citește un număr întreg cu Scanner.\n```java\nScanner sc = new Scanner(System.in);\nint nr = sc.___();\nSystem.out.println(nr);\n```",
        options: [], answer: "nextInt",
        starterCode: "", language: "java", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Convertește String-urile \"10\" și \"20\" în int, adună-le și afișează suma.",
        starterCode: "public class Main {\n  public static void main(String[] args) {\n    String a = \"10\";\n    String b = \"20\";\n    int suma = Integer.parseInt(a) + Integer.parseInt(b);\n    System.out.println(suma);\n  }\n}",
        language: "java", expectedOutput: "30",
        options: [], answer: "30"
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Declară int-ul 255 și afișează-l convertit în String cu prefix \"Valoare: \".",
        starterCode: "public class Main {\n  public static void main(String[] args) {\n    int n = 255;\n    String s = \"Valoare: \" + String.valueOf(n);\n    System.out.println(s);\n  }\n}",
        language: "java", expectedOutput: "Valoare: 255",
        options: [], answer: "Valoare: 255"
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Convertește String-ul \"3.14\" în double și afișează dublul valorii.",
        starterCode: "public class Main {\n  public static void main(String[] args) {\n    String s = \"3.14\";\n    double d = Double.parseDouble(s);\n    System.out.println(d * 2);\n  }\n}",
        language: "java", expectedOutput: "6.28",
        options: [], answer: "6.28"
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Afișează valoarea maximă dintre int-urile 47 și 83 folosind Math.max.",
        starterCode: "public class Main {\n  public static void main(String[] args) {\n    int a = 47;\n    int b = 83;\n    System.out.println(Math.max(a, b));\n  }\n}",
        language: "java", expectedOutput: "83",
        options: [], answer: "83"
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Convertește int-ul 42 la long, la float și la double și afișează fiecare pe câte o linie.",
        starterCode: "public class Main {\n  public static void main(String[] args) {\n    int n = 42;\n    long l = (long) n;\n    float f = (float) n;\n    double d = (double) n;\n    System.out.println(l);\n    System.out.println(f);\n    System.out.println(d);\n  }\n}",
        language: "java", expectedOutput: "42\n42.0\n42.0",
        options: [], answer: "42\n42.0\n42.0"
      }
    ]
  },
  // ─── 7. Condiții și bucle (avansat) ─────────────────────────────────────
  {
    lessonId: "69fb776d023e09d08efe0585",
    name: "7. Condiții și bucle (avansat)",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează: Folosește switch expression (Java 14+) cu arrow.\n```java\nint zi = 2;\nString nume = switch (zi) {\n  case 1 -> \"Luni\";\n  case 2 ___ \"Marți\";\n  default -> \"Alta\";\n};\nSystem.out.println(nume);\n```",
        options: [], answer: "->",
        starterCode: "", language: "java", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează: Enhanced for loop pentru un array.\n```java\nint[] arr = {1, 2, 3};\nfor (___ x : arr) {\n  System.out.println(x);\n}\n```",
        options: [], answer: "int",
        starterCode: "", language: "java", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează: Bucla do-while execută blocul cel puțin o dată.\n```java\nint i = 0;\n___ {\n  System.out.println(i);\n  i++;\n} while (i < 3);\n```",
        options: [], answer: "do",
        starterCode: "", language: "java", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează: Ieși din bucla curentă cu keyword-ul corect.\n```java\nfor (int i = 0; i < 10; i++) {\n  if (i == 5) ___;\n  System.out.println(i);\n}\n```",
        options: [], answer: "break",
        starterCode: "", language: "java", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează: Sari la iterația următoare cu keyword-ul corect.\n```java\nfor (int i = 0; i < 5; i++) {\n  if (i == 2) ___;\n  System.out.println(i);\n}\n```",
        options: [], answer: "continue",
        starterCode: "", language: "java", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Folosind enhanced for, afișează suma elementelor din array-ul {5, 10, 15, 20}.",
        starterCode: "public class Main {\n  public static void main(String[] args) {\n    int[] arr = {5, 10, 15, 20};\n    int suma = 0;\n    for (int x : arr) suma += x;\n    System.out.println(suma);\n  }\n}",
        language: "java", expectedOutput: "50",
        options: [], answer: "50"
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Folosind switch expression, afișează tipul zilei (\"Weekend\" sau \"Zi de lucru\") pentru ziua 6 (Sâmbătă).",
        starterCode: "public class Main {\n  public static void main(String[] args) {\n    int zi = 6;\n    String tip = switch (zi) {\n      case 6, 7 -> \"Weekend\";\n      default -> \"Zi de lucru\";\n    };\n    System.out.println(tip);\n  }\n}",
        language: "java", expectedOutput: "Weekend",
        options: [], answer: "Weekend"
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Afișează numerele de la 1 la 5 folosind bucla while.",
        starterCode: "public class Main {\n  public static void main(String[] args) {\n    int i = 1;\n    while (i <= 5) {\n      System.out.println(i);\n      i++;\n    }\n  }\n}",
        language: "java", expectedOutput: "1\n2\n3\n4\n5",
        options: [], answer: "1\n2\n3\n4\n5"
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Afișează toate numerele pare din intervalul 1-10 folosind for și continue.",
        starterCode: "public class Main {\n  public static void main(String[] args) {\n    for (int i = 1; i <= 10; i++) {\n      if (i % 2 != 0) continue;\n      System.out.println(i);\n    }\n  }\n}",
        language: "java", expectedOutput: "2\n4\n6\n8\n10",
        options: [], answer: "2\n4\n6\n8\n10"
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Calculează și afișează factorialul lui 5 folosind un for loop.",
        starterCode: "public class Main {\n  public static void main(String[] args) {\n    int result = 1;\n    for (int i = 1; i <= 5; i++) result *= i;\n    System.out.println(result);\n  }\n}",
        language: "java", expectedOutput: "120",
        options: [], answer: "120"
      }
    ]
  },
  // ─── 8. String — operații avansate ──────────────────────────────────────
  {
    lessonId: "69fb776f023e09d08efe0591",
    name: "8. String — operații avansate",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează: Extrage caracterele de la indexul 0 la 4 (exclusiv).\n```java\nString s = \"Hello World\";\nString sub = s.___(0, 4);\nSystem.out.println(sub);\n```",
        options: [], answer: "substring",
        starterCode: "", language: "java", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează: Găsește prima apariție a caracterului 'o'.\n```java\nString s = \"Hello World\";\nint idx = s.___('o');\nSystem.out.println(idx);\n```",
        options: [], answer: "indexOf",
        starterCode: "", language: "java", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează: Convertește String-ul la majuscule.\n```java\nString s = \"java\";\nString upper = s.___();\nSystem.out.println(upper);\n```",
        options: [], answer: "toUpperCase",
        starterCode: "", language: "java", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează: Adaugă text la un StringBuilder.\n```java\nStringBuilder sb = new StringBuilder();\nsb.___( \"Hello\" );\nsb.___( \" World\" );\nSystem.out.println(sb.toString());\n```",
        options: [], answer: "append",
        starterCode: "", language: "java", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează: Înlocuiește toate aparițiile lui 'a' cu 'e'.\n```java\nString s = \"banana\";\nString r = s.___( \"a\", \"e\" );\nSystem.out.println(r);\n```",
        options: [], answer: "replace",
        starterCode: "", language: "java", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Afișează lungimea String-ului \"Programare\" și primul caracter al său.",
        starterCode: "public class Main {\n  public static void main(String[] args) {\n    String s = \"Programare\";\n    System.out.println(s.length());\n    System.out.println(s.charAt(0));\n  }\n}",
        language: "java", expectedOutput: "10\nP",
        options: [], answer: "10\nP"
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Concatenează \"Hello\" și \"World\" cu un spațiu între ele folosind StringBuilder și afișează rezultatul.",
        starterCode: "public class Main {\n  public static void main(String[] args) {\n    StringBuilder sb = new StringBuilder();\n    sb.append(\"Hello\");\n    sb.append(\" \");\n    sb.append(\"World\");\n    System.out.println(sb.toString());\n  }\n}",
        language: "java", expectedOutput: "Hello World",
        options: [], answer: "Hello World"
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Dintr-un String \"ana are mere\", afișează varianta cu majuscule și varianta cu minuscule.",
        starterCode: "public class Main {\n  public static void main(String[] args) {\n    String s = \"ana are mere\";\n    System.out.println(s.toUpperCase());\n    System.out.println(s.toLowerCase());\n  }\n}",
        language: "java", expectedOutput: "ANA ARE MERE\nana are mere",
        options: [], answer: "ANA ARE MERE\nana are mere"
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Verifică dacă String-ul \"Java este tare\" conține \"tare\" și afișează true sau false.",
        starterCode: "public class Main {\n  public static void main(String[] args) {\n    String s = \"Java este tare\";\n    System.out.println(s.contains(\"tare\"));\n  }\n}",
        language: "java", expectedOutput: "true",
        options: [], answer: "true"
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Separă String-ul \"mere,pere,prune\" după virgulă și afișează fiecare element pe linie nouă.",
        starterCode: "public class Main {\n  public static void main(String[] args) {\n    String s = \"mere,pere,prune\";\n    String[] parts = s.split(\",\");\n    for (String p : parts) System.out.println(p);\n  }\n}",
        language: "java", expectedOutput: "mere\npere\nprune",
        options: [], answer: "mere\npere\nprune"
      }
    ]
  },
  // ─── 9. Recursivitate ────────────────────────────────────────────────────
  {
    lessonId: "69fb7770023e09d08efe059d",
    name: "9. Recursivitate",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează: Cazul de bază al factorialului recursiv.\n```java\nstatic int factorial(int n) {\n  if (n == ___) return 1;\n  return n * factorial(n - 1);\n}\n```",
        options: [], answer: "0",
        starterCode: "", language: "java", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează: Apelul recursiv pentru Fibonacci.\n```java\nstatic int fib(int n) {\n  if (n <= 1) return n;\n  return ___(n-1) + fib(n-2);\n}\n```",
        options: [], answer: "fib",
        starterCode: "", language: "java", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează: Suma recursivă a primelor n numere.\n```java\nstatic int suma(int n) {\n  if (n == 0) return 0;\n  return n + ___( n - 1 );\n}\n```",
        options: [], answer: "suma",
        starterCode: "", language: "java", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează: Puterea unui număr prin recursivitate.\n```java\nstatic int putere(int baza, int exp) {\n  if (exp == ___) return 1;\n  return baza * putere(baza, exp - 1);\n}\n```",
        options: [], answer: "0",
        starterCode: "", language: "java", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează: Fiecare apel recursiv reduce problema spre cazul de bază.\n```java\nstatic void numaratoare(int n) {\n  if (n == 0) return;\n  System.out.println(n);\n  numaratoare(n - ___);\n}\n```",
        options: [], answer: "1",
        starterCode: "", language: "java", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Calculează și afișează factorialul lui 6 folosind o metodă recursivă.",
        starterCode: "public class Main {\n  static int factorial(int n) {\n    if (n == 0) return 1;\n    return n * factorial(n - 1);\n  }\n  public static void main(String[] args) {\n    System.out.println(factorial(6));\n  }\n}",
        language: "java", expectedOutput: "720",
        options: [], answer: "720"
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Afișează al 7-lea număr Fibonacci (0-indexat) folosind recursivitate. fib(0)=0, fib(1)=1.",
        starterCode: "public class Main {\n  static int fib(int n) {\n    if (n <= 1) return n;\n    return fib(n-1) + fib(n-2);\n  }\n  public static void main(String[] args) {\n    System.out.println(fib(7));\n  }\n}",
        language: "java", expectedOutput: "13",
        options: [], answer: "13"
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Calculează suma primelor 10 numere naturale recursiv și afișează rezultatul.",
        starterCode: "public class Main {\n  static int suma(int n) {\n    if (n == 0) return 0;\n    return n + suma(n - 1);\n  }\n  public static void main(String[] args) {\n    System.out.println(suma(10));\n  }\n}",
        language: "java", expectedOutput: "55",
        options: [], answer: "55"
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Calculează 2 la puterea 8 folosind o metodă recursivă și afișează rezultatul.",
        starterCode: "public class Main {\n  static int putere(int baza, int exp) {\n    if (exp == 0) return 1;\n    return baza * putere(baza, exp - 1);\n  }\n  public static void main(String[] args) {\n    System.out.println(putere(2, 8));\n  }\n}",
        language: "java", expectedOutput: "256",
        options: [], answer: "256"
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Numără câte cifre are numărul 98765 folosind recursivitate și afișează rezultatul.",
        starterCode: "public class Main {\n  static int cifre(int n) {\n    if (n < 10) return 1;\n    return 1 + cifre(n / 10);\n  }\n  public static void main(String[] args) {\n    System.out.println(cifre(98765));\n  }\n}",
        language: "java", expectedOutput: "5",
        options: [], answer: "5"
      }
    ]
  },
  // ─── 10. Bune Practici Java — Recap ─────────────────────────────────────
  {
    lessonId: "69fb7772023e09d08efe05a9",
    name: "10. Bune Practici Java — Recap",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează: Declară o constantă de clasă cu valoare fixă.\n```java\npublic class Config {\n  public static ___ int MAX = 100;\n}\n```",
        options: [], answer: "final",
        starterCode: "", language: "java", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează: Convenția de naming pentru constante în Java.\n```java\npublic static final int ___ = 3600;\n```",
        options: [], answer: "SECONDS_PER_HOUR",
        starterCode: "", language: "java", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează: Encapsularea se realizează prin declararea câmpurilor ca ___.\n```java\npublic class Persoana {\n  ___ String nume;\n  public String getNume() { return nume; }\n}\n```",
        options: [], answer: "private",
        starterCode: "", language: "java", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează: Convenția de naming pentru metode și variabile în Java este ___.\n```java\n// Corect:\npublic void ___(String numeUtilizator) { ... }\n```",
        options: [], answer: "setNumeUtilizator",
        starterCode: "", language: "java", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează: Getter-ul pentru câmpul `varsta`.\n```java\npublic int ___() {\n  return varsta;\n}\n```",
        options: [], answer: "getVarsta",
        starterCode: "", language: "java", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Creează o clasă Cerc cu câmpul privat `raza` (double, 5.0), un getter și calculează aria (Math.PI * r * r). Afișează aria rotunjită la 2 zecimale.",
        starterCode: "public class Main {\n  static double getRaza() { return 5.0; }\n  public static void main(String[] args) {\n    double raza = getRaza();\n    double aria = Math.PI * raza * raza;\n    System.out.printf(\"%.2f%n\", aria);\n  }\n}",
        language: "java", expectedOutput: "78.54",
        options: [], answer: "78.54"
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Declară constanta MAX_ELEVI = 30 și afișează mesajul \"Capacitate maxima: 30\".",
        starterCode: "public class Main {\n  public static final int MAX_ELEVI = 30;\n  public static void main(String[] args) {\n    System.out.println(\"Capacitate maxima: \" + MAX_ELEVI);\n  }\n}",
        language: "java", expectedOutput: "Capacitate maxima: 30",
        options: [], answer: "Capacitate maxima: 30"
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Demonstrează encapsularea: o clasă cu câmp privat `scor` setat la 95, accesat prin getter, afișând valoarea.",
        starterCode: "public class Main {\n  private static int scor = 95;\n  private static int getScor() { return scor; }\n  public static void main(String[] args) {\n    System.out.println(getScor());\n  }\n}",
        language: "java", expectedOutput: "95",
        options: [], answer: "95"
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Folosind convenția camelCase, creează și afișează variabila `numarStudenti` cu valoarea 42.",
        starterCode: "public class Main {\n  public static void main(String[] args) {\n    int numarStudenti = 42;\n    System.out.println(numarStudenti);\n  }\n}",
        language: "java", expectedOutput: "42",
        options: [], answer: "42"
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Afișează cele 3 constante: PI = 3.14159, E = 2.71828, GOLDEN = 1.61803 — câte una pe linie.",
        starterCode: "public class Main {\n  static final double PI = 3.14159;\n  static final double E = 2.71828;\n  static final double GOLDEN = 1.61803;\n  public static void main(String[] args) {\n    System.out.println(PI);\n    System.out.println(E);\n    System.out.println(GOLDEN);\n  }\n}",
        language: "java", expectedOutput: "3.14159\n2.71828\n1.61803",
        options: [], answer: "3.14159\n2.71828\n1.61803"
      }
    ]
  },
  // ─── 12. Generics in Java ────────────────────────────────────────────────
  {
    lessonId: "6a021bedf0ec7fc9c03a6c2b",
    name: "12. Generics in Java",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează: Declară o clasă generică cu tipul T.\n```java\npublic class Cutie<___> {\n  private T valoare;\n  public T getValoare() { return valoare; }\n}\n```",
        options: [], answer: "T",
        starterCode: "", language: "java", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează: Declară o Listă de String-uri.\n```java\nList<___> lista = new ArrayList<>();\nlista.add(\"Java\");\n```",
        options: [], answer: "String",
        starterCode: "", language: "java", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează: Bounded type parameter — T trebuie să extindă Number.\n```java\npublic <T extends ___> double suma(T a, T b) {\n  return a.doubleValue() + b.doubleValue();\n}\n```",
        options: [], answer: "Number",
        starterCode: "", language: "java", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează: Wildcard pentru orice subtip de Number.\n```java\npublic void afiseaza(List<___ Number> lista) {\n  for (Number n : lista) System.out.println(n);\n}\n```",
        options: [], answer: "? extends",
        starterCode: "", language: "java", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează: Metodă generică cu tipul T inferit la apel.\n```java\npublic static <___> void afiseaza(T val) {\n  System.out.println(val);\n}\n```",
        options: [], answer: "T",
        starterCode: "", language: "java", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Creează un ArrayList<String> cu elementele \"Java\", \"Python\", \"C++\" și afișează-le pe linii separate.",
        starterCode: "import java.util.ArrayList;\nimport java.util.List;\npublic class Main {\n  public static void main(String[] args) {\n    List<String> lista = new ArrayList<>();\n    lista.add(\"Java\");\n    lista.add(\"Python\");\n    lista.add(\"C++\");\n    for (String s : lista) System.out.println(s);\n  }\n}",
        language: "java", expectedOutput: "Java\nPython\nC++",
        options: [], answer: "Java\nPython\nC++"
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Creează un ArrayList<Integer> cu valorile 10, 20, 30 și afișează suma lor.",
        starterCode: "import java.util.ArrayList;\nimport java.util.List;\npublic class Main {\n  public static void main(String[] args) {\n    List<Integer> lista = new ArrayList<>();\n    lista.add(10);\n    lista.add(20);\n    lista.add(30);\n    int suma = 0;\n    for (int x : lista) suma += x;\n    System.out.println(suma);\n  }\n}",
        language: "java", expectedOutput: "60",
        options: [], answer: "60"
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Creează un HashMap<String, Integer> cu 3 limbaje și numărul lor de ani de existență: Java=30, Python=33, C=52. Afișează valoarea pentru cheia \"Java\".",
        starterCode: "import java.util.HashMap;\nimport java.util.Map;\npublic class Main {\n  public static void main(String[] args) {\n    Map<String, Integer> map = new HashMap<>();\n    map.put(\"Java\", 30);\n    map.put(\"Python\", 33);\n    map.put(\"C\", 52);\n    System.out.println(map.get(\"Java\"));\n  }\n}",
        language: "java", expectedOutput: "30",
        options: [], answer: "30"
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Verifică dacă un ArrayList<Integer> conține valoarea 42 și afișează true sau false.",
        starterCode: "import java.util.ArrayList;\nimport java.util.List;\npublic class Main {\n  public static void main(String[] args) {\n    List<Integer> lista = new ArrayList<>();\n    lista.add(10);\n    lista.add(42);\n    lista.add(7);\n    System.out.println(lista.contains(42));\n  }\n}",
        language: "java", expectedOutput: "true",
        options: [], answer: "true"
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Afișează dimensiunea unui ArrayList<String> după adăugarea a 4 elemente.",
        starterCode: "import java.util.ArrayList;\nimport java.util.List;\npublic class Main {\n  public static void main(String[] args) {\n    List<String> lista = new ArrayList<>();\n    lista.add(\"a\");\n    lista.add(\"b\");\n    lista.add(\"c\");\n    lista.add(\"d\");\n    System.out.println(lista.size());\n  }\n}",
        language: "java", expectedOutput: "4",
        options: [], answer: "4"
      }
    ]
  },
  // ─── 13. Functional Programming and Streams ─────────────────────────────
  {
    lessonId: "6a021beef0ec7fc9c03a6c31",
    name: "13. Functional Programming and Streams",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează: Lambda care înmulțește cu 2.\n```java\nFunction<Integer, Integer> dublu = x -> x ___ 2;\nSystem.out.println(dublu.apply(5));\n```",
        options: [], answer: "*",
        starterCode: "", language: "java", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează: Filtrarea unui stream pentru numere pare.\n```java\nList<Integer> pare = lista.stream()\n  .___(x -> x % 2 == 0)\n  .collect(Collectors.toList());\n```",
        options: [], answer: "filter",
        starterCode: "", language: "java", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează: Transformă fiecare element cu map.\n```java\nList<Integer> duble = lista.stream()\n  .___(x -> x * 2)\n  .collect(Collectors.toList());\n```",
        options: [], answer: "map",
        starterCode: "", language: "java", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează: Colectează rezultatele stream-ului într-o listă.\n```java\nList<String> result = stream\n  .filter(s -> s.length() > 3)\n  .___(Collectors.toList());\n```",
        options: [], answer: "collect",
        starterCode: "", language: "java", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează: Interfața funcțională care nu returnează nimic.\n```java\n___ printer = s -> System.out.println(s);\nprinter.accept(\"Hello\");\n```",
        options: [], answer: "Consumer<String>",
        starterCode: "", language: "java", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Filtrează dintr-o listă de numere {1,2,3,4,5,6} doar pe cele pare și afișează-le pe linii separate.",
        starterCode: "import java.util.*;\nimport java.util.stream.*;\npublic class Main {\n  public static void main(String[] args) {\n    List<Integer> lista = Arrays.asList(1,2,3,4,5,6);\n    lista.stream()\n      .filter(x -> x % 2 == 0)\n      .forEach(System.out::println);\n  }\n}",
        language: "java", expectedOutput: "2\n4\n6",
        options: [], answer: "2\n4\n6"
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Transformă o listă de String-uri {\"ana\",\"ion\",\"maria\"} în majuscule și afișează-le.",
        starterCode: "import java.util.*;\nimport java.util.stream.*;\npublic class Main {\n  public static void main(String[] args) {\n    List<String> lista = Arrays.asList(\"ana\",\"ion\",\"maria\");\n    lista.stream()\n      .map(String::toUpperCase)\n      .forEach(System.out::println);\n  }\n}",
        language: "java", expectedOutput: "ANA\nION\nMARIA",
        options: [], answer: "ANA\nION\nMARIA"
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Calculează suma numerelor din lista {10, 20, 30, 40} folosind Stream.reduce și afișează rezultatul.",
        starterCode: "import java.util.*;\nimport java.util.stream.*;\npublic class Main {\n  public static void main(String[] args) {\n    List<Integer> lista = Arrays.asList(10,20,30,40);\n    int suma = lista.stream().reduce(0, Integer::sum);\n    System.out.println(suma);\n  }\n}",
        language: "java", expectedOutput: "100",
        options: [], answer: "100"
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Numără câte elemente din lista {\"java\",\"python\",\"js\",\"go\"} au lungimea mai mare de 2 și afișează contorul.",
        starterCode: "import java.util.*;\nimport java.util.stream.*;\npublic class Main {\n  public static void main(String[] args) {\n    List<String> lista = Arrays.asList(\"java\",\"python\",\"js\",\"go\");\n    long count = lista.stream().filter(s -> s.length() > 2).count();\n    System.out.println(count);\n  }\n}",
        language: "java", expectedOutput: "2",
        options: [], answer: "2"
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Găsește valoarea maximă din lista {3, 17, 8, 25, 11} folosind Stream și afișează-o.",
        starterCode: "import java.util.*;\nimport java.util.stream.*;\npublic class Main {\n  public static void main(String[] args) {\n    List<Integer> lista = Arrays.asList(3,17,8,25,11);\n    int max = lista.stream().mapToInt(Integer::intValue).max().getAsInt();\n    System.out.println(max);\n  }\n}",
        language: "java", expectedOutput: "25",
        options: [], answer: "25"
      }
    ]
  },
  // ─── 14. Exception Handling Advanced ────────────────────────────────────
  {
    lessonId: "6a021bf0f0ec7fc9c03a6c39",
    name: "14. Exception Handling Advanced",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează: Blocul care rulează întotdeauna, indiferent de excepție.\n```java\ntry {\n  int x = 10 / 0;\n} catch (Exception e) {\n  System.out.println(\"Eroare\");\n} ___ {\n  System.out.println(\"Final\");\n}\n```",
        options: [], answer: "finally",
        starterCode: "", language: "java", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează: Aruncă manual o excepție.\n```java\npublic void setVarsta(int v) {\n  if (v < 0) ___ new IllegalArgumentException(\"Varsta negativa\");\n  this.varsta = v;\n}\n```",
        options: [], answer: "throw",
        starterCode: "", language: "java", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează: Declară că o metodă poate arunca o excepție checked.\n```java\npublic void citeste() ___ IOException {\n  // ...\n}\n```",
        options: [], answer: "throws",
        starterCode: "", language: "java", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează: Prinde mai multe tipuri de excepții cu multi-catch.\n```java\ntry {\n  // cod\n} catch (IOException ___ SQLException e) {\n  System.out.println(e.getMessage());\n}\n```",
        options: [], answer: "|",
        starterCode: "", language: "java", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează: O excepție custom extinde clasa ___.\n```java\npublic class VarstaNegativaException extends ___ {\n  public VarstaNegativaException(String msg) { super(msg); }\n}\n```",
        options: [], answer: "Exception",
        starterCode: "", language: "java", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Împarte 10 la 0 într-un bloc try-catch, prinde ArithmeticException și afișează \"Impartire la zero\".",
        starterCode: "public class Main {\n  public static void main(String[] args) {\n    try {\n      int r = 10 / 0;\n    } catch (ArithmeticException e) {\n      System.out.println(\"Impartire la zero\");\n    }\n  }\n}",
        language: "java", expectedOutput: "Impartire la zero",
        options: [], answer: "Impartire la zero"
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Folosind try-catch-finally, afișează \"Inceput\", aruncă o RuntimeException, prinde-o afișând \"Prins\", și în finally afișează \"Final\".",
        starterCode: "public class Main {\n  public static void main(String[] args) {\n    System.out.println(\"Inceput\");\n    try {\n      throw new RuntimeException(\"eroare\");\n    } catch (RuntimeException e) {\n      System.out.println(\"Prins\");\n    } finally {\n      System.out.println(\"Final\");\n    }\n  }\n}",
        language: "java", expectedOutput: "Inceput\nPrins\nFinal",
        options: [], answer: "Inceput\nPrins\nFinal"
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Parsează String-ul \"abc\" ca int, prinde NumberFormatException și afișează \"Format invalid\".",
        starterCode: "public class Main {\n  public static void main(String[] args) {\n    try {\n      int n = Integer.parseInt(\"abc\");\n    } catch (NumberFormatException e) {\n      System.out.println(\"Format invalid\");\n    }\n  }\n}",
        language: "java", expectedOutput: "Format invalid",
        options: [], answer: "Format invalid"
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Accesează indexul 10 al unui array de dimensiune 3, prinde ArrayIndexOutOfBoundsException și afișează \"Index invalid\".",
        starterCode: "public class Main {\n  public static void main(String[] args) {\n    int[] arr = {1, 2, 3};\n    try {\n      int x = arr[10];\n    } catch (ArrayIndexOutOfBoundsException e) {\n      System.out.println(\"Index invalid\");\n    }\n  }\n}",
        language: "java", expectedOutput: "Index invalid",
        options: [], answer: "Index invalid"
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Afișează \"OK\" dacă try reușește și \"Eroare\" dacă apare orice Exception. Testează cu o împărțire 8/2 (fără excepție).",
        starterCode: "public class Main {\n  public static void main(String[] args) {\n    try {\n      int r = 8 / 2;\n      System.out.println(\"OK\");\n    } catch (Exception e) {\n      System.out.println(\"Eroare\");\n    }\n  }\n}",
        language: "java", expectedOutput: "OK",
        options: [], answer: "OK"
      }
    ]
  },
  // ─── 15. Multithreading Basics ───────────────────────────────────────────
  {
    lessonId: "6a021bf1f0ec7fc9c03a6c3f",
    name: "15. Multithreading Basics",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează: Clasa care poate fi extinsă pentru a crea un thread.\n```java\npublic class FirMeu extends ___ {\n  public void run() { System.out.println(\"Fir\"); }\n}\n```",
        options: [], answer: "Thread",
        starterCode: "", language: "java", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează: Interfața funcțională folosită cu Thread.\n```java\nThread t = new Thread(new ___ () {\n  public void run() { System.out.println(\"run\"); }\n});\n```",
        options: [], answer: "Runnable",
        starterCode: "", language: "java", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează: Metoda care pornește execuția unui thread.\n```java\nThread t = new Thread(() -> System.out.println(\"Fir\"));\nt.___();\n```",
        options: [], answer: "start",
        starterCode: "", language: "java", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează: Keyword pentru a preveni accesul concurent la o metodă.\n```java\npublic ___ void incrementeaza() {\n  count++;\n}\n```",
        options: [], answer: "synchronized",
        starterCode: "", language: "java", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează: Metoda care suspendă execuția pentru N milisecunde.\n```java\ntry {\n  Thread.___(1000);\n} catch (InterruptedException e) { }\n```",
        options: [], answer: "sleep",
        starterCode: "", language: "java", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Creează un Thread cu lambda care afișează \"Thread pornit\" și pornește-l. Așteaptă finalizarea cu join() și afișează \"Gata\".",
        starterCode: "public class Main {\n  public static void main(String[] args) throws InterruptedException {\n    Thread t = new Thread(() -> System.out.println(\"Thread pornit\"));\n    t.start();\n    t.join();\n    System.out.println(\"Gata\");\n  }\n}",
        language: "java", expectedOutput: "Thread pornit\nGata",
        options: [], answer: "Thread pornit\nGata"
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Afișează numele thread-ului curent folosind Thread.currentThread().getName().",
        starterCode: "public class Main {\n  public static void main(String[] args) {\n    System.out.println(Thread.currentThread().getName());\n  }\n}",
        language: "java", expectedOutput: "main",
        options: [], answer: "main"
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Creează 3 thread-uri fiecare afișând propriul număr (1, 2, 3). Pornește-le și join-uiește-le în ordine.",
        starterCode: "public class Main {\n  public static void main(String[] args) throws InterruptedException {\n    for (int i = 1; i <= 3; i++) {\n      final int nr = i;\n      Thread t = new Thread(() -> System.out.println(nr));\n      t.start();\n      t.join();\n    }\n  }\n}",
        language: "java", expectedOutput: "1\n2\n3",
        options: [], answer: "1\n2\n3"
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Verifică dacă un thread este activ (isAlive) după join și afișează rezultatul (false).",
        starterCode: "public class Main {\n  public static void main(String[] args) throws InterruptedException {\n    Thread t = new Thread(() -> System.out.print(\"\"));\n    t.start();\n    t.join();\n    System.out.println(t.isAlive());\n  }\n}",
        language: "java", expectedOutput: "false",
        options: [], answer: "false"
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Afișează prioritatea implicită a unui thread nou creat (Thread.NORM_PRIORITY = 5).",
        starterCode: "public class Main {\n  public static void main(String[] args) {\n    Thread t = new Thread(() -> {});\n    System.out.println(t.getPriority());\n  }\n}",
        language: "java", expectedOutput: "5",
        options: [], answer: "5"
      }
    ]
  },
  // ─── 16. Design Patterns in Java ────────────────────────────────────────
  {
    lessonId: "6a021bf2f0ec7fc9c03a6c45",
    name: "16. Design Patterns in Java",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează: Constructor privat pentru Singleton.\n```java\npublic class Singleton {\n  private static Singleton instance;\n  ___ Singleton() {}\n  public static Singleton getInstance() {\n    if (instance == null) instance = new Singleton();\n    return instance;\n  }\n}\n```",
        options: [], answer: "private",
        starterCode: "", language: "java", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează: Metoda statică de creare în Factory Pattern.\n```java\npublic class FormaFactory {\n  public static Forma creeaza(String tip) {\n    if (tip.equals(\"cerc\")) ___ new Cerc();\n    return new Dreptunghi();\n  }\n}\n```",
        options: [], answer: "return",
        starterCode: "", language: "java", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează: Builder pattern — metoda care construiește obiectul final.\n```java\npublic class PersonBuilder {\n  private String nume;\n  public PersonBuilder setNume(String n) { this.nume = n; return this; }\n  public Person ___() { return new Person(nume); }\n}\n```",
        options: [], answer: "build",
        starterCode: "", language: "java", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează: Pattern-ul Observer notifică toți ___ înregistrați.\n```java\npublic interface Observer {\n  void ___(String eveniment);\n}\n```",
        options: [], answer: "update",
        starterCode: "", language: "java", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează: Singleton thread-safe cu synchronized.\n```java\npublic static ___ Singleton getInstance() {\n  if (instance == null) instance = new Singleton();\n  return instance;\n}\n```",
        options: [], answer: "synchronized",
        starterCode: "", language: "java", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Implementează Singleton: creează instanța o singură dată și afișează \"Instanta creata\" la prima instanțiere, iar la a doua afișare afișează \"Aceeasi instanta\".",
        starterCode: "public class Main {\n  static Object instance = null;\n  static Object getInstance() {\n    if (instance == null) {\n      instance = new Object();\n      System.out.println(\"Instanta creata\");\n    }\n    return instance;\n  }\n  public static void main(String[] args) {\n    getInstance();\n    getInstance();\n    System.out.println(\"Aceeasi instanta\");\n  }\n}",
        language: "java", expectedOutput: "Instanta creata\nAceeasi instanta",
        options: [], answer: "Instanta creata\nAceeasi instanta"
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Implementează Factory: o metodă care primește \"Caine\" sau \"Pisica\" și afișează sunetul corespunzător.",
        starterCode: "public class Main {\n  static String sunet(String animal) {\n    return switch (animal) {\n      case \"Caine\" -> \"Ham\";\n      case \"Pisica\" -> \"Miau\";\n      default -> \"???\";\n    };\n  }\n  public static void main(String[] args) {\n    System.out.println(sunet(\"Caine\"));\n    System.out.println(sunet(\"Pisica\"));\n  }\n}",
        language: "java", expectedOutput: "Ham\nMiau",
        options: [], answer: "Ham\nMiau"
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Demonstrează Builder pattern: construiește un String format din Prenume și Nume afișând \"Ion Popescu\".",
        starterCode: "public class Main {\n  public static void main(String[] args) {\n    String rezultat = new StringBuilder()\n      .append(\"Ion\")\n      .append(\" \")\n      .append(\"Popescu\")\n      .toString();\n    System.out.println(rezultat);\n  }\n}",
        language: "java", expectedOutput: "Ion Popescu",
        options: [], answer: "Ion Popescu"
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Afișează tipul de pattern folosit pentru a construi obiecte fără a expune logica de creare: \"Factory Pattern\".",
        starterCode: "public class Main {\n  public static void main(String[] args) {\n    System.out.println(\"Factory Pattern\");\n  }\n}",
        language: "java", expectedOutput: "Factory Pattern",
        options: [], answer: "Factory Pattern"
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Simulează Strategy pattern: alege strategia de sortare \"BubbleSort\" sau \"QuickSort\" și afișează ce ai ales.",
        starterCode: "public class Main {\n  public static void main(String[] args) {\n    String strategie = \"QuickSort\";\n    System.out.println(\"Strategie aleasa: \" + strategie);\n  }\n}",
        language: "java", expectedOutput: "Strategie aleasa: QuickSort",
        options: [], answer: "Strategie aleasa: QuickSort"
      }
    ]
  },
  // ─── 17. Java I/O and NIO ────────────────────────────────────────────────
  {
    lessonId: "6a021bf3f0ec7fc9c03a6c4b",
    name: "17. Java I/O and NIO",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează: Clasa folosită pentru citirea eficientă a unui fișier.\n```java\nBufferedReader br = new ___(new FileReader(\"fisier.txt\"));\n```",
        options: [], answer: "BufferedReader",
        starterCode: "", language: "java", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează: Metoda NIO pentru citirea tuturor liniilor unui fișier.\n```java\nList<String> linii = Files.___(Path.of(\"fisier.txt\"));\n```",
        options: [], answer: "readAllLines",
        starterCode: "", language: "java", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează: Obține un Path din un String.\n```java\nPath p = ___.of(\"/home/user/fisier.txt\");\n```",
        options: [], answer: "Path",
        starterCode: "", language: "java", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează: Scrie text într-un fișier cu NIO.\n```java\nFiles.___(Path.of(\"out.txt\"), \"Hello\".getBytes());\n```",
        options: [], answer: "write",
        starterCode: "", language: "java", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează: Verifică dacă un fișier există.\n```java\nboolean exista = Files.___(Path.of(\"test.txt\"));\n```",
        options: [], answer: "exists",
        starterCode: "", language: "java", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Afișează extensia fișierului \"document.pdf\" extrasă din String.",
        starterCode: "public class Main {\n  public static void main(String[] args) {\n    String fisier = \"document.pdf\";\n    String ext = fisier.substring(fisier.lastIndexOf('.') + 1);\n    System.out.println(ext);\n  }\n}",
        language: "java", expectedOutput: "pdf",
        options: [], answer: "pdf"
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Construiește un path și afișează numele fișierului: din calea \"/home/user/proiect/Main.java\" afișează \"Main.java\".",
        starterCode: "import java.nio.file.*;\npublic class Main {\n  public static void main(String[] args) {\n    Path p = Path.of(\"/home/user/proiect/Main.java\");\n    System.out.println(p.getFileName());\n  }\n}",
        language: "java", expectedOutput: "Main.java",
        options: [], answer: "Main.java"
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Afișează numărul de linii dintr-un String cu conținut multi-linie (3 linii) folosind split(\"\\n\").",
        starterCode: "public class Main {\n  public static void main(String[] args) {\n    String continut = \"linia1\\nlinia2\\nlinia3\";\n    String[] linii = continut.split(\"\\n\");\n    System.out.println(linii.length);\n  }\n}",
        language: "java", expectedOutput: "3",
        options: [], answer: "3"
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Afișează \"fisier.txt exista: false\" simulând verificarea unui path inexistent.",
        starterCode: "import java.nio.file.*;\npublic class Main {\n  public static void main(String[] args) {\n    Path p = Path.of(\"fisier_inexistent_xyz.txt\");\n    System.out.println(\"fisier.txt exista: \" + Files.exists(p));\n  }\n}",
        language: "java", expectedOutput: "fisier.txt exista: false",
        options: [], answer: "fisier.txt exista: false"
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Afișează directorul curent de lucru folosind System.getProperty(\"user.dir\") — afișează doar că există (un String non-null), verificând cu != null.",
        starterCode: "public class Main {\n  public static void main(String[] args) {\n    String dir = System.getProperty(\"user.dir\");\n    System.out.println(dir != null);\n  }\n}",
        language: "java", expectedOutput: "true",
        options: [], answer: "true"
      }
    ]
  },
  // ─── 18. JDBC and Database Access ───────────────────────────────────────
  {
    lessonId: "6a021bf4f0ec7fc9c03a6c51",
    name: "18. JDBC and Database Access",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează: Interfața folosită pentru executarea interogărilor parametrizate.\n```java\n___ ps = conn.prepareStatement(\"SELECT * FROM users WHERE id=?\");\n```",
        options: [], answer: "PreparedStatement",
        starterCode: "", language: "java", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează: Obiectul care stochează rezultatele unui SELECT.\n```java\n___ rs = ps.executeQuery();\nwhile (rs.next()) { ... }\n```",
        options: [], answer: "ResultSet",
        starterCode: "", language: "java", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează: Metoda pentru obținerea conexiunii la baza de date.\n```java\nConnection conn = DriverManager.___(url, user, pass);\n```",
        options: [], answer: "getConnection",
        starterCode: "", language: "java", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează: Metoda care execută un INSERT/UPDATE/DELETE.\n```java\nint randuri = ps.___();\n```",
        options: [], answer: "executeUpdate",
        starterCode: "", language: "java", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează: Setează primul parametru al PreparedStatement ca String.\n```java\nps.___(1, \"Ion\");\n```",
        options: [], answer: "setString",
        starterCode: "", language: "java", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Simulează un ResultSet cu o listă. Afișează ID-urile 1, 2, 3 ca și cum ar veni din baza de date.",
        starterCode: "public class Main {\n  public static void main(String[] args) {\n    int[] ids = {1, 2, 3};\n    for (int id : ids) System.out.println(\"ID: \" + id);\n  }\n}",
        language: "java", expectedOutput: "ID: 1\nID: 2\nID: 3",
        options: [], answer: "ID: 1\nID: 2\nID: 3"
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Afișează query-ul SQL pregătit pentru a căuta user cu id=5: \"SELECT * FROM users WHERE id=5\".",
        starterCode: "public class Main {\n  public static void main(String[] args) {\n    int id = 5;\n    String query = \"SELECT * FROM users WHERE id=\" + id;\n    System.out.println(query);\n  }\n}",
        language: "java", expectedOutput: "SELECT * FROM users WHERE id=5",
        options: [], answer: "SELECT * FROM users WHERE id=5"
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Construiește și afișează un URL de conexiune JDBC: \"jdbc:mysql://localhost:3306/mydb\".",
        starterCode: "public class Main {\n  public static void main(String[] args) {\n    String url = \"jdbc:mysql://localhost:3306/mydb\";\n    System.out.println(url);\n  }\n}",
        language: "java", expectedOutput: "jdbc:mysql://localhost:3306/mydb",
        options: [], answer: "jdbc:mysql://localhost:3306/mydb"
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Simulează inserarea a 3 rânduri și afișează \"Inserat: 3 randuri\".",
        starterCode: "public class Main {\n  public static void main(String[] args) {\n    int randuri = 3;\n    System.out.println(\"Inserat: \" + randuri + \" randuri\");\n  }\n}",
        language: "java", expectedOutput: "Inserat: 3 randuri",
        options: [], answer: "Inserat: 3 randuri"
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Afișează cele 3 tipuri principale de obiecte JDBC pe linii separate: \"Connection\", \"PreparedStatement\", \"ResultSet\".",
        starterCode: "public class Main {\n  public static void main(String[] args) {\n    System.out.println(\"Connection\");\n    System.out.println(\"PreparedStatement\");\n    System.out.println(\"ResultSet\");\n  }\n}",
        language: "java", expectedOutput: "Connection\nPreparedStatement\nResultSet",
        options: [], answer: "Connection\nPreparedStatement\nResultSet"
      }
    ]
  },
  // ─── 21. Unit Testing with JUnit 5 ──────────────────────────────────────
  {
    lessonId: "6a021bf6f0ec7fc9c03a6c63",
    name: "21. Unit Testing with JUnit 5",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează: Adnotarea care marchează o metodă ca test JUnit.\n```java\n___\npublic void testAdunare() {\n  assertEquals(4, 2 + 2);\n}\n```",
        options: [], answer: "@Test",
        starterCode: "", language: "java", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează: Metoda de aserție care verifică egalitatea.\n```java\n___(5, calculator.aduna(2, 3));\n```",
        options: [], answer: "assertEquals",
        starterCode: "", language: "java", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează: Adnotarea care rulează înainte de fiecare test.\n```java\n___\npublic void setUp() {\n  calculator = new Calculator();\n}\n```",
        options: [], answer: "@BeforeEach",
        starterCode: "", language: "java", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează: Metoda care verifică că o condiție este adevărată.\n```java\n___(lista.size() > 0);\n```",
        options: [], answer: "assertTrue",
        starterCode: "", language: "java", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează: Metoda care verifică că un obiect nu este null.\n```java\n___(rezultat);\n```",
        options: [], answer: "assertNotNull",
        starterCode: "", language: "java", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Simulează un test JUnit: verifică că adunarea 2+3 produce 5 și afișează \"Test trecut\" dacă e corect.",
        starterCode: "public class Main {\n  static int aduna(int a, int b) { return a + b; }\n  public static void main(String[] args) {\n    int rezultat = aduna(2, 3);\n    if (rezultat == 5) System.out.println(\"Test trecut\");\n    else System.out.println(\"Test esuat\");\n  }\n}",
        language: "java", expectedOutput: "Test trecut",
        options: [], answer: "Test trecut"
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Simulează asertarea că o lista de 3 elemente are size > 0. Afișează \"assertTrue: OK\".",
        starterCode: "import java.util.*;\npublic class Main {\n  public static void main(String[] args) {\n    List<Integer> lista = Arrays.asList(1, 2, 3);\n    if (lista.size() > 0) System.out.println(\"assertTrue: OK\");\n  }\n}",
        language: "java", expectedOutput: "assertTrue: OK",
        options: [], answer: "assertTrue: OK"
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Testează că înmulțirea 6*7 produce 42. Afișează \"PASS\" sau \"FAIL\".",
        starterCode: "public class Main {\n  static int inmulteste(int a, int b) { return a * b; }\n  public static void main(String[] args) {\n    System.out.println(inmulteste(6, 7) == 42 ? \"PASS\" : \"FAIL\");\n  }\n}",
        language: "java", expectedOutput: "PASS",
        options: [], answer: "PASS"
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Verifică că String-ul \"hello\".toUpperCase() este \"HELLO\". Afișează \"assertEquals: OK\".",
        starterCode: "public class Main {\n  public static void main(String[] args) {\n    String rezultat = \"hello\".toUpperCase();\n    if (rezultat.equals(\"HELLO\")) System.out.println(\"assertEquals: OK\");\n  }\n}",
        language: "java", expectedOutput: "assertEquals: OK",
        options: [], answer: "assertEquals: OK"
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Afișează adnotările JUnit 5 principale: \"@Test\", \"@BeforeEach\", \"@AfterEach\" pe linii separate.",
        starterCode: "public class Main {\n  public static void main(String[] args) {\n    System.out.println(\"@Test\");\n    System.out.println(\"@BeforeEach\");\n    System.out.println(\"@AfterEach\");\n  }\n}",
        language: "java", expectedOutput: "@Test\n@BeforeEach\n@AfterEach",
        options: [], answer: "@Test\n@BeforeEach\n@AfterEach"
      }
    ]
  },
  // ─── 22. Java Performance and Best Practices ────────────────────────────
  {
    lessonId: "6a021bf7f0ec7fc9c03a6c69",
    name: "22. Java Performance and Best Practices",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează: Pentru concatenări repetate în buclă se preferă ___ în loc de String +.\n```java\n___ sb = new StringBuilder();\nfor (int i = 0; i < 5; i++) sb.append(i);\n```",
        options: [], answer: "StringBuilder",
        starterCode: "", language: "java", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează: Lazy initialization — creează obiectul doar la prima utilizare.\n```java\nif (cache == ___) {\n  cache = new Cache();\n}\n```",
        options: [], answer: "null",
        starterCode: "", language: "java", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează: Folosește enhanced for în loc de index pentru iterare.\n```java\nfor (___ element : colectie) {\n  System.out.println(element);\n}\n```",
        options: [], answer: "String",
        starterCode: "", language: "java", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează: Evită crearea de obiecte noi folosind String pool.\n```java\nString s1 = ___;\nString s2 = \"hello\";\nSystem.out.println(s1 == s2); // true\n```",
        options: [], answer: "\"hello\"",
        starterCode: "", language: "java", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează: Streams pot fi procesate în paralel cu ___.\n```java\nlista.___().filter(x -> x > 10).forEach(System.out::println);\n```",
        options: [], answer: "parallelStream",
        starterCode: "", language: "java", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Construiește un String cu StringBuilder adăugând numerele 0-4 concatenate și afișează rezultatul.",
        starterCode: "public class Main {\n  public static void main(String[] args) {\n    StringBuilder sb = new StringBuilder();\n    for (int i = 0; i < 5; i++) sb.append(i);\n    System.out.println(sb.toString());\n  }\n}",
        language: "java", expectedOutput: "01234",
        options: [], answer: "01234"
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Demonstrează String pool: două variabile cu valoarea \"Java\" comparate cu == afișează true.",
        starterCode: "public class Main {\n  public static void main(String[] args) {\n    String s1 = \"Java\";\n    String s2 = \"Java\";\n    System.out.println(s1 == s2);\n  }\n}",
        language: "java", expectedOutput: "true",
        options: [], answer: "true"
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Calculează suma pătratelor numerelor 1-5 eficient și afișează rezultatul.",
        starterCode: "public class Main {\n  public static void main(String[] args) {\n    int suma = 0;\n    for (int i = 1; i <= 5; i++) suma += i * i;\n    System.out.println(suma);\n  }\n}",
        language: "java", expectedOutput: "55",
        options: [], answer: "55"
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Afișează cele 3 recomandări de performanță Java: \"Foloseste StringBuilder\", \"Evita obiecte inutile\", \"Prefer primitivi\".",
        starterCode: "public class Main {\n  public static void main(String[] args) {\n    System.out.println(\"Foloseste StringBuilder\");\n    System.out.println(\"Evita obiecte inutile\");\n    System.out.println(\"Prefer primitivi\");\n  }\n}",
        language: "java", expectedOutput: "Foloseste StringBuilder\nEvita obiecte inutile\nPrefer primitivi",
        options: [], answer: "Foloseste StringBuilder\nEvita obiecte inutile\nPrefer primitivi"
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Compară viteza conceptuală: afișează \"String concat: lent\" și \"StringBuilder: rapid\".",
        starterCode: "public class Main {\n  public static void main(String[] args) {\n    System.out.println(\"String concat: lent\");\n    System.out.println(\"StringBuilder: rapid\");\n  }\n}",
        language: "java", expectedOutput: "String concat: lent\nStringBuilder: rapid",
        options: [], answer: "String concat: lent\nStringBuilder: rapid"
      }
    ]
  },
  // ─── 23. Java Project: Library Management System ────────────────────────
  {
    lessonId: "6a021bf8f0ec7fc9c03a6c70",
    name: "23. Java Project: Library Management System",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează: Stochează cărțile într-o colecție tipizată.\n```java\nList<___> carti = new ArrayList<>();\n```",
        options: [], answer: "Carte",
        starterCode: "", language: "java", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează: HashMap care asociază titlul cărții cu autorul.\n```java\nMap<String, ___> index = new HashMap<>();\nindex.put(\"Eminescu\", \"Mihai Eminescu\");\n```",
        options: [], answer: "String",
        starterCode: "", language: "java", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează: Iterează prin HashMap cu entrySet.\n```java\nfor (Map.___ entry : map.entrySet()) {\n  System.out.println(entry.getKey() + \": \" + entry.getValue());\n}\n```",
        options: [], answer: "Entry<String, String>",
        starterCode: "", language: "java", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează: Sterge un element din List cu metoda corectă.\n```java\ncarti.___(\"Java Programming\");\n```",
        options: [], answer: "remove",
        starterCode: "", language: "java", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează: Caută o carte în HashMap.\n```java\nboolean gasit = map.___(\"Java\");\n```",
        options: [], answer: "containsKey",
        starterCode: "", language: "java", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Creează o listă de cărți cu 3 titluri și afișează primul titlu din colecție.",
        starterCode: "import java.util.*;\npublic class Main {\n  public static void main(String[] args) {\n    List<String> carti = new ArrayList<>();\n    carti.add(\"Clean Code\");\n    carti.add(\"Design Patterns\");\n    carti.add(\"Effective Java\");\n    System.out.println(carti.get(0));\n  }\n}",
        language: "java", expectedOutput: "Clean Code",
        options: [], answer: "Clean Code"
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Adaugă 3 cărți, elimină una și afișează dimensiunea listei finale.",
        starterCode: "import java.util.*;\npublic class Main {\n  public static void main(String[] args) {\n    List<String> carti = new ArrayList<>();\n    carti.add(\"Cartea1\");\n    carti.add(\"Cartea2\");\n    carti.add(\"Cartea3\");\n    carti.remove(\"Cartea2\");\n    System.out.println(carti.size());\n  }\n}",
        language: "java", expectedOutput: "2",
        options: [], answer: "2"
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Creează un HashMap<String,String> cu 2 cărți (titlu->autor) și afișează autorul pentru titlul \"Clean Code\".",
        starterCode: "import java.util.*;\npublic class Main {\n  public static void main(String[] args) {\n    Map<String, String> lib = new HashMap<>();\n    lib.put(\"Clean Code\", \"Robert Martin\");\n    lib.put(\"Effective Java\", \"Joshua Bloch\");\n    System.out.println(lib.get(\"Clean Code\"));\n  }\n}",
        language: "java", expectedOutput: "Robert Martin",
        options: [], answer: "Robert Martin"
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Verifică dacă HashMap-ul de cărți conține titlul \"Effective Java\" și afișează rezultatul.",
        starterCode: "import java.util.*;\npublic class Main {\n  public static void main(String[] args) {\n    Map<String, String> lib = new HashMap<>();\n    lib.put(\"Clean Code\", \"Robert Martin\");\n    lib.put(\"Effective Java\", \"Joshua Bloch\");\n    System.out.println(lib.containsKey(\"Effective Java\"));\n  }\n}",
        language: "java", expectedOutput: "true",
        options: [], answer: "true"
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Afișează toate titlurile din HashMap iterând cu entrySet în format \"Titlu: autor\".",
        starterCode: "import java.util.*;\npublic class Main {\n  public static void main(String[] args) {\n    Map<String, String> lib = new LinkedHashMap<>();\n    lib.put(\"Clean Code\", \"Robert Martin\");\n    lib.put(\"Effective Java\", \"Joshua Bloch\");\n    for (Map.Entry<String, String> e : lib.entrySet())\n      System.out.println(e.getKey() + \": \" + e.getValue());\n  }\n}",
        language: "java", expectedOutput: "Clean Code: Robert Martin\nEffective Java: Joshua Bloch",
        options: [], answer: "Clean Code: Robert Martin\nEffective Java: Joshua Bloch"
      }
    ]
  },
  // ─── 24. Virtual Threads and Modern Java (Java 21) ───────────────────────
  {
    lessonId: "6a021bfaf0ec7fc9c03a6c79",
    name: "24. Virtual Threads and Modern Java (Java 21)",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează: Creează un virtual thread cu metoda de fabrică.\n```java\nThread vt = Thread.ofVirtual().___(taskRunnable);\n```",
        options: [], answer: "unstarted",
        starterCode: "", language: "java", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează: Verifică dacă un thread este virtual.\n```java\nSystem.out.println(thread.___());\n```",
        options: [], answer: "isVirtual",
        starterCode: "", language: "java", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează: ExecutorService cu virtual threads.\n```java\ntry (var exec = Executors.___()) {\n  exec.submit(() -> System.out.println(\"task\"));\n}\n```",
        options: [], answer: "newVirtualThreadPerTaskExecutor",
        starterCode: "", language: "java", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează: Record în Java 16+ definit cu keyword-ul ___.\n```java\n___ Punct(int x, int y) {}\n```",
        options: [], answer: "record",
        starterCode: "", language: "java", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează: Sealed class restricționează ce clase pot s-o extindă.\n```java\npublic ___ class Forma permits Cerc, Dreptunghi {}\n```",
        options: [], answer: "sealed",
        starterCode: "", language: "java", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Pornește un virtual thread cu lambda care afișează \"Virtual Thread\" și join-uieste-l.",
        starterCode: "public class Main {\n  public static void main(String[] args) throws InterruptedException {\n    Thread vt = Thread.ofVirtual().start(() -> System.out.println(\"Virtual Thread\"));\n    vt.join();\n  }\n}",
        language: "java", expectedOutput: "Virtual Thread",
        options: [], answer: "Virtual Thread"
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Creează un record Punct(int x, int y) și afișează un obiect Punct(3, 4) în format \"Punct[x=3, y=4]\".",
        starterCode: "public class Main {\n  record Punct(int x, int y) {}\n  public static void main(String[] args) {\n    Punct p = new Punct(3, 4);\n    System.out.println(p);\n  }\n}",
        language: "java", expectedOutput: "Punct[x=3, y=4]",
        options: [], answer: "Punct[x=3, y=4]"
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Verifică dacă un virtual thread este virtual și afișează rezultatul boolean.",
        starterCode: "public class Main {\n  public static void main(String[] args) throws InterruptedException {\n    Thread vt = Thread.ofVirtual().unstarted(() -> {});\n    System.out.println(vt.isVirtual());\n  }\n}",
        language: "java", expectedOutput: "true",
        options: [], answer: "true"
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Folosește switch expression cu pattern matching pentru a afișa tipul obiectului: Integer 42 -> \"intreg\".",
        starterCode: "public class Main {\n  public static void main(String[] args) {\n    Object obj = 42;\n    String tip = switch (obj) {\n      case Integer i -> \"intreg\";\n      case String s -> \"sir\";\n      default -> \"altul\";\n    };\n    System.out.println(tip);\n  }\n}",
        language: "java", expectedOutput: "intreg",
        options: [], answer: "intreg"
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Afișează versiunile Java care au adăugat: Records (16), Sealed Classes (17), Virtual Threads (21).",
        starterCode: "public class Main {\n  public static void main(String[] args) {\n    System.out.println(\"Records: Java 16\");\n    System.out.println(\"Sealed Classes: Java 17\");\n    System.out.println(\"Virtual Threads: Java 21\");\n  }\n}",
        language: "java", expectedOutput: "Records: Java 16\nSealed Classes: Java 17\nVirtual Threads: Java 21",
        options: [], answer: "Records: Java 16\nSealed Classes: Java 17\nVirtual Threads: Java 21"
      }
    ]
  },
  // ─── 25. Java Advanced Project: REST API with Spring Boot ───────────────
  {
    lessonId: "6a021bfbf0ec7fc9c03a6c80",
    name: "25. Java Advanced Project: REST API with Spring Boot",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează: Adnotarea care marchează o clasă Spring Boot ca REST controller.\n```java\n___\npublic class UserController { ... }\n```",
        options: [], answer: "@RestController",
        starterCode: "", language: "java", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează: Adnotarea pentru endpoint GET.\n```java\n___(\"/ users\")\npublic List<User> getAll() { return service.findAll(); }\n```",
        options: [], answer: "@GetMapping",
        starterCode: "", language: "java", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează: Returnează un răspuns HTTP cu status.\n```java\nreturn ___.ok(user);\n```",
        options: [], answer: "ResponseEntity",
        starterCode: "", language: "java", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează: Adnotarea pentru parametrul din URL.\n```java\n@GetMapping(\"/{id}\")\npublic User getById(___ Long id) { ... }\n```",
        options: [], answer: "@PathVariable",
        starterCode: "", language: "java", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează: Adnotarea clasei principale Spring Boot.\n```java\n___\npublic class Application {\n  public static void main(String[] args) {\n    SpringApplication.run(Application.class, args);\n  }\n}\n```",
        options: [], answer: "@SpringBootApplication",
        starterCode: "", language: "java", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Afișează adnotările Spring Boot pentru un controller complet: \"@SpringBootApplication\", \"@RestController\", \"@GetMapping\".",
        starterCode: "public class Main {\n  public static void main(String[] args) {\n    System.out.println(\"@SpringBootApplication\");\n    System.out.println(\"@RestController\");\n    System.out.println(\"@GetMapping\");\n  }\n}",
        language: "java", expectedOutput: "@SpringBootApplication\n@RestController\n@GetMapping",
        options: [], answer: "@SpringBootApplication\n@RestController\n@GetMapping"
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Construiește și afișează URL-ul unui endpoint REST: \"/api/users/42\".",
        starterCode: "public class Main {\n  public static void main(String[] args) {\n    long id = 42;\n    String url = \"/api/users/\" + id;\n    System.out.println(url);\n  }\n}",
        language: "java", expectedOutput: "/api/users/42",
        options: [], answer: "/api/users/42"
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Afișează codurile HTTP folosite în REST: 200, 201, 404, 500 câte unul pe linie.",
        starterCode: "public class Main {\n  public static void main(String[] args) {\n    System.out.println(200);\n    System.out.println(201);\n    System.out.println(404);\n    System.out.println(500);\n  }\n}",
        language: "java", expectedOutput: "200\n201\n404\n500",
        options: [], answer: "200\n201\n404\n500"
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Simulează un JSON response: afișează \"{\\\"id\\\": 1, \\\"name\\\": \\\"Ion\\\"}\".",
        starterCode: "public class Main {\n  public static void main(String[] args) {\n    System.out.println(\"{\\\"id\\\": 1, \\\"name\\\": \\\"Ion\\\"}\");\n  }\n}",
        language: "java", expectedOutput: "{\"id\": 1, \"name\": \"Ion\"}",
        options: [], answer: "{\"id\": 1, \"name\": \"Ion\"}"
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Afișează metodele HTTP suportate de REST API: \"GET\", \"POST\", \"PUT\", \"DELETE\".",
        starterCode: "public class Main {\n  public static void main(String[] args) {\n    System.out.println(\"GET\");\n    System.out.println(\"POST\");\n    System.out.println(\"PUT\");\n    System.out.println(\"DELETE\");\n  }\n}",
        language: "java", expectedOutput: "GET\nPOST\nPUT\nDELETE",
        options: [], answer: "GET\nPOST\nPUT\nDELETE"
      }
    ]
  },
  // ─── 26. Java Streams API Avansat ────────────────────────────────────────
  {
    lessonId: "6a08cfcc999573855635ce6c",
    name: "26. Java Streams API Avansat",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează: flatMap aplatizează o listă de liste.\n```java\nList<Integer> flat = listeDeListe.stream()\n  .___(Collection::stream)\n  .collect(Collectors.toList());\n```",
        options: [], answer: "flatMap",
        starterCode: "", language: "java", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează: Grupează elementele după un criteriu.\n```java\nMap<String, List<Angajat>> grupati = angajati.stream()\n  .collect(Collectors.___(Angajat::getDepartament));\n```",
        options: [], answer: "groupingBy",
        starterCode: "", language: "java", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează: Reduce elementele la un singur rezultat.\n```java\nint suma = lista.stream().___(0, Integer::sum);\n```",
        options: [], answer: "reduce",
        starterCode: "", language: "java", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează: Sortează un stream în ordine naturală.\n```java\nList<Integer> sortat = lista.stream()\n  .___().collect(Collectors.toList());\n```",
        options: [], answer: "sorted",
        starterCode: "", language: "java", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează: Limitează stream-ul la primele N elemente.\n```java\nList<Integer> primele3 = lista.stream()\n  .___(3).collect(Collectors.toList());\n```",
        options: [], answer: "limit",
        starterCode: "", language: "java", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Aplică flatMap pe o listă de liste {{1,2},{3,4},{5}} și afișează suma tuturor elementelor.",
        starterCode: "import java.util.*;\nimport java.util.stream.*;\npublic class Main {\n  public static void main(String[] args) {\n    List<List<Integer>> lista = Arrays.asList(\n      Arrays.asList(1,2), Arrays.asList(3,4), Arrays.asList(5));\n    int suma = lista.stream()\n      .flatMap(Collection::stream)\n      .reduce(0, Integer::sum);\n    System.out.println(suma);\n  }\n}",
        language: "java", expectedOutput: "15",
        options: [], answer: "15"
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Sortează lista {5,2,8,1,9} și afișează primul element (cel mai mic).",
        starterCode: "import java.util.*;\nimport java.util.stream.*;\npublic class Main {\n  public static void main(String[] args) {\n    List<Integer> lista = Arrays.asList(5,2,8,1,9);\n    int min = lista.stream().sorted().findFirst().get();\n    System.out.println(min);\n  }\n}",
        language: "java", expectedOutput: "1",
        options: [], answer: "1"
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Ia primele 3 elemente din lista {10,20,30,40,50} și afișează-le pe linii separate.",
        starterCode: "import java.util.*;\nimport java.util.stream.*;\npublic class Main {\n  public static void main(String[] args) {\n    List<Integer> lista = Arrays.asList(10,20,30,40,50);\n    lista.stream().limit(3).forEach(System.out::println);\n  }\n}",
        language: "java", expectedOutput: "10\n20\n30",
        options: [], answer: "10\n20\n30"
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Sari primele 2 elemente din lista {1,2,3,4,5} cu skip și afișează restul.",
        starterCode: "import java.util.*;\nimport java.util.stream.*;\npublic class Main {\n  public static void main(String[] args) {\n    List<Integer> lista = Arrays.asList(1,2,3,4,5);\n    lista.stream().skip(2).forEach(System.out::println);\n  }\n}",
        language: "java", expectedOutput: "3\n4\n5",
        options: [], answer: "3\n4\n5"
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Colectează String-urile {\"a\",\"b\",\"c\"} într-un singur String separat prin virgulă.",
        starterCode: "import java.util.*;\nimport java.util.stream.*;\npublic class Main {\n  public static void main(String[] args) {\n    List<String> lista = Arrays.asList(\"a\",\"b\",\"c\");\n    String rezultat = lista.stream().collect(Collectors.joining(\",\"));\n    System.out.println(rezultat);\n  }\n}",
        language: "java", expectedOutput: "a,b,c",
        options: [], answer: "a,b,c"
      }
    ]
  },
  // ─── 27. Spring Boot — REST API ──────────────────────────────────────────
  {
    lessonId: "6a08cfcf999573855635ce80",
    name: "27. Spring Boot — REST API",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează: Adnotarea pentru un endpoint POST.\n```java\n___(\"/users\")\npublic User creeaza(@RequestBody User u) { return service.save(u); }\n```",
        options: [], answer: "@PostMapping",
        starterCode: "", language: "java", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează: Injectează corpul cererii HTTP în metodă.\n```java\npublic User creeaza(___ User u) { return service.save(u); }\n```",
        options: [], answer: "@RequestBody",
        starterCode: "", language: "java", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează: Adnotarea pentru endpoint DELETE.\n```java\n___(\"/{id}\")\npublic void sterge(@PathVariable Long id) { service.delete(id); }\n```",
        options: [], answer: "@DeleteMapping",
        starterCode: "", language: "java", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează: Prefix de rută aplicat întregului controller.\n```java\n___(\"/ api/users\")\n@RestController\npublic class UserController { ... }\n```",
        options: [], answer: "@RequestMapping",
        starterCode: "", language: "java", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează: Returnează status 201 Created.\n```java\nreturn ResponseEntity.___(user);\n```",
        options: [], answer: "created",
        starterCode: "", language: "java", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Afișează adnotările HTTP Spring Boot pentru CRUD: \"@GetMapping\", \"@PostMapping\", \"@PutMapping\", \"@DeleteMapping\".",
        starterCode: "public class Main {\n  public static void main(String[] args) {\n    System.out.println(\"@GetMapping\");\n    System.out.println(\"@PostMapping\");\n    System.out.println(\"@PutMapping\");\n    System.out.println(\"@DeleteMapping\");\n  }\n}",
        language: "java", expectedOutput: "@GetMapping\n@PostMapping\n@PutMapping\n@DeleteMapping",
        options: [], answer: "@GetMapping\n@PostMapping\n@PutMapping\n@DeleteMapping"
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Construiește URL-ul REST pentru actualizarea resursei user cu id=7: \"/api/users/7\".",
        starterCode: "public class Main {\n  public static void main(String[] args) {\n    int id = 7;\n    System.out.println(\"/api/users/\" + id);\n  }\n}",
        language: "java", expectedOutput: "/api/users/7",
        options: [], answer: "/api/users/7"
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Afișează structura layered a Spring Boot: \"Controller\", \"Service\", \"Repository\" pe linii separate.",
        starterCode: "public class Main {\n  public static void main(String[] args) {\n    System.out.println(\"Controller\");\n    System.out.println(\"Service\");\n    System.out.println(\"Repository\");\n  }\n}",
        language: "java", expectedOutput: "Controller\nService\nRepository",
        options: [], answer: "Controller\nService\nRepository"
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Afișează statusul HTTP 404 cu mesaj: \"404 Not Found\".",
        starterCode: "public class Main {\n  public static void main(String[] args) {\n    System.out.println(\"404 Not Found\");\n  }\n}",
        language: "java", expectedOutput: "404 Not Found",
        options: [], answer: "404 Not Found"
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Afișează dependențele principale Spring Boot: \"spring-boot-starter-web\", \"spring-boot-starter-data-jpa\".",
        starterCode: "public class Main {\n  public static void main(String[] args) {\n    System.out.println(\"spring-boot-starter-web\");\n    System.out.println(\"spring-boot-starter-data-jpa\");\n  }\n}",
        language: "java", expectedOutput: "spring-boot-starter-web\nspring-boot-starter-data-jpa",
        options: [], answer: "spring-boot-starter-web\nspring-boot-starter-data-jpa"
      }
    ]
  },
  // ─── 28. JPA si Hibernate ────────────────────────────────────────────────
  {
    lessonId: "6a08cfd2999573855635ce94",
    name: "28. JPA si Hibernate",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează: Adnotarea care marchează o clasă ca entitate JPA.\n```java\n___\npublic class Produs { ... }\n```",
        options: [], answer: "@Entity",
        starterCode: "", language: "java", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează: Adnotarea pentru repository Spring Data JPA.\n```java\n___\npublic interface ProdusRepository extends JpaRepository<Produs, Long> {}\n```",
        options: [], answer: "@Repository",
        starterCode: "", language: "java", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează: Adnotarea care mapează câmpul la coloana din DB.\n```java\n___( name = \"nume_produs\" )\nprivate String numeProdus;\n```",
        options: [], answer: "@Column",
        starterCode: "", language: "java", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează: Adnotarea pentru cheia primară.\n```java\n___\n@GeneratedValue(strategy = GenerationType.IDENTITY)\nprivate Long id;\n```",
        options: [], answer: "@Id",
        starterCode: "", language: "java", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează: Metoda JpaRepository pentru obținerea tuturor entităților.\n```java\nList<Produs> toate = repository.___();\n```",
        options: [], answer: "findAll",
        starterCode: "", language: "java", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Afișează adnotările JPA de bază: \"@Entity\", \"@Id\", \"@Column\", \"@Repository\".",
        starterCode: "public class Main {\n  public static void main(String[] args) {\n    System.out.println(\"@Entity\");\n    System.out.println(\"@Id\");\n    System.out.println(\"@Column\");\n    System.out.println(\"@Repository\");\n  }\n}",
        language: "java", expectedOutput: "@Entity\n@Id\n@Column\n@Repository",
        options: [], answer: "@Entity\n@Id\n@Column\n@Repository"
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Afișează operațiile CRUD ale JpaRepository: \"save\", \"findById\", \"findAll\", \"delete\".",
        starterCode: "public class Main {\n  public static void main(String[] args) {\n    System.out.println(\"save\");\n    System.out.println(\"findById\");\n    System.out.println(\"findAll\");\n    System.out.println(\"delete\");\n  }\n}",
        language: "java", expectedOutput: "save\nfindById\nfindAll\ndelete",
        options: [], answer: "save\nfindById\nfindAll\ndelete"
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Afișează relațiile JPA: \"@OneToMany\", \"@ManyToOne\", \"@ManyToMany\".",
        starterCode: "public class Main {\n  public static void main(String[] args) {\n    System.out.println(\"@OneToMany\");\n    System.out.println(\"@ManyToOne\");\n    System.out.println(\"@ManyToMany\");\n  }\n}",
        language: "java", expectedOutput: "@OneToMany\n@ManyToOne\n@ManyToMany",
        options: [], answer: "@OneToMany\n@ManyToOne\n@ManyToMany"
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Afișează cei 2 provideri JPA: \"Hibernate\" și \"EclipseLink\".",
        starterCode: "public class Main {\n  public static void main(String[] args) {\n    System.out.println(\"Hibernate\");\n    System.out.println(\"EclipseLink\");\n  }\n}",
        language: "java", expectedOutput: "Hibernate\nEclipseLink",
        options: [], answer: "Hibernate\nEclipseLink"
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Afișează tipurile de GenerationType: \"AUTO\", \"IDENTITY\", \"SEQUENCE\", \"TABLE\".",
        starterCode: "public class Main {\n  public static void main(String[] args) {\n    System.out.println(\"AUTO\");\n    System.out.println(\"IDENTITY\");\n    System.out.println(\"SEQUENCE\");\n    System.out.println(\"TABLE\");\n  }\n}",
        language: "java", expectedOutput: "AUTO\nIDENTITY\nSEQUENCE\nTABLE",
        options: [], answer: "AUTO\nIDENTITY\nSEQUENCE\nTABLE"
      }
    ]
  },
  // ─── 29. Design Patterns in Java Modern ─────────────────────────────────
  {
    lessonId: "6a08cfd4999573855635cea8",
    name: "29. Design Patterns in Java Modern",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează: Builder pattern — metoda finală de construcție.\n```java\nPerson p = new Person.Builder()\n  .setNume(\"Ion\")\n  .setVarsta(30)\n  .___();\n```",
        options: [], answer: "build",
        starterCode: "", language: "java", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează: Strategy pattern — definit printr-o ___.\n```java\npublic ___ SortStrategy {\n  void sort(int[] arr);\n}\n```",
        options: [], answer: "interface",
        starterCode: "", language: "java", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează: Decorator pattern wrappează un obiect existent.\n```java\npublic class LoggingService implements Service {\n  private final ___ wrapped;\n  public LoggingService(Service s) { this.wrapped = s; }\n}\n```",
        options: [], answer: "Service",
        starterCode: "", language: "java", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează: Observer pattern — metoda de notificare a observatorilor.\n```java\npublic void ___(String eveniment) {\n  observers.forEach(o -> o.update(eveniment));\n}\n```",
        options: [], answer: "notify",
        starterCode: "", language: "java", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează: Command pattern encapsulează o acțiune în obiect.\n```java\npublic ___ Command {\n  void execute();\n}\n```",
        options: [], answer: "interface",
        starterCode: "", language: "java", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Afișează cele 3 categorii de design patterns: \"Creational\", \"Structural\", \"Behavioral\".",
        starterCode: "public class Main {\n  public static void main(String[] args) {\n    System.out.println(\"Creational\");\n    System.out.println(\"Structural\");\n    System.out.println(\"Behavioral\");\n  }\n}",
        language: "java", expectedOutput: "Creational\nStructural\nBehavioral",
        options: [], answer: "Creational\nStructural\nBehavioral"
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Afișează exemple din fiecare categorie: \"Singleton\", \"Adapter\", \"Observer\".",
        starterCode: "public class Main {\n  public static void main(String[] args) {\n    System.out.println(\"Singleton\");\n    System.out.println(\"Adapter\");\n    System.out.println(\"Observer\");\n  }\n}",
        language: "java", expectedOutput: "Singleton\nAdapter\nObserver",
        options: [], answer: "Singleton\nAdapter\nObserver"
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Demonstrează Builder: construiește un String din 3 parți cu StringBuilder și afișează \"Java Design Patterns\".",
        starterCode: "public class Main {\n  public static void main(String[] args) {\n    String r = new StringBuilder()\n      .append(\"Java\")\n      .append(\" Design\")\n      .append(\" Patterns\")\n      .toString();\n    System.out.println(r);\n  }\n}",
        language: "java", expectedOutput: "Java Design Patterns",
        options: [], answer: "Java Design Patterns"
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Demonstrează Strategy: alege algoritmul de plată \"Card\" sau \"Cash\" și afișează \"Platit cu: Card\".",
        starterCode: "public class Main {\n  public static void main(String[] args) {\n    String strategie = \"Card\";\n    System.out.println(\"Platit cu: \" + strategie);\n  }\n}",
        language: "java", expectedOutput: "Platit cu: Card",
        options: [], answer: "Platit cu: Card"
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Afișează principiile SOLID: \"S\", \"O\", \"L\", \"I\", \"D\" pe linii separate.",
        starterCode: "public class Main {\n  public static void main(String[] args) {\n    for (char c : \"SOLID\".toCharArray()) System.out.println(c);\n  }\n}",
        language: "java", expectedOutput: "S\nO\nL\nI\nD",
        options: [], answer: "S\nO\nL\nI\nD"
      }
    ]
  },
  // ─── 30. Mini Proiect Java — Spring Boot CRUD ────────────────────────────
  {
    lessonId: "6a08cfd7999573855635cebc",
    name: "30. Mini Proiect Java — Spring Boot CRUD",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează: Layerul care gestionează logica de business.\n```java\n@Service\npublic class ___ { ... }\n```",
        options: [], answer: "ProdusService",
        starterCode: "", language: "java", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează: Adnotarea care injectează automat dependențele.\n```java\n___\nprivate ProdusService service;\n```",
        options: [], answer: "@Autowired",
        starterCode: "", language: "java", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează: Metoda repository pentru salvarea/actualizarea entității.\n```java\nProdus salvat = repository.___( produs );\n```",
        options: [], answer: "save",
        starterCode: "", language: "java", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează: Returnează 404 dacă resursa nu există.\n```java\nreturn repository.findById(id)\n  .map(ResponseEntity::ok)\n  .orElse(ResponseEntity.___.build());\n```",
        options: [], answer: "notFound",
        starterCode: "", language: "java", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează: Adnotarea Service în Spring.\n```java\n___\npublic class UserService { ... }\n```",
        options: [], answer: "@Service",
        starterCode: "", language: "java", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Afișează arhitectura layered Spring Boot CRUD: \"Controller -> Service -> Repository -> DB\".",
        starterCode: "public class Main {\n  public static void main(String[] args) {\n    System.out.println(\"Controller -> Service -> Repository -> DB\");\n  }\n}",
        language: "java", expectedOutput: "Controller -> Service -> Repository -> DB",
        options: [], answer: "Controller -> Service -> Repository -> DB"
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Afișează operațiile CRUD și verbele HTTP corespondente: \"CREATE=POST\", \"READ=GET\", \"UPDATE=PUT\", \"DELETE=DELETE\".",
        starterCode: "public class Main {\n  public static void main(String[] args) {\n    System.out.println(\"CREATE=POST\");\n    System.out.println(\"READ=GET\");\n    System.out.println(\"UPDATE=PUT\");\n    System.out.println(\"DELETE=DELETE\");\n  }\n}",
        language: "java", expectedOutput: "CREATE=POST\nREAD=GET\nUPDATE=PUT\nDELETE=DELETE",
        options: [], answer: "CREATE=POST\nREAD=GET\nUPDATE=PUT\nDELETE=DELETE"
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Afișează adnotările Spring pentru fiecare layer: \"@RestController\", \"@Service\", \"@Repository\".",
        starterCode: "public class Main {\n  public static void main(String[] args) {\n    System.out.println(\"@RestController\");\n    System.out.println(\"@Service\");\n    System.out.println(\"@Repository\");\n  }\n}",
        language: "java", expectedOutput: "@RestController\n@Service\n@Repository",
        options: [], answer: "@RestController\n@Service\n@Repository"
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Construiește și afișează un endpoint REST complet: \"GET /api/produse\" și \"POST /api/produse\".",
        starterCode: "public class Main {\n  public static void main(String[] args) {\n    System.out.println(\"GET /api/produse\");\n    System.out.println(\"POST /api/produse\");\n  }\n}",
        language: "java", expectedOutput: "GET /api/produse\nPOST /api/produse",
        options: [], answer: "GET /api/produse\nPOST /api/produse"
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Afișează pașii pentru crearea unui Spring Boot project: \"1. initializr\", \"2. entitate\", \"3. repository\", \"4. service\", \"5. controller\".",
        starterCode: "public class Main {\n  public static void main(String[] args) {\n    System.out.println(\"1. initializr\");\n    System.out.println(\"2. entitate\");\n    System.out.println(\"3. repository\");\n    System.out.println(\"4. service\");\n    System.out.println(\"5. controller\");\n  }\n}",
        language: "java", expectedOutput: "1. initializr\n2. entitate\n3. repository\n4. service\n5. controller",
        options: [], answer: "1. initializr\n2. entitate\n3. repository\n4. service\n5. controller"
      }
    ]
  },
  // ─── 31. Spring Security si JWT ──────────────────────────────────────────
  {
    lessonId: "6a09ba8c855b60bc2da6de4f",
    name: "31. Spring Security si JWT",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează: Bean-ul principal de configurare a securității Spring.\n```java\n@Bean\npublic ___ securityFilterChain(HttpSecurity http) throws Exception { ... }\n```",
        options: [], answer: "SecurityFilterChain",
        starterCode: "", language: "java", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează: Algoritmul de hashing recomandat pentru parole.\n```java\n@Bean\npublic PasswordEncoder encoder() { return new ___(); }\n```",
        options: [], answer: "BCryptPasswordEncoder",
        starterCode: "", language: "java", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează: Header-ul HTTP pentru transmiterea JWT.\n```java\nString token = request.getHeader(\"___\");\n```",
        options: [], answer: "Authorization",
        starterCode: "", language: "java", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează: Prefixul standard al token-ului JWT în header.\n```java\nString jwt = authHeader.substring(___); // dupa \"Bearer \"\n```",
        options: [], answer: "7",
        starterCode: "", language: "java", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează: Interfața Spring Security pentru a furniza detaliile utilizatorului.\n```java\npublic class UserDetailsImpl implements ___ { ... }\n```",
        options: [], answer: "UserDetails",
        starterCode: "", language: "java", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Afișează cele 3 parți ale unui JWT: \"Header\", \"Payload\", \"Signature\".",
        starterCode: "public class Main {\n  public static void main(String[] args) {\n    System.out.println(\"Header\");\n    System.out.println(\"Payload\");\n    System.out.println(\"Signature\");\n  }\n}",
        language: "java", expectedOutput: "Header\nPayload\nSignature",
        options: [], answer: "Header\nPayload\nSignature"
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Afișează fluxul de autentificare JWT: \"1. Login\", \"2. Genereaza JWT\", \"3. Client trimite JWT\", \"4. Server valideaza\".",
        starterCode: "public class Main {\n  public static void main(String[] args) {\n    System.out.println(\"1. Login\");\n    System.out.println(\"2. Genereaza JWT\");\n    System.out.println(\"3. Client trimite JWT\");\n    System.out.println(\"4. Server valideaza\");\n  }\n}",
        language: "java", expectedOutput: "1. Login\n2. Genereaza JWT\n3. Client trimite JWT\n4. Server valideaza",
        options: [], answer: "1. Login\n2. Genereaza JWT\n3. Client trimite JWT\n4. Server valideaza"
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Simulează hash BCrypt: afișează că două parole identice produc hash-uri diferite cu mesajul \"BCrypt: hash-uri diferite pentru aceeasi parola: true\".",
        starterCode: "public class Main {\n  public static void main(String[] args) {\n    System.out.println(\"BCrypt: hash-uri diferite pentru aceeasi parola: true\");\n  }\n}",
        language: "java", expectedOutput: "BCrypt: hash-uri diferite pentru aceeasi parola: true",
        options: [], answer: "BCrypt: hash-uri diferite pentru aceeasi parola: true"
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Afișează rolurile Spring Security tipice: \"ROLE_USER\", \"ROLE_ADMIN\", \"ROLE_MODERATOR\".",
        starterCode: "public class Main {\n  public static void main(String[] args) {\n    System.out.println(\"ROLE_USER\");\n    System.out.println(\"ROLE_ADMIN\");\n    System.out.println(\"ROLE_MODERATOR\");\n  }\n}",
        language: "java", expectedOutput: "ROLE_USER\nROLE_ADMIN\nROLE_MODERATOR",
        options: [], answer: "ROLE_USER\nROLE_ADMIN\nROLE_MODERATOR"
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Afișează adnotările Spring Security pentru protecția metodelor: \"@PreAuthorize\", \"@Secured\", \"@RolesAllowed\".",
        starterCode: "public class Main {\n  public static void main(String[] args) {\n    System.out.println(\"@PreAuthorize\");\n    System.out.println(\"@Secured\");\n    System.out.println(\"@RolesAllowed\");\n  }\n}",
        language: "java", expectedOutput: "@PreAuthorize\n@Secured\n@RolesAllowed",
        options: [], answer: "@PreAuthorize\n@Secured\n@RolesAllowed"
      }
    ]
  },
  // ─── 32. Spring WebFlux — Reactive Java ─────────────────────────────────
  {
    lessonId: "6a09ba8f855b60bc2da6de63",
    name: "32. Spring WebFlux — Reactive Java",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează: Mono reprezintă 0 sau 1 element reactiv.\n```java\n___ <String> mono = Mono.just(\"Hello\");\n```",
        options: [], answer: "Mono",
        starterCode: "", language: "java", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează: Flux reprezintă 0 până la N elemente reactive.\n```java\n___ <Integer> flux = Flux.range(1, 5);\n```",
        options: [], answer: "Flux",
        starterCode: "", language: "java", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează: Operatorul care transformă fiecare element.\n```java\nFlux<String> upper = flux.___(String::toUpperCase);\n```",
        options: [], answer: "map",
        starterCode: "", language: "java", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează: Subscrie la un Flux pentru a consuma elementele.\n```java\nflux.___(System.out::println);\n```",
        options: [], answer: "subscribe",
        starterCode: "", language: "java", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează: Filtrează elementele unui Flux.\n```java\nFlux<Integer> pozitive = flux.___(x -> x > 0);\n```",
        options: [], answer: "filter",
        starterCode: "", language: "java", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Afișează tipurile reactive Project Reactor: \"Mono\", \"Flux\" cu descrierile lor scurte.",
        starterCode: "public class Main {\n  public static void main(String[] args) {\n    System.out.println(\"Mono: 0 sau 1 element\");\n    System.out.println(\"Flux: 0 pana la N elemente\");\n  }\n}",
        language: "java", expectedOutput: "Mono: 0 sau 1 element\nFlux: 0 pana la N elemente",
        options: [], answer: "Mono: 0 sau 1 element\nFlux: 0 pana la N elemente"
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Afișează operatorii principali WebFlux: \"map\", \"filter\", \"flatMap\", \"subscribe\".",
        starterCode: "public class Main {\n  public static void main(String[] args) {\n    System.out.println(\"map\");\n    System.out.println(\"filter\");\n    System.out.println(\"flatMap\");\n    System.out.println(\"subscribe\");\n  }\n}",
        language: "java", expectedOutput: "map\nfilter\nflatMap\nsubscribe",
        options: [], answer: "map\nfilter\nflatMap\nsubscribe"
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Afișează diferența dintre programarea imperativă și reactivă: \"Imperativ: blocare\", \"Reactiv: non-blocare\".",
        starterCode: "public class Main {\n  public static void main(String[] args) {\n    System.out.println(\"Imperativ: blocare\");\n    System.out.println(\"Reactiv: non-blocare\");\n  }\n}",
        language: "java", expectedOutput: "Imperativ: blocare\nReactiv: non-blocare",
        options: [], answer: "Imperativ: blocare\nReactiv: non-blocare"
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Afișează numerele 1-5 simulate ca Flux: câte unul pe linie.",
        starterCode: "public class Main {\n  public static void main(String[] args) {\n    for (int i = 1; i <= 5; i++) System.out.println(i);\n  }\n}",
        language: "java", expectedOutput: "1\n2\n3\n4\n5",
        options: [], answer: "1\n2\n3\n4\n5"
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Afișează framework-urile reactive Java: \"Project Reactor\", \"RxJava\", \"Akka Streams\".",
        starterCode: "public class Main {\n  public static void main(String[] args) {\n    System.out.println(\"Project Reactor\");\n    System.out.println(\"RxJava\");\n    System.out.println(\"Akka Streams\");\n  }\n}",
        language: "java", expectedOutput: "Project Reactor\nRxJava\nAkka Streams",
        options: [], answer: "Project Reactor\nRxJava\nAkka Streams"
      }
    ]
  },
  // ─── 33. Apache Kafka cu Spring Boot ────────────────────────────────────
  {
    lessonId: "6a09ba91855b60bc2da6de77",
    name: "33. Apache Kafka cu Spring Boot",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează: Adnotarea pentru a marca o metodă ca listener Kafka.\n```java\n___(topics = \"comenzi\")\npublic void proceseaza(String mesaj) { ... }\n```",
        options: [], answer: "@KafkaListener",
        starterCode: "", language: "java", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează: Template-ul Spring folosit pentru trimiterea mesajelor Kafka.\n```java\n___ <String, String> kafkaTemplate;\nkafkaTemplate.send(\"topic\", \"mesaj\");\n```",
        options: [], answer: "KafkaTemplate",
        starterCode: "", language: "java", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează: Configurația producătorului Kafka.\n```java\n___ <String, String> producerFactory() {\n  return new DefaultKafkaProducerFactory<>(configs);\n}\n```",
        options: [], answer: "ProducerFactory",
        starterCode: "", language: "java", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează: Clasa care reprezintă un mesaj Kafka primit.\n```java\npublic void onMessage(___ <String, String> record) {\n  System.out.println(record.value());\n}\n```",
        options: [], answer: "ConsumerRecord",
        starterCode: "", language: "java", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează: Proprietatea Kafka pentru adresa brokerului.\n```java\nprops.put(___, \"localhost:9092\");\n```",
        options: [], answer: "ProducerConfig.BOOTSTRAP_SERVERS_CONFIG",
        starterCode: "", language: "java", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Afișează conceptele Kafka: \"Producer\", \"Consumer\", \"Topic\", \"Partition\", \"Broker\".",
        starterCode: "public class Main {\n  public static void main(String[] args) {\n    System.out.println(\"Producer\");\n    System.out.println(\"Consumer\");\n    System.out.println(\"Topic\");\n    System.out.println(\"Partition\");\n    System.out.println(\"Broker\");\n  }\n}",
        language: "java", expectedOutput: "Producer\nConsumer\nTopic\nPartition\nBroker",
        options: [], answer: "Producer\nConsumer\nTopic\nPartition\nBroker"
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Simulează trimiterea unui mesaj Kafka și afișează: \"Mesaj trimis pe topic: comenzi\".",
        starterCode: "public class Main {\n  public static void main(String[] args) {\n    String topic = \"comenzi\";\n    System.out.println(\"Mesaj trimis pe topic: \" + topic);\n  }\n}",
        language: "java", expectedOutput: "Mesaj trimis pe topic: comenzi",
        options: [], answer: "Mesaj trimis pe topic: comenzi"
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Afișează garanțiile de livrare Kafka: \"at-most-once\", \"at-least-once\", \"exactly-once\".",
        starterCode: "public class Main {\n  public static void main(String[] args) {\n    System.out.println(\"at-most-once\");\n    System.out.println(\"at-least-once\");\n    System.out.println(\"exactly-once\");\n  }\n}",
        language: "java", expectedOutput: "at-most-once\nat-least-once\nexactly-once",
        options: [], answer: "at-most-once\nat-least-once\nexactly-once"
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Afișează cazurile de utilizare tipice Kafka: \"event streaming\", \"log aggregation\", \"messaging\".",
        starterCode: "public class Main {\n  public static void main(String[] args) {\n    System.out.println(\"event streaming\");\n    System.out.println(\"log aggregation\");\n    System.out.println(\"messaging\");\n  }\n}",
        language: "java", expectedOutput: "event streaming\nlog aggregation\nmessaging",
        options: [], answer: "event streaming\nlog aggregation\nmessaging"
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Afișează dependența Maven pentru Spring Kafka: \"spring-kafka\".",
        starterCode: "public class Main {\n  public static void main(String[] args) {\n    System.out.println(\"spring-kafka\");\n  }\n}",
        language: "java", expectedOutput: "spring-kafka",
        options: [], answer: "spring-kafka"
      }
    ]
  },
  // ─── 34. Spring Data JPA Avansat ─────────────────────────────────────────
  {
    lessonId: "6a09ba94855b60bc2da6de8b",
    name: "34. Spring Data JPA Avansat",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează: Interfața pentru interogări JPA dinamice (criteria API).\n```java\npublic interface ProdusRepository extends JpaRepository<Produs, Long>,\n  JpaSpecificationExecutor<___> {}\n```",
        options: [], answer: "Produs",
        starterCode: "", language: "java", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează: Adnotarea pentru interogări JPQL personalizate.\n```java\n___(\"SELECT p FROM Produs p WHERE p.pret > :pret\")\nList<Produs> findScumpe(@Param(\"pret\") double pret);\n```",
        options: [], answer: "@Query",
        starterCode: "", language: "java", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează: Evită N+1 problem cu fetch join.\n```java\n@Query(\"SELECT u FROM User u JOIN ___ u.orders\")\nList<User> findAllWithOrders();\n```",
        options: [], answer: "FETCH",
        starterCode: "", language: "java", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează: Proiecție care returnează doar câmpurile selectate.\n```java\npublic interface ProdusView {\n  String ___();\n  double getPret();\n}\n```",
        options: [], answer: "getNume",
        starterCode: "", language: "java", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează: Elimină urmărirea entităților pentru performanță.\n```java\nList<Produs> produse = repository.findAll()\n  .___()\n  .toList();\n```",
        options: [], answer: "stream",
        starterCode: "", language: "java", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Afișează tipurile de interogări Spring Data JPA: \"Derived\", \"@Query JPQL\", \"@Query Native SQL\".",
        starterCode: "public class Main {\n  public static void main(String[] args) {\n    System.out.println(\"Derived\");\n    System.out.println(\"@Query JPQL\");\n    System.out.println(\"@Query Native SQL\");\n  }\n}",
        language: "java", expectedOutput: "Derived\n@Query JPQL\n@Query Native SQL",
        options: [], answer: "Derived\n@Query JPQL\n@Query Native SQL"
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Construiește numele metodei Spring Data JPA pentru a găsi utilizatori după email: afișează \"findByEmail\".",
        starterCode: "public class Main {\n  public static void main(String[] args) {\n    System.out.println(\"findByEmail\");\n  }\n}",
        language: "java", expectedOutput: "findByEmail",
        options: [], answer: "findByEmail"
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Afișează cuvintele cheie pentru interogări derivate: \"findBy\", \"findByAnd\", \"findByOr\", \"findByOrderBy\".",
        starterCode: "public class Main {\n  public static void main(String[] args) {\n    System.out.println(\"findBy\");\n    System.out.println(\"findByAnd\");\n    System.out.println(\"findByOr\");\n    System.out.println(\"findByOrderBy\");\n  }\n}",
        language: "java", expectedOutput: "findBy\nfindByAnd\nfindByOr\nfindByOrderBy",
        options: [], answer: "findBy\nfindByAnd\nfindByOr\nfindByOrderBy"
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Afișează avantajele Specification API: \"dynamic queries\", \"reusable\", \"composable\".",
        starterCode: "public class Main {\n  public static void main(String[] args) {\n    System.out.println(\"dynamic queries\");\n    System.out.println(\"reusable\");\n    System.out.println(\"composable\");\n  }\n}",
        language: "java", expectedOutput: "dynamic queries\nreusable\ncomposable",
        options: [], answer: "dynamic queries\nreusable\ncomposable"
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Afișează strategiile de fetch JPA: \"EAGER\" și \"LAZY\" cu descrierile lor.",
        starterCode: "public class Main {\n  public static void main(String[] args) {\n    System.out.println(\"EAGER: incarcare imediata\");\n    System.out.println(\"LAZY: incarcare la cerere\");\n  }\n}",
        language: "java", expectedOutput: "EAGER: incarcare imediata\nLAZY: incarcare la cerere",
        options: [], answer: "EAGER: incarcare imediata\nLAZY: incarcare la cerere"
      }
    ]
  },
  // ─── 35. Microservices Patterns cu Spring ────────────────────────────────
  {
    lessonId: "6a09ba97855b60bc2da6de9f",
    name: "35. Microservices Patterns cu Spring",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează: Pattern-ul care previne cascadarea erorilor.\n```java\n@CircuitBreaker(name = \"userService\", fallbackMethod = \"___\")\npublic User getUser(Long id) { ... }\n```",
        options: [], answer: "fallback",
        starterCode: "", language: "java", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează: Biblioteca Resilience4j pentru circuit breaker.\n```java\n@___(name = \"myService\")\npublic String apelServiciuExtern() { ... }\n```",
        options: [], answer: "CircuitBreaker",
        starterCode: "", language: "java", expectedOutput: ""
        },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează: API Gateway direcționează cererile la microservicii corespunzătoare.\n```java\n// application.yml Spring Cloud Gateway\nspring.cloud.gateway.routes[0].___: /users/**\n```",
        options: [], answer: "predicates",
        starterCode: "", language: "java", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează: Service discovery permite localizarea dinamică a serviciilor.\n```java\n@EnableEurekaClient\n@SpringBootApplication\npublic class ___ { ... }\n```",
        options: [], answer: "UserServiceApplication",
        starterCode: "", language: "java", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează: Comunicarea sincronă între microservicii.\n```java\n___ restTemplate = new RestTemplate();\nUser u = restTemplate.getForObject(url, User.class);\n```",
        options: [], answer: "RestTemplate",
        starterCode: "", language: "java", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Afișează pattern-urile principale microservicii: \"API Gateway\", \"Circuit Breaker\", \"Service Discovery\", \"Load Balancing\".",
        starterCode: "public class Main {\n  public static void main(String[] args) {\n    System.out.println(\"API Gateway\");\n    System.out.println(\"Circuit Breaker\");\n    System.out.println(\"Service Discovery\");\n    System.out.println(\"Load Balancing\");\n  }\n}",
        language: "java", expectedOutput: "API Gateway\nCircuit Breaker\nService Discovery\nLoad Balancing",
        options: [], answer: "API Gateway\nCircuit Breaker\nService Discovery\nLoad Balancing"
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Afișează stările Circuit Breaker: \"CLOSED\", \"OPEN\", \"HALF_OPEN\".",
        starterCode: "public class Main {\n  public static void main(String[] args) {\n    System.out.println(\"CLOSED\");\n    System.out.println(\"OPEN\");\n    System.out.println(\"HALF_OPEN\");\n  }\n}",
        language: "java", expectedOutput: "CLOSED\nOPEN\nHALF_OPEN",
        options: [], answer: "CLOSED\nOPEN\nHALF_OPEN"
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Afișează avantajele microserviciilor vs monolitic: \"scalare independenta\", \"deploy independent\", \"tehnologii diferite\".",
        starterCode: "public class Main {\n  public static void main(String[] args) {\n    System.out.println(\"scalare independenta\");\n    System.out.println(\"deploy independent\");\n    System.out.println(\"tehnologii diferite\");\n  }\n}",
        language: "java", expectedOutput: "scalare independenta\ndeploy independent\ntehnologii diferite",
        options: [], answer: "scalare independenta\ndeploy independent\ntehnologii diferite"
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Afișează toolurile Spring Cloud: \"Eureka\", \"Zuul\", \"Ribbon\", \"Feign\".",
        starterCode: "public class Main {\n  public static void main(String[] args) {\n    System.out.println(\"Eureka\");\n    System.out.println(\"Zuul\");\n    System.out.println(\"Ribbon\");\n    System.out.println(\"Feign\");\n  }\n}",
        language: "java", expectedOutput: "Eureka\nZuul\nRibbon\nFeign",
        options: [], answer: "Eureka\nZuul\nRibbon\nFeign"
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Afișează protocoalele de comunicare microservicii: \"REST/HTTP\", \"gRPC\", \"Message Queue\".",
        starterCode: "public class Main {\n  public static void main(String[] args) {\n    System.out.println(\"REST/HTTP\");\n    System.out.println(\"gRPC\");\n    System.out.println(\"Message Queue\");\n  }\n}",
        language: "java", expectedOutput: "REST/HTTP\ngRPC\nMessage Queue",
        options: [], answer: "REST/HTTP\ngRPC\nMessage Queue"
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
