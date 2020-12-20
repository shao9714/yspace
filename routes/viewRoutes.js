const express = require('express');
const User = require('./../models/userModel');

const router = express.Router();

router.get("/", function (req, res, next) {
    res.status(200).render('landing');
});

router.get("/profile", function (req, res, next) {
    res.status(200).render('profile');
});

module.exports = router;