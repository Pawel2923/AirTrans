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
 *           $ref: '#/components/schemas/Flight'
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
		const { page, isarrdep, limit, filter, sort } = req.query;

		const { data, meta, message } =
			isarrdep != undefined
				? await flight.getByDepartureOrArrival(page, limit)
				: await flight.get(page, limit, filter, sort);
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
 * /flights/{term}:
 *  get:
 *   description: Get flights by search term
 *   parameters:
 *    - name: term
 *      in: path
 *      required: true
 *      description: Search term
 *      type: string
 *    - name: page
 *      in: query
 *      required: false
 *      description: Page number
 *      type: integer
 *    - name: limit
 *      in: query
 *      required: false
 *      description: Limit number of flights
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
 *     description: No flights found
 *    500:
 *     description: Internal server error
 */
router.get("/:term", async function (req, res, next) {
	try {
		const { page, limit, filter, sort } = req.query;
		const { term } = req.params;

		const { data, meta, message } = await flight.search(term, page, limit, filter, sort);
		res.status(200).json({ data, meta, message });
	} catch (err) {
		next(err);
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
 *       $ref: '#/components/schemas/Flight'
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
		const { data, message } = await flight.create(req.body);
		res.status(201).json({ data, message });
	} catch (err) {
		next(err);
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
 *       $ref: '#/components/schemas/Flight'
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
		const { data, message } = await flight.update(req.params.id, req.body);
		res.status(200).json({ data, message });
	} catch (err) {
		next(err);
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
 *    204:
 *     description: Flight deleted successfully
 *    404:
 *     description: Flight with this id does not exist
 *    500:
 *     description: Flight could not be deleted
 */
router.delete("/:id", async function (req, res, next) {
	try {
		const message = await flight.remove(req.params.id);
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
 *   Flight:
 *    type: object
 *    properties:
 *     id:
 *      type: string
 *     status:
 *      type: string
 *     airline_name:
 *      type: string
 *     destination:
 *      type: string
 *     arrival:
 *      type: string
 *      format: date-time
 *     departure:
 *      type: string
 *      format: date-time
 *     airplane_serial_no:
 *      type: string
 *    example:
 *     id: "LH 2334"
 *     status: "SCHEDULED"
 *     airline_name: "Lufthansa"
 *     destination: "Frankfurt"
 *     arrival: "2024-07-01 12:00:00"
 *     departure: "2024-07-01 10:00:00"
 *     airplane_serial_no: "D-AIMD"
 */
