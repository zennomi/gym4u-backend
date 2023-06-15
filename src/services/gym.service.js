const httpStatus = require('http-status');
const { Gym } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a gym
 * @param {Object} gymBody
 * @returns {Promise<Gym>}
 */
const createGym = async (userId, gymBody) => {
  if (await Gym.isPhoneTaken(gymBody.phone)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Phone already taken');
  }
  return Gym.create({ ...gymBody, user: userId });
};

/**
 * Query for gyms
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryGyms = async (filter, options) => {
  const gyms = await Gym.paginate(filter, options);
  return gyms;
};

/**
 * Get gym by id
 * @param {ObjectId} id
 * @returns {Promise<Gym>}
 */
const getGymById = async (id) => {
  return Gym.findById(id).populate('user');
};

/**
 * Update gym by id
 * @param {ObjectId} gymId
 * @param {Object} updateBody
 * @returns {Promise<Gym>}
 */
const updateGymById = async (gymId, updateBody) => {
  const gym = await getGymById(gymId);
  if (!gym) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Gym not found');
  }
  if (updateBody.phone && (await Gym.isPhoneTaken(updateBody.phone, gymId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Phone already taken');
  }
  Object.assign(gym, updateBody);
  await gym.save();
  return gym;
};

/**
 * Delete gym by id
 * @param {ObjectId} gymId
 * @returns {Promise<Gym>}
 */
const deleteGymById = async (gymId) => {
  const gym = await getGymById(gymId);
  if (!gym) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Gym not found');
  }
  await gym.remove();
  return gym;
};

const uploadImageGym = async (gymId, image) => {
  const gym = await getGymById(gymId);
  if (!gym) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Gym not found');
  }
  gym.images.push(image);
  await gym.save();
  return gym;
};

const deleteImageGym = async (gymId, image) => {
  const gym = await getGymById(gymId);
  if (!gym) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Gym not found');
  }
  if (gym.images.length <= 1) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Gym must have at least one image');
  }
  gym.images.pull(image);
  await gym.save();
  return gym;
};

const deleteVideoGym = async (gymId) => {
  const gym = await getGymById(gymId);
  if (!gym) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Gym not found');
  }
  if (!gym.video) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Gym must have a video');
  }
  gym.video = undefined;
  await gym.save();
  return gym;
};

module.exports = {
  createGym,
  queryGyms,
  getGymById,
  updateGymById,
  deleteGymById,
  uploadImageGym,
  deleteImageGym,
  deleteVideoGym,
};
