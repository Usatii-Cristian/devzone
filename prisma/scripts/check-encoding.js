// Verify (read-only) that NO module still has mojibake, broken down per module.
//   node prisma/scripts/check-encoding.js
require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

function buildReverseMap(label) {
  const dec = new TextDecoder(label);
  const map = new Map();
  for (let b = 0; b <= 0xff; b++) {
    const ch = dec.decode(Uint8Array.of(b));
    if (ch && ch !== "�" && !map.has(ch)) map.set(ch, b);
  }
  return map;
}
const MAPS = [buildReverseMap("windows-1250"), buildReverseMap("windows-1252")];

function reverseWith(str, rev) {
  const bytes = [];
  for (const ch of str) {
    const b = rev.get(ch);
    if (b === undefined) return null;
    bytes.push(b);
  }
  const decoded = Buffer.from(bytes).toString("utf8");
  return decoded.includes("�") ? null : decoded;
}
function isMojibake(str) {
  if (typeof str !== "string" || !/[^\x00-\x7F]{2,}/.test(str)) return false;
  for (const rev of MAPS) {
    const r = reverseWith(str, rev);
    if (r !== null && r !== str) return true;
  }
  return false;
}
function anyBad(...vals) {
  return vals.some(v => Array.isArray(v) ? v.some(isMojibake) : isMojibake(v));
}

async function main() {
  const modules = await prisma.module.findMany({
    orderBy: { order: "asc" },
    include: {
      lessons: {
        include: {
          tasks: true,
          theory: true,
        },
      },
    },
  });

  console.log(`\n=== ENCODING CHECK — ${modules.length} module ===\n`);
  let grandTotal = 0;

  for (const m of modules) {
    let bad = 0;
    if (anyBad(m.title, m.description)) bad++;
    for (const l of m.lessons) {
      if (anyBad(l.title, l.slug)) bad++;
      for (const t of l.tasks) {
        if (anyBad(t.name, t.question, t.options, t.answer, t.explanation, t.starterCode, t.expectedOutput)) bad++;
      }
      for (const th of l.theory) {
        if (anyBad(th.title, th.content)) bad++;
      }
    }
    grandTotal += bad;
    const mark = bad === 0 ? "✅" : "⚠️ ";
    console.log(`${mark} ${String(m.order).padStart(2)}. ${m.title.padEnd(40)} ${bad === 0 ? "curat" : bad + " înregistrări cu mojibake"}`);
  }

  console.log(`\n${grandTotal === 0 ? "✅ TOATE MODULELE SUNT CURATE." : "⚠️  Total rămas: " + grandTotal}`);
}

main()
  .catch(e => { console.error("Error:", e); process.exit(1); })
  .finally(() => prisma.$disconnect());
