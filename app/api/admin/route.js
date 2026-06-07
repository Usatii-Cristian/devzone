import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import prisma from "@/lib/prisma";
import { getSecret } from "@/lib/auth";

const ADMIN_EMAILS = [
  process.env.AUTH_EMAIL,
  process.env.AUTH_EMAIL2,
].filter(Boolean);

async function requireAdmin(request) {
  try {
    const token = request.cookies.get("auth_token")?.value;
    if (!token) return null;
    const { payload } = await jwtVerify(token, getSecret());
    const email = String(payload.email || "");
    return ADMIN_EMAILS.includes(email) ? email : null;
  } catch {
    return null;
  }
}

// GET — fetch all progress data grouped by user
export async function GET(request) {
  const admin = await requireAdmin(request);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  const allProgress = await prisma.lessonProgress.findMany({
    where: userId ? { userId } : {},
    include: {
      lesson: {
        select: {
          id: true,
          title: true,
          order: true,
          module: { select: { id: true, title: true, slug: true, order: true } },
        },
      },
    },
    orderBy: { updatedAt: "desc" },
  });

  // Group by userId
  const byUser = {};
  for (const p of allProgress) {
    if (!byUser[p.userId]) byUser[p.userId] = [];
    byUser[p.userId].push(p);
  }

  // Compute stats per user
  const users = Object.entries(byUser).map(([uid, progresses]) => {
    const done = progresses.filter(p => p.completed).length;
    const totalTasks = progresses.reduce((s, p) => s + (p.completedTasks?.length || 0), 0);
    const totalWrong = progresses.reduce((s, p) => s + (p.wrongTasks?.length || 0), 0);

    // Group by module
    const byModule = {};
    for (const p of progresses) {
      const mod = p.lesson.module;
      if (!byModule[mod.slug]) {
        byModule[mod.slug] = {
          id: mod.id,
          slug: mod.slug,
          title: mod.title,
          order: mod.order,
          lessons: [],
        };
      }
      byModule[mod.slug].lessons.push({
        progressId: p.id,
        lessonId: p.lessonId,
        lessonTitle: p.lesson.title,
        lessonOrder: p.lesson.order,
        completed: p.completed,
        completedTasks: p.completedTasks?.length || 0,
        wrongTasks: p.wrongTasks?.length || 0,
        currentTaskIdx: p.currentTaskIdx,
        updatedAt: p.updatedAt,
      });
    }

    // Sort modules and lessons
    const modules = Object.values(byModule)
      .sort((a, b) => a.order - b.order)
      .map(m => ({
        ...m,
        lessons: m.lessons.sort((a, b) => a.lessonOrder - b.lessonOrder),
        doneLessons: m.lessons.filter(l => l.completed).length,
        totalLessons: m.lessons.length,
      }));

    return {
      userId: uid,
      done,
      total: progresses.length,
      totalTasks,
      totalWrong,
      successRate: totalTasks > 0 ? Math.round((totalTasks / (totalTasks + totalWrong)) * 100) : 0,
      modules,
    };
  });

  return NextResponse.json(users);
}

// DELETE — reset progress
export async function DELETE(request) {
  const admin = await requireAdmin(request);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { userId, moduleSlug, lessonId } = await request.json();
  if (!userId) return NextResponse.json({ error: "userId required" }, { status: 400 });

  let where = { userId };

  if (lessonId) {
    // Reset single lesson
    where.lessonId = lessonId;
  } else if (moduleSlug) {
    // Reset all lessons in a module
    const lessons = await prisma.lesson.findMany({
      where: { module: { slug: moduleSlug } },
      select: { id: true },
    });
    where.lessonId = { in: lessons.map(l => l.id) };
  }
  // else: reset everything for this user

  const { count } = await prisma.lessonProgress.deleteMany({ where });
  return NextResponse.json({ ok: true, deleted: count });
}
