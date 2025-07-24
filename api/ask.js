export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST requests allowed" });
  }

  const prompt = req.body.prompt || req.body.input || "Hello AI";

  const hfToken = process.env.HUGGINGFACE_TOKEN;

  try {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/TinyLlama/TinyLlama-1.1B-Chat-v0.3",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${hfToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputs: prompt }),
      }
    );

    const result = await response.json();

    const reply =
      result?.[0]?.generated_text || result?.generated_text || "No reply.";

    return res.status(200).json({ reply });
  } catch (error) {
    return res.status(500).json({ error: "API error", detail: error.message });
  }
}
