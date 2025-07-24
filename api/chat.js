// File: api/chat.js

export default async function handler(req, res) {
  const input = req.body.inputs;
  const HF_TOKEN = process.env.VITE_HF_TOKEN; // from Vercel env
  const HF_API_URL = "https://api-inference.huggingface.co/models/Etherealinkbytiisetso/Titibrainchat";

  try {
    const response = await fetch(HF_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${HF_TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ inputs: input })
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
