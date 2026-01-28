const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  customerName: {
    type: String,
    required: [true, 'Please provide customer name'],
    trim: true
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
  pickupLocation: {
    type: String,
    required: [true, 'Please specify pickup location'],
    trim: true
  },
  dropoffLocation: {
    type: String,
    required: [true, 'Please specify dropoff location'],
    trim: true
  },
  vehicleType: {
    type: String,
    required: [true, 'Please specify vehicle type'],
    enum: ['truck', 'van', 'car', 'bus', 'other']
  },
  scheduledDate: {
    type: Date,
    required: [true, 'Please specify scheduled date'],
    validate: {
      validator: function(value) {
        // Ensure date is in the future
        return value > new Date();
      },
      message: 'Scheduled date must be in the future'
    }
  },
  scheduledTime: {
    type: String,
    required: [true, 'Please specify scheduled time']
  },
  passengers: {
    type: Number,
    default: 1,
    min: [1, 'Must have at least 1 passenger']
  },
  specialRequirements: {
    type: String,
    trim: true,
    maxlength: [500, 'Special requirements cannot be more than 500 characters']
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'in-progress', 'completed', 'cancelled'],
    default: 'pending'
  },
  totalPrice: {
    type: Number,
    min: 0
  }
}, {
  timestamps: true
});

// Indexes for efficient querying
bookingSchema.index({ userId: 1, createdAt: -1 });
bookingSchema.index({ status: 1 });
bookingSchema.index({ scheduledDate: 1 });

module.exports = mongoose.model('Booking', bookingSchema);
