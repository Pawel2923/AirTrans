import express from 'express';
const router = express.Router();
import login_log from "../services/login_log";

router.get('/', async (req, res, next) => {
    try {
        let { page, limit } = req.query;
        const parsedPage = page ? parseInt(page as string) : undefined;
        const parsedLimit = limit ? parseInt(limit as string) : undefined;
        
        const { data, meta, message } = await login_log.get(
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

export default router;