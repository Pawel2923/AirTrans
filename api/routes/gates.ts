import express from "express";
const router = express.Router();
import gates from "../services/gates";
import { verifyUser, requireRole } from "../middlewares/verifyUser";

router.get("/", async (req, res, next) => {
  try {
    
    const { page, limit } = req.query;

    const parsedPage = page ? parseInt(page as string) : undefined;
    const parsedLimit = limit ? parseInt(limit as string) : undefined;

    const { data, meta, message } = await gates.get(
      parsedPage,
      parsedLimit,
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

router.post("/", verifyUser, async function (req, res, next) {
  try {
    const message = await gates.create(req.body);

    const userRole = (req.user as { role: string }).role;
    requireRole(userRole, ["admin", "airport_staff"]);

    res.status(201).json({ message });
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", verifyUser, async function (req, res, next) {
  try {
    const { id } = req.params;
    const parsedId = parseInt(id as string) || -1;

    const userRole = (req.user as { role: string }).role;
    requireRole(userRole, ["admin", "airport_staff"]);

    const message = await gates.remove(parsedId);
    res.status(200).json({ message });
  } catch (err) {
    next(err);
  }
});
router.put("/:id", verifyUser, async function (req, res, next) {
  try {
    const { id } = req.params;
    const parsedId = parseInt(id as string) || -1;

    const userRole = (req.user as { role: string }).role;
    requireRole(userRole, ["admin", "airport_staff"]);

    const message = await gates.updateG(parsedId, req.body);
    res.status(200).json({ message });
  } catch (err) {
    next(err);
  }
});
router.get("/:id", async function (req, res, next) {
  try {
    const { id } = req.params;
    const parsedId = parseInt(id) || -1;

    const { data, message } = await gates.getById(parsedId);
    res.status(200).json({ data, message });
  } catch (err) {
    next(err);
  }
});

export default router;
