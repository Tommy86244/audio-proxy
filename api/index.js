export default async function handler(req, res) {
  const { filename } = req.query;
  
  if (!filename) {
    return res.status(400).json({ error: 'Missing filename' });
  }
  
  try {
    const targetUrl = `https://coze-js-api.devtool.uk/downloads/${filename}`;
    const response = await fetch(targetUrl);
    
    if (!response.ok) {
      return res.status(response.status).json({ error: 'Failed to fetch audio' });
    }
    
    const audioBuffer = await response.arrayBuffer();
    
    res.setHeader('Content-Type', 'audio/mpeg');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).send(Buffer.from(audioBuffer));
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
