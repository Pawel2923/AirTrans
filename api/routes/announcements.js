const express = require("express");
const router = express.Router();
const announcements = require("../services/announcements");

/**
 * @openapi
 * /announcements:
 *  get:
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
 *   responses:
 *    200:
 *     description: Returns a list of announcements
 *    500:
 *     description: Internal server error
 */
router.get("/", async function (req, res, next) {
    try {
        const { data, meta, response } = await announcements.getAll(req.query.page);
        res.status(response.statusCode).json({ data, meta, message: response.message });
    } catch (err) {
        next(JSON.parse(err.message));
    }
});

/**
 * @openapi
 * /announcements/{id}:
 *  get:
 *   description: Get announcement by id
 *   parameters:
 *    - name: id
 *      in: path
 *      required: true
 *      description: Announcement id
 *      type: string
 *   responses:
 *    200:
 *     description: Successfully fetched data
 *    404:
 *     description: Announcement not found
 *    500:
 *     description: Internal server error
 */
router.get("/:id", async function (req, res, next) {
    try {
        const { data, response } = await announcements.getById(req.params.id);
        res.status(response.statusCode).json({ data, message: response.message });
    } catch (err) {
        next(JSON.parse(err.message));
    }
});

/**
 * @openapi
 * /announcements:
 *  post:
 *   description: Create a new announcement
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/announcement'
 *   responses:
 *    201:
 *     description: Successfully created announcement
 *    400:
 *     description: Invalid input
 *    500:
 *     description: Internal server error
 */
router.post("/", async function (req, res, next) {
    try {
        const response = await announcements.create(req.body);
        res.status(response.statusCode).json({ message: response.message });
    } catch (err) {
        next(JSON.parse(err.message));
    }
});

/**
 * @openapi
 * /announcements/{id}:
 *  put:
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
 *       $ref: '#/components/schemas/announcement'
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
router.put("/:id", async function (req, res, next) {
    try {
        const response = await announcements.update(parseInt(req.params.id), req.body);
        res.status(response.statusCode).json({ message: response.message });
    } catch (err) {
        next(JSON.parse(err.message));
    }
});

/**
 * @openapi
 * /announcements/{id}:
 *  delete:
 *   description: Delete an announcement
 *   parameters:
 *    - name: id
 *      in: path
 *      required: true
 *   responses:
 *    200:
 *     description: Announcement deleted successfully
 *    404:
 *     description: Announcement with this id does not exist
 *    500:
 *     description: Announcement could not be deleted
 */
router.delete("/:id", async function (req, res, next) {
    try {
        const response = await announcements.remove(parseInt(req.params.id));
        res.status(response.statusCode).json({ message: response.message });
    } catch (err) {
        next(JSON.parse(err.message));
    }
});

module.exports = router;

/**
 * @openapi
 * components:
 *  schemas:
 *   announcement:
 *    type: object
 *    properties:
 *     id:
 *      type: integer
 *      required: false
 *      autoIncrement: true
 *     title:
 *      type: string
 *     content:
 *      type: string
 *     validUntil:
 *      type: string
 *      format: date-time
 *     personnelId:
 *      type: integer
 */