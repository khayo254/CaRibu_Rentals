const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const Vehicle = require('./models/vehicle.model');

dotenv.config();

const vehicles = [
  {
    type: 'car',
    name: 'Sports Car',
    image: 'assets/select-1.png',
    speed: 200,
    transmission: '6 speed',
    seats: 5,
    mileage: 15,
    pricePerDay: 225,
  },
  {
    type: 'car',
    name: 'Sedan',
    image: 'assets/select-2.png',
    speed: 215,
    transmission: '6 speed',
    seats: 5,
    mileage: 16,
    pricePerDay: 200,
  },
  {
    type: 'car',
    name: 'Coupe',
    image: 'assets/select-3.png',
    speed: 306,
    transmission: '6 speed',
    seats: 5,
    mileage: 12,
    pricePerDay: 300,
  },
  {
    type: 'car',
    name: 'Convertible',
    image: 'assets/select-4.png',
    speed: 350,
    transmission: '6 speed',
    seats: 2,
    mileage: 8,
    pricePerDay: 400,
  },
  {
    type: 'car',
    name: 'Luxury Sedan',
    image: 'assets/select-5.png',
    speed: 254,
    transmission: '6 speed',
    seats: 5,
    mileage: 10,
    pricePerDay: 250,
  },
];

const seedDB = async () => {
  await connectDB();
  await Vehicle.deleteMany({});
  await Vehicle.insertMany(vehicles);
  console.log('Database seeded');
  process.exit();
};

seedDB();