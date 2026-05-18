const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const TASKS = {
  "react-usereducer": [
    { name: "useReducer counter",
      q: "Implementează un reducer pentru un counter: state={count:0}, actions: INCREMENT, DECREMENT, RESET, SET_VALUE(payload). Testează manual trecând state și action, afișând state-ul rezultat pentru fiecare acțiune.",
      code: "function counterReducer(state, action) {\n  switch(action.type) {\n    case 'INCREMENT': return { count: state.count + 1 };\n    case 'DECREMENT': return { count: state.count - 1 };\n    case 'RESET': return { count: 0 };\n    case 'SET_VALUE': return { count: action.payload };\n    default: return state;\n  }\n}\n\nlet state = { count: 0 };\nstate = counterReducer(state, { type: 'INCREMENT' });\nconsole.log(state.count);\nstate = counterReducer(state, { type: 'INCREMENT' });\nstate = counterReducer(state, { type: 'DECREMENT' });\nconsole.log(state.count);\nstate = counterReducer(state, { type: 'SET_VALUE', payload: 10 });\nconsole.log(state.count);\nstate = counterReducer(state, { type: 'RESET' });\nconsole.log(state.count);" },
  ],
  "react-useref": [
    { name: "useRef simulat",
      q: "Simulează useRef: creează un obiect `ref = {current: null}`. Scrie o funcție `attachRef(element)` care setează ref.current. Demonstrează că ref persistă și se poate modifica fără re-render.",
      code: "function createRef(initialValue = null) {\n  return { current: initialValue };\n}\n\nconst ref = createRef();\nconsole.log('Initial:', ref.current);\n\nfunction attachRef(element) {\n  ref.current = element;\n}\n\nattachRef({ tagName: 'input', value: 'Hello' });\nconsole.log('Dupa attach:', ref.current.tagName);\nconsole.log('Value:', ref.current.value);\n\nref.current.value = 'Updated';\nconsole.log('Dupa update:', ref.current.value);" },
  ],
  "react-router-intro": [
    { name: "Router simulat",
      q: "Simulează un router simplu: un obiect `routes` cu path-uri și componente (funcții). O funcție `navigate(path)` care apelează componenta corespunzătoare. Testează cu '/home', '/about', '/404'.",
      code: "const routes = {\n  '/home': () => console.log('Pagina Home'),\n  '/about': () => console.log('Pagina About'),\n  '/contact': () => console.log('Pagina Contact'),\n};\n\nfunction navigate(path) {\n  const component = routes[path];\n  if (component) component();\n  else console.log('404: Pagina nu a fost gasita');\n}\n\nnavigate('/home');\nnavigate('/about');\nnavigate('/404');" },
  ],
  "react-router-avansat": [
    { name: "Dynamic routes",
      q: "Simulează route-uri dinamice: o funcție `matchRoute(routes, path)` care compară un path cu pattern-uri (ex: '/user/:id' match-uiește '/user/42'). Returnează params extrași. Testează cu '/user/42' și '/post/react-basics'.",
      code: "function matchRoute(routes, path) {\n  for (const pattern of Object.keys(routes)) {\n    const patternParts = pattern.split('/');\n    const pathParts = path.split('/');\n    if (patternParts.length !== pathParts.length) continue;\n    const params = {};\n    let match = true;\n    for (let i = 0; i < patternParts.length; i++) {\n      if (patternParts[i].startsWith(':')) {\n        params[patternParts[i].slice(1)] = pathParts[i];\n      } else if (patternParts[i] !== pathParts[i]) {\n        match = false; break;\n      }\n    }\n    if (match) return { handler: routes[pattern], params };\n  }\n  return null;\n}\n\nconst routes = {\n  '/user/:id': (p) => `User: ${p.id}`,\n  '/post/:slug': (p) => `Post: ${p.slug}`,\n};\n\nconst r1 = matchRoute(routes, '/user/42');\nconsole.log(r1.handler(r1.params));\nconst r2 = matchRoute(routes, '/post/react-basics');\nconsole.log(r2.handler(r2.params));" },
  ],
  "react-suspense-lazy": [
    { name: "Lazy loading simulat",
      q: "Simulează lazy loading: o funcție `lazyLoad(importFn)` care: înainte de a încărca afișează 'Loading...', după ce Promise se rezolvă afișează 'Loaded: {componentName}'. Testează cu o funcție care simulează import dinamic.",
      code: "function lazyLoad(importFn) {\n  console.log('Loading...');\n  return importFn().then(module => {\n    console.log('Loaded:', module.default);\n    return module;\n  });\n}\n\nfunction mockImport(name) {\n  return Promise.resolve({ default: name });\n}\n\nlazyLoad(() => mockImport('HeavyComponent'));\nlazyLoad(() => mockImport('ChartModule'));" },
  ],
  "react-error-boundary": [
    { name: "Error Boundary simulat",
      q: "Simulează un Error Boundary: o funcție `withErrorBoundary(component, fallback)` care încearcă să execute component() și dacă aruncă eroare, execută fallback(error). Testează cu o componentă care aruncă eroare.",
      code: "function withErrorBoundary(component, fallback) {\n  try {\n    return component();\n  } catch(error) {\n    return fallback(error);\n  }\n}\n\nconst result1 = withErrorBoundary(\n  () => 'Componenta functioneaza',\n  (e) => `Eroare: ${e.message}`\n);\nconsole.log(result1);\n\nconst result2 = withErrorBoundary(\n  () => { throw new Error('Ceva s-a stricat'); },\n  (e) => `Fallback: ${e.message}`\n);\nconsole.log(result2);" },
  ],
  "react-compound-components": [
    { name: "Compound components pattern",
      q: "Simulează Compound Components: un `Accordion` care are sub-componente `Header` și `Body`. Implementează logica de toggle și demonstrează că header-ul controlează vizibilitatea body-ului.",
      code: "function createAccordion() {\n  let isOpen = false;\n  \n  return {\n    Header(title) {\n      isOpen = !isOpen;\n      console.log(`${title}: ${isOpen ? 'deschis' : 'inchis'}`);\n      return isOpen;\n    },\n    Body(content) {\n      if (isOpen) console.log('Content:', content);\n      else console.log('Body ascuns');\n    }\n  };\n}\n\nconst accordion = createAccordion();\naccordion.Header('Sectiunea 1');\naccordion.Body('Continut important');\naccordion.Header('Sectiunea 1');\naccordion.Body('Continut important');" },
  ],
  "react-render-props-hoc": [
    { name: "Higher Order Component",
      q: "Implementează un HOC `withLogger(component)` care loghează la fiecare apel: 'Calling {name} with props: {props}'. Testează cu o funcție 'Greeting' simplă.",
      code: "function withLogger(component) {\n  return function WrappedComponent(props) {\n    console.log(`Calling ${component.name} with props:`, props);\n    return component(props);\n  };\n}\n\nfunction Greeting({ name }) {\n  return `Hello, ${name}!`;\n}\n\nconst LoggedGreeting = withLogger(Greeting);\nconsole.log(LoggedGreeting({ name: 'Ana' }));\nconsole.log(LoggedGreeting({ name: 'Ion' }));" },
  ],
  "react-state-libs": [
    { name: "Zustand simulat",
      q: "Simulează Zustand: o funcție `createStore(initialState, actions)` care returnează un store cu metode `getState()` și `setState()`. Implementează un cart store cu addItem și removeItem.",
      code: "function createStore(initialState) {\n  let state = { ...initialState };\n  const listeners = [];\n  return {\n    getState: () => state,\n    setState: (newState) => {\n      state = typeof newState === 'function' ? newState(state) : { ...state, ...newState };\n      listeners.forEach(fn => fn(state));\n    },\n    subscribe: (fn) => { listeners.push(fn); }\n  };\n}\n\nconst cart = createStore({ items: [], total: 0 });\n\nfunction addItem(item) {\n  cart.setState(s => ({\n    items: [...s.items, item],\n    total: s.total + item.price\n  }));\n}\n\naddItem({ name: 'Laptop', price: 1200 });\naddItem({ name: 'Mouse', price: 50 });\nconsole.log(cart.getState().items.length);\nconsole.log(cart.getState().total);" },
  ],
  "react-query-swr": [
    { name: "React Query simulat",
      q: "Simulează `useQuery(key, fetchFn)`: returnează {data, loading, error}. Dacă fetchFn rezolvă cu succes, data se setează. Dacă respinge, error se setează. Demonstrează cu o funcție fetch simulată.",
      code: "async function useQuery(key, fetchFn) {\n  let result = { data: null, loading: true, error: null };\n  console.log(`[${key}] Loading...`);\n  try {\n    result.data = await fetchFn();\n    result.loading = false;\n    console.log(`[${key}] Success:`, result.data);\n  } catch(e) {\n    result.error = e.message;\n    result.loading = false;\n    console.log(`[${key}] Error:`, e.message);\n  }\n  return result;\n}\n\nuseQuery('users', () => Promise.resolve([{id:1,name:'Ana'}]));\nuseQuery('profile', () => Promise.reject(new Error('Unauthorized')));" },
  ],
  "react-hook-form": [
    { name: "Form validation logic",
      q: "Implementează un sistem de validare pentru formulare: `validate(schema, values)` care primește un schema de validare și valorile formularului, și returnează {valid, errors}. Testează cu un schema pentru un form de login.",
      code: "function validate(schema, values) {\n  const errors = {};\n  for (const [field, rules] of Object.entries(schema)) {\n    if (rules.required && !values[field]) {\n      errors[field] = `${field} este obligatoriu`;\n    } else if (rules.minLength && values[field]?.length < rules.minLength) {\n      errors[field] = `${field} trebuie sa aiba minim ${rules.minLength} caractere`;\n    } else if (rules.pattern && !rules.pattern.test(values[field])) {\n      errors[field] = `${field} are format invalid`;\n    }\n  }\n  return { valid: Object.keys(errors).length === 0, errors };\n}\n\nconst schema = {\n  email: { required: true, pattern: /^\\S+@\\S+\\.\\S+$/ },\n  password: { required: true, minLength: 6 },\n};\n\nconsole.log(validate(schema, { email: 'test@test.com', password: 'pass123' }));\nconsole.log(validate(schema, { email: 'invalid', password: '123' }));" },
  ],
  "react-zod-validation": [
    { name: "Schema validation simulat",
      q: "Simulează Zod: scrie o funcție `z` cu metodele `string()`, `number()`, `email()` care returnează obiecte cu metoda `parse(value)`. Dacă validarea eșuează, aruncă `ZodError`.",
      code: "const z = {\n  string: () => ({\n    min: (n) => ({\n      parse(val) {\n        if (typeof val !== 'string') throw new Error('Expected string');\n        if (val.length < n) throw new Error(`Min ${n} chars`);\n        return val;\n      }\n    })\n  }),\n  number: () => ({\n    parse(val) {\n      if (typeof val !== 'number') throw new Error('Expected number');\n      return val;\n    }\n  }),\n};\n\ntry {\n  console.log(z.string().min(3).parse('Ana'));\n  console.log(z.number().parse(42));\n  z.string().min(5).parse('hi');\n} catch(e) {\n  console.log('Validation error:', e.message);\n}" },
  ],
  "react-proiect-todo": [
    { name: "Todo App logic",
      q: "Implementează logica completă a unui Todo App: `TodoStore` cu addTodo(text), toggleTodo(id), deleteTodo(id), getAll(), getCompleted(), getPending(). Testează cu 3 todos.",
      code: "class TodoStore {\n  constructor() { this.todos = []; this.nextId = 1; }\n  addTodo(text) {\n    this.todos.push({ id: this.nextId++, text, done: false });\n  }\n  toggleTodo(id) {\n    const t = this.todos.find(t => t.id === id);\n    if (t) t.done = !t.done;\n  }\n  deleteTodo(id) {\n    this.todos = this.todos.filter(t => t.id !== id);\n  }\n  getAll() { return this.todos; }\n  getCompleted() { return this.todos.filter(t => t.done); }\n  getPending() { return this.todos.filter(t => !t.done); }\n}\n\nconst store = new TodoStore();\nstore.addTodo('Invata React');\nstore.addTodo('Construieste proiect');\nstore.addTodo('Deploy pe Vercel');\nstore.toggleTodo(1);\nstore.toggleTodo(2);\nconsole.log('Total:', store.getAll().length);\nconsole.log('Completate:', store.getCompleted().length);\nconsole.log('Pending:', store.getPending().length);\nstore.deleteTodo(1);\nconsole.log('Dupa stergere:', store.getAll().length);" },
  ],
  "zustand-state": [
    { name: "Store cu middleware",
      q: "Creează un store simplu cu middleware de logging: fiecare setState loghează acțiunea. Implementează un counter store și demonstrează că fiecare acțiune e logată.",
      code: "function createStore(initialState) {\n  let state = { ...initialState };\n  \n  function setState(newState, actionName = 'update') {\n    const prev = { ...state };\n    state = { ...state, ...(typeof newState === 'function' ? newState(state) : newState) };\n    console.log(`[${actionName}]`, prev, '->', state);\n  }\n  \n  return { getState: () => state, setState };\n}\n\nconst store = createStore({ count: 0, name: 'counter' });\nstore.setState(s => ({ count: s.count + 1 }), 'INCREMENT');\nstore.setState(s => ({ count: s.count + 1 }), 'INCREMENT');\nstore.setState({ count: 0 }, 'RESET');\nconsole.log('Final:', store.getState().count);" },
  ],
  "react-testing": [
    { name: "Testare funcții pure",
      q: "Scrie teste pentru funcțiile unui hook simplu de counter: testează că increment mărește cu 1, decrement micșorează cu 1, reset revine la 0, și că nu poate merge sub 0. Folosește un mini test runner.",
      code: "function test(name, fn) {\n  try { fn(); console.log('PASS:', name); }\n  catch(e) { console.log('FAIL:', name, '-', e.message); }\n}\nfunction expect(val) {\n  return {\n    toBe: (expected) => { if(val !== expected) throw new Error(`Expected ${expected}, got ${val}`); }\n  };\n}\n\nfunction counterLogic(initial = 0) {\n  let count = initial;\n  return {\n    increment: () => ++count,\n    decrement: () => Math.max(0, --count),\n    reset: () => { count = initial; return count; },\n    get: () => count\n  };\n}\n\ntest('increment mareste cu 1', () => {\n  const c = counterLogic(5);\n  expect(c.increment()).toBe(6);\n});\ntest('reset revine la initial', () => {\n  const c = counterLogic(3);\n  c.increment(); c.increment();\n  expect(c.reset()).toBe(3);\n});" },
  ],
  "react-framer-motion": [
    { name: "Animații CSS cu JS",
      q: "Simulează animații Framer Motion cu CSS transitions în JS: o funcție `animate(element, fromProps, toProps, duration)` care aplică stiluri inițiale, apoi le transitionează. Demonstrează conceptul cu loguri.",
      code: "function animate(elementName, from, to, duration) {\n  console.log(`Animating ${elementName}:`);\n  console.log('From:', from);\n  \n  return new Promise(resolve => {\n    setTimeout(() => {\n      console.log('To:', to);\n      console.log(`Duration: ${duration}ms`);\n      resolve(to);\n    }, duration);\n  });\n}\n\nanimate('hero', \n  { opacity: 0, y: 20 }, \n  { opacity: 1, y: 0 }, \n  300\n).then(finalState => console.log('Final:', finalState));\n\nanimate('card',\n  { scale: 0.8, opacity: 0 },\n  { scale: 1, opacity: 1 },\n  200\n).then(finalState => console.log('Card final:', finalState));" },
  ],
  "react-accesibilitate": [
    { name: "ARIA attributes checker",
      q: "Scrie o funcție `checkAccessibility(element)` care verifică că un element HTML are attributele ARIA necesare: dacă e un button fără text, dacă e un image fără alt, dacă e un input fără label. Returnează lista de probleme.",
      code: "function checkAccessibility(element) {\n  const issues = [];\n  if (element.tag === 'button' && !element.text && !element.ariaLabel) {\n    issues.push('Button fara text sau aria-label');\n  }\n  if (element.tag === 'img' && !element.alt) {\n    issues.push('Image fara alt text');\n  }\n  if (element.tag === 'input' && !element.label && !element.ariaLabel) {\n    issues.push('Input fara label sau aria-label');\n  }\n  return { accessible: issues.length === 0, issues };\n}\n\nconsole.log(checkAccessibility({ tag: 'button', text: 'Submit' }));\nconsole.log(checkAccessibility({ tag: 'button' }));\nconsole.log(checkAccessibility({ tag: 'img', alt: 'Logo' }));\nconsole.log(checkAccessibility({ tag: 'img' }));" },
  ],
  "react-virtualization": [
    { name: "Virtual list",
      q: "Implementează un virtual list simplu: date 10.000 elemente, dar randezi doar cele vizibile (window de 10 elemente). Calculează care elemente sunt vizibile bazat pe scrollTop și itemHeight=40.",
      code: "function VirtualList(totalItems, itemHeight = 40) {\n  let scrollTop = 0;\n  const windowSize = 10;\n  \n  return {\n    scroll(top) {\n      scrollTop = top;\n    },\n    getVisibleItems() {\n      const startIndex = Math.floor(scrollTop / itemHeight);\n      const endIndex = Math.min(startIndex + windowSize, totalItems);\n      return Array.from({ length: endIndex - startIndex }, (_, i) => startIndex + i);\n    },\n    getTotalHeight() {\n      return totalItems * itemHeight;\n    }\n  };\n}\n\nconst list = VirtualList(10000);\nconsole.log('Total height:', list.getTotalHeight());\nconsole.log('Vizibile la scroll 0:', list.getVisibleItems());\nlist.scroll(400);\nconsole.log('Vizibile la scroll 400:', list.getVisibleItems());" },
  ],
  "react-19-actions": [
    { name: "Server actions simulat",
      q: "Simulează Server Actions din React 19: o funcție `createAction(serverFn)` care returnează un async handler care poate fi apelat din client. Implementează un `saveUser` action.",
      code: "function createAction(serverFn) {\n  return async function action(formData) {\n    console.log('Executing server action...');\n    try {\n      const result = await serverFn(formData);\n      console.log('Action success:', result);\n      return { ok: true, data: result };\n    } catch(e) {\n      console.log('Action error:', e.message);\n      return { ok: false, error: e.message };\n    }\n  };\n}\n\nconst saveUser = createAction(async (data) => {\n  if (!data.name) throw new Error('Name required');\n  return { id: 1, ...data };\n});\n\nsaveUser({ name: 'Ana', email: 'ana@test.com' });\nsaveUser({});" },
  ],
  "react-server-components": [
    { name: "Server vs Client rendering",
      q: "Simulează diferența între Server Components și Client Components: server returnează date direct fără side effects, client poate folosi state/events. Scrie ambele versiuni pentru un 'UserProfile'.",
      code: "// Server Component — async, fara state\nasync function ServerUserProfile(userId) {\n  // Poate face fetch direct\n  const user = await Promise.resolve({ id: userId, name: 'Ana', role: 'Admin' });\n  return `<div>${user.name} (${user.role})</div>`;\n}\n\n// Client Component — cu state\nfunction ClientUserProfile(user) {\n  let isFollowing = false;\n  \n  function toggleFollow() {\n    isFollowing = !isFollowing;\n    console.log(isFollowing ? `Urmaresti pe ${user.name}` : 'Nu mai urmaresti');\n  }\n  \n  return { render: () => `${user.name}`, toggleFollow };\n}\n\nServerUserProfile(1).then(html => console.log('Server:', html));\nconst client = ClientUserProfile({ name: 'Ion' });\nconsole.log('Client:', client.render());\nclient.toggleFollow();\nclient.toggleFollow();" },
  ],
  "tanstack-query-avansat": [
    { name: "Infinite query simulat",
      q: "Simulează useInfiniteQuery: o funcție care gestionează paginarea automată. Implementează fetchPage(page) și loadMore(). Demonstrează cu 3 pagini de date.",
      code: "function createInfiniteQuery(fetchFn) {\n  const pages = [];\n  let currentPage = 0;\n  let hasMore = true;\n  \n  return {\n    async loadMore() {\n      if (!hasMore) { console.log('No more data'); return; }\n      const data = await fetchFn(currentPage);\n      if (data.length === 0) { hasMore = false; console.log('End of data'); return; }\n      pages.push(data);\n      currentPage++;\n      console.log(`Loaded page ${currentPage}:`, data);\n    },\n    getAllItems() {\n      return pages.flat();\n    }\n  };\n}\n\nconst allData = [[1,2,3],[4,5,6],[7,8,9],[]];\nconst query = createInfiniteQuery(page => Promise.resolve(allData[page] || []));\n\n(async () => {\n  await query.loadMore();\n  await query.loadMore();\n  await query.loadMore();\n  await query.loadMore();\n  console.log('Total items:', query.getAllItems().length);\n})();" },
  ],
  "react-hook-form-avansat": [
    { name: "Form state machine",
      q: "Implementează o state machine pentru un form multi-step: stările sunt 'idle', 'editing', 'validating', 'submitting', 'success', 'error'. Scrie tranziții valide și demonstrează un flow complet.",
      code: "const transitions = {\n  idle: ['editing'],\n  editing: ['validating', 'idle'],\n  validating: ['submitting', 'editing'],\n  submitting: ['success', 'error'],\n  success: ['idle'],\n  error: ['editing', 'idle'],\n};\n\nfunction createFormMachine() {\n  let state = 'idle';\n  return {\n    transition(next) {\n      if (transitions[state]?.includes(next)) {\n        console.log(`${state} -> ${next}`);\n        state = next;\n        return true;\n      }\n      console.log(`Invalid: ${state} -> ${next}`);\n      return false;\n    },\n    getState: () => state\n  };\n}\n\nconst form = createFormMachine();\nform.transition('editing');\nform.transition('validating');\nform.transition('submitting');\nform.transition('success');\nform.transition('idle');\nform.transition('error'); // invalid" },
  ],
  "react-testing-avansat": [
    { name: "Test utilities",
      q: "Creează un mini testing framework cu: test(name, fn), describe(name, fn), expect(val).toBe/.toEqual/.toThrow. Scrie teste pentru un array utility (map, filter, reduce).",
      code: "const results = { pass: 0, fail: 0 };\n\nfunction test(name, fn) {\n  try { fn(); results.pass++; console.log(`  PASS: ${name}`); }\n  catch(e) { results.fail++; console.log(`  FAIL: ${name} — ${e.message}`); }\n}\n\nfunction describe(name, fn) {\n  console.log(`\\n${name}`);\n  fn();\n}\n\nfunction expect(val) {\n  return {\n    toBe: (exp) => { if(val !== exp) throw new Error(`${val} !== ${exp}`); },\n    toEqual: (exp) => { if(JSON.stringify(val) !== JSON.stringify(exp)) throw new Error(`${JSON.stringify(val)} !== ${JSON.stringify(exp)}`); },\n    toThrow: (fn) => { try { fn(); throw new Error('Did not throw'); } catch(e) { if(e.message === 'Did not throw') throw e; } }\n  };\n}\n\ndescribe('Array utilities', () => {\n  test('map doubles values', () => {\n    expect([1,2,3].map(x=>x*2)).toEqual([2,4,6]);\n  });\n  test('filter removes evens', () => {\n    expect([1,2,3,4].filter(x=>x%2!==0)).toEqual([1,3]);\n  });\n  test('reduce sums', () => {\n    expect([1,2,3,4].reduce((a,b)=>a+b,0)).toBe(10);\n  });\n});\n\nconsole.log(`\\n${results.pass} passed, ${results.fail} failed`);" },
  ],
  "react-ecommerce-final": [
    { name: "E-commerce cart logic",
      q: "Implementează logica completă a unui cart de e-commerce: addItem(product), removeItem(id), updateQuantity(id, qty), clearCart(), getSubtotal(), getDiscount(code), getTotal(). Testează cu produse și un cupon.",
      code: "class Cart {\n  constructor() { this.items = []; this.discounts = { SAVE10: 0.1, SAVE20: 0.2 }; }\n  addItem(p) {\n    const existing = this.items.find(i => i.id === p.id);\n    if (existing) existing.qty++;\n    else this.items.push({ ...p, qty: 1 });\n  }\n  removeItem(id) { this.items = this.items.filter(i => i.id !== id); }\n  updateQty(id, qty) {\n    const item = this.items.find(i => i.id === id);\n    if (item) { if(qty<=0) this.removeItem(id); else item.qty = qty; }\n  }\n  getSubtotal() { return this.items.reduce((sum,i) => sum + i.price*i.qty, 0); }\n  getDiscount(code) { return (this.discounts[code] || 0) * this.getSubtotal(); }\n  getTotal(code) { return this.getSubtotal() - this.getDiscount(code); }\n}\n\nconst cart = new Cart();\ncart.addItem({ id:1, name:'Laptop', price:1200 });\ncart.addItem({ id:2, name:'Mouse', price:50 });\ncart.addItem({ id:1, name:'Laptop', price:1200 });\nconsole.log('Subtotal:', cart.getSubtotal());\nconsole.log('Discount SAVE10:', cart.getDiscount('SAVE10'));\nconsole.log('Total:', cart.getTotal('SAVE10'));" },
  ],
};

