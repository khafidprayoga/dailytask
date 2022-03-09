const Joi = require('joi');

/**
 * TODO: {RegExp pattern}
 * Minimum eight characters, at least one letter ,number , and special char
 */

const postSchema = Joi.object({
  firstName: Joi.string().min(1).max(32).required(),
  lastName: Joi.string().min(1).max(32).required(),
  username: Joi.string().alphanum().min(1).max(32).required(),
  password: Joi.string().alphanum().min(8).max(64).required(),
  birthDate: Joi.date().less('12-31-2007').required(),
});

module.exports = { postSchema };
