import { NextResponse } from "next/server";

export async function POST(request) {
  const body = await request.json();
  const { messages, taskQuestion, taskOptions, lessonTitle } = body;

  const apiKey = process.env.GOOGLE_AI_KEY;

  if (!apiKey) {
    return NextResponse.json({
      reply: "AI-ul nu este configurat. Adaugă GOOGLE_AI_KEY în Environment Variables.",
    });
  }

  const hasTask = taskQuestion && taskQuestion.length > 10;
  const optionsText =
    Array.isArray(taskOptions) && taskOptions.length > 0
      ? taskOptions.map((o, i) => `${String.fromCharCode(65 + i)}) ${o}`).join("\n")
      : null;

  const systemPrompt = `Ești un mentor de programare prietenos, direct și eficient pe o platformă educațională.

${hasTask ? `Contextul curent:
- Lecția: "${lessonTitle || "necunoscut"}"
- Întrebarea la care lucrează studentul:
"${taskQuestion}"
${optionsText ? `- Opțiunile disponibile:\n${optionsText}` : ""}` : `Lecția curentă: "${lessonTitle || "programare generală"}"`}

Cum răspunzi:
- EXPLICI conceptul din spatele întrebării fără să dai direct litera/opțiunea corectă
- Dai o analogie scurtă din viața reală dacă ajută
- Dacă studentul e complet blocat și cere insistent, poți da un hint progresiv
- Includezi un exemplu scurt de cod când e relevant (în backticks)
- Răspunsurile: scurte și clare, max 4-5 propoziții + eventual un snippet
- Ton: prietenos, ca un coleg mai experimentat, nu ca un profesor formal
- Răspunzi ÎNTOTDEAUNA în română`;

  // Convert messages to Gemini format (role: "user" | "model")
  const contents = messages.map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }],
  }));

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: systemPrompt }] },
          contents,
          generationConfig: { maxOutputTokens: 600, temperature: 0.7 },
        }),
      }
    );

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      console.error("Gemini error:", err);
      return NextResponse.json({ reply: "Eroare la AI. Încearcă din nou." });
    }

    const data = await response.json();
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text ?? "Fără răspuns.";
    return NextResponse.json({ reply });
  } catch {
    return NextResponse.json({ reply: "Eroare de rețea. Încearcă din nou." });
  }
}
