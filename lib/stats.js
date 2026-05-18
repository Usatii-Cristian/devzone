function dayKey(d) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export function computeStreak(progress) {
  if (!progress?.length) return { current: 0, longest: 0, lastActive: null };

  const days = new Set();
  let lastActive = null;
  for (const p of progress) {
    if (!p.updatedAt) continue;
    const d = new Date(p.updatedAt);
    days.add(dayKey(d));
    if (!lastActive || d > lastActive) lastActive = d;
  }
  if (days.size === 0) return { current: 0, longest: 0, lastActive: null };

  const today = new Date();
  const todayKey = dayKey(today);
  const yesterday = new Date(today); yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayKey = dayKey(yesterday);

  let current = 0;
  let cursor = days.has(todayKey) ? today : days.has(yesterdayKey) ? yesterday : null;
  while (cursor && days.has(dayKey(cursor))) {
    current++;
    cursor.setDate(cursor.getDate() - 1);
  }

  // Longest streak: scan sorted dates
  const sorted = [...days].sort();
  let longest = 0, run = 1;
  for (let i = 1; i < sorted.length; i++) {
    const prev = new Date(sorted[i - 1]);
    const curr = new Date(sorted[i]);
    const diff = (curr - prev) / 86400000;
    if (diff === 1) run++;
    else { longest = Math.max(longest, run); run = 1; }
  }
  longest = Math.max(longest, run, current);

  return { current, longest, lastActive };
}

export function computeAchievements(progress, modules) {
  const completedCount = progress.filter(p => p.completed).length;
  const totalLessons = modules.reduce((sum, m) => sum + m.lessons.length, 0);

  const moduleCompletion = modules.map(m => {
    const ids = new Set(m.lessons.map(l => l.id));
    const done = progress.filter(p => p.completed && ids.has(p.lessonId)).length;
    return { slug: m.slug, title: m.title, done, total: m.lessons.length, full: m.lessons.length > 0 && done === m.lessons.length };
  });
  const modulesComplete = moduleCompletion.filter(m => m.full).length;
  const { current: streak } = computeStreak(progress);

  return [
    { id: "first-step",   title: "Primul pas",      desc: "Prima lecție finalizată",       iconKey: "target",   unlocked: completedCount >= 1, target: 1, current: completedCount },
    { id: "beginner",     title: "Începător",       desc: "5 lecții finalizate",           iconKey: "sprout",   unlocked: completedCount >= 5, target: 5, current: completedCount },
    { id: "apprentice",   title: "Ucenic",          desc: "15 lecții finalizate",          iconKey: "books",    unlocked: completedCount >= 15, target: 15, current: completedCount },
    { id: "scholar",      title: "Cărturar",        desc: "30 lecții finalizate",          iconKey: "cap",      unlocked: completedCount >= 30, target: 30, current: completedCount },
    { id: "master",       title: "Maestru",         desc: "50 lecții finalizate",          iconKey: "crown",    unlocked: completedCount >= 50, target: 50, current: completedCount },
    { id: "module-done",  title: "Modul complet",   desc: "Un modul finalizat 100%",       iconKey: "trophy",   unlocked: modulesComplete >= 1, target: 1, current: modulesComplete },
    { id: "polyglot",     title: "Poliglot",        desc: "3 module finalizate",           iconKey: "globe",    unlocked: modulesComplete >= 3, target: 3, current: modulesComplete },
    { id: "streak-3",     title: "Constanță",       desc: "Streak de 3 zile",              iconKey: "flame",    unlocked: streak >= 3, target: 3, current: streak },
    { id: "streak-7",     title: "O săptămână",     desc: "Streak de 7 zile",              iconKey: "zap",      unlocked: streak >= 7, target: 7, current: streak },
    { id: "streak-30",    title: "Devotat",         desc: "Streak de 30 zile",             iconKey: "gem",      unlocked: streak >= 30, target: 30, current: streak },
    { id: "completionist", title: "Completist",     desc: "Toate lecțiile finalizate",     iconKey: "sparkles", unlocked: totalLessons > 0 && completedCount === totalLessons, target: totalLessons, current: completedCount },
  ];
}
