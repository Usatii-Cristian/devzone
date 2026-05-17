"use client";
import { usePathname } from "next/navigation";
import AIAssistant from "./AIAssistant";

export default function GlobalAI() {
  const pathname = usePathname();
  if (pathname.includes("/lessons/") || pathname === "/login") return null;
  return <AIAssistant />;
}
