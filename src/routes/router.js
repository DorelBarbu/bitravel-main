const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const graphRouter = require('./graph');
// const requireParams = require('../middlewares/require-params');

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(graphRouter);

// app.use(requireParams);
module.exports = app;
