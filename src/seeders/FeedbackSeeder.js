// eslint-disable-next-line import/no-unresolved, import/no-extraneous-dependencies
const faker = require('faker');
const { User, Feedback } = require('../models');
const { Gym } = require('../models');

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

const feedbackSeeder = async () => {
  const gyms = await Gym.find({}, { _id: 1 });
  const numberOfGyms = gyms.length;

  try {
    for (let i = 0; i < numberOfGyms; i += 1) {
      const gym = getRandomAndRemove(gyms);
      // eslint-disable-next-line no-await-in-loop
      const users = await User.find({ role: { $in: ['manager', 'user'] } }, { _id: 1 });
      const numberOfUsers = users.length;
      for (let j = 0; j < getRandomNumber(3, numberOfUsers - 2); j += 1) {
        const user = getRandomAndRemove(users);
        // eslint-disable-next-line no-await-in-loop
        const checkExistUser = await Gym.findOne({ user: user._id, _id: gym._id });
        if (!checkExistUser) {
          Feedback.create({
            user: user._id,
            gym: gym._id,
            content: faker.lorem.paragraph(getRandomNumber(1, 3)),
            rating: getRandomNumber(1, 5),
          });
        }
      }
    }
    console.log('Feedback seed data created successfully');
  } catch (err) {
    console.error('Error creating feedback seed data:', err);
  }
};

module.exports = feedbackSeeder;
