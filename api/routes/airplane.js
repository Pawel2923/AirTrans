const express = require("express");
const router = express.Router();
const airplaneService = require("../services/airplane");

/**
 * @openapi
 * /airplane:
 *  get:
 *   description: Get all airplanes
 *   parameters:
 *    - name: page
 *      in: query
 *      required: false
 *      description: Page number
 *      type: integer
 *    - name: limit
 *      in: query
 *      required: false
 *      description: Limit number of airplanes
 *      type: integer
 *    - name: filter
 *      in: query
 *      required: false
 *      description: Filter by list of properties and values using operator
 *      type: array
 *      items:
 *       type: object
 *       properties:
 *        by:
 *         type: string
 *        operator:
 *         type: string
 *        value:
 *         type: string
 *    - name: sort
 *      in: query
 *      required: false
 *      description: Sort by properties and order
 *      type: object
 *      properties:
 *       by:
 *        type: string
 *       order:
 *        type: array
 *        items:
 *         type: string
 *   responses:
 *    200:
 *     description: Successfully fetched data
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *         data:
 *          type: array
 *          items:
 *           $ref: '#/components/schemas/Airplane'
 *         meta:
 *          type: object
 *          properties:
 *           page:
 *            type: integer
 *           pages:
 *            type: integer
 *         message:
 *          type: string
 *    404:
 *     description: Airplane not found
 *    500:
 *     description: Internal server error
 */
router.get("/", async function (req, res, next) {
	try {
		const { page, limit, filter, sort } = req.query;

		const { data, meta, message } = await airplaneService.get(
			page,
			limit,
			filter,
			sort
		);
		res.status(200).json({
			data,
			meta,
			message,
		});
	} catch (err) {
		next(err);
	}
});

/**
 * @openapi
 * /airplane:
 *  post:
 *   description: Create a new airplane
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/Airplane'
 *   responses:
 *    201:
 *     description: Successfully created airplane
 *    400:
 *     description: Invalid input
 *    409:
 *     description: Airplane already exists
 *    500:
 *     description: Internal server error
 */
router.post("/", async function (req, res, next) {
	try {
		const { data, message } = await airplaneService.create(req.body);
		res.status(201).json({
			data,
			message,
		});
	} catch (err) {
		next(err);
	}
});

/**
 * @openapi
 * /airplane/{serial_no}:
 *  put:
 *   description: Update an airplane
 *   parameters:
 *    - name: serial_no
 *      in: path
 *      required: true
 *      description: Serial number of airplane
 *      type: string
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/Airplane'
 *   responses:
 *    200:
 *     description: Successfully updated airplane
 *    404:
 *     description: Airplane not found
 *    500:
 *     description: Internal server error
 */
router.put("/:serial_no", async function (req, res, next) {
	try {
		const { data, message } = await airplaneService.update(
			req.params.serial_no,
			req.body
		);
		res.status(200).json({
			data,
			message,
		});
	} catch (err) {
		next(err);
	}
});

/**
 * @openapi
 * /airplane/{serial_no}:
 *  delete:
 *   description: Delete an airplane
 *   parameters:
 *    - name: serial_no
 *      in: path
 *      required: true
 *      description: Serial number of airplane
 *      type: string
 *   responses:
 *    204:
 *     description: Successfully deleted airplane
 *    404:
 *     description: No airplanes found
 *    500:
 *     description: Internal server error
 */
router.delete("/:serial_no", async function (req, res, next) {
	try {
		const { serial_no } = req.params;
		const message = await airplaneService.remove(serial_no);
		res.status(204).json({ message });
	} catch (err) {
		next(err);
	}
});

module.exports = router;

/**
 * @openapi
 * components:
 *  schemas:
 *   Airplane:
 *    type: object
 *    properties:
 *     Serial_no:
 *      type: string
 *     Model:
 *      type: string
 *     Type:
 *      type: string
 *     Production_year:
 *      type: integer
 *     Num_of_seats:
 *      type: integer
 *     Fuel_tank:
 *      type: number
 *      format: float
 *     Fuel_quant:
 *      type: number
 *      format: float
 *     Crew_size:
 *      type: integer
 *     Max_cargo:
 *      type: number
 *      format: float
 */
