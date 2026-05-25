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

await up('Collections Framework', 'List, Set', `**List, Set și Map** sunt cele trei interfețe principale ale Java Collections Framework — fiecare cu semantică distinctă și implementări cu trade-off-uri diferite.

**List — colecție ordonată cu duplicate**

\`\`\`java
// ArrayList — array dinamic O(1) get, O(n) insert la mijloc
List<String> al = new ArrayList<>(Arrays.asList("Ana", "Bob", "Carol"));
al.add("David");
al.add(1, "Alex");          // insert la index
al.remove("Bob");           // remove by value
al.remove(0);               // remove by index
al.set(0, "Anna");          // replace at index
al.subList(1, 3);           // view, nu copie!
Collections.sort(al);
Collections.sort(al, Comparator.reverseOrder());

// LinkedList — O(1) la capete, O(n) acces random
LinkedList<Integer> ll = new LinkedList<>();
ll.addFirst(1); ll.addLast(3); ll.add(1, 2);
ll.removeFirst(); ll.removeLast();

// Imuabile (Java 9+)
List<String> fixed = List.of("a", "b", "c"); // UnsupportedOperationException la modificare
List<String> copy = List.copyOf(fixed);       // copie imuabilă
\`\`\`

**Set — colecție fără duplicate**

\`\`\`java
// HashSet — O(1) add/remove/contains, ordine nedeterministă
Set<String> hs = new HashSet<>();
hs.add("Ana"); hs.add("Bob"); hs.add("Ana"); // ignorat
System.out.println(hs.size()); // 2

// TreeSet — O(log n), sortat natural sau cu Comparator
Set<Integer> ts = new TreeSet<>(Set.of(5, 3, 1, 4, 2));
System.out.println(ts); // [1, 2, 3, 4, 5]
NavigableSet<Integer> nav = (TreeSet<Integer>) ts;
nav.headSet(3); // {1, 2}
nav.tailSet(3); // {3, 4, 5}
nav.floor(3);   // 3 (cel mai mare <= 3)
nav.ceiling(4); // 4 (cel mai mic >= 4)

// LinkedHashSet — O(1), menține ordinea de inserare
Set<String> lhs = new LinkedHashSet<>(Arrays.asList("Carol", "Ana", "Bob"));
System.out.println(lhs); // [Carol, Ana, Bob]

// Operații pe mulțimi
Set<Integer> a = new HashSet<>(Set.of(1, 2, 3, 4));
Set<Integer> b = new HashSet<>(Set.of(3, 4, 5, 6));
Set<Integer> union = new HashSet<>(a); union.addAll(b);          // {1,2,3,4,5,6}
Set<Integer> intersection = new HashSet<>(a); intersection.retainAll(b); // {3,4}
Set<Integer> difference = new HashSet<>(a); difference.removeAll(b);     // {1,2}
\`\`\`

**Alegerea implementării**

\`\`\`java
// ArrayList vs LinkedList
// ArrayList: acces random frecvent, adăugare la final
// LinkedList: adăugare/ștergere la capete frecvente (Queue/Deque)

// HashSet vs TreeSet vs LinkedHashSet
// HashSet: performanță maximă, ordine nu contează
// TreeSet: iterare în ordine naturală / custom
// LinkedHashSet: iterare în ordinea inserării

// Preferă List.of() și Set.of() pentru imuabile:
List<String> menu = List.of("Pizza", "Paste", "Salată");
Set<String> validRoles = Set.of("ADMIN", "USER", "MODERATOR");
\`\`\`

• **ArrayList** este default — folosit în 90% din cazuri
• **HashSet.contains()** este O(1) vs **ArrayList.contains()** O(n) — alege structura potrivită
• **equals() și hashCode()** trebuie implementate consistent pentru obiecte în HashSet/HashMap`);

