/* eslint no-unused-vars: off */

const express = require('express');
const { json } = require('body-parser');
const serverRouter = require('./routes');
const app = express();
const exceptionsMiddleware = require('./middlewares/exceptions');

app.disable('x-powered-by');
app.use(json());
app.use(serverRouter); // mount all registered routes

// If ClientError and ServerError push the error to exceptions middleware
app.use(exceptionsMiddleware);

// if route not found, and exceptions not thrown handle with 404 middleware
app.use((req, res) => {
  res.status(404).send({ status: 'failed', message: 'Endpoint not found!' });
});

module.exports = app;
