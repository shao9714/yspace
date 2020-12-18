const express = require('express');
const User = require('./models/userModel');

const router = express.Router();

router.get("/", function (req, res, next) {
    console.log("Connected");
    res.send("Api working!");
});
 
// Test route
router.get("/add", async function (req, res, next) {
    console.log("Add route reached");
    const newUser = await User.create({
      username: "test",
      email: `${Date.now()}@gmail.com`,
      passwordHash: "12345678",
    });
  
    console.log(newUser);
    res.send("Api working!\n" + newUser);
});