

import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  CheckCircle,
  XCircle,
  Clock,
  Trophy,
  BookOpen,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";

export default function QuizResults() {
  const { state } = useLocation();
  const { quiz, answers, settings, timeTaken } = state || {};
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!quiz || !answers)
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-2xl shadow-lg">
          <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-xl text-gray-600">No result data available.</p>
        </div>
      </div>
    );

  const normalize = (val) => val?.toString().trim().toLowerCase() || "";

  const total = quiz.length;
  const correct = quiz.filter(
    (q, i) => normalize(answers[i]) === normalize(q.answer)
  ).length;
  const percentage = Math.round((correct / total) * 100);
  const formattedTime = `${Math.floor(timeTaken / 60)}m ${timeTaken % 60}s`;

  const currentQuestion = quiz[currentIndex];
  const correctOpt = currentQuestion.answer;
  const userOpt = answers[currentIndex];
  const isCurrentCorrect = normalize(userOpt) === normalize(correctOpt);

  const getScoreColor = () => {
    if (percentage >= 80) return "text-green-600";
    if (percentage >= 60) return "text-yellow-600";
    return "text-red-500";
  };

  const getScoreBgColor = () => {
    if (percentage >= 80) return "bg-green-50 border-green-200";
    if (percentage >= 60) return "bg-yellow-50 border-yellow-200";
    return "bg-red-50 border-red-200";
  };

  return (
    <div className="pt-[120px] min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto mb-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Trophy className="w-12 h-12 text-[#6A0DFF] mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">Quiz Results</h1>
          </div>
          <p className="text-gray-600 text-lg">
            Review your performance and learn from your answers
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Summary Panel */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 sticky top-8">
            <div className={`${getScoreBgColor()} rounded-2xl p-6 mb-6 border-2`}>
              <div className="text-center">
                <div className={`text-5xl font-bold ${getScoreColor()} mb-2`}>
                  {percentage}%
                </div>
                <p className="text-gray-600 text-lg font-medium">
                  {correct} out of {total} correct
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center">
                  <Clock className="w-5 h-5 text-[#6A0DFF] mr-3" />
                  <span className="font-medium text-gray-700">Time Taken</span>
                </div>
                <span className="font-bold text-gray-900">{formattedTime}</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="font-medium text-gray-700">Correct</span>
                </div>
                <span className="font-bold text-green-600">{correct}</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center">
                  <XCircle className="w-5 h-5 text-red-500 mr-3" />
                  <span className="font-medium text-gray-700">Incorrect</span>
                </div>
                <span className="font-bold text-red-500">{total - correct}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Question Review Panel */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <span className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  Question {currentIndex + 1} of {total}
                </span>
                {isCurrentCorrect ? (
                  <CheckCircle className="w-6 h-6 text-green-500 ml-3" />
                ) : (
                  <XCircle className="w-6 h-6 text-red-500 ml-3" />
                )}
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
                  disabled={currentIndex === 0}
                  className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setCurrentIndex(Math.min(total - 1, currentIndex + 1))}
                  disabled={currentIndex === total - 1}
                  className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 leading-relaxed">
                {currentQuestion.question}
              </h2>
              <div className="space-y-3">
                {currentQuestion.options.map((opt, j) => {
                  const normalizedOpt = normalize(opt);
                  const normalizedCorrect = normalize(correctOpt);
                  const normalizedUser = normalize(userOpt);
                  const isCorrect = normalizedOpt === normalizedCorrect;
                  const isUserChoice = normalizedOpt === normalizedUser;

                  let optionClass =
                    "p-4 rounded-xl border-2 transition-all duration-200 ";
                  if (isCorrect)
                    optionClass +=
                      "bg-green-50 border-green-300 text-green-800";
                  else if (isUserChoice)
                    optionClass += "bg-red-50 border-red-300 text-red-800";
                  else
                    optionClass += "bg-gray-50 border-gray-200 text-gray-600";

                  return (
                    <div key={j} className={optionClass}>
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{opt}</span>
                        <div className="flex items-center space-x-2">
                          {isUserChoice && (
                            <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                              Your Answer
                            </span>
                          )}
                          {isCorrect && (
                            <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">
                              Correct Answer
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Navigation Panel */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Question Navigation
              </h3>
              <div className="flex flex-wrap gap-2">
                {quiz.map((q, i) => {
                  const isAnswered = typeof answers[i] === "string";
                  const isCorrect = normalize(answers[i]) === normalize(q.answer);
                  const isActive = currentIndex === i;

                  return (
                    <button
                      key={i}
                      onClick={() => setCurrentIndex(i)}
                      className={`
                        w-12 h-12 rounded-xl font-semibold transition-all duration-200 border-2 flex items-center justify-center
                        ${
                          isActive
                            ? "bg-[#6A0DFF] text-white border-[#6A0DFF] shadow-lg scale-110"
                            : !isAnswered
                            ? "bg-gray-100 text-[#6A0DFF] border-gray-300"
                            : isCorrect
                            ? "bg-green-50 text-[#6A0DFF] border-green-300 hover:bg-green-100"
                            : "bg-red-50 text-[#6A0DFF] border-red-300 hover:bg-red-100"
                        }
                      `}
                    >
                      {i + 1}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

