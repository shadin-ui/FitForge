import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FaDumbbell, 
  FaFire, 
  FaCalendarAlt, 
  FaPlus, 
  FaTrash, 
  FaCog,
  FaChartLine,
  FaMedal,
  FaQuoteLeft,
  FaSave
} from 'react-icons/fa';
import { GiMuscleUp } from 'react-icons/gi';

const exerciseDatabase = {
  chest: [
    { id: 'bench-press', name: 'Bench Press', instruction: 'Lie on a flat bench, lower the bar to your chest, and press up', defaultSets: 3, defaultReps: 10 },
    { id: 'pushups', name: 'Push-Ups', instruction: 'Keep your body straight, lower chest to ground, push back up', defaultSets: 3, defaultReps: 12 },
    { id: 'dumbbell-flyes', name: 'Dumbbell Flyes', instruction: 'Lie on bench, arms out wide, bring dumbbells together above chest', defaultSets: 3, defaultReps: 12 },
  ],
  back: [
    { id: 'pullups', name: 'Pull-Ups', instruction: 'Hang from bar, pull yourself up until chin over bar', defaultSets: 3, defaultReps: 8 },
    { id: 'rows', name: 'Barbell Rows', instruction: 'Bend over, pull barbell to lower chest', defaultSets: 3, defaultReps: 10 },
    { id: 'lat-pulldown', name: 'Lat Pulldown', instruction: 'Sit at machine, pull bar down to upper chest', defaultSets: 3, defaultReps: 12 },
  ],
  legs: [
    { id: 'squats', name: 'Squats', instruction: 'Stand with feet shoulder-width, squat down, stand back up', defaultSets: 3, defaultReps: 10 },
    { id: 'deadlifts', name: 'Deadlifts', instruction: 'Bend down, grab bar, lift with straight back', defaultSets: 3, defaultReps: 8 },
    { id: 'lunges', name: 'Lunges', instruction: 'Step forward, lower back knee to ground, push back up', defaultSets: 3, defaultReps: 12 },
  ],
  shoulders: [
    { id: 'overhead-press', name: 'Overhead Press', instruction: 'Press barbell from shoulders overhead', defaultSets: 3, defaultReps: 10 },
    { id: 'lateral-raises', name: 'Lateral Raises', instruction: 'Raise dumbbells to sides until parallel with ground', defaultSets: 3, defaultReps: 12 },
    { id: 'front-raises', name: 'Front Raises', instruction: 'Raise dumbbells in front until parallel with ground', defaultSets: 3, defaultReps: 12 },
  ],
  arms: [
    { id: 'bicep-curls', name: 'Bicep Curls', instruction: 'Curl dumbbells up towards shoulders', defaultSets: 3, defaultReps: 12 },
    { id: 'tricep-extensions', name: 'Tricep Extensions', instruction: 'Extend arms overhead with dumbbell', defaultSets: 3, defaultReps: 12 },
    { id: 'hammer-curls', name: 'Hammer Curls', instruction: 'Curl dumbbells with palms facing each other', defaultSets: 3, defaultReps: 12 },
  ],
};

const muscleGroupIcons = {
  chest: <GiMuscleUp className="w-6 h-6" />,
  back: <GiMuscleUp className="w-6 h-6" />,
  legs: <FaDumbbell className="w-6 h-6" />,
  shoulders: <FaDumbbell className="w-6 h-6" />,
  arms: <GiMuscleUp className="w-6 h-6" />
};

