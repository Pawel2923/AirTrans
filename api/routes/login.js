const express = require("express");
const router = express.Router();
const loginService = require("../services/login");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require('cookie-parser');
/**
 * @openapi
 * /login:
 *   post:
 *     summary: User login
 *     description: Authenticate a user by email and password and generate access tokens.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Successfully authenticated. Returns authentication status.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 auth:
 *                   type: boolean
 *                   description: Authentication status.
 *       '401':
 *         description: Unauthorized. Invalid credentials.
 *       '500':
 *         description: Internal server error.
 */
router.post("/", async function (req, res, next) {
    const { email, password } = req.body;

    try {
        const { response, id } = await loginService.fetchClient(email, password);
        
        if (response.statusCode !== 200) {
            console.log(response.message);
            return res.status(response.statusCode).json({ message: response.message });
        }

        const token = jwt.sign({ id }, process.env.SECRET_TOKEN, {
            expiresIn: 86400,
        });
        const refreshToken = jwt.sign({ id }, process.env.REFRESH_SECRET_TOKEN, {
            expiresIn: 525600,
        });
     
        // Ustawienie tokenów zarówno w nagłówkach Authorization, jak i jako ciasteczka
        res.set({
            "Authorization": `Bearer ${token}`,
            "Refresh-Token": `Bearer ${refreshToken}`
        });

        const cookieOptions = {
            expires: new Date(Date.now() + 86400 * 1000), // Token wygasa po 24 godzinach
            httpOnly: true // Zapobieganie dostępu do ciasteczka przez JavaScript
        };
        // Ustawienie ciasteczka JWT
        res.cookie('jwt', token, cookieOptions);
        


        return res.status(200).json({ auth: true });
    } catch (err) {
        next(JSON.parse(err.message));
    }
});

module.exports = router;
