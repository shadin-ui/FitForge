import React from 'react';

const Features = () => {
  const features = [
    {
      title: "Personalized Plans",
      description: "Get workout plans tailored to your fitness level, goals, and available equipment."
    },
    {
      title: "Progress Tracking",
      description: "Track your workouts and see your progress over time with detailed statistics."
    },
    {
      title: "Achievement System",
      description: "Earn badges and rewards as you reach fitness milestones and stay consistent."
    },
    {
      title: "Mobile Friendly",
      description: "Access your workouts anywhere, anytime with our responsive design."
    }
  ];

  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold text-black mb-4">
            Why Choose FitForge?
          </h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            Experience a new way of working out with features designed to help you succeed
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="relative group"
            >
              <div className="h-1 w-12 bg-black mb-8 transition-all duration-200 group-hover:w-16"></div>
              <h3 className="text-xl font-bold text-black mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-500 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
