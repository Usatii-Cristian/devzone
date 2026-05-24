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

await up('32. gRPC cu .NET', 'Interceptori', `**Interceptorii gRPC** sunt middleware-ul specific gRPC — permit logare, autentificare, retry logic și tratarea erorilor cross-cutting fără a modifica implementarea fiecărei metode.

**Interceptor pe server**

\`\`\`csharp
public class LoggingInterceptor : Interceptor
{
    private readonly ILogger<LoggingInterceptor> _logger;
    public LoggingInterceptor(ILogger<LoggingInterceptor> logger) => _logger = logger;

    // Interceptează apeluri unary (request-response)
    public override async Task<TResponse> UnaryServerHandler<TRequest, TResponse>(
        TRequest request,
        ServerCallContext context,
        UnaryServerMethod<TRequest, TResponse> continuation)
    {
        var method = context.Method;
        _logger.LogInformation("gRPC {Method} START", method);
        var sw = System.Diagnostics.Stopwatch.StartNew();

        try
        {
            var response = await continuation(request, context);
            _logger.LogInformation("gRPC {Method} OK în {Ms}ms", method, sw.ElapsedMilliseconds);
            return response;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "gRPC {Method} FAILED în {Ms}ms", method, sw.ElapsedMilliseconds);
            throw;
        }
    }

    // Interceptează server streaming
    public override Task ServerStreamingServerHandler<TRequest, TResponse>(
        TRequest request,
        IServerStreamWriter<TResponse> responseStream,
        ServerCallContext context,
        ServerStreamingServerMethod<TRequest, TResponse> continuation)
    {
        _logger.LogInformation("gRPC streaming {Method} START", context.Method);
        return continuation(request, responseStream, context);
    }
}

// Înregistrare
builder.Services.AddGrpc(options =>
{
    options.Interceptors.Add<LoggingInterceptor>();
});
\`\`\`

**Autentificare JWT în gRPC**

\`\`\`csharp
// Interceptor de autentificare pe client
public class AuthInterceptor : Interceptor
{
    private readonly ITokenProvider _tokenProvider;
    public AuthInterceptor(ITokenProvider tp) => _tokenProvider = tp;

    public override AsyncUnaryCall<TResponse> AsyncUnaryCall<TRequest, TResponse>(
        TRequest request, ClientInterceptorContext<TRequest, TResponse> context,
        AsyncUnaryCallContinuation<TRequest, TResponse> continuation)
    {
        var headers = context.Options.Headers ?? new Metadata();
        headers.Add("Authorization", $"Bearer {_tokenProvider.GetToken()}");

        var newContext = new ClientInterceptorContext<TRequest, TResponse>(
            context.Method, context.Host,
            context.Options.WithHeaders(headers));

        return continuation(request, newContext);
    }
}

// Înregistrare pe client
builder.Services.AddGrpcClient<TaskService.TaskServiceClient>(...)
    .AddInterceptor<AuthInterceptor>();
\`\`\`

**Retry Interceptor — reziliență automată**

\`\`\`csharp
// Alternativ: folosește Polly prin HttpClientFactory
builder.Services.AddGrpcClient<TaskService.TaskServiceClient>(o => { ... })
    .AddPolicyHandler(Policy
        .Handle<RpcException>(ex => ex.StatusCode == StatusCode.Unavailable)
        .WaitAndRetryAsync(3, attempt => TimeSpan.FromSeconds(Math.Pow(2, attempt))));
\`\`\`

• Interceptorii pe server se aplică pentru orice serviciu gRPC înregistrat
• Ordinea interceptorilor contează — sunt apelați în ordine de înregistrare
• Preferă interceptori față de duplicarea logicii de logging/auth în fiecare metode`);

