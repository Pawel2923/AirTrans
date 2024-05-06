import express from "express";
const router = express.Router();
import registerService from "../services/register";
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
		const message = await registerService.registerClient(
			First_name,
			Last_name,
			Login,
			Password,
			Email
		);
		res.status(201).json(message);
	} catch (err) {
		next(err);
	}
});

export default router;