const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const tasks = [
  {
    slug: 'java-modern-features',
    name: 'Java modern: Records și Sealed classes',
    question: 'Folosind Java 16+: definește un record `Point(double x, double y)` cu o metodă distance(). Adaugă o sealed interface Shape cu implementări.',
    language: 'java',
    starterCode: 'public class Main {\n    record Point(double x, double y) {\n        double distance(Point other) {\n            double dx = x - other.x, dy = y - other.y;\n            return Math.sqrt(dx*dx + dy*dy);\n        }\n    }\n    \n    sealed interface Shape permits Circle, Rectangle {}\n    record Circle(Point center, double radius) implements Shape {}\n    record Rectangle(Point topLeft, double width, double height) implements Shape {}\n    \n    public static void main(String[] args) {\n        var p1 = new Point(0, 0);\n        var p2 = new Point(3, 4);\n        System.out.println(p1.distance(p2));\n        Shape s = new Circle(p1, 5.0);\n        System.out.println(s instanceof Circle c ? "Circle r=" + c.radius() : "other");\n    }\n}',
    expectedOutput: '5.0\nCircle r=5.0',
  },
  {
    slug: 'java-conditii-bucle-extra',
    name: 'Switch expression Java 14+',
    question: 'Folosind switch expression (->), convertește un int (1-7) în ziua săptămânii. Afișează zilele 1, 5, 7 și gestionează cazul invalid.',
    language: 'java',
    starterCode: 'public class Main {\n    static String dayName(int day) {\n        return switch (day) {\n            case 1 -> "Luni";\n            case 2 -> "Marți";\n            case 3 -> "Miercuri";\n            case 4 -> "Joi";\n            case 5 -> "Vineri";\n            case 6 -> "Sâmbătă";\n            case 7 -> "Duminică";\n            default -> "Invalid";\n        };\n    }\n    public static void main(String[] args) {\n        System.out.println(dayName(1));\n        System.out.println(dayName(5));\n        System.out.println(dayName(7));\n        System.out.println(dayName(8));\n    }\n}',
    expectedOutput: 'Luni\nVineri\nDuminică\nInvalid',
  },
  {
    slug: 'java-best-practices',
    name: 'Builder Pattern în Java',
    question: 'Implementează Builder pattern pentru un obiect User (name, email, age, role). Builder-ul să suporte method chaining.',
    language: 'java',
    starterCode: 'public class Main {\n    static class User {\n        private final String name, email, role;\n        private final int age;\n        \n        private User(Builder b) {\n            this.name = b.name; this.email = b.email;\n            this.age = b.age; this.role = b.role;\n        }\n        \n        @Override public String toString() {\n            return name + " <" + email + "> age=" + age + " role=" + role;\n        }\n        \n        static class Builder {\n            private String name, email, role = "user";\n            private int age;\n            public Builder name(String n) { name = n; return this; }\n            public Builder email(String e) { email = e; return this; }\n            public Builder age(int a) { age = a; return this; }\n            public Builder role(String r) { role = r; return this; }\n            public User build() { return new User(this); }\n        }\n    }\n    \n    public static void main(String[] args) {\n        var user = new User.Builder().name("Alice").email("a@b.com").age(28).role("admin").build();\n        System.out.println(user);\n    }\n}',
    expectedOutput: 'Alice <a@b.com> age=28 role=admin',
  },
  {
    slug: 'java-lesson-11',
    name: 'Streams API Java',
    question: 'Folosind Java Streams: filtrează numerele pare dintr-o listă, calculează suma lor, și colectează pătratele numerelor impare.',
    language: 'java',
    starterCode: 'import java.util.List;\nimport java.util.stream.Collectors;\n\npublic class Main {\n    public static void main(String[] args) {\n        var numbers = List.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);\n        \n        int evenSum = numbers.stream()\n            .filter(n -> n % 2 == 0)\n            .mapToInt(Integer::intValue)\n            .sum();\n        System.out.println("Suma pare: " + evenSum);\n        \n        var oddSquares = numbers.stream()\n            .filter(n -> n % 2 != 0)\n            .map(n -> n * n)\n            .collect(Collectors.toList());\n        System.out.println("Patrate impare: " + oddSquares);\n    }\n}',
    expectedOutput: 'Suma pare: 30\nPatrate impare: [1, 9, 25, 49, 81]',
  },
  {
    slug: 'java-lesson-12',
    name: 'Generics în Java',
    question: 'Implementează o clasă generică `Pair<A, B>` cu metode getFirst(), getSecond() și swap(). Testează cu diferite tipuri.',
    language: 'java',
    starterCode: 'public class Main {\n    static class Pair<A, B> {\n        private final A first;\n        private final B second;\n        Pair(A a, B b) { first = a; second = b; }\n        A getFirst() { return first; }\n        B getSecond() { return second; }\n        Pair<B, A> swap() { return new Pair<>(second, first); }\n        @Override public String toString() { return "(" + first + ", " + second + ")"; }\n    }\n    \n    public static void main(String[] args) {\n        Pair<String, Integer> p = new Pair<>("Alice", 30);\n        System.out.println(p);\n        System.out.println(p.swap());\n        Pair<Double, Boolean> q = new Pair<>(3.14, true);\n        System.out.println(q.getFirst());\n    }\n}',
    expectedOutput: '(Alice, 30)\n(30, Alice)\n3.14',
  },
  {
    slug: 'java-lesson-13',
    name: 'Collections Framework Java',
    question: 'Demonstrează HashMap, TreeMap și LinkedHashMap: inserează 5 perechi, iterează (observă ordinea diferită), și arată operații de bază.',
    language: 'java',
    starterCode: 'import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        // LinkedHashMap - pastreaza ordinea insertiei\n        Map<String, Integer> scores = new LinkedHashMap<>();\n        scores.put("Alice", 90);\n        scores.put("Bob", 75);\n        scores.put("Carol", 88);\n        \n        scores.forEach((k, v) -> System.out.println(k + ": " + v));\n        System.out.println("Max: " + Collections.max(scores.values()));\n        System.out.println("Contains Alice: " + scores.containsKey("Alice"));\n    }\n}',
    expectedOutput: 'Alice: 90\nBob: 75\nCarol: 88\nMax: 90\nContains Alice: true',
  },
  {
    slug: 'java-lesson-14',
    name: 'Exception Handling Java',
    question: 'Scrie o clasă BankAccount cu metode deposit și withdraw. Aruncă InvalidAmountException la sume negative și InsufficientFundsException când soldul e insuficient.',
    language: 'java',
    starterCode: 'public class Main {\n    static class InvalidAmountException extends Exception {\n        InvalidAmountException(String msg) { super(msg); }\n    }\n    static class InsufficientFundsException extends Exception {\n        InsufficientFundsException(double amount) { super("Fonduri insuficiente: lipsa " + amount); }\n    }\n    \n    static class BankAccount {\n        private double balance;\n        BankAccount(double b) { balance = b; }\n        void deposit(double amt) throws InvalidAmountException {\n            if (amt <= 0) throw new InvalidAmountException("Suma invalida");\n            balance += amt;\n        }\n        void withdraw(double amt) throws InvalidAmountException, InsufficientFundsException {\n            if (amt <= 0) throw new InvalidAmountException("Suma invalida");\n            if (amt > balance) throw new InsufficientFundsException(amt - balance);\n            balance -= amt;\n        }\n        double getBalance() { return balance; }\n    }\n    \n    public static void main(String[] args) throws Exception {\n        var acc = new BankAccount(100);\n        acc.deposit(50);\n        System.out.println("Sold: " + acc.getBalance());\n        try { acc.withdraw(200); } catch (InsufficientFundsException e) { System.out.println(e.getMessage()); }\n    }\n}',
    expectedOutput: 'Sold: 150.0\nFonduri insuficiente: lipsa 50.0',
  },
  {
    slug: 'java-lesson-15',
    name: 'Interfaces funcționale și lambdas',
    question: 'Folosind interfețe funcționale (Function, Predicate, Consumer), demonstrează function composition și method references.',
    language: 'java',
    starterCode: 'import java.util.*;\nimport java.util.function.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        // Function composition\n        Function<Integer, Integer> times2 = x -> x * 2;\n        Function<Integer, Integer> plus3 = x -> x + 3;\n        Function<Integer, Integer> composed = times2.andThen(plus3);\n        System.out.println(composed.apply(5)); // 13\n        \n        // Predicate\n        Predicate<String> isLong = s -> s.length() > 5;\n        Predicate<String> hasDigit = s -> s.chars().anyMatch(Character::isDigit);\n        List.of("hello", "world123", "hi").stream()\n            .filter(isLong.and(hasDigit))\n            .forEach(System.out::println);\n    }\n}',
    expectedOutput: '13\nworld123',
  },
  {
    slug: 'java-lesson-16',
    name: 'Concurență cu CompletableFuture',
    question: 'Implementează 3 task-uri asincrone cu CompletableFuture, combină-le cu allOf și afișează rezultatele.',
    language: 'java',
    starterCode: 'import java.util.concurrent.CompletableFuture;\n\npublic class Main {\n    static CompletableFuture<String> fetchData(int id) {\n        return CompletableFuture.supplyAsync(() -> {\n            // simulate delay\n            return "Data-" + id;\n        });\n    }\n    \n    public static void main(String[] args) throws Exception {\n        var f1 = fetchData(1);\n        var f2 = fetchData(2);\n        var f3 = fetchData(3);\n        \n        CompletableFuture.allOf(f1, f2, f3).join();\n        System.out.println(f1.get());\n        System.out.println(f2.get());\n        System.out.println(f3.get());\n    }\n}',
    expectedOutput: 'Data-1\nData-2\nData-3',
  },
  {
    slug: 'java-lesson-17',
    name: 'Design Pattern: Factory',
    question: 'Implementează Factory Method pattern pentru crearea de forme geometrice: Circle, Square, Triangle cu metodă area().',
    language: 'java',
    starterCode: 'public class Main {\n    interface Shape { double area(); }\n    record Circle(double r) implements Shape { public double area() { return Math.PI * r * r; } }\n    record Square(double s) implements Shape { public double area() { return s * s; } }\n    record Triangle(double b, double h) implements Shape { public double area() { return 0.5 * b * h; } }\n    \n    static Shape createShape(String type, double... params) {\n        return switch (type) {\n            case "circle" -> new Circle(params[0]);\n            case "square" -> new Square(params[0]);\n            case "triangle" -> new Triangle(params[0], params[1]);\n            default -> throw new IllegalArgumentException("Unknown: " + type);\n        };\n    }\n    \n    public static void main(String[] args) {\n        System.out.printf("%.2f%n", createShape("circle", 5).area());\n        System.out.printf("%.2f%n", createShape("square", 4).area());\n        System.out.printf("%.2f%n", createShape("triangle", 6, 3).area());\n    }\n}',
    expectedOutput: '78.54\n16.00\n9.00',
  },
  {
    slug: 'java-lesson-18',
    name: 'I/O și NIO în Java',
    question: 'Folosind java.nio.file.Path și Files: citește toate fișierele .txt dintr-un director, numără liniile totale.',
    language: 'java',
    starterCode: 'import java.nio.file.*;\nimport java.io.IOException;\nimport java.util.stream.Stream;\n\npublic class Main {\n    public static void main(String[] args) throws IOException {\n        // Simulare fara fisiere reale\n        String[] lines = {"Linia 1", "Linia 2", "Linia 3", "Linia 4", "Linia 5"};\n        long count = Stream.of(lines).count();\n        System.out.println("Total linii: " + count);\n        \n        // In productie:\n        // Path dir = Path.of("./txt-files");\n        // long totalLines = Files.walk(dir)\n        //     .filter(p -> p.toString().endsWith(".txt"))\n        //     .flatMap(p -> { try { return Files.lines(p); } catch (IOException e) { return Stream.empty(); } })\n        //     .count();\n    }\n}',
    expectedOutput: 'Total linii: 5',
  },
  {
    slug: 'java-lesson-19',
    name: 'Reflection în Java',
    question: 'Folosind Java Reflection: obține toate metodele publice ale clasei String, filtrează metodele care conțin "substring", și afișează semnăturile lor.',
    language: 'java',
    starterCode: 'import java.lang.reflect.Method;\nimport java.util.Arrays;\n\npublic class Main {\n    public static void main(String[] args) {\n        Class<?> cls = String.class;\n        System.out.println("Clasa: " + cls.getName());\n        \n        Arrays.stream(cls.getMethods())\n            .filter(m -> m.getName().contains("substring"))\n            .forEach(m -> {\n                String params = Arrays.stream(m.getParameterTypes())\n                    .map(Class::getSimpleName)\n                    .reduce((a,b) -> a+","+b).orElse("");\n                System.out.println(m.getName() + "(" + params + ")");\n            });\n    }\n}',
    expectedOutput: 'Clasa: java.lang.String\nsubstring(int)\nsubstring(int,int)',
  },
  {
    slug: 'java-lesson-20',
    name: 'Annotations custom în Java',
    question: 'Creează o annotare `@Validate` cu atribute min și max. Scrie un validator care procesează câmpurile adnotate ale unui obiect.',
    language: 'java',
    starterCode: 'import java.lang.annotation.*;\nimport java.lang.reflect.Field;\n\n@Target(ElementType.FIELD)\n@Retention(RetentionPolicy.RUNTIME)\n@interface Validate {\n    int min() default 0;\n    int max() default Integer.MAX_VALUE;\n}\n\nclass User {\n    @Validate(min = 2, max = 50) String name;\n    @Validate(min = 18, max = 120) int age;\n    User(String n, int a) { name = n; age = a; }\n}\n\npublic class Main {\n    static boolean validate(Object obj) throws IllegalAccessException {\n        for (Field f : obj.getClass().getDeclaredFields()) {\n            f.setAccessible(true);\n            Validate v = f.getAnnotation(Validate.class);\n            if (v == null) continue;\n            Object val = f.get(obj);\n            if (val instanceof String s && (s.length() < v.min() || s.length() > v.max())) return false;\n            if (val instanceof Integer i && (i < v.min() || i > v.max())) return false;\n        }\n        return true;\n    }\n    public static void main(String[] args) throws Exception {\n        System.out.println(validate(new User("Alice", 25))); // true\n        System.out.println(validate(new User("A", 15)));     // false\n    }\n}',
    expectedOutput: 'true\nfalse',
  },
  {
    slug: 'java-lesson-21',
    name: 'Spring Boot REST API',
    question: 'Scrie un REST controller Spring Boot pentru /api/users: GET lista, GET by id, POST create. Folosește @RestController și @RequestMapping.',
    language: 'java',
    starterCode: 'import org.springframework.web.bind.annotation.*;\nimport java.util.*;\n\n// @SpringBootApplication — Program principal\n\nrecord User(Long id, String name, String email) {}\n\n@RestController\n@RequestMapping("/api/users")\nclass UserController {\n    private Map<Long, User> users = new HashMap<>(Map.of(\n        1L, new User(1L, "Alice", "alice@ex.com"),\n        2L, new User(2L, "Bob", "bob@ex.com")\n    ));\n    \n    @GetMapping public Collection<User> getAll() { return users.values(); }\n    \n    @GetMapping("/{id}") public User getById(@PathVariable Long id) {\n        return Optional.ofNullable(users.get(id))\n            .orElseThrow(() -> new RuntimeException("Not found"));\n    }\n    \n    @PostMapping public User create(@RequestBody User user) {\n        users.put(user.id(), user);\n        return user;\n    }\n}',
    expectedOutput: '',
  },
  {
    slug: 'java-lesson-22',
    name: 'JPA și Spring Data',
    question: 'Definește o entitate JPA `Product` cu id, name, price. Scrie un Spring Data Repository cu metode custom: findByPriceBelow și findByNameContaining.',
    language: 'java',
    starterCode: 'import jakarta.persistence.*;\nimport org.springframework.data.jpa.repository.JpaRepository;\nimport org.springframework.data.jpa.repository.Query;\nimport java.util.List;\n\n@Entity\nclass Product {\n    @Id @GeneratedValue Long id;\n    String name;\n    double price;\n    Product() {}\n    Product(String n, double p) { name=n; price=p; }\n}\n\ninterface ProductRepository extends JpaRepository<Product, Long> {\n    List<Product> findByPriceLessThan(double price);\n    List<Product> findByNameContainingIgnoreCase(String keyword);\n    \n    @Query("SELECT p FROM Product p WHERE p.price BETWEEN :min AND :max")\n    List<Product> findInPriceRange(double min, double max);\n}',
    expectedOutput: '',
  },
  {
    slug: 'java-lesson-23',
    name: 'Testing cu JUnit 5',
    question: 'Scrie teste JUnit 5 complete pentru un StringUtils cu metode isPalindrome, countVowels, reverseWords. Include parametrized tests.',
    language: 'java',
    starterCode: 'import org.junit.jupiter.api.*;\nimport org.junit.jupiter.params.*;\nimport org.junit.jupiter.params.provider.*;\nimport static org.junit.jupiter.api.Assertions.*;\n\nclass StringUtils {\n    static boolean isPalindrome(String s) {\n        String clean = s.toLowerCase().replaceAll("[^a-z0-9]", "");\n        return clean.equals(new StringBuilder(clean).reverse().toString());\n    }\n    static long countVowels(String s) {\n        return s.toLowerCase().chars().filter("aeiou"::indexOf).count();\n    }\n    static String reverseWords(String s) {\n        String[] words = s.trim().split("\\\\s+");\n        StringBuilder sb = new StringBuilder();\n        for (int i = words.length-1; i >= 0; i--) sb.append(words[i]).append(" ");\n        return sb.toString().trim();\n    }\n}\n\nclass StringUtilsTest {\n    @ParameterizedTest\n    @CsvSource({"racecar,true","hello,false","A man a plan a canal Panama,true"})\n    void testIsPalindrome(String input, boolean expected) {\n        assertEquals(expected, StringUtils.isPalindrome(input));\n    }\n    \n    @Test void testReverseWords() {\n        assertEquals("world Hello", StringUtils.reverseWords("Hello world"));\n    }\n}',
    expectedOutput: '',
  },
  {
    slug: 'java-lesson-24',
    name: 'Kafka Producer/Consumer',
    question: 'Scrie un Kafka producer și consumer Java pentru un topic "orders". Mesajul e un JSON cu orderId și amount.',
    language: 'java',
    starterCode: 'import org.apache.kafka.clients.producer.*;\nimport java.util.Properties;\n\npublic class OrderProducer {\n    public static void main(String[] args) throws Exception {\n        Properties props = new Properties();\n        props.put("bootstrap.servers", "localhost:9092");\n        props.put("key.serializer", "org.apache.kafka.common.serialization.StringSerializer");\n        props.put("value.serializer", "org.apache.kafka.common.serialization.StringSerializer");\n        \n        try (KafkaProducer<String, String> producer = new KafkaProducer<>(props)) {\n            String msg = \'{"orderId": "001", "amount": 150.0}\';\n            producer.send(new ProducerRecord<>("orders", "order-001", msg));\n            System.out.println("Trimis: " + msg);\n        }\n    }\n}',
    expectedOutput: '',
  },
  {
    slug: 'java-lesson-25',
    name: 'Microservices cu Spring Cloud',
    question: 'Configurează service discovery cu Eureka: un Eureka Server și un microservice care se înregistrează. Adaugă RestTemplate cu load balancing.',
    language: 'java',
    starterCode: '// eureka-server/Application.java\nimport org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;\nimport org.springframework.boot.SpringApplication;\nimport org.springframework.boot.autoconfigure.SpringBootApplication;\n\n@SpringBootApplication\n@EnableEurekaServer\npublic class EurekaServerApplication {\n    public static void main(String[] args) {\n        SpringApplication.run(EurekaServerApplication.class, args);\n    }\n}\n\n// product-service/Application.java\n// @SpringBootApplication\n// @EnableDiscoveryClient\n// public class ProductServiceApplication {\n//     public static void main(String[] args) {\n//         SpringApplication.run(ProductServiceApplication.class, args);\n//     }\n// }',
    expectedOutput: '',
  },
  {
    slug: 'java-spring-security',
    name: 'Spring Security cu JWT',
    question: 'Configurează Spring Security cu JWT: SecurityFilterChain, JwtAuthenticationFilter, și un endpoint /api/auth/login care returnează token.',
    language: 'java',
    starterCode: 'import org.springframework.context.annotation.Bean;\nimport org.springframework.security.config.annotation.web.builders.HttpSecurity;\nimport org.springframework.security.web.SecurityFilterChain;\n\n// @Configuration\n// @EnableWebSecurity\nclass SecurityConfig {\n    @Bean\n    SecurityFilterChain filterChain(HttpSecurity http) throws Exception {\n        http\n            .csrf(csrf -> csrf.disable())\n            .authorizeHttpRequests(auth -> auth\n                .requestMatchers("/api/auth/**").permitAll()\n                .anyRequest().authenticated()\n            );\n            // .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);\n        return http.build();\n    }\n}',
    expectedOutput: '',
  },
  {
    slug: 'java-spring-webflux',
    name: 'Reactive programming cu WebFlux',
    question: 'Scrie un reactive REST controller cu Spring WebFlux: returnează Flux<Product> pentru lista și Mono<Product> pentru un singur element.',
    language: 'java',
    starterCode: 'import org.springframework.web.bind.annotation.*;\nimport reactor.core.publisher.Flux;\nimport reactor.core.publisher.Mono;\nimport java.time.Duration;\n\nrecord Product(Long id, String name, double price) {}\n\n@RestController\n@RequestMapping("/api/products")\nclass ProductController {\n    @GetMapping(produces = "application/json")\n    Flux<Product> getAll() {\n        return Flux.just(\n            new Product(1L, "Laptop", 1200.0),\n            new Product(2L, "Mouse", 50.0)\n        ).delayElements(Duration.ofMillis(100));\n    }\n    \n    @GetMapping("/{id}")\n    Mono<Product> getById(@PathVariable Long id) {\n        return Mono.just(new Product(id, "Product " + id, id * 10.0));\n    }\n}',
    expectedOutput: '',
  },
  {
    slug: 'java-kafka-messaging',
    name: 'Event-driven cu Kafka Streams',
    question: 'Implementează un Kafka Streams processor care consumă comenzi, filtrează comenzile > 100 RON și trimite notificări pe alt topic.',
    language: 'java',
    starterCode: 'import org.apache.kafka.streams.*;\nimport org.apache.kafka.streams.kstream.*;\nimport java.util.Properties;\n\npublic class OrderProcessor {\n    public static void main(String[] args) {\n        Properties props = new Properties();\n        props.put(StreamsConfig.APPLICATION_ID_CONFIG, "order-processor");\n        props.put(StreamsConfig.BOOTSTRAP_SERVERS_CONFIG, "localhost:9092");\n        \n        StreamsBuilder builder = new StreamsBuilder();\n        KStream<String, String> orders = builder.stream("orders");\n        \n        orders\n            .filter((key, value) -> {\n                // parse JSON si verifica amount > 100\n                return value.contains("amount") && Double.parseDouble(value.split("amount.:")[1].split("[,}]")[0].trim()) > 100;\n            })\n            .to("high-value-orders");\n        \n        new KafkaStreams(builder.build(), props); // .start() in productie\n    }\n}',
    expectedOutput: '',
  },
  {
    slug: 'java-spring-data-jpa',
    name: 'Spring Data JPA avansat',
    question: 'Scrie un repository cu: paginare, sortare, specificații dinamice, și o interogare JPQL pentru statistici.',
    language: 'java',
    starterCode: 'import org.springframework.data.jpa.repository.*;\nimport org.springframework.data.domain.*;\nimport java.util.List;\n\npublic interface ProductRepository extends JpaRepository<Product, Long>, JpaSpecificationExecutor<Product> {\n    // Paginare\n    Page<Product> findAll(Pageable pageable);\n    \n    // Sortare automata\n    List<Product> findAllByOrderByPriceDesc();\n    \n    // JPQL custom\n    @Query("SELECT p.category, COUNT(p), AVG(p.price) FROM Product p GROUP BY p.category")\n    List<Object[]> getCategoryStats();\n    \n    // Derived query\n    List<Product> findByPriceBetweenAndCategoryIn(double min, double max, List<String> categories);\n}',
    expectedOutput: '',
  },
  {
    slug: 'java-microservices-patterns',
    name: 'Microservices patterns',
    question: 'Implementează Circuit Breaker pattern cu Resilience4j pentru un service extern. Include retry, fallback și timeout.',
    language: 'java',
    starterCode: 'import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;\nimport io.github.resilience4j.retry.annotation.Retry;\nimport io.github.resilience4j.timelimiter.annotation.TimeLimiter;\nimport org.springframework.stereotype.Service;\nimport java.util.concurrent.CompletableFuture;\n\n@Service\nclass PaymentService {\n    @CircuitBreaker(name = "payment", fallbackMethod = "paymentFallback")\n    @Retry(name = "payment")\n    @TimeLimiter(name = "payment")\n    public CompletableFuture<String> processPayment(double amount) {\n        return CompletableFuture.supplyAsync(() -> {\n            // Apel catre payment gateway extern\n            if (amount < 0) throw new RuntimeException("Payment failed");\n            return "Payment processed: " + amount + " RON";\n        });\n    }\n    \n    public CompletableFuture<String> paymentFallback(double amount, Throwable t) {\n        return CompletableFuture.completedFuture("Payment service unavailable. Will retry later.");\n    }\n}',
    expectedOutput: '',
  },
];

async function main() {
  console.log('Adăugare coding tasks Java (remaining)...');
  let added = 0, skipped = 0;
  for (const t of tasks) {
    const lesson = await prisma.lesson.findFirst({ where: { slug: t.slug } });
    if (!lesson) { console.log(`  [skip] ${t.slug} — nu există`); skipped++; continue; }
    const existing = await prisma.task.findFirst({ where: { lessonId: lesson.id, type: 'coding' } });
    if (existing) { console.log(`  [skip] ${t.slug} — are deja coding`); skipped++; continue; }
    const maxTask = await prisma.task.findFirst({ where: { lessonId: lesson.id }, orderBy: { number: 'desc' } });
    const n = (maxTask?.number ?? 0) + 1;
    await prisma.task.create({
      data: {
        lessonId: lesson.id, number: n,
        name: t.name, question: t.question,
        options: [], answer: '',
        explanation: '',
        difficulty: 'medium',
        type: 'coding', language: t.language,
        starterCode: t.starterCode || '',
        expectedOutput: t.expectedOutput || '',
      },
    });
    console.log(`  [ok] ${t.slug}`);
    added++;
  }
  console.log(`\nGata: ${added} adăugate, ${skipped} sărite.`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
