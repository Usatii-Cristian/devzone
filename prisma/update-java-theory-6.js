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

await up('Multithreading', 'Threads in Java', `**Threads în Java** permit execuția paralelă a mai multor sarcini — esențial pentru aplicații responsive, servere cu trafic mare și procesare de date în paralel.

**Crearea și pornirea threadurilor**

\`\`\`java
// Metoda 1: extinde Thread
class MyThread extends Thread {
    private final String name;
    MyThread(String name) { this.name = name; }

    @Override
    public void run() {
        for (int i = 0; i < 5; i++) {
            System.out.println(name + ": " + i);
            try { Thread.sleep(100); } catch (InterruptedException e) {
                Thread.currentThread().interrupt(); // restaurează flag
                return;
            }
        }
    }
}
new MyThread("Thread-A").start(); // start() creează noul thread; nu run()!

// Metoda 2: implementează Runnable (preferată)
Runnable task = () -> System.out.println("Task pe " + Thread.currentThread().getName());
Thread t = new Thread(task, "worker-1");
t.start();

// Metoda 3: Callable + Future (cu rezultat)
Callable<Integer> compute = () -> {
    Thread.sleep(1000);
    return 42;
};
ExecutorService exec = Executors.newSingleThreadExecutor();
Future<Integer> future = exec.submit(compute);
Integer result = future.get(5, TimeUnit.SECONDS); // bloc max 5s
exec.shutdown();
\`\`\`

**Stările unui thread**

\`\`\`java
Thread t = new Thread(() -> {
    // Stări: NEW → RUNNABLE → BLOCKED/WAITING/TIMED_WAITING → TERMINATED
    try {
        Thread.sleep(1000);    // TIMED_WAITING
        synchronized (lock) {  // BLOCKED dacă alt thread ține lock-ul
            wait();            // WAITING
        }
    } catch (InterruptedException e) { Thread.currentThread().interrupt(); }
});

System.out.println(t.getState()); // NEW
t.start();
System.out.println(t.getState()); // RUNNABLE
t.join(); // main thread așteaptă terminarea t
System.out.println(t.getState()); // TERMINATED
\`\`\`

**ExecutorService — pool de threaduri**

\`\`\`java
// Thread pool fix
ExecutorService pool = Executors.newFixedThreadPool(4); // 4 threaduri

// Submitted tasks
for (int i = 0; i < 10; i++) {
    final int taskId = i;
    pool.execute(() -> {
        System.out.printf("Task %d pe %s%n", taskId, Thread.currentThread().getName());
    });
}

pool.shutdown();          // nu mai acceptă task-uri noi
pool.awaitTermination(30, TimeUnit.SECONDS); // așteaptă finalizarea

// shutdown + awaitTermination pattern corect
pool.shutdown();
try {
    if (!pool.awaitTermination(60, TimeUnit.SECONDS)) {
        pool.shutdownNow(); // forțează dacă timeout
    }
} catch (InterruptedException e) {
    pool.shutdownNow();
    Thread.currentThread().interrupt();
}

// Virtual threads (Java 21) — milioane ușor
try (var vExec = Executors.newVirtualThreadPerTaskExecutor()) {
    for (int i = 0; i < 10_000; i++) {
        vExec.submit(() -> handleRequest());
    }
} // close() === shutdown + awaitTermination
\`\`\`

• **start()** creează un nou thread; **run()** execută pe thread-ul curent (nu face ce crezi)
• **interrupt()** setează un flag; metoda care primește InterruptedException trebuie să-l restaureze
• **ExecutorService** față de Thread manual — pool, refolosire, monitorizare, shutdown corect`);

