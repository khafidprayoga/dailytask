/* istanbul ignore file */
/* eslint no-unused-vars: off */

const exceptionsMiddleware = (err, req, res, next) => {
  const { statusCode, message } = err;

  if (statusCode >= 400 || statusCode <= 417) {
    return res.status(statusCode).send({ status: 'failed', message });
  }
  res.status(500).send({ status: 'failed', message: 'Internal Server Error' });
};

module.exports = exceptionsMiddleware;
