import React, { useState } from 'react';
import { Clock, Target, Zap, Users, Calendar, Play } from 'lucide-react';

interface WorkoutPlan {
  name: string;
  duration: string;
  difficulty: string;
  type: string;
  exercises: Exercise[];
}

interface Exercise {
  name: string;
  sets: string;
  reps: string;
  rest: string;
  description: string;
}

const WorkoutPlanner: React.FC = () => {
  const [selectedGoal, setSelectedGoal] = useState<string>('');
  const [selectedLevel, setSelectedLevel] = useState<string>('');
  const [selectedDuration, setSelectedDuration] = useState<string>('');
  const [generatedPlan, setGeneratedPlan] = useState<WorkoutPlan | null>(null);

  const goals = [
    { id: 'weight-loss', name: 'Weight Loss', icon: Target, desc: 'Burn calories and lose fat' },
    { id: 'muscle-gain', name: 'Muscle Gain', icon: Zap, desc: 'Build lean muscle mass' },
    { id: 'endurance', name: 'Endurance', icon: Clock, desc: 'Improve cardiovascular fitness' },
    { id: 'strength', name: 'Strength', icon: Users, desc: 'Increase overall strength' },
  ];

  const levels = ['Beginner', 'Intermediate', 'Advanced'];
  const durations = ['15-20 min', '30-45 min', '60+ min'];

  const workoutPlans: { [key: string]: WorkoutPlan } = {
    'weight-loss-beginner-15-20': {
      name: 'Beginner Fat Burner',
      duration: '15-20 minutes',
      difficulty: 'Beginner',
      type: 'HIIT Cardio',
      exercises: [
        { name: 'Jumping Jacks', sets: '3', reps: '30 seconds', rest: '30 sec', description: 'Full body cardio movement' },
        { name: 'Bodyweight Squats', sets: '3', reps: '15-20', rest: '45 sec', description: 'Lower body strength and cardio' },
        { name: 'Push-ups (Modified)', sets: '3', reps: '8-12', rest: '45 sec', description: 'Upper body strength' },
        { name: 'Mountain Climbers', sets: '3', reps: '20 seconds', rest: '40 sec', description: 'Core and cardio' },
        { name: 'Plank Hold', sets: '2', reps: '20-30 seconds', rest: '60 sec', description: 'Core strengthening' },
      ],
    },
    'muscle-gain-intermediate-30-45': {
      name: 'Muscle Builder Pro',
      duration: '30-45 minutes',
      difficulty: 'Intermediate',
      type: 'Strength Training',
      exercises: [
        { name: 'Push-ups', sets: '4', reps: '12-15', rest: '60 sec', description: 'Chest, shoulders, triceps' },
        { name: 'Squats', sets: '4', reps: '15-20', rest: '60 sec', description: 'Quads, glutes, hamstrings' },
        { name: 'Pike Push-ups', sets: '3', reps: '8-12', rest: '60 sec', description: 'Shoulders and upper chest' },
        { name: 'Lunges', sets: '3', reps: '12 each leg', rest: '60 sec', description: 'Legs and glutes' },
        { name: 'Tricep Dips', sets: '3', reps: '10-15', rest: '60 sec', description: 'Triceps and shoulders' },
        { name: 'Plank to T', sets: '3', reps: '10 each side', rest: '60 sec', description: 'Core and stability' },
      ],
    },
    'endurance-beginner-30-45': {
      name: 'Cardio Endurance Starter',
      duration: '30-45 minutes',
      difficulty: 'Beginner',
      type: 'Cardio Circuit',
      exercises: [
        { name: 'Marching in Place', sets: '1', reps: '2 minutes', rest: '30 sec', description: 'Warm-up movement' },
        { name: 'Step-ups (Chair)', sets: '3', reps: '1 minute', rest: '60 sec', description: 'Lower body cardio' },
        { name: 'Arm Circles', sets: '2', reps: '30 seconds each', rest: '30 sec', description: 'Shoulder mobility and cardio' },
        { name: 'Modified Burpees', sets: '3', reps: '45 seconds', rest: '75 sec', description: 'Full body cardio' },
        { name: 'Walking/Jogging', sets: '1', reps: '5-10 minutes', rest: '-', description: 'Steady-state cardio' },
      ],
    },
  };

  const generateWorkoutPlan = () => {
    const planKey = `${selectedGoal}-${selectedLevel.toLowerCase()}-${selectedDuration.replace(/[^a-z0-9]/gi, '-').toLowerCase()}`;
    const plan = workoutPlans[planKey];
    
    if (plan) {
      setGeneratedPlan(plan);
    } else {
      // Generate a fallback plan
      setGeneratedPlan({
        name: 'Custom Workout Plan',
        duration: selectedDuration,
        difficulty: selectedLevel,
        type: 'Mixed Training',
        exercises: [
          { name: 'Warm-up', sets: '1', reps: '5 minutes', rest: '-', description: 'Light cardio and stretching' },
          { name: 'Squats', sets: '3', reps: '12-15', rest: '60 sec', description: 'Lower body strength' },
          { name: 'Push-ups', sets: '3', reps: '8-12', rest: '60 sec', description: 'Upper body strength' },
          { name: 'Plank', sets: '2', reps: '30 seconds', rest: '60 sec', description: 'Core strengthening' },
          { name: 'Cool-down', sets: '1', reps: '5 minutes', rest: '-', description: 'Stretching and recovery' },
        ],
      });
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-4">AI Workout Planner</h2>
        <p className="text-gray-400 text-lg">Get personalized workout plans tailored to your goals and fitness level</p>
      </div>

      {/* Goal Selection */}
      <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl border border-gray-700 p-6">
        <h3 className="text-xl font-semibold text-white mb-4">What's your primary goal?</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {goals.map((goal) => (
            <button
              key={goal.id}
              onClick={() => setSelectedGoal(goal.id)}
              className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                selectedGoal === goal.id
                  ? 'border-orange-500 bg-orange-500/20 text-white'
                  : 'border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white'
              }`}
            >
              <goal.icon className="w-8 h-8 mx-auto mb-2" />
              <h4 className="font-semibold mb-1">{goal.name}</h4>
              <p className="text-sm opacity-80">{goal.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Level and Duration Selection */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl border border-gray-700 p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Fitness Level</h3>
          <div className="space-y-2">
            {levels.map((level) => (
              <button
                key={level}
                onClick={() => setSelectedLevel(level)}
                className={`w-full p-3 rounded-lg text-left transition-all duration-200 ${
                  selectedLevel === level
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl border border-gray-700 p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Workout Duration</h3>
          <div className="space-y-2">
            {durations.map((duration) => (
              <button
                key={duration}
                onClick={() => setSelectedDuration(duration)}
                className={`w-full p-3 rounded-lg text-left transition-all duration-200 ${
                  selectedDuration === duration
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                }`}
              >
                {duration}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Generate Button */}
      <div className="text-center">
        <button
          onClick={generateWorkoutPlan}
          disabled={!selectedGoal || !selectedLevel || !selectedDuration}
          className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-8 rounded-lg text-lg transition-all duration-200 shadow-lg"
        >
          Generate My Workout Plan
        </button>
      </div>

      {/* Generated Plan */}
      {generatedPlan && (
        <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl border border-gray-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">{generatedPlan.name}</h3>
              <div className="flex flex-wrap gap-4 text-sm">
                <span className="bg-orange-500/20 text-orange-400 px-3 py-1 rounded-full">
                  {generatedPlan.difficulty}
                </span>
                <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full">
                  {generatedPlan.type}
                </span>
                <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full flex items-center">
                  <Clock className="w-3 h-3 mr-1" />
                  {generatedPlan.duration}
                </span>
              </div>
            </div>
            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors duration-200">
              <Play className="w-4 h-4" />
              <span>Start Workout</span>
            </button>
          </div>

          <div className="grid gap-4">
            {generatedPlan.exercises.map((exercise, index) => (
              <div key={index} className="bg-gray-700/50 rounded-lg p-4 hover:bg-gray-700/70 transition-colors duration-200">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="text-lg font-semibold text-white">{exercise.name}</h4>
                  <span className="text-gray-400 text-sm">#{index + 1}</span>
                </div>
                <p className="text-gray-400 text-sm mb-3">{exercise.description}</p>
                <div className="flex flex-wrap gap-4 text-sm">
                  <span className="text-orange-400">
                    <strong>Sets:</strong> {exercise.sets}
                  </span>
                  <span className="text-blue-400">
                    <strong>Reps:</strong> {exercise.reps}
                  </span>
                  {exercise.rest !== '-' && (
                    <span className="text-green-400">
                      <strong>Rest:</strong> {exercise.rest}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-gray-900/50 rounded-lg border border-gray-600">
            <h4 className="text-lg font-semibold text-white mb-2">💡 Pro Tips:</h4>
            <ul className="text-gray-400 text-sm space-y-1">
              <li>• Focus on proper form over speed or heavy weight</li>
              <li>• Stay hydrated throughout your workout</li>
              <li>• Listen to your body and rest when needed</li>
              <li>• Gradually increase intensity as you get stronger</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkoutPlanner;