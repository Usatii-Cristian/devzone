const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const slug = process.argv[2] || "python";
async function main() {
  const mod = await prisma.module.findFirst({
    where: { slug },
    include: { lessons: { orderBy: { order: "asc" }, select: { id: true, order: true, title: true } } },
  });
  mod.lessons.forEach(l => console.log(`${l.order}\t${l.id}\t${l.title}`));
  await prisma.$disconnect();
}
main().catch(console.error);
