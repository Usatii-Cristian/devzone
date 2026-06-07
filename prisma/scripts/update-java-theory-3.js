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

await up('8. String', 'Operații comune', `**Operații comune pe String** sunt printre cele mai frecvente sarcini în Java — căutare, modificare, comparare și transformare de șiruri de caractere.

**Metode de bază**

\`\`\`java
String s = "  Hello, Java World!  ";

// Informații
int len = s.length();                    // 22
boolean empty = s.isEmpty();             // false
boolean blank = s.isBlank();             // false (doar whitespace → true)
char c = s.charAt(7);                    // 'J'
int idx = s.indexOf("Java");             // 8
int last = s.lastIndexOf("o");           // 16

// Transformare
String trimmed = s.trim();               // "Hello, Java World!"
String stripped = s.strip();             // Unicode-aware (prefer)
String lower = trimmed.toLowerCase();    // "hello, java world!"
String upper = trimmed.toUpperCase();    // "HELLO, JAVA WORLD!"
String replaced = s.replace("Java", "Python"); // înlocuiește toate apariițile
String noSpaces = s.replaceAll("\\s+", " ").strip(); // regex replace
\`\`\`

**Comparare de string-uri**

\`\`\`java
String a = "Ana";
String b = "ana";
String c = new String("Ana"); // obiect diferit

a == c;             // false (referință diferită)
a.equals(c);        // true (valoare egală)
a.equalsIgnoreCase(b); // true
a.compareTo(b);     // negativ (A < a în ASCII)
a.compareToIgnoreCase(b); // 0 (egale)

// Verificare conținut
String email = "user@example.com";
email.startsWith("user");    // true
email.endsWith(".com");      // true
email.contains("@");         // true
email.matches(".*@.*\\..*"); // true (regex)
\`\`\`

**Substrings și splitare**

\`\`\`java
String text = "Ana,Bob,Carol,David";

// Substring
String sub = text.substring(4);     // "Bob,Carol,David"
String mid = text.substring(4, 7);  // "Bob"

// Split
String[] parts = text.split(",");      // ["Ana", "Bob", "Carol", "David"]
String[] first2 = text.split(",", 2); // ["Ana", "Bob,Carol,David"] — limit

// Join
String joined = String.join(" | ", parts); // "Ana | Bob | Carol | David"
String joined2 = String.join(", ", List.of("x", "y", "z")); // "x, y, z"

// Chars
"Hello".chars().forEach(ch -> System.out.print((char)ch + " ")); // H e l l o
\`\`\`

**String.format și formatted**

\`\`\`java
// printf-style formatting
String msg = String.format("%-10s %5d %8.2f", "Ana", 30, 1234.5);
// "Ana           30  1234.50"

// Java 15+ — metoda formatted pe instanță
String report = "Utilizator: %s, Vârstă: %d, Sold: %.2f RON"
    .formatted("Ana", 30, 1234.5);

// Formatare tip, umplere
String hex = "%08X".formatted(255); // "000000FF"
String pct = "%.1f%%".formatted(87.456); // "87.5%"
\`\`\`

• **strip()** față de trim() pentru Unicode corect (spații non-breaking etc.)
• **equals()** mereu pentru comparare, nu \`==\` — string-urile din String Pool pot părea egale cu \`==\`, dar nu e garantat
• **String.format()** sau text blocks pentru mesaje complexe — evită concatenarea cu \`+\` în bucle`);

