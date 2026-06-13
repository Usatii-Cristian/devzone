"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import { useLocalStorage } from "@/lib/hooks";
import {
  ArrowLeft, Settings, Moon, Sun, Download, Type, Palette, Code2, Trash2,
  AlertTriangle, LogOut, User, Shield, WifiOff, DownloadCloud, CheckCircle2, Smartphone, RefreshCw
} from "lucide-react";
import { getPyodide } from "@/lib/codeRunner";

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
  const [user, setUser] = useState({ name: "", initial: "", email: "", isAdmin: false });
  const [dl, setDl] = useState({ running: false, done: 0, total: 0, finished: false, error: "" });
  const [install, setInstall] = useState({ can: false, installed: false, ios: false });

  useEffect(() => {
    fetch("/api/me").then(r => r.json()).then(u => { if (u?.name) setUser(u); }).catch(() => {});
  }, []);

  useEffect(() => {
    const standalone = window.matchMedia?.("(display-mode: standalone)")?.matches || window.navigator.standalone === true;
    const ios = /iphone|ipad|ipod/i.test(window.navigator.userAgent) && !window.MSStream;
    setInstall({ can: !!window.__deferredInstallPrompt, installed: standalone, ios });
    const onCan = () => setInstall(s => ({ ...s, can: true }));
    const onDone = () => setInstall(s => ({ ...s, can: false, installed: true }));
    window.addEventListener("pwa-installable", onCan);
    window.addEventListener("pwa-installed", onDone);
    return () => {
      window.removeEventListener("pwa-installable", onCan);
      window.removeEventListener("pwa-installed", onDone);
    };
  }, []);

  async function installApp() {
    const p = window.__deferredInstallPrompt;
    if (!p) return;
    p.prompt();
    try { await p.userChoice; } catch {}
    window.__deferredInstallPrompt = null;
    setInstall(s => ({ ...s, can: false }));
  }

  // Heal a stuck/old service worker (e.g. blank pages after an update):
  // drop all SW registrations + caches, then reload fresh from the network.
  async function resetApp() {
    try {
      if ("serviceWorker" in navigator) {
        const regs = await navigator.serviceWorker.getRegistrations();
        await Promise.all(regs.map(r => r.unregister()));
      }
      if (typeof caches !== "undefined") {
        const keys = await caches.keys();
        await Promise.all(keys.map(k => caches.delete(k)));
      }
    } catch {}
    window.location.reload();
  }

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

  // Warm the service-worker caches with ALL content so the whole platform works
  // offline after a single tap on Wi-Fi: module/lesson data (API), page documents
  // and RSC payloads used by client-side navigation.
  async function downloadOffline() {
    if (dl.running) return;
    if (!("serviceWorker" in navigator)) {
      setDl({ running: false, done: 0, total: 0, finished: false, error: "Browserul nu suportă mod offline." });
      return;
    }
    setDl({ running: true, done: 0, total: 0, finished: false, error: "" });
    try {
      const mods = await fetch("/api/modules").then(r => r.json());
      const apiUrls = ["/api/modules", "/api/me", "/api/progress", "/api/training"];
      const pageUrls = ["/", "/antrenament", "/proiecte", "/trasee", "/dictionar", "/settings"];
      for (const m of (Array.isArray(mods) ? mods : [])) {
        apiUrls.push(`/api/modules/${m.slug}`);
        pageUrls.push(`/modules/${m.slug}`);
        for (const l of (m.lessons || [])) {
          apiUrls.push(`/api/lessons/${l.id}`);
          pageUrls.push(`/modules/${m.slug}/lessons/${l.id}`);
        }
      }
      const assets = new Set(); // /_next/static chunks the pages depend on
      const jobs = [
        ...apiUrls.map(u => ["api", u]),
        ...pageUrls.map(u => ["page", u]),
        ...pageUrls.map(u => ["rsc", u]),
      ];

      let total = jobs.length;
      let done = 0;
      setDl(d => ({ ...d, total, done }));
      const bump = () => { done++; if (done % 5 === 0 || done >= total) setDl(d => ({ ...d, done, total })); };

      const runQueue = async (queue, handler) => {
        const work = async () => {
          while (queue.length) {
            const item = queue.shift();
            try { await handler(item); } catch { /* skip failures, keep going */ }
            bump();
          }
        };
        await Promise.all(Array.from({ length: 6 }, work));
      };

      // Phase 1 — data, page documents (collect chunk URLs), RSC payloads
      await runQueue(jobs.slice(), async ([type, url]) => {
        if (type === "rsc") {
          await fetch(url, { headers: { RSC: "1" }, credentials: "include" });
        } else if (type === "page") {
          const res = await fetch(url, { headers: { Accept: "text/html" }, credentials: "include" });
          const html = await res.text();
          for (const m of html.matchAll(/\/_next\/static\/[^"'()\s]+?\.(?:js|css)/g)) assets.add(m[0]);
        } else {
          await fetch(url, { credentials: "include" });
        }
      });

      // Phase 2 — the JS/CSS bundles so every route can render with no network
      const assetJobs = [...assets];
      total += assetJobs.length;
      setDl(d => ({ ...d, total }));
      await runQueue(assetJobs, async (u) => { await fetch(u, { credentials: "include" }); });

      // Phase 3 — warm the Python runtime (Pyodide, ~10MB) so Python runs offline
      total += 1;
      setDl(d => ({ ...d, total }));
      try { await getPyodide(); } catch { /* Python warmup is best-effort */ }
      done += 1;
      setDl(d => ({ ...d, done, total }));

      setDl(d => ({ ...d, running: false, done: d.total, finished: true }));
    } catch {
      setDl({ running: false, done: 0, total: 0, finished: false, error: "Eroare la descărcare. Verifică conexiunea." });
    }
  }

  async function resetAllProgress() {
    if (!resetConfirm) { setResetConfirm(true); setTimeout(() => setResetConfirm(false), 5000); return; }
    setResetting(true);
    try {
      const res = await fetch("/api/progress", { method: "DELETE" });
      if (!res.ok) throw new Error("delete failed");
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

        {/* Offline mode */}
        <section className="bg-white dark:bg-slate-800 rounded-2xl p-4 sm:p-5 shadow-sm">
          <h2 className="font-black text-slate-800 dark:text-white text-sm mb-2 flex items-center gap-2">
            <WifiOff className="w-4 h-4 text-violet-500"/> Mod offline
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-3 leading-relaxed">
            Descarcă toate modulele și lecțiile + motorul Python pe dispozitiv. După aceea poți deschide aplicația, învăța și <b>rula cod Python și JavaScript fără internet</b> (verificarea se face local).
          </p>

          {/* Install app */}
          {install.installed ? (
            <div className="mb-3 flex items-center gap-2 bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-sm px-4 py-3 rounded-xl font-bold">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0"/> Aplicația e instalată pe acest dispozitiv.
            </div>
          ) : install.can ? (
            <button onClick={installApp}
              className="w-full sm:w-auto mb-3 bg-slate-800 dark:bg-slate-700 text-white px-5 py-3 rounded-xl font-black text-sm hover:bg-slate-700 dark:hover:bg-slate-600 transition-colors flex items-center justify-center gap-2 active:scale-[0.98]">
              <Smartphone className="w-4 h-4"/> Instalează aplicația
            </button>
          ) : install.ios ? (
            <div className="mb-3 text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-700/40 rounded-xl px-4 py-3 leading-relaxed">
              Pe iPhone/iPad: apasă <b>Share</b> (pătratul cu săgeată în sus) → <b>„Add to Home Screen"</b>.
            </div>
          ) : null}

          {dl.running && (
            <div className="mb-3">
              <div className="flex items-center justify-between text-xs font-bold text-violet-600 dark:text-violet-400 mb-1.5">
                <span>Se descarcă...</span>
                <span>{dl.total ? Math.round((dl.done / dl.total) * 100) : 0}%</span>
              </div>
              <div className="h-2.5 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-violet-500 to-purple-600 transition-all duration-200"
                  style={{ width: `${dl.total ? (dl.done / dl.total) * 100 : 0}%` }}/>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">{dl.done} / {dl.total} resurse</p>
            </div>
          )}

          {dl.finished && !dl.running && (
            <div className="mb-3 flex items-center gap-2 bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-sm px-4 py-3 rounded-xl font-bold">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0"/> Gata! Tot conținutul e disponibil offline.
            </div>
          )}

          {dl.error && (
            <div className="mb-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-300 text-sm px-4 py-3 rounded-xl font-medium">
              {dl.error}
            </div>
          )}

          <button onClick={downloadOffline} disabled={dl.running}
            className="w-full sm:w-auto bg-gradient-to-r from-violet-500 to-purple-600 text-white px-5 py-3 rounded-xl font-black text-sm hover:opacity-90 transition-opacity disabled:opacity-60 flex items-center justify-center gap-2 active:scale-[0.98]">
            <DownloadCloud className="w-4 h-4"/> {dl.running ? "Se descarcă..." : dl.finished ? "Descarcă din nou" : "Descarcă tot pentru offline"}
          </button>

          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700">
            <p className="text-[11px] text-slate-400 mb-2">Probleme (pagini goale, lecții care nu apar, nu se actualizează)?</p>
            <button onClick={resetApp}
              className="text-xs font-bold text-slate-600 dark:text-slate-300 flex items-center gap-1.5 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors active:scale-95">
              <RefreshCw className="w-3.5 h-3.5"/> Resetează cache & actualizează aplicația
            </button>
          </div>
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

        {/* Admin panel shortcut — only for the primary admin account */}
        {user.isAdmin && (
          <Link href="/admin"
            className="flex items-center gap-3 bg-slate-800 dark:bg-slate-700 rounded-2xl p-4 hover:bg-slate-700 dark:hover:bg-slate-600 transition-colors group">
            <div className="w-9 h-9 bg-indigo-500 rounded-xl flex items-center justify-center flex-shrink-0">
              <Shield className="w-4 h-4 text-white"/>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-black text-white text-sm">Admin Panel</p>
              <p className="text-slate-400 text-xs">Vizualizează și resetează progresul utilizatorilor</p>
            </div>
            <ArrowLeft className="w-4 h-4 text-slate-400 rotate-180 group-hover:text-white transition-colors"/>
          </Link>
        )}

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
