import express from "express";
const router = express.Router();
import flightDataService from "../services/flight_data";
import { requireRole, verifyUser } from "../middlewares/verifyUser";

/**
 * @openapi
 * /flight_data:
 *  get:
 *   tags:
 *    - Flights
 *   summary: Get flight data
 *   parameters:
 *    - name: page
 *      in: query
 *      required: false
 *      description: Page number
 *      type: integer
 *    - name: limit
 *      in: query
 *      required: false
 *      description: Limit number of flights
 *      type: integer
 *    - name: filter
 *      in: query
 *      required: false
 *      description: Filter by list of properties and values using operator
 *      type: array
 *      items:
 *       type: object
 *       properties:
 *        by:
 *         type: string
 *        operator:
 *         type: string
 *        value:
 *         type: string
 *    - name: sort
 *      in: query
 *      required: false
 *      description: Sort by properties and order
 *      type: object
 *      properties:
 *       by:
 *        type: string
 *       order:
 *        type: array
 *        items:
 *         type: string
 *   responses:
 *    200:
 *     description: Successfully fetched data
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *         data:
 *          type: array
 *          items:
 *           $ref: '#/components/schemas/Flight_data'
 *         meta:
 *          type: object
 *          properties:
 *           page:
 *            type: integer
 *           pages:
 *            type: integer
 *         message:
 *          type: string
 *    400:
 *     description: Bad request
 *    404:
 *     description: No flights found
 *    500:
 *     description: Internal server error
 */
router.get("/", async function (req, res, next) {
  try {
    let { filter, sort } = req.query;
    const { page, limit } = req.query;

    const parsedPage = page ? parseInt(page as string) : undefined;
    const parsedLimit = limit ? parseInt(limit as string) : undefined;
    filter = (filter as string) || undefined;
    sort = (sort as string) || undefined;

    const { data, meta, message } = await flightDataService.get(
      parsedPage,
      parsedLimit,
      filter,
      sort
    );
    res.status(200).json({
      data,
      meta,
      message,
    });
  } catch (err) {
    next(err);
  }
});

/**
 * @openapi
 * /flight_data:
 *  post:
 *   tags:
 *    - Flights
 *   summary: Create a new Flight_data entry
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/Flight_data'
 *   responses:
 *    201:
 *     description: Successfully created flight_data entry
 *    400:
 *     description: Invalid input
 *    401:
 *     description: Unauthorized
 *    403:
 *     description: Forbidden
 *    409:
 *     description: Flight_data entry with this id already exists
 *    500:
 *     description: Flight_data entry could not be created
 */
router.post("/", verifyUser, async function (req, res, next) {
  try {
    const userRole = (req.user as { role: string }).role;

    requireRole(userRole, ["admin", "atc"]);
    const { data, message } = await flightDataService.create(req.body);
    res.status(201).json({ data, message });
  } catch (err) {
    next(err);
  }
});

/**
 * @openapi
 * /flight_data/{id}:
 *  put:
 *   tags:
 *    - Flights
 *   summary: Update a Flight_data entry
 *   parameters:
 *    - name: id
 *      in: path
 *      required: true
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/Flight_data'
 *   responses:
 *    200:
 *     description: Flight_data entry updated successfully
 *    400:
 *     description: Invalid input
 *    401:
 *     description: Unauthorized
 *    403:
 *     description: Forbidden
 *    404:
 *     description: Flight_data entry with this id does not exist
 *    500:
 *     description: Flight_data entry could not be updated
 */
router.put("/:id", verifyUser, async function (req, res, next) {
  try {
    const userRole = (req.user as { role: string }).role;

    const id = parseInt(req.params["id"] as string);

    requireRole(userRole, ["admin", "atc"]);
    const { data, message } = await flightDataService.update(id, req.body);
    res.status(200).json({ data, message });
  } catch (err) {
    next(err);
  }
});

export default router;

/**
 * @openapi
 * components:
 *  schemas:
 *   Flight_data:
 *    type: object
 *    properties:
 *     id:
 *      type: number
 *     altitude:
 *      type: number
 *     track:
 *      type: number
 *     ground_speed:
 *      type: number
 *     vertical_speed:
 *      type: number
 *     latitude:
 *      type: number
 *     longitude:
 *      type: number
 *     Flight_id:
 *      type: string
 */
