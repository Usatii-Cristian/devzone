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

await up('27. Entity Framework Core', 'DbContext si DbSet', `**DbContext și DbSet** sunt nucleul Entity Framework Core — DbContext reprezintă sesiunea cu baza de date, iar DbSet<T> reprezintă o tabelă pe care poți face interogări LINQ ce se transformă automat în SQL.

**Configurarea DbContext**

\`\`\`csharp
public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    // Fiecare DbSet = o tabelă în BD
    public DbSet<User> Users => Set<User>();
    public DbSet<Post> Posts => Set<Post>();
    public DbSet<Comment> Comments => Set<Comment>();

    protected override void OnModelCreating(ModelBuilder mb)
    {
        // Configurare tabelă și coloane
        mb.Entity<User>(e =>
        {
            e.ToTable("app_users");                    // nume tabelă custom
            e.Property(u => u.Email)
                .HasMaxLength(320)
                .IsRequired();
            e.HasIndex(u => u.Email).IsUnique();
            e.Property(u => u.CreatedAt)
                .HasDefaultValueSql("GETUTCDATE()");
        });

        // Relație One-to-Many
        mb.Entity<Post>(e =>
        {
            e.HasOne(p => p.Author)
                .WithMany(u => u.Posts)
                .HasForeignKey(p => p.AuthorId)
                .OnDelete(DeleteBehavior.Cascade);
        });
    }
}
\`\`\`

**Interogări cu DbSet**

\`\`\`csharp
// DbSet implementează IQueryable — interogările se traduc în SQL
public class UserRepository
{
    private readonly AppDbContext _db;
    public UserRepository(AppDbContext db) => _db = db;

    // SELECT * FROM Users WHERE IsActive = 1
    public async Task<List<User>> GetActiveAsync()
        => await _db.Users.Where(u => u.IsActive).ToListAsync();

    // SELECT TOP 1 * FROM Users WHERE Email = @email
    public async Task<User?> FindByEmailAsync(string email)
        => await _db.Users.FirstOrDefaultAsync(u => u.Email == email);

    // Cu Include — load relații (JOIN)
    public async Task<User?> GetWithPostsAsync(int id)
        => await _db.Users
            .Include(u => u.Posts)
                .ThenInclude(p => p.Comments)
            .FirstOrDefaultAsync(u => u.Id == id);
}
\`\`\`

**Change Tracking — urmărirea modificărilor**

\`\`\`csharp
// EF Core urmărește toate entitățile încărcate
var user = await _db.Users.FindAsync(1); // stare: Unchanged
user.Name = "Nume Nou";                  // stare: Modified

await _db.SaveChangesAsync();            // EF generează UPDATE automat

// Adăugare
var newUser = new User { Email = "nou@test.com" };
_db.Users.Add(newUser);      // stare: Added
await _db.SaveChangesAsync(); // INSERT

// Ștergere
_db.Users.Remove(user);      // stare: Deleted
await _db.SaveChangesAsync(); // DELETE
\`\`\`

• **AsNoTracking()** pentru interogări read-only — mai rapid, fără overhead de tracking
• **SaveChangesAsync()** salvează TOATE modificările din sesiunea curentă într-o tranzacție
• **FindAsync(id)** caută mai întâi în cache local, apoi în BD — prefer față de FirstOrDefaultAsync pentru lookup după PK`);

