import express from "express";
const router = express.Router();
import equipment from "../services/equipment";

router.get("/", async (req, res, next) => {
    try {
        let { page, limit, filter, sort } = req.query;
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
        let message = await equipment.create(req.body);
        res.status(201).json({ message });
    } catch (err) {
        next(err);
    }
});
router.get("/:serial_no", async (req, res, next) => {
    try {
        let { serial_no } = req.params;
        const { data, message } = await equipment.getById(serial_no);
        res.status(200).json({ data, message });
    } catch (err) {
        next(err);
    }
}
);

router.put("/:serial_no", async (req, res, next) => {
    try {
        let { serial_no } = req.params;
        let message = await equipment.update(serial_no, req.body);
        res.status(200).json({ message });
    } catch (err) {
        next(err);
    }
});

router.delete("/:serial_no", async (req, res, next) => {
    try {
        let { serial_no } = req.params;
        let message = await equipment.remove(serial_no);
        res.status(200).json({ message });
    } catch (err) {
        next(err);
    }
});



export default router;