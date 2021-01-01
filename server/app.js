const express = require('express');
const app = express();
const cors = require('cors');
const userRouter = require('./user/user');
const constants = require('./constants/defaults');
const HOST = constants.HOST;
const PORT = constants.PORT;
const CORS_PORT = constants.CORS_PORT;

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