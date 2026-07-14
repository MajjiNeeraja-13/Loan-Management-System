const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['PAN', 'Aadhar', 'Photo', 'Salary Slip', 'Bank Statement', 'Other'],
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  verified: {
    type: Boolean,
    default: false,
  }
});

const customerSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true, // The user account linked to this customer profile
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  panNumber: {
    type: String,
    unique: true,
    sparse: true, // allows nulls but keeps uniqueness if present
  },
  aadharNumber: {
    type: String,
    unique: true,
    sparse: true,
  },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
  },
  dateOfBirth: {
    type: Date,
  },
  employmentStatus: {
    type: String,
    enum: ['Salaried', 'Self-Employed', 'Business', 'Unemployed'],
  },
  monthlyIncome: {
    type: Number,
  },
  kycStatus: {
    type: String,
    enum: ['Pending', 'Submitted', 'Verified', 'Rejected'],
    default: 'Pending',
  },
  documents: [documentSchema],
  assignedOfficer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }
}, { timestamps: true });

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
