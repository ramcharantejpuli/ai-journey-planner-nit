
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, BookOpen, Award, Plane } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const TripPlan = () => {
  const days = [
    {
      day: 1,
      date: "Dec 11, 2024",
      title: "Workshop Introduction",
      location: "NIT Jalandhar",
      icon: BookOpen,
      activities: [
        "Registration & Welcome",
        "AI Fundamentals Overview",
        "Data Science Basics",
        "ML Introduction Session"
      ],
      time: "9:00 AM - 6:00 PM",
      color: "from-blue-500 to-blue-600"
    },
    {
      day: 3,
      date: "Dec 13, 2024",
      title: "Hands-on AI Labs",
      location: "NIT Jalandhar",
      icon: BookOpen,
      activities: [
        "Python for AI Workshop",
        "TensorFlow Hands-on",
        "Project Development",
        "Team Presentations"
      ],
      time: "9:00 AM - 6:00 PM",
      color: "from-pink-500 to-pink-600"
    },
    {
      day: 2,
      date: "Dec 12, 2024",
      title: "Industrial Tour",
      location: "Mohali Tech Hub",
      icon: MapPin,
      activities: [
        "Bus Departure (7:00 AM)",
        "Company Visits",
        "Industry Expert Sessions",
        "Networking Lunch"
      ],
      time: "7:00 AM - 8:00 PM",
      color: "from-purple-500 to-purple-600"
    },
    {
      day: 4,
      date: "Dec 14, 2024",
      title: "Certification & Departure",
      location: "NIT Jalandhar",
      icon: Award,
      activities: [
        "Final Project Showcase",
        "Certificate Distribution",
        "Group Photos",
        "Farewell & Networking"
      ],
      time: "9:00 AM - 2:00 PM",
      color: "from-green-500 to-green-600"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4 relative z-10 drop-shadow-[0_2px_10px_rgba(59,130,246,0.5)] pb-2">
            4-Day Trip Plan
          </h2>
          <p className="text-gray-400 text-lg">Your complete learning journey breakdown</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {days.map((day, index) => {
            const IconComponent = day.icon;
            return (
              <motion.div
                key={day.day}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <Card className="bg-gradient-to-br from-black to-gray-900 backdrop-blur-lg border border-gray-800 shadow-lg hover:shadow-xl transition-all duration-500 group overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-white/10 opacity-40"></div>
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.15),_transparent_70%)] pointer-events-none"></div>
                  <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>
                  <CardContent className="p-6">
                    {/* Day Header */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 bg-gradient-to-r ${day.color} rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300`}>
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-white">Day {day.day}</h3>
                          <p className="text-gray-400">{day.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-2 text-gray-400 mb-1">
                          <Clock className="w-4 h-4" />
                          <span className="text-sm">{day.time}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-400">
                          <MapPin className="w-4 h-4" />
                          <span className="text-sm">{day.location}</span>
                        </div>
                      </div>
                    </div>

                    {/* Title */}
                    <h4 className="text-xl font-semibold text-white mb-4">{day.title}</h4>

                    {/* Activities */}
                    <div className="space-y-3">
                      {day.activities.map((activity, actIndex) => (
                        <motion.div
                          key={actIndex}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.2 + actIndex * 0.1 }}
                          className="flex items-center gap-3"
                        >
                          <div className={`w-2 h-2 bg-gradient-to-r ${day.color} rounded-full`}></div>
                          <span className="text-gray-300">{activity}</span>
                        </motion.div>
                      ))}
                    </div>

                    {/* Special Day 2 Note */}
                    {day.day === 2 && day.title === "Industrial Tour" && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="mt-4 p-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg border border-purple-500/30"
                      >
                        <p className="text-sm text-purple-300 flex items-center gap-2">
                          <Plane className="w-4 h-4" />
                          Special transport arranged for Mohali visit
                        </p>
                      </motion.div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Download Agenda Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-12"
        >
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2 mx-auto">
            <Calendar className="w-5 h-5" />
            Download Complete Agenda
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default TripPlan;
