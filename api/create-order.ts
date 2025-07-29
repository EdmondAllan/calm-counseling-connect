import type { VercelRequest, VercelResponse } from '@vercel/node';
const Razorpay = require('razorpay');

// Debug environment variables
console.log('Environment check:', {
  hasKeyId: !!process.env.RAZORPAY_KEY_ID,
  hasKeySecret: !!process.env.RAZORPAY_KEY_SECRET,
  keyIdLength: process.env.RAZORPAY_KEY_ID?.length || 0,
  nodeEnv: process.env.NODE_ENV,
  vercelEnv: process.env.VERCEL_ENV
});

// Initialize Razorpay with environment variables
if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
  console.error('Razorpay environment variables are missing:', {
    RAZORPAY_KEY_ID: !!process.env.RAZORPAY_KEY_ID,
    RAZORPAY_KEY_SECRET: !!process.env.RAZORPAY_KEY_SECRET
  });
  throw new Error('Razorpay environment variables are not configured');
}

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  console.log('=== CREATE ORDER API CALLED ===');
  console.log('Full request details:', {
    method: req.method,
    url: req.url,
    headers: req.headers,
    body: req.body,
    query: req.query
  });
  // Set CORS headers first
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Origin, Authorization');
  res.setHeader('Access-Control-Max-Age', '86400');

  // Handle OPTIONS request for CORS preflight
  if (req.method === 'OPTIONS') {
    console.log('Handling OPTIONS request');
    return res.status(200).end();
  }
  
  // Log the request method and headers for debugging
  console.log('Request method in create-order:', req.method);
  console.log('Request headers in create-order:', JSON.stringify(req.headers, null, 2));
  console.log('Request body in create-order:', JSON.stringify(req.body, null, 2));
  console.log('Request URL in create-order:', req.url);
  console.log('Request path in create-order:', req.url ? req.url.split('?')[0] : 'unknown');
  
  // Check if the request method is POST
  if (req.method !== 'POST') {
    console.log('Method not allowed in create-order:', req.method);
    // Return a more detailed error response
    return res.status(405).json({ 
      error: 'Method not allowed', 
      message: `Expected POST but received ${req.method}`,
      allowedMethods: ['POST']
    });
  }
  
  // Check if Content-Type is application/json
  const contentType = req.headers['content-type'];
  if (!contentType || !contentType.includes('application/json')) {
    console.log('Invalid Content-Type in create-order:', contentType);
    return res.status(415).json({ 
      error: 'Unsupported Media Type', 
      message: 'Content-Type must be application/json',
      receivedContentType: contentType || 'none'
    });
  }

  try {
    const { amount, currency, receipt, bookingData } = req.body;

    // Validate required fields
    if (!amount || !currency || !receipt) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: amount, currency, receipt'
      });
    }

    // Ensure amount is a number and convert to paise
    const amountInPaise = Math.round(parseFloat(amount) * 100);

    console.log('Creating Razorpay order with:', {
      amount: amountInPaise,
      currency,
      receipt,
      bookingData
    });

    const order = await razorpay.orders.create({
      amount: amountInPaise,
      currency: currency,
      receipt: receipt,
      notes: {
        bookingData: JSON.stringify(bookingData),
      },
    });

    console.log('Razorpay order created successfully:', order);

    res.status(200).json({
      success: true,
      order: order,
    });
  } catch (error: any) {
    console.error('Error creating Razorpay order:', error);
    
    // Handle specific Razorpay errors
    if (error.error) {
      return res.status(400).json({
        success: false,
        error: error.error.description || 'Razorpay API error',
        details: error.error
      });
    }

    res.status(500).json({
      success: false,
      error: 'Failed to create payment order',
      details: error.message
    });
  }
}