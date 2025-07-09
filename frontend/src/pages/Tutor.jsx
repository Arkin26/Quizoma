import React, { useState } from 'react';
import { Send, User, Bot, Sparkles, Brain, BookOpen } from 'lucide-react';

export default function Tutor() {
  const [question, setQuestion] = useState('');
  const [conversation, setConversation] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;

    const userMessage = { type: 'user', content: question };
    setConversation(prev => [...prev, userMessage]);
    setIsLoading(true);
    setQuestion('');

    try {
  const res = await fetch("http://localhost:3000/api/quiz/tutor/ask", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question }),
  });

  const data = await res.json();

  const parts = data.answerParts || [data.answer || "Sorry, I couldn't find an answer."];

  const aiMessages = parts.map((part) => ({
    type: 'ai',
    content: part,
  }));

  setConversation(prev => [...prev, ...aiMessages]);
} catch (err) {
  console.error("Tutor fetch failed:", err);
  setConversation(prev => [
    ...prev,
    { type: 'ai', content: "Oops! Something went wrong. Please try again." }
  ]);
} finally {
  setIsLoading(false);
}

  };

  const suggestedQuestions = [
    "How does photosynthesis work?",
    "Explain quadratic equations",
    "What is machine learning?",
    "How do I solve calculus problems?"
  ];

  return (
    <div className=" min-h-screen  pt-[79px]">
    
     

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Welcome Message */}
        {conversation.length === 0 && (
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome to Your Personal Tutor!</h2>
            <p className="text-gray-600 max-w-md mx-auto">
              I'm here to help you understand any topic. Ask me a question about any subject, and I'll provide clear, detailed explanations.
            </p>
          </div>
        )}

        {/* Conversation */}
        <div className="space-y-6 mb-8">
          {conversation.map((message, index) => (
            <div key={index} className={`flex gap-4 ${message.type === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                message.type === 'user' 
                  ? 'bg-gradient-to-br from-blue-500 to-purple-500' 
                  : 'bg-gradient-to-br from-purple-500 to-pink-500'
              }`}>
                {message.type === 'user' ? (
                  <User className="w-5 h-5 text-white" />
                ) : (
                  <Bot className="w-5 h-5 text-white" />
                )}
              </div>
              <div className={`flex-1 ${message.type === 'user' ? 'text-right' : ''}`}>
                <div className={`inline-block p-4 rounded-2xl max-w-3xl ${
                  message.type === 'user'
                    ? 'bg-gradient-to-br from-blue-500 to-purple-500 text-white'
                    : 'bg-white shadow-sm border border-purple-100'
                }`}>
                  <p className={`${message.type === 'user' ? 'text-white' : 'text-gray-800'}`}>
                    {message.content}
                  </p>
                </div>
              </div>
            </div>
          ))}
          
          {/* Loading indicator */}
          {isLoading && (
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div className="bg-white shadow-sm border border-purple-100 rounded-2xl p-4">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                  <span className="text-sm text-gray-600">Thinking...</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Suggested Questions */}
        {conversation.length === 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-purple-600" />
              Try asking about:
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {suggestedQuestions.map((suggested, index) => (
                <button
                  key={index}
                  onClick={() => setQuestion(suggested)}
                  className="p-4 bg-white border border-purple-200 rounded-xl hover:border-purple-300 hover:shadow-md transition-all duration-200 text-left group"
                >
                  <p className="text-gray-800 group-hover:text-purple-700 transition-colors">
                    {suggested}
                  </p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Form */}
        <div className="sticky bottom-0 bg-white/80 backdrop-blur-sm border border-purple-200 rounded-2xl p-4 shadow-lg">
          <div className="flex gap-3">
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSubmit(e)}
              placeholder="Ask me anything... (e.g., How does photosynthesis work?)"
              className="flex-1 p-3 border border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              disabled={isLoading}
            />
            <button
              onClick={handleSubmit}
              disabled={isLoading || !question.trim()}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              Ask
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
