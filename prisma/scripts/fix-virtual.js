const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();

const content = `**Virtual Threads** (Java 21) revoluționează concurența în Java — milioane de threaduri ușoare gestionate de JVM, perfect pentru aplicații I/O-bound fără complexitatea programării reactive.

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
• Au **același API** ca platform threads — codul existent funcționează cu schimbare minimă`;

(async () => {
  const lessons = await p.lesson.findMany({ where: { module: { slug: 'java' }, title: { contains: 'Virtual Threads and Modern' } } });
  const theory = await p.theory.findFirst({ where: { lessonId: { in: lessons.map(l => l.id) }, title: { contains: 'Virtual Threads' } } });
  if (!theory) { console.log('NOT FOUND'); await p.$disconnect(); return; }
  await p.theory.update({ where: { id: theory.id }, data: { content } });
  console.log(`✓ ${theory.title}: ${theory.content.length} → ${content.length}`);
  await p.$disconnect();
})();
