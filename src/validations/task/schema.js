const Joi = require('joi');

const postSchema = Joi.object({
  title: Joi.string().min(1).max(255).required(),
  description: Joi.string().min(1).required(),
});

const getSchema = Joi.object({
  taskId: Joi.string().uuid().required(),
});

const deleteSchema = Joi.object({
  taskId: Joi.string().uuid().required(),
});

module.exports = { postSchema, getSchema, deleteSchema };
