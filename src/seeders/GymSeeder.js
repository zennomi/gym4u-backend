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

const getRandomElements = (array, count) => {
  const shuffled = array.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const getRandomElement = (array) => {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};

const getRandomAndRemove = (array) => {
  const randomIndex = Math.floor(Math.random() * array.length);
  const randomElement = array[randomIndex];
  array.splice(randomIndex, 1);
  return randomElement;
};

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const tags = ['マッサージ', 'プール', 'ピラティス'];
const images = [
  'https://img.freepik.com/free-photo/woman-doing-squats-smith-machine_7502-9063.jpg?w=900&t=st=1686389456~exp=1686390056~hmac=3cf0308086cc38b63a657f11e5152e1c109839fe780e49f6f400981d3107d4e5',
  'https://img.freepik.com/free-photo/man-weightlifter-doing-leg-presses-with-his-trainer-sports-couple-is-working-out-gym_613910-2600.jpg?w=740&t=st=1686390243~exp=1686390843~hmac=844a3258b716ec586345a0eb9d8b855c4d021a73c7e3b74d79229df42c743bdf',
  'https://img.freepik.com/premium-photo/beautiful-asian-woman-play-fitness-gymthailand-girl-has-slim-bodytime-exercisepeople-love-heathstretching-body-before-workoutsport-woman-warm-up-bodypush-up-with-dumbell_44277-16810.jpg?w=900',
  'https://img.freepik.com/free-photo/young-pretty-woman-working-out-gym-doing-bicep-curls-with-help-her-personal-trainer_496169-2688.jpg?w=900&t=st=1686390741~exp=1686391341~hmac=f1a853cf9a4b8c63287db8479e0fb25f7be1e3e8456227bf8e39221b8f20b8c9',
  'https://img.freepik.com/premium-photo/handsome-young-muscle-man-working-with-dumbbell-with-trainer_74324-106.jpg?w=826',
  'https://img.freepik.com/free-photo/beautiful-sporty-muscular-woman-working-out-with-two-dumbbells_231208-3319.jpg?w=900&t=st=1686389822~exp=1686390422~hmac=e36e2ed2b484a46b599a5a0eb457cb7c2570a01bb1bd7e0447386264e4d3a970',
  'https://img.freepik.com/premium-photo/young-woman-doing-exercise-with-dumbbell-modern-gym_35150-2873.jpg?w=900',
  'https://img.freepik.com/free-photo/brunette-woman-doing-battle-rope-training_7502-4793.jpg?w=900&t=st=1686389533~exp=1686390133~hmac=60c9dfe973c41328e74c4b1e650a14017ed7f78dfa768a2f46a494e625e4b208',
  'https://img.freepik.com/free-photo/portrait-young-healthy-woman-running-treadmill-she-smile-during-workout-gym-healthy-lifestyle-concept-copy-space-vertical-image_1150-46963.jpg?w=900&t=st=1686389539~exp=1686390139~hmac=026911defdcf17e846e0703b7000dfb4beacce81a2bddfbcd284d1bf895537ae',
  'https://img.freepik.com/free-photo/female-bodybuilder-training-with-dumbbells_7502-4794.jpg?w=900&t=st=1686389544~exp=1686390144~hmac=e2a1438f744f1e2d6bf7417e88756819aaace34375cc5a1275369e7e4e6a7445',
  'https://img.freepik.com/premium-photo/muscular-coach-doing-seated-bicep-curl_317809-8445.jpg?w=900',
  'https://img.freepik.com/free-photo/young-sexy-woman-wearing-sportswear-sweat-proof-fabric-smartwatch-walking-treadmill-warm-up-before-run-workout-modern-gym-copy-space_1150-46973.jpg?w=900&t=st=1686389598~exp=1686390198~hmac=b561f14dd1847ca8e4363cdc5b459b1b6ebf7d5b545ade4bdeba8ca5d6e133ec',
];
const videos = [
  'https://www.youtube.com/watch?v=PCZ2JHaPvZ4',
  'https://www.youtube.com/watch?v=k_LZ9lJ4mcs',
  'https://www.youtube.com/watch?v=YmFW-RRMsnY',
  'https://www.youtube.com/watch?v=FWmqQNQ9tWE',
  'https://www.youtube.com/watch?v=ZjEjlPmac8I',
  'https://www.youtube.com/watch?v=7PkN9Jqmxc0',
  'https://www.youtube.com/watch?v=MAnqh3wuYJE',
  'https://www.youtube.com/watch?v=l1Pdv1TNcOA',
  'https://www.youtube.com/watch?v=SwLURNzCtvA',
  'https://www.youtube.com/watch?v=c-qTks5Zk3s',
];
const imagesPool = [
  'https://1.bp.blogspot.com/-2Hf5dHC11wM/Xd5l7or8vRI/AAAAAAAAM_Q/WCEgrSfKF10gqSAYJgqQRpVNaHiET2_7ACLcBGAsYHQ/s1600/hayvnnet-loat-sao-nu-phim-nguoi-lon-so-huu-body-hoan-hao-thieu-dot-anh-nhin-p-2%2B%252812%2529.jpg',
  'https://scanlover.com/assets/images/17406-4KbAH5tKQHdqfBT8.jpeg',
  'https://res.cloudinary.com/wintersonata/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1688226293/352228838_565686822391013_366255031585716886_n_k6o16s.jpg?_s=public-apps',
  'https://img.freepik.com/premium-photo/sexy-mature-woman-bikini-walking-pool-view-from_746318-38.jpg?w=900',
  'https://img.freepik.com/premium-photo/sexy-young-woman-swimming-pool_363766-271.jpg?w=2000',
  'https://img.freepik.com/premium-photo/young-beautiful-woman-splashing-water-swimming-pool_35076-567.jpg?w=900',
  'https://img.freepik.com/premium-photo/two-young-women-friends-enjoy-swimming-pool_35076-2244.jpg?w=900',
  'https://img.freepik.com/premium-photo/couple-pool_52137-4702.jpg?w=900',
  'https://img.freepik.com/premium-photo/sexy-woman-in-bikini-swimming-in-the-pool-top-view_46370-4271.jpg?w=900',
  'https://img.freepik.com/premium-photo/woman-posing-by-the-pool-summer-vacation-sexy-woman-in-swimwear-bikini-relaxing-in-swimming-pool-spa_265223-83113.jpg?w=900',
  'https://e0.pxfuel.com/wallpapers/216/524/desktop-wallpaper-marie-kai-marie-sexy-japanese-model-asian-japan-hot-cute-beautiful-woman-kawaii-idol-kai-lovely-female.jpg',
];

const gymSeeder = async () => {
  const users = await User.find({ role: 'manager' }, { _id: 1 });
  const gyms = [];
  const numberOfGyms = users.length;
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
        images: getRandomArray(images),
        address,
        location: {
          type: 'Point',
          coordinates: [longitude, latitude],
        },
        phone: faker.phone.phoneNumber('0##########'),
        price: faker.commerce.price(10000, 50000, 0),
        description: faker.lorem.sentences(3),
        facilityTags: getRandomArray(tags),
        video: getRandomElement(videos),
      };
      if (gym.address !== undefined) gyms.push(gym);
    }
    await Gym.insertMany(gyms);
    const gymsPool = await Gym.find({ facilityTags: { $in: ['プール'] } }, { _id: 1 });
    for (let i = 0; i < gymsPool.length; i += 1) {
      const imagePool = getRandomElements(imagesPool, 3);
      // eslint-disable-next-line no-await-in-loop
      await Gym.updateOne({ _id: gymsPool[i]._id }, { $push: { images: { $each: imagePool } } });
    }

    console.log('Gym seed data created successfully');
  } catch (err) {
    console.error('Error creating gym seed data:', err);
  }
};

module.exports = gymSeeder;
