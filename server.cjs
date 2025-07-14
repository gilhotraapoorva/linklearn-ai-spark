const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());
// Allow all origins for local dev

app.post('/api/generate-daily-quest', async (req, res) => {
  try {
    const { date } = req.body;
    
    // Use the date as part of the prompt to ensure consistency
    const prompt = `
Generate a daily coding quest for a React developer for the date ${date}.
Use this date as a seed to ensure consistent generation.

Respond in JSON with the following fields:
- title: a catchy title for the quest
- description: a short description of the task
- problem: a code snippet (as a string) that the user should work on
- difficulty: Beginner, Intermediate, or Advanced
- estimatedTime: e.g. "15 min"
- xpReward: a number (e.g. 150)
- category: a short category (e.g. "React Optimization")

Example:
{
  "title": "Refactor React Component for Performance",
  "description": "Take this React component and optimize it by implementing React.memo, useMemo, and useCallback where appropriate. Focus on preventing unnecessary re-renders.",
  "problem": "const UserList = ...",
  "difficulty": "Intermediate",
  "estimatedTime": "15 min",
  "xpReward": 150,
  "category": "React Optimization"
}

Generate a quest that is deterministic based on the date ${date}. The same date should always generate the same quest.
`;

    const llamaResponse = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'llama3',
        prompt,
        stream: false,
        options: {
          seed: parseInt(date.replace(/-/g, '')), // Convert date to number for seed
          temperature: 0 // Use temperature 0 for deterministic output
        }
      })
    });

    const data = await llamaResponse.json();
    console.log('Ollama response:', data); // Log the raw response from Ollama
    let quest;
    // Helper to extract first JSON object from a string
    function extractFirstJson(str) {
      const firstBrace = str.indexOf('{');
      if (firstBrace === -1) return null;
      let depth = 0;
      let inString = false;
      for (let i = firstBrace; i < str.length; i++) {
        if (str[i] === '"' && str[i - 1] !== '\\') inString = !inString;
        if (!inString) {
          if (str[i] === '{') depth++;
          if (str[i] === '}') depth--;
          if (depth === 0) {
            try {
              return str.slice(firstBrace, i + 1);
            } catch {
              return null;
            }
          }
        }
      }
      return null;
    }
    try {
      const raw = data.response || data.choices?.[0]?.text || '{}';
      const jsonStr = extractFirstJson(raw) || '{}';
      quest = JSON.parse(jsonStr);
    } catch (e) {
      console.error('Failed to parse Llama response:', data); // Log the error and raw data
      return res.status(500).json({ error: 'Failed to parse Llama response', raw: data });
    }

    res.json(quest);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
}); 