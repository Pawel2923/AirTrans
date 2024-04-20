const express = require("express");
const router = express.Router();
const announcements = require("../services/announcements");

router.get("/", async function (req, res, next) {
    try {
        const { data, meta, response } = await announcements.getAll(req.query.page);
        res.status(response.statusCode).json({ data, meta, message: response.message });
    } catch (err) {
        next(JSON.parse(err.message));
    }
});

module.exports = router;