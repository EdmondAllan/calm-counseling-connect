// API configuration for different environments

// Determine if we're in development or production
const isDevelopment = import.meta.env.DEV;

// Base URL for API calls
export const API_BASE_URL = isDevelopment 
  ? 'http://localhost:4000/api' // Development - local API server
  : '/api'; // Production - Vercel serverless functions

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