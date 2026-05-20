"use strict";
require("dotenv").config({ path: ".env" });
const { PrismaClient } = require("@prisma/client");
const p = new PrismaClient();

async function main() {
  // 1. Total counts
  const totalLessons = await p.lesson.count();
  const totalTasks = await p.task.count();

  // 2. By type
  const byType = await p.task.groupBy({ by: ["type"], _count: { id: true } });

  // 3. By difficulty
  const byDiff = await p.task.groupBy({ by: ["difficulty"], _count: { id: true } });

  // 4. Lessons NOT at exactly 15 tasks
  const lessons = await p.lesson.findMany({
    include: { tasks: { select: { type: true, difficulty: true } } },
  });
  const bad = lessons.filter(l => l.tasks.length !== 15);
  const noQuiz = lessons.filter(l => l.tasks.filter(t => t.type === "quiz").length !== 5);
  const noCoding = lessons.filter(l => l.tasks.filter(t => t.type === "coding").length !== 5);
  const noFill = lessons.filter(l => l.tasks.filter(t => t.type === "fillblank").length !== 5);

  // 5. Difficulty distribution per type
  const quizDiff = { easy: 0, medium: 0, hard: 0, null: 0 };
  const codingDiff = { easy: 0, medium: 0, hard: 0, null: 0 };
  const fillDiff = { easy: 0, medium: 0, hard: 0, null: 0 };
  for (const l of lessons) {
    for (const t of l.tasks) {
      const bucket = t.type === "quiz" ? quizDiff : t.type === "coding" ? codingDiff : fillDiff;
      bucket[t.difficulty ?? "null"]++;
    }
  }

  // 6. Sample 3 hard tasks per type
  const hardQuiz = await p.task.findMany({ where: { type: "quiz", difficulty: "hard" }, take: 3, select: { question: true, answer: true, options: true } });
  const hardCoding = await p.task.findMany({ where: { type: "coding", difficulty: "hard" }, take: 3, select: { question: true, starterCode: true } });
  const hardFill = await p.task.findMany({ where: { type: "fillblank", difficulty: "hard" }, take: 3, select: { question: true, answer: true } });

  // 7. Sample 3 easy tasks per type (check if too simple)
  const easyQuiz = await p.task.findMany({ where: { type: "quiz", difficulty: "easy" }, take: 3, select: { question: true, options: true, answer: true } });
  const easyCoding = await p.task.findMany({ where: { type: "coding", difficulty: "easy" }, take: 3, select: { question: true, starterCode: true } });

  console.log("=== OVERALL ===");
  console.log(`Lessons: ${totalLessons} | Tasks: ${totalTasks} (expected ${totalLessons * 15})`);
  console.log("\n--- By type ---");
  byType.forEach(r => console.log(`  ${r.type}: ${r._count.id}`));
  console.log("\n--- By difficulty ---");
  byDiff.forEach(r => console.log(`  ${r.difficulty ?? "null"}: ${r._count.id}`));

  console.log("\n=== STRUCTURAL ISSUES ===");
  console.log(`Lessons != 15 tasks: ${bad.length}`);
  if (bad.length) bad.slice(0,5).forEach(l => console.log("  " + l.title + " — " + l.tasks.length));
  console.log(`Lessons != 5 quiz: ${noQuiz.length}`);
  console.log(`Lessons != 5 coding: ${noCoding.length}`);
  console.log(`Lessons != 5 fillblank: ${noFill.length}`);

  console.log("\n=== DIFFICULTY DISTRIBUTION PER TYPE ===");
  console.log("Quiz:    ", quizDiff);
  console.log("Coding:  ", codingDiff);
  console.log("Fill:    ", fillDiff);

  const totalQ = quizDiff.easy + quizDiff.medium + quizDiff.hard;
  const totalC = codingDiff.easy + codingDiff.medium + codingDiff.hard;
  const totalF = fillDiff.easy + fillDiff.medium + fillDiff.hard;
  console.log(`\nQuiz easy%:   ${((quizDiff.easy/totalQ)*100).toFixed(1)}%  medium: ${((quizDiff.medium/totalQ)*100).toFixed(1)}%  hard: ${((quizDiff.hard/totalQ)*100).toFixed(1)}%`);
  console.log(`Coding easy%: ${((codingDiff.easy/totalC)*100).toFixed(1)}%  medium: ${((codingDiff.medium/totalC)*100).toFixed(1)}%  hard: ${((codingDiff.hard/totalC)*100).toFixed(1)}%`);
  console.log(`Fill easy%:   ${((fillDiff.easy/totalF)*100).toFixed(1)}%  medium: ${((fillDiff.medium/totalC)*100).toFixed(1)}%  hard: ${((fillDiff.hard/totalF)*100).toFixed(1)}%`);

  console.log("\n=== SAMPLE HARD TASKS ===");
  console.log("\n-- Hard Quiz --");
  hardQuiz.forEach((t, i) => console.log(`  [${i+1}] ${t.question.slice(0,120)}\n      Answer: ${t.answer}`));
  console.log("\n-- Hard Coding --");
  hardCoding.forEach((t, i) => console.log(`  [${i+1}] ${t.question.slice(0,120)}`));
  console.log("\n-- Hard Fillblank --");
  hardFill.forEach((t, i) => console.log(`  [${i+1}] ${t.question.slice(0,120)}\n      Answer: ${t.answer}`));

  console.log("\n=== SAMPLE EASY TASKS (check simplicity) ===");
  console.log("\n-- Easy Quiz --");
  easyQuiz.forEach((t, i) => console.log(`  [${i+1}] ${t.question.slice(0,120)}\n      Answer: ${t.answer}`));
  console.log("\n-- Easy Coding --");
  easyCoding.forEach((t, i) => console.log(`  [${i+1}] ${t.question.slice(0,120)}`));
}

main().catch(console.error).finally(() => p.$disconnect());
