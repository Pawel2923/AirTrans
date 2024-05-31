import express from "express";
const router = express.Router();
import loginService from "../services/login";
import jwt from "jsonwebtoken";
/**
 * @openapi
 * /login:
 *   post:
 *    tags:
 *     - Authentication
 *    summary: User login
 *    description: Authenticate a user by email and password and generate access tokens.
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *              password:
 *                type: string
 *    responses:
 *      '200':
 *        description: Successfully authenticated. Returns authentication status.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                auth:
 *                  type: boolean
 *                  description: Authentication status.
 *      '401':
 *        description: Unauthorized. Invalid credentials.
 *      '500':
 *        description: Internal server error.
 */
router.post("/", async function (req, res, next) {
  const { email, password } = req.body;

  try {
    const { email: id, userRole } = await loginService.fetchClient(
      email,
      password
    );

    const token = jwt.sign(
      { email: id, role: userRole },
      process.env["SECRET_TOKEN"] as string,
      {
        expiresIn: 86400,
      }
    );
    const refreshToken = jwt.sign(
      { email: id, role: userRole },
      process.env["REFRESH_SECRET_TOKEN"] as string,
      {
        expiresIn: 525600,
      }
    );

    // Ustawienie tokenów zarówno w nagłówkach Authorization, jak i jako ciasteczka
    res.set({
      Authorization: `Bearer ${token}`,
      "Refresh-Token": `Bearer ${refreshToken}`,
    });

    const cookieOptions = {
      expires: new Date(Date.now() + 60000), // Token wygasa po 1 minucie
      httpOnly: true, // Zapobieganie dostępu do ciasteczka przez JavaScript
    };
    // Ustawienie ciasteczka JWT
    res.cookie("jwt", token, cookieOptions);

    const refreshCookieOptions = {
      expires: new Date(Date.now() + 604800 * 1000), // Token wygasa po 7 dniach
      httpOnly: true, // Zapobieganie dostępu do ciasteczka przez JavaScript
    };

    res.cookie("refreshJwt", refreshToken, refreshCookieOptions);

    res.status(200).json({ auth: true, user: { email, role: userRole } });
  } catch (err) {
    next(err);
  }
});

export default router;
