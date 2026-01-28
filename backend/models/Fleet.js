const mongoose = require('mongoose');

const fleetSchema = new mongoose.Schema({
  vehicleName: {
    type: String,
    required: [true, 'Please provide vehicle name'],
    trim: true
  },
  vehicleType: {
    type: String,
    required: [true, 'Please specify vehicle type'],
    enum: ['truck', 'van', 'car', 'bus']
  },
  capacity: {
    type: String,
    required: [true, 'Please specify capacity'],
    trim: true
  },
  model: {
    type: String,
    required: [true, 'Please provide model'],
    trim: true
  },
  year: {
    type: Number,
    required: [true, 'Please provide year'],
    min: [1990, 'Year must be 1990 or later'],
    max: [new Date().getFullYear() + 1, 'Year cannot be in the future']
  },
  licensePlate: {
    type: String,
    required: [true, 'Please provide license plate'],
    unique: true,
    trim: true,
    uppercase: true
  },
  status: {
    type: String,
    enum: ['available', 'in-use', 'maintenance'],
    default: 'available'
  },
  features: {
    type: [String],
    default: []
  },
  imageUrl: {
    type: String,
    trim: true
  },
  pricePerHour: {
    type: Number,
    min: [0, 'Price cannot be negative']
  },
  pricePerDay: {
    type: Number,
    min: [0, 'Price cannot be negative']
  }
}, {
  timestamps: true
});

// Indexes for efficient querying
fleetSchema.index({ vehicleType: 1 });
fleetSchema.index({ status: 1 });
fleetSchema.index({ licensePlate: 1 }, { unique: true });

module.exports = mongoose.model('Fleet', fleetSchema);
