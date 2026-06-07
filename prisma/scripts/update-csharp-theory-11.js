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

await up('35. ASP.NET Core Identity', 'ASP.NET Core Identity', `**ASP.NET Core Identity** este sistemul integrat de autentificare și autorizare — gestionează utilizatori, parole, roluri, claims și token-uri fără să scrii infrastructura de la zero.

**Setup complet**

\`\`\`csharp
// Entități custom (opțional — poți adăuga proprietăți)
public class AppUser : IdentityUser<int>
{
    public string? FullName { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

public class AppRole : IdentityRole<int> { }

// DbContext cu Identity
public class AppDbContext : IdentityDbContext<AppUser, AppRole, int>
{
    public AppDbContext(DbContextOptions options) : base(options) { }
}

// Program.cs
builder.Services.AddDbContext<AppDbContext>(o =>
    o.UseSqlServer(builder.Configuration.GetConnectionString("Default")));

builder.Services
    .AddIdentity<AppUser, AppRole>(options =>
    {
        options.Password.RequiredLength = 8;
        options.Password.RequireDigit = true;
        options.Password.RequireUppercase = false;
        options.User.RequireUniqueEmail = true;
        options.Lockout.MaxFailedAccessAttempts = 5;
        options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(15);
    })
    .AddEntityFrameworkStores<AppDbContext>()
    .AddDefaultTokenProviders();
\`\`\`

**Înregistrare și autentificare**

\`\`\`csharp
public class AuthService
{
    private readonly UserManager<AppUser> _userManager;
    private readonly SignInManager<AppUser> _signInManager;

    public AuthService(UserManager<AppUser> um, SignInManager<AppUser> sm)
    {
        _userManager = um; _signInManager = sm;
    }

    public async Task<IdentityResult> RegisterAsync(string email, string password, string fullName)
    {
        var user = new AppUser { Email = email, UserName = email, FullName = fullName };
        var result = await _userManager.CreateAsync(user, password);

        if (result.Succeeded)
            await _userManager.AddToRoleAsync(user, "User");

        return result;
    }

    public async Task<SignInResult> LoginAsync(string email, string password)
    {
        return await _signInManager.PasswordSignInAsync(
            email, password,
            isPersistent: false,
            lockoutOnFailure: true);
    }
}
\`\`\`

**Managementul rolurilor**

\`\`\`csharp
// Seed roluri la startup
public static async Task SeedRolesAsync(RoleManager<AppRole> roleManager)
{
    foreach (var role in new[] { "Admin", "User", "Moderator" })
    {
        if (!await roleManager.RoleExistsAsync(role))
            await roleManager.CreateAsync(new AppRole { Name = role });
    }
}

// Autorizare bazată pe roluri
[Authorize(Roles = "Admin,Moderator")]
[HttpDelete("{id}")]
public async Task<IActionResult> DeleteUser(int id) { ... }
\`\`\`

• UserManager gestionează CRUD utilizatori și parole (hash automat cu PBKDF2)
• SignInManager gestionează sesiunile (cookie sau JWT)
• Identity generează automat tabelele prin migrations: AspNetUsers, AspNetRoles, AspNetUserRoles`);

