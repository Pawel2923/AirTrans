const express = require("express");
const router = express.Router();
const flight = require("../services/flights");

/**
 * @openapi
 * /flights:
 *  get:
 *   description: Get all flights
 *   parameters:
 *    - name: page
 *      in: query
 *      required: false
 *      description: Page number
 *      type: integer
 *    - name: isarrdep
 *      in: query
 *      required: false
 *      description: Filter by arrival or departure
 *      type: boolean
 *    - name: limit
 *      in: query
 *      required: false
 *      description: Limit number of flights
 *      type: integer
 *   responses:
 *    200:
 *     description: Returns a list of flights
 *    500:
 *     description: Internal server error
 */
router.get("/", async function (req, res, next) {
	try {
		const { page, isarrdep, limit } = req.query;

		const { data, meta, response } =
			isarrdep != undefined
				? await flight.getByDepartureOrArrival(limit, page)
				: await flight.getAll(page, limit);
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
 * /flights/{id}:
 *  get:
 *   description: Get flight by id
 *   parameters:
 *    - name: id
 *      in: path
 *      required: true
 *      description: Flight id
 *      type: string
 *   responses:
 *    200:
 *     description: Returns a flight
 *    404:
 *     description: Flight not found
 *    500:
 *     description: Internal server error
 */
router.get("/:id", async function (req, res, next) {
	try {
		const { data, response } = await flight.getById(req.params.id);
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
 * /flights:
 *  post:
 *   description: Create a new flight
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/flight'
 *   responses:
 *    201:
 *     description: Successfully created flight
 *    400:
 *     description: Invalid input
 *    404:
 *     description: Airplane serial number not found
 *    409:
 *     description: Flight with this id already exists
 *    500:
 *     description: Flight could not be created
 */
router.post("/", async function (req, res, next) {
	try {
		const response = await flight.create(req.body);
		res.status(response.statusCode).json({ message: response.message });
	} catch (err) {
		next(JSON.parse(err.message));
	}
});

/**
 * @openapi
 * /flights/{id}:
 *  put:
 *   description: Update a flight
 *   parameters:
 *    - name: id
 *      in: path
 *      required: true
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/flight'
 *   responses:
 *    200:
 *     description: Flight updated successfully
 *    400:
 *     description: Invalid input
 *    404:
 *     description: Flight with this id does not exist
 *    500:
 *     description: Flight could not be updated
 */
router.put("/:id", async function (req, res, next) {
	try {
		const response = await flight.update(req.params.id, req.body);
		res.status(response.statusCode).json({ message: response.message });
	} catch (err) {
		next(JSON.parse(err.message));
	}
});

/**
 * @openapi
 * /flights/{id}:
 *  delete:
 *   description: Delete a flight
 *   parameters:
 *    - name: id
 *      in: path
 *      required: true
 *   responses:
 *    200:
 *     description: Flight deleted successfully
 *    404:
 *     description: Flight with this id does not exist
 *    500:
 *     description: Flight could not be deleted
 */
router.delete("/:id", async function (req, res, next) {
	try {
		const response = await flight.remove(req.params.id);
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
 *   errorResponse:
 *    type: object
 *    properties:
 *     statusMessage:
 *      type: string
 *     statusCode:
 *      type: integer
 *   flight:
 *    type: object
 *    properties:
 *     id:
 *      type: string
 *     status:
 *      type: string
 *     airlineName:
 *      type: string
 *     destination:
 *      type: string
 *     arrival:
 *      type: string
 *      format: date-time
 *     departure:
 *      type: string
 *      format: date-time
 *     airplaneSerialNo:
 *      type: string
 *    example:
 *     id: "LH 2334"
 *     status: "SCHEDULED"
 *     airlineName: "Lufthansa"
 *     destination: "Frankfurt"
 *     arrival: "2024-07-01 12:00:00"
 *     departure: "2024-07-01 10:00:00"
 *     airplaneSerialNo: "D-AIMD"
 */
