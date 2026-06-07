"use strict";
require("dotenv").config({ path: ".env" });
const { PrismaClient } = require("@prisma/client");
const p = new PrismaClient();

const UPDATES = [
  // L35: Mini-proiect Todo App
  {
    lesson: "35. Mini-proiect: Todo App complet în JavaScript",
    title: "Arhitectura aplicației",
    content: `Înainte de a scrie cod, **arhitectura** definește structura și fluxul de date al aplicației. Un Todo App bine organizat separă responsabilitățile în straturi distincte.

**Structura de fișiere:**
\`\`\`
todo-app/
├── index.html
├── style.css
└── js/
    ├── app.js        ← Controller: logica principală + inițializare
    ├── store.js      ← Model: state management + persistență
    ├── renderer.js   ← View: randare DOM
    └── utils.js      ← Funcții helper reutilizabile
\`\`\`

**Fluxul de date (MVC-like):**
\`\`\`
User Action
    ↓
Controller (app.js)   ← ascultă eventos
    ↓
Store (store.js)      ← modifică starea + salvează în localStorage
    ↓
Renderer (renderer.js) ← re-randează UI din starea curentă
    ↓
DOM actualizat
\`\`\`

**Modelul de date — o sarcină (todo):**
\`\`\`javascript
// utils.js
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function createTodo(text) {
  return {
    id: generateId(),
    text: text.trim(),
    completed: false,
    createdAt: new Date().toISOString(),
    priority: "normal" // "low" | "normal" | "high"
  };
}
\`\`\`

**State inițial:**
\`\`\`javascript
const initialState = {
  todos: [],          // array de todo-uri
  filter: "all",      // "all" | "active" | "completed"
  searchQuery: ""     // text de căutare
};
\`\`\`

**Principii de arhitectură respectate:**
• **Single source of truth** — starea e doar în Store.
• **Unidirectional data flow** — UI modifică Store, Store notifică Renderer.
• **Separation of concerns** — fiecare fișier are o singură responsabilitate.
• **Imutabilitate** — starea nu se modifică direct, se înlocuiește.`,
  },
  {
    lesson: "35. Mini-proiect: Todo App complet în JavaScript",
    title: "UI Layer — Renderer",
    content: `**Renderer-ul** transformă starea aplicației în HTML — primește state și returnează/actualizează DOM-ul. Niciodată nu modifică starea direct.

\`\`\`javascript
// renderer.js
class Renderer {
  constructor(container) {
    this.container = container;
  }

  render(state) {
    const { todos, filter, searchQuery } = state;
    // Filtrare + căutare
    let visible = todos.filter(todo => {
      if (filter === "active") return !todo.completed;
      if (filter === "completed") return todo.completed;
      return true; // "all"
    });
    if (searchQuery) {
      visible = visible.filter(t =>
        t.text.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    this.container.innerHTML = visible.length
      ? visible.map(t => this.#todoTemplate(t)).join("")
      : \`<p class="empty">Nu există sarcini \${filter === "all" ? "" : filter}.</p>\`;

    this.#updateStats(todos);
  }

  #todoTemplate(todo) {
    return \`
      <div class="todo-item \${todo.completed ? "completed" : ""}" data-id="\${todo.id}">
        <input type="checkbox" \${todo.completed ? "checked" : ""} class="toggle">
        <span class="text">\${this.#escapeHTML(todo.text)}</span>
        <span class="priority priority--\${todo.priority}">\${todo.priority}</span>
        <button class="delete" aria-label="Șterge">✕</button>
      </div>
    \`;
  }

  #updateStats(todos) {
    const active = todos.filter(t => !t.completed).length;
    document.getElementById("stats").textContent =
      \`\${active} rămase din \${todos.length} total\`;
  }

  #escapeHTML(str) {
    return str.replace(/[&<>"']/g, c =>
      ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":'&#39;' })[c]
    );
  }
}
\`\`\`

**Principii aplicate:**
• **Escape HTML** — previne XSS când afișăm text introdus de utilizator.
• **Renderer pur** — primește state, returnează DOM; nu are logică business.
• **Event delegation** — evenimentele se atașează pe container, nu pe fiecare item.`,
  },
  {
    lesson: "35. Mini-proiect: Todo App complet în JavaScript",
    title: "Controller — App.js",
    content: `**Controller-ul** este "creierul" aplicației — ascultă interacțiunile utilizatorului, actualizează Store-ul și declanșează re-randarea.

\`\`\`javascript
// app.js
import { Store } from "./store.js";
import { Renderer } from "./renderer.js";

class App {
  #store = new Store();
  #renderer = new Renderer(document.getElementById("todo-list"));

  init() {
    this.#render();
    this.#bindEvents();
  }

  #render() {
    this.#renderer.render(this.#store.getState());
  }

  #bindEvents() {
    // Adăugare todo
    document.getElementById("add-form").addEventListener("submit", e => {
      e.preventDefault();
      const input = e.target.elements["new-todo"];
      const text = input.value.trim();
      if (text) {
        this.#store.addTodo(text);
        input.value = "";
        this.#render();
      }
    });

    // Toggle / Delete — event delegation pe container
    document.getElementById("todo-list").addEventListener("click", e => {
      const item = e.target.closest("[data-id]");
      if (!item) return;
      const id = item.dataset.id;

      if (e.target.classList.contains("toggle")) {
        this.#store.toggleTodo(id);
        this.#render();
      }
      if (e.target.classList.contains("delete")) {
        this.#store.deleteTodo(id);
        this.#render();
      }
    });

    // Filtre
    document.getElementById("filters").addEventListener("click", e => {
      if (e.target.dataset.filter) {
        this.#store.setFilter(e.target.dataset.filter);
        this.#render();
      }
    });

    // Căutare cu debounce
    const search = this.#debounce(value => {
      this.#store.setSearch(value);
      this.#render();
    }, 200);
    document.getElementById("search").addEventListener("input", e => search(e.target.value));
  }

  #debounce(fn, ms) {
    let timer;
    return (...args) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), ms); };
  }
}
new App().init();
\`\`\``,
  },
  {
    lesson: "35. Mini-proiect: Todo App complet în JavaScript",
    title: "Ce am învățat + next steps",
    content: `Construind acest Todo App complet, ai aplicat **toate conceptele fundamentale** ale JavaScript modern într-un context real:

**Concepte aplicate în proiect:**
• **Classes + private fields (\`#\`)** — Store, Renderer, App
• **Event delegation** — un singur listener gestionează toți itemii din listă
• **Closure** — debounce implementat cu timer capturat
• **Array methods** — \`filter\`, \`map\`, \`find\`, \`some\`
• **Template literals** — generare HTML dinamic
• **localStorage** — persistență fără backend
• **ES Modules** — \`import/export\` pentru organizare cod
• **Securitate** — escape HTML pentru prevenire XSS
• **Separation of concerns** — Model/View/Controller separat

**Codul complet al Store-ului:**
\`\`\`javascript
// store.js
export class Store {
  #state;
  constructor() {
    const saved = localStorage.getItem("todos");
    this.#state = {
      todos: saved ? JSON.parse(saved) : [],
      filter: "all",
      searchQuery: ""
    };
  }
  getState() { return { ...this.#state }; }
  addTodo(text) {
    this.#state.todos = [...this.#state.todos, createTodo(text)];
    this.#save();
  }
  toggleTodo(id) {
    this.#state.todos = this.#state.todos.map(t =>
      t.id === id ? { ...t, completed: !t.completed } : t
    );
    this.#save();
  }
  deleteTodo(id) {
    this.#state.todos = this.#state.todos.filter(t => t.id !== id);
    this.#save();
  }
  setFilter(filter) { this.#state = { ...this.#state, filter }; }
  setSearch(q) { this.#state = { ...this.#state, searchQuery: q }; }
  #save() { localStorage.setItem("todos", JSON.stringify(this.#state.todos)); }
}
\`\`\`

**Next steps pentru a extinde proiectul:**
• Adaugă **drag & drop** pentru reordonare (Drag and Drop API)
• Adaugă **date scadente** și sortare după prioritate/dată
• Înlocuiește localStorage cu **IndexedDB** pentru date mari
• Adaugă **sincronizare cloud** cu fetch + REST API
• Migrează la **TypeScript** pentru type safety`,
  },

  // L36: Web APIs moderne
  {
    lesson: "36. Web APIs moderne (IntersectionObserver, ResizeObserver, MutationObserver)",
    title: "IntersectionObserver — lazy loading si scroll effects",
    content: `**IntersectionObserver** observă când un element intră sau iese din viewport (sau alt container). Este API-ul modern pentru lazy loading, scroll effects și infinite scroll.

\`\`\`javascript
const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      console.log(entry.target, "este vizibil");
      console.log("Procent vizibil:", entry.intersectionRatio);
    }
  });
}, {
  root: null,        // null = viewport
  rootMargin: "0px", // extinde zona de observare
  threshold: 0.5     // callback la 50% vizibilitate
});

observer.observe(document.getElementById("section"));
observer.unobserve(element); // oprește observarea unui element
observer.disconnect();       // oprește totul
\`\`\`

**Lazy loading imagini (pattern recomandat):**
\`\`\`html
<img data-src="/images/photo.jpg" alt="Foto" loading="lazy">
\`\`\`
\`\`\`javascript
const imgObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      img.removeAttribute("data-src");
      imgObserver.unobserve(img); // nu mai urmărești după încărcare
    }
  });
}, { rootMargin: "200px" }); // preîncarcă cu 200px înainte de viewport

document.querySelectorAll("img[data-src]").forEach(img => imgObserver.observe(img));
\`\`\`

**Animate on scroll (scroll effects):**
\`\`\`javascript
const animObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    entry.target.classList.toggle("visible", entry.isIntersecting);
  });
}, { threshold: 0.1 });

document.querySelectorAll(".animate-on-scroll").forEach(el => animObserver.observe(el));
\`\`\`

**Threshold array — multiple puncte de declanșare:**
\`\`\`javascript
new IntersectionObserver(cb, { threshold: [0, 0.25, 0.5, 0.75, 1] });
// callback e apelat la 0%, 25%, 50%, 75% și 100% vizibilitate
\`\`\`

• **Performanță:** IntersectionObserver rulează off-main-thread, nu blochează scroll-ul.
• **Înlocuiește:** \`scroll\` event + \`getBoundingClientRect()\` — soluție veche, lentă.`,
  },
  {
    lesson: "36. Web APIs moderne (IntersectionObserver, ResizeObserver, MutationObserver)",
    title: "ResizeObserver — react la schimbari de dimensiune",
    content: `**ResizeObserver** observă schimbările de dimensiune ale elementelor — mai precis și eficient decât \`window.resize\` event.

\`\`\`javascript
const resizeObserver = new ResizeObserver((entries) => {
  entries.forEach(entry => {
    const { width, height } = entry.contentRect;
    const el = entry.target;
    console.log(\`\${el.id}: \${width}px × \${height}px\`);

    // Ajustare layout responsive pe element
    if (width < 400) {
      el.classList.add("compact");
      el.classList.remove("full");
    } else {
      el.classList.add("full");
      el.classList.remove("compact");
    }
  });
});

resizeObserver.observe(document.getElementById("sidebar"));
resizeObserver.observe(document.getElementById("main-content"));
resizeObserver.unobserve(element);
resizeObserver.disconnect();
\`\`\`

**Container queries cu ResizeObserver (înainte de CSS Container Queries):**
\`\`\`javascript
// Adaptare card în funcție de dimensiunea container-ului, nu a viewport-ului
function makeResponsiveCard(cardEl) {
  const observer = new ResizeObserver(([entry]) => {
    const width = entry.contentRect.width;
    cardEl.dataset.size = width < 300 ? "sm" : width < 600 ? "md" : "lg";
  });
  observer.observe(cardEl);
  return () => observer.disconnect(); // returnează cleanup
}
\`\`\`

**Canvas responsive — redraw la resize:**
\`\`\`javascript
const canvas = document.getElementById("chart");
const ctx = canvas.getContext("2d");

new ResizeObserver(([entry]) => {
  const { width, height } = entry.contentRect;
  canvas.width = width * devicePixelRatio;   // retina support
  canvas.height = height * devicePixelRatio;
  ctx.scale(devicePixelRatio, devicePixelRatio);
  drawChart(ctx, width, height, data);        // redesenează
}).observe(canvas.parentElement);
\`\`\`

• **\`entry.contentRect\`** — dimensiunile reale ale conținutului (fără padding/border).
• **\`entry.borderBoxSize\`** și **\`entry.contentBoxSize\`** — array cu dimensiuni precise (nou API).
• **Loop protection:** dacă în callback modifici dimensiunea elementului observat → ResizeObserver detectează din nou → potențial buclă; evită prin throttling sau flag.`,
  },
  {
    lesson: "36. Web APIs moderne (IntersectionObserver, ResizeObserver, MutationObserver)",
    title: "MutationObserver — observa schimbari DOM",
    content: `**MutationObserver** observă modificări în structura DOM — adăugare/ștergere noduri, schimbări de atribute, modificări de text. Înlocuiește vechile \`DOMSubtreeModified\` events (deprecate).

\`\`\`javascript
const observer = new MutationObserver((mutations) => {
  mutations.forEach(mutation => {
    if (mutation.type === "childList") {
      mutation.addedNodes.forEach(node => console.log("Adăugat:", node));
      mutation.removedNodes.forEach(node => console.log("Șters:", node));
    }
    if (mutation.type === "attributes") {
      console.log(\`Atribut "\${mutation.attributeName}" modificat pe\`, mutation.target);
    }
    if (mutation.type === "characterData") {
      console.log("Text modificat:", mutation.target.data);
    }
  });
});

observer.observe(document.body, {
  childList: true,    // adăugare/ștergere copii direcți
  subtree: true,      // și toți descendenții
  attributes: true,   // schimbări de atribute
  attributeFilter: ["class", "style"], // doar aceste atribute
  characterData: true // modificări text
});
observer.disconnect(); // oprește observarea
\`\`\`

**Caz de utilizare: auto-highlight cod adăugat dinamic:**
\`\`\`javascript
const codeObserver = new MutationObserver((mutations) => {
  mutations.forEach(mut => {
    mut.addedNodes.forEach(node => {
      if (node.nodeName === "PRE" || node.querySelector?.("code")) {
        Prism.highlightAllUnder(node); // syntax highlight automat
      }
    });
  });
});
codeObserver.observe(document.getElementById("content"), { childList: true, subtree: true });
\`\`\`

**Detectare teme / schimbări de clasă pe \`<html>\`:**
\`\`\`javascript
new MutationObserver(() => {
  const isDark = document.documentElement.classList.contains("dark");
  updateChartTheme(isDark ? "dark" : "light");
}).observe(document.documentElement, {
  attributes: true, attributeFilter: ["class"]
});
\`\`\`

**Performance tip:** MutationObserver colectează mutațiile în batch — callback-ul e apelat asincron (microtask queue) după ce browser-ul termină frame-ul curent.`,
  },
  {
    lesson: "36. Web APIs moderne (IntersectionObserver, ResizeObserver, MutationObserver)",
    title: "PerformanceObserver si alte API-uri moderne",
    content: `**PerformanceObserver** monitorizează metrici de performanță în timp real — Web Vitals, resurse, timings — fără a bloca thread-ul principal.

\`\`\`javascript
// Observare Web Vitals
const perfObserver = new PerformanceObserver((list) => {
  list.getEntries().forEach(entry => {
    if (entry.entryType === "largest-contentful-paint") {
      console.log("LCP:", entry.startTime, "ms"); // sub 2500ms = bun
    }
    if (entry.entryType === "layout-shift") {
      console.log("CLS shift:", entry.value); // sub 0.1 = bun
    }
    if (entry.entryType === "first-input") {
      console.log("FID:", entry.processingStart - entry.startTime, "ms");
    }
  });
});
perfObserver.observe({ type: "largest-contentful-paint", buffered: true });
perfObserver.observe({ type: "layout-shift", buffered: true });
\`\`\`

**Timing resurse (care fișier e lent):**
\`\`\`javascript
new PerformanceObserver((list) => {
  list.getEntries().forEach(entry => {
    const total = entry.responseEnd - entry.startTime;
    if (total > 500) console.warn(\`Lent: \${entry.name} (\${total.toFixed(0)}ms)\`);
  });
}).observe({ type: "resource", buffered: true });
\`\`\`

**Alte API-uri moderne importante:**

**Clipboard API:**
\`\`\`javascript
// Copiere în clipboard
await navigator.clipboard.writeText("text de copiat");
// Citire din clipboard
const text = await navigator.clipboard.readText();
\`\`\`

**Page Visibility API:**
\`\`\`javascript
document.addEventListener("visibilitychange", () => {
  if (document.hidden) pauseVideo(); else resumeVideo();
});
\`\`\`

**Battery API / Network Information API:**
\`\`\`javascript
const conn = navigator.connection;
if (conn?.effectiveType === "4g") loadHighResImages();
else loadLowResImages();
\`\`\`

**Broadcast Channel API — comunicare între taburi:**
\`\`\`javascript
const channel = new BroadcastChannel("app-sync");
channel.postMessage({ type: "logout" }); // trimite la toate taburile
channel.addEventListener("message", e => { if (e.data.type === "logout") clearAuth(); });
\`\`\``,
  },

  // L37: IndexedDB si Cache API
  {
    lesson: "37. IndexedDB si Cache API",
    title: "IndexedDB — baza de date offline in browser",
    content: `**IndexedDB** este o bază de date NoSQL în browser — stochează cantități mari de date structurate, suportă tranzacții și indecși, persistent între sesiuni. Alternativă la localStorage pentru date complexe.

\`\`\`javascript
// Deschidere bază de date
const request = indexedDB.open("MyAppDB", 1); // versiunea 1

// Creare schemă (rulat la creare sau upgrade versiune)
request.onupgradeneeded = (event) => {
  const db = event.target.result;
  // Object Store = echivalent tabel
  const store = db.createObjectStore("users", {
    keyPath: "id",      // cheia primară
    autoIncrement: true
  });
  store.createIndex("email", "email", { unique: true }); // index unic
  store.createIndex("name", "name", { unique: false });
};

request.onsuccess = (event) => {
  const db = event.target.result;
  addUser(db, { name: "Ana", email: "ana@test.com", age: 25 });
};

// Scriere date
function addUser(db, user) {
  const tx = db.transaction("users", "readwrite");
  const store = tx.objectStore("users");
  const req = store.add(user);
  req.onsuccess = () => console.log("Adăugat cu id:", req.result);
  tx.oncomplete = () => console.log("Tranzacție completă");
  tx.onerror = () => console.error("Eroare tranzacție:", tx.error);
}

// Citire după cheie
function getUser(db, id) {
  return new Promise((resolve, reject) => {
    const req = db.transaction("users").objectStore("users").get(id);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}
\`\`\`

• **Tranzacțiile** garantează atomicitate — fie totul, fie nimic.
• IndexedDB e **asincron** (bazat pe events) — API-ul brut e verbose; folosește librăria **idb** pentru syntax cu Promise.
• Limita de stocare: tipic 50% din spațiul disponibil pe disk.`,
  },
  {
    lesson: "37. IndexedDB si Cache API",
    title: "Versionare IndexedDB si idb library",
    content: `**Versionarea** în IndexedDB controlează migrările schemei. Librăria **idb** simplifică API-ul cu Promises și async/await.

**Versionare și migrări:**
\`\`\`javascript
const request = indexedDB.open("AppDB", 3); // upgrade de la v2 la v3

request.onupgradeneeded = (event) => {
  const db = event.target.result;
  const oldVersion = event.oldVersion; // versiunea anterioară

  if (oldVersion < 1) {
    // Migrare v0 → v1: creare schemă inițială
    db.createObjectStore("todos", { keyPath: "id" });
  }
  if (oldVersion < 2) {
    // Migrare v1 → v2: adaugă index
    const todos = event.target.transaction.objectStore("todos");
    todos.createIndex("completed", "completed");
  }
  if (oldVersion < 3) {
    // Migrare v2 → v3: nou store pentru tags
    db.createObjectStore("tags", { keyPath: "name" });
  }
};
\`\`\`

**idb library — API modern cu Promises:**
\`\`\`bash
npm install idb
\`\`\`
\`\`\`javascript
import { openDB } from "idb";

const db = await openDB("AppDB", 1, {
  upgrade(db) {
    const store = db.createObjectStore("todos", { keyPath: "id" });
    store.createIndex("completed", "completed");
  }
});

// CRUD simplu cu async/await
await db.add("todos", { id: "1", text: "Cumpărături", completed: false });
const todo = await db.get("todos", "1");
await db.put("todos", { ...todo, completed: true }); // update
await db.delete("todos", "1");

// Toți din store
const allTodos = await db.getAll("todos");

// Query cu index
const doneTodos = await db.getAllFromIndex("todos", "completed", true);

// Tranzacție multi-store
const tx = db.transaction(["todos", "tags"], "readwrite");
await tx.objectStore("todos").add({ id: "2", text: "Test" });
await tx.objectStore("tags").add({ name: "urgent" });
await tx.done; // aștepți completarea tranzacției
\`\`\`

**Când IndexedDB vs localStorage:**
• **localStorage** — string-uri mici, configurații simple, sub 5MB
• **IndexedDB** — obiecte complexe, fișiere/blobs, date offline, seturi mari`,
  },

  // L38: Web Workers
  {
    lesson: "38. Web Workers",
    title: "Web Workers — off-main-thread computation",
    content: `**Web Workers** permit execuția JavaScript pe thread-uri separate, protejând UI-ul principal de operații grele. Comunicarea se face prin mesaje.

\`\`\`javascript
// main.js
const worker = new Worker("/workers/data-processor.js");

// Trimite date la worker
worker.postMessage({
  type: "PROCESS",
  data: largeArray,
  options: { sort: true, filter: "active" }
});

// Primește rezultate
worker.addEventListener("message", (event) => {
  const { type, result, error } = event.data;
  if (type === "RESULT") updateUI(result);
  if (type === "ERROR") showError(error);
  if (type === "PROGRESS") updateProgressBar(event.data.percent);
});

worker.addEventListener("error", (e) => {
  console.error("Worker error:", e.message);
});

// Oprire worker
worker.terminate();
\`\`\`

\`\`\`javascript
// workers/data-processor.js
self.addEventListener("message", (event) => {
  const { type, data, options } = event.data;

  if (type === "PROCESS") {
    try {
      // Procesare grea — nu blochează UI
      let result = data;
      if (options.filter) {
        result = result.filter(item => item.status === options.filter);
        self.postMessage({ type: "PROGRESS", percent: 50 });
      }
      if (options.sort) {
        result.sort((a, b) => a.name.localeCompare(b.name));
        self.postMessage({ type: "PROGRESS", percent: 90 });
      }
      self.postMessage({ type: "RESULT", result });
    } catch (e) {
      self.postMessage({ type: "ERROR", error: e.message });
    }
  }
});
\`\`\`

• **Limitări:** fără \`document\`, \`window\`, DOM access — doar calcule și fetch.
• **Disponibil în worker:** \`fetch\`, \`setTimeout\`, \`indexedDB\`, \`WebSockets\`, \`crypto\`.
• **Worker pool:** creează N workers și distribuie taskuri între ei pentru paralelism maxim.`,
  },
  {
    lesson: "38. Web Workers",
    title: "Transferable Objects si SharedArrayBuffer",
    content: `**Transferable Objects** transferă ownership-ul datelor la worker fără a le copia — O(1) în loc de O(n). **SharedArrayBuffer** permite memorie partajată între thread-uri.

**Transferable Objects (ArrayBuffer, OffscreenCanvas, MessagePort):**
\`\`\`javascript
// Fără transfer — copiere: imagine 4K = ~8MB copiate = lent
const buffer = imageData.data.buffer;
worker.postMessage({ buffer: buffer }); // copiază 8MB!

// Cu transfer — instant, indiferent de dimensiune
worker.postMessage({ buffer: buffer }, [buffer]); // al doilea arg = lista de transferate
// ATENȚIE: buffer nu mai e utilizabil în main thread după transfer!
console.log(buffer.byteLength); // 0 — a fost transferat

// Worker primește și transferă înapoi
self.addEventListener("message", ({ data }) => {
  const { buffer } = data;
  const arr = new Uint8ClampedArray(buffer);
  // procesare imagini — grayscale
  for (let i = 0; i < arr.length; i += 4) {
    const gray = arr[i]*0.3 + arr[i+1]*0.59 + arr[i+2]*0.11;
    arr[i] = arr[i+1] = arr[i+2] = gray;
  }
  self.postMessage({ buffer }, [buffer]); // transferă înapoi
});
\`\`\`

**SharedArrayBuffer — memorie partajată între thread-uri:**
\`\`\`javascript
// ATENȚIE: necesită COOP/COEP headers pe server
const shared = new SharedArrayBuffer(1024 * 4); // 4KB partajat
const arr = new Int32Array(shared);

worker.postMessage({ shared }); // NU se copiază — e partajat!

// Main thread poate citi/scrie în timp ce worker-ul lucrează
arr[0] = 42; // worker vede această valoare imediat

// Atomics — operații atomic-safe pentru evitare race conditions
Atomics.store(arr, 0, 100);        // scriere atomică
const val = Atomics.load(arr, 0);  // citire atomică
Atomics.add(arr, 0, 1);            // increment atomic
Atomics.wait(arr, 0, 100);         // blochează worker până arr[0] !== 100
Atomics.notify(arr, 0, 1);         // trezește 1 worker care așteaptă
\`\`\`

**Când să alegi:**
• **postMessage** — date trimise o dată, procesate, returnate
• **Transferable** — buffers mari (imagini, audio, video)
• **SharedArrayBuffer** — comunicare continuă, simulări, calcul paralel cu sincronizare`,
  },
  {
    lesson: "38. Web Workers",
    title: "Comlink — API modern pentru Web Workers",
    content: `**Comlink** (librărie Google) simplifică dramatic comunicarea cu Web Workers — transformă mesajele în apeluri de funcții transparente folosind Proxy.

\`\`\`bash
npm install comlink
\`\`\`

**Fără Comlink — verbose cu mesaje manuale:**
\`\`\`javascript
// Mulți boilerplate pentru fiecare funcție
worker.postMessage({ type: "FIBONACCI", n: 40 });
worker.onmessage = (e) => { if (e.data.type === "FIBONACCI_RESULT") ... };
\`\`\`

**Cu Comlink — simplu ca un apel local:**
\`\`\`javascript
// worker.js
import { expose } from "comlink";

const api = {
  fibonacci(n) {
    if (n <= 1) return n;
    return api.fibonacci(n - 1) + api.fibonacci(n - 2);
  },
  async processData(items) {
    return items.map(item => ({ ...item, processed: true }));
  },
  // Poate primi callbacks din main thread
  async withProgress(n, onProgress) {
    for (let i = 0; i <= n; i++) {
      await onProgress(i / n * 100); // apelează funcție din main thread
    }
  }
};
expose(api); // expune API-ul
\`\`\`

\`\`\`javascript
// main.js
import { wrap, proxy } from "comlink";

const worker = new Worker(new URL("./worker.js", import.meta.url));
const api = wrap(worker); // proxy magic!

// Apelezi funcțiile ca și cum ar fi locale
const result = await api.fibonacci(40); // rulează în worker, UI liber
const data = await api.processData(myItems);

// Callback din worker
await api.withProgress(100, proxy((pct) => {
  progressBar.style.width = pct + "%"; // modifici DOM din callback
}));
\`\`\`

• **\`proxy(fn)\`** — face un callback transferabil la worker (funcțiile nu se pot trimite normal).
• **\`expose(obj)\`** — expune obiect cu metode din worker.
• **\`wrap(worker)\`** — creează Proxy care convertește orice apel în mesaje.
• Comlink folosește \`Proxy\` + \`MessageChannel\` sub capotă.`,
  },
  {
    lesson: "38. Web Workers",
    title: "Module Workers si OffscreenCanvas",
    content: `**Module Workers** suportă \`import/export\` ES6 în Web Workers. **OffscreenCanvas** mută randarea Canvas pe un thread separat.

**Module Workers:**
\`\`\`javascript
// Creare worker cu tip "module"
const worker = new Worker("./worker.js", { type: "module" });

// worker.js — poate folosi import/export!
import { fibonacci } from "./math-utils.js";
import { compress } from "./compress.js";

self.addEventListener("message", async ({ data }) => {
  const result = fibonacci(data.n);
  self.postMessage({ result });
});
\`\`\`

**OffscreenCanvas — randare pe thread separat:**
\`\`\`javascript
// main.js — transferă canvas la worker
const canvas = document.getElementById("game-canvas");
const offscreen = canvas.transferControlToOffscreen();
// Acum canvas nu mai poate fi controlat din main thread

const worker = new Worker("./render-worker.js");
worker.postMessage({ canvas: offscreen, width: 800, height: 600 }, [offscreen]);

// Trimite input de la utilizator (mouse/keyboard)
document.addEventListener("keydown", e => {
  worker.postMessage({ type: "INPUT", key: e.key });
});
\`\`\`

\`\`\`javascript
// render-worker.js — controlează canvas offline
let canvas, ctx, animFrame;

self.addEventListener("message", ({ data }) => {
  if (data.canvas) {
    canvas = data.canvas;
    ctx = canvas.getContext("2d");
    canvas.width = data.width;
    canvas.height = data.height;
    startGameLoop();
  }
  if (data.type === "INPUT") handleInput(data.key);
});

function startGameLoop() {
  function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawFrame(ctx);
    animFrame = requestAnimationFrame(loop); // disponibil în workers!
  }
  loop();
}
\`\`\`

**Beneficii OffscreenCanvas:**
• Frame-urile se randează chiar și când main thread e ocupat cu JS.
• Jocuri, simulări fizice, vizualizări de date intensive — performanță net superioară.
• \`requestAnimationFrame\` e disponibil în workers cu OffscreenCanvas.`,
  },

  // L39: WebSockets si SSE
  {
    lesson: "39. WebSockets si SSE",
    title: "WebSockets — comunicare bidirectionala real-time",
    content: `**WebSocket** este un protocol full-duplex peste TCP — permite comunicare bidirecțională în timp real între browser și server, cu latență minimă.

\`\`\`javascript
// Conectare la server WebSocket
const ws = new WebSocket("wss://api.example.com/ws"); // wss = secure

// Evenimente de ciclu de viață
ws.addEventListener("open", () => {
  console.log("Conectat!");
  ws.send(JSON.stringify({ type: "auth", token: userToken }));
});

ws.addEventListener("message", (event) => {
  const data = JSON.parse(event.data);
  console.log("Primit:", data);
  handleMessage(data);
});

ws.addEventListener("close", (event) => {
  console.log(\`Deconectat: cod \${event.code}, motiv: \${event.reason}\`);
  // Reconectare automată dacă nu e deconectare intenționată
  if (event.code !== 1000) scheduleReconnect();
});

ws.addEventListener("error", (error) => {
  console.error("WebSocket error:", error);
});

// Trimitere mesaje
ws.send(JSON.stringify({ type: "chat", text: "Salut!" }));
ws.send(binaryData); // Blob sau ArrayBuffer pentru date binare

// Deconectare curată
ws.close(1000, "Logout"); // cod 1000 = normal closure
\`\`\`

**Proprietăți utile:**
\`\`\`javascript
ws.readyState; // 0=CONNECTING, 1=OPEN, 2=CLOSING, 3=CLOSED
ws.bufferedAmount; // bytes în buffer de trimitere (0 = gol)

// Trimitere sigură doar dacă conexiunea e deschisă
function safeSend(data) {
  if (ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify(data));
  }
}
\`\`\`

• **WebSocket vs HTTP:** HTTP e request-response (client inițiază mereu); WS e persistent bidirectional.
• **Use cases:** chat, notificări live, colaborare în timp real, trading, gaming.`,
  },
  {
    lesson: "39. WebSockets si SSE",
    title: "Reconnect logic si heartbeat",
    content: `Conexiunile WebSocket pot cădea din cauza rețelei sau server restart. **Reconnect logic** și **heartbeat** asigură conexiune stabilă în producție.

**Reconnect cu exponential backoff:**
\`\`\`javascript
class WebSocketClient {
  #ws = null;
  #reconnectAttempts = 0;
  #maxAttempts = 10;
  #handlers = new Map();

  constructor(url) {
    this.url = url;
    this.connect();
  }

  connect() {
    this.#ws = new WebSocket(this.url);
    this.#ws.addEventListener("open", () => {
      console.log("Conectat");
      this.#reconnectAttempts = 0; // reset counter
      this.#startHeartbeat();
      this.#emit("open");
    });
    this.#ws.addEventListener("message", e => {
      const data = JSON.parse(e.data);
      if (data.type === "pong") return; // răspuns heartbeat — ignorat
      this.#emit("message", data);
    });
    this.#ws.addEventListener("close", (e) => {
      this.#stopHeartbeat();
      if (e.code !== 1000) this.#scheduleReconnect();
    });
  }

  #scheduleReconnect() {
    if (this.#reconnectAttempts >= this.#maxAttempts) {
      this.#emit("error", new Error("Max reconnect attempts"));
      return;
    }
    const delay = Math.min(1000 * Math.pow(2, this.#reconnectAttempts), 30000);
    console.log(\`Reconectare în \${delay}ms (tentativa \${this.#reconnectAttempts + 1})\`);
    setTimeout(() => { this.#reconnectAttempts++; this.connect(); }, delay);
  }

  #pingInterval = null;
  #startHeartbeat() {
    this.#pingInterval = setInterval(() => {
      if (this.#ws.readyState === WebSocket.OPEN) {
        this.#ws.send(JSON.stringify({ type: "ping" }));
      }
    }, 25000); // ping la fiecare 25s
  }
  #stopHeartbeat() { clearInterval(this.#pingInterval); }

  send(data) { this.#ws.send(JSON.stringify(data)); }
  on(event, cb) { this.#handlers.set(event, cb); }
  #emit(event, data) { this.#handlers.get(event)?.(data); }
}
\`\`\``,
  },
  {
    lesson: "39. WebSockets si SSE",
    title: "Server-Sent Events (SSE) — server push unidirectional",
    content: `**Server-Sent Events (SSE)** permite serverului să trimită date la client peste HTTP — simplu, unidirecțional. Mai ușor decât WebSocket când nu ai nevoie de comunicare din client.

\`\`\`javascript
// Client — API nativ, simplu
const sse = new EventSource("/api/events");

// Mesaj generic
sse.addEventListener("message", (event) => {
  const data = JSON.parse(event.data);
  console.log("Update:", data);
});

// Mesaje cu tip custom
sse.addEventListener("notification", (event) => {
  showNotification(JSON.parse(event.data));
});

sse.addEventListener("price-update", (event) => {
  updatePriceDisplay(JSON.parse(event.data));
});

// Gestionare erori și reconectare
sse.addEventListener("error", (event) => {
  if (event.target.readyState === EventSource.CLOSED) {
    console.log("SSE deconectat");
  }
  // EventSource reconectează AUTOMAT după eroare — un avantaj major vs WebSocket!
});

sse.close(); // deconectare manuală
\`\`\`

**Server (Node.js / Express):**
\`\`\`javascript
app.get("/api/events", (req, res) => {
  // Headers speciali pentru SSE
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  const sendEvent = (type, data) => {
    res.write(\`event: \${type}\\n\`);
    res.write(\`data: \${JSON.stringify(data)}\\n\\n\`); // dublu newline = end of message
  };

  // Trimite update periodic
  const interval = setInterval(() => {
    sendEvent("price-update", { symbol: "BTC", price: getPrice() });
  }, 1000);

  // Cleanup când clientul se deconectează
  req.on("close", () => clearInterval(interval));
});
\`\`\`

**SSE vs WebSocket:**
• **SSE** — unidirecțional (server→client), HTTP standard, reconectare automată, simplu
• **WebSocket** — bidirecțional, protocol propriu, mai complex, pentru chat/gaming
• **SSE use cases:** notificări, live feeds, progress bars, streaming AI responses`,
  },
  {
    lesson: "39. WebSockets si SSE",
    title: "WebSocket in React cu custom hook",
    content: `Integrarea WebSocket în React necesară atenție specială — trebuie să gestionezi ciclu de viață al componentei și să previi memory leaks.

\`\`\`javascript
// hooks/useWebSocket.js
import { useState, useEffect, useRef, useCallback } from "react";

function useWebSocket(url) {
  const [status, setStatus] = useState("connecting"); // "connecting"|"open"|"closed"|"error"
  const [lastMessage, setLastMessage] = useState(null);
  const wsRef = useRef(null);
  const reconnectRef = useRef(0);

  useEffect(() => {
    let ws;
    let reconnectTimer;

    function connect() {
      ws = new WebSocket(url);
      wsRef.current = ws;

      ws.onopen = () => { setStatus("open"); reconnectRef.current = 0; };
      ws.onmessage = (e) => setLastMessage(JSON.parse(e.data));
      ws.onerror = () => setStatus("error");
      ws.onclose = (e) => {
        setStatus("closed");
        if (e.code !== 1000 && reconnectRef.current < 5) {
          const delay = 1000 * Math.pow(2, reconnectRef.current++);
          reconnectTimer = setTimeout(connect, delay);
        }
      };
    }
    connect();

    return () => {
      clearTimeout(reconnectTimer);
      ws?.close(1000); // cleanup la unmount
    };
  }, [url]);

  const send = useCallback((data) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(data));
    }
  }, []);

  return { status, lastMessage, send };
}

// Utilizare în componentă
function ChatApp() {
  const { status, lastMessage, send } = useWebSocket("wss://chat.example.com/ws");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (lastMessage) setMessages(prev => [...prev, lastMessage]);
  }, [lastMessage]);

  return (
    <div>
      <div>Status: {status}</div>
      {messages.map((m, i) => <div key={i}>{m.text}</div>)}
      <button onClick={() => send({ type: "chat", text: "Salut!" })}>Trimite</button>
    </div>
  );
}
\`\`\`

**Esențial:** \`useEffect\` cleanup (return) închide WebSocket la unmount — fără asta rămân conexiuni zombie.`,
  },

  // L40: Canvas API
  {
    lesson: "40. Canvas API",
    title: "Canvas 2D — primitive si context",
    content: `**Canvas API** permite desenare 2D programatică direct în browser — grafice, jocuri, editoare foto, vizualizări de date.

\`\`\`html
<canvas id="myCanvas" width="600" height="400"></canvas>
\`\`\`

\`\`\`javascript
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d"); // context 2D

// Setare dimensiuni corecte (evită blur pe retina)
canvas.width = canvas.offsetWidth * devicePixelRatio;
canvas.height = canvas.offsetHeight * devicePixelRatio;
ctx.scale(devicePixelRatio, devicePixelRatio);
\`\`\`

**Primitive de bază:**
\`\`\`javascript
// Dreptunghi
ctx.fillStyle = "#3498db";
ctx.fillRect(50, 50, 200, 100); // x, y, width, height

ctx.strokeStyle = "#2c3e50";
ctx.lineWidth = 3;
ctx.strokeRect(50, 50, 200, 100); // contur fără umplere

ctx.clearRect(0, 0, canvas.width, canvas.height); // șterge o zonă

// Path — forme complexe
ctx.beginPath();
ctx.moveTo(100, 100); // punct start
ctx.lineTo(200, 50);  // linie la
ctx.lineTo(300, 100);
ctx.lineTo(200, 150);
ctx.closePath();      // închide path
ctx.fillStyle = "rgba(255, 99, 71, 0.7)";
ctx.fill();
ctx.stroke();

// Cerc
ctx.beginPath();
ctx.arc(300, 200, 80, 0, Math.PI * 2); // cx, cy, raza, unghiStart, unghiFinal
ctx.fillStyle = "#2ecc71";
ctx.fill();

// Text
ctx.font = "bold 24px Arial";
ctx.fillStyle = "#333";
ctx.fillText("Hello Canvas!", 50, 300);
ctx.textAlign = "center";
ctx.fillText("Centrat", canvas.width / 2, 350);
\`\`\`

**State management — save/restore:**
\`\`\`javascript
ctx.save(); // salvează stilurile curente
ctx.fillStyle = "red";
ctx.rotate(Math.PI / 4);
ctx.fillRect(-50, -50, 100, 100);
ctx.restore(); // restaurează stilul anterior
// Acum contextul e ca înainte de save()
\`\`\``,
  },
  {
    lesson: "40. Canvas API",
    title: "Animation loop cu requestAnimationFrame",
    content: `**requestAnimationFrame (rAF)** este mecanismul corect pentru animații Canvas — sincronizat cu refresh-ul ecranului (60fps sau mai mult), eficient și oprit automat când tabul nu e vizibil.

\`\`\`javascript
let animId;
let x = 0;
let velocity = 3;

function draw(timestamp) {
  // timestamp = milisecunde de la start, util pentru animații bazate pe timp
  ctx.clearRect(0, 0, canvas.width, canvas.height); // șterge frame anterior

  // Actualizare stare
  x += velocity;
  if (x > canvas.width - 50 || x < 0) velocity *= -1; // bouncing

  // Desenare
  ctx.fillStyle = "#e74c3c";
  ctx.beginPath();
  ctx.arc(x, canvas.height / 2, 25, 0, Math.PI * 2);
  ctx.fill();

  animId = requestAnimationFrame(draw); // cere următorul frame
}

animId = requestAnimationFrame(draw); // pornire

// Oprire animație
function stopAnimation() { cancelAnimationFrame(animId); }
\`\`\`

**Animație bazată pe timp (independentă de FPS):**
\`\`\`javascript
let lastTime = 0;
const SPEED = 200; // pixeli pe secundă

function gameLoop(timestamp) {
  const deltaTime = (timestamp - lastTime) / 1000; // secunde scurse
  lastTime = timestamp;

  // Mișcare bazată pe timp, nu pe frame
  player.x += player.velocityX * deltaTime;
  player.y += player.velocityY * deltaTime;

  // Desenează
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPlayer(ctx, player);
  drawEnemies(ctx, enemies);
  drawHUD(ctx, score);

  requestAnimationFrame(gameLoop);
}
requestAnimationFrame(gameLoop);
\`\`\`

**De ce rAF în loc de setInterval:**
• Sincronizat cu monitorul → animații fluide, fără tear
• Pauzat automat când tabul e inactiv → economisești CPU/baterie
• Timestamp precis inclus în callback
• Browser optimizează multiple rAF în același frame`,
  },
  {
    lesson: "40. Canvas API",
    title: "Transformari, gradient si imagini",
    content: `Canvas suportă **transformări geometrice**, **gradienturi** complexe și **randare de imagini** cu manipulare la nivel de pixel.

**Transformări:**
\`\`\`javascript
// Translație
ctx.translate(canvas.width / 2, canvas.height / 2); // mută originea la centru
ctx.rotate(Math.PI / 6); // rotație 30 grade (radiani!)
ctx.scale(2, 2); // scalare
ctx.transform(a, b, c, d, e, f); // matrice de transformare custom

// Pattern: save → transformare → desenare → restore
ctx.save();
ctx.translate(300, 200);
ctx.rotate(Date.now() / 1000); // rotație continuă
ctx.fillRect(-25, -25, 50, 50); // centrat pe originea mutată
ctx.restore();
\`\`\`

**Gradienturi:**
\`\`\`javascript
// Gradient liniar
const linearGrad = ctx.createLinearGradient(0, 0, canvas.width, 0);
linearGrad.addColorStop(0, "#3498db");
linearGrad.addColorStop(0.5, "#9b59b6");
linearGrad.addColorStop(1, "#e74c3c");
ctx.fillStyle = linearGrad;
ctx.fillRect(0, 0, canvas.width, 100);

// Gradient radial
const radGrad = ctx.createRadialGradient(300, 200, 10, 300, 200, 150);
radGrad.addColorStop(0, "white");
radGrad.addColorStop(1, "#3498db");
ctx.fillStyle = radGrad;
ctx.beginPath();
ctx.arc(300, 200, 150, 0, Math.PI * 2);
ctx.fill();
\`\`\`

**Imagini și manipulare pixeli:**
\`\`\`javascript
const img = new Image();
img.onload = () => {
  ctx.drawImage(img, 0, 0); // desenare simplă
  ctx.drawImage(img, 0, 0, 300, 200); // cu scalare
  ctx.drawImage(img, 50, 50, 100, 100, 0, 0, 300, 200); // crop + scalare

  // Manipulare pixeli
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data; // RGBA flat array
  for (let i = 0; i < data.length; i += 4) {
    const gray = data[i]*0.3 + data[i+1]*0.59 + data[i+2]*0.11;
    data[i] = data[i+1] = data[i+2] = gray; // grayscale
  }
  ctx.putImageData(imageData, 0, 0); // aplică modificările
};
img.src = "/photo.jpg";
\`\`\``,
  },
  {
    lesson: "40. Canvas API",
    title: "Interactivitate — mouse events si hit testing",
    content: `Canvas nu are elemente DOM individuale — interactivitatea se implementează manual prin **hit testing** (verificarea dacă un punct e în interiorul unei forme).

\`\`\`javascript
const shapes = [];

// Adaugă forme cu metadata pentru hit testing
function addCircle(x, y, r, color) {
  shapes.push({ type: "circle", x, y, r, color, hovered: false });
}

// Conversie coordonate mouse → canvas (pentru retina/scalare)
function getCanvasPos(event) {
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;
  return {
    x: (event.clientX - rect.left) * scaleX,
    y: (event.clientY - rect.top) * scaleY
  };
}

// Hit testing
function hitTest(shape, { x, y }) {
  if (shape.type === "circle") {
    const dx = x - shape.x, dy = y - shape.y;
    return Math.sqrt(dx*dx + dy*dy) <= shape.r;
  }
  if (shape.type === "rect") {
    return x >= shape.x && x <= shape.x + shape.w &&
           y >= shape.y && y <= shape.y + shape.h;
  }
}

canvas.addEventListener("mousemove", (e) => {
  const pos = getCanvasPos(e);
  shapes.forEach(s => s.hovered = hitTest(s, pos));
  canvas.style.cursor = shapes.some(s => s.hovered) ? "pointer" : "default";
  render();
});

canvas.addEventListener("click", (e) => {
  const pos = getCanvasPos(e);
  const clicked = shapes.find(s => hitTest(s, pos));
  if (clicked) selectShape(clicked);
});

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  shapes.forEach(s => {
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fillStyle = s.hovered ? lighten(s.color) : s.color;
    ctx.fill();
    if (s.selected) { ctx.strokeStyle = "#fff"; ctx.lineWidth = 3; ctx.stroke(); }
  });
}
\`\`\`

**Drag and drop pe canvas:**
\`\`\`javascript
let dragging = null;
canvas.addEventListener("mousedown", e => {
  const pos = getCanvasPos(e);
  dragging = shapes.find(s => hitTest(s, pos)) || null;
});
canvas.addEventListener("mousemove", e => {
  if (!dragging) return;
  const pos = getCanvasPos(e);
  dragging.x = pos.x; dragging.y = pos.y;
  render();
});
canvas.addEventListener("mouseup", () => dragging = null);
\`\`\``,
  },

  // L41: JavaScript Performance
  {
    lesson: "41. JavaScript Performance",
    title: "Memory leaks — identificare si prevenire",
    content: `**Memory leaks** sunt zone de memorie care nu mai sunt folosite dar nu pot fi garbage collected. Cauzele principale în JavaScript:

**1. Event listeners nedetașați:**
\`\`\`javascript
// BAD — la fiecare render, adaugi un nou listener
function renderList(items) {
  items.forEach(item => {
    const el = document.createElement("div");
    el.addEventListener("click", handleClick); // se acumulează!
    container.appendChild(el);
  });
}

// GOOD — event delegation sau cleanup
function renderList(items) {
  container.innerHTML = ""; // șterge listeners vechi cu elementele
  items.forEach(item => {
    const el = document.createElement("div");
    el.dataset.id = item.id;
    container.appendChild(el);
  });
}
container.addEventListener("click", e => {
  if (e.target.dataset.id) handleClick(e.target.dataset.id);
});
\`\`\`

**2. Closure care rețin referințe mari:**
\`\`\`javascript
// BAD — closure reține întregul array
function processLargeArray(arr) {
  const first = arr[0];
  return () => console.log(first, arr.length); // arr nu poate fi GC
}
// GOOD
function processLargeArray(arr) {
  const first = arr[0];
  const len = arr.length; // salvezi doar ce ai nevoie
  return () => console.log(first, len);
}
\`\`\`

**3. Timere și intervale neobrite:**
\`\`\`javascript
class Component {
  start() {
    this.interval = setInterval(() => this.update(), 1000);
  }
  destroy() {
    clearInterval(this.interval); // OBLIGATORIU la cleanup
  }
}
\`\`\`

**4. Referințe la DOM-ul eliminat:**
\`\`\`javascript
// Element eliminat din DOM dar ținut în Map normal → leak
const cache = new Map(); // BAD
// GOOD: WeakMap — GC-ul poate colecta dacă elementul e eliminat
const cache = new WeakMap();
\`\`\`

**Detectare leaks în Chrome DevTools:**
1. Memory tab → Heap Snapshot
2. Effectuează acțiunile suspecte
3. Alt Heap Snapshot
4. Compară — obiectele care cresc sunt leak candidates`,
  },
  {
    lesson: "41. JavaScript Performance",
    title: "Profiling si optimization techniques",
    content: `**Profilarea** identifică exact ce cod este lent. Optimizează mereu după măsurare — nu ghici.

**Chrome DevTools Performance:**
1. DevTools → Performance → Record
2. Efectuează acțiunile lente
3. Stop → analizează flame chart
4. Long Tasks (>50ms) = probleme de responsivitate

**Tehnici de optimizare:**

**1. Virtualizare list — pentru liste mari (1000+ itemi):**
\`\`\`javascript
// Randezi doar itemii vizibili, nu toți 10.000
class VirtualList {
  constructor(container, items, itemHeight = 40) {
    this.items = items;
    this.itemHeight = itemHeight;
    this.containerHeight = container.clientHeight;
    this.scrollTop = 0;
    container.addEventListener("scroll", e => {
      this.scrollTop = e.target.scrollTop;
      this.render(container);
    });
    this.render(container);
  }
  render(container) {
    const startIdx = Math.floor(this.scrollTop / this.itemHeight);
    const visibleCount = Math.ceil(this.containerHeight / this.itemHeight) + 2;
    const visibleItems = this.items.slice(startIdx, startIdx + visibleCount);
    container.innerHTML = \`
      <div style="height:\${this.items.length * this.itemHeight}px;position:relative">
        <div style="transform:translateY(\${startIdx * this.itemHeight}px)">
          \${visibleItems.map(item => \`<div style="height:\${this.itemHeight}px">\${item}</div>\`).join("")}
        </div>
      </div>\`;
  }
}
\`\`\`

**2. Memoization pentru calcule repetate:**
\`\`\`javascript
const sortedCache = new Map();
function getSorted(arr) {
  const key = arr.join(",");
  if (sortedCache.has(key)) return sortedCache.get(key);
  const result = [...arr].sort();
  sortedCache.set(key, result);
  return result;
}
\`\`\`

**3. Batching DOM updates:**
\`\`\`javascript
// BAD — forțează layout recalcul la fiecare iterație
items.forEach(item => { item.style.height = item.offsetHeight + 10 + "px"; });
// GOOD — citești toate, apoi scrii toate
const heights = items.map(item => item.offsetHeight);
items.forEach((item, i) => { item.style.height = heights[i] + 10 + "px"; });
\`\`\``,
  },
  {
    lesson: "41. JavaScript Performance",
    title: "Web Vitals, layout thrashing si best practices",
    content: `**Web Vitals** sunt metricile Google pentru UX. **Layout thrashing** este una din cele mai frecvente cauze de performanță slabă.

**Core Web Vitals:**
\`\`\`
LCP (Largest Contentful Paint) < 2.5s — încărcarea elementului principal
FID (First Input Delay) < 100ms — răspuns la prima interacțiune
CLS (Cumulative Layout Shift) < 0.1 — stabilitate vizuală
INP (Interaction to Next Paint) < 200ms — nou metric interacțiune
\`\`\`

**Layout thrashing** — citire și scriere alternată de proprietăți layout:
\`\`\`javascript
// BAD — forțează browser să recalculeze layout de 100x
for (const el of elements) {
  const h = el.offsetHeight; // citire → forțează layout recalcul
  el.style.height = h * 2 + "px"; // scriere → invalidează layout
  // Urmează alt element: browser trebuie să recalculeze din nou!
}
// Durată: ~200ms pentru 100 elemente

// GOOD — Read all, then Write all
const heights = elements.map(el => el.offsetHeight); // toate citirile
elements.forEach((el, i) => el.style.height = heights[i] * 2 + "px"); // toate scrierile
// Durată: ~5ms pentru 100 elemente
\`\`\`

**Best practices generale:**

**CSS vs JS pentru animații:**
\`\`\`javascript
// BAD — JS animație → layout thrashing
el.style.left = x + "px"; // forțează layout
// GOOD — CSS transform → compositor thread, fără layout
el.style.transform = \`translateX(\${x}px)\`; // GPU accelerat
\`\`\`

**Reducerea bundle size:**
\`\`\`javascript
// BAD — importă tot Lodash (70KB)
import _ from "lodash";
_.debounce(fn, 300);
// GOOD — importă doar funcția necesară (2KB)
import debounce from "lodash/debounce";
\`\`\`

**will-change — hint pentru compositor:**
\`\`\`css
.animated-element { will-change: transform, opacity; }
/* Folosește rar — consumă memorie GPU */
\`\`\`

**requestIdleCallback** — pentru taskuri non-critice:
\`\`\`javascript
requestIdleCallback((deadline) => {
  while (deadline.timeRemaining() > 0 && tasks.length) {
    processTask(tasks.pop()); // lucrează în "idle time"
  }
});
\`\`\``,
  },

  // L42: Design Patterns avansate JS
  {
    lesson: "42. Design Patterns avansate JS",
    title: "Proxy si Decorator patterns",
    content: `**Proxy pattern** și **Decorator pattern** adaugă comportament nou obiectelor/funcțiilor fără a le modifica direct.

**Proxy pattern — intermediar transparent:**
\`\`\`javascript
// Logging proxy pentru orice obiect
function createLoggingProxy(target, name = "Object") {
  return new Proxy(target, {
    get(t, prop) {
      const value = t[prop];
      if (typeof value === "function") {
        return (...args) => {
          console.log(\`\${name}.\${prop}(\${args.map(JSON.stringify).join(", ")})\`);
          const result = value.apply(t, args);
          console.log(\`→ \${JSON.stringify(result)}\`);
          return result;
        };
      }
      return value;
    }
  });
}

const userService = createLoggingProxy({
  findUser(id) { return { id, name: "Ana" }; },
  createUser(data) { return { id: 1, ...data }; }
}, "UserService");

userService.findUser(42); // UserService.findUser(42) → {"id":42,"name":"Ana"}
\`\`\`

**Decorator pattern — extinde funcționalitate:**
\`\`\`javascript
// Function decorators
function readonly(target, key, descriptor) {
  descriptor.writable = false;
  return descriptor;
}
function memoized(fn) {
  const cache = new Map();
  return (...args) => {
    const key = JSON.stringify(args);
    return cache.has(key) ? cache.get(key) : cache.set(key, fn(...args)).get(key);
  };
}
function timed(fn) {
  return (...args) => {
    const start = performance.now();
    const result = fn(...args);
    console.log(\`\${fn.name}: \${(performance.now() - start).toFixed(2)}ms\`);
    return result;
  };
}

// Compunere decorators
const fib = timed(memoized(function fibonacci(n) {
  return n <= 1 ? n : fibonacci(n - 1) + fibonacci(n - 2);
}));
fib(40); // fibonacci: 0.23ms (cu memoization)
\`\`\`

• **Proxy** interceptează operațiunile la nivel de obiect (get, set, etc.).
• **Decorator** înfășoară funcționalitate adițională în jurul funcțiilor/claselor.`,
  },
  {
    lesson: "42. Design Patterns avansate JS",
    title: "Module si Singleton patterns",
    content: `**Module pattern** encapsulează stare privată. **Singleton** asigură că există o singură instanță din obiect pe tot parcursul aplicației.

**Module pattern — IIFE cu API public:**
\`\`\`javascript
const AuthModule = (function() {
  // Stare privată
  let _currentUser = null;
  let _token = null;
  const _subscribers = [];

  // API public
  return {
    login(email, password) {
      // logică autentificare...
      _currentUser = { email };
      _token = generateToken();
      _subscribers.forEach(fn => fn("login", _currentUser));
    },
    logout() {
      _currentUser = null;
      _token = null;
      _subscribers.forEach(fn => fn("logout", null));
    },
    getUser() { return _currentUser ? { ..._currentUser } : null; },
    isAuthenticated() { return _token !== null; },
    onAuthChange(callback) {
      _subscribers.push(callback);
      return () => { // returnează unsubscribe
        const idx = _subscribers.indexOf(callback);
        if (idx !== -1) _subscribers.splice(idx, 1);
      };
    }
  };
})();

AuthModule.login("ana@test.com", "parola");
console.log(AuthModule.isAuthenticated()); // true
console.log(AuthModule._token); // undefined — privat!
\`\`\`

**Singleton cu clasă ES6:**
\`\`\`javascript
class Database {
  static #instance = null;
  #connection = null;

  static getInstance() {
    if (!Database.#instance) {
      Database.#instance = new Database();
    }
    return Database.#instance;
  }

  connect(url) {
    if (!this.#connection) {
      this.#connection = createConnection(url);
      console.log("Conexiune nouă creată");
    }
    return this.#connection;
  }
}

const db1 = Database.getInstance();
const db2 = Database.getInstance();
console.log(db1 === db2); // true — aceeași instanță
db1.connect("mongodb://localhost"); // Conexiune nouă creată
db2.connect("mongodb://localhost"); // nimic — conexiune existentă
\`\`\``,
  },
  {
    lesson: "42. Design Patterns avansate JS",
    title: "Observer, Strategy si Factory patterns",
    content: `Trei pattern-uri esențiale: **Observer** pentru event-driven, **Strategy** pentru algoritmi interschimbabili, **Factory** pentru crearea obiectelor.

**Strategy pattern — selectare algoritm la runtime:**
\`\`\`javascript
// Strategii de sortare
const sortStrategies = {
  bubble: (arr) => { /* bubble sort */ },
  quick: (arr) => [...arr].sort((a, b) => a - b),
  radix: (arr) => { /* radix sort */ }
};

class DataSorter {
  #strategy;
  constructor(strategyName = "quick") {
    this.#strategy = sortStrategies[strategyName];
  }
  setStrategy(name) { this.#strategy = sortStrategies[name]; }
  sort(data) { return this.#strategy(data); }
}

const sorter = new DataSorter("quick");
sorter.sort([3, 1, 4, 1, 5]); // folosește quick sort
sorter.setStrategy("bubble");
sorter.sort([3, 1, 4, 1, 5]); // acum bubble sort
\`\`\`

**Factory pattern — crearea obiectelor fără new:**
\`\`\`javascript
class ButtonFactory {
  static create(type, props = {}) {
    const variants = {
      primary: (p) => ({ ...p, className: "btn btn-primary", role: "button" }),
      danger: (p) => ({ ...p, className: "btn btn-danger", role: "button" }),
      link: (p) => ({ ...p, className: "btn-link", role: "link", href: p.href || "#" }),
      icon: (p) => ({ ...p, className: "btn-icon", "aria-label": p.label })
    };
    if (!variants[type]) throw new Error(\`Tip button necunoscut: \${type}\`);
    return variants[type](props);
  }
}

const btn = ButtonFactory.create("primary", { text: "Salvează", onClick: save });
const dangerBtn = ButtonFactory.create("danger", { text: "Șterge", onClick: remove });
\`\`\`

**Observer pattern — notificare automată:**
\`\`\`javascript
class Store {
  #state = {};
  #observers = new Map();

  setState(key, value) {
    const old = this.#state[key];
    this.#state[key] = value;
    if (old !== value) this.#notify(key, value, old);
  }
  getState(key) { return this.#state[key]; }
  subscribe(key, fn) {
    if (!this.#observers.has(key)) this.#observers.set(key, new Set());
    this.#observers.get(key).add(fn);
    return () => this.#observers.get(key)?.delete(fn);
  }
  #notify(key, val, old) { this.#observers.get(key)?.forEach(fn => fn(val, old)); }
}
\`\`\``,
  },

  // L43: Functional Programming
  {
    lesson: "43. Functional Programming in JS",
    title: "Imutabilitate si pure functions",
    content: `**Functional Programming (FP)** tratează computația ca evaluare de funcții matematice. Principiile de bază sunt **imutabilitatea** și **funcțiile pure**.

**Funcții pure** — output depinde DOAR de input, fără efecte secundare:
\`\`\`javascript
// IMPURE — efecte secundare (modifică variabilă externă)
let total = 0;
function addToTotal(n) { total += n; return total; } // modifică external state

// PURE — același input → același output, mereu
function add(a, b) { return a + b; } // ✓ pură
function formatName(first, last) { return \`\${first} \${last}\`; } // ✓ pură

// IMPURE — depinde de timp (output diferit pentru același input)
function getAge(birthYear) { return new Date().getFullYear() - birthYear; }

// PURE — primește year ca parametru
function getAge(birthYear, currentYear) { return currentYear - birthYear; }
\`\`\`

**Imutabilitate — nu modifici, creezi versiuni noi:**
\`\`\`javascript
// MUTABLE — modificare directă (periculos în state management)
const user = { name: "Ana", age: 25 };
user.age = 26; // modificare directă — mutație!

// IMMUTABLE — crezi copii cu modificările
const updatedUser = { ...user, age: 26 }; // user rămâne neschimbat

// Arrays — operații imutabile
const arr = [1, 2, 3, 4, 5];
const withNew = [...arr, 6];           // adăugare la final
const withPrepend = [0, ...arr];       // adăugare la început
const without3 = arr.filter(x => x !== 3); // ștergere
const doubled = arr.map(x => x * 2);  // transformare
// arr rămâne [1, 2, 3, 4, 5] în toate cazurile
\`\`\`

**De ce imutabilitate:**
\`\`\`javascript
// Ușurință în debugging — poți compara state-uri
const prev = { count: 1 };
const next = updateState(prev, { count: 2 });
console.log(prev); // { count: 1 } — intact, poți inspecta
// React, Redux se bazează pe imutabilitate pentru a detecta schimbările eficient
\`\`\`

• **Beneficii FP:** cod predictibil, ușor de testat (funcțiile pure au zero side effects), ușor de compus.`,
  },
  {
    lesson: "43. Functional Programming in JS",
    title: "compose, pipe si point-free style",
    content: `**Compose** și **pipe** sunt operații fundamentale în FP pentru a combina funcții. **Point-free style** elimină menționarea explicită a argumentelor.

**compose** — aplică funcțiile de la dreapta la stânga (matematică):
\`\`\`javascript
const compose = (...fns) => x => fns.reduceRight((acc, fn) => fn(acc), x);

const trim = str => str.trim();
const toLowerCase = str => str.toLowerCase();
const addExclaim = str => str + "!";

const processText = compose(addExclaim, toLowerCase, trim);
processText("  Hello World  "); // "hello world!"
// Ordinea: trim → toLowerCase → addExclaim
\`\`\`

**pipe** — aplică funcțiile de la stânga la dreapta (mai lizibil):
\`\`\`javascript
const pipe = (...fns) => x => fns.reduce((acc, fn) => fn(acc), x);

const processUser = pipe(
  user => ({ ...user, name: user.name.trim() }),
  user => ({ ...user, email: user.email.toLowerCase() }),
  user => ({ ...user, slug: user.name.replace(/\s+/g, "-").toLowerCase() }),
  user => ({ ...user, createdAt: new Date().toISOString() })
);

const user = processUser({ name: "  Ana Mare  ", email: "ANA@TEST.COM" });
// { name: "Ana Mare", email: "ana@test.com", slug: "ana-mare", createdAt: "..." }
\`\`\`

**Point-free style — fără menționarea argumentului:**
\`\`\`javascript
// Cu punct (pointful)
const doubles = nums => nums.map(n => n * 2);
const positives = nums => nums.filter(n => n > 0);

// Point-free (pointless) — mai concis dar mai abstract
const double = n => n * 2;
const isPositive = n => n > 0;
const doubles = nums => nums.map(double);       // sau:
const doubles = pipe(array => array.map(double));

// Curry face point-free mai naturală
const map = fn => arr => arr.map(fn);
const filter = pred => arr => arr.filter(pred);
const processNumbers = pipe(filter(isPositive), map(double));
processNumbers([-1, 2, -3, 4]); // [4, 8]
\`\`\`

**Avantaj:** funcțiile mici și curate se pot compune în oricâte moduri, ca piesele Lego.`,
  },
  {
    lesson: "43. Functional Programming in JS",
    title: "Functori, Maybe si Result monads",
    content: `**Functors** sunt container-e care implementează \`map\`. **Monadele** sunt functors cu \`flatMap\` (chain) — permit compunerea operațiunilor care pot eșua.

**Functor — orice cu map:**
\`\`\`javascript
// Array e un functor
[1, 2, 3].map(x => x * 2); // [2, 4, 6]

// Custom functor
class Box {
  constructor(value) { this.value = value; }
  map(fn) { return new Box(fn(this.value)); }
  fold(fn) { return fn(this.value); } // extrage valoarea
}
const result = new Box(5)
  .map(x => x * 2) // Box(10)
  .map(x => x + 1) // Box(11)
  .fold(x => x);   // 11
\`\`\`

**Maybe monad — gestionare null/undefined sigur:**
\`\`\`javascript
class Maybe {
  static of(value) { return new Maybe(value); }
  constructor(value) { this._value = value; }
  isNothing() { return this._value == null; }
  map(fn) {
    return this.isNothing() ? this : Maybe.of(fn(this._value));
  }
  flatMap(fn) { return this.isNothing() ? this : fn(this._value); }
  getOrElse(defaultVal) { return this.isNothing() ? defaultVal : this._value; }
}

// Fără Maybe — null checks peste tot
function getStreetName(user) {
  if (user && user.address && user.address.street) {
    return user.address.street.name;
  }
  return "Necunoscut";
}

// Cu Maybe — compunere curată
const getStreetName = (user) =>
  Maybe.of(user)
    .map(u => u.address)
    .map(a => a.street)
    .map(s => s.name)
    .getOrElse("Necunoscut");
\`\`\`

**Result monad (Either) — succes sau eroare:**
\`\`\`javascript
const Ok = value => ({ ok: true, value, map: fn => Ok(fn(value)), flatMap: fn => fn(value) });
const Err = error => ({ ok: false, error, map: () => Err(error), flatMap: () => Err(error) });

function parseAge(str) {
  const n = parseInt(str);
  if (isNaN(n)) return Err(\`"\${str}" nu e un număr\`);
  if (n < 0 || n > 150) return Err(\`Vârsta \${n} e nerealistă\`);
  return Ok(n);
}
parseAge("25").map(age => age * 2); // Ok(50)
parseAge("abc").map(age => age * 2); // Err("abc nu e un număr")
\`\`\``,
  },
  {
    lesson: "43. Functional Programming in JS",
    title: "Transducers si functii de ordin superior",
    content: `**Funcțiile de ordin superior (HOF)** primesc sau returnează funcții. **Transducers** sunt transformatori componibili care evită crearea de array-uri intermediare.

**Higher-Order Functions:**
\`\`\`javascript
// Funcții care returnează funcții
const multiplier = factor => n => n * factor;
const double = multiplier(2);
const triple = multiplier(3);
[1, 2, 3].map(double); // [2, 4, 6]

// Funcții care primesc funcții
function retry(fn, times = 3) {
  return async (...args) => {
    for (let i = 0; i < times; i++) {
      try { return await fn(...args); }
      catch (e) { if (i === times - 1) throw e; }
    }
  };
}
const safeSearch = retry(searchAPI, 3);

// Partial application
function partial(fn, ...preArgs) {
  return (...laterArgs) => fn(...preArgs, ...laterArgs);
}
const add = (a, b, c) => a + b + c;
const add10 = partial(add, 10);
add10(5, 2); // 17
\`\`\`

**Transducers — transformare fără array intermediar:**
\`\`\`javascript
// Normal: creează 3 array-uri intermediare
const result = [1,2,3,4,5,6,7,8,9,10]
  .filter(n => n % 2 === 0)   // [2,4,6,8,10] — array nou
  .map(n => n * n)            // [4,16,36,64,100] — array nou
  .slice(0, 3);               // [4,16,36] — array nou

// Transducer: o singură trecere, fără intermediate
const filterEven = (reducer) => (acc, n) => n % 2 === 0 ? reducer(acc, n) : acc;
const mapSquare = (reducer) => (acc, n) => reducer(acc, n * n);
const takeFirst3 = (reducer) => (acc, n) => acc.length < 3 ? reducer(acc, n) : acc;

// Compune transducers (de la stânga la dreapta cu pipe)
const xform = [filterEven, mapSquare, takeFirst3].reduce(
  (composed, t) => t(composed),
  (acc, n) => [...acc, n] // reducer final
);

[1,2,3,4,5,6,7,8,9,10].reduce(xform, []); // [4, 16, 36]
// O singură trecere prin array, fără intermediare!
\`\`\`

**Concluzie FP în JavaScript:** nu trebuie să fii pur 100%; folosește conceptele FP (imutabilitate, funcții pure, compose/pipe) unde simplifică codul și lasă efectele secundare izolate la periferia aplicației.`,
  },

  // L44: TypeScript Avansat
  {
    lesson: "44. TypeScript Avansat",
    title: "Generics — tipuri reutilizabile si constrangeri",
    content: `**Generics** în TypeScript permit scrierea de cod flexibil care păstrează tipuri corecte pentru orice input. Constrângerile (\`extends\`) limitează tipurile acceptate.

**Generics de bază:**
\`\`\`typescript
// Fără generic — pierzi tipul
function wrap(value: any): any { return { value }; }
const w = wrap(42); // w.value e 'any' — pierzi type safety

// Cu generic — tipul se propagă
function wrap<T>(value: T): { value: T } { return { value }; }
const w1 = wrap(42);     // { value: number }
const w2 = wrap("text"); // { value: string }
w1.value.toFixed(2);     // ✓ TypeScript știe că e number
\`\`\`

**Generics cu constrângeri:**
\`\`\`typescript
// T extends ... — acceptă doar tipuri care au proprietatea
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}
const user = { name: "Ana", age: 25 };
getProperty(user, "name"); // string ✓
getProperty(user, "age");  // number ✓
getProperty(user, "xyz");  // ✗ 'xyz' nu e cheie în user
\`\`\`

**Generic interfaces și clase:**
\`\`\`typescript
interface Repository<T, ID = number> {
  findById(id: ID): Promise<T | null>;
  findAll(filter?: Partial<T>): Promise<T[]>;
  save(entity: Omit<T, "id">): Promise<T>;
  delete(id: ID): Promise<void>;
}

class UserRepo implements Repository<User> {
  async findById(id: number) { /* ... */ return null; }
  async findAll() { /* ... */ return []; }
  async save(data: Omit<User, "id">) { /* ... */ return { id: 1, ...data }; }
  async delete(id: number) { /* ... */ }
}
\`\`\`

**Default type parameters:**
\`\`\`typescript
interface ApiResponse<T = unknown, E = Error> {
  data?: T;
  error?: E;
  status: number;
}
const r1: ApiResponse<User> = { data: user, status: 200 }; // E = Error (default)
const r2: ApiResponse<User, string> = { error: "Not found", status: 404 };
\`\`\``,
  },
  {
    lesson: "44. TypeScript Avansat",
    title: "Conditional Types si Mapped Types",
    content: `**Conditional Types** creează tipuri bazate pe condiții. **Mapped Types** transformă fiecare proprietate dintr-un tip în altceva.

**Conditional Types — \`T extends U ? X : Y\`:**
\`\`\`typescript
// Tip care schimbă comportamentul în funcție de T
type IsArray<T> = T extends any[] ? "array" : "not array";
type A = IsArray<number[]>; // "array"
type B = IsArray<string>;  // "not array"

// Extragere tip element din array
type ElementType<T> = T extends (infer E)[] ? E : never;
type StrElem = ElementType<string[]>; // string
type NumElem = ElementType<number[]>; // number

// NonNullable — eliminare null/undefined
type NonNullable<T> = T extends null | undefined ? never : T;
type A = NonNullable<string | null | undefined>; // string
\`\`\`

**Mapped Types — transformare proprietăți:**
\`\`\`typescript
// Partial manual (echivalentul Partial<T> built-in)
type MyPartial<T> = { [K in keyof T]?: T[K] };

// Readonly manual
type MyReadonly<T> = { readonly [K in keyof T]: T[K] };

// Mutable — elimină readonly
type Mutable<T> = { -readonly [K in keyof T]: T[K] };

// Required — elimină optional
type MyRequired<T> = { [K in keyof T]-?: T[K] };

// Remap cheie cu 'as' (TS 4.1+)
type Getters<T> = {
  [K in keyof T as \`get\${Capitalize<string & K>}\`]: () => T[K]
};
type UserGetters = Getters<{ name: string; age: number }>;
// { getName: () => string; getAge: () => number }
\`\`\`

**Combinare pentru tipuri complexe:**
\`\`\`typescript
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};
type DeepUser = DeepPartial<{ name: string; address: { street: string; city: string } }>;
// { name?: string; address?: { street?: string; city?: string } }
\`\`\``,
  },
  {
    lesson: "44. TypeScript Avansat",
    title: "Template Literal Types si Utility Types",
    content: `**Template Literal Types** permit construirea de tipuri din string-uri. **Utility Types** built-in rezolvă cazuri comune.

**Template Literal Types (TS 4.1+):**
\`\`\`typescript
type EventName = "click" | "focus" | "blur";
type EventHandler = \`on\${Capitalize<EventName>}\`; // "onClick" | "onFocus" | "onBlur"

// Generare CSS properties
type CSSProp = "margin" | "padding" | "border";
type CSSDirection = "top" | "bottom" | "left" | "right";
type DirectionalCSS = \`\${CSSProp}-\${CSSDirection}\`;
// "margin-top" | "margin-bottom" | ... | "border-right" (16 variante)

// Route typing
type Route = "/" | "/users" | "/users/:id" | "/posts/:id/comments";
type ExtractParam<T extends string> =
  T extends \`\${string}:\${infer Param}\` ? Param : never;
type Param = ExtractParam<"/users/:id">; // "id"
\`\`\`

**Utility Types esențiale:**
\`\`\`typescript
interface User { id: number; name: string; email: string; role: "admin"|"user"; createdAt: Date; }

// Selectare subset de proprietăți
type UserPreview = Pick<User, "id" | "name">;
// { id: number; name: string }

// Excludere proprietăți
type PublicUser = Omit<User, "role" | "createdAt">;
// { id: number; name: string; email: string }

// Extract / Exclude din union
type AdminOrUser = Extract<"admin" | "user" | "guest", "admin" | "user">;
// "admin" | "user"
type NonAdmin = Exclude<"admin" | "user" | "guest", "admin">;
// "user" | "guest"

// Function utilities
type CreateUserFn = (data: Omit<User, "id" | "createdAt">) => Promise<User>;
type CreateUserParams = Parameters<CreateUserFn>; // [data: Omit<User, "id"|"createdAt">]
type CreateUserReturn = Awaited<ReturnType<CreateUserFn>>; // User

// Record — dicționar tipat
type RolePermissions = Record<User["role"], string[]>;
// { admin: string[]; user: string[] }
\`\`\``,
  },
  {
    lesson: "44. TypeScript Avansat",
    title: "Discriminated unions, type guards si as const",
    content: `**Discriminated unions** sunt union types cu un câmp discriminant care permite narrowing. **Type guards** verifică tipul la runtime.

**Discriminated unions:**
\`\`\`typescript
type LoadingState = { status: "loading" };
type SuccessState = { status: "success"; data: User[] };
type ErrorState = { status: "error"; message: string; code: number };
type State = LoadingState | SuccessState | ErrorState;

function renderState(state: State) {
  switch (state.status) { // "status" e discriminantul
    case "loading":
      return "<Spinner />";
    case "success":
      return state.data.map(u => u.name); // TS știe că state e SuccessState
    case "error":
      return \`Error \${state.code}: \${state.message}\`; // TS știe că e ErrorState
  }
}
\`\`\`

**Type Guards — verificare runtime cu narrowing:**
\`\`\`typescript
// typeof guard
function printId(id: string | number) {
  if (typeof id === "string") {
    console.log(id.toUpperCase()); // TS știe: string
  } else {
    console.log(id.toFixed(2));    // TS știe: number
  }
}

// instanceof guard
function handleError(error: Error | string) {
  if (error instanceof TypeError) {
    console.log("Type error:", error.message);
  } else if (typeof error === "string") {
    console.log("String error:", error);
  }
}

// Custom type guard — \`is\` keyword
function isUser(obj: unknown): obj is User {
  return typeof obj === "object" && obj !== null &&
    "id" in obj && "name" in obj && "email" in obj;
}
const data: unknown = fetchData();
if (isUser(data)) {
  console.log(data.name); // TS știe că e User ✓
}
\`\`\`

**\`as const\` — inferință literală strictă:**
\`\`\`typescript
const colors = ["red", "green", "blue"] as const;
// readonly ["red", "green", "blue"] — nu mai e string[], e tuple
type Color = typeof colors[number]; // "red" | "green" | "blue"

const config = { host: "localhost", port: 3000 } as const;
// { readonly host: "localhost"; readonly port: 3000 }
// port e 3000 (literal), nu number!
\`\`\``,
  },

  // L45: Mini Proiect Final
  {
    lesson: "45. Mini Proiect JS Final — Real-time Dashboard cu WebSockets + Canvas",
    title: "DataStore si State Management",
    content: `**DataStore** gestionează starea dashboard-ului real-time — colectează date de la WebSocket, le procesează și notifică componentele UI.

\`\`\`javascript
// store/DataStore.js
class DataStore extends EventTarget {
  #series = new Map(); // metricName → Array<{time, value}>
  #MAX_POINTS = 100;   // maximum puncte per serie
  #stats = new Map();  // metricName → {min, max, avg, last}

  addDataPoint(metric, value, timestamp = Date.now()) {
    if (!this.#series.has(metric)) {
      this.#series.set(metric, []);
      this.#stats.set(metric, { min: Infinity, max: -Infinity, sum: 0, count: 0 });
    }

    const series = this.#series.get(metric);
    series.push({ time: timestamp, value });

    // Menține window-ul de MAX_POINTS
    if (series.length > this.#MAX_POINTS) series.shift();

    // Actualizare statistici
    const stats = this.#stats.get(metric);
    stats.min = Math.min(stats.min, value);
    stats.max = Math.max(stats.max, value);
    stats.sum += value;
    stats.count++;
    stats.avg = stats.sum / stats.count;
    stats.last = value;

    // Notifică observatorii
    this.dispatchEvent(new CustomEvent("update", {
      detail: { metric, value, timestamp, stats: { ...stats } }
    }));
  }

  getSeries(metric) { return [...(this.#series.get(metric) || [])]; }
  getStats(metric) { return { ...this.#stats.get(metric) }; }
  getMetrics() { return [...this.#series.keys()]; }

  // Extrage range temporal
  getSeriesInRange(metric, fromTime, toTime) {
    return this.getSeries(metric).filter(
      pt => pt.time >= fromTime && pt.time <= toTime
    );
  }
}

// Connection manager cu auto-reconnect
class DashboardConnection {
  #store;
  #ws = null;
  constructor(store) { this.#store = store; }

  connect(url) {
    this.#ws = new WebSocket(url);
    this.#ws.onmessage = ({ data }) => {
      const { metrics } = JSON.parse(data);
      Object.entries(metrics).forEach(([name, value]) => {
        this.#store.addDataPoint(name, value);
      });
    };
    this.#ws.onclose = () => setTimeout(() => this.connect(url), 3000);
  }
}

export { DataStore, DashboardConnection };
\`\`\``,
  },
  {
    lesson: "45. Mini Proiect JS Final — Real-time Dashboard cu WebSockets + Canvas",
    title: "Canvas Chart Renderer",
    content: `**Chart Renderer** desenează grafice line pe Canvas — actualizat în timp real la fiecare DataStore update, cu animații fluide.

\`\`\`javascript
// renderer/ChartRenderer.js
class LineChart {
  #canvas; #ctx; #store; #metric; #color;
  #animValue = null; #targetValue = null;

  constructor(canvas, store, metric, color = "#3498db") {
    this.#canvas = canvas;
    this.#ctx = canvas.getContext("2d");
    this.#store = store;
    this.#metric = metric;
    this.#color = color;
    this.#setupDPI();
    this.#startListening();
  }

  #setupDPI() {
    const dpr = window.devicePixelRatio || 1;
    const rect = this.#canvas.getBoundingClientRect();
    this.#canvas.width = rect.width * dpr;
    this.#canvas.height = rect.height * dpr;
    this.#ctx.scale(dpr, dpr);
    this.width = rect.width;
    this.height = rect.height;
  }

  #startListening() {
    this.#store.addEventListener("update", ({ detail }) => {
      if (detail.metric === this.#metric) this.#render();
    });
  }

  #render() {
    const ctx = this.#ctx;
    const series = this.#store.getSeries(this.#metric);
    if (series.length < 2) return;

    const pad = { top: 20, right: 20, bottom: 30, left: 50 };
    const w = this.width - pad.left - pad.right;
    const h = this.height - pad.top - pad.bottom;

    ctx.clearRect(0, 0, this.width, this.height);

    const values = series.map(p => p.value);
    const minVal = Math.min(...values) * 0.95;
    const maxVal = Math.max(...values) * 1.05;
    const range = maxVal - minVal || 1;

    const toX = (i) => pad.left + (i / (series.length - 1)) * w;
    const toY = (v) => pad.top + h - ((v - minVal) / range) * h;

    // Grid lines
    ctx.strokeStyle = "#e0e0e0";
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
      const y = pad.top + (i / 4) * h;
      ctx.beginPath(); ctx.moveTo(pad.left, y); ctx.lineTo(pad.left + w, y); ctx.stroke();
      ctx.fillStyle = "#999"; ctx.font = "11px sans-serif";
      ctx.fillText((maxVal - (i / 4) * range).toFixed(1), 5, y + 4);
    }

    // Line
    ctx.strokeStyle = this.#color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    series.forEach((pt, i) => i === 0 ? ctx.moveTo(toX(i), toY(pt.value)) : ctx.lineTo(toX(i), toY(pt.value)));
    ctx.stroke();

    // Last value label
    const stats = this.#store.getStats(this.#metric);
    ctx.fillStyle = this.#color;
    ctx.font = "bold 14px sans-serif";
    ctx.fillText(\`\${this.#metric}: \${stats.last?.toFixed(2)}\`, pad.left, 15);
  }
}

export { LineChart };
\`\`\``,
  },
];

async function main() {
  let updated = 0;
  let notFound = 0;
  for (const item of UPDATES) {
    const lessons = await p.lesson.findMany({
      where: { title: item.lesson, module: { slug: "javascript" } },
    });
    if (!lessons.length) {
      console.log(`  ! Lectie negasita: "${item.lesson}"`);
      notFound++;
      continue;
    }
    const theory = await p.theory.findFirst({
      where: { title: item.title, lessonId: { in: lessons.map((l) => l.id) } },
    });
    if (!theory) {
      console.log(`  ! Teorie negasita: "${item.title}" in "${item.lesson}"`);
      notFound++;
      continue;
    }
    await p.theory.update({
      where: { id: theory.id },
      data: { content: item.content },
    });
    console.log(
      `  ✓ "${item.title}": ${theory.content.length} → ${item.content.length} chars`
    );
    updated++;
  }
  console.log(`\nDone: ${updated} updated, ${notFound} not found`);
  await p.$disconnect();
}

main().catch((e) => { console.error(e); p.$disconnect(); process.exit(1); });
