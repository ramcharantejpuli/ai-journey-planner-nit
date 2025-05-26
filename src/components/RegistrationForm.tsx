import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, Upload, CreditCard, Tag, X, Check, Hash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { initiateRazorpayPayment, PaymentData } from '@/lib/razorpay';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    regNumber: '',
    idProof: null as File | null,
    couponCode: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState(false);
  const [couponValid, setCouponValid] = useState(false);
  const [couponError, setCouponError] = useState('');
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const originalPrice = 1499;
  const discountedPrice = 999;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Handle different input types
    if (name === 'couponCode') {
      // Convert coupon code to uppercase
      const uppercaseValue = value.toUpperCase();
      setFormData(prev => ({
        ...prev,
        [name]: uppercaseValue
      }));
      
      // Real-time validation as user types
      validateCouponRealtime(uppercaseValue);
      
      // If the exact coupon code is entered, automatically apply it
      if (uppercaseValue === 'LPUUPGRAD' && !appliedCoupon) {
        // Small delay to ensure the UI updates first
        setTimeout(() => {
          setAppliedCoupon(true);
          toast({
            title: "Coupon Applied!",
            description: "₹500 discount has been applied to your registration.",
          });
        }, 100);
      }
    } else if (name === 'regNumber') {
      // Only allow 8 digits for registration number
      const numericValue = value.replace(/[^0-9]/g, '');
      if (numericValue.length <= 8) {
        setFormData(prev => ({
          ...prev,
          [name]: numericValue
        }));
      }
    } else if (name === 'phone') {
      // Only allow digits for phone number
      const numericValue = value.replace(/[^0-9]/g, '');
      if (numericValue.length <= 10) {
        setFormData(prev => ({
          ...prev,
          [name]: numericValue
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
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

  // Real-time coupon validation and application
  const applyCoupon = () => {
    if (!formData.couponCode) {
      setCouponError('Please enter a coupon code');
      return;
    }
    
    if (formData.couponCode === 'LPUUPGRAD') {
      setAppliedCoupon(true);
      setCouponValid(true);
      setCouponError('');
      toast({
        title: "Coupon Applied!",
        description: "₹500 discount has been applied to your registration.",
      });
    } else {
      setCouponError('Invalid coupon code');
      setCouponValid(false);
    }
  };
  
  // Real-time coupon validation and auto-application as user types
  const validateCouponRealtime = (value: string) => {
    if (!value) {
      setCouponError('');
      setCouponValid(false);
      setAppliedCoupon(false);
      return;
    }
    
    if (value === 'LPUUPGRAD') {
      setCouponError('');
      setCouponValid(true);
      // Auto-apply the coupon immediately when valid
      if (!appliedCoupon) {
        setAppliedCoupon(true);
        toast({
          title: "Coupon Applied!",
          description: "₹500 discount has been applied to your registration.",
        });
      }
    } else {
      setCouponError('Invalid coupon code');
      setCouponValid(false);
      setAppliedCoupon(false);
    }
  };
  
  // Remove coupon and reset state
  const removeCoupon = () => {
    setAppliedCoupon(false);
    setCouponValid(false);
    setCouponError('');
    setFormData(prev => ({
      ...prev,
      couponCode: ''
    }));
    toast({
      title: "Coupon Removed",
      description: "Coupon has been removed from your registration.",
    });
  };

  const saveRegistrationToFirebase = async (paymentId = '') => {
    try {
      // Create registration data
      const registrationData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        regNumber: formData.regNumber,
        idProofName: formData.idProof ? formData.idProof.name : '',
        registrationId: `WS${Date.now()}`,
        paymentId: paymentId,
        paymentStatus: 'completed',
        paymentAmount: appliedCoupon ? discountedPrice : originalPrice,
        couponApplied: appliedCoupon ? 'LPUUPGRAD' : '',
        registrationDate: new Date().toISOString()
      };
      
      // Save to Firebase
      await addDoc(collection(db, 'registrations'), registrationData);
      
      // Store in localStorage for success page
      localStorage.setItem('registrationData', JSON.stringify(registrationData));
      
      return registrationData;
    } catch (error) {
      console.error('Error saving registration data:', error);
      throw error;
    }
  };

  // Process payment using Razorpay
  const processPayment = async () => {
    try {
      // Prepare payment data for Razorpay
      const paymentData: PaymentData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        amount: appliedCoupon ? discountedPrice : originalPrice,
        description: 'AI Workshop 2025 Registration'
      };
      
      // Initiate Razorpay payment
      await initiateRazorpayPayment(
        paymentData,
        async (response) => {
          try {
            // Save registration data with payment ID
            const registrationData = await saveRegistrationToFirebase(response.razorpay_payment_id);
            
            // Show success message
            toast({
              title: "Payment Successful!",
              description: "Your registration is confirmed.",
            });
            
            // Store additional payment details in localStorage
            const successData = JSON.parse(localStorage.getItem('registrationData') || '{}');
            localStorage.setItem('registrationData', JSON.stringify({
              ...successData,
              paymentId: response.razorpay_payment_id,
              transactionDate: new Date().toISOString()
            }));
            
            // Force a hard redirect to the success page
            // This is the most reliable way to ensure the redirect happens
            setTimeout(() => {
              // Save the current scroll position to prevent any scroll issues
              sessionStorage.setItem('scrollPosition', '0');
              // Use direct browser navigation for most reliable redirect
              window.location.replace('/success');
            }, 1000);
          } catch (error) {
            console.error('Error processing successful payment:', error);
            toast({
              title: "Registration Error",
              description: "Payment was successful, but there was an error saving your registration.",
              variant: "destructive"
            });
            setIsSubmitting(false);
          }
        },
        (error) => {
          // Payment failed
          console.error('Payment failed:', error);
          toast({
            title: "Payment Failed",
            description: "There was an error processing your payment. Please try again.",
            variant: "destructive"
          });
          setIsSubmitting(false);
        }
      );
    } catch (error) {
      console.error('Error initiating payment:', error);
      toast({
        title: "Error",
        description: "There was an error initiating the payment. Please try again.",
        variant: "destructive"
      });
      setIsSubmitting(false);
    }
  };

  const handlePayment = async () => {
    // Validate form
    if (!formData.name || !formData.email || !formData.phone || !formData.regNumber || !formData.idProof) {
      toast({
        title: "Missing Information",
        description: "Please fill all fields and upload ID proof",
        variant: "destructive"
      });
      return;
    }
    
    // Validate registration number (must be exactly 8 digits)
    if (formData.regNumber.length !== 8) {
      toast({
        title: "Invalid Registration Number",
        description: "Registration number must be exactly 8 digits",
        variant: "destructive"
      });
      return;
    }

    // Validate phone number format (10 digits)
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(formData.phone)) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid 10-digit phone number",
        variant: "destructive"
      });
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    // Process payment using Razorpay
    processPayment();
  };

  return (
    <section id="registration" className="min-h-screen py-20 bg-slate-900 relative overflow-hidden flex items-center justify-center">
      {/* Enhanced Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-slate-900 to-purple-900/20 opacity-80"></div>
      <div className="absolute inset-0 bg-[url('/lovable-uploads/grid.svg')] bg-center opacity-5"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(59,130,246,0.15),_transparent_70%)]">
        {/* Animated particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 4 + 2 + 'px',
              height: Math.random() * 4 + 2 + 'px',
              background: ['#3b82f6', '#8b5cf6', '#ec4899'][Math.floor(Math.random() * 3)],
              boxShadow: '0 0 10px currentColor',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0.2, 0.7, 0.2],
            }}
            transition={{
              duration: 4 + Math.random() * 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
      
      <div className="container mx-auto px-4 relative z-10 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4 relative z-10 drop-shadow-[0_2px_10px_rgba(59,130,246,0.5)] pb-2">
            Register Now
          </h2>
          <p className="text-gray-400 text-lg">Secure your spot for the AI Workshop</p>
        </motion.div>

        <div className="max-w-xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Card className="bg-gradient-to-br from-slate-900 to-slate-800 backdrop-blur-lg border border-blue-900/30 shadow-xl overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-blue-900/5 to-purple-900/10 opacity-30"></div>
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(59,130,246,0.1),_transparent_70%)] pointer-events-none"></div>
              
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
                    className="bg-slate-800/50 border-blue-900/30 text-white placeholder-gray-400 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 z-10 relative"
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
                    className="bg-slate-800/50 border-blue-900/30 text-white placeholder-gray-400 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 z-10 relative"
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
                    placeholder="Enter your 10-digit mobile number"
                    className="bg-slate-800/50 border-blue-900/30 text-white placeholder-gray-400 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 z-10 relative"
                    required
                  />
                </div>

                {/* Registration Number Field */}
                <div className="space-y-2">
                  <Label htmlFor="regNumber" className="text-white flex items-center gap-2">
                    <Hash className="w-4 h-4" />
                    Registration Number *
                  </Label>
                  <Input
                    id="regNumber"
                    name="regNumber"
                    type="text"
                    value={formData.regNumber}
                    onChange={handleInputChange}
                    placeholder="Enter your 8-digit registration number"
                    className="bg-slate-800/50 border-blue-900/30 text-white placeholder-gray-400 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 z-10 relative"
                    required
                    maxLength={8}
                  />
                  <p className="text-xs text-gray-500">Enter your 8-digit college/university registration number</p>
                </div>

                {/* ID Proof Upload */}
                <div className="space-y-2">
                  <Label htmlFor="idProof" className="text-white flex items-center gap-2">
                    <Upload className="w-4 h-4" />
                    ID Proof Upload *
                  </Label>
                  <div className="relative">
                    <Input
                      id="idProof"
                      name="idProof"
                      type="file"
                      onChange={handleFileChange}
                      className="hidden"
                      accept=".pdf,.jpg,.jpeg,.png"
                      required
                    />
                    <div 
                      onClick={() => document.getElementById('idProof')?.click()}
                      className="bg-slate-800/50 border border-blue-900/30 text-white p-3 rounded-md cursor-pointer flex items-center justify-between relative z-10"
                    >
                      <span className="text-gray-400">
                        {formData.idProof ? formData.idProof.name : 'Choose File'}
                      </span>
                      <Upload className="w-4 h-4 text-blue-400" />
                    </div>
                  </div>
                  <p className="text-xs text-gray-500">Upload Aadhar Card, College ID, or any Govt. ID (PDF, JPG formats)</p>
                </div>

                {/* Coupon Code */}
                <div className="space-y-2">
                  <Label htmlFor="couponCode" className="text-white flex items-center gap-2">
                    <Tag className="w-4 h-4" />
                    Coupon Code (Optional)
                  </Label>
                  <div className="relative">
                    <Input
                      id="couponCode"
                      name="couponCode"
                      type="text"
                      value={formData.couponCode}
                      onChange={handleInputChange}
                      placeholder="Enter coupon code if you have one"
                      className={`bg-slate-800/50 text-white placeholder-gray-400 focus:ring-1 z-10 relative pr-${appliedCoupon ? '12' : '4'} transition-all duration-300 ${couponValid ? 'border-green-500 focus:border-green-500 focus:ring-green-500' : 'border-blue-900/30 focus:border-blue-400 focus:ring-blue-400'}`}
                      disabled={appliedCoupon}
                      autoComplete="off"
                    />
                    {appliedCoupon && (
                      <button 
                        onClick={(e) => {
                          e.preventDefault();
                          // Ensure the coupon is properly removed
                          setAppliedCoupon(false);
                          setCouponValid(false);
                          setCouponError('');
                          setFormData(prev => ({
                            ...prev,
                            couponCode: ''
                          }));
                          // Show confirmation toast
                          toast({
                            title: "Coupon Removed",
                            description: "Coupon has been removed from your registration.",
                          });
                        }} 
                        className="absolute right-0 top-0 bottom-0 border-l border-red-500 text-red-500 hover:bg-red-500 hover:text-white px-3 rounded-r-md flex items-center justify-center transition-colors duration-300 active:bg-red-700 active:scale-95"
                        type="button"
                        aria-label="Remove coupon"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  {couponError && <p className="text-red-500 text-sm">{couponError}</p>}
                  {appliedCoupon && (
                    <p className="text-green-500 text-sm flex items-center gap-1 font-medium">
                      <Check className="w-4 h-4" /> Coupon applied successfully! You saved ₹500.
                    </p>
                  )}
                </div>

                {/* Registration Fee Info */}
                <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 p-4 rounded-lg border border-blue-900/30 relative z-10">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-white font-semibold">Registration Fee</h3>
                      <p className="text-gray-300 text-sm">Includes all workshop materials, meals, and certificates</p>
                    </div>
                    <div className="text-right">
                      {appliedCoupon ? (
                        <div>
                          <div className="flex items-center gap-2 justify-end">
                            <span className="text-xl text-gray-400 line-through">₹{originalPrice}</span>
                            <span className="text-3xl font-bold text-white">₹{discountedPrice}</span>
                          </div>
                          <p className="text-green-400 text-sm">You saved ₹500</p>
                        </div>
                      ) : (
                        <div>
                          <span className="text-3xl font-bold text-white">₹{originalPrice}</span>
                          <p className="text-gray-400 text-sm">All inclusive</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Payment Button */}
                <Button
                  onClick={handlePayment}
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 relative z-10"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <CreditCard className="w-5 h-5" />
                      Pay ₹{appliedCoupon ? discountedPrice : originalPrice} & Register
                    </>
                  )}
                </Button>

                <div className="space-y-2">
                  <p className="text-sm text-gray-400 text-center">
                    Secure payment powered by Razorpay. Your data is protected.
                  </p>
                  <p className="text-xs text-gray-500 text-center">
                    Try coupon code "LPUUPGRAD" for a special discount!
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default RegistrationForm;
