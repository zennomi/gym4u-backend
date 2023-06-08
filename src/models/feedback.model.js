const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const feedbackSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    gym: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Gym',
      required: true,
    },
    content: {
      type: String,
      trim: true,
    },
    rating: {
      min: 1,
      max: 5,
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
feedbackSchema.plugin(toJSON);
feedbackSchema.plugin(paginate);

feedbackSchema.index({ user: 1, gym: 1 }, { unique: true });

feedbackSchema.post('save', async function () {
  const Gym = mongoose.model('Gym');
  const gymId = this.gym;

  const [result] = await Gym.aggregate([
    { $match: { _id: gymId } },
    {
      $lookup: {
        from: 'feedbacks',
        localField: '_id',
        foreignField: 'gym',
        as: 'feedbacks',
      },
    },
    {
      $addFields: {
        averageRating: {
          $avg: '$feedbacks.rating',
        },
        feedbackCount: {
          $size: '$feedbacks',
        },
      },
    },
  ]);

  await Gym.updateOne({ _id: gymId }, result);
});

const Feedback = mongoose.model('Feedback', feedbackSchema);
Feedback.createIndexes();

module.exports = Feedback;
