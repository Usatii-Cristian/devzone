"use strict";
require("dotenv").config({ path: ".env" });
const { PrismaClient } = require("@prisma/client");
const p = new PrismaClient();
p.lesson.findMany({
  where: { module: { slug: "c" } },
  include: { theory: { orderBy: { order: "asc" } } },
  orderBy: { order: "asc" }
}).then(ls => {
  ls.filter(l => l.order >= 31).forEach(l => {
    console.log("L" + l.order + ": " + JSON.stringify(l.title));
    l.theory.forEach(t => {
      if (t.content.length < 1200) {
        console.log("  WEAK [" + t.content.length + "] " + JSON.stringify(t.title));
      }
    });
  });
  p.$disconnect();
});
