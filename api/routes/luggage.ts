import express from "express";
const router = express.Router();
import luggage from "../services/luggage";
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

    const { data, meta, message } = await luggage.get(parsedPage, parsedLimit, userEmail as string);
    res.status(200).json({
      data,
      meta,
      message,
    });
  } catch (err) {
    next(err);
  }
});

export default router;
