const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();

async function up(lessonContains, titleContains, content, useStartsWith) {
  let lessons;
  if (useStartsWith) {
    lessons = await p.lesson.findMany({ where: { module: { slug: 'csharp' }, title: { startsWith: lessonContains } } });
  } else {
    lessons = await p.lesson.findMany({ where: { module: { slug: 'csharp' }, title: { contains: lessonContains } } });
  }
  const theory = await p.theory.findFirst({ where: { lessonId: { in: lessons.map(l => l.id) }, title: { contains: titleContains } } });
  if (!theory) { console.log(`NOT FOUND: ${lessonContains} / ${titleContains}`); return; }
  await p.theory.update({ where: { id: theory.id }, data: { content } });
  console.log(`✓ ${theory.title}: ${theory.content.length} → ${content.length}`);
}

async function run() {

await up('Unit Testing', 'xUnit Basics', `**xUnit** este framework-ul de testare recomandat în ecosistemul .NET modern — simplu, extensibil și compatibil cu toate tool-urile CI/CD. Testele unitare verifică o singură unitate de cod (o metodă, o clasă) în izolare față de dependențele externe.

**Structura unui test xUnit**

\`\`\`csharp
// Proiect separat: MyApp.Tests
// Instalare: dotnet add package xunit xunit.runner.visualstudio

using Xunit;

public class CalculatorTests
{
    // [Fact] — test simplu, fără parametri
    [Fact]
    public void Add_TwoPositiveNumbers_ReturnsCorrectSum()
    {
        // Arrange — pregătim datele
        var calc = new Calculator();

        // Act — executăm codul testat
        var result = calc.Add(3, 5);

        // Assert — verificăm rezultatul
        Assert.Equal(8, result);
    }

    // [Theory] cu [InlineData] — test parametrizat
    [Theory]
    [InlineData(2, 3, 5)]
    [InlineData(-1, 1, 0)]
    [InlineData(0, 0, 0)]
    public void Add_VariousInputs_ReturnsCorrectSum(int a, int b, int expected)
    {
        var calc = new Calculator();
        Assert.Equal(expected, calc.Add(a, b));
    }
}
\`\`\`

**Assert-urile esențiale**

\`\`\`csharp
// Egalitate și valori
Assert.Equal(expected, actual);
Assert.NotEqual(unexpected, actual);
Assert.True(condition);
Assert.False(condition);
Assert.Null(value);
Assert.NotNull(value);

// Colecții
Assert.Empty(collection);
Assert.Single(collection);           // exact un element
Assert.Contains(item, collection);
Assert.Equal(3, collection.Count());

// Excepții
var ex = Assert.Throws<ArgumentNullException>(() => service.Process(null));
Assert.Contains("parameter", ex.Message);

// Async
await Assert.ThrowsAsync<HttpRequestException>(() => client.GetAsync("bad-url"));
\`\`\`

**Setup și cleanup — IClassFixture și Constructor**

\`\`\`csharp
public class UserServiceTests : IDisposable
{
    private readonly UserService _service;
    private readonly Mock<IUserRepository> _repoMock;

    // xUnit apelează constructorul înainte de fiecare test
    public UserServiceTests()
    {
        _repoMock = new Mock<IUserRepository>();
        _service = new UserService(_repoMock.Object);
    }

    [Fact]
    public async Task GetUser_ExistingId_ReturnsUser()
    {
        _repoMock.Setup(r => r.FindByIdAsync(1))
                 .ReturnsAsync(new User { Id = 1, Name = "Ana" });

        var user = await _service.GetUserAsync(1);

        Assert.Equal("Ana", user.Name);
    }

    // Apelat după fiecare test
    public void Dispose() => _repoMock.Reset();
}
\`\`\`

• Convenția de denumire: **Metoda\_Scenariul\_RezultatulAșteptat**
• Rulare: **dotnet test** sau direct din Visual Studio/Rider
• Acoperire cod (code coverage): **dotnet test --collect:"XPlat Code Coverage"**`);

await up('Unit Testing', 'Test Organization', `**Organizarea testelor** este la fel de importantă ca organizarea codului de producție — teste bine structurate se citesc ca documentație, rulează rapid și se întrețin ușor pe măsură ce codul evoluează.

**Structura folder-ului de teste**

\`\`\`
MyApp/
├── MyApp/                    (proiect principal)
│   ├── Services/
│   └── Repositories/
├── MyApp.Tests/              (teste unitare)
│   ├── Services/
│   │   ├── UserServiceTests.cs
│   │   └── OrderServiceTests.cs
│   └── Helpers/
│       └── TestDataBuilder.cs
└── MyApp.IntegrationTests/   (teste de integrare)
    └── Api/
        └── UsersControllerTests.cs
\`\`\`

**Test data builders — pattern pentru date complexe**

\`\`\`csharp
public class UserBuilder
{
    private int _id = 1;
    private string _email = "test@example.com";
    private string _name = "Test User";
    private bool _isActive = true;

    public UserBuilder WithId(int id) { _id = id; return this; }
    public UserBuilder WithEmail(string e) { _email = e; return this; }
    public UserBuilder Inactive() { _isActive = false; return this; }

    public User Build() => new User
    {
        Id = _id, Email = _email,
        Name = _name, IsActive = _isActive
    };
}

// Utilizare clară în teste
[Fact]
public async Task Deactivate_ActiveUser_SetsIsActiveFalse()
{
    var user = new UserBuilder().WithId(5).Build();
    _repoMock.Setup(r => r.FindByIdAsync(5)).ReturnsAsync(user);

    await _service.DeactivateAsync(5);

    Assert.False(user.IsActive);
}
\`\`\`

**Shared context cu IClassFixture**

\`\`\`csharp
// Partajează o resursă costisitoare (ex. DB în memorie) între toate testele clasei
public class DatabaseFixture : IDisposable
{
    public AppDbContext Db { get; }

    public DatabaseFixture()
    {
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase("TestDb")
            .Options;
        Db = new AppDbContext(options);
        Db.Database.EnsureCreated();
    }

    public void Dispose() => Db.Dispose();
}

public class OrderRepositoryTests : IClassFixture<DatabaseFixture>
{
    private readonly AppDbContext _db;

    public OrderRepositoryTests(DatabaseFixture fixture)
    {
        _db = fixture.Db;
    }
}
\`\`\`

**Categorii de teste cu [Trait]**

\`\`\`csharp
[Fact]
[Trait("Category", "Integration")]
[Trait("Component", "UserService")]
public async Task Register_ValidData_CreatesUserInDb() { }

// Rulare selectivă: dotnet test --filter "Category=Integration"
\`\`\`

• Regula **F.I.R.S.T.**: Fast, Isolated, Repeatable, Self-validating, Timely
• Un test = o singură afirmație logică (un singur motiv de eșec)
• **AAA pattern** (Arrange-Act-Assert) în orice test
• Nu testa comportamente private direct — testează interfața publică`);

await up('Design Patterns', 'Factory', `**Factory și Builder** sunt pattern-uri de creare care separă logica de construire a obiectelor de codul care le folosește — eliminând new-urile împrăștiate în cod și centralizând configurarea obiectelor complexe.

**Factory Method Pattern**

\`\`\`csharp
// Interfața produsului
public interface INotifier { void Send(string message); }

// Implementări concrete
public class EmailNotifier : INotifier
{
    public void Send(string message) => Console.WriteLine($"Email: {message}");
}
public class SmsNotifier : INotifier
{
    public void Send(string message) => Console.WriteLine($"SMS: {message}");
}
public class PushNotifier : INotifier
{
    public void Send(string message) => Console.WriteLine($"Push: {message}");
}

// Factory — creează obiectul potrivit bazat pe tip
public static class NotifierFactory
{
    public static INotifier Create(string type) => type switch
    {
        "email" => new EmailNotifier(),
        "sms"   => new SmsNotifier(),
        "push"  => new PushNotifier(),
        _ => throw new ArgumentException($"Tip necunoscut: {type}")
    };
}

// Utilizare — codul nu știe ce clasă concretă se creează
var notifier = NotifierFactory.Create("email");
notifier.Send("Contul tău a fost activat!");
\`\`\`

**Abstract Factory — familii de obiecte corelate**

\`\`\`csharp
public interface IButton { void Render(); }
public interface ICheckbox { void Render(); }

// Familie Windows
public class WindowsButton : IButton { public void Render() => Console.WriteLine("[ OK ]"); }
public class WindowsCheckbox : ICheckbox { public void Render() => Console.WriteLine("[x]"); }

// Familie Mac
public class MacButton : IButton { public void Render() => Console.WriteLine("( OK )"); }
public class MacCheckbox : ICheckbox { public void Render() => Console.WriteLine("(x)"); }

public interface IUIFactory { IButton CreateButton(); ICheckbox CreateCheckbox(); }
public class WindowsFactory : IUIFactory
{
    public IButton CreateButton() => new WindowsButton();
    public ICheckbox CreateCheckbox() => new WindowsCheckbox();
}
\`\`\`

**Builder Pattern — obiecte complexe pas cu pas**

\`\`\`csharp
public class QueryBuilder
{
    private string _table = "";
    private readonly List<string> _conditions = new();
    private int? _limit;
    private string? _orderBy;

    public QueryBuilder From(string table) { _table = table; return this; }
    public QueryBuilder Where(string cond) { _conditions.Add(cond); return this; }
    public QueryBuilder Limit(int n) { _limit = n; return this; }
    public QueryBuilder OrderBy(string col) { _orderBy = col; return this; }

    public string Build()
    {
        var sql = $"SELECT * FROM {_table}";
        if (_conditions.Any()) sql += $" WHERE {string.Join(" AND ", _conditions)}";
        if (_orderBy != null) sql += $" ORDER BY {_orderBy}";
        if (_limit.HasValue) sql += $" LIMIT {_limit}";
        return sql;
    }
}

// Utilizare — fluent interface
var query = new QueryBuilder()
    .From("users")
    .Where("IsActive = 1")
    .Where("Age > 18")
    .OrderBy("Name")
    .Limit(50)
    .Build();
// SELECT * FROM users WHERE IsActive = 1 AND Age > 18 ORDER BY Name LIMIT 50
\`\`\`

• **Factory** — alegi tipul la runtime; **Builder** — construiești obiect complex pas cu pas
• În .NET modern, multe Factory-uri sunt înlocuite de DI Container
• Builder-ul e mai util când obiectul are mulți parametri opționali`);

await up('ASP.NET Core Web API', 'Minimal APIs', `**Minimal APIs** în ASP.NET Core sunt o alternativă la Controller-e — definești endpoint-urile direct în **Program.cs** cu o sintaxă concisă, perfectă pentru microservicii mici sau API-uri simple fără ceremonialul MVC.

**Hello World cu Minimal API**

\`\`\`csharp
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddScoped<IUserService, UserService>();

var app = builder.Build();

// GET simplu
app.MapGet("/", () => "Hello, World!");

// GET cu parametru de rută
app.MapGet("/users/{id:int}", async (int id, IUserService svc) =>
{
    var user = await svc.GetByIdAsync(id);
    return user is null ? Results.NotFound() : Results.Ok(user);
});

// POST cu body
app.MapPost("/users", async (CreateUserDto dto, IUserService svc) =>
{
    var user = await svc.CreateAsync(dto);
    return Results.Created($"/users/{user.Id}", user);
});

// PUT
app.MapPut("/users/{id:int}", async (int id, UpdateUserDto dto, IUserService svc) =>
{
    var updated = await svc.UpdateAsync(id, dto);
    return updated is null ? Results.NotFound() : Results.Ok(updated);
});

// DELETE
app.MapDelete("/users/{id:int}", async (int id, IUserService svc) =>
{
    await svc.DeleteAsync(id);
    return Results.NoContent();
});

app.Run();
\`\`\`

**Grupare cu MapGroup**

\`\`\`csharp
// Prefix comun /api/v1/users pentru toate endpoint-urile din grup
var users = app.MapGroup("/api/v1/users")
               .RequireAuthorization()       // middleware pentru grup
               .WithTags("Users");           // Swagger tag

users.MapGet("/", async (IUserService svc) => Results.Ok(await svc.GetAllAsync()));
users.MapGet("/{id:int}", async (int id, IUserService svc) => { ... });
users.MapPost("/", async (CreateUserDto dto, IUserService svc) => { ... });
\`\`\`

**Validare și filtre**

\`\`\`csharp
// Filter de validare reutilizabil
app.MapPost("/users", async (CreateUserDto dto, IUserService svc) =>
{
    if (string.IsNullOrWhiteSpace(dto.Email))
        return Results.BadRequest("Email obligatoriu");
    var user = await svc.CreateAsync(dto);
    return Results.Created($"/users/{user.Id}", user);
})
.AddEndpointFilter(async (ctx, next) =>
{
    // Middleware la nivel de endpoint
    Console.WriteLine($"Request: {ctx.HttpContext.Request.Path}");
    return await next(ctx);
});
\`\`\`

• Minimal APIs vs Controllers: Minimal API e mai simplu, Controllers mai structurat pentru aplicații mari
• **Results.Problem()** pentru erori standardizate RFC 9457
• Compatibil complet cu **Swagger/OpenAPI** — adaugă builder.Services.AddEndpointsApiExplorer()`, true);

await up('Generics and Collections', 'Collection Types', `**Colecțiile din .NET** sunt structuri de date specializate, fiecare optimizată pentru un tip specific de operațiuni. Alegerea colecției potrivite are impact direct asupra performanței și lizibilității codului.

**Lista comparativă a colecțiilor principale**

\`\`\`csharp
// List<T> — cea mai folosită, acces O(1) după index, inserare la final O(1) amortizat
var list = new List<int> { 1, 2, 3 };
list.Add(4);
list.Insert(0, 0);          // inserare la poziție — O(n)
list.Remove(2);
list.Sort();

// Dictionary<K,V> — lookup O(1) după cheie (hash table)
var dict = new Dictionary<string, int>();
dict["ana"] = 28;
dict.TryGetValue("ion", out int varstaIon);  // safe — fără excepție dacă lipsește
bool exists = dict.ContainsKey("ana");

// HashSet<T> — colecție de elemente unice, O(1) pentru Contains/Add/Remove
var set = new HashSet<string> { "a", "b", "c" };
set.Add("a");              // ignorat — deja există
bool contains = set.Contains("b"); // O(1) față de List.Contains care e O(n)
\`\`\`

**Queue și Stack — structuri FIFO/LIFO**

\`\`\`csharp
// Queue<T> — FIFO (First In, First Out)
var queue = new Queue<string>();
queue.Enqueue("Primul");
queue.Enqueue("Al doilea");
string urmator = queue.Dequeue();   // "Primul"
string peek = queue.Peek();         // vede fără a scoate

// Stack<T> — LIFO (Last In, First Out)
var stack = new Stack<int>();
stack.Push(1);
stack.Push(2);
stack.Push(3);
int top = stack.Pop();    // 3
int see = stack.Peek();   // 2
\`\`\`

**SortedDictionary și SortedSet**

\`\`\`csharp
// SortedDictionary — cheile mereu sortate O(log n) pentru operații
var sorted = new SortedDictionary<string, int>();
sorted["banana"] = 2;
sorted["mar"] = 5;
sorted["ananas"] = 1;
// Iterare: ananas, banana, mar (sortat alfabetic)

// LinkedList<T> — inserare/ștergere O(1) la orice poziție, dar acces O(n)
var linked = new LinkedList<int>();
var node = linked.AddFirst(1);
linked.AddAfter(node, 2);
\`\`\`

**ImmutableCollections — thread-safe și predictibile**

\`\`\`csharp
using System.Collections.Immutable;

var immutable = ImmutableList.Create(1, 2, 3);
var noua = immutable.Add(4);     // returnează o NOUĂ colecție
// immutable rămâne neschimbat — safe în contexte multi-thread

var dict = ImmutableDictionary<string, int>.Empty
    .Add("a", 1)
    .Add("b", 2);
\`\`\`

• **List** pentru date ordonate cu acces aleatoriu
• **Dictionary** pentru lookup rapid după cheie
• **HashSet** pentru unicitate și Contains rapid (preferă față de List.Contains pe seturi mari)
• **Queue/Stack** pentru algoritmi de procesare secvențială
• **ConcurrentDictionary** și **ConcurrentQueue** pentru scenarii multi-thread`);

  console.log('Done.');
  await p.$disconnect();
}

run().catch(e => { console.error(e); p.$disconnect(); process.exit(1); });