await up('8. String', 'StringBuilder', `**StringBuilder** este clasa pentru construirea eficientă a string-urilor — evită crearea de obiecte intermediare la concatenarea în bucle, esențial pentru performanță.

**Problema concatenării cu +**

\`\`\`java
// GREȘIT pentru bucle — creează N obiecte String noi!
String result = "";
for (int i = 0; i < 10000; i++) {
    result += i + ", ";  // O(n²) — catastrofal pentru N mare
}

// CORECT — StringBuilder este mutabil, O(n)
StringBuilder sb = new StringBuilder();
for (int i = 0; i < 10000; i++) {
    sb.append(i).append(", ");
}
String result2 = sb.toString(); // conversie finală o singură dată
\`\`\`

**API complet al StringBuilder**

\`\`\`java
StringBuilder sb = new StringBuilder("Hello");

// Adăugare
sb.append(", World");          // "Hello, World"
sb.append('!');                // "Hello, World!"
sb.insert(5, " Beautiful");    // "Hello Beautiful, World!"

// Modificare
sb.replace(6, 15, "Wonderful"); // înlocuiește intervalul [6,15)
sb.delete(5, 15);               // șterge intervalul
sb.deleteCharAt(0);             // șterge caracterul de la index

// Informații
sb.length();                   // lungimea curentă
sb.charAt(0);                  // primul caracter
sb.indexOf("World");           // poziția primei apariții
sb.substring(0, 5);            // fără modificarea sb

// Transformare
sb.reverse();                  // inversează conținutul
sb.setCharAt(0, 'h');          // modifică caracter specific

String result = sb.toString(); // conversie finală
\`\`\`

**Pattern: construire SQL/HTML/JSON dinamic**

\`\`\`java
// Construire query SQL dinamic
public String buildQuery(String table, List<String> conditions) {
    StringBuilder sb = new StringBuilder("SELECT * FROM ");
    sb.append(table);

    if (!conditions.isEmpty()) {
        sb.append(" WHERE ");
        for (int i = 0; i < conditions.size(); i++) {
            if (i > 0) sb.append(" AND ");
            sb.append(conditions.get(i));
        }
    }
    return sb.toString();
}

// Construire HTML
StringBuilder html = new StringBuilder("<ul>\\n");
for (String item : items) {
    html.append("  <li>").append(escapeHtml(item)).append("</li>\\n");
}
html.append("</ul>");
\`\`\`

**StringJoiner și Collectors.joining()**

\`\`\`java
// StringJoiner — mai elegant pentru liste cu separator
StringJoiner sj = new StringJoiner(", ", "[", "]");
sj.add("Ana");
sj.add("Bob");
sj.add("Carol");
System.out.println(sj.toString()); // [Ana, Bob, Carol]

// Stream + joining — cel mai modern
String csv = List.of("x", "y", "z")
    .stream()
    .collect(Collectors.joining(", ", "{", "}")); // {x, y, z}
\`\`\`

• **StringBuilder** vs **StringBuffer**: StringBuffer e thread-safe (synchronized) dar mai lent — folosește StringBuilder în single-threaded code
• Setează capacity inițial dacă știi dimensiunea: \`new StringBuilder(1024)\`
• **+** pentru concatenare simplă (compilatorul optimizează la StringBuilder automat); StringBuilder manual pentru bucle`);

await up('8. String', 'Format și String.format', `**String.format și formatarea avansată** permit construirea de output structurat — tabele, rapoarte, mesaje localizate cu control precis asupra formatului numerelor, datelor și șirurilor.

**Specificatorii de format**

\`\`\`java
// %s — String, %d — int/long, %f — float/double, %c — char, %b — boolean
// %n — newline platform-agnostic

// Lățime și aliniere
String.format("|%10s|", "Ana");      // |       Ana| (aliniat dreapta)
String.format("|%-10s|", "Ana");     // |Ana       | (aliniat stânga)
String.format("|%10d|", 42);         // |        42|
String.format("|%-10d|", 42);        // |42        |

// Numere cu precizie
String.format("%.2f", 3.14159);      // "3.14"
String.format("%10.3f", 3.14159);    // "     3.142"
String.format("%,d", 1000000);       // "1,000,000" (separator mii)
String.format("%+.2f", 3.14);        // "+3.14"
String.format("%(f", -3.14);         // "(3.140000)" (negativ în paranteze)

// Hex, octal, binar
String.format("%08X", 255);          // "000000FF"
String.format("%o", 8);              // "10" (octal)
String.format("%e", 123456.789);     // "1.234568e+05"
\`\`\`

**Formatare date și timp**

\`\`\`java
import java.time.*;
import java.time.format.*;

LocalDate date = LocalDate.of(2025, 5, 24);
LocalDateTime dt = LocalDateTime.of(2025, 5, 24, 14, 30, 0);

// Pattern custom
DateTimeFormatter fmt = DateTimeFormatter.ofPattern("dd.MM.yyyy");
String formatted = date.format(fmt); // "24.05.2025"

DateTimeFormatter dtFmt = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm");
String dtStr = dt.format(dtFmt); // "24/05/2025 14:30"

// Predefined formats
String iso = date.format(DateTimeFormatter.ISO_LOCAL_DATE); // "2025-05-24"

// Parsing
LocalDate parsed = LocalDate.parse("24.05.2025", fmt);
\`\`\`

**Construire rapoarte tabelate**

\`\`\`java
// Header
System.out.printf("%-20s %8s %12s %10s%n", "Produs", "Cantit.", "Preț unit.", "Total");
System.out.println("-".repeat(52));

// Rânduri
List<OrderItem> items = getItems();
double grandTotal = 0;
for (OrderItem item : items) {
    double total = item.qty() * item.price();
    grandTotal += total;
    System.out.printf("%-20s %8d %12.2f %10.2f%n",
        item.name(), item.qty(), item.price(), total);
}
System.out.println("=".repeat(52));
System.out.printf("%-20s %8s %12s %10.2f%n", "TOTAL", "", "", grandTotal);
\`\`\`

**Formatted (Java 15+) și text blocks cu format**

\`\`\`java
// Metoda formatted() direct pe string literal
String msg = "Salut, %s! Ai %d puncte (locul %d din %d).".formatted(name, points, rank, total);

// Text block cu format
String html = """
    <div class="user">
        <h2>%s</h2>
        <p>Vârstă: %d | Email: %s</p>
    </div>
    """.formatted(user.name(), user.age(), user.email());
\`\`\`

• **%n** în loc de \\n pentru portabilitate cross-platform (Windows CRLF vs Unix LF)
• **printf()** scrie direct la consolă; **String.format()** returnează string
• **Locale** specifică pentru separatori: \`String.format(Locale.GERMAN, "%,.2f", 1000.5)\` → "1.000,50"`);

