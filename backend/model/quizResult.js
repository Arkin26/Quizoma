// backend/model/quizResult.js

const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema(
  {
    userEmail: { type: String, required: true },
    quiz: { type: Array, required: true },
    answers: { type: Array, required: true },
    score: { type: Number, required: true },
    percentage: { type: Number, required: true },
    timeTaken: { type: Number, required: true },
    settings: {
      topic: String,
      difficulty: String,
      numberOfQuestions: Number,
      studyLevel: String,
    },
  },
  { timestamps: true }
);

// ✅ Fix OverwriteModelError with this conditional
const QuizResult =
  mongoose.models.QuizResult || mongoose.model("QuizResult", quizSchema);

module.exports = QuizResult;
