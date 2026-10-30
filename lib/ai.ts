export async function generateWalletInsights() {
  const fallback =
    "Your wallet balance is healthy. The safest move is to maintain a 30% savings ratio, reduce discretionary spending, and increase your emergency fund before higher-risk investment moves.";

  if (!process.env.OPENAI_API_KEY) {
    return fallback;
  }

  try {
    const OpenAI = (await import("openai")).default;
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful finance assistant. Give concise but sophisticated financial advice in one paragraph.",
        },
        { role: "user", content: "Analyze this wallet: balance 24k, income 8.6k, spend 4.2k, savings rate 42%, crypto allocation 2.8 BTC. Give a short actionable summary." },
      ],
      temperature: 0.7,
    });

    return response.choices[0]?.message?.content?.trim() || fallback;
  } catch {
    return fallback;
  }
}
