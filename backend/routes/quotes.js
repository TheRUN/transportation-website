const express = require('express');
const router = express.Router();
const {
  createQuote,
  getQuotes,
  getQuote,
  updateQuote,
  deleteQuote
} = require('../controllers/quoteController');
const { protect, authorize } = require('../middleware/auth');
const { quoteValidation, validate } = require('../middleware/validation');

// Public route - Submit quote request
router.post('/', quoteValidation, validate, createQuote);

// Protected admin routes
router.get('/', protect, authorize('admin'), getQuotes);
router.get('/:id', protect, authorize('admin'), getQuote);
router.put('/:id', protect, authorize('admin'), updateQuote);
router.delete('/:id', protect, authorize('admin'), deleteQuote);

module.exports = router;
