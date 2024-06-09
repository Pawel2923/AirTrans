import express from "express";
import { requireRole, verifyUser } from "../middlewares/verifyUser";
import config from "../config";
import { refreshToken } from "../middlewares/refreshToken";
import { Err } from "../Types";
const router = express.Router();

/**
 * @openapi
 * /authenticate:
 *  get:
 *   tags:
 *    - Authentication
 *   summary: Check if user is authenticated
 *   parameters:
 *    - name: requiredRole
 *      in: query
 *      required: false
 *      description: Required user role
 *      type: string
 *   responses:
 *    200:
 *     description: Successfully authenticated
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *         auth:
 *          type: boolean
 *          description: Authentication status
 *         user:
 *          type: object
 *          description: User data
 *          properties:
 *           email:
 *            type: string
 *            description: Logged in user email
 *           role:
 *            type: string
 *            description: Logged in user role
 *    401:
 *     description: Unauthorized
 *    403:
 *     description: Forbidden
 *    500:
 *     description: Internal server error
 */
router.get("/", verifyUser, (req, res, next) => {
  try {
    const userRole = (req.user as { email: string; role: string }).role;

    requireRole(userRole, req.query["requiredRole"] as string);

    config.getDbUser(userRole);
    res.status(200).json({ auth: true, user: req.user });
  } catch (error) {
    next(error);
  }
});

/**
 * @openapi
 * /authenticate/refresh:
 *  post:
 *   tags:
 *    - Authentication
 *   summary: Refresh access token using refresh token
 *   responses:
 *    200:
 *     description: Successfully refreshed access token
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *         auth:
 *          type: boolean
 *          description: Authentication status
 *         user:
 *          type: object
 *          description: User data
 *          properties:
 *           email:
 *            type: string
 *            description: User email
 *           role:
 *            type: string
 *            description: User role
 *         message:
 *          type: string
 *          description: Success message
 *    401:
 *     description: Unauthorized
 *    403:
 *     description: Forbidden
 *    500:
 *     description: Internal server error
 */
router.post("/refresh", refreshToken, (req, res, next) => {
  try {
    const response = req.response;

    if (!response) {
      throw new Err("No response provided");
    }

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

export default router;