await up('33. Blazor WebAssembly', 'Blazor WASM', `**Blazor WebAssembly** permite rularea aplicațiilor C# direct în browser prin WebAssembly — fără JavaScript. Scrii interfața utilizator cu Razor Components în C# și .NET, iar browser-ul execută codul compilat ca WASM.

**Ce este Blazor WASM?**

Blazor WASM descarcă runtime-ul .NET (WASM) și assembly-urile aplicației în browser la primul load. Ulterior, toată logica rulează pe client — fără round-trips la server pentru fiecare acțiune UI.

\`\`\`
Browser
├── WebAssembly Runtime (.NET)
├── Application DLLs (C# compilat)
└── Razor Components (HTML + C#)
\`\`\`

**Crearea unui proiect Blazor WASM**

\`\`\`bash
dotnet new blazorwasm -o MyBlazorApp
cd MyBlazorApp
dotnet run
\`\`\`

**Structura proiectului**

\`\`\`
MyBlazorApp/
├── Pages/           (componente cu rută: @page)
│   ├── Index.razor
│   ├── Counter.razor
│   └── FetchData.razor
├── Shared/          (componente reutilizabile fără rută)
│   ├── MainLayout.razor
│   └── NavMenu.razor
├── wwwroot/         (fișiere statice: CSS, JS, imagini)
│   └── index.html   (entry point HTML)
└── Program.cs       (configurare servicii și routing)
\`\`\`

**Prima componentă — Counter**

\`\`\`razor
@page "/counter"

<PageTitle>Counter</PageTitle>

<h1>Counter</h1>
<p>Valoare curentă: <strong>@currentCount</strong></p>

<button class="btn btn-primary" @onclick="IncrementCount">
    Incrementare
</button>

<button class="btn btn-secondary" @onclick="Reset">
    Reset
</button>

@code {
    private int currentCount = 0;

    private void IncrementCount() => currentCount++;
    private void Reset() => currentCount = 0;
}
\`\`\`

**Comunicare cu API-ul**

\`\`\`csharp
// Program.cs — înregistrare HttpClient
builder.Services.AddScoped(sp =>
    new HttpClient { BaseAddress = new Uri(builder.HostEnvironment.BaseAddress) });

// Componentă care face fetch
@inject HttpClient Http

@if (tasks == null)
{
    <p>Se încarcă...</p>
}
else
{
    foreach (var task in tasks)
    {
        <p>@task.Title</p>
    }
}

@code {
    private TaskDto[]? tasks;

    protected override async Task OnInitializedAsync()
    {
        tasks = await Http.GetFromJsonAsync<TaskDto[]>("api/tasks");
    }
}
\`\`\`

• **Blazor Server** vs **WASM**: Server rulează pe server (SignalR), WASM rulează în browser
• Dezavantaj WASM: download inițial mare (~10MB), startup mai lent la prima vizită
• Avantaj WASM: offline capability, zero latency UI după load`);

