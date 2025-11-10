# 🧪 Testing Your Razorpay Payment Integration

## ✅ Your Servers are Running!
- **Frontend URL:** http://localhost:3001/
- **API Server:** http://localhost:4000/
- **Network URL:** http://192.168.1.5:3001/

## 📝 Step-by-Step Testing Guide

### Step 1: Open the Booking Page
1. Open your browser
2. Go to: **http://localhost:3001/booking**

### Step 2: Fill Personal Information
- **Name:** Enter any name (e.g., "John Doe")
- **Email:** Enter valid email (e.g., "john@example.com")
- **Phone:** Enter 10-digit number (e.g., "9876543210")
- Click **"Continue"**

### Step 3: Select Session Details
- **Type of Counseling:** Choose any option (e.g., "Family Therapy")
- **Date:** Pick any future date
- **Time:** Select a time slot
- **Notes:** (Optional) Add any notes
- Click **"Continue"**

### Step 4: Review & Pay
- Review your booking summary
- Session fee will be **₹1000**
- Click **"Confirm & Pay ₹1000"**

### Step 5: Complete Test Payment
The Razorpay checkout will open. Use these **TEST CREDENTIALS**:

#### Option 1: Test Card Payment
```
Card Number: 4111 1111 1111 1111
Expiry Date: 12/25 (any future date)
CVV: 123 (any 3 digits)
Cardholder Name: Test User
```

#### Option 2: Test UPI Payment
```
UPI ID: success@razorpay
```

#### Option 3: Test Netbanking
- Select any bank
- Use test credentials provided on the page

### Step 6: Verify Success
After successful payment:
- ✅ Payment should be verified
- ✅ WhatsApp notification links should open
- ✅ You'll be redirected to success page
- ✅ Booking confirmation displayed

## 🎯 What to Check

### ✓ Payment Flow Works
- [ ] Razorpay checkout opens
- [ ] Test payment succeeds
- [ ] Payment verification completes
- [ ] Success page displays

### ✓ Error Handling
- [ ] Try canceling payment (should handle gracefully)
- [ ] Try with invalid card (should show error)

### ✓ Data Accuracy
- [ ] Booking details are correct
- [ ] Amount is ₹1000
- [ ] Client information is accurate

## 🔍 Debugging

### Check Browser Console
1. Press **F12** to open Developer Tools
2. Go to **Console** tab
3. Look for any errors or logs

### Common Issues

**"Configuration error"**
- Solution: Restart the dev server (`npm run dev`)

**"Razorpay not loaded"**
- Solution: Refresh the page

**"Payment verification failed"**
- Solution: Check that both Key ID and Key Secret are correct in `.env.local`

## 📱 Test on Mobile

Your website is also accessible on your phone:
- Connect phone to same WiFi
- Open: **http://192.168.1.5:3001/booking**
- Test the payment flow on mobile

## 🎉 Success Indicators

When everything works correctly, you should see:
1. ✅ Smooth form navigation
2. ✅ Razorpay checkout opens without errors
3. ✅ Test payment completes successfully
4. ✅ "Payment verified successfully" message
5. ✅ WhatsApp notification options
6. ✅ Booking confirmation page

## 📞 Need Help?

If you encounter issues:
1. Check the browser console for errors
2. Review `RAZORPAY-SETUP-GUIDE.md`
3. Verify environment variables in `.env.local`
4. Restart the development server

---

**Ready to test? Go to:** http://localhost:3001/booking
