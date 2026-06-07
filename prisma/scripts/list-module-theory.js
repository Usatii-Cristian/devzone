"use strict";
require("dotenv").config({ path: ".env" });
const { PrismaClient } = require("@prisma/client");
const p = new PrismaClient();
const slug = process.argv[2] || "html";
p.lesson.findMany({
  where: { module: { slug } },
  include: { theory: { orderBy: { order: "asc" } } },
  orderBy: { order: "asc" }
}).then(ls => {
  let weak = 0;
  ls.forEach(l => {
    const bad = l.theory.filter(t => t.content.length < 1500);
    if (bad.length) {
      console.log("L" + l.order + ": " + l.title);
      bad.forEach(t => console.log("  [" + t.content.length + "] " + t.title));
      weak += bad.length;
    }
  });
  console.log("\nWeak sections: " + weak);
  p.$disconnect();
});
