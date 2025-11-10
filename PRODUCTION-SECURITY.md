# Production Security Checklist

## ✅ Completed Security Fixes

### 1. Removed Hardcoded Sensitive Data
- ✅ Removed hardcoded Razorpay keys from `vercel.json`
- ✅ Removed hardcoded fallback values from API files
- ✅ Added proper error handling for missing environment variables

### 2. Updated Files
- ✅ `vercel.json` - Removed sensitive environment variables
- ✅ `api/create-order.ts` - Removed hardcoded fallbacks
- ✅ `api/verify-payment.ts` - Removed hardcoded fallbacks  
- ✅ `src/components/PaymentGateway.tsx` - Removed hardcoded fallbacks

## 🔐 Environment Variables to Set in Vercel Dashboard

### Required Variables (Production)

#### Payment Gateway (Razorpay)
```bash
RAZORPAY_KEY_ID=your_production_razorpay_key_id
RAZORPAY_KEY_SECRET=your_production_razorpay_secret_key
VITE_RAZORPAY_KEY_ID=your_production_razorpay_key_id
```

#### Email Service (Resend)
```bash
RESEND_API_KEY=your_production_resend_api_key
```

#### Optional Frontend Variables
```bash
VITE_API_BASE_URL=https://your-domain.vercel.app/api
VITE_APP_NAME=Calm Counseling Connect
VITE_APP_VERSION=1.0.0
```

## 🚨 Critical Security Steps

### 1. Set Environment Variables in Vercel Dashboard
1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add each variable listed above with your **production** values
4. Make sure to use **production** API keys, not test keys

### 2. Verify Production Keys
- ✅ Use **production** Razorpay keys (not test keys)
- ✅ Use **production** Resend API key
- ✅ Test payment flow with production keys

### 3. Remove Local Development Files
- ✅ Ensure `.env.local` is not committed to Git
- ✅ Remove any `.env` files from repository
- ✅ Verify `.gitignore` includes `*.local`

## 🔍 Testing Checklist

### Before Deployment
- [ ] All environment variables set in Vercel Dashboard
- [ ] Production API keys configured
- [ ] Payment flow tested with production keys
- [ ] Email notifications working
- [ ] WhatsApp notifications working

### After Deployment
- [ ] Test complete booking flow
- [ ] Verify payment processing
- [ ] Check email delivery
- [ ] Test WhatsApp notifications
- [ ] Monitor error logs

## 🛡️ Security Best Practices

### ✅ Implemented
- No hardcoded secrets in code
- Environment variables properly configured
- Error handling for missing variables
- CORS headers properly set
- Input validation in place

### 🔄 Ongoing
- Regular security audits
- Monitor API usage
- Keep dependencies updated
- Review access logs

## 🚨 Emergency Contacts

If you encounter issues:
1. Check Vercel function logs
2. Verify environment variables are set
3. Test with production API keys
4. Contact support if needed

## 📝 Notes

- **Never** commit `.env` files to Git
- **Always** use Vercel Dashboard for production environment variables
- **Test** thoroughly before going live
- **Monitor** your application after deployment 