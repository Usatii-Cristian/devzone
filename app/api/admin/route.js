import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import prisma from "@/lib/prisma";
import { getSecret } from "@/lib/auth";

async function requireAdmin(request) {
  try {
    const token = request.cookies.get("auth_token")?.value;
    if (!token) return null;
    const { payload } = await jwtVerify(token, getSecret());
    const email = String(payload.email || "");
    // Admin access: ONLY the primary account (AUTH_EMAIL).
    const admins = [process.env.AUTH_EMAIL].filter(Boolean);
    return admins.includes(email) ? email : null;
  } catch {
    return null;
  }
}

// GET — all modules+lessons, merged with user progress
export async function GET(request) {
  const admin = await requireAdmin(request);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  // All modules with all lessons
  const modules = await prisma.module.findMany({
    orderBy: { order: "asc" },
    include: {
      lessons: {
        orderBy: { order: "asc" },
        select: { id: true, title: true, order: true,
          tasks: { select: { id: true }, orderBy: { number: "asc" } },
        },
      },
    },
  });

  // All progress (filtered by userId if given)
  const allProgress = await prisma.lessonProgress.findMany({
    where: userId ? { userId } : {},
    orderBy: { updatedAt: "desc" },
  });

  // Build progress map: userId+lessonId → progress
  const progressMap = {};
  for (const p of allProgress) {
    progressMap[`${p.userId}::${p.lessonId}`] = p;
  }

  // Distinct userIds with activity
  const userIds = [...new Set(allProgress.map(p => p.userId))];

  // Build per-user data
  const users = userIds.map(uid => {
    const userProgress = allProgress.filter(p => p.userId === uid);
    const done = userProgress.filter(p => p.completed).length;
    const totalTasks = userProgress.reduce((s, p) => s + (p.completedTasks?.length || 0), 0);
    const totalWrong = userProgress.reduce((s, p) => s + (p.wrongTasks?.length || 0), 0);

    const userModules = modules.map(mod => ({
      id: mod.id,
      slug: mod.slug,
      title: mod.title,
      order: mod.order,
      lessons: mod.lessons.map(lesson => {
        const prog = progressMap[`${uid}::${lesson.id}`];
        return {
          lessonId: lesson.id,
          lessonTitle: lesson.title,
          lessonOrder: lesson.order,
          totalTaskCount: lesson.tasks.length,
          taskIds: lesson.tasks.map(t => t.id),
          // Current progress (null if not started)
          progressId: prog?.id || null,
          completed: prog?.completed || false,
          completedTasks: prog?.completedTasks?.length || 0,
          wrongTasks: prog?.wrongTasks?.length || 0,
          currentTaskIdx: prog?.currentTaskIdx || 0,
          updatedAt: prog?.updatedAt || null,
        };
      }),
    }));

    const doneLessonsInMod = (mod) => mod.lessons.filter(l => l.completed).length;

    return {
      userId: uid,
      done,
      total: userProgress.length,
      totalTasks,
      totalWrong,
      successRate: totalTasks > 0 ? Math.round((totalTasks / (totalTasks + totalWrong)) * 100) : 0,
      modules: userModules.map(m => ({
        ...m,
        doneLessons: m.lessons.filter(l => l.completed).length,
        totalLessons: m.lessons.length,
        hasAnyProgress: m.lessons.some(l => l.progressId !== null),
      })),
    };
  });

  // Return users + all modules structure (for adding new users/progress)
  return NextResponse.json({
    users,
    allModules: modules.map(mod => ({
      id: mod.id,
      slug: mod.slug,
      title: mod.title,
      order: mod.order,
      lessons: mod.lessons.map(l => ({
        id: l.id,
        title: l.title,
        order: l.order,
        totalTaskCount: l.tasks.length,
        taskIds: l.tasks.map(t => t.id),
      })),
    })),
  });
}

// POST — upsert progress for a user+lesson with specific counts
export async function POST(request) {
  const admin = await requireAdmin(request);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { userId, lessonId, completedTasksCount, wrongTasksCount, completed, taskIds } = await request.json();
  if (!userId || !lessonId) return NextResponse.json({ error: "userId + lessonId required" }, { status: 400 });

  // Build completedTasks array from real task IDs (first N)
  const allTaskIds = taskIds || [];
  const count = Math.max(0, Math.min(completedTasksCount ?? allTaskIds.length, allTaskIds.length));
  const completedTasks = allTaskIds.slice(0, count);
  const wrongCount = Math.max(0, wrongTasksCount ?? 0);
  // Use dummy wrong IDs if needed (these are just counters in practice)
  const wrongTasks = allTaskIds.slice(count, count + wrongCount);
  const isCompleted = completed ?? (count === allTaskIds.length && allTaskIds.length > 0);

  const progress = await prisma.lessonProgress.upsert({
    where: { userId_lessonId: { userId, lessonId } },
    update: {
      completedTasks,
      wrongTasks,
      completed: isCompleted,
      currentTaskIdx: count,
      currentTheoryIdx: 0,
    },
    create: {
      userId,
      lessonId,
      completedTasks,
      wrongTasks,
      completed: isCompleted,
      currentTaskIdx: count,
      currentTheoryIdx: 0,
    },
  });

  return NextResponse.json({ ok: true, progress });
}

// DELETE — reset progress (by user, module, or lesson)
export async function DELETE(request) {
  const admin = await requireAdmin(request);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { userId, moduleSlug, lessonId } = await request.json();
  if (!userId) return NextResponse.json({ error: "userId required" }, { status: 400 });

  let where = { userId };
  if (lessonId) {
    where.lessonId = lessonId;
  } else if (moduleSlug) {
    const lessons = await prisma.lesson.findMany({
      where: { module: { slug: moduleSlug } },
      select: { id: true },
    });
    where.lessonId = { in: lessons.map(l => l.id) };
  }

  const { count } = await prisma.lessonProgress.deleteMany({ where });
  return NextResponse.json({ ok: true, deleted: count });
}