await up('35. ASP.NET Core Identity', 'JWT Token generation', `**Generarea JWT** combină ASP.NET Core Identity cu token-uri Bearer — utilizatorul se autentifică și primește un JWT semnat, pe care îl trimite la fiecare request API.

**Configurare JWT în Program.cs**

\`\`\`csharp
// appsettings.json
{
    "Jwt": {
        "Key": "SuperSecretKeyMin32CharsLong!",
        "Issuer": "https://myapp.com",
        "Audience": "https://myapp.com",
        "ExpiresInMinutes": 60
    }
}

// Program.cs
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        var jwtSection = builder.Configuration.GetSection("Jwt");
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = jwtSection["Issuer"],
            ValidAudience = jwtSection["Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(jwtSection["Key"]!)),
            ClockSkew = TimeSpan.Zero  // fără toleranță la expirare
        };
    });

builder.Services.AddAuthorization();
// ORDINEA contează!
app.UseAuthentication();
app.UseAuthorization();
\`\`\`

**Serviciu de generare token**

\`\`\`csharp
public class JwtService
{
    private readonly IConfiguration _config;
    public JwtService(IConfiguration config) => _config = config;

    public string GenerateToken(AppUser user, IList<string> roles)
    {
        var jwtSection = _config.GetSection("Jwt");
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSection["Key"]!));

        var claims = new List<Claim>
        {
            new(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new(ClaimTypes.Email, user.Email!),
            new(ClaimTypes.Name, user.FullName ?? user.Email!),
            new(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
        };

        // Adaugă roluri ca claims
        foreach (var role in roles)
            claims.Add(new Claim(ClaimTypes.Role, role));

        var token = new JwtSecurityToken(
            issuer: jwtSection["Issuer"],
            audience: jwtSection["Audience"],
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(
                double.Parse(jwtSection["ExpiresInMinutes"]!)),
            signingCredentials: new SigningCredentials(key, SecurityAlgorithms.HmacSha256)
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}
\`\`\`

**Endpoint de login**

\`\`\`csharp
[HttpPost("login")]
public async Task<ActionResult<AuthResponseDto>> Login(LoginDto dto)
{
    var user = await _userManager.FindByEmailAsync(dto.Email);
    if (user == null || !await _userManager.CheckPasswordAsync(user, dto.Password))
        return Unauthorized("Credențiale invalide");

    var roles = await _userManager.GetRolesAsync(user);
    var token = _jwtService.GenerateToken(user, roles);

    return Ok(new AuthResponseDto(token, user.Email!, roles));
}
\`\`\`

• Stochează **JWT_KEY** în environment variables sau Azure Key Vault, niciodată în cod
• Cheia trebuie să aibă **minim 32 caractere** pentru HMAC-SHA256
• Expiră token-urile scurt (15-60 min) și folosește refresh tokens pentru sesiuni lungi`);

await up('35. ASP.NET Core Identity', 'JWT Validation', `**Validarea JWT și autorizarea bazată pe roluri** permit protejarea endpoint-urilor API — verifici automat token-ul la fiecare request și controlezi accesul prin atribute sau policies.

**Validarea automată a token-ului**

\`\`\`csharp
// Cu configurarea din Program.cs, ASP.NET Core validează automat:
// 1. Semnătura token-ului (cu cheia secretă)
// 2. Issuer și Audience
// 3. Expirarea (exp claim)

// Protejare endpoint simplu — orice user autentificat
[Authorize]
[HttpGet("profile")]
public async Task<ActionResult<UserProfileDto>> GetProfile()
{
    // Claims disponibile din token
    var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
    var email = User.FindFirstValue(ClaimTypes.Email);
    var name = User.FindFirstValue(ClaimTypes.Name);

    var user = await _userManager.FindByIdAsync(userId!);
    return Ok(new UserProfileDto(user!.Id, user.FullName!, user.Email!));
}
\`\`\`

**Autorizare bazată pe roluri**

\`\`\`csharp
// Rol specific
[Authorize(Roles = "Admin")]
[HttpDelete("users/{id}")]
public async Task<IActionResult> DeleteUser(int id) { ... }

// Mai multe roluri acceptate
[Authorize(Roles = "Admin,Moderator")]
[HttpPut("posts/{id}/approve")]
public async Task<IActionResult> ApprovePost(int id) { ... }

// Accesibil fără autentificare (override [Authorize] global)
[AllowAnonymous]
[HttpPost("auth/login")]
public async Task<IActionResult> Login(LoginDto dto) { ... }
\`\`\`

**Policies — reguli complexe de autorizare**

\`\`\`csharp
// Definire policy în Program.cs
builder.Services.AddAuthorization(options =>
{
    // Policy bazată pe claim
    options.AddPolicy("CanEditPosts", policy =>
        policy.RequireClaim("Permission", "posts.edit"));

    // Policy bazată pe rol + claim
    options.AddPolicy("SeniorEditor", policy =>
        policy.RequireRole("Editor")
              .RequireClaim("YearsExperience", "3", "4", "5"));

    // Policy custom cu requirement
    options.AddPolicy("MinAge18", policy =>
        policy.Requirements.Add(new MinAgeRequirement(18)));
});

// Utilizare
[Authorize(Policy = "CanEditPosts")]
[HttpPut("posts/{id}")]
public async Task<IActionResult> EditPost(int id, UpdatePostDto dto) { ... }
\`\`\`

**Requirement Handler custom**

\`\`\`csharp
public class MinAgeRequirement : IAuthorizationRequirement
{
    public int MinAge { get; }
    public MinAgeRequirement(int minAge) => MinAge = minAge;
}

public class MinAgeHandler : AuthorizationHandler<MinAgeRequirement>
{
    protected override Task HandleRequirementAsync(
        AuthorizationHandlerContext context, MinAgeRequirement requirement)
    {
        var birthDateClaim = context.User.FindFirst("BirthDate");
        if (birthDateClaim != null
            && DateTime.TryParse(birthDateClaim.Value, out var dob)
            && DateTime.Today.Year - dob.Year >= requirement.MinAge)
        {
            context.Succeed(requirement);
        }
        return Task.CompletedTask;
    }
}
\`\`\`

• **[Authorize]** global pe controller, **[AllowAnonymous]** per acțiune
• Claims extra din token: adaugă-le la generare și citești cu User.FindFirstValue()
• Policies sunt mai flexibile decât rolurile — permit orice logică de autorizare`);

