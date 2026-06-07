"use strict";
require("dotenv").config({ path: ".env" });
const { PrismaClient } = require("@prisma/client");
const p = new PrismaClient();
async function main() {
  const slugs = ["cpp","java","csharp","php","tailwind","cybersecurity","nextjs-frontend","nextjs-backend","c","sql","react","javascript"];
  for (const slug of slugs) {
    const mod = await p.module.findFirst({
      where: { slug },
      include: { lessons: { orderBy: { order: "asc" }, select: { order: true, title: true } } },
    });
    if (!mod) continue;
    console.log("\n=== " + slug + " (" + mod.lessons.length + " lessons) ===");
    mod.lessons.forEach(l => console.log("  " + l.order + ". " + l.title));
  }
}
main().catch(console.error).finally(() => p["$disconnect"]());
