const express = require("express");
const router = express.Router();
const registerService = require("../services/register");
/**
 * @openapi
 * /register:
 *   post:
 *     summary: User registration
 *     description: Register a new user with the provided details.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               First_name:
 *                 type: string
 *               Last_name:
 *                 type: string
 *               Login:
 *                 type: string
 *               Password:
 *                 type: string
 *               Email:
 *                 type: string
 *     responses:
 *       '200':
 *         description: User registered successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Registration success message.
 *       '500':
 *         description: Internal server error.
 */
router.post("/", async function (req, res, next) {
    const { First_name, Last_name, Login, Password, Email } = req.body;

    try {
        const response = await registerService.registerClient(First_name, Last_name, Login, Password, Email);
        res.status(response.statusCode).json(response.message);
    } catch (err) {
        next(JSON.parse(err.message));
    }
});

module.exports = router;