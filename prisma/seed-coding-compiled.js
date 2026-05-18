// Seed for C, C++, C#, Java — all remaining lessons
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const TASKS = {
  // C
  "c-introducere": [
    { name: "Hello World C", lang: "c", diff: "easy",
      q: "Scrie un program C care afișează 'Hello, DevZone!' pe ecran. Folosește printf și include stdio.h.",
      code: "#include <stdio.h>\nint main() {\n    printf(\"Hello, DevZone!\\n\");\n    return 0;\n}" },
    { name: "Variabile și printf", lang: "c", diff: "easy",
      q: "Declară variabilele `int age = 25` și `float height = 1.75`. Afișează: 'Varsta: 25, Inaltime: 1.75'.",
      code: "#include <stdio.h>\nint main() {\n    int age = 25;\n    float height = 1.75;\n    printf(\"Varsta: %d, Inaltime: %.2f\\n\", age, height);\n    return 0;\n}" },
  ],
  "c-variabile-tipuri": [
    { name: "Tipuri de date C", lang: "c", diff: "easy",
      q: "Declară și afișează: un int, un float, un char și un double. Afișează dimensiunea fiecăruia cu sizeof.",
      code: "#include <stdio.h>\nint main() {\n    int i = 42;\n    float f = 3.14f;\n    char c = 'A';\n    double d = 3.14159;\n    printf(\"int: %d (%zu bytes)\\n\", i, sizeof(i));\n    printf(\"float: %.2f (%zu bytes)\\n\", f, sizeof(f));\n    printf(\"char: %c (%zu bytes)\\n\", c, sizeof(c));\n    printf(\"double: %.5f (%zu bytes)\\n\", d, sizeof(d));\n    return 0;\n}" },
  ],
  "c-input-output": [
    { name: "Conversie temperatură C", lang: "c", diff: "easy",
      q: "Convertește 100 grade Celsius la Fahrenheit (F = C*9/5+32) și afișează rezultatul cu 1 zecimală.",
      code: "#include <stdio.h>\nint main() {\n    float celsius = 100.0;\n    float fahrenheit = celsius * 9.0 / 5.0 + 32.0;\n    printf(\"%.1f°C = %.1f°F\\n\", celsius, fahrenheit);\n    return 0;\n}" },
  ],
  "c-operatori": [
    { name: "Operatori aritmetici C", lang: "c", diff: "easy",
      q: "Declară a=17, b=5. Afișează: suma, diferența, produsul, câtul întreg (div) și restul (mod).",
      code: "#include <stdio.h>\nint main() {\n    int a = 17, b = 5;\n    printf(\"%d\\n\", a + b);\n    printf(\"%d\\n\", a - b);\n    printf(\"%d\\n\", a * b);\n    printf(\"%d\\n\", a / b);\n    printf(\"%d\\n\", a % b);\n    return 0;\n}" },
  ],
  "c-conditii": [
    { name: "Max din trei numere C", lang: "c", diff: "easy",
      q: "Declară a=12, b=45, c=33. Găsește și afișează maximul folosind if/else.",
      code: "#include <stdio.h>\nint main() {\n    int a = 12, b = 45, c = 33;\n    int max;\n    if (a >= b && a >= c) max = a;\n    else if (b >= a && b >= c) max = b;\n    else max = c;\n    printf(\"%d\\n\", max);\n    return 0;\n}" },
    { name: "Nota la literă C", lang: "c", diff: "easy",
      q: "Declară nota=85. Afișează: A (>=90), B (>=80), C (>=70), D (<70) folosind if/else if.",
      code: "#include <stdio.h>\nint main() {\n    int nota = 85;\n    if (nota >= 90) printf(\"A\\n\");\n    else if (nota >= 80) printf(\"B\\n\");\n    else if (nota >= 70) printf(\"C\\n\");\n    else printf(\"D\\n\");\n    return 0;\n}" },
  ],
  "c-bucle": [
    { name: "Tabla înmulțirii C", lang: "c", diff: "easy",
      q: "Afișează tabla înmulțirii pentru 7 (7x1 până la 7x10) în format: '7 x 1 = 7'.",
      code: "#include <stdio.h>\nint main() {\n    for (int i = 1; i <= 10; i++)\n        printf(\"7 x %d = %d\\n\", i, 7*i);\n    return 0;\n}" },
    { name: "Suma numerelor C", lang: "c", diff: "easy",
      q: "Calculează suma numerelor de la 1 la 100 cu o buclă for și afișează rezultatul.",
      code: "#include <stdio.h>\nint main() {\n    int sum = 0;\n    for (int i = 1; i <= 100; i++) sum += i;\n    printf(\"%d\\n\", sum);\n    return 0;\n}" },
  ],
  "c-functii": [
    { name: "Funcție factorial C", lang: "c", diff: "medium",
      q: "Scrie o funcție `factorial(int n)` recursivă. Afișează factorialele de la 0 la 7.",
      code: "#include <stdio.h>\nlong long factorial(int n) {\n    if (n <= 1) return 1;\n    return n * factorial(n-1);\n}\nint main() {\n    for (int i = 0; i <= 7; i++)\n        printf(\"%d! = %lld\\n\", i, factorial(i));\n    return 0;\n}" },
  ],
  "c-array-uri": [
    { name: "Suma array C", lang: "c", diff: "easy",
      q: "Declară un array int arr[] = {3,7,2,8,5,1,9,4,6,10}. Calculează suma, minimul și maximul.",
      code: "#include <stdio.h>\nint main() {\n    int arr[] = {3,7,2,8,5,1,9,4,6,10};\n    int n = 10, sum=0, min=arr[0], max=arr[0];\n    for (int i=0;i<n;i++) {\n        sum+=arr[i];\n        if(arr[i]<min) min=arr[i];\n        if(arr[i]>max) max=arr[i];\n    }\n    printf(\"Suma: %d\\nMin: %d\\nMax: %d\\n\",sum,min,max);\n    return 0;\n}" },
  ],
  "c-pointers": [
    { name: "Pointer basic C", lang: "c", diff: "medium",
      q: "Declară int x=42. Creează un pointer *p care pointează la x. Afișează adresa lui x, valoarea prin pointer, și modifică x la 100 prin pointer.",
      code: "#include <stdio.h>\nint main() {\n    int x = 42;\n    int *p = &x;\n    printf(\"Valoare: %d\\n\", *p);\n    *p = 100;\n    printf(\"Dupa modificare: %d\\n\", x);\n    return 0;\n}" },
  ],
  "c-strings-malloc": [
    { name: "Operații pe string C", lang: "c", diff: "medium",
      q: "Scrie un program care: declară s='Hello World', calculează lungimea cu strlen, o copiază cu strcpy, o concatenează cu ' C!' și afișează rezultatul.",
      code: "#include <stdio.h>\n#include <string.h>\nint main() {\n    char s[] = \"Hello World\";\n    printf(\"Lung: %zu\\n\", strlen(s));\n    char copy[50];\n    strcpy(copy, s);\n    strcat(copy, \" C!\");\n    printf(\"%s\\n\", copy);\n    return 0;\n}" },
  ],
  "c-structuri-files": [
    { name: "Structura Student C", lang: "c", diff: "medium",
      q: "Definește struct Student cu name[50] și grade. Creează un array de 3 studenți, afișează-i pe toți, și calculează media notelor.",
      code: "#include <stdio.h>\nstruct Student {\n    char name[50];\n    float grade;\n};\nint main() {\n    struct Student students[] = {{\"Ana\",9.5},{\"Ion\",7.0},{\"Maria\",8.5}};\n    float sum = 0;\n    for(int i=0;i<3;i++) {\n        printf(\"%s: %.1f\\n\", students[i].name, students[i].grade);\n        sum += students[i].grade;\n    }\n    printf(\"Media: %.2f\\n\", sum/3);\n    return 0;\n}" },
  ],
  "c-recursivitate": [
    { name: "Fibonacci C", lang: "c", diff: "medium",
      q: "Scrie funcția fibonacci(n) recursivă și afișează primii 10 termeni.",
      code: "#include <stdio.h>\nint fibonacci(int n) {\n    if (n<=0) return 0;\n    if (n==1) return 1;\n    return fibonacci(n-1)+fibonacci(n-2);\n}\nint main() {\n    for(int i=0;i<10;i++) printf(\"%d \",fibonacci(i));\n    printf(\"\\n\");\n    return 0;\n}" },
  ],
  "c-sortare-cautare": [
    { name: "Bubble sort C", lang: "c", diff: "medium",
      q: "Implementează bubble sort pe array-ul {64,34,25,12,22,11,90}. Afișează array-ul sortat.",
      code: "#include <stdio.h>\nvoid bubbleSort(int arr[], int n) {\n    for(int i=0;i<n-1;i++)\n        for(int j=0;j<n-i-1;j++)\n            if(arr[j]>arr[j+1]) {\n                int tmp=arr[j]; arr[j]=arr[j+1]; arr[j+1]=tmp;\n            }\n}\nint main() {\n    int arr[]={64,34,25,12,22,11,90};\n    bubbleSort(arr,7);\n    for(int i=0;i<7;i++) printf(\"%d \",arr[i]);\n    printf(\"\\n\");\n    return 0;\n}" },
  ],
  "c-bitwise": [
    { name: "Operații pe biți C", lang: "c", diff: "medium",
      q: "Demonstrează operații bitwise pe numerele 12 (1100) și 10 (1010): AND, OR, XOR, NOT pentru 12, shift stânga cu 2 pentru 5.",
      code: "#include <stdio.h>\nint main() {\n    int a=12, b=10;\n    printf(\"AND: %d\\n\", a&b);\n    printf(\"OR: %d\\n\", a|b);\n    printf(\"XOR: %d\\n\", a^b);\n    printf(\"NOT 12: %d\\n\", ~a);\n    printf(\"5<<2: %d\\n\", 5<<2);\n    return 0;\n}" },
  ],
  // C++
  "cpp-introducere": [
    { name: "Hello World C++", lang: "cpp", diff: "easy",
      q: "Scrie un program C++ care afișează 'Hello, C++!' și arată diferența față de C (cout vs printf).",
      code: "#include <iostream>\nusing namespace std;\nint main() {\n    cout << \"Hello, C++!\" << endl;\n    return 0;\n}" },
    { name: "Cin și cout C++", lang: "cpp", diff: "easy",
      q: "Declară variabilele name='Ana' și age=25. Afișează cu cout mesajul: 'Salut, Ana! Ai 25 de ani.'",
      code: "#include <iostream>\n#include <string>\nusing namespace std;\nint main() {\n    string name = \"Ana\";\n    int age = 25;\n    cout << \"Salut, \" << name << \"! Ai \" << age << \" de ani.\" << endl;\n    return 0;\n}" },
  ],
  "cpp-vectori-string": [
    { name: "Vector operații", lang: "cpp", diff: "easy",
      q: "Creează un vector<int> cu valorile {5,2,8,1,9,3}. Adaugă 7 cu push_back, sortează cu sort(), afișează elementele.",
      code: "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\nint main() {\n    vector<int> v = {5,2,8,1,9,3};\n    v.push_back(7);\n    sort(v.begin(), v.end());\n    for(int x : v) cout << x << \" \";\n    cout << endl;\n    return 0;\n}" },
  ],
  "cpp-clase": [
    { name: "Clasă Rectangle C++", lang: "cpp", diff: "easy",
      q: "Definește clasa Rectangle cu constructor(width, height), metodele area() și perimeter(). Testează cu (5,3).",
      code: "#include <iostream>\nusing namespace std;\nclass Rectangle {\n    int w, h;\npublic:\n    Rectangle(int w, int h): w(w), h(h) {}\n    int area() { return w*h; }\n    int perimeter() { return 2*(w+h); }\n};\nint main() {\n    Rectangle r(5,3);\n    cout << r.area() << endl;\n    cout << r.perimeter() << endl;\n    return 0;\n}" },
  ],
  "cpp-mostenire-polimorfism": [
    { name: "Polimorfism C++", lang: "cpp", diff: "medium",
      q: "Creează clasa de bază Animal cu virtual speak(). Dog::speak() afișează 'Ham!', Cat::speak() afișează 'Miau!'. Creează un vector de Animal* și apelează speak() pe fiecare.",
      code: "#include <iostream>\n#include <vector>\nusing namespace std;\nclass Animal {\npublic:\n    virtual void speak() = 0;\n    virtual ~Animal() {}\n};\nclass Dog : public Animal {\npublic: void speak() { cout << \"Ham!\" << endl; }\n};\nclass Cat : public Animal {\npublic: void speak() { cout << \"Miau!\" << endl; }\n};\nint main() {\n    vector<Animal*> animals = {new Dog(), new Cat(), new Dog()};\n    for(auto a : animals) a->speak();\n    for(auto a : animals) delete a;\n    return 0;\n}" },
  ],
  "cpp-templates": [
    { name: "Template funcție", lang: "cpp", diff: "medium",
      q: "Scrie o funcție template `maxVal<T>(a, b)` care returnează maximul. Testează cu int(5,3), double(3.14,2.71) și string('zzz','aaa').",
      code: "#include <iostream>\n#include <string>\nusing namespace std;\ntemplate<typename T>\nT maxVal(T a, T b) { return a > b ? a : b; }\nint main() {\n    cout << maxVal(5,3) << endl;\n    cout << maxVal(3.14,2.71) << endl;\n    cout << maxVal(string(\"zzz\"),string(\"aaa\")) << endl;\n    return 0;\n}" },
  ],
  "cpp-stl-algorithms": [
    { name: "STL algorithms", lang: "cpp", diff: "medium",
      q: "Ai vector<int> v={3,1,4,1,5,9,2,6}. Folosind STL: sortează, găsește maximul cu max_element, numără câte de 1 sunt cu count, filtrează >4 cu copy_if.",
      code: "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\nint main() {\n    vector<int> v={3,1,4,1,5,9,2,6};\n    sort(v.begin(),v.end());\n    cout<<\"Max: \"<<*max_element(v.begin(),v.end())<<endl;\n    cout<<\"Count 1: \"<<count(v.begin(),v.end(),1)<<endl;\n    vector<int> big;\n    copy_if(v.begin(),v.end(),back_inserter(big),[](int x){return x>4;});\n    for(int x:big) cout<<x<<\" \";\n    cout<<endl;\n    return 0;\n}" },
  ],
  "cpp-smart-pointers": [
    { name: "unique_ptr", lang: "cpp", diff: "medium",
      q: "Creează un unique_ptr<int> pentru valoarea 42. Demonstrează că nu poți copia, doar muta. Afișează valoarea și resursele eliberate automat.",
      code: "#include <iostream>\n#include <memory>\nusing namespace std;\nint main() {\n    auto ptr = make_unique<int>(42);\n    cout << \"Valoare: \" << *ptr << endl;\n    auto ptr2 = move(ptr);\n    cout << \"Ptr1 e null: \" << (ptr == nullptr) << endl;\n    cout << \"Ptr2: \" << *ptr2 << endl;\n    return 0;\n}" },
  ],
  "cpp-lambda": [
    { name: "Lambda cu capturi", lang: "cpp", diff: "medium",
      q: "Folosind lambda-uri: creează un multiplier cu captură [factor]. Creează double=multiplier(2) și triple=multiplier(3). Testează cu 5.",
      code: "#include <iostream>\n#include <functional>\nusing namespace std;\nint main() {\n    auto multiplier = [](int factor) {\n        return [factor](int x) { return x * factor; };\n    };\n    auto dbl = multiplier(2);\n    auto trpl = multiplier(3);\n    cout << dbl(5) << endl;\n    cout << trpl(5) << endl;\n    return 0;\n}" },
  ],
  // C#
  "csharp-introducere": [
    { name: "Hello World C#", lang: "csharp", diff: "easy",
      q: "Scrie un program C# care afișează 'Hello, C#!' și 'Versiune: .NET 8'. Folosește Console.WriteLine.",
      code: "using System;\nclass Program {\n    static void Main() {\n        Console.WriteLine(\"Hello, C#!\");\n        Console.WriteLine(\"Versiune: .NET 8\");\n    }\n}" },
  ],
  "csharp-clase-oop": [
    { name: "Clasă în C#", lang: "csharp", diff: "easy",
      q: "Definește clasa BankAccount cu proprietatea Balance (double), metodele Deposit(amount) și Withdraw(amount), și ToString(). Testează cu depunere 1000 și retragere 250.",
      code: "using System;\nclass BankAccount {\n    public double Balance { get; private set; } = 0;\n    public void Deposit(double a) { if(a>0) Balance+=a; }\n    public void Withdraw(double a) { if(a<=Balance) Balance-=a; }\n    public override string ToString() => $\"Balance: {Balance}\";\n}\nclass Program {\n    static void Main() {\n        var acc = new BankAccount();\n        acc.Deposit(1000);\n        acc.Withdraw(250);\n        Console.WriteLine(acc);\n    }\n}" },
  ],
  "csharp-collections-linq": [
    { name: "LINQ query", lang: "csharp", diff: "medium",
      q: "Ai lista de numere {1..20}. Folosind LINQ: filtrează numerele pare, înmulțește cu 3, ia primele 4. Afișează rezultatul.",
      code: "using System;\nusing System.Linq;\nclass Program {\n    static void Main() {\n        var result = Enumerable.Range(1,20)\n            .Where(n => n%2==0)\n            .Select(n => n*3)\n            .Take(4);\n        Console.WriteLine(string.Join(\", \", result));\n    }\n}" },
  ],
  "csharp-async-await": [
    { name: "Async/await C#", lang: "csharp", diff: "hard",
      q: "Scrie 2 metode async: TaskA() afișează 'Start A' și 'End A', TaskB() afișează 'Start B' și 'End B'. Rulează-le cu Task.WhenAll.",
      code: "using System;\nusing System.Threading.Tasks;\nclass Program {\n    static async Task TaskA() {\n        Console.WriteLine(\"Start A\");\n        await Task.Delay(0);\n        Console.WriteLine(\"End A\");\n    }\n    static async Task TaskB() {\n        Console.WriteLine(\"Start B\");\n        await Task.Delay(0);\n        Console.WriteLine(\"End B\");\n    }\n    static async Task Main() {\n        await Task.WhenAll(TaskA(), TaskB());\n    }\n}" },
  ],
  "csharp-input-conversii": [
    { name: "Conversii tipuri C#", lang: "csharp", diff: "easy",
      q: "Converteste string-ul '42' la int, 3.14 la float, true la bool. Afișează tipurile și valorile.",
      code: "using System;\nclass Program {\n    static void Main() {\n        int n = int.Parse(\"42\");\n        double d = double.Parse(\"3.14\");\n        bool b = bool.Parse(\"True\");\n        Console.WriteLine($\"{n} ({n.GetType().Name})\");\n        Console.WriteLine($\"{d} ({d.GetType().Name})\");\n        Console.WriteLine($\"{b} ({b.GetType().Name})\");\n    }\n}" },
  ],
  "csharp-conditii-bucle": [
    { name: "Tabla înmulțirii C#", lang: "csharp", diff: "easy",
      q: "Afișează tabla înmulțirii pentru 7 cu un for loop, în format '7 x i = rezultat'.",
      code: "using System;\nclass Program {\n    static void Main() {\n        for(int i=1;i<=10;i++)\n            Console.WriteLine($\"7 x {i} = {7*i}\");\n    }\n}" },
  ],
  "csharp-metode": [
    { name: "Fibonacci C#", lang: "csharp", diff: "medium",
      q: "Scrie metoda Fibonacci(int n) recursivă. Afișează primii 10 termeni.",
      code: "using System;\nclass Program {\n    static int Fibonacci(int n) {\n        if(n<=0) return 0;\n        if(n==1) return 1;\n        return Fibonacci(n-1)+Fibonacci(n-2);\n    }\n    static void Main() {\n        for(int i=0;i<10;i++) Console.Write(Fibonacci(i)+\" \");\n        Console.WriteLine();\n    }\n}" },
  ],
  "csharp-array-list": [
    { name: "List<T> în C#", lang: "csharp", diff: "easy",
      q: "Creează o List<string> cu 5 fructe. Adaugă 'Pepene', elimină al 3-lea element, sortează și afișează.",
      code: "using System;\nusing System.Collections.Generic;\nclass Program {\n    static void Main() {\n        var fruits = new List<string>{\"Mere\",\"Pere\",\"Struguri\",\"Banane\",\"Mango\"};\n        fruits.Add(\"Pepene\");\n        fruits.RemoveAt(2);\n        fruits.Sort();\n        fruits.ForEach(Console.WriteLine);\n    }\n}" },
  ],
  "csharp-recursivitate": [
    { name: "Turnurile din Hanoi C#", lang: "csharp", diff: "hard",
      q: "Rezolvă Turnurile din Hanoi pentru 3 discuri. Afișează fiecare mutare: 'Mută discul N de pe A pe C'.",
      code: "using System;\nclass Program {\n    static void Hanoi(int n, char from, char to, char via) {\n        if(n==1) { Console.WriteLine($\"Muta disc 1 de pe {from} pe {to}\"); return; }\n        Hanoi(n-1,from,via,to);\n        Console.WriteLine($\"Muta disc {n} de pe {from} pe {to}\");\n        Hanoi(n-1,via,to,from);\n    }\n    static void Main() { Hanoi(3,'A','C','B'); }\n}" },
  ],
  // Java
  "java-introducere": [
    { name: "Hello World Java", lang: "java", diff: "easy",
      q: "Scrie un program Java care afișează 'Hello, Java!' și versiunea Java cu System.getProperty.",
      code: "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello, Java!\");\n        System.out.println(\"Java version: \" + System.getProperty(\"java.version\"));\n    }\n}" },
  ],
  "java-clase-oop": [
    { name: "Clasă BankAccount Java", lang: "java", diff: "easy",
      q: "Implementează clasa BankAccount cu balance, deposit(amount) și withdraw(amount). Testează cu 1000 depus, 300 retras.",
      code: "public class Main {\n    static class BankAccount {\n        private double balance = 0;\n        public void deposit(double a) { if(a>0) balance+=a; }\n        public void withdraw(double a) { if(a<=balance) balance-=a; }\n        public double getBalance() { return balance; }\n    }\n    public static void main(String[] args) {\n        BankAccount acc = new BankAccount();\n        acc.deposit(1000);\n        acc.withdraw(300);\n        System.out.println(acc.getBalance());\n    }\n}" },
  ],
  "java-collections-streams": [
    { name: "Stream API Java", lang: "java", diff: "medium",
      q: "Folosind Stream API pe List.of(1..10): filtrează numerele impare, înmulțește cu 2, colectează primele 4 și afișează.",
      code: "import java.util.*;\nimport java.util.stream.*;\npublic class Main {\n    public static void main(String[] args) {\n        List<Integer> result = IntStream.rangeClosed(1,10)\n            .filter(n -> n%2!=0)\n            .map(n -> n*2)\n            .limit(4)\n            .boxed()\n            .collect(Collectors.toList());\n        System.out.println(result);\n    }\n}" },
  ],
  "java-exceptions": [
    { name: "Custom exceptions Java", lang: "java", diff: "medium",
      q: "Creează InsufficientFundsException. Scrie clasa Account cu withdraw(amount) care o aruncă dacă fonduri insuficiente. Testează.",
      code: "public class Main {\n    static class InsufficientFundsException extends Exception {\n        public InsufficientFundsException(String msg) { super(msg); }\n    }\n    static class Account {\n        double balance;\n        Account(double b) { balance=b; }\n        void withdraw(double a) throws InsufficientFundsException {\n            if(a>balance) throw new InsufficientFundsException(\"Fonduri insuficiente: \"+balance);\n            balance-=a;\n        }\n    }\n    public static void main(String[] args) {\n        Account acc = new Account(500);\n        try { acc.withdraw(200); System.out.println(\"Ramas: \"+acc.balance); }\n        catch(InsufficientFundsException e) { System.out.println(e.getMessage()); }\n        try { acc.withdraw(400); }\n        catch(InsufficientFundsException e) { System.out.println(e.getMessage()); }\n    }\n}" },
  ],
  "java-input-conversii": [
    { name: "Conversii Java", lang: "java", diff: "easy",
      q: "Converteste: '42' la int, '3.14' la double, True la boolean. Afișează tipul și valoarea fiecăruia.",
      code: "public class Main {\n    public static void main(String[] args) {\n        int n = Integer.parseInt(\"42\");\n        double d = Double.parseDouble(\"3.14\");\n        boolean b = Boolean.parseBoolean(\"True\");\n        System.out.println(n + \" (int)\");\n        System.out.println(d + \" (double)\");\n        System.out.println(b + \" (boolean)\");\n    }\n}" },
  ],
  "java-string-operatii": [
    { name: "String operations Java", lang: "java", diff: "easy",
      q: "Ai String s='Hello, World!'. Afișează: lungimea, upper case, dacă conține 'World', înlocuiește 'World' cu 'Java'.",
      code: "public class Main {\n    public static void main(String[] args) {\n        String s = \"Hello, World!\";\n        System.out.println(s.length());\n        System.out.println(s.toUpperCase());\n        System.out.println(s.contains(\"World\"));\n        System.out.println(s.replace(\"World\",\"Java\"));\n    }\n}" },
  ],
  "java-recursivitate": [
    { name: "Binary search recursiv Java", lang: "java", diff: "medium",
      q: "Implementează binary search recursiv. Caută elementul 7 în array-ul sortat {1,3,5,7,9,11,13}. Afișează indexul găsit.",
      code: "public class Main {\n    static int binarySearch(int[] arr, int left, int right, int target) {\n        if(left>right) return -1;\n        int mid=(left+right)/2;\n        if(arr[mid]==target) return mid;\n        if(arr[mid]<target) return binarySearch(arr,mid+1,right,target);\n        return binarySearch(arr,left,mid-1,target);\n    }\n    public static void main(String[] args) {\n        int[] arr={1,3,5,7,9,11,13};\n        System.out.println(binarySearch(arr,0,arr.length-1,7));\n        System.out.println(binarySearch(arr,0,arr.length-1,6));\n    }\n}" },
  ],
};

