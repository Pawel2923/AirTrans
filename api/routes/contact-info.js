const express = require("express");
const router = express.Router();
const contactInfo = require("../services/contact-info");

router.get("/", async function (req, res, next) {
    try {
        const { data, response } = await contactInfo.getAll();
        res.status(response.statusCode).json({ data, message: response.message });
    } catch (err) {
        next(JSON.parse(err.message));
    }
});

module.exports = router;