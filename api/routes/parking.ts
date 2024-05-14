
import express from "express";
const router = express.Router();
import parkingService from "../services/parking";

router.get("/", async function (req, res, next) {
  try {
    const { page, limit } = req.query;
		const parsedPage = page ? parseInt(page as string) : undefined;
		const parsedLimit = limit ? parseInt(limit as string) : undefined;

    const { data, meta, response } = await parkingService.getAllParking(parsedPage, parsedLimit);

    res.status(response.statusCode).json({
      data,
      meta
    });

  } catch (error) {
    console.error("Error while fetching parking", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
router.post("/", async function (req, res, next) {
    try {
      const { data, message } = await parkingService.createParking(req.body);
      res.status(201).json({ data, message });
    } catch (err) {
      next(err);
    }
  });
  
 
router.delete("/:id", async function (req, res, next) {
    try {
      const { id } = req.params;
      const rentId = parseInt(id as string);  

      const { message } = await parkingService.removeParking(rentId);
      res.status(204).json({ message });
    } catch (err) {
      next(err);
    }
  });  


router.get("/:id", async function (req, res, next) {
  try {
    const { id } = req.params;
		const parkingId = parseInt(id as string);

    const { data, response } = await parkingService.getById(parkingId);

    if (!data) {
      return res.status(response.statusCode).json({
        message: response.message,
      });
    }

    res.status(response.statusCode).json({
      data,
    });

  } catch (error) {
    console.error("Error while fetching parking", error);
    res.status(500).json({ message: "Internal server error" });
  }
});



router.put("/:id", async function (req, res, next) {
  try {
    const { id } = req.params;
		const parkingId = parseInt(id as string);

    const {data, message} = await parkingService.updateParking(parkingId, req.body);
    res.status(200).json({data, message});
  } catch (error) {
    next(error);
  }
});

export default router;
