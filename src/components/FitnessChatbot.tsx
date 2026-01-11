import React, { useState, useRef, useEffect } from 'react';
import { getAIHealthAdvice } from '../utils/ai';
import { FaRobot, FaPaperPlane, FaTimes, FaDumbbell } from 'react-icons/fa';

interface Message {
  text: string;
  isUser: boolean;
}

const FitnessChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "👋 Hi! I'm your AI fitness assistant. Ask me anything about workouts, nutrition, or wellness!",
      isUser: false
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { text: userMessage, isUser: true }]);
    setIsLoading(true);

    try {
      const response = await getAIHealthAdvice(userMessage);
      setMessages(prev => [...prev, { text: response, isUser: false }]);
    } catch (error) {
      setMessages(prev => [...prev, {
        text: "Sorry, I couldn't process your request. Please try again.",
        isUser: false
      }]);
    }

    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${isOpen
            ? 'bg-dark-700 text-white rotate-0'
            : 'bg-gradient-to-br from-primary-500 to-secondary-500 text-white animate-pulse-glow'
          }`}
      >
        {isOpen ? (
          <FaTimes className="text-xl" />
        ) : (
          <FaRobot className="text-2xl" />
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-80 sm:w-96 glass-card rounded-3xl overflow-hidden animate-scale-in shadow-glass-lg">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary-500/20 to-secondary-500/20 p-4 border-b border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center">
                <FaDumbbell className="text-white" />
              </div>
              <div>
                <h3 className="font-heading font-semibold">Fitness AI</h3>
                <span className="text-green-400 text-xs flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                  Online
                </span>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="h-80 overflow-y-auto p-4 space-y-3">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} animate-fade-in`}
              >
                {!message.isUser && (
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center flex-shrink-0 mr-2">
                    <FaRobot className="text-white text-xs" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${message.isUser
                      ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-br-none'
                      : 'glass text-gray-300 rounded-bl-none'
                    }`}
                >
                  <pre className="whitespace-pre-wrap font-sans">{message.text}</pre>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start animate-fade-in">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center flex-shrink-0 mr-2">
                  <FaRobot className="text-white text-xs" />
                </div>
                <div className="glass rounded-2xl rounded-bl-none px-4 py-3">
                  <div className="flex gap-1.5">
                    <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="p-4 border-t border-white/5">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about fitness..."
                className="input-glass flex-1 py-2.5 text-sm"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white disabled:opacity-50 transition-transform hover:scale-105"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <FaPaperPlane className="text-sm" />
                )}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default FitnessChatbot;