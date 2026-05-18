"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { useLocalStorage } from "@/lib/hooks";
import {
  ArrowLeft, Play, RotateCcw, Copy, Check, ChevronDown,
  Terminal, Code2, Globe
} from "lucide-react";
import {
  SiPython, SiJavascript, SiC, SiCplusplus, SiSharp, SiPhp,
  SiHtml5, SiNextdotjs
} from "react-icons/si";
import { FaJava } from "react-icons/fa";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), { ssr: false });

const LANGUAGES = [
  {
    id: "python", label: "Python", monacoLang: "python", piston: "python", version: "3.10.0",
    Icon: SiPython, color: "#3776AB",
    default: `# Python — scrie codul tău aici
def salut(nume):
    return f"Salut, {nume}!"

print(salut("DevZone"))

# Liste și bucle
numere = [1, 2, 3, 4, 5]
suma = sum(numere)
print(f"Suma: {suma}")
`,
  },
  {
    id: "javascript", label: "JavaScript", monacoLang: "javascript", piston: "javascript", version: "18.15.0",
    Icon: SiJavascript, color: "#F7DF1E",
    default: `// JavaScript (Node.js)
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

for (let i = 0; i < 10; i++) {
  console.log(\`fib(\${i}) = \${fibonacci(i)}\`);
}
`,
  },
  {
    id: "c", label: "C", monacoLang: "c", piston: "c", version: "10.2.0",
    Icon: SiC, color: "#A8B9CC",
    default: `#include <stdio.h>

int factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}

int main() {
    for (int i = 1; i <= 8; i++) {
        printf("%d! = %d\\n", i, factorial(i));
    }
    return 0;
}
`,
  },
  {
    id: "cpp", label: "C++", monacoLang: "cpp", piston: "c++", version: "10.2.0",
    Icon: SiCplusplus, color: "#00599C",
    default: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> v = {5, 2, 8, 1, 9, 3};
    sort(v.begin(), v.end());

    cout << "Sortat: ";
    for (int x : v) cout << x << " ";
    cout << endl;

    cout << "Max: " << *max_element(v.begin(), v.end()) << endl;
    return 0;
}
`,
  },
  {
    id: "java", label: "Java", monacoLang: "java", piston: "java", version: "15.0.2",
    Icon: FaJava, color: "#ED8B00",
    default: `public class Main {
    static int[] bubbleSort(int[] arr) {
        int n = arr.length;
        for (int i = 0; i < n - 1; i++)
            for (int j = 0; j < n - i - 1; j++)
                if (arr[j] > arr[j + 1]) {
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }
        return arr;
    }

    public static void main(String[] args) {
        int[] arr = {64, 34, 25, 12, 22, 11, 90};
        bubbleSort(arr);
        System.out.print("Sortat: ");
        for (int x : arr) System.out.print(x + " ");
        System.out.println();
    }
}
`,
  },
  {
    id: "csharp", label: "C#", monacoLang: "csharp", piston: "csharp", version: "6.12.0",
    Icon: SiSharp, color: "#239120",
    default: `using System;
using System.Linq;
using System.Collections.Generic;

class Program {
    static void Main() {
        var numere = new List<int> { 3, 1, 4, 1, 5, 9, 2, 6 };
        var unice = numere.Distinct().OrderBy(x => x).ToList();
        Console.WriteLine("Unice sortate: " + string.Join(", ", unice));
        Console.WriteLine("Medie: " + numere.Average());
    }
}
`,
  },
  {
    id: "php", label: "PHP", monacoLang: "php", piston: "php", version: "8.2.3",
    Icon: SiPhp, color: "#777BB4",
    default: `<?php
function isPrime($n) {
    if ($n < 2) return false;
    for ($i = 2; $i <= sqrt($n); $i++)
        if ($n % $i === 0) return false;
    return true;
}

$primes = array_filter(range(2, 50), 'isPrime');
echo "Prime până la 50: " . implode(", ", $primes) . "\\n";
echo "Total: " . count($primes) . " numere prime\\n";
?>
`,
  },
  {
    id: "html", label: "HTML+CSS+JS", monacoLang: "html", piston: null,
    Icon: SiHtml5, color: "#E34F26",
    default: `<!DOCTYPE html>
<html lang="ro">
<head>
  <meta charset="UTF-8">
  <style>
    body {
      font-family: sans-serif;
      background: linear-gradient(135deg, #667eea, #764ba2);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .card {
      background: white;
      padding: 2rem;
      border-radius: 16px;
      box-shadow: 0 20px 40px rgba(0,0,0,0.2);
      text-align: center;
    }
    h1 { color: #4f46e5; margin-bottom: 1rem; }
    button {
      background: #4f46e5;
      color: white;
      border: none;
      padding: 0.75rem 1.5rem;
      border-radius: 8px;
      cursor: pointer;
      font-size: 1rem;
    }
    button:hover { background: #4338ca; }
    #output { margin-top: 1rem; font-size: 1.2rem; color: #374151; }
  </style>
</head>
<body>
  <div class="card">
    <h1>🚀 DevZone Editor</h1>
    <p>Click butonul de mai jos!</p>
    <button onclick="saluta()">Salutare!</button>
    <div id="output"></div>
  </div>
  <script>
    let count = 0;
    function saluta() {
      count++;
      document.getElementById('output').innerHTML =
        \`Click #\${count}: Salut din DevZone! 🎉\`;
    }
  </script>
</body>
</html>
`,
  },
  {
    id: "nextjs", label: "Next.js (React)", monacoLang: "javascript", piston: null,
    Icon: SiNextdotjs, color: "#000000",
    isReact: true,
    default: `// Next.js / React component — preview live în iframe
// Notă: pentru aplicații Next.js reale, deploy-uiește pe Vercel.

function Counter() {
  const [count, setCount] = React.useState(0);

  return (
    <div style={{
      fontFamily: 'system-ui',
      padding: 24,
      background: 'linear-gradient(135deg, #667eea, #764ba2)',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{
        background: 'white',
        padding: 32,
        borderRadius: 16,
        boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
        textAlign: 'center'
      }}>
        <h1 style={{ color: '#4f46e5', marginBottom: 16 }}>
          ⚛ React Counter
        </h1>
        <p style={{ fontSize: 48, fontWeight: 900, color: '#1e1b4b' }}>{count}</p>
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 16 }}>
          <button onClick={() => setCount(c => c - 1)}
            style={{ background: '#ef4444', color: 'white', border: 'none', padding: '12px 20px', borderRadius: 8, fontSize: 16, cursor: 'pointer' }}>
            −1
          </button>
          <button onClick={() => setCount(0)}
            style={{ background: '#64748b', color: 'white', border: 'none', padding: '12px 20px', borderRadius: 8, fontSize: 16, cursor: 'pointer' }}>
            Reset
          </button>
          <button onClick={() => setCount(c => c + 1)}
            style={{ background: '#22c55e', color: 'white', border: 'none', padding: '12px 20px', borderRadius: 8, fontSize: 16, cursor: 'pointer' }}>
            +1
          </button>
        </div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Counter />);
`,
  },
];

const PISTON_URL = "https://emkc.org/api/v2/piston/execute";

export default function EditorPage() {
  const [langId, setLangId] = useState("python");
  const [code, setCode] = useState(LANGUAGES[0].default);
  const [output, setOutput] = useState(null);
  const [running, setRunning] = useState(false);
  const [copied, setCopied] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [editorTheme] = useLocalStorage("editor-theme", "vs-dark");
  const [editorFontRaw] = useLocalStorage("editor-font", "14");
  const editorFont = Number(editorFontRaw) || 14;
  const iframeRef = useRef(null);

  const lang = LANGUAGES.find(l => l.id === langId);

  function selectLang(l) {
    setLangId(l.id);
    setCode(l.default);
    setOutput(null);
    setLangOpen(false);
  }

  async function runCode() {
    if (running) return;
    setRunning(true);
    setOutput(null);

    // HTML+CSS+JS — render in iframe
    if (lang.piston === null) {
      if (iframeRef.current) {
        if (lang.isReact) {
          // Wrap with React + Babel CDN for JSX
          iframeRef.current.srcdoc = `<!DOCTYPE html>
<html><head>
<script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
<style>body{margin:0;font-family:system-ui}</style>
</head><body>
<div id="root"></div>
<script type="text/babel" data-presets="react">
try {
${code}
} catch(e) {
  document.getElementById('root').innerHTML = '<pre style="color:red;padding:20px;font-family:monospace">'+e.message+'</pre>';
}
</script>
</body></html>`;
        } else {
          iframeRef.current.srcdoc = code;
        }
      }
      setOutput({ type: "html" });
      setRunning(false);
      return;
    }

    try {
      const res = await fetch(PISTON_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          language: lang.piston,
          version: lang.version,
          files: [{ content: code }],
        }),
      });
      const data = await res.json();
      const stdout = data.run?.stdout || "";
      const stderr = data.run?.stderr || data.compile?.stderr || "";
      setOutput({ type: "text", stdout, stderr });
    } catch {
      setOutput({ type: "text", stdout: "", stderr: "Eroare de rețea. Verifică conexiunea." });
    } finally {
      setRunning(false);
    }
  }

  function resetCode() {
    setCode(lang.default);
    setOutput(null);
  }

  async function copyCode() {
    await navigator.clipboard.writeText(code).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  useEffect(() => {
    function onKey(e) {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        runCode();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [code, langId]);

  return (
    <div className="min-h-screen bg-[#1e1e2e] pb-20 flex flex-col">
      {/* Header — wraps on mobile */}
      <header className="bg-[#181825] border-b border-white/10 flex-shrink-0">
        {/* Top row: back, title, language */}
        <div className="px-3 py-2 flex items-center gap-2">
          <Link href="/" className="p-2 rounded-lg bg-white/10 hover:bg-white/15 transition-colors text-white active:scale-95 flex-shrink-0">
            <ArrowLeft className="w-4 h-4"/>
          </Link>
          <div className="flex items-center gap-1.5 flex-1 min-w-0">
            <Code2 className="w-4 h-4 text-indigo-400 flex-shrink-0"/>
            <span className="font-black text-white text-sm truncate">Editor</span>
            <span className="text-white/30 text-[10px] ml-1 hidden md:inline">Ctrl+Enter</span>
          </div>

          {/* Language selector */}
          <div className="relative flex-shrink-0">
            <button onClick={() => setLangOpen(o => !o)}
              className="flex items-center gap-1.5 bg-white/10 hover:bg-white/15 transition-colors px-2.5 py-2 rounded-lg text-white text-xs font-bold active:scale-95">
              <lang.Icon className="w-4 h-4" style={{ color: lang.color }}/>
              <span>{lang.label}</span>
              <ChevronDown className={`w-3 h-3 transition-transform ${langOpen ? "rotate-180" : ""}`}/>
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full mt-1 bg-[#181825] border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden w-52 max-h-80 overflow-y-auto">
                {LANGUAGES.map(l => {
                  const LIcon = l.Icon;
                  return (
                    <button key={l.id} onClick={() => selectLang(l)}
                      className={`w-full flex items-center gap-2.5 px-3 py-3 text-sm text-left transition-colors active:bg-indigo-700
                        ${l.id === langId ? "bg-indigo-600 text-white font-bold" : "text-white/70 hover:bg-white/10 hover:text-white"}`}>
                      <LIcon className="w-4 h-4 flex-shrink-0" style={{ color: l.id === langId ? "#fff" : l.color }}/>
                      <span>{l.label}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Bottom row: action buttons */}
        <div className="px-3 pb-2 flex items-center gap-2">
          <button onClick={copyCode}
            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 p-2 rounded-lg bg-white/10 hover:bg-white/15 transition-colors text-white/70 hover:text-white active:scale-95">
            {copied ? <Check className="w-4 h-4 text-emerald-400"/> : <Copy className="w-4 h-4"/>}
            <span className="text-xs sm:hidden">{copied ? "Copiat" : "Copy"}</span>
          </button>
          <button onClick={resetCode}
            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 p-2 rounded-lg bg-white/10 hover:bg-white/15 transition-colors text-white/70 hover:text-white active:scale-95">
            <RotateCcw className="w-4 h-4"/>
            <span className="text-xs sm:hidden">Reset</span>
          </button>
          <button onClick={runCode} disabled={running}
            className="flex-[2] sm:flex-none flex items-center justify-center gap-1.5 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-60 transition-colors px-4 py-2 rounded-lg text-white font-black text-sm active:scale-95 sm:ml-auto">
            <Play className="w-3.5 h-3.5 fill-current"/>
            {running ? "Rulează..." : "Run"}
          </button>
        </div>
      </header>

      {/* Editor + Output */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Editor */}
        <div className="flex-1 min-h-[40vh] lg:min-h-0 border-b lg:border-b-0 lg:border-r border-white/10">
          <MonacoEditor
            height="100%"
            language={lang.monacoLang}
            value={code}
            onChange={v => setCode(v || "")}
            theme={editorTheme}
            options={{
              fontSize: editorFont,
              fontFamily: "'JetBrains Mono', 'Fira Code', 'Consolas', monospace",
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              wordWrap: "on",
              padding: { top: 12, bottom: 12 },
              lineNumbers: "on",
              renderLineHighlight: "all",
              automaticLayout: true,
              tabSize: 4,
              formatOnType: true,
            }}
          />
        </div>

        {/* Output panel */}
        <div className="lg:w-80 xl:w-96 flex flex-col bg-[#181825] flex-shrink-0 min-h-[35vh] lg:min-h-0">
          <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/10 flex-shrink-0">
            {lang.piston === null
              ? <Globe className="w-4 h-4 text-indigo-400"/>
              : <Terminal className="w-4 h-4 text-emerald-400"/>}
            <span className="text-white/70 text-xs font-bold uppercase tracking-wider">
              {lang.piston === null ? "Preview" : "Output"}
            </span>
          </div>

          <div className="flex-1 overflow-hidden">
            {/* No output yet */}
            {!output && !running && (
              <div className="flex items-center justify-center h-full text-white/20 text-sm text-center px-4">
                <div>
                  <Play className="w-8 h-8 mx-auto mb-2 opacity-30"/>
                  <p>Apasă Run sau Ctrl+Enter</p>
                </div>
              </div>
            )}

            {/* Running */}
            {running && (
              <div className="flex items-center justify-center h-full text-white/40 text-sm gap-2">
                <div className="w-4 h-4 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin"/>
                Se compilează...
              </div>
            )}

            {/* Text output (compiled languages) */}
            {output?.type === "text" && (
              <div className="h-full overflow-y-auto p-4 font-mono text-xs leading-relaxed">
                {output.stdout && (
                  <pre className="text-emerald-300 whitespace-pre-wrap break-words">{output.stdout}</pre>
                )}
                {output.stderr && (
                  <pre className="text-red-400 whitespace-pre-wrap break-words mt-2">{output.stderr}</pre>
                )}
                {!output.stdout && !output.stderr && (
                  <p className="text-white/30">Niciun output.</p>
                )}
              </div>
            )}

            {/* HTML preview */}
            {output?.type === "html" && (
              <iframe
                ref={iframeRef}
                className="w-full h-full bg-white"
                sandbox="allow-scripts"
                title="HTML Preview"
              />
            )}
          </div>
        </div>
      </div>

      <Navbar/>
    </div>
  );
}
