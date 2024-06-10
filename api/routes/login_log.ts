import express from "express";
const router = express.Router();
import login_log from "../services/login_log";
import { requireRole, verifyUser } from "../middlewares/verifyUser";

/**
 * @openapi
 * /login_log:
 *  get:
 *   tags:
 *    - Login_log
 *   summary: Get all login logs
 *   parameters:
 *    - name: page
 *      in: query
 *      required: false
 *      description: Page number
 *      type: integer
 *    - name: limit
 *      in: query
 *      required: false
 *      description: Limit number of login logs
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
 *     description: No login logs found
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

    const { data, meta, message } = await login_log.get(
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
 *     Login_log:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *         first_name:
 *           type: string
 *         email:
 *           type: string
 *         login_date:
 *           type: string
 *         login_details:
 *           type: string
 */


