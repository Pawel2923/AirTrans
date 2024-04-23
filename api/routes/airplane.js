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
 *    500:
 *     description: Internal server error
 */
router.get("/", async function (req, res, next) {
	try {
		const { page, limit } = req.query;
		const { data, meta, response } = await airplaneService.getAll(
			page,
			limit
		);
		res.status(response.statusCode).json({
			data,
			meta,
			message: response.message,
		});
	} catch (err) {
		next(JSON.parse(err.message));
	}
});

/**
 * @openapi
 * /airplane/{serial_no}:
 *  get:
 *   description: Returns airplanes that match the serial number
 *   parameters:
 *    - name: serial_no
 *      in: path
 *      required: true
 *      description: Serial number of airplane
 *      type: integer
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
 *         message:
 *          type: string
 *    404:
 *     description: Airplane not found
 *    500:
 *     description: Internal server error
 */
router.get("/:serial_no", async function (req, res, next) {
	try {
		const { serial_no } = req.params;
		const { data, response } = await airplaneService.getBySerialNo(
			serial_no
		);
		res.status(response.statusCode).json({
			data,
			message: response.message,
		});
	} catch (err) {
		next(JSON.parse(err.message));
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
		const { data, response } = await airplaneService.create(req.body);
		res.status(response.statusCode).json({
			data,
			message: response.message,
		});
	} catch (err) {
		next(JSON.parse(err.message));
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
		const { serial_no } = req.params;
		const { data, response } = await airplaneService.update(
			serial_no,
			req.body
		);
		res.status(response.statusCode).json({
			data,
			message: response.message,
		});
	} catch (err) {
		next(JSON.parse(err.message));
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
 *    200:
 *     description: Successfully deleted airplane
 *    404:
 *     description: Airplane not found
 *    500:
 *     description: Internal server error
 */
router.delete("/:serial_no", async function (req, res, next) {
	try {
		const { serial_no } = req.params;
		const { response } = await airplaneService.remove(serial_no);
		res.status(response.statusCode).json({ message: response.message });
	} catch (err) {
		next(JSON.parse(err.message));
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
