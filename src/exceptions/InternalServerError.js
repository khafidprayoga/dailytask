class InternalServerError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.name = 'InternalServerError';
    this.statusCode = statusCode;
  }
}

module.exports = InternalServerError;
