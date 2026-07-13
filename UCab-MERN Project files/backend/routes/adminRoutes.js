const express = require("express");

const router = express.Router();

const {
  dashboard,
  getUsers,
  getDrivers,
  getRides,
} = require("../controllers/adminController");

const { protect } = require("../middleware/authMiddleware");

router.get("/dashboard", protect, dashboard);

router.get("/users", protect, getUsers);

router.get("/drivers", protect, getDrivers);

router.get("/rides", protect, getRides);

module.exports = router;