const express = require('express');
const router = express.Router();
const Booking = require('../models/booking.model');
const Vehicle = require('../models/vehicle.model');
const auth = require('../middleware/auth.middleware');

// Create a booking
router.post('/', auth, async (req, res) => {
  const { vehicleId, location, startDate, endDate } = req.body;
  try {
    const vehicle = await Vehicle.findById(vehicleId);
    if (!vehicle || !vehicle.available) {
      return res.status(400).json({ message: 'Vehicle not available' });
    }
    const days = (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24);
    if (days <= 0) {
      return res.status(400).json({ message: 'Invalid date range' });
    }
    const totalPrice = days * vehicle.pricePerDay;
    const booking = new Booking({
      user: req.user.id,
      vehicle: vehicleId,
      location,
      startDate,
      endDate,
      totalPrice,
    });
    await booking.save();
    vehicle.available = false;
    await vehicle.save();
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user bookings
router.get('/', auth, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).populate('vehicle');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;