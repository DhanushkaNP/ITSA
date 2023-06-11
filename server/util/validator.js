const Joi = require("joi");

const eventAuthSchema = Joi.object({
  title: Joi.string().min(2).required(),
  description: Joi.string().min(10).required(),
  date: Joi.date().iso().required(),
});

const memberAuthSchema = Joi.object({
  name: Joi.string().min(2).required(),
  position: Joi.string().min(2).required(),
  description: Joi.string().required(),
});

const messageAuthSchema = Joi.object({
  name: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  message: Joi.string().min(2).required(),
  phone: Joi.string().pattern(/^\+[1-9]\d{4,12}$/),
});

module.exports = {
  eventAuthSchema,
  memberAuthSchema,
  messageAuthSchema,
};
