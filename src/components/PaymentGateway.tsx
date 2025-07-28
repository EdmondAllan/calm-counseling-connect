import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { RAZORPAY_ENDPOINTS } from '../config/api';

// Configure axios
// Don't set a global baseURL as it might affect other requests
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.withCredentials = false; // Set to true if using cookies

// Define Razorpay API endpoint
const RAZORPAY_API_URL = 'https://api.razorpay.com/v1/orders';

// Extend Window interface to include Razorpay
declare global {
  interface Window {
    Razorpay: any;
  }
}

interface PaymentGatewayProps {
  bookingData: {
    clientName: string;
    phoneNumber: string;
    serviceName: string;
    serviceType: string;
    date: string;
    time: string;
    mode: string;
    duration: string;
    fee: number;
  };
}

const PaymentGateway: React.FC<PaymentGatewayProps> = ({ bookingData }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Load Razorpay script
    const loadRazorpayScript = () => {
      return new Promise((resolve) => {
        // Check if script already exists to prevent duplicates
        const existingScript = document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]');
        if (existingScript) {
          console.log('Razorpay script already exists');
          resolve(true);
          return;
        }
        
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        script.onload = () => {
          console.log('Razorpay script loaded successfully');
          resolve(true);
        };
        script.onerror = () => {
          console.error('Failed to load Razorpay script');
          setError('Failed to load payment gateway');
          resolve(false);
        };
        document.body.appendChild(script);
      });
    };

    // Check if Razorpay script is already loaded
    if (!window.Razorpay) {
      loadRazorpayScript();
    }

    return () => {
      // Safe cleanup - only remove if it exists and is a child of document.body
      const existingScript = document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]');
      if (existingScript && document.body.contains(existingScript)) {
        document.body.removeChild(existingScript);
      }
    };
  }, []);

  const handlePayment = async () => {
    if (isLoading) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      console.log('Initiating payment for booking:', bookingData);

      // Validate booking data
      if (!bookingData.clientName || !bookingData.phoneNumber || !bookingData.fee) {
        throw new Error('Invalid booking data');
      }

      // Create a receipt ID
      const receiptId = `receipt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const amount = bookingData.fee; // Amount in INR
      const amountInPaise = Math.round(amount * 100); // Convert to paise for Razorpay

      console.log('Creating order with amount:', amountInPaise);

      // Create order using backend API with environment-aware configuration
      const apiUrl = RAZORPAY_ENDPOINTS.createOrder;
      console.log('Sending request to:', apiUrl);
      let orderResponse;
      try {
        orderResponse = await axios.post(apiUrl, {
          amount: amount,
          currency: 'INR',
          receipt: receiptId,
          bookingData: {
            clientName: bookingData.clientName,
            phoneNumber: bookingData.phoneNumber,
            serviceName: bookingData.serviceName,
            serviceType: bookingData.serviceType,
            date: bookingData.date,
            time: bookingData.time,
            mode: bookingData.mode,
            duration: bookingData.duration,
            fee: bookingData.fee
          }
        });
        console.log('API response received:', orderResponse);
      } catch (apiError: any) {
        console.error('API request failed:', apiError);
        console.error('Error details:', apiError.response ? apiError.response.data : 'No response data');
        console.error('Error status:', apiError.response ? apiError.response.status : 'No status');
        throw new Error(`API request failed: ${apiError.message}`);
      }

      if (!orderResponse || !orderResponse.data.success || !orderResponse.data.order) {
        throw new Error('Failed to create order. Please try again.');
      }

      const { order } = orderResponse.data;
      console.log('Order created successfully:', order);

      // Check if Razorpay is loaded
      if (typeof (window as any).Razorpay === 'undefined') {
        throw new Error('Razorpay not loaded. Please refresh the page and try again.');
      }

      // Check if Razorpay key is configured
      const razorpayKey = typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_RAZORPAY_KEY_ID;
      if (!razorpayKey) {
        throw new Error('Razorpay key is not configured');
      }

      // Initialize Razorpay with proper order ID from backend
      const options = {
        key: razorpayKey,
        amount: order.amount, // Amount from the order
        currency: order.currency,
        name: 'Intell Counseling Services',
        description: `${bookingData.serviceName} - ${bookingData.serviceType}`,
        order_id: order.id, // Order ID from Razorpay
        handler: async function (response: any) {
          console.log('Payment successful:', response);
          try {
            // Verify payment with backend using environment-aware configuration
            const verifyUrl = RAZORPAY_ENDPOINTS.verifyPayment;
            console.log('Sending verification request to:', verifyUrl);
            const verificationResponse = await axios.post(verifyUrl, {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              bookingData: bookingData
            });

            if (verificationResponse.data.success) {
              // Payment verified successfully
              console.log('Payment verified successfully');
              
              // Send WhatsApp notifications
              await sendWhatsAppNotifications(bookingData);
              
              alert('Payment successful! Booking confirmed. Check your WhatsApp for details.');
              navigate('/booking-success');
            } else {
              throw new Error('Payment verification failed');
            }
          } catch (error) {
            console.error('Payment verification error:', error);
            alert('Payment verification failed. Please contact support.');
            setIsLoading(false);
          }
        },
        prefill: {
          name: bookingData.clientName,
          contact: bookingData.phoneNumber,
        },
        theme: {
          color: '#2C67B2',
        },
        modal: {
          ondismiss: function() {
            console.log('Payment modal dismissed');
            setIsLoading(false);
          }
        }
      };

      console.log('Opening Razorpay with options:', options);
      const rzp = new (window as any).Razorpay(options);
      rzp.open();
      
    } catch (error: any) {
      console.error('Payment error:', error);
      setError(error.message || 'Payment failed');
      setIsLoading(false);
    }
  };

  const sendWhatsAppNotifications = async (bookingData: any) => {
    try {
      console.log('Sending WhatsApp notifications for booking:', bookingData);
      
      // Send notification to client using environment-aware configuration
      const whatsappUrl = RAZORPAY_ENDPOINTS.sendWhatsapp;
      console.log('Sending WhatsApp notification request to:', whatsappUrl);
      const clientResponse = await axios.post(whatsappUrl, {
        bookingData: bookingData,
        type: 'client'
      });
      
      if (clientResponse.data.success) {
        console.log('Client WhatsApp notification sent successfully');
        // Open WhatsApp for client if user allows popups
        if (clientResponse.data.whatsappUrl) {
          window.open(clientResponse.data.whatsappUrl, '_blank');
        }
      }
      
      // Send notification to counselor using environment-aware configuration
      const counselorResponse = await axios.post(RAZORPAY_ENDPOINTS.sendWhatsapp, {
        bookingData: bookingData,
        type: 'counselor'
      });
      
      if (counselorResponse.data.success) {
        console.log('Counselor WhatsApp notification sent successfully');
        // Open WhatsApp for counselor if user allows popups
        if (counselorResponse.data.whatsappUrl) {
          setTimeout(() => {
            window.open(counselorResponse.data.whatsappUrl, '_blank');
          }, 1000);
        }
      }
      
    } catch (error) {
      console.error('WhatsApp notification error:', error);
      // Continue with the flow even if WhatsApp notification fails
    }
  };

  if (error) {
    return (
      <div className="payment-gateway">
        <div className="text-red-600 mb-4 p-3 bg-red-50 rounded-lg">
          Error: {error}
        </div>
        <button
          onClick={handlePayment}
          className="confirm-pay-btn"
          style={{
            background: 'linear-gradient(135deg, #2C67B2, #7B42F4)',
            color: 'white',
            border: 'none',
            padding: '15px 30px',
            borderRadius: '10px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
          }}
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="payment-gateway">
      <button
        onClick={handlePayment}
        disabled={isLoading}
        className="confirm-pay-btn"
        style={{
          background: 'linear-gradient(135deg, #2C67B2, #7B42F4)',
          color: 'white',
          border: 'none',
          padding: '15px 30px',
          borderRadius: '10px',
          fontSize: '16px',
          fontWeight: 'bold',
          cursor: isLoading ? 'not-allowed' : 'pointer',
          transition: 'all 0.3s ease',
          opacity: isLoading ? 0.7 : 1,
        }}
      >
        {isLoading ? 'Processing...' : 'Confirm & Pay'}
      </button>
    </div>
  );
};

export default PaymentGateway;