"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { ArrowLeft, BookOpen, Search } from "lucide-react";

const TERMS = [
  // Frameworks/Concepte
  { word: "API", cat: "concept", def: "Application Programming Interface — un set de reguli care permite două aplicații să comunice între ele. De exemplu, când aplicația ta cere date de la un server, vorbește prin API.", ex: "fetch('https://api.exemplu.com/users')" },
  { word: "Backend", cat: "concept", def: "Partea serverului. Tot ce nu vezi în browser: baze de date, autentificare, logica de business. Opusul lui frontend.", ex: "Node.js, Django, Laravel sunt frameworks de backend" },
  { word: "Frontend", cat: "concept", def: "Partea pe care o vezi în browser. HTML, CSS, JavaScript, React, etc.", ex: "Tot ce e vizual și interactiv pe un site" },
  { word: "Full-stack", cat: "concept", def: "Programator care lucrează atât pe frontend cât și pe backend.", ex: "" },
  { word: "Framework", cat: "concept", def: "O colecție de instrumente și convenții care îți ușurează dezvoltarea unei aplicații. Te scapă de cod repetitiv.", ex: "React, Vue, Next.js, Laravel" },
  { word: "Library", cat: "concept", def: "Bibliotecă de cod — o colecție de funcții pe care le poți folosi. Diferența față de framework: tu apelezi library, framework-ul te apelează pe tine.", ex: "Axios, Lodash, Moment.js" },

  // Debugging
  { word: "Bug", cat: "debug", def: "O eroare în cod care produce comportament nedorit. Termenul vine din anii '40 când o molie a blocat un computer.", ex: "" },
  { word: "Debug", cat: "debug", def: "Procesul de găsire și rezolvare a bug-urilor.", ex: "Folosind console.log() sau breakpoints" },
  { word: "Console", cat: "debug", def: "Panoul din DevTools unde apar mesaje, erori și unde poți rula cod JavaScript.", ex: "Apasă F12 → Console" },
  { word: "DevTools", cat: "debug", def: "Instrumentele de dezvoltare din browser (F12). Ai Console, Network, Elements, etc.", ex: "" },
  { word: "Stack trace", cat: "debug", def: "Lista funcțiilor care au fost apelate până la momentul erorii. Citește de jos în sus pentru a urmări fluxul.", ex: "" },
  { word: "Breakpoint", cat: "debug", def: "Un punct unde execuția se oprește pentru a putea inspecta valorile variabilelor.", ex: "Click pe numărul liniei în DevTools" },
  { word: "Refactor", cat: "debug", def: "Rescrierea codului pentru a-l face mai curat, fără a schimba ce face.", ex: "" },

  // JS specific
  { word: "Async/Await", cat: "js", def: "Sintaxă pentru a lucra cu cod asincron (care durează — fetch, timer). Așteaptă o promisiune fără să blocheze browserul.", ex: "const data = await fetch(url)" },
  { word: "Callback", cat: "js", def: "O funcție trimisă ca argument către altă funcție, care o apelează când e gata.", ex: "setTimeout(() => alert('hi'), 1000)" },
  { word: "Promise", cat: "js", def: "Un obiect care reprezintă o valoare care va exista în viitor. Poate fi în 3 stări: pending, resolved, rejected.", ex: "fetch(url).then(res => ...)" },
  { word: "Closure", cat: "js", def: "O funcție care își amintește variabilele din scope-ul unde a fost creată, chiar și după ce acel scope a dispărut.", ex: "" },
  { word: "Hoisting", cat: "js", def: "JavaScript ridică declarațiile (var, function) în vârful scope-ului înainte de execuție. De aceea poți apela o funcție înainte de a o defini.", ex: "" },
  { word: "Scope", cat: "js", def: "Zona din cod unde o variabilă e accesibilă. Există global scope, function scope, block scope.", ex: "" },
  { word: "Spread", cat: "js", def: "Operatorul ... care extinde un array/obiect în elemente individuale.", ex: "const all = [...arr1, ...arr2]" },
  { word: "Destructuring", cat: "js", def: "Extragerea valorilor din array/obiect în variabile separate, scurt.", ex: "const { name, age } = user" },
  { word: "Arrow function", cat: "js", def: "Funcție săgeată — sintaxă scurtă pentru funcții. Nu are propriu this.", ex: "const sum = (a, b) => a + b" },
  { word: "Polyfill", cat: "js", def: "Cod care adaugă funcționalitate modernă în browsere vechi care nu o suportă.", ex: "" },
  { word: "Transpile", cat: "js", def: "Conversia codului dintr-un limbaj/versiune în altul. Babel transpilează ES2024 → ES5 pentru browsere vechi.", ex: "" },

  // Git/Deploy
  { word: "Commit", cat: "git", def: "Salvarea unei „fotografii\" a codului în istoric Git. Vine cu un mesaj care descrie ce ai schimbat.", ex: "git commit -m \"fix login bug\"" },
  { word: "Push", cat: "git", def: "Trimiterea commit-urilor locale către server (GitHub, GitLab).", ex: "git push origin main" },
  { word: "Pull", cat: "git", def: "Aducerea ultimelor schimbări de pe server în repo-ul local.", ex: "git pull" },
  { word: "Branch", cat: "git", def: "O linie paralelă de dezvoltare. Lucrezi pe o ramură separată, apoi o îmbini cu main.", ex: "git checkout -b feature-x" },
  { word: "Merge", cat: "git", def: "Combinarea a două branch-uri într-unul singur.", ex: "git merge feature-x" },
  { word: "Pull Request (PR)", cat: "git", def: "Cerere oficială să-ți fie acceptate schimbările într-un proiect. Echipa le revizuie și aprobă/respinge.", ex: "" },
  { word: "Rebase", cat: "git", def: "Mutarea commit-urilor pe baza unui alt branch. Alternativă la merge, dar mai \"curat\".", ex: "" },
  { word: "Deploy", cat: "git", def: "Punerea aplicației pe un server astfel încât utilizatorii s-o poată accesa.", ex: "Vercel deploy" },
  { word: "CI/CD", cat: "git", def: "Continuous Integration / Continuous Deployment. Automatizarea testării și deploy-ului la fiecare commit.", ex: "GitHub Actions" },
  { word: "Repo", cat: "git", def: "Repository — un proiect Git cu istoric și fișiere.", ex: "" },
  { word: "Fork", cat: "git", def: "Copierea unui repo în contul tău pentru a-l modifica independent.", ex: "" },

  // Web
  { word: "HTTP", cat: "web", def: "Protocolul prin care browserul vorbește cu serverul. Are metode: GET (citește), POST (creează), PUT (modifică), DELETE (șterge).", ex: "" },
  { word: "HTTPS", cat: "web", def: "HTTP securizat — date criptate. Esențial pentru orice site modern.", ex: "" },
  { word: "REST", cat: "web", def: "Representational State Transfer — stil de arhitectură pentru API-uri folosind HTTP. URL-urile reprezintă resurse: /users, /users/42.", ex: "" },
  { word: "JSON", cat: "web", def: "JavaScript Object Notation — formatul standard de date pe web.", ex: "{ \"name\": \"Ana\", \"age\": 25 }" },
  { word: "CORS", cat: "web", def: "Cross-Origin Resource Sharing — regula browser-ului care blochează request-uri între domenii diferite, dacă serverul nu le permite explicit.", ex: "" },
  { word: "Cookie", cat: "web", def: "Date mici stocate de browser. Folosite pentru autentificare, preferințe, tracking.", ex: "" },
  { word: "LocalStorage", cat: "web", def: "Stocare în browser, persistă după închidere. Doar pentru date mici, neimportante de securitate.", ex: "localStorage.setItem('theme', 'dark')" },
  { word: "Cache", cat: "web", def: "Memorie temporară pentru date des accesate. Browserul cachează imagini, CSS, etc. pentru a încărca mai rapid.", ex: "" },
  { word: "CDN", cat: "web", def: "Content Delivery Network — rețea de servere distribuite global. Servește fișierele de la cel mai apropiat utilizatorului.", ex: "Cloudflare, Vercel Edge" },
  { word: "DNS", cat: "web", def: "Domain Name System — convertește devzone.vercel.app în IP. \"Cartea de telefoane\" a internetului.", ex: "" },
  { word: "SSL/TLS", cat: "web", def: "Certificat care criptează comunicarea HTTPS.", ex: "" },

  // Slang
  { word: "Hardcoded", cat: "slang", def: "Valoare scrisă direct în cod, fără posibilitate de modificare. Anti-pattern — folosește variabile de mediu sau config.", ex: "const API_KEY = 'abc123' (rău)" },
  { word: "Boilerplate", cat: "slang", def: "Cod repetitiv, standard, pe care îl scrii la fiecare proiect. Frameworks-urile reduc boilerplate-ul.", ex: "" },
  { word: "Dependency", cat: "slang", def: "Pachet/bibliotecă pe care proiectul tău o folosește. Salvate în package.json.", ex: "" },
  { word: "Edge case", cat: "slang", def: "Caz limită, neașteptat. Ex: array gol, string cu spații, divizare la zero.", ex: "" },
  { word: "Race condition", cat: "slang", def: "Bug care apare când două procese rulează în paralel și ordinea contează.", ex: "" },
  { word: "Spaghetti code", cat: "slang", def: "Cod dezorganizat, greu de urmărit. Multă logică încurcată.", ex: "" },
  { word: "DRY", cat: "slang", def: "Don't Repeat Yourself — principiu: nu duplica logica, extrage în funcții/componente.", ex: "" },
  { word: "KISS", cat: "slang", def: "Keep It Simple, Stupid — păstrează codul simplu. Soluția cea mai simplă e adesea cea mai bună.", ex: "" },
  { word: "YAGNI", cat: "slang", def: "You Aren't Gonna Need It — nu scrie cod pentru viitor incert. Adaugă features când ai cu adevărat nevoie.", ex: "" },
  { word: "MVP", cat: "slang", def: "Minimum Viable Product — versiunea cea mai simplă care funcționează. Pornești cu MVP, apoi adaugi.", ex: "" },
  { word: "Tech debt", cat: "slang", def: "Datorie tehnică — cod scris rapid acum, dar care va costa timp să-l corectezi mai târziu.", ex: "" },
  { word: "PoC", cat: "slang", def: "Proof of Concept — un prototip rapid pentru a demonstra că o idee funcționează.", ex: "" },
  { word: "Linting", cat: "slang", def: "Verificarea automată a calității codului (stilare, posibile erori). ESLint pentru JS.", ex: "" },
  { word: "Mock", cat: "slang", def: "Date false folosite în teste sau dezvoltare ca să nu lovești serverul real.", ex: "" },
  { word: "Bleeding edge", cat: "slang", def: "Tehnologie foarte nouă, instabilă, dar cu features de top. Riscant pentru producție.", ex: "" },
  { word: "Yak shaving", cat: "slang", def: "Când plecă să fac task A, dar trebuie să rezolvi B, care necesită C... Te trezești la 3 ore distanță de A.", ex: "" },
  { word: "Rubber duck debugging", cat: "slang", def: "Explică problema cu voce tare unui obiect (rățușcă) — adesea îți dai seama de soluție explicând-o.", ex: "" },
  { word: "RTFM", cat: "slang", def: "Read The F**ing Manual — citește documentația, e acolo.", ex: "" },
  { word: "LGTM", cat: "slang", def: "Looks Good To Me — comentariu standard la code review când totul e ok.", ex: "" },
  { word: "WIP", cat: "slang", def: "Work In Progress — nu e gata, în lucru.", ex: "" },
  { word: "Sandbox", cat: "slang", def: "Mediu izolat pentru testare, fără efecte asupra producției.", ex: "" },
];

const CATEGORIES = [
  { v: "all",     l: "Toate",     cls: "bg-slate-500" },
  { v: "concept", l: "Concept",   cls: "bg-indigo-500" },
  { v: "js",      l: "JavaScript", cls: "bg-yellow-500" },
  { v: "git",     l: "Git/Deploy", cls: "bg-orange-500" },
  { v: "web",     l: "Web",       cls: "bg-blue-500" },
  { v: "debug",   l: "Debugging", cls: "bg-red-500" },
  { v: "slang",   l: "Slang",     cls: "bg-pink-500" },
];

export default function DictionarPage() {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("all");

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return TERMS.filter(t =>
      (cat === "all" || t.cat === cat) &&
      (!q || t.word.toLowerCase().includes(q) || t.def.toLowerCase().includes(q))
    ).sort((a, b) => a.word.localeCompare(b.word, 'ro'));
  }, [query, cat]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 pb-24">
      <header className="bg-gradient-to-r from-indigo-700 to-purple-700 text-white shadow-lg sticky top-0 z-40">
        <div className="max-w-3xl mx-auto px-3 sm:px-4 py-2.5 flex items-center gap-2">
          <Link href="/" className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors active:scale-95 flex-shrink-0">
            <ArrowLeft className="w-5 h-5"/>
          </Link>
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <div className="w-9 h-9 bg-yellow-400 rounded-xl flex items-center justify-center flex-shrink-0">
              <BookOpen className="w-4 h-4 text-yellow-900"/>
            </div>
            <div className="min-w-0">
              <h1 className="font-black text-base leading-tight">Dicționar Dev</h1>
              <p className="text-indigo-200 text-[11px] leading-tight">Termeni și slang programare</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-3 sm:px-4 py-4 sm:py-6 space-y-4">

        {/* Search */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-3 sm:p-4 shadow-sm space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none"/>
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Caută un termen (ex: callback, deploy, async)..."
              className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white focus:border-indigo-500 focus:outline-none text-sm"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto scrollbar-hide -mx-1 px-1 pb-1">
            {CATEGORIES.map(c => (
              <button key={c.v} onClick={() => setCat(c.v)}
                className={`flex-shrink-0 px-3 py-2 rounded-xl text-xs font-bold border-2 transition-all active:scale-95
                  ${cat === c.v
                    ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300"
                    : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-indigo-200"}`}>
                {c.l}
              </button>
            ))}
          </div>
        </div>

        <p className="text-xs text-slate-500 dark:text-slate-400 px-1">{filtered.length} termen{filtered.length !== 1 ? "i" : ""}</p>

        {/* Terms */}
        {filtered.length === 0 ? (
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-10 text-center shadow-sm">
            <p className="text-slate-500 dark:text-slate-400 font-semibold">Niciun termen găsit.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map(t => {
              const catInfo = CATEGORIES.find(c => c.v === t.cat) ?? CATEGORIES[0];
              return (
                <article key={t.word} className="bg-white dark:bg-slate-800 rounded-2xl p-4 sm:p-5 shadow-sm">
                  <div className="flex items-start gap-3 mb-2">
                    <h2 className="font-black text-slate-800 dark:text-white text-base sm:text-lg flex-1 leading-tight">{t.word}</h2>
                    <span className={`text-[10px] sm:text-xs font-bold px-2 py-1 rounded-full text-white flex-shrink-0 ${catInfo.cls}`}>
                      {catInfo.l}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{t.def}</p>
                  {t.ex && (
                    <div className="mt-2.5 bg-slate-50 dark:bg-slate-900/50 rounded-lg p-2.5 border border-slate-100 dark:border-slate-700">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Exemplu</p>
                      <code className="text-xs font-mono text-indigo-700 dark:text-indigo-300 break-words">{t.ex}</code>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        )}
      </main>
      <Navbar/>
    </div>
  );
}
