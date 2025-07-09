const axios = require("axios");
require("dotenv").config(); // Load from default .env

exports.askTutor = async (req, res) => {
  const { question } = req.body;

  if (!question || question.trim() === "") {
    return res.status(400).json({ error: "Question is required." });
  }

  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "mistralai/mistral-7b-instruct:free",
        messages: [
          {
            role: "system",
            content:
              "You are a knowledgeable, student-friendly tutor. Answer the user's academic question briefly and precisely. Keep it under 3-4 lines. Avoid detailed explanations or extra messages.",
          },
          {
            role: "user",
            content: question,
          },
        ],
        temperature: 0.7,
        max_tokens: 300,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_TUTOR_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://quizoma-frontend.onrender.com",
          "X-Title": "TutorAI",
        },
      }
    );

    const answer = response.data?.choices?.[0]?.message?.content?.trim();

    if (!answer) {
      return res.status(500).json({ error: "Failed to get a response from the AI model." });
    }

    res.status(200).json({ answer });
  } catch (err) {
    console.error("AI Tutor Error:", err.response?.data || err.message);
    res.status(500).json({ error: "Something went wrong while generating the answer." });
  }
};
