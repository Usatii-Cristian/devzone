"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Home, Dumbbell, LogOut, Star, Code2 } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  const items = [
    { href: "/", icon: Home, label: "Acasă" },
    { href: "/antrenament", icon: Dumbbell, label: "Antrenament" },
    { href: "/proiecte", icon: Star, label: "Proiecte" },
    { href: "/editor", icon: Code2, label: "Editor" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur border-t border-slate-200 shadow-lg">
      <div className="max-w-5xl mx-auto flex items-center">
        {items.map(({ href, icon: Icon, label }) => {
          const active = pathname === href;
          return (
            <Link key={href} href={href}
              className={`flex-1 flex flex-col items-center py-2.5 gap-0.5 transition-colors
                ${active ? "text-indigo-600" : "text-slate-400 hover:text-slate-600"}`}>
              <Icon className={`w-5 h-5 ${active ? "stroke-[2.5]" : ""}`}/>
              <span className={`text-xs font-bold ${active ? "text-indigo-600" : ""}`}>{label}</span>
              {active && <span className="absolute bottom-0 w-8 h-0.5 bg-indigo-500 rounded-full"/>}
            </Link>
          );
        })}
        <button onClick={logout}
          className="flex-1 flex flex-col items-center py-2.5 gap-0.5 text-slate-400 hover:text-red-500 transition-colors">
          <LogOut className="w-5 h-5"/>
          <span className="text-xs font-bold">Ieșire</span>
        </button>
      </div>
    </nav>
  );
}
