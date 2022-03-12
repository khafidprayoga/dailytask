const { postSchema } = require('./schema');
const { options } = require('../options');
const ValidationError = require('../../exceptions/ValidationError');

const LoginValidations = {
  async postValidate(payload) {
    try {
      await postSchema.validateAsync(payload, options);
    } catch (error) {
      throw new ValidationError(error.details[0].message);
    }
  },
};

module.exports = LoginValidations;
