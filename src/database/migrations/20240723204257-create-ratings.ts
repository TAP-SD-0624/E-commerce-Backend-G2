'use strict';
import { DataTypes, QueryInterface } from "sequelize";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface :QueryInterface, Sequelize: typeof DataTypes) {
    await queryInterface.createTable('Ratings', {
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
        allowNull:false ,
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
    },
    rating:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    comments:{
        type:Sequelize.STRING,
        allowNull:false
    },
    review:{
        type:Sequelize.STRING,
        allowNull:false
    }
});
},
async down(queryInterface:QueryInterface, Sequelize: typeof DataTypes) {
await queryInterface.dropTable('Ratings');
}
};