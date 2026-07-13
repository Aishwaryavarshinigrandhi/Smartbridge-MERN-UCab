const express = require("express");

const router = express.Router();

const {
  bookRide,
  getMyRides,
  getAllRides,
  acceptRide,
  startRide,
  completeRide,
} = require("../controllers/rideController");

const { protect } = require("../middleware/authMiddleware");

router.post("/book", protect, bookRide);

router.get("/myrides", protect, getMyRides);

router.put("/accept/:id", protect, acceptRide);

router.put("/start/:id", protect, startRide);

router.put("/complete/:id", protect, completeRide);

router.get("/all", protect, getAllRides);

module.exports = router;