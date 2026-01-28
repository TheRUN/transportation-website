const express = require('express');
const router = express.Router();
const {
  createVehicle,
  getVehicles,
  getVehicle,
  updateVehicle,
  deleteVehicle
} = require('../controllers/fleetController');
const { protect, authorize } = require('../middleware/auth');
const { fleetValidation, validate } = require('../middleware/validation');

// Public routes - view fleet
router.get('/', getVehicles);
router.get('/:id', getVehicle);

// Protected admin routes - manage fleet
router.post('/', protect, authorize('admin'), fleetValidation, validate, createVehicle);
router.put('/:id', protect, authorize('admin'), updateVehicle);
router.delete('/:id', protect, authorize('admin'), deleteVehicle);

module.exports = router;
