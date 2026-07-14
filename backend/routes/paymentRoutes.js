const express = require('express');
const router = express.Router();
const { processPayment, getPayments, getPaymentsByLoan } = require('../controllers/paymentController');
const { protect, authorize } = require('../middlewares/authMiddleware');

router.route('/')
  .post(protect, authorize('Customer'), processPayment)
  .get(protect, getPayments);

router.route('/loan/:loanId')
  .get(protect, getPaymentsByLoan);

module.exports = router;
