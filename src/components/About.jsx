import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const About = () => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: false
  });

  const history = [
    {
      year: '2021',
      title: 'The Beginning',
      description: 'FitForge was born from a simple idea: make fitness accessible and personalized for everyone. Our founders, fitness enthusiasts and tech innovators, saw the need for a more intelligent workout companion.'
    },
    {
      year: '2022',
      title: 'Innovation & Growth',
      description: 'Launched our AI-powered workout generation system and achievement tracking. The community grew to over 10,000 active users, with success stories pouring in from around the globe.'
    },
    {
      year: '2023',
      title: 'Going Global',
      description: 'Expanded our platform with multiple language support and region-specific workout plans. Introduced advanced progress tracking and social features.'
    },
    {
      year: 'Present',
      title: 'The Future of Fitness',
      description: 'Continuing to innovate with cutting-edge technology while maintaining our core mission: helping people achieve their fitness goals through personalized, adaptive workouts.'
    }
  ];

  return (
    <section className="min-h-screen bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl font-bold text-black mb-4">Our Journey</h2>
          <p className="text-xl text-gray-600 font-montserrat max-w-2xl mx-auto">
            From a simple idea to a global fitness platform, discover how FitForge is transforming lives through technology and dedication.
          </p>
        </motion.div>

        <div ref={ref} className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gray-200" />

          {/* Timeline items */}
          {history.map((item, index) => (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className={`relative grid grid-cols-2 gap-8 mb-16 ${
                index % 2 === 0 ? 'text-right' : 'text-left'
              }`}
            >
              <div className={index % 2 === 0 ? '' : 'col-start-2'}>
                <div className={`bg-white p-8 rounded-lg shadow-lg ${
                  index % 2 === 0 ? 'mr-8' : 'ml-8'
                }`}>
                  <span className="text-sm font-bold text-gray-400">{item.year}</span>
                  <h3 className="text-2xl font-bold text-black mt-2 mb-4">{item.title}</h3>
                  <p className="text-gray-600 font-montserrat">{item.description}</p>
                </div>
              </div>
              
              {/* Timeline dot */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-black rounded-full" 
                   style={{ top: '2rem' }} />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-20"
        >
          <h3 className="text-3xl font-bold text-black mb-4">Join Our Story</h3>
          <p className="text-xl text-gray-600 font-montserrat max-w-2xl mx-auto mb-8">
            Be part of the next chapter in fitness innovation. Start your journey with FitForge today.
          </p>
          <a href="#contact" className="btn-primary">
            Get Started
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
