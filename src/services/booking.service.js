const httpStatus = require('http-status');
const { Booking } = require('../models');
const { getGymById } = require('./gym.service');
const ApiError = require('../utils/ApiError');

/**
 * Create a booking
 * @param {Object} bookingBody
 * @returns {Promise<Booking>}
 */
const createBooking = async (data) => {
  const gym = await getGymById(data.gym);
  if (!gym) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Gym not found');
  }
  return Booking.create(data);
};

/**
 * Query for booking
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryBookings = async (filter, options) => {
  const booking = await Booking.paginate(filter, options);
  return booking;
};

/**
 * Get booking by id
 * @param {ObjectId} id
 * @returns {Promise<Booking>}
 */
const getBookingById = async (id) => {
  return Booking.findById(id).populate('gym');
};

/**
 * Update booking by id
 * @param {ObjectId} bookingId
 * @param {Object} updateBody
 * @returns {Promise<Gym>}
 */
const updateBookingById = async (bookingId, data) => {
  const booking = await getBookingById(bookingId);
  if (!booking) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Booking not found');
  }

  Object.assign(booking, data);
  await booking.save();
  return booking;
};

/**
 * Delete booking by id
 * @param {ObjectId} bookingId
 * @returns {Promise<Booking>}
 */
const deleteBookingById = async (bookingId) => {
  const booking = await getBookingById(bookingId);
  if (!booking) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Booking not found');
  }
  await booking.remove();
  return booking;
};

module.exports = {
  createBooking,
  queryBookings,
  getBookingById,
  updateBookingById,
  deleteBookingById,
};
