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

await up('Java Performance', 'String Performance', `**String Performance în Java** — optimizarea operațiilor cu șiruri de caractere este critică deoarece String este imuabil și concatenarea naivă creează obiecte intermediare.

**Imuabilitatea String și String Pool**

\`\`\`java
// String este imuabil — fiecare operație creează un nou obiect
String s = "Hello";
s.toUpperCase(); // s NU s-a schimbat! Returnează un nou string
String upper = s.toUpperCase(); // "HELLO" — nou obiect

// String Pool — cache intern pentru literals
String a = "Ana";
String b = "Ana";
System.out.println(a == b); // true — același obiect din pool

String c = new String("Ana"); // forțează obiect nou (evită!)
System.out.println(a == c);   // false — obiect diferit
System.out.println(a.equals(c)); // true — valorile egale

// intern() — forțează intrarea în pool
String d = new String("Bob").intern();
String e = "Bob";
System.out.println(d == e); // true — acum sunt același obiect
\`\`\`

**Concatenare eficientă**

\`\`\`java
// Concatenare cu + în bucle — O(n²), N obiecte intermediare
String result = "";
for (int i = 0; i < 10000; i++) result += i; // LENT!

// StringBuilder — O(n), mutable buffer
StringBuilder sb = new StringBuilder(50000); // capacity pentru evita resize-uri
for (int i = 0; i < 10000; i++) sb.append(i);
String result2 = sb.toString();

// Diferența: 10K iterații → naiv ~250ms, StringBuilder ~5ms
// La compilare, Java optimizează + la StringBuilder NUMAI dacă nu e în buclă

// StringJoiner pentru separatori
StringJoiner sj = new StringJoiner(", ", "[", "]");
names.forEach(sj::add);
String joined = sj.toString(); // [Ana, Bob, Carol]

// Stream joining — cel mai modern
String csv = names.stream().collect(Collectors.joining(", "));
\`\`\`

**String interning și deduplicare**

\`\`\`java
// JVM flag pentru deduplicare automată a string-urilor (JVM heap)
// -XX:+UseStringDeduplication (cu G1GC)
// Util dacă ai mii de string-uri duplicate în memorie (ex: parsing CSV-uri mari)

// Manualintern() pentru string-uri duplicate știute
String[] emails = readMillionEmails(); // email-uri repetitive
for (int i = 0; i < emails.length; i++) {
    emails[i] = emails[i].intern(); // partajează instanțele identice
}
\`\`\`

**Formatare performantă**

\`\`\`java
// String.format() este lent (regex intern) — evită în cod hot-path
// Pentru logging: folosești SLF4J cu {} placeholders (nu formatează dacă log level off)
logger.debug("Processing user {} with {} items", userId, count); // lazy!
// vs: logger.debug("Processing user " + userId + "..."); // concatenare mereu

// Comparare case-insensitive fără lowercase
"ANA".equalsIgnoreCase("ana"); // mai eficient decât toLowerCase().equals()

// startsWith/endsWith vs substring+equals
path.endsWith(".java"); // eficient
// vs: path.substring(path.length()-5).equals(".java"); // evita substring!

// contains vs indexOf
if (text.contains("keyword")) { } // clar
if (text.indexOf("keyword") >= 0) { } // echivalent, uneori mai rapid
\`\`\`

• **StringBuilder** pentru concatenare în bucle sau cod cu mulți operanzi
• **Evita String.format() în hot paths** — preferi concatenare simplă sau SLF4J placeholders
• **String.intern()** cu prudență — pool-ul e limitat și GC-ul nu colectează ușor`);

await up('Java Performance', 'Memory Management', `**Memory Management și Profiling** în Java — înțelegerea heap, garbage collection și instrumentele pentru identificarea și rezolvarea problemelor de performanță.

**Structura memoriei JVM**

\`\`\`
JVM Memory
├── Heap (obiecte)
│   ├── Young Generation (new objects)
│   │   ├── Eden Space
│   │   └── Survivor Spaces (S0, S1)
│   └── Old Generation (long-lived objects)
├── Metaspace (class metadata — Java 8+, nu mai e PermGen)
├── Stack (frames per thread)
├── Native Memory (off-heap)
└── Code Cache (compiled bytecode)
\`\`\`

**Garbage Collection — tipuri**

\`\`\`
G1GC (default Java 9+):     -XX:+UseG1GC
ZGC (Java 15+, low latency): -XX:+UseZGC  → pause < 1ms
Shenandoah (Java 12+):       -XX:+UseShenandoahGC
Serial/Parallel (legacy):     -XX:+UseSerialGC
\`\`\`

**Optimizare heap și GC**

\`\`\`bash
# JVM flags comune pentru producție
java -Xms2g -Xmx2g            # heap fix (evita resize) = 2GB
     -XX:+UseG1GC
     -XX:MaxGCPauseMillis=200  # target pause time
     -XX:+HeapDumpOnOutOfMemoryError
     -XX:HeapDumpPath=/var/log/heapdump.hprof
     -Xlog:gc:file=/var/log/gc.log:time,uptime
     -jar myapp.jar
\`\`\`

**Memory Leaks — cauze comune**

\`\`\`java
// 1. Static collections care cresc necontrolat
static Map<String, Object> cache = new HashMap<>(); // NICIODATĂ eliberat!
// Fix: WeakHashMap sau bounded cache (Guava/Caffeine)

// 2. Listeners nederegistrați
button.addActionListener(listener);
// Fix: removeActionListener când componenta e distrusă

// 3. InnerClass ținând referință la outer class
class Outer {
    class Inner { } // Inner ține referință la Outer chiar dacă Outer nu mai e folosit
    // Fix: static class Inner {}
}

// 4. ThreadLocal nescurtat
ThreadLocal<Connection> connLocal = new ThreadLocal<>();
connLocal.set(conn);
// MEREU: connLocal.remove() în finally sau la finalul task-ului
\`\`\`

**Profiling cu JVM tools**

\`\`\`bash
# jcmd — comandă generală
jcmd <pid> VM.info
jcmd <pid> GC.run              # forțează GC
jcmd <pid> Thread.print        # thread dump
jcmd <pid> GC.heap_info        # info heap

# jstat — statistici GC live
jstat -gc <pid> 1000           # la fiecare secundă
jstat -gcutil <pid> 1000       # procente heap usage

# jmap — heap dump
jmap -dump:format=b,file=heap.hprof <pid>

# jstack — thread dump (deadlock detection)
jstack <pid>

# Async-profiler (open source, low overhead)
asprof -d 30 -f profile.html <pid>
\`\`\`

• **-Xms = -Xmx** în producție — evita heap resize care cauzează pause-uri
• **JVM ergonomics**: Java setează heap la 25% RAM implicit — ajustează pentru aplicații mari
• **Async-profiler** este instrumentul practic cel mai eficient — flame graphs pentru CPU și memory`);

