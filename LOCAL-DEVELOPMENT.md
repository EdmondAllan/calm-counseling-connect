# Local Development Guide

## Running the Project Locally

This guide will help you run the Calm Counseling Connect application locally with the correct configuration for Razorpay integration.

### Prerequisites

1. Node.js (v14 or higher)
2. npm or yarn
3. Razorpay test account

### Setup

1. **Clone the repository**

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory with the following variables:
   ```
   RAZORPAY_KEY_ID=rzp_test_GdNMxJUMabbgM9
   RAZORPAY_KEY_SECRET=3OcDxO5NFLXZxdhamNufc6pj
   VITE_RAZORPAY_KEY_ID=rzp_test_GdNMxJUMabbgM9
   RESEND_API_KEY=re_Y4gFkPUT_KyfjLNKbvyzDPCHnBCoXZuWG
   ```

### Running the Application

You need to run both the frontend and the API server:

1. **Start the API server**
   ```bash
   node api-server.js
   ```
   This will start the API server on port 4000.

2. **Start the frontend development server**
   ```bash
   npm run dev
   ```
   This will start the frontend on port 3000.

### API Configuration

The application uses an environment-aware API configuration in `src/config/api.ts`:

- In development mode, it points to `http://localhost:4000/api`
- In production mode, it points to `/api` (Vercel serverless functions)

This ensures that the application works correctly in both development and production environments.

### Testing Razorpay Integration

1. Navigate to the booking page
2. Fill in the booking details
3. Click on "Proceed to Payment"
4. The Razorpay checkout form should appear
5. Use the following test card details:
   - Card Number: 4111 1111 1111 1111
   - Expiry: Any future date
   - CVV: Any 3-digit number
   - Name: Any name

### Troubleshooting

If you encounter issues with Razorpay integration during local development:

1. **Check if the API server is running**
   - Make sure the API server is running on port 4000
   - Check the console for any error messages

2. **Check API Configuration**
   - Verify that the API configuration in `src/config/api.ts` is correct
   - In development mode, it should point to `http://localhost:4000/api`

3. **Check Browser Console**
   - Open the browser's developer tools and check the console for any error messages
   - Look for network requests to see if they're being sent to the correct URL

4. **Check Razorpay Script Loading**
   - Verify that the Razorpay script is loading correctly
   - Check the network tab in the browser's developer tools