await up('35. ASP.NET Core Identity', 'Refresh tokens', `**Refresh tokens și politicile de autorizare** completează sistemul JWT cu sesiuni de lungă durată și control granular al accesului — fără să forțezi re-autentificarea frecventă.

**De ce avem nevoie de refresh tokens?**

JWT-urile de acces expiră în 15-60 minute. Fără refresh tokens, utilizatorul ar trebui să se re-autentifice frecvent. **Refresh token** este un token de lungă durată (zile/săptămâni) stocat securizat, folosit să obțin noi access tokens fără re-autentificare.

**Modelul de date**

\`\`\`csharp
public class RefreshToken
{
    public int Id { get; set; }
    public string Token { get; set; } = "";       // random, opac
    public DateTime ExpiresAt { get; set; }
    public bool IsRevoked { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public string? ReplacedByToken { get; set; }  // rotation tracking

    public int UserId { get; set; }
    public AppUser? User { get; set; }
}
\`\`\`

**Generare și refresh**

\`\`\`csharp
public class RefreshTokenService
{
    private readonly AppDbContext _db;
    private readonly JwtService _jwt;
    private readonly UserManager<AppUser> _um;

    public string GenerateRefreshToken()
    {
        var bytes = RandomNumberGenerator.GetBytes(64);
        return Convert.ToBase64String(bytes); // 88 chars, URL-safe
    }

    public async Task<AuthResponseDto> RefreshAsync(string refreshToken)
    {
        var stored = await _db.RefreshTokens
            .Include(rt => rt.User)
            .FirstOrDefaultAsync(rt => rt.Token == refreshToken);

        if (stored == null || stored.IsRevoked || stored.ExpiresAt < DateTime.UtcNow)
            throw new UnauthorizedAccessException("Refresh token invalid sau expirat");

        // Token rotation — invalidăm cel vechi, emitem unul nou
        stored.IsRevoked = true;
        stored.ReplacedByToken = GenerateRefreshToken();

        var newRefresh = new RefreshToken
        {
            Token = stored.ReplacedByToken,
            ExpiresAt = DateTime.UtcNow.AddDays(30),
            UserId = stored.UserId
        };
        _db.RefreshTokens.Add(newRefresh);
        await _db.SaveChangesAsync();

        var roles = await _um.GetRolesAsync(stored.User!);
        var newAccess = _jwt.GenerateToken(stored.User!, roles);

        return new AuthResponseDto(newAccess, newRefresh.Token, stored.User!.Email!);
    }
}
\`\`\`

**Endpoint refresh**

\`\`\`csharp
[HttpPost("auth/refresh")]
public async Task<ActionResult<AuthResponseDto>> Refresh([FromBody] RefreshDto dto)
{
    try
    {
        var result = await _refreshService.RefreshAsync(dto.RefreshToken);
        return Ok(result);
    }
    catch (UnauthorizedAccessException)
    {
        return Unauthorized("Token expirat, re-autentificare necesară");
    }
}

[Authorize]
[HttpPost("auth/logout")]
public async Task<IActionResult> Logout([FromBody] string refreshToken)
{
    await _refreshService.RevokeAsync(refreshToken);
    return NoContent();
}
\`\`\`

• Stochează refresh tokens **în baza de date** — pot fi revocate oricând
• Folosește **token rotation** — la fiecare refresh, emit un token nou și invalidez pe cel vechi
• Implementează **family detection** — dacă un token reutilizat este detectat, revocă toată familia
• Refresh tokens în **HttpOnly cookies** pe web — mai sigur față de localStorage`);

  console.log('Done.');
  await p.$disconnect();
}

run().catch(e => { console.error(e); p.$disconnect(); process.exit(1); });
