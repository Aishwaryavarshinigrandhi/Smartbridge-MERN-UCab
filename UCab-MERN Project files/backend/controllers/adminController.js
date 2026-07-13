const User = require("../models/User");
const Driver = require("../models/Driver");
const Ride = require("../models/Ride");
const Payment = require("../models/Payment");

// Dashboard
const dashboard = async (req, res) => {
  try {
    const users = await User.countDocuments();
    const drivers = await Driver.countDocuments();
    const rides = await Ride.countDocuments();
    const payments = await Payment.countDocuments();

    res.status(200).json({
      success: true,
      data: {
        users,
        drivers,
        rides,
        payments,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Get All Users
const getUsers = async (req, res) => {
  const users = await User.find().select("-password");

  res.status(200).json({
    success: true,
    users,
  });
};

// Get All Drivers
const getDrivers = async (req, res) => {
  const drivers = await Driver.find().populate("user");

  res.status(200).json({
    success: true,
    drivers,
  });
};

// Get All Rides
const getRides = async (req, res) => {
  const rides = await Ride.find()
    .populate("user")
    .populate("driver");

  res.status(200).json({
    success: true,
    rides,
  });
};

module.exports = {
  dashboard,
  getUsers,
  getDrivers,
  getRides,
};