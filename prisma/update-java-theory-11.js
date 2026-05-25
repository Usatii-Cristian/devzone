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

await up('31. Spring Security', 'Autorizare bazata pe roluri', `**Autorizarea bazată pe roluri și metode** în Spring Security controlează cine poate accesa ce endpoint-uri sau metode — la nivel de URL sau adnotări pe metodele de business.

**Autorizare la nivel de URL (SecurityFilterChain)**

\`\`\`java
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable()) // pentru API REST (cu JWT)
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/auth/**", "/actuator/health").permitAll()
                .requestMatchers("/api/admin/**").hasRole("ADMIN")
                .requestMatchers("/api/users/**").hasAnyRole("USER", "ADMIN")
                .requestMatchers(HttpMethod.DELETE, "/api/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.POST, "/api/orders").hasAuthority("orders:create")
                .anyRequest().authenticated()
            )
            .sessionManagement(s -> s.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }
}
\`\`\`

**Autorizare la nivel de metodă cu @PreAuthorize**

\`\`\`java
@Configuration
@EnableMethodSecurity(prePostEnabled = true) // activează @PreAuthorize
public class MethodSecurityConfig {}

@Service
public class TaskService {

    @PreAuthorize("hasRole('ADMIN')")
    public void deleteAllTasks() { taskRepo.deleteAll(); }

    @PreAuthorize("hasAuthority('tasks:read')")
    public List<Task> findAll() { return taskRepo.findAll(); }

    // Expression cu acces la parametri și principal
    @PreAuthorize("hasRole('ADMIN') or #userId == authentication.principal.id")
    public List<Task> findByUserId(@P("userId") Long userId) {
        return taskRepo.findByUserId(userId);
    }

    // Verificare la nivel de obiect returnat (@PostAuthorize)
    @PostAuthorize("returnObject.userId == authentication.principal.id or hasRole('ADMIN')")
    public Task findById(Long id) { return taskRepo.findById(id).orElseThrow(); }

    // Filtrare colecție returnată (@PostFilter)
    @PostFilter("filterObject.userId == authentication.principal.id")
    public List<Task> findAllForCurrentUser() { return taskRepo.findAll(); }
}
\`\`\`

**Roluri vs Authorities (Permissions)**

\`\`\`java
// ROLE — concept high-level (ADMIN, USER, MODERATOR)
// Spring adaugă automat prefixul "ROLE_" la verificarea hasRole
// hasRole("ADMIN") echivalent cu hasAuthority("ROLE_ADMIN")

// AUTHORITY — permisiune granulară (read:users, write:posts, delete:orders)
// Folosește hasAuthority() pentru permisiuni fine-grained

@PreAuthorize("hasRole('ADMIN')")               // verifică ROLE_ADMIN
@PreAuthorize("hasAuthority('users:delete')")   // verifică authority exactă
@PreAuthorize("hasAnyRole('ADMIN', 'EDITOR')") // mai multe roluri OR
\`\`\`

**Custom permission evaluator**

\`\`\`java
@Component
public class TaskPermissionEvaluator implements PermissionEvaluator {

    @Override
    public boolean hasPermission(Authentication auth, Object target, Object permission) {
        if (target instanceof Task task && permission instanceof String perm) {
            User user = (User) auth.getPrincipal();
            return switch (perm) {
                case "edit" -> task.getUserId().equals(user.getId()) || user.isAdmin();
                case "delete" -> user.isAdmin();
                case "view" -> task.isPublic() || task.getUserId().equals(user.getId());
                default -> false;
            };
        }
        return false;
    }

    @Override
    public boolean hasPermission(Authentication auth, Serializable id, String type, Object perm) {
        return false; // implementare prin ID dacă necesar
    }
}

// Utilizare în service
@PreAuthorize("hasPermission(#task, 'edit')")
public Task updateTask(Task task) { return taskRepo.save(task); }
\`\`\`

**Pattern-uri pentru organizare**

\`\`\`java
// Authority hierarchical (ADMIN moștenește USER)
@Bean
RoleHierarchy roleHierarchy() {
    return RoleHierarchyImpl.fromHierarchy("""
        ROLE_ADMIN > ROLE_MODERATOR
        ROLE_MODERATOR > ROLE_USER
        ROLE_USER > ROLE_GUEST
        """);
}

// Custom @Annotation pentru lizibilitate
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
@PreAuthorize("hasRole('ADMIN')")
public @interface AdminOnly {}

// Utilizare
@AdminOnly
public void purgeOldData() { ... }
\`\`\`

• **@EnableMethodSecurity** > @EnableGlobalMethodSecurity (deprecated)
• **Roles** pentru categorii largi; **authorities** pentru permisiuni granulare
• **@PreAuthorize SpEL** este puternic: acces la parametri (#paramName), principal, return value`);

