const express = require("express");
const router = express.Router();

const {
  processpayment,
  sendStripeApi,
} = require("../controlles/paymentController");
const auth = require("../middlewares/auth");

router.post("/payment/process", auth, processpayment);

router.get("/stripeapi", auth, sendStripeApi);

module.exports = router;
