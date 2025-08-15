import React, { useState } from 'react';
import { Calculator, Heart, Target, TrendingUp, Scale } from 'lucide-react';

interface CalculatorResult {
  type: string;
  value: number | string;
  category: string;
  recommendations: string[];
}

const FitnessCalculator: React.FC = () => {
  const [activeCalculator, setActiveCalculator] = useState('bmi');
  const [results, setResults] = useState<CalculatorResult | null>(null);

  // BMI Calculator
  const [bmiData, setBmiData] = useState({ height: '', weight: '' });
  
  // Body Fat Calculator
  const [bodyFatData, setBodyFatData] = useState({
    gender: 'male',
    age: '',
    neck: '',
    waist: '',
    hip: ''
  });
  
  // Calorie Calculator
  const [calorieData, setCalorieData] = useState({
    age: '',
    gender: 'male',
    height: '',
    weight: '',
    activity: 'moderate'
  });
  
  // One Rep Max Calculator
  const [ormData, setOrmData] = useState({ weight: '', reps: '' });

  const calculators = [
    { id: 'bmi', name: 'BMI Calculator', icon: Scale },
    { id: 'bodyfat', name: 'Body Fat', icon: Target },
    { id: 'calories', name: 'Daily Calories', icon: TrendingUp },
    { id: 'orm', name: '1 Rep Max', icon: Heart },
  ];

  const calculateBMI = () => {
    const height = parseFloat(bmiData.height) / 100; // convert cm to m
    const weight = parseFloat(bmiData.weight);
    const bmi = weight / (height * height);
    
    let category = '';
    let recommendations = [];
    
    if (bmi < 18.5) {
      category = 'Underweight';
      recommendations = [
        'Consider consulting with a healthcare provider',
        'Focus on gaining healthy weight through proper nutrition',
        'Include strength training to build muscle mass',
        'Eat nutrient-dense, high-calorie foods'
      ];
    } else if (bmi < 25) {
      category = 'Normal weight';
      recommendations = [
        'Maintain your current healthy weight',
        'Continue regular exercise and balanced nutrition',
        'Focus on building muscle and improving fitness',
        'Aim for 150 minutes of moderate activity per week'
      ];
    } else if (bmi < 30) {
      category = 'Overweight';
      recommendations = [
        'Consider gradual weight loss of 1-2 lbs per week',
        'Combine cardio and strength training',
        'Focus on portion control and nutrient-dense foods',
        'Increase daily physical activity'
      ];
    } else {
      category = 'Obese';
      recommendations = [
        'Consult with healthcare provider for personalized plan',
        'Start with low-impact exercises like walking',
        'Focus on sustainable dietary changes',
        'Consider working with nutrition and fitness professionals'
      ];
    }
    
    setResults({
      type: 'BMI',
      value: bmi.toFixed(1),
      category,
      recommendations
    });
  };

  const calculateBodyFat = () => {
    const { gender, neck, waist, hip } = bodyFatData;
    const neckCm = parseFloat(neck);
    const waistCm = parseFloat(waist);
    const hipCm = parseFloat(hip);
    
    let bodyFat = 0;
    
    if (gender === 'male') {
      bodyFat = 495 / (1.0324 - 0.19077 * Math.log10(waistCm - neckCm) + 0.15456 * Math.log10(parseFloat(bmiData.height || '175'))) - 450;
    } else {
      bodyFat = 495 / (1.29579 - 0.35004 * Math.log10(waistCm + hipCm - neckCm) + 0.22100 * Math.log10(parseFloat(bmiData.height || '165'))) - 450;
    }
    
    let category = '';
    let recommendations = [];
    
    if (gender === 'male') {
      if (bodyFat < 6) {
        category = 'Essential fat';
        recommendations = ['This is below essential fat levels', 'Consult a healthcare provider'];
      } else if (bodyFat < 14) {
        category = 'Athletes';
        recommendations = ['Excellent athletic conditioning', 'Maintain with proper nutrition and training'];
      } else if (bodyFat < 18) {
        category = 'Fitness';
        recommendations = ['Good fitness level', 'Continue current exercise routine'];
      } else if (bodyFat < 25) {
        category = 'Average';
        recommendations = ['Average for general population', 'Consider increasing exercise frequency'];
      } else {
        category = 'Above average';
        recommendations = ['Focus on cardio and strength training', 'Consider dietary modifications'];
      }
    } else {
      if (bodyFat < 14) {
        category = 'Essential fat';
        recommendations = ['This may be below healthy levels', 'Consult a healthcare provider'];
      } else if (bodyFat < 21) {
        category = 'Athletes';
        recommendations = ['Excellent athletic conditioning', 'Maintain with proper nutrition and training'];
      } else if (bodyFat < 25) {
        category = 'Fitness';
        recommendations = ['Good fitness level', 'Continue current exercise routine'];
      } else if (bodyFat < 32) {
        category = 'Average';
        recommendations = ['Average for general population', 'Consider increasing exercise frequency'];
      } else {
        category = 'Above average';
        recommendations = ['Focus on cardio and strength training', 'Consider dietary modifications'];
      }
    }
    
    setResults({
      type: 'Body Fat',
      value: `${bodyFat.toFixed(1)}%`,
      category,
      recommendations
    });
  };

  const calculateCalories = () => {
    const weight = parseFloat(calorieData.weight);
    const height = parseFloat(calorieData.height);
    const age = parseFloat(calorieData.age);
    
    // Calculate BMR
    let bmr;
    if (calorieData.gender === 'male') {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }
    
    // Activity multipliers
    const multipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      very_active: 1.9
    };
    
    const tdee = bmr * multipliers[calorieData.activity as keyof typeof multipliers];
    
    setResults({
      type: 'Daily Calories',
      value: Math.round(tdee),
      category: 'Maintenance',
      recommendations: [
        `For weight loss: ${Math.round(tdee - 500)} calories/day`,
        `For weight gain: ${Math.round(tdee + 500)} calories/day`,
        'Adjust based on your progress and goals',
        'Focus on nutrient-dense whole foods'
      ]
    });
  };

  const calculateORM = () => {
    const weight = parseFloat(ormData.weight);
    const reps = parseFloat(ormData.reps);
    
    // Brzycki formula
    const orm = weight * (36 / (37 - reps));
    
    setResults({
      type: '1 Rep Max',
      value: `${Math.round(orm)} kg`,
      category: 'Estimated Maximum',
      recommendations: [
        'This is an estimate based on your lift',
        'Always warm up properly before attempting heavy lifts',
        'Use a spotter when attempting max lifts',
        'Progressive overload is key to strength gains'
      ]
    });
  };

  const handleCalculate = () => {
    switch (activeCalculator) {
      case 'bmi':
        calculateBMI();
        break;
      case 'bodyfat':
        calculateBodyFat();
        break;
      case 'calories':
        calculateCalories();
        break;
      case 'orm':
        calculateORM();
        break;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Fitness Calculators</h2>
        <p className="text-gray-400 text-lg">Calculate important fitness metrics to track your progress</p>
      </div>

      {/* Calculator Selection */}
      <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl border border-gray-700 p-2">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
          {calculators.map((calc) => (
            <button
              key={calc.id}
              onClick={() => {
                setActiveCalculator(calc.id);
                setResults(null);
              }}
              className={`flex flex-col items-center space-y-2 p-4 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeCalculator === calc.id
                  ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700'
              }`}
            >
              <calc.icon className="w-6 h-6" />
              <span className="text-center">{calc.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Calculator Forms */}
      <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl border border-gray-700 p-6">
        {activeCalculator === 'bmi' && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white mb-4">BMI Calculator</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-400 text-sm mb-2">Height (cm)</label>
                <input
                  type="number"
                  value={bmiData.height}
                  onChange={(e) => setBmiData({...bmiData, height: e.target.value})}
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
                  placeholder="e.g., 175"
                />
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-2">Weight (kg)</label>
                <input
                  type="number"
                  value={bmiData.weight}
                  onChange={(e) => setBmiData({...bmiData, weight: e.target.value})}
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
                  placeholder="e.g., 70"
                />
              </div>
            </div>
          </div>
        )}

        {activeCalculator === 'bodyfat' && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white mb-4">Body Fat Calculator</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-gray-400 text-sm mb-2">Gender</label>
                <select
                  value={bodyFatData.gender}
                  onChange={(e) => setBodyFatData({...bodyFatData, gender: e.target.value})}
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-2">Neck (cm)</label>
                <input
                  type="number"
                  value={bodyFatData.neck}
                  onChange={(e) => setBodyFatData({...bodyFatData, neck: e.target.value})}
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
                  placeholder="e.g., 38"
                />
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-2">Waist (cm)</label>
                <input
                  type="number"
                  value={bodyFatData.waist}
                  onChange={(e) => setBodyFatData({...bodyFatData, waist: e.target.value})}
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
                  placeholder="e.g., 85"
                />
              </div>
              {bodyFatData.gender === 'female' && (
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Hip (cm)</label>
                  <input
                    type="number"
                    value={bodyFatData.hip}
                    onChange={(e) => setBodyFatData({...bodyFatData, hip: e.target.value})}
                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
                    placeholder="e.g., 95"
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {activeCalculator === 'calories' && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white mb-4">Daily Calorie Calculator</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-gray-400 text-sm mb-2">Age</label>
                <input
                  type="number"
                  value={calorieData.age}
                  onChange={(e) => setCalorieData({...calorieData, age: e.target.value})}
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
                  placeholder="e.g., 30"
                />
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-2">Gender</label>
                <select
                  value={calorieData.gender}
                  onChange={(e) => setCalorieData({...calorieData, gender: e.target.value})}
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-2">Height (cm)</label>
                <input
                  type="number"
                  value={calorieData.height}
                  onChange={(e) => setCalorieData({...calorieData, height: e.target.value})}
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
                  placeholder="e.g., 175"
                />
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-2">Weight (kg)</label>
                <input
                  type="number"
                  value={calorieData.weight}
                  onChange={(e) => setCalorieData({...calorieData, weight: e.target.value})}
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
                  placeholder="e.g., 70"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-gray-400 text-sm mb-2">Activity Level</label>
                <select
                  value={calorieData.activity}
                  onChange={(e) => setCalorieData({...calorieData, activity: e.target.value})}
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
                >
                  <option value="sedentary">Sedentary (little/no exercise)</option>
                  <option value="light">Light (light exercise 1-3 days/week)</option>
                  <option value="moderate">Moderate (moderate exercise 3-5 days/week)</option>
                  <option value="active">Active (hard exercise 6-7 days/week)</option>
                  <option value="very_active">Very Active (very hard exercise, physical job)</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {activeCalculator === 'orm' && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white mb-4">One Rep Max Calculator</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-400 text-sm mb-2">Weight Lifted (kg)</label>
                <input
                  type="number"
                  value={ormData.weight}
                  onChange={(e) => setOrmData({...ormData, weight: e.target.value})}
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
                  placeholder="e.g., 100"
                />
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-2">Repetitions</label>
                <input
                  type="number"
                  value={ormData.reps}
                  onChange={(e) => setOrmData({...ormData, reps: e.target.value})}
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
                  placeholder="e.g., 5"
                />
              </div>
            </div>
          </div>
        )}

        <button
          onClick={handleCalculate}
          className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-3 rounded-lg transition-all duration-200 mt-6"
        >
          <Calculator className="w-4 h-4 inline mr-2" />
          Calculate
        </button>
      </div>

      {/* Results */}
      {results && (
        <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl border border-gray-700 p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Results</h3>
          
          <div className="text-center mb-6">
            <div className="text-4xl font-bold text-orange-400 mb-2">{results.value}</div>
            <div className="text-lg text-white mb-1">{results.type}</div>
            <div className="text-gray-400">{results.category}</div>
          </div>
          
          <div className="bg-gray-700/50 rounded-lg p-4">
            <h4 className="text-white font-medium mb-3">Recommendations:</h4>
            <ul className="space-y-2">
              {results.recommendations.map((rec, index) => (
                <li key={index} className="text-gray-300 text-sm flex items-start">
                  <span className="text-green-400 mr-2">•</span>
                  {rec}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default FitnessCalculator;