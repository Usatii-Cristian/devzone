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

await up('3. Collections', 'Java Collections', `**Java Collections Framework** este ierarhia de interfețe și clase care oferă structuri de date gata de utilizat — elimină necesitatea implementării manuale a listelor, mulțimilor și dicționarelor.

**Principalele interfețe**

\`\`\`java
// List — ordonat, permite duplicate
List<String> list = new ArrayList<>();   // array dinamic
List<String> linked = new LinkedList<>(); // nod dublu legat

list.add("Ana");
list.add("Bob");
list.add(0, "Zero");     // inserare la index
list.remove("Bob");
String s = list.get(1);  // acces prin index
Collections.sort(list);  // sortare

// Set — unic, fără ordine garantată
Set<Integer> set = new HashSet<>();      // O(1) lookup
Set<Integer> sorted = new TreeSet<>();   // ordonat natural

set.add(1); set.add(2); set.add(1); // duplicate ignorat
System.out.println(set.size()); // 2

// Map — perechi cheie-valoare
Map<String, Integer> map = new HashMap<>();
map.put("Ana", 30);
map.put("Bob", 25);
map.getOrDefault("Carol", 0);   // valoare implicită
map.putIfAbsent("Ana", 99);     // nu suprascrie
map.forEach((k, v) -> System.out.println(k + "=" + v));
\`\`\`

**ArrayList vs LinkedList**

\`\`\`java
// ArrayList — O(1) get, O(n) insert la mijloc
List<Integer> al = new ArrayList<>(100); // capacity inițial
al.add(1); al.get(0);                    // rapid

// LinkedList — O(1) insert la capete, O(n) get by index
Deque<Integer> deque = new LinkedList<>();
deque.addFirst(1); deque.addLast(2);
deque.pollFirst(); deque.peekLast();
\`\`\`

**Iterare și operații utile**

\`\`\`java
List<String> names = List.of("Ana", "Bob", "Carol"); // imuabil

// Iterator explicit
Iterator<String> it = names.iterator(); // necesar ListIterator pentru remove
// Prefer for-each sau stream

// Collections utility
List<Integer> nums = new ArrayList<>(Arrays.asList(3, 1, 4, 1, 5));
Collections.sort(nums);               // [1, 1, 3, 4, 5]
Collections.reverse(nums);
Collections.shuffle(nums);
int max = Collections.max(nums);
int freq = Collections.frequency(nums, 1); // 2
\`\`\`

**Queue și PriorityQueue**

\`\`\`java
Queue<String> q = new LinkedList<>();
q.offer("first"); q.offer("second");
String head = q.poll();  // scoate + returnează
String peek = q.peek();  // doar citește

// Min-heap
PriorityQueue<Integer> pq = new PriorityQueue<>();
pq.offer(5); pq.offer(1); pq.offer(3);
while (!pq.isEmpty()) System.out.print(pq.poll() + " "); // 1 3 5
\`\`\`

• **ArrayList** pentru acces random frecvent; **LinkedList** pentru inserări/ștergeri la capete
• **HashSet/HashMap** pentru lookup O(1); **TreeSet/TreeMap** pentru ordine naturală
• Folosește **List.of()**, **Map.of()** pentru colecții imuabile în cod de producție`);

