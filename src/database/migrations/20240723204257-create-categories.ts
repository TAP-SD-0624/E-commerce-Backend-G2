'use strict';
import { DataTypes, QueryInterface } from "sequelize";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface :QueryInterface, Sequelize: typeof DataTypes) {
    await queryInterface.createTable('Categories', {
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    title:{
        type:Sequelize.STRING,
        allowNull:false
    },
    image:{
        type:Sequelize.STRING,
        allowNull:false
    }
});
},
async down(queryInterface:QueryInterface, Sequelize: typeof DataTypes) {
await queryInterface.dropTable('Categories');
}
};