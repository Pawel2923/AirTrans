const express = require("express");
const router = express.Router();
const flights = require("../services/flights");
/**
 * @openapi
 * /flights:
 *  get:
 *   description: Get all flights
 *   parameters:
 *    - name: page
 *      in: query
 *      required: false
 *      description: Page number
 *      type: integer
 *    - name: isarrdep
 *      in: query
 *      required: false
 *      description: Filter by arrival or departure
 *      type: boolean
 *    - name: limit
 *      in: query
 *      required: false
 *      description: Limit number of flights
 *      type: integer
 *   responses:
 *    200:
 *     description: Returns a list of flights
 *    500:
 *     description: Internal server error
 */
router.get("/", async function (req, res, next) {
  try {
    const { data, meta, response } = await flights.getAll(req.query.page);
    res.status(response.statusCode).json({ data, meta, message: response.message });
  } catch (err) {
    next(err);
  }
});

router.get("/arrdep", async function (req, res, next) {
  try {
    const { data, response } = await flights.getArrDep();
    res.status(response.statusCode).json({ data, message: response.message });
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async function (req, res, next) {
  try {
    const { data, response } = await flights.getById(req.params.id);
    res.status(response.statusCode).json({ data, message: response.message });
  } catch (err) {
    next(err);
  }
});

router.post("/post", async function (req, res, next) {
  try {
    const response = await flights.create(req.body);
    res.status(response.statusCode).json({ message: response.message });
  } catch (err) {
    next(err);
  }
});

module.exports = router;