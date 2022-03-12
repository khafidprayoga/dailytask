const Joi = require('joi');

const postSchema = Joi.object({
  username: Joi.string().alphanum().min(1).max(32).required(),
  password: Joi.string().alphanum().min(8).max(64).required(),
});

module.exports = { postSchema };
