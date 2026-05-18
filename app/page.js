"use client";
import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Dumbbell, CheckCircle, Clock, BookMarked, ChevronRight, Play, Star, Code2, Flame, Award, Search, BookOpen } from "lucide-react";
import Navbar from "@/components/Navbar";
import ThemeToggle from "@/components/ThemeToggle";
import SearchModal from "@/components/SearchModal";
import AchievementIcon from "@/components/AchievementIcon";
import { computeStreak, computeAchievements, computeXP, computeLevel } from "@/lib/stats";
import { ModIcon, MOD_BG } from "@/lib/moduleIcons";

export default function Home() {
  const [modules, setModules] = useState([]);
  const [progress, setProgress] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    Promise.all([fetch("/api/modules"), fetch("/api/progress")])
      .then(([m, p]) => Promise.all([m.json(), p.json()]))
      .then(([mods, prog]) => {
        setModules(Array.isArray(mods) ? mods : []);
        setProgress(Array.isArray(prog) ? prog : []);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const progressMap = useMemo(() => {
    const m = new Map();
    for (const p of progress) m.set(p.lessonId, p);
    return m;
  }, [progress]);

  function stats(mod) {
    let done = 0, inProgress = 0;
    for (const l of mod.lessons) {
      const p = progressMap.get(l.id);
      if (!p) continue;
      if (p.completed) done++;
      else if (p.completedTasks?.length > 0) inProgress++;
    }
    return { done, inProgress, total: mod.lessons.length };
  }

  const continueLesson = useMemo(() => {
    if (!modules.length || !progress.length) return null;
    const lessonToMod = new Map();
    for (const mod of modules) {
      for (const l of mod.lessons) lessonToMod.set(l.id, { mod, lesson: l });
    }
    let best = null;
    for (const p of progress) {
      if (p.completed) continue;
      if (!p.completedTasks?.length) continue;
      const entry = lessonToMod.get(p.lessonId);
      if (!entry) continue;
      if (!best || p.completedTasks.length > best.p.completedTasks.length) {
        best = { p, ...entry };
      }
    }
    return best;
  }, [modules, progress]);

  const streak = useMemo(() => computeStreak(progress), [progress]);
  const achievements = useMemo(() => computeAchievements(progress, modules), [progress, modules]);
  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const xp = useMemo(() => computeXP(progress), [progress]);
  const level = useMemo(() => computeLevel(xp), [xp]);

  const totalDone = useMemo(() => progress.filter(p => p.completed).length, [progress]);
  const totalInProgress = useMemo(
    () => progress.filter(p => !p.completed && p.completedTasks?.length > 0).length,
    [progress]
  );
  const totalLessons = useMemo(() => modules.reduce((acc, m) => acc + m.lessons.length, 0), [modules]);
  const overallPct = totalLessons > 0 ? Math.round((totalDone / totalLessons) * 100) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 pb-28">
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} modules={modules}/>

      {/* Header */}
      <header className="bg-gradient-to-r from-indigo-700 to-purple-700 text-white shadow-lg sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 py-2.5 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <Image src="/logo.png" alt="DevZone" width={40} height={40} priority className="w-10 h-10 rounded-xl shadow-lg flex-shrink-0"/>
            <span className="font-black text-base tracking-tight truncate">DevZone</span>
          </div>
          <div className="flex items-center gap-1.5">
            <button onClick={() => setSearchOpen(true)} title="Caută (Ctrl+K)"
              className="p-2 rounded-xl bg-white/15 hover:bg-white/25 transition-colors text-white active:scale-95">
              <Search className="w-4 h-4"/>
            </button>
            <ThemeToggle/>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-5 sm:py-8">
        {/* Profile card */}
        <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-3xl p-5 sm:p-6 mb-5 sm:mb-6 text-white shadow-xl">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/20 rounded-2xl flex items-center justify-center text-xl sm:text-2xl font-black shadow-inner flex-shrink-0">C</div>
            <div className="flex-1 min-w-0">
              <p className="text-indigo-200 text-[10px] sm:text-xs font-semibold uppercase tracking-widest mb-0.5">Bine ai venit</p>
              <h1 className="text-lg sm:text-xl font-black leading-tight">Bine ai venit!</h1>
              {!loading && totalLessons > 0 && (
                <div className="mt-2">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-indigo-200 text-[11px] sm:text-xs">{totalDone}/{totalLessons} lecții</p>
                    <p className="text-yellow-300 text-[11px] sm:text-xs font-black">{overallPct}%</p>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div className="h-2 rounded-full bg-gradient-to-r from-yellow-300 to-emerald-300 transition-all duration-500"
                      style={{ width: `${overallPct}%` }}/>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Level + XP bar */}
          <div className="mt-3 bg-white/10 rounded-2xl px-3 py-2.5">
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <span className={`text-[10px] font-black px-2 py-0.5 rounded-full bg-gradient-to-r ${level.color} text-white`}>
                  Niv. {level.level}
                </span>
                <span className="text-white/90 text-xs font-black">{level.label}</span>
              </div>
              <span className="text-yellow-300 text-xs font-black">{xp} XP</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div className={`h-2 rounded-full bg-gradient-to-r ${level.color} transition-all duration-700`}
                style={{ width: `${level.pct}%` }}/>
            </div>
            {level.next && (
              <p className="text-indigo-200 text-[10px] mt-1 text-right">{level.next.minXP - xp} XP până la {level.next.label}</p>
            )}
          </div>

          {/* Stats — responsive grid (always visible) */}
          <div className="grid grid-cols-4 gap-1.5 sm:gap-2 mt-3 text-center">
            <div className="bg-white/15 rounded-xl sm:rounded-2xl py-2 sm:py-2.5">
              <p className="text-base sm:text-xl font-black text-yellow-300">{totalDone}</p>
              <p className="text-[10px] sm:text-xs text-indigo-200 mt-0.5 flex items-center justify-center gap-0.5 sm:gap-1">
                <CheckCircle className="w-2.5 h-2.5 sm:w-3 sm:h-3"/> Gata
              </p>
            </div>
            <div className="bg-white/15 rounded-xl sm:rounded-2xl py-2 sm:py-2.5">
              <p className="text-base sm:text-xl font-black text-emerald-300">{totalInProgress}</p>
              <p className="text-[10px] sm:text-xs text-indigo-200 mt-0.5 flex items-center justify-center gap-0.5 sm:gap-1">
                <Clock className="w-2.5 h-2.5 sm:w-3 sm:h-3"/> Activ
              </p>
            </div>
            <div className="bg-white/15 rounded-xl sm:rounded-2xl py-2 sm:py-2.5">
              <p className="text-base sm:text-xl font-black text-orange-300 flex items-center justify-center gap-0.5">
                {streak.current > 0 && <Flame className="w-3 h-3 sm:w-4 sm:h-4 fill-current"/>}{streak.current}
              </p>
              <p className="text-[10px] sm:text-xs text-indigo-200 mt-0.5">Streak</p>
            </div>
            <div className="bg-white/15 rounded-xl sm:rounded-2xl py-2 sm:py-2.5">
              <p className="text-base sm:text-xl font-black text-pink-300">{unlockedCount}</p>
              <p className="text-[10px] sm:text-xs text-indigo-200 mt-0.5 flex items-center justify-center gap-0.5 sm:gap-1">
                <Award className="w-2.5 h-2.5 sm:w-3 sm:h-3"/> Badge
              </p>
            </div>
          </div>
        </div>

        {/* Continue where you left off */}
        {!loading && continueLesson && (
          <div className="mb-5 sm:mb-6">
            <div className={`bg-gradient-to-r ${MOD_BG[continueLesson.mod.slug] || "from-indigo-500 to-purple-600"} rounded-2xl p-3.5 sm:p-4 flex items-center gap-3 shadow-lg`}>
              <div className="w-10 h-10 sm:w-11 sm:h-11 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <ModIcon slug={continueLesson.mod.slug} className="w-5 h-5 sm:w-6 sm:h-6 text-white"/>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white/70 text-[10px] sm:text-xs font-bold uppercase tracking-wider truncate">{continueLesson.mod.title} · Continuă</p>
                <p className="text-white font-black text-sm truncate mt-0.5">{continueLesson.lesson.title}</p>
                <p className="text-white/60 text-[11px] sm:text-xs mt-0.5">
                  {continueLesson.p.completedTasks.length} întrebări completate
                </p>
              </div>
              <Link href={`/modules/${continueLesson.mod.slug}/lessons/${continueLesson.lesson.id}`}
                className="bg-white text-indigo-700 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl font-black text-xs sm:text-sm hover:bg-indigo-50 transition-colors flex items-center gap-1.5 flex-shrink-0 shadow-sm active:scale-95">
                <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current"/> <span className="hidden xs:inline">Continuă</span><span className="xs:hidden">Du-te</span>
              </Link>
            </div>
          </div>
        )}

        {/* Achievements preview */}
        {!loading && totalDone > 0 && (
          <div className="mb-5 sm:mb-6 bg-white dark:bg-slate-800 rounded-2xl p-3.5 sm:p-4 shadow-sm">
            <div className="flex items-center justify-between mb-3 gap-2">
              <h2 className="text-sm font-black text-slate-800 dark:text-white flex items-center gap-1.5 min-w-0">
                <Award className="w-4 h-4 text-pink-500 flex-shrink-0"/>
                <span className="truncate">Realizări</span>
                <span className="text-slate-400 dark:text-slate-500 font-bold flex-shrink-0">{unlockedCount}/{achievements.length}</span>
              </h2>
              {streak.current > 0 && (
                <span className="text-[10px] sm:text-xs font-black bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300 px-2 sm:px-2.5 py-1 rounded-full flex items-center gap-1 flex-shrink-0">
                  <Flame className="w-3 h-3 fill-current"/> {streak.current} zile
                </span>
              )}
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide -mx-1 px-1">
              {achievements.map(a => (
                <div key={a.id}
                  title={`${a.title} — ${a.desc}`}
                  className={`flex-shrink-0 w-[68px] h-[78px] sm:w-20 sm:h-20 rounded-2xl flex flex-col items-center justify-center text-center transition-all px-1 gap-1
                    ${a.unlocked
                      ? "bg-gradient-to-br from-pink-100 to-yellow-100 dark:from-pink-900/40 dark:to-yellow-900/40 shadow-sm"
                      : "bg-slate-100 dark:bg-slate-700/50 opacity-50"}`}>
                  <AchievementIcon iconKey={a.iconKey}
                    className={`w-6 h-6 sm:w-7 sm:h-7 ${a.unlocked ? "text-pink-600 dark:text-pink-300" : "text-slate-400 dark:text-slate-500"}`}/>
                  <span className={`text-[9px] sm:text-[10px] font-bold leading-tight
                    ${a.unlocked ? "text-pink-700 dark:text-pink-300" : "text-slate-400 dark:text-slate-500"}`}>{a.title}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quick actions — bigger touch targets on mobile */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-5 sm:mb-6">
          <Link href="/antrenament"
            className="bg-gradient-to-br from-yellow-400 to-orange-400 rounded-2xl p-3 sm:p-4 flex flex-col items-center justify-center gap-1.5 sm:gap-2 shadow-sm hover:shadow-md transition-all min-h-[88px] active:scale-95">
            <div className="w-10 h-10 sm:w-11 sm:h-11 bg-white/25 rounded-xl flex items-center justify-center flex-shrink-0">
              <Dumbbell className="w-5 h-5 sm:w-6 sm:h-6 text-white"/>
            </div>
            <p className="font-black text-white text-xs sm:text-sm leading-tight">Exersează</p>
          </Link>
          <Link href="/proiecte"
            className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-3 sm:p-4 flex flex-col items-center justify-center gap-1.5 sm:gap-2 shadow-sm hover:shadow-md transition-all min-h-[88px] active:scale-95">
            <div className="w-10 h-10 sm:w-11 sm:h-11 bg-white/25 rounded-xl flex items-center justify-center flex-shrink-0">
              <Star className="w-5 h-5 sm:w-6 sm:h-6 text-white"/>
            </div>
            <p className="font-black text-white text-xs sm:text-sm leading-tight">Proiecte</p>
          </Link>
          <Link href="/editor"
            className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-3 sm:p-4 flex flex-col items-center justify-center gap-1.5 sm:gap-2 shadow-sm hover:shadow-md transition-all min-h-[88px] active:scale-95">
            <div className="w-10 h-10 sm:w-11 sm:h-11 bg-white/25 rounded-xl flex items-center justify-center flex-shrink-0">
              <Code2 className="w-5 h-5 sm:w-6 sm:h-6 text-white"/>
            </div>
            <p className="font-black text-white text-xs sm:text-sm leading-tight">Editor</p>
          </Link>
          <Link href="/dictionar"
            className="bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl p-3 sm:p-4 flex flex-col items-center justify-center gap-1.5 sm:gap-2 shadow-sm hover:shadow-md transition-all min-h-[88px] active:scale-95">
            <div className="w-10 h-10 sm:w-11 sm:h-11 bg-white/25 rounded-xl flex items-center justify-center flex-shrink-0">
              <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-white"/>
            </div>
            <p className="font-black text-white text-xs sm:text-sm leading-tight">Dicționar</p>
          </Link>
        </div>

        {/* Modules */}
        <h2 className="text-base sm:text-lg font-black text-indigo-900 dark:text-indigo-300 mb-3 sm:mb-4 flex items-center gap-2">
          <BookMarked className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 dark:text-indigo-400"/> Module de învățare
        </h2>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm animate-pulse">
                <div className="h-16 bg-gradient-to-r from-slate-200 to-slate-100 dark:from-slate-700 dark:to-slate-600"/>
                <div className="p-4 space-y-2">
                  <div className="h-3 bg-slate-100 dark:bg-slate-700 rounded-full w-3/4"/>
                  <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full w-full"/>
                </div>
              </div>
            ))}
          </div>
        ) : modules.length === 0 ? (
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-10 text-center shadow-sm">
            <p className="text-slate-600 dark:text-slate-300 font-semibold">Baza de date nu e conectată.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {modules.map(mod => {
              const s = stats(mod);
              const pct = s.total > 0 ? Math.round((s.done / s.total) * 100) : 0;
              const hasLessons = mod.lessons.length > 0;
              const bg = MOD_BG[mod.slug] || "from-slate-500 to-slate-700";
              return (
                <Link key={mod.id} href={hasLessons ? `/modules/${mod.slug}` : "#"}
                  className={`bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all group block active:scale-[0.98] ${!hasLessons ? "opacity-60 pointer-events-none" : ""}`}>
                  <div className={`bg-gradient-to-r ${bg} p-3.5 sm:p-4 flex items-center gap-3`}>
                    <div className="w-10 h-10 sm:w-11 sm:h-11 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <ModIcon slug={mod.slug} className="w-5 h-5 sm:w-6 sm:h-6 text-white"/>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-black text-white text-sm sm:text-base leading-tight">{mod.title}</h3>
                      <p className="text-white/70 text-[11px] sm:text-xs truncate mt-0.5">{mod.description}</p>
                    </div>
                    {!hasLessons
                      ? <span className="text-[10px] sm:text-xs bg-white/20 text-white px-2 py-0.5 rounded-full flex-shrink-0">În curând</span>
                      : pct === 100
                      ? <CheckCircle className="w-5 h-5 text-white flex-shrink-0"/>
                      : <ChevronRight className="w-5 h-5 text-white/60 group-hover:text-white transition-colors flex-shrink-0"/>
                    }
                  </div>
                  <div className="px-3.5 sm:px-4 py-2.5 sm:py-3">
                    <div className="flex items-center justify-between text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 mb-1.5">
                      <span>{s.done}/{s.total} lecții</span>
                      <span className="font-bold text-indigo-600 dark:text-indigo-400">{pct}%</span>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-2">
                      <div className={`h-2 rounded-full bg-gradient-to-r ${bg} transition-all`} style={{ width: `${pct}%` }}/>
                    </div>
                    {s.inProgress > 0 && (
                      <p className="text-[11px] sm:text-xs text-amber-600 dark:text-amber-400 mt-1.5 font-medium flex items-center gap-1">
                        <Clock className="w-3 h-3"/> {s.inProgress} în curs
                      </p>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </main>

      <Navbar/>
    </div>
  );
}
