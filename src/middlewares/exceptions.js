const exceptionsMiddleware = (error, req, res, next) => {
  const { message } = error;

  error.statusCode === 400
    ? res.status(error.statusCode).send({ status: 'failed', message })
    : res
        .send({ status: 'failed', message: 'Internal Server Error' })
        .status(500);
};

module.exports = exceptionsMiddleware;
