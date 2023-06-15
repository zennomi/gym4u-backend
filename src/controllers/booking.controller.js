const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { bookingService } = require('../services');

const createBooking = catchAsync(async (req, res) => {
  const booking = await bookingService.createBooking(req.body);
  res.status(httpStatus.CREATED).send(booking);
});

const getBookingsByGymId = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['gym']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await bookingService.queryBookings(filter, options);
  res.send(result);
});

const getBooking = catchAsync(async (req, res) => {
  const booking = await bookingService.getBookingById(req.params.bookingId);
  if (!booking) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Booking not found');
  }
  res.send(booking);
});

const updateBooking = catchAsync(async (req, res) => {
  const booking = await bookingService.updateBookingById(req.params.bookingId, req.body);
  res.send(booking);
});

const deleteBooking = catchAsync(async (req, res) => {
  await bookingService.deleteBookingById(req.params.bookingId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createBooking,
  getBookingsByGymId,
  getBooking,
  updateBooking,
  deleteBooking,
};
