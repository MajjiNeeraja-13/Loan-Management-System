const Payment = require('../models/Payment');
const Loan = require('../models/Loan');
const Customer = require('../models/Customer');
const crypto = require('crypto');

// @desc    Process a new EMI payment
// @route   POST /api/payments
// @access  Private (Customer)
const processPayment = async (req, res, next) => {
  try {
    const { loanId, amount, paymentMethod } = req.body;

    const customer = await Customer.findOne({ user: req.user._id });
    if (!customer) {
      res.status(404);
      throw new Error('Customer profile not found');
    }

    const loan = await Loan.findOne({ _id: loanId, customer: customer._id });
    if (!loan) {
      res.status(404);
      throw new Error('Loan not found or unauthorized');
    }

    if (loan.status !== 'Active') {
      res.status(400);
      throw new Error('Payments can only be made on Active loans');
    }

    // Generate a mock transaction ID
    const transactionId = 'TXN' + crypto.randomBytes(4).toString('hex').toUpperCase();

    const payment = await Payment.create({
      loan: loan._id,
      customer: customer._id,
      amount,
      transactionId,
      paymentMethod,
      status: 'Success' // Mocking successful payment gateway
    });

    res.status(201).json(payment);
  } catch (error) {
    next(error);
  }
};

// @desc    Get all payments
// @route   GET /api/payments
// @access  Private
const getPayments = async (req, res, next) => {
  try {
    let query = {};

    // If Customer, only fetch their payments
    if (req.user.role === 'Customer') {
      const customer = await Customer.findOne({ user: req.user._id });
      if (!customer) return res.json([]);
      query.customer = customer._id;
    }

    const payments = await Payment.find(query)
      .populate({
        path: 'loan',
        select: 'type principalAmount emiAmount status'
      })
      .populate({
        path: 'customer',
        populate: { path: 'user', select: 'name email' }
      })
      .sort({ createdAt: -1 });

    res.json(payments);
  } catch (error) {
    next(error);
  }
};

// @desc    Get payments for a specific loan
// @route   GET /api/payments/loan/:loanId
// @access  Private
const getPaymentsByLoan = async (req, res, next) => {
  try {
    const payments = await Payment.find({ loan: req.params.loanId })
      .sort({ createdAt: -1 });
    res.json(payments);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  processPayment,
  getPayments,
  getPaymentsByLoan
};
