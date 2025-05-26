
import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, ArrowRight } from 'lucide-react';

const JourneyRoadmap = () => {
  return (
    <section id="journey" className="py-20 bg-slate-900 relative overflow-hidden">
      {/* Modern Animated Background */}
      <div className="absolute inset-0 z-0">
        {/* Animated Gradient Mesh */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-slate-900 to-purple-900/30 opacity-80"></div>
        
        {/* Animated Grid */}
        <div className="absolute inset-0 opacity-20" 
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
            backgroundPosition: 'center center'
          }}>
          <div className="absolute inset-0 animate-pulse duration-[10s]" 
            style={{
              backgroundImage: `radial-gradient(circle, rgba(147, 51, 234, 0.1) 1px, transparent 8px)`,
              backgroundSize: '60px 60px',
              backgroundPosition: 'center center'
            }}>
          </div>
        </div>

        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 4 + 1 + 'px',
              height: Math.random() * 4 + 1 + 'px',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: ['#3b82f6', '#8b5cf6', '#ec4899'][Math.floor(Math.random() * 3)],
              boxShadow: '0 0 10px currentColor'
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 4 + Math.random() * 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
        
        {/* Glowing Lines */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`line-${i}`}
            className="absolute h-px"
            style={{
              width: '100%',
              top: `${20 + i * 15}%`,
              background: 'linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.3), transparent)',
              opacity: 0.5
            }}
            animate={{
              opacity: [0.1, 0.5, 0.1],
              scaleY: [1, 1.5, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              delay: i * 0.7,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 relative z-10"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4 relative z-10 drop-shadow-[0_2px_10px_rgba(59,130,246,0.5)] pb-2">
            Your Learning Journey
          </h2>
          <p className="text-gray-200 text-lg font-medium relative z-10 drop-shadow-md">Follow the path from LPU to NIT Jalandhar to Mohali</p>
        </motion.div>

        {/* Animated SVG Path */}
        <div className="relative max-w-4xl mx-auto">
          <svg
            viewBox="0 0 800 400"
            className="w-full h-auto"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Background gradient */}
            <defs>
              <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="50%" stopColor="#8B5CF6" />
                <stop offset="100%" stopColor="#EC4899" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge> 
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            {/* Curved Path */}
            <motion.path
              d="M 100 300 Q 250 150, 400 200 Q 550 250, 700 150"
              stroke="url(#pathGradient)"
              strokeWidth="4"
              fill="transparent"
              filter="url(#glow)"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />

            {/* Animated Dot */}
            <motion.circle
              r="8"
              fill="#FFFFFF"
              filter="url(#glow)"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <animateMotion
                dur="3s"
                repeatCount="indefinite"
                begin="1s"
                path="M 100 300 Q 250 150, 400 200 Q 550 250, 700 150"
              />
            </motion.circle>

            {/* Location Markers */}
            <motion.g
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <circle cx="100" cy="300" r="12" fill="#3B82F6" />
              <text x="100" y="340" textAnchor="middle" className="fill-white text-sm font-medium">
                LPU
              </text>
            </motion.g>

            <motion.g
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              <circle cx="400" cy="200" r="12" fill="#8B5CF6" />
              <text x="400" y="240" textAnchor="middle" className="fill-white text-sm font-medium">
                NIT Jalandhar
              </text>
            </motion.g>

            <motion.g
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.5 }}
            >
              <circle cx="700" cy="150" r="12" fill="#EC4899" />
              <text x="700" y="190" textAnchor="middle" className="fill-white text-sm font-medium">
                Mohali
              </text>
            </motion.g>
          </svg>

          {/* Journey Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-2xl">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Start Point</h3>
              <p className="text-gray-400">Lovely Professional University</p>
              <p className="text-sm text-gray-500">Day 1 Activities</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-2xl">
                <ArrowRight className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Second Stop</h3>
              <p className="text-gray-400">NIT Jalandhar Campus</p>
              <p className="text-sm text-gray-500">Day 2, 4 Activities</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-2xl">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Final Destination</h3>
              <p className="text-gray-400">Mohali Tech Hub</p>
              <p className="text-sm text-gray-500">Day 3 Industrial Tour</p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JourneyRoadmap;
