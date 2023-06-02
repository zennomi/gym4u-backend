const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { gymService } = require('../services');

const createGym = catchAsync(async (req, res) => {
  const gym = await gymService.createGym(req.body);
  res.status(httpStatus.CREATED).send(gym);
});

const getGyms = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'lng', 'lat', 'distance', 'facilityTags']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await gymService.queryGyms(filter, options);
  res.send(result);
});

const getGym = catchAsync(async (req, res) => {
  const gym = await gymService.getGymById(req.params.gymId);
  if (!gym) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Gym not found');
  }
  res.send(gym);
});

const updateGym = catchAsync(async (req, res) => {
  const gym = await gymService.updateGymById(req.params.gymId, req.body);
  res.send(gym);
});

const deleteGym = catchAsync(async (req, res) => {
  await gymService.deleteGymById(req.params.gymId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createGym,
  getGyms,
  getGym,
  updateGym,
  deleteGym,
};
