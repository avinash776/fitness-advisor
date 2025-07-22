import React, { useState } from 'react';
import { FaPlay, FaPause, FaStop, FaEdit, FaSave, FaDumbbell, FaRunning, FaHeartbeat } from 'react-icons/fa';
import { getAIHealthAdvice } from '../utils/ai';

interface Exercise {
  name: string;
  sets: number;
  reps: number;
  rest: number;
  instructions: string;
  type: 'bodyweight' | 'dumbbell' | 'cardio';
  videoUrl?: string;
}

interface WorkoutPlan {
  title: string;
  exercises: Exercise[];
}

interface UserPreferences {
  fitnessLevel: 'beginner' | 'intermediate' | 'advanced';
  goal: 'build_muscle' | 'lose_weight' | 'improve_endurance';
  preferredExercises: ('bodyweight' | 'dumbbell' | 'cardio')[];
}

const WorkoutPlanPage = () => {
  const [workoutPlan, setWorkoutPlan] = useState<WorkoutPlan | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [currentExercise, setCurrentExercise] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [userPreferences, setUserPreferences] = useState<UserPreferences>({
    fitnessLevel: 'beginner',
    goal: 'build_muscle',
    preferredExercises: ['bodyweight']
  });

  const generateWorkoutPlan = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const prompt = `Generate a detailed workout plan for a ${userPreferences.fitnessLevel} level person with the goal of ${userPreferences.goal}. 
        Preferred exercise types: ${userPreferences.preferredExercises.join(', ')}. 
        Include 5-10 exercises with sets, reps, rest periods, and detailed instructions.`;
      
      const response = await getAIHealthAdvice(prompt);
      
      // Parse the AI response into a workout plan
      // This is a simplified example - you'd want to parse the actual AI response
      setWorkoutPlan({
        title: `${userPreferences.fitnessLevel.charAt(0).toUpperCase() + userPreferences.fitnessLevel.slice(1)} ${userPreferences.goal.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} Workout`,
        exercises: [
          {
            name: "Push-ups",
            sets: 3,
            reps: 12,
            rest: 60,
            instructions: "Keep your body straight and lower your chest to the ground.",
            type: "bodyweight"
          },
          {
            name: "Squats",
            sets: 3,
            reps: 15,
            rest: 60,
            instructions: "Keep your back straight and lower until thighs are parallel to ground.",
            type: "bodyweight"
          },
          // Add more exercises...
        ]
      });
    } catch (error) {
      console.error('Error generating workout plan:', error);
    }
    setIsLoading(false);
  };

  const startTimer = (seconds: number) => {
    setTimeLeft(seconds);
    setIsTimerRunning(true);
  };

  const stopTimer = () => {
    setIsTimerRunning(false);
    setTimeLeft(0);
  };

  const updateProgress = () => {
    if (workoutPlan) {
      const totalExercises = workoutPlan.exercises.length;
      const completedExercises = currentExercise + 1;
      setProgress((completedExercises / totalExercises) * 100);
    }
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

  const handleExercisePreferenceChange = (exerciseType: 'bodyweight' | 'dumbbell' | 'cardio', checked: boolean) => {
    setUserPreferences(prev => ({
      ...prev,
      preferredExercises: checked
        ? [...prev.preferredExercises, exerciseType]
        : prev.preferredExercises.filter(ex => ex !== exerciseType)
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")'
        }}
      />

      <div className="relative z-10 container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center">Your Workout Plan</h1>

        {!workoutPlan ? (
          <div className="max-w-2xl mx-auto">
            <form onSubmit={generateWorkoutPlan} className="bg-gray-800 rounded-lg shadow-xl p-6">
              <div className="mb-6">
                <label className="block text-gray-300 mb-2">Fitness Level</label>
                <select
                  value={userPreferences.fitnessLevel}
                  onChange={(e) => setUserPreferences(prev => ({ ...prev, fitnessLevel: e.target.value as UserPreferences['fitnessLevel'] }))}
                  className="w-full p-3 bg-gray-700 rounded-lg text-white"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>

              <div className="mb-6">
                <label className="block text-gray-300 mb-2">Goal</label>
                <select
                  value={userPreferences.goal}
                  onChange={(e) => setUserPreferences(prev => ({ ...prev, goal: e.target.value as UserPreferences['goal'] }))}
                  className="w-full p-3 bg-gray-700 rounded-lg text-white"
                >
                  <option value="build_muscle">Build Muscle</option>
                  <option value="lose_weight">Lose Weight</option>
                  <option value="improve_endurance">Improve Endurance</option>
                </select>
              </div>

              <div className="mb-6">
                <label className="block text-gray-300 mb-2">Preferred Exercises</label>
                <div className="grid grid-cols-3 gap-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={userPreferences.preferredExercises.includes('bodyweight')}
                      onChange={(e) => handleExercisePreferenceChange('bodyweight', e.target.checked)}
                      className="form-checkbox h-5 w-5 text-blue-600"
                    />
                    <span>Bodyweight</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={userPreferences.preferredExercises.includes('dumbbell')}
                      onChange={(e) => handleExercisePreferenceChange('dumbbell', e.target.checked)}
                      className="form-checkbox h-5 w-5 text-blue-600"
                    />
                    <span>Dumbbells</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={userPreferences.preferredExercises.includes('cardio')}
                      onChange={(e) => handleExercisePreferenceChange('cardio', e.target.checked)}
                      className="form-checkbox h-5 w-5 text-blue-600"
                    />
                    <span>Cardio</span>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {isLoading ? 'Generating...' : 'Generate Workout Plan'}
              </button>
            </form>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-800 rounded-lg shadow-xl p-6 mb-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">{workoutPlan.title}</h2>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="text-blue-400 hover:text-blue-300"
                >
                  {isEditing ? <FaSave /> : <FaEdit />}
                </button>
              </div>

              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-400">Progress</span>
                  <span className="text-gray-400">{Math.round(progress)}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {workoutPlan.exercises.map((exercise, index) => (
                <div
                  key={index}
                  className={`mb-6 p-4 rounded-lg ${
                    index === currentExercise
                      ? 'bg-blue-600'
                      : 'bg-gray-700'
                  }`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-xl font-semibold">{exercise.name}</h3>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => startTimer(exercise.rest)}
                        className="text-green-400 hover:text-green-300"
                      >
                        <FaPlay />
                      </button>
                      <button
                        onClick={stopTimer}
                        className="text-red-400 hover:text-red-300"
                      >
                        <FaStop />
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mb-2">
                    <div>
                      <span className="text-gray-400">Sets:</span>
                      <span className="ml-2">{exercise.sets}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Reps:</span>
                      <span className="ml-2">{exercise.reps}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Rest:</span>
                      <span className="ml-2">{exercise.rest}s</span>
                    </div>
                  </div>
                  <p className="text-gray-300 mb-4">{exercise.instructions}</p>
                  {exercise.videoUrl && (
                    <div className="mt-4">
                      <a
                        href={exercise.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300"
                      >
                        Watch Exercise Demo
                      </a>
                    </div>
                  )}
                </div>
              ))}

              {isTimerRunning && (
                <div className="fixed bottom-4 right-4 bg-blue-600 text-white p-4 rounded-lg shadow-lg">
                  <div className="text-2xl font-bold">{timeLeft}s</div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkoutPlanPage; 