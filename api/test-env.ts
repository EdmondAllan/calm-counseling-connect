import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Origin, Authorization');
  res.setHeader('Access-Control-Max-Age', '86400');

  // Handle OPTIONS request for CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Test environment variables
  const envTest = {
    method: req.method,
    url: req.url,
    hasRazorpayKeyId: !!process.env.RAZORPAY_KEY_ID,
    hasRazorpayKeySecret: !!process.env.RAZORPAY_KEY_SECRET,
    razorpayKeyIdLength: process.env.RAZORPAY_KEY_ID ? process.env.RAZORPAY_KEY_ID.length : 0,
    nodeEnv: process.env.NODE_ENV,
    vercelEnv: process.env.VERCEL_ENV,
    allEnvKeys: Object.keys(process.env).filter(key => key.includes('RAZORPAY')),
    timestamp: new Date().toISOString()
  };

  res.status(200).json({
    success: true,
    message: 'API route is working',
    environment: envTest
  });
}
