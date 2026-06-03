# PayGlocal Integration Guide

## 🌍 Multi-Currency Support

This backend supports **3 currencies** with PayGlocal:

1. **USD** - `pb_BgoKxjPT6v3d`
2. **INR** - `pb_cmhrzNhQGmsZ`
3. **EUR** - `pb_MD1dr9YNAkHW`

## 🔧 Environment Variables

Add these to your `.env` file or Render environment variables:

```bash
# PayGlocal PB IDs (from embed codes)
PAYGLOCAL_USD_PB_ID=pb_BgoKxjPT6v3d
PAYGLOCAL_INR_PB_ID=pb_cmhrzNhQGmsZ
PAYGLOCAL_EUR_PB_ID=pb_MD1dr9YNAkHW
```

That's all you need! PayGlocal handles everything through the embed script.

## 📡 API Endpoints

### 1. Get Payment Configuration (Frontend)
```
GET /api/payments/config?currency=INR
```

**Response:**
```json
{
  "success": true,
  "data": {
    "pbId": "pb_cmhrzNhQGmsZ",
    "currency": "INR",
    "scriptUrl": "https://oneclick.payglocal.in/simple.js",
    "supportedCurrencies": ["USD", "INR", "EUR"]
  }
}
```

### 2. Create Payment
```
POST /api/payments/create
Content-Type: application/json

{
  "orderId": "ORD-1234567890",
  "amount": 100,
  "currency": "USD"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Payment initiated",
  "data": {
    "paymentId": "PAY-1234567890-ABC123",
    "orderId": "ORD-1234567890",
    "amount": 100,
    "currency": "USD",
    "pbId": "pb_BgoKxjPT6v3d",
    "payglobalScript": "https://oneclick.payglocal.in/simple.js"
  }
}
```

### 3. Verify Payment
```
POST /api/payments/verify
Content-Type: application/json

{
  "paymentId": "PAY-1234567890-ABC123",
  "transactionId": "txn_payglocal_123456",
  "status": "success",
  "signature": "signature_from_payglocal"
}
```

### 4. Webhook Handler
```
POST /api/payments/webhook
Content-Type: application/json

{
  "event": "payment.success",
  "payment_id": "pay_123456",
  "order_id": "PAY-1234567890-ABC123",
  "status": "success",
  "amount": 100,
  "currency": "USD",
  "transaction_id": "txn_123456"
}
```

## 🎨 Frontend Integration

### HTML Template (Dynamic Currency)

```html
<!DOCTYPE html>
<html>
<head>
  <title>Checkout</title>
</head>
<body>
  <div id="payment-form">
    <!-- Currency Selector -->
    <select id="currency-selector">
      <option value="USD">USD - US Dollar</option>
      <option value="INR" selected>INR - Indian Rupee</option>
      <option value="EUR">EUR - Euro</option>
    </select>

    <!-- PayGlocal Form (Dynamically loaded) -->
    <div id="payglocal-form"></div>
  </div>

  <script>
    const API_URL = 'https://your-backend.onrender.com/api';

    // Get selected currency
    const currencySelector = document.getElementById('currency-selector');
    
    currencySelector.addEventListener('change', async () => {
      const currency = currencySelector.value;
      await loadPaymentForm(currency);
    });

    // Load payment form for selected currency
    async function loadPaymentForm(currency) {
      try {
        // Get payment config from backend
        const response = await fetch(`${API_URL}/payments/config?currency=${currency}`);
        const config = await response.json();

        if (config.success) {
          const { pbId, scriptUrl } = config.data;
          
          // Clear previous form
          const formContainer = document.getElementById('payglocal-form');
          formContainer.innerHTML = '';

          // Create new PayGlocal form
          const form = document.createElement('form');
          const script = document.createElement('script');
          script.src = scriptUrl;
          script.setAttribute('data-pb-id', pbId);
          
          form.appendChild(script);
          formContainer.appendChild(form);
        }
      } catch (error) {
        console.error('Failed to load payment form:', error);
      }
    }

    // Initialize with default currency (INR)
    loadPaymentForm('INR');

    // Create payment when user clicks checkout
    async function createPayment(orderId, amount, currency) {
      const response = await fetch(`${API_URL}/payments/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          orderId: orderId,
          amount: amount,
          currency: currency
        })
      });

      const result = await response.json();
      return result.data;
    }
  </script>
