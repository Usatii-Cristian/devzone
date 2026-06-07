"use strict";
require("dotenv").config({ path: ".env" });
const { PrismaClient } = require("@prisma/client");
const p = new PrismaClient();

async function main() {
  // Check: how many lessons have 0 hard quiz tasks?
  const lessons = await p.lesson.findMany({
    include: {
      tasks: { select: { type: true, difficulty: true, number: true, question: true } },
      module: { select: { slug: true, title: true } },
    },
  });

  let zeroHardQuiz = 0;
  let oneHardQuiz = 0;
  let twoHardQuiz = 0;
  let threeHardQuiz = 0;

  for (const l of lessons) {
    const hardCount = l.tasks.filter(t => t.type === "quiz" && t.difficulty === "hard").length;
    if (hardCount === 0) zeroHardQuiz++;
    else if (hardCount === 1) oneHardQuiz++;
    else if (hardCount === 2) twoHardQuiz++;
    else threeHardQuiz++;
  }

  console.log("=== Quiz Hard Count per Lesson ===");
  console.log(`0 hard tasks: ${zeroHardQuiz} lessons (${((zeroHardQuiz/562)*100).toFixed(1)}%)`);
  console.log(`1 hard task:  ${oneHardQuiz} lessons`);
  console.log(`2 hard tasks: ${twoHardQuiz} lessons`);
  console.log(`3+ hard tasks:${threeHardQuiz} lessons`);

  // Sample "easy" quiz questions from advanced modules
  const advancedEasy = await p.task.findMany({
    where: {
      type: "quiz",
      difficulty: "easy",
      lesson: { module: { slug: { in: ["cpp", "java", "cybersecurity", "csharp", "sql"] } } },
    },
    take: 6,
    select: { question: true, answer: true, lesson: { select: { title: true, module: { select: { slug: true } } } } },
  });

  console.log("\n=== Easy Quiz from Advanced Modules ===");
  advancedEasy.forEach((t, i) => {
    console.log(`  [${t.lesson.module.slug}] ${t.lesson.title.slice(0,40)}`);
    console.log(`  Q: ${t.question.slice(0,120)}`);
    console.log(`  A: ${t.answer}\n`);
  });

  // Sample "hard" quiz but check if they are actually hard
  const hardQuizSample = await p.task.findMany({
    where: { type: "quiz", difficulty: "hard", lesson: { module: { slug: { in: ["python", "javascript", "react"] } } } },
    take: 6,
    select: { question: true, answer: true, lesson: { select: { title: true, module: { select: { slug: true } } } } },
  });

  console.log("=== Hard Quiz from Beginner/Mid Modules ===");
  hardQuizSample.forEach((t, i) => {
    console.log(`  [${t.lesson.module.slug}] ${t.lesson.title.slice(0,40)}`);
    console.log(`  Q: ${t.question.slice(0,120)}`);
    console.log(`  A: ${t.answer}\n`);
  });

  // Check easy coding from advanced modules
  const advEasyCoding = await p.task.findMany({
    where: {
      type: "coding",
      difficulty: "easy",
      lesson: { module: { slug: { in: ["cpp", "java", "cybersecurity"] } } },
    },
    take: 4,
    select: { question: true, lesson: { select: { title: true, module: { select: { slug: true } } } } },
  });

  console.log("=== Easy Coding from Advanced Modules ===");
  advEasyCoding.forEach(t => {
    console.log(`  [${t.lesson.module.slug}] ${t.lesson.title.slice(0,40)}`);
    console.log(`  Q: ${t.question.slice(0,120)}\n`);
  });

  // Summary: what % of lessons have >= 2 hard quiz tasks?
  const adequateHard = twoHardQuiz + threeHardQuiz;
  console.log(`\n=== VERDICT ===`);
  console.log(`Lessons with >= 2 hard quiz: ${adequateHard}/${562} (${((adequateHard/562)*100).toFixed(1)}%)`);
  console.log(`Lessons with 0 hard quiz:    ${zeroHardQuiz}/${562} (${((zeroHardQuiz/562)*100).toFixed(1)}%)`);
}

main().catch(console.error).finally(() => p.$disconnect());