await up('27. Entity Framework Core', 'Lazy Loading', `**Lazy Loading, AsNoTracking și performanța** sunt concepte critice în EF Core — greșelile de configurare pot transforma un API rapid într-unul cu zeci sau sute de query-uri inutile.

**Problema N+1 — cel mai frecvent anti-pattern**

\`\`\`csharp
// GREȘIT — N+1 query problem
var users = await _db.Users.ToListAsync(); // 1 query: SELECT * FROM Users
foreach (var user in users)
{
    // N query-uri: SELECT * FROM Posts WHERE AuthorId = @id
    Console.WriteLine(user.Posts.Count); // Posts nu e încărcat!
}

// CORECT — Eager Loading cu Include
var users = await _db.Users
    .Include(u => u.Posts)
    .ToListAsync();
// 1 singur query cu JOIN
\`\`\`

**Lazy Loading — cu precauție**

\`\`\`csharp
// Activare Lazy Loading (necesită Microsoft.EntityFrameworkCore.Proxies)
builder.Services.AddDbContext<AppDbContext>(o =>
    o.UseSqlServer(conn).UseLazyLoadingProxies());

// Proprietățile navigației trebuie să fie virtual
public class User
{
    public virtual ICollection<Post> Posts { get; set; } = new List<Post>();
}

// Acum Posts se încarcă automat la acces — dar poate cauza N+1!
var user = await _db.Users.FindAsync(1);
int count = user.Posts.Count; // query automat ACUM
\`\`\`

**AsNoTracking — performanță pentru read-only**

\`\`\`csharp
// Fără tracking — nu menține stare, mai rapid cu ~30% pentru liste mari
public async Task<List<UserDto>> GetAllUsersAsync()
    => await _db.Users
        .AsNoTracking()
        .Where(u => u.IsActive)
        .Select(u => new UserDto(u.Id, u.Name, u.Email))
        .ToListAsync();

// AsNoTrackingWithIdentityResolution — pentru relații fără tracking
var posts = await _db.Posts
    .AsNoTrackingWithIdentityResolution()
    .Include(p => p.Author)
    .ToListAsync();
\`\`\`

**Split Query — pentru Include-uri multiple pe colecții**

\`\`\`csharp
// Implicit: un singur query cu JOIN (poate genera duplicare date)
// Split Query: mai multe query-uri separate, mai eficient pentru multe Include-uri

var users = await _db.Users
    .Include(u => u.Posts).ThenInclude(p => p.Tags)
    .Include(u => u.Comments)
    .AsSplitQuery()    // generează 3 query-uri separate
    .ToListAsync();
\`\`\`

• Folosește **Select** cu proiecții pentru a evita încărcarea coloanelor inutile
• **AsSplitQuery()** rezolvă produsul cartezian la Include-uri multiple pe colecții
• Monitorizează query-urile generate cu **LogTo(Console.WriteLine)** în DbContext options
• Regula de aur: **măsoară înainte de a optimiza** — folosește SQL Profiler sau EF logging`);

await up('28. ASP.NET Core Web API', 'Middleware', `**Middleware-ul** în ASP.NET Core este un lanț de componente care procesează fiecare request HTTP înainte de a ajunge la controller și fiecare response înainte de a fi trimis clientului. Ordinea în care le înregistrezi contează enorm.

**Conceptul de pipeline**

\`\`\`
Request →  [Logging] → [Auth] → [CORS] → [Routing] → [Controller]
Response ← [Logging] ← [Auth] ← [CORS] ← [Routing] ← [Controller]
\`\`\`

Fiecare middleware poate:
• Procesa request-ul și să continue la următorul (next)
• Scurtcircuita pipeline-ul (ex. returnează 401 fără a merge mai departe)
• Procesa response-ul pe drumul înapoi

**Middleware built-in și ordinea lor**

\`\`\`csharp
var app = builder.Build();

// Ordinea CONTEAZĂ — fiecare strat înfășoară cele de după
app.UseExceptionHandler("/error");     // prinde excepții de peste tot
app.UseHsts();                         // header HTTPS strict
app.UseHttpsRedirection();             // redirect HTTP → HTTPS
app.UseStaticFiles();                  // servire fișiere statice
app.UseRouting();                      // determină endpoint-ul
app.UseCors("AllowFrontend");          // headers CORS
app.UseAuthentication();               // verifică cine ești (JWT/cookie)
app.UseAuthorization();               // verifică ce ai voie să faci
app.MapControllers();                  // routează la controller
\`\`\`

**Middleware custom — logging request/response**

\`\`\`csharp
public class RequestLoggingMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<RequestLoggingMiddleware> _logger;

    public RequestLoggingMiddleware(RequestDelegate next, ILogger<RequestLoggingMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        var sw = System.Diagnostics.Stopwatch.StartNew();

        await _next(context);  // continuă la următorul middleware

        sw.Stop();
        _logger.LogInformation(
            "{Method} {Path} → {Status} în {Ms}ms",
            context.Request.Method,
            context.Request.Path,
            context.Response.StatusCode,
            sw.ElapsedMilliseconds);
    }
}

// Înregistrare
app.UseMiddleware<RequestLoggingMiddleware>();

// Sau cu extension method
public static class MiddlewareExtensions
{
    public static IApplicationBuilder UseRequestLogging(this IApplicationBuilder app)
        => app.UseMiddleware<RequestLoggingMiddleware>();
}
\`\`\`

**Global Exception Handler**

\`\`\`csharp
app.UseExceptionHandler(errApp =>
{
    errApp.Run(async context =>
    {
        var ex = context.Features.Get<IExceptionHandlerFeature>()?.Error;
        context.Response.StatusCode = ex is NotFoundException ? 404 : 500;
        context.Response.ContentType = "application/json";
        await context.Response.WriteAsJsonAsync(new { error = ex?.Message });
    });
});
\`\`\`

• Middleware vs Filter: Middleware e global pentru orice request; Filter e specific la controllere/acțiuni
• **app.Use** → poate continua; **app.Run** → terminal (nu apelează next)
• Înregistrează middleware de **logging și excepții primele** — altfel nu prind erorile din restul pipeline-ului`);

