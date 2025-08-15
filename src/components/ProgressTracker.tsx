import React, { useState, useEffect } from 'react';
import { Plus, TrendingUp, Calendar, Target, Award, Edit2, Trash2 } from 'lucide-react';

interface ProgressEntry {
  id: string;
  date: string;
  weight?: number;
  bodyFat?: number;
  measurements: {
    chest?: number;
    waist?: number;
    hips?: number;
    arms?: number;
    thighs?: number;
  };
  notes: string;
  photos?: string[];
}

interface Goal {
  id: string;
  title: string;
  target: number;
  current: number;
  unit: string;
  deadline: string;
  category: 'weight' | 'strength' | 'endurance' | 'other';
}

const ProgressTracker: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [entries, setEntries] = useState<ProgressEntry[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [showAddEntry, setShowAddEntry] = useState(false);
  const [showAddGoal, setShowAddGoal] = useState(false);

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedEntries = localStorage.getItem('fitness-progress-entries');
    const savedGoals = localStorage.getItem('fitness-goals');
    
    if (savedEntries) {
      setEntries(JSON.parse(savedEntries));
    }
    if (savedGoals) {
      setGoals(JSON.parse(savedGoals));
    }
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('fitness-progress-entries', JSON.stringify(entries));
  }, [entries]);

  useEffect(() => {
    localStorage.setItem('fitness-goals', JSON.stringify(goals));
  }, [goals]);

  const [newEntry, setNewEntry] = useState<Omit<ProgressEntry, 'id'>>({
    date: new Date().toISOString().split('T')[0],
    measurements: {},
    notes: ''
  });

  const [newGoal, setNewGoal] = useState<Omit<Goal, 'id'>>({
    title: '',
    target: 0,
    current: 0,
    unit: '',
    deadline: '',
    category: 'weight'
  });

  const tabs = [
    { id: 'overview', name: 'Overview', icon: TrendingUp },
    { id: 'progress', name: 'Progress Log', icon: Calendar },
    { id: 'goals', name: 'Goals', icon: Target },
  ];

  const addEntry = () => {
    const entry: ProgressEntry = {
      ...newEntry,
      id: Date.now().toString(),
    };
    setEntries([entry, ...entries]);
    setNewEntry({
      date: new Date().toISOString().split('T')[0],
      measurements: {},
      notes: ''
    });
    setShowAddEntry(false);
  };

  const addGoal = () => {
    const goal: Goal = {
      ...newGoal,
      id: Date.now().toString(),
    };
    setGoals([...goals, goal]);
    setNewGoal({
      title: '',
      target: 0,
      current: 0,
      unit: '',
      deadline: '',
      category: 'weight'
    });
    setShowAddGoal(false);
  };

  const updateGoalProgress = (goalId: string, newCurrent: number) => {
    setGoals(goals.map(goal => 
      goal.id === goalId ? { ...goal, current: newCurrent } : goal
    ));
  };

  const deleteEntry = (entryId: string) => {
    setEntries(entries.filter(entry => entry.id !== entryId));
  };

  const deleteGoal = (goalId: string) => {
    setGoals(goals.filter(goal => goal.id !== goalId));
  };

  const getLatestEntry = () => entries[0];
  const getWeightProgress = () => {
    const weightsEntries = entries.filter(e => e.weight).slice(0, 5).reverse();
    return weightsEntries;
  };

  const calculateGoalProgress = (goal: Goal) => {
    return Math.min((goal.current / goal.target) * 100, 100);
  };

  const getGoalStatus = (goal: Goal) => {
    const progress = calculateGoalProgress(goal);
    const deadline = new Date(goal.deadline);
    const today = new Date();
    const daysRemaining = Math.ceil((deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    if (progress >= 100) return { status: 'completed', color: 'text-green-400', bg: 'bg-green-400/20' };
    if (daysRemaining < 0) return { status: 'overdue', color: 'text-red-400', bg: 'bg-red-400/20' };
    if (daysRemaining <= 7) return { status: 'urgent', color: 'text-yellow-400', bg: 'bg-yellow-400/20' };
    return { status: 'on-track', color: 'text-blue-400', bg: 'bg-blue-400/20' };
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Progress Tracker</h2>
        <p className="text-gray-400 text-lg">Track your fitness journey and achieve your goals</p>
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

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 p-4 rounded-xl border border-blue-500/30">
              <div className="flex items-center justify-between mb-2">
                <span className="text-blue-300 text-sm">Total Entries</span>
                <Calendar className="w-4 h-4 text-blue-400" />
              </div>
              <div className="text-2xl font-bold text-blue-400">{entries.length}</div>
            </div>
            
            <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 p-4 rounded-xl border border-green-500/30">
              <div className="flex items-center justify-between mb-2">
                <span className="text-green-300 text-sm">Active Goals</span>
                <Target className="w-4 h-4 text-green-400" />
              </div>
              <div className="text-2xl font-bold text-green-400">{goals.length}</div>
            </div>
            
            <div className="bg-gradient-to-br from-orange-500/20 to-orange-600/20 p-4 rounded-xl border border-orange-500/30">
              <div className="flex items-center justify-between mb-2">
                <span className="text-orange-300 text-sm">Current Weight</span>
                <TrendingUp className="w-4 h-4 text-orange-400" />
              </div>
              <div className="text-2xl font-bold text-orange-400">
                {getLatestEntry()?.weight ? `${getLatestEntry()?.weight}kg` : 'N/A'}
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 p-4 rounded-xl border border-purple-500/30">
              <div className="flex items-center justify-between mb-2">
                <span className="text-purple-300 text-sm">Goals Completed</span>
                <Award className="w-4 h-4 text-purple-400" />
              </div>
              <div className="text-2xl font-bold text-purple-400">
                {goals.filter(g => calculateGoalProgress(g) >= 100).length}
              </div>
            </div>
          </div>

          {/* Recent Progress */}
          {entries.length > 0 && (
            <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl border border-gray-700 p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Recent Progress</h3>
              <div className="space-y-3">
                {entries.slice(0, 3).map((entry) => (
                  <div key={entry.id} className="bg-gray-700/50 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="text-white font-medium">{new Date(entry.date).toLocaleDateString()}</div>
                        {entry.weight && (
                          <div className="text-sm text-gray-400">Weight: {entry.weight}kg</div>
                        )}
                        {entry.notes && (
                          <div className="text-sm text-gray-300 mt-1">{entry.notes}</div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Active Goals Overview */}
          {goals.length > 0 && (
            <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl border border-gray-700 p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Active Goals</h3>
              <div className="space-y-4">
                {goals.slice(0, 3).map((goal) => {
                  const progress = calculateGoalProgress(goal);
                  const { status, color, bg } = getGoalStatus(goal);
                  
                  return (
                    <div key={goal.id} className="bg-gray-700/50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-white font-medium">{goal.title}</div>
                        <span className={`px-2 py-1 rounded-full text-xs ${bg} ${color}`}>
                          {status.replace('-', ' ')}
                        </span>
                      </div>
                      <div className="mb-2">
                        <div className="flex justify-between text-sm text-gray-400 mb-1">
                          <span>{goal.current} / {goal.target} {goal.unit}</span>
                          <span>{Math.round(progress)}%</span>
                        </div>
                        <div className="w-full bg-gray-600 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Progress Log Tab */}
      {activeTab === 'progress' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-white">Progress Entries</h3>
            <button
              onClick={() => setShowAddEntry(true)}
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-all duration-200"
            >
              <Plus className="w-4 h-4" />
              <span>Add Entry</span>
            </button>
          </div>

          {/* Add Entry Modal */}
          {showAddEntry && (
            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
              <div className="bg-gray-800 rounded-xl max-w-2xl w-full p-6">
                <h3 className="text-xl font-semibold text-white mb-4">Add Progress Entry</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Date</label>
                    <input
                      type="date"
                      value={newEntry.date}
                      onChange={(e) => setNewEntry({...newEntry, date: e.target.value})}
                      className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">Weight (kg)</label>
                      <input
                        type="number"
                        step="0.1"
                        value={newEntry.weight || ''}
                        onChange={(e) => setNewEntry({...newEntry, weight: parseFloat(e.target.value) || undefined})}
                        className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
                        placeholder="e.g., 70.5"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">Body Fat (%)</label>
                      <input
                        type="number"
                        step="0.1"
                        value={newEntry.bodyFat || ''}
                        onChange={(e) => setNewEntry({...newEntry, bodyFat: parseFloat(e.target.value) || undefined})}
                        className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
                        placeholder="e.g., 15.5"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Measurements (cm)</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {['chest', 'waist', 'hips', 'arms', 'thighs'].map((measurement) => (
                        <input
                          key={measurement}
                          type="number"
                          step="0.1"
                          placeholder={measurement.charAt(0).toUpperCase() + measurement.slice(1)}
                          value={newEntry.measurements[measurement as keyof typeof newEntry.measurements] || ''}
                          onChange={(e) => setNewEntry({
                            ...newEntry,
                            measurements: {
                              ...newEntry.measurements,
                              [measurement]: parseFloat(e.target.value) || undefined
                            }
                          })}
                          className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:border-orange-500"
                        />
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Notes</label>
                    <textarea
                      value={newEntry.notes}
                      onChange={(e) => setNewEntry({...newEntry, notes: e.target.value})}
                      className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
                      placeholder="How are you feeling? Any observations?"
                      rows={3}
                    />
                  </div>
                </div>
                
                <div className="flex gap-3 mt-6">
                  <button
                    onClick={addEntry}
                    className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-4 py-2 rounded-lg flex-1 transition-all duration-200"
                  >
                    Add Entry
                  </button>
                  <button
                    onClick={() => setShowAddEntry(false)}
                    className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Progress Entries List */}
          <div className="space-y-4">
            {entries.map((entry) => (
              <div key={entry.id} className="bg-gray-800/50 backdrop-blur-lg rounded-xl border border-gray-700 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="text-lg font-semibold text-white">
                      {new Date(entry.date).toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </h4>
                  </div>
                  <button
                    onClick={() => deleteEntry(entry.id)}
                    className="text-gray-400 hover:text-red-400 transition-colors duration-200"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  {entry.weight && (
                    <div className="bg-blue-500/20 rounded-lg p-3 text-center">
                      <div className="text-blue-400 text-sm">Weight</div>
                      <div className="text-white font-semibold">{entry.weight} kg</div>
                    </div>
                  )}
                  {entry.bodyFat && (
                    <div className="bg-green-500/20 rounded-lg p-3 text-center">
                      <div className="text-green-400 text-sm">Body Fat</div>
                      <div className="text-white font-semibold">{entry.bodyFat}%</div>
                    </div>
                  )}
                  {Object.entries(entry.measurements).filter(([_, value]) => value).map(([key, value]) => (
                    <div key={key} className="bg-purple-500/20 rounded-lg p-3 text-center">
                      <div className="text-purple-400 text-sm capitalize">{key}</div>
                      <div className="text-white font-semibold">{value} cm</div>
                    </div>
                  ))}
                </div>
                
                {entry.notes && (
                  <div className="bg-gray-700/50 rounded-lg p-3">
                    <div className="text-gray-400 text-sm mb-1">Notes</div>
                    <div className="text-gray-300">{entry.notes}</div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {entries.length === 0 && (
            <div className="text-center py-12">
              <Calendar className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-400 mb-2">No progress entries yet</h3>
              <p className="text-gray-500 mb-4">Start tracking your fitness journey by adding your first entry</p>
              <button
                onClick={() => setShowAddEntry(true)}
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-6 py-2 rounded-lg transition-all duration-200"
              >
                Add First Entry
              </button>
            </div>
          )}
        </div>
      )}

      {/* Goals Tab */}
      {activeTab === 'goals' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-white">Fitness Goals</h3>
            <button
              onClick={() => setShowAddGoal(true)}
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-all duration-200"
            >
              <Plus className="w-4 h-4" />
              <span>Add Goal</span>
            </button>
          </div>

          {/* Add Goal Modal */}
          {showAddGoal && (
            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
              <div className="bg-gray-800 rounded-xl max-w-lg w-full p-6">
                <h3 className="text-xl font-semibold text-white mb-4">Add New Goal</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Goal Title</label>
                    <input
                      type="text"
                      value={newGoal.title}
                      onChange={(e) => setNewGoal({...newGoal, title: e.target.value})}
                      className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
                      placeholder="e.g., Lose 10kg, Bench press 100kg"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Category</label>
                    <select
                      value={newGoal.category}
                      onChange={(e) => setNewGoal({...newGoal, category: e.target.value as any})}
                      className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
                    >
                      <option value="weight">Weight Loss/Gain</option>
                      <option value="strength">Strength</option>
                      <option value="endurance">Endurance</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">Current</label>
                      <input
                        type="number"
                        step="0.1"
                        value={newGoal.current}
                        onChange={(e) => setNewGoal({...newGoal, current: parseFloat(e.target.value) || 0})}
                        className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">Target</label>
                      <input
                        type="number"
                        step="0.1"
                        value={newGoal.target}
                        onChange={(e) => setNewGoal({...newGoal, target: parseFloat(e.target.value) || 0})}
                        className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">Unit</label>
                      <input
                        type="text"
                        value={newGoal.unit}
                        onChange={(e) => setNewGoal({...newGoal, unit: e.target.value})}
                        className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
                        placeholder="kg, reps, minutes"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">Deadline</label>
                      <input
                        type="date"
                        value={newGoal.deadline}
                        onChange={(e) => setNewGoal({...newGoal, deadline: e.target.value})}
                        className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-3 mt-6">
                  <button
                    onClick={addGoal}
                    disabled={!newGoal.title || !newGoal.target || !newGoal.unit || !newGoal.deadline}
                    className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg flex-1 transition-all duration-200"
                  >
                    Add Goal
                  </button>
                  <button
                    onClick={() => setShowAddGoal(false)}
                    className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Goals List */}
          <div className="grid gap-6">
            {goals.map((goal) => {
              const progress = calculateGoalProgress(goal);
              const { status, color, bg } = getGoalStatus(goal);
              const deadline = new Date(goal.deadline);
              const daysRemaining = Math.ceil((deadline.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
              
              return (
                <div key={goal.id} className="bg-gray-800/50 backdrop-blur-lg rounded-xl border border-gray-700 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-white mb-2">{goal.title}</h4>
                      <div className="flex items-center space-x-4 mb-3">
                        <span className={`px-3 py-1 rounded-full text-xs ${bg} ${color} capitalize`}>
                          {goal.category}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs ${bg} ${color}`}>
                          {status.replace('-', ' ')}
                        </span>
                        <span className="text-gray-400 text-sm">
                          {daysRemaining > 0 ? `${daysRemaining} days left` : `${Math.abs(daysRemaining)} days overdue`}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => deleteGoal(goal.id)}
                      className="text-gray-400 hover:text-red-400 transition-colors duration-200"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-end">
                      <div className="flex-1 mr-4">
                        <input
                          type="number"
                          step="0.1"
                          value={goal.current}
                          onChange={(e) => updateGoalProgress(goal.id, parseFloat(e.target.value) || 0)}
                          className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:border-orange-500"
                        />
                        <div className="text-xs text-gray-400 mt-1">Current Progress</div>
                      </div>
                      <div className="text-right">
                        <div className="text-white font-semibold">{goal.target} {goal.unit}</div>
                        <div className="text-xs text-gray-400">Target</div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm text-gray-400 mb-1">
                        <span>Progress</span>
                        <span>{Math.round(progress)}%</span>
                      </div>
                      <div className="w-full bg-gray-600 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-300 ${
                            progress >= 100 ? 'bg-green-500' : 'bg-gradient-to-r from-orange-500 to-red-500'
                          }`}
                          style={{ width: `${Math.min(progress, 100)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {goals.length === 0 && (
            <div className="text-center py-12">
              <Target className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-400 mb-2">No goals set yet</h3>
              <p className="text-gray-500 mb-4">Set your first fitness goal to start tracking your progress</p>
              <button
                onClick={() => setShowAddGoal(true)}
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-6 py-2 rounded-lg transition-all duration-200"
              >
                Set Your First Goal
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProgressTracker;