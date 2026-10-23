"use strict";
require("dotenv").config({ path: ".env" });
const { PrismaClient } = require("@prisma/client");

// Provider chain: each Gemini model has its own free-tier quota, Groq is the last resort.
// A provider that returns 429/quota errors is benched for COOLDOWN_MS and the next one is tried.
const PROVIDERS = [
  ...["gemini-2.5-flash", "gemini-3-flash-preview", "gemini-flash-latest", "gemini-2.5-flash-lite"]
    .map(model => ({ name: model, call: (s, u) => callGemini(model, s, u) })),
  ...["openai/gpt-oss-120b", "qwen/qwen3.8-27b"]
    .map(model => ({ name: model, call: (s, u) => callGroq(model, s, u) })),
];
const MIN_CHARS = parseInt(process.env.MIN_CHARS || "1500"); // sections shorter than this get enhanced
const DELAY_MS = 7000;  // 7s between calls — free tier limit is 10 RPM
const COOLDOWN_MS = 15 * 60 * 1000;

const prisma = new PrismaClient();
const benchedUntil = {};

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function callGemini(model, systemInstr, userPrompt) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${process.env.GOOGLE_AI_KEY}`;
  const res = await fetch(url, {
    method: "POST",
    signal: AbortSignal.timeout(120000),
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
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw Object.assign(new Error(`HTTP ${res.status}: ${JSON.stringify(err).slice(0, 200)}`), { status: res.status });
  }
  const data = await res.json();
  const parts = data.candidates?.[0]?.content?.parts ?? [];
  const textPart = parts.find(p => !p.thought) || parts[0];
  return (textPart?.text ?? "").trim();
}

async function callGroq(model, systemInstr, userPrompt) {
  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    signal: AbortSignal.timeout(120000),
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${process.env.GROQ_API_KEY}` },
    body: JSON.stringify({
      model,
      messages: [{ role: "system", content: systemInstr }, { role: "user", content: userPrompt }],
      max_tokens: 6000,
      temperature: 0.4,
    }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw Object.assign(new Error(`HTTP ${res.status}: ${JSON.stringify(err).slice(0, 200)}`), { status: res.status });
  }
  const data = await res.json();
  return (data.choices?.[0]?.message?.content ?? "").trim();
}

// Try providers in order, skipping benched ones. When all are benched, wait for the first to recover.
async function callLLM(systemInstr, userPrompt) {
  for (;;) {
    const now = Date.now();
    for (const p of PROVIDERS) {
      if ((benchedUntil[p.name] || 0) > now) continue;
      try {
        return { text: await p.call(systemInstr, userPrompt), provider: p.name };
      } catch (err) {
        console.log(`    ${p.name} failed: ${err.message.slice(0, 100)}`);
        benchedUntil[p.name] = Date.now() + (err.status === 429 ? COOLDOWN_MS : 60 * 1000);
      }
    }
    const wake = Math.min(...PROVIDERS.map(p => benchedUntil[p.name]));
    console.log(`    all providers benched — waiting ${Math.round((wake - Date.now()) / 60000)} min`);
    await sleep(Math.max(wake - Date.now(), 1000));
  }
}

function buildPrompt(moduleTitle, moduleSlug, lessonTitle, sectionTitle, existingContent) {
  const lang = {
    python: "Python", javascript: "JavaScript", html: "HTML", css: "CSS",
    tailwind: "Tailwind CSS", react: "React", "nextjs-frontend": "Next.js Frontend",
    "nextjs-backend": "Next.js Backend", c: "C", cpp: "C++", csharp: "C#",
    java: "Java", cybersecurity: "Cybersecurity", sql: "SQL", php: "PHP",
  }[moduleSlug] || moduleTitle;

  const codeLang = {
    python: "python", javascript: "javascript", html: "html", css: "css",
    tailwind: "html", react: "jsx", "nextjs-frontend": "jsx",
    "nextjs-backend": "javascript", c: "c", cpp: "cpp",
    csharp: "csharp", java: "java", sql: "sql", php: "php",
    cybersecurity: "bash",
  }[moduleSlug] || "javascript";

  const systemInstr = `Ești un profesor expert în ${lang} care scrie lecții clare și detaliate pentru o platformă de învățare online. Scrii ÎNTOTDEAUNA în română. Răspunzi NUMAI cu conținutul secțiunii cerute — nici un cuvânt înainte sau după.`;

  const userPrompt = `Scrie conținutul pentru secțiunea "${sectionTitle}" din lecția "${lessonTitle}" (modulul ${lang}).

Conținut existent (rescrie și îmbunătățește la nivel expert):
---
${existingContent}
---

CERINȚE:
• MINIM 2500 caractere total (important!) — explicații lungi, pas cu pas, pentru un începător
• Include 2-3 blocuri de cod: \`\`\`${codeLang}\\n...\\n\`\`\`
• Cod real, corect, comentat unde e nevoie
• Folosește **bold** pentru concepte cheie
• Folosește • pentru liste
• Explicații clare cu analogii sau exemple din viața reală
• NU include titlul secțiunii
• NU folosi ## sau ### headings
• Numai conținutul secțiunii, nimic altceva`;

  return { systemInstr, userPrompt };
}

