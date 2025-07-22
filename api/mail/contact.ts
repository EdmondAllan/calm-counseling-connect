import type { VercelRequest, VercelResponse } from '@vercel/node';
import fetch from 'node-fetch';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Add a simple response to check if the API is being called
  console.log('API endpoint called with method:', req.method);
  console.log('Request headers:', req.headers);
  console.log('Request body:', req.body);
  console.log('Request URL:', req.url);
  
  // Return a simple JSON response for debugging
  if (req.method === 'GET') {
    return res.status(200).json({ message: 'API endpoint is working!' });
  }
  
  // CORS preflight
  if (req.method === 'OPTIONS') {
    console.log('Handling OPTIONS request');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS, GET');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(200).end();
  }

  res.setHeader('Access-Control-Allow-Origin', '*');

  if (req.method !== 'POST') {
    console.log('Method not allowed:', req.method);
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { name, email, phone, message } = req.body || {};
  console.log('Extracted form data:', { name, email, phone, message: message?.substring(0, 20) + '...' });
  if (!name || !email || !phone || !message) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer re_Y4gFkPUT_KyfjLNKbvyzDPCHnBCoXZuWG',
        'Content-Type': 'application/json',
      },
      // Using verified domain intellcounseling.in for better deliverability
      body: JSON.stringify({
        from: 'Contact Form <info@intellcounseling.in>',
        to: ['intellcounseling@gmail.com'],
        subject: 'New Contact Form Submission',
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Message:</strong><br/>${message}</p>
        `,
        reply_to: email, // Add reply-to field to allow direct replies to the sender
      }),
    });

    if (!response.ok) {
      const error = await response.json() as any;
      console.error('Resend API error:', error);
      return res.status(500).json({ message: error.message || 'Failed to send email.', details: error });
    }

    return res.status(200).json({ message: 'Message sent successfully!' });
  } catch (error: any) {
    console.error('Serverless function error:', error);
    return res.status(500).json({ message: error.message || 'Internal server error.', details: error });
  }
}