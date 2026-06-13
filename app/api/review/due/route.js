import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getUserId } from "@/lib/auth";

// The review queue: existing items that are due now, plus a few "new" cards
// seeded from tasks the user previously got wrong (wrongTasks) that don't have a
// review item yet. Only quiz/fillblank tasks are reviewable as flashcards.
export async function GET(request) {
  try {
    const userId = await getUserId(request);
    const now = new Date();
    const LIMIT = 20;

    const dueItems = await prisma.reviewItem.findMany({
      where: { userId, due: { lte: now } },
      orderBy: { due: "asc" },
      take: LIMIT,
    });
    const dueIds = dueItems.map((i) => i.taskId);

    let newIds = [];
    if (dueItems.length < LIMIT) {
      const progress = await prisma.lessonProgress.findMany({ where: { userId }, select: { wrongTasks: true } });
      const wrongIds = [...new Set(progress.flatMap((p) => p.wrongTasks || []))];
      if (wrongIds.length) {
        const existing = await prisma.reviewItem.findMany({
          where: { userId, taskId: { in: wrongIds } },
          select: { taskId: true },
        });
        const have = new Set(existing.map((e) => e.taskId));
        newIds = wrongIds.filter((id) => !have.has(id)).slice(0, LIMIT - dueItems.length);
      }
    }

    const allIds = [...dueIds, ...newIds];
    if (allIds.length === 0) return NextResponse.json({ cards: [], dueCount: 0 });

    const tasks = await prisma.task.findMany({
      where: { id: { in: allIds }, type: { in: ["quiz", "fillblank"] } },
      include: { lesson: { include: { module: { select: { title: true, slug: true } } } } },
    });
    const byId = new Map(tasks.map((t) => [t.id, t]));

    const cards = allIds
      .map((id) => byId.get(id))
      .filter(Boolean)
      .map((t) => ({
        taskId: t.id,
        type: t.type,
        question: t.question,
        options: t.options,
        answer: t.answer,
        explanation: t.explanation || "",
        lessonTitle: t.lesson?.title || "",
        moduleTitle: t.lesson?.module?.title || "",
        moduleSlug: t.lesson?.module?.slug || "",
      }));

    return NextResponse.json({ cards, dueCount: cards.length }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return NextResponse.json({ cards: [], dueCount: 0 });
  }
}
