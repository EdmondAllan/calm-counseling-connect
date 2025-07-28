import crypto from 'crypto';

// Razorpay secret key for signature verification from environment variables
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET;

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Origin, Authorization');
  res.setHeader('Access-Control-Max-Age', '86400');

  // Handle OPTIONS request for CORS preflight
  if (req.method === 'OPTIONS') {
    console.log('Handling OPTIONS request for verify-payment');
    return res.status(200).end();
  }

  // Log the request method and headers for debugging
  console.log('Request method in verify-payment:', req.method);
  console.log('Request body in verify-payment:', JSON.stringify(req.body, null, 2));

  // Check if the request method is POST
  if (req.method !== 'POST') {
    console.log('Method not allowed in verify-payment:', req.method);
    return res.status(405).json({ 
      error: 'Method not allowed', 
      message: `Expected POST but received ${req.method}`,
      allowedMethods: ['POST']
    });
  }

  if (!RAZORPAY_KEY_SECRET) {
    console.error('Razorpay secret key is not configured');
    return res.status(500).json({
      success: false,
      error: 'Payment verification service not configured'
    });
  }

  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;

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
      .createHmac('sha256', RAZORPAY_KEY_SECRET)
      .update(text)
      .digest('hex');

    console.log('Signature verification:', {
      expected: signature,
      received: razorpay_signature,
      match: signature === razorpay_signature
    });

    if (signature === razorpay_signature) {
      // Payment is verified
      console.log('Payment verification successful');
      
      res.status(200).json({
        success: true,
        message: 'Payment verified successfully',
        payment_id: razorpay_payment_id,
        order_id: razorpay_order_id
      });
    } else {
      // Payment verification failed
      console.log('Payment verification failed - signature mismatch');
      
      res.status(400).json({
        success: false,
        error: 'Payment verification failed',
        message: 'Invalid signature'
      });
    }
  } catch (error) {
    console.error('Error verifying payment:', error);
    
    res.status(500).json({
      success: false,
      error: 'Failed to verify payment',
      details: error.message
    });
  }
}
