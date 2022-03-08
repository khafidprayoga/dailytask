const { postSchema } = require('./schema');
const ValidationError = require('../../exceptions/ValidationError');

const RegisterValidations = {
  postValidate(payload) {
    const validationResult = postSchema.validate(payload);
    if (validationResult.error) {
      throw new ValidationError(validationResult.error.message);
    }
  },
};

module.exports = RegisterValidations;
