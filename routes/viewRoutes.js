const express = require('express');
const User = require('./../models/userModel');

const router = express.Router();

router.get("/", function (req, res, next) {
    console.log("Connected");
    res.status(200).render('landing');
});

module.exports = router;