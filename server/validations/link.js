const Joi = require('joi');

module.exports.listLinksValidation = Joi.object({
    creator: Joi.string().min(5).max(25),
    tags: Joi.string().max(50),
    title: Joi.string().min(1).max(25),
    limit: Joi.number().min(1).max(5000)
});

module.exports.createLinkValidation = Joi.object({
    accessId: Joi.string().min(3).max(25),
    domainName: Joi.string().min(2).max(55).required(),
    isEnabled: Joi.boolean(),
    title: Joi.string().min(3).max(25),
    type: Joi.string().max(25).required(),
    tags: Joi.array().max(5),
    meta: Joi.object().required()
});

module.exports.editLinkValidation = Joi.object({
    accessId: Joi.string().min(3).max(25),
    domainName: Joi.string().min(2).max(55),
    isEnabled: Joi.boolean(),
    title: Joi.string().min(3).max(25),
    type: Joi.string().max(25),
    tags: Joi.array().max(5),
    meta: Joi.object()
});