await up('3. Collections', 'Streams API', `**Streams API** (Java 8+) permite procesarea declarativă a colecțiilor — transformare, filtrare și agregare fără bucle manuale, inspirat din programarea funcțională.

**Operații intermediare și terminale**

\`\`\`java
List<String> names = List.of("Ana", "Bob", "Carol", "Alex", "Bogdan");

// pipeline: sursă → intermediare (lazy) → terminal (eager)
List<String> result = names.stream()
    .filter(n -> n.startsWith("A"))      // intermediar — filtrare
    .map(String::toUpperCase)            // intermediar — transformare
    .sorted()                            // intermediar — sortare
    .collect(Collectors.toList());       // terminal — materializare
// [ALEX, ANA]

// findFirst + Optional
Optional<String> first = names.stream()
    .filter(n -> n.length() > 3)
    .findFirst(); // Optional["Carol"]
first.ifPresent(System.out::println);
\`\`\`

**Operații de agregare**

\`\`\`java
List<Integer> nums = List.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

long count = nums.stream().filter(n -> n % 2 == 0).count(); // 5
int sum    = nums.stream().mapToInt(Integer::intValue).sum(); // 55
double avg = nums.stream().mapToInt(Integer::intValue).average().orElse(0); // 5.5
int max    = nums.stream().mapToInt(Integer::intValue).max().orElse(0); // 10

// reduce — acumulare manuală
int product = nums.stream().reduce(1, (a, b) -> a * b); // 3628800
\`\`\`

**Collectors avansați**

\`\`\`java
record Person(String name, String dept, int salary) {}
List<Person> people = List.of(
    new Person("Ana", "IT", 5000),
    new Person("Bob", "HR", 3000),
    new Person("Carol", "IT", 6000)
);

// Grupare
Map<String, List<Person>> byDept = people.stream()
    .collect(Collectors.groupingBy(Person::dept));

// Statistici per grup
Map<String, Double> avgSalary = people.stream()
    .collect(Collectors.groupingBy(Person::dept,
        Collectors.averagingInt(Person::salary)));
// {IT=5500.0, HR=3000.0}

// Joining
String names2 = people.stream()
    .map(Person::name)
    .collect(Collectors.joining(", ", "[", "]")); // [Ana, Bob, Carol]
\`\`\`

**flatMap — aplatizare colecții**

\`\`\`java
List<List<Integer>> nested = List.of(List.of(1,2), List.of(3,4), List.of(5));
List<Integer> flat = nested.stream()
    .flatMap(Collection::stream)
    .collect(Collectors.toList()); // [1, 2, 3, 4, 5]
\`\`\`

• Stream-urile sunt **lazy** — operațiile intermediare nu se execută până la operația terminală
• **IntStream, LongStream, DoubleStream** evită boxing/unboxing pentru tipuri primitive
• Nu reutiliza un stream — după operația terminală este "consumat" (aruncă IllegalStateException)`);

await up('3. Collections', 'Streams cu obiecte', `**Streams cu obiecte complexe** demonstrează puterea Streams API în scenarii reale — procesare de entități, transformări DTO, filtrare și agregare pe date structurate.

**Transformare și proiecție**

\`\`\`java
record Product(String name, String category, double price, int stock) {}

List<Product> products = List.of(
    new Product("Laptop", "Electronics", 3500.0, 10),
    new Product("Phone", "Electronics", 1200.0, 25),
    new Product("Desk", "Furniture", 800.0, 5),
    new Product("Chair", "Furniture", 450.0, 12),
    new Product("Keyboard", "Electronics", 200.0, 50)
);

// Produse electronice sortate după preț descrescător
List<String> expensiveElectronics = products.stream()
    .filter(p -> p.category().equals("Electronics"))
    .filter(p -> p.price() > 500)
    .sorted(Comparator.comparingDouble(Product::price).reversed())
    .map(p -> p.name() + " (" + p.price() + " RON)")
    .collect(Collectors.toList());
// [Laptop (3500.0 RON), Phone (1200.0 RON)]
\`\`\`

**Statistici și agregări**

\`\`\`java
// Valoarea totală a stocului per categorie
Map<String, Double> stockValue = products.stream()
    .collect(Collectors.groupingBy(
        Product::category,
        Collectors.summingDouble(p -> p.price() * p.stock())
    ));
// {Electronics=105000.0, Furniture=9400.0}

// Produsul cel mai scump din fiecare categorie
Map<String, Optional<Product>> mostExpensive = products.stream()
    .collect(Collectors.groupingBy(
        Product::category,
        Collectors.maxBy(Comparator.comparingDouble(Product::price))
    ));
\`\`\`

**Partitionare și statistici**

\`\`\`java
// Partitionare: în stoc vs out-of-stock
Map<Boolean, List<Product>> inStock = products.stream()
    .collect(Collectors.partitioningBy(p -> p.stock() > 0));

// DoubleSummaryStatistics
DoubleSummaryStatistics priceStats = products.stream()
    .mapToDouble(Product::price)
    .summaryStatistics();
System.out.println("Min: " + priceStats.getMin());
System.out.println("Max: " + priceStats.getMax());
System.out.println("Avg: " + priceStats.getAverage());
System.out.println("Sum: " + priceStats.getSum());
\`\`\`

**Comparatori compuși**

\`\`\`java
// Sortare compusă: după categorie, apoi preț descrescător
List<Product> sorted = products.stream()
    .sorted(Comparator.comparing(Product::category)
        .thenComparing(Comparator.comparingDouble(Product::price).reversed()))
    .collect(Collectors.toList());

// distinct + limit + skip (paginare în memorie)
List<String> categories = products.stream()
    .map(Product::category)
    .distinct()
    .sorted()
    .collect(Collectors.toList()); // [Electronics, Furniture]
\`\`\`

• Combină **filter + map + collect** pentru transformări clare și testabile
• **Collectors.toMap()** pentru conversie list → map: \`stream().collect(Collectors.toMap(Product::name, Product::price))\`
• Preferi **toUnmodifiableList()** față de toList() dacă vrei colecție read-only garantată`);

