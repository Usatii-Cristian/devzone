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

await up('Library Management', 'Project Overview', `**Project Overview — Library Management System** este proiectul integrator pentru consolidarea conceptelor Java OOP, colecții, file I/O și design patterns prin construirea unei aplicații complete de gestionare bibliotecă.

**Cerințe funcționale**

\`\`\`
Funcționalități principale:
• Adăugare/eliminare cărți (titlu, autor, ISBN, an, copies)
• Înregistrare cititori (id, nume, email, telefon)
• Împrumut cărți (cu data împrumut + termen returnare)
• Returnare cărți (cu calcul penalități pentru întârzieri)
• Căutare cărți (după titlu, autor, ISBN, disponibilitate)
• Listare cititori și împrumuturile lor active
• Persistență date — salvare/încărcare în fișiere JSON sau CSV
• Raportare — statistici (cele mai împrumutate, cititori activi)
\`\`\`

**Arhitectura aplicației**

\`\`\`java
// Layered architecture — separarea responsabilităților
src/
├── model/                      // Entități domeniu
│   ├── Book.java
│   ├── Reader.java
│   ├── Loan.java
│   └── enums/ (BookStatus, LoanStatus)
├── repository/                 // Acces date (persistență)
│   ├── BookRepository.java
│   ├── ReaderRepository.java
│   └── LoanRepository.java
├── service/                    // Business logic
│   ├── LibraryService.java
│   ├── LoanService.java
│   └── ReportService.java
├── ui/                         // Interacțiune utilizator (CLI)
│   ├── ConsoleMenu.java
│   └── InputHelper.java
├── exception/                  // Excepții custom
│   ├── BookNotFoundException.java
│   └── BookAlreadyLoanedException.java
└── Main.java                   // Entry point
\`\`\`

**Modelele principale**

\`\`\`java
public record Book(
    String isbn,
    String title,
    String author,
    int year,
    int totalCopies,
    int availableCopies
) {
    public Book {
        Objects.requireNonNull(isbn);
        if (totalCopies < availableCopies)
            throw new IllegalArgumentException("availableCopies > totalCopies");
    }

    public boolean isAvailable() { return availableCopies > 0; }

    public Book withAvailable(int newAvailable) {
        return new Book(isbn, title, author, year, totalCopies, newAvailable);
    }
}

public record Reader(long id, String name, String email, String phone) {}

public record Loan(
    long id,
    String bookIsbn,
    long readerId,
    LocalDate loanDate,
    LocalDate dueDate,
    LocalDate returnDate
) {
    public boolean isActive() { return returnDate == null; }
    public boolean isOverdue() {
        return isActive() && LocalDate.now().isAfter(dueDate);
    }
    public long daysOverdue() {
        return isOverdue() ? ChronoUnit.DAYS.between(dueDate, LocalDate.now()) : 0;
    }
}
\`\`\`

**Plan de implementare**

\`\`\`
Pasul 1: Modele și enums (Book, Reader, Loan + status enums)
Pasul 2: Repositories cu CRUD + persistență fișier
Pasul 3: LibraryService — orchestrare logică (împrumut, returnare)
Pasul 4: Excepții custom pentru cazuri specifice
Pasul 5: ConsoleMenu — UI text bazat
Pasul 6: Persistență JSON cu Jackson sau Gson
Pasul 7: Teste unitare cu JUnit 5 + Mockito
Pasul 8: Rapoarte — top cărți, cititori activi, statistici
\`\`\`

• Folosește **records** pentru entități imuabile + factory methods pentru creare
• Implementează **Repository pattern** — abstractizează persistența (poți schimba din fișier în BD ulterior)
• **Single Responsibility** — fiecare service are o singură responsabilitate clară`);