await up('32. Spring WebFlux', 'Spring WebFlux controller si router', `**Spring WebFlux Controllers și Router Functions** sunt cele două abordări pentru a defini endpoint-uri reactive în Spring WebFlux — Annotated controllers (familiar) sau Functional routing (mai expressive).

**Annotated Controllers — sintaxa familiară**

\`\`\`java
@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public Flux<UserDto> getAll() {
        return userService.findAll(); // Flux pentru multiple values
    }

    @GetMapping("/{id}")
    public Mono<ResponseEntity<UserDto>> getById(@PathVariable String id) {
        return userService.findById(id)
            .map(ResponseEntity::ok)
            .defaultIfEmpty(ResponseEntity.notFound().build());
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Mono<UserDto> create(@RequestBody @Valid Mono<CreateUserRequest> req) {
        return req.flatMap(userService::create);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public Mono<Void> delete(@PathVariable String id) {
        return userService.delete(id);
    }
}
\`\`\`

**Functional Endpoints — Router + Handler**

\`\`\`java
// Handler — logica business
@Component
public class UserHandler {
    private final UserService userService;
    public UserHandler(UserService userService) { this.userService = userService; }

    public Mono<ServerResponse> getAll(ServerRequest req) {
        return ServerResponse.ok()
            .contentType(MediaType.APPLICATION_JSON)
            .body(userService.findAll(), UserDto.class);
    }

    public Mono<ServerResponse> getById(ServerRequest req) {
        String id = req.pathVariable("id");
        return userService.findById(id)
            .flatMap(u -> ServerResponse.ok().bodyValue(u))
            .switchIfEmpty(ServerResponse.notFound().build());
    }

    public Mono<ServerResponse> create(ServerRequest req) {
        return req.bodyToMono(CreateUserRequest.class)
            .flatMap(userService::create)
            .flatMap(saved -> ServerResponse.created(URI.create("/api/users/" + saved.id()))
                .bodyValue(saved));
    }
}

// Router — definește rutele
@Configuration
public class UserRouter {
    @Bean
    RouterFunction<ServerResponse> userRoutes(UserHandler handler) {
        return RouterFunctions.route()
            .path("/api/users", builder -> builder
                .GET("", handler::getAll)
                .GET("/{id}", handler::getById)
                .POST("", handler::create)
                .DELETE("/{id}", handler::delete)
            )
            .filter((req, next) -> {  // middleware
                long start = System.currentTimeMillis();
                return next.handle(req).doOnSuccess(res ->
                    log.info("{} {} - {}ms", req.method(), req.path(),
                        System.currentTimeMillis() - start)
                );
            })
            .build();
    }
}
\`\`\`

**Combinare predicates**

\`\`\`java
// Predicates pentru routing avansat
RouterFunction<ServerResponse> routes = RouterFunctions.route()
    .GET("/api/users", accept(MediaType.APPLICATION_JSON), handler::getAllJson)
    .GET("/api/users", accept(MediaType.TEXT_HTML), handler::getAllHtml)
    .nest(path("/api/v1"), builder -> builder
        .GET("/products", handler::v1Products)
    )
    .nest(path("/api/v2"), builder -> builder
        .GET("/products", handler::v2Products)
    )
    .build();
\`\`\`

**Error handling reactiv**

\`\`\`java
public Mono<ResponseEntity<UserDto>> getUser(String id) {
    return userService.findById(id)
        .map(ResponseEntity::ok)
        .switchIfEmpty(Mono.error(new NotFoundException("User " + id)))
        .onErrorResume(NotFoundException.class, e ->
            Mono.just(ResponseEntity.status(404).build()))
        .onErrorResume(Exception.class, e -> {
            log.error("Eroare neașteptată", e);
            return Mono.just(ResponseEntity.status(500).build());
        });
}

// Global error handler
@RestControllerAdvice
public class GlobalErrorHandler {
    @ExceptionHandler(NotFoundException.class)
    public Mono<ResponseEntity<ErrorResponse>> handleNotFound(NotFoundException e) {
        return Mono.just(ResponseEntity.status(404)
            .body(new ErrorResponse("NOT_FOUND", e.getMessage())));
    }
}
\`\`\`

• **@RestController** = sintaxă familiară din MVC; **RouterFunctions** = composabilă, mai funcțională
• **Mono<T>** = 0 sau 1 valoare; **Flux<T>** = 0 până la n valori (stream)
• Nu blochezi niciodată în WebFlux — toate operațiile blocante (JDBC clasic, file I/O sync) trebuie offload-ate cu \`subscribeOn(Schedulers.boundedElastic())\``);

