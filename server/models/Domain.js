const Sequelize = require('sequelize');
const db = require("../config/database");

module.exports = db.define("domains", {
    domainName: {
        type: Sequelize.STRING,
        allowNull: false
    }
});