import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

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
}

function generateBookingMessage(bookingData: any, type: string): string {
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