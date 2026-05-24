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

await up('30. Mini Proiect', 'FluentValidation', `**FluentValidation și global error handling** transformă validarea și gestionarea erorilor dintr-o sarcină repetitivă și împrăștiată în cod centralizat, clar și extensibil.

**FluentValidation — validare declarativă**

\`\`\`csharp
// Instalare: dotnet add package FluentValidation.AspNetCore

public class CreateTaskDtoValidator : AbstractValidator<CreateTaskDto>
{
    public CreateTaskDtoValidator()
    {
        RuleFor(x => x.Title)
            .NotEmpty().WithMessage("Titlul este obligatoriu")
            .MinimumLength(3).WithMessage("Titlul trebuie să aibă cel puțin 3 caractere")
            .MaximumLength(200).WithMessage("Titlul nu poate depăși 200 caractere");

        RuleFor(x => x.Priority)
            .InclusiveBetween(1, 5)
            .WithMessage("Prioritatea trebuie să fie între 1 și 5");

        RuleFor(x => x.DueDate)
            .GreaterThan(DateTime.UtcNow)
            .When(x => x.DueDate.HasValue)
            .WithMessage("Data limită trebuie să fie în viitor");
    }
}

// Înregistrare în Program.cs
builder.Services.AddFluentValidationAutoValidation();
builder.Services.AddValidatorsFromAssemblyContaining<CreateTaskDtoValidator>();
\`\`\`

**Reguli avansate — validare condiționată și custom**

\`\`\`csharp
public class UpdateTaskDtoValidator : AbstractValidator<UpdateTaskDto>
{
    private readonly ITaskRepository _repo;

    public UpdateTaskDtoValidator(ITaskRepository repo)
    {
        _repo = repo;

        RuleFor(x => x.Title)
            .NotEmpty()
            .When(x => x.Title != null);

        // Validare async — verificare unicitate
        RuleFor(x => x.Title)
            .MustAsync(async (title, ct) =>
                !await _repo.ExistsByTitleAsync(title!))
            .When(x => x.Title != null)
            .WithMessage("Există deja un task cu acest titlu");
    }
}
\`\`\`

**Global Exception Handler — middleware centralizat**

\`\`\`csharp
public class GlobalExceptionMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<GlobalExceptionMiddleware> _logger;

    public GlobalExceptionMiddleware(RequestDelegate next, ILogger<GlobalExceptionMiddleware> logger)
    {
        _next = next; _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (NotFoundException ex)
        {
            _logger.LogWarning(ex, "Resource not found");
            context.Response.StatusCode = 404;
            await context.Response.WriteAsJsonAsync(new ProblemDetails
            {
                Title = "Resursa nu a fost găsită",
                Detail = ex.Message,
                Status = 404
            });
        }
        catch (ValidationException ex)
        {
            context.Response.StatusCode = 422;
            await context.Response.WriteAsJsonAsync(new
            {
                title = "Validare eșuată",
                errors = ex.Errors.Select(e => new { e.PropertyName, e.ErrorMessage })
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Unhandled exception");
            context.Response.StatusCode = 500;
            await context.Response.WriteAsJsonAsync(new ProblemDetails
            {
                Title = "Eroare internă server",
                Status = 500
            });
        }
    }
}
\`\`\`

• FluentValidation separă complet regulile de validare de controller și service
• Global middleware prinde toate excepțiile, inclusiv din servicii și repository-uri
• Returnează mereu **ProblemDetails** (RFC 9457) pentru consistență cu clienții API`);

