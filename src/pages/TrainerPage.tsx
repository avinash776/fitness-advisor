import React, { useState } from 'react';
import { getAIResponse } from '../utils/ai';
import LoadingSpinner from '../components/LoadingSpinner';
import ResultCard from '../components/ResultCard';

const TrainerPage = () => {
  const [fitnessLevel, setFitnessLevel] = useState('');
  const [preference, setPreference] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await getAIResponse(
        `I am a ${fitnessLevel} level fitness enthusiast with the following preferences: ${preference}. What type of trainer would be best suited for me? Please provide detailed recommendations.`
      );
      setResult(response);
    } catch (error) {
      setResult('Sorry, there was an error processing your request.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-100 pt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Find Your Perfect Trainer
          </h1>
          <p className="text-lg text-gray-600">
            Tell us about your fitness level and preferences to get personalized trainer recommendations.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Fitness Level
            </label>
            <select
              value={fitnessLevel}
              onChange={(e) => setFitnessLevel(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            >
              <option value="">Select your fitness level</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Preferences
            </label>
            <textarea
              value={preference}
              onChange={(e) => setPreference(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              rows={4}
              placeholder="e.g., I prefer morning workouts, enjoy outdoor activities, and need someone who can help with nutrition..."
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors duration-300"
            disabled={loading}
          >
            {loading ? <LoadingSpinner /> : 'Find My Trainer'}
          </button>
        </form>

        {result && <ResultCard title="Trainer Recommendations" content={result} />}
      </div>
    </div>
  );
};

export default TrainerPage; 