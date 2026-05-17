"use client";
import { useEffect } from "react";

export default function ThemeInit() {
  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const prefersDark = matchMedia("(prefers-color-scheme: dark)").matches;
    const dark = stored ? stored === "dark" : prefersDark;
    document.documentElement.classList.toggle("dark", dark);
  }, []);
  return null;
}