await up('30. Mini Proiect', 'Pagination', `**Pagination, sorting și filtering generic** sunt funcționalități esențiale pentru orice API care returnează liste — fără ele, un query simplu poate returna mii de rânduri și bloca aplicația.

**Modelul de cerere parametrizat**

\`\`\`csharp
public class QueryParams
{
    public int Page { get; set; } = 1;
    public int PageSize { get; set; } = 10;
    public string? SortBy { get; set; }
    public bool Descending { get; set; } = false;
    public string? Search { get; set; }

    // Constângeri
    public int ValidPageSize => Math.Clamp(PageSize, 1, 100);
    public int Skip => (Math.Max(1, Page) - 1) * ValidPageSize;
}

public record PagedResult<T>(
    IEnumerable<T> Items,
    int TotalCount,
    int Page,
    int PageSize,
    int TotalPages
);
\`\`\`

**Implementare generic în Repository**

\`\`\`csharp
public async Task<PagedResult<TaskItem>> GetPagedAsync(QueryParams q)
{
    var query = _db.Tasks.AsNoTracking().AsQueryable();

    // Filtering
    if (!string.IsNullOrWhiteSpace(q.Search))
        query = query.Where(t => t.Title.Contains(q.Search));

    // Sorting dinamic
    query = q.SortBy?.ToLower() switch
    {
        "title"    => q.Descending ? query.OrderByDescending(t => t.Title)
                                   : query.OrderBy(t => t.Title),
        "priority" => q.Descending ? query.OrderByDescending(t => t.Priority)
                                   : query.OrderBy(t => t.Priority),
        "createdat" => q.Descending ? query.OrderByDescending(t => t.CreatedAt)
                                    : query.OrderBy(t => t.CreatedAt),
        _ => query.OrderByDescending(t => t.CreatedAt)
    };

    var total = await query.CountAsync();

    var items = await query
        .Skip(q.Skip)
        .Take(q.ValidPageSize)
        .ToListAsync();

    return new PagedResult<TaskItem>(
        items, total, q.Page, q.ValidPageSize,
        (int)Math.Ceiling((double)total / q.ValidPageSize)
    );
}
\`\`\`

**Controller cu pagination**

\`\`\`csharp
[HttpGet]
public async Task<ActionResult<PagedResult<TaskResponseDto>>> GetAll(
    [FromQuery] QueryParams query)
{
    var result = await _service.GetPagedAsync(query);
    return Ok(result);
}

// Request: GET /api/tasks?page=2&pageSize=10&sortBy=priority&descending=true&search=urgent
// Response:
// {
//   "items": [...],
//   "totalCount": 47,
//   "page": 2,
//   "pageSize": 10,
//   "totalPages": 5
// }
\`\`\`

**Filtre multiple cu Specification Pattern**

\`\`\`csharp
public class TaskSpecification
{
    public bool? IsCompleted { get; set; }
    public int? MinPriority { get; set; }
    public DateTime? CreatedAfter { get; set; }

    public IQueryable<TaskItem> Apply(IQueryable<TaskItem> q)
    {
        if (IsCompleted.HasValue)
            q = q.Where(t => t.IsCompleted == IsCompleted.Value);
        if (MinPriority.HasValue)
            q = q.Where(t => t.Priority >= MinPriority.Value);
        if (CreatedAfter.HasValue)
            q = q.Where(t => t.CreatedAt >= CreatedAfter.Value);
        return q;
    }
}
\`\`\`

• Impune mereu un **PageSize maxim** (ex. 100) — clientul nu poate cere 10000 rânduri
• Adaugă **index** în BD pe coloanele folosite la filtrare și sorting
• Returnează mereu **TotalCount** în response — clientul știe câte pagini există`);

await up('30. Mini Proiect', 'Testare integrare', `**Testarea de integrare și best practices** închid ciclul de dezvoltare — validăm că întregul stack funcționează corect, de la request HTTP la baza de date și înapoi.

**Setup WebApplicationFactory**

\`\`\`csharp
// Tests/IntegrationTests/TasksIntegrationTests.cs
public class TaskApiFixture : WebApplicationFactory<Program>, IAsyncLifetime
{
    private readonly string _dbPath = $"test_{Guid.NewGuid()}.db";

    protected override void ConfigureWebHost(IWebHostBuilder builder)
    {
        builder.ConfigureServices(services =>
        {
            services.RemoveAll<DbContextOptions<AppDbContext>>();
            services.AddDbContext<AppDbContext>(o =>
                o.UseSqlite($"Data Source={_dbPath}"));
        });
    }

    public async Task InitializeAsync()
    {
        using var scope = Services.CreateScope();
        var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
        await db.Database.EnsureCreatedAsync();
    }

    public async Task DisposeAsync()
    {
        if (File.Exists(_dbPath)) File.Delete(_dbPath);
    }
}

public class TasksIntegrationTests : IClassFixture<TaskApiFixture>
{
    private readonly HttpClient _client;

    public TasksIntegrationTests(TaskApiFixture fixture)
    {
        _client = fixture.CreateClient();
    }

    [Fact]
    public async Task FullCrud_Works()
    {
        // CREATE
        var res = await _client.PostAsJsonAsync("/api/tasks",
            new CreateTaskDto("Test CRUD", null, 3));
        Assert.Equal(HttpStatusCode.Created, res.StatusCode);
        var created = await res.Content.ReadFromJsonAsync<TaskResponseDto>();

        // READ
        var get = await _client.GetAsync($"/api/tasks/{created!.Id}");
        Assert.Equal(HttpStatusCode.OK, get.StatusCode);

        // UPDATE
        var put = await _client.PutAsJsonAsync($"/api/tasks/{created.Id}",
            new UpdateTaskDto(null, null, true, null));
        Assert.Equal(HttpStatusCode.OK, put.StatusCode);

        // DELETE
        var del = await _client.DeleteAsync($"/api/tasks/{created.Id}");
        Assert.Equal(HttpStatusCode.NoContent, del.StatusCode);

        // VERIFY GONE
        var gone = await _client.GetAsync($"/api/tasks/{created.Id}");
        Assert.Equal(HttpStatusCode.NotFound, gone.StatusCode);
    }
}
\`\`\`

**Best practices generale**

\`\`\`csharp
// 1. Validare la nivel de DTO — nu lăsa date invalide să intre în servicii
// 2. Logging structurat în fiecare layer
_logger.LogInformation("Task {Id} completed by {User}", id, userId);

// 3. Cancellation tokens în toate metodele async
public async Task<TaskItem?> GetByIdAsync(int id, CancellationToken ct = default)
    => await _db.Tasks.FindAsync(new object[] { id }, ct);

// 4. Global exception handling — nu try/catch în fiecare controller
// 5. Transactions pentru operații multiple
using var tx = await _db.Database.BeginTransactionAsync();
try { /* operații multiple */ await tx.CommitAsync(); }
catch { await tx.RollbackAsync(); throw; }
\`\`\`

• Rulează testele de integrare în **CI/CD** — nu doar local
• Folosește **SQLite in-memory** pentru teste, SQL Server/PostgreSQL pentru staging
• **Seed data** consistent în fixture pentru teste predictibile
• Testele de integrare sunt mai lente dar prind bug-uri pe care testele unitare nu le văd`);