await up('4. Exception Handling', 'try / catch / finally', `**Tratarea excepțiilor în Java** prin try/catch/finally este mecanismul central de gestionare a erorilor — separă codul "fericit" de cazurile excepționale și garantează eliberarea resurselor.

**Structura de bază**

\`\`\`java
public int divide(int a, int b) {
    try {
        return a / b;
    } catch (ArithmeticException e) {
        System.err.println("Eroare: " + e.getMessage()); // / by zero
        return 0;
    } finally {
        System.out.println("Finally se execută întotdeauna");
        // util pentru logging, cleanup
    }
}

// Multi-catch (Java 7+)
public void parseAndConnect(String json, String url) {
    try {
        var obj = new JSONParser().parse(json);
        var conn = new URL(url).openConnection();
    } catch (ParseException | IOException e) {
        // tratezi ambele excepții identic
        log.error("Operație eșuată: {}", e.getMessage(), e);
        throw new RuntimeException("Config invalidă", e);
    }
}
\`\`\`

**Try-with-resources — gestionarea automată a resurselor**

\`\`\`java
// Fără try-with-resources — riscant: close() poate fi omis la excepție
FileInputStream fis = null;
try {
    fis = new FileInputStream("data.txt");
    // ...
} finally {
    if (fis != null) fis.close(); // Nu uita!
}

// CU try-with-resources (Java 7+) — Closeable se apelează automat
try (var fis = new FileInputStream("data.txt");
     var bis = new BufferedInputStream(fis)) {
    byte[] buffer = new byte[1024];
    int read;
    while ((read = bis.read(buffer)) != -1) {
        // procesare
    }
} catch (IOException e) {
    log.error("Citire eșuată", e);
}
// bis.close() și fis.close() apelate automat în ordine inversă
\`\`\`

**Stiva de excepții și cauza**

\`\`\`java
public User findUser(int id) {
    try {
        return userRepo.findById(id);
    } catch (SQLException e) {
        // Wrap exception — păstrează cauza originală
        throw new UserNotFoundException("User " + id + " negăsit", e);
    }
}

// PrintStackTrace complet
try {
    riskyOperation();
} catch (Exception e) {
    e.printStackTrace();          // la consolă — evită în producție
    log.error("Detalii:", e);     // la logger — corect
    log.error(e.getMessage(), e); // mesaj + stack trace
}
\`\`\`

**Rethrow și propagare**

\`\`\`java
// Re-throw fără wrapping
try {
    parseConfig();
} catch (IOException e) {
    log.warn("Config lipsă, folosesc default");
    throw e; // re-aruncă aceeași excepție
}

// Excepție suprimată (suppress) în try-with-resources
// Dacă apare excepție și în close() — cea din body e primară
// Cea din close() e "suppressed" și accesibilă via getSuppressed()
\`\`\`

• **finally** se execută mereu — chiar dacă catch re-aruncă excepția; excepție: System.exit()
• Loghează mereu excepția (nu doar mesajul) pentru a păstra stack trace-ul
• **try-with-resources** pentru orice Closeable: stream-uri, conexiuni, readers`);

