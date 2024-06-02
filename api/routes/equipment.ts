import express from "express";
const router = express.Router();
import equipment from "../services/equipment";
import { verifyUser, requireRole } from "../middlewares/verifyUser";

router.get("/", async (req, res, next) => {
  try {
    const { page, limit } = req.query;

    const parsedPage = page ? parseInt(page as string) : undefined;
    const parsedLimit = limit ? parseInt(limit as string) : undefined;

    const { data, meta, message } = await equipment.getAll(
      parsedPage,
      parsedLimit
    );
    res.status(200).json({ data, meta, message });
  } catch (err) {
    next(err);
  }
});

router.post("/", verifyUser, async (req, res, next) => {
  try {
    const userRole = (req.user as { role: string }).role;

    requireRole(userRole, ["admin", "ground_crew"]);

    const message = await equipment.create(req.body);
    res.status(201).json({ message });
  } catch (err) {
    next(err);
  }
});
router.get("/:serial_no", async (req, res, next) => {
  try {
    const { serial_no } = req.params;
    const parsedString = serial_no as string;
    const { data, message } = await equipment.getById(parsedString);
    res.status(200).json({ data, message });
  } catch (err) {
    next(err);
  }
});

router.put("/:serial_no",verifyUser, async (req, res, next) => {
  try {
    const { serial_no } = req.params;
    const parsedString = serial_no as string;

    const userRole = (req.user as { role: string }).role;
    requireRole(userRole, ["admin", "ground_crew"]);

    const message = await equipment.update(parsedString, req.body);
    res.status(200).json({ message });
  } catch (err) {
    next(err);
  }
});

router.delete("/:serial_no",verifyUser, async function (req, res, next){
  try {
    const { serial_no } = req.params;
    const parsedString = serial_no as string;

    const userRole = (req.user as { role: string }).role;
    requireRole(userRole, ["admin", "ground_crew"]);

    const message = await equipment.remove(parsedString);
    res.status(200).json({ message });
  } catch (err) {
    next(err);
  }
});

export default router;