await up('Library Management', 'Core Models and Repository', `**Core Models și Repository** — implementarea entităților, persistenței și operațiilor CRUD pentru Library Management System cu pattern-uri profesionale.

**Repository generic interface**

\`\`\`java
public interface Repository<T, ID> {
    T save(T entity);
    Optional<T> findById(ID id);
    List<T> findAll();
    boolean deleteById(ID id);
    boolean existsById(ID id);
    long count();
}
\`\`\`

**BookRepository — implementare cu persistență fișier**

\`\`\`java
public class BookRepository implements Repository<Book, String> {
    private final Map<String, Book> books = new ConcurrentHashMap<>();
    private final Path storageFile;
    private final ObjectMapper jsonMapper = new ObjectMapper()
        .registerModule(new JavaTimeModule());

    public BookRepository(Path storageFile) {
        this.storageFile = storageFile;
        load();
    }

    @Override
    public Book save(Book book) {
        books.put(book.isbn(), book);
        persist(); // save după fiecare modificare (in-memory + disk)
        return book;
    }

    @Override
    public Optional<Book> findById(String isbn) {
        return Optional.ofNullable(books.get(isbn));
    }

    @Override
    public List<Book> findAll() {
        return List.copyOf(books.values());
    }

    // Query methods custom
    public List<Book> findByTitle(String title) {
        return books.values().stream()
            .filter(b -> b.title().toLowerCase().contains(title.toLowerCase()))
            .collect(Collectors.toList());
    }

    public List<Book> findByAuthor(String author) {
        return books.values().stream()
            .filter(b -> b.author().equalsIgnoreCase(author))
            .collect(Collectors.toList());
    }

    public List<Book> findAvailable() {
        return books.values().stream()
            .filter(Book::isAvailable)
            .collect(Collectors.toList());
    }

    @Override
    public boolean deleteById(String isbn) {
        boolean removed = books.remove(isbn) != null;
        if (removed) persist();
        return removed;
    }

    @Override public boolean existsById(String isbn) { return books.containsKey(isbn); }
    @Override public long count() { return books.size(); }

    // Persistență
    private void persist() {
        try {
            jsonMapper.writerWithDefaultPrettyPrinter()
                .writeValue(storageFile.toFile(), books.values());
        } catch (IOException e) {
            throw new UncheckedIOException("Salvare cărți eșuată", e);
        }
    }

    private void load() {
        if (!Files.exists(storageFile)) return;
        try {
            List<Book> loaded = jsonMapper.readValue(
                storageFile.toFile(),
                new TypeReference<List<Book>>() {}
            );
            loaded.forEach(b -> books.put(b.isbn(), b));
        } catch (IOException e) {
            throw new UncheckedIOException("Încărcare cărți eșuată", e);
        }
    }
}
\`\`\`

**LoanRepository cu indexare pentru queries rapide**

\`\`\`java
public class LoanRepository implements Repository<Loan, Long> {
    private final Map<Long, Loan> loans = new ConcurrentHashMap<>();
    private final AtomicLong idGenerator = new AtomicLong(1);

    // Index pentru lookup rapid
    private final Map<Long, Set<Long>> loansByReader = new ConcurrentHashMap<>();
    private final Map<String, Set<Long>> loansByBook = new ConcurrentHashMap<>();

    public Loan create(String bookIsbn, long readerId, int loanDays) {
        long id = idGenerator.getAndIncrement();
        Loan loan = new Loan(id, bookIsbn, readerId,
            LocalDate.now(), LocalDate.now().plusDays(loanDays), null);
        save(loan);
        return loan;
    }

    @Override
    public Loan save(Loan loan) {
        loans.put(loan.id(), loan);
        loansByReader.computeIfAbsent(loan.readerId(), k -> new HashSet<>()).add(loan.id());
        loansByBook.computeIfAbsent(loan.bookIsbn(), k -> new HashSet<>()).add(loan.id());
        return loan;
    }

    public List<Loan> findActiveByReader(long readerId) {
        return loansByReader.getOrDefault(readerId, Set.of()).stream()
            .map(loans::get)
            .filter(Objects::nonNull)
            .filter(Loan::isActive)
            .collect(Collectors.toList());
    }

    public List<Loan> findOverdue() {
        return loans.values().stream()
            .filter(Loan::isOverdue)
            .collect(Collectors.toList());
    }
}
\`\`\`

• **Jackson** sau **Gson** pentru serializare JSON — gestionează LocalDate automat cu JavaTimeModule
• **Indexarea** (Map<reader, Set<loanIds>>) face query-urile O(1) în loc de O(n)
• **ConcurrentHashMap** pentru thread-safety dacă aplicația ajunge să fie multi-threaded`);

