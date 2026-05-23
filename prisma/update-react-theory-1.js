"use strict";
require("dotenv").config({ path: ".env" });
const { PrismaClient } = require("@prisma/client");
const p = new PrismaClient();

const UPDATES = [
  {
    lessonContains: "Introducere React",
    titleContains: "Ce este React",
    content: `**React** este o bibliotecă JavaScript pentru construirea interfețelor utilizator, dezvoltată de Facebook (Meta) în 2013. React se bazează pe trei concepte fundamentale: **componente**, **Virtual DOM** și **flux unidirecțional de date**.

**Virtual DOM — cum funcționează:**
React nu modifică direct DOM-ul real (lent). În schimb, menține o copie în memorie (**Virtual DOM**), calculează diferențele (**diffing**) și aplică doar schimbările necesare (**reconciliation**).
\`\`\`
Date schimbate → React calculează diff → Aplică minim de modificări în DOM real
\`\`\`

**Vanilla JS vs React:**
\`\`\`javascript
// Vanilla JS — manual, fragil
document.getElementById("count").textContent = counter;
document.getElementById("btn").addEventListener("click", () => {
  counter++;
  document.getElementById("count").textContent = counter;
});

// React — declarativ
function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(c => c+1)}>Count: {count}</button>;
}
\`\`\`

**Principii React:**
• **Declarativ**: descrii CUM arată UI-ul, nu CE pași să urmezi
• **Component-based**: UI = colecție de componente reutilizabile
• **One-way data flow**: datele curg de sus în jos (parent → child)
• **Learn once, write anywhere**: React Web, React Native, React Native Web

**Setup rapid cu Vite:**
\`\`\`bash
npm create vite@latest my-app -- --template react
cd my-app && npm install && npm run dev
\`\`\`

**Punct de intrare — main.jsx:**
\`\`\`jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
\`\`\`

**StrictMode** activează verificări suplimentare în development: detectează side effects, API-uri deprecated, warnings de accesibilitate. Nu afectează producția.

**Ecosistem React:**
| Bibliotecă | Scop |
|------------|------|
| React Router | Navigare SPA |
| Zustand / Redux | State management |
| React Query | Server state |
| React Hook Form | Formulare |
| Framer Motion | Animații |`
  },
  {
    lessonContains: "Introducere React",
    titleContains: "JSX",
    content: `**JSX** (JavaScript XML) este o extensie de sintaxă care permite scrierea de markup HTML în fișiere JavaScript. Babel transpilează JSX în apeluri \`React.createElement()\`.

**Transpilare JSX:**
\`\`\`jsx
// JSX
const element = <h1 className="title">Salut, {name}!</h1>;

// După transpilare (echivalent JS pur)
const element = React.createElement(
  "h1",
  { className: "title" },
  "Salut, ", name, "!"
);
\`\`\`

**Diferențe JSX față de HTML:**
| HTML | JSX | Motiv |
|------|-----|-------|
| \`class=""\` | \`className=""\` | \`class\` e keyword JS |
| \`for=""\` | \`htmlFor=""\` | \`for\` e keyword JS |
| \`onclick=""\` | \`onClick={}\` | camelCase în React |
| \`<br>\` | \`<br />\` | JSX = XML, self-closing obligatoriu |
| \`style="color:red"\` | \`style={{color:'red'}}\` | obiect JS, nu string |

**Reguli JSX:**
\`\`\`jsx
// ✅ Un singur element rădăcină (sau Fragment)
return (
  <div>
    <h1>Titlu</h1>
    <p>Paragraf</p>
  </div>
);

// ✅ Fragment — fără div extra
return (
  <>
    <h1>Titlu</h1>
    <p>Paragraf</p>
  </>
);

// ❌ Greșit — două elemente la același nivel
return (
  <h1>Titlu</h1>
  <p>Paragraf</p>
);
\`\`\`

**Atribute dinamice:**
\`\`\`jsx
const isActive = true;
const url = "https://example.com";

<a href={url} className={isActive ? "active" : "inactive"}>
  Link
</a>

// Spread props
const props = { href: url, target: "_blank" };
<a {...props}>Link</a>
\`\`\`

**JSX nu este obligatoriu** — poți folosi React fără JSX, dar JSX face codul mult mai lizibil. Orice proiect modern folosește JSX. Babel/SWC/esbuild gestionează transpilarea automat când folosești Vite sau Create React App.`
  },
  {
    lessonContains: "Introducere React",
    titleContains: "Expresii JS",
    content: `În JSX, acoladele \`{ }\` permit inserarea oricărei **expresii JavaScript** — variabile, operații, funcții, obiecte.

**Ce poți folosi în { }:**
\`\`\`jsx
const name = "Ana";
const age = 25;
const items = ["mere", "pere", "prune"];

function greet(n) { return \`Salut, \${n}!\`; }

function App() {
  return (
    <div>
      <p>{name}</p>                          {/* variabilă */}
      <p>{age * 2}</p>                       {/* operație matematică */}
      <p>{greet(name)}</p>                   {/* apel funcție */}
      <p>{items.length} fructe</p>           {/* proprietate array */}
      <p>{new Date().toLocaleDateString()}</p> {/* expresie */}
    </div>
  );
}
\`\`\`

**Randare condiționată:**
\`\`\`jsx
const isLoggedIn = true;
const count = 5;

// Ternary operator — recomandat
<p>{isLoggedIn ? "Bun venit!" : "Te rog autentifică-te"}</p>

// Short-circuit && — randează doar dacă condiția e truthy
{count > 0 && <p>Ai {count} mesaje</p>}

// ❌ Atenție — 0 se randează! Folosește !! sau count > 0
{count && <p>Mesaje</p>}   // Dacă count=0, randează "0"
{!!count && <p>Mesaje</p>} // Corect
\`\`\`

**Ce NU poți folosi direct în JSX:**
\`\`\`jsx
// ❌ Statements (if, for, while) nu sunt expresii
// Soluție: mută logica în afara JSX
function App() {
  let message;
  if (isLoggedIn) {
    message = "Bun venit!";
  } else {
    message = "Autentifică-te";
  }
  return <p>{message}</p>; // ✅
}

// ❌ Blocuri {}
{
  const x = 5;  // ❌ — asta e bloc JSX, nu variabilă
}
\`\`\`

**Obiecte și arrays:**
\`\`\`jsx
const user = { name: "Ana", role: "admin" };

// Obiectele nu se pot randa direct
<p>{user}</p>           // ❌ Error: Objects are not valid as React children
<p>{user.name}</p>      // ✅
<p>{JSON.stringify(user)}</p> // ✅ pentru debug

// Arrays de elemente JSX — OK
<ul>{items.map(i => <li key={i}>{i}</li>)}</ul> // ✅
\`\`\``
  },
  {
    lessonContains: "Introducere React",
    titleContains: "Fragment",
    content: `**Fragments** rezolvă problema că JSX trebuie să returneze un singur element rădăcină, fără a adăuga noduri extra în DOM.

**Problema cu div-uri inutile:**
\`\`\`jsx
// ❌ Adaugă un <div> inutil în DOM
function TableRow() {
  return (
    <div>  {/* Invalide în <table>! */}
      <td>Celula 1</td>
      <td>Celula 2</td>
    </div>
  );
}

// ✅ Fragment — nu adaugă nimic în DOM
function TableRow() {
  return (
    <React.Fragment>
      <td>Celula 1</td>
      <td>Celula 2</td>
    </React.Fragment>
  );
}
\`\`\`

**Sintaxa scurtă <>:**
\`\`\`jsx
import React from 'react';

function Profil() {
  return (
    <>
      <h1>Ana Pop</h1>
      <p>Frontend Developer</p>
      <p>București, România</p>
    </>
  );
}
\`\`\`

**Fragment cu key — util în liste:**
\`\`\`jsx
// Sintaxa scurtă <> nu suportă key
// Trebuie să folosești <React.Fragment key={...}>

function ListaGrupe({ grupe }) {
  return (
    <dl>
      {grupe.map(grupa => (
        <React.Fragment key={grupa.id}>
          <dt>{grupa.nume}</dt>
          <dd>{grupa.descriere}</dd>
        </React.Fragment>
      ))}
    </dl>
  );
}
\`\`\`

**Cazuri de utilizare frecvente:**
• Componente care returnează celule de tabel (\`<td>\`, \`<th>\`)
• Componente care returnează elemente de listă (\`<li>\`)
• Componente care returnează elemente adiacente fără wrapper semantic
• Orice situație unde un \`<div>\` ar strica layout-ul CSS (flexbox, grid)

**Import:**
\`\`\`jsx
// Opțiunea 1 — import explicit
import { Fragment } from 'react';
<Fragment><p>A</p><p>B</p></Fragment>

// Opțiunea 2 — React.Fragment (necesită React importat)
import React from 'react';
<React.Fragment><p>A</p><p>B</p></React.Fragment>

// Opțiunea 3 — sintaxa scurtă (nu suportă props)
<><p>A</p><p>B</p></>
\`\`\``
  },
  {
    lessonContains: "Componente",
    titleContains: "funcționale",
    content: `**Componenta funcțională** este o funcție JavaScript care primește \`props\` ca argument și returnează JSX. Aceasta este forma standard în React modern (post-hooks).

**Structura unei componente:**
\`\`\`jsx
// Convenție: PascalCase pentru toate componentele
function Salut({ nume, varsta }) {
  // Logică JS înainte de return
  const este_adult = varsta >= 18;

  // Returnează JSX
  return (
    <div className="card">
      <h2>Bun venit, {nume}!</h2>
      {este_adult && <span className="badge">Adult</span>}
    </div>
  );
}

// Arrow function — la fel de valid
const Salut = ({ nume, varsta }) => {
  return <div>Salut, {nume}!</div>;
};
\`\`\`

**Componenta = funcție pură:**
\`\`\`jsx
// ✅ Pur — same props → same output
function Buton({ label, disabled }) {
  return <button disabled={disabled}>{label}</button>;
}

// ❌ Impur — rezultat diferit la același apel
function Timestamp() {
  return <p>{new Date().toISOString()}</p>; // Se schimbă la fiecare render!
  // Soluție: useState + useEffect
}
\`\`\`

**Compunere componente:**
\`\`\`jsx
function Avatar({ url, alt }) {
  return <img src={url} alt={alt} className="avatar" />;
}

function Card({ titlu, autor, avatarUrl }) {
  return (
    <div className="card">
      <Avatar url={avatarUrl} alt={autor} />
      <h3>{titlu}</h3>
      <p>de {autor}</p>
    </div>
  );
}

function App() {
  return (
    <main>
      <Card titlu="Introducere React" autor="Ana" avatarUrl="/ana.jpg" />
      <Card titlu="Hooks avansate" autor="Mihai" avatarUrl="/mihai.jpg" />
    </main>
  );
}
\`\`\`

**Reguli importante:**
• Numele componentei **trebuie** să înceapă cu **literă mare** (altfel React tratează ca tag HTML)
• Componenta trebuie să returneze **un singur element** (sau Fragment, sau null)
• Nu apela hooks în condiții sau bucle — doar la nivelul de top al funcției
• Componentele nu ar trebui să aibă side effects direct în body (folosește useEffect)`
  },
  {
    lessonContains: "Componente",
    titleContains: "Props avansate",
    content: `**Props** (properties) sunt argumentele pe care le primesc componentele React — mecanismul principal de a trece date de la părinte la copil.

**Destructurare și valori default:**
\`\`\`jsx
// Fără destructurare
function Buton(props) {
  return <button className={props.variant}>{props.label}</button>;
}

// Cu destructurare + valori default
function Buton({ label, variant = "primary", size = "md", disabled = false }) {
  return (
    <button
      className={\`btn btn-\${variant} btn-\${size}\`}
      disabled={disabled}
    >
      {label}
    </button>
  );
}

// Utilizare
<Buton label="Salvează" />                        // variant="primary", size="md"
<Buton label="Șterge" variant="danger" size="sm" />
\`\`\`

**Prop children:**
\`\`\`jsx
// children = tot ce e între tagurile componentei
function Card({ title, children, className = "" }) {
  return (
    <div className={\`card \${className}\`}>
      <h3 className="card-title">{title}</h3>
      <div className="card-body">{children}</div>
    </div>
  );
}

// Utilizare
<Card title="Profil utilizator">
  <p>Nume: Ana Pop</p>
  <p>Email: ana@example.com</p>
  <Buton label="Editează" />
</Card>
\`\`\`

**Rest/spread props:**
\`\`\`jsx
// Rest props — captează tot ce rămâne
function Input({ label, error, ...inputProps }) {
  return (
    <div className="form-group">
      <label>{label}</label>
      <input {...inputProps} className={error ? "input-error" : "input"} />
      {error && <span className="error">{error}</span>}
    </div>
  );
}

// ...inputProps va include: type, value, onChange, placeholder, etc.
<Input
  label="Email"
  error={errors.email}
  type="email"
  value={email}
  onChange={e => setEmail(e.target.value)}
  placeholder="email@exemplu.com"
/>
\`\`\`

**Tipuri de props frecvente:**
\`\`\`jsx
function Componenta({
  text,           // string
  count,          // number
  isActive,       // boolean (shorthand: isActive={true} = isActive)
  onClick,        // function (handler)
  items,          // array
  user,           // object
  children,       // ReactNode (JSX)
  style,          // CSSProperties (object)
  className,      // string
}) { /* ... */ }
\`\`\``
  },
  {
    lessonContains: "Componente",
    titleContains: "READONLY",
    content: `**Props sunt read-only** — o componentă nu are voie să modifice props-urile primite. Aceasta este o regulă fundamentală în React care garantează **fluxul unidirecțional de date**.

**De ce props sunt imutabile:**
\`\`\`jsx
// ❌ GREȘIT — modificare directă a props
function Buton({ count }) {
  count++;  // Mutatia props-ului NU re-randează componenta și e anti-pattern!
  return <button>{count}</button>;
}

// ✅ CORECT — state local pentru date care se schimbă
function Buton({ initialCount }) {
  const [count, setCount] = useState(initialCount);
  return <button onClick={() => setCount(c => c+1)}>{count}</button>;
}
\`\`\`

**Motivul imutabilității:**
• **Predictabilitate**: aceleași props → același output
• **Debugging ușor**: știi că props nu se modifică în componenta copil
• **Performance**: React poate optimiza re-renders bazat pe compararea props

**Pattern corect: ridică starea sus (lift state up):**
\`\`\`jsx
// ✅ Starea trăiește în parent, copilul primește valoarea + handler
function Parent() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Total: {count}</p>
      <Counter value={count} onChange={setCount} />
    </div>
  );
}

function Counter({ value, onChange }) {
  return (
    <div>
      <button onClick={() => onChange(v => v - 1)}>-</button>
      <span>{value}</span>
      <button onClick={() => onChange(v => v + 1)}>+</button>
    </div>
  );
}
\`\`\`

**Anti-patterns de evitat:**
\`\`\`jsx
// ❌ Copiere props în state fără motiv (state derivat redundant)
function Lista({ items }) {
  const [listaLocala, setListaLocala] = useState(items); // Nu face asta!
  // listaLocala devine desincronizat cu items
}

// ✅ Folosește items direct
function Lista({ items }) {
  return <ul>{items.map(i => <li key={i.id}>{i.name}</li>)}</ul>;
}

// ✅ Dacă ai nevoie de modificări locale, transformă în controlled component
function ListaEditabila({ items, onItemsChange }) {
  // onItemsChange e apelat când vrei să modifici, parent deține starea
}
\`\`\``
  },
  {
    lessonContains: "State cu useState",
    titleContains: "useState",
    content: `**useState** este hook-ul fundamental React pentru stocarea datelor care se schimbă în timp. Orice modificare a state-ului declanșează o re-randare a componentei.

**Sintaxă de bază:**
\`\`\`jsx
import { useState } from 'react';

function Counter() {
  // [valoare, functieSetter] = useState(valoareInitiala)
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Număr: {count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}
\`\`\`

**Batching în React 18:**
\`\`\`jsx
// React 18 grupează automat toate setState-urile dintr-un handler
function App() {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);

  function handleClick() {
    setA(1);   // Nu re-randează imediat
    setB(2);   // Nu re-randează imediat
    // React re-randează O SINGURĂ DATĂ după handler
  }
}
\`\`\`

**Inițializare leneșă (lazy initialization):**
\`\`\`jsx
// ❌ Calculul greu rulează la FIECARE render
const [data, setData] = useState(parseExpensiveJSON(rawData));

// ✅ Funcția de inițializare rulează DOAR la primul render
const [data, setData] = useState(() => parseExpensiveJSON(rawData));
\`\`\`

**Regulile Hook-urilor:**
\`\`\`jsx
function Componenta({ isVisible }) {
  // ❌ Hook în condiție
  if (isVisible) {
    const [x, setX] = useState(0); // GREȘIT!
  }

  // ❌ Hook în buclă
  for (let i = 0; i < 3; i++) {
    const [v, setV] = useState(i); // GREȘIT!
  }

  // ✅ Hook la nivelul de top al funcției
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  // Condiția după hook
  if (!isVisible) return null;
  return <div>{x}, {y}</div>;
}
\`\`\`

**Multiple state-uri:**
\`\`\`jsx
function Formular() {
  const [nume, setNume] = useState('');
  const [email, setEmail] = useState('');
  const [varsta, setVarsta] = useState(0);
  const [trimis, setTrimis] = useState(false);
  // Fiecare state e independent, schimbarea unuia nu le afectează pe celelalte
}
\`\`\``
  },
  {
    lessonContains: "State cu useState",
    titleContains: "State funcțional",
    content: `**Actualizările funcționale** ale state-ului garantează că lucrezi cu **valoarea cea mai recentă** — esențial când mai multe actualizări se grupează (batching) sau când ai closure-uri vechi.

**De ce actualizările funcționale sunt mai sigure:**
\`\`\`jsx
function Counter() {
  const [count, setCount] = useState(0);

  function increment3Times() {
    // ❌ GREȘIT — toate folosesc aceeași valoare 'count' din closure
    setCount(count + 1); // count = 0 → setează la 1
    setCount(count + 1); // count = 0 → setează la 1 (nu la 2!)
    setCount(count + 1); // count = 0 → setează la 1 (nu la 3!)
    // Rezultat: count = 1, nu 3

    // ✅ CORECT — fiecare primește valoarea anterioară garantată
    setCount(prev => prev + 1); // 0 → 1
    setCount(prev => prev + 1); // 1 → 2
    setCount(prev => prev + 1); // 2 → 3
    // Rezultat: count = 3
  }

  return <button onClick={increment3Times}>+3</button>;
}
\`\`\`

**State cu obiecte — spread pattern:**
\`\`\`jsx
function Formular() {
  const [form, setForm] = useState({
    nume: '',
    email: '',
    varsta: 18,
    activ: true
  });

  // ✅ Spread — păstrează celelalte câmpuri, modifică doar unul
  const updateField = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div>
      <input value={form.nume} onChange={e => updateField('nume', e.target.value)} />
      <input value={form.email} onChange={e => updateField('email', e.target.value)} />
      <input type="number" value={form.varsta}
        onChange={e => updateField('varsta', Number(e.target.value))} />
      <label>
        <input type="checkbox" checked={form.activ}
          onChange={e => updateField('activ', e.target.checked)} />
        Activ
      </label>
    </div>
  );
}
\`\`\`

**State derivat vs calculat:**
\`\`\`jsx
function ListaFiltrata({ produse }) {
  const [filtru, setFiltru] = useState('');

  // ✅ NU stoca în state ceva ce poate fi calculat din alt state/props
  // GREȘIT: const [produseFiltr, setProduseFiltr] = useState([]);
  // CORECT: calculează la render
  const produseFiltr = produse.filter(p =>
    p.nume.toLowerCase().includes(filtru.toLowerCase())
  );

  return (
    <>
      <input value={filtru} onChange={e => setFiltru(e.target.value)} />
      <ul>{produseFiltr.map(p => <li key={p.id}>{p.nume}</li>)}</ul>
    </>
  );
}
\`\`\``
  },
  {
    lessonContains: "State cu useState",
    titleContains: "State cu array",
    content: `Arrays în state React trebuie tratate ca **imutabile** — nu modifica array-ul existent, ci creează unul nou. React compară referințele pentru a detecta schimbările.

**Operații de bază cu array state:**
\`\`\`jsx
function ListaTodo() {
  const [todos, setTodos] = useState([
    { id: 1, text: "Cumpărături", done: false },
    { id: 2, text: "Sport", done: true }
  ]);

  // ✅ ADAUGĂ — spread + element nou
  const adauga = (text) => {
    const nou = { id: Date.now(), text, done: false };
    setTodos(prev => [...prev, nou]);
  };

  // ✅ ȘTERGE — filter (fără mutare)
  const sterge = (id) => {
    setTodos(prev => prev.filter(t => t.id !== id));
  };

  // ✅ ACTUALIZEAZĂ — map (înlocuiește elementul potrivit)
  const toggleDone = (id) => {
    setTodos(prev => prev.map(t =>
      t.id === id ? { ...t, done: !t.done } : t
    ));
  };

  // ✅ REORDONARE — spread + sort
  const sorteaza = () => {
    setTodos(prev => [...prev].sort((a, b) => a.text.localeCompare(b.text)));
  };

  return (
    <ul>
      {todos.map(t => (
        <li key={t.id} style={{ textDecoration: t.done ? 'line-through' : 'none' }}>
          {t.text}
          <button onClick={() => toggleDone(t.id)}>✓</button>
          <button onClick={() => sterge(t.id)}>✗</button>
        </li>
      ))}
    </ul>
  );
}
\`\`\`

**Anti-patterns — NU face asta:**
\`\`\`jsx
// ❌ Push direct — mutează array-ul, React nu detectează schimbarea
setTodos(prev => { prev.push(nou); return prev; });

// ❌ Splice direct
setTodos(prev => { prev.splice(0, 1); return prev; });

// ❌ Sort direct pe original
setTodos(prev => prev.sort()); // sort() mutează in-place!

// ✅ Sort corect — spread înainte
setTodos(prev => [...prev].sort((a, b) => a.text.localeCompare(b.text)));
\`\`\`

**Inserare la index specific:**
\`\`\`jsx
// Inserează la poziția idx
setTodos(prev => [
  ...prev.slice(0, idx),
  nouElement,
  ...prev.slice(idx)
]);
\`\`\``
  },
  {
    lessonContains: "useEffect",
    titleContains: "efecte secundare",
    content: `**useEffect** este hook-ul pentru **efecte secundare** — operații care interacționează cu exteriorul componentei: fetch API, manipulare DOM, timere, subscripții, localStorage.

**Ce sunt efectele secundare:**
• Fetch de date de la API
• Manipulare directă a DOM (\`document.title\`, focus)
• Abonament la evenimente (\`addEventListener\`, WebSocket)
• Timere (\`setTimeout\`, \`setInterval\`)
• Sincronizare cu sisteme externe (localStorage, IndexedDB)

**Sintaxă și timing:**
\`\`\`jsx
import { useState, useEffect } from 'react';

function Profil({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Rulează DUPĂ ce React actualizează DOM-ul
    // Nu blochează randarea vizuală

    setLoading(true);
    fetch(\`/api/users/\${userId}\`)
      .then(r => r.json())
      .then(data => {
        setUser(data);
        setLoading(false);
      });
  }, [userId]); // Rulează din nou dacă userId se schimbă

  if (loading) return <p>Încărcare...</p>;
  return <p>Bun venit, {user.name}!</p>;
}
\`\`\`

**useEffect vs codul de body:**
\`\`\`jsx
function Componenta({ id }) {
  // ❌ Fetch direct în body — rulează la FIECARE render, inclusiv intermediate
  const data = fetch(\`/api/\${id}\`); // GREȘIT!

  // ✅ În useEffect — controlat, cleanup posibil
  useEffect(() => {
    fetch(\`/api/\${id}\`).then(/* ... */);
  }, [id]);
}
\`\`\`

**Titlu pagină dinamic:**
\`\`\`jsx
function DetaliiProdus({ produs }) {
  useEffect(() => {
    // Side effect: modifică document.title
    document.title = \`\${produs.nume} — Magazin\`;

    // Cleanup: resetează titlul când componenta dispare
    return () => {
      document.title = 'Magazin Online';
    };
  }, [produs.nume]);

  return <h1>{produs.nume}</h1>;
}
\`\`\`

**Timing precis:**
1. React randează componenta (DOM actualizat)
2. Browser pictează pe ecran
3. useEffect rulează (după pictare — non-blocking)

Folosește \`useLayoutEffect\` dacă ai nevoie ca efectul să ruleze **înainte** de pictare (rar necesar — pentru măsurători DOM).`
  },
  {
    lessonContains: "useEffect",
    titleContains: "Dependency array",
    content: `**Dependency array** (al doilea argument al useEffect) controlează **când** rulează efectul. Este cel mai frecvent sursă de bug-uri în React.

**Cele trei variante:**
\`\`\`jsx
// 1. FĂRĂ dependency array — rulează după FIECARE render
useEffect(() => {
  console.log('Se execută la fiecare render');
});

// 2. ARRAY GOL [] — rulează O SINGURĂ DATĂ (la mount)
useEffect(() => {
  console.log('Se execută o singură dată');
  fetchInitialData();
}, []);

// 3. CU DEPENDENȚE — rulează când se schimbă orice din array
useEffect(() => {
  console.log('userId s-a schimbat:', userId);
  fetchUser(userId);
}, [userId]);
\`\`\`

**Regula completă a dependențelor:**
\`\`\`jsx
function Cautare({ query, filtru, onResultat }) {
  useEffect(() => {
    // Orice variabilă reactivă (state, props, variabile din component)
    // folosită în interiorul efectului TREBUIE să fie în deps array
    const rezultate = cauta(query, filtru);
    onResultat(rezultate);
  }, [query, filtru, onResultat]);
  // ✅ Toate trei sunt incluse
}
\`\`\`

**Deps lipsă — bug frecvent:**
\`\`\`jsx
function Timer({ interval }) {
  const [count, setCount] = useState(0);

  // ❌ 'interval' lipsește din deps — folosește valoarea de la mount
  useEffect(() => {
    const id = setInterval(() => setCount(c => c+1), interval);
    return () => clearInterval(id);
  }, []); // Bug! interval nu e în deps

  // ✅ Corect
  useEffect(() => {
    const id = setInterval(() => setCount(c => c+1), interval);
    return () => clearInterval(id);
  }, [interval]); // Recreează intervalul dacă interval se schimbă
}
\`\`\`

**eslint-plugin-react-hooks:**
\`\`\`bash
# Detectează automat dependențe lipsă
npm install eslint-plugin-react-hooks --save-dev
\`\`\`
\`\`\`json
// .eslintrc
{
  "plugins": ["react-hooks"],
  "rules": {
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn"
  }
}
\`\`\`

**Funcții în deps — stabilizare cu useCallback:**
\`\`\`jsx
// ❌ fetchData e recreat la fiecare render → buclă infinită
function Componenta({ url }) {
  const fetchData = async () => { /* ... */ };
  useEffect(() => { fetchData(); }, [fetchData]); // Buclă!
}

// ✅ Stabilizare cu useCallback
const fetchData = useCallback(async () => { /* ... */ }, [url]);
useEffect(() => { fetchData(); }, [fetchData]); // OK
\`\`\``
  },
  {
    lessonContains: "useEffect",
    titleContains: "Cleanup function",
    content: `**Cleanup function** este funcția returnată din useEffect. Rulează înainte ca efectul să fie re-executat și la **unmount** (demontarea componentei). Previne **memory leaks** și comportamente neașteptate.

**Pattern de bază:**
\`\`\`jsx
useEffect(() => {
  // Efectul (setup)
  const subscriptie = someService.subscribe(handler);

  // Cleanup — returnat ca funcție
  return () => {
    subscriptie.unsubscribe();
  };
}, []);
\`\`\`

**Event listeners:**
\`\`\`jsx
function KeyboardShortcuts({ onSave, onUndo }) {
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.ctrlKey && e.key === 's') { e.preventDefault(); onSave(); }
      if (e.ctrlKey && e.key === 'z') { onUndo(); }
    }

    document.addEventListener('keydown', handleKeyDown);

    // Cleanup esențial — fără cleanup, handlerul rămâne chiar dacă
    // componenta e demontată → memory leak + potențiale erori
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onSave, onUndo]);

  return <div>Apasă Ctrl+S pentru a salva</div>;
}
\`\`\`

**setInterval cu cleanup:**
\`\`\`jsx
function Ceas() {
  const [timp, setTimp] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => {
      setTimp(new Date());
    }, 1000);

    return () => clearInterval(id); // Fără cleanup → interval continuă după unmount
  }, []);

  return <p>{timp.toLocaleTimeString()}</p>;
}
\`\`\`

**Fetch cu AbortController (React 18+):**
\`\`\`jsx
function Date({ id }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    fetch(\`/api/item/\${id}\`, { signal: controller.signal })
      .then(r => r.json())
      .then(setData)
      .catch(err => {
        if (err.name !== 'AbortError') console.error(err);
      });

    // Anulează fetch-ul dacă id se schimbă înainte de răspuns
    // Previne race condition: răspuns vechi suprascriere date noi
    return () => controller.abort();
  }, [id]);

  return data ? <p>{data.name}</p> : <p>Încărcare...</p>;
}
\`\`\`

**Ordinea cleanup + re-run:**
1. Render cu \`id=1\` → effect rulează
2. \`id\` se schimbă la \`2\` → **cleanup pentru id=1** → effect pentru id=2`
  },
  {
    lessonContains: "Event Handlers",
    titleContains: "Eventuri de bază",
    content: `React folosește **SyntheticEvents** — wrappere cross-browser peste evenimentele native DOM. API-ul este identic cu DOM-ul, dar evenimentele sunt normalizate pentru compatibilitate.

**Evenimente frecvente:**
\`\`\`jsx
function Exemplu() {
  return (
    <div>
      {/* Click */}
      <button onClick={(e) => console.log('Click!', e)}>
        Apasă-mă
      </button>

      {/* Input change */}
      <input
        onChange={(e) => console.log('Valoare:', e.target.value)}
        onFocus={() => console.log('Focus')}
        onBlur={() => console.log('Blur')}
      />

      {/* Select */}
      <select onChange={(e) => console.log('Selectat:', e.target.value)}>
        <option value="ro">Română</option>
        <option value="en">Engleză</option>
      </select>

      {/* Keyboard */}
      <input onKeyDown={(e) => {
        if (e.key === 'Enter') console.log('Enter apăsat');
        if (e.key === 'Escape') console.log('Escape apăsat');
      }} />

      {/* Mouse */}
      <div
        onMouseEnter={() => console.log('Hover start')}
        onMouseLeave={() => console.log('Hover end')}
        onDoubleClick={() => console.log('Double click')}
      />
    </div>
  );
}
\`\`\`

**Proprietăți SyntheticEvent utile:**
\`\`\`jsx
function Handler(e) {
  e.target          // elementul care a declanșat evenimentul
  e.currentTarget   // elementul pe care e handler-ul
  e.type            // "click", "change", "submit", etc.
  e.preventDefault()  // oprește comportamentul default
  e.stopPropagation() // oprește bubbling

  // Pentru input/select/textarea
  e.target.value    // valoarea curentă
  e.target.checked  // pentru checkbox/radio
  e.target.name     // atributul name al elementului

  // Keyboard
  e.key             // "Enter", "Escape", "ArrowUp", etc.
  e.ctrlKey         // true/false
  e.shiftKey        // true/false
  e.altKey          // true/false
}
\`\`\`

**Handler cu state:**
\`\`\`jsx
function InputControlat() {
  const [value, setValue] = useState('');
  const [submitted, setSubmitted] = useState(false);

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      setSubmitted(true);
      console.log('Trimis:', value);
    }}>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Scrie ceva..."
      />
      <button type="submit">Trimite</button>
      {submitted && <p>Ai trimis: {value}</p>}
    </form>
  );
}
\`\`\``
  },
  {
    lessonContains: "Event Handlers",
    titleContains: "Pasare argumente",
    content: `Pasarea argumentelor la event handlers este o sursă frecventă de confuzii în React. Există mai multe pattern-uri, fiecare cu avantaje și dezavantaje.

**Pattern corect — arrow function în JSX:**
\`\`\`jsx
function Lista({ items }) {
  const handleClick = (id) => {
    console.log('Clicked:', id);
  };

  return (
    <ul>
      {items.map(item => (
        // ✅ Arrow function wraps handler-ul cu argumentele dorite
        <li key={item.id}>
          <button onClick={() => handleClick(item.id)}>
            {item.name}
          </button>
        </li>
      ))}
    </ul>
  );
}
\`\`\`

**Eroare clasică — apel imediat:**
\`\`\`jsx
// ❌ GREȘIT — handleClick(item.id) se execută la render, nu la click!
<button onClick={handleClick(item.id)}>Click</button>

// onClick primește o FUNCȚIE, nu rezultatul apelării ei
// handleClick(item.id) → execută funcția și pasează valoarea returnată

// ✅ CORECT — funcție care va fi apelată la click
<button onClick={() => handleClick(item.id)}>Click</button>
\`\`\`

**Pasare handler + event:**
\`\`\`jsx
function Buton({ onDelete, itemId }) {
  // Accesezi și argumentul și evenimentul
  const handleClick = (e) => {
    e.stopPropagation(); // Oprește bubbling
    onDelete(itemId);
  };

  return <button onClick={handleClick}>Șterge</button>;
}

// Sau inline cu ambii
<button onClick={(e) => {
  e.preventDefault();
  handleDelete(item.id);
}}>
  Șterge
</button>
\`\`\`

**Funcție de fabrică — pentru handler-uri complex:**
\`\`\`jsx
function Tabel({ rows }) {
  // Fabrică — returnează handler configurat
  const makeHandler = (rowId, action) => (e) => {
    e.stopPropagation();
    console.log(\`Action \${action} on row \${rowId}\`);
  };

  return (
    <table>
      {rows.map(row => (
        <tr key={row.id}>
          <td>{row.name}</td>
          <td>
            <button onClick={makeHandler(row.id, 'edit')}>✏️</button>
            <button onClick={makeHandler(row.id, 'delete')}>🗑️</button>
          </td>
        </tr>
      ))}
    </table>
  );
}
\`\`\`

**Atenție la performanță:**
Funcțiile arrow din JSX sunt recreate la fiecare render. Pentru liste mari, folosește \`useCallback\` sau \`data-*\` attributes:
\`\`\`jsx
// data-* approach — un singur handler pentru toată lista
<ul onClick={(e) => {
  const id = e.target.closest('[data-id]')?.dataset.id;
  if (id) handleClick(id);
}}>
  {items.map(i => <li key={i.id} data-id={i.id}>{i.name}</li>)}
</ul>
\`\`\``
  },
  {
    lessonContains: "Event Handlers",
    titleContains: "preventDefault",
    content: `**preventDefault()** oprește comportamentul default al browserului pentru un eveniment. **stopPropagation()** oprește propagarea evenimentului prin arborele DOM (bubbling/capturing).

**preventDefault — cazuri de utilizare:**
\`\`\`jsx
function Formular() {
  const [email, setEmail] = useState('');

  // ✅ Previne reload-ul paginii la submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Trimis:', email);
    // Fără preventDefault → pagina se reîncarcă!
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={email} onChange={e => setEmail(e.target.value)} />
      <button type="submit">Trimite</button>
    </form>
  );
}

// Link care nu navighează
<a href="/about" onClick={(e) => {
  e.preventDefault();
  navigate('/about'); // React Router navigation
}}>
  Despre noi
</a>

// Drag & drop — previne comportament default
<div
  onDragOver={(e) => e.preventDefault()} // Necesar pentru a permite drop
  onDrop={(e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  }}
>
  Trage fișierele aici
</div>
\`\`\`

**stopPropagation — oprire bubbling:**
\`\`\`jsx
function Card({ onClick }) {
  return (
    <div className="card" onClick={onClick}>
      <h3>Card titlu</h3>
      <button onClick={(e) => {
        e.stopPropagation(); // Previne onClick de pe card-ul parent
        console.log('Buton intern apăsat, card-ul NU va fi selectat');
      }}>
        Acțiune
      </button>
    </div>
  );
}
\`\`\`

**Combinate — stopPropagation + preventDefault:**
\`\`\`jsx
<a
  href="https://example.com"
  onClick={(e) => {
    e.preventDefault();    // Nu naviga la href
    e.stopPropagation();   // Nu propaga click-ul la parent
    handleSpecialNavigation();
  }}
>
  Link special
</a>
\`\`\`

**stopImmediatePropagation:**
\`\`\`jsx
// Oprește și alți listeneri de pe același element
<button
  onClick={(e) => {
    e.nativeEvent.stopImmediatePropagation();
    // Oprește și alți addEventListener('click') de pe același element
  }}
>
  Stop Total
</button>
\`\`\``
  }
];

async function main() {
  let updated = 0, notFound = 0;
  for (const item of UPDATES) {
    const lessons = await p.lesson.findMany({
      where: { module: { slug: "react" }, title: { contains: item.lessonContains } }
    });
    if (!lessons.length) { console.log("! Lec: " + item.lessonContains); notFound++; continue; }
    const theory = await p.theory.findFirst({
      where: { lessonId: { in: lessons.map(l => l.id) }, title: { contains: item.titleContains } }
    });
    if (!theory) { console.log("! Teo: " + item.titleContains + " in " + item.lessonContains); notFound++; continue; }
    await p.theory.update({ where: { id: theory.id }, data: { content: item.content } });
    console.log("✓ " + theory.title.substring(0, 45) + ": " + theory.content.length + " → " + item.content.length);
    updated++;
  }
  console.log("\nDone: " + updated + " updated, " + notFound + " not found");
  await p.$disconnect();
}
main().catch(e => { console.error(e); p.$disconnect(); process.exit(1); });
