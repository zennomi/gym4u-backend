const httpStatus = require('http-status');
const { Feedback } = require('../models');
const { getGymById } = require('./gym.service');
const ApiError = require('../utils/ApiError');

/**
 * Create a feedback
 * @param {Object} feedbackBody
 * @returns {Promise<Feedback>}
 */
const createFeedback = async (userId, data) => {
  const gym = await getGymById(data.gym);
  if (!gym) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Gym not found');
  }
  return Feedback.create({ ...data, user: userId });
};

/**
 * Query for feedback
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryFeedbacks = async (filter, options) => {
  const feedback = await Feedback.paginate(filter, options);
  return feedback;
};

/**
 * Get feedback by id
 * @param {ObjectId} id
 * @returns {Promise<Feedback>}
 */
const getFeedBack = async (id) => {
  return Feedback.findById(id);
};

/**
 * Update feedback by id
 * @param {ObjectId} feedbackId
 * @param {Object} updateBody
 * @returns {Promise<Gym>}
 */
const updateFeedback = async (feedbackId, data) => {
  const feedback = await getFeedBack(feedbackId);
  if (!feedback) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Feedback not found');
  }

  Object.assign(feedback, data);
  await Feedback.save();
  return feedback;
};

/**
 * Delete feedback by id
 * @param {ObjectId} feedbackId
 * @returns {Promise<Feedback>}
 */
const deleteFeedback = async (feedbackId) => {
  const feedback = await getFeedBack(feedbackId);
  if (!feedback) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Feedback not found');
  }
  await feedback.remove();
  return feedback;
};

module.exports = {
  createFeedback,
  queryFeedbacks,
  getFeedBack,
  updateFeedback,
  deleteFeedback,
};
