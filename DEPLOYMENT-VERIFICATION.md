# Deployment Verification Checklist

## ✅ Environment Variables Added to Vercel Dashboard

### Required Variables (Should be set in Vercel Dashboard):

#### Payment Gateway (Razorpay)
- [ ] `RAZORPAY_KEY_ID` - Your production Razorpay key ID
- [ ] `RAZORPAY_KEY_SECRET` - Your production Razorpay secret key
- [ ] `VITE_RAZORPAY_KEY_ID` - Your production Razorpay key ID (for frontend)

#### Email Service (Resend)
- [ ] `RESEND_API_KEY` - Your production Resend API key

#### Optional Frontend Variables
- [ ] `VITE_API_BASE_URL` - Your production API URL
- [ ] `VITE_APP_NAME` - Application name
- [ ] `VITE_APP_VERSION` - Application version

## 🔍 Verification Steps

### 1. Check Environment Variables in Vercel
1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Verify all variables are set correctly
4. Ensure you're using **production** keys (not test keys)

### 2. Test API Endpoints
Test these endpoints to ensure they work with production environment variables:

#### Payment API
```bash
# Test order creation
POST /api/create-order
Content-Type: application/json

{
  "amount": 1000,
  "currency": "INR",
  "receipt": "test_receipt_123",
  "bookingData": {
    "clientName": "Test User",
    "phoneNumber": "1234567890",
    "serviceName": "Test Service",
    "serviceType": "Test Type",
    "date": "2024-01-01",
    "time": "10:00 AM",
    "mode": "online",
    "duration": "60 minutes",
    "fee": 1000
  }
}
```

#### Email API
```bash
# Test email sending
POST /api/mail/contact
Content-Type: application/json

{
  "name": "Test User",
  "email": "test@example.com",
  "phone": "1234567890",
  "message": "Test message"
}
```

### 3. Frontend Testing
1. **Payment Flow**: Test complete booking and payment process
2. **Email Notifications**: Verify contact form sends emails
3. **WhatsApp Notifications**: Test WhatsApp integration
4. **Error Handling**: Test with invalid data

## 🚨 Common Issues & Solutions

### Issue: "Razorpay environment variables are not configured"
**Solution**: Check that `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` are set in Vercel Dashboard

### Issue: "Razorpay key is not configured"
**Solution**: Verify `VITE_RAZORPAY_KEY_ID` is set in Vercel Dashboard

### Issue: Email not sending
**Solution**: Check that `RESEND_API_KEY` is set correctly

### Issue: Payment verification failing
**Solution**: Ensure both Razorpay keys are production keys (not test keys)

## 📊 Monitoring Checklist

### After Deployment:
- [ ] Check Vercel function logs for errors
- [ ] Test payment flow with real payment method
- [ ] Verify email delivery
- [ ] Test WhatsApp notifications
- [ ] Monitor API response times
- [ ] Check for any console errors

### Production Monitoring:
- [ ] Set up error tracking (if needed)
- [ ] Monitor payment success rates
- [ ] Track email delivery rates
- [ ] Monitor API usage and limits

## 🔐 Security Verification

### ✅ Completed:
- [ ] No hardcoded secrets in code
- [ ] Environment variables properly configured
- [ ] Error handling for missing variables
- [ ] CORS headers properly set
- [ ] Input validation in place

### 🔄 Ongoing:
- [ ] Regular security audits
- [ ] Monitor API usage
- [ ] Keep dependencies updated
- [ ] Review access logs

## 🚀 Deployment Commands

### Deploy to Production:
```bash
# Push to your main branch
git add .
git commit -m "Production ready with secure environment variables"
git push origin main
```

### Check Deployment Status:
1. Go to Vercel Dashboard
2. Check deployment logs
3. Verify all functions are deployed successfully
4. Test the live application

## 📞 Support

If you encounter issues:
1. Check Vercel function logs in the dashboard
2. Verify environment variables are set correctly
3. Test with production API keys
4. Contact Vercel support if needed

## ✅ Final Checklist

Before going live:
- [ ] All environment variables set in Vercel Dashboard
- [ ] Production API keys configured
- [ ] Payment flow tested with real payment method
- [ ] Email notifications working
- [ ] WhatsApp notifications working
- [ ] No hardcoded secrets in code
- [ ] Error handling properly implemented
- [ ] Application deployed successfully
- [ ] All tests passing

**Your application is now ready for production! 🎉** 