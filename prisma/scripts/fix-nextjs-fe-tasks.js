const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const FIXES = [
  {
    lessonId: "69fa35c707a1f637cf4f1708",
    name: "2. File-based Routing Č™i Pagini",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ fiČ™ierul obligatoriu din fiecare director de rutÄ Ă®n App Router:\n```\napp/about/___\n```",
        answer: "page.js", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ fiČ™ierul pentru layout-ul care Ă®nconjoarÄ toate paginile:\n```\napp/___\n```",
        answer: "layout.js", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ directorul rÄdÄcinÄ al App Router Ă®n Next.js 13+:\n```\n___/page.js\n```",
        answer: "app", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ exportul implicit al unei pagini Next.js:\n```js\nexport ___ function Page() { return <div>Page</div> }\n```",
        answer: "default", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ fiČ™ierul pentru o paginÄ 404 customizatÄ Ă®n App Router:\n```\napp/___\n```",
        answer: "not-found.js", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "CreeazÄ un array cu fiČ™ierele speciale ale App Router Next.js (page.js, layout.js, loading.js, error.js, not-found.js) Č™i afiČ™eazÄ cĂ˘te sunt cu console.log.",
        answer: "const files = ['page.js','layout.js','loading.js','error.js','not-found.js'];\nconsole.log(files.length);",
        starterCode: "", language: "javascript",
        expectedOutput: "5"
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Ai un array de rute. ConstruieČ™te calea completÄ pentru fiecare (app/[ruta]/page.js) Č™i afiČ™eazÄ-le cu console.log, cĂ˘te una pe linie.\n```js\nconst routes = ['about', 'blog', 'contact', 'pricing'];\n```",
        answer: "const routes = ['about', 'blog', 'contact', 'pricing'];\nroutes.forEach(r => console.log(`app/${r}/page.js`));",
        starterCode: "", language: "javascript",
        expectedOutput: "app/about/page.js\napp/blog/page.js\napp/contact/page.js\napp/pricing/page.js"
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "ConstruieČ™te Č™i afiČ™eazÄ cu console.log structura de fiČ™iere pentru o rutÄ nested 'dashboard/settings' (app/dashboard/settings/page.js).",
        answer: "const base = 'app';\nconst route = 'dashboard/settings';\nconsole.log(`${base}/${route}/page.js`);",
        starterCode: "", language: "javascript",
        expectedOutput: "app/dashboard/settings/page.js"
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "AfiČ™eazÄ cu console.log fiČ™ierele obligatorii Č™i opČ›ionale ale App Router, cĂ˘te unul pe linie.",
        answer: "['page.js','layout.js','loading.js','error.js','not-found.js','route.js','template.js','default.js'].forEach(f => console.log(f));",
        starterCode: "", language: "javascript",
        expectedOutput: "page.js\nlayout.js\nloading.js\nerror.js\nnot-found.js\nroute.js\ntemplate.js\ndefault.js"
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "ConstruieČ™te un obiect cu structura de fiČ™iere a App Router Č™i afiČ™eazÄ numÄrul de fiČ™iere speciale cu console.log.",
        answer: "const appRouter = { page: 'page.js', layout: 'layout.js', loading: 'loading.js', error: 'error.js', notFound: 'not-found.js', route: 'route.js' };\nconsole.log(Object.keys(appRouter).length);",
        starterCode: "", language: "javascript",
        expectedOutput: "6"
      }
    ]
  },
  {
    lessonId: "69fa35cd07a1f637cf4f1735",
    name: "5. Link, Navigation, useRouter",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ importul componentei de navigare Next.js:\n```js\nimport ___ from 'next/link'\n```",
        answer: "Link", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ metoda de navigare programaticÄ cu useRouter:\n```js\nrouter.___(  '/dashboard')\n```",
        answer: "push", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ metoda pentru a Ă®nlocui history (fÄrÄ back):\n```js\nrouter.___('/login')\n```",
        answer: "replace", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ hook-ul pentru navigare programaticÄ Ă®n App Router:\n```js\nconst router = ___()\n```",
        answer: "useRouter", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ prop-ul Link pentru navigare pe aceeaČ™i paginÄ (nu prefetch):\n```jsx\n<Link href=\"/about\" ___={false}>About</Link>\n```",
        answer: "prefetch", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "CreeazÄ un array cu rutele principale ale unei aplicaČ›ii Next.js Č™i afiČ™eazÄ-le cu console.log Ă®n format de path, cĂ˘te una pe linie.",
        answer: "const routes = ['/', '/about', '/blog', '/dashboard', '/settings', '/login'];\nroutes.forEach(r => console.log(r));",
        starterCode: "", language: "javascript",
        expectedOutput: "/\n/about\n/blog\n/dashboard\n/settings\n/login"
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Ai un array de link-uri. FiltreazÄ link-urile interne (Ă®ncep cu '/') Č™i afiČ™eazÄ cĂ˘te sunt cu console.log.\n```js\nconst links = ['/', '/about', 'https://google.com', '/blog', '/contact', 'https://github.com'];\n```",
        answer: "const links = ['/', '/about', 'https://google.com', '/blog', '/contact', 'https://github.com'];\nconsole.log(links.filter(l => l.startsWith('/')).length);",
        starterCode: "", language: "javascript",
        expectedOutput: "4"
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "ConstruieČ™te Č™i afiČ™eazÄ cu console.log un URL cu query params (ruta '/search' cu q='nextjs' Č™i page='1').",
        answer: "const base = '/search';\nconst params = new URLSearchParams({ q: 'nextjs', page: '1' });\nconsole.log(`${base}?${params.toString()}`);",
        starterCode: "", language: "javascript",
        expectedOutput: "/search?q=nextjs&page=1"
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "AfiČ™eazÄ cu console.log metodele disponibile pe obiectul router Ă®n Next.js (push, replace, back, forward, refresh, prefetch), cĂ˘te una pe linie.",
        answer: "['push','replace','back','forward','refresh','prefetch'].forEach(m => console.log(m));",
        starterCode: "", language: "javascript",
        expectedOutput: "push\nreplace\nback\nforward\nrefresh\nprefetch"
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "ConstruieČ™te un obiect cu metodele de navigare Č™i descrierile lor, Č™i afiČ™eazÄ numÄrul de metode cu console.log.",
        answer: "const methods = { push: 'navigheazÄ Č™i adaugÄ Ă®n history', replace: 'navigheazÄ fÄrÄ history', back: 'Ă®napoi Ă®n history', forward: 'Ă®nainte Ă®n history', refresh: 'reĂ®ncarcÄ pagina' };\nconsole.log(Object.keys(methods).length);",
        starterCode: "", language: "javascript",
        expectedOutput: "5"
      }
    ]
  },
  {
    lessonId: "69fa35cf07a1f637cf4f1744",
    name: "6. Dynamic Routes ([slug])",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ directorul pentru o rutÄ dinamicÄ cu parametrul slug:\n```\napp/blog/[___]/page.js\n```",
        answer: "slug", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ parametrul din props al paginii dinamice:\n```js\nexport default function Page({ ___ }) { return <div>{params.slug}</div> }\n```",
        answer: "params", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ funcČ›ia pentru generarea rutelor statice la build time:\n```js\nexport function generate___Params() { return [{ slug: 'post-1' }] }\n```",
        answer: "Static", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ sintaxa pentru rute catch-all Ă®n Next.js:\n```\napp/blog/[...___ ]/page.js\n```",
        answer: "slug", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ valoarea accesatÄ din params pentru o rutÄ [id]:\n```js\nconst { ___ } = params;\n```",
        answer: "id", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "SimuleazÄ generateStaticParams: creeazÄ un array cu 5 slug-uri de blog Č™i mapeazÄ-le la formatul { slug: '...' }. AfiČ™eazÄ numÄrul de parametri cu console.log.",
        answer: "const slugs = ['intro-nextjs', 'react-hooks', 'tailwind-tips', 'prisma-guide', 'typescript-basics'];\nconst params = slugs.map(s => ({ slug: s }));\nconsole.log(params.length);",
        starterCode: "", language: "javascript",
        expectedOutput: "5"
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Ai un array de post-uri. ConstruieČ™te path-urile dinamice pentru fiecare Č™i afiČ™eazÄ-le cu console.log, cĂ˘te unul pe linie.\n```js\nconst posts = [{slug:'hello-world'},{slug:'nextjs-15'},{slug:'react-19'}];\n```",
        answer: "const posts = [{slug:'hello-world'},{slug:'nextjs-15'},{slug:'react-19'}];\nposts.forEach(p => console.log(`/blog/${p.slug}`));",
        starterCode: "", language: "javascript",
        expectedOutput: "/blog/hello-world\n/blog/nextjs-15\n/blog/react-19"
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "ConstruieČ™te Č™i afiČ™eazÄ cu console.log un path pentru o rutÄ catch-all cu segmentele ['2024', '06', 'my-post'].",
        answer: "const segments = ['2024', '06', 'my-post'];\nconsole.log('/blog/' + segments.join('/'));",
        starterCode: "", language: "javascript",
        expectedOutput: "/blog/2024/06/my-post"
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "AfiČ™eazÄ cu console.log tipurile de rute dinamice Next.js Č™i sintaxa lor, cĂ˘te una pe linie.",
        answer: "[['[slug]','single param'],['[...slug]','catch-all'],['[[...slug]]','optional catch-all']].forEach(([s,d]) => console.log(`${s}: ${d}`));",
        starterCode: "", language: "javascript",
        expectedOutput: "[slug]: single param\n[...slug]: catch-all\n[[...slug]]: optional catch-all"
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "ConstruieČ™te un array cu 3 rute dinamice diferite Č™i afiČ™eazÄ cĂ˘te segmente dinamice are fiecare cu console.log.\n```js\nconst routes = ['app/[id]/page.js', 'app/[category]/[slug]/page.js', 'app/[...path]/page.js'];\n```",
        answer: "const routes = ['app/[id]/page.js', 'app/[category]/[slug]/page.js', 'app/[...path]/page.js'];\nroutes.forEach(r => { const count = (r.match(/\\[/g) || []).length; console.log(count); });",
        starterCode: "", language: "javascript",
        expectedOutput: "1\n2\n1"
      }
    ]
  },
  {
    lessonId: "69fa35d107a1f637cf4f1753",
    name: "7. Loading, Error, Not Found",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ fiČ™ierul pentru UI de loading Ă®n App Router:\n```\napp/dashboard/___\n```",
        answer: "loading.js", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ fiČ™ierul pentru gestionarea erorilor Ă®n App Router:\n```\napp/dashboard/___\n```",
        answer: "error.js", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ funcČ›ia Next.js pentru a afiČ™a pagina 404:\n```js\nimport { ___ } from 'next/navigation'\n___()\n```",
        answer: "notFound", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ componenta React pentru lazy loading cu Suspense:\n```jsx\n<___ fallback={<Spinner/>}>\n  <Component/>\n</___>\n```",
        answer: "Suspense", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ prop-ul funcČ›iei error.js pentru a reĂ®ncerca:\n```js\nexport default function Error({ error, ___ }) {\n  return <button onClick={reset}>Retry</button>\n}\n```",
        answer: "reset", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "CreeazÄ un array cu fiČ™ierele de UI special Next.js pentru gestionarea stÄrilor (loading, error, not-found, global-error) Č™i afiČ™eazÄ cĂ˘te sunt cu console.log.",
        answer: "const files = ['loading.js', 'error.js', 'not-found.js', 'global-error.js'];\nconsole.log(files.length);",
        starterCode: "", language: "javascript",
        expectedOutput: "4"
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Ai un array de stÄri posibile ale unui fetch. MapeazÄ fiecare stare la fiČ™ierul Next.js corespunzÄtor Č™i afiČ™eazÄ cu console.log.\n```js\nconst states = ['loading', 'error', 'notFound'];\n```",
        answer: "const states = ['loading', 'error', 'notFound'];\nconst map = { loading: 'loading.js', error: 'error.js', notFound: 'not-found.js' };\nstates.forEach(s => console.log(map[s]));",
        starterCode: "", language: "javascript",
        expectedOutput: "loading.js\nerror.js\nnot-found.js"
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "ConstruieČ™te Č™i afiČ™eazÄ cu console.log calea completÄ a fiČ™ierelor de stare pentru ruta 'dashboard' Ă®n App Router.",
        answer: "['loading.js','error.js','not-found.js'].forEach(f => console.log(`app/dashboard/${f}`));",
        starterCode: "", language: "javascript",
        expectedOutput: "app/dashboard/loading.js\napp/dashboard/error.js\napp/dashboard/not-found.js"
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "AfiČ™eazÄ cu console.log diferenČ›a dintre loading.js Č™i Suspense: loading.js este automat, Suspense este manual. AfiČ™eazÄ ca array de avantaje.",
        answer: "const loading = ['automat','nivel-ruta','server-side'];\nconst suspense = ['manual','component-level','granular'];\nconsole.log(loading.length + suspense.length);",
        starterCode: "", language: "javascript",
        expectedOutput: "6"
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "ConstruieČ™te un obiect cu codurile de eroare HTTP Č™i fiČ™ierele Next.js corespunzÄtoare Č™i afiČ™eazÄ cu console.log Ă®n format 'code: file'.\n```js\nconst errors = { 404: 'not-found.js', 500: 'error.js', 403: 'error.js' };\n```",
        answer: "const errors = { 404: 'not-found.js', 500: 'error.js', 403: 'error.js' };\nObject.entries(errors).forEach(([k,v]) => console.log(`${k}: ${v}`));",
        starterCode: "", language: "javascript",
        expectedOutput: "404: not-found.js\n500: error.js\n403: error.js"
      }
    ]
  },
  {
    lessonId: "69fa35d507a1f637cf4f1771",
    name: "9. Stilizare Ă®n Next.js",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ extensia fiČ™ierului CSS Module Ă®n Next.js:\n```js\nimport styles from './Button.___.css'\n```",
        answer: "module", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ fiČ™ierul CSS global importat Ă®n layout.js:\n```js\nimport './___.css'\n```",
        answer: "globals", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ modul de folosire a clasei din CSS Module:\n```jsx\n<div className={styles.___}>Hello</div>\n```",
        answer: "container", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ fiČ™ierul de configurare PostCSS necesar pentru Tailwind:\n```\n___.config.js\n```",
        answer: "postcss", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ prop-ul React pentru clase CSS (Ă®n loc de 'class' din HTML):\n```jsx\n<div ___=\"bg-blue-500\">Text</div>\n```",
        answer: "className", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "CreeazÄ un array cu metodele de stilizare Ă®n Next.js (css-modules, global-css, tailwind, css-in-js, sass) Č™i afiČ™eazÄ cĂ˘te sunt cu console.log.",
        answer: "const methods = ['css-modules','global-css','tailwind','css-in-js','sass'];\nconsole.log(methods.length);",
        starterCode: "", language: "javascript",
        expectedOutput: "5"
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Ai un array de fiČ™iere CSS. FiltreazÄ fiČ™ierele CSS Module (conČ›in '.module.') Č™i afiČ™eazÄ cĂ˘te sunt cu console.log.\n```js\nconst files = ['globals.css','Button.module.css','Card.module.css','tailwind.css','Header.module.css'];\n```",
        answer: "const files = ['globals.css','Button.module.css','Card.module.css','tailwind.css','Header.module.css'];\nconsole.log(files.filter(f => f.includes('.module.')).length);",
        starterCode: "", language: "javascript",
        expectedOutput: "3"
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "ConstruieČ™te Č™i afiČ™eazÄ cu console.log numele fiČ™ierului CSS Module pentru componentele: Button, Card, Navbar.",
        answer: "['Button','Card','Navbar'].forEach(c => console.log(`${c}.module.css`));",
        starterCode: "", language: "javascript",
        expectedOutput: "Button.module.css\nCard.module.css\nNavbar.module.css"
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "AfiČ™eazÄ cu console.log avantajele CSS Modules faČ›Ä de CSS global: scoped, no-conflicts, auto-prefixed, tree-shaking, cĂ˘te unul pe linie.",
        answer: "['scoped','no-conflicts','auto-prefixed','tree-shaking'].forEach(a => console.log(a));",
        starterCode: "", language: "javascript",
        expectedOutput: "scoped\nno-conflicts\nauto-prefixed\ntree-shaking"
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "ConstruieČ™te un obiect cu metodele de stilizare Č™i cĂ˘te fiČ™iere de config necesitÄ fiecare, Č™i afiČ™eazÄ suma totalÄ cu console.log.",
        answer: "const styling = { 'css-modules': 0, 'global-css': 0, tailwind: 2, sass: 1 };\nconsole.log(Object.values(styling).reduce((a,b) => a+b, 0));",
        starterCode: "", language: "javascript",
        expectedOutput: "3"
      }
    ]
  },
  {
    lessonId: "69fa35d707a1f637cf4f1780",
    name: "10. Hook-uri Next.js (useParams, usePathname)",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ hook-ul pentru a accesa parametrii dinamici ai rutei:\n```js\nconst params = ___();\n```",
        answer: "useParams", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ hook-ul pentru a obČ›ine calea curentÄ a URL-ului:\n```js\nconst path = ___();\n```",
        answer: "usePathname", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ hook-ul pentru a citi query params din URL:\n```js\nconst searchParams = ___();\n```",
        answer: "useSearchParams", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ directiva necesarÄ pentru componenta care foloseČ™te hooks:\n```js\n'use ___'\n```",
        answer: "client", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ metoda pentru a citi un parametru din searchParams:\n```js\nconst q = searchParams.___ ('q');\n```",
        answer: "get", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "CreeazÄ un array cu hook-urile Next.js pentru navigare (useRouter, usePathname, useParams, useSearchParams) Č™i afiČ™eazÄ-le cu console.log, cĂ˘te unul pe linie.",
        answer: "['useRouter','usePathname','useParams','useSearchParams'].forEach(h => console.log(h));",
        starterCode: "", language: "javascript",
        expectedOutput: "useRouter\nusePathname\nuseParams\nuseSearchParams"
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "SimuleazÄ usePathname: ai un array de path-uri. VerificÄ care sunt active (egale cu '/dashboard') Č™i afiČ™eazÄ cu console.log cĂ˘te sunt active.\n```js\nconst paths = ['/home', '/dashboard', '/about', '/dashboard', '/settings'];\n```",
        answer: "const paths = ['/home', '/dashboard', '/about', '/dashboard', '/settings'];\nconsole.log(paths.filter(p => p === '/dashboard').length);",
        starterCode: "", language: "javascript",
        expectedOutput: "2"
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "SimuleazÄ parsarea searchParams dintr-un URL. Extrage valorile q Č™i page din '?q=nextjs&page=2' Č™i afiČ™eazÄ-le cu console.log.",
        answer: "const url = '?q=nextjs&page=2';\nconst params = new URLSearchParams(url);\nconsole.log(params.get('q'));\nconsole.log(params.get('page'));",
        starterCode: "", language: "javascript",
        expectedOutput: "nextjs\n2"
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "AfiČ™eazÄ cu console.log din ce pachet se importÄ fiecare hook Next.js: useRouter, usePathname, useParams, useSearchParams.",
        answer: "const hooks = {useRouter:'next/navigation',usePathname:'next/navigation',useParams:'next/navigation',useSearchParams:'next/navigation'};\nObject.entries(hooks).forEach(([h,p]) => console.log(`${h}: ${p}`));",
        starterCode: "", language: "javascript",
        expectedOutput: "useRouter: next/navigation\nusePathname: next/navigation\nuseParams: next/navigation\nuseSearchParams: next/navigation"
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "ConstruieČ™te un array cu segmentele de path din '/dashboard/users/123' Č™i afiČ™eazÄ cĂ˘te segmente are cu console.log.",
        answer: "const path = '/dashboard/users/123';\nconst segments = path.split('/').filter(s => s !== '');\nconsole.log(segments.length);",
        starterCode: "", language: "javascript",
        expectedOutput: "3"
      }
    ]
  },
  {
    lessonId: "69fb2588a7657a7d121f04ef",
    name: "11. Streaming Č™i Suspense",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ componenta React pentru a adÄuga un fallback de loading:\n```jsx\n<___ fallback={<Skeleton/>}>\n  <SlowComponent/>\n</___>\n```",
        answer: "Suspense", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ fiČ™ierul Next.js care activeazÄ automat Suspense la nivel de rutÄ:\n```\napp/dashboard/___\n```",
        answer: "loading.js", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ importul Suspense din React:\n```js\nimport { ___ } from 'react'\n```",
        answer: "Suspense", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ strategia de rendering care combinÄ static Č™i streaming:\n```\nPartial Pre-___\n```",
        answer: "Rendering", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ prop-ul Suspense pentru componenta de loading:\n```jsx\n<Suspense ___={<Loading/>}>\n```",
        answer: "fallback", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "CreeazÄ un array cu avantajele Streaming SSR faČ›Ä de SSR clasic (faster-ttfb, progressive-loading, no-waterfall, better-ux, parallel-data) Č™i afiČ™eazÄ cĂ˘te sunt cu console.log.",
        answer: "const benefits = ['faster-ttfb','progressive-loading','no-waterfall','better-ux','parallel-data'];\nconsole.log(benefits.length);",
        starterCode: "", language: "javascript",
        expectedOutput: "5"
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "SimuleazÄ o lista de componente cu Suspense boundaries. AfiČ™eazÄ cu console.log cĂ˘te componente au fallback definit.\n```js\nconst components = [{name:'Header',fallback:null},{name:'Feed',fallback:'Loading...'},{name:'Sidebar',fallback:'Loading...'},{name:'Footer',fallback:null}];\n```",
        answer: "const components = [{name:'Header',fallback:null},{name:'Feed',fallback:'Loading...'},{name:'Sidebar',fallback:'Loading...'},{name:'Footer',fallback:null}];\nconsole.log(components.filter(c => c.fallback !== null).length);",
        starterCode: "", language: "javascript",
        expectedOutput: "2"
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "ConstruieČ™te Č™i afiČ™eazÄ cu console.log ordinea de rendering cu streaming: shell, suspense-boundary-1, suspense-boundary-2, cĂ˘te una pe linie.",
        answer: "['shell','suspense-boundary-1','suspense-boundary-2'].forEach((s,i) => console.log(`${i+1}. ${s}`));",
        starterCode: "", language: "javascript",
        expectedOutput: "1. shell\n2. suspense-boundary-1\n3. suspense-boundary-2"
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "AfiČ™eazÄ cu console.log diferenČ›a dintre loading.js (automat, nivel rutÄ) Č™i Suspense (manual, nivel componentÄ). AfiČ™eazÄ ca array de caracteristici.",
        answer: "const loadingJs = ['automat','nivel-ruta','fara-import'];\nconst suspense = ['manual','nivel-componenta','necesita-import'];\nconsole.log(loadingJs.length + suspense.length);",
        starterCode: "", language: "javascript",
        expectedOutput: "6"
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "ConstruieČ™te un obiect cu strategiile de rendering Next.js Č™i afiČ™eazÄ numÄrul de strategii cu console.log.",
        answer: "const strategies = { SSR: 'server-side-rendering', SSG: 'static-site-gen', ISR: 'incremental-static-regen', streaming: 'streaming-ssr', CSR: 'client-side-rendering' };\nconsole.log(Object.keys(strategies).length);",
        starterCode: "", language: "javascript",
        expectedOutput: "5"
      }
    ]
  },
  {
    lessonId: "69fb258aa7657a7d121f04fb",
    name: "12. Parallel Routes (@slot)",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ prefixul pentru un slot de rutÄ paralelÄ:\n```\napp/@___/page.js\n```",
        answer: "slot", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ fiČ™ierul fallback pentru un slot care nu are rutÄ activÄ:\n```\napp/@modal/___\n```",
        answer: "default.js", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ prop-ul layout-ului pentru a primi un slot @modal:\n```js\nexport default function Layout({ children, ___ }) {}\n```",
        answer: "modal", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ simbolul care prefixeazÄ numele unui slot Ă®n App Router:\n```\napp/___modal/page.js\n```",
        answer: "@", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ fiČ™ierul obligatoriu cĂ˘nd un slot nu are rutÄ corespunzÄtoare:\n```\napp/@analytics/___\n```",
        answer: "default.js", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "CreeazÄ un array cu use case-urile pentru Parallel Routes (modals, split-views, dashboards, tabs, sidebars) Č™i afiČ™eazÄ cĂ˘te sunt cu console.log.",
        answer: "const uses = ['modals','split-views','dashboards','tabs','sidebars'];\nconsole.log(uses.length);",
        starterCode: "", language: "javascript",
        expectedOutput: "5"
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Ai un array de slot-uri. ConstruieČ™te path-urile complete pentru fiecare Č™i afiČ™eazÄ-le cu console.log.\n```js\nconst slots = ['modal', 'sidebar', 'analytics'];\n```",
        answer: "const slots = ['modal', 'sidebar', 'analytics'];\nslots.forEach(s => console.log(`app/@${s}/page.js`));",
        starterCode: "", language: "javascript",
        expectedOutput: "app/@modal/page.js\napp/@sidebar/page.js\napp/@analytics/page.js"
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "ConstruieČ™te Č™i afiČ™eazÄ cu console.log signatura layout-ului cu 2 slot-uri (@modal Č™i @sidebar) Č™i children.",
        answer: "const slots = ['modal','sidebar'];\nconst params = ['children',...slots].join(', ');\nconsole.log(`Layout({ ${params} })`);",
        starterCode: "", language: "javascript",
        expectedOutput: "Layout({ children, modal, sidebar })"
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "AfiČ™eazÄ cu console.log fiČ™ierele necesare pentru un slot @modal complet (page.js Č™i default.js), cĂ˘te unul pe linie.",
        answer: "['page.js','default.js'].forEach(f => console.log(`app/@modal/${f}`));",
        starterCode: "", language: "javascript",
        expectedOutput: "app/@modal/page.js\napp/@modal/default.js"
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "ConstruieČ™te un obiect cu structura de directoare pentru parallel routes Č™i afiČ™eazÄ numÄrul de slot-uri cu console.log.",
        answer: "const structure = { '@modal': ['page.js','default.js'], '@sidebar': ['page.js','default.js'], '@analytics': ['page.js','default.js'] };\nconsole.log(Object.keys(structure).length);",
        starterCode: "", language: "javascript",
        expectedOutput: "3"
      }
    ]
  },
  {
    lessonId: "69fb258ba7657a7d121f0507",
    name: "13. Intercepting Routes",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ convenČ›ia pentru interceptarea rutei curente:\n```\napp/(___)/photo/[id]/page.js\n```",
        answer: ".", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ convenČ›ia pentru interceptarea rutei din directorul pÄrinte:\n```\napp/feed/(___)/photo/[id]/page.js\n```",
        answer: "..", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ convenČ›ia pentru interceptarea din root:\n```\napp/(___)/photo/[id]/page.js\n```",
        answer: "...", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ pattern-ul de UI care combinÄ intercepting routes cu parallel routes:\n```\n___ pattern\n```",
        answer: "modal", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ convenČ›ia folositÄ pentru interceptarea rutei din directorul pÄrinte Ă®n next.js intercepting routes:\n```\n(___)\n```",
        answer: "..", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "CreeazÄ un array cu cele 3 convenČ›ii de interceptare Č™i descrierile lor, Č™i afiČ™eazÄ cu console.log Ă®n format 'conv: desc', cĂ˘te una pe linie.",
        answer: "const conv = [['(.)','acelasi nivel'],['(..)','un nivel sus'],['(...)','root']];\nconv.forEach(([c,d]) => console.log(`${c}: ${d}`));",
        starterCode: "", language: "javascript",
        expectedOutput: "(.): acelasi nivel\n(..): un nivel sus\n(...): root"
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Ai structura unei galerii foto cu intercepting routes. AfiČ™eazÄ cu console.log cĂ˘te fiČ™iere page.js existÄ total.\n```js\nconst files = ['app/gallery/page.js','app/gallery/[id]/page.js','app/gallery/(.)photo/[id]/page.js','app/@modal/(.)photo/[id]/page.js'];\n```",
        answer: "const files = ['app/gallery/page.js','app/gallery/[id]/page.js','app/gallery/(.)photo/[id]/page.js','app/@modal/(.)photo/[id]/page.js'];\nconsole.log(files.filter(f => f.endsWith('page.js')).length);",
        starterCode: "", language: "javascript",
        expectedOutput: "4"
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "ConstruieČ™te Č™i afiČ™eazÄ cu console.log path-ul pentru o rutÄ interceptatÄ din directorul curent pentru foto/123.",
        answer: "const photoId = 123;\nconsole.log(`app/(.)photo/${photoId}/page.js`);",
        starterCode: "", language: "javascript",
        expectedOutput: "app/(.)photo/123/page.js"
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "AfiČ™eazÄ cu console.log cazurile de utilizare pentru intercepting routes (photo-modal, login-modal, shopping-cart, preview-drawer), cĂ˘te unul pe linie.",
        answer: "['photo-modal','login-modal','shopping-cart','preview-drawer'].forEach(u => console.log(u));",
        starterCode: "", language: "javascript",
        expectedOutput: "photo-modal\nlogin-modal\nshopping-cart\npreview-drawer"
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "ConstruieČ™te un obiect cu 3 scenarii de intercepting routes Č™i afiČ™eazÄ numÄrul de scenarii cu console.log.",
        answer: "const scenarios = { 'photo-gallery': 'modal pe click foto', 'login-flow': 'modal login fara redirect', 'cart-preview': 'drawer cos de cumparaturi' };\nconsole.log(Object.keys(scenarios).length);",
        starterCode: "", language: "javascript",
        expectedOutput: "3"
      }
    ]
  },
  {
    lessonId: "69fb258da7657a7d121f0513",
    name: "14. Error Boundaries Ă®n detaliu",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ fiČ™ierul pentru error boundary la nivel de rutÄ:\n```\napp/dashboard/___\n```",
        answer: "error.js", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ fiČ™ierul pentru error boundary global:\n```\napp/global-___.js\n```",
        answer: "error", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ prop-ul funcČ›iei error.js pentru a reĂ®ncerca operaČ›iunea:\n```js\nexport default function Error({ error, ___ }) {}\n```",
        answer: "reset", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ directiva necesarÄ pentru error.js (Client Component):\n```js\n'use ___'\n```",
        answer: "client", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ proprietatea erorii care conČ›ine mesajul:\n```js\nconsole.log(error.___)\n```",
        answer: "message", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "CreeazÄ un array cu tipurile de erori pe care le poate prinde error.js (runtime, data-fetch, component, async) Č™i afiČ™eazÄ cĂ˘te sunt cu console.log.",
        answer: "const types = ['runtime','data-fetch','component','async'];\nconsole.log(types.length);",
        starterCode: "", language: "javascript",
        expectedOutput: "4"
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "SimuleazÄ Error boundary: ai un array de componente cu status de eroare. AfiČ™eazÄ cĂ˘te au erori cu console.log.\n```js\nconst components = [{name:'Header',error:null},{name:'Feed',error:'Network error'},{name:'Sidebar',error:null},{name:'Footer',error:'Timeout'}];\n```",
        answer: "const components = [{name:'Header',error:null},{name:'Feed',error:'Network error'},{name:'Sidebar',error:null},{name:'Footer',error:'Timeout'}];\nconsole.log(components.filter(c => c.error !== null).length);",
        starterCode: "", language: "javascript",
        expectedOutput: "2"
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "ConstruieČ™te Č™i afiČ™eazÄ cu console.log mesajul de eroare formatat pentru user (Error: [message] | Try: [action]).",
        answer: "const err = { message: 'Failed to fetch data', action: 'Refresh page' };\nconsole.log(`Error: ${err.message} | Try: ${err.action}`);",
        starterCode: "", language: "javascript",
        expectedOutput: "Error: Failed to fetch data | Try: Refresh page"
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "AfiČ™eazÄ cu console.log ierarhia error boundaries Ă®n Next.js de la cel mai specific la global, cĂ˘te una pe linie.",
        answer: "['error.js (route level)','global-error.js (app level)'].forEach(e => console.log(e));",
        starterCode: "", language: "javascript",
        expectedOutput: "error.js (route level)\nglobal-error.js (app level)"
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "ConstruieČ™te un obiect cu diferenČ›ele dintre error.js Č™i global-error.js Č™i afiČ™eazÄ cheile cu console.log, cĂ˘te una pe linie.",
        answer: "const diff = { scope: 'route vs app', wraps: 'layout excluded vs layout included', usage: 'specific vs global fallback' };\nObject.keys(diff).forEach(k => console.log(k));",
        starterCode: "", language: "javascript",
        expectedOutput: "scope\nwraps\nusage"
      }
    ]
  },
  {
    lessonId: "69fb258fa7657a7d121f051f",
    name: "15. Performance & OptimizÄri",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ importul componentei de imagine optimizatÄ Next.js:\n```js\nimport ___ from 'next/image'\n```",
        answer: "Image", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ prop-ul pentru imaginile vizibile imediat (nu lazy):\n```jsx\n<Image src=\"...\" alt=\"...\" ___={true}/>\n```",
        answer: "priority", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ importul pentru font-uri optimizate Next.js:\n```js\nimport { Inter } from 'next/___'\n```",
        answer: "font", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ prop-ul Link pentru dezactivarea prefetch-ului automat:\n```jsx\n<Link href=\"/about\" ___={false}>\n```",
        answer: "prefetch", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ funcČ›ia pentru import dinamic (lazy loading componente):\n```js\nconst Modal = ___(()=> import('./Modal'))\n```",
        answer: "dynamic", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "CreeazÄ un array cu optimizÄrile built-in Next.js (image-optimization, font-optimization, prefetching, code-splitting, server-components) Č™i afiČ™eazÄ cĂ˘te sunt cu console.log.",
        answer: "const opts = ['image-optimization','font-optimization','prefetching','code-splitting','server-components'];\nconsole.log(opts.length);",
        starterCode: "", language: "javascript",
        expectedOutput: "5"
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Ai un array de imagini cu proprietatea priority. AfiČ™eazÄ cĂ˘te imagini au priority=true cu console.log.\n```js\nconst imgs = [{src:'hero.jpg',priority:true},{src:'thumb1.jpg',priority:false},{src:'banner.jpg',priority:true},{src:'thumb2.jpg',priority:false}];\n```",
        answer: "const imgs = [{src:'hero.jpg',priority:true},{src:'thumb1.jpg',priority:false},{src:'banner.jpg',priority:true},{src:'thumb2.jpg',priority:false}];\nconsole.log(imgs.filter(i => i.priority).length);",
        starterCode: "", language: "javascript",
        expectedOutput: "2"
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "ConstruieČ™te Č™i afiČ™eazÄ cu console.log formatul srcset pentru o imagine cu lÄČ›imile 640, 750, 1080, 1200 (format: '640w 750w 1080w 1200w').",
        answer: "const widths = [640, 750, 1080, 1200];\nconsole.log(widths.map(w => w + 'w').join(' '));",
        starterCode: "", language: "javascript",
        expectedOutput: "640w 750w 1080w 1200w"
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "AfiČ™eazÄ cu console.log formatele de imagine suportate de next/image pentru optimizare automatÄ (webp, avif, jpeg, png), cĂ˘te unul pe linie.",
        answer: "['webp','avif','jpeg','png'].forEach(f => console.log(f));",
        starterCode: "", language: "javascript",
        expectedOutput: "webp\navif\njpeg\npng"
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "ConstruieČ™te un obiect cu metricile Core Web Vitals Č™i valorile bune, Č™i afiČ™eazÄ cu console.log Ă®n format 'metric: value', cĂ˘te una pe linie.",
        answer: "const cwv = { LCP: '<2.5s', FID: '<100ms', CLS: '<0.1' };\nObject.entries(cwv).forEach(([k,v]) => console.log(`${k}: ${v}`));",
        starterCode: "", language: "javascript",
        expectedOutput: "LCP: <2.5s\nFID: <100ms\nCLS: <0.1"
      }
    ]
  },
  {
    lessonId: "6a021ac9f0ec7fc9c03a64b5",
    name: "16. Advanced Data Fetching Patterns",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ funcČ›ia pentru fetch-uri Ă®n paralel:\n```js\nconst [a, b] = await Promise.___([fetchA(), fetchB()])\n```",
        answer: "all", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ directiva pentru un Server Component:\n```js\n// fara directiva sau 'use ___'\n```",
        answer: "server", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ funcČ›ia Next.js care invalideazÄ cache-ul dupÄ o mutaČ›ie:\n```js\nrevalidate___('/dashboard')\n```",
        answer: "Path", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ opČ›iunea fetch pentru cache static:\n```js\nfetch(url, { cache: '___' })\n```",
        answer: "force-cache", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ opČ›iunea fetch pentru a dezactiva cache-ul:\n```js\nfetch(url, { cache: '___' })\n```",
        answer: "no-store", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "SimuleazÄ fetch paralel: ai un array de 4 URL-uri. CalculeazÄ cĂ˘te ar rula Ă®n paralel cu Promise.all vs secvenČ›ial Č™i afiČ™eazÄ diferenČ›a (timp economisit ca numÄr de paČ™i).",
        answer: "const urls = ['/api/user', '/api/posts', '/api/comments', '/api/stats'];\nconst sequential = urls.length;\nconst parallel = 1;\nconsole.log(sequential - parallel);",
        starterCode: "", language: "javascript",
        expectedOutput: "3"
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Ai un array de resurse cu tipul de cache. FiltreazÄ resursele cu cache 'force-cache' Č™i afiČ™eazÄ cĂ˘te sunt cu console.log.\n```js\nconst resources = [{url:'/api/config',cache:'force-cache'},{url:'/api/user',cache:'no-store'},{url:'/api/products',cache:'force-cache'},{url:'/api/cart',cache:'no-store'}];\n```",
        answer: "const resources = [{url:'/api/config',cache:'force-cache'},{url:'/api/user',cache:'no-store'},{url:'/api/products',cache:'force-cache'},{url:'/api/cart',cache:'no-store'}];\nconsole.log(resources.filter(r => r.cache === 'force-cache').length);",
        starterCode: "", language: "javascript",
        expectedOutput: "2"
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "ConstruieČ™te Č™i afiČ™eazÄ cu console.log opČ›iunea fetch pentru ISR cu revalidare la 60 secunde.",
        answer: "const opts = { next: { revalidate: 60 } };\nconsole.log(JSON.stringify(opts));",
        starterCode: "", language: "javascript",
        expectedOutput: "{\"next\":{\"revalidate\":60}}"
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "AfiČ™eazÄ cu console.log strategiile de cache fetch Ă®n Next.js (force-cache, no-store, no-cache) cu descrierile lor.",
        answer: "[['force-cache','static'],['no-store','dynamic, no cache'],['no-cache','dynamic, revalidate']].forEach(([k,v]) => console.log(`${k}: ${v}`));",
        starterCode: "", language: "javascript",
        expectedOutput: "force-cache: static\nno-store: dynamic, no cache\nno-cache: dynamic, revalidate"
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "ConstruieČ™te un obiect cu 3 pattern-uri de data fetching Č™i afiČ™eazÄ numÄrul cu console.log.",
        answer: "const patterns = { parallel: 'Promise.all([fetchA(),fetchB()])', waterfall: 'const a=await fetchA(); const b=await fetchB(a.id)', deduplicated: 'React cache(fetchUser)' };\nconsole.log(Object.keys(patterns).length);",
        starterCode: "", language: "javascript",
        expectedOutput: "3"
      }
    ]
  },
  {
    lessonId: "6a021acaf0ec7fc9c03a64bc",
    name: "17. Client Components and State Management",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ directiva pentru a marca o componentÄ ca Client Component:\n```js\n'use ___'\n```",
        answer: "client", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ hook-ul React pentru state local:\n```js\nconst [count, setCount] = ___(0)\n```",
        answer: "useState", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ pachetul pentru state management global uČ™or:\n```js\nimport { create } from '___'\n```",
        answer: "zustand", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ funcČ›ia Zustand pentru a crea un store:\n```js\nconst useStore = ___(set => ({ count: 0 }))\n```",
        answer: "create", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ hook-ul React pentru efecte laterale:\n```js\n___(()=> { fetchData() }, [])\n```",
        answer: "useEffect", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "CreeazÄ un array cu hook-urile React comune Ă®n Client Components (useState, useEffect, useCallback, useMemo, useRef) Č™i afiČ™eazÄ cĂ˘te sunt cu console.log.",
        answer: "const hooks = ['useState','useEffect','useCallback','useMemo','useRef'];\nconsole.log(hooks.length);",
        starterCode: "", language: "javascript",
        expectedOutput: "5"
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "SimuleazÄ un reducer: ai starea iniČ›ialÄ cu count=0. AplicÄ 3 acČ›iuni INCREMENT Č™i afiČ™eazÄ starea finalÄ cu console.log.\n```js\nlet state = { count: 0 };\nconst actions = ['INCREMENT','INCREMENT','INCREMENT'];\n```",
        answer: "let state = { count: 0 };\nconst actions = ['INCREMENT','INCREMENT','INCREMENT'];\nactions.forEach(a => { if (a === 'INCREMENT') state.count++; });\nconsole.log(state.count);",
        starterCode: "", language: "javascript",
        expectedOutput: "3"
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "ConstruieČ™te Č™i afiČ™eazÄ cu console.log diferenČ›a Ă®ntre Server Components Č™i Client Components (rendering, access, size).",
        answer: "[['rendering','server'],['js-bundle','no'],['hooks','no'],['browser-apis','no']].forEach(([f,sc]) => console.log(`SC.${f}: ${sc}`));",
        starterCode: "", language: "javascript",
        expectedOutput: "SC.rendering: server\nSC.js-bundle: no\nSC.hooks: no\nSC.browser-apis: no"
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "AfiČ™eazÄ cu console.log librÄriile de state management compatibile cu Next.js (zustand, jotai, redux-toolkit, recoil), cĂ˘te una pe linie.",
        answer: "['zustand','jotai','redux-toolkit','recoil'].forEach(l => console.log(l));",
        starterCode: "", language: "javascript",
        expectedOutput: "zustand\njotai\nredux-toolkit\nrecoil"
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "ConstruieČ™te un store Zustand simplu ca obiect Č™i afiČ™eazÄ numÄrul de acČ›iuni (funcČ›ii) din store cu console.log.",
        answer: "const store = { count: 0, increment: ()=>{}, decrement: ()=>{}, reset: ()=>{} };\nconst actions = Object.values(store).filter(v => typeof v === 'function');\nconsole.log(actions.length);",
        starterCode: "", language: "javascript",
        expectedOutput: "3"
      }
    ]
  },
  {
    lessonId: "6a021acbf0ec7fc9c03a64c3",
    name: "18. Forms and Server Actions",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ directiva pentru o funcČ›ie Server Action:\n```js\n'use ___'\n```",
        answer: "server", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ metoda pentru a citi date dintr-un FormData:\n```js\nconst name = formData.___('name')\n```",
        answer: "get", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ funcČ›ia Next.js pentru redirect dupÄ Server Action:\n```js\nimport { ___ } from 'next/navigation'\n___('/dashboard')\n```",
        answer: "redirect", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ prop-ul form pentru a atribui o Server Action:\n```jsx\n<form ___={submitAction}>\n```",
        answer: "action", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ hook-ul pentru starea unui form Ă®n trimitere:\n```js\nconst { pending } = ___Status()\n```",
        answer: "useForm", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "CreeazÄ un array cu cĂ˘mpurile unui form de Ă®nregistrare (name, email, password, confirmPassword) Č™i simuleazÄ extragerea din FormData. AfiČ™eazÄ cĂ˘te cĂ˘mpuri sunt cu console.log.",
        answer: "const fields = ['name', 'email', 'password', 'confirmPassword'];\nconsole.log(fields.length);",
        starterCode: "", language: "javascript",
        expectedOutput: "4"
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "SimuleazÄ validare form: ai un obiect cu datele formularului. VerificÄ dacÄ toate cĂ˘mpurile sunt completate Č™i afiČ™eazÄ true sau false cu console.log.\n```js\nconst data = { name: 'John', email: 'john@email.com', password: 'secret123' };\n```",
        answer: "const data = { name: 'John', email: 'john@email.com', password: 'secret123' };\nconsole.log(Object.values(data).every(v => v.length > 0));",
        starterCode: "", language: "javascript",
        expectedOutput: "true"
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "ConstruieČ™te Č™i afiČ™eazÄ cu console.log avantajele Server Actions faČ›Ä de API routes (no-api-endpoint, type-safe, revalidation, progressive-enhancement).",
        answer: "['no-api-endpoint','type-safe','revalidation','progressive-enhancement'].forEach(a => console.log(a));",
        starterCode: "", language: "javascript",
        expectedOutput: "no-api-endpoint\ntype-safe\nrevalidation\nprogressive-enhancement"
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "AfiČ™eazÄ cu console.log paČ™ii de procesare a unui Server Action (receive-formdata, validate, database, revalidate, redirect), cĂ˘te unul pe linie.",
        answer: "['receive-formdata','validate','database','revalidate','redirect'].forEach(s => console.log(s));",
        starterCode: "", language: "javascript",
        expectedOutput: "receive-formdata\nvalidate\ndatabase\nrevalidate\nredirect"
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "ConstruieČ™te un obiect cu 3 tipuri de acČ›iuni (create, update, delete) Č™i funcČ›iile lor de server action, Č™i afiČ™eazÄ numÄrul cu console.log.",
        answer: "const actions = { create: 'createPost', update: 'updatePost', delete: 'deletePost' };\nconsole.log(Object.keys(actions).length);",
        starterCode: "", language: "javascript",
        expectedOutput: "3"
      }
    ]
  },
  {
    lessonId: "6a021accf0ec7fc9c03a64ca",
    name: "19. Authentication with NextAuth.js",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ hook-ul pentru a accesa sesiunea Ă®n Client Component:\n```js\nconst { data: session } = ___Session()\n```",
        answer: "use", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ componenta care furnizeazÄ contextul sesiunii:\n```jsx\n<___Provider session={session}>\n  {children}\n</___Provider>\n```",
        answer: "Session", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ fiČ™ierul de configurare NextAuth Ă®n App Router:\n```\napp/api/auth/[...nextauth]/___\n```",
        answer: "route.js", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ funcČ›ia NextAuth pentru a obČ›ine sesiunea server-side:\n```js\nconst session = await get___Server()\n```",
        answer: "Server", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ provider-ul de autentificare cu Google Ă®n NextAuth:\n```js\nconst { Providers } = require('next-auth/providers/___')\n```",
        answer: "google", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "CreeazÄ un array cu provider-ii de autentificare suportaČ›i de NextAuth (credentials, google, github, facebook, twitter) Č™i afiČ™eazÄ cĂ˘te sunt cu console.log.",
        answer: "const providers = ['credentials','google','github','facebook','twitter'];\nconsole.log(providers.length);",
        starterCode: "", language: "javascript",
        expectedOutput: "5"
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "SimuleazÄ verificarea sesiunii: ai un obiect sesiune. VerificÄ dacÄ user-ul este autentificat (session.user existÄ) Č™i afiČ™eazÄ true sau false cu console.log.\n```js\nconst session = { user: { name: 'John', email: 'john@test.com' }, expires: '2025-12-31' };\n```",
        answer: "const session = { user: { name: 'John', email: 'john@test.com' }, expires: '2025-12-31' };\nconsole.log(!!session?.user);",
        starterCode: "", language: "javascript",
        expectedOutput: "true"
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "ConstruieČ™te Č™i afiČ™eazÄ cu console.log variabilele de mediu necesare pentru NextAuth (NEXTAUTH_SECRET, NEXTAUTH_URL, GOOGLE_CLIENT_ID), cĂ˘te una pe linie.",
        answer: "['NEXTAUTH_SECRET','NEXTAUTH_URL','GOOGLE_CLIENT_ID'].forEach(v => console.log(v));",
        starterCode: "", language: "javascript",
        expectedOutput: "NEXTAUTH_SECRET\nNEXTAUTH_URL\nGOOLD_CLIENT_ID"
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "AfiČ™eazÄ cu console.log callback-urile NextAuth disponibile (signIn, signOut, session, jwt), cĂ˘te unul pe linie.",
        answer: "['signIn','signOut','session','jwt'].forEach(c => console.log(c));",
        starterCode: "", language: "javascript",
        expectedOutput: "signIn\nsignOut\nsession\njwt"
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "ConstruieČ™te un obiect cu configuraČ›ia minimÄ NextAuth Č™i afiČ™eazÄ numÄrul de chei cu console.log.",
        answer: "const config = { providers: [], callbacks: {}, secret: 'secret', pages: { signIn: '/login' } };\nconsole.log(Object.keys(config).length);",
        starterCode: "", language: "javascript",
        expectedOutput: "4"
      }
    ]
  },
  {
    lessonId: "6a021acef0ec7fc9c03a64d1",
    name: "20. Performance Optimization",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ funcČ›ia Next.js pentru import dinamic:\n```js\nconst Modal = ___(()=> import('./Modal'))\n```",
        answer: "dynamic", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ importul funcČ›iei dynamic:\n```js\nimport ___ from 'next/dynamic'\n```",
        answer: "dynamic", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ opČ›iunea pentru a dezactiva SSR la un import dinamic:\n```js\ndynamic(()=>import('./Chart'), { ___: false })\n```",
        answer: "ssr", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ hook-ul React pentru memorarea unui calcul costisitor:\n```js\nconst result = ___(()=> heavyCalc(data), [data])\n```",
        answer: "useMemo", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ hook-ul React pentru memorarea unui callback:\n```js\nconst handler = ___(()=> doSomething(), [])\n```",
        answer: "useCallback", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "CreeazÄ un array cu tehnicile de performance Ă®n Next.js (dynamic-imports, image-opt, font-opt, code-splitting, server-components, caching) Č™i afiČ™eazÄ cĂ˘te sunt cu console.log.",
        answer: "const techs = ['dynamic-imports','image-opt','font-opt','code-splitting','server-components','caching'];\nconsole.log(techs.length);",
        starterCode: "", language: "javascript",
        expectedOutput: "6"
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "SimuleazÄ bundle splitting: ai un array de componente cu dimensiunea Ă®n KB. CalculeazÄ dimensiunea totalÄ Č™i afiČ™eaz-o cu console.log.\n```js\nconst components = [{name:'Home',size:12},{name:'Dashboard',size:45},{name:'Charts',size:98},{name:'Table',size:23}];\n```",
        answer: "const components = [{name:'Home',size:12},{name:'Dashboard',size:45},{name:'Charts',size:98},{name:'Table',size:23}];\nconsole.log(components.reduce((a,c) => a + c.size, 0));",
        starterCode: "", language: "javascript",
        expectedOutput: "178"
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "ConstruieČ™te Č™i afiČ™eazÄ cu console.log componentele care ar trebui lazy-loaded (au size > 30KB).\n```js\nconst comps = [{name:'Header',size:8},{name:'Charts',size:95},{name:'RichEditor',size:150},{name:'Footer',size:5}];\n```",
        answer: "const comps = [{name:'Header',size:8},{name:'Charts',size:95},{name:'RichEditor',size:150},{name:'Footer',size:5}];\ncomps.filter(c => c.size > 30).forEach(c => console.log(c.name));",
        starterCode: "", language: "javascript",
        expectedOutput: "Charts\nRichEditor"
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "AfiČ™eazÄ cu console.log metricile de performance care se Ă®mbunÄtÄČ›esc cu Server Components (bundle-size, ttfb, fcp, lcp), cĂ˘te una pe linie.",
        answer: "['bundle-size','ttfb','fcp','lcp'].forEach(m => console.log(m));",
        starterCode: "", language: "javascript",
        expectedOutput: "bundle-size\nttfb\nfcp\nlcp"
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "ConstruieČ™te un obiect cu strategiile de optimizare Č™i impactul lor, Č™i afiČ™eazÄ numÄrul de strategii cu console.log.",
        answer: "const strategies = { 'server-components': 'reduces bundle', 'dynamic-imports': 'code splitting', 'image-optimization': 'smaller images', 'font-optimization': 'eliminates FOUT', 'caching': 'faster responses' };\nconsole.log(Object.keys(strategies).length);",
        starterCode: "", language: "javascript",
        expectedOutput: "5"
      }
    ]
  },
  {
    lessonId: "6a021acff0ec7fc9c03a64d8",
    name: "21. Internationalization (i18n)",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ pachetul recomandat pentru i18n Ă®n Next.js:\n```js\nimport { useTranslations } from '___'\n```",
        answer: "next-intl", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ structura de folder pentru locale Ă®n App Router:\n```\napp/[___]/page.js\n```",
        answer: "locale", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ hook-ul next-intl pentru traduceri:\n```js\nconst t = ___('HomePage')\n```",
        answer: "useTranslations", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ extensia fiČ™ierelor de traducere (messages):\n```\nmessages/en.___\n```",
        answer: "json", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ middleware-ul necesar pentru locale routing:\n```js\nexport { default } from '___/middleware'\n```",
        answer: "next-intl", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "CreeazÄ un array cu locale-urile suportate Č™i construieČ™te URL-urile pentru pagina '/about'. AfiČ™eazÄ cu console.log, cĂ˘te una pe linie.",
        answer: "const locales = ['en', 'ro', 'fr', 'de'];\nlocales.forEach(l => console.log(`/${l}/about`));",
        starterCode: "", language: "javascript",
        expectedOutput: "/en/about\n/ro/about\n/fr/about\n/de/about"
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "SimuleazÄ funcČ›ia t() de traducere: ai un obiect de mesaje. AfiČ™eazÄ traducerea cheii 'welcome' cu console.log.\n```js\nconst messages = { welcome: 'Bun venit!', home: 'AcasÄ', login: 'Autentificare' };\nconst t = key => messages[key] || key;\n```",
        answer: "const messages = { welcome: 'Bun venit!', home: 'AcasÄ', login: 'Autentificare' };\nconst t = key => messages[key] || key;\nconsole.log(t('welcome'));",
        starterCode: "", language: "javascript",
        expectedOutput: "Bun venit!"
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "ConstruieČ™te Č™i afiČ™eazÄ cu console.log fiČ™ierele de mesaje pentru 3 locale (en.json, ro.json, fr.json), cĂ˘te unul pe linie.",
        answer: "['en','ro','fr'].forEach(l => console.log(`messages/${l}.json`));",
        starterCode: "", language: "javascript",
        expectedOutput: "messages/en.json\nmessages/ro.json\nmessages/fr.json"
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "AfiČ™eazÄ cu console.log formatele de datÄ pentru locale 'ro-RO' (zi, lunÄ, an, orÄ), simulat ca string-uri.",
        answer: "['ziua: DD','luna: MM','anul: YYYY','ora: HH:mm'].forEach(f => console.log(f));",
        starterCode: "", language: "javascript",
        expectedOutput: "ziua: DD\nluna: MM\nanul: YYYY\nora: HH:mm"
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "ConstruieČ™te un obiect cu configuraČ›ia next-intl Č™i afiČ™eazÄ numÄrul de chei cu console.log.",
        answer: "const config = { locales: ['en','ro','fr'], defaultLocale: 'en', localePrefix: 'always' };\nconsole.log(Object.keys(config).length);",
        starterCode: "", language: "javascript",
        expectedOutput: "3"
      }
    ]
  },
  {
    lessonId: "6a021acff0ec7fc9c03a64dd",
    name: "22. Testing Next.js Applications",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ framework-ul de testare recomandat pentru Next.js:\n```js\nimport { render } from '@testing-library/___'\n```",
        answer: "react", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ funcČ›ia de test din Jest/Vitest:\n```js\n___(\"renders correctly\", ()=> { expect(true).toBe(true) })\n```",
        answer: "it", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ grupul de teste din Jest/Vitest:\n```js\n___(\"Button\", ()=> { it(\"renders\", ()=>{}) })\n```",
        answer: "describe", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ librÄria pentru mock-uri HTTP Ă®n teste:\n```js\nimport { setupServer } from '___/node'\n```",
        answer: "msw", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ funcČ›ia de test care verificÄ egalitatea:\n```js\nexpect(result).___(42)\n```",
        answer: "toBe", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "CreeazÄ un array cu tipurile de teste pentru o aplicaČ›ie Next.js (unit, integration, e2e, snapshot, api) Č™i afiČ™eazÄ cĂ˘te sunt cu console.log.",
        answer: "const types = ['unit','integration','e2e','snapshot','api'];\nconsole.log(types.length);",
        starterCode: "", language: "javascript",
        expectedOutput: "5"
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "SimuleazÄ o suitÄ de teste: ai un array de teste cu rezultatele lor. AfiČ™eazÄ cĂ˘te au trecut (passed=true) cu console.log.\n```js\nconst tests = [{name:'renders',passed:true},{name:'handles click',passed:true},{name:'api call',passed:false},{name:'navigation',passed:true}];\n```",
        answer: "const tests = [{name:'renders',passed:true},{name:'handles click',passed:true},{name:'api call',passed:false},{name:'navigation',passed:true}];\nconsole.log(tests.filter(t => t.passed).length);",
        starterCode: "", language: "javascript",
        expectedOutput: "3"
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "ConstruieČ™te Č™i afiČ™eazÄ cu console.log pachetele necesare pentru testare Next.js (jest, @testing-library/react, @testing-library/jest-dom, msw), cĂ˘te unul pe linie.",
        answer: "['jest','@testing-library/react','@testing-library/jest-dom','msw'].forEach(p => console.log(p));",
        starterCode: "", language: "javascript",
        expectedOutput: "jest\n@testing-library/react\n@testing-library/jest-dom\nmsw"
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "AfiČ™eazÄ cu console.log matchers comuni din jest-dom (toBeInTheDocument, toHaveClass, toHaveValue, toBeDisabled), cĂ˘te unul pe linie.",
        answer: "['toBeInTheDocument','toHaveClass','toHaveValue','toBeDisabled'].forEach(m => console.log(m));",
        starterCode: "", language: "javascript",
        expectedOutput: "toBeInTheDocument\ntoHaveClass\ntoHaveValue\ntoBeDisabled"
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "ConstruieČ™te un obiect cu instrumentele de testare Č™i rolul lor, Č™i afiČ™eazÄ numÄrul de instrumente cu console.log.",
        answer: "const tools = { jest: 'test runner', vitest: 'fast test runner', rtl: 'component testing', msw: 'api mocking', playwright: 'e2e testing' };\nconsole.log(Object.keys(tools).length);",
        starterCode: "", language: "javascript",
        expectedOutput: "5"
      }
    ]
  },
  {
    lessonId: "6a021ad0f0ec7fc9c03a64e2",
    name: "23. Deployment and CI/CD",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ comanda Vercel CLI pentru deploy:\n```\nvercel ___\n```",
        answer: "deploy", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ prefixul pentru variabile publice Next.js (accesibile pe client):\n```\n___PUBLIC_API_URL=https://api.example.com\n```",
        answer: "NEXT_", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ fiČ™ierul de variabile de mediu locale Next.js:\n```\n.___.local\n```",
        answer: "env", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ comanda pentru deploy Ă®n producČ›ie Vercel:\n```\nvercel --___\n```",
        answer: "prod", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ fiČ™ierul de workflow GitHub Actions:\n```\n.github/___/deploy.yml\n```",
        answer: "workflows", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "CreeazÄ un array cu mediile de deploy Vercel (development, preview, production) Č™i afiČ™eazÄ-le cu console.log, cĂ˘te unul pe linie.",
        answer: "['development','preview','production'].forEach(e => console.log(e));",
        starterCode: "", language: "javascript",
        expectedOutput: "development\npreview\nproduction"
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Ai un array de variabile de mediu. FiltreazÄ-le pe cele publice (care Ă®ncep cu NEXT_PUBLIC_) Č™i afiČ™eazÄ cĂ˘te sunt cu console.log.\n```js\nconst vars = ['DATABASE_URL','NEXT_PUBLIC_API_URL','NEXTAUTH_SECRET','NEXT_PUBLIC_SITE_URL','JWT_SECRET','NEXT_PUBLIC_GA_ID'];\n```",
        answer: "const vars = ['DATABASE_URL','NEXT_PUBLIC_API_URL','NEXTAUTH_SECRET','NEXT_PUBLIC_SITE_URL','JWT_SECRET','NEXT_PUBLIC_GA_ID'];\nconsole.log(vars.filter(v => v.startsWith('NEXT_PUBLIC_')).length);",
        starterCode: "", language: "javascript",
        expectedOutput: "3"
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "ConstruieČ™te Č™i afiČ™eazÄ cu console.log paČ™ii unui pipeline CI/CD (install, lint, test, build, deploy), cĂ˘te unul pe linie.",
        answer: "['install','lint','test','build','deploy'].forEach(s => console.log(s));",
        starterCode: "", language: "javascript",
        expectedOutput: "install\nlint\ntest\nbuild\ndeploy"
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "AfiČ™eazÄ cu console.log platformele de hosting compatibile cu Next.js (vercel, netlify, aws, docker, railway), cĂ˘te una pe linie.",
        answer: "['vercel','netlify','aws','docker','railway'].forEach(p => console.log(p));",
        starterCode: "", language: "javascript",
        expectedOutput: "vercel\nnetlify\naws\ndocker\nrailway"
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "ConstruieČ™te un obiect cu mediile Č™i URL-urile lor de deploy Č™i afiČ™eazÄ cu console.log Ă®n format 'env: url', cĂ˘te unul pe linie.",
        answer: "const envs = { development: 'localhost:3000', preview: 'preview.vercel.app', production: 'myapp.com' };\nObject.entries(envs).forEach(([e,u]) => console.log(`${e}: ${u}`));",
        starterCode: "", language: "javascript",
        expectedOutput: "development: localhost:3000\npreview: preview.vercel.app\nproduction: myapp.com"
      }
    ]
  },
  {
    lessonId: "6a021ad1f0ec7fc9c03a64e8",
    name: "24. Next.js Frontend Project: E-Commerce Store",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ directorul pentru pagina de produs dinamic:\n```\napp/products/[___]/page.js\n```",
        answer: "id", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ hook-ul Zustand pentru state-ul coČ™ului de cumpÄrÄturi:\n```js\nconst cart = ___Store(state => state.items)\n```",
        answer: "use", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ funcČ›ia pentru calcularea totalului coČ™ului:\n```js\nconst total = items.___(0, (sum, item) => sum + item.price * item.qty)\n```",
        answer: "reduce", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ metoda HTTP pentru plasarea comenzii:\n```js\nconst res = await fetch('/api/orders', { method: '___' })\n```",
        answer: "POST", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ funcČ›ia Next.js pentru invalidarea cache-ului dupÄ o comandÄ:\n```js\nrevalidate___('/orders')\n```",
        answer: "Path", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "SimuleazÄ un coČ™ de cumpÄrÄturi: calculeazÄ totalul Č™i afiČ™eazÄ-l cu console.log.\n```js\nconst cart = [{name:'Laptop',price:1200,qty:1},{name:'Mouse',price:25,qty:2},{name:'Keyboard',price:80,qty:1}];\n```",
        answer: "const cart = [{name:'Laptop',price:1200,qty:1},{name:'Mouse',price:25,qty:2},{name:'Keyboard',price:80,qty:1}];\nconsole.log(cart.reduce((sum,item) => sum + item.price * item.qty, 0));",
        starterCode: "", language: "javascript",
        expectedOutput: "1330"
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Ai un array de produse. FiltreazÄ produsele disponibile (stock > 0) Č™i afiČ™eazÄ cĂ˘te sunt cu console.log.\n```js\nconst products = [{name:'A',stock:5},{name:'B',stock:0},{name:'C',stock:12},{name:'D',stock:0},{name:'E',stock:3}];\n```",
        answer: "const products = [{name:'A',stock:5},{name:'B',stock:0},{name:'C',stock:12},{name:'D',stock:0},{name:'E',stock:3}];\nconsole.log(products.filter(p => p.stock > 0).length);",
        starterCode: "", language: "javascript",
        expectedOutput: "3"
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "ConstruieČ™te Č™i afiČ™eazÄ cu console.log rutele principale ale unui e-commerce Next.js (/, /products, /products/[id], /cart, /checkout, /orders), cĂ˘te una pe linie.",
        answer: "['/','/ products','/products/[id]','/cart','/checkout','/orders'].forEach(r => console.log(r));",
        starterCode: "", language: "javascript",
        expectedOutput: "/\n/ products\n/products/[id]\n/cart\n/checkout\n/orders"
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "SorteazÄ produsele dupÄ preČ› crescÄtor Č™i afiČ™eazÄ cu console.log numele fiecÄruia Ă®n ordine.\n```js\nconst items = [{name:'Scaun',price:150},{name:'Birou',price:450},{name:'Lampa',price:75},{name:'Monitor',price:380}];\n```",
        answer: "const items = [{name:'Scaun',price:150},{name:'Birou',price:450},{name:'Lampa',price:75},{name:'Monitor',price:380}];\nitems.sort((a,b) => a.price - b.price).forEach(i => console.log(i.name));",
        starterCode: "", language: "javascript",
        expectedOutput: "Lampa\nScaun\nMonitor\nBirou"
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "ConstruieČ™te un obiect cu paginile e-commerce Č™i Server/Client Component-ul corespunzÄtor, Č™i afiČ™eazÄ numÄrul cu console.log.",
        answer: "const pages = { 'product-list': 'Server', 'product-detail': 'Server', 'cart': 'Client', 'checkout': 'Client', 'order-confirmation': 'Server' };\nconsole.log(Object.keys(pages).length);",
        starterCode: "", language: "javascript",
        expectedOutput: "5"
      }
    ]
  },
  {
    lessonId: "6a021ad2f0ec7fc9c03a64ef",
    name: "25. Next.js Frontend Mastery Recap",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ conceptul central al App Router â€” modelul de gĂ˘ndire pentru rendering:\n```\n___ Components vs Client Components\n```",
        answer: "Server", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ strategia de rendering combinatÄ Ă®n Next.js:\n```\nPartial ___ Rendering\n```",
        answer: "Pre", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ abrevierea pentru Incremental Static Regeneration:\n```\n___\n```",
        answer: "ISR", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ fiČ™ierul de intrare al aplicaČ›iei Next.js (App Router):\n```\napp/___.js\n```",
        answer: "layout", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ directiva pentru funcČ›iile executate pe server:\n```js\n'use ___'\n```",
        answer: "server", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "CreeazÄ un array cu toate conceptele principale Next.js App Router (file-routing, server-components, streaming, server-actions, parallel-routes, intercepting-routes) Č™i afiČ™eazÄ cĂ˘te sunt cu console.log.",
        answer: "const concepts = ['file-routing','server-components','streaming','server-actions','parallel-routes','intercepting-routes'];\nconsole.log(concepts.length);",
        starterCode: "", language: "javascript",
        expectedOutput: "6"
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Ai un array de strategii de rendering. MapeazÄ fiecare la tipul ei (static/dynamic) Č™i afiČ™eazÄ cu console.log Ă®n format 'strategy: type'.\n```js\nconst strategies = [{name:'SSG',type:'static'},{name:'SSR',type:'dynamic'},{name:'ISR',type:'static'},{name:'CSR',type:'dynamic'}];\n```",
        answer: "const strategies = [{name:'SSG',type:'static'},{name:'SSR',type:'dynamic'},{name:'ISR',type:'static'},{name:'CSR',type:'dynamic'}];\nstrategies.forEach(s => console.log(`${s.name}: ${s.type}`));",
        starterCode: "", language: "javascript",
        expectedOutput: "SSG: static\nSSR: dynamic\nISR: static\nCSR: dynamic"
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "ConstruieČ™te Č™i afiČ™eazÄ cu console.log un cheat sheet cu fiČ™ierele speciale Next.js Č™i scopul lor, cĂ˘te unul pe linie.",
        answer: "[['page.js','UI pagina'],['layout.js','UI comun'],['loading.js','UI loading'],['error.js','UI eroare'],['not-found.js','UI 404']].forEach(([f,d]) => console.log(`${f}: ${d}`));",
        starterCode: "", language: "javascript",
        expectedOutput: "page.js: UI pagina\nlayout.js: UI comun\nloading.js: UI loading\nerror.js: UI eroare\nnot-found.js: UI 404"
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "AfiČ™eazÄ cu console.log diferenČ›a cheie Ă®ntre 'use client' Č™i 'use server': unde se executÄ fiecare.",
        answer: "console.log('use client: browser');\nconsole.log('use server: Node.js server');",
        starterCode: "", language: "javascript",
        expectedOutput: "use client: browser\nuse server: Node.js server"
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "ConstruieČ™te un obiect cu toČ›i hook-urile Next.js de navigare Č™i afiČ™eazÄ numÄrul lor cu console.log.",
        answer: "const navHooks = { useRouter: 'navigate programmatically', usePathname: 'current path', useParams: 'dynamic params', useSearchParams: 'query params' };\nconsole.log(Object.keys(navHooks).length);",
        starterCode: "", language: "javascript",
        expectedOutput: "4"
      }
    ]
  },
  {
    lessonId: "6a08cdfe999573855635c3c7",
    name: "26. React Server Components Avansate",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ directiva care lipseČ™te din Server Components (implicit):\n```js\n// nu ai nevoie de 'use ___'\n```",
        answer: "server", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ proprietatea specialÄ pentru a trece Server Components ca prop:\n```jsx\n<Layout ___={<ServerSidebar/>}>\n```",
        answer: "sidebar", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ funcČ›ia React pentru caching Server Component:\n```js\nimport { ___ } from 'react'\nconst getUser = cache(async (id)=> db.find(id))\n```",
        answer: "cache", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ pattern-ul de compoziČ›ie Ă®n RSC (Server wrapping Client):\n```jsx\n<ClientWrapper>\n  <___ Component/>\n</ClientWrapper>\n```",
        answer: "Server", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ motivul pentru care Server Components nu pot folosi useState:\n```\nServer Components nu au acces la ___ browser\n```",
        answer: "API", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "CreeazÄ un array cu restricČ›iile Server Components (no-useState, no-useEffect, no-browser-api, no-event-handlers, no-context) Č™i afiČ™eazÄ cĂ˘te sunt cu console.log.",
        answer: "const restrictions = ['no-useState','no-useEffect','no-browser-api','no-event-handlers','no-context'];\nconsole.log(restrictions.length);",
        starterCode: "", language: "javascript",
        expectedOutput: "5"
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Ai un array de componente cu tipul lor. FiltreazÄ Server Components Č™i afiČ™eazÄ cĂ˘te sunt cu console.log.\n```js\nconst comps = [{name:'Header',type:'server'},{name:'Counter',type:'client'},{name:'Footer',type:'server'},{name:'Modal',type:'client'},{name:'ProductList',type:'server'}];\n```",
        answer: "const comps = [{name:'Header',type:'server'},{name:'Counter',type:'client'},{name:'Footer',type:'server'},{name:'Modal',type:'client'},{name:'ProductList',type:'server'}];\nconsole.log(comps.filter(c => c.type === 'server').length);",
        starterCode: "", language: "javascript",
        expectedOutput: "3"
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "ConstruieČ™te Č™i afiČ™eazÄ cu console.log avantajele RSC faČ›Ä de CSR (no-bundle, direct-db, server-secrets, better-perf), cĂ˘te unul pe linie.",
        answer: "['no-bundle','direct-db','server-secrets','better-perf'].forEach(a => console.log(a));",
        starterCode: "", language: "javascript",
        expectedOutput: "no-bundle\ndirect-db\nserver-secrets\nbetter-perf"
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "AfiČ™eazÄ cu console.log pattern-urile de compoziČ›ie RSC (server-in-client-impossible, client-in-server-ok, server-as-children-ok), cĂ˘te unul pe linie.",
        answer: "['server-in-client-impossible','client-in-server-ok','server-as-children-ok'].forEach(p => console.log(p));",
        starterCode: "", language: "javascript",
        expectedOutput: "server-in-client-impossible\nclient-in-server-ok\nserver-as-children-ok"
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "ConstruieČ™te un obiect cu capabilitÄČ›ile exclusive ale Server Components Č™i afiČ™eazÄ numÄrul cu console.log.",
        answer: "const caps = { 'async-await': true, 'direct-db': true, 'file-system': true, 'server-env': true, 'no-js-bundle': true };\nconsole.log(Object.keys(caps).length);",
        starterCode: "", language: "javascript",
        expectedOutput: "5"
      }
    ]
  },
  {
    lessonId: "6a08ce01999573855635c3db",
    name: "27. Next.js Image Optimization Avansata",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ prop-ul next/image pentru dimensiunile responsive:\n```jsx\n<Image src=\"...\" alt=\"...\" ___=\"(max-width: 768px) 100vw, 50vw\"/>\n```",
        answer: "sizes", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ prop-ul pentru imaginile vizibile LCP:\n```jsx\n<Image src=\"...\" alt=\"...\" ___={true}/>\n```",
        answer: "priority", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ prop-ul pentru placeholder de blur:\n```jsx\n<Image src=\"...\" alt=\"...\" ___=\"blur\"/>\n```",
        answer: "placeholder", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ prop-ul pentru data URL de blur placeholder:\n```jsx\n<Image blurDataURL=\"data:image/jpeg;base64,___\"/>\n```",
        answer: "/9j/4AAQ", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ prop-ul pentru imaginile cu dimensiuni fluid (fÄrÄ width/height):\n```jsx\n<Image src=\"...\" alt=\"...\" ___={true}/>\n```",
        answer: "fill", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "CreeazÄ un array cu toate prop-urile importante ale next/image (src, alt, width, height, priority, fill, sizes, placeholder, quality) Č™i afiČ™eazÄ cĂ˘te sunt cu console.log.",
        answer: "const props = ['src','alt','width','height','priority','fill','sizes','placeholder','quality'];\nconsole.log(props.length);",
        starterCode: "", language: "javascript",
        expectedOutput: "9"
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Ai un array de imagini. FiltreazÄ imaginile hero (priority=true) Č™i afiČ™eazÄ cĂ˘te sunt cu console.log.\n```js\nconst images = [{src:'hero.jpg',priority:true},{src:'card1.jpg',priority:false},{src:'banner.jpg',priority:true},{src:'thumb.jpg',priority:false}];\n```",
        answer: "const images = [{src:'hero.jpg',priority:true},{src:'card1.jpg',priority:false},{src:'banner.jpg',priority:true},{src:'thumb.jpg',priority:false}];\nconsole.log(images.filter(i => i.priority).length);",
        starterCode: "", language: "javascript",
        expectedOutput: "2"
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "ConstruieČ™te Č™i afiČ™eazÄ cu console.log valoarea sizes pentru un layout cu imagine full-width pe mobile Č™i jumÄtate pe desktop.",
        answer: "console.log('(max-width: 768px) 100vw, 50vw');",
        starterCode: "", language: "javascript",
        expectedOutput: "(max-width: 768px) 100vw, 50vw"
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "AfiČ™eazÄ cu console.log formatele de imagine optimizate automat de next/image Ă®n ordinea preferinČ›ei (avif, webp, jpeg), cĂ˘te unul pe linie.",
        answer: "['avif','webp','jpeg'].forEach(f => console.log(f));",
        starterCode: "", language: "javascript",
        expectedOutput: "avif\nwebp\njpeg"
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "ConstruieČ™te un obiect cu configuraČ›ia next.config.js pentru imagini externe Č™i afiČ™eazÄ numÄrul de domenii permise cu console.log.",
        answer: "const config = { images: { remotePatterns: [ {hostname:'images.unsplash.com'}, {hostname:'cdn.example.com'}, {hostname:'res.cloudinary.com'} ] } };\nconsole.log(config.images.remotePatterns.length);",
        starterCode: "", language: "javascript",
        expectedOutput: "3"
      }
    ]
  },
  {
    lessonId: "6a08ce04999573855635c3ef",
    name: "28. Animatii cu Framer Motion in Next.js",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ componenta de bazÄ Framer Motion pentru animaČ›ii:\n```jsx\nimport { ___ } from 'framer-motion'\n<motion.div animate={{ opacity: 1 }}/>\n```",
        answer: "motion", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ prop-ul pentru animaČ›ia iniČ›ialÄ (starea de start):\n```jsx\n<motion.div ___={{ opacity: 0 }} animate={{ opacity: 1 }}/>\n```",
        answer: "initial", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ componenta pentru animarea mount/unmount:\n```jsx\n<___ mode=\"wait\">\n  {show && <motion.div key=\"modal\"/>}\n</___>\n```",
        answer: "AnimatePresence", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ prop-ul pentru animaČ›ie la ieČ™ire:\n```jsx\n<motion.div _____={{ opacity: 0, y: -20 }}/>\n```",
        answer: "exit", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ prop-ul pentru a folosi un obiect de variante predefinite:\n```jsx\n<motion.div ___={variants} animate=\"visible\"/>\n```",
        answer: "variants", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "CreeazÄ un array cu prop-urile Framer Motion (initial, animate, exit, transition, variants, whileHover, whileTap) Č™i afiČ™eazÄ cĂ˘te sunt cu console.log.",
        answer: "const props = ['initial','animate','exit','transition','variants','whileHover','whileTap'];\nconsole.log(props.length);",
        starterCode: "", language: "javascript",
        expectedOutput: "7"
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "SimuleazÄ o animaČ›ie de fade-in: creeazÄ obiectele initial Č™i animate Č™i verificÄ cÄ opacity trece de la 0 la 1. AfiČ™eazÄ true sau false cu console.log.",
        answer: "const initial = { opacity: 0, y: 20 };\nconst animate = { opacity: 1, y: 0 };\nconsole.log(initial.opacity === 0 && animate.opacity === 1);",
        starterCode: "", language: "javascript",
        expectedOutput: "true"
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "ConstruieČ™te Č™i afiČ™eazÄ cu console.log un obiect de variante pentru card cu stÄrile hidden Č™i visible.",
        answer: "const variants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };\nconsole.log(Object.keys(variants).join(', '));",
        starterCode: "", language: "javascript",
        expectedOutput: "hidden, visible"
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "AfiČ™eazÄ cu console.log tipurile de tranziČ›ie Framer Motion (tween, spring, inertia, keyframes), cĂ˘te unul pe linie.",
        answer: "['tween','spring','inertia','keyframes'].forEach(t => console.log(t));",
        starterCode: "", language: "javascript",
        expectedOutput: "tween\nspring\ninertia\nkeyframes"
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "ConstruieČ™te un obiect cu 3 animaČ›ii de layout Framer Motion Č™i afiČ™eazÄ numÄrul de animaČ›ii cu console.log.",
        answer: "const animations = { fadeIn: { initial:{opacity:0}, animate:{opacity:1} }, slideUp: { initial:{y:20}, animate:{y:0} }, zoom: { initial:{scale:0.8}, animate:{scale:1} } };\nconsole.log(Object.keys(animations).length);",
        starterCode: "", language: "javascript",
        expectedOutput: "3"
      }
    ]
  },
  {
    lessonId: "6a08ce07999573855635c403",
    name: "29. Next.js SEO Complet",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ funcČ›ia Next.js pentru generarea metadatelor dinamice:\n```js\nexport async function generate___() { return { title: 'Page Title' } }\n```",
        answer: "Metadata", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ cheia din obiectul metadata pentru titlu:\n```js\nexport const metadata = { ___: 'My App', description: '...' }\n```",
        answer: "title", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ cheia pentru metadatele Open Graph Ă®n Next.js:\n```js\nexport const metadata = { ___Graph: { title: 'Page', type: 'website' } }\n```",
        answer: "open", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ fiČ™ierul pentru sitemap Ă®n App Router Next.js:\n```\napp/___.js\n```",
        answer: "sitemap", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ fiČ™ierul pentru robots.txt Ă®n App Router:\n```\napp/___.js\n```",
        answer: "robots", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "CreeazÄ un array cu cĂ˘mpurile obligatorii pentru SEO de bazÄ (title, description, canonical, og:title, og:image, og:type) Č™i afiČ™eazÄ cĂ˘te sunt cu console.log.",
        answer: "const fields = ['title','description','canonical','og:title','og:image','og:type'];\nconsole.log(fields.length);",
        starterCode: "", language: "javascript",
        expectedOutput: "6"
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "SimuleazÄ generarea metadatelor dinamice: construieČ™te titlul SEO pentru produsul 'MacBook Pro' Ă®n format 'MacBook Pro | MyShop'. AfiČ™eazÄ cu console.log.",
        answer: "const product = 'MacBook Pro';\nconst site = 'MyShop';\nconsole.log(`${product} | ${site}`);",
        starterCode: "", language: "javascript",
        expectedOutput: "MacBook Pro | MyShop"
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "ConstruieČ™te Č™i afiČ™eazÄ cu console.log obiectul metadata minim pentru o pagina Next.js cu titlu Č™i descriere.",
        answer: "const metadata = { title: 'Pagina mea', description: 'Descriere pagina' };\nconsole.log(JSON.stringify(metadata));",
        starterCode: "", language: "javascript",
        expectedOutput: "{\"title\":\"Pagina mea\",\"description\":\"Descriere pagina\"}"
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "AfiČ™eazÄ cu console.log proprietÄČ›ile Open Graph necesare pentru o pagina web (title, description, url, siteName, images, type), cĂ˘te una pe linie.",
        answer: "['title','description','url','siteName','images','type'].forEach(p => console.log(p));",
        starterCode: "", language: "javascript",
        expectedOutput: "title\ndescription\nurl\nsiteName\nimages\ntype"
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "ConstruieČ™te un obiect cu fiČ™ierele SEO speciale Ă®n App Router Next.js Č™i afiČ™eazÄ numÄrul lor cu console.log.",
        answer: "const seoFiles = { sitemap: 'sitemap.js', robots: 'robots.js', icon: 'icon.png', opengraph: 'opengraph-image.jpg', manifest: 'manifest.js' };\nconsole.log(Object.keys(seoFiles).length);",
        starterCode: "", language: "javascript",
        expectedOutput: "5"
      }
    ]
  },
  {
    lessonId: "6a08ce09999573855635c417",
    name: "30. Mini Proiect FE â€” Blog cu Next.js",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ extensia fiČ™ierelor MDX pentru blog:\n```\nposts/hello-world.___\n```",
        answer: "mdx", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ strategia de revalidare ISR pentru blog (Ă®n secunde):\n```js\nexport const revalidate = ___\n```",
        answer: "3600", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ funcČ›ia pentru generarea paginilor statice de post:\n```js\nexport function generateStaticParams() {\n  return posts.map(p => ({ slug: p.___ }))\n}\n```",
        answer: "slug", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ pachetul pentru parsarea MDX Ă®n Next.js:\n```js\nimport { compileMDX } from 'next-___'\n```",
        answer: "mdx-remote", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ frontmatter-ul unui post MDX:\n```md\n---\ntitle: Hello World\n___: 2025-01-01\n---\n```",
        answer: "date", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "SimuleazÄ un index de blog: ai 5 post-uri cu slug Č™i datÄ. SorteazÄ dupÄ datÄ descrescÄtor Č™i afiČ™eazÄ slug-urile cu console.log, cĂ˘te unul pe linie.",
        answer: "const posts = [{slug:'post-e',date:'2025-01-05'},{slug:'post-b',date:'2025-01-02'},{slug:'post-d',date:'2025-01-04'},{slug:'post-a',date:'2025-01-01'},{slug:'post-c',date:'2025-01-03'}];\nposts.sort((a,b) => b.date.localeCompare(a.date)).forEach(p => console.log(p.slug));",
        starterCode: "", language: "javascript",
        expectedOutput: "post-e\npost-d\npost-c\npost-b\npost-a"
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Ai un array de post-uri cu taguri. FiltreazÄ post-urile care au tag-ul 'nextjs' Č™i afiČ™eazÄ cĂ˘te sunt cu console.log.\n```js\nconst posts = [{title:'A',tags:['nextjs','react']},{title:'B',tags:['css']},{title:'C',tags:['nextjs','typescript']},{title:'D',tags:['react']}];\n```",
        answer: "const posts = [{title:'A',tags:['nextjs','react']},{title:'B',tags:['css']},{title:'C',tags:['nextjs','typescript']},{title:'D',tags:['react']}];\nconsole.log(posts.filter(p => p.tags.includes('nextjs')).length);",
        starterCode: "", language: "javascript",
        expectedOutput: "2"
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "ConstruieČ™te Č™i afiČ™eazÄ cu console.log rutele unui blog Next.js (/, /blog, /blog/[slug], /blog/tags/[tag]), cĂ˘te una pe linie.",
        answer: "['/', '/blog', '/blog/[slug]', '/blog/tags/[tag]'].forEach(r => console.log(r));",
        starterCode: "", language: "javascript",
        expectedOutput: "/\n/blog\n/blog/[slug]\n/blog/tags/[tag]"
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Extrage toate tagurile unice dintr-un array de post-uri Č™i afiČ™eazÄ cĂ˘te taguri unice sunt cu console.log.\n```js\nconst posts = [{tags:['nextjs','react']},{tags:['nextjs','css']},{tags:['react','typescript']},{tags:['css','tailwind']}];\n```",
        answer: "const posts = [{tags:['nextjs','react']},{tags:['nextjs','css']},{tags:['react','typescript']},{tags:['css','tailwind']}];\nconst unique = [...new Set(posts.flatMap(p => p.tags))];\nconsole.log(unique.length);",
        starterCode: "", language: "javascript",
        expectedOutput: "5"
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "ConstruieČ™te un obiect cu structura unui post MDX (slug, title, date, tags, content) Č™i afiČ™eazÄ numÄrul de cĂ˘mpuri cu console.log.",
        answer: "const post = { slug: 'hello-world', title: 'Hello World', date: '2025-01-01', tags: ['nextjs'], content: '# Hello...' };\nconsole.log(Object.keys(post).length);",
        starterCode: "", language: "javascript",
        expectedOutput: "5"
      }
    ]
  },
  {
    lessonId: "6a09b1369384b94515fcf13d",
    name: "31. Next.js cu Zustand si persistenta",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ importul creator de store Zustand:\n```js\nimport { ___ } from 'zustand'\n```",
        answer: "create", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ middleware-ul Zustand pentru persistenČ›Ä Ă®n localStorage:\n```js\nimport { persist } from 'zustand/___'\n```",
        answer: "middleware", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ cheia de stocare a store-ului persistat:\n```js\npersist(storeCreator, { name: '___' })\n```",
        answer: "cart-storage", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ problema de hydration Ă®n Next.js cu Zustand (state iniČ›ial diferit server/client):\n```\n___ mismatch\n```",
        answer: "hydration", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ hook-ul pentru a detecta montarea componentei Č™i a evita hydration mismatch:\n```js\nconst [mounted, setMounted] = useState(false)\n___(()=> setMounted(true), [])\n```",
        answer: "useEffect", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "SimuleazÄ un store Zustand cu un array de iteme: adaugÄ 3 produse Č™i afiČ™eazÄ lungimea cu console.log.",
        answer: "const items = [];\nconst addItem = (item) => items.push(item);\naddItem({id:1,name:'A'});\naddItem({id:2,name:'B'});\naddItem({id:3,name:'C'});\nconsole.log(items.length);",
        starterCode: "", language: "javascript",
        expectedOutput: "3"
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "SimuleazÄ selectori Zustand: ai un store cu iteme. AfiČ™eazÄ cu console.log suma preČ›urilor folosind un selector.\n```js\nconst store = { items: [{price:10},{price:25},{price:15}] };\n```",
        answer: "const store = { items: [{price:10},{price:25},{price:15}] };\nconst total = store.items.reduce((s,i) => s+i.price, 0);\nconsole.log(total);",
        starterCode: "", language: "javascript",
        expectedOutput: "50"
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "ConstruieČ™te Č™i afiČ™eazÄ cu console.log avantajele Zustand faČ›Ä de Redux (no-boilerplate, small-size, hooks-api, no-provider), cĂ˘te unul pe linie.",
        answer: "['no-boilerplate','small-size','hooks-api','no-provider'].forEach(a => console.log(a));",
        starterCode: "", language: "javascript",
        expectedOutput: "no-boilerplate\nsmall-size\nhooks-api\nno-provider"
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "AfiČ™eazÄ cu console.log middleware-urile Zustand disponibile (devtools, persist, immer, subscribeWithSelector), cĂ˘te unul pe linie.",
        answer: "['devtools','persist','immer','subscribeWithSelector'].forEach(m => console.log(m));",
        starterCode: "", language: "javascript",
        expectedOutput: "devtools\npersist\nimmer\nsubscribeWithSelector"
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "ConstruieČ™te un store simplu ca obiect cu state Č™i acČ›iuni, Č™i afiČ™eazÄ numÄrul de acČ›iuni cu console.log.",
        answer: "const store = { count: 0, items: [], increment: ()=>{}, addItem: ()=>{}, clearItems: ()=>{} };\nconst actions = Object.values(store).filter(v => typeof v === 'function');\nconsole.log(actions.length);",
        starterCode: "", language: "javascript",
        expectedOutput: "3"
      }
    ]
  },
  {
    lessonId: "6a09b1389384b94515fcf151",
    name: "32. Internationalizare (i18n) cu next-intl",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ importul hook-ului de traduceri din next-intl:\n```js\nimport { ___ } from 'next-intl'\n```",
        answer: "useTranslations", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ folderul pentru fiČ™ierele de traduceri:\n```\n___ /ro.json\n```",
        answer: "messages", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ hook-ul pentru formatare (date, numere, relative time):\n```js\nconst format = ___Formatter()\n```",
        answer: "use", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ funcČ›ia de Server Component pentru traduceri:\n```js\nimport { getTranslations } from 'next-intl/___'\n```",
        answer: "server", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ structura URL cu locale:\n```\n/___/en/about\n```",
        answer: "app", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "CreeazÄ un obiect de traduceri pentru romĂ˘nÄ Č™i afiČ™eazÄ valoarea cheii 'hello' cu console.log.",
        answer: "const ro = { hello: 'Salut', goodbye: 'La revedere', welcome: 'Bun venit' };\nconsole.log(ro.hello);",
        starterCode: "", language: "javascript",
        expectedOutput: "Salut"
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "SimuleazÄ funcČ›ia de traducere cu placeholder: Ă®nlocuieČ™te {name} din 'Bun venit, {name}!' cu 'Cristi' Č™i afiČ™eazÄ cu console.log.",
        answer: "const template = 'Bun venit, {name}!';\nconst result = template.replace('{name}', 'Cristi');\nconsole.log(result);",
        starterCode: "", language: "javascript",
        expectedOutput: "Bun venit, Cristi!"
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "ConstruieČ™te Č™i afiČ™eazÄ cu console.log path-urile locale pentru pagina '/dashboard' pentru 3 limbi (en, ro, fr).",
        answer: "['en','ro','fr'].forEach(l => console.log(`/${l}/dashboard`));",
        starterCode: "", language: "javascript",
        expectedOutput: "/en/dashboard\n/ro/dashboard\n/fr/dashboard"
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "AfiČ™eazÄ cu console.log formatele de numÄr pentru locale 'ro-RO': Ă®ntreg, zecimal, procent, monedÄ (simulat ca string-uri).",
        answer: "['1.234.567','1.234,56','12,34%','1.234,00 RON'].forEach(f => console.log(f));",
        starterCode: "", language: "javascript",
        expectedOutput: "1.234.567\n1.234,56\n12,34%\n1.234,00 RON"
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "ConstruieČ™te un obiect cu configuraČ›ia next-intl completÄ Č™i afiČ™eazÄ numÄrul de chei cu console.log.",
        answer: "const config = { locales: ['en','ro','fr','de'], defaultLocale: 'ro', timeZone: 'Europe/Bucharest', now: new Date() };\nconsole.log(Object.keys(config).length);",
        starterCode: "", language: "javascript",
        expectedOutput: "4"
      }
    ]
  },
  {
    lessonId: "6a09b13b9384b94515fcf165",
    name: "33. Storybook cu Next.js",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ comanda pentru a iniČ›ializa Storybook Ă®n Next.js:\n```\nnpx storybook@latest ___\n```",
        answer: "init", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ extensia fiČ™ierelor de story Storybook:\n```\nButton.___\n```",
        answer: "stories.jsx", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ directorul de configurare Storybook:\n```\n.___ /main.js\n```",
        answer: "storybook", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ exportul default al unui story (metadatele componentei):\n```js\nexport ___ = { title: 'Button', component: Button }\n```",
        answer: "default", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ scriptul din package.json pentru a rula Storybook:\n```json\n\"storybook\": \"storybook ___\"\n```",
        answer: "dev", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "CreeazÄ un array cu tipurile de addon-uri Storybook (essentials, actions, controls, viewport, docs, a11y) Č™i afiČ™eazÄ cĂ˘te sunt cu console.log.",
        answer: "const addons = ['essentials','actions','controls','viewport','docs','a11y'];\nconsole.log(addons.length);",
        starterCode: "", language: "javascript",
        expectedOutput: "6"
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Ai un array de componente cu story-uri. AfiČ™eazÄ cu console.log cĂ˘te componente au mai mult de 2 story-uri.\n```js\nconst comps = [{name:'Button',stories:['Primary','Secondary','Disabled']},{name:'Input',stories:['Default','Error']},{name:'Card',stories:['Basic','WithImage','Loading']}];\n```",
        answer: "const comps = [{name:'Button',stories:['Primary','Secondary','Disabled']},{name:'Input',stories:['Default','Error']},{name:'Card',stories:['Basic','WithImage','Loading']}];\nconsole.log(comps.filter(c => c.stories.length > 2).length);",
        starterCode: "", language: "javascript",
        expectedOutput: "2"
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "ConstruieČ™te Č™i afiČ™eazÄ cu console.log numele fiČ™ierelor de story pentru componentele Button, Input, Card.",
        answer: "['Button','Input','Card'].forEach(c => console.log(`${c}.stories.jsx`));",
        starterCode: "", language: "javascript",
        expectedOutput: "Button.stories.jsx\nInput.stories.jsx\nCard.stories.jsx"
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "AfiČ™eazÄ cu console.log beneficiile Storybook (isolated-testing, visual-docs, design-system, component-catalog, accessibility), cĂ˘te unul pe linie.",
        answer: "['isolated-testing','visual-docs','design-system','component-catalog','accessibility'].forEach(b => console.log(b));",
        starterCode: "", language: "javascript",
        expectedOutput: "isolated-testing\nvisual-docs\ndesign-system\ncomponent-catalog\naccessibility"
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "ConstruieČ™te un obiect cu structura unui fiČ™ier de story Č™i afiČ™eazÄ numÄrul de proprietÄČ›i cu console.log.",
        answer: "const story = { title: 'Components/Button', component: 'Button', decorators: [], parameters: {}, argTypes: {} };\nconsole.log(Object.keys(story).length);",
        starterCode: "", language: "javascript",
        expectedOutput: "5"
      }
    ]
  },
  {
    lessonId: "6a09b13d9384b94515fcf179",
    name: "34. Next.js Testing complet",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ framework-ul de testare rapid (alternativÄ la Jest) recomandat cu Vite:\n```js\nimport { test } from '___'\n```",
        answer: "vitest", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ funcČ›ia RTL pentru randarea unui component:\n```js\nconst { getByText } = ___(<Button>Click</Button>)\n```",
        answer: "render", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ funcČ›ia RTL pentru simularea click-ului:\n```js\nfireEvent.___( button)\n```",
        answer: "click", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ matcher-ul jest-dom pentru a verifica existenČ›a elementului:\n```js\nexpect(element).toBe___Document()\n```",
        answer: "InThe", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ importul pentru mock-ul handler-ului HTTP cu MSW:\n```js\nimport { ___ } from 'msw'\n```",
        answer: "http", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "CreeazÄ un array cu tipurile de teste pentru Next.js (unit, component, integration, api, e2e) Č™i afiČ™eazÄ cĂ˘te sunt cu console.log.",
        answer: "const types = ['unit','component','integration','api','e2e'];\nconsole.log(types.length);",
        starterCode: "", language: "javascript",
        expectedOutput: "5"
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "SimuleazÄ o suitÄ de teste: ai un array cu rezultatele testelor. CalculeazÄ procentul de succes Č™i afiČ™eazÄ-l cu console.log.\n```js\nconst results = [{passed:true},{passed:true},{passed:false},{passed:true},{passed:true}];\n```",
        answer: "const results = [{passed:true},{passed:true},{passed:false},{passed:true},{passed:true}];\nconst pct = Math.round(results.filter(r=>r.passed).length / results.length * 100);\nconsole.log(pct);",
        starterCode: "", language: "javascript",
        expectedOutput: "80"
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "ConstruieČ™te Č™i afiČ™eazÄ cu console.log scripturile de test din package.json pentru un proiect Next.js (test, test:watch, test:coverage, test:e2e), cĂ˘te unul pe linie.",
        answer: "['test','test:watch','test:coverage','test:e2e'].forEach(s => console.log(s));",
        starterCode: "", language: "javascript",
        expectedOutput: "test\ntest:watch\ntest:coverage\ntest:e2e"
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "AfiČ™eazÄ cu console.log pachetele necesare pentru testare cu Vitest + RTL (vitest, @testing-library/react, @testing-library/user-event, jsdom), cĂ˘te unul pe linie.",
        answer: "['vitest','@testing-library/react','@testing-library/user-event','jsdom'].forEach(p => console.log(p));",
        starterCode: "", language: "javascript",
        expectedOutput: "vitest\n@testing-library/react\n@testing-library/user-event\njsdom"
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "ConstruieČ™te un obiect cu instrumentele de testare Next.js Č™i rolul lor, Č™i afiČ™eazÄ numÄrul cu console.log.",
        answer: "const tools = { vitest: 'unit tests', rtl: 'component tests', msw: 'api mocking', playwright: 'e2e tests' };\nconsole.log(Object.keys(tools).length);",
        starterCode: "", language: "javascript",
        expectedOutput: "4"
      }
    ]
  },
  {
    lessonId: "6a09b1409384b94515fcf18d",
    name: "35. Mini Proiect FE â€” SaaS Dashboard complet",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ layout-ul principal al dashboard-ului (sidebar + main):\n```jsx\n<div class=\"flex h-___\">\n```",
        answer: "screen", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ store-ul Zustand pentru tema dashboard-ului:\n```js\nconst useTheme = create(set => ({ theme: '___' }))\n```",
        answer: "light", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ hook-ul pentru starea sidebar-ului (deschis/Ă®nchis):\n```js\nconst [isOpen, setIsOpen] = ___(true)\n```",
        answer: "useState", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ strategia de rendering pentru date dashboard (actualizate frecvent):\n```js\nexport const dynamic = '___'\n```",
        answer: "force-dynamic", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "CompleteazÄ pachetul pentru grafice Ă®n dashboard Next.js:\n```js\nimport { LineChart } from '___'\n```",
        answer: "recharts", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "SimuleazÄ datele unui dashboard SaaS: creeazÄ un array cu 4 metrici Č™i afiČ™eazÄ suma valorilor cu console.log.\n```js\nconst metrics = [{name:'Users',value:1250},{name:'Revenue',value:48000},{name:'Orders',value:385},{name:'Tickets',value:42}];\n```",
        answer: "const metrics = [{name:'Users',value:1250},{name:'Revenue',value:48000},{name:'Orders',value:385},{name:'Tickets',value:42}];\nconsole.log(metrics.reduce((s,m) => s+m.value, 0));",
        starterCode: "", language: "javascript",
        expectedOutput: "49677"
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Ai un array de rute sidebar. FiltreazÄ rutele active (isActive=true) Č™i afiČ™eazÄ cĂ˘te sunt cu console.log.\n```js\nconst routes = [{path:'/dashboard',isActive:true},{path:'/users',isActive:false},{path:'/analytics',isActive:true},{path:'/settings',isActive:false},{path:'/billing',isActive:true}];\n```",
        answer: "const routes = [{path:'/dashboard',isActive:true},{path:'/users',isActive:false},{path:'/analytics',isActive:true},{path:'/settings',isActive:false},{path:'/billing',isActive:true}];\nconsole.log(routes.filter(r => r.isActive).length);",
        starterCode: "", language: "javascript",
        expectedOutput: "3"
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "ConstruieČ™te Č™i afiČ™eazÄ cu console.log rutele unui SaaS dashboard (/dashboard, /users, /analytics, /settings, /billing), cĂ˘te una pe linie.",
        answer: "['/dashboard','/users','/analytics','/settings','/billing'].forEach(r => console.log(r));",
        starterCode: "", language: "javascript",
        expectedOutput: "/dashboard\n/users\n/analytics\n/settings\n/billing"
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "AfiČ™eazÄ cu console.log funcČ›ionalitÄČ›ile necesare unui dashboard complet (auth, data-fetching, charts, dark-mode, responsive, state-management), cĂ˘te una pe linie.",
        answer: "['auth','data-fetching','charts','dark-mode','responsive','state-management'].forEach(f => console.log(f));",
        starterCode: "", language: "javascript",
        expectedOutput: "auth\ndata-fetching\ncharts\ndark-mode\nresponsive\nstate-management"
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "ConstruieČ™te un obiect cu stack-ul tehnic al dashboard-ului Č™i afiČ™eazÄ numÄrul de tehnologii cu console.log.",
        answer: "const stack = { framework: 'Next.js', styling: 'Tailwind', state: 'Zustand', charts: 'Recharts', auth: 'NextAuth', db: 'Prisma + MongoDB' };\nconsole.log(Object.keys(stack).length);",
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

