import OpenAI from "openai";

const AI = new OpenAI({
  apiKey: process.env.GROQ_API_KEY!,
  baseURL: "https://api.groq.com/openai/v1",
});

export async function searchExperts(contractData: any) {
  try {

    const dangerClauses = contractData.clauses
      .filter((c: any) => c.riskLevel === "danger")
      .map((c: any) => c.title)
      .slice(0, 2)
      .join(" ");

    const query = `best lawyer for ${contractData.contractTitle} ${dangerClauses} legal help contact details`;

    const googleRes = await fetch(
      `https://www.googleapis.com/customsearch/v1?key=${process.env.GOOGLE_API_KEY}&cx=${process.env.GOOGLE_CX_ID}&q=${encodeURIComponent(query)}&num=5`
    );
    const googleData = await googleRes.json();

    if (!googleData.items || googleData.items.length === 0) return [];

    const rawItems = googleData.items.slice(0, 5);

     const prompt = `Extract contact details from these search results.
STRICT RULES:
- ONLY use data that actually exists in the snippet
- If phone not found → null
- If email not found → null
- NEVER make up contact details
- website is always the URL provided

Return ONLY a JSON array:
[
  {
    "name": "lawyer or firm name",
    "website": "full url",
    "phone": "phone number or null",
    "email": "email or null",
    "description": "one line about them"
  }
]

Search Results:
${rawItems.map((item: any, i: number) => `
  ${i + 1}. Title: ${item.title}
  URL: ${item.link}
  Snippet: ${item.snippet}
`).join("\n")}

Return ONLY valid JSON, no extra text.`;

    const aiRes = await AI.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.2,
       max_tokens: 8000,
    });

    // ✅ Correct - OpenAI/Anthropic SDK style
    const text = aiRes?.choices[0]?.message.content?.trim() ?? "";

    const clean = text.replace(/```json|```/g, "").trim();

    return JSON.parse(clean);

  } catch (err) {
    console.error("searchExperts error:", err);
    return [];
  }
}