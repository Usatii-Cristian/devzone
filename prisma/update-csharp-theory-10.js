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

await up('34. Entity Framework Core Advanced', 'Query optimization', `**Query optimization și No-Tracking** sunt tehnicile prin care transformi interogările EF Core lente în query-uri SQL eficiente — esențial când aplicația crește și numărul de utilizatori sau date crește.

**AsNoTracking — cel mai simplu câștig de performanță**

\`\`\`csharp
// CU tracking (default) — EF urmărește fiecare entitate în memorie
var users = await _db.Users.Where(u => u.IsActive).ToListAsync();
// intern: ChangeTracker stochează snapshot-uri pentru detection of changes

// FĂRĂ tracking — 20-30% mai rapid, mai puțin RAM
var users = await _db.Users
    .AsNoTracking()
    .Where(u => u.IsActive)
    .ToListAsync();

// Regula: AsNoTracking() dacă NU vei apela SaveChangesAsync() pe aceste entități
\`\`\`

**Projection cu Select — evită over-fetching**

\`\`\`csharp
// GREȘIT — încarcă toate coloanele, inclusiv cele inutile (ex. PasswordHash, Bio mare)
var users = await _db.Users.Where(u => u.IsActive).ToListAsync();

// CORECT — proiecție: SQL SELECT conține doar coloanele necesare
var userDtos = await _db.Users
    .Where(u => u.IsActive)
    .Select(u => new UserListDto(u.Id, u.Name, u.Email, u.CreatedAt))
    .ToListAsync();
// SQL generat: SELECT Id, Name, Email, CreatedAt FROM Users WHERE IsActive = 1
\`\`\`

**Compiled Queries — query-uri refolosite**

\`\`\`csharp
// Compilat o singură dată, reutilizat la fiecare apel
private static readonly Func<AppDbContext, int, Task<User?>> GetUserById =
    EF.CompileAsyncQuery((AppDbContext db, int id) =>
        db.Users.AsNoTracking().FirstOrDefault(u => u.Id == id));

// Utilizare — fără overhead de compilare LINQ → SQL
var user = await GetUserById(_db, userId);
\`\`\`

**Index-uri pentru query-uri rapide**

\`\`\`csharp
// modelBuilder.OnModelCreating
mb.Entity<User>(e =>
{
    // Index simplu pe Email (lookup frecvent)
    e.HasIndex(u => u.Email).IsUnique();

    // Index compus pentru filtre combinate frecvente
    e.HasIndex(u => new { u.IsActive, u.CreatedAt });

    // Index parțial — doar utilizatori activi (SQL Server)
    e.HasIndex(u => u.Email)
        .HasFilter("[IsActive] = 1");
});
\`\`\`

**Monitorizare query-uri generate**

\`\`\`csharp
// În appsettings.Development.json
{
    "Logging": {
        "LogLevel": {
            "Microsoft.EntityFrameworkCore.Database.Command": "Information"
        }
    }
}
// Sau în cod:
optionsBuilder.LogTo(Console.WriteLine, LogLevel.Information)
              .EnableSensitiveDataLogging(); // numai în dev!
\`\`\`

• **Projection + AsNoTracking** pentru orice endpoint read-only este regula de bază
• Verifică query-ul SQL generat cu LogTo sau MiniProfiler înainte de a merge în producție
• Evită **N+1 queries** — always Include sau proiectează relațiile necesare`);

