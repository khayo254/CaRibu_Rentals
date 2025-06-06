const express = require('express');
const router = express.Router();
const Vehicle = require('../models/vehicle.model');

// Get all vehicles or filter by type
router.get('/', async (req, res) => {
  try {
    const { type } = req.query;
    const query = type ? { type } : {};
    const vehicles = await Vehicle.find(query);
    res.json(vehicles);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Add a vehicle (admin only, for demo purposes)
router.post('/', async (req, res) => {
  const { type, name, image, speed, transmission, seats, mileage, pricePerDay } = req.body;
  try {
    const vehicle = new Vehicle({ type, name, image, speed, transmission, seats, mileage, pricePerDay });
    await vehicle.save();
    res.status(201).json(vehicle);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;