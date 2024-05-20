import express from "express";
const router = express.Router();
import contactInfo from "../services/contact-info";

/**
 * @openapi
 * /contact-info:
 *  get:
 *   tags: 
 *    - Contact-info
 *   description: Get contact info from the database
 *   parameters:
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
 *           $ref: '#/components/schemas/contact-info'
 *         message:
 *          type: string
 *    400:
 *     description: Bad request
 *    404:
 *     description: Contact info not found
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

		const { data, meta, message } = await contactInfo.get(
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
 * /contact-info/{name}:
 *  put:
 *   tags: 
 *    - Contact-info
 *   description: Update contact info
 *   parameters:
 *    - name: name
 *      in: path
 *      required: true
 *      description: Contact info name
 *      type: string
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/contact-info'
 *   responses:
 *    200:
 *     description: Successfully updated contact info
 *    404:
 *     description: Contact info not found
 *    500:
 *     description: Could not update contact info
 */
router.put("/:name", async function (req, res, next) {
	try {
		const { name } = req.params;

		const { data, message } = await contactInfo.update(name, req.body);
		res.status(200).json({
			data,
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
 *  schemas:
 *   Contact-info:
 *    type: object
 *    properties:
 *     Name:
 *      type: string
 *     Addr_street:
 *      type: string
 *     Addr_number:
 *      type: integer
 *     Zip_code:
 *      type: string
 *     City:
 *      type: string
 *     Nip:
 *      type: integer
 *     Krs:
 *      type: integer
 *     Phone_inf:
 *      type: string
 *     Phone_central:
 *      type: string
 *     Email_pr:
 *      type: string
 *     Email_marketing:
 *      type: string
 */
