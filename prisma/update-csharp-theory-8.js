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

await up('31. SignalR', 'Groups', `**Groups și notificările selective** în SignalR permit trimiterea mesajelor doar unui subset de clienți — o cameră de chat, un proiect, un utilizator specific — fără a difuza la toți cei conectați.

**Managementul grupurilor**

\`\`\`csharp
public class ProjectHub : Hub<IProjectClient>
{
    // Clientul se alătură grupului unui proiect
    public async Task JoinProject(string projectId)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, projectId);
        await Clients.Group(projectId).UserJoined(Context.User?.Identity?.Name ?? "Anonim");
    }

    // Clientul părăsește grupul
    public async Task LeaveProject(string projectId)
    {
        await Groups.RemoveFromGroupAsync(Context.ConnectionId, projectId);
        await Clients.Group(projectId).UserLeft(Context.User?.Identity?.Name ?? "Anonim");
    }

    // Trimite update doar membrilor proiectului
    public async Task SendProjectUpdate(string projectId, string update)
    {
        // Toți cei din grup, inclusiv apelantul
        await Clients.Group(projectId).ReceiveUpdate(projectId, update);

        // Toți din grup, EXCEPT apelantul
        await Clients.OthersInGroup(projectId).ReceiveUpdate(projectId, update);
    }
}
\`\`\`

**Trimitere la utilizator specific după UserId**

\`\`\`csharp
// SignalR mapează automat ConnectionId → UserId când ești autentificat
public async Task SendPrivateMessage(string recipientUserId, string message)
{
    // Trimite la toate conexiunile unui utilizator (poate fi deschis pe mai multe tab-uri)
    await Clients.User(recipientUserId).ReceivePrivateMessage(
        Context.User!.Identity!.Name!, message);
}
\`\`\`

**Grupuri persistente — cameră de chat cu istoric**

\`\`\`csharp
public class ChatHub : Hub<IChatClient>
{
    private readonly IChatService _chat;
    private readonly static Dictionary<string, HashSet<string>> _rooms = new();

    public async Task JoinRoom(string roomId)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, $"room:{roomId}");

        // Trimite istoricul ultimelor 50 mesaje noului participant
        var history = await _chat.GetMessagesAsync(roomId, count: 50);
        await Clients.Caller.LoadHistory(history);

        // Notifică restul camerei
        await Clients.OthersInGroup($"room:{roomId}")
            .UserJoined(Context.User?.Identity?.Name ?? "Anonim");
    }

    public async Task SendToRoom(string roomId, string message)
    {
        var saved = await _chat.SaveMessageAsync(roomId, Context.User!.Identity!.Name!, message);
        await Clients.Group($"room:{roomId}").ReceiveMessage(saved);
    }
}
\`\`\`

**Client JavaScript cu reconectare automată**

\`\`\`javascript
const conn = new signalR.HubConnectionBuilder()
    .withUrl("/hubs/chat", {
        accessTokenFactory: () => localStorage.getItem("jwt_token")
    })
    .withAutomaticReconnect([0, 2000, 5000, 10000]) // delays în ms
    .build();

conn.onreconnecting(err => console.log("Reconectare...", err));
conn.onreconnected(id => console.log("Reconectat:", id));
conn.onclose(err => console.log("Conexiune închisă:", err));

// Alătură-te camerei după conectare
conn.on("ReceiveMessage", (msg) => addMessageToUI(msg));
await conn.start();
await conn.invoke("JoinRoom", "proiect-123");
\`\`\`

• Grupurile sunt **in-memory** — la restart server, toți utilizatorii trebuie să se realăture
• Folosește **Redis backplane** pentru scalare horizontală (mai multe instanțe server)
• **Clients.User(userId)** necesită autentificare — configurează JWT sau cookie auth`);

