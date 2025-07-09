import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Features() {
  const leftBoxRef = useRef(null);
  const rightTopRef = useRef(null);
  const rightBottomRef = useRef(null);

  useEffect(() => {
    const triggerPoint = leftBoxRef.current;

    gsap.fromTo(
      leftBoxRef.current,
      { opacity: 0, x: -100 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: triggerPoint,
          start: "top 90%",
          toggleActions: "play none none none",
        },
      }
    );

    gsap.fromTo(
      rightTopRef.current,
      { opacity: 0, x: 100 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: triggerPoint,
          start: "top 90%",
          toggleActions: "play none none none",
        },
      }
    );

    gsap.fromTo(
      rightBottomRef.current,
      { opacity: 0, x: 100 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: triggerPoint,
          start: "top 90%",
          toggleActions: "play none none none",
        },
      }
    );
  }, []);

  return (
    <div className="bg-gray-50 py-14 px-4 sm:px-8 md:px-16 lg:px-20 mt-10">
      {/* Section Title */}
      <div className="text-[#6a0fff] font-semibold uppercase text-lg sm:text-xl flex items-center gap-2 mb-6">
        <i className="fas fa-rocket text-xl"></i> FEATURES
      </div>

      {/* Heading & Description */}
      <div className="flex flex-col md:flex-row justify-between mb-12 gap-10">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black w-full md:w-1/2">
          Unleashing the Power of Online Learning
        </h2>
        <p className="text-gray-600 w-full md:w-1/2 text-base sm:text-lg pt-1">
          At Quizoma, we believe online learning should be fast, engaging, and intuitive.
          Our AI-powered tools help you quiz smarter, get summaries faster, and ask
          questions in real-time. Whether you're prepping for exams or exploring new
          topics, we adapt to your pace.
        </p>
      </div>

      {/* Layout */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Box */}
        <div
          ref={leftBoxRef}
          className="w-full md:w-1/2 bg-gray-100 p-6 sm:p-8 rounded-3xl shadow-md flex flex-col justify-between"
        >
          <div>
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-2xl sm:text-3xl font-semibold text-black">
                Instant, Smart Quizzes
              </h3>
              <Link
                to="/quiz"
                className="text-[#6A0DFF] text-sm sm:text-base font-medium hover:underline flex items-center gap-1"
              >
                Get Started <span>→</span>
              </Link>
            </div>
            <p className="text-gray-600 text-sm sm:text-base">
              Take quizzes on any topic in seconds. Personalized, instant, and
              adaptive—know where you stand immediately. Track your progress with
              real-time scoring and insights. Get tailored feedback to improve with
              every attempt.
            </p>
          </div>
          <div className="flex justify-center mt-8 sm:mt-12">
            <img src="./a-1.svg" className="max-h-[220px] sm:max-h-[260px] md:max-h-[300px] w-auto" alt="Quiz illustration" />
          </div>
        </div>

        {/* Right Boxes */}
        <div className="w-full md:w-1/2 flex flex-col gap-6">
          {/* Top Right */}
          <div
            ref={rightTopRef}
            className="bg-gray-100 p-6 sm:p-6 rounded-3xl shadow-md flex flex-col justify-between h-full"
          >
            <div>
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg sm:text-xl font-semibold text-black">
                  Ask Questions Instantly
                </h3>
                <Link
                  to="/tutor"
                  className="text-[#6A0DFF] text-sm hover:underline flex items-center gap-1"
                >
                  Get Started <span>→</span>
                </Link>
              </div>
              <p className="text-gray-600 text-sm sm:text-base">
                Ask any academic question and get an instant, AI-generated answer. Like
                having a personal tutor 24/7.
              </p>
            </div>
            <div className="flex justify-center mt-4">
              <img src="./a-2.svg" className="max-h-[100px] sm:max-h-[120px] w-auto" alt="Tutor illustration" />
            </div>
          </div>

          {/* Bottom Right */}
          <div
            ref={rightBottomRef}
            className="bg-gray-100 p-6 sm:p-6 rounded-3xl shadow-md flex flex-col justify-between h-full"
          >
            <div>
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg sm:text-xl font-semibold text-black">
                  Summarize Topics Effortlessly
                </h3>
                <Link
                  to="/summary"
                  className="text-[#6A0DFF] text-sm hover:underline flex items-center gap-1"
                >
                  Get Started <span>→</span>
                </Link>
              </div>
              <p className="text-gray-600 text-sm sm:text-base">
                Generate concise summaries to understand complex topics quickly.
                Perfect for revision or quick learning.
              </p>
            </div>
            <div className="flex justify-center mt-4">
              <img src="./a-3.svg" className="max-h-[100px] sm:max-h-[120px] w-auto" alt="Summary illustration" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
