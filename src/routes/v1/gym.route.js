const express = require('express');
const gymController = require('../../controllers/gym.controller');

const router = express.Router();

router.route('/').post(gymController.createGym).get(gymController.getGyms);

router.route('/:gymId').get(gymController.getGym).patch(gymController.updateGym).delete(gymController.deleteGym);

module.exports = router;
