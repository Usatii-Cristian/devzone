const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const tasks = [
  {
    slug: 'introducere-nextjs',
    name: 'Prima pagină Next.js',
    question: 'Creează un Server Component Next.js care afișează un card cu titlul "Bine ai venit!" și un paragraf. Exportă funcția ca default.',
    language: 'javascript',
    starterCode: `export default function HomePage() {\n  return (\n    <main className="p-8">\n      {/* card cu titlu și paragraf */}\n    </main>\n  );\n}`,
    expectedOutput: '',
  },
  {
    slug: 'routing-pagini-nextjs',
    name: 'Routing în App Router',
    question: 'Creează structura de fișiere pentru rutele: /, /about, /blog, /blog/[slug]. Scrie conținutul pentru pagina /about cu un h1 și paragraf.',
    language: 'javascript',
    starterCode: `// app/about/page.js\nexport default function AboutPage() {\n  return (\n    <div>\n      <h1>Despre noi</h1>\n      <p>Suntem o echipă dedicată...</p>\n    </div>\n  );\n}\n\n// Cum ar arăta structura folderelor:\n// app/\n//   page.js\n//   about/page.js\n//   blog/page.js\n//   blog/[slug]/page.js`,
    expectedOutput: '',
  },
  {
    slug: 'server-vs-client-components',
    name: 'Server vs Client Components',
    question: 'Scrie un Server Component care fetch-ează date și un Client Component cu useState. Arată diferența cu "use client" directivă.',
    language: 'javascript',
    starterCode: `// ServerComp.js — Server Component\nasync function ServerComp() {\n  const data = await fetch('https://jsonplaceholder.typicode.com/posts/1').then(r => r.json());\n  return <div>{data.title}</div>;\n}\n\n// ClientComp.js — Client Component\n'use client';\nimport { useState } from 'react';\n\nfunction ClientComp() {\n  const [count, setCount] = useState(0);\n  return <button onClick={() => setCount(c => c + 1)}>Count: {count}</button>;\n}`,
    expectedOutput: '',
  },
  {
    slug: 'layout-nested-nextjs',
    name: 'Layout nested în Next.js',
    question: 'Creează un RootLayout cu header și footer, și un DashboardLayout nested care adaugă o sidebar. Arată cum se compun.',
    language: 'javascript',
    starterCode: `// app/layout.js\nexport default function RootLayout({ children }) {\n  return (\n    <html lang="ro">\n      <body>\n        <header>Header Global</header>\n        {children}\n        <footer>Footer Global</footer>\n      </body>\n    </html>\n  );\n}\n\n// app/dashboard/layout.js\nexport default function DashboardLayout({ children }) {\n  return (\n    <div className="flex">\n      <aside>Sidebar</aside>\n      <main>{children}</main>\n    </div>\n  );\n}`,
    expectedOutput: '',
  },
  {
    slug: 'link-navigation-nextjs',
    name: 'Navigare cu Link în Next.js',
    question: 'Creează un meniu de navigare cu componenta Link din next/link. Include: Acasă (/), Blog (/blog), Contact (/contact). Stilizează link-ul activ.',
    language: 'javascript',
    starterCode: `'use client';\nimport Link from 'next/link';\nimport { usePathname } from 'next/navigation';\n\nexport default function Nav() {\n  const pathname = usePathname();\n  \n  const links = [\n    { href: '/', label: 'Acasă' },\n    // adaugă Blog și Contact\n  ];\n\n  return (\n    <nav>\n      {links.map(link => (\n        <Link\n          key={link.href}\n          href={link.href}\n          className={pathname === link.href ? 'font-bold' : ''}\n        >\n          {link.label}\n        </Link>\n      ))}\n    </nav>\n  );\n}`,
    expectedOutput: '',
  },
  {
    slug: 'dynamic-routes-nextjs',
    name: 'Rute dinamice Next.js',
    question: 'Creează o pagină pentru /blog/[slug] care afișează titlul postului extras din params. Adaugă generateStaticParams pentru 3 sluguri predefinite.',
    language: 'javascript',
    starterCode: `// app/blog/[slug]/page.js\nexport function generateStaticParams() {\n  return [\n    { slug: 'primul-post' },\n    // adaugă 2 sluguri\n  ];\n}\n\nexport default function BlogPost({ params }) {\n  return (\n    <article>\n      <h1>Post: {params.slug}</h1>\n    </article>\n  );\n}`,
    expectedOutput: '',
  },
  {
    slug: 'loading-error-notfound-nextjs',
    name: 'Loading, Error și Not Found',
    question: 'Creează 3 fișiere speciale Next.js: loading.js cu un spinner, error.js cu mesaj de eroare și buton retry, și not-found.js cu mesaj 404.',
    language: 'javascript',
    starterCode: `// loading.js\nexport default function Loading() {\n  return <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mt-20" />;\n}\n\n// error.js\n'use client';\nexport default function Error({ error, reset }) {\n  return (\n    <div>\n      <h2>Ceva a mers greșit!</h2>\n      <button onClick={reset}>Încearcă din nou</button>\n    </div>\n  );\n}\n\n// not-found.js\nexport default function NotFound() {\n  return <h2>404 — Pagina nu există</h2>;\n}`,
    expectedOutput: '',
  },
  {
    slug: 'image-font-metadata-nextjs',
    name: 'Image, Font și Metadata',
    question: 'Folosind next/image, next/font și Metadata API: adaugă o imagine optimizată, un font Google (Inter), și metadata pentru titlu și descriere.',
    language: 'javascript',
    starterCode: `import Image from 'next/image';\nimport { Inter } from 'next/font/google';\n\nconst inter = Inter({ subsets: ['latin'] });\n\nexport const metadata = {\n  title: 'Titlul Paginii',\n  description: 'Descriere pentru SEO',\n};\n\nexport default function Page() {\n  return (\n    <main className={inter.className}>\n      <Image\n        src="/hero.jpg"\n        alt="Hero image"\n        width={800}\n        height={400}\n        priority\n      />\n    </main>\n  );\n}`,
    expectedOutput: '',
  },
  {
    slug: 'stilizare-nextjs',
    name: 'Stilizare în Next.js',
    question: 'Demonstrează 3 metode de stilizare în Next.js: CSS Modules (button.module.css), inline styles, și Tailwind classes. Toate aplicate pe același buton.',
    language: 'javascript',
    starterCode: `// Cu CSS Modules\nimport styles from './button.module.css';\nfunction CSSModuleBtn() {\n  return <button className={styles.btn}>CSS Module</button>;\n}\n\n// Cu inline styles\nfunction InlineBtn() {\n  return <button style={{ background: 'blue', color: 'white', padding: '8px 16px' }}>Inline</button>;\n}\n\n// Cu Tailwind\nfunction TailwindBtn() {\n  return <button className="bg-green-500 text-white px-4 py-2 rounded">Tailwind</button>;\n}`,
    expectedOutput: '',
  },
  {
    slug: 'hooks-nextjs',
    name: 'Hooks specifici Next.js',
    question: 'Folosind hooks din next/navigation: usePathname, useRouter, useSearchParams. Creează un component care afișează pathname-ul curent și permite navigare programatică.',
    language: 'javascript',
    starterCode: `'use client';\nimport { usePathname, useRouter, useSearchParams } from 'next/navigation';\n\nexport default function NavInfo() {\n  const pathname = usePathname();\n  const router = useRouter();\n  const searchParams = useSearchParams();\n\n  return (\n    <div>\n      <p>Pagina curentă: {pathname}</p>\n      <p>Query: {searchParams.get('q') || 'niciuna'}</p>\n      <button onClick={() => router.push('/about')}>Du-mă la About</button>\n      <button onClick={() => router.back()}>Înapoi</button>\n    </div>\n  );\n}`,
    expectedOutput: '',
  },
  {
    slug: 'streaming-suspense-nextjs',
    name: 'Streaming cu Suspense',
    question: 'Creează un layout cu Suspense boundaries: un component async lent (simulat cu delay) învelit în Suspense cu fallback skeleton.',
    language: 'javascript',
    starterCode: `import { Suspense } from 'react';\n\nasync function SlowComponent() {\n  await new Promise(r => setTimeout(r, 2000));\n  return <div className="bg-white p-4 rounded shadow">Date încărcate!</div>;\n}\n\nfunction Skeleton() {\n  return <div className="animate-pulse bg-gray-200 h-16 rounded" />;\n}\n\nexport default function Page() {\n  return (\n    <div className="p-8 space-y-4">\n      <h1>Pagina cu Streaming</h1>\n      <Suspense fallback={<Skeleton />}>\n        <SlowComponent />\n      </Suspense>\n    </div>\n  );\n}`,
    expectedOutput: '',
  },
  {
    slug: 'parallel-routes-nextjs',
    name: 'Parallel Routes cu @slots',
    question: 'Creează un layout cu 2 parallel routes: @team și @analytics care sunt afișate simultan. Scrie structura de foldere și layout-ul.',
    language: 'javascript',
    starterCode: `// app/@team/page.js\nexport default function TeamPage() {\n  return <div className="bg-blue-50 p-4">Echipa</div>;\n}\n\n// app/@analytics/page.js\nexport default function AnalyticsPage() {\n  return <div className="bg-green-50 p-4">Analytics</div>;\n}\n\n// app/layout.js\nexport default function Layout({ children, team, analytics }) {\n  return (\n    <div>\n      {children}\n      <div className="grid grid-cols-2 gap-4 mt-4">\n        {team}\n        {analytics}\n      </div>\n    </div>\n  );\n}`,
    expectedOutput: '',
  },
  {
    slug: 'intercepting-routes-nextjs',
    name: 'Intercepting Routes pentru modal',
    question: 'Implementează intercepting routes: o galerie /photos care la click deschide foto într-un modal (intercepted route), dar dacă navighezi direct afișează pagina full.',
    language: 'javascript',
    starterCode: `// Structura:\n// app/photos/[id]/page.js — pagina completă\n// app/@modal/(.)photos/[id]/page.js — modal interceptat\n\n// app/photos/[id]/page.js\nexport default function PhotoPage({ params }) {\n  return <div>Fotografie #{params.id} — Pagina Completă</div>;\n}\n\n// app/@modal/(.)photos/[id]/page.js\nimport Modal from '@/components/Modal';\nexport default function PhotoModal({ params }) {\n  return (\n    <Modal>\n      <div>Fotografie #{params.id} — Modal</div>\n    </Modal>\n  );\n}`,
    expectedOutput: '',
  },
  {
    slug: 'error-boundaries-detail-nextjs',
    name: 'Error Boundaries granulare',
    question: 'Creează error boundaries la nivel de route segment și la nivel de component. Arată cum error.js capturează erori dintr-un server component.',
    language: 'javascript',
    starterCode: `// app/dashboard/error.js\n'use client';\nimport { useEffect } from 'react';\n\nexport default function DashboardError({ error, reset }) {\n  useEffect(() => {\n    console.error('Dashboard error:', error);\n  }, [error]);\n\n  return (\n    <div className="p-8 text-center">\n      <h2 className="text-xl font-bold text-red-600">Eroare în dashboard</h2>\n      <p className="text-gray-600 mt-2">{error.message}</p>\n      <button\n        onClick={reset}\n        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"\n      >\n        Reîncearcă\n      </button>\n    </div>\n  );\n}`,
    expectedOutput: '',
  },
  {
    slug: 'performance-nextjs',
    name: 'Optimizări de performanță Next.js',
    question: 'Implementează 3 optimizări: Image cu priority și sizes, dynamic import pentru un component greu, și revalidare cu next.revalidate.',
    language: 'javascript',
    starterCode: `import Image from 'next/image';\nimport dynamic from 'next/dynamic';\n\n// Dynamic import\nconst HeavyChart = dynamic(() => import('./HeavyChart'), {\n  loading: () => <p>Se încarcă graficul...</p>,\n  ssr: false,\n});\n\n// Server component cu revalidare\nasync function DataSection() {\n  const data = await fetch('/api/stats', {\n    next: { revalidate: 3600 } // revalidare la 1 oră\n  }).then(r => r.json());\n  return <div>{data.total} useri</div>;\n}`,
    expectedOutput: '',
  },
  {
    slug: 'nextjs-frontend-lesson-16',
    name: 'useContext în Next.js',
    question: 'Creează un ThemeContext cu dark/light mode care poate fi folosit în orice Client Component. Include ThemeProvider și useTheme hook.',
    language: 'javascript',
    starterCode: `'use client';\nimport { createContext, useContext, useState } from 'react';\n\nconst ThemeContext = createContext({ theme: 'light', toggle: () => {} });\n\nexport function ThemeProvider({ children }) {\n  const [theme, setTheme] = useState('light');\n  const toggle = () => setTheme(t => t === 'light' ? 'dark' : 'light');\n  return (\n    <ThemeContext.Provider value={{ theme, toggle }}>\n      {children}\n    </ThemeContext.Provider>\n  );\n}\n\nexport function useTheme() {\n  return useContext(ThemeContext);\n}`,
    expectedOutput: '',
  },
  {
    slug: 'nextjs-frontend-lesson-17',
    name: 'Infinite Scroll cu React',
    question: 'Implementează infinite scroll folosind Intersection Observer: când ultimul element este vizibil, încarcă mai multe date.',
    language: 'javascript',
    starterCode: `'use client';\nimport { useState, useEffect, useRef } from 'react';\n\nexport default function InfiniteList() {\n  const [items, setItems] = useState(Array.from({length: 10}, (_, i) => i + 1));\n  const [loading, setLoading] = useState(false);\n  const loaderRef = useRef(null);\n\n  useEffect(() => {\n    const observer = new IntersectionObserver(entries => {\n      if (entries[0].isIntersecting && !loading) {\n        setLoading(true);\n        setTimeout(() => {\n          setItems(prev => [...prev, ...Array.from({length: 10}, (_, i) => prev.length + i + 1)]);\n          setLoading(false);\n        }, 500);\n      }\n    });\n    if (loaderRef.current) observer.observe(loaderRef.current);\n    return () => observer.disconnect();\n  }, [loading]);\n\n  return (\n    <ul>\n      {items.map(i => <li key={i}>Item {i}</li>)}\n      <li ref={loaderRef}>{loading ? 'Se încarcă...' : ''}</li>\n    </ul>\n  );\n}`,
    expectedOutput: '',
  },
  {
    slug: 'nextjs-frontend-lesson-18',
    name: 'Optimistic Updates',
    question: 'Implementează un like button cu optimistic update: la click, contorul crește imediat, iar dacă request-ul eșuează, revine.',
    language: 'javascript',
    starterCode: `'use client';\nimport { useState, useOptimistic } from 'react';\n\nexport default function LikeButton({ initialLikes, postId }) {\n  const [likes, setLikes] = useState(initialLikes);\n  const [optimisticLikes, addOptimisticLike] = useOptimistic(\n    likes,\n    (state, increment) => state + increment\n  );\n\n  async function handleLike() {\n    addOptimisticLike(1);\n    try {\n      // await fetch(\`/api/posts/\${postId}/like\`, { method: 'POST' });\n      setLikes(l => l + 1);\n    } catch {\n      // revine automat\n    }\n  }\n\n  return <button onClick={handleLike}>❤️ {optimisticLikes}</button>;\n}`,
    expectedOutput: '',
  },
  {
    slug: 'nextjs-frontend-lesson-19',
    name: 'Virtualizare cu liste mari',
    question: 'Explică și implementează un list virtualizat simplu: randează doar elementele vizibile dintr-o listă de 10.000 de items.',
    language: 'javascript',
    starterCode: `'use client';\nimport { useState, useMemo } from 'react';\n\nconst ITEM_HEIGHT = 40;\nconst VISIBLE_COUNT = 15;\n\nexport default function VirtualList() {\n  const [scrollTop, setScrollTop] = useState(0);\n  const allItems = useMemo(() => Array.from({length: 10000}, (_, i) => \`Item \${i + 1}\`), []);\n\n  const startIndex = Math.floor(scrollTop / ITEM_HEIGHT);\n  const visibleItems = allItems.slice(startIndex, startIndex + VISIBLE_COUNT);\n\n  return (\n    <div\n      style={{ height: VISIBLE_COUNT * ITEM_HEIGHT, overflowY: 'auto' }}\n      onScroll={e => setScrollTop(e.target.scrollTop)}\n    >\n      <div style={{ height: allItems.length * ITEM_HEIGHT, position: 'relative' }}>\n        {visibleItems.map((item, i) => (\n          <div key={startIndex + i} style={{ position: 'absolute', top: (startIndex + i) * ITEM_HEIGHT, height: ITEM_HEIGHT }}>\n            {item}\n          </div>\n        ))}\n      </div>\n    </div>\n  );\n}`,
    expectedOutput: '',
  },
  {
    slug: 'nextjs-frontend-lesson-20',
    name: 'Animation cu Framer Motion',
    question: 'Creează animații cu Framer Motion: un card cu animație de intrare (fade + slide), hover effect, și o tranziție de pagină.',
    language: 'javascript',
    starterCode: `'use client';\nimport { motion } from 'framer-motion';\n\nexport default function AnimatedCard({ title, description }) {\n  return (\n    <motion.div\n      initial={{ opacity: 0, y: 20 }}\n      animate={{ opacity: 1, y: 0 }}\n      transition={{ duration: 0.4 }}\n      whileHover={{ scale: 1.02, boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}\n      className="bg-white p-6 rounded-xl cursor-pointer"\n    >\n      <h3>{title}</h3>\n      <p>{description}</p>\n    </motion.div>\n  );\n}`,
    expectedOutput: '',
  },
  {
    slug: 'nextjs-frontend-lesson-21',
    name: 'Search cu debounce',
    question: 'Implementează un search bar cu debounce de 300ms care actualizează URL-ul (searchParams) fără a cauza prea multe request-uri.',
    language: 'javascript',
    starterCode: `'use client';\nimport { useState, useEffect } from 'react';\nimport { useRouter, useSearchParams } from 'next/navigation';\n\nfunction useDebounce(value, delay) {\n  const [debounced, setDebounced] = useState(value);\n  useEffect(() => {\n    const timer = setTimeout(() => setDebounced(value), delay);\n    return () => clearTimeout(timer);\n  }, [value, delay]);\n  return debounced;\n}\n\nexport default function SearchBar() {\n  const router = useRouter();\n  const searchParams = useSearchParams();\n  const [query, setQuery] = useState(searchParams.get('q') || '');\n  const debouncedQuery = useDebounce(query, 300);\n\n  useEffect(() => {\n    router.push(debouncedQuery ? \`?q=\${debouncedQuery}\` : '/');\n  }, [debouncedQuery]);\n\n  return <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Caută..." />;\n}`,
    expectedOutput: '',
  },
  {
    slug: 'nextjs-frontend-lesson-22',
    name: 'Multi-step form cu React',
    question: 'Creează un formular multi-step (3 pași) cu state management, progress indicator, și validare per pas.',
    language: 'javascript',
    starterCode: `'use client';\nimport { useState } from 'react';\n\nconst steps = ['Date personale', 'Cont', 'Confirmare'];\n\nexport default function MultiStepForm() {\n  const [step, setStep] = useState(0);\n  const [data, setData] = useState({ name: '', email: '', password: '' });\n\n  return (\n    <div className="max-w-md mx-auto p-6">\n      {/* Progress indicator */}\n      <div className="flex mb-6">\n        {steps.map((s, i) => (\n          <div key={i} className={\`flex-1 text-center text-sm \${i <= step ? 'text-blue-600 font-bold' : 'text-gray-400'}\`}>\n            {s}\n          </div>\n        ))}\n      </div>\n      {/* Pasul curent */}\n      {step === 0 && <input placeholder="Nume" value={data.name} onChange={e => setData(d => ({...d, name: e.target.value}))} />}\n      {step === 1 && <input type="email" placeholder="Email" value={data.email} onChange={e => setData(d => ({...d, email: e.target.value}))} />}\n      {step === 2 && <div>Confirmare: {data.name}, {data.email}</div>}\n      <div className="flex justify-between mt-4">\n        {step > 0 && <button onClick={() => setStep(s => s - 1)}>Înapoi</button>}\n        {step < 2 ? <button onClick={() => setStep(s => s + 1)}>Înainte</button> : <button>Trimite</button>}\n      </div>\n    </div>\n  );\n}`,
    expectedOutput: '',
  },
  {
    slug: 'nextjs-frontend-lesson-23',
    name: 'Data fetching cu SWR',
    question: 'Creează un component care folosește SWR pentru a fetch-ui date cu: loading state, error state, revalidare la focus, și mutate pentru actualizare.',
    language: 'javascript',
    starterCode: `'use client';\nimport useSWR from 'swr';\n\nconst fetcher = url => fetch(url).then(r => r.json());\n\nexport default function UserProfile({ userId }) {\n  const { data, error, isLoading, mutate } = useSWR(\n    \`/api/users/\${userId}\`,\n    fetcher,\n    { revalidateOnFocus: true }\n  );\n\n  if (isLoading) return <div className="animate-pulse h-20 bg-gray-200 rounded" />;\n  if (error) return <div className="text-red-600">Eroare la încărcare</div>;\n\n  return (\n    <div>\n      <h2>{data.name}</h2>\n      <button onClick={() => mutate()}>Refresh</button>\n    </div>\n  );\n}`,
    expectedOutput: '',
  },
  {
    slug: 'nextjs-frontend-lesson-24',
    name: 'Drag and Drop cu HTML5 API',
    question: 'Implementează drag and drop pentru a reordona o listă de itemi folosind HTML5 Drag and Drop API nativ (fără librărie externă).',
    language: 'javascript',
    starterCode: `'use client';\nimport { useState, useRef } from 'react';\n\nexport default function DraggableList() {\n  const [items, setItems] = useState(['Item 1', 'Item 2', 'Item 3', 'Item 4']);\n  const dragIndex = useRef(null);\n\n  function handleDragStart(i) { dragIndex.current = i; }\n  \n  function handleDrop(i) {\n    const newItems = [...items];\n    const [moved] = newItems.splice(dragIndex.current, 1);\n    newItems.splice(i, 0, moved);\n    setItems(newItems);\n  }\n\n  return (\n    <ul className="space-y-2 max-w-sm">\n      {items.map((item, i) => (\n        <li\n          key={item}\n          draggable\n          onDragStart={() => handleDragStart(i)}\n          onDragOver={e => e.preventDefault()}\n          onDrop={() => handleDrop(i)}\n          className="bg-white p-3 rounded shadow cursor-grab border border-gray-200"\n        >\n          {item}\n        </li>\n      ))}\n    </ul>\n  );\n}`,
    expectedOutput: '',
  },
  {
    slug: 'nextjs-frontend-lesson-25',
    name: 'PWA features cu Next.js',
    question: 'Configurează Next.js pentru PWA: scrie manifest.json, adaugă meta tags necesare în layout, și un Service Worker simplu care cache-ează ruta principală.',
    language: 'javascript',
    starterCode: `// public/manifest.json\nconst manifest = {\n  name: 'TaskForge',\n  short_name: 'TaskForge',\n  description: 'Platformă de învățare',\n  start_url: '/',\n  display: 'standalone',\n  background_color: '#ffffff',\n  theme_color: '#3b82f6',\n  icons: [\n    { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },\n    { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },\n  ],\n};\n\n// În app/layout.js:\n// export const metadata = {\n//   manifest: '/manifest.json',\n// };`,
    expectedOutput: '',
  },
  {
    slug: 'nextjs-zustand-persistenta',
    name: 'Zustand cu persistență',
    question: 'Creează un store Zustand cu persist middleware pentru a salva preferințele utilizatorului (temă și limbă) în localStorage.',
    language: 'javascript',
    starterCode: `import { create } from 'zustand';\nimport { persist } from 'zustand/middleware';\n\nconst usePreferencesStore = create(\n  persist(\n    (set) => ({\n      theme: 'light',\n      language: 'ro',\n      setTheme: (theme) => set({ theme }),\n      setLanguage: (language) => set({ language }),\n    }),\n    {\n      name: 'user-preferences',\n    }\n  )\n);\n\nexport default usePreferencesStore;`,
    expectedOutput: '',
  },
  {
    slug: 'nextjs-i18n-next-intl',
    name: 'Internaționalizare cu next-intl',
    question: 'Configurează next-intl pentru 2 limbi (ro, en). Creează fișiere de traducere și un component care afișează un mesaj tradus.',
    language: 'javascript',
    starterCode: `// messages/ro.json\nconst ro = {\n  "hello": "Bună ziua, {name}!",\n  "nav.home": "Acasă",\n  "nav.about": "Despre"\n};\n\n// messages/en.json\nconst en = {\n  "hello": "Hello, {name}!",\n  "nav.home": "Home",\n  "nav.about": "About"\n};\n\n// components/Greeting.js\nimport { useTranslations } from 'next-intl';\nexport default function Greeting({ name }) {\n  const t = useTranslations();\n  return <h1>{t('hello', { name })}</h1>;\n}`,
    expectedOutput: '',
  },
  {
    slug: 'nextjs-storybook',
    name: 'Design system cu Storybook în Next.js',
    question: 'Scrie stories pentru 2 componente UI: un Badge cu variantele success/warning/error, și un Skeleton loader cu dimensiuni configurabile.',
    language: 'javascript',
    starterCode: `// Badge.stories.js\nimport Badge from './Badge';\nexport default { title: 'UI/Badge', component: Badge };\n\nexport const Success = { args: { variant: 'success', children: 'Activ' } };\nexport const Warning = { args: { variant: 'warning', children: 'În așteptare' } };\nexport const Error = { args: { variant: 'error', children: 'Eroare' } };\n\n// Skeleton.stories.js\nimport Skeleton from './Skeleton';\nexport default { title: 'UI/Skeleton', component: Skeleton };\n\nexport const TextLine = { args: { width: '200px', height: '16px' } };\nexport const Avatar = { args: { width: '48px', height: '48px', rounded: true } };`,
    expectedOutput: '',
  },
  {
    slug: 'nextjs-testing-complet',
    name: 'Testing complet Next.js',
    question: 'Scrie un test Jest + React Testing Library pentru un component de formular care validează email și afișează mesaj de succes.',
    language: 'javascript',
    starterCode: `import { render, screen, fireEvent, waitFor } from '@testing-library/react';\nimport ContactForm from './ContactForm';\n\ndescribe('ContactForm', () => {\n  test('afișează eroare pentru email invalid', async () => {\n    render(<ContactForm />);\n    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'invalid' } });\n    fireEvent.click(screen.getByRole('button', { name: /trimite/i }));\n    await waitFor(() => {\n      expect(screen.getByText(/email invalid/i)).toBeInTheDocument();\n    });\n  });\n\n  test('afișează succes pentru date valide', async () => {\n    render(<ContactForm />);\n    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@test.com' } });\n    fireEvent.click(screen.getByRole('button', { name: /trimite/i }));\n    await waitFor(() => {\n      expect(screen.getByText(/succes/i)).toBeInTheDocument();\n    });\n  });\n});`,
    expectedOutput: '',
  },
  {
    slug: 'mini-proiect-fe-saas-dashboard',
    name: 'Mini proiect: SaaS Dashboard',
    question: 'Construiește un dashboard SaaS minimal cu: sidebar navigație, header cu user avatar, 4 stat cards (useri, revenue, conversii, uptime), și un tabel cu ultimele tranzacții.',
    language: 'javascript',
    starterCode: `// components/StatCard.js\nexport default function StatCard({ title, value, change, icon }) {\n  return (\n    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">\n      <div className="flex items-center justify-between">\n        <div>\n          <p className="text-sm text-gray-500">{title}</p>\n          <p className="text-2xl font-bold mt-1">{value}</p>\n          <p className={\`text-sm mt-1 \${change > 0 ? 'text-green-600' : 'text-red-600'}\`}>\n            {change > 0 ? '+' : ''}{change}% față de luna trecută\n          </p>\n        </div>\n        <div className="text-3xl">{icon}</div>\n      </div>\n    </div>\n  );\n}`,
    expectedOutput: '',
  },
];

async function main() {
  console.log('Adăugare coding tasks Next.js Frontend...');
  let added = 0, skipped = 0;
  for (const t of tasks) {
    const lesson = await prisma.lesson.findFirst({ where: { slug: t.slug } });
    if (!lesson) { console.log(`  [skip] ${t.slug} — nu există`); skipped++; continue; }
    const existing = await prisma.task.findFirst({ where: { lessonId: lesson.id, type: 'coding' } });
    if (existing) { console.log(`  [skip] ${t.slug} — are deja coding`); skipped++; continue; }
    const maxTask = await prisma.task.findFirst({ where: { lessonId: lesson.id }, orderBy: { number: 'desc' } });
    const n = (maxTask?.number ?? 0) + 1;
    await prisma.task.create({
      data: {
        lessonId: lesson.id, number: n,
        name: t.name, question: t.question,
        options: [], answer: '',
        explanation: '',
        difficulty: 'medium',
        type: 'coding', language: t.language,
        starterCode: t.starterCode || '',
        expectedOutput: t.expectedOutput || '',
      },
    });
    console.log(`  [ok] ${t.slug}`);
    added++;
  }
  console.log(`\nGata: ${added} adăugate, ${skipped} sărite.`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
