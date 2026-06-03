# Suman Agencies Backend API

Payment and Order Management Backend for Suman Agencies

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- MongoDB Atlas account (already configured)
- Razorpay account (for payment gateway)

### Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Update .env with your Razorpay credentials
```

### Running Locally

```bash
# Development mode (with auto-restart)
npm run dev

# Production mode
npm start
```

Server will start on `http://localhost:10000`

## 📦 Deployment on Render

### Step 1: Push to GitHub
```bash
git init
git add .
git commit -m "Initial backend setup"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

### Step 2: Deploy on Render

1. Go to [render.com](https://render.com)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: suman-agencies-api
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free (or paid for always-on)

5. Add Environment Variables:
   ```
   MONGODB_URI=mongodb+srv://smileyvnkt_db_user:GnQWFciCIQfyWfpM@cluster0.f1csuxt.mongodb.net/sumanagency?appName=Cluster0
   PORT=10000
   NODE_ENV=production
   FRONTEND_URL=https://sumanagency.shop
   PAYGLOCAL_USD_PB_ID=pb_BgoKxjPT6v3d
   PAYGLOCAL_INR_PB_ID=pb_cmhrzNhQGmsZ
   PAYGLOCAL_EUR_PB_ID=pb_MD1dr9YNAkHW
   WEBHOOK_SECRET=your_webhook_secret
   ```

6. Click "Create Web Service"

### Step 3: Get Your API URL
After deployment, Render will give you a URL like:
`https://suman-agencies-api.onrender.com`

Use this in your frontend!

### Step 4: Configure PayGlocal Webhook
Go to PayGlocal dashboard and set webhook URL:
`https://suman-agencies-api.onrender.com/api/payments/webhook`

## 📡 API Endpoints

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders` - Get all orders (paginated)
- `GET /api/orders/:id` - Get order by ID
- `GET /api/orders/email/:email` - Get orders by email
- `PATCH /api/orders/:id` - Update order status

### Payments (PayGlocal - USD, INR, EUR)
- `GET /api/payments/config?currency=INR` - Get payment config for currency
- `POST /api/payments/create` - Create payment (specify currency)
- `POST /api/payments/verify` - Verify payment
- `POST /api/payments/webhook` - PayGlocal webhook
- `GET /api/payments/:id` - Get payment details

### Transactions
- `GET /api/transactions` - Get all transactions (with filters)
- `GET /api/transactions/:id` - Get transaction by ID
- `GET /api/transactions/stats/dashboard` - Dashboard statistics
- `POST /api/transactions` - Create manual transaction

### Query Parameters for Transactions
```
?type=in          # Filter by type (in/out)
?category=sale    # Filter by category
?status=completed # Filter by status
?page=1           # Pagination
?limit=50         # Results per page
?startDate=2024-01-01  # Date range
?endDate=2024-12-31
```

## 💾 MongoDB Collections

### Orders Collection
Stores all order information with customer details and items

### Payments Collection
Tracks payment status, gateway responses, and refunds

### Transactions Collection
Records all money IN (payments) and money OUT (refunds)
- Type: `in` = Money received
- Type: `out` = Refunds/Payouts

## 🔐 Security Features

- ✅ Helmet.js for security headers
- ✅ Rate limiting (100 req/15 min)
- ✅ CORS protection
- ✅ Signature verification for webhooks
- ✅ Environment variable protection

## 📊 Monitoring Transactions

### View all payments received (Money IN):
```
GET /api/transactions?type=in
```

### View all refunds (Money OUT):
```
GET /api/transactions?type=out
```

### Dashboard statistics:
```
GET /api/transactions/stats/dashboard
```

Returns:
- Total orders
- Total payments in/out
- Net balance
- Today's transactions
- Recent activity

## 🔗 Connect to Frontend

Update your Next.js `.env.local`:
```bash
NEXT_PUBLIC_API_URL=https://suman-agencies-api.onrender.com
```

## 📝 Notes

- **Free Tier**: Render free tier sleeps after 15 min inactivity (50-100ms cold start)
- **Paid Tier**: $7/month for always-on service
- **Database**: MongoDB Atlas free tier (512MB storage)
- **Logs**: View in Render dashboard

## 🛠 Troubleshooting

### Connection Issues
- Verify MongoDB URI in environment variables
- Check if MongoDB Atlas allows Render's IP (0.0.0.0/0)

### Payment Issues
- Check webhook URL is set in PayGlocal dashboard
- Test each currency (USD, INR, EUR) separately
- Verify PayGlocal PB IDs match your embed codes
- Check that the embed script is loading correctly

### CORS Errors
- Ensure FRONTEND_URL matches your domain exactly
- Check protocol (http vs https)

## 📞 Support

For issues, check:
- Render logs: Dashboard → Logs tab
- MongoDB logs: Atlas → Metrics
- PayGlocal logs: Dashboard → Transaction Logs

For detailed PayGlocal integration, see `PAYGLOCAL_INTEGRATION.md`

---

Built for Suman Agencies 🪑
