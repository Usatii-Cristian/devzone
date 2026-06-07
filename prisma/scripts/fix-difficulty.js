"use strict";
require("dotenv").config({ path: ".env" });
const { PrismaClient } = require("@prisma/client");
const p = new PrismaClient();

// Reassign difficulty by position within each lesson/type
// Position 1-2 → easy, 3-4 → medium, 5 → hard
const POS_DIFF = ["easy", "easy", "medium", "medium", "hard"];

async function main() {
  const lessons = await p.lesson.findMany({
    include: { tasks: { select: { id: true, type: true, difficulty: true, number: true } } },
  });

  let fixed = 0;

  for (const lesson of lessons) {
    for (const type of ["quiz", "fillblank", "coding"]) {
      const tasks = lesson.tasks
        .filter((t) => t.type === type)
        .sort((a, b) => a.number - b.number);

      for (let i = 0; i < Math.min(tasks.length, 5); i++) {
        const target = POS_DIFF[i];
        if (tasks[i].difficulty !== target) {
          await p.task.update({ where: { id: tasks[i].id }, data: { difficulty: target } });
          fixed++;
        }
      }
    }
  }

  console.log(`Fixed ${fixed} task difficulties.`);
  console.log("New distribution: pos1,2=easy | pos3,4=medium | pos5=hard");
}

main().catch(console.error).finally(() => p.$disconnect());
