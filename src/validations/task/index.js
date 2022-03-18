const { postSchema, getSchema, deleteSchema } = require('./schema');
const { options } = require('../options');
const ValidationError = require('../../exceptions/ValidationError');

const TaskValidations = {
  async postValidate(payload) {
    try {
      await postSchema.validateAsync(payload, options);
    } catch (error) {
      throw new ValidationError(error.details[0].message);
    }
  },
  async getValidate(payload) {
    try {
      await getSchema.validateAsync(payload, options);
    } catch (error) {
      throw new ValidationError(error.details[0].message);
    }
  },
  async deleteValidate(payload) {
    try {
      await deleteSchema.validateAsync(payload, options);
    } catch (error) {
      throw new ValidationError(error.details[0].message);
    }
  },
};

module.exports = TaskValidations;
