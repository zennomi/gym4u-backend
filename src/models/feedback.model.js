const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const feedbackSchema = mongoose.Schema(
    {
        user_id: {
            type: String,
            required: true,
            trim: true
        },
        gym_id: {
            type: String,
            required: true,
            trim: true
        },
        content: {
            type: String,
            required: true,
            trim: true
        },
        start: {
            type: Number,
        }

    },
    {
        timestamps: true,
    }
);

// add plugin that converts mongoose to json
userSchema.plugin(toJSON);
userSchema.plugin(paginate);

const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback