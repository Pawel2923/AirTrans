const express = require("express");
const router = express.Router();
const contactInfo = require("../services/contact-info");

/**
 * @openapi
 * /contact-info:
 *  get:
 *   description: Get contact info from the database
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
 *    500:
 *     description: Internal server error
 */
router.get("/", async function (req, res, next) {
    try {
        const { data, response } = await contactInfo.getAll();
        res.status(response.statusCode).json({ data, message: response.message });
    } catch (err) {
        next(JSON.parse(err.message));
    }
});

/**
 * @openapi
 * /contact-info/{name}:
 *  put:
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
        const { data, response } = await contactInfo.update(req.params.name, req.body);
        res.status(response.statusCode).json({ data, message: response.message });
    } catch (err) {
        next(JSON.parse(err.message));
    }
});

module.exports = router;

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