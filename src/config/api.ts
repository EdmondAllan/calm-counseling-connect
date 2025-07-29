// API configuration for different environments

// Determine if we're in development or production with proper fallbacks
const isDevelopment = typeof import.meta !== 'undefined' && 
                     import.meta.env && 
                     import.meta.env.MODE === 'development';

// Base URL for API calls
// In production we may host frontend and serverless API on different domains.
// Allow overriding via VITE_API_BASE_URL; fall back to relative '/api' for local dev.
export const API_BASE_URL =
  typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_BASE_URL
    ? import.meta.env.VITE_API_BASE_URL.replace(/\/$/, '') // strip trailing slash
    : '/api';

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