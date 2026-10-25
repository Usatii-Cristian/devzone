"use strict";
// Providers. OmniRoute (local router from the ambra project, port 20128) proxies Claude /
// GPT / Gemini through Cristi's subscriptions with no API key; Google AI Studio and Groq use
// keys from .env; Ollama is the local last resort. A provider that fails is benched for a while.
const OMNI = "http://localhost:20128/v1/chat/completions";
const GROQ = "https://api.groq.com/openai/v1/chat/completions";
const OLLAMA = "http://localhost:11434/v1/chat/completions";
const omni = model => ({ name: model, call: (s, u) => callOpenAI(OMNI, null, model, s, u) });
const groq = model => ({ name: `groq:${model}`, call: (s, u) => callOpenAI(GROQ, process.env.GROQ_API_KEY, model, s, u) });
const gemini = model => ({ name: model, call: (s, u) => callGemini(model, s, u) });
const local = model => ({ name: `ollama:${model}`, call: (s, u) => callOpenAI(OLLAMA, null, model, s, u) });

// One worker per provider family, so they run in parallel without sharing a quota.
// Each worker falls back to the other families, then to the local model.
const FAMILIES = [
  [omni("antigravity/claude-sonnet-5"), omni("antigravity/claude-sonnet-4-6"), omni("agy/claude-sonnet-4-6"), omni("antigravity/claude-opus-4-6-thinking")],
  [omni("cx/gpt-5.6-terra-low"), omni("cx/gpt-5.6-luna-low")],
  [gemini("gemini-2.5-flash"), gemini("gemini-3-flash-preview"), omni("antigravity/gemini-2.5-flash"), gemini("gemini-2.5-flash-lite")],
  [groq("openai/gpt-oss-120b"), omni("antigravity/gpt-oss-120b-medium"), groq("qwen/qwen3.8-27b")],
];
const LOCAL = [local("gemma4:e4b")];
const COOLDOWN_MS = 15 * 60 * 1000;

const benchedUntil = {};

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function httpError(res) {
  const err = await res.json().catch(() => ({}));
  return Object.assign(new Error(`HTTP ${res.status}: ${JSON.stringify(err).slice(0, 200)}`), { status: res.status });
}

async function callGemini(model, systemInstr, userPrompt) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${process.env.GOOGLE_AI_KEY}`;
  const res = await fetch(url, {
    method: "POST",
    signal: AbortSignal.timeout(180000),
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      system_instruction: { parts: [{ text: systemInstr }] },
      contents: [{ role: "user", parts: [{ text: userPrompt }] }],
      generationConfig: {
        maxOutputTokens: 4000,
        temperature: 0.4,
        ...(model.includes("2.5") ? { thinkingConfig: { thinkingBudget: 0 } } : {}),
      },
    }),
  });
  if (!res.ok) throw await httpError(res);
  const data = await res.json();
  const parts = data.candidates?.[0]?.content?.parts ?? [];
  const textPart = parts.find(p => !p.thought) || parts[0];
  return (textPart?.text ?? "").trim();
}

async function callOpenAI(url, key, model, systemInstr, userPrompt) {
  const res = await fetch(url, {
    method: "POST",
    signal: AbortSignal.timeout(300000),
    headers: { "Content-Type": "application/json", ...(key ? { Authorization: `Bearer ${key}` } : {}) },
    body: JSON.stringify({
      model,
      messages: [{ role: "system", content: systemInstr }, { role: "user", content: userPrompt }],
      max_tokens: 6000,
      temperature: 0.4,
      stream: false,
    }),
  });
  if (!res.ok) throw await httpError(res);
  const data = await res.json();
  return (data.choices?.[0]?.message?.content ?? "").trim();
}

// Try the chain in order, skipping benched providers. When all are benched, wait for the first to recover.
async function callLLM(chain, systemInstr, userPrompt) {
  for (;;) {
    const now = Date.now();
    for (const p of chain) {
      if ((benchedUntil[p.name] || 0) > now) continue;
      try {
        const text = await p.call(systemInstr, userPrompt);
        if (text) return { text, provider: p.name };
        throw new Error("empty response");
      } catch (err) {
        console.log(`    ${p.name} failed: ${err.message.slice(0, 100)}`);
        benchedUntil[p.name] = Date.now() + (err.status === 429 ? COOLDOWN_MS : 2 * 60 * 1000);
      }
    }
    const wake = Math.min(...chain.map(p => benchedUntil[p.name]));
    await sleep(Math.max(wake - Date.now(), 1000));
  }
}

// Worker w prefers family w, then the other families, then the local model.
function chainFor(w) {
  return [...FAMILIES.slice(w), ...FAMILIES.slice(0, w)].flat().concat(LOCAL);
}

module.exports = { FAMILIES, callLLM, chainFor, sleep };
