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

await up('Java Records and Sealed', 'Records', `**Records în Java** (Java 16+) sunt clase speciale pentru date imuabile — generează automat constructor, getteri, equals, hashCode și toString, eliminând sute de linii de boilerplate.

**Sintaxa și componentele unui record**

\`\`\`java
// Declarare record — compact și expresiv
record Point(double x, double y) {}

// Ce generează compilatorul:
// - Constructor: Point(double x, double y)
// - Getteri: x(), y() (nu getX()!)
// - equals() — bazat pe x și y
// - hashCode() — bazat pe x și y
// - toString() — "Point[x=3.0, y=4.0]"

Point p = new Point(3.0, 4.0);
System.out.println(p.x());           // 3.0
System.out.println(p);               // Point[x=3.0, y=4.0]
System.out.println(p.equals(new Point(3.0, 4.0))); // true

// Câmpurile sunt FINALE — imuabilitate garantată
// p.x = 5; // EROARE de compilare
\`\`\`

**Compact constructor și validare**

\`\`\`java
record Email(String address) {
    // Compact constructor — fără parametri, fără assignment
    // Modifici valoarea parametrului ÎNAINTE de assignment automat
    Email {
        Objects.requireNonNull(address, "Email nu poate fi null");
        address = address.toLowerCase().trim(); // normalizare
        if (!address.matches("^[^@]+@[^@]+\\.[^@]+$"))
            throw new IllegalArgumentException("Email invalid: " + address);
    }
}

record Range(int min, int max) {
    Range {
        if (min > max)
            throw new IllegalArgumentException("min(%d) > max(%d)".formatted(min, max));
    }

    // Metodă calculată
    public int size() { return max - min; }
    public boolean contains(int value) { return value >= min && value <= max; }
}

Range r = new Range(1, 10);
r.size();        // 9
r.contains(5);   // true
\`\`\`

**Records ca DTO-uri**

\`\`\`java
// Request DTO
record CreateUserRequest(
    @NotNull @Size(min=2, max=50) String name,
    @NotNull @Email String email,
    @NotNull @Min(0) @Max(150) Integer age
) {}

// Response DTO
record UserResponse(Long id, String name, String email, LocalDateTime createdAt) {
    // Factory method pentru conversie din entitate
    static UserResponse from(User user) {
        return new UserResponse(user.getId(), user.getName(),
            user.getEmail(), user.getCreatedAt());
    }
}

// Utilizare în controller Spring
@PostMapping("/users")
UserResponse create(@RequestBody @Valid CreateUserRequest req) {
    return UserResponse.from(userService.create(req));
}
\`\`\`

**Records cu interfețe și metode**

\`\`\`java
interface Printable { String toPrettyString(); }

record Money(BigDecimal amount, String currency) implements Printable, Comparable<Money> {

    // Validare și normalizare
    Money {
        Objects.requireNonNull(amount);
        Objects.requireNonNull(currency);
        if (amount.scale() > 2)
            amount = amount.setScale(2, RoundingMode.HALF_UP);
        currency = currency.toUpperCase();
    }

    // Factory methods
    static Money of(double amount, String currency) {
        return new Money(BigDecimal.valueOf(amount), currency);
    }
    static Money zero(String currency) { return new Money(BigDecimal.ZERO, currency); }

    // Operații
    Money add(Money other) {
        if (!currency.equals(other.currency))
            throw new IllegalArgumentException("Monede diferite!");
        return new Money(amount.add(other.amount), currency);
    }

    @Override
    public String toPrettyString() {
        return "%.2f %s".formatted(amount, currency);
    }

    @Override
    public int compareTo(Money other) { return amount.compareTo(other.amount); }
}
\`\`\`

• Records sunt **final** implicit — nu pot fi extinse (dar pot implementa interfețe)
• **Câmpurile nu pot fi mutable** — records sunt VALUE OBJECTS prin design
• Perfecte pentru: DTO-uri, Value Objects, Tuples, responses API, event payloads`);

