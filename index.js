const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

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
var loginRouter = express.Router();
var signupRouter = express.Router();

app.use("/", router);
app.use("/api/login", loginRouter)
app.use("/api/signup", signupRouter)

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
    passwordHash: "12345678",
  });

  console.log(newUser);
  res.send("Api working!\n" + newUser);
});


signupRouter.post('/', async (req, res, next) => {
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

loginRouter.post('/', async (req, res, next) => {
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

var port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Listening on ${port}!`);
});