const WorkoutPlan = () => {
  const [workoutPlan, setWorkoutPlan] = useState(() => {
    const savedPlan = localStorage.getItem('workoutPlan');
    return savedPlan ? JSON.parse(savedPlan) : [];
  });
  
  const [selectedDay, setSelectedDay] = useState(null);
  const [showExerciseModal, setShowExerciseModal] = useState(false);
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState('chest');
  const [caloriesBurned, setCaloriesBurned] = useState(0);
  const [workoutStreak, setWorkoutStreak] = useState(0);
  const [showStats, setShowStats] = useState(false);
  const [workoutIntensity, setWorkoutIntensity] = useState('medium');
  const [aiSuggestions, setAiSuggestions] = useState([]);
  const [showAiSuggestions, setShowAiSuggestions] = useState(false);

  // Calculate estimated calories and streak
  useEffect(() => {
    let totalCalories = 0;
    workoutPlan.forEach(day => {
      day.exercises.forEach(exercise => {
        const intensityMultiplier = workoutIntensity === 'high' ? 1.5 : workoutIntensity === 'low' ? 0.7 : 1;
        totalCalories += (exercise.sets * exercise.reps * 3 * intensityMultiplier);
      });
    });
    setCaloriesBurned(Math.round(totalCalories));
    
    // Simulate workout streak
    setWorkoutStreak(workoutPlan.length > 0 ? Math.floor(Math.random() * 10) + 1 : 0);
  }, [workoutPlan, workoutIntensity]);

  // AI Suggestions based on workout history
  const generateAiSuggestions = () => {
    const suggestions = [
      {
        type: 'intensity',
        message: 'Based on your progress, consider increasing workout intensity for better results',
        action: () => setWorkoutIntensity('high')
      },
      {
        type: 'balance',
        message: 'Add more leg exercises to maintain muscle balance',
        action: () => setSelectedMuscleGroup('legs')
      },
      {
        type: 'recovery',
        message: 'Schedule a recovery day after intense workouts',
        action: () => addDay()
      }
    ];
    setAiSuggestions(suggestions);
    setShowAiSuggestions(true);
  };

  const addDay = () => {
    setWorkoutPlan([...workoutPlan, { exercises: [] }]);
  };

  const removeDay = (dayIndex) => {
    const newPlan = workoutPlan.filter((_, index) => index !== dayIndex);
    setWorkoutPlan(newPlan);
  };

  const addExercise = (dayIndex, exercise) => {
    const newPlan = [...workoutPlan];
    newPlan[dayIndex].exercises.push({
      ...exercise,
      sets: exercise.defaultSets,
      reps: exercise.defaultReps,
    });
    setWorkoutPlan(newPlan);
    setShowExerciseModal(false);
  };

  const removeExercise = (dayIndex, exerciseIndex) => {
    const newPlan = [...workoutPlan];
    newPlan[dayIndex].exercises.splice(exerciseIndex, 1);
    setWorkoutPlan(newPlan);
  };

  const updateExercise = (dayIndex, exerciseIndex, field, value) => {
    const newPlan = [...workoutPlan];
    newPlan[dayIndex].exercises[exerciseIndex][field] = value;
    setWorkoutPlan(newPlan);
  };

  const ExerciseModal = ({ dayIndex, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Add Exercise</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
          {Object.keys(exerciseDatabase).map((group) => (
            <button
              key={group}
              onClick={() => setSelectedMuscleGroup(group)}
              className={`px-4 py-2 rounded-full ${
                selectedMuscleGroup === group
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {group.charAt(0).toUpperCase() + group.slice(1)}
            </button>
          ))}
        </div>

        <div className="grid gap-4">
          {exerciseDatabase[selectedMuscleGroup].map((exercise) => (
            <motion.div
              key={exercise.id}
              whileHover={{ scale: 1.02 }}
              className="p-4 border rounded-lg hover:shadow-md cursor-pointer"
              onClick={() => addExercise(dayIndex, exercise)}
            >
              <h4 className="font-semibold">{exercise.name}</h4>
              <p className="text-sm text-gray-600">{exercise.instruction}</p>
              <div className="text-sm text-gray-500 mt-2">
                Recommended: {exercise.defaultSets} sets × {exercise.defaultReps} reps
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );

  const calculateCalories = () => {
    const baseCalories = workoutPlan.length * 150;
    const intensityMultiplier = {
      low: 0.8,
      medium: 1,
      high: 1.3
    };
    return Math.round(baseCalories * intensityMultiplier[workoutIntensity]);
  };

  const addWorkout = () => {
    setWorkoutPlan([...workoutPlan, { id: Date.now(), name: '', sets: '', reps: '' }]);
  };

  const removeWorkout = (id) => {
    setWorkoutPlan(workoutPlan.filter(workout => workout.id !== id));
  };

  const updateWorkout = (id, field, value) => {
    setWorkoutPlan(workoutPlan.map(workout => 
      workout.id === id ? { ...workout, [field]: value } : workout
    ));
  };

  const aiSuggestionsList = [
    {
      message: "Consider increasing workout intensity for better results",
      action: () => setWorkoutIntensity('high')
    },
    {
      message: "Add more exercises targeting your core muscles",
      action: () => setWorkoutPlan([...workoutPlan, { 
        id: Date.now(), 
        name: 'Plank', 
        sets: '3', 
        reps: '60 sec' 
      }])
    }
  ];

  return (
    <div className="min-h-screen py-20 px-4 bg-gray-50">
      {/* Floating Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div 
          initial={{ y: 0 }}
          animate={{ y: [0, 50, 0] }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
          className="absolute top-20 right-10"
        >
          <div className="text-blue-500/5 transform rotate-12">
            <FaDumbbell className="w-72 h-72" />
          </div>
        </motion.div>
        <motion.div 
          initial={{ y: 0 }}
          animate={{ y: [0, -30, 0] }}
          transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
          className="absolute bottom-20 left-10"
        >
          <div className="text-purple-500/5 transform -rotate-12">
            <GiMuscleUp className="w-96 h-96" />
          </div>
        </motion.div>
      </div>

      <div className="max-w-4xl mx-auto relative">
        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
        >
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-xl text-white relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 opacity-10 transform translate-x-2">
              <FaFire className="w-24 h-24" />
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-2">
                <FaFire className="w-6 h-6" />
                <h3 className="text-lg font-bold">Calories</h3>
              </div>
              <p className="text-3xl font-bold">{calculateCalories()}</p>
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 rounded-xl text-white relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 opacity-10 transform translate-x-2">
              <FaMedal className="w-24 h-24" />
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-2">
                <FaMedal className="w-6 h-6" />
                <h3 className="text-lg font-bold">Streak</h3>
              </div>
              <p className="text-3xl font-bold">{workoutStreak} days</p>
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-xl text-white relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 opacity-10 transform translate-x-2">
              <FaChartLine className="w-24 h-24" />
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-2">
                <FaChartLine className="w-6 h-6" />
                <h3 className="text-lg font-bold">Exercises</h3>
              </div>
              <p className="text-3xl font-bold">{workoutPlan.length}</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Intensity Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-6 rounded-xl shadow-lg mb-8"
        >
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <FaFire className="text-orange-500" />
            Workout Intensity
          </h3>
          <div className="flex gap-3">
            {['low', 'medium', 'high'].map((intensity) => (
              <motion.button
                key={intensity}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setWorkoutIntensity(intensity)}
                className={`px-6 py-2 rounded-lg capitalize transition-colors ${
                  workoutIntensity === intensity
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {intensity}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* AI Suggestions */}
        {showAiSuggestions && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 rounded-xl shadow-lg mb-8 text-white"
          >
            <div className="flex items-center gap-2 mb-4">
              <FaCog className="animate-spin" />
              <h3 className="text-xl font-bold">AI Recommendations</h3>
            </div>
            <div className="space-y-4">
              {aiSuggestionsList.map((suggestion, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white/10 p-4 rounded-lg backdrop-blur-sm"
                >
                  <div className="flex items-start gap-3">
                    <FaQuoteLeft className="text-white/50 w-6 h-6 flex-shrink-0 mt-1" />
                    <div>
                      <p className="mb-3">{suggestion.message}</p>
                      <button
                        onClick={suggestion.action}
                        className="px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Workout Plan */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white p-6 rounded-xl shadow-lg"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Workout Plan</h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={addWorkout}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
            >
              <FaPlus />
              Add Exercise
            </motion.button>
          </div>

          <div className="space-y-4">
            {workoutPlan.map((workout, index) => (
              <motion.div
                key={workout.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 p-4 rounded-lg"
              >
                <div className="flex flex-wrap gap-4 items-center">
                  <input
                    type="text"
                    placeholder="Exercise name"
                    value={workout.name}
                    onChange={(e) => updateWorkout(workout.id, 'name', e.target.value)}
                    className="flex-grow px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="text"
                    placeholder="Sets"
                    value={workout.sets}
                    onChange={(e) => updateWorkout(workout.id, 'sets', e.target.value)}
                    className="w-20 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="text"
                    placeholder="Reps"
                    value={workout.reps}
                    onChange={(e) => updateWorkout(workout.id, 'reps', e.target.value)}
                    className="w-20 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => removeWorkout(workout.id)}
                    className="text-red-500 hover:text-red-600 p-2"
                  >
                    <FaTrash />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>

          {workoutPlan.length > 0 && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-6 bg-green-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700 transition-colors mx-auto"
            >
              <FaSave />
              Save Workout
            </motion.button>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default WorkoutPlan;
