const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

// Get payment config (for frontend)
router.get('/config', paymentController.getPaymentConfig);

// Create payment
router.post('/create', paymentController.createPayment);

// Verify payment
router.post('/verify', paymentController.verifyPayment);

// Webhook handler
router.post('/webhook', paymentController.handleWebhook);

// Get payment by ID
router.get('/:id', paymentController.getPayment);

module.exports = router;