await up('31. SignalR', 'Client JavaScript', `**Clientul JavaScript SignalR** este SDK-ul care rulează în browser și comunică cu Hub-ul de pe server — gestionând conectarea, reconectarea, trimiterea și primirea mesajelor în timp real.

**Instalare și setup**

\`\`\`bash
npm install @microsoft/signalr
# sau CDN:
# <script src="https://cdnjs.cloudflare.com/ajax/libs/microsoft-signalr/7.0.0/signalr.min.js">
\`\`\`

\`\`\`javascript
import * as signalR from "@microsoft/signalr";

// Construiește conexiunea
const connection = new signalR.HubConnectionBuilder()
    .withUrl("/hubs/notifications", {
        // Tipuri de transport (implicit: toate în ordine)
        transport: signalR.HttpTransportType.WebSockets |
                   signalR.HttpTransportType.ServerSentEvents,
        // Token JWT
        accessTokenFactory: () => getAuthToken(),
        // Logare în consolă (dezactivează în producție)
        logger: signalR.LogLevel.Information
    })
    .withAutomaticReconnect({
        nextRetryDelayInMilliseconds: retryContext => {
            if (retryContext.elapsedMilliseconds < 60000) return 2000;
            return null; // oprește reconectarea după 1 minut
        }
    })
    .build();
\`\`\`

**Ascultarea evenimentelor de la server**

\`\`\`javascript
// Registrează handlere ÎNAINTE de connection.start()
connection.on("ReceiveMessage", (user, message, timestamp) => {
    const li = document.createElement("li");
    li.textContent = \`[\${new Date(timestamp).toLocaleTimeString()}] \${user}: \${message}\`;
    document.getElementById("messages").appendChild(li);
});

connection.on("UserJoined", (username) => {
    console.log(\`\${username} s-a alăturat\`);
});

// Handler unic — se dezregistrează după primul apel
connection.once("ConnectionEstablished", (id) => {
    console.log("ID conexiune:", id);
});

// Pornire
await connection.start();
console.log("Conectat cu ID:", connection.connectionId);
\`\`\`

**Trimiterea mesajelor la server**

\`\`\`javascript
// Apel simplu — fire and forget
await connection.send("SendMessage", username, messageText);

// Apel cu rezultat returnat de server
const result = await connection.invoke("GetRoomUsers", "room-123");
console.log("Utilizatori online:", result);

// Streaming de date de pe server
const stream = connection.stream("GetLiveData", 100);
stream.subscribe({
    next: (item) => console.log("Item:", item),
    complete: () => console.log("Stream terminat"),
    error: (err) => console.error("Eroare stream:", err)
});
\`\`\`

• **send()** — fără confirmare/rezultat; **invoke()** — cu Promise și rezultat returnat
• Dezregistrează handler-ele cu **connection.off("EventName")** când nu mai ai nevoie
• Testează comportamentul la reconectare — este esențial pentru UX în aplicații real-time`);

await up('31. SignalR', 'IHubContext', `**IHubContext și scalabilitatea cu Redis** permit trimiterea de mesaje SignalR din afara Hub-ului (din servicii, background jobs) și scalarea la mai multe instanțe server prin Redis backplane.

**IHubContext — trimite mesaje din servicii**

\`\`\`csharp
// Injectezi IHubContext oriunde ai nevoie să trimiți notificări
public class OrderService
{
    private readonly IHubContext<NotificationHub, INotificationClient> _hub;
    private readonly IOrderRepository _repo;

    public OrderService(
        IHubContext<NotificationHub, INotificationClient> hub,
        IOrderRepository repo)
    {
        _hub = hub;
        _repo = repo;
    }

    public async Task ProcessOrderAsync(int orderId)
    {
        var order = await _repo.GetByIdAsync(orderId);
        // Procesare...
        await _repo.MarkCompletedAsync(orderId);

        // Notifică DIRECT utilizatorul — fără că acesta să fi apelat hub-ul
        await _hub.Clients.User(order.UserId.ToString())
            .ReceiveOrderUpdate(orderId, "Comandă procesată cu succes!");

        // Sau notifică un grup
        await _hub.Clients.Group($"order:{orderId}")
            .ReceiveOrderUpdate(orderId, "Status actualizat");
    }
}
\`\`\`

**Background Service cu SignalR**

\`\`\`csharp
public class StockPriceService : BackgroundService
{
    private readonly IHubContext<StockHub> _hub;

    public StockPriceService(IHubContext<StockHub> hub) => _hub = hub;

    protected override async Task ExecuteAsync(CancellationToken ct)
    {
        while (!ct.IsCancellationRequested)
        {
            var prices = await FetchLatestPricesAsync();

            // Trimite la toți clienții la fiecare 5 secunde
            await _hub.Clients.All.SendAsync("UpdatePrices", prices, ct);
            await Task.Delay(5000, ct);
        }
    }
}

// Înregistrare
builder.Services.AddHostedService<StockPriceService>();
\`\`\`

**Redis Backplane — scalare horizontală**

\`\`\`csharp
// Fără Redis: fiecare server știe doar despre conexiunile PROPRII
// Cu Redis: mesajele sunt distribuite tuturor serverelor

// Instalare: dotnet add package Microsoft.AspNetCore.SignalR.StackExchangeRedis
builder.Services.AddSignalR()
    .AddStackExchangeRedis("localhost:6379", options =>
    {
        options.Configuration.ChannelPrefix = RedisChannel.Literal("myapp");
    });

// Acum 3 instanțe server pot trimite mesaje la orice client
// Util pentru deployment cu load balancer și sticky sessions
\`\`\`

• **IHubContext** e Singleton — poate fi injectat oriunde, oricând
• Redis backplane necesită și **sticky sessions** (sau connection affinity) la load balancer
• Pentru producție cu mulți utilizatori, evaluează și **Azure SignalR Service** — backplane managed`);

