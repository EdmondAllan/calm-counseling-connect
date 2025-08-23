import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RAZORPAY_ENDPOINTS, config, validateConfig } from '../config/api';

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

  // Validate configuration on component mount
  useEffect(() => {
    const configValidation = validateConfig();
    if (!configValidation.isValid) {
      console.error('Configuration errors:', configValidation.errors);
      setError(`Configuration error: ${configValidation.errors.join(', ')}`);
    }
  }, []);

  useEffect(() => {
    // Load Razorpay script
    const loadRazorpayScript = () => {
      return new Promise((resolve) => {
        // Check if script already exists
        const existingScript = document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]');
        if (existingScript) {
          resolve(true);
          return;
        }
        
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        script.onload = () => resolve(true);
        script.onerror = () => {
          setError('Failed to load payment gateway');
          resolve(false);
        };
        document.body.appendChild(script);
      });
    };

    if (!window.Razorpay) {
      loadRazorpayScript();
    }
  }, []);

  const makeApiRequest = async (url: string, data: any): Promise<any> => {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorText = await response.text().catch(() => '');
        throw new Error(`API Error ${response.status}: ${response.statusText} ${errorText}`.trim());
      }

      const result = await response.json();
      return result;
    } catch (error: any) {
      console.error('API Request failed:', error);
      throw error;
    }
  };

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

      // Create order data
      const orderData = {
        amount: bookingData.fee, // Amount in INR
        currency: 'INR',
        receipt: `receipt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        bookingData: bookingData
      };

      console.log('Creating order with data:', orderData);

      // Create order - Use the correct API endpoint
      const orderResponse = await makeApiRequest(RAZORPAY_ENDPOINTS.createOrder, orderData);

      if (!orderResponse.success || !orderResponse.order) {
        throw new Error(orderResponse.error || 'Failed to create order');
      }

      const { order } = orderResponse;
      console.log('Order created successfully:', order);

      // Check if Razorpay is loaded
      if (!window.Razorpay) {
        throw new Error('Razorpay not loaded. Please refresh the page and try again.');
      }

      // Get Razorpay key from environment variables
      const razorpayKey = config.razorpay.keyId;
      if (!razorpayKey) {
        throw new Error('Razorpay key is not configured');
      }

      // Razorpay options
      const options = {
        key: razorpayKey,
        amount: order.amount,
        currency: order.currency,
        name: 'Intell Counseling Services',
        description: `${bookingData.serviceName} - ${bookingData.serviceType}`,
        order_id: order.id,
        handler: async function (response: any) {
          console.log('Payment successful:', response);
          await handlePaymentSuccess(response);
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
      const rzp = new window.Razorpay(options);
      rzp.open();
      
    } catch (error: any) {
      console.error('Payment error:', error);
      setError(error?.message || 'Payment failed. Please try again.');
      setIsLoading(false);
    }
  };

  const handlePaymentSuccess = async (response: any) => {
    try {
      // Verify payment with backend
      const verifyData = {
        razorpay_payment_id: response.razorpay_payment_id,
        razorpay_order_id: response.razorpay_order_id,
        razorpay_signature: response.razorpay_signature,
        bookingData: bookingData
      };

      const verificationResponse = await makeApiRequest(RAZORPAY_ENDPOINTS.verifyPayment, verifyData);

      if (verificationResponse.success) {
        console.log('Payment verified successfully');
        
        // Send WhatsApp notifications
        await sendWhatsAppNotifications();
        
        alert('Payment successful! Booking confirmed. Check your WhatsApp for details.');
        navigate('/booking-success');
      } else {
        throw new Error(verificationResponse.error || 'Payment verification failed');
      }
    } catch (error: any) {
      console.error('Payment verification error:', error);
      alert('Payment verification failed. Please contact support.');
      setIsLoading(false);
    }
  };

  const sendWhatsAppNotifications = async () => {
    try {
      console.log('Sending WhatsApp notifications');
      
      // Send client notification
      const clientResponse = await makeApiRequest(RAZORPAY_ENDPOINTS.sendWhatsapp, {
        bookingData: bookingData,
        type: 'client'
      });

      if (clientResponse.success && clientResponse.whatsappUrl) {
        window.open(clientResponse.whatsappUrl, '_blank');
      }

      // Send counselor notification
      const counselorResponse = await makeApiRequest(RAZORPAY_ENDPOINTS.sendWhatsapp, {
        bookingData: bookingData,
        type: 'counselor'
      });

      if (counselorResponse.success && counselorResponse.whatsappUrl) {
        setTimeout(() => {
          window.open(counselorResponse.whatsappUrl, '_blank');
        }, 1000);
      }
      
    } catch (error) {
      console.error('WhatsApp notification error:', error);
      // Continue with the flow even if WhatsApp notification fails
    }
  };

  const handleRetry = () => {
    setError(null);
    handlePayment();
  };

  if (error) {
    return (
      <div className="payment-gateway">
        <div className="text-red-600 mb-4 p-3 bg-red-50 rounded-lg">
          <strong>Error:</strong> {error}
        </div>
        <button
          onClick={handleRetry}
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
      {/* COMMENTED OUT: Original custom payment button implementation
      <button
        onClick={handlePayment}
        disabled={isLoading}
        className="confirm-pay-btn"
        style={{
          background: isLoading 
            ? 'linear-gradient(135deg, #9CA3AF, #6B7280)' 
            : 'linear-gradient(135deg, #2C67B2, #7B42F4)',
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
      */}
      
      {/* NEW: Razorpay Payment Button */}
      <form>
        <script 
          src="https://checkout.razorpay.com/v1/payment-button.js" 
          data-payment_button_id="pl_R8gQXksHlw6NEL" 
          async
        />
      </form>
    </div>
  );
};

export default PaymentGateway;