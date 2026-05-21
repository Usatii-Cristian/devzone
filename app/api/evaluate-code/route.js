import { NextResponse } from "next/server";
import { rateLimit, clientKey } from "@/lib/rateLimit";

export async function POST(request) {
  const limit = rateLimit(`eval:${clientKey(request)}`, 20);
  if (!limit.ok) {
    return NextResponse.json(
      { correct: false, feedback: "Prea multe evaluări într-un minut. Așteaptă puțin." },
      { status: 429 }
    );
  }
  const body = await request.json();
  const { code, output, question, language, lessonTitle, explanation } = body;

  const apiKey = process.env.GOOGLE_AI_KEY;
  if (!apiKey) {
    return NextResponse.json({ correct: false, feedback: "AI-ul nu este configurat." });
  }

  const systemPrompt = `Ești un profesor de programare care evaluează codul scris de studenți.
Evaluezi pe 3 criterii, fiecare din 10 puncte:
1. Funcționalitate (0-10): Codul rezolvă corect problema? Produce outputul corect?
2. Calitate cod (0-10): Structură bună, fără cod redundant, bune practici?
3. Claritate (0-10): Variabile cu nume clar, cod ușor de citit, logic de urmărit?

Lecția: "${lessonTitle || "programare"}"
Limbaj: ${language || "javascript"}

Reguli:
- Fii obiectiv și constructiv
- NU accepta cod care hardcodează rezultatul fără logică (ex: console.log(15) pentru "calculează suma")
- Oferă întotdeauna bestSolution — codul ideal pentru problema dată
- Răspunde STRICT cu JSON valid (fără text în afara JSON-ului):
{
  "correct": boolean,
  "scores": { "functionality": 0-10, "quality": 0-10, "clarity": 0-10 },
  "feedback": "2-3 propoziții în română despre ce e bine și ce se poate îmbunătăți",
  "issues": ["issue scurt 1", "issue scurt 2"],
  "bestSolution": "codul ideal complet"
}`;

  const userMsg = `Problema: ${question}

Codul studentului:
\`\`\`${language || "javascript"}
${code}
\`\`\`

${output ? `Output produs de cod: ${output}` : ""}
${explanation ? `Referință (pentru tine, nu o menționezi): ${explanation}` : ""}

Evaluează și returnează JSON-ul complet.`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: systemPrompt }] },
          contents: [{ role: "user", parts: [{ text: userMsg }] }],
          generationConfig: { maxOutputTokens: 800, temperature: 0.3, thinkingConfig: { thinkingBudget: 0 } },
        }),
      }
    );

    if (!response.ok) {
      return NextResponse.json({ correct: false, feedback: "Eroare la evaluare. Încearcă din nou." });
    }

    const data = await response.json();
    const parts = data.candidates?.[0]?.content?.parts ?? [];
    const textPart = parts.find(p => !p.thought) || parts[0];
    let text = (textPart?.text ?? "").trim();
    text = text.replace(/^```json\s*/i, "").replace(/^```\s*/i, "").replace(/\s*```$/i, "").trim();

    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const result = JSON.parse(jsonMatch[0]);
      const scores = result.scores || { functionality: 7, quality: 7, clarity: 7 };
      const total = (scores.functionality || 0) + (scores.quality || 0) + (scores.clarity || 0);
      return NextResponse.json({
        correct: Boolean(result.correct),
        scores,
        total,
        feedback: result.feedback || "Evaluare completă.",
        issues: Array.isArray(result.issues) ? result.issues : [],
        bestSolution: result.bestSolution || "",
      });
    }

    return NextResponse.json({ correct: false, feedback: "Nu am putut evalua codul. Încearcă din nou." });
  } catch {
    return NextResponse.json({ correct: false, feedback: "Eroare internă. Încearcă din nou." });
  }
}
