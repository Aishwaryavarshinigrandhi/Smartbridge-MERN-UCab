const Ride = require("../models/Ride");
const Driver = require("../models/Driver");

const getDistance = (pickup, destination) => {
  const picker = pickup.trim().length + destination.trim().length;
  const common = pickup
    .split("")
    .filter((char) => destination.includes(char)).length;
  const distance = Math.max(3, Math.min(28, Math.floor((picker - common) / 2) + 3));
  return distance;
};

const getFare = (distance, vehicleType) => {
  const rates = {
    Bike: 12,
    Auto: 15,
    Car: 20,
  };
  const rate = rates[vehicleType] || 20;
  return Math.round(35 + rate * distance);
};

// Book Ride
const bookRide = async (req, res) => {
  try {
    const { pickup, destination, vehicleType } = req.body;

    if (!pickup || !destination || !vehicleType) {
      return res.status(400).json({
        success: false,
        message: "Pickup, destination, and vehicle type are required",
      });
    }

    const distance = getDistance(pickup, destination);
    const fare = getFare(distance, vehicleType);

    const ride = await Ride.create({
      user: req.user._id,
      pickup,
      destination,
      vehicleType,
      distance,
      fare,
    });

    res.status(201).json({
      success: true,
      message: "Ride Booked Successfully",
      ride,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
const getAllRides = async (req, res) => {

  try {

    const rides = await Ride.find().sort({ createdAt: -1 });

    res.status(200).json({

      success: true,

      rides,

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: "Server Error",

    });

  }

};
// User Ride History
const getMyRides = async (req, res) => {
  try {
    const rides = await Ride.find({ user: req.user._id })
      .populate("driver")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      rides,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Driver Accept Ride
const acceptRide = async (req, res) => {
  try {
    const ride = await Ride.findById(req.params.id);

    if (!ride) {
      return res.status(404).json({
        success: false,
        message: "Ride not found",
      });
    }

    const driver = await Driver.findOne({ user: req.user._id });

    if (!driver) {
      return res.status(404).json({
        success: false,
        message: "Driver not found",
      });
    }

    ride.driver = driver._id;
    ride.status = "accepted";

    await ride.save();

    res.status(200).json({
      success: true,
      message: "Ride Accepted",
      ride,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Start Ride
const startRide = async (req, res) => {
  try {
    const ride = await Ride.findByIdAndUpdate(
      req.params.id,
      { status: "started" },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Ride Started",
      ride,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Complete Ride
const completeRide = async (req, res) => {
  try {
    const ride = await Ride.findByIdAndUpdate(
      req.params.id,
      {
        status: "completed",
        paymentStatus: "paid",
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Ride Completed",
      ride,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  bookRide,
  getMyRides,
  getAllRides,
  acceptRide,
  startRide,
  completeRide,
};