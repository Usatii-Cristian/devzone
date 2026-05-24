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

await up('Records, Tuples', 'Tuples', `**Tuple-urile** în C# sunt structuri de date ușoare care grupează mai multe valori fără a declara o clasă sau struct separat. Sunt ideale pentru returnarea mai multor valori dintr-o metodă sau pentru grupări temporare de date.

**Value Tuples — sintaxa modernă**

\`\`\`csharp
// Tuple cu denumiri (C# 7+)
(string Nume, int Varsta) persoana = ("Ana", 28);
Console.WriteLine(persoana.Nume);    // Ana
Console.WriteLine(persoana.Varsta);  // 28

// Deconstrucție
var (nume, varsta) = persoana;
Console.WriteLine($"{nume} are {varsta} ani");

// Fără denumiri — acces prin Item1, Item2
var t = (1, "hello", true);
Console.WriteLine(t.Item1); // 1
Console.WriteLine(t.Item2); // hello
\`\`\`

**Returnarea mai multor valori dintr-o metodă**

\`\`\`csharp
// Fără tuple — trebuia out sau o clasă separată
// Cu tuple — concis și clar
public (bool Success, string Message, User? Data) Login(string email, string pass)
{
    var user = _repo.Find(email);
    if (user == null)
        return (false, "Email inexistent", null);
    if (!user.CheckPassword(pass))
        return (false, "Parolă incorectă", null);
    return (true, "Autentificare reușită", user);
}

// Utilizare cu deconstrucție
var (ok, msg, userData) = Login("ana@test.com", "parola");
if (!ok) Console.WriteLine($"Eroare: {msg}");
\`\`\`

**Tuple vs record — când să alegi ce**

\`\`\`csharp
// Tuple — pentru date temporare, rezultate intermediare
var stats = (Min: arr.Min(), Max: arr.Max(), Avg: arr.Average());

// Record — pentru date cu identitate, reutilizate în multiple locuri
public record UserStats(int Min, int Max, double Avg);

// Record are egalitate structurală automată
var s1 = new UserStats(1, 10, 5.5);
var s2 = new UserStats(1, 10, 5.5);
Console.WriteLine(s1 == s2); // True — records compară valori, nu referințe
\`\`\`

**Pattern matching cu tuple-uri**

\`\`\`csharp
string ClassifyPoint(int x, int y) => (x, y) switch
{
    (0, 0)                     => "Origine",
    (> 0, 0)                   => "Axa X pozitivă",
    (0, > 0)                   => "Axa Y pozitivă",
    (> 0, > 0)                 => "Cadranul I",
    (< 0, > 0)                 => "Cadranul II",
    _                          => "Alt cadran"
};

Console.WriteLine(ClassifyPoint(3, 4));   // Cadranul I
Console.WriteLine(ClassifyPoint(-1, 5));  // Cadranul II
\`\`\`

• **ValueTuple** (sintaxa modernă cu paranteze) — stack-allocated, performant
• **Tuple** (clasa veche) — heap-allocated, evit în cod nou
• Preferă **record** când datele sunt reutilizate în mai multe locuri
• Tuple-urile sunt **imutabile** — nu poți modifica componentele după creare`);

