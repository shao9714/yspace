const express = require('express');
const User = require('./../models/userModel');

const router = express.Router();

router.get("/", function (req, res, next) {
    res.status(200).render('landing');
});

router.get("/profile", function (req, res, next) {
    res.status(200).render('profile');
});

router.post("/profile", async function(req, res, next) {
    var user = await User.findOne({email: req.body.email});
    res.status(200).json({
        user
    });
});

module.exports = router;