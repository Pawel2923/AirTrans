import express from "express";
const router = express.Router();
import multer from "multer";
import { verifyUser } from "../middlewares/verifyUser";
import fs from "fs";
import path from "path";

const upload = multer({
	dest: "/api/files/",
	limits: {
		fileSize: 5000000, // limit to 5MB
	},
    storage: multer.diskStorage({
        destination: function (_req, _file, cb) {
            cb(null, "/api/files/");
        },
        filename: function (_req, file, cb) {
            cb(null, Date.now() + "" + Math.round(Math.random() * 1E9) + path.extname(file.originalname));
        },
    }),
});

router.get("/:file", verifyUser, async function (req, res, next) {
    try {
        const file = path.join("/api/files/", req.params.file);
        if (fs.existsSync(file)) {
            res.sendFile(file);
        } else {
            res.status(404).json({ message: "File not found" });
        }
    } catch (err) {
        next(err);
    }
});

router.post("/upload", verifyUser, upload.single("file"), async function (req, res, next) {
	try {
		res.status(200).json({ file: req.file });
	} catch (err) {
		next(err);
	}
});

export default router;
