const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const Razorpay = require('razorpay');

const app = express();
const PORT = 4000;

// Razorpay test keys
const RAZORPAY_KEY_ID = 'rzp_test_GdNMxJUMabbgM9';
const RAZORPAY_KEY_SECRET = '3OcDxO5NFLXZxdhamNufc6pj';

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: RAZORPAY_KEY_ID,
  key_secret: RAZORPAY_KEY_SECRET,
});

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Add request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Home route
app.get('/', (req, res) => {
  res.send('Razorpay API Server is running');
});

// Create order endpoint
app.post('/api/create-order', async (req, res) => {
  try {
    const { amount, currency = 'INR', receipt, bookingData } = req.body;

    console.log('Creating order with:', { amount, currency, receipt });

    // Validate required fields
    if (!amount || !currency || !receipt) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields',
      });
    }

    // Convert amount to paise (Razorpay expects amount in smallest currency unit)
    const amountInPaise = Math.round(amount * 100);

    // Create order
    const options = {
      amount: amountInPaise,
      currency,
      receipt,
      notes: bookingData ? { bookingData: JSON.stringify(bookingData) } : {},
    };

    const order = await razorpay.orders.create(options);
    console.log('Order created:', order);

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create order',
      details: error.message,
    });
  }
});

// Verify payment endpoint
app.post('/api/verify-payment', (req, res) => {
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature, bookingData } = req.body;

    console.log('Verifying payment with:', {
      payment_id: razorpay_payment_id,
      order_id: razorpay_order_id,
      signature: razorpay_signature ? 'present' : 'missing',
    });

    // Validate required fields
    if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
      return res.status(400).json({
        success: false,
        error: 'Missing required payment verification fields',
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
      match: signature === razorpay_signature,
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
          received: razorpay_signature,
        },
      });
    }
  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to verify payment',
      details: error.message,
    });
  }
});

// WhatsApp notification endpoint
app.post('/api/send-whatsapp', (req, res) => {
  try {
    const { bookingData, type } = req.body;

    const message = generateBookingMessage(bookingData, type);
    const phoneNumber = type === 'client' ? bookingData.phoneNumber : '+919488991905'; // Counselor's number

    // For free WhatsApp Business App approach
    // This will generate a WhatsApp link that opens the app with pre-filled message
    const whatsappUrl = `https://wa.me/${phoneNumber.replace('+', '')}?text=${encodeURIComponent(message)}`;

    res.status(200).json({
      success: true,
      message: 'WhatsApp link generated successfully',
      whatsappUrl: whatsappUrl,
      phoneNumber: phoneNumber,
      message: message,
    });
  } catch (error) {
    console.error('Error generating WhatsApp link:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate WhatsApp link',
    });
  }
});

function generateBookingMessage(bookingData, type) {
  const baseMessage = `🎉 *Booking Confirmed!*

📋 *Booking Details:*
👤 Client: ${bookingData.clientName}
📞 Phone: ${bookingData.phoneNumber}
🏥 Service: ${bookingData.serviceName} - ${bookingData.serviceType}
📅 Date: ${bookingData.date}
⏰ Time: ${bookingData.time}
📍 Mode: ${bookingData.mode}
⏱️ Duration: ${bookingData.duration}
💰 Fee: ₹${bookingData.fee}

📝 *Important Notes:*
• Please arrive 10 minutes early
• Session is non-refundable
• Contact us for any changes

📞 Need help? Call: +91 9488991905

Thank you for choosing Intell Counseling Services! 🙏`;

  if (type === 'counselor') {
    return `🔔 *New Booking Alert!*

${baseMessage}

📊 *Counselor Action Required:*
• Review booking details
• Prepare for session
• Contact client if needed`;
  }

  return baseMessage;
}

// Start server
app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
});