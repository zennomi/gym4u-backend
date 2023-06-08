const axios = require('axios');
// eslint-disable-next-line import/no-unresolved, import/no-extraneous-dependencies
const faker = require('faker');
const { Gym } = require('../models');
const { User } = require('../models');

const getAddressFromLngLat = async (lng, lat) => {
  const options = {
    method: 'GET',
    url: 'https://trueway-geocoding.p.rapidapi.com/ReverseGeocode',
    params: {
      location: `${lat},${lng}`,
      language: 'vn',
    },
    headers: {
      'X-RapidAPI-Key': 'd4973227abmsh0f7397a92769216p1ac5cdjsn6881c59b82da',
      'X-RapidAPI-Host': 'trueway-geocoding.p.rapidapi.com',
    },
  };

  try {
    const response = await axios.request(options);
    const address = response.data.results.length > 1 ? response.data.results[1].address : response.data.results[0].address;
    return address;
  } catch (error) {
    console.error(error);
  }
};

const getRandomArray = (arr) => {
  const randomIndex = Math.floor(Math.random() * arr.length);
  const randomElement = arr.slice(randomIndex);
  return randomElement;
};

const getRandomAndRemove = (array) => {
  const randomIndex = Math.floor(Math.random() * array.length);
  const randomElement = array[randomIndex];
  array.splice(randomIndex, 1);
  return randomElement;
};

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const gymSeeder = async () => {
  const users = await User.find({ role: 'manager' }, { _id: 1 });
  const gyms = [];
  const numberOfGyms = users.length;
  const tags = ['マッサージ', 'プール', 'ピラティス'];
  try {
    for (let i = 0; i < numberOfGyms; i += 1) {
      const latitude = parseFloat(faker.address.latitude(21.0013862, 21.0016036));
      const longitude = parseFloat(faker.address.longitude(105.8408742, 105.8420578));
      // eslint-disable-next-line no-await-in-loop
      const address = await getAddressFromLngLat(longitude, latitude);
      // eslint-disable-next-line no-await-in-loop
      await delay(1000);
      const gym = {
        user: getRandomAndRemove(users),
        name: `${faker.company.companyName(1).split(' - ')[0]} Gym`,
        address,
        location: {
          type: 'Point',
          coordinates: [longitude, latitude],
        },
        phone: faker.phone.phoneNumber('0##########'),
        price: faker.commerce.price(10000, 50000, 0),
        description: faker.lorem.sentences(3),
        facilityTags: getRandomArray(tags),
      };
      if (gym.address !== undefined) gyms.push(gym);
    }
    await Gym.insertMany(gyms);
    console.log('Gym seed data created successfully');
  } catch (err) {
    console.error('Error creating gym seed data:', err);
  }
};

module.exports = gymSeeder;