await up('32. Spring WebFlux', 'WebClient si R2DBC', `**WebClient și R2DBC** completează stack-ul reactiv Spring — WebClient pentru apeluri HTTP non-blocking și R2DBC pentru acces reactive la baze de date.

**WebClient — replacement reactive pentru RestTemplate**

\`\`\`java
@Configuration
public class WebClientConfig {
    @Bean
    WebClient webClient() {
        return WebClient.builder()
            .baseUrl("https://api.example.com")
            .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
            .defaultHeader(HttpHeaders.ACCEPT, MediaType.APPLICATION_JSON_VALUE)
            .codecs(c -> c.defaultCodecs().maxInMemorySize(16 * 1024 * 1024)) // 16MB
            .build();
    }
}

// Utilizare
@Service
public class WeatherService {
    private final WebClient webClient;

    public Mono<Weather> getWeather(String city) {
        return webClient.get()
            .uri("/weather?city={city}", city)
            .retrieve()
            .bodyToMono(Weather.class)
            .timeout(Duration.ofSeconds(5))
            .retry(2);
    }

    public Flux<News> getNews(String topic) {
        return webClient.get()
            .uri("/news?topic={topic}", topic)
            .retrieve()
            .bodyToFlux(News.class);
    }

    public Mono<Void> postEvent(Event event) {
        return webClient.post()
            .uri("/events")
            .bodyValue(event)
            .retrieve()
            .onStatus(HttpStatusCode::is4xxClientError, res ->
                Mono.error(new ClientException("Client error: " + res.statusCode())))
            .toBodilessEntity()
            .then();
    }
}
\`\`\`

**Composing requests — paralel și secvential**

\`\`\`java
public Mono<UserDashboard> getDashboard(String userId) {
    Mono<User> user = webClient.get().uri("/users/{id}", userId)
        .retrieve().bodyToMono(User.class);
    Mono<List<Order>> orders = webClient.get().uri("/orders?user={id}", userId)
        .retrieve().bodyToFlux(Order.class).collectList();
    Mono<Integer> notifications = webClient.get().uri("/notifications/count?user={id}", userId)
        .retrieve().bodyToMono(Integer.class);

    // Paralel — toate 3 încep simultan, se combină când termină
    return Mono.zip(user, orders, notifications)
        .map(tuple -> new UserDashboard(
            tuple.getT1(), tuple.getT2(), tuple.getT3()));
}

// Secvential — folosește datele primei pentru a doua
Mono<Profile> getProfile(String userId) {
    return userService.findById(userId)
        .flatMap(user -> webClient.get().uri("/profiles/{id}", user.profileId())
            .retrieve().bodyToMono(Profile.class));
}
\`\`\`

**R2DBC — acces reactiv la baze de date**

\`\`\`java
// Dependințe Maven:
// spring-boot-starter-data-r2dbc
// io.r2dbc:r2dbc-postgresql (sau r2dbc-h2, r2dbc-mysql)

// application.yml
// spring:
//   r2dbc:
//     url: r2dbc:postgresql://localhost:5432/mydb
//     username: admin
//     password: secret

@Table("users")
public class User {
    @Id Long id;
    String name;
    String email;
    LocalDateTime createdAt;
    // getters, setters
}

// Repository reactiv
public interface UserRepository extends ReactiveCrudRepository<User, Long> {
    Mono<User> findByEmail(String email);
    Flux<User> findByNameContaining(String name);

    @Query("SELECT * FROM users WHERE created_at > :date")
    Flux<User> findRecent(LocalDateTime date);
}

// Service
@Service
public class UserService {
    private final UserRepository repo;

    public Mono<User> createUser(String name, String email) {
        return repo.findByEmail(email)
            .flatMap(existing -> Mono.<User>error(new ConflictException("Email există")))
            .switchIfEmpty(repo.save(new User(null, name, email, LocalDateTime.now())));
    }

    public Flux<User> searchUsers(String query, int limit) {
        return repo.findByNameContaining(query).take(limit);
    }
}
\`\`\`

**Tranzacții reactive**

\`\`\`java
@Service
public class TransferService {
    private final R2dbcTransactionManager tx;
    private final AccountRepository accounts;
    private final TransactionalOperator transactional;

    public Mono<Void> transfer(Long fromId, Long toId, BigDecimal amount) {
        return Mono.zip(accounts.findById(fromId), accounts.findById(toId))
            .flatMap(t -> {
                Account from = t.getT1(); Account to = t.getT2();
                if (from.balance().compareTo(amount) < 0)
                    return Mono.error(new InsufficientFundsException());
                from.setBalance(from.balance().subtract(amount));
                to.setBalance(to.balance().add(amount));
                return Mono.zip(accounts.save(from), accounts.save(to)).then();
            })
            .as(transactional::transactional); // commit/rollback automat
    }
}
\`\`\`

• **WebClient** este builder thread-safe — creează o instanță și reutilizează
• **R2DBC** încă nu suportă toate feature-urile JPA (lazy loading, OneToMany) — design-ul devine "thin"
• **Combină Mono/Flux** cu zip (paralel), flatMap (secvențial), concat (ordonat)`);

