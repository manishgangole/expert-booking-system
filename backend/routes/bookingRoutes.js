const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const bookingController = require("../controllers/bookingController");

// POST booking
router.post("/", bookingController.createBooking);

// GET bookings (by expertId OR email)
router.get("/", async (req, res) => {
  try {
    if (req.query.expertId) {
      const bookings = await Booking.find({
        expert: req.query.expertId
      });
      return res.json(bookings);
    }

    if (req.query.email) {
      const bookings = await Booking.find({
        email: req.query.email
      });
      return res.json(bookings);
    }

    // If no query, return all bookings
    const bookings = await Booking.find();
    res.json(bookings);

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});
// PATCH booking status
router.patch("/:id/status", async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});
module.exports = router;