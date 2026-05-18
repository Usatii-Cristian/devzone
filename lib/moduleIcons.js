import {
  SiPython, SiJavascript, SiHtml5, SiCss, SiTailwindcss, SiReact,
  SiNextdotjs, SiC, SiCplusplus, SiSharp, SiPhp, SiMysql
} from "react-icons/si";
import { FaJava, FaShieldAlt } from "react-icons/fa";
import { Code2 } from "lucide-react";

export const MOD_ICONS = {
  python:            { Icon: SiPython,      color: "#FFD43B" },
  javascript:        { Icon: SiJavascript,  color: "#F7DF1E" },
  html:              { Icon: SiHtml5,       color: "#E34F26" },
  css:               { Icon: SiCss,         color: "#1572B6" },
  tailwind:          { Icon: SiTailwindcss, color: "#06B6D4" },
  react:             { Icon: SiReact,       color: "#61DAFB" },
  "nextjs-frontend": { Icon: SiNextdotjs,   color: "#FFFFFF" },
  "nextjs-backend":  { Icon: SiNextdotjs,   color: "#FFFFFF" },
  c:                 { Icon: SiC,           color: "#A8B9CC" },
  cpp:               { Icon: SiCplusplus,   color: "#FFFFFF" },
  csharp:            { Icon: SiSharp,       color: "#FFFFFF" },
  java:              { Icon: FaJava,        color: "#FFFFFF" },
  cybersecurity:     { Icon: FaShieldAlt,   color: "#FFFFFF" },
  sql:               { Icon: SiMysql,       color: "#FFFFFF" },
  php:               { Icon: SiPhp,         color: "#FFFFFF" },
};

export function ModIcon({ slug, className = "w-5 h-5" }) {
  const entry = MOD_ICONS[slug];
  if (!entry) return <Code2 className={className} />;
  const { Icon, color } = entry;
  return <Icon className={className} style={{ color }} />;
}

export const MOD_BG = {
  python: "from-blue-500 to-cyan-400", javascript: "from-yellow-400 to-orange-400",
  html: "from-orange-500 to-red-500", css: "from-blue-500 to-indigo-600",
  tailwind: "from-cyan-400 to-teal-500", react: "from-sky-400 to-blue-500",
  "nextjs-frontend": "from-gray-700 to-gray-900", "nextjs-backend": "from-slate-600 to-slate-800",
  c: "from-purple-500 to-violet-600", cpp: "from-violet-500 to-pink-600",
  csharp: "from-indigo-500 to-purple-700", java: "from-red-500 to-orange-600",
  cybersecurity: "from-emerald-500 to-green-700",
  sql: "from-blue-600 to-cyan-700", php: "from-violet-600 to-indigo-700",
};
