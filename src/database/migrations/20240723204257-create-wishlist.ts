'use strict';
import { DataTypes, QueryInterface } from "sequelize";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface :QueryInterface, Sequelize: typeof DataTypes) {
    await queryInterface.createTable('Wishlist', {
        id:{
            primaryKey:true,
            type:Sequelize.INTEGER,
            autoIncrement: true,
         },
         productId:{
            type:Sequelize.INTEGER,
            allowNull:false,
            onUpdate: "CASCADE",
            onDelete: "SET NULL",
        },
        userId:{
            type:Sequelize.INTEGER,
            allowNull:false,
            onUpdate: "CASCADE",
            onDelete: "SET NULL",
        },
   
});
},
async down(queryInterface:QueryInterface, Sequelize: typeof DataTypes) {
await queryInterface.dropTable('Wishlist');
}
};