await up('4. Exception Handling', 'Checked vs Unchecked exceptions', `**Checked vs Unchecked Exceptions** — distincția fundamentală din Java care determină ce erori trebuie declarate explicit și ce erori reflectă bug-uri de programare.

**Ierarhia excepțiilor**

\`\`\`
Throwable
├── Error (nu prinde — OutOfMemoryError, StackOverflowError)
└── Exception
    ├── RuntimeException (UNCHECKED — nu trebuie declarate)
    │   ├── NullPointerException
    │   ├── IllegalArgumentException
    │   ├── IndexOutOfBoundsException
    │   ├── ClassCastException
    │   └── ArithmeticException
    └── IOException (CHECKED — trebuie declarate sau prinse)
        ├── FileNotFoundException
        └── ParseException, SQLException...
\`\`\`

**Checked — erori de mediu (recovery posibil)**

\`\`\`java
// Checked: compilatorul forțează tratarea
public String readFile(String path) throws IOException {
    return Files.readString(Path.of(path)); // IOException = checked
}

// SAU prinzi local
public String readFileOrDefault(String path, String def) {
    try {
        return Files.readString(Path.of(path));
    } catch (IOException e) {
        log.warn("Fișier lipsă {}, folosesc default", path);
        return def;
    }
}
\`\`\`

**Unchecked — bug-uri de programare (nu recovery)**

\`\`\`java
// Unchecked: nu trebuie declarate, dar pot fi prinse
public int getElement(List<Integer> list, int idx) {
    // Nu prinde IndexOutOfBoundsException — corectează codul
    if (idx < 0 || idx >= list.size())
        throw new IllegalArgumentException("Index invalid: " + idx);
    return list.get(idx);
}

// NullPointerException — cel mai comun unchecked
String s = null;
// s.length(); // NPE — prevenție cu Optional sau Objects.requireNonNull
Objects.requireNonNull(s, "String nu poate fi null");
String result = Optional.ofNullable(s).map(String::toUpperCase).orElse("N/A");
\`\`\`

**Reguli practice**

\`\`\`java
// Regula 1: Checked dacă clientul POATE face recovery (file lipsă, rețea jos)
// Regula 2: Unchecked dacă e bug de programare (index negativ, null neașteptat)

// Anti-pattern: prinde și ignoră
try {
    riskyOp();
} catch (Exception e) { } // GREȘIT — ascunde erori

// Corect: prinde și loghează sau re-aruncă
try {
    riskyOp();
} catch (Exception e) {
    log.error("Operație eșuată", e);
    throw new ServiceException("Serviciu indisponibil", e);
}

// Verificare preconditions cu Unchecked
public void setAge(int age) {
    if (age < 0 || age > 150)
        throw new IllegalArgumentException("Vârstă invalidă: " + age);
    this.age = age;
}
\`\`\`

• **Checked** = IOException, SQLException, ParseException — compilatorul forțează tratarea
• **Unchecked** = RuntimeException și subclase — indică erori de logică în cod
• Nu declara throws Exception (prea generic) — declară tipul specific
• Wrapping: transformi checked în unchecked cu \`throw new RuntimeException("msg", cause)\``);

