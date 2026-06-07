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

await up('Functional Programming', 'Lambda Expressions', `**Lambda Expressions în contextul Functional Programming** reprezintă tratarea funcțiilor ca valori de primă clasă — stocate în variabile, transmise ca parametri și returnate din metode.

**Functional Interfaces standard**

\`\`\`java
import java.util.function.*;

// Function<T, R> — transformare T → R
Function<String, Integer> length = String::length;
Function<Integer, Boolean> isEven = n -> n % 2 == 0;
Function<String, Boolean> isLongEven = length.andThen(isEven); // compunere

// Predicate<T> — testare condiție, returnează boolean
Predicate<String> notEmpty = Predicate.not(String::isEmpty);
Predicate<Integer> isPositive = n -> n > 0;
Predicate<Integer> isSmall = n -> n < 10;
Predicate<Integer> isSmallPositive = isPositive.and(isSmall);

// Consumer<T> — consumă valoare, void return
Consumer<String> print = System.out::println;
Consumer<String> log = s -> logger.info(s);
Consumer<String> printAndLog = print.andThen(log); // chain

// Supplier<T> — produce valoare, fără input
Supplier<List<String>> newList = ArrayList::new;
Supplier<UUID> newId = UUID::randomUUID;

// UnaryOperator<T> — Function<T,T>
UnaryOperator<String> trim = String::trim;
UnaryOperator<Integer> doubleIt = x -> x * 2;
\`\`\`

**Funcții de ordin superior**

\`\`\`java
// Metodă care primește și returnează funcții
public static <T, R> Function<List<T>, List<R>> listMapper(Function<T, R> fn) {
    return list -> list.stream().map(fn).collect(Collectors.toList());
}

Function<List<String>, List<Integer>> nameLengths = listMapper(String::length);
List<Integer> lengths = nameLengths.apply(List.of("Ana", "Bob", "Carol")); // [3, 3, 5]

// Currying — funcție cu N argumente → N funcții cu 1 argument
Function<Integer, Function<Integer, Integer>> add = a -> b -> a + b;
Function<Integer, Integer> add5 = add.apply(5);
int result = add5.apply(3); // 8

// Partial application
Function<String, String> addPrefix(String prefix) {
    return s -> prefix + s;
}
Function<String, String> addHello = addPrefix("Hello, ");
addHello.apply("Ana"); // "Hello, Ana"
\`\`\`

**Comparatori funcționali**

\`\`\`java
List<Person> people = List.of(
    new Person("Ana", 30, "IT"),
    new Person("Bob", 25, "HR"),
    new Person("Carol", 30, "IT")
);

// Comparator ca lambda
people.sort((a, b) -> a.age() - b.age());

// Comparator fluent (mai lizibil)
people.sort(Comparator
    .comparing(Person::dept)
    .thenComparingInt(Person::age)
    .thenComparing(Person::name));

// Reversed
Comparator<Person> byAge = Comparator.comparingInt(Person::age);
people.sort(byAge.reversed());

// Max/min cu Comparator
Optional<Person> youngest = people.stream()
    .min(Comparator.comparingInt(Person::age));
\`\`\`

**Lazy evaluation**

\`\`\`java
// Supplier pentru lazy initialization
private Supplier<Connection> lazyConn = () -> {
    System.out.println("Conectare la BD...");
    return DriverManager.getConnection(url);
};

public Connection getConnection() {
    if (conn == null) conn = lazyConn.get(); // creat la primul apel
    return conn;
}

// Condiție cu lazy evaluation
public String getValueOrDefault(String key, Supplier<String> defaultSupplier) {
    String value = cache.get(key);
    return value != null ? value : defaultSupplier.get(); // default calculat doar dacă necesar
}
\`\`\`

• **Method references** sunt lambda-uri scurte: Type::method sau instance::method
• **Compose vs andThen**: f.compose(g) = f(g(x)); f.andThen(g) = g(f(x))
• Funcțiile sunt imutable — creezi funcții noi din compunere, nu modifici cele existente`);

