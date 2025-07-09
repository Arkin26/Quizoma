import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../components/components.css";

export default function QuizSetup() {
  const [loading, setLoading] = useState(false);
  const [topic, setTopic] = useState("");
  const [classLevel, setClassLevel] = useState("");
  const [duration, setDuration] = useState("");
  const [difficulty, setDifficulty] = useState("Easy");
  const [numQuestions, setNumQuestions] = useState("");
  const navigate = useNavigate();

  const handleGenerateQuiz = async () => {
    if (!topic || !classLevel || !duration || !numQuestions)
      return alert("Please fill in all fields");

    const quizSettings = {
      topic,
      classLevel,
      duration,
      difficulty,
      numberOfQuestions: numQuestions,
    };

    try {
      setLoading(true);
      const response = await fetch("http://localhost:3000/api/quiz/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(quizSettings),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Quiz generation failed");

      navigate("/QuizPage", {
        state: { quiz: data.quiz, settings: quizSettings },
      });
    } catch (err) {
      alert("Failed to generate quiz. Try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4 py-16 relative">
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-gray-200 p-8 hover:shadow-3xl transition-all duration-300 mt-12">
        <div className="text-center mb-10">
          <h1 className="Bebas text-5xl text-black mb-2">Create Your Quiz</h1>
          <p className="Roboto text-gray-600">
            Generate personalized quizzes tailored to your learning needs.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {/* Topic */}
          <div>
            <label className="block text-black font-semibold Bebas text-2xl mb-2">📖 Topic</label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. Algebra, Photosynthesis"
              className="w-full p-4 border-2 border-gray-200 rounded-2xl Roboto bg-gray-50 focus:outline-none focus:border-[#6A0DFF] focus:ring-4 focus:ring-[#6A0DFF]/20 focus:bg-white"
            />
          </div>

          {/* Class Level */}
          <div>
            <label className="block text-black font-semibold Bebas text-2xl mb-2">🎓 Grade Level</label>
            <input
              type="text"
              value={classLevel}
              onChange={(e) => setClassLevel(e.target.value)}
              placeholder="e.g. Class 5, Grade 7"
              className="w-full p-4 border-2 border-gray-200 rounded-2xl Roboto bg-gray-50 focus:outline-none focus:border-[#6A0DFF] focus:ring-4 focus:ring-[#6A0DFF]/20 focus:bg-white"
            />
          </div>

          {/* Duration */}
          <div>
            <label className="block text-black font-semibold Bebas text-2xl mb-2">⏱️ Duration (min)</label>
            <input
              type="number"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="15"
              className="w-full p-4 border-2 border-gray-200 rounded-2xl Roboto bg-gray-50 focus:outline-none focus:border-[#6A0DFF] focus:ring-4 focus:ring-[#6A0DFF]/20 focus:bg-white"
            />
          </div>

          {/* Number of Questions */}
          <div>
            <label className="block text-black font-semibold Bebas text-2xl mb-2">📝 Questions</label>
            <input
              type="number"
              value={numQuestions}
              onChange={(e) => setNumQuestions(e.target.value)}
              placeholder="10"
              className="w-full p-4 border-2 border-gray-200 rounded-2xl Roboto bg-gray-50 focus:outline-none focus:border-[#6A0DFF] focus:ring-4 focus:ring-[#6A0DFF]/20 focus:bg-white"
            />
          </div>

          {/* Difficulty Buttons */}
          <div>
            <label className="block text-black font-semibold Bebas text-2xl mb-2">🎯 Difficulty Level</label>
            <div className="grid grid-cols-3 gap-3">
              {["Easy", "Medium", "Hard"].map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setDifficulty(level)}
                  className={`p-3 rounded-xl border-2 text-sm Roboto font-medium transition-all ${
                    difficulty === level
                      ? "bg-[#6A0DFF] text-white border-[#6A0DFF] shadow-lg"
                      : "bg-gray-50 text-gray-700 border-gray-200 hover:border-[#6A0DFF] hover:bg-gray-100"
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleGenerateQuiz}
            disabled={loading}
            className="mt-4 w-full bg-gradient-to-r from-[#6A0DFF] to-[#8B5CF6] text-white py-3 px-6 rounded-2xl Roboto font-semibold text-base hover:from-[#5A0DE6] hover:to-[#7C3AED] transition-all duration-300 transform hover:scale-105 hover:shadow-2xl disabled:opacity-50"
          >
            {loading ? "Generating Quiz..." : "Generate My Quiz"}
          </button>
        </div>
      </div>

      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-white/90 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white border border-gray-200 rounded-3xl shadow-2xl p-8 w-full max-w-sm text-center">
            <div className="mb-4">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-[#6A0DFF] mx-auto"></div>
            </div>
            <h2 className="Bebas text-2xl text-black mb-2">Generating Quiz...</h2>
            <p className="Roboto text-gray-600">This may take a few seconds. Sit tight!</p>
          </div>
        </div>
      )}
    </div>
  );
}
