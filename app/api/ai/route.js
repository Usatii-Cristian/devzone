import { NextResponse } from "next/server";
import { rateLimit, clientKey } from "@/lib/rateLimit";
import { generateText } from "@/lib/aiProviders";

export async function POST(request) {
  const limit = rateLimit(`ai:${clientKey(request)}`, 15);
  if (!limit.ok) {
    return NextResponse.json(
      { reply: "Prea multe întrebări într-un minut. Așteaptă puțin și încearcă din nou." },
      { status: 429, headers: { "Retry-After": String(Math.ceil((limit.resetAt - Date.now()) / 1000)) } }
    );
  }

  const body = await request.json();
  const { messages: rawMessages, taskQuestion, taskOptions, lessonTitle } = body;
  if (!Array.isArray(rawMessages) || rawMessages.length === 0) {
    return NextResponse.json({ reply: "Mesaje invalide." }, { status: 400 });
  }
  // Keep only last 12 messages to limit token usage
  const messages = rawMessages.slice(-12);

  if (!process.env.GOOGLE_AI_KEY && !process.env.GROQ_API_KEY) {
    return NextResponse.json({
      reply: "AI-ul nu este configurat. Adaugă GOOGLE_AI_KEY (sau GROQ_API_KEY) în Environment Variables.",
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
- Când dai exemple de cod, pune-le între triple backticks cu limbajul: \`\`\`javascript ... \`\`\`
- Răspunsurile: scurte și clare, max 4-5 propoziții + eventual un snippet
- Ton: prietenos, ca un coleg mai experimentat, nu ca un profesor formal
- Răspunzi ÎNTOTDEAUNA în română
- IMPORTANT: NU folosi formatare Markdown în text normal! Fara **bold**, fara *italic*, fara # headings, fara - liste cu cratime. Scrie text simplu, natural, ca un mesaj normal. Codul merge DOAR în blocuri de cod cu backticks triple.`;

  // Gemini format (role: "user" | "model") and OpenAI/Groq format.
  const contents = messages.map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }],
  }));
  const groqMessages = messages.map((m) => ({
    role: m.role === "assistant" ? "assistant" : "user",
    content: m.content,
  }));

  const reply = await generateText({
    system: systemPrompt,
    contents,
    messages: groqMessages,
    maxTokens: 600,
    temperature: 0.7,
  });

  return NextResponse.json({
    reply: reply || "AI-ul e indisponibil momentan (răspuns lent sau limită atinsă). Încearcă din nou în câteva momente.",
  });
}