await up('Functional Programming', 'Stream API', `**Stream API** este paradigma de procesare declarativă a datelor în Java — pipeline-uri componabile de operații pe secvențe de elemente, optimizate automat de JVM.

**Pipeline complet**

\`\`\`java
// Sursă → operații intermediare (lazy) → operație terminală (eager)
List<Integer> result = IntStream.rangeClosed(1, 100)
    .filter(n -> n % 2 == 0)              // lazy: numere pare
    .map(n -> n * n)                       // lazy: la pătrat
    .filter(n -> n > 1000)                 // lazy: > 1000
    .boxed()                               // IntStream → Stream<Integer>
    .limit(5)                              // lazy: primele 5
    .collect(Collectors.toList());         // EAGER: execuție
// [1024, 1156, 1296, 1444, 1600]
\`\`\`

**Operații de creare**

\`\`\`java
// Din colecție
Stream<String> s1 = list.stream();
Stream<String> s2 = list.parallelStream(); // parallel

// Literale
Stream<String> s3 = Stream.of("Ana", "Bob", "Carol");
Stream<String> empty = Stream.empty();

// Generate și iterate
Stream.generate(Math::random).limit(5); // 5 numere random
Stream.iterate(1, n -> n * 2).limit(10); // 1, 2, 4, 8, 16...
Stream.iterate(0, n -> n < 100, n -> n + 3); // 0, 3, 6, ..., 99 (Java 9+)

// Primitive streams
IntStream.range(0, 10);         // 0-9
IntStream.rangeClosed(1, 10);   // 1-10
LongStream.rangeClosed(1, 1_000_000L).sum();
\`\`\`

**Collectors avansați**

\`\`\`java
record Employee(String name, String dept, int salary) {}
List<Employee> employees = List.of(
    new Employee("Ana", "IT", 5000),
    new Employee("Bob", "HR", 3000),
    new Employee("Carol", "IT", 6000),
    new Employee("David", "HR", 3500)
);

// Grouping cu downstream collector
Map<String, Double> avgSalaryByDept = employees.stream()
    .collect(Collectors.groupingBy(Employee::dept,
        Collectors.averagingInt(Employee::salary)));
// {IT=5500.0, HR=3250.0}

// Counting per grup
Map<String, Long> countByDept = employees.stream()
    .collect(Collectors.groupingBy(Employee::dept, Collectors.counting()));

// toMap cu merge function (evită duplicate keys)
Map<String, Integer> nameSalary = employees.stream()
    .collect(Collectors.toMap(Employee::name, Employee::salary,
        (old, newVal) -> newVal)); // în caz de duplicate

// Partitionare
Map<Boolean, List<Employee>> seniorJunior = employees.stream()
    .collect(Collectors.partitioningBy(e -> e.salary() >= 5000));

// Nested grouping
Map<String, Map<Boolean, Long>> grouped = employees.stream()
    .collect(Collectors.groupingBy(Employee::dept,
        Collectors.partitioningBy(e -> e.salary() > 4000, Collectors.counting())));
\`\`\`

**flatMap și operații pe nested collections**

\`\`\`java
// flatMap — aplatizează Stream<Stream<T>> → Stream<T>
List<List<Integer>> nested = List.of(List.of(1,2,3), List.of(4,5), List.of(6));
List<Integer> flat = nested.stream()
    .flatMap(Collection::stream)
    .collect(Collectors.toList()); // [1,2,3,4,5,6]

// Extrage toate skill-urile unice din toți angajații
Set<String> allSkills = employees.stream()
    .flatMap(e -> e.skills().stream())
    .collect(Collectors.toSet());
\`\`\`

• **Lazy evaluation** înseamnă că operațiile intermediare nu se execută fără o operație terminală
• **Parallel streams** sunt eficiente numai pentru operații CPU-intensive pe colecții mari (>10K elemente)
• Nu modifica sursa în timpul procesării stream — ConcurrentModificationException`);

