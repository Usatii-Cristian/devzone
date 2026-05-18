const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const tasks = [
  {
    slug: 'route-handlers-api',
    name: 'Route Handler GET/POST',
    question: 'Scrie un Route Handler Next.js pentru /api/products: GET returnează lista de produse (array JSON), POST creează un produs nou din request body.',
    language: 'javascript',
    starterCode: `// app/api/products/route.js\nimport { NextResponse } from 'next/server';\n\nconst products = [\n  { id: 1, name: 'Laptop', price: 1200 },\n  { id: 2, name: 'Mouse', price: 50 },\n];\n\nexport async function GET() {\n  return NextResponse.json(products);\n}\n\nexport async function POST(request) {\n  const body = await request.json();\n  const newProduct = { id: products.length + 1, ...body };\n  products.push(newProduct);\n  return NextResponse.json(newProduct, { status: 201 });\n}`,
    expectedOutput: '',
  },
  {
    slug: 'server-actions-nextjs',
    name: 'Server Actions cu "use server"',
    question: 'Implementează o Server Action pentru a adăuga un item la o listă (simulată). Action-ul să primească FormData, valideze câmpul name, și returneze rezultatul.',
    language: 'javascript',
    starterCode: `'use server';\n\nconst items = [];\n\nexport async function addItem(formData) {\n  const name = formData.get('name');\n  \n  if (!name || name.trim().length < 2) {\n    return { error: 'Numele trebuie să aibă cel puțin 2 caractere' };\n  }\n  \n  const item = { id: Date.now(), name: name.trim() };\n  items.push(item);\n  \n  return { success: true, item };\n}`,
    expectedOutput: '',
  },
  {
    slug: 'prisma-database-nextjs',
    name: 'Prisma cu Next.js API',
    question: 'Scrie un Route Handler care folosește Prisma pentru a returna useri din DB. Include și un handler pentru a crea un user nou cu email și name.',
    language: 'javascript',
    starterCode: `// app/api/users/route.js\nimport { PrismaClient } from '@prisma/client';\nimport { NextResponse } from 'next/server';\n\nconst prisma = new PrismaClient();\n\nexport async function GET() {\n  const users = await prisma.user.findMany({\n    select: { id: true, name: true, email: true },\n    orderBy: { createdAt: 'desc' },\n    take: 20,\n  });\n  return NextResponse.json(users);\n}\n\nexport async function POST(request) {\n  const { name, email } = await request.json();\n  const user = await prisma.user.create({\n    data: { name, email },\n  });\n  return NextResponse.json(user, { status: 201 });\n}`,
    expectedOutput: '',
  },
  {
    slug: 'request-response-nextjs',
    name: 'Request și Response în Next.js',
    question: 'Creează un Route Handler care: citește query params, request headers, și body. Returnează un response cu status custom, headers de cache, și JSON.',
    language: 'javascript',
    starterCode: `import { NextResponse } from 'next/server';\n\nexport async function GET(request) {\n  const { searchParams } = new URL(request.url);\n  const page = parseInt(searchParams.get('page') || '1');\n  const limit = parseInt(searchParams.get('limit') || '10');\n  const authHeader = request.headers.get('authorization');\n  \n  const data = { page, limit, total: 100, authorized: !!authHeader };\n  \n  return NextResponse.json(data, {\n    status: 200,\n    headers: {\n      'Cache-Control': 'public, max-age=60',\n      'X-Total-Count': '100',\n    },\n  });\n}`,
    expectedOutput: '',
  },
  {
    slug: 'cookies-headers-nextjs',
    name: 'Cookies și Headers în Next.js',
    question: 'Scrie un Route Handler care: setează un cookie de sesiune la login, citește cookie-ul existent, și poate șterge cookie-ul la logout.',
    language: 'javascript',
    starterCode: `import { NextResponse } from 'next/server';\nimport { cookies } from 'next/headers';\n\n// POST /api/auth/login\nexport async function POST(request) {\n  const { email, password } = await request.json();\n  \n  // Simulare autentificare\n  if (email === 'test@test.com' && password === 'password') {\n    const response = NextResponse.json({ success: true });\n    response.cookies.set('session', 'token123', {\n      httpOnly: true,\n      secure: process.env.NODE_ENV === 'production',\n      maxAge: 60 * 60 * 24 * 7, // 7 zile\n    });\n    return response;\n  }\n  return NextResponse.json({ error: 'Credențiale incorecte' }, { status: 401 });\n}`,
    expectedOutput: '',
  },
  {
    slug: 'form-handling-actions',
    name: 'Formular cu Server Actions',
    question: 'Construiește un formular de contact care folosește Server Action, cu feedback de loading (useFormStatus) și afișare erori/succes (useActionState).',
    language: 'javascript',
    starterCode: `'use server';\n// actions.js\nexport async function sendContact(prevState, formData) {\n  const email = formData.get('email');\n  const message = formData.get('message');\n\n  if (!email.includes('@')) return { error: 'Email invalid' };\n  if (message.length < 10) return { error: 'Mesajul e prea scurt' };\n\n  // await sendEmail({ email, message });\n  return { success: 'Mesajul a fost trimis!' };\n}\n\n// ContactForm.js\n'use client';\nimport { useActionState } from 'react';\nimport { sendContact } from './actions';\n\nexport default function ContactForm() {\n  const [state, action] = useActionState(sendContact, null);\n  return (\n    <form action={action}>\n      <input name="email" type="email" required />\n      <textarea name="message" rows={4} required />\n      {state?.error && <p className="text-red-600">{state.error}</p>}\n      {state?.success && <p className="text-green-600">{state.success}</p>}\n      <button type="submit">Trimite</button>\n    </form>\n  );\n}`,
    expectedOutput: '',
  },
  {
    slug: 'validare-zod-nextjs',
    name: 'Validare cu Zod în API',
    question: 'Folosind Zod, creează un schema de validare pentru un user (name min 2, email valid, age 18-120) și aplică-l într-un Route Handler POST.',
    language: 'javascript',
    starterCode: `import { z } from 'zod';\nimport { NextResponse } from 'next/server';\n\nconst userSchema = z.object({\n  name: z.string().min(2, 'Minim 2 caractere'),\n  email: z.string().email('Email invalid'),\n  age: z.number().min(18).max(120),\n});\n\nexport async function POST(request) {\n  const body = await request.json();\n  const result = userSchema.safeParse(body);\n\n  if (!result.success) {\n    return NextResponse.json(\n      { errors: result.error.flatten().fieldErrors },\n      { status: 400 }\n    );\n  }\n\n  // Procesează date valide\n  return NextResponse.json({ user: result.data }, { status: 201 });\n}`,
    expectedOutput: '',
  },
  {
    slug: 'auth-basics-nextjs',
    name: 'Autentificare cu NextAuth.js',
    question: 'Configurează NextAuth.js cu provider-ul Credentials. Include: session strategy JWT, callback-uri pentru a adăuga userId la session, și protecție rută.',
    language: 'javascript',
    starterCode: `// app/api/auth/[...nextauth]/route.js\nimport NextAuth from 'next-auth';\nimport CredentialsProvider from 'next-auth/providers/credentials';\n\nconst handler = NextAuth({\n  providers: [\n    CredentialsProvider({\n      name: 'credentials',\n      credentials: { email: {}, password: {} },\n      async authorize(credentials) {\n        // Verifică credențialele în DB\n        if (credentials.email === 'test@test.com') {\n          return { id: '1', email: credentials.email, name: 'Test User' };\n        }\n        return null;\n      }\n    })\n  ],\n  session: { strategy: 'jwt' },\n  callbacks: {\n    jwt({ token, user }) {\n      if (user) token.userId = user.id;\n      return token;\n    },\n    session({ session, token }) {\n      session.user.id = token.userId;\n      return session;\n    }\n  }\n});\n\nexport { handler as GET, handler as POST };`,
    expectedOutput: '',
  },
  {
    slug: 'middleware-nextjs',
    name: 'Middleware Next.js',
    question: 'Scrie un middleware Next.js care: verifică dacă userul e autentificat (cookie/header), redirectează la /login dacă nu e, și permite accesul la /api/public fără auth.',
    language: 'javascript',
    starterCode: `import { NextResponse } from 'next/server';\n\nexport function middleware(request) {\n  const { pathname } = request.nextUrl;\n  const token = request.cookies.get('session')?.value;\n\n  // Rute publice\n  const publicPaths = ['/login', '/register', '/api/public'];\n  if (publicPaths.some(p => pathname.startsWith(p))) {\n    return NextResponse.next();\n  }\n\n  // Protejare rute private\n  if (!token) {\n    return NextResponse.redirect(new URL('/login', request.url));\n  }\n\n  return NextResponse.next();\n}\n\nexport const config = {\n  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],\n};`,
    expectedOutput: '',
  },
  {
    slug: 'caching-revalidation-nextjs',
    name: 'Caching și revalidare',
    question: 'Demonstrează 3 strategii de caching Next.js: cache static (force-cache), revalidare la interval (next.revalidate), și no-cache (no-store).',
    language: 'javascript',
    starterCode: `// Static — cached permanent\nasync function getStaticData() {\n  const res = await fetch('https://api.example.com/static', {\n    cache: 'force-cache'\n  });\n  return res.json();\n}\n\n// ISR — revalidare la 60s\nasync function getRevalidatedData() {\n  const res = await fetch('https://api.example.com/posts', {\n    next: { revalidate: 60 }\n  });\n  return res.json();\n}\n\n// Dynamic — fără cache\nasync function getDynamicData() {\n  const res = await fetch('https://api.example.com/realtime', {\n    cache: 'no-store'\n  });\n  return res.json();\n}`,
    expectedOutput: '',
  },
  {
    slug: 'server-actions-avansate',
    name: 'Server Actions avansate',
    question: 'Implementează o Server Action care: uploadează un fișier (FormData), validează tipul și dimensiunea, salvează pe server, și revalidează path-ul.',
    language: 'javascript',
    starterCode: `'use server';\nimport { revalidatePath } from 'next/cache';\n\nexport async function uploadAvatar(formData) {\n  const file = formData.get('avatar');\n\n  if (!file) return { error: 'Niciun fișier' };\n  if (file.size > 2 * 1024 * 1024) return { error: 'Fișier prea mare (max 2MB)' };\n  if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {\n    return { error: 'Tip nepermis' };\n  }\n\n  // Simulare upload\n  const url = \`/uploads/\${Date.now()}-\${file.name}\`;\n  revalidatePath('/profile');\n  return { success: true, url };\n}`,
    expectedOutput: '',
  },
  {
    slug: 'edge-vs-node-runtime',
    name: 'Edge Runtime vs Node.js',
    question: 'Demonstrează diferența: un Route Handler cu Edge Runtime (export const runtime = "edge") și unul Node.js. Ce limitări are Edge?',
    language: 'javascript',
    starterCode: `// Edge Runtime — foarte rapid, distribuție globală\n// Limitări: fără fs, crypto limitat, fără npm native modules\nexport const runtime = 'edge';\n\nexport async function GET(request) {\n  const geo = request.geo; // disponibil la Vercel Edge\n  return new Response(JSON.stringify({\n    message: 'Edge Runtime',\n    country: geo?.country || 'unknown',\n    runtime: 'edge',\n  }), { headers: { 'Content-Type': 'application/json' } });\n}\n\n// Node.js Runtime — acces complet\n// export const runtime = 'nodejs'; // default\n// Poate folosi: fs, path, crypto, orice npm package`,
    expectedOutput: '',
  },
  {
    slug: 'streaming-responses',
    name: 'Streaming responses cu ReadableStream',
    question: 'Creează un API endpoint care streamează date cu ReadableStream (ca un SSE / AI stream). Clientul citește bucățile de date pe măsură ce sosesc.',
    language: 'javascript',
    starterCode: `// app/api/stream/route.js\nexport async function GET() {\n  const encoder = new TextEncoder();\n  \n  const stream = new ReadableStream({\n    async start(controller) {\n      const words = ['Bună', 'ziua!', 'Acesta', 'este', 'un', 'stream.'];\n      for (const word of words) {\n        await new Promise(r => setTimeout(r, 300));\n        controller.enqueue(encoder.encode(\`data: \${word}\\n\\n\`));\n      }\n      controller.close();\n    }\n  });\n\n  return new Response(stream, {\n    headers: {\n      'Content-Type': 'text/event-stream',\n      'Cache-Control': 'no-cache',\n    }\n  });\n}`,
    expectedOutput: '',
  },
  {
    slug: 'rate-limiting-security',
    name: 'Rate limiting API',
    question: 'Implementează rate limiting simplu în middleware Next.js: max 10 request-uri per minut per IP, returnează 429 dacă e depășit.',
    language: 'javascript',
    starterCode: `import { NextResponse } from 'next/server';\n\nconst rateLimitMap = new Map();\n\nexport function middleware(request) {\n  const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';\n  const now = Date.now();\n  const windowMs = 60 * 1000; // 1 minut\n  const maxRequests = 10;\n\n  if (!rateLimitMap.has(ip)) {\n    rateLimitMap.set(ip, { count: 1, resetAt: now + windowMs });\n    return NextResponse.next();\n  }\n\n  const limit = rateLimitMap.get(ip);\n  if (now > limit.resetAt) {\n    rateLimitMap.set(ip, { count: 1, resetAt: now + windowMs });\n    return NextResponse.next();\n  }\n\n  if (limit.count >= maxRequests) {\n    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });\n  }\n\n  limit.count++;\n  return NextResponse.next();\n}`,
    expectedOutput: '',
  },
  {
    slug: 'deploy-env-nextjs',
    name: 'Environment Variables și Deploy',
    question: 'Explică și demonstrează diferența între NEXT_PUBLIC_ și server-only env vars. Scrie un component care folosește corect ambele tipuri.',
    language: 'javascript',
    starterCode: `// .env.local\n// NEXT_PUBLIC_API_URL=https://api.example.com  ← public, disponibil în browser\n// DATABASE_URL=mongodb://...                   ← server-only, secret\n// NEXT_PUBLIC_SITE_NAME=TaskForge\n\n// Client Component — poate accesa doar NEXT_PUBLIC_\n'use client';\nexport default function Footer() {\n  return <p>© {process.env.NEXT_PUBLIC_SITE_NAME}</p>;\n}\n\n// Server Component — poate accesa TOATE env vars\nexport default async function DBStatus() {\n  const isConnected = !!process.env.DATABASE_URL; // secret\n  return <div>DB: {isConnected ? '✓' : '✗'}</div>;\n}`,
    expectedOutput: '',
  },
  {
    slug: 'nextjs-backend-lesson-16',
    name: 'Websockets cu Next.js',
    question: 'Demonstrează configurarea unui WebSocket server cu Next.js custom server (server.js). Clientul se conectează și primește mesaje în timp real.',
    language: 'javascript',
    starterCode: `// server.js (custom Next.js server)\nconst { createServer } = require('http');\nconst { parse } = require('url');\nconst next = require('next');\nconst { WebSocketServer } = require('ws');\n\nconst app = next({ dev: true });\napp.prepare().then(() => {\n  const httpServer = createServer((req, res) => {\n    app.getRequestHandler()(req, res, parse(req.url, true));\n  });\n\n  const wss = new WebSocketServer({ server: httpServer });\n  wss.on('connection', (ws) => {\n    ws.send('Conectat la server!');\n    ws.on('message', (msg) => {\n      wss.clients.forEach(client => client.send(\`Echo: \${msg}\`));\n    });\n  });\n\n  httpServer.listen(3000);\n});`,
    expectedOutput: '',
  },
  {
    slug: 'nextjs-backend-lesson-17',
    name: 'Background Jobs cu Queues',
    question: 'Simulează un sistem de job queue: o Server Action adaugă un job, un cron route procesează job-urile din coadă. Fără librărie externă — simplu cu array.',
    language: 'javascript',
    starterCode: `// lib/queue.js\nconst queue = [];\n\nexport function addJob(type, payload) {\n  queue.push({ id: Date.now(), type, payload, status: 'pending' });\n}\n\nexport function processJobs() {\n  const pending = queue.filter(j => j.status === 'pending');\n  pending.forEach(job => {\n    job.status = 'processing';\n    console.log(\`Processing \${job.type}: \`, job.payload);\n    job.status = 'done';\n  });\n  return pending.length;\n}\n\n// app/api/cron/route.js\nimport { processJobs } from '@/lib/queue';\nexport async function GET(req) {\n  const processed = processJobs();\n  return Response.json({ processed });\n}`,
    expectedOutput: '',
  },
  {
    slug: 'nextjs-backend-lesson-18',
    name: 'Email cu Resend/Nodemailer',
    question: 'Scrie o Server Action care trimite un email de confirmare folosind Resend (sau simulat). Include template HTML simplu și gestionare erori.',
    language: 'javascript',
    starterCode: `'use server';\n// Cu Resend (sau simulat)\nexport async function sendConfirmationEmail(email, name) {\n  // const resend = new Resend(process.env.RESEND_API_KEY);\n  const html = \`\n    <div style="font-family: sans-serif; max-width: 600px;">\n      <h2>Bine ai venit, \${name}!</h2>\n      <p>Contul tău a fost creat cu succes.</p>\n      <a href="\${process.env.NEXT_PUBLIC_URL}/confirm" style="background:#3b82f6;color:white;padding:12px 24px;border-radius:6px;text-decoration:none;">\n        Confirmă contul\n      </a>\n    </div>\n  \`;\n\n  console.log('Email trimis la:', email);\n  return { success: true };\n}`,
    expectedOutput: '',
  },
  {
    slug: 'nextjs-backend-lesson-19',
    name: 'File Upload cu next/server',
    question: 'Implementează un endpoint de upload pentru imagini: validare tip/dimensiune, salvare cu un nume unic, și returnare URL.',
    language: 'javascript',
    starterCode: `import { NextResponse } from 'next/server';\nimport { writeFile } from 'fs/promises';\nimport path from 'path';\n\nexport async function POST(request) {\n  const formData = await request.formData();\n  const file = formData.get('file');\n\n  if (!file) return NextResponse.json({ error: 'Niciun fișier' }, { status: 400 });\n\n  const allowed = ['image/jpeg', 'image/png', 'image/webp'];\n  if (!allowed.includes(file.type)) return NextResponse.json({ error: 'Tip interzis' }, { status: 400 });\n\n  if (file.size > 5 * 1024 * 1024) return NextResponse.json({ error: 'Prea mare' }, { status: 400 });\n\n  const bytes = await file.arrayBuffer();\n  const filename = \`\${Date.now()}-\${file.name}\`;\n  const filepath = path.join(process.cwd(), 'public/uploads', filename);\n  await writeFile(filepath, Buffer.from(bytes));\n\n  return NextResponse.json({ url: \`/uploads/\${filename}\` });\n}`,
    expectedOutput: '',
  },
  {
    slug: 'nextjs-backend-lesson-20',
    name: 'GraphQL cu Next.js',
    question: 'Configurează un endpoint GraphQL minimal cu Apollo Server în Next.js App Router. Definește schema cu Query pentru users și o rezolvare simplă.',
    language: 'javascript',
    starterCode: `// app/api/graphql/route.js\nimport { ApolloServer } from '@apollo/server';\nimport { startServerAndCreateNextHandler } from '@as-integrations/next';\n\nconst typeDefs = \`\n  type User { id: ID!, name: String!, email: String! }\n  type Query { users: [User!]!, user(id: ID!): User }\n\`;\n\nconst resolvers = {\n  Query: {\n    users: () => [\n      { id: '1', name: 'Alice', email: 'alice@ex.com' },\n      { id: '2', name: 'Bob', email: 'bob@ex.com' },\n    ],\n    user: (_, { id }) => ({ id, name: 'User ' + id, email: \`user\${id}@ex.com\` }),\n  },\n};\n\nconst server = new ApolloServer({ typeDefs, resolvers });\nconst handler = startServerAndCreateNextHandler(server);\nexport { handler as GET, handler as POST };`,
    expectedOutput: '',
  },
  {
    slug: 'nextjs-backend-lesson-21',
    name: 'tRPC cu Next.js',
    question: 'Configurează tRPC în Next.js: router cu proceduri query și mutation, type-safety end-to-end. Creează un router pentru todos cu getAll și create.',
    language: 'javascript',
    starterCode: `// server/routers/todo.js\nimport { z } from 'zod';\nimport { router, publicProcedure } from '../trpc';\n\nlet todos = [{ id: 1, text: 'Primul todo', done: false }];\n\nexport const todoRouter = router({\n  getAll: publicProcedure.query(() => todos),\n  create: publicProcedure\n    .input(z.object({ text: z.string().min(1) }))\n    .mutation(({ input }) => {\n      const todo = { id: todos.length + 1, text: input.text, done: false };\n      todos.push(todo);\n      return todo;\n    }),\n  toggle: publicProcedure\n    .input(z.number())\n    .mutation(({ input: id }) => {\n      const todo = todos.find(t => t.id === id);\n      if (todo) todo.done = !todo.done;\n      return todo;\n    }),\n});`,
    expectedOutput: '',
  },
  {
    slug: 'nextjs-backend-lesson-22',
    name: 'Stripe payments în Next.js',
    question: 'Implementează un checkout cu Stripe: creează un PaymentIntent server-side și returnează clientSecret. Client-ul folosește Elements pentru plată.',
    language: 'javascript',
    starterCode: `// app/api/create-payment-intent/route.js\nimport Stripe from 'stripe';\nimport { NextResponse } from 'next/server';\n\nconst stripe = new Stripe(process.env.STRIPE_SECRET_KEY);\n\nexport async function POST(request) {\n  const { amount, currency = 'ron' } = await request.json();\n\n  const paymentIntent = await stripe.paymentIntents.create({\n    amount: amount * 100, // Stripe folosește cents/bani\n    currency,\n    automatic_payment_methods: { enabled: true },\n  });\n\n  return NextResponse.json({\n    clientSecret: paymentIntent.client_secret,\n  });\n}`,
    expectedOutput: '',
  },
  {
    slug: 'nextjs-backend-lesson-23',
    name: 'Redis caching cu Upstash',
    question: 'Folosind Upstash Redis (sau simulat), implementează caching pentru un endpoint API: dacă există în cache returnează direct, altfel fetch-ează și salvează cu TTL de 5 minute.',
    language: 'javascript',
    starterCode: `import { NextResponse } from 'next/server';\n// import { Redis } from '@upstash/redis'; // dezcommentează în producție\n\n// Simulare Redis simplă\nconst cache = new Map();\nconst redis = {\n  get: async (key) => cache.get(key) || null,\n  set: async (key, value, { ex }) => {\n    cache.set(key, value);\n    setTimeout(() => cache.delete(key), ex * 1000);\n  },\n};\n\nexport async function GET(request) {\n  const { searchParams } = new URL(request.url);\n  const id = searchParams.get('id');\n  const cacheKey = \`post:\${id}\`;\n\n  const cached = await redis.get(cacheKey);\n  if (cached) return NextResponse.json({ ...cached, fromCache: true });\n\n  const data = { id, title: \`Post \${id}\`, content: 'Conținut...' };\n  await redis.set(cacheKey, data, { ex: 300 });\n  return NextResponse.json(data);\n}`,
    expectedOutput: '',
  },
  {
    slug: 'nextjs-backend-lesson-24',
    name: 'OpenAI integration în Next.js',
    question: 'Creează un API endpoint care trimite un prompt la OpenAI și returnează răspunsul. Folosește streaming pentru răspuns în timp real.',
    language: 'javascript',
    starterCode: `// app/api/ai/route.js\nimport { NextResponse } from 'next/server';\n\nexport async function POST(request) {\n  const { prompt } = await request.json();\n\n  // Cu AI SDK Vercel (recomandat)\n  // import { streamText } from 'ai';\n  // const result = await streamText({ model: 'anthropic/claude-haiku-4-5', prompt });\n  // return result.toDataStreamResponse();\n\n  // Simplu fără streaming\n  const response = await fetch('https://api.openai.com/v1/chat/completions', {\n    method: 'POST',\n    headers: {\n      'Authorization': \`Bearer \${process.env.OPENAI_API_KEY}\`,\n      'Content-Type': 'application/json',\n    },\n    body: JSON.stringify({\n      model: 'gpt-3.5-turbo',\n      messages: [{ role: 'user', content: prompt }],\n      max_tokens: 500,\n    }),\n  });\n\n  const data = await response.json();\n  return NextResponse.json({ reply: data.choices[0].message.content });\n}`,
    expectedOutput: '',
  },
  {
    slug: 'nextjs-backend-lesson-25',
    name: 'API versioning și documentație',
    question: 'Implementează versioning pentru API (/api/v1, /api/v2) cu diferite răspunsuri. Adaugă un endpoint /api/docs care returnează schema OpenAPI simplificată.',
    language: 'javascript',
    starterCode: `// app/api/v1/users/route.js\nexport async function GET() {\n  return Response.json({ version: 'v1', users: [{ id: 1, name: 'Alice' }] });\n}\n\n// app/api/v2/users/route.js — format îmbunătățit\nexport async function GET() {\n  return Response.json({\n    version: 'v2',\n    data: [{ id: 1, name: 'Alice', avatar: null }],\n    meta: { total: 1, page: 1, perPage: 10 },\n  });\n}\n\n// app/api/docs/route.js\nexport async function GET() {\n  return Response.json({\n    openapi: '3.0.0',\n    info: { title: 'TaskForge API', version: '2.0.0' },\n    paths: {\n      '/api/v2/users': { get: { summary: 'Lista useri' } },\n    },\n  });\n}`,
    expectedOutput: '',
  },
  {
    slug: 'nextjs-be-stripe-payments',
    name: 'Stripe Webhooks în Next.js',
    question: 'Implementează un webhook handler pentru Stripe care procesează evenimentele payment_intent.succeeded și customer.subscription.created.',
    language: 'javascript',
    starterCode: `import { NextResponse } from 'next/server';\nimport Stripe from 'stripe';\n\nconst stripe = new Stripe(process.env.STRIPE_SECRET_KEY);\n\nexport async function POST(request) {\n  const body = await request.text();\n  const signature = request.headers.get('stripe-signature');\n\n  let event;\n  try {\n    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET);\n  } catch (err) {\n    return NextResponse.json({ error: 'Webhook invalid' }, { status: 400 });\n  }\n\n  switch (event.type) {\n    case 'payment_intent.succeeded':\n      const pi = event.data.object;\n      console.log('Plată reușită:', pi.id);\n      break;\n    case 'customer.subscription.created':\n      const sub = event.data.object;\n      console.log('Abonament nou:', sub.id);\n      break;\n  }\n\n  return NextResponse.json({ received: true });\n}`,
    expectedOutput: '',
  },
  {
    slug: 'nextjs-be-file-upload',
    name: 'S3 File Upload cu presigned URL',
    question: 'Implementează upload sigur la S3/R2: generează un presigned URL server-side, clientul uploadează direct la S3 fără a trece prin server.',
    language: 'javascript',
    starterCode: `// app/api/upload-url/route.js\nimport { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';\nimport { getSignedUrl } from '@aws-sdk/s3-request-presigner';\nimport { NextResponse } from 'next/server';\n\nconst s3 = new S3Client({ region: process.env.AWS_REGION });\n\nexport async function POST(request) {\n  const { filename, contentType } = await request.json();\n  const key = \`uploads/\${Date.now()}-\${filename}\`;\n\n  const command = new PutObjectCommand({\n    Bucket: process.env.S3_BUCKET,\n    Key: key,\n    ContentType: contentType,\n  });\n\n  const url = await getSignedUrl(s3, command, { expiresIn: 3600 });\n  return NextResponse.json({ url, key });\n}`,
    expectedOutput: '',
  },
  {
    slug: 'nextjs-be-background-jobs',
    name: 'Background Jobs cu Vercel Cron',
    question: 'Configurează un cron job în Next.js care rulează zilnic: curăță datele expirate din DB și trimite un raport pe email.',
    language: 'javascript',
    starterCode: `// app/api/cron/cleanup/route.js\nimport { NextResponse } from 'next/server';\n\nexport async function GET(request) {\n  // Verificare token cron (securitate)\n  const authHeader = request.headers.get('authorization');\n  if (authHeader !== \`Bearer \${process.env.CRON_SECRET}\`) {\n    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });\n  }\n\n  // Curăță sesiuni expirate\n  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);\n  // await prisma.session.deleteMany({ where: { expiresAt: { lt: sevenDaysAgo } } });\n\n  console.log('Cleanup efectuat la:', new Date().toISOString());\n  return NextResponse.json({ success: true, cleanedAt: new Date() });\n}\n\n// vercel.json:\n// { "crons": [{ "path": "/api/cron/cleanup", "schedule": "0 2 * * *" }] }`,
    expectedOutput: '',
  },
  {
    slug: 'nextjs-be-rate-limiting',
    name: 'Rate Limiting avansat cu Upstash',
    question: 'Implementează rate limiting sliding window cu Upstash Redis: 100 request/oră per user autentificat, cu headers X-RateLimit-* în response.',
    language: 'javascript',
    starterCode: `import { NextResponse } from 'next/server';\n\n// Simulare Upstash sliding window\nasync function checkRateLimit(userId) {\n  const key = \`rate:\${userId}\`;\n  const limit = 100;\n  const window = 60 * 60; // 1 oră în secunde\n  \n  // În producție: folosești @upstash/ratelimit\n  // const ratelimit = new Ratelimit({ redis, limiter: Ratelimit.slidingWindow(100, '1h') });\n  // return ratelimit.limit(userId);\n\n  return { success: true, limit, remaining: 95, reset: Date.now() + window * 1000 };\n}\n\nexport async function GET(request) {\n  const userId = request.headers.get('x-user-id') || 'anonymous';\n  const { success, limit, remaining, reset } = await checkRateLimit(userId);\n\n  if (!success) {\n    return NextResponse.json({ error: 'Rate limit depășit' }, {\n      status: 429,\n      headers: { 'Retry-After': String(Math.ceil((reset - Date.now()) / 1000)) },\n    });\n  }\n\n  return NextResponse.json({ data: 'ok' }, {\n    headers: {\n      'X-RateLimit-Limit': String(limit),\n      'X-RateLimit-Remaining': String(remaining),\n    },\n  });\n}`,
    expectedOutput: '',
  },
  {
    slug: 'nextjs-be-advanced-api',
    name: 'API completă REST cu Next.js',
    question: 'Construiește un API REST complet pentru un resource "posts": GET /posts, GET /posts/:id, POST /posts, PUT /posts/:id, DELETE /posts/:id.',
    language: 'javascript',
    starterCode: `// app/api/posts/route.js\nimport { NextResponse } from 'next/server';\n\nlet posts = [\n  { id: 1, title: 'Primul post', content: 'Conținut...', createdAt: new Date() },\n];\n\nexport async function GET() {\n  return NextResponse.json(posts);\n}\n\nexport async function POST(request) {\n  const body = await request.json();\n  const post = { id: posts.length + 1, ...body, createdAt: new Date() };\n  posts.push(post);\n  return NextResponse.json(post, { status: 201 });\n}\n\n// app/api/posts/[id]/route.js\nexport async function PUT(request, { params }) {\n  const body = await request.json();\n  // actualizează posts array\n  return NextResponse.json({ ...body, id: params.id });\n}\n\nexport async function DELETE(request, { params }) {\n  // șterge din posts array\n  return new Response(null, { status: 204 });\n}`,
    expectedOutput: '',
  },
];

async function main() {
  console.log('Adăugare coding tasks Next.js Backend...');
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
