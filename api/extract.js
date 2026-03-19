const pdfParse = require('pdf-parse');

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') { res.status(200).end(); return; }

  try {
    const { base64 } = req.body;
    if (!base64) {
      return res.status(400).json({ error: 'No file data received' });
    }
    const buffer = Buffer.from(base64, 'base64');
    const data = await pdfParse(buffer);
    res.status(200).json({ text: data.text });
  } catch (err) {
    console.error('Extract error:', err.message);
    res.status(500).json({ error: err.message });
  }
};