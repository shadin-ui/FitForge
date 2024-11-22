import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaDumbbell, FaRunning, FaStopwatch } from 'react-icons/fa';
import { GiMuscleUp, GiWeightLiftingUp, GiHeartBeats } from 'react-icons/gi';
import { MdFitnessCenter } from 'react-icons/md';

const workoutTypes = [
  { id: 'strength', name: 'Strength Training', icon: <FaDumbbell className="w-6 h-6" /> },
  { id: 'cardio', name: 'Cardio', icon: <FaRunning className="w-6 h-6" /> },
  { id: 'hiit', name: 'HIIT', icon: <FaStopwatch className="w-6 h-6" /> },
  { id: 'endurance', name: 'Endurance', icon: <GiHeartBeats className="w-6 h-6" /> },
  { id: 'powerlifting', name: 'Powerlifting', icon: <GiWeightLiftingUp className="w-6 h-6" /> },
  { id: 'bodyweight', name: 'Bodyweight', icon: <GiMuscleUp className="w-6 h-6" /> },
  { id: 'crossfit', name: 'CrossFit', icon: <MdFitnessCenter className="w-6 h-6" /> },
];

const difficultyLevels = [
  { id: 'beginner', name: 'Beginner', description: 'Perfect for those just starting their fitness journey' },
  { id: 'intermediate', name: 'Intermediate', description: 'For those with some training experience' },
  { id: 'advanced', name: 'Advanced', description: 'Challenging workouts for experienced athletes' },
];

