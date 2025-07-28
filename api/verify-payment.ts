import type { VercelRequest, VercelResponse } from '@vercel/node';
import crypto from 'crypto';

// Razorpay secret key for signature verification from environment variables
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET;

if (!RAZORPAY_KEY_SECRET) {
  throw new Error('Razorpay secret key is not configured');
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  // Handle OPTIONS request for CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature, bookingData } = req.body;

    console.log('Verifying payment with:', {
      payment_id: razorpay_payment_id,
      order_id: razorpay_order_id,
      signature: razorpay_signature ? 'present' : 'missing'
    });

    // Validate required fields
    if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
      return res.status(400).json({
        success: false,
        error: 'Missing required payment verification fields'
      });
    }

    // Verify signature
    const text = `${razorpay_order_id}|${razorpay_payment_id}`;
    const signature = crypto
      .createHmac('sha256', RAZORPAY_KEY_SECRET!)
      .update(text)
      .digest('hex');

    console.log('Signature verification:', {
      expected: signature,
      received: razorpay_signature,
      match: signature === razorpay_signature
    });

    if (signature === razorpay_signature) {
      // Payment is verified
      console.log('Payment verified successfully');
      res.status(200).json({
        success: true,
        message: 'Payment verified successfully',
        bookingData: bookingData,
      });
    } else {
      console.error('Invalid signature');
      res.status(400).json({
        success: false,
        error: 'Invalid signature',
        details: {
          expected: signature,
          received: razorpay_signature
        }
      });
    }
  } catch (error: any) {
    console.error('Error verifying payment:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to verify payment',
      details: error.message
    });
  }
}