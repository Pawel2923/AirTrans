import express, { Request, Response, NextFunction } from "express";
const router = express.Router();
import users from "../services/users";
import { verifyUser, requireRole } from "../middlewares/verifyUser";

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
 *    401:
 *     description: Unauthorized
 *    403:
 *     description: Forbidden
 *    404:
 *     description: No users found
 *    500:
 *     description: Internal server error
 */
router.get("/", verifyUser, async function (req, res, next) {
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

/**
 * @openapi
 * /users/roles:
 *  get:
 *   tags:
 *    - Users
 *   description: Get all roles
 *   responses:
 *    200:
 *     description: Successfully fetched roles
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *         data:
 *          type: array
 *          items:
 *           type: string
 *    401:
 *     description: Unauthorized
 *    403:
 *     description: Forbidden
 *    500:
 *     description: Internal server error
 */
router.get("/roles", verifyUser, async function (req, res, next) {
	try {
		requireRole(req, "admin");
		const { data, message } = await users.getRoles();
		res.status(200).json({ data, message });
	} catch (err) {
		next(err);
	}
});

/**
 * @openapi
 * /users/{uid}:
 *  put:
 *   tags:
 *    - Users
 *   description: Update user by uid
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/UserInfo'
 *   parameters:
 *    - name: uid
 *      in: path
 *      required: true
 *      description: User ID
 *      type: integer
 *   responses:
 *    200:
 *     description: User updated successfully
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *         data:
 *          $ref: '#/components/schemas/UserInfo'
 *         message:
 *          type: string
 *    400:
 *     description: Invalid user data
 *    401:
 *     description: Unauthorized
 *    403:
 *     description: Forbidden
 *    404:
 *     description: User not found
 *    500:
 *     description: Internal server error
 */
router.put("/:uid", verifyUser, async function (req, res, next) {
	try {
		const { uid } = req.params;
		const parsedUid = parseInt(uid as string);
		const userData = req.body;

		const { data, message } = await users.update(parsedUid, userData);
		res.status(200).json({ data, message });
	} catch (err) {
		next(err);
	}
});

/**
 * @openapi
 * /users/{uid}:
 *  patch:
 *   tags:
 *    - Users
 *   description: Update user role by uid
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        role:
 *         type: string
 *   parameters:
 *    - name: uid
 *      in: path
 *      required: true
 *      description: User ID
 *      type: integer
 *   responses:
 *    200:
 *     description: Role updated successfully
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *         message:
 *          type: string
 *    400:
 *     description: Invalid role
 *    401:
 *     description: Unauthorized
 *    403:
 *     description: Forbidden
 *    404:
 *     description: User not found
 *    500:
 *     description: Internal server error
 */
router.patch("/:uid", verifyUser, async function (req, res, next) {
	try {
		requireRole(req, "admin");
		const { uid } = req.params;
		const parsedUid = parseInt(uid as string);
		const { role } = req.body;

		const { message } = await users.updateRole(parsedUid, role as string);
		res.status(200).json({ message });
	} catch (err) {
		next(err);
	}
});

/**
 * @openapi
 * /users/{uid}:
 *  delete:
 *   tags:
 *    - Users
 *   description: Delete user by uid
 *   parameters:
 *    - name: uid
 *      in: path
 *      required: true
 *      description: User ID
 *      type: integer
 *   responses:
 *    204:
 *     description: User deleted
 *    401:
 *     description: Unauthorized
 *    403:
 *     description: Forbidden
 *    404:
 *     description: User not found
 *    500:
 *     description: Internal server error
 */
router.delete("/:uid", verifyUser, async function (req, res, next) {
	try {
		requireRole(req, "admin");
		const { uid } = req.params;
		const parsedUid = parseInt(uid as string);

		const { message } = await users.remove(parsedUid);
		res.status(204).json({ message });
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