await up('Java Records and Sealed', 'Sealed Classes', `**Sealed Classes și Pattern Matching** (Java 17+) permit modelarea algebrică a tipurilor — ierarhii închise cu verificare exhaustivă a cazurilor la compilare.

**Sealed Classes — ierarhii cu membri controlați**

\`\`\`java
// sealed class + permits — definești exact cine poate extinde
sealed interface Shape permits Circle, Rectangle, Triangle, Polygon {}

// permits = non-sealed (oricine poate extinde), sealed (continuă), final
record Circle(double radius) implements Shape {}
record Rectangle(double width, double height) implements Shape {}
final class Triangle implements Shape {    // final — nu se mai extinde
    final double base, height;
    Triangle(double b, double h) { base = b; height = h; }
}
non-sealed class Polygon implements Shape { // non-sealed — deschis pentru extensie
    // poate fi extinsă de oricine
}
\`\`\`

**Pattern Matching cu Switch Exhaustiv**

\`\`\`java
// Compilatorul știe toate variantele → nu e nevoie de default
double area(Shape shape) {
    return switch (shape) {
        case Circle c     -> Math.PI * c.radius() * c.radius();
        case Rectangle r  -> r.width() * r.height();
        case Triangle t   -> 0.5 * t.base * t.height;
        case Polygon p    -> computePolygonArea(p); // non-sealed: există default implicit
    };
}

// Guarded patterns cu when
String describe(Shape shape) {
    return switch (shape) {
        case Circle c when c.radius() > 10  -> "Cerc mare (r=" + c.radius() + ")";
        case Circle c                       -> "Cerc mic (r=" + c.radius() + ")";
        case Rectangle r when r.width() == r.height() -> "Pătrat (" + r.width() + ")";
        case Rectangle r                    -> "Dreptunghi " + r.width() + "x" + r.height();
        case Triangle t                     -> "Triunghi";
        default                             -> "Altă formă";
    };
}
\`\`\`

**Tipuri algebrice — Result și Option**

\`\`\`java
// Modelarea erorilor cu sealed interface
sealed interface Result<T> permits Result.Ok, Result.Err {
    record Ok<T>(T value) implements Result<T> {}
    record Err<T>(String message, Throwable cause) implements Result<T> {
        Err(String message) { this(message, null); }
    }

    static <T> Result<T> ok(T value) { return new Ok<>(value); }
    static <T> Result<T> err(String msg) { return new Err<>(msg); }
    static <T> Result<T> err(String msg, Throwable t) { return new Err<>(msg, t); }
}

Result<User> findUser(long id) {
    try {
        return Result.ok(userRepo.findById(id).orElseThrow());
    } catch (Exception e) {
        return Result.err("User " + id + " negăsit", e);
    }
}

// Utilizare elegantă
switch (findUser(1L)) {
    case Result.Ok<User> ok   -> displayUser(ok.value());
    case Result.Err<User> err -> showError(err.message());
}
\`\`\`

**Event Sourcing cu sealed events**

\`\`\`java
sealed interface UserEvent permits
    UserEvent.Registered,
    UserEvent.EmailChanged,
    UserEvent.Deactivated {

    record Registered(String userId, String email, Instant timestamp) implements UserEvent {}
    record EmailChanged(String userId, String oldEmail, String newEmail) implements UserEvent {}
    record Deactivated(String userId, String reason) implements UserEvent {}
}

void handleEvent(UserEvent event) {
    switch (event) {
        case UserEvent.Registered r -> {
            sendWelcomeEmail(r.email());
            createProfile(r.userId());
        }
        case UserEvent.EmailChanged e -> updateEmailIndex(e.oldEmail(), e.newEmail());
        case UserEvent.Deactivated d  -> revokeTokens(d.userId());
    }
}
\`\`\`

• **Sealed + Records + Pattern Matching** = trio puternic pentru DDD și event-driven architecture
• Compilatorul verifică exhaustivitatea switch-ului — dacă adaugi un nou tip sealed, compilatorul indică toate switch-urile ce trebuie actualizate
• **non-sealed** permite extensibilitate acolo unde ierarhia trebuie să rămână deschisă`);

