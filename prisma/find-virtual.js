const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();
(async () => {
  const l = await p.lesson.findMany({ where: { module: { slug: 'java' }, title: { contains: 'Virtual' } } });
  for (const x of l) {
    console.log('LESSON:', JSON.stringify(x.title));
    const t = await p.theory.findMany({ where: { lessonId: x.id } });
    t.forEach(th => console.log('  THEORY:', JSON.stringify(th.title), '(' + th.content.length + ')'));
  }
  await p.$disconnect();
})();
