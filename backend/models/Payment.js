const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  paymentId: {
    type: String,
    required: true,
    unique: true
  },
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true
  },
  orderNumber: {
    type: String,
    required: true
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
  status: {
    type: String,
    enum: ['created', 'pending', 'authorized', 'captured', 'failed', 'refunded'],
    default: 'created'
  },
  method: {
    type: String,
    enum: ['card', 'upi', 'netbanking', 'wallet', 'cod', 'other'],
    default: 'other'
  },
  gateway: {
    type: String,
    enum: ['payglocal', 'manual'],
    default: 'payglocal'
  },
  payglobalPbId: String,
  gatewayPaymentId: String,
  gatewayOrderId: String,
  gatewaySignature: String,
  customer: {
    email: String,
    phone: String,
    name: String
  },
  gatewayResponse: {
    type: mongoose.Schema.Types.Mixed
  },
  failureReason: String,
  refundId: String,
  refundAmount: Number,
  refundedAt: Date
}, {
  timestamps: true
});

// Indexes for queries
paymentSchema.index({ paymentId: 1 });
paymentSchema.index({ orderId: 1 });
paymentSchema.index({ status: 1 });
paymentSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Payment', paymentSchema);
