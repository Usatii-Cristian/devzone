"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import { useLocalStorage } from "@/lib/hooks";
import {
  ArrowLeft, Settings, Moon, Sun, Download, Type, Palette, Code2, Trash2,
  AlertTriangle, LogOut, User
} from "lucide-react";

const EDITOR_THEMES = [
  { v: "vs-dark", l: "Dark", desc: "VS Code clasic" },
  { v: "vs-light", l: "Light", desc: "Tema deschisă" },
  { v: "hc-black", l: "Contrast", desc: "Vizibilitate maximă" },
];

export default function SettingsPage() {
  const [themeRaw, setThemeStored] = useLocalStorage("theme", null);
  const [editorTheme, setEditorTheme] = useLocalStorage("editor-theme", "vs-dark");
  const [editorFontRaw, setEditorFontStored] = useLocalStorage("editor-font", "14");
  const theme = themeRaw || "light";
  const editorFont = Number(editorFontRaw) || 14;
  const router = useRouter();

  const [exporting, setExporting] = useState(false);
  const [resetting, setResetting] = useState(false);
  const [resetConfirm, setResetConfirm] = useState(false);
  const [user, setUser] = useState({ name: "", initial: "", email: "" });

  useEffect(() => {
    fetch("/api/me").then(r => r.json()).then(u => { if (u?.name) setUser(u); }).catch(() => {});
  }, []);

  function applyTheme(t) {
    setThemeStored(t);
    document.documentElement.classList.toggle("dark", t === "dark");
  }

  async function exportProgress() {
    setExporting(true);
    try {
      const res = await fetch("/api/progress");
      const data = await res.json();
      const blob = new Blob([JSON.stringify({ exportedAt: new Date().toISOString(), progress: data }, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `devzone-progress-${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch {
      alert("Eroare la export. Încearcă din nou.");
    }
    setExporting(false);
  }

  async function resetAllProgress() {
    if (!resetConfirm) { setResetConfirm(true); setTimeout(() => setResetConfirm(false), 5000); return; }
    setResetting(true);
    try {
      const res = await fetch("/api/progress");
      const all = await res.json();
      await Promise.all(all.map(p =>
        fetch("/api/progress", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            lessonId: p.lessonId,
            completedTasks: [],
            wrongTasks: [],
            currentTaskIdx: 0,
            currentTheoryIdx: 0,
            completed: false,
          }),
        })
      ));
      alert("Tot progresul a fost resetat.");
      setResetConfirm(false);
    } catch {
      alert("Eroare la resetare.");
    }
    setResetting(false);
  }

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 pb-24">
      <header className="bg-gradient-to-r from-indigo-700 to-purple-700 text-white shadow-lg sticky top-0 z-40">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-3">
          <Link href="/" className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors active:scale-95">
            <ArrowLeft className="w-5 h-5"/>
          </Link>
          <div className="flex items-center gap-2.5 flex-1 min-w-0">
            <div className="w-9 h-9 bg-yellow-400 rounded-xl flex items-center justify-center flex-shrink-0">
              <Settings className="w-4 h-4 text-yellow-900"/>
            </div>
            <div className="min-w-0">
              <h1 className="font-black text-base leading-tight">Setări</h1>
              <p className="text-indigo-200 text-xs leading-tight">Personalizează experiența</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-5 space-y-4">

        {/* User info */}
        <section className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-4 text-white shadow-lg flex items-center gap-3">
          <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center text-xl font-black flex-shrink-0">{user.initial || "?"}</div>
          <div className="flex-1 min-w-0">
            <p className="text-indigo-200 text-xs">Conectat ca</p>
            <p className="font-black text-base truncate">{user.name || "..."}</p>
            {user.email && <p className="text-indigo-200 text-xs truncate">{user.email}</p>}
          </div>
          <User className="w-5 h-5 text-white/60 flex-shrink-0"/>
        </section>

        {/* Theme */}
        <section className="bg-white dark:bg-slate-800 rounded-2xl p-4 sm:p-5 shadow-sm">
          <h2 className="font-black text-slate-800 dark:text-white text-sm mb-3 flex items-center gap-2">
            <Palette className="w-4 h-4 text-indigo-500"/> Tema aplicației
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <button onClick={() => applyTheme("light")}
              className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 min-h-[88px] active:scale-95
                ${theme === "light" ? "border-indigo-500 bg-indigo-50" : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-700/30 hover:border-indigo-200"}`}>
              <Sun className="w-7 h-7 text-amber-500"/>
              <span className="text-sm font-black text-slate-700 dark:text-white">Light</span>
            </button>
            <button onClick={() => applyTheme("dark")}
              className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 min-h-[88px] active:scale-95
                ${theme === "dark" ? "border-indigo-500 bg-indigo-950" : "border-slate-200 dark:border-slate-600 bg-slate-800 hover:border-indigo-400"}`}>
              <Moon className="w-7 h-7 text-indigo-300"/>
              <span className="text-sm font-black text-white">Dark</span>
            </button>
          </div>
        </section>

        {/* Editor */}
        <section className="bg-white dark:bg-slate-800 rounded-2xl p-4 sm:p-5 shadow-sm">
          <h2 className="font-black text-slate-800 dark:text-white text-sm mb-3 flex items-center gap-2">
            <Code2 className="w-4 h-4 text-emerald-500"/> Editor de cod
          </h2>

          <div className="mb-4">
            <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wider">Temă editor</p>
            <div className="grid grid-cols-3 gap-2">
              {EDITOR_THEMES.map(t => (
                <button key={t.v} onClick={() => setEditorTheme(t.v)}
                  className={`px-2 py-2.5 rounded-xl border-2 transition-all min-h-[56px] active:scale-95
                    ${editorTheme === t.v ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/30" : "border-slate-200 dark:border-slate-700 hover:border-emerald-200"}`}>
                  <p className={`text-xs font-black ${editorTheme === t.v ? "text-emerald-700 dark:text-emerald-300" : "text-slate-700 dark:text-white"}`}>{t.l}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5 leading-tight">{t.desc}</p>
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Type className="w-3 h-3"/> Mărime font
              </p>
              <span className="text-sm font-black text-emerald-600 dark:text-emerald-400">{editorFont}px</span>
            </div>
            <input type="range" min={12} max={20} step={1} value={editorFont}
              onChange={e => setEditorFontStored(String(Number(e.target.value)))}
              className="w-full accent-emerald-500 h-3"/>
            <div className="flex justify-between text-xs text-slate-400 mt-1">
              <span>Mic</span><span>Mare</span>
            </div>
          </div>
        </section>

        {/* Export */}
        <section className="bg-white dark:bg-slate-800 rounded-2xl p-4 sm:p-5 shadow-sm">
          <h2 className="font-black text-slate-800 dark:text-white text-sm mb-2 flex items-center gap-2">
            <Download className="w-4 h-4 text-blue-500"/> Backup progres
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-3 leading-relaxed">
            Descarcă tot progresul (lecții, statistici) ca fișier JSON.
          </p>
          <button onClick={exportProgress} disabled={exporting}
            className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-5 py-3 rounded-xl font-black text-sm hover:opacity-90 transition-opacity disabled:opacity-60 flex items-center justify-center gap-2 active:scale-[0.98]">
            <Download className="w-4 h-4"/> {exporting ? "Se exportă..." : "Descarcă JSON"}
          </button>
        </section>

        {/* Logout */}
        <section className="bg-white dark:bg-slate-800 rounded-2xl p-4 sm:p-5 shadow-sm">
          <h2 className="font-black text-slate-800 dark:text-white text-sm mb-2 flex items-center gap-2">
            <LogOut className="w-4 h-4 text-slate-500"/> Cont
          </h2>
          <button onClick={logout}
            className="w-full bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-white px-5 py-3 rounded-xl font-bold text-sm hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors flex items-center justify-center gap-2 active:scale-[0.98]">
            <LogOut className="w-4 h-4"/> Ieși din cont
          </button>
        </section>

        {/* Danger zone */}
        <section className="bg-red-50 dark:bg-red-950/30 rounded-2xl p-4 sm:p-5 border-2 border-red-200 dark:border-red-900">
          <h2 className="font-black text-red-800 dark:text-red-300 text-sm mb-2 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4"/> Zonă periculoasă
          </h2>
          <p className="text-xs text-red-600 dark:text-red-400 mb-3 leading-relaxed">
            Resetează tot progresul. Lecțiile rămân disponibile, dar statisticile se șterg.
          </p>
          <button onClick={resetAllProgress} disabled={resetting}
            className={`w-full sm:w-auto px-5 py-3 rounded-xl font-black text-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-60 active:scale-[0.98]
              ${resetConfirm ? "bg-red-600 hover:bg-red-700 text-white" : "bg-white dark:bg-slate-800 border-2 border-red-300 text-red-700 dark:text-red-300 hover:bg-red-100"}`}>
            <Trash2 className="w-4 h-4"/>
            {resetting ? "Se resetează..." : resetConfirm ? "Sigur? Click iar pentru confirmare" : "Resetează progresul"}
          </button>
        </section>

      </main>
      <Navbar/>
    </div>
  );
}
