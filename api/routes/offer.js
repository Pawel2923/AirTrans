const express = require("express");
const router = express.Router();
const offer = require("../services/offer");

/**
 * @openapi
 * /offer:
 *  get:
 *   description: Get all offers
 *   responses:
 *    200:
 *     description: Successfully fetched data
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *         data:
 *          type: object
 *          properties:
 *           cars:
 *            type: array
 *            items:
 *             $ref: '#/components/schemas/car'
 *           parkingInfo:
 *            type: array
 *            items:
 *             $ref: '#/components/schemas/parking-info'
 *         message:
 *          type: string
 *    404:
 *     description: No offers found
 *    500:
 *     description: Internal server error
 */
router.get("/", async function (req, res, next) {
	try {
		const { offset, limit } = req.query;

		const { data, meta, message } = await offer.get(offset, limit);
		res.status(200).json({ data, meta, message });
	} catch (err) {
		next(err);
	}
});

module.exports = router;

/**
 * @openapi
 * components:
 *  schemas:
 *   car:
 *    type: object
 *    properties:
 *     brand:
 *      type: string
 *     model:
 *      type: string
 *     production_year:
 *      type: integer
 *     transmission_type:
 *      type: string
 *     fuel_type:
 *      type: string
 *     price_per_day:
 *      type: number
 *     path_to_img:
 *      type: string
 *   parking-info:
 *    type: object
 *    properties:
 *     name:
 *      type: string
 *     capacity:
 *      type: integer
 *     price_per_day:
 *      type: number
 *     path_to_img:
 *      type: string
 */
