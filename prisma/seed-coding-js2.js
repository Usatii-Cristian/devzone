const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const TASKS = {
  "bucla-while-js": [
    { name: "While număr ghicit", difficulty: "easy",
      question: "Simulează un joc de ghicit: numărul secret e 7. Parcurge array-ul [3, 9, 7] cu un while și afișează 'Prea mic', 'Prea mare' sau 'Corect!' pentru fiecare încercare. Oprește-te la corect.",
      starterCode: "const secret = 7;\nconst attempts = [3, 9, 7];\nlet i = 0;\nwhile (i < attempts.length) {\n  const guess = attempts[i];\n  if (guess < secret) console.log(guess + ': Prea mic');\n  else if (guess > secret) console.log(guess + ': Prea mare');\n  else { console.log(guess + ': Corect!'); break; }\n  i++;\n}" },
    { name: "While cu accumulator", difficulty: "medium",
      question: "Calculează factorialul lui 10 folosind o buclă while. Afișează rezultatul.",
      starterCode: "let n = 10;\nlet result = 1;\nwhile (n > 1) {\n  result *= n;\n  n--;\n}\nconsole.log(result);" },
  ],
  "switch-case-js": [
    { name: "Calculator cu switch", difficulty: "easy",
      question: "Scrie o funcție `calculate(a, op, b)` care folosește switch pentru a returna rezultatul operației (+, -, *, /). Testează cu (10, '+', 5), (10, '*', 3), (10, '/', 0).",
      starterCode: "function calculate(a, op, b) {\n  switch(op) {\n    case '+': return a + b;\n    case '-': return a - b;\n    case '*': return a * b;\n    case '/':\n      if (b === 0) return 'Eroare: div/0';\n      return a / b;\n    default: return 'Operator necunoscut';\n  }\n}\nconsole.log(calculate(10, '+', 5));\nconsole.log(calculate(10, '*', 3));\nconsole.log(calculate(10, '/', 0));" },
    { name: "Ziua săptămânii", difficulty: "easy",
      question: "Scrie o funcție `dayName(n)` cu switch care returnează numele zilei (1=Luni...7=Duminică) sau 'Invalid'. Testează cu 1, 5, 7, 9.",
      starterCode: "function dayName(n) {\n  switch(n) {\n    case 1: return 'Luni';\n    case 2: return 'Marti';\n    case 3: return 'Miercuri';\n    case 4: return 'Joi';\n    case 5: return 'Vineri';\n    case 6: return 'Sambata';\n    case 7: return 'Duminica';\n    default: return 'Invalid';\n  }\n}\n[1,5,7,9].forEach(n => console.log(dayName(n)));" },
  ],
  "functii-avansate-js": [
    { name: "Curry function", difficulty: "hard",
      question: "Implementează `curry(fn)` care transformă o funcție cu n argumente în n funcții cuibărite. Testează cu add(a,b,c) = a+b+c și apelând curry(add)(1)(2)(3).",
      starterCode: "function curry(fn) {\n  return function curried(...args) {\n    if (args.length >= fn.length) return fn(...args);\n    return (...more) => curried(...args, ...more);\n  };\n}\n\nconst add = (a, b, c) => a + b + c;\nconst curriedAdd = curry(add);\nconsole.log(curriedAdd(1)(2)(3));\nconsole.log(curriedAdd(1, 2)(3));" },
    { name: "Compose", difficulty: "hard",
      question: "Implementează `compose(...fns)` care aplică funcțiile de la dreapta la stânga. Testează: compose(double, addOne, square)(3) — adaugă 1, ridică la pătrat, dublează.",
      starterCode: "const compose = (...fns) => x => fns.reduceRight((acc, fn) => fn(acc), x);\n\nconst double = x => x * 2;\nconst addOne = x => x + 1;\nconst square = x => x * x;\n\nconst transform = compose(double, square, addOne);\nconsole.log(transform(3));\nconsole.log(transform(5));" },
  ],
  "destructurare-spread-js": [
    { name: "Destructurare obiecte imbricate", difficulty: "medium",
      question: "Destructurează obiectul `user` pentru a extrage direct: firstName (din name.first), lastName (din name.last), city (din address.city). Afișează cu console.log.",
      starterCode: "const user = {\n  name: { first: 'Ana', last: 'Pop' },\n  address: { city: 'Cluj', zip: '400000' },\n  age: 28\n};\n\nconst { name: { first: firstName, last: lastName }, address: { city } } = user;\nconsole.log(firstName);\nconsole.log(lastName);\nconsole.log(city);" },
    { name: "Spread merge obiecte", difficulty: "easy",
      question: "Mergi obiectele `defaults = {theme:'light', lang:'ro', fontSize:14}` și `userPrefs = {theme:'dark', fontSize:16}`. userPrefs trebuie să suprascrie defaults. Afișează rezultatul final.",
      starterCode: "const defaults = { theme: 'light', lang: 'ro', fontSize: 14 };\nconst userPrefs = { theme: 'dark', fontSize: 16 };\nconst merged = { ...defaults, ...userPrefs };\nconsole.log(merged);" },
  ],
  "scope-closure-hoisting-js": [
    { name: "Closure counter", difficulty: "medium",
      question: "Scrie o funcție `createCounter(start = 0)` care returnează un obiect cu metodele `increment()`, `decrement()`, `reset()`, `value()`. Folosește closure pentru a stoca starea.",
      starterCode: "function createCounter(start = 0) {\n  let count = start;\n  return {\n    increment: () => ++count,\n    decrement: () => --count,\n    reset: () => { count = start; return count; },\n    value: () => count\n  };\n}\n\nconst c = createCounter(10);\nconsole.log(c.increment());\nconsole.log(c.increment());\nconsole.log(c.decrement());\nconsole.log(c.reset());\nconsole.log(c.value());" },
    { name: "IIFE și module pattern", difficulty: "hard",
      question: "Folosind un IIFE (Immediately Invoked Function Expression), creează un modul privat cu variabila `count` (inițial 0) și returnează un obiect cu metodele `add(n)` și `get()`. Testează apelând add(5), add(3), get().",
      starterCode: "const counter = (function() {\n  let count = 0;\n  return {\n    add: (n) => { count += n; },\n    get: () => count\n  };\n})();\n\ncounter.add(5);\ncounter.add(3);\nconsole.log(counter.get());" },
  ],
  "dom-querySelector-js": [
    { name: "Simulare DOM query", difficulty: "medium",
      question: "Simulează logica querySelector: scrie o funcție `findByClass(elements, className)` care caută în array-ul de elemente (obiecte cu proprietatea `classes`) și returnează primul care conține clasa dată.",
      starterCode: "function findByClass(elements, className) {\n  return elements.find(el => el.classes.includes(className)) || null;\n}\n\nconst elements = [\n  { tag: 'div', classes: ['container', 'main'], text: 'Main' },\n  { tag: 'p', classes: ['text', 'highlight'], text: 'Paragraf' },\n  { tag: 'span', classes: ['highlight'], text: 'Span' }\n];\n\nconst found = findByClass(elements, 'highlight');\nconsole.log(found.tag);\nconsole.log(found.text);" },
    { name: "Virtual DOM update", difficulty: "medium",
      question: "Simulează actualizarea DOM: ai un obiect `state = {count: 0}` și o funcție `render(state)` care afișează starea. Scrie funcțiile `increment()` și `decrement()` care actualizează state-ul și apelează render. Testează de 3 ori.",
      starterCode: "let state = { count: 0 };\n\nfunction render(s) {\n  console.log('Count:', s.count);\n}\n\nfunction increment() {\n  state = { ...state, count: state.count + 1 };\n  render(state);\n}\n\nfunction decrement() {\n  state = { ...state, count: state.count - 1 };\n  render(state);\n}\n\nincrement();\nincrement();\ndecrement();" },
  ],
  "dom-events-js": [
    { name: "Event delegation simulat", difficulty: "medium",
      question: "Simulează event delegation: creează o funcție `handleClick(target, handlers)` unde `handlers` e un obiect `{selector: callback}`. Dacă target.class include selectorul, apelează callback. Testează cu 2 handlere.",
      starterCode: "function handleClick(target, handlers) {\n  for (const [selector, callback] of Object.entries(handlers)) {\n    if (target.classes.includes(selector)) {\n      callback(target);\n    }\n  }\n}\n\nhandleClick(\n  { tag: 'button', classes: ['btn', 'submit'], text: 'Submit' },\n  {\n    btn: (el) => console.log('Buton apăsat:', el.text),\n    submit: (el) => console.log('Form submit:', el.text)\n  }\n);" },
    { name: "Custom event emitter", difficulty: "hard",
      question: "Implementează o clasă `EventEmitter` cu `on(event, fn)`, `off(event, fn)`, `emit(event, ...args)`. Testează adăugând 2 listeneri, emițând evenimentul, apoi scoțând unul și emițând din nou.",
      starterCode: "class EventEmitter {\n  constructor() { this.events = {}; }\n  on(event, fn) {\n    if (!this.events[event]) this.events[event] = [];\n    this.events[event].push(fn);\n  }\n  off(event, fn) {\n    this.events[event] = (this.events[event] || []).filter(f => f !== fn);\n  }\n  emit(event, ...args) {\n    (this.events[event] || []).forEach(fn => fn(...args));\n  }\n}\n\nconst emitter = new EventEmitter();\nconst fn1 = (x) => console.log('Listener 1:', x);\nconst fn2 = (x) => console.log('Listener 2:', x);\nemitter.on('data', fn1);\nemitter.on('data', fn2);\nemitter.emit('data', 'hello');\nemitter.off('data', fn1);\nemitter.emit('data', 'world');" },
  ],
  "fetch-promise-js": [
    { name: "Promise chain", difficulty: "medium",
      question: "Creează o funcție `fetchUser(id)` care returnează o Promise. Dacă id=1 rezolvă cu {name:'Ana', role:'admin'}, altfel respinge cu 'User not found'. Înlănțuiește cu .then() și .catch(). Testează cu id=1 și id=99.",
      starterCode: "function fetchUser(id) {\n  return new Promise((resolve, reject) => {\n    if (id === 1) resolve({ name: 'Ana', role: 'admin' });\n    else reject('User not found');\n  });\n}\n\nfetchUser(1)\n  .then(user => console.log(user.name, '-', user.role))\n  .catch(err => console.log('Eroare:', err));\n\nfetchUser(99)\n  .then(user => console.log(user.name))\n  .catch(err => console.log('Eroare:', err));" },
    { name: "Promise.all", difficulty: "medium",
      question: "Creează 3 Promise-uri care rezolvă cu valorile 1, 2, 3 după 0ms. Folosind Promise.all(), afișează suma lor.",
      starterCode: "const p1 = Promise.resolve(1);\nconst p2 = Promise.resolve(2);\nconst p3 = Promise.resolve(3);\n\nPromise.all([p1, p2, p3])\n  .then(values => {\n    const sum = values.reduce((a, b) => a + b, 0);\n    console.log('Suma:', sum);\n  });" },
  ],
  "async-await-js": [
    { name: "Async/await cu erori", difficulty: "medium",
      question: "Scrie o funcție async `loadData(url)` care: dacă url conține '/valid' returnează {data: 'OK'}, altfel aruncă un Error. Folosind try/catch în altă funcție async, testează cu '/valid' și '/invalid'.",
      starterCode: "async function loadData(url) {\n  if (url.includes('/valid')) return { data: 'OK' };\n  throw new Error('URL invalid');\n}\n\nasync function main() {\n  try {\n    const result = await loadData('/valid');\n    console.log(result.data);\n  } catch(e) {\n    console.log('Eroare:', e.message);\n  }\n  \n  try {\n    const result = await loadData('/invalid');\n    console.log(result.data);\n  } catch(e) {\n    console.log('Eroare:', e.message);\n  }\n}\n\nmain();" },
    { name: "Sequential vs parallel async", difficulty: "hard",
      question: "Scrie funcții async: `delay(ms, value)` returnează value după ms milisecunde. Compară sequential (await fiecare separat) vs parallel (Promise.all). Măsoară timpul cu Date.now(). Afișează valorile și durata aproximativă.",
      starterCode: "async function delay(ms, value) {\n  return new Promise(resolve => setTimeout(() => resolve(value), ms));\n}\n\nasync function main() {\n  // Sequential\n  let start = Date.now();\n  const a = await delay(10, 'A');\n  const b = await delay(10, 'B');\n  console.log('Sequential:', [a, b], 'timp:', Date.now() - start, 'ms');\n  \n  // Parallel\n  start = Date.now();\n  const [c, d] = await Promise.all([delay(10, 'C'), delay(10, 'D')]);\n  console.log('Parallel:', [c, d], 'timp:', Date.now() - start, 'ms');\n}\n\nmain();" },
  ],
  "try-catch-erori-js": [
    { name: "Error handling robust", difficulty: "medium",
      question: "Scrie o funcție `parseJSON(str)` care încearcă să parseze un JSON string. Dacă e invalid returnează null și loghează eroarea. Dacă rezultatul nu are proprietatea 'id', aruncă un Error custom. Testează cu JSON valid, invalid și fără id.",
      starterCode: "function parseJSON(str) {\n  try {\n    const data = JSON.parse(str);\n    if (!data.id) throw new Error('Missing id field');\n    return data;\n  } catch(e) {\n    if (e instanceof SyntaxError) {\n      console.log('JSON invalid:', e.message.split(' ')[0]);\n      return null;\n    }\n    console.log('Validare:', e.message);\n    return null;\n  }\n}\n\nconsole.log(parseJSON('{\"id\":1,\"name\":\"Ana\"}'));\nparseJSON('{invalid}');\nparseJSON('{\"name\":\"fara-id\"}');" },
  ],
  "clase-oop-js": [
    { name: "Clasă LinkedList", difficulty: "hard",
      question: "Implementează o clasă `LinkedList` cu metodele `push(val)`, `pop()`, `toArray()`. Fiecare nod are `value` și `next`. Testează adăugând 3 valori, pop-uind una, și afișând array-ul final.",
      starterCode: "class Node {\n  constructor(value) {\n    this.value = value;\n    this.next = null;\n  }\n}\n\nclass LinkedList {\n  constructor() { this.head = null; this.size = 0; }\n  \n  push(val) {\n    const node = new Node(val);\n    if (!this.head) { this.head = node; }\n    else {\n      let curr = this.head;\n      while (curr.next) curr = curr.next;\n      curr.next = node;\n    }\n    this.size++;\n  }\n  \n  pop() {\n    if (!this.head) return null;\n    if (!this.head.next) { const val = this.head.value; this.head = null; this.size--; return val; }\n    let curr = this.head;\n    while (curr.next.next) curr = curr.next;\n    const val = curr.next.value;\n    curr.next = null;\n    this.size--;\n    return val;\n  }\n  \n  toArray() {\n    const arr = [];\n    let curr = this.head;\n    while (curr) { arr.push(curr.value); curr = curr.next; }\n    return arr;\n  }\n}\n\nconst list = new LinkedList();\nlist.push(1);\nlist.push(2);\nlist.push(3);\nconsole.log(list.pop());\nconsole.log(list.toArray());" },
    { name: "Mixins", difficulty: "medium",
      question: "Implementează mixin-uri în JavaScript: `Serializable` cu metodele `serialize()` (returnează JSON) și `Loggable` cu `log()` (afișează clasa și datele). Aplică-le pe clasa `User`.",
      starterCode: "const Serializable = (Base) => class extends Base {\n  serialize() { return JSON.stringify(this); }\n};\n\nconst Loggable = (Base) => class extends Base {\n  log() { console.log(this.constructor.name + ':', JSON.stringify(this)); }\n};\n\nclass User extends Serializable(Loggable(class {})) {\n  constructor(name, email) {\n    super();\n    this.name = name;\n    this.email = email;\n  }\n}\n\nconst u = new User('Ana', 'ana@test.com');\nu.log();\nconsole.log(u.serialize());" },
  ],
  "modules-import-export-js": [
    { name: "Simulare module system", difficulty: "medium",
      question: "Simulează un module system: creează un obiect `mathUtils` cu funcțiile `add`, `subtract`, `multiply`, `divide`. Exportează-le destructurat. Testează toate cu (10, 2).",
      starterCode: "const mathUtils = {\n  add: (a, b) => a + b,\n  subtract: (a, b) => a - b,\n  multiply: (a, b) => a * b,\n  divide: (a, b) => b !== 0 ? a / b : 'Err'\n};\n\nconst { add, subtract, multiply, divide } = mathUtils;\n\nconsole.log(add(10, 2));\nconsole.log(subtract(10, 2));\nconsole.log(multiply(10, 2));\nconsole.log(divide(10, 2));" },
  ],
  "modern-js-es6plus": [
    { name: "Optional chaining și nullish", difficulty: "easy",
      question: "Folosind optional chaining (?.) și nullish coalescing (??), extrage safe valori din obiectul `data` care poate fi null. Afișează fiecare valoare.",
      starterCode: "const data = {\n  user: {\n    name: 'Ana',\n    address: null\n  }\n};\n\nconsole.log(data?.user?.name ?? 'Necunoscut');\nconsole.log(data?.user?.address?.city ?? 'Oraș nespecificat');\nconsole.log(data?.settings?.theme ?? 'light');" },
    { name: "Proxy și Reflect", difficulty: "hard",
      question: "Creează un Proxy pentru obiectul `product` care: loghează fiecare get ('Getting: key'), loghează fiecare set ('Setting key = value'), și previne setarea unui preț negativ. Testează cu get și set.",
      starterCode: "const product = { name: 'Laptop', price: 1000 };\n\nconst handler = {\n  get(target, key) {\n    console.log('Getting:', key);\n    return Reflect.get(target, key);\n  },\n  set(target, key, value) {\n    if (key === 'price' && value < 0) {\n      console.log('Pret negativ interzis!');\n      return false;\n    }\n    console.log('Setting', key, '=', value);\n    return Reflect.set(target, key, value);\n  }\n};\n\nconst proxy = new Proxy(product, handler);\nconsole.log(proxy.name);\nproxy.price = 1200;\nproxy.price = -50;" },
  ],
  "typescript-basics": [
    { name: "Tipuri TypeScript simulate", difficulty: "medium",
      question: "Simulează tipurile TypeScript în JS: scrie o funcție `typedFunction(name, age)` care validează că name e string și age e number pozitiv, altfel aruncă TypeError cu mesaj clar. Testează cu date valide și invalide.",
      starterCode: "function typedFunction(name, age) {\n  if (typeof name !== 'string') throw new TypeError('name trebuie sa fie string');\n  if (typeof age !== 'number' || age < 0) throw new TypeError('age trebuie sa fie number pozitiv');\n  return `${name} are ${age} ani`;\n}\n\nconsole.log(typedFunction('Ana', 25));\ntry { typedFunction(123, 25); } catch(e) { console.log(e.message); }\ntry { typedFunction('Ion', -5); } catch(e) { console.log(e.message); }" },
  ],
  "web-apis-moderne": [
    { name: "Intersection Observer simulat", difficulty: "medium",
      question: "Simulează logica unui Intersection Observer: ai o funcție `observeVisibility(elements, threshold)`. Consideră că un element e 'vizibil' dacă proprietatea sa `visibilityRatio` >= threshold. Afișează elementele vizibile.",
      starterCode: "function observeVisibility(elements, threshold) {\n  return elements.filter(el => el.visibilityRatio >= threshold);\n}\n\nconst elements = [\n  { id: 'header', visibilityRatio: 1.0 },\n  { id: 'content', visibilityRatio: 0.6 },\n  { id: 'footer', visibilityRatio: 0.1 },\n];\n\nconst visible = observeVisibility(elements, 0.5);\nvisible.forEach(el => console.log(el.id, 'este vizibil'));" },
  ],
  "design-patterns-js": [
    { name: "Factory Pattern", difficulty: "hard",
      question: "Implementează Factory Pattern: o funcție `createAnimal(type, name)` care returnează un obiect cu metoda `speak()` diferit pentru 'dog' (Ham!), 'cat' (Miau!) și 'bird' (Ciripici!). Testează cu toate 3.",
      starterCode: "function createAnimal(type, name) {\n  const sounds = { dog: 'Ham!', cat: 'Miau!', bird: 'Ciripici!' };\n  return {\n    name,\n    type,\n    speak() {\n      console.log(`${this.name} zice: ${sounds[type] || '...'}`);\n    }\n  };\n}\n\nconst dog = createAnimal('dog', 'Rex');\nconst cat = createAnimal('cat', 'Whiskers');\nconst bird = createAnimal('bird', 'Tweety');\ndog.speak();\ncat.speak();\nbird.speak();" },
    { name: "Strategy Pattern", difficulty: "hard",
      question: "Implementează Strategy Pattern pentru sortare: o clasă `Sorter` cu metodă `sort(arr, strategy)`. Strategii: 'bubble' (afișează 'Bubble sort') și 'quick' (afișează 'Quick sort'), ambele returnând array-ul sortat.",
      starterCode: "const strategies = {\n  bubble: (arr) => {\n    console.log('Bubble sort');\n    return [...arr].sort((a, b) => a - b);\n  },\n  quick: (arr) => {\n    console.log('Quick sort');\n    return [...arr].sort((a, b) => a - b);\n  }\n};\n\nfunction sort(arr, strategy) {\n  return (strategies[strategy] || strategies.bubble)(arr);\n}\n\nconsole.log(sort([3,1,4,1,5], 'bubble'));\nconsole.log(sort([9,2,6,5,3], 'quick'));" },
  ],
  "functional-programming-js": [
    { name: "Pipeline de transformări", difficulty: "hard",
      question: "Scrie o funcție `pipe(...fns)` care aplică funcțiile de la stânga la dreapta. Creează un pipeline: filtrează numerele pare, înmulțește cu 3, ia primele 4. Aplică pe [1..10].",
      starterCode: "const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);\n\nconst filterEven = arr => arr.filter(n => n % 2 === 0);\nconst multiplyBy3 = arr => arr.map(n => n * 3);\nconst take4 = arr => arr.slice(0, 4);\n\nconst transform = pipe(filterEven, multiplyBy3, take4);\nconsole.log(transform([1,2,3,4,5,6,7,8,9,10]));" },
  ],
  "typescript-avansat": [
    { name: "Tipuri condiționale simulate", difficulty: "hard",
      question: "Simulează tipuri condiționale TS în JS: scrie `ensureArray(val)` care dacă `val` e array îl returnează, altfel îl pune într-un array. Scrie `flatten(val)` care face același lucru recursiv. Testează cu diverse valori.",
      starterCode: "function ensureArray(val) {\n  return Array.isArray(val) ? val : [val];\n}\n\nfunction flatten(val) {\n  if (!Array.isArray(val)) return [val];\n  return val.reduce((acc, item) => acc.concat(flatten(item)), []);\n}\n\nconsole.log(ensureArray(5));\nconsole.log(ensureArray([1,2,3]));\nconsole.log(flatten([1, [2, [3, [4]]], 5]));" },
  ],
  "js-mini-proiect": [
    { name: "Trie data structure", difficulty: "hard",
      question: "Implementează un Trie (prefix tree) cu metodele `insert(word)` și `search(word)` și `startsWith(prefix)`. Inserează ['apple','app','application'] și testează search('app'), search('apt'), startsWith('appl').",
      starterCode: "class TrieNode {\n  constructor() { this.children = {}; this.isEnd = false; }\n}\n\nclass Trie {\n  constructor() { this.root = new TrieNode(); }\n  \n  insert(word) {\n    let node = this.root;\n    for (const ch of word) {\n      if (!node.children[ch]) node.children[ch] = new TrieNode();\n      node = node.children[ch];\n    }\n    node.isEnd = true;\n  }\n  \n  search(word) {\n    let node = this.root;\n    for (const ch of word) {\n      if (!node.children[ch]) return false;\n      node = node.children[ch];\n    }\n    return node.isEnd;\n  }\n  \n  startsWith(prefix) {\n    let node = this.root;\n    for (const ch of prefix) {\n      if (!node.children[ch]) return false;\n      node = node.children[ch];\n    }\n    return true;\n  }\n}\n\nconst trie = new Trie();\n['apple', 'app', 'application'].forEach(w => trie.insert(w));\nconsole.log(trie.search('app'));\nconsole.log(trie.search('apt'));\nconsole.log(trie.startsWith('appl'));" },
  ],
  "indexeddb-cache-api": [
    { name: "Cache simplu LRU", difficulty: "hard",
      question: "Implementează un cache LRU (Least Recently Used) cu capacitate fixă. Când e plin, elimină elementul cel mai vechi. Metodele: `get(key)` și `set(key, value)`. Testează cu capacitate 3 și 5 set-uri.",
      starterCode: "class LRUCache {\n  constructor(capacity) {\n    this.capacity = capacity;\n    this.cache = new Map();\n  }\n  \n  get(key) {\n    if (!this.cache.has(key)) return -1;\n    const val = this.cache.get(key);\n    this.cache.delete(key);\n    this.cache.set(key, val);\n    return val;\n  }\n  \n  set(key, value) {\n    if (this.cache.has(key)) this.cache.delete(key);\n    else if (this.cache.size >= this.capacity) {\n      this.cache.delete(this.cache.keys().next().value);\n    }\n    this.cache.set(key, value);\n  }\n}\n\nconst cache = new LRUCache(3);\ncache.set('a', 1);\ncache.set('b', 2);\ncache.set('c', 3);\ncache.get('a');\ncache.set('d', 4);\nconsole.log(cache.get('b'));\nconsole.log(cache.get('a'));" },
  ],
  "canvas-api": [
    { name: "Algoritm de desenat", difficulty: "medium",
      question: "Simulează desenarea pe canvas: creează o matrice 5x5 (grid de pixeli). Scrie funcții `setPixel(grid, x, y, color)` și `drawRect(grid, x, y, w, h, color)`. Desenează un dreptunghi și afișează grid-ul ca text.",
      starterCode: "function createGrid(size) {\n  return Array.from({length: size}, () => Array(size).fill('.'));\n}\n\nfunction drawRect(grid, x, y, w, h, char) {\n  for (let row = y; row < y + h; row++)\n    for (let col = x; col < x + w; col++)\n      if (row < grid.length && col < grid[0].length)\n        grid[row][col] = char;\n}\n\nconst grid = createGrid(5);\ndrawRect(grid, 1, 1, 3, 2, '#');\ngrid.forEach(row => console.log(row.join('')));" },
  ],
  "javascript-performance": [
    { name: "Benchmark comparativ", difficulty: "medium",
      question: "Compară performanța a 3 metode de eliminare duplicate: Set, filter+indexOf, reduce. Rulează-le pe un array de 1000 elemente cu ~50% duplicate. Afișează durata fiecăreia cu console.time/timeEnd.",
      starterCode: "const arr = Array.from({length: 1000}, (_, i) => i % 500);\n\nconsole.time('Set');\nconst r1 = [...new Set(arr)];\nconsole.timeEnd('Set');\n\nconsole.time('filter');\nconst r2 = arr.filter((v, i) => arr.indexOf(v) === i);\nconsole.timeEnd('filter');\n\nconsole.time('reduce');\nconst r3 = arr.reduce((acc, v) => acc.includes(v) ? acc : [...acc, v], []);\nconsole.timeEnd('reduce');\n\nconsole.log('Rezultate egale:', r1.length === r2.length && r2.length === r3.length);" },
  ],
  "web-workers": [
    { name: "Calcul paralel simulat", difficulty: "medium",
      question: "Simulează Web Workers cu setTimeout: pornește 3 'taskuri' paralele, fiecare calculând suma unui sub-array. Când toate sunt gata (Promise.all), afișează suma totală.",
      starterCode: "function workerTask(subArray) {\n  return new Promise(resolve => {\n    setTimeout(() => resolve(subArray.reduce((a, b) => a + b, 0)), 0);\n  });\n}\n\nconst data = [1,2,3,4,5,6,7,8,9,10,11,12];\nconst chunk = 4;\nconst tasks = [];\nfor (let i = 0; i < data.length; i += chunk) {\n  tasks.push(workerTask(data.slice(i, i + chunk)));\n}\n\nPromise.all(tasks).then(results => {\n  console.log('Sume parțiale:', results);\n  console.log('Total:', results.reduce((a, b) => a + b, 0));\n});" },
  ],
  "websockets-sse": [
    { name: "Simulare WebSocket mesaje", difficulty: "medium",
      question: "Simulează un WebSocket cu un EventEmitter: creează `MockWebSocket` cu metodele `send(msg)` și `onmessage` callback. Simulează 3 mesaje primite de la server folosind setTimeout. Afișează fiecare mesaj primit.",
      starterCode: "class MockWebSocket {\n  constructor() {\n    this.onmessage = null;\n    this._simulate();\n  }\n  \n  _simulate() {\n    const messages = ['Conectat', 'Date: {value: 42}', 'Deconectat'];\n    messages.forEach((msg, i) => {\n      setTimeout(() => {\n        if (this.onmessage) this.onmessage({ data: msg });\n      }, i * 10);\n    });\n  }\n  \n  send(msg) {\n    console.log('Trimis:', msg);\n  }\n}\n\nconst ws = new MockWebSocket();\nws.onmessage = (event) => console.log('Primit:', event.data);\nws.send('Hello server');" },
  ],
};

async function main() {
  console.log('Adăugare coding tasks JavaScript (batch 2)...');
  let added = 0, skipped = 0;

  for (const [slug, tasks] of Object.entries(TASKS)) {
    const lesson = await prisma.lesson.findFirst({ where: { slug } });
    if (!lesson) { console.log(`  [skip] ${slug} — negăsit`); skipped++; continue; }

    const existing = await prisma.task.count({ where: { lessonId: lesson.id, type: 'coding' } });
    if (existing >= 2) { console.log(`  [skip] ${slug} — are deja ${existing}`); skipped++; continue; }

    const maxTask = await prisma.task.findFirst({ where: { lessonId: lesson.id }, orderBy: { number: 'desc' } });
    let n = (maxTask?.number ?? 0) + 1;

    for (const t of tasks) {
      await prisma.task.create({
        data: {
          lessonId: lesson.id, number: n++,
          name: t.name, question: t.question,
          options: [], answer: '',
          explanation: t.explanation || '',
          difficulty: t.difficulty || 'medium',
          type: 'coding', language: 'javascript',
          starterCode: t.starterCode || '',
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
