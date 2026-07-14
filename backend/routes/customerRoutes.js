const express = require('express');
const router = express.Router();
const { 
  getCustomers, 
  getCustomerById, 
  createOrUpdateCustomer, 
  uploadDocument,
  updateKycStatus
} = require('../controllers/customerController');
const { protect, authorize } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');

router.route('/')
  .get(protect, authorize('Super Admin', 'Loan Manager', 'Loan Officer'), getCustomers)
  .post(protect, authorize('Customer'), createOrUpdateCustomer);

router.route('/me')
  .get(protect, authorize('Customer'), async (req, res) => {
    try {
      const Customer = require('../models/Customer');
      const customer = await Customer.findOne({ user: req.user._id });
      if (!customer) {
        return res.status(404).json({ message: 'Customer profile not found' });
      }
      res.json(customer);
    } catch (error) {
      res.status(500).json({ message: 'Server Error' });
    }
  });

router.post('/upload-document', protect, authorize('Customer'), upload.single('document'), uploadDocument);

router.route('/:id')
  .get(protect, getCustomerById);

router.route('/:id/kyc')
  .put(protect, authorize('Super Admin', 'Loan Manager'), updateKycStatus);

module.exports = router;
