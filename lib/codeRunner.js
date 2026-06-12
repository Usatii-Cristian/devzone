// Client-side code execution + offline grading.
//
// JavaScript/JSX run in a sandboxed iframe (already offline). Python runs via
// Pyodide (CPython in WebAssembly) loaded from jsDelivr — the service worker
// caches it so it keeps working with no network. Grading offline compares the
// program's stdout to the task's expectedOutput, mirroring the server's shape.

const PYODIDE_VERSION = "0.26.4";
export const PYODIDE_BASE = `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/`;

let pyodidePromise = null;

function loadScript(src) {
  return new Promise((resolve, reject) => {
    if (typeof document === "undefined") return reject(new Error("no document"));
    const existing = document.querySelector(`script[data-pysrc="${src}"]`);
    if (existing) {
      if (existing.dataset.loaded) return resolve();
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () => reject(new Error("script load failed")));
      return;
    }
    const s = document.createElement("script");
    s.src = src;
    s.dataset.pysrc = src;
    s.onload = () => { s.dataset.loaded = "1"; resolve(); };
    s.onerror = () => reject(new Error("script load failed"));
    document.head.appendChild(s);
  });
}

// Lazily boot Pyodide once; the heavy WASM/stdlib are fetched here and cached by
// the service worker, so a second run (even offline) is instant.
export async function getPyodide() {
  if (!pyodidePromise) {
    pyodidePromise = (async () => {
      await loadScript(`${PYODIDE_BASE}pyodide.js`);
      if (typeof window === "undefined" || typeof window.loadPyodide !== "function") {
        throw new Error("Pyodide indisponibil");
      }
      return window.loadPyodide({ indexURL: PYODIDE_BASE });
    })().catch((e) => { pyodidePromise = null; throw e; });
  }
  return pyodidePromise;
}

export async function runPython(code) {
  let py;
  try {
    py = await getPyodide();
  } catch {
    return navigator.onLine
      ? "Nu am putut încărca motorul Python. Încearcă din nou."
      : "Motorul Python nu e descărcat. Conectează-te o dată și apasă „Descarcă pentru offline”.";
  }
  let out = "";
  py.setStdout({ batched: (s) => { out += s + "\n"; } });
  py.setStderr({ batched: (s) => { out += s + "\n"; } });
  try {
    await py.runPythonAsync(code);
  } catch (e) {
    const msg = String(e?.message || e);
    // Keep only the last few lines of the traceback (the actual error)
    out += "Eroare: " + msg.split("\n").filter(Boolean).slice(-3).join("\n");
  }
  return out.replace(/\n+$/, "") || "(fără output)";
}

// Languages we can run fully in the browser (no server / no internet).
export function isLocalLanguage(language) {
  const l = (language || "").toLowerCase();
  return l === "javascript" || l === "jsx" || l === "python" || l === "";
}

// Normalize stdout for a forgiving but exact-ish comparison.
function normalizeOutput(s) {
  return String(s ?? "")
    .replace(/\r\n/g, "\n")
    .split("\n")
    .map((l) => l.replace(/\s+$/, ""))
    .join("\n")
    .replace(/\n+$/, "")
    .trim();
}

// Offline grader: compare produced output to expectedOutput. Returns the same
// shape as /api/evaluate-code so the UI renders identically.
export function gradeByOutput(output, expectedOutput) {
  const got = normalizeOutput(output);
  const want = normalizeOutput(expectedOutput);
  const correct = got === want && want !== "";
  return {
    correct,
    scores: correct
      ? { functionality: 10, quality: 8, clarity: 8 }
      : { functionality: 2, quality: 5, clarity: 5 },
    total: correct ? 26 : 12,
    feedback: correct
      ? "Corect! Output-ul corespunde exact cu cel așteptat. (verificat offline)"
      : `Output-ul nu corespunde.\n\nAșteptat:\n${expectedOutput}\n\nPrimit:\n${output}`,
    issues: correct ? [] : ["Output diferit de cel așteptat"],
    bestSolution: "",
    offline: true,
  };
}

export function canGradeOffline(task) {
  return Boolean(task?.expectedOutput && String(task.expectedOutput).trim() !== "");
}
