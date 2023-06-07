const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const gymSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    images: {
      type: [String],
      default:
        'https://png.pngtree.com/png-vector/20220617/ourlarge/pngtree-default-placeholder-fitness-trainer-in-a-t-shirt-png-image_5121003.png',
    },
    video: {
      type: String,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: { type: String, enum: ['Point'], required: true },
      coordinates: { type: [Number], required: true },
    },
    phone: {
      type: String,
      unique: true,
      required: true,
      validate(value) {
        if (!value.match(/^\d+$/)) {
          throw new Error('Invalid phone number');
        }
      },
    },
    description: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    facilityTags: {
      type: [String],
      required: true,
    },
    averageRating: {
      type: Number,
      default: 0,
    },
    feedbackCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

gymSchema.index({ location: '2dsphere' });

// add plugin that converts mongoose to json
gymSchema.plugin(toJSON);
gymSchema.plugin(paginate);

/**
 * Check if phone is taken
 * @param {string} phone - The gym's phone
 * @param {ObjectId} [excludeUserId] - The id of the gym to be excluded
 * @returns {Promise<boolean>}
 */
gymSchema.statics.isPhoneTaken = async function (phone, excludeUserId) {
  const gym = await this.findOne({ phone, _id: { $ne: excludeUserId } });
  return !!gym;
};

/**
 * @typedef Gym
 */
const Gym = mongoose.model('Gym', gymSchema);

module.exports = Gym;
