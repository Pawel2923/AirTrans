import express from "express";
const router = express.Router();
import offer from "../services/offer";

/**
 * @openapi
 * /offer:
 *  get:
 *   tags:
 *    - Offer
 *   summary: Get all offers
 *   parameters:
 *    - name: page
 *      in: query
 *      required: false
 *      description: Page number
 *      type: integer
 *    - name: limit
 *      in: query
 *      required: false
 *      description: Limit number of offers
 *   responses:
 *    200:
 *     description: Successfully fetched data
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *         data:
 *          type: object
 *          properties:
 *           cars:
 *            type: array
 *            items:
 *             $ref: '#/components/schemas/car'
 *           parkingInfo:
 *            type: array
 *            items:
 *             $ref: '#/components/schemas/parking-info'
 *         message:
 *          type: string
 *    404:
 *     description: No offers found
 *    500:
 *     description: Internal server error
 */
router.get("/", async function (req, res, next) {
  try {
    const { page, limit } = req.query;
    const parsedPage = page ? parseInt(page as string) : undefined;
    const parsedLimit = limit ? parseInt(limit as string) : undefined;

    const { data, meta, message } = await offer.get(parsedPage, parsedLimit);
    res.status(200).json({ data, meta, message });
  } catch (err) {
    next(err);
  }
});

export default router;

/**
 * @openapi
 * components:
 *  schemas:
 *   car:
 *    type: object
 *    properties:
 *     brand:
 *      type: string
 *     model:
 *      type: string
 *     production_year:
 *      type: integer
 *     transmission_type:
 *      type: string
 *     fuel_type:
 *      type: string
 *     price_per_day:
 *      type: number
 *     path_to_img:
 *      type: string
 *   parking-info:
 *    type: object
 *    properties:
 *     name:
 *      type: string
 *     capacity:
 *      type: integer
 *     price_per_day:
 *      type: number
 *     path_to_img:
 *      type: string
 */
