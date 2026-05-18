// Migrates "local-user" progress to cristiusa98@gmail.com
// Also ensures first 6 Python lessons are marked as completed for Cristi
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const CRISTI_ID = "cristiusa98@gmail.com";

async function main() {
  // 1. Migrate existing "local-user" records to Cristi
  const existing = await prisma.lessonProgress.findMany({ where: { userId: "local-user" } });
  console.log(`Found ${existing.length} local-user records to migrate...`);

  for (const rec of existing) {
    try {
      // Upsert as Cristi (merge if already exists, keeping the better data)
      const cristiRec = await prisma.lessonProgress.findUnique({
        where: { userId_lessonId: { userId: CRISTI_ID, lessonId: rec.lessonId } },
      });

      if (!cristiRec) {
        await prisma.lessonProgress.create({
          data: {
            userId: CRISTI_ID,
            lessonId: rec.lessonId,
            completedTasks: rec.completedTasks,
            wrongTasks: rec.wrongTasks,
            currentTaskIdx: rec.currentTaskIdx,
            currentTheoryIdx: rec.currentTheoryIdx,
            completed: rec.completed,
          },
        });
        console.log(`  ✓ Migrated lesson ${rec.lessonId}`);
      } else {
        console.log(`  - Lesson ${rec.lessonId} already exists for Cristi, skipping`);
      }
    } catch (e) {
      console.error(`  ✗ Failed ${rec.lessonId}:`, e.message);
    }
  }

  // 2. Mark first 6 Python lessons as completed for Cristi
  const pythonMod = await prisma.module.findUnique({ where: { slug: "python" } });
  if (!pythonMod) { console.error("Python module not found!"); return; }

  const pythonLessons = await prisma.lesson.findMany({
    where: { moduleId: pythonMod.id },
    orderBy: { order: "asc" },
    take: 6,
    include: { tasks: { select: { id: true } } },
  });

  console.log(`\nMarking first ${pythonLessons.length} Python lessons as completed for Cristi...`);
  for (const lesson of pythonLessons) {
    const allTaskIds = lesson.tasks.map(t => t.id);
    await prisma.lessonProgress.upsert({
      where: { userId_lessonId: { userId: CRISTI_ID, lessonId: lesson.id } },
      update: {
        completed: true,
        completedTasks: allTaskIds,
        wrongTasks: [],
        currentTaskIdx: allTaskIds.length,
      },
      create: {
        userId: CRISTI_ID,
        lessonId: lesson.id,
        completed: true,
        completedTasks: allTaskIds,
        wrongTasks: [],
        currentTaskIdx: allTaskIds.length,
        currentTheoryIdx: 4,
      },
    });
    console.log(`  ✓ ${lesson.title} (${allTaskIds.length} tasks)`);
  }

  console.log("\nDone!");
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
