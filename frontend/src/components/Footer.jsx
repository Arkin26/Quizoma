// components/Footer.jsx
import React from "react";

export default function Footer() {
  return (
    
    <footer className="bg-gray-50 py-6 text-center font-roboto">
      <h1 className="text-2xl font-bold text-[#5E54C7] tracking-wide">
        Quizoma
      </h1>
      <p className="text-sm text-gray-500 mt-2">
        © {new Date().getFullYear()} Quizoma. All rights reserved.
      </p>
    </footer>
  );
}