await up('4. Exception Handling', 'Custom exceptions', `**Excepții custom și throws** permit crearea unui model de erori semantic specific domeniului aplicației — mai clar decât excepțiile generice din JDK.

**Crearea excepțiilor custom**

\`\`\`java
// Unchecked — extinde RuntimeException
public class UserNotFoundException extends RuntimeException {
    private final int userId;

    public UserNotFoundException(int userId) {
        super("Utilizatorul cu ID " + userId + " nu există");
        this.userId = userId;
    }

    public UserNotFoundException(int userId, Throwable cause) {
        super("Utilizatorul cu ID " + userId + " nu există", cause);
        this.userId = userId;
    }

    public int getUserId() { return userId; }
}

// Checked — extinde Exception (clientul trebuie să trateze)
public class InsufficientFundsException extends Exception {
    private final double amount;
    private final double balance;

    public InsufficientFundsException(double amount, double balance) {
        super(String.format("Fonduri insuficiente: solicitat %.2f, disponibil %.2f", amount, balance));
        this.amount = amount;
        this.balance = balance;
    }

    public double getAmount() { return amount; }
    public double getBalance() { return balance; }
}
\`\`\`

**Utilizare în service layer**

\`\`\`java
public class BankService {

    public User getUser(int id) {
        return userRepo.findById(id)
            .orElseThrow(() -> new UserNotFoundException(id));
    }

    public void transfer(int fromId, int toId, double amount)
            throws InsufficientFundsException {
        var from = getUser(fromId);  // aruncă UserNotFoundException (unchecked)
        var to = getUser(toId);

        if (from.getBalance() < amount)
            throw new InsufficientFundsException(amount, from.getBalance()); // checked

        from.debit(amount);
        to.credit(amount);
        userRepo.saveAll(List.of(from, to));
    }
}
\`\`\`

**Ierarhie de excepții pentru aplicație**

\`\`\`java
// Excepție bază pentru întreaga aplicație
public class AppException extends RuntimeException {
    private final String errorCode;

    public AppException(String errorCode, String message) {
        super(message);
        this.errorCode = errorCode;
    }
    public String getErrorCode() { return errorCode; }
}

// Excepții specifice
public class ValidationException extends AppException {
    private final Map<String, String> fieldErrors;

    public ValidationException(Map<String, String> errors) {
        super("VALIDATION_FAILED", "Date de intrare invalide");
        this.fieldErrors = errors;
    }
    public Map<String, String> getFieldErrors() { return fieldErrors; }
}

// Global handler în Spring
@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(UserNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ErrorResponse handleNotFound(UserNotFoundException e) {
        return new ErrorResponse(e.getMessage(), 404);
    }
}
\`\`\`

• Extinde **RuntimeException** pentru excepții de domeniu (cele mai comune în aplicații moderne)
• Adaugă câmpuri suplimentare cu context util (userId, amount, fieldErrors)
• Crează o ierarhie: **AppException** → **NotFoundException**, **ValidationException**, **ConflictException**
• Loghează cauza originală la wrapping pentru a nu pierde stack trace-ul`);

await up('5. Modern Java', 'Lambda expressions', `**Lambda expressions și functional interfaces** sunt piatra de temelie a programării funcționale în Java 8+ — permit transmiterea comportamentului ca parametru, eliminând boilerplate-ul claselor anonime.

**Sintaxa lambda**

\`\`\`java
// Clasa anonimă (înainte de Java 8)
Runnable r1 = new Runnable() {
    @Override
    public void run() { System.out.println("Hello"); }
};

// Lambda echivalent
Runnable r2 = () -> System.out.println("Hello");

// Cu un parametru (fără parantezeobligatorii pentru un singur param)
Consumer<String> print = s -> System.out.println(s);

// Cu mai mulți parametri
Comparator<String> byLength = (a, b) -> a.length() - b.length();

// Corp cu mai multe instrucțiuni
Function<String, String> process = input -> {
    String trimmed = input.trim();
    return trimmed.toUpperCase();
};
\`\`\`

**Functional Interfaces din java.util.function**

\`\`\`java
// Function<T, R> — primește T, returnează R
Function<String, Integer> strLen = String::length; // method reference
Function<Integer, Integer> doubleIt = x -> x * 2;
Function<String, Integer> composed = strLen.andThen(doubleIt); // compunere

// Predicate<T> — testează condiție
Predicate<String> notEmpty = s -> !s.isEmpty();
Predicate<String> longEnough = s -> s.length() >= 3;
Predicate<String> valid = notEmpty.and(longEnough); // AND logic
Predicate<String> either = notEmpty.or(longEnough); // OR logic

// Consumer<T> — consumă fără return
Consumer<String> logger = msg -> System.out.println("[LOG] " + msg);
Consumer<String> saver = msg -> db.save(msg);
Consumer<String> both = logger.andThen(saver); // chain

// Supplier<T> — furnizează fără input
Supplier<List<String>> listFactory = ArrayList::new;

// BiFunction<T, U, R>
BiFunction<String, Integer, String> repeat = (s, n) -> s.repeat(n);
\`\`\`

**Method References**

\`\`\`java
// 4 tipuri de method references
List<String> names = List.of("Ana", "Bob", "carol");

// 1. Static method
names.stream().map(String::valueOf);         // String.valueOf(x)

// 2. Instance method pe obiect specific
String prefix = "Hello ";
names.stream().map(prefix::concat);          // prefix.concat(x)

// 3. Instance method pe tipul clasei (parametrul devine receiver)
names.stream().map(String::toUpperCase);     // x.toUpperCase()

// 4. Constructor
names.stream().map(StringBuilder::new);      // new StringBuilder(x)
\`\`\`

**Closure și variabile efective finale**

\`\`\`java
// Variabilele capturate trebuie să fie "effectively final"
int threshold = 5; // efectiv final — nu se modifică după declarare
List<Integer> filtered = nums.stream()
    .filter(n -> n > threshold) // OK
    .collect(Collectors.toList());

// GREȘIT — nu poți modifica variabile locale în lambda
int count = 0;
// nums.forEach(n -> count++); // compilation error
// Soluție: AtomicInteger sau reduce()
AtomicInteger cnt = new AtomicInteger();
nums.forEach(n -> cnt.incrementAndGet());
\`\`\`

• **@FunctionalInterface** marchează interfețe cu exact o metodă abstractă — permite lambda
• **Function.compose()** = g(f(x)); **Function.andThen()** = f(g(x))
• Preferi **method references** față de lambda simple — mai lizibil: \`String::toUpperCase\` vs \`s -> s.toUpperCase()\``);

