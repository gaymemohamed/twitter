const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const dbconnection = require('./api/config/config');
const userRoutes = require("./API/routes/user-route");
dbconnection();



app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static("upload"));

app.use('/', userRoutes);

module.exports = app;