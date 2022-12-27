const {Sequelize} = require('sequelize');

let defaultOptions = {logging: false, query: {raw: true}};

const hostname = process.env.DB_HOSTNAME?.split(":");

let options = process.env.DB_DATABASE ? {
    dialect: 'mysql',
    host: hostname[0] || 'localhost',
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || null,
    database: process.env.DB_DATABASE,
    port: hostname[1] || 3306
} : {dialect: 'sqlite', storage: 'data/storage.db'};

module.exports = new Sequelize({...options, ...defaultOptions});