await up('5. Modern Java', 'Records', `**Records și Sealed Classes** (Java 16+ și 17+) sunt două adăugiri majore care reduc boilerplate-ul și fac modelarea domeniului mai expresivă și mai sigură.

**Records — clase de date imuabile**

\`\`\`java
// Record: constructor, getteri, equals, hashCode, toString automat
record Point(int x, int y) {}

// Echivalent manual (aprox. 30 linii de boilerplate eliminat):
// - constructor Point(int x, int y)
// - int x() și int y() (nu getX — ci x())
// - equals() bazat pe câmpuri
// - hashCode() bazat pe câmpuri
// - toString() → "Point[x=3, y=4]"

Point p = new Point(3, 4);
System.out.println(p.x()); // 3
System.out.println(p);     // Point[x=3, y=4]
\`\`\`

**Record cu validare (compact constructor)**

\`\`\`java
record Range(int min, int max) {
    // Compact constructor — fără parametri, fără assignment (automat)
    Range {
        if (min > max)
            throw new IllegalArgumentException("min > max: " + min + " > " + max);
    }
}

record Email(String address) {
    Email {
        Objects.requireNonNull(address, "Email nu poate fi null");
        if (!address.contains("@"))
            throw new IllegalArgumentException("Email invalid: " + address);
        address = address.toLowerCase().trim(); // normalizare
    }
}
\`\`\`

**Record cu metode și implementare interfețe**

\`\`\`java
interface Printable { void print(); }

record Person(String name, int age) implements Printable, Comparable<Person> {
    // Metode statice și instanță permise
    public static Person ofAge(String name, int age) {
        if (age < 0) throw new IllegalArgumentException();
        return new Person(name, age);
    }

    public Person withName(String newName) {
        return new Person(newName, this.age); // "wither" — returnează copie
    }

    @Override
    public void print() {
        System.out.println(name + " (" + age + ")");
    }

    @Override
    public int compareTo(Person other) {
        return Integer.compare(this.age, other.age);
    }
}
\`\`\`

**Sealed Classes — ierarhii închise**

\`\`\`java
// Sealed class — numai clasele permise pot extinde
sealed interface Shape permits Circle, Rectangle, Triangle {}

record Circle(double radius) implements Shape {
    public double area() { return Math.PI * radius * radius; }
}

record Rectangle(double w, double h) implements Shape {
    public double area() { return w * h; }
}

final class Triangle implements Shape {
    private final double base, height;
    Triangle(double b, double h) { base = b; height = h; }
    public double area() { return 0.5 * base * height; }
}

// Pattern matching cu switch (Java 21)
double area = switch (shape) {
    case Circle c    -> Math.PI * c.radius() * c.radius();
    case Rectangle r -> r.w() * r.h();
    case Triangle t  -> t.area();
    // Nu e nevoie de default — compilatorul știe că ierarhia e completă!
};
\`\`\`

• **Records** sunt imuabile — câmpurile sunt finale, nu poți modifica starea
• **Sealed** = compilatorul poate verifica exhaustivitatea în switch — fără default obligatoriu
• Folosește records pentru **DTO, Value Objects, tuples** — elimini boilerplate-ul rapid`);

