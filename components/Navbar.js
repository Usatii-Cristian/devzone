"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Home, Dumbbell, Star, Code2, Settings, BookOpen } from "lucide-react";
import SearchModal from "@/components/SearchModal";

export default function Navbar() {
  const pathname = usePathname();
  const [searchOpen, setSearchOpen] = useState(false);
  const [modules, setModules] = useState([]);

  useEffect(() => {
    fetch("/api/modules").then(r => r.json()).then(d => Array.isArray(d) && setModules(d)).catch(() => {});
  }, []);

  useEffect(() => {
    function onKey(e) {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen(o => !o);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const items = [
    { href: "/", icon: Home, label: "Acasă" },
    { href: "/antrenament", icon: Dumbbell, label: "Exersează" },
    { href: "/proiecte", icon: Star, label: "Proiecte" },
    { href: "/editor", icon: Code2, label: "Editor" },
    { href: "/dictionar", icon: BookOpen, label: "Dicționar" },
    { href: "/settings", icon: Settings, label: "Setări" },
  ];

  return (
    <>
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} modules={modules}/>
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur border-t border-slate-200 dark:border-slate-700 shadow-[0_-4px_12px_rgba(0,0,0,0.04)] pb-safe">
        <div className="max-w-5xl mx-auto flex items-center">
          {items.map(({ href, icon: Icon, label }) => {
            const active = pathname === href || (href !== "/" && pathname.startsWith(href));
            return (
              <Link key={href} href={href}
                className={`flex-1 flex flex-col items-center py-2.5 gap-1 transition-colors relative min-h-[56px]
                  ${active ? "text-indigo-600 dark:text-indigo-400" : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"}`}>
                <Icon className={`w-[22px] h-[22px] ${active ? "stroke-[2.5]" : ""}`}/>
                <span className={`text-[11px] font-bold leading-none ${active ? "text-indigo-600 dark:text-indigo-400" : ""}`}>{label}</span>
                {active && <span className="absolute top-0 w-10 h-0.5 bg-indigo-500 rounded-full"/>}
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
