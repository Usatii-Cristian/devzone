"use client";
import { useEffect } from "react";

export default function PWAInit() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    if ("serviceWorker" in navigator && process.env.NODE_ENV === "production") {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }

    // Capture the install prompt as early as possible so Settings can offer a
    // real "Install app" button (the event fires once, often before Settings mounts).
    function onPrompt(e) {
      e.preventDefault();
      window.__deferredInstallPrompt = e;
      window.dispatchEvent(new Event("pwa-installable"));
    }
    function onInstalled() {
      window.__deferredInstallPrompt = null;
      window.dispatchEvent(new Event("pwa-installed"));
    }
    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);
  return null;
}
