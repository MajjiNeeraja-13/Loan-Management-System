const express = require('express');
const router = express.Router();
const { applyForLoan, getLoans, updateLoanStatus } = require('../controllers/loanController');
const { protect, authorize } = require('../middlewares/authMiddleware');

router.route('/')
  .post(protect, authorize('Customer'), applyForLoan)
  .get(protect, getLoans);

router.route('/:id/status')
  .put(protect, authorize('Super Admin', 'Loan Manager'), updateLoanStatus);

module.exports = router;
