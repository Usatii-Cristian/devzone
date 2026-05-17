"use client";
import { useState, useEffect, useMemo, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, X, BookOpen, Code2, Star } from "lucide-react";

export default function SearchModal({ open, onClose, modules = [] }) {
  const [query, setQuery] = useState("");
  const [activeIdx, setActiveIdx] = useState(0);
  const inputRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery("");
      setActiveIdx(0);
    }
  }, [open]);

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
      { type: "page", title: "Antrenament", sub: "Exersează AI", href: "/antrenament", icon: Star },
      { type: "page", title: "Proiecte", sub: "20 proiecte practice", href: "/proiecte", icon: Star },
      { type: "page", title: "Editor", sub: "VS Code în browser", href: "/editor", icon: Code2 },
      { type: "page", title: "Setări", sub: "Preferințe + export", href: "/settings", icon: Star },
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

  useEffect(() => { setActiveIdx(0); }, [query]);

  useEffect(() => {
    if (!open) return;
    function onKey(e) {
      if (e.key === "Escape") { e.preventDefault(); onClose(); }
      else if (e.key === "ArrowDown") { e.preventDefault(); setActiveIdx(i => Math.min(i + 1, results.length - 1)); }
      else if (e.key === "ArrowUp")   { e.preventDefault(); setActiveIdx(i => Math.max(i - 1, 0)); }
      else if (e.key === "Enter") {
        e.preventDefault();
        const item = results[activeIdx];
        if (item) { router.push(item.href); onClose(); }
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, results, activeIdx, router, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center pt-20 px-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}/>
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-xl overflow-hidden">
        <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-200">
          <Search className="w-5 h-5 text-slate-400 flex-shrink-0"/>
          <input
            ref={inputRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Caută lecții, module, pagini..."
            className="flex-1 text-sm outline-none placeholder:text-slate-400 text-slate-800"
          />
          <kbd className="text-xs bg-slate-100 px-1.5 py-0.5 rounded text-slate-500 font-mono">Esc</kbd>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
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
                const active = i === activeIdx;
                return (
                  <li key={`${item.href}-${i}`}>
                    <button
                      onClick={() => { router.push(item.href); onClose(); }}
                      onMouseEnter={() => setActiveIdx(i)}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors
                        ${active ? "bg-indigo-50" : "hover:bg-slate-50"}`}>
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0
                        ${active ? "bg-indigo-100 text-indigo-600" : "bg-slate-100 text-slate-500"}`}>
                        <Icon className="w-4 h-4"/>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-bold truncate ${active ? "text-indigo-700" : "text-slate-800"}`}>{item.title}</p>
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

        <div className="flex items-center gap-4 px-4 py-2 border-t border-slate-100 bg-slate-50 text-xs text-slate-400">
          <span><kbd className="bg-white px-1.5 py-0.5 rounded border border-slate-200 font-mono">↑↓</kbd> navighează</span>
          <span><kbd className="bg-white px-1.5 py-0.5 rounded border border-slate-200 font-mono">↵</kbd> deschide</span>
          <span className="ml-auto">{results.length} rezultate</span>
        </div>
      </div>
    </div>
  );
}
