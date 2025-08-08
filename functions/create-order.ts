import type { VercelRequest, VercelResponse } from '@vercel/node';
const Razorpay = require('razorpay');

export const config = {
  runtime: 'nodejs18.x'
};
// Debug env variables
console.log('Environment check:', {
  hasKeyId: !!process.env.RAZORPAY_KEY_ID,
  hasKeySecret: !!process.env.RAZORPAY_KEY_SECRET,
  keyIdLength: process.env.RAZORPAY_KEY_ID?.length || 0,
  nodeEnv: process.env.NODE_ENV,
  vercelEnv: process.env.VERCEL_ENV
});

let razorpay: any;

function getRazorpayInstance() {
  if (razorpay) return razorpay;

  if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
    throw new Error('Razorpay environment variables are not configured');
  }

  razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
  return razorpay;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Origin, Authorization');
  res.setHeader('Access-Control-Max-Age', '86400');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({
      error: 'Method not allowed',
      message: `Expected POST but received ${req.method}`,
      allowedMethods: ['POST']
    });
  }

  const contentType = req.headers['content-type'];
  if (!contentType || !contentType.includes('application/json')) {
    return res.status(415).json({
      error: 'Unsupported Media Type',
      message: 'Content-Type must be application/json',
      receivedContentType: contentType || 'none'
    });
  }

  try {
    const { amount, currency, receipt, bookingData } = req.body;
    if (!amount || !currency || !receipt) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: amount, currency, receipt'
      });
    }

    const amountInPaise = Math.round(parseFloat(amount) * 100);
    const rp = getRazorpayInstance();

    const order = await rp.orders.create({
      amount: amountInPaise,
      currency,
      receipt,
      notes: { bookingData: JSON.stringify(bookingData) },
    });

    res.status(200).json({ success: true, order });
  } catch (error: any) {
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
