const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const modules = await prisma.module.findMany({
    orderBy: { order: "asc" },
    include: {
      lessons: {
        orderBy: { order: "asc" },
        include: { tasks: { select: { id: true, type: true, number: true } } },
      },
    },
  });

  for (const mod of modules) {
    console.log(`\n=== ${mod.title} (${mod.slug}) ===`);
    for (const l of mod.lessons) {
      const quiz = l.tasks.filter(t => t.type === "quiz").length;
      const coding = l.tasks.filter(t => t.type === "coding").length;
      const fill = l.tasks.filter(t => t.type === "fillblank").length;
      const total = l.tasks.length;
      const maxNum = l.tasks.reduce((m, t) => Math.max(m, t.number), 0);
      const needCoding = coding === 0 ? " ← ADD CODING" : "";
      console.log(`  L${l.order}. [${total} total | q:${quiz} c:${coding} f:${fill} | maxN:${maxNum}] ${l.title.slice(0,45)}${needCoding}`);
    }
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
