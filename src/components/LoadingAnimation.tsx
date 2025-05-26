
import React from 'react';
import { motion } from 'framer-motion';

const LoadingAnimation = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center z-50">
      <div className="text-center">
        {/* AI Circuit Animation */}
        <motion.div
          className="relative w-32 h-32 mx-auto mb-8"
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        >
          <div className="absolute inset-0 border-4 border-transparent border-t-blue-500 rounded-full"></div>
          <div className="absolute inset-2 border-4 border-transparent border-r-purple-500 rounded-full"></div>
          <div className="absolute inset-4 border-4 border-transparent border-b-pink-500 rounded-full"></div>
          
          {/* Center AI Icon */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">AI</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Loading Text */}
        <motion.h2
          className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          Loading Workshop
        </motion.h2>

        {/* Progress Dots */}
        <div className="flex justify-center space-x-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingAnimation;
