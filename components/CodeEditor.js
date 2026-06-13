"use client";
import dynamic from "next/dynamic";
import { dracula } from "@uiw/codemirror-theme-dracula";
import { useLocalStorage } from "@/lib/hooks";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { java } from "@codemirror/lang-java";
import { cpp } from "@codemirror/lang-cpp";
import { php } from "@codemirror/lang-php";
import { sql } from "@codemirror/lang-sql";
import { css } from "@codemirror/lang-css";
import { html } from "@codemirror/lang-html";

// CodeMirror touches the DOM as it loads, so render it on the client only.
// The wrapper reserves height to avoid layout shift before it mounts.
const CodeMirror = dynamic(() => import("@uiw/react-codemirror"), { ssr: false });

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

export default function CodeEditor({ value, onChange, language, disabled, minHeight = "200px" }) {
  // Honor the user's Settings (shared with the /editor playground). The stored
  // values use Monaco-style names; "vs-light" maps to CodeMirror's light theme,
  // everything else to dracula (dark).
  const [editorTheme] = useLocalStorage("editor-theme", "vs-dark");
  const [editorFontRaw] = useLocalStorage("editor-font", "14");
  const fontSize = `${Number(editorFontRaw) || 14}px`;
  const light = editorTheme === "vs-light";

  return (
    <div style={{ minHeight }} className={light ? "bg-white" : "bg-gray-900"}>
      <CodeMirror
        value={value}
        theme={light ? "light" : dracula}
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
        style={{ fontSize, minHeight }}
      />
    </div>
  );
}