await up('Functional Programming', 'Optional', `**Optional<T>** este containerul pentru valori care pot lipsi — alternativa elegantă la null, care forțează tratarea explicită a absenței valorii la nivel de API.

**Creare Optional**

\`\`\`java
// Creare
Optional<String> present = Optional.of("Ana");      // non-null garantat
Optional<String> empty = Optional.empty();          // gol
Optional<String> maybe = Optional.ofNullable(getValue()); // poate fi null

// NU face: Optional.of(null) — aruncă NPE
// FA: Optional.ofNullable(possiblyNull)

// Verificare
boolean has = present.isPresent();  // true
boolean miss = empty.isEmpty();     // true (Java 11+)
\`\`\`

**Extragerea valorii**

\`\`\`java
String val1 = present.get(); // "Ana" — ATENȚIE: aruncă NoSuchElementException dacă gol!

// Prefer alternative sigure:
String val2 = present.orElse("Anonim");              // valoare implicită
String val3 = empty.orElseGet(() -> generateName()); // lazy — calculat doar dacă gol
String val4 = present.orElseThrow();                 // aruncă NoSuchElementException (Java 10+)
String val5 = empty.orElseThrow(() ->
    new UserNotFoundException("User lipsă"));        // excepție custom

// Verificare înainte de get
if (present.isPresent()) {
    process(present.get()); // sigur
}
// SAU mai elegant:
present.ifPresent(this::process);
present.ifPresentOrElse(this::process, () -> log.warn("User absent")); // Java 9+
\`\`\`

**Transformare — map și flatMap**

\`\`\`java
// map — transformă valoarea dacă prezentă
Optional<Integer> length = Optional.ofNullable(getName())
    .map(String::trim)
    .map(String::length); // Optional<Integer>

// flatMap — pentru metode care returnează Optional
Optional<String> city = findUser(1)        // Optional<User>
    .flatMap(u -> findAddress(u.id()))     // Optional<Address>
    .map(Address::city);                   // Optional<String>

// filter — filtrare valoare
Optional<String> longName = Optional.ofNullable(name)
    .filter(s -> s.length() > 3); // gol dacă lungimea <= 3

// or — alternativă Optional (Java 9+)
Optional<User> user = findInCache(id)
    .or(() -> findInDB(id))    // alt Optional dacă primul e gol
    .or(() -> findInRemote(id));
\`\`\`

**Pattern-uri bune**

\`\`\`java
// BINE — Optional ca return type
public Optional<User> findByEmail(String email) {
    return userRepo.findByEmail(email);
}

// BINE — procesare fluent fără null check-uri
String username = findByEmail(email)
    .filter(User::isActive)
    .map(User::getUsername)
    .orElse("guest");

// EVITA — Optional ca parametru (confuzant)
// public void doSomething(Optional<String> name) — folosește String cu @Nullable

// EVITA — Optional în câmpuri de clasă (serializare, overhead)
// private Optional<String> middleName; — folosește @Nullable String middleName

// EVITA — Optional.get() fără isPresent
// String s = optional.get(); — posibil NoSuchElementException
\`\`\`

• **Optional forțează** gestionarea absenței — nu poți "uita" să verifici null
• **Nu pune Optional în câmpuri** — costul de memorie și serializare nu justifică beneficiul
• **orElseThrow() fără argumente** (Java 10+) aruncă NoSuchElementException cu mesaj clar`);

await up('Exception Handling Advanced', 'Checked vs Unchecked', `**Checked vs Unchecked Exceptions în context avansat** — strategii pentru ierarhii robuste, tratarea excepțiilor în streams/lambdas și pattern-uri moderne de error handling.

**Recapitulare ierarhie și decizie**

\`\`\`java
// Checked — forțat de compilator să tratezi (IOException, SQLException)
// Unchecked — RuntimeException — bug sau eroare de programare

// Regula modernă: preferi UNCHECKED în aplicații enterprise
// Motivul: Checked îngreunează Stream API, lambdas, și codul funcțional

// Wrapped RuntimeException
public List<String> readLines(String path) {
    try {
        return Files.readAllLines(Path.of(path));
    } catch (IOException e) {
        throw new UncheckedIOException(e); // wrapping standard (Java 8+)
    }
}

// Spring Boot și frameworks moderne: aproape exclusiv RuntimeException
\`\`\`

**Excepții în Stream și Lambda**

\`\`\`java
// PROBLEMĂ: lambda nu poate arunca checked exceptions
// List<String> lines = paths.stream().map(Files::readAllLines); // nu compilează!

// SOLUȚIE 1: wrapper helper
@FunctionalInterface
interface ThrowingFunction<T, R> {
    R apply(T t) throws Exception;

    static <T, R> Function<T, R> wrap(ThrowingFunction<T, R> fn) {
        return t -> {
            try { return fn.apply(t); }
            catch (Exception e) { throw new RuntimeException(e); }
        };
    }
}

List<List<String>> allLines = paths.stream()
    .map(ThrowingFunction.wrap(Files::readAllLines))
    .collect(Collectors.toList());

// SOLUȚIE 2: Try monad (Vavr library sau manual)
\`\`\`

**Ierarhie practică pentru aplicații**

\`\`\`java
// Base exception pentru domeniu
public abstract class DomainException extends RuntimeException {
    private final String code;
    private final int httpStatus;

    protected DomainException(String code, String message, int httpStatus) {
        super(message);
        this.code = code;
        this.httpStatus = httpStatus;
    }
}

public class NotFoundException extends DomainException {
    public NotFoundException(String resource, Object id) {
        super("NOT_FOUND", resource + " with id " + id + " not found", 404);
    }
}

public class ConflictException extends DomainException {
    public ConflictException(String message) {
        super("CONFLICT", message, 409);
    }
}

public class ValidationException extends DomainException {
    private final Map<String, String> fieldErrors;

    public ValidationException(Map<String, String> errors) {
        super("VALIDATION_ERROR", "Validation failed", 422);
        this.fieldErrors = Map.copyOf(errors);
    }
}
\`\`\`

**Multi-catch și rethrow**

\`\`\`java
// Multi-catch — tratezi mai multe excepții identic
try {
    operation();
} catch (IOException | SQLException | TimeoutException e) {
    log.error("Operație eșuată: {}", e.getMessage(), e);
    throw new ServiceUnavailableException("Serviciu indisponibil", e);
}

// Rethrow cu tip specific (Java 7+)
public void riskyMethod() throws IOException {
    try {
        Files.readAllBytes(Path.of("missing.txt"));
    } catch (IOException e) {
        log.error("Fișier lipsă", e);
        throw e; // rethrow — compilatorul știe că e IOException
    }
}
\`\`\`

• **UncheckedIOException** și **UncheckedSQLException** — wrappere standard Java pentru streams
• Nu **înghiți excepții** în catch gol — cel puțin loghează sau rethrow
• **Ierarhia proprie** începe cu un AppException/DomainException și se ramifică pe tipuri specifice`);

