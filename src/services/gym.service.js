const httpStatus = require('http-status');
const { Gym } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a gym
 * @param {Object} gymBody
 * @returns {Promise<Gym>}
 */
const createGym = async (gymBody) => {
  if (await Gym.isPhoneTaken(gymBody.phone)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Phone already taken');
  }
  return Gym.create(gymBody);
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
  return Gym.findById(id);
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

module.exports = {
  createGym,
  queryGyms,
  getGymById,
  updateGymById,
  deleteGymById,
};