await up('Collections Framework', 'Map Interface', `**Map Interface** în Java permite stocarea perechilor cheie-valoare — fundamentală pentru lookup rapid, grupare și caching. Implementările diferă în ordine, performanță și thread-safety.

**HashMap — implementarea de bază**

\`\`\`java
Map<String, Integer> scores = new HashMap<>();
scores.put("Ana", 95);
scores.put("Bob", 87);
scores.put("Carol", 92);

// Acces
int ana = scores.get("Ana");              // 95
int alex = scores.getOrDefault("Alex", 0); // 0 (default)
boolean hasAna = scores.containsKey("Ana"); // true
boolean has95 = scores.containsValue(95);   // true

// Modificare
scores.put("Ana", 98);                    // suprascrie
scores.putIfAbsent("David", 88);          // nu suprascrie dacă există
scores.replace("Bob", 87, 90);            // replace condițional
scores.computeIfAbsent("Eve", k -> 75);   // calculează dacă lipsește
scores.compute("Ana", (k, v) -> v == null ? 100 : v + 5); // +5 la Ana
scores.merge("Bob", 10, Integer::sum);    // 90 + 10 = 100

// Iterare
for (Map.Entry<String, Integer> e : scores.entrySet()) {
    System.out.printf("%s: %d%n", e.getKey(), e.getValue());
}
scores.forEach((name, score) -> System.out.printf("%s: %d%n", name, score));
scores.keySet().forEach(System.out::println);
scores.values().stream().mapToInt(Integer::intValue).average();
\`\`\`

**TreeMap și LinkedHashMap**

\`\`\`java
// TreeMap — sortat după chei (natural order)
Map<String, Integer> sorted = new TreeMap<>(scores);
NavigableMap<String, Integer> nav = new TreeMap<>(scores);
nav.firstKey();           // "Ana" (prima cheie)
nav.lastKey();            // ultima cheie
nav.headMap("C");         // toate cheile < "C"
nav.floorKey("Bob");      // cea mai mare cheie <= "Bob"

// LinkedHashMap — menține ordinea inserării
Map<String, Integer> ordered = new LinkedHashMap<>();
ordered.put("Carol", 92);
ordered.put("Ana", 95);
System.out.println(ordered.keySet()); // [Carol, Ana] (ordine inserare)

// LRU cache cu LinkedHashMap
Map<String, Object> lruCache = new LinkedHashMap<>(16, 0.75f, true) {
    @Override
    protected boolean removeEldestEntry(Map.Entry eldest) {
        return size() > 100; // capacitate maximă 100 intrări
    }
};
\`\`\`

**Operații avansate**

\`\`\`java
// Grouping cu computeIfAbsent
Map<String, List<String>> byDept = new HashMap<>();
employees.forEach(emp ->
    byDept.computeIfAbsent(emp.dept(), k -> new ArrayList<>()).add(emp.name())
);

// Sau cu streams:
Map<String, List<Employee>> grouped = employees.stream()
    .collect(Collectors.groupingBy(Employee::dept));

// Frequency map
List<String> words = List.of("ana", "bob", "ana", "carol", "bob", "ana");
Map<String, Long> freq = words.stream()
    .collect(Collectors.groupingBy(w -> w, Collectors.counting()));
// {ana=3, bob=2, carol=1}
\`\`\`

• **computeIfAbsent** este mai eficient decât containsKey + put — o singură căutare
• **merge** este ideal pentru contorizare: \`map.merge(key, 1, Integer::sum)\`
• **Collections.unmodifiableMap(map)** sau **Map.copyOf(map)** pentru viste/copii read-only`);

