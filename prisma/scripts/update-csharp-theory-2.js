const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();

async function up(lessonContains, titleContains, content, exactMatch) {
  let lessons;
  if (exactMatch) {
    lessons = await p.lesson.findMany({ where: { module: { slug: 'csharp' }, title: { contains: lessonContains } } });
    lessons = lessons.filter(l => l.title === lessonContains);
  } else {
    lessons = await p.lesson.findMany({ where: { module: { slug: 'csharp' }, title: { contains: lessonContains } } });
  }
  const theory = await p.theory.findFirst({ where: { lessonId: { in: lessons.map(l => l.id) }, title: { contains: titleContains } } });
  if (!theory) { console.log(`NOT FOUND: ${lessonContains} / ${titleContains}`); return; }
  await p.theory.update({ where: { id: theory.id }, data: { content } });
  console.log(`✓ ${theory.title}: ${theory.content.length} → ${content.length}`);
}

async function run() {

await up('LINQ Fundamentals', 'What is LINQ', `**LINQ (Language Integrated Query)** este una dintre cele mai puternice caracteristici ale C# — îți permite să interoghezi orice colecție de date (liste, array-uri, baze de date, XML) folosind o sintaxă uniformă, tipizată la compilare, direct în codul C#.

**De ce LINQ?**

Înainte de LINQ, filtrarea și transformarea colecțiilor arăta astfel:

\`\`\`csharp
// Modul vechi — imperativ
var result = new List<string>();
foreach (var name in names)
{
    if (name.Length > 4)
        result.Add(name.ToUpper());
}

// Cu LINQ — declarativ, mai clar
var result = names.Where(n => n.Length > 4)
                  .Select(n => n.ToUpper())
                  .ToList();
\`\`\`

**Sintaxa query vs method chain**

\`\`\`csharp
var numere = new[] { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };

// Sintaxa query (similară SQL)
var pareQuery = from n in numere
                where n % 2 == 0
                orderby n descending
                select n * n;

// Sintaxa method chain (mai folosită în practică)
var pareMethod = numere
    .Where(n => n % 2 == 0)
    .OrderByDescending(n => n)
    .Select(n => n * n);

// Ambele produc același rezultat: [100, 64, 36, 16, 4]
\`\`\`

**Operatori LINQ esențiali**

\`\`\`csharp
var produse = new List<Produs>
{
    new("Laptop", 3500m, "IT"),
    new("Mouse", 80m, "IT"),
    new("Birou", 1200m, "Mobilier"),
    new("Scaun", 900m, "Mobilier"),
};

// Filtrare
var it = produse.Where(p => p.Categorie == "IT");

// Proiecție (transformare)
var nume = produse.Select(p => p.Nume);

// Ordonare
var sortat = produse.OrderBy(p => p.Pret).ThenBy(p => p.Nume);

// Agregare
decimal total = produse.Sum(p => p.Pret);
decimal maxPret = produse.Max(p => p.Pret);
int count = produse.Count(p => p.Pret > 500m);

// Verificări
bool oriceScump = produse.Any(p => p.Pret > 3000m);  // true
bool toateScumpe = produse.All(p => p.Pret > 100m);   // false
\`\`\`

**Lazy evaluation — execuție amânată**

LINQ nu execută interogarea imediat — o execută abia când iterezi rezultatul:

\`\`\`csharp
var query = numere.Where(n => n > 5); // NImIc nu e executat încă

foreach (var n in query)  // execuția are loc ACUM
    Console.Write(n + " ");

// Forțare imediată cu .ToList(), .ToArray(), .First() etc.
var lista = query.ToList();
\`\`\`

• LINQ funcționează pe orice **IEnumerable<T>**
• Cu **Entity Framework** aceleași metode generează SQL automat
• Prefer **method syntax** pentru lizibilitate în cod modern`);

await up('LINQ Fundamentals', 'LINQ with Objects', `**LINQ pe obiecte** (LINQ to Objects) îți permite să interoghezi colecții de instanțe de clase cu aceeași sintaxă ca pentru colecții simple — filtând, transformând și agregând date complexe cu proprietăți nested.

**Filtrare și proiecție pe obiecte**

\`\`\`csharp
public record Angajat(string Nume, string Departament, decimal Salariu, int AnAngajare);

var angajati = new List<Angajat>
{
    new("Ana Pop", "IT", 8500m, 2019),
    new("Ion Mihai", "HR", 5200m, 2021),
    new("Maria Ion", "IT", 9200m, 2018),
    new("Radu Stan", "Finance", 7100m, 2020),
    new("Elena Popa", "IT", 7800m, 2022),
};

// Angajații IT cu salariu > 8000, ordonați descrescător
var topIT = angajati
    .Where(a => a.Departament == "IT" && a.Salariu > 8000m)
    .OrderByDescending(a => a.Salariu)
    .Select(a => new { a.Nume, a.Salariu });

foreach (var a in topIT)
    Console.WriteLine($"{a.Nume}: {a.Salariu:C}");
// Maria Ion: 9.200 RON
// Ana Pop: 8.500 RON
\`\`\`

**GroupBy — grupare și agregare**

\`\`\`csharp
// Salariu mediu pe departament
var stats = angajati
    .GroupBy(a => a.Departament)
    .Select(g => new
    {
        Departament = g.Key,
        Count = g.Count(),
        SalariuMediu = g.Average(a => a.Salariu),
        SalariuMax = g.Max(a => a.Salariu)
    })
    .OrderByDescending(s => s.SalariuMediu);

foreach (var s in stats)
    Console.WriteLine($"{s.Departament}: {s.Count} angajați, medie {s.SalariuMediu:F0}");
\`\`\`

**Join între colecții**

\`\`\`csharp
var departamente = new List<(string Cod, string Oras)>
{
    ("IT", "Cluj"),
    ("HR", "București"),
    ("Finance", "Timișoara"),
};

var rezultat = angajati.Join(
    departamente,
    a => a.Departament,       // cheia din angajati
    d => d.Cod,               // cheia din departamente
    (a, d) => new { a.Nume, a.Departament, d.Oras }
);
\`\`\`

**First, Single, Any, All — interogări de verificare**

\`\`\`csharp
var primul = angajati.First(a => a.Departament == "IT");    // excepție dacă nu există
var primulSau = angajati.FirstOrDefault(a => a.Salariu > 20000m); // null dacă nu există

bool existaIT = angajati.Any(a => a.Departament == "IT");   // true
bool toiReci = angajati.All(a => a.Salariu > 3000m);        // true

// Single — exact un rezultat (excepție dacă 0 sau >1)
var unic = angajati.Single(a => a.Nume == "Ana Pop");
\`\`\`

• **SelectMany** aplatizează colecții nested (ex. lista de comenzi cu liste de produse)
• **Distinct** elimină duplicatele, **Union/Intersect/Except** operații pe mulțimi
• LINQ to Objects rulează **în memorie** — pentru BD folosește EF Core (LINQ to SQL)`);

await up('Async/Await and Tasks', 'Exception Handling', `**Gestionarea excepțiilor în cod async** are particularități față de codul sincron — excepțiile nu se propagă imediat, ci sunt capturate în obiectul Task și rethrow-ate abia când await-ezi sau accesezi rezultatul.

**Comportamentul de bază**

\`\`\`csharp
// Excepția e capturată în Task, nu aruncată imediat
async Task<string> FetchData(string url)
{
    using var client = new HttpClient();
    // Dacă url e invalid sau serverul cade, excepția e stocată în Task
    return await client.GetStringAsync(url);
}

// try/catch în jurul await-ului prinde excepția corect
try
{
    var data = await FetchData("https://api.example.com/data");
    Console.WriteLine(data);
}
catch (HttpRequestException ex)
{
    Console.WriteLine($"Eroare HTTP: {ex.Message}");
}
catch (TaskCanceledException)
{
    Console.WriteLine("Request timeout");
}
\`\`\`

**AggregateException — Task.WhenAll cu mai multe erori**

\`\`\`csharp
var task1 = Task.FromException<int>(new InvalidOperationException("Eroare 1"));
var task2 = Task.FromException<int>(new ArgumentException("Eroare 2"));
var task3 = Task.FromResult(42);

try
{
    var results = await Task.WhenAll(task1, task2, task3);
}
catch (Exception ex)
{
    // await Task.WhenAll aruncă prima excepție
    Console.WriteLine($"Prima eroare: {ex.Message}");

    // Pentru toate erorile, inspectează Task-urile direct
    var allExceptions = new[] { task1, task2, task3 }
        .Where(t => t.IsFaulted)
        .SelectMany(t => t.Exception!.InnerExceptions);
}
\`\`\`

**CancellationToken — anularea operațiunilor**

\`\`\`csharp
public async Task<string> DescarcaAsync(string url, CancellationToken ct = default)
{
    using var client = new HttpClient();

    // Pasăm token-ul — dacă e anulat, aruncă OperationCanceledException
    var response = await client.GetAsync(url, ct);
    response.EnsureSuccessStatusCode();
    return await response.Content.ReadAsStringAsync(ct);
}

// Utilizare cu timeout
using var cts = new CancellationTokenSource(TimeSpan.FromSeconds(5));
try
{
    var content = await DescarcaAsync("https://api.example.com", cts.Token);
}
catch (OperationCanceledException)
{
    Console.WriteLine("Operațiunea a fost anulată sau a expirat");
}
\`\`\`

**Fire and forget — capcanele metodelor void async**

\`\`\`csharp
// PERICULOS — excepțiile din void async sunt neobservate și pot crasha aplicația
async void SendNotification() { throw new Exception("Ignorată silențios!"); }

// CORECT — returnează Task, permite await și prinderea excepțiilor
async Task SendNotificationAsync() { throw new Exception("Prinsă corect"); }
\`\`\`

• Preferă **Task** față de **void** pentru metode async (excepție: event handlers)
• Folosește mereu **CancellationToken** în metodele async din biblioteci și API-uri
• **ConfigureAwait(false)** în biblioteci pentru a evita deadlock-uri în contexte cu SynchronizationContext`);

await up('Entity Framework Core', 'Migrations', `**Migrations** în Entity Framework Core sunt mecanismul prin care modificările din modelul C# (clase, proprietăți) se traduc în modificări de schemă în baza de date — cu istoric versionat, aplicabil incremental.

**Fluxul de lucru cu migrations**

\`\`\`bash
# 1. Ai creat sau modificat o entitate
# 2. Generezi migration-ul
dotnet ef migrations add AddUserTable

# 3. Aplici migration-ul la BD
dotnet ef database update

# 4. Revii la o versiune anterioară
dotnet ef database update NumeMigrationAnterior

# Ștergi ultimul migration neasplicat
dotnet ef migrations remove
\`\`\`

**Ce generează o migration**

\`\`\`csharp
// Dacă adaugi clasa User cu proprietățile de mai jos:
public class User
{
    public int Id { get; set; }
    public string Email { get; set; } = "";
    public string Name { get; set; } = "";
    public DateTime CreatedAt { get; set; }
}

// EF Core generează automat fișierul migration:
public partial class AddUserTable : Migration
{
    protected override void Up(MigrationBuilder mb)
    {
        mb.CreateTable(
            name: "Users",
            columns: table => new
            {
                Id = table.Column<int>(nullable: false)
                    .Annotation("SqlServer:Identity", "1, 1"),
                Email = table.Column<string>(nullable: false),
                Name = table.Column<string>(nullable: false),
                CreatedAt = table.Column<DateTime>(nullable: false)
            },
            constraints: table => table.PrimaryKey("PK_Users", x => x.Id));
    }

    protected override void Down(MigrationBuilder mb)
    {
        mb.DropTable(name: "Users");
    }
}
\`\`\`

**Modificare schemă — adăugare coloană cu valoare default**

\`\`\`csharp
// Adaugi proprietatea IsActive în User
public bool IsActive { get; set; } = true;

// Migration generată:
mb.AddColumn<bool>(
    name: "IsActive",
    table: "Users",
    nullable: false,
    defaultValue: true);
\`\`\`

**Seed data în migrations**

\`\`\`csharp
// În DbContext.OnModelCreating:
modelBuilder.Entity<Role>().HasData(
    new Role { Id = 1, Name = "Admin" },
    new Role { Id = 2, Name = "User" }
);

// Generezi: dotnet ef migrations add SeedRoles
// EF Core va insera aceste rânduri la update
\`\`\`

**Bune practici**

• Un migration = o modificare logică (nu combina zeci de schimbări)
• **Niciodată** nu modifica manual fișierele migration deja aplicate în producție
• Testează **Down()** — trebuie să poți reveni la orice versiune anterioară
• Salvează migration-urile în **Git** — sunt parte din codul sursă al proiectului`, false);

await up('Dependency Injection', 'DI Container', `**DI Container-ul** din ASP.NET Core (IServiceCollection) este motorul de injecție al întregii aplicații — înregistrezi serviciile o dată la startup și framework-ul le creează și injectează automat acolo unde sunt necesare.

**Înregistrarea serviciilor în Program.cs**

\`\`\`csharp
var builder = WebApplication.CreateBuilder(args);

// Înregistrare cu interfață (recomandat — decuplare)
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddTransient<IEmailService, SmtpEmailService>();
builder.Services.AddSingleton<IConfiguration>(builder.Configuration);

// Înregistrare fără interfață (pentru clase concrete)
builder.Services.AddScoped<UserService>();

// Înregistrare cu factory (când ai nevoie de logică la creare)
builder.Services.AddScoped<IDbConnection>(sp =>
    new SqlConnection(sp.GetRequiredService<IConfiguration>()
        .GetConnectionString("Default")));

var app = builder.Build();
\`\`\`

**Constructor Injection — pattern-ul standard**

\`\`\`csharp
public class UserService
{
    private readonly IUserRepository _repo;
    private readonly IEmailService _email;
    private readonly ILogger<UserService> _logger;

    // Container-ul vede constructorul și injectează automat toate dependențele
    public UserService(
        IUserRepository repo,
        IEmailService email,
        ILogger<UserService> logger)
    {
        _repo = repo;
        _email = email;
        _logger = logger;
    }

    public async Task<User> RegisterAsync(string email, string password)
    {
        _logger.LogInformation("Registering {Email}", email);
        var user = await _repo.CreateAsync(email, password);
        await _email.SendWelcomeAsync(user.Email);
        return user;
    }
}
\`\`\`

**Rezolvarea manuală a serviciilor**

\`\`\`csharp
// În middleware sau situații speciale
app.Use(async (context, next) =>
{
    var service = context.RequestServices.GetRequiredService<IUserService>();
    // GetService<T>() returnează null dacă serviciul nu e înregistrat
    // GetRequiredService<T>() aruncă excepție dacă lipsește
    await next();
});
\`\`\`

**Extensii pentru organizare**

\`\`\`csharp
// Grupează înregistrările pe domeniu în extension methods
public static class ServiceExtensions
{
    public static IServiceCollection AddUserFeature(this IServiceCollection services)
    {
        services.AddScoped<IUserRepository, UserRepository>();
        services.AddScoped<IUserService, UserService>();
        services.AddTransient<IPasswordHasher, BcryptHasher>();
        return services;
    }
}

// Folosire curată în Program.cs
builder.Services.AddUserFeature();
\`\`\`

• **GetRequiredService** față de **GetService** — preferă varianta care aruncă excepție, greșelile de configurare se văd imediat
• Evită **Service Locator pattern** (rezolvare manuală din container) — injectează în constructor
• Nu înregistra servicii **Scoped** ca dependențe în servicii **Singleton** — risc de captured dependency`, true);

  console.log('Done.');
  await p.$disconnect();
}

run().catch(e => { console.error(e); p.$disconnect(); process.exit(1); });
