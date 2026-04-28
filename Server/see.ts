// googleSearch.js

const GOOGLE_API_KEY = "YOUR_API_KEY_HERE";
const GOOGLE_CX = "YOUR_CX_ID_HERE";

// 🔍 Main function - call this when overallRisk === "danger"
export const handleDangerRisk = async (riskType, riskDetails) => {
  try {
    console.log("⚠️ Danger detected! Searching for experts...");

    // Step 1: Use Claude AI to build a smart search query
    const smartQuery = await buildSmartQuery(riskType, riskDetails);

    // Step 2: Search Google with that query
    const experts = await searchGoogle(smartQuery);

    // Step 3: Use Claude AI to summarize and rank results
    const rankedExperts = await rankAndSummarizeResults(experts, riskType);

    return {
      consequences: getConsequences(riskType),
      suggestions: getSuggestions(riskType),
      experts: rankedExperts,
    };
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};


// 🤖 Step 1: Claude AI builds a smart Google search query
const buildSmartQuery = async (riskType, riskDetails) => {
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": "YOUR_CLAUDE_API_KEY",
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 100,
      messages: [
        {
          role: "user",
          content: `Generate a Google search query to find professional experts or services 
          that can help with this risk: "${riskType}". 
          Risk details: "${riskDetails}".
          Return ONLY the search query, nothing else. Keep it short and effective.`,
        },
      ],
    }),
  });

  const data = await response.json();
  const query = data.content[0].text.trim();
  console.log("🔍 AI Generated Query:", query);
  return query;
};


// 🌐 Step 2: Search Google
const searchGoogle = async (query) => {
  const url = `https://www.googleapis.com/customsearch/v1?key=${GOOGLE_API_KEY}&cx=${GOOGLE_CX}&q=${encodeURIComponent(query)}&num=5`;

  const response = await fetch(url);
  const data = await response.json();

  if (!data.items) return [];

  return data.items.map((item) => ({
    name: item.title,
    link: item.link,
    description: item.snippet,
    displayLink: item.displayLink,
  }));
};


// 🤖 Step 3: Claude AI ranks and summarizes the results
const rankAndSummarizeResults = async (experts, riskType) => {
  if (experts.length === 0) return [];

  const expertsText = experts
    .map(
      (e, i) =>
        `${i + 1}. Name: ${e.name}\n   Link: ${e.link}\n   Description: ${e.description}`
    )
    .join("\n\n");

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": "YOUR_CLAUDE_API_KEY",
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 500,
      messages: [
        {
          role: "user",
          content: `Here are Google search results for "${riskType}" risk experts.
          Rank the top 3 most relevant ones and return ONLY a JSON array like this:
          [
            {
              "name": "...",
              "link": "...",
              "description": "one line about why this is helpful",
              "relevanceScore": 9
            }
          ]
          
          Results to rank:
          ${expertsText}
          
          Return ONLY valid JSON, no extra text.`,
        },
      ],
    }),
  });

  const data = await response.json();
  const text = data.content[0].text.trim();

  try {
    return JSON.parse(text);
  } catch {
    return experts.slice(0, 3); // fallback to raw results
  }
};


// ⚠️ Consequences based on risk type
const getConsequences = (riskType) => {
  const consequences = {
    cybersecurity: [
      "Your data may be stolen or exposed",
      "Financial loss due to fraud",
      "Account takeover by hackers",
    ],
    health: [
      "Condition may worsen without treatment",
      "Risk of hospitalization",
      "Long-term health complications",
    ],
    finance: [
      "Significant financial loss",
      "Credit score damage",
      "Potential bankruptcy risk",
    ],
    default: [
      "Serious consequences if ignored",
      "Immediate action required",
    ],
  };
  return consequences[riskType.toLowerCase()] || consequences.default;
};


// ✅ Suggestions based on risk type
const getSuggestions = (riskType) => {
  const suggestions = {
    cybersecurity: [
      "Change all passwords immediately",
      "Enable two-factor authentication",
      "Run a full antivirus scan",
      "Contact a cybersecurity expert",
    ],
    health: [
      "Consult a doctor immediately",
      "Avoid self-medication",
      "Get proper medical tests done",
    ],
    finance: [
      "Consult a financial advisor",
      "Freeze your credit if needed",
      "Review all recent transactions",
    ],
    default: [
      "Take immediate action",
      "Consult a professional",
      "Do not ignore this risk",
    ],
  };
  return suggestions[riskType.toLowerCase()] || suggestions.default;
};