import React, { useState } from 'react';
import { FaChartLine, FaWeight, FaRunning, FaDumbbell } from 'react-icons/fa';

interface ProgressData {
  date: string;
  weight: number;
  workouts: number;
  caloriesBurned: number;
}

const ProgressPage = () => {
  const [progressData, setProgressData] = useState<ProgressData[]>([
    { date: '2024-03-01', weight: 75, workouts: 3, caloriesBurned: 1200 },
    { date: '2024-03-08', weight: 74, workouts: 4, caloriesBurned: 1500 },
    { date: '2024-03-15', weight: 73, workouts: 5, caloriesBurned: 1800 },
  ]);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 flex items-center">
          <FaChartLine className="mr-2" />
          Progress Tracking
        </h1>

        {/* Progress Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-gray-800 p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <FaWeight className="text-blue-500 mr-2" />
              <h3 className="text-lg font-semibold">Weight Progress</h3>
            </div>
            <p className="text-2xl font-bold">-2 kg</p>
            <p className="text-gray-400 text-sm">Last 2 weeks</p>
          </div>

          <div className="bg-gray-800 p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <FaRunning className="text-green-500 mr-2" />
              <h3 className="text-lg font-semibold">Workouts</h3>
            </div>
            <p className="text-2xl font-bold">12</p>
            <p className="text-gray-400 text-sm">This month</p>
          </div>

          <div className="bg-gray-800 p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <FaDumbbell className="text-purple-500 mr-2" />
              <h3 className="text-lg font-semibold">Calories Burned</h3>
            </div>
            <p className="text-2xl font-bold">4,500</p>
            <p className="text-gray-400 text-sm">This month</p>
          </div>
        </div>

        {/* Progress History */}
        <div className="bg-gray-800 rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4">Progress History</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b border-gray-700">
                  <th className="pb-2">Date</th>
                  <th className="pb-2">Weight (kg)</th>
                  <th className="pb-2">Workouts</th>
                  <th className="pb-2">Calories Burned</th>
                </tr>
              </thead>
              <tbody>
                {progressData.map((data, index) => (
                  <tr key={index} className="border-b border-gray-700">
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
    </div>
  );
};

export default ProgressPage; 