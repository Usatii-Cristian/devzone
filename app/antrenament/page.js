"use client";
import { useState, useEffect } from "react";
import { Play, RotateCcw, Trophy, ChevronRight, Zap, CheckCircle, Sparkles, Globe, Library, ArrowLeft, Send } from "lucide-react";
import Navbar from "@/components/Navbar";
import Link from "next/link";

function fmt(t) {
  return t
    .replace(/\*\*(.+?)\*\*/g, "<strong class='text-slate-900'>$1</strong>")
    .replace(/`(.+?)`/g, "<code class='bg-indigo-100 text-indigo-700 px-1.5 py-0.5 rounded font-mono text-xs'>$1</code>");
}

function fmtQuestion(text) {
  const parts = [];
  const re = /```(?:\w*)\n?([\s\S]*?)```/g;
  let last = 0, m;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) parts.push(`<span>${fmt(text.slice(last, m.index))}</span>`);
    parts.push(`<pre class="bg-gray-900 text-green-300 rounded-xl p-3 text-xs font-mono overflow-x-auto my-2 leading-relaxed whitespace-pre">${m[1].trim()}</pre>`);
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push(`<span>${fmt(text.slice(last))}</span>`);
  return parts.join("");
}

const DIFF = {
  easy:   { label: "Ușor",  cls: "bg-green-100 text-green-700 border-green-200" },
  medium: { label: "Mediu", cls: "bg-amber-100 text-amber-700 border-amber-200" },
  hard:   { label: "Greu",  cls: "bg-red-100 text-red-700 border-red-200" },
};

const SCOPES = [
  { v: "completed-current", l: "Modul curent", icon: CheckCircle, desc: "Lecțiile finalizate din modulul ales" },
  { v: "completed-all",     l: "Lecțiile mele", icon: Library,      desc: "Din toate lecțiile finalizate" },
  { v: "all-lessons",       l: "Toate lecțiile", icon: Globe,        desc: "Din întreaga bibliotecă" },
];

