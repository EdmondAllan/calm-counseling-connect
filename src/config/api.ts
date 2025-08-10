// config/api.ts
export const RAZORPAY_ENDPOINTS = {
  createOrder: '/api/create-order',
  verifyPayment: '/api/verify-payment', 
  sendWhatsapp: '/api/send-whatsapp'
};

// Alternative configuration if you need environment-specific URLs
export const getApiEndpoint = (endpoint: string): string => {
  const baseUrl = import.meta.env?.VITE_API_BASE_URL || '';
  return `${baseUrl}${endpoint}`;
};

// Environment configuration
export const config = {
  razorpay: {
    keyId: import.meta.env?.VITE_RAZORPAY_KEY_ID,
  },
  api: {
    baseUrl: import.meta.env?.VITE_API_BASE_URL || '',
  }
};

// Validation function
export const validateConfig = (): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!config.razorpay.keyId) {
    errors.push('VITE_RAZORPAY_KEY_ID is not configured');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};