await up('Library Management', 'Main App', `**Main App și Testing** — orchestrarea componentelor în Main, ConsoleMenu pentru interacțiune și teste unitare complete cu JUnit 5 + Mockito.

**Main — entry point și inițializare**

\`\`\`java
public class Main {
    public static void main(String[] args) {
        Path dataDir = Path.of("data");
        try {
            Files.createDirectories(dataDir);
        } catch (IOException e) {
            System.err.println("Nu pot crea director: " + e.getMessage());
            System.exit(1);
        }

        // Composition root — wire-up dependincies
        var bookRepo = new BookRepository(dataDir.resolve("books.json"));
        var readerRepo = new ReaderRepository(dataDir.resolve("readers.json"));
        var loanRepo = new LoanRepository(dataDir.resolve("loans.json"));

        var libraryService = new LibraryService(bookRepo, readerRepo, loanRepo);
        var reportService = new ReportService(bookRepo, loanRepo);

        var menu = new ConsoleMenu(libraryService, reportService);
        menu.run();
    }
}
\`\`\`

**ConsoleMenu — interactive CLI**

\`\`\`java
public class ConsoleMenu {
    private final LibraryService library;
    private final ReportService reports;
    private final Scanner scanner = new Scanner(System.in);

    public ConsoleMenu(LibraryService library, ReportService reports) {
        this.library = library; this.reports = reports;
    }

    public void run() {
        while (true) {
            printMenu();
            int choice = readInt("Opțiunea: ", 0, 9);
            try {
                switch (choice) {
                    case 1 -> addBook();
                    case 2 -> registerReader();
                    case 3 -> loanBook();
                    case 4 -> returnBook();
                    case 5 -> searchBook();
                    case 6 -> listActiveLoans();
                    case 7 -> reports.printTopBooks(10);
                    case 8 -> reports.printOverdueLoans();
                    case 0 -> { System.out.println("La revedere!"); return; }
                }
            } catch (Exception e) {
                System.err.println("Eroare: " + e.getMessage());
            }
        }
    }

    private void addBook() {
        var isbn = readLine("ISBN: ");
        var title = readLine("Titlu: ");
        var author = readLine("Autor: ");
        var year = readInt("An: ", 1000, 2100);
        var copies = readInt("Exemplare: ", 1, 100);
        var book = library.addBook(isbn, title, author, year, copies);
        System.out.println("Adăugat: " + book.title());
    }
}
\`\`\`

**Testing — LibraryService cu Mockito**

\`\`\`java
@ExtendWith(MockitoExtension.class)
class LibraryServiceTest {
    @Mock BookRepository bookRepo;
    @Mock ReaderRepository readerRepo;
    @Mock LoanRepository loanRepo;

    @InjectMocks
    LibraryService library;

    @Test
    @DisplayName("Împrumut carte disponibilă — succes")
    void loanBook_AvailableBook_CreatesLoan() {
        // Given
        var book = new Book("978-1", "Java", "Bloch", 2018, 3, 2);
        var reader = new Reader(1L, "Ana", "ana@test.com", "0700000");
        var savedBook = book.withAvailable(1);
        var expectedLoan = new Loan(1L, "978-1", 1L,
            LocalDate.now(), LocalDate.now().plusDays(14), null);

        when(bookRepo.findById("978-1")).thenReturn(Optional.of(book));
        when(readerRepo.findById(1L)).thenReturn(Optional.of(reader));
        when(loanRepo.create("978-1", 1L, 14)).thenReturn(expectedLoan);
        when(bookRepo.save(any(Book.class))).thenReturn(savedBook);

        // When
        var loan = library.loanBook("978-1", 1L, 14);

        // Then
        assertEquals("978-1", loan.bookIsbn());
        verify(bookRepo).save(argThat(b -> b.availableCopies() == 1));
        verify(loanRepo).create("978-1", 1L, 14);
    }

    @Test
    @DisplayName("Împrumut carte indisponibilă — aruncă excepție")
    void loanBook_NoAvailableCopies_Throws() {
        var book = new Book("978-1", "Java", "Bloch", 2018, 1, 0);
        when(bookRepo.findById("978-1")).thenReturn(Optional.of(book));

        var ex = assertThrows(BookUnavailableException.class,
            () -> library.loanBook("978-1", 1L, 14));
        assertTrue(ex.getMessage().contains("Java"));
        verify(loanRepo, never()).create(any(), anyLong(), anyInt());
    }
}
\`\`\`

• **Composition root** în Main — singurul loc unde compui dependențele manual
• **Mock-uri pentru repository** — testezi service-ul izolat, fără atingerea bazei de date
• **@DisplayName** pentru rapoarte de test lizibile și descriptive`);