await up('9. Recursivitate', 'Concepte și exemple', `**Recursivitatea în Java** este tehnica prin care o metodă se apelează pe ea însăși pentru a rezolva probleme care se descompun în subprobleme de același tip.

**Structura de bază**

\`\`\`java
// Orice funcție recursivă are:
// 1. Cazul de bază (base case) — oprire
// 2. Cazul recursiv — se apropie de cazul de bază

public static int factorial(int n) {
    if (n <= 1) return 1;           // baza: 0! = 1! = 1
    return n * factorial(n - 1);    // recursiv: n! = n * (n-1)!
}
// factorial(5) = 5 * factorial(4) = 5 * 4 * 3 * 2 * 1 = 120

public static int fibonacci(int n) {
    if (n <= 1) return n;           // baza: fib(0)=0, fib(1)=1
    return fibonacci(n-1) + fibonacci(n-2); // recursiv
}
\`\`\`

**Recursivitate pe structuri arborescente**

\`\`\`java
class TreeNode {
    int val;
    TreeNode left, right;
    TreeNode(int val) { this.val = val; }
}

// Suma tuturor nodurilor
int sum(TreeNode node) {
    if (node == null) return 0;          // baza: nod null = 0
    return node.val + sum(node.left) + sum(node.right);
}

// Adâncimea maximă
int maxDepth(TreeNode node) {
    if (node == null) return 0;
    return 1 + Math.max(maxDepth(node.left), maxDepth(node.right));
}

// Parcurgere inorder (stânga-rădăcină-dreapta)
void inorder(TreeNode node, List<Integer> result) {
    if (node == null) return;
    inorder(node.left, result);
    result.add(node.val);
    inorder(node.right, result);
}
\`\`\`

**Probleme clasice**

\`\`\`java
// Suma cifrelor
int sumDigits(int n) {
    if (n < 10) return n;
    return n % 10 + sumDigits(n / 10);
}

// Putere eficientă (exponentiation by squaring)
double pow(double base, int exp) {
    if (exp == 0) return 1;
    if (exp % 2 == 0) {
        double half = pow(base, exp / 2);
        return half * half;  // O(log n) în loc de O(n)
    }
    return base * pow(base, exp - 1);
}

// Inversarea unui șir
String reverse(String s) {
    if (s.length() <= 1) return s;
    return reverse(s.substring(1)) + s.charAt(0);
}
\`\`\`

**Tail recursion și stack overflow**

\`\`\`java
// Stack overflow pentru n mare (fiecare apel ocupă un frame pe stack)
// Java nu optimizează tail recursion (spre deosebire de Scala/Kotlin)

// Conversie la iterativ pentru n mare
int factorialIterative(int n) {
    int result = 1;
    for (int i = 2; i <= n; i++) result *= i;
    return result;
}

// Sau cu accumulator (tail-recursive style, dar Java nu optimizează)
int factTail(int n, int acc) {
    if (n <= 1) return acc;
    return factTail(n - 1, n * acc); // tail call
}
\`\`\`

• Orice algoritm recursiv poate fi scris iterativ — preferi iterativ dacă n poate fi mare
• **Stack overflow** apare rapid: Java default stack ~512KB, fiecare frame ~100 bytes = ~5000 apeluri
• Recursivitatea excelează pentru **arbori, grafuri, divide and conquer** unde codul e mult mai clar`);

