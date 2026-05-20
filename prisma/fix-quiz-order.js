"use strict";
require("dotenv").config({ path: ".env" });
const { PrismaClient } = require("@prisma/client");
const p = new PrismaClient();

// Sort quiz tasks easy → medium → hard and shuffle options randomly
const DIFF_ORDER = { easy: 0, medium: 1, hard: 2 };

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

async function main() {
  const lessons = await p.lesson.findMany({ select: { id: true } });
  let fixed = 0;

  for (const lesson of lessons) {
    const quizTasks = await p.task.findMany({
      where: { lessonId: lesson.id, type: "quiz" },
      orderBy: { number: "asc" },
    });

    if (!quizTasks.length) continue;

    // Ensure max 5, delete excess
    if (quizTasks.length > 5) {
      const excess = quizTasks.slice(5);
      await p.task.deleteMany({ where: { id: { in: excess.map((t) => t.id) } } });
    }

    // Sort by difficulty easy → medium → hard
    const sorted = quizTasks
      .slice(0, 5)
      .sort((a, b) => (DIFF_ORDER[a.difficulty] ?? 1) - (DIFF_ORDER[b.difficulty] ?? 1));

    // Renumber 1-5 and shuffle options
    for (let i = 0; i < sorted.length; i++) {
      const t = sorted[i];
      const shuffledOptions = t.options?.length ? shuffle(t.options) : [];
      await p.task.update({
        where: { id: t.id },
        data: {
          number: i + 1,
          options: shuffledOptions,
        },
      });
      fixed++;
    }
  }

  console.log(`Fixed ${fixed} quiz tasks across ${lessons.length} lessons.`);
}

main()
  .catch(console.error)
  .finally(() => p.$disconnect());