async function main() {
  console.log('Adăugare coding tasks C/C++/C#/Java...');
  let added = 0, skipped = 0;

  const langMap = { c: 'c', cpp: 'cpp', csharp: 'csharp', java: 'java' };

  for (const [slug, tasks] of Object.entries(TASKS)) {
    const lesson = await prisma.lesson.findFirst({ where: { slug } });
    if (!lesson) { console.log(`  [skip] ${slug} — negăsit`); skipped++; continue; }

    const existing = await prisma.task.count({ where: { lessonId: lesson.id, type: 'coding' } });
    if (existing >= 2) { console.log(`  [skip] ${slug} — are deja ${existing}`); skipped++; continue; }

    const maxTask = await prisma.task.findFirst({ where: { lessonId: lesson.id }, orderBy: { number: 'desc' } });
    let n = (maxTask?.number ?? 0) + 1;

    for (const t of tasks) {
      await prisma.task.create({
        data: {
          lessonId: lesson.id, number: n++,
          name: t.name, question: t.q,
          options: [], answer: '',
          explanation: '',
          difficulty: t.diff || 'medium',
          type: 'coding', language: t.lang,
          starterCode: t.code || '',
          expectedOutput: '',
        },
      });
      added++;
    }
    console.log(`  [ok] ${slug} — ${tasks.length} tasks`);
  }

  console.log(`\nGata: ${added} adăugate, ${skipped} sărite.`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
