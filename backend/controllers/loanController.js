const Loan = require('../models/Loan');
const Customer = require('../models/Customer');
const { calculateEMI } = require('../utils/emiEngine');

// @desc    Apply for a new loan
// @route   POST /api/loans
// @access  Private (Customer)
const applyForLoan = async (req, res, next) => {
  try {
    const { type, principalAmount, tenureMonths } = req.body;

    // Check if customer profile exists and KYC is verified
    const customer = await Customer.findOne({ user: req.user._id });
    
    if (!customer) {
      res.status(404);
      throw new Error('Please complete your KYC profile first');
    }
    
    if (customer.kycStatus !== 'Verified') {
      res.status(400);
      throw new Error('Your KYC must be verified before applying for a loan');
    }

    // Determine interest rate based on loan type (In real world, this comes from a master table)
    let interestRate = 10;
    if (type === 'Home Loan') interestRate = 8.5;
    if (type === 'Auto Loan') interestRate = 9.5;
    if (type === 'Personal Loan') interestRate = 12.5;
    if (type === 'Education Loan') interestRate = 7.5;

    // Calculate EMI using our engine
    const emiAmount = calculateEMI(principalAmount, interestRate, tenureMonths);

    const loan = await Loan.create({
      customer: customer._id,
      type,
      principalAmount,
      interestRate,
      tenureMonths,
      emiAmount
    });

    res.status(201).json(loan);
  } catch (error) {
    next(error);
  }
};

// @desc    Get all loans (or my loans if Customer)
// @route   GET /api/loans
// @access  Private
const getLoans = async (req, res, next) => {
  try {
    let query = {};

    // If Customer, only fetch their loans
    if (req.user.role === 'Customer') {
      const customer = await Customer.findOne({ user: req.user._id });
      if (!customer) return res.json([]);
      query.customer = customer._id;
    }

    const loans = await Loan.find(query)
      .populate({
        path: 'customer',
        populate: { path: 'user', select: 'name email' }
      })
      .sort({ createdAt: -1 });

    res.json(loans);
  } catch (error) {
    next(error);
  }
};

// @desc    Update Loan Status (Approve/Reject)
// @route   PUT /api/loans/:id/status
// @access  Private (Loan Manager, Super Admin)
const updateLoanStatus = async (req, res, next) => {
  try {
    const { status, remarks } = req.body;
    
    const loan = await Loan.findById(req.params.id);
    if (!loan) {
      res.status(404);
      throw new Error('Loan not found');
    }

    loan.status = status;
    loan.remarks = remarks;
    loan.approvedBy = req.user._id;

    const updatedLoan = await loan.save();
    res.json(updatedLoan);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  applyForLoan,
  getLoans,
  updateLoanStatus
};
