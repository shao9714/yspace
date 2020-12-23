const mongoose = require('mongoose');
const validator = require('validator');


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
    profilePic: {
        type: String,
        default: 'landing-image.jpg'
    },
    passwordHash: String
});

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

const User = mongoose.model('users', userSchema);
module.exports = User;