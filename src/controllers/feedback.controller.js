const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { feedbackService } = require('../services')

const createFeedback = catchAsync(async (req, res)=> {
    const booking = await feedbackService.createFeedback(req.body);
    res.status(httpStatus.CREATED).send(booking)
});

const getFeedbacks = catchAsync(async (req, res) => {
    const filter = pick(req.query, ['user', 'gym']);
    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    const result = await feedbackService.queryFeedbacks(filter, options);
    res.send(result)
})

const getFeedback = catchAsync(async (req, res) => {
    const feedback = await feedbackService.getFeedBack(req.params.feedbackId);
    if (!booking) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Booking not found');
    }
    res.send(feedback);
  });
  
  const updateFeedback = catchAsync(async (req, res) => {
    const feedback = await feedbackService.updateFeedback(req.params.bookingId, req.body);
    res.send(feedback);
  });
  
  const deleteFeedback = catchAsync(async (req, res) => {
    await feedbackService.deleteFeedback(req.params.gymId);
    res.status(httpStatus.NO_CONTENT).send();
  });

  module.exports = {
    createFeedback,
    getFeedbacks,
    getFeedback,
    updateFeedback,
    deleteFeedback
  }