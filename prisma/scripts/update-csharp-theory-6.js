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

await up('29. Dependency Injection', 'Lifetime', `**Lifetime-urile serviciilor** în DI Container controlează cât timp trăiește o instanță a unui serviciu. Alegerea greșită poate cauza memory leak-uri, date corupte sau erori de runtime greu de diagnosticat.

**Cele trei lifetime-uri**

\`\`\`csharp
// Transient — instanță nouă la fiecare injecție
builder.Services.AddTransient<IEmailService, SmtpEmailService>();
// Folosit pentru: servicii ușoare, fără stare, operații independente

// Scoped — o instanță per request HTTP
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<AppDbContext>();
// Folosit pentru: DbContext, servicii cu stare pe durata unui request

// Singleton — o singură instanță pentru toată viața aplicației
builder.Services.AddSingleton<IConfiguration>(config);
builder.Services.AddSingleton<ICacheService, MemoryCacheService>();
// Folosit pentru: cache, configurare, servicii thread-safe fără stare per request
\`\`\`

**Captive dependency — eroarea clasică**

\`\`\`csharp
// GREȘIT — Singleton care injectează Scoped
public class MySingleton
{
    private readonly IUserRepository _repo; // Scoped în Singleton!

    public MySingleton(IUserRepository repo) // repo va fi capturat pe viata singleton-ului
    {
        _repo = repo; // prima instanță Scoped e reținută pentru totdeauna
    }
}

// Efectul: _repo e din primul request și nu se actualizează niciodată
// .NET aruncă InvalidOperationException la startup dacă detectează asta

// CORECT — injectează IServiceScopeFactory în Singleton
public class MySingleton
{
    private readonly IServiceScopeFactory _scopeFactory;

    public MySingleton(IServiceScopeFactory factory) => _scopeFactory = factory;

    public async Task DoWorkAsync()
    {
        using var scope = _scopeFactory.CreateScope();
        var repo = scope.ServiceProvider.GetRequiredService<IUserRepository>();
        await repo.ProcessAsync();
    }
}
\`\`\`

**Comparație practică**

\`\`\`csharp
// Transient: ok pentru email sender (fără stare, operație independentă)
public class EmailSender : IEmailService
{
    public Task SendAsync(string to, string subject) { /* ... */ }
}

// Scoped: corect pentru DbContext (o conexiune per request)
builder.Services.AddDbContext<AppDbContext>(o => o.UseSqlServer(conn));
// Implicit scoped

// Singleton: ok pentru in-memory cache (shared, thread-safe)
public class MemoryCache : ICacheService
{
    private readonly ConcurrentDictionary<string, object> _store = new();
    public void Set(string key, object val) => _store[key] = val;
    public object? Get(string key) => _store.GetValueOrDefault(key);
}
\`\`\`

• **Scoped în Singleton** = captive dependency → bug-uri silențioase
• **Transient cu resurse scumpe** (conexiuni BD) = memory leak
• Lasă ASP.NET să valideze containerul: **builder.Host.UseDefaultServiceProvider(o => o.ValidateScopes = true)**`);

