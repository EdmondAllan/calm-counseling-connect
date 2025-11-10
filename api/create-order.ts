import type { VercelRequest, VercelResponse } from '@vercel/node';

// Initialize Razorpay
const Razorpay = require('razorpay');

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Origin, Authorization');
  res.setHeader('Access-Control-Max-Age', '86400');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      error: 'Method not allowed', 
      message: `Expected POST but received ${req.method}`,
      allowedMethods: ['POST'] 
    });
  }

  try {
    // Debug: Log environment variables (remove in production)
    console.log('Environment check:', {
      hasKeyId: !!process.env.RAZORPAY_KEY_ID,
      hasKeySecret: !!process.env.RAZORPAY_KEY_SECRET,
      keyIdLength: process.env.RAZORPAY_KEY_ID?.length || 0,
      nodeEnv: process.env.NODE_ENV,
      vercelEnv: process.env.VERCEL_ENV
    });

    // Check if Razorpay credentials are available
    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      console.error('Missing Razorpay credentials');
      return res.status(500).json({
        success: false,
        error: 'Server configuration error',
        message: 'Payment service not properly configured'
      });
    }

    // Initialize Razorpay instance
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    // Extract and validate request data
    const { amount, currency = 'INR', receipt, bookingData } = req.body;

    if (!amount || !receipt) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields',
        message: 'amount and receipt are required',
        received: { amount: !!amount, receipt: !!receipt, currency }
      });
    }

    // Convert amount to paise (smallest currency unit)
    const amountInPaise = Math.round(parseFloat(amount) * 100);

    // Validate amount
    if (amountInPaise < 100) { // Minimum 1 INR
      return res.status(400).json({
        success: false,
        error: 'Invalid amount',
        message: 'Amount must be at least 1 INR'
      });
    }

    // Create Razorpay order
    const orderOptions = {
      amount: amountInPaise,
      currency: currency,
      receipt: receipt,
      ...(bookingData && {
        notes: {
          bookingData: typeof bookingData === 'string' 
            ? bookingData 
            : JSON.stringify(bookingData)
        }
      })
    };

    console.log('Creating order with options:', {
      ...orderOptions,
      notes: orderOptions.notes ? 'present' : 'none'
    });

    const order = await razorpay.orders.create(orderOptions);

    console.log('Order created successfully:', order.id);

    // Return successful response
    return res.status(200).json({
      success: true,
      order: {
        id: order.id,
        amount: order.amount,
        currency: order.currency,
        receipt: order.receipt,
        status: order.status,
        created_at: order.created_at
      }
    });

  } catch (error: any) {
    console.error('Error creating order:', error);

    // Handle Razorpay specific errors
    if (error.statusCode) {
      return res.status(error.statusCode).json({
        success: false,
        error: 'Razorpay API error',
        message: error.error?.description || error.message || 'Payment service error',
        code: error.error?.code || 'UNKNOWN_ERROR'
      });
    }

    // Handle general errors
    return res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: 'Failed to create payment order',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}