await up('Exception Handling Advanced', 'Custom Exceptions and Multi-catch', `**Custom Exceptions și Multi-catch** completează modelul de erori al aplicației — excepții semantice pentru domeniu, capturarea eficientă a mai multor tipuri și integrarea cu frameworks.

**Excepții cu context bogat**

\`\`\`java
// Excepție cu date structurate pentru debugging
public class OrderProcessingException extends RuntimeException {
    private final String orderId;
    private final String stage;
    private final Map<String, Object> context;

    public OrderProcessingException(String orderId, String stage,
                                    String message, Throwable cause) {
        super(message, cause);
        this.orderId = orderId;
        this.stage = stage;
        this.context = new HashMap<>();
    }

    public OrderProcessingException addContext(String key, Object value) {
        context.put(key, value);
        return this; // builder-style chain
    }

    @Override
    public String getMessage() {
        return String.format("[Order:%s|Stage:%s] %s | Context: %s",
            orderId, stage, super.getMessage(), context);
    }
}

// Utilizare
throw new OrderProcessingException(orderId, "payment", "Plată respinsă", cause)
    .addContext("amount", 150.0)
    .addContext("currency", "RON")
    .addContext("gatewayCode", "INSUFFICIENT_FUNDS");
\`\`\`

**Multi-catch avansat**

\`\`\`java
// Multi-catch cu tipuri diferite
public ProcessResult process(String input) {
    try {
        var parsed = JsonParser.parse(input);       // JsonParseException
        var validated = Validator.validate(parsed); // ValidationException
        return service.execute(validated);          // ServiceException
    } catch (JsonParseException | ValidationException e) {
        // Erori client — 400
        return ProcessResult.clientError(e.getMessage());
    } catch (ServiceException e) {
        // Erori server — 500, loghează complet
        log.error("Service failure pentru input: {}", input, e);
        return ProcessResult.serverError("Serviciu indisponibil");
    } catch (Exception e) {
        // Catch-all — erori neașteptate
        log.error("Eroare neașteptată", e);
        throw new RuntimeException("Eroare internă", e);
    } finally {
        metrics.incrementProcessed();
    }
}
\`\`\`

**Suppressed Exceptions**

\`\`\`java
// try-with-resources: excepția din close() e "suppressed"
try (var conn = getConnection()) {
    executeQuery(conn); // aruncă SQLTimeoutException
    // conn.close() aruncă și ea IOException → devine suppressed
} catch (Exception e) {
    System.err.println("Primary: " + e.getMessage());
    for (Throwable sup : e.getSuppressed()) {
        System.err.println("Suppressed: " + sup.getMessage());
    }
}

// Adăugare manuală de suppressed exceptions
Exception primary = new RuntimeException("Primary");
primary.addSuppressed(new IOException("Cleanup failed"));
throw primary;
\`\`\`

**Global Exception Handler în Spring Boot**

\`\`\`java
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(NotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ErrorResponse handleNotFound(NotFoundException ex) {
        return new ErrorResponse(ex.getCode(), ex.getMessage());
    }

    @ExceptionHandler(ValidationException.class)
    @ResponseStatus(HttpStatus.UNPROCESSABLE_ENTITY)
    public ValidationErrorResponse handleValidation(ValidationException ex) {
        return new ValidationErrorResponse(ex.getFieldErrors());
    }

    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ErrorResponse handleUnexpected(Exception ex, WebRequest req) {
        log.error("Unhandled exception for {}", req.getDescription(false), ex);
        return new ErrorResponse("INTERNAL_ERROR", "Eroare internă server");
    }
}
\`\`\`

• **Suppressed exceptions** sunt accesibile via \`getSuppressed()\` — important pentru debugging
• **@RestControllerAdvice** = tratare centralizată + răspunsuri JSON automate
• Creează excepții cu **context suficient** — orderId, userId, stage — pentru debugging în producție`);

  console.log('Done script 5.');
  await p.$disconnect();
}

run().catch(e => { console.error(e); p.$disconnect(); process.exit(1); });
