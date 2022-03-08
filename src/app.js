const express = require('express');
const { json } = require('body-parser');
const app = express();

app.disable('x-powered-by');
app.use(json());

app.get('/', (req, res) => {
  res.send({ message: 'Hello World!' });
});

module.exports = app;
