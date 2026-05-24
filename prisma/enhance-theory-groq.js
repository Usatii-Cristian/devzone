"use strict";
require("dotenv").config({ path: ".env" });
const { PrismaClient } = require("@prisma/client");

const API_KEY = process.env.GROQ_API_KEY;
const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const MODEL = "llama-3.3-70b-versatile";
const MIN_CHARS = 1500;
const DELAY_MS = 2500; // Groq free tier: ~30 RPM

const prisma = new PrismaClient();

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function callGroq(systemInstr, userPrompt) {
  const res = await fetch(GROQ_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        { role: "system", content: systemInstr },
        { role: "user", content: userPrompt },
      ],
      max_tokens: 2500,
      temperature: 0.4,
    }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(`HTTP ${res.status}: ${JSON.stringify(err).slice(0, 200)}`);
  }
  const data = await res.json();
  return (data.choices?.[0]?.message?.content ?? "").trim();
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
• MINIM 1500 caractere total (important!)
• Include 2-3 blocuri de cod: \`\`\`${codeLang}\n...\n\`\`\`
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
  const moduleFilter = args.find(a => a.startsWith("--module="))?.split("=")[1];
  const skipModules = args.filter(a => a.startsWith("--skip=")).map(a => a.split("=")[1]);
  const limitArg = args.find(a => a.startsWith("--limit="))?.split("=")[1];
  const limit = limitArg ? parseInt(limitArg) : Infinity;

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
    return t.content.length < MIN_CHARS;
  });

  console.log(`\nProvider: Groq (${MODEL})`);
  console.log(`Found ${needsWork.length} sections < ${MIN_CHARS} chars`);
  if (moduleFilter) console.log(`Module: ${moduleFilter}`);
  if (skipModules.length) console.log(`Skipping: ${skipModules.join(", ")}`);

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
      const enhanced = await callGroq(systemInstr, userPrompt);

      if (!enhanced || enhanced.length < 800) {
        console.log(`  ⚠ SHORT response for: ${prefix} (got ${enhanced?.length ?? 0} chars)`);
        failed++;
      } else {
        await prisma.theory.update({
          where: { id: section.id },
          data: { content: enhanced },
        });
        console.log(`  ✓ ${prefix}: ${section.content.length} → ${enhanced.length} chars`);
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
