import { Link } from 'react-router-dom';
import { FaDumbbell, FaRunning, FaAppleAlt, FaChartLine, FaRobot, FaHeart } from 'react-icons/fa';
import { useEffect, useState } from 'react';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const stats = [
    { number: '10K+', label: 'Active Users' },
    { number: '500+', label: 'Workouts' },
    { number: '98%', label: 'Satisfaction' },
  ];

  const features = [
    {
      icon: FaDumbbell,
      title: 'Smart Workouts',
      desc: 'AI-powered training plans tailored to your goals',
      color: 'from-primary-500 to-primary-600'
    },
    {
      icon: FaRunning,
      title: 'Track Progress',
      desc: 'Real-time analytics and performance insights',
      color: 'from-secondary-500 to-secondary-600'
    },
    {
      icon: FaAppleAlt,
      title: 'Nutrition AI',
      desc: 'Personalized meal plans and macro tracking',
      color: 'from-accent-500 to-accent-600'
    },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-dark-900">
      {/* Animated Mesh Gradient Background */}
      <div className="absolute inset-0 bg-mesh opacity-60" />

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-secondary-500/10 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute top-1/2 left-1/3 w-40 h-40 bg-accent-500/10 rounded-full blur-2xl animate-float" style={{ animationDelay: '1s' }} />
      </div>

      {/* Floating Fitness Icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <FaDumbbell className="absolute top-24 right-20 text-6xl text-primary-500 animate-float" style={{ animationDelay: '0.5s' }} />
        <FaHeart className="absolute bottom-32 left-20 text-5xl text-secondary-500 animate-float-slow" style={{ animationDelay: '1s' }} />
        <FaChartLine className="absolute top-1/3 right-1/4 text-4xl text-accent-500 animate-float" style={{ animationDelay: '1.5s' }} />
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 min-h-screen flex flex-col justify-center">

        {/* Hero Text */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
            <FaRobot className="text-primary-500" />
            <span className="text-sm font-medium text-gray-300">Powered by AI</span>
          </div>

          <h1 className="font-heading text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Transform Your
            <br />
            <span className="gradient-text">Fitness Journey</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto mb-10">
            Get personalized workout plans, AI-powered nutrition advice, and track your progress with cutting-edge technology.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/workout-plan"
              className="btn-primary btn-glow px-8 py-4 text-lg inline-flex items-center justify-center gap-2"
            >
              <FaDumbbell />
              Start Training
            </Link>
            <Link
              to="/health-plan"
              className="btn-secondary px-8 py-4 text-lg inline-flex items-center justify-center gap-2"
            >
              <FaRobot />
              AI Health Advisor
            </Link>
          </div>
        </div>

        {/* Stats Section */}
        <div className={`grid grid-cols-3 gap-4 md:gap-8 max-w-2xl mx-auto mb-20 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-4 rounded-2xl glass-card"
            >
              <div className="font-heading text-3xl md:text-4xl font-bold gradient-text mb-1">
                {stat.number}
              </div>
              <div className="text-gray-400 text-sm md:text-base">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Feature Cards */}
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="glass-card glass-card-hover rounded-2xl p-6 text-center group"
              >
                <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center transform transition-transform group-hover:scale-110 group-hover:rotate-3`}>
                  <Icon className="text-2xl text-white" />
                </div>
                <h3 className="font-heading text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-subtle">
          <div className="w-6 h-10 rounded-full border-2 border-gray-600 flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-primary-500 rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;