await up('Collections Framework', 'Queue, Deque', `**Queue, Deque și Stack** sunt structuri de date pentru procesare ordonată — FIFO pentru cozi, LIFO pentru stive, și double-ended pentru ambele operații.

**Queue — First In First Out**

\`\`\`java
// Queue — interfața principală
Queue<String> queue = new LinkedList<>();
queue.offer("primul");   // adaugă (prefer offer față de add — nu aruncă exception)
queue.offer("al doilea");
queue.offer("al treilea");

String head = queue.peek();  // citește fără a scoate → "primul"
String out  = queue.poll();  // scoate și returnează → "primul"
int size    = queue.size();   // 2

// Procesare completă
while (!queue.isEmpty()) {
    String item = queue.poll();
    process(item);
}

// ArrayDeque — mai performant decât LinkedList pentru Queue
Queue<Integer> aq = new ArrayDeque<>();
aq.offer(1); aq.offer(2); aq.offer(3);
aq.poll(); // 1
\`\`\`

**PriorityQueue — coadă cu prioritate**

\`\`\`java
// Min-heap default (cel mai mic element iese primul)
PriorityQueue<Integer> pq = new PriorityQueue<>();
pq.offer(5); pq.offer(1); pq.offer(3); pq.offer(2);
while (!pq.isEmpty()) System.out.print(pq.poll() + " "); // 1 2 3 5

// Max-heap cu Comparator
PriorityQueue<Integer> maxPq = new PriorityQueue<>(Comparator.reverseOrder());
maxPq.offer(5); maxPq.offer(1); maxPq.offer(3);
maxPq.poll(); // 5

// Priority queue pe obiecte custom
PriorityQueue<Task> tasks = new PriorityQueue<>(
    Comparator.comparingInt(Task::priority).reversed() // prioritate mare = iese primul
);
tasks.offer(new Task("Email", 1));
tasks.offer(new Task("Bug critic", 5));
tasks.poll(); // Bug critic (prioritate 5)
\`\`\`

**Deque — Double Ended Queue**

\`\`\`java
// Deque — operații la ambele capete
Deque<String> deque = new ArrayDeque<>();
deque.addFirst("A");   // [A]
deque.addLast("B");    // [A, B]
deque.addFirst("Z");   // [Z, A, B]
deque.addLast("C");    // [Z, A, B, C]

deque.peekFirst(); // "Z" — fără scoatere
deque.peekLast();  // "C"
deque.pollFirst(); // "Z" — scoate
deque.pollLast();  // "C" — scoate

// Deque ca Stack (LIFO)
Deque<Integer> stack = new ArrayDeque<>();
stack.push(1); stack.push(2); stack.push(3); // addFirst
stack.pop();   // 3 — removeFirst
stack.peek();  // 2 — peekFirst
// Prefer ArrayDeque față de java.util.Stack (synchronized, legacy)
\`\`\`

**Aplicație: BFS cu Queue**

\`\`\`java
// Breadth-First Search cu Queue
List<Integer> bfs(Map<Integer, List<Integer>> graph, int start) {
    List<Integer> visited = new ArrayList<>();
    Set<Integer> seen = new HashSet<>();
    Queue<Integer> queue = new ArrayDeque<>();

    queue.offer(start);
    seen.add(start);

    while (!queue.isEmpty()) {
        int node = queue.poll();
        visited.add(node);
        for (int neighbor : graph.getOrDefault(node, List.of())) {
            if (!seen.contains(neighbor)) {
                seen.add(neighbor);
                queue.offer(neighbor);
            }
        }
    }
    return visited;
}
\`\`\`

• **ArrayDeque** este implementarea recomandată pentru atât Queue cât și Stack — mai rapid decât LinkedList
• **PriorityQueue** nu garantează ordine la iterare — folosește poll() repetat pentru ordine
• Nu folosi **java.util.Stack** (legacy, synchronized) — folosește **Deque** ca stack`);

await up('Generics in Java', 'Generic Classes', `**Generics în Java** permit scrierea de cod reutilizabil și type-safe — elimini cast-urile manuale și prinzi erorile de tip la compilare, nu la runtime.

**Clase și metode generice**

\`\`\`java
// Clasă generică — tipul T e parametru
public class Box<T> {
    private T value;

    public Box(T value) { this.value = value; }
    public T get() { return value; }
    public void set(T value) { this.value = value; }

    @Override
    public String toString() { return "Box[" + value + "]"; }
}

Box<String> strBox = new Box<>("Hello");
Box<Integer> intBox = new Box<>(42);
String s = strBox.get(); // no cast needed!
// strBox.set(42); // compilation error — type safety!

// Metodă generică — tip inferred din argumente
public static <T> List<T> repeat(T item, int times) {
    List<T> result = new ArrayList<>(times);
    for (int i = 0; i < times; i++) result.add(item);
    return result;
}

List<String> words = repeat("hello", 3); // ["hello", "hello", "hello"]
List<Integer> nums = repeat(0, 5);       // [0, 0, 0, 0, 0]
\`\`\`

**Generic Pair și Triple**

\`\`\`java
// Pereche de tipuri diferite
public record Pair<A, B>(A first, B second) {
    public static <A, B> Pair<A, B> of(A a, B b) { return new Pair<>(a, b); }

    public Pair<B, A> swap() { return new Pair<>(second, first); }
}

Pair<String, Integer> p = Pair.of("Ana", 30);
System.out.println(p.first() + " are " + p.second() + " ani");
Pair<Integer, String> swapped = p.swap();
\`\`\`

**Container Result/Either pentru error handling**

\`\`\`java
// Result<T, E> — success sau eroare type-safe
public sealed interface Result<T, E extends Exception> {
    record Success<T, E extends Exception>(T value) implements Result<T, E> {}
    record Failure<T, E extends Exception>(E error) implements Result<T, E> {}

    static <T, E extends Exception> Result<T, E> success(T value) {
        return new Success<>(value);
    }
    static <T, E extends Exception> Result<T, E> failure(E error) {
        return new Failure<>(error);
    }
}

Result<User, UserNotFoundException> find(int id) {
    return userRepo.findById(id)
        .map(Result::<User, UserNotFoundException>success)
        .orElse(Result.failure(new UserNotFoundException(id)));
}

// Utilizare
switch (find(1)) {
    case Result.Success<User, ?> s -> displayUser(s.value());
    case Result.Failure<?, ?> f    -> showError(f.error().getMessage());
}
\`\`\`

**Type erasure — limitări generics**

\`\`\`java
// La runtime tipul generic e STERS (type erasure)
List<String> strings = new ArrayList<>();
List<Integer> ints = new ArrayList<>();
// strings.getClass() == ints.getClass() → true (ambele ArrayList)

// NU poți face:
// new T();          // compile error
// T[] array = new T[10]; // compile error
// instanceof List<String> // compile error

// DAR poți:
Class<T> clazz = ...; // primit ca parametru
T instance = clazz.getDeclaredConstructor().newInstance();
\`\`\`

• **Generics** sunt compile-time only — la runtime tipul e șters (type erasure)
• Convenție: T=Type, E=Element, K=Key, V=Value, R=Return, N=Number
• **Prefer generic methods** față de cast-uri — codul e mai sigur și mai clar`);

