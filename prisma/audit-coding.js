const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const modules = await prisma.module.findMany({
    orderBy: { order: 'asc' },
    include: {
      lessons: {
        orderBy: { order: 'asc' },
        include: { tasks: { where: { type: 'coding' } } }
      }
    }
  });

  let totalLessons = 0, lessonsWithCoding = 0, lessonsWithout = 0;

  for (const m of modules) {
    const withCoding = m.lessons.filter(l => l.tasks.length > 0).length;
    const without = m.lessons.filter(l => l.tasks.length === 0).length;
    totalLessons += m.lessons.length;
    lessonsWithCoding += withCoding;
    lessonsWithout += without;
    console.log(`\n=== ${m.slug} (${m.lessons.length} lecții, ${withCoding} cu coding, ${without} fără) ===`);
    for (const l of m.lessons) {
      const n = l.tasks.length;
      if (n === 0) {
        console.log(`  ❌ [${l.order}] ${l.slug}`);
      }
    }
  }

  console.log(`\n=============================`);
  console.log(`Total lecții: ${totalLessons}`);
  console.log(`Cu coding tasks: ${lessonsWithCoding}`);
  console.log(`FĂRĂ coding tasks: ${lessonsWithout}`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
