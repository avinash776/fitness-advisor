import React, { useState } from 'react';
import { FaHeartbeat, FaPaperPlane, FaRobot, FaSpinner } from 'react-icons/fa';
import { getAIHealthAdvice } from '../utils/ai';

interface HealthAdvice {
  id: number;
  question: string;
  answer: string;
  timestamp: string;
}

const HealthPlanPage = () => {
  const [advice, setAdvice] = useState<HealthAdvice[]>([
    {
      id: 1,
      question: "What's a good exercise routine for beginners?",
      answer: `Here's a comprehensive beginner's exercise routine:

1. Start with 5-10 minutes of light cardio (walking, jogging)
2. Perform basic bodyweight exercises:
   - 10 push-ups (modified if needed)
   - 15 squats
   - 10 lunges per leg
   - 30-second plank
3. Rest for 1-2 minutes between sets
4. Repeat the circuit 2-3 times
5. Finish with 5-10 minutes of stretching
6. Aim for 3 sessions per week
7. Gradually increase intensity and duration
8. Focus on proper form over quantity
9. Stay hydrated throughout
10. Listen to your body and rest when needed`,
      timestamp: "2024-03-15 10:30"
    }
  ]);
  const [question, setQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleAskQuestion = async () => {
    if (!question.trim() || isLoading) return;

    // Add user question
    const newAdvice: HealthAdvice = {
      id: advice.length + 1,
      question: question,
      answer: "Let me analyze your question and provide personalized advice...",
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
          ? { ...item, answer: "I apologize, but I encountered an error while generating advice. Please try again later." }
          : item
      ));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 flex items-center">
          <FaHeartbeat className="mr-2" />
          Health Plan & AI Advice
        </h1>

        {/* Health Tips Section */}
        <div className="bg-gray-800 rounded-lg p-4 mb-8">
          <h2 className="text-xl font-semibold mb-4">Daily Health Tips</h2>
          <div className="space-y-4">
            <div className="bg-gray-700 rounded p-4">
              <h3 className="font-semibold mb-2">Stay Hydrated</h3>
              <p className="text-gray-300">Drink at least 8 glasses of water daily to maintain optimal health and performance.</p>
            </div>
            <div className="bg-gray-700 rounded p-4">
              <h3 className="font-semibold mb-2">Get Enough Sleep</h3>
              <p className="text-gray-300">Aim for 7-9 hours of quality sleep each night to support recovery and overall health.</p>
            </div>
            <div className="bg-gray-700 rounded p-4">
              <h3 className="font-semibold mb-2">Balanced Nutrition</h3>
              <p className="text-gray-300">Focus on whole foods, lean proteins, and plenty of fruits and vegetables.</p>
            </div>
          </div>
        </div>

        {/* AI Advice Section */}
        <div className="bg-gray-800 rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <FaRobot className="mr-2" />
            Ask for Health Advice
          </h2>
          
          {/* Advice History */}
          <div className="space-y-4 mb-4">
            {advice.map((item) => (
              <div key={item.id} className="bg-gray-700 rounded p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold">Q: {item.question}</h3>
                  <span className="text-sm text-gray-400">{item.timestamp}</span>
                </div>
                <pre className="whitespace-pre-wrap text-gray-300">A: {item.answer}</pre>
              </div>
            ))}
          </div>

          {/* Question Input */}
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAskQuestion()}
              placeholder="Ask a health or fitness question..."
              className="flex-1 bg-gray-700 rounded p-2 text-white"
              disabled={isLoading}
            />
            <button
              onClick={handleAskQuestion}
              className={`bg-blue-600 text-white p-2 rounded hover:bg-blue-700 flex items-center ${
                isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={isLoading}
            >
              {isLoading ? (
                <FaSpinner className="animate-spin" />
              ) : (
                <FaPaperPlane />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthPlanPage; 