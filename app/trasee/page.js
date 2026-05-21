"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Compass, ChevronDown, ChevronUp, Rocket, Map, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";

const PATHS = [
  {
    id: "fullstack",
    title: "Full-Stack Web",
    icon: "🌐",
    color: "from-blue-500 to-cyan-500",
    bg: "bg-blue-50 dark:bg-blue-950/30",
    border: "border-blue-200 dark:border-blue-800",
    accent: "text-blue-600 dark:text-blue-400",
    badge: "bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300",
    category: "HTML · CSS · JS · React · Next.js",
    tagline: "Construiești aplicații web complete, de la design la server",
    languages: ["HTML", "CSS", "JavaScript", "React", "Next.js", "Node.js"],
    description: "Cel mai căutat profil tech. Stăpânești atât frontend-ul (ce vede utilizatorul) cât și backend-ul (logica și baza de date). Poți construi orice produs web de unul singur.",
    roles: [
      { title: "Junior Full-Stack Dev", salary: "800–1.200€", demand: "Foarte mare" },
      { title: "Mid Full-Stack Dev", salary: "1.500–2.500€", demand: "Foarte mare" },
      { title: "Senior Full-Stack Dev", salary: "3.000–5.000€", demand: "Mare" },
    ],
    bigProject: {
      title: "Platformă E-Learning",
      desc: "Construiește o platformă completă de cursuri online cu autentificare, lecții video, quiz-uri și dashboard de progres — exact ca DevZone.",
      hours: "80–120h",
      tech: ["Next.js 15", "React 19", "MongoDB", "Prisma", "JWT", "Tailwind", "Vercel"],
      features: ["Autentificare JWT", "Dashboard admin", "Player video cu progres", "Quiz interactiv cu scor", "Certificate descărcabile", "Plăți Stripe"],
      steps: [
        "Proiectează schema DB (users, courses, progress)",
        "Auth flow complet (register/login/JWT)",
        "CRUD cursuri cu editor rich-text",
        "Player video cu progres salvat",
        "Quiz engine cu scor și statistici",
        "Deploy pe Vercel + domeniu custom",
      ],
    },
    roadmap: [
      { phase: "Fundații Web", duration: "2–3 luni", topics: ["HTML5 semantic", "CSS3 + Flexbox + Grid", "JavaScript ES6+", "DOM + Events", "Fetch API + async/await"] },
      { phase: "Frontend Modern", duration: "2–3 luni", topics: ["React hooks", "State management", "React Router", "Tailwind CSS", "TypeScript basics"] },
      { phase: "Backend & Full-Stack", duration: "3–4 luni", topics: ["Node.js + Express", "REST API design", "MongoDB + Prisma", "Auth (JWT/OAuth)", "Next.js App Router"] },
      { phase: "Profesional", duration: "2–3 luni", topics: ["Testing (Jest/Playwright)", "Docker basics", "CI/CD", "Web performance", "SEO + Core Web Vitals"] },
    ],
  },
  {
    id: "ai-ml",
    title: "AI & Machine Learning",
    icon: "🤖",
    color: "from-purple-500 to-pink-500",
    bg: "bg-purple-50 dark:bg-purple-950/30",
    border: "border-purple-200 dark:border-purple-800",
    accent: "text-purple-600 dark:text-purple-400",
    badge: "bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300",
    category: "Python · TensorFlow · PyTorch",
    tagline: "Antrenezi modele care învață și iau decizii autonome",
    languages: ["Python", "TensorFlow", "PyTorch", "scikit-learn", "Pandas", "LangChain"],
    description: "Domeniu cu cea mai rapidă creștere. Construiești sisteme care recunosc imagini, înțeleg text natural și prezic comportamente — de la recomandări Netflix la modele GPT.",
    roles: [
      { title: "ML Engineer Junior", salary: "1.200–1.800€", demand: "Explozivă" },
      { title: "ML Engineer Mid", salary: "2.500–4.000€", demand: "Explozivă" },
      { title: "AI Research Scientist", salary: "5.000–10.000€", demand: "Mare" },
    ],
    bigProject: {
      title: "Asistent AI cu Memorie",
      desc: "Construiești un chatbot AI cu RAG (Retrieval-Augmented Generation) care se antrenează pe documente proprii și răspunde contextual cu memorie pe termen lung.",
      hours: "60–100h",
      tech: ["Python", "FastAPI", "LangChain", "OpenAI API", "Pinecone", "React", "Docker"],
      features: ["RAG cu documente PDF/Word", "Memorie conversație persistentă", "Fine-tuning pe date proprii", "API REST streaming", "UI chat React", "Deploy pe Railway"],
      steps: [
        "Setup Python + FastAPI + environment",
        "Integrare LangChain + OpenAI GPT-4",
        "Vector DB cu Pinecone (embeddings)",
        "RAG pipeline cu chunking + retrieval",
        "Frontend React cu streaming SSE",
        "Deploy Docker pe Railway/Render",
      ],
    },
    roadmap: [
      { phase: "Python pentru Date", duration: "1–2 luni", topics: ["Python avansat", "NumPy + Pandas", "Matplotlib + Seaborn", "Jupyter notebooks", "Virtual environments"] },
      { phase: "ML Clasic", duration: "2–3 luni", topics: ["Regresie liniară/logistică", "Decision Trees + Random Forest", "SVM + KNN", "scikit-learn pipelines", "Evaluare + metrici"] },
      { phase: "Deep Learning", duration: "3–4 luni", topics: ["Rețele neuronale", "CNN pentru imagini", "RNN + LSTM", "Transformers + Attention", "PyTorch / TensorFlow"] },
      { phase: "LLMs & GenAI", duration: "2–3 luni", topics: ["Prompt engineering", "Fine-tuning LLMs", "RAG + vector DB", "LangChain / LlamaIndex", "Deployment modele"] },
    ],
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity",
    icon: "🛡️",
    color: "from-red-500 to-orange-500",
    bg: "bg-red-50 dark:bg-red-950/30",
    border: "border-red-200 dark:border-red-800",
    accent: "text-red-600 dark:text-red-400",
    badge: "bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300",
    category: "Python · C · Bash · Linux",
    tagline: "Aperi sistemele și găsești vulnerabilitățile înainte de hackeri",
    languages: ["Python", "C", "Bash", "Wireshark", "Metasploit", "Nmap"],
    description: "Protejezi companii de atacuri cibernetice. Există o criză globală de specialiști — cerere enormă, salarii mari, muncă mereu nouă și provocatoare.",
    roles: [
      { title: "Security Analyst", salary: "1.000–1.500€", demand: "Foarte mare" },
      { title: "Penetration Tester", salary: "2.000–3.500€", demand: "Foarte mare" },
      { title: "Security Architect", salary: "4.000–7.000€", demand: "Mare" },
    ],
    bigProject: {
      title: "Platformă CTF & Hacking Lab",
      desc: "Construiești o platformă Capture The Flag cu provocări de hacking etic, scoreboard live și mașini virtuale vulnerabile izolate în Docker.",
      hours: "80–120h",
      tech: ["Python", "Flask", "Docker", "Linux", "PostgreSQL", "Nginx", "WebSockets"],
      features: ["Provocări web/pwn/crypto/forensics", "Scoreboard real-time WebSocket", "Sandbox Docker izolat", "Hints cu penalizare scor", "Certificate participanți PDF", "API REST complet"],
      steps: [
        "Arhitectură Docker + networking izolat",
        "Mașini vulnerabile (DVWA + custom apps)",
        "Backend Flask + challenge scoring engine",
        "Scoreboard live cu WebSockets",
        "Frontend minimal + autentificare",
        "Deploy securizat pe VPS Linux",
      ],
    },
    roadmap: [
      { phase: "Fundații", duration: "2–3 luni", topics: ["Linux + Bash scripting", "Rețele (TCP/IP, DNS, HTTP)", "Python pentru security", "Criptografie de bază"] },
      { phase: "Ethical Hacking", duration: "3–4 luni", topics: ["OWASP Top 10", "Web app pentesting", "Burp Suite", "Nmap + Metasploit", "SQL injection, XSS, IDOR"] },
      { phase: "Specializare", duration: "3–4 luni", topics: ["Reverse engineering", "Binary exploitation (pwn)", "Malware analysis", "Digital forensics", "CTF competitions"] },
      { phase: "Certificări", duration: "2–4 luni", topics: ["CompTIA Security+", "CEH", "OSCP (avansat)", "Bug bounty programs", "HackTheBox / TryHackMe"] },
    ],
  },
  {
    id: "data-science",
    title: "Data Science",
    icon: "📊",
    color: "from-emerald-500 to-teal-500",
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
    border: "border-emerald-200 dark:border-emerald-800",
    accent: "text-emerald-600 dark:text-emerald-400",
    badge: "bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300",
    category: "Python · SQL · R",
    tagline: "Transformi datele brute în decizii de business de milioane",
    languages: ["Python", "SQL", "R", "Tableau", "Power BI", "Spark"],
    description: "Analizezi milioane de rânduri de date pentru a descoperi pattern-uri ascunse. Ghidezi strategia companiei cu cifre, nu cu intuiție. Rol esențial în orice companie modernă.",
    roles: [
      { title: "Data Analyst", salary: "900–1.400€", demand: "Foarte mare" },
      { title: "Data Scientist", salary: "1.800–3.000€", demand: "Explozivă" },
      { title: "ML/AI Data Scientist", salary: "3.000–6.000€", demand: "Explozivă" },
    ],
    bigProject: {
      title: "Dashboard Business Intelligence",
      desc: "Analizezi un dataset real de 1M+ înregistrări, construiești modele predictive pentru churn și creezi un dashboard interactiv pentru management.",
      hours: "50–80h",
      tech: ["Python", "Pandas", "scikit-learn", "Plotly Dash", "PostgreSQL", "Docker"],
      features: ["ETL pipeline automat", "Analiză exploratorie (EDA)", "Model predictiv churn", "Dashboard interactiv Dash", "Rapoarte automate PDF", "API REST pentru date live"],
      steps: [
        "Import + curățare dataset (missing values, outliers)",
        "Analiză exploratorie vizuală (EDA)",
        "Feature engineering + selecție variabile",
        "Antrenare + evaluare model predictiv",
        "Dashboard Plotly Dash interactiv",
        "Deploy + rapoarte automate săptămânale",
      ],
    },
    roadmap: [
      { phase: "Bazele", duration: "1–2 luni", topics: ["Python + Pandas + NumPy", "SQL avansat (joins, window functions)", "Statistică descriptivă", "Vizualizare (Matplotlib, Seaborn)"] },
      { phase: "Analiză Avansată", duration: "2–3 luni", topics: ["Statistică inferențială", "A/B testing", "Time series analysis", "Business metrics + KPIs"] },
      { phase: "Machine Learning", duration: "2–3 luni", topics: ["ML clasic cu scikit-learn", "Feature selection + engineering", "Cross-validation + hyperparameter tuning", "Model deployment (FastAPI)"] },
      { phase: "BI & Cloud", duration: "2–3 luni", topics: ["Tableau / Power BI", "Apache Spark", "Cloud data tools (AWS/GCP)", "Storytelling cu date"] },
    ],
  },
  {
    id: "gamedev",
    title: "Game Development",
    icon: "🎮",
    color: "from-violet-500 to-purple-600",
    bg: "bg-violet-50 dark:bg-violet-950/30",
    border: "border-violet-200 dark:border-violet-800",
    accent: "text-violet-600 dark:text-violet-400",
    badge: "bg-violet-100 dark:bg-violet-900/50 text-violet-700 dark:text-violet-300",
    category: "C++ · C# · Unity · Unreal",
    tagline: "Creezi lumile virtuale în care milioane de oameni trăiesc aventuri",
    languages: ["C++", "C#", "Unity", "Unreal Engine 5", "GLSL/HLSL"],
    description: "Combini programare, matematică 3D și creativitate. C# cu Unity domină dev-ul indie și mobile. C++ cu Unreal Engine 5 — jocuri AAA triple-A. Industrie globală de 200 miliarde $.",
    roles: [
      { title: "Junior Game Developer", salary: "700–1.100€", demand: "Moderată" },
      { title: "Game Developer", salary: "1.500–2.500€", demand: "Moderată" },
      { title: "Senior / Lead Dev", salary: "2.500–5.000€", demand: "Moderată" },
    ],
    bigProject: {
      title: "Joc Roguelike 2D (Unity + C#)",
      desc: "Construiești un roguelike complet: generare procedurală de dungeons, sistem de combat turn-based, inamici cu AI, sistem de iteme și save/load.",
      hours: "100–160h",
      tech: ["Unity", "C#", "Cinemachine", "NavMesh", "Tilemaps", "ScriptableObjects", "DOTween"],
      features: ["Generare procedurală hărți", "Combat turn-based + animații", "AI inamic cu state machine", "Inventar + loot + drops", "Save/load game state", "Sfx + muzică adaptivă"],
      steps: [
        "Setup Unity + structură proiect + Git LFS",
        "Generare dungeon procedural (BSP/drunk walk)",
        "Player controller + animații sprite",
        "Combat system + HP UI + efecte",
        "Inamici cu AI (Finite State Machine)",
        "Inventar + drops + save system (JSON)",
      ],
    },
    roadmap: [
      { phase: "C# + Unity Fundații", duration: "2–3 luni", topics: ["C# OOP complet", "Unity Editor + Inspector", "Scripting components", "Physics 2D/3D", "Animații + Animator"] },
      { phase: "Game Systems", duration: "2–3 luni", topics: ["New Input System", "UI Toolkit + Canvas", "Audio Manager", "Particle effects", "ScriptableObjects pattern"] },
      { phase: "Jocuri Complete", duration: "3–4 luni", topics: ["Design patterns (State, Observer)", "AI pentru inamici (FSM/BT)", "Generare procedurală", "Save system", "Shader Graph"] },
      { phase: "C++ & Unreal (opțional)", duration: "3–5 luni", topics: ["C++ avansat + pointers", "Unreal Engine 5 + Blueprints", "Nanite + Lumen rendering", "Multiplayer basics", "Profiling + optimizare"] },
    ],
  },
  {
    id: "systems",
    title: "Systems & Embedded",
    icon: "⚙️",
    color: "from-slate-500 to-zinc-600",
    bg: "bg-slate-50 dark:bg-slate-900/50",
    border: "border-slate-200 dark:border-slate-700",
    accent: "text-slate-600 dark:text-slate-400",
    badge: "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300",
    category: "C · C++ · Assembly",
    tagline: "Programezi hardware real — de la microcontrollere la sisteme de operare",
    languages: ["C", "C++", "Assembly", "Linux", "FreeRTOS", "Rust"],
    description: "Cel mai apropiat nivel de hardware. Controlezi memorie, procese și dispozitive fizice. Baza pe care rulează tot restul software-ului. Salarii mari, concurență mică.",
    roles: [
      { title: "Embedded Developer", salary: "1.000–1.600€", demand: "Mare" },
      { title: "Systems Programmer", salary: "1.800–3.000€", demand: "Mare" },
      { title: "Kernel / Driver Dev", salary: "3.000–6.000€", demand: "Moderată" },
    ],
    bigProject: {
      title: "Sistem IoT de Monitorizare",
      desc: "Construiești un sistem complet care citește senzori (temperatură, umiditate, mișcare) și trimite date în timp real pe un dashboard web cu alerte.",
      hours: "60–100h",
      tech: ["C", "ESP32", "FreeRTOS", "MQTT", "Python", "InfluxDB", "Grafana"],
      features: ["Citire multi-senzori (I2C/SPI)", "Comunicare MQTT/WiFi", "RTOS task scheduling", "Stocare locală SD card", "Dashboard Grafana", "Alertă email la prag depășit"],
      steps: [
        "Setup ESP32 + FreeRTOS + toolchain",
        "Drivere senzori (DHT22, PIR, I2C)",
        "MQTT broker (Mosquitto) + WiFi",
        "SD card logging + timestamps",
        "Backend Python + InfluxDB time series",
        "Dashboard Grafana + reguli alertă",
      ],
    },
    roadmap: [
      { phase: "C Fundamental", duration: "2–3 luni", topics: ["Pointeri + aritmetică pointeri", "Alocare dinamică (malloc/free)", "Structuri + unions", "Makefile + GCC + GDB"] },
      { phase: "C++ & OOP", duration: "2–3 luni", topics: ["Clase + moștenire + polimorfism", "Templates + STL", "Smart pointers + RAII", "Move semantics (C++17/20)"] },
      { phase: "Embedded & OS", duration: "3–4 luni", topics: ["Microcontrollere (Arduino, ESP32, STM32)", "FreeRTOS tasks + queues", "Protocoale hardware (I2C, SPI, UART)", "Linux system calls + procese"] },
      { phase: "Advanced Systems", duration: "3–5 luni", topics: ["OS internals (scheduling, paging)", "Concurență + mutexuri + race conditions", "Memory-mapped I/O", "Rust basics (borrow checker)", "Kernel module writing"] },
    ],
  },
  {
    id: "java",
    title: "Enterprise & Android",
    icon: "☕",
    color: "from-amber-500 to-orange-500",
    bg: "bg-amber-50 dark:bg-amber-950/30",
    border: "border-amber-200 dark:border-amber-800",
    accent: "text-amber-600 dark:text-amber-400",
    badge: "bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300",
    category: "Java · Kotlin · Spring Boot",
    tagline: "Construiești sisteme bancare, aplicații Android și microservicii la scară",
    languages: ["Java", "Kotlin", "Spring Boot", "Android SDK", "Hibernate", "Maven"],
    description: "Java rămâne coloana vertebrală a enterprise-ului global. Banking, asigurări, guvern, Amazon backend — toate rulează pe Spring Boot. Kotlin a revolutionat Android dev.",
    roles: [
      { title: "Android Developer", salary: "1.000–1.600€", demand: "Mare" },
      { title: "Java Backend Dev", salary: "1.500–2.500€", demand: "Mare" },
      { title: "Java Architect", salary: "3.000–6.000€", demand: "Moderată" },
    ],
    bigProject: {
      title: "Aplicație Bancară Mobile",
      desc: "Construiești o aplicație bancară Android completă cu autentificare biometrică, transferuri, istoric tranzacții paginat și notificări push.",
      hours: "80–120h",
      tech: ["Kotlin", "Jetpack Compose", "Spring Boot", "PostgreSQL", "Firebase", "Retrofit"],
      features: ["Autentificare biometrică", "Transfer fonduri cu validare", "Istoric tranzacții paginat", "Notificări push Firebase", "Grafice cheltuieli", "Mod offline cu Room"],
      steps: [
        "Spring Boot REST API + auth JWT",
        "Setup Android + Jetpack Compose",
        "Ecrane autentificare + biometrie (BiometricPrompt)",
        "Transfer + validare tranzacții + istoric",
        "Notificări Firebase Cloud Messaging",
        "Grafice + statistici cheltuieli lunare",
      ],
    },
    roadmap: [
      { phase: "Java Core", duration: "2–3 luni", topics: ["OOP în Java", "Collections + Generics", "Concurență (threads, CompletableFuture)", "Maven + Gradle", "Testing (JUnit 5)"] },
      { phase: "Spring Ecosystem", duration: "2–3 luni", topics: ["Spring Boot REST", "Spring Data JPA + Hibernate", "Spring Security + JWT", "Docker + Docker Compose", "Swagger/OpenAPI"] },
      { phase: "Android cu Kotlin", duration: "3–4 luni", topics: ["Kotlin corutine + Flow", "Jetpack Compose UI", "Navigation Component", "Retrofit + Room", "ViewModel + LiveData"] },
      { phase: "Enterprise & Cloud", duration: "2–3 luni", topics: ["Microservicii + API Gateway", "Apache Kafka basics", "AWS / GCP deployment", "Kubernetes basics", "CI/CD (GitHub Actions)"] },
    ],
  },
  {
    id: "dotnet",
    title: ".NET & Unity (C#)",
    icon: "🔷",
    color: "from-indigo-500 to-blue-600",
    bg: "bg-indigo-50 dark:bg-indigo-950/30",
    border: "border-indigo-200 dark:border-indigo-800",
    accent: "text-indigo-600 dark:text-indigo-400",
    badge: "bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300",
    category: "C# · ASP.NET · Unity",
    tagline: "De la aplicații enterprise Microsoft la jocuri indie/AAA cu Unity",
    languages: ["C#", "ASP.NET Core", "Unity", "LINQ", "Entity Framework", "Blazor"],
    description: "C# este limbajul Microsoft cu dublă personalitate — backend enterprise robust cu ASP.NET Core și game development indie/AAA cu Unity, cel mai popular engine de jocuri din lume cu peste 50% cotă de piață.",
    unityHighlight: true,
    roles: [
      { title: ".NET Developer", salary: "1.200–2.000€", demand: "Mare" },
      { title: "Unity Developer", salary: "1.000–2.000€", demand: "Moderată" },
      { title: "Senior .NET Architect", salary: "3.000–6.000€", demand: "Mare" },
    ],
    bigProject: {
      title: "Joc Multiplayer + Backend ASP.NET",
      desc: "Construiești un joc 3D multiplayer cu Unity (C#) conectat la un backend ASP.NET Core pentru autentificare, leaderboard global și matchmaking în timp real.",
      hours: "120–180h",
      tech: ["Unity", "C#", "ASP.NET Core", "SignalR", "Entity Framework Core", "SQL Server", "Azure"],
      features: ["Joc 3D 2–4 jucători online", "Backend REST + WebSocket (SignalR)", "Autentificare + profil jucător", "Leaderboard global + statistici", "Matchmaking automat", "Anti-cheat basic"],
      steps: [
        "ASP.NET Core API + auth JWT + Entity Framework",
        "SignalR hub pentru comunicare real-time",
        "Unity client + NetworkManager (Netcode for GO)",
        "Leaderboard + sistem scoruri + statistici",
        "Matchmaking logic + room management",
        "Deploy Azure App Service + Unity Cloud Build",
      ],
    },
    roadmap: [
      { phase: "C# Fundații", duration: "2–3 luni", topics: ["C# avansat (delegates, events, LINQ)", "async/await + Task Parallel Library", "OOP + design patterns", "Visual Studio / JetBrains Rider"] },
      { phase: "ASP.NET Core", duration: "2–3 luni", topics: ["REST API + Minimal APIs", "Entity Framework Core", "Identity + JWT + OAuth", "SignalR real-time", "Testing (xUnit)"] },
      { phase: "Unity Game Dev", duration: "3–4 luni", topics: ["Unity Engine complet", "C# pentru jocuri + MonoBehaviour", "Physics + animations + particles", "Shader Graph + HDRP/URP", "Unity Netcode (multiplayer)"] },
      { phase: "Azure & DevOps", duration: "2–3 luni", topics: ["Azure App Service + SQL", "Azure DevOps CI/CD", "Application Insights", "Blazor WebAssembly (optional)", ".NET MAUI pentru mobile"] },
    ],
  },
  {
    id: "php",
    title: "PHP Web Backend",
    icon: "🐘",
    color: "from-fuchsia-500 to-violet-500",
    bg: "bg-fuchsia-50 dark:bg-fuchsia-950/30",
    border: "border-fuchsia-200 dark:border-fuchsia-800",
    accent: "text-fuchsia-600 dark:text-fuchsia-400",
    badge: "bg-fuchsia-100 dark:bg-fuchsia-900/50 text-fuchsia-700 dark:text-fuchsia-300",
    category: "PHP · Laravel · MySQL",
    tagline: "Alimentează 79% din web-ul global — de la WordPress la produse SaaS moderne",
    languages: ["PHP", "Laravel", "MySQL", "Blade", "Livewire", "Composer"],
    description: "PHP 8+ modern este surprinzător de elegant și productiv. Laravel este unul din cele mai apreciate framework-uri web — ideal pentru produse SaaS, e-commerce și aplicații business rapid.",
    roles: [
      { title: "PHP/Laravel Developer", salary: "900–1.400€", demand: "Mare" },
      { title: "Senior Laravel Dev", salary: "1.800–2.800€", demand: "Mare" },
      { title: "WordPress Dev/Architect", salary: "700–1.500€", demand: "Foarte mare" },
    ],
    bigProject: {
      title: "SaaS de Facturare",
      desc: "Construiești o platformă SaaS completă pentru facturare — multi-tenant cu subdomenii, abonamente Stripe, generare PDF și dashboard analytics.",
      hours: "70–110h",
      tech: ["Laravel 11", "Livewire 3", "MySQL", "Stripe Billing", "DomPDF", "Tailwind CSS"],
      features: ["Multi-tenant cu subdomenii", "Abonamente Stripe + trial", "Generare PDF facturi", "Email automat tranzacțional", "Dashboard revenue + grafice", "API REST pentru integrări"],
      steps: [
        "Laravel + Jetstream + multi-tenancy setup",
        "CRUD clienți + produse + prețuri",
        "Generare facturi PDF (DomPDF/Snappy)",
        "Integrare Stripe Billing + webhook",
        "Email automat (Mailable + queues)",
        "Dashboard grafice + statistici (Chart.js)",
      ],
    },
    roadmap: [
      { phase: "PHP Modern", duration: "1–2 luni", topics: ["PHP 8+ (union types, enums, fiber, match)", "OOP + patterns", "Composer + autoloading", "PHP-FPM + Nginx"] },
      { phase: "Laravel", duration: "2–3 luni", topics: ["Routing + Controllers + Middleware", "Eloquent ORM + relationships", "Blade templates", "Queues + Jobs + Events", "Testing (PHPUnit + Pest)"] },
      { phase: "Frontend Integrat", duration: "2–3 luni", topics: ["Livewire (SPA-like fără JS)", "Inertia.js + Vue/React", "Tailwind CSS", "Alpine.js", "API REST + Sanctum"] },
      { phase: "SaaS & Productie", duration: "2–3 luni", topics: ["Multi-tenancy patterns", "Stripe / Paddle billing", "Redis + queues + caching", "Docker + Laravel Forge/Ploi", "Monitoring + Telescope"] },
    ],
  },
];

