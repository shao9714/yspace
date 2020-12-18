const express = require('express');
const User = require('./models/userModel');

const router = express.Router();

router.post('/', async (req, res, next) => {
    const body = req.body
  
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password,saltRounds)
  
    const user = await User.create({
      username: body.username,
      email: body.email,
      passwordHash
    })
    res.json(user)
  })
  
router.post('/', async (req, res, next) => {
    const body = req.body
    const user = await User.findOne({ username: body.username })
    console.log(user,body)
    const passwordCorrect = user === null
      ? false
      : await bcrypt.compare(body.password, user.passwordHash)
    console.log('after')
    if (!(user && passwordCorrect)) {
      return res.status(401).json({
        error: "incorrect username or password"
      })
    }
  
    const userForToken = {
      user: user.username,
      id: user._id
    }
  
    const token = jwt.sign(userForToken, process.env.SECRET)
  
    res.status(201)
      .send({
        token,
        username: user.username,
        name: user.name
      })
})