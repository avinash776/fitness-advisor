import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { FaHome, FaDumbbell, FaUser, FaUtensils, FaHeartbeat } from 'react-icons/fa';
import HomePage from './pages/HomePage';
import WorkoutPlanPage from './pages/WorkoutPlanPage';
import ProfilePage from './pages/ProfilePage';
import MealPlanPage from './pages/MealPlanPage';
import HealthPlanPage from './pages/HealthPlanPage';

const Navigation = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path ? 'text-white' : 'text-gray-400 hover:text-white';
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-gray-800 border-b border-gray-700 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-around items-center h-16">
          <Link to="/" className={`flex flex-col items-center ${isActive('/')}`}>
            <FaHome className="text-xl" />
            <span className="text-xs mt-1">Home</span>
          </Link>
          <Link to="/workout-plan" className={`flex flex-col items-center ${isActive('/workout-plan')}`}>
            <FaDumbbell className="text-xl" />
            <span className="text-xs mt-1">Workout</span>
          </Link>
          <Link to="/meal-plan" className={`flex flex-col items-center ${isActive('/meal-plan')}`}>
            <FaUtensils className="text-xl" />
            <span className="text-xs mt-1">Meal Plan</span>
          </Link>
          <Link to="/health-plan" className={`flex flex-col items-center ${isActive('/health-plan')}`}>
            <FaHeartbeat className="text-xl" />
            <span className="text-xs mt-1">Health Plan</span>
          </Link>
          <Link to="/profile" className={`flex flex-col items-center ${isActive('/profile')}`}>
            <FaUser className="text-xl" />
            <span className="text-xs mt-1">Profile</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-white">
        <Navigation />
        
        {/* Main Content with top padding to account for fixed navbar */}
        <main className="pt-16">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/workout-plan" element={<WorkoutPlanPage />} />
            <Route path="/meal-plan" element={<MealPlanPage />} />
            <Route path="/health-plan" element={<HealthPlanPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App; 