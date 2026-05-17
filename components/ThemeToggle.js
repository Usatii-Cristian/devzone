"use client";
import { Moon, Sun } from "lucide-react";
import { useLocalStorage } from "@/lib/hooks";

export default function ThemeToggle({ className = "" }) {
  const [theme, setTheme] = useLocalStorage("theme", null);
  const dark = theme === "dark";

  function toggle() {
    const next = dark ? "light" : "dark";
    setTheme(next);
    document.documentElement.classList.toggle("dark", next === "dark");
  }

  return (
    <button onClick={toggle} title={dark ? "Light mode" : "Dark mode"}
      className={`p-2 rounded-xl bg-white/15 hover:bg-white/25 transition-colors text-white ${className}`}>
      {dark ? <Sun className="w-4 h-4"/> : <Moon className="w-4 h-4"/>}
    </button>
  );
}
