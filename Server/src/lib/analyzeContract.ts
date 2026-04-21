import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

interface Clause {
  id: number;
  title: string;
  originalText: string;
  riskLevel: "safe" | "medium" | "danger";
  plainEnglish: string;
  consequence: string;
  solution: string | null;
}

interface ContractAnalysis {
  contractTitle: string;
  overallRisk: "low" | "medium" | "high";
  overallSummary: string;
  clauses: Clause[];
  missingClauses: string[] | null;
}

const parseGeminiResponse = (rawText: string): ContractAnalysis => {
  const cleaned = rawText
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();
  return JSON.parse(cleaned);
};

export const analyzeContractImage = async (
  base64ImageData: string,
  mimeType: string = "image/jpeg"
): Promise<ContractAnalysis> => {

try {
  const prompt = `
You are a legal contract analyzer. Analyze the contract text below.
Return ONLY a valid JSON object. No explanation, no markdown, no extra text.
Just raw JSON in this exact structure:

{
  "contractTitle": "string",
  "overallRisk": "low | medium | high",
  "overallSummary": "string",
  "clauses": [
    {
      "id": 1,
      "title": "string",
      "originalText": "string",
      "riskLevel": "safe | medium | danger",
      "plainEnglish": "string",
      "consequence": "string",
      "solution": "string or null"
    }
  ],
  "missingClauses": ["string", "string"] | null
}

Rules:
- riskLevel must be exactly: "safe", "medium", or "danger"
- solution must be null if riskLevel is "safe"
- originalText must be the exact clause text from the contract
- plainEnglish must be in simple language a non-lawyer understands and in easy english word
- if no missingClauses just add null
- Extract all text from the image first, then analyze it
`;

   const result = await ai.models.generateContent({
    model: "gemini-2.5-flash-preview-04-17",
    contents: [
      {
        inlineData: {
          mimeType: mimeType,
          data: base64ImageData,
        }
      },
      { text: prompt }
    ]
  });

  return parseGeminiResponse(result.text!);

  } catch (error: any) {

    // Gemini API errors
    if (error.status === 400) {
      throw new Error("Invalid image — make sure the file is a clear readable contract");
    }

    if (error.status === 429) {
      throw new Error("Too many requests — please wait a moment and try again");
    }

    if (error.status === 403) {
      throw new Error("Invalid API key — check your GEMINI_API_KEY in .env");
    }

    // JSON parse error — Gemini returned text instead of JSON
    if (error instanceof SyntaxError) {
      throw new Error("Gemini could not analyze this document — try a clearer image");
    }

    // anything else
    throw new Error(error.message || "Failed to analyze contract");
  }
};