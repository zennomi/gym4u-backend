// eslint-disable-next-line import/no-unresolved, import/no-extraneous-dependencies
const faker = require('faker');
const { Gym, Booking } = require('../models');

const getRandomAndRemove = (array) => {
  const randomIndex = Math.floor(Math.random() * array.length);
  const randomElement = array[randomIndex];
  array.splice(randomIndex, 1);
  return randomElement;
};

const getRandomNumber = (min, max) => {
  const numberMin = Math.ceil(min);
  const numberMax = Math.floor(max);
  return Math.floor(Math.random() * (numberMax - numberMin + 1)) + numberMin;
};

const bookingSeeder = async () => {
  const bookings = [];
  const gyms = await Gym.find({}, { _id: 1, price: 1, createdAt: 1 });
  const numberOfGyms = gyms.length;

  try {
    for (let i = 0; i < numberOfGyms; i += 1) {
      const gym = getRandomAndRemove(gyms);
      for (let j = 0; j < getRandomNumber(3, 10); j += 1) {
        const rangeStart = new Date(gym.createdAt.getTime() + 1 * 24 * 60 * 60 * 1000);
        const rangeEnd = new Date(gym.createdAt.getTime() + 7 * 24 * 60 * 60 * 1000);
        const startTime = faker.date.between(rangeStart, rangeEnd);
        const endTime = new Date(startTime.getTime() + getRandomNumber(1, 5) * 60 * 60 * 1000);
        const booking = {
          name: faker.name.findName(),
          gym: gym._id,
          email: faker.internet.email(),
          phone: faker.phone.phoneNumber('0##########'),
          from: startTime,
          to: endTime,
        };
        bookings.push(booking);
      }
    }
    await Booking.insertMany(bookings);
    console.log('Booking seed data created successfully');
  } catch (err) {
    console.error('Error creating booking seed data:', err);
  }
};

module.exports = bookingSeeder;
