const express = require("express");
const router = express.Router();
const contactInfo = require("../services/contact-info");

router.get("/", async function (req, res, next) {
    try {
        res.json(await contactInfo.getContactInfo());
    } catch (err) {
        next(err);
    }
});

module.exports = router;