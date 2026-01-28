const mongoose = require('mongoose');

const quoteSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    trim: true,
    maxlength: [50, 'Name cannot be more than 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email'
    ]
  },
  phone: {
    type: String,
    required: [true, 'Please provide a phone number'],
    trim: true
  },
  company: {
    type: String,
    trim: true
  },
  serviceType: {
    type: String,
    required: [true, 'Please specify service type'],
    enum: ['freight', 'logistics', 'warehousing', 'distribution', 'supply-chain', 'other']
  },
  origin: {
    type: String,
    required: [true, 'Please specify origin location'],
    trim: true
  },
  destination: {
    type: String,
    required: [true, 'Please specify destination location'],
    trim: true
  },
  cargoDetails: {
    type: String,
    trim: true
  },
  message: {
    type: String,
    trim: true,
    maxlength: [500, 'Message cannot be more than 500 characters']
  },
  status: {
    type: String,
    enum: ['pending', 'reviewed', 'quoted'],
    default: 'pending'
  }
}, {
  timestamps: true
});

// Index for efficient querying
quoteSchema.index({ status: 1, createdAt: -1 });
quoteSchema.index({ email: 1 });

module.exports = mongoose.model('Quote', quoteSchema);
