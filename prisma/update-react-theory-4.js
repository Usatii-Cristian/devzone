"use strict";
require("dotenv").config({ path: ".env" });
const { PrismaClient } = require("@prisma/client");
const p = new PrismaClient();

const UPDATES = [
  {
    lessonContains: "Compound components",
    titleContains: "Pattern",
    content: `**Compound Components** (componente compuse) este un pattern în React unde mai multe componente lucrează împreună ca o unitate, partajând state implicit — similar cu \`<select>\` și \`<option>\` din HTML.

**Problema pe care o rezolvă:**
\`\`\`jsx
// ❌ Interfață cu prea mulți props — greu de extins
<Select
  options={[{value:'ro', label:'Română'}, ...]}
  renderOption={(opt) => <div>{opt.label}</div>}
  renderHeader={(selected) => <div>{selected.label}</div>}
  onSelect={setVal}
  closeOnSelect={true}
  maxHeight={300}
/>

// ✅ Compound — flexibil, extensibil
<Select value={val} onChange={setVal}>
  <Select.Header />
  <Select.Dropdown>
    <Select.Option value="ro">Română</Select.Option>
    <Select.Option value="en">Engleză</Select.Option>
  </Select.Dropdown>
</Select>
\`\`\`

**Avantaje:**
• **Flexibilitate** — utilizatorul controlează structura UI
• **Props reduse** — nu mai ai mega-interfețe de configurare
• **Compoziție** — componentele pot fi rearanjate, adăugate, eliminate
• **Lizibilitate** — structura JSX reflectă structura vizuală

**Pattern cu Context implicit:**
\`\`\`jsx
import { createContext, useContext, useState } from 'react';

// Context intern al compound component-ului
const TabsContext = createContext(null);

function Tabs({ defaultTab, children }) {
  const [activeTab, setActiveTab] = useState(defaultTab);
  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className="tabs">{children}</div>
    </TabsContext.Provider>
  );
}

function TabList({ children }) {
  return <div className="tab-list" role="tablist">{children}</div>;
}

function Tab({ id, children }) {
  const { activeTab, setActiveTab } = useContext(TabsContext);
  return (
    <button
      role="tab"
      aria-selected={activeTab === id}
      className={activeTab === id ? 'tab tab--active' : 'tab'}
      onClick={() => setActiveTab(id)}
    >
      {children}
    </button>
  );
}

function TabPanel({ id, children }) {
  const { activeTab } = useContext(TabsContext);
  if (activeTab !== id) return null;
  return <div role="tabpanel">{children}</div>;
}

// Atașare sub-componente (opțional — pentru acces ca Tabs.Tab)
Tabs.List = TabList;
Tabs.Tab = Tab;
Tabs.Panel = TabPanel;
\`\`\`

**Utilizare:**
\`\`\`jsx
<Tabs defaultTab="profil">
  <Tabs.List>
    <Tabs.Tab id="profil">Profil</Tabs.Tab>
    <Tabs.Tab id="setari">Setări</Tabs.Tab>
    <Tabs.Tab id="securitate">Securitate</Tabs.Tab>
  </Tabs.List>
  <Tabs.Panel id="profil"><EditareProfil /></Tabs.Panel>
  <Tabs.Panel id="setari"><Setari /></Tabs.Panel>
  <Tabs.Panel id="securitate"><Securitate /></Tabs.Panel>
</Tabs>
\`\`\``
  },
  {
    lessonContains: "Compound components",
    titleContains: "Implementare",
    content: `**Implementarea pattern-ului Compound Components** pentru un Accordion reutilizabil — demonstrează partajarea state-ului, compoziția și flexibilitatea pattern-ului.

**Accordion complet:**
\`\`\`jsx
import { createContext, useContext, useState } from 'react';

const AccordionContext = createContext(null);
const ItemContext = createContext(null);

function Accordion({ children, allowMultiple = false }) {
  const [openItems, setOpenItems] = useState(new Set());

  const toggle = (id) => {
    setOpenItems(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        if (!allowMultiple) next.clear();
        next.add(id);
      }
      return next;
    });
  };

  return (
    <AccordionContext.Provider value={{ openItems, toggle }}>
      <div className="accordion">{children}</div>
    </AccordionContext.Provider>
  );
}

function AccordionItem({ id, children }) {
  const { openItems } = useContext(AccordionContext);
  const isOpen = openItems.has(id);
  return (
    <ItemContext.Provider value={{ id, isOpen }}>
      <div className={\`accordion-item \${isOpen ? 'open' : ''}\`}>
        {children}
      </div>
    </ItemContext.Provider>
  );
}

function AccordionHeader({ children }) {
  const { id, isOpen } = useContext(ItemContext);
  const { toggle } = useContext(AccordionContext);
  return (
    <button
      className="accordion-header"
      onClick={() => toggle(id)}
      aria-expanded={isOpen}
    >
      {children}
      <span className="accordion-icon">{isOpen ? '▲' : '▼'}</span>
    </button>
  );
}

function AccordionPanel({ children }) {
  const { isOpen } = useContext(ItemContext);
  return isOpen ? <div className="accordion-panel">{children}</div> : null;
}

Accordion.Item = AccordionItem;
Accordion.Header = AccordionHeader;
Accordion.Panel = AccordionPanel;

// Utilizare
function FAQ() {
  return (
    <Accordion allowMultiple>
      <Accordion.Item id="q1">
        <Accordion.Header>Ce este React?</Accordion.Header>
        <Accordion.Panel>
          React este o bibliotecă JavaScript pentru UI...
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item id="q2">
        <Accordion.Header>De ce hooks?</Accordion.Header>
        <Accordion.Panel>
          Hooks permit reutilizarea logicii de state...
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
}
\`\`\`

**Variante ale pattern-ului:**
• **Static children** — iterare prin \`React.Children\` (mai rigid)
• **Context implicit** — pattern de mai sus (recomandat)
• **State lifting** — state în parent, pasate prin cloneElement (legacy)`
  },
  {
    lessonContains: "Render props",
    titleContains: "Render props",
    content: `**Render props** este un pattern de partajare a logicii între componente — componenta primește o funcție ca prop și o apelează cu datele pe care le gestionează, lăsând caller-ul să decidă ce să randeze.

**Conceptul de bază:**
\`\`\`jsx
// Componenta care gestionează logica
function Mouse({ render }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    setPosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <div onMouseMove={handleMouseMove} style={{ height: '100vh' }}>
      {/* Apelează funcția cu datele — caller decide UI-ul */}
      {render(position)}
    </div>
  );
}

// Utilizare — caller decide cum arată UI-ul
function App() {
  return (
    <Mouse render={({ x, y }) => (
      <p>Cursorul: {x}, {y}</p>
    )} />
  );
}

// Alt utilizator — același comportament, UI diferit
function Radar() {
  return (
    <Mouse render={({ x, y }) => (
      <div style={{ position: 'fixed', left: x, top: y }} className="cursor-dot" />
    )} />
  );
}
\`\`\`

**Varianta cu children ca funcție:**
\`\`\`jsx
function DataFetcher({ url, children }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(url)
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false); })
      .catch(e => { setError(e.message); setLoading(false); });
  }, [url]);

  return children({ data, loading, error });
}

// Utilizare cu children ca funcție
<DataFetcher url="/api/users">
  {({ data, loading, error }) => {
    if (loading) return <Spinner />;
    if (error) return <Error message={error} />;
    return <UserList users={data} />;
  }}
</DataFetcher>
\`\`\`

**Custom hook vs Render prop:**
\`\`\`jsx
// Modern: custom hook — mai curat
function useMousePosition() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handler = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, []);
  return pos;
}

// Utilizare
const { x, y } = useMousePosition(); // Mult mai simplu!
\`\`\`

Render props sunt mai rar folosite în React modern (post-hooks) deoarece custom hooks înlocuiesc cel mai frecvent scenariile de reutilizare a logicii.`
  },
  {
    lessonContains: "Render props",
    titleContains: "HOC",
    content: `**Higher Order Components (HOC)** sunt funcții care primesc o componentă și returnează o componentă nouă cu funcționalitate adăugată — pattern inspirat din funcțiile de ordin superior din programarea funcțională.

**Structura unui HOC:**
\`\`\`jsx
// HOC = funcție care primește Component și returnează ComponentImbunatatita
function withAuth(WrappedComponent) {
  return function AuthenticatedComponent(props) {
    const { user, loading } = useAuth();

    if (loading) return <Spinner />;
    if (!user) return <Navigate to="/login" />;

    // Pasează toate props-urile originale + user
    return <WrappedComponent {...props} user={user} />;
  };
}

// Utilizare
function Dashboard({ user, title }) {
  return <h1>Bun venit, {user.name}! — {title}</h1>;
}

// HOC wraps componenta
const ProtectedDashboard = withAuth(Dashboard);

// ProtectedDashboard = Dashboard cu verificare auth automată
<ProtectedDashboard title="Dashboard" />
\`\`\`

**HOC pentru logging:**
\`\`\`jsx
function withLogging(WrappedComponent) {
  const displayName = WrappedComponent.displayName || WrappedComponent.name;

  function LoggedComponent(props) {
    useEffect(() => {
      console.log(\`\${displayName} mounted\`);
      return () => console.log(\`\${displayName} unmounted\`);
    }, []);

    return <WrappedComponent {...props} />;
  }

  LoggedComponent.displayName = \`withLogging(\${displayName})\`;
  return LoggedComponent;
}
\`\`\`

**HOC pentru error boundary:**
\`\`\`jsx
function withErrorBoundary(WrappedComponent, fallback) {
  return function(props) {
    return (
      <ErrorBoundary fallback={fallback || <p>Ceva a mers greșit</p>}>
        <WrappedComponent {...props} />
      </ErrorBoundary>
    );
  };
}

const SafeChart = withErrorBoundary(DataChart, <p>Grafic indisponibil</p>);
\`\`\`

**Reguli HOC:**
• Nu modifica componenta originală — creează una nouă
• Pasează toate props-urile cu spread: \`{...props}\`
• Setează \`displayName\` pentru debugging în React DevTools
• Nu aplica HOC în interiorul metodei render (creează componentă nouă la fiecare render)

**HOC vs Custom Hooks:** HOC-urile sunt mai puțin folosite în React modern. Preferă custom hooks pentru reutilizarea logicii, HOC-urile rămân utile pentru wrapping-ul de componente (auth, error boundary, theming).`
  },
  {
    lessonContains: "State management",
    titleContains: "Context",
    content: `**Context API ca state management** — potrivit pentru date globale care se schimbă rar: utilizator autentificat, temă, limbă. Nu e recomandat pentru state care se schimbă frecvent.

**Context API complet cu reducers:**
\`\`\`jsx
import { createContext, useContext, useReducer } from 'react';

// State și actions
const initialState = {
  user: null,
  theme: 'light',
  language: 'ro',
  notifications: []
};

function appReducer(state, action) {
  switch (action.type) {
    case 'SET_USER': return { ...state, user: action.payload };
    case 'LOGOUT': return { ...state, user: null };
    case 'SET_THEME': return { ...state, theme: action.payload };
    case 'SET_LANGUAGE': return { ...state, language: action.payload };
    case 'ADD_NOTIFICATION':
      return { ...state, notifications: [...state.notifications, action.payload] };
    case 'DISMISS_NOTIFICATION':
      return { ...state, notifications: state.notifications.filter(n => n.id !== action.payload) };
    default: return state;
  }
}

// Context
const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const actions = {
    login: (user) => dispatch({ type: 'SET_USER', payload: user }),
    logout: () => dispatch({ type: 'LOGOUT' }),
    setTheme: (theme) => dispatch({ type: 'SET_THEME', payload: theme }),
    notify: (msg, type = 'info') => dispatch({
      type: 'ADD_NOTIFICATION',
      payload: { id: Date.now(), msg, type }
    })
  };

  return (
    <AppContext.Provider value={{ state, ...actions }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp outside AppProvider');
  return ctx;
}

// Utilizare
function Header() {
  const { state, logout, setTheme } = useApp();
  return (
    <header>
      <span>Bun venit, {state.user?.name}</span>
      <button onClick={() => setTheme(state.theme === 'light' ? 'dark' : 'light')}>
        {state.theme === 'light' ? '🌙' : '☀️'}
      </button>
      <button onClick={logout}>Deconectare</button>
    </header>
  );
}
\`\`\`

**Limitări Context:** Re-randează TOȚI consumatorii la orice schimbare. Pentru state frecvent modificat, preferă Zustand sau Jotai.`
  },
  {
    lessonContains: "State management",
    titleContains: "Zustand",
    content: `**Zustand** este o bibliotecă de state management minimalistă pentru React — store simplu, fără boilerplate, fără Provider, fără reducers.

**Instalare și store de bază:**
\`\`\`bash
npm install zustand
\`\`\`

\`\`\`jsx
import { create } from 'zustand';

// Store simplu — no Provider necesar!
const useCounterStore = create((set, get) => ({
  count: 0,
  step: 1,

  // Actions
  increment: () => set(state => ({ count: state.count + state.step })),
  decrement: () => set(state => ({ count: state.count - state.step })),
  reset: () => set({ count: 0 }),
  setStep: (step) => set({ step }),

  // Action cu get() — acces la state curent
  double: () => set({ count: get().count * 2 })
}));

// Utilizare — oriunde, fără Provider
function Counter() {
  const { count, increment, decrement, reset } = useCounterStore();
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}

// Selector — re-randare DOAR când count se schimbă
function CountDisplay() {
  const count = useCounterStore(state => state.count);
  return <p>Count: {count}</p>;
}
\`\`\`

**Store pentru coș de cumpărături:**
\`\`\`jsx
const useCartStore = create((set, get) => ({
  items: [],

  addItem: (produs) => set(state => {
    const existing = state.items.find(i => i.id === produs.id);
    if (existing) {
      return { items: state.items.map(i =>
        i.id === produs.id ? { ...i, qty: i.qty + 1 } : i
      )};
    }
    return { items: [...state.items, { ...produs, qty: 1 }] };
  }),

  removeItem: (id) => set(state => ({
    items: state.items.filter(i => i.id !== id)
  })),

  updateQty: (id, qty) => set(state => ({
    items: qty <= 0
      ? state.items.filter(i => i.id !== id)
      : state.items.map(i => i.id === id ? { ...i, qty } : i)
  })),

  clearCart: () => set({ items: [] }),

  // Computed value via get()
  getTotal: () => get().items.reduce((sum, i) => sum + i.price * i.qty, 0),
  getCount: () => get().items.reduce((sum, i) => sum + i.qty, 0)
}));
\`\`\``
  },
  {
    lessonContains: "React Query",
    titleContains: "React Query",
    content: `**React Query** (TanStack Query) este biblioteca standard pentru **server state** în React — caching, sincronizare, invalidare și re-fetching automat.

**Diferența server state vs client state:**
| Client State | Server State |
|-------------|--------------|
| UI state (modal deschis, tab activ) | Date din API (utilizatori, produse) |
| useState, useReducer, Zustand | React Query, SWR |
| Persistent în memorie | Trebuie sincronizat cu serverul |
| Controlat de noi | Sursa adevărului e pe server |

**Setup:**
\`\`\`bash
npm install @tanstack/react-query
\`\`\`

\`\`\`jsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,  // Date "proaspete" 1 minut
      retry: 2,               // Retry de 2 ori la eroare
    }
  }
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterApp />
    </QueryClientProvider>
  );
}
\`\`\`

**useQuery — fetch de date:**
\`\`\`jsx
import { useQuery } from '@tanstack/react-query';

async function fetchUsers() {
  const res = await fetch('/api/users');
  if (!res.ok) throw new Error('Eroare la fetch');
  return res.json();
}

function UserList() {
  const {
    data: users,
    isLoading,
    isError,
    error,
    isFetching,  // true când re-fetch în background
    refetch
  } = useQuery({
    queryKey: ['users'],          // Cache key — unic per query
    queryFn: fetchUsers,
    staleTime: 5 * 60 * 1000,   // 5 minute fresh
    gcTime: 10 * 60 * 1000      // 10 minute în cache după unmount
  });

  if (isLoading) return <Spinner />;
  if (isError) return <Error message={error.message} onRetry={refetch} />;

  return (
    <div>
      {isFetching && <span>Actualizare...</span>}
      <ul>
        {users.map(u => <li key={u.id}>{u.name}</li>)}
      </ul>
    </div>
  );
}

// Query cu parametri
function UserDetail({ userId }) {
  const { data: user } = useQuery({
    queryKey: ['users', userId],  // Cache separat per userId
    queryFn: () => fetch(\`/api/users/\${userId}\`).then(r => r.json()),
    enabled: !!userId  // Nu rula dacă userId e null/undefined
  });
}
\`\`\``
  },
  {
    lessonContains: "React Query",
    titleContains: "Mutations",
    content: `**useMutation** gestionează operații de scriere (POST, PUT, DELETE) cu invalidare automată a cache-ului, optimistic updates și error handling.

**useMutation de bază:**
\`\`\`jsx
import { useMutation, useQueryClient } from '@tanstack/react-query';

async function createUser(userData) {
  const res = await fetch('/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  });
  if (!res.ok) throw new Error('Creare eșuată');
  return res.json();
}

function AddUserForm() {
  const queryClient = useQueryClient();
  const [form, setForm] = useState({ name: '', email: '' });

  const mutation = useMutation({
    mutationFn: createUser,

    // Invalidează cache-ul după succes → re-fetch automat
    onSuccess: (newUser) => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      setForm({ name: '', email: '' });
      toast.success(\`Utilizator \${newUser.name} creat!\`);
    },

    onError: (error) => {
      toast.error(\`Eroare: \${error.message}\`);
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={form.name} onChange={e => setForm(p => ({...p, name: e.target.value}))} />
      <input value={form.email} onChange={e => setForm(p => ({...p, email: e.target.value}))} />
      <button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? 'Se creează...' : 'Adaugă utilizator'}
      </button>
    </form>
  );
}
\`\`\`

**Optimistic updates:**
\`\`\`jsx
const toggleTodoMutation = useMutation({
  mutationFn: (todo) => fetch(\`/api/todos/\${todo.id}\`, {
    method: 'PATCH',
    body: JSON.stringify({ done: !todo.done })
  }),

  onMutate: async (todo) => {
    // Anulează orice re-fetch în curs
    await queryClient.cancelQueries({ queryKey: ['todos'] });

    // Snapshot stare anterioară (pentru rollback)
    const previous = queryClient.getQueryData(['todos']);

    // Actualizare optimistă — UI se schimbă IMEDIAT
    queryClient.setQueryData(['todos'], old =>
      old.map(t => t.id === todo.id ? { ...t, done: !t.done } : t)
    );

    return { previous }; // Context pentru onError
  },

  onError: (err, todo, context) => {
    // Rollback la starea anterioară dacă serverul returnează eroare
    queryClient.setQueryData(['todos'], context.previous);
    toast.error('Actualizare eșuată');
  },

  onSettled: () => {
    // Re-sincronizare cu serverul indiferent de succes/eroare
    queryClient.invalidateQueries({ queryKey: ['todos'] });
  }
});
\`\`\``
  },
  {
    lessonContains: "Forms cu React Hook Form",
    titleContains: "Setup",
    content: `**React Hook Form** este biblioteca performantă pentru formulare React — validare cu uncontrolled inputs, re-render minim, TypeScript first.

**De ce React Hook Form:**
• **Performanță** — nu re-randează la fiecare tastă (uncontrolled by default)
• **Codul simplu** — mai puțin cod față de useState per câmp
• **Validare built-in** — rules object sau integrare Zod/Yup
• **TypeScript** — tipuri excelente out of the box

**Setup și exemplu complet:**
\`\`\`bash
npm install react-hook-form
\`\`\`

\`\`\`jsx
import { useForm } from 'react-hook-form';

function RegistrationForm() {
  const {
    register,       // Înregistrează input-uri
    handleSubmit,   // Wrapper pentru submit
    formState: { errors, isSubmitting, isDirty, isValid },
    watch,          // Urmărire valori
    reset,          // Reset form
    setValue        // Setare programatică
  } = useForm({
    mode: 'onChange',       // Validare la typing
    defaultValues: { name: '', email: '', password: '', confirmPassword: '' }
  });

  const password = watch('password'); // Urmărire pentru confirmare parolă

  const onSubmit = async (data) => {
    try {
      await registerUser(data);
      reset();
      toast.success('Cont creat!');
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div>
        <input
          {...register('name', {
            required: 'Numele este obligatoriu',
            minLength: { value: 2, message: 'Minim 2 caractere' },
            maxLength: { value: 50, message: 'Maxim 50 caractere' }
          })}
          placeholder="Nume complet"
        />
        {errors.name && <span className="error">{errors.name.message}</span>}
      </div>

      <div>
        <input
          {...register('email', {
            required: 'Email-ul este obligatoriu',
            pattern: { value: /^[^@]+@[^@]+\\.[^@]+$/, message: 'Email invalid' }
          })}
          type="email"
          placeholder="Email"
        />
        {errors.email && <span className="error">{errors.email.message}</span>}
      </div>

      <div>
        <input
          {...register('password', {
            required: 'Parola e obligatorie',
            minLength: { value: 8, message: 'Minim 8 caractere' },
            validate: (v) => /[A-Z]/.test(v) || 'Trebuie o literă mare'
          })}
          type="password"
        />
        {errors.password && <span className="error">{errors.password.message}</span>}
      </div>

      <div>
        <input
          {...register('confirmPassword', {
            validate: (v) => v === password || 'Parolele nu coincid'
          })}
          type="password"
          placeholder="Confirmă parola"
        />
        {errors.confirmPassword && <span>{errors.confirmPassword.message}</span>}
      </div>

      <button type="submit" disabled={isSubmitting || !isValid}>
        {isSubmitting ? 'Se procesează...' : 'Înregistrare'}
      </button>
    </form>
  );
}
\`\`\``
  },
  {
    lessonContains: "Forms cu React Hook Form",
    titleContains: "Validare cu Zod",
    content: `**React Hook Form + Zod** combinație puternică: Zod pentru schema de validare tip-safe, RHF pentru performanță la formulare.

**Instalare:**
\`\`\`bash
npm install react-hook-form @hookform/resolvers zod
\`\`\`

**Schema Zod + integrare RHF:**
\`\`\`jsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// Schema Zod — sursa unică de adevăr pentru validare și tipuri
const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email-ul este obligatoriu')
    .email('Format email invalid'),
  password: z
    .string()
    .min(8, 'Parola trebuie să aibă minim 8 caractere')
    .regex(/[A-Z]/, 'Trebuie cel puțin o literă mare')
    .regex(/[0-9]/, 'Trebuie cel puțin o cifră'),
  rememberMe: z.boolean().default(false)
});

// Tip TypeScript generat din schema
type LoginForm = z.infer<typeof loginSchema>;

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(loginSchema), // Zod ca validator
    defaultValues: { email: '', password: '', rememberMe: false }
  });

  const onSubmit = async (data) => {
    // data este tipizat și validat la runtime de Zod
    await login(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email')} type="email" placeholder="Email" />
      {errors.email && <p>{errors.email.message}</p>}

      <input {...register('password')} type="password" placeholder="Parolă" />
      {errors.password && <p>{errors.password.message}</p>}

      <label>
        <input {...register('rememberMe')} type="checkbox" />
        Ține-mă minte
      </label>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Se autentifică...' : 'Autentificare'}
      </button>
    </form>
  );
}
\`\`\`

**Schema avansată cu refinements:**
\`\`\`jsx
const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
  message: 'Parolele nu coincid',
  path: ['confirmPassword'] // Eroarea apare pe câmpul confirmPassword
});
\`\`\``
  },
  {
    lessonContains: "Zod",
    titleContains: "Schema basics",
    content: `**Zod** este o bibliotecă TypeScript-first pentru validarea schemelor — permite validarea runtime a datelor cu inferență automată a tipurilor.

**Tipuri primitive:**
\`\`\`typescript
import { z } from 'zod';

// Primitive
const StringSchema = z.string();
const NumberSchema = z.number();
const BooleanSchema = z.boolean();
const DateSchema = z.date();

// Cu validări
const EmailSchema = z.string().email('Email invalid');
const AgeSchema = z.number().int().min(0).max(120);
const NameSchema = z.string().min(2).max(50).trim();
const UrlSchema = z.string().url();
const UUIDSchema = z.string().uuid();

// Parse — aruncă eroare dacă invalid
const email = EmailSchema.parse('test@example.com'); // ✅ 'test@example.com'
EmailSchema.parse('not-an-email'); // ❌ ZodError

// safeParse — returnează {success, data/error}
const result = EmailSchema.safeParse('test@example.com');
if (result.success) {
  console.log(result.data); // 'test@example.com'
} else {
  console.log(result.error.issues); // Array de erori
}
\`\`\`

**Obiecte și array-uri:**
\`\`\`typescript
const UserSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).max(100),
  email: z.string().email(),
  age: z.number().int().min(0).optional(),
  role: z.enum(['admin', 'user', 'moderator']),
  createdAt: z.date().default(() => new Date())
});

// Inferare tip TypeScript
type User = z.infer<typeof UserSchema>;
// { id: string; name: string; email: string; age?: number; role: 'admin'|'user'|'moderator'; createdAt: Date }

// Array
const UsersSchema = z.array(UserSchema).min(1).max(100);

// Record
const ConfigSchema = z.record(z.string(), z.string());
// { [key: string]: string }
\`\`\`

**Union, intersection, optional:**
\`\`\`typescript
// Union — unul din tipuri
const IdSchema = z.union([z.string(), z.number()]);
// sau prescurtat: z.string().or(z.number())

// Optional și nullable
const MaybeStringSchema = z.string().optional(); // string | undefined
const NullableStringSchema = z.string().nullable(); // string | null
const MaybeNullSchema = z.string().nullish(); // string | null | undefined

// Valoare default
const WithDefaultSchema = z.string().default('default');
const parsed = WithDefaultSchema.parse(undefined); // 'default'

// Transform — transformă valoarea
const TrimmedSchema = z.string().trim().toLowerCase();
const NumberFromString = z.string().transform(Number);
\`\`\``
  },
  {
    lessonContains: "Zod",
    titleContains: "Validări avansate",
    content: `**Validările avansate Zod** — discriminated unions, refinements, transforms și composabilitate pentru scheme complexe.

**Discriminated unions:**
\`\`\`typescript
import { z } from 'zod';

// Discriminated union — tipuri diferite bazate pe un câmp discriminator
const FormulareSchema = z.discriminatedUnion('tip', [
  z.object({
    tip: z.literal('persoana_fizica'),
    cnp: z.string().length(13),
    nume: z.string(),
    prenume: z.string()
  }),
  z.object({
    tip: z.literal('persoana_juridica'),
    cui: z.string().min(2).max(10),
    denumire: z.string(),
    reprezentant: z.string()
  })
]);

type Formular = z.infer<typeof FormulareSchema>;
// Tip corect: { tip: 'persoana_fizica'; cnp: string; ... } | { tip: 'persoana_juridica'; cui: string; ... }
\`\`\`

**Refinements — validare personalizată:**
\`\`\`typescript
// .refine() — validare simplă
const ParolaSchema = z.string()
  .min(8, 'Minim 8 caractere')
  .refine(v => /[A-Z]/.test(v), 'Trebuie literă mare')
  .refine(v => /[0-9]/.test(v), 'Trebuie cifră')
  .refine(v => /[^A-Za-z0-9]/.test(v), 'Trebuie caracter special');

// .superRefine() — control complet al erorilor
const RegisterSchema = z.object({
  password: z.string().min(8),
  confirmPassword: z.string()
}).superRefine((data, ctx) => {
  if (data.password !== data.confirmPassword) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Parolele nu coincid',
      path: ['confirmPassword']
    });
  }
});
\`\`\`

**Transforms și preprocessing:**
\`\`\`typescript
// Transform — modifică valoarea după validare
const PretSchema = z.string()
  .trim()
  .transform(v => parseFloat(v))
  .refine(v => !isNaN(v), 'Preț invalid')
  .transform(v => Math.round(v * 100) / 100); // Rotunjit la 2 zecimale

// Preprocess — transformare ÎNAINTE de validare
const FlexibleDateSchema = z.preprocess(
  (val) => typeof val === 'string' ? new Date(val) : val,
  z.date()
);
\`\`\`

**Reutilizare și extindere scheme:**
\`\`\`typescript
const BaseUserSchema = z.object({
  email: z.string().email(),
  name: z.string()
});

// Extend — adaugă câmpuri
const AdminSchema = BaseUserSchema.extend({
  permissions: z.array(z.string()),
  level: z.number().int().min(1).max(10)
});

// Pick și Omit
const CreateUserSchema = BaseUserSchema.omit({ id: true });
const PublicUserSchema = BaseUserSchema.pick({ name: true, email: true });

// Merge
const FullUserSchema = BaseUserSchema.merge(z.object({ age: z.number() }));
\`\`\``
  },
  {
    lessonContains: "Testing",
    titleContains: "Setup",
    content: `**Testing în React** cu Vitest și Testing Library — setup, primul test și pattern-uri de bază pentru testarea componentelor.

**Instalare:**
\`\`\`bash
npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
\`\`\`

\`\`\`javascript
// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test-setup.js'
  }
});
\`\`\`

\`\`\`javascript
// src/test-setup.js
import '@testing-library/jest-dom'; // Custom matchers: toBeInTheDocument, toHaveValue, etc.
\`\`\`

**Primele teste:**
\`\`\`jsx
// Button.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import Button from './Button';

describe('Button component', () => {
  it('renders with correct label', () => {
    render(<Button label="Click me" />);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(<Button label="Click" onClick={handleClick} />);
    await user.click(screen.getByRole('button'));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button label="Click" disabled />);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
\`\`\`

**Test cu state:**
\`\`\`jsx
// Counter.test.jsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Counter from './Counter';

it('increments count when + button is clicked', async () => {
  const user = userEvent.setup();
  render(<Counter />);

  expect(screen.getByText('Count: 0')).toBeInTheDocument();

  await user.click(screen.getByRole('button', { name: '+' }));
  expect(screen.getByText('Count: 1')).toBeInTheDocument();

  await user.click(screen.getByRole('button', { name: '+' }));
  expect(screen.getByText('Count: 2')).toBeInTheDocument();
});
\`\`\`

**Rulare:**
\`\`\`bash
npm test          # Watch mode
npm test -- --run # Single run
npm test -- --coverage # Cu coverage
\`\`\``
  },
  {
    lessonContains: "Testing",
    titleContains: "Filozofie",
    content: `**Filozofia Testing Library** — testează comportamentul vizibil utilizatorului, nu implementarea internă. "The more your tests resemble the way your software is used, the more confidence they can give you."

**Principiu #1 — Queries bazate pe accesibilitate:**
\`\`\`jsx
// ✅ Queries care reflectă cum utilizatorul vede UI-ul
getByRole('button', { name: 'Salvează' })
getByRole('textbox', { name: 'Email' })
getByRole('checkbox', { name: 'Accept termenii' })
getByLabelText('Parolă')
getByText('Bun venit, Ana!')
getByPlaceholderText('Caută...')

// ❌ Queries care testează implementarea (CSS class, id intern)
container.querySelector('.submit-btn')  // NU face asta
getByTestId('submit-button')  // Fallback, nu prima opțiune
\`\`\`

**Ierarhia query-urilor (prioritate):**
1. **getByRole** — cel mai semantic (accesibil)
2. **getByLabelText** — pentru form fields
3. **getByPlaceholderText** — dacă nu există label
4. **getByText** — pentru conținut vizibil
5. **getByDisplayValue** — valoarea curentă a input-ului
6. **getByAltText** — pentru imagini
7. **getByTitle** — atribut title
8. **getByTestId** — ultimă opțiune (adaugă data-testid)

**Principiu #2 — Testează comportament, nu implementare:**
\`\`\`jsx
// ❌ Testează implementare internă (state intern)
const { result } = renderHook(() => useForm());
expect(result.current.values.email).toBe('');

// ✅ Testează comportamentul vizibil
render(<LoginForm />);
const emailInput = screen.getByRole('textbox', { name: /email/i });
await userEvent.type(emailInput, 'test@example.com');
// Verificăm că input-ul AFIȘEAZĂ valoarea, nu că state-ul intern e setat
expect(emailInput).toHaveValue('test@example.com');
\`\`\`

**Test async cu findBy:**
\`\`\`jsx
// findBy* = async, asteaptă element să apară în DOM
it('shows user data after fetch', async () => {
  server.use(rest.get('/api/user', (req, res, ctx) =>
    res(ctx.json({ name: 'Ana Pop' }))
  ));

  render(<UserProfile userId="1" />);

  // getBy* aruncă imediat dacă nu găsește
  // findBy* așteaptă (timeout default 1000ms)
  const name = await screen.findByText('Ana Pop');
  expect(name).toBeInTheDocument();
});
\`\`\``
  },
  {
    lessonContains: "Storybook",
    titleContains: "Storybook",
    content: `**Storybook** este un tool pentru dezvoltarea componentelor UI în izolare — fiecare componentă poate fi văzută și testată independent de aplicație.

**De ce Storybook:**
• **Dezvoltare izolată** — lucrezi pe componentă fără să pornești toată aplicația
• **Documentație vie** — componenta + toate variantele sale într-un singur loc
• **Design system** — catalog vizual al tuturor componentelor
• **Testing vizual** — detectezi regresii vizuale
• **Colaborare** — designeri și developeri văd exact același lucru

**Setup:**
\`\`\`bash
npx storybook@latest init
npm run storybook  # Pornire pe http://localhost:6006
\`\`\`

**Structura unui story file:**
\`\`\`jsx
// Button.stories.jsx
import { Button } from './Button';

// Metadata componentă
export default {
  title: 'Components/Button',  // Calea în sidebar
  component: Button,
  tags: ['autodocs'],          // Generează documentație automată
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'danger']
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg']
    },
    onClick: { action: 'clicked' }  // Logare în Actions tab
  }
};

// Story = o instanță a componentei cu args specifice
export const Primary = {
  args: {
    label: 'Buton primar',
    variant: 'primary',
    size: 'md'
  }
};

export const Secondary = {
  args: {
    label: 'Buton secundar',
    variant: 'secondary'
  }
};

export const Danger = {
  args: {
    label: 'Șterge',
    variant: 'danger',
    size: 'sm'
  }
};

export const Disabled = {
  args: {
    label: 'Indisponibil',
    disabled: true
  }
};
\`\`\`

**Concepte cheie:**
• **Story** = o instanță a componentei cu props definite
• **Args** = props controlabile dinamic prin Storybook UI
• **Controls** = interfață vizuală pentru a modifica args în timp real
• **Actions** = logare evenimente (click, change) în consolă Storybook
• **Decorators** = wrappers pentru context (ThemeProvider, Router)`
  },
  {
    lessonContains: "Storybook",
    titleContains: "Exemplu story",
    content: `**Story-uri avansate** — decorators, play functions, interactions testing și integrarea cu design tokens.

**Decorators — context pentru componente:**
\`\`\`jsx
// Button.stories.jsx
import { ThemeProvider } from '../contexts/ThemeContext';

export default {
  title: 'Components/Button',
  component: Button,
  decorators: [
    // Fiecare story va fi înfășurată în ThemeProvider
    (Story) => (
      <ThemeProvider>
        <div style={{ padding: '2rem' }}>
          <Story />
        </div>
      </ThemeProvider>
    )
  ]
};
\`\`\`

**Play function — interacțiuni simulate:**
\`\`\`jsx
import { within, userEvent } from '@storybook/test';

export const FormSubmit = {
  args: { onSubmit: fn() },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    // Simulare interacțiuni utilizator
    await userEvent.type(
      canvas.getByRole('textbox', { name: /email/i }),
      'test@example.com'
    );
    await userEvent.type(
      canvas.getByLabelText(/parolă/i),
      'Parola123!'
    );
    await userEvent.click(
      canvas.getByRole('button', { name: /autentificare/i })
    );

    // Verificare după interacțiune
    await expect(args.onSubmit).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'Parola123!'
    });
  }
};
\`\`\`

**Global decorators — preview.js:**
\`\`\`jsx
// .storybook/preview.js
import { BrowserRouter } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import '../src/index.css'; // Stiluri globale

const queryClient = new QueryClient();

export const decorators = [
  (Story) => (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    </QueryClientProvider>
  )
];

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: { matchers: {
    color: /(background|color)$/i,
    date: /Date$/
  }}
};
\`\`\`

**Story-uri pentru stări de loading/error:**
\`\`\`jsx
export const Loading = { args: { isLoading: true } };
export const WithError = { args: { error: 'Nu s-a putut încărca' } };
export const Empty = { args: { items: [] } };
export const WithManyItems = { args: { items: Array(50).fill(null).map((_, i) => ({ id: i, name: \`Item \${i}\` })) } };
\`\`\``
  },
  {
    lessonContains: "Performance — memo",
    titleContains: "memo",
    content: `**React.memo — evitarea re-renders** în aplicații complexe — pattern-uri avansate și cum să identifici unde memo chiar ajută.

**Identificarea problemelor de performanță:**
\`\`\`
React DevTools Profiler:
1. Record → interacționează cu aplicația → Stop
2. Identifică componentele cu timp lung de render
3. Verifică dacă se re-randează când nu ar trebui (props identice)
4. Aplică memo NUMAI la componentele problematice
\`\`\`

**memo cu comparare personalizată:**
\`\`\`jsx
// Comparare default: shallow equality (===) pe fiecare prop
// Problem: obiectele și funcțiile create inline sunt MEREU diferite
function Parent({ data }) {
  return (
    // ❌ config e recreat la fiecare render → Child se re-randează mereu
    <ChildCuMemo config={{ endpoint: '/api', timeout: 5000 }} />
  );
}

// Fix 1: useMemo pentru obiectul config
const config = useMemo(() => ({ endpoint: '/api', timeout: 5000 }), []);

// Fix 2: Comparare personalizată
const Child = React.memo(
  ({ user, config }) => <div>{user.name} — {config.endpoint}</div>,
  (prev, next) =>
    prev.user.id === next.user.id &&
    prev.config.endpoint === next.config.endpoint
);
\`\`\`

**Pattern complet — table cu selecție:**
\`\`\`jsx
const TableRow = React.memo(function TableRow({ row, isSelected, onSelect }) {
  return (
    <tr
      className={isSelected ? 'selected' : ''}
      onClick={() => onSelect(row.id)}
    >
      <td>{row.id}</td>
      <td>{row.name}</td>
      <td>{row.email}</td>
    </tr>
  );
});

function DataTable({ rows }) {
  const [selectedId, setSelectedId] = useState(null);

  // ✅ useCallback — onSelect stabil
  const handleSelect = useCallback((id) => setSelectedId(id), []);

  return (
    <table>
      <tbody>
        {rows.map(row => (
          <TableRow
            key={row.id}
            row={row}
            isSelected={selectedId === row.id}
            onSelect={handleSelect}
          />
          // TableRow se re-randează DOAR dacă row, isSelected sau onSelect se schimbă
          // Cu 1000 rows și selecție, fără memo → 1000 re-renders
          // Cu memo → 2 re-renders (rândul deselectat + cel selectat)
        ))}
      </tbody>
    </table>
  );
}
\`\`\``
  },
  {
    lessonContains: "Performance — memo",
    titleContains: "useMemo și useCallback",
    content: `**useMemo și useCallback împreună** — pattern-uri pentru optimizare consistentă, mai ales în scenarii cu liste mari și computații costisitoare.

**Regula de bază — când să folosești:**
\`\`\`jsx
// ✅ MERITĂ — calcul costisitor pe date mari
const sortedFiltered = useMemo(() =>
  bigArray
    .filter(item => matchesFilter(item, filters))
    .sort((a, b) => sortFn(a, b, sortConfig))
    .slice(page * pageSize, (page + 1) * pageSize),
  [bigArray, filters, sortConfig, page, pageSize]
);

// ❌ NU MERITĂ — operație trivială
const doubled = useMemo(() => count * 2, [count]);
// Scrie simplu: const doubled = count * 2;
\`\`\`

**Pattern complet — filtru + sort + paginare:**
\`\`\`jsx
function ProduseTable({ produse }) {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortDir, setSortDir] = useState('asc');
  const [page, setPage] = useState(0);
  const PAGE_SIZE = 20;

  const produseVizibile = useMemo(() => {
    const filtered = produse.filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.includes(search)
    );

    const sorted = [...filtered].sort((a, b) => {
      const cmp = a[sortBy] < b[sortBy] ? -1 : a[sortBy] > b[sortBy] ? 1 : 0;
      return sortDir === 'asc' ? cmp : -cmp;
    });

    return sorted.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);
  }, [produse, search, sortBy, sortDir, page]);

  const totalPagini = useMemo(() =>
    Math.ceil(produse.filter(p => p.name.includes(search)).length / PAGE_SIZE),
    [produse, search]
  );

  const handleSort = useCallback((col) => {
    setSortBy(prev => {
      if (prev === col) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
      return col;
    });
    setPage(0);
  }, []);

  const handleSearch = useCallback((e) => {
    setSearch(e.target.value);
    setPage(0);
  }, []);

  return (
    <div>
      <input value={search} onChange={handleSearch} placeholder="Caută..." />
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort('name')}>Nume {sortBy==='name' ? (sortDir==='asc'?'↑':'↓') : ''}</th>
            <th onClick={() => handleSort('price')}>Preț</th>
          </tr>
        </thead>
        <tbody>
          {produseVizibile.map(p => <ProdusRow key={p.id} produs={p} />)}
        </tbody>
      </table>
      <Paginare pagina={page} total={totalPagini} onChange={setPage} />
    </div>
  );
}

const ProdusRow = React.memo(({ produs }) => (
  <tr><td>{produs.name}</td><td>{produs.price} RON</td></tr>
));
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
