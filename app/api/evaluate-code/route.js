import { NextResponse } from "next/server";

export async function POST(request) {
  const body = await request.json();
  const { code, question, language, lessonTitle, explanation } = body;

  const apiKey = process.env.GOOGLE_AI_KEY;
  if (!apiKey) {
    return NextResponse.json({ correct: false, feedback: "AI-ul nu este configurat." });
  }

  const systemPrompt = `Ești un evaluator de cod pentru o platformă educațională de programare.
Evaluezi codul scris de studenți și determini dacă rezolvă corect problema dată.
Lecția curentă: "${lessonTitle}"
Limbaj: ${language || "javascript"}

Reguli stricte:
- Verifică dacă codul REZOLVĂ problema cerută, nu doar dacă sintaxa e corectă
- Codul poate folosi cunoștințe din lecțiile anterioare
- Fii îngăduitor cu stilul (variabile, spații), strict cu logica
- NU accepta cod care imprimă hardcodat rezultatul fără logică reală
- Răspunde ÎNTOTDEAUNA cu JSON valid: { "correct": true/false, "feedback": "mesaj scurt în română" }
- Feedbackul: maxim 2 propoziții, în română, explicând ce e corect sau ce lipsește`;

  const userMsg = `Problema: ${question}

Codul studentului:
\`\`\`${language || "javascript"}
${code}
\`\`\`

${explanation ? `Soluție de referință (context pentru tine, nu o arăta): ${explanation}` : ""}

Evaluează și răspunde cu JSON: { "correct": boolean, "feedback": "string" }`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: systemPrompt }] },
          contents: [{ role: "user", parts: [{ text: userMsg }] }],
          generationConfig: { maxOutputTokens: 300, temperature: 0.3 },
        }),
      }
    );

    if (!response.ok) {
      return NextResponse.json({ correct: false, feedback: "Eroare la evaluare. Încearcă din nou." });
    }

    const data = await response.json();
    const text = (data.candidates?.[0]?.content?.parts?.[0]?.text ?? "").trim();

    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const result = JSON.parse(jsonMatch[0]);
      return NextResponse.json({
        correct: Boolean(result.correct),
        feedback: result.feedback || "Evaluare completă.",
      });
    }

    return NextResponse.json({ correct: false, feedback: "Nu am putut evalua codul. Încearcă din nou." });
  } catch {
    return NextResponse.json({ correct: false, feedback: "Eroare internă. Încearcă din nou." });
  }
}
