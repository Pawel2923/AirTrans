const express = require("express");
const router = express.Router();
const flight = require("../services/flights");

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

module.exports = router;
