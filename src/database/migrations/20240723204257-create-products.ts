'use strict';
import { DataTypes, QueryInterface } from "sequelize";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface :QueryInterface, Sequelize: typeof DataTypes) {
    await queryInterface.createTable('Products', {
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique:true,
    },
    detail:{
       type: new Sequelize.STRING,
       allowNull: false
    },
    description:{
        type: new Sequelize.STRING,
        allowNull: false  
    },
    price:{
        type: new Sequelize.INTEGER,
        allowNull:false
    },
    discount :{
        type: new Sequelize.INTEGER,
        allowNull:false
    },
    title :{
        type: new Sequelize.STRING,
       allowNull: false
    },
    quantity:{
        type: new Sequelize.INTEGER,
        allowNull:false
    },
    image:{
        type: new Sequelize.STRING,
       allowNull: false
    }
});
},
async down(queryInterface:QueryInterface, Sequelize: typeof DataTypes) {
await queryInterface.dropTable('Products');
}
};