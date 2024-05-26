import express from "express";
const router = express.Router();
import employees from "../services/employees";

/**
 * @openapi
 * /employees:
 *  get:
 *   tags: 
 *    - Employees
 *   description: Get all employees or a specific employee by id
 *   parameters:
 *    - name: id
 *      in: query
 *      required: false
 *      description: Employee ID
 *      type: integer
 *    - name: limit
 *      in: query
 *      required: false
 *      description: Limit number of employees
 *      type: integer
 *    - name: page
 *      in: query
 *      required: false
 *      description: Page number
 *      type: integer
 *    - name: column
 *      in: query
 *      required: false
 *      description: Column to select
 *      type: enum('id', 'role', 'Gates_id', 'Flight_id', 'Users_id')
 *    - name: sort
 *      in: query
 *      required: false
 *      description: Sort by properties and order
 *      type: object
 *   responses:
 *    200:
 *     description: Found employees or employee by id
 *     content:
 *      application/json:
 *       schema:
 *        oneOf:
 *         - $ref: '#/components/schemas/responseWithMeta'
 *         - $ref: '#/components/schemas/response'
 *    400:
 *     description: Bad request
 *    404:
 *     description: No employees found
 *    500:
 *     description: Internal server error
 */
router.get("/", async function (req, res, next) {
	try {
		let { id, limit, page, column, sort } = req.query;

		const parsedId = id ? parseInt(id as string) : undefined;
		const parsedLimit = limit ? parseInt(limit as string) : undefined;
		const parsedPage = page ? parseInt(page as string) : undefined;

		const { data, meta, message } = await employees.getEmployees(
			parsedId,
			parsedLimit,
			parsedPage,
			column as string,
			sort as string
		);
		if (meta) {
			res.status(200).json({ data, meta, message });
		} else {
			res.status(200).json({ data, message });
		}
	} catch (err) {
		next(err);
	}
});

export default router;

/**
 * @openapi
 * components:
 *  schemas:
 *   Employee:
 *    type: object
 *    properties:
 *     id:
 *      type: integer
 *     role:
 *      type: string
 *     Gates_id:
 *      type: integer
 *      nullable: true
 *     Flight_id:
 *      type: integer
 *      nullable: true
 *     Users_id:
 *      type: integer
 *   responseWithMeta:
 *    type: object
 *    properties:
 *     data:
 *      type: array
 *      items:
 *       $ref: '#/components/schemas/Employee'
 *     meta:
 *      type: object
 *      properties:
 *       page:
 *        type: integer
 *       pages:
 *        type: integer
 *     message:
 *      type: string
 *   response:
 *    type: object
 *    properties:
 *     data:
 *      type: array
 *      items:
 *        $ref: '#/components/schemas/Employee'
 *     message:
 *      type: string
 */
