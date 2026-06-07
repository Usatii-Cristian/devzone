"use client";
import dynamic from "next/dynamic";
import { dracula } from "@uiw/codemirror-theme-dracula";
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
  return (
    <div style={{ minHeight }} className="bg-gray-900">
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
    </div>
  );
}
