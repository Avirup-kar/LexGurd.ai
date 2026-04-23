import OpenAI from "openai";

const AI = new OpenAI({
  apiKey: process.env.GROQ_API_KEY!,
  baseURL: "https://api.groq.com/openai/v1",
});

export const createEmail = async (contractData: any) => {
  try {
    const prompt = `
You are a legal assistant AI.

Generate a professional negotiation email based on the contract analysis.

STRICT RULES:
- Return ONLY valid JSON
- Do NOT include explanations or extra text
- Output must contain exactly: subject and body
- Keep tone professional, calm, and assertive
- Do NOT use placeholders like [Name]

CONTRACT DATA:
${JSON.stringify(contractData, null, 2)}

INSTRUCTIONS:
- Ignore any clause where riskLevel is "safe"
- Only focus on "danger" and "medium" risk clauses
- Prioritize "danger" clauses first

EMAIL BODY FORMAT:
- Start with a short professional opening
- For EACH risky clause, follow EXACT structure:

Clause:
"<originalText>"

Concern:
Explain the specific problem I might face.

Request:
State the safety change I want.

- End with a short professional closing

OUTPUT FORMAT:
{
  "subject": "string",
  "body": "string"
}
`;

    const response = await AI.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "user", content: prompt }
      ],
      temperature: 0.2,
      max_tokens: 8000,
    });

    const content = response.choices[0]?.message.content;

    // ✅ Extract JSON safely
    const jsonMatch = content?.match(/\{[\s\S]*\}/);
    const jsonString = jsonMatch ? jsonMatch[0] : content;

    const emailData = JSON.parse(jsonString!);

    return emailData;

  } catch (error: any) {
    console.log(error.status);
    console.log(error.message);
    console.log(error);

    if (error.status === 400) {
      throw new Error("Invalid request — make sure the contract text is readable");
    }

    if (error.status === 429) {
      throw new Error("Too many requests — please wait a moment and try again");
    }

    if (error.status === 403) {
      throw new Error("Invalid API key — check your GROQ_API_KEY in .env");
    }

    throw new Error(error.message || "Failed to generate email");
  }
};