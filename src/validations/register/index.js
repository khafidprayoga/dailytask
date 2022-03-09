const { postSchema } = require('./schema');
const ValidationError = require('../../exceptions/ValidationError');

const RegisterValidations = {
  async postValidate(payload) {
    try {
      await postSchema.validateAsync(payload);
    } catch (error) {
      throw new ValidationError(error.details[0].message);
    }
  },
};

module.exports = RegisterValidations;
