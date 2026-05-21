"use client";
import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import {
  ArrowLeft, ChevronDown, ChevronUp, Clock, GitBranch, Globe, Layers,
  Star, Zap, ShieldCheck, Code2, BookOpen, Target, Wrench
} from "lucide-react";

const STACKS = [
  { v: "all", l: "Toate" },
  { v: "html-css-js", l: "HTML+CSS+JS" },
  { v: "react", l: "React" },
  { v: "nextjs", l: "Next.js" },
  { v: "python", l: "Python" },
  { v: "c", l: "C" },
  { v: "cpp", l: "C++" },
  { v: "java", l: "Java" },
  { v: "csharp", l: "C#" },
  { v: "php", l: "PHP" },
];

const DIFFS = [
  { v: "all", l: "Toate", cls: "" },
  { v: "easy", l: "Ușor", cls: "bg-green-100 text-green-700" },
  { v: "medium", l: "Mediu", cls: "bg-amber-100 text-amber-700" },
  { v: "hard", l: "Greu", cls: "bg-red-100 text-red-700" },
];

const DIFF_BADGE = {
  easy:   { label: "Ușor",  cls: "bg-green-100 text-green-700 border-green-200" },
  medium: { label: "Mediu", cls: "bg-amber-100 text-amber-700 border-amber-200" },
  hard:   { label: "Greu",  cls: "bg-red-100 text-red-700 border-red-200" },
};

const STACK_BADGE = {
  "html-css-js": { label: "HTML+CSS+JS", cls: "bg-orange-100 text-orange-700" },
  react:          { label: "React",       cls: "bg-sky-100 text-sky-700" },
  nextjs:         { label: "Next.js",     cls: "bg-slate-200 text-slate-700" },
  python:         { label: "Python",      cls: "bg-blue-100 text-blue-700" },
  c:              { label: "C",           cls: "bg-purple-100 text-purple-700" },
  cpp:            { label: "C++",         cls: "bg-pink-100 text-pink-700" },
  java:           { label: "Java",        cls: "bg-red-100 text-red-700" },
  csharp:         { label: "C#",          cls: "bg-indigo-100 text-indigo-700" },
  php:            { label: "PHP",         cls: "bg-violet-100 text-violet-700" },
};

