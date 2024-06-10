import express from "express";
const router = express.Router();
import equipment from "../services/equipment";
import { verifyUser, requireRole } from "../middlewares/verifyUser";

/**
 * @openapi
 * /equipment:
 *  get:
 *   tags:
 *    - Equipment
 *   summary: Get all equipment or a specific equipment by serial number
 *   parameters:
 *    - name: page
 *      in: query
 *      required: false
 *      description: Page number
 *      type: integer
 *    - name: limit
 *      in: query
 *      required: false
 *      description: Limit number of equipment
 *      type: integer
 *   responses:
 *    200:
 *     description: Successfully fetched data
 *     content:
 *      application/json:
 *       schema:
 *        oneOf:
 *         - $ref: '#/components/schemas/responseWithMeta'
 *         - $ref: '#/components/schemas/response'
 *    400:
 *     description: Bad request
 *    404:
 *     description: No equipment found
 *    500:
 *     description: Internal server error
 */

router.get("/", async (req, res, next) => {
  try {
    const { page, limit } = req.query;

    const parsedPage = page ? parseInt(page as string) : undefined;
    const parsedLimit = limit ? parseInt(limit as string) : undefined;

    const { data, meta, message } = await equipment.getAll(
      parsedPage,
      parsedLimit
    );
    res.status(200).json({ data, meta, message });
  } catch (err) {
    next(err);
  }
});

/**
 * @openapi
 * /equipment:
 *  post:
 *   tags:
 *    - Equipment
 *   summary: Create a new equipment
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/Equipment'
 *   responses:
 *    201:
 *     description: Equipment created
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/Message'
 *    400:
 *     description: Bad request
 *    500:
 *     description: Internal server error
 */

router.post("/", verifyUser, async (req, res, next) => {
  try {
    const userRole = (req.user as { role: string }).role;

    requireRole(userRole, ["admin", "ground_crew"]);

    const message = await equipment.create(req.body);
    res.status(201).json({ message });
  } catch (err) {
    next(err);
  }
});

/**
 * @openapi
 * /equipment/{serial_no}:
 *  get:
 *   tags:
 *    - Equipment
 *   summary: Get equipment by serial number
 *   parameters:
 *    - name: serial_no
 *      in: path
 *      required: true
 *      description: Serial number of equipment
 *      type: string
 *   responses:
 *    200:
 *     description: Found equipment by serial number
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/Equipment'
 *    400:
 *     description: Bad request
 *    404:
 *     description: Equipment not found
 *    500:
 *     description: Internal server error
 */
router.get("/:serial_no", async (req, res, next) => {
  try {
    const { serial_no } = req.params;
    const parsedString = serial_no as string;
    const { data, message } = await equipment.getById(parsedString);
    res.status(200).json({ data, message });
  } catch (err) {
    next(err);
  }
});


/**
 * @openapi
 * /equipment/{serial_no}:
 *  put:
 *   tags:
 *    - Equipment
 *   summary: Update an equipment
 *   parameters:
 *    - name: serial_no
 *      in: path
 *      required: true
 *      description: Serial number of equipment
 *      type: string
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/Equipment'
 *   responses:
 *    200:
 *     description: Successfully updated equipment
 *    404:
 *     description: Equipment not found
 *    500:
 *     description: Internal server error
 */
router.put("/:serial_no",verifyUser, async (req, res, next) => {
  try {
    const { serial_no } = req.params;
    const parsedString = serial_no as string;

    const userRole = (req.user as { role: string }).role;
    requireRole(userRole, ["admin", "ground_crew"]);

    const message = await equipment.update(parsedString, req.body);
    res.status(200).json({ message });
  } catch (err) {
    next(err);
  }
});

/**
 * @openapi
 * /equipment/{serial_no}:
 *  delete:
 *   tags:
 *    - Equipment
 *   summary: Delete an equipment
 *   parameters:
 *    - name: serial_no
 *      in: path
 *      required: true
 *      description: Serial number of equipment
 *      type: string
 *   responses:
 *    200:
 *     description: Successfully deleted equipment
 *    404:
 *     description: Equipment not found
 *    500:
 *     description: Internal server error
 */
router.delete("/:serial_no",verifyUser, async function (req, res, next){
  try {
    const { serial_no } = req.params;
    const parsedString = serial_no as string;

    const userRole = (req.user as { role: string }).role;
    requireRole(userRole, ["admin", "ground_crew"]);

    const message = await equipment.remove(parsedString);
    res.status(200).json({ message });
  } catch (err) {
    next(err);
  }
});

export default router;

/**
 * @openapi
 * components:
 *   schemas:
 *     Equipment:
 *       type: object
 *       properties:
 *         serial_no:
 *           type: string
 *         type:
 *           type: string
 *         name:
 *           type: string
 *         location:
 *           type: string
 *         Employee_id:
 *           type: number
 */

