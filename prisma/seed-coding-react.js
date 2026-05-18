const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const tasks = [
  {
    lessonSlug: "react-introducere",
    items: [
      {
        name: "Funcție Greeting",
        question: "Creează o funcție JavaScript numită `Greeting` care primește un parametru `name` și returnează un string HTML: `<h1>Bună ziua, {name}!</h1>`. Apelează funcția cu numele tău și afișează rezultatul cu console.log().",
        starterCode: "function Greeting(name) {\n  // returnează un string HTML cu salutul\n}\n\nconsole.log(Greeting('Maria'));",
        explanation: "function Greeting(name) { return `<h1>Bună ziua, ${name}!</h1>`; } console.log(Greeting('Maria'));",
        difficulty: "easy",
      },
      {
        name: "Funcție Button cu props",
        question: "Creează o funcție `Button` care primește `label` și `color` ca parametri și returnează un string HTML: `<button style='background: {color}'>{label}</button>`. Apelează funcția cu label='Click me' și color='blue'.",
        starterCode: "function Button(label, color) {\n  // returnează un string HTML pentru buton\n}\n\nconsole.log(Button('Click me', 'blue'));",
        explanation: "function Button(label, color) { return `<button style='background: ${color}'>${label}</button>`; } console.log(Button('Click me', 'blue'));",
        difficulty: "easy",
      },
      {
        name: "Obiect props cu Header",
        question: "Creează un obiect `props` cu proprietățile `title='Bine ai venit'` și `subtitle='Aceasta este pagina principală'`. Creează o funcție `Header(props)` care afișează cu console.log() un mesaj formatat: `{title} - {subtitle}`.",
        starterCode: "const props = {\n  title: '',\n  subtitle: ''\n};\n\nfunction Header(props) {\n  // afișează title - subtitle\n}\n\nHeader(props);",
        explanation: "const props = { title: 'Bine ai venit', subtitle: 'Aceasta este pagina principală' }; function Header(p) { console.log(`${p.title} - ${p.subtitle}`); } Header(props);",
        difficulty: "easy",
      },
      {
        name: "Simulare JSX createElement",
        question: "Simulează JSX: creează o funcție `createElement(tag, content)` care returnează un string `<{tag}>{content}</{tag}>`. Folosind această funcție, creează un `div` cu textul 'Hello React' și un `p` cu textul 'First component'. Afișează ambele cu console.log().",
        starterCode: "function createElement(tag, content) {\n  // returnează string HTML\n}\n\nconsole.log(createElement('div', 'Hello React'));\nconsole.log(createElement('p', 'First component'));",
        explanation: "function createElement(tag, content) { return `<${tag}>${content}</${tag}>`; } console.log(createElement('div', 'Hello React')); console.log(createElement('p', 'First component'));",
        difficulty: "medium",
      },
    ],
  },
  {
    lessonSlug: "react-componente-props",
    items: [
      {
        name: "Funcție Card cu destructuring",
        question: "Creează o funcție `Card` care primește un obiect cu `title`, `description` și `author`. Funcția trebuie să afișeze cu console.log() un mesaj formatat: `Card: {title} de {author} — {description}`. Testează cu date la alegere.",
        starterCode: "function Card({ title, description, author }) {\n  // afișează datele formatat\n}\n\nCard({ title: 'React Basics', description: 'Introducere în React', author: 'Dan' });",
        explanation: "function Card({ title, description, author }) { console.log(`Card: ${title} de ${author} — ${description}`); } Card({ title: 'React Basics', description: 'Introducere în React', author: 'Dan' });",
        difficulty: "easy",
      },
      {
        name: "UserList cu forEach",
        question: "Creează o funcție `UserList` care primește un array de obiecte `[{name, age}]` și afișează fiecare user cu console.log() în formatul: `User: {name}, vârstă: {age}`. Testează cu un array de 3 useri.",
        starterCode: "function UserList(users) {\n  // iterează și afișează fiecare user\n}\n\nUserList([\n  { name: 'Ana', age: 25 },\n  { name: 'Bogdan', age: 30 },\n  { name: 'Carla', age: 22 }\n]);",
        explanation: "function UserList(users) { users.forEach(u => console.log(`User: ${u.name}, vârstă: ${u.age}`)); } UserList([{ name: 'Ana', age: 25 }, { name: 'Bogdan', age: 30 }, { name: 'Carla', age: 22 }]);",
        difficulty: "easy",
      },
      {
        name: "Badge cu emoji",
        question: "Creează o funcție `Badge` cu parametru `type` (poate fi 'success', 'error', 'warning'). Funcția returnează un emoji corespunzător: ✅ pentru success, ❌ pentru error, ⚠️ pentru warning. Afișează cu console.log() rezultatele pentru toate tipurile.",
        starterCode: "function Badge(type) {\n  // returnează emoji bazat pe tip\n}\n\nconsole.log(Badge('success'));\nconsole.log(Badge('error'));\nconsole.log(Badge('warning'));",
        explanation: "function Badge(type) { const map = { success: '✅', error: '❌', warning: '⚠️' }; return map[type] || '❓'; } console.log(Badge('success')); console.log(Badge('error')); console.log(Badge('warning'));",
        difficulty: "medium",
      },
    ],
  },
  {
    lessonSlug: "react-usestate",
    items: [
      {
        name: "Simulare useState counter",
        question: "Simulează useState cu un obiect care are valoarea inițială 0. Creează o funcție `increment()` care mărește valoarea cu 1 și o funcție `decrement()` care o micșorează cu 1. Apelează increment de 3 ori, decrement o dată, și afișează valoarea finală cu console.log().",
        starterCode: "let state = 0;\n\nfunction increment() {\n  // mărește state cu 1\n}\n\nfunction decrement() {\n  // micșorează state cu 1\n}\n\nincrement();\nincrement();\nincrement();\ndecrement();\nconsole.log('Valoare finală:', state);",
        explanation: "let state = 0; function increment() { state++; } function decrement() { state--; } increment(); increment(); increment(); decrement(); console.log('Valoare finală:', state);",
        difficulty: "easy",
      },
      {
        name: "Toggle boolean",
        question: "Creează o simulare de toggle: o variabilă `isVisible` cu valoarea inițială `false`. Creează o funcție `toggle()` care schimbă valoarea la opusul ei. Apelează toggle de 5 ori și afișează cu console.log() starea după fiecare apel.",
        starterCode: "let isVisible = false;\n\nfunction toggle() {\n  // inversează isVisible\n}\n\nfor (let i = 0; i < 5; i++) {\n  toggle();\n  console.log(`Toggle ${i + 1}: isVisible =`, isVisible);\n}",
        explanation: "let isVisible = false; function toggle() { isVisible = !isVisible; } for (let i = 0; i < 5; i++) { toggle(); console.log(`Toggle ${i + 1}: isVisible =`, isVisible); }",
        difficulty: "easy",
      },
      {
        name: "Form state update",
        question: "Creează un obiect `formState` cu câmpurile `name: ''` și `email: ''`. Scrie o funcție `updateField(field, value)` care actualizează câmpul specificat. Actualizează name cu 'Ion' și email cu 'ion@test.com', apoi afișează obiectul final cu console.log().",
        starterCode: "let formState = { name: '', email: '' };\n\nfunction updateField(field, value) {\n  // actualizează câmpul din formState\n}\n\nupdateField('name', 'Ion');\nupdateField('email', 'ion@test.com');\nconsole.log(formState);",
        explanation: "let formState = { name: '', email: '' }; function updateField(field, value) { formState[field] = value; } updateField('name', 'Ion'); updateField('email', 'ion@test.com'); console.log(formState);",
        difficulty: "medium",
      },
    ],
  },
  {
    lessonSlug: "react-useeffect",
    items: [
      {
        name: "Simulare dependency check",
        question: "Simulează useEffect: creează o funcție `runEffect(deps, prevDeps, callback)` care apelează callback() doar dacă deps s-a schimbat față de prevDeps (compară cu JSON.stringify). Testează cu deps=[1,2] vs prevDeps=[1,2] (nu trebuie să ruleze) și deps=[1,3] vs prevDeps=[1,2] (trebuie să ruleze).",
        starterCode: "function runEffect(deps, prevDeps, callback) {\n  // apelează callback doar dacă deps !== prevDeps\n}\n\nrunEffect([1, 2], [1, 2], () => console.log('Effect rulat 1'));\nrunEffect([1, 3], [1, 2], () => console.log('Effect rulat 2'));",
        explanation: "function runEffect(deps, prevDeps, callback) { if (JSON.stringify(deps) !== JSON.stringify(prevDeps)) callback(); } runEffect([1, 2], [1, 2], () => console.log('Effect rulat 1')); runEffect([1, 3], [1, 2], () => console.log('Effect rulat 2'));",
        difficulty: "medium",
      },
      {
        name: "Debounce",
        question: "Creează o funcție `debounce(fn, delay)` care returnează o versiune 'debounced' a funcției fn — apelează fn doar după ce au trecut `delay` milisecunde fără un nou apel. Testează-o cu o funcție search care apelează console.log.",
        starterCode: "function debounce(fn, delay) {\n  let timer;\n  return function(...args) {\n    clearTimeout(timer);\n    timer = setTimeout(() => fn(...args), delay);\n  };\n}\n\nconst search = debounce((term) => console.log('Searching:', term), 100);\nsearch('r');\nsearch('re');\nsearch('react');\n// Doar 'react' ar trebui să apară după 100ms",
        explanation: "function debounce(fn, delay) { let timer; return function(...args) { clearTimeout(timer); timer = setTimeout(() => fn(...args), delay); }; } const search = debounce((term) => console.log('Searching:', term), 100); search('r'); search('re'); search('react');",
        difficulty: "hard",
      },
      {
        name: "Mount și Cleanup",
        question: "Scrie o funcție `createCleanup(resourceName)` care returnează un obiect cu metodele `mount()` (afișează 'Mounting {resourceName}') și `cleanup()` (afișează 'Cleaning up {resourceName}'). Creează două resurse, apelează mount() pe ambele, apoi cleanup() pe amândouă.",
        starterCode: "function createCleanup(resourceName) {\n  return {\n    mount() {\n      // afișează mesajul de mount\n    },\n    cleanup() {\n      // afișează mesajul de cleanup\n    }\n  };\n}\n\nconst timer = createCleanup('timer');\nconst subscription = createCleanup('subscription');\ntimer.mount();\nsubscription.mount();\ntimer.cleanup();\nsubscription.cleanup();",
        explanation: "function createCleanup(name) { return { mount() { console.log(`Mounting ${name}`); }, cleanup() { console.log(`Cleaning up ${name}`); } }; } const timer = createCleanup('timer'); const sub = createCleanup('subscription'); timer.mount(); sub.mount(); timer.cleanup(); sub.cleanup();",
        difficulty: "medium",
      },
    ],
  },
  {
    lessonSlug: "react-events",
    items: [
      {
        name: "Event Bus simplu",
        question: "Creează un sistem simplu de event handling: un obiect `eventBus` cu metodele `on(event, handler)` și `emit(event, data)`. Înregistrează un handler pentru evenimentul 'click' care afișează 'Button clicked with data: {data}'. Emite evenimentul cu data='submit'.",
        starterCode: "const eventBus = {\n  handlers: {},\n  on(event, handler) {\n    // stochează handler-ul\n  },\n  emit(event, data) {\n    // apelează handler-ul înregistrat\n  }\n};\n\neventBus.on('click', (data) => console.log('Button clicked with data:', data));\neventBus.emit('click', 'submit');",
        explanation: "const eventBus = { handlers: {}, on(event, handler) { this.handlers[event] = handler; }, emit(event, data) { if (this.handlers[event]) this.handlers[event](data); } }; eventBus.on('click', (data) => console.log('Button clicked with data:', data)); eventBus.emit('click', 'submit');",
        difficulty: "medium",
      },
      {
        name: "Validare formular",
        question: "Scrie o funcție `handleFormSubmit(formData)` care: (1) verifică că `name` nu este gol, (2) verifică că `email` conține '@', (3) dacă ambele sunt valide, afișează 'Form submitted: {name} - {email}', altfel afișează eroarea specifică. Testează cu date valide și invalide.",
        starterCode: "function handleFormSubmit(formData) {\n  const { name, email } = formData;\n  // validează și afișează rezultatul\n}\n\nhandleFormSubmit({ name: 'Ion', email: 'ion@test.com' });\nhandleFormSubmit({ name: '', email: 'test@test.com' });\nhandleFormSubmit({ name: 'Ana', email: 'ana-fara-at' });",
        explanation: "function handleFormSubmit({ name, email }) { if (!name) { console.log('Eroare: name gol'); return; } if (!email.includes('@')) { console.log('Eroare: email invalid'); return; } console.log(`Form submitted: ${name} - ${email}`); } handleFormSubmit({ name: 'Ion', email: 'ion@test.com' }); handleFormSubmit({ name: '', email: 'test@test.com' }); handleFormSubmit({ name: 'Ana', email: 'ana-fara-at' });",
        difficulty: "medium",
      },
      {
        name: "Throttle",
        question: "Creează o funcție `throttle(fn, limit)` care asigură că fn nu este apelată mai des decât o dată la `limit` milisecunde. Testează-o cu o funcție care afișează 'scroll event' — apelează-o rapid de 5 ori și verifică că rulează o singură dată.",
        starterCode: "function throttle(fn, limit) {\n  let lastCall = 0;\n  return function(...args) {\n    const now = Date.now();\n    if (now - lastCall >= limit) {\n      lastCall = now;\n      fn(...args);\n    }\n  };\n}\n\nconst onScroll = throttle(() => console.log('scroll event'), 1000);\nonScroll();\nonScroll();\nonScroll();",
        explanation: "function throttle(fn, limit) { let lastCall = 0; return function(...args) { const now = Date.now(); if (now - lastCall >= limit) { lastCall = now; fn(...args); } }; } const onScroll = throttle(() => console.log('scroll event'), 1000); onScroll(); onScroll(); onScroll();",
        difficulty: "hard",
      },
    ],
  },
  {
    lessonSlug: "react-liste-keys",
    items: [
      {
        name: "Map produse",
        question: "Ai un array de produse: `[{id:1, name:'Laptop', price:1200}, {id:2, name:'Mouse', price:50}, {id:3, name:'Keyboard', price:150}]`. Folosind map(), creează un nou array de stringuri în formatul `'[{id}] {name}: {price} RON'` și afișează fiecare element cu console.log().",
        starterCode: "const products = [\n  { id: 1, name: 'Laptop', price: 1200 },\n  { id: 2, name: 'Mouse', price: 50 },\n  { id: 3, name: 'Keyboard', price: 150 }\n];\n\nconst rendered = products.map(p => `[${p.id}] ${p.name}: ${p.price} RON`);\nrendered.forEach(item => console.log(item));",
        explanation: "const products = [{ id: 1, name: 'Laptop', price: 1200 }, { id: 2, name: 'Mouse', price: 50 }, { id: 3, name: 'Keyboard', price: 150 }]; const rendered = products.map(p => `[${p.id}] ${p.name}: ${p.price} RON`); rendered.forEach(item => console.log(item));",
        difficulty: "easy",
      },
      {
        name: "GroupBy categorie",
        question: "Creează o funcție `groupByCategory(items)` care primește un array de obiecte `{name, category}` și returnează un obiect grupat pe categorii. Exemplu: `[{name:'React', category:'JS'}, {name:'Python', category:'BE'}]` → `{JS: ['React'], BE: ['Python']}`. Afișează rezultatul.",
        starterCode: "function groupByCategory(items) {\n  return items.reduce((acc, item) => {\n    if (!acc[item.category]) acc[item.category] = [];\n    acc[item.category].push(item.name);\n    return acc;\n  }, {});\n}\n\nconst items = [\n  { name: 'React', category: 'JS' },\n  { name: 'Vue', category: 'JS' },\n  { name: 'Python', category: 'BE' },\n  { name: 'Node', category: 'BE' }\n];\nconsole.log(groupByCategory(items));",
        explanation: "function groupByCategory(items) { return items.reduce((acc, item) => { if (!acc[item.category]) acc[item.category] = []; acc[item.category].push(item.name); return acc; }, {}); } const items = [{ name: 'React', category: 'JS' }, { name: 'Vue', category: 'JS' }, { name: 'Python', category: 'BE' }, { name: 'Node', category: 'BE' }]; console.log(groupByCategory(items));",
        difficulty: "medium",
      },
    ],
  },
  {
    lessonSlug: "react-forms",
    items: [
      {
        name: "Validare formular complet",
        question: "Creează o funcție `validateForm(data)` care validează un obiect cu câmpurile: `username` (minim 3 caractere), `email` (trebuie să conțină '@' și '.'), `password` (minim 6 caractere). Returnează un obiect `{valid: boolean, errors: []}`. Testează cu date valide și invalide.",
        starterCode: "function validateForm(data) {\n  const errors = [];\n  if (data.username.length < 3) errors.push('Username prea scurt');\n  // validează email și password\n  return { valid: errors.length === 0, errors };\n}\n\nconsole.log(validateForm({ username: 'io', email: 'nu-e-email', password: '123' }));\nconsole.log(validateForm({ username: 'ion', email: 'ion@test.com', password: 'parola123' }));",
        explanation: "function validateForm({ username, email, password }) { const errors = []; if (username.length < 3) errors.push('Username prea scurt'); if (!email.includes('@') || !email.includes('.')) errors.push('Email invalid'); if (password.length < 6) errors.push('Parolă prea scurtă'); return { valid: errors.length === 0, errors }; } console.log(validateForm({ username: 'io', email: 'nu-e-email', password: '123' })); console.log(validateForm({ username: 'ion', email: 'ion@test.com', password: 'parola123' }));",
        difficulty: "medium",
      },
      {
        name: "Sanitizare input",
        question: "Scrie o funcție `sanitizeInput(str)` care: (1) elimină spațiile de la început și sfârșit (trim), (2) înlocuiește `<` cu `&lt;` și `>` cu `&gt;`, (3) limitează la maxim 100 de caractere. Testează cu mai multe stringuri.",
        starterCode: "function sanitizeInput(str) {\n  return str\n    .trim()\n    // înlocuiește < și >\n    .slice(0, 100);\n}\n\nconsole.log(sanitizeInput('  <script>alert(1)</script>  '));\nconsole.log(sanitizeInput('Bun venit!'));\nconsole.log(sanitizeInput('Test'));",
        explanation: "function sanitizeInput(str) { return str.trim().replace(/</g, '&lt;').replace(/>/g, '&gt;').slice(0, 100); } console.log(sanitizeInput('  <script>alert(1)</script>  ')); console.log(sanitizeInput('Bun venit!')); console.log(sanitizeInput('Test'));",
        difficulty: "medium",
      },
    ],
  },
  {
    lessonSlug: "react-context",
    items: [
      {
        name: "Simulare Theme Context",
        question: "Simulează un Context React: creează un obiect `ThemeContext` cu `theme: 'light'`. Creează o funcție `toggleTheme()` care comută între 'light' și 'dark'. Creează `useTheme()` care returnează tema curentă. Demonstrează cu console.log() schimbarea temei de 3 ori.",
        starterCode: "let currentTheme = 'light';\n\nfunction toggleTheme() {\n  // comutare între light și dark\n}\n\nfunction useTheme() {\n  return currentTheme;\n}\n\nconsole.log('Tema inițială:', useTheme());\ntoggleTheme();\nconsole.log('Dupa toggle:', useTheme());\ntoggleTheme();\nconsole.log('Dupa al doilea toggle:', useTheme());",
        explanation: "let currentTheme = 'light'; function toggleTheme() { currentTheme = currentTheme === 'light' ? 'dark' : 'light'; } function useTheme() { return currentTheme; } console.log('Tema inițială:', useTheme()); toggleTheme(); console.log('Dupa toggle:', useTheme()); toggleTheme(); console.log('Dupa al doilea toggle:', useTheme());",
        difficulty: "medium",
      },
      {
        name: "Store global simplu",
        question: "Creează o simulare de store global: un obiect `store` cu state-ul `{user: null, cart: [], notifications: []}`. Scrie funcții `login(user)`, `addToCart(item)`, și `addNotification(msg)`. Testează toate funcțiile și afișează state-ul final.",
        starterCode: "const store = { user: null, cart: [], notifications: [] };\n\nfunction login(user) {\n  store.user = user;\n}\n\nfunction addToCart(item) {\n  store.cart.push(item);\n}\n\nfunction addNotification(msg) {\n  store.notifications.push(msg);\n}\n\nlogin({ name: 'Ana', email: 'ana@test.com' });\naddToCart({ id: 1, name: 'Laptop', price: 1200 });\naddToCart({ id: 2, name: 'Mouse', price: 50 });\naddNotification('Bun venit, Ana!');\nconsole.log(store);",
        explanation: "const store = { user: null, cart: [], notifications: [] }; function login(user) { store.user = user; } function addToCart(item) { store.cart.push(item); } function addNotification(msg) { store.notifications.push(msg); } login({ name: 'Ana', email: 'ana@test.com' }); addToCart({ id: 1, name: 'Laptop', price: 1200 }); addToCart({ id: 2, name: 'Mouse', price: 50 }); addNotification('Bun venit, Ana!'); console.log(store);",
        difficulty: "easy",
      },
    ],
  },
  {
    lessonSlug: "react-custom-hooks",
    items: [
      {
        name: "useCounter custom hook",
        question: "Creează o funcție `useCounter(initialValue = 0, step = 1)` care returnează un obiect `{count, increment, decrement, reset}`. Testează: creează un counter cu start=10, step=5, incrementează de 3 ori, decrementează o dată, afișează count-ul, apoi reset.",
        starterCode: "function useCounter(initialValue = 0, step = 1) {\n  let count = initialValue;\n  return {\n    get count() { return count; },\n    increment() { count += step; },\n    decrement() { count -= step; },\n    reset() { count = initialValue; }\n  };\n}\n\nconst counter = useCounter(10, 5);\nconsole.log('Start:', counter.count);\ncounter.increment();\ncounter.increment();\ncounter.increment();\nconsole.log('Dupa 3 increments:', counter.count);\ncounter.decrement();\nconsole.log('Dupa decrement:', counter.count);\ncounter.reset();\nconsole.log('Dupa reset:', counter.count);",
        explanation: "function useCounter(initialValue = 0, step = 1) { let count = initialValue; return { get count() { return count; }, increment() { count += step; }, decrement() { count -= step; }, reset() { count = initialValue; } }; } const counter = useCounter(10, 5); console.log('Start:', counter.count); counter.increment(); counter.increment(); counter.increment(); console.log('Dupa 3 increments:', counter.count); counter.decrement(); console.log('Dupa decrement:', counter.count); counter.reset(); console.log('Dupa reset:', counter.count);",
        difficulty: "medium",
      },
      {
        name: "useFetch simulat",
        question: "Simulează un hook `useFetch(url)` care folosește Promises. Returnează un obiect `{data, loading, error}`. Inițial loading=true, data=null. Creează o funcție `mockFetch(url)` care returnează o Promise care rezolvă cu `{name: 'Ana', age: 25}` după 0ms. Apelează useFetch și afișează rezultatul.",
        starterCode: "function mockFetch(url) {\n  return Promise.resolve({ name: 'Ana', age: 25 });\n}\n\nasync function useFetch(url) {\n  let state = { data: null, loading: true, error: null };\n  console.log('Loading:', state.loading);\n  try {\n    state.data = await mockFetch(url);\n    state.loading = false;\n    console.log('Data:', state.data);\n    console.log('Loading:', state.loading);\n  } catch (e) {\n    state.error = e.message;\n    state.loading = false;\n  }\n  return state;\n}\n\nuseFetch('/api/user');",
        explanation: "async function useFetch(url) { let state = { data: null, loading: true, error: null }; console.log('Loading:', state.loading); try { state.data = await mockFetch(url); state.loading = false; console.log('Data:', state.data); console.log('Loading:', state.loading); } catch (e) { state.error = e.message; state.loading = false; } return state; }",
        difficulty: "hard",
      },
    ],
  },
  {
    lessonSlug: "react-performance",
    items: [
      {
        name: "Memoizare rezultate",
        question: "Implementează o funcție `memoize(fn)` care cachează rezultatele calculelor. Dacă aceeași funcție este apelată cu aceleași argumente, returnează rezultatul din cache fără a recalcula. Testează cu o funcție fibonacci și afișează când e calculat vs din cache.",
        starterCode: "function memoize(fn) {\n  const cache = {};\n  return function(...args) {\n    const key = JSON.stringify(args);\n    if (key in cache) {\n      console.log(`Din cache pentru`, args);\n      return cache[key];\n    }\n    const result = fn(...args);\n    cache[key] = result;\n    return result;\n  };\n}\n\nconst expensiveCalc = memoize(function(n) {\n  console.log(`Calculez pentru ${n}`);\n  return n * n;\n});\n\nconsole.log(expensiveCalc(5));\nconsole.log(expensiveCalc(5)); // din cache\nconsole.log(expensiveCalc(3));",
        explanation: "function memoize(fn) { const cache = {}; return function(...args) { const key = JSON.stringify(args); if (key in cache) { console.log('Din cache pentru', args); return cache[key]; } const result = fn(...args); cache[key] = result; return result; }; }",
        difficulty: "hard",
      },
    ],
  },
];

