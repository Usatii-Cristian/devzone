const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  const modules = await prisma.module.findMany({ orderBy: { order: 'asc' }, include: { lessons: { include: { tasks: true } } } });
  for (const m of modules) {
    const total = m.lessons.reduce((s, l) => s + l.tasks.length, 0);
    const coding = m.lessons.reduce((s, l) => s + l.tasks.filter(t => t.type === 'coding').length, 0);
    console.log(m.slug, '|', m.lessons.length, 'lessons |', total, 'tasks |', coding, 'coding');
  }
  await prisma.$disconnect();
}
main().catch(console.error);
