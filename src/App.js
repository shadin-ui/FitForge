import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { ThemeProvider, ThemeToggle } from './components/ThemeProvider';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import UserForm from './components/UserForm';
import WorkoutPlan from './components/WorkoutPlan';
import Progress from './components/Progress';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import About from './components/About';
import Contact from './components/Contact';
import DailyRoutine from './components/DailyRoutine';
import ClientProfile from './components/ClientProfile';

const Home = () => {
  const [workoutPlan, setWorkoutPlan] = useState(null);
  const [progress, setProgress] = useState(() => {
    const savedProgress = localStorage.getItem('fitforgeProgress');
    return savedProgress ? JSON.parse(savedProgress) : {
      completedWorkouts: 0,
      badges: []
    };
  });

  useEffect(() => {
    localStorage.setItem('fitforgeProgress', JSON.stringify(progress));
  }, [progress]);

  const generateWorkoutPlan = (userData) => {
    const exercises = {
      beginner: {
        'bodyweight only': [
          { name: 'Push-ups', sets: 3, reps: 10, instruction: 'Keep your body straight and lower your chest to the ground' },
          { name: 'Squats', sets: 3, reps: 15, instruction: 'Keep your back straight and feet shoulder-width apart' },
          { name: 'Plank', sets: 3, reps: '30 seconds', instruction: 'Maintain a straight line from head to heels' }
        ],
        'dumbbells': [
          { name: 'Dumbbell Rows', sets: 3, reps: 12, instruction: 'Keep your back straight and pull the weight to your hip' },
          { name: 'Goblet Squats', sets: 3, reps: 12, instruction: 'Hold dumbbell at chest level and perform a squat' }
        ]
      },
      intermediate: {
        'bodyweight only': [
          { name: 'Diamond Push-ups', sets: 4, reps: 12, instruction: 'Form a diamond shape with your hands under your chest' },
          { name: 'Jump Squats', sets: 4, reps: 15, instruction: 'Perform a squat and jump explosively at the top' }
        ],
        'dumbbells': [
          { name: 'Renegade Rows', sets: 4, reps: 12, instruction: 'Start in plank position with dumbbells, row one arm at a time' },
          { name: 'Walking Lunges', sets: 3, reps: '12 each leg', instruction: 'Hold dumbbells at sides and perform walking lunges' }
        ]
      }
    };

    const plan = [];
    const availableExercises = exercises[userData.fitnessLevel];
    
    for (let i = 0; i < 5; i++) {
      const dayExercises = [];
      userData.equipment.forEach(equipment => {
        if (availableExercises[equipment]) {
          dayExercises.push(...availableExercises[equipment]);
        }
      });
      
      plan.push({
        exercises: dayExercises.sort(() => Math.random() - 0.5).slice(0, 4)
      });
    }

    setWorkoutPlan(plan);
    checkAndAwardBadges();
  };

  const checkAndAwardBadges = () => {
    const newBadges = [...progress.badges];
    
    if (progress.completedWorkouts >= 5 && !newBadges.find(b => b.name === 'Getting Started')) {
      newBadges.push({
        name: 'Getting Started',
        description: 'Complete 5 workouts',
        icon: '🌟'
      });
    }
    
    if (progress.completedWorkouts >= 10 && !newBadges.find(b => b.name === 'Consistency')) {
      newBadges.push({
        name: 'Consistency',
        description: 'Complete 10 workouts',
        icon: '🏆'
      });
    }

    setProgress(prev => ({
      ...prev,
      badges: newBadges
    }));
  };

  const completeWorkout = () => {
    setProgress(prev => ({
      ...prev,
      completedWorkouts: prev.completedWorkouts + 1
    }));
    checkAndAwardBadges();
  };

  return (
    <>
      <Hero />
      <Features />
      <section id="workouts" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Get Your Personalized Workout Plan
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Tell us about your fitness journey, and we'll create a custom plan just for you
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <UserForm onSubmit={generateWorkoutPlan} />
            </div>
            <div className="space-y-8">
              {workoutPlan && (
                <>
                  <WorkoutPlan plan={workoutPlan} />
                  <button
                    onClick={completeWorkout}
                    className="w-full bg-secondary text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors"
                  >
                    Complete Workout
                  </button>
                </>
              )}
              <Progress
                completedWorkouts={progress.completedWorkouts}
                badges={progress.badges}
              />
            </div>
          </div>
        </div>
      </section>
      <Testimonials />
    </>
  );
};

function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <ThemeProvider>
        <Header />
        <main className="flex-grow pt-20">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/planner" element={<WorkoutPlan />} />
              <Route path="/routine" element={<DailyRoutine />} />
              <Route path="/profile" element={<ClientProfile />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </AnimatePresence>
        </main>
        <Footer />
        <ThemeToggle />
      </ThemeProvider>
    </div>
  );
}

export default App;
