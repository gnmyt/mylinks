const Link = require('../models/Link');
const {getUserByName, getUserById} = require("./user");
const {Op} = require("sequelize");
const {getModule} = require("./module");

module.exports.mapLink = async (link) => {
    const user = await getUserById(link.creatorId);

    return {
        ...link, tags: link.tags?.split(","), meta: JSON.parse(link.meta), createdAt: undefined, updatedAt: undefined,
        creator: {id: user.id, username: user.username, email: user.email}
    }
}

module.exports.listLinks = async (domainName, configuration) => {
    if (configuration.creator) {
        configuration.creatorId = (await getUserByName(configuration.creator))?.id;
        if (!configuration.creatorId) delete configuration.creatorId;
        delete configuration.creator;
    }

    if (configuration.tags)
        configuration.tags = {[Op.regexp]: configuration.tags.split(",").map(tag => `(^|,)${tag}(,|$)`).join("|")};

    if (configuration.title)
        configuration.title = {[Op.like]: "%" + configuration.title + "%"};

    return (await Link.findAll({
        where: {...configuration, domainName},
        limit: configuration.limit || 5000,
        order: [['createdAt', 'DESC']],
    })).filter(obj => getModule(obj.type));
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

module.exports.editLink = async (id, configuration) => {
    return await Link.update(configuration, {where: {id}});
}