export default function TraseePage() {
  const [expanded, setExpanded] = useState(null);
  const [tabs, setTabs] = useState({});

  function toggle(id) {
    setExpanded(e => (e === id ? null : id));
    setTabs(t => ({ ...t, [id]: t[id] || "project" }));
  }

  function setTab(id, tab) {
    setTabs(t => ({ ...t, [id]: tab }));
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 pb-24">
      <header className="bg-gradient-to-r from-indigo-700 to-purple-700 text-white shadow-lg sticky top-0 z-40">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-3">
          <Link href="/" className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors active:scale-95">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex items-center gap-2.5 flex-1 min-w-0">
            <div className="w-9 h-9 bg-emerald-400 rounded-xl flex items-center justify-center flex-shrink-0">
              <Compass className="w-4 h-4 text-emerald-900" />
            </div>
            <div className="min-w-0">
              <h1 className="font-black text-base leading-tight">Trasee de Carieră</h1>
              <p className="text-indigo-200 text-xs leading-tight">9 drumuri clare în tech</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-5">
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-5 leading-relaxed">
          Alege un limbaj, descoperă ce poți construi cu el și urmează roadmap-ul pas cu pas până la primul job.
        </p>

        <div className="space-y-3">
          {PATHS.map(path => {
            const open = expanded === path.id;
            const currentTab = tabs[path.id] || "project";

            return (
              <div key={path.id} className={`${path.bg} border-2 ${path.border} rounded-2xl overflow-hidden`}>
                <button className="w-full text-left p-4" onClick={() => toggle(path.id)}>
                  <div className="flex items-start gap-3">
                    <div className={`w-11 h-11 bg-gradient-to-br ${path.color} rounded-xl flex items-center justify-center text-xl flex-shrink-0 shadow-sm`}>
                      {path.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-0.5">
                        <span className="font-black text-slate-800 dark:text-white text-base leading-tight">{path.title}</span>
                        {path.unityHighlight && (
                          <span className="text-[10px] bg-violet-200 dark:bg-violet-900/60 text-violet-700 dark:text-violet-300 px-2 py-0.5 rounded-full font-black">Unity ✨</span>
                        )}
                      </div>
                      <p className={`text-xs font-bold ${path.accent} mb-1.5`}>{path.category}</p>
                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-snug">{path.tagline}</p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {path.languages.slice(0, 4).map(l => (
                          <span key={l} className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${path.badge}`}>{l}</span>
                        ))}
                        {path.languages.length > 4 && (
                          <span className="text-[10px] text-slate-400 self-center font-medium">+{path.languages.length - 4}</span>
                        )}
                      </div>
                    </div>
                    <div className={`flex-shrink-0 mt-1 ${path.accent}`}>
                      {open ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </div>
                  </div>
                </button>

                {open && (
                  <div className="border-t border-slate-200/60 dark:border-slate-700/60 px-4 pb-4">
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed py-3">{path.description}</p>

                    <div className="mb-4">
                      <p className={`text-[10px] font-black uppercase tracking-wider ${path.accent} mb-2`}>Roluri & Salarii</p>
                      <div className="space-y-1.5">
                        {path.roles.map(r => (
                          <div key={r.title} className="flex items-center justify-between bg-white/60 dark:bg-slate-800/50 rounded-xl px-3 py-2">
                            <div className="min-w-0">
                              <span className="text-xs font-bold text-slate-700 dark:text-white">{r.title}</span>
                              <span className="text-[10px] text-slate-400 ml-2">Cerere: {r.demand}</span>
                            </div>
                            <span className={`text-xs font-black ${path.accent} flex-shrink-0 ml-2`}>{r.salary}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2 mb-3">
                      <button
                        onClick={() => setTab(path.id, "project")}
                        className={`flex-1 py-2 px-3 rounded-xl text-xs font-black transition-colors flex items-center justify-center gap-1.5
                          ${currentTab === "project" ? `bg-gradient-to-r ${path.color} text-white shadow-sm` : "bg-white/60 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 hover:bg-white/80 dark:hover:bg-slate-800"}`}>
                        <Rocket className="w-3.5 h-3.5" /> Proiect Mare
                      </button>
                      <button
                        onClick={() => setTab(path.id, "roadmap")}
                        className={`flex-1 py-2 px-3 rounded-xl text-xs font-black transition-colors flex items-center justify-center gap-1.5
                          ${currentTab === "roadmap" ? `bg-gradient-to-r ${path.color} text-white shadow-sm` : "bg-white/60 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 hover:bg-white/80 dark:hover:bg-slate-800"}`}>
                        <Map className="w-3.5 h-3.5" /> Roadmap
                      </button>
                    </div>

                    {currentTab === "project" && (
                      <div className="bg-white/70 dark:bg-slate-800/60 rounded-2xl p-4">
                        <h3 className="font-black text-slate-800 dark:text-white text-sm mb-1">{path.bigProject.title}</h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 leading-snug mb-3">{path.bigProject.desc}</p>

                        <div className="flex items-center gap-1.5 mb-3">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          <span className="text-xs text-slate-500 dark:text-slate-400 font-bold">{path.bigProject.hours} de lucru</span>
                        </div>

                        <div className="mb-3">
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1.5">Tech Stack</p>
                          <div className="flex flex-wrap gap-1">
                            {path.bigProject.tech.map(t => (
                              <span key={t} className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${path.badge}`}>{t}</span>
                            ))}
                          </div>
                        </div>

                        <div className="mb-3">
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1.5">Funcționalități</p>
                          <div className="grid grid-cols-2 gap-x-3 gap-y-1">
                            {path.bigProject.features.map(f => (
                              <div key={f} className="flex items-start gap-1.5">
                                <span className={`text-xs mt-0.5 flex-shrink-0 ${path.accent}`}>✓</span>
                                <span className="text-xs text-slate-600 dark:text-slate-400 leading-tight">{f}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2">Pași de Implementare</p>
                          <div className="space-y-2">
                            {path.bigProject.steps.map((s, i) => (
                              <div key={i} className="flex items-start gap-2.5">
                                <span className={`text-[10px] font-black w-5 h-5 rounded-full bg-gradient-to-br ${path.color} text-white flex items-center justify-center flex-shrink-0 mt-0.5`}>{i + 1}</span>
                                <span className="text-xs text-slate-600 dark:text-slate-400 leading-snug">{s}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {currentTab === "roadmap" && (
                      <div className="space-y-2">
                        {path.roadmap.map((phase, i) => (
                          <div key={phase.phase} className="bg-white/70 dark:bg-slate-800/60 rounded-xl p-3">
                            <div className="flex items-center gap-2 mb-2">
                              <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${path.color} text-white text-[10px] font-black flex items-center justify-center flex-shrink-0`}>
                                {i + 1}
                              </div>
                              <div className="flex-1 min-w-0">
                                <span className="text-xs font-black text-slate-700 dark:text-white">{phase.phase}</span>
                                <span className="text-[10px] text-slate-400 ml-1.5">· {phase.duration}</span>
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-1 ml-8">
                              {phase.topics.map(t => (
                                <span key={t} className="text-[10px] bg-white dark:bg-slate-700/80 border border-slate-200 dark:border-slate-600 px-1.5 py-0.5 rounded-md text-slate-600 dark:text-slate-300 font-medium">{t}</span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </main>
      <Navbar />
    </div>
  );
}