await up('34. Entity Framework Core Advanced', 'Raw SQL', `**Raw SQL, ExecuteUpdate și ExecuteDelete** permit operații de masă eficiente în EF Core — actualizarea sau ștergerea a mii de rânduri cu un singur SQL statement, fără a încărca toate entitățile în memorie.

**ExecuteUpdate — UPDATE bulk (EF Core 7+)**

\`\`\`csharp
// GREȘIT — încarcă toate rândurile, le modifică, apoi INSERT UPDATE per rând
var oldUsers = await _db.Users.Where(u => u.LastLogin < cutoff).ToListAsync();
foreach (var user in oldUsers) user.IsActive = false;
await _db.SaveChangesAsync(); // N UPDATE statements!

// CORECT — un singur SQL UPDATE
await _db.Users
    .Where(u => u.LastLogin < cutoff)
    .ExecuteUpdateAsync(s =>
        s.SetProperty(u => u.IsActive, false)
         .SetProperty(u => u.UpdatedAt, DateTime.UtcNow));
// SQL: UPDATE Users SET IsActive = 0, UpdatedAt = @now WHERE LastLogin < @cutoff
\`\`\`

**ExecuteDelete — DELETE bulk**

\`\`\`csharp
// Șterge toate sesiunile expirate cu un singur query
var deleted = await _db.Sessions
    .Where(s => s.ExpiresAt < DateTime.UtcNow)
    .ExecuteDeleteAsync();

Console.WriteLine($"Șterse {deleted} sesiuni expirate");
// SQL: DELETE FROM Sessions WHERE ExpiresAt < @now
\`\`\`

**Raw SQL cu FromSql — query-uri complexe**

\`\`\`csharp
// FromSql — returnează entități EF Core, permite continuarea cu LINQ
var users = await _db.Users
    .FromSql($"SELECT * FROM Users WHERE YEAR(CreatedAt) = {year}")
    .Where(u => u.IsActive)    // adăugat ca WHERE suplimentar
    .OrderBy(u => u.Name)
    .ToListAsync();

// Cu parametri expliciți (protecție SQL injection)
var email = "ana@test.com";
var user = await _db.Users
    .FromSqlRaw("SELECT * FROM Users WHERE Email = {0}", email)
    .FirstOrDefaultAsync();
\`\`\`

**SqlQuery — pentru tipuri non-entitate**

\`\`\`csharp
// Interogări care returnează DTO-uri sau valori scalare
var stats = await _db.Database
    .SqlQuery<UserStats>($"""
        SELECT
            COUNT(*) as TotalUsers,
            COUNT(CASE WHEN IsActive = 1 THEN 1 END) as ActiveUsers,
            AVG(DATEDIFF(day, CreatedAt, GETUTCDATE())) as AvgAgeDays
        FROM Users
        """)
    .FirstAsync();
\`\`\`

**Stored Procedures**

\`\`\`csharp
// Apel procedure care returnează entități
var result = await _db.Users
    .FromSqlRaw("EXEC GetActiveUsersByDepartment @dept",
        new SqlParameter("@dept", "IT"))
    .ToListAsync();

// Procedure fără return
await _db.Database.ExecuteSqlRawAsync(
    "EXEC ArchiveOldOrders @CutoffDate",
    new SqlParameter("@CutoffDate", cutoffDate));
\`\`\`

• **ExecuteUpdate/Delete** nu apelează change tracker — mult mai rapid pentru bulk ops
• Folosește **parametri** mereu în FromSqlRaw — niciodată concatenare de string-uri
• Raw SQL nu poate fi interceptat de query filters globale (Global Query Filters)`);

await up('34. Entity Framework Core Advanced', 'Concurenta optimista', `**Concurența optimistă și RowVersion** rezolvă problema clasică de "lost update" — când doi utilizatori modifică același rând simultan și una dintre modificări se pierde.

**Problema concurenței**

\`\`\`
User A: citește Order #1 (Total = 100)
User B: citește Order #1 (Total = 100)
User A: modifică Total = 150, salvează → OK
User B: modifică Total = 120, salvează → suprascrie modificarea lui A!
\`\`\`

**RowVersion — concurență optimistă cu timestamp**

\`\`\`csharp
public class Order
{
    public int Id { get; set; }
    public decimal Total { get; set; }
    public string Status { get; set; } = "";

    // EF Core actualizează automat la fiecare SaveChanges
    [Timestamp]
    public byte[] RowVersion { get; set; } = Array.Empty<byte>();
}

// Sau în Fluent API:
mb.Entity<Order>()
    .Property(o => o.RowVersion)
    .IsRowVersion();
\`\`\`

**Detectarea și tratarea conflictelor**

\`\`\`csharp
public async Task UpdateOrderAsync(int orderId, decimal newTotal, byte[] rowVersion)
{
    var order = await _db.Orders.FindAsync(orderId)
        ?? throw new NotFoundException();

    // Setezi RowVersion-ul primit de la client
    _db.Entry(order).Property(o => o.RowVersion).OriginalValue = rowVersion;

    order.Total = newTotal;

    try
    {
        await _db.SaveChangesAsync();
        // SQL: UPDATE Orders SET Total=@total WHERE Id=@id AND RowVersion=@rv
    }
    catch (DbUpdateConcurrencyException ex)
    {
        var entry = ex.Entries.Single();
        var dbValues = await entry.GetDatabaseValuesAsync();

        if (dbValues == null)
            throw new NotFoundException("Comanda a fost ștearsă de alt utilizator");

        // Poți informa utilizatorul ce valori sunt în BD acum
        var currentOrder = (Order)dbValues.ToObject();
        throw new ConcurrencyConflictException(
            $"Comanda a fost modificată. Total curent: {currentOrder.Total}");
    }
}
\`\`\`

**Concurență pesimistă — cu explicit locking**

\`\`\`csharp
// Lockare explicită la nivel de BD (nu recomandat pentru scale)
await using var tx = await _db.Database.BeginTransactionAsync(
    IsolationLevel.Serializable);

// SQL Server: SELECT ... WITH (UPDLOCK, ROWLOCK)
var order = await _db.Orders
    .FromSqlRaw("SELECT * FROM Orders WITH (UPDLOCK) WHERE Id = {0}", orderId)
    .FirstOrDefaultAsync();

order!.Total = newTotal;
await _db.SaveChangesAsync();
await tx.CommitAsync();
\`\`\`

• Concurența optimistă e preferată pentru web — nu ține lock-uri pe durată lungă
• Trimite mereu **RowVersion** în DTO la client și întoarce-l la update
• Tabelele cu mulți utilizatori simultan beneficiază cel mai mult de RowVersion`);