await up('9. Recursivitate', 'Memoization', `**Memoization** este tehnica de optimizare a recursivității — stochezi rezultatele calculelor anterioare pentru a evita recomputarea, transformând exponential în liniar sau polinomial.

**Problema fără memoization**

\`\`\`java
// Fibonacci naiv — O(2^n): fib(50) face miliarde de apeluri
int fibNaive(int n) {
    if (n <= 1) return n;
    return fibNaive(n-1) + fibNaive(n-2);
}
// fib(40) = ~1 miliard de apeluri → secunde
// fib(50) = ~1 trilion de apeluri → ore
\`\`\`

**Memoization cu HashMap**

\`\`\`java
// Cu map static sau câmp de clasă
Map<Integer, Long> memo = new HashMap<>();

long fibMemo(int n) {
    if (n <= 1) return n;
    if (memo.containsKey(n)) return memo.get(n); // cache hit

    long result = fibMemo(n-1) + fibMemo(n-2);
    memo.put(n, result); // stochează în cache
    return result;
}
// fib(50) = 12 586 269 025 — instant!
// fib(100) = 354 224 848 179 261 915 075 — O(n) timp, O(n) spațiu

// Varianta bottom-up (tabulare) — și mai eficientă
long fibDP(int n) {
    if (n <= 1) return n;
    long[] dp = new long[n + 1];
    dp[0] = 0; dp[1] = 1;
    for (int i = 2; i <= n; i++) {
        dp[i] = dp[i-1] + dp[i-2];
    }
    return dp[n];
}
\`\`\`

**Memoization generică**

\`\`\`java
// Memoize orice funcție cu un parametru
public static <T, R> Function<T, R> memoize(Function<T, R> fn) {
    Map<T, R> cache = new HashMap<>();
    return input -> cache.computeIfAbsent(input, fn);
}

// Utilizare
Function<Integer, Long> memoFib = memoize(n -> {
    if (n <= 1) return (long) n;
    // recursiv prin referință self — trebuie declarat înainte
    return memoFib.apply(n-1) + memoFib.apply(n-2);
});

// computeIfAbsent — atomic put-if-absent cu funcție de creare
Map<String, List<Integer>> grouped = new HashMap<>();
grouped.computeIfAbsent("even", k -> new ArrayList<>()).add(4);
\`\`\`

**Probleme clasice cu memoization**

\`\`\`java
// Cel mai lung subșir comun (LCS)
Map<String, Integer> lcsCache = new HashMap<>();

int lcs(String a, String b, int i, int j) {
    if (i == 0 || j == 0) return 0;
    String key = i + "," + j;
    if (lcsCache.containsKey(key)) return lcsCache.get(key);

    int result;
    if (a.charAt(i-1) == b.charAt(j-1))
        result = 1 + lcs(a, b, i-1, j-1);
    else
        result = Math.max(lcs(a, b, i-1, j), lcs(a, b, i, j-1));

    lcsCache.put(key, result);
    return result;
}
// lcs("ABCBDAB", "BDCAB") = 4 ("BCAB")
\`\`\`

• Memoization = **top-down DP** (recursiv + cache); tabularea = **bottom-up DP** (iterativ + array)
• Cheile de cache trebuie să reprezinte COMPLET starea problemei (toți parametrii relevanți)
• **computeIfAbsent** > containsKey + put — o singură căutare în HashMap`);

