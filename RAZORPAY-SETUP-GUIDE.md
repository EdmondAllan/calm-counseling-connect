# Razorpay Integration Setup Guide

## ✅ Integration Status
Your Razorpay payment integration is now **READY TO USE**!

## 🚀 Quick Start

### 1. Environment Setup (Already Done ✓)
The `.env` and `.env.local` files have been created with test credentials.

### 2. Test the Integration

1. **Start the development server** (if not already running):
   ```bash
   npm run dev
   ```

2. **Navigate to the booking page**:
   - Go to `http://localhost:3000/booking`

3. **Fill in the booking form**:
   - Step 1: Enter personal information (name, email, phone)
   - Step 2: Select counseling type, date, and time
   - Step 3: Review booking and click "Confirm & Pay"

4. **Test Payment**:
   Use these test credentials:
   
   **Test Card:**
   - Card Number: `4111 1111 1111 1111`
   - Expiry: Any future date (e.g., `12/25`)
   - CVV: Any 3 digits (e.g., `123`)
   - Name: Any name
   
   **Test UPI:**
   - UPI ID: `success@razorpay`
   
   **Test Netbanking:**
   - Select any bank and use the test credentials provided

### 3. How It Works

```
User fills booking form
        ↓
Clicks "Confirm & Pay"
        ↓
Frontend calls /api/create-order
        ↓
Razorpay order created
        ↓
Razorpay checkout opens
        ↓
User completes payment
        ↓
Frontend calls /api/verify-payment
        ↓
Payment verified
        ↓
WhatsApp notifications sent
        ↓
User redirected to success page
```

## 📋 API Endpoints

### 1. Create Order
**Endpoint:** `/api/create-order`
**Method:** POST
**Purpose:** Creates a Razorpay order before payment

**Request:**
```json
{
  "amount": 1000,
  "currency": "INR",
  "receipt": "receipt_123",
  "bookingData": {
    "clientName": "John Doe",
    "phoneNumber": "9999999999",
    "serviceName": "Family Therapy",
    "serviceType": "Counseling Session",
    "date": "2024-01-15",
    "time": "10:00 AM",
    "mode": "Online",
    "duration": "45 minutes",
    "fee": 1000
  }
}
```

**Response:**
```json
{
  "success": true,
  "order": {
    "id": "order_123456789",
    "amount": 100000,
    "currency": "INR",
    "receipt": "receipt_123",
    "status": "created"
  }
}
```

### 2. Verify Payment
**Endpoint:** `/api/verify-payment`
**Method:** POST
**Purpose:** Verifies payment signature after successful payment

**Request:**
```json
{
  "razorpay_payment_id": "pay_123456789",
  "razorpay_order_id": "order_123456789",
  "razorpay_signature": "signature_hash",
  "bookingData": { ... }
}
```

**Response:**
```json
{
  "success": true,
  "message": "Payment verified successfully",
  "bookingData": { ... }
}
```

### 3. Send WhatsApp Notification
**Endpoint:** `/api/send-whatsapp`
**Method:** POST
**Purpose:** Sends booking confirmation via WhatsApp

## 🔑 Razorpay Keys

### Test Keys (Currently Active)
- **Key ID:** `rzp_test_GdNMxJUMabbgM9`
- **Key Secret:** `3OcDxO5NFLXZxdhamNufc6pj`

### Getting Your Own Keys

1. **Sign up at Razorpay:**
   - Go to https://razorpay.com/
   - Click "Sign Up" and create an account

2. **Get Test Keys:**
   - Login to Razorpay Dashboard
   - Go to Settings → API Keys
   - Generate Test Keys
   - Copy Key ID and Key Secret

3. **Update Environment Variables:**
   - Open `.env.local`
   - Replace the test keys with your keys:
     ```
     VITE_RAZORPAY_KEY_ID=your_key_id_here
     RAZORPAY_KEY_ID=your_key_id_here
     RAZORPAY_KEY_SECRET=your_key_secret_here
     ```

4. **Restart the dev server:**
   ```bash
   npm run dev
   ```

## 🌐 Going Live (Production)

### 1. Get Live Keys
- In Razorpay Dashboard, complete KYC verification
- Go to Settings → API Keys
- Switch to "Live Mode"
- Generate Live Keys

### 2. Update Production Environment
- In Vercel/your hosting platform:
  - Go to Project Settings → Environment Variables
  - Add:
    - `VITE_RAZORPAY_KEY_ID` = your_live_key_id
    - `RAZORPAY_KEY_ID` = your_live_key_id
    - `RAZORPAY_KEY_SECRET` = your_live_key_secret

### 3. Deploy
```bash
npm run build
# Deploy to your hosting platform
```

## 🧪 Testing Checklist

- [ ] Booking form validation works
- [ ] Payment button opens Razorpay checkout
- [ ] Test payment with card succeeds
- [ ] Payment verification works
- [ ] Success page displays after payment
- [ ] WhatsApp notifications are sent
- [ ] Error handling works (try canceling payment)

## 🔧 Troubleshooting

### Payment button not working?
1. Check browser console for errors
2. Verify Razorpay script is loaded
3. Check environment variables are set

### Order creation fails?
1. Check API endpoint is accessible
2. Verify Razorpay keys are correct
3. Check server logs for errors

### Payment verification fails?
1. Ensure Key Secret matches Key ID
2. Check signature calculation
3. Verify webhook configuration

## 📞 Support

- **Razorpay Docs:** https://razorpay.com/docs/
- **Test Cards:** https://razorpay.com/docs/payments/payments/test-card-details/
- **API Reference:** https://razorpay.com/docs/api/

## 🎉 You're All Set!

Your Razorpay integration is complete and ready to accept payments. Test it thoroughly before going live!