export default function AntrenamentPage() {
  const [modules, setModules] = useState([]);
  const [moduleSlug, setModuleSlug] = useState("python");
  const [difficulty, setDifficulty] = useState("all");
  const [count, setCount] = useState(5);
  const [scope, setScope] = useState("completed-current");
  const [tasks, setTasks] = useState(null);
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    fetch("/api/modules")
      .then(r => r.json())
      .then(d => { if (Array.isArray(d)) setModules(d); })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!tasks || done) return;
    function onKey(e) {
      if (e.key === "Enter" && submitted) nextTask();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [tasks, done, submitted]);

  async function start() {
    setLoading(true); setError(null);
    try {
      const res = await fetch("/api/training", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ moduleSlug, difficulty, count, scope }),
      });
      const data = await res.json();
      if (!res.ok || data.error) { setError(data.error || "Eroare."); return; }
      setTasks(data); setIdx(0); setScore(0); setDone(false);
      setSelected(null); setSubmitted(false);
    } catch { setError("Eroare de rețea."); }
    finally { setLoading(false); }
  }

  function handleAnswer(opt) {
    if (submitted) return;
    setSelected(opt); setSubmitted(true);
    if (opt === tasks[idx].answer) setScore(s => s + 1);
  }

  function nextTask() {
    setSelected(null); setSubmitted(false);
    if (idx + 1 >= tasks.length) setDone(true);
    else setIdx(i => i + 1);
  }

  function restart() { setTasks(null); setDone(false); setScore(0); setSelected(null); setSubmitted(false); }

  const available = modules.filter(m => m.lessons.length > 0);
  const task = tasks?.[idx];
  const diff = DIFF[task?.difficulty ?? "easy"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 pb-20">
      {/* Header */}
      <header className="bg-gradient-to-r from-indigo-700 to-purple-700 text-white shadow-lg sticky top-0 z-40">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
          <Link href="/" className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
            <ArrowLeft className="w-5 h-5"/>
          </Link>
          <div className="flex items-center gap-2 flex-1">
            <div className="w-8 h-8 bg-yellow-400 rounded-xl flex items-center justify-center flex-shrink-0">
              <Zap className="w-4 h-4 text-yellow-900"/>
            </div>
            <div>
              <h1 className="font-black text-base leading-none">Antrenament</h1>
              <p className="text-indigo-200 text-xs">Exersează ce ai învățat</p>
            </div>
          </div>
          {tasks && !done && (
            <span className="text-xs font-black bg-white/20 px-3 py-1 rounded-full">
              {idx + 1}/{tasks.length} · {score} ✓
            </span>
          )}
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6">

        {/* ── SETUP ── */}
        {!tasks && (
          <div className="space-y-5">
            {/* Scope */}
            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <h2 className="text-sm font-black text-slate-700 mb-3 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-indigo-500"/> Sursa întrebărilor
              </h2>
              <div className="space-y-2">
                {SCOPES.map(s => {
                  const Icon = s.icon;
                  const active = scope === s.v;
                  return (
                    <button key={s.v} onClick={() => setScope(s.v)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl border-2 transition-all text-left
                        ${active ? "border-indigo-500 bg-indigo-50" : "border-slate-200 hover:border-indigo-200"}`}>
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${active ? "bg-indigo-500 text-white" : "bg-slate-100 text-slate-500"}`}>
                        <Icon className="w-4 h-4"/>
                      </div>
                      <div>
                        <p className={`text-sm font-black ${active ? "text-indigo-700" : "text-slate-700"}`}>{s.l}</p>
                        <p className="text-xs text-slate-400">{s.desc}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Module */}
            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <h2 className="text-sm font-black text-slate-700 mb-3">Modul</h2>
              <div className="grid grid-cols-2 gap-2">
                {available.map(m => (
                  <button key={m.slug} onClick={() => setModuleSlug(m.slug)}
                    className={`px-3 py-2.5 rounded-xl text-sm font-bold border-2 transition-all text-left
                      ${moduleSlug === m.slug ? "border-indigo-500 bg-indigo-50 text-indigo-700" : "border-slate-200 text-slate-600 hover:border-indigo-200"}`}>
                    {m.title}
                  </button>
                ))}
              </div>
            </div>

            {/* Difficulty + Count */}
            <div className="bg-white rounded-2xl p-5 shadow-sm space-y-4">
              <div>
                <h2 className="text-sm font-black text-slate-700 mb-3">Dificultate</h2>
                <div className="flex gap-2">
                  {[{v:"all",l:"Toate"},{v:"easy",l:"Ușor"},{v:"medium",l:"Mediu"},{v:"hard",l:"Greu"}].map(d => (
                    <button key={d.v} onClick={() => setDifficulty(d.v)}
                      className={`flex-1 py-2 rounded-xl text-sm font-bold border-2 transition-all
                        ${difficulty === d.v ? "border-indigo-500 bg-indigo-50 text-indigo-700" : "border-slate-200 text-slate-600 hover:border-indigo-200"}`}>
                      {d.l}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <h2 className="text-sm font-black text-slate-700 mb-2">
                  Număr de probleme: <span className="text-indigo-600">{count}</span>
                </h2>
                <input type="range" min={1} max={10} value={count} onChange={e => setCount(Number(e.target.value))}
                  className="w-full accent-indigo-500"/>
                <div className="flex justify-between text-xs text-slate-400 mt-1"><span>1</span><span>10</span></div>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl">{error}</div>
            )}

            <button onClick={start} disabled={loading}
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-4 rounded-2xl font-black hover:opacity-90 transition-opacity disabled:opacity-60 flex items-center justify-center gap-2 shadow-lg text-base">
              <Play className="w-5 h-5"/> {loading ? "Se generează..." : "Începe antrenamentul"}
            </button>
          </div>
        )}

        {/* ── DONE ── */}
        {tasks && done && (
          <div className="text-center py-10">
            <div className={`w-28 h-28 rounded-full flex items-center justify-center mx-auto mb-5 ${score >= tasks.length * 0.8 ? "bg-yellow-100" : "bg-slate-100"}`}>
              <Trophy className={`w-14 h-14 ${score >= tasks.length * 0.8 ? "text-yellow-500" : "text-slate-400"}`}/>
            </div>
            <h2 className="text-2xl font-black text-slate-900 mb-2">Antrenament terminat!</h2>
            <p className="text-slate-500 mb-1 text-lg">
              <span className="font-black text-indigo-600">{score}</span>/{tasks.length} corecte
            </p>
            <p className="text-slate-400 text-sm mb-8">{Math.round((score / tasks.length) * 100)}% corect</p>
            <div className="flex gap-3 justify-center flex-wrap">
              <button onClick={restart}
                className="flex items-center gap-2 bg-slate-100 text-slate-700 px-6 py-3 rounded-xl font-bold hover:bg-slate-200 transition-colors">
                <RotateCcw className="w-4 h-4"/> Din nou
              </button>
              <Link href="/"
                className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-xl font-bold hover:opacity-90 transition-opacity">
                Înapoi acasă
              </Link>
            </div>
          </div>
        )}

        {/* ── QUESTION ── */}
        {tasks && !done && task && (
          <div>
            {/* Progress */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-slate-400 font-semibold">{idx + 1} / {tasks.length}</span>
              <span className="text-xs text-emerald-600 font-black flex items-center gap-1">
                <CheckCircle className="w-3 h-3"/> {score} corecte
              </span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2 mb-5">
              <div className="h-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all"
                style={{ width: `${((idx + 1) / tasks.length) * 100}%` }}/>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-5 mb-4">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-base font-black text-slate-800 flex-1 pr-2">{task.name}</h2>
                <span className={`text-xs font-bold px-2 py-1 rounded-full border flex-shrink-0 ${diff.cls}`}>{diff.label}</span>
              </div>
              {task.lesson?.title && (
                <p className="text-xs text-slate-400 mb-3 font-semibold">{task.lesson.title}</p>
              )}
              <div className="text-slate-700 text-sm leading-relaxed"
                dangerouslySetInnerHTML={{ __html: fmtQuestion(task.question || "") }}/>
            </div>

            <div className="space-y-2.5 mb-4">
              {task.options.map(opt => {
                const isSel = selected === opt;
                const isCorrect = opt === task.answer;
                let cls = "border-slate-200 bg-white hover:border-indigo-300 hover:bg-indigo-50 cursor-pointer";
                if (submitted) {
                  if (isCorrect) cls = "border-emerald-400 bg-emerald-50";
                  else if (isSel) cls = "border-red-400 bg-red-50";
                  else cls = "border-slate-100 opacity-40";
                } else if (isSel) cls = "border-indigo-500 bg-indigo-50";
                return (
                  <button key={opt} onClick={() => handleAnswer(opt)} disabled={submitted}
                    className={`w-full text-left px-4 py-3 rounded-xl border-2 font-medium transition-all text-sm flex items-center justify-between ${cls}`}>
                    <span>{opt}</span>
                    {submitted && isCorrect && <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0"/>}
                    {submitted && isSel && !isCorrect && <span className="text-red-500 flex-shrink-0">✗</span>}
                  </button>
                );
              })}
            </div>

            {submitted && (
              <div className={`rounded-2xl p-4 mb-4 border-2 ${selected === task.answer ? "bg-emerald-50 border-emerald-300" : "bg-red-50 border-red-300"}`}>
                <p className={`font-black text-sm mb-1 ${selected === task.answer ? "text-emerald-700" : "text-red-700"}`}>
                  {selected === task.answer ? "✓ Corect!" : `✗ Corect era: ${task.answer}`}
                </p>
                {task.explanation && <p className="text-slate-600 text-xs mt-1">{task.explanation}</p>}
                <div className="flex items-center justify-between mt-3">
                  <p className="text-xs text-slate-400">Enter ↵ = următoarea</p>
                  <button onClick={nextTask}
                    className="bg-indigo-500 text-white px-5 py-2 rounded-full text-xs font-black hover:bg-indigo-600 transition-colors flex items-center gap-1">
                    {idx + 1 >= tasks.length ? <><Trophy className="w-3 h-3"/> Finalizează</> : <>Următoarea <ChevronRight className="w-3 h-3"/></>}
                  </button>
                </div>
              </div>
            )}

            {!submitted && (
              <p className="text-center text-xs text-slate-400">Alege o opțiune pentru a răspunde</p>
            )}
          </div>
        )}
      </main>

      <Navbar/>
    </div>
  );
}
