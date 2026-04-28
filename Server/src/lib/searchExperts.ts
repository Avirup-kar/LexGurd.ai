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

    const aiRes = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY!,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1000,
        messages: [{
          role: "user",
          content: `Extract contact details from these search results.
STRICT RULES:
- ONLY use data that actually exists in the snippet
- If phone not found → null
- If email not found → null
- NEVER make up contact details
- website is always the URL provided

Return ONLY a JSON array:
[{ "name": "...", "website": "...", "phone": "..or null", "email": "..or null", "description": "..." }]

Search Results:
${rawItems.map((item: any, i: number) => `
  ${i + 1}. Title: ${item.title}
  URL: ${item.link}
  Snippet: ${item.snippet}
`).join("\n")}

Return ONLY valid JSON, no extra text.`,
        }],
      }),
    });

    const aiData = await aiRes.json();
    const text = aiData.content[0].text.trim();
    const clean = text.replace(/```json|```/g, "").trim();

    return JSON.parse(clean);

  } catch (err) {
    console.error("searchExperts error:", err);
    return [];
  }
}