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
    const currentModuleSlug = searchParams.get("moduleSlug");
    const count = Math.min(parseInt(searchParams.get("count") || "3"), 5);

    const currentModule = await prisma.module.findUnique({
      where: { slug: currentModuleSlug },
    });
    if (!currentModule) return NextResponse.json([]);

    // Previous modules (lower order)
    const prevModules = await prisma.module.findMany({
      where: { order: { lt: currentModule.order } },
      select: { id: true, title: true, slug: true },
    });
    if (prevModules.length === 0) return NextResponse.json([]);

    // Completed lessons from those modules
    const completedProgress = await prisma.lessonProgress.findMany({
      where: {
        userId,
        completed: true,
        lesson: { moduleId: { in: prevModules.map(m => m.id) } },
      },
      select: { lessonId: true },
    });
    if (completedProgress.length === 0) return NextResponse.json([]);

    const completedLessonIds = completedProgress.map(p => p.lessonId);

    // Sample tasks from completed lessons — quiz only (review UI only handles options)
    const allTasks = await prisma.task.findMany({
      where: { lessonId: { in: completedLessonIds }, type: "quiz" },
      include: {
        lesson: { include: { module: { select: { title: true, slug: true } } } },
      },
      take: count * 20,
    });

    if (allTasks.length === 0) return NextResponse.json([]);

    // Shuffle and pick
    const shuffled = [...allTasks].sort(() => Math.random() - 0.5);
    return NextResponse.json(shuffled.slice(0, count));
  } catch {
    return NextResponse.json([]);
  }
}
