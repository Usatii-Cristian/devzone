import { describe, it, expect } from "vitest";
import {
  addActiveDay, computeStreakFromDays, buildHeatmap,
  computeXP, computeLevel, computeStreak,
} from "../lib/stats.js";

describe("addActiveDay", () => {
  it("dedupes and sorts", () => {
    expect(addActiveDay(["2026-01-02", "2026-01-01"], "2026-01-02"))
      .toEqual(["2026-01-01", "2026-01-02"]);
  });
  it("adds a brand new day", () => {
    expect(addActiveDay([], "2026-06-13")).toEqual(["2026-06-13"]);
  });
});

describe("computeStreakFromDays", () => {
  it("counts consecutive days ending today", () => {
    expect(computeStreakFromDays(["2026-06-11", "2026-06-12", "2026-06-13"], "2026-06-13").current).toBe(3);
  });
  it("stays alive if the last active day was yesterday", () => {
    expect(computeStreakFromDays(["2026-06-11", "2026-06-12"], "2026-06-13").current).toBe(2);
  });
  it("breaks on a gap", () => {
    expect(computeStreakFromDays(["2026-06-09", "2026-06-12", "2026-06-13"], "2026-06-13").current).toBe(2);
  });
  it("is zero when nothing is recent", () => {
    expect(computeStreakFromDays(["2026-06-01"], "2026-06-13").current).toBe(0);
  });
  it("finds the longest historical run", () => {
    expect(computeStreakFromDays(["2026-01-01", "2026-01-02", "2026-01-03", "2026-02-01"], "2026-02-01").longest).toBe(3);
  });
  it("handles month boundaries", () => {
    expect(computeStreakFromDays(["2026-01-31", "2026-02-01"], "2026-02-01").current).toBe(2);
  });
});

describe("buildHeatmap", () => {
  it("returns N days ending today and flags active", () => {
    const h = buildHeatmap(["2026-06-13"], "2026-06-13", 7);
    expect(h.length).toBe(7);
    expect(h[6]).toEqual({ day: "2026-06-13", active: true });
    expect(h[0].active).toBe(false);
  });
});

describe("computeXP / computeLevel", () => {
  it("awards 10 XP per task and 50 per completed lesson", () => {
    expect(computeXP([{ completedTasks: ["a", "b"], completed: true }])).toBe(2 * 10 + 50);
    expect(computeXP([{ completedTasks: ["a"], completed: false }])).toBe(10);
  });
  it("level 1 at 0 XP and rises with XP", () => {
    expect(computeLevel(0).level).toBe(1);
    expect(computeLevel(135000).level).toBeGreaterThanOrEqual(20);
  });
});

describe("computeStreak (legacy, progress-based)", () => {
  it("handles empty progress", () => {
    expect(computeStreak([]).current).toBe(0);
  });
});
