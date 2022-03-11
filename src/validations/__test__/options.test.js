const Joi = require('joi');
const { options } = require('../options');

describe('Joi options config', () => {
  const schema = Joi.object({
    fullName: Joi.string().min(5),
  });

  it('should return backtick (`) rather than double-quotes (") on error message', async () => {
    const requestBody = {
      fullName: 'Joe',
    };
    try {
      await schema.validateAsync(requestBody, options);
    } catch (error) {
      const expectedMessage =
        '`fullName` length must be at least 5 characters long';
      expect(error.details[0].message).toEqual(expectedMessage);
    }
  });
});
