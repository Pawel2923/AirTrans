import express from "express";
import { verifyUser } from "../middlewares/verifyUser";
const router = express.Router();

/**
 * @openapi
 * /authenticate:
 *  get:
 *   description: Check if user is authenticated
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
 *           Id:
 *            type: string
 *            description: User ID
 *           Login:
 *            type: string
 *            description: User login
 *    401:
 *     description: Unauthorized
 *    500:
 *     description: Internal server error
 */
router.get("/", verifyUser, (req, res, next) => {
	try {
        res.status(200).json({ auth: true, user: req.user });
	} catch (error) {
		next(error);
	}
});

export default router;