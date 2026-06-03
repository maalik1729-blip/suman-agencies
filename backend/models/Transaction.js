const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  transactionId: {
    type: String,
    required: true,
    unique: true,
    default: () => `TXN-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
  },
  type: {
    type: String,
    enum: ['in', 'out'],
    required: true,
    // 'in' = Payment received from customer
    // 'out' = Refund/Payout to customer
  },
  amount: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    enum: ['USD', 'INR', 'EUR'],
    default: 'INR'
  },
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order'
  },
  orderNumber: String,
  paymentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Payment'
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['sale', 'refund', 'adjustment', 'other'],
    default: 'sale'
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'completed'
  },
  metadata: {
    type: mongoose.Schema.Types.Mixed
  },
  balanceBefore: Number,
  balanceAfter: Number
}, {
  timestamps: true
});

// Indexes
transactionSchema.index({ transactionId: 1 });
transactionSchema.index({ type: 1 });
transactionSchema.index({ orderId: 1 });
transactionSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Transaction', transactionSchema);
