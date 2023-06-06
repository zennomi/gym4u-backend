const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const bookingSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            validate(value) {
                if(!value.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
                    throw new Error('Invalid Email')
                }
            }
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
        roomID: {
            type: String,
            required: true,
            trim: true
        },
        price: {
            type: Number,
            required: true,
        },
        from: {
            type: String,
            required: true,
            trim: true,
        },
        to: {
            type: String,
            required: true,
            trim: true,
        }

    },
    {
        timestamps: true,
    }
);

// add plugin that converts mongoose to json
userSchema.plugin(toJSON);
userSchema.plugin(paginate);

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking