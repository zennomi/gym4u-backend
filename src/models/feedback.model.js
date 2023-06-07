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
        }

    },
    {
        timestamps: true,
    }
);

// add plugin that converts mongoose to json
feedbackSchema.plugin(toJSON);
feedbackSchema.plugin(paginate);

const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback