const Domain = require('../models/Domain');

const exists = async (domainName) => (await Domain.findOne({where: {domainName}})) !== null;

module.exports.getDomains = async () => (await Domain.findAll()).map(domain => (domain.domainName));

module.exports.deleteDomain = async (domainName) => await exists(domainName) ? await Domain.destroy({where: {domainName}}) : null;

module.exports.createDomain = async (domainName) => !await exists(domainName) ? await Domain.create({domainName}) : null;