await up('Unit Testing with JUnit', 'JUnit 5 Basics', `**JUnit 5** este framework-ul de testare standard pentru Java — adnotări clare, assertions puternice și extensii pentru toate nevoile de testare unitară.

**Structura unui test JUnit 5**

\`\`\`java
import org.junit.jupiter.api.*;
import static org.junit.jupiter.api.Assertions.*;

class CalculatorTest {

    private Calculator calculator; // SUT (System Under Test)

    @BeforeEach
    void setUp() {
        calculator = new Calculator(); // inițializare înainte de FIECARE test
    }

    @AfterEach
    void tearDown() {
        // curățare după fiecare test (dacă e necesar)
    }

    @BeforeAll
    static void setUpAll() {
        // Executat o singură dată înainte de toate testele (static!)
    }

    @Test
    @DisplayName("Adunare cu numere pozitive")
    void add_PositiveNumbers_ReturnsSum() {
        // Arrange
        int a = 3, b = 4;
        // Act
        int result = calculator.add(a, b);
        // Assert
        assertEquals(7, result, "3 + 4 trebuie să fie 7");
    }

    @Test
    void divide_ByZero_ThrowsException() {
        ArithmeticException ex = assertThrows(ArithmeticException.class,
            () -> calculator.divide(10, 0));
        assertTrue(ex.getMessage().contains("zero"));
    }
}
\`\`\`

**Assertions JUnit 5**

\`\`\`java
// Assertions simple
assertEquals(expected, actual);
assertNotEquals(5, result);
assertTrue(condition);
assertFalse(condition);
assertNull(value);
assertNotNull(value);

// Assertions pe colecții și arrays
assertArrayEquals(new int[]{1,2,3}, result);
assertIterableEquals(List.of(1,2,3), list);

// assertAll — grupare (toate erorile raportate, nu doar prima)
assertAll("user validation",
    () -> assertEquals("Ana", user.getName()),
    () -> assertEquals("ana@test.com", user.getEmail()),
    () -> assertTrue(user.isActive())
);

// assertThrows
assertThrows(IllegalArgumentException.class, () -> new Range(10, 1));

// assertTimeout
assertTimeout(Duration.ofMillis(100), () -> fastOperation());

// AssertJ (library suplimentar) — fluent assertions
assertThat(list).hasSize(3).contains("Ana").doesNotContain("Dave");
assertThat(user.getAge()).isBetween(18, 65);
\`\`\`

**Teste parametrizate**

\`\`\`java
@ParameterizedTest
@ValueSource(ints = {1, 2, 3, 4, 5})
void isPositive_ValidInputs_ReturnsTrue(int value) {
    assertTrue(value > 0);
}

@ParameterizedTest
@CsvSource({
    "3, 4, 7",
    "0, 0, 0",
    "-1, 1, 0",
    "100, 200, 300"
})
void add_Various_ReturnsExpected(int a, int b, int expected) {
    assertEquals(expected, calculator.add(a, b));
}

@ParameterizedTest
@MethodSource("emailProvider")
void isValidEmail_VariousInputs(String email, boolean expected) {
    assertEquals(expected, EmailValidator.isValid(email));
}

static Stream<Arguments> emailProvider() {
    return Stream.of(
        Arguments.of("test@example.com", true),
        Arguments.of("invalid", false),
        Arguments.of("@domain.com", false),
        Arguments.of("user@", false)
    );
}
\`\`\`

**Test lifecycle și organizare**

\`\`\`java
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@DisplayName("User Service Tests")
class UserServiceTest {
    @Test @Order(1) @DisplayName("Creare utilizator nou")
    void createUser_ValidInput_Succeeds() { }

    @Test @Order(2) @Tag("slow")
    void findAllUsers_LargeDataset_ReturnsAll() { }

    @Disabled("Bug #123 — nu e rezolvat")
    @Test
    void brokenTest() { }

    @RepeatedTest(3) // rulat de 3 ori
    void repeatedOperation() { }
}
\`\`\`

• **Naming convention**: methodName_Condition_ExpectedResult (ex: divide_ByZero_ThrowsException)
• **@BeforeEach** creează instanțe noi — testele sunt izolate, nu depind între ele
• **Teste parametrizate** acoperă cazuri multiple cu un singur test — mai concis și mai ușor de extins`);

