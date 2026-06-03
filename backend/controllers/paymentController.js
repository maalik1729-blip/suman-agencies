const axios = require('axios');
const crypto = require('crypto');
const Order = require('../models/Order');
const Payment = require('../models/Payment');
const Transaction = require('../models/Transaction');

// PayGlocal PB IDs for different currencies
const PAYGLOCAL_PB_IDS = {
  USD: process.env.PAYGLOCAL_USD_PB_ID || 'pb_BgoKxjPT6v3d',
  INR: process.env.PAYGLOCAL_INR_PB_ID || 'pb_cmhrzNhQGmsZ',
  EUR: process.env.PAYGLOCAL_EUR_PB_ID || 'pb_MD1dr9YNAkHW'
};

// Create payment order
exports.createPayment = async (req, res) => {
  try {
    const { orderId, amount, currency = 'INR' } = req.body;

    // Validate currency
    if (!['USD', 'INR', 'EUR'].includes(currency)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid currency. Supported: USD, INR, EUR'
      });
    }

    // Find order
    const order = await Order.findOne({
      $or: [{ _id: orderId }, { orderId: orderId }]
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Generate unique payment ID
    const paymentId = `PAY-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    // Get PayGlocal PB ID based on currency
    const pbId = PAYGLOCAL_PB_IDS[currency];

    // Create payment record
    const payment = new Payment({
      paymentId: paymentId,
      orderId: order._id,
      orderNumber: order.orderId,
      amount: amount,
      currency: currency,
      status: 'created',
      gateway: 'payglocal',
      payglobalPbId: pbId,
      gatewayOrderId: paymentId,
      customer: {
        email: order.customer.email,
        phone: order.customer.phone,
        name: order.customer.name
      }
    });

    await payment.save();

    // Update order with payment reference
    order.paymentId = payment._id;
    await order.save();

    res.json({
      success: true,
      message: 'Payment initiated',
      data: {
        paymentId: payment.paymentId,
        orderId: order.orderId,
        amount: amount,
        currency: currency,
        pbId: pbId,
        payglobalScript: 'https://oneclick.payglocal.in/simple.js'
      }
    });
  } catch (error) {
    console.error('Create payment error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create payment',
      error: error.message
    });
  }
};

// Verify payment (called after PayGlocal redirects back)
exports.verifyPayment = async (req, res) => {
  try {
    const {
      paymentId,
      transactionId,
      status,
      signature
    } = req.body;

    // Find payment
    const payment = await Payment.findOne({ 
      $or: [
        { paymentId: paymentId },
        { gatewayPaymentId: transactionId }
      ]
    });

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: 'Payment not found'
      });
    }

    // Update payment status
    payment.gatewayPaymentId = transactionId;
    payment.gatewaySignature = signature;
    
    if (status === 'success' || status === 'captured') {
      payment.status = 'captured';
    } else if (status === 'failed') {
      payment.status = 'failed';
    } else {
      payment.status = 'pending';
    }

    await payment.save();

    // Update order if payment successful
    const order = await Order.findById(payment.orderId);
    if (order && payment.status === 'captured') {
      order.paymentStatus = 'paid';
      order.status = 'confirmed';
      await order.save();

      // Create transaction record (Money IN)
      const transaction = new Transaction({
        type: 'in',
        amount: payment.amount,
        currency: payment.currency,
        orderId: payment.orderId,
        orderNumber: payment.orderNumber,
        paymentId: payment._id,
        description: `Payment received for order ${payment.orderNumber} (${payment.currency})`,
        category: 'sale',
        status: 'completed',
        metadata: {
          payglobalTransactionId: transactionId,
          payglobalPaymentId: paymentId,
          currency: payment.currency
        }
      });
      await transaction.save();
    } else if (order && payment.status === 'failed') {
      order.paymentStatus = 'failed';
      await order.save();
    }

    res.json({
      success: payment.status === 'captured',
      message: payment.status === 'captured' ? 'Payment verified successfully' : 'Payment verification failed',
      data: {
        payment,
        order
      }
    });
  } catch (error) {
    console.error('Verify payment error:', error);
    res.status(500).json({
      success: false,
      message: 'Payment verification failed',
      error: error.message
    });
  }
};

// Webhook handler for PayGlocal
exports.handleWebhook = async (req, res) => {
  try {
    const webhookData = req.body;
    
    console.log('PayGlocal Webhook received:', webhookData);

    // Extract data from webhook
    const {
      event,
      payment_id,
      order_id,
      status,
      amount,
      currency,
      transaction_id
    } = webhookData;

    // Find payment by order_id or payment_id
    const payment = await Payment.findOne({
      $or: [
        { paymentId: order_id },
        { gatewayPaymentId: payment_id },
        { gatewayOrderId: order_id }
      ]
    });

    if (!payment) {
      console.log('Payment not found for webhook');
      return res.status(404).json({
        success: false,
        message: 'Payment not found'
      });
    }

    // Update payment based on webhook event
    if (event === 'payment.success' || status === 'success') {
      await handlePaymentSuccess(payment, webhookData);
    } else if (event === 'payment.failed' || status === 'failed') {
      await handlePaymentFailed(payment, webhookData);
    } else if (event === 'refund.created' || event === 'refund.success') {
      await handleRefundCreated(payment, webhookData);
    }

    res.json({ success: true, message: 'Webhook processed' });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({
      success: false,
      message: 'Webhook processing failed',
      error: error.message
    });
  }
};

// Helper: Handle payment success
async function handlePaymentSuccess(payment, data) {
  if (payment.status !== 'captured') {
    payment.status = 'captured';
    payment.gatewayPaymentId = data.transaction_id || data.payment_id;
    payment.gatewayResponse = data;
    await payment.save();

    const order = await Order.findById(payment.orderId);
    if (order) {
      order.paymentStatus = 'paid';
      order.status = 'confirmed';
      await order.save();
    }

    // Create transaction (Money IN)
    const transaction = new Transaction({
      type: 'in',
      amount: payment.amount,
      currency: payment.currency,
      orderId: payment.orderId,
      orderNumber: payment.orderNumber,
      paymentId: payment._id,
      description: `Payment received for order ${payment.orderNumber} (${payment.currency})`,
      category: 'sale',
      status: 'completed',
      metadata: data
    });
    await transaction.save();
  }
}

// Helper: Handle payment failed
async function handlePaymentFailed(payment, data) {
  payment.status = 'failed';
  payment.failureReason = data.error_message || data.failure_reason || 'Payment failed';
  payment.gatewayResponse = data;
  await payment.save();

  const order = await Order.findById(payment.orderId);
  if (order) {
    order.paymentStatus = 'failed';
    await order.save();
  }
}

// Helper: Handle refund created
async function handleRefundCreated(payment, data) {
  payment.status = 'refunded';
  payment.refundId = data.refund_id;
  payment.refundAmount = data.refund_amount || payment.amount;
  payment.refundedAt = new Date();
  await payment.save();

  const order = await Order.findById(payment.orderId);
  if (order) {
    order.paymentStatus = 'refunded';
    await order.save();
  }

  // Create transaction (Money OUT)
  const transaction = new Transaction({
    type: 'out',
    amount: payment.refundAmount,
    currency: payment.currency,
    orderId: payment.orderId,
    orderNumber: payment.orderNumber,
    paymentId: payment._id,
    description: `Refund for order ${payment.orderNumber} (${payment.currency})`,
    category: 'refund',
    status: 'completed',
    metadata: data
  });
  await transaction.save();
}

// Get payment by ID
exports.getPayment = async (req, res) => {
  try {
    const { id } = req.params;
    const payment = await Payment.findOne({
      $or: [{ _id: id }, { paymentId: id }]
    }).populate('orderId');

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: 'Payment not found'
      });
    }

    res.json({
      success: true,
      data: payment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch payment',
      error: error.message
    });
  }
};

// Get PayGlocal configuration for frontend
exports.getPaymentConfig = async (req, res) => {
  try {
    const { currency = 'INR' } = req.query;

    if (!['USD', 'INR', 'EUR'].includes(currency)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid currency. Supported: USD, INR, EUR'
      });
    }

    res.json({
      success: true,
      data: {
        pbId: PAYGLOCAL_PB_IDS[currency],
        currency: currency,
        scriptUrl: 'https://oneclick.payglocal.in/simple.js',
        supportedCurrencies: ['USD', 'INR', 'EUR']
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch payment config',
      error: error.message
    });
  }
};
