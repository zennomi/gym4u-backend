const express = require('express');
const bookingController = require('../../controllers/booking.controller');
const auth = require('../../middlewares/auth');

const router = express.Router();

router.route('/').post(bookingController.createBooking).get(auth('user'), bookingController.getBookingsByGymId);

router
  .route('/:bookingId')
  .get(bookingController.getBooking)
  .patch(bookingController.updateBooking)
  .delete(bookingController.deleteBooking);

module.exports = router;
