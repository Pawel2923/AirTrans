import express from "express";
const router = express.Router();
import parkingService from "../services/parking";
import { verifyUser } from "../middlewares/verifyUser";

/**
 * @openapi
 * /parking:
 *   get:
 *     summary: Get all parking
 *     tags:
 *       - Parking
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
 *         description: No parking found
 *       500:
 *         description: Internal Server Error
 */

router.get("/", async function (req, res, next) {
  try {
    const { page, limit, userEmail } = req.query;
    const parsedPage = page ? parseInt(page as string) : undefined;
    const parsedLimit = limit ? parseInt(limit as string) : undefined;

    const { data, meta, message } = await parkingService.getAllParking(
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
 * /parking:
 *   post:
 *     summary: Create a new parking
 *     tags:
 *       - Parking
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Parking'
 *     responses:
 *       201:
 *         description: Successfully created parking
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */

router.post("/", verifyUser, async function (req, res, next) {
  try {
    const { data, message } = await parkingService.createParking(req.body);
    res.status(201).json({ data, message });
  } catch (err) {
    next(err);
  }
});

/**
 * @openapi
 * /parking/{id}:
 *   delete:
 *     summary: Delete a parking
 *     tags:
 *       - Parking
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Parking ID
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Successfully deleted parking
 *       400:
 *         description: Bad request
 *       404:
 *         description: Parking not found
 *       500:
 *         description: Internal server error
 */
router.delete("/:id", verifyUser, async function (req, res, next) {
  try {
    const { id } = req.params;
    const rentId = parseInt(id as string);

    const { message } = await parkingService.removeParking(rentId);
    res.status(204).json({ message });
  } catch (err) {
    next(err);
  }
});

/**
 * @openapi
 * /parking/{id}:
 *   get:
 *     summary: Get parking by ID
 *     tags:
 *       - Parking
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Parking ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successfully fetched data
 *       400:
 *         description: Bad request
 *       404:
 *         description: Parking not found
 *       500:
 *         description: Internal server error
 */
router.get("/:id", async function (req, res, next) {
  try {
    const { id } = req.params;
    const parkingId = parseInt(id as string);

    const { data } = await parkingService.getById(parkingId);

    res.status(200).json({
      data,
    });
  } catch (err) {
    next(err);
  }
});

/**
 * @openapi
 * /parking/{id}:
 *   put:
 *     summary: Update parking by ID
 *     tags:
 *       - Parking
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Parking ID
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Parking'
 *     responses:
 *       200:
 *         description: Successfully updated parking
 *       400:
 *         description: Bad request
 *       404:
 *         description: Parking not found
 *       500:
 *         description: Internal server error
 */
router.put("/:id", verifyUser, async function (req, res, next) {
  try {
    const { id } = req.params;
    const parkingId = parseInt(id as string);

    const { data, message } = await parkingService.updateParking(
      parkingId,
      req.body
    );
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
 *     Parking:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *         parking_level:
 *           type: string
 *         space_id:
 *           type: string
 *         since:
 *           type: string
 *         until:
 *           type: string
 *         license_plate:
 *           type: string
 *         reservation_time:
 *           type: string
 *         status:
 *           type: string
 *         User_id:
 *           type: number
 */
