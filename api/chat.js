export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST requests allowed' });
  }

  const { inputs } = req.body;
  const HF_TOKEN = process.env.VITE_HF_TOKEN;

  if (!HF_TOKEN) {
    return res.status(500).json({ error: 'Missing Hugging Face token' });
  }

  const HF_URL = "https://api-inference.huggingface.co/models/Etherealinkbytiisetso/Titibrainchat";

  try {
    const hfResponse = await fetch(HF_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${HF_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ inputs })
    });

    const result = await hfResponse.json();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
      }
