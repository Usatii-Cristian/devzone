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

await up('JDBC and Database', 'JDBC Basics', `**JDBC Basics** (Java Database Connectivity) — API-ul standard Java pentru conectarea și interacțiunea cu baze de date relaționale prin SQL direct.

**Setup și conexiune**

\`\`\`java
// Dependință Maven
// <dependency>
//   <groupId>org.postgresql</groupId>
//   <artifactId>postgresql</artifactId>
//   <version>42.7.0</version>
// </dependency>

// Conexiune directă (fără pool)
String url = "jdbc:postgresql://localhost:5432/mydb";
String user = "admin";
String pass = "secret";

try (Connection conn = DriverManager.getConnection(url, user, pass)) {
    System.out.println("Conectat la: " + conn.getMetaData().getDatabaseProductName());
    // lucru cu baza de date
} // conn.close() automat
\`\`\`

**Operații CRUD cu PreparedStatement**

\`\`\`java
// CREATE — INSERT cu parametri (protecție SQL injection)
String insertSQL = "INSERT INTO users (name, email, age) VALUES (?, ?, ?)";
try (PreparedStatement ps = conn.prepareStatement(insertSQL,
        Statement.RETURN_GENERATED_KEYS)) {
    ps.setString(1, "Ana");
    ps.setString(2, "ana@example.com");
    ps.setInt(3, 30);
    int rows = ps.executeUpdate();

    try (ResultSet keys = ps.getGeneratedKeys()) {
        if (keys.next()) System.out.println("ID generat: " + keys.getLong(1));
    }
}

// READ — SELECT cu ResultSet
String selectSQL = "SELECT id, name, email, age FROM users WHERE age > ?";
try (PreparedStatement ps = conn.prepareStatement(selectSQL)) {
    ps.setInt(1, 18);
    try (ResultSet rs = ps.executeQuery()) {
        while (rs.next()) {
            long id = rs.getLong("id");
            String name = rs.getString("name");
            String email = rs.getString("email");
            int age = rs.getInt("age");
            System.out.printf("[%d] %s (%s) — %d ani%n", id, name, email, age);
        }
    }
}

// UPDATE
String updateSQL = "UPDATE users SET age = ? WHERE email = ?";
try (PreparedStatement ps = conn.prepareStatement(updateSQL)) {
    ps.setInt(1, 31);
    ps.setString(2, "ana@example.com");
    int affected = ps.executeUpdate();
    System.out.println("Rânduri actualizate: " + affected);
}

// DELETE
try (PreparedStatement ps = conn.prepareStatement("DELETE FROM users WHERE id = ?")) {
    ps.setLong(1, userId);
    ps.executeUpdate();
}
\`\`\`

**Mapare ResultSet → Obiecte**

\`\`\`java
record User(long id, String name, String email, int age) {}

public List<User> findAll(Connection conn) throws SQLException {
    List<User> users = new ArrayList<>();
    String sql = "SELECT id, name, email, age FROM users ORDER BY name";
    try (Statement stmt = conn.createStatement();
         ResultSet rs = stmt.executeQuery(sql)) {
        while (rs.next()) {
            users.add(new User(
                rs.getLong("id"),
                rs.getString("name"),
                rs.getString("email"),
                rs.getInt("age")
            ));
        }
    }
    return users;
}
\`\`\`

**Batch Operations**

\`\`\`java
// Inserare în batch — mult mai rapid decât insert pe rând
String sql = "INSERT INTO products (name, price) VALUES (?, ?)";
try (PreparedStatement ps = conn.prepareStatement(sql)) {
    conn.setAutoCommit(false); // explicit transaction
    for (Product p : products) {
        ps.setString(1, p.name());
        ps.setDouble(2, p.price());
        ps.addBatch();           // adaugă la batch
        if (ps.getBatchCount() % 1000 == 0) ps.executeBatch(); // flush periodic
    }
    ps.executeBatch();           // execută restul
    conn.commit();
} catch (SQLException e) {
    conn.rollback();
    throw e;
}
\`\`\`

• **PreparedStatement** mereu în loc de concatenare string — evită SQL injection
• **try-with-resources** pentru Connection, Statement, ResultSet — evită resource leaks
• JDBC e low-level — în aplicații reale folosești JPA/Hibernate sau Spring JDBC Template`);