async function main() {
  console.log('Adăugare coding tasks React (batch 2)...');
  let added = 0, skipped = 0;

  for (const [slug, tasks] of Object.entries(TASKS)) {
    const lesson = await prisma.lesson.findFirst({ where: { slug } });
    if (!lesson) { console.log(`  [skip] ${slug} — negăsit`); skipped++; continue; }

    const existing = await prisma.task.count({ where: { lessonId: lesson.id, type: 'coding' } });
    if (existing >= 1) { console.log(`  [skip] ${slug} — are deja ${existing}`); skipped++; continue; }

    const maxTask = await prisma.task.findFirst({ where: { lessonId: lesson.id }, orderBy: { number: 'desc' } });
    let n = (maxTask?.number ?? 0) + 1;

    for (const t of tasks) {
      await prisma.task.create({
        data: {
          lessonId: lesson.id, number: n++,
          name: t.name, question: t.q,
          options: [], answer: '',
          explanation: '',
          difficulty: t.diff || 'medium',
          type: 'coding', language: 'javascript',
          starterCode: t.code || '',
          expectedOutput: '',
        },
      });
      added++;
    }
    console.log(`  [ok] ${slug} — ${tasks.length} tasks`);
  }

  console.log(`\nGata: ${added} adăugate, ${skipped} sărite.`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
