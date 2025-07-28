import type { VercelRequest, VercelResponse } from '@vercel/node';
const Razorpay = require('razorpay');

// Initialize Razorpay with environment variables
if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
  throw new Error('Razorpay environment variables are not configured');
}

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Origin');

  // Handle OPTIONS request for CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
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