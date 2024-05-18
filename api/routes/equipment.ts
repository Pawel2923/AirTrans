import express from "express";
const router = express.Router();
import equipment from "../services/equipment";

router.get("/", async (req, res, next) => {
    try {
        const { page, limit, filter, sort } = req.query;
        const parsedPage = page ? parseInt(page as string) : undefined;
        const parsedLimit = limit ? parseInt(limit as string) : undefined;
        const { data, meta, message } = await equipment.getAll(
            parsedPage,
            parsedLimit,
            filter as string | undefined,
            sort as string | undefined
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

router.post("/", async (req, res, next) => {
    try {
        const message = await equipment.create(req.body);
        res.status(201).json({ message });
    } catch (err) {
        next(err);
    }
});



export default router;