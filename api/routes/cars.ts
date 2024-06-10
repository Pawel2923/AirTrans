import express from "express";
const router = express.Router();
import carService from "../services/cars";
import { Err } from "../Types";
import { verifyUser, requireRole } from "../middlewares/verifyUser";

/**
 * @openapi
 * /cars/{id}/img:
 *   patch:
 *     tags:
 *       - Cars
 *     summary: Add image to car by id
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Car id
 *         type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               img:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully added image to car
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Internal server error
 */

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

/**
 * @openapi
 * /cars:
 *   get:
 *     tags:
 *       - Cars
 *     summary: Get all cars
 *     parameters:
 *       - name: page
 *         in: query
 *         required: false
 *         description: Page number
 *         type: integer
 *       - name: limit
 *         in: query
 *         required: false
 *         description: Limit number of cars
 *         type: integer
 *     responses:
 *       200:
 *         description: Successfully fetched data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Car'
 *                 meta:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: integer
 *                       description: Total number of cars
 *                     page:
 *                       type: integer
 *                       description: Current page number
 *                     limit:
 *                       type: integer
 *                       description: Number of cars per page
 *                     message:
 *                       type: string
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */



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
/**
 * @openapi
 * /cars/{id}:
 * get:
 *   tags:
 *     - Cars
 *   summary: Get car by id
 *   parameters:
 *     - name: id
 *       in: path
 *       required: true
 *       description: Car id
 *       type: integer
 *   responses:
 *     200:
 *       description: Successfully fetched car
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               data:
 *                 $ref: '#/components/schemas/Car'
 *     400:
 *       description: Bad request
 *     500:
 *       description: Internal server error
 */
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

/**
 * @openapi
 * /cars:
 *   post:
 *     tags:
 *       - Cars
 *     summary: Create a new car
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Car'
 *     responses:
 *       201:
 *         description: Successfully created car
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Internal server error
  */ 


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

/**
 * @openapi
 * /cars/{id}:
 *   put:
 *     tags:
 *       - Cars
 *     summary: Update car by id
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Car id
 *         type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Car'
 *     responses:
 *       200:
 *         description: Successfully updated car
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Internal server error
 */

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

/**
 * @openapi
 * /cars/{id}:
 *   delete:
 *     tags:
 *       - Cars
 *     summary: Delete car by id
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Car id
 *         type: integer
 *     responses:
 *       204:
 *         description: Successfully deleted car
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Internal server error
 */


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

/**
 * @openapi
 * components:
 *   schemas:
 *     Car:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *         brand:
 *           type: string
 *         model:
 *           type: string
 *         price_per_day:
 *           type: number
 *         production_year:
 *           type: number
 *         fuel_type:
 *           type: string
 *         transmission_type:
 *           type: string
 *         img:
 *           type: string
 *         license_plate:
 *           type: string
 */ 
