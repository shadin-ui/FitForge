import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaDumbbell, FaRunning, FaYoga, FaAppleAlt, FaBed, FaBriefcase, FaBook } from 'react-icons/fa';
import { IoFitness, IoWater } from 'react-icons/io5';
import { MdSportsGymnastics } from 'react-icons/md';

const activityTypes = [
  { id: 'workout', name: 'Workout', icon: <FaDumbbell className="w-5 h-5" /> },
  { id: 'cardio', name: 'Cardio', icon: <FaRunning className="w-5 h-5" /> },
  { id: 'yoga', name: 'Yoga', icon: <FaYoga className="w-5 h-5" /> },
  { id: 'stretching', name: 'Stretching', icon: <MdSportsGymnastics className="w-5 h-5" /> },
  { id: 'nutrition', name: 'Nutrition', icon: <FaAppleAlt className="w-5 h-5" /> },
  { id: 'hydration', name: 'Hydration', icon: <IoWater className="w-5 h-5" /> },
  { id: 'rest', name: 'Rest', icon: <FaBed className="w-5 h-5" /> },
  { id: 'work', name: 'Work', icon: <FaBriefcase className="w-5 h-5" /> },
  { id: 'study', name: 'Study', icon: <FaBook className="w-5 h-5" /> },
  { id: 'other', name: 'Other', icon: <IoFitness className="w-5 h-5" /> },
];

const DailyRoutine = () => {
  const [routines, setRoutines] = useState([]);
  const [currentRoutine, setCurrentRoutine] = useState({
    time: '',
    activity: '',
    duration: '',
    notes: '',
  });

  const handleAddRoutine = () => {
    if (currentRoutine.time && currentRoutine.activity) {
      setRoutines([...routines, { ...currentRoutine, id: Date.now() }]);
      setCurrentRoutine({ time: '', activity: '', duration: '', notes: '' });
    }
  };

  const handleDeleteRoutine = (id) => {
    setRoutines(routines.filter((routine) => routine.id !== id));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="container mx-auto px-4 py-8"
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-8 gradient-text">Daily Routine Planner</h2>
        
        {/* Add New Routine Form */}
        <div className="card mb-8">
          <h3 className="text-2xl font-semibold mb-4">Add New Activity</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-1">Time</label>
              <input
                type="time"
                value={currentRoutine.time}
                onChange={(e) => setCurrentRoutine({ ...currentRoutine, time: e.target.value })}
                className="input-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Duration (minutes)</label>
              <input
                type="number"
                value={currentRoutine.duration}
                onChange={(e) => setCurrentRoutine({ ...currentRoutine, duration: e.target.value })}
                className="input-primary"
                placeholder="Enter duration"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Activity Type</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
              {activityTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setCurrentRoutine({ ...currentRoutine, activity: type.id })}
                  className={`flex items-center justify-center p-3 rounded-xl border transition-all duration-200 ${
                    currentRoutine.activity === type.id
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-border hover:border-primary'
                  }`}
                >
                  <span className="mr-2">{type.icon}</span>
                  <span className="text-sm font-medium">{type.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Notes</label>
            <textarea
              value={currentRoutine.notes}
              onChange={(e) => setCurrentRoutine({ ...currentRoutine, notes: e.target.value })}
              className="input-primary min-h-[100px]"
              placeholder="Add any notes or details..."
            />
          </div>

          <button onClick={handleAddRoutine} className="btn-primary w-full">
            Add to Routine
          </button>
        </div>

        {/* Routine List */}
        <div className="space-y-4">
          {routines.sort((a, b) => a.time.localeCompare(b.time)).map((routine) => (
            <motion.div
              key={routine.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="card"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="text-xl font-semibold">
                    {routine.time}
                  </div>
                  <div className="flex items-center">
                    {activityTypes.find(type => type.id === routine.activity)?.icon}
                    <span className="ml-2 font-medium">
                      {activityTypes.find(type => type.id === routine.activity)?.name}
                    </span>
                  </div>
                  {routine.duration && (
                    <div className="text-muted">
                      {routine.duration} minutes
                    </div>
                  )}
                </div>
                <button
                  onClick={() => handleDeleteRoutine(routine.id)}
                  className="text-muted hover:text-primary transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              {routine.notes && (
                <div className="mt-2 text-muted">
                  {routine.notes}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default DailyRoutine;
