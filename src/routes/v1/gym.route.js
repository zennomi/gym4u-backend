const express = require('express');
const auth = require('../../middlewares/auth');
const gymController = require('../../controllers/gym.controller');

const router = express.Router();

router.route('/').post(auth('user'), gymController.createGym).get(gymController.getGyms);

router
  .route('/:gymId')
  .get(gymController.getGym)
  .patch(auth('user'), gymController.updateGym)
  .delete(auth('user'), gymController.deleteGym);

router.route('/:gymId/image').post(auth('user'), gymController.uploadImage).delete(auth('user'), gymController.deleteImage);

router.route('/:gymId/video').delete(auth('user'), gymController.deleteVideo);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Gym
 *   description: Gym management and retrieval
 */

/**
 * @swagger
 * /gym:
 *   post:
 *     summary: Create a gym
 *     description: Only admins can create other gyms.
 *     tags: [Gym]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - address
 *               - location
 *               - phone
 *               - price
 *               - facilityTags
 *             properties:
 *               name:
 *                 type: string
 *               phone:
 *                 type: string
 *                 description: must be unique
 *               address:
 *                 type: string
 *                 trim: true
 *               price:
 *                  type: number
 *               location: {
 *                 type: { type: enum, enum: ['Point']},
 *                 coordinates: { type: Array },
 *               }
 *               facilityTags:
 *                  type: Array
 *             example:
 *               name: fake name
 *               address: fake address
 *               location: {
 *                 type: Point,
 *                 coordinates: [105.84713, 21.030653]
 *               }
 *               phone: "0187654321"
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Gym'
 *       "400":
 *         $ref: '#/components/responses/DuplicatePhone'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all gyms
 *     description: Only admins can retrieve all gyms.
 *     tags: [Gym]
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *       - in: query
 *         name: lng
 *         schema:
 *           type: number
 *       - in: query
 *         name: lat
 *         schema:
 *           type: number
 *       - in: query
 *         name: distance
 *         schema:
 *           type: number
 *       - in: query
 *         name: facilityTags
 *         schema:
 *           type: Array
 *         description: example ["Pool", "Massage"]
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: sort by query in the form of field:desc/asc (ex. distance:asc,name:desc)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 10
 *         description: Maximum number of users
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Gym'
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 totalPages:
 *                   type: integer
 *                   example: 1
 *                 totalResults:
 *                   type: integer
 *                   example: 1
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /gym/{id}:
 *   get:
 *     summary: Get a gym
 *     description: Logged in users can fetch only their own user information. Only admins can fetch other gyms.
 *     tags: [Gym]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Gym id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Gym'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a gym
 *     description: Logged in users can only update their own information. Only admins can update other gyms.
 *     tags: [Gym]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: gym id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               phone:
 *                 type: string
 *                 description: must be unique
 *               address:
 *                 type: string
 *                 trim: true
 *               price:
 *                  type: number
 *               location: {
 *                 type: { type: enum, enum: ['Point']},
 *                 coordinates: { type: Array },
 *               }
 *               facilityTags:
 *                  type: Array
 *             example:
 *               name: fake name
 *               address: fake address
 *               location: {
 *                 type: Point,
 *                 coordinates: [105.84713, 21.030653]
 *               }
 *               phone: "0187654321"
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Gym'
 *       "400":
 *         $ref: '#/components/responses/DuplicatePhone'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete a gym
 *     description: Logged in users can delete only themselves. Only admins can delete other gyms.
 *     tags: [Gym]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Gym id
 *     responses:
 *       "200":
 *         description: No content
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
