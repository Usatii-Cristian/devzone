"use client";
import { useReducer, useEffect, useMemo, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, X, BookOpen, Code2, Star, Settings, Dumbbell, Compass } from "lucide-react";

export default function SearchModal({ open, onClose, modules = [] }) {
  return open ? <SearchModalBody key="modal" onClose={onClose} modules={modules}/> : null;
}

function reducer(state, action) {
  switch (action.type) {
    case "query": return { query: action.value, idx: 0 };
    case "idx":   return { ...state, idx: action.value };
    case "down":  return { ...state, idx: Math.min(state.idx + 1, action.max) };
    case "up":    return { ...state, idx: Math.max(state.idx - 1, 0) };
    default:      return state;
  }
}

function SearchModalBody({ onClose, modules }) {
  const [{ query, idx }, dispatch] = useReducer(reducer, { query: "", idx: 0 });
  const inputRef = useRef(null);
  const router = useRouter();

  useEffect(() => { inputRef.current?.focus(); }, []);

  const allItems = useMemo(() => {
    const items = [];
    for (const mod of modules) {
      items.push({
        type: "module",
        title: mod.title,
        sub: `${mod.lessons.length} lecții`,
        href: `/modules/${mod.slug}`,
        icon: BookOpen,
      });
      for (const lesson of mod.lessons) {
        items.push({
          type: "lesson",
          title: lesson.title,
          sub: mod.title,
          href: `/modules/${mod.slug}/lessons/${lesson.id}`,
          icon: BookOpen,
        });
      }
    }
    items.push(
      { type: "pagină", title: "Antrenament", sub: "Exersează cu AI", href: "/antrenament", icon: Dumbbell },
      { type: "pagină", title: "Proiecte", sub: "20 proiecte practice", href: "/proiecte", icon: Star },
      { type: "pagină", title: "Trasee de Carieră", sub: "9 drumuri clare în tech", href: "/trasee", icon: Compass },
      { type: "pagină", title: "Editor", sub: "VS Code în browser", href: "/editor", icon: Code2 },
      { type: "pagină", title: "Dicționar Dev", sub: "Termeni și slang", href: "/dictionar", icon: BookOpen },
      { type: "pagină", title: "Setări", sub: "Preferințe + export", href: "/settings", icon: Settings },
    );
    return items;
  }, [modules]);

  const results = useMemo(() => {
    if (!query.trim()) return allItems.slice(0, 12);
    const q = query.toLowerCase();
    return allItems
      .filter(i => i.title.toLowerCase().includes(q) || i.sub.toLowerCase().includes(q))
      .slice(0, 20);
  }, [query, allItems]);

  const safeIdx = Math.min(idx, results.length - 1);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") { e.preventDefault(); onClose(); }
      else if (e.key === "ArrowDown") { e.preventDefault(); dispatch({ type: "down", max: results.length - 1 }); }
      else if (e.key === "ArrowUp")   { e.preventDefault(); dispatch({ type: "up" }); }
      else if (e.key === "Enter") {
        e.preventDefault();
        const item = results[safeIdx];
        if (item) { router.push(item.href); onClose(); }
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [results, safeIdx, router, onClose]);

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center pt-20 px-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}/>
      <div className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-xl overflow-hidden">
        <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-200 dark:border-slate-700">
          <Search className="w-5 h-5 text-slate-400 flex-shrink-0"/>
          <input
            ref={inputRef}
            value={query}
            onChange={e => dispatch({ type: "query", value: e.target.value })}
            placeholder="Caută lecții, module, pagini..."
            className="flex-1 text-sm outline-none placeholder:text-slate-400 text-slate-800 dark:text-white bg-transparent"
          />
          <kbd className="text-xs bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded text-slate-500 dark:text-slate-300 font-mono">Esc</kbd>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
            <X className="w-4 h-4"/>
          </button>
        </div>

        <div className="max-h-96 overflow-y-auto">
          {results.length === 0 ? (
            <div className="text-center py-10 text-slate-400 text-sm">
              Niciun rezultat pentru &ldquo;{query}&rdquo;
            </div>
          ) : (
            <ul className="py-2">
              {results.map((item, i) => {
                const Icon = item.icon;
                const active = i === safeIdx;
                return (
                  <li key={`${item.href}-${i}`}>
                    <button
                      onClick={() => { router.push(item.href); onClose(); }}
                      onMouseEnter={() => dispatch({ type: "idx", value: i })}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors
                        ${active ? "bg-indigo-50 dark:bg-indigo-900/40" : "hover:bg-slate-50 dark:hover:bg-slate-700/40"}`}>
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0
                        ${active ? "bg-indigo-100 text-indigo-600 dark:bg-indigo-800 dark:text-indigo-300" : "bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-300"}`}>
                        <Icon className="w-4 h-4"/>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-bold truncate ${active ? "text-indigo-700 dark:text-indigo-300" : "text-slate-800 dark:text-white"}`}>{item.title}</p>
                        <p className="text-xs text-slate-400 truncate">{item.sub}</p>
                      </div>
                      <span className="text-xs text-slate-400 capitalize flex-shrink-0">{item.type}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <div className="flex items-center gap-4 px-4 py-2 border-t border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs text-slate-400">
          <span><kbd className="bg-white dark:bg-slate-700 px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-600 font-mono">↑↓</kbd> navighează</span>
          <span><kbd className="bg-white dark:bg-slate-700 px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-600 font-mono">↵</kbd> deschide</span>
          <span className="ml-auto">{results.length} rezultate</span>
        </div>
      </div>
    </div>
  );
}
