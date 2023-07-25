const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const bookingsController = require("../controllers/bookings");

router.post("/booking", auth, bookingsController.createBooking);

router.get("/bookings",auth, bookingsController.getBookings);
router.get("/booking-all", bookingsController.getBookings)

module.exports = router;