"use strict";
require("dotenv").config({ path: ".env" });
const { PrismaClient } = require("@prisma/client");
const p = new PrismaClient();

const UPDATES = [
  {
    lessonContains: "useReducer",
    titleContains: "useReducer",
    content: `**useReducer** este o alternativă la useState pentru gestionarea **state-ului complex** cu tranziții bine definite — inspirat din pattern-ul Redux.

**Când să folosești useReducer în loc de useState:**
• State cu mai multe sub-valori interdependente
• Logica de actualizare e complexă (mai mult de 2-3 condiții)
• State-ul următor depinde de mai mulți factori din state-ul curent
• Vrei să extragi logica de business din componentă

**Structura unui reducer:**
\`\`\`jsx
import { useReducer } from 'react';

// Action types
const ACTIONS = {
  INCREMENT: 'INCREMENT',
  DECREMENT: 'DECREMENT',
  RESET: 'RESET',
  SET: 'SET'
};

// Reducer = funcție pură: (state, action) → newState
function counterReducer(state, action) {
  switch (action.type) {
    case ACTIONS.INCREMENT:
      return { ...state, count: state.count + (action.payload?.step || 1) };
    case ACTIONS.DECREMENT:
      return { ...state, count: Math.max(0, state.count - 1) };
    case ACTIONS.RESET:
      return { count: 0, history: [] };
    case ACTIONS.SET:
      return { ...state, count: action.payload };
    default:
      throw new Error(\`Unknown action: \${action.type}\`);
  }
}

// Utilizare
function Counter() {
  const [state, dispatch] = useReducer(counterReducer, { count: 0, history: [] });

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: ACTIONS.INCREMENT })}>+1</button>
      <button onClick={() => dispatch({ type: ACTIONS.INCREMENT, payload: { step: 5 } })}>+5</button>
      <button onClick={() => dispatch({ type: ACTIONS.DECREMENT })}>-1</button>
      <button onClick={() => dispatch({ type: ACTIONS.RESET })}>Reset</button>
    </div>
  );
}
\`\`\`

**Reducer pentru formular:**
\`\`\`jsx
const formReducer = (state, action) => {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value, errors: { ...state.errors, [action.field]: '' } };
    case 'SET_ERRORS':
      return { ...state, errors: action.errors };
    case 'SUBMIT_START':
      return { ...state, loading: true, errors: {} };
    case 'SUBMIT_SUCCESS':
      return { ...state, loading: false, submitted: true };
    case 'SUBMIT_ERROR':
      return { ...state, loading: false, errors: { general: action.error } };
    case 'RESET':
      return action.initialState;
    default:
      return state;
  }
};
\`\`\``
  },
  {
    lessonContains: "useReducer",
    titleContains: "payload",
    content: `**Payload și initializer** în useReducer extind flexibilitatea gestionării state-ului complex — payload permite transmiterea datelor în acțiuni, iar initializerul permite inițializare leneșă.

**Actions cu payload:**
\`\`\`jsx
// Action cu payload — date transmise odată cu acțiunea
function todoReducer(state, action) {
  switch (action.type) {
    case 'ADD_TODO':
      // action.payload = { id, text, priority }
      return {
        ...state,
        todos: [...state.todos, { ...action.payload, done: false }]
      };

    case 'TOGGLE_TODO':
      // action.payload = id
      return {
        ...state,
        todos: state.todos.map(t =>
          t.id === action.payload ? { ...t, done: !t.done } : t
        )
      };

    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter(t => t.id !== action.payload)
      };

    case 'UPDATE_TODO':
      // action.payload = { id, changes }
      return {
        ...state,
        todos: state.todos.map(t =>
          t.id === action.payload.id
            ? { ...t, ...action.payload.changes }
            : t
        )
      };

    case 'SET_FILTER':
      return { ...state, filter: action.payload };

    default:
      return state;
  }
}

// Dispatch cu payload
function TodoApp() {
  const [state, dispatch] = useReducer(todoReducer, {
    todos: [], filter: 'toate'
  });

  const adauga = (text) => dispatch({
    type: 'ADD_TODO',
    payload: { id: Date.now(), text, priority: 'normal' }
  });

  const actualizeaza = (id, changes) => dispatch({
    type: 'UPDATE_TODO',
    payload: { id, changes }
  });

  return (/* JSX */);
}
\`\`\`

**Initializer — inițializare leneșă:**
\`\`\`jsx
function initState(initialTodos) {
  // Rulează O SINGURĂ DATĂ — calcule costisitoare sau citire localStorage
  const savedTodos = localStorage.getItem('todos');
  return {
    todos: savedTodos ? JSON.parse(savedTodos) : initialTodos,
    filter: 'toate',
    loading: false
  };
}

// Al treilea argument al useReducer = funcție init
function App({ defaultTodos }) {
  const [state, dispatch] = useReducer(
    todoReducer,
    defaultTodos,  // Pasată ca argument la init
    initState      // initState(defaultTodos) e apelat o singură dată
  );
}
\`\`\`

**useReducer + useContext — mini Redux:**
\`\`\`jsx
const StoreContext = createContext(null);

function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);
  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
}

function useStore() { return useContext(StoreContext); }
\`\`\``
  },
  {
    lessonContains: "useRef",
    titleContains: "DOM",
    content: `**useRef** pentru acces direct la DOM permite manipularea elementelor HTML — focus, scroll, măsurători, integrarea cu biblioteci terțe.

**Acces DOM cu useRef:**
\`\`\`jsx
import { useRef, useEffect } from 'react';

function AutoFocusInput() {
  const inputRef = useRef(null);

  // Focus automat la mount
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <input
      ref={inputRef}
      type="text"
      placeholder="Focusat automat"
    />
  );
}
\`\`\`

**Cazuri de utilizare frecvente:**
\`\`\`jsx
function MediaPlayer() {
  const videoRef = useRef(null);

  const play = () => videoRef.current.play();
  const pause = () => videoRef.current.pause();
  const seek = (time) => { videoRef.current.currentTime = time; };
  const getDuration = () => videoRef.current.duration;

  return (
    <div>
      <video ref={videoRef} src="/video.mp4" />
      <button onClick={play}>▶ Play</button>
      <button onClick={pause}>⏸ Pause</button>
      <button onClick={() => seek(0)}>⏮ Restart</button>
    </div>
  );
}

// Scroll la element
function ChatFeed({ messages }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    // Scroll la ultimul mesaj când se adaugă unul nou
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="chat">
      {messages.map(m => <Message key={m.id} msg={m} />)}
      <div ref={bottomRef} /> {/* Marker invizibil la final */}
    </div>
  );
}

// Măsurare dimensiuni element
function ResponsiveChart() {
  const containerRef = useRef(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const observer = new ResizeObserver(entries => {
      setWidth(entries[0].contentRect.width);
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef}>
      <canvas width={width} height={width * 0.5} />
    </div>
  );
}
\`\`\`

**ref callback — pentru liste dinamice:**
\`\`\`jsx
function Lista({ items }) {
  const itemRefs = useRef({});

  const scrollToItem = (id) => {
    itemRefs.current[id]?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <ul>
      {items.map(item => (
        <li key={item.id} ref={el => itemRefs.current[item.id] = el}>
          {item.name}
        </li>
      ))}
    </ul>
  );
}
\`\`\``
  },
  {
    lessonContains: "useRef",
    titleContains: "mutabile",
    content: `**useRef pentru valori mutabile** permite stocarea datelor care trebuie să persiste între randări **fără a declanșa re-randare** — perfect pentru timere, IDs, valori anterioare.

**Caracteristici cheie:**
• \`ref.current\` poate fi modificat direct (nu declanșează re-render)
• Valoarea persistă între randări (spre deosebire de variabile locale)
• Modificarea \`ref.current\` este sincronă

**Timer cu useRef:**
\`\`\`jsx
function Stopwatch() {
  const [elapsed, setElapsed] = useState(0);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null); // Stochează ID-ul intervalului

  const start = () => {
    if (running) return;
    setRunning(true);
    intervalRef.current = setInterval(() => {
      setElapsed(prev => prev + 10);
    }, 10);
  };

  const stop = () => {
    setRunning(false);
    clearInterval(intervalRef.current);
  };

  const reset = () => {
    stop();
    setElapsed(0);
  };

  // Cleanup la unmount
  useEffect(() => () => clearInterval(intervalRef.current), []);

  const minutes = Math.floor(elapsed / 60000);
  const seconds = Math.floor((elapsed % 60000) / 1000);
  const ms = Math.floor((elapsed % 1000) / 10);

  return (
    <div>
      <p>{String(minutes).padStart(2,'0')}:{String(seconds).padStart(2,'0')}.{String(ms).padStart(2,'0')}</p>
      <button onClick={start} disabled={running}>Start</button>
      <button onClick={stop} disabled={!running}>Stop</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}
\`\`\`

**Valoarea anterioară:**
\`\`\`jsx
function usePreviousValue(value) {
  const prevRef = useRef(undefined);

  useEffect(() => {
    prevRef.current = value; // Actualizat DUPĂ render
  });

  return prevRef.current; // Valoarea din render-ul precedent
}

function Counter() {
  const [count, setCount] = useState(0);
  const prevCount = usePreviousValue(count);

  return (
    <p>
      Acum: {count}, Înainte: {prevCount ?? 'N/A'}
      {prevCount !== undefined && count > prevCount ? ' ↑' : ' ↓'}
    </p>
  );
}
\`\`\`

**Evitare buclă infinită în useEffect:**
\`\`\`jsx
function Componenta({ onCallback }) {
  // onCallback se schimbă la fiecare render al parent-ului
  // Dacă e în deps → buclă infinită
  const callbackRef = useRef(onCallback);

  // Actualizează ref la fiecare render — fără re-render
  useEffect(() => { callbackRef.current = onCallback; });

  useEffect(() => {
    const id = setInterval(() => callbackRef.current(), 1000);
    return () => clearInterval(id);
  }, []); // Deps goale — fără buclă
}
\`\`\``
  },
  {
    lessonContains: "React Router",
    titleContains: "Setup",
    content: `**React Router** este biblioteca standard pentru navigare în aplicații React. Permite crearea de aplicații Single Page Application (SPA) cu URL-uri și navigare fără reload complet.

**Instalare și setup de bază:**
\`\`\`bash
npm install react-router-dom
\`\`\`

\`\`\`jsx
// main.jsx — înfășoară App în BrowserRouter
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
\`\`\`

**Definire rute:**
\`\`\`jsx
import { Routes, Route, Link, NavLink } from 'react-router-dom';

// Pagini (componente)
function Acasa() { return <h1>Pagina principală</h1>; }
function Despre() { return <h1>Despre noi</h1>; }
function Contact() { return <h1>Contact</h1>; }
function NotFound() { return <h1>404 — Pagina nu există</h1>; }

function App() {
  return (
    <div>
      {/* Navigare */}
      <nav>
        <Link to="/">Acasă</Link>
        <NavLink to="/despre"
          className={({ isActive }) => isActive ? 'nav-activ' : ''}>
          Despre
        </NavLink>
        <Link to="/contact">Contact</Link>
      </nav>

      {/* Rute */}
      <Routes>
        <Route path="/" element={<Acasa />} />
        <Route path="/despre" element={<Despre />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/produse" element={<ListaProduse />} />
        <Route path="/produse/:id" element={<DetaliiProdus />} />
        <Route path="*" element={<NotFound />} /> {/* 404 */}
      </Routes>
    </div>
  );
}
\`\`\`

**Link vs NavLink vs <a>:**
\`\`\`jsx
// <a href> — reîncarcă pagina (nu folosi în React Router!)
<a href="/despre">Despre</a>  // ❌

// <Link> — navigare SPA fără reload
<Link to="/despre">Despre</Link>  // ✅

// <NavLink> — ca Link, dar adaugă clasă/stil când e activ
<NavLink
  to="/despre"
  className={({ isActive, isPending }) =>
    isActive ? 'link-activ' : isPending ? 'link-pending' : ''
  }
  style={({ isActive }) => ({ color: isActive ? 'blue' : 'inherit' })}
>
  Despre
</NavLink>  // ✅ Perfect pentru meniuri de navigare
\`\`\`

**Navigare programatică:**
\`\`\`jsx
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(credentials);
    navigate('/dashboard'); // Navigare după login
    // navigate(-1); // Înapoi în history
    // navigate('/404', { replace: true }); // Fără intrare în history
  };
}
\`\`\``
  },
  {
    lessonContains: "React Router",
    titleContains: "Params",
    content: `**URL Params** și **useNavigate** permit accesarea parametrilor din URL și navigarea programatică — esențiale pentru pagini de detalii, filtrare și flow-uri complexe.

**useParams — citire parametri din URL:**
\`\`\`jsx
import { useParams, useNavigate } from 'react-router-dom';

// Ruta: /produse/:categorie/:id
function DetaliiProdus() {
  const { categorie, id } = useParams(); // Extrage din URL
  const navigate = useNavigate();
  const [produs, setProdu] = useState(null);

  useEffect(() => {
    fetch(\`/api/produse/\${categorie}/\${id}\`)
      .then(r => r.json())
      .then(setProdu)
      .catch(() => navigate('/404', { replace: true }));
  }, [categorie, id, navigate]);

  if (!produs) return <p>Încărcare...</p>;

  return (
    <div>
      <button onClick={() => navigate(-1)}>← Înapoi</button>
      <h1>{produs.nume}</h1>
      <p>Categorie: {categorie}</p>
    </div>
  );
}
\`\`\`

**useSearchParams — query parameters:**
\`\`\`jsx
import { useSearchParams } from 'react-router-dom';

// URL: /produse?cautare=laptop&sortare=pret&pagina=2
function ListaProduse() {
  const [searchParams, setSearchParams] = useSearchParams();

  const cautare = searchParams.get('cautare') || '';
  const sortare = searchParams.get('sortare') || 'relevanta';
  const pagina = Number(searchParams.get('pagina')) || 1;

  const updateFiltru = (key, value) => {
    setSearchParams(prev => {
      prev.set(key, value);
      if (key !== 'pagina') prev.set('pagina', '1'); // Reset pagina la filtru nou
      return prev;
    });
  };

  return (
    <div>
      <input
        value={cautare}
        onChange={e => updateFiltru('cautare', e.target.value)}
        placeholder="Caută..."
      />
      <select value={sortare} onChange={e => updateFiltru('sortare', e.target.value)}>
        <option value="relevanta">Relevanță</option>
        <option value="pret-asc">Preț crescător</option>
        <option value="pret-desc">Preț descrescător</option>
      </select>
      {/* URL se actualizează automat, browsable/shareable */}
    </div>
  );
}
\`\`\`

**useLocation — stare și path curent:**
\`\`\`jsx
import { useLocation } from 'react-router-dom';

function Breadcrumb() {
  const location = useLocation();
  // location.pathname = '/produse/electronice/laptop-dell'
  // location.search = '?sortare=pret'
  // location.hash = '#descriere'
  // location.state = { from: '/acasa' } // state pasată prin navigate()

  const segments = location.pathname.split('/').filter(Boolean);
  return (
    <nav aria-label="breadcrumb">
      <Link to="/">Acasă</Link>
      {segments.map((seg, i) => (
        <span key={i}> / <Link to={'/' + segments.slice(0,i+1).join('/')}>{seg}</Link></span>
      ))}
    </nav>
  );
}
\`\`\``
  },
  {
    lessonContains: "React Router avansat",
    titleContains: "Nested routes",
    content: `**Nested routes** (rute imbricate) permit layouts complexe unde o parte din pagină rămâne fixă și alta se schimbă în funcție de ruta activă. **Outlet** marchează locul unde se randează ruta copil.

**Structura nested routes:**
\`\`\`jsx
import { Routes, Route, Outlet, NavLink } from 'react-router-dom';

// Layout pentru secțiunea de setări — meniu lateral persistent
function SetariLayout() {
  return (
    <div className="setari-layout">
      <aside>
        <nav>
          <NavLink to="/setari/profil">Profil</NavLink>
          <NavLink to="/setari/securitate">Securitate</NavLink>
          <NavLink to="/setari/notificari">Notificări</NavLink>
          <NavLink to="/setari/facturare">Facturare</NavLink>
        </nav>
      </aside>
      <main>
        <Outlet /> {/* Ruta copil se randează AICI */}
      </main>
    </div>
  );
}

// Pagini copil
function SetariProfil() { return <form>Editare profil...</form>; }
function SetariSecuritate() { return <form>Schimbare parolă...</form>; }

// Configurare rute
function App() {
  return (
    <Routes>
      <Route path="/" element={<Acasa />} />

      {/* Ruta parent cu layout */}
      <Route path="/setari" element={<SetariLayout />}>
        {/* Rute copil — randare în <Outlet> din SetariLayout */}
        <Route index element={<SetariProfil />} /> {/* /setari */}
        <Route path="profil" element={<SetariProfil />} />    {/* /setari/profil */}
        <Route path="securitate" element={<SetariSecuritate />} />
        <Route path="notificari" element={<SetariNotificari />} />
      </Route>

      {/* Dashboard cu nested routes */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<DashboardOverview />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="users" element={<Users />} />
        <Route path="users/:id" element={<UserDetail />} />
      </Route>
    </Routes>
  );
}
\`\`\`

**Layout global cu Outlet:**
\`\`\`jsx
function RootLayout() {
  return (
    <div>
      <Header />
      <Outlet /> {/* Conținutul paginii curente */}
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>  {/* Fără path = layout wrapper */}
        <Route path="/" element={<Acasa />} />
        <Route path="/despre" element={<Despre />} />
      </Route>
      <Route path="/login" element={<Login />} /> {/* Fără header/footer */}
    </Routes>
  );
}
\`\`\``
  },
  {
    lessonContains: "React Router avansat",
    titleContains: "Loaders",
    content: `**Data Router** (React Router 6.4+) introduce **loaders** pentru fetch de date înaintea randării componentei și **actions** pentru mutații — colocate cu rutele.

**createBrowserRouter cu loaders:**
\`\`\`jsx
import { createBrowserRouter, RouterProvider, useLoaderData, Form } from 'react-router-dom';

// Loader — rulează ÎNAINTE de randarea componentei
async function userLoader({ params }) {
  const response = await fetch(\`/api/users/\${params.id}\`);
  if (!response.ok) {
    throw new Response('User negăsit', { status: 404 });
  }
  return response.json(); // Datele disponibile în componentă
}

// Componenta primește date gata prin useLoaderData
function UserDetail() {
  const user = useLoaderData();
  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}

// Action — procesare formulare/mutații
async function updateUserAction({ request, params }) {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);

  const response = await fetch(\`/api/users/\${params.id}\`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates)
  });

  if (!response.ok) return { error: 'Salvare eșuată' };
  return { success: true };
}

// Configurare router
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <Acasa />, loader: acasaLoader },
      {
        path: 'users/:id',
        element: <UserDetail />,
        loader: userLoader,
        action: updateUserAction,
        errorElement: <ErrorBoundary />  // Error handling per-rută
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}
\`\`\`

**useNavigation — stare încărcare:**
\`\`\`jsx
import { useNavigation } from 'react-router-dom';

function GlobalLoadingIndicator() {
  const navigation = useNavigation();
  // navigation.state: 'idle' | 'loading' | 'submitting'
  return navigation.state !== 'idle'
    ? <div className="loading-bar" />
    : null;
}
\`\`\``
  },
  {
    lessonContains: "Lazy loading",
    titleContains: "lazy",
    content: `**Code splitting** cu \`React.lazy\` și \`Suspense\` permite încărcarea componentelor **la cerere** (on demand) — reducând dimensiunea bundle-ului inițial și accelerând încărcarea paginii.

**Problema bundle-ului mare:**
\`\`\`
Bundle normal: App.js = 500KB (toate paginile + biblioteci)
→ Utilizatorul descarcă 500KB chiar dacă vizitează doar pagina principală

Code splitting: App.js = 50KB + chunk-uri separate per pagină
→ Utilizatorul descarcă inițial 50KB, restul la cerere
\`\`\`

**React.lazy + Suspense:**
\`\`\`jsx
import { lazy, Suspense } from 'react';

// ❌ Import normal — toate paginile în bundle inițial
import Dashboard from './pages/Dashboard';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';

// ✅ Import leneș — chunk separat pentru fiecare pagină
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Analytics = lazy(() => import('./pages/Analytics'));
const Settings = lazy(() => import('./pages/Settings'));

function App() {
  return (
    <Router>
      {/* Suspense necesar — afișat timp de încărcare */}
      <Suspense fallback={<div className="page-loader">Se încarcă...</div>}>
        <Routes>
          <Route path="/" element={<Acasa />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Suspense>
    </Router>
  );
}
\`\`\`

**Fallback personalizat:**
\`\`\`jsx
function PageLoader() {
  return (
    <div className="page-loader">
      <div className="spinner" />
      <p>Se încarcă pagina...</p>
    </div>
  );
}

function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Suspense>
  );
}
\`\`\`

**Preloading — preîncarcă la hover:**
\`\`\`jsx
const Dashboard = lazy(() => import('./pages/Dashboard'));

// Preloading — triggerează import() la hover înainte de click
function NavMenu() {
  const preloadDashboard = () => import('./pages/Dashboard');

  return (
    <Link to="/dashboard" onMouseEnter={preloadDashboard}>
      Dashboard
    </Link>
  );
}
\`\`\`

**Named exports cu lazy:**
\`\`\`jsx
// lazy() necesită default export
// Dacă ai named export, fă un re-export
const Modal = lazy(() =>
  import('./components/Modal').then(module => ({
    default: module.Modal
  }))
);
\`\`\``
  },
  {
    lessonContains: "Lazy loading",
    titleContains: "Suspense",
    content: `**Suspense pentru data fetching** permite componentelor să "aștepte" date înainte de a se randa, cu o stare de loading elegantă. Combinat cu React Query sau RSC pentru cele mai bune rezultate.

**Cum funcționează Suspense:**
\`\`\`jsx
// React 18 — Suspense boundary prinde componentele "suspendate"
import { Suspense } from 'react';

function App() {
  return (
    <Suspense fallback={<Spinner />}>
      <ComponentaCareFetcheazaDate />
    </Suspense>
  );
}
\`\`\`

**Suspense cu React Query:**
\`\`\`jsx
import { useSuspenseQuery } from '@tanstack/react-query';

// useSuspenseQuery "suspendă" componenta până datele sunt disponibile
function UserProfile({ userId }) {
  const { data: user } = useSuspenseQuery({
    queryKey: ['user', userId],
    queryFn: () => fetch(\`/api/users/\${userId}\`).then(r => r.json())
  });

  // Nicio verificare loading/error necesară! Suspense + ErrorBoundary gestionează
  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.bio}</p>
    </div>
  );
}

// Wrapper cu Suspense + ErrorBoundary
function UserPage({ userId }) {
  return (
    <ErrorBoundary fallback={<p>Eroare la încărcare</p>}>
      <Suspense fallback={<UserSkeleton />}>
        <UserProfile userId={userId} />
      </Suspense>
    </ErrorBoundary>
  );
}
\`\`\`

**Suspense multiple — waterfall vs parallel:**
\`\`\`jsx
// ❌ Waterfall — Profile se încarcă, APOI Posts
function UserPage() {
  return (
    <Suspense fallback={<Spinner />}>
      <UserProfile /> {/* Se încarcă primul */}
      <Suspense fallback={<Spinner />}>
        <UserPosts /> {/* Se încarcă după Profile */}
      </Suspense>
    </Suspense>
  );
}

// ✅ Paralel — ambele se încarcă simultan
function UserPage() {
  return (
    <>
      <Suspense fallback={<ProfileSkeleton />}>
        <UserProfile />
      </Suspense>
      <Suspense fallback={<PostsSkeleton />}>
        <UserPosts />
      </Suspense>
    </>
  );
}
\`\`\`

**Skeleton screens:**
\`\`\`jsx
function CardSkeleton() {
  return (
    <div className="card skeleton">
      <div className="skeleton-avatar" />
      <div className="skeleton-text skeleton-text--wide" />
      <div className="skeleton-text" />
    </div>
  );
}
\`\`\``
  },
  {
    lessonContains: "Error Boundaries",
    titleContains: "Class-based",
    content: `**Error Boundaries** sunt componente de clasă care prind erorile JavaScript din sub-arborele lor și afișează un UI de fallback în loc să strice întreaga aplicație.

**Problema fără Error Boundaries:**
\`\`\`jsx
// O eroare necaptată în oricare componentă copil => ecran alb (crash complet)
function Componenta({ data }) {
  return <p>{data.nested.value}</p>; // TypeError dacă data.nested e undefined
}
\`\`\`

**Implementare Error Boundary:**
\`\`\`jsx
import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  // Rulează la prinderea erorii — actualizează state pentru fallback UI
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  // Logare eroare (ex: Sentry, Datadog)
  componentDidCatch(error, errorInfo) {
    console.error('Error Boundary caught:', error, errorInfo);
    // logErrorToService(error, errorInfo.componentStack);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="error-container">
          <h2>Ceva a mers greșit</h2>
          <p>{this.state.error?.message}</p>
          <button onClick={() => this.setState({ hasError: false, error: null })}>
            Încearcă din nou
          </button>
          {process.env.NODE_ENV === 'development' && (
            <details>
              <summary>Stack trace</summary>
              <pre>{this.state.errorInfo?.componentStack}</pre>
            </details>
          )}
        </div>
      );
    }
    return this.props.children;
  }
}
\`\`\`

**Utilizare:**
\`\`\`jsx
function App() {
  return (
    <ErrorBoundary>
      <Header />
      <ErrorBoundary fallback={<p>Eroare în sidebar</p>}>
        <Sidebar /> {/* Eroarea izolată — nu afectează restul */}
      </ErrorBoundary>
      <ErrorBoundary fallback={<p>Nu am putut încărca conținutul</p>}>
        <MainContent />
      </ErrorBoundary>
    </ErrorBoundary>
  );
}
\`\`\`

**Limitări:**
• Nu prinde erori în **event handlers** (folosește try/catch)
• Nu prinde erori în **cod asincron** (Promise, setTimeout)
• Nu prinde erori în **server-side rendering**
• Nu prinde erori în **ErrorBoundary însuși**

Biblioteca **react-error-boundary** oferă soluții mai ergonomice:
\`\`\`bash
npm install react-error-boundary
\`\`\``
  },
  {
    lessonContains: "Error Boundaries",
    titleContains: "Limitări",
    content: `**Limitările Error Boundaries** și soluțiile alternative — event handlers, cod asincron și biblioteca react-error-boundary.

**Erori în event handlers — try/catch:**
\`\`\`jsx
// Error Boundaries NU prind erori din event handlers
function Buton() {
  const handleClick = () => {
    // Aceasta NU va fi prinsă de ErrorBoundary
    throw new Error('Eroare în handler');
  };

  // ✅ Folosește try/catch în handlers
  const handleClickSafe = async () => {
    try {
      await apiCall();
    } catch (error) {
      setError(error.message); // State local de eroare
    }
  };

  return <button onClick={handleClickSafe}>Click</button>;
}
\`\`\`

**Erori asincrone — pattern cu useState:**
\`\`\`jsx
function ComponentaAsincrona() {
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const data = await fetch('/api/data').then(r => {
        if (!r.ok) throw new Error('HTTP Error');
        return r.json();
      });
      setData(data);
    } catch (err) {
      setError(err);
    }
  };

  if (error) return <ErrorDisplay error={error} onRetry={fetchData} />;
  return <DataDisplay />;
}
\`\`\`

**react-error-boundary — API modern:**
\`\`\`jsx
import { ErrorBoundary, useErrorBoundary } from 'react-error-boundary';

// Fallback component cu reset
function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert">
      <p>Eroare: {error.message}</p>
      <button onClick={resetErrorBoundary}>Încearcă din nou</button>
    </div>
  );
}

// Utilizare cu prop fallbackRender
<ErrorBoundary
  fallbackRender={ErrorFallback}
  onReset={() => { /* resetare state dacă e necesar */ }}
  onError={(error, info) => logError(error, info)}
>
  <ComponentaRiscanta />
</ErrorBoundary>

// Reset programatic din interiorul copilului
function ChildComponent() {
  const { showBoundary } = useErrorBoundary();

  const handleAsyncError = async () => {
    try {
      await riskyOperation();
    } catch (error) {
      showBoundary(error); // Declanșează Error Boundary
    }
  };
}
\`\`\`

**Resetare la schimbarea rutei:**
\`\`\`jsx
import { useLocation } from 'react-router-dom';

function App() {
  const location = useLocation();
  return (
    <ErrorBoundary
      key={location.pathname} // Reset automat la navigare
      fallbackRender={ErrorFallback}
    >
      <Routes>...</Routes>
    </ErrorBoundary>
  );
}
\`\`\``
  },
  {
    lessonContains: "Portals",
    titleContains: "createPortal",
    content: `**Portals** permit randarea unui copil DOM în afara ierarhiei DOM a componentei parent, în orice nod DOM din pagină — fără a rupe ierarhia componentelor React.

**Problema pe care o rezolvă Portals:**
\`\`\`jsx
// Fără portal — modal-ul e "prins" în CSS-ul parent-ului
// overflow:hidden, z-index, transform pe parent afectează modalul
function Parent() {
  return (
    <div style={{ overflow: 'hidden', position: 'relative' }}>
      <Modal /> {/* Tăiat de overflow:hidden! */}
    </div>
  );
}

// Cu portal — modal-ul e randat în document.body
// Scapă de orice CSS al parent-ului
\`\`\`

**Implementare createPortal:**
\`\`\`jsx
import { createPortal } from 'react-dom';

function Modal({ isOpen, onClose, children, title }) {
  if (!isOpen) return null;

  return createPortal(
    // JSX de randat
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{title}</h2>
          <button onClick={onClose} aria-label="Închide">&times;</button>
        </div>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>,
    // Nodul DOM țintă
    document.getElementById('modal-root') // sau document.body
  );
}

// Utilizare — modal-ul apare în #modal-root, nu în .container
function App() {
  const [modalDeschis, setModalDeschis] = useState(false);

  return (
    <div className="container" style={{ overflow: 'hidden' }}>
      <button onClick={() => setModalDeschis(true)}>Deschide Modal</button>
      <Modal
        isOpen={modalDeschis}
        onClose={() => setModalDeschis(false)}
        title="Confirmare"
      >
        <p>Ești sigur că vrei să continui?</p>
        <button onClick={() => setModalDeschis(false)}>Anulează</button>
        <button onClick={handleConfirm}>Confirmă</button>
      </Modal>
    </div>
  );
}
\`\`\`

**HTML necesar:**
\`\`\`html
<!-- index.html -->
<body>
  <div id="root"></div>
  <div id="modal-root"></div>  <!-- Portal target -->
  <div id="toast-root"></div>  <!-- Alt portal target -->
</body>
\`\`\``
  },
  {
    lessonContains: "Portals",
    titleContains: "Cazuri tipice",
    content: `**Cazurile de utilizare tipice pentru Portals** includ modaluri, tooltips, dropdown-uri, notificări toast și drawer-e — orice UI care trebuie să "iasă" din container-ul curent.

**Tooltip cu Portal:**
\`\`\`jsx
import { createPortal } from 'react-dom';
import { useState, useRef, useLayoutEffect } from 'react';

function Tooltip({ children, text }) {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const triggerRef = useRef(null);

  const showTooltip = () => {
    const rect = triggerRef.current.getBoundingClientRect();
    setPosition({
      top: rect.top - 40 + window.scrollY,
      left: rect.left + rect.width / 2 + window.scrollX
    });
    setVisible(true);
  };

  return (
    <>
      <span
        ref={triggerRef}
        onMouseEnter={showTooltip}
        onMouseLeave={() => setVisible(false)}
      >
        {children}
      </span>
      {visible && createPortal(
        <div
          className="tooltip"
          style={{ position: 'absolute', top: position.top, left: position.left }}
        >
          {text}
        </div>,
        document.body
      )}
    </>
  );
}

// Utilizare
<Tooltip text="Informații suplimentare">
  <button>Hover</button>
</Tooltip>
\`\`\`

**Toast notifications cu Portal:**
\`\`\`jsx
import { useState, createContext, useContext } from 'react';
import { createPortal } from 'react-dom';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'info', duration = 3000) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), duration);
  };

  return (
    <ToastContext.Provider value={addToast}>
      {children}
      {createPortal(
        <div className="toast-container">
          {toasts.map(toast => (
            <div key={toast.id} className={\`toast toast--\${toast.type}\`}>
              {toast.message}
            </div>
          ))}
        </div>,
        document.getElementById('toast-root')
      )}
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);

// Utilizare oriunde în aplicație
function Componenta() {
  const toast = useToast();
  return (
    <button onClick={() => toast('Salvat cu succes!', 'success')}>
      Salvează
    </button>
  );
}
\`\`\``
  },
  {
    lessonContains: "forwardRef",
    titleContains: "forwardRef",
    content: `**forwardRef** permite componentelor să transmită mai departe (\`forward\`) un \`ref\` primit ca prop la un element DOM din interior — necesar când vrei să controlezi din exterior un element din interiorul unei componente.

**Problema fără forwardRef:**
\`\`\`jsx
// ❌ ref nu funcționează pe componente obișnuite
function FancyInput({ placeholder }) {
  return <input placeholder={placeholder} />;
}

function App() {
  const inputRef = useRef(null);
  // inputRef.current = null — ref nu ajunge la <input>
  return <FancyInput ref={inputRef} placeholder="Text" />;
}
\`\`\`

**Soluție cu forwardRef:**
\`\`\`jsx
import { forwardRef, useRef } from 'react';

// forwardRef primește (props, ref) ca argumente
const FancyInput = forwardRef(function FancyInput({ placeholder, className, ...props }, ref) {
  return (
    <div className="input-wrapper">
      <input
        ref={ref}  // ref pasată mai departe la elementul DOM
        placeholder={placeholder}
        className={\`fancy-input \${className || ''}\`}
        {...props}
      />
    </div>
  );
});

// Utilizare
function LoginForm() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email:', emailRef.current.value);
    passwordRef.current.focus(); // Focus programatic
  };

  return (
    <form onSubmit={handleSubmit}>
      <FancyInput ref={emailRef} type="email" placeholder="Email" />
      <FancyInput ref={passwordRef} type="password" placeholder="Parolă" />
      <button type="submit">Login</button>
    </form>
  );
}
\`\`\`

**forwardRef cu TypeScript:**
\`\`\`tsx
import { forwardRef, InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, ...props }, ref) => (
    <div>
      {label && <label>{label}</label>}
      <input ref={ref} {...props} />
      {error && <span className="error">{error}</span>}
    </div>
  )
);
Input.displayName = 'Input'; // Util în React DevTools
\`\`\`

**Cazuri de utilizare:** biblioteci de design system (Input, Select, Modal), integrare cu biblioteci non-React, focus management în formulare, video/audio players.`
  },
  {
    lessonContains: "forwardRef",
    titleContains: "useImperativeHandle",
    content: `**useImperativeHandle** personalizează ce metodele/valorile sunt expuse prin \`ref\` când se folosește \`forwardRef\` — în loc să expui elementul DOM direct, expui un API controlat.

**Sintaxă:**
\`\`\`jsx
import { forwardRef, useImperativeHandle, useRef } from 'react';

const Component = forwardRef((props, ref) => {
  const internalRef = useRef(null);

  useImperativeHandle(ref, () => ({
    // Metodele expuse prin ref
    focus: () => internalRef.current.focus(),
    clear: () => { internalRef.current.value = ''; },
    getValue: () => internalRef.current.value,
    // Nu expui internalRef.current direct — API controlat
  }));

  return <input ref={internalRef} />;
});
\`\`\`

**Exemplu complet — VideoPlayer custom:**
\`\`\`jsx
const VideoPlayer = forwardRef(function VideoPlayer({ src, poster }, ref) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  // Expune API-ul player-ului
  useImperativeHandle(ref, () => ({
    play() {
      videoRef.current.play();
      setPlaying(true);
    },
    pause() {
      videoRef.current.pause();
      setPlaying(false);
    },
    seekTo(time) {
      videoRef.current.currentTime = time;
    },
    getDuration() {
      return videoRef.current.duration;
    },
    isPlaying: playing
  }), [playing]);

  return (
    <div className="video-player">
      <video ref={videoRef} src={src} poster={poster} />
      <div className="controls">
        <button onClick={() => ref.current.play()}>▶</button>
        <button onClick={() => ref.current.pause()}>⏸</button>
      </div>
    </div>
  );
});

// Utilizare
function TutorialPage() {
  const playerRef = useRef(null);

  return (
    <div>
      <VideoPlayer ref={playerRef} src="/tutorial.mp4" />
      <button onClick={() => playerRef.current.seekTo(120)}>
        Sari la 2:00
      </button>
      <button onClick={() => {
        const dur = playerRef.current.getDuration();
        console.log(\`Durată: \${dur}s\`);
      }}>
        Afișează durată
      </button>
    </div>
  );
}
\`\`\`

**Principiu:** Expune cât mai puțin posibil — API minimal și clar, nu întregul element DOM. useImperativeHandle este rar necesar; evită-l în favoarea prop-urilor și callback-urilor când posibil.`
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