await up('9. Recursivitate', 'Backtracking', `**Backtracking** este tehnica de explorare a tuturor soluțiilor posibile prin recursivitate — încearcă o opțiune, dacă nu funcționează revine și încearcă alta.

**Structura generală**

\`\`\`java
// Template backtracking
void backtrack(State state, List<Solution> solutions) {
    if (isSolution(state)) {
        solutions.add(buildSolution(state)); // soluție găsită
        return;
    }
    for (Choice choice : getChoices(state)) {
        if (isValid(state, choice)) {
            makeChoice(state, choice);      // aplică alegerea
            backtrack(state, solutions);    // explorează
            undoChoice(state, choice);      // revine (backtrack)
        }
    }
}
\`\`\`

**Problema N-Queens**

\`\`\`java
List<List<String>> solveNQueens(int n) {
    List<List<String>> result = new ArrayList<>();
    int[] queens = new int[n]; // queens[row] = col
    Arrays.fill(queens, -1);
    backtrack(queens, 0, n, result);
    return result;
}

void backtrack(int[] queens, int row, int n, List<List<String>> result) {
    if (row == n) {
        result.add(buildBoard(queens, n)); // soluție completă
        return;
    }
    for (int col = 0; col < n; col++) {
        if (isValid(queens, row, col)) {
            queens[row] = col;
            backtrack(queens, row + 1, n, result);
            queens[row] = -1; // undo
        }
    }
}

boolean isValid(int[] queens, int row, int col) {
    for (int r = 0; r < row; r++) {
        if (queens[r] == col) return false; // aceeași coloană
        if (Math.abs(queens[r] - col) == Math.abs(r - row)) return false; // diagonală
    }
    return true;
}
\`\`\`

**Permutări și combinări**

\`\`\`java
// Toate permutările unui array
void permutations(int[] arr, int start, List<int[]> result) {
    if (start == arr.length) {
        result.add(arr.clone());
        return;
    }
    for (int i = start; i < arr.length; i++) {
        swap(arr, start, i);
        permutations(arr, start + 1, result);
        swap(arr, start, i); // undo swap
    }
}

// Toate submulțimile (subsets)
void subsets(int[] nums, int idx, List<Integer> current, List<List<Integer>> result) {
    result.add(new ArrayList<>(current)); // adaugă starea curentă
    for (int i = idx; i < nums.length; i++) {
        current.add(nums[i]);
        subsets(nums, i + 1, current, result);
        current.remove(current.size() - 1); // undo
    }
}
// subsets([1,2,3]) = [[], [1], [1,2], [1,2,3], [1,3], [2], [2,3], [3]]
\`\`\`

• **Pruning (tăiere)**: verifică \`isValid\` cât mai devreme pentru a evita ramuri fără soluție
• Backtracking e exponential O(n!) în cel mai rău caz — acceptabil numai dacă pruning-ul e eficient
• **Undo** trebuie să restaureze starea EXACT la cea dinainte de alegere — testează izolat`);