const PROJECTS = [
  {
    id: 1,
    title: "Pagina de prezentare – Pizzerie",
    stack: "html-css-js",
    difficulty: "easy",
    hours: 4,
    description: "Crează un site de prezentare pentru o pizzerie fictivă cu meniu, secțiune de contact și un design atractiv.",
    goal: "Să construiești de la zero un site complet de o pagină, folosind doar HTML, CSS și un pic de JavaScript. Va fi primul tău proiect care arată profesional — îl poți pune în portofoliu sau să-l dai unei pizzerii reale.",
    skills: ["HTML semantic", "CSS Flexbox", "CSS Grid", "Responsive design", "JS DOM basics", "Mobile-first"],
    what: [
      "Header sticky (rămâne sus la scroll) cu logo și meniu de navigație",
      "Hero section: imagine full-width cu overlay text și buton 'Comandă acum'",
      "Meniu cu 3-4 categorii (Pizza Clasică, Specială, Vegan) — fiecare cu 3-5 produse, prețuri",
      "Secțiunea 'Despre noi' — istoricul pizzeriei, valori (ingrediente fresh, livrare rapidă)",
      "Galerie foto cu efect hover (zoom ușor pe imagine)",
      "Formular de contact (nume, email, mesaj) cu validare basic în JS",
      "Footer cu adresă, telefon, orar și linkuri social media",
    ],
    steps: [
      "Creează un folder `pizzerie` cu fișierele `index.html`, `style.css`, `script.js`",
      "Construiește mai întâi structura HTML semantic: `<header>`, `<main>` cu `<section>` pentru fiecare zonă, `<footer>`",
      "Adaugă conținut text și imagini placeholder (de la unsplash.com sau pexels.com)",
      "Stilizează cu CSS folosind variabile (`--rosu: #d62828`, `--galben: #fcbf49`, `--negru: #1a1a1a`)",
      "Folosește Flexbox pentru navbar și carduri, CSS Grid pentru meniul de pizza",
      "Adaugă media query `@media (max-width: 768px)` pentru telefon",
      "În `script.js`: hamburger menu toggle, smooth scroll la click pe link-uri de nav, validare formular cu `e.preventDefault()`",
      "Testează pe Chrome DevTools în mod responsive (F12 → toggle device toolbar)",
    ],
    bonus: [
      "Animații CSS la scroll cu `Intersection Observer`",
      "Mode dark cu toggle (salvat în localStorage)",
      "Filtrare pizza după ingredient (vegan, picant, fără gluten)",
      "Slider de testimoniale clienți",
    ],
  },
  {
    id: 2,
    title: "Landing Page – Cafenea",
    stack: "html-css-js",
    difficulty: "easy",
    hours: 5,
    description: "Site de o pagină pentru o cafenea cu meniu de băuturi, galerie foto și sistem de rezervare simplu.",
    what: [
      "Navbar sticky cu logo și linkuri",
      "Hero cu imagine full-width și overlay text",
      "Meniu de cafea și băuturi cu carduri",
      "Galerie foto cu efect hover",
      "Formular rezervare masă (dată, oră, persoane)",
      "Animații CSS la scroll (fade-in)",
    ],
    steps: [
      "Structurează pagina în secțiuni semantice: `<header>`, `<main>`, `<section>`, `<footer>`",
      "Creează carduri CSS pentru meniu cu imagini și prețuri",
      "Adaugă Intersection Observer JS pentru animații la scroll",
      "Implementează formular de rezervare cu validare JS",
      "Fă designul responsive cu CSS Grid/Flexbox",
    ],
  },
  {
    id: 3,
    title: "Magazin Online – Haine",
    stack: "html-css-js",
    difficulty: "medium",
    hours: 10,
    description: "Un magazin online simplu cu produse, filtre, coș de cumpărături și checkout — fără backend.",
    what: [
      "Pagina principală cu produse filtrate după categorie",
      "Coș de cumpărături (add/remove/cantitate) în localStorage",
      "Pagina de produs cu galerie imagini",
      "Filtru după preț și categorie",
      "Simulare checkout cu validare formular",
      "Notificări toast la acțiuni",
    ],
    steps: [
      "Definește produsele ca array JS în `data.js`",
      "Randează produsele dinamic în HTML cu `innerHTML`",
      "Implementează filtru cu `Array.filter()`",
      "Construiește coșul cu localStorage (`getItem`, `setItem`)",
      "Adaugă pagina checkout cu validare câmpuri (card, adresă)",
      "Stilizează profesional cu CSS variables pentru teme",
    ],
  },
  {
    id: 4,
    title: "Aplicație To-Do cu Local Storage",
    stack: "html-css-js",
    difficulty: "easy",
    hours: 3,
    description: "Aplicație clasică de task management cu persistență în browser.",
    goal: "Să stăpânești manipularea DOM-ului, evenimente, array-uri și localStorage — fundamentul pentru orice aplicație JavaScript reală. To-Do List e proiectul universal pentru a învăța aceste concepte.",
    skills: ["DOM manipulation", "Event listeners", "Array methods", "localStorage", "JSON parse/stringify", "Render pattern"],
    what: [
      "Input pentru adăugarea de task-uri (Enter sau buton 'Adaugă')",
      "Listă cu task-uri afișate cu checkbox + text + buton 'Șterge'",
      "Click pe checkbox marchează task-ul ca finalizat (text barat)",
      "Buton 'Șterge' pentru fiecare task individual",
      "Filtre Toate / Active / Finalizate (3 butoane în header)",
      "Counter în footer: 'X task-uri rămase'",
      "Buton 'Șterge cele finalizate' (curăță tot ce e bifat)",
      "Persistență totală în localStorage (refresh page → datele rămân)",
    ],
    steps: [
      "Creează `index.html` cu: header, input + buton, `<ul id=\"list\">`, footer cu counter și filtre",
      "În CSS: stil curat, text barat (`text-decoration: line-through`) pentru task done",
      "În `app.js` definește array global `let tasks = []` și `let filter = 'all'`",
      "Funcție `addTask(text)`: creează `{ id: Date.now(), text, done: false }`, adaugă în `tasks`, apoi `save()` și `render()`",
      "Funcție `save()`: `localStorage.setItem('todos', JSON.stringify(tasks))`",
      "Funcție `load()`: `tasks = JSON.parse(localStorage.getItem('todos') || '[]')`",
      "Funcție `render()`: golește `<ul>`, iterează `tasks` filtrate după `filter`, creează `<li>` cu checkbox + span + buton delete",
      "Adaugă event listeners pentru: Enter în input, click pe checkbox, click pe delete, click pe filtre",
      "La pornire: `load()` apoi `render()`",
    ],
    bonus: [
      "Drag & drop pentru reordonare (`draggable` attribute)",
      "Editare task la dublu-click pe text",
      "Prioritate (mic/mediu/mare) cu badge colorat",
      "Date de scadență (deadline) cu indicator vizual pentru cele expirate",
      "Export ca fișier JSON pentru backup",
    ],
  },
  {
    id: 5,
    title: "Portfolio Personal",
    stack: "react",
    difficulty: "medium",
    hours: 8,
    description: "Site de portfolio cu React, animații și dark mode pentru a-ți prezenta proiectele.",
    what: [
      "Pagina principală cu introducere și skills",
      "Secțiune proiecte cu carduri și linkuri GitHub",
      "Dark/light mode cu context API",
      "Formular contact cu EmailJS (trimitere reală)",
      "Animații cu Framer Motion",
      "Deploy pe Vercel",
    ],
    steps: [
      "Bootstrap cu `npx create-react-app portfolio` sau Vite",
      "Creează componentele: `Hero`, `About`, `Projects`, `Contact`",
      "Implementează dark mode cu `useState` + CSS variables",
      "Adaugă animații de intrare cu Framer Motion `motion.div`",
      "Conectează formularul de contact cu EmailJS",
      "Push pe GitHub și deploy pe Vercel",
    ],
  },
  {
    id: 6,
    title: "Weather App cu API",
    stack: "react",
    difficulty: "medium",
    hours: 6,
    description: "Aplicație meteo care folosește OpenWeatherMap API cu căutare, prognoza 5 zile și animații.",
    what: [
      "Căutare oraș cu input + debounce",
      "Afișare temperatură, umiditate, vânt, condiție meteo",
      "Prognoză pentru 5 zile",
      "Icoane meteo animate",
      "Background dinamic după condiție (sunny/rainy/cloudy)",
      "Geolocation pentru locația curentă",
    ],
    steps: [
      "Obține API key gratuit de la openweathermap.org",
      "Fetch date: `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`",
      "Creează hook custom `useWeather(city)` cu loading/error state",
      "Randează carduri pentru fiecare zi din prognoza 5 zile",
      "Adaugă `navigator.geolocation.getCurrentPosition()` pentru localizare auto",
      "Stilizează cu gradienturi dinamice pe baza condiției meteo",
    ],
  },
  {
    id: 7,
    title: "Blog cu Next.js + Markdown",
    stack: "nextjs",
    difficulty: "medium",
    hours: 8,
    description: "Blog complet cu articole scrise în Markdown, pagini statice generate și RSS feed.",
    what: [
      "Pagina principală cu lista articolelor",
      "Pagini individuale pentru fiecare articol",
      "Parsare Markdown cu `gray-matter` + `remark`",
      "SEO optimizat cu metadata",
      "Căutare articole pe client",
      "RSS feed la `/feed.xml`",
    ],
    steps: [
      "Creează proiect cu `npx create-next-app@latest blog`",
      "Adaugă fișiere `.md` în `/content/posts/`",
      "Parsează frontmatter cu `gray-matter` în `getStaticProps`",
      "Randează conținut cu `remark` → HTML",
      "Generează pagini cu `getStaticPaths` pentru fiecare slug",
      "Adaugă metadata Open Graph pentru sharing",
      "Deploy pe Vercel cu un click",
    ],
  },
  {
    id: 8,
    title: "Aplicație Full-Stack – Gestiune Cheltuieli",
    stack: "nextjs",
    difficulty: "hard",
    hours: 20,
    description: "Aplicație completă cu autentificare, baze de date, CRUD operații și grafice pentru buget personal.",
    what: [
      "Autentificare cu NextAuth.js (Google / GitHub)",
      "CRUD pentru cheltuieli (adaugă, editează, șterge)",
      "Categorii personalizabile (mâncare, transport, etc)",
      "Grafice cu Chart.js (cheltuieli pe lună/categorie)",
      "Filtrare după dată și categorie",
      "Export CSV",
      "Deploy pe Vercel + Planetscale/MongoDB",
    ],
    steps: [
      "Setup `npx create-next-app@latest expenses --app`",
      "Instalează `next-auth`, `prisma`, `@prisma/client`",
      "Configurează Prisma cu schema pentru User, Expense, Category",
      "Implementează NextAuth cu Google provider",
      "Creează API routes: `/api/expenses` (GET/POST/DELETE)",
      "Buildează UI cu React Hook Form pentru adăugare cheltuieli",
      "Integrează Chart.js pentru vizualizare date",
      "Push pe GitHub → deploy pe Vercel cu DB pe cloud",
    ],
  },
  {
    id: 9,
    title: "Script Automatizare – Organizator Fișiere",
    stack: "python",
    difficulty: "easy",
    hours: 2,
    description: "Script Python care organizează automat fișierele dintr-un folder pe categorii (imagini, documente, video).",
    what: [
      "Scanează un folder specificat",
      "Creează subfoldere: Images/, Documents/, Videos/, Music/, Others/",
      "Mută fișierele în folderul corespunzător extensiei",
      "Log cu fișierele mutate",
      "Rulare automată cu argument din linie de comandă",
    ],
    steps: [
      "Importă modulele: `os`, `shutil`, `pathlib`",
      "Definește dicționar `EXTENSIONS = { 'Images': ['.jpg', '.png', ...], ... }`",
      "Iterează `os.listdir(folder)` și clasifică fiecare fișier",
      "Creează folderele cu `os.makedirs(path, exist_ok=True)`",
      "Mută cu `shutil.move(src, dst)`",
      "Adaugă `argparse` pentru a primi calea ca argument: `python organizer.py /Downloads`",
    ],
  },
  {
    id: 10,
    title: "API REST cu Flask – Gestiune Studenți",
    stack: "python",
    difficulty: "medium",
    hours: 7,
    description: "API RESTful complet cu Flask, SQLite și documentație automată pentru gestiunea notelor studenților.",
    what: [
      "Endpoint-uri CRUD pentru studenți (`/students`)",
      "Endpoint-uri pentru note (`/students/{id}/grades`)",
      "Autentificare cu API key în header",
      "Validare date cu Marshmallow",
      "Baza de date SQLite cu SQLAlchemy",
      "Testare cu pytest",
    ],
    steps: [
      "Instalează: `pip install flask flask-sqlalchemy marshmallow`",
      "Definește modelele SQLAlchemy: `Student`, `Grade`",
      "Creează blueprints Flask pentru `/students` și `/grades`",
      "Implementează toate verbele HTTP: GET, POST, PUT, DELETE",
      "Adaugă middleware pentru verificarea API key din header `X-API-Key`",
      "Scrie teste cu pytest pentru fiecare endpoint",
      "Documentează cu docstrings și expune `/docs` simplu",
    ],
  },
  // ── C ──
  {
    id: 11,
    title: "Calculator în C",
    stack: "c",
    difficulty: "easy",
    hours: 2,
    editorLang: "c",
    description: "Calculator de bază cu operații aritmetice, împărțire cu verificare și meniu interactiv.",
    what: [
      "Meniu cu opțiuni: +, -, *, /, %",
      "Citire operanzi de la utilizator",
      "Verificare împărțire la zero",
      "Buclă do-while pentru calcule multiple",
      "Formatare output cu printf",
    ],
    steps: [
      "Definește funcții separate: `add()`, `sub()`, `mul()`, `divSafe()`",
      "Creează un meniu cu `switch(op)` pentru a alege operația",
      "Adaugă verificare `if (b == 0)` înainte de împărțire",
      "Învelește totul într-un `do { ... } while(continua);`",
      "Compilează cu `gcc calculator.c -o calculator && ./calculator`",
    ],
  },
  {
    id: 12,
    title: "Gestiune studenți – fișiere C",
    stack: "c",
    difficulty: "medium",
    hours: 6,
    editorLang: "c",
    description: "Aplicație CLI care salvează și citește o listă de studenți din fișier binar, cu sortare și căutare.",
    what: [
      "Structura `Student` cu nume, notă, grupa",
      "Salvare/citire din fișier binar cu `fwrite`/`fread`",
      "Adaugă, șterge și caută student după nume",
      "Sortare după notă cu `qsort`",
      "Afișare formatată în tabel",
    ],
    steps: [
      "Definește `typedef struct { char nume[50]; float nota; int grupa; } Student;`",
      "Funcții `saveStudents(FILE*, Student*, int)` și `loadStudents(FILE*, Student*, int*)`",
      "Implementează `qsort` cu comparator custom după nota",
      "Meniu CLI cu opțiunile: Adaugă / Afișează / Sortează / Caută / Ieșire",
      "Compilează și testează cu câțiva studenți adăugați manual",
    ],
  },
  // ── C++ ──
  {
    id: 13,
    title: "Joc Ghicește Numărul – C++",
    stack: "cpp",
    difficulty: "easy",
    hours: 2,
    editorLang: "cpp",
    description: "Joc interactiv în care calculatorul generează un număr aleator și jucătorul trebuie să-l ghicească.",
    goal: "Să folosești input/output, bucle while, condiționale și biblioteca modernă `<random>` din C++11+. E primul joc complet pe care îl poți construi după ce ai învățat bazele C++.",
    skills: ["std::cin/cout", "Bucle while", "If/else", "Random modern (mt19937)", "Funcții", "do-while pentru restart"],
    what: [
      "Calculatorul alege un număr secret între 1 și N (random)",
      "Jucătorul introduce ghicituri prin tastatură",
      "După fiecare ghicire afișează 'Prea mare!' / 'Prea mic!' / 'Bravo!'",
      "Contorizează numărul de tentative și afișează la final",
      "Meniu de dificultate: Ușor (1-50), Mediu (1-100), Greu (1-500)",
      "După câștig, întreabă 'Vrei să joci din nou? (D/N)'",
      "Statistici simple: cel mai bun scor (cele mai puține tentative)",
    ],
    steps: [
      "Include header-ele necesare: `<iostream>`, `<random>`, `<limits>`",
      "Creează generatorul random: `std::random_device rd; std::mt19937 rng(rd());`",
      "Funcție `int ghiceste(int max)`: distribuție `std::uniform_int_distribution<>(1, max)(rng)` returnează numărul secret",
      "În `main()`: afișează meniu dificultate, citește alegerea cu `cin >> nivel`",
      "Mapează nivel → max (1→50, 2→100, 3→500)",
      "Buclă `while (ghicit != secret) { cin >> ghicit; tentative++; if (...) ... }`",
      "După ghicire corectă: afișează numărul de tentative",
      "Buclă exterioară `do { ... } while(continua == 'D')` pentru restart",
      "Compilează: `g++ -std=c++17 -O2 joc.cpp -o joc && ./joc`",
    ],
    bonus: [
      "Timpul scurs cu `std::chrono` (cât a durat să ghicești)",
      "Salvare highscore în fișier `score.txt`",
      "Mod 'inversat': tu alegi numărul, calculatorul ghicește prin căutare binară",
      "Sistem de hint-uri (par/impar, divizibil cu, etc.) — câștigi cu mai puține",
    ],
  },
  {
    id: 14,
    title: "Gestiune inventar – C++ OOP",
    stack: "cpp",
    difficulty: "medium",
    hours: 7,
    editorLang: "cpp",
    description: "Aplicație OOP în C++ pentru gestionarea inventarului unui magazin cu clase, moștenire și fișiere.",
    what: [
      "Clasa de bază `Produs` cu name, price, qty",
      "Subclase: `Electronica`, `Aliment` cu atribute specifice",
      "Supraîncărcare operator `<<` pentru afișare",
      "Vector de pointeri la produse (polimorfism)",
      "Salvare/citire din fișier text",
    ],
    steps: [
      "Definește clasa `Produs` cu constructor, getteri, `virtual void afiseaza()`",
      "Moștenește `Electronica : public Produs` cu `garantie` (luni)",
      "Suprascrie `afiseaza()` în fiecare subclasă",
      "Folosește `vector<Produs*>` pentru lista de produse",
      "Implementează `salveaza(filename)` și `incarca(filename)` cu `fstream`",
    ],
  },
  // ── Java ──
  {
    id: 15,
    title: "Aplicație bancară simplă – Java",
    stack: "java",
    difficulty: "medium",
    hours: 6,
    editorLang: "java",
    description: "Simulare de cont bancar în Java cu depuneri, retrageri, istoric tranzacții și validări.",
    what: [
      "Clasa `ContBancar` cu sold, titular, IBAN generat",
      "Metode: `depune()`, `retrage()`, `transfer()`",
      "Validare sold insuficient cu excepție custom",
      "Istoric tranzacții cu `ArrayList<Tranzactie>`",
      "Afișare extras de cont formatat",
    ],
    steps: [
      "Creează clasa `ContBancar` cu `private double sold` (encapsulare)",
      "Definește excepție `SoldInsuficientException extends RuntimeException`",
      "Aruncă excepția în `retrage()` dacă `suma > sold`",
      "Loghează fiecare operație în `ArrayList<String> istoric`",
      "Testează în `main()` cu scenarii: depunere, retragere validă, retragere invalidă",
    ],
  },
  {
    id: 16,
    title: "Sistem de note studenți – Java",
    stack: "java",
    difficulty: "easy",
    hours: 3,
    editorLang: "java",
    description: "Program Java pentru gestionarea notelor unui student cu calcul medie, minim, maxim și statistici.",
    what: [
      "Adaugă note prin input de la consolă",
      "Calcul medie, notă minimă și maximă",
      "Verificare promovare (medie >= 5)",
      "Sortare note crescător",
      "Afișare distribuție pe intervale",
    ],
    steps: [
      "Folosește `ArrayList<Double> note = new ArrayList<>()`",
      "Adaugă cu `Scanner sc = new Scanner(System.in)` într-o buclă",
      "Calculează media cu `note.stream().mapToDouble(Double::doubleValue).average().getAsDouble()`",
      "Sortează cu `Collections.sort(note)`",
      "Afișează statistici formatate cu `String.format(\"%.2f\", medie)`",
    ],
  },
  // ── C# ──
  {
    id: 17,
    title: "Task Manager CLI – C#",
    stack: "csharp",
    difficulty: "easy",
    hours: 3,
    editorLang: "csharp",
    description: "Aplicație CLI în C# pentru gestionarea task-urilor zilnice cu salvare în JSON.",
    what: [
      "Clasă `Task` cu titlu, descriere, prioritate, status",
      "CRUD complet: adaugă, listează, modifică, șterge",
      "Filtrare după status (todo/done) și prioritate",
      "Persistență în fișier JSON cu `System.Text.Json`",
      "Interfață colorată în consolă",
    ],
    steps: [
      "Definește `record Task(int Id, string Title, bool Done, string Priority)`",
      "Salvează cu `File.WriteAllText(\"tasks.json\", JsonSerializer.Serialize(tasks))`",
      "Citește cu `JsonSerializer.Deserialize<List<Task>>(File.ReadAllText(...))`",
      "Adaugă culori cu `Console.ForegroundColor = ConsoleColor.Green`",
      "Rulează: `dotnet run` în folderul proiectului",
    ],
  },
  {
    id: 18,
    title: "Joc Snake în consolă – C#",
    stack: "csharp",
    difficulty: "hard",
    hours: 12,
    editorLang: "csharp",
    description: "Jocul clasic Snake implementat complet în consola C# cu highscore, viteză progresivă și coliziuni.",
    what: [
      "Snake care crește la mâncare",
      "Detectare coliziuni (pereți + propriul corp)",
      "Viteză progresivă pe măsură ce scorul crește",
      "Afișare scor și highscore",
      "Restart la game over",
    ],
    steps: [
      "Folosește `Queue<(int x, int y)>` pentru corpul șarpelui",
      "Loop principal cu `Task.Delay(speed)` pentru FPS control",
      "Detectează input non-blocking cu `Console.KeyAvailable`",
      "Redesenează doar celulele schimbate (nu toată consola)",
      "Salvează highscore în `File.WriteAllText(\"score.txt\", score.ToString())`",
    ],
  },
  // ── PHP ──
  {
    id: 19,
    title: "Blog simplu – PHP + MySQL",
    stack: "php",
    difficulty: "medium",
    hours: 8,
    editorLang: "php",
    description: "Blog complet în PHP pur cu autentificare, CRUD articole, comentarii și paginare.",
    what: [
      "Autentificare cu sesiuni PHP",
      "Pagina principală cu lista articolelor și paginare",
      "Adaugă/editează/șterge articole (admin)",
      "Comentarii pe articole",
      "Upload imagini pentru articole",
    ],
    steps: [
      "Setup: XAMPP sau WAMP, creează DB `blog` cu tabele `users`, `posts`, `comments`",
      "Autentificare cu `password_hash()` + `password_verify()` + `$_SESSION`",
      "CRUD articole cu PDO și prepared statements (securitate SQL injection)",
      "Paginare: `LIMIT $perPage OFFSET $page * $perPage` în query",
      "Upload imagini cu `move_uploaded_file()` și validare tip/mărime",
    ],
  },
  {
    id: 20,
    title: "API REST simplu – PHP",
    stack: "php",
    difficulty: "easy",
    hours: 3,
    editorLang: "php",
    description: "Mini API REST în PHP pur care returnează JSON, fără framework.",
    what: [
      "Endpoint `/api/users` — GET (listă), POST (creare)",
      "Endpoint `/api/users/{id}` — GET, PUT, DELETE",
      "Autentificare cu API key în header",
      "Răspunsuri JSON cu coduri HTTP corecte",
      "Date stocate în fișier JSON (fără DB)",
    ],
    steps: [
      "Citește metoda HTTP cu `$_SERVER['REQUEST_METHOD']`",
      "Parsează URL cu `parse_url()` și `explode('/', $path)`",
      "Returnează JSON: `header('Content-Type: application/json'); echo json_encode($data);`",
      "Setează status: `http_response_code(201)` pentru creare, `404` pentru negăsit",
      "Testează cu `curl -X GET http://localhost/api/users`",
    ],
  },
];