await up('33. Apache Kafka', 'Kafka concepte de baza', `**Apache Kafka concepte de bază** — platforma distribuită de streaming care permite publisharea, stocarea și consumul de evenimente la scară masivă, în timp real.

**Arhitectura Kafka**

\`\`\`
Producer → Topic (partitions) → Consumer Group
              ↓
           Broker(s)  (cluster Kafka)
              ↓
           Zookeeper sau KRaft (coordonare)
\`\`\`

**Concepte cheie**

\`\`\`
TOPIC — categorie logică de mesaje (ex: "orders", "user-events")
        Persistă mesajele pe disc (configurabil retention: 7 zile default)

PARTITION — topic-urile sunt împărțite în partition-uri pentru paralelism
            Ordinea e garantată DOAR în interiorul unei partition
            Cheia mesajului determină în ce partition merge (hash(key) % partitions)

OFFSET — poziția unui mesaj într-o partition (long auto-increment)
         Consumerii își țin propriul offset (where they're at)

BROKER — un nod Kafka (server). Cluster = mai mulți brokeri
         Fiecare partition are 1 leader și N replici (pentru fault tolerance)

PRODUCER — publishează mesaje la topic
CONSUMER — citește mesaje dintr-un topic
CONSUMER GROUP — meai mulți consumeri partajează munca; fiecare partition merge la un singur consumer din grup
\`\`\`

**Producer — publicare mesaje**

\`\`\`java
// Setup
Properties props = new Properties();
props.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, "kafka1:9092,kafka2:9092");
props.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class);
props.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, JsonSerializer.class);
props.put(ProducerConfig.ACKS_CONFIG, "all"); // așteaptă confirmare de la replici
props.put(ProducerConfig.RETRIES_CONFIG, 3);

try (Producer<String, OrderEvent> producer = new KafkaProducer<>(props)) {
    OrderEvent event = new OrderEvent("ORD-123", "user-1", 99.99);

    // Trimitere async cu callback
    ProducerRecord<String, OrderEvent> record = new ProducerRecord<>(
        "orders",            // topic
        event.userId(),      // key — pentru routing la partition
        event                // value
    );

    producer.send(record, (metadata, exception) -> {
        if (exception != null) log.error("Send failed", exception);
        else log.info("Sent to partition {} at offset {}",
            metadata.partition(), metadata.offset());
    });

    producer.flush(); // forțează trimitere imediat
}
\`\`\`

**Consumer — citire mesaje**

\`\`\`java
Properties props = new Properties();
props.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, "kafka1:9092");
props.put(ConsumerConfig.GROUP_ID_CONFIG, "order-processor");
props.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class);
props.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, JsonDeserializer.class);
props.put(ConsumerConfig.AUTO_OFFSET_RESET_CONFIG, "earliest"); // sau "latest"
props.put(ConsumerConfig.ENABLE_AUTO_COMMIT_CONFIG, false);     // commit manual

try (Consumer<String, OrderEvent> consumer = new KafkaConsumer<>(props)) {
    consumer.subscribe(List.of("orders"));

    while (running) {
        ConsumerRecords<String, OrderEvent> records = consumer.poll(Duration.ofMillis(500));
        for (ConsumerRecord<String, OrderEvent> record : records) {
            log.info("Received: partition={}, offset={}, key={}, value={}",
                record.partition(), record.offset(), record.key(), record.value());
            try {
                processOrder(record.value());
            } catch (Exception e) {
                log.error("Processing failed", e);
                // dead letter queue?
            }
        }
        consumer.commitSync(); // commit DUPĂ procesare reușită (at-least-once)
    }
}
\`\`\`

**Garanții de livrare**

\`\`\`
At-most-once:  commit înainte de procesare    (poate pierde mesaje)
At-least-once: commit după procesare           (poate procesa duplicate — IDEMPOTENT!)
Exactly-once:  transactions Kafka              (mai complex, performanță mai mică)
\`\`\`

• **Partițiile** = unitatea de paralelism — # consumeri max = # partiții
• **Cheia mesajului** = same key → same partition → ordine garantată per cheie
• **Retention** configurabilă: \`retention.ms=604800000\` (7 zile) sau \`retention.bytes\``);

