const Joi = require('joi');

module.exports.authValidation = Joi.object({
    username: Joi.string().min(5).max(25).required(),
    password: Joi.string().min(6).required()
});