await up('5. Modern Java', 'Switch expressions', `**Switch expressions, pattern matching și var** (Java 14-21) modernizează sintaxa Java — cod mai concis, mai sigur la compilare și mai expresiv.

**Switch expression (Java 14+)**

\`\`\`java
// Switch clasic (statement) — verbose, prone to fall-through
int day = 3;
String name;
switch (day) {
    case 1: name = "Luni"; break;
    case 2: name = "Marți"; break;
    default: name = "Alta"; break;
}

// Switch expression (Java 14+) — returnează valoare, no fall-through
String dayName = switch (day) {
    case 1 -> "Luni";
    case 2 -> "Marți";
    case 3 -> "Miercuri";
    case 6, 7 -> "Weekend";
    default -> "Altă zi";
};

// Cu yield pentru blocuri complexe
int result = switch (operation) {
    case "add" -> a + b;
    case "multiply" -> {
        int temp = a * b;
        System.out.println("Multiplicare: " + temp);
        yield temp; // yield în loc de return pentru switch
    }
    default -> throw new IllegalArgumentException("Operație necunoscută: " + operation);
};
\`\`\`

**Pattern Matching pentru instanceof (Java 16+)**

\`\`\`java
// Înainte de Java 16 — cast manual
Object obj = "Hello World";
if (obj instanceof String) {
    String s = (String) obj; // cast redundant
    System.out.println(s.length());
}

// Cu pattern matching — bind variable în test
if (obj instanceof String s) {
    System.out.println(s.length()); // s e String garantat
}

// Pattern matching cu switch (Java 21)
Object value = 42;
String description = switch (value) {
    case Integer i when i > 0 -> "Pozitiv: " + i;
    case Integer i             -> "Non-pozitiv: " + i;
    case String s              -> "String: " + s;
    case null                  -> "null";
    default                    -> "Alt tip: " + value;
};
\`\`\`

**var — inferența tipului local (Java 10+)**

\`\`\`java
// var — compilatorul deduce tipul; nu e dynamic typing!
var list = new ArrayList<String>(); // ArrayList<String>
var map = new HashMap<String, List<Integer>>(); // HashMap<String, List<Integer>>
var text = "Hello";   // String
var count = 42;       // int

// Util în bucle
for (var entry : map.entrySet()) {
    var key = entry.getKey();     // String
    var values = entry.getValue(); // List<Integer>
}

// try-with-resources
try (var conn = DriverManager.getConnection(url);
     var stmt = conn.createStatement()) {
    var rs = stmt.executeQuery("SELECT * FROM users");
}
\`\`\`

**Text Blocks (Java 15+)**

\`\`\`java
// Multi-line strings fără escape-uri
String json = """
        {
            "name": "Ana",
            "age": 30,
            "roles": ["admin", "user"]
        }
        """;

String sql = """
        SELECT u.name, COUNT(o.id) as orders
        FROM users u
        LEFT JOIN orders o ON o.user_id = u.id
        GROUP BY u.name
        """;
\`\`\`

• **Switch expression** elimină fall-through și returnează valori direct — preferă față de switch statement
• **var** nu reduce type safety — tipul e inferred la compilare, nu runtime
• **Pattern matching instanceof** elimină cast-urile redundante și face codul mai sigur`);

  console.log('Done script 1.');
  await p.$disconnect();
}

run().catch(e => { console.error(e); p.$disconnect(); process.exit(1); });
