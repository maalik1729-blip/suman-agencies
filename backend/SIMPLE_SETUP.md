# 🚀 Simple Setup Guide - Suman Agencies Backend

## What You Have

✅ MongoDB Connection String (already configured)  
✅ PayGlocal Embed Codes for 3 currencies:
- USD: `pb_BgoKxjPT6v3d`
- INR: `pb_cmhrzNhQGmsZ`
- EUR: `pb_MD1dr9YNAkHW`

## Quick Start (5 Steps)

### 1️⃣ Install Dependencies
```bash
cd backend
npm install
```

### 2️⃣ Create .env File
```bash
cp .env.example .env
```

Your `.env` file is ready! No additional keys needed - just the PB IDs that are already configured.

### 3️⃣ Test Locally
```bash
npm run dev
```

Visit: http://localhost:10000  
You should see: `{"success": true, "message": "Suman Agencies API is running"}`

### 4️⃣ Push to GitHub
```bash
git init
git add .
git commit -m "Backend setup with PayGlocal"
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

### 5️⃣ Deploy on Render

1. Go to **render.com**
2. Sign up/Login with GitHub
3. Click **"New +"** → **"Web Service"**
4. Select your backend repository
5. Configure:
   - **Name**: `suman-agencies-api`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
6. Add Environment Variables:
   ```
   MONGODB_URI=mongodb+srv://smileyvnkt_db_user:GnQWFciCIQfyWfpM@cluster0.f1csuxt.mongodb.net/sumanagency?appName=Cluster0
   PORT=10000
   NODE_ENV=production
   FRONTEND_URL=https://sumanagency.shop
   PAYGLOCAL_USD_PB_ID=pb_BgoKxjPT6v3d
   PAYGLOCAL_INR_PB_ID=pb_cmhrzNhQGmsZ
   PAYGLOCAL_EUR_PB_ID=pb_MD1dr9YNAkHW
   WEBHOOK_SECRET=any_random_string_here
   ```
7. Click **"Create Web Service"**

✅ Done! Your API will be live at: `https://suman-agencies-api.onrender.com`

## How Frontend Uses It

### Get Payment Config
```javascript
// Frontend calls this to get the right PB ID
const response = await fetch(
  'https://your-api.onrender.com/api/payments/config?currency=USD'
);

// Returns: { pbId: "pb_BgoKxjPT6v3d", ... }
```

### Show PayGlocal Form
```html
<form>
  <script 
    src="https://oneclick.payglocal.in/simple.js" 
    data-pb-id="pb_BgoKxjPT6v3d">
  </script>
</form>
```

### Create Order & Payment
```javascript
// 1. Create order
await fetch('https://your-api.onrender.com/api/orders', {
  method: 'POST',
  body: JSON.stringify({
    customer: { name, email, phone },
    items: [...],
    pricing: { total: 100 }
  })
});

// 2. Create payment
await fetch('https://your-api.onrender.com/api/payments/create', {
  method: 'POST',
  body: JSON.stringify({
    orderId: 'ORD-123',
    amount: 100,
    currency: 'USD'
  })
});
```

## View Money IN/OUT

### Dashboard Stats
```
GET https://your-api.onrender.com/api/transactions/stats/dashboard
```

Shows:
- Total money IN (all currencies)
- Total money OUT (refunds)
- Net balance
- Today's transactions

### All Transactions
```
GET https://your-api.onrender.com/api/transactions?currency=USD&type=in
```

Filter by:
- `currency`: USD, INR, EUR
- `type`: in (payments), out (refunds)
- `page`: 1, 2, 3...
- `limit`: 50, 100...

## That's It! 🎉

No complex API keys needed - PayGlocal embed codes handle everything!

**Questions?** Check:
- `README.md` - Full documentation
- `PAYGLOCAL_INTEGRATION.md` - Detailed integration guide
- Render Logs - For deployment issues
- MongoDB Atlas - For database issues

---

**Ready to deploy?** Just follow the 5 steps above! 🚀
