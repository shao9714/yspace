const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

// For testing purposes, will be moved later
const User = require('./models/userModel');

require('dotenv').config();

var app = express();

app.use(morgan('dev'));
app.use(express.json());

// Database connection
const db = process.env.DB;
mongoose.connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true 
}).then(() => {
    console.log("DB connection successful");
}).catch(e => {
    console.log("Error encountered! " + e);
});

// Sample routes
var router = express.Router();

app.use("/", router);

router.get("/", function (req, res, next) {
    console.log("Connected");
    res.send("Api working!");
});

// For testing purposes, will be moved later
router.get("/add", async function (req, res, next) {
    console.log("Add route reached");
    const newUser = await User.create({
        username: "test",
        email: `${Date.now()}@gmail.com`,
        password: "12345678",
        passwordConfirm: "12345678"
    });

    console.log(newUser);
    res.send("Api working!\n" + newUser);
});

var port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Listening on ${port}!`);
});

