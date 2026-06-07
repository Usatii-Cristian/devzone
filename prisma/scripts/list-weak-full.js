"use strict";
const { PrismaClient } = require("@prisma/client");
const p = new PrismaClient();
async function main() {
  const args = process.argv.slice(2);
  const mod = args.find(a => a.startsWith("--module="))?.split("=")[1];
  const all = await p.theory.findMany({
    where: { content: { not: undefined }, lesson: { module: { slug: mod } } },
    include: { lesson: { include: { module: true } } },
    orderBy: [{ lesson: { order: "asc" } }, { order: "asc" }],
  });
  const weak = all.filter(t => t.content.length < 1500);
  for (const t of weak) {
    console.log(`${t.id} | ${t.lesson.title} | ${t.title} | ${t.content.length}chars`);
  }
  console.log(`\nTotal weak: ${weak.length}`);
  await p.$disconnect();
}
main().catch(console.error);
