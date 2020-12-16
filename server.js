const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config()

const PORT = process.env.PORT || 3001;

//MIDDLEWARE
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

//CONTROLLER and ROUTES

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));