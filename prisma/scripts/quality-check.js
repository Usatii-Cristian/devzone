const { PrismaClient } = require("@prisma/client");
const p = new PrismaClient();

async function main() {
  // Ia 3 lecții din module diferite pentru inspecție
  const samples = [
    { slug: "python",     order: 3  },
    { slug: "javascript", order: 5  },
    { slug: "python",     order: 15 },
  ];

  for (const s of samples) {
    const lesson = await p.lesson.findFirst({
      where: { module: { slug: s.slug }, order: s.order },
      include: { tasks: { orderBy: { number: "asc" } } },
    });
    if (!lesson) continue;

    console.log(`\n${"=".repeat(60)}`);
    console.log(`MODUL: ${s.slug.toUpperCase()} | LECȚIE: ${lesson.title}`);
    console.log(`Total tasks: ${lesson.tasks.length}`);
    console.log("=".repeat(60));

    for (const t of lesson.tasks) {
      console.log(`\n[${t.type.toUpperCase()} | ${t.difficulty} | #${t.number}] ${t.name}`);
      console.log(`  Q: ${t.question.slice(0, 300)}`);
      if (t.type === "fillblank") {
        console.log(`  A: "${t.answer}"`);
        if (t.explanation) console.log(`  Expl: ${t.explanation.slice(0, 150)}`);
      }
      if (t.type === "coding") {
        console.log(`  Starter: ${(t.starterCode || "").slice(0, 150)}`);
        console.log(`  Expected: "${t.expectedOutput || ""}"`);
      }
      if (t.type === "quiz") {
        console.log(`  Options: ${(t.options || []).join(" | ")}`);
        console.log(`  Answer: "${t.answer}"`);
      }
    }
  }
}

main().catch(console.error).finally(() => p.$disconnect());
