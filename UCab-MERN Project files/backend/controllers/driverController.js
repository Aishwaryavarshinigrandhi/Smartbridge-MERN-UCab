const Driver = require("../models/Driver");
const User = require("../models/User");

// Register Driver
const registerDriver = async (req, res) => {
  try {
    const { vehicleName, vehicleNumber, licenseNumber } = req.body;

    if (!vehicleName || !vehicleNumber || !licenseNumber) {
      return res.status(400).json({
        success: false,
        message: "Please fill all fields",
      });
    }

    const existingDriver = await Driver.findOne({
      user: req.user._id,
    });

    if (existingDriver) {
      return res.status(400).json({
        success: false,
        message: "Driver profile already exists",
      });
    }

    const vehicleExists = await Driver.findOne({
      vehicleNumber,
    });

    if (vehicleExists) {
      return res.status(400).json({
        success: false,
        message: "Vehicle number already registered",
      });
    }

    const licenseExists = await Driver.findOne({
      licenseNumber,
    });

    if (licenseExists) {
      return res.status(400).json({
        success: false,
        message: "License already registered",
      });
    }

    const driver = await Driver.create({
      user: req.user._id,
      vehicleName,
      vehicleNumber,
      licenseNumber,
    });

    await User.findByIdAndUpdate(req.user._id, {
      role: "driver",
    });

    res.status(201).json({
      success: true,
      message: "Driver registered successfully",
      driver,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Get Driver Profile
const getDriverProfile = async (req, res) => {
  try {
    const driver = await Driver.findOne({
      user: req.user._id,
    }).populate("user", "-password");

    if (!driver) {
      return res.status(404).json({
        success: false,
        message: "Driver profile not found",
      });
    }

    res.status(200).json({
      success: true,
      driver,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Update Availability
const updateAvailability = async (req, res) => {
  try {
    const { availability } = req.body;

    const driver = await Driver.findOneAndUpdate(
      { user: req.user._id },
      { availability },
      { new: true }
    );

    if (!driver) {
      return res.status(404).json({
        success: false,
        message: "Driver profile not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Availability updated",
      driver,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  registerDriver,
  getDriverProfile,
  updateAvailability,
};