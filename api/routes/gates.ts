import express from "express";
const router = express.Router();
import gates from "../services/gates";
import { verifyUser, requireRole } from "../middlewares/verifyUser";

/**
 * @openapi
 * /gates:
 *  get:
 *   tags:
 *    - Gates
 *   summary: Get all gates
 *   parameters:
 *    - name: page
 *      in: query
 *      required: false
 *      description: Page number
 *      type: integer
 *    - name: limit
 *      in: query
 *      required: false
 *      description: Limit number of gates
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
 *     description: No gates found
 *    500:
 *     description: Internal server error
 */

router.get("/", async (req, res, next) => {
  try {
    
    const { page, limit } = req.query;

    const parsedPage = page ? parseInt(page as string) : undefined;
    const parsedLimit = limit ? parseInt(limit as string) : undefined;

    const { data, meta, message } = await gates.get(
      parsedPage,
      parsedLimit,
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
 * /gates:
 *  post:
 *   tags:
 *    - Gates
 *   summary: Create a new gate
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/Gate'
 *   responses:
 *    201:
 *     description: Successfully created a new gate
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *         message:
 *          type: string
 *    400:
 *     description: Bad request
 *    500:
 *     description: Internal server error
 */
router.post("/", verifyUser, async function (req, res, next) {
  try {
    const message = await gates.create(req.body);

    const userRole = (req.user as { role: string }).role;
    requireRole(userRole, ["admin", "airport_staff"]);

    res.status(201).json({ message });
  } catch (err) {
    next(err);
  }
});


/**
 * @openapi
 * /gates/{id}:
 *  delete:
 *   tags:
 *    - Gates
 *   summary: Delete a gate
 *   parameters:
 *    - name: id
 *      in: path
 *      required: true
 *      description: ID of the gate
 *      type: integer
 *   responses:
 *    200:
 *     description: Successfully deleted gate
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *         message:
 *          type: string
 *    400:
 *     description: Bad request
 *    500:
 *     description: Internal server error
 */
router.delete("/:id", verifyUser, async function (req, res, next) {
  try {
    const { id } = req.params;
    const parsedId = parseInt(id as string) || -1;

    const userRole = (req.user as { role: string }).role;
    requireRole(userRole, ["admin", "airport_staff"]);

    const message = await gates.remove(parsedId);
    res.status(200).json({ message });
  } catch (err) {
    next(err);
  }
});

/**
 * @openapi
 * /gates/{id}:
 *  put:
 *   tags:
 *    - Gates
 *   summary: Update a gate
 *   parameters:
 *    - name: id
 *      in: path
 *      required: true
 *      description: ID of the gate
 *      type: integer
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/Gate'
 *   responses:
 *    200:
 *     description: Successfully updated gate
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *         message:
 *          type: string
 *    400:
 *     description: Bad request
 *    500:
 *     description: Internal server error
 */
router.put("/:id", verifyUser, async function (req, res, next) {
  try {
    const { id } = req.params;
    const parsedId = parseInt(id as string) || -1;

    const userRole = (req.user as { role: string }).role;
    requireRole(userRole, ["admin", "airport_staff"]);

    const message = await gates.updateG(parsedId, req.body);
    res.status(200).json({ message });
  } catch (err) {
    next(err);
  }
});

/**
 * @openapi
 * /gates/{id}:
 *  get:
 *   tags:
 *    - Gates
 *   summary: Get gate by ID
 *   parameters:
 *    - name: id
 *      in: path
 *      required: true
 *      description: ID of the gate
 *      type: integer
 *   responses:
 *    200:
 *     description: Successfully fetched gate
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/Gate'
 *    400:
 *     description: Bad request
 *    404:
 *     description: Gate not found
 *    500:
 *     description: Internal server error
 */
router.get("/:id", async function (req, res, next) {
  try {
    const { id } = req.params;
    const parsedId = parseInt(id) || -1;

    const { data, message } = await gates.getById(parsedId);
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
 *     Gate:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *         name:
 *           type: string
 *         status:
 *           type: string
 */

