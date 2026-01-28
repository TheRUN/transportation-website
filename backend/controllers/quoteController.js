const Quote = require('../models/Quote');
const { sendEmail, emailTemplates } = require('../config/email');
const mongoose = require('mongoose');

/**
 * @desc    Submit a quote request
 * @route   POST /api/quotes
 * @access  Public
 */
exports.createQuote = async (req, res) => {
  try {
    const quote = await Quote.create(req.body);

    // Send confirmation email to customer (async)
    sendEmail({
      to: quote.email,
      subject: 'Quote Request Received - Transportation Company',
      html: emailTemplates.quoteConfirmation(quote.name, quote)
    }).catch(err => console.error('Email error:', err.message));

    // Send notification to admin (async)
    if (process.env.ADMIN_EMAIL) {
      sendEmail({
        to: process.env.ADMIN_EMAIL,
        subject: 'New Quote Request',
        html: emailTemplates.quoteNotificationAdmin(quote)
      }).catch(err => console.error('Admin email error:', err.message));
    }

    res.status(201).json({
      success: true,
      data: quote,
      message: 'Quote request submitted successfully'
    });
  } catch (error) {
    console.error('Create quote error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error while creating quote'
    });
  }
};

/**
 * @desc    Get all quotes with pagination
 * @route   GET /api/quotes
 * @access  Private/Admin
 */
exports.getQuotes = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Build query
    const query = {};
    if (req.query.status) {
      query.status = req.query.status;
    }

    const quotes = await Quote.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Quote.countDocuments(query);

    res.status(200).json({
      success: true,
      data: quotes,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get quotes error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error while fetching quotes'
    });
  }
};

/**
 * @desc    Get single quote by ID
 * @route   GET /api/quotes/:id
 * @access  Private/Admin
 */
exports.getQuote = async (req, res) => {
  try {
    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid quote ID format'
      });
    }

    const quote = await Quote.findById(req.params.id);

    if (!quote) {
      return res.status(404).json({
        success: false,
        error: 'Quote not found'
      });
    }

    res.status(200).json({
      success: true,
      data: quote
    });
  } catch (error) {
    console.error('Get quote error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error while fetching quote'
    });
  }
};

/**
 * @desc    Update quote (status)
 * @route   PUT /api/quotes/:id
 * @access  Private/Admin
 */
exports.updateQuote = async (req, res) => {
  try {
    let quote = await Quote.findById(req.params.id);

    if (!quote) {
      return res.status(404).json({
        success: false,
        error: 'Quote not found'
      });
    }

    quote = await Quote.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    res.status(200).json({
      success: true,
      data: quote,
      message: 'Quote updated successfully'
    });
  } catch (error) {
    console.error('Update quote error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error while updating quote'
    });
  }
};

/**
 * @desc    Delete quote
 * @route   DELETE /api/quotes/:id
 * @access  Private/Admin
 */
exports.deleteQuote = async (req, res) => {
  try {
    const quote = await Quote.findById(req.params.id);

    if (!quote) {
      return res.status(404).json({
        success: false,
        error: 'Quote not found'
      });
    }

    await quote.deleteOne();

    res.status(200).json({
      success: true,
      data: {},
      message: 'Quote deleted successfully'
    });
  } catch (error) {
    console.error('Delete quote error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error while deleting quote'
    });
  }
};
