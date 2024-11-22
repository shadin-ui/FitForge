import React from 'react';

const Progress = ({ completedWorkouts, badges }) => {
  return (
    <div className="space-y-6 p-6 bg-white rounded-lg shadow-md">
      <div>
        <h2 className="text-2xl font-bold text-dark mb-4">Your Progress</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-primary">Workouts Completed</h3>
            <p className="text-3xl font-bold text-dark">{completedWorkouts}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-semibold text-secondary">Badges Earned</h3>
            <p className="text-3xl font-bold text-dark">{badges.length}</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Achievements</h3>
        <div className="grid grid-cols-2 gap-3">
          {badges.map((badge, index) => (
            <div
              key={index}
              className="flex items-center space-x-2 bg-gray-50 p-3 rounded-lg"
            >
              <div className="w-10 h-10 bg-secondary text-white rounded-full flex items-center justify-center">
                {badge.icon}
              </div>
              <div>
                <h4 className="font-medium">{badge.name}</h4>
                <p className="text-sm text-gray-600">{badge.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Progress;
