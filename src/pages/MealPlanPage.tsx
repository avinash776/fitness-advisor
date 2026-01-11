import { useState, useMemo } from 'react';
import { FaUtensils, FaPlus, FaTrash, FaFire, FaDrumstickBite, FaBreadSlice, FaTint } from 'react-icons/fa';

interface Meal {
  id: number;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  time: string;
}

// Circular Progress Component for Macros
const MacroCircle = ({ value, max, color, label, icon: Icon }: {
  value: number;
  max: number;
  color: string;
  label: string;
  icon: React.ElementType;
}) => {
  const percentage = Math.min((value / max) * 100, 100);
  const circumference = 2 * Math.PI * 36;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-24 h-24">
        <svg className="w-24 h-24 transform -rotate-90">
          <circle
            cx="48"
            cy="48"
            r="36"
            fill="none"
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth="6"
          />
          <circle
            cx="48"
            cy="48"
            r="36"
            fill="none"
            stroke={color}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-all duration-500"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <Icon className="text-lg mb-1" style={{ color }} />
          <span className="font-heading font-bold text-lg">{value}g</span>
        </div>
      </div>
      <span className="text-gray-400 text-sm mt-2">{label}</span>
    </div>
  );
};

const MealPlanPage = () => {
  const [meals, setMeals] = useState<Meal[]>([
    {
      id: 1,
      name: 'Breakfast - Oatmeal with Berries',
      calories: 350,
      protein: 12,
      carbs: 45,
      fat: 8,
      time: '08:00'
    },
    {
      id: 2,
      name: 'Lunch - Grilled Chicken Salad',
      calories: 450,
      protein: 35,
      carbs: 25,
      fat: 15,
      time: '12:30'
    },
    {
      id: 3,
      name: 'Dinner - Salmon with Vegetables',
      calories: 550,
      protein: 40,
      carbs: 30,
      fat: 20,
      time: '18:00'
    }
  ]);

  const [newMeal, setNewMeal] = useState<Omit<Meal, 'id'>>({
    name: '',
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    time: ''
  });

  const [isFormOpen, setIsFormOpen] = useState(false);

  const totals = useMemo(() => ({
    calories: meals.reduce((sum, meal) => sum + meal.calories, 0),
    protein: meals.reduce((sum, meal) => sum + meal.protein, 0),
    carbs: meals.reduce((sum, meal) => sum + meal.carbs, 0),
    fat: meals.reduce((sum, meal) => sum + meal.fat, 0),
  }), [meals]);

  const handleAddMeal = () => {
    if (newMeal.name && newMeal.time) {
      setMeals([...meals, { ...newMeal, id: Date.now() }]);
      setNewMeal({
        name: '',
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0,
        time: ''
      });
      setIsFormOpen(false);
    }
  };

  const handleDeleteMeal = (id: number) => {
    setMeals(meals.filter(meal => meal.id !== id));
  };

  const getMealTypeColor = (time: string) => {
    const hour = parseInt(time.split(':')[0]);
    if (hour < 11) return 'from-yellow-500 to-orange-500';
    if (hour < 15) return 'from-green-500 to-teal-500';
    return 'from-purple-500 to-pink-500';
  };

  const getMealTypeLabel = (time: string) => {
    const hour = parseInt(time.split(':')[0]);
    if (hour < 11) return '🌅 Breakfast';
    if (hour < 15) return '☀️ Lunch';
    if (hour < 18) return '🍵 Snack';
    return '🌙 Dinner';
  };

  return (
    <div className="min-h-screen bg-dark-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-mesh opacity-40" />
      <div className="absolute top-40 left-20 w-72 h-72 bg-green-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />

      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Nutrition</span> Tracker
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Track your daily meals and monitor your macro intake
          </p>
        </div>

        {/* Daily Summary Card */}
        <div className="glass-card rounded-3xl p-8 mb-8 max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Calories */}
            <div className="text-center">
              <div className="relative w-32 h-32 mx-auto mb-4">
                <svg className="w-32 h-32 transform -rotate-90">
                  <circle
                    cx="64"
                    cy="64"
                    r="54"
                    fill="none"
                    stroke="rgba(255, 255, 255, 0.1)"
                    strokeWidth="8"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="54"
                    fill="none"
                    stroke="url(#calorieGradient)"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={2 * Math.PI * 54}
                    strokeDashoffset={2 * Math.PI * 54 - (Math.min(totals.calories / 2000, 1) * 2 * Math.PI * 54)}
                    className="transition-all duration-500"
                  />
                  <defs>
                    <linearGradient id="calorieGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FF6B35" />
                      <stop offset="100%" stopColor="#00D9FF" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <FaFire className="text-primary-500 text-xl mb-1" />
                  <span className="font-heading font-bold text-2xl">{totals.calories}</span>
                  <span className="text-gray-400 text-xs">/ 2000</span>
                </div>
              </div>
              <span className="text-gray-300 font-medium">Calories</span>
            </div>

            {/* Macros */}
            <div className="flex gap-8">
              <MacroCircle
                value={totals.protein}
                max={150}
                color="#00D9FF"
                label="Protein"
                icon={FaDrumstickBite}
              />
              <MacroCircle
                value={totals.carbs}
                max={250}
                color="#FF6B35"
                label="Carbs"
                icon={FaBreadSlice}
              />
              <MacroCircle
                value={totals.fat}
                max={65}
                color="#8B5CF6"
                label="Fat"
                icon={FaTint}
              />
            </div>
          </div>
        </div>

        {/* Add Meal Button */}
        <div className="max-w-4xl mx-auto mb-8">
          {!isFormOpen ? (
            <button
              onClick={() => setIsFormOpen(true)}
              className="btn-primary w-full py-4 flex items-center justify-center gap-2"
            >
              <FaPlus />
              Add New Meal
            </button>
          ) : (
            <div className="glass-card rounded-3xl p-8 animate-scale-in">
              <h2 className="font-heading text-xl font-semibold mb-6 flex items-center gap-2">
                <FaUtensils className="text-primary-500" />
                Add New Meal
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <input
                  type="text"
                  placeholder="Meal Name"
                  value={newMeal.name}
                  onChange={(e) => setNewMeal({ ...newMeal, name: e.target.value })}
                  className="input-glass"
                />
                <input
                  type="time"
                  value={newMeal.time}
                  onChange={(e) => setNewMeal({ ...newMeal, time: e.target.value })}
                  className="input-glass"
                />
                <input
                  type="number"
                  placeholder="Calories"
                  value={newMeal.calories || ''}
                  onChange={(e) => setNewMeal({ ...newMeal, calories: Number(e.target.value) })}
                  className="input-glass"
                />
                <input
                  type="number"
                  placeholder="Protein (g)"
                  value={newMeal.protein || ''}
                  onChange={(e) => setNewMeal({ ...newMeal, protein: Number(e.target.value) })}
                  className="input-glass"
                />
                <input
                  type="number"
                  placeholder="Carbs (g)"
                  value={newMeal.carbs || ''}
                  onChange={(e) => setNewMeal({ ...newMeal, carbs: Number(e.target.value) })}
                  className="input-glass"
                />
                <input
                  type="number"
                  placeholder="Fat (g)"
                  value={newMeal.fat || ''}
                  onChange={(e) => setNewMeal({ ...newMeal, fat: Number(e.target.value) })}
                  className="input-glass"
                />
              </div>
              <div className="flex gap-4">
                <button onClick={handleAddMeal} className="btn-primary flex-1 py-3">
                  Add Meal
                </button>
                <button onClick={() => setIsFormOpen(false)} className="btn-secondary flex-1 py-3">
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Meal List */}
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading text-2xl font-semibold mb-6">Today's Meals</h2>
          <div className="space-y-4">
            {meals.map((meal, index) => (
              <div
                key={meal.id}
                className="glass-card glass-card-hover rounded-2xl p-6"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getMealTypeColor(meal.time)} flex items-center justify-center`}>
                      <FaUtensils className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-lg">{meal.name}</h3>
                      <span className="text-gray-400 text-sm">{getMealTypeLabel(meal.time)} • {meal.time}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDeleteMeal(meal.id)}
                    className="w-10 h-10 rounded-full glass flex items-center justify-center text-red-400 hover:bg-red-500/20 transition-colors"
                  >
                    <FaTrash className="text-sm" />
                  </button>
                </div>

                <div className="grid grid-cols-4 gap-3">
                  <div className="glass rounded-xl p-3 text-center">
                    <div className="text-primary-400 text-xs mb-1">Calories</div>
                    <div className="font-heading font-bold">{meal.calories}</div>
                  </div>
                  <div className="glass rounded-xl p-3 text-center">
                    <div className="text-secondary-400 text-xs mb-1">Protein</div>
                    <div className="font-heading font-bold">{meal.protein}g</div>
                  </div>
                  <div className="glass rounded-xl p-3 text-center">
                    <div className="text-orange-400 text-xs mb-1">Carbs</div>
                    <div className="font-heading font-bold">{meal.carbs}g</div>
                  </div>
                  <div className="glass rounded-xl p-3 text-center">
                    <div className="text-accent-400 text-xs mb-1">Fat</div>
                    <div className="font-heading font-bold">{meal.fat}g</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealPlanPage;