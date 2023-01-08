const Joi = require('joi');

const fieldValidation = Joi.object({
  type: Joi.string().required().valid("text", "number", "date", "datetime-local", "month", "password", "range"),
  name: Joi.string().required().max(25),
  description: Joi.string().required().max(40),
  placeholder: Joi.string().max(30)
});

const metaValidation = Joi.array().required().items(Joi.object({
  name: Joi.string().required(),
  type: Joi.string().valid("default"),
  fields: Joi.object().pattern(Joi.string(), fieldValidation)
}));

module.exports = Joi.object({
  name: Joi.string().required().min(3).max(20),
  icon: Joi.string().required(),
  validationSchema: Joi.object().required(),
  meta: metaValidation
});
