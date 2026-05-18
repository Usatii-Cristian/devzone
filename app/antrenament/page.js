"use client";
import { useState, useEffect } from "react";
import { Play, RotateCcw, Trophy, ChevronRight, Zap, CheckCircle, Sparkles, Globe, Library, ArrowLeft, RefreshCw, Send, XCircle, Wand2, Terminal } from "lucide-react";
import Navbar from "@/components/Navbar";
import Link from "next/link";

function fmt(t) {
  return t
    .replace(/\*\*(.+?)\*\*/g, "<strong class='text-slate-900 dark:text-white'>$1</strong>")
    .replace(/`(.+?)`/g, "<code class='bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 px-1.5 py-0.5 rounded font-mono text-xs'>$1</code>");
}

function fmtQuestion(text) {
  const parts = [];
  const re = /```(?:\w*)\n?([\s\S]*?)```/g;
  let last = 0, m;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) parts.push(`<span>${fmt(text.slice(last, m.index))}</span>`);
    parts.push(`<pre class="bg-gray-900 dark:bg-black/60 text-green-300 rounded-xl p-3 text-xs font-mono overflow-x-auto my-2 leading-relaxed whitespace-pre">${m[1].trim()}</pre>`);
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

const TASK_TYPES = [
  { v: "mixed",  l: "Mixt",  desc: "Quiz + exerciții de cod" },
  { v: "quiz",   l: "Quiz",  desc: "Întrebări cu variante de răspuns" },
  { v: "coding", l: "Cod",   desc: "Exerciții de programare cu editor" },
];

const PISTON_LANGS = {
  python: { language: "python", version: "3.10.0" },
  c:      { language: "c",      version: "10.2.0" },
  cpp:    { language: "c++",    version: "10.2.0" },
  java:   { language: "java",   version: "15.0.2" },
  csharp: { language: "csharp", version: "6.12.0" },
  php:    { language: "php",    version: "8.2.3" },
};

