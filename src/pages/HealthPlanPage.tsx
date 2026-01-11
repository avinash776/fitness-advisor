import { useState, useRef, useEffect } from 'react';
import { FaHeartbeat, FaPaperPlane, FaRobot, FaTint, FaBed, FaAppleAlt, FaWalking, FaBrain, FaLeaf } from 'react-icons/fa';
import { getAIHealthAdvice } from '../utils/ai';

interface HealthAdvice {
  id: number;
  question: string;
  answer: string;
  timestamp: string;
}

const healthTips = [
  {
    icon: FaTint,
    title: 'Stay Hydrated',
    desc: 'Drink at least 8 glasses of water daily for optimal health.',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: FaBed,
    title: 'Quality Sleep',
    desc: 'Aim for 7-9 hours of quality sleep each night.',
    color: 'from-purple-500 to-indigo-500',
  },
  {
    icon: FaAppleAlt,
    title: 'Balanced Nutrition',
    desc: 'Focus on whole foods, lean proteins, and vegetables.',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: FaWalking,
    title: 'Stay Active',
    desc: 'Get at least 30 minutes of movement every day.',
    color: 'from-orange-500 to-red-500',
  },
  {
    icon: FaBrain,
    title: 'Mental Health',
    desc: 'Practice mindfulness and take breaks when needed.',
    color: 'from-pink-500 to-rose-500',
  },
  {
    icon: FaLeaf,
    title: 'Stress Management',
    desc: 'Find healthy ways to manage and reduce stress.',
    color: 'from-teal-500 to-green-500',
  },
];

const HealthPlanPage = () => {
  const [advice, setAdvice] = useState<HealthAdvice[]>([]);
  const [question, setQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [advice]);

  const handleAskQuestion = async () => {
    if (!question.trim() || isLoading) return;

    const newAdvice: HealthAdvice = {
      id: Date.now(),
      question: question,
      answer: '',
      timestamp: new Date().toLocaleString()
    };
    setAdvice([...advice, newAdvice]);
    setQuestion('');
    setIsLoading(true);

    try {
      const aiResponse = await getAIHealthAdvice(question);
      setAdvice(prev => prev.map(item =>
        item.id === newAdvice.id
          ? { ...item, answer: aiResponse }
          : item
      ));
    } catch (error) {
      console.error('Error getting AI advice:', error);
      setAdvice(prev => prev.map(item =>
        item.id === newAdvice.id
          ? { ...item, answer: "I apologize, but I encountered an error. Please try again." }
          : item
      ));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-mesh opacity-40" />
      <div className="absolute top-20 right-20 w-80 h-80 bg-red-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-40 left-20 w-72 h-72 bg-secondary-500/10 rounded-full blur-3xl" />

      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4">
            <FaHeartbeat className="text-red-500 animate-pulse" />
            <span className="text-sm font-medium text-gray-300">Health & Wellness</span>
          </div>
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">AI Health</span> Advisor
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Get personalized health advice powered by artificial intelligence
          </p>
        </div>

        {/* Health Tips Grid */}
        <div className="max-w-6xl mx-auto mb-12">
          <h2 className="font-heading text-2xl font-semibold mb-6 text-center">Daily Health Tips</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {healthTips.map((tip, index) => {
              const Icon = tip.icon;
              return (
                <div
                  key={index}
                  className="glass-card glass-card-hover rounded-2xl p-6 group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tip.color} flex items-center justify-center mb-4 transform transition-transform group-hover:scale-110 group-hover:rotate-3`}>
                    <Icon className="text-white text-xl" />
                  </div>
                  <h3 className="font-heading font-semibold text-lg mb-2">{tip.title}</h3>
                  <p className="text-gray-400 text-sm">{tip.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* AI Chat Section */}
        <div className="max-w-3xl mx-auto">
          <div className="glass-card rounded-3xl overflow-hidden">
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-primary-500/20 to-secondary-500/20 p-6 border-b border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center animate-pulse-glow">
                  <FaRobot className="text-white text-xl" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-lg">AI Health Assistant</h3>
                  <span className="text-green-400 text-sm flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    Online
                  </span>
                </div>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="h-96 overflow-y-auto p-6 space-y-4">
              {/* Welcome Message */}
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center flex-shrink-0">
                  <FaRobot className="text-white text-sm" />
                </div>
                <div className="glass rounded-2xl rounded-tl-none p-4 max-w-[80%]">
                  <p className="text-gray-300">
                    👋 Hi! I'm your AI Health Assistant. Ask me anything about fitness, nutrition, or wellness!
                  </p>
                </div>
              </div>

              {/* Chat History */}
              {advice.map((item) => (
                <div key={item.id} className="space-y-4">
                  {/* User Message */}
                  <div className="flex gap-3 justify-end">
                    <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl rounded-tr-none p-4 max-w-[80%]">
                      <p className="text-white">{item.question}</p>
                    </div>
                  </div>

                  {/* AI Response */}
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center flex-shrink-0">
                      <FaRobot className="text-white text-sm" />
                    </div>
                    <div className="glass rounded-2xl rounded-tl-none p-4 max-w-[80%]">
                      {item.answer ? (
                        <pre className="whitespace-pre-wrap text-gray-300 font-sans text-sm">{item.answer}</pre>
                      ) : (
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                          <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                          <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            {/* Chat Input */}
            <div className="p-4 border-t border-white/5">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAskQuestion()}
                  placeholder="Ask about health, fitness, or nutrition..."
                  className="input-glass flex-1"
                  disabled={isLoading}
                />
                <button
                  onClick={handleAskQuestion}
                  disabled={isLoading || !question.trim()}
                  className="btn-primary px-6 py-3 flex items-center gap-2 disabled:opacity-50"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <FaPaperPlane />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthPlanPage;