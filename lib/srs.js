// Spaced repetition scheduling — a small SM-2 variant. Pure (unit-tested).
// An "item" holds { intervalDays, ease, reps, lapses, due }. A review reports a
// grade: "again" (wrong), "good" (correct), or "easy" (correct & confident).

const DAY = 86400000;
const MIN_EASE = 1.3;

export function schedule(item, grade, now = Date.now()) {
  let { intervalDays = 0, ease = 2.5, reps = 0, lapses = 0 } = item || {};

  if (grade === "again") {
    // Lapse: reset reps, drop ease, re-show in ~10 minutes.
    return {
      intervalDays: 0,
      ease: Math.max(MIN_EASE, ease - 0.2),
      reps: 0,
      lapses: lapses + 1,
      due: new Date(now + 10 * 60000),
    };
  }

  reps += 1;
  if (reps === 1) intervalDays = grade === "easy" ? 3 : 1;
  else if (reps === 2) intervalDays = grade === "easy" ? 6 : 3;
  else intervalDays = Math.max(1, Math.round(intervalDays * ease * (grade === "easy" ? 1.3 : 1)));

  if (grade === "easy") ease = ease + 0.15;
  ease = Math.max(MIN_EASE, ease);

  return { intervalDays, ease, reps, lapses, due: new Date(now + intervalDays * DAY) };
}

export function isDue(item, now = Date.now()) {
  return !item?.due || new Date(item.due).getTime() <= now;
}

// Map a yes/no answer outcome to a grade (used by the review UI).
export function gradeFromCorrect(correct) {
  return correct ? "good" : "again";
}
