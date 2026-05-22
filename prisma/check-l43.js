"use strict";
require("dotenv").config({ path: ".env" });
const { PrismaClient } = require("@prisma/client");
const p = new PrismaClient();
p.lesson.findMany({
  where: { module: { slug: "javascript" }, order: 43 },
  include: { theory: { orderBy: { order: "asc" } } }
}).then(ls => {
  ls.forEach(l => {
    console.log(l.title);
    l.theory.forEach(t => console.log("  [" + t.content.length + "] " + t.title));
  });
  p.$disconnect();
});