await up('33. Blazor WebAssembly', 'Componente, parametri', `**Componentele Blazor** sunt blocuri reutilizabile de UI definite în fișiere .razor — combină HTML cu logică C# și se compun ca LEGO pentru a construi interfețe complexe.

**Parametri — date din exterior**

\`\`\`razor
@* Components/TaskCard.razor *@
<div class="card @(IsHighPriority ? "border-danger" : "")">
    <div class="card-body">
        <h5 class="card-title">@Title</h5>
        <p class="card-text">@Description</p>
        <span class="badge bg-@PriorityColor">Prioritate @Priority</span>
        <button @onclick="() => OnComplete.InvokeAsync(TaskId)">
            Marchează completat
        </button>
    </div>
</div>

@code {
    [Parameter] public int TaskId { get; set; }
    [Parameter] public string Title { get; set; } = "";
    [Parameter] public string? Description { get; set; }
    [Parameter] public int Priority { get; set; } = 1;

    // EventCallback — pentru notificarea componentei-părinte
    [Parameter] public EventCallback<int> OnComplete { get; set; }

    private bool IsHighPriority => Priority >= 4;
    private string PriorityColor => Priority switch
    {
        >= 4 => "danger",
        3    => "warning",
        _    => "success"
    };
}
\`\`\`

**Utilizarea componentei**

\`\`\`razor
@page "/tasks"
@inject ITaskService TaskService

<h1>Taskuri</h1>

@foreach (var task in tasks)
{
    <TaskCard
        TaskId="@task.Id"
        Title="@task.Title"
        Description="@task.Description"
        Priority="@task.Priority"
        OnComplete="HandleComplete" />
}

@code {
    private List<TaskDto> tasks = new();

    protected override async Task OnInitializedAsync()
    {
        tasks = await TaskService.GetAllAsync();
    }

    private async Task HandleComplete(int taskId)
    {
        await TaskService.CompleteAsync(taskId);
        tasks = await TaskService.GetAllAsync(); // reîncarcă lista
    }
}
\`\`\`

**Data Binding — legarea datelor la form**

\`\`\`razor
<EditForm Model="@model" OnValidSubmit="HandleSubmit">
    <DataAnnotationsValidator />
    <ValidationSummary />

    <div class="mb-3">
        <label>Titlu</label>
        <InputText class="form-control" @bind-Value="model.Title" />
        <ValidationMessage For="@(() => model.Title)" />
    </div>

    <div class="mb-3">
        <label>Prioritate</label>
        <InputNumber class="form-control" @bind-Value="model.Priority" />
    </div>

    <button type="submit" class="btn btn-primary">Salvează</button>
</EditForm>

@code {
    private CreateTaskDto model = new();

    private async Task HandleSubmit()
    {
        await TaskService.CreateAsync(model);
        model = new(); // resetează form-ul
    }
}
\`\`\`

• **[Parameter]** pentru date de la părinte; **[CascadingParameter]** pentru date din ierarhie
• **EventCallback** este thread-safe și apelează StateHasChanged automat
• Preferă **@bind-Value** față de @value+@onchange manual`);

await up('33. Blazor WebAssembly', 'Dependency Injection si HTTP calls', `**Dependency Injection și HTTP calls** în Blazor WASM funcționează la fel ca în ASP.NET Core — înregistrezi servicii în Program.cs și le injectezi în componente, dar serviciile rulează în browser.

**Înregistrarea serviciilor**

\`\`\`csharp
// Program.cs
var builder = WebAssemblyHostBuilder.CreateDefault(args);
builder.RootComponents.Add<App>("#app");

// HttpClient configurat cu base URL
builder.Services.AddScoped(sp =>
    new HttpClient { BaseAddress = new Uri(builder.HostEnvironment.BaseAddress) });

// Servicii custom
builder.Services.AddScoped<ITaskService, TaskService>();
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddSingleton<ILocalStorageService, LocalStorageService>();

await builder.Build().RunAsync();
\`\`\`

**Serviciu pentru apeluri HTTP tipizate**

\`\`\`csharp
public class TaskService : ITaskService
{
    private readonly HttpClient _http;
    public TaskService(HttpClient http) => _http = http;

    public async Task<List<TaskDto>> GetAllAsync()
    {
        var tasks = await _http.GetFromJsonAsync<List<TaskDto>>("api/tasks");
        return tasks ?? new();
    }

    public async Task<TaskDto?> CreateAsync(CreateTaskDto dto)
    {
        var response = await _http.PostAsJsonAsync("api/tasks", dto);
        if (!response.IsSuccessStatusCode) return null;
        return await response.Content.ReadFromJsonAsync<TaskDto>();
    }

    public async Task<bool> CompleteAsync(int id)
    {
        var response = await _http.PutAsJsonAsync(
            $"api/tasks/{id}",
            new UpdateTaskDto(null, null, true, null));
        return response.IsSuccessStatusCode;
    }

    public async Task DeleteAsync(int id)
    {
        await _http.DeleteAsync($"api/tasks/{id}");
    }
}
\`\`\`

**Injectare în componente**

\`\`\`razor
@inject ITaskService TaskService
@inject NavigationManager Navigation
@inject ILogger<TaskList> Logger

@if (isLoading)
{
    <div class="spinner-border" role="status"></div>
}
else if (errorMessage != null)
{
    <div class="alert alert-danger">@errorMessage</div>
}
else
{
    @foreach (var task in tasks) { <TaskCard ... /> }
}

@code {
    private List<TaskDto> tasks = new();
    private bool isLoading = true;
    private string? errorMessage;

    protected override async Task OnInitializedAsync()
    {
        try
        {
            tasks = await TaskService.GetAllAsync();
        }
        catch (HttpRequestException ex)
        {
            Logger.LogError(ex, "Failed to load tasks");
            errorMessage = "Nu s-au putut încărca task-urile.";
        }
        finally
        {
            isLoading = false;
        }
    }
}
\`\`\`

• Injectare cu **@inject** în componente sau prin constructor în servicii
• **GetFromJsonAsync/PostAsJsonAsync** — System.Net.Http.Json, mai simplu decât serializare manuală
• Tratează mereu stările de loading și eroare — conexiunea browser-API poate eșua`);