await up('33. Apache Kafka', 'Tranzactii Kafka si idempotenta', `**Tranzacții Kafka și idempotența** — mecanismele pentru a garanta livrarea exactly-once în pipeline-uri critice, esențiale pentru aplicații financiare sau cu impact real.

**Idempotent Producer — evită duplicate la retry**

\`\`\`java
// Producer idempotent — Kafka deduplică automat retry-urile
Properties props = new Properties();
props.put(ProducerConfig.ENABLE_IDEMPOTENCE_CONFIG, true); // CHEIA!
props.put(ProducerConfig.ACKS_CONFIG, "all");              // implicit cu idempotent
props.put(ProducerConfig.MAX_IN_FLIGHT_REQUESTS_PER_CONNECTION, 5); // ok cu idempotent

// Producer adaugă automat producer ID și sequence number la fiecare mesaj
// Brokerul detectează duplicate prin (producer_id, partition, sequence)
\`\`\`

**Tranzacții Kafka — multiple writes atomic**

\`\`\`java
// Transactional producer — publică în mai multe topic-uri atomic
Properties props = new Properties();
props.put(ProducerConfig.TRANSACTIONAL_ID_CONFIG, "tx-producer-1"); // ID unic
props.put(ProducerConfig.ENABLE_IDEMPOTENCE_CONFIG, true);

Producer<String, String> producer = new KafkaProducer<>(props);
producer.initTransactions(); // inițializare o singură dată

try {
    producer.beginTransaction();

    // Mai multe mesaje în diferite topic-uri — atomic
    producer.send(new ProducerRecord<>("orders", orderId, orderJson));
    producer.send(new ProducerRecord<>("inventory", productId, inventoryUpdate));
    producer.send(new ProducerRecord<>("audit", eventId, auditEvent));

    producer.commitTransaction(); // toate sau nimic
} catch (KafkaException e) {
    producer.abortTransaction(); // rollback
    throw e;
}
\`\`\`

**Consume-Process-Produce pattern (Read-Process-Write)**

\`\`\`java
// Citește din input, procesează, scrie la output — atomic
Consumer<String, Order> consumer = new KafkaConsumer<>(consumerProps);
Producer<String, ProcessedOrder> producer = new KafkaProducer<>(producerProps);
producer.initTransactions();

consumer.subscribe(List.of("raw-orders"));

while (true) {
    ConsumerRecords<String, Order> records = consumer.poll(Duration.ofMillis(500));
    if (records.isEmpty()) continue;

    producer.beginTransaction();
    try {
        Map<TopicPartition, OffsetAndMetadata> offsets = new HashMap<>();

        for (ConsumerRecord<String, Order> record : records) {
            ProcessedOrder processed = processOrder(record.value());
            producer.send(new ProducerRecord<>("processed-orders",
                record.key(), processed));

            offsets.put(new TopicPartition(record.topic(), record.partition()),
                new OffsetAndMetadata(record.offset() + 1));
        }

        // Commit-ul offset-urilor face parte din tranzacție!
        producer.sendOffsetsToTransaction(offsets, consumer.groupMetadata());
        producer.commitTransaction();
    } catch (Exception e) {
        producer.abortTransaction();
        throw e;
    }
}
\`\`\`

**Spring Kafka — tranzacții declarative**

\`\`\`java
@Configuration
public class KafkaConfig {
    @Bean
    KafkaTemplate<String, Object> kafkaTemplate(ProducerFactory<String, Object> pf) {
        KafkaTemplate<String, Object> template = new KafkaTemplate<>(pf);
        template.setTransactionIdPrefix("tx-"); // activează tranzacții
        return template;
    }

    @Bean
    KafkaTransactionManager<?, ?> txManager(ProducerFactory<String, Object> pf) {
        return new KafkaTransactionManager<>(pf);
    }
}

@Service
public class OrderService {
    private final KafkaTemplate<String, Object> kafka;

    @Transactional("kafkaTransactionManager")
    public void processOrder(Order order) {
        kafka.send("orders", order.id(), order);
        kafka.send("audit", order.id(), new AuditEvent("ORDER_CREATED", order));

        if (order.total() > 1000) {
            kafka.send("high-value-orders", order.id(), order);
        }
        // commit automat la sfârșit; rollback la excepție
    }
}
\`\`\`

**Consumer isolation level**

\`\`\`java
// Consumer citește doar mesaje commited (skip aborted transactions)
props.put(ConsumerConfig.ISOLATION_LEVEL_CONFIG, "read_committed");
// vs default "read_uncommitted" care vede toate mesajele (inclusiv aborted)
\`\`\`

**Pattern: Inbox/Outbox pentru exactly-once cu BD**

\`\`\`java
// Outbox: write to DB + outbox table in same DB transaction
// Apoi un poller citește outbox și publică la Kafka idempotent
// Garantează: dacă DB commit reușește, mesajul ajunge la Kafka eventual

@Transactional
public void createOrder(Order order) {
    orderRepo.save(order);
    outboxRepo.save(new OutboxEvent("OrderCreated", toJson(order))); // în aceeași tx DB
}

@Scheduled(fixedRate = 1000)
public void publishOutbox() {
    List<OutboxEvent> events = outboxRepo.findUnpublished(50);
    for (var event : events) {
        kafka.send(event.topic(), event.payload());
        event.markPublished();
    }
    outboxRepo.saveAll(events);
}
\`\`\`

• **Idempotent producer** este aproape mereu activat în producție — overhead minim
• **Tranzacții Kafka** = exactly-once pentru Kafka-only; pentru Kafka+DB folosește Outbox pattern
• **isolation_level=read_committed** la consumer pentru a evita procesarea mesajelor aborted`);