await up('10. Bune Practici', 'Conventions', `**Convențiile de cod Java** sunt regulile de stil și denumire acceptate de comunitatea Java — urmarea lor face codul predictibil, ușor de citit și de întreținut de întreaga echipă.

**Convențiile de denumire**

\`\`\`java
// Clase și interfețe — PascalCase
public class UserService { }
public interface PaymentProcessor { }
public enum OrderStatus { PENDING, COMPLETED, CANCELLED }
public record ProductDto(String name, double price) { }
public @interface NonNull { }

// Metode și variabile — camelCase
public String getUserName() { return userName; }
private int calculateTotal() { return 0; }
boolean isActive = true;
String firstName = "Ana";

// Constante — UPPER_SNAKE_CASE
public static final int MAX_RETRIES = 3;
public static final String DEFAULT_ENCODING = "UTF-8";
private static final Logger log = LoggerFactory.getLogger(MyClass.class);

// Pachete — lowercase, fără underscores
package com.mycompany.service;
package ro.devzone.repository;
\`\`\`

**Structura claselor și metodelor**

\`\`\`java
public class OrderService {
    // 1. Constante statice finale
    private static final int MAX_ITEMS = 100;

    // 2. Câmpuri private
    private final OrderRepository orderRepo;
    private final UserService userService;

    // 3. Constructori
    public OrderService(OrderRepository orderRepo, UserService userService) {
        this.orderRepo = Objects.requireNonNull(orderRepo);
        this.userService = Objects.requireNonNull(userService);
    }

    // 4. Metode publice (API)
    public Order createOrder(int userId, List<OrderItem> items) {
        validateItems(items);                        // delegare la privat
        var user = userService.getById(userId);      // var pentru tipuri lungi
        var order = new Order(user, items);
        return orderRepo.save(order);
    }

    // 5. Metode private (implementare)
    private void validateItems(List<OrderItem> items) {
        if (items == null || items.isEmpty())
            throw new IllegalArgumentException("Lista de produse nu poate fi goală");
        if (items.size() > MAX_ITEMS)
            throw new IllegalArgumentException("Maxim " + MAX_ITEMS + " produse per comandă");
    }
}
\`\`\`

**Javadoc și comentarii**

\`\`\`java
/**
 * Calculează TVA pentru suma dată.
 *
 * @param amount suma brută (>= 0)
 * @param vatRate rata TVA ca fracție (ex: 0.19 pentru 19%)
 * @return suma TVA
 * @throws IllegalArgumentException dacă amount sau vatRate sunt negative
 */
public static double calculateVAT(double amount, double vatRate) {
    if (amount < 0) throw new IllegalArgumentException("Amount negativ: " + amount);
    if (vatRate < 0) throw new IllegalArgumentException("VatRate negativ: " + vatRate);
    return amount * vatRate;
}

// Comentariu inline — explică DE CE, nu CE face codul
int result = val & 0xFF; // mascare la byte fără semn — evită extensie de semn
\`\`\`

• **Google Java Style Guide** și **Oracle Code Conventions** — referințele principale
• Lungimea maximă a liniei: 100-120 caractere (configurabil în IDE)
• O responsabilitate per clasă (SRP) — dacă clasa are mai mult de ~300 linii, consideră refactorizarea`);

await up('10. Bune Practici', 'Common pitfalls', `**Common pitfalls în Java** — greșelile cel mai frecvent întâlnite care duc la bug-uri subtile, performanță slabă sau code smell ce complică întreținerea.

**NullPointerException — cel mai comun bug**

\`\`\`java
// GREȘIT — NPE dacă user sau getName() returnează null
String upper = user.getName().toUpperCase();

// CORECT — Optional pentru values care pot fi null
Optional<String> name = Optional.ofNullable(user)
    .map(User::getName)
    .map(String::toUpperCase);
String upper2 = name.orElse("ANONIM");

// Sau Objects.requireNonNullElse (Java 9+)
String n = Objects.requireNonNullElse(user.getName(), "Anonim");

// Verificare explicită cu mesaj util
Objects.requireNonNull(param, "parametrul 'param' este obligatoriu");
\`\`\`

**equals() și == pe obiecte**

\`\`\`java
// GREȘIT — compară referințe, nu valori
String a = new String("Ana");
String b = new String("Ana");
if (a == b) { /* niciodată true pentru new String */ }

// CORECT
if (a.equals(b)) { /* true */ }
if ("Ana".equals(userInput)) { /* safe față de NPE — constanta primul */ }

// Aceeași greșeală cu Integer
Integer x = 200, y = 200;
if (x == y) { } // false! (Integer cache funcționează doar pentru -128..127)
if (x.equals(y)) { } // true — întotdeauna corect
\`\`\`

**Modificarea colecțiilor în iterare**

\`\`\`java
List<String> names = new ArrayList<>(Arrays.asList("Ana", "Bob", "Carol"));

// GREȘIT — ConcurrentModificationException
for (String name : names) {
    if (name.startsWith("A")) names.remove(name); // BOOM
}

// CORECT
names.removeIf(name -> name.startsWith("A")); // Java 8+

// Sau cu Iterator
Iterator<String> it = names.iterator();
while (it.hasNext()) {
    if (it.next().startsWith("A")) it.remove(); // safe
}
\`\`\`

**Resource leaks și excepții înghițite**

\`\`\`java
// GREȘIT — stream nu e închis dacă apare excepție
FileInputStream fis = new FileInputStream("file.txt");
processFile(fis); // dacă aruncă exception, fis rămâne deschis!
fis.close();

// CORECT — try-with-resources
try (var fis = new FileInputStream("file.txt")) {
    processFile(fis);
}

// GREȘIT — excepție înghițită silențios
try {
    riskyOp();
} catch (Exception e) { } // NICIODATĂ gol!

// CORECT
try {
    riskyOp();
} catch (Exception e) {
    log.error("riskyOp eșuată", e); // cel puțin loghează
    throw new RuntimeException("Operație eșuată", e);
}
\`\`\`

**Concatenare în bucle**

\`\`\`java
// GREȘIT — O(n²) timp, O(n²) memorie
String result = "";
for (String item : items) result += item + ", ";

// CORECT — O(n) cu StringBuilder
StringBuilder sb = new StringBuilder();
for (String item : items) sb.append(item).append(", ");
String result2 = sb.isEmpty() ? "" : sb.substring(0, sb.length() - 2);

// SAU modern cu Stream
String result3 = items.stream().collect(Collectors.joining(", "));
\`\`\`

• **Folosește Optional** pentru valori care pot lipsi — elimini NPE sistematic
• **equals()** mereu pentru obiecte — \`==\` numai pentru primitive și enum
• **Loghează mereu** excepțiile — chiar dacă le reizici, stack trace-ul este prețios`);

