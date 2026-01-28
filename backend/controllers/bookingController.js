const Booking = require('../models/Booking');
const { sendEmail, emailTemplates } = require('../config/email');
const mongoose = require('mongoose');

/**
 * @desc    Create new booking
 * @route   POST /api/bookings
 * @access  Private
 */
exports.createBooking = async (req, res) => {
  try {
    // Add userId to booking data
    const bookingData = {
      ...req.body,
      userId: req.user._id
    };

    const booking = await Booking.create(bookingData);

    // Send confirmation email (async)
    sendEmail({
      to: booking.email,
      subject: 'Booking Confirmation - Transportation Company',
      html: emailTemplates.bookingConfirmation(booking.customerName, booking)
    }).catch(err => console.error('Email error:', err.message));

    res.status(201).json({
      success: true,
      data: booking,
      message: 'Booking created successfully'
    });
  } catch (error) {
    console.error('Create booking error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error while creating booking'
    });
  }
};

/**
 * @desc    Get all bookings (admin) or user's bookings
 * @route   GET /api/bookings
 * @access  Private
 */
exports.getBookings = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Build query
    let query = {};

    // If not admin, only show user's bookings
    if (req.user.role !== 'admin') {
      query.userId = req.user._id;
    } else {
      // Admin can filter by status
      if (req.query.status) {
        query.status = req.query.status;
      }
      // Admin can filter by userId
      if (req.query.userId) {
        query.userId = req.query.userId;
      }
    }

    const bookings = await Booking.find(query)
      .populate('userId', 'name email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Booking.countDocuments(query);

    res.status(200).json({
      success: true,
      data: bookings,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get bookings error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error while fetching bookings'
    });
  }
};

/**
 * @desc    Get single booking by ID
 * @route   GET /api/bookings/:id
 * @access  Private
 */
exports.getBooking = async (req, res) => {
  try {
    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid booking ID format'
      });
    }

    const booking = await Booking.findById(req.params.id)
      .populate('userId', 'name email');

    if (!booking) {
      return res.status(404).json({
        success: false,
        error: 'Booking not found'
      });
    }

    // Check if user owns this booking or is admin
    if (booking.userId._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to access this booking'
      });
    }

    res.status(200).json({
      success: true,
      data: booking
    });
  } catch (error) {
    console.error('Get booking error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error while fetching booking'
    });
  }
};

/**
 * @desc    Update booking
 * @route   PUT /api/bookings/:id
 * @access  Private
 */
exports.updateBooking = async (req, res) => {
  try {
    let booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        error: 'Booking not found'
      });
    }

    // Check if user owns this booking or is admin
    if (booking.userId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to update this booking'
      });
    }

    const oldStatus = booking.status;
    booking = await Booking.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    // Send status update email if status changed
    if (req.body.status && req.body.status !== oldStatus) {
      sendEmail({
        to: booking.email,
        subject: 'Booking Status Update - Transportation Company',
        html: emailTemplates.bookingStatusUpdate(booking.customerName, booking, booking.status)
      }).catch(err => console.error('Email error:', err.message));
    }

    res.status(200).json({
      success: true,
      data: booking,
      message: 'Booking updated successfully'
    });
  } catch (error) {
    console.error('Update booking error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error while updating booking'
    });
  }
};

/**
 * @desc    Cancel/Delete booking
 * @route   DELETE /api/bookings/:id
 * @access  Private
 */
exports.deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        error: 'Booking not found'
      });
    }

    // Check if user owns this booking or is admin
    if (booking.userId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to delete this booking'
      });
    }

    await booking.deleteOne();

    res.status(200).json({
      success: true,
      data: {},
      message: 'Booking cancelled successfully'
    });
  } catch (error) {
    console.error('Delete booking error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error while deleting booking'
    });
  }
};
