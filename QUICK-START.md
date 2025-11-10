# 🚀 Quick Start Guide - Razorpay Payment Integration

## ✅ Everything is Set Up and Running!

### 🌐 Your Application URLs
- **Website:** http://localhost:3001/
- **Booking Page:** http://localhost:3001/booking
- **API Server:** http://localhost:4000/
- **Mobile Access:** http://192.168.1.5:3001/

### 🎯 Test Payment NOW!

1. **Open:** http://localhost:3001/booking

2. **Fill the form:**
   - Name: Test User
   - Email: test@example.com
   - Phone: 9876543210
   - Select counseling type, date, and time

3. **Use Test Card:**
   ```
   Card: 4111 1111 1111 1111
   Expiry: 12/25
   CVV: 123
   ```

4. **Complete payment** and see the success!

### 🔧 Commands

**Start both servers:**
```bash
npm run dev:all
```

**Start only frontend:**
```bash
npm run dev
```

**Start only API server:**
```bash
npm run api
```

### 📊 What's Running?

✅ **Frontend (Vite)** - Port 3001
- Your React application
- Booking form and UI

✅ **API Server (Express)** - Port 4000
- `/api/create-order` - Creates Razorpay orders
- `/api/verify-payment` - Verifies payments
- `/api/send-whatsapp` - Sends notifications

### 🔑 Environment Variables

Located in `.env` and `.env.local`:
```
VITE_RAZORPAY_KEY_ID=rzp_test_GdNMxJUMabbgM9
RAZORPAY_KEY_ID=rzp_test_GdNMxJUMabbgM9
RAZORPAY_KEY_SECRET=3OcDxO5NFLXZxdhamNufc6pj
```

### ✨ Features Working

- ✅ Multi-step booking form
- ✅ Form validation
- ✅ Razorpay payment integration
- ✅ Payment verification
- ✅ WhatsApp notifications
- ✅ Success page redirect

### 🐛 Troubleshooting

**Port already in use?**
- The app will automatically use the next available port

**API not responding?**
- Check if both servers are running with `npm run dev:all`

**Payment fails?**
- Check browser console (F12)
- Verify API server is running on port 4000

### 📚 More Documentation

- `TESTING-PAYMENT.md` - Detailed testing guide
- `RAZORPAY-SETUP-GUIDE.md` - Complete setup documentation
- `README-RAZORPAY.md` - Razorpay integration details

---

## 🎉 Ready to Test!

**Go to:** http://localhost:3001/booking

Your payment integration is fully functional!