await up('Virtual Threads', 'Virtual Threads (Java 21)', `**Virtual Threads** (Java 21) revoluționează concurența în Java — milioane de threaduri ușoare gestionate de JVM, perfect pentru aplicații I/O-bound fără complexitatea programării reactive.

**Ce sunt Virtual Threads?**

\`\`\`
Platform Threads (clasic):           Virtual Threads (Java 21):
- 1:1 cu OS thread                   - M:N cu OS thread (multi-virtual pe un OS)
- ~1MB stack per thread              - ~few KB stack inițial
- ~few thousand max practical        - milioane simultan
- Blocare = OS thread blocat         - Blocare = thread părăsit, OS thread liber
- Context switch costisitor          - Context switch în user space (rapid)
\`\`\`

**Crearea Virtual Threads**

\`\`\`java
// 1. Direct
Thread vt = Thread.ofVirtual().start(() -> {
    System.out.println("Rulez pe virtual thread: " + Thread.currentThread());
});

// 2. Builder pattern
Thread vt2 = Thread.ofVirtual()
    .name("worker-", 1)        // auto-increment name
    .uncaughtExceptionHandler((t, e) -> log.error("Error in {}", t, e))
    .start(this::doWork);

// 3. ExecutorService — recomandat pentru pool de task-uri
try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
    for (int i = 0; i < 1_000_000; i++) {
        final int id = i;
        executor.submit(() -> {
            handleRequest(id); // dacă face I/O blocant, virtual thread se "parchează"
        });
    }
} // close() = shutdown + awaitTermination
\`\`\`

**Comparație cu Platform Threads**

\`\`\`java
// PLATFORM (clasic) — limitat la ~few thousand
try (var exec = Executors.newFixedThreadPool(200)) {
    IntStream.range(0, 10_000).forEach(i ->
        exec.submit(() -> {
            try { Thread.sleep(Duration.ofSeconds(1)); } catch (Exception e) {}
            // 200 threaduri rulează în paralel, restul așteaptă
        })
    );
    // Timp total: ~50 secunde (10000/200 batch-uri × 1s)
}

// VIRTUAL — toate 10K rulează "simultan"
try (var exec = Executors.newVirtualThreadPerTaskExecutor()) {
    IntStream.range(0, 10_000).forEach(i ->
        exec.submit(() -> {
            try { Thread.sleep(Duration.ofSeconds(1)); } catch (Exception e) {}
        })
    );
    // Timp total: ~1 secundă! Toate sleep-urile se parchează
}
\`\`\`

**Aplicații practice**

\`\`\`java
// Server HTTP — un VT per request, scalabil la milioane
public class WebServer {
    void start() {
        var server = HttpServer.create(new InetSocketAddress(8080), 0);
        var executor = Executors.newVirtualThreadPerTaskExecutor();
        server.setExecutor(executor);
        server.createContext("/", this::handleRequest);
        server.start();
    }

    void handleRequest(HttpExchange exchange) throws IOException {
        // Fiecare request rulează pe un virtual thread
        String userId = parseUser(exchange);
        User user = userService.findById(userId);   // blocant — VT parchează
        Profile profile = profileService.fetch(user); // alt I/O — VT parchează
        String response = render(user, profile);
        exchange.sendResponseHeaders(200, response.length());
        try (var out = exchange.getResponseBody()) { out.write(response.getBytes()); }
    }
}

// Fan-out parallel — fetch-uri concurrente
List<UserData> fetchAllUsers(List<Long> ids) {
    try (var scope = new StructuredTaskScope.ShutdownOnFailure()) {
        var futures = ids.stream()
            .map(id -> scope.fork(() -> userService.fetch(id)))
            .toList();
        scope.join().throwIfFailed();
        return futures.stream().map(Subtask::get).collect(Collectors.toList());
    }
}
\`\`\`

• Virtual threads sunt **pentru I/O-bound work** (DB, HTTP, file) — nu CPU-bound
• Nu folosi **synchronized** cu virtual threads — folosește ReentrantLock (synchronized pinează OS thread)
• Au **același API** ca platform threads — codul existent funcționează cu schimbare minimă`);

await up('Virtual Threads', 'Structured Concurrency', `**Structured Concurrency și Sequenced Collections** (Java 21) — modele moderne pentru gestionarea task-urilor paralele și colecții cu ordine garantată.

**Structured Concurrency — task-uri ca structuri în cod**

\`\`\`java
// Înainte de structured concurrency — task-uri "scape" din scope
ExecutorService exec = Executors.newCachedThreadPool();
Future<User> userFuture = exec.submit(() -> userService.fetch(id));
Future<Order> orderFuture = exec.submit(() -> orderService.fetch(id));
User user = userFuture.get();    // dacă orderFuture eșuează, nu știm ușor
Order order = orderFuture.get();
// Resource leak dacă uităm exec.shutdown()
\`\`\`

\`\`\`java
// CU structured concurrency — task-urile sunt scoped
import java.util.concurrent.StructuredTaskScope;

UserDashboard fetchDashboard(long userId) throws InterruptedException {
    try (var scope = new StructuredTaskScope.ShutdownOnFailure()) {
        // Fork task-uri concurrent
        var userTask = scope.fork(() -> userService.fetchUser(userId));
        var ordersTask = scope.fork(() -> orderService.fetchOrders(userId));
        var notifTask = scope.fork(() -> notificationService.unread(userId));

        scope.join();              // așteaptă toate
        scope.throwIfFailed();     // aruncă dacă vreunul eșuează

        return new UserDashboard(
            userTask.get(),
            ordersTask.get(),
            notifTask.get()
        );
        // Dacă orice task eșuează, toate celelalte sunt anulate automat
    }
}
\`\`\`

**Strategii de scope**

\`\`\`java
// ShutdownOnFailure — primul eșec oprește restul (fail-fast)
try (var scope = new StructuredTaskScope.ShutdownOnFailure()) {
    var t1 = scope.fork(() -> riskyCall1());
    var t2 = scope.fork(() -> riskyCall2());
    scope.join().throwIfFailed();
    return combine(t1.get(), t2.get());
}

// ShutdownOnSuccess — primul succes oprește restul (race)
try (var scope = new StructuredTaskScope.ShutdownOnSuccess<String>()) {
    scope.fork(() -> queryServer1());
    scope.fork(() -> queryServer2());
    scope.fork(() -> queryServer3());
    return scope.join().result(); // primul rezultat disponibil
}

// Custom scope cu logica proprie
class CollectAllResults<T> extends StructuredTaskScope<T> {
    private final List<T> results = new CopyOnWriteArrayList<>();
    @Override
    protected void handleComplete(Subtask<? extends T> subtask) {
        if (subtask.state() == Subtask.State.SUCCESS) {
            results.add(subtask.get());
        }
    }
    public List<T> results() { return results; }
}
\`\`\`

**Sequenced Collections (Java 21)**

\`\`\`java
// Înainte: LinkedList, ArrayDeque aveau metode diferite pentru first/last
// LinkedList: getFirst(), getLast(), addFirst(), addLast()
// ArrayDeque: peekFirst(), peekLast(), addFirst(), addLast()
// LinkedHashSet: nu aveai acces facil la first/last

// Java 21: interfața SequencedCollection
SequencedCollection<Integer> seq = new LinkedHashSet<>(List.of(1, 2, 3, 4, 5));
seq.getFirst();        // 1
seq.getLast();         // 5
seq.addFirst(0);       // [0, 1, 2, 3, 4, 5]
seq.addLast(6);        // [0, 1, 2, 3, 4, 5, 6]
seq.removeFirst();     // returnează 0
seq.reversed();        // [6, 5, 4, 3, 2, 1] view inversată

// SequencedMap — pentru LinkedHashMap, TreeMap
SequencedMap<String, Integer> map = new LinkedHashMap<>();
map.put("a", 1); map.put("b", 2); map.put("c", 3);
map.firstEntry();    // a=1
map.lastEntry();     // c=3
map.pollFirstEntry(); // scoate și returnează a=1
map.reversed();      // {c=3, b=2}
\`\`\`

• **Structured concurrency** = task-urile au lifetime legat de scope — fără leaks
• **fork().join()** sunt explicite — clar când task-urile pornesc și când se sincronizează
• **Sequenced collections** = API uniform pentru first/last/reversed pe orice colecție ordonată`);

