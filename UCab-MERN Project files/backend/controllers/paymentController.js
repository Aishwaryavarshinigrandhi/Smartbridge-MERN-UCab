const Payment = require("../models/Payment");
const Ride = require("../models/Ride");

// Make Payment
const makePayment = async (req, res) => {
  try {
    const { rideId, paymentMethod } = req.body;

    const ride = await Ride.findById(rideId);

    if (!ride) {
      return res.status(404).json({
        success: false,
        message: "Ride not found",
      });
    }

    const payment = await Payment.create({
      ride: ride._id,
      user: ride.user,
      amount: ride.fare,
      paymentMethod,
    });

    ride.paymentStatus = "paid";
    await ride.save();

    res.status(201).json({
      success: true,
      message: "Payment Successful",
      payment,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Payment History
const paymentHistory = async (req, res) => {
  try {
    const payments = await Payment.find({
      user: req.user._id,
    }).populate("ride");

    res.status(200).json({
      success: true,
      payments,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  makePayment,
  paymentHistory,
};