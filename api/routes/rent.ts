import express from "express";
const router = express.Router();
import rentalService from "../services/rent";
import { verifyUser } from "../middlewares/verifyUser";

/**
 * @openapi
 * /rent:
 *   get:
 *     summary: Get all rentals
 *     tags:
 *       - Rentals
 *     parameters:
 *       - in: query
 *         name: page
 *         type: integer
 *         description: Page number
 *         required: false
 *       - in: query
 *         name: limit
 *         type: integer
 *         description: Number of items per page
 *         required: false
 *       - in: query
 *         name: userEmail
 *         type: string
 *         description: Filter by user email
 *         required: false
 *     responses:
 *       200:
 *         description: Successfully fetched data
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: No rentals found
 *       500:
 *         description: Internal Server Error
 */

router.get("/", async function (req, res, next) {
  try {
    const { page, limit, userEmail } = req.query;
    const parsedPage = page ? parseInt(page as string) : undefined;
    const parsedLimit = limit ? parseInt(limit as string) : undefined;

    const { data, meta, message } = await rentalService.getAllRentals(
      parsedPage,
      parsedLimit,
      userEmail as string
    );

    res.status(200).json({
      data,
      meta,
      message,
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @openapi
 * /rent:
 *   post:
 *     summary: Create a rental
 *     tags:
 *       - Rentals
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Rental'
 *     responses:
 *       201:
 *         description: Successfully created rental
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post("/", verifyUser, async function (req, res, next) {
  try {
    const { data, message } = await rentalService.createRental(req.body);
    res.status(201).json({ data, message });
  } catch (err) {
    next(err);
  }
});

/**
 * @openapi
 * /rent/{id}:
 *   delete:
 *     summary: Delete a rental
 *     tags:
 *       - Rentals
 *     parameters:
 *       - in: path
 *         name: id
 *         type: integer
 *         required: true
 *         description: Rental ID
 *     responses:
 *       204:
 *         description: Successfully deleted rental
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Rental not found
 *       500:
 *         description: Internal server error
 */
router.delete("/:id", verifyUser, async function (req, res, next) {
  try {
    const { id } = req.params;
    const parsedId = parseInt(id as string);

    const message = await rentalService.removeRent(parsedId);
    res.status(204).json({ message });
  } catch (err) {
    next(err);
  }
});

/**
 * @openapi
 * /rent/{id}:
 *   get:
 *     summary: Get a rental by ID
 *     tags:
 *       - Rentals
 *     parameters:
 *       - in: path
 *         name: id
 *         type: integer
 *         required: true
 *         description: Rental ID
 *     responses:
 *       200:
 *         description: Successfully fetched data
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Rental not found
 *       500:
 *         description: Internal server error
 */
router.get("/:id", async function (req, res, next) {
  try {
    const { id } = req.params;
    const rentId = parseInt(id as string);

    const { data } = await rentalService.getById(rentId);

    res.status(200).json({
      data,
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @openapi
 * /rent/{id}:
 *   put:
 *     summary: Update a rental
 *     tags:
 *       - Rentals
 *     parameters:
 *       - in: path
 *         name: id
 *         type: integer
 *         required: true
 *         description: Rental ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Rental'
 *     responses:
 *       200:
 *         description: Successfully updated rental
 *       400:
 *         description: Bad request
 *       404:
 *         description: Rental not found
 *       500:
 *         description: Internal server error
 */
router.put("/:id", verifyUser, async function (req, res, next) {
  try {
    const { id } = req.params;
    const rentId = parseInt(id as string);

    const { data, message } = await rentalService.updateRent(rentId, req.body);
    res.status(200).json({ data, message });
  } catch (err) {
    next(err);
  }
});

export default router;

/**
 * @openapi
 * components:
 *   schemas:
 *     Rental:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *         since:
 *           type: string
 *         until:
 *           type: string
 *         reservation_time:
 *           type: string
 *         return_time:
 *           type: string
 *         status:
 *           type: string
 *         User_id:
 *           type: number
 *         Car_id:
 *           type: number
 *         price_per_day:
 *           type: number
 */