await up('Virtual Threads', 'Record Patterns', `**Record Patterns și Modern Switch** (Java 21) — descompunerea automată a recordurilor în switch-uri, simplifică drastic codul pentru ierarhii de date.

**Record Patterns — destructuring**

\`\`\`java
record Point(int x, int y) {}
record Circle(Point center, double radius) {}
record Rectangle(Point topLeft, int width, int height) {}

// Pattern matching cu destructurare automată
Object shape = new Circle(new Point(10, 20), 5.0);

if (shape instanceof Circle(Point(int x, int y), double r)) {
    System.out.printf("Cerc cu centrul (%d,%d) și raza %.1f%n", x, y, r);
}

// Echivalent fără record pattern (verbose)
if (shape instanceof Circle c) {
    Point center = c.center();
    int x = center.x();
    int y = center.y();
    double r = c.radius();
    // ...
}
\`\`\`

**Switch cu Record Patterns**

\`\`\`java
sealed interface Shape permits Circle, Square, Triangle {}
record Circle(double r) implements Shape {}
record Square(double side) implements Shape {}
record Triangle(double a, double b, double c) implements Shape {}

// Switch cu patterns + destructurare
double area(Shape s) {
    return switch (s) {
        case Circle(double r)             -> Math.PI * r * r;
        case Square(double side)          -> side * side;
        case Triangle(double a, double b, double c) -> {
            double p = (a + b + c) / 2;
            yield Math.sqrt(p * (p-a) * (p-b) * (p-c)); // Heron's formula
        }
    };
}

// Cu condiții (guards) — when
String describe(Shape s) {
    return switch (s) {
        case Circle(double r) when r > 100   -> "Cerc uriaș";
        case Circle(double r) when r < 1     -> "Cerc minuscul";
        case Circle(double r)                -> "Cerc normal cu raza " + r;
        case Square(double side) when side > 50 -> "Pătrat mare";
        case Square s2                       -> "Pătrat " + s2.side();
        case Triangle t                      -> "Triunghi cu laturile " + t;
    };
}
\`\`\`

**Patterns imbricate**

\`\`\`java
// Pattern matching imbricat — destructurare în adâncime
record Person(String name, Address address) {}
record Address(String street, String city, Country country) {}
record Country(String code, String name) {}

String formatAddress(Object obj) {
    return switch (obj) {
        case Person(String name, Address(String street, String city, Country(String code, _))) ->
            "%s locuiește în %s, %s (%s)".formatted(name, street, city, code);
        case null -> "necunoscut";
        default -> "tip neașteptat";
    };
}

// Var în pattern — bind partea care nu te interesează
case Person(var n, var addr) -> n + " - " + addr.city();
\`\`\`

**Aplicație — AST evaluation**

\`\`\`java
// Modelare expresii matematice
sealed interface Expr permits Num, BinOp, UnaryOp {}
record Num(double value) implements Expr {}
record BinOp(String op, Expr left, Expr right) implements Expr {}
record UnaryOp(String op, Expr operand) implements Expr {}

double eval(Expr expr) {
    return switch (expr) {
        case Num(double v)                          -> v;
        case BinOp("+", Expr l, Expr r)             -> eval(l) + eval(r);
        case BinOp("-", Expr l, Expr r)             -> eval(l) - eval(r);
        case BinOp("*", Expr l, Expr r)             -> eval(l) * eval(r);
        case BinOp("/", Expr l, Expr r)             -> {
            double rv = eval(r);
            if (rv == 0) throw new ArithmeticException("/0");
            yield eval(l) / rv;
        }
        case UnaryOp("-", Expr e)                   -> -eval(e);
        case UnaryOp("abs", Expr e)                 -> Math.abs(eval(e));
        default -> throw new IllegalArgumentException("Unsupported: " + expr);
    };
}

// 2 + 3 * 4
Expr e = new BinOp("+", new Num(2), new BinOp("*", new Num(3), new Num(4)));
eval(e); // 14
\`\`\`

• **Record patterns** + **sealed** + **switch** = ML/Haskell-style algebraic data types în Java
• **Compilatorul verifică exhaustivitatea** — schimbarea ierarhiei sealed semnalează toate switch-urile
• Patternurile sunt **recursive** — destructurezi în adâncime cu o singură expresie`);

