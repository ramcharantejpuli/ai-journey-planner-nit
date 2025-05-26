// Razorpay integration utility
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from './firebase';

// Razorpay credentials
export const RAZORPAY_KEY_ID = 'rzp_test_LFkSBkHsru5YFX';

// Function to load Razorpay script
export const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    // Check if script already exists
    if (document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]')) {
      resolve(true);
      return;
    }
    
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

// Interface for payment data
export interface PaymentData {
  name: string;
  email: string;
  phone: string;
  amount: number;
  currency?: string;
  description?: string;
}

// Function to initiate Razorpay payment
export const initiateRazorpayPayment = async (
  paymentData: PaymentData,
  onSuccess: (payment: any) => void,
  onError: (error: any) => void
): Promise<void> => {
  try {
    // Load Razorpay script
    const isLoaded = await loadRazorpayScript();
    if (!isLoaded) {
      throw new Error('Razorpay SDK failed to load');
    }

    // Razorpay options
    const options = {
      key: RAZORPAY_KEY_ID,
      amount: paymentData.amount * 100, // Razorpay expects amount in paise
      currency: paymentData.currency || 'INR',
      name: 'AI Workshop 2025',
      description: paymentData.description || 'Workshop Registration',
      prefill: {
        name: paymentData.name,
        email: paymentData.email,
        contact: paymentData.phone,
      },
      theme: {
        color: '#3B82F6',
      },
      handler: function(response: any) {
        // Create a payment response with the Razorpay payment ID
        const paymentResponse = {
          razorpay_payment_id: response.razorpay_payment_id || `pay_${Date.now()}`,
        };
        
        // Save payment ID to localStorage for the success page
        try {
          const existingData = localStorage.getItem('registrationData');
          if (existingData) {
            const parsedData = JSON.parse(existingData);
            localStorage.setItem('registrationData', JSON.stringify({
              ...parsedData,
              paymentId: response.razorpay_payment_id,
              paymentStatus: 'completed',
              transactionDate: new Date().toISOString()
            }));
          }
        } catch (err) {
          console.error('Error saving payment data to localStorage:', err);
        }
        
        // Call the success callback
        onSuccess(paymentResponse);
      },
    };

    // Create and open Razorpay checkout
    const razorpay = new (window as any).Razorpay(options);
    razorpay.open();
  } catch (error) {
    console.error('Error initiating Razorpay payment:', error);
    onError(error);
  }
};

// Function to save payment details to Firestore
export const savePaymentToFirestore = async (paymentDetails: any): Promise<void> => {
  try {
    await addDoc(collection(db, 'payments'), {
      ...paymentDetails,
      timestamp: Timestamp.now(),
    });
  } catch (error) {
    console.error('Error saving payment to Firestore:', error);
    throw error;
  }
};
