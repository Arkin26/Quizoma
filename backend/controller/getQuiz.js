const Quiz = require("../model/quizResult");

const getSavedQuizzes = async (req, res) => {
  try {
    const { userEmail } = req.body;

    if (!userEmail) {
      return res.status(400).json({ message: "User email is required." });
    }

    const quizzes = await Quiz.find({ userEmail });

    if (!quizzes || quizzes.length === 0) {
      return res.status(200).json({ quizzes: [] });
    }

    // Format quizzes for frontend
    const formatted = quizzes.map((q) => ({
      id: q._id.toString(),
      topic: q.settings?.topic || "N/A",
      category: q.settings?.studyLevel || "N/A",
      score: q.score,
      percentage: q.percentage, // ✅ add this
      totalQuestions: q.settings?.numberOfQuestions || q.quiz.length,
      duration: Math.ceil(q.timeTaken / 60),
      completedAt: new Date(q.createdAt).toISOString().slice(0, 10),
    }));

    // Optional debug log
    console.log("Formatted quizzes:", formatted);

    res.status(200).json({ quizzes: formatted });
  } catch (err) {
    console.error("Error fetching saved quizzes:", err);
    res.status(500).json({ message: "Server error." });
  }
};

const getQuizById = async (req, res) => {
  try {
    const { id } = req.params;
    const quiz = await Quiz.findById(id);
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });
    res.status(200).json(quiz);
  } catch (err) {
    console.error("Error fetching quiz by ID:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getSavedQuizzes, getQuizById };
