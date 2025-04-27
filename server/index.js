require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get('/api/emojis', async (req, res) => {
  try {
    const response = await axios.get('https://emojihub.yurace.pro/api/all');
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при получении эмодзи' });
  }
});

app.post('/api/describe', async (req, res) => {
  const { emoji } = req.body;

  try {
    const openaiResponse = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are an English-speaking assistant. You must always respond in English, describing the mood or atmosphere conveyed by an emoji in a short and friendly way.',
          },
          {
            role: 'user',
            content: `Describe the mood or feeling conveyed by the emoji "${emoji}".`,
          },
        ]               
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    const description = openaiResponse.data.choices[0].message.content.trim();
    res.json({ description });
  } catch (error) {
    console.error('Error accessing OpenAI:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Error generating the description' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
