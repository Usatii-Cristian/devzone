"use client";
import { useState, useEffect, useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, ChevronRight, CheckCircle, Clock, Play } from "lucide-react";
import Navbar from "@/components/Navbar";
import { MOD_BG } from "@/lib/moduleIcons";

export default function ModulePage() {
  const { moduleSlug } = useParams();
  const [module, setModule] = useState(null);
  const [progress, setProgress] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch(`/api/modules/${moduleSlug}`),
      fetch("/api/progress"),
    ])
      .then(([m, p]) => Promise.all([m.json(), p.json()]))
      .then(([mod, prog]) => {
        setModule(mod?.error ? null : mod);
        setProgress(Array.isArray(prog) ? prog : []);
      })
      .finally(() => setLoading(false));
  }, [moduleSlug]);

  const progressMap = useMemo(() => {
    const m = new Map();
    for (const p of progress) m.set(p.lessonId, p);
    return m;
  }, [progress]);

  function getStatus(id) {
    const p = progressMap.get(id);
    if (!p) return "none";
    if (p.completed) return "done";
    if (p.completedTasks?.length > 0) return "progress";
    return "none";
  }

  const continueLesson = useMemo(() => {
    if (!module) return null;
    // First: in-progress lesson
    const inProg = module.lessons.find(l => getStatus(l.id) === "progress");
    if (inProg) return inProg;
    // Second: first not-done lesson
    return module.lessons.find(l => getStatus(l.id) !== "done") ?? null;
  }, [module, progressMap]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 rounded-full border-4 border-indigo-200 dark:border-indigo-900 border-t-indigo-600 dark:border-t-indigo-400 animate-spin"/>
        <p className="text-indigo-500 dark:text-indigo-300 font-semibold text-sm">Se încarcă lecțiile...</p>
      </div>
    </div>
  );
  if (!module) return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800">
      <Link href="/" className="text-indigo-600 dark:text-indigo-400 flex items-center gap-1"><ChevronLeft className="w-4 h-4"/> Acasă</Link>
    </div>
  );

  const bg = MOD_BG[moduleSlug] || "from-indigo-500 to-purple-600";
  const done = module.lessons.filter(l => getStatus(l.id) === "done").length;
  const inProgressCount = module.lessons.filter(l => getStatus(l.id) === "progress").length;
  const pct = module.lessons.length > 0 ? Math.round((done / module.lessons.length) * 100) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 pb-24">
      <header className={`bg-gradient-to-r ${bg} text-white shadow-lg sticky top-0 z-30`}>
        <div className="max-w-4xl mx-auto px-3 sm:px-4 py-4 sm:py-5">
          <div className="flex items-center gap-3 mb-4">
            <Link href="/" className="text-white/70 hover:text-white transition-colors p-2 -ml-2 rounded-xl bg-white/0 hover:bg-white/10 active:scale-95">
              <ChevronLeft className="w-5 h-5"/>
            </Link>
            <div className="flex-1 min-w-0">
              <p className="text-white/60 text-[10px] sm:text-xs uppercase tracking-widest font-bold">Modul</p>
              <h1 className="text-lg sm:text-xl font-black truncate">{module.title}</h1>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-white/60 text-[10px] sm:text-xs">Progres</p>
              <p className="text-xl sm:text-2xl font-black text-yellow-300 leading-tight">{pct}%</p>
              <p className="text-white/60 text-[10px] sm:text-xs">{done}/{module.lessons.length}</p>
            </div>
          </div>
          <div className="w-full bg-white/20 rounded-full h-2 mb-3 sm:mb-4">
            <div className="h-2 rounded-full bg-yellow-300 transition-all" style={{ width: `${pct}%` }}/>
          </div>
          {continueLesson && pct < 100 && (
            <Link href={`/modules/${moduleSlug}/lessons/${continueLesson.id}`}
              className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 transition-colors px-3 sm:px-4 py-2 rounded-xl font-bold text-xs sm:text-sm text-white max-w-full active:scale-95">
              <Play className="w-4 h-4 fill-current flex-shrink-0"/>
              <span className="flex-shrink-0">{getStatus(continueLesson.id) === "progress" ? "Continuă" : "Începe"}:</span>
              <span className="text-white/80 font-normal truncate min-w-0">{continueLesson.title}</span>
            </Link>
          )}
          {pct === 100 && (
            <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-xl font-bold text-sm text-white">
              <CheckCircle className="w-4 h-4"/> Modul completat!
            </div>
          )}
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
        {inProgressCount > 0 && (
          <p className="text-xs text-amber-600 dark:text-amber-400 font-semibold mb-3 flex items-center gap-1 px-1">
            <Clock className="w-3.5 h-3.5"/> {inProgressCount} lecț{inProgressCount === 1 ? "ie" : "ii"} în curs
          </p>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3">
          {module.lessons.map((lesson, idx) => {
            const status = getStatus(lesson.id);
            return (
              <Link key={lesson.id} href={`/modules/${moduleSlug}/lessons/${lesson.id}`}
                className="bg-white dark:bg-slate-800 rounded-2xl p-3.5 sm:p-4 shadow-sm hover:shadow-md transition-all flex items-center gap-3 group border-2 border-transparent hover:border-indigo-200 active:scale-[0.98]">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-sm font-black flex-shrink-0 transition-all
                  ${status === "done" ? "bg-emerald-500 text-white"
                    : status === "progress" ? "bg-amber-400 text-white"
                    : "bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-300 group-hover:bg-indigo-500 group-hover:text-white"}`}>
                  {status === "done" ? <CheckCircle className="w-5 h-5"/> : idx + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-slate-800 dark:text-white text-sm leading-snug group-hover:text-indigo-700 dark:group-hover:text-indigo-300 transition-colors truncate">
                    {lesson.title}
                  </p>
                  <div className="mt-1">
                    {status === "done" && (
                      <span className="text-[10px] sm:text-xs bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded-full font-bold inline-flex items-center gap-1">
                        <CheckCircle className="w-3 h-3"/> Gata
                      </span>
                    )}
                    {status === "progress" && (
                      <span className="text-[10px] sm:text-xs bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 px-2 py-0.5 rounded-full font-bold inline-flex items-center gap-1">
                        <Clock className="w-3 h-3"/> În curs
                      </span>
                    )}
                    {status === "none" && (
                      <span className="text-[10px] sm:text-xs text-slate-400 dark:text-slate-500">Neînceput</span>
                    )}
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-300 dark:text-slate-600 group-hover:text-indigo-400 transition-colors flex-shrink-0"/>
              </Link>
            );
          })}
        </div>
      </main>
      <Navbar/>
    </div>
  );
}
