const mongoose = require('mongoose');
const validator = require('validator');

const tweetSchema = new mongoose.Schema({
    content: {
        type: String,
        required: [true, 'Content cannot be empty.']
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'users',
        required: [true, 'Tweet must belong to a user']
    }
});

const Tweet = mongoose.model('tweets', tweetSchema);
module.exports = Tweet;