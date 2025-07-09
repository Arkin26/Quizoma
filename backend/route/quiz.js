const express = require("express");
const router = express.Router();

const { generateQuiz } = require("../controller/quizController");
const { saveQuizResult } = require("../controller/saveQuiz");
const { getSavedQuizzes, getQuizById } = require("../controller/getQuiz");
const { askTutor } = require("../controller/tutorController");
const { getTopicOverview } = require("../controller/summaryController"); 

router.post("/generate", generateQuiz);
router.post("/post", saveQuizResult);
router.post("/get", getSavedQuizzes);
router.get("/:id", getQuizById);

router.post("/tutor/ask", askTutor);
router.post("/topic-overview", getTopicOverview); 

module.exports = router;
