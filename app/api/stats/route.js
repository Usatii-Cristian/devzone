import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getUserId } from "@/lib/auth";
import { computeStreakFromDays } from "@/lib/stats";

// Accurate streak + activity history (powers the dashboard heatmap).
export async function GET(request) {
  try {
    const userId = await getUserId(request);
    const today = new URL(request.url).searchParams.get("day") || new Date().toLocaleDateString("en-CA");
    const stats = await prisma.userStats.findUnique({ where: { userId } });
    const activeDays = stats?.activeDays || [];
    const streak = computeStreakFromDays(activeDays, today);
    return NextResponse.json(
      {
        activeDays,
        streak,
        today,
        activeToday: activeDays.includes(today),
        longestStreak: Math.max(streak.longest, stats?.longestStreak || 0),
      },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch {
    return NextResponse.json({ activeDays: [], streak: { current: 0, longest: 0 }, today: "", activeToday: false, longestStreak: 0 });
  }
}
