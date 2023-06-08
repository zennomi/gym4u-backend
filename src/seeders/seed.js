const mongoose = require('mongoose');
const userSeeder = require('./UserSeeder');
const gymSeeder = require('./GymSeeder');
const feedbackSeeder = require('./FeedbackSeeder');

mongoose.connect('mongodb://localhost:27017/gym4u', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function seedAndExit() {
  try {
    await userSeeder();
    await gymSeeder();
    await feedbackSeeder();

    console.log('Data seeding completed.');

    process.exit(0);
  } catch (error) {
    console.error('Data seeding failed:', error);
    process.exit(1);
  }
}

seedAndExit();
