const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const tasks = [
  {
    slug: 'csharp-records-pattern',
    name: 'Records și Pattern Matching C#',
    question: 'Definește un record `Person(string Name, int Age)`. Folosește pattern matching pentru a clasifica vârsta: minor/adult/senior.',
    language: 'csharp',
    starterCode: 'using System;\n\nrecord Person(string Name, int Age);\n\nstring Classify(Person p) => p.Age switch {\n    < 18 => "minor",\n    < 65 => "adult",\n    _ => "senior"\n};\n\nvar people = new[] {\n    new Person("Alice", 15),\n    new Person("Bob", 35),\n    new Person("Carol", 70)\n};\n\nforeach (var p in people)\n    Console.WriteLine($"{p.Name}: {Classify(p)}");',
    expectedOutput: 'Alice: minor\nBob: adult\nCarol: senior',
  },
  {
    slug: 'csharp-generics',
    name: 'Generics în C#',
    question: 'Implementează un Stack generic `Stack<T>` cu operații Push, Pop, Peek și o proprietate Count. Testează cu int și string.',
    language: 'csharp',
    starterCode: 'using System;\nusing System.Collections.Generic;\n\nclass Stack<T> {\n    private List<T> items = new();\n    public void Push(T item) => items.Add(item);\n    public T Pop() {\n        if (items.Count == 0) throw new InvalidOperationException("Stack empty");\n        var item = items[items.Count - 1];\n        items.RemoveAt(items.Count - 1);\n        return item;\n    }\n    public T Peek() => items[items.Count - 1];\n    public int Count => items.Count;\n}\n\nvar stack = new Stack<int>();\nstack.Push(1); stack.Push(2); stack.Push(3);\nConsole.WriteLine($"Top: {stack.Peek()}");\nConsole.WriteLine($"Pop: {stack.Pop()}");\nConsole.WriteLine($"Count: {stack.Count}");',
    expectedOutput: 'Top: 3\nPop: 3\nCount: 2',
  },
  {
    slug: 'csharp-fisiere-io',
    name: 'File I/O în C#',
    question: 'Scrie un program C# care creează un fișier "output.txt" cu 3 linii, citește fișierul și afișează fiecare linie cu numărul său.',
    language: 'csharp',
    starterCode: 'using System;\nusing System.IO;\n\n// Scrie fișierul\nFile.WriteAllLines("output.txt", new[] { "Linia 1", "Linia 2", "Linia 3" });\n\n// Citește și afișează\nvar lines = File.ReadAllLines("output.txt");\nfor (int i = 0; i < lines.Length; i++)\n    Console.WriteLine($"{i+1}: {lines[i]}");',
    expectedOutput: '1: Linia 1\n2: Linia 2\n3: Linia 3',
  },
  {
    slug: 'csharp-delegates-events',
    name: 'Delegates și Events C#',
    question: 'Creează un sistem de event-uri: clasă Publisher cu un event `OnDataReceived`, și un Subscriber care se abonează și procesează datele.',
    language: 'csharp',
    starterCode: 'using System;\n\nclass Publisher {\n    public event Action<string> OnDataReceived;\n    public void Send(string data) => OnDataReceived?.Invoke(data);\n}\n\nclass Subscriber {\n    public void Handle(string data) => Console.WriteLine($"Received: {data}");\n}\n\nvar pub = new Publisher();\nvar sub = new Subscriber();\npub.OnDataReceived += sub.Handle;\npub.Send("Hello");\npub.Send("World");\npub.OnDataReceived -= sub.Handle;\npub.Send("Nu ajunge"); // subscriber detached',
    expectedOutput: 'Received: Hello\nReceived: World',
  },
  {
    slug: 'csharp-json',
    name: 'JSON cu System.Text.Json',
    question: 'Serializează o listă de produse (id, name, price) la JSON și deserializează-o înapoi. Afișează produsele deserializate.',
    language: 'csharp',
    starterCode: 'using System;\nusing System.Collections.Generic;\nusing System.Text.Json;\n\nrecord Product(int Id, string Name, double Price);\n\nvar products = new List<Product> {\n    new(1, "Laptop", 1200.0),\n    new(2, "Mouse", 50.0)\n};\n\nstring json = JsonSerializer.Serialize(products);\nConsole.WriteLine(json);\n\nvar deserialized = JsonSerializer.Deserialize<List<Product>>(json);\nforeach (var p in deserialized)\n    Console.WriteLine($"{p.Id}: {p.Name} - {p.Price} RON");',
    expectedOutput: '[{"Id":1,"Name":"Laptop","Price":1200},{"Id":2,"Name":"Mouse","Price":50}]\n1: Laptop - 1200 RON\n2: Mouse - 50 RON',
  },
  {
    slug: 'csharp-best-practices',
    name: 'Null safety și nullable C#',
    question: 'Demonstrează null safety în C# 8+: nullable reference types, null-conditional operator (?.), null-coalescing (??) și null-forgiving (!).',
    language: 'csharp',
    starterCode: 'using System;\n\n#nullable enable\n\nclass User {\n    public string Name { get; set; } = "";\n    public string? Email { get; set; } // nullable\n}\n\nUser? FindUser(int id) => id == 1 ? new User { Name = "Alice", Email = "alice@ex.com" } : null;\n\nvar user = FindUser(1);\nConsole.WriteLine(user?.Name ?? "Nu există"); // Alice\nConsole.WriteLine(user?.Email ?? "Fără email");\n\nuser = FindUser(99);\nConsole.WriteLine(user?.Name ?? "Nu există"); // Nu există',
    expectedOutput: 'Alice\nalice@ex.com\nNu există',
  },
  {
    slug: 'csharp-lesson-16',
    name: 'LINQ avansat',
    question: 'Folosind LINQ: grupează studenți după nota (A/B/C/D), calculează media per grupă, și afișează numărul de studenți per grupă.',
    language: 'csharp',
    starterCode: 'using System;\nusing System.Collections.Generic;\nusing System.Linq;\n\nvar students = new[] {\n    (Name: "Alice", Grade: 95), (Name: "Bob", Grade: 72),\n    (Name: "Carol", Grade: 88), (Name: "Dave", Grade: 61),\n    (Name: "Eve", Grade: 91), (Name: "Frank", Grade: 75)\n};\n\nstring LetterGrade(int g) => g >= 90 ? "A" : g >= 80 ? "B" : g >= 70 ? "C" : "D";\n\nvar grouped = students\n    .GroupBy(s => LetterGrade(s.Grade))\n    .OrderBy(g => g.Key);\n\nforeach (var g in grouped)\n    Console.WriteLine($"{g.Key}: {g.Count()} studenți, medie {g.Average(s => s.Grade):F1}");',
    expectedOutput: 'A: 2 studenți, medie 93.0\nB: 1 studenți, medie 88.0\nC: 2 studenți, medie 73.5\nD: 1 studenți, medie 61.0',
  },
  {
    slug: 'csharp-lesson-17',
    name: 'Async/Await în C#',
    question: 'Implementează un serviciu async care simulează fetch-ul de date cu delay. Rulează 3 request-uri în paralel cu Task.WhenAll.',
    language: 'csharp',
    starterCode: 'using System;\nusing System.Threading.Tasks;\n\nasync Task<string> FetchData(int id) {\n    await Task.Delay(100); // simuleaza delay retea\n    return $"Data-{id}";\n}\n\nasync Task Main() {\n    var tasks = new[] { FetchData(1), FetchData(2), FetchData(3) };\n    var results = await Task.WhenAll(tasks);\n    foreach (var r in results) Console.WriteLine(r);\n}\n\nawait Main();',
    expectedOutput: 'Data-1\nData-2\nData-3',
  },
  {
    slug: 'csharp-lesson-18',
    name: 'Interface și Dependency Injection',
    question: 'Definește interfața IRepository<T> cu GetById, GetAll, Add. Implementeaz-o ca InMemoryRepository<T>. Folosește DI simplu.',
    language: 'csharp',
    starterCode: 'using System;\nusing System.Collections.Generic;\n\ninterface IRepository<T> where T : class {\n    T GetById(int id);\n    IEnumerable<T> GetAll();\n    void Add(T item);\n}\n\nrecord User(int Id, string Name);\n\nclass InMemoryRepository<T> : IRepository<T> where T : class {\n    private Dictionary<int, T> store = new();\n    private int nextId = 1;\n    public T GetById(int id) => store.TryGetValue(id, out var v) ? v : null;\n    public IEnumerable<T> GetAll() => store.Values;\n    public void Add(T item) { store[nextId++] = item; }\n}\n\nIRepository<User> repo = new InMemoryRepository<User>();\nrepo.Add(new User(1, "Alice"));\nrepo.Add(new User(2, "Bob"));\nforeach (var u in repo.GetAll()) Console.WriteLine(u.Name);',
    expectedOutput: 'Alice\nBob',
  },
  {
    slug: 'csharp-lesson-19',
    name: 'Extension Methods',
    question: 'Scrie extension methods pentru string: IsEmail(), ToPascalCase(), Truncate(maxLen). Testează pe exemple concrete.',
    language: 'csharp',
    starterCode: 'using System;\nusing System.Linq;\n\nstatic class StringExtensions {\n    public static bool IsEmail(this string s) => s.Contains("@") && s.Contains(".");\n    public static string ToPascalCase(this string s) => \n        string.Join("", s.Split(\' \').Select(w => char.ToUpper(w[0]) + w[1..].ToLower()));\n    public static string Truncate(this string s, int max) =>\n        s.Length <= max ? s : s[..max] + "...";\n}\n\nConsole.WriteLine("test@email.com".IsEmail());\nConsole.WriteLine("invalid".IsEmail());\nConsole.WriteLine("hello world foo".ToPascalCase());\nConsole.WriteLine("Un text mai lung".Truncate(8));',
    expectedOutput: 'True\nFalse\nHelloWorldFoo\nUn text ...',
  },
  {
    slug: 'csharp-lesson-20',
    name: 'Design Pattern: Observer',
    question: 'Implementează Observer pattern în C# folosind IObservable<T> și IObserver<T> sau manual. Simulează un stock price tracker.',
    language: 'csharp',
    starterCode: 'using System;\nusing System.Collections.Generic;\n\ninterface IStockObserver { void Update(string stock, double price); }\n\nclass StockTracker {\n    private List<IStockObserver> observers = new();\n    public void Subscribe(IStockObserver o) => observers.Add(o);\n    public void SetPrice(string stock, double price) {\n        foreach (var o in observers) o.Update(stock, price);\n    }\n}\n\nclass PriceLogger : IStockObserver {\n    public void Update(string s, double p) => Console.WriteLine($"{s}: {p:F2}");\n}\n\nclass AlertSystem : IStockObserver {\n    public void Update(string s, double p) { if (p > 200) Console.WriteLine($"ALERT: {s} > 200!"); }\n}\n\nvar tracker = new StockTracker();\ntracker.Subscribe(new PriceLogger());\ntracker.Subscribe(new AlertSystem());\ntracker.SetPrice("AAPL", 175.5);\ntracker.SetPrice("GOOGL", 210.0);',
    expectedOutput: 'AAPL: 175.50\nGOOGL: 210.00\nALERT: GOOGL > 200!',
  },
  {
    slug: 'csharp-lesson-21',
    name: 'ASP.NET Core Minimal API',
    question: 'Scrie o Minimal API ASP.NET Core cu endpoints: GET /products (lista), GET /products/{id}, POST /products. Folosește in-memory storage.',
    language: 'csharp',
    starterCode: '// Program.cs\nusing Microsoft.AspNetCore.Builder;\nusing Microsoft.AspNetCore.Http;\n\nvar builder = WebApplication.CreateBuilder();\nvar app = builder.Build();\n\nvar products = new List<(int Id, string Name, double Price)> {\n    (1, "Laptop", 1200), (2, "Mouse", 50)\n};\n\napp.MapGet("/products", () => products);\napp.MapGet("/products/{id:int}", (int id) =>\n    products.FirstOrDefault(p => p.Id == id) is var p && p.Id > 0\n        ? Results.Ok(p) : Results.NotFound());\napp.MapPost("/products", (dynamic body) => {\n    var product = (products.Count + 1, body.name, body.price);\n    products.Add(product);\n    return Results.Created($"/products/{product.Item1}", product);\n});\n\napp.Run();',
    expectedOutput: '',
  },
  {
    slug: 'csharp-lesson-22',
    name: 'Entity Framework Core',
    question: 'Scrie un DbContext pentru o aplicație de blog cu entitățile Post și Comment. Adaugă relația one-to-many și o interogare LINQ.',
    language: 'csharp',
    starterCode: 'using Microsoft.EntityFrameworkCore;\n\npublic class Post {\n    public int Id { get; set; }\n    public string Title { get; set; } = "";\n    public string Content { get; set; } = "";\n    public List<Comment> Comments { get; set; } = new();\n}\n\npublic class Comment {\n    public int Id { get; set; }\n    public string Text { get; set; } = "";\n    public int PostId { get; set; }\n    public Post Post { get; set; } = null!;\n}\n\npublic class BlogContext : DbContext {\n    public DbSet<Post> Posts => Set<Post>();\n    public DbSet<Comment> Comments => Set<Comment>();\n    \n    // Interogare: posts cu mai mult de 2 comentarii\n    // var active = context.Posts.Include(p => p.Comments)\n    //     .Where(p => p.Comments.Count > 2).ToList();\n}',
    expectedOutput: '',
  },
  {
    slug: 'csharp-lesson-23',
    name: 'Unit Testing cu xUnit',
    question: 'Scrie teste xUnit pentru o clasă Calculator cu metode Add, Subtract, Multiply, Divide (throw la div/0). Include Theory cu InlineData.',
    language: 'csharp',
    starterCode: 'using System;\nusing Xunit;\n\npublic class Calculator {\n    public double Add(double a, double b) => a + b;\n    public double Subtract(double a, double b) => a - b;\n    public double Multiply(double a, double b) => a * b;\n    public double Divide(double a, double b) {\n        if (b == 0) throw new DivideByZeroException();\n        return a / b;\n    }\n}\n\npublic class CalculatorTests {\n    private readonly Calculator calc = new();\n    \n    [Theory]\n    [InlineData(2, 3, 5)]\n    [InlineData(-1, 1, 0)]\n    [InlineData(0, 0, 0)]\n    public void Add_ReturnsSum(double a, double b, double expected) =>\n        Assert.Equal(expected, calc.Add(a, b));\n    \n    [Fact]\n    public void Divide_ByZero_Throws() =>\n        Assert.Throws<DivideByZeroException>(() => calc.Divide(5, 0));\n}',
    expectedOutput: '',
  },
  {
    slug: 'csharp-lesson-24',
    name: 'SignalR pentru Real-time',
    question: 'Scrie un Hub SignalR pentru un chat room: clienții pot trimite mesaje, serverul broadcastează tuturor.',
    language: 'csharp',
    starterCode: 'using Microsoft.AspNetCore.SignalR;\n\npublic class ChatHub : Hub {\n    public async Task SendMessage(string user, string message) {\n        await Clients.All.SendAsync("ReceiveMessage", user, message);\n    }\n    \n    public override async Task OnConnectedAsync() {\n        await Clients.All.SendAsync("ReceiveMessage", "System", $"{Context.ConnectionId} s-a conectat");\n        await base.OnConnectedAsync();\n    }\n    \n    public override async Task OnDisconnectedAsync(Exception? ex) {\n        await Clients.All.SendAsync("ReceiveMessage", "System", $"{Context.ConnectionId} s-a deconectat");\n        await base.OnDisconnectedAsync(ex);\n    }\n}\n\n// Program.cs\n// builder.Services.AddSignalR();\n// app.MapHub<ChatHub>("/chatHub");',
    expectedOutput: '',
  },
  {
    slug: 'csharp-lesson-25',
    name: 'Middleware ASP.NET Core',
    question: 'Scrie un middleware ASP.NET Core care logează request-urile (method, path, status, timp) și adaugă un header X-Request-Id.',
    language: 'csharp',
    starterCode: 'using System;\nusing System.Diagnostics;\nusing Microsoft.AspNetCore.Http;\n\npublic class LoggingMiddleware {\n    private readonly RequestDelegate _next;\n    public LoggingMiddleware(RequestDelegate next) => _next = next;\n    \n    public async Task InvokeAsync(HttpContext ctx) {\n        var sw = Stopwatch.StartNew();\n        var requestId = Guid.NewGuid().ToString()[..8];\n        ctx.Response.Headers["X-Request-Id"] = requestId;\n        \n        Console.WriteLine($"[{requestId}] {ctx.Request.Method} {ctx.Request.Path}");\n        await _next(ctx);\n        sw.Stop();\n        Console.WriteLine($"[{requestId}] {ctx.Response.StatusCode} in {sw.ElapsedMilliseconds}ms");\n    }\n}\n\n// Înregistrare: app.UseMiddleware<LoggingMiddleware>();',
    expectedOutput: '',
  },
  {
    slug: 'csharp-signalr-realtime',
    name: 'Real-time dashboard cu SignalR',
    question: 'Scrie un service care trimite live updates (metrics de sistem) la toate clienții SignalR conectați la fiecare secundă.',
    language: 'csharp',
    starterCode: 'using System;\nusing System.Threading;\nusing System.Threading.Tasks;\nusing Microsoft.AspNetCore.SignalR;\n\npublic class MetricsHub : Hub { }\n\npublic class MetricsService : IHostedService {\n    private readonly IHubContext<MetricsHub> _hub;\n    private Timer? _timer;\n    \n    public MetricsService(IHubContext<MetricsHub> hub) => _hub = hub;\n    \n    public Task StartAsync(CancellationToken ct) {\n        _timer = new Timer(SendMetrics, null, 0, 1000);\n        return Task.CompletedTask;\n    }\n    \n    private async void SendMetrics(object? state) {\n        await _hub.Clients.All.SendAsync("MetricsUpdate", new {\n            Timestamp = DateTime.UtcNow,\n            CpuUsage = new Random().NextDouble() * 100,\n            MemoryMB = Environment.WorkingSet / (1024 * 1024)\n        });\n    }\n    \n    public Task StopAsync(CancellationToken ct) { _timer?.Dispose(); return Task.CompletedTask; }\n}',
    expectedOutput: '',
  },
  {
    slug: 'csharp-grpc-dotnet',
    name: 'gRPC service în C#',
    question: 'Definește un serviciu gRPC pentru un calculator: proto file cu RPC Add și Multiply, și implementarea serverului.',
    language: 'csharp',
    starterCode: '// calculator.proto\n// syntax = "proto3";\n// service Calculator {\n//   rpc Add (BinaryRequest) returns (NumberReply);\n//   rpc Multiply (BinaryRequest) returns (NumberReply);\n// }\n// message BinaryRequest { double a = 1; double b = 2; }\n// message NumberReply { double result = 1; }\n\n// CalculatorService.cs\nusing Grpc.Core;\n\npublic class CalculatorService : Calculator.CalculatorBase {\n    public override Task<NumberReply> Add(BinaryRequest req, ServerCallContext ctx)\n        => Task.FromResult(new NumberReply { Result = req.A + req.B });\n    \n    public override Task<NumberReply> Multiply(BinaryRequest req, ServerCallContext ctx)\n        => Task.FromResult(new NumberReply { Result = req.A * req.B });\n}',
    expectedOutput: '',
  },
  {
    slug: 'csharp-blazor-webassembly',
    name: 'Blazor WebAssembly component',
    question: 'Scrie un component Blazor Counter cu: un afișaj pentru count, buton increment, buton decrement, și un buton reset. Adaugă validare: count >= 0.',
    language: 'csharp',
    starterCode: '@page "/counter"\n\n<h3>Counter: @count</h3>\n\n<button @onclick="Increment" class="btn btn-primary">+</button>\n<button @onclick="Decrement" class="btn btn-secondary" disabled="@(count <= 0)">-</button>\n<button @onclick="Reset" class="btn btn-danger">Reset</button>\n\n@code {\n    private int count = 0;\n    \n    private void Increment() => count++;\n    private void Decrement() { if (count > 0) count--; }\n    private void Reset() => count = 0;\n}',
    expectedOutput: '',
  },
  {
    slug: 'csharp-ef-core-advanced',
    name: 'EF Core avansat: migrations și seeding',
    question: 'Scrie un DbContext cu migrations și seed data. Include o configurație Fluent API pentru o relație many-to-many.',
    language: 'csharp',
    starterCode: 'using Microsoft.EntityFrameworkCore;\n\npublic class Student { public int Id {get;set;} public string Name {get;set;}=\'\'; public List<Course> Courses {get;set;} = new(); }\npublic class Course { public int Id {get;set;} public string Title {get;set;}=\'\'; public List<Student> Students {get;set;} = new(); }\n\npublic class SchoolContext : DbContext {\n    public DbSet<Student> Students => Set<Student>();\n    public DbSet<Course> Courses => Set<Course>();\n    \n    protected override void OnModelCreating(ModelBuilder mb) {\n        mb.Entity<Student>().HasMany(s => s.Courses).WithMany(c => c.Students)\n          .UsingEntity(j => j.ToTable("StudentCourses"));\n        \n        mb.Entity<Student>().HasData(new Student { Id=1, Name="Alice" });\n        mb.Entity<Course>().HasData(new Course { Id=1, Title="C# Advanced" });\n    }\n}',
    expectedOutput: '',
  },
  {
    slug: 'csharp-aspnet-identity',
    name: 'ASP.NET Core Identity',
    question: 'Configurează ASP.NET Core Identity cu parole custom policies, claims, și un endpoint de register/login.',
    language: 'csharp',
    starterCode: 'using Microsoft.AspNetCore.Identity;\nusing Microsoft.Extensions.DependencyInjection;\n\n// Program.cs configurare\nvar builder = WebApplication.CreateBuilder();\n\nbuilder.Services.AddIdentityCore<IdentityUser>(options => {\n    options.Password.RequiredLength = 8;\n    options.Password.RequireDigit = true;\n    options.Password.RequireUppercase = false;\n    options.User.RequireUniqueEmail = true;\n    options.SignIn.RequireConfirmedEmail = false;\n})\n.AddEntityFrameworkStores<ApplicationDbContext>()\n.AddDefaultTokenProviders();\n\n// Endpoint register\n// app.MapPost("/register", async (RegisterDto dto, UserManager<IdentityUser> um) => {\n//     var user = new IdentityUser { UserName = dto.Email, Email = dto.Email };\n//     var result = await um.CreateAsync(user, dto.Password);\n//     return result.Succeeded ? Results.Ok() : Results.BadRequest(result.Errors);\n// });',
    expectedOutput: '',
  },
];

async function main() {
  console.log('Adăugare coding tasks C# (remaining)...');
  let added = 0, skipped = 0;
  for (const t of tasks) {
    const lesson = await prisma.lesson.findFirst({ where: { slug: t.slug } });
    if (!lesson) { console.log(`  [skip] ${t.slug} — nu există`); skipped++; continue; }
    const existing = await prisma.task.findFirst({ where: { lessonId: lesson.id, type: 'coding' } });
    if (existing) { console.log(`  [skip] ${t.slug} — are deja coding`); skipped++; continue; }
    const maxTask = await prisma.task.findFirst({ where: { lessonId: lesson.id }, orderBy: { number: 'desc' } });
    const n = (maxTask?.number ?? 0) + 1;
    await prisma.task.create({
      data: {
        lessonId: lesson.id, number: n,
        name: t.name, question: t.question,
        options: [], answer: '',
        explanation: '',
        difficulty: 'medium',
        type: 'coding', language: t.language,
        starterCode: t.starterCode || '',
        expectedOutput: t.expectedOutput || '',
      },
    });
    console.log(`  [ok] ${t.slug}`);
    added++;
  }
  console.log(`\nGata: ${added} adăugate, ${skipped} sărite.`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
