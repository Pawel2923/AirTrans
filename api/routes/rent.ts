import express from "express";
const router = express.Router();
import rentalService from "../services/rent";
import { verifyUser } from "../middlewares/verifyUser";

router.get("/", async function (req, res, next) {
  try {
    const { page, limit, userEmail } = req.query;
    const parsedPage = page ? parseInt(page as string) : undefined;
    const parsedLimit = limit ? parseInt(limit as string) : undefined;

    const { data, meta,  message } = await rentalService.getAllRentals(
      parsedPage,
      parsedLimit,
      userEmail as string
    );

    res.status(200).json({
      data,
      meta,
      message,
    });
  } catch (error) {
    next(error);
  }
});

router.post("/", verifyUser, async function (req, res, next) {
  try {
    const { data, message } = await rentalService.createRental(req.body);
    res.status(201).json({ data, message });
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", verifyUser, async function (req, res, next) {
  try {
    const { id } = req.params;
    const parsedId = parseInt(id as string);

    const message = await rentalService.removeRent(parsedId);
    res.status(204).json({ message });
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async function (req, res, next) {
  try {
    const { id } = req.params;
    const rentId = parseInt(id as string);

    const { data } = await rentalService.getById(rentId);

    res.status(200).json({
      data,
    });
  } catch (error) {
    next(error);
  }
});

router.put("/:id", verifyUser, async function (req, res, next) {
  try {
    const { id } = req.params;
    const rentId = parseInt(id as string);

    const { data, message } = await rentalService.updateRent(rentId, req.body);
    res.status(200).json({ data, message });
  } catch (err) {
    next(err);
  }
});

export default router;
