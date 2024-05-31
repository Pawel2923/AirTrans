import express from "express";
const router = express.Router();
import login_log from "../services/login_log";
import { requireRole, verifyUser } from "../middlewares/verifyUser";

router.get("/", verifyUser, async (req, res, next) => {
  try {
    const { page, limit } = req.query;
    const parsedPage = page ? parseInt(page as string) : undefined;
    const parsedLimit = limit ? parseInt(limit as string) : undefined;

    const userRole = (req.user as { role: string }).role;
    requireRole(userRole, "admin");

    const { data, meta, message } = await login_log.get(
      parsedPage,
      parsedLimit
    );
    res.status(200).json({
      data,
      meta,
      message,
    });
  } catch (err) {
    next(err);
  }
});

export default router;