export default function AntrenamentPage() {
  const [modules, setModules] = useState([]);
  const [moduleSlug, setModuleSlug] = useState("python");
  const [difficulty, setDifficulty] = useState("all");
  const [count, setCount] = useState(5);
  const [scope, setScope] = useState("completed-current");
  const [taskType, setTaskType] = useState("mixed");
  const [tasks, setTasks] = useState(null);
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [done, setDone] = useState(false);

  // Coding task state
  const [code, setCode] = useState("");
  const [codeOutput, setCodeOutput] = useState(null);
  const [codeRunning, setCodeRunning] = useState(false);
  const [codeEvaluating, setCodeEvaluating] = useState(false);
  const [codeResult, setCodeResult] = useState(null);
  const [codeScored, setCodeScored] = useState(false);

  useEffect(() => {
    fetch("/api/modules")
      .then(r => r.json())
      .then(d => { if (Array.isArray(d)) setModules(d); })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!tasks || done) return;
    const task = tasks[idx];
    if (task?.type === "coding") return;
    function onKey(e) {
      if (e.key === "Enter" && submitted) nextTask();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [tasks, done, submitted, idx]);

  function resetCodingState() {
    setCode("");
    setCodeOutput(null);
    setCodeRunning(false);
    setCodeEvaluating(false);
    setCodeResult(null);
    setCodeScored(false);
  }

  function handleCodeKeyDown(e) {
    const ta = e.target;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const val = ta.value;

    if (e.key === "Tab") {
      e.preventDefault();
      const newVal = val.substring(0, start) + "  " + val.substring(end);
      setCode(newVal);
      requestAnimationFrame(() => { ta.selectionStart = ta.selectionEnd = start + 2; });
      return;
    }

    if (e.key === "Enter") {
      e.preventDefault();
      const before = val.substring(0, start);
      const lineStart = before.lastIndexOf("\n") + 1;
      const indent = before.substring(lineStart).match(/^(\s*)/)[1];
      const lastChar = before.trimEnd().slice(-1);
      const extra = ["{", "[", "("].includes(lastChar) ? "  " : "";
      const newVal = before + "\n" + indent + extra + val.substring(end);
      setCode(newVal);
      const pos = start + 1 + indent.length + extra.length;
      requestAnimationFrame(() => { ta.selectionStart = ta.selectionEnd = pos; });
      return;
    }

    const pairs = { '"': '"', "'": "'", "(": ")", "[": "]", "{": "}", "`": "`" };
    const closers = new Set(['"', "'", ")", "]", "}", "`"]);
    if (pairs[e.key]) {
      const sel = val.substring(start, end);
      const close = pairs[e.key];
      if (sel) {
        e.preventDefault();
        const newVal = val.substring(0, start) + e.key + sel + close + val.substring(end);
        setCode(newVal);
        requestAnimationFrame(() => { ta.selectionStart = start + 1; ta.selectionEnd = end + 1; });
        return;
      }
      if (closers.has(e.key) && val[end] === e.key) {
        e.preventDefault();
        requestAnimationFrame(() => { ta.selectionStart = ta.selectionEnd = end + 1; });
        return;
      }
      e.preventDefault();
      const newVal = val.substring(0, start) + e.key + close + val.substring(end);
      setCode(newVal);
      requestAnimationFrame(() => { ta.selectionStart = ta.selectionEnd = start + 1; });
    }
  }

  function runInIframe(codeStr) {
    return new Promise((resolve) => {
      const iframe = document.createElement("iframe");
      iframe.setAttribute("sandbox", "allow-scripts");
      iframe.style.cssText = "display:none;width:0;height:0;border:none;position:absolute;";
      document.body.appendChild(iframe);
      const timer = setTimeout(() => {
        try { document.body.removeChild(iframe); } catch {}
        resolve("Timeout: codul a durat prea mult (>3s)");
      }, 3000);
      function handler(e) {
        if (e.source !== iframe.contentWindow) return;
        clearTimeout(timer);
        window.removeEventListener("message", handler);
        try { document.body.removeChild(iframe); } catch {}
        const logs = e.data?.logs ?? [];
        resolve(logs.length > 0 ? logs.join("\n") : "(fără output)");
      }
      window.addEventListener("message", handler);
      const setup = `
const _log=[];
window.console={
  log:(...a)=>_log.push(a.map(x=>x===null?'null':x===undefined?'undefined':typeof x==='object'?JSON.stringify(x):String(x)).join(' ')),
  error:(...a)=>_log.push('ERROR: '+a.join(' ')),
  warn:(...a)=>_log.push('WARN: '+a.join(' '))
};
try{ ${codeStr} }catch(e){_log.push('Eroare: '+e.message);}
parent.postMessage({logs:_log},'*');
`;
      const html = `<!DOCTYPE html><html><body><script>${setup}<\/script></body></html>`;
      const blob = new Blob([html], { type: "text/html" });
      const url = URL.createObjectURL(blob);
      iframe.src = url;
      iframe.onload = () => URL.revokeObjectURL(url);
    });
  }

  async function runWithPiston(codeStr, lang) {
    const cfg = PISTON_LANGS[lang];
    if (!cfg) return "(execuție indisponibilă pentru " + lang + ")";
    try {
      const res = await fetch("https://emkc.org/api/v2/piston/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ language: cfg.language, version: cfg.version, files: [{ content: codeStr }] }),
      });
      const data = await res.json();
      return (data.run?.stdout || "") + (data.run?.stderr ? "EROARE: " + data.run.stderr : "") || "(fără output)";
    } catch {
      return "Eroare la conexiunea cu serverul de execuție.";
    }
  }

  async function runCode(codeStr, language) {
    setCodeRunning(true);
    setCodeOutput(null);
    let out = "";
    try {
      const lang = (language || "javascript").toLowerCase();
      out = (lang === "javascript" || lang === "html" || lang === "css" || lang === "sql" || !lang)
        ? await runInIframe(codeStr)
        : await runWithPiston(codeStr, lang);
      setCodeOutput(out);
    } catch {
      out = "Eroare la rularea codului.";
      setCodeOutput(out);
    }
    setCodeRunning(false);
    return out;
  }

  async function start() {
    setLoading(true); setError(null);
    try {
      const res = await fetch("/api/training", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ moduleSlug, difficulty, count, scope, taskType }),
      });
      const data = await res.json();
      if (!res.ok || data.error) { setError(data.error || "Eroare."); return; }
      setTasks(data); setIdx(0); setScore(0); setDone(false);
      setSelected(null); setSubmitted(false);
      resetCodingState();
    } catch { setError("Eroare de rețea."); }
    finally { setLoading(false); }
  }

  function handleAnswer(opt) {
    if (submitted) return;
    setSelected(opt); setSubmitted(true);
    if (opt === tasks[idx].answer) setScore(s => s + 1);
  }

  function nextTask() {
    resetCodingState();
    setSelected(null); setSubmitted(false);
    if (idx + 1 >= tasks.length) setDone(true);
    else setIdx(i => i + 1);
  }

  function restart() {
    setTasks(null); setDone(false); setScore(0);
    setSelected(null); setSubmitted(false);
    resetCodingState();
  }

  async function submitCode(task) {
    const currentCode = code || task.starterCode || "";
    if (!currentCode.trim()) return;
    setCodeEvaluating(true);
    const output = await runCode(currentCode, task.language);
    try {
      const res = await fetch("/api/evaluate-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: currentCode,
          output,
          question: task.question,
          language: task.language || "javascript",
          lessonTitle: task.lesson?.title || "",
          explanation: "",
        }),
      });
      const evaluation = await res.json();
      setCodeResult(evaluation);
      if (evaluation.correct && !codeScored) {
        setScore(s => s + 1);
        setCodeScored(true);
      }
    } catch {
      setCodeResult({ correct: false, feedback: "Eroare la evaluare. Încearcă din nou." });
    }
    setCodeEvaluating(false);
  }

  const available = modules.filter(m => m.lessons.length > 0);
  const task = tasks?.[idx];
  const diff = DIFF[task?.difficulty ?? "easy"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 pb-24">
      {/* Header */}
      <header className="bg-gradient-to-r from-indigo-700 to-purple-700 text-white shadow-lg sticky top-0 z-40">
        <div className="max-w-2xl mx-auto px-3 sm:px-4 py-2.5 flex items-center gap-2">
          <Link href="/" className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors active:scale-95 flex-shrink-0">
            <ArrowLeft className="w-5 h-5"/>
          </Link>
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <div className="w-9 h-9 bg-yellow-400 rounded-xl flex items-center justify-center flex-shrink-0">
              <Zap className="w-4 h-4 text-yellow-900"/>
            </div>
            <div className="min-w-0">
              <h1 className="font-black text-base leading-tight">Antrenament</h1>
              <p className="text-indigo-200 text-[11px] leading-tight">Exersează AI</p>
            </div>
          </div>
          {tasks && !done && (
            <span className="text-[11px] sm:text-xs font-black bg-white/20 px-2.5 sm:px-3 py-1.5 rounded-full flex-shrink-0">
              {idx + 1}/{tasks.length} · {score} ✓
            </span>
          )}
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-3 sm:px-4 py-4 sm:py-6">

        {/* ── SETUP ── */}
        {!tasks && (
          <div className="space-y-4 sm:space-y-5">
            {/* Task type */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 sm:p-5 shadow-sm">
              <h2 className="text-sm font-black text-slate-700 dark:text-white mb-3 flex items-center gap-1.5">
                <Terminal className="w-4 h-4 text-indigo-500"/> Tip exerciții
              </h2>
              <div className="grid grid-cols-3 gap-2">
                {TASK_TYPES.map(tt => (
                  <button key={tt.v} onClick={() => setTaskType(tt.v)}
                    className={`px-3 py-3 rounded-xl text-xs sm:text-sm font-bold border-2 transition-all text-center active:scale-[0.98] min-h-[56px] flex flex-col items-center justify-center gap-1
                      ${taskType === tt.v ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300" : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-indigo-200"}`}>
                    <span>{tt.l}</span>
                    <span className="text-[10px] font-normal opacity-70 leading-tight">{tt.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Scope */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 sm:p-5 shadow-sm">
              <h2 className="text-sm font-black text-slate-700 dark:text-white mb-3 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-indigo-500"/> Sursa întrebărilor
              </h2>
              <div className="space-y-2">
                {SCOPES.map(s => {
                  const Icon = s.icon;
                  const active = scope === s.v;
                  return (
                    <button key={s.v} onClick={() => setScope(s.v)}
                      className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl border-2 transition-all text-left active:scale-[0.99]
                        ${active ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30" : "border-slate-200 dark:border-slate-700 hover:border-indigo-200"}`}>
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${active ? "bg-indigo-500 text-white" : "bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-300"}`}>
                        <Icon className="w-4 h-4"/>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className={`text-sm font-black ${active ? "text-indigo-700 dark:text-indigo-300" : "text-slate-700 dark:text-white"}`}>{s.l}</p>
                        <p className="text-[11px] sm:text-xs text-slate-400 dark:text-slate-500 leading-tight mt-0.5">{s.desc}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Module */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 sm:p-5 shadow-sm">
              <h2 className="text-sm font-black text-slate-700 dark:text-white mb-3">Modul</h2>
              <div className="grid grid-cols-2 gap-2">
                {available.map(m => (
                  <button key={m.slug} onClick={() => setModuleSlug(m.slug)}
                    className={`px-3 py-3 rounded-xl text-xs sm:text-sm font-bold border-2 transition-all text-left active:scale-[0.98] min-h-[48px]
                      ${moduleSlug === m.slug ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300" : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-indigo-200"}`}>
                    {m.title}
                  </button>
                ))}
              </div>
            </div>

            {/* Difficulty + Count */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 sm:p-5 shadow-sm space-y-4">
              <div>
                <h2 className="text-sm font-black text-slate-700 dark:text-white mb-3">Dificultate</h2>
                <div className="grid grid-cols-4 gap-2">
                  {[{v:"all",l:"Toate"},{v:"easy",l:"Ușor"},{v:"medium",l:"Mediu"},{v:"hard",l:"Greu"}].map(d => (
                    <button key={d.v} onClick={() => setDifficulty(d.v)}
                      className={`py-2.5 rounded-xl text-xs sm:text-sm font-bold border-2 transition-all active:scale-95
                        ${difficulty === d.v ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300" : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-indigo-200"}`}>
                      {d.l}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-sm font-black text-slate-700 dark:text-white">Număr probleme</h2>
                  <span className="text-lg font-black text-indigo-600 dark:text-indigo-400">{count}</span>
                </div>
                <input type="range" min={1} max={10} value={count} onChange={e => setCount(Number(e.target.value))}
                  className="w-full accent-indigo-500 h-3"/>
                <div className="flex justify-between text-xs text-slate-400 mt-1"><span>1</span><span>10</span></div>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-300 text-sm px-4 py-3 rounded-xl">{error}</div>
            )}

            <button onClick={start} disabled={loading}
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-4 rounded-2xl font-black hover:opacity-90 transition-opacity disabled:opacity-60 flex items-center justify-center gap-2 shadow-lg text-base active:scale-[0.98]">
              <Play className="w-5 h-5"/> {loading ? "Se generează..." : "Începe antrenamentul"}
            </button>
          </div>
        )}

        {/* ── DONE ── */}
        {tasks && done && (
          <div className="text-center py-8 sm:py-10 px-2">
            <div className={`w-24 h-24 sm:w-28 sm:h-28 rounded-full flex items-center justify-center mx-auto mb-5 ${score >= tasks.length * 0.8 ? "bg-yellow-100 dark:bg-yellow-900/30" : "bg-slate-100 dark:bg-slate-700"}`}>
              <Trophy className={`w-12 h-12 sm:w-14 sm:h-14 ${score >= tasks.length * 0.8 ? "text-yellow-500" : "text-slate-400"}`}/>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mb-2">Antrenament terminat!</h2>
            <p className="text-slate-500 dark:text-slate-300 mb-1 text-base sm:text-lg">
              <span className="font-black text-indigo-600 dark:text-indigo-400">{score}</span>/{tasks.length} corecte
            </p>
            <p className="text-slate-400 dark:text-slate-500 text-sm mb-6 sm:mb-8">{Math.round((score / tasks.length) * 100)}% corect</p>
            <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 justify-center">
              <button onClick={restart}
                className="flex items-center justify-center gap-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-white px-6 py-3 rounded-xl font-bold hover:bg-slate-200 transition-colors active:scale-95">
                <RotateCcw className="w-4 h-4"/> Din nou
              </button>
              <Link href="/"
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-xl font-bold hover:opacity-90 transition-opacity active:scale-95">
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
              <span className="text-xs text-slate-400 dark:text-slate-500 font-semibold">{idx + 1} / {tasks.length}</span>
              <span className="text-xs text-emerald-600 dark:text-emerald-400 font-black flex items-center gap-1">
                <CheckCircle className="w-3 h-3"/> {score} corecte
              </span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 mb-4 sm:mb-5">
              <div className="h-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all"
                style={{ width: `${((idx + 1) / tasks.length) * 100}%` }}/>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm p-4 sm:p-5 mb-4">
              <div className="flex items-start justify-between mb-3 gap-2">
                <h2 className="text-sm sm:text-base font-black text-slate-800 dark:text-white flex-1">{task.name}</h2>
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  {task.type === "coding" && (
                    <span className="text-[11px] sm:text-xs font-bold px-2 py-1 rounded-full border bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-700 dark:text-slate-300 dark:border-slate-600 flex items-center gap-1">
                      <Terminal className="w-3 h-3"/> {(task.language || "js").toUpperCase()}
                    </span>
                  )}
                  <span className={`text-[11px] sm:text-xs font-bold px-2 py-1 rounded-full border ${diff.cls}`}>{diff.label}</span>
                </div>
              </div>
              {task.lesson?.title && (
                <p className="text-[11px] sm:text-xs text-slate-400 dark:text-slate-500 mb-3 font-semibold">{task.lesson.title}</p>
              )}
              <div className="text-slate-700 dark:text-slate-200 text-sm leading-relaxed"
                dangerouslySetInnerHTML={{ __html: fmtQuestion(task.question || "") }}/>
            </div>

            {/* ── CODING TASK ── */}
            {task.type === "coding" ? (
              <>
                <div className="rounded-2xl overflow-hidden border-2 border-gray-700 mb-3 shadow-lg">
                  <div className="flex items-center justify-between px-3 py-2 bg-gray-800 border-b border-gray-700">
                    <span className="text-xs font-black text-gray-400 uppercase tracking-widest">{(task.language || "javascript").toUpperCase()}</span>
                    {!codeResult?.correct && (
                      <button onClick={() => { setCode(task.starterCode || ""); setCodeResult(null); setCodeOutput(null); }}
                        className="text-xs text-gray-500 hover:text-gray-300 flex items-center gap-1 transition-colors">
                        <RefreshCw className="w-3 h-3"/> Reset
                      </button>
                    )}
                  </div>
                  <textarea
                    value={code !== "" ? code : (task.starterCode || "")}
                    onChange={e => { setCode(e.target.value); setCodeResult(null); }}
                    onKeyDown={handleCodeKeyDown}
                    spellCheck={false}
                    autoCapitalize="off"
                    autoCorrect="off"
                    autoComplete="off"
                    disabled={codeResult?.correct}
                    rows={10}
                    className="w-full bg-gray-900 text-green-300 font-mono text-xs sm:text-sm p-3 sm:p-4 focus:outline-none resize-y leading-relaxed disabled:opacity-70 min-h-[200px]"
                    placeholder="// scrie codul tău aici"
                  />
                </div>

                {!codeResult?.correct && (
                  <div className="flex gap-2 mb-3">
                    <button
                      onClick={() => runCode(code !== "" ? code : (task.starterCode || ""), task.language)}
                      disabled={codeRunning || codeEvaluating}
                      className="flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2.5 rounded-xl font-black text-sm transition-colors disabled:opacity-40 shadow-sm active:scale-95 min-h-[44px]">
                      {codeRunning ? <><RefreshCw className="w-4 h-4 animate-spin"/> Rulează...</> : <><Play className="w-4 h-4"/> Rulează</>}
                    </button>
                    <button
                      onClick={() => submitCode(task)}
                      disabled={codeEvaluating || codeRunning}
                      className="flex-1 flex items-center justify-center gap-1.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2.5 rounded-xl font-black text-sm hover:opacity-90 transition-opacity disabled:opacity-40 shadow-md active:scale-95 min-h-[44px]">
                      {codeEvaluating ? <><RefreshCw className="w-4 h-4 animate-spin"/> Evaluează cu AI...</> : <><Send className="w-4 h-4"/> Trimite răspunsul</>}
                    </button>
                  </div>
                )}

                {codeOutput !== null && !codeResult && (
                  <div className="mb-3 bg-gray-950 rounded-xl p-3 border border-gray-700">
                    <p className="text-xs font-black text-gray-400 mb-1.5 uppercase tracking-wide flex items-center gap-1.5">
                      <Play className="w-3 h-3 fill-current text-emerald-400"/> Output
                    </p>
                    <pre className="text-green-400 font-mono text-xs whitespace-pre-wrap">{codeOutput}</pre>
                  </div>
                )}

                {codeResult && (
                  <div className={`rounded-2xl overflow-hidden border-2 mb-4 ${codeResult.correct ? "border-emerald-400" : "border-amber-400"}`}>
                    <div className={`px-4 py-3 flex items-center justify-between ${codeResult.correct ? "bg-emerald-50 dark:bg-emerald-900/30" : "bg-amber-50 dark:bg-amber-900/20"}`}>
                      <div className="flex items-center gap-2">
                        {codeResult.correct
                          ? <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0"/>
                          : <XCircle className="w-5 h-5 text-amber-600 flex-shrink-0"/>}
                        <span className={`font-black text-sm ${codeResult.correct ? "text-emerald-700 dark:text-emerald-300" : "text-amber-700 dark:text-amber-300"}`}>
                          {codeResult.correct ? "Corect — bravo!" : "Mai încearcă!"}
                        </span>
                      </div>
                      {codeResult.scores && (
                        <span className={`text-sm font-black ${codeResult.correct ? "text-emerald-700 dark:text-emerald-300" : "text-amber-700 dark:text-amber-300"}`}>
                          {codeResult.total ?? ((codeResult.scores.functionality||0)+(codeResult.scores.quality||0)+(codeResult.scores.clarity||0))}/30
                        </span>
                      )}
                    </div>
                    <div className="bg-white dark:bg-slate-800 p-4">
                      {codeOutput && (
                        <div className="mb-3 bg-gray-900 rounded-lg p-2.5">
                          <p className="text-xs font-black text-gray-400 mb-1 uppercase tracking-wide">Output</p>
                          <pre className="text-green-400 font-mono text-xs whitespace-pre-wrap">{codeOutput}</pre>
                        </div>
                      )}
                      <p className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1">Feedback</p>
                      <p className="text-slate-700 dark:text-slate-200 text-sm leading-relaxed mb-3">{codeResult.feedback}</p>
                      {codeResult.scores && (
                        <div className="space-y-2 mb-3">
                          {[
                            { label: "Funcționalitate", key: "functionality", color: "bg-emerald-500" },
                            { label: "Calitate cod",    key: "quality",       color: "bg-blue-500" },
                            { label: "Claritate",       key: "clarity",       color: "bg-purple-500" },
                          ].map(({ label, key, color }) => {
                            const val = codeResult.scores[key] ?? 0;
                            return (
                              <div key={key} className="flex items-center gap-2">
                                <span className="text-xs text-slate-500 dark:text-slate-400 w-32 flex-shrink-0">{label}</span>
                                <div className="flex-1 bg-slate-100 dark:bg-slate-700 rounded-full h-2">
                                  <div className={`h-2 rounded-full ${color} transition-all`} style={{ width: `${val * 10}%` }}/>
                                </div>
                                <span className="text-xs font-black text-slate-600 dark:text-slate-300 w-8 text-right">{val}/10</span>
                              </div>
                            );
                          })}
                        </div>
                      )}
                      {codeResult.bestSolution && (
                        <>
                          <p className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                            <Wand2 className="w-3 h-3"/> Soluția ideală
                          </p>
                          <pre className="bg-gray-900 text-green-300 font-mono text-xs p-3 rounded-xl overflow-x-auto whitespace-pre-wrap mb-3">{codeResult.bestSolution}</pre>
                        </>
                      )}
                      {codeResult.correct ? (
                        <button onClick={nextTask}
                          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-green-600 text-white px-6 py-3 rounded-xl font-black text-sm hover:opacity-90 transition-opacity shadow-md active:scale-95">
                          {idx + 1 >= tasks.length ? <><Trophy className="w-3.5 h-3.5"/> Finalizează</> : <>Următoarea <ChevronRight className="w-3.5 h-3.5"/></>}
                        </button>
                      ) : (
                        <button onClick={() => { setCodeResult(null); setCodeOutput(null); }}
                          className="w-full flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-white px-6 py-2.5 rounded-xl font-black text-sm transition-colors active:scale-95">
                          <RefreshCw className="w-4 h-4"/> Încearcă din nou
                        </button>
                      )}
                    </div>
                  </div>
                )}

                {!codeResult && (
                  <p className="text-center text-xs text-slate-400 dark:text-slate-500 mt-2">Scrie codul și apasă "Trimite răspunsul" pentru evaluare AI</p>
                )}
              </>
            ) : (
              <>
                {/* ── QUIZ OPTIONS ── */}
                <div className="space-y-2.5 mb-4">
                  {task.options.map(opt => {
                    const isSel = selected === opt;
                    const isCorrect = opt === task.answer;
                    let cls = "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-indigo-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 cursor-pointer";
                    if (submitted) {
                      if (isCorrect) cls = "border-emerald-400 bg-emerald-50 dark:bg-emerald-900/30";
                      else if (isSel) cls = "border-red-400 bg-red-50 dark:bg-red-900/30";
                      else cls = "border-slate-100 dark:border-slate-700 opacity-40";
                    } else if (isSel) cls = "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30";
                    return (
                      <button key={opt} onClick={() => handleAnswer(opt)} disabled={submitted}
                        className={`w-full text-left px-4 py-3.5 rounded-xl border-2 font-medium transition-all text-sm flex items-center justify-between gap-2 min-h-[52px] active:scale-[0.99] ${cls}`}>
                        <span className="flex-1 text-slate-700 dark:text-white">{opt}</span>
                        {submitted && isCorrect && <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0"/>}
                        {submitted && isSel && !isCorrect && <span className="text-red-500 text-lg flex-shrink-0">✗</span>}
                      </button>
                    );
                  })}
                </div>

                {submitted && (
                  <div className={`rounded-2xl p-4 mb-4 border-2 ${selected === task.answer ? "bg-emerald-50 dark:bg-emerald-900/30 border-emerald-300 dark:border-emerald-700" : "bg-red-50 dark:bg-red-900/30 border-red-300 dark:border-red-700"}`}>
                    <p className={`font-black text-sm mb-1 ${selected === task.answer ? "text-emerald-700 dark:text-emerald-300" : "text-red-700 dark:text-red-300"}`}>
                      {selected === task.answer ? "✓ Corect!" : `✗ Corect era: ${task.answer}`}
                    </p>
                    {task.explanation && <p className="text-slate-600 dark:text-slate-300 text-xs mt-1 leading-relaxed">{task.explanation}</p>}
                    <div className="flex items-center justify-between mt-3 gap-2">
                      <p className="text-[11px] sm:text-xs text-slate-400 dark:text-slate-500 hidden sm:block">Enter ↵</p>
                      <button onClick={nextTask}
                        className="bg-indigo-500 text-white px-5 py-2.5 rounded-full text-xs sm:text-sm font-black hover:bg-indigo-600 transition-colors flex items-center gap-1.5 ml-auto active:scale-95">
                        {idx + 1 >= tasks.length ? <><Trophy className="w-3.5 h-3.5"/> Finalizează</> : <>Următoarea <ChevronRight className="w-3.5 h-3.5"/></>}
                      </button>
                    </div>
                  </div>
                )}

                {!submitted && (
                  <p className="text-center text-xs text-slate-400 dark:text-slate-500">Alege o opțiune pentru a răspunde</p>
                )}
              </>
            )}
          </div>
        )}
      </main>

      <Navbar/>
    </div>
  );
}
