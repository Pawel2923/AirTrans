import express from "express";
const router = express.Router();
import carService from "../services/cars";
import { Err } from "../Types";

router.get("/", async function (req, res, next) {
	try {
		const { page, limit } = req.query;
		const parsedPage = page ? parseInt(page as string) : undefined;
		const parsedLimit = limit ? parseInt(limit as string) : undefined;

		const { data, meta, response } = await carService.getAllCars(
			parsedPage,
			parsedLimit
		);

		res.status(response.statusCode).json({
			data,
			meta,
		});
	} catch (error) {
		console.error("Error while fetching cars", error);
		res.status(500).json({ message: "Internal server error" });
	}
});
router.get("/:id", async function (req, res, next) {
	try {
		const carId = req.params.id;
		const parsedCarId = carId ? parseInt(carId as string) : undefined;

		if (!parsedCarId) {
			throw new Err("Invalid car id", 400);
		}

		const { data, response } = await carService.getById(parsedCarId);

		if (!data) {
			return res.status(response.statusCode).json({
				message: response.message,
			});
		}

		res.status(response.statusCode).json({
			data,
		});
	} catch (error) {
		console.error("Error while fetching car", error);
		res.status(500).json({ message: "Internal server error" });
	}
});

router.get("/:id", async function (req, res, next) {
	try {
		const carId = req.params.id;
		const parsedCarId = carId ? parseInt(carId as string) : undefined;

		if (!parsedCarId) {
			throw new Err("Invalid car id", 400);
		}

		const { data, response } = await carService.getById(parsedCarId);

		if (!data) {
			return res.status(response.statusCode).json({
				message: response.message,
			});
		}

		res.status(response.statusCode).json({
			data,
		});
	} catch (error) {
		console.error("Error while fetching car", error);
		res.status(500).json({ message: "Internal server error" });
	}
});

router.post("/", async function (req, res, next) {
	try {
		const { data, message } = await carService.create(req.body);
		res.status(201).json({ data, message });
	} catch (err) {
		next(err);
	}
});

router.put("/:id", async function (req, res, next) {
	try {
    const carId = req.params.id;
    const parsedCarId = carId ? parseInt(carId as string) : undefined;

      if (!parsedCarId) {
          throw new Err("Invalid car id", 400);
      }

		const { data, message } = await carService.update(
			parsedCarId,
			req.body
		);
		res.status(200).json({ data, message });
	} catch (err) {
		next(err);
	}
});

router.delete("/:id", async function (req, res, next) {
	try {
    const carId = req.params.id;
    const parsedCarId = carId ? parseInt(carId as string) : undefined;

    if (!parsedCarId) {
        throw new Err("Invalid car id", 400);
    }

		const message = await carService.remove(parsedCarId);
		res.status(204).json({ message });
	} catch (err) {
		next(err);
	}
});

export default router;
