"use strict";
require("dotenv").config({ path: ".env" });
const { PrismaClient } = require("@prisma/client");

const API_KEY = process.env.GOOGLE_AI_KEY;
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;
const MIN_CHARS = 450; // sections shorter than this get enhanced
const DELAY_MS = 800;  // polite delay between API calls

const prisma = new PrismaClient();

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function callGemini(systemInstr, userPrompt) {
  const res = await fetch(GEMINI_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      system_instruction: { parts: [{ text: systemInstr }] },
      contents: [{ role: "user", parts: [{ text: userPrompt }] }],
      generationConfig: {
        maxOutputTokens: 1200,
        temperature: 0.4,
        thinkingConfig: { thinkingBudget: 0 },
      },
    }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(`HTTP ${res.status}: ${JSON.stringify(err).slice(0, 200)}`);
  }
  const data = await res.json();
  const parts = data.candidates?.[0]?.content?.parts ?? [];
  const textPart = parts.find(p => !p.thought) || parts[0];
  return (textPart?.text ?? "").trim();
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

Conținut existent (extinde și îmbunătățește considerabil):
---
${existingContent}
---

CERINȚE:
• Între 600-900 caractere total
• Include 1-2 blocuri de cod: \`\`\`${codeLang}\\n...\\n\`\`\`
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
  // Get all theory sections that are too short
  const allTheory = await prisma.theory.findMany({
    where: { content: { not: undefined } },
    include: { lesson: { include: { module: true } } },
    orderBy: [
      { lesson: { module: { order: "asc" } } },
      { lesson: { order: "asc" } },
      { order: "asc" },
    ],
  });

  const weak = allTheory.filter(t => t.content.length < MIN_CHARS);
  console.log(`Found ${weak.length} weak sections (< ${MIN_CHARS} chars) out of ${allTheory.length} total`);

  // Group by module for reporting
  const byModule = {};
  for (const t of weak) {
    const name = t.lesson.module.title;
    byModule[name] = (byModule[name] || 0) + 1;
  }
  for (const [mod, cnt] of Object.entries(byModule)) {
    console.log(`  ${mod}: ${cnt} weak sections`);
  }

  const args = process.argv.slice(2);
  const dryRun = args.includes("--dry");
  const moduleFilter = args.find(a => a.startsWith("--module="))?.split("=")[1];
  const limitArg = args.find(a => a.startsWith("--limit="))?.split("=")[1];
  const limit = limitArg ? parseInt(limitArg) : Infinity;

  const toProcess = weak.filter(t =>
    !moduleFilter || t.lesson.module.slug === moduleFilter
  ).slice(0, limit);

  console.log(`\nProcessing ${toProcess.length} sections${dryRun ? " (DRY RUN)" : ""}...`);
  if (moduleFilter) console.log(`Module filter: ${moduleFilter}`);

  let done = 0, failed = 0;

  for (const section of toProcess) {
    const mod = section.lesson.module;
    const lesson = section.lesson;
    const prefix = `[${done + 1}/${toProcess.length}] ${mod.title} / ${lesson.title} / "${section.title}"`;

    if (dryRun) {
      console.log(`  WOULD enhance: ${prefix} (${section.content.length} chars)`);
      done++;
      continue;
    }

    try {
      const { systemInstr, userPrompt } = buildPrompt(mod.title, mod.slug, lesson.title, section.title, section.content);
      const enhanced = await callGemini(systemInstr, userPrompt);

      if (!enhanced || enhanced.length < 300) {
        console.log(`  ⚠ SHORT response for: ${prefix} (got ${enhanced.length} chars)`);
        failed++;
        continue;
      }

      await prisma.theory.update({
        where: { id: section.id },
        data: { content: enhanced },
      });

      console.log(`  ✓ ${prefix}: ${section.content.length} → ${enhanced.length} chars`);
      done++;
    } catch (err) {
      console.error(`  ✗ FAILED: ${prefix}: ${err.message}`);
      failed++;
    }

    await sleep(DELAY_MS);
  }

  console.log(`\nDone: ${done} enhanced, ${failed} failed`);
  await prisma.$disconnect();
}

main().catch(e => { console.error(e); process.exit(1); });
