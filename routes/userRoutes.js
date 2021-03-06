const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const User = require('./../models/userModel');

const router = express.Router();

router.post('/signup', async (req, res, next) => {
    const body = req.body
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(body.password, saltRounds);
  
    const user = await User.create({
      username: body.username,
      email: body.email,
      passwordHash
    })
    res.json(user)
})
  
router.post('/login', async (req, res, next) => {
    const body = req.body;
    console.log(body);
    const user = await User.findOne({ email: body.email })
    const passwordCorrect = user === null
      ? false
      : await bcrypt.compare(body.password, user.passwordHash)
    if (!(user && passwordCorrect)) {
      return res.status(401).json({
        error: "incorrect username or password"
      })
    }
    console.log('after')
    const userForToken = {
      user: user.username,
      id: user._id
    }
    
    const token = jwt.sign(userForToken, process.env.SECRET)
    res.status(200)
      .json({
        token,
        username: user.username,
        email: user.email
    })
})

module.exports = router;