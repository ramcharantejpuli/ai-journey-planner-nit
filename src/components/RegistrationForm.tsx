
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, Upload, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    idProof: null as File | null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        idProof: file
      }));
    }
  };

  const handlePayment = async () => {
    // Validate form
    if (!formData.name || !formData.email || !formData.phone || !formData.idProof) {
      toast({
        title: "Missing Information",
        description: "Please fill all fields and upload ID proof",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate payment processing
    setTimeout(() => {
      // Store registration data
      const registrationData = {
        ...formData,
        registrationId: `WS${Date.now()}`,
        paymentStatus: 'completed',
        registrationDate: new Date().toISOString()
      };
      
      localStorage.setItem('registrationData', JSON.stringify(registrationData));
      
      toast({
        title: "Payment Successful!",
        description: "Redirecting to success page...",
      });

      // Redirect to success page
      setTimeout(() => {
        navigate('/success');
      }, 2000);
      
      setIsSubmitting(false);
    }, 3000);
  };

  return (
    <section id="registration" className="py-20 bg-gradient-to-b from-slate-800 to-slate-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
            Register Now
          </h2>
          <p className="text-gray-400 text-lg">Secure your spot in the AI Workshop</p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border-white/20">
              <CardHeader>
                <CardTitle className="text-2xl text-white text-center">
                  Workshop Registration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Name Field */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Full Name *
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    className="bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-blue-400"
                    required
                  />
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email address"
                    className="bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-blue-400"
                    required
                  />
                </div>

                {/* Phone Field */}
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-white flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Contact Number *
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Enter your contact number"
                    className="bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-blue-400"
                    required
                  />
                </div>

                {/* ID Proof Upload */}
                <div className="space-y-2">
                  <Label htmlFor="idProof" className="text-white flex items-center gap-2">
                    <Upload className="w-4 h-4" />
                    ID Proof Upload *
                  </Label>
                  <Input
                    id="idProof"
                    name="idProof"
                    type="file"
                    onChange={handleFileChange}
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="bg-white/10 border-white/20 text-white file:bg-blue-600 file:text-white file:border-0 file:rounded-md file:px-4 file:py-2"
                    required
                  />
                  <p className="text-sm text-gray-400">
                    Upload Aadhar Card, Passport, or College ID (PDF/Image)
                  </p>
                </div>

                {/* Registration Fee Info */}
                <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 p-4 rounded-lg border border-blue-500/30">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-white font-semibold">Registration Fee</h3>
                      <p className="text-gray-300 text-sm">Includes all workshop materials, meals, and certificates</p>
                    </div>
                    <div className="text-right">
                      <span className="text-3xl font-bold text-white">₹999</span>
                      <p className="text-gray-400 text-sm">All inclusive</p>
                    </div>
                  </div>
                </div>

                {/* Payment Button */}
                <Button
                  onClick={handlePayment}
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                  ) : (
                    <>
                      <CreditCard className="w-5 h-5" />
                      Pay ₹999 & Register
                    </>
                  )}
                </Button>

                <p className="text-sm text-gray-400 text-center">
                  Secure payment powered by Razorpay. Your data is protected.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default RegistrationForm;
