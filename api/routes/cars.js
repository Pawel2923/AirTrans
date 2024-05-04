
const express = require("express");
const router = express.Router();
const carService = require("../services/cars");

router.get("/", async function (req, res, next) {
    try {
        const { page, limit } = req.query;

        const { data, meta, response } = await carService.getAllCars(page, limit);

        res.status(response.statusCode).json({
            data,
            meta
        });

    } catch (error) {
        console.error("Error while fetching cars", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
router.get("/:id", async function (req, res, next) {
  try {
      const carId = req.params.id;

      const { data, response } = await carService.getOneCar(carId);

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

    const { data, response } = await carService.getById(carId);

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
      const { data, message } = await carService.update(req.params.id, req.body);
      res.status(200).json({ data, message });
    } catch (err) {
      next(err);
    }
  });

  router.delete("/:id", async function (req, res, next) {
    try {
      const message = await carService.remove(req.params.id);
      res.status(204).json({ message });
    } catch (err) {
      next(err);
    }
  });
module.exports = router;
