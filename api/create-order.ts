import type { VercelRequest, VercelResponse } from '@vercel/node';
import Razorpay from 'razorpay';

// Initialize Razorpay with the provided keys
const razorpay = new Razorpay({
  key_id: 'rzp_test_GdNMxJUMabbgM9',
  key_secret: '3OcDxO5NFLXZxdhamNufc6pj',
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
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