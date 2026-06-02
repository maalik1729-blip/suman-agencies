const Transaction = require('../models/Transaction');
const Order = require('../models/Order');

// Get all transactions with pagination
exports.getAllTransactions = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    const skip = (page - 1) * limit;

    const filter = {};
    
    // Filter by type (in/out)
    if (req.query.type) {
      filter.type = req.query.type;
    }

    // Filter by category
    if (req.query.category) {
      filter.category = req.query.category;
    }

    // Filter by status
    if (req.query.status) {
      filter.status = req.query.status;
    }

    // Date range filter
    if (req.query.startDate || req.query.endDate) {
      filter.createdAt = {};
      if (req.query.startDate) {
        filter.createdAt.$gte = new Date(req.query.startDate);
      }
      if (req.query.endDate) {
        filter.createdAt.$lte = new Date(req.query.endDate);
      }
    }

    const transactions = await Transaction.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('orderId')
      .populate('paymentId');

    const total = await Transaction.countDocuments(filter);

    // Calculate totals
    const totalIn = await Transaction.aggregate([
      { $match: { type: 'in', status: 'completed' } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);

    const totalOut = await Transaction.aggregate([
      { $match: { type: 'out', status: 'completed' } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);

    res.json({
      success: true,
      data: transactions,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      },
      summary: {
        totalIn: totalIn[0]?.total || 0,
        totalOut: totalOut[0]?.total || 0,
        netBalance: (totalIn[0]?.total || 0) - (totalOut[0]?.total || 0)
      }
    });
  } catch (error) {
    console.error('Get transactions error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch transactions',
      error: error.message
    });
  }
};

// Get transaction by ID
exports.getTransaction = async (req, res) => {
  try {
    const { id } = req.params;

    const transaction = await Transaction.findOne({
      $or: [{ _id: id }, { transactionId: id }]
    })
      .populate('orderId')
      .populate('paymentId');

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: 'Transaction not found'
      });
    }

    res.json({
      success: true,
      data: transaction
    });
  } catch (error) {
    console.error('Get transaction error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch transaction',
      error: error.message
    });
  }
};

// Get dashboard statistics
exports.getDashboardStats = async (req, res) => {
  try {
    // Total orders
    const totalOrders = await Order.countDocuments();
    const pendingOrders = await Order.countDocuments({ status: 'pending' });
    const completedOrders = await Order.countDocuments({ status: 'delivered' });

    // Payment stats
    const paidOrders = await Order.countDocuments({ paymentStatus: 'paid' });
    const pendingPayments = await Order.countDocuments({ paymentStatus: 'pending' });

    // Transaction stats
    const totalTransactions = await Transaction.countDocuments();
    
    // Money in (completed)
    const moneyIn = await Transaction.aggregate([
      { $match: { type: 'in', status: 'completed' } },
      { $group: { _id: null, total: { $sum: '$amount' }, count: { $sum: 1 } } }
    ]);

    // Money out (completed)
    const moneyOut = await Transaction.aggregate([
      { $match: { type: 'out', status: 'completed' } },
      { $group: { _id: null, total: { $sum: '$amount' }, count: { $sum: 1 } } }
    ]);

    // Recent transactions
    const recentTransactions = await Transaction.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .populate('orderId', 'orderId customer')
      .populate('paymentId', 'status method');

    // Today's transactions
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const todayTransactions = await Transaction.aggregate([
      { $match: { createdAt: { $gte: today }, status: 'completed' } },
      { $group: { 
        _id: '$type',
        total: { $sum: '$amount' },
        count: { $sum: 1 }
      }}
    ]);

    const todayStats = {
      in: todayTransactions.find(t => t._id === 'in') || { total: 0, count: 0 },
      out: todayTransactions.find(t => t._id === 'out') || { total: 0, count: 0 }
    };

    res.json({
      success: true,
      data: {
        orders: {
          total: totalOrders,
          pending: pendingOrders,
          completed: completedOrders,
          paid: paidOrders,
          pendingPayments: pendingPayments
        },
        transactions: {
          total: totalTransactions,
          moneyIn: {
            total: moneyIn[0]?.total || 0,
            count: moneyIn[0]?.count || 0
          },
          moneyOut: {
            total: moneyOut[0]?.total || 0,
            count: moneyOut[0]?.count || 0
          },
          netBalance: (moneyIn[0]?.total || 0) - (moneyOut[0]?.total || 0)
        },
        today: todayStats,
        recentTransactions
      }
    });
  } catch (error) {
    console.error('Get dashboard stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch dashboard statistics',
      error: error.message
    });
  }
};

// Create manual transaction (for adjustments)
exports.createTransaction = async (req, res) => {
  try {
    const { type, amount, description, category, orderId, metadata } = req.body;

    if (!type || !amount || !description) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: type, amount, description'
      });
    }

    const transaction = new Transaction({
      type,
      amount,
      description,
      category: category || 'other',
      orderId,
      metadata,
      status: 'completed'
    });

    await transaction.save();

    res.status(201).json({
      success: true,
      message: 'Transaction created successfully',
      data: transaction
    });
  } catch (error) {
    console.error('Create transaction error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create transaction',
      error: error.message
    });
  }
};
