
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Download, Calendar, MapPin, Clock, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

const Success = () => {
  const [registrationData, setRegistrationData] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const data = localStorage.getItem('registrationData');
    if (data) {
      setRegistrationData(JSON.parse(data));
    } else {
      // Redirect to home if no registration data
      navigate('/');
    }
  }, [navigate]);

  const generatePDF = () => {
    // Simple PDF generation simulation
    const doc = `
      AI WORKSHOP 2025 - ENTRY PASS
      
      Participant: ${registrationData?.name}
      Registration ID: ${registrationData?.registrationId}
      Email: ${registrationData?.email}
      Phone: ${registrationData?.phone}
      
      Event Details:
      - Dates: June 11-14, 2025 (can be extended)
      - Venue: NIT Jalandhar & Mohali
      - Status: CONFIRMED
      
      This serves as your official entry pass.
      Please present this document at the venue.
      
      Organized by: NIT Jalandhar, UpGrad, LPU
    `;

    const blob = new Blob([doc], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `AI_Workshop_Pass_${registrationData?.registrationId}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!registrationData) {
    return <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <div className="text-white">Loading...</div>
    </div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Success Animation */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl"
            >
              <CheckCircle className="w-12 h-12 text-white" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-4"
            >
              Successfully Registered!
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="text-xl text-gray-300 mb-8"
            >
              Welcome to the AI Workshop 2025
            </motion.p>
          </motion.div>

          {/* Registration Details */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="max-w-2xl mx-auto"
          >
            <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border-white/20 mb-8">
              <CardHeader>
                <CardTitle className="text-2xl text-white text-center flex items-center justify-center gap-2">
                  <User className="w-6 h-6" />
                  Registration Confirmed
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-gray-400 text-sm">Full Name</label>
                    <p className="text-white font-medium">{registrationData.name}</p>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm">Registration ID</label>
                    <p className="text-white font-medium">{registrationData.registrationId}</p>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm">Email</label>
                    <p className="text-white font-medium">{registrationData.email}</p>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm">Phone</label>
                    <p className="text-white font-medium">{registrationData.phone}</p>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 p-4 rounded-lg border border-green-500/30">
                  <p className="text-green-300 font-medium">Payment Status: Completed</p>
                  <p className="text-sm text-green-400">Amount Paid: ₹999</p>
                </div>
              </CardContent>
            </Card>

            {/* Event Details */}
            <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border-white/20 mb-8">
              <CardHeader>
                <CardTitle className="text-xl text-white">Event Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-blue-400" />
                  <div>
                    <p className="text-white font-medium">June 11-14, 2025 <span className="text-green-400 text-sm">(can be extended)</span></p>
                    <p className="text-gray-400 text-sm">4-Day AI Workshop</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-purple-400" />
                  <div>
                    <p className="text-white font-medium">NIT Jalandhar & Mohali</p>
                    <p className="text-gray-400 text-sm">Including industrial tour</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-pink-400" />
                  <div>
                    <p className="text-white font-medium">9:00 AM onwards</p>
                    <p className="text-gray-400 text-sm">Please arrive 30 minutes early</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Download Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.8 }}
              className="text-center space-y-4"
            >
              <Button
                onClick={generatePDF}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2 mx-auto"
              >
                <Download className="w-5 h-5" />
                Download Entry Pass
              </Button>

              <p className="text-gray-400 text-sm">
                This document serves as your official entry pass. Please present it at the venue.
              </p>

              <div className="mt-8">
                <Button
                  variant="outline"
                  onClick={() => navigate('/')}
                  className="border-2 border-gray-400 text-gray-400 hover:bg-gray-400 hover:text-black px-6 py-2 rounded-full"
                >
                  Back to Home
                </Button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Next Steps */}
      <section className="py-16 bg-gradient-to-r from-slate-800 to-slate-700">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.8 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-white mb-8">What's Next?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <Card className="bg-white/10 backdrop-blur-lg border-white/20">
                <CardContent className="p-6 text-center">
                  <Calendar className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                  <h3 className="text-white font-semibold mb-2">Save the Date</h3>
                  <p className="text-gray-300 text-sm">Add the workshop dates to your calendar</p>
                </CardContent>
              </Card>
              <Card className="bg-white/10 backdrop-blur-lg border-white/20">
                <CardContent className="p-6 text-center">
                  <Download className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                  <h3 className="text-white font-semibold mb-2">Download Pass</h3>
                  <p className="text-gray-300 text-sm">Keep your entry pass handy</p>
                </CardContent>
              </Card>
              <Card className="bg-white/10 backdrop-blur-lg border-white/20">
                <CardContent className="p-6 text-center">
                  <MapPin className="w-8 h-8 text-pink-400 mx-auto mb-3" />
                  <h3 className="text-white font-semibold mb-2">Prepare for Journey</h3>
                  <p className="text-gray-300 text-sm">Get ready for an amazing learning experience</p>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Success;