await up('34. Spring Data JPA Avansat', 'Specification si Criteria API', `**Specification și Criteria API** în Spring Data JPA permit construirea de query-uri dinamice type-safe — alternative la JPQL string-based pentru filtre construite la runtime.

**JPA Specification — query-uri dinamice**

\`\`\`java
// Repository implementează JpaSpecificationExecutor
public interface UserRepository extends JpaRepository<User, Long>,
                                         JpaSpecificationExecutor<User> {}

// Specification = predicate reutilizabil
public class UserSpecifications {

    public static Specification<User> hasName(String name) {
        return (root, query, cb) -> name == null ? null :
            cb.like(cb.lower(root.get("name")), "%" + name.toLowerCase() + "%");
    }

    public static Specification<User> hasMinAge(Integer minAge) {
        return (root, query, cb) -> minAge == null ? null :
            cb.greaterThanOrEqualTo(root.get("age"), minAge);
    }

    public static Specification<User> isActive() {
        return (root, query, cb) -> cb.isTrue(root.get("active"));
    }

    public static Specification<User> hasRole(String role) {
        return (root, query, cb) -> {
            if (role == null) return null;
            Join<User, Role> roles = root.join("roles", JoinType.INNER);
            return cb.equal(roles.get("name"), role);
        };
    }
}
\`\`\`

**Compunerea specificațiilor**

\`\`\`java
// Service — construiește filtru dinamic
@Service
public class UserSearchService {
    private final UserRepository userRepo;

    public List<User> search(UserSearchCriteria criteria) {
        Specification<User> spec = Specification.where(null);

        if (criteria.getName() != null)
            spec = spec.and(UserSpecifications.hasName(criteria.getName()));
        if (criteria.getMinAge() != null)
            spec = spec.and(UserSpecifications.hasMinAge(criteria.getMinAge()));
        if (Boolean.TRUE.equals(criteria.getActiveOnly()))
            spec = spec.and(UserSpecifications.isActive());
        if (criteria.getRole() != null)
            spec = spec.and(UserSpecifications.hasRole(criteria.getRole()));

        return userRepo.findAll(spec);
    }

    // Cu Pageable + Sort
    public Page<User> searchPaged(UserSearchCriteria c, Pageable pageable) {
        Specification<User> spec = buildSpec(c);
        return userRepo.findAll(spec, pageable);
    }
}

// Negație și OR
Specification<User> spec = UserSpecifications.isActive()
    .and(UserSpecifications.hasName("Ana").or(UserSpecifications.hasName("Bob")))
    .and(Specification.not(UserSpecifications.hasRole("ADMIN")));
\`\`\`

**Criteria API — query builder type-safe**

\`\`\`java
@Repository
public class UserCustomRepository {
    @PersistenceContext
    private EntityManager em;

    public List<User> complexQuery(String name, Integer minAge, List<String> roles) {
        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<User> query = cb.createQuery(User.class);
        Root<User> user = query.from(User.class);

        List<Predicate> predicates = new ArrayList<>();

        if (name != null) {
            predicates.add(cb.like(user.get("name"), "%" + name + "%"));
        }
        if (minAge != null) {
            predicates.add(cb.greaterThanOrEqualTo(user.get("age"), minAge));
        }
        if (roles != null && !roles.isEmpty()) {
            Join<User, Role> roleJoin = user.join("roles");
            predicates.add(roleJoin.get("name").in(roles));
        }

        query.select(user)
            .where(cb.and(predicates.toArray(new Predicate[0])))
            .orderBy(cb.asc(user.get("name")));

        return em.createQuery(query).getResultList();
    }

    // Query cu agregări
    public List<Object[]> usersByRoleCount() {
        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<Object[]> query = cb.createQuery(Object[].class);
        Root<User> user = query.from(User.class);
        Join<User, Role> roles = user.join("roles");

        query.multiselect(roles.get("name"), cb.count(user))
            .groupBy(roles.get("name"))
            .orderBy(cb.desc(cb.count(user)));

        return em.createQuery(query).getResultList();
    }
}
\`\`\`

**Specification cu fetch joins (evită N+1)**

\`\`\`java
public static Specification<User> fetchRoles() {
    return (root, query, cb) -> {
        if (query.getResultType() != Long.class) { // skip count queries
            root.fetch("roles", JoinType.LEFT);
            query.distinct(true);
        }
        return null;
    };
}

// Utilizare: spec = spec.and(UserSpecifications.fetchRoles());
\`\`\`

• **Specification** > **Criteria API** pentru reutilizare și compunere
• Folosește metamodel JPA (User_.name, User_.age) pentru type-safety la atribute
• Pentru query-uri foarte complexe sau performanță maximă, consideră native SQL sau jOOQ`);

