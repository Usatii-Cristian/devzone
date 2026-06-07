// Finds lessons with duplicated fillblank tasks and outputs lesson IDs + titles for fixing
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const slugArg = process.argv[2];

async function main() {
  const mods = await prisma.module.findMany({
    where: slugArg ? { slug: slugArg } : {},
    orderBy: { order: "asc" },
    include: {
      lessons: {
        orderBy: { order: "asc" },
        include: {
          tasks: { where: { number: 6 }, select: { question: true } },
          theory: { orderBy: { order: "asc" }, take: 2, select: { title: true } },
        },
      },
    },
  });

  for (const mod of mods) {
    const seen = new Map(); // question -> first lessonId
    const dupes = [];
    for (const l of mod.lessons) {
      const q = l.tasks[0]?.question || "";
      if (!q) continue;
      if (seen.has(q)) {
        dupes.push({ id: l.id, order: l.order, title: l.title, theory: l.theory.map(t => t.title).join(" | ") });
      } else {
        seen.set(q, l.id);
      }
    }
    if (dupes.length > 0) {
      console.log(`\n=== ${mod.slug} (${dupes.length} dupes) ===`);
      dupes.forEach(d => console.log(`  ${d.order}\t${d.id}\t${d.title} | THEORY: ${d.theory}`));
    }
  }
  await prisma.$disconnect();
}
main().catch(console.error);
