import React, { useEffect, useRef, useState } from "react";
import { Send, Bot, User, Sparkles, BookOpen, Brain } from "lucide-react";

export default function Summary() {
  const [topic, setTopic] = useState("");
  const [conversation, setConversation] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef(null);

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!topic.trim()) return;

    // Add user message to conversation
    const userMessage = { type: 'user', content: topic };
    setConversation(prev => [...prev, userMessage]);
    setIsLoading(true);
    setTopic('');

    try {
      const res = await fetch("http://localhost:3000/api/quiz/topic-overview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic }),
      });

      const data = await res.json();
      
      // Add AI response to conversation
      const aiResponse = {
        type: 'ai',
        content: data,
        topic: topic
      };
      
      setConversation(prev => [...prev, aiResponse]);

      setTimeout(() => {
        containerRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } catch (err) {
      console.error("❌ Error fetching summary:", err);
      setConversation(prev => [
        ...prev,
        { type: 'ai', content: "Oops! Something went wrong. Please try again." }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const suggestedTopics = [
    "Photosynthesis",
    "Quadratic Equations",
    "Climate Change",
    "Newton's Laws",
   
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 pt-[79px]">
     
      
      
      <div className="max-w-4xl mx-auto px-6 py-8" ref={containerRef}>
        {/* Welcome Message */}
        {conversation.length === 0 && (
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome to Topic Summary!</h2>
            <p className="text-gray-600 max-w-md mx-auto">
              Enter any topic and I'll provide you with key points and related subtopics to help you understand it better.
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
                  {message.type === 'user' ? (
                    <p className="text-white">{message.content}</p>
                  ) : (
                    <div className="text-gray-800">
                      {typeof message.content === 'string' ? (
                        <p>{message.content}</p>
                      ) : (
                        <div className="space-y-6">
                          {/* Topic Title */}
                          <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 rounded-xl text-center">
                            <h3 className="text-2xl font-bold capitalize">{message.topic}</h3>
                            <p className="text-sm mt-2">{message.content.subtitle}</p>
                          </div>

                          {/* Key Points */}
                          <div className="bg-purple-50 p-4 rounded-xl">
                            <h4 className="text-lg font-semibold text-gray-900 mb-3">Key Points</h4>
                            <ul className="space-y-2 list-none">
                              {message.content.allPoints?.map((point, i) => (
                                <li key={i} className="flex gap-3">
                                  <div className="w-5 h-5 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full text-white flex items-center justify-center text-xs font-bold">
                                    {i + 1}
                                  </div>
                                  <p className="text-gray-800 text-sm leading-relaxed">{point.replace(/^[-–•]\s*/, "")}</p>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Related Topics */}
                          {message.content.relatedTopics?.length > 0 && (
                            <div className="bg-blue-50 p-4 rounded-xl">
                              <h4 className="text-lg font-semibold text-gray-900 mb-3">Related Topics</h4>
                              <div className="flex flex-wrap gap-2">
                                {message.content.relatedTopics.map((related, i) => (
                                  <button
                                    key={i}
                                    onClick={() => setTopic(related)}
                                    className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full hover:bg-purple-200 transition-colors text-sm"
                                  >
                                    {related}
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
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
                  <span className="text-sm text-gray-600">Generating summary...</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Suggested Topics */}
        {conversation.length === 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-purple-600" />
              Try asking about:
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {suggestedTopics.map((suggested, index) => (
                <button
                  key={index}
                  onClick={() => setTopic(suggested)}
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
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSubmit(e)}
              placeholder="Enter a topic to summarize (e.g., Photosynthesis)"
              className="flex-1 p-3 border border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              disabled={isLoading}
            />
            <button
              onClick={handleSubmit}
              disabled={isLoading || !topic.trim()}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              Summarize
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}