"use strict";
require("dotenv").config({ path: ".env" });
const { PrismaClient } = require("@prisma/client");
const p = new PrismaClient();

const UPDATES = [
  {
    lessonContains: "React 19",
    titleContains: "promise si context",
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
function NewWay({ show }) {
  if (!show) return null;
  const theme = use(ThemeContext); // ✅ use() poate fi condițional!
  return <button className={\`btn-\${theme}\`}>Click</button>;
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

**use() pentru erori cu ErrorBoundary:**
\`\`\`jsx
function DataComponent({ dataPromise }) {
  // Dacă promise-ul reject → ErrorBoundary prinde eroarea
  const data = use(dataPromise);
  return <div>{data.value}</div>;
}

function SafeData({ id }) {
  const promise = fetchData(id);
  return (
    <ErrorBoundary fallback={<p>Eroare la încărcare</p>}>
      <Suspense fallback={<Spinner />}>
        <DataComponent dataPromise={promise} />
      </Suspense>
    </ErrorBoundary>
  );
}
\`\`\`

**Diferențe față de useContext:**
| Feature | useContext | use() |
|---------|------------|-------|
| Context | ✅ | ✅ |
| Promise | ❌ | ✅ |
| Condițional | ❌ | ✅ |
| Bucle | ❌ | ✅ |`
  },
  {
    lessonContains: "TanStack Query avansat",
    titleContains: "Prefetching",
    content: `**Prefetching și Hydration SSR** în TanStack Query — preîncărcarea datelor pe server și transmiterea lor la client pentru performanță optimă.

**Conceptul Prefetching:**
\`\`\`
Fără prefetching:
- Browser încarcă pagina → Component randează → useQuery → Loading... → Date afișate

Cu prefetching:
- Server preîncarcă date → Trimite la client → Component randează cu date DEJA disponibile
\`\`\`

**Setup Hydration (Next.js App Router):**
\`\`\`tsx
// app/layout.tsx
import { QueryClient, dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getQueryClient } from './get-query-client';

// Singleton QueryClient pe server (cu React cache())
import { cache } from 'react';
export const getQueryClient = cache(() => new QueryClient());
\`\`\`

\`\`\`tsx
// app/products/page.tsx (Server Component)
async function ProductsPage() {
  const queryClient = getQueryClient();

  // Prefetch pe server
  await queryClient.prefetchQuery({
    queryKey: ['products'],
    queryFn: () => fetch('/api/products').then(r => r.json())
  });

  // Serializare + trimitere la client
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductList /> {/* Client Component — primește datele deja în cache */}
    </HydrationBoundary>
  );
}

// app/products/ProductList.tsx ('use client')
'use client';
function ProductList() {
  // Data e deja în cache — fără loading initial!
  const { data: products } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts
  });

  return <ul>{products?.map(p => <li key={p.id}>{p.name}</li>)}</ul>;
}
\`\`\`

**Prefetch la hover (client-side):**
\`\`\`tsx
import { useQueryClient } from '@tanstack/react-query';

function ProductLink({ productId }) {
  const queryClient = useQueryClient();

  // Preîncarcă datele la hover, înainte de click
  const prefetch = () => queryClient.prefetchQuery({
    queryKey: ['product', productId],
    queryFn: () => fetchProduct(productId),
    staleTime: 60 * 1000
  });

  return (
    <Link href={\`/products/\${productId}\`} onMouseEnter={prefetch}>
      Vezi produs
    </Link>
  );
}
\`\`\`

**Suspense mode cu SSR:**
\`\`\`tsx
// Client Component cu Suspense
const { data } = useSuspenseQuery({ queryKey: ['products'], queryFn: fetchProducts });
// Datele sunt garantat disponibile — fără loading state necesar
\`\`\``
  },
  {
    lessonContains: "TanStack Query avansat",
    titleContains: "Infinite",
    content: `**Infinite Queries** în TanStack Query implementează scroll infinit sau paginare cu "load more" — fetch automat de pagini noi pe măsură ce utilizatorul derulează.

**useInfiniteQuery — setup:**
\`\`\`tsx
import { useInfiniteQuery } from '@tanstack/react-query';

interface PostsPage {
  posts: Post[];
  nextCursor: string | null;
  total: number;
}

async function fetchPosts({ pageParam }: { pageParam: string | null }) {
  const url = pageParam
    ? \`/api/posts?cursor=\${pageParam}\`
    : '/api/posts';
  return fetch(url).then(r => r.json()) as Promise<PostsPage>;
}

function InfinitePostList() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError
  } = useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.nextCursor, // null = no more pages
    // getPreviousPageParam: pentru scroll infinit bidirecțional
  });

  // Unire toate paginile într-un array flat
  const allPosts = data?.pages.flatMap(page => page.posts) ?? [];

  if (isLoading) return <Spinner />;
  if (isError) return <p>Eroare la încărcare</p>;

  return (
    <div>
      <ul>
        {allPosts.map(post => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.excerpt}</p>
          </li>
        ))}
      </ul>

      {hasNextPage && (
        <button
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
        >
          {isFetchingNextPage ? 'Se încarcă...' : 'Încarcă mai multe'}
        </button>
      )}
    </div>
  );
}
\`\`\`

**Scroll infinit automat cu Intersection Observer:**
\`\`\`tsx
import { useRef, useEffect } from 'react';

function AutoInfiniteList() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['items'],
    queryFn: ({ pageParam = 0 }) => fetchPage(pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => lastPage.hasMore ? pages.length : undefined
  });

  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    });

    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const allItems = data?.pages.flatMap(p => p.items) ?? [];

  return (
    <ul>
      {allItems.map(item => <li key={item.id}>{item.name}</li>)}
      <div ref={loaderRef}>
        {isFetchingNextPage && <Spinner />}
        {!hasNextPage && allItems.length > 0 && <p>Toate elementele încărcate</p>}
      </div>
    </ul>
  );
}
\`\`\``
  },
  {
    lessonContains: "TanStack Query avansat",
    titleContains: "Optimistic Updates",
    content: `**Optimistic Updates cu useMutation** în TanStack Query — actualizarea imediată a cache-ului înainte de confirmarea serverului, cu rollback automat la eroare.

**Pattern complet optimistic update:**
\`\`\`tsx
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface Todo { id: string; text: string; done: boolean }

async function toggleTodo(todo: Todo): Promise<Todo> {
  const res = await fetch(\`/api/todos/\${todo.id}\`, {
    method: 'PATCH',
    body: JSON.stringify({ done: !todo.done }),
    headers: { 'Content-Type': 'application/json' }
  });
  if (!res.ok) throw new Error('Update failed');
  return res.json();
}

function TodoItem({ todo }: { todo: Todo }) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: toggleTodo,

    // 1. Actualizare optimistă ÎNAINTE de request
    onMutate: async (updatedTodo) => {
      // Anulează re-fetch-uri în curs (evită suprascrierea optimistic update)
      await queryClient.cancelQueries({ queryKey: ['todos'] });

      // Snapshot pentru rollback
      const previousTodos = queryClient.getQueryData<Todo[]>(['todos']);

      // Actualizare imediată în cache
      queryClient.setQueryData<Todo[]>(['todos'], (old = []) =>
        old.map(t => t.id === updatedTodo.id ? { ...t, done: !t.done } : t)
      );

      // Returnăm snapshot-ul pentru onError
      return { previousTodos };
    },

    // 2. Rollback la eroare
    onError: (err, variables, context) => {
      if (context?.previousTodos) {
        queryClient.setQueryData(['todos'], context.previousTodos);
      }
      toast.error('Actualizare eșuată');
    },

    // 3. Sync final cu serverul (succes sau eroare)
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    }
  });

  return (
    <li
      style={{ opacity: mutation.isPending ? 0.6 : 1 }}
      onClick={() => mutation.mutate(todo)}
    >
      <input type="checkbox" checked={todo.done} readOnly />
      {todo.text}
    </li>
  );
}
\`\`\`

**Delete optimistic:**
\`\`\`tsx
const deleteMutation = useMutation({
  mutationFn: (id: string) => fetch(\`/api/items/\${id}\`, { method: 'DELETE' }),
  onMutate: async (id) => {
    await queryClient.cancelQueries({ queryKey: ['items'] });
    const prev = queryClient.getQueryData<Item[]>(['items']);
    queryClient.setQueryData<Item[]>(['items'], old => old?.filter(i => i.id !== id));
    return { prev };
  },
  onError: (_, __, ctx) => {
    if (ctx?.prev) queryClient.setQueryData(['items'], ctx.prev);
  },
  onSettled: () => queryClient.invalidateQueries({ queryKey: ['items'] })
});
\`\`\``
  },
  {
    lessonContains: "React Hook Form avansat",
    titleContains: "Formulare nested",
    content: `**Formulare nested și validare avansată** cu React Hook Form — câmpuri dinamice (FieldArray), nested objects, și schema Zod complexă.

**useFieldArray — câmpuri dinamice:**
\`\`\`tsx
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  numeEchipa: z.string().min(1),
  membri: z.array(z.object({
    nume: z.string().min(2, 'Minim 2 caractere'),
    email: z.string().email('Email invalid'),
    rol: z.enum(['lead', 'dev', 'designer', 'qa'])
  })).min(1, 'Echipa trebuie să aibă cel puțin un membru')
});

type EchipaForm = z.infer<typeof schema>;

function EchipaFormular() {
  const { register, control, handleSubmit, formState: { errors } } = useForm<EchipaForm>({
    resolver: zodResolver(schema),
    defaultValues: {
      numeEchipa: '',
      membri: [{ nume: '', email: '', rol: 'dev' }]
    }
  });

  // useFieldArray gestionează array-ul de membri
  const { fields, append, remove, move } = useFieldArray({
    control,
    name: 'membri'
  });

  const onSubmit = (data: EchipaForm) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('numeEchipa')} placeholder="Numele echipei" />
      {errors.numeEchipa && <p>{errors.numeEchipa.message}</p>}

      <h3>Membri ({fields.length})</h3>
      {fields.map((field, index) => (
        <div key={field.id} className="member-row">
          <input
            {...register(\`membri.\${index}.nume\`)}
            placeholder="Nume"
          />
          {errors.membri?.[index]?.nume && (
            <p>{errors.membri[index].nume.message}</p>
          )}

          <input
            {...register(\`membri.\${index}.email\`)}
            placeholder="Email"
          />
          {errors.membri?.[index]?.email && (
            <p>{errors.membri[index].email.message}</p>
          )}

          <select {...register(\`membri.\${index}.rol\`)}>
            <option value="lead">Tech Lead</option>
            <option value="dev">Developer</option>
            <option value="designer">Designer</option>
            <option value="qa">QA</option>
          </select>

          <button type="button" onClick={() => remove(index)} disabled={fields.length === 1}>
            Elimină
          </button>
        </div>
      ))}

      {errors.membri?.root && <p>{errors.membri.root.message}</p>}

      <button type="button" onClick={() => append({ nume: '', email: '', rol: 'dev' })}>
        + Adaugă membru
      </button>

      <button type="submit">Salvează echipa</button>
    </form>
  );
}
\`\`\`

**Watch și setValue pentru câmpuri dependente:**
\`\`\`tsx
const { watch, setValue } = useForm();
const tipLivrare = watch('tipLivrare');

// Resetare câmpuri când tipul se schimbă
useEffect(() => {
  if (tipLivrare === 'ridicare') {
    setValue('adresa', '');
    setValue('oras', '');
  }
}, [tipLivrare, setValue]);
\`\`\``
  },
  {
    lessonContains: "Accesibilitate",
    titleContains: "ARIA roles",
    content: `**ARIA (Accessible Rich Internet Applications)** extinde semantica HTML cu atribute care fac aplicațiile React accesibile screen reader-ilor și tehnologiilor asistive.

**Regula #1 — Folosește HTML semantic mai întâi:**
\`\`\`jsx
// ❌ ARIA inutil — <button> are deja rol "button"
<button role="button" aria-label="Click">Click</button>

// ✅ HTML semantic
<button onClick={handleClick}>Salvează</button>

// ❌ Div cu click — nu e accesibil
<div onClick={toggle} style={{ cursor: 'pointer' }}>Toggle</div>

// ✅ Buton semantic
<button onClick={toggle}>Toggle</button>
\`\`\`

**Roluri ARIA comune:**
\`\`\`jsx
// Dialog/Modal
<div role="dialog" aria-modal="true" aria-labelledby="modal-title">
  <h2 id="modal-title">Confirmare ștergere</h2>
  <p>Ești sigur că vrei să ștergi?</p>
  <button onClick={onConfirm}>Confirmă</button>
  <button onClick={onClose}>Anulează</button>
</div>

// Alert
<div role="alert">
  Eroare: Email-ul nu este valid
</div>

// Status (non-urgente)
<div role="status" aria-live="polite">
  Salvat cu succes!
</div>

// Progressbar
<div
  role="progressbar"
  aria-valuenow={75}
  aria-valuemin={0}
  aria-valuemax={100}
  aria-label="Progres upload"
>
  <div style={{ width: '75%' }} />
</div>
\`\`\`

**aria-label și aria-labelledby:**
\`\`\`jsx
// aria-label — când nu există text vizibil
<button aria-label="Închide dialogul" onClick={onClose}>
  <XIcon />
</button>

// aria-labelledby — referință la element existent
<section aria-labelledby="sectiune-title">
  <h2 id="sectiune-title">Produse recomandate</h2>
  {/* ... */}
</section>

// aria-describedby — descriere suplimentară
<input
  aria-describedby="email-help"
  type="email"
/>
<p id="email-help">Formatul: exemplu@domeniu.com</p>
\`\`\`

**aria-expanded și aria-controls:**
\`\`\`jsx
function Accordion({ id, isOpen, onToggle, title, children }) {
  return (
    <div>
      <button
        aria-expanded={isOpen}
        aria-controls={\`panel-\${id}\`}
        onClick={onToggle}
      >
        {title}
      </button>
      <div
        id={\`panel-\${id}\`}
        role="region"
        aria-labelledby={\`btn-\${id}\`}
        hidden={!isOpen}
      >
        {children}
      </div>
    </div>
  );
}
\`\`\`

**Navigare cu tastatură:**
\`\`\`jsx
// Focus management în modal
function Modal({ onClose }) {
  const firstFocusRef = useRef(null);
  useEffect(() => { firstFocusRef.current?.focus(); }, []);

  return (
    <div role="dialog" aria-modal="true">
      <button ref={firstFocusRef} onClick={onClose}>Închide</button>
      {/* trap focus în modal cu tabIndex */}
    </div>
  );
}
\`\`\``
  },
  {
    lessonContains: "Accesibilitate",
    titleContains: "Live regions",
    content: `**Live regions** anunță automat screen reader-ilor când conținut dinamic se schimbă — esențial pentru mesaje de eroare, notificări, rezultate de căutare și actualizări de status.

**aria-live atributes:**
\`\`\`jsx
// aria-live="polite" — anunță la finalul vorbirii curente (recomandat pentru non-urgente)
function SearchResults({ results, loading }) {
  return (
    <div>
      <div aria-live="polite" aria-atomic="true">
        {loading ? 'Se caută...' : \`\${results.length} rezultate găsite\`}
      </div>
      <ul>
        {results.map(r => <li key={r.id}>{r.title}</li>)}
      </ul>
    </div>
  );
}

// aria-live="assertive" — întrerupe vorbirea curentă (doar pentru erori critice)
function ErrorMessage({ error }) {
  return error ? (
    <div role="alert" aria-live="assertive">
      Eroare critică: {error}
    </div>
  ) : null;
}

// role="status" = aria-live="polite" implicit
// role="alert" = aria-live="assertive" implicit
\`\`\`

**Anunțuri programatice:**
\`\`\`jsx
// Hook pentru anunțuri accesibile
function useAnnouncer() {
  const [message, setMessage] = useState('');

  const announce = useCallback((msg, delay = 100) => {
    // Delay mic pentru a asigura că screen reader-ul prinde schimbarea
    setMessage('');
    setTimeout(() => setMessage(msg), delay);
  }, []);

  return { announce, AnnouncerElement: (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      style={{
        position: 'absolute',
        width: '1px',
        height: '1px',
        overflow: 'hidden',
        clip: 'rect(0,0,0,0)'
      }}
    >
      {message}
    </div>
  )};
}

// Utilizare
function ShoppingCart() {
  const { announce, AnnouncerElement } = useAnnouncer();

  const addToCart = (item) => {
    addItem(item);
    announce(\`\${item.name} adăugat în coș. \${cartCount + 1} produse în coș.\`);
  };

  return (
    <div>
      {AnnouncerElement}
      {products.map(p => (
        <button key={p.id} onClick={() => addToCart(p)}>
          Adaugă {p.name}
        </button>
      ))}
    </div>
  );
}
\`\`\`

**Formulare accesibile:**
\`\`\`jsx
function AccessibleForm() {
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  return (
    <form aria-label="Formular de contact" noValidate>
      {/* Erori sumarizate la submit */}
      {submitted && Object.keys(errors).length > 0 && (
        <div role="alert" aria-live="assertive">
          <h3>Formular invalid:</h3>
          <ul>
            {Object.entries(errors).map(([field, err]) => (
              <li key={field}><a href={\`#\${field}\`}>{err}</a></li>
            ))}
          </ul>
        </div>
      )}

      <label htmlFor="email">Email *</label>
      <input
        id="email"
        type="email"
        aria-required="true"
        aria-invalid={!!errors.email}
        aria-describedby={errors.email ? "email-error" : undefined}
      />
      {errors.email && (
        <span id="email-error" role="alert">{errors.email}</span>
      )}
    </form>
  );
}
\`\`\``
  },
  {
    lessonContains: "Accesibilitate",
    titleContains: "Testare a11y",
    content: `**Testarea accesibilității** cu jest-axe, eslint-plugin-jsx-a11y și utilizarea corectă a RTL queries pentru a garanta că aplicația e accesibilă.

**jest-axe — testare automată a11y:**
\`\`\`bash
npm install -D jest-axe @types/jest-axe
\`\`\`

\`\`\`jsx
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { describe, it, expect } from 'vitest';
import LoginForm from './LoginForm';

expect.extend(toHaveNoViolations);

describe('LoginForm accessibility', () => {
  it('should have no axe violations', async () => {
    const { container } = render(<LoginForm />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('shows error with proper aria attributes', async () => {
    const { container, getByRole } = render(<LoginForm />);

    // Submit cu câmpuri goale
    await userEvent.click(getByRole('button', { name: /autentificare/i }));

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
\`\`\`

**eslint-plugin-jsx-a11y — linting:**
\`\`\`bash
npm install -D eslint-plugin-jsx-a11y
\`\`\`

\`\`\`json
// .eslintrc.json
{
  "plugins": ["jsx-a11y"],
  "extends": ["plugin:jsx-a11y/recommended"],
  "rules": {
    "jsx-a11y/anchor-is-valid": "error",
    "jsx-a11y/click-events-have-key-events": "error",
    "jsx-a11y/interactive-supports-focus": "error",
    "jsx-a11y/label-has-associated-control": "error"
  }
}
\`\`\`

**Testing Library — queries accesibile:**
\`\`\`jsx
// Prioritatea queries în ordinea accesibilității:

// 1. getByRole — cel mai semantic
const button = screen.getByRole('button', { name: /salvează/i });
const input = screen.getByRole('textbox', { name: /email/i });
const checkbox = screen.getByRole('checkbox', { name: /accept termeni/i });

// 2. getByLabelText
const password = screen.getByLabelText('Parolă');

// 3. getByText
const heading = screen.getByText('Bun venit!');

// 4. Testare focus management
it('modal traps focus', async () => {
  const user = userEvent.setup();
  render(<ModalDemo />);

  await user.click(screen.getByRole('button', { name: /deschide modal/i }));
  expect(screen.getByRole('dialog')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /închide/i })).toHaveFocus();

  await user.keyboard('{Tab}');
  expect(screen.getByRole('button', { name: /confirmă/i })).toHaveFocus();
});
\`\`\`

**Checklist accesibilitate React:**
• ✅ Toate elementele interactive sunt butoane sau link-uri semantice
• ✅ Imaginile au \`alt\` descriptiv (sau alt="" dacă decorative)
• ✅ Formularele au \`label\` asociat cu \`htmlFor\`
• ✅ Culorile au contrast minim 4.5:1
• ✅ Focus vizibil pe toate elementele interactive`
  },
  {
    lessonContains: "Micro-frontends",
    titleContains: "Module Federation",
    content: `**Module Federation** (Webpack 5) permite mai multor aplicații React independente să partajeze cod la runtime — fiecare aplicație poate expune și consuma module de la alte aplicații.

**Conceptul Micro-frontends:**
\`\`\`
Aplicație monolith:          Micro-frontends:
┌────────────────────┐       ┌──────┐ ┌──────┐ ┌──────┐
│   React App        │  →    │ App1 │ │ App2 │ │ App3 │
│   (tot codul)      │       │ Team1│ │ Team2│ │ Team3│
└────────────────────┘       └──────┘ └──────┘ └──────┘
                                    ↘    ↓    ↙
                                  ┌──────────────┐
                                  │  Shell App   │
                                  │  (orchestrare)│
                                  └──────────────┘
\`\`\`

**Configurare Webpack Module Federation:**
\`\`\`javascript
// webpack.config.js — Aplicație care EXPUNE module (Remote)
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

module.exports = {
  plugins: [
    new ModuleFederationPlugin({
      name: 'productsMfe',          // Identificator unic
      filename: 'remoteEntry.js',   // Bundle entry point
      exposes: {
        // Rutele expuse
        './ProductList': './src/components/ProductList',
        './ProductCard': './src/components/ProductCard',
        './useCart': './src/hooks/useCart'
      },
      shared: {
        react: { singleton: true, requiredVersion: '^18.0.0' },
        'react-dom': { singleton: true }
        // singleton: true = o singură instanță partajată
      }
    })
  ]
};

// webpack.config.js — Aplicație HOST (Shell) care CONSUMĂ
module.exports = {
  plugins: [
    new ModuleFederationPlugin({
      name: 'shell',
      remotes: {
        productsMfe: 'productsMfe@http://localhost:3001/remoteEntry.js',
        cartMfe: 'cartMfe@http://localhost:3002/remoteEntry.js'
      },
      shared: {
        react: { singleton: true },
        'react-dom': { singleton: true }
      }
    })
  ]
};
\`\`\`

**Consum în Shell App:**
\`\`\`jsx
// Shell App — import lazy din remote
import { lazy, Suspense } from 'react';

// Importul apelează remoteEntry.js la runtime
const ProductList = lazy(() => import('productsMfe/ProductList'));
const CartSummary = lazy(() => import('cartMfe/CartSummary'));

function App() {
  return (
    <div>
      <Suspense fallback={<div>Încărcare produse...</div>}>
        <ProductList />
      </Suspense>
      <Suspense fallback={<div>Încărcare coș...</div>}>
        <CartSummary />
      </Suspense>
    </div>
  );
}
\`\`\`

**Avantaje:** teams independente, deployments separate, tech stack diferit per micro-frontend. **Dezavantaje**: complexitate crescută, debugging dificil, coordonare shared dependencies.`
  },
  {
    lessonContains: "Micro-frontends",
    titleContains: "single-spa",
    content: `**single-spa** este un framework pentru orchestrarea micro-frontends — permite integrarea de aplicații React, Vue, Angular și alte framework-uri în aceeași pagină.

**Conceptul single-spa:**
\`\`\`
single-spa root config (orchestrator)
├── @org/navbar (React) — mereu montat
├── @org/home (React) — / și /home
├── @org/products (Vue) — /products/**
└── @org/checkout (Angular) — /checkout/**
\`\`\`

**Structura unui micro-frontend React cu single-spa:**
\`\`\`bash
npx create-single-spa --moduleType app-parcel --framework react
\`\`\`

\`\`\`jsx
// src/root.component.jsx — componenta principală a micro-frontend-ului
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

export default function Root() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/products" component={ProductList} />
        <Route path="/products/:id" component={ProductDetail} />
      </Switch>
    </BrowserRouter>
  );
}
\`\`\`

\`\`\`javascript
// src/products-mfe.js — lifecycle hooks single-spa
import React from 'react';
import ReactDOM from 'react-dom';
import singleSpaReact from 'single-spa-react';
import Root from './root.component';

const lifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: Root,
  errorBoundary(err, info, props) {
    return <div>Eroare în products MFE</div>;
  }
});

// Lifecycles necesare de single-spa
export const { bootstrap, mount, unmount } = lifecycles;
\`\`\`

**Root config — orchestratorul:**
\`\`\`javascript
// src/index.js — root config
import { registerApplication, start } from 'single-spa';

registerApplication({
  name: '@org/navbar',
  app: () => System.import('@org/navbar'),  // SystemJS pentru lazy loading
  activeWhen: ['/'],  // Mereu activ
});

registerApplication({
  name: '@org/products',
  app: () => System.import('@org/products'),
  activeWhen: ['/products'],
});

registerApplication({
  name: '@org/checkout',
  app: () => System.import('@org/checkout'),
  activeWhen: (location) => location.pathname.startsWith('/checkout'),
  customProps: { apiUrl: 'https://api.example.com' }
});

start({ urlRerouteOnly: true });
\`\`\`

**Comunicare între micro-frontends:**
\`\`\`javascript
// Custom events (pub/sub simplu)
// Emitere din Products MFE
window.dispatchEvent(new CustomEvent('addToCart', { detail: { product } }));

// Ascultare în Cart MFE
window.addEventListener('addToCart', (e) => updateCart(e.detail.product));

// Sau: shared state via import maps + module singleton
\`\`\``
  },
  {
    lessonContains: "React Native",
    titleContains: "React Native vs React Web",
    content: `**React Native vs React Web** — aceleași concepte React, dar primitive diferite, styling diferit, și APIs native pentru fiecare platformă.

**Diferențe fundamentale:**

| Aspect | React Web | React Native |
|--------|-----------|--------------|
| Elemente | \`<div>\`, \`<p>\`, \`<img>\` | \`<View>\`, \`<Text>\`, \`<Image>\` |
| Styling | CSS classes / CSS-in-JS | StyleSheet (subset CSS) |
| Navigare | React Router (URL) | React Navigation (stack) |
| Build output | Bundle JS → browser | Native app (iOS/Android) |
| Layout | CSS Flexbox + Grid | Flexbox only (coloană default) |
| Animații | CSS, Framer Motion | Animated API, Reanimated |

**Echivalențe Web → Native:**
\`\`\`jsx
// WEB
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div style={{ padding: '20px' }}>
      <p>Count: {count}</p>
      <button onClick={() => setCount(c => c+1)}>Increment</button>
    </div>
  );
}

// REACT NATIVE
import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

function Counter() {
  const [count, setCount] = useState(0);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Count: {count}</Text>
      <TouchableOpacity style={styles.button} onPress={() => setCount(c => c+1)}>
        <Text>Increment</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  text: { fontSize: 18, marginBottom: 10 },
  button: { backgroundColor: '#007AFF', padding: 12, borderRadius: 8 }
});
\`\`\`

**Primitive React Native:**
\`\`\`jsx
import {
  View,          // div — container
  Text,          // p, span — text OBLIGATORIU în Text
  Image,         // img
  TextInput,     // input
  ScrollView,    // div cu overflow-y: scroll
  FlatList,      // Virtualizare automată pt liste
  TouchableOpacity, // button cu feedback vizual
  Pressable,     // button cu stări pressed/hovered
  SafeAreaView,  // Evită notch și bottom bar
  Modal,         // Modal nativ
  ActivityIndicator // Spinner
} from 'react-native';
\`\`\`

**Styling — StyleSheet.create:**
\`\`\`jsx
// StyleSheet.create — validare la development, optimizare la producție
const styles = StyleSheet.create({
  container: {
    flex: 1,              // flex: 1 = umple spațiul disponibil
    flexDirection: 'row', // Default este 'column' în RN (opus Web!)
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a1a1a'
    // Nu există: CSS classes, pseudoclases, calc(), vw/vh (use Dimensions API)
  }
});
\`\`\``
  },
  {
    lessonContains: "React Native",
    titleContains: "Expo",
    content: `**Expo** este platforma recomandată pentru a începe cu React Native — zero config, APIs native gata de folosit, over-the-air updates și build în cloud.

**Avantajele Expo:**
• **Zero setup nativ** — nu trebuie Xcode sau Android Studio
• **Expo Go app** — testare instant pe device fizic prin QR code
• **Expo SDK** — APIs native unificate (camera, locație, notificări, etc.)
• **EAS Build** — build în cloud, fără Mac pentru iOS
• **OTA Updates** — actualizări fără App Store review

**Setup rapid:**
\`\`\`bash
npx create-expo-app MyApp --template blank
cd MyApp
npx expo start

# Scanează QR cu Expo Go app pe iPhone/Android
\`\`\`

**Structura unui proiect Expo:**
\`\`\`
MyApp/
├── app/               # Expo Router (file-based routing)
│   ├── (tabs)/
│   │   ├── index.tsx  # Tab 1
│   │   └── profile.tsx # Tab 2
│   ├── _layout.tsx    # Root layout
│   └── modal.tsx
├── components/
├── hooks/
├── assets/
└── app.json           # Configurare Expo
\`\`\`

**Expo APIs native:**
\`\`\`jsx
import { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';
import * as Notifications from 'expo-notifications';
import { Camera } from 'expo-camera';

// Locație GPS
async function getLocation() {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') return;
  const loc = await Location.getCurrentPositionAsync({});
  console.log(loc.coords.latitude, loc.coords.longitude);
}

// Galerie foto
async function pickImage() {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    quality: 0.8,
    allowsEditing: true,
    aspect: [4, 3]
  });
  if (!result.canceled) {
    const imageUri = result.assets[0].uri;
    setImage(imageUri);
  }
}
\`\`\`

**Expo Router — navigare bazată pe fișiere:**
\`\`\`tsx
// app/(tabs)/_layout.tsx
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: '#007AFF' }}>
      <Tabs.Screen name="index" options={{ title: 'Acasă', tabBarIcon: () => <HomeIcon /> }} />
      <Tabs.Screen name="profile" options={{ title: 'Profil' }} />
    </Tabs>
  );
}

// app/(tabs)/index.tsx — pagina Home
import { Link } from 'expo-router';
export default function HomeScreen() {
  return (
    <View>
      <Text>Acasă</Text>
      <Link href="/profile">Mergi la profil</Link>
      <Link href="/modal">Deschide modal</Link>
    </View>
  );
}
\`\`\``
  },
  {
    lessonContains: "Testing avansat",
    titleContains: "MSW",
    content: `**MSW (Mock Service Worker)** interceptează cererile HTTP la nivel de network — testele lucrează cu mock-uri realiste fără a schimba codul sursă.

**De ce MSW față de jest.mock(fetch):**
• Interceptează la nivel de Service Worker (browser) sau msw/node (Node.js)
• Mock-urile seamănă cu API-ul real (Request/Response)
• Același cod de mock pentru tests și development
• Nu modifici codul sursă pentru teste

**Instalare și setup:**
\`\`\`bash
npm install -D msw
\`\`\`

\`\`\`javascript
// src/mocks/handlers.js — definiție handlers
import { http, HttpResponse } from 'msw';

export const handlers = [
  // GET /api/users
  http.get('/api/users', () => {
    return HttpResponse.json([
      { id: '1', name: 'Ana Pop', email: 'ana@example.com' },
      { id: '2', name: 'Mihai Ion', email: 'mihai@example.com' }
    ]);
  }),

  // GET /api/users/:id
  http.get('/api/users/:id', ({ params }) => {
    const { id } = params;
    if (id === '999') {
      return new HttpResponse(null, { status: 404 });
    }
    return HttpResponse.json({ id, name: 'Ana Pop', email: 'ana@example.com' });
  }),

  // POST /api/users
  http.post('/api/users', async ({ request }) => {
    const body = await request.json();
    return HttpResponse.json(
      { id: 'new-id', ...body },
      { status: 201 }
    );
  })
];
\`\`\`

\`\`\`javascript
// src/mocks/server.js — server pentru Node.js (teste)
import { setupServer } from 'msw/node';
import { handlers } from './handlers';
export const server = setupServer(...handlers);
\`\`\`

\`\`\`javascript
// test-setup.js
import { server } from './src/mocks/server';
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => server.resetHandlers()); // Reset după fiecare test
afterAll(() => server.close());
\`\`\`

**Utilizare în teste:**
\`\`\`jsx
import { render, screen } from '@testing-library/react';
import { server } from '../mocks/server';
import { http, HttpResponse } from 'msw';

it('shows users list', async () => {
  render(<UserList />);
  const users = await screen.findAllByRole('listitem');
  expect(users).toHaveLength(2);
  expect(screen.getByText('Ana Pop')).toBeInTheDocument();
});

it('handles error', async () => {
  // Override pentru acest test specific
  server.use(
    http.get('/api/users', () => new HttpResponse(null, { status: 500 }))
  );
  render(<UserList />);
  expect(await screen.findByText(/eroare/i)).toBeInTheDocument();
});
\`\`\``
  },
  {
    lessonContains: "Testing avansat",
    titleContains: "Custom render",
    content: `**Custom render** permite configurarea unui wrapper global pentru toate testele — providers (QueryClient, Router, ThemeProvider) aplicați automat.

**Problema — setup repetat:**
\`\`\`jsx
// ❌ Fără custom render — boilerplate repetat
it('test 1', () => {
  render(
    <QueryClientProvider client={new QueryClient()}>
      <BrowserRouter>
        <ThemeProvider>
          <MyComponent />
        </ThemeProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
});
\`\`\`

**Custom render wrapper:**
\`\`\`jsx
// src/test-utils.jsx
import { render } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';

function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,          // Nu retry în teste
        staleTime: Infinity    // Nu re-fetch automat în teste
      }
    }
  });
}

function AllProviders({ children, initialEntries = ['/'] }) {
  const queryClient = createTestQueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={initialEntries}>
        <ThemeProvider defaultTheme="light">
          {children}
        </ThemeProvider>
      </MemoryRouter>
    </QueryClientProvider>
  );
}

// Custom render cu providers
function customRender(ui, { initialEntries, ...options } = {}) {
  return render(ui, {
    wrapper: (props) => <AllProviders {...props} initialEntries={initialEntries} />,
    ...options
  });
}

// Re-export tot din RTL + custom render
export * from '@testing-library/react';
export { customRender as render }; // Override render cu custom
\`\`\`

**Utilizare — import din test-utils:**
\`\`\`jsx
// ProductPage.test.jsx
// ✅ Import din test-utils, nu din @testing-library/react
import { render, screen, waitFor } from '../test-utils';
import ProductPage from '../pages/ProductPage';

it('loads and displays product', async () => {
  render(<ProductPage productId="1" />);
  // Toți providerii sunt deja configurați!
  expect(await screen.findByText('Laptop Dell')).toBeInTheDocument();
});

it('navigates to /products on back', async () => {
  const user = userEvent.setup();
  render(<ProductPage productId="1" />, { initialEntries: ['/products/1'] });
  await user.click(screen.getByRole('link', { name: /înapoi/i }));
  expect(screen.getByText('Lista produse')).toBeInTheDocument();
});
\`\`\`

**Testing hooks cu renderHook:**
\`\`\`jsx
import { renderHook, act } from '../test-utils';
import { useCart } from '../hooks/useCart';

it('adds item to cart', () => {
  const { result } = renderHook(() => useCart());
  act(() => result.current.addItem({ id: '1', name: 'Laptop', price: 3500 }));
  expect(result.current.items).toHaveLength(1);
  expect(result.current.total).toBe(3500);
});
\`\`\``
  },
  {
    lessonContains: "Mini Proiect React Final",
    titleContains: "Arhitectura",
    content: `**Arhitectura proiectului E-Commerce** — structură scalabilă, separarea responsabilităților și pattern-urile de producție pentru un magazin online complet.

**Structura proiectului:**
\`\`\`
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout cu Providers
│   ├── page.tsx            # Homepage
│   ├── products/
│   │   ├── page.tsx        # Lista produse
│   │   └── [id]/page.tsx   # Detalii produs
│   ├── cart/page.tsx
│   ├── checkout/page.tsx
│   └── api/                # API Routes
│       ├── products/route.ts
│       └── orders/route.ts
├── components/
│   ├── ui/                 # Butoane, Input, Badge, Skeleton
│   ├── product/            # ProductCard, ProductGrid, ProductFilters
│   ├── cart/               # CartItem, CartDrawer, CartBadge
│   └── checkout/           # OrderForm, PaymentForm, OrderSummary
├── stores/
│   ├── cartStore.ts        # Zustand + persist
│   └── uiStore.ts          # Modal, toast, sidebar state
├── hooks/
│   ├── useProducts.ts      # React Query hooks
│   ├── useCart.ts          # Cart operations
│   └── useCheckout.ts      # Checkout flow
├── lib/
│   ├── api.ts              # Fetch functions
│   ├── utils.ts            # formatPrice, cn(), etc.
│   └── constants.ts        # ITEMS_PER_PAGE, etc.
└── types/
    └── index.ts            # Tipuri TypeScript
\`\`\`

**Providers globali:**
\`\`\`tsx
// app/layout.tsx
import { QueryClientProvider } from '@tanstack/react-query';
import { getQueryClient } from '@/lib/get-query-client';
import { Toaster } from 'sonner';

export default function RootLayout({ children }) {
  const queryClient = getQueryClient();
  return (
    <html lang="ro">
      <body>
        <QueryClientProvider client={queryClient}>
          <Header />
          <main>{children}</main>
          <Footer />
          <CartDrawer />
          <Toaster richColors position="top-right" />
        </QueryClientProvider>
      </body>
    </html>
  );
}
\`\`\`

**Tipuri TypeScript:**
\`\`\`typescript
// types/index.ts
export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  comparePrice?: number;
  images: string[];
  category: string;
  stock: number;
  rating: number;
  reviews: number;
}

export interface CartItem extends Product {
  qty: number;
  variantId?: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: Address;
  createdAt: Date;
}
\`\`\``
  },
  {
    lessonContains: "Mini Proiect React Final",
    titleContains: "Cart cu Zustand",
    content: `**Cart cu Zustand și persist** — implementare completă a coșului de cumpărături cu persistare localStorage, calcule derivate și integrare checkout.

**Cart Store complet:**
\`\`\`typescript
// stores/cartStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface CartItem {
  id: string; name: string; price: number;
  image: string; qty: number; variantId?: string;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;

  // Actions
  addItem: (product: Omit<CartItem, 'qty'>) => void;
  removeItem: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;

  // Computed (via get)
  itemCount: () => number;
  subtotal: () => number;
  shipping: () => number;
  total: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (product) => {
        set(state => {
          const existing = state.items.find(i => i.id === product.id);
          if (existing) {
            return { items: state.items.map(i =>
              i.id === product.id ? { ...i, qty: i.qty + 1 } : i
            )};
          }
          return { items: [...state.items, { ...product, qty: 1 }] };
        });
        get().openCart(); // Deschide cart drawer la adăugare
      },

      removeItem: (id) => set(state => ({
        items: state.items.filter(i => i.id !== id)
      })),

      updateQty: (id, qty) => set(state => ({
        items: qty <= 0
          ? state.items.filter(i => i.id !== id)
          : state.items.map(i => i.id === id ? { ...i, qty } : i)
      })),

      clearCart: () => set({ items: [] }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      itemCount: () => get().items.reduce((n, i) => n + i.qty, 0),
      subtotal: () => get().items.reduce((s, i) => s + i.price * i.qty, 0),
      shipping: () => get().subtotal() > 299 ? 0 : 19.99,
      total: () => get().subtotal() + get().shipping()
    }),
    {
      name: 'ecommerce-cart',
      partialize: (state) => ({ items: state.items }) // Salvează doar items
    }
  )
);

// Hook selectori optimizați
export const useCartItems = () => useCartStore(s => s.items);
export const useCartCount = () => useCartStore(s => s.itemCount());
export const useCartTotal = () => useCartStore(s => s.total());
export const useCartActions = () => useCartStore(s => ({
  addItem: s.addItem,
  removeItem: s.removeItem,
  updateQty: s.updateQty,
  clearCart: s.clearCart
}));
\`\`\`

**Cart Drawer UI:**
\`\`\`tsx
function CartDrawer() {
  const { isOpen, closeCart } = useCartStore(s => ({ isOpen: s.isOpen, closeCart: s.closeCart }));
  const items = useCartItems();
  const { subtotal, shipping, total } = useCartStore(s => ({
    subtotal: s.subtotal(), shipping: s.shipping(), total: s.total()
  }));

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.aside
          initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
          className="cart-drawer"
          aria-label="Coș de cumpărături"
          role="dialog"
        >
          <header>
            <h2>Coșul meu</h2>
            <button onClick={closeCart} aria-label="Închide coșul">✕</button>
          </header>
          <ul>{items.map(item => <CartItem key={item.id} item={item} />)}</ul>
          <footer>
            <p>Subtotal: {formatPrice(subtotal)}</p>
            <p>Livrare: {shipping === 0 ? 'Gratuită' : formatPrice(shipping)}</p>
            <p><strong>Total: {formatPrice(total)}</strong></p>
            <Link href="/checkout" onClick={closeCart}>Finalizează comanda</Link>
          </footer>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
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
