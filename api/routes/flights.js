const express = require("express");
const router = express.Router();
const flight = require("../services/flights");

/**
 * @openapi
 * /api/flights:
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

router.post("/", async function (req, res, next) {
	try {
		const response = await flight.create(req.body);
		res.status(response.statusCode).json({ message: response.message });
	} catch (err) {
		next(JSON.parse(err.message));
	}
});

router.put("/:id", async function (req, res, next) {
	try {
		const response = await flight.update(req.params.id, req.body);
		res.status(response.statusCode).json({ message: response.message });
	} catch (err) {
		next(JSON.parse(err.message));
	}
});

router.delete("/:id", async function (req, res, next) {
	try {
		const response = await flight.remove(req.params.id);
		res.status(response.statusCode).json({ message: response.message });
	} catch (err) {
		next(JSON.parse(err.message));
	}
});

module.exports = router;
