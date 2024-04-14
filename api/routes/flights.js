const express = require("express");
const router = express.Router();
const flights = require("../services/flights");

router.get("/", async function (req, res, next) {
  try {
    res.json(await flights.getAll(req.query.page));
  } catch (err) {
    next(err);
  }
});

router.get("/arrdep", async function (req, res, next) {
  try {
    res.json(await flights.getArrDep());
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async function (req, res, next) {
  try {
    res.json(await flights.getById(req.params.id));
  } catch (err) {
    next(err);
  }
});

router.post("/post", async function (req, res, next) {
  try {
    res.json(await flights.create(req.body))
  } catch (err) {
    next(err);
  }
});

module.exports = router;