await up('Multithreading', 'Synchronization', `**Sincronizarea și Concurența** în Java — mecanismele pentru a evita race conditions, deadlock-uri și pentru a gestiona accesul simultan la date partajate.

**Race condition și synchronized**

\`\`\`java
// Race condition — counter nesigur în multithreading
class UnsafeCounter {
    private int count = 0;
    void increment() { count++; } // read-modify-write NU este atomic!
}

// CORECT 1: synchronized pe metodă
class SafeCounter {
    private int count = 0;
    synchronized void increment() { count++; } // lock pe this
    synchronized int get() { return count; }
}

// CORECT 2: synchronized pe bloc (mai granular)
class BlockCounter {
    private int count = 0;
    private final Object lock = new Object();

    void increment() {
        synchronized (lock) { count++; }
    }
}

// CORECT 3: AtomicInteger (lockless, mai performant)
import java.util.concurrent.atomic.*;
AtomicInteger atomicCounter = new AtomicInteger(0);
atomicCounter.incrementAndGet();
atomicCounter.addAndGet(5);
int val = atomicCounter.compareAndSet(10, 20) ? 20 : atomicCounter.get();
\`\`\`

**volatile și visibility**

\`\`\`java
// volatile — garantează vizibilitate între threaduri (nu atomicitate!)
class StopFlag {
    private volatile boolean running = true; // fără volatile: caching în registre

    void stop() { running = false; }

    void run() {
        while (running) { // fiecare thread vede valoarea actuală
            doWork();
        }
    }
}
\`\`\`

**java.util.concurrent — unelte avansate**

\`\`\`java
// ReentrantLock — lock mai flexibil decât synchronized
ReentrantLock lock = new ReentrantLock();
lock.lock();
try {
    // secțiune critică
} finally {
    lock.unlock(); // mereu în finally!
}

// tryLock cu timeout
if (lock.tryLock(100, TimeUnit.MILLISECONDS)) {
    try { doWork(); } finally { lock.unlock(); }
} else {
    // nu am obținut lock-ul — handle
}

// ReadWriteLock — citiri paralele, scrieri exclusive
ReadWriteLock rwLock = new ReentrantReadWriteLock();
rwLock.readLock().lock();  // mai mulți cititori simultan
try { readData(); } finally { rwLock.readLock().unlock(); }

rwLock.writeLock().lock(); // scriitor exclusiv
try { writeData(); } finally { rwLock.writeLock().unlock(); }
\`\`\`

**ConcurrentCollections**

\`\`\`java
// Thread-safe collections
ConcurrentHashMap<String, Integer> map = new ConcurrentHashMap<>();
map.put("key", 1);
map.computeIfAbsent("key2", k -> expensiveCalc(k)); // atomic

CopyOnWriteArrayList<String> list = new CopyOnWriteArrayList<>();
// Sigur pentru iterare cu modificări concurrent (copie la fiecare write)

BlockingQueue<Task> queue = new LinkedBlockingQueue<>(100);
queue.put(task);      // blochează dacă plin
Task t = queue.take(); // blochează dacă gol

// CountDownLatch — sincronizare pentru N thread-uri
CountDownLatch latch = new CountDownLatch(3);
for (int i = 0; i < 3; i++) {
    executor.submit(() -> { doWork(); latch.countDown(); });
}
latch.await(); // blochează până la 3 countDown() apeluri
\`\`\`

• **synchronized** este reentrant pe același thread — nu provoacă deadlock dacă același thread apelează metodă sync din metodă sync
• **Deadlock**: A ține lock1, vrea lock2; B ține lock2, vrea lock1 — evită prin ordonare consistentă a lock-urilor
• **Preferă** ConcurrentHashMap/AtomicInteger față de synchronized manual — mai eficient`);

