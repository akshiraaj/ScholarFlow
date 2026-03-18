export default function handler(req, res) {
  res.json({ 
    keyExists: !!process.env.ANTHROPIC_API_KEY,
    keyStart: process.env.ANTHROPIC_API_KEY?.slice(0, 15)
  });
}
