// Detect & repair "mojibake" — UTF-8 text that was misread as Windows-1252.
// Symptoms in DB: "—" shows as "â€"", "ș" as "È™", "ț" as "È›", "ă" as "Äƒ", etc.
//
//   node prisma/scripts/fix-encoding.js            → dry-run (shows what WOULD change)
//   node prisma/scripts/fix-encoding.js --apply    → actually writes the fixes
//
require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const APPLY = process.argv.includes("--apply");

// Build a reverse map (Unicode char → codepage byte) for a legacy single-byte
// encoding, using the platform's TextDecoder. Lets us reverse mojibake exactly.
function buildReverseMap(label) {
  const dec = new TextDecoder(label);
  const map = new Map();
  for (let b = 0; b <= 0xff; b++) {
    const ch = dec.decode(Uint8Array.of(b));
    if (ch && ch !== "�" && !map.has(ch)) map.set(ch, b); // keep lowest byte per char
  }
  return map;
}

// Two codepages observed in the data: most records were misread as Windows-1252,
// but some (e.g. PHP module) as Windows-1250 (ș→"Č™", ț→"Č›").
const REV_1250 = buildReverseMap("windows-1250");
const REV_1252 = buildReverseMap("windows-1252");

function reverseWith(str, rev) {
  const bytes = [];
  for (const ch of str) {
    const b = rev.get(ch);
    if (b === undefined) return null; // char not in this codepage → not its mojibake
    bytes.push(b);
  }
  const decoded = Buffer.from(bytes).toString("utf8");
  if (decoded.includes("�")) return null; // invalid UTF-8 → not real mojibake
  return decoded;
}

// Reverse one pass of "UTF-8 bytes decoded as a legacy codepage".
// The two codepages' letter renderings are disjoint, so at most one yields a
// valid, changed result — no ambiguity in practice.
function reverseMojibake(str) {
  for (const rev of [REV_1250, REV_1252]) {
    const r = reverseWith(str, rev);
    if (r !== null && r !== str) return r;
  }
  return null;
}

// Mojibake always produces ≥2 consecutive non-ASCII chars (every original
// multibyte char becomes 2–3 CP1252 chars in a row). Correct text never has a
// run that ALSO survives reverseMojibake — RO diacritics ș/ț/ă aren't CP1252-
// representable, so reverseMojibake returns null for genuine text. Double safety.
function hasNonAsciiRun(str) {
  return /[^\x00-\x7F]{2,}/.test(str);
}

function isMojibake(str) {
  if (typeof str !== "string" || !str) return false;
  if (!hasNonAsciiRun(str)) return false;
  const fixed = reverseMojibake(str);
  return fixed !== null && fixed !== str;
}

function fixStr(str) {
  return isMojibake(str) ? reverseMojibake(str) : str;
}

// Per-field repair for an array of string fields. Returns { changed, patch }.
function repairFields(obj, fields) {
  const patch = {};
  let changed = false;
  for (const f of fields) {
    const v = obj[f];
    if (typeof v === "string" && isMojibake(v)) {
      patch[f] = fixStr(v);
      changed = true;
    } else if (Array.isArray(v)) {
      let arrChanged = false;
      const newArr = v.map(item => {
        if (typeof item === "string" && isMojibake(item)) { arrChanged = true; return fixStr(item); }
        return item;
      });
      if (arrChanged) { patch[f] = newArr; changed = true; }
    }
  }
  return { changed, patch };
}

const stats = { Module: 0, Lesson: 0, Task: 0, Theory: 0 };
const samples = [];

function logSample(model, id, field, before, after) {
  if (samples.length < 25) {
    const trim = s => (s.length > 70 ? s.slice(0, 70) + "…" : s);
    samples.push(`  [${model}] ${field}\n    ✗ ${trim(before)}\n    ✓ ${trim(after)}`);
  }
}

async function main() {
  console.log(`\n=== FIX ENCODING (${APPLY ? "APPLY" : "DRY-RUN"}) ===\n`);

  // ── Modules ──
  for (const m of await prisma.module.findMany()) {
    const { changed, patch } = repairFields(m, ["title", "description"]);
    if (changed) {
      stats.Module++;
      for (const f of Object.keys(patch)) logSample("Module", m.id, f, m[f], patch[f]);
      if (APPLY) await prisma.module.update({ where: { id: m.id }, data: patch });
    }
  }

  // ── Lessons ──
  for (const l of await prisma.lesson.findMany()) {
    const { changed, patch } = repairFields(l, ["title", "slug"]);
    if (changed) {
      stats.Lesson++;
      for (const f of Object.keys(patch)) logSample("Lesson", l.id, f, l[f], patch[f]);
      if (APPLY) await prisma.lesson.update({ where: { id: l.id }, data: patch });
    }
  }

  // ── Tasks ──
  for (const t of await prisma.task.findMany()) {
    const { changed, patch } = repairFields(t, ["name", "question", "options", "answer", "explanation", "starterCode", "expectedOutput"]);
    if (changed) {
      stats.Task++;
      for (const f of Object.keys(patch)) logSample("Task", t.id, f, String(t[f]), String(patch[f]));
      if (APPLY) await prisma.task.update({ where: { id: t.id }, data: patch });
    }
  }

  // ── Theory ──
  for (const th of await prisma.theory.findMany()) {
    const { changed, patch } = repairFields(th, ["title", "content"]);
    if (changed) {
      stats.Theory++;
      for (const f of Object.keys(patch)) logSample("Theory", th.id, f, th[f], patch[f]);
      if (APPLY) await prisma.theory.update({ where: { id: th.id }, data: patch });
    }
  }

  console.log("Affected records:");
  for (const [k, v] of Object.entries(stats)) console.log(`   ${k.padEnd(8)}: ${v}`);
  console.log(`\nSamples (max 25):\n${samples.join("\n") || "  (none)"}`);
  if (!APPLY && Object.values(stats).some(v => v > 0)) {
    console.log(`\n→ Re-run with --apply to write these fixes.`);
  }
}

main()
  .catch(e => { console.error("Error:", e); process.exit(1); })
  .finally(() => prisma.$disconnect());
