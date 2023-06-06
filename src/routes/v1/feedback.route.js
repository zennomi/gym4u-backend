const express = require('express');
const feedbackController = require('../../controllers/feedback.controller');

const router = express.Router();

router.route('/').post(feedbackController.createFeedback).get(feedbackController.getFeedbacks);

router.route('/:feedbackId').get(feedbackController.getFeedback).patch(feedbackController.updateFeedback).delete(feedbackController.deleteFeedback);

module.exports = router;