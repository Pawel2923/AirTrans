const express = require("express");
const router = express.Router();
const registerService = require("../services/register");

router.post("/", async function (req, res, next) {
    const { First_name, Last_name, Login, Password, Email } = req.body;

    try {
        const response = await registerService.registerClient(First_name, Last_name, Login, Password, Email);
        res.status(response.statusCode).json(response.message);
    } catch (err) {
        next(err);
    }
});

module.exports = router;