const exceptionsMiddleware = (error, req, res, next) => {
  const { statusCode, message } = error;

  statusCode >= 400 || statusCode <= 417
    ? res.status(error.statusCode).send({ status: 'failed', message })
    : res
        .status(500)
        .send({ status: 'failed', message: 'Internal Server Error' });
};

module.exports = exceptionsMiddleware;
