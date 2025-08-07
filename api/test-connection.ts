import type { VercelRequest, VercelResponse } from '@vercel/node';

export const config = {
  runtime: 'nodejs20.x',
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Origin, Authorization');

  // Handle OPTIONS request for CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  console.log('Test connection API called:', {
    method: req.method,
    url: req.url,
    timestamp: new Date().toISOString()
  });

  return res.status(200).json({
    success: true,
    message: 'API connection successful',
    timestamp: new Date().toISOString(),
    method: req.method,
    url: req.url,
    environment: {
      nodeVersion: process.version,
      platform: process.platform,
      hasRazorpayKeys: !!(process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET)
    }
  });
}
