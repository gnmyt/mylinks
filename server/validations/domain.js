const Joi = require("joi");

module.exports.domainValidation = Joi.object({
    domainName: Joi.string().min(5).max(25).required(),
});