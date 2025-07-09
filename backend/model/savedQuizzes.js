const mongoose = require("mongoose");

const quizQuestionSchema = new mongoose.Schema({
  question: String,
  options: [String],
  answer: String,
  yourAnswer: String,
  isCorrect: Boolean,
  explanation: String,
});

const savedQuizSchema = new mongoose.Schema({
  userEmail: String,
  quiz: [quizQuestionSchema],
  score: Number,
  percentage: Number,
  timeTaken: Number,
  settings: {
    topic: String,
    difficulty: String,
    numberOfQuestions: Number,
    studyLevel: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("QuizResult", savedQuizSchema);