await up('Design Patterns in Java', 'Structural and Behavioral Patterns', `**Design Patterns Structural și Behavioral** — soluții reutilizabile pentru probleme comune de arhitectură software, implementate idiomaticîn Java modern.

**Adapter — compatibilitate între interfețe incompatibile**

\`\`\`java
// Interfață nouă
interface JsonSerializer { String toJson(Object obj); }

// Clasă existentă cu API diferit
class XmlConverter { String convertToXml(Object o) { return "<xml/>"; } }

// Adapter: face XmlConverter să arate ca JsonSerializer
class XmlToJsonAdapter implements JsonSerializer {
    private final XmlConverter xmlConverter;
    XmlToJsonAdapter(XmlConverter xc) { this.xmlConverter = xc; }

    @Override
    public String toJson(Object obj) {
        String xml = xmlConverter.convertToXml(obj);
        return convertXmlToJson(xml); // transformare
    }
}
\`\`\`

**Decorator — adaugă comportament fără moștenire**

\`\`\`java
interface Logger { void log(String message); }

class ConsoleLogger implements Logger {
    @Override public void log(String msg) { System.out.println(msg); }
}

// Decorator abstract
abstract class LoggerDecorator implements Logger {
    protected final Logger wrapped;
    LoggerDecorator(Logger logger) { this.wrapped = logger; }
}

class TimestampLogger extends LoggerDecorator {
    TimestampLogger(Logger logger) { super(logger); }
    @Override public void log(String msg) {
        wrapped.log(LocalDateTime.now() + " | " + msg);
    }
}

class PrefixLogger extends LoggerDecorator {
    private final String prefix;
    PrefixLogger(Logger logger, String prefix) {
        super(logger); this.prefix = prefix;
    }
    @Override public void log(String msg) { wrapped.log("[" + prefix + "] " + msg); }
}

// Compunere decorators
Logger logger = new TimestampLogger(new PrefixLogger(new ConsoleLogger(), "APP"));
logger.log("Aplicație pornită"); // 2025-05-24T14:30:00 | [APP] Aplicație pornită
\`\`\`

**Observer — notificări event-driven**

\`\`\`java
// EventBus simplu cu Map<event, listeners>
public class EventBus {
    private final Map<Class<?>, List<Consumer<Object>>> handlers = new ConcurrentHashMap<>();

    @SuppressWarnings("unchecked")
    public <T> void subscribe(Class<T> eventType, Consumer<T> handler) {
        handlers.computeIfAbsent(eventType, k -> new CopyOnWriteArrayList<>())
                .add((Consumer<Object>) handler);
    }

    public void publish(Object event) {
        handlers.getOrDefault(event.getClass(), List.of())
                .forEach(h -> h.accept(event));
    }
}

// Utilizare
record UserRegisteredEvent(String userId, String email) {}

EventBus bus = new EventBus();
bus.subscribe(UserRegisteredEvent.class, e -> sendWelcomeEmail(e.email()));
bus.subscribe(UserRegisteredEvent.class, e -> createDefaultProfile(e.userId()));
bus.publish(new UserRegisteredEvent("u1", "ana@example.com"));
\`\`\`

**Strategy — algoritmi interschimbabili**

\`\`\`java
// Strategy interface
interface SortStrategy<T> { List<T> sort(List<T> items, Comparator<T> comp); }

// Strategii concrete
class QuickSort<T> implements SortStrategy<T> {
    @Override public List<T> sort(List<T> items, Comparator<T> comp) {
        var list = new ArrayList<>(items);
        list.sort(comp); return list;
    }
}

// Context
class DataProcessor<T> {
    private SortStrategy<T> strategy;
    DataProcessor(SortStrategy<T> strategy) { this.strategy = strategy; }
    void setStrategy(SortStrategy<T> s) { this.strategy = s; } // runtime switch

    List<T> process(List<T> data, Comparator<T> comp) {
        return strategy.sort(data, comp);
    }
}

// Cu lambda (Strategy = functional interface de obicei)
DataProcessor<String> proc = new DataProcessor<>((items, comp) -> {
    var list = new ArrayList<>(items); list.sort(comp); return list;
});
\`\`\`

• **Adapter** pentru compatibilitate cu cod legacy; **Decorator** pentru funcționalitate adițională fără subclasare
• **Observer/EventBus** pentru decuplare — publisher nu cunoaște subscribers
• **Strategy** cu lambda în Java modern — FunctionalInterface înlocuiește clasele concrete`);

