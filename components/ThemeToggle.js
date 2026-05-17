"use client";
import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle({ className = "" }) {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  }

  return (
    <button onClick={toggle} title={dark ? "Light mode" : "Dark mode"}
      className={`p-2 rounded-xl bg-white/15 hover:bg-white/25 transition-colors text-white ${className}`}>
      {dark ? <Sun className="w-4 h-4"/> : <Moon className="w-4 h-4"/>}
    </button>
  );
}
