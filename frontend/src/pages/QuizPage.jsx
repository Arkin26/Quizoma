

import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function QuizPage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { quiz, settings } = state || {};
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showConfirm, setShowConfirm] = useState(false);
  const [timer, setTimer] = useState(
    settings ? parseInt(settings.duration) * 60 : 120
  );

  // Function to capitalize first letter of each word
  const capitalizeFirstLetter = (str) => {
    if (!str) return str;
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  if (!quiz || quiz.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#6A0DFF] via-[#8B5CF6] to-[#A855F7] flex items-center justify-center relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute top-3/4 right-1/4 w-48 h-48 bg-white/5 rounded-full blur-2xl animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute top-1/2 left-1/2 w-32 h-32 bg-white/5 rounded-full blur-xl animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>
        <div className="text-center text-xl font-semibold text-white z-10">
          No quiz data available.
        </div>
      </div>
    );
  }

  const currentQuestion = quiz[currentIndex];
  const selectedOption = answers[currentIndex] || "";

  const handleOptionSelect = (option) => {
    setAnswers((prev) => ({ ...prev, [currentIndex]: option }));
  };

  const handleNext = () => {
    if (currentIndex < quiz.length - 1) setCurrentIndex(currentIndex + 1);
  };

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#6A0DFF] via-[#8B5CF6] to-[#A855F7] py-8 px-4 pt-[130px] flex justify-center relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute top-3/4 right-1/4 w-48 h-48 bg-white/5 rounded-full blur-2xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 w-32 h-32 bg-white/5 rounded-full blur-xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-white/20 overflow-hidden backdrop-blur-sm z-10">
        {/* Header */}
        <div className="bg-white border-b border-gray-100 px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-black mb-1">
                {capitalizeFirstLetter(settings?.topic) || "Quiz"}
              </h2>
              <p className="text-sm text-gray-600">
                Question {currentIndex + 1} of {quiz.length}
              </p>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full">
                <svg
                  className="w-4 h-4 text-gray-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm font-medium text-gray-700">
                  {formatTime(timer)}
                </span>
              </div>
              <button
                onClick={() => setShowConfirm(true)}
                className="text-red-500 font-semibold hover:text-red-600 transition-colors duration-200 px-3 py-1 rounded-lg hover:bg-red-50"
              >
                End Quiz
              </button>
            </div>
          </div>
        </div>

        {/* Question Content */}
        <div className="px-8 py-8">
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-black mb-6 leading-relaxed">
              {currentQuestion.question}
            </h3>

            {/* Options */}
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => (
                <label
                  key={index}
                  className={`group block border-2 rounded-xl px-6 py-4 cursor-pointer transition-all duration-200 hover:shadow-md ${
                    selectedOption === option
                      ? "border-[#6A0DFF] bg-[#6A0DFF]/5 shadow-sm"
                      : "border-gray-200 hover:border-gray-300 bg-white"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`font-medium transition-colors duration-200 ${
                        selectedOption === option
                          ? "text-[#6A0DFF]"
                          : "text-gray-700 group-hover:text-black"
                      }`}
                    >
                      {option}
                    </span>
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                        selectedOption === option
                          ? "border-[#6A0DFF] bg-[#6A0DFF]"
                          : "border-gray-300 group-hover:border-gray-400"
                      }`}
                    >
                      {selectedOption === option && (
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      )}
                    </div>
                  </div>
                  <input
                    type="radio"
                    name={`question-${currentIndex}`}
                    value={option}
                    checked={selectedOption === option}
                    onChange={() => handleOptionSelect(option)}
                    className="sr-only"
                  />
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Navigation Footer */}
        <div className="bg-gray-50 border-t border-gray-100 px-8 py-6">
          <div className="flex justify-between items-center">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="flex items-center gap-2 text-gray-600 hover:text-black font-medium transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed px-4 py-2 rounded-lg hover:bg-white disabled:hover:bg-transparent"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Previous
            </button>

            <div className="flex items-center gap-4">
              {currentIndex === quiz.length - 1 ? (
                // <button
                //   onClick={() => navigate("/QuizResults", {
                //     state: {
                //       quiz,
                //       answers,
                //       settings,
                //       timeTaken: (settings ? parseInt(settings.duration) * 60 : 120) - timer
                //     }
                //   })}
                //   className="bg-green-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-green-700 transition-all duration-200 shadow-sm hover:shadow-md"
                // >
                //   Submit Quiz
                // </button>
                <button
                  onClick={() => {
                    const enrichedQuiz = quiz.map((q, i) => ({
                      ...q,
                      answer: q.answer || "N/A",
                      explanation: q.explanation || "No explanation provided.",
                    }));

                    navigate("/QuizResults", {
                      state: {
                        quiz: enrichedQuiz,
                        answers,
                        settings,
                        timeTaken:
                          (settings ? parseInt(settings.duration) * 60 : 120) -
                          timer,
                      },
                    });
                  }}
                  className="bg-green-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-green-700 transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  Submit Quiz
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  disabled={currentIndex === quiz.length - 1}
                  className="bg-[#6A0DFF] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#5A0DE6] transition-all duration-200 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
                >
                  Next
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Confirmation Modal */}
        {showConfirm && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md text-center border border-gray-100">
              <div className="w-16 h-16 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-black mb-3">End Quiz?</h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Are you sure you want to quit? Your progress will be lost and
                cannot be recovered.
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => setShowConfirm(false)}
                  className="flex-1 bg-gray-100 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={() => navigate("/dashboard")}
                  className="flex-1 bg-red-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-600 transition-colors duration-200"
                >
                  End Quiz
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}