await up('Unit Testing with JUnit', 'Mockito', `**Mockito** este cel mai popular framework de mocking pentru Java — simulează dependințele externe pentru a testa unitarîn izolare, fără baze de date sau servicii reale.

**Setup și creare mock-uri**

\`\`\`java
import org.mockito.*;
import org.mockito.junit.jupiter.MockitoExtension;
import static org.mockito.Mockito.*;
import static org.mockito.BDDMockito.*;

@ExtendWith(MockitoExtension.class) // JUnit 5 + Mockito integration
class UserServiceTest {

    @Mock
    UserRepository userRepo;     // mock automat

    @Mock
    EmailService emailService;

    @InjectMocks
    UserService userService;     // injectează mock-urile

    @Test
    void createUser_ValidInput_SavesAndSendsEmail() {
        // Given
        var req = new CreateUserRequest("Ana", "ana@test.com", 30);
        var savedUser = new User(1L, "Ana", "ana@test.com");
        when(userRepo.existsByEmail("ana@test.com")).thenReturn(false);
        when(userRepo.save(any(User.class))).thenReturn(savedUser);

        // When
        var result = userService.createUser(req);

        // Then
        assertEquals("Ana", result.name());
        verify(userRepo).save(any(User.class));     // chemat exact o dată
        verify(emailService).sendWelcome("ana@test.com");
    }
}
\`\`\`

**Stubbing avansat**

\`\`\`java
// thenReturn — valori multiple
when(userRepo.findById(1L))
    .thenReturn(Optional.of(user))  // prima apelare
    .thenReturn(Optional.empty());  // a doua apelare+

// thenThrow — simulare excepții
when(userRepo.findById(-1L))
    .thenThrow(new IllegalArgumentException("ID invalid"));

// thenAnswer — logică dinamică
when(userRepo.save(any(User.class)))
    .thenAnswer(inv -> {
        User u = inv.getArgument(0);
        u.setId(ThreadLocalRandom.current().nextLong(1, 1000));
        return u;
    });

// doNothing pentru void methods
doNothing().when(emailService).sendWelcome(anyString());

// BDD style (Given/When/Then)
given(userRepo.existsByEmail("existing@test.com")).willReturn(true);
\`\`\`

**Argument Matchers și Captor**

\`\`\`java
// Argument matchers
verify(userRepo).save(any(User.class));
verify(emailService).sendWelcome(eq("ana@test.com"));
verify(userRepo).findByEmailContaining(contains("@test"));
verify(service).process(argThat(u -> u.getAge() >= 18));

// ArgumentCaptor — capturezi argumentele pentru inspecție
@Captor
ArgumentCaptor<User> userCaptor;

verify(userRepo).save(userCaptor.capture());
User saved = userCaptor.getValue();
assertEquals("ANA", saved.getName()); // verifici ce s-a salvat efectiv
assertEquals("ana@test.com", saved.getEmail());

// Multiple captures
verify(emailService, times(2)).send(userCaptor.capture());
List<User> allCaptured = userCaptor.getAllValues();
\`\`\`

**Verificări avansate**

\`\`\`java
// Nunăr de apeluri
verify(service, times(3)).process(any());
verify(service, atLeast(1)).notify(anyString());
verify(service, atMost(5)).retry();
verify(service, never()).deleteAll();

// Ordine apeluri
InOrder inOrder = inOrder(userRepo, emailService);
inOrder.verify(userRepo).save(any());
inOrder.verify(emailService).sendWelcome(anyString());

// No more interactions
verifyNoMoreInteractions(userRepo);
verifyNoInteractions(auditService); // niciun apel deloc
\`\`\`

• **@InjectMocks** injectează prin constructor, setter sau câmp — preferi constructor injection
• **Mockito.spy()** wraps un obiect real — execută codul real, dar poate fi interceptat
• Nu mocka value objects (String, Integer, record-uri) — creează instanțe reale; mocka doar servicii și repository-uri`);

  console.log('Done script 8.');
  await p.$disconnect();
}

run().catch(e => { console.error(e); p.$disconnect(); process.exit(1); });
