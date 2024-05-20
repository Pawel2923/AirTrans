import express from "express";
import { verifyUser } from "../middlewares/verifyUser";
const router = express.Router();
import ticketService from "../services/tickets";

/**
 * @openapi
 * /tickets:
 *  get:
 *   tags:
 *    - Tickets
 *   description: Get ticket and related infomation
 *   parameters:
 *    - in: query
 *      name: page
 *      type: integer
 *      required: false
 *      description: Page number
 *    - in: query
 *      name: limit
 *      type: integer
 *      required: false
 *      description: Number of records per page
 *    - in: query
 *      name: filter
 *      type: string
 *      required: false
 *      description: Filter tickets by column name and value using operator
 *    - in: query
 *      name: sort
 *      type: string
 *      required: false
 *      description: Sort tickets by column name and order
 *   responses:
 *    200:
 *     description: Get ticket and related infomation
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *         data:
 *          type: array
 *          items:
 *           $ref: '#/components/schemas/Tickets'
 *         meta:
 *          type: object
 *          properties:
 *           page:
 *            type: integer
 *           pages:
 *            type: integer
 *           limit:
 *            type: integer
 *         message:
 *          type: string
 *    400:
 *     description: Bad request
 *    401:
 *     description: Unauthorized
 *    403:
 *     description: Forbidden
 *    404:
 *     description: Not found
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

		const { data, meta, message } = await ticketService.get(
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
 * /tickets/ids:
 *  get:
 *   tags:
 *    - Tickets
 *   description: Get all ticket ids
 *   responses:
 *    200:
 *     description: Successfully fetched ids
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
router.get("/ids", verifyUser, async function (req, res, next) {
	try {
		const { data, message } = await ticketService.getIds();
		res.status(200).json({ data, message });
	} catch (err) {
		next(err);
	}
});

/**
 * @openapi
 * /tickets/{id}:
 *  patch:
 *   tags:
 *    - Tickets
 *   description: Update ticket status
 *   parameters:
 *    - in: path
 *      name: id
 *      type: integer
 *      required: true
 *      description: Ticket id
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        status:
 *         type: string
 *         enum: [PURCHASED, EXPIRED, USED, REFUNDED]
 *         description: The status of the ticket
 *   responses:
 *    200:
 *     description: Successfully updated ticket status
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *         data:
 *          type: object
 *          schema:
 *           $ref: '#/components/schemas/Tickets'
 *         message:
 *          type: string
 *    400:
 *     description: Bad request
 *    401:
 *     description: Unauthorized
 *    403:
 *     description: Forbidden
 *    404:
 *     description: Not found
 *    500:
 *     description: Internal server error
 */
router.patch("/:id", verifyUser, async function (req, res, next) {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const parsedId = parseInt(id);

        const { data, message } = await ticketService.updateStatus(parsedId, status);
        res.status(200).json({ data, message });
    } catch (err) {
        next(err);
    }
});

export default router;

/**
 * @openapi
 * components:
 *  schemas:
 *   Tickets:
 *    type: object
 *    properties:
 *     id:
 *      type: integer
 *      nullable: true
 *      description: The unique identifier for a ticket
 *     purchase_time:
 *      type: string
 *      format: date-time
 *      description: The time the ticket was purchased
 *     expiry_date:
 *      type: string
 *      format: date-time
 *      description: The expiry date of the ticket
 *     seat_class:
 *      type: string
 *      description: The class of the seat
 *     seat_number:
 *      type: string
 *      description: The number of the seat
 *     phone_number:
 *      type: string
 *      nullable: true
 *      description: The phone number of the ticket holder
 *     address:
 *      type: string
 *      nullable: true
 *      description: The address of the ticket holder
 *     email:
 *      type: string
 *      format: email
 *      description: The email of the ticket holder
 *     first_name:
 *      type: string
 *      nullable: true
 *      description: The first name of the ticket holder
 *     last_name:
 *      type: string
 *      nullable: true
 *      description: The last name of the ticket holder
 *     price:
 *      type: number
 *      format: float
 *      description: The price of the ticket
 *     status:
 *      type: string
 *      enum: [PURCHASED, EXPIRED, USED, REFUNDED]
 *      nullable: true
 *      description: The status of the ticket
 *     Flight_id:
 *      type: string
 *      description: The flight id associated with the ticket
 *     gate_name:
 *      type: string
 *      description: The gate name for the flight
 */