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
  try {
    const cleaned = rawText
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(cleaned);
  } catch (error) {
    throw new Error("Gemini returned invalid JSON — try uploading a clearer image");
  }
};

export const analyzeContractImage = async (
  base64ImageData: string,
  mimeType: string = "image/jpeg"
): Promise<ContractAnalysis> => {

try {
  const prompt = `
You are a legal contract analyzer. Analyze the contract image provided.
Return ONLY a valid JSON object. No explanation, no markdown, no extra text, no comments.
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
      "plainEnglish": "string or null",
      "consequence": "string or null",
      "solution": "string or null"
    }
  ],
  "missingClauses": ["string"] | null
}

Rules:
- id must be sequential starting from 1 — first clause is 1, second is 2, third is 3 and so on
- riskLevel must be exactly: "safe", "medium", or "danger" — no other values
- if riskLevel is "safe" then plainEnglish, consequence and solution must all be null
- if riskLevel is "medium" or "danger" then plainEnglish and consequence must have real text
- solution must be null if riskLevel is "safe"
- originalText must be the exact clause text copied from the contract
- plainEnglish must be in very simple language a non-lawyer can understand
- missingClauses must be null if there are no missing clauses
- Extract all text from the image first before analyzing
- Return absolutely nothing except the JSON object
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