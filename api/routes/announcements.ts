import express from "express";
const router = express.Router();
import announcements from "../services/announcements";
import { requireRole, verifyUser } from "../middlewares/verifyUser";
import config from "../config";

/**
 * @openapi
 * /announcements:
 *  get:
 *   tags: 
 *    - Announcements
 *   description: Get all announcements
 *   parameters:
 *    - name: page
 *      in: query
 *      required: false
 *      description: Page number
 *      type: integer
 *    - name: limit
 *      in: query
 *      required: false
 *      description: Limit number of announcements
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
 *     description: Successfully fetched data
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *         data:
 *          type: array
 *          items:
 *           $ref: '#/components/schemas/Announcement'
 *         meta:
 *          type: object
 *          properties:
 *           page:
 *            type: integer
 *           pages:
 *            type: integer
 *         message:
 *          type: string
 *    400:
 *     description: Bad request
 *    500:
 *     description: Internal server error
 */
router.get("/", async function (req, res, next) {
	try {
		let { page, limit, filter, sort } = req.query;
		const parsedPage = page ? parseInt(page as string) : undefined;
		const parsedLimit = limit ? parseInt(limit as string) : undefined;
		filter = filter as string || undefined;
		sort = sort as string || undefined;

		const { data, meta, message } = await announcements.get(
			parsedPage,
			parsedLimit,
			filter,
			sort
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

router.get("/:id", async function (req, res, next) {
	try {
		let { id } = req.params;
		const parsedId = parseInt(id) || -1;

		const { data, message } = await announcements.getById(parsedId);
		res.status(200).json({ data, message });
	} catch (err) {
		next(err);
	}
});

/**
 * @openapi
 * /announcements:
 *  post:
 *   tags: 
 *    - Announcements
 *   description: Create a new announcement
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/Announcement'
 *   responses:
 *    201:
 *     description: Successfully created announcement
 *    400:
 *     description: Invalid input
 *    500:
 *     description: Failed to create announcement
 */
router.post("/", verifyUser, async function (req, res, next) {
	try {
		const userRole = (req.user as { role: string }).role;

		requireRole(userRole, config.employeeRoles);

		const message = await announcements.create(req.body);
		res.status(201).json({ message });
	} catch (err) {
		next(err);
	}
});

/**
 * @openapi
 * /announcements/{id}:
 *  put:
 *   tags: 
 *    - Announcements
 *   description: Update an announcement
 *   parameters:
 *    - name: id
 *      in: path
 *      required: true
 *      description: Announcement id
 *      type: string
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/Announcement'
 *   responses:
 *    200:
 *     description: Successfully updated announcement
 *    400:
 *     description: Invalid input
 *    404:
 *     description: Announcement with this id does not exist
 *    500:
 *     description: Internal server error
 */
router.put("/:id", verifyUser, async function (req, res, next) {
	try {
		let { id } = req.params;
		const parsedId = parseInt(id) || -1;

		const userRole = (req.user as { role: string }).role;

		requireRole(userRole, config.employeeRoles);

		const message = await announcements.update(
			parsedId,
			req.body
		);
		res.status(200).json({ message });
	} catch (err) {
		next(err);
	}
});

/**
 * @openapi
 * /announcements/{id}:
 *  delete:
 *   tags: 
 *    - Announcements
 *   description: Delete an announcement
 *   parameters:
 *    - name: id
 *      in: path
 *      required: true
 *   responses:
 *    204:
 *     description: Announcement deleted successfully
 *    404:
 *     description: Announcement with this id does not exist
 *    500:
 *     description: Announcement could not be deleted
 */
router.delete("/:id", verifyUser, async function (req, res, next) {
	try {
		let { id } = req.params;
		const parsedId = parseInt(id) || -1;
		
		const userRole = (req.user as { role: string }).role;

		requireRole(userRole, config.employeeRoles);

		const message = await announcements.remove(parsedId);
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
 *   Announcement:
 *    type: object
 *    properties:
 *     Id:
 *      type: integer
 *      required: false
 *      autoIncrement: true
 *     Title:
 *      type: string
 *     Content:
 *      type: string
 *     Valid_until:
 *      type: string
 *      format: date-time
 *     Personnel_id:
 *      type: integer
 */
