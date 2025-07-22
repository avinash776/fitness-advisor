import React, { useState } from 'react';
import { FaStop, FaHeart, FaBrain, FaHandHoldingHeart } from 'react-icons/fa';
import { getAIResponse } from '../utils/ai';

interface WellnessActivity {
  title: string;
  type: 'yoga' | 'meditation' | 'recovery';
  duration: number;
  instructions: string;
  benefits: string[];
}

const WellnessPage = () => {
  const [activities, setActivities] = useState<WellnessActivity[]>([]);
  const [currentActivity, setCurrentActivity] = useState<WellnessActivity | null>(null);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const generateActivities = async () => {
    setIsLoading(true);
    try {
      await getAIResponse(
        "Generate wellness activities including yoga poses, meditation techniques, and recovery exercises."
      );
      // Parse the AI response into activities
      setActivities([
        {
          title: "Sun Salutation",
          type: "yoga",
          duration: 600,
          instructions: "Start in mountain pose, flow through a sequence of poses including forward fold, plank, and upward dog.",
          benefits: ["Improves flexibility", "Builds strength", "Reduces stress"]
        },
        {
          title: "Mindful Breathing",
          type: "meditation",
          duration: 300,
          instructions: "Sit comfortably, focus on your breath, and let thoughts pass without judgment.",
          benefits: ["Reduces anxiety", "Improves focus", "Promotes relaxation"]
        },
        {
          title: "Foam Rolling",
          type: "recovery",
          duration: 900,
          instructions: "Use a foam roller to massage major muscle groups, focusing on tight areas.",
          benefits: ["Reduces muscle soreness", "Improves circulation", "Enhances recovery"]
        }
      ]);
    } catch (error) {
      console.error('Error generating activities:', error);
    }
    setIsLoading(false);
  };

  const startActivity = (activity: WellnessActivity) => {
    setCurrentActivity(activity);
    setTimeLeft(activity.duration);
    setIsTimerRunning(true);
  };

  const stopActivity = () => {
    setIsTimerRunning(false);
    setTimeLeft(0);
  };

  React.useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isTimerRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isTimerRunning, timeLeft]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-900 to-teal-800 text-white">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")'
        }}
      />

      <div className="relative z-10 container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center">Wellness & Recovery</h1>

        {activities.length === 0 ? (
          <div className="text-center">
            <button
              onClick={generateActivities}
              disabled={isLoading}
              className="bg-teal-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-teal-700 transition-colors"
            >
              {isLoading ? 'Generating...' : 'Generate Wellness Activities'}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {activities.map((activity, index) => (
              <div
                key={index}
                className="bg-teal-800 rounded-lg shadow-xl p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">{activity.title}</h3>
                  {activity.type === 'yoga' && <FaHeart className="text-2xl" />}
                  {activity.type === 'meditation' && <FaBrain className="text-2xl" />}
                  {activity.type === 'recovery' && <FaHandHoldingHeart className="text-2xl" />}
                </div>
                <div className="mb-4">
                  <span className="text-gray-400">Duration:</span>
                  <span className="ml-2">{formatTime(activity.duration)}</span>
                </div>
                <div className="mb-4">
                  <h4 className="font-semibold mb-2">Instructions:</h4>
                  <p className="text-gray-300">{activity.instructions}</p>
                </div>
                <div className="mb-4">
                  <h4 className="font-semibold mb-2">Benefits:</h4>
                  <ul className="list-disc pl-5">
                    {activity.benefits.map((benefit, i) => (
                      <li key={i} className="text-gray-300">{benefit}</li>
                    ))}
                  </ul>
                </div>
                <button
                  onClick={() => startActivity(activity)}
                  className="w-full bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition-colors"
                >
                  Start Activity
                </button>
              </div>
            ))}
          </div>
        )}

        {isTimerRunning && currentActivity && (
          <div className="fixed bottom-4 right-4 bg-teal-600 text-white p-4 rounded-lg shadow-lg">
            <div className="text-center">
              <div className="text-2xl font-bold mb-2">{currentActivity.title}</div>
              <div className="text-3xl font-bold">{formatTime(timeLeft)}</div>
              <button
                onClick={stopActivity}
                className="mt-2 text-red-400 hover:text-red-300"
              >
                <FaStop />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WellnessPage; 