// const QuizResult = require("../model/quizResult");

// exports.saveQuizResult = async (req, res) => {
//   try {
//     const {
//       userEmail,
//       quiz, // array of question objects
//       answers, // user's selected answers (["A", "C", ...])
//       timeTaken,
//       settings,
//     } = req.body;

//     const structuredAnswers = quiz.map((q, i) => {
//       const correctOptionIndex = q.answer?.charCodeAt(0) - 65;
//       const userOptionLetter = answers[i];
//       const userOptionIndex =
//         userOptionLetter?.charCodeAt(0) - 65;

//       return {
//         question: q.question,
//         options: q.options,
//         correctAnswer:
//           correctOptionIndex >= 0 && q.options[correctOptionIndex]
//             ? q.options[correctOptionIndex]
//             : "N/A",
//         userAnswer:
//           userOptionIndex >= 0 && q.options[userOptionIndex]
//             ? q.options[userOptionIndex]
//             : "Not Answered",
//         explanation: q.explanation || "No explanation provided.",
//       };
//     });

//     // 🐛 Log the question + answer structure
//     console.log("Structured Answers:");
//     structuredAnswers.forEach((item, index) => {
//       console.log(`Q${index + 1}: ${item.question}`);
//       console.log(`  Options: ${item.options.join(" | ")}`);
//       console.log(`  Correct Answer: ${item.correctAnswer}`);
//       console.log(`  User Answer: ${item.userAnswer}`);
//     });

//     let score = structuredAnswers.reduce(
//       (acc, q) => (q.userAnswer === q.correctAnswer ? acc + 1 : acc),
//       0
//     );

//     const newResult = new QuizResult({
//       userEmail,
//       topic: settings.topic,
//       classLevel: settings.classLevel,
//       difficulty: settings.difficulty,
//       numberOfQuestions: settings.numberOfQuestions,
//       duration: settings.duration,
//       score,
//       timeTaken,
//       answers: structuredAnswers,
//     });

//     await newResult.save();
//     res.status(200).json({ message: "Quiz saved successfully." });
//   } catch (err) {
//     console.error("Error saving quiz:", err);
//     res.status(500).json({ error: "Failed to save quiz result." });
//   }
// };
const QuizResult = require("../model/savedQuizzes");

exports.saveQuizResult = async (req, res) => {
  try {
    const {
      userEmail,
      quiz,
      score,
      percentage,
      timeTaken,
      settings,
    } = req.body;

    if (!quiz || typeof score !== "number" || typeof percentage !== "number") {
      return res.status(400).json({ error: "Missing required quiz data." });
    }

    const newResult = new QuizResult({
      userEmail,
      quiz, // this includes question, options, answer, yourAnswer, isCorrect, explanation
      score,
      percentage,
      timeTaken,
      settings: {
        topic: settings.topic,
        difficulty: settings.difficulty,
        numberOfQuestions: settings.numberOfQuestions,
        studyLevel: settings.classLevel || settings.studyLevel,
      },
      createdAt: new Date(),
    });

    await newResult.save();
    res.status(200).json({ message: "Quiz saved successfully." });
  } catch (err) {
    console.error("Error saving quiz:", err);
    res.status(500).json({ error: "Failed to save quiz result." });
  }
};


