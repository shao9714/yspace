const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const viewRoutes = require('./routes/viewRoutes');
const userRoutes = require('./routes/userRoutes');

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

app.use("/", viewRoutes);
app.use("/api/login", userRoutes)
app.use("/api/signup", userRoutes)

var port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Listening on ${port}!`);
});

