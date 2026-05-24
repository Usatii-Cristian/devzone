const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();
p.lesson.findMany({ where: { module: { slug: 'csharp' } }, select: { title: true }, orderBy: { order: 'asc' } })
  .then(ls => { ls.forEach(l => console.log(l.title)); p.$disconnect(); })
  .catch(e => { console.error(e); p.$disconnect(); });
