export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
    if (req.method === 'OPTIONS') { res.status(200).end(); return; }
  
    const apiKey = process.env.ANTHROPIC_API_KEY;
  
    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01"
        },
        body: JSON.stringify(req.body)
      });
      const data = await response.json();
      console.log('Anthropic response:', JSON.stringify(data));
      res.status(200).json(data);
    } catch (err) {
      console.log('Fetch error:', err.message);
      res.status(500).json({ error: err.message });
    }
  }