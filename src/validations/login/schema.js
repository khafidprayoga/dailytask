const Joi = require('joi');

const postSchema = Joi.object({
  username: Joi.string().alphanum().min(1).max(32).required(),
  password: Joi.string().alphanum().min(8).max(64).required(),
});

const putSchema = Joi.object({
  // TODO: need regex for schema with valid three dots (header.payload.siganture)
  refreshToken: Joi.string().required(),
});

const deleteSchema = Joi.object({
  // TODO: need regex for schema with valid three dots (header.payload.siganture)
  refreshToken: Joi.string().required(),
});

module.exports = { postSchema, putSchema, deleteSchema };
