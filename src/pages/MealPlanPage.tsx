import { useState } from 'react';
import { FaUtensils, FaPlus, FaTrash } from 'react-icons/fa';

interface Meal {
  id: number;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  time: string;
}

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

  const handleAddMeal = () => {
    if (newMeal.name && newMeal.time) {
      setMeals([...meals, { ...newMeal, id: meals.length + 1 }]);
      setNewMeal({
        name: '',
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0,
        time: ''
      });
    }
  };

  const handleDeleteMeal = (id: number) => {
    setMeals(meals.filter(meal => meal.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 flex items-center">
          <FaUtensils className="mr-2" />
          Meal Plan
        </h1>

        {/* Add New Meal Form */}
        <div className="bg-gray-800 rounded-lg p-4 mb-8">
          <h2 className="text-xl font-semibold mb-4">Add New Meal</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Meal Name"
              value={newMeal.name}
              onChange={(e) => setNewMeal({ ...newMeal, name: e.target.value })}
              className="bg-gray-700 rounded p-2"
            />
            <input
              type="time"
              value={newMeal.time}
              onChange={(e) => setNewMeal({ ...newMeal, time: e.target.value })}
              className="bg-gray-700 rounded p-2"
            />
            <input
              type="number"
              placeholder="Calories"
              value={newMeal.calories}
              onChange={(e) => setNewMeal({ ...newMeal, calories: Number(e.target.value) })}
              className="bg-gray-700 rounded p-2"
            />
            <input
              type="number"
              placeholder="Protein (g)"
              value={newMeal.protein}
              onChange={(e) => setNewMeal({ ...newMeal, protein: Number(e.target.value) })}
              className="bg-gray-700 rounded p-2"
            />
            <input
              type="number"
              placeholder="Carbs (g)"
              value={newMeal.carbs}
              onChange={(e) => setNewMeal({ ...newMeal, carbs: Number(e.target.value) })}
              className="bg-gray-700 rounded p-2"
            />
            <input
              type="number"
              placeholder="Fat (g)"
              value={newMeal.fat}
              onChange={(e) => setNewMeal({ ...newMeal, fat: Number(e.target.value) })}
              className="bg-gray-700 rounded p-2"
            />
          </div>
          <button
            onClick={handleAddMeal}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded flex items-center"
          >
            <FaPlus className="mr-2" />
            Add Meal
          </button>
        </div>

        {/* Meal List */}
        <div className="bg-gray-800 rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4">Today's Meals</h2>
          <div className="space-y-4">
            {meals.map((meal) => (
              <div key={meal.id} className="bg-gray-700 rounded p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{meal.name}</h3>
                    <p className="text-gray-400">{meal.time}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteMeal(meal.id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <FaTrash />
                  </button>
                </div>
                <div className="grid grid-cols-4 gap-4 mt-2 text-sm">
                  <div>
                    <span className="text-gray-400">Calories:</span>
                    <span className="ml-2">{meal.calories}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Protein:</span>
                    <span className="ml-2">{meal.protein}g</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Carbs:</span>
                    <span className="ml-2">{meal.carbs}g</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Fat:</span>
                    <span className="ml-2">{meal.fat}g</span>
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