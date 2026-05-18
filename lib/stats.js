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

export const XP_LEVELS = [
  { level: 1,  minXP: 0,     label: "Novice",       color: "from-slate-400 to-slate-500" },
  { level: 2,  minXP: 150,   label: "Apprentice",   color: "from-green-400 to-emerald-500" },
  { level: 3,  minXP: 400,   label: "Developer",    color: "from-teal-400 to-cyan-500" },
  { level: 4,  minXP: 800,   label: "Junior Dev",   color: "from-blue-400 to-indigo-500" },
  { level: 5,  minXP: 1500,  label: "Mid Dev",      color: "from-violet-400 to-purple-500" },
  { level: 6,  minXP: 2500,  label: "Senior Dev",   color: "from-pink-400 to-rose-500" },
  { level: 7,  minXP: 4000,  label: "Tech Lead",    color: "from-orange-400 to-amber-500" },
  { level: 8,  minXP: 6000,  label: "Architect",    color: "from-red-400 to-pink-500" },
  { level: 9,  minXP: 9000,  label: "Master",       color: "from-yellow-400 to-orange-500" },
  { level: 10, minXP: 13000, label: "Guru",         color: "from-yellow-300 to-yellow-500" },
];

export function computeXP(progress) {
  let xp = 0;
  for (const p of progress) {
    xp += (p.completedTasks?.length || 0) * 10;
    if (p.completed) xp += 50;
  }
  return xp;
}

export function computeLevel(xp) {
  let current = XP_LEVELS[0];
  for (let i = XP_LEVELS.length - 1; i >= 0; i--) {
    if (xp >= XP_LEVELS[i].minXP) { current = XP_LEVELS[i]; break; }
  }
  const nextIdx = XP_LEVELS.findIndex(l => l.level === current.level + 1);
  const next = nextIdx >= 0 ? XP_LEVELS[nextIdx] : null;
  const pct = next
    ? Math.round(((xp - current.minXP) / (next.minXP - current.minXP)) * 100)
    : 100;
  return { ...current, xp, next, pct };
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
