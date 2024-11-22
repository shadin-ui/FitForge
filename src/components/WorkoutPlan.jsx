import React from 'react';

const WorkoutPlan = ({ plan }) => {
  if (!plan) return null;

  return (
    <div className="space-y-6 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-dark">Your Custom Workout Plan</h2>
      {plan.map((day, index) => (
        <div key={index} className="border-b pb-4 last:border-b-0">
          <h3 className="text-lg font-semibold mb-2">Day {index + 1}</h3>
          <div className="space-y-3">
            {day.exercises.map((exercise, exIndex) => (
              <div key={exIndex} className="bg-gray-50 p-3 rounded-md">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{exercise.name}</span>
                  <span className="text-sm text-gray-600">
                    {exercise.sets} sets × {exercise.reps} reps
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1">{exercise.instruction}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default WorkoutPlan;
