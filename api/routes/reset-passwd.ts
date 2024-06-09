import express from "express";
const router = express.Router();
import { sendResetPasswdEmail } from "./email";
import { Err } from "../Types";
import resetPasswd from "../services/reset-passwd";

/**
 * @openapi
 *  /reset-passwd:
 *   post:
 *    summary: Send email with reset password link
 *    tags:
 *     - Reset password
 *    requestBody:
 *     required: true
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *         email:
 *          type: string
 *          format: email
 *    responses:
 *     200:
 *      description: Reset email sent
 *      content:
 *       application/json:
 *        schema:
 *         type: object
 *         properties:
 *          message:
 *           type: string
 *          info:
 *           type: object
 *     400:
 *      description: Error
 *     500:
 *      description: Internal Server Error
 */
router.post("/", async function (req, res, next) {
  try {
    const { email } = req.body;

    const token =
      Math.random().toString(36).substring(2, 10) +
      Math.random().toString(36).substring(2, 10);

    const info = await sendResetPasswdEmail(
      email as string,
      "Resetuj hasło",
      "http://localhost:3000/resetowanie",
      token,
      `Kliknij w link, aby zresetować hasło, lub zignoruj tę wiadomość, jeśli nie żądałeś resetowania hasła. Link: http://localhost:3000/reset-passwd/${token}`
    );

    // if email sent successfully, save token in db
    // if email not sent, return error
    if (info.accepted.length > 0) {
      // save token in db
      const { message, statusCode } = await resetPasswd.saveToken(
        token,
        email as string
      );

      if (statusCode === 200) {
        res
          .status(200)
          .json({ message: `Reset email sent and ${message}`, info });
      }
    } else {
      throw new Err("Email not sent");
    }
  } catch (error) {
    next(error);
  }
});

/**
 * @openapi
 *  /reset-passwd/{token}:
 *   post:
 *    summary: Verify token
 *    tags:
 *     - Reset password
 *    parameters:
 *     - in: path
 *       name: token
 *       required: true
 *    responses:
 *     200:
 *      description: Token found
 *      content:
 *       application/json:
 *        schema:
 *         type: object
 *         properties:
 *          message:
 *           type: string
 *     404:
 *      description: Token not found
 *     409:
 *      description: Token already used
 *     410:
 *      description: Token expired
 *     500:
 *      description: Internal Server Error
 */
router.post("/:token", async function (req, res, next) {
  try {
    const { token } = req.params;

    const { message, statusCode } = await resetPasswd.verifyToken(token);

    res.status(statusCode).json({ message });
  } catch (error) {
    next(error);
  }
});

/**
 * @openapi
 *  /reset-passwd/{token}:
 *   patch:
 *    summary: Reset password
 *    tags:
 *     - Reset password
 *    parameters:
 *     - in: path
 *       name: token
 *       required: true
 *       type: string
 *    requestBody:
 *     required: true
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *         password:
 *          type: string
 *    responses:
 *     200:
 *      description: Password reset
 *      content:
 *       application/json:
 *        schema:
 *         type: object
 *         properties:
 *          message:
 *           type: string
 *     404:
 *      description: Token not found
 *     500:
 *      description: Internal Server Error
 */
router.patch("/:token", async function (req, res, next) {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const { message, statusCode } = await resetPasswd.resetPasswd(token, password);

    res.status(statusCode).json({ message });
  } catch (error) {
    next(error);
  }
});

export default router;
