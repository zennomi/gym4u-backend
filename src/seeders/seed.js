const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userSeeder = require('./UserSeeder');
const gymSeeder = require('./GymSeeder');
const feedbackSeeder = require('./FeedbackSeeder');

dotenv.config();

mongoose.connect(process.env.MONGODB_URL, {
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
