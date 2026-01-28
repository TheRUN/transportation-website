const User = require('../models/User');
const Quote = require('../models/Quote');
const Booking = require('../models/Booking');
const Fleet = require('../models/Fleet');

/**
 * @desc    Get admin dashboard statistics
 * @route   GET /api/admin/dashboard
 * @access  Private/Admin
 */
exports.getDashboard = async (req, res) => {
  try {
    // Get quote statistics
    const totalQuotes = await Quote.countDocuments();
    const pendingQuotes = await Quote.countDocuments({ status: 'pending' });
    const reviewedQuotes = await Quote.countDocuments({ status: 'reviewed' });
    const quotedQuotes = await Quote.countDocuments({ status: 'quoted' });

    // Get booking statistics
    const totalBookings = await Booking.countDocuments();
    const pendingBookings = await Booking.countDocuments({ status: 'pending' });
    const confirmedBookings = await Booking.countDocuments({ status: 'confirmed' });
    const inProgressBookings = await Booking.countDocuments({ status: 'in-progress' });
    const completedBookings = await Booking.countDocuments({ status: 'completed' });
    const cancelledBookings = await Booking.countDocuments({ status: 'cancelled' });

    // Get fleet statistics
    const totalVehicles = await Fleet.countDocuments();
    const availableVehicles = await Fleet.countDocuments({ status: 'available' });
    const inUseVehicles = await Fleet.countDocuments({ status: 'in-use' });
    const maintenanceVehicles = await Fleet.countDocuments({ status: 'maintenance' });

    // Get user statistics
    const totalUsers = await User.countDocuments();
    const adminUsers = await User.countDocuments({ role: 'admin' });
    const regularUsers = await User.countDocuments({ role: 'user' });

    // Get recent activities
    const recentQuotes = await Quote.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('name email serviceType status createdAt');

    const recentBookings = await Booking.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('userId', 'name email')
      .select('customerName vehicleType status scheduledDate createdAt');

    // Calculate revenue (if totalPrice exists on bookings)
    const revenueData = await Booking.aggregate([
      { $match: { status: 'completed', totalPrice: { $exists: true } } },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: '$totalPrice' },
          averageBookingPrice: { $avg: '$totalPrice' }
        }
      }
    ]);

    const revenue = revenueData.length > 0 ? revenueData[0] : { totalRevenue: 0, averageBookingPrice: 0 };

    res.status(200).json({
      success: true,
      data: {
        quotes: {
          total: totalQuotes,
          pending: pendingQuotes,
          reviewed: reviewedQuotes,
          quoted: quotedQuotes
        },
        bookings: {
          total: totalBookings,
          pending: pendingBookings,
          confirmed: confirmedBookings,
          inProgress: inProgressBookings,
          completed: completedBookings,
          cancelled: cancelledBookings
        },
        fleet: {
          total: totalVehicles,
          available: availableVehicles,
          inUse: inUseVehicles,
          maintenance: maintenanceVehicles
        },
        users: {
          total: totalUsers,
          admin: adminUsers,
          regular: regularUsers
        },
        revenue: {
          total: revenue.totalRevenue || 0,
          average: revenue.averageBookingPrice || 0
        },
        recentActivities: {
          quotes: recentQuotes,
          bookings: recentBookings
        }
      }
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error while fetching dashboard data'
    });
  }
};

/**
 * @desc    Get all users
 * @route   GET /api/admin/users
 * @access  Private/Admin
 */
exports.getUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Build query
    const query = {};
    if (req.query.role) {
      query.role = req.query.role;
    }

    const users = await User.find(query)
      .select('-password')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await User.countDocuments(query);

    res.status(200).json({
      success: true,
      data: users,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error while fetching users'
    });
  }
};

/**
 * @desc    Get all quotes (with pagination)
 * @route   GET /api/admin/quotes
 * @access  Private/Admin
 */
exports.getQuotes = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
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
    console.error('Get admin quotes error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error while fetching quotes'
    });
  }
};

/**
 * @desc    Get all bookings (with pagination and filters)
 * @route   GET /api/admin/bookings
 * @access  Private/Admin
 */
exports.getBookings = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    // Build query
    const query = {};
    if (req.query.status) {
      query.status = req.query.status;
    }
    if (req.query.vehicleType) {
      query.vehicleType = req.query.vehicleType;
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
    console.error('Get admin bookings error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error while fetching bookings'
    });
  }
};