await up('JDBC and Database', 'Transactions', `**Tranzacții și Connection Pooling** — mecanismele pentru atomicitate a operațiilor și gestionarea eficientă a conexiunilor în aplicații cu trafic.

**Tranzacții JDBC**

\`\`\`java
// Tranzacție explicită — ACID garantat
public void transfer(Connection conn, long fromId, long toId, double amount)
        throws SQLException {
    conn.setAutoCommit(false); // dezactivare auto-commit

    try {
        // Debit
        try (PreparedStatement debit = conn.prepareStatement(
                "UPDATE accounts SET balance = balance - ? WHERE id = ? AND balance >= ?")) {
            debit.setDouble(1, amount);
            debit.setLong(2, fromId);
            debit.setDouble(3, amount);
            int rows = debit.executeUpdate();
            if (rows == 0) throw new SQLException("Fonduri insuficiente sau cont invalid");
        }

        // Credit
        try (PreparedStatement credit = conn.prepareStatement(
                "UPDATE accounts SET balance = balance + ? WHERE id = ?")) {
            credit.setDouble(1, amount);
            credit.setLong(2, toId);
            credit.executeUpdate();
        }

        // Înregistrare audit
        try (PreparedStatement audit = conn.prepareStatement(
                "INSERT INTO transfers (from_id, to_id, amount, created_at) VALUES (?,?,?,NOW())")) {
            audit.setLong(1, fromId); audit.setLong(2, toId); audit.setDouble(3, amount);
            audit.executeUpdate();
        }

        conn.commit(); // toate sau nimic
    } catch (SQLException e) {
        conn.rollback(); // anulează toate modificările
        throw e;
    } finally {
        conn.setAutoCommit(true); // restaurează
    }
}
\`\`\`

**Savepoints — rollback parțial**

\`\`\`java
conn.setAutoCommit(false);
try {
    insertOrder(conn, order);
    Savepoint sp = conn.setSavepoint("after_order");

    try {
        insertPayment(conn, payment);
        insertShipping(conn, shipping);
    } catch (SQLException e) {
        conn.rollback(sp); // revine la savepoint, NU la begin
        insertFailedOrder(conn, order, e.getMessage()); // înregistrează eșecul
    }
    conn.commit();
}
\`\`\`

**Connection Pooling cu HikariCP**

\`\`\`java
// Dependință: com.zaxxer:HikariCP
import com.zaxxer.hikari.*;

HikariConfig config = new HikariConfig();
config.setJdbcUrl("jdbc:postgresql://localhost:5432/mydb");
config.setUsername("admin");
config.setPassword("secret");
config.setMaximumPoolSize(10);          // maxim 10 conexiuni
config.setMinimumIdle(2);              // minim 2 ținute active
config.setConnectionTimeout(30_000);   // 30s timeout la așteptare
config.setIdleTimeout(600_000);        // conexiunile idle se închid după 10min
config.setMaxLifetime(1_800_000);      // reînnoire conexiuni după 30min
config.setPoolName("MyPool");

HikariDataSource dataSource = new HikariDataSource(config);

// Utilizare — conexiunile sunt returnate la pool automat
try (Connection conn = dataSource.getConnection()) {
    // operații JDBC
} // conn.close() → returnează la pool, nu închide fizic

// Statistici pool
HikariPoolMXBean pool = dataSource.getHikariPoolMXBean();
System.out.println("Active: " + pool.getActiveConnections());
System.out.println("Idle: " + pool.getIdleConnections());
System.out.println("Total: " + pool.getTotalConnections());
\`\`\`

**Isolation Levels**

\`\`\`java
// Setare nivel de izolare per tranzacție
conn.setTransactionIsolation(Connection.TRANSACTION_READ_COMMITTED); // default
conn.setTransactionIsolation(Connection.TRANSACTION_REPEATABLE_READ);
conn.setTransactionIsolation(Connection.TRANSACTION_SERIALIZABLE);    // cel mai strict

// READ_UNCOMMITTED — citește date necommise (dirty reads) — evită
// READ_COMMITTED — citește doar committed (phantom reads posibile)
// REPEATABLE_READ — aceleași rânduri în tranzacție (phantom reads posibile)
// SERIALIZABLE — complet izolat (cel mai lent)
\`\`\`

• **HikariCP** este cel mai performant pool pentru Java — default în Spring Boot
• Dimensiunea optimă a pool-ului: formula lui Hikari = (cores * 2) + spindle_count
• **setAutoCommit(false)** la tranzacții complexe; **setAutoCommit(true)** implicit pentru operații simple`);