const WorkoutPlanner = () => {
  const [workouts, setWorkouts] = useState([]);
  const [currentWorkout, setCurrentWorkout] = useState({
    type: '',
    name: '',
    difficulty: '',
    duration: '',
    exercises: [],
    notes: '',
  });
  const [currentExercise, setCurrentExercise] = useState({
    name: '',
    sets: '',
    reps: '',
    weight: '',
  });

  const handleAddExercise = () => {
    if (currentExercise.name) {
      setCurrentWorkout({
        ...currentWorkout,
        exercises: [...currentWorkout.exercises, { ...currentExercise, id: Date.now() }],
      });
      setCurrentExercise({ name: '', sets: '', reps: '', weight: '' });
    }
  };

  const handleRemoveExercise = (id) => {
    setCurrentWorkout({
      ...currentWorkout,
      exercises: currentWorkout.exercises.filter((ex) => ex.id !== id),
    });
  };

  const handleSaveWorkout = () => {
    if (currentWorkout.type && currentWorkout.name) {
      setWorkouts([...workouts, { ...currentWorkout, id: Date.now() }]);
      setCurrentWorkout({
        type: '',
        name: '',
        difficulty: '',
        duration: '',
        exercises: [],
        notes: '',
      });
    }
  };

  const handleDeleteWorkout = (id) => {
    setWorkouts(workouts.filter((workout) => workout.id !== id));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="container mx-auto px-4 py-8"
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-8 gradient-text">Workout Planner</h2>

        {/* Create Workout Form */}
        <div className="card mb-8">
          <h3 className="text-2xl font-semibold mb-6">Create New Workout</h3>

          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium mb-1">Workout Name</label>
              <input
                type="text"
                value={currentWorkout.name}
                onChange={(e) => setCurrentWorkout({ ...currentWorkout, name: e.target.value })}
                className="input-primary"
                placeholder="Enter workout name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Duration (minutes)</label>
              <input
                type="number"
                value={currentWorkout.duration}
                onChange={(e) => setCurrentWorkout({ ...currentWorkout, duration: e.target.value })}
                className="input-primary"
                placeholder="Enter duration"
              />
            </div>
          </div>

          {/* Workout Type */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Workout Type</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {workoutTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setCurrentWorkout({ ...currentWorkout, type: type.id })}
                  className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all duration-200 ${
                    currentWorkout.type === type.id
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-border hover:border-primary'
                  }`}
                >
                  {type.icon}
                  <span className="mt-2 text-sm font-medium">{type.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Difficulty Level */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Difficulty Level</label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              {difficultyLevels.map((level) => (
                <button
                  key={level.id}
                  onClick={() => setCurrentWorkout({ ...currentWorkout, difficulty: level.id })}
                  className={`p-4 rounded-xl border text-left transition-all duration-200 ${
                    currentWorkout.difficulty === level.id
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-primary'
                  }`}
                >
                  <h4 className="font-semibold">{level.name}</h4>
                  <p className="text-sm text-muted">{level.description}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Exercises */}
          <div className="mb-6">
            <h4 className="text-lg font-semibold mb-4">Exercises</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-1">Exercise Name</label>
                <input
                  type="text"
                  value={currentExercise.name}
                  onChange={(e) => setCurrentExercise({ ...currentExercise, name: e.target.value })}
                  className="input-primary"
                  placeholder="Enter exercise name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Sets</label>
                <input
                  type="number"
                  value={currentExercise.sets}
                  onChange={(e) => setCurrentExercise({ ...currentExercise, sets: e.target.value })}
                  className="input-primary"
                  placeholder="Number of sets"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Reps</label>
                <input
                  type="number"
                  value={currentExercise.reps}
                  onChange={(e) => setCurrentExercise({ ...currentExercise, reps: e.target.value })}
                  className="input-primary"
                  placeholder="Reps per set"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Weight (kg)</label>
                <input
                  type="number"
                  value={currentExercise.weight}
                  onChange={(e) => setCurrentExercise({ ...currentExercise, weight: e.target.value })}
                  className="input-primary"
                  placeholder="Weight (optional)"
                />
              </div>
            </div>
            <button onClick={handleAddExercise} className="btn-secondary w-full">
              Add Exercise
            </button>

            {/* Exercise List */}
            {currentWorkout.exercises.length > 0 && (
              <div className="mt-4 space-y-2">
                {currentWorkout.exercises.map((exercise) => (
                  <div
                    key={exercise.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-card border border-border"
                  >
                    <div className="flex-1">
                      <h5 className="font-medium">{exercise.name}</h5>
                      <p className="text-sm text-muted">
                        {exercise.sets} sets × {exercise.reps} reps
                        {exercise.weight && ` @ ${exercise.weight}kg`}
                      </p>
                    </div>
                    <button
                      onClick={() => handleRemoveExercise(exercise.id)}
                      className="text-muted hover:text-primary transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Notes */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-1">Notes</label>
            <textarea
              value={currentWorkout.notes}
              onChange={(e) => setCurrentWorkout({ ...currentWorkout, notes: e.target.value })}
              className="input-primary min-h-[100px]"
              placeholder="Add any notes or instructions..."
            />
          </div>

          <button onClick={handleSaveWorkout} className="btn-primary w-full">
            Save Workout
          </button>
        </div>

        {/* Saved Workouts */}
        <div className="space-y-4">
          <h3 className="text-2xl font-semibold mb-4">Saved Workouts</h3>
          {workouts.map((workout) => (
            <motion.div
              key={workout.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="card"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="text-xl font-semibold">{workout.name}</h4>
                  <div className="flex items-center gap-4 text-muted mt-1">
                    <span className="flex items-center">
                      {workoutTypes.find((t) => t.id === workout.type)?.icon}
                      <span className="ml-1">
                        {workoutTypes.find((t) => t.id === workout.type)?.name}
                      </span>
                    </span>
                    <span>{workout.duration} minutes</span>
                    <span className="capitalize">{workout.difficulty}</span>
                  </div>
                </div>
                <button
                  onClick={() => handleDeleteWorkout(workout.id)}
                  className="text-muted hover:text-primary transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>

              {/* Exercise List */}
              <div className="space-y-2">
                {workout.exercises.map((exercise, index) => (
                  <div key={index} className="p-3 rounded-lg bg-background border border-border">
                    <h5 className="font-medium">{exercise.name}</h5>
                    <p className="text-sm text-muted">
                      {exercise.sets} sets × {exercise.reps} reps
                      {exercise.weight && ` @ ${exercise.weight}kg`}
                    </p>
                  </div>
                ))}
              </div>

              {workout.notes && (
                <div className="mt-4 text-muted">
                  <p className="text-sm">{workout.notes}</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default WorkoutPlanner;
