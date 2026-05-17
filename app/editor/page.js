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

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), { ssr: false });

const LANGUAGES = [
  {
    id: "python", label: "Python", monacoLang: "python", piston: "python", version: "3.10.0",
    icon: "🐍",
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
    icon: "⚡",
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
    icon: "©",
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
    icon: "⊕",
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
    icon: "☕",
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
    icon: "◇",
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
    icon: "🐘",
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
    icon: "🌐",
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
        iframeRef.current.srcdoc = code;
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
    <div className="min-h-screen bg-[#1e1e2e] pb-16 flex flex-col">
      {/* Header */}
      <header className="bg-[#181825] border-b border-white/10 px-4 py-2.5 flex items-center gap-3 flex-shrink-0">
        <Link href="/" className="p-1.5 rounded-lg bg-white/10 hover:bg-white/15 transition-colors text-white">
          <ArrowLeft className="w-4 h-4"/>
        </Link>
        <div className="flex items-center gap-2 flex-1">
          <Code2 className="w-4 h-4 text-indigo-400"/>
          <span className="font-black text-white text-sm">DevZone Editor</span>
          <span className="text-white/30 text-xs ml-1">Ctrl+Enter = Run</span>
        </div>

        {/* Language selector */}
        <div className="relative">
          <button onClick={() => setLangOpen(o => !o)}
            className="flex items-center gap-2 bg-white/10 hover:bg-white/15 transition-colors px-3 py-1.5 rounded-lg text-white text-sm font-bold">
            <span>{lang.icon}</span>
            <span>{lang.label}</span>
            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${langOpen ? "rotate-180" : ""}`}/>
          </button>
          {langOpen && (
            <div className="absolute right-0 top-full mt-1 bg-[#181825] border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden w-44">
              {LANGUAGES.map(l => (
                <button key={l.id} onClick={() => selectLang(l)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 text-sm text-left transition-colors
                    ${l.id === langId ? "bg-indigo-600 text-white font-bold" : "text-white/70 hover:bg-white/10 hover:text-white"}`}>
                  <span>{l.icon}</span>{l.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Actions */}
        <button onClick={copyCode}
          className="p-1.5 rounded-lg bg-white/10 hover:bg-white/15 transition-colors text-white/70 hover:text-white">
          {copied ? <Check className="w-4 h-4 text-emerald-400"/> : <Copy className="w-4 h-4"/>}
        </button>
        <button onClick={resetCode}
          className="p-1.5 rounded-lg bg-white/10 hover:bg-white/15 transition-colors text-white/70 hover:text-white">
          <RotateCcw className="w-4 h-4"/>
        </button>
        <button onClick={runCode} disabled={running}
          className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-60 transition-colors px-4 py-1.5 rounded-lg text-white font-black text-sm">
          <Play className="w-3.5 h-3.5 fill-current"/>
          {running ? "Se rulează..." : "Run"}
        </button>
      </header>

      {/* Editor + Output */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden" style={{ height: "calc(100vh - 110px)" }}>
        {/* Editor */}
        <div className="flex-1 min-h-0 border-r border-white/10" style={{ minHeight: "300px" }}>
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
        <div className="lg:w-80 xl:w-96 flex flex-col bg-[#181825] flex-shrink-0" style={{ minHeight: "200px" }}>
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