await up('Generics in Java', 'Bounded Type Parameters', `**Bounded Type Parameters și Wildcards** extind generics pentru a restricționa tipurile acceptate și pentru a lucra cu ierarhii de clase în mod flexibil.

**Upper Bounded Wildcards — extends**

\`\`\`java
// ? extends T — accept T sau orice subclasă a lui T (PRODUCER)
public double sumList(List<? extends Number> list) {
    double sum = 0;
    for (Number n : list) sum += n.doubleValue();
    return sum;
}

sumList(List.of(1, 2, 3));         // List<Integer> — OK
sumList(List.of(1.5, 2.5, 3.5));  // List<Double> — OK
sumList(List.of(1L, 2L, 3L));     // List<Long> — OK

// Atenție: nu poți adăuga la List<? extends Number> (compilatorul refuză)
// list.add(1); // COMPILE ERROR — nu se știe tipul exact
\`\`\`

**Lower Bounded Wildcards — super**

\`\`\`java
// ? super T — accept T sau orice superclasă a lui T (CONSUMER)
public void addNumbers(List<? super Integer> list) {
    list.add(1); list.add(2); list.add(3); // OK — adaugi Integer
}

List<Integer> intList = new ArrayList<>();
List<Number> numList = new ArrayList<>();
List<Object> objList = new ArrayList<>();
addNumbers(intList);  // OK
addNumbers(numList);  // OK
addNumbers(objList);  // OK
// addNumbers(List<Double>); // COMPILE ERROR — Double nu e super Integer

// PECS: Producer Extends, Consumer Super
// Lista care PRODUCE valori → ? extends T
// Lista care CONSUMĂ valori → ? super T
static <T> void copy(List<? extends T> src, List<? super T> dst) {
    for (T item : src) dst.add(item);
}
\`\`\`

**Bounded Type Parameters pe clase**

\`\`\`java
// T extends Comparable<T> — garantează că T poate fi comparat
public static <T extends Comparable<T>> T findMax(List<T> list) {
    if (list.isEmpty()) throw new IllegalArgumentException("Lista goală");
    T max = list.get(0);
    for (T item : list) {
        if (item.compareTo(max) > 0) max = item;
    }
    return max;
}

String maxStr = findMax(List.of("Ana", "Carol", "Bob")); // "Carol"
int maxInt = findMax(List.of(3, 1, 4, 1, 5, 9, 2, 6));  // 9

// Multiple bounds
public <T extends Comparable<T> & Cloneable> T process(T item) {
    // T implementează ambele interfețe
    return item;
}
\`\`\`

**Generic Stack implementare**

\`\`\`java
public class Stack<T> {
    private final Deque<T> storage = new ArrayDeque<>();

    public void push(T item) { storage.push(item); }
    public T pop() {
        if (isEmpty()) throw new EmptyStackException();
        return storage.pop();
    }
    public T peek() {
        if (isEmpty()) throw new EmptyStackException();
        return storage.peek();
    }
    public boolean isEmpty() { return storage.isEmpty(); }
    public int size() { return storage.size(); }

    // Generic utility method
    public <R> Stack<R> map(Function<T, R> transform) {
        Stack<R> result = new Stack<>();
        storage.forEach(item -> result.push(transform.apply(item)));
        return result;
    }
}

Stack<String> stack = new Stack<>();
stack.push("Hello"); stack.push("World");
Stack<Integer> lengths = stack.map(String::length); // [5, 5]
\`\`\`

• **PECS**: Producer Extends (citești din colecție), Consumer Super (scrii în colecție)
• Wildcards (\`?\`) sunt pentru utilizare la apel; bounded params (\`T extends X\`) pentru declararea metodelor/claselor
• **Unbounded wildcard** \`List<?>\` — doar citit ca Object, util pentru metode care nu știu tipul`);

  console.log('Done script 4.');
  await p.$disconnect();
}

run().catch(e => { console.error(e); p.$disconnect(); process.exit(1); });
