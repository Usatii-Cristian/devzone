"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Compass, ChevronDown, ChevronUp, Rocket, Map, Clock, BookOpen, Zap, Timer } from "lucide-react";
import Navbar from "@/components/Navbar";
import { ModIcon, MOD_BG } from "@/lib/moduleIcons";

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
    difficultyBadge: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-700",
    trendBadge: "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400",
    category: "HTML · CSS · JS · React · Next.js",
    tagline: "Construiești aplicații web complete, de la design la server",
    languages: ["HTML", "CSS", "JavaScript", "React", "Next.js", "Node.js"],
    difficulty: "Mediu",
    timeToJob: "9–15 luni",
    trendLabel: "Cel mai angajat 🔥",
    hotSkills: ["React 19 + hooks", "Next.js 15 App Router", "TypeScript", "Tailwind CSS"],
    description: "Cel mai căutat profil tech în 2025. Stăpânești atât frontend-ul cât și backend-ul — construiești orice produs web singur. Moldova și România au zeci de companii care angajează full-stack devs, iar remote pentru Europa sau SUA este extrem de accesibil.",
    roles: [
      { title: "Junior Full-Stack Dev", local: "700–1.200€", remote: "2.000–4.000€", demand: "Foarte mare" },
      { title: "Mid Full-Stack Dev", local: "1.500–2.800€", remote: "4.000–8.000€", demand: "Foarte mare" },
      { title: "Senior Full-Stack Dev", local: "3.000–5.500€", remote: "7.000–15.000€", demand: "Mare" },
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
    difficultyBadge: "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-700",
    trendBadge: "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400",
    category: "Python · TensorFlow · PyTorch",
    tagline: "Antrenezi modele care învață și iau decizii autonome",
    languages: ["Python", "TensorFlow", "PyTorch", "scikit-learn", "Pandas", "LangChain"],
    difficulty: "Avansat",
    timeToJob: "18–30 luni",
    trendLabel: "Exploziv 2025 🚀",
    hotSkills: ["LangChain + RAG pipelines", "Fine-tuning LLMs", "MLOps (MLflow)", "Python + PyTorch"],
    description: "Cel mai rapid domeniu în creștere — deficit global de specialiști. Construiești sisteme care recunosc imagini, înțeleg text natural și prezic comportamente. Necesită matematică solidă (liniară, statistică) și Python avansat. Aproape exclusiv remote pentru piețe de top.",
    roles: [
      { title: "ML Engineer Junior", local: "1.200–2.000€", remote: "3.000–6.000€", demand: "Explozivă" },
      { title: "ML Engineer Mid", local: "2.500–4.500€", remote: "6.000–12.000€", demand: "Explozivă" },
      { title: "AI Research Scientist", local: "5.000–9.000€", remote: "12.000–25.000€", demand: "Mare" },
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
    difficultyBadge: "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 border border-orange-200 dark:border-orange-700",
    trendBadge: "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400",
    category: "Python · C · Bash · Linux",
    tagline: "Aperi sistemele și găsești vulnerabilitățile înainte de hackeri",
    languages: ["Python", "C", "Bash", "Wireshark", "Metasploit", "Nmap"],
    difficulty: "Dificil",
    timeToJob: "12–24 luni",
    trendLabel: "Cerere uriașă 📈",
    hotSkills: ["Cloud Security (AWS/Azure)", "Bug Bounty", "Zero Trust Architecture", "SIEM + SOC analyst"],
    description: "Deficit global de 4 milioane de specialiști cyber în 2025. Protejezi companii de atacuri, găsești vulnerabilități și câștigi prin bug bounty. Bănci, telco, instituții guvernamentale — toți recrutează permanent. Cerere enormă, salarii mari, muncă permanent nouă.",
    roles: [
      { title: "Security Analyst", local: "800–1.400€", remote: "2.000–4.500€", demand: "Foarte mare" },
      { title: "Penetration Tester", local: "1.800–3.500€", remote: "4.000–9.000€", demand: "Foarte mare" },
      { title: "Security Architect", local: "4.000–7.500€", remote: "8.000–18.000€", demand: "Mare" },
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
    difficultyBadge: "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 border border-orange-200 dark:border-orange-700",
    trendBadge: "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400",
    category: "Python · SQL · R",
    tagline: "Transformi datele brute în decizii de business de milioane",
    languages: ["Python", "SQL", "R", "Tableau", "Power BI", "Spark"],
    difficulty: "Mediu–Dificil",
    timeToJob: "12–20 luni",
    trendLabel: "Cerere în creștere 📊",
    hotSkills: ["dbt + data pipelines", "Python + Polars", "LLM data analysis", "Apache Spark"],
    description: "Analizezi milioane de rânduri de date pentru a descoperi pattern-uri și ghida decizii de business. Rol esențial în bănci, fintech, retail și e-commerce. Python + SQL + statistică este combinația câștigătoare. Multe companii remotă angajează analiști de date din Moldova.",
    roles: [
      { title: "Data Analyst", local: "800–1.400€", remote: "2.000–4.500€", demand: "Foarte mare" },
      { title: "Data Scientist", local: "1.800–3.200€", remote: "4.000–8.000€", demand: "Explozivă" },
      { title: "ML/AI Data Scientist", local: "3.500–6.000€", remote: "7.000–15.000€", demand: "Explozivă" },
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
    difficultyBadge: "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 border border-orange-200 dark:border-orange-700",
    trendBadge: "bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-400",
    category: "C++ · C# · Unity · Unreal",
    tagline: "Creezi lumile virtuale în care milioane de oameni trăiesc aventuri",
    languages: ["C++", "C#", "Unity", "Unreal Engine 5", "GLSL/HLSL"],
    difficulty: "Dificil",
    timeToJob: "18–30 luni",
    trendLabel: "Nișă premium 🎮",
    hotSkills: ["Unreal Engine 5 + Nanite/Lumen", "Unity DOTS/ECS", "Shader Graph + HLSL", "C# Netcode multiplayer"],
    description: "Combini programare, matematică 3D și creativitate. C# cu Unity domină indie și mobile; C++ cu Unreal Engine 5 pentru jocuri AAA. Piața locală e mică (Playtika, Ubisoft București), dar remote e frecvent și bine plătit. Industrie globală de 200 miliarde USD.",
    roles: [
      { title: "Junior Game Developer", local: "600–1.100€", remote: "1.500–3.500€", demand: "Moderată" },
      { title: "Game Developer", local: "1.400–2.500€", remote: "3.500–7.000€", demand: "Moderată" },
      { title: "Senior / Lead Dev", local: "2.500–5.000€", remote: "6.000–14.000€", demand: "Moderată" },
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
    difficultyBadge: "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-700",
    trendBadge: "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400",
    category: "C · C++ · Assembly · Rust",
    tagline: "Programezi hardware real — de la microcontrollere la sisteme de operare",
    languages: ["C", "C++", "Assembly", "Linux", "FreeRTOS", "Rust"],
    difficulty: "Avansat",
    timeToJob: "18–30 luni",
    trendLabel: "Salarii mari ⚙️",
    hotSkills: ["Rust (borrow checker)", "RISC-V + WASM", "ESP32 + FreeRTOS", "Linux kernel modules"],
    description: "Cel mai apropiat nivel de hardware. Controlezi memorie, procese și dispozitive fizice. Concurența e mică, cererea e constantă, salariile mari încă de la junior. Continental, Microchip și alte companii embedded au birouri în România și angajează permanent.",
    roles: [
      { title: "Embedded Developer", local: "900–1.600€", remote: "2.500–5.000€", demand: "Mare" },
      { title: "Systems Programmer", local: "1.800–3.200€", remote: "4.000–8.000€", demand: "Mare" },
      { title: "Kernel / Driver Dev", local: "3.500–6.500€", remote: "7.000–15.000€", demand: "Moderată" },
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
    difficultyBadge: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-700",
    trendBadge: "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400",
    category: "Java · Kotlin · Spring Boot",
    tagline: "Construiești sisteme bancare, aplicații Android și microservicii la scară",
    languages: ["Java", "Kotlin", "Spring Boot", "Android SDK", "Hibernate", "Maven"],
    difficulty: "Mediu",
    timeToJob: "10–18 luni",
    trendLabel: "Enterprise stabil ☕",
    hotSkills: ["Spring Boot 3 + Virtual Threads", "Kotlin + Jetpack Compose", "Reactive Streams (WebFlux)", "Kubernetes + Helm"],
    description: "Java rămâne coloana vertebrală a enterprise-ului global în 2025 — banking, asigurări, guvern, Amazon backend. Endava și Pentalog, ambele active în Moldova și România, angajează permanent Java devs. Kotlin a revoluționat Android și e preferat de Google.",
    roles: [
      { title: "Android Developer", local: "900–1.600€", remote: "2.500–5.500€", demand: "Mare" },
      { title: "Java Backend Dev", local: "1.500–2.800€", remote: "3.500–7.500€", demand: "Mare" },
      { title: "Java Architect", local: "3.500–6.500€", remote: "7.000–16.000€", demand: "Moderată" },
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
    difficultyBadge: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-700",
    trendBadge: "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400",
    category: "C# · ASP.NET · Unity",
    tagline: "De la aplicații enterprise Microsoft la jocuri indie/AAA cu Unity",
    languages: ["C#", "ASP.NET Core", "Unity", "LINQ", "Entity Framework", "Blazor"],
    difficulty: "Mediu",
    timeToJob: "10–16 luni",
    trendLabel: "Microsoft stack 🔷",
    unityHighlight: true,
    hotSkills: ["ASP.NET Core 9 + Minimal API", "Blazor WebAssembly", ".NET MAUI cross-platform", "Azure AI + Copilot"],
    description: "C# este limbajul Microsoft cu dublă personalitate — backend enterprise cu ASP.NET Core și game dev cu Unity (50%+ cotă de piață indie/mobile). Companiile Microsoft-partner din Moldova și România angajează constant .NET devs. Azure e cloud-ul de facto pentru enterprise.",
    roles: [
      { title: ".NET Developer", local: "900–1.700€", remote: "2.500–5.500€", demand: "Mare" },
      { title: "Unity Developer", local: "900–2.000€", remote: "2.500–6.000€", demand: "Moderată" },
      { title: "Senior .NET Architect", local: "3.000–6.000€", remote: "6.500–14.000€", demand: "Mare" },
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
      { phase: "Azure & DevOps", duration: "2–3 luni", topics: ["Azure App Service + SQL", "Azure DevOps CI/CD", "Application Insights", "Blazor WebAssembly", ".NET MAUI pentru mobile"] },
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
    difficultyBadge: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-700",
    trendBadge: "bg-fuchsia-100 dark:bg-fuchsia-900/30 text-fuchsia-700 dark:text-fuchsia-400",
    category: "PHP · Laravel · MySQL",
    tagline: "Alimentează 79% din web-ul global — de la WordPress la SaaS modern",
    languages: ["PHP", "Laravel", "MySQL", "Blade", "Livewire", "Composer"],
    difficulty: "Ușor–Mediu",
    timeToJob: "7–12 luni",
    trendLabel: "79% din web 🐘",
    hotSkills: ["Laravel 11 + Livewire 3", "Filament Admin Panel", "PHP 8.3 Fibers + Enums", "Pest testing framework"],
    description: "PHP 8.3 modern este surprinzător de elegant și productiv. Laravel 11 este printre cele mai apreciate framework-uri. Cel mai rapid drum spre primul job. WordPress alimentează 43% din internet, agențiile web angajează permanent, iar freelance-ul este extrem de accesibil.",
    roles: [
      { title: "PHP/Laravel Developer", local: "600–1.200€", remote: "1.500–3.500€", demand: "Mare" },
      { title: "Senior Laravel Dev", local: "1.500–2.800€", remote: "3.500–7.000€", demand: "Mare" },
      { title: "WordPress Dev/Architect", local: "600–1.500€", remote: "1.500–4.000€", demand: "Foarte mare" },
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

const MODULE_LINKS = {
  fullstack:     [["html","css","javascript"], ["react","tailwind"], ["nextjs-backend","sql"], ["nextjs-frontend","nextjs-backend"]],
  "ai-ml":       [["python"], ["python"], ["python"], ["python"]],
  cybersecurity: [["python","cybersecurity"], ["cybersecurity"], ["cybersecurity"], ["cybersecurity"]],
  "data-science":[["python","sql"], ["python","sql"], ["python"], ["sql"]],
  gamedev:       [["csharp"], ["csharp"], ["csharp"], ["cpp"]],
  systems:       [["c"], ["cpp"], ["c","cpp"], ["c","cpp"]],
  java:          [["java"], ["java"], ["java"], []],
  dotnet:        [["csharp"], ["csharp"], ["csharp"], []],
  php:           [["php"], ["php","sql"], ["php"], ["php"]],
};

export default function TraseePage() {
  const [expanded, setExpanded] = useState(null);
  const [tabs, setTabs] = useState({});
  const [modulesMap, setModulesMap] = useState({});

  useEffect(() => {
    fetch("/api/modules")
      .then(r => r.json())
      .then(data => {
        if (!Array.isArray(data)) return;
        const map = {};
        data.forEach(m => { map[m.slug] = m; });
        setModulesMap(map);
      })
      .catch(() => {});
  }, []);

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
              <p className="text-indigo-200 text-xs leading-tight">9 drumuri clare în tech · salarii 2025–2026</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-5">
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-2 leading-relaxed">
          Alege un traseu, descoperă ce poți construi cu el și urmează roadmap-ul pas cu pas până la primul job.
        </p>
        <div className="flex flex-wrap gap-2 mb-5">
          <span className="text-[11px] bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1 text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-green-500 inline-block"></span> Ușor–Mediu
          </span>
          <span className="text-[11px] bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1 text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-yellow-500 inline-block"></span> Mediu
          </span>
          <span className="text-[11px] bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1 text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-orange-500 inline-block"></span> Dificil
          </span>
          <span className="text-[11px] bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1 text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-red-500 inline-block"></span> Avansat
          </span>
          <span className="text-[11px] bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1 text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <Timer className="w-3 h-3"/> Timp până la primul job
          </span>
        </div>

        <div className="space-y-3">
          {PATHS.map(path => {
            const open = expanded === path.id;
            const currentTab = tabs[path.id] || "project";

            return (
              <div key={path.id} className={`${path.bg} border-2 ${path.border} rounded-2xl overflow-hidden transition-shadow ${open ? "shadow-md" : ""}`}>
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
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${path.difficultyBadge}`}>{path.difficulty}</span>
                      </div>
                      <p className={`text-xs font-bold ${path.accent} mb-1`}>{path.category}</p>
                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-snug mb-2">{path.tagline}</p>
                      <div className="flex items-center gap-2 flex-wrap">
                        <div className="flex flex-wrap gap-1">
                          {path.languages.slice(0, 4).map(l => (
                            <span key={l} className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${path.badge}`}>{l}</span>
                          ))}
                          {path.languages.length > 4 && (
                            <span className="text-[10px] text-slate-400 self-center font-medium">+{path.languages.length - 4}</span>
                          )}
                        </div>
                        <span className="text-[10px] text-slate-400 flex items-center gap-0.5 ml-auto flex-shrink-0">
                          <Timer className="w-2.5 h-2.5"/> {path.timeToJob}
                        </span>
                      </div>
                    </div>
                    <div className={`flex-shrink-0 mt-1 ${path.accent}`}>
                      {open ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </div>
                  </div>
                </button>

                {open && (
                  <div className="border-t border-slate-200/60 dark:border-slate-700/60 px-4 pb-4">

                    {/* Trend + time */}
                    <div className="flex items-center gap-2 flex-wrap pt-3 pb-2">
                      <span className={`text-[11px] font-black px-2.5 py-0.5 rounded-full ${path.trendBadge}`}>{path.trendLabel}</span>
                      <span className="text-[11px] text-slate-400 flex items-center gap-1">
                        <Timer className="w-3 h-3"/> Primul job în ~{path.timeToJob}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-3">{path.description}</p>

                    {/* Hot skills 2025 */}
                    <div className="mb-4">
                      <p className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1">
                        <Zap className="w-3 h-3 text-yellow-500"/> Skills căutate în 2025
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {path.hotSkills.map(skill => (
                          <span key={skill} className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${path.badge}`}>{skill}</span>
                        ))}
                      </div>
                    </div>

                    {/* Salary table */}
                    <div className="mb-4">
                      <p className={`text-[10px] font-black uppercase tracking-wider ${path.accent} mb-2`}>
                        Salarii 2025–2026 (€/lună net)
                      </p>
                      <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700">
                        <div className="grid grid-cols-4 bg-slate-100 dark:bg-slate-800/80 px-3 py-1.5 gap-1">
                          <span className="text-[10px] font-black text-slate-500 col-span-2">Rol</span>
                          <span className="text-[10px] font-black text-slate-500">🇲🇩 Local</span>
                          <span className="text-[10px] font-black text-emerald-600 dark:text-emerald-500">🌍 Remote</span>
                        </div>
                        {path.roles.map((r, ri) => (
                          <div key={ri} className="grid grid-cols-4 items-center bg-white dark:bg-slate-800/40 px-3 py-2 border-t border-slate-100 dark:border-slate-700/50 gap-1">
                            <div className="col-span-2">
                              <span className="text-xs font-bold text-slate-700 dark:text-white block leading-tight">{r.title}</span>
                              <span className="text-[10px] text-slate-400">Cerere: {r.demand}</span>
                            </div>
                            <span className={`text-xs font-black ${path.accent} leading-tight`}>{r.local}</span>
                            <span className="text-xs font-black text-emerald-600 dark:text-emerald-400 leading-tight">{r.remote}</span>
                          </div>
                        ))}
                      </div>
                      <p className="text-[10px] text-slate-400 mt-1.5 leading-tight">
                        Local = angajator în Moldova/România. Remote = companii EU/US.
                      </p>
                    </div>

                    {/* Tabs */}
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
                            {(MODULE_LINKS[path.id]?.[i]?.length > 0) && (
                              <div className="ml-8 mt-2.5">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                                  <BookOpen className="w-3 h-3"/> Pe DevZone
                                </p>
                                <div className="flex flex-wrap gap-1.5">
                                  {MODULE_LINKS[path.id][i].map(slug => {
                                    const mod = modulesMap[slug];
                                    const name = mod?.title || slug;
                                    const count = mod?.lessons?.length || 0;
                                    return (
                                      <Link
                                        key={slug}
                                        href={`/modules/${slug}`}
                                        className="flex items-center gap-1.5 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg px-2 py-1 hover:border-indigo-400 dark:hover:border-indigo-500 hover:shadow-sm transition-all group"
                                        onClick={e => e.stopPropagation()}
                                      >
                                        <div className={`w-4 h-4 rounded-md bg-gradient-to-br ${MOD_BG[slug] || "from-slate-400 to-slate-500"} flex items-center justify-center flex-shrink-0`}>
                                          <ModIcon slug={slug} className="w-2.5 h-2.5 text-white"/>
                                        </div>
                                        <span className="text-[11px] font-bold text-slate-700 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{name}</span>
                                        {count > 0 && <span className="text-[10px] text-slate-400 font-medium">{count}L</span>}
                                      </Link>
                                    );
                                  })}
                                </div>
                              </div>
                            )}
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
