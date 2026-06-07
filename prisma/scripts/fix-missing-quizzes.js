"use strict";
require("dotenv").config({ path: ".env" });
const { PrismaClient } = require("@prisma/client");
const p = new PrismaClient();

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const k = Math.floor(Math.random() * (i + 1));
    [a[i], a[k]] = [a[k], a[i]];
  }
  return a;
}

// ─── QUIZ POOL PER MODULE TOPIC ───────────────────────────
// Each pool has more than 5 questions so we can pick different ones per lesson
const QUIZ_POOLS = {
  tailwind: [
    { difficulty: "easy", name: "Utilitate padding", question: "Ce clasă Tailwind adaugă padding de 4 unități pe toate laturile?", options: ["p-4", "m-4", "px-4", "pt-4"], answer: "p-4", explanation: "p-4 aplică padding: 1rem pe toate laturile elementului." },
    { difficulty: "easy", name: "Culoare text", question: "Cum se setează culoarea textului la roșu în Tailwind?", options: ["text-red-500", "color-red", "font-red-500", "red-text"], answer: "text-red-500", explanation: "text-{culoare}-{intensitate} setează culoarea textului." },
    { difficulty: "easy", name: "Fundal albastru", question: "Ce clasă pune fundal albastru (500) unui element?", options: ["bg-blue-500", "background-blue", "bg-blue", "color-bg-blue"], answer: "bg-blue-500", explanation: "bg-{culoare}-{intensitate} setează culoarea fundalului." },
    { difficulty: "medium", name: "Flex centrat", question: "Ce clase centrează conținut atât orizontal cât și vertical cu flexbox?", options: ["flex items-center justify-center", "flex center", "d-flex center-all", "flex align justify"], answer: "flex items-center justify-center", explanation: "flex activează flexbox; items-center aliniază vertical; justify-center aliniază orizontal." },
    { difficulty: "medium", name: "Grid 3 coloane", question: "Ce clasă creează un grid cu 3 coloane egale?", options: ["grid-cols-3", "col-3", "grid-3", "columns-3"], answer: "grid-cols-3", explanation: "grid-cols-{n} definește numărul de coloane al unui grid CSS." },
    { difficulty: "medium", name: "Responsive prefix", question: "Ce prefix aplică o clasă doar pe ecrane medii (≥768px)?", options: ["md:", "sm:", "lg:", "xl:"], answer: "md:", explanation: "md: este breakpoint-ul pentru ecrane ≥768px în Tailwind." },
    { difficulty: "hard", name: "Hover state", question: "Cum schimbi culoarea fundalului la hover în Tailwind?", options: ["hover:bg-blue-600", "on-hover:bg-blue-600", ":hover bg-blue-600", "hover bg-blue-600"], answer: "hover:bg-blue-600", explanation: "hover: prefix aplică clasa doar la hover." },
    { difficulty: "hard", name: "Dark mode", question: "Ce prefix activează stilurile pentru dark mode în Tailwind?", options: ["dark:", "night:", "theme-dark:", "mode-dark:"], answer: "dark:", explanation: "dark: prefix aplică stilul când dark mode este activ." },
  ],

  react: [
    { difficulty: "easy", name: "useState hook", question: "Ce hook gestionează starea locală a unui component React?", options: ["useState", "useEffect", "useContext", "useRef"], answer: "useState", explanation: "useState este hook-ul pentru stare locală în componente funcționale." },
    { difficulty: "easy", name: "useEffect", question: "Ce hook rulează cod side-effects (ex: fetch date) după randare?", options: ["useEffect", "useState", "useCallback", "useMemo"], answer: "useEffect", explanation: "useEffect rulează după randare și poate fi conditionat de dependențe." },
    { difficulty: "easy", name: "Props", question: "Cum primesc componentele date de la componentul părinte?", options: ["Props", "State", "Context", "Hooks"], answer: "Props", explanation: "Props sunt datele transmise de la componentul părinte la cel copil." },
    { difficulty: "medium", name: "useReducer", question: "Ce hook este recomandat pentru state mai complex cu mai multe acțiuni?", options: ["useReducer", "useState", "useContext", "useCallback"], answer: "useReducer", explanation: "useReducer este alternativa la useState pentru state complex cu acțiuni multiple." },
    { difficulty: "medium", name: "useRef", question: "Ce hook creează o referință persistentă la un element DOM?", options: ["useRef", "useState", "useCallback", "useMemo"], answer: "useRef", explanation: "useRef returnează un obiect cu proprietatea .current care nu cauzează re-randare." },
    { difficulty: "medium", name: "key prop", question: "Ce prop este obligatoriu la randarea listelor?", options: ["key", "id", "index", "name"], answer: "key", explanation: "key ajută React să identifice elementele schimbate în liste dinamice." },
    { difficulty: "hard", name: "useMemo", question: "Ce hook memorează rezultatul unui calcul costisitor?", options: ["useMemo", "useCallback", "useEffect", "useRef"], answer: "useMemo", explanation: "useMemo recalculează doar când dependențele se schimbă, optimizând performanța." },
    { difficulty: "hard", name: "useCallback", question: "Ce hook memorează o funcție callback pentru a preveni re-randări inutile?", options: ["useCallback", "useMemo", "useEffect", "useState"], answer: "useCallback", explanation: "useCallback returnează aceeași referință a funcției dacă dependențele nu s-au schimbat." },
  ],

  "nextjs-frontend": [
    { difficulty: "easy", name: "Link component", question: "Ce component Next.js se folosește pentru navigare client-side?", options: ["Link", "a", "navigate", "Router"], answer: "Link", explanation: "Componenta Link din next/link oferă navigare fără reload complet al paginii." },
    { difficulty: "easy", name: "Fișier pagină", question: "Cum se numește fișierul care definește o pagină în App Router?", options: ["page.tsx", "index.tsx", "route.tsx", "view.tsx"], answer: "page.tsx", explanation: "page.tsx (sau .jsx/.js) definește UI-ul unei rute în Next.js App Router." },
    { difficulty: "easy", name: "Layout", question: "Ce fișier definește layout-ul comun pentru mai multe pagini?", options: ["layout.tsx", "template.tsx", "wrapper.tsx", "shell.tsx"], answer: "layout.tsx", explanation: "layout.tsx înfășoară paginile copil și se re-folosește pentru navigare." },
    { difficulty: "medium", name: "Server Component", question: "Implicit, componentele din App Router sunt:", options: ["Server Components", "Client Components", "Shared Components", "Static Components"], answer: "Server Components", explanation: "Implicit, componentele Next.js App Router sunt Server Components (randare pe server)." },
    { difficulty: "medium", name: "use client", question: "Ce directivă transformă un Server Component în Client Component?", options: ["\"use client\"", "\"use browser\"", "\"client only\"", "\"use frontend\""], answer: "\"use client\"", explanation: "Directiva \"use client\" marchează un component să fie randat pe client." },
    { difficulty: "medium", name: "Rute dinamice", question: "Cum se creează o rută dinamică în App Router?", options: ["app/[id]/page.tsx", "app/dynamic/page.tsx", "app/:id/page.tsx", "app/{id}/page.tsx"], answer: "app/[id]/page.tsx", explanation: "Rutele dinamice folosesc [param] în denumirea folderului." },
    { difficulty: "hard", name: "generateStaticParams", question: "Ce funcție pre-generează rute dinamice la build time?", options: ["generateStaticParams", "getStaticPaths", "generatePaths", "staticParams"], answer: "generateStaticParams", explanation: "generateStaticParams înlocuiește getStaticPaths din Pages Router." },
    { difficulty: "hard", name: "Metadata", question: "Cum se definește metadata (titlu, descriere) pentru o pagină?", options: ["export const metadata", "export head", "useHead()", "export meta"], answer: "export const metadata", explanation: "Exportul metadata din page.tsx definește titlul, descrierea și alte meta tag-uri." },
  ],

  "nextjs-backend": [
    { difficulty: "easy", name: "Route Handler", question: "Cum se numește fișierul pentru un API endpoint în App Router?", options: ["route.ts", "api.ts", "handler.ts", "endpoint.ts"], answer: "route.ts", explanation: "route.ts (sau .js) definește handler-ele HTTP pentru o rută API." },
    { difficulty: "easy", name: "GET handler", question: "Cum se definește un handler GET în route.ts?", options: ["export async function GET()", "export default GET()", "GET.handler()", "async GET()"], answer: "export async function GET()", explanation: "Metodele HTTP se exportă cu același nume (GET, POST, PUT, DELETE) din route.ts." },
    { difficulty: "easy", name: "NextResponse", question: "Ce clasă se folosește pentru răspunsuri personalizate în Next.js?", options: ["NextResponse", "Response", "HttpResponse", "ServerResponse"], answer: "NextResponse", explanation: "NextResponse extinde Response cu funcționalități specifice Next.js." },
    { difficulty: "medium", name: "Request body", question: "Cum se citesc datele JSON din body-ul unui POST request?", options: ["await request.json()", "request.body", "JSON.parse(request)", "request.data()"], answer: "await request.json()", explanation: "request.json() parsează async body-ul cererii ca obiect JavaScript." },
    { difficulty: "medium", name: "Status code", question: "Cum returnezi un răspuns cu status 404?", options: ["NextResponse.json({}, { status: 404 })", "NextResponse.notFound()", "Response.error(404)", "return 404"], answer: "NextResponse.json({}, { status: 404 })", explanation: "Al doilea argument al NextResponse.json() acceptă opțiuni inclusiv status HTTP." },
    { difficulty: "medium", name: "Params dinamici", question: "Cum accesezi parametrul dinamic [id] într-un Route Handler?", options: ["context.params.id", "request.params.id", "url.params.id", "req.query.id"], answer: "context.params.id", explanation: "Al doilea argument al handler-ului are { params } cu parametrii dinamici." },
    { difficulty: "hard", name: "Middleware proxy", question: "Cum se numește fișierul pentru proxy/middleware în Next.js 16?", options: ["proxy.js", "middleware.js", "interceptor.js", "guard.js"], answer: "proxy.js", explanation: "În Next.js 16, middleware-ul s-a redenumit în proxy.js la rădăcina proiectului." },
    { difficulty: "hard", name: "Headers cerere", question: "Cum citești un header din request?", options: ["request.headers.get('name')", "request.header.name", "headers.get(request, 'name')", "req['name']"], answer: "request.headers.get('name')", explanation: "headers.get() returnează valoarea unui header sau null dacă nu există." },
  ],

  c: [
    { difficulty: "easy", name: "Printf format", question: "Ce format specifier se folosește pentru int în printf?", options: ["%d", "%s", "%f", "%c"], answer: "%d", explanation: "%d (sau %i) este format specifier-ul pentru tipul int." },
    { difficulty: "easy", name: "Tip void", question: "Ce returnează o funcție declarată cu void?", options: ["Nimic", "0", "null", "undefined"], answer: "Nimic", explanation: "void înseamnă că funcția nu returnează nicio valoare." },
    { difficulty: "easy", name: "Array index", question: "Care este primul index valid al unui array în C?", options: ["0", "1", "-1", "N/A"], answer: "0", explanation: "Indexarea array-urilor în C (și în majoritatea limbajelor) începe de la 0." },
    { difficulty: "medium", name: "Sizeof", question: "Ce operator returnează dimensiunea în bytes a unui tip de date?", options: ["sizeof", "size", "length", "bytes"], answer: "sizeof", explanation: "sizeof() returnează dimensiunea în bytes: sizeof(int) = 4 pe sisteme moderne." },
    { difficulty: "medium", name: "Pointer operator", question: "Ce operator returnează adresa de memorie a unei variabile?", options: ["&", "*", "#", "@"], answer: "&", explanation: "Operatorul & (address-of) returnează adresa de memorie a variabilei." },
    { difficulty: "medium", name: "Null terminator", question: "Cu ce caracter se termină un string în C?", options: ["\\0", "\\n", "NULL", "END"], answer: "\\0", explanation: "String-urile C sunt terminate cu caracterul nul '\\0' (ASCII 0)." },
    { difficulty: "hard", name: "Malloc", question: "Ce funcție alocă dinamic memorie în C?", options: ["malloc", "alloc", "new", "create"], answer: "malloc", explanation: "malloc() alocă un bloc de memorie de dimensiunea specificată și returnează un pointer." },
    { difficulty: "hard", name: "Free memorie", question: "Ce funcție eliberează memoria alocată cu malloc?", options: ["free", "delete", "release", "deallocate"], answer: "free", explanation: "free() eliberează memoria alocată dinamic; neutilizarea ei cauzează memory leaks." },
  ],

  cpp: [
    { difficulty: "easy", name: "Cout", question: "Ce stream se folosește pentru output în C++?", options: ["cout", "print", "printf", "out"], answer: "cout", explanation: "cout (din namespace std) este stream-ul de ieșire standard în C++." },
    { difficulty: "easy", name: "Namespace std", question: "Ce declarație permite folosirea cout fără prefix std::", options: ["using namespace std;", "import std;", "#include std", "namespace = std;"], answer: "using namespace std;", explanation: "using namespace std; aduce întregul namespace std în scope curent." },
    { difficulty: "easy", name: "Vector", question: "Ce header trebuie inclus pentru std::vector?", options: ["<vector>", "<array>", "<list>", "<container>"], answer: "<vector>", explanation: "#include <vector> face disponibil tipul std::vector<T>." },
    { difficulty: "medium", name: "Class access", question: "Ce modificator de acces face membrii classei accesibili din exterior?", options: ["public", "private", "protected", "internal"], answer: "public", explanation: "public membrii pot fi accesați din orice context." },
    { difficulty: "medium", name: "Constructor", question: "Cum se numește metoda specială apelată la crearea unui obiect?", options: ["Constructor", "Initializer", "Creator", "Builder"], answer: "Constructor", explanation: "Constructorul are același nume ca clasa și este apelat automat la instanțiere." },
    { difficulty: "medium", name: "Referință", question: "Ce simbol definește o referință în C++?", options: ["&", "*", "#", "ref"], answer: "&", explanation: "& în declararea tipului (int& x) creează o referință — alias pentru variabila originală." },
    { difficulty: "hard", name: "Smart pointer", question: "Ce smart pointer C++ are ownership unic (un singur owner)?", options: ["unique_ptr", "shared_ptr", "weak_ptr", "auto_ptr"], answer: "unique_ptr", explanation: "unique_ptr nu poate fi copiat, doar mutat — garantează un singur owner." },
    { difficulty: "hard", name: "Template", question: "Ce keyword definește o funcție sau clasă template?", options: ["template", "generic", "typedef", "typename"], answer: "template", explanation: "template<typename T> permite scrierea de cod parametric pentru orice tip T." },
  ],

  csharp: [
    { difficulty: "easy", name: "Console output", question: "Ce metodă afișează text pe o linie nouă în C#?", options: ["Console.WriteLine()", "Console.Print()", "Console.Out()", "System.Write()"], answer: "Console.WriteLine()", explanation: "Console.WriteLine() afișează textul urmat de o linie nouă." },
    { difficulty: "easy", name: "Tip var", question: "Ce keyword inferă automat tipul variabilei în C#?", options: ["var", "auto", "let", "dynamic"], answer: "var", explanation: "var permite declararea variabilelor cu deducerea automată a tipului la compilare." },
    { difficulty: "easy", name: "String interpolation", question: "Ce prefix activează string interpolation în C#?", options: ["$", "@", "#", "%"], answer: "$", explanation: "$\"Salut {nume}\" permite inserarea expresiilor direct în string." },
    { difficulty: "medium", name: "LINQ Where", question: "Ce metodă LINQ filtrează o colecție?", options: ["Where()", "Filter()", "Select()", "Find()"], answer: "Where()", explanation: "Where() este metoda LINQ pentru filtrarea elementelor după o condiție." },
    { difficulty: "medium", name: "async/await C#", question: "Ce keyword marchează o metodă ca asincronă în C#?", options: ["async", "await", "Task", "thread"], answer: "async", explanation: "async modificatorul permite folosirea await în corpul metodei." },
    { difficulty: "medium", name: "Properties", question: "Cum se accesează o proprietate publică a unui obiect în C#?", options: ["obiect.Proprietate", "obiect->Proprietate", "obiect[Proprietate]", "obiect.get(Proprietate)"], answer: "obiect.Proprietate", explanation: "Proprietățile C# se accesează cu dot notation, similar câmpurilor." },
    { difficulty: "hard", name: "Dependency Injection", question: "Ce pattern injectează dependențele din exterior în loc să le creeze intern?", options: ["Dependency Injection", "Factory Pattern", "Singleton", "Observer"], answer: "Dependency Injection", explanation: "DI separă crearea obiectelor de utilizarea lor, facilitând testarea." },
    { difficulty: "hard", name: "Task<T>", question: "Ce tip returnează o metodă async care produce o valoare T?", options: ["Task<T>", "Promise<T>", "Async<T>", "Future<T>"], answer: "Task<T>", explanation: "Task<T> reprezintă o operație asincronă ce produce o valoare de tip T." },
  ],

  java: [
    { difficulty: "easy", name: "System.out.println", question: "Ce metodă afișează text pe o linie nouă în Java?", options: ["System.out.println()", "Console.print()", "out.println()", "print()"], answer: "System.out.println()", explanation: "System.out.println() este metoda standard pentru output în consolă Java." },
    { difficulty: "easy", name: "Class vs object", question: "Ce este o clasă în Java?", options: ["Un șablon pentru obiecte", "Un obiect instanțiat", "O metodă statică", "Un package"], answer: "Un șablon pentru obiecte", explanation: "Clasa definește structura (câmpuri + metode); obiectele sunt instanțe ale clasei." },
    { difficulty: "easy", name: "String immutable", question: "String-urile în Java sunt:", options: ["Imutabile", "Mutabile", "Primitive", "Opționale"], answer: "Imutabile", explanation: "String-urile Java sunt imutabile — orice operație creează un String nou." },
    { difficulty: "medium", name: "ArrayList", question: "Ce clasă Java implementează o listă dinamică (poate crește)?", options: ["ArrayList", "Array", "LinkedList", "Vector"], answer: "ArrayList", explanation: "ArrayList implementează List cu un array intern care crește automat." },
    { difficulty: "medium", name: "Interface", question: "Ce keyword declară un contract pe care clasele îl pot implementa?", options: ["interface", "abstract", "contract", "protocol"], answer: "interface", explanation: "interface definește metode fără implementare pe care clasele le pot implementa." },
    { difficulty: "medium", name: "Extends", question: "Ce keyword permite unei clase să moștenească din alta?", options: ["extends", "inherits", "implements", "super"], answer: "extends", explanation: "extends clarifică că o clasă moștenește câmpurile și metodele clasei părinte." },
    { difficulty: "hard", name: "Generics", question: "Ce feature Java permite scrierea de cod parametric cu tipuri?", options: ["Generics", "Templates", "Polymorphism", "Reflection"], answer: "Generics", explanation: "Generics (ArrayList<T>) permit cod type-safe fără casting explicit." },
    { difficulty: "hard", name: "Stream API", question: "Ce API Java permite procesarea colecțiilor în mod funcțional?", options: ["Stream API", "Iterator API", "Collection API", "Lambda API"], answer: "Stream API", explanation: "Stream API (java.util.stream) oferă operații funcționale: filter, map, reduce." },
  ],

  cybersecurity: [
    { difficulty: "easy", name: "XSS", question: "XSS înseamnă Cross-Site ___ing:", options: ["Scripting", "Searching", "Sending", "Sharing"], answer: "Scripting", explanation: "XSS (Cross-Site Scripting) permite injectarea de cod JavaScript malițios." },
    { difficulty: "easy", name: "HTTPS", question: "Ce protocol securizează comunicarea web cu criptare?", options: ["HTTPS", "HTTP", "FTP", "SMTP"], answer: "HTTPS", explanation: "HTTPS folosește TLS pentru a cripta datele în tranzit." },
    { difficulty: "easy", name: "SQL Injection", question: "Ce vulnerabilitate injectează cod SQL malițios?", options: ["SQL Injection", "XSS", "CSRF", "SSRF"], answer: "SQL Injection", explanation: "SQL Injection apare când input-ul utilizatorului nu este sanitizat înainte de query-uri SQL." },
    { difficulty: "medium", name: "CSRF", question: "Ce vulnerabilitate forțează un utilizator autentificat să execute acțiuni nedorite?", options: ["CSRF", "XSS", "SQLi", "IDOR"], answer: "CSRF", explanation: "CSRF (Cross-Site Request Forgery) exploatează sesiunea activă a utilizatorului." },
    { difficulty: "medium", name: "Hashing parole", question: "Ce funcție este recomandată pentru hashing parole?", options: ["bcrypt", "MD5", "SHA1", "Base64"], answer: "bcrypt", explanation: "bcrypt include salt automat și este lent intenționat — rezistent la brute force." },
    { difficulty: "medium", name: "OWASP", question: "OWASP Top 10 definește:", options: ["Cele mai frecvente vulnerabilități web", "Cele mai bune framework-uri", "Standardele de criptare", "Protocoalele de rețea"], answer: "Cele mai frecvente vulnerabilități web", explanation: "OWASP Top 10 este lista celor mai critice riscuri de securitate pentru aplicații web." },
    { difficulty: "hard", name: "JWT", question: "Ce component al unui JWT conține datele (claims)?", options: ["Payload", "Header", "Signature", "Token"], answer: "Payload", explanation: "JWT are 3 părți: Header (algoritm), Payload (claims/date), Signature (verificare)." },
    { difficulty: "hard", name: "Content Security Policy", question: "Ce header HTTP previne XSS prin definirea surselor permise?", options: ["Content-Security-Policy", "X-Frame-Options", "X-XSS-Protection", "Strict-Transport-Security"], answer: "Content-Security-Policy", explanation: "CSP header specifică ce resurse pot fi încărcate, prevenind scripturi injectate." },
  ],
};

