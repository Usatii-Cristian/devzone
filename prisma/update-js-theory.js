"use strict";
require("dotenv").config({ path: ".env" });
const { PrismaClient } = require("@prisma/client");
const p = new PrismaClient();

// Enhanced theory content for JavaScript lessons 2-15
// Written manually to Python quality standard
const UPDATES = [

  // ─── LECȚIA 2: Variabile ───────────────────────────────────────────────────
  {
    lesson: "2. Variabile: let, const, var",
    title: "let — variabila modernă",
    content: `**let** declară o variabilă cu **block scope** — există doar în interiorul blocului \`{}\` în care a fost declarată. Este alegerea implicită în JavaScript modern.

\`\`\`javascript
let varsta = 25;
varsta = 26; // OK — poate fi reasignată

if (true) {
  let mesaj = "Salut!";
  console.log(mesaj); // "Salut!"
}
// console.log(mesaj); // ReferenceError — mesaj nu există în afara blocului
\`\`\`

• **Block scope**: variabila trăiește doar între \`{}\` în care e declarată
• **Reasignabilă**: poți schimba valoarea oricând cu \`=\`
• **Nu re-declarabilă**: \`let x = 1; let x = 2;\` dă SyntaxError în același scope
• **Temporal Dead Zone**: nu poți folosi variabila înainte de linia declarării

Analogie: \`let\` e ca o tablă dintr-o sală de clasă — există și poate fi ștearsă/rescrisă, dar dispare când ieși din acea sală.`,
  },
  {
    lesson: "2. Variabile: let, const, var",
    title: "var — cel vechi (de evitat)",
    content: `**var** este declarația veche de variabile, cu comportament surprinzător față de \`let\`: are **function scope** (nu block scope) și este **hoistată** la vârful funcției cu valoarea \`undefined\`.

\`\`\`javascript
function demo() {
  console.log(x); // undefined — hoistat, dar neinițializat
  var x = 10;
  console.log(x); // 10
}

if (true) {
  var scapaDinBloc = "vizibil afară!";
}
console.log(scapaDinBloc); // "vizibil afară!" — surpriză neplăcută
\`\`\`

• **Function scope**: vizibil în toată funcția, ignoră blocurile \`{}\`
• **Hoisting complet**: declarat la vârful funcției, inițializat cu \`undefined\`
• **Re-declarabil**: \`var x = 1; var x = 2;\` nu dă eroare — sursă de bug-uri
• **De evitat** în codul modern

**Regula de aur**: folosește \`const\` implicit, \`let\` când reasignezi, **niciodată** \`var\`.`,
  },
  {
    lesson: "2. Variabile: let, const, var",
    title: "Reguli de denumire + camelCase",
    content: `Numele variabilelor în JavaScript trebuie să înceapă cu literă, \`_\` sau \`$\` — **niciodată** cu cifră. Convențiile de scriere sunt la fel de importante ca regulile sintactice.

\`\`\`javascript
// ✓ Valide
let numeUtilizator = "Ana";    // camelCase — standard JS
let _valoarePrivata = 42;      // underscore prefix
let $elementDOM = document.querySelector("div");

// ✗ Invalide
// let 1variabila = "eroare";   // SyntaxError
// let for = "eroare";          // cuvânt rezervat

// Convențiile contează:
const MAX_VALOARE = 100;        // SCREAMING_SNAKE_CASE → constante globale
class NumeClasa {}              // PascalCase → clase
\`\`\`

• **camelCase**: prima literă mică, fiecare cuvânt următor cu majusculă — \`numeVariabila\`
• **PascalCase**: fiecare cuvânt cu majusculă — pentru clase și constructori
• **SCREAMING_SNAKE_CASE**: toate majuscule cu \`_\` — pentru constante globale fixe
• **Descriptiv**: \`numarStudenti\` e mai bun decât \`n\` sau \`x\`
• **Sensibil la majuscule**: \`varsta\` și \`Varsta\` sunt variabile diferite`,
  },

  // ─── LECȚIA 3: Tipuri de date ──────────────────────────────────────────────
  {
    lesson: "3. Tipuri de date + typeof",
    title: "Tipuri primitive",
    content: `JavaScript are **7 tipuri primitive** — valori imutabile stocate direct, nu ca referințe. Acestea sunt blocurile fundamentale cu care lucrezi în orice program.

\`\`\`javascript
let numar    = 42;           // Number — întregi și zecimale
let text     = "Salut";      // String — secvențe de caractere
let activ    = true;         // Boolean — true sau false
let nimic    = null;         // Null — absență intenționată de valoare
let neclar   = undefined;    // Undefined — valoare nedeclarată/neatribuită
let id       = Symbol("id"); // Symbol — valoare unică garantată
let mare     = 9007199254740993n; // BigInt — numere foarte mari
\`\`\`

• **Number**: include și \`Infinity\`, \`-Infinity\`, \`NaN\` (Not a Number)
• **String**: poate fi cu \`""\`, \`''\` sau \`\`\`\`\`\` (backtick pentru template literals)
• **Boolean**: rezultatul oricărei comparații (\`5 > 3\` → \`true\`)
• **null vs undefined**: \`null\` = absent intenționat, \`undefined\` = nesetat
• **Imutabile**: \`"text".toUpperCase()\` returnează un string nou, nu modifică originalul`,
  },
  {
    lesson: "3. Tipuri de date + typeof",
    title: "Operatorul typeof",
    content: `**typeof** returnează un string cu tipul valorii — util pentru verificări dinamice de tip, deoarece JavaScript este un limbaj **dinamic** (variabilele pot schimba tipul).

\`\`\`javascript
console.log(typeof 42);          // "number"
console.log(typeof "Salut");     // "string"
console.log(typeof true);        // "boolean"
console.log(typeof undefined);   // "undefined"
console.log(typeof Symbol());    // "symbol"
console.log(typeof function(){}); // "function"

// Atenție — ciudățenii istorice:
console.log(typeof null);        // "object" — bug celebru din 1995!
console.log(typeof []);          // "object" — array-urile sunt obiecte
console.log(typeof {});          // "object"
\`\`\`

• **Sintaxă**: \`typeof valoare\` sau \`typeof(valoare)\` — ambele funcționează
• **Returnează string**: rezultatul e întotdeauna un string (\`"number"\`, \`"string"\` etc.)
• **\`typeof null === "object"\`**: bug cunoscut, păstrat pentru compatibilitate
• **Verificare array**: folosește \`Array.isArray(x)\` în loc de \`typeof\`
• **Util la granițe**: verifici tipul parametrilor în funcții sau datele de la API`,
  },
  {
    lesson: "3. Tipuri de date + typeof",
    title: "null vs undefined",
    content: `**null** și **undefined** par similare — ambele înseamnă „lipsă de valoare" — dar au semantici diferite care contează în practică.

\`\`\`javascript
let a = undefined;  // JS atribuie automat când nu inițializezi
let b = null;       // TU atribui intenționat ca să spui "gol"

function gaseste(id) {
  if (id === 1) return { name: "Ana" };
  return null; // nu am găsit nimic — null, nu undefined
}

let user = gaseste(99);
console.log(user);          // null
console.log(user?.name);    // undefined (optional chaining)

// Egalitate:
console.log(null == undefined);  // true — "lax"
console.log(null === undefined); // false — tip diferit!
\`\`\`

• **undefined**: variabilă declarată dar neatribuită, parametru lipsă, proprietate inexistentă
• **null**: absență **intenționată** — tu o setezi explicit
• **\`== undefined\`**: verifică și null și undefined (egalitate laxă)
• **\`=== null\`**: verifică strict doar null
• **Best practice**: inițializează cu \`null\` dacă urmează să ai o valoare, cu \`undefined\` lași JS-ul`,
  },
  {
    lesson: "3. Tipuri de date + typeof",
    title: "Conversii automate (Type Coercion)",
    content: `**Type coercion** înseamnă că JavaScript convertește automat tipurile în operații mixte — comportament puternic dar sursă frecventă de bug-uri neașteptate.

\`\`\`javascript
// Coercion cu +
console.log("5" + 3);    // "53" — 3 devine string!
console.log("5" - 3);    // 2 — string devine number
console.log(true + 1);   // 2 — true devine 1
console.log(false + "x"); // "falsex"

// == face coercion, === nu
console.log(0 == false);  // true
console.log(0 === false); // false — strict, fără conversie
console.log("" == false); // true
console.log("1" == 1);    // true
console.log("1" === 1);   // false
\`\`\`

• **\`+\` cu string**: orice + string → concatenare (string câștigă)
• **Operatori aritmetici** (\`-\`, \`*\`, \`/\`): convertesc la Number
• **Falsy values**: \`0\`, \`""\`, \`null\`, \`undefined\`, \`NaN\`, \`false\` → false în boolean
• **Folosește \`===\`** (strict) în loc de \`==\` pentru a evita surprizele
• **Explicit**: \`Number("5")\`, \`String(42)\`, \`Boolean(0)\` — conversii controlate`,
  },

  // ─── LECȚIA 4: Strings ────────────────────────────────────────────────────
  {
    lesson: "4. Șiruri de caractere (Strings)",
    title: "Definire și template literals",
    content: `**String-urile** pot fi scrise cu ghilimele simple, duble sau backtick-uri. **Template literals** (backtick) sunt cele mai puternice — permit interpolare și strings multi-linie.

\`\`\`javascript
const nume = "Ana";
const varsta = 25;

// Moduri de definire — echivalente pentru simplu
const s1 = "Salut";
const s2 = 'Salut';

// Template literal — interpolare cu \${expresie}
const mesaj = \`Bună ziua, \${nume}! Ai \${varsta} ani.\`;
console.log(mesaj); // "Bună ziua, Ana! Ai 25 ani."

// Multi-linie — fără \\n manual
const html = \`
  <div>
    <h1>\${nume}</h1>
  </div>
\`;
\`\`\`

• **Backtick \`\`**: template literals — suportă \`\${...}\` și newline direct
• **Interpolare**: orice expresie JavaScript merge în \`\${}\` — calcule, funcții, ternare
• **Escape**: \`\\n\` (newline), \`\\t\` (tab), \`\\\\\` (backslash), \`\\'\` (ghilimea)
• **Imutabile**: operațiile pe string returnează un string nou, nu modifică originalul
• **Preferă template literals** când combini variabile cu text`,
  },
  {
    lesson: "4. Șiruri de caractere (Strings)",
    title: "Proprietăți și metode esențiale",
    content: `String-urile au proprietăți și metode built-in esențiale. **\`length\`** este proprietatea cea mai folosită, iar metodele nu modifică string-ul original — returnează unul nou.

\`\`\`javascript
const str = "JavaScript este super!";

console.log(str.length);          // 22
console.log(str.toUpperCase());   // "JAVASCRIPT ESTE SUPER!"
console.log(str.toLowerCase());   // "javascript este super!"
console.log(str.includes("este")); // true
console.log(str.startsWith("Java")); // true
console.log(str.endsWith("!"));   // true
console.log(str.indexOf("este")); // 11 — prima apariție, sau -1
console.log(str.repeat(2));       // "JavaScript...JavaScript..."
console.log(str.padStart(25, "*")); // "***JavaScript este super!"
\`\`\`

• **\`length\`**: numărul de caractere (proprietate, nu metodă — fără \`()\`)
• **\`includes()\`**: verifică dacă există un substring — returnează boolean
• **\`indexOf()\`**: prima poziție a unui substring, \`-1\` dacă nu există
• **\`toUpperCase()\` / \`toLowerCase()\`**: conversie majuscule/minuscule
• **\`padStart()\` / \`padEnd()\`**: completează cu caractere până la o lungime
• **Toate returnează valori noi** — stringurile sunt imutabile`,
  },
  {
    lesson: "4. Șiruri de caractere (Strings)",
    title: "slice() — extragere subsir",
    content: `**\`slice(start, end)\`** extrage o porțiune dintr-un string fără a-l modifica. Este cea mai versatilă metodă de extragere — acceptă și indici negativi.

\`\`\`javascript
const str = "JavaScript";
//           0123456789

console.log(str.slice(0, 4));   // "Java" — de la 0, fără a include 4
console.log(str.slice(4));      // "Script" — de la 4 până la final
console.log(str.slice(-6));     // "Script" — ultimele 6 caractere
console.log(str.slice(0, -6));  // "Java" — fără ultimele 6
console.log(str.slice(4, 7));   // "Scr"

// Aplicație practică:
const email = "ana@example.com";
const domeniu = email.slice(email.indexOf("@") + 1); // "example.com"
\`\`\`

• **\`slice(start)\`**: de la \`start\` până la final
• **\`slice(start, end)\`**: de la \`start\` până la \`end\` (exclusiv)
• **Indici negativi**: \`-1\` = ultimul caracter, \`-n\` = ultimele n caractere
• **Nu modifică originalul**: returnează un string nou
• **\`substring()\`** vs **\`slice()\`**: \`slice\` e mai flexibil — preferă-l`,
  },
  {
    lesson: "4. Șiruri de caractere (Strings)",
    title: "split(), trim(), replace()",
    content: `Trei metode esențiale pentru procesarea textului: **\`split()\`** transformă string în array, **\`trim()\`** curăță spațiile, **\`replace()\`** substituie conținut.

\`\`\`javascript
// split() — string → array
const csv = "Ana,Ion,Maria,Petre";
const persoane = csv.split(","); // ["Ana", "Ion", "Maria", "Petre"]
const litere = "abc".split("");  // ["a", "b", "c"]

// trim() și variantele
const spatios = "  Salut!  ";
console.log(spatios.trim());       // "Salut!" — curăță ambele capete
console.log(spatios.trimStart());  // "Salut!  " — doar stânga
console.log(spatios.trimEnd());    // "  Salut!" — doar dreapta

// replace() și replaceAll()
const text = "Pisica e pisica";
console.log(text.replace("pisica", "câinele"));    // "Pisica e câinele" — prima
console.log(text.replaceAll("pisica", "câinele")); // ambele — dar case-sensitive!
console.log(text.replace(/pisica/gi, "câinele"));  // cu regex, case-insensitive
\`\`\`

• **\`split(sep)\`**: împarte la separator — inversul lui \`join()\` de la array
• **\`trim()\`**: indispensabil pentru input de la utilizator
• **\`replace()\`**: înlocuiește prima apariție; **\`replaceAll()\`** — toate
• **Cu regex**: \`replace(/pattern/g, ...)\` pentru înlocuiri avansate`,
  },

  // ─── LECȚIA 5: Operatori ──────────────────────────────────────────────────
  {
    lesson: "5. Operatori",
    title: "Operatori aritmetici",
    content: `**Operatorii aritmetici** execută calcule matematice. Dincolo de cei clasici (\`+\`, \`-\`, \`*\`, \`/\`), JavaScript are câteva specificități importante de știut.

\`\`\`javascript
console.log(10 + 3);   // 13
console.log(10 - 3);   // 7
console.log(10 * 3);   // 30
console.log(10 / 3);   // 3.3333...  — împărțire reală, nu întreagă!
console.log(10 % 3);   // 1 — restul împărțirii (modulo)
console.log(10 ** 3);  // 1000 — ridicare la putere (ES2016)

// Incrementare / decrementare
let x = 5;
console.log(x++); // 5 — returnează, apoi incrementează
console.log(x);   // 6
console.log(++x); // 7 — incrementează, apoi returnează

// Specificitate JS
console.log(0.1 + 0.2);  // 0.30000000000000004 — floating point!
console.log(Math.round((0.1 + 0.2) * 10) / 10); // 0.3 — fix
\`\`\`

• **\`%\` (modulo)**: testează paritate (\`n % 2 === 0\`), ciclicitate (index circular)
• **\`**\`**: mai clar decât \`Math.pow(x, n)\`
• **\`++\` / \`--\`**: prefix (\`++x\`) incrementează înainte, postfix (\`x++\`) după
• **Floating point**: evită comparații directe cu zecimale — folosește \`Math.round\``,
  },
  {
    lesson: "5. Operatori",
    title: "== vs === (egalitate laxă vs strictă)",
    content: `**\`===\`** (strict) verifică **și valoarea și tipul** — nicio conversie automată. **\`==\`** (lax) face **type coercion** înainte de comparație, ducând adesea la rezultate neintuitive.

\`\`\`javascript
// == face coercion — evită!
console.log(0 == false);   // true — false devine 0
console.log("" == false);  // true — ambele devin 0
console.log(null == undefined); // true — excepție specială
console.log("1" == 1);     // true — string devine number

// === strict — ce vrei de obicei
console.log(0 === false);  // false — tipuri diferite
console.log("1" === 1);    // false — tipuri diferite
console.log(null === undefined); // false
console.log(1 === 1);      // true — valoare + tip identice
\`\`\`

• **Regula**: folosește **întotdeauna \`===\`** dacă nu ai un motiv explicit pentru \`==\`
• **Excepție legitimă**: \`x == null\` verifică atât \`null\` cât și \`undefined\` dintr-o dată
• **NaN special**: \`NaN === NaN\` este \`false\`! Folosește \`Number.isNaN(x)\`
• **\`!==\`** vs **\`!=\`**: la fel — preferă \`!==\` (strict) pentru negare`,
  },
  {
    lesson: "5. Operatori",
    title: "Operatori logici și short-circuit",
    content: `**\`&&\`** (AND), **\`||\`** (OR) și **\`!\`** (NOT) evaluează expresii booleene. Crucial: **\`&&\`** și **\`||\`** nu returnează neapărat \`true\`/\`false\` — returnează una din cele două valori (short-circuit evaluation).

\`\`\`javascript
// || returnează primul truthy, sau ultimul
console.log("Ana" || "Ion");    // "Ana" — "Ana" e truthy
console.log("" || "Ion");       // "Ion" — "" e falsy, merge la dreapta
console.log(null || undefined); // undefined — ambele falsy

// && returnează primul falsy, sau ultimul
console.log("Ana" && "Ion");    // "Ion" — merge până la capăt
console.log(0 && "Ion");        // 0 — 0 e falsy, se oprește

// Aplicații practice
const user = null;
const nume = user?.name || "Anonim";  // valoare implicită cu ||
const afisare = user && user.name;    // guard cu &&

// ?? (nullish coalescing) — doar null/undefined, nu toate falsy
console.log(0 ?? "default");    // 0 — 0 NU e null/undefined
console.log(null ?? "default"); // "default"
\`\`\`

• **Short-circuit**: \`&&\` se oprește la primul \`false\`, \`||\` la primul \`true\`
• **\`||\` pentru default**: \`const val = input || "implicit"\`
• **\`&&\` ca guard**: \`user && doSomething(user)\` — rulează doar dacă user există
• **\`??\` (nullish)**: mai precis decât \`||\` când \`0\` sau \`""\` sunt valori valide`,
  },
  {
    lesson: "5. Operatori",
    title: "Ternar + assignment shorthand",
    content: `**Operatorul ternar** (\`condiție ? val1 : val2\`) este o expresie if/else compactă. **Assignment shorthand** (\`+=\`, \`-=\` etc.) reduce repetițiile în actualizarea variabilelor.

\`\`\`javascript
// Ternar — if/else compact pe o linie
const varsta = 20;
const status = varsta >= 18 ? "adult" : "minor";
console.log(status); // "adult"

// Util în template literals
const greating = \`Bună \${varsta >= 18 ? "ziua" : "dimineața"}!\`;

// Assignment shorthand
let x = 10;
x += 5;   // x = x + 5 → 15
x -= 3;   // x = x - 3 → 12
x *= 2;   // x = x * 2 → 24
x /= 4;   // x = x / 4 → 6
x **= 2;  // x = x ** 2 → 36
x %= 7;   // x = x % 7 → 1

// Logical assignment (ES2021)
let a = null;
a ??= "default"; // a = a ?? "default" → "default"
let b = "";
b ||= "fallback"; // b = b || "fallback" → "fallback"
\`\`\`

• **Ternar anidabil** (cu moderație): \`a ? b : c ? d : e\` — greu de citit
• **Nu forța ternarul** când ai efecte secundare — if/else e mai clar
• **\`+=\` cu strings**: \`str += " suffix"\` — concatenare
• **\`??=\` / \`||=\` / \`&&=\`**: assignment logici moderni, foarte utili`,
  },

  // ─── LECȚIA 6: Condiții ───────────────────────────────────────────────────
  {
    lesson: "6. Condiții: if / else",
    title: "if / else if / else",
    content: `Instrucțiunile **if / else if / else** controlează fluxul programului pe baza condițiilor. Pot fi înlănțuite pentru oricâte ramuri de decizie — dar se execută **prima condiție adevărată**.

\`\`\`javascript
const nota = 7.5;

if (nota >= 9) {
  console.log("Excelent!");
} else if (nota >= 7) {
  console.log("Bine");    // ← se execută aceasta
} else if (nota >= 5) {
  console.log("Suficient");
} else {
  console.log("Insuficient");
}

// Fără acolade — funcționează, dar evită în practică
if (nota >= 5) console.log("Trecut");
else console.log("Picat");

// Condition guard — early return
function proceseaza(user) {
  if (!user) return; // ieși devreme din funcție
  if (!user.activ) return;
  // procesare normală...
}
\`\`\`

• **Ordinea contează**: condițiile sunt evaluate de sus în jos — prima care e \`true\` câștigă
• **\`else\`** e opțional: dacă nu ai un caz implicit, poți omite
• **Guard clauses**: returnare devreme \`if (!x) return;\` reduce adâncimea de indentare
• **Condiții complexe**: \`&&\`, \`||\`, \`!\` permit combinarea mai multor verificări`,
  },
  {
    lesson: "6. Condiții: if / else",
    title: "Valori truthy și falsy",
    content: `În JavaScript, orice valoare poate fi evaluată ca \`true\` sau \`false\` într-un context boolean. **Falsy** = cele 8 valori care se comportă ca \`false\`; **truthy** = tot restul.

\`\`\`javascript
// Cele 8 valori FALSY
if (false)     {} // falsy
if (0)         {} // falsy
if (-0)        {} // falsy
if (0n)        {} // falsy — BigInt zero
if ("")        {} // falsy — string gol
if (null)      {} // falsy
if (undefined) {} // falsy
if (NaN)       {} // falsy

// Tot restul e TRUTHY — inclusiv surprize:
if ("0")    console.log("truthy!"); // "0" e truthy — nu e string gol!
if ([])     console.log("truthy!"); // array gol e truthy!
if ({})     console.log("truthy!"); // obiect gol e truthy!
if (-1)     console.log("truthy!"); // numere nenule sunt truthy
\`\`\`

• **Array gol \`[]\` e truthy** — greșeală frecventă; verifică \`[].length === 0\`
• **String \`"0"\` e truthy** — nu e string gol!
• **Practică**: \`if (lista.length)\` verifică dacă lista are elemente
• **Conversie explicită**: \`Boolean(valoare)\` sau \`!!valoare\` — dublu negat
• **Operatorul \`!\`**: inversează truthiness — \`!null\` → \`true\``,
  },
  {
    lesson: "6. Condiții: if / else",
    title: "Operatorul ternar",
    content: `**Operatorul ternar** (\`condiție ? expresieDaca_true : expresieDaca_false\`) este singura construcție cu **3 operanzi** din JavaScript — o expresie, nu o instrucțiune, deci returnează o valoare.

\`\`\`javascript
const temperatura = 35;

// Ternar simplu
const vreme = temperatura > 30 ? "cald" : "răcoros";
console.log(vreme); // "cald"

// În JSX / template literals
const buton = \`<button class="\${activ ? 'activ' : 'inactiv'}">\${label}</button>\`;

// Util pentru valori implicite
function salut(nume) {
  const afisNume = nume ? nume : "Anonim";
  // sau mai scurt:
  const afisNume2 = nume || "Anonim";
  return \`Bună, \${afisNume2}!\`;
}

// Ternar anidabil — cu moderație!
const mesaj = nota >= 9 ? "A"
            : nota >= 7 ? "B"
            : nota >= 5 ? "C"
            : "F";
\`\`\`

• **Este o expresie** — poate fi folosit oriunde e așteptată o valoare
• **Nu pentru efecte secundare** — dacă execuți funcții, folosește if/else
• **Ternare anidabile**: acceptabile maxim 2 niveluri — după aceea, switch sau if/else
• **Alternativă**: \`||/||\` pentru default, \`&&\` pentru render condițional`,
  },
  {
    lesson: "6. Condiții: if / else",
    title: "switch / case",
    content: `**switch** compară o valoare cu **case**-uri multiple folosind \`===\` strict. E mai lizibil decât lanțuri lungi de \`else if\` când compari aceeași variabilă cu valori fixe.

\`\`\`javascript
const ziua = "luni";

switch (ziua) {
  case "luni":
  case "marți":
  case "miercuri":
  case "joi":
  case "vineri":
    console.log("Zi lucrătoare");
    break;            // ← OBLIGATORIU ca să nu „cadă" în case următor
  case "sâmbătă":
  case "duminică":
    console.log("Weekend!");
    break;
  default:            // ← opțional, prinde orice altceva
    console.log("Zi necunoscută");
}
\`\`\`

• **\`break\` e obligatoriu** — fără el execuția „cade" în case-ul următor (fall-through)
• **Fall-through intenționat**: poți grupa case-uri fără break (ca mai sus pentru zile)
• **\`default\`**: echivalentul lui \`else\` — executat dacă niciun case nu se potrivește
• **Compară cu \`===\`**: tipul contează — \`case 1\` nu prinde \`"1"\`
• **Alternativă modernă**: object map \`{ "luni": fn1, "marți": fn2 }[ziua]\` pentru dispatch`,
  },

  // ─── LECȚIA 7: Bucle for ──────────────────────────────────────────────────
  {
    lesson: "7. Bucle: for",
    title: "for clasic",
    content: `**for clasic** este cel mai controlabil tip de buclă — știi exact de câte ori rulează și ai acces la index. Structura are 3 componente: **inițializare**, **condiție**, **increment**.

\`\`\`javascript
// Structura: for (inițializare; condiție; increment)
for (let i = 0; i < 5; i++) {
  console.log(i); // 0, 1, 2, 3, 4
}

// Iterare array cu index
const fructe = ["măr", "pară", "cireaşă"];
for (let i = 0; i < fructe.length; i++) {
  console.log(\`\${i}: \${fructe[i]}\`);
}

// Descrescător
for (let i = 10; i >= 0; i -= 2) {
  console.log(i); // 10, 8, 6, 4, 2, 0
}

// Nested loops — tabelă înmulțire
for (let i = 1; i <= 3; i++) {
  for (let j = 1; j <= 3; j++) {
    process.stdout.write(i * j + "\t");
  }
  console.log();
}
\`\`\`

• **Inițializarea** rulează o singură dată, la start
• **Condiția** e verificată înainte de fiecare iterație — false → stop
• **Incrementul** rulează după fiecare iterație
• **Accesul la index** e avantajul principal față de \`for...of\`
• **\`fructe.length\`** calculat la fiecare iterație — dacă modifici array-ul, atenție!`,
  },
  {
    lesson: "7. Bucle: for",
    title: "for...of — iterare valori",
    content: `**for...of** iterează direct valorile dintr-un **iterable** (array, string, Map, Set etc.) fără index. E mai simplu și mai expresiv decât for clasic când nu ai nevoie de poziție.

\`\`\`javascript
const culori = ["roșu", "verde", "albastru"];

// for...of — accesezi direct valoarea
for (const culoare of culori) {
  console.log(culoare); // "roșu", "verde", "albastru"
}

// Cu string — iterează caracterele
for (const litera of "ABC") {
  console.log(litera); // "A", "B", "C"
}

// Cu entries() când ai nevoie și de index
for (const [i, culoare] of culori.entries()) {
  console.log(\`\${i}: \${culoare}\`);
}

// Cu Map și Set
const set = new Set([1, 2, 3, 2, 1]);
for (const val of set) {
  console.log(val); // 1, 2, 3 — duplicate eliminate automat
}
\`\`\`

• **Funcționează cu orice iterable** — Array, String, Map, Set, Generator, NodeList
• **\`const\`** în for...of: OK — se redeclară la fiecare iterație
• **Nu funcționează cu obiecte simple** \`{}\` — folosește \`for...in\` sau \`Object.entries()\`
• **Preferă for...of** față de for clasic când indexul nu contează`,
  },
  {
    lesson: "7. Bucle: for",
    title: "for...in — iterare chei obiect",
    content: `**for...in** iterează **cheile** (proprietățile) unui obiect. Atenție: iterează și proprietățile moștenite din prototip — de aceea se folosește de obicei cu \`hasOwnProperty\`.

\`\`\`javascript
const persoana = {
  nume: "Ana",
  varsta: 25,
  oras: "Cluj"
};

// Iterare chei
for (const cheie in persoana) {
  console.log(\`\${cheie}: \${persoana[cheie]}\`);
}
// "nume: Ana", "varsta: 25", "oras: Cluj"

// Verificare că e proprietate proprie (nu moștenită)
for (const cheie in persoana) {
  if (Object.hasOwn(persoana, cheie)) {
    console.log(cheie, persoana[cheie]);
  }
}

// NU folosi for...in pe array-uri!
const arr = [10, 20, 30];
for (const k in arr) {
  console.log(k); // "0", "1", "2" — cheile sunt string-uri, nu numere!
}
\`\`\`

• **Returnează chei** ca string-uri — accesezi valoarea cu \`obj[cheie]\`
• **Ordinea nu e garantată** — deși în practică e insertion order în browsere moderne
• **Nu pentru array-uri** — folosește \`for...of\` sau \`forEach\`
• **Alternativă**: \`Object.entries(obj)\` cu \`for...of\` → perechi \`[cheie, valoare]\``,
  },
  {
    lesson: "7. Bucle: for",
    title: "break și continue",
    content: `**\`break\`** iese complet din buclă, **\`continue\`** sare la iterația următoare. Ambele permit controlul fin al execuției fără condiții complicate.

\`\`\`javascript
// break — ieșire din buclă
const numere = [3, 7, 2, 9, 4, 1];
let primuMareSde5 = -1;

for (const n of numere) {
  if (n > 5) {
    primuMareSde5 = n;
    break; // nu mai continuăm căutarea
  }
}
console.log(primuMareSde5); // 7

// continue — sare iterația curentă
for (let i = 0; i < 10; i++) {
  if (i % 2 === 0) continue; // sare numerele pare
  console.log(i); // 1, 3, 5, 7, 9
}

// Label — break din bucle nested
outer: for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    if (j === 1) break outer; // iese din ambele bucle
  }
}
\`\`\`

• **\`break\`**: ieșire imediată — util în căutare (nu procesezi inutil restul)
• **\`continue\`**: sare la \`i++\` și verifică condiția din nou
• **Label + break**: ieșire din bucle nested — rar necesar, \`return\` e mai clar în funcții
• **Switch + break**: \`break\` din \`switch\` nu iese din bucla din jur!`,
  },

  // ─── LECȚIA 8: Funcții ────────────────────────────────────────────────────
  {
    lesson: "8. Funcții",
    title: "Declarare funcție + expresie",
    content: `Există două moduri principale de a crea funcții: **function declaration** și **function expression**. Diferența cheie: declarațiile sunt **hoistate**, expresiile nu.

\`\`\`javascript
// Function declaration — hoistată, poți apela înainte de declarare
salut("Ana"); // funcționează!

function salut(nume) {
  return \`Bună, \${nume}!\`;
}

// Function expression — NOT hoistată
// mesaj("Ana"); // TypeError — nu e disponibilă înainte

const mesaj = function(nume) {
  return \`Salut, \${nume}!\`;
};
mesaj("Ion"); // funcționează după declarare

// Named function expression — util în debugging
const calcul = function calculeaza(n) {
  return n > 0 ? n + calculeaza(n - 1) : 0; // se poate referi la sine
};
\`\`\`

• **Hoisting**: function declarations sunt mutate la vârful scopului — pot fi apelate înainte
• **Function expressions**: asignate ca valori — nu sunt hoistate
• **\`return\`** returnează valoarea; fără el, funcția returnează \`undefined\`
• **Parametri lipsă**: dacă apelezi cu mai puțini argumente, restul sunt \`undefined\``,
  },
  {
    lesson: "8. Funcții",
    title: "Arrow functions (=>)",
    content: `**Arrow functions** (\`=>\`) sunt o sintaxă compactă pentru funcții introdusă în ES6. Pe lângă brevitate, au o diferență crucială: **nu au propriul \`this\`** — moștenesc \`this\` din contextul exterior.

\`\`\`javascript
// Sintaxe — de la cea mai compactă la completă
const dublu = n => n * 2;              // un param, return implicit
const suma  = (a, b) => a + b;         // doi params, return implicit
const salut = () => "Bună ziua!";      // fără parametri
const complex = (x) => {              // cu bloc — return explicit necesar
  const rezultat = x * x;
  return rezultat;
};

// this — diferența majoră față de function
const timer = {
  secunde: 0,
  start() { // method shorthand
    setInterval(() => {
      this.secunde++; // ✓ this e timer-ul — arrow moștenește
    }, 1000);
  }
};
\`\`\`

• **Return implicit**: fără \`{}\` — expresia e returnată automat
• **Return implicit + obiect**: \`n => ({ id: n })\` — obiectul se înfășoară în \`()\`
• **Fără \`this\` propriu**: perfect în callbacks, problematic ca metode de obiect
• **Fără \`arguments\`**: folosește rest params \`(...args)\`
• **Nu pot fi constructori**: \`new ArrowFn()\` dă TypeError`,
  },
  {
    lesson: "8. Funcții",
    title: "Parametri impliciți și rest",
    content: `**Parametrii impliciți** (default) au o valoare dacă argumentul e omis sau \`undefined\`. **Rest parameters** (\`...args\`) colectează oricâte argumente în array — înlocuiesc obiectul \`arguments\`.

\`\`\`javascript
// Default parameters
function salut(nume = "Prieten", prefix = "Bună") {
  return \`\${prefix}, \${nume}!\`;
}
console.log(salut());           // "Bună, Prieten!"
console.log(salut("Ana"));      // "Bună, Ana!"
console.log(salut("Ion", "Salut")); // "Salut, Ion!"

// Rest parameters — colectează restul argumentelor
function suma(prim, ...altele) {
  return altele.reduce((acc, n) => acc + n, prim);
}
console.log(suma(1, 2, 3, 4)); // 10

// Arrow cu rest
const concateneaza = (sep, ...cuvinte) => cuvinte.join(sep);
console.log(concateneaza(", ", "Ana", "Ion", "Maria")); // "Ana, Ion, Maria"
\`\`\`

• **Default**: se aplică doar când argumentul e \`undefined\` — \`null\` nu declanșează default!
• **Default poate fi o expresie**: \`function f(n = calculeaza())\` — evaluată la apel
• **Rest trebuie să fie ultimul** parametru — \`(...rest, x)\` e SyntaxError
• **Rest vs \`arguments\`**: rest e array real, \`arguments\` e array-like și nu merge cu arrow`,
  },
  {
    lesson: "8. Funcții",
    title: "Funcții de ordin superior",
    content: `**Higher-Order Functions (HOF)** sunt funcții care primesc alte funcții ca argumente sau returnează funcții. Sunt fundamentul programării funcționale în JavaScript.

\`\`\`javascript
// Array HOF — cele mai folosite
const numere = [1, 2, 3, 4, 5, 6];

// forEach — iterație cu efect secundar
numere.forEach(n => console.log(n));

// map — transformare → array nou de aceeași lungime
const duble = numere.map(n => n * 2); // [2, 4, 6, 8, 10, 12]

// filter — filtrare → array nou, mai scurt sau egal
const pare = numere.filter(n => n % 2 === 0); // [2, 4, 6]

// every / some — test pe elemente
const toatePozitive = numere.every(n => n > 0); // true
const unulMare = numere.some(n => n > 5);       // true

// Funcție care returnează funcție (factory)
function multiplica(factor) {
  return n => n * factor; // closure peste factor
}
const triple = multiplica(3);
console.log(triple(5)); // 15
\`\`\`

• **\`map\`**: transformă fiecare element — returnează un nou array de aceeași lungime
• **\`filter\`**: păstrează elementele pentru care callback returnează \`true\`
• **\`forEach\`**: doar efecte secundare — nu returnează nimic util
• **Chainable**: \`arr.filter(...).map(...).reduce(...)\` — compozitie expresivă`,
  },

  // ─── LECȚIA 9: Array-uri ──────────────────────────────────────────────────
  {
    lesson: "9. Array-uri",
    title: "Creare și accesare",
    content: `**Array-urile** sunt colecții ordonate cu index numeric (0-based). Pot conține orice tip de valoare, inclusiv alte array-uri și obiecte.

\`\`\`javascript
// Creare
const vide = [];
const fructe = ["măr", "pară", "banană"];
const mixte = [1, "doi", true, null, { x: 5 }];

// Accesare
console.log(fructe[0]);   // "măr" — primul element
console.log(fructe[2]);   // "banană"
console.log(fructe[-1]);  // undefined — nu funcționează în JS!

// Ultimul element
console.log(fructe[fructe.length - 1]); // "banană"
console.log(fructe.at(-1)); // "banană" — ES2022, mai elegant

// Modificare
fructe[1] = "cireașă";
fructe[10] = "kiwi"; // creează "sparse array" — index 3-9 sunt empty
console.log(fructe.length); // 11 — length e max index + 1
\`\`\`

• **Index 0-based**: primul element e \`[0]\`, ultimul e \`[length - 1]\`
• **\`at(-1)\`**: accesare de la final — modern și clar (ES2022)
• **length**: numărul de sloturi, nu neapărat elementele completate
• **Heterogen**: un array poate conține valori de tipuri diferite (deși rar e bun design)
• **Referință**: \`const arr = []\` — \`arr\` nu poate fi reasignat, dar conținutul poate fi modificat`,
  },
  {
    lesson: "9. Array-uri",
    title: "Adăugare și eliminare elemente",
    content: `Metodele **mutabile** (\`push\`, \`pop\`, \`shift\`, \`unshift\`, \`splice\`) modifică array-ul original. Metodele **imutabile** (\`concat\`, \`toSpliced\`) returnează array-uri noi.

\`\`\`javascript
const arr = [1, 2, 3];

// La final (stack)
arr.push(4, 5);     // [1,2,3,4,5] — adaugă, returnează new length
arr.pop();          // [1,2,3,4] — scoate ultimul, returnează elementul

// La început (queue)
arr.unshift(0);     // [0,1,2,3,4] — adaugă la start, returnează new length
arr.shift();        // [1,2,3,4] — scoate primul, returnează elementul

// splice — inserare/ștergere la poziție
arr.splice(1, 2);         // scoate 2 elem de la index 1 → [1,4], returnează [2,3]
arr.splice(1, 0, 2, 3);   // inserează 2,3 la index 1, fără ștergere → [1,2,3,4]

// Imutabil — returnează array nou
const nou = arr.concat([5, 6]);  // [1,2,3,4,5,6] — arr nemodificat
const spread = [...arr, 5, 6];   // același rezultat cu spread
\`\`\`

• **\`push/pop\`**: operații de stivă (LIFO) — eficiente O(1)
• **\`unshift/shift\`**: operații de coadă (FIFO) — mai lente O(n) — reindexează tot
• **\`splice(start, deleteCount, ...items)\`**: cea mai versatilă metodă mutabilă
• **Preferă imutabil** în React/state management — \`[...arr, nou]\`, \`arr.filter(...)\``,
  },
  {
    lesson: "9. Array-uri",
    title: "map, filter, find, findIndex",
    content: `Metodele funcționale ale array-urilor sunt esențiale în JavaScript modern. **\`map\`** transformă, **\`filter\`** filtrează, **\`find\`** caută primul element, **\`findIndex\`** caută prima poziție.

\`\`\`javascript
const produse = [
  { id: 1, name: "Laptop", pret: 3000, activ: true },
  { id: 2, name: "Mouse",  pret: 150,  activ: false },
  { id: 3, name: "Monitor",pret: 1500, activ: true },
];

// map — transformare, array nou de aceeași lungime
const denumiri = produse.map(p => p.name);
// ["Laptop", "Mouse", "Monitor"]

// filter — filtrare, array nou mai scurt sau egal
const active = produse.filter(p => p.activ);
// [{ Laptop... }, { Monitor... }]

// find — primul element care satisface condiția (sau undefined)
const mouse = produse.find(p => p.pret < 200);
// { id: 2, name: "Mouse", ... }

// findIndex — indexul primului element (sau -1)
const idx = produse.findIndex(p => p.id === 3); // 2
\`\`\`

• **\`map\`**: lungimea rezultatului = lungimea originalului — fiecare element transformat
• **\`filter\`**: returnează un sub-array — elementele sunt nemodificate
• **\`find\`**: returnează elementul (nu copie), \`undefined\` dacă nu găsește
• **\`findIndex\`**: returnează \`-1\` dacă nu găsește — verifică cu \`!== -1\``,
  },
  {
    lesson: "9. Array-uri",
    title: "reduce, includes, sort, spread",
    content: `**\`reduce\`** acumulează array-ul într-o singură valoare, **\`includes\`** verifică existența, **\`sort\`** ordonează, **\`spread\`** clonează și combină.

\`\`\`javascript
const numere = [3, 1, 4, 1, 5, 9, 2, 6];

// reduce(callback, initialValue)
const suma = numere.reduce((acc, n) => acc + n, 0); // 31
const max  = numere.reduce((acc, n) => n > acc ? n : acc, -Infinity); // 9

// includes — verificare simplă
console.log(numere.includes(5));  // true
console.log(numere.includes(7));  // false

// sort — ATENȚIE: implicit sortează ca string-uri!
const gresit = [10, 9, 2, 21].sort();         // [10, 2, 21, 9] — GREȘIT!
const corect = [10, 9, 2, 21].sort((a, b) => a - b); // [2, 9, 10, 21]
const desc   = [10, 9, 2, 21].sort((a, b) => b - a); // [21, 10, 9, 2]

// spread — clonare și combinare
const copie = [...numere];           // copie superficială
const unit = [...[1,2], ...[3,4]];   // [1,2,3,4]
\`\`\`

• **\`reduce\`**: cel mai puternic — poate simula \`map\`, \`filter\`, orice acumulare
• **\`sort\` modifică originalul** — clonează înainte: \`[...arr].sort()\`
• **\`sort\` comparator**: \`a - b\` → ascending, \`b - a\` → descending pentru numere
• **\`includes\`** folosește \`===\` — nu găsește obiecte după structură, doar referință`,
  },

  // ─── LECȚIA 10: Obiecte ───────────────────────────────────────────────────
  {
    lesson: "10. Obiecte",
    title: "Creare și accesare proprietăți",
    content: `**Obiectele** stochează date ca perechi **cheie: valoare**. Cheile sunt string-uri (sau Symbols), valorile pot fi orice tip. Sunt structura de date fundamentală în JavaScript.

\`\`\`javascript
// Creare — object literal
const persoana = {
  nume: "Ana",
  varsta: 25,
  activ: true,
  adresa: {           // obiect nested
    oras: "Cluj",
    tara: "România"
  }
};

// Accesare — dot notation (preferată)
console.log(persoana.nume);          // "Ana"
console.log(persoana.adresa.oras);   // "Cluj"

// Accesare — bracket notation (pentru chei dinamice)
const prop = "varsta";
console.log(persoana[prop]);          // 25
console.log(persoana["activ"]);       // true

// Modificare și adăugare
persoana.email = "ana@example.com";  // adaugă proprietate nouă
persoana.varsta = 26;                // modifică

// Ștergere
delete persoana.activ;
\`\`\`

• **Dot notation**: \`obj.cheie\` — mai scurt, preferată când cheia e un identificator valid
• **Bracket notation**: \`obj["cheie"]\` sau \`obj[variabila]\` — pentru chei dinamice sau cu spații
• **Proprietăți inexistente**: returnează \`undefined\`, nu eroare
• **Nested**: accesezi cu \`obj.a.b.c\` — atenție la \`undefined\` intermediar (\`?.)\``,
  },
  {
    lesson: "10. Obiecte",
    title: "Metode în obiecte",
    content: `**Metodele** sunt funcții stocate ca proprietăți ale unui obiect. Cuvântul cheie **\`this\`** în interiorul unei metode referă obiectul curent.

\`\`\`javascript
const calculator = {
  valoare: 0,

  // Method shorthand (ES6) — forma recomandată
  aduna(n) {
    this.valoare += n;
    return this; // permite chaining
  },

  scade(n) {
    this.valoare -= n;
    return this;
  },

  rezultat() {
    return this.valoare;
  }
};

// Method chaining
console.log(
  calculator.aduna(10).aduna(5).scade(3).rezultat()
); // 12

// Atenție: arrow functions NU au this propriu!
const obj = {
  x: 10,
  getX: () => this.x  // this NU e obj — e window/undefined
};
\`\`\`

• **\`this\`**: referă obiectul la stânga punctului la momentul apelului
• **Method shorthand**: \`metoda() {}\` e echivalent cu \`metoda: function() {}\`
• **Arrow method**: nu funcționează cu \`this\` — evită arrow functions ca metode
• **Chaining**: returnând \`this\` din fiecare metodă permiți apeluri înlănțuite`,
  },
  {
    lesson: "10. Obiecte",
    title: "Destructurare obiecte",
    content: `**Destructurarea** extrage proprietăți din obiect în variabile locale în mod concis. Poți redenumi, da valori implicite și face destructurare nested.

\`\`\`javascript
const user = {
  name: "Ana",
  age: 25,
  city: "Cluj",
  role: "admin"
};

// Destructurare simplă
const { name, age } = user;
console.log(name, age); // "Ana" 25

// Redenumire
const { name: userName, role: userRole } = user;
console.log(userName); // "Ana"

// Valori implicite
const { city, country = "România" } = user;
console.log(country); // "România" — user.country e undefined

// Nested destructuring
const { adresa: { oras, cod } = {} } = user;

// În parametri de funcție
function afisUser({ name, age, role = "guest" }) {
  return \`\${name} (\${age}) — \${role}\`;
}
afisUser(user); // "Ana (25) — admin"
\`\`\`

• **Extrage selectiv**: nu trebuie să iei toate proprietățile
• **Redenumire**: \`{ prop: numeNou }\` — utilă când ai conflicte de nume
• **Default în destructurare**: aplicat când valoarea e \`undefined\`
• **Rest în obiecte**: \`const { a, ...rest } = obj\` — restul proprietăților`,
  },
  {
    lesson: "10. Obiecte",
    title: "Object methods + spread",
    content: `**Object.keys/values/entries** expun conținutul obiectului ca array-uri. **Spread \`{...}\`** clonează și combină obiecte imutabil — esențial în state management.

\`\`\`javascript
const config = { host: "localhost", port: 3000, debug: true };

// Object static methods
console.log(Object.keys(config));    // ["host", "port", "debug"]
console.log(Object.values(config));  // ["localhost", 3000, true]
console.log(Object.entries(config)); // [["host","localhost"], ["port",3000], ...]

// Iterare cu for...of + entries
for (const [cheie, val] of Object.entries(config)) {
  console.log(\`\${cheie} = \${val}\`);
}

// Spread — clonare superficială
const copie = { ...config };
const extins = { ...config, port: 4000, env: "prod" }; // suprascrie port

// Object.assign (echivalent mai vechi)
const merged = Object.assign({}, config, { port: 4000 });

// Object.freeze — previne modificări
const imutabil = Object.freeze({ x: 1 });
imutabil.x = 2; // silently ignored în non-strict mode
\`\`\`

• **\`Object.entries()\` + \`for...of\`**: pattern standard pentru iterare obiecte
• **Spread clonează superficial** — obiectele nested sunt referință, nu copie
• **Ordinea spread contează**: proprietatea din dreapta suprascrie stânga
• **\`Object.freeze\`**: util pentru constante config — previne mutații accidentale`,
  },

  // ─── LECȚIA 11: While ─────────────────────────────────────────────────────
  {
    lesson: "11. Bucla while",
    title: "while — condiție la început",
    content: `**while** repetă un bloc cât timp condiția e adevărată. **Condiția e verificată ÎNAINTE** de fiecare iterație — dacă e falsă de la început, blocul nu se execută niciodată.

\`\`\`javascript
// Structura: while (condiție) { corp }
let i = 0;
while (i < 5) {
  console.log(i); // 0, 1, 2, 3, 4
  i++;            // OBLIGATORIU — altfel buclă infinită!
}

// Util când nu știi numărul de iterații
function citeste() { return Math.random() > 0.7 ? "stop" : "continuă"; }

let raspuns;
while (raspuns !== "stop") {
  raspuns = citeste();
  console.log("Răspuns:", raspuns);
}

// Cu array — similar for dar cu condiție complexă
const stiva = [1, 2, 3, 4, 5];
while (stiva.length > 0) {
  const elem = stiva.pop();
  console.log(elem); // 5, 4, 3, 2, 1
}
\`\`\`

• **Condiția la început**: dacă e falsă inițial, corpul nu se execută nici măcar o dată
• **Variabila contorului**: actualizată în corp pentru a avansa spre condiția de ieșire
• **Alternativă la for**: când numărul de iterații nu e cunoscut dinainte
• **Tipic pentru**: polling, parcurgere până la condiție, algoritmi cu stare`,
  },
  {
    lesson: "11. Bucla while",
    title: "do...while — condiție la sfârșit",
    content: `**do...while** este varianta în care **corpul se execută cel puțin o dată**, indiferent de condiție — verificarea se face la FINAL.

\`\`\`javascript
// Structura: do { corp } while (condiție)
let i = 0;
do {
  console.log(i); // 0, 1, 2, 3, 4
  i++;
} while (i < 5);

// Cazul clasic: meniu interactiv
let optiune;
do {
  optiune = prompt("Alege: 1-Joc, 2-Setări, 3-Ieșire");
  console.log("Ai ales:", optiune);
} while (optiune !== "3"); // repetă până alege ieșire

// Demonstrând execuția garantată
let x = 100;
do {
  console.log("Se execută!"); // afișează chiar dacă x > 10
  x++;
} while (x < 10); // condiție falsă de la început — dar se execută o dată
\`\`\`

• **Cel puțin o execuție**: chiar dacă condiția e falsă de la start
• **Cazul clasic**: validare input — afișezi promptul, verifici după ce primești răspunsul
• **Rar folosit**: în practică, \`while\` cu o condiție inițializată acoperă majoritatea cazurilor
• **Punct și virgulă**: \`} while (condiție);\` — singurul loc cu \`;\` după \`}\``,
  },
  {
    lesson: "11. Bucla while",
    title: "break și continue în while",
    content: `**\`break\`** și **\`continue\`** funcționează identic în \`while\` ca în \`for\` — \`break\` iese din buclă, \`continue\` sare la re-verificarea condiției.

\`\`\`javascript
// break — ieșire din buclă
let numar = 0;
while (true) { // buclă infinită controlată cu break
  numar++;
  if (numar % 7 === 0) {
    console.log("Primul multiplu de 7:", numar); // 7
    break;
  }
}

// continue — sare la verificarea condiției
let n = 0;
while (n < 20) {
  n++;
  if (n % 3 !== 0) continue; // sare la while(n < 20) pentru re-verificare
  console.log(n); // 3, 6, 9, 12, 15, 18
}

// Pattern comun: while(true) + break
function cauta(arr, target) {
  let i = 0;
  while (true) {
    if (i >= arr.length) return -1; // break alternativ
    if (arr[i] === target) return i;
    i++;
  }
}
\`\`\`

• **\`while(true)\`** cu \`break\`: pattern valid pentru bucle cu condiție complexă de ieșire
• **\`continue\`** sare la re-verificarea condiției while — nu execută restul corpului
• **Atenție**: în \`do...while\`, \`continue\` sare la evaluarea condiției \`while(...)\`
• **Debugging**: pune \`console.log\` înainte de \`continue\` ca să urmărești execuția`,
  },
  {
    lesson: "11. Bucla while",
    title: "Capcana buclei infinite",
    content: `**Bucla infinită** apare când condiția de ieșire nu e niciodată atinsă — blochează thread-ul JavaScript și face pagina/aplicația nefuncțională. Iată cele mai frecvente cauze.

\`\`\`javascript
// ❌ Uitai să incrementezi
let i = 0;
while (i < 10) {
  console.log(i);
  // i++ lipsit — i rămâne 0 pentru totdeauna!
}

// ❌ Condiție care niciodată nu devine false
while (true) {
  // fără break — rulează la nesfârșit
}

// ❌ Modifici o copie, nu variabila verificată
let arr = [1, 2, 3];
while (arr.length > 0) {
  const copie = [...arr];
  copie.pop(); // modifci copia, arr.length rămâne 3!
}

// ✓ Corect — modifici originalul
while (arr.length > 0) {
  arr.pop(); // modifică arr direct
}

// ✓ Pattern sigur cu timeout (pentru situații reale)
let iteratii = 0;
while (conditie() && iteratii < 10000) {
  // procesare
  iteratii++;
}
\`\`\`

• **Cauza #1**: uitarea incrementorului (\`i++\`, \`arr.pop()\`)
• **Cauza #2**: condiție care nu se poate schimba (variabila nu e modificată în corp)
• **Safeguard**: adaugă un contor de iterații maxim în algoritmi complecși
• **Detectare**: DevTools îngheață — F12 → Profile sau Ctrl+C în terminal`,
  },

  // ─── LECȚIA 12: Switch/case ───────────────────────────────────────────────
  {
    lesson: "12. Switch / case",
    title: "Sintaxa switch / case",
    content: `**switch** evaluează o expresie și o compară cu valorile din **case**-uri folosind \`===\` strict. E o alternativă mai lizibilă față de lanțuri \`else if\` când compari aceeași valoare cu mai multe opțiuni fixe.

\`\`\`javascript
const ziua = new Date().getDay(); // 0=Duminică, 1=Luni, ..., 6=Sâmbătă

switch (ziua) {
  case 0:
    console.log("Duminică");
    break;
  case 1:
    console.log("Luni");
    break;
  case 6:
    console.log("Sâmbătă");
    break;
  default:
    console.log("Zi lucrătoare (Marți-Vineri)");
}

// switch cu string
const comanda = "start";
switch (comanda) {
  case "start":
    console.log("Pornit");
    break;
  case "stop":
    console.log("Oprit");
    break;
  default:
    console.log("Comandă necunoscută:", comanda);
}
\`\`\`

• **\`break\` obligatoriu** la finalul fiecărui case (altfel fall-through)
• **\`default\`**: opțional, echivalentul lui \`else\` — se execută dacă niciun case nu se potrivește
• **Compară cu \`===\`**: strict — \`"1"\` nu se potrivește cu \`1\`
• **Orice expresie**: switch poate compara și rezultatele unor funcții`,
  },
  {
    lesson: "12. Switch / case",
    title: "Fall-through și case-uri grupate",
    content: `**Fall-through** înseamnă că execuția continuă în case-ul următor fără \`break\`. Poate fi **intenționat** (grupare de case-uri) sau **accidental** (bug). Comentează explicit când e intenționat.

\`\`\`javascript
const luna = 4; // Aprilie

// Fall-through intenționat — grupare
switch (luna) {
  case 12:
  case 1:
  case 2:
    console.log("Iarnă");
    break;
  case 3:
  case 4:    // ← Aprilie cade prin până la "Primăvară"
  case 5:
    console.log("Primăvară");
    break;
  case 6:
  case 7:
  case 8:
    console.log("Vară");
    break;
  default:
    console.log("Toamnă");
}

// Fall-through parțial cu cod intermediar
switch (nivelAcces) {
  case "admin":
    gestioneazaUtilizatori();
    // falls through — adminul poate și tot ce poate moderatorul
  case "moderator":
    stergePosturi();
    break;
  case "user":
    scriePosturi();
    break;
}
\`\`\`

• **Case gol + fall-through**: grupare fără cod propriu — pattern comun pentru enumerări
• **Comentează \`// falls through\`** când e intenționat — altfel pare un bug
• **Linters** (ESLint) avertizează la fall-through fără comentariu explicit
• **Ordinea case-urilor** contează când folosești fall-through`,
  },
  {
    lesson: "12. Switch / case",
    title: "Fall-through ACCIDENTAL — eroare frecventă",
    content: `Uitarea unui \`break\` duce la **fall-through accidental** — execuția continuă în case-ul următor, producând comportament neașteptat și greu de depanat.

\`\`\`javascript
const nota = "B";

// ❌ Bug: lipsă break după case "A"
switch (nota) {
  case "A":
    console.log("Excelent!");
    // break; ← UITAT!
  case "B":
    console.log("Bine");   // ← Se execută și pentru "A"!!
    break;
  case "C":
    console.log("Suficient");
    break;
}
// Pentru nota "A" se afișează:
// "Excelent!"
// "Bine"   ← nedorit!

// ✓ Corect — break la fiecare case cu logică
switch (nota) {
  case "A":
    console.log("Excelent!");
    break;
  case "B":
    console.log("Bine");
    break;
  default:
    console.log("Continuă să studiezi");
}
\`\`\`

• **Simptom**: case-uri multiple se execută pentru un singur input
• **Detectare**: testează fiecare case separat, verifică output-ul
• **Regulă**: fiecare case cu logică proprie trebuie să se termine cu \`break\` sau \`return\`
• **Alternativă modernă**: object dispatch \`const actiuni = { A: fn1, B: fn2 }; actiuni[nota]?.()\``,
  },
  {
    lesson: "12. Switch / case",
    title: "switch vs if/else — când să folosești",
    content: `Alegerea între **switch** și **if/else** depinde de tipul comparației. Switch e mai clar pentru valori fixe, if/else e mai flexibil pentru condiții complexe sau ranges.

\`\`\`javascript
// ✓ Folosește switch — comparații de egalitate cu valori fixe
switch (statusComanda) {
  case "pending":   trateazaPending(); break;
  case "shipped":   trateazaShipped(); break;
  case "delivered": trateazaDelivered(); break;
  default:          console.error("Status necunoscut");
}

// ✓ Folosește if/else — range-uri, condiții booleene, comparații <, >
const nota = 7.5;
if (nota >= 9) {
  console.log("Excelent");
} else if (nota >= 7) {
  console.log("Bine");     // ← switch nu poate face nota >= 7
} else {
  console.log("Suficient");
}

// ✓ Alternativă modernă: object map (fără fall-through, mai scurt)
const mesaje = {
  ro: "Bună ziua",
  en: "Hello",
  fr: "Bonjour",
};
const salut = mesaje[limba] ?? "Hello"; // ?? pentru default
\`\`\`

• **Switch**: egal cu valori fixe, multe case-uri, enum-like — mai lizibil
• **if/else**: range-uri (\`> < >=\`), condiții booleene, logică complexă — mai flexibil
• **Object map**: cel mai clean pentru dispatch simplu pe string/number
• **switch cu \`default\`**: nu uita cazul neacoperit!`,
  },

  // ─── LECȚIA 13: Funcții avansate ──────────────────────────────────────────
  {
    lesson: "13. Funcții avansate",
    title: "Closure — funcții care rețin variabile",
    content: `**Closure** este o funcție care **rețin accesul la variabilele din scope-ul exterior** chiar și după ce funcția exterioară a terminat execuția. E unul din conceptele cele mai puternice din JavaScript.

\`\`\`javascript
function creeazaContor() {
  let count = 0; // variabilă "privată"

  return {
    incrementeaza() { count++; },
    decrementeaza() { count--; },
    valoare()       { return count; }
  };
}

const contor = creeazaContor();
contor.incrementeaza();
contor.incrementeaza();
contor.incrementeaza();
contor.decrementeaza();
console.log(contor.valoare()); // 2

// count NU e accesibil din exterior — date private!
// console.log(count); // ReferenceError

// Factory cu closure
function multiplica(factor) {
  return (n) => n * factor; // closure peste factor
}
const triple = multiplica(3);
const double = multiplica(2);
console.log(triple(10)); // 30
console.log(double(10)); // 20
\`\`\`

• **Variabile „private"**: inaccesibile din exterior — emulează encapsularea OOP
• **Factory functions**: closure e baza creerii de funcții specializate
• **Fiecare call → closure propriu**: \`triple\` și \`double\` au \`factor\` separat în memorie
• **Lifecycle**: variabila din closure trăiește atât timp cât există referința la closure`,
  },
  {
    lesson: "13. Funcții avansate",
    title: "Higher-Order Functions",
    content: `**Higher-Order Functions (HOF)** primesc funcții ca argumente sau returnează funcții. Sunt fundația stilului funcțional în JavaScript — compozabilitate, refolosire, cod expresiv.

\`\`\`javascript
// HOF care primesc funcții — array methods
const numere = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const pareDouble = numere
  .filter(n => n % 2 === 0)  // [2,4,6,8,10]
  .map(n => n * 2);           // [4,8,12,16,20]

// HOF care returnează funcții
function withLogging(fn) {
  return function(...args) {
    console.log("Apel cu:", args);
    const result = fn(...args);
    console.log("Rezultat:", result);
    return result;
  };
}

const aduna = (a, b) => a + b;
const adunaCuLog = withLogging(aduna);
adunaCuLog(3, 4);
// "Apel cu: [3, 4]"
// "Rezultat: 7"

// compose — combinare de funcții
const compose = (...fns) => x => fns.reduceRight((v, f) => f(v), x);
const transform = compose(Math.abs, n => n - 10, parseInt);
console.log(transform("3.7")); // Math.abs(parseInt("3.7") - 10) = 7
\`\`\`

• **Callbacks**: orice funcție pasată ca argument e o formă de HOF
• **Chainable**: \`filter().map().reduce()\` — compozabilitate elegantă
• **Decoratori**: HOF ce adaugă funcționalitate fără a modifica funcția originală
• **Refolosire**: scrii logica o dată, o aplici pe orice funcție`,
  },
  {
    lesson: "13. Funcții avansate",
    title: "setTimeout și setInterval",
    content: `**\`setTimeout\`** execută o funcție după un delay, **\`setInterval\`** o execută repetat la interval. Ambele sunt **asincrone** — codul următor rulează imediat, fără să aștepte.

\`\`\`javascript
// setTimeout — execuție întârziată
const id1 = setTimeout(() => {
  console.log("Rulează după 2 secunde");
}, 2000);

// Anulare înainte de execuție
clearTimeout(id1);

// setInterval — execuție repetată
let count = 0;
const id2 = setInterval(() => {
  count++;
  console.log("Tick:", count);
  if (count >= 5) clearInterval(id2); // oprire după 5 tick-uri
}, 1000);

// setTimeout(fn, 0) — planificare în micro/macrotask queue
console.log("1");
setTimeout(() => console.log("3"), 0); // defer la finalul call stack
console.log("2");
// Output: 1, 2, 3 — nu 1, 3, 2!
\`\`\`

• **Returnează ID**: salvează-l dacă vrei să anulezi cu \`clearTimeout/clearInterval\`
• **Delay minim, nu exact**: browserul poate întârzia mai mult dacă e ocupat
• **\`setTimeout(fn, 0)\`**: defer la microtask queue — util pentru a lăsa UI-ul să se redea
• **Prefer \`clearInterval\`**: curăță mereu interval-urile pentru a evita memory leaks`,
  },
  {
    lesson: "13. Funcții avansate",
    title: "IIFE și funcții pure",
    content: `**IIFE** (Immediately Invoked Function Expression) se execută imediat după definire — creând un scope izolat. **Funcțiile pure** returnează mereu același rezultat pentru aceleași input-uri, fără efecte secundare.

\`\`\`javascript
// IIFE — scope privat, nu poluează globalul
(function() {
  const secret = "nu e accesibil în afară";
  console.log("IIFE executat:", secret);
})();
// console.log(secret); // ReferenceError

// IIFE cu parametri și return
const rezultat = (function(a, b) {
  return a + b;
})(3, 4); // 7

// Funcție pură — fără efecte secundare, deterministă
function aduna(a, b) {
  return a + b; // same input → same output, mereu
}

// Funcție impură — modifică stare externă
let total = 0;
function adaugaTotal(n) {
  total += n; // efect secundar — modifică variabilă externă
  return total;
}

// Avantajele funcțiilor pure: testabile, predictibile, composable
const calculeaza = (lista) => lista.reduce((acc, n) => acc + n, 0);
console.log(calculeaza([1,2,3])); // 6 — mereu același rezultat
\`\`\`

• **IIFE**: folosit în codul legacy pre-module pentru izolare scope — azi înlocuit de ES modules
• **Funcție pură**: fără \`console.log\`, fără mutații, fără date din afara parametrilor
• **Testabilitate**: funcțiile pure se testează trivial — input → output
• **React hooks**: funcțiile pasate la \`useMemo\`/\`useCallback\` trebuie să fie pure`,
  },

  // ─── LECȚIA 14: Destructurare ─────────────────────────────────────────────
  {
    lesson: "14. Destructurare + Spread/Rest",
    title: "Destructurare array",
    content: `**Destructurarea array-urilor** extrage elemente în variabile locale prin potrivire de poziție. E compactă, lizibilă și permite skip, default values și rest.

\`\`\`javascript
const culori = ["roșu", "verde", "albastru", "galben"];

// Destructurare simplă — poziție stânga = index în array
const [primul, alDoilea] = culori;
console.log(primul, alDoilea); // "roșu" "verde"

// Skip elements cu virgulă goală
const [, , alTreilea] = culori;
console.log(alTreilea); // "albastru"

// Rest — restul elementelor
const [cap, ...coada] = culori;
console.log(cap);   // "roșu"
console.log(coada); // ["verde", "albastru", "galben"]

// Valori implicite
const [a = "default", b, c = "implicit"] = ["valoare"];
console.log(a); // "valoare"
console.log(b); // undefined
console.log(c); // "implicit"

// Swap de variabile — fără temp!
let x = 1, y = 2;
[x, y] = [y, x];
console.log(x, y); // 2 1
\`\`\`

• **Bazat pe poziție**: primul element → prima variabilă, indiferent de nume
• **Skip**: virgule goale \`[, , alTreilea]\` pentru a sări elemente
• **Rest**: trebuie să fie ultimul: \`[cap, ...rest]\` — nu \`[...rest, ultim]\`
• **Swap de variabile**: pattern elegant, fără variabilă temporară`,
  },
  {
    lesson: "14. Destructurare + Spread/Rest",
    title: "Destructurare obiect",
    content: `**Destructurarea obiectelor** extrage proprietăți după **nume** (nu poziție). Poți redenumi, da defaults, face destructurare nested și o folosi direct în parametrii de funcții.

\`\`\`javascript
const produs = {
  id: 42,
  name: "Laptop",
  pret: 3000,
  specs: { ram: 16, ssd: 512 }
};

// Simplu — cheia din obiect = numele variabilei
const { id, name, pret } = produs;

// Redenumire: { cheieObiect: numeVariabilă }
const { name: numeProdus, pret: pret_ron } = produs;
console.log(numeProdus); // "Laptop"

// Valori implicite
const { discount = 0, categorie = "necunoscut" } = produs;

// Nested destructuring
const { specs: { ram, ssd } } = produs;
console.log(ram, ssd); // 16 512

// În parametri funcție
function afisProblema({ name, pret, discount = 0 }) {
  return \`\${name}: \${pret * (1 - discount)} RON\`;
}
afisProblema(produs);
\`\`\`

• **Bazat pe cheie**: \`{ name }\` caută proprietatea cu exact acea cheie
• **Proprietate inexistentă**: returnează \`undefined\` (sau default-ul dacă e setat)
• **Rest \`{...rest}\`**: adună proprietățile nemenționat în alt obiect
• **Nested**: \`{ a: { b } }\` extrage \`b\` direct — atenție dacă \`a\` poate fi \`undefined\``,
  },
  {
    lesson: "14. Destructurare + Spread/Rest",
    title: "Spread operator (...)",
    content: `**Spread** (\`...\`) „desface" un iterable în elemente individuale. Funcționează în apeluri de funcții, array literals și object literals — mecanismul principal de copiere imutabilă.

\`\`\`javascript
// Array spread — copiere și combinare
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];

const combinat = [...arr1, ...arr2];          // [1,2,3,4,5,6]
const cuExtra = [...arr1, 99, ...arr2];       // [1,2,3,99,4,5,6]
const copie = [...arr1];                      // copie superficială

// Object spread — merge cu suprasciere
const base = { a: 1, b: 2 };
const extins = { ...base, b: 99, c: 3 };     // { a:1, b:99, c:3 }
const merged = { ...defaultConfig, ...userConfig }; // user suprascrie default

// Spread în apel de funcție
function suma(a, b, c) { return a + b + c; }
const args = [1, 2, 3];
console.log(suma(...args)); // 6 — echivalent cu suma(1,2,3)

// Math cu spread
const numere = [3, 1, 4, 1, 5, 9];
console.log(Math.max(...numere)); // 9
\`\`\`

• **Copie superficială**: elementele nested (obiecte/array-uri) sunt copiate ca referință
• **Ordinea în objects**: proprietatea din dreapta câștigă — \`{...base, key: val}\`
• **Imutabilitate**: esențial în React state — \`setState({...state, count: count+1})\`
• **Spread nu e deep clone** — pentru nested adânc, folosește \`structuredClone()\``,
  },
  {
    lesson: "14. Destructurare + Spread/Rest",
    title: "Rest parameters (...)",
    content: `**Rest parameters** (\`...args\`) colectează oricâte argumente rămase într-un **array real**. Înlocuiesc obiectul \`arguments\` (legacy) și funcționează și în destructurare.

\`\`\`javascript
// Rest parameters în funcție
function suma(prim, al_doilea, ...restul) {
  console.log(prim);    // 1
  console.log(alDoilea); // 2
  console.log(restul);  // [3, 4, 5]
  return prim + alDoilea + restul.reduce((s, n) => s + n, 0);
}
console.log(suma(1, 2, 3, 4, 5)); // 15

// Funcție variadic — număr variabil de argumente
function log(nivel, ...mesaje) {
  console.log(\`[\${nivel.toUpperCase()}]\`, ...mesaje);
}
log("info", "Server pornit", "port", 3000);
// [INFO] Server pornit port 3000

// Rest în destructurare array
const [cap, al2lea, ...restArray] = [1, 2, 3, 4, 5];
console.log(restArray); // [3, 4, 5]

// Rest în destructurare obiect
const { a, b, ...restObj } = { a: 1, b: 2, c: 3, d: 4 };
console.log(restObj); // { c: 3, d: 4 }
\`\`\`

• **Trebuie să fie ultimul** parametru: \`(a, ...rest)\` OK, \`(...rest, a)\` SyntaxError
• **Array real**: spre deosebire de \`arguments\`, poți folosi \`map\`, \`filter\` direct
• **Combini cu spread**: \`log(nivel, ...mesaje)\` — rest la definire, spread la apel
• **Destructurare rest**: extrage restul elementelor/proprietăților ne-numite`,
  },

  // ─── LECȚIA 15: Scope + Hoisting + Closure ────────────────────────────────
  {
    lesson: "15. Scope, Hoisting, Closure",
    title: "Scope: global, funcție, bloc",
    content: `**Scope** (domeniu de vizibilitate) definește unde sunt accesibile variabilele. JavaScript are 3 tipuri de scope care se anidează ierarhic.

\`\`\`javascript
const global = "vizibil peste tot"; // Global scope

function externa() {
  const inFunctie = "vizibil în externa() și interne";
  // console.log(inBloc); // ReferenceError — nu e accesibil de la funcție

  if (true) {
    const inBloc = "vizibil doar în acest if";  // Block scope
    var functieScope = "vizibil în toată funcția!"; // VAR ignoră {}
    console.log(global);    // ✓ accesibil — scope chain merge în sus
    console.log(inFunctie); // ✓ accesibil
    console.log(inBloc);    // ✓ accesibil — suntem în bloc
  }

  console.log(functieScope); // ✓ var e function-scoped
  // console.log(inBloc);    // ✗ ReferenceError
}

// Scope chain — căutare de la interior la exterior
function outer() {
  const x = 10;
  function inner() {
    const y = 20;
    console.log(x + y); // 30 — inner vede x din outer
  }
  inner();
}
\`\`\`

• **Global**: variabile declarate în afara oricărei funcții — evita poluarea globalului
• **Function scope**: \`var\` trăiește în întreaga funcție, indiferent de \`{}\`
• **Block scope**: \`let\`/\`const\` trăiesc între \`{}\` — mai predictibil
• **Scope chain**: variabilele se caută de la interior spre exterior până la global`,
  },
  {
    lesson: "15. Scope, Hoisting, Closure",
    title: "Hoisting detaliat",
    content: `**Hoisting** mișcă declarațiile de variabile și funcții la vârful scope-ului la compilare — înainte de execuție. Comportamentul diferă între \`var\`, \`let\`/\`const\` și \`function\`.

\`\`\`javascript
// var — hoistat CU inițializare undefined
console.log(x); // undefined — nu eroare!
var x = 5;

// Cum vede JS intern codul de mai sus:
// var x;  ← declarat la vârf
// console.log(x); // undefined
// x = 5;

// let/const — hoistate, dar în "Temporal Dead Zone"
// console.log(y); // ReferenceError — TDZ!
let y = 10;

// function declaration — hoistată COMPLET cu corp
salut(); // "Bună!" — funcționează înainte de declarare
function salut() {
  console.log("Bună!");
}

// function expression — NU hoistată
// cheamaMe(); // TypeError — cheamaMe e undefined în acest punct
const cheamaMe = function() { console.log("Salut"); };
\`\`\`

• **\`var\`**: declarat la vârf cu \`undefined\` — fără eroare, dar surprinzător
• **\`let\`/\`const\`**: hoistate dar în **TDZ** — ReferenceError dacă le folosești înainte
• **Function declaration**: complet hoistată — poți apela înainte de linie
• **Function expression**: \`const f = function(){}\` — \`f\` e \`undefined\` până la linia ei`,
  },
  {
    lesson: "15. Scope, Hoisting, Closure",
    title: "Closure — variabile private",
    content: `**Closure** permite crearea de **variabile cu adevărat private** în JavaScript — variabile accesibile doar prin funcțiile care au closure pe ele, nu din exterior.

\`\`\`javascript
// Modul pattern cu closure
function creeazaBancomat(sold_initial) {
  let sold = sold_initial; // privat — inaccesibil direct

  return {
    depune(suma) {
      if (suma > 0) sold += suma;
      return sold;
    },
    retrage(suma) {
      if (suma > sold) return "Fonduri insuficiente";
      sold -= suma;
      return sold;
    },
    getSold() {
      return sold; // singura cale de acces
    }
  };
}

const cont = creeazaBancomat(1000);
cont.depune(500);          // 1500
cont.retrage(200);         // 1300
console.log(cont.getSold()); // 1300
// cont.sold = 9999; // NU funcționează — sold e privat!

// Closure în loop — greșeală clasică
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100); // 0, 1, 2 ✓ (cu let)
}
// Cu var ar fi: 3, 3, 3 ✗ — toți capturează același var
\`\`\`

• **Module pattern**: closure pentru date private + API public expus
• **Fiecare apel** creează un closure nou — sold-urile diferitelor conturi sunt izolate
• **Closure în loop cu \`let\`**: fiecare iterație are propriul \`i\` — funcționează corect
• **Closure în loop cu \`var\`**: un singur \`i\` partajat — bug clasic interviu`,
  },
  {
    lesson: "15. Scope, Hoisting, Closure",
    title: "Scope chain și lexical scope",
    content: `**Lexical scope** înseamnă că scope-ul e determinat de **unde e scrisă funcția în cod**, nu de unde e apelată. **Scope chain** e mecanismul prin care JavaScript caută variabile în scope-urile exterioare.

\`\`\`javascript
const PREFIX = "LOG"; // global

function creeazaLogger(nivel) {
  // nivel e în scope-ul lui creeazaLogger
  return function(mesaj) {
    // Scope chain: mesaj → nivel → PREFIX → global
    console.log(\`[\${PREFIX}:\${nivel}] \${mesaj}\`);
  };
}

const info  = creeazaLogger("INFO");
const error = creeazaLogger("ERROR");

info("Server pornit");   // [LOG:INFO] Server pornit
error("Conexiune esuata"); // [LOG:ERROR] Conexiune esuata

// Lexical scope — definit static, nu dinamic
const x = "global";
function outer() {
  const x = "outer";
  function inner() {
    console.log(x); // "outer" — vede unde E SCRISĂ inner, nu de unde e apelată
  }
  return inner;
}

const fn = outer();
fn(); // "outer" — chiar dacă e apelată din global scope
\`\`\`

• **Lexical**: scope stabilit la scriere (\`\`static\`\`) — opusul dynamic scope (inexistent în JS)
• **Scope chain**: la fiecare referință la variabilă, JS caută: local → outer → ... → global
• **Variabilă negăsită**: ReferenceError după parcurgerea întregului lanț
• **\`window\` / global object**: capătul lanțului — variabilele globale sunt proprietăți ale lui`,
  },
];

async function main() {
  let updated = 0, notFound = 0;

  for (const item of UPDATES) {
    const lessons = await p.lesson.findMany({
      where: {
        title: item.lesson,
        module: { slug: "javascript" },
      },
    });

    if (lessons.length === 0) {
      console.log(`  ✗ Lectia negasita: "${item.lesson}"`);
      notFound++;
      continue;
    }

    const theory = await p.theory.findFirst({
      where: {
        title: item.title,
        lessonId: { in: lessons.map(l => l.id) },
      },
    });

    if (!theory) {
      console.log(`  ✗ Sectiunea negasita: "${item.lesson}" / "${item.title}"`);
      notFound++;
      continue;
    }

    await p.theory.update({
      where: { id: theory.id },
      data: { content: item.content },
    });

    console.log(`  ✓ ${item.lesson} / "${item.title}": ${theory.content.length} → ${item.content.length} chars`);
    updated++;
  }

  console.log(`\nDone: ${updated} updated, ${notFound} not found`);
  await p.$disconnect();
}

main().catch(e => { console.error(e); process.exit(1); });
