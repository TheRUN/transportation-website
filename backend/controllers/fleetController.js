const Fleet = require('../models/Fleet');

/**
 * @desc    Add new vehicle to fleet
 * @route   POST /api/fleet
 * @access  Private/Admin
 */
exports.createVehicle = async (req, res) => {
  try {
    const vehicle = await Fleet.create(req.body);

    res.status(201).json({
      success: true,
      data: vehicle,
      message: 'Vehicle added to fleet successfully'
    });
  } catch (error) {
    console.error('Create vehicle error:', error);
    
    // Handle duplicate license plate error
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        error: 'Vehicle with this license plate already exists'
      });
    }

    res.status(500).json({
      success: false,
      error: 'Server error while adding vehicle'
    });
  }
};

/**
 * @desc    Get all vehicles with filters
 * @route   GET /api/fleet
 * @access  Public
 */
exports.getVehicles = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Build query
    const query = {};

    // Filter by vehicle type
    if (req.query.vehicleType) {
      query.vehicleType = req.query.vehicleType;
    }

    // Filter by status
    if (req.query.status) {
      query.status = req.query.status;
    }

    // Filter by availability (default to available for public)
    if (req.query.available === 'true') {
      query.status = 'available';
    }

    // Search by vehicle name or model
    if (req.query.search) {
      query.$or = [
        { vehicleName: { $regex: req.query.search, $options: 'i' } },
        { model: { $regex: req.query.search, $options: 'i' } }
      ];
    }

    const vehicles = await Fleet.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Fleet.countDocuments(query);

    res.status(200).json({
      success: true,
      data: vehicles,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get vehicles error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error while fetching vehicles'
    });
  }
};

/**
 * @desc    Get single vehicle by ID
 * @route   GET /api/fleet/:id
 * @access  Public
 */
exports.getVehicle = async (req, res) => {
  try {
    const vehicle = await Fleet.findById(req.params.id);

    if (!vehicle) {
      return res.status(404).json({
        success: false,
        error: 'Vehicle not found'
      });
    }

    res.status(200).json({
      success: true,
      data: vehicle
    });
  } catch (error) {
    console.error('Get vehicle error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error while fetching vehicle'
    });
  }
};

/**
 * @desc    Update vehicle
 * @route   PUT /api/fleet/:id
 * @access  Private/Admin
 */
exports.updateVehicle = async (req, res) => {
  try {
    let vehicle = await Fleet.findById(req.params.id);

    if (!vehicle) {
      return res.status(404).json({
        success: false,
        error: 'Vehicle not found'
      });
    }

    vehicle = await Fleet.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    res.status(200).json({
      success: true,
      data: vehicle,
      message: 'Vehicle updated successfully'
    });
  } catch (error) {
    console.error('Update vehicle error:', error);
    
    // Handle duplicate license plate error
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        error: 'Vehicle with this license plate already exists'
      });
    }

    res.status(500).json({
      success: false,
      error: 'Server error while updating vehicle'
    });
  }
};

/**
 * @desc    Delete vehicle
 * @route   DELETE /api/fleet/:id
 * @access  Private/Admin
 */
exports.deleteVehicle = async (req, res) => {
  try {
    const vehicle = await Fleet.findById(req.params.id);

    if (!vehicle) {
      return res.status(404).json({
        success: false,
        error: 'Vehicle not found'
      });
    }

    await vehicle.deleteOne();

    res.status(200).json({
      success: true,
      data: {},
      message: 'Vehicle removed from fleet successfully'
    });
  } catch (error) {
    console.error('Delete vehicle error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error while deleting vehicle'
    });
  }
};
