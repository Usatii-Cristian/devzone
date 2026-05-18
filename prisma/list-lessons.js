const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  const slug = process.argv[2];
  const mod = await prisma.module.findUnique({ where: { slug }, include: { lessons: { orderBy: { order: 'asc' } } } });
  if (!mod) { console.log('Module not found'); return; }
  for (const l of mod.lessons) {
    console.log(l.order, l.slug, '|', l.title);
  }
  await prisma.$disconnect();
}
main().catch(console.error);
