
import React from "react";
import "./CustomerReviews.css";

const reviews = [
  {
    text: "The quiz generator helped me prep for finals in record time. Super efficient!",
    name: "Christie Averosa",
    role: "College Student",
    rating: 5,
  },
  {
    text: "Absolutely fantastic! The summaries saved me hours of reading.",
    name: "Liam Foster",
    role: "High School Student",
    rating: 5,
  },
  {
    text: "I just asked questions, and it explained everything so clearly. Like magic!",
    name: "Nina Kapoor",
    role: "Class 10 CBSE Student",
    rating: 5,
  },
  {
    text: "This platform turned my scattered notes into structured quizzes. Loved it!",
    name: "Carlos Mendes",
    role: "JEE Aspirant",
    rating: 5,
  },
  {
    text: "Got better grades thanks to the instant summaries and smart quizzes!",
    name: "Emily Stone",
    role: "ICSE Student",
    rating: 5,
  },
  {
    text: "The AI answered my doubts better than my textbooks. Super helpful.",
    name: "Rohan Singh",
    role: "NEET Aspirant",
    rating: 5,
  },
  {
    text: "Everything I needed to revise a topic was there—quick, easy, and smart.",
    name: "Layla Chen",
    role: "Class 12 Science Student",
    rating: 5,
  },
  {
    text: "Perfect for last-minute revision. The topic breakdowns are spot-on.",
    name: "George Ivanov",
    role: "UPSC Aspirant",
    rating: 5,
  },
];

const gradientBackgrounds = [
  "quizoma-gradient-1",
  "quizoma-gradient-2", 
  "quizoma-gradient-3",
  "quizoma-gradient-4",
  "quizoma-gradient-5",
  "quizoma-gradient-6",
  "quizoma-gradient-7",
  "quizoma-gradient-8",
];

export default function CustomerReviews() {
  const duplicatedReviews = [...reviews, ...reviews];

  return (
    <div className="quizoma-reviews-section light-theme">
      <div className="quizoma-reviews-container">
        <div className="quizoma-reviews-header">
          <h2 className="quizoma-reviews-title">
            What Our Students Say
          </h2>
          <p className="quizoma-reviews-subtitle">
            Join thousands of students who've transformed their learning with Quizoma
          </p>
        </div>

        <div className="quizoma-reviews-scroll-container">
          <div className="quizoma-reviews-track">
            {duplicatedReviews.map((review, idx) => (
              <div
                key={idx}
                className="quizoma-review-card light py-10"
              >
                <div className="quizoma-review-content">
                  <div className="quizoma-review-stars">
                    {[...Array(review.rating)].map((_, i) => (
                      <span key={i} className="quizoma-star">★</span>
                    ))}
                  </div>

                  <p className="quizoma-review-text">
                    {review.text}
                  </p>

                  <div className="quizoma-review-author">
                    <div className={`quizoma-author-avatar ${gradientBackgrounds[idx % gradientBackgrounds.length]}`}>
                      {review.name.charAt(0)}
                    </div>
                    <div className="quizoma-author-info">
                      <p className="quizoma-author-name">{review.name}</p>
                      <p className="quizoma-author-role">{review.role}</p>
                    </div>
                  </div>
                </div>

                <div className="quizoma-review-decoration"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Background decorations */}
      <div className="quizoma-bg-decoration quizoma-bg-decoration-1"></div>
      <div className="quizoma-bg-decoration quizoma-bg-decoration-2"></div>
      <div className="quizoma-bg-decoration quizoma-bg-decoration-3"></div>
    </div>
  );
}