await up('Spring Boot Basics', 'Spring Boot Introduction', `**Spring Boot** este framework-ul Java cel mai popular pentru aplicații enterprise — configurare automată, servere embed, starter dependencies și production-ready features din start.

**Structura unui proiect Spring Boot**

\`\`\`
my-app/
├── src/main/java/com/example/
│   ├── MyApplication.java       (@SpringBootApplication — entry point)
│   ├── controller/              (REST controllers — @RestController)
│   ├── service/                 (logică business — @Service)
│   ├── repository/              (acces date — @Repository)
│   └── model/                   (entități + DTO-uri)
├── src/main/resources/
│   ├── application.properties   (sau application.yml)
│   └── static/, templates/
└── pom.xml                      (dependințe Maven)
\`\`\`

**Entry point și configurare**

\`\`\`java
@SpringBootApplication // = @Configuration + @EnableAutoConfiguration + @ComponentScan
public class MyApplication {
    public static void main(String[] args) {
        SpringApplication.run(MyApplication.class, args);
    }
}
\`\`\`

\`\`\`yaml
# application.yml
server:
  port: 8080
spring:
  application:
    name: my-app
  datasource:
    url: jdbc:postgresql://localhost:5432/mydb
    username: admin
    password: \${DB_PASSWORD}  # din environment variable
  jpa:
    hibernate:
      ddl-auto: validate    # validate în prod; create-drop în dev
    show-sql: false
logging:
  level:
    com.example: DEBUG
    org.springframework.web: INFO
\`\`\`

**REST Controller de bază**

\`\`\`java
@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;

    // Constructor injection — Spring injectează automat
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public List<UserDto> getAll() {
        return userService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDto> getById(@PathVariable Long id) {
        return userService.findById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public UserDto create(@RequestBody @Valid CreateUserRequest req) {
        return userService.create(req);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        userService.delete(id);
    }
}
\`\`\`

**Spring Boot Actuator — monitoring**

\`\`\`yaml
# pom.xml: spring-boot-starter-actuator
management:
  endpoints:
    web:
      exposure:
        include: health, info, metrics, env
  endpoint:
    health:
      show-details: when-authorized
\`\`\`

\`\`\`bash
GET /actuator/health   # {"status": "UP"}
GET /actuator/metrics  # metrici JVM, HTTP requests
GET /actuator/env      # configurare mediu
\`\`\`

• **@SpringBootApplication** activează auto-configuration — Spring Boot detectează și configurează beans automat
• **application.yml > application.properties** — mai lizibil, suportă ierarhie
• **Profile-specific config**: application-dev.yml, application-prod.yml activate cu \`--spring.profiles.active=prod\``);

await up('Spring Boot Basics', 'Spring DI', `**Spring DI și Data Access** — injecția de dependințe și accesul la date sunt nucleul Spring — IoC Container gestionează ciclul de viață al obiectelor.

**Dependency Injection cu Spring**

\`\`\`java
// @Service, @Repository, @Component — Spring beans gestionate automat
@Service
public class UserService {
    private final UserRepository userRepo;
    private final EmailService emailService;

    // Constructor injection — preferat (immutable, testabil)
    public UserService(UserRepository userRepo, EmailService emailService) {
        this.userRepo = userRepo;
        this.emailService = emailService;
    }

    public UserDto createUser(CreateUserRequest req) {
        if (userRepo.existsByEmail(req.email()))
            throw new ConflictException("Email deja folosit: " + req.email());

        User user = new User(req.name(), req.email());
        User saved = userRepo.save(user);
        emailService.sendWelcome(saved.getEmail());
        return UserDto.from(saved);
    }
}

// @Repository — marchează pentru Spring Data și exception translation
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsByEmail(String email);
    Optional<User> findByEmail(String email);
    List<User> findByNameContainingIgnoreCase(String name);
}
\`\`\`

**Spring Data JPA**

\`\`\`java
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    // constructori, getteri, setteri...
}

// JpaRepository oferă gratuit:
// save(), findById(), findAll(), delete(), count(), existsById()
// Derivate din nume: findByEmail(), findByNameContaining()
// @Query pentru SQL/JPQL custom
@Query("SELECT u FROM User u WHERE u.email LIKE %:domain%")
List<User> findByEmailDomain(@Param("domain") String domain);
\`\`\`

**@Value și @ConfigurationProperties**

\`\`\`java
// @Value pentru proprietăți individuale
@Service
public class NotificationService {
    @Value("\${app.notifications.email.from}")
    private String fromEmail;

    @Value("\${app.notifications.retry.max:3}") // cu valoare default
    private int maxRetries;
}

// @ConfigurationProperties pentru grupe de proprietăți
@ConfigurationProperties(prefix = "app.jwt")
public record JwtConfig(
    String secret,
    Duration expiration,
    String issuer
) {}

// application.yml:
// app.jwt.secret=xxx, app.jwt.expiration=1h, app.jwt.issuer=myapp

@EnableConfigurationProperties(JwtConfig.class)
@SpringBootApplication
public class MyApp { ... }
\`\`\`

**Profiles și Bean condițional**

\`\`\`java
@Configuration
public class DataSourceConfig {
    @Bean
    @Profile("dev")
    DataSource h2DataSource() { return new EmbeddedDatabaseBuilder()
        .setType(EmbeddedDatabaseType.H2).build(); }

    @Bean
    @Profile("prod")
    DataSource postgresDataSource(DataSourceProperties props) {
        return props.initializeDataSourceBuilder().build();
    }
}

// Bean condiționat pe proprietate
@Bean
@ConditionalOnProperty(name = "feature.cache.enabled", havingValue = "true")
CacheManager cacheManager() { return new ConcurrentMapCacheManager(); }
\`\`\`

• **Constructor injection** > @Autowired pe câmp — testabil fără Spring context, final fields
• **Spring Data JPA** generează implementarea repository automat din interfață
• **@Profile** pentru configurări diferite pe medii (dev/staging/prod)`);

  console.log('Done script 7.');
  await p.$disconnect();
}

run().catch(e => { console.error(e); p.$disconnect(); process.exit(1); });
