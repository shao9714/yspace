const express = require('express');
const User = require('./../models/userModel');
const Tweet = require('./../models/tweetModel');

const router = express.Router();

router.get("/", function (req, res, next) {
    res.status(200).render('landing');
});

router.get("/profile", function (req, res, next) {
    res.status(200).render('profile');
});

router.get('/home', function (req,res,next) {
  res.status(200).render('home');
})
router.post("/profile", async function(req, res, next) {
    var user = await User.findOne({email: req.body.email});
    var tweets = await Tweet.find({
        user: `${user.id}`
    });
    res.status(200).json({
        user,
        tweets
    });
});

module.exports = router;