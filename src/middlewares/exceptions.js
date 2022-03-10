const exceptionsMiddleware = (error, req, res, next) => {
  const { message } = error;
  res.send({ status: 'failed', message }).status(error.statusCode);
};

module.exports = exceptionsMiddleware;
