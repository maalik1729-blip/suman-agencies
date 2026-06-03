const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Create new order
router.post('/', orderController.createOrder);

// Get all orders (with pagination and filters)
router.get('/', orderController.getAllOrders);

// Get order by ID
router.get('/:id', orderController.getOrder);

// Get orders by email
router.get('/email/:email', orderController.getOrdersByEmail);

// Update order status
router.patch('/:id', orderController.updateOrderStatus);

module.exports = router;
