const express = require('express');
const Tweet = require('./../models/tweetModel');

const router = express.Router();

router.post("/tweet", async function(req, res, next) {
    var content = req.body.content;
    var user = req.body.user;

    var tweet = await Tweet.create({
        content: "This is a second test tweet.",
        user: "5fe2790a90fe7e430864d4c1"
    });

    res.status(200).json({
        tweet
    });
});