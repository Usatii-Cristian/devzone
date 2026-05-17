"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Home, Dumbbell, LogOut, Star, Code2, Settings, Search } from "lucide-react";
import SearchModal from "@/components/SearchModal";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
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

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  const items = [
    { href: "/", icon: Home, label: "Acasă" },
    { href: "/antrenament", icon: Dumbbell, label: "Antren." },
    { href: "/proiecte", icon: Star, label: "Proiecte" },
    { href: "/editor", icon: Code2, label: "Editor" },
    { href: "/settings", icon: Settings, label: "Setări" },
  ];

  return (
    <>
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} modules={modules}/>
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur border-t border-slate-200 dark:border-slate-700 shadow-lg">
        <div className="max-w-5xl mx-auto flex items-center">
          {items.map(({ href, icon: Icon, label }) => {
            const active = pathname === href;
            return (
              <Link key={href} href={href}
                className={`flex-1 flex flex-col items-center py-2.5 gap-0.5 transition-colors relative
                  ${active ? "text-indigo-600 dark:text-indigo-400" : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"}`}>
                <Icon className={`w-5 h-5 ${active ? "stroke-[2.5]" : ""}`}/>
                <span className={`text-xs font-bold ${active ? "text-indigo-600 dark:text-indigo-400" : ""}`}>{label}</span>
                {active && <span className="absolute bottom-0 w-8 h-0.5 bg-indigo-500 rounded-full"/>}
              </Link>
            );
          })}
          <button onClick={() => setSearchOpen(true)} title="Caută (Ctrl+K)"
            className="flex-1 flex flex-col items-center py-2.5 gap-0.5 text-slate-400 hover:text-indigo-500 transition-colors">
            <Search className="w-5 h-5"/>
            <span className="text-xs font-bold">Caută</span>
          </button>
          <button onClick={logout}
            className="flex-1 flex flex-col items-center py-2.5 gap-0.5 text-slate-400 hover:text-red-500 transition-colors">
            <LogOut className="w-5 h-5"/>
            <span className="text-xs font-bold">Ieșire</span>
          </button>
        </div>
      </nav>
    </>
  );
}
