"use strict";
require("dotenv").config({ path: ".env" });
const { PrismaClient } = require("@prisma/client");
const p = new PrismaClient();
p.lesson.findMany({
  where: { module: { slug: "javascript" }, order: { gte: 25 } },
  include: { theory: { orderBy: { order: "asc" } } },
  orderBy: { order: "asc" }
}).then(lessons => {
  lessons.forEach(l => {
    console.log("L" + l.order + ": " + l.title);
    l.theory.forEach(t => console.log("  [" + t.content.length + "] " + t.title));
  });
  p.$disconnect();
});
