import React, { useState } from 'react';
import { motion } from 'framer-motion';

const initialMetrics = {
  weight: '',
  height: '',
  bodyFat: '',
  goals: [],
  fitnessLevel: '',
  medicalConditions: '',
  dietaryRestrictions: '',
};

const fitnessGoals = [
  { id: 'weightLoss', name: 'Weight Loss', icon: '⚖️' },
  { id: 'muscleGain', name: 'Muscle Gain', icon: '💪' },
  { id: 'endurance', name: 'Endurance', icon: '🏃‍♂️' },
  { id: 'flexibility', name: 'Flexibility', icon: '🧘‍♂️' },
  { id: 'strength', name: 'Strength', icon: '🏋️‍♂️' },
  { id: 'wellness', name: 'General Wellness', icon: '🌟' },
];

const fitnessLevels = [
  { id: 'beginner', name: 'Beginner', description: 'New to fitness' },
  { id: 'intermediate', name: 'Intermediate', description: 'Regular exercise' },
  { id: 'advanced', name: 'Advanced', description: 'Experienced athlete' },
];

const ClientProfile = () => {
  const [metrics, setMetrics] = useState(initialMetrics);
  const [progressPhotos, setProgressPhotos] = useState([]);
  const [measurements, setMeasurements] = useState([]);
  const [activeTab, setActiveTab] = useState('profile');

  const handleMetricChange = (field, value) => {
    setMetrics((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleGoalToggle = (goalId) => {
    setMetrics((prev) => ({
      ...prev,
      goals: prev.goals.includes(goalId)
        ? prev.goals.filter((id) => id !== goalId)
        : [...prev.goals, goalId],
    }));
  };

  const handleAddMeasurement = () => {
    const newMeasurement = {
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      chest: '',
      waist: '',
      hips: '',
      arms: '',
      thighs: '',
    };
    setMeasurements([...measurements, newMeasurement]);
  };

  const handleMeasurementChange = (id, field, value) => {
    setMeasurements(
      measurements.map((m) =>
        m.id === id ? { ...m, [field]: value } : m
      )
    );
  };

  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProgressPhotos([
          ...progressPhotos,
          {
            id: Date.now(),
            date: new Date().toISOString().split('T')[0],
            url: reader.result,
          },
        ]);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-4">Client Profile</h2>
          <p className="text-muted">Track your progress and manage your fitness journey</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-4 border-b border-border">
          {['profile', 'measurements', 'photos'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 font-medium capitalize transition-colors ${
                activeTab === tab
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-muted hover:text-foreground'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Basic Metrics */}
            <div className="card space-y-6">
              <h3 className="text-2xl font-bold">Basic Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Weight (kg)</label>
                  <input
                    type="number"
                    value={metrics.weight}
                    onChange={(e) => handleMetricChange('weight', e.target.value)}
                    className="input-primary"
                    placeholder="Enter weight"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Height (cm)</label>
                  <input
                    type="number"
                    value={metrics.height}
                    onChange={(e) => handleMetricChange('height', e.target.value)}
                    className="input-primary"
                    placeholder="Enter height"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Body Fat %</label>
                  <input
                    type="number"
                    value={metrics.bodyFat}
                    onChange={(e) => handleMetricChange('bodyFat', e.target.value)}
                    className="input-primary"
                    placeholder="Enter body fat percentage"
                  />
                </div>
              </div>
            </div>

            {/* Fitness Goals */}
            <div className="card space-y-6">
              <h3 className="text-2xl font-bold">Fitness Goals</h3>
              <div className="grid grid-cols-2 gap-2">
                {fitnessGoals.map((goal) => (
                  <button
                    key={goal.id}
                    onClick={() => handleGoalToggle(goal.id)}
                    className={`p-4 rounded-xl border transition-all duration-200 ${
                      metrics.goals.includes(goal.id)
                        ? 'border-primary bg-primary/10'
                        : 'border-border hover:border-primary'
                    }`}
                  >
                    <span className="text-2xl mb-2">{goal.icon}</span>
                    <p className="font-medium">{goal.name}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Fitness Level */}
            <div className="card space-y-6">
              <h3 className="text-2xl font-bold">Fitness Level</h3>
              <div className="space-y-2">
                {fitnessLevels.map((level) => (
                  <button
                    key={level.id}
                    onClick={() => handleMetricChange('fitnessLevel', level.id)}
                    className={`w-full p-4 rounded-xl border text-left transition-all duration-200 ${
                      metrics.fitnessLevel === level.id
                        ? 'border-primary bg-primary/10'
                        : 'border-border hover:border-primary'
                    }`}
                  >
                    <p className="font-medium">{level.name}</p>
                    <p className="text-sm text-muted">{level.description}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Medical & Dietary */}
            <div className="card space-y-6">
              <h3 className="text-2xl font-bold">Health Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Medical Conditions</label>
                  <textarea
                    value={metrics.medicalConditions}
                    onChange={(e) => handleMetricChange('medicalConditions', e.target.value)}
                    className="input-primary min-h-[100px]"
                    placeholder="List any medical conditions or injuries..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Dietary Restrictions</label>
                  <textarea
                    value={metrics.dietaryRestrictions}
                    onChange={(e) => handleMetricChange('dietaryRestrictions', e.target.value)}
                    className="input-primary min-h-[100px]"
                    placeholder="List any dietary restrictions or preferences..."
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Measurements Tab */}
        {activeTab === 'measurements' && (
          <div className="space-y-8">
            <button onClick={handleAddMeasurement} className="btn-primary">
              Add New Measurement
            </button>
            <div className="space-y-4">
              {measurements.map((measurement) => (
                <div key={measurement.id} className="card space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold">
                      Measurement - {measurement.date}
                    </h3>
                    <button
                      onClick={() => setMeasurements(measurements.filter((m) => m.id !== measurement.id))}
                      className="text-muted hover:text-primary"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {['chest', 'waist', 'hips', 'arms', 'thighs'].map((part) => (
                      <div key={part}>
                        <label className="block text-sm font-medium mb-1 capitalize">
                          {part} (cm)
                        </label>
                        <input
                          type="number"
                          value={measurement[part]}
                          onChange={(e) =>
                            handleMeasurementChange(measurement.id, part, e.target.value)
                          }
                          className="input-primary"
                          placeholder={`Enter ${part}`}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Photos Tab */}
        {activeTab === 'photos' && (
          <div className="space-y-8">
            <div className="card space-y-4">
              <h3 className="text-2xl font-bold">Progress Photos</h3>
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
                id="photo-upload"
              />
              <label
                htmlFor="photo-upload"
                className="btn-primary inline-block cursor-pointer"
              >
                Upload New Photo
              </label>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {progressPhotos.map((photo) => (
                <div key={photo.id} className="card">
                  <img
                    src={photo.url}
                    alt={`Taken on ${photo.date}`}
                    className="w-full h-48 object-cover rounded-lg mb-2"
                  />
                  <p className="text-sm text-muted">{photo.date}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default ClientProfile;
