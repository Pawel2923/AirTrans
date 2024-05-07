import express from "express";
const router = express.Router();
import airfieldService from "../services/airfield";

/**
 * @openapi
 * /airfield:
 *  get:
 *   description: Get all airfields
 *   parameters:
 *    - name: table_name
 *      in: query
 *      required: false
 *      description: Get specific table data
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
 *    404:
 *     description: No airfield info found
 *    500:
 *     description: Internal server error
 */
router.get("/", async (req, res, next) => {
	try {
        const { table_name } = req.query;

		const { data, message } = await airfieldService.get(table_name as string | undefined);
		res.status(200).json({ data, message });
	} catch (error) {
		next(error);
	}
});

/**
 * @openapi
 * /airfield/{id}:
 *  put:
 *   description: Update airfield info
 *   parameters:
 *    - name: id
 *      in: path
 *      required: true
 *      description: Airfield ID
 *      type: string
 *    - name: table_name
 *      in: body
 *      required: true
 *      description: Table name
 *      type: string
 *    - name: newData
 *      in: body
 *      required: true
 *      description: New data
 *      type: object
 *   responses:
 *    200:
 *     description: Successfully updated data
 *    400:
 *     description: Invalid table name
 *    404:
 *     description: Data not found
 *    500:
 *     description: Internal server error
 */
router.put("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const { table_name, newData } = req.body;

        const { data, message } = await airfieldService.update(table_name, id, newData);
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