await up('32. gRPC cu .NET', 'gRPC si Protocol Buffers', `**gRPC** este un framework RPC modern dezvoltat de Google, care folosește **Protocol Buffers** (protobuf) pentru serializare binară și HTTP/2 pentru transport — rezultând API-uri mult mai rapide și eficiente decât REST+JSON.

**De ce gRPC față de REST?**

• **Performanță**: protobuf binar e de 3-10x mai mic și mai rapid decât JSON
• **Type safety**: contractul e definit în .proto, codul e generat automat pentru toate limbajele
• **Streaming**: suportă server streaming, client streaming și bidirectional streaming
• **Perfecte** pentru microservicii, sisteme embedded, comunicare intra-cluster

**Definirea contractului — fișierul .proto**

\`\`\`proto
syntax = "proto3";

option csharp_namespace = "MyApp.Grpc";

package tasks;

service TaskService {
    rpc GetTask (GetTaskRequest) returns (TaskReply);
    rpc CreateTask (CreateTaskRequest) returns (TaskReply);
    rpc ListTasks (ListTasksRequest) returns (stream TaskReply);
    rpc WatchTasks (WatchRequest) returns (stream TaskUpdate);
}

message GetTaskRequest { int32 id = 1; }

message CreateTaskRequest {
    string title = 1;
    string description = 2;
    int32 priority = 3;
}

message TaskReply {
    int32 id = 1;
    string title = 2;
    bool is_completed = 3;
    int64 created_at_unix = 4;
}

message ListTasksRequest { bool only_active = 1; }
message WatchRequest {}
message TaskUpdate { TaskReply task = 1; string event_type = 2; }
\`\`\`

**Setup în ASP.NET Core**

\`\`\`bash
dotnet add package Grpc.AspNetCore
# Adaugă fișierul .proto și incluzi în .csproj
\`\`\`

\`\`\`xml
<ItemGroup>
    <Protobuf Include="Protos/tasks.proto" GrpcServices="Server" />
</ItemGroup>
\`\`\`

\`\`\`csharp
// Program.cs
builder.Services.AddGrpc();
app.MapGrpcService<TaskGrpcService>();
\`\`\`

**Tipurile de mesaje protobuf**

• **int32, int64, float, double, bool, string, bytes** — tipuri scalare
• **repeated** — echivalent array/list: repeated string tags = 5;
• **optional** — câmp care poate lipsi (implicit în proto3 pentru scalare)
• **oneof** — exact un câmp din grup poate fi setat
• Numerele câmpurilor (= 1, = 2) sunt permanente — nu le modifica după deployment!`);

await up('32. gRPC cu .NET', 'Implementarea serverului gRPC', `**Implementarea serverului gRPC** în ASP.NET Core constă în crearea unei clase care moștenește din serviciul generat de compilatorul protobuf și implementează metodele definite în contractul .proto.

**Server Unary (request-response)**

\`\`\`csharp
// Services/TaskGrpcService.cs
public class TaskGrpcService : TaskService.TaskServiceBase
{
    private readonly ITaskRepository _repo;
    private readonly ILogger<TaskGrpcService> _logger;

    public TaskGrpcService(ITaskRepository repo, ILogger<TaskGrpcService> logger)
    {
        _repo = repo; _logger = logger;
    }

    public override async Task<TaskReply> GetTask(
        GetTaskRequest request, ServerCallContext context)
    {
        _logger.LogInformation("gRPC GetTask {Id}", request.Id);

        var task = await _repo.GetByIdAsync(request.Id)
            ?? throw new RpcException(new Status(StatusCode.NotFound,
                $"Task {request.Id} nu există"));

        return new TaskReply
        {
            Id = task.Id,
            Title = task.Title,
            IsCompleted = task.IsCompleted,
            CreatedAtUnix = ((DateTimeOffset)task.CreatedAt).ToUnixTimeSeconds()
        };
    }

    public override async Task<TaskReply> CreateTask(
        CreateTaskRequest request, ServerCallContext context)
    {
        if (string.IsNullOrWhiteSpace(request.Title))
            throw new RpcException(new Status(StatusCode.InvalidArgument,
                "Titlul este obligatoriu"));

        var task = await _repo.CreateAsync(new TaskItem
        {
            Title = request.Title,
            Description = request.Description,
            Priority = request.Priority
        });

        return MapToReply(task);
    }

    // Server Streaming — returnează mai multe mesaje
    public override async Task ListTasks(
        ListTasksRequest request,
        IServerStreamWriter<TaskReply> responseStream,
        ServerCallContext context)
    {
        var tasks = await _repo.GetAllAsync(request.OnlyActive);

        foreach (var task in tasks)
        {
            // Verifică dacă clientul a anulat cererea
            context.CancellationToken.ThrowIfCancellationRequested();

            await responseStream.WriteAsync(MapToReply(task));
            await Task.Delay(10); // simulare procesare
        }
    }

    private static TaskReply MapToReply(TaskItem t) => new()
    {
        Id = t.Id, Title = t.Title, IsCompleted = t.IsCompleted,
        CreatedAtUnix = ((DateTimeOffset)t.CreatedAt).ToUnixTimeSeconds()
    };
}
\`\`\`

**Coduri de status gRPC**

\`\`\`csharp
StatusCode.OK             // 0 — succes
StatusCode.NotFound       // 5 — resursă inexistentă
StatusCode.InvalidArgument // 3 — date invalide
StatusCode.PermissionDenied // 7 — acces interzis
StatusCode.Internal       // 13 — eroare server
StatusCode.Unauthenticated // 16 — neautentificat
StatusCode.ResourceExhausted // 8 — rate limit depășit
\`\`\`

• Codurile de status gRPC se mapează pe HTTP status codes la gateway
• Folosește **deadline** (timeout) în context: context.Deadline
• **Metadata** = echivalentul HTTP headers în gRPC`);

