const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'A username is required.']
    },
    email: {
        type: String,
        require: [true, 'A unique email is required.'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Email address must be valid']
    },
    password: {
        type: String,
        require: [true, 'A password is required.'],
        minlength: 8,
        select: false
    },
    passwordConfirm: {
        type: String,
        require: [true, 'Passwords must be confirmed.'],
        validate: {
            validator: function(e) {
                return e === this.password;
            },
            msg: 'Passwords must be the same.'
        }
    }
});

const User = mongoose.model('users', userSchema);
module.exports = User;