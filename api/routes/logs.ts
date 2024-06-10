import express from "express";
const router = express.Router();
import event_logs from "../services/logs";
import { verifyUser, requireRole } from "../middlewares/verifyUser";

/**
 * @openapi
 * /logs:
 *  get:
 *   tags:
 *    - Logs
 *   summary: Get all event logs
 *   parameters:
 *    - name: page
 *      in: query
 *      required: false
 *      description: Page number
 *      type: integer
 *    - name: limit
 *      in: query
 *      required: false
 *      description: Limit number of event logs
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
 *     description: No event logs found
 *    500:
 *     description: Internal server error
 */

router.get("/", verifyUser, async (req, res, next) => {
  try {
    const { page, limit } = req.query;
    const parsedPage = page ? parseInt(page as string) : undefined;
    const parsedLimit = limit ? parseInt(limit as string) : undefined;

    const userRole = (req.user as { role: string }).role;
    requireRole(userRole, "admin");

    const { data, meta, message } = await event_logs.get(
      parsedPage,
      parsedLimit
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

export default router;

/**
 * @openapi
 * components:
 *   schemas:
 *     Event_log:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *         table_name:
 *           type: string
 *         by_user:
 *           type: string
 *         timestamp_log:
 *           type: string
 *         action:
 *           type: string
 *         log_details:
 *           type: string
 */