await up('29. Dependency Injection', 'Constructor injection', `**Constructor injection și interface segregation** sunt cele două principii care fac DI cu adevărat util — injectezi prin constructor pentru claritate și stabilitate, și segregi interfețele pentru flexibilitate maximă.

**Constructor Injection — pattern-ul canonic**

\`\`\`csharp
// Toate dependențele sunt declarate explicit în constructor
public class OrderService
{
    private readonly IOrderRepository _orders;
    private readonly IInventoryService _inventory;
    private readonly IEmailService _email;
    private readonly ILogger<OrderService> _logger;

    public OrderService(
        IOrderRepository orders,
        IInventoryService inventory,
        IEmailService email,
        ILogger<OrderService> logger)
    {
        _orders = orders;
        _inventory = inventory;
        _email = email;
        _logger = logger;
    }

    public async Task<Order> PlaceOrderAsync(CreateOrderDto dto)
    {
        _logger.LogInformation("Placing order for {Customer}", dto.CustomerEmail);

        if (!await _inventory.HasStockAsync(dto.ProductId, dto.Quantity))
            throw new InsufficientStockException();

        var order = await _orders.CreateAsync(dto);
        await _email.SendOrderConfirmationAsync(dto.CustomerEmail, order);

        return order;
    }
}
\`\`\`

**Interface Segregation — interfețe mici și precise**

\`\`\`csharp
// GREȘIT — interfață prea mare, forțează implementarea a tot
public interface IUserRepository
{
    Task<User?> FindByIdAsync(int id);
    Task<User?> FindByEmailAsync(string email);
    Task<List<User>> GetAllAsync();
    Task<User> CreateAsync(CreateUserDto dto);
    Task UpdateAsync(int id, UpdateUserDto dto);
    Task DeleteAsync(int id);
    Task<bool> ExistsAsync(string email);
    Task<int> CountAsync();
    // ... 10 metode mai
}

// BINE — interfețe separate, fiecare cu o responsabilitate
public interface IUserReader
{
    Task<User?> FindByIdAsync(int id);
    Task<User?> FindByEmailAsync(string email);
    Task<List<User>> GetAllAsync();
}

public interface IUserWriter
{
    Task<User> CreateAsync(CreateUserDto dto);
    Task UpdateAsync(int id, UpdateUserDto dto);
    Task DeleteAsync(int id);
}

// Implementarea poate implementa ambele
public class UserRepository : IUserReader, IUserWriter { /* ... */ }
\`\`\`

**Property Injection — rar, pentru cazuri speciale**

\`\`\`csharp
// Folosit în framework-uri (ex. Razor Pages, test classes)
// Nu e recomandat în cod de producție — dependența e opțională/ascunsă
public class MyController : Controller
{
    [FromServices]  // injectat din container per request
    public IUserService UserService { get; set; } = null!;
}
\`\`\`

• Dacă constructorul are mai mult de 4-5 dependențe, reevaluează designul — poate clasa face prea mult
• Preferă **interfețe** față de clase concrete ca dependențe — ușurează testarea cu mock-uri
• **IOptions<T>** pentru injectarea setărilor de configurare tipizate`);

await up('29. Dependency Injection', 'Options pattern', `**Options pattern, Keyed services și testabilitatea** sunt funcționalitățile avansate ale DI din ASP.NET Core care rezolvă configurarea tipizată, servicii multiple de același tip și testarea ușoară a componentelor.

**Options Pattern — configurare tipizată**

\`\`\`csharp
// appsettings.json
{
  "Email": {
    "SmtpHost": "smtp.gmail.com",
    "SmtpPort": 587,
    "FromAddress": "noreply@myapp.com",
    "EnableSsl": true
  }
}

// Clasa de configurare
public class EmailOptions
{
    public const string Section = "Email";
    public string SmtpHost { get; set; } = "";
    public int SmtpPort { get; set; } = 587;
    public string FromAddress { get; set; } = "";
    public bool EnableSsl { get; set; }
}

// Înregistrare în Program.cs
builder.Services.Configure<EmailOptions>(
    builder.Configuration.GetSection(EmailOptions.Section));

// Injectare în serviciu
public class EmailService
{
    private readonly EmailOptions _opts;

    public EmailService(IOptions<EmailOptions> options)
    {
        _opts = options.Value;
    }

    public Task SendAsync(string to, string subject)
    {
        Console.WriteLine($"Trimit de la {_opts.FromAddress} via {_opts.SmtpHost}:{_opts.SmtpPort}");
        return Task.CompletedTask;
    }
}
\`\`\`

**IOptions vs IOptionsMonitor vs IOptionsSnapshot**

\`\`\`csharp
// IOptions<T> — valoare fixă la startup, Singleton
IOptions<EmailOptions> opts; // opts.Value

// IOptionsSnapshot<T> — recitit per request, Scoped
IOptionsSnapshot<EmailOptions> snap; // snap.Value

// IOptionsMonitor<T> — notificare la schimbare, Singleton
IOptionsMonitor<EmailOptions> monitor;
monitor.OnChange(newOpts => Console.WriteLine("Config changed!"));
\`\`\`

**Keyed Services (C# 8 / .NET 8)**

\`\`\`csharp
// Înregistrare mai mulți provideri de același tip
builder.Services.AddKeyedScoped<IStorageService, LocalStorage>("local");
builder.Services.AddKeyedScoped<IStorageService, S3Storage>("s3");
builder.Services.AddKeyedScoped<IStorageService, AzureStorage>("azure");

// Injectare prin cheie
public class FileController : ControllerBase
{
    private readonly IStorageService _storage;

    public FileController([FromKeyedServices("s3")] IStorageService storage)
    {
        _storage = storage;
    }
}
\`\`\`

**Testabilitate — mock rapid cu interfețe**

\`\`\`csharp
// Cu Moq — mock orice interfață fără implementare reală
var mockRepo = new Mock<IUserRepository>();
mockRepo.Setup(r => r.FindByIdAsync(1))
        .ReturnsAsync(new User { Id = 1, Name = "Ana" });

var service = new UserService(mockRepo.Object, Mock.Of<ILogger<UserService>>());
var user = await service.GetUserAsync(1);
Assert.Equal("Ana", user.Name);
\`\`\`

• **IOptions** pentru configurare Singleton; **IOptionsSnapshot** dacă ai reloading la runtime
• Keyed services elimină nevoia de factory sau switch-uri pentru alegerea implementării
• Testele de unitate devin banale cu interfețe — fiecare dependență se poate înlocui cu mock`);

