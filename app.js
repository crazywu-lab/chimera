const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const cors = require('cors');
const db = require('./db/db_config');
require('dotenv').config();
const isProduction = process.env.NODE_ENV === 'production';
const history = require('connect-history-api-fallback');

// Import all the express routes we will be using
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const roomsRouter = require('./routes/rooms');
const uploadRouter = require('./routes/uploadPDF');

// Create our app
const app = express();

app.use(express.static(path.join(__dirname, isProduction ? 'dist' : 'public')));
app.use(history());

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

// Set up user session
app.use(session({
    secret: 'Chimera-place',
    resave: true,
    saveUninitialized: true
}))
// Allows us to make requests from POSTMAN
app.use(cors());

// Set up the app to use dev logger
app.use(logger('dev'));

// Accept json
app.use(express.json());
// https://stackoverflow.com/questions/29960764/what-does-extended-mean-in-express-4-0
// Allows object nesting in POST

app.use(express.urlencoded({ extended: false }));

// Cookies for sessions
app.use(cookieParser());

// Server html+css+js frontend
app.use(express.static(path.join(__dirname, 'public')));

// Connect url hierarchies to our routers
app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/rooms', roomsRouter);
app.use('/api/upload', uploadRouter);

app.all('*', (req, res) => {
  const errorMessage = `
    Cannot find the resource <b>${req.url}</b>
    <br>
    Please use only supported routes below
    <br><br>

    <b>Home Page and Chimera</b>
    <br>
    GET / -- Go to home page
    <br>

    <br><br>

    <b>Authentication</b>
    <br>
    POST /api/session -- Authenticate with username into the server
  `;

  res.status(404).send(errorMessage);
});

module.exports = app;