await up('Task Management API', 'Models', `**Modelele, DTO-urile și DbContext-ul** sunt straturile de date ale unui API — entitățile mapate în BD, obiectele transferate pe rețea și contextul care conectează totul la baza de date.

**Entitățile (modelele de domeniu)**

\`\`\`csharp
// Models/Task.cs — entitate mapată în baza de date
public class TaskItem
{
    public int Id { get; set; }
    public string Title { get; set; } = "";
    public string? Description { get; set; }
    public bool IsCompleted { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? CompletedAt { get; set; }
    public int Priority { get; set; } = 1;

    // Relație cu utilizatorul
    public int UserId { get; set; }
    public User? User { get; set; }
}

public class User
{
    public int Id { get; set; }
    public string Email { get; set; } = "";
    public string Name { get; set; } = "";
    public ICollection<TaskItem> Tasks { get; set; } = new List<TaskItem>();
}
\`\`\`

**DTO-urile (Data Transfer Objects)**

\`\`\`csharp
// DTOs/TaskDtos.cs — nu expunem entitatea direct

// Request DTO — ce primim de la client
public record CreateTaskDto(
    string Title,
    string? Description,
    int Priority = 1
);

public record UpdateTaskDto(
    string? Title,
    string? Description,
    bool? IsCompleted,
    int? Priority
);

// Response DTO — ce trimitem înapoi clientului
public record TaskResponseDto(
    int Id,
    string Title,
    string? Description,
    bool IsCompleted,
    DateTime CreatedAt,
    int Priority
);
\`\`\`

**DbContext — podul spre baza de date**

\`\`\`csharp
// Data/AppDbContext.cs
public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<TaskItem> Tasks => Set<TaskItem>();
    public DbSet<User> Users => Set<User>();

    protected override void OnModelCreating(ModelBuilder mb)
    {
        mb.Entity<TaskItem>(e =>
        {
            e.Property(t => t.Title).HasMaxLength(200).IsRequired();
            e.Property(t => t.Priority).HasDefaultValue(1);
            e.HasIndex(t => t.UserId);
        });

        mb.Entity<User>(e =>
        {
            e.Property(u => u.Email).HasMaxLength(320).IsRequired();
            e.HasIndex(u => u.Email).IsUnique();
        });
    }
}
\`\`\`

**Înregistrarea în Program.cs**

\`\`\`csharp
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("Default")));
\`\`\`

• DTO-urile protejează entitățile de over-posting și expunere accidentală de date sensibile
• Maparea entitate-DTO se face manual sau cu AutoMapper
• Folosește **record** pentru DTO-uri — imutabile și cu egalitate structurală automată`);

await up('Task Management API', 'Testing', `**Testarea și rularea API-ului** Task Management completează proiectul — validăm că endpoint-urile funcționează corect prin teste de integrare și pregătim aplicația pentru deployment.

**Teste de integrare cu WebApplicationFactory**

\`\`\`csharp
// Tests/TaskApiTests.cs
public class TaskApiTests : IClassFixture<WebApplicationFactory<Program>>
{
    private readonly HttpClient _client;

    public TaskApiTests(WebApplicationFactory<Program> factory)
    {
        _client = factory.WithWebHostBuilder(builder =>
        {
            builder.ConfigureServices(services =>
            {
                // Înlocuim BD reală cu una în memorie pentru teste
                services.RemoveAll<AppDbContext>();
                services.AddDbContext<AppDbContext>(o =>
                    o.UseInMemoryDatabase("TestDb"));
            });
        }).CreateClient();
    }

    [Fact]
    public async Task CreateTask_ValidData_Returns201()
    {
        var dto = new { Title = "Test task", Priority = 2 };
        var response = await _client.PostAsJsonAsync("/api/tasks", dto);

        Assert.Equal(HttpStatusCode.Created, response.StatusCode);
        var task = await response.Content.ReadFromJsonAsync<TaskResponseDto>();
        Assert.Equal("Test task", task!.Title);
    }

    [Fact]
    public async Task GetTask_ExistingId_Returns200()
    {
        // Creare
        var created = await _client.PostAsJsonAsync("/api/tasks",
            new { Title = "Primul task", Priority = 1 });
        var task = await created.Content.ReadFromJsonAsync<TaskResponseDto>();

        // Citire
        var response = await _client.GetAsync($"/api/tasks/{task!.Id}");
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
    }

    [Fact]
    public async Task GetTask_NonExistentId_Returns404()
    {
        var response = await _client.GetAsync("/api/tasks/99999");
        Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
    }
}
\`\`\`

**Rularea aplicației local**

\`\`\`bash
# Aplicare migrations și pornire
dotnet ef database update
dotnet run

# API disponibil la:
# https://localhost:5001/api/tasks
# Swagger UI: https://localhost:5001/swagger
\`\`\`

**Verificare manuală cu curl sau HTTPie**

\`\`\`bash
# Creare task
curl -X POST https://localhost:5001/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Finalizez proiectul", "priority": 3}'

# Listare tasks
curl https://localhost:5001/api/tasks

# Marcare completat
curl -X PUT https://localhost:5001/api/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"isCompleted": true}'
\`\`\`

• WebApplicationFactory testează întreg stack-ul HTTP fără a porni un server real
• Folosește baze de date în memorie pentru teste rapide, baze de date reale pentru teste end-to-end
• Adaugă **Swagger/OpenAPI** în proiect pentru documentație interactivă automată
• **Problem Details** (RFC 9457) standardizează răspunsurile de eroare`);

