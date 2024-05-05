const express = require("express");
const router = express.Router();
const parkingService = require("../services/parking");

router.get("/", async function (req, res, next) {
    try {
        const { page, limit } = req.query;

        const { data, meta, response } = await parkingService.getAllParkings(page, limit);

        res.status(response.statusCode).json({
            data,
            meta
        });

    } catch (error) {
        console.error("Error while fetching parkings", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;