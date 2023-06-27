// eslint-disable-next-line import/no-unresolved, import/no-extraneous-dependencies
const faker = require('faker');
const { User } = require('../models');

const getRandomElement = (array) => {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};

const userSeeder = async () => {
  const users = [];
  const numberOfManager = 18;
  const numberOfUser = 25;
  const sex = ['男性', '女性', '他'];
  try {
    const admin = {
      role: 'admin',
      email: 'bruh@gym4u.vn',
      phone: '0123456789',
      sex: '男性',
      name: 'Bruh',
      password: '12345678',
    };
    users.push(admin);
    for (let i = 0; i < numberOfManager; i += 1) {
      const user = {
        role: 'manager',
        email: faker.internet.email(),
        phone: faker.phone.phoneNumber('0##########'),
        sex: getRandomElement(sex),
        name: faker.name.findName(),
        password: '12345678',
      };
      users.push(user);
    }
    for (let i = 0; i < numberOfUser; i += 1) {
      const user = {
        role: 'user',
        email: faker.internet.email(),
        phone: faker.phone.phoneNumber('0##########'),
        sex: getRandomElement(sex),
        name: faker.name.findName(),
        password: '12345678',
      };
      users.push(user);
    }
    await User.insertMany(users);
    console.log('User seed data created successfully');
  } catch (err) {
    console.error('Error creating user seed data:', err);
  }
};

module.exports = userSeeder;
