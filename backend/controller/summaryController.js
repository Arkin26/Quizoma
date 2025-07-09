const axios = require("axios");
require("dotenv").config();

exports.getTopicOverview = async (req, res) => {
  const { topic } = req.body;

  if (!topic || topic.trim() === "") {
    return res.status(400).json({ error: "Topic is required." });
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
              "You are an educational assistant. Summarize any academic topic clearly in **only two parts**:\n\n1. Provide exactly 10 most important learning points about the topic in simple bullet points (no intro or conclusion).\n2. Then give 5 related or prerequisite topics (numbered).\n\nStrictly avoid any extra explanation or messages.",
          },
          {
            role: "user",
            content: `Give me a topic overview of "${topic}"`,
          },
        ],
        temperature: 0.7,
        max_tokens: 1000,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_SUMMARY_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:5173",
          "X-Title": "SummaryAI",
        },
      }
    );

    const content = response.data?.choices?.[0]?.message?.content?.trim();

    if (!content) {
      return res.status(500).json({ error: "AI did not return a valid response." });
    }

    const allPoints = [];
    const relatedTopics = [];

    const lines = content.split("\n").filter((line) => line.trim() !== "");

    let collectingRelated = false;
    for (let line of lines) {
      const clean = line.replace(/^\d+[\).\s-]*/, "").trim();

      if (
        line.toLowerCase().includes("related topics") ||
        line.toLowerCase().includes("prerequisite topics") ||
        line.toLowerCase().includes("prerequisites")
      ) {
        collectingRelated = true;
        continue;
      }

      if (collectingRelated) {
        if (relatedTopics.length < 5) relatedTopics.push(clean);
      } else {
        if (allPoints.length < 10) allPoints.push(clean);
      }
    }

    res.status(200).json({
      allPoints,
      relatedTopics,
    });
  } catch (err) {
    console.error("Summary AI Error:", err.response?.data || err.message);

    res.status(503).json({
      error: "AI model temporarily unavailable. Please try again shortly.",
    });
  }
};
