const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const FIXES = [
  {
    lessonId: "69fa35df07a1f637cf4f17bc",
    name: "4. Request Č™i Response",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ metoda pentru a citi body-ul unui request JSON:\n```js\nconst data = await request.___()\n```",
        answer: "json", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ clasa Next.js pentru construirea rÄspunsurilor:\n```js\nreturn NextResponse.___(data)\n```",
        answer: "json", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ al doilea argument al NextResponse.json pentru status code:\n```js\nNextResponse.json({ error: 'Not found' }, { status: ___ })\n```",
        answer: "404", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ metoda pentru a citi headers dintr-un request:\n```js\nconst auth = request.headers.___('Authorization')\n```",
        answer: "get", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ metoda request pentru a citi query params:\n```js\nconst { searchParams } = new URL(request.___)\n```",
        answer: "url", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "CreeazÄ un obiect care simuleazÄ un response NextResponse.json Č™i afiČ™eazÄ cu console.log statusul Č™i numÄrul de chei din body.",
        answer: "const response = { status: 200, body: { id: 1, name: 'Test', email: 'test@test.com' } };\nconsole.log(response.status);\nconsole.log(Object.keys(response.body).length);",
        starterCode: "", language: "javascript",
        expectedOutput: "200\n3"
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Ai un array de request-uri. FiltreazÄ doar request-urile POST Č™i afiČ™eazÄ cĂ˘te sunt cu console.log.\n```js\nconst reqs = [{method:'GET'},{method:'POST'},{method:'GET'},{method:'POST'},{method:'DELETE'}];\n```",
        answer: "const reqs = [{method:'GET'},{method:'POST'},{method:'GET'},{method:'POST'},{method:'DELETE'}];\nconsole.log(reqs.filter(r => r.method === 'POST').length);",
        starterCode: "", language: "javascript",
        expectedOutput: "2"
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "ConstruieČ™te Č™i afiČ™eazÄ cu console.log un URL cu query params pentru '/api/users' cu page=2 Č™i limit=10.",
        answer: "const base = '/api/users';\nconst params = new URLSearchParams({ page: '2', limit: '10' });\nconsole.log(`${base}?${params.toString()}`);",
        starterCode: "", language: "javascript",
        expectedOutput: "/api/users?page=2&limit=10"
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "AfiČ™eazÄ cu console.log metodele HTTP Č™i statusurile lor de succes (GET:200, POST:201, PUT:200, DELETE:204), cĂ˘te una pe linie.",
        answer: "[['GET','200'],['POST','201'],['PUT','200'],['DELETE','204']].forEach(([m,s]) => console.log(`${m}:${s}`));",
        starterCode: "", language: "javascript",
        expectedOutput: "GET:200\nPOST:201\nPUT:200\nDELETE:204"
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "ConstruieČ™te un obiect cu statusurile HTTP comune Č™i semnificaČ›iile lor, Č™i afiČ™eazÄ numÄrul de statusuri cu console.log.",
        answer: "const statuses = { 200:'OK', 201:'Created', 400:'Bad Request', 401:'Unauthorized', 403:'Forbidden', 404:'Not Found', 500:'Server Error' };\nconsole.log(Object.keys(statuses).length);",
        starterCode: "", language: "javascript",
        expectedOutput: "7"
      }
    ]
  },
  {
    lessonId: "69fa35e307a1f637cf4f17da",
    name: "6. Form Handling cu Server Actions",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ directiva pentru o funcČ›ie Server Action:\n```js\n'use ___'\n```",
        answer: "server", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ metoda FormData pentru a citi un cĂ˘mp:\n```js\nconst name = formData.___('name')\n```",
        answer: "get", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ funcČ›ia de redirect dupÄ procesarea formularului:\n```js\n___(  '/dashboard')\n```",
        answer: "redirect", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ prop-ul form pentru a atribui Server Action:\n```jsx\n<form ___={myAction}>\n```",
        answer: "action", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ importul redirect din Next.js:\n```js\nimport { redirect } from 'next/___'\n```",
        answer: "navigation", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "SimuleazÄ procesarea unui formular: extrage cĂ˘mpurile din un obiect Č™i afiČ™eazÄ cĂ˘te cĂ˘mpuri non-goale are cu console.log.",
        answer: "const form = { name: 'Ion', email: 'ion@test.com', message: '', phone: '0723456789' };\nconsole.log(Object.values(form).filter(v => v !== '').length);",
        starterCode: "", language: "javascript",
        expectedOutput: "3"
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Ai un array de cĂ˘mpuri de formular. FiltreazÄ cĂ˘mpurile required care sunt goale Č™i afiČ™eazÄ cĂ˘te sunt cu console.log.\n```js\nconst fields = [{name:'email',value:'',required:true},{name:'name',value:'Ion',required:true},{name:'phone',value:'',required:false},{name:'password',value:'',required:true}];\n```",
        answer: "const fields = [{name:'email',value:'',required:true},{name:'name',value:'Ion',required:true},{name:'phone',value:'',required:false},{name:'password',value:'',required:true}];\nconsole.log(fields.filter(f => f.required && f.value === '').length);",
        starterCode: "", language: "javascript",
        expectedOutput: "2"
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "ConstruieČ™te Č™i afiČ™eazÄ cu console.log avantajele Server Actions faČ›Ä de API routes (no-api-endpoint, progressive-enhancement, revalidation, type-safe), cĂ˘te unul pe linie.",
        answer: "['no-api-endpoint','progressive-enhancement','revalidation','type-safe'].forEach(a => console.log(a));",
        starterCode: "", language: "javascript",
        expectedOutput: "no-api-endpoint\nprogressive-enhancement\nrevalidation\ntype-safe"
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "AfiČ™eazÄ cu console.log paČ™ii procesÄrii unui Server Action (parse-formdata, validate, db-write, revalidate, redirect), cĂ˘te unul pe linie.",
        answer: "['parse-formdata','validate','db-write','revalidate','redirect'].forEach(s => console.log(s));",
        starterCode: "", language: "javascript",
        expectedOutput: "parse-formdata\nvalidate\ndb-write\nrevalidate\nredirect"
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "ConstruieČ™te un obiect cu tipurile de acČ›iuni Server Actions Č™i afiČ™eazÄ numÄrul cu console.log.",
        answer: "const actions = { create: 'createUser', update: 'updateUser', delete: 'deleteUser', authenticate: 'loginUser' };\nconsole.log(Object.keys(actions).length);",
        starterCode: "", language: "javascript",
        expectedOutput: "4"
      }
    ]
  },
  {
    lessonId: "69fa35e807a1f637cf4f17f8",
    name: "8. Autentificare â€” Basics",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ pachetul pentru hash-uirea parolelor:\n```js\nconst hash = await bcryptjs.___(password, 10)\n```",
        answer: "hash", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ funcČ›ia jwt pentru a semna un token:\n```js\nconst token = jwt.___(payload, secret, { expiresIn: '7d' })\n```",
        answer: "sign", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ algoritmul de hashing folosit de bcrypt (numÄrul de runde):\n```js\nawait bcrypt.hash(password, ___)\n```",
        answer: "10", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ funcČ›ia jwt pentru a verifica un token:\n```js\nconst decoded = jwt.___(token, secret)\n```",
        answer: "verify", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ tipul de cookie pentru token JWT (nu accesibil din JS):\n```js\ncookies().set('token', jwt, { httpOnly: ___ })\n```",
        answer: "true", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "SimuleazÄ structura unui JWT: afiČ™eazÄ cu console.log numÄrul de segmente ale unui token JWT (header.payload.signature).",
        answer: "const jwt = 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiIxMjMifQ.signature';\nconsole.log(jwt.split('.').length);",
        starterCode: "", language: "javascript",
        expectedOutput: "3"
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Ai un array de utilizatori cu parole hash-uite. AfiČ™eazÄ cĂ˘te au parole care Ă®ncep cu '$2' (format bcrypt) cu console.log.\n```js\nconst users = [{name:'Ion',password:'$2b$10$abc123'},{name:'Ana',password:'plaintext'},{name:'Cristi',password:'$2b$10$xyz456'},{name:'Maria',password:'$2b$10$def789'}];\n```",
        answer: "const users = [{name:'Ion',password:'$2b$10$abc123'},{name:'Ana',password:'plaintext'},{name:'Cristi',password:'$2b$10$xyz456'},{name:'Maria',password:'$2b$10$def789'}];\nconsole.log(users.filter(u => u.password.startsWith('$2')).length);",
        starterCode: "", language: "javascript",
        expectedOutput: "3"
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "ConstruieČ™te Č™i afiČ™eazÄ cu console.log payload-ul unui JWT pentru un utilizator autentificat.",
        answer: "const payload = { userId: '507f1f77bcf86cd799439011', email: 'user@test.com', role: 'user' };\nconsole.log(JSON.stringify(payload));",
        starterCode: "", language: "javascript",
        expectedOutput: "{\"userId\":\"507f1f77bcf86cd799439011\",\"email\":\"user@test.com\",\"role\":\"user\"}"
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "AfiČ™eazÄ cu console.log atributele recomandate pentru cookie-ul JWT (httpOnly, secure, sameSite, path), cĂ˘te unul pe linie.",
        answer: "['httpOnly: true','secure: true','sameSite: strict','path: /'].forEach(a => console.log(a));",
        starterCode: "", language: "javascript",
        expectedOutput: "httpOnly: true\nsecure: true\nsameSite: strict\npath: /"
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "ConstruieČ™te un obiect cu configuraČ›ia completÄ de autentificare Č™i afiČ™eazÄ numÄrul de chei cu console.log.",
        answer: "const authConfig = { hashRounds: 10, jwtSecret: 'env.JWT_SECRET', tokenExpiry: '7d', cookieName: 'auth_token', httpOnly: true };\nconsole.log(Object.keys(authConfig).length);",
        starterCode: "", language: "javascript",
        expectedOutput: "5"
      }
    ]
  },
  {
    lessonId: "69fa35ec07a1f637cf4f1816",
    name: "10. Caching Č™i Revalidation",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ opČ›iunea fetch pentru cache static Ă®n Next.js:\n```js\nfetch(url, { cache: '___' })\n```",
        answer: "force-cache", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ funcČ›ia Next.js pentru invalidarea cache-ului unui path:\n```js\n___Path('/dashboard')\n```",
        answer: "revalidate", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ funcČ›ia Next.js pentru invalidarea cache-ului unui tag:\n```js\n___Tag('products')\n```",
        answer: "revalidate", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ opČ›iunea fetch pentru ISR cu 60 secunde:\n```js\nfetch(url, { next: { revalidate: ___ } })\n```",
        answer: "60", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ opČ›iunea fetch pentru a dezactiva complet cache-ul:\n```js\nfetch(url, { cache: '___' })\n```",
        answer: "no-store", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "CreeazÄ un array cu strategiile de caching Next.js (force-cache, no-store, no-cache, revalidate-60s, on-demand) Č™i afiČ™eazÄ cĂ˘te sunt cu console.log.",
        answer: "const strategies = ['force-cache','no-store','no-cache','revalidate-60s','on-demand'];\nconsole.log(strategies.length);",
        starterCode: "", language: "javascript",
        expectedOutput: "5"
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Ai un array de endpoint-uri API cu strategia de cache. FiltreazÄ pe cele cu cache static (force-cache) Č™i afiČ™eazÄ cĂ˘te sunt cu console.log.\n```js\nconst endpoints = [{url:'/api/config',cache:'force-cache'},{url:'/api/user',cache:'no-store'},{url:'/api/products',cache:'force-cache'},{url:'/api/cart',cache:'no-store'},{url:'/api/categories',cache:'force-cache'}];\n```",
        answer: "const endpoints = [{url:'/api/config',cache:'force-cache'},{url:'/api/user',cache:'no-store'},{url:'/api/products',cache:'force-cache'},{url:'/api/cart',cache:'no-store'},{url:'/api/categories',cache:'force-cache'}];\nconsole.log(endpoints.filter(e => e.cache === 'force-cache').length);",
        starterCode: "", language: "javascript",
        expectedOutput: "3"
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "ConstruieČ™te Č™i afiČ™eazÄ cu console.log opČ›iunea fetch pentru ISR cu tag 'products' Č™i revalidare la 300 secunde.",
        answer: "const opts = { next: { revalidate: 300, tags: ['products'] } };\nconsole.log(JSON.stringify(opts));",
        starterCode: "", language: "javascript",
        expectedOutput: "{\"next\":{\"revalidate\":300,\"tags\":[\"products\"]}}"
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "AfiČ™eazÄ cu console.log cele 4 tipuri de cache Ă®n Next.js (request-memoization, data-cache, full-route-cache, router-cache), cĂ˘te unul pe linie.",
        answer: "['request-memoization','data-cache','full-route-cache','router-cache'].forEach(c => console.log(c));",
        starterCode: "", language: "javascript",
        expectedOutput: "request-memoization\ndata-cache\nfull-route-cache\nrouter-cache"
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "ConstruieČ™te un obiect cu configuraČ›ia de revalidare pentru diferite tipuri de date Č™i afiČ™eazÄ numÄrul de chei cu console.log.",
        answer: "const revalidation = { static: 'force-cache', dynamic: 'no-store', periodic: 3600, tagged: ['products','users'] };\nconsole.log(Object.keys(revalidation).length);",
        starterCode: "", language: "javascript",
        expectedOutput: "4"
      }
    ]
  },
  {
    lessonId: "69fb25a6a7657a7d121f05b8",
    name: "11. Server Actions avansate",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ hook-ul pentru starea unui form trimis cu Server Action:\n```js\nconst [state, formAction] = use___(action, initialState)\n```",
        answer: "FormState", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ metoda bind pentru Server Actions cu date predefinite:\n```js\nconst actionWithId = deleteAction.___(null, postId)\n```",
        answer: "bind", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ hook-ul React pentru starea pending a unui form:\n```js\nconst { pending } = useForm___()\n```",
        answer: "Status", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ funcČ›ia Next.js pentru invalidarea cache-ului dupÄ mutaČ›ie:\n```js\nrevalidate___('/posts')\n```",
        answer: "Path", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ abordarea pentru actualizÄri optimiste Ă®n Server Actions:\n```js\nconst [optimisticPosts, addOptimisticPost] = useOptimistic(posts, ___)\n```",
        answer: "reducer", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "SimuleazÄ optimistic update: ai o lista de posts. AdaugÄ un post temporar Č™i afiČ™eazÄ lungimea listei cu console.log.",
        answer: "const posts = [{id:1,title:'Post 1'},{id:2,title:'Post 2'}];\nconst optimisticPost = {id:'temp',title:'New Post'};\nconst optimistic = [...posts, optimisticPost];\nconsole.log(optimistic.length);",
        starterCode: "", language: "javascript",
        expectedOutput: "3"
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "SimuleazÄ starea unui form cu Server Action: ai un obiect cu erori. AfiČ™eazÄ cĂ˘te cĂ˘mpuri au erori cu console.log.\n```js\nconst state = { errors: { email: 'Invalid email', password: null, name: 'Required', phone: null } };\n```",
        answer: "const state = { errors: { email: 'Invalid email', password: null, name: 'Required', phone: null } };\nconsole.log(Object.values(state.errors).filter(e => e !== null).length);",
        starterCode: "", language: "javascript",
        expectedOutput: "2"
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "ConstruieČ™te Č™i afiČ™eazÄ cu console.log fluxul complet al unui Server Action cu optimistic update (optimistic-add, server-action, success, revalidate sau rollback).",
        answer: "['optimistic-add','server-action','success','revalidate'].forEach(s => console.log(s));",
        starterCode: "", language: "javascript",
        expectedOutput: "optimistic-add\nserver-action\nsuccess\nrevalidate"
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "AfiČ™eazÄ cu console.log metodele avansate Server Actions (bind, useFormState, useFormStatus, useOptimistic), cĂ˘te una pe linie.",
        answer: "['bind','useFormState','useFormStatus','useOptimistic'].forEach(m => console.log(m));",
        starterCode: "", language: "javascript",
        expectedOutput: "bind\nuseFormState\nuseFormStatus\nuseOptimistic"
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "ConstruieČ™te un obiect cu starea iniČ›ialÄ a unui formular Č™i afiČ™eazÄ numÄrul de cĂ˘mpuri cu console.log.",
        answer: "const initial = { message: '', errors: { title: null, content: null, tags: null }, success: false };\nconsole.log(Object.keys(initial).length);",
        starterCode: "", language: "javascript",
        expectedOutput: "3"
      }
    ]
  },
  {
    lessonId: "69fb25a8a7657a7d121f05c4",
    name: "12. Edge Runtime vs Node Runtime",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ valoarea pentru a forČ›a Edge Runtime:\n```js\nexport const runtime = '___'\n```",
        answer: "edge", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ valoarea pentru Node.js Runtime:\n```js\nexport const runtime = '___'\n```",
        answer: "nodejs", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ API-ul disponibil Ă®n Edge Runtime pentru rÄspunsuri:\n```js\nreturn new ___(data, { status: 200 })\n```",
        answer: "Response", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ API-ul Edge disponibil pentru Request:\n```js\nconst req = new ___(url, options)\n```",
        answer: "Request", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ avantajul principal al Edge Runtime faČ›Ä de Node:\n```\nmei micÄ ___ (latenČ›Ä)\n```",
        answer: "latenta", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "CreeazÄ un array cu limitÄrile Edge Runtime faČ›Ä de Node (no-filesystem, no-native-modules, limited-apis, smaller-bundle, no-prisma) Č™i afiČ™eazÄ cĂ˘te sunt cu console.log.",
        answer: "const limits = ['no-filesystem','no-native-modules','limited-apis','smaller-bundle','no-prisma'];\nconsole.log(limits.length);",
        starterCode: "", language: "javascript",
        expectedOutput: "5"
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Ai un array de funcČ›ii API cu runtime-ul lor. FiltreazÄ funcČ›iile Edge Č™i afiČ™eazÄ cĂ˘te sunt cu console.log.\n```js\nconst fns = [{name:'geo',runtime:'edge'},{name:'auth',runtime:'nodejs'},{name:'ab-test',runtime:'edge'},{name:'db-query',runtime:'nodejs'},{name:'redirect',runtime:'edge'}];\n```",
        answer: "const fns = [{name:'geo',runtime:'edge'},{name:'auth',runtime:'nodejs'},{name:'ab-test',runtime:'edge'},{name:'db-query',runtime:'nodejs'},{name:'redirect',runtime:'edge'}];\nconsole.log(fns.filter(f => f.runtime === 'edge').length);",
        starterCode: "", language: "javascript",
        expectedOutput: "3"
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "ConstruieČ™te Č™i afiČ™eazÄ cu console.log cazurile de utilizare pentru Edge Runtime (geo-routing, ab-testing, auth-check, redirect-logic), cĂ˘te unul pe linie.",
        answer: "['geo-routing','ab-testing','auth-check','redirect-logic'].forEach(u => console.log(u));",
        starterCode: "", language: "javascript",
        expectedOutput: "geo-routing\nab-testing\nauth-check\nredirect-logic"
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "AfiČ™eazÄ cu console.log comparaČ›ia Edge vs Node (latency: ms vs ms, cold-start: fast vs slow, apis: web vs node), cĂ˘te una pe linie.",
        answer: "[['latency','<1ms vs 50ms'],['cold-start','fast vs slow'],['apis','web-standard vs node-full']].forEach(([k,v]) => console.log(`${k}: ${v}`));",
        starterCode: "", language: "javascript",
        expectedOutput: "latency: <1ms vs 50ms\ncold-start: fast vs slow\napis: web-standard vs node-full"
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "ConstruieČ™te un obiect cu API-urile disponibile Ă®n Edge Runtime Č™i afiČ™eazÄ numÄrul cu console.log.",
        answer: "const edgeApis = { fetch: true, Request: true, Response: true, Headers: true, URL: true, crypto: true, TextEncoder: true };\nconsole.log(Object.keys(edgeApis).length);",
        starterCode: "", language: "javascript",
        expectedOutput: "7"
      }
    ]
  },
  {
    lessonId: "69fb25aaa7657a7d121f05d0",
    name: "13. Streaming responses",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ clasa pentru a crea un stream de date:\n```js\nconst stream = new ___(controller => {})\n```",
        answer: "ReadableStream", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ clasa pentru encoding text Ă®n stream:\n```js\nconst encoder = new ___()\nencoder.encode('Hello')\n```",
        answer: "TextEncoder", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ metoda pentru a trimite date prin stream:\n```js\ncontroller.___(encoder.encode(chunk))\n```",
        answer: "enqueue", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ metoda pentru a Ă®nchide stream-ul:\n```js\ncontroller.___( )\n```",
        answer: "close", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ formatul evenimentelor SSE (Server-Sent Events):\n```\ndata: { message: 'Hello' }\\n___\n```",
        answer: "\\n", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "CreeazÄ un array cu cazurile de utilizare pentru streaming (ai-responses, large-data, real-time-updates, file-download, live-logs) Č™i afiČ™eazÄ cĂ˘te sunt cu console.log.",
        answer: "const uses = ['ai-responses','large-data','real-time-updates','file-download','live-logs'];\nconsole.log(uses.length);",
        starterCode: "", language: "javascript",
        expectedOutput: "5"
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "SimuleazÄ chunked streaming: ai un array de chunk-uri de text. ConstruieČ™te mesajul complet concatenĂ˘nd chunk-urile Č™i afiČ™eazÄ lungimea cu console.log.\n```js\nconst chunks = ['Bun ', 'venit ', 'la ', 'Next.js ', 'Backend!'];\n```",
        answer: "const chunks = ['Bun ', 'venit ', 'la ', 'Next.js ', 'Backend!'];\nconst message = chunks.join('');\nconsole.log(message.length);",
        starterCode: "", language: "javascript",
        expectedOutput: "25"
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "ConstruieČ™te Č™i afiČ™eazÄ cu console.log formatul unui eveniment SSE complet cu id, event Č™i data.",
        answer: "const event = { id: '1', event: 'message', data: JSON.stringify({ text: 'Hello' }) };\nObject.entries(event).forEach(([k,v]) => console.log(`${k}: ${v}`));",
        starterCode: "", language: "javascript",
        expectedOutput: "id: 1\nevent: message\ndata: {\"text\":\"Hello\"}"
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "AfiČ™eazÄ cu console.log header-ele necesare pentru SSE (Content-Type, Cache-Control, Connection), cĂ˘te unul pe linie.",
        answer: "[['Content-Type','text/event-stream'],['Cache-Control','no-cache'],['Connection','keep-alive']].forEach(([k,v]) => console.log(`${k}: ${v}`));",
        starterCode: "", language: "javascript",
        expectedOutput: "Content-Type: text/event-stream\nCache-Control: no-cache\nConnection: keep-alive"
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "ConstruieČ™te un obiect cu tehnicile de streaming Č™i descrierile lor, Č™i afiČ™eazÄ numÄrul cu console.log.",
        answer: "const techs = { ReadableStream: 'native streaming API', SSE: 'server-sent events', websockets: 'bidirectional', chunked: 'HTTP chunked transfer' };\nconsole.log(Object.keys(techs).length);",
        starterCode: "", language: "javascript",
        expectedOutput: "4"
      }
    ]
  },
  {
    lessonId: "69fb25aba7657a7d121f05dc",
    name: "14. Rate Limiting & Security",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ header-ul HTTP care indicÄ limita de request-uri:\n```js\nresponse.headers.set('X-RateLimit-___', '100')\n```",
        answer: "Limit", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ header-ul HTTP care indicÄ request-uri rÄmase:\n```js\nresponse.headers.set('X-RateLimit-___', remaining)\n```",
        answer: "Remaining", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ statusul HTTP pentru prea multe request-uri:\n```js\nreturn NextResponse.json({ error: 'Too Many Requests' }, { status: ___ })\n```",
        answer: "429", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ header-ul CORS pentru origini permise:\n```js\nres.setHeader('Access-Control-Allow-___', '*')\n```",
        answer: "Origin", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ tipul de atac prevenit prin sanitizarea input-ului:\n```\n___ injection\n```",
        answer: "SQL", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "SimuleazÄ rate limiting: ai un obiect cu contoarele IP-urilor. AfiČ™eazÄ cĂ˘te IP-uri au depÄČ™it limita de 100 request-uri cu console.log.\n```js\nconst counters = {'1.2.3.4':150,'5.6.7.8':50,'9.10.11.12':200,'13.14.15.16':80,'17.18.19.20':120};\n```",
        answer: "const counters = {'1.2.3.4':150,'5.6.7.8':50,'9.10.11.12':200,'13.14.15.16':80,'17.18.19.20':120};\nconsole.log(Object.values(counters).filter(c => c > 100).length);",
        starterCode: "", language: "javascript",
        expectedOutput: "3"
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Ai un array de request-uri cu IP-uri. CalculeazÄ cĂ˘te request-uri are IP-ul '1.2.3.4' Č™i afiČ™eazÄ cu console.log.\n```js\nconst requests = [{ip:'1.2.3.4'},{ip:'5.6.7.8'},{ip:'1.2.3.4'},{ip:'1.2.3.4'},{ip:'9.10.11.12'}];\n```",
        answer: "const requests = [{ip:'1.2.3.4'},{ip:'5.6.7.8'},{ip:'1.2.3.4'},{ip:'1.2.3.4'},{ip:'9.10.11.12'}];\nconsole.log(requests.filter(r => r.ip === '1.2.3.4').length);",
        starterCode: "", language: "javascript",
        expectedOutput: "3"
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "ConstruieČ™te Č™i afiČ™eazÄ cu console.log header-ele de securitate recomandate (X-Content-Type-Options, X-Frame-Options, X-XSS-Protection, Strict-Transport-Security), cĂ˘te unul pe linie.",
        answer: "['X-Content-Type-Options','X-Frame-Options','X-XSS-Protection','Strict-Transport-Security'].forEach(h => console.log(h));",
        starterCode: "", language: "javascript",
        expectedOutput: "X-Content-Type-Options\nX-Frame-Options\nX-XSS-Protection\nStrict-Transport-Security"
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "AfiČ™eazÄ cu console.log tehnicile de securitate pentru API Next.js (rate-limiting, cors, input-validation, auth-middleware, https-only), cĂ˘te una pe linie.",
        answer: "['rate-limiting','cors','input-validation','auth-middleware','https-only'].forEach(t => console.log(t));",
        starterCode: "", language: "javascript",
        expectedOutput: "rate-limiting\ncors\ninput-validation\nauth-middleware\nhttps-only"
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "ConstruieČ™te un obiect cu configuraČ›ia de rate limiting Č™i afiČ™eazÄ numÄrul de chei cu console.log.",
        answer: "const rl = { windowMs: 60000, maxRequests: 100, message: 'Too many requests', statusCode: 429, headers: true };\nconsole.log(Object.keys(rl).length);",
        starterCode: "", language: "javascript",
        expectedOutput: "5"
      }
    ]
  },
  {
    lessonId: "69fb25ada7657a7d121f05e8",
    name: "15. Deploy & Environment Variables",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ prefixul pentru variabilele de mediu publice Next.js:\n```\n___PUBLIC_API_URL=https://api.example.com\n```",
        answer: "NEXT_", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ fiČ™ierul de variabile locale Next.js (nu se commiteazÄ):\n```\n.___.local\n```",
        answer: "env", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ obiectul global Node.js pentru variabile de mediu:\n```js\nconst url = process.___DATABASE_URL\n```",
        answer: "env.", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ fiČ™ierul de variabile pentru producČ›ie:\n```\n.env.___\n```",
        answer: "production", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ comanda Vercel CLI pentru deploy Ă®n producČ›ie:\n```\nvercel --___\n```",
        answer: "prod", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "CreeazÄ un array cu fiČ™ierele .env din Next.js Ă®n ordinea prioritÄČ›ii Č™i afiČ™eazÄ cĂ˘te sunt cu console.log.",
        answer: "const envFiles = ['.env.local','.env.development.local','.env.production.local','.env.development','.env.production','.env'];\nconsole.log(envFiles.length);",
        starterCode: "", language: "javascript",
        expectedOutput: "6"
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Ai un array de variabile de mediu. FiltreazÄ variabilele private (nu Ă®ncep cu NEXT_PUBLIC_) Č™i afiČ™eazÄ cĂ˘te sunt cu console.log.\n```js\nconst vars = ['DATABASE_URL','NEXT_PUBLIC_API_URL','JWT_SECRET','NEXT_PUBLIC_SITE_NAME','STRIPE_SECRET','NEXTAUTH_SECRET'];\n```",
        answer: "const vars = ['DATABASE_URL','NEXT_PUBLIC_API_URL','JWT_SECRET','NEXT_PUBLIC_SITE_NAME','STRIPE_SECRET','NEXTAUTH_SECRET'];\nconsole.log(vars.filter(v => !v.startsWith('NEXT_PUBLIC_')).length);",
        starterCode: "", language: "javascript",
        expectedOutput: "4"
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "ConstruieČ™te Č™i afiČ™eazÄ cu console.log variabilele de mediu minime necesare pentru un proiect Next.js full-stack (DATABASE_URL, NEXTAUTH_SECRET, NEXTAUTH_URL), cĂ˘te una pe linie.",
        answer: "['DATABASE_URL','NEXTAUTH_SECRET','NEXTAUTH_URL'].forEach(v => console.log(v));",
        starterCode: "", language: "javascript",
        expectedOutput: "DATABASE_URL\nNEXTAUTH_SECRET\nNEXTAUTH_URL"
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "AfiČ™eazÄ cu console.log mediile Vercel Č™i fiČ™ierele .env corespunzÄtoare (development:.env.local, preview:.env, production:.env.production), cĂ˘te unul pe linie.",
        answer: "[['development','.env.local'],['preview','.env'],['production','.env.production']].forEach(([e,f]) => console.log(`${e}:${f}`));",
        starterCode: "", language: "javascript",
        expectedOutput: "development:.env.local\npreview:.env\nproduction:.env.production"
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "ConstruieČ™te un obiect cu variabilele de mediu ale unui proiect Č™i afiČ™eazÄ cĂ˘te sunt private (valoarea 'private') cu console.log.",
        answer: "const envVars = { DATABASE_URL: 'private', NEXTAUTH_SECRET: 'private', NEXT_PUBLIC_API: 'public', JWT_SECRET: 'private', NEXT_PUBLIC_URL: 'public' };\nconsole.log(Object.values(envVars).filter(v => v === 'private').length);",
        starterCode: "", language: "javascript",
        expectedOutput: "3"
      }
    ]
  },
  {
    lessonId: "6a021af1f0ec7fc9c03a65ba",
    name: "16. Advanced Route Handlers",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ numele fiČ™ierului pentru Route Handler Ă®n App Router:\n```\napp/api/users/___\n```",
        answer: "route.js", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ exportul pentru o rutÄ GET Ă®n Route Handler:\n```js\nexport async function ___( request) {}\n```",
        answer: "GET", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ parametrul pentru segmentele dinamice Ă®n Route Handler:\n```js\nexport async function GET(request, { ___ }) {}\n```",
        answer: "params", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ metodele HTTP exportate Ă®n Route Handlers:\n```js\nexport async function ___(request) {} // pentru creare\n```",
        answer: "POST", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ metoda pentru actualizare parČ›ialÄ Ă®n REST:\n```js\nexport async function ___(request, { params }) {}\n```",
        answer: "PATCH", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "CreeazÄ un array cu metodele HTTP suportate Ă®n Route Handlers (GET, POST, PUT, PATCH, DELETE, OPTIONS, HEAD) Č™i afiČ™eazÄ cĂ˘te sunt cu console.log.",
        answer: "const methods = ['GET','POST','PUT','PATCH','DELETE','OPTIONS','HEAD'];\nconsole.log(methods.length);",
        starterCode: "", language: "javascript",
        expectedOutput: "7"
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Ai un array de rute API. AfiČ™eazÄ cu console.log cĂ˘te sunt rute dinamice (conČ›in '[').\n```js\nconst routes = ['api/users','api/users/[id]','api/posts','api/posts/[slug]','api/auth/[...nextauth]'];\n```",
        answer: "const routes = ['api/users','api/users/[id]','api/posts','api/posts/[slug]','api/auth/[...nextauth]'];\nconsole.log(routes.filter(r => r.includes('[')).length);",
        starterCode: "", language: "javascript",
        expectedOutput: "3"
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "ConstruieČ™te Č™i afiČ™eazÄ cu console.log structura REST pentru resursa 'users' (GET /users, POST /users, GET /users/[id], PATCH /users/[id], DELETE /users/[id]), cĂ˘te una pe linie.",
        answer: "['GET /users','POST /users','GET /users/[id]','PATCH /users/[id]','DELETE /users/[id]'].forEach(r => console.log(r));",
        starterCode: "", language: "javascript",
        expectedOutput: "GET /users\nPOST /users\nGET /users/[id]\nPATCH /users/[id]\nDELETE /users/[id]"
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "AfiČ™eazÄ cu console.log structura de foldere pentru un API REST complet cu users Č™i posts, cĂ˘te una pe linie.",
        answer: "['app/api/users/route.js','app/api/users/[id]/route.js','app/api/posts/route.js','app/api/posts/[slug]/route.js'].forEach(f => console.log(f));",
        starterCode: "", language: "javascript",
        expectedOutput: "app/api/users/route.js\napp/api/users/[id]/route.js\napp/api/posts/route.js\napp/api/posts/[slug]/route.js"
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "ConstruieČ™te un obiect cu endpoint-urile API Č™i metodele HTTP, Č™i afiČ™eazÄ numÄrul de endpoint-uri cu console.log.",
        answer: "const endpoints = { '/api/users': ['GET','POST'], '/api/users/[id]': ['GET','PATCH','DELETE'], '/api/auth/login': ['POST'], '/api/auth/logout': ['POST'] };\nconsole.log(Object.keys(endpoints).length);",
        starterCode: "", language: "javascript",
        expectedOutput: "4"
      }
    ]
  },
  {
    lessonId: "6a021af2f0ec7fc9c03a65bf",
    name: "17. Middleware and Edge Functions",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ fiČ™ierul de middleware Ă®n Next.js (la rÄdÄcina proiectului):\n```\n___.ts\n```",
        answer: "middleware", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ exportul de config din middleware pentru pattern matching:\n```js\nexport const config = { ___: ['/dashboard/:path*'] }\n```",
        answer: "matcher", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ funcČ›ia exportatÄ din middleware.ts:\n```js\nexport function ___(request) { return NextResponse.next() }\n```",
        answer: "middleware", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ metoda NextResponse pentru a continua request-ul Ă®n middleware:\n```js\nreturn NextResponse.___( )\n```",
        answer: "next", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ metoda NextResponse pentru redirect Ă®n middleware:\n```js\nreturn NextResponse.___('/login')\n```",
        answer: "redirect", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "CreeazÄ un array cu cazurile de utilizare pentru middleware Next.js (auth, redirect, geo, headers, logging, rate-limit) Č™i afiČ™eazÄ cĂ˘te sunt cu console.log.",
        answer: "const uses = ['auth','redirect','geo','headers','logging','rate-limit'];\nconsole.log(uses.length);",
        starterCode: "", language: "javascript",
        expectedOutput: "6"
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "SimuleazÄ un matcher de middleware: ai un array de path-uri. FiltreazÄ path-urile care Ă®ncep cu '/dashboard' sau '/api' Č™i afiČ™eazÄ cĂ˘te sunt cu console.log.\n```js\nconst paths = ['/login','/dashboard/users','/api/data','/about','/dashboard/settings','/api/auth'];\n```",
        answer: "const paths = ['/login','/dashboard/users','/api/data','/about','/dashboard/settings','/api/auth'];\nconsole.log(paths.filter(p => p.startsWith('/dashboard') || p.startsWith('/api')).length);",
        starterCode: "", language: "javascript",
        expectedOutput: "4"
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "ConstruieČ™te Č™i afiČ™eazÄ cu console.log matcher-ul middleware pentru protejarea dashboard Č™i API (format array).",
        answer: "const matcher = ['/dashboard/:path*', '/api/:path*', '/admin/:path*'];\nconsole.log(JSON.stringify(matcher));",
        starterCode: "", language: "javascript",
        expectedOutput: "[\"/dashboard/:path*\",\"/api/:path*\",\"/admin/:path*\"]"
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "AfiČ™eazÄ cu console.log fluxul unui middleware de autentificare (check-token, verify-jwt, set-user-header, next sau redirect), cĂ˘te unul pe linie.",
        answer: "['check-token','verify-jwt','set-user-header','next-or-redirect'].forEach(s => console.log(s));",
        starterCode: "", language: "javascript",
        expectedOutput: "check-token\nverify-jwt\nset-user-header\nnext-or-redirect"
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "ConstruieČ™te un obiect cu acČ›iunile posibile ale middleware-ului Č™i afiČ™eazÄ numÄrul cu console.log.",
        answer: "const actions = { next: 'continue', redirect: 'redirect to url', rewrite: 'rewrite url', response: 'return response' };\nconsole.log(Object.keys(actions).length);",
        starterCode: "", language: "javascript",
        expectedOutput: "4"
      }
    ]
  },
  {
    lessonId: "6a021af3f0ec7fc9c03a65c4",
    name: "18. Database Patterns with Prisma",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ pattern-ul singleton Prisma pentru Next.js:\n```js\nconst globalForPrisma = global as unknown as { prisma: ___ }\n```",
        answer: "PrismaClient", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ opČ›iunea pentru a include relaČ›ii Ă®n query Prisma:\n```js\nprisma.user.findMany({ ___ : { posts: true } })\n```",
        answer: "include", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ metoda Prisma pentru tranzacČ›ii:\n```js\nconst result = await prisma.___([createUser, createPost])\n```",
        answer: "$transaction", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ metoda Prisma pentru query nativ:\n```js\nconst result = await prisma.___sql`SELECT * FROM User`\n```",
        answer: "$query", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ opČ›iunea Prisma pentru a selecta doar anumite cĂ˘mpuri:\n```js\nprisma.user.findMany({ ___ : { id: true, email: true } })\n```",
        answer: "select", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "CreeazÄ un array cu operaČ›iile CRUD Prisma (create, findMany, findUnique, update, delete, upsert) Č™i afiČ™eazÄ cĂ˘te sunt cu console.log.",
        answer: "const ops = ['create','findMany','findUnique','update','delete','upsert'];\nconsole.log(ops.length);",
        starterCode: "", language: "javascript",
        expectedOutput: "6"
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "SimuleazÄ paginare Prisma: ai 100 records, page=3, pageSize=10. CalculeazÄ skip Č™i afiČ™eazÄ cu console.log.",
        answer: "const page = 3;\nconst pageSize = 10;\nconst skip = (page - 1) * pageSize;\nconsole.log(skip);",
        starterCode: "", language: "javascript",
        expectedOutput: "20"
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "ConstruieČ™te Č™i afiČ™eazÄ cu console.log query-ul Prisma pentru a gÄsi un user dupÄ email cu include pentru posts.",
        answer: "const query = { where: { email: 'user@test.com' }, include: { posts: true } };\nconsole.log(JSON.stringify(query));",
        starterCode: "", language: "javascript",
        expectedOutput: "{\"where\":{\"email\":\"user@test.com\"},\"include\":{\"posts\":true}}"
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "AfiČ™eazÄ cu console.log metodele Prisma pentru aggregate (count, sum, avg, min, max), cĂ˘te una pe linie.",
        answer: "['count','sum','avg','min','max'].forEach(m => console.log(m));",
        starterCode: "", language: "javascript",
        expectedOutput: "count\nsum\navg\nmin\nmax"
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "ConstruieČ™te un obiect cu pattern-urile Prisma recomandate Č™i afiČ™eazÄ numÄrul cu console.log.",
        answer: "const patterns = { singleton: 'global prisma instance', repository: 'abstract db layer', transaction: 'atomic operations', pagination: 'skip+take', softDelete: 'deletedAt field' };\nconsole.log(Object.keys(patterns).length);",
        starterCode: "", language: "javascript",
        expectedOutput: "5"
      }
    ]
  },
  {
    lessonId: "6a021af4f0ec7fc9c03a65cb",
    name: "19. Input Validation and Error Handling",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ librÄria pentru validare schema Ă®n TypeScript:\n```js\nimport { z } from '___'\n```",
        answer: "zod", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ metoda Zod care nu aruncÄ eroare la validare eČ™uatÄ:\n```js\nconst result = schema.___Parse(data)\n```",
        answer: "safe", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ proprietatea din rezultatul safeParse pentru erori:\n```js\nif (!result.success) { result.___ }\n```",
        answer: "error", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ metoda Zod pentru a crea o schemÄ obiect:\n```js\nconst schema = z.___({ email: z.string().email() })\n```",
        answer: "object", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ validatorul Zod pentru email:\n```js\nconst schema = z.object({ email: z.string().___() })\n```",
        answer: "email", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "CreeazÄ un array cu tipurile de validatori Zod (string, number, boolean, array, object, email, min, max) Č™i afiČ™eazÄ cĂ˘te sunt cu console.log.",
        answer: "const validators = ['string','number','boolean','array','object','email','min','max'];\nconsole.log(validators.length);",
        starterCode: "", language: "javascript",
        expectedOutput: "8"
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "SimuleazÄ safeParse: ai un array de date. VerificÄ cĂ˘te trec validarea (email valid = conČ›ine '@') Č™i afiČ™eazÄ cu console.log.\n```js\nconst data = ['ion@test.com','invalidemail','ana@gmail.com','fara-at','cristi@dev.ro'];\n```",
        answer: "const data = ['ion@test.com','invalidemail','ana@gmail.com','fara-at','cristi@dev.ro'];\nconsole.log(data.filter(d => d.includes('@')).length);",
        starterCode: "", language: "javascript",
        expectedOutput: "3"
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "ConstruieČ™te Č™i afiČ™eazÄ cu console.log schema Zod pentru un utilizator ca JSON (cĂ˘mpurile: name string, email string, age number).",
        answer: "const schema = { name: 'z.string()', email: 'z.string().email()', age: 'z.number().min(18)' };\nconsole.log(JSON.stringify(schema));",
        starterCode: "", language: "javascript",
        expectedOutput: "{\"name\":\"z.string()\",\"email\":\"z.string().email()\",\"age\":\"z.number().min(18)\"}"
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "AfiČ™eazÄ cu console.log erorile formatate dintr-un array de erori Zod simulate.\n```js\nconst errors = [{path:['email'],message:'Invalid email'},{path:['name'],message:'Required'},{path:['age'],message:'Must be >= 18'}];\n```",
        answer: "const errors = [{path:['email'],message:'Invalid email'},{path:['name'],message:'Required'},{path:['age'],message:'Must be >= 18'}];\nerrors.forEach(e => console.log(`${e.path[0]}: ${e.message}`));",
        starterCode: "", language: "javascript",
        expectedOutput: "email: Invalid email\nname: Required\nage: Must be >= 18"
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "ConstruieČ™te un obiect cu validÄrile comune Č™i afiČ™eazÄ numÄrul cu console.log.",
        answer: "const validations = { email: 'format check', password: 'min 8 chars', username: 'alphanumeric', age: 'number 18-120', url: 'valid URL format' };\nconsole.log(Object.keys(validations).length);",
        starterCode: "", language: "javascript",
        expectedOutput: "5"
      }
    ]
  },
  {
    lessonId: "6a021af5f0ec7fc9c03a65d0",
    name: "20. API Authentication Patterns",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ schema header-ului de autentificare Bearer:\n```\nAuthorization: ___ <token>\n```",
        answer: "Bearer", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ metoda pentru a extrage token-ul din header:\n```js\nconst token = request.headers.get('Authorization')?.___('Bearer ')[1]\n```",
        answer: "split", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ statusul HTTP pentru autentificare eČ™uatÄ:\n```js\nreturn NextResponse.json({ error: 'Unauthorized' }, { status: ___ })\n```",
        answer: "401", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ statusul HTTP pentru acces interzis (autentificat dar fÄrÄ permisiune):\n```js\nreturn NextResponse.json({ error: 'Forbidden' }, { status: ___ })\n```",
        answer: "403", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ metoda de verificare a token-ului JWT:\n```js\nconst payload = jwt.___(token, process.env.JWT_SECRET)\n```",
        answer: "verify", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "CreeazÄ un array cu pattern-urile de autentificare API (bearer-token, api-key, session-cookie, basic-auth, oauth2) Č™i afiČ™eazÄ cĂ˘te sunt cu console.log.",
        answer: "const patterns = ['bearer-token','api-key','session-cookie','basic-auth','oauth2'];\nconsole.log(patterns.length);",
        starterCode: "", language: "javascript",
        expectedOutput: "5"
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "SimuleazÄ extragerea Bearer token: ai un array de header-uri Authorization. AfiČ™eazÄ cĂ˘te conČ›in un token Bearer valid cu console.log.\n```js\nconst headers = ['Bearer eyJhbGc.abc','Basic dXNlcjpwYXNz','Bearer token123','','Bearer valid-jwt'];\n```",
        answer: "const headers = ['Bearer eyJhbGc.abc','Basic dXNlcjpwYXNz','Bearer token123','','Bearer valid-jwt'];\nconsole.log(headers.filter(h => h.startsWith('Bearer ')).length);",
        starterCode: "", language: "javascript",
        expectedOutput: "3"
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "ConstruieČ™te Č™i afiČ™eazÄ cu console.log paČ™ii middleware-ului de autentificare API (extract-token, verify-token, check-expiry, set-user, next), cĂ˘te unul pe linie.",
        answer: "['extract-token','verify-token','check-expiry','set-user','next'].forEach(s => console.log(s));",
        starterCode: "", language: "javascript",
        expectedOutput: "extract-token\nverify-token\ncheck-expiry\nset-user\nnext"
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "AfiČ™eazÄ cu console.log rolurile comune dintr-un sistem RBAC (admin, editor, viewer, moderator) Č™i permisiunile lor (toate, write+read, read, moderate), cĂ˘te una pe linie.",
        answer: "[['admin','all'],['editor','write+read'],['viewer','read'],['moderator','moderate']].forEach(([r,p]) => console.log(`${r}: ${p}`));",
        starterCode: "", language: "javascript",
        expectedOutput: "admin: all\neditor: write+read\nviewer: read\nmoderator: moderate"
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "ConstruieČ™te un obiect cu configuraČ›ia JWT Č™i afiČ™eazÄ numÄrul de chei cu console.log.",
        answer: "const jwtConfig = { secret: 'process.env.JWT_SECRET', algorithm: 'HS256', expiresIn: '7d', issuer: 'myapp', audience: 'myapp-users' };\nconsole.log(Object.keys(jwtConfig).length);",
        starterCode: "", language: "javascript",
        expectedOutput: "5"
      }
    ]
  },
  {
    lessonId: "6a021af6f0ec7fc9c03a65d5",
    name: "21. File Uploads and Storage",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ metoda pentru a citi un fiČ™ier din FormData:\n```js\nconst file = formData.___('file')\n```",
        answer: "get", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ metoda pentru a converti fiČ™ierul Ă®n buffer:\n```js\nconst buffer = await file.___Buffer()\n```",
        answer: "array", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ pachetul Vercel pentru stocare fiČ™iere:\n```js\nimport { put } from '@vercel/___'\n```",
        answer: "blob", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ proprietatea fiČ™ierului pentru a verifica tipul:\n```js\nconst isImage = file.___.startsWith('image/')\n```",
        answer: "type", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ proprietatea fiČ™ierului pentru a verifica dimensiunea:\n```js\nif (file.___ > 5 * 1024 * 1024) throw new Error('Too large')\n```",
        answer: "size", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "CreeazÄ un array cu tipurile de fiČ™iere acceptate pentru o platformÄ (image/jpeg, image/png, image/webp, application/pdf) Č™i afiČ™eazÄ cĂ˘te sunt cu console.log.",
        answer: "const types = ['image/jpeg','image/png','image/webp','application/pdf'];\nconsole.log(types.length);",
        starterCode: "", language: "javascript",
        expectedOutput: "4"
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Ai un array de fiČ™iere. FiltreazÄ fiČ™ierele valide (tip image Č™i dimensiune < 5MB = 5242880 bytes) Č™i afiČ™eazÄ cĂ˘te sunt cu console.log.\n```js\nconst files = [{name:'a.jpg',type:'image/jpeg',size:2000000},{name:'b.pdf',type:'application/pdf',size:1000000},{name:'c.png',type:'image/png',size:6000000},{name:'d.webp',type:'image/webp',size:500000}];\n```",
        answer: "const files = [{name:'a.jpg',type:'image/jpeg',size:2000000},{name:'b.pdf',type:'application/pdf',size:1000000},{name:'c.png',type:'image/png',size:6000000},{name:'d.webp',type:'image/webp',size:500000}];\nconsole.log(files.filter(f => f.type.startsWith('image/') && f.size < 5242880).length);",
        starterCode: "", language: "javascript",
        expectedOutput: "2"
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "ConstruieČ™te Č™i afiČ™eazÄ cu console.log un nume unic pentru un fiČ™ier upload (timestamp + original name).",
        answer: "const originalName = 'photo.jpg';\nconst timestamp = 1717056000000;\nconsole.log(`${timestamp}-${originalName}`);",
        starterCode: "", language: "javascript",
        expectedOutput: "1717056000000-photo.jpg"
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "AfiČ™eazÄ cu console.log serviciile de stocare fiČ™iere compatibile Next.js (vercel-blob, cloudinary, s3, uploadthing, supabase-storage), cĂ˘te unul pe linie.",
        answer: "['vercel-blob','cloudinary','s3','uploadthing','supabase-storage'].forEach(s => console.log(s));",
        starterCode: "", language: "javascript",
        expectedOutput: "vercel-blob\ncloudinary\ns3\nuploadthing\nsupabase-storage"
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "ConstruieČ™te un obiect cu configuraČ›ia pentru upload fiČ™iere Č™i afiČ™eazÄ numÄrul de chei cu console.log.",
        answer: "const uploadConfig = { maxSize: 5 * 1024 * 1024, acceptedTypes: ['image/jpeg','image/png'], destination: 'uploads/', uniqueNames: true, virusScan: false };\nconsole.log(Object.keys(uploadConfig).length);",
        starterCode: "", language: "javascript",
        expectedOutput: "5"
      }
    ]
  },
  {
    lessonId: "6a021af6f0ec7fc9c03a65da",
    name: "22. WebSockets and Real-time",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ API-ul pentru Server-Sent Events Ă®n Next.js:\n```js\nreturn new Response(stream, { headers: { 'Content-Type': 'text/event-___' } })\n```",
        answer: "stream", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ clasa JavaScript pentru conectare SSE pe client:\n```js\nconst es = new ___(  '/api/events')\n```",
        answer: "EventSource", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ evenimentul EventSource pentru mesaje:\n```js\nes.addEventListener('___', (e) => console.log(e.data))\n```",
        answer: "message", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ serviciul de real-time terČ›Ä parte pentru Next.js:\n```js\nimport Pusher from '___'\n```",
        answer: "pusher", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ formatul de eveniment SSE cu cĂ˘mpul data:\n```\n___ : { \"message\": \"Hello\" }\\n\\n\n```",
        answer: "data", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "CreeazÄ un array cu cazurile de utilizare pentru real-time Ă®n Next.js (live-chat, notifications, dashboard-updates, collaboration, progress) Č™i afiČ™eazÄ cĂ˘te sunt cu console.log.",
        answer: "const uses = ['live-chat','notifications','dashboard-updates','collaboration','progress'];\nconsole.log(uses.length);",
        starterCode: "", language: "javascript",
        expectedOutput: "5"
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "SimuleazÄ un stream de mesaje SSE: ai un array de mesaje. ConstruieČ™te Č™i afiČ™eazÄ cu console.log formatul SSE pentru fiecare.\n```js\nconst messages = ['Salut', 'Ce mai faci?', 'Totul bine!'];\n```",
        answer: "const messages = ['Salut', 'Ce mai faci?', 'Totul bine!'];\nmessages.forEach(m => console.log(`data: ${m}`));",
        starterCode: "", language: "javascript",
        expectedOutput: "data: Salut\ndata: Ce mai faci?\ndata: Totul bine!"
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "ConstruieČ™te Č™i afiČ™eazÄ cu console.log diferenČ›a dintre SSE Č™i WebSockets (directionality).",
        answer: "console.log('SSE: server -> client (unidirectional)');\nconsole.log('WebSockets: server <-> client (bidirectional)');",
        starterCode: "", language: "javascript",
        expectedOutput: "SSE: server -> client (unidirectional)\nWebSockets: server <-> client (bidirectional)"
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "AfiČ™eazÄ cu console.log serviciile de real-time compatibile cu Next.js (pusher, ably, supabase-realtime, socket.io, liveblocks), cĂ˘te unul pe linie.",
        answer: "['pusher','ably','supabase-realtime','socket.io','liveblocks'].forEach(s => console.log(s));",
        starterCode: "", language: "javascript",
        expectedOutput: "pusher\nably\nsupabase-realtime\nsocket.io\nliveblocks"
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "ConstruieČ™te un obiect cu protocoalele de comunicare real-time Č™i caracteristicile lor, Č™i afiČ™eazÄ numÄrul cu console.log.",
        answer: "const protocols = { SSE: 'unidirectional, HTTP', WebSocket: 'bidirectional, WS', LongPolling: 'polling, HTTP', ShortPolling: 'interval, HTTP' };\nconsole.log(Object.keys(protocols).length);",
        starterCode: "", language: "javascript",
        expectedOutput: "4"
      }
    ]
  },
  {
    lessonId: "6a021af7f0ec7fc9c03a65df",
    name: "23. Background Jobs and Cron",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ fiČ™ierul de configurare pentru Vercel Cron:\n```\n___.json\n```",
        answer: "vercel", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ expresia cron pentru a rula la fiecare orÄ:\n```\n0 * * * ___\n```",
        answer: "*", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ cheia din vercel.json pentru definirea job-urilor cron:\n```json\n{ \"___\": [{ \"path\": \"/api/cron\", \"schedule\": \"0 * * * *\" }] }\n```",
        answer: "crons", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ serviciul de queue pentru job-uri background Ă®n Next.js:\n```js\nimport { Client } from '@___/qstash'\n```",
        answer: "upstash", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ header-ul pentru a verifica cÄ request-ul vine de la Vercel Cron:\n```js\nconst authHeader = request.headers.get('Authorization')\nif (authHeader !== `Bearer ${process.env.___}`) return 401\n```",
        answer: "CRON_SECRET", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "CreeazÄ un array cu cazurile de utilizare pentru background jobs (email-sending, data-cleanup, report-gen, cache-warmup, notifications) Č™i afiČ™eazÄ cĂ˘te sunt cu console.log.",
        answer: "const jobs = ['email-sending','data-cleanup','report-gen','cache-warmup','notifications'];\nconsole.log(jobs.length);",
        starterCode: "", language: "javascript",
        expectedOutput: "5"
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "SimuleazÄ expresii cron: ai un array cu expresii Č™i descrierile lor. AfiČ™eazÄ cu console.log cĂ˘te ruleazÄ zilnic (conČ›in '0 0').\n```js\nconst crons = ['0 0 * * *','0 * * * *','*/5 * * * *','0 0 * * 1','0 0 1 * *'];\n```",
        answer: "const crons = ['0 0 * * *','0 * * * *','*/5 * * * *','0 0 * * 1','0 0 1 * *'];\nconsole.log(crons.filter(c => c.startsWith('0 0')).length);",
        starterCode: "", language: "javascript",
        expectedOutput: "3"
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "ConstruieČ™te Č™i afiČ™eazÄ cu console.log expresiile cron pentru: fiecare minut, fiecare orÄ, zilnic la miezul nopČ›ii, sÄptÄmĂ˘nal luni.",
        answer: "const crons = {'fiecare-minut':'* * * * *','fiecare-ora':'0 * * * *','zilnic':'0 0 * * *','saptamanal':'0 0 * * 1'};\nObject.entries(crons).forEach(([k,v]) => console.log(`${k}: ${v}`));",
        starterCode: "", language: "javascript",
        expectedOutput: "fiecare-minut: * * * * *\nfiecare-ora: 0 * * * *\nzilnic: 0 0 * * *\nsaptamanal: 0 0 * * 1"
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "AfiČ™eazÄ cu console.log serviciile pentru background jobs Ă®n Next.js (vercel-cron, qstash, inngest, trigger.dev, bullmq), cĂ˘te unul pe linie.",
        answer: "['vercel-cron','qstash','inngest','trigger.dev','bullmq'].forEach(s => console.log(s));",
        starterCode: "", language: "javascript",
        expectedOutput: "vercel-cron\nqstash\ninngest\ntrigger.dev\nbullmq"
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "ConstruieČ™te un obiect cu configuraČ›ia unui job cron Č™i afiČ™eazÄ numÄrul de chei cu console.log.",
        answer: "const job = { name: 'daily-cleanup', path: '/api/cron/cleanup', schedule: '0 0 * * *', timeout: 30, secret: 'env.CRON_SECRET' };\nconsole.log(Object.keys(job).length);",
        starterCode: "", language: "javascript",
        expectedOutput: "5"
      }
    ]
  },
  {
    lessonId: "6a021af8f0ec7fc9c03a65e4",
    name: "24. Monitoring and Logging",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ pachetul popular pentru monitoring erori Ă®n Next.js:\n```js\nimport * as Sentry from '@sentry/___'\n```",
        answer: "nextjs", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ metoda Sentry pentru a captura manual o eroare:\n```js\nSentry.capture___(error)\n```",
        answer: "Exception", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ formatul de log structurat (cheie-valoare):\n```js\nconsole.log(JSON.___(logObject))\n```",
        answer: "stringify", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ header-ul HTTP pentru mÄsurarea timpului de rÄspuns:\n```js\nconst start = Date.now()\n// ... logic ...\nres.setHeader('X-Response-___', Date.now() - start + 'ms')\n```",
        answer: "Time", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ nivelul de log pentru erori critice:\n```js\nconsole.___(  'Database connection failed')\n```",
        answer: "error", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "CreeazÄ un array cu nivelele de logging (error, warn, info, debug, trace) Č™i afiČ™eazÄ cĂ˘te sunt cu console.log.",
        answer: "const levels = ['error','warn','info','debug','trace'];\nconsole.log(levels.length);",
        starterCode: "", language: "javascript",
        expectedOutput: "5"
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Ai un array de log-uri cu nivel. FiltreazÄ erorile (level='error') Č™i afiČ™eazÄ cĂ˘te sunt cu console.log.\n```js\nconst logs = [{level:'info',msg:'Started'},{level:'error',msg:'DB failed'},{level:'warn',msg:'Slow query'},{level:'error',msg:'Timeout'},{level:'info',msg:'Done'}];\n```",
        answer: "const logs = [{level:'info',msg:'Started'},{level:'error',msg:'DB failed'},{level:'warn',msg:'Slow query'},{level:'error',msg:'Timeout'},{level:'info',msg:'Done'}];\nconsole.log(logs.filter(l => l.level === 'error').length);",
        starterCode: "", language: "javascript",
        expectedOutput: "2"
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "ConstruieČ™te Č™i afiČ™eazÄ cu console.log un log structurat pentru un request API.",
        answer: "const log = { timestamp: '2025-01-01T12:00:00Z', level: 'info', method: 'POST', path: '/api/users', status: 201, duration: '45ms' };\nconsole.log(JSON.stringify(log));",
        starterCode: "", language: "javascript",
        expectedOutput: "{\"timestamp\":\"2025-01-01T12:00:00Z\",\"level\":\"info\",\"method\":\"POST\",\"path\":\"/api/users\",\"status\":201,\"duration\":\"45ms\"}"
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "AfiČ™eazÄ cu console.log serviciile de monitoring pentru Next.js (sentry, datadog, new-relic, vercel-analytics, logtail), cĂ˘te unul pe linie.",
        answer: "['sentry','datadog','new-relic','vercel-analytics','logtail'].forEach(s => console.log(s));",
        starterCode: "", language: "javascript",
        expectedOutput: "sentry\ndatadog\nnew-relic\nvercel-analytics\nlogtail"
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "ConstruieČ™te un obiect cu metricile de monitorizat Č™i afiČ™eazÄ numÄrul cu console.log.",
        answer: "const metrics = { responseTime: 'ms', errorRate: '%', requestCount: 'req/min', p99Latency: 'ms', dbQueryTime: 'ms', cacheHitRate: '%' };\nconsole.log(Object.keys(metrics).length);",
        starterCode: "", language: "javascript",
        expectedOutput: "6"
      }
    ]
  },
  {
    lessonId: "6a021af9f0ec7fc9c03a65e9",
    name: "25. Next.js Backend Mastery Project",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ arhitectura API REST pentru versionare:\n```\n/api/___ /users\n```",
        answer: "v1", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ metoda Prisma pentru a obČ›ine numÄrul total de Ă®nregistrÄri:\n```js\nconst total = await prisma.post.___({ where: filter })\n```",
        answer: "count", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ cĂ˘mpul din rÄspunsul API paginat care indicÄ pagina curentÄ:\n```js\nreturn { data, pagination: { page: ___, total, pages } }\n```",
        answer: "currentPage", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ schema Zod pentru ID MongoDB (24 caractere hex):\n```js\nconst idSchema = z.string().___( 24 )\n```",
        answer: "length", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ metoda HTTP pentru actualizare parČ›ialÄ (nu completÄ):\n```js\nexport async function ___(request, { params }) {}\n```",
        answer: "PATCH", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "SimuleazÄ paginare API: calculeazÄ pagina curentÄ, total pagini Č™i skip. AfiČ™eazÄ cu console.log.\n```js\nconst total = 157, pageSize = 10, page = 4;\n```",
        answer: "const total = 157, pageSize = 10, page = 4;\nconst totalPages = Math.ceil(total / pageSize);\nconst skip = (page - 1) * pageSize;\nconsole.log(totalPages);\nconsole.log(skip);",
        starterCode: "", language: "javascript",
        expectedOutput: "16\n30"
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Ai un array de endpoint-uri API. GrupeazÄ dupÄ versiune Č™i afiČ™eazÄ cĂ˘te endpoint-uri are v1 cu console.log.\n```js\nconst endpoints = ['/api/v1/users','/api/v2/users','/api/v1/posts','/api/v1/auth','/api/v2/posts'];\n```",
        answer: "const endpoints = ['/api/v1/users','/api/v2/users','/api/v1/posts','/api/v1/auth','/api/v2/posts'];\nconsole.log(endpoints.filter(e => e.includes('/v1/')).length);",
        starterCode: "", language: "javascript",
        expectedOutput: "3"
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "ConstruieČ™te Č™i afiČ™eazÄ cu console.log structura rÄspunsului API paginat ca JSON.",
        answer: "const response = { data: [], pagination: { page: 1, pageSize: 10, total: 50, totalPages: 5 }, meta: { timestamp: '2025-01-01' } };\nconsole.log(JSON.stringify(response.pagination));",
        starterCode: "", language: "javascript",
        expectedOutput: "{\"page\":1,\"pageSize\":10,\"total\":50,\"totalPages\":5}"
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "AfiČ™eazÄ cu console.log principiile REST API (stateless, resource-based, http-verbs, status-codes, versioning), cĂ˘te unul pe linie.",
        answer: "['stateless','resource-based','http-verbs','status-codes','versioning'].forEach(p => console.log(p));",
        starterCode: "", language: "javascript",
        expectedOutput: "stateless\nresource-based\nhttp-verbs\nstatus-codes\nversioning"
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "ConstruieČ™te un obiect cu toate componentele unui backend Next.js de producČ›ie Č™i afiČ™eazÄ numÄrul cu console.log.",
        answer: "const backend = { routing: 'Route Handlers', validation: 'Zod', auth: 'JWT + middleware', database: 'Prisma + MongoDB', caching: 'Next.js cache', security: 'rate-limit + CORS', monitoring: 'Sentry' };\nconsole.log(Object.keys(backend).length);",
        starterCode: "", language: "javascript",
        expectedOutput: "7"
      }
    ]
  },
  {
    lessonId: "6a08ce38999573855635c51b",
    name: "26. Next.js cu Prisma si MongoDB Avansat",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ provider-ul Prisma pentru MongoDB:\n```prisma\ndatasource db {\n  provider = \"___\"\n}\n```",
        answer: "mongodb", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ tipul de ID Prisma pentru MongoDB:\n```prisma\nid String @id @default(auto()) @map(\"_id\") @db.___\n```",
        answer: "ObjectId", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ metoda Prisma pentru tranzacČ›ii interactive:\n```js\nconst result = await prisma.$transaction(async (___) => {})\n```",
        answer: "tx", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ opČ›iunea Prisma pentru relaČ›ii nested write:\n```js\nprisma.user.create({ data: { posts: { ___: { title: 'Post 1' } } } })\n```",
        answer: "create", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ filtrul Prisma pentru cĂ˘mpuri care conČ›in text:\n```js\nprisma.post.findMany({ where: { title: { ___ : 'Next.js' } } })\n```",
        answer: "contains", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "CreeazÄ un array cu operatorii de filtrare Prisma (equals, contains, startsWith, endsWith, in, gte, lte, not) Č™i afiČ™eazÄ cĂ˘te sunt cu console.log.",
        answer: "const ops = ['equals','contains','startsWith','endsWith','in','gte','lte','not'];\nconsole.log(ops.length);",
        starterCode: "", language: "javascript",
        expectedOutput: "8"
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "SimuleazÄ un query Prisma cu paginare: calculeazÄ skip pentru pagina 5 cu pageSize 20 Č™i afiČ™eazÄ cu console.log.",
        answer: "const page = 5, pageSize = 20;\nconsole.log((page - 1) * pageSize);",
        starterCode: "", language: "javascript",
        expectedOutput: "80"
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "ConstruieČ™te Č™i afiČ™eazÄ cu console.log un query Prisma cu orderBy Č™i take/skip ca JSON.",
        answer: "const query = { orderBy: { createdAt: 'desc' }, take: 10, skip: 0 };\nconsole.log(JSON.stringify(query));",
        starterCode: "", language: "javascript",
        expectedOutput: "{\"orderBy\":{\"createdAt\":\"desc\"},\"take\":10,\"skip\":0}"
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "AfiČ™eazÄ cu console.log relaČ›iile Prisma suportate Ă®n MongoDB (one-to-one, one-to-many, many-to-many, embedded), cĂ˘te una pe linie.",
        answer: "['one-to-one','one-to-many','many-to-many','embedded'].forEach(r => console.log(r));",
        starterCode: "", language: "javascript",
        expectedOutput: "one-to-one\none-to-many\nmany-to-many\nembedded"
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "ConstruieČ™te un obiect cu configuraČ›ia Prisma + MongoDB Č™i afiČ™eazÄ numÄrul de chei cu console.log.",
        answer: "const config = { provider: 'mongodb', url: 'MONGODB_URI', logging: ['error','warn'], connection: { pool: 10, timeout: 5000 } };\nconsole.log(Object.keys(config).length);",
        starterCode: "", language: "javascript",
        expectedOutput: "4"
      }
    ]
  },
  {
    lessonId: "6a08ce3a999573855635c52f",
    name: "27. Autentificare cu NextAuth.js Avansata",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ versiunea majorÄ a NextAuth.js cu suport complet Auth.js:\n```\nnextauth v___\n```",
        answer: "5", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ callback-ul NextAuth pentru a personaliza sesiunea:\n```js\ncallbacks: { ___ ({ session, token }) { return session } }\n```",
        answer: "session", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ callback-ul NextAuth pentru a personaliza JWT:\n```js\ncallbacks: { ___ ({ token, user }) { return token } }\n```",
        answer: "jwt", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ adaptorul Prisma pentru NextAuth:\n```js\nimport { PrismaAdapter } from '@auth/___-adapter'\n```",
        answer: "prisma", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ metoda NextAuth v5 pentru sesiunea server-side:\n```js\nconst session = await ___();\n```",
        answer: "auth", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "CreeazÄ un array cu callback-urile NextAuth (signIn, signOut, session, jwt, redirect) Č™i afiČ™eazÄ cĂ˘te sunt cu console.log.",
        answer: "const callbacks = ['signIn','signOut','session','jwt','redirect'];\nconsole.log(callbacks.length);",
        starterCode: "", language: "javascript",
        expectedOutput: "5"
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "SimuleazÄ adÄugarea de date custom Ă®n token JWT NextAuth: ai token-ul de bazÄ Č™i adaugÄ role Č™i userId. AfiČ™eazÄ numÄrul de chei cu console.log.",
        answer: "const token = { sub: '123', email: 'user@test.com' };\nconst enhanced = { ...token, role: 'admin', userId: '507f1f77' };\nconsole.log(Object.keys(enhanced).length);",
        starterCode: "", language: "javascript",
        expectedOutput: "4"
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "ConstruieČ™te Č™i afiČ™eazÄ cu console.log provider-ii OAuth2 configuraČ›i Ă®n NextAuth (google, github, facebook), cĂ˘te unul pe linie.",
        answer: "['google','github','facebook'].forEach(p => console.log(p + 'Provider'));",
        starterCode: "", language: "javascript",
        expectedOutput: "googleProvider\ngithubProvider\nfacebookProvider"
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "AfiČ™eazÄ cu console.log tabelele Prisma necesare pentru adaptorul NextAuth (Account, Session, User, VerificationToken), cĂ˘te una pe linie.",
        answer: "['Account','Session','User','VerificationToken'].forEach(t => console.log(t));",
        starterCode: "", language: "javascript",
        expectedOutput: "Account\nSession\nUser\nVerificationToken"
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "ConstruieČ™te un obiect cu configuraČ›ia NextAuth completÄ Č™i afiČ™eazÄ numÄrul de chei cu console.log.",
        answer: "const authConfig = { providers: [], callbacks: {}, adapter: 'PrismaAdapter', session: { strategy: 'jwt' }, pages: { signIn: '/login' } };\nconsole.log(Object.keys(authConfig).length);",
        starterCode: "", language: "javascript",
        expectedOutput: "5"
      }
    ]
  },
  {
    lessonId: "6a08ce3d999573855635c543",
    name: "28. Email si Notificari",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ serviciul modern de trimitere email pentru Next.js:\n```js\nimport { Resend } from '___'\n```",
        answer: "resend", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ metoda Resend pentru a trimite un email:\n```js\nawait resend.emails.___(emailOptions)\n```",
        answer: "send", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ pachetul pentru template-uri de email React:\n```js\nimport { Html, Button } from '@react-___'\n```",
        answer: "email", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ cĂ˘mpul din opČ›iunile email pentru destinatar:\n```js\nresend.emails.send({ from: '...', ___: 'user@test.com', subject: '...' })\n```",
        answer: "to", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ cĂ˘mpul din opČ›iunile email pentru conČ›inut HTML:\n```js\nresend.emails.send({ ..., ___: '<h1>Hello</h1>' })\n```",
        answer: "html", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "CreeazÄ un array cu tipurile de email pentru o aplicaČ›ie (welcome, password-reset, order-confirmation, newsletter, invoice) Č™i afiČ™eazÄ cĂ˘te sunt cu console.log.",
        answer: "const types = ['welcome','password-reset','order-confirmation','newsletter','invoice'];\nconsole.log(types.length);",
        starterCode: "", language: "javascript",
        expectedOutput: "5"
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "SimuleazÄ validarea opČ›iunilor email: ai un obiect emailOptions. VerificÄ cÄ are cĂ˘mpurile obligatorii (from, to, subject, html) Č™i afiČ™eazÄ true sau false cu console.log.\n```js\nconst email = { from: 'noreply@app.com', to: 'user@test.com', subject: 'Welcome!', html: '<h1>Welcome!</h1>' };\n```",
        answer: "const email = { from: 'noreply@app.com', to: 'user@test.com', subject: 'Welcome!', html: '<h1>Welcome!</h1>' };\nconst required = ['from','to','subject','html'];\nconsole.log(required.every(k => k in email));",
        starterCode: "", language: "javascript",
        expectedOutput: "true"
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "ConstruieČ™te Č™i afiČ™eazÄ cu console.log serviciile de email compatibile cu Next.js (resend, sendgrid, mailgun, postmark, nodemailer), cĂ˘te unul pe linie.",
        answer: "['resend','sendgrid','mailgun','postmark','nodemailer'].forEach(s => console.log(s));",
        starterCode: "", language: "javascript",
        expectedOutput: "resend\nsendgrid\nmailgun\npostmark\nnodemailer"
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "AfiČ™eazÄ cu console.log cĂ˘mpurile obligatorii pentru un email (from, to, subject, html sau text), cĂ˘te unul pe linie.",
        answer: "['from','to','subject','html'].forEach(f => console.log(f));",
        starterCode: "", language: "javascript",
        expectedOutput: "from\nto\nsubject\nhtml"
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "ConstruieČ™te un obiect cu tipurile de notificÄri Č™i canalele lor (email, push, sms, in-app) Č™i afiČ™eazÄ numÄrul de canale cu console.log.",
        answer: "const notifications = { welcome: 'email', order: 'email+sms', promo: 'email+push', security: 'email+sms', activity: 'in-app' };\nconsole.log(Object.keys(notifications).length);",
        starterCode: "", language: "javascript",
        expectedOutput: "5"
      }
    ]
  },
  {
    lessonId: "6a08ce40999573855635c557",
    name: "29. Optimizare Backend",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ strategia de caching pentru date care nu se schimbÄ des:\n```js\nfetch(url, { cache: '___' })\n```",
        answer: "force-cache", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ runtime-ul pentru latenČ›Ä minimÄ la nivel global:\n```js\nexport const runtime = '___'\n```",
        answer: "edge", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ strategia ISR pentru revalidare la cerere:\n```js\nrevalidate___('tag-name')\n```",
        answer: "Tag", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ funcČ›ia React pentru caching la nivel de request:\n```js\nconst getUser = ___(async (id) => db.user.findUnique({where:{id}}))\n```",
        answer: "cache", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ pachetul Redis popular pentru caching Ă®n Next.js:\n```js\nimport { Redis } from '@upstash/___'\n```",
        answer: "redis", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "CreeazÄ un array cu tehnicile de optimizare backend (request-memoization, redis-cache, edge-runtime, db-indexing, connection-pooling, isr) Č™i afiČ™eazÄ cĂ˘te sunt cu console.log.",
        answer: "const techs = ['request-memoization','redis-cache','edge-runtime','db-indexing','connection-pooling','isr'];\nconsole.log(techs.length);",
        starterCode: "", language: "javascript",
        expectedOutput: "6"
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "SimuleazÄ hit rate cache Redis: ai 100 request-uri, 75 sunt cache hits. CalculeazÄ Č™i afiČ™eazÄ procentul de hit rate cu console.log.",
        answer: "const total = 100, hits = 75;\nconsole.log(Math.round(hits / total * 100));",
        starterCode: "", language: "javascript",
        expectedOutput: "75"
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "ConstruieČ™te Č™i afiČ™eazÄ cu console.log strategiile de caching pe nivele (request: React.cache, data: fetch cache, full-route: static, router: browser), cĂ˘te una pe linie.",
        answer: "[['request','React.cache'],['data','fetch cache'],['full-route','static generation'],['router','browser cache']].forEach(([l,s]) => console.log(`${l}: ${s}`));",
        starterCode: "", language: "javascript",
        expectedOutput: "request: React.cache\ndata: fetch cache\nfull-route: static generation\nrouter: browser cache"
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "AfiČ™eazÄ cu console.log metricile pentru evaluarea performanČ›ei backend (p50, p95, p99, error-rate, throughput), cĂ˘te una pe linie.",
        answer: "['p50','p95','p99','error-rate','throughput'].forEach(m => console.log(m));",
        starterCode: "", language: "javascript",
        expectedOutput: "p50\np95\np99\nerror-rate\nthroughput"
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "ConstruieČ™te un obiect cu configuraČ›ia cache Redis Č™i afiČ™eazÄ numÄrul de chei cu console.log.",
        answer: "const redisConfig = { url: 'UPSTASH_REDIS_URL', token: 'UPSTASH_REDIS_TOKEN', ttl: 3600, maxRetries: 3 };\nconsole.log(Object.keys(redisConfig).length);",
        starterCode: "", language: "javascript",
        expectedOutput: "4"
      }
    ]
  },
  {
    lessonId: "6a08ce43999573855635c56b",
    name: "30. Mini Proiect BE â€” API Complet cu Auth",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ metoda HTTP pentru login (trimitere credenČ›iale):\n```js\nexport async function ___(request) {}\n```",
        answer: "POST", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ metoda bcrypt pentru verificarea parolei:\n```js\nconst ok = await bcrypt.___(password, hash)\n```",
        answer: "compare", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ validatorul Zod pentru parola minimÄ de 8 caractere:\n```js\nconst schema = z.object({ password: z.string().___(8) })\n```",
        answer: "min", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ tipul cookie care previne accesul din JavaScript:\n```js\ncookies().set('token', jwt, { ___Only: true })\n```",
        answer: "http", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ metoda pentru Č™tergerea cookie-ului la logout:\n```js\ncookies().___('auth_token')\n```",
        answer: "delete", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "CreeazÄ un array cu endpoint-urile unui API de autentificare complet Č™i afiČ™eazÄ cĂ˘te sunt cu console.log.",
        answer: "const endpoints = ['/api/auth/register','/api/auth/login','/api/auth/logout','/api/auth/me','/api/auth/refresh','/api/auth/forgot-password'];\nconsole.log(endpoints.length);",
        starterCode: "", language: "javascript",
        expectedOutput: "6"
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "SimuleazÄ generarea de token-uri: creeazÄ 3 token-uri unice concatenĂ˘nd ID Č™i timestamp Č™i afiČ™eazÄ lungimea totalÄ a tuturor cu console.log.",
        answer: "const tokens = ['user1_1717056000', 'user2_1717056001', 'user3_1717056002'];\nconsole.log(tokens.join('').length);",
        starterCode: "", language: "javascript",
        expectedOutput: "45"
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "ConstruieČ™te Č™i afiČ™eazÄ cu console.log fluxul complet de autentificare JWT (register, login, store-token, protected-request, verify-token, response), cĂ˘te unul pe linie.",
        answer: "['register','login','store-token','protected-request','verify-token','response'].forEach(s => console.log(s));",
        starterCode: "", language: "javascript",
        expectedOutput: "register\nlogin\nstore-token\nprotected-request\nverify-token\nresponse"
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "AfiČ™eazÄ cu console.log endpoint-urile protejate ale API-ului (GET /api/me, GET /api/posts, POST /api/posts, PATCH /api/posts/[id], DELETE /api/posts/[id]), cĂ˘te unul pe linie.",
        answer: "['GET /api/me','GET /api/posts','POST /api/posts','PATCH /api/posts/[id]','DELETE /api/posts/[id]'].forEach(e => console.log(e));",
        starterCode: "", language: "javascript",
        expectedOutput: "GET /api/me\nGET /api/posts\nPOST /api/posts\nPATCH /api/posts/[id]\nDELETE /api/posts/[id]"
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "ConstruieČ™te un obiect cu stack-ul unui API backend complet Č™i afiČ™eazÄ numÄrul de componente cu console.log.",
        answer: "const apiStack = { routing: 'Route Handlers', auth: 'JWT + bcrypt', validation: 'Zod', database: 'Prisma', security: 'middleware + rate-limit', email: 'Resend', monitoring: 'Sentry' };\nconsole.log(Object.keys(apiStack).length);",
        starterCode: "", language: "javascript",
        expectedOutput: "7"
      }
    ]
  },
  {
    lessonId: "6a09b1769384b94515fcf2f0",
    name: "31. Stripe Payments in Next.js",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ metoda Stripe pentru a crea o sesiune de platÄ:\n```js\nconst session = await stripe.checkout.sessions.___( params)\n```",
        answer: "create", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ variabila de mediu pentru cheia secretÄ Stripe:\n```js\nconst stripe = new Stripe(process.env.___)\n```",
        answer: "STRIPE_SECRET_KEY", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ evenimentul Stripe pentru platÄ completatÄ cu succes:\n```js\ncase 'checkout.session.___': break;\n```",
        answer: "completed", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ header-ul pentru a verifica semnÄtura webhook Stripe:\n```js\nconst sig = request.headers.get('stripe-___')\n```",
        answer: "signature", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ modul de platÄ Ă®n sesiunea Stripe (card, etc.):\n```js\ncheckout.sessions.create({ payment_method_types: ['___'] })\n```",
        answer: "card", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "CreeazÄ un array cu evenimentele webhook Stripe importante (checkout.session.completed, payment_intent.succeeded, payment_intent.failed, customer.subscription.created) Č™i afiČ™eazÄ cĂ˘te sunt cu console.log.",
        answer: "const events = ['checkout.session.completed','payment_intent.succeeded','payment_intent.failed','customer.subscription.created'];\nconsole.log(events.length);",
        starterCode: "", language: "javascript",
        expectedOutput: "4"
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "SimuleazÄ calculul preČ›ului Stripe (Ă®n cenČ›i): converteČ™te preČ›urile din RON la cenČ›i (Ă®nmulČ›it cu 100) Č™i afiČ™eazÄ totalul cu console.log.\n```js\nconst items = [{name:'Basic',price:99},{name:'Pro',price:199},{name:'Enterprise',price:499}];\n```",
        answer: "const items = [{name:'Basic',price:99},{name:'Pro',price:199},{name:'Enterprise',price:499}];\nconsole.log(items.reduce((s,i) => s + i.price * 100, 0));",
        starterCode: "", language: "javascript",
        expectedOutput: "79700"
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "ConstruieČ™te Č™i afiČ™eazÄ cu console.log paČ™ii fluxului de platÄ Stripe (create-session, redirect-to-stripe, payment, webhook, fulfillment), cĂ˘te unul pe linie.",
        answer: "['create-session','redirect-to-stripe','payment','webhook','fulfillment'].forEach(s => console.log(s));",
        starterCode: "", language: "javascript",
        expectedOutput: "create-session\nredirect-to-stripe\npayment\nwebhook\nfulfillment"
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "AfiČ™eazÄ cu console.log variabilele de mediu necesare pentru Stripe (STRIPE_SECRET_KEY, STRIPE_PUBLISHABLE_KEY, STRIPE_WEBHOOK_SECRET), cĂ˘te una pe linie.",
        answer: "['STRIPE_SECRET_KEY','STRIPE_PUBLISHABLE_KEY','STRIPE_WEBHOOK_SECRET'].forEach(v => console.log(v));",
        starterCode: "", language: "javascript",
        expectedOutput: "STRIPE_SECRET_KEY\nSTRIPE_PUBLISHABLE_KEY\nSTRIPE_WEBHOOK_SECRET"
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "ConstruieČ™te un obiect cu configuraČ›ia sesiunii Stripe Č™i afiČ™eazÄ numÄrul de chei cu console.log.",
        answer: "const session = { mode: 'payment', payment_method_types: ['card'], line_items: [], success_url: '...', cancel_url: '...' };\nconsole.log(Object.keys(session).length);",
        starterCode: "", language: "javascript",
        expectedOutput: "5"
      }
    ]
  },
  {
    lessonId: "6a09b1789384b94515fcf304",
    name: "32. File Upload in Next.js",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ pachetul popular pentru file upload Ă®n Next.js:\n```js\nimport { createUploadthing } from '___'\n```",
        answer: "uploadthing", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ metodÄ pentru a obČ›ine URL-ul unui fiČ™ier uploadat Ă®n Cloudinary:\n```js\nconst { secure_url } = await cloudinary.uploader.___( file)\n```",
        answer: "upload", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ metoda pentru presigned URL S3:\n```js\nconst url = await s3.getSignedUrl___Promise('putObject', params)\n```",
        answer: "As", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ metoda pentru citirea fiČ™ierului din Request Ă®n Next.js:\n```js\nconst formData = await request.form___()\n```",
        answer: "Data", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ metoda File pentru a citi conČ›inutul ca ArrayBuffer:\n```js\nconst bytes = await file.___Buffer()\n```",
        answer: "array", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "CreeazÄ un array cu serviciile de stocare fiČ™iere (uploadthing, cloudinary, s3, vercel-blob, supabase) Č™i afiČ™eazÄ cĂ˘te sunt cu console.log.",
        answer: "const services = ['uploadthing','cloudinary','s3','vercel-blob','supabase'];\nconsole.log(services.length);",
        starterCode: "", language: "javascript",
        expectedOutput: "5"
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Ai un array de fiČ™iere uploadate. FiltreazÄ imaginile (tip Ă®ncepe cu 'image/') Č™i afiČ™eazÄ cĂ˘te sunt cu console.log.\n```js\nconst files = [{name:'photo.jpg',type:'image/jpeg'},{name:'doc.pdf',type:'application/pdf'},{name:'banner.png',type:'image/png'},{name:'data.csv',type:'text/csv'},{name:'logo.webp',type:'image/webp'}];\n```",
        answer: "const files = [{name:'photo.jpg',type:'image/jpeg'},{name:'doc.pdf',type:'application/pdf'},{name:'banner.png',type:'image/png'},{name:'data.csv',type:'text/csv'},{name:'logo.webp',type:'image/webp'}];\nconsole.log(files.filter(f => f.type.startsWith('image/')).length);",
        starterCode: "", language: "javascript",
        expectedOutput: "3"
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "ConstruieČ™te Č™i afiČ™eazÄ cu console.log paČ™ii unui upload securizat (validate-type, validate-size, scan-virus, upload-to-storage, save-url-to-db), cĂ˘te unul pe linie.",
        answer: "['validate-type','validate-size','scan-virus','upload-to-storage','save-url-to-db'].forEach(s => console.log(s));",
        starterCode: "", language: "javascript",
        expectedOutput: "validate-type\nvalidate-size\nscan-virus\nupload-to-storage\nsave-url-to-db"
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "AfiČ™eazÄ cu console.log limitele comune pentru file upload (maxSize: 5MB, types: images only, count: max 10), cĂ˘te una pe linie.",
        answer: "[['maxSize','5MB'],['types','images only'],['count','max 10']].forEach(([k,v]) => console.log(`${k}: ${v}`));",
        starterCode: "", language: "javascript",
        expectedOutput: "maxSize: 5MB\ntypes: images only\ncount: max 10"
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "ConstruieČ™te un obiect cu configuraČ›ia UploadThing pentru imagini Č™i afiČ™eazÄ numÄrul de chei cu console.log.",
        answer: "const config = { maxFileSize: '4MB', maxFileCount: 4, acceptedTypes: ['image/jpeg','image/png','image/webp'], onUploadComplete: 'async handler' };\nconsole.log(Object.keys(config).length);",
        starterCode: "", language: "javascript",
        expectedOutput: "4"
      }
    ]
  },
  {
    lessonId: "6a09b17b9384b94515fcf318",
    name: "33. Background Jobs si Queue-uri",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ serviciul Upstash pentru job-uri background:\n```js\nimport { Client } from '@upstash/___'\n```",
        answer: "qstash", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ platforma de workflow pentru Next.js:\n```js\nimport { inngest } from './___.client'\n```",
        answer: "inngest", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ expresia cron pentru job zilnic la miezul nopČ›ii:\n```\n0 ___ * * *\n```",
        answer: "0", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ metoda QStash pentru publicarea unui mesaj:\n```js\nawait qstash.publish___(url, body)\n```",
        answer: "JSON", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ librÄria Redis pentru job queue-uri avansate:\n```js\nconst queue = new Queue('___', { connection: redis })\n```",
        answer: "emails", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "CreeazÄ un array cu tipurile de job-uri background (email, notification, cleanup, report, sync, backup) Č™i afiČ™eazÄ cĂ˘te sunt cu console.log.",
        answer: "const jobs = ['email','notification','cleanup','report','sync','backup'];\nconsole.log(jobs.length);",
        starterCode: "", language: "javascript",
        expectedOutput: "6"
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "SimuleazÄ un sistem de queue: ai un array de job-uri cu status. FiltreazÄ job-urile pending Č™i afiČ™eazÄ cĂ˘te sunt cu console.log.\n```js\nconst queue = [{id:1,status:'completed'},{id:2,status:'pending'},{id:3,status:'failed'},{id:4,status:'pending'},{id:5,status:'pending'}];\n```",
        answer: "const queue = [{id:1,status:'completed'},{id:2,status:'pending'},{id:3,status:'failed'},{id:4,status:'pending'},{id:5,status:'pending'}];\nconsole.log(queue.filter(j => j.status === 'pending').length);",
        starterCode: "", language: "javascript",
        expectedOutput: "3"
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "ConstruieČ™te Č™i afiČ™eazÄ cu console.log diferenČ›a dintre Vercel Cron (scheduled) Č™i QStash (triggered), cĂ˘te una pe linie.",
        answer: "[['vercel-cron','scheduled - runs on schedule'],['qstash','triggered - runs on demand']].forEach(([k,v]) => console.log(`${k}: ${v}`));",
        starterCode: "", language: "javascript",
        expectedOutput: "vercel-cron: scheduled - runs on schedule\nqstash: triggered - runs on demand"
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "AfiČ™eazÄ cu console.log serviciile pentru background jobs Ă®n Next.js (vercel-cron, qstash, inngest, trigger-dev, bullmq), cĂ˘te unul pe linie.",
        answer: "['vercel-cron','qstash','inngest','trigger-dev','bullmq'].forEach(s => console.log(s));",
        starterCode: "", language: "javascript",
        expectedOutput: "vercel-cron\nqstash\ninngest\ntrigger-dev\nbullmq"
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "ConstruieČ™te un obiect cu proprietÄČ›ile unui job Č™i afiČ™eazÄ numÄrul cu console.log.",
        answer: "const job = { id: 'job-123', name: 'send-welcome-email', status: 'pending', retries: 0, maxRetries: 3, payload: {} };\nconsole.log(Object.keys(job).length);",
        starterCode: "", language: "javascript",
        expectedOutput: "6"
      }
    ]
  },
  {
    lessonId: "6a09b17d9384b94515fcf32c",
    name: "34. Rate Limiting si Security",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ serviciul Upstash pentru rate limiting:\n```js\nimport { Ratelimit } from '@upstash/___'\n```",
        answer: "ratelimit", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ algoritmul de rate limiting pentru fereastrÄ glisantÄ:\n```js\nRatelimit.sliding___(10, '10 s')\n```",
        answer: "Window", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ statusul HTTP pentru prea multe request-uri:\n```js\nreturn new Response('Rate limited', { status: ___ })\n```",
        answer: "429", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ header-ul CORS pentru metodele permise:\n```js\nheaders.set('Access-Control-Allow-___', 'GET, POST')\n```",
        answer: "Methods", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ header-ul de securitate Ă®mpotriva XSS:\n```js\nheaders.set('X-___-Protection', '1; mode=block')\n```",
        answer: "XSS", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "CreeazÄ un array cu algoritmii de rate limiting (fixed-window, sliding-window, token-bucket, leaky-bucket) Č™i afiČ™eazÄ cĂ˘te sunt cu console.log.",
        answer: "const algos = ['fixed-window','sliding-window','token-bucket','leaky-bucket'];\nconsole.log(algos.length);",
        starterCode: "", language: "javascript",
        expectedOutput: "4"
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "SimuleazÄ rate limiting cu fereastrÄ fixÄ de 60 secunde: calculeazÄ cĂ˘te request-uri mai poate face un IP care a fÄcut deja 85 din 100 permise. AfiČ™eazÄ cu console.log.",
        answer: "const limit = 100, used = 85;\nconsole.log(limit - used);",
        starterCode: "", language: "javascript",
        expectedOutput: "15"
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "ConstruieČ™te Č™i afiČ™eazÄ cu console.log header-ele de securitate recomandate (X-Content-Type-Options, X-Frame-Options, X-XSS-Protection, Strict-Transport-Security, Content-Security-Policy), cĂ˘te unul pe linie.",
        answer: "['X-Content-Type-Options','X-Frame-Options','X-XSS-Protection','Strict-Transport-Security','Content-Security-Policy'].forEach(h => console.log(h));",
        starterCode: "", language: "javascript",
        expectedOutput: "X-Content-Type-Options\nX-Frame-Options\nX-XSS-Protection\nStrict-Transport-Security\nContent-Security-Policy"
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "AfiČ™eazÄ cu console.log vectorii de atac preveniti prin security headers (XSS, clickjacking, MIME-sniffing, protocol-downgrade, code-injection), cĂ˘te unul pe linie.",
        answer: "['XSS','clickjacking','MIME-sniffing','protocol-downgrade','code-injection'].forEach(a => console.log(a));",
        starterCode: "", language: "javascript",
        expectedOutput: "XSS\nclickjacking\nMIME-sniffing\nprotocol-downgrade\ncode-injection"
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "ConstruieČ™te un obiect cu configuraČ›ia rate limiter Č™i afiČ™eazÄ numÄrul de chei cu console.log.",
        answer: "const rl = { algorithm: 'sliding-window', requests: 100, window: '60 s', store: 'redis', keyPrefix: 'rl:' };\nconsole.log(Object.keys(rl).length);",
        starterCode: "", language: "javascript",
        expectedOutput: "5"
      }
    ]
  },
  {
    lessonId: "6a09b1809384b94515fcf340",
    name: "35. API-uri avansate in Next.js",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ parametrul URL pentru paginare:\n```\n/api/posts?page=1&___=10\n```",
        answer: "limit", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ prefixul URL pentru versionarea API:\n```\n/api/___/users\n```",
        answer: "v1", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ parametrul URL pentru filtrare:\n```\n/api/posts?___=technology&author=john\n```",
        answer: "category", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ parametrul URL pentru sortare:\n```\n/api/posts?sort=___ At\n```",
        answer: "created", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ header-ul pentru specificarea versiunii API:\n```\nAccept: application/vnd.api+json; version=___\n```",
        answer: "2", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "CreeazÄ un array cu parametrii comuni de filtrare/sortare API (page, limit, sort, order, filter, search, include) Č™i afiČ™eazÄ cĂ˘te sunt cu console.log.",
        answer: "const params = ['page','limit','sort','order','filter','search','include'];\nconsole.log(params.length);",
        starterCode: "", language: "javascript",
        expectedOutput: "7"
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "ConstruieČ™te un URL API cu filtrare, sortare Č™i paginare Č™i afiČ™eazÄ-l cu console.log.\n```js\nconst base = '/api/v1/posts';\nconst params = { page: 2, limit: 10, sort: 'createdAt', order: 'desc', category: 'tech' };\n```",
        answer: "const base = '/api/v1/posts';\nconst params = { page: 2, limit: 10, sort: 'createdAt', order: 'desc', category: 'tech' };\nconsole.log(base + '?' + new URLSearchParams(params).toString());",
        starterCode: "", language: "javascript",
        expectedOutput: "/api/v1/posts?page=2&limit=10&sort=createdAt&order=desc&category=tech"
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "ConstruieČ™te Č™i afiČ™eazÄ cu console.log structura unui rÄspuns API paginat standard ca JSON.",
        answer: "const res = { data: [], meta: { page: 1, limit: 10, total: 50, totalPages: 5 }, links: { next: '/api/posts?page=2', prev: null } };\nconsole.log(Object.keys(res).join(', '));",
        starterCode: "", language: "javascript",
        expectedOutput: "data, meta, links"
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "AfiČ™eazÄ cu console.log strategiile de versionare API (url-path, header, query-param, content-type), cĂ˘te una pe linie.",
        answer: "['url-path','header','query-param','content-type'].forEach(s => console.log(s));",
        starterCode: "", language: "javascript",
        expectedOutput: "url-path\nheader\nquery-param\ncontent-type"
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "ConstruieČ™te un obiect cu caracteristicile unui API REST avansat Č™i afiČ™eazÄ numÄrul cu console.log.",
        answer: "const api = { versioning: 'url-path', pagination: 'cursor-based', filtering: 'query-params', sorting: 'multi-field', security: 'jwt+rate-limit', docs: 'openapi' };\nconsole.log(Object.keys(api).length);",
        starterCode: "", language: "javascript",
        expectedOutput: "6"
      }
    ]
  }
];

async function main() {
  for (const fix of FIXES) {
    const del = await prisma.task.deleteMany({
      where: { lessonId: fix.lessonId, number: { gte: 6 } }
    });
    await prisma.task.createMany({
      data: fix.tasks.map(t => ({ ...t, lessonId: fix.lessonId }))
    });
    console.log(`âś“ ${fix.name} â€” deleted ${del.count}, created ${fix.tasks.length}`);
  }
  console.log("Done.");
  await prisma.$disconnect();
}

main().catch(e => { console.error(e); process.exit(1); });