async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes("--dry");
  const allMode = args.includes("--all"); // process ALL sections, not just short ones
  const moduleFilter = args.find(a => a.startsWith("--module="))?.split("=")[1];
  const skipModules = args.filter(a => a.startsWith("--skip=")).map(a => a.split("=")[1]);
  const limitArg = args.find(a => a.startsWith("--limit="))?.split("=")[1];
  const limit = limitArg ? parseInt(limitArg) : Infinity;

  const threshold = allMode ? Infinity : MIN_CHARS;

  const allTheory = await prisma.theory.findMany({
    where: { content: { not: undefined } },
    include: { lesson: { include: { module: true } } },
    orderBy: [
      { lesson: { module: { order: "asc" } } },
      { lesson: { order: "asc" } },
      { order: "asc" },
    ],
  });

  const needsWork = allTheory.filter(t => {
    if (skipModules.includes(t.lesson.module.slug)) return false;
    if (moduleFilter && t.lesson.module.slug !== moduleFilter) return false;
    return t.content.length < threshold;
  });

  const label = allMode ? "all sections" : `sections < ${MIN_CHARS} chars`;
  console.log(`\nMode: ${allMode ? "--all (full quality pass)" : "weak-only"}`);
  console.log(`Found ${needsWork.length} ${label} out of ${allTheory.length} total`);
  if (skipModules.length) console.log(`Skipping: ${skipModules.join(", ")}`);

  // Group by module for reporting
  const byModule = {};
  for (const t of needsWork) {
    const name = t.lesson.module.title;
    byModule[name] = (byModule[name] || 0) + 1;
  }
  for (const [mod, cnt] of Object.entries(byModule)) {
    console.log(`  ${mod}: ${cnt} sections`);
  }

  const toProcess = needsWork.slice(0, limit);
  console.log(`\nProcessing ${toProcess.length} sections${dryRun ? " (DRY RUN)" : ""}...`);

  let done = 0, failed = 0;

  for (let i = 0; i < toProcess.length; i++) {
    const section = toProcess[i];
    const mod = section.lesson.module;
    const lesson = section.lesson;
    const prefix = `[${i + 1}/${toProcess.length}] ${mod.title} / ${lesson.title} / "${section.title}"`;

    if (dryRun) {
      console.log(`  WOULD enhance: ${prefix} (${section.content.length} chars)`);
      done++;
      continue;
    }

    try {
      const { systemInstr, userPrompt } = buildPrompt(mod.title, mod.slug, lesson.title, section.title, section.content);
      const { text: enhanced, provider } = await callLLM(systemInstr, userPrompt);

      if (!enhanced || enhanced.length < Math.max(1200, section.content.length) || !enhanced.includes("```")) {
        console.log(`  ⚠ SHORT response for: ${prefix} (got ${enhanced?.length ?? 0} chars)`);
        failed++;
      } else {
        await prisma.theory.update({
          where: { id: section.id },
          data: { content: enhanced },
        });
        console.log(`  ✓ ${prefix}: ${section.content.length} → ${enhanced.length} chars [${provider}]`);
        done++;
      }
    } catch (err) {
      console.error(`  ✗ FAILED: ${prefix}: ${err.message.slice(0, 120)}`);
      failed++;
    }

    await sleep(DELAY_MS);
  }

  console.log(`\nDone: ${done} enhanced, ${failed} failed`);
  await prisma.$disconnect();
}

main().catch(e => { console.error(e); process.exit(1); });
