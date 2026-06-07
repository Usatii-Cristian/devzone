"use strict";
require("dotenv").config({ path: ".env" });
const { PrismaClient } = require("@prisma/client");
const p = new PrismaClient();

// Enhanced theory content for JavaScript lessons 16-45
const UPDATES = [

  // ─── LECȚIA 16: DOM querySelector ─────────────────────────────────────────
  {
    lesson: "16. DOM: querySelector",
    title: "Ce este DOM-ul?",
    content: `**DOM** (Document Object Model) este reprezentarea în memorie a paginii HTML ca un **arbore de noduri**. JavaScript poate accesa și modifica orice element al paginii prin DOM API.

\`\`\`javascript
// Selectare elemente — querySelector returnează primul match
const titlu   = document.querySelector("h1");
const buton   = document.querySelector("#btn-submit");
const card    = document.querySelector(".card");
const input   = document.querySelector("input[type='email']");

// querySelectorAll — returnează NodeList cu TOATE match-urile
const paragrafe = document.querySelectorAll("p");
const carduri   = document.querySelectorAll(".card");

// Iterare NodeList
carduri.forEach(card => card.classList.add("vizibil"));
// sau
for (const card of carduri) { card.style.opacity = "1"; }

// Selectori mai vechi (încă valizi)
document.getElementById("app");           // by ID
document.getElementsByClassName("btn");   // HTMLCollection live
\`\`\`

• **querySelector**: acceptă orice selector CSS — ID, clasă, atribut, pseudo-selector
• **Returnează \`null\`** dacă nu găsește elementul — verifică înainte de a-l folosi
• **NodeList vs HTMLCollection**: NodeList e static (querySelector), HTMLCollection e live
• **Căutare în sub-arbore**: \`element.querySelector()\` caută doar în interiorul elementului`,
  },
  {
    lesson: "16. DOM: querySelector",
    title: "Modificarea conținutului",
    content: `Proprietățile **\`textContent\`**, **\`innerHTML\`** și **\`innerText\`** permit citirea și scrierea conținutului elementelor. Fiecare are semantică și riscuri de securitate diferite.

\`\`\`javascript
const div = document.querySelector("#mesaj");

// textContent — text pur, fără HTML (SIGUR)
div.textContent = "Bun venit!";
div.textContent = "<b>bold</b>"; // afișează literal "<b>bold</b>"

// innerHTML — interpretează HTML (PERICULOS cu date user)
div.innerHTML = "<strong>Bun venit!</strong>";

// NICIODATĂ cu date de la utilizator — XSS!
// div.innerHTML = userInput; // VULNERABILITATE!

// innerText — text vizibil, respectă CSS display:none
const ascuns = document.querySelector(".hidden");
console.log(ascuns.textContent); // afișează și textul din hidden
console.log(ascuns.innerText);   // "" — ascuns din CSS

// Creare sigură de elemente cu conținut dinamic
const p = document.createElement("p");
p.textContent = userInput; // sigur — nu interpretează HTML
document.body.appendChild(p);
\`\`\`

• **\`textContent\`**: cel mai sigur — nu interpretează HTML, mai rapid
• **\`innerHTML\`**: interpretează HTML — evita cu input de la utilizator (XSS!)
• **\`innerText\`**: respectă stilul CSS — mai lent, evitat în manipulare programatică
• **Creare sigură**: \`createElement\` + \`textContent\` pentru conținut dinamic`,
  },
  {
    lesson: "16. DOM: querySelector",
    title: "Modificarea stilului și claselor",
    content: `Modificarea stilului se face prin **\`style\`** (inline, specifică) sau prin **\`classList\`** (CSS classes, recomandată). \`classList\` oferă un API complet pentru gestionarea claselor.

\`\`\`javascript
const buton = document.querySelector(".btn");

// classList — metoda recomandată
buton.classList.add("activ");           // adaugă clasă
buton.classList.remove("dezactivat");   // elimină clasă
buton.classList.toggle("selectat");     // adaugă dacă lipsea, elimină dacă era
buton.classList.toggle("activ", true);  // forțează adăugare
buton.classList.contains("activ");      // true/false — verificare
buton.classList.replace("vechi", "nou"); // înlocuire

// Manipulare mai multor clase
buton.classList.add("mare", "primar", "animat");

// style — proprietăți inline (CSS camelCase)
const box = document.querySelector(".box");
box.style.backgroundColor = "red";    // nu background-color!
box.style.fontSize = "18px";
box.style.display = "none";           // ascunde

// Citire stiluri computate (inclusiv din CSS)
const stiluri = window.getComputedStyle(box);
console.log(stiluri.fontSize);        // "18px" sau din stylesheet
\`\`\`

• **\`classList\`**: preferată — menține separarea HTML/CSS, ușor de depanat
• **\`style\`**: pentru valori dinamice calculate în JS (poziții, animații)
• **camelCase**: \`backgroundColor\` nu \`background-color\` în JS
• **\`getComputedStyle\`**: valorile reale aplicate, inclusiv din fișiere CSS externe`,
  },
  {
    lesson: "16. DOM: querySelector",
    title: "Navigare în DOM",
    content: `**Traversal DOM** permite navigarea între noduri înrudite: părinți, copii, frați. Proprietățile moderne preferă **element nodes** (ignoră text și comentarii) față de cele vechi.

\`\`\`javascript
const lista = document.querySelector("ul");

// Copii
console.log(lista.children);           // HTMLCollection — doar element nodes
console.log(lista.childNodes);         // NodeList — include text, comentarii
console.log(lista.firstElementChild);  // primul element copil
console.log(lista.lastElementChild);   // ultimul element copil

// Părinte
const item = document.querySelector("li.activ");
console.log(item.parentElement);       // părintele imediat (element)
console.log(item.parentNode);          // părintele (orice nod)
item.closest("section");               // primul ancestor cu selector CSS

// Frați (siblings)
console.log(item.previousElementSibling); // fratele de dinainte
console.log(item.nextElementSibling);     // fratele următor

// Creare și inserare
const nou = document.createElement("li");
nou.textContent = "Element nou";
lista.appendChild(nou);                // la final
lista.prepend(nou);                    // la început
item.after(nou);                       // după item
item.before(nou);                      // înainte de item
item.remove();                         // ștergere
\`\`\`

• **\`children\`** vs **\`childNodes\`**: preferă \`children\` — exclude noduri text inutile
• **\`closest()\`**: caută un ancestor cu selector CSS — util în event delegation
• **\`append\`/\`prepend\`**: moderne, acceptă strings și elemente; \`appendChild\` — doar noduri
• **\`remove()\`**: îndepărtează elementul din DOM direct, fără a accesa părintele`,
  },

  // ─── LECȚIA 17: DOM Events ────────────────────────────────────────────────
  {
    lesson: "17. DOM: Events",
    title: "addEventListener — ascultarea evenimentelor",
    content: `**\`addEventListener\`** atașează un handler la un eveniment. E metoda modernă și recomandată — permite mai mulți handleri pe același eveniment și controlul propagării.

\`\`\`javascript
const buton = document.querySelector("#btn");

// Sintaxa: element.addEventListener(tip, callback, options)
buton.addEventListener("click", function(e) {
  console.log("Apăsat!", e.target);
});

// Cu arrow function
buton.addEventListener("click", (e) => {
  e.preventDefault(); // blochează comportamentul implicit
  console.log("Coordonate:", e.clientX, e.clientY);
});

// Eliminare handler — funcția trebuie referință, nu anonimă!
function handleClick(e) { console.log("click"); }
buton.addEventListener("click", handleClick);
buton.removeEventListener("click", handleClick);

// Options
buton.addEventListener("click", handler, { once: true });    // o singură execuție
buton.addEventListener("click", handler, { passive: true });  // nu apelează preventDefault
document.addEventListener("scroll", handler, { passive: true }); // performanță scroll
\`\`\`

• **Multiple handleri**: \`addEventListener\` poate fi apelat de mai multe ori pe același eveniment
• **\`{ once: true }\`**: handler auto-eliminat după prima execuție
• **\`{ passive: true }\`**: spune browserului că nu vei apela \`preventDefault\` — scroll mai fluid
• **Elimină handleri**: previne memory leaks — important în SPA-uri cu componente montate/demontate`,
  },
  {
    lesson: "17. DOM: Events",
    title: "Obiectul event (e)",
    content: `**Obiectul event** (primit ca parametru în handler) conține informații detaliate despre eveniment: ce element l-a declanșat, coordonate, taste apăsate, și metode de control al propagării.

\`\`\`javascript
document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();       // blochează submit-ul default al formularului
  e.stopPropagation();      // oprește bubbling la elementele parent

  console.log(e.type);      // "submit"
  console.log(e.target);    // elementul care a declanșat evenimentul
  console.log(e.currentTarget); // elementul pe care e listener-ul

  // Date formular
  const formData = new FormData(e.target);
  console.log(formData.get("email"));
});

document.addEventListener("keydown", (e) => {
  console.log(e.key);       // "Enter", "a", "ArrowUp" etc.
  console.log(e.code);      // "KeyA", "Enter", "ArrowUp"
  console.log(e.ctrlKey);   // true dacă Ctrl e apăsat
  console.log(e.shiftKey);  // true dacă Shift e apăsat
  if (e.key === "Escape") closeModal();
});

document.addEventListener("mousemove", (e) => {
  console.log(e.clientX, e.clientY); // coordonate față de viewport
  console.log(e.pageX, e.pageY);     // coordonate față de pagină
});
\`\`\`

• **\`e.target\`**: elementul originar al evenimentului (util în delegation)
• **\`e.currentTarget\`**: elementul cu listener-ul — poate fi un ancestor al target-ului
• **\`preventDefault()\`**: blochează behavior-ul default: submit, link navigation, context menu
• **\`stopPropagation()\`**: oprește bubbling-ul — folosit cu moderație`,
  },
  {
    lesson: "17. DOM: Events",
    title: "Tipuri comune de evenimente",
    content: `JavaScript oferă zeci de tipuri de evenimente. Iată cele mai folosite, organizate pe categorie, cu observații despre utilizarea lor corectă.

\`\`\`javascript
// Mouse
elem.addEventListener("click", handler);      // click simplu
elem.addEventListener("dblclick", handler);   // dublu click
elem.addEventListener("mouseenter", handler); // intră în element (fără bubbling)
elem.addEventListener("mouseleave", handler); // iese din element (fără bubbling)
elem.addEventListener("mouseover", handler);  // cu bubbling (propagă la copii)

// Tastatură
input.addEventListener("keydown", (e) => { /* e.key */ });  // tastă apăsată
input.addEventListener("keyup", handler);    // tastă eliberată

// Formular
form.addEventListener("submit", handler);    // submit formular
input.addEventListener("input", handler);   // orice schimbare (inclusiv paste, voice)
input.addEventListener("change", handler);  // la blur, după schimbare
input.addEventListener("focus", handler);   // elementul e focusat
input.addEventListener("blur", handler);    // elementul pierde focus-ul

// Document / Window
window.addEventListener("load", handler);         // pagina complet încărcată
document.addEventListener("DOMContentLoaded", h); // DOM gata, fără imagini
window.addEventListener("resize", handler);       // redimensionare fereastra
window.addEventListener("scroll", handler);       // scroll
\`\`\`

• **\`input\`** vs \`\`change\`\`**: \`input\` se declanșează la fiecare caracter, \`change\` la blur
• **\`mouseenter\`** vs \`\`mouseover\`\`**: \`enter\` nu propagă la copii — mai precis pentru hover
• **\`DOMContentLoaded\`**: mai rapid decât \`load\` — folosit pentru inițializare JS
• **Scroll + passive**: \`{ passive: true }\` pentru performanță la scroll events`,
  },
  {
    lesson: "17. DOM: Events",
    title: "Event delegation",
    content: `**Event delegation** atașează un singur listener pe un element **parent** în loc de pe fiecare copil. Funcționează datorită **event bubbling** — evenimentul urcă din copil spre părinți.

\`\`\`javascript
// Fără delegation — problematic dacă elementele sunt adăugate dinamic
// document.querySelectorAll(".btn").forEach(btn => btn.addEventListener(...));

// ✓ Cu delegation — un singur listener pe container
const lista = document.querySelector("#lista-produse");

lista.addEventListener("click", (e) => {
  // e.target = elementul exact apăsat
  if (e.target.matches(".btn-sterge")) {
    const item = e.target.closest("li");
    item.remove();
  }

  if (e.target.matches(".btn-edita")) {
    const id = e.target.dataset.id;
    editeazaProdus(id);
  }
});

// Adăugarea de elemente noi funcționează automat!
function adaugaProdus(produs) {
  lista.insertAdjacentHTML("beforeend", \`
    <li>
      \${produs.name}
      <button class="btn-sterge">✕</button>
      <button class="btn-edita" data-id="\${produs.id}">✎</button>
    </li>
  \`);
}
\`\`\`

• **Bubbling**: evenimentul urcă de la \`target\` spre \`document\` — delegation profită de asta
• **\`e.target.matches()\`**: verifică dacă elementul originar corespunde unui selector CSS
• **\`closest()\`**: caută ancestor-ul cu un selector — util pentru a găsi elementul container
• **Avantaje**: mai puțini listeneri (memorie), funcționează pentru elemente adăugate dinamic`,
  },

  // ─── LECȚIA 18: Fetch + Promises ──────────────────────────────────────────
  {
    lesson: "18. Fetch + Promises",
    title: "Ce este o Promise?",
    content: `**Promise** reprezintă o operație asincronă ce se va finaliza în viitor. Are 3 stări: **pending** (în așteptare), **fulfilled** (rezolvată cu succes) sau **rejected** (eșuată).

\`\`\`javascript
// Creare promise manuală
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    const success = Math.random() > 0.5;
    if (success) {
      resolve("Date primite!");   // fulfilled
    } else {
      reject(new Error("Eroare de rețea")); // rejected
    }
  }, 1000);
});

// Consumare cu .then() și .catch()
promise
  .then(rezultat => {
    console.log("Succes:", rezultat); // "Date primite!"
  })
  .catch(eroare => {
    console.error("Eroare:", eroare.message);
  })
  .finally(() => {
    console.log("Se execută MEREU — success sau eroare");
  });

// Promise deja resolved/rejected
const gata = Promise.resolve(42);
const esuat = Promise.reject(new Error("imediat eșuat"));
\`\`\`

• **Stări permanente**: odată fulfilled sau rejected, nu mai poate schimba starea
• **\`then\`**: primește valoarea din \`resolve()\` — returnează o nouă Promise (chainabil)
• **\`catch\`**: prinde orice eroare din \`reject()\` sau excepții aruncate în \`then\`
• **\`finally\`**: cleanup — rulează indiferent de rezultat (închide loading spinner etc.)`,
  },
  {
    lesson: "18. Fetch + Promises",
    title: "fetch() — cereri HTTP",
    content: `**\`fetch()\`** face cereri HTTP și returnează o **Promise**. Răspunsul trebuie procesat explicit cu \`response.json()\` sau \`response.text()\` — acestea sunt și ele promise-uri.

\`\`\`javascript
// GET simplu
fetch("https://api.example.com/useri")
  .then(response => {
    if (!response.ok) { // verifică status 200-299
      throw new Error(\`HTTP \${response.status}\`);
    }
    return response.json(); // parse JSON — returnează Promise
  })
  .then(useri => {
    console.log(useri); // array de useri
  })
  .catch(err => console.error("Eroare:", err));

// POST cu date
fetch("/api/useri", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer " + token
  },
  body: JSON.stringify({ name: "Ana", email: "ana@ex.com" })
})
  .then(r => r.json())
  .then(user => console.log("Creat:", user));
\`\`\`

• **fetch nu eșuează la 404/500**: erorile HTTP nu duc la \`reject\` — verifică \`response.ok\`!
• **\`response.json()\`**: async — trebuie \`await\` sau \`.then()\` pe el
• **\`response.text()\`, \`response.blob()\`**: pentru alte tipuri de conținut
• **CORS**: cererile cross-origin necesită header-e corecte pe server`,
  },
  {
    lesson: "18. Fetch + Promises",
    title: "Promise chaining + Promise.all",
    content: `**Promise chaining** înlănțuiește operații asincrone secvențiale. **\`Promise.all\`** rulează mai multe promise-uri **în paralel** și așteaptă ca TOATE să se termine.

\`\`\`javascript
// Chaining — secvențial, fiecare .then primește rezultatul precedentului
fetch("/api/user/1")
  .then(r => r.json())
  .then(user => fetch(\`/api/posts?authorId=\${user.id}\`))
  .then(r => r.json())
  .then(posts => console.log("Postări:", posts))
  .catch(err => console.error(err)); // prinde orice eroare din lanț

// Promise.all — paralel, mai rapid
const [useri, produse, categorii] = await Promise.all([
  fetch("/api/useri").then(r => r.json()),
  fetch("/api/produse").then(r => r.json()),
  fetch("/api/categorii").then(r => r.json()),
]);
// Toate 3 cereri pornesc simultan — nu secvențial!

// GREȘIT — secvențial inutil:
const u = await fetchUseri();    // 500ms
const p = await fetchProduse();  // + 500ms = 1000ms total

// CORECT — paralel:
const [u2, p2] = await Promise.all([fetchUseri(), fetchProduse()]); // 500ms total
\`\`\`

• **\`then\`** returnează o Promise nouă cu valoarea returnată din callback
• **\`catch\`** la final prinde erori din ORICE punct al lanțului
• **\`Promise.all\`**: eșuează dacă oricare promise eșuează — toate sau nimic
• **Paralel vs secvențial**: \`Promise.all\` e dramatic mai rapid pentru cereri independente`,
  },
  {
    lesson: "18. Fetch + Promises",
    title: "Promise.race, allSettled, any",
    content: `Pe lângă \`Promise.all\`, JavaScript oferă 3 combinatori pentru scenarii specifice: **\`race\`**, **\`allSettled\`** și **\`any\`**.

\`\`\`javascript
const promises = [
  fetch("/api/server1").then(r => r.json()),
  fetch("/api/server2").then(r => r.json()),
  fetch("/api/server3").then(r => r.json()),
];

// Promise.race — câștigă prima care se termină (fulfilled SAU rejected)
const primul = await Promise.race(promises);
console.log("Primul răspuns:", primul);

// Promise.allSettled — așteaptă TOATE, indiferent de succes/eșec
const rezultate = await Promise.allSettled(promises);
rezultate.forEach(r => {
  if (r.status === "fulfilled") console.log("OK:", r.value);
  else console.log("EROARE:", r.reason);
});

// Promise.any — primul fulfilled (ignoră rejected-urile)
try {
  const primulOK = await Promise.any(promises);
  console.log("Primul succes:", primulOK);
} catch (e) {
  // AggregateError — TOATE au eșuat
  console.log("Toate au eșuat");
}
\`\`\`

• **\`race\`**: timeout pattern — \`Promise.race([fetch(...), timeoutPromise(5000)])\`
• **\`allSettled\`**: când vrei rezultatele tuturor, chiar și cele eșuate — rapoarte, batch
• **\`any\`**: primul server care răspunde — fallback la mirror servers
• **\`all\` vs \`allSettled\`**: \`all\` eșuează la prima eroare; \`allSettled\` raportează toate`,
  },

  // ─── LECȚIA 19: async/await ───────────────────────────────────────────────
  {
    lesson: "19. async / await",
    title: "async/await — sintaxa modernă",
    content: `**\`async/await\`** face codul asincron să arate și să se comporte ca cod sincron. **\`async\`** marchează o funcție ca asincronă, **\`await\`** pauzează execuția până la rezolvarea Promise-ului.

\`\`\`javascript
// Fără async/await — Promise chaining
function getUser(id) {
  return fetch(\`/api/users/\${id}\`)
    .then(r => r.json())
    .then(user => user.name);
}

// Cu async/await — mult mai lizibil
async function getUser(id) {
  const response = await fetch(\`/api/users/\${id}\`);
  const user = await response.json();
  return user.name; // funcția returnează Promise<string>
}

// Utilizare
async function main() {
  const name = await getUser(1);
  console.log("Utilizator:", name);

  // Secvențial
  const user = await getUser(1);
  const posts = await getPosts(user.id);

  // Paralel — mai eficient
  const [user2, config] = await Promise.all([getUser(2), getConfig()]);
}
\`\`\`

• **\`async\` returnează mereu o Promise** — chiar dacă returnezi o valoare simplă
• **\`await\` funcționează doar în funcții \`async\`** — sau la top-level în module ES
• **Lizibilitate**: \`async/await\` este syntactic sugar peste Promises — aceeași putere
• **Nu blochează thread-ul**: \`await\` cedează controlul, JS continuă alte task-uri`,
  },
  {
    lesson: "19. async / await",
    title: "try/catch cu async/await",
    content: `**\`try/catch\`** cu \`async/await\` prinde erorile din operațiile asincrone la fel ca într-un cod sincron. E mult mai clar decât \`.catch()\` în Promise chains lungi.

\`\`\`javascript
async function incarcaDate(userId) {
  try {
    const response = await fetch(\`/api/users/\${userId}\`);

    if (!response.ok) {
      throw new Error(\`HTTP \${response.status}: \${response.statusText}\`);
    }

    const user = await response.json();
    return user;
  } catch (error) {
    if (error.name === "TypeError") {
      console.error("Rețea indisponibilă:", error.message);
    } else {
      console.error("Eroare API:", error.message);
    }
    return null; // sau re-throw: throw error;
  } finally {
    setLoading(false); // se execută MEREU — oprește spinner
  }
}

// Wrapper utility pentru a evita repetarea try/catch
async function safeAsync(promise) {
  try {
    const data = await promise;
    return [null, data];
  } catch (error) {
    return [error, null];
  }
}

const [err, user] = await safeAsync(fetchUser(1));
if (err) console.error(err);
else console.log(user);
\`\`\`

• **\`catch\`** prinde: erori de rețea, HTTP errors dacă le arunci tu, erori de JSON parse
• **\`finally\`**: cleanup obligatoriu — resetează loading state, închide conexiuni
• **Re-throw**: \`throw error\` în catch propagă eroarea la caller — bun în funcții helper
• **Pattern \`[err, data]\`**: inspirat din Go — elimină try/catch repetitiv`,
  },
  {
    lesson: "19. async / await",
    title: "Paralel cu Promise.all + await",
    content: `Combinarea **\`await\`** cu **\`Promise.all\`** permite execuția paralelă a mai multor operații asincrone — esențial pentru performanță când cererile sunt independente.

\`\`\`javascript
// ❌ Secvențial — lent (3 × 500ms = 1500ms)
async function lent() {
  const user  = await fetchUser(1);    // 500ms
  const posts = await fetchPosts(1);   // + 500ms
  const tags  = await fetchTags();     // + 500ms
  return { user, posts, tags };
}

// ✓ Paralel — rapid (max(500, 500, 500) = 500ms)
async function rapid() {
  const [user, posts, tags] = await Promise.all([
    fetchUser(1),
    fetchPosts(1),
    fetchTags(),
  ]);
  return { user, posts, tags };
}

// Paralel cu erori individuale gestionate
async function robustParalel() {
  const results = await Promise.allSettled([
    fetchUser(1),
    fetchPosts(1),
    fetchTags(),
  ]);

  return results.map(r =>
    r.status === "fulfilled" ? r.value : null
  );
}

// Paralel cu concurenţă limitată (max 3 în același timp)
async function batchProcess(ids, batchSize = 3) {
  const results = [];
  for (let i = 0; i < ids.length; i += batchSize) {
    const batch = ids.slice(i, i + batchSize);
    const batchResults = await Promise.all(batch.map(fetchUser));
    results.push(...batchResults);
  }
  return results;
}
\`\`\`

• **Regula**: dacă cererile nu depind una de alta — pune-le în \`Promise.all\`
• **\`await\` pe array**: \`await [p1, p2]\` nu funcționează — trebuie \`Promise.all\`
• **Batch processing**: împarte cererile în grupuri pentru a nu supraîncărca serverul`,
  },
  {
    lesson: "19. async / await",
    title: "async functions returnează Promise",
    content: `Orice funcție marcată cu **\`async\`** returnează automat o **Promise**, indiferent de ce returnezi în interior. Asta le face componibile și compatibile cu orice cod bazat pe Promise.

\`\`\`javascript
// Toate aceste funcții returnează Promise<number>
async function f1() { return 42; }                    // Promise.resolve(42)
async function f2() { return Promise.resolve(42); }   // același lucru
async function f3() { await delay(100); return 42; }  // după delay

// Consumare
f1().then(v => console.log(v)); // 42
const v = await f1();           // 42

// Async IIFE — pentru top-level await în non-module context
(async () => {
  const data = await fetchData();
  console.log(data);
})();

// Erori din async functions → Promise rejected
async function esueaza() {
  throw new Error("Ceva a mers greșit");
}
esueaza().catch(e => console.error(e.message));
// sau
try { await esueaza(); }
catch (e) { console.error(e.message); }

// async în addEventListener
buton.addEventListener("click", async (e) => {
  const data = await fetchData();
  afiseaza(data);
});
\`\`\`

• **Returnează implicit Promise.resolve(valoare)** dacă nu e un throw sau reject
• **\`throw\` în async** → Promise rejected → prins de \`.catch()\` sau \`try/catch\`
• **Top-level await**: disponibil nativ în ES modules (\`type="module"\`)
• **Event handlers async**: valid, dar erorile negestionate devin uncaught promise rejections`,
  },

  // ─── LECȚIA 20: try/catch ─────────────────────────────────────────────────
  {
    lesson: "20. try / catch + Erori",
    title: "try / catch / finally",
    content: `**\`try/catch/finally\`** gestionează erorile la runtime. Codul din \`try\` se execută normal; dacă apare o eroare, execuția sare la \`catch\`; \`finally\` rulează **mereu** — cu sau fără eroare.

\`\`\`javascript
function parseJSON(text) {
  try {
    const data = JSON.parse(text); // poate arunca SyntaxError
    console.log("Parsed OK:", data);
    return data;
  } catch (error) {
    console.error("JSON invalid:", error.message);
    return null; // valoare implicită la eroare
  } finally {
    console.log("Încercare de parse finalizată"); // MEREU
  }
}

parseJSON('{"name": "Ana"}'); // OK
parseJSON("nu e JSON");       // catch activat

// finally e util pentru cleanup
function citesteFisier(path) {
  let fisier = null;
  try {
    fisier = deschide(path);
    return proceseaza(fisier);
  } catch (e) {
    console.error("Eroare citire:", e);
    throw e; // re-aruncă eroarea după cleanup
  } finally {
    if (fisier) inchide(fisier); // se execută chiar și dacă throw
  }
}
\`\`\`

• **\`catch\`** primește obiectul de eroare — cu \`.name\`, \`.message\`, \`.stack\`
• **\`finally\`** rulează chiar dacă \`catch\` re-aruncă sau \`try\` returnează
• **Nu prinde erori asincrone**: pentru \`Promise\`-uri și \`async\`, combini cu \`await\`
• **Granularitate**: prinde erorile cât mai aproape de sursa lor, nu globalizat`,
  },
  {
    lesson: "20. try / catch + Erori",
    title: "Tipuri de erori built-in",
    content: `JavaScript are mai multe clase de erori built-in, fiecare pentru scenarii specifice. Identificarea tipului de eroare permite gestionarea mai precisă.

\`\`\`javascript
try {
  null.property; // TypeError
} catch (e) {
  console.log(e instanceof TypeError); // true
  console.log(e.name);    // "TypeError"
  console.log(e.message); // "Cannot read properties of null"
}

// Tipuri comune
// ReferenceError — variabilă nedeclarată
try { console.log(variabilaNedeclarata); }
catch (e) { console.log(e.name); } // "ReferenceError"

// SyntaxError — JSON.parse cu input invalid
try { JSON.parse("{invalid}"); }
catch (e) { console.log(e.name); } // "SyntaxError"

// RangeError — valoare în afara intervalului permis
try { new Array(-1); }
catch (e) { console.log(e.name); } // "RangeError"

// URIError — decodeURI cu secvență invalidă
try { decodeURIComponent("%"); }
catch (e) { console.log(e.name); } // "URIError"

// Verificare tip în catch
catch (e) {
  if (e instanceof TypeError) { /* handle */ }
  else if (e instanceof RangeError) { /* handle */ }
  else throw e; // re-aruncă erorile necunoscute
}
\`\`\`

• **TypeError**: accesezi proprietăți pe \`null\`/\`undefined\`, tip greșit de argument
• **ReferenceError**: variabilă sau funcție nedeclarată (sau în TDZ)
• **SyntaxError**: JSON malformat — \`JSON.parse\` e sursa cea mai frecventă la runtime
• **\`instanceof\`** în catch: discriminezi erori și gestionezi fiecare diferit`,
  },
  {
    lesson: "20. try / catch + Erori",
    title: "throw — aruncă erori custom",
    content: `**\`throw\`** aruncă o eroare — poate fi orice valoare, dar cel mai bun practice este să arunci obiecte \`Error\` sau subclase. **Erorile custom** adaugă context specific aplicației.

\`\`\`javascript
// throw cu string — simplu dar limitat (nu ai .stack)
throw "Ceva a mers greșit"; // evită

// throw cu Error — recomandat
throw new Error("Mesaj descriptiv");

// Erori custom cu clase
class ValidationError extends Error {
  constructor(message, field) {
    super(message);
    this.name = "ValidationError";
    this.field = field;
  }
}

class NotFoundError extends Error {
  constructor(resource, id) {
    super(\`\${resource} cu id=\${id} nu a fost găsit\`);
    this.name = "NotFoundError";
    this.statusCode = 404;
  }
}

// Utilizare
function validează(user) {
  if (!user.email) throw new ValidationError("Email obligatoriu", "email");
  if (!user.email.includes("@")) throw new ValidationError("Email invalid", "email");
}

try {
  validează({ name: "Ana" });
} catch (e) {
  if (e instanceof ValidationError) {
    console.log(\`Câmp \${e.field}: \${e.message}\`);
  } else throw e;
}
\`\`\`

• **Aruncă mereu \`Error\`** (sau subclase) — nu string-uri sau obiecte plain
• **Subclasele** adaugă \`.name\`, proprietăți custom (\`field\`, \`statusCode\`)
• **\`super(message)\`**: esențial în constructor — setează \`.message\`
• **Re-throw**: aruncă erorile necunoscute mai departe — nu înghiți toate erorile`,
  },
  {
    lesson: "20. try / catch + Erori",
    title: "Error handling în async/await",
    content: `Erorile în funcțiile \`async\` se propagă ca **Promise rejected** — prinde-le cu \`try/catch\` la \`await\` sau cu \`.catch()\` pe Promise-ul returnat.

\`\`\`javascript
// Pattern 1: try/catch în funcția async
async function getUser(id) {
  try {
    const r = await fetch(\`/api/users/\${id}\`);
    if (!r.ok) throw new Error(\`HTTP \${r.status}\`);
    return await r.json();
  } catch (e) {
    console.error("getUser failed:", e.message);
    return null;
  }
}

// Pattern 2: propagare la caller
async function getUser2(id) {
  const r = await fetch(\`/api/users/\${id}\`);
  if (!r.ok) throw new Error(\`HTTP \${r.status}\`); // caller gestionează
  return r.json();
}

// Pattern 3: wrapper utilitar
const [err, user] = await to(getUser2(1));
if (err) return handleError(err);

function to(promise) {
  return promise.then(data => [null, data]).catch(err => [err, null]);
}

// Erori negestionate → unhandledRejection
process.on("unhandledRejection", (reason) => {
  console.error("Unhandled:", reason);
});
\`\`\`

• **Niciodată \`async\` fără error handling** în event handlers — erori pierdute silențios
• **Granularitate**: decide unde e cel mai potrivit să gestionezi — funcție sau caller
• **\`unhandledRejection\`**: Node.js/browser avertizează pentru promise-uri refuzate fără \`.catch\`
• **Pattern \`[err, data]\`**: elimină try/catch repetitiv — popular în codebase-uri mari`,
  },

  // ─── LECȚIA 21: Clase și OOP ──────────────────────────────────────────────
  {
    lesson: "21. Clase și OOP",
    title: "class, constructor, metode",
    content: `**Clasele** în JavaScript sunt syntactic sugar peste sistemul de prototipuri. Ele oferă o sintaxă mai clară pentru crearea obiectelor și definirea comportamentului lor.

\`\`\`javascript
class Animal {
  // Constructor — apelat la new Animal(...)
  constructor(name, sound) {
    this.name = name;     // proprietate de instanță
    this.sound = sound;
    Animal.count++;       // proprietate statică
  }

  // Metodă de instanță
  vorbeste() {
    return \`\${this.name} face: \${this.sound}!\`;
  }

  // Getter
  get info() {
    return \`Animal: \${this.name}\`;
  }

  // Metodă statică — apelată pe clasă, nu pe instanță
  static creeaza(tip) {
    const animale = { caine: ["Rex", "Ham"], pisica: ["Miau", "Miau"] };
    return new Animal(...(animale[tip] || ["Necunoscut", "???"]));
  }
}

Animal.count = 0; // proprietate statică inițializată

const caine = new Animal("Rex", "Ham");
const pisica = Animal.creeaza("pisica");

console.log(caine.vorbeste()); // "Rex face: Ham!"
console.log(caine.info);       // "Animal: Rex"
console.log(Animal.count);     // 2
\`\`\`

• **\`constructor\`**: apelat automat la \`new\` — setează proprietățile instanței
• **\`this\`**: referă instanța curentă în metode
• **Metode**: definite în corp, nu cu \`:\` ca în obiecte literale
• **\`new\`**: creează instanță, apelează constructor, returnează obiectul`,
  },
  {
    lesson: "21. Clase și OOP",
    title: "Moștenire cu extends + super",
    content: `**\`extends\`** creează o clasă derivată care moștenește proprietățile și metodele clasei **parent**. **\`super\`** apelează constructorul sau metodele clasei parent.

\`\`\`javascript
class Animal {
  constructor(name) { this.name = name; }
  descrie() { return \`Sunt \${this.name}\`; }
}

class Caine extends Animal {
  constructor(name, rasa) {
    super(name); // OBLIGATORIU înainte de this în constructor!
    this.rasa = rasa;
  }

  // Suprascrie metoda parent
  descrie() {
    const parentDescrie = super.descrie(); // apelează Animal.descrie()
    return \`\${parentDescrie}, un câine de rasă \${this.rasa}\`;
  }

  latra() { return "Ham Ham!"; }
}

const rex = new Caine("Rex", "Labrador");
console.log(rex.descrie()); // "Sunt Rex, un câine de rasă Labrador"
console.log(rex.latra());   // "Ham Ham!"
console.log(rex instanceof Caine);  // true
console.log(rex instanceof Animal); // true — moștenire

// Clase abstracte simulate
class Shape {
  area() { throw new Error("Implementează area() în subclasă"); }
}
class Circle extends Shape {
  constructor(r) { super(); this.r = r; }
  area() { return Math.PI * this.r ** 2; }
}
\`\`\`

• **\`super()\`** în constructor: obligatoriu în subclasă înainte de \`this\`
• **\`super.metoda()\`**: apelează implementarea din clasa parent — util la override
• **\`instanceof\`**: verifică lanțul de prototipuri — true pentru clasă și toate parent-urile
• **Method overriding**: subclasa poate redefini orice metodă din parent`,
  },
  {
    lesson: "21. Clase și OOP",
    title: "Proprietăți și metode statice",
    content: `Membrii **\`static\`** aparțin **clasei**, nu instanțelor. Sunt utili pentru factory methods, constante și utilități legate de clasă, dar care nu necesită acces la o instanță.

\`\`\`javascript
class Validator {
  static EMAIL_REGEX = /^[^@]+@[^@]+\.[^@]+$/;  // proprietate statică (ES2022)

  static isEmail(value) {
    return Validator.EMAIL_REGEX.test(value);
  }

  static isRequired(value) {
    return value !== null && value !== undefined && value !== "";
  }

  static validate(data, rules) {
    const errors = {};
    for (const [field, validators] of Object.entries(rules)) {
      for (const validator of validators) {
        if (!validator(data[field])) {
          errors[field] = \`\${field} invalid\`;
          break;
        }
      }
    }
    return errors;
  }
}

// Utilizare fără instanță
console.log(Validator.isEmail("ana@ex.com")); // true
const errors = Validator.validate(
  { email: "invalid", name: "" },
  { email: [Validator.isEmail], name: [Validator.isRequired] }
);
\`\`\`

• **\`static\`**: aparține clasei — \`Validator.isEmail()\`, nu \`new Validator().isEmail()\`
• **Factory pattern**: \`static creeaza()\` sau \`static from()\` — constructor alternativ
• **Constante**: \`static MAX = 100\` — mai clar decât o constantă separată
• **Moștenire**: metodele statice se moștenesc — \`SubClasa.metodaStatica()\` funcționează`,
  },
  {
    lesson: "21. Clase și OOP",
    title: "Getteri, setteri și câmpuri private",
    content: `**Getteri/setteri** adaugă logică la citirea/scrierea proprietăților. **Câmpurile private** (\`#\`) sunt inaccesibile din exterior — encapsulare adevărată fără closure.

\`\`\`javascript
class Temperatura {
  #celsius; // câmp privat — ES2022

  constructor(celsius) {
    this.#celsius = celsius;
  }

  // Getter — accesat ca proprietate: temp.fahrenheit
  get fahrenheit() {
    return this.#celsius * 9/5 + 32;
  }

  // Setter — cu validare
  set celsius(val) {
    if (val < -273.15) throw new RangeError("Sub zero absolut!");
    this.#celsius = val;
  }

  get celsius() { return this.#celsius; }

  // Metodă privată
  #calculeaza() { return this.#celsius + 273.15; }

  get kelvin() { return this.#calculeaza(); }
}

const t = new Temperatura(100);
console.log(t.fahrenheit); // 212 — getter
t.celsius = 200;           // setter cu validare
console.log(t.kelvin);     // 473.15

// t.#celsius;   // SyntaxError — privat!
// t.celsius = -300; // RangeError din setter
\`\`\`

• **\`get\`**: accesat ca proprietate fără \`()\` — \`obj.prop\`, nu \`obj.prop()\`
• **\`set\`**: interceptează asignarea — permite validare, transformare, efecte secundare
• **\`#field\`**: privat la nivel de sintaxă — eroare la orice acces din afară
• **\`#method()\`**: metodă privată — utilă pentru logică internă neexpusă`,
  },

  // ─── LECȚIA 22: Modules ───────────────────────────────────────────────────
  {
    lesson: "22. Modules: import / export",
    title: "export — exportarea din module",
    content: `**\`export\`** expune funcții, clase și variabile din module. Există două tipuri: **named exports** (mai multe per fișier) și **default export** (unul singur per fișier).

\`\`\`javascript
// utils.js — named exports
export const PI = 3.14159;

export function aduna(a, b) { return a + b; }

export class Calculator {
  constructor() { this.result = 0; }
  add(n) { this.result += n; return this; }
}

// export la final — mai lizibil
function scade(a, b) { return a - b; }
function imparte(a, b) { return a / b; }
export { scade, imparte };

// Redenumire la export
export { scade as subtract, imparte as divide };

// Default export — un singur default per fișier
export default class App {
  constructor() { console.log("App pornit"); }
}

// app.js — export default + named în același fișier
const config = { version: "1.0" };
export default config;
export const ENV = "production";
\`\`\`

• **Named exports**: importate cu același nume (sau redenumite); mai expliciți
• **Default export**: importat cu orice nume; convenabil pentru export principal al modulului
• **Un singur \`default\`**: per fișier — eroare dacă pui mai mulți
• **Re-export**: \`export { x } from "./alt-modul"\` — barrel exports`,
  },
  {
    lesson: "22. Modules: import / export",
    title: "import — importarea în alte module",
    content: `**\`import\`** aduce funcționalitate din alte module. Sintaxa variază în funcție de tipul de export — named sau default.

\`\`\`javascript
// Named import — trebuie să coincidă cu numele exportat
import { aduna, scade, PI } from "./utils.js";
console.log(aduna(2, 3)); // 5
console.log(PI);          // 3.14159

// Redenumire la import
import { aduna as suma, scade as diferenta } from "./utils.js";

// Import tot ca namespace
import * as Utils from "./utils.js";
console.log(Utils.aduna(2, 3));
console.log(Utils.PI);

// Default import — orice nume vrei
import App from "./app.js";
import MyApp from "./app.js"; // același lucru, alt alias

// Default + named în același import
import config, { ENV } from "./app.js";

// Side-effect import — rulează modulul fără a importa ceva
import "./polyfills.js";
import "./styles.css"; // cu bundler (Vite/webpack)
\`\`\`

• **Extensia \`.js\`**: opțională în bundlers (Vite, webpack), obligatorie în browser nativ
• **\`import \* as\`**: barrel import — utile pentru namespace-uri (evită conflicte de nume)
• **Import static**: analizabil la build time — tree shaking elimina ce nu folosești
• **Case-sensitive**: \`import { Aduna }\` nu găsește \`export function aduna\``,
  },
  {
    lesson: "22. Modules: import / export",
    title: "Structura proiectelor cu module",
    content: `Organizarea codului în module îmbunătățește mentenabilitatea și refolosirea. **Barrel exports** (\`index.js\`) simplifică importurile din afara unui folder.

\`\`\`javascript
// Structura recomandată
// src/
//   utils/
//     string.js
//     array.js
//     index.js  ← barrel

// utils/string.js
export function capitalize(s) { return s[0].toUpperCase() + s.slice(1); }
export function truncate(s, n) { return s.length > n ? s.slice(0, n) + "..." : s; }

// utils/array.js
export function unique(arr) { return [...new Set(arr)]; }
export function groupBy(arr, key) {
  return arr.reduce((g, item) => {
    (g[item[key]] = g[item[key]] || []).push(item);
    return g;
  }, {});
}

// utils/index.js — barrel export
export * from "./string.js";
export * from "./array.js";

// În alt fișier — import simplu din folder
import { capitalize, unique, groupBy } from "./utils";
// în loc de:
// import { capitalize } from "./utils/string";
// import { unique } from "./utils/array";
\`\`\`

• **Barrel exports**: \`index.js\` re-exportă tot din folder — API public clar al modulului
• **One thing per file**: fiecare fișier exportă o singură responsabilitate principală
• **Circular imports**: de evitat — A importă B care importă A — poate cauza \`undefined\`
• **Relative vs absolute**: \`"./utils"\` relativ, sau \`"@/utils"\` cu alias de bundler`,
  },
  {
    lesson: "22. Modules: import / export",
    title: "Dynamic import + module în browser",
    content: `**Dynamic import** (\`import()\`) încarcă module la cerere — **lazy loading** pentru performanță. Este o funcție, nu o declarație, și returnează o Promise.

\`\`\`javascript
// Static import — la build time, inclus mereu în bundle
import { Chart } from "./chart.js";

// Dynamic import — la runtime, când e nevoie
buton.addEventListener("click", async () => {
  // Modulul se încarcă ACUM, nu la pornirea aplicației
  const { Chart } = await import("./chart.js");
  new Chart(canvas, data);
});

// Lazy loading rute (pattern React/Vue)
const routes = {
  "/":        () => import("./pages/Home.js"),
  "/contact": () => import("./pages/Contact.js"),
  "/despre":  () => import("./pages/Despre.js"),
};

async function navigheaza(path) {
  const { default: Page } = await routes[path]();
  render(new Page());
}

// Module native în browser
// <script type="module" src="app.js"></script>
// — defer automat, strict mode, CORS necesar
\`\`\`

• **Code splitting**: bundlerul (Vite/webpack) creează chunk-uri separate pentru fiecare \`import()\`
• **\`default\` din dynamic**: \`const { default: X } = await import("./x.js")\`
• **Browser \`type="module"\`**: activează ES module syntax nativ — defer, strict mode, CORS
• **Performanță**: nu încarci codul până nu e nevoie — pagina pornește mai rapid`,
  },

  // ─── LECȚIA 23: JavaScript Modern (ES6+) ──────────────────────────────────
  {
    lesson: "23. JavaScript Modern (ES6+)",
    title: "Optional chaining (?.) și Nullish (??)",
    content: `**Optional chaining** (\`?.\`) accesează proprietăți în siguranță fără a arunca erori dacă valoarea e \`null\` sau \`undefined\`. **Nullish coalescing** (\`??\`) oferă valori implicite doar pentru \`null\`/\`undefined\`.

\`\`\`javascript
const user = {
  profile: {
    address: { city: "Cluj" }
  }
};

// Fără optional chaining — verbose și fragil
const city1 = user && user.profile && user.profile.address && user.profile.address.city;

// Cu optional chaining — elegant și sigur
const city2 = user?.profile?.address?.city;   // "Cluj" sau undefined
const zip   = user?.profile?.address?.zip;    // undefined (nu eroare!)

// Cu apeluri de funcții și indexi
const upper = user?.profile?.getName?.();     // undefined dacă getName nu există
const first = user?.posts?.[0]?.title;        // undefined dacă posts e gol

// Nullish coalescing — ?? vs ||
const val1 = null ?? "default";    // "default" — null activează ??
const val2 = 0 ?? "default";       // 0 — 0 NU e null/undefined!
const val3 = "" ?? "default";      // "" — "" NU e null/undefined!

// vs || (falsy check)
const val4 = 0 || "default";       // "default" — 0 e falsy → problematic
const val5 = "" || "default";      // "default" — "" e falsy → problematic

// Combinare
const name = user?.profile?.name ?? "Anonim";
\`\`\`

• **\`?.\`**: returnează \`undefined\` (nu eroare) dacă orice parte a lanțului e \`null\`/\`undefined\`
• **\`??\`** vs **\`||\`**: \`??\` este mai precis — \`0\`, \`""\`, \`false\` sunt valori valide, nu triggeri
• **\`?.(\`\`)\`**: optional call — apelează funcția doar dacă există
• **\`?.[i]\`**: optional index — accesează array fără eroare dacă e \`null\``,
  },
  {
    lesson: "23. JavaScript Modern (ES6+)",
    title: "Structuri de date moderne: Map și Set",
    content: `**Map** stochează perechi cheie-valoare unde **cheile pot fi orice tip** (nu doar string-uri ca în obiect). **Set** stochează valori unice — elimină automat duplicatele.

\`\`\`javascript
// Map — cheile pot fi obiecte, funcții, orice
const map = new Map();
const cheieObiect = { id: 1 };

map.set("string", 100);
map.set(42, "număr ca cheie");
map.set(cheieObiect, "obiect ca cheie");

console.log(map.get("string"));      // 100
console.log(map.get(cheieObiect));   // "obiect ca cheie"
console.log(map.size);               // 3
console.log(map.has(42));            // true

for (const [key, value] of map) {
  console.log(key, "→", value);
}

// Set — valori unice
const set = new Set([1, 2, 3, 2, 1, 3]);
console.log(set.size);           // 3 — duplicate eliminate
console.log([...set]);           // [1, 2, 3]

set.add(4);
set.delete(2);
set.has(3);                      // true

// Deduplicare array
const unic = [...new Set([1,1,2,3,3,4])]; // [1, 2, 3, 4]
\`\`\`

• **Map vs Obiect**: Map menține ordinea inserării, are \`.size\`, suportă orice tip de cheie
• **Set vs Array**: Set garantează unicitatea, \`has()\` e O(1) (față de \`includes()\` O(n))
• **Iterare Map**: \`for...of\` returnează \`[cheie, valoare]\` — destructurare directă
• **WeakMap/WeakSet**: cheile sunt obiecte, garbage collected când nu mai sunt referite`,
  },
  {
    lesson: "23. JavaScript Modern (ES6+)",
    title: "Símbol, WeakMap, Generator (prezentare)",
    content: `**Symbol** creează identificatori unici. **WeakMap/WeakSet** permit garbage collection automată. **Generators** (\`function*\`) produc valori lazy, la cerere.

\`\`\`javascript
// Symbol — valori unice garantate
const id1 = Symbol("id");
const id2 = Symbol("id");
console.log(id1 === id2); // false — mereu diferit!
console.log(id1.description); // "id"

// Utilizare: proprietăți „ascunse" în obiecte
const SECRET = Symbol("secret");
const obj = { [SECRET]: "valoare privată", public: "vizibil" };
console.log(obj[SECRET]);            // "valoare privată"
console.log(Object.keys(obj));       // ["public"] — Symbol nu apare!

// WeakMap — nu previne garbage collection
const cache = new WeakMap();
let element = document.querySelector("#btn");
cache.set(element, { clicks: 0 }); // asociezi date unui element DOM
element = null; // elementul e garbage collected + entry din WeakMap dispare automat

// Generator — funcție care produce valori lazy
function* numere() {
  yield 1;
  yield 2;
  yield 3;
}
const gen = numere();
console.log(gen.next()); // { value: 1, done: false }
console.log(gen.next()); // { value: 2, done: false }
for (const n of numere()) console.log(n); // 1, 2, 3
\`\`\`

• **Symbol**: cheie obiect care nu apare în \`for...in\`, \`Object.keys\` — metadate interne
• **WeakMap**: datele asociate unui DOM element dispar când elementul dispare — no memory leak
• **Generator**: perfect pentru secvențe infinite, paginare lazy, iteratori custom`,
  },
  {
    lesson: "23. JavaScript Modern (ES6+)",
    title: "Shorturi ES6+ utile",
    content: `ES6+ a introdus numeroase **shorturi sintactice** care reduc verbozitatea fără a sacrifica lizibilitatea. Sunt prezente în orice codebase modern.

\`\`\`javascript
const name = "Ana", age = 25, city = "Cluj";

// Property shorthand — cheie = nume variabilă
const user = { name, age, city }; // { name: "Ana", age: 25, city: "Cluj" }

// Method shorthand în obiecte
const obj = {
  salut() { return "Bună!"; },              // nu: salut: function() {}
  async fetchData() { return await api(); }, // async method
  get value() { return this._val; }          // getter inline
};

// Computed property names
const key = "dinamic";
const obj2 = { [key]: 42, [\`prefix_\${key}\`]: 99 };
// { dinamic: 42, prefix_dinamic: 99 }

// Logical assignment operators (ES2021)
let a = null;
a ??= "implicit";    // a = a ?? "implicit" → "implicit"
let b = 0;
b ||= 10;            // b = b || 10 → 10
let c = 5;
c &&= c * 2;         // c = c && c*2 → 10

// Numeric separators (ES2021)
const million = 1_000_000;
const hex = 0xFF_EC_D0;
const binary = 0b1010_0001;

// Object.fromEntries — inversa lui Object.entries
const entries = [["a", 1], ["b", 2]];
const obj3 = Object.fromEntries(entries); // { a: 1, b: 2 }
\`\`\`

• **Property shorthand**: \`{ name }\` în loc de \`{ name: name }\` — peste tot în codul modern
• **Computed keys**: \`[expresie]\` — proprietăți dinamice în object literals
• **\`??=\` / \`||=\` / \`&&=\`**: assignment logic — pattern de inițializare comună
• **Numeric separators**: \`1_000_000\` — mai ușor de citit decât \`1000000\``,
  },

  // ─── LECȚIA 24: Timers ────────────────────────────────────────────────────
  {
    lesson: "24. Timers — setTimeout și setInterval",
    title: "setTimeout — execută după un delay",
    content: `**\`setTimeout(fn, delay)\`** planifică execuția unei funcții după \`delay\` milisecunde. Returnează un ID numeric folosit pentru anulare cu \`clearTimeout\`.

\`\`\`javascript
// Sintaxa de bază
const id = setTimeout(() => {
  console.log("Executat după 2 secunde");
}, 2000);

// Anulare înainte de execuție
clearTimeout(id); // funcția nu va rula

// Cu argumente
setTimeout((message, user) => {
  console.log(\`\${user}: \${message}\`);
}, 1000, "Bun venit!", "Ana");

// Debounce — util pentru input, resize
function debounce(fn, delay) {
  let timer;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

const cautaDebounced = debounce((query) => {
  console.log("Caută:", query);
}, 300);

input.addEventListener("input", (e) => cautaDebounced(e.target.value));
// Apelează API doar după 300ms de pauză în tastare
\`\`\`

• **Delay minim, nu exact**: browserul poate întârzia mai mult (tab inactiv, sarcini heavy)
• **Returnează ID imediat**: codul continuă — \`setTimeout\` e neblocking
• **\`clearTimeout\`**: sigur de apelat chiar dacă timer-ul a expirat deja
• **Debounce**: anulează timer-ul anterior — funcția rulează doar după o pauză`,
  },
  {
    lesson: "24. Timers — setTimeout și setInterval",
    title: "setInterval — execută repetat",
    content: `**\`setInterval(fn, interval)\`** execută o funcție la fiecare \`interval\` milisecunde, până când e anulată cu \`clearInterval\`. Atenție: nu garantează execuție la timp exact.

\`\`\`javascript
// Ceas simplu
const clockEl = document.querySelector("#ceas");

const clockId = setInterval(() => {
  const now = new Date();
  clockEl.textContent = now.toLocaleTimeString("ro-RO");
}, 1000);

// Oprire după 10 secunde
setTimeout(() => clearInterval(clockId), 10000);

// Countdown
function countdown(seconds) {
  let remaining = seconds;
  const id = setInterval(() => {
    console.log(remaining--);
    if (remaining < 0) {
      clearInterval(id);
      console.log("Timp expirat!");
    }
  }, 1000);
  return id;
}

// Alternativă cu setTimeout recursiv — mai precis
function precis(fn, delay) {
  let start = Date.now();
  function tick() {
    fn();
    const drift = Date.now() - start - delay;
    start += delay;
    setTimeout(tick, Math.max(0, delay - drift));
  }
  setTimeout(tick, delay);
}
\`\`\`

• **Drift**: \`setInterval\` se desincronizează în timp — setTimeout recursiv e mai precis
• **Mereu \`clearInterval\`**: la unmount componente React, când nu mai e necesar
• **Tab inactiv**: browserele limitează intervale la min 1000ms în tab-uri inactive
• **NU folosi pentru animații** — folosește \`requestAnimationFrame\``,
  },
  {
    lesson: "24. Timers — setTimeout și setInterval",
    title: "setTimeout(fn, 0) — macrotask queue",
    content: `**\`setTimeout(fn, 0)\`** nu rulează imediat — planifică funcția în **macrotask queue**. Înțelegerea event loop-ului explică de ce codul sincron rulează primul.

\`\`\`javascript
console.log("1 — sync");

setTimeout(() => console.log("3 — macrotask"), 0);

Promise.resolve().then(() => console.log("2 — microtask"));

console.log("4 — sync");

// Output: 1, 4, 2, 3
// Ordinea: sync → microtasks (Promise) → macrotasks (setTimeout)

// Event Loop:
// 1. Call Stack: tot codul sincron
// 2. Microtask Queue: Promise.then, queueMicrotask
// 3. Macrotask Queue: setTimeout, setInterval, I/O

// Utilizare practică: defer UI update
function actualizareHeavy() {
  proceseazaDate(); // calcule grele
  setTimeout(() => {
    // Browserul poate reda UI-ul ÎNAINTE de acest callback
    actualizareDOM();
  }, 0);
}

// queueMicrotask — mai rapid decât setTimeout(fn, 0)
queueMicrotask(() => {
  console.log("microtask — înainte de setTimeout(fn,0)");
});
\`\`\`

• **Sync > Microtasks > Macrotasks**: ordinea priorităților în event loop
• **setTimeout(fn, 0)**: defer după render — util pentru a nu bloca UI-ul
• **Microtasks (Promise.then)**: runează TOATE înainte de orice macrotask
• **\`queueMicrotask\`**: adaugă la microtask queue direct — mai predictibil decât Promise.resolve()`,
  },
  {
    lesson: "24. Timers — setTimeout și setInterval",
    title: "requestAnimationFrame — animații fluide",
    content: `**\`requestAnimationFrame\`** (rAF) sincronizează codul cu refresh rate-ul browserului (~60fps). Produce animații mai fluide și mai eficiente decât \`setInterval\` sau \`setTimeout\`.

\`\`\`javascript
// Animație simplă cu rAF
const box = document.querySelector(".box");
let x = 0;

function anima(timestamp) {
  x += 2;
  box.style.transform = \`translateX(\${x}px)\`;

  if (x < 500) {
    requestAnimationFrame(anima); // planifică next frame
  }
}

requestAnimationFrame(anima); // pornește animația

// Animație cu timing precis
let startTime = null;
const duration = 1000; // 1 secundă

function animaTimed(timestamp) {
  if (!startTime) startTime = timestamp;
  const progress = Math.min((timestamp - startTime) / duration, 1);

  // Easing function — mișcare non-lineară
  const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
  box.style.transform = \`translateX(\${eased * 500}px)\`;

  if (progress < 1) requestAnimationFrame(animaTimed);
}
requestAnimationFrame(animaTimed);

// Anulare
const rafId = requestAnimationFrame(anima);
cancelAnimationFrame(rafId);
\`\`\`

• **Sincronizat cu display**: rulează înainte de fiecare repaint — max ~60fps sau display rate
• **Tab inactiv**: suspendat automat — economisește baterie și CPU
• **Timestamp**: primit ca argument — timpul în ms de la pornirea paginii
• **\`cancelAnimationFrame\`**: anulează un frame planificat cu ID-ul returnat`,
  },
];

async function main() {
  let updated = 0, notFound = 0;

  for (const item of UPDATES) {
    const lessons = await p.lesson.findMany({
      where: {
        title: item.lesson,
        module: { slug: "javascript" },
      },
    });

    if (lessons.length === 0) {
      console.log(`  ✗ Lectia negasita: "${item.lesson}"`);
      notFound++;
      continue;
    }

    const theory = await p.theory.findFirst({
      where: {
        title: item.title,
        lessonId: { in: lessons.map(l => l.id) },
      },
    });

    if (!theory) {
      console.log(`  ✗ Sectiunea negasita: "${item.lesson}" / "${item.title}"`);
      notFound++;
      continue;
    }

    await p.theory.update({
      where: { id: theory.id },
      data: { content: item.content },
    });

    console.log(`  ✓ ${item.lesson} / "${item.title}": ${theory.content.length} → ${item.content.length} chars`);
    updated++;
  }

  console.log(`\nDone: ${updated} updated, ${notFound} not found`);
  await p.$disconnect();
}

main().catch(e => { console.error(e); process.exit(1); });