await up('32. gRPC cu .NET', 'Client gRPC', `**Clientul gRPC în .NET** folosește același fișier .proto ca serverul — compilatorul generează automat clasele client, deci nu există discrepanțe între client și server.

**Setup client gRPC**

\`\`\`bash
dotnet add package Grpc.Net.Client
dotnet add package Grpc.Tools
dotnet add package Google.Protobuf
\`\`\`

\`\`\`xml
<!-- .csproj — include proto cu generare client -->
<ItemGroup>
    <Protobuf Include="Protos/tasks.proto" GrpcServices="Client" />
</ItemGroup>
\`\`\`

**Client Unary — cerere simplă**

\`\`\`csharp
using var channel = GrpcChannel.ForAddress("https://localhost:5001");
var client = new TaskService.TaskServiceClient(channel);

// Apel simplu
var task = await client.GetTaskAsync(new GetTaskRequest { Id = 1 });
Console.WriteLine($"Task: {task.Title}, Completat: {task.IsCompleted}");

// Cu timeout și cancellation
using var cts = new CancellationTokenSource(TimeSpan.FromSeconds(5));
var reply = await client.CreateTaskAsync(
    new CreateTaskRequest { Title = "Task nou", Priority = 2 },
    deadline: DateTime.UtcNow.AddSeconds(5),
    cancellationToken: cts.Token);
\`\`\`

**Client Streaming — procesare flux de date**

\`\`\`csharp
// Citire server streaming
using var call = client.ListTasks(new ListTasksRequest { OnlyActive = true });

await foreach (var task in call.ResponseStream.ReadAllAsync())
{
    Console.WriteLine($"  [{task.Id}] {task.Title}");
}

// Client streaming — trimite mai multe mesaje la server
using var clientStream = client.BatchCreate();
foreach (var title in titles)
{
    await clientStream.RequestStream.WriteAsync(
        new CreateTaskRequest { Title = title });
}
await clientStream.RequestStream.CompleteAsync();
var result = await clientStream; // răspunsul final
\`\`\`

**Injectare în ASP.NET Core cu HttpClientFactory**

\`\`\`csharp
// Program.cs — client tipizat, reutilizabil
builder.Services.AddGrpcClient<TaskService.TaskServiceClient>(o =>
{
    o.Address = new Uri("https://task-service:5001");
})
.ConfigureChannel(o =>
{
    o.HttpHandler = new SocketsHttpHandler
    {
        KeepAlivePingDelay = TimeSpan.FromSeconds(60),
        EnableMultipleHttp2Connections = true
    };
});

// Injectare în controller
public class ApiController : ControllerBase
{
    private readonly TaskService.TaskServiceClient _grpcClient;
    public ApiController(TaskService.TaskServiceClient client) => _grpcClient = client;
}
\`\`\`

• Reutilizează **GrpcChannel** — este thread-safe și costisitor de creat
• HTTP/2 necesită **HTTPS** (excepție: loopback localhost)
• Folosește **gRPC-Web** pentru clienți browser — HTTP/2 nu e suportat direct în fetch API`);

  console.log('Done.');
  await p.$disconnect();
}

run().catch(e => { console.error(e); p.$disconnect(); process.exit(1); });