await up('26. LINQ Avansat', 'GroupBy', `**GroupBy, Join și SelectMany** sunt operatorii avansați LINQ care rezolvă interogări complexe ce implică agregare, relații între colecții și aplatizarea ierarhiilor de date.

**GroupBy — agregare pe categorii**

\`\`\`csharp
var orders = new List<Order>
{
    new(1, "Ana", "Electronice", 1200m),
    new(2, "Ion", "Electronice", 800m),
    new(3, "Ana", "Mobilier", 2500m),
    new(4, "Maria", "Electronice", 450m),
    new(5, "Ion", "Mobilier", 1800m),
};

// GroupBy categorie + agregare
var statsByCategory = orders
    .GroupBy(o => o.Category)
    .Select(g => new
    {
        Category = g.Key,
        TotalSales = g.Sum(o => o.Amount),
        OrderCount = g.Count(),
        AvgOrder = g.Average(o => o.Amount),
        MaxOrder = g.Max(o => o.Amount)
    })
    .OrderByDescending(s => s.TotalSales);

foreach (var s in statsByCategory)
    Console.WriteLine($"{s.Category}: {s.OrderCount} comenzi, total {s.TotalSales:C}");
\`\`\`

**GroupBy cu ToLookup — pentru accesări repetate**

\`\`\`csharp
// Lookup creează o structură optimizată pentru accesări multiple după cheie
var byCustomer = orders.ToLookup(o => o.Customer);

// Acces O(1) — util când interoghezi aceeași colecție de mai multe ori
foreach (var order in byCustomer["Ana"])
    Console.WriteLine($"  {order.Category}: {order.Amount:C}");
\`\`\`

**Join — combinare după cheie**

\`\`\`csharp
var customers = new[] { new { Id = 1, Name = "Ana", City = "Cluj" },
                         new { Id = 2, Name = "Ion", City = "București" } };
var orders2 = new[] { new { CustomerId = 1, Product = "Laptop" },
                      new { CustomerId = 1, Product = "Mouse" },
                      new { CustomerId = 2, Product = "Monitor" } };

// Inner Join
var joined = customers.Join(
    orders2,
    c => c.Id,
    o => o.CustomerId,
    (c, o) => new { c.Name, c.City, o.Product }
);
// Ana / Cluj / Laptop
// Ana / Cluj / Mouse
// Ion / București / Monitor

// GroupJoin — Left Outer Join cu grupare
var withOrders = customers.GroupJoin(
    orders2,
    c => c.Id,
    o => o.CustomerId,
    (c, os) => new { c.Name, Orders = os.ToList() }
);
\`\`\`

**SelectMany — aplatizarea colecțiilor nested**

\`\`\`csharp
var departments = new[]
{
    new { Name = "IT",  Employees = new[] { "Ana", "Ion", "Maria" } },
    new { Name = "HR",  Employees = new[] { "Radu", "Elena" } },
};

// SelectMany aplatizează lista de liste într-o singură listă
var allEmployees = departments.SelectMany(d => d.Employees);
// ["Ana", "Ion", "Maria", "Radu", "Elena"]

// Cu proiecție — include și departamentul
var withDept = departments.SelectMany(
    d => d.Employees,
    (d, emp) => new { d.Name, Employee = emp }
);
\`\`\`

• **GroupBy** vs **ToLookup**: GroupBy e lazy (deferred), ToLookup e eager (imediat)
• **SelectMany** e echivalentul SQL CROSS JOIN sau unnest
• Combină **GroupBy + SelectMany** pentru ierarhii complexe de date`);

