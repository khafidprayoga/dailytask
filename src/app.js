/* eslint no-unused-vars: off */

const express = require('express');
const app = express();
const cors = require('cors');
const { json } = require('body-parser');
const { routerV1 } = require('./routes');
const exceptionsMiddleware = require('./middlewares/exceptions');

app.disable('x-powered-by');
app.use(json());
app.use(cors());

app.use(routerV1); // mount all registered routes

// If ClientError and ServerError push the error to exceptions middleware
app.use(exceptionsMiddleware);

// if route not found, and exceptions not thrown handle with 404 middleware
app.use((req, res) => {
  res.status(404).send({
    status: 'failed',
    message: 'Endpoint not found or HTTP verb method not supported!',
  });
});

module.exports = app;
