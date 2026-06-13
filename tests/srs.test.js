import { describe, it, expect } from "vitest";
import { schedule, isDue, gradeFromCorrect } from "../lib/srs.js";

const NOW = Date.UTC(2026, 0, 1);
const DAY = 86400000;

describe("schedule", () => {
  it("first 'good' review → 1 day", () => {
    const r = schedule(null, "good", NOW);
    expect(r.intervalDays).toBe(1);
    expect(r.reps).toBe(1);
    expect(r.due.getTime()).toBe(NOW + DAY);
  });
  it("first 'easy' review → 3 days", () => {
    expect(schedule(null, "easy", NOW).intervalDays).toBe(3);
  });
  it("second 'good' review → 3 days", () => {
    const r2 = schedule(schedule(null, "good", NOW), "good", NOW);
    expect(r2.intervalDays).toBe(3);
    expect(r2.reps).toBe(2);
  });
  it("third 'good' grows by ease (3 * 2.5 ≈ 8)", () => {
    let item = schedule(null, "good", NOW);
    item = schedule(item, "good", NOW);
    const r3 = schedule(item, "good", NOW);
    expect(r3.intervalDays).toBe(8);
  });
  it("'again' resets reps, adds a lapse, reshows in ~10 min, lowers ease", () => {
    const r = schedule(schedule(null, "good", NOW), "again", NOW);
    expect(r.reps).toBe(0);
    expect(r.lapses).toBe(1);
    expect(r.due.getTime()).toBe(NOW + 10 * 60000);
    expect(r.ease).toBeLessThan(2.5);
  });
  it("never lets ease drop below 1.3", () => {
    let item = { intervalDays: 0, ease: 1.3, reps: 0, lapses: 0 };
    for (let i = 0; i < 5; i++) item = schedule(item, "again", NOW);
    expect(item.ease).toBe(1.3);
  });
});

describe("isDue", () => {
  it("an item without a due date is due", () => expect(isDue({})).toBe(true));
  it("past due", () => expect(isDue({ due: new Date(NOW - 1000) }, NOW)).toBe(true));
  it("future is not due", () => expect(isDue({ due: new Date(NOW + 1000) }, NOW)).toBe(false));
});

describe("gradeFromCorrect", () => {
  it("maps correctness to a grade", () => {
    expect(gradeFromCorrect(true)).toBe("good");
    expect(gradeFromCorrect(false)).toBe("again");
  });
});
