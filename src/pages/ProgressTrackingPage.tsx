import { useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { FaWeight, FaRunning, FaDumbbell } from 'react-icons/fa';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface ProgressData {
  date: string;
  weight: number;
  workouts: number;
  calories: number;
}

const ProgressTrackingPage = () => {
  const [progressData] = useState<ProgressData[]>([
    { date: '2024-01-01', weight: 70, workouts: 3, calories: 2000 },
    { date: '2024-01-08', weight: 69, workouts: 4, calories: 1900 },
    { date: '2024-01-15', weight: 68, workouts: 5, calories: 1800 },
    { date: '2024-01-22', weight: 67, workouts: 4, calories: 1850 },
    { date: '2024-01-29', weight: 66, workouts: 5, calories: 1750 },
  ]);

  const weightData = {
    labels: progressData.map(d => d.date),
    datasets: [
      {
        label: 'Weight (kg)',
        data: progressData.map(d => d.weight),
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  const workoutData = {
    labels: progressData.map(d => d.date),
    datasets: [
      {
        label: 'Workouts per Week',
        data: progressData.map(d => d.workouts),
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.1,
      },
    ],
  };

  const calorieData = {
    labels: progressData.map(d => d.date),
    datasets: [
      {
        label: 'Daily Calories',
        data: progressData.map(d => d.calories),
        borderColor: 'rgb(54, 162, 235)',
        tension: 0.1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-purple-800 text-white">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")'
        }}
      />

      <div className="relative z-10 container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center">Progress Tracking</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-purple-800 rounded-lg shadow-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">Current Weight</h3>
              <FaWeight className="text-2xl" />
            </div>
            <div className="text-3xl font-bold">
              {progressData[progressData.length - 1].weight} kg
            </div>
          </div>

          <div className="bg-purple-800 rounded-lg shadow-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">Weekly Workouts</h3>
              <FaRunning className="text-2xl" />
            </div>
            <div className="text-3xl font-bold">
              {progressData[progressData.length - 1].workouts} workouts
            </div>
          </div>

          <div className="bg-purple-800 rounded-lg shadow-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">Daily Calories</h3>
              <FaDumbbell className="text-2xl" />
            </div>
            <div className="text-3xl font-bold">
              {progressData[progressData.length - 1].calories} kcal
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8">
          <div className="bg-purple-800 rounded-lg shadow-xl p-6">
            <h3 className="text-xl font-semibold mb-4">Weight Progress</h3>
            <Line options={chartOptions} data={weightData} />
          </div>

          <div className="bg-purple-800 rounded-lg shadow-xl p-6">
            <h3 className="text-xl font-semibold mb-4">Workout Frequency</h3>
            <Line options={chartOptions} data={workoutData} />
          </div>

          <div className="bg-purple-800 rounded-lg shadow-xl p-6">
            <h3 className="text-xl font-semibold mb-4">Calorie Intake</h3>
            <Line options={chartOptions} data={calorieData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressTrackingPage; 