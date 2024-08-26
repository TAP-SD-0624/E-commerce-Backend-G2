// src/database/sequelize.config.js
require('ts-node/register');
const { configs } = require('../config/databaseConfig.ts');
module.exports = {
    username: configs.username || 'postgres',
    password: configs.password || '12345',
    database: configs.database || 'ecommerce_dev',
    dialect: configs.dialect || 'postgres',
    host: configs.host || 'localhost',
    port: parseInt(configs.port) || 5432
};
