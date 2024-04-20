const express = require("express");
const router = express.Router();
const loginService = require("../services/login");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/", async function (req, res, next) {
    const { email, password } = req.body;

    try {
        const { response, id, storedHashedPassword, userInputPassword } = await loginService.fetchClient(email, password);
        
        if (response.statusCode === 404) {
            console.log("User not found");
            res.status(response.statusCode).json({ message: response.message });
        }

        bcrypt.compare(userInputPassword, storedHashedPassword, (err, result) => {
            if (err) {
                console.error("Error comparing passwords:", err);
                throw new Error({
                    message: "Error comparing passwords",
                    statusCode: 500,
                });
            }
    
            if (result) {
                const token = jwt.sign({ id }, process.env.SECRET_TOKEN, {
                    expiresIn: 86400,
                });
                console.log("User authenticated");
                res.status(200).json({ auth: true, accessToken: token });
            } else {
                console.log("Invalid password");
                res.status(401).json({ auth: false, accessToken: null });
            }
        });
    } catch (err) {
        next(JSON.parse(err.message));
    }
});

module.exports = router;