await up('33. Blazor WebAssembly', 'Routing, layouts si JS interop', `**Routing, layouts și JS interop** completează Blazor WASM cu navigare client-side, layout-uri reutilizabile și accesul la API-urile browser-ului care nu sunt disponibile nativ în C#.

**Routing în Blazor**

\`\`\`razor
@* Rută simplă *@
@page "/tasks"

@* Rută cu parametru *@
@page "/tasks/{Id:int}"

@* Mai multe rute pentru aceeași componentă *@
@page "/tasks/new"
@page "/tasks/{Id:int}/edit"

@code {
    [Parameter] public int Id { get; set; }

    protected override async Task OnParametersSetAsync()
    {
        // Apelat de fiecare dată când parametrii se schimbă
        if (Id > 0)
            task = await TaskService.GetByIdAsync(Id);
    }
}
\`\`\`

**Navigare programatică**

\`\`\`razor
@inject NavigationManager Nav

<button @onclick="GoToTask">Detalii</button>

@code {
    void GoToTask() => Nav.NavigateTo($"/tasks/{taskId}");

    // Cu stare (pentru back navigation)
    void CreateNew() => Nav.NavigateTo("/tasks/new", forceLoad: false);
}
\`\`\`

**Layout-uri reutilizabile**

\`\`\`razor
@* Shared/MainLayout.razor *@
@inherits LayoutComponentBase

<div class="sidebar">
    <NavMenu />
</div>

<main>
    <div class="top-row">
        <AuthDisplay />
    </div>
    <article>
        @Body  @* conținutul paginii curente *@
    </article>
</main>

@* Aplicare layout global în App.razor *@
<RouteView RouteData="@routeData" DefaultLayout="@typeof(MainLayout)" />

@* Override per componentă *@
@layout EmptyLayout
@page "/login"
\`\`\`

**JavaScript Interop — acces la browser APIs**

\`\`\`csharp
@inject IJSRuntime JS

@code {
    // C# → JavaScript
    await JS.InvokeVoidAsync("console.log", "Mesaj din C#!");
    var width = await JS.InvokeAsync<int>("eval", "window.innerWidth");

    // Clipboard API (nu e disponibilă direct în .NET WASM)
    await JS.InvokeVoidAsync("navigator.clipboard.writeText", textToCopy);

    // localStorage
    await JS.InvokeVoidAsync("localStorage.setItem", "key", "value");
    var val = await JS.InvokeAsync<string>("localStorage.getItem", "key");
}
\`\`\`

**Funcție JavaScript apelabilă din C#**

\`\`\`javascript
// wwwroot/app.js
window.scrollToTop = () => window.scrollTo(0, 0);
window.showToast = (message, type) => { /* bootstrap toast */ };
\`\`\`

\`\`\`csharp
await JS.InvokeVoidAsync("scrollToTop");
await JS.InvokeVoidAsync("showToast", "Salvat!", "success");
\`\`\`

• Minimizează JS interop — este asincron și lent față de codul C# pur
• Folosește **IJSObjectReference** pentru module JS: var module = await JS.InvokeAsync<IJSObjectReference>("import", "./app.js")
• **[JSInvokable]** permite JavaScript să apeleze metode C# — pentru event handlers browser`);

  console.log('Done.');
  await p.$disconnect();
}

run().catch(e => { console.error(e); p.$disconnect(); process.exit(1); });
