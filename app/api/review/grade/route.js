import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getUserId } from "@/lib/auth";
import { schedule } from "@/lib/srs";

// Record a review outcome and reschedule the item (SM-2).
export async function POST(request) {
  try {
    const userId = await getUserId(request);
    const { taskId, grade } = await request.json();
    if (!taskId || !["again", "good", "easy"].includes(grade)) {
      return NextResponse.json({ error: "taskId + valid grade required" }, { status: 400 });
    }

    const existing = await prisma.reviewItem.findUnique({
      where: { userId_taskId: { userId, taskId } },
    });
    const next = schedule(existing, grade);

    const item = await prisma.reviewItem.upsert({
      where: { userId_taskId: { userId, taskId } },
      update: { due: next.due, intervalDays: next.intervalDays, ease: next.ease, reps: next.reps, lapses: next.lapses },
      create: { userId, taskId, due: next.due, intervalDays: next.intervalDays, ease: next.ease, reps: next.reps, lapses: next.lapses },
    });

    return NextResponse.json({ ok: true, due: item.due, intervalDays: item.intervalDays });
  } catch (e) {
    return NextResponse.json({ error: "DB error: " + e.message }, { status: 503 });
  }
}
