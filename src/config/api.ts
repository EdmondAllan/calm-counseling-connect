// API configuration for different environments

// Determine if we're in development or production with proper fallbacks
const isDevelopment = typeof import.meta !== 'undefined' && 
                     import.meta.env && 
                     import.meta.env.MODE === 'development';

// Base URL for API calls
// In production we may host frontend and serverless API on different domains.
// Allow overriding via VITE_API_BASE_URL; fall back to relative '/api' for local dev.
// Helper to detect runtime environment and decide the correct base URL
function getApiBaseUrl(): string {
  // 1. Explicit override via env
  if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_BASE_URL) {
    return (import.meta.env.VITE_API_BASE_URL as string).replace(/\/$/, '');
  }

  // 2. Auto-detect custom production domains that are NOT backed by Vercel functions
  if (typeof window !== 'undefined') {
    const { hostname } = window.location;

    // If we are on the intellcounseling.in domain, the static pages are served via cPanel
    // while the API is hosted separately on Vercel. Point to the Vercel deployment
    // (make sure you have added the correct custom domain for the API project if you change this).
    if (hostname.includes('intellcounseling')) {
      return 'https://calm-counseling-connect.vercel.app/api';
    }
  }

  // 3. Default – assume same-origin (works for localhost & Vercel previews)
  return '/api';
}

export const API_BASE_URL = getApiBaseUrl();

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