await up('31. SignalR', 'Hub-uri', `**Hub-urile SignalR** sunt centrul comunicării real-time — un server C# care acceptă conexiuni WebSocket de la clienți și poate trimite mesaje individual, grupurilor sau tuturor.

**Crearea unui Hub**

\`\`\`csharp
// Hubs/ChatHub.cs
using Microsoft.AspNetCore.SignalR;

public class ChatHub : Hub
{
    // Client apelează această metodă de pe server
    public async Task SendMessage(string user, string message)
    {
        // Trimite tuturor clienților conectați
        await Clients.All.SendAsync("ReceiveMessage", user, message);
    }

    // Trimite numai celui care a apelat
    public async Task Echo(string message)
    {
        await Clients.Caller.SendAsync("ReceiveMessage", "Server", message);
    }

    // Trimite tuturor EXCEPTÂND apelantul
    public async Task Broadcast(string message)
    {
        await Clients.Others.SendAsync("ReceiveMessage", "Broadcast", message);
    }

    // Evenimente de conexiune
    public override async Task OnConnectedAsync()
    {
        Console.WriteLine($"Client conectat: {Context.ConnectionId}");
        await base.OnConnectedAsync();
    }

    public override async Task OnDisconnectedAsync(Exception? exception)
    {
        Console.WriteLine($"Client deconectat: {Context.ConnectionId}");
        await base.OnDisconnectedAsync(exception);
    }
}
\`\`\`

**Configurare în Program.cs**

\`\`\`csharp
builder.Services.AddSignalR();

var app = builder.Build();

// Mapare hub la ruta /hubs/chat
app.MapHub<ChatHub>("/hubs/chat");
\`\`\`

**Hub tipizat — interfețe pentru client methods**

\`\`\`csharp
// Definești ce metode poate apela serverul pe client
public interface IChatClient
{
    Task ReceiveMessage(string user, string message);
    Task UserJoined(string username);
    Task UserLeft(string username);
}

// Hub generic — compilatorul verifică că metodele există
public class TypedChatHub : Hub<IChatClient>
{
    public async Task SendMessage(string user, string message)
    {
        // Acum IntelliSense funcționează corect
        await Clients.All.ReceiveMessage(user, message);
    }
}
\`\`\`

**Client JavaScript**

\`\`\`javascript
import * as signalR from "@microsoft/signalr";

const connection = new signalR.HubConnectionBuilder()
    .withUrl("/hubs/chat")
    .withAutomaticReconnect()
    .build();

// Ascultă mesaje de la server
connection.on("ReceiveMessage", (user, message) => {
    console.log(\`\${user}: \${message}\`);
});

await connection.start();

// Trimite mesaj la server
await connection.invoke("SendMessage", "Ana", "Salut tuturor!");
\`\`\`

• SignalR alege automat cel mai bun transport: WebSockets, Server-Sent Events, Long Polling
• Folosește **Hub<IChatClient>** față de **Hub** — type-safety pentru metodele clientului
• Fiecare conexiune are un **ConnectionId** unic — util pentru mesaje țintite`);

  console.log('Done.');
  await p.$disconnect();
}

run().catch(e => { console.error(e); p.$disconnect(); process.exit(1); });
