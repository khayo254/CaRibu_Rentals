const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
type: {
    type: String,
    required: true,
    enum: ['car', 'truck', 'van', 'electric'],
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  speed: {
    type: Number,
    required: true,
  },
  transmission: {
    type: String,
    required: true,
  },
  seats: {
    type: Number,
    required: true,
  },
  mileage: {
    type: Number,
    required: true,
  },
  pricePerDay: {
    type: Number,
    required: true,
  },
  available: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model('Vehicle', vehicleSchema);