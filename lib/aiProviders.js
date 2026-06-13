// Robust AI text generation with a hard timeout and a Gemini→Groq fallback, so
// a slow/quota'd provider returns a clean JSON error instead of hanging the
// serverless function into a 504 (which the client sees as "connection error").

function withTimeout(ms) {
  const c = new AbortController();
  const t = setTimeout(() => c.abort(), ms);
  return { signal: c.signal, clear: () => clearTimeout(t) };
}

export async function geminiText({ apiKey, system, contents, maxOutputTokens = 600, temperature = 0.7, timeoutMs = 8000 }) {
  const { signal, clear } = withTimeout(timeoutMs);
  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal,
        body: JSON.stringify({
          system_instruction: { parts: [{ text: system }] },
          contents,
          generationConfig: { maxOutputTokens, temperature, thinkingConfig: { thinkingBudget: 0 } },
        }),
      }
    );
    if (!res.ok) throw new Error("gemini_" + res.status);
    const data = await res.json();
    const parts = data.candidates?.[0]?.content?.parts ?? [];
    const tp = parts.find((p) => !p.thought) || parts[0];
    const text = (tp?.text ?? "").trim();
    if (!text) throw new Error("gemini_empty");
    return text;
  } finally {
    clear();
  }
}

export async function groqText({ apiKey, system, messages, maxTokens = 700, temperature = 0.7, timeoutMs = 7000 }) {
  const { signal, clear } = withTimeout(timeoutMs);
  try {
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      signal,
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [{ role: "system", content: system }, ...messages],
        max_tokens: maxTokens,
        temperature,
      }),
    });
    if (!res.ok) throw new Error("groq_" + res.status);
    const data = await res.json();
    const text = (data.choices?.[0]?.message?.content ?? "").trim();
    if (!text) throw new Error("groq_empty");
    return text;
  } finally {
    clear();
  }
}

// Try Gemini, then Groq. `contents` is Gemini-format; `messages` is OpenAI-format.
// Returns the text, or null if every available provider failed.
export async function generateText({ system, contents, messages, maxTokens = 700, temperature = 0.7 }) {
  const gKey = process.env.GOOGLE_AI_KEY;
  const qKey = process.env.GROQ_API_KEY;

  if (gKey) {
    try {
      return await geminiText({ apiKey: gKey, system, contents, maxOutputTokens: maxTokens, temperature });
    } catch (e) {
      console.error("[ai] Gemini failed:", e?.message);
    }
  }
  if (qKey) {
    try {
      return await groqText({ apiKey: qKey, system, messages, maxTokens, temperature });
    } catch (e) {
      console.error("[ai] Groq failed:", e?.message);
    }
  }
  return null;
}