const GITHUB_GUIDE = [
  { step: 1, title: "Creează repository pe GitHub", desc: "Mergi pe github.com → New → dă un nume proiectului → Create repository" },
  { step: 2, title: "Inițializează Git local", desc: 'Rulează în folderul proiectului: `git init` → `git add .` → `git commit -m "Initial commit"`' },
  { step: 3, title: "Conectează remote și push", desc: 'Copiază URL-ul din GitHub și rulează: `git remote add origin URL` → `git push -u origin main`' },
  { step: 4, title: "Actualizări viitoare", desc: '`git add .` → `git commit -m "descriere modificare"` → `git push`' },
];

const VERCEL_GUIDE = [
  { step: 1, title: "Conectează GitHub la Vercel", desc: "Mergi pe vercel.com → New Project → Import Git Repository → selectează repo-ul" },
  { step: 2, title: "Configurare automată", desc: "Vercel detectează automat framework-ul (React/Next.js). Click Deploy." },
  { step: 3, title: "URL instant", desc: "Primești un URL live (ex: proiect.vercel.app) în ~2 minute. Gata!" },
  { step: 4, title: "Deploy automat la push", desc: "Orice push pe GitHub declanșează automat un nou deploy pe Vercel." },
];

function ProjectCard({ project, expanded, onToggle }) {
  const diff = DIFF_BADGE[project.difficulty];
  const stack = STACK_BADGE[project.stack];

  return (
    <div className={`bg-white dark:bg-slate-800 rounded-2xl shadow-sm overflow-hidden border-2 transition-all ${expanded ? "border-indigo-300 shadow-lg" : "border-transparent hover:border-indigo-100 hover:shadow-md"}`}>
      <button onClick={onToggle} className="w-full text-left p-4 sm:p-5 active:bg-slate-50 dark:active:bg-slate-700/40 transition-colors">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap gap-1.5 mb-2">
              <span className={`text-[11px] sm:text-xs font-bold px-2 py-0.5 rounded-full border ${diff.cls}`}>{diff.label}</span>
              <span className={`text-[11px] sm:text-xs font-bold px-2 py-0.5 rounded-full ${stack.cls}`}>{stack.label}</span>
            </div>
            <h3 className="font-black text-slate-800 dark:text-white text-sm sm:text-base leading-snug">{project.title}</h3>
            <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm mt-1 leading-relaxed">{project.description}</p>
            <div className="flex items-center gap-3 mt-2.5 text-[11px] sm:text-xs text-slate-400">
              <span className="flex items-center gap-1"><Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5"/> ~{project.hours}h</span>
            </div>
          </div>
          <div className={`flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${expanded ? "bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-300" : "bg-slate-100 dark:bg-slate-700 text-slate-400"}`}>
            {expanded ? <ChevronUp className="w-4 h-4"/> : <ChevronDown className="w-4 h-4"/>}
          </div>
        </div>
      </button>

      {expanded && (
        <div className="px-4 sm:px-5 pb-5 border-t border-slate-100 dark:border-slate-700 pt-4 space-y-5">
          {/* Goal — extended description */}
          {project.goal && (
            <div className="bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-100 dark:border-indigo-800 rounded-xl p-3.5">
              <h4 className="font-black text-indigo-800 dark:text-indigo-200 text-xs mb-1.5 flex items-center gap-1.5 uppercase tracking-wider">
                <Target className="w-3.5 h-3.5"/> Scop
              </h4>
              <p className="text-sm text-indigo-900 dark:text-indigo-100 leading-relaxed">{project.goal}</p>
            </div>
          )}

          {/* Skills you'll learn */}
          {project.skills && project.skills.length > 0 && (
            <div>
              <h4 className="font-black text-slate-700 dark:text-white text-sm mb-2.5 flex items-center gap-1.5">
                <Wrench className="w-4 h-4 text-amber-500"/> Ce vei învăța
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {project.skills.map((s, i) => (
                  <span key={i} className="text-xs font-bold bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-200 px-2.5 py-1 rounded-lg">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Ce vei construi */}
          <div>
            <h4 className="font-black text-slate-700 dark:text-white text-sm mb-2.5 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-indigo-500"/> Funcționalități cerute
            </h4>
            <ul className="space-y-2">
              {project.what.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  <span className="w-5 h-5 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-300 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0 mt-0.5">{i + 1}</span>
                  <span className="flex-1">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Pași de implementare */}
          <div>
            <h4 className="font-black text-slate-700 dark:text-white text-sm mb-2.5 flex items-center gap-1.5">
              <Code2 className="w-4 h-4 text-emerald-500"/> Pași de implementare
            </h4>
            <ol className="space-y-2.5">
              {project.steps.map((step, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm">
                  <span className="w-5 h-5 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0 mt-0.5">{i + 1}</span>
                  <span className="text-slate-600 dark:text-slate-300 leading-relaxed flex-1" dangerouslySetInnerHTML={{ __html: step.replace(/`([^`]+)`/g, "<code class='bg-slate-100 dark:bg-slate-700 text-indigo-700 dark:text-indigo-300 px-1.5 py-0.5 rounded font-mono text-xs'>$1</code>") }}/>
                </li>
              ))}
            </ol>
          </div>

          {/* Bonus / Stretch goals */}
          {project.bonus && project.bonus.length > 0 && (
            <div className="bg-violet-50 dark:bg-violet-900/30 border border-violet-100 dark:border-violet-800 rounded-xl p-3.5">
              <h4 className="font-black text-violet-800 dark:text-violet-200 text-xs mb-2 flex items-center gap-1.5 uppercase tracking-wider">
                <Star className="w-3.5 h-3.5"/> Bonus (dacă vrei mai mult)
              </h4>
              <ul className="space-y-1.5">
                {project.bonus.map((b, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-violet-900 dark:text-violet-100 leading-relaxed">
                    <span className="text-violet-500 dark:text-violet-400 font-black flex-shrink-0">+</span>
                    <span className="flex-1">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Editor button */}
          {project.editorLang && (
            <Link href={`/editor?lang=${project.editorLang}`}
              className="mt-2 w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 transition-colors text-white text-sm font-black py-3 rounded-xl active:scale-[0.98] shadow-sm">
              <Code2 className="w-4 h-4"/> Deschide în Editor
            </Link>
          )}
        </div>
      )}
    </div>
  );
}

function GuideSection({ title, icon: Icon, items, color }) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 sm:p-5 shadow-sm">
      <h3 className={`font-black text-sm mb-3 sm:mb-4 flex items-center gap-2 ${color}`}>
        <Icon className="w-4 h-4"/> {title}
      </h3>
      <div className="space-y-3">
        {items.map(item => (
          <div key={item.step} className="flex gap-3">
            <div className="w-7 h-7 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center text-xs font-black text-slate-600 dark:text-slate-300 flex-shrink-0">{item.step}</div>
            <div className="min-w-0">
              <p className="font-bold text-slate-800 dark:text-white text-sm">{item.title}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed break-words" dangerouslySetInnerHTML={{ __html: item.desc.replace(/`([^`]+)`/g, "<code class='bg-slate-100 dark:bg-slate-700 text-indigo-700 dark:text-indigo-300 px-1 rounded font-mono'>$1</code>") }}/>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ProiectePage() {
  const [stack, setStack] = useState("all");
  const [diff, setDiff] = useState("all");
  const [expanded, setExpanded] = useState(null);
  const [guideOpen, setGuideOpen] = useState(false);

  const filtered = PROJECTS.filter(p =>
    (stack === "all" || p.stack === stack) &&
    (diff === "all" || p.difficulty === diff)
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 pb-24">
      {/* Header */}
      <header className="bg-gradient-to-r from-indigo-700 to-purple-700 text-white shadow-lg sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-3 sm:px-4 py-2.5 flex items-center gap-2">
          <Link href="/" className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors active:scale-95 flex-shrink-0">
            <ArrowLeft className="w-5 h-5"/>
          </Link>
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <div className="w-9 h-9 bg-yellow-400 rounded-xl flex items-center justify-center flex-shrink-0">
              <Star className="w-4 h-4 text-yellow-900"/>
            </div>
            <div className="min-w-0">
              <h1 className="font-black text-base leading-tight">Proiecte</h1>
              <p className="text-indigo-200 text-[11px] leading-tight">Aplică ce ai învățat</p>
            </div>
          </div>
          <button
            onClick={() => setGuideOpen(o => !o)}
            className="text-[11px] sm:text-xs bg-white/15 hover:bg-white/25 transition-colors px-2.5 sm:px-3 py-2 rounded-full font-bold flex items-center gap-1.5 active:scale-95 flex-shrink-0">
            <BookOpen className="w-3.5 h-3.5"/> <span className="hidden sm:inline">Ghid Deploy</span><span className="sm:hidden">Ghid</span>
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-3 sm:px-4 py-4 sm:py-6 space-y-4 sm:space-y-5">

        {/* Deploy Guide (collapsible) */}
        {guideOpen && (
          <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
            <GuideSection title="GitHub — Urcă codul" icon={GitBranch} items={GITHUB_GUIDE} color="text-slate-800 dark:text-white"/>
            <GuideSection title="Vercel — Site live gratis" icon={Globe} items={VERCEL_GUIDE} color="text-indigo-700 dark:text-indigo-300"/>
          </div>
        )}

        {/* Filters — horizontal scroll on mobile */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-3 sm:p-4 shadow-sm space-y-3">
          <div>
            <p className="text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2 px-1">Limbaj</p>
            <div className="flex gap-2 overflow-x-auto scrollbar-hide -mx-1 px-1 pb-1">
              {STACKS.map(s => (
                <button key={s.v} onClick={() => setStack(s.v)}
                  className={`flex-shrink-0 px-3 py-2 rounded-xl text-xs font-bold border-2 transition-all active:scale-95
                    ${stack === s.v ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300" : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-indigo-200"}`}>
                  {s.l}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2 px-1">Dificultate</p>
            <div className="flex gap-2">
              {DIFFS.map(d => (
                <button key={d.v} onClick={() => setDiff(d.v)}
                  className={`flex-1 px-2 py-2 rounded-xl text-xs font-bold border-2 transition-all active:scale-95
                    ${diff === d.v ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300" : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-indigo-200"}`}>
                  {d.l}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="flex items-center gap-2 text-xs sm:text-sm px-1">
          <span className="font-bold text-slate-700 dark:text-slate-300">{filtered.length} proiecte</span>
          <span className="text-slate-300 dark:text-slate-600">•</span>
          <span className="flex items-center gap-1 text-slate-400 text-[11px] sm:text-xs">
            <Zap className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-yellow-400"/> Click pe un proiect
          </span>
        </div>

        {/* Project cards */}
        {filtered.length === 0 ? (
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-10 text-center shadow-sm">
            <p className="text-slate-500 dark:text-slate-400 font-semibold">Niciun proiect găsit cu filtrele selectate.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map(p => (
              <ProjectCard
                key={p.id}
                project={p}
                expanded={expanded === p.id}
                onToggle={() => setExpanded(expanded === p.id ? null : p.id)}
              />
            ))}
          </div>
        )}

        {/* Tips card */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-4 sm:p-5 text-white">
          <div className="flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 flex-shrink-0 mt-0.5 text-indigo-200"/>
            <div className="min-w-0">
              <p className="font-black text-sm mb-2">Sfaturi pentru succes</p>
              <ul className="space-y-1.5 text-indigo-100 text-xs leading-relaxed">
                <li>• Începe cu un proiect ușor — finalizarea dă încredere</li>
                <li>• Fă pași mici: HTML → CSS → JS</li>
                <li>• Commit des pe GitHub, chiar dacă nu e gata</li>
                <li>• Folosește DevTools (F12) pentru debugging</li>
                <li>• Întreabă asistentul AI dacă ești blocat</li>
              </ul>
            </div>
          </div>
        </div>

      </main>
      <Navbar/>
    </div>
  );
}
