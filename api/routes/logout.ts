import express from "express";
const router = express.Router();

/**
 * @openapi
 * /logout:
 *  get:
 *   description: Logs out the user by clearing the JWT cookie
 *   responses:
 *    200:
 *     description: Logged out successfully
 *    401:
 *     description: Unauthorized
 *    500:
 *     description: Internal Server Error
 */
router.get("/", (_req, res, next) => {
	try {
		// Clear the JWT cookie by setting it to an empty value and expiring it
		res.clearCookie("jwt");
		res.status(200).json({ message: "Logged out successfully" });
	} catch (error) {
		next(error);
	}
});

export default router;