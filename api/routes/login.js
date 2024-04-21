const express = require("express");
const router = express.Router();
const loginService = require("../services/login");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/", async function (req, res, next) {
    const { email, password } = req.body;

    try {
        const { response, id } = await loginService.fetchClient(email, password);
        
        if (response.statusCode !== 200) {
            console.log(response.message);
            return res.status(response.statusCode).json({ message: response.message });
        }

        const token = jwt.sign({ id }, process.env.SECRET_TOKEN, {
            expiresIn: 86400,
        });
        const refreshToken = jwt.sign({ id }, process.env.REFRESH_SECRET_TOKEN, {
            expiresIn: 525600,
        });
     
        res.set({
            "Authorization": `Bearer ${token}`,
            "Refresh-Token": `Bearer ${refreshToken}`
        });
        return res.status(200).json({ auth: true });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
