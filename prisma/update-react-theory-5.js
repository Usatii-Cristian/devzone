"use strict";
require("dotenv").config({ path: ".env" });
const { PrismaClient } = require("@prisma/client");
const p = new PrismaClient();

const UPDATES = [
  {
    lessonContains: "Virtualization",
    titleContains: "Problema listelor mari",
    content: `**Virtualizarea** (windowing) rezolvă problema performanței la liste de sute sau mii de elemente — în loc să randeze TOATE elementele în DOM, randează doar cele **vizibile în viewport**.

**Problema:**
\`\`\`jsx
// ❌ 10.000 de elemente în DOM simultan
function ListaMare({ items }) {
  return (
    <ul>
      {items.map(item => <ItemComplex key={item.id} item={item} />)}
    </ul>
  );
}
// Probleme: scroll lent, memorie multă, render inițial lent
\`\`\`

**react-window — virtualizare de bază:**
\`\`\`bash
npm install react-window
\`\`\`

\`\`\`jsx
import { FixedSizeList } from 'react-window';

// Funcție de render pentru un singur rând
const Row = ({ index, style }) => (
  <div style={style} className="row">
    {/* style TREBUIE aplicat — conține pozitia și dimensiunea */}
    <span>Item {index + 1}</span>
  </div>
);

function VirtualizedList({ items }) {
  return (
    <FixedSizeList
      height={600}       // Înălțimea containerului (px)
      itemCount={items.length}
      itemSize={50}      // Înălțimea fixă a fiecărui item (px)
      width="100%"
    >
      {Row}
    </FixedSizeList>
  );
}
\`\`\`

**VariableSizeList — înălțime variabilă:**
\`\`\`jsx
import { VariableSizeList } from 'react-window';

// Funcție care returnează înălțimea pentru fiecare index
const getItemSize = (index) => items[index].isExpanded ? 120 : 50;

function ListaVariabila({ items }) {
  return (
    <VariableSizeList
      height={600}
      itemCount={items.length}
      itemSize={getItemSize}
      width="100%"
    >
      {({ index, style }) => (
        <div style={style}>
          <ItemCard item={items[index]} />
        </div>
      )}
    </VariableSizeList>
  );
}
\`\`\`

**Grid virtualizat:**
\`\`\`jsx
import { FixedSizeGrid } from 'react-window';

function ProduseGrid({ produse }) {
  const COLS = 4;

  return (
    <FixedSizeGrid
      columnCount={COLS}
      columnWidth={250}
      rowCount={Math.ceil(produse.length / COLS)}
      rowHeight={300}
      height={600}
      width={1000}
    >
      {({ rowIndex, columnIndex, style }) => {
        const index = rowIndex * COLS + columnIndex;
        if (index >= produse.length) return null;
        return (
          <div style={style}>
            <ProdusCard produs={produse[index]} />
          </div>
        );
      }}
    </FixedSizeGrid>
  );
}
\`\`\`

**Beneficii**: render inițial rapid, scroll fluid, memorie constantă indiferent de numărul total de items.`
  },
  {
    lessonContains: "Virtualization",
    titleContains: "Alte soluții",
    content: `**Alte soluții pentru liste mari** — react-virtual (TanStack Virtual), Intersection Observer pentru infinite scroll, și paginare server-side.

**TanStack Virtual — mai flexibil decât react-window:**
\`\`\`bash
npm install @tanstack/react-virtual
\`\`\`

\`\`\`jsx
import { useVirtualizer } from '@tanstack/react-virtual';
import { useRef } from 'react';

function VirtualList({ items }) {
  const parentRef = useRef(null);

  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 50,
    overscan: 10  // Randează 10 items extra înainte/după viewport
  });

  return (
    <div
      ref={parentRef}
      style={{ height: '600px', overflow: 'auto' }}
    >
      {/* Container cu înălțimea totală — permite scroll nativ */}
      <div style={{ height: \`\${virtualizer.getTotalSize()}px\`, position: 'relative' }}>
        {virtualizer.getVirtualItems().map(virtualRow => (
          <div
            key={virtualRow.key}
            data-index={virtualRow.index}
            style={{
              position: 'absolute',
              top: 0,
              transform: \`translateY(\${virtualRow.start}px)\`,
              width: '100%'
            }}
          >
            <ItemRow item={items[virtualRow.index]} />
          </div>
        ))}
      </div>
    </div>
  );
}
\`\`\`

**Infinite scroll cu Intersection Observer:**
\`\`\`jsx
function InfiniteList() {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && hasMore) {
        setPage(p => p + 1);
      }
    }, { threshold: 0.1 });

    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [hasMore]);

  useEffect(() => {
    fetch(\`/api/items?page=\${page}\`)
      .then(r => r.json())
      .then(data => {
        setItems(prev => [...prev, ...data.items]);
        setHasMore(data.hasMore);
      });
  }, [page]);

  return (
    <ul>
      {items.map(item => <li key={item.id}>{item.name}</li>)}
      <li ref={loaderRef}>{hasMore ? 'Se încarcă...' : 'Lista completă'}</li>
    </ul>
  );
}
\`\`\`

**Paginare server-side** (când setul de date e enorm):
\`\`\`jsx
// React Query cu paginare
const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
  queryKey: ['items'],
  queryFn: ({ pageParam = 1 }) => fetch(\`/api/items?page=\${pageParam}\`).then(r => r.json()),
  getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined
});
\`\`\``
  },
  {
    lessonContains: "Animații",
    titleContains: "Animații declarative",
    content: `**Framer Motion** este biblioteca de animații pentru React — API declarativ, smooth, fizică bazată pe spring, și animații de layout.

**Instalare:**
\`\`\`bash
npm install framer-motion
\`\`\`

**motion — componente animate:**
\`\`\`jsx
import { motion } from 'framer-motion';

// motion.div = <div> cu supraputeri de animație
function Card({ title }) {
  return (
    <motion.div
      // Stare inițială
      initial={{ opacity: 0, y: 20 }}
      // Starea animată
      animate={{ opacity: 1, y: 0 }}
      // Configurare tranziție
      transition={{ duration: 0.3, ease: 'easeOut' }}
      // Animație la hover
      whileHover={{ scale: 1.05, shadow: 'lg' }}
      // Animație la apăsare
      whileTap={{ scale: 0.95 }}
      className="card"
    >
      {title}
    </motion.div>
  );
}
\`\`\`

**Variante — animații coordonate:**
\`\`\`jsx
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1  // Fiecare copil cu 0.1s delay față de precedentul
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 }
};

function AnimatedList({ items }) {
  return (
    <motion.ul
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {items.map(item => (
        <motion.li key={item.id} variants={itemVariants}>
          {item.name}
        </motion.li>
      ))}
    </motion.ul>
  );
}
\`\`\`

**Spring physics:**
\`\`\`jsx
<motion.div
  animate={{ x: 100 }}
  transition={{
    type: 'spring',  // Fizică de arc
    stiffness: 100,  // Rigiditate (mai mare = mai rapid)
    damping: 10,     // Amortizare (mai mic = mai elastic)
    mass: 1          // Masă
  }}
/>

// Sau un preset simplu
<motion.div
  animate={{ x: 100 }}
  transition={{ type: 'spring', bounce: 0.4 }}
/>
\`\`\`

**Gesture-based animations:**
\`\`\`jsx
function DraggableCard() {
  return (
    <motion.div
      drag               // Activează drag
      dragConstraints={{ left: -100, right: 100, top: -50, bottom: 50 }}
      dragElastic={0.2}  // Elasticitate la marginile constraints
      whileDrag={{ scale: 1.1, cursor: 'grabbing' }}
      className="card"
    >
      Trage-mă!
    </motion.div>
  );
}
\`\`\``
  },
  {
    lessonContains: "Animații",
    titleContains: "AnimatePresence",
    content: `**AnimatePresence** permite animarea componentelor la mount și unmount — esențial pentru tranziții de pagini, modal-uri, notificări și liste cu elemente adăugate/eliminate.

**AnimatePresence de bază:**
\`\`\`jsx
import { AnimatePresence, motion } from 'framer-motion';

// FĂRĂ AnimatePresence — elementele dispar instant la unmount
// CU AnimatePresence — exit animation înainte de unmount

function Notificare({ isVisible, message }) {
  return (
    <AnimatePresence>
      {isVisible && (  // Condiție pentru mount/unmount
        <motion.div
          key="notificare"  // key obligatoriu în AnimatePresence
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}  // Animație de ieșire
          transition={{ duration: 0.3 }}
          className="toast"
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
\`\`\`

**Lista cu adăugare/ștergere animată:**
\`\`\`jsx
function TodoListAnimata() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Cumpărături' },
    { id: 2, text: 'Sport' }
  ]);

  const sterge = (id) => setTodos(prev => prev.filter(t => t.id !== id));

  return (
    <ul>
      <AnimatePresence initial={false}>  {/* initial=false: fără animație la prima randare */}
        {todos.map(todo => (
          <motion.li
            key={todo.id}
            layout                          // Layout animation — smooth reflow
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            {todo.text}
            <button onClick={() => sterge(todo.id)}>✗</button>
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  );
}
\`\`\`

**Tranziții de pagini cu React Router:**
\`\`\`jsx
import { useLocation } from 'react-router-dom';

function PageTransitions({ children }) {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">  {/* mode=wait: așteptă exit înainte de enter */}
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.25 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
\`\`\`

**Layout animations — pentru reflow smooth:**
\`\`\`jsx
// layout prop → animează automat schimbările de poziție/dimensiune
<motion.div layout className="card">
  {/* Card care se mărește/micșorează smooth */}
</motion.div>
\`\`\``
  },
  {
    lessonContains: "Mini proiect",
    titleContains: "Structura proiectului",
    content: `**Arhitectura unui proiect React** — organizarea fișierelor, separarea responsabilităților și pattern-urile care fac un proiect scalabil.

**Structura recomandată pentru aplicații medii/mari:**
\`\`\`
src/
├── components/          # Componente reutilizabile (UI primitives)
│   ├── ui/              # Button, Input, Card, Modal, etc.
│   │   ├── Button/
│   │   │   ├── Button.jsx
│   │   │   ├── Button.test.jsx
│   │   │   └── Button.stories.jsx
│   │   └── index.js     # Re-exports
│   └── layout/          # Header, Footer, Sidebar, Layout
├── features/            # Module funcționale (feature-first)
│   ├── auth/
│   │   ├── components/  # LoginForm, RegisterForm
│   │   ├── hooks/       # useAuth
│   │   ├── api.js       # Fetch functions
│   │   └── store.js     # Zustand slice / Context
│   ├── products/
│   └── cart/
├── hooks/               # Custom hooks globale (useLocalStorage, useFetch)
├── contexts/            # React Contexts globale
├── lib/                 # Helpers, utils, constants
│   ├── api.js           # Axios/fetch config
│   ├── utils.js
│   └── constants.js
├── pages/               # Pagini (route level components)
│   ├── HomePage.jsx
│   ├── ProductPage.jsx
│   └── CheckoutPage.jsx
├── styles/              # CSS global, themes, variables
└── main.jsx             # Entry point
\`\`\`

**Convenții de import:**
\`\`\`javascript
// Absolute imports — evită ../../../
// vite.config.js
resolve: {
  alias: { '@': path.resolve(__dirname, 'src') }
}

// Utilizare
import { Button } from '@/components/ui';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { formatPrice } from '@/lib/utils';
\`\`\`

**Componente vs Features:**
\`\`\`
components/ = UI primitives, fără logică de business
  Button, Input, Card, Modal, Spinner, Badge

features/ = funcționalitate completă
  auth/ = tot ce ține de autentificare
  products/ = tot ce ține de produse
  cart/ = tot ce ține de coș
\`\`\`

**Regula de co-localizare:**
Pune lucrurile cât mai aproape de locul unde sunt folosite. Dacă o componentă e folosită doar în \`features/auth\`, nu o pune în \`components/\` global.`
  },
  {
    lessonContains: "Mini proiect",
    titleContains: "Hook custom",
    content: `**Hook custom + componente** pentru Todo App complet — demonstrează separarea logicii de UI, composabilitate și pattern-urile de producție.

**Hook useTodos — logica de business separată:**
\`\`\`jsx
// hooks/useTodos.js
import { useState, useMemo, useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';

export function useTodos() {
  const [todos, setTodos] = useLocalStorage('todos', []);
  const [filtru, setFiltru] = useState('toate');

  const adauga = useCallback((text) => {
    if (!text.trim()) return;
    setTodos(prev => [
      ...prev,
      { id: Date.now(), text: text.trim(), done: false, createdAt: new Date().toISOString() }
    ]);
  }, [setTodos]);

  const toggle = useCallback((id) => {
    setTodos(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));
  }, [setTodos]);

  const sterge = useCallback((id) => {
    setTodos(prev => prev.filter(t => t.id !== id));
  }, [setTodos]);

  const editeaza = useCallback((id, text) => {
    setTodos(prev => prev.map(t => t.id === id ? { ...t, text } : t));
  }, [setTodos]);

  const stergeTot = useCallback(() => {
    setTodos(prev => prev.filter(t => !t.done));
  }, [setTodos]);

  const todosVizibile = useMemo(() => {
    switch (filtru) {
      case 'active': return todos.filter(t => !t.done);
      case 'finalizate': return todos.filter(t => t.done);
      default: return todos;
    }
  }, [todos, filtru]);

  const stats = useMemo(() => ({
    total: todos.length,
    active: todos.filter(t => !t.done).length,
    done: todos.filter(t => t.done).length
  }), [todos]);

  return { todos: todosVizibile, stats, filtru, setFiltru, adauga, toggle, sterge, editeaza, stergeTot };
}
\`\`\`

**Componente UI:**
\`\`\`jsx
// components/TodoInput.jsx
function TodoInput({ onAdauga }) {
  const [input, setInput] = useState('');
  const submit = (e) => {
    e.preventDefault();
    onAdauga(input);
    setInput('');
  };
  return (
    <form onSubmit={submit}>
      <input value={input} onChange={e => setInput(e.target.value)}
        placeholder="Sarcină nouă..." />
      <button type="submit">Adaugă</button>
    </form>
  );
}

// components/TodoItem.jsx
const TodoItem = React.memo(({ todo, onToggle, onDelete, onEdit }) => {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(todo.text);
  const saveEdit = () => { onEdit(todo.id, text); setEditing(false); };
  return (
    <li className={todo.done ? 'done' : ''}>
      <input type="checkbox" checked={todo.done} onChange={() => onToggle(todo.id)} />
      {editing
        ? <input value={text} onChange={e => setText(e.target.value)}
            onBlur={saveEdit} onKeyDown={e => e.key === 'Enter' && saveEdit()} autoFocus />
        : <span onDoubleClick={() => setEditing(true)}>{todo.text}</span>
      }
      <button onClick={() => onDelete(todo.id)}>✗</button>
    </li>
  );
});

// App.jsx — pune totul împreună
function TodoApp() {
  const { todos, stats, filtru, setFiltru, adauga, toggle, sterge, editeaza, stergeTot } = useTodos();
  return (
    <div className="todo-app">
      <h1>Todo App ({stats.active} active)</h1>
      <TodoInput onAdauga={adauga} />
      <FiltreBar filtru={filtru} onChange={setFiltru} />
      <ul>{todos.map(t => <TodoItem key={t.id} todo={t} onToggle={toggle} onDelete={sterge} onEdit={editeaza} />)}</ul>
      {stats.done > 0 && <button onClick={stergeTot}>Șterge finalizate ({stats.done})</button>}
    </div>
  );
}
\`\`\``
  },
  {
    lessonContains: "React 19",
    titleContains: "Form Actions",
    content: `**Form Actions în React 19** — un nou mod de a gestiona submit-ul formularelor cu suport nativ pentru stări async, fără useState separat pentru loading.

**Conceptul Form Actions:**
React 19 introduce \`action\` prop pe \`<form>\` — o funcție async care primește \`FormData\` și e gestionată automat de React (pending state, erori, optimistic updates).

**Sintaxă de bază:**
\`\`\`jsx
// React 19 — form action
async function saveUser(formData) {
  'use server'; // Sau funct client-side
  const name = formData.get('name');
  const email = formData.get('email');
  await fetch('/api/users', {
    method: 'POST',
    body: JSON.stringify({ name, email }),
    headers: { 'Content-Type': 'application/json' }
  });
}

function UserForm() {
  return (
    <form action={saveUser}>
      <input name="name" placeholder="Nume" required />
      <input name="email" type="email" placeholder="Email" required />
      <button type="submit">Salvează</button>
      {/* React resetează form automat după succes */}
    </form>
  );
}
\`\`\`

**Form Actions cu useFormState (React 19+):**
\`\`\`jsx
import { useActionState } from 'react';

async function loginAction(prevState, formData) {
  const email = formData.get('email');
  const parola = formData.get('parola');

  try {
    const user = await authenticate(email, parola);
    return { success: true, user };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

function LoginForm() {
  const [state, action, isPending] = useActionState(loginAction, null);

  return (
    <form action={action}>
      {state?.error && <p className="error">{state.error}</p>}
      {state?.success && <p className="success">Autentificat cu succes!</p>}

      <input name="email" type="email" placeholder="Email" />
      <input name="parola" type="password" placeholder="Parolă" />

      <button type="submit" disabled={isPending}>
        {isPending ? 'Se autentifică...' : 'Autentificare'}
      </button>
    </form>
  );
}
\`\`\`

**Avantaje Form Actions:**
• **isPending automat** — nu mai ai nevoie de useState pentru loading
• **Reset automat** — formularul se resetează la succes (configurable)
• **Integrare SSR** — funcționează cu server actions în Next.js
• **Accesibilitate** — lucrează cu \`<button type="submit">\` nativ

**Compatibilitate:** React 19 (stabil din dec. 2024), Next.js 14+ App Router.`
  },
  {
    lessonContains: "React 19",
    titleContains: "useActionState",
    content: `**useActionState și useFormStatus** sunt hooks noi în React 19 care simplifică gestionarea formularelor cu acțiuni async.

**useActionState — stare acțiune:**
\`\`\`jsx
import { useActionState } from 'react';

// Semnătură: useActionState(action, initialState, permalink?)
// Returnează: [state, actionWrapped, isPending]

async function submitContact(prevState, formData) {
  const data = {
    nume: formData.get('nume'),
    email: formData.get('email'),
    mesaj: formData.get('mesaj')
  };

  // Validare
  if (!data.email.includes('@')) {
    return { error: 'Email invalid', values: data };
  }
  if (data.mesaj.length < 10) {
    return { error: 'Mesajul trebuie să aibă minim 10 caractere', values: data };
  }

  try {
    await sendEmail(data);
    return { success: true, message: 'Mesaj trimis cu succes!' };
  } catch {
    return { error: 'Trimitere eșuată. Încearcă din nou.', values: data };
  }
}

function ContactForm() {
  const [state, action, isPending] = useActionState(submitContact, null);

  return (
    <form action={action}>
      <div>
        <input name="nume" defaultValue={state?.values?.nume} placeholder="Numele tău" />
      </div>
      <div>
        <input name="email" type="email" defaultValue={state?.values?.email} />
      </div>
      <div>
        <textarea name="mesaj" defaultValue={state?.values?.mesaj} rows={4} />
      </div>

      {state?.error && <p className="alert-error">{state.error}</p>}
      {state?.success && <p className="alert-success">{state.message}</p>}

      <SubmitButton />
    </form>
  );
}
\`\`\`

**useFormStatus — stare form din copil:**
\`\`\`jsx
import { useFormStatus } from 'react-dom';

// useFormStatus funcționează NUMAI în componentele copil ale unui <form>
function SubmitButton() {
  const { pending, data, method, action } = useFormStatus();

  return (
    <button type="submit" disabled={pending}>
      {pending ? (
        <>
          <Spinner />
          Se trimite...
        </>
      ) : 'Trimite mesaj'}
    </button>
  );
}

// Utillizare — SubmitButton e copil al form-ului
function Formular() {
  const [state, action] = useActionState(myAction, null);
  return (
    <form action={action}>
      <input name="data" />
      <SubmitButton /> {/* Automat aware de pending state al form-ului */}
    </form>
  );
}
\`\`\`

**Beneficii vs pattern clasic:**
\`\`\`jsx
// ❌ Pattern vechi — mult boilerplate
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);
const handleSubmit = async (e) => {
  e.preventDefault(); setLoading(true);
  try { await submit(data); } catch(e) { setError(e.message); }
  setLoading(false);
};

// ✅ React 19 — concis, built-in
const [state, action, isPending] = useActionState(submitFn, null);
\`\`\``
  },
  {
    lessonContains: "React 19",
    titleContains: "useOptimistic",
    content: `**useOptimistic** permite actualizarea imediată a UI-ului înainte ca serverul să confirme operația — UI optimist care revine la starea anterioară dacă serverul returnează eroare.

**Conceptul Optimistic UI:**
\`\`\`
Normal:   Click → Request → Răspuns server → UI update   (lent, delay vizibil)
Optimist: Click → UI update IMEDIAT → Request → Confirmare server  (instant feel)
                                              ↘ Eroare → Rollback UI
\`\`\`

**useOptimistic — sintaxă React 19:**
\`\`\`jsx
import { useOptimistic, useActionState } from 'react';

function TodoList({ initialTodos }) {
  const [todos, setTodos] = useState(initialTodos);

  // useOptimistic(state, updateFn)
  // updateFn primește starea curentă și "optimistic value"
  const [optimisticTodos, addOptimisticTodo] = useOptimistic(
    todos,
    (currentTodos, newTodo) => [...currentTodos, newTodo]
  );

  const addTodo = async (formData) => {
    const text = formData.get('text');
    const tempTodo = { id: 'temp-' + Date.now(), text, done: false, pending: true };

    // Actualizare optimistă IMEDIATĂ — UI se schimbă instant
    addOptimisticTodo(tempTodo);

    try {
      const realTodo = await fetch('/api/todos', {
        method: 'POST',
        body: JSON.stringify({ text }),
        headers: { 'Content-Type': 'application/json' }
      }).then(r => r.json());

      // Actualizare cu datele reale de la server
      setTodos(prev => [...prev.filter(t => t.id !== tempTodo.id), realTodo]);
    } catch {
      // Eroare → optimisticTodos revine automat la starea anterioară
      toast.error('Adăugare eșuată');
      setTodos(prev => prev.filter(t => t.id !== tempTodo.id));
    }
  };

  return (
    <div>
      <form action={addTodo}>
        <input name="text" placeholder="Sarcină nouă..." />
        <button type="submit">Adaugă</button>
      </form>
      <ul>
        {optimisticTodos.map(todo => (
          <li key={todo.id} style={{ opacity: todo.pending ? 0.6 : 1 }}>
            {todo.text}
            {todo.pending && <span> (se salvează...)</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}
\`\`\`

**Toggle optimist (like/unlike):**
\`\`\`jsx
function LikeButton({ post }) {
  const [liked, setLiked] = useState(post.likedByUser);
  const [optimisticLiked, toggleOptimistic] = useOptimistic(
    liked,
    (current) => !current
  );

  const handleLike = async () => {
    toggleOptimistic(); // UI instant
    try {
      await fetch(\`/api/posts/\${post.id}/like\`, { method: liked ? 'DELETE' : 'POST' });
      setLiked(!liked); // Confirmare
    } catch {
      // useOptimistic revine automat
    }
  };

  return <button onClick={handleLike}>{optimisticLiked ? '❤️' : '🤍'}</button>;
}
\`\`\``
  },
  {
    lessonContains: "React 19",
    titleContains: "use() hook",
    content: `**Hook-ul use()** din React 19 permite "unwrapping" promiselor și contextelor direct în render — mai flexibil decât useContext sau Suspense individual.

**use() cu Context:**
\`\`\`jsx
import { use, createContext } from 'react';

const ThemeContext = createContext('light');

function ThemedButton() {
  // ✅ use() poate fi apelat condițional (spre deosebire de useContext)
  const theme = use(ThemeContext);
  return <button className={\`btn-\${theme}\`}>Click</button>;
}

// Comparație: useContext nu poate fi condițional
function OldWay({ show }) {
  if (!show) return null;
  const theme = useContext(ThemeContext); // ❌ Dacă apelat condițional
}

function NewWay({ show }) {
  if (!show) return null;
  const theme = use(ThemeContext); // ✅ use() poate fi condițional!
}
\`\`\`

**use() cu Promise — Suspense integration:**
\`\`\`jsx
import { use, Suspense } from 'react';

// Promise creat în afara componentei (sau pasată ca prop)
const userPromise = fetch('/api/user/1').then(r => r.json());

function UserCard() {
  // use() "suspendă" componenta până promise-ul se rezolvă
  const user = use(userPromise);

  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
}

// Trebuie înfășurat în Suspense
function App() {
  return (
    <Suspense fallback={<p>Încărcare user...</p>}>
      <UserCard />
    </Suspense>
  );
}
\`\`\`

**use() cu cache și Server Components:**
\`\`\`jsx
// Server Component — React 19 + Next.js
import { use, cache } from 'react';

// cache() = memoizare la nivel de request (deduplication)
const getUser = cache(async (id) => {
  return fetch(\`/api/users/\${id}\`).then(r => r.json());
});

// Pasează promise ca prop la Client Component
function ServerParent({ userId }) {
  const userPromise = getUser(userId); // Promise, nu await
  return (
    <Suspense fallback={<Skeleton />}>
      <ClientUserCard promise={userPromise} />
    </Suspense>
  );
}

// Client Component primește promise și folosește use()
'use client';
function ClientUserCard({ promise }) {
  const user = use(promise); // Suspends until resolved
  return <div>{user.name}</div>;
}
\`\`\`

**Diferențe față de async/await:**
• \`use(promise)\` poate fi apelat condițional
• Integrare nativă cu Suspense boundaries
• Re-randare automată când promise se rezolvă
• Nu blochează render-ul altor componente`
  },
  {
    lessonContains: "Server Components",
    titleContains: "RSC vs Client",
    content: `**React Server Components (RSC)** rulează exclusiv pe server — accesează baze de date, citesc fișiere, nu au bundle JS client, dar nu pot folosi state sau event handlers.

**Diferențe fundamentale:**

| Caracteristică | Server Components | Client Components |
|----------------|-------------------|-------------------|
| Rulare | Server (la request/build) | Browser (+ hidratare) |
| Bundle JS | ❌ Zero JS client | ✅ Inclus în bundle |
| State (useState) | ❌ Nu | ✅ Da |
| Event handlers | ❌ Nu | ✅ Da |
| Hooks | ❌ Nu | ✅ Da |
| Fetch direct DB | ✅ Da | ❌ Nu (securitate) |
| Accces filesystem | ✅ Da | ❌ Nu |
| Reactivitate | ❌ Nu | ✅ Da |

**Server Component — fetch direct:**
\`\`\`jsx
// app/users/page.jsx (Next.js App Router)
// Implicit Server Component — rulează pe server
async function UsersPage() {
  // ✅ Fetch direct, fără API route intermediară
  const users = await prisma.user.findMany({
    select: { id: true, name: true, email: true }
  });
  // Sau: const users = await fetch(..., { cache: 'no-store' }).then(r => r.json())

  return (
    <div>
      <h1>Utilizatori ({users.length})</h1>
      <ul>
        {users.map(u => (
          <li key={u.id}>
            {u.name} — {u.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UsersPage;
\`\`\`

**Client Component — \`'use client'\` directivă:**
\`\`\`jsx
'use client'; // Această directivă transformă componenta în client component

import { useState } from 'react';

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  return (
    <input
      value={query}
      onChange={(e) => { setQuery(e.target.value); onSearch(e.target.value); }}
      placeholder="Caută..."
    />
  );
}
\`\`\`

**Pattern optim — server și client împreună:**
\`\`\`jsx
// Server Component (parent)
async function ProductsPage() {
  const products = await getProducts(); // Server-side
  return (
    <div>
      <SearchBar /> {/* Client Component — interactiv */}
      <ProductGrid products={products} /> {/* Server Component — date */}
    </div>
  );
}
\`\`\``
  },
  {
    lessonContains: "Server Components",
    titleContains: "Serializarea",
    content: `**Serializarea props** și granița server/client — regulile privind ce date pot fi pasate de la Server Components la Client Components.

**Granița server/client:**
\`\`\`
Server         →      [Granita]      →      Client
DB, FS, Secrets       Serializare          useState, Events
Zero JS                                    Bundle JS
\`\`\`

**Ce props pot fi pasate:**
\`\`\`jsx
// ✅ Tipuri serializabile — pot traversa granița
<ClientComponent
  string="text"
  number={42}
  boolean={true}
  array={[1, 2, 3]}
  object={{ key: 'value' }}
  null={null}
  // Date convertite în string/number înainte de pasare
  date={date.toISOString()}   // ✅ string
/>

// ❌ Tipuri non-serializabile — NU pot traversa granița
<ClientComponent
  function={myFn}           // ❌ Funcțiile nu se serializează (excepție: Server Actions)
  map={new Map()}           // ❌ Map
  set={new Set()}           // ❌ Set
  undefined={undefined}    // ❌ undefined
  symbol={Symbol('x')}     // ❌ Symbol
/>
\`\`\`

**Server Actions — funcții speciale ce pot fi pasate:**
\`\`\`jsx
// actions.js (server)
'use server';

export async function deleteUser(id) {
  await prisma.user.delete({ where: { id } });
  revalidatePath('/users');
}

// Server Component
import { deleteUser } from './actions';

async function UserList() {
  const users = await getUsers();
  return (
    <ul>
      {users.map(u => (
        <li key={u.id}>
          {u.name}
          {/* deleteUser = Server Action — poate fi pasată! */}
          <DeleteButton action={deleteUser.bind(null, u.id)} />
        </li>
      ))}
    </ul>
  );
}

// Client Component primește Server Action
'use client';
function DeleteButton({ action }) {
  return (
    <form action={action}>
      <button type="submit">Șterge</button>
    </form>
  );
}
\`\`\`

**Interleaving — Server în Client (cu children/slot):**
\`\`\`jsx
// ✅ Server Component pasată ca children la Client Component
function ClientWrapper({ children }) { // Client Component
  return <div className="wrapper">{children}</div>;
}

async function Page() { // Server Component
  const data = await getData();
  return (
    <ClientWrapper>
      <ServerChild data={data} /> {/* Server Component în slot */}
    </ClientWrapper>
  );
}
\`\`\``
  },
  {
    lessonContains: "Server Components",
    titleContains: "Async Server Components",
    content: `**Async Server Components** permit await direct în body-ul componentei — cel mai simplu mod de a fetch date pe server fără useEffect sau state management.

**Patterns de fetch în Server Components:**
\`\`\`jsx
// app/blog/page.jsx — async component
async function BlogPage() {
  // Sequential fetches
  const posts = await getPosts();
  const categories = await getCategories();

  return (
    <div>
      <Sidebar categories={categories} />
      <PostList posts={posts} />
    </div>
  );
}

// Parallel fetch cu Promise.all — mai rapid
async function BlogPageOptimized() {
  // Pornesc ambele fetch-uri simultan
  const [posts, categories] = await Promise.all([
    getPosts(),
    getCategories()
  ]);

  return (
    <div>
      <Sidebar categories={categories} />
      <PostList posts={posts} />
    </div>
  );
}
\`\`\`

**Caching în Next.js App Router:**
\`\`\`jsx
// 'force-cache' = cache indefinit (default în Next.js)
const data = await fetch('/api/data', { cache: 'force-cache' });

// 'no-store' = fără cache, fiecare request fresh
const data = await fetch('/api/data', { cache: 'no-store' });

// Revalidate la interval
const data = await fetch('/api/data', { next: { revalidate: 3600 } }); // 1h

// Revalidate la tag-uri (manual invalidation)
const data = await fetch('/api/posts', { next: { tags: ['posts'] } });
// Invalidare: revalidateTag('posts')
\`\`\`

**Waterfall vs Parallel cu Suspense:**
\`\`\`jsx
// ❌ Waterfall — Profile se încarcă, APOI Posts
async function UserPage({ userId }) {
  const user = await getUser(userId);   // Aștept...
  const posts = await getPosts(userId); // Aștept...
  return <div><Profile user={user} /><Posts posts={posts} /></div>;
}

// ✅ Paralel cu Suspense
async function getUser(id) { /* ... */ }
async function getPosts(id) { /* ... */ }

// Componente separate care fetch independent
async function UserProfile({ userId }) {
  const user = await getUser(userId);
  return <Profile user={user} />;
}

async function UserPosts({ userId }) {
  const posts = await getPosts(userId);
  return <Posts posts={posts} />;
}

// Layout cu Suspense paralele
function UserPage({ userId }) {
  return (
    <>
      <Suspense fallback={<ProfileSkeleton />}>
        <UserProfile userId={userId} />
      </Suspense>
      <Suspense fallback={<PostsSkeleton />}>
        <UserPosts userId={userId} />
      </Suspense>
    </>
  );
}
\`\`\``
  },
  {
    lessonContains: "Zustand — State Management",
    titleContains: "Introducere Zustand",
    content: `**Zustand** — store minimal pentru React fără Provider, fără reducers, fără boilerplate. Ideal pentru proiecte care vor mai mult decât Context dar mai puțin decât Redux.

**De ce Zustand față de Context:**
| Aspect | Context API | Zustand |
|--------|-------------|---------|
| Provider necesar | ✅ Da | ❌ Nu |
| Re-renders | Toți consumatorii | Doar abonații la slice |
| DevTools | ❌ Manual | ✅ Built-in |
| Middleware | ❌ Nu | ✅ persist, immer, devtools |
| Bundle size | 0 (built-in) | ~1KB |
| Complexitate | Scăzută | Scăzută |

**Store complet cu tipuri:**
\`\`\`tsx
import { create } from 'zustand';

interface User { id: string; name: string; email: string; role: 'admin' | 'user' }
interface AuthStore {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
}

const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  token: null,
  isAuthenticated: false,

  login: async (email, password) => {
    const { user, token } = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' }
    }).then(r => r.json());

    set({ user, token, isAuthenticated: true });
    // Salvare token
    localStorage.setItem('token', token);
  },

  logout: () => {
    set({ user: null, token: null, isAuthenticated: false });
    localStorage.removeItem('token');
  },

  updateProfile: (data) => {
    set(state => ({
      user: state.user ? { ...state.user, ...data } : null
    }));
  }
}));

// Selectori — re-render DOAR când valoarea selectată se schimbă
function Header() {
  const user = useAuthStore(state => state.user);
  const logout = useAuthStore(state => state.logout);

  return (
    <header>
      {user ? (
        <>
          <span>Bun venit, {user.name}!</span>
          <button onClick={logout}>Deconectare</button>
        </>
      ) : <Link to="/login">Autentificare</Link>}
    </header>
  );
}
\`\`\``
  },
  {
    lessonContains: "Zustand — State Management",
    titleContains: "Slices",
    content: `**Slices** în Zustand permit organizarea unui store mare în module logice — fiecare slice gestionează o zonă de funcționalitate a aplicației.

**Pattern cu slices combinate:**
\`\`\`typescript
import { create } from 'zustand';
import { StateCreator } from 'zustand';

// Slice pentru produse
interface ProductsSlice {
  products: Product[];
  loading: boolean;
  fetchProducts: () => Promise<void>;
  setProducts: (products: Product[]) => void;
}

const createProductsSlice: StateCreator<
  ProductsSlice & CartSlice,
  [], [], ProductsSlice
> = (set, get) => ({
  products: [],
  loading: false,

  fetchProducts: async () => {
    set({ loading: true });
    const products = await fetch('/api/products').then(r => r.json());
    set({ products, loading: false });
  },

  setProducts: (products) => set({ products })
});

// Slice pentru coș
interface CartSlice {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  cartTotal: () => number;
}

const createCartSlice: StateCreator<
  ProductsSlice & CartSlice,
  [], [], CartSlice
> = (set, get) => ({
  cartItems: [],

  addToCart: (product) => set(state => {
    const existing = state.cartItems.find(i => i.id === product.id);
    if (existing) {
      return { cartItems: state.cartItems.map(i =>
        i.id === product.id ? { ...i, qty: i.qty + 1 } : i
      )};
    }
    return { cartItems: [...state.cartItems, { ...product, qty: 1 }] };
  }),

  removeFromCart: (id) => set(state => ({
    cartItems: state.cartItems.filter(i => i.id !== id)
  })),

  clearCart: () => set({ cartItems: [] }),

  cartTotal: () => get().cartItems.reduce((sum, i) => sum + i.price * i.qty, 0)
});

// Store combinat din slices
const useStore = create<ProductsSlice & CartSlice>()((...a) => ({
  ...createProductsSlice(...a),
  ...createCartSlice(...a)
}));

// Utilizare
function ProductCard({ product }) {
  const addToCart = useStore(state => state.addToCart);
  return (
    <div>
      <h3>{product.name}</h3>
      <button onClick={() => addToCart(product)}>Adaugă în coș</button>
    </div>
  );
}

function CartSummary() {
  const { cartItems, cartTotal, clearCart } = useStore(state => ({
    cartItems: state.cartItems,
    cartTotal: state.cartTotal,
    clearCart: state.clearCart
  }));

  return (
    <div>
      <p>{cartItems.length} produse — {cartTotal()} RON</p>
      <button onClick={clearCart}>Golește coșul</button>
    </div>
  );
}
\`\`\``
  },
  {
    lessonContains: "Zustand — State Management",
    titleContains: "persist",
    content: `**Middleware persist** în Zustand salvează automat state-ul în localStorage (sau sessionStorage, IndexedDB) și îl restaurează la refresh.

**Setup persist:**
\`\`\`typescript
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
}

const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => set(state => ({
        items: [...state.items, item]
      })),

      removeItem: (id) => set(state => ({
        items: state.items.filter(i => i.id !== id)
      })),

      clearCart: () => set({ items: [] })
    }),
    {
      name: 'cart-storage',  // Cheia în localStorage
      storage: createJSONStorage(() => localStorage),

      // Partialize — salvează NUMAI items, nu funcțiile
      partialize: (state) => ({ items: state.items }),

      // Versioning — pentru migrații
      version: 1,
      migrate: (persistedState, version) => {
        if (version === 0) {
          // Migrație de la v0 la v1
          return { ...persistedState, items: [] };
        }
        return persistedState;
      }
    }
  )
);
\`\`\`

**Persist cu sessionStorage:**
\`\`\`typescript
const useSessionStore = create()(
  persist(
    (set) => ({ token: null, setToken: (t) => set({ token: t }) }),
    {
      name: 'session',
      storage: createJSONStorage(() => sessionStorage) // Șters la închidere tab
    }
  )
);
\`\`\`

**Devtools middleware — debugging:**
\`\`\`typescript
import { devtools } from 'zustand/middleware';

const useStore = create<StoreType>()(
  devtools(
    persist(
      (set) => ({ /* store definition */ }),
      { name: 'my-store' }
    ),
    { name: 'MyApp Store' } // Nume în Redux DevTools
  )
);
// Middleware se combină de interior spre exterior:
// create(devtools(persist(immer(storeCreator))))
\`\`\`

**Immer middleware — mutații imutabile:**
\`\`\`typescript
import { immer } from 'zustand/middleware/immer';

const useStore = create<State>()(
  immer((set) => ({
    users: [],
    addUser: (user) => set(state => {
      state.users.push(user); // Mutare directă — immer face imutabilă
    }),
    updateUser: (id, updates) => set(state => {
      const user = state.users.find(u => u.id === id);
      if (user) Object.assign(user, updates);
    })
  }))
);
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
