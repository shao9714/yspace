const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

require('dotenv').config();

var app = express();

app.use(morgan('dev'));
app.use(express.json());

var router = express.Router();

app.use("/", router);

router.get("/", function (req, res, next) {
    console.log("Connected");
    res.send("Api working!");
});

var port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Listening on ${port}!`);
});

