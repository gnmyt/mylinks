const Sequelize = require('sequelize');
const uuid = require('uuid');
const crypto = require('crypto');

const db = require("../config/database");

module.exports = db.define("links", {
    id: {
        type: Sequelize.STRING,
        primaryKey: true,
        defaultValue: () => uuid.v4().replace(/-/g, '').slice(0, 16)
    },
    accessId: {
        type: Sequelize.STRING,
        defaultValue: () => crypto.randomBytes(3).toString('hex')
    },
    creatorId: {
        type: Sequelize.STRING,
        allowNull: false
    },
    tags: {
        type: Sequelize.STRING,
        allowNull: true,
        get() {
            return this.getDataValue('tags')?.split(',');
        },
        set(val) {
            this.setDataValue('tags', val.join(','));
        }
    },
    title: {
        type: Sequelize.STRING,
        defaultValue: "Unknown link"
    },
    type: {
        type: Sequelize.STRING,
        allowNull: false
    },
    domainName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    clicks: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    meta: {
        type: Sequelize.JSON,
        defaultValue: {}
    }
});