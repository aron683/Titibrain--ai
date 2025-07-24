export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  const userInput = req.body.prompt || req.body.input || "Hello";

  const hfToken = process.env.HUGGINGFACE_TOKEN;

  const response = await fetch("https://api-inference.huggingface.co/models/TinyLlama/TinyLlama-1.1B-Chat-v0.3", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${hfToken}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ inputs: userInput })
  });

  if (!response.ok) {
    return res.status(500).json({ error: "Model error" });
  }

  const result = await response.json();
  const reply = result[0]?.generated_text || "No reply from AI.";

  res.status(200).json({ reply });
}
