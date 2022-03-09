class InternalServerError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.name = 'InternalServerErrorr';
    this.statusCode = statusCode;
  }
}

module.exports = InternalServerError;