await up('Java Advanced Project', 'Complete Spring Boot REST API', `**Complete Spring Boot REST API** — proiect end-to-end care integrează toate conceptele Java avansate: controllers, services, repositories, DTOs, validare și securitate într-un API real.

**Structura proiectului**

\`\`\`
task-api/
├── src/main/java/com/example/taskapi/
│   ├── TaskApiApplication.java
│   ├── controller/
│   │   ├── TaskController.java
│   │   └── AuthController.java
│   ├── service/
│   │   ├── TaskService.java
│   │   └── UserService.java
│   ├── repository/
│   │   ├── TaskRepository.java (JpaRepository)
│   │   └── UserRepository.java
│   ├── model/
│   │   ├── Task.java (@Entity)
│   │   └── User.java
│   ├── dto/
│   │   ├── TaskDto.java (record)
│   │   ├── CreateTaskRequest.java
│   │   └── UpdateTaskRequest.java
│   ├── exception/
│   │   ├── GlobalExceptionHandler.java
│   │   └── TaskNotFoundException.java
│   └── config/SecurityConfig.java
├── src/main/resources/
│   ├── application.yml
│   └── db/migration/V1__init.sql
└── pom.xml
\`\`\`

**Entitate JPA**

\`\`\`java
@Entity
@Table(name = "tasks")
public class Task {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 200)
    private String title;

    @Column(length = 1000)
    private String description;

    @Enumerated(EnumType.STRING)
    private TaskStatus status = TaskStatus.PENDING;

    @Column(name = "due_date")
    private LocalDate dueDate;

    @CreatedDate
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    // getters, setters, constructori...
}
\`\`\`

**Controller cu validare și DTO-uri**

\`\`\`java
@RestController
@RequestMapping("/api/tasks")
@Validated
public class TaskController {
    private final TaskService taskService;
    public TaskController(TaskService taskService) { this.taskService = taskService; }

    @GetMapping
    public Page<TaskDto> getAll(
        @RequestParam(required = false) TaskStatus status,
        @PageableDefault(size = 20) Pageable pageable
    ) {
        return taskService.findAll(status, pageable);
    }

    @GetMapping("/{id}")
    public TaskDto getById(@PathVariable Long id) {
        return taskService.findById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public TaskDto create(@RequestBody @Valid CreateTaskRequest req,
                          @AuthenticationPrincipal UserDetails user) {
        return taskService.create(req, user.getUsername());
    }

    @PutMapping("/{id}")
    public TaskDto update(@PathVariable Long id,
                          @RequestBody @Valid UpdateTaskRequest req) {
        return taskService.update(id, req);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        taskService.delete(id);
    }
}
\`\`\`

**DTO records cu validare**

\`\`\`java
public record CreateTaskRequest(
    @NotBlank @Size(max = 200) String title,
    @Size(max = 1000) String description,
    @NotNull TaskStatus status,
    @Future LocalDate dueDate
) {}

public record TaskDto(
    Long id,
    String title,
    String description,
    TaskStatus status,
    LocalDate dueDate,
    LocalDateTime createdAt,
    String userEmail
) {
    static TaskDto from(Task task) {
        return new TaskDto(
            task.getId(), task.getTitle(), task.getDescription(),
            task.getStatus(), task.getDueDate(), task.getCreatedAt(),
            task.getUser().getEmail()
        );
    }
}
\`\`\`

• **Records pentru DTO-uri** + validare via Jakarta Bean Validation (\`@Valid\`)
• **Pageable** automat din query params (page, size, sort) — paginare cu Spring Data
• **@AuthenticationPrincipal** pentru a obține user-ul curent în controller`);

