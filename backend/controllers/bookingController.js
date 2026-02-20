const Booking = require("../models/Booking");

exports.createBooking = async (req, res) => {
  try {
    const booking = await Booking.create(req.body);

    // Emit real-time update
    const io = req.app.get("io");
    io.to(req.body.expert).emit("slotBooked", {
      date: req.body.date,
      timeSlot: req.body.timeSlot
    });

    res.status(201).json(booking);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        message: "Slot already booked"
      });
    }
    res.status(500).json({ message: "Server Error" });
  }
};