await up('Java I/O and NIO', 'File I/O', `**File I/O cu java.nio.file** (NIO.2) este API-ul modern pentru operații cu fișiere în Java — Path, Files și FileSystem oferă metode concise, cross-platform și puternic tipizate.

**Clasa Path — reprezentarea căilor**

\`\`\`java
import java.nio.file.*;

// Creare Path
Path p1 = Path.of("src/main/resources/config.json"); // relative
Path p2 = Path.of("/var/log/app/app.log");            // absolute
Path p3 = Path.of("C:\\Users\\Admin\\docs");          // Windows

// Operații pe Path
p1.getFileName(); // config.json
p1.getParent();   // src/main/resources
p1.getRoot();     // null (relative), / sau C:\ (absolute)
p2.toString();    // /var/log/app/app.log
p1.toAbsolutePath(); // cale absolută bazată pe cwd

// Rezolvare și relativizare
Path base = Path.of("/home/user");
Path full = base.resolve("docs/report.pdf"); // /home/user/docs/report.pdf
Path rel = base.relativize(full);            // docs/report.pdf

// Normalizare
Path messy = Path.of("/home/user/../user/./docs");
messy.normalize(); // /home/user/docs
\`\`\`

**Citire și scriere cu Files**

\`\`\`java
Path file = Path.of("data.txt");
Path output = Path.of("output.txt");

// Citire completă (fișiere mici)
String content = Files.readString(file, StandardCharsets.UTF_8);
List<String> lines = Files.readAllLines(file, StandardCharsets.UTF_8);
byte[] bytes = Files.readAllBytes(file);

// Scriere completă
Files.writeString(output, "Hello, NIO!", StandardCharsets.UTF_8);
Files.write(output, List.of("Linia 1", "Linia 2"), StandardCharsets.UTF_8,
    StandardOpenOption.CREATE, StandardOpenOption.APPEND);

// Append la fișier existent
Files.writeString(output, "\\nLinie nouă", StandardOpenOption.APPEND);

// Stream leneș pentru fișiere mari
try (Stream<String> lines2 = Files.lines(file, StandardCharsets.UTF_8)) {
    lines2.filter(l -> l.startsWith("#"))
          .map(l -> l.substring(1).trim())
          .forEach(System.out::println);
}
\`\`\`

**Operații pe fișiere și directoare**

\`\`\`java
Path src = Path.of("original.txt");
Path dst = Path.of("copy.txt");
Path dir = Path.of("newdir/subdir");

// Verificări
Files.exists(src);           // existențăFiles.isRegularFile(src);    // fișier?
Files.isDirectory(dir);      // director?
Files.isReadable(src);       // permisiuni

// Operații
Files.createDirectories(dir); // creare director + părinți (ca mkdir -p)
Files.copy(src, dst, StandardCopyOption.REPLACE_EXISTING);
Files.move(src, dst.resolve("moved.txt"), StandardCopyOption.ATOMIC_MOVE);
Files.delete(src);            // aruncă IOException dacă nu există
Files.deleteIfExists(src);    // mai sigur

// Metadata
BasicFileAttributes attrs = Files.readAttributes(src, BasicFileAttributes.class);
attrs.creationTime();
attrs.lastModifiedTime();
attrs.size(); // bytes
\`\`\`

• **Path.of()** față de **new File()** — NIO2 este API-ul modern și recomandat
• **StandardCharsets.UTF_8** — specificați mereu charset pentru portabilitate
• **Files.lines()** returnează Stream leneș — trebuie închis cu try-with-resources`);