await up('Java Advanced Project', 'Exception Handling and Testing', `**Exception Handling și Testing** completează proiectul Spring Boot REST API — tratare centralizată a erorilor și suite de teste integrate care validează funcționalitatea end-to-end.

**Global Exception Handler**

\`\`\`java
@RestControllerAdvice
public class GlobalExceptionHandler {

    private static final Logger log = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    @ExceptionHandler(TaskNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ErrorResponse handleNotFound(TaskNotFoundException ex) {
        return new ErrorResponse("TASK_NOT_FOUND", ex.getMessage(), null);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.UNPROCESSABLE_ENTITY)
    public ErrorResponse handleValidation(MethodArgumentNotValidException ex) {
        Map<String, String> fieldErrors = new HashMap<>();
        ex.getBindingResult().getFieldErrors().forEach(err ->
            fieldErrors.put(err.getField(), err.getDefaultMessage())
        );
        return new ErrorResponse("VALIDATION_FAILED", "Date invalide", fieldErrors);
    }

    @ExceptionHandler(AccessDeniedException.class)
    @ResponseStatus(HttpStatus.FORBIDDEN)
    public ErrorResponse handleForbidden(AccessDeniedException ex) {
        return new ErrorResponse("ACCESS_DENIED", "Acces interzis", null);
    }

    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ErrorResponse handleUnexpected(Exception ex, HttpServletRequest req) {
        log.error("Unhandled exception on {}: {}", req.getRequestURI(), ex.getMessage(), ex);
        return new ErrorResponse("INTERNAL_ERROR", "Eroare internă", null);
    }
}

public record ErrorResponse(String code, String message, Map<String, String> details) {}
\`\`\`

**Custom Exception cu context**

\`\`\`java
public class TaskNotFoundException extends RuntimeException {
    private final Long taskId;

    public TaskNotFoundException(Long id) {
        super("Task cu ID " + id + " nu a fost găsit");
        this.taskId = id;
    }

    public Long getTaskId() { return taskId; }
}
\`\`\`

**Unit Tests cu Mockito**

\`\`\`java
@ExtendWith(MockitoExtension.class)
class TaskServiceTest {

    @Mock TaskRepository taskRepo;
    @Mock UserRepository userRepo;

    @InjectMocks
    TaskService taskService;

    @Test
    @DisplayName("Creează task pentru user valid")
    void create_ValidUser_SavesAndReturnsDto() {
        var user = new User(1L, "ana@test.com", "hash");
        var req = new CreateTaskRequest("Test", "desc", TaskStatus.PENDING, LocalDate.now().plusDays(1));

        when(userRepo.findByEmail("ana@test.com")).thenReturn(Optional.of(user));
        when(taskRepo.save(any(Task.class))).thenAnswer(inv -> {
            Task t = inv.getArgument(0); t.setId(1L); return t;
        });

        TaskDto result = taskService.create(req, "ana@test.com");

        assertEquals("Test", result.title());
        assertEquals(TaskStatus.PENDING, result.status());
        verify(taskRepo).save(any(Task.class));
    }

    @Test
    void findById_NotExists_ThrowsNotFound() {
        when(taskRepo.findById(99L)).thenReturn(Optional.empty());
        var ex = assertThrows(TaskNotFoundException.class,
            () -> taskService.findById(99L));
        assertEquals(99L, ex.getTaskId());
    }
}
\`\`\`

**Integration Tests cu @SpringBootTest**

\`\`\`java
@SpringBootTest
@AutoConfigureMockMvc
@Transactional  // rollback după fiecare test
class TaskControllerIntegrationTest {

    @Autowired MockMvc mvc;
    @Autowired ObjectMapper jsonMapper;
    @Autowired TaskRepository taskRepo;

    @Test
    @WithMockUser(username = "ana@test.com")
    void createTask_ValidPayload_Returns201() throws Exception {
        var req = new CreateTaskRequest("Test Task", "desc", TaskStatus.PENDING,
            LocalDate.now().plusDays(7));

        mvc.perform(post("/api/tasks")
                .contentType(MediaType.APPLICATION_JSON)
                .content(jsonMapper.writeValueAsString(req)))
            .andExpect(status().isCreated())
            .andExpect(jsonPath("$.title").value("Test Task"))
            .andExpect(jsonPath("$.status").value("PENDING"));

        assertEquals(1, taskRepo.count());
    }

    @Test
    void getTask_NotFound_Returns404() throws Exception {
        mvc.perform(get("/api/tasks/999"))
            .andExpect(status().isNotFound())
            .andExpect(jsonPath("$.code").value("TASK_NOT_FOUND"));
    }
}
\`\`\`

• **@RestControllerAdvice** = răspunsuri JSON consistente pentru toate excepțiile
• **MockMvc** pentru integration tests fără pornirea efectivă a serverului
• **@WithMockUser** pentru testare cu securitate activă fără login real`);

