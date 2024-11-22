import React, { useState } from 'react';

const UserForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    fitnessLevel: 'beginner',
    goals: [],
    equipment: [],
  });

  const fitnessLevels = ['beginner', 'intermediate', 'advanced'];
  const goalOptions = ['weight loss', 'muscle gain', 'endurance', 'flexibility'];
  const equipmentOptions = ['dumbbells', 'resistance bands', 'bodyweight only', 'full gym'];

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleGoalChange = (goal) => {
    setFormData(prev => ({
      ...prev,
      goals: prev.goals.includes(goal)
        ? prev.goals.filter(g => g !== goal)
        : [...prev.goals, goal]
    }));
  };

  const handleEquipmentChange = (item) => {
    setFormData(prev => ({
      ...prev,
      equipment: prev.equipment.includes(item)
        ? prev.equipment.filter(e => e !== item)
        : [...prev.equipment, item]
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6 bg-white rounded-lg shadow-md">
      <div>
        <h3 className="text-lg font-semibold mb-2">Fitness Level</h3>
        <select
          value={formData.fitnessLevel}
          onChange={(e) => setFormData(prev => ({ ...prev, fitnessLevel: e.target.value }))}
          className="w-full p-2 border rounded-md"
        >
          {fitnessLevels.map(level => (
            <option key={level} value={level}>
              {level.charAt(0).toUpperCase() + level.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Fitness Goals</h3>
        <div className="grid grid-cols-2 gap-2">
          {goalOptions.map(goal => (
            <label key={goal} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.goals.includes(goal)}
                onChange={() => handleGoalChange(goal)}
                className="rounded text-primary"
              />
              <span>{goal.charAt(0).toUpperCase() + goal.slice(1)}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Available Equipment</h3>
        <div className="grid grid-cols-2 gap-2">
          {equipmentOptions.map(item => (
            <label key={item} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.equipment.includes(item)}
                onChange={() => handleEquipmentChange(item)}
                className="rounded text-primary"
              />
              <span>{item.charAt(0).toUpperCase() + item.slice(1)}</span>
            </label>
          ))}
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
      >
        Generate Workout Plan
      </button>
    </form>
  );
};

export default UserForm;