async function main() {
  console.log('Adăugare coding tasks React...');
  let added = 0, skipped = 0;

  for (const { lessonSlug, items } of tasks) {
    const lesson = await prisma.lesson.findFirst({ where: { slug: lessonSlug } });
    if (!lesson) { console.log(`  [skip] ${lessonSlug} — lecție negăsită`); skipped++; continue; }

    const existing = await prisma.task.count({ where: { lessonId: lesson.id, type: 'coding' } });
    if (existing >= items.length) { console.log(`  [skip] ${lessonSlug} — are deja ${existing} coding tasks`); skipped++; continue; }

    const maxTask = await prisma.task.findFirst({ where: { lessonId: lesson.id }, orderBy: { number: 'desc' } });
    let n = (maxTask?.number ?? 0) + 1;

    for (const item of items) {
      await prisma.task.create({
        data: {
          lessonId: lesson.id,
          number: n++,
          name: item.name || '',
          question: item.question,
          options: [],
          answer: '',
          explanation: item.explanation || '',
          difficulty: item.difficulty || 'medium',
          type: 'coding',
          language: 'javascript',
          starterCode: item.starterCode || '',
          expectedOutput: '',
        },
      });
    }
    console.log(`  [ok] ${lessonSlug} — ${items.length} tasks adăugate`);
    added += items.length;
  }

  console.log(`\nGata: ${added} adăugate, ${skipped} sărite.`);
  await prisma.$disconnect();
}

main().catch(console.error);
