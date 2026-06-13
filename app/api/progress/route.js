import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getUserId } from "@/lib/auth";
import { addActiveDay, computeStreakFromDays } from "@/lib/stats";

// Record a day of activity for accurate streaks. At most one write per day/user.
async function touchActivity(userId, day) {
  if (!day || !/^\d{4}-\d{2}-\d{2}$/.test(day)) return;
  const existing = await prisma.userStats.findUnique({ where: { userId } });
  if (existing && existing.lastActiveDay === day && existing.activeDays.includes(day)) return;
  const activeDays = addActiveDay(existing?.activeDays || [], day);
  const { current, longest } = computeStreakFromDays(activeDays, day);
  await prisma.userStats.upsert({
    where: { userId },
    update: { activeDays, currentStreak: current, longestStreak: Math.max(longest, existing?.longestStreak || 0), lastActiveDay: day },
    create: { userId, activeDays, currentStreak: current, longestStreak: longest, lastActiveDay: day },
  });
}

export async function GET(request) {
  try {
    const userId = await getUserId(request);
    const { searchParams } = new URL(request.url);
    const lessonId = searchParams.get("lessonId");

    const headers = { "Cache-Control": "no-store, no-cache, must-revalidate" };

    if (lessonId) {
      const progress = await prisma.lessonProgress.findUnique({
        where: { userId_lessonId: { userId, lessonId } },
      });
      return NextResponse.json(progress || null, { headers });
    }

    const allProgress = await prisma.lessonProgress.findMany({
      where: { userId },
    });
    return NextResponse.json(allProgress, { headers });
  } catch {
    return NextResponse.json([]);
  }
}

export async function POST(request) {
  try {
    const userId = await getUserId(request);
    const body = await request.json();
    const { lessonId, completedTasks, wrongTasks, currentTaskIdx, currentTheoryIdx, completed, day } = body;

    const data = {};
    if (completedTasks !== undefined) data.completedTasks = completedTasks;
    if (wrongTasks !== undefined) data.wrongTasks = wrongTasks;
    if (currentTaskIdx !== undefined) data.currentTaskIdx = currentTaskIdx;
    if (currentTheoryIdx !== undefined) data.currentTheoryIdx = currentTheoryIdx;
    if (completed !== undefined) data.completed = completed;

    const progress = await prisma.lessonProgress.upsert({
      where: { userId_lessonId: { userId, lessonId } },
      update: data,
      create: {
        userId,
        lessonId,
        completedTasks: completedTasks || [],
        wrongTasks: wrongTasks || [],
        currentTaskIdx: currentTaskIdx ?? 0,
        currentTheoryIdx: currentTheoryIdx ?? 0,
        completed: completed ?? false,
      },
    });

    if (day) { try { await touchActivity(userId, day); } catch {} }

    return NextResponse.json(progress);
  } catch (e) {
    return NextResponse.json({ error: "DB error: " + e.message }, { status: 503 });
  }
}

export async function DELETE(request) {
  try {
    const userId = await getUserId(request);
    const result = await prisma.lessonProgress.deleteMany({ where: { userId } });
    return NextResponse.json({ ok: true, deleted: result.count });
  } catch (e) {
    return NextResponse.json({ error: "DB error: " + e.message }, { status: 503 });
  }
}
