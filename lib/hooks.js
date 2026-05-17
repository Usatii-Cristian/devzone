"use client";
import { useSyncExternalStore, useCallback } from "react";

const listeners = new Set();
function notify() { listeners.forEach((l) => l()); }

function subscribe(cb) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

function getServerSnapshot() { return null; }

export function useLocalStorage(key, defaultValue) {
  const value = useSyncExternalStore(
    subscribe,
    () => {
      try {
        const v = localStorage.getItem(key);
        return v === null ? defaultValue : v;
      } catch {
        return defaultValue;
      }
    },
    () => defaultValue
  );

  const setValue = useCallback((v) => {
    try {
      if (v === null || v === undefined) localStorage.removeItem(key);
      else localStorage.setItem(key, String(v));
    } catch {}
    notify();
  }, [key]);

  return [value, setValue];
}
