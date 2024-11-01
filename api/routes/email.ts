import express from "express";
const router = express.Router();
import hbs from "nodemailer-express-handlebars";
import nodemailer from "nodemailer";
import path from "path";

const transportConfig = {
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: "airtransmail@gmail.com",
    pass: process.env["GMAIL_PASSWORD"],
  },
};

/**
 * @openapi
 *  /email:
 *   post:
 *    tags:
 *     - Email
 *    summary: Send email
 *    requestBody:
 *     required: true
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *         to:
 *          type: string
 *         subject:
 *          type: string
 *         title:
 *          type: string
 *         content:
 *          type: string
 *         text:
 *          type: string
 *          nullable: true
 *    responses:
 *     200:
 *      description: Email sent
 *      content:
 *       application/json:
 *        schema:
 *         $ref: '#/components/schemas/Email'
 *     400:
 *      description: Error
 *     500:
 *      description: Internal Server Error
 */
router.post("/", async function (req, res, next) {
  try {
    const { to, subject, title, content, text } = req.body;

    const transporter = nodemailer.createTransport(transportConfig);

    const handlebarOptions = {
      viewEngine: {
        extName: ".handlebars",
        partialsDir: path.resolve("/api/", "views"),
        layoutsDir: path.resolve("/api/", "views"),
        defaultLayout: "",
      },
      viewPath: path.resolve("/api/", "views"),
      extName: ".handlebars",
    };

    transporter.use("compile", hbs(handlebarOptions));

    const mailOptions = {
      from: '"AirTrans" <airtrans@op.pl>',
      template: "email",
      to: to,
      subject: subject,
      context: {
        title,
        content,
      },
      text: text || "",
    };

    const info = await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Email sent", info });
  } catch (error) {
    next(error);
  }
});

/**
 * @openapi
 *  /email/reset-passwd:
 *   post:
 *    tags:
 *     - Email
 *    summary: Send email with reset password link
 *    requestBody:
 *     required: true
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *         to:
 *          type: string
 *         subject:
 *          type: string
 *         url:
 *          type: string
 *         token:
 *          type: string
 *         text:
 *          type: string
 *          nullable: true
 *    responses:
 *     200:
 *      description: Email sent
 *      content:
 *       application/json:
 *        schema:
 *         $ref: '#/components/schemas/Email'
 *     400:
 *      description: Error
 *     500:
 *      description: Internal Server Error
 */

export async function sendResetPasswdEmail(
  to: string,
  subject: string,
  url: string,
  token: string,
  text: string
) {
  const transporter = nodemailer.createTransport(transportConfig);

  const handlebarOptions = {
    viewEngine: {
      extName: ".handlebars",
      partialsDir: path.resolve("/api/", "views"),
      layoutsDir: path.resolve("/api/", "views"),
      defaultLayout: "",
    },
    viewPath: path.resolve("/api/", "views"),
    extName: ".handlebars",
  };

  transporter.use("compile", hbs(handlebarOptions));

  const mailOptions = {
    from: '"AirTrans" <airtrans@op.pl>',
    template: "reset",
    to: to,
    subject: subject,
    context: {
      url,
      token,
    },
    text: text || "",
  };

  const info = await transporter.sendMail(mailOptions);
  return info;
}

router.post("/reset-passwd", async function (req, res, next) {
  try {
    const { to, subject, url, token, text } = req.body;

    const info = await sendResetPasswdEmail(to, subject, url, token, text);

    res.status(200).json({ message: "Reset email sent", info });
  } catch (error) {
    next(error);
  }
});

export default router;

/**
 * @openapi
 * components:
 *  schemas:
 *   Email:
 *    type: object
 *    properties:
 *         message:
 *          type: string
 *          description: Email sent message
 *         info:
 *          type: object
 *          properties:
 *           accepted:
 *            type: array
 *            items:
 *             type: string
 *           rejected:
 *            type: array
 *            items:
 *             type: string
 *           ehlo:
 *            type: array
 *            items:
 *             type: string
 *           envelopeTime:
 *            type: number
 *           messageTime:
 *            type: number
 *           messageSize:
 *            type: number
 *           response:
 *            type: string
 *           envelope:
 *            type: object
 *            properties:
 *             from:
 *              type: string
 *             to:
 *              type: array
 *             items:
 *              type: string
 *            messageId:
 *             type: string
 */
