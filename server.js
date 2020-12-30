const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const session = require('express-session');
require('dotenv').config()

const PORT = process.env.PORT || 3001;

//MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 14
  }
}));
app.use(cors());


//CONTROLLER and ROUTES

const ctrl = require('./controllers');
const routes = require('./routes');

app.use('/users', ctrl.users);
// app.use('/recipes', ctrl.recipes);
app.use('/auth', routes.auth);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));