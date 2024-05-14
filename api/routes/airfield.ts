import express from "express";
const router = express.Router();
import airfieldService from "../services/airfield";
import { Err } from "../Types";

/**
 * @openapi
 * /airfield:
 *  get:
 *   tags:
 *    - Airfield
 *   description: Get all airfields
 *   parameters:
 *    - name: table_name
 *      in: query
 *      required: false
 *      description: Get specific table data
 *      type: string
 *    - name: page
 *      in: query
 *      required: false
 *      description: Page number
 *      type: integer
 *    - name: limit
 *      in: query
 *      required: false
 *      description: Limit number of airfields
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
 *           $ref: '#/components/schemas/Airfield'
 *         message:
 *          type: string
 *    400:
 *     description: Invalid table name
 *    404:
 *     description: No airfield info found
 *    500:
 *     description: Internal server error
 */
router.get("/", async (req, res, next) => {
	try {
		let { table_name, page, limit, filter, sort } = req.query;

		table_name = table_name as string | undefined;
		const parsedPage = page ? parseInt(page as string) : undefined;
		const parsedLimit = limit ? parseInt(limit as string) : undefined;
		filter = (filter as string) || undefined;
		sort = (sort as string) || undefined;

		const { data, message } = await airfieldService.get(
			table_name,
			parsedPage,
			parsedLimit,
			filter,
			sort
		);
		res.status(200).json({ data, message });
	} catch (error) {
		next(error);
	}
});

/**
 * @openapi
 * /airfield/{id}:
 *  put:
 *   tags:
 *    - Airfield
 *   description: Update airfield info
 *   parameters:
 *    - name: id
 *      in: path
 *      required: true
 *      description: Airfield ID
 *      type: string
 *    - name: table_name
 *      in: query
 *      required: true
 *      description: Table name
 *      type: string
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       oneOf:
 *        - $ref: '#/components/schemas/Runway'
 *        - $ref: '#/components/schemas/Terminal'
 *        - $ref: '#/components/schemas/Taxiway'
 *   responses:
 *    200:
 *     description: Successfully updated data
 *     content:
 *      application/json:
 *       schema:
 *        oneOf:
 *         - $ref: '#/components/schemas/Runway'
 *         - $ref: '#/components/schemas/Terminal'
 *         - $ref: '#/components/schemas/Taxiway'
 *        properties:
 *         message:
 *          type: string
 *    400:
 *     description: Invalid table name
 *    404:
 *     description: No airfield info with this id found
 *    500:
 *     description: Internal server error
 */
router.put("/:id", async (req, res, next) => {
	try {
		const { id } = req.params;
		let { table_name } = req.query;

		if (!table_name) {
			throw new Err("Table name is required", 400);
		}

		table_name = table_name as string;

		const { data, message } = await airfieldService.update(
			table_name,
			id,
			req.body
		);
		res.status(200).json({ data, message });
	} catch (error) {
		next(error);
	}
});

export default router;

/**
 * @openapi
 * components:
 *  schemas:
 *   Airfield:
 *    type: object
 *    properties:
 *     name:
 *      type: string
 *     runways:
 *      type: array
 *      items:
 *       $ref: '#/components/schemas/Runway'
 *      description: Runway info
 *     terminals:
 *      type: array
 *      items:
 *       $ref: '#/components/schemas/Terminal'
 *      description: Terminal info
 *     taxiways:
 *      type: array
 *      items:
 *       $ref: '#/components/schemas/Taxiway'
 *      description: Taxiway info
 *   Runway:
 *    type: object
 *    properties:
 *     id:
 *      type: string
 *      description: Runway ID
 *     length:
 *      type: number
 *      description: Runway length
 *     is_available:
 *      type: boolean
 *      description: Runway availability
 *     flight_id:
 *      type: string
 *      description: Flight ID
 *      nullable: true
 *   Terminal:
 *    type: object
 *    properties:
 *     id:
 *      type: number
 *      description: Terminal ID
 *     is_available:
 *      type: boolean
 *      description: Terminal availability
 *     capacity:
 *      type: number
 *      description: Terminal capacity
 *     flight_id:
 *      type: string
 *      description: Flight ID
 *      nullable: true
 *   Taxiway:
 *    type: object
 *    properties:
 *     id:
 *      type: string
 *      description: Taxiway ID
 *     is_available:
 *      type: boolean
 *      description: Taxiway availability
 *     flight_id:
 *      type: string
 *      description: Flight ID
 *      nullable: true
 */
