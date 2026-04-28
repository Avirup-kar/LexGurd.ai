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

    const query = `${contractData.contractTitle} lawyer ${dangerClauses} India contact`;

    const googleRes = await fetch(
      `https://www.googleapis.com/customsearch/v1?key=${process.env.GOOGLE_API_KEY}&cx=${process.env.GOOGLE_CX_ID}&q=${encodeURIComponent(query)}&num=5`
    );
    const googleData = await googleRes.json();

    if (!googleData.items || googleData.items.length === 0) return [];

    const rawItems = googleData.items.slice(0, 5);

    const prompt = `
You are a data extraction API.
Extract contact details from the given search results.

STRICT RULES:
- Use ONLY the provided JSON data
- DO NOT guess or generate anything
- phone/email must come ONLY from "snippet"
- If phone/email not found → null
- name → from "title"
- website → from "link"
- description → short summary from snippet
- id must be sequential starting from 1

OUTPUT RULES:
- Return ONLY valid JSON
- NO explanation, NO text, NO markdown
- MUST be a JSON array
- Each object MUST follow this exact structure:
[
  {
    "id": 1,
    "name": "",
    "website": "",
    "phone": null,
    "email": null,
    "description": ""
  }
]
IMPORTANT:
- phone and email MUST be either string OR null (NOT "")
Search Results:
${JSON.stringify(rawItems, null, 2)}
`;

    const aiRes = await AI.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.2,
      max_tokens: 1000,
    });

    const text = aiRes?.choices[0]?.message.content?.trim() ?? "";
const clean = text.replace(/```json|```/g, "").trim();

// ✅ SAFE PARSE
let parsed = [];
try {
  parsed = JSON.parse(clean);
} catch (e) {
  console.error("❌ JSON parse failed:", e);
  // 🔥 Fallback - use raw Google data
  return rawItems.map((item: any) => ({
    name: item.title,
    website: item.link,
    phone: null,
    email: null,
    description: item.snippet,
  }));
}

return parsed;

  } catch (err) {
    console.error("searchExperts error:", err);
    return [];
  }
}