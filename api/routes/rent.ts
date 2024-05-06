import express from "express";
const router = express.Router();
import rentalService from "../services/rent"; 

router.get("/", async function (req, res, next) {
    try {
        const { page, limit } = req.query;
        const parsedPage = page ? parseInt(page as string) : undefined;
		const parsedLimit = limit ? parseInt(limit as string) : undefined;

        const { data, meta, response } = await rentalService.getAllRentals(parsedPage, parsedLimit); 

        res.status(response.statusCode).json({
            data,
            meta
        });

    } catch (error) {
        next(error);
    }
});

export default router;