await up('Java Performance', 'Best Practices', `**Best Practices Java** — checklist-ul de practici esențiale pentru cod corect, performant, sigur și ușor de întreținut în proiecte reale.

**Design și structură**

\`\`\`java
// 1. Favorizează compoziția față de moștenire
class EmailNotifier {
    private final SmtpSender sender;     // compoziție
    private final TemplateEngine engine;

    // vs: extends SmtpSender — coupling puternic
}

// 2. Programează la interfață, nu la implementare
List<String> list = new ArrayList<>();  // corect
// ArrayList<String> list = ...; // greșit — cuplezi la implementare

// 3. Imutabilitate — câmpuri finale când posibil
public final class Config {
    private final String host;
    private final int port;
    private final Duration timeout;

    public Config(String host, int port, Duration timeout) {
        this.host = Objects.requireNonNull(host);
        this.port = port;
        this.timeout = timeout;
    }
}
\`\`\`

**Null safety și Optional**

\`\`\`java
// 4. Evită returnarea null — returnează Optional sau colecție goală
public Optional<User> findByEmail(String email) { ... }
public List<User> findAll() { return Collections.emptyList(); } // nu null!

// 5. Fail fast cu preconditions
public void processOrder(Order order, int quantity) {
    Objects.requireNonNull(order, "order nu poate fi null");
    if (quantity <= 0) throw new IllegalArgumentException("quantity <= 0: " + quantity);
    // logic...
}
\`\`\`

**Colecții și streams**

\`\`\`java
// 6. Folosește colecții imuabile când nu ai nevoie de modificare
List<String> roles = List.of("ADMIN", "USER");    // Java 9+
Map<String, Integer> config = Map.of("timeout", 30, "retries", 3);

// 7. Prefer streams față de bucle imperative pentru transformări
List<String> names = users.stream()
    .filter(User::isActive)
    .map(User::getName)
    .sorted()
    .collect(Collectors.toList());

// 8. Dimensionează colecțiile inițial
List<Integer> list = new ArrayList<>(expectedSize); // evita resize
Map<String, Object> map = new HashMap<>(expectedSize * 4 / 3 + 1); // load factor
\`\`\`

**Concurență**

\`\`\`java
// 9. Preferi concurrent collections față de synchronized manual
ConcurrentHashMap<String, Integer> concurrent = new ConcurrentHashMap<>();
// vs: Collections.synchronizedMap(new HashMap<>()) — coarser locking

// 10. Închide ExecutorService după utilizare
try (var exec = Executors.newVirtualThreadPerTaskExecutor()) {
    exec.submit(task1); exec.submit(task2);
} // shutdown + awaitTermination automat

// 11. Volatile pentru flags de oprire (nu pentru operații compuse)
private volatile boolean running = true;
void stop() { running = false; }
\`\`\`

**Logging și monitorizare**

\`\`\`java
// 12. SLF4J cu placeholders — nu String.format în logger
log.debug("User {} logged in from {}", userId, ipAddress);  // lazy evaluation!
// vs: log.debug("User " + userId + " ..."); // concatenare mereu, chiar dacă DEBUG off

// 13. Log nivel potrivit
log.trace("Intrare metodă calcul");        // trace: debugging extrem
log.debug("Query: {} params: {}", sql, p); // debug: dev environment
log.info("Utilizator {} autentificat", id); // info: evenimente normale
log.warn("Retry tentativa {} din {}", n, max); // warn: recover posibil
log.error("Plată eșuată pentru order {}", orderId, ex); // error + excepție
\`\`\`

• **Sonar/Checkstyle** pentru verificare automată a convențiilor — configurare în CI/CD
• **Code review** + **pair programming** pentru a detecta anti-pattern-uri devreme
• **Profiling în producție** înainte de optimizare prematură — măsoară MEREU înainte`);

  console.log('Done script 9.');
  await p.$disconnect();
}

run().catch(e => { console.error(e); p.$disconnect(); process.exit(1); });
