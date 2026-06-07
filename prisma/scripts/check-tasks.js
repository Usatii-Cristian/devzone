const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const slugArg = process.argv[2]; // optional: filter by module slug

async function main() {
  const modules = await prisma.module.findMany({
    where: slugArg ? { slug: slugArg } : {},
    orderBy: { order: "asc" },
    include: {
      lessons: {
        orderBy: { order: "asc" },
        include: {
          tasks: { orderBy: { number: "asc" }, select: { type: true, question: true, number: true } },
          theory: { orderBy: { order: "asc" }, take: 3, select: { title: true } },
        },
      },
    },
  });

  for (const mod of modules) {
    console.log(`\n====== ${mod.title} (${mod.slug}) ======`);
    for (const l of mod.lessons) {
      const theoryTitles = l.theory.map(t => t.title).join(" | ");
      console.log(`\n  L${l.order}: "${l.title}"`);
      console.log(`  Teorie: ${theoryTitles || "(fara)"}`);
      if (l.tasks.length === 0) { console.log("  [FARA SARCINI]"); continue; }
      for (const t of l.tasks) {
        const q = (t.question || "").replace(/\n/g, " ").slice(0, 95);
        console.log(`  [${t.type}#${t.number}] ${q}`);
      }
    }
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
