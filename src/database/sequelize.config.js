// src/database/sequelize.config.js
require('ts-node/register');
// const {configs} = require('../configs.ts');
module.exports = {
  username: 'postgres',
  password: '12345',
  database: 'tap',
  dialect: 'postgres',
  host: 'localhost',
  port: '5432'
};
