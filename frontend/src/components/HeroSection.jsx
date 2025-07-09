

import React, { useState, useEffect } from "react";
import { Play, Sparkles } from "lucide-react";
import "./components.css";

export default function HeroSection({ scrollToFeatures }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="pt-[80px] min-h-screen bg-gray-50 overflow-hidden">
      <section className="relative pt-12 pb-20 px-4 sm:px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div
              className={`transition-all duration-1000 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <div className="inline-flex items-center space-x-2 bg-purple-50 text-purple-700 px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4" />
                <span>AI-Powered Learning Platform</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                <span>
                  Discover{" "}
                  <span className="text-[#6A0DFF]">Smarter Learning</span>
                </span>
                <span className="block text-gray-700">Through AI-Based</span>
                <span className="block text-[#6A0DFF]">Quizzes & Notes</span>
              </h1>

              <p className="text-base sm:text-lg text-gray-600 mb-8 leading-relaxed">
                Join thousands of young learners exploring interactive,
                personalized learning powered by cutting-edge AI technology.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={scrollToFeatures}
                  className="group bg-[#6A0DFF] text-white px-6 py-3 sm:px-8 sm:py-4 rounded-xl font-semibold hover:bg-purple-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
                >
                  <Play className="w-5 h-5" />
                  <span className="text-sm sm:text-base">START LEARNING</span>
                </button>
              </div>

              <div className="w-full mt-10">
                <div className="flex flex-col sm:flex-row gap-6 sm:gap-[90px] justify-between text-center sm:text-left text-sm sm:text-base">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-[#6A0DFF]">10K+</h3>
                    <p className="text-gray-600">Active Users</p>
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-[#6A0DFF]">75K+</h3>
                    <p className="text-gray-600">Quizzes Generated</p>
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-[#6A0DFF]">20K+</h3>
                    <p className="text-gray-600">AI Notes Shared</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Illustration */}
            <div className="hidden md:block relative w-full">
              {/* Floating SVGs */}
              <div className="absolute -top-10 -left-6 w-[120px] lg:w-[160px] animate-float-slow opacity-80 drop-shadow-lg">
                <svg width="100%" viewBox="0 0 200 200" fill="none">
                  <circle cx="100" cy="100" r="80" fill="#f3e8ff" />
                  <path d="M60 100 L140 100" stroke="#a78bfa" strokeWidth="8" strokeLinecap="round" />
                  <circle cx="100" cy="100" r="20" fill="#a855f7" />
                </svg>
              </div>

              <div className="pl-6 mx-auto animate-float z-10 drop-shadow-2xl">
                <svg height="300" width="100%" viewBox="0 0 390 320" fill="none">
                  <ellipse cx="320" cy="310" rx="60" ry="10" fill="#ede9fe" />
                  <g>
                    <rect x="60" y="60" width="240" height="160" rx="32" fill="#faf6ff" />
                    <rect x="80" y="85" width="160" height="20" rx="10" fill="#e9d5ff" />
                    <rect x="80" y="120" width="115" height="15" rx="8" fill="#ddd6fe" />
                    <circle cx="230" cy="155" r="22" fill="#c4b5fd" />
                    <rect x="170" y="155" width="70" height="12" rx="6" fill="#a78bfa" />
                  </g>
                  <text x="305" y="105" fontSize="40" fill="#a21caf">π</text>
                  <circle cx="128" cy="240" r="8" fill="#c026d3" />
                  <circle cx="210" cy="70" r="5" fill="#6366f1" />
                  <circle cx="115" cy="127" r="7" fill="#c026d3" />
                  <circle cx="270" cy="100" r="6" fill="#8b5cf6" />
                </svg>
              </div>

              <div className="absolute bottom-0 -right-6 w-[140px] lg:w-[180px] animate-float-fast opacity-80 drop-shadow-lg">
                <svg width="100%" viewBox="0 0 200 200" fill="none">
                  <rect x="20" y="40" width="160" height="100" rx="20" fill="#fce7f3" />
                  <path d="M40 90 L160 90" stroke="#f472b6" strokeWidth="6" strokeLinecap="round" />
                  <circle cx="100" cy="90" r="16" fill="#ec4899" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Background Circles */}
        <div className="absolute top-0 right-0 w-72 sm:w-96 h-72 sm:h-96 bg-purple-50 rounded-full -translate-y-1/2 translate-x-1/2 opacity-30"></div>
        <div className="absolute bottom-0 left-0 w-60 sm:w-72 h-60 sm:h-72 bg-blue-50 rounded-full translate-y-1/2 -translate-x-1/2 opacity-30"></div>
      </section>
    </div>
  );
}

