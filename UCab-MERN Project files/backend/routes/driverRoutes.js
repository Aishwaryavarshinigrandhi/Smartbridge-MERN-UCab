const express = require("express");

const router = express.Router();

const {
  registerDriver,
  getDriverProfile,
  updateAvailability,
} = require("../controllers/driverController");

const { protect } = require("../middleware/authMiddleware");

router.post("/register", protect, registerDriver);

router.get("/profile", protect, getDriverProfile);

router.put("/availability", protect, updateAvailability);

module.exports = router;