await up('34. Spring Data JPA Avansat', 'N+1 si query optimization', `**N+1 problem și query optimization** în Spring Data JPA — cea mai comună problemă de performanță și cum să o rezolvi cu fetch strategies corecte.

**Problema N+1 — exemplul clasic**

\`\`\`java
@Entity
public class User {
    @Id Long id;
    String name;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY) // default lazy
    private List<Order> orders;
}

// N+1 problem
List<User> users = userRepo.findAll();           // 1 query: SELECT * FROM users
for (User user : users) {
    System.out.println(user.getOrders().size()); // N queries: SELECT * FROM orders WHERE user_id=?
}
// Total: 1 + N queries pentru N useri = catastrofa la 1000 useri
\`\`\`

**Soluția 1: JOIN FETCH (JPQL)**

\`\`\`java
public interface UserRepository extends JpaRepository<User, Long> {

    @Query("SELECT u FROM User u JOIN FETCH u.orders")
    List<User> findAllWithOrders();

    @Query("SELECT u FROM User u LEFT JOIN FETCH u.orders WHERE u.active = true")
    List<User> findActiveWithOrders();
}
// Generează O SINGURĂ query cu LEFT JOIN
\`\`\`

**Soluția 2: @EntityGraph**

\`\`\`java
public interface UserRepository extends JpaRepository<User, Long> {

    @EntityGraph(attributePaths = {"orders", "roles"})
    List<User> findAll();

    @EntityGraph(attributePaths = {"orders.items"}) // nested fetch
    @Query("SELECT u FROM User u WHERE u.id IN :ids")
    List<User> findByIds(@Param("ids") List<Long> ids);
}

// Named graph
@Entity
@NamedEntityGraph(
    name = "User.withOrdersAndItems",
    attributeNodes = {
        @NamedAttributeNode(value = "orders", subgraph = "orders.items")
    },
    subgraphs = {
        @NamedSubgraph(name = "orders.items", attributeNodes = @NamedAttributeNode("items"))
    }
)
public class User { ... }
\`\`\`

**Soluția 3: BatchSize sau @BatchSize**

\`\`\`java
// application.yml
// spring:
//   jpa:
//     properties:
//       hibernate.default_batch_fetch_size: 20

// Sau pe entitate
@OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
@BatchSize(size = 20)
private List<Order> orders;

// Acum: 1 query pentru useri + (N/20) batch queries cu IN clause
// Pentru 1000 useri: 1 + 50 queries (mult mai bine decât 1001)
\`\`\`

**Projections — fetch DOAR ce-i necesar**

\`\`\`java
// DTO projection cu constructor
public interface UserSummary {
    Long getId();
    String getName();
    Integer getOrderCount();
}

public interface UserRepository extends JpaRepository<User, Long> {

    @Query("""
        SELECT u.id as id, u.name as name, COUNT(o) as orderCount
        FROM User u LEFT JOIN u.orders o
        GROUP BY u.id, u.name
        """)
    List<UserSummary> findAllSummaries();
}

// Beneficii: NU încarci entitățile complete, doar câmpurile cerute
// Hibernate generează SELECT id, name, ... fără orders, profile etc.
\`\`\`

**Identificarea N+1 în log-uri**

\`\`\`yaml
# application.yml — vezi query-urile generate
spring:
  jpa:
    show-sql: true
    properties:
      hibernate:
        format_sql: true
        generate_statistics: true
logging:
  level:
    org.hibernate.SQL: DEBUG
    org.hibernate.stat: DEBUG  # statistici per request
\`\`\`

**Alte optimizări JPA**

\`\`\`java
// 1. Pagination la JOIN FETCH — folosește subquery sau două queries
// JOIN FETCH + pagination în JPA = problemă; HQL_TUPLE_FETCH

// 2. Native query pentru raport-uri complexe
@Query(value = """
    SELECT u.name, COUNT(o.id) as orders, SUM(o.total) as revenue
    FROM users u LEFT JOIN orders o ON o.user_id = u.id
    WHERE u.created_at >= :since
    GROUP BY u.name
    HAVING COUNT(o.id) > 5
    ORDER BY revenue DESC
    """, nativeQuery = true)
List<Object[]> topUsers(@Param("since") LocalDate since);

// 3. ReadOnly tx pentru queries
@Transactional(readOnly = true)
public List<User> findReports() { ... } // Hibernate skip dirty checking

// 4. @QueryHints pentru cache
@QueryHints({@QueryHint(name = "org.hibernate.cacheable", value = "true")})
List<Country> findAll();
\`\`\`

• **Default LAZY** pentru @OneToMany și @ManyToMany — controlezi tu când să încarce
• **JOIN FETCH** când știi că ai nevoie de relație; **@EntityGraph** pentru cazuri reutilizabile
• **DTO projections** pentru query-uri read-only complexe — evită over-fetching`);

