const mongoose = require('mongoose');
const gymSeeder = require('./GymSeeder');

mongoose.connect('mongodb://localhost:27017/gym4u', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function seedAndExit() {
  try {
    await gymSeeder();

    console.log('Data seeding completed.');

    process.exit(0);
  } catch (error) {
    console.error('Data seeding failed:', error);
    process.exit(1);
  }
}

seedAndExit();