</body>
</html>
```

### Next.js Integration

```tsx
// app/checkout/page.tsx
'use client';

import { useState, useEffect } from 'react';

export default function CheckoutPage() {
  const [currency, setCurrency] = useState('INR');
  const [pbId, setPbId] = useState('');

  useEffect(() => {
    loadPaymentConfig(currency);
  }, [currency]);

  const loadPaymentConfig = async (curr: string) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/payments/config?currency=${curr}`
    );
    const data = await response.json();
    
    if (data.success) {
      setPbId(data.data.pbId);
    }
  };

  const handleCheckout = async () => {
    // Create payment
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/payments/create`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: 'ORD-123',
          amount: 100,
          currency: currency
        })
      }
    );

    const result = await response.json();
    console.log('Payment created:', result);
  };

  return (
    <div>
      <h1>Checkout</h1>
      
      {/* Currency Selector */}
      <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
        <option value="USD">USD - US Dollar</option>
        <option value="INR">INR - Indian Rupee</option>
        <option value="EUR">EUR - Euro</option>
      </select>

      {/* PayGlocal Payment Form */}
      {pbId && (
        <form>
          <script
            src="https://oneclick.payglocal.in/simple.js"
            data-pb-id={pbId}
          />
        </form>
      )}

      <button onClick={handleCheckout}>Pay Now</button>
    </div>
  );
}
```

## 💰 Transaction Tracking

### Money IN (Customer Payments)
When payment is successful, automatically creates:
- Payment record with `status: 'captured'`
- Transaction with `type: 'in'`
- Order updated to `paymentStatus: 'paid'`

### Money OUT (Refunds)
When refund is processed:
- Payment updated with `status: 'refunded'`
- Transaction with `type: 'out'`
- Order updated to `paymentStatus: 'refunded'`

### View Transactions by Currency
```
GET /api/transactions?currency=USD&type=in
GET /api/transactions?currency=INR&type=out
GET /api/transactions?currency=EUR
```

## 🔐 Webhook Configuration

Set this URL in your PayGlocal dashboard:
```
https://your-backend.onrender.com/api/payments/webhook
```

**Events to subscribe:**
- `payment.success` - Payment completed
- `payment.failed` - Payment failed
- `refund.created` - Refund initiated
- `refund.success` - Refund completed

## 📊 Dashboard Stats

```
GET /api/transactions/stats/dashboard
```

Returns:
- Total money IN/OUT per currency
- Net balance per currency
- Today's transactions
- Recent activity

## 🧪 Testing

1. **Local Testing:**
   ```bash
   npm run dev
   ```

2. **Test Payment Creation:**
   ```bash
   curl -X POST http://localhost:10000/api/payments/create \
     -H "Content-Type: application/json" \
     -d '{
       "orderId": "TEST-ORDER",
       "amount": 100,
       "currency": "USD"
     }'
   ```

3. **Test Webhook:**
   ```bash
   curl -X POST http://localhost:10000/api/payments/webhook \
     -H "Content-Type: application/json" \
     -d '{
       "event": "payment.success",
       "payment_id": "pay_test",
       "order_id": "PAY-123",
       "status": "success",
       "amount": 100,
       "currency": "USD"
     }'
   ```

## 🚀 Deployment Notes

1. Add all PayGlocal environment variables to Render
2. Configure webhook URL in PayGlocal dashboard
3. Test each currency separately
4. Monitor logs for webhook events

## 📞 Support

For PayGlocal specific issues, contact PayGlocal support.
For backend issues, check Render logs.

---

**Multi-Currency Ready** 🌍 USD | INR | EUR
