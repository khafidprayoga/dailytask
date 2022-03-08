const ClientError = require('./ClientError');

class ValidationError extends ClientError {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
  }
}

module.exports = ValidationError;