await up('Java Advanced Project', 'Summary: Java Learning Path', `**Summary — Java Learning Path** sintetizează parcursul complet pentru a deveni un dezvoltator Java solid, de la fundamente la framework-uri și arhitecturi enterprise.

**Niveluri de cunoaștere**

\`\`\`
NIVELUL 1 — Fundamente (1-2 luni)
✓ Sintaxa de bază, tipuri, variabile, operatori
✓ Control flow (if/switch/for/while)
✓ Metode, scope, recursivitate
✓ OOP: clase, obiecte, încapsulare, moștenire, polimorfism
✓ Interfețe, abstract classes
✓ Excepții: try/catch/finally, checked vs unchecked

NIVELUL 2 — Java Core (2-3 luni)
✓ Collections Framework (List, Set, Map, Queue)
✓ Generics + Wildcards (extends, super, ?)
✓ Lambda expressions și method references
✓ Streams API + Collectors
✓ Optional, functional interfaces
✓ I/O: Files, Path, BufferedReader/Writer
✓ Concurrency: Thread, ExecutorService, synchronized

NIVELUL 3 — Modern Java (1-2 luni)
✓ Records, sealed classes
✓ Pattern matching (instanceof, switch)
✓ Text blocks, var
✓ Switch expressions cu yield
✓ Virtual Threads (Java 21)
✓ Structured Concurrency

NIVELUL 4 — Build & Tools (1 lună)
✓ Maven sau Gradle
✓ Git și GitHub workflow
✓ JUnit 5 + Mockito + AssertJ
✓ Logging cu SLF4J + Logback
✓ Debugger IDE și profiling

NIVELUL 5 — Spring Ecosystem (3-4 luni)
✓ Spring Boot fundamentals (DI, IoC, auto-config)
✓ Spring Web (REST APIs, controllers)
✓ Spring Data JPA + Hibernate
✓ Spring Security (JWT, OAuth2)
✓ Spring Test (MockMvc, @SpringBootTest)
✓ Spring Cloud (microservices: gateway, discovery, config)

NIVELUL 6 — Avansat (continuu)
✓ Reactive (WebFlux, Project Reactor)
✓ Kafka, RabbitMQ pentru event-driven
✓ Docker + Kubernetes
✓ Observability (Prometheus, Grafana, OpenTelemetry)
✓ DDD, CQRS, Event Sourcing
✓ Performance tuning, GC tuning
\`\`\`

**Proiecte practice pentru portfolio**

\`\`\`
1. To-Do CLI App — exersează OOP, file I/O, exceptions
2. Library Management System — Collections, persistență JSON
3. REST API cu Spring Boot — CRUD complet pe entitate
4. E-commerce backend — multi-entitate, autentificare JWT, pagination
5. Chat real-time cu WebSockets — concurrency, SignalR equivalent
6. Microservicii — split monolit, gateway, service discovery
\`\`\`

**Resurse esențiale**

\`\`\`
Cărți:
• "Effective Java" — Joshua Bloch (BIBLIA Java)
• "Java Concurrency in Practice" — Brian Goetz
• "Spring in Action" — Craig Walls

Documentație:
• docs.oracle.com/javase/specs/ — JLS oficial
• spring.io/projects — Spring portfolio
• baeldung.com — tutoriale practice

Comunitate:
• r/java, r/SpringBoot (Reddit)
• Java Weekly newsletter (baeldung.com)
• JavaZone, Devoxx — conferințe înregistrate pe YouTube

Practice:
• LeetCode, HackerRank pentru algoritmi
• GitHub — contribuie la proiecte open-source
\`\`\`

**Mindset și obiceiuri**

\`\`\`
✓ Citește cod cu cel puțin 2x mai mult decât scrii
✓ Testează totul — TDD nu e opțional în enterprise
✓ Profilează ÎNAINTE de a optimiza
✓ Code review activ — învăți enorm din feedback și din review-uri date
✓ Stay updated — Java se modernizează rapid (versiuni la 6 luni)
✓ Specialize într-un domeniu (web, mobile, big data, embedded)
✓ Soft skills: comunicare, lucru în echipă, mentorship
\`\`\`

• Java este **al doilea cel mai folosit limbaj în enterprise** după JavaScript — cerere uriașă pe piață
• Salarii medii Java dev senior: €60K-100K+ în EU, $120K-200K+ în US
• Java rămâne relevant: Android (Kotlin/Java), Spring (web/enterprise), Big Data (Hadoop, Spark)`);

  console.log('Done script 10.');
  await p.$disconnect();
}

run().catch(e => { console.error(e); p.$disconnect(); process.exit(1); });
