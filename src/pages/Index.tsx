import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Users, Trophy, Clock, Download, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import JourneyRoadmap from '@/components/JourneyRoadmap';
import TripPlan from '@/components/TripPlan';
import RegistrationForm from '@/components/RegistrationForm';
import CountdownTimer from '@/components/CountdownTimer';
import LoadingAnimation from '@/components/LoadingAnimation';
import FAQ from '@/components/FAQ';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingAnimation />;
  }

  return (
    <div className="min-h-screen bg-slate-900 relative overflow-hidden">
      {/* Professional AI Background */}
      <div className="absolute inset-0">
        {/* Gradient Base */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900/30 to-slate-900"></div>
        
        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        {/* Circuit Board Lines */}
        <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="circuit" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M 10,30 L 90,30 M 30,10 L 30,90 M 70,10 L 70,90" stroke="#3b82f6" strokeWidth="1" fill="none"/>
              <circle cx="30" cy="30" r="3" fill="#3b82f6"/>
              <circle cx="70" cy="30" r="3" fill="#8b5cf6"/>
              <circle cx="50" cy="70" r="3" fill="#ec4899"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#circuit)"/>
        </svg>

        {/* Floating AI Particles */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -50, 0],
                x: [0, Math.random() * 20 - 10, 0],
                opacity: [0.3, 0.8, 0.3],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 4 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 3,
                ease: "easeInOut"
              }}
            >
              <div className={`w-${Math.random() > 0.5 ? '2' : '1'} h-${Math.random() > 0.5 ? '2' : '1'} rounded-full`}
                   style={{
                     background: ['#3b82f6', '#8b5cf6', '#ec4899'][Math.floor(Math.random() * 3)],
                     boxShadow: '0 0 10px currentColor'
                   }}>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Neural Network Animation */}
        <div className="absolute inset-0 opacity-20">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-px bg-gradient-to-b from-transparent via-blue-400 to-transparent"
              style={{
                left: `${(i + 1) * 12.5}%`,
                height: '100%',
              }}
              animate={{
                opacity: [0, 1, 0],
                scaleY: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.4,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        {/* Professional Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/50 to-slate-900/80"></div>
        
        {/* Partner Logos with Better Visibility */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute top-8 left-8 z-20"
        >
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/20 shadow-2xl">
            <img 
              src="/lovable-uploads/cb29001b-3ab3-4185-9007-0bcef8eb8815.png" 
              alt="Lovely Professional University" 
              className="h-12 md:h-16 w-auto object-contain"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="absolute top-8 right-8 z-20"
        >
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/20 shadow-2xl">
            <img 
              src="/lovable-uploads/baf9c20c-44a5-4873-83e0-b14b890766e4.png" 
              alt="UpGrad" 
              className="h-12 md:h-16 w-auto object-contain"
            />
          </div>
        </motion.div>
        
        <div className="container mx-auto px-4 z-10 pt-20">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center"
          >
            {/* Central Logo with Glass Effect */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex justify-center items-center gap-8 mb-8"
            >
              <div className="flex items-center gap-4 bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 shadow-2xl">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg ring-2 ring-blue-400/30">
                  <span className="text-white font-bold text-lg">NIT</span>
                </div>
                <div className="text-white/60 text-2xl font-light">×</div>
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg ring-2 ring-orange-400/30">
                  <span className="text-white font-bold text-sm">UpGrad</span>
                </div>
                <div className="text-white/60 text-2xl font-light">×</div>
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg ring-2 ring-green-400/30">
                  <span className="text-white font-bold text-lg">LPU</span>
                </div>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-6 drop-shadow-lg"
            >
              AI Workshop 2024
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-xl md:text-2xl text-gray-200 mb-4 font-medium"
            >
              Data Science & Machine Learning Specialization
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-lg text-gray-300 mb-8"
            >
              NIT Jalandhar | December 11-14, 2024
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300"
                onClick={() => document.getElementById('registration')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Register Now - ₹999
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white px-8 py-3 rounded-full transition-all duration-300"
                onClick={() => document.getElementById('journey')?.scrollIntoView({ behavior: 'smooth' })}
              >
                View Journey
              </Button>
            </motion.div>

            {/* Key Features */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              <Card className="bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/20 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <Users className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                  <h3 className="text-white font-semibold mb-2">Expert Mentors</h3>
                  <p className="text-gray-300 text-sm">Learn from industry professionals</p>
                </CardContent>
              </Card>
              <Card className="bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/20 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <MapPin className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                  <h3 className="text-white font-semibold mb-2">Industrial Tour</h3>
                  <p className="text-gray-300 text-sm">Visit Mohali tech companies</p>
                </CardContent>
              </Card>
              <Card className="bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/20 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <Trophy className="w-8 h-8 text-pink-400 mx-auto mb-3" />
                  <h3 className="text-white font-semibold mb-2">Certification</h3>
                  <p className="text-gray-300 text-sm">Official completion certificate</p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      
      <CountdownTimer />
      <JourneyRoadmap />
      <TripPlan />
      <RegistrationForm />
      <FAQ />

      {/* Contact Section */}
      <section className="py-20 bg-gradient-to-r from-slate-800 to-slate-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="text-4xl font-bold text-white mb-8">Need Help?</h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full"
                onClick={() => window.open('https://wa.me/1234567890', '_blank')}
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                WhatsApp Support
              </Button>
              <Button
                variant="outline"
                className="border-2 border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white px-6 py-3 rounded-full"
                onClick={() => window.open('mailto:support@nitjalandhar.ac.in')}
              >
                Email Support
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-gray-400 py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 NIT Jalandhar. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