await up('35. Microservices Patterns', 'API Gateway cu Spring Cloud Gateway', `**API Gateway cu Spring Cloud Gateway** este punctul unic de intrare pentru un sistem de microservicii — routing, autentificare, rate limiting și transformări într-un singur loc.

**Setup și configurare de bază**

\`\`\`xml
<!-- pom.xml -->
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-gateway</artifactId>
</dependency>
\`\`\`

\`\`\`yaml
# application.yml — routing declarativ
spring:
  cloud:
    gateway:
      routes:
        - id: users-service
          uri: http://users:8080
          predicates:
            - Path=/api/users/**
          filters:
            - StripPrefix=2  # /api/users/123 → /123 către serviciu

        - id: orders-service
          uri: lb://orders-service  # cu service discovery (Eureka)
          predicates:
            - Path=/api/orders/**
            - Method=GET,POST
          filters:
            - StripPrefix=2
            - AddRequestHeader=X-Gateway, my-gateway

        - id: legacy-redirect
          uri: https://api.legacy.com
          predicates:
            - Path=/v1/**
          filters:
            - RewritePath=/v1/(?<segment>.*), /api/v2/$\\{segment}
\`\`\`

**Routing programmatic — RouteLocator**

\`\`\`java
@Configuration
public class GatewayConfig {

    @Bean
    public RouteLocator routes(RouteLocatorBuilder builder) {
        return builder.routes()
            .route("users-route", r -> r
                .path("/api/users/**")
                .filters(f -> f
                    .stripPrefix(2)
                    .addRequestHeader("X-Source", "gateway")
                    .retry(3))
                .uri("lb://users-service"))

            .route("orders-route", r -> r
                .path("/api/orders/**")
                .and().method(HttpMethod.POST)
                .filters(f -> f
                    .stripPrefix(2)
                    .requestRateLimiter(rl -> rl
                        .setRateLimiter(redisRateLimiter())))
                .uri("lb://orders-service"))

            .route("websocket-route", r -> r
                .path("/ws/**")
                .uri("lb:ws://chat-service"))
            .build();
    }

    @Bean
    public RedisRateLimiter redisRateLimiter() {
        return new RedisRateLimiter(10, 20); // 10 req/s, burst 20
    }
}
\`\`\`

**Filter custom — autentificare JWT**

\`\`\`java
@Component
public class JwtAuthenticationFilter extends AbstractGatewayFilterFactory<JwtAuthenticationFilter.Config> {

    private final JwtService jwtService;

    public JwtAuthenticationFilter(JwtService jwtService) {
        super(Config.class);
        this.jwtService = jwtService;
    }

    @Override
    public GatewayFilter apply(Config config) {
        return (exchange, chain) -> {
            ServerHttpRequest request = exchange.getRequest();
            String authHeader = request.getHeaders().getFirst("Authorization");

            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
                return exchange.getResponse().setComplete();
            }

            String token = authHeader.substring(7);
            try {
                Claims claims = jwtService.validate(token);
                // Adaugă user info în header pentru downstream services
                ServerHttpRequest modified = request.mutate()
                    .header("X-User-Id", claims.getSubject())
                    .header("X-User-Roles", claims.get("roles", String.class))
                    .build();
                return chain.filter(exchange.mutate().request(modified).build());
            } catch (JwtException e) {
                exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
                return exchange.getResponse().setComplete();
            }
        };
    }

    public static class Config {
        // configurare per route dacă necesar
    }
}
\`\`\`

**Circuit Breaker integration**

\`\`\`yaml
spring:
  cloud:
    gateway:
      routes:
        - id: payments
          uri: lb://payment-service
          predicates:
            - Path=/api/payments/**
          filters:
            - name: CircuitBreaker
              args:
                name: paymentsCB
                fallbackUri: forward:/fallback/payments
            - StripPrefix=2

resilience4j:
  circuitbreaker:
    instances:
      paymentsCB:
        slidingWindowSize: 10
        failureRateThreshold: 50
        waitDurationInOpenState: 10s
\`\`\`

\`\`\`java
@RestController
public class FallbackController {
    @GetMapping("/fallback/payments")
    public Mono<ResponseEntity<ErrorResponse>> paymentsFallback() {
        return Mono.just(ResponseEntity.status(503)
            .body(new ErrorResponse("PAYMENT_SERVICE_DOWN",
                "Serviciul plăți este temporar indisponibil")));
    }
}
\`\`\`

**Global filters (CORS, logging, tracing)**

\`\`\`java
@Bean
public GlobalFilter loggingFilter() {
    return (exchange, chain) -> {
        long start = System.currentTimeMillis();
        ServerHttpRequest req = exchange.getRequest();
        log.info("[GW] {} {}", req.getMethod(), req.getURI());

        return chain.filter(exchange).doFinally(signal -> {
            long elapsed = System.currentTimeMillis() - start;
            int status = exchange.getResponse().getStatusCode() != null
                ? exchange.getResponse().getStatusCode().value() : -1;
            log.info("[GW] {} {} → {} ({}ms)", req.getMethod(), req.getURI(), status, elapsed);
        });
    };
}

@Bean
public CorsWebFilter corsFilter() {
    CorsConfiguration config = new CorsConfiguration();
    config.setAllowedOrigins(List.of("https://myapp.com"));
    config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE"));
    config.setAllowedHeaders(List.of("*"));
    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", config);
    return new CorsWebFilter(source);
}
\`\`\`

• **API Gateway** ascunde topologia microserviciilor — clientul vede un singur API
• **Routing + filters + circuit breaker + rate limiting** într-un singur loc — observabil
• **Spring Cloud Gateway** e reactiv (WebFlux) — scalează la mii de RPS pe un singur nod`);

  console.log('Done script 11. Java module complete.');
  await p.$disconnect();
}

run().catch(e => { console.error(e); p.$disconnect(); process.exit(1); });
