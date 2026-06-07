"use strict";
require("dotenv").config({ path: ".env" });
const { PrismaClient } = require("@prisma/client");
const p = new PrismaClient();
p.theory.findMany({
  where: { lesson: { module: { slug: "javascript" } } },
  include: { lesson: true },
  orderBy: [{ lesson: { order: "asc" } }, { order: "asc" }],
}).then(rows => {
  rows.forEach(t => {
    const flag = t.content.length < 1500 ? " <<<" : "";
    console.log(`"${t.lesson.title}" / "${t.title}" (${t.content.length})${flag}`);
  });
  console.log("\nTotal:", rows.length, "  Weak:", rows.filter(t => t.content.length < 1500).length);
  p.$disconnect();
});
