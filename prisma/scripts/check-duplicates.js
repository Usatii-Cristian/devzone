"use strict";
require("dotenv").config({ path: ".env" });
const { PrismaClient } = require("@prisma/client");
const p = new PrismaClient();

async function main() {
  const tasks = await p.task.findMany({
    where: { type: "coding", difficulty: "easy" },
    select: {
      question: true,
      lesson: { select: { module: { select: { slug: true } } } },
    },
  });

  const byMod = {};
  for (const t of tasks) {
    const slug = t.lesson.module.slug;
    if (!byMod[slug]) byMod[slug] = {};
    const q = t.question.slice(0, 70);
    byMod[slug][q] = (byMod[slug][q] || 0) + 1;
  }

  console.log("=== Duplicate easy coding tasks (appearing 3+ times per module) ===");
  let totalDups = 0;
  for (const [mod, qs] of Object.entries(byMod)) {
    const repeated = Object.entries(qs)
      .filter(([q, c]) => c > 2)
      .sort((a, b) => b[1] - a[1]);
    if (repeated.length) {
      console.log(`\n${mod}:`);
      repeated.forEach(([q, c]) => {
        console.log(`  x${c} -> "${q}"`);
        totalDups += c;
      });
    }
  }

  // Also check fillblank
  const fills = await p.task.findMany({
    where: { type: "fillblank", difficulty: "easy" },
    select: {
      question: true,
      lesson: { select: { module: { select: { slug: true } } } },
    },
  });

  const byModF = {};
  for (const t of fills) {
    const slug = t.lesson.module.slug;
    if (!byModF[slug]) byModF[slug] = {};
    const q = t.question.slice(0, 70);
    byModF[slug][q] = (byModF[slug][q] || 0) + 1;
  }

  console.log("\n=== Duplicate easy fillblank tasks (3+ times per module) ===");
  for (const [mod, qs] of Object.entries(byModF)) {
    const repeated = Object.entries(qs)
      .filter(([q, c]) => c > 2)
      .sort((a, b) => b[1] - a[1]);
    if (repeated.length) {
      console.log(`\n${mod}:`);
      repeated.forEach(([q, c]) => {
        console.log(`  x${c} -> "${q}"`);
      });
    }
  }

  console.log(`\nTotal duplicate easy coding task instances: ${totalDups}`);
}

main().catch(console.error).finally(() => p.$disconnect());
