"use strict";
require("dotenv").config({ path: ".env" });
const { PrismaClient } = require("@prisma/client");
const p = new PrismaClient();

const UPDATES = [
  // L25: Closures și Currying aprofundat
  {
    lesson: "25. Closures și Currying aprofundat",
    title: "Ce este un closure?",
    content: `**Closure** (închidere) este o funcție care **reține accesul la variabilele din scope-ul în care a fost creată**, chiar și după ce acel scope a dispărut din call stack.

\`\`\`javascript
function outer() {
  let count = 0; // variabilă din scope-ul outer
  return function inner() {
    count++;
    return count;
  };
}
const contor = outer(); // outer() s-a terminat, dar count trăiește
console.log(contor()); // 1
console.log(contor()); // 2
console.log(contor()); // 3
\`\`\`

• **De ce funcționează?** Funcția \`inner\` are o referință la \`count\` prin closure — JS nu șterge variabila cât timp există o referință vie la ea.
• Closure nu copiază valoarea — reține o **referință live** la variabilă.
• Fiecare apel la \`outer()\` creează un closure **independent**, cu propriul \`count\`.

**Analogie:** Un closure e ca un rucsac invizibil pe care funcția îl poartă mereu — conține toate variabilele din locul unde a fost creată.

\`\`\`javascript
const add5 = (function() {
  const x = 5; // capturat în closure
  return (y) => x + y;
})();
console.log(add5(3)); // 8
console.log(add5(10)); // 15
\`\`\`

**Closure-urile apar peste tot în JS:** callbacks, event listeners, module pattern, React hooks (useState reține starea via closure).`,
  },
  {
    lesson: "25. Closures și Currying aprofundat",
    title: "Closure pentru date private + factory pattern",
    content: `Closure-urile permit **encapsulare** — poți crea variabile care nu sunt accesibile din exterior, simulând membrii privați.

\`\`\`javascript
function createCounter(start = 0) {
  let _value = start; // "privat" — inaccesibil direct
  return {
    increment() { _value++; },
    decrement() { _value--; },
    getValue() { return _value; },
    reset() { _value = start; }
  };
}
const c = createCounter(10);
c.increment();
c.increment();
console.log(c.getValue()); // 12
console.log(c._value); // undefined — nu există public
\`\`\`

• \`_value\` este **complet privat** — nu poate fi citit sau modificat direct.
• Numai metodele returnate de factory au acces la el.
• Fiecare apel \`createCounter()\` produce un obiect cu closure propriu.

**Factory pattern** combină closures cu fabricarea de obiecte:

\`\`\`javascript
function createUser(name, role) {
  let loginCount = 0;
  return {
    getName: () => name,
    login() {
      loginCount++;
      console.log(\`\${name} logat de \${loginCount} ori\`);
    },
    isAdmin: () => role === "admin"
  };
}
const user = createUser("Ana", "admin");
user.login(); // Ana logat de 1 ori
console.log(user.isAdmin()); // true
console.log(user.loginCount); // undefined
\`\`\`

**Avantaje vs clase:** nu există \`this\` binding, nu ai nevoie de \`new\`, closure-urile sunt mai sigure decât câmpuri private cu \`#\`.`,
  },
  {
    lesson: "25. Closures și Currying aprofundat",
    title: "Currying — transformarea funcțiilor",
    content: `**Currying** transformă o funcție cu mai mulți parametri într-un lanț de funcții, fiecare primind câte un argument. Tehnica vine din matematică și permite **aplicare parțială** a argumentelor.

\`\`\`javascript
// Funcție normală
const add = (a, b, c) => a + b + c;
add(1, 2, 3); // 6

// Versiune curried
const addC = a => b => c => a + b + c;
addC(1)(2)(3); // 6

// Aplicare parțială — reutilizezi logica cu context fix
const add10 = addC(10);
console.log(add10(5)(2)); // 17
console.log(add10(0)(1)); // 11
\`\`\`

• Fiecare apel returnează o **funcție nouă** cu un argument capturat în closure.
• Poți "pre-configura" funcții pentru context specific.

**Curry util în practică:**

\`\`\`javascript
const multiply = a => b => a * b;
const double = multiply(2);
const triple = multiply(3);

[1, 2, 3, 4].map(double); // [2, 4, 6, 8]
[1, 2, 3, 4].map(triple); // [3, 6, 9, 12]

// Curry cu funcție generică
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) return fn(...args);
    return (...more) => curried(...args, ...more);
  };
}
const sum = curry((a, b, c) => a + b + c);
sum(1)(2)(3); // 6
sum(1, 2)(3); // 6
sum(1)(2, 3); // 6
\`\`\`

**Currying vs partial application:** currying transformă f(a,b,c) în f(a)(b)(c); partial application fixează unii parametri: \`sum.bind(null, 5)\`.`,
  },
  {
    lesson: "25. Closures și Currying aprofundat",
    title: "Memoization cu closures",
    content: `**Memoization** (memorizare) este o optimizare care stochează rezultatele apelurilor precedente și le returnează direct la apeluri repetate cu aceleași argumente, evitând recalcularea.

\`\`\`javascript
function memoize(fn) {
  const cache = new Map(); // closure captează cache
  return function(...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      console.log("din cache:", key);
      return cache.get(key);
    }
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

// Fibonacci fără memoization: O(2^n)
const fib = memoize(function(n) {
  if (n <= 1) return n;
  return fib(n - 1) + fib(n - 2);
});

console.log(fib(40)); // calculat rapid datorită cache
console.log(fib(40)); // instant — din cache
\`\`\`

• **Cache** este capturat în closure-ul funcției returnate — persistent între apeluri.
• Cheia cache-ului este serializarea JSON a argumentelor.
• Fiecare instanță \`memoize(fn)\` are cache propriu.

**Când folosești memoization:**
• Funcții pure (același input → același output mereu)
• Calcule grele: Fibonacci, factoriale, calcule geometrice
• API calls cu date statice (cu cache dedicat)

\`\`\`javascript
// Exemplu real: calcul de preț cu discount
const calculatePrice = memoize((basePrice, discountPct, taxPct) => {
  const discounted = basePrice * (1 - discountPct / 100);
  return discounted * (1 + taxPct / 100);
});
calculatePrice(100, 20, 19); // calculează
calculatePrice(100, 20, 19); // din cache — 0ms
\`\`\`

**Atenție:** memoization nu funcționează bine cu funcții impure (care depind de stare externă sau produc efecte secundare).`,
  },

  // L26: Prototipuri și Prototype Chain
  {
    lesson: "26. Prototipuri și Prototype Chain",
    title: "Ce este prototype chain?",
    content: `În JavaScript, **fiecare obiect are un prototip** — un alt obiect de la care moștenește proprietăți și metode. Lanțul de prototipuri (**prototype chain**) este mecanismul de moștenire nativ al JS, anterior claselor ES6.

\`\`\`javascript
const arr = [1, 2, 3];
// Calea: arr → Array.prototype → Object.prototype → null
arr.push(4);  // găsit pe Array.prototype
arr.toString(); // găsit pe Object.prototype
arr.xyz; // undefined — nu există nicăieri în lanț
\`\`\`

**Cum funcționează lookup-ul:**
1. JS caută proprietatea pe obiectul însuși
2. Dacă nu o găsește, urcă la \`[[Prototype]]\`
3. Continuă până la \`Object.prototype\`
4. Returnează \`undefined\` dacă nu o găsește

\`\`\`javascript
function Animal(name) {
  this.name = name; // proprietate proprie
}
Animal.prototype.speak = function() { // pe prototip — partajată
  return \`\${this.name} face zgomot\`;
};

const dog = new Animal("Rex");
console.log(dog.speak()); // Rex face zgomot
console.log(dog.hasOwnProperty("name")); // true
console.log(dog.hasOwnProperty("speak")); // false — e pe prototip
\`\`\`

• \`hasOwnProperty()\` verifică dacă proprietatea e **direct pe obiect** (nu moștenită).
• Metodele puse pe \`prototype\` sunt partajate între toate instanțele — o singură copie în memorie.
• **Proprietățile** se pun pe \`this\` în constructor (unice per instanță), **metodele** pe \`prototype\` (partajate).`,
  },
  {
    lesson: "26. Prototipuri și Prototype Chain",
    title: "__proto__, prototype, Object.getPrototypeOf",
    content: `Există trei moduri de a accesa și inspecta lanțul de prototipuri, fiecare cu rol specific:

**1. \`__proto__\`** — proprietatea (deprecată) a unui obiect care pointează la prototipul său:
\`\`\`javascript
const obj = {};
console.log(obj.__proto__ === Object.prototype); // true
const arr = [];
console.log(arr.__proto__ === Array.prototype); // true
console.log(arr.__proto__.__proto__ === Object.prototype); // true
\`\`\`

**2. \`Object.getPrototypeOf()\`** — metoda modernă recomandată:
\`\`\`javascript
const dog = new Animal("Rex");
console.log(Object.getPrototypeOf(dog) === Animal.prototype); // true
// Setare: Object.setPrototypeOf(obj, newProto) — evită în producție, e lent
\`\`\`

**3. \`Constructor.prototype\`** — obiectul partajat de toate instanțele:
\`\`\`javascript
function Car(model) { this.model = model; }
Car.prototype.drive = function() { return \`\${this.model} merge\`; };

const tesla = new Car("Tesla");
const bmw = new Car("BMW");
// Ambele accesează aceeași funcție drive din memorie
console.log(Car.prototype.drive === tesla.drive); // true
\`\`\`

• \`prototype\` există pe **funcții constructor** — definește ce moștenesc instanțele.
• \`__proto__\` există pe **obiecte** — pointează la prototipul lor.
• \`instanceof\` verifică dacă \`Constructor.prototype\` apare în lanțul obiectului: \`tesla instanceof Car // true\`.

**Rezumat:** \`__proto__\` e moștenire; folosește \`Object.getPrototypeOf()\` în cod nou.`,
  },
  {
    lesson: "26. Prototipuri și Prototype Chain",
    title: "Clase ES6 vs prototype",
    content: `Clasele ES6 sunt **syntax sugar** peste prototype chain — în spate, tot prototipuri funcționează. Clasele oferă sintaxă mai clară dar nu schimbă fundamentul.

\`\`\`javascript
// Stil prototype (pre-ES6)
function PersonOld(name, age) {
  this.name = name;
  this.age = age;
}
PersonOld.prototype.greet = function() {
  return \`Salut, sunt \${this.name}\`;
};

// Stil clasă ES6 (echivalent exact)
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  greet() {
    return \`Salut, sunt \${this.name}\`;
  }
}
\`\`\`

• \`greet\` definit în clasă ajunge tot pe \`Person.prototype.greet\` — identic!
• \`typeof Person\` returnează \`"function"\` — clasele sunt funcții constructor.

**Moștenire — prototype manual vs extends:**
\`\`\`javascript
// Cu extends (modern)
class Animal { speak() { return "..."; } }
class Dog extends Animal {
  speak() { return "Woof! " + super.speak(); }
}
// Echivalent prototype manual:
function DogOld() {}
DogOld.prototype = Object.create(AnimalOld.prototype);
DogOld.prototype.constructor = DogOld;
\`\`\`

**Diferențe reale între clase și funcții constructor:**
• Clasele sunt în **strict mode** automat
• Nu pot fi apelate fără \`new\` (funcțiile vechi puteau)
• \`super\` e disponibil în clase, nu în funcții normale
• Metodele clasei nu sunt enumerable (nu apar în \`for...in\`)

**Concluzie:** Folosește clase pentru cod nou — sunt mai clare și mai sigure.`,
  },
  {
    lesson: "26. Prototipuri și Prototype Chain",
    title: "Object methods — create, assign, keys, entries",
    content: `**Object** are metode statice esențiale pentru lucrul cu prototipuri și obiecte în general:

**\`Object.create(proto)\`** — creează obiect cu prototip specificat:
\`\`\`javascript
const animal = {
  speak() { return \`\${this.name} vorbește\`; }
};
const dog = Object.create(animal); // dog moștenește din animal
dog.name = "Rex";
console.log(dog.speak()); // Rex vorbește
console.log(Object.getPrototypeOf(dog) === animal); // true

// Object.create(null) — obiect fără prototip (dict pur)
const dict = Object.create(null);
dict.key = "valoare"; // nu are toString, hasOwnProperty etc.
\`\`\`

**\`Object.assign(target, ...sources)\`** — copiază proprietăți:
\`\`\`javascript
const defaults = { color: "red", size: 10 };
const options = { size: 20, bold: true };
const merged = Object.assign({}, defaults, options);
// { color: "red", size: 20, bold: true }
// Notă: copie superficială (shallow) — obiectele nested se copiază prin referință
\`\`\`

**\`Object.keys/values/entries\`** — iterare:
\`\`\`javascript
const user = { name: "Ana", age: 25, role: "admin" };
Object.keys(user);    // ["name", "age", "role"]
Object.values(user);  // ["Ana", 25, "admin"]
Object.entries(user); // [["name","Ana"], ["age",25], ["role","admin"]]

// Iterare modernă
for (const [key, val] of Object.entries(user)) {
  console.log(\`\${key}: \${val}\`);
}
// Transformare: filtrare proprietăți
const publicUser = Object.fromEntries(
  Object.entries(user).filter(([k]) => k !== "role")
); // { name: "Ana", age: 25 }
\`\`\`

**\`Object.freeze/seal\`** — imutabilitate: \`freeze\` blochează toate modificările; \`seal\` permite modificare dar nu adăugare/ștergere.`,
  },

  // L27: Symbol, WeakMap, WeakSet și Map/Set
  {
    lesson: "27. Symbol, WeakMap, WeakSet și Map/Set",
    title: "Map și Set — colecții moderne",
    content: `**Map** și **Set** sunt structuri de date ES6 care rezolvă limitări ale obiectelor și array-urilor obișnuite.

**Map** — dicționar cu chei de orice tip:
\`\`\`javascript
const map = new Map();
map.set("name", "Ana");
map.set(42, "număr");
map.set({ id: 1 }, "obiect ca cheie!"); // imposibil cu {}
map.set(true, "boolean");

console.log(map.get("name")); // "Ana"
console.log(map.size); // 4
console.log(map.has(42)); // true

// Iterare Map
for (const [key, value] of map) {
  console.log(key, "→", value);
}
// Map din array de perechi
const userMap = new Map([["id", 1], ["name", "Ion"]]);
\`\`\`

**Set** — colecție de valori unice:
\`\`\`javascript
const set = new Set([1, 2, 3, 2, 1]); // duplicatele se ignoră
console.log(set.size); // 3
set.add(4);
set.delete(2);
console.log([...set]); // [1, 3, 4]

// Uz classic: eliminare duplicate din array
const arr = [1, 2, 2, 3, 3, 4];
const unique = [...new Set(arr)]; // [1, 2, 3, 4]

// Verificare eficientă
const visited = new Set();
visited.add("pagina1");
if (!visited.has("pagina2")) { visited.add("pagina2"); }
\`\`\`

• **Map vs Object:** Map acceptă orice cheie, păstrează ordinea inserției, are \`.size\`, mai performant pentru adăugări/ștergeri frecvente.
• **Set vs Array:** Set garantează unicitate, \`.has()\` este O(1) vs \`.includes()\` O(n) pentru array.`,
  },
  {
    lesson: "27. Symbol, WeakMap, WeakSet și Map/Set",
    title: "Symbol — valori unice garantate",
    content: `**Symbol** este un tip primitiv ES6 care creează valori **complet unice** — niciun Symbol nu este egal cu altul, chiar dacă au aceeași descriere.

\`\`\`javascript
const sym1 = Symbol("id");
const sym2 = Symbol("id");
console.log(sym1 === sym2); // false — mereu diferite!
console.log(typeof sym1); // "symbol"

// Symbol ca proprietăți de obiect — nu apar în for...in
const ID = Symbol("id");
const user = {
  name: "Ana",
  [ID]: 12345 // proprietate "ascunsă"
};
console.log(user[ID]); // 12345
console.log(user.ID); // undefined — nu e string!

for (const key in user) console.log(key); // doar "name" — ID e ascuns
Object.keys(user); // ["name"] — Symbol nu apare
Object.getOwnPropertySymbols(user); // [Symbol(id)]
\`\`\`

**Symbol.for()** — registry global, returnează același Symbol dacă cheia există:
\`\`\`javascript
const a = Symbol.for("app.id");
const b = Symbol.for("app.id");
console.log(a === b); // true! — din registry
\`\`\`

**Well-known Symbols** — hook-uri în comportamentul intern JS:
\`\`\`javascript
class Range {
  constructor(start, end) { this.start = start; this.end = end; }
  [Symbol.iterator]() { // face obiectul iterabil!
    let current = this.start;
    const end = this.end;
    return { next() {
      return current <= end ? { value: current++, done: false } : { done: true };
    }};
  }
}
console.log([...new Range(1, 5)]); // [1, 2, 3, 4, 5]
for (const n of new Range(1, 3)) console.log(n); // 1 2 3
\`\`\`

**Symbol.toPrimitive**, **Symbol.hasInstance**, **Symbol.species** — alți well-known symbols pentru customizare avansată.`,
  },
  {
    lesson: "27. Symbol, WeakMap, WeakSet și Map/Set",
    title: "WeakMap și WeakSet — referințe slabe",
    content: `**WeakMap** și **WeakSet** sunt versiuni "slabe" ale Map și Set — nu împiedică garbage collection-ul cheilor/valorilor lor.

**WeakMap** — asociere date la obiecte fără memory leak:
\`\`\`javascript
const cache = new WeakMap();

function process(element) {
  if (cache.has(element)) {
    return cache.get(element); // din cache
  }
  const result = heavyCalculation(element);
  cache.set(element, result); // element e cheia
  return result;
}

// Când element e removed din DOM → GC îl poate colecta
// WeakMap NU împiedică GC — Map normal ar ține referința vie
\`\`\`

• Cheile WeakMap sunt **obligatoriu obiecte** (nu primitive).
• Nu are \`.size\`, nu e iterabil — nu poți enumera conținutul.
• Datele dispar automat când obiectul-cheie e garbage collected.

**WeakSet** — set de obiecte fără memory leak:
\`\`\`javascript
const seen = new WeakSet();

function processOnce(obj) {
  if (seen.has(obj)) return "deja procesat";
  seen.add(obj);
  // procesare...
  return "procesat acum";
}

const req = { id: 1 };
processOnce(req); // "procesat acum"
processOnce(req); // "deja procesat"
// Când req devine inaccesibil → GC colectează și entry-ul din WeakSet
\`\`\`

**Cazuri de utilizare principale:**
• **Date private per-instanță**: \`const _private = new WeakMap()\` — stochezi date private la instanțe fără leak.
• **Caching** fără memory leak: cache legat de DOM elements sau obiecte temporare.
• **Tracking** fără a împiedica GC.

**Diferența cheie:** Map/Set = referințe tari (împiedică GC); WeakMap/WeakSet = referințe slabe (GC poate colecta).`,
  },
  {
    lesson: "27. Symbol, WeakMap, WeakSet și Map/Set",
    title: "Diferențe cheie Map vs Object",
    content: `Deși ambele stochează perechi cheie-valoare, **Map** și **Object** au diferențe importante:

| Caracteristică | Map | Object |
|---|---|---|
| Tip cheie | orice (obiecte, funcții, numere) | string sau Symbol |
| Ordine | inserție garantată | string-urile numerice primul |
| .size | ✓ direct | Object.keys(o).length |
| Iterare | for...of direct | for...in / Object.entries() |
| Performanță (adăugare/ștergere frecventă) | mai bun | mai slab |
| Prototip implicit | none | Object.prototype (risc key collision) |

\`\`\`javascript
// OBJECT — riscul cheii din prototip
const obj = {};
obj["constructor"] = "custom"; // suprascrie Object.prototype.constructor!
obj["__proto__"] = "hmm"; // periculos

// MAP — nici un astfel de risc
const map = new Map();
map.set("constructor", "safe");
map.set("__proto__", "safe");

// Object ca cheie — merge DOAR cu Map
const domNode = document.getElementById("app");
const metaMap = new Map();
metaMap.set(domNode, { clicks: 0 }); // ✓

const metaObj = {};
metaObj[domNode] = { clicks: 0 }; // cheia devine "[object HTMLDivElement]" ✗
\`\`\`

**Când să folosești Map:**
• Chei non-string sau chei dinamice/necunoscute
• Adăugare/ștergere frecventă de intrări
• Ai nevoie de \`.size\` sau iterare ușoară

**Când să folosești Object:**
• Structuri de date statice cu chei cunoscute
• JSON serialization (Map nu se serializează direct)
• Metode și comportament (clase/interfețe)

\`\`\`javascript
// Serializare Map → JSON
const map = new Map([["a", 1], ["b", 2]]);
JSON.stringify(Object.fromEntries(map)); // '{"a":1,"b":2}'
\`\`\``,
  },

  // L28: Proxy și Reflect
  {
    lesson: "28. Proxy și Reflect",
    title: "Proxy — interceptează operațiuni pe obiecte",
    content: `**Proxy** este un wrapper care interceptează operațiuni fundamentale pe un obiect (citire, scriere, ștergere, etc.) și le poate modifica sau valida.

\`\`\`javascript
const handler = {
  get(target, prop) {
    console.log(\`Citit: \${prop}\`);
    return prop in target ? target[prop] : \`Proprietate "\${prop}" lipsă\`;
  },
  set(target, prop, value) {
    if (typeof value !== "number") throw new TypeError("Doar numere!");
    target[prop] = value;
    return true; // necesar — returnarea false aruncă TypeError în strict mode
  }
};

const obj = new Proxy({}, handler);
obj.x = 42;       // scrie normal
console.log(obj.x); // Citit: x → 42
console.log(obj.y); // Citit: y → Proprietate "y" lipsă
obj.z = "text";   // TypeError: Doar numere!
\`\`\`

• **\`target\`** — obiectul original interceptat.
• **\`prop\`** — numele proprietății.
• **Handler-ul** definește "capcane" (**traps**) pentru operațiunile dorite.

**Proxy pentru validare:**
\`\`\`javascript
function createValidated(schema) {
  return new Proxy({}, {
    set(target, key, value) {
      if (schema[key] && typeof value !== schema[key]) {
        throw new TypeError(\`\${key} trebuie să fie \${schema[key]}\`);
      }
      return Reflect.set(target, key, value);
    }
  });
}
const user = createValidated({ name: "string", age: "number" });
user.name = "Ana"; // ✓
user.age = 25;     // ✓
user.age = "xxx";  // TypeError: age trebuie să fie number
\`\`\`

**Proxy funcționează transparent** — codul care folosește obiectul proxy nu știe că există interceptor.`,
  },
  {
    lesson: "28. Proxy și Reflect",
    title: "Traps disponibile în Proxy",
    content: `**Proxy** suportă 13 traps (capcane) care acoperă toate operațiunile fundamentale din JavaScript:

**Trap-uri de proprietăți:**
\`\`\`javascript
const handler = {
  get(target, prop, receiver) {},        // obj.prop / obj[prop]
  set(target, prop, value, receiver) {}, // obj.prop = val
  has(target, prop) {},                  // prop in obj
  deleteProperty(target, prop) {},       // delete obj.prop
  getOwnPropertyDescriptor(target, prop) {},
  defineProperty(target, prop, descriptor) {},
  ownKeys(target) {},                    // Object.keys(), for...in
};
\`\`\`

**Trap-uri pentru funcții (target trebuie să fie funcție):**
\`\`\`javascript
const fnHandler = {
  apply(target, thisArg, args) {},  // fn()
  construct(target, args) {}        // new Fn()
};
\`\`\`

**Exemplu apply trap — logging automat:**
\`\`\`javascript
function multiply(a, b) { return a * b; }
const loggedMultiply = new Proxy(multiply, {
  apply(target, ctx, args) {
    console.log(\`Apelat cu \${args.join(", ")}\`);
    const result = Reflect.apply(target, ctx, args);
    console.log(\`Rezultat: \${result}\`);
    return result;
  }
});
loggedMultiply(3, 4); // Apelat cu 3, 4 → Rezultat: 12
\`\`\`

**\`has\` trap — ascunde proprietăți:**
\`\`\`javascript
const hidePrivate = new Proxy({ _secret: 42, name: "Ana" }, {
  has(target, prop) {
    if (prop.startsWith("_")) return false; // ascunde cheile private
    return prop in target;
  }
});
console.log("name" in hidePrivate);    // true
console.log("_secret" in hidePrivate); // false (ascuns)
console.log(hidePrivate._secret);      // 42 (get nu e interceptat)
\`\`\`

Cele mai folosite traps: \`get\`, \`set\`, \`has\`, \`apply\`, \`construct\`.`,
  },
  {
    lesson: "28. Proxy și Reflect",
    title: "Reflect — oglinda operațiunilor JS",
    content: `**Reflect** este un obiect static ES6 care oferă metode pentru operațiunile fundamentale JavaScript — oglinda exactă a trap-urilor din Proxy.

\`\`\`javascript
// Fiecare metodă Reflect corespunde unui trap Proxy
Reflect.get(obj, "prop");              // obj.prop
Reflect.set(obj, "prop", val);         // obj.prop = val
Reflect.has(obj, "prop");              // "prop" in obj
Reflect.deleteProperty(obj, "prop");   // delete obj.prop
Reflect.ownKeys(obj);                  // Object.keys + Symbols
Reflect.apply(fn, ctx, args);          // fn.call(ctx, ...args)
Reflect.construct(Cls, args);          // new Cls(...args)
\`\`\`

**De ce Reflect în Proxy handlers?**

Fără Reflect, forwarding-ul manual poate pierde detalii (ex: \`receiver\` — important pentru getteri):
\`\`\`javascript
const base = {
  get value() { return this._val * 2; } // getter cu this
};
const obj = Object.create(base);
obj._val = 5;

// GREȘIT: pierde receiver
const bad = new Proxy(obj, {
  get(target, prop) { return target[prop]; }
});
console.log(bad.value); // NaN — this e target, nu receiver

// CORECT: Reflect.get cu receiver
const good = new Proxy(obj, {
  get(target, prop, receiver) { return Reflect.get(target, prop, receiver); }
});
console.log(good.value); // 10 ✓
\`\`\`

**Reflect returnează valori, nu aruncă:**
\`\`\`javascript
// defineProperty aruncă TypeError dacă eșuează
try { Object.defineProperty(obj, "x", { value: 1 }); } catch (e) {}
// Reflect returnează boolean
if (!Reflect.defineProperty(obj, "x", { value: 1 })) {
  console.log("Nu s-a putut defini");
}
\`\`\`

**Regulă:** în orice Proxy handler, folosește \`Reflect\` pentru operațiunea default — garantează comportament corect.`,
  },
  {
    lesson: "28. Proxy și Reflect",
    title: "Use cases practice",
    content: `Proxy are aplicații practice puternice în cod real:

**1. Reactive data (baza Vue 3, MobX):**
\`\`\`javascript
function reactive(data, onChange) {
  return new Proxy(data, {
    set(target, key, value) {
      const old = target[key];
      const result = Reflect.set(target, key, value);
      if (old !== value) onChange(key, value, old);
      return result;
    }
  });
}
const state = reactive({ count: 0 }, (k, v) => console.log(\`\${k}: \${v}\`));
state.count = 5;  // count: 5  ← declanșează UI update
state.count = 5;  // nimic — valoarea nu s-a schimbat
\`\`\`

**2. Default values (returnează valoare default pentru proprietăți lipsă):**
\`\`\`javascript
function withDefaults(target, defaults) {
  return new Proxy(target, {
    get(t, k) { return k in t ? t[k] : defaults[k]; }
  });
}
const config = withDefaults({ debug: true }, { theme: "light", lang: "ro" });
console.log(config.debug); // true (din target)
console.log(config.theme); // "light" (din defaults)
\`\`\`

**3. API mock / lazy loading:**
\`\`\`javascript
const api = new Proxy({}, {
  get(target, endpoint) {
    return (params) => fetch(\`/api/\${endpoint}\`, {
      method: "POST", body: JSON.stringify(params)
    }).then(r => r.json());
  }
});
api.users({ id: 1 });    // POST /api/users
api.products({ page: 2 }); // POST /api/products
\`\`\`

**4. Imutabilitate runtime:**
\`\`\`javascript
function freeze(obj) {
  return new Proxy(obj, {
    set() { throw new Error("Obiect read-only!"); },
    deleteProperty() { throw new Error("Obiect read-only!"); }
  });
}
\`\`\`

**Proxy overhead:** există un cost de performanță mic — nu folosi Proxy în bucle critice cu milioane de iterații.`,
  },

  // L29: Regular Expressions (RegEx)
  {
    lesson: "29. Regular Expressions (RegEx)",
    title: "Sintaxă de bază — creare și testare",
    content: `**Regular Expression (RegEx)** este un pattern pentru căutare și validare de text. JavaScript le suportă nativ ca tip de date.

**Două moduri de creare:**
\`\`\`javascript
// Literal (recomandat) — compus la parse-time
const regex1 = /hello/;
const regex2 = /hello/i; // flag i = case insensitive

// Constructor — util când pattern-ul e dinamic
const search = "hello";
const regex3 = new RegExp(search, "gi"); // g = global, i = case insensitive
\`\`\`

**Metode principale:**

\`test()\` — returnează boolean:
\`\`\`javascript
/^\d+$/.test("12345"); // true — doar cifre
/^\d+$/.test("123a5"); // false
/hello/i.test("Hello World"); // true
\`\`\`

\`match()\` — returnează array cu match-uri:
\`\`\`javascript
"Prețul: 42.5 lei și 100 lei".match(/\d+\.?\d*/g);
// ["42.5", "100"]
"2026-05-15".match(/(\d{4})-(\d{2})-(\d{2})/);
// ["2026-05-15", "2026", "05", "15"] — index 1,2,3 = grupuri
\`\`\`

\`replace()\` — înlocuire:
\`\`\`javascript
"Bună ziua".replace(/[aeiouăîâ]/gi, "*"); // "B*n* z**"
"ana-are-mere".replace(/-(\w)/g, (_, c) => c.toUpperCase());
// "anaAreMere" — camelCase
\`\`\`

\`exec()\` — iterare manuală cu stare (util cu flag \`g\`):
\`\`\`javascript
const re = /\d+/g;
const text = "am 3 mere și 5 pere";
let m;
while ((m = re.exec(text)) !== null) {
  console.log(\`Găsit \${m[0]} la index \${m.index}\`);
}
\`\`\`

**Flags importante:** \`g\` (global), \`i\` (case insensitive), \`m\` (multiline), \`s\` (dotAll — . include newline).`,
  },
  {
    lesson: "29. Regular Expressions (RegEx)",
    title: "Caractere speciale și clase",
    content: `RegEx are metacaractere speciale pentru a defini pattern-uri flexibile:

**Anchore — poziție în text:**
\`\`\`
^ — începutul string-ului (sau liniei cu flag m)
$ — sfârșitul string-ului
\b — word boundary (graniță cuvânt)
\B — non-word boundary
\`\`\`
\`\`\`javascript
/^hello/.test("hello world"); // true
/hello$/.test("say hello");   // true
/\bcat\b/.test("the cat sat"); // true
/\bcat\b/.test("concatenate"); // false
\`\`\`

**Clase de caractere:**
\`\`\`
.  — orice caracter (excl. newline)
\d — cifră [0-9]      \D — non-cifră
\w — word char [a-zA-Z0-9_]   \W — non-word
\s — whitespace (space, tab, newline)  \S — non-whitespace
[abc]  — oricare din a, b, c
[^abc] — orice EXCEPT a, b, c
[a-z]  — range: orice literă mică
[a-zA-Z0-9] — alfanumeric
\`\`\`
\`\`\`javascript
/\d{4}/.test("2026"); // true — exact 4 cifre
/[a-zA-Z]+/.test("Hello"); // true — litere
/[^0-9]/.test("abc"); // true — conține non-cifre
\`\`\`

**Exemple practice:**
\`\`\`javascript
// Email simplu
/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test("user@example.com"); // true

// Număr de telefon RO
/^(\+40|0)[0-9]{9}$/.test("0712345678"); // true

// Hex color
/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test("#ff0000"); // true
/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test("#abc");    // true

// URL slug
/^[a-z0-9]+(-[a-z0-9]+)*$/.test("my-post-title"); // true
\`\`\``,
  },
  {
    lesson: "29. Regular Expressions (RegEx)",
    title: "Quantifiers și grupuri",
    content: `**Quantifiers** definesc de câte ori trebuie să apară un element. **Grupurile** capturează sau organizează porțiuni din pattern.

**Quantifiers:**
\`\`\`
*   — 0 sau mai multe (greedy)
+   — 1 sau mai multe (greedy)
?   — 0 sau 1 (opțional)
{n} — exact n
{n,} — cel puțin n
{n,m} — între n și m
*? +? {n,m}? — lazy (cât mai puțin posibil)
\`\`\`
\`\`\`javascript
/<.+>/.exec("<b>text</b>")[0];  // "<b>text</b>" — greedy, ia tot
/<.+?>/.exec("<b>text</b>")[0]; // "<b>" — lazy, cât mai scurt
/\d{2,4}/.exec("2026")[0]; // "2026" — greedy, 4 cifre
\`\`\`

**Grupuri de captură \`()\`:**
\`\`\`javascript
const date = "2026-05-15";
const m = date.match(/(\d{4})-(\d{2})-(\d{2})/);
// m[0] = "2026-05-15" — match complet
// m[1] = "2026", m[2] = "05", m[3] = "15" — grupuri

// Named groups (ES2018)
const { year, month, day } = date.match(
  /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/
).groups;
console.log(year, month, day); // 2026 05 15
\`\`\`

**Grupuri non-capturante \`(?:)\`:**
\`\`\`javascript
// (?:) grupează fără a captura — mai eficient
/(?:https?|ftp):\/\//.test("https://example.com"); // true
// https sau http sau ftp — capturat dacă era ()
\`\`\`

**Alternare cu \`|\`:**
\`\`\`javascript
/cat|dog|bird/.test("I have a dog"); // true
/^(Mon|Tue|Wed|Thu|Fri)$/.test("Mon"); // true — validare zi
\`\`\`

**Lookahead și lookbehind:**
\`\`\`javascript
// Pozitiv lookahead: urmează X
/\d+(?= lei)/.exec("100 lei")[0]; // "100"
// Negativ lookahead: nu urmează X
/\d+(?! lei)/.exec("100 USD")[0]; // "100"
\`\`\``,
  },
  {
    lesson: "29. Regular Expressions (RegEx)",
    title: "Pattern-uri practice comune",
    content: `Colecție de pattern-uri RegEx esențiale pentru proiecte reale:

**Validare email:**
\`\`\`javascript
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
emailRegex.test("user@example.com"); // true
emailRegex.test("invalid@"); // false
\`\`\`

**Validare parolă (min 8 chars, o literă mare, o cifră):**
\`\`\`javascript
const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
passwordRegex.test("Parola1!"); // true
passwordRegex.test("parola1"); // false — lipsă literă mare
\`\`\`

**Extragere URL-uri din text:**
\`\`\`javascript
const urlRegex = /https?:\/\/[^\s<>"{}|\\^\\[\\]]+/g;
"Visit https://google.com and http://example.org".match(urlRegex);
// ["https://google.com", "http://example.org"]
\`\`\`

**Format număr cu separatori:**
\`\`\`javascript
function formatNumber(n) {
  return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
formatNumber(1234567); // "1.234.567"
\`\`\`

**Parsare CSV simplă:**
\`\`\`javascript
const line = 'Ana,"Strada Mare, 10","București"';
const fields = line.match(/(".*?"|[^,]+)(?=,|$)/g)
  .map(f => f.replace(/^"|"$/g, ""));
// ["Ana", "Strada Mare, 10", "București"]
\`\`\`

**Sanitizare HTML (escaping):**
\`\`\`javascript
function escapeHTML(str) {
  return str.replace(/[&<>"']/g, c => ({
    "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":'&#39;'
  })[c]);
}
escapeHTML('<script>alert("xss")</script>');
// "&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;"
\`\`\`

• Testează pattern-uri complexe la regex101.com (suportă JS mode).
• RegEx-urile complexe sunt greu de citit — adaugă comentarii sau descompune în bucăți.`,
  },

  // L30: Generators și Iterators
  {
    lesson: "30. Generators și Iterators",
    title: "Iterator protocol",
    content: `**Iterator protocol** definește interfața standard pentru a "parcurge" o colecție pas cu pas. Un obiect este iterator dacă are o metodă \`next()\` care returnează \`{ value, done }\`.

\`\`\`javascript
// Iterator manual
function rangeIterator(start, end) {
  let current = start;
  return {
    next() {
      if (current <= end) {
        return { value: current++, done: false };
      }
      return { value: undefined, done: true };
    }
  };
}

const iter = rangeIterator(1, 3);
console.log(iter.next()); // { value: 1, done: false }
console.log(iter.next()); // { value: 2, done: false }
console.log(iter.next()); // { value: 3, done: false }
console.log(iter.next()); // { value: undefined, done: true }
\`\`\`

**Iterable protocol** — obiectele iterabile implementează \`Symbol.iterator\`:
\`\`\`javascript
const range = {
  from: 1,
  to: 5,
  [Symbol.iterator]() {
    let current = this.from;
    const last = this.to;
    return {
      next() {
        return current <= last
          ? { value: current++, done: false }
          : { done: true };
      }
    };
  }
};

for (const num of range) console.log(num); // 1 2 3 4 5
console.log([...range]); // [1, 2, 3, 4, 5]
const [a, b, c] = range; // destructuring funcționează!
\`\`\`

• **Iterabile built-in:** Array, String, Map, Set, NodeList — toate implementează \`Symbol.iterator\`.
• \`for...of\` și spread \`...\` funcționează cu orice iterable.
• **Diferența:** \`for...of\` vs \`for...in\`: \`for...of\` parcurge valorile (prin iterator), \`for...in\` parcurge cheile enumerable ale obiectului.`,
  },
  {
    lesson: "30. Generators și Iterators",
    title: "Generator functions — function*",
    content: `**Generatoarele** sunt funcții speciale care pot fi **pauzate și reluate**. Folosind \`yield\`, o funcție generator returnează valori una câte una, la cerere.

\`\`\`javascript
function* counter(start = 0) {
  while (true) { // buclă infinită — OK în generator!
    yield start++;
  }
}

const gen = counter(10);
console.log(gen.next()); // { value: 10, done: false }
console.log(gen.next()); // { value: 11, done: false }
console.log(gen.next()); // { value: 12, done: false }
// Infinit, la cerere — nu consumă memorie pentru toate valorile
\`\`\`

**Generator finit:**
\`\`\`javascript
function* fibonacci() {
  let [a, b] = [0, 1];
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

// Primele 10 numere Fibonacci
const fib = fibonacci();
const first10 = Array.from({ length: 10 }, () => fib.next().value);
// [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
\`\`\`

**Comunicare bidirecțională cu \`next(value)\`:**
\`\`\`javascript
function* calculator() {
  let result = 0;
  while (true) {
    const input = yield result; // yield trimite result, primește input
    if (input === null) break;
    result += input;
  }
  return result;
}

const calc = calculator();
calc.next();     // pornire (yield inițial, value = 0)
calc.next(10);   // { value: 10, done: false }
calc.next(5);    // { value: 15, done: false }
calc.next(null); // { value: 15, done: true }
\`\`\`

• Un generator returnează automat un **iterator** — poți folosi \`for...of\` direct.
• \`return\` într-un generator setează \`done: true\` cu valoarea returnată.`,
  },
  {
    lesson: "30. Generators și Iterators",
    title: "yield* și generatori recursivi",
    content: `**\`yield*\`** delegă execuția la un alt iterable sau generator — echivalentul "yield all from X".

\`\`\`javascript
function* gen1() { yield 1; yield 2; }
function* gen2() { yield 3; yield 4; }

function* combined() {
  yield* gen1(); // yield 1, 2
  yield 0;       // yield 0
  yield* gen2(); // yield 3, 4
  yield* [5, 6, 7]; // yield* funcționează cu orice iterable
}
console.log([...combined()]); // [1, 2, 0, 3, 4, 5, 6, 7]
\`\`\`

**Tree traversal recursiv cu generator:**
\`\`\`javascript
function* traverseTree(node) {
  yield node.value;
  for (const child of node.children || []) {
    yield* traverseTree(child); // recursivitate!
  }
}

const tree = {
  value: "root",
  children: [
    { value: "a", children: [{ value: "a1" }, { value: "a2" }] },
    { value: "b", children: [{ value: "b1" }] }
  ]
};
console.log([...traverseTree(tree)]);
// ["root", "a", "a1", "a2", "b", "b1"]
\`\`\`

**Flatten recursiv cu yield*:**
\`\`\`javascript
function* flatten(arr) {
  for (const item of arr) {
    if (Array.isArray(item)) yield* flatten(item);
    else yield item;
  }
}
console.log([...flatten([1, [2, [3, [4]], 5]])]); // [1, 2, 3, 4, 5]
\`\`\`

**Valoarea de return din yield*:**
\`\`\`javascript
function* inner() { yield 1; return "done"; }
function* outer() {
  const result = yield* inner(); // result = valoarea return a inner
  console.log(result); // "done"
}
\`\`\`

**Avantajul față de recursivitate normală:** generatoarele recursive nu acumulează call stack — valorile sunt produse lazy, unul câte unul.`,
  },
  {
    lesson: "30. Generators și Iterators",
    title: "Async generators — yield + await",
    content: `**Async generators** combină puterea generatoarelor cu \`async/await\` — permit iterare lazy peste date asincrone (stream-uri, pagini de API, events).

\`\`\`javascript
async function* fetchPages(baseUrl, totalPages) {
  for (let page = 1; page <= totalPages; page++) {
    const response = await fetch(\`\${baseUrl}?page=\${page}\`);
    const data = await response.json();
    yield data; // yield date asincrone, o pagină pe rând
  }
}

// Consum cu for await...of
async function loadAll() {
  for await (const page of fetchPages("/api/users", 5)) {
    console.log(\`Pagina cu \${page.users.length} utilizatori\`);
    // procesezi fiecare pagină imediat ce sosește
  }
}
\`\`\`

**Stream de events în timp real:**
\`\`\`javascript
async function* streamEvents(url) {
  const response = await fetch(url);
  const reader = response.body.getReader();
  const decoder = new TextDecoder();

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    yield decoder.decode(value); // fiecare chunk de date
  }
}

for await (const chunk of streamEvents("/api/stream")) {
  console.log("Chunk primit:", chunk);
}
\`\`\`

**Infinite async sequence:**
\`\`\`javascript
async function* pollEvery(url, intervalMs) {
  while (true) {
    const data = await fetch(url).then(r => r.json());
    yield data;
    await new Promise(resolve => setTimeout(resolve, intervalMs));
  }
}
// Polling la fiecare 5 secunde
for await (const data of pollEvery("/api/status", 5000)) {
  if (data.done) break;
  updateUI(data);
}
\`\`\`

• **\`for await...of\`** — singura modalitate standard de a consuma async iterables.
• Async generators returnează un \`AsyncGenerator\` care implementează atât \`AsyncIterator\` cât și \`AsyncIterable\`.`,
  },

  // L31: Error Handling avansat
  {
    lesson: "31. Error Handling avansat",
    title: "Tipuri de erori și custom errors",
    content: `JavaScript are 6 tipuri de erori built-in, fiecare pentru situații diferite. Poți extinde \`Error\` pentru erori custom cu context bogat.

**Erori built-in:**
\`\`\`javascript
new TypeError("Așteptat string, primit number");  // tip greșit
new RangeError("Index în afara limitelor");        // valoare în afara range
new ReferenceError("x is not defined");            // variabilă nedefinită
new SyntaxError("Unexpected token");               // sintaxă greșită
new URIError("URI malformat");                     // URI invalid
new EvalError("Eroare eval");                      // rar, din eval()
\`\`\`

**Custom Error classes:**
\`\`\`javascript
class AppError extends Error {
  constructor(message, code, statusCode = 500) {
    super(message);
    this.name = "AppError";
    this.code = code;
    this.statusCode = statusCode;
    // Fix pentru stack trace corect în V8
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

class NotFoundError extends AppError {
  constructor(resource) {
    super(\`\${resource} nu a fost găsit\`, "NOT_FOUND", 404);
    this.name = "NotFoundError";
  }
}

class ValidationError extends AppError {
  constructor(field, value) {
    super(\`Valoare invalidă pentru "\${field}": "\${value}"\`, "VALIDATION", 422);
    this.name = "ValidationError";
    this.field = field;
  }
}
\`\`\`

**Utilizare:**
\`\`\`javascript
function findUser(id) {
  if (!id) throw new ValidationError("id", id);
  const user = db.find(id);
  if (!user) throw new NotFoundError(\`User #\${id}\`);
  return user;
}

try {
  findUser(null);
} catch (e) {
  if (e instanceof ValidationError) console.log("Validare:", e.field);
  else if (e instanceof NotFoundError) console.log("404:", e.message);
  else throw e; // re-throw dacă nu știm ce e
}
\`\`\``,
  },
  {
    lesson: "31. Error Handling avansat",
    title: "Error handling în Promises",
    content: `Promise-urile au propriul sistem de error handling — erorile nepath-uite pot "dispărea" silențios dacă nu ai grijă.

**\`.catch()\` — prinde orice eroare din lanț:**
\`\`\`javascript
fetch("/api/data")
  .then(r => r.json())
  .then(data => processData(data)) // eroare de aici e prinsă de .catch
  .catch(error => {
    console.error("Eroare în lanț:", error.message);
    return null; // se poate returna valoare de fallback
  })
  .then(result => result ?? "default"); // funcționează și cu null
\`\`\`

**Erori specifice vs generale:**
\`\`\`javascript
async function fetchWithRetry(url, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(\`HTTP \${response.status}: \${response.statusText}\`);
      }
      return await response.json();
    } catch (err) {
      if (err.name === "AbortError") throw err; // nu retry la abort
      if (i === retries - 1) throw err; // ultima încercare — re-throw
      await new Promise(r => setTimeout(r, 1000 * (i + 1))); // backoff
    }
  }
}
\`\`\`

**Promise.allSettled — procesare chiar și cu erori:**
\`\`\`javascript
const results = await Promise.allSettled([
  fetchUser(1),
  fetchUser(2), // poate eșua
  fetchUser(3)
]);
results.forEach(result => {
  if (result.status === "fulfilled") console.log("✓", result.value);
  else console.log("✗", result.reason.message);
});
\`\`\`

**Unhandled rejection warning:**
\`\`\`javascript
// BAD — eroarea e pierdută
const p = Promise.reject(new Error("pierdut"));
// Good — mereu atașează .catch
Promise.reject(new Error("prins")).catch(console.error);
\`\`\`

**Regulă:** fiecare Promise chain trebuie să aibă \`.catch()\` sau să fie \`await\`-ată în \`try/catch\`.`,
  },
  {
    lesson: "31. Error Handling avansat",
    title: "Global error handlers",
    content: `Pentru a prinde erori care scapă din orice try/catch, JavaScript oferă event handlers globali — utili în producție pentru logging.

**În browser:**
\`\`\`javascript
// Erori sincrone neprins
window.addEventListener("error", (event) => {
  console.error("Eroare globală:", {
    message: event.message,
    filename: event.filename,
    line: event.lineno,
    col: event.colno,
    error: event.error
  });
  // Nu împiedici eroarea să ajungă la consolă — nu returna false
});

// Promise-uri neprins (unhandled rejection)
window.addEventListener("unhandledrejection", (event) => {
  console.error("Promise nehandled:", event.reason);
  event.preventDefault(); // opțional: suprimă warning-ul din consolă
  logToServer(event.reason); // trimite la monitoring
});
\`\`\`

**În Node.js:**
\`\`\`javascript
process.on("uncaughtException", (error) => {
  console.error("Eroare neprinsă:", error);
  // IMPORTANT: închide procesul după cleanup — starea e compromisă
  gracefulShutdown().finally(() => process.exit(1));
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Promise rejection nehandled:", reason);
  // Node.js 15+ termină procesul automat pentru unhandledRejection
});
\`\`\`

**Error monitoring în producție:**
\`\`\`javascript
// Trimitere la Sentry / LogRocket / serviciu propriu
function reportError(error, context = {}) {
  fetch("/api/errors", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      message: error.message,
      stack: error.stack,
      url: location.href,
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString(),
      ...context
    })
  }).catch(() => {}); // nu arunca eroare la raportarea erorii!
}
\`\`\``,
  },
  {
    lesson: "31. Error Handling avansat",
    title: "Error boundary pattern și retry",
    content: `**Error boundary** izolează erorile pentru a preveni căderea întregii aplicații. **Retry logic** încearcă din nou operațiunile care pot eșua temporar.

**Result pattern (alternativă la throw/catch):**
\`\`\`javascript
// Returnezi eroarea, nu o arunci — explicit, fără surprize
function safeParseJSON(str) {
  try {
    return { ok: true, value: JSON.parse(str) };
  } catch (e) {
    return { ok: false, error: e };
  }
}

const result = safeParseJSON(userInput);
if (!result.ok) {
  showError("JSON invalid: " + result.error.message);
} else {
  processData(result.value);
}
\`\`\`

**Retry cu exponential backoff:**
\`\`\`javascript
async function withRetry(operation, { retries = 3, baseDelay = 500 } = {}) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      const isLast = attempt === retries;
      const isRetryable = error.statusCode === 429 || error.statusCode >= 500;

      if (isLast || !isRetryable) throw error;

      const delay = baseDelay * Math.pow(2, attempt - 1); // 500, 1000, 2000
      console.warn(\`Încercare \${attempt} eșuată, retry în \${delay}ms\`);
      await new Promise(r => setTimeout(r, delay));
    }
  }
}

// Utilizare
const data = await withRetry(() => fetch("/api/unstable").then(r => r.json()));
\`\`\`

**Circuit breaker pattern:**
\`\`\`javascript
function createCircuitBreaker(fn, { threshold = 5, timeout = 30000 } = {}) {
  let failures = 0; let lastFailTime = 0;
  return async (...args) => {
    if (failures >= threshold && Date.now() - lastFailTime < timeout) {
      throw new Error("Circuit deschis — serviciu indisponibil");
    }
    try {
      const result = await fn(...args);
      failures = 0; // reset la succes
      return result;
    } catch (e) {
      failures++; lastFailTime = Date.now();
      throw e;
    }
  };
}
\`\`\``,
  },

  // L32: TypeScript
  {
    lesson: "32. TypeScript — Introducere și Basics",
    title: "Ce este TypeScript și de ce?",
    content: `**TypeScript** este JavaScript cu **tipuri statice** — un superset creat de Microsoft care adaugă adnotări de tip și verificare la compile-time, compilând în JavaScript pur.

**Problemele pe care le rezolvă:**
\`\`\`javascript
// JavaScript — eroare la runtime, greu de detectat
function addTax(price, rate) {
  return price + price * rate; // dacă price = "100" → "100100" ✗
}
addTax("100", 0.19); // "10019" — bug silențios!
\`\`\`
\`\`\`typescript
// TypeScript — eroare la compile-time
function addTax(price: number, rate: number): number {
  return price + price * rate;
}
addTax("100", 0.19); // ✗ Eroare: Argument of type 'string' is not assignable to 'number'
\`\`\`

**Avantaje:**
• **Autocompletion** mai bun în IDE — TypeScript știe ce proprietăți are un obiect.
• **Refactoring sigur** — rename un câmp și TypeScript găsește toate utilizările.
• **Documentație vie** — tipurile descriu contractul funcției.
• **Detectarea bug-urilor** înainte de runtime.

**Setup rapid:**
\`\`\`bash
npm install -D typescript
npx tsc --init  # generează tsconfig.json
# Sau cu ts-node pentru run direct:
npm install -D ts-node
npx ts-node src/index.ts
\`\`\`

**Fișier \`tsconfig.json\` minim:**
\`\`\`json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "strict": true,
    "outDir": "./dist",
    "rootDir": "./src"
  }
}
\`\`\`

• **\`strict: true\`** activează toate verificările stricte — recomandare pentru proiecte noi.
• TypeScript nu schimbă cum rulează codul — compilează la JS standard.
• Next.js, React, Node.js — toate suportă TypeScript nativ sau cu setup minim.`,
  },
  {
    lesson: "32. TypeScript — Introducere și Basics",
    title: "Tipuri de bază și type inference",
    content: `TypeScript are **tipuri primitive** și **tipuri compuse**, plus un sistem de **inferență** care deduce tipul din valoare — nu trebuie să adnotezi tot.

**Tipuri primitive:**
\`\`\`typescript
let name: string = "Ana";
let age: number = 25;
let active: boolean = true;
let nothing: null = null;
let undef: undefined = undefined;
let big: bigint = 100n;
let sym: symbol = Symbol("id");
\`\`\`

**Type inference — TypeScript deduce automat:**
\`\`\`typescript
let x = 42;        // TypeScript știe: x este number
let y = "hello";   // y este string
let arr = [1, 2];  // arr este number[]
x = "text"; // ✗ Eroare! x e number, nu string

// Funcții — tipul return se deduce
function double(n: number) { return n * 2; } // return: number dedus
\`\`\`

**Array-uri și Tuple-uri:**
\`\`\`typescript
const nums: number[] = [1, 2, 3];
const mixed: (string | number)[] = ["a", 1, "b", 2];
const pair: [string, number] = ["Ana", 25]; // tuple — ordine fixă
// pair[0] este string, pair[1] este number
\`\`\`

**Union types și literal types:**
\`\`\`typescript
let id: string | number; // poate fi ori string ori number
id = "abc123"; // ✓
id = 42;       // ✓
id = true;     // ✗

type Direction = "north" | "south" | "east" | "west"; // literal union
let dir: Direction = "north"; // ✓
dir = "up"; // ✗ Eroare

type Status = 200 | 201 | 400 | 404 | 500; // numeric literal
\`\`\`

**\`any\` și \`unknown\`:**
\`\`\`typescript
let a: any = "anything"; // dezactivează checking — evită!
let u: unknown = getData(); // valoare de tip necunoscut
if (typeof u === "string") u.toUpperCase(); // ✓ — type guard necesar
\`\`\``,
  },
  {
    lesson: "32. TypeScript — Introducere și Basics",
    title: "Interfaces și Types",
    content: `**Interface** și **Type alias** definesc forma obiectelor. Deși similare, au diferențe importante.

**Interface — pentru obiecte și clase:**
\`\`\`typescript
interface User {
  id: number;
  name: string;
  email: string;
  role?: "admin" | "user"; // ? = opțional
  readonly createdAt: Date; // readonly = nu modificabil după creare
}

const user: User = {
  id: 1, name: "Ana", email: "ana@test.com", createdAt: new Date()
};
user.name = "Maria"; // ✓
user.createdAt = new Date(); // ✗ Cannot assign to 'createdAt'
\`\`\`

**Extindere interface:**
\`\`\`typescript
interface AdminUser extends User {
  permissions: string[];
  department: string;
}
// AdminUser are toate câmpurile User + permissions + department
\`\`\`

**Type alias — mai flexibil:**
\`\`\`typescript
type Point = { x: number; y: number };
type ID = string | number; // union
type Callback = (error: Error | null, data?: unknown) => void; // funcție
type Pair<T> = [T, T]; // generic
\`\`\`

**Interface vs Type — diferențe cheie:**
\`\`\`typescript
// Interface poate fi "merged" (declaration merging)
interface Window { myProp: string; } // adaugi la Window global
interface Window { otherProp: number; } // OK — se fuzionează

// Type nu poate fi redeclarat
type Point = { x: number }; // ✓
type Point = { y: number }; // ✗ Identifier 'Point' has already been declared

// Ambele pot fi extinse
type Shape = Point & { color: string }; // intersection type
\`\`\`

**Funcții tipizate:**
\`\`\`typescript
interface Logger {
  (message: string, level?: "info" | "warn" | "error"): void;
}
const log: Logger = (msg, level = "info") => console.log(\`[\${level}] \${msg}\`);
\`\`\`

**Regulă generală:** folosește \`interface\` pentru obiecte/clase, \`type\` pentru unions, intersections și aliasuri de primitive.`,
  },
  {
    lesson: "32. TypeScript — Introducere și Basics",
    title: "Generics și utility types",
    content: `**Generics** permit scrierea de cod care funcționează cu orice tip, menținând siguranța tipurilor. **Utility types** sunt tipuri predefinite pentru transformări comune.

**Generics de bază:**
\`\`\`typescript
function identity<T>(value: T): T { return value; }
identity<string>("hello"); // T = string
identity(42); // T dedus automat = number

// Array generic
function first<T>(arr: T[]): T | undefined { return arr[0]; }
first([1, 2, 3]);     // number | undefined
first(["a", "b"]);    // string | undefined
\`\`\`

**Generics cu constrângeri:**
\`\`\`typescript
function getLength<T extends { length: number }>(item: T): number {
  return item.length; // sigur — T are garantat .length
}
getLength("hello"); // 5
getLength([1, 2, 3]); // 3
getLength(42); // ✗ — number nu are .length
\`\`\`

**Utility Types esențiale:**
\`\`\`typescript
interface User { id: number; name: string; email: string; role: string; }

Partial<User>    // toate câmpurile opționale — { id?: number; name?: string; ... }
Required<User>   // toate câmpurile obligatorii
Readonly<User>   // toate readonly

Pick<User, "id" | "name">   // { id: number; name: string }
Omit<User, "email" | "role"> // { id: number; name: string }

Record<string, number> // { [key: string]: number } — dicționar
ReturnType<typeof fetch> // tipul returnat de fetch
Parameters<typeof fn>   // parametrii funcției ca tuple
\`\`\`

\`\`\`typescript
// Exemplu practic: update partial
async function updateUser(id: number, data: Partial<Omit<User, "id">>) {
  return await db.user.update({ where: { id }, data });
}
updateUser(1, { name: "Ana" }); // ✓ — nu poți trimite id
updateUser(1, { id: 2 });       // ✗ — id e omis
\`\`\`

**Conditional types:**
\`\`\`typescript
type IsString<T> = T extends string ? "da" : "nu";
type A = IsString<string>; // "da"
type B = IsString<number>; // "nu"
\`\`\``,
  },

  // L33: Testing cu Jest
  {
    lesson: "33. Testing cu Jest — Basics",
    title: "De ce testăm și ce este Jest?",
    content: `**Testarea automată** verifică că codul funcționează corect — atât acum, cât și după modificări viitoare. **Jest** este framework-ul de testing cel mai popular pentru JavaScript/TypeScript.

**De ce să scriem teste:**
• **Siguranța la refactoring** — poți modifica codul cu încredere dacă testele trec.
• **Documentație vie** — testele arată cum e gândit să funcționeze codul.
• **Detectare regresii** — o funcție care a funcționat ieri nu se strică fără să știi.
• **Design mai bun** — codul greu de testat e de obicei și greu de folosit.

**Setup Jest:**
\`\`\`bash
npm install -D jest
# Pentru TypeScript:
npm install -D jest ts-jest @types/jest
\`\`\`

**\`package.json\`:**
\`\`\`json
{
  "scripts": { "test": "jest", "test:watch": "jest --watch" },
  "jest": { "preset": "ts-jest" }
}
\`\`\`

**Primul test:**
\`\`\`javascript
// math.js
function add(a, b) { return a + b; }
function multiply(a, b) { return a * b; }
module.exports = { add, multiply };

// math.test.js
const { add, multiply } = require("./math");

describe("Funcții matematice", () => {
  it("adunare — cazul standard", () => {
    expect(add(2, 3)).toBe(5);
  });
  it("adunare cu negative", () => {
    expect(add(-1, 1)).toBe(0);
  });
  it("înmulțire", () => {
    expect(multiply(3, 4)).toBe(12);
  });
});
\`\`\`

• **\`describe\`** — grupează teste înrudite.
• **\`it\` / \`test\`** — un test individual; \`it\` e alias pentru \`test\`.
• **\`expect(actual).matcher(expected)\`** — structura oricărei afirmații.
• Fișierele de test: \`*.test.js\`, \`*.spec.js\`, sau în directorul \`__tests__/\`.`,
  },
  {
    lesson: "33. Testing cu Jest — Basics",
    title: "Matchers — toBe, toEqual, toMatch etc.",
    content: `**Matchers** sunt funcțiile de comparație din Jest — verifică că valoarea actuală corespunde celei așteptate.

**Egalitate:**
\`\`\`javascript
expect(2 + 2).toBe(4);           // === (strict equality, primitives)
expect({ a: 1 }).toEqual({ a: 1 }); // deep equality (obiecte)
expect({ a: 1 }).toBe({ a: 1 });    // ✗ — referințe diferite!

expect(null).toBeNull();
expect(undefined).toBeUndefined();
expect("hello").toBeDefined();
\`\`\`

**Numere:**
\`\`\`javascript
expect(0.1 + 0.2).toBeCloseTo(0.3); // floating point!
expect(10).toBeGreaterThan(5);
expect(3).toBeLessThanOrEqual(3);
\`\`\`

**String-uri și array-uri:**
\`\`\`javascript
expect("Hello World").toContain("World");
expect("test123").toMatch(/\d+/);
expect("test123").toMatch("test");

expect([1, 2, 3]).toContain(2);
expect([1, 2, 3]).toHaveLength(3);
expect([{ id: 1 }, { id: 2 }]).toContainEqual({ id: 1 });
\`\`\`

**Erori:**
\`\`\`javascript
function divide(a, b) {
  if (b === 0) throw new Error("Împărțire la zero!");
  return a / b;
}
expect(() => divide(10, 0)).toThrow("Împărțire la zero!");
expect(() => divide(10, 0)).toThrow(Error);
\`\`\`

**Negare cu \`.not\`:**
\`\`\`javascript
expect(5).not.toBe(3);
expect([1, 2]).not.toContain(5);
expect(() => divide(10, 2)).not.toThrow();
\`\`\`

**Snapshot testing:**
\`\`\`javascript
// Prima rulare: crează snapshot
expect(renderComponent()).toMatchSnapshot();
// Rulări ulterioare: compară cu snapshot-ul salvat
// Util pentru componente UI
\`\`\`

**\`expect.any()\` și \`expect.objectContaining()\`:**
\`\`\`javascript
expect({ id: 1, name: "Ana", timestamp: Date.now() })
  .toMatchObject({ id: expect.any(Number), name: "Ana" });
\`\`\``,
  },
  {
    lesson: "33. Testing cu Jest — Basics",
    title: "Async testing și mocks",
    content: `Jest suportă testarea codului asincron și permite înlocuirea dependențelor externe cu **mock-uri** controlabile.

**Async testing — 3 moduri:**
\`\`\`javascript
// 1. async/await (recomandat)
it("fetchUser returnează user", async () => {
  const user = await fetchUser(1);
  expect(user.id).toBe(1);
  expect(user.name).toBeDefined();
});

// 2. Promise (alternativă)
it("fetchUser cu promise", () => {
  return fetchUser(1).then(user => expect(user.id).toBe(1));
  // IMPORTANT: returnezi promise-ul!
});

// 3. done callback (vechi stil)
it("fetchUser cu done", done => {
  fetchUser(1).then(user => { expect(user.id).toBe(1); done(); });
});
\`\`\`

**Mocking funcții cu \`jest.fn()\`:**
\`\`\`javascript
const mockCallback = jest.fn(x => x * 2);
[1, 2, 3].forEach(mockCallback);

expect(mockCallback).toHaveBeenCalledTimes(3);
expect(mockCallback).toHaveBeenCalledWith(2);
expect(mockCallback).toHaveReturnedWith(6);
expect(mockCallback.mock.calls).toEqual([[1], [2], [3]]);
\`\`\`

**Mocking module-uri:**
\`\`\`javascript
// Înlocuiești fetch cu mock
global.fetch = jest.fn().mockResolvedValue({
  ok: true,
  json: () => Promise.resolve({ id: 1, name: "Ana" })
});

it("fetchUser apelează URL-ul corect", async () => {
  await fetchUser(1);
  expect(fetch).toHaveBeenCalledWith("/api/users/1");
});

// Mock care eșuează
global.fetch = jest.fn().mockRejectedValue(new Error("Network error"));
await expect(fetchUser(1)).rejects.toThrow("Network error");
\`\`\`

**\`jest.spyOn\` — mock temporar pe metodă existentă:**
\`\`\`javascript
const spy = jest.spyOn(console, "log").mockImplementation(() => {});
myFunction(); // nu mai afișează în consolă
expect(spy).toHaveBeenCalledWith("mesaj așteptat");
spy.mockRestore(); // restabilește comportamentul original
\`\`\``,
  },
  {
    lesson: "33. Testing cu Jest — Basics",
    title: "Setup, teardown și coverage",
    content: `**Setup și teardown** pregătesc și curăță mediul de test. **Coverage** măsoară câtă parte din cod e acoperită de teste.

**Lifecycle hooks:**
\`\`\`javascript
describe("UserService", () => {
  let db;
  let service;

  beforeAll(async () => {
    db = await createTestDatabase(); // rulat o singură dată pentru grup
  });
  afterAll(async () => {
    await db.close(); // cleanup final
  });

  beforeEach(() => {
    service = new UserService(db); // instanță fresh pentru fiecare test
    jest.clearAllMocks(); // resetează toate mock-urile
  });
  afterEach(async () => {
    await db.users.deleteMany({}); // curăță date între teste
  });

  it("creează user", async () => {
    const user = await service.createUser({ name: "Ana", email: "ana@test.com" });
    expect(user.id).toBeDefined();
  });

  it("găsește user după id", async () => {
    // db e curat (afterEach) — test independent
    const created = await service.createUser({ name: "Ion", email: "ion@test.com" });
    const found = await service.findById(created.id);
    expect(found.name).toBe("Ion");
  });
});
\`\`\`

**Code coverage:**
\`\`\`bash
jest --coverage
# Sau în package.json:
# "jest": { "collectCoverage": true, "coverageThreshold": { "global": { "lines": 80 } } }
\`\`\`

**Raportul coverage arată:**
• **Statements**: câte instrucțiuni au fost executate
• **Branches**: câte ramuri (if/else) au fost parcurse
• **Functions**: câte funcții au fost apelate
• **Lines**: câte linii au fost executate

**\`it.skip\` și \`it.only\`:**
\`\`\`javascript
it.skip("test de sărit temporar", () => { /* ... */ });
it.only("rulează DOAR acesta", () => { /* ... */ });
describe.only("rulează DOAR grupul ăsta", () => { /* ... */ });
\`\`\`

**Bune practici:** fiecare test trebuie să fie independent (nu depinde de alt test), să ruleze rapid, și să testeze un singur comportament.`,
  },

  // L34: Performance și Patterns JS
  {
    lesson: "34. Performance și Patterns JS",
    title: "Debounce și Throttle",
    content: `**Debounce** și **Throttle** sunt tehnici de limitare a frecvenței apelurilor pentru funcții executate prea des (scroll, resize, input).

**Debounce** — execută funcția doar după ce evenimentul s-a oprit pentru X ms:
\`\`\`javascript
function debounce(fn, delay) {
  let timer;
  return function(...args) {
    clearTimeout(timer); // resetează timer la fiecare apel
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

// Căutare live — apelează API doar după 300ms de pauză la tastare
const searchInput = document.getElementById("search");
const search = debounce(async (query) => {
  const results = await fetch(\`/api/search?q=\${query}\`).then(r => r.json());
  displayResults(results);
}, 300);
searchInput.addEventListener("input", e => search(e.target.value));
// Dacă utilizatorul tastează "React" rapid → un singur apel API
\`\`\`

**Throttle** — execută funcția maxim o dată la X ms, indiferent de cât de rapid e apelată:
\`\`\`javascript
function throttle(fn, limit) {
  let lastRun = 0;
  return function(...args) {
    const now = Date.now();
    if (now - lastRun >= limit) {
      lastRun = now;
      return fn.apply(this, args);
    }
  };
}

// Scroll — actualizare poziție maxim de 10 ori pe secundă
const onScroll = throttle(() => {
  const scrolled = window.scrollY;
  updateNavbar(scrolled);
}, 100);
window.addEventListener("scroll", onScroll);
\`\`\`

**Diferența cheie:**
• **Debounce** — "Execută DUPĂ ce se oprește" → ideal pentru search, validare form, resize final.
• **Throttle** — "Execută MAXIM o dată pe perioadă" → ideal pentru scroll, mouse move, rate limiting.

**Lodash** are implementări robuste: \`_.debounce(fn, 300)\` și \`_.throttle(fn, 100)\` — includ opțiuni avansate (leading/trailing edge, cancel, flush).`,
  },
  {
    lesson: "34. Performance și Patterns JS",
    title: "Design Patterns — Observer și Module",
    content: `**Design patterns** sunt soluții reutilizabile la probleme comune în proiectare software. JavaScript folosește frecvent Observer și Module.

**Observer Pattern** — obiectele se pot abona la eventi și reacționează la schimbări:
\`\`\`javascript
class EventEmitter {
  #listeners = new Map();

  on(event, listener) {
    if (!this.#listeners.has(event)) this.#listeners.set(event, []);
    this.#listeners.get(event).push(listener);
    return () => this.off(event, listener); // returnează unsubscribe
  }

  off(event, listener) {
    const list = this.#listeners.get(event) || [];
    this.#listeners.set(event, list.filter(l => l !== listener));
  }

  emit(event, ...args) {
    (this.#listeners.get(event) || []).forEach(fn => fn(...args));
  }
}

const store = new EventEmitter();
const unsubscribe = store.on("update", data => console.log("Nou:", data));
store.emit("update", { user: "Ana" }); // Nou: { user: "Ana" }
unsubscribe(); // dezabonare
store.emit("update", {}); // nimic — s-a dezabonat
\`\`\`

**Module Pattern** — encapsulare cu API public explicit (pre-ES modules):
\`\`\`javascript
const CartModule = (function() {
  let _items = []; // privat

  return {
    add(item) { _items.push(item); },
    remove(id) { _items = _items.filter(i => i.id !== id); },
    getTotal() { return _items.reduce((s, i) => s + i.price, 0); },
    getCount() { return _items.length; }
  };
})(); // IIFE — executat imediat

CartModule.add({ id: 1, price: 50 });
CartModule.add({ id: 2, price: 30 });
console.log(CartModule.getTotal()); // 80
console.log(CartModule._items); // undefined — privat!
\`\`\`

**Astăzi:** ES Modules (\`import/export\`) înlocuiesc Module Pattern pentru encapsulare. Observer pattern e baza pentru \`EventEmitter\` în Node.js, \`addEventListener\` în browser, și reactive frameworks (RxJS).`,
  },
  {
    lesson: "34. Performance și Patterns JS",
    title: "Lazy loading și Code splitting",
    content: `**Lazy loading** amână încărcarea resurselor până sunt necesare. **Code splitting** împarte bundle-ul în bucăți mai mici care se încarcă la nevoie.

**Dynamic import — code splitting manual:**
\`\`\`javascript
// Înainte: totul se încarcă la start (lent)
import { heavyChartLibrary } from "./charts"; // 500KB

// Lazy: se încarcă doar când e nevoie
async function showChart() {
  const { renderChart } = await import("./charts"); // 500KB se încarcă acum
  renderChart(document.getElementById("chart"), data);
}
button.addEventListener("click", showChart);
\`\`\`

**Lazy loading rute (React):**
\`\`\`javascript
import { lazy, Suspense } from "react";
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Settings = lazy(() => import("./pages/Settings"));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/settings" component={Settings} />
    </Suspense>
  );
}
// Dashboard.js se descarcă doar când utilizatorul navighează la /dashboard
\`\`\`

**Lazy loading imagini cu IntersectionObserver:**
\`\`\`javascript
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src; // încarc imaginea abia acum
      observer.unobserve(img); // nu mai urmăresc
    }
  });
}, { rootMargin: "200px" }); // preîncarcă cu 200px înainte

document.querySelectorAll("img[data-src]").forEach(img => observer.observe(img));
\`\`\`

**Preloading pentru resurse critice (HTML head):**
\`\`\`html
<link rel="preload" href="/fonts/main.woff2" as="font" crossorigin>
<link rel="prefetch" href="/pages/dashboard.js">
\`\`\`

**Impactul asupra performanței:**
• Bundle inițial mai mic → First Contentful Paint mai rapid
• Resursele inutile nu se descarcă deloc (60%+ utilizatori nu vizitează tot site-ul)
• Critical path conține doar ce e necesar pentru pagina curentă`,
  },
  {
    lesson: "34. Performance și Patterns JS",
    title: "Web Workers — multithreading",
    content: `**Web Workers** execută JavaScript pe thread-uri separate, fără a bloca UI-ul principal. Ideal pentru calcule grele sau procesare de date voluminoase.

**Fără Web Worker — UI înghețat:**
\`\`\`javascript
button.addEventListener("click", () => {
  const result = heavyCalculation(10_000_000); // blochează 3 secunde
  display.textContent = result; // UI-ul nu răspunde timp de 3 secunde
});
\`\`\`

**Cu Web Worker:**
\`\`\`javascript
// worker.js — fișier separat
self.addEventListener("message", (e) => {
  const { data, type } = e.data;
  if (type === "calculate") {
    const result = heavyCalculation(data); // pe thread separat
    self.postMessage({ type: "result", result });
  }
});

// main.js — thread principal
const worker = new Worker("/worker.js");
worker.postMessage({ type: "calculate", data: 10_000_000 });
worker.addEventListener("message", (e) => {
  display.textContent = e.data.result; // UI actualizat fără freeze
});
button.addEventListener("click", () => {
  worker.postMessage({ type: "calculate", data: 10_000_000 });
});
\`\`\`

**Limitări Web Workers:**
• **Nu au acces la DOM** — nu pot modifica elementele paginii
• Comunicare prin **mesaje** (\`postMessage\`) — serialize/deserialize overhead
• Pot folosi: \`fetch\`, \`indexedDB\`, \`WebSockets\`, \`importScripts()\`

**Transferable Objects — transfer fără copiere:**
\`\`\`javascript
// Copierea unui ArrayBuffer de 1GB ar dura secunde
const buffer = new ArrayBuffer(1024 * 1024 * 1024);
// Transfer instant — transferi ownership, nu copiezi
worker.postMessage({ buffer }, [buffer]); // al doilea arg = transferable
// buffer nu mai e utilizabil în thread-ul principal după transfer
\`\`\`

**Cazuri de utilizare:** sortare/filtrare seturi mari de date, parsare fișiere JSON/CSV mari, calcule criptografice, procesare imagini/video, simulări fizice.`,
  },
];

async function main() {
  let updated = 0;
  let notFound = 0;
  for (const item of UPDATES) {
    const lessons = await p.lesson.findMany({
      where: { title: item.lesson, module: { slug: "javascript" } },
    });
    if (!lessons.length) {
      console.log(`  ! Lectie negăsita: "${item.lesson}"`);
      notFound++;
      continue;
    }
    const theory = await p.theory.findFirst({
      where: { title: item.title, lessonId: { in: lessons.map((l) => l.id) } },
    });
    if (!theory) {
      console.log(`  ! Teorie negăsita: "${item.title}" in "${item.lesson}"`);
      notFound++;
      continue;
    }
    await p.theory.update({
      where: { id: theory.id },
      data: { content: item.content },
    });
    console.log(
      `  ✓ ${item.lesson.split(".")[0]}. ${item.lesson.split(". ")[1]} / "${item.title}": ${theory.content.length} → ${item.content.length} chars`
    );
    updated++;
  }
  console.log(`\nDone: ${updated} updated, ${notFound} not found`);
  await p.$disconnect();
}

main().catch((e) => { console.error(e); p.$disconnect(); process.exit(1); });
