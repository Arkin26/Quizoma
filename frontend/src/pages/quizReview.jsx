import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, BookOpen } from "lucide-react";

export default function QuizReview() {
  const { quizId } = useParams();
  const [quizData, setQuizData] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!quizId) return;

    const fetchQuiz = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/quiz/${quizId}`);
        const data = await res.json();
        setQuizData(data);
      } catch (err) {
        console.error("Failed to fetch quiz data:", err);
      }
    };

    fetchQuiz();
  }, [quizId]);

  if (!quizData) return <div className="p-10 text-center">Loading quiz...</div>;

  const {
    topic,
    difficulty,
    duration,
    numberOfQuestions,
    score,
    timeTaken,
    answers,
    createdAt,
  } = quizData;

  const currentQuestion = answers[currentIndex];
  const percentage = Math.round((score / numberOfQuestions) * 100);

  return (
    <div className="pt-[120px] min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-2xl p-8">
        <h1 className="text-2xl font-bold text-[#6A0DFF] mb-2">
          Quiz Review: {topic}
        </h1>
        <p className="text-sm text-gray-600 mb-6">
          Difficulty: {difficulty} | Duration: {duration} min | Score: {score}/
          {numberOfQuestions} | Taken on: {new Date(createdAt).toLocaleString()}
        </p>

        <div className="mb-4 flex justify-between items-center">
          <div className="text-sm text-gray-700 font-medium">
            Question {currentIndex + 1} of {numberOfQuestions}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
              disabled={currentIndex === 0}
              className="p-2 border rounded-lg hover:bg-gray-100 disabled:opacity-50"
            >
              <ArrowLeft size={16} />
            </button>
            <button
              onClick={() =>
                setCurrentIndex((prev) =>
                  Math.min(numberOfQuestions - 1, prev + 1)
                )
              }
              disabled={currentIndex === numberOfQuestions - 1}
              className="p-2 border rounded-lg hover:bg-gray-100 disabled:opacity-50"
            >
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            {currentQuestion.question}
          </h2>
          <ul className="space-y-3">
            {currentQuestion.options.map((option, idx) => {
              const isCorrect = option === currentQuestion.correctAnswer;
              const isUserAnswer = option === currentQuestion.userAnswer;

              return (
                <li
                  key={idx}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                    isCorrect
                      ? "bg-green-50 border-green-300 text-green-800"
                      : isUserAnswer
                      ? "bg-red-50 border-red-300 text-red-800"
                      : "bg-gray-50 border-gray-200 text-gray-800"
                  }`}
                >
                  <span className="font-medium">
                    {String.fromCharCode(65 + idx)}. {option}
                  </span>

                  {isCorrect && (
                    <span className="ml-2 text-xs font-semibold bg-green-100 text-green-700 px-2 py-1 rounded-full">
                      Correct
                    </span>
                  )}

                  {isUserAnswer && (
                    <span className="ml-2 text-xs font-semibold bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                      Your Answer
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        {currentQuestion.explanation && (
          <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl">
            <div className="flex items-start gap-2">
              <BookOpen className="text-blue-600 w-5 h-5 mt-1" />
              <div>
                <h3 className="text-sm font-bold text-blue-700 mb-1">
                  Explanation
                </h3>
                <p className="text-blue-800 text-sm leading-relaxed">
                  {currentQuestion.explanation}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
