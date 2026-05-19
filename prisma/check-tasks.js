const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const modules = await prisma.module.findMany({
    orderBy: { order: "asc" },
    include: {
      lessons: {
        orderBy: { order: "asc" },
        take: 6,
        include: { tasks: { select: { type: true } } },
      },
    },
  });

  for (const mod of modules) {
    console.log(`\n=== ${mod.title} ===`);
    for (const l of mod.lessons) {
      const quiz = l.tasks.filter(t => t.type === "quiz").length;
      const coding = l.tasks.filter(t => t.type === "coding").length;
      const fill = l.tasks.filter(t => t.type === "fillblank").length;
      const flag = coding === 0 ? " ← NO CODING" : "";
      console.log(`  ${l.order}. ${l.title.slice(0, 40)} | quiz:${quiz} coding:${coding} fill:${fill}${flag}`);
    }
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
