const express = require('express');
const { json } = require('body-parser');
const app = express();
const serverRouter = require('./routes');
const exceptionsMiddleware = require('./middlewares/exceptions');

app.disable('x-powered-by');
app.use(json());
app.use(serverRouter); // mount all registered routes

// If ClientError and ServerError push the error to exceptions middleware
app.use(exceptionsMiddleware);

// if route not found, and exceptions not thrownm handle with 404 middleware
app.use((req, res, next) => {
  res.status(404).send({ status: 'failed', message: 'Endpoint not found!' });
});

module.exports = app;
