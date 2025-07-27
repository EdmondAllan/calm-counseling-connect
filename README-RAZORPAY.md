# Razorpay Payment Integration Guide

## Overview

This document provides information about the Razorpay payment integration implemented in the Calm Counseling Connect application. The integration follows the standard checkout flow recommended by Razorpay.

## Configuration

The following Razorpay API keys are used in the integration:

- **Key ID**: `rzp_test_GdNMxJUMabbgM9`
- **Key Secret**: `3OcDxO5NFLXZxdhamNufc6pj`

> **Note**: These are test keys. For production, you'll need to replace them with your live keys.

## Integration Flow

The payment integration follows these steps:

1. **Order Creation**: When a user clicks "Confirm & Pay", the application creates an order on Razorpay's server using the `/api/create-order` endpoint.

2. **Payment Processing**: The Razorpay checkout form is displayed to the user, allowing them to select a payment method and complete the payment.

3. **Payment Verification**: After payment, Razorpay sends back payment details which are verified by the `/api/verify-payment` endpoint to ensure the payment is legitimate.

4. **Success Handling**: Upon successful verification, the user is redirected to a success page and WhatsApp notifications are sent.

## API Endpoints

### 1. Create Order API

**Endpoint**: `/api/create-order`

This API creates a new order in Razorpay with the booking details.

**Request Body**:
```json
{
  "amount": 1000,
  "currency": "INR",
  "receipt": "receipt_123",
  "bookingData": {
    "clientName": "Client Name",
    "phoneNumber": "9999999999",
    "serviceName": "Service Name",
    "serviceType": "Service Type",
    "date": "2023-01-01",
    "time": "10:00 AM",
    "mode": "Online",
    "duration": "45 minutes",
    "fee": 1000
  }
}
```

**Response**:
```json
{
  "success": true,
  "order": {
    "id": "order_123456789",
    "amount": 100000,
    "currency": "INR",
    "receipt": "receipt_123"
  }
}
```

### 2. Verify Payment API

**Endpoint**: `/api/verify-payment`

This API verifies the payment signature to ensure the payment is legitimate.

**Request Body**:
```json
{
  "razorpay_payment_id": "pay_123456789",
  "razorpay_order_id": "order_123456789",
  "razorpay_signature": "signature_hash",
  "bookingData": {
    "clientName": "Client Name",
    "phoneNumber": "9999999999",
    "serviceName": "Service Name",
    "serviceType": "Service Type",
    "date": "2023-01-01",
    "time": "10:00 AM",
    "mode": "Online",
    "duration": "45 minutes",
    "fee": 1000
  }
}
```

**Response**:
```json
{
  "success": true,
  "message": "Payment verified successfully",
  "bookingData": {...}
}
```

## Frontend Implementation

The `PaymentGateway` component handles the frontend integration with Razorpay. It:

1. Loads the Razorpay script
2. Creates an order via the backend API
3. Opens the Razorpay checkout form
4. Verifies the payment after completion
5. Handles success and error scenarios

## Testing

To test the payment integration:

1. Use the following test card details:
   - Card Number: 4111 1111 1111 1111
   - Expiry: Any future date
   - CVV: Any 3-digit number
   - Name: Any name

2. For UPI testing, use:
   - UPI ID: success@razorpay

## Going Live

Before going live with the integration:

1. Replace the test keys with production keys
2. Ensure all error handling is robust
3. Test the integration thoroughly in a staging environment
4. Update the webhook URLs if needed

## Troubleshooting

Common issues and solutions:

1. **Payment verification fails**: Check if the correct key secret is being used for signature verification
2. **Order creation fails**: Ensure the amount is properly formatted (in paise) and all required fields are provided
3. **Razorpay script not loading**: Check network connectivity and ensure the script URL is correct

## Resources

- [Razorpay Documentation](https://razorpay.com/docs/)
- [Standard Checkout Guide](https://razorpay.com/docs/payments/payment-gateway/web-integration/standard/)
- [API Reference](https://razorpay.com/docs/api/)