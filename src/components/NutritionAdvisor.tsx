import React, { useState } from 'react';
import { Apple, Calculator, Clock, Target, TrendingUp, Utensils } from 'lucide-react';

interface NutritionPlan {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  meals: Meal[];
}

interface Meal {
  name: string;
  time: string;
  calories: number;
  items: string[];
  tips: string[];
}

const NutritionAdvisor: React.FC = () => {
  const [activeTab, setActiveTab] = useState('calculator');
  const [userStats, setUserStats] = useState({
    age: '',
    weight: '',
    height: '',
    gender: 'male',
    activity: 'moderate',
    goal: 'maintain'
  });
  const [nutritionPlan, setNutritionPlan] = useState<NutritionPlan | null>(null);

  const calculateNutrition = () => {
    const weight = parseFloat(userStats.weight);
    const height = parseFloat(userStats.height);
    const age = parseFloat(userStats.age);

    // Calculate BMR using Mifflin-St Jeor Equation
    let bmr;
    if (userStats.gender === 'male') {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    // Activity multipliers
    const activityMultipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      very_active: 1.9
    };

    const tdee = bmr * activityMultipliers[userStats.activity as keyof typeof activityMultipliers];

    // Goal adjustments
    let calories = tdee;
    if (userStats.goal === 'lose') calories = tdee - 500;
    if (userStats.goal === 'gain') calories = tdee + 500;

    // Macronutrient distribution
    const protein = weight * 2.2; // 1g per lb of body weight
    const fat = calories * 0.25 / 9; // 25% of calories from fat
    const carbs = (calories - (protein * 4) - (fat * 9)) / 4; // Remaining calories from carbs

    const plan: NutritionPlan = {
      calories: Math.round(calories),
      protein: Math.round(protein),
      carbs: Math.round(carbs),
      fat: Math.round(fat),
      meals: [
        {
          name: 'Breakfast',
          time: '7:00 AM',
          calories: Math.round(calories * 0.25),
          items: [
            '3 whole eggs + 2 egg whites scrambled',
            '1 slice whole grain toast',
            '1/2 avocado',
            '1 cup berries',
            'Green tea or coffee'
          ],
          tips: [
            'High protein start boosts metabolism',
            'Healthy fats keep you satisfied',
            'Fiber from fruits aids digestion'
          ]
        },
        {
          name: 'Mid-Morning Snack',
          time: '10:00 AM',
          calories: Math.round(calories * 0.1),
          items: [
            '1 apple with 2 tbsp almond butter',
            'Or: Greek yogurt with nuts'
          ],
          tips: [
            'Prevents mid-morning energy crash',
            'Combines protein and healthy carbs'
          ]
        },
        {
          name: 'Lunch',
          time: '1:00 PM',
          calories: Math.round(calories * 0.3),
          items: [
            '6oz grilled chicken breast',
            '1.5 cups quinoa or brown rice',
            'Large mixed salad with olive oil',
            '1 cup steamed vegetables'
          ],
          tips: [
            'Lean protein supports muscle building',
            'Complex carbs provide sustained energy',
            'Vegetables add essential micronutrients'
          ]
        },
        {
          name: 'Pre-Workout Snack',
          time: '3:30 PM',
          calories: Math.round(calories * 0.05),
          items: [
            '1 banana with 1 tbsp peanut butter',
            'Or: handful of dates'
          ],
          tips: [
            'Quick energy for workouts',
            'Easy to digest carbohydrates'
          ]
        },
        {
          name: 'Dinner',
          time: '7:00 PM',
          calories: Math.round(calories * 0.25),
          items: [
            '6oz salmon or lean beef',
            '1 large sweet potato',
            'Roasted vegetables with herbs',
            'Side salad with lemon dressing'
          ],
          tips: [
            'Omega-3 fatty acids support recovery',
            'Post-workout nutrition window',
            'Lighter dinner aids sleep quality'
          ]
        },
        {
          name: 'Evening Snack',
          time: '9:00 PM',
          calories: Math.round(calories * 0.05),
          items: [
            'Casein protein shake',
            'Or: cottage cheese with berries'
          ],
          tips: [
            'Slow-digesting protein for overnight recovery',
            'Satisfies late-night cravings healthily'
          ]
        }
      ]
    };

    setNutritionPlan(plan);
  };

  const tabs = [
    { id: 'calculator', name: 'Calculator', icon: Calculator },
    { id: 'tips', name: 'Nutrition Tips', icon: Apple },
    { id: 'foods', name: 'Food Guide', icon: Utensils },
  ];

  const nutritionTips = [
    {
      title: 'Hydration is Key',
      description: 'Drink at least 8-10 glasses of water daily. Proper hydration supports metabolism, digestion, and exercise performance.',
      icon: '💧'
    },
    {
      title: 'Protein Timing',
      description: 'Consume protein within 30 minutes post-workout to maximize muscle protein synthesis and recovery.',
      icon: '🥩'
    },
    {
      title: 'Carb Cycling',
      description: 'Time your carbohydrate intake around workouts for optimal energy and recovery while supporting fat loss goals.',
      icon: '🍠'
    },
    {
      title: 'Meal Prep Success',
      description: 'Prepare meals in advance to ensure consistent nutrition and avoid impulsive food choices.',
      icon: '📦'
    },
    {
      title: 'Micronutrients Matter',
      description: 'Include a variety of colorful fruits and vegetables to ensure adequate vitamin and mineral intake.',
      icon: '🌈'
    },
    {
      title: 'Healthy Fats',
      description: 'Include sources like avocados, nuts, and olive oil for hormone production and nutrient absorption.',
      icon: '🥑'
    }
  ];

  const foodCategories = [
    {
      name: 'Lean Proteins',
      foods: ['Chicken breast', 'Turkey', 'Fish', 'Eggs', 'Greek yogurt', 'Tofu', 'Legumes'],
      color: 'bg-blue-500/20 text-blue-400'
    },
    {
      name: 'Complex Carbs',
      foods: ['Quinoa', 'Brown rice', 'Sweet potato', 'Oats', 'Whole grain bread', 'Fruits'],
      color: 'bg-green-500/20 text-green-400'
    },
    {
      name: 'Healthy Fats',
      foods: ['Avocado', 'Nuts', 'Seeds', 'Olive oil', 'Fatty fish', 'Coconut oil'],
      color: 'bg-yellow-500/20 text-yellow-400'
    },
    {
      name: 'Vegetables',
      foods: ['Spinach', 'Broccoli', 'Bell peppers', 'Carrots', 'Tomatoes', 'Cucumber'],
      color: 'bg-purple-500/20 text-purple-400'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-4">AI Nutrition Advisor</h2>
        <p className="text-gray-400 text-lg">Get personalized nutrition plans and expert dietary guidance</p>
      </div>

      {/* Tab Navigation */}
      <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl border border-gray-700 p-2">
        <div className="flex space-x-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex-1 justify-center ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Calculator Tab */}
      {activeTab === 'calculator' && (
        <div className="space-y-6">
          <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl border border-gray-700 p-6">
            <h3 className="text-xl font-semibold text-white mb-6">Nutrition Calculator</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block text-gray-400 text-sm mb-2">Age</label>
                <input
                  type="number"
                  value={userStats.age}
                  onChange={(e) => setUserStats({...userStats, age: e.target.value})}
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
                  placeholder="Years"
                />
              </div>
              
              <div>
                <label className="block text-gray-400 text-sm mb-2">Weight</label>
                <input
                  type="number"
                  value={userStats.weight}
                  onChange={(e) => setUserStats({...userStats, weight: e.target.value})}
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
                  placeholder="kg"
                />
              </div>
              
              <div>
                <label className="block text-gray-400 text-sm mb-2">Height</label>
                <input
                  type="number"
                  value={userStats.height}
                  onChange={(e) => setUserStats({...userStats, height: e.target.value})}
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
                  placeholder="cm"
                />
              </div>
              
              <div>
                <label className="block text-gray-400 text-sm mb-2">Gender</label>
                <select
                  value={userStats.gender}
                  onChange={(e) => setUserStats({...userStats, gender: e.target.value})}
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              
              <div>
                <label className="block text-gray-400 text-sm mb-2">Activity Level</label>
                <select
                  value={userStats.activity}
                  onChange={(e) => setUserStats({...userStats, activity: e.target.value})}
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
                >
                  <option value="sedentary">Sedentary</option>
                  <option value="light">Light Exercise</option>
                  <option value="moderate">Moderate Exercise</option>
                  <option value="active">Active</option>
                  <option value="very_active">Very Active</option>
                </select>
              </div>
              
              <div>
                <label className="block text-gray-400 text-sm mb-2">Goal</label>
                <select
                  value={userStats.goal}
                  onChange={(e) => setUserStats({...userStats, goal: e.target.value})}
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
                >
                  <option value="lose">Weight Loss</option>
                  <option value="maintain">Maintain Weight</option>
                  <option value="gain">Weight Gain</option>
                </select>
              </div>
            </div>
            
            <button
              onClick={calculateNutrition}
              disabled={!userStats.age || !userStats.weight || !userStats.height}
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-all duration-200"
            >
              Calculate My Nutrition Plan
            </button>
          </div>

          {/* Nutrition Plan Results */}
          {nutritionPlan && (
            <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl border border-gray-700 p-6">
              <h3 className="text-xl font-semibold text-white mb-6">Your Personalized Nutrition Plan</h3>
              
              {/* Macros Overview */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-blue-400">{nutritionPlan.calories}</div>
                  <div className="text-blue-300 text-sm">Calories</div>
                </div>
                <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-green-400">{nutritionPlan.protein}g</div>
                  <div className="text-green-300 text-sm">Protein</div>
                </div>
                <div className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-yellow-400">{nutritionPlan.carbs}g</div>
                  <div className="text-yellow-300 text-sm">Carbs</div>
                </div>
                <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-purple-400">{nutritionPlan.fat}g</div>
                  <div className="text-purple-300 text-sm">Fat</div>
                </div>
              </div>

              {/* Meal Plan */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-white">Daily Meal Plan</h4>
                {nutritionPlan.meals.map((meal, index) => (
                  <div key={index} className="bg-gray-700/50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h5 className="text-white font-medium flex items-center">
                        <Clock className="w-4 h-4 mr-2 text-orange-400" />
                        {meal.name} - {meal.time}
                      </h5>
                      <span className="text-orange-400 text-sm">{meal.calories} cal</span>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h6 className="text-gray-400 text-sm mb-2">Food Items:</h6>
                        <ul className="text-gray-300 text-sm space-y-1">
                          {meal.items.map((item, itemIndex) => (
                            <li key={itemIndex} className="flex items-start">
                              <span className="text-orange-400 mr-2">•</span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h6 className="text-gray-400 text-sm mb-2">Tips:</h6>
                        <ul className="text-gray-300 text-sm space-y-1">
                          {meal.tips.map((tip, tipIndex) => (
                            <li key={tipIndex} className="flex items-start">
                              <span className="text-green-400 mr-2">✓</span>
                              {tip}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tips Tab */}
      {activeTab === 'tips' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {nutritionTips.map((tip, index) => (
            <div key={index} className="bg-gray-800/50 backdrop-blur-lg rounded-xl border border-gray-700 p-6">
              <div className="flex items-start space-x-4">
                <div className="text-3xl">{tip.icon}</div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">{tip.title}</h3>
                  <p className="text-gray-400">{tip.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Foods Tab */}
      {activeTab === 'foods' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {foodCategories.map((category, index) => (
            <div key={index} className="bg-gray-800/50 backdrop-blur-lg rounded-xl border border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">{category.name}</h3>
              <div className="flex flex-wrap gap-2">
                {category.foods.map((food, foodIndex) => (
                  <span
                    key={foodIndex}
                    className={`px-3 py-1 rounded-full text-sm ${category.color}`}
                  >
                    {food}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NutritionAdvisor;