"use client";
import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { useLocalStorage } from "@/lib/hooks";
import {
  ArrowLeft, Settings, Moon, Sun, Download, Type, Palette, Code2, Trash2, AlertTriangle
} from "lucide-react";

const EDITOR_THEMES = [
  { v: "vs-dark", l: "Dark (VS Code)" },
  { v: "vs-light", l: "Light" },
  { v: "hc-black", l: "High Contrast Dark" },
];

const FONT_SIZES = [12, 13, 14, 15, 16, 18, 20];

export default function SettingsPage() {
  const [themeRaw, setThemeStored] = useLocalStorage("theme", null);
  const [editorTheme, setEditorTheme] = useLocalStorage("editor-theme", "vs-dark");
  const [editorFontRaw, setEditorFontStored] = useLocalStorage("editor-font", "14");
  const theme = themeRaw || "light";
  const editorFont = Number(editorFontRaw) || 14;

  const [exporting, setExporting] = useState(false);
  const [resetting, setResetting] = useState(false);
  const [resetConfirm, setResetConfirm] = useState(false);

  function applyTheme(t) {
    setThemeStored(t);
    document.documentElement.classList.toggle("dark", t === "dark");
  }

  function applyEditorTheme(t) {
    setEditorTheme(t);
  }

  function applyEditorFont(f) {
    setEditorFontStored(String(f));
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
      a.click();
      URL.revokeObjectURL(url);
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
      for (const p of all) {
        await fetch("/api/progress", {
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
        });
      }
      alert("Tot progresul a fost resetat.");
      setResetConfirm(false);
    } catch {
      alert("Eroare la resetare.");
    }
    setResetting(false);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 pb-24">
      <header className="bg-gradient-to-r from-indigo-700 to-purple-700 text-white shadow-lg sticky top-0 z-40">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-3">
          <Link href="/" className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
            <ArrowLeft className="w-5 h-5"/>
          </Link>
          <div className="flex items-center gap-2 flex-1">
            <div className="w-8 h-8 bg-yellow-400 rounded-xl flex items-center justify-center flex-shrink-0">
              <Settings className="w-4 h-4 text-yellow-900"/>
            </div>
            <div>
              <h1 className="font-black text-base leading-none">Setări</h1>
              <p className="text-indigo-200 text-xs">Personalizează experiența</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-6 space-y-5">

        {/* Theme */}
        <section className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm">
          <h2 className="font-black text-slate-800 dark:text-white text-sm mb-3 flex items-center gap-2">
            <Palette className="w-4 h-4 text-indigo-500"/> Tema aplicației
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <button onClick={() => applyTheme("light")}
              className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2
                ${theme === "light" ? "border-indigo-500 bg-indigo-50" : "border-slate-200 bg-white hover:border-indigo-200"}`}>
              <Sun className="w-6 h-6 text-amber-500"/>
              <span className="text-sm font-black text-slate-700">Light</span>
            </button>
            <button onClick={() => applyTheme("dark")}
              className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2
                ${theme === "dark" ? "border-indigo-500 bg-indigo-950" : "border-slate-200 bg-slate-800 hover:border-indigo-400"}`}>
              <Moon className="w-6 h-6 text-indigo-300"/>
              <span className="text-sm font-black text-white">Dark</span>
            </button>
          </div>
        </section>

        {/* Editor */}
        <section className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm">
          <h2 className="font-black text-slate-800 dark:text-white text-sm mb-3 flex items-center gap-2">
            <Code2 className="w-4 h-4 text-emerald-500"/> Editor de cod
          </h2>

          <div className="mb-4">
            <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wider">Temă editor</p>
            <div className="grid grid-cols-3 gap-2">
              {EDITOR_THEMES.map(t => (
                <button key={t.v} onClick={() => applyEditorTheme(t.v)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold border-2 transition-all
                    ${editorTheme === t.v ? "border-emerald-500 bg-emerald-50 text-emerald-700" : "border-slate-200 text-slate-600 hover:border-emerald-200"}`}>
                  {t.l}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wider flex items-center gap-1.5">
              <Type className="w-3 h-3"/> Mărime font: <span className="text-emerald-600">{editorFont}px</span>
            </p>
            <input type="range" min={12} max={20} step={1} value={editorFont}
              onChange={e => applyEditorFont(Number(e.target.value))}
              className="w-full accent-emerald-500"/>
            <div className="flex justify-between text-xs text-slate-400 mt-1">
              {FONT_SIZES.map(s => <span key={s}>{s}</span>)}
            </div>
          </div>
        </section>

        {/* Export */}
        <section className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm">
          <h2 className="font-black text-slate-800 dark:text-white text-sm mb-3 flex items-center gap-2">
            <Download className="w-4 h-4 text-blue-500"/> Backup progres
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
            Descarcă tot progresul tău (lecții finalizate, răspunsuri, statistici) ca fișier JSON.
          </p>
          <button onClick={exportProgress} disabled={exporting}
            className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-5 py-2.5 rounded-xl font-black text-sm hover:opacity-90 transition-opacity disabled:opacity-60 flex items-center gap-2">
            <Download className="w-4 h-4"/> {exporting ? "Se exportă..." : "Descarcă JSON"}
          </button>
        </section>

        {/* Danger zone */}
        <section className="bg-red-50 dark:bg-red-950/30 rounded-2xl p-5 border-2 border-red-200 dark:border-red-900">
          <h2 className="font-black text-red-800 dark:text-red-300 text-sm mb-3 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4"/> Zonă periculoasă
          </h2>
          <p className="text-xs text-red-600 dark:text-red-400 mb-3">
            Resetează tot progresul. Lecțiile rămân disponibile, dar statisticile vor fi șterse.
          </p>
          <button onClick={resetAllProgress} disabled={resetting}
            className={`px-5 py-2.5 rounded-xl font-black text-sm transition-colors flex items-center gap-2 disabled:opacity-60
              ${resetConfirm ? "bg-red-600 hover:bg-red-700 text-white" : "bg-white border-2 border-red-300 text-red-700 hover:bg-red-100"}`}>
            <Trash2 className="w-4 h-4"/>
            {resetting ? "Se resetează..." : resetConfirm ? "Confirmi? Click iar" : "Resetează progresul"}
          </button>
        </section>

      </main>
      <Navbar/>
    </div>
  );
}
