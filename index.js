const express = require('express');
var app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors')

const viewRoutes = require('./routes/viewRoutes');
const userRoutes = require('./routes/userRoutes');

require('dotenv').config();

app.use(cors())
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('views'))

// from express docs
// After the view engine is set, 
// you don’t have to specify the engine or 
// load the template engine module in your app; 
// Express loads the module internally

// app.engine('pug', require('pug').__express);
app.set('view engine', 'pug');
app.set('views', './views');

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

// Routes
app.use("/", viewRoutes);
app.use("/api", userRoutes)

var port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Listening on ${port}!`);
});

