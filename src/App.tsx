import React, { useState } from 'react';
import { Dumbbell, MessageCircle, BookOpen, Apple, Calculator, TrendingUp, Menu, X, Zap, Target, Users, Award } from 'lucide-react';
import ChatTrainer from './components/ChatTrainer';
import WorkoutPlanner from './components/WorkoutPlanner';
import ExerciseLibrary from './components/ExerciseLibrary';
import NutritionAdvisor from './components/NutritionAdvisor';
import FitnessCalculator from './components/FitnessCalculator';
import ProgressTracker from './components/ProgressTracker';

function App() {
  const [activeTab, setActiveTab] = useState('chat');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const tabs = [
    { id: 'chat', name: 'AI Trainer', icon: MessageCircle },
    { id: 'workouts', name: 'Workouts', icon: Dumbbell },
    { id: 'exercises', name: 'Exercises', icon: BookOpen },
    { id: 'nutrition', name: 'Nutrition', icon: Apple },
    { id: 'calculator', name: 'Calculator', icon: Calculator },
    { id: 'progress', name: 'Progress', icon: TrendingUp },
  ];

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'chat':
        return <ChatTrainer />;
      case 'workouts':
        return <WorkoutPlanner />;
      case 'exercises':
        return <ExerciseLibrary />;
      case 'nutrition':
        return <NutritionAdvisor />;
      case 'calculator':
        return <FitnessCalculator />;
      case 'progress':
        return <ProgressTracker />;
      default:
        return <ChatTrainer />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-lg border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                <Dumbbell className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">FitAI Trainer</h1>
                <p className="text-xs text-gray-400">Your Personal AI Fitness Coach</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
                      : 'text-gray-300 hover:text-white hover:bg-gray-800'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span className="hidden lg:block">{tab.name}</span>
                </button>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-black/30 backdrop-blur-lg border-t border-gray-800">
            <div className="px-4 py-3 space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`flex items-center space-x-3 w-full px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white'
                      : 'text-gray-300 hover:text-white hover:bg-gray-800'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Hero Section - Only show on chat tab */}
      {activeTab === 'chat' && (
        <div className="relative bg-gradient-to-r from-orange-600/20 to-red-600/20 border-b border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
                Your AI <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">Fitness Coach</span>
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                Get personalized workouts, nutrition advice, and expert guidance from our advanced AI trainer - completely free, no login required.
              </p>
              <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
                <div className="flex items-center space-x-2">
                  <Zap className="w-4 h-4 text-orange-400" />
                  <span>Instant AI Responses</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Target className="w-4 h-4 text-orange-400" />
                  <span>Personalized Plans</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-orange-400" />
                  <span>Expert Knowledge</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="w-4 h-4 text-orange-400" />
                  <span>100% Free</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderActiveComponent()}
      </main>

      {/* Footer */}
      <footer className="bg-black/20 backdrop-blur-lg border-t border-gray-800 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                <Dumbbell className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold text-white">FitAI Trainer</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Powered by advanced AI technology to help you achieve your fitness goals
            </p>
            <p className="text-gray-500 text-xs">
              © 2025 FitAI Trainer. Free fitness coaching for everyone.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;