await up('34. Entity Framework Core Advanced', 'Interceptori EF Core', `**Interceptorii EF Core și Global Query Filters** permit logică transversală fără a modifica fiecare query — audit logging automat, soft delete transparent, filtrare globală per tenant.

**Interceptor pentru audit logging**

\`\`\`csharp
public class AuditInterceptor : SaveChangesInterceptor
{
    private readonly ICurrentUserService _currentUser;
    public AuditInterceptor(ICurrentUserService currentUser) => _currentUser = currentUser;

    public override ValueTask<InterceptionResult<int>> SavingChangesAsync(
        DbContextEventData eventData,
        InterceptionResult<int> result,
        CancellationToken ct = default)
    {
        var context = eventData.Context!;
        var now = DateTime.UtcNow;
        var userId = _currentUser.UserId;

        foreach (var entry in context.ChangeTracker.Entries())
        {
            if (entry.State == EntityState.Added && entry.Entity is ICreatable c)
            {
                c.CreatedAt = now;
                c.CreatedById = userId;
            }
            if (entry.State is EntityState.Added or EntityState.Modified
                && entry.Entity is IUpdatable u)
            {
                u.UpdatedAt = now;
                u.UpdatedById = userId;
            }
        }

        return base.SavingChangesAsync(eventData, result, ct);
    }
}

// Înregistrare
builder.Services.AddDbContext<AppDbContext>((sp, o) =>
{
    o.UseSqlServer(conn);
    o.AddInterceptors(sp.GetRequiredService<AuditInterceptor>());
});
builder.Services.AddScoped<AuditInterceptor>();
\`\`\`

**Global Query Filters — Soft Delete transparent**

\`\`\`csharp
public class SoftDeletableEntity
{
    public bool IsDeleted { get; set; }
    public DateTime? DeletedAt { get; set; }
}

// În OnModelCreating — aplicat automat la TOATE query-urile pentru User
mb.Entity<User>().HasQueryFilter(u => !u.IsDeleted);
mb.Entity<Post>().HasQueryFilter(p => !p.IsDeleted);

// Acum DELETE devine soft-delete în serviciu:
public async Task DeleteUserAsync(int id)
{
    var user = await _db.Users.FindAsync(id)!;
    user.IsDeleted = true;
    user.DeletedAt = DateTime.UtcNow;
    await _db.SaveChangesAsync(); // UPDATE, nu DELETE
}

// Query normal ignoră automat utilizatorii șterși
var users = await _db.Users.ToListAsync(); // nu include IsDeleted = true

// Ignoră filtrul când ai nevoie (ex. admin, recovery)
var all = await _db.Users.IgnoreQueryFilters().ToListAsync();
\`\`\`

**Multi-Tenancy cu Global Query Filters**

\`\`\`csharp
// Fiecare tenant vede doar datele proprii
mb.Entity<Order>().HasQueryFilter(
    o => o.TenantId == _currentTenant.TenantId);
// Automat adăugat la orice query pe Orders
\`\`\`

• Interceptorii sunt injectați din DI — pot accesa orice serviciu din container
• Global Query Filters cu **IgnoreQueryFilters()** dezactivat pentru operații admin
• Soft delete transparent elimina logica duplicată de filtrare din fiecare repository`);

  console.log('Done.');
  await p.$disconnect();
}

run().catch(e => { console.error(e); p.$disconnect(); process.exit(1); });
