const Joi = require("joi");

const eventAddAuthSchema = Joi.object({
  title: Joi.string().min(2).required(),
  description: Joi.string().min(10).required(),
  date: Joi.date().iso().required(),
});

module.exports = {
  eventAddAuthSchema,
};
