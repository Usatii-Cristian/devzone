"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  ArrowLeft, Shield, RefreshCw, Trash2, ChevronDown, ChevronUp,
  CheckCircle, Clock, BarChart2, User, AlertTriangle, BookOpen,
  RotateCcw, Zap, Trophy, Target, Plus, Pencil, Check, X, Minus,
} from "lucide-react";
import Navbar from "@/components/Navbar";

/* ─── Confirm modal ─────────────────────────────────────────────────────── */
function ConfirmModal({ message, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onCancel}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-6 max-w-sm w-full" onClick={e => e.stopPropagation()}>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
          </div>
          <p className="text-sm font-bold text-slate-800 dark:text-white">{message}</p>
        </div>
        <div className="flex gap-2">
          <button onClick={onCancel} className="flex-1 py-2.5 rounded-xl border-2 border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 font-bold text-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
            Anulează
          </button>
          <button onClick={onConfirm} className="flex-1 py-2.5 rounded-xl bg-red-500 text-white font-bold text-sm hover:bg-red-600 transition-colors">
            Șterge
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Inline editor for a single lesson ─────────────────────────────────── */
function LessonEditor({ lesson, userId, onSave, onCancel }) {
  const max = lesson.totalTaskCount || 15;
  const [count, setCount] = useState(lesson.completedTasks ?? 0);
  const [done, setDone] = useState(lesson.completed ?? false);
  const [saving, setSaving] = useState(false);

  // Auto-toggle "finalizată" when all tasks selected
  useEffect(() => {
    if (count === max && max > 0) setDone(true);
    else if (count < max) setDone(false);
  }, [count, max]);

  async function save() {
    setSaving(true);
    await onSave({ userId, lessonId: lesson.lessonId, completedTasksCount: count, wrongTasksCount: 0, completed: done, taskIds: lesson.taskIds || [] });
    setSaving(false);
  }

  return (
    <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800 rounded-xl p-3 mt-1">
      <p className="text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-2">
        Editează: {lesson.lessonTitle}
      </p>

      {/* Task count */}
      <div className="mb-3">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs font-bold text-slate-600 dark:text-slate-300">Taskuri completate</span>
          <span className="text-xs font-black text-indigo-600 dark:text-indigo-400">{count} / {max}</span>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setCount(c => Math.max(0, c - 1))} className="w-7 h-7 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors">
            <Minus className="w-3 h-3 text-slate-600 dark:text-slate-300" />
          </button>
          <input
            type="range" min={0} max={max} value={count}
            onChange={e => setCount(Number(e.target.value))}
            className="flex-1 accent-indigo-500 h-2"
          />
          <button onClick={() => setCount(c => Math.min(max, c + 1))} className="w-7 h-7 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors">
            <Plus className="w-3 h-3 text-slate-600 dark:text-slate-300" />
          </button>
        </div>
        {/* Quick set buttons */}
        <div className="flex gap-1 mt-1.5 flex-wrap">
          {[0, Math.floor(max / 2), max].map(v => (
            <button key={v} onClick={() => setCount(v)}
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full transition-colors ${count === v ? "bg-indigo-500 text-white" : "bg-white dark:bg-slate-700 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-600 hover:border-indigo-300"}`}>
              {v === 0 ? "Niciunul" : v === max ? "Toate" : `${v}`}
            </button>
          ))}
        </div>
      </div>

      {/* Completed toggle */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-bold text-slate-600 dark:text-slate-300">Lecție finalizată</span>
        <button
          onClick={() => setDone(d => !d)}
          className={`relative w-10 h-5 rounded-full transition-colors ${done ? "bg-emerald-500" : "bg-slate-300 dark:bg-slate-600"}`}>
          <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${done ? "translate-x-5" : "translate-x-0.5"}`} />
        </button>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <button onClick={onCancel} disabled={saving}
          className="flex-1 py-2 rounded-xl border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 font-bold text-xs hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
          Anulează
        </button>
        <button onClick={save} disabled={saving}
          className="flex-1 py-2 rounded-xl bg-indigo-500 text-white font-bold text-xs hover:bg-indigo-600 transition-colors disabled:opacity-60 flex items-center justify-center gap-1.5">
          {saving ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />}
          Salvează
        </button>
      </div>
    </div>
  );
}

/* ─── Single lesson row ──────────────────────────────────────────────────── */
function LessonRow({ lesson, userId, onEdit, onDelete, editingId, onSave, onCancelEdit, loading }) {
  const isEditing = editingId === lesson.lessonId;
  const hasProgress = lesson.progressId !== null;

  let statusColor = "bg-slate-200 dark:bg-slate-600";
  let statusIcon = null;
  if (lesson.completed) { statusColor = "bg-emerald-500"; statusIcon = <CheckCircle className="w-2.5 h-2.5 text-white" />; }
  else if (lesson.completedTasks > 0) { statusColor = "bg-amber-400"; statusIcon = <Clock className="w-2.5 h-2.5 text-white" />; }

  return (
    <div className="border-t border-slate-100 dark:border-slate-700">
      <div className="flex items-center gap-2 px-3 py-2 bg-slate-50/50 dark:bg-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
        <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${statusColor}`}>
          {statusIcon}
        </div>
        <span className="text-xs text-slate-700 dark:text-slate-300 flex-1 truncate">{lesson.lessonTitle}</span>
        {hasProgress && (
          <span className="text-[10px] text-slate-400 flex-shrink-0">
            {lesson.completedTasks}/{lesson.totalTaskCount}
          </span>
        )}
        <div className="flex items-center gap-1 flex-shrink-0">
          <button
            onClick={() => onEdit(lesson.lessonId)}
            disabled={loading}
            className="p-1 rounded-lg text-slate-400 hover:text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors disabled:opacity-40"
            title={hasProgress ? "Editează progresul" : "Adaugă progres"}
          >
            {hasProgress ? <Pencil className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
          </button>
          {hasProgress && (
            <button
              onClick={() => onDelete({ userId, lessonId: lesson.lessonId, label: `lecția "${lesson.lessonTitle}"` })}
              disabled={loading}
              className="p-1 rounded-lg text-slate-300 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors disabled:opacity-40"
              title="Șterge progresul"
            >
              <Trash2 className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>
      {isEditing && (
        <div className="px-3 pb-2 bg-slate-50/50 dark:bg-slate-800/50">
          <LessonEditor lesson={lesson} userId={userId} onSave={onSave} onCancel={onCancelEdit} />
        </div>
      )}
    </div>
  );
}

/* ─── Module accordion ───────────────────────────────────────────────────── */
function ModuleSection({ mod, userId, onEdit, onDelete, onSetProgress, editingId, onCancelEdit, loading }) {
  const [open, setOpen] = useState(false);
  const pct = mod.totalLessons > 0 ? Math.round((mod.doneLessons / mod.totalLessons) * 100) : 0;
  const activeLessons = mod.lessons.filter(l => l.progressId !== null).length;

  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
      <div className="flex items-center gap-2 px-3 py-2.5 bg-white dark:bg-slate-800">
        <button onClick={() => setOpen(o => !o)} className="flex items-center gap-2 flex-1 min-w-0 text-left">
          <span className="text-xs font-black text-slate-700 dark:text-white truncate">{mod.title}</span>
          <span className="text-[10px] text-slate-400 flex-shrink-0">{activeLessons}/{mod.lessons.length}</span>
          {open ? <ChevronUp className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" /> : <ChevronDown className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />}
        </button>
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="w-14 bg-slate-100 dark:bg-slate-700 rounded-full h-1.5">
            <div className="h-1.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all" style={{ width: `${pct}%` }} />
          </div>
          <span className="text-[10px] text-slate-400 w-6">{pct}%</span>
          <button
            onClick={() => onDelete({ userId, moduleSlug: mod.slug, label: `modulul "${mod.title}"` })}
            disabled={loading || activeLessons === 0}
            className="p-1.5 rounded-lg text-slate-300 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors disabled:opacity-30"
            title="Resetează tot modulul"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {open && (
        <div className="divide-y divide-slate-100 dark:divide-slate-700 border-t border-slate-100 dark:border-slate-700">
          {mod.lessons.map(lesson => (
            <LessonRow
              key={lesson.lessonId}
              lesson={lesson}
              userId={userId}
              onEdit={onEdit}
              onDelete={onDelete}
              editingId={editingId}
              onSave={onSetProgress}
              onCancelEdit={onCancelEdit}
              loading={loading}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── User card ──────────────────────────────────────────────────────────── */
function UserCard({ user, onDelete, onSetProgress, loading }) {
  const [expanded, setExpanded] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const displayName = user.userId.split("@")[0];
  const xpEstimate = user.done * 100 + user.totalTasks * 10;

  function handleEdit(lessonId) {
    setEditingId(id => id === lessonId ? null : lessonId);
    if (!expanded) setExpanded(true);
  }

  async function handleSave(params) {
    await onSetProgress(params);
    setEditingId(null);
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-slate-100 dark:border-slate-700">
        <div className="flex items-start gap-3 mb-3">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
            <User className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <span className="font-black text-slate-800 dark:text-white text-sm">{displayName}</span>
              <span className="text-[10px] bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 px-1.5 py-0.5 rounded-full font-bold">~{xpEstimate} XP</span>
            </div>
            <p className="text-[11px] text-slate-400 truncate">{user.userId}</p>
          </div>
          <button
            onClick={() => onDelete({ userId: user.userId, label: `TOT progresul lui ${displayName}` })}
            disabled={loading}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 transition-colors text-xs font-bold disabled:opacity-50"
          >
            <Trash2 className="w-3.5 h-3.5" /> Reset tot
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-2">
          {[
            { icon: Trophy, v: user.done, l: "Finalizate", c: "text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 dark:text-emerald-400" },
            { icon: BookOpen, v: user.total, l: "Atinse", c: "text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400" },
            { icon: Zap, v: user.totalTasks, l: "Taskuri", c: "text-purple-600 bg-purple-50 dark:bg-purple-900/20 dark:text-purple-400" },
            { icon: Target, v: `${user.successRate}%`, l: "Succes", c: "text-amber-600 bg-amber-50 dark:bg-amber-900/20 dark:text-amber-400" },
          ].map(s => (
            <div key={s.l} className={`rounded-xl p-2 text-center ${s.c}`}>
              <s.icon className="w-3.5 h-3.5 mx-auto mb-0.5" />
              <p className="text-sm font-black">{s.v}</p>
              <p className="text-[9px] font-medium opacity-80 leading-tight">{s.l}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Modules toggle */}
      <button
        onClick={() => setExpanded(e => !e)}
        className="w-full flex items-center justify-between px-4 py-2.5 text-xs font-bold text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
      >
        <span className="flex items-center gap-1.5">
          <Pencil className="w-3 h-3" />
          Editează lecții — {user.modules.reduce((s, m) => s + m.lessons.length, 0)} disponibile
        </span>
        {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>

      {expanded && (
        <div className="px-4 pb-4 space-y-2">
          {user.modules.map(mod => (
            <ModuleSection
              key={mod.slug}
              mod={mod}
              userId={user.userId}
              onEdit={handleEdit}
              onDelete={onDelete}
              onSetProgress={handleSave}
              editingId={editingId}
              onCancelEdit={() => setEditingId(null)}
              loading={loading}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── Main page ──────────────────────────────────────────────────────────── */
export default function AdminPage() {
  const [data, setData] = useState({ users: [], allModules: [] });
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [confirm, setConfirm] = useState(null);
  const [toast, setToast] = useState(null);
  const [authorized, setAuthorized] = useState(null);

  const load = useCallback(async () => {
    setBusy(true);
    try {
      const res = await fetch("/api/admin");
      if (res.status === 401) { setAuthorized(false); setLoading(false); setBusy(false); return; }
      setAuthorized(true);
      const d = await res.json();
      setData({ users: d.users || [], allModules: d.allModules || [] });
    } catch {
      showToast("Eroare la încărcare.", "error");
    } finally {
      setLoading(false);
      setBusy(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  function showToast(msg, type = "success") {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  }

  async function handleDelete() {
    if (!confirm) return;
    const { userId, moduleSlug, lessonId, label } = confirm;
    setConfirm(null);
    setBusy(true);
    try {
      const res = await fetch("/api/admin", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, moduleSlug, lessonId }),
      });
      const d = await res.json();
      if (d.ok) { showToast(`✓ Șters: ${d.deleted} înregistrări (${label})`); await load(); }
      else showToast("Eroare la ștergere.", "error");
    } catch { showToast("Eroare.", "error"); setBusy(false); }
  }

  async function handleSetProgress(params) {
    setBusy(true);
    try {
      const res = await fetch("/api/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(params),
      });
      const d = await res.json();
      if (d.ok) { showToast("✓ Progres salvat!"); await load(); }
      else showToast("Eroare la salvare.", "error");
    } catch { showToast("Eroare.", "error"); setBusy(false); }
  }

  if (loading) return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <RefreshCw className="w-8 h-8 text-indigo-500 animate-spin" />
        <p className="text-sm text-slate-500 font-medium">Se încarcă...</p>
      </div>
    </div>
  );

  if (authorized === false) return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 text-center shadow-sm max-w-sm w-full">
        <Shield className="w-12 h-12 text-red-400 mx-auto mb-3" />
        <h2 className="font-black text-slate-800 dark:text-white text-lg mb-2">Acces restricționat</h2>
        <p className="text-sm text-slate-500 mb-4">Trebuie să fii autentificat.</p>
        <Link href="/login" className="inline-flex items-center gap-2 bg-indigo-500 text-white px-4 py-2.5 rounded-xl font-bold text-sm hover:bg-indigo-600 transition-colors">
          Autentifică-te
        </Link>
      </div>
    </div>
  );

  const totalDone = data.users.reduce((s, u) => s + u.done, 0);
  const totalTasks = data.users.reduce((s, u) => s + u.totalTasks, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/20 to-slate-100 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 pb-28">
      <header className="bg-gradient-to-r from-slate-800 to-slate-900 text-white shadow-lg sticky top-0 z-40">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
          <Link href="/" className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex items-center gap-2.5 flex-1 min-w-0">
            <div className="w-9 h-9 bg-indigo-500 rounded-xl flex items-center justify-center flex-shrink-0">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <div>
              <h1 className="font-black text-base leading-tight">Admin Panel</h1>
              <p className="text-slate-400 text-xs">Control complet progres utilizatori</p>
            </div>
          </div>
          <button onClick={load} disabled={busy} className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors disabled:opacity-50">
            <RefreshCw className={`w-4 h-4 ${busy ? "animate-spin" : ""}`} />
          </button>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-5 space-y-4">
        {/* Global stats */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { icon: User, v: data.users.length, l: "utilizatori activi", g: "from-indigo-500 to-blue-500" },
            { icon: CheckCircle, v: totalDone, l: "lecții finalizate", g: "from-emerald-500 to-teal-500" },
            { icon: Zap, v: totalTasks, l: "taskuri rezolvate", g: "from-purple-500 to-pink-500" },
          ].map(s => (
            <div key={s.l} className="bg-white dark:bg-slate-800 rounded-2xl p-3.5 shadow-sm border border-slate-200 dark:border-slate-700 text-center">
              <div className={`w-8 h-8 bg-gradient-to-br ${s.g} rounded-xl flex items-center justify-center mx-auto mb-1.5`}>
                <s.icon className="w-4 h-4 text-white" />
              </div>
              <p className="text-xl font-black text-slate-800 dark:text-white">{s.v}</p>
              <p className="text-[10px] text-slate-400 leading-tight">{s.l}</p>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl px-4 py-3 shadow-sm border border-slate-200 dark:border-slate-700">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2">Cum folosești</p>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
            {[
              { icon: <Pencil className="w-3 h-3 text-indigo-500"/>, t: "Editează / Adaugă progres la o lecție" },
              { icon: <Plus className="w-3 h-3 text-emerald-500"/>, t: "Adaugă progres (lecție neîncepută)" },
              { icon: <Trash2 className="w-3 h-3 text-red-400"/>, t: "Șterge progresul unei lecții" },
              { icon: <RotateCcw className="w-3 h-3 text-orange-400"/>, t: "Resetează tot un modul" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                {item.icon}
                <span className="text-[11px] text-slate-500 dark:text-slate-400">{item.t}</span>
              </div>
            ))}
          </div>
        </div>

        {/* User cards */}
        {data.users.length === 0 ? (
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-10 text-center shadow-sm border border-slate-200 dark:border-slate-700">
            <BarChart2 className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
            <p className="text-sm text-slate-500 font-medium">Niciun utilizator cu activitate înregistrată.</p>
          </div>
        ) : (
          data.users
            .sort((a, b) => b.totalTasks - a.totalTasks)
            .map(user => (
              <UserCard
                key={user.userId}
                user={user}
                onDelete={setConfirm}
                onSetProgress={handleSetProgress}
                loading={busy}
              />
            ))
        )}
      </main>

      {confirm && (
        <ConfirmModal
          message={`Ești sigur că vrei să ștergi ${confirm.label}? Nu se poate anula.`}
          onConfirm={handleDelete}
          onCancel={() => setConfirm(null)}
        />
      )}

      {toast && (
        <div className={`fixed bottom-24 left-1/2 -translate-x-1/2 z-50 px-4 py-3 rounded-2xl shadow-xl text-sm font-bold text-white max-w-xs text-center
          ${toast.type === "error" ? "bg-red-500" : "bg-emerald-500"}`}>
          {toast.msg}
        </div>
      )}

      <Navbar />
    </div>
  );
}
