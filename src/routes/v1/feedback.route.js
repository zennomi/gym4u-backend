const express = require('express');
const auth = require('../../middlewares/auth');
const feedbackController = require('../../controllers/feedback.controller');

const router = express.Router();

router.route('/').post(auth('user'), feedbackController.createFeedback).get(feedbackController.getFeedbacks);

router
  .route('/:feedbackId')
  .get(feedbackController.getFeedback)
  .patch(auth('user'), feedbackController.updateFeedback)
  .delete(auth('user'), feedbackController.deleteFeedback);

module.exports = router;
