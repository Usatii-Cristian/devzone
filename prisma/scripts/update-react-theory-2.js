"use strict";
require("dotenv").config({ path: ".env" });
const { PrismaClient } = require("@prisma/client");
const p = new PrismaClient();

const UPDATES = [
  {
    lessonContains: "Liste și Keys",
    titleContains: "Randare liste",
    content: `**Randarea listelor** în React se face cu \`.map()\` — transformă un array de date într-un array de elemente JSX. Este pattern-ul fundamental pentru a afișa colecții de date.

**Pattern de bază:**
\`\`\`jsx
function ListaProduse({ produse }) {
  return (
    <ul>
      {produse.map(produs => (
        <li key={produs.id}>
          <strong>{produs.nume}</strong> — {produs.pret} RON
        </li>
      ))}
    </ul>
  );
}

// Date exemplu
const produse = [
  { id: 1, nume: "Laptop", pret: 3500 },
  { id: 2, nume: "Mouse", pret: 120 },
  { id: 3, nume: "Tastatură", pret: 280 }
];
\`\`\`

**Componente în liste:**
\`\`\`jsx
function CardProdus({ produs }) {
  return (
    <div className="card">
      <img src={produs.imagine} alt={produs.nume} />
      <h3>{produs.nume}</h3>
      <p className="pret">{produs.pret} RON</p>
      <button>Adaugă în coș</button>
    </div>
  );
}

function GridProduse({ produse }) {
  return (
    <div className="grid">
      {produse.map(p => (
        <CardProdus key={p.id} produs={p} />
        // key trebuie pe elementul de NIVEL SUPERIOR din .map()
      ))}
    </div>
  );
}
\`\`\`

**Randare condiționată în liste:**
\`\`\`jsx
function ListaOrdinUri({ comenzi }) {
  if (comenzi.length === 0) {
    return <p>Nu ai comenzi plasate.</p>;
  }

  return (
    <div>
      <h2>{comenzi.length} comenzi</h2>
      <ul>
        {comenzi
          .filter(c => c.status !== 'anulata')  // filtrare
          .sort((a, b) => new Date(b.data) - new Date(a.data)) // sortare
          .map(c => (
            <li key={c.id} className={\`comanda comanda--\${c.status}\`}>
              #{c.id} — {c.total} RON — {c.status}
            </li>
          ))
        }
      </ul>
    </div>
  );
}
\`\`\`

**Array de obiecte nested:**
\`\`\`jsx
function MeniuCategorizat({ categorii }) {
  return (
    <nav>
      {categorii.map(cat => (
        <div key={cat.id}>
          <h3>{cat.titlu}</h3>
          <ul>
            {cat.items.map(item => (
              <li key={item.id}>
                <a href={item.url}>{item.label}</a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}
\`\`\``
  },
  {
    lessonContains: "Liste și Keys",
    titleContains: "key",
    content: `**Prop-ul \`key\`** este un identificator special care ajută React să determine **care elemente s-au schimbat, adăugat sau eliminat** dintr-o listă. Este esențial pentru reconcilierea eficientă a DOM-ului.

**De ce React are nevoie de key:**
\`\`\`jsx
// Fără key, React nu știe cum să mapeze elementele vechi la cele noi
// Dacă adaugi un element la ÎNCEPUT:

// Înainte: [A, B, C]
// După:    [X, A, B, C]

// Fără key — React presupune că A devine X, B devine A etc.
// → actualizează TOATE elementele (ineficient)

// Cu key — React știe că X e nou, A/B/C sunt neschimbate
// → inserează doar X
\`\`\`

**Key trebuie să fie UNIC și STABIL:**
\`\`\`jsx
// ✅ ID din baza de date — cel mai bun
{users.map(u => <UserCard key={u.id} user={u} />)}

// ✅ Slug sau alt identificator unic stabil
{posts.map(p => <Article key={p.slug} post={p} />)}

// ❌ Index — problematic când lista se reordonează/filtrează
{items.map((item, index) => <Item key={index} item={item} />)}
// Bug: după ștergere/reordonare, key-urile nu mai corespund elementelor

// ❌ Random — chei noi la fiecare render → totul se re-mountează
{items.map(i => <Item key={Math.random()} item={i} />)}
\`\`\`

**Când index este acceptabil:**
\`\`\`jsx
// ✅ OK cu index dacă:
// 1. Lista NU se reordonează
// 2. Lista NU se filtrează
// 3. Elementele NU au state local

// Exemplu: tab-uri statice
const tabs = ['Profil', 'Setări', 'Securitate'];
{tabs.map((tab, i) => <Tab key={i} label={tab} />)} // OK dacă tabs e constant
\`\`\`

**Key ca hint de reset:**
\`\`\`jsx
// Dacă schimbi key-ul, React demontează și remontează componenta
// Util pentru a reseta state-ul intern

function Editor({ articleId }) {
  return <TextEditor key={articleId} />;
  // La schimbarea articleId → TextEditor complet resetat, state curat
}
\`\`\`

**Key nu se pasează ca prop:**
\`\`\`jsx
function Item({ key, name }) {
  // ❌ 'key' NU e accesibil în props — e rezervat de React
  // console.log(key); → undefined
}

// Dacă ai nevoie de id în component, pasează-l separat
{items.map(i => <Item key={i.id} id={i.id} name={i.name} />)}
\`\`\``
  },
  {
    lessonContains: "Liste și Keys",
    titleContains: "Liste cu state",
    content: `**Liste cu state** combină randarea listelor cu gestiunea state-ului pentru a crea interfețe interactive — adăugare, ștergere, editare, filtrare și reordonare.

**Todo App complet:**
\`\`\`jsx
import { useState } from 'react';

function TodoApp() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Cumpărături', done: false },
    { id: 2, text: 'Sport', done: false },
  ]);
  const [input, setInput] = useState('');
  const [filtru, setFiltru] = useState('toate'); // 'toate'|'active'|'finalizate'

  const adauga = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setTodos(prev => [...prev, { id: Date.now(), text: input.trim(), done: false }]);
    setInput('');
  };

  const toggle = (id) => setTodos(prev =>
    prev.map(t => t.id === id ? { ...t, done: !t.done } : t)
  );

  const sterge = (id) => setTodos(prev => prev.filter(t => t.id !== id));

  const todosVizibile = todos.filter(t => {
    if (filtru === 'active') return !t.done;
    if (filtru === 'finalizate') return t.done;
    return true;
  });

  return (
    <div className="todo-app">
      <form onSubmit={adauga}>
        <input value={input} onChange={e => setInput(e.target.value)}
          placeholder="Sarcină nouă..." />
        <button type="submit">Adaugă</button>
      </form>

      <div className="filtre">
        {['toate', 'active', 'finalizate'].map(f => (
          <button key={f} onClick={() => setFiltru(f)}
            className={filtru === f ? 'activ' : ''}>
            {f}
          </button>
        ))}
      </div>

      <ul>
        {todosVizibile.map(todo => (
          <li key={todo.id} className={todo.done ? 'done' : ''}>
            <input type="checkbox" checked={todo.done}
              onChange={() => toggle(todo.id)} />
            <span>{todo.text}</span>
            <button onClick={() => sterge(todo.id)}>✗</button>
          </li>
        ))}
      </ul>

      <p>{todos.filter(t => !t.done).length} sarcini rămase</p>
    </div>
  );
}
\`\`\`

**Editare in-place:**
\`\`\`jsx
const [editingId, setEditingId] = useState(null);
const [editText, setEditText] = useState('');

const startEdit = (todo) => { setEditingId(todo.id); setEditText(todo.text); };
const saveEdit = () => {
  setTodos(prev => prev.map(t => t.id === editingId ? { ...t, text: editText } : t));
  setEditingId(null);
};

// În JSX
{todo.id === editingId
  ? <input value={editText} onChange={e => setEditText(e.target.value)}
      onBlur={saveEdit} onKeyDown={e => e.key === 'Enter' && saveEdit()} />
  : <span onDoubleClick={() => startEdit(todo)}>{todo.text}</span>
}
\`\`\``
  },
  {
    lessonContains: "Forms",
    titleContains: "Controlled inputs",
    content: `**Controlled inputs** (intrări controlate) sunt elemente de formular al căror **value este controlat de state-ul React**, nu de DOM. React devine sursa unică de adevăr pentru valoarea input-ului.

**Conceptul controlled vs uncontrolled:**
\`\`\`jsx
// ❌ Uncontrolled — DOM controlează valoarea
<input type="text" defaultValue="inițial" />
// Valoarea e în DOM, React nu o știe

// ✅ Controlled — React controlează valoarea
const [val, setVal] = useState('inițial');
<input type="text" value={val} onChange={e => setVal(e.target.value)} />
// React e sursa unică de adevăr
\`\`\`

**Toate tipurile de input:**
\`\`\`jsx
function Formular() {
  const [form, setForm] = useState({
    text: '',
    email: '',
    password: '',
    numar: 0,
    textarea: '',
    select: 'ro',
    checkbox: false,
    radio: 'masculin',
    range: 50
  });

  const update = (key) => (e) =>
    setForm(prev => ({ ...prev, [key]: e.target.type === 'checkbox'
      ? e.target.checked : e.target.value }));

  return (
    <form>
      <input type="text" value={form.text} onChange={update('text')} />
      <input type="email" value={form.email} onChange={update('email')} />
      <input type="password" value={form.password} onChange={update('password')} />
      <input type="number" value={form.numar} onChange={update('numar')} />
      <textarea value={form.textarea} onChange={update('textarea')} />

      <select value={form.select} onChange={update('select')}>
        <option value="ro">Română</option>
        <option value="en">Engleză</option>
        <option value="fr">Franceză</option>
      </select>

      <input type="checkbox" checked={form.checkbox} onChange={update('checkbox')} />

      {['masculin', 'feminin', 'alt'].map(val => (
        <label key={val}>
          <input type="radio" value={val}
            checked={form.radio === val}
            onChange={update('radio')} />
          {val}
        </label>
      ))}

      <input type="range" min="0" max="100"
        value={form.range} onChange={update('range')} />
    </form>
  );
}
\`\`\`

**Select multiplu:**
\`\`\`jsx
const [selectate, setSelectate] = useState([]);

<select multiple value={selectate}
  onChange={e => setSelectate(Array.from(e.target.selectedOptions, o => o.value))}>
  <option value="js">JavaScript</option>
  <option value="ts">TypeScript</option>
  <option value="py">Python</option>
</select>
\`\`\``
  },
  {
    lessonContains: "Forms",
    titleContains: "Form complex",
    content: `**Formularele complexe** folosesc un singur obiect de state pentru toate câmpurile, reducând numărul de hook-uri și simplificând logica de submit și reset.

**Pattern cu un singur state object:**
\`\`\`jsx
import { useState } from 'react';

const INITIAL_STATE = {
  nume: '', prenume: '', email: '',
  telefon: '', oras: '', judet: '',
  parola: '', confirmaParola: ''
};

function FormularInregistrare({ onSuccess }) {
  const [form, setForm] = useState(INITIAL_STATE);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Handler generic pentru toate câmpurile
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Șterge eroarea câmpului la modificare
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <FormField label="Prenume" name="prenume"
          value={form.prenume} error={errors.prenume}
          onChange={handleChange} />
        <FormField label="Nume" name="nume"
          value={form.nume} error={errors.nume}
          onChange={handleChange} />
      </div>
      <FormField label="Email" name="email" type="email"
        value={form.email} error={errors.email}
        onChange={handleChange} />
      <FormField label="Telefon" name="telefon" type="tel"
        value={form.telefon} error={errors.telefon}
        onChange={handleChange} />
      <div className="row">
        <FormField label="Oraș" name="oras"
          value={form.oras} error={errors.oras}
          onChange={handleChange} />
        <FormField label="Județ" name="judet"
          value={form.judet} error={errors.judet}
          onChange={handleChange} />
      </div>
      <FormField label="Parolă" name="parola" type="password"
        value={form.parola} error={errors.parola}
        onChange={handleChange} />
      <FormField label="Confirmă parola" name="confirmaParola" type="password"
        value={form.confirmaParola} error={errors.confirmaParola}
        onChange={handleChange} />
      <button type="submit" disabled={loading}>
        {loading ? 'Se procesează...' : 'Înregistrează-te'}
      </button>
    </form>
  );
}

// Componentă reutilizabilă pentru câmp
function FormField({ label, name, type = 'text', value, error, onChange }) {
  return (
    <div className="form-field">
      <label htmlFor={name}>{label}</label>
      <input id={name} name={name} type={type}
        value={value} onChange={onChange}
        className={error ? 'input-error' : ''} />
      {error && <span className="error-msg">{error}</span>}
    </div>
  );
}
\`\`\``
  },
  {
    lessonContains: "Forms",
    titleContains: "Validare",
    content: `**Validarea formularelor** în React implică verificarea datelor înainte de submit și afișarea mesajelor de eroare. Se poate face manual sau cu biblioteci ca React Hook Form + Zod.

**Validare manuală:**
\`\`\`jsx
function validate(form) {
  const errors = {};

  if (!form.email.trim()) {
    errors.email = 'Email-ul este obligatoriu';
  } else if (!/^[^@]+@[^@]+\\.[^@]+$/.test(form.email)) {
    errors.email = 'Email-ul nu este valid';
  }

  if (!form.parola) {
    errors.parola = 'Parola este obligatorie';
  } else if (form.parola.length < 8) {
    errors.parola = 'Parola trebuie să aibă minim 8 caractere';
  } else if (!/[A-Z]/.test(form.parola)) {
    errors.parola = 'Parola trebuie să conțină cel puțin o literă mare';
  }

  if (form.parola !== form.confirmaParola) {
    errors.confirmaParola = 'Parolele nu coincid';
  }

  if (!form.nume.trim()) {
    errors.nume = 'Numele este obligatoriu';
  }

  return errors;
}
\`\`\`

**Integrare în formular:**
\`\`\`jsx
function Formular() {
  const [form, setForm] = useState({ email: '', parola: '', confirmaParola: '', nume: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const erori = validate(form);

    if (Object.keys(erori).length > 0) {
      setErrors(erori);
      return; // Oprește submit-ul
    }

    try {
      setSubmitted(true);
      await api.register(form);
      // Succes
    } catch (err) {
      setErrors({ general: err.message });
      setSubmitted(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      {errors.general && <div className="alert-error">{errors.general}</div>}

      <div>
        <input name="email" value={form.email}
          onChange={e => setForm(p => ({...p, email: e.target.value}))}
          onBlur={() => {
            // Validare la blur (pierdera focus-ului)
            const erori = validate(form);
            if (erori.email) setErrors(p => ({...p, email: erori.email}));
          }}
          aria-invalid={!!errors.email}
          aria-describedby="email-error"
        />
        {errors.email && <span id="email-error" role="alert">{errors.email}</span>}
      </div>

      <button type="submit" disabled={submitted}>
        {submitted ? 'Se procesează...' : 'Înregistrare'}
      </button>
    </form>
  );
}
\`\`\`

**Validare live (la typing):**
\`\`\`jsx
// Validează doar câmpurile atinse (touched)
const [touched, setTouched] = useState({});

const handleBlur = (e) => {
  setTouched(prev => ({ ...prev, [e.target.name]: true }));
};

// Afișează eroarea doar dacă câmpul a fost atins
{touched.email && errors.email && <span>{errors.email}</span>}
\`\`\``
  },
  {
    lessonContains: "useContext",
    titleContains: "prop drilling",
    content: `**Prop drilling** apare când un prop trebuie să fie transmis prin mai multe niveluri de componente intermediare care nu îl folosesc ele însele — doar îl transmit mai departe.

**Problema prop drilling:**
\`\`\`jsx
// Exemplu clasic — user trebuie să ajungă la UserAvatar
function App() {
  const [user, setUser] = useState({ name: 'Ana', avatar: '/ana.jpg' });
  return <Layout user={user} />; // Layout nu folosește user, îl pasează
}

function Layout({ user }) {
  return (
    <div>
      <Header user={user} /> {/* Header nu folosește user, îl pasează */}
      <Main />
    </div>
  );
}

function Header({ user }) {
  return (
    <nav>
      <Logo />
      <NavMenu user={user} /> {/* NavMenu nu folosește user */}
    </nav>
  );
}

function NavMenu({ user }) {
  return (
    <ul>
      <li><a href="/">Acasă</a></li>
      <UserAvatar user={user} /> {/* ÎN FINE! Acesta îl folosește */}
    </ul>
  );
}

function UserAvatar({ user }) {
  return <img src={user.avatar} alt={user.name} />;
}
\`\`\`

**Probleme cu prop drilling:**
• **Cod verbos** — fiecare componentă intermediară primește și pasează props inutile
• **Refactorizare dificilă** — dacă schimbi forma datelor, actualizezi TOATE componentele intermediare
• **Cuplare** — componente intermediare devin dependente de structura datelor
• **Greu de urmărit** — nu e clar de unde vine un prop

**Semne că ai nevoie de Context:**
• Datele sunt folosite în mai mult de 2-3 niveluri de adâncime
• Datele sunt comune mai multor sub-arbori (ex: user autentificat, temă, limbă)
• Adăugarea unui prop nou necesită modificarea multor componente

**Alternative la prop drilling:**
1. **Context API** — pentru date globale stabile
2. **Zustand / Redux** — pentru state complex sau frecvent schimbat
3. **Component composition** — pasează componente (children) în loc de date
\`\`\`jsx
// Composition — evită prop drilling pasând componente
function Layout({ children, header }) {
  return <div><header>{header}</header><main>{children}</main></div>;
}
// Utilizare: <Layout header={<UserAvatar user={user} />}>...</Layout>
\`\`\``
  },
  {
    lessonContains: "useContext",
    titleContains: "createContext",
    content: `**Context API** rezolvă prop drilling oferind un mecanism de a "transmite" date prin arborele de componente fără a le pasa manual prin props.

**Crearea și utilizarea unui Context:**
\`\`\`jsx
import { createContext, useContext, useState } from 'react';

// 1. Creează contextul cu valoare default
const UserContext = createContext(null);

// 2. Provider — înconjoară arborele care are nevoie de date
function App() {
  const [user, setUser] = useState({ name: 'Ana', role: 'admin' });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Layout />
    </UserContext.Provider>
  );
}

// 3. Consumer — orice componentă din arbore
function UserAvatar() {
  const { user } = useContext(UserContext); // Direct, fără prop drilling!
  return <img src={user.avatar} alt={user.name} />;
}

function UserMenu() {
  const { user, setUser } = useContext(UserContext);
  return (
    <div>
      <p>Bun venit, {user.name}!</p>
      <button onClick={() => setUser(null)}>Deconectare</button>
    </div>
  );
}
\`\`\`

**Custom hook pentru context:**
\`\`\`jsx
// Bună practică: creează un hook custom pentru context
function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser trebuie folosit înăuntrul unui UserProvider');
  }
  return context;
}

// Utilizare mai curată
function Profil() {
  const { user } = useUser(); // Mai explicit decât useContext(UserContext)
  return <p>{user.name}</p>;
}
\`\`\`

**Contexte multiple:**
\`\`\`jsx
function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <LanguageProvider>
          <Router>
            <AppContent />
          </Router>
        </LanguageProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}
\`\`\`

**Limitări ale Context:**
• Re-randează TOȚI consumatorii când valoarea se schimbă
• Nu e potrivit pentru state care se schimbă frecvent (animații, input live)
• Pentru state complex sau performanță critică → Zustand, Redux`
  },
  {
    lessonContains: "useContext",
    titleContains: "Theme Context",
    content: `**Theme Context** este un exemplu clasic de Context API — permite schimbarea temei (dark/light) din orice componentă fără prop drilling.

**Implementare completă Theme Context:**
\`\`\`jsx
import { createContext, useContext, useState, useEffect } from 'react';

// Context cu tipuri clare
const ThemeContext = createContext({
  theme: 'light',
  toggleTheme: () => {}
});

// Provider cu persistare în localStorage
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    // Lazy init — citim din localStorage la primul render
    return localStorage.getItem('theme') || 'light';
  });

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  // Sincronizare cu DOM și localStorage
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook
export function useTheme() {
  return useContext(ThemeContext);
}
\`\`\`

**Utilizare în componente:**
\`\`\`jsx
function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className={\`header header--\${theme}\`}>
      <Logo />
      <button onClick={toggleTheme} aria-label="Schimbă tema">
        {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
      </button>
    </header>
  );
}

function Card({ title, children }) {
  const { theme } = useTheme();
  return (
    <div className={\`card card--\${theme}\`}>
      <h3>{title}</h3>
      {children}
    </div>
  );
}

// App cu ThemeProvider
function App() {
  return (
    <ThemeProvider>
      <Header />
      <main>
        <Card title="Card 1">Conținut...</Card>
        <Card title="Card 2">Conținut...</Card>
      </main>
    </ThemeProvider>
  );
}
\`\`\`

**CSS cu data-theme:**
\`\`\`css
:root[data-theme="light"] {
  --bg: #ffffff;
  --text: #1a1a1a;
  --card-bg: #f5f5f5;
}
:root[data-theme="dark"] {
  --bg: #1a1a1a;
  --text: #f5f5f5;
  --card-bg: #2d2d2d;
}
.card { background: var(--card-bg); color: var(--text); }
\`\`\``
  },
  {
    lessonContains: "Custom Hooks",
    titleContains: "custom hooks",
    content: `**Custom hooks** sunt funcții JavaScript care folosesc React hooks și encapsulează logică reutilizabilă. Numele trebuie să înceapă cu \`use\` — aceasta semnalează că funcția respectă regulile hook-urilor.

**De ce custom hooks:**
• **Reutilizare logică** fără a duplica cod
• **Separare concerns** — logica se separă de UI
• **Testabilitate** — hooks se testează independent de componente
• **Compoziție** — hooks pot folosi alte hooks

**Structura unui custom hook:**
\`\`\`jsx
// usCounter.js — hook reutilizabil pentru contor
import { useState, useCallback } from 'react';

function useCounter(initialValue = 0, step = 1) {
  const [count, setCount] = useState(initialValue);

  const increment = useCallback(() => setCount(c => c + step), [step]);
  const decrement = useCallback(() => setCount(c => c - step), [step]);
  const reset = useCallback(() => setCount(initialValue), [initialValue]);
  const setTo = useCallback((val) => setCount(val), []);

  return { count, increment, decrement, reset, setTo };
}

// Utilizare
function QuantityPicker({ onQuantityChange }) {
  const { count, increment, decrement } = useCounter(1);

  useEffect(() => onQuantityChange(count), [count, onQuantityChange]);

  return (
    <div>
      <button onClick={decrement} disabled={count <= 1}>-</button>
      <span>{count}</span>
      <button onClick={increment}>+</button>
    </div>
  );
}
\`\`\`

**Hook pentru toggle:**
\`\`\`jsx
function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);
  const toggle = useCallback(() => setValue(v => !v), []);
  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);
  return [value, toggle, { setTrue, setFalse }];
}

// Utilizare
function Modal() {
  const [isOpen, toggleModal] = useToggle(false);
  return (
    <>
      <button onClick={toggleModal}>
        {isOpen ? 'Închide' : 'Deschide'} modal
      </button>
      {isOpen && <div className="modal">Conținut modal</div>}
    </>
  );
}
\`\`\`

**Hook pentru debounce:**
\`\`\`jsx
function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

// Utilizare: search fără spam de request-uri
function SearchInput() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    if (debouncedQuery) fetchSearch(debouncedQuery);
  }, [debouncedQuery]);

  return <input value={query} onChange={e => setQuery(e.target.value)} />;
}
\`\`\``
  },
  {
    lessonContains: "Custom Hooks",
    titleContains: "useFetch",
    content: `**useFetch** este un custom hook esențial care encapsulează logica de fetch: loading, error, data, și cleanup la unmount.

**Implementare completă useFetch:**
\`\`\`jsx
import { useState, useEffect, useCallback } from 'react';

function useFetch(url, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    if (!url) return;

    const controller = new AbortController();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal
      });

      if (!response.ok) {
        throw new Error(\`HTTP error! Status: \${response.status}\`);
      }

      const json = await response.json();
      setData(json);
    } catch (err) {
      if (err.name !== 'AbortError') {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }

    return () => controller.abort();
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}
\`\`\`

**Utilizare:**
\`\`\`jsx
function ListaUtilizatori() {
  const { data: users, loading, error, refetch } = useFetch('/api/users');

  if (loading) return <p>Se încarcă...</p>;
  if (error) return (
    <div>
      <p>Eroare: {error}</p>
      <button onClick={refetch}>Încearcă din nou</button>
    </div>
  );

  return (
    <ul>
      {users?.map(u => <li key={u.id}>{u.name} — {u.email}</li>)}
    </ul>
  );
}

// Cu URL dinamic
function DetaliiUser({ userId }) {
  const { data: user, loading } = useFetch(
    userId ? \`/api/users/\${userId}\` : null
  );

  if (loading) return <Spinner />;
  return user ? <ProfilCard user={user} /> : null;
}
\`\`\`

**useFetch cu POST:**
\`\`\`jsx
function usePost(url) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const post = useCallback(async (body) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      if (!res.ok) throw new Error(\`Status: \${res.status}\`);
      return await res.json();
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [url]);

  return { post, loading, error };
}
\`\`\``
  },
  {
    lessonContains: "Custom Hooks",
    titleContains: "useLocalStorage",
    content: `**useLocalStorage** sincronizează state-ul React cu \`localStorage\`, persitând date între sesiuni ale utilizatorului.

**Implementare robustă useLocalStorage:**
\`\`\`jsx
import { useState, useEffect, useCallback } from 'react';

function useLocalStorage(key, initialValue) {
  // Lazy init — citim din localStorage o singură dată
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = useCallback((value) => {
    try {
      // Suportă actualizări funcționale: setValue(prev => ...)
      const valueToStore = value instanceof Function
        ? value(storedValue)
        : value;
      setStoredValue(valueToStore);
      localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(\`Eroare la scriere în localStorage ["\${key}"]:\`, error);
    }
  }, [key, storedValue]);

  const removeValue = useCallback(() => {
    setStoredValue(initialValue);
    localStorage.removeItem(key);
  }, [key, initialValue]);

  return [storedValue, setValue, removeValue];
}
\`\`\`

**Utilizare:**
\`\`\`jsx
// Preferințe utilizator
function Setari() {
  const [limba, setLimba] = useLocalStorage('limba', 'ro');
  const [notificari, setNotificari] = useLocalStorage('notificari', true);

  return (
    <div>
      <select value={limba} onChange={e => setLimba(e.target.value)}>
        <option value="ro">Română</option>
        <option value="en">English</option>
      </select>
      <label>
        <input type="checkbox" checked={notificari}
          onChange={e => setNotificari(e.target.checked)} />
        Activează notificările
      </label>
    </div>
  );
}

// Coș de cumpărături persistent
function useCart() {
  const [cart, setCart] = useLocalStorage('cart', []);

  const addItem = (item) => setCart(prev =>
    prev.find(i => i.id === item.id)
      ? prev.map(i => i.id === item.id ? {...i, qty: i.qty+1} : i)
      : [...prev, {...item, qty: 1}]
  );

  const removeItem = (id) => setCart(prev => prev.filter(i => i.id !== id));
  const clearCart = () => setCart([]);
  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  return { cart, addItem, removeItem, clearCart, total };
}
\`\`\`

**Alte hooks utile:**
\`\`\`jsx
// useWindowSize — dimensiunea ferestrei
function useWindowSize() {
  const [size, setSize] = useState({ w: window.innerWidth, h: window.innerHeight });
  useEffect(() => {
    const handler = () => setSize({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);
  return size;
}

// useOnline — stare conectivitate
function useOnline() {
  const [online, setOnline] = useState(navigator.onLine);
  useEffect(() => {
    const on = () => setOnline(true);
    const off = () => setOnline(false);
    window.addEventListener('online', on);
    window.addEventListener('offline', off);
    return () => { window.removeEventListener('online', on); window.removeEventListener('offline', off); };
  }, []);
  return online;
}
\`\`\``
  },
  {
    lessonContains: "Performance: memo",
    titleContains: "React.memo",
    content: `**React.memo** este un Higher Order Component (HOC) care **memorizează** rezultatul randării unui component. Dacă props-urile nu s-au schimbat (comparație shallow), React sare peste re-randare.

**Cum funcționează re-randarea în React:**
\`\`\`jsx
function Parent() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <button onClick={() => setCount(c => c+1)}>+1</button>
      <Child name="Ana" />  {/* Se re-randează la FIECARE apăsare! */}
    </div>
  );
}
\`\`\`

**React.memo oprește re-randările inutile:**
\`\`\`jsx
// Fără memo — re-randare la orice schimbare a parent-ului
function ExpensiveChild({ name, data }) {
  // Calcul greu sau render complex
  return <div>{/* ... */}</div>;
}

// Cu memo — re-randare DOAR dacă name sau data s-au schimbat
const ExpensiveChild = React.memo(function ExpensiveChild({ name, data }) {
  console.log('Re-render ExpensiveChild');
  return <div>{name}: {data.value}</div>;
});

// Arrow function
const ExpensiveChild = React.memo(({ name, data }) => {
  return <div>{name}: {data.value}</div>;
});
\`\`\`

**Comparație custom:**
\`\`\`jsx
// Al doilea argument: funcție de comparare
// Returnează true → SKIP re-render (props "egale")
// Returnează false → re-render
const Lista = React.memo(
  function Lista({ items, maxItems }) {
    return <ul>{items.slice(0, maxItems).map(i => <li key={i.id}>{i.name}</li>)}</ul>;
  },
  (prevProps, nextProps) => {
    // Re-randează doar dacă items sau maxItems s-au schimbat semnificativ
    return prevProps.maxItems === nextProps.maxItems &&
           prevProps.items.length === nextProps.items.length &&
           prevProps.items.every((item, i) => item.id === nextProps.items[i].id);
  }
);
\`\`\`

**Când să folosești React.memo:**
• Componenta se re-randează frecvent cu aceleași props
• Componenta este "scumpă" (liste mari, calcule, grafice)
• Parent-ul se re-randează des din motive independente de copil

**Când NU merită:**
• Componente simple (câteva elemente DOM)
• Props-urile se schimbă oricum la fiecare render
• Costul comparației depășește costul re-randării`
  },
  {
    lessonContains: "Performance: memo",
    titleContains: "useMemo",
    content: `**useMemo** memorizează rezultatul unui calcul costisitor — recalculează doar când dependențele se schimbă.

**Sintaxă și utilizare:**
\`\`\`jsx
import { useState, useMemo } from 'react';

function Statistici({ tranzactii }) {
  const [filtru, setFiltru] = useState('toate');

  // ✅ Calcul memorat — rulează doar când tranzactii sau filtru se schimbă
  const stats = useMemo(() => {
    console.log('Recalculez statistici...'); // Verificare când rulează

    const filtrate = filtru === 'toate'
      ? tranzactii
      : tranzactii.filter(t => t.tip === filtru);

    return {
      total: filtrate.reduce((sum, t) => sum + t.suma, 0),
      medie: filtrate.length ? filtrate.reduce((s, t) => s + t.suma, 0) / filtrate.length : 0,
      maxim: Math.max(...filtrate.map(t => t.suma)),
      numar: filtrate.length
    };
  }, [tranzactii, filtru]);

  return (
    <div>
      <p>Total: {stats.total} RON</p>
      <p>Medie: {stats.medie.toFixed(2)} RON</p>
    </div>
  );
}
\`\`\`

**Filtrare și sortare costisitoare:**
\`\`\`jsx
function ListaProduse({ produse, cautare, sortBy }) {
  const produseVizibile = useMemo(() => {
    let rezultat = produse.filter(p =>
      p.nume.toLowerCase().includes(cautare.toLowerCase()) ||
      p.descriere.toLowerCase().includes(cautare.toLowerCase())
    );

    switch (sortBy) {
      case 'pret-asc': return rezultat.sort((a, b) => a.pret - b.pret);
      case 'pret-desc': return rezultat.sort((a, b) => b.pret - a.pret);
      case 'nume': return rezultat.sort((a, b) => a.nume.localeCompare(b.nume));
      default: return rezultat;
    }
  }, [produse, cautare, sortBy]);

  return (
    <ul>
      {produseVizibile.map(p => <ProdusCard key={p.id} produs={p} />)}
    </ul>
  );
}
\`\`\`

**Stabilizare referință pentru referential equality:**
\`\`\`jsx
function Componenta({ config }) {
  // config e recreat la fiecare render → cauzează re-render la copil cu memo
  const configStabil = useMemo(() => ({
    endpoint: '/api/data',
    timeout: 5000,
    ...config
  }), [config]);

  return <ChildCuMemo config={configStabil} />;
}
\`\`\`

**Regula de bază:** Nu optimiza prematur. Măsoară mai întâi cu React DevTools Profiler. useMemo are și el un cost (overhead) — folosește-l doar unde e nevoie demonstrată.`
  },
  {
    lessonContains: "Performance: memo",
    titleContains: "useCallback",
    content: `**useCallback** memorizează o funcție — returnează aceeași referință de funcție între randări, atât timp cât dependențele nu se schimbă.

**De ce referința funcției contează:**
\`\`\`jsx
function Parent() {
  const [count, setCount] = useState(0);

  // ❌ handleClick e recreat la fiecare render → referință nouă
  const handleClick = () => console.log('click');

  // ✅ Aceeași referință dacă nu se schimbă dependențele
  const handleClickStabil = useCallback(() => {
    console.log('click');
  }, []); // Fără dependențe → funcție creată o singură dată

  return (
    <div>
      <button onClick={() => setCount(c => c+1)}>Parent +1</button>
      {/* Fără useCallback → ButonaChild se re-randează la orice update din Parent */}
      <ButonaChild onClick={handleClickStabil} />
    </div>
  );
}

const ButonaChild = React.memo(({ onClick }) => {
  console.log('Render ButonaChild');
  return <button onClick={onClick}>Click</button>;
});
\`\`\`

**useCallback cu dependențe:**
\`\`\`jsx
function ListaEditabila({ items, onSave }) {
  const [editId, setEditId] = useState(null);

  // Recreat doar când onSave se schimbă
  const handleSave = useCallback((id, newValue) => {
    onSave(id, newValue);
    setEditId(null);
  }, [onSave]);

  // Recreat când editId se schimbă (folosit în closure)
  const handleCancel = useCallback(() => {
    setEditId(null);
  }, []); // editId NU e în deps — folosim setter funcțional în interior

  return (
    <ul>
      {items.map(item => (
        <EditableItem
          key={item.id}
          item={item}
          isEditing={editId === item.id}
          onEdit={() => setEditId(item.id)}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      ))}
    </ul>
  );
}
\`\`\`

**useCallback în custom hooks:**
\`\`\`jsx
function useApi(endpoint) {
  const [data, setData] = useState(null);

  // Funcția stabilă — nu se recreează la fiecare render al componentei care folosește hook-ul
  const fetch_data = useCallback(async () => {
    const res = await fetch(endpoint);
    setData(await res.json());
  }, [endpoint]);

  useEffect(() => { fetch_data(); }, [fetch_data]);

  return { data, refetch: fetch_data };
}
\`\`\``
  },
  {
    lessonContains: "Performance: memo",
    titleContains: "Reguli pragmatice",
    content: `**Regulile pragmatice de optimizare React** — când și cum să folosești memo, useMemo, useCallback fără să over-engineerezi.

**Principiu #1: Nu optimiza prematur**
\`\`\`jsx
// ❌ Over-optimizat fără motiv
function SimplButton({ onClick, label }) {
  const handleClick = useCallback(onClick, [onClick]);
  return <button onClick={handleClick}>{label}</button>;
}
// Un buton simplu nu are nevoie de useCallback

// ✅ Simplu și direct
function SimpleButton({ onClick, label }) {
  return <button onClick={onClick}>{label}</button>;
}
\`\`\`

**Principiu #2: Măsoară mai întâi**
\`\`\`
React DevTools → Profiler → Record → Interacționează → Stop
→ Identifică componentele care durează cel mai mult
→ Optimizează DOAR acele componente
\`\`\`

**Principiu #3: Ierarhia optimizărilor**
1. **Mută state-ul jos** (colocate state) — cel mai ieftin
2. **Memoizare** (memo, useMemo, useCallback) — overhead
3. **Code splitting** (lazy/Suspense) — pentru bundle size
4. **Virtualizare** (react-window) — pentru liste mari

**Colocate state — cea mai bună optimizare:**
\`\`\`jsx
// ❌ State prea sus — re-randează tot la typing
function App() {
  const [search, setSearch] = useState('');
  return (
    <div>
      <SearchBox value={search} onChange={setSearch} />
      <ExpensiveList />  {/* Se re-randează la orice tastă! */}
      <Sidebar />
    </div>
  );
}

// ✅ State mutat în componenta care îl folosește
function App() {
  return (
    <div>
      <SearchSection />  {/* State izolat în SearchSection */}
      <ExpensiveList />  {/* Nu se mai re-randează! */}
      <Sidebar />
    </div>
  );
}

function SearchSection() {
  const [search, setSearch] = useState(''); // State local
  return <SearchBox value={search} onChange={setSearch} />;
}
\`\`\`

**Când memo/useCallback CHIAR ajută:**
\`\`\`jsx
// Listă mare cu filtrare complexă
const produseFiltr = useMemo(() =>
  produse.filter(/* logică complexă */).sort(/* sortare */),
  [produse, filtru, sortBy]
); // ✅ Merită pentru liste de 1000+ items

// Callback stabil pasate la componente memoizate
const onDelete = useCallback((id) => dispatch({ type: 'DELETE', id }), [dispatch]);
// ✅ Merită dacă onDelete e pasată unui React.memo() child
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
