'use strict';
import { DataTypes, QueryInterface } from "sequelize";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface :QueryInterface, Sequelize: typeof DataTypes) {
    await queryInterface.createTable('Login', {
    id:{
        type: Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement: true,
        unique:true
    },
    userId:{
        type: Sequelize.INTEGER,
         allowNull:false,
         onUpdate: "CASCADE",
         onDelete: "SET NULL",
    },
    email:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    phone:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    password:{
        type:Sequelize.STRING(100),
        allowNull:false
    },
    createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
});
},
async down(queryInterface:QueryInterface, Sequelize: typeof DataTypes) {
await queryInterface.dropTable('Login');
}
};