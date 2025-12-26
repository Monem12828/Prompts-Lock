const GEMINI_KEY = import.meta.env.VITE_GEMINI_API_KEY as string;

function assertKey() {
  if (!GEMINI_KEY) {
    throw new Error("Missing VITE_GEMINI_API_KEY");
  }
}

export async function callGemini(systemInstruction: string, userText: string) {
  assertKey();

  const url =
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" +
    GEMINI_KEY;

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `SYSTEM:\n${systemInstruction}\n\nUSER:\n${userText}`,
            },
          ],
        },
      ],
      generationConfig: {
        temperature: 0.5,
        maxOutputTokens: 2048,
      },
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    return `GEMINI_ERROR: ${data?.error?.message || `Status ${res.status}`}`;
  }

  return data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
}