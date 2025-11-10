# Deployment Guide for Calm Counseling Connect

## Vercel Deployment

This guide will help you deploy the Calm Counseling Connect application to Vercel with the correct configuration for Razorpay integration.

### Prerequisites

1. A Vercel account
2. Razorpay account with API keys

### Environment Variables

The following environment variables need to be set in your Vercel project:

```
RAZORPAY_KEY_ID=rzp_test_GdNMxJUMabbgM9
RAZORPAY_KEY_SECRET=3OcDxO5NFLXZxdhamNufc6pj
VITE_RAZORPAY_KEY_ID=rzp_test_GdNMxJUMabbgM9
RESEND_API_KEY=re_Y4gFkPUT_KyfjLNKbvyzDPCHnBCoXZuWG
```

### Deployment Steps

1. **Push your code to GitHub**
   - Make sure your code is in a GitHub repository

2. **Import your project to Vercel**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your GitHub repository

3. **Configure the project**
   - Set the Framework Preset to "Vite"
   - Add the environment variables listed above
   - Set the Build Command to `npm run build`
   - Set the Output Directory to `dist`

4. **Deploy**
   - Click "Deploy"
   - Wait for the deployment to complete

### Troubleshooting

If you encounter issues with Razorpay integration after deployment:

1. **Check Environment Variables**
   - Verify that all environment variables are correctly set in the Vercel project settings

2. **Check API Configuration**
   - The application now uses an environment-aware API configuration in `src/config/api.ts`
   - In development mode, it points to `http://localhost:4000/api`
   - In production mode, it points to `/api` (Vercel serverless functions)

3. **Check API Endpoints**
   - Make sure the frontend is using relative paths for API calls (e.g., `/api/create-order` instead of `http://localhost:4000/api/create-order`)

3. **Check CORS Headers**
   - Verify that the API endpoints have the correct CORS headers

4. **Check Razorpay Configuration**
   - Ensure that the Razorpay key ID is correctly set in the frontend
   - Verify that the Razorpay key secret is correctly set in the backend

5. **Check Network Requests**
   - Use the browser's developer tools to check for any network request errors

### Important Notes

- The current configuration uses Razorpay test keys. For production, you should replace these with your production keys.
- Make sure to update the `vercel.json` file if you need to add more environment variables or change the configuration.
- The application uses API routes in the `/api` directory, which are automatically deployed as serverless functions by Vercel.