const express = require("express");

const router = express.Router();

const {
  makePayment,
  paymentHistory,
} = require("../controllers/paymentController");

const { protect } = require("../middleware/authMiddleware");

router.post("/pay", protect, makePayment);

router.get("/history", protect, paymentHistory);

module.exports = router;