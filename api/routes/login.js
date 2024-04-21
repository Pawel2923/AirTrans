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
            console.log("Użytkownik nie znaleziony");
            return res.status(response.statusCode).json({ message: response.message });
        }

        bcrypt.compare(userInputPassword, storedHashedPassword, (err, result) => {
            if (err) {
                console.error("Błąd porównywania haseł:", err);
                throw new Error({
                    message: "Błąd porównywania haseł",
                    statusCode: 500,
                });
            }
    
            if (result) {
                const token = jwt.sign({ id }, process.env.SECRET_TOKEN, {
                    expiresIn: 86400,
                });
                const refreshToken = jwt.sign({ id }, process.env.REFRESH_SECRET_TOKEN, {
                    expiresIn: 525600,
                });
             
                res.setHeader("Authorization", `Bearer ${token}`,`refresh ${refreshToken}` );
                return res.status(200).json({ auth: true });
            } else {
                console.log("Nieprawidłowe hasło");
                return res.status(401).json({ auth: false });
            }
        });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
