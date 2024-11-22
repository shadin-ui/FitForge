import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="relative min-h-screen overflow-hidden pt-32 pb-20">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 animate-gradient" />
      
      {/* Floating shapes */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-20 right-10 w-64 h-64 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 blur-3xl"
      />
      <motion.div
        animate={{
          y: [0, 20, 0],
          rotate: [0, -5, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-20 left-10 w-72 h-72 rounded-full bg-gradient-to-r from-secondary/20 to-accent/20 blur-3xl"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center lg:text-left lg:grid lg:grid-cols-2 lg:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl font-bold mb-6 leading-tight">
              Transform Your
              <span className="gradient-text"> Fitness Journey</span>
            </h1>
            <p className="text-xl text-muted mb-8 font-montserrat leading-relaxed">
              Personalized workout plans that adapt to your goals, schedule, and fitness level. Start your transformation today with FitForge.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <motion.a
                href="#workouts"
                className="btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Your Journey
              </motion.a>
              <motion.a
                href="#features"
                className="btn-secondary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Learn More
              </motion.a>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-12 lg:mt-0"
          >
            <div className="bg-gradient-to-br from-card via-card to-card-hover p-8 rounded-2xl shadow-xl backdrop-blur-sm">
              <div className="grid grid-cols-2 gap-8">
                <div className="text-center">
                  <h3 className="text-4xl font-bold gradient-text mb-2">5K+</h3>
                  <p className="text-muted font-montserrat">Active Users</p>
                </div>
                <div className="text-center">
                  <h3 className="text-4xl font-bold gradient-text mb-2">98%</h3>
                  <p className="text-muted font-montserrat">Success Rate</p>
                </div>
                <div className="text-center">
                  <h3 className="text-4xl font-bold gradient-text mb-2">200+</h3>
                  <p className="text-muted font-montserrat">Workouts</p>
                </div>
                <div className="text-center">
                  <h3 className="text-4xl font-bold gradient-text mb-2">4.9</h3>
                  <p className="text-muted font-montserrat">User Rating</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
