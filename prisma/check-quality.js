"use strict";
const { PrismaClient } = require("@prisma/client");
const p = new PrismaClient();
async function main() {
  const t = await p.theory.findFirst({
    where: { lesson: { module: { slug: "sql" } }, title: { contains: "UPDATE" } },
    select: { content: true, title: true }
  });
  if (t) {
    console.log("=== GROQ NEW PROMPT — \"" + t.title + "\" ===");
    console.log("Lungime: " + t.content.length + " chars\n");
    console.log(t.content);
  }
  await p.$disconnect();
}
main().catch(console.error);