await up('30. Mini Proiect', 'Arhitectura', `**Arhitectura layered Controller-Service-Repository** este pattern-ul standard pentru API-urile C# de producție — fiecare strat are o singură responsabilitate și comunică doar cu stratul imediat adjacent.

**Structura folder-elor**

\`\`\`
MyApi/
├── Controllers/          (HTTP, routing, validare input)
│   └── TasksController.cs
├── Services/             (logică de business)
│   ├── ITaskService.cs
│   └── TaskService.cs
├── Repositories/         (acces date)
│   ├── ITaskRepository.cs
│   └── TaskRepository.cs
├── Models/               (entități EF Core)
│   └── TaskItem.cs
├── DTOs/                 (obiecte transfer date)
│   └── TaskDtos.cs
├── Exceptions/           (excepții custom)
│   └── NotFoundException.cs
└── Data/
    └── AppDbContext.cs
\`\`\`

**Repository Layer — acces date izolat**

\`\`\`csharp
public interface ITaskRepository
{
    Task<TaskItem?> GetByIdAsync(int id);
    Task<List<TaskItem>> GetAllAsync(bool onlyActive = false);
    Task<TaskItem> CreateAsync(TaskItem task);
    Task UpdateAsync(TaskItem task);
    Task DeleteAsync(int id);
}

public class TaskRepository : ITaskRepository
{
    private readonly AppDbContext _db;
    public TaskRepository(AppDbContext db) => _db = db;

    public async Task<TaskItem?> GetByIdAsync(int id)
        => await _db.Tasks.AsNoTracking().FirstOrDefaultAsync(t => t.Id == id);

    public async Task<List<TaskItem>> GetAllAsync(bool onlyActive = false)
        => await _db.Tasks.AsNoTracking()
            .Where(t => !onlyActive || !t.IsCompleted)
            .OrderByDescending(t => t.CreatedAt)
            .ToListAsync();

    public async Task<TaskItem> CreateAsync(TaskItem task)
    {
        _db.Tasks.Add(task);
        await _db.SaveChangesAsync();
        return task;
    }

    public async Task UpdateAsync(TaskItem task)
    {
        _db.Tasks.Update(task);
        await _db.SaveChangesAsync();
    }

    public async Task DeleteAsync(int id)
    {
        var task = await _db.Tasks.FindAsync(id)
            ?? throw new NotFoundException($"Task {id} inexistent");
        _db.Tasks.Remove(task);
        await _db.SaveChangesAsync();
    }
}
\`\`\`

**Service Layer — logica de business**

\`\`\`csharp
public class TaskService : ITaskService
{
    private readonly ITaskRepository _repo;
    private readonly ILogger<TaskService> _logger;

    public TaskService(ITaskRepository repo, ILogger<TaskService> logger)
    {
        _repo = repo; _logger = logger;
    }

    public async Task<TaskResponseDto> CreateAsync(CreateTaskDto dto)
    {
        var task = new TaskItem
        {
            Title = dto.Title.Trim(),
            Description = dto.Description?.Trim(),
            Priority = dto.Priority,
            CreatedAt = DateTime.UtcNow
        };
        var created = await _repo.CreateAsync(task);
        _logger.LogInformation("Task {Id} created: {Title}", created.Id, created.Title);
        return MapToDto(created);
    }
}
\`\`\`

• Fiecare strat depinde doar de **interfața** stratului de dedesubt (nu de implementare)
• Repository-ul nu știe nimic de HTTP; Controller-ul nu știe nimic de BD
• Testabilitate maximă: mock Repository în testele de Service, mock Service în testele de Controller`);

  console.log('Done.');
  await p.$disconnect();
}

run().catch(e => { console.error(e); p.$disconnect(); process.exit(1); });
