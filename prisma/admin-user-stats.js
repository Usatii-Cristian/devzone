// Afișează toate datele de progres pentru un utilizator
// Rulează: node prisma/admin-user-stats.js cristiusa98@gmail.com

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const userId = process.argv[2] || "cristiusa98@gmail.com";
  console.log(`\n========== DATE UTILIZATOR: ${userId} ==========\n`);

  const allProgress = await prisma.lessonProgress.findMany({
    where: { userId },
    include: {
      lesson: {
        select: {
          title: true,
          order: true,
          module: { select: { title: true, slug: true } },
        },
      },
    },
    orderBy: { updatedAt: "desc" },
  });

  if (allProgress.length === 0) {
    console.log("Nu există progres înregistrat pentru acest utilizator.");
    return;
  }

  const done = allProgress.filter(p => p.completed);
  const inProg = allProgress.filter(p => !p.completed && p.completedTasks.length > 0);
  const totalTasks = allProgress.reduce((s, p) => s + p.completedTasks.length, 0);
  const totalWrong = allProgress.reduce((s, p) => s + p.wrongTasks.length, 0);

  console.log(`📊 STATISTICI GENERALE:`);
  console.log(`   Lecții finalizate  : ${done.length}`);
  console.log(`   Lecții în progres  : ${inProg.length}`);
  console.log(`   Total lecții atinse: ${allProgress.length}`);
  console.log(`   Taskuri rezolvate  : ${totalTasks}`);
  console.log(`   Răspunsuri greșite : ${totalWrong}`);
  console.log(`   Rata de succes     : ${totalTasks > 0 ? Math.round((totalTasks / (totalTasks + totalWrong)) * 100) : 0}%`);

  // Group by module
  const byModule = {};
  for (const p of allProgress) {
    const modTitle = p.lesson.module.title;
    if (!byModule[modTitle]) byModule[modTitle] = { done: 0, inProg: 0, total: 0 };
    byModule[modTitle].total++;
    if (p.completed) byModule[modTitle].done++;
    else if (p.completedTasks.length > 0) byModule[modTitle].inProg++;
  }

  console.log(`\n📚 PROGRES PE MODULE:`);
  for (const [mod, s] of Object.entries(byModule)) {
    const bar = "█".repeat(s.done) + "░".repeat(s.inProg) + "·".repeat(s.total - s.done - s.inProg);
    console.log(`   ${mod.padEnd(30)} ${s.done}/${s.total} finalizate  [${bar}]`);
  }

  console.log(`\n📋 ULTIMELE 20 ACTIVITĂȚI:`);
  for (const p of allProgress.slice(0, 20)) {
    const status = p.completed ? "✅ DONE" : `⏳ ${p.completedTasks.length} taskuri`;
    console.log(`   ${status.padEnd(15)} ${p.lesson.module.title} → ${p.lesson.title}`);
  }

  console.log(`\n🗑️  PENTRU A ȘTERGE PROGRESUL ACESTUI UTILIZATOR:`);
  console.log(`   node prisma/admin-user-stats.js ${userId} --delete`);

  if (process.argv[3] === "--delete") {
    const { count } = await prisma.lessonProgress.deleteMany({ where: { userId } });
    console.log(`\n   ⚠️  ȘTERS: ${count} înregistrări de progres pentru ${userId}`);
  }
}

main()
  .catch(e => { console.error("Eroare:", e.message); process.exit(1); })
  .finally(() => prisma.$disconnect());
