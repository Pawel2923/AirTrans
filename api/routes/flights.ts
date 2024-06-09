import express from "express";
const router = express.Router();
import { flight } from "../services/flights";
import { requireRole, verifyUser } from "../middlewares/verifyUser";

/**
 * @openapi
 * /flights:
 *  get:
 *   tags:
 *    - Flights
 *   summary: Get all flights
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
 *           $ref: '#/components/schemas/Flight'
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
    const { page, limit, isarrdep } = req.query;

    const parsedPage = page ? parseInt(page as string) : undefined;
    const parsedLimit = limit ? parseInt(limit as string) : undefined;
    filter = (filter as string) || undefined;
    sort = (sort as string) || undefined;

    const { data, meta, message } =
      isarrdep != undefined
        ? await flight.getByDepartureOrArrival(parsedPage, parsedLimit, filter, sort)
        : await flight.get(parsedPage, parsedLimit, filter, sort);
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
 * /flights/data:
 *  get:
 *   tags:
 *    - Flights
 *   summary: Get unique data from a column
 *   parameters:
 *    - name: column
 *      in: query
 *      required: false
 *      description: Column name to get data from
 *      type: string
 *   responses:
 *    200:
 *     description: Successfully fetched data
 *     content:
 *      application/json:
 *       schema:
 *        type: array
 *        items:
 *         type: string
 *     message:
 *      type: string
 *    404:
 *     description: No flight data found
 *    500:
 *     description: Internal server error
 */
router.get("/data", async function (req, res, next) {
  try {
    const { column } = req.query;

    const { data, message } = await flight.getData(column as string);
    res.status(200).json({ data, message });
  } catch (err) {
    next(err);
  }
});

/**
 * @openapi
 * /flights/{term}:
 *  get:
 *   tags:
 *    - Flights
 *   summary: Get flights by search term
 *   parameters:
 *    - name: term
 *      in: path
 *      required: true
 *      description: Search term
 *      type: string
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
 *           $ref: '#/components/schemas/Airplane'
 *         meta:
 *          type: object
 *          properties:
 *           page:
 *            type: integer
 *           pages:
 *            type: integer
 *         message:
 *          type: string
 *    404:
 *     description: No flights found
 *    500:
 *     description: Internal server error
 */
router.get("/:term", async function (req, res, next) {
  try {
    let { filter, sort } = req.query;
    const { page, limit } = req.query;

    const parsedPage = page ? parseInt(page as string) : undefined;
    const parsedLimit = limit ? parseInt(limit as string) : undefined;
    filter = (filter as string) || undefined;
    sort = (sort as string) || undefined;

    const { term } = req.params;

    const { data, meta, message } = await flight.search(
      term,
      parsedPage,
      parsedLimit,
      filter,
      sort
    );
    res.status(200).json({ data, meta, message });
  } catch (err) {
    next(err);
  }
});

/**
 * @openapi
 * /flights:
 *  post:
 *   tags:
 *    - Flights
 *   summary: Create a new flight
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/Flight'
 *   responses:
 *    201:
 *     description: Successfully created flight
 *    400:
 *     description: Invalid input
 *    401:
 *     description: Unauthorized
 *    409:
 *     description: Flight with this id already exists
 *    500:
 *     description: Flight could not be created
 */
router.post("/", verifyUser, async function (req, res, next) {
  try {
    const userRole = (req.user as { role: string }).role;

    requireRole(userRole, ["admin", "atc"]);
    const { data, message } = await flight.create(req.body);
    res.status(201).json({ data, message });
  } catch (err) {
    next(err);
  }
});

/**
 * @openapi
 * /flights/{id}:
 *  put:
 *   tags:
 *    - Flights
 *   summary: Update a flight
 *   parameters:
 *    - name: id
 *      in: path
 *      required: true
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/Flight'
 *   responses:
 *    200:
 *     description: Flight updated successfully
 *    400:
 *     description: Invalid input
 *    401:
 *     description: Unauthorized
 *    404:
 *     description: Flight with this id does not exist
 *    500:
 *     description: Flight could not be updated
 */
router.put("/:id", verifyUser, async function (req, res, next) {
  try {
    const userRole = (req.user as { role: string }).role;

    requireRole(userRole, ["admin", "atc"]);
    const { data, message } = await flight.update(
      req.params["id"] as string,
      req.body
    );
    res.status(200).json({ data, message });
  } catch (err) {
    next(err);
  }
});

/**
 * @openapi
 * /flights/{id}:
 *  delete:
 *   tags:
 *    - Flights
 *   summary: Delete a flight
 *   parameters:
 *    - name: id
 *      in: path
 *      required: true
 *   responses:
 *    204:
 *     description: Flight deleted successfully
 *    401:
 *     description: Unauthorized
 *    404:
 *     description: Flight with this id does not exist
 *    500:
 *     description: Flight could not be deleted
 */
router.delete("/:id", verifyUser, async function (req, res, next) {
  try {
    const userRole = (req.user as { role: string }).role;

    requireRole(userRole, ["admin", "atc"]);
    const message = await flight.remove(req.params["id"] as string);
    res.status(204).json({ message });
  } catch (err) {
    next(err);
  }
});

export default router;

/**
 * @openapi
 * components:
 *  schemas:
 *   Flight:
 *    type: object
 *    properties:
 *     id:
 *      type: string
 *     status:
 *      type: string
 *     airline_name:
 *      type: string
 *     destination:
 *      type: string
 *     arrival:
 *      type: string
 *      format: date-time
 *     departure:
 *      type: string
 *      format: date-time
 *     airplane_serial_no:
 *      type: string
 *    example:
 *     id: "LH 2334"
 *     status: "SCHEDULED"
 *     airline_name: "Lufthansa"
 *     destination: "Frankfurt"
 *     origin: "Warsaw"
 *     arrival: "2024-07-01 12:00:00"
 *     departure: "2024-07-01 10:00:00"
 *     airplane_serial_no: "D-AIMD"
 */
