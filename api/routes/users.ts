import express from "express";
const router = express.Router();
import users from "../services/users";

/**
 * @openapi
 * /users:
 *  get:
 *   tags:
 *    - Users
 *   description: Get all users or filtered users
 *   parameters:
 *    - name: page
 *      in: query
 *      required: false
 *      description: Page number
 *      type: integer
 *    - name: limit
 *      in: query
 *      required: false
 *      description: Limit number of flights
 *      type: integer
 *    - name: filter
 *      in: query
 *      required: false
 *      description: Filter by list of properties and values using operator
 *      type: array
 *      items:
 *       type: object
 *       properties:
 *        by:
 *         type: string
 *        operator:
 *         type: string
 *        value:
 *         type: string
 *    - name: sort
 *      in: query
 *      required: false
 *      description: Sort by properties and order
 *      type: object
 *      properties:
 *       by:
 *        type: string
 *       order:
 *        type: array
 *        items:
 *         type: string
 *   responses:
 *    200:
 *     description: Successfully fetched users
 *     content:
 *      application/json:
 *       schema:
 *       type: object
 *       properties:
 *        data:
 *         type: array
 *         items:
 *          $ref: '#/components/schemas/UserInfo'
 *        meta:
 *         type: object
 *         properties:
 *          page:
 *           type: integer
 *          pages:
 *           type: integer
 *        message:
 *         type: string
 *    404:
 *     description: No users found
 *    500:
 *     description: Internal server error
 */
router.get("/", async function (req, res, next) {
	try {
		let { page, limit, filter, sort } = req.query;
		const parsedPage = page ? parseInt(page as string) : undefined;
		const parsedLimit = limit ? parseInt(limit as string) : undefined;
		filter = (filter as string) || undefined;
		sort = (sort as string) || undefined;

		const { data, meta, message } = await users.get(
			parsedPage,
			parsedLimit,
			filter,
			sort
		);
		res.status(200).json({ data, meta, message });
	} catch (err) {
		next(err);
	}
});

export default router;

/**
 * @openapi
 * components:
 *  schemas:
 *   UserInfo:
 *    type: object
 *    properties:
 *     uid:
 *      type: integer
 *     email:
 *      type: string
 *     role:
 *      type: string
 *     first_name:
 *      type: string
 *     last_name:
 *      type: string
 *     phone_number:
 *      type: string
 *     address:
 *      type: string
 *     create_time:
 *      type: string
 *     birth_date:
 *      type: string
 *     gender:
 *      type: string
 *     user_img:
 *      type: binary
 */
