import express from "express";
import { requireRole, verifyUser } from "../middlewares/verifyUser";
import jwt from "jsonwebtoken";
import { Err } from "../Types";
import config from "../config";
const router = express.Router();

/**
 * @openapi
 * /authenticate:
 *  get:
 *   tags:
 *    - Authentication
 *   description: Check if user is authenticated
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

		requireRole(userRole, req.query.requiredRole as string);

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
 *   description: Refresh access token using refresh token
 *  responses:
 *   200:
 *    description: Successfully refreshed access token
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        auth:
 *         type: boolean
 *         description: Authentication status
 *        user:
 *         type: object
 *         description: User data
 *         properties:
 *          email:
 *           type: string
 *           description: User email
 *          role:
 *           type: string
 *           description: User role
 *        message:
 *         type: string
 *         description: Success message
 *   401:
 *    description: Unauthorized
 *   403:
 *    description: Forbidden
 *   500:
 *    description: Internal server error
 */
router.post("/refresh", (req, res, next) => {
	try {
		const { refreshJwt } = req.cookies;
		if (!refreshJwt) {
			throw new Err("No refresh token provided", 401);
		}

		jwt.verify(
			refreshJwt,
			process.env.REFRESH_SECRET_TOKEN as string,
			(
				err: jwt.VerifyErrors | null,
				user: string | object | undefined
			) => {
				if (err) {
					throw new Err("Invalid refresh token", 403);
				}

				const tokenUser = user as { email: string; role: string };

				const accessToken = jwt.sign(
					{ email: tokenUser.email, role: tokenUser.role },
					process.env.SECRET_TOKEN as string,
					{
						expiresIn: 86400,
					}
				);

				const cookieOptions = {
					httpOnly: true,
					expires: new Date(Date.now() + 86400000),
				};

				res.cookie("jwt", accessToken, cookieOptions);

				config.getDbUser(tokenUser.role);

				return res
					.status(200)
					.json({
						auth: true,
						user: tokenUser,
						message: "Token refreshed successfully",
					});
			}
		);
	} catch (error) {
		next(error);
	}
});

export default router;
