import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { question, language, type, lessonTitle, hintIndex = 0 } = await request.json();
    if (!question) return NextResponse.json({ error: "Lipsește întrebarea." }, { status: 400 });

    const apiKey = process.env.GOOGLE_AI_KEY;
    if (!apiKey) {
      const fallbacks = [
        "Recitește secțiunea de teorie relevantă — răspunsul se găsește acolo.",
        "Încearcă să descompui problema în pași mai mici.",
        "Gândește-te la exemplele de cod din teorie.",
      ];
      return NextResponse.json({ hint: fallbacks[hintIndex % fallbacks.length] });
    }

    const isCode = type === "coding";
    const prompt = isCode
      ? `Ești un profesor de programare. Dă UN singur indiciu (max 2 propoziții) pentru această problemă de cod fără a dezvălui soluția. Nu scrie cod. Fii concis.
Limbaj: ${language || "javascript"}
Lecție: ${lessonTitle || ""}
Problema: ${question}
Indiciu ${hintIndex + 1}:`
      : `Ești un profesor. Dă UN singur indiciu (1-2 propoziții) pentru această întrebare fără a dezvălui răspunsul direct. Fii concis.
Lecție: ${lessonTitle || ""}
Întrebarea: ${question}
Indiciu ${hintIndex + 1}:`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ role: "user", parts: [{ text: prompt }] }],
          generationConfig: { maxOutputTokens: 150, temperature: 0.7, thinkingConfig: { thinkingBudget: 0 } },
        }),
      }
    );

    if (!response.ok) return NextResponse.json({ hint: "Indiciu indisponibil momentan." });

    const data = await response.json();
    const parts = data.candidates?.[0]?.content?.parts ?? [];
    const textPart = parts.find(p => !p.thought) || parts[0];
    const hint = (textPart?.text ?? "").trim()
      .replace(/^Indiciu \d+:\s*/i, "");

    return NextResponse.json({ hint: hint || "Încearcă să te gândești la conceptele din teorie." });
  } catch {
    return NextResponse.json({ hint: "Eroare la generarea indiciului." });
  }
}
