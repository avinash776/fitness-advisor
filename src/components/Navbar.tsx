import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-sm shadow-md z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors">
            FitWise
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-600 hover:text-gray-800"
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6">
            <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors">
              Home
            </Link>
            <Link to="/trainer" className="text-gray-700 hover:text-blue-600 transition-colors">
              Find Trainer
            </Link>
            <Link to="/workout-plan" className="text-gray-700 hover:text-blue-600 transition-colors">
              Workouts
            </Link>
            <Link to="/meal-plan" className="text-gray-700 hover:text-blue-600 transition-colors">
              Meal Plan
            </Link>
            <Link to="/wellness" className="text-gray-700 hover:text-blue-600 transition-colors">
              Wellness
            </Link>
            <Link to="/progress" className="text-gray-700 hover:text-blue-600 transition-colors">
              Progress
            </Link>
            <Link to="/health-plan" className="text-gray-700 hover:text-blue-600 transition-colors">
              Health Plan
            </Link>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mt-4 space-y-4">
            <Link
              to="/"
              className="block text-gray-700 hover:text-blue-600 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/trainer"
              className="block text-gray-700 hover:text-blue-600 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Find Trainer
            </Link>
            <Link
              to="/workout-plan"
              className="block text-gray-700 hover:text-blue-600 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Workouts
            </Link>
            <Link
              to="/meal-plan"
              className="block text-gray-700 hover:text-blue-600 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Meal Plan
            </Link>
            <Link
              to="/wellness"
              className="block text-gray-700 hover:text-blue-600 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Wellness
            </Link>
            <Link
              to="/progress"
              className="block text-gray-700 hover:text-blue-600 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Progress
            </Link>
            <Link
              to="/health-plan"
              className="block text-gray-700 hover:text-blue-600 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Health Plan
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 