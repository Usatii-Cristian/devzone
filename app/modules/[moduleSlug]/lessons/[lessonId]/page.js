"use client";
import { useState, useEffect, useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import AIAssistant from "@/components/AIAssistant";
import {
  ChevronLeft, BookOpen, ClipboardList, ChevronRight,
  CheckCircle, Menu, Send, ArrowRight, RotateCcw, Trophy, Zap, Lightbulb, Brain, XCircle, Wand2, Play, RefreshCw,
  Copy, Sparkles, PenLine, ArrowDown
} from "lucide-react";
import CodeEditor from "@/components/CodeEditor";

const DIFF = {
  easy:   { label:"Ușor",  cls:"bg-green-100 text-green-700 border-green-200" },
  medium: { label:"Mediu", cls:"bg-amber-100 text-amber-700 border-amber-200" },
  hard:   { label:"Greu",  cls:"bg-red-100 text-red-700 border-red-200" },
};

export default function LessonPage() {
  const { moduleSlug, lessonId } = useParams();
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("theory");
  const [taskIdx, setTaskIdx] = useState(0);
  const [completed, setCompleted] = useState([]);
  const [wrong, setWrong] = useState([]);
  const [disabledOpts, setDisabledOpts] = useState({});
  const [retryMode, setRetryMode] = useState(false);
  const [retryQueue, setRetryQueue] = useState([]);
  const [retryIdx, setRetryIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // Review state
  const [reviewTasks, setReviewTasks] = useState(null);
  const [reviewIdx, setReviewIdx] = useState(0);
  const [reviewSel, setReviewSel] = useState(null);
  const [reviewSub, setReviewSub] = useState(false);
  const [reviewScore, setReviewScore] = useState(0);
  const [reviewDone, setReviewDone] = useState(false);

  // Coding task state
  const [codeValue, setCodeValue] = useState("");
  const [codeOutput, setCodeOutput] = useState(null);
  const [codeRunning, setCodeRunning] = useState(false);
  const [codeEvaluating, setCodeEvaluating] = useState(false);
  const [codeResult, setCodeResult] = useState(null); // { correct, feedback }

  // Hints state
  const [hints, setHints] = useState({});        // { [taskId]: string[] }
  const [hintLoading, setHintLoading] = useState(false);

  // Fill-in-blank state
  const [fillValue, setFillValue] = useState("");
  const [fillSubmitted, setFillSubmitted] = useState(false);

  // Shuffle options once per lesson load so correct answer isn't always in same slot
  const shuffledOptionsMap = useMemo(() => {
    if (!lesson?.tasks) return {};
    const map = {};
    for (const t of lesson.tasks) {
      if (t.options?.length) {
        const arr = [...t.options];
        for (let i = arr.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        map[t.id] = arr;
      }
    }
    return map;
  }, [lesson?.id]);

  useEffect(() => {
    if (!lesson) return;
    let cancelled = false;
    const order = lesson.order;

    async function loadReview() {
      if (order < 5) { if (!cancelled) setReviewTasks([]); return; }
      const key = `review_${moduleSlug}`;
      const stored = JSON.parse(localStorage.getItem(key) || "{}");
      const nextAt = stored.nextAt ?? 5;
      if (order < nextAt) { if (!cancelled) setReviewTasks([]); return; }
      try {
        const res = await fetch(`/api/review?moduleSlug=${moduleSlug}&count=3`);
        const tasks = await res.json();
        if (cancelled) return;
        if (tasks.length > 0) {
          setReviewTasks(tasks);
          const interval = Math.floor(Math.random() * 4) + 1;
          localStorage.setItem(key, JSON.stringify({ nextAt: order + interval }));
        } else {
          setReviewTasks([]);
        }
      } catch {
        if (!cancelled) setReviewTasks([]);
      }
    }
    loadReview();
    return () => { cancelled = true; };
  }, [lesson, moduleSlug]);

  useEffect(() => {
    let cancelled = false;
    // Reset state when switching lessons so stale UI doesn't flash
    setLesson(null);
    setLoading(true);
    setCompleted([]);
    setWrong([]);
    setTaskIdx(0);
    setSelected(null);
    setSubmitted(false);
    setFinished(false);

    Promise.all([
      fetch(`/api/lessons/${lessonId}`),
      fetch(`/api/progress?lessonId=${lessonId}`)
    ])
      .then(([l, p]) => Promise.all([l.json(), p.json()]))
      .then(([les, prog]) => {
        if (cancelled) return;
        const lessonData = les?.error ? null : les;
        setLesson(lessonData);
        if (prog) {
          const c = prog.completedTasks || [];
          const w = prog.wrongTasks || [];
          const idx = prog.currentTaskIdx || 0;
          setCompleted(c);
          setWrong(w);
          setTaskIdx(idx);
          if (prog.completed) setFinished(true);
          // Restore submitted/selected for current task if already answered
          const t = lessonData?.tasks?.[idx];
          if (t && c.includes(t.id) && t.answer != null) {
            setSelected(t.answer);
            setSubmitted(true);
          }
        }
      })
      .catch(() => {})
      .finally(() => { if (!cancelled) setLoading(false); });

    return () => { cancelled = true; };
  }, [lessonId]);

  function save(patch = {}) {
    const body = {
      lessonId,
      completedTasks: completed,
      wrongTasks: wrong,
      currentTaskIdx: taskIdx,
      completed: finished,
      ...patch,
    };
    fetch("/api/progress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      keepalive: true,
    }).catch(() => {});
  }

  useEffect(() => {
    if (loading || !lesson) return;
    function flush() {
      const body = JSON.stringify({
        lessonId,
        completedTasks: completed,
        wrongTasks: wrong,
        currentTaskIdx: taskIdx,
        completed: finished,
      });
      navigator.sendBeacon?.("/api/progress", new Blob([body], { type: "application/json" }));
    }
    function onVis() { if (document.visibilityState === "hidden") flush(); }
    window.addEventListener("beforeunload", flush);
    document.addEventListener("visibilitychange", onVis);
    return () => {
      window.removeEventListener("beforeunload", flush);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [lessonId, completed, wrong, taskIdx, finished, loading, lesson]);

  useEffect(() => {
    function onKey(e) {
      if (e.target.tagName === "TEXTAREA" || e.target.tagName === "INPUT") return;
      if (view !== "tasks" || retryMode) return;
      if (e.key === "Enter") {
        if (finished) return;
        if (!submitted && selected) submit();
        else if (submitted) next();
      }
      if (e.key === "ArrowRight" && submitted && !finished) next();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [view, submitted, selected, finished, retryMode, taskIdx]);

  function submit() {
    if (!selected || submitted || !lesson) return;
    setSubmitted(true);
    const t = lesson.tasks[taskIdx];
    if (!t) return;
    const isCorrect = selected === t.answer;

    if (isCorrect) {
      let nc = completed;
      let nw = wrong;
      if (!completed.includes(t.id)) nc = [...completed, t.id];
      if (wrong.includes(t.id)) nw = wrong.filter(id => id !== t.id);
      setCompleted(nc);
      setWrong(nw);
      const allDone = lesson.tasks.every(tk => nc.includes(tk.id));
      if (allDone) setFinished(true);
      save({ completedTasks: nc, wrongTasks: nw, completed: allDone });
    } else {
      // Mark as wrong, disable this option
      let nw = wrong;
      if (!wrong.includes(t.id) && !completed.includes(t.id)) nw = [...wrong, t.id];
      setWrong(nw);
      setDisabledOpts(prev => ({
        ...prev,
        [t.id]: [...(prev[t.id] || []), selected],
      }));
      save({ wrongTasks: nw });
    }
  }

  function resetCodingState() {
    setCodeValue("");
    setCodeOutput(null);
    setCodeRunning(false);
    setCodeEvaluating(false);
    setCodeResult(null);
    setFillValue("");
    setFillSubmitted(false);
  }

  async function fetchHint(task) {
    if (hintLoading) return;
    const current = hints[task.id] || [];
    if (current.length >= 3) return;
    setHintLoading(true);
    try {
      const res = await fetch("/api/hint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: task.question,
          language: task.language,
          type: task.type,
          lessonTitle: lesson?.title || "",
          hintIndex: current.length,
        }),
      });
      const data = await res.json();
      if (data.hint) setHints(h => ({ ...h, [task.id]: [...current, data.hint] }));
    } catch {}
    setHintLoading(false);
  }

  function submitFillBlank(task) {
    if (fillSubmitted) return;
    setFillSubmitted(true);
    const correct = fillValue.trim().toLowerCase() === (task.answer || "").trim().toLowerCase();
    if (correct) {
      const nc = completed.includes(task.id) ? completed : [...completed, task.id];
      const nw = wrong.filter(id => id !== task.id);
      setCompleted(nc);
      setWrong(nw);
      const allDone = lesson.tasks.every(tk => nc.includes(tk.id));
      if (allDone) setFinished(true);
      save({ completedTasks: nc, wrongTasks: nw, completed: allDone });
    } else {
      if (!wrong.includes(task.id) && !completed.includes(task.id)) {
        const nw = [...wrong, task.id];
        setWrong(nw);
        save({ wrongTasks: nw });
      }
    }
  }

  function handleCodeKeyDown(e) {
    const ta = e.target;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const val = ta.value;

    // Tab → 2 spaces
    if (e.key === "Tab") {
      e.preventDefault();
      const newVal = val.substring(0, start) + "  " + val.substring(end);
      setCodeValue(newVal);
      requestAnimationFrame(() => { ta.selectionStart = ta.selectionEnd = start + 2; });
      return;
    }

    // Enter → keep indentation + extra indent after { ( [
    if (e.key === "Enter") {
      e.preventDefault();
      const before = val.substring(0, start);
      const lineStart = before.lastIndexOf("\n") + 1;
      const indent = before.substring(lineStart).match(/^(\s*)/)[1];
      const lastChar = before.trimEnd().slice(-1);
      const extra = ["{", "[", "("].includes(lastChar) ? "  " : "";
      const newVal = before + "\n" + indent + extra + val.substring(end);
      setCodeValue(newVal);
      const pos = start + 1 + indent.length + extra.length;
      requestAnimationFrame(() => { ta.selectionStart = ta.selectionEnd = pos; });
      return;
    }

    // Auto-close pairs
    const pairs = { '"': '"', "'": "'", "(": ")", "[": "]", "{": "}", "`": "`" };
    const closers = new Set(['"', "'", ")", "]", "}", "`"]);

    if (pairs[e.key]) {
      const selected = val.substring(start, end);
      const close = pairs[e.key];
      // Wrap selection
      if (selected) {
        e.preventDefault();
        const newVal = val.substring(0, start) + e.key + selected + close + val.substring(end);
        setCodeValue(newVal);
        requestAnimationFrame(() => { ta.selectionStart = start + 1; ta.selectionEnd = end + 1; });
        return;
      }
      // Skip over existing closing char
      if (closers.has(e.key) && val[end] === e.key) {
        e.preventDefault();
        requestAnimationFrame(() => { ta.selectionStart = ta.selectionEnd = end + 1; });
        return;
      }
      // Insert pair
      e.preventDefault();
      const newVal = val.substring(0, start) + e.key + close + val.substring(end);
      setCodeValue(newVal);
      requestAnimationFrame(() => { ta.selectionStart = ta.selectionEnd = start + 1; });
    }
  }

  function runInIframe(code) {
    return new Promise((resolve) => {
      const iframe = document.createElement("iframe");
      iframe.setAttribute("sandbox", "allow-scripts");
      iframe.style.cssText = "display:none;width:0;height:0;border:none;position:absolute;";
      document.body.appendChild(iframe);

      let url = null;
      function cleanup() {
        window.removeEventListener("message", handler);
        try { document.body.removeChild(iframe); } catch {}
        if (url) { try { URL.revokeObjectURL(url); } catch {} }
      }

      const timer = setTimeout(() => {
        cleanup();
        resolve("Timeout: codul a durat prea mult (>3s)");
      }, 3000);

      function handler(e) {
        if (e.source !== iframe.contentWindow) return;
        clearTimeout(timer);
        cleanup();
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
const localStorage=(()=>{const s={};return{setItem:(k,v)=>{s[k]=String(v);},getItem:(k)=>k in s?s[k]:null,removeItem:(k)=>{delete s[k];},clear:()=>{Object.keys(s).forEach(k=>delete s[k]);},key:(i)=>Object.keys(s)[i]||null,get length(){return Object.keys(s).length;}};})();
window.localStorage=localStorage;
try{
${code}
}catch(e){_log.push('Eroare: '+e.message);}
parent.postMessage({logs:_log},'*');
`;
      const html = `<!DOCTYPE html><html><head></head><body><script>${setup}<\/script></body></html>`;
      const blob = new Blob([html], { type: "text/html" });
      url = URL.createObjectURL(blob);
      iframe.src = url;
    });
  }

  function restoreTaskState(idx, taskList, completedList) {
    const t = taskList[idx];
    if (t && completedList.includes(t.id)) {
      setSelected(t.answer);
      setSubmitted(true);
    } else {
      setSelected(null);
      setSubmitted(false);
    }
  }

  function scrollTop() {
    document.querySelector(".flex-1.overflow-y-auto")?.scrollTo({ top: 0, behavior: "smooth" });
  }

  function next() {
    if (!lesson?.tasks) return;
    resetCodingState();
    scrollTop();

    if (retryMode) {
      const ni = retryIdx + 1;
      if (ni < retryQueue.length) {
        setRetryIdx(ni);
        setSelected(null); setSubmitted(false);
      } else {
        setRetryMode(false);
        setRetryQueue([]);
        setRetryIdx(0);
        setFinished(true);
        setSelected(null); setSubmitted(false);
      }
      return;
    }

    const ni = taskIdx + 1;
    if (ni < lesson.tasks.length) {
      setTaskIdx(ni);
      save({ currentTaskIdx: ni });
      restoreTaskState(ni, tasks, completed);
    } else {
      setFinished(true);
      setSelected(null); setSubmitted(false);
      save({ completed: true });
    }
  }

  function startRetry() {
    if (!lesson?.tasks || wrong.length === 0) return;
    const queue = lesson.tasks.filter(t => wrong.includes(t.id));
    setRetryQueue(queue);
    setRetryIdx(0);
    setRetryMode(true);
    setFinished(false);
    setSelected(null);
    setSubmitted(false);
  }

  function submitRetry() {
    const t = retryQueue[retryIdx];
    if (!selected || submitted || !t) return;
    setSubmitted(true);
    const isCorrect = selected === t.answer;
    if (isCorrect) {
      const nc = completed.includes(t.id) ? completed : [...completed, t.id];
      const nw = wrong.filter(id => id !== t.id);
      setCompleted(nc);
      setWrong(nw);
      // Always save completed: true — lesson is already done (entered retry from finish screen)
      save({ completedTasks: nc, wrongTasks: nw, completed: true });
    } else {
      setDisabledOpts(prev => ({
        ...prev,
        [t.id]: [...(prev[t.id] || []), selected],
      }));
    }
  }

  function prev() {
    if (taskIdx > 0) {
      resetCodingState();
      const pi = taskIdx - 1;
      setTaskIdx(pi);
      save({ currentTaskIdx: pi });
      restoreTaskState(pi, tasks, completed);
    }
  }

  function jumpTo(idx) {
    setFinished(false);
    resetCodingState();
    setSidebarOpen(false);
    setTaskIdx(idx);
    save({ currentTaskIdx: idx });
    restoreTaskState(idx, tasks, completed);
    scrollTop();
  }

  const PISTON_LANGS = {
    python: { language: "python", version: "3.10.0" },
    c: { language: "c", version: "10.2.0" },
    cpp: { language: "c++", version: "10.2.0" },
    java: { language: "java", version: "15.0.2" },
    csharp: { language: "csharp", version: "6.12.0" },
    php: { language: "php", version: "8.2.3" },
    sql: null,
  };

  async function runWithPiston(code, lang) {
    const cfg = PISTON_LANGS[lang];
    if (!cfg) return "(execuție indisponibilă pentru " + lang + ")";
    try {
      const res = await fetch("https://emkc.org/api/v2/piston/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ language: cfg.language, version: cfg.version, files: [{ content: code }] }),
      });
      const data = await res.json();
      return (data.run?.stdout || "") + (data.run?.stderr ? "EROARE: " + data.run.stderr : "") || "(fără output)";
    } catch {
      return "Eroare la conexiunea cu serverul de execuție.";
    }
  }

  async function runCode(code, language) {
    setCodeRunning(true);
    setCodeOutput(null);
    let out = "";
    try {
      const lang = (language || "javascript").toLowerCase();
      if (lang === "javascript" || lang === "jsx" || !lang) {
        out = await runInIframe(code);
      } else {
        out = await runWithPiston(code, lang);
      }
      setCodeOutput(out);
    } catch {
      out = "Eroare la rularea codului.";
      setCodeOutput(out);
    }
    setCodeRunning(false);
    return out;
  }

  async function submitCode(task, code) {
    if (!code.trim()) return;
    setCodeEvaluating(true);
    const output = await runCode(code, task.language);

    try {
      const res = await fetch("/api/evaluate-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code,
          output,
          question: task.question,
          language: task.language || "javascript",
          lessonTitle: lesson?.title || "",
          explanation: task.explanation || "",
        }),
      });
      const evaluation = await res.json();
      setCodeResult(evaluation);

      if (evaluation.correct) {
        const nc = completed.includes(task.id) ? completed : [...completed, task.id];
        const nw = wrong.filter(id => id !== task.id);
        setCompleted(nc);
        setWrong(nw);
        const allDone = lesson.tasks.every(tk => nc.includes(tk.id));
        if (allDone) setFinished(true);
        save({ completedTasks: nc, wrongTasks: nw, completed: allDone });
      } else {
        if (!wrong.includes(task.id) && !completed.includes(task.id)) {
          const nw = [...wrong, task.id];
          setWrong(nw);
          save({ wrongTasks: nw });
        }
      }
    } catch {
      setCodeResult({ correct: false, feedback: "Eroare la evaluare. Încearcă din nou." });
    }
    setCodeEvaluating(false);
  }

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-indigo-50 dark:from-slate-900 dark:to-slate-800">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 rounded-full border-4 border-indigo-200 dark:border-indigo-900 border-t-indigo-600 dark:border-t-indigo-400 animate-spin"/>
        <p className="text-indigo-500 dark:text-indigo-300 font-semibold text-sm">Se încarcă lecția...</p>
      </div>
    </div>
  );

  if (!lesson) return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-indigo-50 dark:from-slate-900 dark:to-slate-800">
      <Link href={`/modules/${moduleSlug}`} className="text-indigo-600 dark:text-indigo-400 flex items-center gap-2">
        <ChevronLeft className="w-4 h-4"/> Înapoi la modul
      </Link>
    </div>
  );

  const tasks = lesson?.tasks ?? [];
  const task = tasks[taskIdx] ?? null;
  const diff = DIFF[task?.difficulty ?? "easy"];

  const totalTasks = tasks.length;
  const doneCount = completed.length;
  const rt = reviewTasks?.[reviewIdx] ?? null;
  const rtDiff = DIFF[rt?.difficulty ?? "easy"];
  const showReview = view === "tasks" && !finished && reviewTasks && reviewTasks.length > 0 && !reviewDone && rt;

  return (
    <div className="h-screen bg-gradient-to-br from-slate-100 to-indigo-50 dark:from-slate-900 dark:to-slate-800 flex flex-col overflow-hidden">
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/40 z-30 lg:hidden" onClick={() => setSidebarOpen(false)}/>
      )}

      <div className="flex flex-1 overflow-hidden">
        {/* ── SIDEBAR ── */}
        <aside className={`fixed lg:static inset-y-0 left-0 z-40 w-[85vw] max-w-[300px] lg:w-72 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 flex flex-col shadow-xl lg:shadow-none transition-transform duration-200
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>

          <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-4 text-white">
            <Link href={`/modules/${moduleSlug}`}
              className="flex items-center gap-2 text-white/80 hover:text-white text-xs font-semibold mb-3 transition-colors">
              <ChevronLeft className="w-4 h-4"/> Înapoi la modul
            </Link>
            <p className="text-indigo-200 text-xs uppercase tracking-widest font-bold mb-1">{lesson.module?.title}</p>
            <h2 className="text-sm font-black leading-snug">{lesson.title}</h2>
            {finished && (
              <span className="inline-flex items-center gap-1 mt-2 bg-emerald-400 text-emerald-900 text-xs font-black px-2 py-0.5 rounded-full">
                <CheckCircle className="w-3 h-3"/> Finalizată!
              </span>
            )}
          </div>

          {/* Tabs */}
          <div className="flex border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50">
            <button onClick={() => setView("theory")}
              className={`flex-1 py-2.5 text-xs font-bold flex items-center justify-center gap-1.5 transition-all border-b-2
                ${view === "theory" ? "border-indigo-500 text-indigo-600 dark:text-indigo-300 bg-white dark:bg-slate-800" : "border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"}`}>
              <BookOpen className="w-3.5 h-3.5"/> Teorie
            </button>
            <button onClick={() => setView("tasks")}
              className={`flex-1 py-2.5 text-xs font-bold flex items-center justify-center gap-1.5 transition-all border-b-2
                ${view === "tasks" ? "border-indigo-500 text-indigo-600 dark:text-indigo-300 bg-white dark:bg-slate-800" : "border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"}`}>
              <ClipboardList className="w-3.5 h-3.5"/> Probleme
            </button>
          </div>

          {/* Progress */}
          <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Progres</span>
              <span className="text-xs font-black text-indigo-600 dark:text-indigo-300">{doneCount}/{totalTasks}</span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
              <div className="h-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all"
                style={{ width: `${totalTasks > 0 ? Math.round((doneCount / totalTasks) * 100) : 0}%` }}/>
            </div>
          </div>

          {/* Problem list */}
          <div className="flex-1 overflow-y-auto py-2">
            <p className="px-4 py-1 text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Probleme</p>
            {tasks.map((t, idx) => {
              const isDone = completed.includes(t.id);
              const isWrong = wrong.includes(t.id) && !isDone;
              const isCurrent = idx === taskIdx && view === "tasks";
              const d = DIFF[t.difficulty] ?? DIFF.easy;
              return (
                <button key={t.id} onClick={() => { setView("tasks"); jumpTo(idx); }}
                  className={`w-full text-left px-3 py-2.5 flex items-center gap-3 transition-all hover:bg-indigo-50 dark:hover:bg-indigo-900/30 border-l-4
                    ${isCurrent ? "bg-indigo-50 dark:bg-indigo-900/40 border-indigo-500" : "border-transparent"}`}>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0
                    ${isDone ? "bg-emerald-500 text-white" : isWrong ? "bg-red-500 text-white" : isCurrent ? "bg-indigo-500 text-white" : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300"}`}>
                    {isDone ? <CheckCircle className="w-4 h-4"/> : isWrong ? <XCircle className="w-4 h-4"/> : idx + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-xs font-semibold truncate ${isCurrent ? "text-indigo-700 dark:text-indigo-200" : "text-slate-700 dark:text-slate-200"}`}>
                      {t.name || `Problema ${idx + 1}`}
                    </p>
                    <span className={`text-xs font-bold px-1.5 py-0.5 rounded border ${d.cls}`}>{d.label}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </aside>

        {/* ── MAIN ── */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Top bar */}
          <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-3 sm:px-4 py-2.5 sm:py-3 flex items-center gap-2 sm:gap-3 shadow-sm sticky top-0 z-20">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 rounded-xl bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-300 active:scale-95">
              <Menu className="w-5 h-5"/>
            </button>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] sm:text-xs text-slate-400 dark:text-slate-500 font-semibold truncate">{lesson.module?.title}</p>
              <p className="text-xs sm:text-sm font-black text-slate-800 dark:text-white truncate">{lesson.title}</p>
            </div>
            {view === "tasks" && !finished && totalTasks > 0 && (
              <div className="flex items-center gap-1.5 bg-indigo-50 dark:bg-indigo-900/40 px-2 sm:px-3 py-1.5 rounded-xl flex-shrink-0">
                <span className="text-[10px] sm:text-xs font-black text-indigo-600 dark:text-indigo-300">{doneCount}/{totalTasks}</span>
                <div className="w-12 sm:w-16 bg-indigo-100 dark:bg-indigo-900/60 rounded-full h-1.5">
                  <div className="h-1.5 rounded-full bg-indigo-500 transition-all"
                    style={{ width: `${totalTasks > 0 ? (doneCount / totalTasks) * 100 : 0}%` }}/>
                </div>
              </div>
            )}
            {finished && (
              <span className="bg-emerald-500 text-white text-[10px] sm:text-xs font-black px-2.5 py-1.5 rounded-full flex items-center gap-1 flex-shrink-0">
                <Trophy className="w-3.5 h-3.5"/> Gata!
              </span>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-6">

            {/* ── THEORY VIEW ── */}
            {view === "theory" && (
              <div className="max-w-2xl mx-auto">
                <div className="mb-6">
                  <h1 className="text-2xl font-black text-indigo-900 dark:text-indigo-200 mb-2">{lesson.title}</h1>
                  <div className="flex items-start gap-2.5 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/50 rounded-xl p-3">
                    <Lightbulb className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5"/>
                    <p className="text-xs text-amber-700 dark:text-amber-200 leading-relaxed">
                      <span className="font-black">Sfat:</span> Citește teoria cu atenție înainte de probleme — exemplele de cod sunt esența fiecărei secțiuni.
                    </p>
                  </div>
                </div>
                {lesson.theory.map(th => (
                  <div key={th.id} className="mb-8">
                    <h2 className="text-lg font-black text-slate-800 dark:text-white mb-3 flex items-center gap-2">
                      <span className="w-7 h-7 bg-indigo-500 text-white rounded-lg flex items-center justify-center text-sm font-black flex-shrink-0">{th.order}</span>
                      {th.title}
                    </h2>
                    <TheoryContent content={th.content}/>
                  </div>
                ))}
                <div className="mt-6 bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-200 dark:border-indigo-800 rounded-2xl p-4 flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <p className="font-black text-indigo-800 dark:text-indigo-200 text-sm">Gata cu teoria?</p>
                    <p className="text-xs text-indigo-500 dark:text-indigo-400 mt-0.5">{lesson.tasks.length} probleme te așteaptă · ~{Math.ceil(lesson.tasks.length * 0.5)} min</p>
                  </div>
                  <button onClick={() => setView("tasks")}
                    className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-5 py-2.5 rounded-xl font-black hover:opacity-90 transition-opacity flex items-center gap-2 flex-shrink-0 text-sm shadow-md active:scale-95">
                    <ClipboardList className="w-4 h-4"/> Probleme <ArrowRight className="w-4 h-4"/>
                  </button>
                </div>
              </div>
            )}

            {/* ── FINISHED VIEW ── */}
            {view === "tasks" && finished && !retryMode && (() => {
              const correctCount = completed.length;
              const wrongCount = wrong.length;
              const xpTasks = correctCount * 10;
              const xpBonus = 50;
              const xpTotal = xpTasks + xpBonus;
              const percent = totalTasks > 0 ? Math.round((correctCount / totalTasks) * 100) : 0;
              const allCorrect = wrongCount === 0;
              return (
                <div className="max-w-lg mx-auto text-center py-10">
                  <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-5 ${allCorrect ? "bg-yellow-100" : "bg-indigo-100"}`}>
                    <Trophy className={`w-12 h-12 ${allCorrect ? "text-yellow-500" : "text-indigo-500"}`}/>
                  </div>
                  <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">
                    {allCorrect ? "Lecție finalizată perfect!" : "Lecție finalizată!"}
                  </h2>
                  <p className="text-slate-500 dark:text-slate-300 mb-1">
                    <span className="font-black text-emerald-600 dark:text-emerald-400">{correctCount}/{totalTasks}</span> corecte ·{" "}
                    {wrongCount > 0 && <span className="font-black text-red-500">{wrongCount} greșite · </span>}
                    <span className="font-black text-slate-700 dark:text-slate-200">{percent}%</span>
                  </p>
                  <p className="text-xs text-slate-400 dark:text-slate-500 mb-5">
                    {allCorrect ? "Excelent! Toate răspunsurile corecte din prima!" : "Corectează greșelile pentru a câștiga XP complet."}
                  </p>
                  <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border border-indigo-200 dark:border-indigo-800 rounded-2xl p-4 mb-6">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Zap className="w-5 h-5 text-yellow-500"/>
                      <p className="font-black text-lg text-indigo-800 dark:text-indigo-200">+{xpTotal} XP câștigate</p>
                    </div>
                    <div className="flex items-center justify-center gap-4 text-xs text-indigo-600 dark:text-indigo-400">
                      <span>+{xpTasks} XP din {correctCount} exerciții</span>
                      <span className="text-indigo-300">·</span>
                      <span>+{xpBonus} XP bonus lecție</span>
                    </div>
                    {wrongCount > 0 && (
                      <p className="text-xs text-amber-600 dark:text-amber-400 mt-2">
                        Corectând cele {wrongCount} greșeli câștigi încă +{wrongCount * 10} XP
                      </p>
                    )}
                  </div>
                  <div className="flex gap-3 justify-center flex-wrap">
                    {wrongCount > 0 && (
                      <button onClick={startRetry}
                        className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-5 py-2.5 rounded-xl font-black hover:opacity-90 transition-opacity text-sm shadow-md">
                        <Wand2 className="w-4 h-4"/> Corectează ({wrongCount})
                      </button>
                    )}
                    <button onClick={() => setView("theory")}
                      className="flex items-center gap-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-white px-5 py-2.5 rounded-xl font-bold hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors text-sm active:scale-95">
                      <BookOpen className="w-4 h-4"/> Recitește teoria
                    </button>
                    <button onClick={() => { setFinished(false); jumpTo(0); }}
                      className="flex items-center gap-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-white px-5 py-2.5 rounded-xl font-bold hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors text-sm active:scale-95">
                      <RotateCcw className="w-4 h-4"/> Reia
                    </button>
                    {lesson.nextLesson && (
                      <Link href={`/modules/${moduleSlug}/lessons/${lesson.nextLesson.id}`}
                        className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-green-600 text-white px-5 py-2.5 rounded-xl font-bold hover:opacity-90 transition-opacity text-sm shadow-md">
                        <Play className="w-4 h-4"/> Lecția următoare <ChevronRight className="w-4 h-4"/>
                      </Link>
                    )}
                    <Link href={`/modules/${moduleSlug}`}
                      className="flex items-center gap-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-white px-5 py-2.5 rounded-xl font-bold hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors text-sm active:scale-95">
                      <ChevronLeft className="w-4 h-4"/> Înapoi la modul
                    </Link>
                  </div>
                </div>
              );
            })()}

            {/* ── RETRY VIEW ── */}
            {view === "tasks" && retryMode && retryQueue[retryIdx] && (() => {
              const t = retryQueue[retryIdx];
              const tDiff = DIFF[t.difficulty] ?? DIFF.easy;
              const disabled = disabledOpts[t.id] || [];
              return (
                <div className="max-w-2xl mx-auto">
                  <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-4 mb-5 flex items-center gap-3 text-white shadow-lg">
                    <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Wand2 className="w-5 h-5"/>
                    </div>
                    <div className="flex-1">
                      <p className="font-black text-sm">Mod corecție</p>
                      <p className="text-orange-100 text-xs mt-0.5">Întrebarea {retryIdx + 1} din {retryQueue.length} · răspunsurile greșite anterior sunt blocate</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <h3 className="text-sm font-black text-slate-800 dark:text-white flex-1">{t.name}</h3>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full border flex-shrink-0 ${tDiff.cls}`}>{tDiff.label}</span>
                  </div>
                  <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 mb-4 shadow-sm border border-slate-100 dark:border-slate-700">
                    <p className="text-slate-800 dark:text-slate-200 text-sm leading-relaxed font-medium" dangerouslySetInnerHTML={{ __html: fmtQuestion(t.question) }}/>
                  </div>

                  <div className="space-y-2.5 mb-4">
                    {(shuffledOptionsMap[t.id] || t.options).map(opt => {
                      const isSel = selected === opt;
                      const isCorr = opt === t.answer;
                      const isDisabled = disabled.includes(opt);
                      let cls = "border-slate-200 bg-white hover:border-orange-300 hover:bg-orange-50 cursor-pointer";
                      if (isDisabled && !submitted) {
                        cls = "border-slate-100 bg-slate-50 opacity-30 cursor-not-allowed line-through";
                      } else if (submitted) {
                        if (isCorr) cls = "border-emerald-400 bg-emerald-50";
                        else if (isSel) cls = "border-red-400 bg-red-50";
                        else cls = "border-slate-100 bg-slate-50 opacity-40";
                      } else if (isSel) cls = "border-orange-500 bg-orange-50";
                      return (
                        <div key={opt} onClick={() => { if (!submitted && !isDisabled) setSelected(opt); }}
                          className={`flex items-center gap-3 p-3.5 rounded-xl border-2 transition-all ${cls}`}>
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0
                            ${submitted && isCorr ? "border-emerald-500 bg-emerald-500"
                              : submitted && isSel ? "border-red-400 bg-red-400"
                              : isSel ? "border-orange-500 bg-orange-500"
                              : "border-slate-300"}`}>
                            {(isSel || (submitted && isCorr)) && <div className="w-2 h-2 rounded-full bg-white"/>}
                          </div>
                          <span className={`text-sm font-medium flex-1 ${isDisabled ? "text-slate-400 dark:text-slate-500" : submitted && isCorr ? "text-emerald-800 dark:text-emerald-200 font-bold" : "text-slate-700 dark:text-slate-200"}`}>{opt}</span>
                          {isDisabled && <XCircle className="w-4 h-4 text-red-400 flex-shrink-0"/>}
                          {submitted && isCorr && <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0"/>}
                        </div>
                      );
                    })}
                  </div>

                  {submitted && (
                    <div className={`rounded-2xl p-4 mb-4 border-2 ${selected === t.answer ? "bg-emerald-50 border-emerald-300" : "bg-red-50 border-red-300"}`}>
                      <p className={`font-black text-sm mb-1 flex items-center gap-1.5 ${selected === t.answer ? "text-emerald-700" : "text-red-700"}`}>
                        {selected === t.answer
                          ? <><CheckCircle className="w-4 h-4"/> Corect! +5 puncte recuperate.</>
                          : <><XCircle className="w-4 h-4"/> Tot greșit. Răspuns: <strong>{t.answer}</strong></>}
                      </p>
                      {t.explanation && <p className="text-slate-600 dark:text-slate-300 text-sm">{t.explanation}</p>}
                    </div>
                  )}

                  <div className="flex justify-between gap-3">
                    <button onClick={() => { setRetryMode(false); setSelected(null); setSubmitted(false); }}
                      className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border-2 border-slate-200 text-slate-600 font-bold text-sm hover:bg-slate-50 transition-colors">
                      Renunță
                    </button>
                    {!submitted ? (
                      <button onClick={submitRetry} disabled={!selected}
                        className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2.5 rounded-xl font-black text-sm hover:opacity-90 transition-opacity disabled:opacity-40 shadow-md">
                        <Send className="w-4 h-4"/> Verifică
                      </button>
                    ) : (
                      <button onClick={next}
                        className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-green-600 text-white px-6 py-2.5 rounded-xl font-black text-sm hover:opacity-90 transition-opacity shadow-md">
                        {retryIdx + 1 >= retryQueue.length ? <><Trophy className="w-4 h-4"/> Finalizează</> : <>Următoarea <ChevronRight className="w-4 h-4"/></>}
                      </button>
                    )}
                  </div>
                </div>
              );
            })()}

            {/* ── REVIEW VIEW ── */}
            {showReview && (
              <div className="max-w-2xl mx-auto">
                  {/* Review header */}
                  <div className="bg-gradient-to-r from-violet-500 to-purple-600 rounded-2xl p-4 mb-5 flex items-center gap-3 text-white shadow-lg">
                    <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Brain className="w-5 h-5"/>
                    </div>
                    <div className="flex-1">
                      <p className="font-black text-sm flex items-center gap-1.5">Hai să ne aducem aminte ce-am învățat! <Brain className="w-4 h-4 inline-block"/></p>
                      <p className="text-violet-200 text-xs mt-0.5">{reviewIdx + 1} din {reviewTasks.length} · din modulul <span className="font-bold text-white">{rt?.lesson?.module?.title}</span></p>
                    </div>
                    <button onClick={() => setReviewDone(true)} className="text-white/60 hover:text-white text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-white/10 transition-colors flex-shrink-0">
                      Sari peste
                    </button>
                  </div>

                  {/* Progress bar review */}
                  <div className="w-full bg-violet-100 rounded-full h-1.5 mb-5">
                    <div className="h-1.5 rounded-full bg-gradient-to-r from-violet-500 to-purple-500 transition-all"
                      style={{ width: `${((reviewIdx + 1) / reviewTasks.length) * 100}%` }}/>
                  </div>

                  {/* Question */}
                  <div className="flex items-center gap-2 mb-3">
                    <h3 className="text-sm font-black text-slate-800 dark:text-white flex-1">{rt?.name}</h3>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full border flex-shrink-0 ${rtDiff.cls}`}>{rtDiff.label}</span>
                  </div>
                  <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 mb-4 shadow-sm border border-slate-100 dark:border-slate-700">
                    <p className="text-slate-800 dark:text-slate-200 text-sm leading-relaxed font-medium" dangerouslySetInnerHTML={{ __html: fmtQuestion(rt?.question || "") }}/>
                  </div>

                  {/* Options */}
                  <div className="space-y-2.5 mb-4">
                    {(rt ? (shuffledOptionsMap[rt.id] || rt.options) : []).map(opt => {
                      const isSel = reviewSel === opt;
                      const isCorr = opt === rt.answer;
                      let cls = "border-slate-200 bg-white hover:border-violet-300 hover:bg-violet-50 cursor-pointer";
                      if (reviewSub) {
                        if (isCorr) cls = "border-emerald-400 bg-emerald-50";
                        else if (isSel) cls = "border-red-400 bg-red-50";
                        else cls = "border-slate-100 bg-slate-50 opacity-40";
                      } else if (isSel) cls = "border-violet-500 bg-violet-50";
                      return (
                        <div key={opt} onClick={() => !reviewSub && setReviewSel(opt)}
                          className={`flex items-center gap-3 p-3.5 rounded-xl border-2 transition-all ${cls} ${reviewSub ? "cursor-default" : ""}`}>
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0
                            ${reviewSub && isCorr ? "border-emerald-500 bg-emerald-500"
                              : reviewSub && isSel ? "border-red-400 bg-red-400"
                              : isSel ? "border-violet-500 bg-violet-500"
                              : "border-slate-300"}`}>
                            {(isSel || (reviewSub && isCorr)) && <div className="w-2 h-2 rounded-full bg-white"/>}
                          </div>
                          <span className={`text-sm font-medium flex-1 ${reviewSub && isCorr ? "text-emerald-800 dark:text-emerald-200 font-bold" : reviewSub && isSel ? "text-red-700 dark:text-red-300" : "text-slate-700 dark:text-slate-200"}`}>{opt}</span>
                          {reviewSub && isCorr && <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0"/>}
                        </div>
                      );
                    })}
                  </div>

                  {/* Feedback */}
                  {reviewSub && (
                    <div className={`rounded-2xl p-4 mb-4 border-2 ${reviewSel === rt?.answer ? "bg-emerald-50 border-emerald-300" : "bg-red-50 border-red-300"}`}>
                      <p className={`font-black text-sm mb-1 flex items-center gap-1.5 ${reviewSel === rt?.answer ? "text-emerald-700" : "text-red-700"}`}>
                        {reviewSel === rt?.answer ? <><CheckCircle className="w-4 h-4"/> Corect! Memoria funcționează!</> : <><span>✗</span> Răspuns corect: <strong>{rt?.answer}</strong></>}
                      </p>
                      {rt?.explanation && <p className="text-slate-600 text-xs mt-1">{rt.explanation}</p>}
                      <button onClick={() => {
                        const newScore = reviewSel === rt.answer ? reviewScore + 1 : reviewScore;
                        setReviewScore(newScore);
                        setReviewSel(null); setReviewSub(false);
                        if (reviewIdx + 1 >= reviewTasks.length) setReviewDone(true);
                        else setReviewIdx(i => i + 1);
                      }} className="mt-2 bg-violet-500 text-white px-4 py-1.5 rounded-full text-xs font-black hover:bg-violet-600 transition-colors flex items-center gap-1">
                        {reviewIdx + 1 >= reviewTasks.length ? <><Brain className="w-3 h-3"/> Continuă lecția</> : <>Următoarea <ChevronRight className="w-3 h-3"/></>}
                      </button>
                    </div>
                  )}

                  {!reviewSub && (
                    <button onClick={() => reviewSel && setReviewSub(true)} disabled={!reviewSel}
                      className="w-full bg-gradient-to-r from-violet-500 to-purple-600 text-white py-2.5 rounded-xl font-black text-sm hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-md">
                      <Send className="w-4 h-4"/> Verifică răspunsul
                    </button>
                  )}
              </div>
            )}

            {/* Review done banner */}
            {view === "tasks" && !finished && reviewDone && reviewTasks && reviewTasks.length > 0 && taskIdx === 0 && !submitted && (
              <div className="max-w-2xl mx-auto mb-5">
                <div className="bg-violet-50 border border-violet-200 rounded-2xl p-4 flex items-center gap-3">
                  <Brain className="w-8 h-8 text-violet-500 flex-shrink-0"/>
                  <div className="flex-1">
                    <p className="font-black text-violet-800 text-sm">Recapitulare completă!</p>
                    <p className="text-violet-600 text-xs mt-0.5 flex items-center gap-1">{reviewScore}/{reviewTasks.length} răspunsuri corecte din memorie · Continuă cu lecția nouă <ArrowDown className="w-3 h-3 inline-block"/></p>
                  </div>
                </div>
              </div>
            )}

            {/* ── TASK VIEW ── */}
            {view === "tasks" && !finished && !retryMode && task && !showReview && (
              <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="mb-5">
                  <p className="text-xs font-black text-indigo-400 uppercase tracking-widest mb-1">
                    PROBLEMA {taskIdx + 1} DIN {totalTasks}
                  </p>
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <h2 className="text-xl font-black text-slate-900 dark:text-white">{task.name || `Problema ${taskIdx + 1}`}</h2>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className={`text-xs font-black px-2.5 py-1 rounded-full border ${diff.cls}`}>{diff.label}</span>
                      <span className="text-xs font-black bg-yellow-100 text-yellow-700 px-2.5 py-1 rounded-full border border-yellow-200 flex items-center gap-1">
                        <Zap className="w-3 h-3"/> 10 pct
                      </span>
                    </div>
                  </div>
                </div>

                {/* Question */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 mb-2 shadow-sm border border-slate-100 dark:border-slate-700">
                  <p className="text-slate-800 dark:text-slate-200 leading-relaxed font-medium text-sm" dangerouslySetInnerHTML={{ __html: fmtQuestion(task.question) }}/>
                </div>

                {/* Hint button + hints */}
                <div className="mb-3">
                  {(hints[task.id] || []).map((h, i) => (
                    <div key={i} className="flex items-start gap-2 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-xl px-3 py-2 mb-2">
                      <Lightbulb className="w-3.5 h-3.5 text-amber-500 flex-shrink-0 mt-0.5"/>
                      <p className="text-amber-800 dark:text-amber-200 text-xs leading-relaxed">{h}</p>
                    </div>
                  ))}
                  {(hints[task.id]?.length || 0) < 3 && !completed.includes(task.id) && (
                    <button onClick={() => fetchHint(task)} disabled={hintLoading}
                      className="flex items-center gap-1.5 text-xs text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 font-bold transition-colors disabled:opacity-50">
                      {hintLoading ? <RefreshCw className="w-3 h-3 animate-spin"/> : <Sparkles className="w-3 h-3"/>}
                      {hints[task.id]?.length ? "Încă un indiciu" : "Arată indiciu"}
                    </button>
                  )}
                </div>

                {/* CODING TASK */}
                {task.type === "coding" ? (
                  <>
                    {/* Language badge + editor */}
                    <div className="rounded-2xl overflow-hidden border-2 border-gray-700 mb-3 shadow-lg">
                      <div className="flex items-center justify-between px-3 py-2 bg-gray-800 border-b border-gray-700">
                        <span className="text-xs font-black text-gray-400 uppercase tracking-widest">{(task.language || "javascript").toUpperCase()}</span>
                        {!codeResult?.correct && (
                          <button onClick={() => { setCodeValue(task.starterCode || ""); setCodeResult(null); setCodeOutput(null); }}
                            className="text-xs text-gray-500 hover:text-gray-300 flex items-center gap-1 transition-colors">
                            <RefreshCw className="w-3 h-3"/> Reset
                          </button>
                        )}
                      </div>
                      <CodeEditor
                        value={codeValue !== "" ? codeValue : (task.starterCode || "")}
                        onChange={val => { setCodeValue(val); setCodeResult(null); }}
                        language={task.language}
                        disabled={codeResult?.correct}
                        minHeight="200px"
                      />
                    </div>

                    {/* Buttons row */}
                    {!codeResult?.correct && (
                      <div className="flex gap-2 mb-3">
                        <button
                          onClick={() => runCode(codeValue !== "" ? codeValue : (task.starterCode || ""), task.language)}
                          disabled={codeRunning || codeEvaluating}
                          className="flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2.5 rounded-xl font-black text-sm transition-colors disabled:opacity-40 shadow-sm active:scale-95 min-h-[44px]">
                          {codeRunning ? <><RefreshCw className="w-4 h-4 animate-spin"/> Rulează...</> : <><Play className="w-4 h-4"/> Rulează</>}
                        </button>
                        <button
                          onClick={() => submitCode(task, codeValue !== "" ? codeValue : (task.starterCode || ""))}
                          disabled={codeEvaluating || codeRunning}
                          className="flex-1 flex items-center justify-center gap-1.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2.5 rounded-xl font-black text-sm hover:opacity-90 transition-opacity disabled:opacity-40 shadow-md active:scale-95 min-h-[44px]">
                          {codeEvaluating ? <><RefreshCw className="w-4 h-4 animate-spin"/> Verifică cu AI...</> : <><Send className="w-4 h-4"/> Trimite răspunsul</>}
                        </button>
                      </div>
                    )}

                    {/* Console output */}
                    {codeOutput !== null && !codeResult && (
                      <div className="mb-3 bg-gray-950 rounded-xl p-3 border border-gray-700">
                        <p className="text-xs font-black text-gray-400 mb-1.5 uppercase tracking-wide flex items-center gap-1.5">
                          <Play className="w-3 h-3 fill-current text-emerald-400"/> Output
                        </p>
                        <pre className="text-green-400 font-mono text-xs whitespace-pre-wrap">{codeOutput}</pre>
                      </div>
                    )}

                    {/* AI Evaluation result — full feedback like PyWeb */}
                    {codeResult && (
                      <div className={`rounded-2xl overflow-hidden border-2 mb-4 ${codeResult.correct ? "border-emerald-400" : "border-amber-400"}`}>
                        {/* Header */}
                        <div className={`px-4 py-3 flex items-center justify-between ${codeResult.correct ? "bg-emerald-50 dark:bg-emerald-900/30" : "bg-amber-50 dark:bg-amber-900/20"}`}>
                          <div className="flex items-center gap-2">
                            {codeResult.correct
                              ? <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0"/>
                              : <XCircle className="w-5 h-5 text-amber-600 flex-shrink-0"/>}
                            <span className={`font-black text-sm ${codeResult.correct ? "text-emerald-700 dark:text-emerald-300" : "text-amber-700 dark:text-amber-300"}`}>
                              {codeResult.correct ? "Rezolvat — bravo!" : "Mai încearcă!"}
                            </span>
                          </div>
                          {codeResult.scores && (
                            <span className={`text-sm font-black ${codeResult.correct ? "text-emerald-700 dark:text-emerald-300" : "text-amber-700 dark:text-amber-300"}`}>
                              Nota: {codeResult.total ?? ((codeResult.scores.functionality||0)+(codeResult.scores.quality||0)+(codeResult.scores.clarity||0))}/30
                            </span>
                          )}
                        </div>

                        <div className="bg-white dark:bg-slate-800 p-4">
                          {/* Output row */}
                          {codeOutput && (
                            <div className="mb-3 bg-gray-900 rounded-lg p-2.5">
                              <p className="text-xs font-black text-gray-400 mb-1 uppercase tracking-wide">Output</p>
                              <pre className="text-green-400 font-mono text-xs whitespace-pre-wrap">{codeOutput}</pre>
                            </div>
                          )}

                          {/* Feedback text */}
                          <p className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1">Feedback profesor</p>
                          <p className="text-slate-700 dark:text-slate-200 text-sm leading-relaxed mb-3">{codeResult.feedback}</p>

                          {/* 3 scores */}
                          {codeResult.scores && (
                            <div className="space-y-2 mb-3">
                              {[
                                { label: "Funcționalitate", key: "functionality", color: "bg-emerald-500" },
                                { label: "Calitate cod", key: "quality", color: "bg-blue-500" },
                                { label: "Claritate", key: "clarity", color: "bg-purple-500" },
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

                          {/* Issues */}
                          {codeResult.issues?.length > 0 && (
                            <div className="mb-3">
                              {codeResult.issues.map((issue, i) => (
                                <p key={i} className="text-xs text-amber-700 dark:text-amber-400 flex items-start gap-1.5 mb-1">
                                  <span className="flex-shrink-0 mt-0.5">•</span>{issue}
                                </p>
                              ))}
                            </div>
                          )}

                          {/* Best solution */}
                          {codeResult.bestSolution && (
                            <>
                              <p className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                                <Wand2 className="w-3 h-3"/> Soluția ideală
                              </p>
                              <pre className="bg-gray-900 text-green-300 font-mono text-xs p-3 rounded-xl overflow-x-auto whitespace-pre-wrap">{codeResult.bestSolution}</pre>
                            </>
                          )}

                          {/* Next button */}
                          {codeResult.correct && (
                            <button onClick={next}
                              className="mt-4 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-green-600 text-white px-6 py-3 rounded-xl font-black text-sm hover:opacity-90 transition-opacity shadow-md active:scale-95">
                              {taskIdx + 1 >= totalTasks
                                ? <><Trophy className="w-4 h-4"/> Finalizează lecția</>
                                : <>Următoarea problemă <ChevronRight className="w-4 h-4"/></>}
                            </button>
                          )}
                          {!codeResult.correct && (
                            <button onClick={() => { setCodeResult(null); setCodeOutput(null); }}
                              className="mt-3 w-full flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-white px-6 py-2.5 rounded-xl font-black text-sm transition-colors active:scale-95">
                              <RefreshCw className="w-4 h-4"/> Încearcă din nou
                            </button>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Prev button (desktop) */}
                    {!codeResult && (
                      <button onClick={prev} disabled={taskIdx === 0}
                        className="hidden sm:flex items-center gap-1.5 px-4 py-2.5 rounded-xl border-2 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-bold text-sm hover:bg-slate-50 dark:hover:bg-slate-700/40 transition-colors disabled:opacity-40 disabled:cursor-not-allowed active:scale-95 mt-1">
                        <ChevronLeft className="w-4 h-4"/> Anterior
                      </button>
                    )}
                  </>
                ) : task.type === "fillblank" ? (
                  <>
                    {/* FILL-IN-BLANK */}
                    <div className="mb-4">
                      <div className={`flex items-center gap-3 p-3 rounded-xl border-2 transition-all ${fillSubmitted ? (fillValue.trim().toLowerCase() === task.answer.trim().toLowerCase() ? "border-emerald-400 bg-emerald-50 dark:bg-emerald-900/30" : "border-red-400 bg-red-50 dark:bg-red-900/30") : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"}`}>
                        <PenLine className="w-4 h-4 text-slate-400 flex-shrink-0"/>
                        <input
                          type="text"
                          value={fillValue}
                          onChange={e => { if (!fillSubmitted) setFillValue(e.target.value); }}
                          onKeyDown={e => { if (e.key === "Enter" && !fillSubmitted && fillValue.trim()) submitFillBlank(task); }}
                          disabled={fillSubmitted}
                          placeholder="Scrie răspunsul tău..."
                          className="flex-1 bg-transparent text-sm font-mono text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none disabled:opacity-70"
                          autoComplete="off" autoCorrect="off" spellCheck={false}
                        />
                        {fillSubmitted && (fillValue.trim().toLowerCase() === task.answer.trim().toLowerCase()
                          ? <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0"/>
                          : <XCircle className="w-5 h-5 text-red-500 flex-shrink-0"/>)}
                      </div>
                    </div>

                    {fillSubmitted && (
                      <div className={`rounded-2xl p-4 mb-4 border-2 ${fillValue.trim().toLowerCase() === task.answer.trim().toLowerCase() ? "bg-emerald-50 border-emerald-300" : "bg-red-50 border-red-300"}`}>
                        <p className={`font-black text-sm mb-1 flex items-center gap-1.5 ${fillValue.trim().toLowerCase() === task.answer.trim().toLowerCase() ? "text-emerald-700" : "text-red-700"}`}>
                          {fillValue.trim().toLowerCase() === task.answer.trim().toLowerCase()
                            ? <><CheckCircle className="w-4 h-4"/> Corect! Exact!</>
                            : <><XCircle className="w-4 h-4"/> Greșit. Răspuns corect: <code className="bg-emerald-100 px-1.5 py-0.5 rounded font-mono text-emerald-800">{task.answer}</code></>}
                        </p>
                        {task.explanation && <p className="text-slate-600 dark:text-slate-300 text-sm mt-1">{task.explanation}</p>}
                      </div>
                    )}

                    <div className="flex items-center justify-between gap-2 sm:gap-3">
                      <button onClick={prev} disabled={taskIdx === 0}
                        className="flex items-center gap-1.5 px-3 sm:px-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-bold text-xs sm:text-sm hover:bg-slate-50 dark:hover:bg-slate-700/40 transition-colors disabled:opacity-40 disabled:cursor-not-allowed active:scale-95 min-h-[48px]">
                        <ChevronLeft className="w-4 h-4"/> Anterior
                      </button>
                      <div className="flex flex-col items-end gap-1 flex-1 max-w-[60%]">
                        {!fillSubmitted ? (
                          <button onClick={() => fillValue.trim() && submitFillBlank(task)} disabled={!fillValue.trim()}
                            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 sm:px-6 py-3 rounded-xl font-black text-sm hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed shadow-md active:scale-95 min-h-[48px]">
                            <Send className="w-4 h-4"/> Verifică
                          </button>
                        ) : (
                          <button onClick={next}
                            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-green-600 text-white px-4 sm:px-6 py-3 rounded-xl font-black text-sm hover:opacity-90 transition-opacity shadow-md active:scale-95 min-h-[48px]">
                            {taskIdx + 1 >= totalTasks ? <><Trophy className="w-4 h-4"/> Finalizează</> : <>Următoarea <ChevronRight className="w-4 h-4"/></>}
                          </button>
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {/* QUIZ OPTIONS */}
                    <div className="space-y-2.5 mb-5">
                      {(shuffledOptionsMap[task.id] || task.options).map(opt => {
                        const isSel = selected === opt;
                        const isCorrect = opt === task.answer;
                        let cls = "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-indigo-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 cursor-pointer active:scale-[0.99]";
                        if (submitted) {
                          if (isCorrect) cls = "border-emerald-400 bg-emerald-50 dark:bg-emerald-900/30";
                          else if (isSel) cls = "border-red-400 bg-red-50 dark:bg-red-900/30";
                          else cls = "border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-700/40 opacity-40";
                        } else if (isSel) cls = "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30";

                        return (
                          <div key={opt} onClick={() => !submitted && setSelected(opt)}
                            className={`flex items-center gap-3 p-3.5 sm:p-4 rounded-xl border-2 transition-all min-h-[56px] ${cls} ${submitted ? "cursor-default" : ""}`}>
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all
                              ${submitted && isCorrect ? "border-emerald-500 bg-emerald-500"
                                : submitted && isSel ? "border-red-400 bg-red-400"
                                : isSel ? "border-indigo-500 bg-indigo-500"
                                : "border-slate-300 dark:border-slate-500"}`}>
                              {(isSel || (submitted && isCorrect)) && <div className="w-2 h-2 rounded-full bg-white"/>}
                            </div>
                            <span className={`text-sm font-medium flex-1 ${submitted && isCorrect ? "text-emerald-800 dark:text-emerald-200 font-bold" : submitted && isSel ? "text-red-700 dark:text-red-300" : "text-slate-700 dark:text-slate-200"}`}>
                              {opt}
                            </span>
                            {submitted && isCorrect && <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0"/>}
                            {submitted && isSel && !isCorrect && <span className="text-red-500 text-xl leading-none flex-shrink-0">✗</span>}
                          </div>
                        );
                      })}
                    </div>

                    {/* Result */}
                    {submitted && (
                      <div className={`rounded-2xl p-4 mb-4 border-2 ${selected === task.answer ? "bg-emerald-50 border-emerald-300" : "bg-red-50 border-red-300"}`}>
                        <p className={`font-black text-sm mb-1 flex items-center gap-1.5 ${selected === task.answer ? "text-emerald-700" : "text-red-700"}`}>
                          {selected === task.answer
                            ? <><CheckCircle className="w-4 h-4"/> Răspuns corect! Excelent!</>
                            : <><span className="text-base">✗</span> Greșit. Corect: <strong>{task.answer}</strong></>}
                        </p>
                        {task.explanation && <p className="text-slate-600 dark:text-slate-300 text-sm">{task.explanation}</p>}
                      </div>
                    )}

                    {/* Action buttons */}
                    <div className="flex items-center justify-between gap-2 sm:gap-3">
                      <button onClick={prev} disabled={taskIdx === 0}
                        className="flex items-center gap-1.5 px-3 sm:px-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-bold text-xs sm:text-sm hover:bg-slate-50 dark:hover:bg-slate-700/40 transition-colors disabled:opacity-40 disabled:cursor-not-allowed active:scale-95 min-h-[48px]">
                        <ChevronLeft className="w-4 h-4"/> <span className="hidden xs:inline">Anterior</span><span className="xs:hidden">Înapoi</span>
                      </button>

                      <div className="flex flex-col items-end gap-1 flex-1 max-w-[60%]">
                        {!submitted ? (
                          <button onClick={submit} disabled={!selected}
                            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 sm:px-6 py-3 rounded-xl font-black text-sm hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed shadow-md active:scale-95 min-h-[48px]">
                            <Send className="w-4 h-4"/> Trimite răspunsul
                          </button>
                        ) : (
                          <button onClick={next}
                            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-green-600 text-white px-4 sm:px-6 py-3 rounded-xl font-black text-sm hover:opacity-90 transition-opacity shadow-md active:scale-95 min-h-[48px]">
                            {taskIdx + 1 >= totalTasks
                              ? <><Trophy className="w-4 h-4"/> Finalizează</>
                              : <>Următoarea <ChevronRight className="w-4 h-4"/></>}
                          </button>
                        )}
                        <p className="text-xs text-slate-400 dark:text-slate-500 hidden sm:block">
                          {!submitted ? "Enter ↵ = verifică" : "Enter ↵ = următoarea"}
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {lesson && <AIAssistant task={task} lessonTitle={lesson.title} />}
    </div>
  );
}

function TheoryCodeBlock({ code, lang }) {
  const [copied, setCopied] = useState(false);

  function copy() {
    navigator.clipboard?.writeText(code).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="rounded-2xl overflow-hidden border border-gray-700 dark:border-gray-600 my-2 shadow-md">
      <div className="flex items-center justify-between px-3 py-1.5 bg-gray-800">
        {lang && <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{lang}</span>}
        <button onClick={copy}
          className="flex items-center gap-1 text-[11px] text-gray-400 hover:text-gray-200 font-bold transition-colors ml-auto">
          <Copy className="w-3 h-3"/>
          {copied ? "Copiat!" : "Copy"}
        </button>
      </div>
      <pre className="bg-gray-900 dark:bg-black/70 text-green-300 p-4 text-xs font-mono overflow-x-auto leading-relaxed whitespace-pre">
        {code}
      </pre>
    </div>
  );
}

function TheoryContent({ content }) {
  const parts = [];
  const re = /```(\w*)\n?([\s\S]*?)```/g;
  let last = 0, m;
  while ((m = re.exec(content)) !== null) {
    if (m.index > last) parts.push({ type: "text", text: content.slice(last, m.index) });
    parts.push({ type: "code", lang: m[1] || "", text: m[2].trim() });
    last = m.index + m[0].length;
  }
  if (last < content.length) parts.push({ type: "text", text: content.slice(last) });

  return (
    <div className="space-y-3">
      {parts.map((p, i) => p.type === "code" ? (
        <TheoryCodeBlock key={i} code={p.text} lang={p.lang}/>
      ) : (
        <div key={i} className="space-y-1.5">
          {p.text.split("\n").map((line, j) => {
            if (!line.trim()) return <div key={j} className="h-1"/>;
            if (line.startsWith("### ")) return (
              <h4 key={j} className="text-sm font-black text-indigo-700 dark:text-indigo-300 mt-3 mb-1">{line.slice(4)}</h4>
            );
            if (line.startsWith("## ")) return (
              <h3 key={j} className="text-base font-black text-slate-800 dark:text-white mt-4 mb-1 border-b border-slate-200 dark:border-slate-700 pb-1">{line.slice(3)}</h3>
            );
            if (line.startsWith("# ")) return (
              <h2 key={j} className="text-lg font-black text-slate-900 dark:text-white mt-4 mb-2">{line.slice(2)}</h2>
            );
            if (line.startsWith("• ") || line.startsWith("- ")) {
              const content = line.slice(2);
              return (
                <div key={j} className="flex gap-2 text-sm text-slate-700 dark:text-slate-200">
                  <span className="text-indigo-500 dark:text-indigo-400 flex-shrink-0 font-black mt-0.5">•</span>
                  <span dangerouslySetInnerHTML={{ __html: fmt(content) }}/>
                </div>
              );
            }
            return <p key={j} className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed" dangerouslySetInnerHTML={{ __html: fmt(line) }}/>;
          })}
        </div>
      ))}
    </div>
  );
}

function escapeHtml(s) {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function fmt(t) {
  return escapeHtml(t)
    .replace(/\*\*(.+?)\*\*/g, "<strong class='text-slate-900 dark:text-white'>$1</strong>")
    .replace(/`(.+?)`/g, "<code class='bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 px-1.5 py-0.5 rounded font-mono text-xs'>$1</code>");
}

function fmtQuestion(text) {
  const parts = [];
  const re = /```(?:\w*)\n?([\s\S]*?)```/g;
  let last = 0, m;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) {
      parts.push(`<span>${fmt(text.slice(last, m.index))}</span>`);
    }
    parts.push(`<pre class="bg-gray-900 dark:bg-black/60 text-green-300 rounded-xl p-3 text-xs font-mono overflow-x-auto my-2 leading-relaxed whitespace-pre">${escapeHtml(m[1].trim())}</pre>`);
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push(`<span>${fmt(text.slice(last))}</span>`);
  return parts.join("");
}
