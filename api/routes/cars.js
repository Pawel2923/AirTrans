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

module.exports = router;
