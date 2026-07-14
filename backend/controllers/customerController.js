const Customer = require('../models/Customer');

// @desc    Get all customers with pagination, sort, search
// @route   GET /api/customers
// @access  Private (Admin, Manager, Officer)
const getCustomers = async (req, res, next) => {
  try {
    const pageSize = Number(req.query.limit) || 10;
    const page = Number(req.query.page) || 1;
    const search = req.query.search || '';

    const query = {
      $or: [
        { phone: { $regex: search, $options: 'i' } },
        { panNumber: { $regex: search, $options: 'i' } },
      ]
    };

    // If Loan Officer, only show their assigned customers
    if (req.user.role === 'Loan Officer') {
      query.assignedOfficer = req.user._id;
    }

    const count = await Customer.countDocuments(query);
    const customers = await Customer.find(query)
      .populate('user', 'name email')
      .populate('assignedOfficer', 'name')
      .sort({ createdAt: -1 })
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    res.json({
      customers,
      page,
      pages: Math.ceil(count / pageSize),
      total: count
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get customer by ID
// @route   GET /api/customers/:id
// @access  Private
const getCustomerById = async (req, res, next) => {
  try {
    const customer = await Customer.findById(req.params.id)
      .populate('user', 'name email')
      .populate('assignedOfficer', 'name');

    if (!customer) {
      res.status(404);
      throw new Error('Customer not found');
    }

    // Security check: Officer can only view their own assigned customers
    if (req.user.role === 'Loan Officer' && customer.assignedOfficer?.toString() !== req.user._id.toString()) {
      res.status(403);
      throw new Error('Not authorized to view this customer');
    }

    // Customer can only view their own profile
    if (req.user.role === 'Customer' && customer.user._id.toString() !== req.user._id.toString()) {
      res.status(403);
      throw new Error('Not authorized to view this customer');
    }

    res.json(customer);
  } catch (error) {
    next(error);
  }
};

// @desc    Create or update customer profile
// @route   POST /api/customers
// @access  Private (Customer)
const createOrUpdateCustomer = async (req, res, next) => {
  try {
    const { phone, panNumber, aadharNumber, address, dateOfBirth, employmentStatus, monthlyIncome } = req.body;

    let customer = await Customer.findOne({ user: req.user._id });

    if (customer) {
      // Update
      customer.phone = phone || customer.phone;
      customer.panNumber = panNumber || customer.panNumber;
      customer.aadharNumber = aadharNumber || customer.aadharNumber;
      customer.address = address || customer.address;
      customer.dateOfBirth = dateOfBirth || customer.dateOfBirth;
      customer.employmentStatus = employmentStatus || customer.employmentStatus;
      customer.monthlyIncome = monthlyIncome || customer.monthlyIncome;
      customer.kycStatus = 'Submitted';

      const updatedCustomer = await customer.save();
      return res.json(updatedCustomer);
    }

    // Create
    customer = await Customer.create({
      user: req.user._id,
      phone,
      panNumber,
      aadharNumber,
      address,
      dateOfBirth,
      employmentStatus,
      monthlyIncome,
      kycStatus: 'Submitted'
    });

    res.status(201).json(customer);
  } catch (error) {
    next(error);
  }
};

// @desc    Upload KYC Document
// @route   POST /api/customers/upload-document
// @access  Private (Customer)
const uploadDocument = async (req, res, next) => {
  try {
    if (!req.file) {
      res.status(400);
      throw new Error('No file uploaded');
    }

    const { type } = req.body;
    if (!type) {
      res.status(400);
      throw new Error('Document type is required');
    }

    const customer = await Customer.findOne({ user: req.user._id });
    if (!customer) {
      res.status(404);
      throw new Error('Customer profile not found');
    }

    const newDoc = {
      type,
      url: `/uploads/${req.file.filename}`, // In production, this would be a Cloudinary URL
      verified: false
    };

    customer.documents.push(newDoc);
    await customer.save();

    res.status(201).json({ message: 'Document uploaded successfully', document: newDoc });
  } catch (error) {
    next(error);
  }
};

// @desc    Update KYC Status (Admin/Manager)
// @route   PUT /api/customers/:id/kyc
// @access  Private (Admin, Manager)
const updateKycStatus = async (req, res, next) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      res.status(404);
      throw new Error('Customer not found');
    }
    customer.kycStatus = req.body.status;
    const updatedCustomer = await customer.save();
    res.json(updatedCustomer);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCustomers,
  getCustomerById,
  createOrUpdateCustomer,
  uploadDocument,
  updateKycStatus
};
