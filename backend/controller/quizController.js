

const axios = require('axios');

function extractJSONArray(text) {
  const match = text.match(/\[.*\]/s);
  if (!match) return null;

  try {
    return JSON.parse(match[0]);
  } catch (err) {
    console.error("JSON parse error:", err);
    return null;
  }
}

async function getExplanation(question, correctAnswer) {
  const prompt = `Explain why the answer "${correctAnswer}" is correct for the question: "${question}" in simple terms for a student.`;

  try {
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: "mistralai/mistral-7b-instruct:free",
        messages: [
          { role: "system", content: "You are a helpful tutor explaining answers to students." },
          { role: "user", content: prompt }
        ],
        temperature: 0.7
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://quizoma-frontend.onrender.com",
          "X-Title": "Quizoma"
        }
      }
    );

    return response.data?.choices?.[0]?.message?.content?.trim();
  } catch (err) {
    console.error("Explanation generation failed for:", question, err.message);
    return "Explanation not available.";
  }
}

exports.generateQuiz = async (req, res) => {
  const { topic, classLevel, duration, difficulty, numberOfQuestions } = req.body;

  const prompt = `
Generate a ${difficulty} level quiz of ${numberOfQuestions} multiple-choice questions for Class ${classLevel} on "${topic}". 
Each question must have:
- A question
- 4 options: A, B, C, D
- The correct answer as "A", "B", "C", or "D"

Format:
[
  {
    "question": "What is ...?",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "answer": "B"
  }
]
Only return the array, no explanation.
`;

  try {
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: "mistralai/mistral-7b-instruct:free",
        messages: [
          { role: "system", content: "You are a helpful assistant for generating school quizzes." },
          { role: "user", content: prompt }
        ],
        temperature: 0.4
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:5173",
          "X-Title": "Quizoma"
        }
      }
    );

    const modelOutput = response.data?.choices?.[0]?.message?.content || "";
    const quiz = extractJSONArray(modelOutput);

    if (!quiz) {
      return res.status(500).json({ error: "Failed to parse generated quiz." });
    }

    // 👇 Add explanations for each question
    for (let q of quiz) {
      const correctOption = q.options?.["ABCD".indexOf(q.answer)];
      q.explanation = await getExplanation(q.question, correctOption);
    }

    res.status(200).json({ quiz });

  } catch (error) {
    console.error("Error generating quiz:", error.response?.status, error.response?.data);
    if (!res.headersSent) {
      res.status(500).json({ error: "Something went wrong while generating the quiz." });
    }
  }
};

