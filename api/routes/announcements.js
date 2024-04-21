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

router.get("/:id", async function (req, res, next) {
    try {
        const { data, response } = await announcements.getById(req.params.id);
        res.status(response.statusCode).json({ data, message: response.message });
    } catch (err) {
        next(JSON.parse(err.message));
    }
});

router.post("/", async function (req, res, next) {
    try {
        const response = await announcements.create(req.body);
        res.status(response.statusCode).json({ message: response.message });
    } catch (err) {
        next(JSON.parse(err.message));
    }
});

router.put("/:id", async function (req, res, next) {
    try {
        const response = await announcements.update(req.params.id, req.body);
        res.status(response.statusCode).json({ message: response.message });
    } catch (err) {
        next(JSON.parse(err.message));
    }
});

router.delete("/:id", async function (req, res, next) {
    try {
        const response = await announcements.remove(req.params.id);
        res.status(response.statusCode).json({ message: response.message });
    } catch (err) {
        next(JSON.parse(err.message));
    }
});

module.exports = router;