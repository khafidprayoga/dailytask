/* eslint no-unused-vars: off */
const cors = require('cors');
const express = require('express');
const { json } = require('body-parser');
const serverRouter = require('./routes');
const app = express();
const exceptionsMiddleware = require('./middlewares/exceptions');

app.disable('x-powered-by');
app.use(json());
app.use(cors());

// Add Welcome for root path on all HTTP verb
app.all('/', (req, res) => {
  const APIv1DOCS =
    'https://app.swaggerhub.com/apis/khafidprayoga/DailyTask/1.0.0';

  const response = {
    message: 'Hello World!, see the API docs to interact with this services',
    docs: APIv1DOCS,
  };

  res.send(response);
});

app.use(serverRouter); // mount all registered routes

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
