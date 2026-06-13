"use client";
import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  ArrowLeft, BarChart2, Flame, Trophy, CheckCircle, Clock, Target, Zap, Award,
  Sprout, Briefcase, GraduationCap, Wrench, Monitor, Rocket, Crown,
  Microscope, Building2, Cog, Wand2, Shield, Swords, Gem, Sparkles, Star,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import AchievementIcon from "@/components/AchievementIcon";
import { computeXP, computeLevel, computeAchievements, computeStreakFromDays, buildHeatmap } from "@/lib/stats";
import { ModIcon, MOD_BG } from "@/lib/moduleIcons";

const LEVEL_ICONS = {
  Sprout, Briefcase, GraduationCap, Wrench, Monitor, Zap, Rocket, Target, Trophy,
  Crown, Microscope, Building2, Star, Award, Cog, Wand2, Shield, Swords, Gem, Sparkles,
};

export default function DashboardPage() {
  const [modules, setModules] = useState([]);
  const [progress, setProgress] = useState([]);
  const [serverStats, setServerStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const today = useMemo(() => new Date().toLocaleDateString("en-CA"), []);

  useEffect(() => {
    Promise.all([
      fetch("/api/modules"),
      fetch("/api/progress"),
      fetch(`/api/stats?day=${today}`),
    ])
      .then((r) => Promise.all(r.map((x) => x.json())))
      .then(([mods, prog, stats]) => {
        setModules(Array.isArray(mods) ? mods : []);
        setProgress(Array.isArray(prog) ? prog : []);
        setServerStats(stats || null);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [today]);

  const xp = useMemo(() => computeXP(progress), [progress]);
  const level = useMemo(() => computeLevel(xp), [xp]);
  const achievements = useMemo(() => computeAchievements(progress, modules), [progress, modules]);
  const unlocked = achievements.filter((a) => a.unlocked).length;

  // Accurate streak from the server; fall back to a local recompute.
  const streak = serverStats?.streak || computeStreakFromDays([], today);
  const longest = serverStats?.longestStreak ?? streak.longest;
  const heatmap = useMemo(
    () => buildHeatmap(serverStats?.activeDays || [], today, 91),
    [serverStats, today]
  );

  const totals = useMemo(() => {
    const tasksDone = progress.reduce((s, p) => s + (p.completedTasks?.length || 0), 0);
    const wrong = progress.reduce((s, p) => s + (p.wrongTasks?.length || 0), 0);
    const lessonsDone = progress.filter((p) => p.completed).length;
    const inProgress = progress.filter((p) => !p.completed && p.completedTasks?.length > 0).length;
    const successRate = tasksDone + wrong > 0 ? Math.round((tasksDone / (tasksDone + wrong)) * 100) : 0;
    return { tasksDone, wrong, lessonsDone, inProgress, successRate };
  }, [progress]);

  const perModule = useMemo(() => {
    const done = new Set(progress.filter((p) => p.completed).map((p) => p.lessonId));
    return modules.map((m) => {
      const total = m.lessons.length;
      const d = m.lessons.filter((l) => done.has(l.id)).length;
      return { slug: m.slug, title: m.title, done: d, total, pct: total ? Math.round((d / total) * 100) : 0 };
    });
  }, [modules, progress]);

  const LevelIcon = LEVEL_ICONS[level.icon];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 pb-28">
      <header className="bg-gradient-to-r from-indigo-700 to-purple-700 text-white shadow-lg sticky top-0 z-40">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-3">
          <Link href="/" className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors active:scale-95">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-yellow-400 rounded-xl flex items-center justify-center">
              <BarChart2 className="w-4 h-4 text-yellow-900" />
            </div>
            <div>
              <h1 className="font-black text-base leading-tight">Statistici</h1>
              <p className="text-indigo-200 text-xs leading-tight">Progresul tău în detaliu</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-5 space-y-4">
        {/* Level + XP */}
        <section className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-3xl p-5 text-white shadow-xl">
          <div className="flex items-center gap-3 mb-3">
            <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${level.color} flex items-center justify-center shadow-inner flex-shrink-0`}>
              {LevelIcon && <LevelIcon className="w-6 h-6 text-white" />}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-indigo-200 text-[10px] font-black uppercase tracking-widest">Nivel {level.level} / 20</p>
              <p className="font-black text-lg leading-tight">{level.label}</p>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-yellow-300 font-black text-lg">{xp.toLocaleString()}</p>
              <p className="text-indigo-200 text-[10px]">XP total</p>
            </div>
          </div>
          <div className="w-full bg-white/20 rounded-full h-2.5">
            <div className={`h-2.5 rounded-full bg-gradient-to-r ${level.color} transition-all duration-700`} style={{ width: `${level.pct}%` }} />
          </div>
          {level.next && (
            <p className="text-indigo-200 text-[11px] mt-1.5 text-right">{(level.next.minXP - xp).toLocaleString()} XP până la {level.next.label}</p>
          )}
        </section>

        {/* Streak + key totals */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <StatCard icon={Flame} value={streak.current} label="Streak (zile)" color="from-orange-500 to-red-500" highlight={streak.current > 0} />
          <StatCard icon={Trophy} value={longest} label="Record streak" color="from-amber-500 to-yellow-500" />
          <StatCard icon={CheckCircle} value={totals.lessonsDone} label="Lecții finalizate" color="from-emerald-500 to-teal-500" />
          <StatCard icon={Target} value={`${totals.successRate}%`} label="Rată succes" color="from-indigo-500 to-blue-500" />
        </div>

        {/* Activity heatmap */}
        <section className="bg-white dark:bg-slate-800 rounded-2xl p-4 sm:p-5 shadow-sm">
          <h2 className="font-black text-slate-800 dark:text-white text-sm mb-3 flex items-center gap-2">
            <Flame className="w-4 h-4 text-orange-500" /> Activitate (ultimele 13 săptămâni)
          </h2>
          <div className="overflow-x-auto pb-1">
            <div className="grid grid-rows-7 grid-flow-col gap-1 w-max">
              {heatmap.map((c) => (
                <div
                  key={c.day}
                  title={`${c.day}${c.active ? " — activ" : ""}`}
                  className={`w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-sm ${
                    c.active
                      ? "bg-gradient-to-br from-indigo-500 to-purple-500"
                      : "bg-slate-100 dark:bg-slate-700"
                  } ${c.day === today ? "ring-2 ring-indigo-400" : ""}`}
                />
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2 mt-3 text-[11px] text-slate-400">
            <span>Mai puțin</span>
            <div className="w-3 h-3 rounded-sm bg-slate-100 dark:bg-slate-700" />
            <div className="w-3 h-3 rounded-sm bg-indigo-300" />
            <div className="w-3 h-3 rounded-sm bg-gradient-to-br from-indigo-500 to-purple-500" />
            <span>Mai mult</span>
            {serverStats?.activeToday && (
              <span className="ml-auto text-emerald-600 dark:text-emerald-400 font-black flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" /> Activ azi
              </span>
            )}
          </div>
        </section>

        {/* Per-module progress */}
        <section className="bg-white dark:bg-slate-800 rounded-2xl p-4 sm:p-5 shadow-sm">
          <h2 className="font-black text-slate-800 dark:text-white text-sm mb-3 flex items-center gap-2">
            <BarChart2 className="w-4 h-4 text-indigo-500" /> Progres pe module
          </h2>
          {loading ? (
            <p className="text-sm text-slate-400">Se încarcă…</p>
          ) : (
            <div className="space-y-2.5">
              {perModule.map((m) => {
                const bg = MOD_BG[m.slug] || "from-slate-500 to-slate-700";
                return (
                  <Link key={m.slug} href={`/modules/${m.slug}`} className="block group">
                    <div className="flex items-center gap-2.5 mb-1">
                      <div className={`w-6 h-6 rounded-lg bg-gradient-to-br ${bg} flex items-center justify-center flex-shrink-0`}>
                        <ModIcon slug={m.slug} className="w-3.5 h-3.5 text-white" />
                      </div>
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-200 flex-1 min-w-0 truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{m.title}</span>
                      <span className="text-[11px] font-black text-slate-500 dark:text-slate-400 flex-shrink-0">{m.done}/{m.total}</span>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-1.5">
                      <div className={`h-1.5 rounded-full bg-gradient-to-r ${bg} transition-all`} style={{ width: `${m.pct}%` }} />
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </section>

        {/* Achievements */}
        <section className="bg-white dark:bg-slate-800 rounded-2xl p-4 sm:p-5 shadow-sm">
          <h2 className="font-black text-slate-800 dark:text-white text-sm mb-3 flex items-center gap-2">
            <Award className="w-4 h-4 text-pink-500" /> Realizări <span className="text-slate-400 font-bold">{unlocked}/{achievements.length}</span>
          </h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
            {achievements.map((a) => (
              <div key={a.id} title={`${a.title} — ${a.desc}`}
                className={`rounded-2xl flex flex-col items-center justify-center text-center px-1.5 py-3 gap-1.5 transition-all
                  ${a.unlocked
                    ? "bg-gradient-to-br from-pink-100 to-yellow-100 dark:from-pink-900/40 dark:to-yellow-900/40 shadow-sm"
                    : "bg-slate-100 dark:bg-slate-700/50 opacity-50"}`}>
                <AchievementIcon iconKey={a.iconKey} className={`w-7 h-7 ${a.unlocked ? "text-pink-600 dark:text-pink-300" : "text-slate-400 dark:text-slate-500"}`} />
                <span className={`text-[10px] font-bold leading-tight ${a.unlocked ? "text-pink-700 dark:text-pink-300" : "text-slate-400 dark:text-slate-500"}`}>{a.title}</span>
                {!a.unlocked && a.target > 1 && (
                  <span className="text-[9px] text-slate-400">{a.current}/{a.target}</span>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>
      <Navbar />
    </div>
  );
}

function StatCard({ icon: Icon, value, label, color, highlight }) {
  return (
    <div className={`bg-white dark:bg-slate-800 rounded-2xl p-3.5 shadow-sm border text-center ${highlight ? "border-orange-300 dark:border-orange-700" : "border-slate-200 dark:border-slate-700"}`}>
      <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mx-auto mb-1.5`}>
        <Icon className="w-4 h-4 text-white" />
      </div>
      <p className="text-xl font-black text-slate-800 dark:text-white">{value}</p>
      <p className="text-[10px] text-slate-400 leading-tight">{label}</p>
    </div>
  );
}
