const Link = require('../models/Link');
const {getUserByName} = require("./user");
const {Op} = require("sequelize");

module.exports.mapLink = (link) => ({
    id: link.id, accessId: link.accessId, domainName: link.domainName, tags: link.tags?.split(","),
    title: link.title, type: link.type, clicks: link.clicks, meta: JSON.parse(link.meta)
});

module.exports.listLinks = async (domainName, configuration) => {
    if (configuration.creator) {
        configuration.creatorId = (await getUserByName(configuration.creator))?.id;
        if (!configuration.creatorId) delete configuration.creatorId;
        delete configuration.creator;
    }

    if (configuration.tags)
        configuration.tags = configuration.tags.split(",");

    if (configuration.title)
        configuration.title = {[Op.like]: "%" + configuration.title + "%"};

    return (await Link.findAll({
        where: {...configuration, domainName},
        limit: configuration.limit || 5000,
        order: [['createdAt', 'DESC']]
    }));
}

module.exports.getLinkById = async (id) => {
    return await Link.findOne({where: {id}});
}

module.exports.getLinkByAccess = async (accessId, domainName) => {
    return await Link.findOne({where: {accessId, domainName}});
}

module.exports.deleteById = async (id) => {
    await Link.destroy({where: {id}});
}

module.exports.clickLink = async (accessId, domainName) => {
    await Link.increment({clicks: 1}, {where: {accessId, domainName}});
}

module.exports.createLink = async (configuration) => {
    return await Link.create(configuration);
}