// ─── MAIN ──────────────────────────────────────────────────

async function main() {
  const modules = await p.module.findMany({
    where: { slug: { in: Object.keys(QUIZ_POOLS) } },
    include: {
      lessons: {
        include: { tasks: { where: { type: "quiz" }, orderBy: { number: "asc" } } },
        orderBy: { order: "asc" },
      },
    },
    orderBy: { order: "asc" },
  });

  const DIFF_ORDER = { easy: 0, medium: 1, hard: 2 };
  let added = 0;

  for (const mod of modules) {
    const pool = QUIZ_POOLS[mod.slug];
    if (!pool) continue;

    for (const lesson of mod.lessons) {
      const currentCount = lesson.tasks.length;
      if (currentCount >= 5) continue;

      const needed = 5 - currentCount;

      // Pick questions from pool that aren't already used (by name)
      const usedNames = new Set(lesson.tasks.map((t) => t.name));
      const candidates = pool.filter((q) => !usedNames.has(q.name));

      // Sort candidates by difficulty
      const sorted = [...candidates].sort(
        (a, b) => (DIFF_ORDER[a.difficulty] ?? 1) - (DIFF_ORDER[b.difficulty] ?? 1)
      );

      // Take needed number of questions
      const toAdd = sorted.slice(0, needed);

      for (const q of toAdd) {
        // Shuffle options so correct answer isn't always at same position
        const shuffledOpts = shuffle(q.options);

        // Number: use a temporary high number, then we'll fix all quiz ordering at end
        await p.task.create({
          data: {
            lessonId: lesson.id,
            number: 999, // temporary
            type: "quiz",
            difficulty: q.difficulty,
            name: q.name,
            question: q.question,
            options: shuffledOpts,
            answer: q.answer,
            explanation: q.explanation,
            language: "javascript",
          },
        });
        lesson.tasks.push({ name: q.name, difficulty: q.difficulty }); // track locally
        added++;
      }

      // Renumber all quiz tasks for this lesson: sort by difficulty and assign 1-5
      const allQuiz = await p.task.findMany({
        where: { lessonId: lesson.id, type: "quiz" },
        orderBy: { number: "asc" },
      });

      const sorted5 = allQuiz
        .slice(0, 5)
        .sort((a, b) => (DIFF_ORDER[a.difficulty] ?? 1) - (DIFF_ORDER[b.difficulty] ?? 1));

      for (let i = 0; i < sorted5.length; i++) {
        await p.task.update({
          where: { id: sorted5[i].id },
          data: { number: i + 1 },
        });
      }
    }
  }

  console.log(`Added ${added} missing quiz tasks.`);
}

main()
  .catch(console.error)
  .finally(() => p.$disconnect());
