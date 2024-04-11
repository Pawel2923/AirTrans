const express = require("express");
const router = express.Router();
const flights = require("../services/flights");

router.get("/", async function(req, res, next) {
  try {
    res.json(await flights.getAll(req.query.page));
  } catch (err) {
    next(err);
  }
});

module.exports = router;