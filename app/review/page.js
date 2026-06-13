"use client";
import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  ArrowLeft, RotateCcw, CheckCircle, XCircle, Brain, Sparkles, ChevronRight, PenLine,
} from "lucide-react";
import Navbar from "@/components/Navbar";

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function ReviewPage() {
  const [cards, setCards] = useState(null); // null = loading
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [fillValue, setFillValue] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [done, setDone] = useState(false);

  useEffect(() => {
    fetch("/api/review/due")
      .then((r) => r.json())
      .then((d) => setCards(Array.isArray(d.cards) ? d.cards : []))
      .catch(() => setCards([]));
  }, []);

  const card = cards && cards[idx];
  const options = useMemo(() => (card?.type === "quiz" ? shuffle(card.options || []) : []), [card]);

  const isCorrect = card
    ? card.type === "fillblank"
      ? fillValue.trim().toLowerCase() === (card.answer || "").trim().toLowerCase()
      : selected === card.answer
    : false;

  async function submit() {
    if (card.type === "fillblank" ? !fillValue.trim() : selected == null) return;
    setSubmitted(true);
    const correct = isCorrect;
    setScore((s) => ({ correct: s.correct + (correct ? 1 : 0), total: s.total + 1 }));
    fetch("/api/review/grade", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ taskId: card.taskId, grade: correct ? "good" : "again" }),
    }).catch(() => {});
  }

  function nextCard() {
    if (idx + 1 >= cards.length) { setDone(true); return; }
    setIdx(idx + 1);
    setSelected(null);
    setFillValue("");
    setSubmitted(false);
  }

  const Header = (
    <header className="bg-gradient-to-r from-violet-700 to-purple-700 text-white shadow-lg sticky top-0 z-40">
      <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
        <Link href="/" className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors active:scale-95">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div className="flex items-center gap-2.5 flex-1 min-w-0">
          <div className="w-9 h-9 bg-yellow-400 rounded-xl flex items-center justify-center flex-shrink-0">
            <Brain className="w-4 h-4 text-yellow-900" />
          </div>
          <div className="min-w-0">
            <h1 className="font-black text-base leading-tight">Repetiție</h1>
            <p className="text-violet-200 text-xs leading-tight">Întărește ce ai învățat</p>
          </div>
        </div>
        {cards && cards.length > 0 && !done && (
          <span className="text-xs font-black bg-white/15 px-2.5 py-1 rounded-full flex-shrink-0">{idx + 1}/{cards.length}</span>
        )}
      </div>
    </header>
  );

  // Loading
  if (cards === null) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 to-purple-50 dark:from-slate-900 dark:to-slate-800 pb-28">
        {Header}
        <div className="flex items-center justify-center py-24">
          <div className="w-9 h-9 rounded-full border-4 border-violet-200 border-t-violet-600 animate-spin" />
        </div>
        <Navbar />
      </div>
    );
  }

  // Empty
  if (cards.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 to-purple-50 dark:from-slate-900 dark:to-slate-800 pb-28">
        {Header}
        <main className="max-w-2xl mx-auto px-4 py-16 text-center">
          <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-3xl flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-emerald-500" />
          </div>
          <h2 className="font-black text-slate-800 dark:text-white text-lg mb-1">Nimic de repetat acum 🎉</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xs mx-auto">
            Pe măsură ce greșești întrebări sau le rezolvi, apar aici pentru repetiție la intervale crescătoare.
          </p>
          <Link href="/" className="inline-flex items-center gap-2 mt-5 bg-violet-600 text-white px-4 py-2.5 rounded-xl font-bold text-sm hover:bg-violet-700 transition-colors">
            Înapoi acasă
          </Link>
        </main>
        <Navbar />
      </div>
    );
  }

  // Summary
  if (done) {
    const pct = score.total ? Math.round((score.correct / score.total) * 100) : 0;
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 to-purple-50 dark:from-slate-900 dark:to-slate-800 pb-28">
        {Header}
        <main className="max-w-2xl mx-auto px-4 py-12 text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-violet-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h2 className="font-black text-slate-800 dark:text-white text-2xl mb-1">{score.correct}/{score.total} corecte</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">{pct}% — întrebările greșite revin mai curând, cele corecte mai târziu.</p>
          <div className="flex gap-2 justify-center">
            <button onClick={() => { setIdx(0); setSelected(null); setFillValue(""); setSubmitted(false); setScore({ correct: 0, total: 0 }); setDone(false); setCards(null); fetch("/api/review/due").then(r => r.json()).then(d => setCards(d.cards || [])).catch(() => setCards([])); }}
              className="inline-flex items-center gap-2 bg-violet-600 text-white px-4 py-2.5 rounded-xl font-bold text-sm hover:bg-violet-700 transition-colors active:scale-95">
              <RotateCcw className="w-4 h-4" /> Încă o sesiune
            </button>
            <Link href="/" className="inline-flex items-center gap-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-white px-4 py-2.5 rounded-xl font-bold text-sm hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">
              Acasă
            </Link>
          </div>
        </main>
        <Navbar />
      </div>
    );
  }

  // Card
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-purple-50 dark:from-slate-900 dark:to-slate-800 pb-28">
      {Header}
      <main className="max-w-2xl mx-auto px-4 py-5">
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm">
          <p className="text-[11px] font-black text-violet-500 uppercase tracking-widest mb-2 flex items-center gap-1.5">
            {card.type === "fillblank" ? <PenLine className="w-3.5 h-3.5" /> : <Brain className="w-3.5 h-3.5" />}
            {card.moduleTitle} · {card.lessonTitle}
          </p>
          <p className="text-slate-800 dark:text-white font-bold text-base mb-4 whitespace-pre-wrap">{card.question}</p>

          {card.type === "fillblank" ? (
            <input
              value={fillValue}
              onChange={(e) => setFillValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !submitted && submit()}
              disabled={submitted}
              placeholder="Răspunsul tău…"
              className={`w-full px-4 py-3 rounded-xl border-2 font-mono text-sm focus:outline-none
                ${submitted
                  ? isCorrect ? "border-emerald-400 bg-emerald-50 dark:bg-emerald-900/30" : "border-red-400 bg-red-50 dark:bg-red-900/30"
                  : "border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 focus:border-violet-500"}`}
            />
          ) : (
            <div className="space-y-2">
              {options.map((opt) => {
                const isAns = opt === card.answer;
                const isSel = opt === selected;
                let cls = "border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 hover:border-violet-300";
                if (submitted) {
                  if (isAns) cls = "border-emerald-400 bg-emerald-50 dark:bg-emerald-900/30";
                  else if (isSel) cls = "border-red-400 bg-red-50 dark:bg-red-900/30";
                  else cls = "border-slate-200 dark:border-slate-700 opacity-60";
                } else if (isSel) {
                  cls = "border-violet-500 bg-violet-50 dark:bg-violet-900/30";
                }
                return (
                  <button key={opt} disabled={submitted} onClick={() => setSelected(opt)}
                    className={`w-full text-left px-4 py-3 rounded-xl border-2 text-sm font-medium text-slate-700 dark:text-slate-200 transition-all ${cls}`}>
                    {opt}
                  </button>
                );
              })}
            </div>
          )}

          {submitted && (
            <div className={`rounded-xl p-3 mt-4 border-2 ${isCorrect ? "border-emerald-300 bg-emerald-50 dark:bg-emerald-900/20" : "border-red-300 bg-red-50 dark:bg-red-900/20"}`}>
              <p className={`font-black text-sm flex items-center gap-1.5 ${isCorrect ? "text-emerald-700 dark:text-emerald-300" : "text-red-700 dark:text-red-300"}`}>
                {isCorrect ? <><CheckCircle className="w-4 h-4" /> Corect!</> : <><XCircle className="w-4 h-4" /> Greșit. Răspuns: <strong>{card.answer}</strong></>}
              </p>
              {card.explanation && <p className="text-xs text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed">{card.explanation}</p>}
            </div>
          )}

          <div className="mt-4">
            {!submitted ? (
              <button onClick={submit}
                disabled={card.type === "fillblank" ? !fillValue.trim() : selected == null}
                className="w-full bg-gradient-to-r from-violet-500 to-purple-600 text-white py-3 rounded-xl font-black text-sm hover:opacity-90 transition-opacity disabled:opacity-50 active:scale-[0.98]">
                Verifică
              </button>
            ) : (
              <button onClick={nextCard}
                className="w-full bg-slate-800 dark:bg-slate-700 text-white py-3 rounded-xl font-black text-sm hover:bg-slate-700 dark:hover:bg-slate-600 transition-colors flex items-center justify-center gap-2 active:scale-[0.98]">
                {idx + 1 >= cards.length ? "Vezi rezultatul" : "Următoarea"} <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </main>
      <Navbar />
    </div>
  );
}
