import React, { useState, useEffect, useRef } from 'react';
import { FaPlay, FaStop, FaDumbbell, FaFire, FaBolt, FaCheck } from 'react-icons/fa';
import { getAIHealthAdvice } from '../utils/ai';

interface Exercise {
  name: string;
  sets: number;
  reps: number;
  rest: number;
  instructions: string;
  type: 'bodyweight' | 'dumbbell' | 'cardio';
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

// Progress Ring Component
const ProgressRing = ({ progress, size = 120, strokeWidth = 8 }: { progress: number; size?: number; strokeWidth?: number }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <svg width={size} height={size} className="progress-ring">
      {/* Background circle */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="rgba(255, 255, 255, 0.1)"
        strokeWidth={strokeWidth}
      />
      {/* Progress circle */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="url(#progressGradient)"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        className="progress-ring-circle"
      />
      {/* Gradient definition */}
      <defs>
        <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF6B35" />
          <stop offset="100%" stopColor="#00D9FF" />
        </linearGradient>
      </defs>
    </svg>
  );
};

const WorkoutPlanPage = () => {
  const [workoutPlan, setWorkoutPlan] = useState<WorkoutPlan | null>(null);
  const [currentExercise, setCurrentExercise] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [completedExercises, setCompletedExercises] = useState<number[]>([]);
  const formRef = useRef<HTMLFormElement>(null);

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

      await getAIHealthAdvice(prompt);

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
          {
            name: "Lunges",
            sets: 3,
            reps: 10,
            rest: 45,
            instructions: "Step forward and lower your body until both knees are at 90 degrees.",
            type: "bodyweight"
          },
          {
            name: "Plank",
            sets: 3,
            reps: 30,
            rest: 30,
            instructions: "Hold position with body straight, core engaged. Time in seconds.",
            type: "bodyweight"
          },
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

  const markComplete = (index: number) => {
    if (!completedExercises.includes(index)) {
      setCompletedExercises([...completedExercises, index]);
    }
  };

  useEffect(() => {
    if (workoutPlan) {
      setProgress((completedExercises.length / workoutPlan.exercises.length) * 100);
    }
  }, [completedExercises, workoutPlan]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isTimerRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isTimerRunning) {
      setIsTimerRunning(false);
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

  const getExerciseIcon = (type: string) => {
    switch (type) {
      case 'cardio': return FaFire;
      case 'dumbbell': return FaDumbbell;
      default: return FaBolt;
    }
  };

  return (
    <div className="min-h-screen bg-dark-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-mesh opacity-40" />
      <div className="absolute top-20 right-20 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-secondary-500/10 rounded-full blur-3xl" />

      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Your Workout</span> Plan
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Generate a personalized AI-powered workout plan tailored to your goals
          </p>
        </div>

        {!workoutPlan ? (
          <div className="max-w-2xl mx-auto">
            <form ref={formRef} onSubmit={generateWorkoutPlan} className="glass-card rounded-3xl p-8">
              {/* Fitness Level */}
              <div className="mb-8">
                <label className="block text-gray-300 mb-3 font-medium">Fitness Level</label>
                <select
                  value={userPreferences.fitnessLevel}
                  onChange={(e) => setUserPreferences(prev => ({ ...prev, fitnessLevel: e.target.value as UserPreferences['fitnessLevel'] }))}
                  className="select-glass w-full"
                >
                  <option value="beginner">🌱 Beginner</option>
                  <option value="intermediate">💪 Intermediate</option>
                  <option value="advanced">🔥 Advanced</option>
                </select>
              </div>

              {/* Goal */}
              <div className="mb-8">
                <label className="block text-gray-300 mb-3 font-medium">Goal</label>
                <select
                  value={userPreferences.goal}
                  onChange={(e) => setUserPreferences(prev => ({ ...prev, goal: e.target.value as UserPreferences['goal'] }))}
                  className="select-glass w-full"
                >
                  <option value="build_muscle">💪 Build Muscle</option>
                  <option value="lose_weight">🔥 Lose Weight</option>
                  <option value="improve_endurance">🏃 Improve Endurance</option>
                </select>
              </div>

              {/* Preferred Exercises */}
              <div className="mb-8">
                <label className="block text-gray-300 mb-4 font-medium">Preferred Exercises</label>
                <div className="grid grid-cols-3 gap-4">
                  {(['bodyweight', 'dumbbell', 'cardio'] as const).map((type) => (
                    <label
                      key={type}
                      className={`glass-card rounded-xl p-4 cursor-pointer transition-all text-center ${userPreferences.preferredExercises.includes(type)
                          ? 'border-primary-500 bg-primary-500/10'
                          : ''
                        }`}
                    >
                      <input
                        type="checkbox"
                        checked={userPreferences.preferredExercises.includes(type)}
                        onChange={(e) => handleExercisePreferenceChange(type, e.target.checked)}
                        className="checkbox-fitness mb-2"
                      />
                      <div className="text-sm font-medium capitalize">{type}</div>
                    </label>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary w-full py-4 text-lg flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <FaDumbbell />
                    Generate Workout Plan
                  </>
                )}
              </button>
            </form>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            {/* Progress Section */}
            <div className="glass-card rounded-3xl p-8 mb-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h2 className="font-heading text-2xl font-bold mb-2">{workoutPlan.title}</h2>
                  <p className="text-gray-400">{completedExercises.length} of {workoutPlan.exercises.length} exercises completed</p>
                </div>

                <div className="relative">
                  <ProgressRing progress={progress} size={120} strokeWidth={8} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-heading text-2xl font-bold gradient-text">{Math.round(progress)}%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Exercise Cards */}
            <div className="space-y-4">
              {workoutPlan.exercises.map((exercise, index) => {
                const Icon = getExerciseIcon(exercise.type);
                const isCompleted = completedExercises.includes(index);
                const isActive = index === currentExercise;

                return (
                  <div
                    key={index}
                    onClick={() => setCurrentExercise(index)}
                    className={`glass-card rounded-2xl p-6 cursor-pointer transition-all duration-300 ${isActive ? 'border-primary-500/50 shadow-glow-primary' : ''
                      } ${isCompleted ? 'opacity-60' : ''}`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isCompleted
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-gradient-to-br from-primary-500 to-secondary-500 text-white'
                          }`}>
                          {isCompleted ? <FaCheck /> : <Icon />}
                        </div>
                        <div>
                          <h3 className="font-heading text-xl font-semibold">{exercise.name}</h3>
                          <span className="text-gray-400 text-sm capitalize">{exercise.type}</span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={(e) => { e.stopPropagation(); startTimer(exercise.rest); }}
                          className="w-10 h-10 rounded-full glass flex items-center justify-center text-green-400 hover:bg-green-500/20 transition-colors"
                        >
                          <FaPlay className="text-sm" />
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); stopTimer(); }}
                          className="w-10 h-10 rounded-full glass flex items-center justify-center text-red-400 hover:bg-red-500/20 transition-colors"
                        >
                          <FaStop className="text-sm" />
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); markComplete(index); }}
                          className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${isCompleted
                              ? 'bg-green-500/20 text-green-400'
                              : 'glass text-gray-400 hover:text-green-400 hover:bg-green-500/20'
                            }`}
                        >
                          <FaCheck className="text-sm" />
                        </button>
                      </div>
                    </div>

                    {/* Exercise Details */}
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="glass rounded-xl p-3 text-center">
                        <div className="text-primary-400 text-sm mb-1">Sets</div>
                        <div className="font-heading font-bold text-xl">{exercise.sets}</div>
                      </div>
                      <div className="glass rounded-xl p-3 text-center">
                        <div className="text-secondary-400 text-sm mb-1">Reps</div>
                        <div className="font-heading font-bold text-xl">{exercise.reps}</div>
                      </div>
                      <div className="glass rounded-xl p-3 text-center">
                        <div className="text-accent-400 text-sm mb-1">Rest</div>
                        <div className="font-heading font-bold text-xl">{exercise.rest}s</div>
                      </div>
                    </div>

                    <p className="text-gray-400 text-sm">{exercise.instructions}</p>
                  </div>
                );
              })}
            </div>

            {/* New Workout Button */}
            <button
              onClick={() => { setWorkoutPlan(null); setCompletedExercises([]); setProgress(0); }}
              className="btn-secondary w-full mt-8 py-4"
            >
              Generate New Workout
            </button>
          </div>
        )}
      </div>

      {/* Floating Timer */}
      {isTimerRunning && (
        <div className="fixed bottom-8 right-8 glass-card rounded-2xl p-6 animate-scale-in shadow-glow-primary">
          <div className="text-center">
            <div className="text-gray-400 text-sm mb-1">Rest Timer</div>
            <div className="font-heading text-4xl font-bold gradient-text">{timeLeft}s</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkoutPlanPage;