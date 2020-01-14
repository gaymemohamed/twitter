const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const userRoutes = require("./API/routes/user-route");
const postRoutes = require("./API/routes/post-route");
const likePostRoutes = require("./API/routes/likePost-route");

mongoose.connect('mongodb://gayme:0108444641g@ds021026.mlab.com:21026/twitter', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
},
    () => {
        console.log("db is Running now ..");
    })



app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static("upload"));

app.use('/', userRoutes);
app.use('/', postRoutes);
app.use('/', likePostRoutes);
module.exports = app;