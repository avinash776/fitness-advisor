import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaLock, FaDumbbell, FaWeight, FaRuler, FaChartLine } from 'react-icons/fa';

interface UserProfile {
  name: string;
  email: string;
  height: number;
  weight: number;
  fitnessLevel: 'beginner' | 'intermediate' | 'advanced';
  goals: string[];
}

interface ProgressData {
  date: string;
  weight: number;
  workouts: number;
  caloriesBurned: number;
}

const ProfilePage = () => {
  const [profile, setProfile] = useState<UserProfile>({
    name: 'John Doe',
    email: 'john@example.com',
    height: 175,
    weight: 70,
    fitnessLevel: 'intermediate',
    goals: ['Build Muscle', 'Improve Endurance']
  });

  const [progressData, setProgressData] = useState<ProgressData[]>([
    { date: '2024-03-01', weight: 75, workouts: 3, caloriesBurned: 1200 },
    { date: '2024-03-08', weight: 74, workouts: 4, caloriesBurned: 1500 },
    { date: '2024-03-15', weight: 73, workouts: 5, caloriesBurned: 1800 },
  ]);

  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState<UserProfile>(profile);
  const [aiResponse, setAiResponse] = useState<string>('');

  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
    // Generate AI response based on profile changes
    generateAIResponse();
  };

  const generateAIResponse = () => {
    const response = `Based on your profile, here are my recommendations:

1. Focus on progressive overload in your workouts to build muscle
2. Increase protein intake to 1.6-2.2g per kg of body weight
3. Include compound exercises like squats, deadlifts, and bench press
4. Aim for 7-9 hours of sleep for optimal recovery
5. Stay hydrated with at least 3L of water daily
6. Consider adding HIIT sessions 2-3 times per week
7. Track your progress with weekly measurements
8. Maintain a slight caloric surplus for muscle growth
9. Include rest days in your training schedule
10. Consider working with a nutritionist for meal planning`;

    setAiResponse(response);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-indigo-800 text-white">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")'
        }}
      />

      <div className="relative z-10 container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center">Your Profile</h1>

        <div className="max-w-2xl mx-auto">
          <div className="bg-indigo-800 rounded-lg shadow-xl p-6 mb-8">
            {!isEditing ? (
              <>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <FaUser className="text-3xl mr-4" />
                    <h2 className="text-2xl font-bold">{profile.name}</h2>
                  </div>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    Edit Profile
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center">
                    <FaEnvelope className="text-xl mr-3" />
                    <span>{profile.email}</span>
                  </div>
                  <div className="flex items-center">
                    <FaDumbbell className="text-xl mr-3" />
                    <span>Fitness Level: {profile.fitnessLevel}</span>
                  </div>
                  <div className="flex items-center">
                    <FaRuler className="text-xl mr-3" />
                    <span>Height: {profile.height} cm</span>
                  </div>
                  <div className="flex items-center">
                    <FaWeight className="text-xl mr-3" />
                    <span>Weight: {profile.weight} kg</span>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="text-xl font-semibold mb-3">Goals</h3>
                  <ul className="list-disc pl-5">
                    {profile.goals.map((goal, index) => (
                      <li key={index} className="text-gray-300">{goal}</li>
                    ))}
                  </ul>
                </div>
              </>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-300 mb-2">Name</label>
                    <input
                      type="text"
                      value={editedProfile.name}
                      onChange={(e) => setEditedProfile(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full p-3 bg-indigo-700 rounded-lg text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">Email</label>
                    <input
                      type="email"
                      value={editedProfile.email}
                      onChange={(e) => setEditedProfile(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full p-3 bg-indigo-700 rounded-lg text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">Height (cm)</label>
                    <input
                      type="number"
                      value={editedProfile.height}
                      onChange={(e) => setEditedProfile(prev => ({ ...prev, height: Number(e.target.value) }))}
                      className="w-full p-3 bg-indigo-700 rounded-lg text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">Weight (kg)</label>
                    <input
                      type="number"
                      value={editedProfile.weight}
                      onChange={(e) => setEditedProfile(prev => ({ ...prev, weight: Number(e.target.value) }))}
                      className="w-full p-3 bg-indigo-700 rounded-lg text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">Fitness Level</label>
                    <select
                      value={editedProfile.fitnessLevel}
                      onChange={(e) => setEditedProfile(prev => ({ ...prev, fitnessLevel: e.target.value as UserProfile['fitnessLevel'] }))}
                      className="w-full p-3 bg-indigo-700 rounded-lg text-white"
                    >
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end space-x-4 mt-6">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Progress Section */}
          <div className="bg-indigo-800 rounded-lg shadow-xl p-6 mb-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <FaChartLine className="mr-2" />
              Progress Tracking
            </h2>

            {/* Progress Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-indigo-700 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <FaWeight className="text-blue-400 mr-2" />
                  <h3 className="text-lg font-semibold">Weight Progress</h3>
                </div>
                <p className="text-2xl font-bold">-2 kg</p>
                <p className="text-gray-400 text-sm">Last 2 weeks</p>
              </div>

              <div className="bg-indigo-700 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <FaDumbbell className="text-green-400 mr-2" />
                  <h3 className="text-lg font-semibold">Workouts</h3>
                </div>
                <p className="text-2xl font-bold">12</p>
                <p className="text-gray-400 text-sm">This month</p>
              </div>

              <div className="bg-indigo-700 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <FaChartLine className="text-purple-400 mr-2" />
                  <h3 className="text-lg font-semibold">Calories Burned</h3>
                </div>
                <p className="text-2xl font-bold">4,500</p>
                <p className="text-gray-400 text-sm">This month</p>
              </div>
            </div>

            {/* Progress History */}
            <div className="bg-indigo-700 rounded-lg p-4">
              <h3 className="text-xl font-semibold mb-4">Progress History</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left border-b border-indigo-600">
                      <th className="pb-2">Date</th>
                      <th className="pb-2">Weight (kg)</th>
                      <th className="pb-2">Workouts</th>
                      <th className="pb-2">Calories Burned</th>
                    </tr>
                  </thead>
                  <tbody>
                    {progressData.map((data, index) => (
                      <tr key={index} className="border-b border-indigo-600">
                        <td className="py-2">{data.date}</td>
                        <td className="py-2">{data.weight}</td>
                        <td className="py-2">{data.workouts}</td>
                        <td className="py-2">{data.caloriesBurned}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* AI Recommendations */}
          {aiResponse && (
            <div className="bg-indigo-800 rounded-lg shadow-xl p-6">
              <h2 className="text-2xl font-bold mb-4">AI Recommendations</h2>
              <div className="bg-indigo-700 rounded-lg p-4">
                <pre className="whitespace-pre-wrap text-gray-300">{aiResponse}</pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage; 