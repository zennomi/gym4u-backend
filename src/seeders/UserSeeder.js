// eslint-disable-next-line import/no-unresolved, import/no-extraneous-dependencies
const faker = require('faker');
const { User } = require('../models');
const bcrypt = require('bcryptjs');

const getRandomElement = (array) => {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};

const getRandomAvatar = (str) => {
  return `https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_${str.split('').map(i => i.charCodeAt(0)).reduce((a, b) => a + b, 0) % 25 + 1}.jpg`
}

const userSeeder = async () => {
  const defaultPassword = await bcrypt.hash("12345678", 8);

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
      password: defaultPassword,
      avatar: getRandomAvatar(faker.name.findName()),
    };
    users.push(admin);
    for (let i = 0; i < numberOfManager; i += 1) {
      const user = {
        role: 'manager',
        email: faker.internet.email(),
        phone: faker.phone.phoneNumber('0##########'),
        sex: getRandomElement(sex),
        name: faker.name.findName(),
        password: defaultPassword,
        avatar: getRandomAvatar(faker.name.findName()),
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
        password: defaultPassword,
        avatar: getRandomAvatar(faker.name.findName()),
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