await up('Java I/O and NIO', 'Directory Operations', `**Operații cu directoare și traversarea arborilor** în NIO.2 permit listarea, căutarea și procesarea structurilor de fișiere recursive cu API-uri concise și eficiente.

**Listarea conținutului unui director**

\`\`\`java
Path dir = Path.of("src/main/java");

// Listare simplă (un nivel)
try (Stream<Path> stream = Files.list(dir)) {
    stream.filter(Files::isRegularFile)
          .filter(p -> p.toString().endsWith(".java"))
          .forEach(System.out::println);
}

// Newline-separated listing
List<Path> javaFiles = Files.list(dir)
    .filter(p -> p.getFileName().toString().endsWith(".java"))
    .sorted()
    .collect(Collectors.toList());
\`\`\`

**Walk — traversare recursivă**

\`\`\`java
// Files.walk() — recursiv, lazy stream
try (Stream<Path> walk = Files.walk(dir)) {
    walk.filter(Files::isRegularFile)
        .filter(p -> p.toString().endsWith(".java"))
        .forEach(p -> System.out.println(p));
}

// Cu limită de adâncime
try (Stream<Path> walk = Files.walk(dir, 2)) { // maxim 2 niveluri
    walk.forEach(System.out::println);
}

// Statistici pe director
try (Stream<Path> walk = Files.walk(dir)) {
    long totalSize = walk
        .filter(Files::isRegularFile)
        .mapToLong(p -> {
            try { return Files.size(p); }
            catch (IOException e) { return 0; }
        })
        .sum();
    System.out.printf("Dimensiune totală: %.2f MB%n", totalSize / 1_048_576.0);
}
\`\`\`

**FileVisitor — procesare avansată**

\`\`\`java
// Implementare FileVisitor pentru control total
Files.walkFileTree(dir, new SimpleFileVisitor<Path>() {
    @Override
    public FileVisitResult visitFile(Path file, BasicFileAttributes attrs) {
        if (file.toString().endsWith(".class")) {
            try { Files.delete(file); System.out.println("Șters: " + file); }
            catch (IOException e) { System.err.println("Nu pot șterge: " + file); }
        }
        return FileVisitResult.CONTINUE;
    }

    @Override
    public FileVisitResult preVisitDirectory(Path dir, BasicFileAttributes attrs) {
        System.out.println("Intrare director: " + dir);
        return FileVisitResult.CONTINUE; // sau SKIP_SUBTREE
    }

    @Override
    public FileVisitResult visitFileFailed(Path file, IOException exc) {
        System.err.println("Eroare la: " + file + " — " + exc.getMessage());
        return FileVisitResult.CONTINUE; // sau TERMINATE
    }
});
\`\`\`

**Copiere și ștergere recursivă**

\`\`\`java
// Copiere director recursiv
public static void copyDirectory(Path src, Path dst) throws IOException {
    Files.walk(src).forEach(source -> {
        try {
            Path destination = dst.resolve(src.relativize(source));
            if (Files.isDirectory(source)) {
                Files.createDirectories(destination);
            } else {
                Files.copy(source, destination, StandardCopyOption.REPLACE_EXISTING);
            }
        } catch (IOException e) {
            throw new UncheckedIOException(e);
        }
    });
}

// Ștergere director recursiv
public static void deleteDirectory(Path dir) throws IOException {
    if (!Files.exists(dir)) return;
    try (Stream<Path> walk = Files.walk(dir)) {
        walk.sorted(Comparator.reverseOrder()) // fișierele înaintea directorului
            .forEach(p -> {
                try { Files.delete(p); }
                catch (IOException e) { throw new UncheckedIOException(e); }
            });
    }
}
\`\`\`

• **Files.walk()** folosit cu try-with-resources — stream-ul trebuie închis
• **FileVisitResult** controlează traversarea: CONTINUE, SKIP_SUBTREE, SKIP_SIBLINGS, TERMINATE
• **Sorted(reverseOrder)** la ștergere recursivă — fișierele se șterg înaintea directorului`);

  console.log('Done script 6.');
  await p.$disconnect();
}

run().catch(e => { console.error(e); p.$disconnect(); process.exit(1); });
