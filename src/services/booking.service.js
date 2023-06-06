const httpStatus = require('http-status');
const { Booking, Gym } = require('../models');
const ApiError = require('../utils/ApiError');

const createBooking = async (data) => {
    const gym = await getGymById(gymId);
    if (!gym) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Gym not found');
    }
    return Booking.create(data)
}

const queryBookings = async (filter, options) => {
    return await Booking.paginate(filter, options)
}

const getBookingById = async (id) => {
    return Booking.findById(id)
}

const updateBookingById = async (bookingId, data) => {
    const booking = await getBookingById(bookingId);
    if (!booking) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Booking not found');
    }

    Object.assign(booking, data);
    await Booking.save();
    return booking;
}

const deleteBookingById = async(bookingId) => {
    const booking = await getBookingById(bookingId);
    if (!booking) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Booking not found');
    }

    await booking.remove()
    return booking
}

module.exports = {
    createBooking,
    queryBookings,
    getBookingById,
    updateBookingById,
    deleteBookingById
}