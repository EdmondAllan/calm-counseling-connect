// API configuration for different environments

// Determine if we're in development or production with proper fallbacks
const isDevelopment = typeof import.meta !== 'undefined' && 
                     import.meta.env && 
                     import.meta.env.MODE === 'development';

// Base URL for API calls
// Use relative URLs to avoid CORS and ad-blocker issues
export const API_BASE_URL = '/api';

// Razorpay API endpoints
export const RAZORPAY_ENDPOINTS = {
  createOrder: `${API_BASE_URL}/create-order`,
  verifyPayment: `${API_BASE_URL}/verify-payment`,
  sendWhatsapp: `${API_BASE_URL}/send-whatsapp`
};

export default {
  API_BASE_URL,
  RAZORPAY_ENDPOINTS
};