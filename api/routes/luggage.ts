import express from "express";
const router = express.Router();
import luggageService from "../services/luggage";
import { verifyUser } from "../middlewares/verifyUser";

/**
 * @openapi
 * /luggage:
 *  get:
 *   summary: Get all luggage
 *   tags:
 *    - Luggage
 *   parameters:
 *    - in: query
 *      name: page
 *      type: integer
 *      description: Page number
 *      required: false
 *    - in: query
 *      name: limit
 *      type: integer
 *      description: Number of items per page
 *      required: false
 *    - in: query
 *      name: userEmail
 *      type: string
 *      description: Filter by user email
 *      required: false
 *   responses:
 *    200:
 *     description: Successfully fetched data
 *    401:
 *     description: Unauthorized
 *    403:
 *     description: Forbidden
 *    404:
 *     description: No luggage found
 *    500:
 *     description: Internal Server Error
 */
router.get("/", verifyUser, async (req, res, next) => {
  try {
    const { page, limit, userEmail } = req.query;
    const parsedPage = page ? parseInt(page as string) : undefined;
    const parsedLimit = limit ? parseInt(limit as string) : undefined;

    const { data, meta, message } = await luggageService.get(
      parsedPage,
      parsedLimit,
      userEmail as string
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
 * /luggage:
 *  post:
 *   summary: Create a luggage
 *   tags:
 *    - Luggage
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/Luggage'
 *   responses:
 *    201:
 *     description: Successfully added luggage
 *    400:
 *     description: Bad request
 *    401:
 *     description: Unauthorized
 *    403:
 *     description: Forbidden
 *    404:
 *     description: Not found
 *    500:
 *     description: Internal Server Error
 */
router.post("/", verifyUser, async (req, res, next) => {
  try {
    const luggage = req.body;
    const { data, message } = await luggageService.create(luggage);
    res.status(201).json({
      data,
      message,
    });
  } catch (err) {
    next(err);
  }
});

/**
 * @openapi
 * /luggage/{id}:
 *  put:
 *   summary: Update luggage by id
 *   tags:
 *    - Luggage
 *   parameters:
 *    - in: path
 *      name: id
 *      type: integer
 *      required: true
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/Luggage'
 *   responses:
 *    200:
 *     description: Successfully updated luggage
 *    400:
 *     description: Bad request
 *    401:
 *     description: Unauthorized
 *    403:
 *     description: Forbidden
 *    404:
 *     description: Not found
 *    500:
 *     description: Internal Server Error
 */
router.put("/:id", verifyUser, async (req, res, next) => {
  try {
    const id = parseInt(req.params["id"] as string);
    const luggage = req.body;

    const { data, message } = await luggageService.update(id, luggage);
    res.status(200).json({
      data,
      message,
    });
  } catch (err) {
    next(err);
  }
});

/**
 * @openapi
 * /luggage/{id}:
 *  delete:
 *   summary: Delete luggage by id
 *   tags:
 *    - Luggage
 *   parameters:
 *    - in: path
 *      name: id
 *      type: integer
 *      required: true
 *   responses:
 *    200:
 *     description: Successfully deleted luggage
 *    400:
 *     description: Bad request
 *    401:
 *     description: Unauthorized
 *    403:
 *     description: Forbidden
 *    404:
 *     description: Not found
 *    500:
 *     description: Internal Server Error
 */
router.delete("/:id", verifyUser, async (req, res, next) => {
  try {
    const id = parseInt(req.params["id"] as string);

    const { message } = await luggageService.remove(id);
    res.status(200).json({
      message,
    });
  } catch (err) {
    next(err);
  }
});

export default router;

/**
 * @openapi
 * components:
 *  schemas:
 *   Luggage:
 *    type: object
 *    properties:
 *     type:
 *      type: string
 *     size:
 *      type: string
 *     weight:
 *      type: number
 *     Users_id:
 *      type: number
 *     Flights_id:
 *      type: string
 */
