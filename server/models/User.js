const Sequelize = require('sequelize');
const db = require("../config/database");
const uuid = require('uuid');

module.exports = db.define("users", {
    id: {
        type: Sequelize.STRING,
        primaryKey: true,
        defaultValue: () => uuid.v4().replace(/-/g, '').slice(0, 16)
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    rank: {
        type: Sequelize.STRING,
        defaultValue: "user"
    }
});