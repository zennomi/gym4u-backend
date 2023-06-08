const mongoose = require('mongoose');
const validator = require('validator');
const { toJSON, paginate } = require('./plugins');

const bookingSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid email');
        }
      },
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
    gym: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Gym',
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    from: {
      type: Date,
      required: true,
      trim: true,
    },
    to: {
      type: Date,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
bookingSchema.plugin(toJSON);
bookingSchema.plugin(paginate);

bookingSchema.index({ user: 1, gym: 1 }, { unique: true });

const Booking = mongoose.model('Booking', bookingSchema);
Booking.createIndexes();

module.exports = Booking;
