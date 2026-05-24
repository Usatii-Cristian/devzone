const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();

async function up(lessonContains, titleContains, content) {
  const lessons = await p.lesson.findMany({ where: { module: { slug: 'csharp' }, title: { contains: lessonContains } } });
  const theory = await p.theory.findFirst({ where: { lessonId: { in: lessons.map(l => l.id) }, title: { contains: titleContains } } });
  if (!theory) { console.log(`NOT FOUND: ${lessonContains} / ${titleContains}`); return; }
  await p.theory.update({ where: { id: theory.id }, data: { content } });
  console.log(`✓ ${theory.title}: ${theory.content.length} → ${content.length}`);
}

async function run() {

await up('10. Generice', 'Constraints', `**Constrângerile generice** (constraints) îți permit să restricționezi ce tipuri pot fi folosite ca argumente de tip într-o clasă sau metodă generică. Fără constrângeri, compilatorul nu știe nimic despre tipul T și nu permite apeluri de metode sau conversii specifice.

**Sintaxa de bază**

\`\`\`csharp
// Fără constrângere — T poate fi orice
public T Clone<T>(T item) => item;

// Cu constrângere: T trebuie să fie clasă (tip referință)
public T CreateCopy<T>(T item) where T : class => item;

// T trebuie să fie struct (tip valoare)
public T Default<T>() where T : struct => default;

// T trebuie să aibă constructor fără parametri
public T New<T>() where T : new() => new T();
\`\`\`

**Constrângerile disponibile**

• **where T : class** — T trebuie să fie tip referință (clasă, interfață, delegat)
• **where T : struct** — T trebuie să fie tip valoare (struct, enum)
• **where T : new()** — T trebuie să aibă constructor public fără parametri
• **where T : BaseClass** — T trebuie să moștenească din BaseClass
• **where T : IInterface** — T trebuie să implementeze interfața IInterface
• **where T : notnull** — T nu poate fi null (din C# 8)
• **where T : unmanaged** — T trebuie să fie un tip neadministrat

**Combinarea constrângerilor**

\`\`\`csharp
// T trebuie să implementeze IComparable și să aibă constructor default
public T Max<T>(T a, T b) where T : IComparable<T>, new()
{
    return a.CompareTo(b) >= 0 ? a : b;
}

// Constrângeri pe mai mulți parametri de tip
public void Pair<TKey, TValue>(TKey key, TValue val)
    where TKey : notnull
    where TValue : class
{
    Console.WriteLine($"Key={key}, Value={val}");
}
\`\`\`

**Exemplu practic — repository generic**

\`\`\`csharp
public interface IEntity { int Id { get; set; } }

public class Repository<T> where T : class, IEntity, new()
{
    private readonly List<T> _store = new();

    public void Add(T entity) => _store.Add(entity);

    public T? GetById(int id) => _store.FirstOrDefault(e => e.Id == id);

    public T CreateEmpty()
    {
        var item = new T();  // posibil doar cu constrângerea new()
        return item;
    }
}

// Utilizare
public class User : IEntity { public int Id { get; set; } public string Name { get; set; } = ""; }
var repo = new Repository<User>();
repo.Add(new User { Id = 1, Name = "Ana" });
var user = repo.GetById(1); // User?
\`\`\`

**De ce contează constrângerile**

• **Type safety** la compilare — greșelile sunt prinse înainte de execuție
• **IntelliSense complet** — IDE-ul știe ce metode are T
• **Performanță** — struct constraint evită boxing/unboxing
• Documentație implicită — citind signatura metodei știi imediat ce tipuri acceptă`);

await up('Fișiere', 'StreamReader', `**StreamReader și StreamWriter** sunt clase din System.IO optimizate pentru citirea și scrierea de text în fișiere mari, linie cu linie sau în blocuri — fără a încărca totul în memorie.

**De ce nu File.ReadAllText pentru fișiere mari?**

\`\`\`csharp
// PROBLEMATIC pentru fișiere de sute de MB
string tot = File.ReadAllText("huge.log"); // alocă toată memoria dintr-odată

// CORECT: StreamReader citește linie cu linie
using var reader = new StreamReader("huge.log");
string? line;
while ((line = reader.ReadLine()) != null)
{
    // procesezi fiecare linie fără să ții totul în RAM
    Console.WriteLine(line);
}
\`\`\`

**Constructori și opțiuni**

\`\`\`csharp
// Encoding implicit: UTF-8
using var sr = new StreamReader("file.txt");

// Cu encoding explicit
using var sr2 = new StreamReader("file.txt", System.Text.Encoding.Latin1);

// Cu buffer size personalizat (default: 1024 bytes)
using var sr3 = new StreamReader("file.txt", System.Text.Encoding.UTF8,
    detectEncodingFromByteOrderMarks: true, bufferSize: 4096);
\`\`\`

**StreamWriter — scriere eficientă**

\`\`\`csharp
// Creare fișier nou (suprascrie dacă există)
using var writer = new StreamWriter("output.txt");
writer.WriteLine("Prima linie");
writer.Write("Fără newline");
writer.Flush(); // golește buffer-ul

// Append la fișier existent
using var appender = new StreamWriter("log.txt", append: true);
appender.WriteLine($"[{DateTime.Now}] Eveniment nou");
\`\`\`

**Pattern complet: procesare CSV linie cu linie**

\`\`\`csharp
public static IEnumerable<string[]> ReadCsv(string path)
{
    using var reader = new StreamReader(path);
    // Sari header-ul
    reader.ReadLine();

    string? line;
    while ((line = reader.ReadLine()) != null)
    {
        if (string.IsNullOrWhiteSpace(line)) continue;
        yield return line.Split(',');
    }
}

// Utilizare
foreach (var row in ReadCsv("data.csv"))
{
    Console.WriteLine($"Nume: {row[0]}, Vârstă: {row[1]}");
}
\`\`\`

**Bune practici**

• Folosește mereu **using** sau **try/finally** cu Dispose() pentru a închide stream-ul
• Preferă **ReadLineAsync()** în cod async — nu blochează thread-ul
• **AutoFlush = true** pe writer dacă vrei să scrii imediat (util pentru log-uri)
• Setează encoding-ul explicit pentru compatibilitate cross-platform`);

await up('12. Recursivitate', 'Concept', `**Recursivitatea** este tehnica prin care o metodă se apelează pe ea însăși pentru a rezolva o problemă mai mare împărțind-o în subprobleme identice, dar mai mici. Orice soluție recursivă are două componente esențiale: **cazul de bază** (condiția de oprire) și **pasul recursiv** (apelul cu o problemă mai mică).

**Structura unui algoritm recursiv**

\`\`\`csharp
int Factorial(int n)
{
    // Cazul de bază — fără acesta, recursivitatea nu se oprește niciodată
    if (n <= 1) return 1;

    // Pasul recursiv — problema se micșorează cu fiecare apel
    return n * Factorial(n - 1);
}

// Factorial(4) → 4 * Factorial(3)
//              → 4 * 3 * Factorial(2)
//              → 4 * 3 * 2 * Factorial(1)
//              → 4 * 3 * 2 * 1 = 24
\`\`\`

**Exemplu clasic: suma elementelor dintr-un array**

\`\`\`csharp
int Sum(int[] arr, int index = 0)
{
    if (index >= arr.Length) return 0;          // caz de bază
    return arr[index] + Sum(arr, index + 1);    // pas recursiv
}

var nums = new[] { 1, 2, 3, 4, 5 };
Console.WriteLine(Sum(nums)); // 15
\`\`\`

**Fibonacci recursiv vs iterativ**

\`\`\`csharp
// Recursiv simplu — exponential O(2^n), lent
int FibNaiv(int n) => n <= 1 ? n : FibNaiv(n - 1) + FibNaiv(n - 2);

// Iterativ — linear O(n), eficient
int FibIterativ(int n)
{
    if (n <= 1) return n;
    int a = 0, b = 1;
    for (int i = 2; i <= n; i++) (a, b) = (b, a + b);
    return b;
}
\`\`\`

**Parcurgerea unui arbore binar**

\`\`\`csharp
class Node { public int Val; public Node? Left, Right; }

void InOrder(Node? node)
{
    if (node == null) return;      // caz de bază implicit
    InOrder(node.Left);            // subarbore stâng
    Console.Write(node.Val + " "); // procesăm nodul curent
    InOrder(node.Right);           // subarbore drept
}
\`\`\`

**Limitări și riscuri**

• **Stack overflow** — fiecare apel recursiv consumă memorie pe stivă. .NET are limita implicită ~1MB pentru stivă
• **Performanță** — apelurile de funcție au overhead față de iterație
• Preferă **iterația** când recursivitatea nu simplifică semnificativ codul
• Folosește **memoization** pentru subprobleme repetate (ex. Fibonacci)`);

await up('Delegates', 'Delegates', `**Delegates** sunt tipuri care reprezintă referințe la metode cu o anumită signatură. Sunt echivalentul pointerilor de funcție din C/C++, dar type-safe — compilatorul verifică că metoda referențiată are exact parametrii și tipul de retur așteptat.

**Definire și utilizare de bază**

\`\`\`csharp
// Declarăm tipul delegat
delegate int Operatie(int a, int b);

// Metode compatibile cu signatura delegatului
int Aduna(int a, int b) => a + b;
int Scade(int a, int b) => a - b;

// Atribuire și invocare
Operatie op = Aduna;
Console.WriteLine(op(3, 5)); // 8

op = Scade;
Console.WriteLine(op(10, 4)); // 6
\`\`\`

**Delegate-urile predefinite: Func, Action, Predicate**

\`\`\`csharp
// Func<T, TResult> — returnează ceva
Func<string, int> lungime = s => s.Length;
Console.WriteLine(lungime("Hello")); // 5

// Func cu mai mulți parametri: ultimul tip e return-ul
Func<int, int, int> sum = (a, b) => a + b;

// Action<T> — nu returnează nimic (void)
Action<string> afiseaza = msg => Console.WriteLine(msg);
afiseaza("Salut!");

// Predicate<T> — returnează bool
Predicate<int> estePar = n => n % 2 == 0;
Console.WriteLine(estePar(4)); // True
\`\`\`

**Delegate ca parametru de metodă (callback pattern)**

\`\`\`csharp
public static List<T> Filtreaza<T>(List<T> lista, Predicate<T> conditie)
{
    var rezultat = new List<T>();
    foreach (var item in lista)
        if (conditie(item))
            rezultat.Add(item);
    return rezultat;
}

var numere = new List<int> { 1, 2, 3, 4, 5, 6 };
var pare = Filtreaza(numere, n => n % 2 == 0);
// [2, 4, 6]
\`\`\`

**Multicast delegates — mai mulți abonați**

\`\`\`csharp
Action<string> log = msg => Console.WriteLine($"[LOG] {msg}");
Action<string> audit = msg => Console.WriteLine($"[AUDIT] {msg}");

// Combinare cu operatorul +
Action<string> combined = log + audit;
combined("User logged in");
// [LOG] User logged in
// [AUDIT] User logged in

// Eliminare cu -=
combined -= audit;
\`\`\`

**De ce delegate-urile sunt esențiale**

• **Decuplare** — metoda apelantă nu trebuie să știe concret ce metodă se va executa
• Fundament pentru **events** în C#
• Fundament pentru **LINQ** — toate metodele lambda (Where, Select, etc.) folosesc delegate-uri intern
• **Strategy pattern** implementat simplu fără clase suplimentare`);

await up('Delegates', 'Events', `**Events** sunt un mecanism de comunicare one-to-many între obiecte, construit pe delegate-uri. Implementează **Observer pattern** nativ în C# — un obiect (publisher) notifică automat toți abonații când ceva se întâmplă, fără să știe cine sunt aceștia.

**Anatomia unui event**

\`\`\`csharp
public class Buton
{
    // 1. Declarăm tipul delegat (sau folosim EventHandler predefinit)
    public event EventHandler? Click;

    // 2. Metoda care declanșează event-ul
    protected virtual void OnClick()
    {
        Click?.Invoke(this, EventArgs.Empty); // safe invoke cu ?.
    }

    public void Apasa() => OnClick();
}

// 3. Abonare la event
var buton = new Buton();
buton.Click += (sender, e) => Console.WriteLine("Butonul a fost apăsat!");
buton.Click += (sender, e) => Console.WriteLine("Al doilea handler!");

buton.Apasa();
// Butonul a fost apăsat!
// Al doilea handler!
\`\`\`

**EventArgs custom — date transmise cu event-ul**

\`\`\`csharp
public class PretSchimbatArgs : EventArgs
{
    public decimal PretVechi { get; }
    public decimal PretNou { get; }
    public PretSchimbatArgs(decimal vechi, decimal nou) => (PretVechi, PretNou) = (vechi, nou);
}

public class Produs
{
    private decimal _pret;
    public event EventHandler<PretSchimbatArgs>? PretSchimbat;

    public decimal Pret
    {
        get => _pret;
        set
        {
            var vechi = _pret;
            _pret = value;
            PretSchimbat?.Invoke(this, new PretSchimbatArgs(vechi, value));
        }
    }
}

var p = new Produs();
p.PretSchimbat += (s, e) =>
    Console.WriteLine($"Pret: {e.PretVechi} → {e.PretNou}");

p.Pret = 100m; // Pret: 0 → 100
p.Pret = 85m;  // Pret: 100 → 85
\`\`\`

**Dezabonare — evitarea memory leak-urilor**

\`\`\`csharp
void Handler(object? s, EventArgs e) => Console.WriteLine("Handled");

buton.Click += Handler;  // abonare
buton.Click -= Handler;  // dezabonare — esențial pentru obiecte cu viață scurtă
\`\`\`

**Reguli de bun simț**

• Folosește mereu **EventHandler** sau **EventHandler<T>** (nu delegate custom)
• Apelează event-ul cu **?.Invoke()** pentru a evita NullReferenceException
• Dezabonează handler-ele din **Dispose()** pentru a preveni memory leak-uri
• Nu expune delegate-urile direct ca câmpuri publice — folosește keyword-ul **event**`);

await up('JSON', 'Atribute', `**Atributele de serializare** din System.Text.Json îți oferă control precis asupra modului în care obiectele C# sunt convertite în JSON și invers — fără să modifici structura claselor sau să scrii cod de conversie manual.

**[JsonPropertyName] — redenumire proprietăți**

\`\`\`csharp
using System.Text.Json.Serialization;

public class User
{
    [JsonPropertyName("first_name")]   // JSON: "first_name", C#: FirstName
    public string FirstName { get; set; } = "";

    [JsonPropertyName("last_name")]
    public string LastName { get; set; } = "";

    public int Age { get; set; }
}

var user = new User { FirstName = "Ana", LastName = "Pop", Age = 28 };
string json = JsonSerializer.Serialize(user);
// {"first_name":"Ana","last_name":"Pop","Age":28}
\`\`\`

**[JsonIgnore] — excluderea câmpurilor sensibile**

\`\`\`csharp
public class UserDto
{
    public string Email { get; set; } = "";

    [JsonIgnore]  // nu apare niciodată în JSON
    public string PasswordHash { get; set; } = "";

    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Nickname { get; set; }  // omis din JSON dacă e null
}
\`\`\`

**[JsonConverter] — conversii personalizate**

\`\`\`csharp
// Converter pentru enum ca string
public class Status { public string? Name { get; set; } }

public enum Stare { Activ, Inactiv, Suspendat }

public class Order
{
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public Stare Stare { get; set; }

    public decimal Total { get; set; }
}

var o = new Order { Stare = Stare.Activ, Total = 150m };
// {"Stare":"Activ","Total":150}
// În loc de {"Stare":0,"Total":150}
\`\`\`

**[JsonInclude] — câmpuri și proprietăți private**

\`\`\`csharp
public class Config
{
    [JsonInclude]
    public string ConnectionString { get; private set; } = "";

    [JsonInclude]
    internal int MaxConnections = 10;
}
\`\`\`

**Opțiuni globale de serializare**

\`\`\`csharp
var options = new JsonSerializerOptions
{
    PropertyNamingPolicy = JsonNamingPolicy.CamelCase,  // toate proprietățile camelCase
    WriteIndented = true,                                // JSON formatat
    DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull
};

string json = JsonSerializer.Serialize(myObject, options);
\`\`\`

• **[JsonPropertyOrder(n)]** — controlează ordinea câmpurilor în JSON output
• **[JsonRequired]** — proprietate obligatorie la deserializare (C# 11)
• Atributele sunt evaluate la compilare — zero overhead la runtime`);

await up('Bune Practici', 'Naming', `**Convențiile de denumire** în C# nu sunt opționale — sunt parte din standardul .NET și sunt aplicate de linting tools, code review și API-urile publice ale bibliotecilor. Respectarea lor face codul predictibil pentru oricine din ecosistem.

**PascalCase vs camelCase vs _camelCase**

\`\`\`csharp
// PascalCase — clase, metode, proprietăți, eventi, namespace-uri, constante
public class UserService
{
    public const int MaxRetries = 3;
    public string FirstName { get; set; } = "";
    public event EventHandler? UserLoggedIn;

    public Task<User> GetUserAsync(int id) { /* ... */ }
}

// camelCase — parametri și variabile locale
public void CreateUser(string firstName, string lastName)
{
    var userDto = new UserDto { FirstName = firstName };
}

// _camelCase — câmpuri private (convenție Microsoft modernă)
private readonly IUserRepository _userRepository;
private string _connectionString = "";
\`\`\`

**Denumiri clare și descriptive**

\`\`\`csharp
// RĂUL — abrevieri criptice
public class UsrMgr { public List<Usr> GetActvUsrs() => ...; }

// BINELE — denumiri explicite
public class UserManager { public List<User> GetActiveUsers() => ...; }

// Variabile: evită i, j, temp, data în afara loop-urilor simple
for (int i = 0; i < items.Count; i++) { }  // 'i' ok în for
var activeUsers = users.Where(u => u.IsActive).ToList(); // descriptiv
\`\`\`

**Organizarea fișierelor și namespace-urilor**

\`\`\`csharp
// Un fișier = o clasă publică (regulă generală)
// MyApp.Services.UserService → fișier: Services/UserService.cs

namespace MyApp.Services;  // file-scoped namespace (C# 10+)

public class UserService { }

// Ordinea membrilor în clasă (convenție standard):
// 1. Câmpuri private
// 2. Constructori
// 3. Proprietăți publice
// 4. Metode publice
// 5. Metode private
\`\`\`

**Sufixe și prefixe convenționale**

• Interfețe: **I**UserRepository, **I**Serializable
• Clase abstracte: **Base**Controller, **Abstract**Handler
• Metode async: GetDataAsync, SaveAsync — mereu sufix **Async**
• Excepții: **NotFound**Exception, **Validation**Exception
• Atribute: **Required**Attribute (de obicei scurtate fără "Attribute" la utilizare)

**Reguli pentru lizibilitate maximă**
• O metodă = o responsabilitate, maxim 20-30 linii
• Evită comentarii care spun "ce" face codul — numele trebuie să fie auto-explicativ
• Preferă **expresii** scurte față de blocuri lungi când intenția e clară`);

  console.log('Done.');
  await p.$disconnect();
}

run().catch(e => { console.error(e); p.$disconnect(); process.exit(1); });