await up('28. ASP.NET Core Web API', 'Minimal APIs si ActionResult', `**ActionResult și tipurile de return** în ASP.NET Core definesc ce răspuns HTTP primește clientul — cod de status, headers și body. Controlul precis al răspunsului este esențial pentru un API REST corect implementat.

**IActionResult vs ActionResult<T>**

\`\`\`csharp
// IActionResult — flexibil, returnezi orice
[HttpGet("{id}")]
public async Task<IActionResult> GetUser(int id)
{
    var user = await _service.GetByIdAsync(id);
    if (user == null) return NotFound();
    return Ok(user);
}

// ActionResult<T> — Swagger îl poate documenta corect (știe tipul)
[HttpGet("{id}")]
public async Task<ActionResult<UserDto>> GetUserTyped(int id)
{
    var user = await _service.GetByIdAsync(id);
    return user == null ? NotFound() : user; // conversie implicită la Ok(user)
}
\`\`\`

**Codurile HTTP standard**

\`\`\`csharp
// 200 OK — cerere reușită
return Ok(data);

// 201 Created — resursă creată
return CreatedAtAction(nameof(GetUser), new { id = user.Id }, user);

// 204 No Content — reușit, fără body (de obicei DELETE sau PUT)
return NoContent();

// 400 Bad Request — date invalide trimise de client
return BadRequest(new { error = "Email invalid" });
// Sau cu ModelState
return BadRequest(ModelState);

// 401 Unauthorized — nu ești autentificat
return Unauthorized();

// 403 Forbidden — ești autentificat dar nu ai permisiune
return Forbid();

// 404 Not Found
return NotFound(new { message = "Utilizatorul nu există" });

// 409 Conflict
return Conflict(new { error = "Email deja folosit" });

// 422 Unprocessable Entity — date structurate corect dar invalide logic
return UnprocessableEntity(new { error = "Data în trecut" });
\`\`\`

**Problem Details — standard RFC 9457**

\`\`\`csharp
// Răspuns standardizat pentru erori
return Problem(
    title: "Resursa nu a fost găsită",
    detail: $"Utilizatorul cu id={id} nu există",
    statusCode: 404,
    type: "https://tools.ietf.org/html/rfc7231#section-6.5.4"
);

// Activare globală în Program.cs
builder.Services.AddProblemDetails();
app.UseExceptionHandler();
\`\`\`

**Minimal API Results**

\`\`\`csharp
// Echivalent în Minimal APIs
app.MapGet("/users/{id}", async (int id, IUserService svc) =>
{
    var user = await svc.GetByIdAsync(id);
    return user is null
        ? Results.Problem(title: "Not found", statusCode: 404)
        : Results.Ok(user);
});

app.MapPost("/users", async (CreateUserDto dto, IUserService svc) =>
{
    var user = await svc.CreateAsync(dto);
    return Results.CreatedAtRoute("GetUser", new { id = user.Id }, user);
});
\`\`\`

• Preferă **ActionResult<T>** față de **IActionResult** — documentare Swagger mai bună
• Returnează mereu **Problem Details** pentru erori — standardizat și ușor de consumat
• Evită returnarea entității direct — folosește mereu DTO pentru a controla ce date expui`);

  console.log('Done.');
  await p.$disconnect();
}

run().catch(e => { console.error(e); p.$disconnect(); process.exit(1); });
