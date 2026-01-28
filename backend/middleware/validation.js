const { body, validationResult } = require('express-validator');

/**
 * Validation middleware to check for errors
 */
exports.validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      error: 'Validation failed',
      details: errors.array()
    });
  }
  next();
};

/**
 * User registration validation rules
 */
exports.registerValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ max: 50 })
    .withMessage('Name cannot be more than 50 characters'),
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters')
];

/**
 * User login validation rules
 */
exports.loginValidation = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
];

/**
 * Quote validation rules
 */
exports.quoteValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ max: 50 })
    .withMessage('Name cannot be more than 50 characters'),
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),
  body('phone')
    .trim()
    .notEmpty()
    .withMessage('Phone number is required'),
  body('serviceType')
    .notEmpty()
    .withMessage('Service type is required')
    .isIn(['freight', 'logistics', 'warehousing', 'distribution', 'supply-chain', 'other'])
    .withMessage('Invalid service type'),
  body('origin')
    .trim()
    .notEmpty()
    .withMessage('Origin location is required'),
  body('destination')
    .trim()
    .notEmpty()
    .withMessage('Destination location is required'),
  body('message')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Message cannot be more than 500 characters')
];

/**
 * Booking validation rules
 */
exports.bookingValidation = [
  body('customerName')
    .trim()
    .notEmpty()
    .withMessage('Customer name is required'),
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),
  body('phone')
    .trim()
    .notEmpty()
    .withMessage('Phone number is required'),
  body('pickupLocation')
    .trim()
    .notEmpty()
    .withMessage('Pickup location is required'),
  body('dropoffLocation')
    .trim()
    .notEmpty()
    .withMessage('Dropoff location is required'),
  body('vehicleType')
    .notEmpty()
    .withMessage('Vehicle type is required')
    .isIn(['truck', 'van', 'car', 'bus', 'other'])
    .withMessage('Invalid vehicle type'),
  body('scheduledDate')
    .notEmpty()
    .withMessage('Scheduled date is required')
    .isISO8601()
    .withMessage('Please provide a valid date')
    .custom((value) => {
      const scheduledDate = new Date(value);
      const now = new Date();
      if (scheduledDate <= now) {
        throw new Error('Scheduled date must be in the future');
      }
      return true;
    }),
  body('scheduledTime')
    .notEmpty()
    .withMessage('Scheduled time is required'),
  body('passengers')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Passengers must be at least 1'),
  body('specialRequirements')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Special requirements cannot be more than 500 characters')
];

/**
 * Fleet validation rules
 */
exports.fleetValidation = [
  body('vehicleName')
    .trim()
    .notEmpty()
    .withMessage('Vehicle name is required'),
  body('vehicleType')
    .notEmpty()
    .withMessage('Vehicle type is required')
    .isIn(['truck', 'van', 'car', 'bus'])
    .withMessage('Invalid vehicle type'),
  body('capacity')
    .trim()
    .notEmpty()
    .withMessage('Capacity is required'),
  body('model')
    .trim()
    .notEmpty()
    .withMessage('Model is required'),
  body('year')
    .notEmpty()
    .withMessage('Year is required')
    .isInt({ min: 1990, max: new Date().getFullYear() + 1 })
    .withMessage('Year must be between 1990 and next year'),
  body('licensePlate')
    .trim()
    .notEmpty()
    .withMessage('License plate is required')
    .isLength({ min: 3 })
    .withMessage('License plate must be at least 3 characters'),
  body('pricePerHour')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Price per hour must be a positive number'),
  body('pricePerDay')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Price per day must be a positive number')
];
