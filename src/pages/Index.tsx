
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm"></div>
        
        {/* Animated Background Particles */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center"
          >
            {/* Logos */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex justify-center items-center gap-8 mb-8"
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl">
                  <span className="text-white font-bold text-lg">NIT</span>
                </div>
                <div className="text-white text-2xl font-light">×</div>
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center shadow-2xl">
                  <span className="text-white font-bold text-sm">UpGrad</span>
                </div>
                <div className="text-white text-2xl font-light">×</div>
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center shadow-2xl">
                  <span className="text-white font-bold text-lg">LPU</span>
                </div>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-6"
            >
              AI Workshop 2024
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-xl md:text-2xl text-gray-300 mb-4"
            >
              Data Science & Machine Learning Specialization
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-lg text-gray-400 mb-8"
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

      {/* Countdown Timer */}
      <CountdownTimer />

      {/* Journey Roadmap */}
      <JourneyRoadmap />

      {/* Trip Plan */}
      <TripPlan />

      {/* Registration Form */}
      <RegistrationForm />

      {/* FAQ Section */}
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
