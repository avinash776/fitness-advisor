// Simple proxy server for development to avoid CORS issues
import cors from 'cors';
import express from 'express';

const app = express();
const PORT = 3001;

const API_KEY = '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';
const NVIDIA_API_ENDPOINT = 'https://integrate.api.nvidia.com/v1/chat/completions';

app.use(cors());
app.use(express.json());

app.post('/api/chat', async (req, res) => {
  try {
    console.log('Received request:', req.body);
    
    const response = await fetch(NVIDIA_API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
      },
      body: JSON.stringify(req.body),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('NVIDIA API Error:', response.status, errorText);
      return res.status(response.status).json({ error: errorText });
    }

    const data = await response.json();
    console.log('API Response:', JSON.stringify(data).substring(0, 200));
    res.json(data);
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running at http://localhost:${PORT}`);
  console.log('Use POST http://localhost:3001/api/chat to proxy requests to NVIDIA API');
});
