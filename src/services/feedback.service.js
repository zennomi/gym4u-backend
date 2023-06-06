const httpStatus = require('http-status');
const { Gym, Feedback } = require('../models');
const ApiError = require('../utils/ApiError');

const createFeedback = async (data) => {
    const gym = await getGymById(data.gymId);
    if (!gym) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Gym not found');
    }
    return Feedback.create(data)
}

const queryFeedbacks = async (filter, options) => {
    return await Feedback.paginate(filter, options)
}

const getFeedBack = async (id) => {
    return Feedback.findById(id)
}

const updateFeedback = async (feedbackId, data) => {
    const feedback = await getFeedBack(feedbackId);
    if (!feedback) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Feedback not found');
    }

    Object.assign(feedback, data);
    await Feedback.save();
    return feedback;
}

const deleteFeedback = async(feedbackId) => {
    const feedback = await getFeedBack(feedbackId);
    if (!feedback) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Booking not found');
    }

    await feedback.remove()
    return feedback
}

module.exports = {
    createFeedback,
    queryFeedbacks,
    getFeedBack,
    updateFeedback,
    deleteFeedback
}