const express = require('express');
const router = express.Router();
const {
  getDashboard,
  getUsers,
  getQuotes,
  getBookings
} = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/auth');

// All admin routes require authentication and admin role
router.use(protect);
router.use(authorize('admin'));

router.get('/dashboard', getDashboard);
router.get('/users', getUsers);
router.get('/quotes', getQuotes);
router.get('/bookings', getBookings);

module.exports = router;
