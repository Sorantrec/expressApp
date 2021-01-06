const express = require('express');
const app = express();
const cors = require('cors');
const userRouter = require('./user/user');
const constants = require('./constants/defaults');
const HOST = constants.HOST;
const PORT = constants.PORT;
const CORS_PORT = constants.CORS_PORT;
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://admin:admin228@cluster0.izfij.mongodb.net/googleIdApp?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('useFindAndModify', false);

app.use(cors({
  origin: `http://${HOST}:${CORS_PORT}`,
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(userRouter);

module.exports = { app, PORT };