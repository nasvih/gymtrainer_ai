import React, { useState } from 'react';
import { Search, Play, Clock, Target, Zap, Filter } from 'lucide-react';

interface Exercise {
  id: string;
  name: string;
  category: string;
  difficulty: string;
  equipment: string;
  primaryMuscles: string[];
  secondaryMuscles: string[];
  description: string;
  instructions: string[];
  tips: string[];
  imageUrl: string;
}

const ExerciseLibrary: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);

  const categories = ['All', 'Chest', 'Back', 'Shoulders', 'Arms', 'Legs', 'Core', 'Cardio', 'Full Body'];
  const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  const exercises: Exercise[] = [
    {
      id: '1',
      name: 'Push-ups',
      category: 'Chest',
      difficulty: 'Beginner',
      equipment: 'Bodyweight',
      primaryMuscles: ['Chest', 'Triceps'],
      secondaryMuscles: ['Shoulders', 'Core'],
      description: 'A fundamental upper body exercise that builds chest, arm, and core strength.',
      instructions: [
        'Start in a plank position with hands slightly wider than shoulders',
        'Lower your body until your chest nearly touches the floor',
        'Push back up to the starting position',
        'Keep your body in a straight line throughout the movement'
      ],
      tips: [
        'Keep core engaged to maintain proper form',
        'Control the descent for better muscle activation',
        'Modify by doing knee push-ups if needed'
      ],
      imageUrl: 'https://images.pexels.com/photos/416809/pexels-photo-416809.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: '2',
      name: 'Squats',
      category: 'Legs',
      difficulty: 'Beginner',
      equipment: 'Bodyweight',
      primaryMuscles: ['Quadriceps', 'Glutes'],
      secondaryMuscles: ['Hamstrings', 'Core'],
      description: 'The king of lower body exercises, targeting multiple muscle groups.',
      instructions: [
        'Stand with feet shoulder-width apart',
        'Lower your body by bending at hips and knees',
        'Go down until thighs are parallel to the floor',
        'Push through heels to return to starting position'
      ],
      tips: [
        'Keep your chest up and back straight',
        'Knees should track over your toes',
        'Weight should be on your heels'
      ],
      imageUrl: 'https://images.pexels.com/photos/703012/pexels-photo-703012.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: '3',
      name: 'Plank',
      category: 'Core',
      difficulty: 'Beginner',
      equipment: 'Bodyweight',
      primaryMuscles: ['Core', 'Abs'],
      secondaryMuscles: ['Shoulders', 'Back'],
      description: 'An isometric exercise that strengthens the entire core.',
      instructions: [
        'Start in push-up position on forearms',
        'Keep body in straight line from head to heels',
        'Hold position while breathing normally',
        'Avoid letting hips sag or rise'
      ],
      tips: [
        'Engage your core by pulling belly button to spine',
        'Keep neck in neutral position',
        'Start with shorter holds and build up time'
      ],
      imageUrl: 'https://images.pexels.com/photos/317157/pexels-photo-317157.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: '4',
      name: 'Burpees',
      category: 'Full Body',
      difficulty: 'Intermediate',
      equipment: 'Bodyweight',
      primaryMuscles: ['Full Body'],
      secondaryMuscles: ['Cardiovascular'],
      description: 'A high-intensity full-body exercise that combines strength and cardio.',
      instructions: [
        'Start in standing position',
        'Drop into squat and place hands on floor',
        'Jump feet back into plank position',
        'Do a push-up, jump feet back to squat, then jump up'
      ],
      tips: [
        'Maintain proper form even when tired',
        'Modify by stepping back instead of jumping',
        'Land softly on your feet'
      ],
      imageUrl: 'https://images.pexels.com/photos/4162449/pexels-photo-4162449.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: '5',
      name: 'Mountain Climbers',
      category: 'Cardio',
      difficulty: 'Intermediate',
      equipment: 'Bodyweight',
      primaryMuscles: ['Core', 'Shoulders'],
      secondaryMuscles: ['Legs', 'Arms'],
      description: 'A dynamic cardio exercise that also strengthens the core.',
      instructions: [
        'Start in plank position',
        'Bring right knee toward chest',
        'Quickly switch legs, bringing left knee to chest',
        'Continue alternating legs rapidly'
      ],
      tips: [
        'Keep hips level throughout the movement',
        'Land softly on the balls of your feet',
        'Maintain plank position with shoulders over wrists'
      ],
      imageUrl: 'https://images.pexels.com/photos/4162481/pexels-photo-4162481.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: '6',
      name: 'Lunges',
      category: 'Legs',
      difficulty: 'Beginner',
      equipment: 'Bodyweight',
      primaryMuscles: ['Quadriceps', 'Glutes'],
      secondaryMuscles: ['Hamstrings', 'Calves'],
      description: 'Unilateral leg exercise that improves balance and strength.',
      instructions: [
        'Stand with feet hip-width apart',
        'Step forward with one leg',
        'Lower body until both knees are at 90 degrees',
        'Push back to starting position and repeat'
      ],
      tips: [
        'Keep front knee over ankle, not pushed out past toes',
        'Keep torso upright throughout the movement',
        'Push through front heel to return to start'
      ],
      imageUrl: 'https://images.pexels.com/photos/4162438/pexels-photo-4162438.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  const filteredExercises = exercises.filter(exercise => {
    const matchesSearch = exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exercise.primaryMuscles.some(muscle => muscle.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || exercise.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'All' || exercise.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-400 bg-green-400/20';
      case 'Intermediate': return 'text-yellow-400 bg-yellow-400/20';
      case 'Advanced': return 'text-red-400 bg-red-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Exercise Library</h2>
        <p className="text-gray-400 text-lg">Discover proper form and technique for hundreds of exercises</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl border border-gray-700 p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search exercises or muscle groups..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
            />
          </div>
          
          <div className="flex gap-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
            >
              {difficulties.map(difficulty => (
                <option key={difficulty} value={difficulty}>{difficulty}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Exercise Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredExercises.map((exercise) => (
          <div
            key={exercise.id}
            className="bg-gray-800/50 backdrop-blur-lg rounded-xl border border-gray-700 overflow-hidden hover:border-orange-500/50 transition-all duration-200 cursor-pointer group"
            onClick={() => setSelectedExercise(exercise)}
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={exercise.imageUrl}
                alt={exercise.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <h3 className="text-lg font-semibold text-white mb-1">{exercise.name}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(exercise.difficulty)}`}>
                  {exercise.difficulty}
                </span>
              </div>
              <div className="absolute top-4 right-4">
                <Play className="w-6 h-6 text-white/80 group-hover:text-orange-400 transition-colors duration-200" />
              </div>
            </div>
            
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-orange-400 text-sm font-medium">{exercise.category}</span>
                <span className="text-gray-400 text-sm">{exercise.equipment}</span>
              </div>
              <p className="text-gray-400 text-sm mb-3 line-clamp-2">{exercise.description}</p>
              <div className="flex flex-wrap gap-2">
                {exercise.primaryMuscles.map((muscle, index) => (
                  <span key={index} className="text-xs px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full">
                    {muscle}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Exercise Detail Modal */}
      {selectedExercise && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <img
                src={selectedExercise.imageUrl}
                alt={selectedExercise.name}
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <button
                onClick={() => setSelectedExercise(null)}
                className="absolute top-4 right-4 w-8 h-8 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors duration-200"
              >
                ×
              </button>
            </div>
            
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">{selectedExercise.name}</h2>
                  <div className="flex flex-wrap gap-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(selectedExercise.difficulty)}`}>
                      {selectedExercise.difficulty}
                    </span>
                    <span className="px-3 py-1 bg-orange-500/20 text-orange-400 rounded-full text-sm">
                      {selectedExercise.category}
                    </span>
                    <span className="px-3 py-1 bg-gray-600/50 text-gray-300 rounded-full text-sm">
                      {selectedExercise.equipment}
                    </span>
                  </div>
                </div>
              </div>
              
              <p className="text-gray-400 mb-6">{selectedExercise.description}</p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Instructions</h3>
                  <ol className="space-y-2">
                    {selectedExercise.instructions.map((instruction, index) => (
                      <li key={index} className="text-gray-400 text-sm">
                        <span className="text-orange-400 font-medium">{index + 1}.</span> {instruction}
                      </li>
                    ))}
                  </ol>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Tips</h3>
                  <ul className="space-y-2">
                    {selectedExercise.tips.map((tip, index) => (
                      <li key={index} className="text-gray-400 text-sm flex items-start">
                        <span className="text-green-400 mr-2">•</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-700">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-white font-medium mb-2">Primary Muscles</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedExercise.primaryMuscles.map((muscle, index) => (
                        <span key={index} className="text-xs px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full">
                          {muscle}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-2">Secondary Muscles</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedExercise.secondaryMuscles.map((muscle, index) => (
                        <span key={index} className="text-xs px-2 py-1 bg-purple-500/20 text-purple-400 rounded-full">
                          {muscle}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {filteredExercises.length === 0 && (
        <div className="text-center py-12">
          <Target className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-400 mb-2">No exercises found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};

export default ExerciseLibrary;