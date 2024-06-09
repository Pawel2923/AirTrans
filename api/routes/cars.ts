import express from "express";
const router = express.Router();
import carService from "../services/cars";
import { Err } from "../Types";
import { verifyUser, requireRole } from "../middlewares/verifyUser";

router.patch("/:id/img", verifyUser, async function (req, res, next) {
  try {
    const { id } = req.params;
    const parsedId = parseInt(id as string);
    const { img: imgPath } = req.body;

    const { message } = await carService.addImg(parsedId, imgPath as string);
    res.status(200).json({ message });
  } catch (err) {
    next(err);
  }
});


router.get("/", async function (req, res, next) {
  try {
    const{page,limit} = req.query;

    const parsedPage = page ? parseInt(page as string) : undefined;
    const parsedLimit = limit ? parseInt(limit as string) : undefined;

    const { data, meta, message } = await carService.getAllCars(
      parsedPage,
      parsedLimit,
    
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
router.get("/", async function (req, res, next) {
  try {
    const{page,limit} = req.query;

    const parsedPage = page ? parseInt(page as string) : undefined;
    const parsedLimit = limit ? parseInt(limit as string) : undefined;

    const { data, meta, message } = await carService.getAllCar(
      parsedPage,
      parsedLimit,
    
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

router.get("/:id", async function (req, res, next) {
  try {
    const carId = req.params.id;
    const parsedCarId = carId ? parseInt(carId as string) : undefined;

    if (!parsedCarId) {
      throw new Err("Invalid car id", 400);
    }

    const { data } = await carService.getOneCar(parsedCarId);

    res.status(200).json({
      data,
    });
  } catch (error) {
    next(error);
  }
});

router.post("/", verifyUser, async function (req, res, next) {
  try {
    const { data, message } = await carService.create(req.body);

    const userRole = (req.user as { role: string }).role;

    requireRole(userRole, ["admin", "remtal_staff"]);

    res.status(201).json({ data, message });
  } catch (err) {
    next(err);
  }
});

router.put("/:id", verifyUser, async function (req, res, next) {
  try {
    const carId = req.params["id"];
    const parsedCarId = carId ? parseInt(carId as string) : undefined;

    const userRole = (req.user as { role: string }).role;

    requireRole(userRole, ["admin", "remtal_staff"]);

    if (!parsedCarId) {
      throw new Err("Invalid car id", 400);
    }

    const { data, message } = await carService.update(parsedCarId, req.body);
    res.status(200).json({ data, message });
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", verifyUser, async function (req, res, next) {
  try {
    const carId = req.params["id"];
    const parsedCarId = carId ? parseInt(carId as string) : undefined;

    const userRole = (req.user as { role: string }).role;

    requireRole(userRole, ["admin", "remtal_staff"]);

    if (!parsedCarId) {
      throw new Err("Invalid car id", 400);
    }

    const message = await carService.remove(parsedCarId);
    res.status(204).json({ message });
  } catch (err) {
    next(err);
  }
});

export default router;
