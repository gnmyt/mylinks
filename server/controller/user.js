const User = require('../models/User');
const bcrypt = require('bcrypt');
const {Op} = require("sequelize");

module.exports.createUser = async (username, email, password) => {
    let user = await User.findOne({where: {[Op.or]: [{username}, {email}]}});
    if (user !== null) return;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await User.create({username, email, hashedPassword});
}

module.exports.authUser = async (username, password) => {
    let user = await User.findOne({where: {username: username}});
    if (user === null) return;

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return;

    return user;
}

module.exports.getUserById = async (id) => {
    return await User.findOne({where: {id}});
}

module.exports.getUserByName = async (username) => {
    return await User.findOne({where: {username}});
}