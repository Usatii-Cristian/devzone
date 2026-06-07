"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  ArrowLeft, Shield, RefreshCw, Trash2, ChevronDown, ChevronUp,
  CheckCircle, Clock, BarChart2, User, AlertTriangle, BookOpen,
  RotateCcw, Zap, Trophy, Target,
} from "lucide-react";
import Navbar from "@/components/Navbar";

const USER_NAMES = {
  [process.env.NEXT_PUBLIC_ADMIN1 || "cristiusa98@gmail.com"]: "Cristi",
};

function ConfirmModal({ message, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onCancel}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-6 max-w-sm w-full"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
          </div>
          <p className="text-sm font-bold text-slate-800 dark:text-white">{message}</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 px-4 rounded-xl border-2 border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 font-bold text-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
          >
            Anulează
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2.5 px-4 rounded-xl bg-red-500 text-white font-bold text-sm hover:bg-red-600 transition-colors"
          >
            Șterge
          </button>
        </div>
      </div>
    </div>
  );
}

function StatBadge({ icon: Icon, value, label, color }) {
  return (
    <div className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl ${color}`}>
      <Icon className="w-3.5 h-3.5" />
      <span className="text-xs font-black">{value}</span>
      <span className="text-[10px] font-medium opacity-80">{label}</span>
    </div>
  );
}

function ModuleRow({ mod, userId, onReset, loading }) {
  const [open, setOpen] = useState(false);
  const pct = mod.totalLessons > 0 ? Math.round((mod.doneLessons / mod.totalLessons) * 100) : 0;

  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
      <div className="flex items-center gap-3 px-3 py-2.5 bg-white dark:bg-slate-800">
        <button
          onClick={() => setOpen(o => !o)}
          className="flex items-center gap-2 flex-1 min-w-0 text-left"
        >
          <span className="text-xs font-black text-slate-700 dark:text-white truncate">{mod.title}</span>
          <span className="text-[10px] text-slate-400 flex-shrink-0">
            {mod.doneLessons}/{mod.totalLessons}
          </span>
          {open ? <ChevronUp className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" /> : <ChevronDown className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />}
        </button>

        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="w-16 bg-slate-100 dark:bg-slate-700 rounded-full h-1.5">
            <div
              className="h-1.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all"
              style={{ width: `${pct}%` }}
            />
          </div>
          <span className="text-[10px] text-slate-400 w-7">{pct}%</span>
          <button
            onClick={() => onReset({ userId, moduleSlug: mod.slug, label: `modulul "${mod.title}" pentru ${userId.split("@")[0]}` })}
            disabled={loading || mod.totalLessons === 0}
            className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors disabled:opacity-40"
            title="Resetează modulul"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-slate-100 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-700">
          {mod.lessons.map(l => (
            <div key={l.lessonId} className="flex items-center gap-2 px-3 py-2 bg-slate-50/50 dark:bg-slate-800/50">
              <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0
                ${l.completed ? "bg-emerald-500" : l.completedTasks > 0 ? "bg-amber-400" : "bg-slate-200 dark:bg-slate-600"}`}>
                {l.completed && <CheckCircle className="w-2.5 h-2.5 text-white" />}
                {!l.completed && l.completedTasks > 0 && <Clock className="w-2.5 h-2.5 text-white" />}
              </div>
              <span className="text-xs text-slate-700 dark:text-slate-300 flex-1 truncate">{l.lessonTitle}</span>
              <span className="text-[10px] text-slate-400 flex-shrink-0">{l.completedTasks} taskuri</span>
              <button
                onClick={() => onReset({ userId, lessonId: l.lessonId, label: `lecția "${l.lessonTitle}"` })}
                disabled={loading}
                className="p-1 rounded-lg text-slate-300 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors disabled:opacity-40"
                title="Resetează lecția"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function UserCard({ user, onReset, loading }) {
  const [expanded, setExpanded] = useState(false);
  const displayName = user.userId.split("@")[0];
  const xpEstimate = user.done * 100 + user.totalTasks * 10;

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-slate-100 dark:border-slate-700">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
            <User className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <span className="font-black text-slate-800 dark:text-white text-sm">{displayName}</span>
              <span className="text-[10px] bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 px-1.5 py-0.5 rounded-full font-bold">
                ~{xpEstimate} XP
              </span>
            </div>
            <p className="text-[11px] text-slate-400 truncate">{user.userId}</p>
          </div>
          <button
            onClick={() => onReset({ userId: user.userId, label: `TOT progresul lui ${displayName}` })}
            disabled={loading}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors text-xs font-bold disabled:opacity-50"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Reset tot
          </button>
        </div>

        {/* Stats row */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          <StatBadge icon={Trophy} value={user.done} label="finalizate" color="bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400" />
          <StatBadge icon={BookOpen} value={user.total} label="atinse" color="bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400" />
          <StatBadge icon={Zap} value={user.totalTasks} label="taskuri" color="bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400" />
          <StatBadge icon={Target} value={`${user.successRate}%`} label="succes" color="bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400" />
        </div>
      </div>

      {/* Module list toggle */}
      <button
        onClick={() => setExpanded(e => !e)}
        className="w-full flex items-center justify-between px-4 py-2.5 text-xs font-bold text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
      >
        <span>{user.modules.length} module cu activitate</span>
        {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>

      {expanded && (
        <div className="px-4 pb-4 space-y-2">
          {user.modules.map(mod => (
            <ModuleRow
              key={mod.slug}
              mod={mod}
              userId={user.userId}
              onReset={onReset}
              loading={loading}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function AdminPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [confirm, setConfirm] = useState(null); // { userId, moduleSlug?, lessonId?, label }
  const [toast, setToast] = useState(null);
  const [authorized, setAuthorized] = useState(null);

  const load = useCallback(async () => {
    setRefreshing(true);
    try {
      const res = await fetch("/api/admin");
      if (res.status === 401) { setAuthorized(false); return; }
      setAuthorized(true);
      const data = await res.json();
      setUsers(Array.isArray(data) ? data.sort((a, b) => b.totalTasks - a.totalTasks) : []);
    } catch {
      setToast({ type: "error", msg: "Eroare la încărcare." });
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  function showToast(msg, type = "success") {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  }

  function askConfirm(params) {
    setConfirm(params);
  }

  async function doReset() {
    if (!confirm) return;
    const { userId, moduleSlug, lessonId, label } = confirm;
    setConfirm(null);
    setRefreshing(true);
    try {
      const res = await fetch("/api/admin", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, moduleSlug, lessonId }),
      });
      const data = await res.json();
      if (data.ok) {
        showToast(`✓ Șters: ${data.deleted} înregistrări (${label})`);
        await load();
      } else {
        showToast("Eroare la ștergere.", "error");
      }
    } catch {
      showToast("Eroare de rețea.", "error");
      setRefreshing(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <RefreshCw className="w-8 h-8 text-indigo-500 animate-spin" />
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Se încarcă datele...</p>
        </div>
      </div>
    );
  }

  if (authorized === false) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 text-center shadow-sm max-w-sm w-full">
          <div className="w-14 h-14 bg-red-100 dark:bg-red-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Shield className="w-7 h-7 text-red-500" />
          </div>
          <h2 className="font-black text-slate-800 dark:text-white text-lg mb-2">Acces restricționat</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Trebuie să fii autentificat pentru a accesa panoul de admin.</p>
          <Link href="/login" className="inline-flex items-center gap-2 bg-indigo-500 text-white px-4 py-2.5 rounded-xl font-bold text-sm hover:bg-indigo-600 transition-colors">
            Autentifică-te
          </Link>
        </div>
      </div>
    );
  }

  const totalDone = users.reduce((s, u) => s + u.done, 0);
  const totalTasks = users.reduce((s, u) => s + u.totalTasks, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-slate-100 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 pb-28">
      {/* Header */}
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
              <p className="text-slate-400 text-xs leading-tight">Control progres utilizatori</p>
            </div>
          </div>
          <button
            onClick={load}
            disabled={refreshing}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors disabled:opacity-50"
            title="Reîncarcă datele"
          >
            <RefreshCw className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`} />
          </button>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-5 space-y-4">
        {/* Global stats */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { icon: User, value: users.length, label: "utilizatori activi", color: "from-indigo-500 to-blue-500" },
            { icon: CheckCircle, value: totalDone, label: "lecții finalizate", color: "from-emerald-500 to-teal-500" },
            { icon: Zap, value: totalTasks, label: "taskuri rezolvate", color: "from-purple-500 to-pink-500" },
          ].map(s => (
            <div key={s.label} className="bg-white dark:bg-slate-800 rounded-2xl p-3.5 shadow-sm border border-slate-200 dark:border-slate-700 text-center">
              <div className={`w-8 h-8 bg-gradient-to-br ${s.color} rounded-xl flex items-center justify-center mx-auto mb-2`}>
                <s.icon className="w-4 h-4 text-white" />
              </div>
              <p className="text-xl font-black text-slate-800 dark:text-white">{s.value}</p>
              <p className="text-[10px] text-slate-400 leading-tight">{s.label}</p>
            </div>
          ))}
        </div>

        {/* User cards */}
        {users.length === 0 ? (
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-10 text-center shadow-sm border border-slate-200 dark:border-slate-700">
            <BarChart2 className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Niciun utilizator cu activitate înregistrată.</p>
          </div>
        ) : (
          users.map(user => (
            <UserCard
              key={user.userId}
              user={user}
              onReset={askConfirm}
              loading={refreshing}
            />
          ))
        )}

        {/* Legend */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-sm border border-slate-200 dark:border-slate-700">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2">Legendă</p>
          <div className="flex flex-wrap gap-3">
            {[
              { color: "bg-emerald-500", label: "Lecție finalizată (100%)" },
              { color: "bg-amber-400", label: "Lecție în progres" },
              { color: "bg-slate-200 dark:bg-slate-600", label: "Neatinsă" },
            ].map(l => (
              <div key={l.label} className="flex items-center gap-1.5">
                <div className={`w-3 h-3 rounded-full ${l.color}`} />
                <span className="text-[11px] text-slate-500 dark:text-slate-400">{l.label}</span>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Confirm modal */}
      {confirm && (
        <ConfirmModal
          message={`Ești sigur că vrei să ștergi ${confirm.label}? Acțiunea nu poate fi anulată.`}
          onConfirm={doReset}
          onCancel={() => setConfirm(null)}
        />
      )}

      {/* Toast */}
      {toast && (
        <div className={`fixed bottom-24 left-1/2 -translate-x-1/2 z-50 px-4 py-3 rounded-2xl shadow-xl text-sm font-bold text-white transition-all
          ${toast.type === "error" ? "bg-red-500" : "bg-emerald-500"}`}>
          {toast.msg}
        </div>
      )}

      <Navbar />
    </div>
  );
}
