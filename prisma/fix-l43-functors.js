"use strict";
require("dotenv").config({ path: ".env" });
const { PrismaClient } = require("@prisma/client");
const p = new PrismaClient();

const content = `**Functors** sunt container-e care implementează \`map\`. **Monadele** sunt functors cu \`flatMap\` (chain) — permit compunerea operațiunilor care pot eșua.

\`\`\`javascript
// Functor — orice cu map
class Box {
  constructor(value) { this.value = value; }
  map(fn) { return new Box(fn(this.value)); }
  fold(fn) { return fn(this.value); } // extrage valoarea
}
const result = new Box(5)
  .map(x => x * 2) // Box(10)
  .map(x => x + 1) // Box(11)
  .fold(x => x);   // 11
// Array e un functor: [1,2,3].map(x => x*2) → [2,4,6]
\`\`\`

**Maybe monad — gestionare null/undefined sigur:**
\`\`\`javascript
class Maybe {
  static of(value) { return new Maybe(value); }
  constructor(value) { this._value = value; }
  isNothing() { return this._value == null; }
  map(fn) {
    return this.isNothing() ? this : Maybe.of(fn(this._value));
  }
  flatMap(fn) { return this.isNothing() ? this : fn(this._value); }
  getOrElse(defaultVal) { return this.isNothing() ? defaultVal : this._value; }
}

// Fara Maybe — null checks peste tot
function getStreetName(user) {
  if (user && user.address && user.address.street) {
    return user.address.street.name;
  }
  return "Necunoscut";
}

// Cu Maybe — compunere curata fara null checks
const getStreetName = (user) =>
  Maybe.of(user)
    .map(u => u.address)
    .map(a => a.street)
    .map(s => s.name)
    .getOrElse("Necunoscut");

getStreetName(null);                          // "Necunoscut"
getStreetName({ address: null });             // "Necunoscut"
getStreetName({ address: { street: null } }); // "Necunoscut"
getStreetName({ address: { street: { name: "Victoriei" } } }); // "Victoriei"
\`\`\`

**Result monad (Either) — succes sau eroare:**
\`\`\`javascript
const Ok  = value => ({ ok: true, value,  map: fn => Ok(fn(value)),  flatMap: fn => fn(value) });
const Err = error => ({ ok: false, error, map: () => Err(error),     flatMap: () => Err(error) });

function parseAge(str) {
  const n = parseInt(str);
  if (isNaN(n)) return Err(str + " nu e un numar");
  if (n < 0 || n > 150) return Err("Varsta " + n + " e nerealista");
  return Ok(n);
}
parseAge("25").map(age => age * 2); // Ok(50)
parseAge("abc").map(age => age * 2); // Err("abc nu e un numar")

// Compunere cu Result
const validateUser = (data) =>
  parseAge(data.age)
    .flatMap(age => age < 18 ? Err("Minor") : Ok({ ...data, age }));
\`\`\``;

p.lesson.findMany({
  where: { order: 43, module: { slug: "javascript" } }
}).then(async (ls) => {
  const theory = await p.theory.findFirst({
    where: { title: "Functors, Maybe si Result monads", lessonId: { in: ls.map(l => l.id) } }
  });
  if (!theory) { console.log("NOT FOUND"); return; }
  await p.theory.update({ where: { id: theory.id }, data: { content } });
  console.log("✓ Updated: " + theory.content.length + " → " + content.length + " chars");
  p.$disconnect();
});
