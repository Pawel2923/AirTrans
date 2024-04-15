const express = require("express");
const router = express.Router();
const announcements = require("../services/announcements");

router.get("/", async function (req, res, next) {
    try {
        res.json(await announcements.getAll(req.query.page));
    } catch (err) {
        next(err);
    }
});

module.exports = router;