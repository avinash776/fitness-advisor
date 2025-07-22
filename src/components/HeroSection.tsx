import { Link } from 'react-router-dom';
import { FaDumbbell, FaRunning, FaAppleAlt } from 'react-icons/fa';

const HeroSection = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-r from-blue-600 to-purple-600">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")',
          opacity: 0.2
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-white px-4">
        <h1 className="text-5xl md:text-6xl font-bold text-center mb-6">
          Transform Your Fitness Journey
        </h1>
        <p className="text-xl md:text-2xl text-center mb-8 max-w-2xl">
          Get personalized workout plans, nutrition advice, and expert guidance to achieve your fitness goals.
        </p>
        
        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="flex flex-col items-center">
            <FaDumbbell className="text-4xl mb-4" />
            <h3 className="text-xl font-semibold mb-2">Custom Workouts</h3>
            <p className="text-center">Personalized training plans for your goals</p>
          </div>
          <div className="flex flex-col items-center">
            <FaRunning className="text-4xl mb-4" />
            <h3 className="text-xl font-semibold mb-2">Expert Guidance</h3>
            <p className="text-center">Professional trainers at your service</p>
          </div>
          <div className="flex flex-col items-center">
            <FaAppleAlt className="text-4xl mb-4" />
            <h3 className="text-xl font-semibold mb-2">Nutrition Plans</h3>
            <p className="text-center">Balanced diet recommendations</p>
          </div>
        </div>
        
        {/* CTA Buttons */}
        <div className="flex flex-col md:flex-row gap-4">
          <Link
            to="/trainer"
            className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition-colors duration-300"
          >
            Find a Trainer
          </Link>
          <Link
            to="/health-plan"
            className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white/10 transition-colors duration-300"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroSection; 