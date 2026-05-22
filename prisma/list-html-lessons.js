"use strict";
require("dotenv").config({ path: ".env" });
const { PrismaClient } = require("@prisma/client");
const p = new PrismaClient();
const from = parseInt(process.argv[2]) || 1;
const to   = parseInt(process.argv[3]) || 35;
p.lesson.findMany({
  where: { module: { slug: "html" }, order: { gte: from, lte: to } },
  include: { theory: { orderBy: { order: "asc" } } },
  orderBy: { order: "asc" }
}).then(ls => {
  ls.forEach(l => {
    console.log("L" + l.order + ": " + l.title);
    l.theory.forEach(t => console.log("  [" + t.content.length + "] " + t.title));
  });
  p.$disconnect();
});
