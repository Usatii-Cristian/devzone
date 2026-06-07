"use strict";
require("dotenv").config({ path: ".env" });
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Tasks numbered 6-10 = fillblank, 11-15 = coding (javascript)
// Each FIXES entry replaces tasks >= 6 for that lesson.

const FIXES = [
  {
    lessonId: "69fb25cca7657a7d121f06c5",
    name: "2. Componente și Props",
    tasks: [
      // fillblank 6-10
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează: o componentă funcțională primește datele prin ___.",
        options: [], answer: "props",
        starterCode: "", language: "javascript", expectedOutput: "",
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează: pentru a destrucura props în parametru scriem `function Card({ ___, description })`.",
        options: [], answer: "title",
        starterCode: "", language: "javascript", expectedOutput: "",
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează: prop special care conține elementele JSX copil se numește ___.",
        options: [], answer: "children",
        starterCode: "", language: "javascript", expectedOutput: "",
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează: valoarea implicită a unui prop se setează cu sintaxa `function Btn({ label = ___ })`.",
        options: [], answer: "'Click'",
        starterCode: "", language: "javascript", expectedOutput: "",
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează: pentru a pasa toate props mai departe folosim sintaxa spread `<Comp ___props />`.",
        options: [], answer: "{...}",
        starterCode: "", language: "javascript", expectedOutput: "",
      },
      // coding 11-15
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Creează o funcție `UserCard` care primește props `{ name, role }` și afișează cu console.log() mesajul: `Utilizator: {name} | Rol: {role}`. Testează cu name='Ana' și role='Admin'.",
        starterCode: "function UserCard({ name, role }) {\n  // afișează datele utilizatorului\n}\n\nUserCard({ name: 'Ana', role: 'Admin' });",
        language: "javascript", expectedOutput: "Utilizator: Ana | Rol: Admin",
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Creează o funcție `Greeting` cu prop `name` și valoare implicită `'Vizitator'`. Afișează `Bună ziua, {name}!` cu console.log(). Testează cu 'Maria' și fără argument.",
        starterCode: "function Greeting({ name = 'Vizitator' }) {\n  // afișează salutul\n}\n\nGreeting({ name: 'Maria' });\nGreeting({});",
        language: "javascript", expectedOutput: "Bună ziua, Maria!\nBună ziua, Vizitator!",
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Creează o funcție `ProductList` care primește un array `products` și afișează cu console.log() fiecare produs în formatul `- {name}: {price} RON`. Testează cu 3 produse.",
        starterCode: "function ProductList({ products }) {\n  products.forEach(p => {\n    // afișează fiecare produs\n  });\n}\n\nProductList({ products: [\n  { name: 'Laptop', price: 3000 },\n  { name: 'Mouse', price: 80 },\n  { name: 'Tastatură', price: 150 }\n] });",
        language: "javascript", expectedOutput: "- Laptop: 3000 RON\n- Mouse: 80 RON\n- Tastatură: 150 RON",
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Creează o funcție `Badge` cu props `{ text, variant }`. Afișează `[{variant}] {text}` cu console.log(). Variant poate fi 'success', 'error' sau 'info'. Testează cu toate variantele.",
        starterCode: "function Badge({ text, variant }) {\n  // afișează badge-ul formatat\n}\n\nBadge({ text: 'Salvat', variant: 'success' });\nBadge({ text: 'Eroare', variant: 'error' });\nBadge({ text: 'Info', variant: 'info' });",
        language: "javascript", expectedOutput: "[success] Salvat\n[error] Eroare\n[info] Info",
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Creează o funcție `Container` care primește `children` (un array de stringuri) și `title`. Afișează titlul urmat de fiecare child cu console.log(). Testează cu titlul 'Lista mea' și 3 elemente copil.",
        starterCode: "function Container({ title, children }) {\n  console.log(title + ':');\n  children.forEach(child => console.log('  ' + child));\n}\n\nContainer({ title: 'Lista mea', children: ['Element 1', 'Element 2', 'Element 3'] });",
        language: "javascript", expectedOutput: "Lista mea:\n  Element 1\n  Element 2\n  Element 3",
      },
    ],
  },

  {
    lessonId: "69fb25d1a7657a7d121f06e9",
    name: "5. Event Handlers",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează: în React, un event handler pentru click se atașează cu prop-ul ___.",
        options: [], answer: "onClick",
        starterCode: "", language: "javascript", expectedOutput: "",
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează: pentru a preveni comportamentul implicit al unui eveniment apelăm `event.___()` .",
        options: [], answer: "preventDefault",
        starterCode: "", language: "javascript", expectedOutput: "",
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează: pentru a pasa un argument unui handler fără execuție imediată folosim o funcție ___.",
        options: [], answer: "arrow",
        starterCode: "", language: "javascript", expectedOutput: "",
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează: evenimentul declanșat la modificarea unui input este ___.",
        options: [], answer: "onChange",
        starterCode: "", language: "javascript", expectedOutput: "",
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează: pentru a opri propagarea unui eveniment apelăm `event.___()` .",
        options: [], answer: "stopPropagation",
        starterCode: "", language: "javascript", expectedOutput: "",
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Simulează un event handler: creează o funcție `handleClick(event)` care primește un obiect event cu proprietatea `target.value`. Afișează cu console.log() `Click pe: {value}`. Apelează funcția cu `{ target: { value: 'Buton Submit' } }`.",
        starterCode: "function handleClick(event) {\n  // afișează valoarea din event\n}\n\nhandleClick({ target: { value: 'Buton Submit' } });",
        language: "javascript", expectedOutput: "Click pe: Buton Submit",
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Creează o funcție `handleInputChange` care primește valoarea nouă și afișează `Input schimbat: {valoare}`. Creează o funcție `handleSubmit` care afișează `Formular trimis cu: {valoare}`. Simulează un flux: input change cu 'React', apoi submit.",
        starterCode: "let inputValue = '';\n\nfunction handleInputChange(value) {\n  inputValue = value;\n  console.log('Input schimbat:', value);\n}\n\nfunction handleSubmit() {\n  console.log('Formular trimis cu:', inputValue);\n}\n\nhandleInputChange('React');\nhandleSubmit();",
        language: "javascript", expectedOutput: "Input schimbat: React\nFormular trimis cu: React",
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Creează o funcție `makeHandler(action)` care returnează o funcție. Când returnata e apelată cu un argument `data`, afișează `Acțiune: {action} | Date: {data}`. Creează handlers pentru 'delete' și 'edit', testează-le.",
        starterCode: "function makeHandler(action) {\n  return function(data) {\n    console.log(`Acțiune: ${action} | Date: ${data}`);\n  };\n}\n\nconst handleDelete = makeHandler('delete');\nconst handleEdit = makeHandler('edit');\nhandleDelete('user-42');\nhandleEdit('post-7');",
        language: "javascript", expectedOutput: "Acțiune: delete | Date: user-42\nAcțiune: edit | Date: post-7",
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Creează un sistem de butoane cu stare: un counter și două funcții `increment()` și `decrement()`. La fiecare apel afișează `Counter: {valoare}`. Simulează: increment de 3 ori, decrement o dată.",
        starterCode: "let counter = 0;\n\nfunction increment() {\n  counter++;\n  console.log('Counter:', counter);\n}\n\nfunction decrement() {\n  counter--;\n  console.log('Counter:', counter);\n}\n\nincrement();\nincrement();\nincrement();\ndecrement();",
        language: "javascript", expectedOutput: "Counter: 1\nCounter: 2\nCounter: 3\nCounter: 2",
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Simulează event bubbling: creează funcțiile `handleChildClick()` și `handleParentClick()`. Child afișează 'Child clicked', parent afișează 'Parent clicked'. Simulează că un click pe child propagă și la parent apelând ambele funcții.",
        starterCode: "function handleChildClick() {\n  console.log('Child clicked');\n}\n\nfunction handleParentClick() {\n  console.log('Parent clicked');\n}\n\n// simulează propagarea\nfunction simulateClick() {\n  handleChildClick();\n  handleParentClick();\n}\n\nsimulateClick();",
        language: "javascript", expectedOutput: "Child clicked\nParent clicked",
      },
    ],
  },

  {
    lessonId: "69fb25d2a7657a7d121f06f5",
    name: "6. Liste și Keys",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează: pentru a randa o listă în React folosim metoda array ___ care returnează JSX.",
        options: [], answer: ".map()",
        starterCode: "", language: "javascript", expectedOutput: "",
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează: prop-ul special `key` trebuie să fie ___ în cadrul listei.",
        options: [], answer: "unic",
        starterCode: "", language: "javascript", expectedOutput: "",
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează: folosirea index-ului ca key este considerată rea practică deoarece poate cauza probleme la ___.",
        options: [], answer: "reordonare",
        starterCode: "", language: "javascript", expectedOutput: "",
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează: metoda array `___` returnează doar elementele care îndeplinesc o condiție.",
        options: [], answer: ".filter()",
        starterCode: "", language: "javascript", expectedOutput: "",
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează: pentru a sorta un array de numere crescător folosim `.sort((a, b) => a ___ b)`.",
        options: [], answer: "-",
        starterCode: "", language: "javascript", expectedOutput: "",
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Ai un array de tehnologii: `['React', 'Vue', 'Angular', 'Svelte']`. Folosind `.map()` creează un array de stringuri în formatul `'[{index+1}] {tech}'` și afișează fiecare cu console.log().",
        starterCode: "const technologies = ['React', 'Vue', 'Angular', 'Svelte'];\n\nconst list = technologies.map((tech, index) => `[${index + 1}] ${tech}`);\nlist.forEach(item => console.log(item));",
        language: "javascript", expectedOutput: "[1] React\n[2] Vue\n[3] Angular\n[4] Svelte",
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Filtrează un array de produse după preț. Afișează cu console.log() produsele cu prețul > 100, fiecare pe un rând în formatul `{name}: {price} RON`.",
        starterCode: "const products = [\n  { id: 1, name: 'Laptop', price: 3000 },\n  { id: 2, name: 'Mouse', price: 50 },\n  { id: 3, name: 'Monitor', price: 800 },\n  { id: 4, name: 'Cablu USB', price: 20 },\n  { id: 5, name: 'Tastatură', price: 200 }\n];\n\nproducts\n  .filter(p => p.price > 100)\n  .forEach(p => console.log(`${p.name}: ${p.price} RON`));",
        language: "javascript", expectedOutput: "Laptop: 3000 RON\nMonitor: 800 RON\nTabletă: 200 RON",
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Sortează un array de useri după nume (alfabetic) și afișează-i cu console.log() în formatul `{index+1}. {name}`.",
        starterCode: "const users = [\n  { id: 3, name: 'Mihai' },\n  { id: 1, name: 'Ana' },\n  { id: 4, name: 'Zoe' },\n  { id: 2, name: 'Bogdan' }\n];\n\nusers\n  .sort((a, b) => a.name.localeCompare(b.name))\n  .forEach((u, i) => console.log(`${i + 1}. ${u.name}`));",
        language: "javascript", expectedOutput: "1. Ana\n2. Bogdan\n3. Mihai\n4. Zoe",
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Creează o funcție `renderTodoList(todos)` care afișează fiecare todo cu statusul: `[✓] {text}` dacă e completat, `[ ] {text}` dacă nu. Testează cu un array de 4 todos (2 complete, 2 incomplete).",
        starterCode: "function renderTodoList(todos) {\n  todos.forEach(todo => {\n    const status = todo.done ? '[✓]' : '[ ]';\n    console.log(`${status} ${todo.text}`);\n  });\n}\n\nrenderTodoList([\n  { text: 'Învată React', done: true },\n  { text: 'Fă tema', done: false },\n  { text: 'Citit documentație', done: true },\n  { text: 'Proiect final', done: false }\n]);",
        language: "javascript", expectedOutput: "[✓] Învată React\n[ ] Fă tema\n[✓] Citit documentație\n[ ] Proiect final",
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Grupează un array de task-uri după prioritate (high/medium/low) și afișează câte task-uri are fiecare grup cu console.log() în formatul `{prioritate}: {count} task-uri`.",
        starterCode: "const tasks = [\n  { name: 'Bug fix', priority: 'high' },\n  { name: 'Feature nou', priority: 'medium' },\n  { name: 'Refactor', priority: 'low' },\n  { name: 'Deploy', priority: 'high' },\n  { name: 'Docs', priority: 'low' }\n];\n\nconst grouped = tasks.reduce((acc, t) => {\n  acc[t.priority] = (acc[t.priority] || 0) + 1;\n  return acc;\n}, {});\n\nObject.entries(grouped).forEach(([p, c]) => console.log(`${p}: ${c} task-uri`));",
        language: "javascript", expectedOutput: "high: 2 task-uri\nmedium: 1 task-uri\nlow: 2 task-uri",
      },
    ],
  },

  {
    lessonId: "69fb25d8a7657a7d121f0719",
    name: "9. Custom Hooks",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează: custom hooks în React trebuie să înceapă cu prefixul ___.",
        options: [], answer: "use",
        starterCode: "", language: "javascript", expectedOutput: "",
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează: un custom hook poate folosi orice hook React existent, de exemplu ___ pentru stare.",
        options: [], answer: "useState",
        starterCode: "", language: "javascript", expectedOutput: "",
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează: un hook `useFetch` returnează de obicei `{ data, loading, ___ }`.",
        options: [], answer: "error",
        starterCode: "", language: "javascript", expectedOutput: "",
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează: custom hooks permit ___ logicii cu stare între mai multe componente.",
        options: [], answer: "reutilizarea",
        starterCode: "", language: "javascript", expectedOutput: "",
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează: hook-ul `useLocalStorage` salvează și citește valori din ___.",
        options: [], answer: "localStorage",
        starterCode: "", language: "javascript", expectedOutput: "",
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Implementează un custom hook `useCounter(initialValue, step)` care returnează `{ count, increment, decrement, reset }`. Testează: pornește de la 0 cu step=2, incrementează de 3 ori, afișează valoarea, decrementează o dată, afișează din nou.",
        starterCode: "function useCounter(initialValue = 0, step = 1) {\n  let count = initialValue;\n  return {\n    get count() { return count; },\n    increment() { count += step; },\n    decrement() { count -= step; },\n    reset() { count = initialValue; }\n  };\n}\n\nconst c = useCounter(0, 2);\nc.increment(); c.increment(); c.increment();\nconsole.log('Dupa 3 increments:', c.count);\nc.decrement();\nconsole.log('Dupa decrement:', c.count);",
        language: "javascript", expectedOutput: "Dupa 3 increments: 6\nDupa decrement: 4",
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Simulează un hook `useToggle(initialValue)` care returnează `[value, toggle]`. Pornind de la `false`, afișează valoarea, apelează toggle de 3 ori afișând de fiecare dată noua valoare.",
        starterCode: "function useToggle(initialValue = false) {\n  let value = initialValue;\n  const toggle = () => { value = !value; };\n  return { get value() { return value; }, toggle };\n}\n\nconst t = useToggle(false);\nconsole.log('Initial:', t.value);\nt.toggle(); console.log('Toggle 1:', t.value);\nt.toggle(); console.log('Toggle 2:', t.value);\nt.toggle(); console.log('Toggle 3:', t.value);",
        language: "javascript", expectedOutput: "Initial: false\nToggle 1: true\nToggle 2: false\nToggle 3: true",
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Simulează un hook `useList(initialItems)` ce returnează `{ items, add, remove }`. add(item) adaugă la final, remove(index) elimină elementul. Pornește cu `['React']`, adaugă 'Vue' și 'Angular', elimină indexul 1, afișează lista finală.",
        starterCode: "function useList(initialItems = []) {\n  let items = [...initialItems];\n  return {\n    get items() { return items; },\n    add(item) { items.push(item); },\n    remove(index) { items.splice(index, 1); }\n  };\n}\n\nconst list = useList(['React']);\nlist.add('Vue');\nlist.add('Angular');\nlist.remove(1);\nconsole.log(list.items);",
        language: "javascript", expectedOutput: "[ 'React', 'Angular' ]",
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Creează un hook `useForm(initialValues)` care returnează `{ values, setField, reset }`. setField(key, value) actualizează un câmp. Testează cu câmpurile `name` și `email`, setează valori, afișează, resetează și afișează din nou.",
        starterCode: "function useForm(initialValues) {\n  let values = { ...initialValues };\n  return {\n    get values() { return values; },\n    setField(key, value) { values[key] = value; },\n    reset() { values = { ...initialValues }; }\n  };\n}\n\nconst form = useForm({ name: '', email: '' });\nform.setField('name', 'Ana');\nform.setField('email', 'ana@test.com');\nconsole.log('Dupa setare:', form.values);\nform.reset();\nconsole.log('Dupa reset:', form.values);",
        language: "javascript", expectedOutput: "Dupa setare: { name: 'Ana', email: 'ana@test.com' }\nDupa reset: { name: '', email: '' }",
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Simulează un hook `usePrevious(value)` care ține minte valoarea anterioară. Funcția `update(newValue)` actualizează valoarea curentă și salvează precedenta. Testează cu șirul de valori: 10, 20, 30 și afișează `curent: X, anterior: Y` la fiecare pas.",
        starterCode: "function usePrevious() {\n  let current = undefined;\n  let previous = undefined;\n  return {\n    update(newValue) {\n      previous = current;\n      current = newValue;\n    },\n    get current() { return current; },\n    get previous() { return previous; }\n  };\n}\n\nconst p = usePrevious();\np.update(10); console.log(`curent: ${p.current}, anterior: ${p.previous}`);\np.update(20); console.log(`curent: ${p.current}, anterior: ${p.previous}`);\np.update(30); console.log(`curent: ${p.current}, anterior: ${p.previous}`);",
        language: "javascript", expectedOutput: "curent: 10, anterior: undefined\ncurent: 20, anterior: 10\ncurent: 30, anterior: 20",
      },
    ],
  },

  {
    lessonId: "69fb25d9a7657a7d121f0725",
    name: "10. Performance: memo, useMemo, useCallback",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează: `React.memo` previne re-randarea unui component dacă ___ nu s-au schimbat.",
        options: [], answer: "props",
        starterCode: "", language: "javascript", expectedOutput: "",
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează: `useMemo` recalculează valoarea doar când ___ se schimbă.",
        options: [], answer: "dependențele",
        starterCode: "", language: "javascript", expectedOutput: "",
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează: `useCallback` memorează o funcție și o re-creează doar când ___ se schimbă.",
        options: [], answer: "dependențele",
        starterCode: "", language: "javascript", expectedOutput: "",
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează: tehnica de a salva rezultatele calculelor pentru a evita recalculul se numește ___.",
        options: [], answer: "memoizare",
        starterCode: "", language: "javascript", expectedOutput: "",
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează: `useCallback(fn, [dep])` este echivalent cu `useMemo(() => ___, [dep])`.",
        options: [], answer: "fn",
        starterCode: "", language: "javascript", expectedOutput: "",
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Implementează o funcție `memoize(fn)` care cachează rezultatele. Testează cu o funcție ce calculează pătratul unui număr și afișează când calculează vs returnează din cache.",
        starterCode: "function memoize(fn) {\n  const cache = new Map();\n  return function(n) {\n    if (cache.has(n)) {\n      console.log(`Cache hit pentru ${n}`);\n      return cache.get(n);\n    }\n    const result = fn(n);\n    cache.set(n, result);\n    return result;\n  };\n}\n\nconst square = memoize(n => n * n);\nconsole.log(square(5));\nconsole.log(square(5));\nconsole.log(square(3));",
        language: "javascript", expectedOutput: "25\nCache hit pentru 5\n25\n9",
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Simulează `React.memo`: creează o funcție `createMemoComponent(renderFn)` care re-randează doar dacă props s-au schimbat față de apelul anterior (compară cu JSON.stringify). Afișează 'Re-rendered' sau 'Skipped'.",
        starterCode: "function createMemoComponent(renderFn) {\n  let prevProps = null;\n  return function(props) {\n    if (JSON.stringify(props) === JSON.stringify(prevProps)) {\n      console.log('Skipped');\n      return;\n    }\n    prevProps = props;\n    renderFn(props);\n    console.log('Re-rendered');\n  };\n}\n\nconst MemoCard = createMemoComponent(props => console.log('Rendering:', props.name));\nMemoCard({ name: 'Ana' });\nMemoCard({ name: 'Ana' });\nMemoCard({ name: 'Ion' });",
        language: "javascript", expectedOutput: "Rendering: Ana\nRe-rendered\nSkipped\nRendering: Ion\nRe-rendered",
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Creează o funcție `expensiveCalc(n)` care afișează 'Calculez...' și returnează suma de la 1 la n. Implementează o versiune memoizată și testează că calculul se face o singură dată pentru aceeași valoare.",
        starterCode: "const cache = {};\n\nfunction expensiveCalc(n) {\n  if (cache[n] !== undefined) return cache[n];\n  console.log(`Calculez suma 1..${n}`);\n  let sum = 0;\n  for (let i = 1; i <= n; i++) sum += i;\n  cache[n] = sum;\n  return sum;\n}\n\nconsole.log(expensiveCalc(5));\nconsole.log(expensiveCalc(5));\nconsole.log(expensiveCalc(3));",
        language: "javascript", expectedOutput: "Calculez suma 1..5\n15\n15\nCalculez suma 1..3\n6",
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Simulează `useCallback`: creează o funcție `createStableCallback(fn, deps)` care returnează aceeași referință dacă deps nu s-a schimbat. Dacă deps se schimbă, creează o funcție nouă. Afișează 'Funcție nouă' sau 'Aceeași funcție'.",
        starterCode: "function createStableCallback(fn, deps) {\n  let prevDeps = null;\n  let cachedFn = null;\n  return function(...args) {\n    if (JSON.stringify(deps) !== JSON.stringify(prevDeps)) {\n      console.log('Funcție nouă');\n      prevDeps = deps;\n      cachedFn = fn;\n    } else {\n      console.log('Aceeași funcție');\n    }\n    return cachedFn(...args);\n  };\n}\n\nconst cb1 = createStableCallback(x => console.log('value:', x), [1]);\ncb1(10);\ncb1(20);",
        language: "javascript", expectedOutput: "Funcție nouă\nvalue: 10\nAceeași funcție\nvalue: 20",
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Creează o funcție `profileRender(name, renderCount)` care simulează o componentă: la fiecare apel incrementează renderCount și afișează `{name} a fost randat de {count} ori`. Simulează 5 randări și arată de ce memoizarea reduce rerandările inutile.",
        starterCode: "function createComponent(name) {\n  let renderCount = 0;\n  return function(propsChanged) {\n    if (!propsChanged) {\n      console.log(`${name}: skip (props neschimbate)`);\n      return;\n    }\n    renderCount++;\n    console.log(`${name} randat de ${renderCount} ori`);\n  };\n}\n\nconst Card = createComponent('Card');\nCard(true);\nCard(false);\nCard(false);\nCard(true);\nCard(false);",
        language: "javascript", expectedOutput: "Card randat de 1 ori\nCard: skip (props neschimbate)\nCard: skip (props neschimbate)\nCard randat de 2 ori\nCard: skip (props neschimbate)",
      },
    ],
  },

  {
    lessonId: "6a021b55f0ec7fc9c03a684c",
    name: "12. useRef — referințe și DOM",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează: `useRef` returnează un obiect cu o singură proprietate numită ___.",
        options: [], answer: "current",
        starterCode: "", language: "javascript", expectedOutput: "",
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează: spre deosebire de `useState`, modificarea unui ref nu cauzează ___.",
        options: [], answer: "re-randare",
        starterCode: "", language: "javascript", expectedOutput: "",
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează: `useRef` este util pentru a stoca valori ___ care persistă între randări.",
        options: [], answer: "mutabile",
        starterCode: "", language: "javascript", expectedOutput: "",
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează: pentru a accesa un element DOM cu useRef, atribuim ref-ul la prop-ul ___ al elementului.",
        options: [], answer: "ref",
        starterCode: "", language: "javascript", expectedOutput: "",
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează: `inputRef.current.___()` focalizează un element input.",
        options: [], answer: "focus",
        starterCode: "", language: "javascript", expectedOutput: "",
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Simulează un ref: creează un obiect `ref` cu proprietatea `current = null`. Setează `current` la un obiect `{ value: 'input text' }`. Afișează valoarea accesând `ref.current.value`.",
        starterCode: "const ref = { current: null };\n\n// simulează atașarea la un element\nref.current = { value: 'input text', focus: () => console.log('Input focalizat') };\n\nconsole.log('Valoarea inputului:', ref.current.value);\nref.current.focus();",
        language: "javascript", expectedOutput: "Valoarea inputului: input text\nInput focalizat",
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Simulează stocarea unei valori mutabile cu ref (ca un timer ID). Creează un obiect `timerRef = { current: null }`. Pornește un timer (setează current la 42), afișează id-ul, oprește timer-ul (setează la null) și afișează starea.",
        starterCode: "const timerRef = { current: null };\n\n// pornire timer\ntimerRef.current = 42;\nconsole.log('Timer ID:', timerRef.current);\n\n// oprire timer\ntimerRef.current = null;\nconsole.log('Timer oprit, ID:', timerRef.current);",
        language: "javascript", expectedOutput: "Timer ID: 42\nTimer oprit, ID: null",
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Creează o funcție `createRef(initialValue)` care simulează useRef. Returnează un obiect `{ current: initialValue }`. Creează un ref pentru un counter, incrementează `current` de 5 ori fără a cauza 're-randări', afișează valoarea finală.",
        starterCode: "function createRef(initialValue) {\n  return { current: initialValue };\n}\n\nconst countRef = createRef(0);\n\nfor (let i = 0; i < 5; i++) {\n  countRef.current++;\n  // nu cauzează re-randare\n}\n\nconsole.log('Valoare ref după 5 incrementări:', countRef.current);",
        language: "javascript", expectedOutput: "Valoare ref după 5 incrementări: 5",
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Simulează detectarea schimbării valorii folosind un ref pentru valoarea anterioară. La fiecare actualizare afișează `Schimbat de la {prev} la {current}` sau `Nicio schimbare ({value})`.",
        starterCode: "let currentValue = 0;\nconst prevRef = { current: 0 };\n\nfunction updateValue(newVal) {\n  if (newVal !== currentValue) {\n    console.log(`Schimbat de la ${currentValue} la ${newVal}`);\n    prevRef.current = currentValue;\n    currentValue = newVal;\n  } else {\n    console.log(`Nicio schimbare (${newVal})`);\n  }\n}\n\nupdateValue(5);\nupdateValue(5);\nupdateValue(10);",
        language: "javascript", expectedOutput: "Schimbat de la 0 la 5\nNicio schimbare (5)\nSchimbat de la 5 la 10",
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Simulează un stopwatch folosind refs: un `startTimeRef` și un `elapsedRef`. Funcția `start()` setează startTimeRef, `stop()` calculează timpul scurs (simulat cu o diferență fixă de 1500ms) și îl salvează în elapsedRef. Afișează timpul.",
        starterCode: "const startTimeRef = { current: null };\nconst elapsedRef = { current: 0 };\n\nfunction start() {\n  startTimeRef.current = 1000; // timestamp simulat\n  console.log('Cronometru pornit');\n}\n\nfunction stop() {\n  const now = 2500; // timestamp simulat (1500ms mai tarziu)\n  elapsedRef.current = now - startTimeRef.current;\n  console.log(`Timp scurs: ${elapsedRef.current}ms`);\n}\n\nstart();\nstop();",
        language: "javascript", expectedOutput: "Cronometru pornit\nTimp scurs: 1500ms",
      },
    ],
  },

  {
    lessonId: "6a021b56f0ec7fc9c03a6853",
    name: "13. React Router — navigare",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează: în React Router v6, componenta care înlocuiește `<a>` pentru navigare client-side se numește ___.",
        options: [], answer: "<Link>",
        starterCode: "", language: "javascript", expectedOutput: "",
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează: hook-ul `___` din React Router returnează parametrii URL dinamici.",
        options: [], answer: "useParams",
        starterCode: "", language: "javascript", expectedOutput: "",
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează: hook-ul `___` permite navigarea programatică în React Router v6.",
        options: [], answer: "useNavigate",
        starterCode: "", language: "javascript", expectedOutput: "",
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează: ruta pentru pagina 404 (not found) se definește cu path=`___`.",
        options: [], answer: "*",
        starterCode: "", language: "javascript", expectedOutput: "",
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează: `<Route path='/user/:id'>` — `:id` este un parametru ___ al URL-ului.",
        options: [], answer: "dinamic",
        starterCode: "", language: "javascript", expectedOutput: "",
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Simulează un router simplu: creează un obiect `router` cu un array de rute `{path, component}` și o funcție `navigate(path)` care găsește ruta potrivită și afișează `Navighez la: {path} → {component}`. Testează cu 3 rute.",
        starterCode: "const router = {\n  routes: [\n    { path: '/', component: 'Home' },\n    { path: '/about', component: 'About' },\n    { path: '/contact', component: 'Contact' }\n  ],\n  navigate(path) {\n    const route = this.routes.find(r => r.path === path);\n    if (route) console.log(`Navighez la: ${path} → ${route.component}`);\n    else console.log(`Ruta ${path} nu există`);\n  }\n};\n\nrouter.navigate('/');\nrouter.navigate('/about');\nrouter.navigate('/blog');",
        language: "javascript", expectedOutput: "Navighez la: / → Home\nNavighez la: /about → About\nRuta /blog nu există",
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Simulează extragerea parametrilor dintr-un URL: creează o funcție `parseParams(routePattern, url)` care extrage parametrii dinamici. Exemplu: pattern `/user/:id`, url `/user/42` → `{ id: '42' }`. Afișează rezultatul.",
        starterCode: "function parseParams(pattern, url) {\n  const patternParts = pattern.split('/');\n  const urlParts = url.split('/');\n  const params = {};\n  patternParts.forEach((part, i) => {\n    if (part.startsWith(':')) {\n      params[part.slice(1)] = urlParts[i];\n    }\n  });\n  return params;\n}\n\nconsole.log(parseParams('/user/:id', '/user/42'));\nconsole.log(parseParams('/post/:id/comment/:commentId', '/post/5/comment/99'));",
        language: "javascript", expectedOutput: "{ id: '42' }\n{ id: '5', commentId: '99' }",
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Simulează un history stack (istoricul navigării): creează un obiect cu metodele `push(path)`, `back()`, și `current()`. Navighează pe câteva pagini și navighează înapoi.",
        starterCode: "const history = {\n  stack: ['/'],\n  push(path) {\n    this.stack.push(path);\n    console.log('Navigat la:', path);\n  },\n  back() {\n    if (this.stack.length > 1) this.stack.pop();\n    console.log('Înapoi la:', this.current());\n  },\n  current() { return this.stack[this.stack.length - 1]; }\n};\n\nhistory.push('/about');\nhistory.push('/contact');\nhistory.back();\nhistory.back();\nconsole.log('Pagina curentă:', history.current());",
        language: "javascript", expectedOutput: "Navigat la: /about\nNavigat la: /contact\nÎnapoi la: /about\nÎnapoi la: /\nPagina curentă: /",
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Simulează query string parsing: creează o funcție `parseQueryString(search)` care transformă `'?name=Ana&age=25'` în `{ name: 'Ana', age: '25' }`. Testează cu 2 exemple.",
        starterCode: "function parseQueryString(search) {\n  const params = {};\n  const query = search.startsWith('?') ? search.slice(1) : search;\n  query.split('&').forEach(pair => {\n    const [key, value] = pair.split('=');\n    if (key) params[key] = decodeURIComponent(value || '');\n  });\n  return params;\n}\n\nconsole.log(parseQueryString('?name=Ana&age=25'));\nconsole.log(parseQueryString('?page=2&limit=10&sort=asc'));",
        language: "javascript", expectedOutput: "{ name: 'Ana', age: '25' }\n{ page: '2', limit: '10', sort: 'asc' }",
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Implementează o funcție `matchRoute(routes, currentPath)` care găsește ruta potrivită (inclusiv cu parametri dinamici) și returnează `{ route, params }`. Testează cu `/user/5` matching `/user/:id`.",
        starterCode: "function matchRoute(routes, currentPath) {\n  for (const route of routes) {\n    const routeParts = route.path.split('/');\n    const pathParts = currentPath.split('/');\n    if (routeParts.length !== pathParts.length) continue;\n    const params = {};\n    const match = routeParts.every((part, i) => {\n      if (part.startsWith(':')) { params[part.slice(1)] = pathParts[i]; return true; }\n      return part === pathParts[i];\n    });\n    if (match) return { route: route.component, params };\n  }\n  return { route: 'NotFound', params: {} };\n}\n\nconst routes = [\n  { path: '/', component: 'Home' },\n  { path: '/user/:id', component: 'UserProfile' },\n];\nconsole.log(JSON.stringify(matchRoute(routes, '/user/5')));\nconsole.log(JSON.stringify(matchRoute(routes, '/404')));",
        language: "javascript", expectedOutput: "{\"route\":\"UserProfile\",\"params\":{\"id\":\"5\"}}\n{\"route\":\"NotFound\",\"params\":{}}",
      },
    ],
  },

  {
    lessonId: "6a021b57f0ec7fc9c03a685a",
    name: "14. React Router avansat — nested și outlet",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează: în React Router v6, rutele imbricate sunt randate în locul componentei ___.",
        options: [], answer: "<Outlet>",
        starterCode: "", language: "javascript", expectedOutput: "",
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează: o rută fără path care randează întotdeauna componenta copil se numește rută ___.",
        options: [], answer: "index",
        starterCode: "", language: "javascript", expectedOutput: "",
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează: `loader` dintr-o rută React Router este o funcție asincronă care rulează ___ randării componentei.",
        options: [], answer: "înainte",
        starterCode: "", language: "javascript", expectedOutput: "",
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează: hook-ul `___` permite accesul la datele returnate de funcția loader a rutei.",
        options: [], answer: "useLoaderData",
        starterCode: "", language: "javascript", expectedOutput: "",
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează: componentele layout (care conțin `<Outlet>`) sunt numite și rute ___.",
        options: [], answer: "layout",
        starterCode: "", language: "javascript", expectedOutput: "",
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Simulează un layout cu Outlet: creează o funcție `AppLayout(children)` care afișează header-ul și footer-ul fixe, cu conținut dinamic în mijloc. Testează cu două pagini diferite.",
        starterCode: "function AppLayout(content) {\n  console.log('=== HEADER: DevZone ===');\n  console.log(content);\n  console.log('=== FOOTER: © 2024 ===');\n}\n\nAppLayout('Pagina: Home — Bun venit!');\nconsole.log('---');\nAppLayout('Pagina: About — Despre noi');",
        language: "javascript", expectedOutput: "=== HEADER: DevZone ===\nPagina: Home — Bun venit!\n=== FOOTER: © 2024 ===\n---\n=== HEADER: DevZone ===\nPagina: About — Despre noi\n=== FOOTER: © 2024 ===",
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Simulează un loader de date: creează o funcție async `userLoader(params)` care returnează un user pe baza ID-ului. Dacă ID-ul nu există, returnează `null`. Testează cu ID-uri valide și invalide.",
        starterCode: "const users = [\n  { id: '1', name: 'Ana', role: 'Admin' },\n  { id: '2', name: 'Bogdan', role: 'User' }\n];\n\nasync function userLoader({ id }) {\n  const user = users.find(u => u.id === id);\n  return user || null;\n}\n\nasync function main() {\n  const user1 = await userLoader({ id: '1' });\n  console.log(user1 ? `User găsit: ${user1.name}` : 'User negăsit');\n  const user99 = await userLoader({ id: '99' });\n  console.log(user99 ? `User găsit: ${user99.name}` : 'User negăsit');\n}\n\nmain();",
        language: "javascript", expectedOutput: "User găsit: Ana\nUser negăsit",
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Simulează o rută cu breadcrumbs: funcția `getBreadcrumbs(path)` returnează un array de obiecte `{label, path}` pentru fiecare segment al URL-ului. Afișează breadcrumbs pentru `/dashboard/users/42`.",
        starterCode: "function getBreadcrumbs(path) {\n  const segments = path.split('/').filter(Boolean);\n  return segments.map((seg, i) => ({\n    label: seg.charAt(0).toUpperCase() + seg.slice(1),\n    path: '/' + segments.slice(0, i + 1).join('/')\n  }));\n}\n\nconst crumbs = getBreadcrumbs('/dashboard/users/42');\ncrumbs.forEach(c => console.log(`${c.label} → ${c.path}`));",
        language: "javascript", expectedOutput: "Dashboard → /dashboard\nUsers → /dashboard/users\n42 → /dashboard/users/42",
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Simulează o acțiune de formular (Form action în React Router): creează o funcție `action(formData)` care procesează datele formularului, validează și returnează un mesaj de succes sau eroare. Testează cu date valide și invalide.",
        starterCode: "async function action(formData) {\n  const { name, email } = formData;\n  if (!name || name.length < 2) {\n    console.log('Eroare: Nume prea scurt');\n    return;\n  }\n  if (!email || !email.includes('@')) {\n    console.log('Eroare: Email invalid');\n    return;\n  }\n  console.log(`Succes: Utilizator ${name} (${email}) salvat`);\n}\n\naction({ name: 'A', email: 'test@test.com' });\naction({ name: 'Ana', email: 'invalid' });\naction({ name: 'Ana', email: 'ana@test.com' });",
        language: "javascript", expectedOutput: "Eroare: Nume prea scurt\nEroare: Email invalid\nSucces: Utilizator Ana (ana@test.com) salvat",
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Implementează o funcție `buildRoutePath(pattern, params)` care înlocuiește parametrii dinamici dintr-un pattern cu valorile reale. Exemplu: `buildRoutePath('/user/:id/post/:postId', {id: 5, postId: 10})` → `'/user/5/post/10'`.",
        starterCode: "function buildRoutePath(pattern, params) {\n  return pattern.replace(/:([\\w]+)/g, (_, key) => params[key] ?? `:${key}`);\n}\n\nconsole.log(buildRoutePath('/user/:id', { id: 42 }));\nconsole.log(buildRoutePath('/user/:id/post/:postId', { id: 5, postId: 10 }));\nconsole.log(buildRoutePath('/static/page', {}));",
        language: "javascript", expectedOutput: "/user/42\n/user/5/post/10\n/static/page",
      },
    ],
  },

  {
    lessonId: "6a021b5af0ec7fc9c03a6868",
    name: "16. Error Boundaries",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează: Error Boundaries în React pot fi implementate doar cu componente de tip ___.",
        options: [], answer: "clasă",
        starterCode: "", language: "javascript", expectedOutput: "",
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează: metoda de lifecycle `___` este apelată când un copil aruncă o eroare.",
        options: [], answer: "componentDidCatch",
        starterCode: "", language: "javascript", expectedOutput: "",
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează: metoda statică `getDerivedStateFromError(error)` returnează starea de ___ pentru UI.",
        options: [], answer: "fallback",
        starterCode: "", language: "javascript", expectedOutput: "",
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează: Error Boundaries nu prind erori din event handlers — acolo trebuie folosit un bloc ___.",
        options: [], answer: "try/catch",
        starterCode: "", language: "javascript", expectedOutput: "",
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează: Error Boundaries nu prind erori din cod ___ (Promise rejections).",
        options: [], answer: "asincron",
        starterCode: "", language: "javascript", expectedOutput: "",
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Simulează un Error Boundary: creează o funcție `safeRender(component, fallback)` care încearcă să apeleze component(). Dacă aruncă o eroare, apelează fallback() cu mesajul erorii. Testează cu o componentă cu eroare și una normală.",
        starterCode: "function safeRender(component, fallback) {\n  try {\n    component();\n  } catch (error) {\n    fallback(error.message);\n  }\n}\n\nsafeRender(\n  () => { throw new Error('Ceva a mers greșit'); },\n  (msg) => console.log('Fallback UI: ' + msg)\n);\n\nsafeRender(\n  () => console.log('Component randat cu succes'),\n  (msg) => console.log('Fallback: ' + msg)\n);",
        language: "javascript", expectedOutput: "Fallback UI: Ceva a mers greșit\nComponent randat cu succes",
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Creează o funcție `withErrorBoundary(fn)` care înfășoară o funcție cu tratare de erori. Returnează un obiect `{ result, error }`. Testează cu funcții care reușesc și care eșuează.",
        starterCode: "function withErrorBoundary(fn) {\n  try {\n    const result = fn();\n    return { result, error: null };\n  } catch (e) {\n    return { result: null, error: e.message };\n  }\n}\n\nconst ok = withErrorBoundary(() => 42);\nconsole.log('Succes:', ok.result, '| Eroare:', ok.error);\n\nconst fail = withErrorBoundary(() => { throw new Error('Nu merge'); });\nconsole.log('Succes:', fail.result, '| Eroare:', fail.error);",
        language: "javascript", expectedOutput: "Succes: 42 | Eroare: null\nSucces: null | Eroare: Nu merge",
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Simulează tratarea erorilor async: creează o funcție `fetchData(shouldFail)` care returnează o Promise. Dacă shouldFail=true, respinge cu eroare. Folosind async/await cu try/catch, tratează ambele cazuri și afișează rezultatul.",
        starterCode: "function fetchData(shouldFail) {\n  return new Promise((resolve, reject) => {\n    if (shouldFail) reject(new Error('Server error 500'));\n    else resolve({ data: 'Date primite cu succes' });\n  });\n}\n\nasync function main() {\n  try {\n    const result = await fetchData(false);\n    console.log(result.data);\n  } catch (e) {\n    console.log('Eroare:', e.message);\n  }\n  try {\n    const result = await fetchData(true);\n    console.log(result.data);\n  } catch (e) {\n    console.log('Eroare:', e.message);\n  }\n}\n\nmain();",
        language: "javascript", expectedOutput: "Date primite cu succes\nEroare: Server error 500",
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Creează un sistem de logging al erorilor: funcția `createErrorLogger(componentName)` returnează o funcție care logează erori cu formatul `[{componentName}] Eroare: {message} la {timestamp}`. Testează cu erori din două componente diferite.",
        starterCode: "function createErrorLogger(componentName) {\n  return function(error) {\n    console.log(`[${componentName}] Eroare: ${error.message} la 2024-01-01`);\n  };\n}\n\nconst logCartError = createErrorLogger('Cart');\nconst logUserError = createErrorLogger('UserProfile');\n\nlogCartError(new Error('Produsul nu există'));\nlogUserError(new Error('Utilizator neautentificat'));",
        language: "javascript", expectedOutput: "[Cart] Eroare: Produsul nu există la 2024-01-01\n[UserProfile] Eroare: Utilizator neautentificat la 2024-01-01",
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Implementează un retry mechanism: funcția `withRetry(fn, maxAttempts)` încearcă să execute fn de maxim `maxAttempts` ori. La fiecare eșec afișează `Încercare {n} eșuată`. La succes afișează `Succes la încercarea {n}`.",
        starterCode: "async function withRetry(fn, maxAttempts) {\n  for (let attempt = 1; attempt <= maxAttempts; attempt++) {\n    try {\n      const result = await fn();\n      console.log(`Succes la încercarea ${attempt}`);\n      return result;\n    } catch (e) {\n      console.log(`Încercare ${attempt} eșuată`);\n      if (attempt === maxAttempts) throw e;\n    }\n  }\n}\n\nlet callCount = 0;\nconst unstableFn = () => {\n  callCount++;\n  if (callCount < 3) throw new Error('Eroare temporară');\n  return 'date';\n};\n\nwithRetry(unstableFn, 5);",
        language: "javascript", expectedOutput: "Încercare 1 eșuată\nÎncercare 2 eșuată\nSucces la încercarea 3",
      },
    ],
  },

  {
    lessonId: "6a021b5cf0ec7fc9c03a6876",
    name: "18. Refs avansate și forwardRef",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează: `forwardRef` permite unei componente să transmită un ref către un element ___ intern.",
        options: [], answer: "DOM",
        starterCode: "", language: "javascript", expectedOutput: "",
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează: `useImperativeHandle(ref, createHandle)` permite personalizarea ___ expusă prin ref.",
        options: [], answer: "interfaței",
        starterCode: "", language: "javascript", expectedOutput: "",
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează: `forwardRef` primește ca argumente `(props, ___)`.",
        options: [], answer: "ref",
        starterCode: "", language: "javascript", expectedOutput: "",
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează: `useImperativeHandle` trebuie folosit împreună cu ___.",
        options: [], answer: "forwardRef",
        starterCode: "", language: "javascript", expectedOutput: "",
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează: un ref creat cu `useRef()` are valoarea inițială ___ până la montarea componentei.",
        options: [], answer: "null",
        starterCode: "", language: "javascript", expectedOutput: "",
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Simulează `forwardRef`: creează o funcție `createForwardedInput(label)` care returnează un obiect cu metoda `focus()` (afișează `{label}: input focalizat`) și `getValue()` (returnează o valoare simulată). Testează.",
        starterCode: "function createForwardedInput(label, defaultValue = '') {\n  let value = defaultValue;\n  return {\n    focus() { console.log(`${label}: input focalizat`); },\n    getValue() { return value; },\n    setValue(v) { value = v; }\n  };\n}\n\nconst emailInput = createForwardedInput('Email', 'test@test.com');\nemailInput.focus();\nconsole.log('Valoare:', emailInput.getValue());\nemailInput.setValue('nou@test.com');\nconsole.log('Valoare nouă:', emailInput.getValue());",
        language: "javascript", expectedOutput: "Email: input focalizat\nValoare: test@test.com\nValoare nouă: nou@test.com",
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Simulează `useImperativeHandle`: creează o funcție `createModal()` care returnează un API public limitat: `{ open, close, isOpen }`. Ascunde implementarea internă. Testează open și close.",
        starterCode: "function createModal() {\n  let _isOpen = false;\n  return {\n    open() {\n      _isOpen = true;\n      console.log('Modal deschis');\n    },\n    close() {\n      _isOpen = false;\n      console.log('Modal închis');\n    },\n    get isOpen() { return _isOpen; }\n  };\n}\n\nconst modal = createModal();\nconsole.log('Initial:', modal.isOpen);\nmodal.open();\nconsole.log('Dupa open:', modal.isOpen);\nmodal.close();\nconsole.log('Dupa close:', modal.isOpen);",
        language: "javascript", expectedOutput: "Initial: false\nModal deschis\nDupa open: true\nModal închis\nDupa close: false",
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Creează o funcție `createScrollableList()` cu metodele `scrollToTop()`, `scrollToBottom()` și `scrollToItem(index)` (toate simulând output cu console.log). Testează toate metodele.",
        starterCode: "function createScrollableList(items) {\n  return {\n    scrollToTop() {\n      console.log('Scroll la primul element:', items[0]);\n    },\n    scrollToBottom() {\n      console.log('Scroll la ultimul element:', items[items.length - 1]);\n    },\n    scrollToItem(index) {\n      console.log(`Scroll la elementul ${index}:`, items[index]);\n    }\n  };\n}\n\nconst list = createScrollableList(['Item A', 'Item B', 'Item C', 'Item D']);\nlist.scrollToTop();\nlist.scrollToBottom();\nlist.scrollToItem(2);",
        language: "javascript", expectedOutput: "Scroll la primul element: Item A\nScroll la ultimul element: Item D\nScroll la elementul 2: Item C",
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Simulează un VideoPlayer cu ref: creează `createVideoPlayer()` cu metodele `play()`, `pause()`, `seek(time)`. La fiecare metodă afișează starea curentă. Testează un flux de play, seek la 30s, pause.",
        starterCode: "function createVideoPlayer() {\n  let isPlaying = false;\n  let currentTime = 0;\n  return {\n    play() {\n      isPlaying = true;\n      console.log(`Redare pornită la ${currentTime}s`);\n    },\n    pause() {\n      isPlaying = false;\n      console.log(`Redare oprită la ${currentTime}s`);\n    },\n    seek(time) {\n      currentTime = time;\n      console.log(`Seek la ${time}s`);\n    }\n  };\n}\n\nconst player = createVideoPlayer();\nplayer.play();\nplayer.seek(30);\nplayer.pause();",
        language: "javascript", expectedOutput: "Redare pornită la 0s\nSeek la 30s\nRedare oprită la 30s",
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Creează o funcție `createFormRef()` care gestionează un formular cu câmpuri multiple. Expune metodele `setField(name, value)`, `getValues()`, și `reset()`. Simulează completarea unui formular și reset.",
        starterCode: "function createFormRef(fields) {\n  let values = Object.fromEntries(fields.map(f => [f, '']));\n  return {\n    setField(name, value) { values[name] = value; },\n    getValues() { return { ...values }; },\n    reset() { values = Object.fromEntries(fields.map(f => [f, ''])); }\n  };\n}\n\nconst form = createFormRef(['username', 'email', 'password']);\nform.setField('username', 'cristi');\nform.setField('email', 'cristi@test.com');\nconsole.log('Values:', JSON.stringify(form.getValues()));\nform.reset();\nconsole.log('Dupa reset:', JSON.stringify(form.getValues()));",
        language: "javascript", expectedOutput: "Values: {\"username\":\"cristi\",\"email\":\"cristi@test.com\",\"password\":\"\"}\nDupa reset: {\"username\":\"\",\"email\":\"\",\"password\":\"\"}",
      },
    ],
  },

  {
    lessonId: "6a021b5df0ec7fc9c03a687d",
    name: "19. Compound components",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează: patternul Compound Components permite componente copil să ___ starea cu componenta părinte.",
        options: [], answer: "partajeze",
        starterCode: "", language: "javascript", expectedOutput: "",
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează: în Compound Components, starea comună este de obicei partajată prin ___.",
        options: [], answer: "Context",
        starterCode: "", language: "javascript", expectedOutput: "",
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează: componente ca `<Select.Option>` sau `<Tab.Panel>` sunt exemple de componente ___.",
        options: [], answer: "compuse",
        starterCode: "", language: "javascript", expectedOutput: "",
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează: avantajul principal al Compound Components față de props este flexibilitatea în ___.",
        options: [], answer: "compoziție",
        starterCode: "", language: "javascript", expectedOutput: "",
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează: un Compound Component poate atașa subcomponente ca proprietăți statice: `Tabs.___ = TabPanel`.",
        options: [], answer: "Panel",
        starterCode: "", language: "javascript", expectedOutput: "",
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Simulează un compound component `Tabs`: creează un obiect `Tabs` cu metoda `render(activeTab, tabs)`. `tabs` e un array de `{id, label, content}`. Afișează label-urile tuturor tab-urilor și conținutul tab-ului activ.",
        starterCode: "const Tabs = {\n  render(activeTab, tabs) {\n    console.log('Tab-uri:', tabs.map(t => t.label).join(' | '));\n    const active = tabs.find(t => t.id === activeTab);\n    console.log('Conținut activ:', active ? active.content : 'Niciun tab activ');\n  }\n};\n\nTabs.render('tab2', [\n  { id: 'tab1', label: 'Home', content: 'Pagina principală' },\n  { id: 'tab2', label: 'Profile', content: 'Profilul utilizatorului' },\n  { id: 'tab3', label: 'Settings', content: 'Setări cont' }\n]);",
        language: "javascript", expectedOutput: "Tab-uri: Home | Profile | Settings\nConținut activ: Profilul utilizatorului",
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Simulează un Accordion compound component: obiect `Accordion` cu metoda `render(openId, items)`. Fiecare item are `{id, title, content}`. Afișează titlurile și expandează doar cel cu `id === openId`.",
        starterCode: "const Accordion = {\n  render(openId, items) {\n    items.forEach(item => {\n      if (item.id === openId) {\n        console.log(`[+] ${item.title}`);\n        console.log(`    ${item.content}`);\n      } else {\n        console.log(`[-] ${item.title}`);\n      }\n    });\n  }\n};\n\nAccordion.render('faq2', [\n  { id: 'faq1', title: 'Ce este React?', content: 'O librărie UI.' },\n  { id: 'faq2', title: 'Ce este JSX?', content: 'Sintaxă JavaScript care seamănă cu HTML.' },\n  { id: 'faq3', title: 'Ce sunt hooks?', content: 'Funcții speciale React.' }\n]);",
        language: "javascript", expectedOutput: "[-] Ce este React?\n[+] Ce este JSX?\n    Sintaxă JavaScript care seamănă cu HTML.\n[-] Ce sunt hooks?",
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Simulează un Select compound component: funcția `createSelect(options)` returnează un obiect cu `select(value)` și `getSelected()`. Afișează opțiunile disponibile și valoarea selectată.",
        starterCode: "function createSelect(options) {\n  let selected = null;\n  return {\n    showOptions() {\n      console.log('Opțiuni:', options.join(', '));\n    },\n    select(value) {\n      if (options.includes(value)) {\n        selected = value;\n        console.log('Selectat:', value);\n      } else {\n        console.log('Opțiune invalidă:', value);\n      }\n    },\n    getSelected() { return selected; }\n  };\n}\n\nconst colorSelect = createSelect(['roșu', 'verde', 'albastru']);\ncolorSelect.showOptions();\ncolorSelect.select('verde');\ncolorSelect.select('galben');\nconsole.log('Valoare finală:', colorSelect.getSelected());",
        language: "javascript", expectedOutput: "Opțiuni: roșu, verde, albastru\nSelectat: verde\nOpțiune invalidă: galben\nValoare finală: verde",
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Creează un compound component `Steps` cu metode `next()`, `prev()`, `goTo(step)` și `current()`. Pornind de la pasul 1 din 4, simulează navigarea: next, next, prev, goTo(4). Afișează pasul curent după fiecare acțiune.",
        starterCode: "function createSteps(total) {\n  let step = 1;\n  return {\n    next() { if (step < total) step++; console.log('Pas curent:', step); },\n    prev() { if (step > 1) step--; console.log('Pas curent:', step); },\n    goTo(s) { step = Math.min(total, Math.max(1, s)); console.log('Pas curent:', step); },\n    current() { return step; }\n  };\n}\n\nconst wizard = createSteps(4);\nwizard.next();\nwizard.next();\nwizard.prev();\nwizard.goTo(4);",
        language: "javascript", expectedOutput: "Pas curent: 2\nPas curent: 3\nPas curent: 2\nPas curent: 4",
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Simulează un Menu compound component: creează `createMenu(items)` cu metodele `open()`, `close()`, `selectItem(id)`. Afișează starea meniului și item-ul selectat.",
        starterCode: "function createMenu(items) {\n  let isOpen = false;\n  let selectedItem = null;\n  return {\n    open() { isOpen = true; console.log('Meniu deschis:', items.map(i => i.label).join(', ')); },\n    close() { isOpen = false; console.log('Meniu închis'); },\n    selectItem(id) {\n      const item = items.find(i => i.id === id);\n      if (item) { selectedItem = item.label; console.log('Selectat:', selectedItem); }\n    }\n  };\n}\n\nconst menu = createMenu([\n  { id: 1, label: 'Profil' },\n  { id: 2, label: 'Setări' },\n  { id: 3, label: 'Deconectare' }\n]);\nmenu.open();\nmenu.selectItem(2);\nmenu.close();",
        language: "javascript", expectedOutput: "Meniu deschis: Profil, Setări, Deconectare\nSelectat: Setări\nMeniu închis",
      },
    ],
  },

  {
    lessonId: "6a021b5ef0ec7fc9c03a6884",
    name: "20. Render props și HOC",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează: patternul Render Props presupune pasarea unei ___ ca prop care randează UI.",
        options: [], answer: "funcții",
        starterCode: "", language: "javascript", expectedOutput: "",
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează: HOC înseamnă ___ Order Component.",
        options: [], answer: "Higher",
        starterCode: "", language: "javascript", expectedOutput: "",
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează: un HOC primește o componentă și returnează o componentă ___ cu funcționalitate adăugată.",
        options: [], answer: "nouă",
        starterCode: "", language: "javascript", expectedOutput: "",
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează: convența de denumire pentru HOC-uri este `with___` (de ex. withAuth, withLogger).",
        options: [], answer: "Feature",
        starterCode: "", language: "javascript", expectedOutput: "",
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează: Render Props și HOC rezolvă problema ___ logicii cu stare.",
        options: [], answer: "reutilizării",
        starterCode: "", language: "javascript", expectedOutput: "",
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Implementează patternul Render Props: creează o funcție `Mouse(renderProp)` care ține minte poziția (x: 100, y: 200) și apelează renderProp cu aceste date. Testează cu două render props diferite.",
        starterCode: "function Mouse(renderProp) {\n  const position = { x: 100, y: 200 };\n  return renderProp(position);\n}\n\nconst result1 = Mouse(pos => `Poziție: (${pos.x}, ${pos.y})`);\nconsole.log(result1);\n\nconst result2 = Mouse(pos => `X=${pos.x} Y=${pos.y}`);\nconsole.log(result2);",
        language: "javascript", expectedOutput: "Poziție: (100, 200)\nX=100 Y=200",
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Implementează un HOC `withLogger(componentFn)`: înfășoară funcția, afișează `Randare: {name}` înainte și `Finalizat: {name}` după apelul ei. Testează cu o funcție `UserCard`.",
        starterCode: "function withLogger(name, componentFn) {\n  return function(...args) {\n    console.log(`Randare: ${name}`);\n    const result = componentFn(...args);\n    console.log(`Finalizat: ${name}`);\n    return result;\n  };\n}\n\nconst UserCard = withLogger('UserCard', (user) => {\n  console.log(`User: ${user.name}`);\n  return `<UserCard name=\"${user.name}\">`;\n});\n\nUserCard({ name: 'Ana' });",
        language: "javascript", expectedOutput: "Randare: UserCard\nUser: Ana\nFinalizat: UserCard",
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Creează un HOC `withAuth(componentFn, isAuthenticated)`: dacă user e autentificat, apelează componentFn, altfel afișează 'Acces interzis. Autentifică-te.'. Testează ambele cazuri.",
        starterCode: "function withAuth(componentFn, isAuthenticated) {\n  return function(...args) {\n    if (!isAuthenticated) {\n      console.log('Acces interzis. Autentifică-te.');\n      return;\n    }\n    return componentFn(...args);\n  };\n}\n\nconst Dashboard = withAuth(() => console.log('Dashboard: Bun venit!'), true);\nconst Settings = withAuth(() => console.log('Settings: Configurare...'), false);\n\nDashboard();\nSettings();",
        language: "javascript", expectedOutput: "Dashboard: Bun venit!\nAcces interzis. Autentifică-te.",
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Implementează un HOC `withLoading(componentFn, isLoading)`: dacă isLoading=true, afișează 'Se încarcă...' în loc de component. Testează ambele stări.",
        starterCode: "function withLoading(componentFn, isLoading) {\n  return function(...args) {\n    if (isLoading) {\n      console.log('Se încarcă...');\n      return;\n    }\n    return componentFn(...args);\n  };\n}\n\nconst UserList = withLoading(() => console.log('Useri: Ana, Bogdan, Cristi'), false);\nconst PostList = withLoading(() => console.log('Posts: Post 1, Post 2'), true);\n\nUserList();\nPostList();",
        language: "javascript", expectedOutput: "Useri: Ana, Bogdan, Cristi\nSe încarcă...",
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Creează un DataProvider cu Render Props: `DataProvider(data, renderFn)` gestionează starea datelor și apelează renderFn cu `{data, loading: false}`. Compune cu un ErrorBoundary care prinde erori din renderFn.",
        starterCode: "function DataProvider(data, renderFn) {\n  try {\n    return renderFn({ data, loading: false, error: null });\n  } catch (e) {\n    return `Eroare în render: ${e.message}`;\n  }\n}\n\nconst result1 = DataProvider({ users: ['Ana', 'Ion'] }, ({ data }) => {\n  console.log('Useri:', data.users.join(', '));\n  return 'OK';\n});\nconsole.log('Rezultat:', result1);\n\nconst result2 = DataProvider(null, ({ data }) => {\n  if (!data) throw new Error('Date lipsă');\n  return 'OK';\n});\nconsole.log('Rezultat:', result2);",
        language: "javascript", expectedOutput: "Useri: Ana, Ion\nRezultat: OK\nRezultat: Eroare în render: Date lipsă",
      },
    ],
  },

  {
    lessonId: "6a021b5ff0ec7fc9c03a688b",
    name: "21. State management — Context, Redux, Zustand",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează: `createContext` creează un obiect Context cu un `Provider` și un ___.",
        options: [], answer: "Consumer",
        starterCode: "", language: "javascript", expectedOutput: "",
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează: hook-ul `___` permite accesul la valoarea unui Context React.",
        options: [], answer: "useContext",
        starterCode: "", language: "javascript", expectedOutput: "",
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează: în Redux, funcția pură care actualizează starea se numește ___.",
        options: [], answer: "reducer",
        starterCode: "", language: "javascript", expectedOutput: "",
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează: în Zustand, un store se creează cu funcția `___`.",
        options: [], answer: "create",
        starterCode: "", language: "javascript", expectedOutput: "",
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează: Redux Toolkit oferă funcția `___` pentru crearea slice-urilor cu reducers.",
        options: [], answer: "createSlice",
        starterCode: "", language: "javascript", expectedOutput: "",
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Simulează un store Redux simplu: creează un reducer `counterReducer(state, action)` care tratează acțiunile `INCREMENT`, `DECREMENT` și `RESET`. Creează un store și testează dispatch-ul mai multor acțiuni.",
        starterCode: "function counterReducer(state = { count: 0 }, action) {\n  switch (action.type) {\n    case 'INCREMENT': return { count: state.count + 1 };\n    case 'DECREMENT': return { count: state.count - 1 };\n    case 'RESET': return { count: 0 };\n    default: return state;\n  }\n}\n\nlet state = counterReducer(undefined, {});\nconsole.log('Initial:', state.count);\nstate = counterReducer(state, { type: 'INCREMENT' });\nstate = counterReducer(state, { type: 'INCREMENT' });\nconsole.log('Dupa 2 increments:', state.count);\nstate = counterReducer(state, { type: 'RESET' });\nconsole.log('Dupa reset:', state.count);",
        language: "javascript", expectedOutput: "Initial: 0\nDupa 2 increments: 2\nDupa reset: 0",
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Simulează un Context React: creează un `ThemeContext` cu `value = 'light'`. Creează o funcție `useTheme()` care returnează valoarea. Creează `ThemeProvider(newTheme, renderFn)` care actualizează contextul și apelează renderFn. Testează.",
        starterCode: "let contextValue = 'light';\n\nfunction useTheme() {\n  return contextValue;\n}\n\nfunction ThemeProvider(newTheme, renderFn) {\n  const prev = contextValue;\n  contextValue = newTheme;\n  renderFn();\n  contextValue = prev;\n}\n\nconsole.log('Tema globală:', useTheme());\nThemeProvider('dark', () => {\n  console.log('Tema în Provider:', useTheme());\n});\nconsole.log('Tema dupa Provider:', useTheme());",
        language: "javascript", expectedOutput: "Tema globală: light\nTema în Provider: dark\nTema dupa Provider: light",
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Simulează un store Zustand: creează o funcție `createStore(initialState)` care returnează `{ getState, setState, subscribe }`. subscribe(fn) apelează fn la fiecare schimbare. Testează cu un counter.",
        starterCode: "function createStore(initialState) {\n  let state = initialState;\n  const listeners = [];\n  return {\n    getState() { return state; },\n    setState(newState) {\n      state = { ...state, ...newState };\n      listeners.forEach(fn => fn(state));\n    },\n    subscribe(fn) { listeners.push(fn); }\n  };\n}\n\nconst store = createStore({ count: 0 });\nstore.subscribe(s => console.log('Stare nouă:', s.count));\nstore.setState({ count: 1 });\nstore.setState({ count: 2 });\nconsole.log('Final:', store.getState().count);",
        language: "javascript", expectedOutput: "Stare nouă: 1\nStare nouă: 2\nFinal: 2",
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Simulează un reducer pentru un coș de cumpărături: acțiunile `ADD_ITEM`, `REMOVE_ITEM` și `CLEAR_CART`. Testează adăugând 2 produse, ștergând unul, și golind coșul.",
        starterCode: "function cartReducer(state = [], action) {\n  switch (action.type) {\n    case 'ADD_ITEM': return [...state, action.item];\n    case 'REMOVE_ITEM': return state.filter(item => item.id !== action.id);\n    case 'CLEAR_CART': return [];\n    default: return state;\n  }\n}\n\nlet cart = cartReducer(undefined, {});\ncart = cartReducer(cart, { type: 'ADD_ITEM', item: { id: 1, name: 'Laptop' } });\ncart = cartReducer(cart, { type: 'ADD_ITEM', item: { id: 2, name: 'Mouse' } });\nconsole.log('Coș:', cart.map(i => i.name).join(', '));\ncart = cartReducer(cart, { type: 'REMOVE_ITEM', id: 1 });\nconsole.log('Dupa stergere:', cart.map(i => i.name).join(', '));\ncart = cartReducer(cart, { type: 'CLEAR_CART' });\nconsole.log('Dupa golire:', cart.length, 'produse');",
        language: "javascript", expectedOutput: "Coș: Laptop, Mouse\nDupa stergere: Mouse\nDupa golire: 0 produse",
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Implementează middleware pentru un store: `applyMiddleware(store, middleware)` — middleware primește `(getState, dispatch)` și returnează o funcție care înfășoară dispatch-ul. Creează un logger middleware care afișează acțiunile.",
        starterCode: "function createSimpleStore(reducer) {\n  let state = reducer(undefined, {});\n  let dispatch = (action) => { state = reducer(state, action); };\n  return {\n    getState: () => state,\n    dispatch: (action) => dispatch(action),\n    applyMiddleware(middleware) {\n      dispatch = middleware(this.getState, dispatch);\n    }\n  };\n}\n\nconst loggerMiddleware = (getState, next) => (action) => {\n  console.log(`Dispatch: ${action.type}`);\n  next(action);\n};\n\nconst store = createSimpleStore((s = 0, a) => a.type === 'INC' ? s + 1 : s);\nstore.applyMiddleware(loggerMiddleware);\nstore.dispatch({ type: 'INC' });\nstore.dispatch({ type: 'INC' });\nconsole.log('Stare:', store.getState());",
        language: "javascript", expectedOutput: "Dispatch: INC\nDispatch: INC\nStare: 2",
      },
    ],
  },

  {
    lessonId: "6a021b61f0ec7fc9c03a6899",
    name: "23. Forms cu React Hook Form",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează: în React Hook Form, funcția `___` înregistrează un câmp de formular.",
        options: [], answer: "register",
        starterCode: "", language: "javascript", expectedOutput: "",
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează: hook-ul principal din React Hook Form este ___.",
        options: [], answer: "useForm",
        starterCode: "", language: "javascript", expectedOutput: "",
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează: `handleSubmit(onSubmit)` wrappează handler-ul și validează formularul ___ submit.",
        options: [], answer: "la",
        starterCode: "", language: "javascript", expectedOutput: "",
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează: erorile de validare ale unui câmp sunt accesibile prin obiectul `___`.",
        options: [], answer: "errors",
        starterCode: "", language: "javascript", expectedOutput: "",
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează: regula de validare `required: true` marchează un câmp ca ___.",
        options: [], answer: "obligatoriu",
        starterCode: "", language: "javascript", expectedOutput: "",
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Simulează validarea unui formular de login: creează o funcție `validateLoginForm(data)` care verifică că `email` conține '@' și `password` are minim 6 caractere. Returnează `{ valid, errors }`. Testează cu 3 cazuri.",
        starterCode: "function validateLoginForm(data) {\n  const errors = {};\n  if (!data.email.includes('@')) errors.email = 'Email invalid';\n  if (data.password.length < 6) errors.password = 'Parola prea scurtă (min 6)';\n  return { valid: Object.keys(errors).length === 0, errors };\n}\n\nconst r1 = validateLoginForm({ email: 'test@test.com', password: 'parola123' });\nconsole.log('Valid:', r1.valid);\n\nconst r2 = validateLoginForm({ email: 'invalid', password: '123' });\nconsole.log('Valid:', r2.valid, '| Erori:', Object.values(r2.errors).join(', '));",
        language: "javascript", expectedOutput: "Valid: true\nValid: false | Erori: Email invalid, Parola prea scurtă (min 6)",
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Simulează un form cu validare watch: creează `watchForm(fields, rules)`. Funcția `checkField(name, value)` verifică regula și afișează status. Testează câmpurile `name` (min 2 chars) și `email` (cu '@').",
        starterCode: "function createFormValidator(rules) {\n  return {\n    checkField(name, value) {\n      const rule = rules[name];\n      if (!rule) return;\n      let error = null;\n      if (rule.minLength && value.length < rule.minLength)\n        error = `${name}: minim ${rule.minLength} caractere`;\n      if (rule.pattern && !rule.pattern.test(value))\n        error = `${name}: format invalid`;\n      console.log(error ? `✗ ${error}` : `✓ ${name}: valid`);\n    }\n  };\n}\n\nconst validator = createFormValidator({\n  name: { minLength: 2 },\n  email: { pattern: /@/ }\n});\n\nvalidator.checkField('name', 'A');\nvalidator.checkField('name', 'Ana');\nvalidator.checkField('email', 'nu-e-email');\nvalidator.checkField('email', 'test@test.com');",
        language: "javascript", expectedOutput: "✗ name: minim 2 caractere\n✓ name: valid\n✗ email: format invalid\n✓ email: valid",
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Implementează un formular de înregistrare cu validare complexă: `username` (3-20 chars, fără spații), `email` (cu '@' și '.'), `password` (min 8 chars, cu cifră). Afișează toate erorile sau 'Form valid'.",
        starterCode: "function validateRegisterForm({ username, email, password }) {\n  const errors = [];\n  if (username.length < 3 || username.length > 20) errors.push('Username: 3-20 caractere');\n  if (/\\s/.test(username)) errors.push('Username: fără spații');\n  if (!email.includes('@') || !email.includes('.')) errors.push('Email invalid');\n  if (password.length < 8) errors.push('Parolă: min 8 caractere');\n  if (!/\\d/.test(password)) errors.push('Parolă: necesită o cifră');\n  if (errors.length === 0) console.log('Form valid');\n  else errors.forEach(e => console.log('Eroare:', e));\n}\n\nvalidateRegisterForm({ username: 'cr', email: 'test@test.com', password: 'parola1' });\nconsole.log('---');\nvalidateRegisterForm({ username: 'cristi', email: 'cristi@test.com', password: 'Parola123' });",
        language: "javascript", expectedOutput: "Eroare: Username: 3-20 caractere\n---\nForm valid",
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Simulează `setValue` din React Hook Form: creează un obiect `formState` și o funcție `setValue(field, value)` care actualizează câmpul și retriggerează validarea. Afișează câmpul și dacă trece validarea.",
        starterCode: "const formValues = { name: '', age: '' };\nconst validators = {\n  name: v => v.length >= 2 || 'Minim 2 caractere',\n  age: v => (Number(v) >= 18 && Number(v) <= 120) || 'Vârstă 18-120'\n};\n\nfunction setValue(field, value) {\n  formValues[field] = value;\n  const result = validators[field] ? validators[field](value) : true;\n  if (result === true) console.log(`${field}: '${value}' ✓`);\n  else console.log(`${field}: '${value}' ✗ — ${result}`);\n}\n\nsetValue('name', 'A');\nsetValue('name', 'Ana');\nsetValue('age', '15');\nsetValue('age', '25');",
        language: "javascript", expectedOutput: "name: 'A' ✗ — Minim 2 caractere\nname: 'Ana' ✓\nage: '15' ✗ — Vârstă 18-120\nage: '25' ✓",
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Creează o funcție `buildForm(schema)` care generează un validator pentru un formular. Schema e un obiect `{ fieldName: { required, minLength, maxLength } }`. Returnează o funcție `validate(data)` care returnează erorile.",
        starterCode: "function buildForm(schema) {\n  return function validate(data) {\n    const errors = {};\n    for (const [field, rules] of Object.entries(schema)) {\n      const value = data[field] ?? '';\n      if (rules.required && !value) { errors[field] = 'Câmp obligatoriu'; continue; }\n      if (rules.minLength && value.length < rules.minLength) errors[field] = `Minim ${rules.minLength} caractere`;\n      if (rules.maxLength && value.length > rules.maxLength) errors[field] = `Maxim ${rules.maxLength} caractere`;\n    }\n    return errors;\n  };\n}\n\nconst validate = buildForm({\n  username: { required: true, minLength: 3, maxLength: 20 },\n  bio: { maxLength: 100 }\n});\n\nconsole.log(JSON.stringify(validate({ username: 'ab', bio: 'Salut' })));\nconsole.log(JSON.stringify(validate({ username: 'cristi', bio: '' })));",
        language: "javascript", expectedOutput: "{\"username\":\"Minim 3 caractere\"}\n{}",
      },
    ],
  },

  {
    lessonId: "6a021b62f0ec7fc9c03a68a0",
    name: "24. Zod — validare și tipuri",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează: în Zod, un câmp opțional se marchează cu metoda chain `.___()` .",
        options: [], answer: "optional",
        starterCode: "", language: "javascript", expectedOutput: "",
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează: `z.string().min(3)` validează că stringul are ___ 3 caractere.",
        options: [], answer: "minim",
        starterCode: "", language: "javascript", expectedOutput: "",
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează: pentru a valida un email în Zod folosim `z.string().___()` .",
        options: [], answer: "email",
        starterCode: "", language: "javascript", expectedOutput: "",
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează: metoda `schema.___()` parsează datele și aruncă eroare dacă sunt invalide.",
        options: [], answer: "parse",
        starterCode: "", language: "javascript", expectedOutput: "",
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează: metoda `schema.safeParse()` returnează `{ success, ___, error }` fără a arunca excepție.",
        options: [], answer: "data",
        starterCode: "", language: "javascript", expectedOutput: "",
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Simulează validarea Zod pentru un schema simplu: creează o funcție `validateUser(data)` care verifică că `name` e string cu min 2 chars, `age` e number între 0-120, `email` conține '@'. Afișează succesul sau erorile.",
        starterCode: "function validateUser(data) {\n  const errors = [];\n  if (typeof data.name !== 'string' || data.name.length < 2)\n    errors.push('name: minim 2 caractere');\n  if (typeof data.age !== 'number' || data.age < 0 || data.age > 120)\n    errors.push('age: număr între 0-120');\n  if (!data.email?.includes('@'))\n    errors.push('email: format invalid');\n  if (errors.length === 0) console.log('Valid:', JSON.stringify(data));\n  else errors.forEach(e => console.log('Eroare:', e));\n}\n\nvalidateUser({ name: 'Ana', age: 25, email: 'ana@test.com' });\nvalidateUser({ name: 'A', age: 200, email: 'invalid' });",
        language: "javascript", expectedOutput: "Valid: {\"name\":\"Ana\",\"age\":25,\"email\":\"ana@test.com\"}\nEroare: name: minim 2 caractere\nEroare: age: număr între 0-120\nEroare: email: format invalid",
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Simulează `z.object` și `z.array`: creează o funcție `validateProductList(data)` care verifică că data e un array de obiecte cu `id` (number), `name` (string), `price` (number pozitiv). Testează cu date valide și invalide.",
        starterCode: "function validateProduct(p) {\n  if (typeof p.id !== 'number') return 'id trebuie să fie number';\n  if (typeof p.name !== 'string' || p.name.length < 1) return 'name invalid';\n  if (typeof p.price !== 'number' || p.price <= 0) return 'price trebuie pozitiv';\n  return null;\n}\n\nfunction validateProductList(data) {\n  if (!Array.isArray(data)) { console.log('Eroare: se așteptă un array'); return; }\n  data.forEach((p, i) => {\n    const err = validateProduct(p);\n    if (err) console.log(`Item ${i}: ${err}`);\n    else console.log(`Item ${i}: valid`);\n  });\n}\n\nvalidateProductList([\n  { id: 1, name: 'Laptop', price: 3000 },\n  { id: '2', name: '', price: -50 }\n]);",
        language: "javascript", expectedOutput: "Item 0: valid\nItem 1: id trebuie să fie number",
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Simulează `z.union` și `z.enum`: creează o funcție `validateStatus(value)` care acceptă valorile `'active' | 'inactive' | 'pending'`. Testează cu valori valide și invalide.",
        starterCode: "const VALID_STATUSES = ['active', 'inactive', 'pending'];\n\nfunction validateStatus(value) {\n  if (VALID_STATUSES.includes(value)) {\n    console.log(`Status valid: ${value}`);\n  } else {\n    console.log(`Eroare: '${value}' nu este un status valid. Valori acceptate: ${VALID_STATUSES.join(', ')}`);\n  }\n}\n\nvalidateStatus('active');\nvalidateStatus('pending');\nvalidateStatus('deleted');\nvalidateStatus('ACTIVE');",
        language: "javascript", expectedOutput: "Status valid: active\nStatus valid: pending\nEroare: 'deleted' nu este un status valid. Valori acceptate: active, inactive, pending\nEroare: 'ACTIVE' nu este un status valid. Valori acceptate: active, inactive, pending",
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Implementează `safeParse`: creează o funcție `safeParse(schema, data)` unde schema e un obiect cu validatori per câmp. Returnează `{success: true, data}` sau `{success: false, errors}`. Testează.",
        starterCode: "function safeParse(schema, data) {\n  const errors = {};\n  for (const [field, validator] of Object.entries(schema)) {\n    const result = validator(data[field]);\n    if (result !== true) errors[field] = result;\n  }\n  const success = Object.keys(errors).length === 0;\n  return success ? { success: true, data } : { success: false, errors };\n}\n\nconst userSchema = {\n  name: v => (typeof v === 'string' && v.length >= 2) || 'Minim 2 caractere',\n  age: v => (typeof v === 'number' && v >= 0) || 'Trebuie să fie number pozitiv'\n};\n\nconst r1 = safeParse(userSchema, { name: 'Ana', age: 25 });\nconsole.log('Success:', r1.success);\n\nconst r2 = safeParse(userSchema, { name: 'A', age: -1 });\nconsole.log('Success:', r2.success, '| Erori:', JSON.stringify(r2.errors));",
        language: "javascript", expectedOutput: "Success: true\nSuccess: false | Erori: {\"name\":\"Minim 2 caractere\",\"age\":\"Trebuie să fie number pozitiv\"}",
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Creează un validator combinat `z.refine`: funcție `validatePassword(pass)` care verifică: min 8 chars, cel puțin o literă mare, cel puțin o cifră, cel puțin un caracter special (!@#$%). Afișează toate regulile care nu sunt respectate.",
        starterCode: "function validatePassword(pass) {\n  const checks = [\n    { test: pass.length >= 8, msg: 'Minim 8 caractere' },\n    { test: /[A-Z]/.test(pass), msg: 'Cel puțin o literă mare' },\n    { test: /[0-9]/.test(pass), msg: 'Cel puțin o cifră' },\n    { test: /[!@#$%]/.test(pass), msg: 'Cel puțin un caracter special (!@#$%)' }\n  ];\n  const failed = checks.filter(c => !c.test);\n  if (failed.length === 0) console.log('Parolă validă');\n  else failed.forEach(c => console.log('✗', c.msg));\n}\n\nvalidatePassword('abc');\nconsole.log('---');\nvalidatePassword('Parola1!');",
        language: "javascript", expectedOutput: "✗ Minim 8 caractere\n✗ Cel puțin o literă mare\n✗ Cel puțin o cifră\n✗ Cel puțin un caracter special (!@#$%)\n---\nParolă validă",
      },
    ],
  },

  {
    lessonId: "6a021b63f0ec7fc9c03a68a7",
    name: "25. Testing — Vitest și Testing Library",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează: în Vitest/Jest, un test se definește cu funcția ___ sau `it`.",
        options: [], answer: "test",
        starterCode: "", language: "javascript", expectedOutput: "",
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează: `expect(value).toBe(expected)` verifică ___ strictă între valori.",
        options: [], answer: "egalitatea",
        starterCode: "", language: "javascript", expectedOutput: "",
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează: Testing Library urmează filozofia de a testa din perspectiva ___.",
        options: [], answer: "utilizatorului",
        starterCode: "", language: "javascript", expectedOutput: "",
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează: `getByRole`, `getByText`, `getByLabelText` sunt ___ din Testing Library.",
        options: [], answer: "query-uri",
        starterCode: "", language: "javascript", expectedOutput: "",
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează: funcția `describe` grupează mai multe teste înrudite într-o ___ de teste.",
        options: [], answer: "suită",
        starterCode: "", language: "javascript", expectedOutput: "",
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `add(a, b)` și un mini test runner care verifică că add(2,3)===5, add(-1,1)===0, add(0,0)===0. Afișează PASS sau FAIL pentru fiecare test.",
        starterCode: "function add(a, b) { return a + b; }\n\nfunction expect(value) {\n  return {\n    toBe(expected) {\n      if (value === expected) console.log('PASS');\n      else console.log(`FAIL: primit ${value}, așteptat ${expected}`);\n    }\n  };\n}\n\nexpect(add(2, 3)).toBe(5);\nexpect(add(-1, 1)).toBe(0);\nexpect(add(0, 0)).toBe(0);",
        language: "javascript", expectedOutput: "PASS\nPASS\nPASS",
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Implementează un mini test framework cu `describe`, `it` și `expect`. Afișează rezultatele nested. Testează o funcție `multiply(a,b)` cu 3 teste.",
        starterCode: "function describe(name, fn) {\n  console.log(`\\n${name}`);\n  fn();\n}\n\nfunction it(name, fn) {\n  try {\n    fn();\n    console.log(`  ✓ ${name}`);\n  } catch (e) {\n    console.log(`  ✗ ${name}: ${e.message}`);\n  }\n}\n\nfunction expect(val) {\n  return { toBe(exp) { if (val !== exp) throw new Error(`${val} !== ${exp}`); } };\n}\n\nfunction multiply(a, b) { return a * b; }\n\ndescribe('multiply()', () => {\n  it('înmulțește pozitive', () => expect(multiply(3, 4)).toBe(12));\n  it('înmulțește cu zero', () => expect(multiply(5, 0)).toBe(0));\n  it('înmulțește negative', () => expect(multiply(-2, 3)).toBe(-6));\n});",
        language: "javascript", expectedOutput: "\nmultiply()\n  ✓ înmulțește pozitive\n  ✓ înmulțește cu zero\n  ✓ înmulțește negative",
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Testează o funcție `capitalize(str)` (face prima literă mare, restul mici) cu 5 cazuri: string normal, deja capitalizat, toate majuscule, string gol, un singur caracter.",
        starterCode: "function capitalize(str) {\n  if (!str) return '';\n  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();\n}\n\nconst tests = [\n  [capitalize('hello'), 'Hello', 'string normal'],\n  [capitalize('Hello'), 'Hello', 'deja capitalizat'],\n  [capitalize('WORLD'), 'World', 'toate majuscule'],\n  [capitalize(''), '', 'string gol'],\n  [capitalize('a'), 'A', 'un caracter']\n];\n\ntests.forEach(([result, expected, name]) => {\n  console.log(result === expected ? `PASS: ${name}` : `FAIL: ${name}`);\n});",
        language: "javascript", expectedOutput: "PASS: string normal\nPASS: deja capitalizat\nPASS: toate majuscule\nPASS: string gol\nPASS: un caracter",
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Testează o funcție `filterByAge(users, minAge)` cu mock data. Verifică că returnează doar userii cu vârstă >= minAge. Scrie 3 teste cu assertions clare.",
        starterCode: "function filterByAge(users, minAge) {\n  return users.filter(u => u.age >= minAge);\n}\n\nconst users = [\n  { name: 'Ana', age: 17 },\n  { name: 'Bogdan', age: 25 },\n  { name: 'Cristi', age: 18 },\n  { name: 'Diana', age: 15 }\n];\n\nconst adults = filterByAge(users, 18);\nconsole.log('Test 1 - length:', adults.length === 2 ? 'PASS' : 'FAIL');\nconsole.log('Test 2 - include Bogdan:', adults.some(u => u.name === 'Bogdan') ? 'PASS' : 'FAIL');\nconsole.log('Test 3 - exclude Ana:', !adults.some(u => u.name === 'Ana') ? 'PASS' : 'FAIL');",
        language: "javascript", expectedOutput: "Test 1 - length: PASS\nTest 2 - include Bogdan: PASS\nTest 3 - exclude Ana: PASS",
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Implementează testare async: creează o funcție async `fetchUser(id)` (returnează user din mock după 0ms). Scrie un test async care verifică că fetchUser(1) returnează userul cu name='Ana'.",
        starterCode: "async function fetchUser(id) {\n  const users = { 1: { name: 'Ana', role: 'Admin' }, 2: { name: 'Ion', role: 'User' } };\n  return users[id] || null;\n}\n\nasync function runTests() {\n  const user = await fetchUser(1);\n  console.log('Test name Ana:', user.name === 'Ana' ? 'PASS' : 'FAIL');\n  console.log('Test role Admin:', user.role === 'Admin' ? 'PASS' : 'FAIL');\n  const notFound = await fetchUser(99);\n  console.log('Test null pentru 99:', notFound === null ? 'PASS' : 'FAIL');\n}\n\nrunTests();",
        language: "javascript", expectedOutput: "Test name Ana: PASS\nTest role Admin: PASS\nTest null pentru 99: PASS",
      },
    ],
  },

  {
    lessonId: "6a021b64f0ec7fc9c03a68ae",
    name: "26. Storybook — UI development",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează: în Storybook, fiecare variantă a unui component se numește ___.",
        options: [], answer: "story",
        starterCode: "", language: "javascript", expectedOutput: "",
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează: fișierele de stories au extensia `___` în Storybook.",
        options: [], answer: ".stories.tsx",
        starterCode: "", language: "javascript", expectedOutput: "",
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează: în CSF (Component Story Format), default export-ul definește ___ story-ului.",
        options: [], answer: "meta",
        starterCode: "", language: "javascript", expectedOutput: "",
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează: `args` în Storybook reprezintă ___ pasate componentei.",
        options: [], answer: "props",
        starterCode: "", language: "javascript", expectedOutput: "",
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează: Storybook permite dezvoltarea componentelor în ___ă de restul aplicației.",
        options: [], answer: "izolar",
        starterCode: "", language: "javascript", expectedOutput: "",
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Simulează story-uri pentru un Button: creează un obiect `ButtonStories` cu stories `Primary`, `Secondary` și `Disabled`. Fiecare story definește args-urile (label, variant, disabled). Afișează configurația fiecărui story.",
        starterCode: "const ButtonStories = {\n  meta: { component: 'Button', title: 'UI/Button' },\n  Primary: { args: { label: 'Click me', variant: 'primary', disabled: false } },\n  Secondary: { args: { label: 'Cancel', variant: 'secondary', disabled: false } },\n  Disabled: { args: { label: 'Disabled', variant: 'primary', disabled: true } }\n};\n\nObject.entries(ButtonStories).forEach(([name, story]) => {\n  if (name === 'meta') return;\n  console.log(`Story: ${name} | args:`, JSON.stringify(story.args));\n});",
        language: "javascript", expectedOutput: "Story: Primary | args: {\"label\":\"Click me\",\"variant\":\"primary\",\"disabled\":false}\nStory: Secondary | args: {\"label\":\"Cancel\",\"variant\":\"secondary\",\"disabled\":false}\nStory: Disabled | args: {\"label\":\"Disabled\",\"variant\":\"primary\",\"disabled\":true}",
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Simulează render cu args: creează o funcție `renderWithArgs(component, args)` care apelează component cu args și înregistrează output-ul. Testează cu un Button component și 3 variante de args.",
        starterCode: "function Button({ label, variant, disabled }) {\n  const state = disabled ? '[disabled]' : `[${variant}]`;\n  return `<Button ${state}>${label}</Button>`;\n}\n\nfunction renderWithArgs(component, args) {\n  const result = component(args);\n  console.log(result);\n}\n\nrenderWithArgs(Button, { label: 'Save', variant: 'primary', disabled: false });\nrenderWithArgs(Button, { label: 'Delete', variant: 'danger', disabled: false });\nrenderWithArgs(Button, { label: 'Submit', variant: 'primary', disabled: true });",
        language: "javascript", expectedOutput: "<Button [primary]>Save</Button>\n<Button [danger]>Delete</Button>\n<Button [disabled]>Submit</Button>",
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Simulează un catalog de stories: creează un array de componente cu stories, fiecare cu `name` și `stories` array. Afișează un catalog ierarhic.",
        starterCode: "const catalog = [\n  {\n    name: 'Button',\n    stories: ['Primary', 'Secondary', 'Disabled', 'Loading']\n  },\n  {\n    name: 'Input',\n    stories: ['Default', 'WithLabel', 'Error', 'Disabled']\n  },\n  {\n    name: 'Card',\n    stories: ['Basic', 'WithImage', 'WithActions']\n  }\n];\n\ncatalog.forEach(comp => {\n  console.log(`${comp.name} (${comp.stories.length} stories):`);\n  comp.stories.forEach(s => console.log(`  - ${s}`));\n});",
        language: "javascript", expectedOutput: "Button (4 stories):\n  - Primary\n  - Secondary\n  - Disabled\n  - Loading\nInput (4 stories):\n  - Default\n  - WithLabel\n  - Error\n  - Disabled\nCard (3 stories):\n  - Basic\n  - WithImage\n  - WithActions",
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Simulează decorators în Storybook: creează o funcție `withTheme(story, theme)` care înfășoară story-ul cu un wrapper de temă. Afișează output-ul story-ului cu light și dark theme.",
        starterCode: "function withTheme(storyFn, theme) {\n  return function(args) {\n    console.log(`[Theme: ${theme}]`);\n    storyFn(args);\n    console.log(`[/Theme]`);\n  };\n}\n\nfunction MyStory(args) {\n  console.log(`  Component: ${args.label}`);\n}\n\nconst LightStory = withTheme(MyStory, 'light');\nconst DarkStory = withTheme(MyStory, 'dark');\n\nLightStory({ label: 'Submit' });\nDarkStory({ label: 'Cancel' });",
        language: "javascript", expectedOutput: "[Theme: light]\n  Component: Submit\n[/Theme]\n[Theme: dark]\n  Component: Cancel\n[/Theme]",
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Creează un script de generare automată de stories: funcția `generateStories(componentName, variants)` creează obiectele story pentru fiecare variantă. Afișează story-urile generate ca JSON.",
        starterCode: "function generateStories(componentName, variants) {\n  const stories = {};\n  variants.forEach(v => {\n    const name = v.name;\n    stories[name] = { args: v.args, name: `${componentName} - ${name}` };\n  });\n  return stories;\n}\n\nconst cardStories = generateStories('Card', [\n  { name: 'Basic', args: { title: 'Card simplu', hasImage: false } },\n  { name: 'WithImage', args: { title: 'Card cu imagine', hasImage: true } }\n]);\n\nObject.entries(cardStories).forEach(([name, story]) => {\n  console.log(`${name}: ${story.name} | hasImage=${story.args.hasImage}`);\n});",
        language: "javascript", expectedOutput: "Basic: Card - Basic | hasImage=false\nWithImage: Card - WithImage | hasImage=true",
      },
    ],
  },

  {
    lessonId: "6a021b65f0ec7fc9c03a68b5",
    name: "27. Performance — memo, useMemo, useCallback",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează: `React.memo` înfășoară un component funcțional și îl re-randează doar dacă ___ s-au schimbat.",
        options: [], answer: "props",
        starterCode: "", language: "javascript", expectedOutput: "",
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează: un calcul considerat 'costisitor' ar trebui optimizat cu ___.",
        options: [], answer: "useMemo",
        starterCode: "", language: "javascript", expectedOutput: "",
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează: `useCallback` previne re-crearea funcțiilor, util când sunt pasate ca props la componente ___.",
        options: [], answer: "memoizate",
        starterCode: "", language: "javascript", expectedOutput: "",
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează: array-ul de dependențe `[]` la useMemo/useCallback înseamnă că se recalculează o singură dată la ___.",
        options: [], answer: "montare",
        starterCode: "", language: "javascript", expectedOutput: "",
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează: instrumentul React DevTools are un tab ___ pentru vizualizarea re-randărilor.",
        options: [], answer: "Profiler",
        starterCode: "", language: "javascript", expectedOutput: "",
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Demonstrează memoizare: creează o funcție `computeExpensive(n)` care calculează suma pătratelor 1..n. Implementează o versiune memoizată. Compară performanța: apelează cu n=1000 de 3 ori și afișează rezultatele.",
        starterCode: "const cache = new Map();\n\nfunction computeExpensive(n) {\n  if (cache.has(n)) return cache.get(n);\n  let sum = 0;\n  for (let i = 1; i <= n; i++) sum += i * i;\n  cache.set(n, sum);\n  return sum;\n}\n\nconsole.log(computeExpensive(100));\nconsole.log(computeExpensive(100)); // din cache\nconsole.log(computeExpensive(50));",
        language: "javascript", expectedOutput: "338350\n338350\n42925",
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Simulează un component cu React.memo: creează o funcție `createMemoizedComponent(fn)` care evită re-execuția dacă props nu s-au schimbat. Testează cu aceleași props și props diferite.",
        starterCode: "function createMemoizedComponent(fn) {\n  let lastProps = null;\n  let renderCount = 0;\n  return function(props) {\n    if (JSON.stringify(props) === JSON.stringify(lastProps)) {\n      console.log('Skip render (props neschimbate)');\n      return;\n    }\n    lastProps = props;\n    renderCount++;\n    fn(props, renderCount);\n  };\n}\n\nconst MemoCard = createMemoizedComponent((props, count) => {\n  console.log(`Render #${count}: ${props.title}`);\n});\n\nMemoCard({ title: 'React' });\nMemoCard({ title: 'React' });\nMemoCard({ title: 'Vue' });",
        language: "javascript", expectedOutput: "Render #1: React\nSkip render (props neschimbate)\nRender #2: Vue",
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Implementează un sistem de profiling: creează `profile(name, fn)` care măsoară de câte ori o funcție e apelată și afișează statistici la final. Simulează 5 apeluri și afișează raportul.",
        starterCode: "function createProfiler() {\n  const stats = {};\n  return {\n    wrap(name, fn) {\n      stats[name] = 0;\n      return function(...args) {\n        stats[name]++;\n        return fn(...args);\n      };\n    },\n    report() {\n      Object.entries(stats).forEach(([name, count]) => {\n        console.log(`${name}: apelat de ${count} ori`);\n      });\n    }\n  };\n}\n\nconst profiler = createProfiler();\nconst expensiveOp = profiler.wrap('expensiveOp', x => x * 2);\n\nfor (let i = 0; i < 5; i++) expensiveOp(i);\nprofiler.report();",
        language: "javascript", expectedOutput: "expensiveOp: apelat de 5 ori",
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Simulează lazy loading: creează o funcție `lazyLoad(moduleName, loader)` care încarcă un modul o singură dată la primul acces. La apeluri ulterioare, returnează din cache. Afișează 'Încărcat' sau 'Din cache'.",
        starterCode: "function createLazyLoader() {\n  const loaded = {};\n  return function lazyLoad(name, loader) {\n    if (loaded[name]) {\n      console.log(`${name}: Din cache`);\n      return loaded[name];\n    }\n    console.log(`${name}: Încărcat`);\n    loaded[name] = loader();\n    return loaded[name];\n  };\n}\n\nconst lazyLoad = createLazyLoader();\nlazyLoad('Chart', () => ({ type: 'chart' }));\nlazyLoad('Chart', () => ({ type: 'chart' }));\nlazyLoad('Map', () => ({ type: 'map' }));",
        language: "javascript", expectedOutput: "Chart: Încărcat\nChart: Din cache\nMap: Încărcat",
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Demonstrează virtualizare simplă: funcția `virtualList(items, visibleCount, scrollIndex)` returnează doar elementele vizibile dintr-o listă mare. Afișează elementele vizibile pentru diferite poziții de scroll.",
        starterCode: "function virtualList(items, visibleCount, scrollIndex) {\n  const start = Math.max(0, scrollIndex);\n  const end = Math.min(items.length, start + visibleCount);\n  return items.slice(start, end);\n}\n\nconst items = Array.from({ length: 100 }, (_, i) => `Item ${i + 1}`);\n\nconsole.log('La scroll 0:');\nvirtualList(items, 3, 0).forEach(item => console.log(' ', item));\n\nconsole.log('La scroll 50:');\nvirtualList(items, 3, 50).forEach(item => console.log(' ', item));",
        language: "javascript", expectedOutput: "La scroll 0:\n  Item 1\n  Item 2\n  Item 3\nLa scroll 50:\n  Item 51\n  Item 52\n  Item 53",
      },
    ],
  },

  {
    lessonId: "6a021b66f0ec7fc9c03a68bc",
    name: "28. Virtualization — liste mari",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează: virtualizarea randează doar elementele ___ în viewport, nu întreaga listă.",
        options: [], answer: "vizibile",
        starterCode: "", language: "javascript", expectedOutput: "",
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează: librăria populară pentru virtualizare în React se numește react-___.",
        options: [], answer: "window",
        starterCode: "", language: "javascript", expectedOutput: "",
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează: pentru ca virtualizarea să funcționeze, fiecare element trebuie să aibă o ___ fixă sau estimată.",
        options: [], answer: "înălțime",
        starterCode: "", language: "javascript", expectedOutput: "",
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează: în react-window, componenta `___List` este folosită pentru liste cu items de înălțime egală.",
        options: [], answer: "Fixed",
        starterCode: "", language: "javascript", expectedOutput: "",
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează: randarea a 10,000 de elemente DOM simultan cauzează probleme de ___ în browser.",
        options: [], answer: "performanță",
        starterCode: "", language: "javascript", expectedOutput: "",
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Implementează o funcție de virtualizare simplă: `getVisibleItems(totalItems, itemHeight, containerHeight, scrollTop)`. Calculează și returnează indexul de start și end al elementelor vizibile.",
        starterCode: "function getVisibleItems(totalItems, itemHeight, containerHeight, scrollTop) {\n  const start = Math.floor(scrollTop / itemHeight);\n  const visibleCount = Math.ceil(containerHeight / itemHeight);\n  const end = Math.min(totalItems - 1, start + visibleCount);\n  return { start, end, count: end - start + 1 };\n}\n\n// 1000 items, fiecare 40px, container 200px\nconst r1 = getVisibleItems(1000, 40, 200, 0);\nconsole.log(`La scroll 0: items ${r1.start}-${r1.end} (${r1.count} vizibile)`);\n\nconst r2 = getVisibleItems(1000, 40, 200, 400);\nconsole.log(`La scroll 400: items ${r2.start}-${r2.end} (${r2.count} vizibile)`);",
        language: "javascript", expectedOutput: "La scroll 0: items 0-5 (6 vizibile)\nLa scroll 400: items 10-15 (6 vizibile)",
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Creează o funcție `generateLargeList(n)` care generează n elemente și compară randarea normală (primele 5) vs virtualizată (slice din mijloc). Afișează elementele din ambele cazuri pentru n=10000.",
        starterCode: "function generateLargeList(n) {\n  return Array.from({ length: n }, (_, i) => ({ id: i, text: `Item #${i}` }));\n}\n\nconst list = generateLargeList(10000);\nconsole.log(`Total items: ${list.length}`);\n\n// Randare normală — primele 5\nconsole.log('Primele 5:');\nlist.slice(0, 5).forEach(item => console.log(' ', item.text));\n\n// Virtualizat — items 500-504\nconsole.log('Items 500-504 (virtualizat):');\nlist.slice(500, 505).forEach(item => console.log(' ', item.text));",
        language: "javascript", expectedOutput: "Total items: 10000\nPrimele 5:\n  Item #0\n  Item #1\n  Item #2\n  Item #3\n  Item #4\nItems 500-504 (virtualizat):\n  Item #500\n  Item #501\n  Item #502\n  Item #503\n  Item #504",
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Implementează un IntersectionObserver simulat: funcția `createObserver(callback, threshold)` observă elemente simulate și apelează callback când sunt 'vizibile' (pozitie <= threshold). Testează cu 5 elemente.",
        starterCode: "function createObserver(callback, threshold = 3) {\n  const observed = [];\n  return {\n    observe(element) { observed.push(element); },\n    checkVisibility(scrollPos) {\n      observed.forEach(el => {\n        if (el.position <= scrollPos + threshold) {\n          callback(el);\n        }\n      });\n    }\n  };\n}\n\nconst observer = createObserver(el => console.log(`Vizibil: ${el.name}`), 3);\nobserver.observe({ name: 'Element 1', position: 1 });\nobserver.observe({ name: 'Element 2', position: 3 });\nobserver.observe({ name: 'Element 3', position: 5 });\nobserver.checkVisibility(3);",
        language: "javascript", expectedOutput: "Vizibil: Element 1\nVizibil: Element 2",
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Simulează infinite scroll: creează o funcție `createInfiniteList(fetchPage)` cu metodele `loadMore()` și `items`. La fiecare loadMore() se adaugă 5 items noi. Simulează 3 încărcări.",
        starterCode: "function createInfiniteList(fetchPage) {\n  let page = 0;\n  let items = [];\n  return {\n    get items() { return items; },\n    async loadMore() {\n      const newItems = await fetchPage(page);\n      items = [...items, ...newItems];\n      page++;\n      console.log(`Pagina ${page} încărcată. Total: ${items.length} items`);\n    }\n  };\n}\n\nconst fetchPage = (page) => Promise.resolve(\n  Array.from({ length: 5 }, (_, i) => `Item ${page * 5 + i + 1}`)\n);\n\nconst list = createInfiniteList(fetchPage);\n\nasync function main() {\n  await list.loadMore();\n  await list.loadMore();\n  await list.loadMore();\n  console.log('Ultimele 3:', list.items.slice(-3).join(', '));\n}\n\nmain();",
        language: "javascript", expectedOutput: "Pagina 1 încărcată. Total: 5 items\nPagina 2 încărcată. Total: 10 items\nPagina 3 încărcată. Total: 15 items\nUltimele 3: Item 13, Item 14, Item 15",
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Compară performanța (număr de operații): calculează câte elemente DOM ar fi create pentru o listă de 10000 items cu randare normală vs virtualizată (200px container, 40px item height). Afișează economiile.",
        starterCode: "function comparePerformance(totalItems, containerHeight, itemHeight) {\n  const normalDOM = totalItems;\n  const virtualDOM = Math.ceil(containerHeight / itemHeight) + 2; // +2 buffer\n  const savings = Math.round((1 - virtualDOM / normalDOM) * 100);\n  console.log(`Randare normală: ${normalDOM} elemente DOM`);\n  console.log(`Virtualizat: ${virtualDOM} elemente DOM`);\n  console.log(`Economie: ${savings}% reducere`);\n}\n\ncomparePerformance(10000, 200, 40);",
        language: "javascript", expectedOutput: "Randare normală: 10000 elemente DOM\nVirtualizat: 7 elemente DOM\nEconomie: 99% reducere",
      },
    ],
  },

  {
    lessonId: "6a021b67f0ec7fc9c03a68c3",
    name: "29. Animații — Framer Motion",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează: în Framer Motion, componenta `motion.div` primește prop-ul `___` pentru animația de ieșire.",
        options: [], answer: "exit",
        starterCode: "", language: "javascript", expectedOutput: "",
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează: prop-ul `initial` definește starea ___ a animației.",
        options: [], answer: "inițială",
        starterCode: "", language: "javascript", expectedOutput: "",
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează: prop-ul `animate` definește starea ___ spre care se animează componentul.",
        options: [], answer: "finală",
        starterCode: "", language: "javascript", expectedOutput: "",
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează: `AnimatePresence` permite animarea componentelor la ___ din DOM.",
        options: [], answer: "ieșire",
        starterCode: "", language: "javascript", expectedOutput: "",
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează: prop-ul `transition` controlează ___, durata și tipul animației.",
        options: [], answer: "curba",
        starterCode: "", language: "javascript", expectedOutput: "",
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Simulează o animație de fade: creează o funcție `animateFade(element, from, to, steps)` care interpolează opacitatea de la `from` la `to` în `steps` pași și afișează fiecare valoare.",
        starterCode: "function animateFade(elementName, from, to, steps) {\n  for (let i = 0; i <= steps; i++) {\n    const opacity = from + (to - from) * (i / steps);\n    console.log(`${elementName} opacity: ${opacity.toFixed(2)}`);\n  }\n}\n\nanimateFade('Modal', 0, 1, 4);",
        language: "javascript", expectedOutput: "Modal opacity: 0.00\nModal opacity: 0.25\nModal opacity: 0.50\nModal opacity: 0.75\nModal opacity: 1.00",
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Simulează o animație de slide: funcția `animateSlide(from, to, steps)` interpolează poziția X și afișează fiecare frame.",
        starterCode: "function animateSlide(from, to, steps) {\n  for (let i = 0; i <= steps; i++) {\n    const x = Math.round(from + (to - from) * (i / steps));\n    console.log(`Frame ${i}: translateX(${x}px)`);\n  }\n}\n\nanimateSlide(-100, 0, 4);",
        language: "javascript", expectedOutput: "Frame 0: translateX(-100px)\nFrame 1: translateX(-75px)\nFrame 2: translateX(-50px)\nFrame 3: translateX(-25px)\nFrame 4: translateX(0px)",
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Simulează variante de animație (variants pattern din Framer Motion): creează un obiect `variants` cu stările `hidden`, `visible` și `exit`. Creează o funcție `applyVariant(name)` care afișează proprietățile variantei.",
        starterCode: "const variants = {\n  hidden: { opacity: 0, y: -20 },\n  visible: { opacity: 1, y: 0 },\n  exit: { opacity: 0, y: 20 }\n};\n\nfunction applyVariant(name) {\n  const v = variants[name];\n  if (!v) { console.log(`Variantă inexistentă: ${name}`); return; }\n  console.log(`Variantă '${name}': opacity=${v.opacity}, y=${v.y}px`);\n}\n\napplyVariant('hidden');\napplyVariant('visible');\napplyVariant('exit');\napplyVariant('hover');",
        language: "javascript", expectedOutput: "Variantă 'hidden': opacity=0, y=-20px\nVariantă 'visible': opacity=1, y=0px\nVariantă 'exit': opacity=0, y=20px\nVariantă inexistentă: hover",
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Simulează staggered animations (animații în cascadă): funcția `staggerAnimate(items, delay)` afișează fiecare item cu delay-ul acumulat, simulând că fiecare element pornește puțin mai târziu.",
        starterCode: "function staggerAnimate(items, delayPerItem) {\n  items.forEach((item, index) => {\n    const totalDelay = index * delayPerItem;\n    console.log(`${item}: start la ${totalDelay}ms, durată 300ms`);\n  });\n}\n\nstaggerAnimate(['Card 1', 'Card 2', 'Card 3', 'Card 4'], 100);",
        language: "javascript", expectedOutput: "Card 1: start la 0ms, durată 300ms\nCard 2: start la 100ms, durată 300ms\nCard 3: start la 200ms, durată 300ms\nCard 4: start la 300ms, durată 300ms",
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Simulează AnimatePresence: creează o funcție `animatePresence(items, renderFn)` care afișează animațiile de mount și unmount pentru o listă de items care se schimbă.",
        starterCode: "function animatePresence(prevItems, nextItems) {\n  const added = nextItems.filter(i => !prevItems.includes(i));\n  const removed = prevItems.filter(i => !nextItems.includes(i));\n  const kept = nextItems.filter(i => prevItems.includes(i));\n  \n  removed.forEach(i => console.log(`Exit: ${i} (opacity: 1 → 0)`));\n  kept.forEach(i => console.log(`Stay: ${i}`));\n  added.forEach(i => console.log(`Enter: ${i} (opacity: 0 → 1)`));\n}\n\nconst prev = ['React', 'Vue', 'Angular'];\nconst next = ['React', 'Svelte', 'Solid'];\nanimatePresence(prev, next);",
        language: "javascript", expectedOutput: "Exit: Vue (opacity: 1 → 0)\nExit: Angular (opacity: 1 → 0)\nStay: React\nEnter: Svelte (opacity: 0 → 1)\nEnter: Solid (opacity: 0 → 1)",
      },
    ],
  },

  {
    lessonId: "6a021b68f0ec7fc9c03a68ca",
    name: "30. Mini proiect — Todo App complet",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează: un Todo App complet are de obicei funcționalitățile: adăugare, ștergere, marcare ca ___ și filtrare.",
        options: [], answer: "completat",
        starterCode: "", language: "javascript", expectedOutput: "",
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează: starea unui Todo App se stochează cel mai bine într-un array de obiecte cu câmpurile `id`, `text` și `___`.",
        options: [], answer: "done",
        starterCode: "", language: "javascript", expectedOutput: "",
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează: pentru a genera ID-uri unice simple în JavaScript folosim `Date.___()` sau `Math.random()`.",
        options: [], answer: "now",
        starterCode: "", language: "javascript", expectedOutput: "",
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează: funcția de filtrare care afișează doar todo-urile incomplete returnează `!todo.___` .",
        options: [], answer: "done",
        starterCode: "", language: "javascript", expectedOutput: "",
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează: pentru persistență locală, un Todo App salvează datele în ___.",
        options: [], answer: "localStorage",
        starterCode: "", language: "javascript", expectedOutput: "",
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Implementează un Todo Store complet cu funcțiile `addTodo(text)`, `toggleTodo(id)`, `deleteTodo(id)`, `getTodos(filter)` unde filter poate fi 'all', 'active', 'done'. Testează fluxul complet.",
        starterCode: "let todos = [];\nlet nextId = 1;\n\nconst store = {\n  addTodo(text) {\n    todos.push({ id: nextId++, text, done: false });\n  },\n  toggleTodo(id) {\n    const t = todos.find(t => t.id === id);\n    if (t) t.done = !t.done;\n  },\n  deleteTodo(id) {\n    todos = todos.filter(t => t.id !== id);\n  },\n  getTodos(filter = 'all') {\n    if (filter === 'active') return todos.filter(t => !t.done);\n    if (filter === 'done') return todos.filter(t => t.done);\n    return todos;\n  }\n};\n\nstore.addTodo('Învată React');\nstore.addTodo('Fă proiectul');\nstore.addTodo('Citit docs');\nstore.toggleTodo(1);\nstore.deleteTodo(2);\nconsole.log('Toate:', store.getTodos().map(t => t.text).join(', '));\nconsole.log('Done:', store.getTodos('done').map(t => t.text).join(', '));\nconsole.log('Active:', store.getTodos('active').map(t => t.text).join(', '));",
        language: "javascript", expectedOutput: "Toate: Învată React, Citit docs\nDone: Învată React\nActive: Citit docs",
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Implementează `editTodo(id, newText)` și `reorderTodos(fromIndex, toIndex)` pentru Todo App. Testează editarea și reordonarea.",
        starterCode: "let todos = [\n  { id: 1, text: 'Task A', done: false },\n  { id: 2, text: 'Task B', done: false },\n  { id: 3, text: 'Task C', done: false }\n];\n\nfunction editTodo(id, newText) {\n  const t = todos.find(t => t.id === id);\n  if (t) { t.text = newText; console.log(`Editat: ${newText}`); }\n}\n\nfunction reorderTodos(fromIndex, toIndex) {\n  const item = todos.splice(fromIndex, 1)[0];\n  todos.splice(toIndex, 0, item);\n  console.log('Ordine nouă:', todos.map(t => t.text).join(', '));\n}\n\neditTodo(2, 'Task B (editat)');\nreorderTodos(2, 0);",
        language: "javascript", expectedOutput: "Editat: Task B (editat)\nOrdine nouă: Task C, Task A, Task B (editat)",
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Implementează statistici pentru Todo App: funcția `getStats(todos)` returnează `{total, done, active, percentDone}`. Testează cu un set de todos.",
        starterCode: "function getStats(todos) {\n  const total = todos.length;\n  const done = todos.filter(t => t.done).length;\n  const active = total - done;\n  const percentDone = total > 0 ? Math.round((done / total) * 100) : 0;\n  return { total, done, active, percentDone };\n}\n\nconst todos = [\n  { id: 1, text: 'Task 1', done: true },\n  { id: 2, text: 'Task 2', done: true },\n  { id: 3, text: 'Task 3', done: false },\n  { id: 4, text: 'Task 4', done: false }\n];\n\nconst stats = getStats(todos);\nconsole.log(`Total: ${stats.total}, Done: ${stats.done}, Active: ${stats.active}, Progres: ${stats.percentDone}%`);",
        language: "javascript", expectedOutput: "Total: 4, Done: 2, Active: 2, Progres: 50%",
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Simulează persistența în localStorage: creează funcțiile `saveTodos(todos)` și `loadTodos()` care serializează/deserializează datele. Folosește un obiect `mockStorage` în loc de localStorage. Testează save și load.",
        starterCode: "const mockStorage = {};\n\nfunction saveTodos(todos) {\n  mockStorage['todos'] = JSON.stringify(todos);\n  console.log(`Salvat ${todos.length} todos`);\n}\n\nfunction loadTodos() {\n  const data = mockStorage['todos'];\n  if (!data) return [];\n  const todos = JSON.parse(data);\n  console.log(`Încărcat ${todos.length} todos`);\n  return todos;\n}\n\nconst todos = [{ id: 1, text: 'React', done: false }, { id: 2, text: 'Node', done: true }];\nsaveTodos(todos);\nconst loaded = loadTodos();\nconsole.log('Primul todo:', loaded[0].text);",
        language: "javascript", expectedOutput: "Salvat 2 todos\nIncărcat 2 todos\nPrimul todo: React",
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Implementează un sistem de undo/redo pentru Todo App: creează un history stack. Funcțiile `addTodo`, `deleteTodo` salvează state-ul anterior. `undo()` restaurează starea anterioară. Testează.",
        starterCode: "let todos = [];\nlet nextId = 1;\nconst history = [];\n\nfunction saveHistory() { history.push(JSON.parse(JSON.stringify(todos))); }\n\nfunction addTodo(text) {\n  saveHistory();\n  todos.push({ id: nextId++, text });\n}\n\nfunction deleteTodo(id) {\n  saveHistory();\n  todos = todos.filter(t => t.id !== id);\n}\n\nfunction undo() {\n  if (history.length > 0) {\n    todos = history.pop();\n    console.log('Undo! Todos:', todos.map(t => t.text).join(', ') || '(gol)');\n  }\n}\n\naddTodo('Task 1');\naddTodo('Task 2');\nconsole.log('State:', todos.map(t => t.text).join(', '));\ndeleteTodo(1);\nconsole.log('Dupa delete:', todos.map(t => t.text).join(', '));\nundo();\nundo();",
        language: "javascript", expectedOutput: "State: Task 1, Task 2\nDupa delete: Task 2\nUndo! Todos: Task 1, Task 2\nUndo! Todos: Task 1",
      },
    ],
  },

  {
    lessonId: "6a09b2399384b94515fcf82f",
    name: "31. React 19 — Actions si use() hook",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează: în React 19, Form Actions permit trimiterea formularelor fără a apela ___ manual.",
        options: [], answer: "preventDefault",
        starterCode: "", language: "javascript", expectedOutput: "",
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează: hook-ul `useActionState` returnează `[state, ___, isPending]`.",
        options: [], answer: "dispatch",
        starterCode: "", language: "javascript", expectedOutput: "",
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează: `useFormStatus` returnează `{ pending, data, ___, action }`.",
        options: [], answer: "method",
        starterCode: "", language: "javascript", expectedOutput: "",
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează: hook-ul `use()` în React 19 poate unwrapa o ___ sau un Context.",
        options: [], answer: "Promise",
        starterCode: "", language: "javascript", expectedOutput: "",
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează: React 19 introduce `useOptimistic` pentru actualizări ___ ale UI-ului.",
        options: [], answer: "optimiste",
        starterCode: "", language: "javascript", expectedOutput: "",
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Simulează o Form Action din React 19: creează o funcție async `submitAction(prevState, formData)` care procesează un formular de login. Dacă email conține '@' și parola e >= 6 chars, returnează success. Testează cu date valide și invalide.",
        starterCode: "async function submitAction(prevState, formData) {\n  const { email, password } = formData;\n  if (!email.includes('@')) return { error: 'Email invalid' };\n  if (password.length < 6) return { error: 'Parola prea scurtă' };\n  return { success: true, user: email };\n}\n\nasync function main() {\n  const r1 = await submitAction(null, { email: 'test@test.com', password: 'parola123' });\n  console.log(r1.success ? `Logat ca: ${r1.user}` : `Eroare: ${r1.error}`);\n  \n  const r2 = await submitAction(null, { email: 'invalid', password: '123' });\n  console.log(r2.success ? `Logat` : `Eroare: ${r2.error}`);\n}\n\nmain();",
        language: "javascript", expectedOutput: "Logat ca: test@test.com\nEroare: Email invalid",
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Simulează `useActionState`: creează o funcție `createActionState(action, initialState)` care returnează `[state, dispatch]`. dispatch apelează action cu state-ul curent și actualizează state-ul. Testează cu un counter action.",
        starterCode: "function createActionState(action, initialState) {\n  let state = initialState;\n  async function dispatch(payload) {\n    state = await action(state, payload);\n    console.log('Stare nouă:', JSON.stringify(state));\n  }\n  return [() => state, dispatch];\n}\n\nasync function counterAction(state, action) {\n  if (action === 'increment') return { count: state.count + 1 };\n  if (action === 'reset') return { count: 0 };\n  return state;\n}\n\nconst [getState, dispatch] = createActionState(counterAction, { count: 0 });\n\nasync function main() {\n  await dispatch('increment');\n  await dispatch('increment');\n  await dispatch('reset');\n}\n\nmain();",
        language: "javascript", expectedOutput: "Stare nouă: {\"count\":1}\nStare nouă: {\"count\":2}\nStare nouă: {\"count\":0}",
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Simulează `useOptimistic`: creează o funcție `createOptimistic(initialValue)` cu metodele `addOptimistic(value)` (adaugă instant la UI) și `confirm()` (confirmă că serverul a răspuns). Testează un like optimist.",
        starterCode: "function createOptimistic(initialValue) {\n  let value = initialValue;\n  let pending = null;\n  return {\n    addOptimistic(update) {\n      pending = update;\n      const displayed = value + update;\n      console.log(`UI (optimist): ${displayed}`);\n    },\n    confirm() {\n      value = value + pending;\n      pending = null;\n      console.log(`Confirmat de server: ${value}`);\n    },\n    revert() {\n      pending = null;\n      console.log(`Revocat, revenim la: ${value}`);\n    }\n  };\n}\n\nconst likes = createOptimistic(42);\nlikes.addOptimistic(1);\nlikes.confirm();",
        language: "javascript", expectedOutput: "UI (optimist): 43\nConfirmat de server: 43",
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Simulează hook-ul `use(promise)`: creează o funcție `resolveUse(promise)` care wrappe o Promise și afișează statusul: 'pending', 'resolved: {value}' sau 'rejected: {error}'.",
        starterCode: "async function simulateUse(promise) {\n  console.log('Status: pending');\n  try {\n    const result = await promise;\n    console.log(`Status: resolved: ${JSON.stringify(result)}`);\n    return result;\n  } catch (e) {\n    console.log(`Status: rejected: ${e.message}`);\n    throw e;\n  }\n}\n\nasync function main() {\n  await simulateUse(Promise.resolve({ name: 'Ana' }));\n  try {\n    await simulateUse(Promise.reject(new Error('Network error')));\n  } catch {}\n}\n\nmain();",
        language: "javascript", expectedOutput: "Status: pending\nStatus: resolved: {\"name\":\"Ana\"}\nStatus: pending\nStatus: rejected: Network error",
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Simulează `useFormStatus`: creează o funcție `createFormStatus()` cu metodele `submit()` (setează pending=true), `resolve()` (pending=false, success=true), `reject(error)` (pending=false, error). Afișează statusul la fiecare pas.",
        starterCode: "function createFormStatus() {\n  let status = { pending: false, success: false, error: null };\n  return {\n    submit() {\n      status = { pending: true, success: false, error: null };\n      console.log('Status: pending=true');\n    },\n    resolve() {\n      status = { pending: false, success: true, error: null };\n      console.log('Status: success=true');\n    },\n    reject(error) {\n      status = { pending: false, success: false, error };\n      console.log(`Status: error=${error}`);\n    }\n  };\n}\n\nconst form = createFormStatus();\nform.submit();\nform.resolve();\n\nconst form2 = createFormStatus();\nform2.submit();\nform2.reject('Server error 500');",
        language: "javascript", expectedOutput: "Status: pending=true\nStatus: success=true\nStatus: pending=true\nStatus: error=Server error 500",
      },
    ],
  },

  {
    lessonId: "6a09b23b9384b94515fcf843",
    name: "32. Server Components in React",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează: Server Components (RSC) sunt randate pe ___ și nu includ JavaScript în bundle-ul clientului.",
        options: [], answer: "server",
        starterCode: "", language: "javascript", expectedOutput: "",
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează: Client Components se marchează cu directiva `___` la începutul fișierului.",
        options: [], answer: "\"use client\"",
        starterCode: "", language: "javascript", expectedOutput: "",
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează: Server Components pot accesa direct ___ și baze de date fără a expune credențialele.",
        options: [], answer: "filesystem",
        starterCode: "", language: "javascript", expectedOutput: "",
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează: props pasate de la Server Components la Client Components trebuie să fie ___.",
        options: [], answer: "serializabile",
        starterCode: "", language: "javascript", expectedOutput: "",
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează: Server Components nu pot folosi hooks React ca useState sau ___ .",
        options: [], answer: "useEffect",
        starterCode: "", language: "javascript", expectedOutput: "",
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Simulează un Server Component: creează o funcție async `UserProfileServer(userId)` care 'citește din DB' (mock) și returnează datele. Un 'Client Component' primește datele ca props și le afișează.",
        starterCode: "// Simulare Server Component\nasync function UserProfileServer(userId) {\n  const db = { 1: { name: 'Ana', role: 'Admin' }, 2: { name: 'Ion', role: 'User' } };\n  const user = db[userId];\n  if (!user) return null;\n  // Simulăm randarea cu datele\n  return { name: user.name, role: user.role };\n}\n\n// Simulare Client Component (primește props serializabile)\nfunction UserProfileClient(props) {\n  console.log(`User: ${props.name} | Rol: ${props.role}`);\n}\n\nasync function main() {\n  const props = await UserProfileServer(1);\n  if (props) UserProfileClient(props);\n}\n\nmain();",
        language: "javascript", expectedOutput: "User: Ana | Rol: Admin",
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Demonstrează granița server/client: creează funcțiile `serverFetch(endpoint)` (async, accesează 'date private') și `clientComponent(data)` (afișează date). Arată că serverFetch nu poate fi apelat din client.",
        starterCode: "// Server-side (nu se include în bundle client)\nasync function serverFetch(endpoint) {\n  const SECRET_KEY = 'secret-key-privată'; // nu ajunge la client\n  const mockData = { '/users': [{ name: 'Ana' }, { name: 'Ion' }] };\n  console.log(`[Server] Fetch ${endpoint} cu cheie secretă`);\n  return mockData[endpoint] || [];\n}\n\n// Client Component\nfunction UserList(users) {\n  console.log('[Client] Afișez useri:', users.map(u => u.name).join(', '));\n}\n\nasync function main() {\n  const users = await serverFetch('/users');\n  UserList(users);\n}\n\nmain();",
        language: "javascript", expectedOutput: "[Server] Fetch /users cu cheie secretă\n[Client] Afișez useri: Ana, Ion",
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Simulează Streaming cu Server Components: creează o funcție `streamComponent(parts)` care simulează randarea în bucăți (chunks). Fiecare parte se afișează pe rând, simulând că serverul trimite HTML incremental.",
        starterCode: "async function streamComponent(parts) {\n  for (const part of parts) {\n    await new Promise(resolve => setTimeout(resolve, 0)); // simulează async\n    console.log(`[Stream] ${part}`);\n  }\n}\n\nasync function main() {\n  await streamComponent([\n    '<Header>: Bun venit</Header>',\n    '<UserStats>: 42 posts</UserStats>',\n    '<RecentPosts>: Post 1, Post 2</RecentPosts>'\n  ]);\n  console.log('[Stream] Complet');\n}\n\nmain();",
        language: "javascript", expectedOutput: "[Stream] <Header>: Bun venit</Header>\n[Stream] <UserStats>: 42 posts</UserStats>\n[Stream] <RecentPosts>: Post 1, Post 2</RecentPosts>\n[Stream] Complet",
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Arată diferența Server vs Client Component prin exemple de ce pot/nu pot face: creează 2 funcții cu aceleași props dar capacități diferite — una cu acces la DB, alta cu useState simulat.",
        starterCode: "// Server Component — acces DB, fără hooks\nasync function PostListServer() {\n  const posts = [{ title: 'RSC Intro' }, { title: 'Next.js 15' }]; // mock DB\n  console.log('[Server] Citit din DB:', posts.length, 'posts');\n  return posts;\n}\n\n// Client Component — hooks, fără DB\nfunction PostListClient(posts) {\n  let selectedPost = null; // simulare useState\n  console.log('[Client] Randare', posts.length, 'posts');\n  posts.forEach(p => console.log('  -', p.title));\n}\n\nasync function main() {\n  const posts = await PostListServer();\n  PostListClient(posts);\n}\n\nmain();",
        language: "javascript", expectedOutput: "[Server] Citit din DB: 2 posts\n[Client] Randare 2 posts\n  - RSC Intro\n  - Next.js 15",
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Simulează caching Server Components: creează un cache pentru rezultatele server-side, iar funcția `cachedFetch(url)` returnează din cache la al doilea apel. Demonstrează beneficiul de performanță.",
        starterCode: "const serverCache = new Map();\n\nasync function cachedFetch(url) {\n  if (serverCache.has(url)) {\n    console.log(`[Cache HIT] ${url}`);\n    return serverCache.get(url);\n  }\n  console.log(`[Cache MISS] Fetch ${url}`);\n  const data = { url, data: `Date pentru ${url}`, timestamp: 1000 };\n  serverCache.set(url, data);\n  return data;\n}\n\nasync function main() {\n  await cachedFetch('/api/users');\n  await cachedFetch('/api/posts');\n  await cachedFetch('/api/users'); // din cache\n  console.log('Cache size:', serverCache.size);\n}\n\nmain();",
        language: "javascript", expectedOutput: "[Cache MISS] Fetch /api/users\n[Cache MISS] Fetch /api/posts\n[Cache HIT] /api/users\nCache size: 2",
      },
    ],
  },

  {
    lessonId: "6a09b23e9384b94515fcf857",
    name: "33. Zustand — State Management",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează: Zustand creează un store cu funcția `___` importată din 'zustand'.",
        options: [], answer: "create",
        starterCode: "", language: "javascript", expectedOutput: "",
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează: în Zustand, pentru a actualiza starea din interior folosim funcția ___.",
        options: [], answer: "set",
        starterCode: "", language: "javascript", expectedOutput: "",
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează: Zustand nu necesită un ___ ca Redux — store-ul poate fi accesat direct.",
        options: [], answer: "Provider",
        starterCode: "", language: "javascript", expectedOutput: "",
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează: pattern-ul ___ în Zustand permite împărțirea store-ului în bucăți mai mici.",
        options: [], answer: "slices",
        starterCode: "", language: "javascript", expectedOutput: "",
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează: middleware-ul `persist` din Zustand salvează starea în ___.",
        options: [], answer: "localStorage",
        starterCode: "", language: "javascript", expectedOutput: "",
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Simulează un store Zustand pentru un counter: implementează `create(storeCreator)` simplu. Store-ul are `count`, `increment()`, `decrement()`, `reset()`. Testează toate acțiunile.",
        starterCode: "function createStore(creator) {\n  let state;\n  const set = (partial) => {\n    state = typeof partial === 'function' ? partial(state) : { ...state, ...partial };\n  };\n  state = creator(set);\n  return () => state;\n}\n\nconst useStore = createStore((set) => ({\n  count: 0,\n  increment: () => set(s => ({ count: s.count + 1 })),\n  decrement: () => set(s => ({ count: s.count - 1 })),\n  reset: () => set({ count: 0 })\n}));\n\nuseStore().increment();\nuseStore().increment();\nuseStore().increment();\nconsole.log('Count:', useStore().count);\nuseStore().decrement();\nconsole.log('Count:', useStore().count);\nuseStore().reset();\nconsole.log('Count:', useStore().count);",
        language: "javascript", expectedOutput: "Count: 3\nCount: 2\nCount: 0",
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Simulează un Zustand store pentru autentificare: câmpurile `user`, `isAuthenticated`, cu acțiunile `login(user)` și `logout()`. Testează login și logout.",
        starterCode: "function createAuthStore() {\n  let state = { user: null, isAuthenticated: false };\n  return {\n    getState: () => state,\n    login(user) {\n      state = { user, isAuthenticated: true };\n      console.log(`Autentificat: ${user.name}`);\n    },\n    logout() {\n      state = { user: null, isAuthenticated: false };\n      console.log('Deconectat');\n    }\n  };\n}\n\nconst authStore = createAuthStore();\nauthStore.login({ name: 'Ana', email: 'ana@test.com' });\nconsole.log('isAuth:', authStore.getState().isAuthenticated);\nauthStore.logout();\nconsole.log('isAuth:', authStore.getState().isAuthenticated);",
        language: "javascript", expectedOutput: "Autentificat: Ana\nisAuth: true\nDeconectat\nisAuth: false",
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Implementează pattern slices în Zustand: creează un store combinat din `counterSlice` și `userSlice`. Testează că acțiunile din fiecare slice funcționează independent.",
        starterCode: "function createCombinedStore(slices) {\n  let state = {};\n  const set = (partial) => {\n    state = { ...state, ...(typeof partial === 'function' ? partial(state) : partial) };\n  };\n  for (const slice of slices) {\n    const sliceState = slice(set);\n    state = { ...state, ...sliceState };\n  }\n  return () => state;\n}\n\nconst counterSlice = (set) => ({\n  count: 0,\n  incCount: () => set(s => ({ count: s.count + 1 }))\n});\n\nconst userSlice = (set) => ({\n  username: 'Anonim',\n  setUsername: (name) => set({ username: name })\n});\n\nconst useStore = createCombinedStore([counterSlice, userSlice]);\nuseStore().incCount();\nuseStore().incCount();\nuseStore().setUsername('Ana');\nconsole.log('Count:', useStore().count);\nconsole.log('User:', useStore().username);",
        language: "javascript", expectedOutput: "Count: 2\nUser: Ana",
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Simulează middleware `devtools` pentru Zustand: creează un wrapper care logează fiecare acțiune cu `[action] state before → state after`. Testează cu un store simplu.",
        starterCode: "function withDevtools(storeFn) {\n  return function(...args) {\n    const store = storeFn(...args);\n    const originalSet = store.set;\n    let actionName = 'unknown';\n    store.set = (partial, name) => {\n      const before = store.getState();\n      originalSet(partial);\n      const after = store.getState();\n      console.log(`[${name || 'set'}] count: ${before.count} → ${after.count}`);\n    };\n    return store;\n  };\n}\n\n// Simulare simplificată\nlet state = { count: 0 };\nfunction trackedSet(partial, name) {\n  const before = { ...state };\n  state = { ...state, ...partial };\n  console.log(`[${name}] count: ${before.count} → ${state.count}`);\n}\n\ntrackedSet({ count: state.count + 1 }, 'increment');\ntrackedSet({ count: state.count + 1 }, 'increment');\ntrackedSet({ count: 0 }, 'reset');",
        language: "javascript", expectedOutput: "[increment] count: 0 → 1\n[increment] count: 1 → 2\n[reset] count: 2 → 0",
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Simulează `persist` middleware: creează un store cu persistență — la `setItem` salvează în mockStorage, la inițializare încarcă din mockStorage dacă există. Testează save și hydrate.",
        starterCode: "const mockStorage = {};\n\nfunction createPersistedStore(key, initialState) {\n  // Hydrate din storage\n  const stored = mockStorage[key];\n  let state = stored ? JSON.parse(stored) : initialState;\n  console.log(stored ? `Hydrated din storage: ${JSON.stringify(state)}` : 'State inițial');\n  \n  return {\n    getState: () => state,\n    setState(partial) {\n      state = { ...state, ...partial };\n      mockStorage[key] = JSON.stringify(state);\n      console.log('Salvat:', JSON.stringify(state));\n    }\n  };\n}\n\nconst store1 = createPersistedStore('myStore', { count: 0, user: null });\nstore1.setState({ count: 5 });\nstore1.setState({ user: 'Ana' });\n\n// Simulare reload\nconst store2 = createPersistedStore('myStore', { count: 0, user: null });\nconsole.log('Count dupa reload:', store2.getState().count);",
        language: "javascript", expectedOutput: "State inițial\nSalvat: {\"count\":5,\"user\":null}\nSalvat: {\"count\":5,\"user\":\"Ana\"}\nHydrated din storage: {\"count\":5,\"user\":\"Ana\"}\nCount dupa reload: 5",
      },
    ],
  },

  {
    lessonId: "6a09b2419384b94515fcf86b",
    name: "34. TanStack Query avansat",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează: `prefetchQuery` în TanStack Query încarcă datele înainte ca componenta să fie ___ în DOM.",
        options: [], answer: "montată",
        starterCode: "", language: "javascript", expectedOutput: "",
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează: `useInfiniteQuery` folosește parametrul `___` pentru a ști ce pagină să încarce.",
        options: [], answer: "pageParam",
        starterCode: "", language: "javascript", expectedOutput: "",
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează: la SSR cu TanStack Query, datele sunt transferate de pe server pe client prin procesul de ___.",
        options: [], answer: "hydration",
        starterCode: "", language: "javascript", expectedOutput: "",
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează: `staleTime: Infinity` înseamnă că datele nu vor fi considerate niciodată ___.",
        options: [], answer: "stale",
        starterCode: "", language: "javascript", expectedOutput: "",
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează: hook-ul `___Mutation` e folosit pentru operații de modificare a datelor (POST, PUT, DELETE).",
        options: [], answer: "use",
        starterCode: "", language: "javascript", expectedOutput: "",
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Simulează infinite query: creează o funcție `fetchPage(page, limit)` care returnează items pentru pagina curentă și dacă există o pagină următoare. Simulează 3 pagini cu 3 items fiecare.",
        starterCode: "async function fetchPage(page, limit = 3) {\n  const allItems = Array.from({ length: 9 }, (_, i) => `Item ${i + 1}`);\n  const start = (page - 1) * limit;\n  const items = allItems.slice(start, start + limit);\n  const hasNextPage = start + limit < allItems.length;\n  return { items, page, hasNextPage, nextPage: hasNextPage ? page + 1 : null };\n}\n\nasync function main() {\n  let page = 1;\n  let allItems = [];\n  while (page) {\n    const result = await fetchPage(page);\n    allItems = [...allItems, ...result.items];\n    console.log(`Pagina ${page}: ${result.items.join(', ')} | hasNext: ${result.hasNextPage}`);\n    page = result.nextPage;\n  }\n  console.log('Total items:', allItems.length);\n}\n\nmain();",
        language: "javascript", expectedOutput: "Pagina 1: Item 1, Item 2, Item 3 | hasNext: true\nPagina 2: Item 4, Item 5, Item 6 | hasNext: true\nPagina 3: Item 7, Item 8, Item 9 | hasNext: false\nTotal items: 9",
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Simulează query caching și stale time: creează un cache cu timestamp pentru fiecare query. Funcția `fetchWithCache(key, fetcher, staleMs)` returnează din cache dacă nu e stale, altfel re-fetchează.",
        starterCode: "const queryCache = new Map();\n\nasync function fetchWithCache(key, fetcher, staleMs = 5000) {\n  const cached = queryCache.get(key);\n  const now = Date.now();\n  if (cached && (now - cached.timestamp) < staleMs) {\n    console.log(`[Cache] ${key}: date fresh`);\n    return cached.data;\n  }\n  console.log(`[Fetch] ${key}: refetch`);\n  const data = await fetcher();\n  queryCache.set(key, { data, timestamp: now });\n  return data;\n}\n\nasync function main() {\n  await fetchWithCache('users', () => Promise.resolve(['Ana', 'Ion']), 5000);\n  await fetchWithCache('users', () => Promise.resolve(['Ana', 'Ion']), 5000);\n  await fetchWithCache('posts', () => Promise.resolve(['Post 1']), 5000);\n}\n\nmain();",
        language: "javascript", expectedOutput: "[Fetch] users: refetch\n[Cache] users: date fresh\n[Fetch] posts: refetch",
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Simulează `useMutation` cu optimistic updates: funcția `createMutation(mutateFn)` returnează un obiect cu `mutate(data)` care afișează starea pending, success/error. Testează cu o funcție de like.",
        starterCode: "function createMutation(mutateFn) {\n  return {\n    async mutate(data) {\n      console.log('Pending...');\n      try {\n        const result = await mutateFn(data);\n        console.log('Success:', result);\n      } catch (e) {\n        console.log('Error:', e.message);\n      }\n    }\n  };\n}\n\nconst likeMutation = createMutation(async ({ postId }) => {\n  if (postId === 999) throw new Error('Post negăsit');\n  return `Post ${postId} liked`;\n});\n\nasync function main() {\n  await likeMutation.mutate({ postId: 42 });\n  await likeMutation.mutate({ postId: 999 });\n}\n\nmain();",
        language: "javascript", expectedOutput: "Pending...\nSuccess: Post 42 liked\nPending...\nError: Post negăsit",
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Simulează query invalidation: creează un queryClient cu metodele `setQueryData(key, data)`, `invalidateQuery(key)`, și `getQueryData(key)`. La invalidare, marchează datele ca stale. Testează.",
        starterCode: "function createQueryClient() {\n  const cache = new Map();\n  return {\n    setQueryData(key, data) {\n      cache.set(key, { data, stale: false });\n      console.log(`Set: ${key}`);\n    },\n    invalidateQuery(key) {\n      const entry = cache.get(key);\n      if (entry) { entry.stale = true; console.log(`Invalidat: ${key}`); }\n    },\n    getQueryData(key) {\n      const entry = cache.get(key);\n      if (!entry) return null;\n      console.log(`Get: ${key} | stale: ${entry.stale}`);\n      return entry.data;\n    }\n  };\n}\n\nconst client = createQueryClient();\nclient.setQueryData('users', ['Ana', 'Ion']);\nclient.getQueryData('users');\nclient.invalidateQuery('users');\nclient.getQueryData('users');",
        language: "javascript", expectedOutput: "Set: users\nGet: users | stale: false\nInvalidat: users\nGet: users | stale: true",
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Simulează SSR hydration cu TanStack Query: `dehydrate(queryClient)` serializează cache-ul, `hydrate(queryClient, dehydratedState)` îl restaurează. Demonstrează transferul de date server → client.",
        starterCode: "function createQueryClient() {\n  const cache = new Map();\n  return {\n    prefetch(key, data) { cache.set(key, data); },\n    get(key) { return cache.get(key); },\n    dehydrate() { return Object.fromEntries(cache); },\n    hydrate(state) { Object.entries(state).forEach(([k, v]) => cache.set(k, v)); }\n  };\n}\n\n// Server-side\nconst serverClient = createQueryClient();\nserverClient.prefetch('users', [{ name: 'Ana' }, { name: 'Ion' }]);\nconst dehydrated = serverClient.dehydrate();\nconsole.log('[Server] Dehydrated:', Object.keys(dehydrated).join(', '));\n\n// Client-side\nconst clientClient = createQueryClient();\nclientClient.hydrate(dehydrated);\nconst users = clientClient.get('users');\nconsole.log('[Client] Users:', users.map(u => u.name).join(', '));",
        language: "javascript", expectedOutput: "[Server] Dehydrated: users\n[Client] Users: Ana, Ion",
      },
    ],
  },

  {
    lessonId: "6a09b2439384b94515fcf87f",
    name: "35. React Hook Form avansat",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează: `useFieldArray` din React Hook Form gestionează un array ___ de câmpuri.",
        options: [], answer: "dinamic",
        starterCode: "", language: "javascript", expectedOutput: "",
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează: funcția `append({})` din useFieldArray adaugă un câmp nou la ___ array-ului.",
        options: [], answer: "finalul",
        starterCode: "", language: "javascript", expectedOutput: "",
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează: câmpurile nested în React Hook Form folosesc notația cu punct: `user.___`.",
        options: [], answer: "address",
        starterCode: "", language: "javascript", expectedOutput: "",
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează: `useForm({ mode: 'onChange' })` declanșează validarea la fiecare ___ al câmpului.",
        options: [], answer: "schimbare",
        starterCode: "", language: "javascript", expectedOutput: "",
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează: `control` din useForm este necesar pentru `___` și `useFieldArray`.",
        options: [], answer: "Controller",
        starterCode: "", language: "javascript", expectedOutput: "",
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Simulează `useFieldArray`: creează un obiect `fieldArray` cu metodele `append(item)`, `remove(index)`, `update(index, item)`, și `fields` getter. Testează cu un formular de skilluri.",
        starterCode: "function createFieldArray(initial = []) {\n  let fields = [...initial];\n  return {\n    get fields() { return fields; },\n    append(item) { fields.push({ ...item, id: Date.now() }); },\n    remove(index) { fields.splice(index, 1); },\n    update(index, item) { fields[index] = { ...fields[index], ...item }; }\n  };\n}\n\nconst skills = createFieldArray();\nskills.append({ name: 'JavaScript', level: 'Advanced' });\nskills.append({ name: 'React', level: 'Intermediate' });\nskills.append({ name: 'CSS', level: 'Basic' });\nconsole.log('Skills:', skills.fields.map(s => s.name).join(', '));\nskills.remove(1);\nconsole.log('Dupa remove:', skills.fields.map(s => s.name).join(', '));",
        language: "javascript", expectedOutput: "Skills: JavaScript, React, CSS\nDupa remove: JavaScript, CSS",
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Simulează un formular dinamic de experiență profesională: poți adăuga/elimina intrări cu câmpurile `company`, `role`, `years`. Afișează formularul după fiecare operație.",
        starterCode: "function createExperienceForm() {\n  let entries = [];\n  return {\n    add(entry) {\n      entries.push(entry);\n      console.log(`Adăugat: ${entry.role} la ${entry.company}`);\n    },\n    remove(index) {\n      console.log(`Eliminat: ${entries[index].role} la ${entries[index].company}`);\n      entries.splice(index, 1);\n    },\n    summary() {\n      console.log('Experiență:', entries.map(e => `${e.role}@${e.company}(${e.years}y)`).join(', '));\n    }\n  };\n}\n\nconst form = createExperienceForm();\nform.add({ company: 'Google', role: 'Dev', years: 2 });\nform.add({ company: 'Meta', role: 'Senior Dev', years: 3 });\nform.add({ company: 'StartupX', role: 'CTO', years: 1 });\nform.summary();\nform.remove(0);\nform.summary();",
        language: "javascript", expectedOutput: "Adăugat: Dev la Google\nAdăugat: Senior Dev la Meta\nAdăugat: CTO la StartupX\nExperiență: Dev@Google(2y), Senior Dev@Meta(3y), CTO@StartupX(1y)\nEliminat: Dev la Google\nExperiență: Senior Dev@Meta(3y), CTO@StartupX(1y)",
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Implementează validare la nivel de array: funcția `validateFieldArray(fields, rules)` verifică că toate câmpurile array-ului respectă regulile. Afișează erorile per index.",
        starterCode: "function validateFieldArray(fields, rules) {\n  let hasErrors = false;\n  fields.forEach((field, index) => {\n    const errors = [];\n    if (rules.required && !field.value) errors.push('câmp obligatoriu');\n    if (rules.minLength && field.value.length < rules.minLength) \n      errors.push(`minim ${rules.minLength} caractere`);\n    if (errors.length > 0) {\n      console.log(`Index ${index} (${field.name}): ${errors.join(', ')}`);\n      hasErrors = true;\n    }\n  });\n  if (!hasErrors) console.log('Toate câmpurile valide');\n}\n\nvalidateFieldArray([\n  { name: 'skill1', value: 'React' },\n  { name: 'skill2', value: '' },\n  { name: 'skill3', value: 'JS' }\n], { required: true, minLength: 3 });",
        language: "javascript", expectedOutput: "Index 1 (skill2): câmp obligatoriu\nIndex 2 (skill3): minim 3 caractere",
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Simulează nested forms cu validare: creează un formular `address` cu câmpurile nested `street`, `city`, `postalCode`. Afișează erorile cu notația dot `address.street`, etc.",
        starterCode: "function validateNested(data, schema, prefix = '') {\n  const errors = {};\n  for (const [field, rules] of Object.entries(schema)) {\n    const fullKey = prefix ? `${prefix}.${field}` : field;\n    const value = prefix ? data[prefix]?.[field] : data[field];\n    if (rules.required && !value) errors[fullKey] = 'Obligatoriu';\n    if (rules.pattern && value && !rules.pattern.test(value)) errors[fullKey] = 'Format invalid';\n  }\n  return errors;\n}\n\nconst data = { address: { street: '', city: 'Cluj', postalCode: 'abc' } };\nconst errors = validateNested(data.address, {\n  street: { required: true },\n  city: { required: true },\n  postalCode: { required: true, pattern: /^\\d{6}$/ }\n}, 'address');\n\nObject.entries(errors).forEach(([k, v]) => console.log(`${k}: ${v}`));",
        language: "javascript", expectedOutput: "address.street: Obligatoriu\naddress.postalCode: Format invalid",
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Construiește un formular multi-step cu validare: 3 pași (personal, contact, confirmare). Fiecare pas validează datele înainte de a avansa. Testează un flux cu date valide.",
        starterCode: "function createMultiStepForm(steps) {\n  let currentStep = 0;\n  const data = {};\n  return {\n    submit(stepData) {\n      const step = steps[currentStep];\n      const errors = step.validate(stepData);\n      if (errors.length > 0) {\n        errors.forEach(e => console.log(`Pas ${currentStep + 1} eroare: ${e}`));\n        return false;\n      }\n      Object.assign(data, stepData);\n      console.log(`Pas ${currentStep + 1} complet: ${JSON.stringify(stepData)}`);\n      currentStep++;\n      if (currentStep >= steps.length) console.log('Formular complet!');\n      return true;\n    }\n  };\n}\n\nconst form = createMultiStepForm([\n  { validate: d => d.name?.length >= 2 ? [] : ['Nume prea scurt'] },\n  { validate: d => d.email?.includes('@') ? [] : ['Email invalid'] },\n  { validate: d => d.agreed ? [] : ['Trebuie să fii de acord'] }\n]);\n\nform.submit({ name: 'Ana' });\nform.submit({ email: 'ana@test.com' });\nform.submit({ agreed: true });",
        language: "javascript", expectedOutput: "Pas 1 complet: {\"name\":\"Ana\"}\nPas 2 complet: {\"email\":\"ana@test.com\"}\nPas 3 complet: {\"agreed\":true}\nFormular complet!",
      },
    ],
  },

  {
    lessonId: "6a09b2469384b94515fcf893",
    name: "36. Accesibilitate in React",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează: attributul `aria-label` furnizează o etichetă pentru elementele ___ etichete vizibile.",
        options: [], answer: "fără",
        starterCode: "", language: "javascript", expectedOutput: "",
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează: `role='button'` transformă un element non-interactiv (ex: div) într-un ___ accesibil.",
        options: [], answer: "buton",
        starterCode: "", language: "javascript", expectedOutput: "",
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează: `aria-___='true'` marchează un element ca invizibil pentru screen readers.",
        options: [], answer: "hidden",
        starterCode: "", language: "javascript", expectedOutput: "",
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează: navigarea cu keyboard necesită ca toate elementele interactive să fie accesibile cu tasta ___.",
        options: [], answer: "Tab",
        starterCode: "", language: "javascript", expectedOutput: "",
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează: `aria-live='polite'` anunță screen reader-ului că conținutul se schimbă ___ ce utilizatorul termină ce face.",
        options: [], answer: "după",
        starterCode: "", language: "javascript", expectedOutput: "",
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Simulează un audit de accesibilitate: creează o funcție `auditElement(element)` care verifică: are `aria-label` sau conținut text, are `role` dacă e div/span, are `tabIndex` dacă e interactiv. Testează cu 3 elemente.",
        starterCode: "function auditElement(el) {\n  const issues = [];\n  if (!el.ariaLabel && !el.textContent) issues.push('Lipsă etichetă (aria-label sau text)');\n  if ((el.tag === 'div' || el.tag === 'span') && el.onClick && !el.role)\n    issues.push('Element interactiv fără role');\n  if (el.onClick && el.tabIndex === undefined) issues.push('Lipsă tabIndex');\n  if (issues.length === 0) console.log(`${el.tag}: OK`);\n  else issues.forEach(i => console.log(`${el.tag}: ✗ ${i}`));\n}\n\nauditElement({ tag: 'button', textContent: 'Salvează', onClick: true, tabIndex: 0 });\nauditElement({ tag: 'div', onClick: true, ariaLabel: 'Șterge' });\nauditElement({ tag: 'img', ariaLabel: 'Logo React' });",
        language: "javascript", expectedOutput: "button: OK\ndiv: ✗ Element interactiv fără role\ndiv: ✗ Lipsă tabIndex\nimg: OK",
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Simulează focus management: creează un `FocusTrap` care reține focus-ul în cadrul unui modal. Funcțiile `open()`, `close()`, `trapFocus(elementName)` simulează comportamentul.",
        starterCode: "function createFocusTrap(elements) {\n  let active = false;\n  let focusIndex = 0;\n  return {\n    open() {\n      active = true;\n      focusIndex = 0;\n      console.log(`Modal deschis. Focus pe: ${elements[0]}`);\n    },\n    close() {\n      active = false;\n      console.log('Modal închis. Focus returnat la trigger');\n    },\n    nextFocus() {\n      if (!active) return;\n      focusIndex = (focusIndex + 1) % elements.length;\n      console.log(`Focus pe: ${elements[focusIndex]}`);\n    }\n  };\n}\n\nconst trap = createFocusTrap(['Câmp email', 'Câmp parolă', 'Buton Login', 'Buton Anulare']);\ntrap.open();\ntrap.nextFocus();\ntrap.nextFocus();\ntrap.close();",
        language: "javascript", expectedOutput: "Modal deschis. Focus pe: Câmp email\nFocus pe: Câmp parolă\nFocus pe: Buton Login\nModal închis. Focus returnat la trigger",
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Simulează generarea de ARIA attributes pentru un formular: funcția `generateAriaProps(field)` generează atributele ARIA necesare pentru un câmp de formular cu validare.",
        starterCode: "function generateAriaProps(field) {\n  const props = {};\n  if (field.label) props['aria-label'] = field.label;\n  if (field.required) props['aria-required'] = 'true';\n  if (field.error) {\n    props['aria-invalid'] = 'true';\n    props['aria-describedby'] = `${field.name}-error`;\n  }\n  if (field.description) props['aria-describedby'] = `${field.name}-desc`;\n  return props;\n}\n\nconst emailProps = generateAriaProps({ name: 'email', label: 'Email', required: true, error: 'Email invalid' });\nconsole.log('Email props:', JSON.stringify(emailProps));\n\nconst nameProps = generateAriaProps({ name: 'name', label: 'Nume', required: true });\nconsole.log('Name props:', JSON.stringify(nameProps));",
        language: "javascript", expectedOutput: "Email props: {\"aria-label\":\"Email\",\"aria-required\":\"true\",\"aria-invalid\":\"true\",\"aria-describedby\":\"email-error\"}\nName props: {\"aria-label\":\"Nume\",\"aria-required\":\"true\"}",
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Implementează verificarea contrastului de culori pentru accesibilitate: funcția `checkContrast(ratio)` verifică standardele WCAG (4.5:1 pentru text normal, 3:1 pentru text mare). Testează cu diferite ratiouri.",
        starterCode: "function checkContrast(ratio, isLargeText = false) {\n  const minRatio = isLargeText ? 3.0 : 4.5;\n  const level = ratio >= 7 ? 'AAA' : ratio >= minRatio ? 'AA' : 'FAIL';\n  const status = level === 'FAIL' ? '✗' : '✓';\n  const type = isLargeText ? 'text mare' : 'text normal';\n  console.log(`${status} Ratio ${ratio}:1 (${type}): WCAG ${level}`);\n}\n\ncheckContrast(2.5);\ncheckContrast(4.5);\ncheckContrast(7.1);\ncheckContrast(2.5, true);\ncheckContrast(3.5, true);",
        language: "javascript", expectedOutput: "✗ Ratio 2.5:1 (text normal): WCAG FAIL\n✓ Ratio 4.5:1 (text normal): WCAG AA\n✓ Ratio 7.1:1 (text normal): WCAG AAA\n✗ Ratio 2.5:1 (text mare): WCAG FAIL\n✓ Ratio 3.5:1 (text mare): WCAG AA",
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Creează un generator de atribute `role` corecte: funcția `getSuggestedRole(element)` sugerează rolul ARIA corect bazat pe tipul elementului și comportamentul său.",
        starterCode: "function getSuggestedRole(element) {\n  const roleMap = {\n    nav: 'navigation',\n    main: 'main',\n    header: 'banner',\n    footer: 'contentinfo',\n    aside: 'complementary',\n    ul: 'list',\n    li: 'listitem'\n  };\n  if (element.tag in roleMap) {\n    console.log(`<${element.tag}>: role='${roleMap[element.tag]}'`);\n    return roleMap[element.tag];\n  }\n  if (element.tag === 'div' && element.onClick) {\n    console.log(`<div onClick>: role='button' + tabIndex=0`);\n    return 'button';\n  }\n  console.log(`<${element.tag}>: role nativ, nu e nevoie`);\n  return null;\n}\n\n['nav', 'main', 'footer', 'aside'].forEach(tag => getSuggestedRole({ tag }));\ngetSuggestedRole({ tag: 'div', onClick: true });\ngetSuggestedRole({ tag: 'button' });",
        language: "javascript", expectedOutput: "<nav>: role='navigation'\n<main>: role='main'\n<footer>: role='contentinfo'\n<aside>: role='complementary'\n<div onClick>: role='button' + tabIndex=0\n<button>: role nativ, nu e nevoie",
      },
    ],
  },

  {
    lessonId: "6a09b2489384b94515fcf8a7",
    name: "37. Micro-frontends cu React",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează: Micro-frontends permite echipelor diferite să lucreze ___ pe bucăți ale UI-ului.",
        options: [], answer: "independent",
        starterCode: "", language: "javascript", expectedOutput: "",
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează: Module Federation este o funcționalitate din webpack ___ pentru partajarea de cod la runtime.",
        options: [], answer: "5",
        starterCode: "", language: "javascript", expectedOutput: "",
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează: în Module Federation, aplicația principală se numește ___ și celelalte sunt remote.",
        options: [], answer: "host",
        starterCode: "", language: "javascript", expectedOutput: "",
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează: `exposes` în webpack Module Federation config specifică ce module sunt ___ altor aplicații.",
        options: [], answer: "expuse",
        starterCode: "", language: "javascript", expectedOutput: "",
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează: partajarea dependențelor comune (React, ReactDOM) între micro-frontends se face prin configurarea ___.",
        options: [], answer: "shared",
        starterCode: "", language: "javascript", expectedOutput: "",
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Simulează o arhitectură micro-frontend: creează un `Shell` care încarcă dinamic componente din 3 micro-apps. Fiecare micro-app expune un component. Shell le agregă.",
        starterCode: "// Simulare micro-apps ca module\nconst MicroApps = {\n  'auth-app': { Button: (text) => `[Auth] ${text}`, name: 'Auth App' },\n  'product-app': { Card: (name) => `[Products] ${name}`, name: 'Product App' },\n  'cart-app': { Badge: (count) => `[Cart] ${count} items`, name: 'Cart App' }\n};\n\n// Shell care agregă micro-apps\nfunction Shell(apps) {\n  console.log('=== Shell Application ===');\n  apps.forEach(appName => {\n    const app = MicroApps[appName];\n    if (!app) { console.log(`${appName}: nu a putut fi încărcat`); return; }\n    console.log(`Încărcat: ${app.name}`);\n  });\n}\n\nShell(['auth-app', 'product-app', 'cart-app', 'unknown-app']);",
        language: "javascript", expectedOutput: "=== Shell Application ===\nIncărcat: Auth App\nIncărcat: Product App\nIncărcat: Cart App\nunknown-app: nu a putut fi încărcat",
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Simulează comunicarea între micro-frontends prin event bus: creează un `globalEventBus` cu `emit` și `on`. Un micro-app emite evenimentul 'user:login', alt micro-app îl ascultă.",
        starterCode: "const globalEventBus = {\n  handlers: {},\n  on(event, handler) {\n    if (!this.handlers[event]) this.handlers[event] = [];\n    this.handlers[event].push(handler);\n  },\n  emit(event, data) {\n    const handlers = this.handlers[event] || [];\n    handlers.forEach(h => h(data));\n  }\n};\n\n// Cart micro-app ascultă\nglobalEventBus.on('user:login', (user) => {\n  console.log(`[Cart App] User conectat: ${user.name}. Încarc coșul...`);\n});\n\n// Recommendations micro-app ascultă\nglobalEventBus.on('user:login', (user) => {\n  console.log(`[Recommendations] Personalizez pentru: ${user.name}`);\n});\n\n// Auth micro-app emite\nglobalEventBus.emit('user:login', { name: 'Ana', id: 1 });",
        language: "javascript", expectedOutput: "[Cart App] User conectat: Ana. Încarc coșul...\n[Recommendations] Personalizez pentru: Ana",
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Simulează partajarea stării globale între micro-frontends: creează un `SharedState` singleton cu `getState`, `setState`, `subscribe`. Demonstrează că 2 micro-apps partajează aceeași stare.",
        starterCode: "const SharedState = (function() {\n  let state = { user: null, theme: 'light' };\n  const listeners = [];\n  return {\n    getState: () => ({ ...state }),\n    setState(partial) {\n      state = { ...state, ...partial };\n      listeners.forEach(fn => fn(state));\n    },\n    subscribe: (fn) => listeners.push(fn)\n  };\n})();\n\n// Micro-app 1 subscrie\nSharedState.subscribe(s => console.log(`[App1] Theme: ${s.theme}`));\n\n// Micro-app 2 subscrie\nSharedState.subscribe(s => {\n  if (s.user) console.log(`[App2] User: ${s.user}`);\n});\n\nSharedState.setState({ theme: 'dark' });\nSharedState.setState({ user: 'Ana' });",
        language: "javascript", expectedOutput: "[App1] Theme: dark\n[App1] Theme: dark\n[App2] User: Ana",
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Simulează Module Federation lazy loading: creează o funcție `loadRemoteModule(appName, moduleName)` care simulează încărcarea unui modul remote. Prima încărcare e lentă (log 'Downloading...'), a doua e din cache.",
        starterCode: "const moduleCache = new Map();\n\nasync function loadRemoteModule(appName, moduleName) {\n  const key = `${appName}/${moduleName}`;\n  if (moduleCache.has(key)) {\n    console.log(`[Cache] ${key}`);\n    return moduleCache.get(key);\n  }\n  console.log(`[Download] ${key}...`);\n  const module = { name: moduleName, app: appName, loaded: true };\n  moduleCache.set(key, module);\n  return module;\n}\n\nasync function main() {\n  await loadRemoteModule('auth-app', 'LoginForm');\n  await loadRemoteModule('product-app', 'ProductCard');\n  await loadRemoteModule('auth-app', 'LoginForm');\n  console.log('Modules cached:', moduleCache.size);\n}\n\nmain();",
        language: "javascript", expectedOutput: "[Download] auth-app/LoginForm...\n[Download] product-app/ProductCard...\n[Cache] auth-app/LoginForm\nModules cached: 2",
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Simulează versioning și compatibility check: creează o funcție `checkCompatibility(host, remote)` care verifică că versiunile de React sunt compatibile. Afișează warning dacă sunt incompatibile.",
        starterCode: "function checkCompatibility(host, remote) {\n  console.log(`Host: ${host.name} (React ${host.reactVersion})`);\n  console.log(`Remote: ${remote.name} (React ${remote.reactVersion})`);\n  const [hMajor] = host.reactVersion.split('.');\n  const [rMajor] = remote.reactVersion.split('.');\n  if (hMajor !== rMajor) {\n    console.log(`⚠ INCOMPATIBIL: versiuni React diferite (${host.reactVersion} vs ${remote.reactVersion})`);\n  } else {\n    console.log('✓ Compatibile');\n  }\n}\n\ncheckCompatibility(\n  { name: 'Shell', reactVersion: '18.2.0' },\n  { name: 'Auth App', reactVersion: '18.0.0' }\n);\nconsole.log('---');\ncheckCompatibility(\n  { name: 'Shell', reactVersion: '18.2.0' },\n  { name: 'Legacy App', reactVersion: '16.14.0' }\n);",
        language: "javascript", expectedOutput: "Host: Shell (React 18.2.0)\nRemote: Auth App (React 18.0.0)\n✓ Compatibile\n---\nHost: Shell (React 18.2.0)\nRemote: Legacy App (React 16.14.0)\n⚠ INCOMPATIBIL: versiuni React diferite (18.2.0 vs 16.14.0)",
      },
    ],
  },

  {
    lessonId: "6a09b24b9384b94515fcf8bb",
    name: "38. React Native — Introducere",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează: în React Native, în loc de `<div>` folosim componenta ___.",
        options: [], answer: "<View>",
        starterCode: "", language: "javascript", expectedOutput: "",
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează: în React Native, în loc de `<p>` sau `<span>` folosim componenta ___.",
        options: [], answer: "<Text>",
        starterCode: "", language: "javascript", expectedOutput: "",
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează: stilizarea în React Native se face cu `StyleSheet.___()` care creează un obiect de stiluri.",
        options: [], answer: "create",
        starterCode: "", language: "javascript", expectedOutput: "",
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează: Expo este un framework care simplifică dezvoltarea React Native eliminând nevoia de ___.",
        options: [], answer: "Xcode/Android Studio",
        starterCode: "", language: "javascript", expectedOutput: "",
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează: `TouchableOpacity` este echivalentul React Native pentru un ___ interactiv.",
        options: [], answer: "buton",
        starterCode: "", language: "javascript", expectedOutput: "",
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Simulează structura unui component React Native: creează o funcție `renderScreen(components)` care simulează randarea unui screen cu View, Text și TouchableOpacity. Afișează structura componentelor.",
        starterCode: "function View(children) { return `[View]\\n${children.join('\\n')}`; }\nfunction Text(content, style = '') { return `  [Text${style ? ' ' + style : ''}] ${content}`; }\nfunction TouchableOpacity(label, onPress) {\n  return `  [Button] ${label} → onPress: ${onPress}`;\n}\n\nconst screen = View([\n  Text('Bun venit în React Native!', 'bold'),\n  Text('Aceasta este prima ta aplicație.'),\n  TouchableOpacity('Apasă-mă', 'handlePress')\n]);\nconsole.log(screen);",
        language: "javascript", expectedOutput: "[View]\n  [Text bold] Bun venit în React Native!\n  [Text] Aceasta este prima ta aplicație.\n  [Button] Apasă-mă → onPress: handlePress",
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Simulează StyleSheet.create în React Native: creează o funcție `createStyleSheet(styles)` care validează că proprietățile sunt în format camelCase (nu kebab-case). Afișează stilurile valide.",
        starterCode: "function createStyleSheet(styles) {\n  const result = {};\n  for (const [componentName, props] of Object.entries(styles)) {\n    result[componentName] = {};\n    for (const [prop, value] of Object.entries(props)) {\n      if (prop.includes('-')) {\n        console.log(`✗ ${componentName}.${prop}: folosiți camelCase (ex: fontSize nu font-size)`);\n      } else {\n        result[componentName][prop] = value;\n        console.log(`✓ ${componentName}.${prop}: ${value}`);\n      }\n    }\n  }\n  return result;\n}\n\ncreateStyleSheet({\n  container: { flex: 1, backgroundColor: '#fff' },\n  title: { fontSize: 24, 'font-weight': 'bold' }\n});",
        language: "javascript", expectedOutput: "✓ container.flex: 1\n✓ container.backgroundColor: #fff\n✓ title.fontSize: 24\n✗ title.font-weight: folosiți camelCase (ex: fontSize nu font-size)",
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Compară React Web vs React Native: creează o funcție `compareComponents(webTag, nativeComponent)` care listează diferențele principale. Afișează comparația pentru div/View și input/TextInput.",
        starterCode: "const comparisons = {\n  'div → View': [\n    'View nu poate conține text direct',\n    'View suportă Flexbox nativ',\n    'Nu există echivalent HTML'\n  ],\n  'input → TextInput': [\n    'TextInput are onChangeText în loc de onChange',\n    'TextInput are placeholder nativ',\n    'Keyboard type: numeric, email, etc.'\n  ]\n};\n\nObject.entries(comparisons).forEach(([pair, diffs]) => {\n  console.log(`\\n${pair}:`);\n  diffs.forEach(d => console.log(`  - ${d}`));\n});",
        language: "javascript", expectedOutput: "\ndiv → View:\n  - View nu poate conține text direct\n  - View suportă Flexbox nativ\n  - Nu există echivalent HTML\n\ninput → TextInput:\n  - TextInput are onChangeText în loc de onChange\n  - TextInput are placeholder nativ\n  - Keyboard type: numeric, email, etc.",
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Simulează un FlatList React Native: creează o funcție `FlatList(data, renderItem, keyExtractor)` care afișează fiecare item folosind renderItem(item, index). Testează cu o listă de contacte.",
        starterCode: "function FlatList(data, renderItem, keyExtractor) {\n  console.log(`FlatList: ${data.length} items`);\n  data.forEach((item, index) => {\n    const key = keyExtractor(item);\n    const rendered = renderItem({ item, index });\n    console.log(`[key=${key}] ${rendered}`);\n  });\n}\n\nconst contacts = [\n  { id: 1, name: 'Ana Pop', phone: '0720111222' },\n  { id: 2, name: 'Ion Ionescu', phone: '0730333444' },\n  { id: 3, name: 'Maria Dan', phone: '0740555666' }\n];\n\nFlatList(\n  contacts,\n  ({ item }) => `${item.name} — ${item.phone}`,\n  item => item.id.toString()\n);",
        language: "javascript", expectedOutput: "FlatList: 3 items\n[key=1] Ana Pop — 0720111222\n[key=2] Ion Ionescu — 0730333444\n[key=3] Maria Dan — 0740555666",
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Simulează navigarea în React Native cu React Navigation: creează un `StackNavigator` simplu cu `push(screen, params)`, `pop()`, `navigate(screen)`. Testează un flux de navigare.",
        starterCode: "function createStackNavigator(screens) {\n  const stack = ['Home'];\n  return {\n    push(screen, params = {}) {\n      if (!screens.includes(screen)) { console.log(`Ecran inexistent: ${screen}`); return; }\n      stack.push(screen);\n      console.log(`Navigat la: ${screen}${Object.keys(params).length ? ' ' + JSON.stringify(params) : ''}`);\n    },\n    pop() {\n      if (stack.length > 1) {\n        stack.pop();\n        console.log(`Înapoi la: ${stack[stack.length - 1]}`);\n      }\n    },\n    current() { return stack[stack.length - 1]; }\n  };\n}\n\nconst nav = createStackNavigator(['Home', 'ProductList', 'ProductDetail', 'Cart']);\nnav.push('ProductList');\nnav.push('ProductDetail', { id: 42 });\nnav.push('Cart');\nnav.pop();\nconsole.log('Screen curent:', nav.current());",
        language: "javascript", expectedOutput: "Navigat la: ProductList\nNavigat la: ProductDetail {\"id\":42}\nNavigat la: Cart\nÎnapoi la: ProductDetail\nScreen curent: ProductDetail",
      },
    ],
  },

  {
    lessonId: "6a09b24d9384b94515fcf8cf",
    name: "39. Testing avansat React",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează: MSW (Mock Service Worker) interceptează request-urile la nivel de ___.",
        options: [], answer: "Service Worker",
        starterCode: "", language: "javascript", expectedOutput: "",
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează: `rest.get('/api/users', resolver)` în MSW definește un handler pentru ___.",
        options: [], answer: "GET /api/users",
        starterCode: "", language: "javascript", expectedOutput: "",
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează: un `custom render` în Testing Library include Provider-ele necesare (Theme, Router, etc.) prin ___.",
        options: [], answer: "wrapper",
        starterCode: "", language: "javascript", expectedOutput: "",
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează: `waitFor` din Testing Library așteaptă ca o assertion să treacă în mod ___.",
        options: [], answer: "asincron",
        starterCode: "", language: "javascript", expectedOutput: "",
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează: testele care testează comportamentul utilizatorului (click, type, submit) sunt numite teste de ___.",
        options: [], answer: "interacțiune",
        starterCode: "", language: "javascript", expectedOutput: "",
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Simulează MSW handlers: creează un array de handler-e mock `[{method, path, response}]` și o funcție `mockFetch(method, path)` care returnează răspunsul potrivit. Testează cu GET și POST requests.",
        starterCode: "const handlers = [\n  { method: 'GET', path: '/api/users', response: [{ id: 1, name: 'Ana' }, { id: 2, name: 'Ion' }] },\n  { method: 'POST', path: '/api/users', response: { id: 3, name: 'Nou User', created: true } },\n  { method: 'GET', path: '/api/posts', response: [{ id: 1, title: 'Post 1' }] }\n];\n\nfunction mockFetch(method, path) {\n  const handler = handlers.find(h => h.method === method && h.path === path);\n  if (!handler) return { error: '404 Not Found' };\n  return handler.response;\n}\n\nconsole.log(JSON.stringify(mockFetch('GET', '/api/users')));\nconsole.log(JSON.stringify(mockFetch('POST', '/api/users')));\nconsole.log(JSON.stringify(mockFetch('DELETE', '/api/users')));",
        language: "javascript", expectedOutput: "[{\"id\":1,\"name\":\"Ana\"},{\"id\":2,\"name\":\"Ion\"}]\n{\"id\":3,\"name\":\"Nou User\",\"created\":true}\n{\"error\":\"404 Not Found\"}",
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Implementează un `custom render` simplu: funcția `customRender(component, options)` aplică wrapper-e (ThemeProvider, AuthProvider) înainte de randare. Afișează output-ul randat.",
        starterCode: "function ThemeProvider(theme, children) {\n  return `[ThemeProvider theme=${theme}]\\n${children}\\n[/ThemeProvider]`;\n}\n\nfunction AuthProvider(user, children) {\n  return `[AuthProvider user=${user}]\\n${children}\\n[/AuthProvider]`;\n}\n\nfunction customRender(component, { theme = 'light', user = 'guest' } = {}) {\n  let rendered = component;\n  rendered = AuthProvider(user, rendered);\n  rendered = ThemeProvider(theme, rendered);\n  return rendered;\n}\n\nconst result = customRender('  <UserProfile name=\"Ana\" />', { theme: 'dark', user: 'Ana' });\nconsole.log(result);",
        language: "javascript", expectedOutput: "[ThemeProvider theme=dark]\n[AuthProvider user=Ana]\n  <UserProfile name=\"Ana\" />\n[/AuthProvider]\n[/ThemeProvider]",
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Simulează testarea unui component async: creează o funcție `testAsyncComponent(fetchFn, expectedText)` care simulează mount, fetch de date și verificare. Afișează rezultatul testului.",
        starterCode: "async function testAsyncComponent(fetchFn, expectedContent) {\n  console.log('Test: component async');\n  \n  // Simulează mounting\n  console.log('  Mounting... (loading state)');\n  \n  try {\n    const data = await fetchFn();\n    const rendered = JSON.stringify(data);\n    const passed = rendered.includes(expectedContent);\n    console.log(`  Data loaded: ${rendered}`);\n    console.log(`  Assert '${expectedContent}': ${passed ? 'PASS ✓' : 'FAIL ✗'}`);\n  } catch (e) {\n    console.log('  Error:', e.message);\n  }\n}\n\ntestAsyncComponent(\n  () => Promise.resolve({ users: [{ name: 'Ana' }] }),\n  'Ana'\n);",
        language: "javascript", expectedOutput: "Test: component async\n  Mounting... (loading state)\n  Data loaded: {\"users\":[{\"name\":\"Ana\"}]}\n  Assert 'Ana': PASS ✓",
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Implementează spy functions pentru testare: creează `createSpy(fn)` care înregistrează apelurile. Testează că un event handler a fost apelat de n ori cu argumentele corecte.",
        starterCode: "function createSpy(fn) {\n  const calls = [];\n  const spy = function(...args) {\n    calls.push(args);\n    return fn ? fn(...args) : undefined;\n  };\n  spy.calls = calls;\n  spy.callCount = () => calls.length;\n  spy.calledWith = (...args) => calls.some(c => JSON.stringify(c) === JSON.stringify(args));\n  return spy;\n}\n\nconst onClickSpy = createSpy();\nonClickSpy('button-1');\nonClickSpy('button-2');\nonClickSpy('button-1');\n\nconsole.log('Apelat de', onClickSpy.callCount(), 'ori');\nconsole.log('Apelat cu button-1:', onClickSpy.calledWith('button-1'));\nconsole.log('Apelat cu button-99:', onClickSpy.calledWith('button-99'));",
        language: "javascript", expectedOutput: "Apelat de 3 ori\nApelat cu button-1: true\nApelat cu button-99: false",
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Creează un test suite complet pentru o funcție `searchUsers(users, query)`: testează căutarea case-insensitive, rezultate goale, mai multe rezultate și query gol.",
        starterCode: "function searchUsers(users, query) {\n  if (!query) return users;\n  return users.filter(u => u.name.toLowerCase().includes(query.toLowerCase()));\n}\n\nconst users = [\n  { id: 1, name: 'Ana Pop' },\n  { id: 2, name: 'Bogdan Ionescu' },\n  { id: 3, name: 'ANA Maria' },\n  { id: 4, name: 'Ion Dan' }\n];\n\nconst tests = [\n  [searchUsers(users, 'ana').length === 2, 'case-insensitive: găsit 2 Ane'],\n  [searchUsers(users, 'xyz').length === 0, 'query inexistent: 0 rezultate'],\n  [searchUsers(users, '').length === 4, 'query gol: toți userii'],\n  [searchUsers(users, 'ion').length === 2, 'Bogdan Ionescu și Ion Dan']\n];\n\ntests.forEach(([result, name]) => console.log(result ? `PASS: ${name}` : `FAIL: ${name}`));",
        language: "javascript", expectedOutput: "PASS: case-insensitive: găsit 2 Ane\nPASS: query inexistent: 0 rezultate\nPASS: query gol: toți userii\nPASS: Bogdan Ionescu și Ion Dan",
      },
    ],
  },

  {
    lessonId: "6a09b2509384b94515fcf8e3",
    name: "40. Mini Proiect React Final — E-Commerce complet",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează: un E-Commerce complet în React are de obicei store-ul de ___ ca parte centrală a stării.",
        options: [], answer: "coș",
        starterCode: "", language: "javascript", expectedOutput: "",
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează: componenta `ProductCard` afișează produsul și are un buton `___`.",
        options: [], answer: "Adaugă în coș",
        starterCode: "", language: "javascript", expectedOutput: "",
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează: calculul totalului coșului se face de obicei cu metoda ___ pe array-ul de produse.",
        options: [], answer: "reduce",
        starterCode: "", language: "javascript", expectedOutput: "",
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează: starea de ___ este afișată când datele se încarcă de la server.",
        options: [], answer: "loading",
        starterCode: "", language: "javascript", expectedOutput: "",
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează: în E-Commerce, `SKU` înseamnă Stock ___ Unit — identificatorul unic al unui produs.",
        options: [], answer: "Keeping",
        starterCode: "", language: "javascript", expectedOutput: "",
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Implementează un Cart Store complet: `addItem(product)`, `removeItem(id)`, `updateQuantity(id, qty)`, `getTotal()`. Testează cu mai multe produse și operații.",
        starterCode: "function createCartStore() {\n  let items = [];\n  return {\n    addItem(product) {\n      const existing = items.find(i => i.id === product.id);\n      if (existing) existing.qty++;\n      else items.push({ ...product, qty: 1 });\n    },\n    removeItem(id) { items = items.filter(i => i.id !== id); },\n    updateQty(id, qty) {\n      const item = items.find(i => i.id === id);\n      if (item) item.qty = qty;\n    },\n    getTotal() { return items.reduce((sum, i) => sum + i.price * i.qty, 0); },\n    getItems() { return items; }\n  };\n}\n\nconst cart = createCartStore();\ncart.addItem({ id: 1, name: 'Laptop', price: 3000 });\ncart.addItem({ id: 2, name: 'Mouse', price: 100 });\ncart.addItem({ id: 1, name: 'Laptop', price: 3000 });\nconsole.log('Total:', cart.getTotal(), 'RON');\ncart.updateQty(2, 3);\nconsole.log('Total dupa update:', cart.getTotal(), 'RON');\ncart.removeItem(1);\nconsole.log('Items rămase:', cart.getItems().length);",
        language: "javascript", expectedOutput: "Total: 6100 RON\nTotal dupa update: 6300 RON\nItems rămase: 1",
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Implementează un sistem de filtrare și sortare pentru produse: `filterProducts(products, filters)` unde filters poate include `category`, `minPrice`, `maxPrice`, `inStock`. Testează cu mai mulți filteri.",
        starterCode: "function filterProducts(products, { category, minPrice, maxPrice, inStock } = {}) {\n  return products.filter(p => {\n    if (category && p.category !== category) return false;\n    if (minPrice !== undefined && p.price < minPrice) return false;\n    if (maxPrice !== undefined && p.price > maxPrice) return false;\n    if (inStock !== undefined && p.inStock !== inStock) return false;\n    return true;\n  });\n}\n\nconst products = [\n  { name: 'Laptop', price: 3000, category: 'Electronics', inStock: true },\n  { name: 'Mouse', price: 100, category: 'Electronics', inStock: true },\n  { name: 'Carte React', price: 150, category: 'Books', inStock: false },\n  { name: 'Monitor', price: 2000, category: 'Electronics', inStock: true }\n];\n\nconst filtered = filterProducts(products, { category: 'Electronics', maxPrice: 2500, inStock: true });\nconsole.log('Filtrate:', filtered.map(p => p.name).join(', '));\nconsole.log('Count:', filtered.length);",
        language: "javascript", expectedOutput: "Filtrate: Mouse, Monitor\nCount: 2",
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Implementează sistemul de review-uri: funcția `addReview(productId, review)` adaugă un review, `getAverageRating(productId)` calculează media, `getTopRated(products, minRating)` returnează produsele cu rating > minRating.",
        starterCode: "const reviews = {};\n\nfunction addReview(productId, { rating, comment }) {\n  if (!reviews[productId]) reviews[productId] = [];\n  reviews[productId].push({ rating, comment });\n}\n\nfunction getAverageRating(productId) {\n  const r = reviews[productId];\n  if (!r || r.length === 0) return 0;\n  return r.reduce((sum, x) => sum + x.rating, 0) / r.length;\n}\n\naddReview('p1', { rating: 5, comment: 'Excelent' });\naddReview('p1', { rating: 4, comment: 'Bun' });\naddReview('p1', { rating: 3, comment: 'OK' });\naddReview('p2', { rating: 2, comment: 'Slab' });\n\nconsole.log('Rating p1:', getAverageRating('p1').toFixed(1));\nconsole.log('Rating p2:', getAverageRating('p2').toFixed(1));",
        language: "javascript", expectedOutput: "Rating p1: 4.0\nRating p2: 2.0",
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Implementează calculul prețului cu discount: funcția `calculatePrice(product, coupon)` aplică discount-ul cuponului dacă e valid. Cuponul are `code`, `discount` (procent) și `minOrder`. Testează cu cupoane valide și invalide.",
        starterCode: "function calculatePrice(product, coupon) {\n  const basePrice = product.price;\n  if (!coupon) return basePrice;\n  if (coupon.minOrder && basePrice < coupon.minOrder) {\n    console.log(`Cupon invalid: comandă minimă ${coupon.minOrder} RON`);\n    return basePrice;\n  }\n  const discount = basePrice * (coupon.discount / 100);\n  const finalPrice = basePrice - discount;\n  console.log(`Cupon ${coupon.code}: -${coupon.discount}% = ${finalPrice} RON`);\n  return finalPrice;\n}\n\ncalculatePrice({ name: 'Laptop', price: 3000 }, { code: 'SAVE10', discount: 10, minOrder: 1000 });\ncalculatePrice({ name: 'Mouse', price: 80 }, { code: 'SAVE10', discount: 10, minOrder: 100 });\ncalculatePrice({ name: 'Monitor', price: 2000 }, null);",
        language: "javascript", expectedOutput: "Cupon SAVE10: -10% = 2700 RON\nCupon invalid: comandă minimă 100 RON\n",
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Implementează un order management: funcția `createOrder(cart, user, address)` creează o comandă cu status 'pending'. `updateOrderStatus(orderId, status)` actualizează statusul. Afișează statusul comenzii la fiecare pas.",
        starterCode: "const orders = {};\nlet nextOrderId = 1000;\n\nfunction createOrder(items, user, address) {\n  const orderId = `ORD-${nextOrderId++}`;\n  const total = items.reduce((s, i) => s + i.price * i.qty, 0);\n  orders[orderId] = { orderId, user, items, address, status: 'pending', total };\n  console.log(`Comandă creată: ${orderId} | Total: ${total} RON | Status: pending`);\n  return orderId;\n}\n\nfunction updateOrderStatus(orderId, status) {\n  if (orders[orderId]) {\n    orders[orderId].status = status;\n    console.log(`${orderId}: status → ${status}`);\n  }\n}\n\nconst orderId = createOrder(\n  [{ name: 'Laptop', price: 3000, qty: 1 }, { name: 'Mouse', price: 100, qty: 2 }],\n  'Ana', 'Cluj-Napoca'\n);\nupdateOrderStatus(orderId, 'confirmed');\nupdateOrderStatus(orderId, 'shipped');\nupdateOrderStatus(orderId, 'delivered');",
        language: "javascript", expectedOutput: "Comandă creată: ORD-1000 | Total: 3200 RON | Status: pending\nORD-1000: status → confirmed\nORD-1000: status → shipped\nORD-1000: status → delivered",
      },
    ],
  },
];

async function main() {
  console.log("Reparare tasks fillblank/coding React (31 lecții)...\n");
  for (const fix of FIXES) {
    const del = await prisma.task.deleteMany({
      where: { lessonId: fix.lessonId, number: { gte: 6 } },
    });
    await prisma.task.createMany({
      data: fix.tasks.map((t) => ({
        lessonId: fix.lessonId,
        number: t.number,
        type: t.type,
        difficulty: t.difficulty || "medium",
        question: t.question,
        options: t.options || [],
        answer: t.answer || "",
        starterCode: t.starterCode || "",
        language: t.language || "javascript",
        expectedOutput: t.expectedOutput || "",
        name: "",
      })),
    });
    console.log(
      `✓ ${fix.name} — șters ${del.count}, creat ${fix.tasks.length}`
    );
  }
  console.log("\nGata. Toate lecțiile React au fost reparate.");
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
