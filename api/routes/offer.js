const express = require("express");
const router = express.Router();
const offer = require("../services/offer");

router.get("/", async function (req, res, next) {
    try {
        const { data, response } = await offer.getData();
        res.status(response.statusCode).json({ data, message: response.message });
    } catch (err) {
        next(JSON.parse(err.message));
    }
});

module.exports = router;