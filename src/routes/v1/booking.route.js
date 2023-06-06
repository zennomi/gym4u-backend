const express = require('express');
const bookingController = require('../../controllers/booking.controller');

const router = express.Router();

router.route('/').post(bookingController.createBooking).get(bookingController.getBookings);

router.route('/:gymId').get(bookingController.getBooking).patch(bookingController.updateBooking).delete(bookingController.deleteBooking);

module.exports = router;