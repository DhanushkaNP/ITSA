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

module.exports = {
  eventAuthSchema,
  memberAuthSchema,
};
