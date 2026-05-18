"use client";
import { useEffect, useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { dracula } from "@uiw/codemirror-theme-dracula";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { java } from "@codemirror/lang-java";
import { cpp } from "@codemirror/lang-cpp";
import { php } from "@codemirror/lang-php";
import { sql } from "@codemirror/lang-sql";
import { css } from "@codemirror/lang-css";
import { html } from "@codemirror/lang-html";

function getLang(language) {
  switch ((language || "javascript").toLowerCase()) {
    case "python":     return python();
    case "java":       return java();
    case "c":
    case "cpp":        return cpp();
    case "csharp":     return cpp(); // closest available
    case "php":        return php();
    case "sql":        return sql();
    case "css":        return css();
    case "html":       return html();
    default:           return javascript({ jsx: true });
  }
}

export default function CodeEditor({ value, onChange, language, disabled, minHeight = "200px", rows = 10 }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  if (!mounted) {
    return (
      <textarea
        value={value}
        onChange={e => onChange?.(e.target.value)}
        disabled={disabled}
        rows={rows}
        spellCheck={false}
        className="w-full bg-gray-900 text-green-300 font-mono text-xs sm:text-sm p-3 sm:p-4 focus:outline-none resize-y leading-relaxed disabled:opacity-70"
        style={{ minHeight }}
      />
    );
  }

  return (
    <CodeMirror
      value={value}
      theme={dracula}
      extensions={[getLang(language)]}
      onChange={val => onChange?.(val)}
      editable={!disabled}
      basicSetup={{
        lineNumbers: true,
        foldGutter: false,
        dropCursor: false,
        allowMultipleSelections: false,
        indentOnInput: true,
        bracketMatching: true,
        autocompletion: true,
        closeBrackets: true,
        highlightActiveLine: true,
      }}
      style={{ fontSize: "13px", minHeight }}
      className="text-sm"
    />
  );
}
