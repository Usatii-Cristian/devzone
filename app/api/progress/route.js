import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import prisma from "@/lib/prisma";

const SECRET = new TextEncoder().encode(process.env.AUTH_SECRET);

async function getUserId(request) {
  try {
    const token = request.cookies.get("auth_token")?.value;
    if (!token) return "local-user";
    const { payload } = await jwtVerify(token, SECRET);
    return String(payload.email || "local-user");
  } catch {
    return "local-user";
  }
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
    const { lessonId, completedTasks, wrongTasks, currentTaskIdx, currentTheoryIdx, completed } = body;

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
