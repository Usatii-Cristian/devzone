"use client";
import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import {
  ArrowLeft, ChevronDown, ChevronUp, Clock, GitBranch, Globe, Layers,
  Star, Zap, ShieldCheck, Code2, BookOpen
} from "lucide-react";

const STACKS = [
  { v: "all", l: "Toate" },
  { v: "html-css-js", l: "HTML+CSS+JS" },
  { v: "react", l: "React" },
  { v: "nextjs", l: "Next.js" },
  { v: "python", l: "Python" },
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
};

const PROJECTS = [
  {
    id: 1,
    title: "Pagina de prezentare – Pizzerie",
    stack: "html-css-js",
    difficulty: "easy",
    hours: 4,
    description: "Crează un site de prezentare pentru o pizzerie fictivă cu meniu, secțiune de contact și un design atractiv.",
    what: [
      "Header cu logo și navigație",
      "Hero section cu imagine și call-to-action",
      "Meniu cu 3-4 categorii de pizza și prețuri",
      "Secțiune 'Despre noi' cu povestea pizzeriei",
      "Formular de contact (nume, email, mesaj)",
      "Footer cu adresă și program de funcționare",
    ],
    steps: [
      "Creează un folder `pizzerie` și fișierele `index.html`, `style.css`, `script.js`",
      "Construiește structura HTML cu toate secțiunile",
      "Stilizează cu CSS folosind un color scheme cald (roșu, portocaliu, galben)",
      "Adaugă un mic JS pentru meniu mobil (hamburger toggle)",
      "Testează pe telefon (responsive design)",
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
    what: [
      "Adaugă task-uri cu Enter sau buton",
      "Marchează task-uri complete (click pe checkbox)",
      "Șterge task-uri individuale sau toate cele finalizate",
      "Filtre: Toate / Active / Finalizate",
      "Persistență în localStorage (datele rămân după refresh)",
    ],
    steps: [
      "Creează HTML simplu: input + buton + lista",
      "Funcție `addTask(text)` care creează obiect `{ id, text, done }`",
      "Salvează array de task-uri în `localStorage.setItem('todos', JSON.stringify(tasks))`",
      "Funcție `render()` care redraw-ează lista din state",
      "Adaugă filtre cu variabilă `currentFilter`",
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
    <div className={`bg-white rounded-2xl shadow-sm overflow-hidden border-2 transition-all ${expanded ? "border-indigo-300 shadow-lg" : "border-transparent hover:border-indigo-100 hover:shadow-md"}`}>
      <button onClick={onToggle} className="w-full text-left p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap gap-1.5 mb-2">
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${diff.cls}`}>{diff.label}</span>
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${stack.cls}`}>{stack.label}</span>
            </div>
            <h3 className="font-black text-slate-800 text-base leading-snug">{project.title}</h3>
            <p className="text-slate-500 text-sm mt-1 leading-relaxed">{project.description}</p>
            <div className="flex items-center gap-3 mt-3 text-xs text-slate-400">
              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5"/> ~{project.hours}h</span>
            </div>
          </div>
          <div className={`flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${expanded ? "bg-indigo-100 text-indigo-600" : "bg-slate-100 text-slate-400"}`}>
            {expanded ? <ChevronUp className="w-4 h-4"/> : <ChevronDown className="w-4 h-4"/>}
          </div>
        </div>
      </button>

      {expanded && (
        <div className="px-5 pb-5 border-t border-slate-100 pt-4 space-y-5">
          {/* Ce vei construi */}
          <div>
            <h4 className="font-black text-slate-700 text-sm mb-2.5 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-indigo-500"/> Ce vei construi
            </h4>
            <ul className="space-y-1.5">
              {project.what.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                  <span className="w-5 h-5 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0 mt-0.5">{i + 1}</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Pași de implementare */}
          <div>
            <h4 className="font-black text-slate-700 text-sm mb-2.5 flex items-center gap-1.5">
              <Code2 className="w-4 h-4 text-emerald-500"/> Pași de implementare
            </h4>
            <ol className="space-y-2">
              {project.steps.map((step, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm">
                  <span className="w-5 h-5 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0 mt-0.5">{i + 1}</span>
                  <span className="text-slate-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: step.replace(/`([^`]+)`/g, "<code class='bg-slate-100 text-indigo-700 px-1 rounded font-mono text-xs'>$1</code>") }}/>
                </li>
              ))}
            </ol>
          </div>
        </div>
      )}
    </div>
  );
}

function GuideSection({ title, icon: Icon, items, color }) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm">
      <h3 className={`font-black text-sm mb-4 flex items-center gap-2 ${color}`}>
        <Icon className="w-4 h-4"/> {title}
      </h3>
      <div className="space-y-3">
        {items.map(item => (
          <div key={item.step} className="flex gap-3">
            <div className="w-7 h-7 bg-slate-100 rounded-full flex items-center justify-center text-xs font-black text-slate-600 flex-shrink-0">{item.step}</div>
            <div>
              <p className="font-bold text-slate-800 text-sm">{item.title}</p>
              <p className="text-xs text-slate-500 mt-0.5 leading-relaxed" dangerouslySetInnerHTML={{ __html: item.desc.replace(/`([^`]+)`/g, "<code class='bg-slate-100 text-indigo-700 px-1 rounded font-mono'>$1</code>") }}/>
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 pb-24">
      {/* Header */}
      <header className="bg-gradient-to-r from-indigo-700 to-purple-700 text-white shadow-lg sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-3">
          <Link href="/" className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
            <ArrowLeft className="w-5 h-5"/>
          </Link>
          <div className="flex items-center gap-2 flex-1">
            <div className="w-8 h-8 bg-yellow-400 rounded-xl flex items-center justify-center flex-shrink-0">
              <Star className="w-4 h-4 text-yellow-900"/>
            </div>
            <div>
              <h1 className="font-black text-base leading-none">Proiecte</h1>
              <p className="text-indigo-200 text-xs">Aplică ce ai învățat</p>
            </div>
          </div>
          <button
            onClick={() => setGuideOpen(o => !o)}
            className="text-xs bg-white/15 hover:bg-white/25 transition-colors px-3 py-1.5 rounded-full font-bold flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5"/> Ghid Deploy
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6 space-y-5">

        {/* Deploy Guide (collapsible) */}
        {guideOpen && (
          <div className="grid sm:grid-cols-2 gap-4">
            <GuideSection title="GitHub — Urcă codul" icon={GitBranch} items={GITHUB_GUIDE} color="text-slate-800"/>
            <GuideSection title="Vercel — Site live gratis" icon={Globe} items={VERCEL_GUIDE} color="text-indigo-700"/>
          </div>
        )}

        {/* Filters */}
        <div className="bg-white rounded-2xl p-4 shadow-sm space-y-3">
          <div>
            <p className="text-xs font-black text-slate-500 uppercase tracking-wider mb-2">Stack / Limbaj</p>
            <div className="flex flex-wrap gap-2">
              {STACKS.map(s => (
                <button key={s.v} onClick={() => setStack(s.v)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold border-2 transition-all
                    ${stack === s.v ? "border-indigo-500 bg-indigo-50 text-indigo-700" : "border-slate-200 text-slate-600 hover:border-indigo-200"}`}>
                  {s.l}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-black text-slate-500 uppercase tracking-wider mb-2">Dificultate</p>
            <div className="flex flex-wrap gap-2">
              {DIFFS.map(d => (
                <button key={d.v} onClick={() => setDiff(d.v)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold border-2 transition-all
                    ${diff === d.v ? "border-indigo-500 bg-indigo-50 text-indigo-700" : "border-slate-200 text-slate-600 hover:border-indigo-200"}`}>
                  {d.l}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="flex items-center gap-3 text-sm">
          <span className="text-slate-500">{filtered.length} proiecte</span>
          <span className="text-slate-300">•</span>
          <span className="flex items-center gap-1 text-slate-400 text-xs">
            <Zap className="w-3.5 h-3.5 text-yellow-400"/> Click pe un proiect pentru detalii complete
          </span>
        </div>

        {/* Project cards */}
        {filtered.length === 0 ? (
          <div className="bg-white rounded-2xl p-10 text-center shadow-sm">
            <p className="text-slate-500 font-semibold">Niciun proiect găsit cu filtrele selectate.</p>
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
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-5 text-white">
          <div className="flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 flex-shrink-0 mt-0.5 text-indigo-200"/>
            <div>
              <p className="font-black text-sm mb-2">Sfaturi pentru succes</p>
              <ul className="space-y-1.5 text-indigo-100 text-xs leading-relaxed">
                <li>• Comenzi cu un proiect ușor — finalizarea dă încredere</li>
                <li>• Fă pași mici: mai întâi HTML, apoi CSS, apoi JS</li>
                <li>• Urcă pe GitHub chiar dacă nu e gata — commit des</li>
                <li>• Folosește DevTools (F12) pentru debugging</li>
                <li>• Dacă ești blocat, întreabă asistentul AI (butonul violet de jos)</li>
              </ul>
            </div>
          </div>
        </div>

      </main>
      <Navbar/>
    </div>
  );
}
