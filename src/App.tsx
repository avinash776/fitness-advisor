import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { FaHome, FaDumbbell, FaUser, FaUtensils, FaHeartbeat } from 'react-icons/fa';
import HomePage from './pages/HomePage';
import WorkoutPlanPage from './pages/WorkoutPlanPage';
import ProfilePage from './pages/ProfilePage';
import MealPlanPage from './pages/MealPlanPage';
import HealthPlanPage from './pages/HealthPlanPage';

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: FaHome, label: 'Home' },
    { path: '/workout-plan', icon: FaDumbbell, label: 'Workout' },
    { path: '/meal-plan', icon: FaUtensils, label: 'Meals' },
    { path: '/health-plan', icon: FaHeartbeat, label: 'Health' },
    { path: '/profile', icon: FaUser, label: 'Profile' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-dark">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center transform transition-transform group-hover:scale-110">
              <FaDumbbell className="text-white text-lg" />
            </div>
            <span className="font-heading font-bold text-xl hidden sm:block">
              <span className="gradient-text">Fit</span>
              <span className="text-white">Pro</span>
            </span>
          </Link>

          {/* Navigation Items */}
          <div className="flex items-center space-x-1 sm:space-x-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`nav-item flex flex-col items-center px-3 py-2 rounded-xl transition-all duration-300 ${isActive
                      ? 'active bg-white/5'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                >
                  <Icon className={`nav-icon text-lg sm:text-xl transition-all duration-300 ${isActive ? 'text-primary-500' : ''
                    }`} />
                  <span className="text-[10px] sm:text-xs mt-1 font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Gradient line at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary-500/50 to-transparent" />
    </nav>
  );
};

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-dark-900 text-white">
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