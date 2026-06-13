// Offline-resilient progress saving.
// Progress writes go to /api/progress; when offline (or the request fails) the
// payload is queued in localStorage and flushed automatically on reconnect.
// Each lesson keeps only its latest state (last-write-wins), so the queue stays
// tiny and replaying it is safe (the API upserts full state per lesson).

const KEY = "devzone-progress-queue";
const ENDPOINT = "/api/progress";

// ── Pure helper (unit-tested) ──────────────────────────────────────────────
// Merge an item into the queue, deduping by lessonId (newest wins).
export function mergeQueue(queue, item) {
  const next = (queue || []).filter((q) => q.lessonId !== item.lessonId);
  next.push(item);
  return next;
}

// ── localStorage-backed queue ───────────────────────────────────────────────
function readQueue() {
  if (typeof localStorage === "undefined") return [];
  try {
    const v = JSON.parse(localStorage.getItem(KEY) || "[]");
    return Array.isArray(v) ? v : [];
  } catch {
    return [];
  }
}

function writeQueue(q) {
  if (typeof localStorage === "undefined") return;
  try { localStorage.setItem(KEY, JSON.stringify(q)); } catch {}
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("devzone-queue-changed", { detail: { size: q.length } }));
  }
}

export function queueSize() {
  return readQueue().length;
}

export function enqueueProgress(body) {
  writeQueue(mergeQueue(readQueue(), { ...body, _ts: Date.now() }));
}

async function postProgress(body) {
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    keepalive: true,
  });
  if (!res.ok) throw new Error("save failed: " + res.status);
  return res;
}

// Save progress with an offline fallback. Returns { queued }.
export async function saveProgress(body) {
  if (typeof navigator !== "undefined" && navigator.onLine === false) {
    enqueueProgress(body);
    return { queued: true };
  }
  try {
    await postProgress(body);
    return { queued: false };
  } catch {
    enqueueProgress(body);
    return { queued: true };
  }
}

// Flush queued progress to the server. Returns the count successfully sent.
export async function flushQueue() {
  const q = readQueue();
  if (q.length === 0) return 0;
  let flushed = 0;
  const remaining = [];
  for (const item of q) {
    const { _ts, ...body } = item;
    try { await postProgress(body); flushed++; }
    catch { remaining.push(item); }
  }
  writeQueue(remaining);
  return flushed;
}

// Wire auto-flush: on reconnect and once on load. Idempotent.
let wired = false;
export function initProgressSync() {
  if (wired || typeof window === "undefined") return;
  wired = true;
  const tryFlush = () => { if (navigator.onLine) flushQueue().catch(() => {}); };
  window.addEventListener("online", tryFlush);
  tryFlush();
}
