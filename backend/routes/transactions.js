const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');

// Get all transactions (with filters and pagination)
router.get('/', transactionController.getAllTransactions);

// Get transaction by ID
router.get('/:id', transactionController.getTransaction);

// Get dashboard statistics
router.get('/stats/dashboard', transactionController.getDashboardStats);

// Create manual transaction
router.post('/', transactionController.createTransaction);

module.exports = router;
