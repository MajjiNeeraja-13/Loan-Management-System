const mongoose = require('mongoose');

const loanSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true,
  },
  type: {
    type: String,
    enum: ['Personal Loan', 'Home Loan', 'Auto Loan', 'Education Loan'],
    required: true,
  },
  principalAmount: {
    type: Number,
    required: true,
    min: 1000,
  },
  interestRate: {
    type: Number, // Annual Interest Rate in %
    required: true,
  },
  tenureMonths: {
    type: Number,
    required: true,
    min: 1,
  },
  emiAmount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected', 'Active', 'Closed'],
    default: 'Pending',
  },
  remarks: {
    type: String, // Manager remarks on approval/rejection
  },
  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }
}, { timestamps: true });

const Loan = mongoose.model('Loan', loanSchema);
module.exports = Loan;
