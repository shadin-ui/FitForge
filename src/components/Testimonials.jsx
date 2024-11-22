import React from 'react';

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Fitness Enthusiast",
      quote: "FitForge transformed my workout routine. The personalized plans and progress tracking keep me motivated every day."
    },
    {
      name: "Mike Chen",
      role: "Software Developer",
      quote: "As a busy professional, FitForge helps me stay consistent with my workouts. The mobile app is a game-changer."
    },
    {
      name: "Emma Wilson",
      role: "Personal Trainer",
      quote: "I recommend FitForge to all my clients. The workout plans are well-structured and adaptable to any fitness level."
    }
  ];

  return (
    <section id="testimonials" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold text-black mb-4">
            What Our Users Say
          </h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            Join thousands of satisfied users who have transformed their fitness journey
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="relative bg-white p-8 group hover:bg-black transition-colors duration-300"
            >
              <div className="h-1 w-12 bg-black mb-8 group-hover:bg-white transition-colors duration-300"></div>
              <p className="text-gray-500 group-hover:text-white transition-colors duration-300 mb-8">
                "{testimonial.quote}"
              </p>
              <div>
                <h3 className="text-lg font-bold text-black group-hover:text-white transition-colors duration-300">
                  {testimonial.name}
                </h3>
                <p className="text-gray-500 group-hover:text-gray-300 transition-colors duration-300">
                  {testimonial.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