await up('26. LINQ Avansat', 'LINQ cu obiecte', `**LINQ cu obiecte complexe** — sintaxa query vs method syntax — acoperă scenariile avansate de interogare: date nested, proiecții complexe, și compararea celor două stiluri de scris LINQ în situații reale.

**Query syntax vs Method syntax — comparație**

\`\`\`csharp
var produse = GetProducts(); // List<Product>

// Query syntax — mai apropiată de SQL, familiară pentru DB devs
var resultQuery =
    from p in produse
    where p.Price > 100 && p.Stock > 0
    orderby p.Price descending
    select new { p.Name, p.Price, Discount = p.Price * 0.1m };

// Method syntax — mai flexibilă, compusă, preferată în cod C# modern
var resultMethod = produse
    .Where(p => p.Price > 100 && p.Stock > 0)
    .OrderByDescending(p => p.Price)
    .Select(p => new { p.Name, p.Price, Discount = p.Price * 0.1m });
\`\`\`

**Proiecții complexe cu date nested**

\`\`\`csharp
public record Order(int Id, string Customer, List<OrderLine> Lines);
public record OrderLine(string Product, int Qty, decimal UnitPrice);

var orders = GetOrders();

var summary = orders.Select(o => new
{
    o.Id,
    o.Customer,
    LineCount = o.Lines.Count,
    Total = o.Lines.Sum(l => l.Qty * l.UnitPrice),
    Products = o.Lines.Select(l => l.Product).ToList(),
    HasExpensiveItems = o.Lines.Any(l => l.UnitPrice > 500m)
});
\`\`\`

**Interogări pe date ierarhice**

\`\`\`csharp
var categories = GetCategories(); // Category cu SubCategories

// Toate produsele din toate subcategoriile
var allProducts = categories
    .SelectMany(c => c.SubCategories)
    .SelectMany(sc => sc.Products)
    .Where(p => p.IsActive)
    .DistinctBy(p => p.Id)  // elimină duplicate (C# 6+)
    .ToList();

// Număr produse per categorie (incluzând subcategorii)
var countPerCategory = categories.Select(c => new
{
    c.Name,
    TotalProducts = c.SubCategories
        .SelectMany(sc => sc.Products)
        .Count(p => p.IsActive)
});
\`\`\`

**Chunk și Zip — operatori utili din C# 9+**

\`\`\`csharp
var numbers = Enumerable.Range(1, 10);

// Chunk — împarte în bucăți de N elemente
foreach (var chunk in numbers.Chunk(3))
    Console.WriteLine(string.Join(", ", chunk));
// 1, 2, 3  |  4, 5, 6  |  7, 8, 9  |  10

// Zip — combină două colecții element cu element
var names = new[] { "Ana", "Ion", "Maria" };
var scores = new[] { 95, 87, 92 };
var pairs = names.Zip(scores, (n, s) => $"{n}: {s}");
// ["Ana: 95", "Ion: 87", "Maria: 92"]
\`\`\`

• Method syntax e mai potrivit pentru **chaining complex** și expresii lambda avansate
• Query syntax e mai lizibilă pentru **join-uri multiple** și sintaxă SQL-like
• **DistinctBy, MinBy, MaxBy, ExceptBy** (C# 6+) — variante cu key selector
• Evită **ToList()** intermediar în lanțuri lungi — materializează doar la final`);

  console.log('Done.');
  await p.$disconnect();
}

run().catch(e => { console.error(e); p.$disconnect(); process.exit(1); });
