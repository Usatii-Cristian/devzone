const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();

async function up(lessonContains, titleContains, content) {
  const lessons = await p.lesson.findMany({ where: { module: { slug: 'java' }, title: { contains: lessonContains } } });
  const theory = await p.theory.findFirst({ where: { lessonId: { in: lessons.map(l => l.id) }, title: { contains: titleContains } } });
  if (!theory) { console.log(`NOT FOUND: ${lessonContains} / ${titleContains}`); return; }
  await p.theory.update({ where: { id: theory.id }, data: { content } });
  console.log(`✓ ${theory.title}: ${theory.content.length} → ${content.length}`);
}

async function run() {

await up('6. Input', 'Scanner', `**Scanner și parsing** sunt mecanismele principale de citire a datelor de la utilizator sau din fișiere în Java — esențiale pentru aplicații interactive și procesarea intrărilor.

**Citire de la consolă**

\`\`\`java
import java.util.Scanner;

public class InputDemo {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.print("Introdu numele: ");
        String name = sc.nextLine();        // citește linie completă cu spații

        System.out.print("Vârsta: ");
        int age = sc.nextInt();             // citește int
        sc.nextLine();                      // consumă newline-ul rămas după nextInt!

        System.out.print("Înălțimea (m): ");
        double height = sc.nextDouble();
        sc.nextLine();

        System.out.printf("Salut, %s! Ai %d ani și %.2f m.%n", name, age, height);
        sc.close(); // eliberează resursa
    }
}
\`\`\`

**Citire în buclă cu Scanner**

\`\`\`java
Scanner sc = new Scanner(System.in);
List<Integer> numbers = new ArrayList<>();

System.out.println("Introdu numere (0 pentru stop):");
while (sc.hasNextInt()) {
    int n = sc.nextInt();
    if (n == 0) break;
    numbers.add(n);
}

// Citire linie cu linie dintr-un fișier
try (Scanner fileSc = new Scanner(new File("data.txt"))) {
    while (fileSc.hasNextLine()) {
        String line = fileSc.nextLine().trim();
        if (!line.isEmpty()) {
            processLine(line);
        }
    }
}
\`\`\`

**Parsing de tipuri**

\`\`\`java
// Conversii String → tipuri primitive
String numStr = "42";
int i = Integer.parseInt(numStr);
long l = Long.parseLong("9876543210");
double d = Double.parseDouble("3.14");
boolean b = Boolean.parseBoolean("true");

// Cu validare
public static int parseIntSafe(String s, int defaultValue) {
    try {
        return Integer.parseInt(s.trim());
    } catch (NumberFormatException e) {
        System.err.println("Număr invalid: " + s);
        return defaultValue;
    }
}

// Scanner cu delimiter custom
Scanner csv = new Scanner("Ana,30,București");
csv.useDelimiter(",");
String n = csv.next();  // Ana
int a   = csv.nextInt(); // 30
String c = csv.next(); // București
\`\`\`

**Validare input interactiv**

\`\`\`java
public static int readPositiveInt(Scanner sc, String prompt) {
    while (true) {
        System.out.print(prompt);
        if (sc.hasNextInt()) {
            int val = sc.nextInt(); sc.nextLine();
            if (val > 0) return val;
            System.out.println("Numărul trebuie să fie pozitiv!");
        } else {
            System.out.println("Introdu un număr întreg valid!");
            sc.nextLine(); // consumă input-ul invalid
        }
    }
}
\`\`\`

• **nextInt() / nextDouble()** NU consumă newline — apelează \`sc.nextLine()\` imediat după
• **sc.hasNextInt()** verifică fără a consuma — util pentru bucle robuste
• Pentru aplicații reale, preferi \`BufferedReader\` sau \`System.console()\` față de Scanner`);

await up('6. Input', 'Conversii', `**Conversiile de tipuri în Java** sunt operații frecvente — transformarea între primitive, obiecte wrapper, String și alte tipuri este esențială în orice aplicație.

**Widening și Narrowing Conversions**

\`\`\`java
// Widening — implicit, fără pierderi (byte → short → int → long → float → double)
int i = 100;
long l = i;       // implicit
double d = i;     // implicit
float f = i;      // implicit

// Narrowing — explicit (cast), posibilă pierdere de date
double pi = 3.14159;
int truncated = (int) pi;       // 3 — partea zecimală pierdută
byte b = (byte) 300;            // overflow: 300 % 256 = 44
long bigLong = 10_000_000_000L;
int overflow = (int) bigLong;   // undefined behavior — verifică range!
\`\`\`

**Boxing și Unboxing**

\`\`\`java
// Autoboxing — primitiv → wrapper (automat)
int x = 42;
Integer boxed = x;              // autoboxing: Integer.valueOf(42)
List<Integer> list = new ArrayList<>();
list.add(10);                   // autoboxing

// Unboxing — wrapper → primitiv (automat)
Integer y = 100;
int unboxed = y;                // unboxing: y.intValue()
int sum = boxed + y;            // ambii unboxed automat

// ATENȚIE: NullPointerException la unboxing null!
Integer nullInt = null;
// int bad = nullInt; // NullPointerException! Verifică înainte:
int safe = (nullInt != null) ? nullInt : 0;

// Integer cache (-128 la 127)
Integer a = 127;
Integer b = 127;
System.out.println(a == b);    // true (cache)
Integer c = 200;
Integer d2 = 200;
System.out.println(c == d2);   // false (obiecte diferite!)
System.out.println(c.equals(d2)); // true — folosește equals()!
\`\`\`

**String ↔ Tipuri**

\`\`\`java
// Primitiv/Wrapper → String
int num = 42;
String s1 = String.valueOf(num);    // "42"
String s2 = Integer.toString(num);  // "42"
String s3 = "" + num;               // "42" — concatenare (mai lent)
String hex = Integer.toHexString(255); // "ff"
String bin = Integer.toBinaryString(10); // "1010"

// String → Primitiv
int parsed = Integer.parseInt("42");
double d = Double.parseDouble("3.14");
int fromHex = Integer.parseInt("ff", 16); // 255

// char ↔ int
char ch = 'A';
int ascii = ch;          // 65
char fromInt = (char) 66; // 'B'
String charStr = String.valueOf(ch); // "A"
char backToChar = "A".charAt(0);
\`\`\`

**Conversii numerice utile**

\`\`\`java
// Math conversions
double val = 3.7;
long floor = (long) val;              // 3 (truncate, nu floor!)
long rounded = Math.round(val);       // 4
double ceil = Math.ceil(val);         // 4.0
double abs = Math.abs(-3.14);         // 3.14

// BigDecimal pentru precizie financiară
BigDecimal price = new BigDecimal("19.99");
BigDecimal tax = new BigDecimal("0.19");
BigDecimal total = price.multiply(tax).setScale(2, RoundingMode.HALF_UP);
// NU folosi double pentru bani — precizie floating-point greșită!
\`\`\`

• **Cast explicit** când poți pierde date (narrowing, double → int)
• **equals()** pentru compararea wrapper-elor, NU \`==\` (referință, nu valoare)
• **BigDecimal** pentru calcule financiare, nu double — evit erorile de reprezentare`);

await up('6. Input', 'BufferedReader', `**BufferedReader** este alternativa mai performantă la Scanner pentru citirea textului din consolă sau fișiere — buffering intern, ideal pentru volume mari de date.

**Citire de la consolă cu BufferedReader**

\`\`\`java
import java.io.*;

public class BufferedReaderDemo {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

        System.out.print("Introdu numele: ");
        String name = br.readLine();           // citește linia completă

        System.out.print("Vârsta: ");
        int age = Integer.parseInt(br.readLine().trim()); // parse manual

        System.out.println("Bun venit, " + name + "! Ai " + age + " ani.");
    }
}
\`\`\`

**Citire fișiere text**

\`\`\`java
// Citire cu BufferedReader — eficient, buffering de 8KB default
try (BufferedReader br = new BufferedReader(new FileReader("data.txt"))) {
    String line;
    int lineNum = 1;
    while ((line = br.readLine()) != null) {
        System.out.println(lineNum++ + ": " + line);
    }
} catch (IOException e) {
    System.err.println("Eroare citire: " + e.getMessage());
}

// Modern: Files.lines() (Java 8+) — stream leneș
try (Stream<String> lines = Files.lines(Path.of("data.txt"), StandardCharsets.UTF_8)) {
    lines.filter(l -> !l.isBlank())
         .map(String::trim)
         .forEach(System.out::println);
}

// Citire completă într-un String (fișiere mici)
String content = Files.readString(Path.of("config.txt"), StandardCharsets.UTF_8);
\`\`\`

**Citire CSV eficientă**

\`\`\`java
List<Person> persons = new ArrayList<>();
try (BufferedReader br = new BufferedReader(new FileReader("persons.csv"))) {
    String header = br.readLine(); // sări headerul
    String line;
    while ((line = br.readLine()) != null) {
        String[] parts = line.split(",", -1); // -1 păstrează câmpurile goale
        if (parts.length >= 3) {
            persons.add(new Person(
                parts[0].trim(),
                Integer.parseInt(parts[1].trim()),
                parts[2].trim()
            ));
        }
    }
}
\`\`\`

**BufferedReader vs Scanner**

\`\`\`java
// Scanner: ușor de utilizat, mai lent (regex pentru tokens), potrivit pentru input interactiv
// BufferedReader: mai rapid (citire în buffer), manual parsing, potrivit pentru fișiere mari

// Benchmark: BufferedReader este ~5-10x mai rapid pentru fișiere mari cu linii scurte

// Scrie cu BufferedWriter
try (BufferedWriter bw = new BufferedWriter(new FileWriter("output.txt"))) {
    bw.write("Linia 1");
    bw.newLine(); // platform-agnostic line separator
    bw.write("Linia 2");
} // flush + close automat
\`\`\`

• **BufferedReader.readLine()** returnează null la EOF — condiție de ieșire din while
• Specifică mereu charset la citire fișiere: **StandardCharsets.UTF_8**
• Preferi **Files.readAllLines()** sau **Files.lines()** pentru cod modern și concis`);

await up('7. Condi', 'Switch expression', `**Switch expression (Java 14+) și instrucțiunile condiționale avansate** îmbunătățesc switch clasic — elimină fall-through și permit switch ca expresie cu valoare.

**Switch expression cu arrow labels**

\`\`\`java
// Switch STATEMENT clasic — prone to fall-through bug
int day = 3;
String type;
switch (day) {
    case 1: case 7:
        type = "Weekend"; break;   // break obligatoriu!
    case 2: case 3: case 4: case 5: case 6:
        type = "Weekday"; break;
    default:
        type = "Necunoscut";
}

// Switch EXPRESSION — fără fall-through, returnează valoare
String dayType = switch (day) {
    case 1, 7 -> "Weekend";
    case 2, 3, 4, 5, 6 -> "Weekday";
    default -> "Necunoscut";
};

// Cu yield pentru logică complexă
String description = switch (day) {
    case 1 -> "Luni — start săptămână";
    case 5 -> {
        String base = "Vineri";
        yield base + " — aproape weekend!";
    }
    case 6, 7 -> "Weekend liber";
    default -> "Zi " + day;
};
\`\`\`

**Pattern matching switch (Java 21)**

\`\`\`java
sealed interface Expr permits Num, Add, Mul {}
record Num(double val) implements Expr {}
record Add(Expr left, Expr right) implements Expr {}
record Mul(Expr left, Expr right) implements Expr {}

double eval(Expr e) {
    return switch (e) {
        case Num(double v)        -> v;
        case Add(Expr l, Expr r)  -> eval(l) + eval(r);
        case Mul(Expr l, Expr r)  -> eval(l) * eval(r);
        // Exhaustiv — sealed class, nu e nevoie de default
    };
}

// Guarded patterns cu when
String classify(Object obj) {
    return switch (obj) {
        case Integer i when i < 0  -> "negativ: " + i;
        case Integer i when i == 0 -> "zero";
        case Integer i             -> "pozitiv: " + i;
        case String s when s.isEmpty() -> "string gol";
        case String s              -> "string: " + s;
        case null                  -> "null";
        default                    -> "altceva: " + obj;
    };
}
\`\`\`

**Condiții complexe cu if-else**

\`\`\`java
// Ternary operator — expresii simple
int abs = x >= 0 ? x : -x;
String label = score >= 90 ? "Excelent" : score >= 70 ? "Bine" : "Necesită îmbunătățire";

// Ternary nested — evită mai mult de 2 niveluri (lizibilitate)
// Preferi switch sau if-else pentru cazuri multiple

// Short-circuit evaluation
boolean valid = input != null && !input.isEmpty() && input.matches("\\d+");
// Dacă input == null, restul nu se evaluează
\`\`\`

• Switch expression este **mai sigur**: compilatorul verifică exhaustivitatea
• **yield** returnează valoarea dintr-un bloc; **->** returnează direct expresia
• Pattern matching switch cu **sealed** = nu e nevoie de default — compilatorul știe toate cazurile`);

await up('7. Condi', 'Enhanced for', `**Enhanced for și buclele clasice** oferă diferite moduri de iterare în Java — fiecare cu cazuri de utilizare specifice pentru performanță și expresivitate.

**Enhanced for (for-each)**

\`\`\`java
// Array
int[] nums = {1, 2, 3, 4, 5};
for (int n : nums) {
    System.out.print(n + " ");
}

// Collection
List<String> names = List.of("Ana", "Bob", "Carol");
for (String name : names) {
    System.out.println("Salut, " + name);
}

// Map — iterare pe entry-uri
Map<String, Integer> scores = Map.of("Ana", 95, "Bob", 87, "Carol", 92);
for (Map.Entry<String, Integer> entry : scores.entrySet()) {
    System.out.printf("%s: %d%n", entry.getKey(), entry.getValue());
}
// Sau modern cu forEach:
scores.forEach((name, score) -> System.out.printf("%s: %d%n", name, score));
\`\`\`

**Bucle clasice cu index**

\`\`\`java
// Când ai nevoie de index
String[] arr = {"a", "b", "c", "d"};
for (int i = 0; i < arr.length; i++) {
    System.out.printf("[%d] %s%n", i, arr[i]);
}

// Iterare inversă
for (int i = arr.length - 1; i >= 0; i--) {
    System.out.print(arr[i] + " ");
}

// Pasuri multiple
for (int i = 0; i < 100; i += 5) {
    System.out.print(i + " "); // 0 5 10 ... 95
}

// Modificare element în array (enhanced for nu merge pentru asta)
for (int i = 0; i < nums.length; i++) {
    nums[i] *= 2; // modifică array-ul original
}
\`\`\`

**while și do-while**

\`\`\`java
// while — condiție verificată la început (poate să nu se execute)
int n = 10;
while (n > 0) {
    System.out.print(n + " ");
    n -= 3;
} // 10 7 4 1

// do-while — se execută cel puțin o dată
int roll;
do {
    roll = (int)(Math.random() * 6) + 1;
    System.out.println("Dat: " + roll);
} while (roll != 6);
System.out.println("Ai obținut 6!");

// Buclă infinită cu break
while (true) {
    String input = scanner.nextLine();
    if (input.equalsIgnoreCase("exit")) break;
    processInput(input);
}
\`\`\`

**ListIterator pentru modificare în bucle**

\`\`\`java
List<Integer> list = new ArrayList<>(Arrays.asList(1, 2, 3, 4, 5));

// ConcurrentModificationException dacă modifici în for-each!
// GREȘIT: for (int x : list) { if (x % 2 == 0) list.remove((Integer) x); }

// CORECT cu Iterator
Iterator<Integer> it = list.iterator();
while (it.hasNext()) {
    if (it.next() % 2 == 0) it.remove(); // safe removal
}
// SAU modern cu removeIf:
list.removeIf(x -> x % 2 == 0);
\`\`\`

• **Enhanced for** nu permite modificarea colecției — folosește Iterator sau removeIf
• **for clasic** când ai nevoie de index, iterare inversă sau pași nestandard
• **removeIf** este cel mai curat mod de a șterge elemente dintr-o colecție în Java modern`);

await up('7. Condi', 'Labels', `**Labels pentru break/continue** permit ieșirea din bucle imbricate multiple — utilă în algoritmi cu căutare sau traversare a structurilor de date 2D.

**Problema fără labels**

\`\`\`java
// Fără label — break iese doar din bucla interioară
outer_search:
for (int i = 0; i < matrix.length; i++) {
    for (int j = 0; j < matrix[i].length; j++) {
        if (matrix[i][j] == target) {
            System.out.printf("Găsit la [%d][%d]%n", i, j);
            break outer_search; // iese din AMBELE bucle
        }
    }
}
\`\`\`

**Sintaxa label-urilor**

\`\`\`java
// Label definit înainte de buclă cu ":"
outerLoop:
for (int i = 0; i < 5; i++) {
    for (int j = 0; j < 5; j++) {
        if (j == 3) continue outerLoop; // sare la iterația i+1
        if (i == 3) break outerLoop;    // iese complet din outerLoop
        System.out.printf("(%d,%d) ", i, j);
    }
}
// (0,0)(0,1)(0,2)(1,0)(1,1)(1,2)(2,0)(2,1)(2,2)
\`\`\`

**Cazuri de utilizare reale**

\`\`\`java
// Căutare în matrice
int[][] grid = {{1,2,3},{4,5,6},{7,8,9}};
int target = 5;
int foundRow = -1, foundCol = -1;

search:
for (int row = 0; row < grid.length; row++) {
    for (int col = 0; col < grid[row].length; col++) {
        if (grid[row][col] == target) {
            foundRow = row;
            foundCol = col;
            break search;
        }
    }
}
System.out.println("Găsit: [" + foundRow + "][" + foundCol + "]");

// Validare cu continue label
processRecords:
for (Record rec : records) {
    for (String rule : validationRules) {
        if (!rule.validate(rec)) {
            System.out.println("Rec invalid: " + rec);
            continue processRecords; // sare la recordul următor
        }
    }
    processValid(rec);
}
\`\`\`

**Alternativă: extrage în metodă**

\`\`\`java
// Labels sunt rar folosite — codul poate fi mai clar cu metode separate
boolean found = false;
for (int i = 0; i < matrix.length && !found; i++) {
    for (int j = 0; j < matrix[i].length && !found; j++) {
        if (matrix[i][j] == target) found = true;
    }
}

// Sau cu Stream (cel mai clean):
OptionalInt pos = IntStream.range(0, matrix.length)
    .flatMap(i -> IntStream.range(0, matrix[i].length)
        .filter(j -> matrix[i][j] == target))
    .findFirst();
\`\`\`

• Labels funcționează cu **break** (ieșire) și **continue** (salt la iterația următoare) pe bucla etichetată
• Utilizare rară în Java modern — **extrage logica în metodă** este de obicei mai clară
• Nu există **goto** în Java — labels sunt singurul mecanism de salt explicit`);

  console.log('Done script 2.');
  await p.$disconnect();
}

run().catch(e => { console.error(e); p.$disconnect(); process.exit(1); });
