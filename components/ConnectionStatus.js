"use client";
import { useEffect, useState } from "react";
import { initProgressSync, flushQueue, queueSize } from "@/lib/offlineQueue";
import { WifiOff, RefreshCw, CloudUpload, Sparkles } from "lucide-react";

// Global, lightweight: offline badge, "syncing" indicator, and a "new version"
// toast when a fresh service worker is waiting. Mounted once in the layout.
export default function ConnectionStatus() {
  const [online, setOnline] = useState(true);
  const [pending, setPending] = useState(0);
  const [updateReady, setUpdateReady] = useState(false);
  const [waiting, setWaiting] = useState(null);

  useEffect(() => {
    setOnline(navigator.onLine);
    setPending(queueSize());
    initProgressSync();

    const refreshPending = () => setPending(queueSize());
    const onOnline = async () => {
      setOnline(true);
      await flushQueue();
      refreshPending();
    };
    const onOffline = () => setOnline(false);
    const onQueue = (e) => setPending(e.detail?.size ?? queueSize());

    window.addEventListener("online", onOnline);
    window.addEventListener("offline", onOffline);
    window.addEventListener("devzone-queue-changed", onQueue);

    // Detect a waiting service-worker update.
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.getRegistration().then((reg) => {
        if (!reg) return;
        const track = (worker) => {
          if (!worker) return;
          worker.addEventListener("statechange", () => {
            if (worker.state === "installed" && navigator.serviceWorker.controller) {
              setWaiting(worker);
              setUpdateReady(true);
            }
          });
        };
        if (reg.waiting && navigator.serviceWorker.controller) {
          setWaiting(reg.waiting);
          setUpdateReady(true);
        }
        reg.addEventListener("updatefound", () => track(reg.installing));
      });

      let refreshing = false;
      navigator.serviceWorker.addEventListener("controllerchange", () => {
        if (refreshing) return;
        refreshing = true;
        window.location.reload();
      });
    }

    return () => {
      window.removeEventListener("online", onOnline);
      window.removeEventListener("offline", onOffline);
      window.removeEventListener("devzone-queue-changed", onQueue);
    };
  }, []);

  function applyUpdate() {
    setUpdateReady(false);
    if (waiting) waiting.postMessage("SKIP_WAITING");
    else window.location.reload();
  }

  return (
    <>
      {/* Offline / syncing pill — top center */}
      {(!online || pending > 0) && (
        <div className="fixed top-2 left-1/2 -translate-x-1/2 z-[70] pointer-events-none">
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-black shadow-lg backdrop-blur
            ${!online
              ? "bg-slate-800/95 text-amber-300 border border-amber-500/30"
              : "bg-indigo-600/95 text-white border border-indigo-400/30"}`}>
            {!online ? (
              <>
                <WifiOff className="w-3.5 h-3.5" />
                Offline{pending > 0 ? ` · ${pending} de sincronizat` : ""}
              </>
            ) : (
              <>
                <CloudUpload className="w-3.5 h-3.5 animate-pulse" />
                Se sincronizează {pending}…
              </>
            )}
          </div>
        </div>
      )}

      {/* New version available — bottom toast (above the navbar) */}
      {updateReady && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-[70] w-[calc(100%-2rem)] max-w-sm">
          <div className="flex items-center gap-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl shadow-2xl px-4 py-3">
            <Sparkles className="w-5 h-5 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="font-black text-sm leading-tight">Versiune nouă disponibilă</p>
              <p className="text-indigo-200 text-xs leading-tight">Actualizează pentru ultimele îmbunătățiri.</p>
            </div>
            <button onClick={applyUpdate}
              className="flex items-center gap-1.5 bg-white text-indigo-700 rounded-xl px-3 py-2 font-black text-xs hover:bg-indigo-50 transition-colors active:scale-95 flex-shrink-0">
              <RefreshCw className="w-3.5 h-3.5" /> Actualizează
            </button>
          </div>
        </div>
      )}
    </>
  );
}
