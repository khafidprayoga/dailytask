const express = require('express');
const { json } = require('body-parser');
const app = express();
const serverRouter = require('./routes');
const exceptionsMiddleware = require('./middlewares/exceptions');

app.disable('x-powered-by');
app.use(json());
app.use(serverRouter);
app.use(exceptionsMiddleware);

module.exports = app;
