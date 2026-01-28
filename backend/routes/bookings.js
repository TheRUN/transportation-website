const express = require('express');
const router = express.Router();
const {
  createBooking,
  getBookings,
  getBooking,
  updateBooking,
  deleteBooking
} = require('../controllers/bookingController');
const { protect, authorize } = require('../middleware/auth');
const { bookingValidation, validate } = require('../middleware/validation');

// All booking routes require authentication
router.use(protect);

router.post('/', bookingValidation, validate, createBooking);
router.get('/', getBookings); // Returns user's bookings or all bookings for admin
router.get('/:id', getBooking);
router.put('/:id', updateBooking);
router.delete('/:id', deleteBooking);

module.exports = router;