await up('10. Bune Practici', 'Modern Java tips', `**Modern Java tips** acoperă cele mai impactante funcționalități Java 8-21 care simplifică codul și îmbunătățesc performanța — adoptate acum de majoritate proiectelor active.

**Optional — înlocuiește null**

\`\`\`java
// Optional — container pentru valori ce pot lipsi
Optional<User> findUser(int id) {
    return userRepo.findById(id); // returnează Optional, nu null
}

// Procesare fluent
String name = findUser(1)
    .filter(u -> u.isActive())
    .map(User::getName)
    .map(String::toUpperCase)
    .orElse("ANONIM");

// orElseGet — lazy (funcție apelată doar dacă gol)
User user = findUser(id).orElseGet(() -> createGuestUser());

// orElseThrow — common pentru servicii
User user2 = findUser(id)
    .orElseThrow(() -> new UserNotFoundException(id));

// ifPresent și ifPresentOrElse (Java 9+)
findUser(id).ifPresentOrElse(
    u -> sendWelcomeEmail(u),
    () -> log.warn("User {} not found", id)
);
\`\`\`

**var și type inference**

\`\`\`java
// var: tipul e inferred la compilare — NU dynamic typing
var users = new ArrayList<User>();      // ArrayList<User>
var service = new UserService(repo);    // UserService

// Util pentru tipuri verbale
var entries = Map.<String, List<Integer>>of("a", List.of(1,2)).entrySet();
for (var entry : entries) { // Map.Entry<String, List<Integer>> inferred
    var key = entry.getKey();       // String
    var values = entry.getValue();  // List<Integer>
}

// NU pentru claritate — var poate ascunde tipul
var x = process(); // rău dacă returnează tip complex sau ambiguu
\`\`\`

**Records, sealed classes și pattern matching**

\`\`\`java
// Records pentru DTO-uri și value objects
record PageRequest(int page, int size, String sortBy) {
    PageRequest { // compact constructor
        if (size <= 0 || size > 100) throw new IllegalArgumentException();
        page = Math.max(0, page);
    }
}

// Pattern matching instanceof — fără cast manual
if (event instanceof UserCreatedEvent e) {
    sendWelcome(e.userId(), e.email());
}

// Switch expression cu pattern matching
String describe(Object o) {
    return switch (o) {
        case Integer i when i < 0 -> "negativ";
        case Integer i            -> "pozitiv: " + i;
        case String s             -> "text: " + s;
        case null                 -> "absent";
        default                   -> "necunoscut";
    };
}
\`\`\`

**Virtual Threads (Java 21)**

\`\`\`java
// Thread-uri virtuale: milioane simultan, la costul unui thread normal
try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
    for (int i = 0; i < 100_000; i++) {
        executor.submit(() -> {
            // operație I/O-intensivă
            Thread.sleep(Duration.ofMillis(100));
            return processRequest();
        });
    }
} // executor.close() → awaitTermination automat
\`\`\`

• **Optional.orElseThrow()** > \`orElse(null)\` urmat de null check — mai clar și mai sigur
• **var** îmbunătățește lizibilitatea pentru tipuri verbale; evită unde tipul nu e clar din context
• **Virtual threads** = performanță Reactive fără complexitatea programării reactive`);

  console.log('Done script 3.');
  await p.$disconnect();
}

run().catch(e => { console.error(e); p.$disconnect(); process.exit(1); });
